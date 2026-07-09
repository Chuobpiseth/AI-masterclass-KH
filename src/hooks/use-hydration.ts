"use client";

import { useEffect, useState } from "react";

/**
 * Hook to safely use Zustand persisted stores with SSR/SSG.
 * Prevents hydration mismatches by waiting for client mount.
 */
export function useHydration() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return hydrated;
}
