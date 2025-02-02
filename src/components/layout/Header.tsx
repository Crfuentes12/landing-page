// src/components/Header.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from 'next/link';
import { useTheme } from "@/providers/theme-provider";
import { useLanguage } from "@/providers/language-provider";
import { LanguageSwitch } from "@/components/LanguageSwitch";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme, theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
    className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
        ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}
      `}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl">
            YourLogo
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#about" className="text-sm hover:text-primary transition-colors">
              {t('nav.about')}
            </Link>
            <Link href="#services" className="text-sm hover:text-primary transition-colors">
              {t('nav.services')}
            </Link>
            <Link href="#pricing" className="text-sm hover:text-primary transition-colors">
              {t('nav.pricing')}
            </Link>
            <Link href="#contact" className="text-sm hover:text-primary transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitch />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-background border-t`}
      >
        <div className="px-6 py-4 space-y-4">
          <Link href="#about" className="block py-2 text-sm hover:text-primary">
            {t('nav.about')}
          </Link>
          <Link href="#services" className="block py-2 text-sm hover:text-primary">
            {t('nav.services')}
          </Link>
          <Link href="#pricing" className="block py-2 text-sm hover:text-primary">
            {t('nav.pricing')}
          </Link>
          <Link href="#contact" className="block py-2 text-sm hover:text-primary">
            {t('nav.contact')}
          </Link>
          <div className="pt-4 flex flex-col gap-2">
            <LanguageSwitch />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              {t('theme')}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;