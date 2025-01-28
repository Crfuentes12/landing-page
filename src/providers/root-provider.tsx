// src/providers/root-provider.tsx

import { ModalProvider } from "./modal-provider";
import { ScrollProvider } from "./scroll-provider";
import { ThemeProvider } from "./theme-provider";

export function RootProvider({ children }: { children: React.ReactNode }) {
    return (
      <ThemeProvider>
        <ScrollProvider>
          <ModalProvider>
            {children}
          </ModalProvider>
        </ScrollProvider>
      </ThemeProvider>
    );
  }