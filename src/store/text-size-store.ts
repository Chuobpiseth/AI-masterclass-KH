import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { courseConfig } from "@/config/site";

interface TextSizeState {
  size: number;
  setSize: (size: number) => void;
}

export const useTextSizeStore = create<TextSizeState>()(
  persist(
    (set) => ({
      size: 16,
      setSize: (size) => set({ size }),
    }),
    {
      name: `${courseConfig.localStoragePrefix}-text-size`,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
