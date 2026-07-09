"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import { validateAccessCode, getStudentByCode } from "@/lib/auth";
import { SiTelegram } from "react-icons/si";
import { siteConfig } from "@/config/site";

export function LoginForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const { language } = useLanguageStore();
  const t = useTranslation(language);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate network delay for UX
    await new Promise((r) => setTimeout(r, 600));

    const normalizedCode = code.trim().toUpperCase();

    if (normalizedCode.length !== 8) {
      setError(t("codeLength"));
      setLoading(false);
      return;
    }

    // Capture basic device info
    const deviceName = typeof window !== "undefined" ? 
      `${navigator.platform} - ${navigator.userAgent.split(' ')[0]}` : "Unknown Device";

    const student = await validateAccessCode(normalizedCode, deviceName);

    if (student) {
      login(student.name, student.code);
      router.push("/dashboard");
    } else {
      // Check if code exists but is inactive
      const existingStudent = await getStudentByCode(normalizedCode);
      if (existingStudent && existingStudent.status !== "active") {
        setError(t("deactivatedCode"));
      } else {
        setError(t("invalidCode"));
      }
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="w-full max-w-md border-border/30 bg-card/80 backdrop-blur-xl glow-shadow rounded-2xl overflow-hidden relative">
        <div className="absolute top-0 right-0 p-32 opacity-20 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
        <CardContent className="p-8 relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/20">
              <KeyRound className="h-8 w-8 text-primary-foreground" />
            </div>
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2">
              {t("enterAccessCodeTitle")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("enterAccessCodeDesc")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder={t("accessCodePlaceholder")}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                className="h-12 text-center text-lg font-mono tracking-[0.3em] rounded-xl border-border/50 bg-muted/30 focus:bg-background placeholder:tracking-normal placeholder:text-sm placeholder:font-sans"
                maxLength={8}
                autoComplete="off"
                autoFocus
                disabled={loading}
                aria-label="Access code"
                aria-describedby={error ? "code-error" : undefined}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"
                id="code-error"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-12 rounded-xl text-base font-semibold border-0 btn-gradient-cyan transition-all group"
              disabled={loading || code.length < 8}
            >
              {loading ? (
               <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  {t("startLearning")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>

          {/* Help text */}
          <div className="mt-8 space-y-4 text-center">
            <p className="text-xs text-muted-foreground whitespace-pre-line leading-relaxed">
              {t("loginHelp")}
            </p>
            
            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-500 transition-colors hover:bg-blue-500/20"
            >
              <SiTelegram className="h-4 w-4" />
              <span>ទាក់ទងយកលេខកូដចូលរៀន (Contact Support)</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
