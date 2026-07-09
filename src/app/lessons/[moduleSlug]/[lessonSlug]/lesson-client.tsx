"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ReadingProgress } from "@/components/lesson/ReadingProgress";
import { MarkComplete } from "@/components/lesson/MarkComplete";
import { LessonNavigation } from "@/components/lesson/LessonNavigation";
import { useProgressStore } from "@/store/progress-store";

interface LessonClientWrapperProps {
  moduleSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  duration: string;
  readingTime: number;
  prev: { moduleSlug: string; lessonSlug: string; title: string } | null;
  next: { moduleSlug: string; lessonSlug: string; title: string } | null;
  children: React.ReactNode;
}

export function LessonClientWrapper({
  moduleSlug,
  lessonSlug,
  lessonTitle,
  moduleTitle,
  duration,
  readingTime,
  prev,
  next,
  children,
}: LessonClientWrapperProps) {
  const { accessLesson } = useProgressStore();

  useEffect(() => {
    accessLesson(moduleSlug, lessonSlug);
  }, [moduleSlug, lessonSlug, accessLesson]);

  return (
    <>
      <ReadingProgress />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="p-4 lg:p-8 max-w-4xl mx-auto"
      >
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6"
          aria-label="Breadcrumb"
        >
          <Link
            href="/dashboard"
            className="hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate max-w-32">{moduleTitle}</span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium truncate">
            {lessonTitle}
          </span>
        </nav>

        {/* Lesson header */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="secondary" className="rounded-md text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              {moduleTitle}
            </Badge>
            <Badge variant="outline" className="rounded-md text-xs">
              <Clock className="h-3 w-3 mr-1" />
              {duration} · {readingTime} min read
            </Badge>
          </div>

          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              {/* Title is in the MDX content, so we don't duplicate it here */}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* MDX Content */}
        <article className="prose-sm sm:prose max-w-none">{children}</article>

        {/* Navigation */}
        <LessonNavigation 
          moduleSlug={moduleSlug}
          lessonSlug={lessonSlug}
          prevLesson={prev} 
          nextLesson={next} 
        />
      </motion.div>
    </>
  );
}
