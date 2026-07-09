"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  BookOpen,
  CheckCircle2,
  Circle,
  Sparkles,
  Briefcase,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progress-store";
import modulesData from "@/data/modules.json";
import { siteConfig } from "@/config/site";
import type { Module } from "@/types";

const modules: Module[] = modulesData as Module[];

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Briefcase,
  TrendingUp,
  BookOpen,
};

interface CourseSidebarProps {
  onLessonClick?: () => void;
}

export function CourseSidebar({ onLessonClick }: CourseSidebarProps) {
  const pathname = usePathname();
  const { completedLessons } = useProgressStore();
  const [mounted, setMounted] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    setMounted(true);
    // Auto-expand the module that contains the current lesson
    const currentModule = modules.find((m) =>
      m.lessons.some((l) => pathname?.includes(l.slug))
    );
    if (currentModule) {
      setExpandedModules(new Set([currentModule.id]));
    } else {
      // Default: expand first module
      if (modules.length > 0) {
        setExpandedModules(new Set([modules[0].id]));
      }
    }
  }, [pathname]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const isLessonComplete = (moduleSlug: string, lessonSlug: string) => {
    if (!mounted) return false;
    const key = `${moduleSlug}/${lessonSlug}`;
    return completedLessons[key]?.completed || false;
  };

  const isLessonActive = (moduleSlug: string, lessonSlug: string) => {
    return pathname === `/lessons/${moduleSlug}/${lessonSlug}`;
  };

  const getModuleProgress = (mod: Module) => {
    if (!mounted) return 0;
    const completed = mod.lessons.filter((l) =>
      isLessonComplete(mod.slug, l.slug)
    ).length;
    return Math.round((completed / mod.lessons.length) * 100);
  };

  return (
    <div className="flex h-full flex-col bg-background border-r border-border/40">
      {/* Table of Content Title */}
      <div className="px-5 pt-6 pb-2">
        <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
          មាតិការមេរៀន / Table of Content
        </h3>
      </div>

      {/* Module list */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav aria-label="Course navigation" className="space-y-1.5">
          {modules
            .sort((a, b) => a.order - b.order)
            .map((mod) => {
              const Icon = iconMap[mod.icon || "BookOpen"] || BookOpen;
              const isExpanded = expandedModules.has(mod.id);
              const progress = getModuleProgress(mod);

              return (
                <div key={mod.id} className="space-y-0.5">
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-all duration-200",
                      "hover:bg-muted/50",
                      isExpanded && "bg-muted/30"
                    )}
                    aria-expanded={isExpanded}
                  >
                    <div
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                        progress === 100
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">
                        {mod.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {mod.lessons.length} lessons
                        {mounted && progress > 0 && ` · ${progress}%`}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </button>

                  {/* Lesson list */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-5 space-y-0.5 border-l-2 border-border/40 pl-4 py-1">
                          {mod.lessons
                            .sort((a, b) => a.order - b.order)
                            .map((lesson) => {
                              const isCompleted =
                                completedLessons[`${mod.slug}/${lesson.slug}`]?.completed;
                              const isCurrent =
                                pathname ===
                                `/lessons/${mod.slug}/${lesson.slug}`;

                              return (
                                <Link
                                  key={lesson.slug}
                                  href={`/lessons/${mod.slug}/${lesson.slug}`}
                                  onClick={onLessonClick}
                                  className={cn(
                                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200",
                                    isCurrent
                                      ? "bg-primary/10 text-primary font-semibold"
                                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                  )}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" />
                                  ) : (
                                    <Circle
                                      className={cn(
                                        "h-4 w-4 shrink-0",
                                        isCurrent
                                          ? "text-primary"
                                          : "text-border"
                                      )}
                                    />
                                  )}
                                  <span className="truncate">
                                    {lesson.title}
                                  </span>
                                </Link>
                              );
                            })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
        </nav>
      </ScrollArea>

      {/* Sidebar Footer */}
      <div className="border-t border-border/40 p-4 space-y-2">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
        >
          <BookOpen className="h-4 w-4" />
          Dashboard
        </Link>
        <a
          href={siteConfig.links.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl bg-blue-500/10 px-3 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-500/20"
        >
          <SiTelegram className="h-4 w-4" />
          ទាក់ទងជំនួយការ (Support)
        </a>
      </div>
    </div>
  );
}
