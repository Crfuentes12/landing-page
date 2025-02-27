//src/components/layout/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import Link from "next/link";
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "#why-we-do-this", labelKey: "nav.mission" },
    { href: "#roadmap", labelKey: "nav.services" },
    { href: "#about", labelKey: "nav.about" },
    { href: "#pricing", labelKey: "nav.pricing" },
    { href: "#faq", labelKey: "nav.faq" },
    { href: "#contact", labelKey: "nav.contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logos/sprintlaunchers-full-logo.png"
              alt="Sprint Launchers Logo"
              width={160}
              height={40}
              className={`object-contain transition-all duration-300 ${theme === "dark" ? "brightness-0 invert opacity-70 filter-gpu transform-gpu" : "opacity-80 transform-gpu"}`}
              priority
            />
          </Link>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm hover:text-primary transition-colors"
                onClick={handleLinkClick}
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </nav>
          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitch />
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden bg-background border-t`}
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm hover:text-primary"
              onClick={handleLinkClick}
            >
              {t(link.labelKey)}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-2">
            <LanguageSwitch />
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
              {t("theme")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;