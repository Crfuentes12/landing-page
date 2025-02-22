// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import { RootProvider } from "@/providers/root-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import "./globals.css";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { library } from '@fortawesome/fontawesome-svg-core'
import { faWhatsapp, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

library.add(faWhatsapp, faLinkedin, faInstagram)

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

const getMetadata = (lang: "en" | "es" | "fr") => {
  const meta = {
    en: { title: "SprintLaunchers | Build your MVP quick", description: "Launch your Software MVP in 6 weeks and save 30% of development costs.", locale: "en_US" },
    es: { title: "SprintLaunchers | Construye tu MVP rápido", description: "Lanza tu Software MVP en 6 semanas y ahorra un 30% en costos de desarrollo.", locale: "es_ES" },
    fr: { title: "SprintLaunchers | Développez votre MVP rapidement", description: "Lancez votre MVP logiciel en 6 semaines et économisez 30% des coûts de développement.", locale: "fr_FR" },
  };
  return {
    ...meta[lang],
    authors: [{ name: "SprintLaunchers Team" }],
    openGraph: {
      type: "website",
      url: "https://yourdomain.com",
      siteName: "SprintLaunchers",
      title: meta[lang].title,
      description: meta[lang].description,
      locale: meta[lang].locale,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SprintLaunchers MVP" }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta[lang].title,
      description: meta[lang].description,
      images: ["/twitter-image.jpg"],
      creator: "@SprintLaunchers",
    },
  };
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <LanguageSelector />
      <LayoutWrapper>{children}</LayoutWrapper>
    </LanguageProvider>
  );
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`} suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/logos/sprintlaunchers-icon.png" />
        <link rel="apple-touch-icon" href="/logos/sprintlaunchers-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        <ThemeProvider defaultTheme="system">
          <RootProvider>
            <div className="relative flex min-h-screen flex-col overflow-hidden">
              <Header />
              <main className="flex-1 pt-16 w-full">{children}</main>
            </div>
          </RootProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
