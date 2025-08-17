"use client";

import { useEffect, type ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage.tsx";
import { ThemeContext } from "./useTheme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useLocalStorage<boolean>("darkMode", false);
  const toggle = () => setIsDark(!isDark);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
