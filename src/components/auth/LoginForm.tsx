"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { KeyRound, ArrowRight, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthStore } from "@/store/auth-store";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import { validateAccessCode, getStudentByCode } from "@/lib/auth";
import { SiTelegram } from "react-icons/si";
import { siteConfig } from "@/config/site";
import { UAParser } from "ua-parser-js";

export function LoginForm() {
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const { login } = useAuthStore();
  const { language } = useLanguageStore();
  const t = useTranslation(language);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev < 2 ? prev + 1 : prev));
    }, 2000);

    const normalizedCode = code.trim().toUpperCase();

    if (normalizedCode.length !== 8) {
      clearInterval(stepInterval);
      setError(t("codeLength"));
      setLoading(false);
      return;
    }

    // Capture precise device info using UAParser
    let ip = "Unknown IP";
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      ip = data.ip;
    } catch (e) {
      console.error("Failed to fetch IP", e);
    }

    let deviceName = "Unknown Device";
    if (typeof window !== "undefined") {
      const parser = new UAParser();
      const result = parser.getResult();
      const vendor = result.device.vendor || result.os.name || "Computer";
      const model = result.device.model || "Device";
      const browser = result.browser.name || "Unknown Browser";
      
      deviceName = `${vendor} ${model} - ${browser} - IP: ${ip}`;
    }

    const student = await validateAccessCode(normalizedCode, deviceName);
    
    clearInterval(stepInterval);

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
      <Card className="w-full max-w-md border border-slate-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden relative group">
        <div className="absolute top-0 right-0 p-32 opacity-20 bg-gradient-to-br from-sky-400 to-purple-500 blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-40" />
        <div className="absolute bottom-0 left-0 p-32 opacity-10 bg-gradient-to-tr from-pink-500 to-amber-400 blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 group-hover:opacity-30" />
        
        <CardContent className="p-8 relative z-10">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-6"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-purple-600 shadow-lg shadow-purple-500/30">
              <KeyRound className="h-8 w-8 text-white" />
            </div>
          </motion.div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
              {t("enterAccessCodeTitle")}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t("enterAccessCodeDesc")}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Input
                type={showCode ? "text" : "password"}
                placeholder={t("accessCodePlaceholder")}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setError("");
                }}
                className="h-14 text-center text-xl font-mono tracking-[0.4em] rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-purple-500/50 transition-all placeholder:tracking-normal placeholder:text-sm placeholder:font-sans pr-12"
                maxLength={8}
                autoComplete="off"
                autoFocus
                disabled={loading}
                aria-label="Access code"
                aria-describedby={error ? "code-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-purple-500 transition-colors focus:outline-none"
                aria-label={showCode ? "Hide code" : "Show code"}
              >
                {showCode ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                id="code-error"
                role="alert"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full h-14 rounded-xl text-base font-semibold border-0 bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500 hover:opacity-90 text-white transition-all group shadow-lg shadow-purple-500/25"
              disabled={loading || code.length < 8}
            >
              {loading ? (
               <div className="flex items-center gap-3">
                 <Loader2 className="h-5 w-5 animate-spin" />
                 <span className="text-sm font-medium animate-pulse">
                   {loadingStep === 0 && "ភ្ជាប់ database..."}
                   {loadingStep === 1 && "ត្រួតពិនិត្យកូដសម្ងាត់..."}
                   {loadingStep === 2 && "ត្រួតពិនិត្យសុវត្ថិភាព..."}
                 </span>
               </div>
              ) : (
                <>
                  {t("startLearning")}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                </>
              )}
            </Button>
          </form>

          {/* Help text */}
          <div className="mt-8 space-y-4 text-center">
            <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-pre-line leading-relaxed">
              {t("loginHelp")}
            </p>
            
            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-500/10 px-5 py-2.5 text-sm font-medium text-blue-600 dark:text-blue-400 transition-colors hover:bg-blue-500/20"
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
