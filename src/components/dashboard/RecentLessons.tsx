"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useProgressStore } from "@/store/progress-store";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import type { Module } from "@/types";

export function RecentLessons({ modules }: { modules: Module[] }) {
  const { completedLessons } = useProgressStore();
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  // Extract all lessons across all modules
  const allLessons = modules.flatMap((m) =>
    m.lessons.map((l) => ({
      ...l,
      moduleSlug: m.slug,
      moduleTitle: m.title,
    }))
  );

  // Get first 4 lessons
  const displayLessons = allLessons.slice(0, 4);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Card className="border-border/30 glow-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {t("recentLessons")}
            </CardTitle>
            <CardDescription>{t("allLessons")}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div 
          className="space-y-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {displayLessons.map((lesson, idx) => {
            const isCompleted = completedLessons[`${lesson.moduleSlug}/${lesson.slug}`]?.completed;
            
            return (
              <motion.div key={idx} variants={item}>
                <Link
                  href={`/lessons/${lesson.moduleSlug}/${lesson.slug}`}
                  className="group flex gap-4 p-3 -mx-3 rounded-xl hover:bg-muted/50 transition-colors relative"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="text-xs font-bold">{idx + 1}</span>
                  </div>
                  <div className="flex flex-col flex-1 gap-1 min-w-0">
                    <h4 className="text-sm font-semibold leading-none truncate group-hover:text-primary transition-colors">
                      {lesson.title}
                    </h4>
                    <p className="text-xs text-muted-foreground truncate">
                      {lesson.moduleTitle}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {isCompleted ? (
                      <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full">
                        {t("completed")}
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground font-medium">
                        {lesson.duration}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </CardContent>
    </Card>
  );
}
