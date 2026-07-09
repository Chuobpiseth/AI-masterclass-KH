"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, CheckCircle2, BookOpen, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";

interface ProgressCardProps {
  completedCount: number;
  totalLessons: number;
}

export function ProgressCard({
  completedCount,
  totalLessons,
}: ProgressCardProps) {
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  const percentage =
    totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const remaining = totalLessons - completedCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="h-full border-border/30 shadow-sm hover:shadow-md transition-all glow-shadow">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
            <Trophy className="h-4 w-4 text-primary" />
            {t("courseProgress")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="6"
                  className="text-muted/20"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${2 * Math.PI * 34}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 34 }}
                  animate={{
                    strokeDashoffset:
                      2 * Math.PI * 34 * (1 - (mounted ? percentage / 100 : 0)),
                  }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold">{mounted ? percentage : 0}%</span>
              </div>
            </div>

            <div className="flex-1 space-y-2.5">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-muted-foreground">{t("completed")}:</span>
                <span className="font-semibold">
                  {mounted ? completedCount : 0}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-amber-500" />
                <span className="text-muted-foreground">{t("remaining")}:</span>
                <span className="font-semibold">{mounted ? remaining : totalLessons}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">{t("total")}:</span>
                <span className="font-semibold">{totalLessons}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
