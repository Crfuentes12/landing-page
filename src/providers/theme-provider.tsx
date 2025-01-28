// src/providers/theme-provider.tsx
"use client";
import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

export function ThemeProvider({
    children,
    defaultTheme = 'system',
  }: {
    children: React.ReactNode;
    defaultTheme?: Theme;
  }) {
    const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultTheme);
  
    useEffect(() => {
      if (typeof window === "undefined") return;
      
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
  
      if (theme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light';
        root.classList.add(systemTheme);
      } else {
        root.classList.add(theme);
      }
    }, [theme]);
  
    return (
      <ThemeProviderContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeProviderContext.Provider>
    );
  }

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};