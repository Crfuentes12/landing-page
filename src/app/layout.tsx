// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Script from "next/script";
import Header from "@/components/layout/Header";
import { RootProvider } from "@/providers/root-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

config.autoAddCss = false;

import { library } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

library.add(faWhatsapp, faLinkedin, faInstagram);

const geistSans = Geist({ subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.className} ${geistMono.className}`} suppressHydrationWarning>
      <Head>
        {/* SEO Meta Tags */}
        <title>SprintLaunchers - Desarrollo de MVPs para Startups</title>
        <meta name="description" content="Crea tu MVP con SprintLaunchers y valida tu idea rápidamente. Desarrollo ágil de software para startups y emprendedores con Next.js, React y TypeScript." />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Open Graph Meta Tags (SEO y redes sociales) */}
        <meta property="og:title" content="SprintLaunchers - Desarrollo de MVPs para Startups" />
        <meta property="og:description" content="Crea tu MVP con SprintLaunchers y valida tu idea rápidamente." />
        <meta property="og:image" content="https://sprintlaunchers.com/logos/sprintlaunchers-og.png" />
        <meta property="og:url" content="https://sprintlaunchers.com" />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SprintLaunchers - Desarrollo de MVPs para Startups" />
        <meta name="twitter:description" content="Crea tu MVP con SprintLaunchers y valida tu idea rápidamente." />
        <meta name="twitter:image" content="https://sprintlaunchers.com/logos/sprintlaunchers-og.png" />

        {/* Canonical para evitar duplicados */}
        <link rel="canonical" href="https://sprintlaunchers.com" />

        {/* Favicon y Preload de imágenes críticas */}
        <link rel="icon" href="/logos/sprintlaunchers-icon.png" />
        <link rel="apple-touch-icon" href="/logos/sprintlaunchers-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/logos/sprintlaunchers-icon.png" as="image" />
        <link rel="preload" href="https://sprintlaunchers.com/logos/sprintlaunchers-og.png" as="image" />

        {/* Google Ads & Analytics (Optimizado con next/script) */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-16491618146" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16491618146', { anonymize_ip: true });
          `}
        </Script>
      </Head>
      <body className="min-h-screen bg-background font-sans antialiased overflow-x-hidden" suppressHydrationWarning>
        <LanguageProvider>
          <ThemeProvider defaultTheme="system">
            <RootProvider>
              <LanguageSelector />
              <div className="relative flex min-h-screen flex-col overflow-hidden">
                <Header />
                <main className="flex-1 pt-16 w-full">{children}</main>
              </div>
            </RootProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
