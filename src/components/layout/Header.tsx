"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { TextSizeSwitcher } from "@/components/shared/TextSizeSwitcher";
import { SearchBar } from "@/components/shared/SearchBar";
import { CourseSidebar } from "@/components/layout/Sidebar";
import { useAuthStore } from "@/store/auth-store";
import { siteConfig } from "@/config/site";

export function Header() {
  const { studentName, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 glow-bottom"
      >
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden h-9 w-9 rounded-xl"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <CourseSidebar onLessonClick={() => setMobileOpen(false)} />
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/20">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-sm font-bold leading-none tracking-tight">
                  {siteConfig.name}
                </h1>
                <p className="text-[10px] text-muted-foreground font-medium">
                  {siteConfig.teacher}
                </p>
              </div>
            </Link>
          </div>

          {/* Center: Search */}
          <div className="flex-1 flex justify-center px-4">
            <SearchBar />
          </div>

          {/* Right: User + Controls */}
          <div className="flex items-center gap-2">
            <TextSizeSwitcher />
            <LanguageSwitcher />
            <ThemeToggle />

            {mounted && studentName && (
              <div className="hidden sm:flex items-center gap-2 rounded-xl border border-border/50 bg-muted/30 px-3 py-1.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-[10px] font-bold text-primary-foreground">
                  {studentName.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium max-w-24 truncate">
                  {studentName}
                </span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-xl hover:bg-destructive/10 hover:text-destructive"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.header>
    </div>
  );
}
