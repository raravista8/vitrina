import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Как Vitrina обрабатывает персональные данные мастеров и конечных посетителей сайтов согласно ФЗ-152.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-20 text-base text-neutral-700">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Версия 1 (черновик) · Финальный текст готовится юристом и публикуется в T1.8 / T6.3.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">1. Оператор</h2>
          <p>
            Оператор персональных данных — ИП «Vitrina», сайт{" "}
            <Link className="underline" href="/">
              vitrina.site
            </Link>
            . Цели обработки: предоставление услуг по созданию сайта мастера и передача мастеру
            заявок от конечных посетителей сайта.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">2. Категории данных</h2>
          <ul className="list-disc pl-6">
            <li>ФИО, контактный телефон, адрес электронной почты, имя в Telegram / MAX</li>
            <li>IP-адрес, user-agent (для антифрод-защиты и аналитики)</li>
            <li>Контент, размещённый мастером в источнике (Telegram-канал, Я.Карты, фото)</li>
          </ul>

          <h2 className="text-xl font-semibold text-neutral-900">3. Правовое основание</h2>
          <p>Согласие субъекта персональных данных (ст. 6 ч. 1 п. 1 ФЗ-152).</p>

          <h2 className="text-xl font-semibold text-neutral-900">4. Локализация</h2>
          <p>Все данные хранятся в Российской Федерации — на серверах Yandex Cloud и Selectel.</p>

          <h2 className="text-xl font-semibold text-neutral-900">5. Удаление данных</h2>
          <p>
            Запрос на удаление: ответом на любое уведомление от Vitrina или через личный кабинет.
            Удаление происходит в течение 10 календарных дней.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
