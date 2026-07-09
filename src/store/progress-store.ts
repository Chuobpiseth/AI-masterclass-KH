"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { LessonProgress } from "@/types";

interface ProgressState {
  completedLessons: Record<string, LessonProgress>;
  currentLesson: { moduleSlug: string; lessonSlug: string } | null;
  lastAccessedAt: string | null;

  // Actions
  markComplete: (moduleSlug: string, lessonSlug: string) => void;
  markIncomplete: (moduleSlug: string, lessonSlug: string) => void;
  setCurrentLesson: (moduleSlug: string, lessonSlug: string) => void;
  accessLesson: (moduleSlug: string, lessonSlug: string) => void;
  isLessonComplete: (moduleSlug: string, lessonSlug: string) => boolean;
  getCompletedCount: () => number;
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: {},
      currentLesson: null,
      lastAccessedAt: null,

      markComplete: (moduleSlug: string, lessonSlug: string) => {
        const key = `${moduleSlug}/${lessonSlug}`;
        set((state) => ({
          completedLessons: {
            ...state.completedLessons,
            [key]: {
              lessonSlug,
              moduleSlug,
              completed: true,
              completedAt: new Date().toISOString(),
              lastAccessedAt: new Date().toISOString(),
            },
          },
        }));
      },

      markIncomplete: (moduleSlug: string, lessonSlug: string) => {
        const key = `${moduleSlug}/${lessonSlug}`;
        set((state) => {
          const updated = { ...state.completedLessons };
          delete updated[key];
          return { completedLessons: updated };
        });
      },

      setCurrentLesson: (moduleSlug: string, lessonSlug: string) => {
        set({
          currentLesson: { moduleSlug, lessonSlug },
          lastAccessedAt: new Date().toISOString(),
        });
      },

      accessLesson: (moduleSlug: string, lessonSlug: string) => {
        const key = `${moduleSlug}/${lessonSlug}`;
        set((state) => ({
          currentLesson: { moduleSlug, lessonSlug },
          lastAccessedAt: new Date().toISOString(),
          completedLessons: {
            ...state.completedLessons,
            [key]: {
              ...state.completedLessons[key],
              lessonSlug,
              moduleSlug,
              completed: state.completedLessons[key]?.completed || false,
              lastAccessedAt: new Date().toISOString(),
            },
          },
        }));
      },

      isLessonComplete: (moduleSlug: string, lessonSlug: string) => {
        const key = `${moduleSlug}/${lessonSlug}`;
        return get().completedLessons[key]?.completed || false;
      },

      getCompletedCount: () => {
        return Object.values(get().completedLessons).filter(
          (l) => l.completed
        ).length;
      },

      resetProgress: () => {
        set({
          completedLessons: {},
          currentLesson: null,
          lastAccessedAt: null,
        });
      },
    }),
    {
      name: "ai-masterclass-progress",
    }
  )
);
