"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ThemeProvider } from "@/context/ThemeContext.tsx";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Provider store={store}>{children}</Provider>
    </ThemeProvider>
  );
}
