/**
 * `<FreeMonthCTA>` — landing v2 секция risk-reversal.
 *
 * Spec: docs/COPY.md §2.7 + `/tmp/samosite-canon/landing-samosite.jsx`.
 *
 * Тёмный блок с подарочной иконкой. Второй (после Hero) CTA на странице —
 * для юзеров которые доскроллили досюда не нажав первый. Risk reversal:
 * без карты, без коммита, не зайдёт — не продлевайте.
 */

import { ArrowRight, Gift } from "lucide-react";

export function FreeMonthCTA() {
  return (
    <section
      id="free-month"
      aria-labelledby="free-month-title"
      // Тёмный warm-ink фон. Контраст с paper-белыми соседними секциями.
      className="bg-ink px-5 py-16 text-white sm:px-16 sm:py-24"
      style={{ background: "oklch(0.20 0.020 60)" }}
    >
      <div className="mx-auto max-w-[900px] sm:text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white sm:h-20 sm:w-20">
          <Gift className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.6} />
        </div>

        <h2
          id="free-month-title"
          className="mt-6 text-[34px] font-bold leading-[1.05] tracking-tight sm:mt-8 sm:text-[56px]"
        >
          Первый месяц — бесплатно
        </h2>

        <p
          className="mt-4 text-[16px] leading-relaxed sm:mx-auto sm:mt-6 sm:max-w-[640px] sm:text-[19px]"
          style={{ color: "oklch(0.85 0.014 60)" }}
        >
          Без карты при регистрации. Сделаем сайт, посмотрите как идут заявки — если не зайдёт,
          просто не продлевайте.
        </p>

        <a
          href="#top"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[16px] font-semibold text-white shadow-pop hover:bg-accent-hover sm:mt-10 sm:px-9 sm:py-5 sm:text-[18px]"
        >
          Собрать мой Самосайт
          <ArrowRight className="h-5 w-5" />
        </a>
      </div>
    </section>
  );
}
