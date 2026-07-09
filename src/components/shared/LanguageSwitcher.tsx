"use client";

import { useLanguageStore } from "@/store/language-store";
import { useHydration } from "@/hooks/use-hydration";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { language, toggleLanguage } = useLanguageStore();
  const hydrated = useHydration();

  if (!hydrated) {
    return (
      <Button variant="ghost" size="sm" className="h-9 w-12 font-medium">
        KM
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 w-12 font-bold tracking-wide rounded-xl hover:bg-primary/10 hover:text-primary transition-colors uppercase"
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      {language}
    </Button>
  );
}
