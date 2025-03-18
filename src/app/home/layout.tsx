// src/app/home/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SprintLaunchers - Desarrollo de MVPs para Startups",
  description: "Crea tu MVP con SprintLaunchers y valida tu idea rápidamente. Desarrollo ágil de software para startups y emprendedores con Next.js, React y TypeScript.",
  openGraph: {
    title: "SprintLaunchers - Desarrollo de MVPs para Startups",
    description: "Crea tu MVP con SprintLaunchers y valida tu idea rápidamente.",
    url: "https://sprintlaunchers.com/home",
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
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}