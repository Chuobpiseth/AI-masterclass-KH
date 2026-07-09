"use client";

import Link from "next/link";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useProgressStore } from "@/store/progress-store";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface LessonNavigationProps {
  moduleSlug: string;
  lessonSlug: string;
  prevLesson: { moduleSlug: string; lessonSlug: string; title: string } | null;
  nextLesson: { moduleSlug: string; lessonSlug: string; title: string } | null;
}

export function LessonNavigation({
  moduleSlug,
  lessonSlug,
  prevLesson,
  nextLesson,
}: LessonNavigationProps) {
  const { completedLessons, markComplete, markIncomplete } = useProgressStore();
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  const lessonId = `${moduleSlug}/${lessonSlug}`;
  const isCompleted = completedLessons[lessonId]?.completed;

  const toggleCompletion = () => {
    if (isCompleted) {
      markIncomplete(moduleSlug, lessonSlug);
    } else {
      markComplete(moduleSlug, lessonSlug);
    }
  };

  return (
    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-border/40 pt-8">
      <div className="flex-1 w-full sm:w-auto">
        {prevLesson && (
          <Link href={`/lessons/${prevLesson.moduleSlug}/${prevLesson.lessonSlug}`} className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto group rounded-xl")}>
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <div className="flex flex-col items-start">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("previousLesson")}</span>
                <span className="font-medium truncate max-w-[150px]">{prevLesson.title}</span>
              </div>
            </Link>
        )}
      </div>

      <div className="flex-shrink-0">
        <Button
          onClick={toggleCompletion}
          variant={isCompleted ? "outline" : "default"}
          className={cn(
            "rounded-xl font-medium transition-all",
            isCompleted
              ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-700 border-emerald-500/20 shadow-md"
              : "border-0 btn-gradient-green"
          )}
        >
          <CheckCircle2
            className={cn(
              "mr-2 h-4 w-4",
              isCompleted ? "text-emerald-500" : "opacity-70 text-white"
            )}
          />
          {isCompleted ? t("completed") : t("markComplete")}
        </Button>
      </div>

      <div className="flex-1 flex justify-end w-full sm:w-auto">
        {nextLesson && (
          <Link href={`/lessons/${nextLesson.moduleSlug}/${nextLesson.lessonSlug}`} className={cn(buttonVariants({ variant: "default" }), "w-full sm:w-auto group rounded-xl border-0 btn-gradient-purple")}>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-white/70 uppercase tracking-wider">{t("nextLesson")}</span>
                <span className="font-medium truncate max-w-[150px]">{nextLesson.title}</span>
              </div>
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
        )}
      </div>
    </div>
  );
}
