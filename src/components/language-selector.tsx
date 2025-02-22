// src/components/language-selector.tsx
"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/providers/language-provider";

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = localStorage.getItem("preferredLanguage") as "en" | "es" | "fr";
    if (storedLang && storedLang !== language) {
      setLanguage(storedLang);
    }
    document.documentElement.lang = language;
  }, [language, setLanguage]);

  if (!mounted) return null; // Prevent hydration mismatch

  return null; // No UI, just logic
}
