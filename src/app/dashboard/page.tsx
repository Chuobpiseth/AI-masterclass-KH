"use client";

import { motion } from "framer-motion";
import { WelcomeCard } from "@/components/dashboard/WelcomeCard";
import { ProgressCard } from "@/components/dashboard/ProgressCard";
import { ContinueLearning } from "@/components/dashboard/ContinueLearning";
import { RecentLessons } from "@/components/dashboard/RecentLessons";
import { useProgressStore } from "@/store/progress-store";
import modulesData from "@/data/modules.json";
import type { Module } from "@/types";

const modules: Module[] = modulesData as Module[];

export default function DashboardPage() {
  const { completedLessons, currentLesson } = useProgressStore();
  
  const completedCount = Object.values(completedLessons).filter(l => l.completed).length;
  const totalLessons = modules.reduce((acc, mod) => acc + mod.lessons.length, 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-4 lg:p-8 max-w-5xl mx-auto space-y-6"
    >
      {/* Welcome */}
      <WelcomeCard />

      {/* Stats row */}
      <div className="grid gap-6 sm:grid-cols-2">
        <ProgressCard 
          completedCount={completedCount}
          totalLessons={totalLessons}
        />
        <ContinueLearning 
          lastLesson={currentLesson}
          modules={modules}
        />
      </div>

      {/* Recent Lessons */}
      <RecentLessons modules={modules} />
    </motion.div>
  );
}
