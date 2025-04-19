// src/providers/root-provider.tsx
"use client";

import { ModalProvider } from "./modal-provider";
import { ScrollProvider } from "./scroll-provider";
import { ThemeProvider } from "./theme-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <ThemeProvider defaultTheme="system">
        <ModalProvider>
          {children}
        </ModalProvider>
      </ThemeProvider>
    </ScrollProvider>
  );
}