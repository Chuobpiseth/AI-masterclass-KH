"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import type { Module } from "@/types";

interface ContinueLearningProps {
  lastLesson: { moduleSlug: string; lessonSlug: string } | null;
  modules: Module[];
}

export function ContinueLearning({ lastLesson, modules }: ContinueLearningProps) {
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  // If no last lesson, start from the first module's first lesson
  let targetModule = modules[0];
  let targetLesson = targetModule?.lessons[0];

  if (lastLesson) {
    const mod = modules.find((m) => m.slug === lastLesson.moduleSlug);
    const lesson = mod?.lessons.find((l) => l.slug === lastLesson.lessonSlug);
    
    if (mod && lesson) {
      targetModule = mod;
      targetLesson = lesson;
    }
  }

  if (!targetModule || !targetLesson) return null;

  const url = `/lessons/${targetModule.slug}/${targetLesson.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    >
      <Card className="border-border/30 bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow relative glow-shadow">
        <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center rounded bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary uppercase tracking-wider">
                  {t("continueLearning")}
                </span>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <PlayCircle className="h-3 w-3" />
                  {targetLesson.duration}
                </span>
              </div>
              <h3 className="text-lg font-bold leading-tight line-clamp-1">
                {targetLesson.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {targetModule.title}
              </p>
            </div>
            
            <Link href={url} className={cn(buttonVariants({ size: "sm" }), "w-full sm:w-auto shrink-0 group rounded-full border-0 btn-gradient-pink")}>
                {lastLesson ? t("continueLearning") : t("startLearning")}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
