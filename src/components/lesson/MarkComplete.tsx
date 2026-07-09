"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/progress-store";

interface MarkCompleteProps {
  moduleSlug: string;
  lessonSlug: string;
}

export function MarkComplete({ moduleSlug, lessonSlug }: MarkCompleteProps) {
  const { completedLessons, markComplete, markIncomplete } = useProgressStore();
  const [loading, setLoading] = useState(false);

  const key = `${moduleSlug}/${lessonSlug}`;
  const isComplete = completedLessons[key]?.completed || false;

  const handleToggle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 300));
    if (isComplete) {
      markIncomplete(moduleSlug, lessonSlug);
    } else {
      markComplete(moduleSlug, lessonSlug);
    }
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <Button
        onClick={handleToggle}
        variant={isComplete ? "outline" : "default"}
        className={`rounded-xl transition-all ${
          isComplete
            ? "border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400"
            : "shadow-lg shadow-primary/20"
        }`}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : isComplete ? (
          <CheckCircle2 className="h-4 w-4 mr-2" />
        ) : (
          <Circle className="h-4 w-4 mr-2" />
        )}
        {isComplete ? "Completed" : "Mark Complete"}
      </Button>
    </motion.div>
  );
}
