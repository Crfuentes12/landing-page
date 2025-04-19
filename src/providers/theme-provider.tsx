// src/providers/theme-provider.tsx
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
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
    const [mounted, setMounted] = useState(false);
    const [theme, setTheme] = useLocalStorage<Theme>('theme', defaultTheme);
  
    // Apply theme class only after hydration to avoid mismatch
    useEffect(() => {
      setMounted(true);
    }, []);
  
    useEffect(() => {
      if (!mounted) return;
      
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
    }, [theme, mounted]);
  
    // Provide the value that will be consumed by the hook
    const value = { theme, setTheme };
  
    return (
      <ThemeProviderContext.Provider value={value}>
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