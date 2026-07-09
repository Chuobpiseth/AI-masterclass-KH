"use client";

import { Type } from "lucide-react";
import { useTextSizeStore } from "@/store/text-size-store";
import { useHydration } from "@/hooks/use-hydration";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "@/lib/i18n";
import { useLanguageStore } from "@/store/language-store";

export function TextSizeSwitcher() {
  const { size, setSize } = useTextSizeStore();
  const hydrated = useHydration();
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  if (!hydrated) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl">
        <Type className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors relative"
            aria-label="Adjust text size"
          >
            <Type className="h-4 w-4" />
          </Button>
        }
      />
      <DropdownMenuContent align="end" className="w-56 p-4 rounded-xl">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">{t("textSize") || "Text Size"}</h4>
            <span className="text-xs text-muted-foreground">{size}px</span>
          </div>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-primary"
            aria-label="Text size slider"
          />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>A</span>
            <span className="text-lg leading-none">A</span>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
