"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  studentName: string | null;
  studentCode: string | null;
  login: (name: string, code: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      studentName: null,
      studentCode: null,
      login: (name: string, code: string) =>
        set({
          isAuthenticated: true,
          studentName: name,
          studentCode: code,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          studentName: null,
          studentCode: null,
        }),
    }),
    {
      name: "ai-masterclass-auth",
    }
  )
);
