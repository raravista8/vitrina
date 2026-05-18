import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Copy from docs/COPY.md §1 — final canonical messaging lives in T1.4.
  title: "Vitrina — сайт, который сам себя ведёт и приносит вам заявки",
  description:
    "Сайт-канал заявок для частных мастеров и малых услуг. ИИ собирает сайт из вашего источника (Telegram, Яндекс.Карты, фото) и сам обновляет его каждую неделю.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-white text-neutral-900 antialiased">{children}</body>
    </html>
  );
}
