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

const geistSans = Geist({ subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "SprintLaunchers - Desarrollo de MVPs para Startups",
  description: "Crea tu MVP con SprintLaunchers y valida tu idea rápidamente. Desarrollo ágil de software para startups y emprendedores con Next.js, React y TypeScript.",
  openGraph: {
    title: "SprintLaunchers - Desarrollo de MVPs para Startups",
    description: "Crea tu MVP con SprintLaunchers y valida tu idea rápidamente.",
    url: "https://sprintlaunchers.com",
    type: "website",
    images: [
      {
        url: "https://sprintlaunchers.com/logos/sprintlaunchers-icon.png",
        width: 1200,
        height: 630,
        alt: "SprintLaunchers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SprintLaunchers - Desarrollo de MVPs para Startups",
    description: "Crea tu MVP con SprintLaunchers y valida tu idea rápidamente.",
    images: ["https://sprintlaunchers.com/logos/sprintlaunchers-icon.png"],
  },
  metadataBase: new URL("https://sprintlaunchers.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${geistSans.className} ${geistMono.className}`} suppressHydrationWarning>
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

        {/* Google Ads & Analytics (Movido Fuera de <head>) */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-16491618146" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16491618146', { anonymize_ip: true });
          `}
        </Script>
      </body>
    </html>
  );
}
