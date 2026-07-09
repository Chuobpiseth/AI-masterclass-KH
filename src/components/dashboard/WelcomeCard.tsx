"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import { siteConfig } from "@/config/site";

export function WelcomeCard() {
  const { studentName } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  const hour = new Date().getHours();
  let greetingKey: "goodMorning" | "goodAfternoon" | "goodEvening" = "goodMorning";
  
  if (hour >= 12 && hour < 17) {
    greetingKey = "goodAfternoon";
  } else if (hour >= 17) {
    greetingKey = "goodEvening";
  }

  const greeting = t(greetingKey);

  if (!mounted) {
    return (
      <Card className="border-none bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl glow-shadow">
        <CardContent className="p-6">
          <div className="h-20 animate-pulse rounded-lg bg-muted/30" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-none bg-gradient-to-br from-primary/10 via-background to-background glow-shadow relative">
        <div className="absolute top-0 right-0 p-32 opacity-20 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                {greeting} 👋
              </p>
              <h2 className="text-2xl font-bold tracking-tight mb-2">
                {studentName || "Student"}
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                {t("welcomeDesc")}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                {t("instructor")}: {siteConfig.teacher}
              </div>
            </div>
            <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
