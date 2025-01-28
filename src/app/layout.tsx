// src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header, Footer } from "@/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Digital Solutions Partner | YourLogo",
  description: "Transform your digital presence with our expert web development, mobile app, and digital marketing solutions.",
  keywords: "web development, mobile apps, digital marketing, SEO, cloud solutions",
  authors: [{ name: "YourLogo Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "YourLogo",
    title: "YourLogo - Digital Solutions Partner",
    description: "Transform your digital presence with our expert solutions",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YourLogo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YourLogo - Digital Solutions Partner",
    description: "Transform your digital presence with our expert solutions",
    images: ["https://yourdomain.com/twitter-image.jpg"],
    creator: "@yourlogo",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.className} ${geistMono.className}`}>
      <head>
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no"/>
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}