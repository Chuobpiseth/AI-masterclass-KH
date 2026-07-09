"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { LoginForm } from "@/components/auth/LoginForm";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { useAuthStore } from "@/store/auth-store";
import { useHydration } from "@/hooks/use-hydration";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const hydrated = useHydration();

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      router.push("/dashboard");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center gradient-bg">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-primary/20" />
      </div>
    );
  }

  if (isAuthenticated) return null;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden gradient-bg px-4">
      {/* Animated Bubbles Background */}
      <div className="bubbles-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`bubble bubble-${i + 1}`} />
        ))}
      </div>

      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Logo & branding */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-5"
        >
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary/60 shadow-2xl shadow-primary/30">
            <Sparkles className="h-10 w-10 text-primary-foreground" />
          </div>
        </motion.div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">
          {siteConfig.name}
        </h1>
        <p className="text-lg font-medium text-primary/80 mb-3">
          {siteConfig.nameKh}
        </p>
        <p className="max-w-lg text-sm text-muted-foreground leading-relaxed">
          {siteConfig.slogan}
        </p>
      </motion.div>

      {/* Login form */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 text-xs text-muted-foreground/60 relative z-10 text-center px-4"
      >
        © 2026 AI Masterclass KH By CS101KH. All rights reserved.
      </motion.p>
    </div>
  );
}
