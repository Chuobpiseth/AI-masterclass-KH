"use client";

import { useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTextSizeStore } from "@/store/text-size-store";
import { useHydration } from "@/hooks/use-hydration";

export function Providers({ children }: { children: React.ReactNode }) {
  const { size } = useTextSizeStore();
  const hydrated = useHydration();

  useEffect(() => {
    if (!hydrated) return;
    const root = document.documentElement;
    root.style.setProperty("--text-scale", `${size}px`);
  }, [size, hydrated]);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <TooltipProvider>{children}</TooltipProvider>
    </NextThemesProvider>
  );
}
