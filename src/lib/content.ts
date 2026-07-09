import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Module, LessonMeta, SearchResult } from "@/types";
import modulesData from "@/data/modules.json";

const modules: Module[] = modulesData as Module[];

/**
 * Get all modules with their lesson references
 */
export function getModules(): Module[] {
  return modules.sort((a, b) => a.order - b.order);
}

/**
 * Get a single module by slug
 */
export function getModuleBySlug(slug: string): Module | undefined {
  return modules.find((m) => m.slug === slug);
}

/**
 * Get lesson content (MDX) by module and lesson slug
 */
export function getLessonContent(
  moduleSlug: string,
  lessonSlug: string
): { content: string; frontmatter: Record<string, unknown> } | null {
  const lessonDir = path.join(
    process.cwd(),
    "src",
    "content",
    "lessons",
    moduleSlug
  );
  const filePath = path.join(lessonDir, `${lessonSlug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);
  return { content, frontmatter: data };
}

/**
 * Get lesson metadata from modules.json
 */
export function getLessonMeta(
  moduleSlug: string,
  lessonSlug: string
): LessonMeta | null {
  const mod = modules.find((m) => m.slug === moduleSlug);
  if (!mod) return null;

  const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;

  return {
    ...lesson,
    moduleSlug,
    keywords: lesson.keywords || [],
  };
}

/**
 * Get all lesson slugs for static generation
 */
export function getAllLessonSlugs(): {
  moduleSlug: string;
  lessonSlug: string;
}[] {
  const slugs: { moduleSlug: string; lessonSlug: string }[] = [];

  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      slugs.push({
        moduleSlug: mod.slug,
        lessonSlug: lesson.slug,
      });
    }
  }

  return slugs;
}

/**
 * Get next and previous lesson for navigation
 */
export function getAdjacentLessons(
  moduleSlug: string,
  lessonSlug: string
): {
  prev: { moduleSlug: string; lessonSlug: string; title: string } | null;
  next: { moduleSlug: string; lessonSlug: string; title: string } | null;
} {
  const allLessons: {
    moduleSlug: string;
    lessonSlug: string;
    title: string;
  }[] = [];

  for (const mod of modules.sort((a, b) => a.order - b.order)) {
    for (const lesson of mod.lessons.sort((a, b) => a.order - b.order)) {
      allLessons.push({
        moduleSlug: mod.slug,
        lessonSlug: lesson.slug,
        title: lesson.title,
      });
    }
  }

  const currentIndex = allLessons.findIndex(
    (l) => l.moduleSlug === moduleSlug && l.lessonSlug === lessonSlug
  );

  return {
    prev: currentIndex > 0 ? allLessons[currentIndex - 1] : null,
    next:
      currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null,
  };
}

/**
 * Get total number of lessons
 */
export function getTotalLessons(): number {
  return modules.reduce((total, mod) => total + mod.lessons.length, 0);
}

/**
 * Search lessons by query
 */
export function searchLessons(query: string): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];

  const results: SearchResult[] = [];

  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      const titleMatch = lesson.title.toLowerCase().includes(normalizedQuery);
      const descMatch = lesson.description
        .toLowerCase()
        .includes(normalizedQuery);
      const keywordMatch = lesson.keywords?.some((k) =>
        k.toLowerCase().includes(normalizedQuery)
      );

      if (titleMatch || descMatch || keywordMatch) {
        results.push({
          title: lesson.title,
          description: lesson.description,
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          moduleTitle: mod.title,
          keywords: lesson.keywords || [],
        });
      }
    }
  }

  return results;
}
