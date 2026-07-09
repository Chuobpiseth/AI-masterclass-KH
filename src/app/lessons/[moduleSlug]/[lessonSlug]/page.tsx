import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getLessonContent, getLessonMeta, getAdjacentLessons, getAllLessonSlugs, getModuleBySlug } from "@/lib/content";
import { getMDXComponents } from "@/lib/mdx-components";
import { estimateReadingTime } from "@/lib/utils";
import { LessonClientWrapper } from "./lesson-client";
import type { Metadata } from "next";

interface LessonPageProps {
  params: Promise<{
    moduleSlug: string;
    lessonSlug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllLessonSlugs();
  return slugs.map((s) => ({
    moduleSlug: s.moduleSlug,
    lessonSlug: s.lessonSlug,
  }));
}

export async function generateMetadata({
  params,
}: LessonPageProps): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params;
  const meta = getLessonMeta(moduleSlug, lessonSlug);
  if (!meta) return { title: "Lesson Not Found" };

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { moduleSlug, lessonSlug } = await params;
  const lessonData = getLessonContent(moduleSlug, lessonSlug);
  const lessonMeta = getLessonMeta(moduleSlug, lessonSlug);
  const adjacent = getAdjacentLessons(moduleSlug, lessonSlug);
  const mod = getModuleBySlug(moduleSlug);

  if (!lessonData || !lessonMeta || !mod) {
    notFound();
  }

  const readingTime = estimateReadingTime(lessonData.content);
  const components = getMDXComponents();

  return (
    <LessonClientWrapper
      moduleSlug={moduleSlug}
      lessonSlug={lessonSlug}
      lessonTitle={lessonMeta.title}
      moduleTitle={mod.title}
      duration={lessonMeta.duration}
      readingTime={readingTime}
      prev={adjacent.prev}
      next={adjacent.next}
    >
      <div className="mdx-content">
        <MDXRemote source={lessonData.content} components={components} />
      </div>
    </LessonClientWrapper>
  );
}
