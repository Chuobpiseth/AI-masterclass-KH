"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useLanguageStore } from "@/store/language-store";
import { useTranslation } from "@/lib/i18n";
import modulesData from "@/data/modules.json";
import type { Module } from "@/types";

const modules: Module[] = modulesData as Module[];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const { language } = useLanguageStore();
  const t = useTranslation(language);

  // Keyboard shortcut (Cmd+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (moduleSlug: string, lessonSlug: string) => {
    setOpen(false);
    router.push(`/lessons/${moduleSlug}/${lessonSlug}`);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full justify-start text-muted-foreground sm:w-64 lg:w-80 rounded-xl bg-background/50 hover:bg-background shadow-sm"
        onClick={() => setOpen(true)}
        aria-label={t("searchPlaceholder")}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">{t("searchPlaceholder")}</span>
        <span className="inline-flex lg:hidden">{t("searchPlaceholder")}</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t("searchPlaceholder")} />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {modules.map((mod) => (
            <CommandGroup key={mod.slug} heading={mod.title}>
              {mod.lessons.map((lesson) => (
                <CommandItem
                  key={lesson.slug}
                  value={`${mod.title} ${lesson.title} ${lesson.keywords?.join(" ")}`}
                  onSelect={() => handleSelect(mod.slug, lesson.slug)}
                  className="flex flex-col items-start gap-1 py-3"
                >
                  <span className="font-semibold">{lesson.title}</span>
                  {lesson.description && (
                    <span className="text-xs text-muted-foreground line-clamp-1">
                      {lesson.description}
                    </span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
}
