// src/app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/layout/Header";
import { RootProvider } from "@/providers/root-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import { LanguageSelector } from "@/components/language-selector";
import "./globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
config.autoAddCss = false;

import { library } from "@fortawesome/fontawesome-svg-core";
import { faWhatsapp, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

library.add(faWhatsapp, faLinkedin, faInstagram);

const geistSans = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.className} ${geistMono.className}`} suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#09090b" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/logos/sprintlaunchers-icon.png" />
        <link rel="apple-touch-icon" href="/logos/sprintlaunchers-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        {/* Google Ads Tag */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-16491618146" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16491618146');
          `}
        </Script>
      </head>
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