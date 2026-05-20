import type { Metadata } from "next";

import { FeedbackFloatingButton } from "@/components/FeedbackForm";

import "./globals.css";

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://samosite.online";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Copy from docs/COPY.md §1 — single source of truth.
  title: {
    default: "Vitrina — сайт, который сам себя ведёт и приносит вам заявки",
    template: "%s · Vitrina",
  },
  description:
    "Сайт-канал заявок для частных мастеров и малых услуг. ИИ собирает сайт из вашего источника (Telegram-канал, Яндекс.Карты или фото) и сам обновляет его каждую неделю.",
  applicationName: "Vitrina",
  authors: [{ name: "Vitrina" }],
  keywords: [
    "сайт для мастера",
    "сайт для барбершопа",
    "сайт для психолога",
    "сайт из Telegram",
    "сайт из Яндекс.Карт",
    "Vitrina",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Vitrina",
    title: "Сайт, который сам себя ведёт и приносит вам заявки",
    description:
      "Vitrina собирает сайт из вашего Telegram-канала, Яндекс.Карт или фото — и сам обновляет его каждую неделю.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitrina — сайт, который сам себя ведёт",
    description:
      "ИИ собирает сайт за пару минут и сам ловит заявки. Первый месяц бесплатно без карты.",
  },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Vitrina",
      url: SITE_URL,
      description: "AI-сборщик сайтов-канал заявок для частных мастеров и малых услуг в РФ.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Vitrina",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "990", priceCurrency: "RUB" },
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <FeedbackFloatingButton />
        <script
          type="application/ld+json"
          // Structured data must be a single literal JSON string; Next handles
          // HTML-escaping for the surrounding script element, and the JSON-LD
          // content itself contains no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
