import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { courseConfig } from "@/config/site";

type Language = "km" | "en";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: "km",
      setLanguage: (language) => set({ language }),
      toggleLanguage: () =>
        set((state) => ({ language: state.language === "km" ? "en" : "km" })),
    }),
    {
      name: `${courseConfig.localStoragePrefix}-language`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
