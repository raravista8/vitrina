import type { Metadata } from "next";

import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Оферта",
  description:
    "Условия использования сервиса Vitrina — публичная оферта на оказание услуг по созданию и поддержанию сайта.",
  alternates: { canonical: "/offer" },
};

export default function OfferPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-20 text-base text-neutral-700">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Публичная оферта</h1>
        <p className="mt-3 text-sm text-neutral-500">
          Версия 1 (черновик) · Финальный текст готовится юристом и публикуется в T1.8 / T6.3.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">1. Предмет договора</h2>
          <p>
            ИП «Vitrina» оказывает услуги по автоматическому созданию и поддержанию интернет-сайта
            на поддомене *.vitrina.site из публикуемых пользователем источников (Telegram-канал,
            Яндекс.Карты, фотографии).
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">2. Тариф</h2>
          <p>
            Первый месяц бесплатно, без привязки банковской карты. Далее — 990 ₽/месяц. Отмена
            подписки в один клик; оплаченный период не возвращается.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">3. Обязанности сторон</h2>
          <p>
            Vitrina обязуется обеспечить доступность сайта на уровне не ниже 99% в месяц.
            Пользователь обязуется быть владельцем (или иметь право использовать) источника, ссылку
            на который он предоставляет.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">4. Ответственность</h2>
          <p>
            Vitrina не несёт ответственности за содержание сайта, сгенерированного из источника
            пользователя. Удаление сайта по требованию владельца оригинального источника — в течение
            24 часов.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
