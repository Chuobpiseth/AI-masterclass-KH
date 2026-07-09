"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useHydration } from "@/hooks/use-hydration";
import { Header } from "@/components/layout/Header";
import { CourseSidebar } from "@/components/layout/Sidebar";

export default function LessonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();
  const hydrated = useHydration();

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.push("/");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <aside className="hidden lg:block w-[26rem] shrink-0">
          <div className="sticky top-16 h-[calc(100vh-4rem)]">
            <CourseSidebar />
          </div>
        </aside>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
