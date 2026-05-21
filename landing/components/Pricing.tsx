/**
 * `<Pricing>` — landing v2 секция с тарифом.
 *
 * User feedback batch 3 («No pricing on landing — visitors hit the
 * #pricing anchor in nav but the block doesn't exist; «Первый месяц
 * бесплатно» вызывает вопрос «а потом сколько»). Скрытие цены = главная
 * причина потерянной конверсии.
 *
 * v2 решение: один план, явная цена, фрейминг через «сам» («чтобы
 * Самосайт работал на вас»). Сравнение с альтернативой (час работы
 * SMM-щика дороже месяца Самосайта) — anchors value.
 *
 * Композиция:
 *   1. Section title with «сам» framing
 *   2. Single tariff card — 299 ₽/мес с разбивкой «за что платите»
 *   3. Сравнение «час SMM-щика» / «час маркетолога» — anchor
 *   4. Risk-reversal note: первый месяц бесплатно без карты
 */

import { ArrowRight, Check } from "lucide-react";

const INCLUDED = [
  "Сам собирает сайт за пару минут",
  "Сам обновляет 4 раза в месяц из источника",
  "Сам ловит заявки в Telegram / MAX / Email",
  "Сам отбирает лучшие отзывы каждую неделю",
  "Сам индексирует в Яндексе и Google",
  "Личный кабинет с аналитикой и контролем",
  "Защищённый https + данные хранятся в РФ",
];

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="bg-paper-soft px-5 py-14 sm:px-16 sm:py-24"
    >
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Сколько стоит</p>
        <h2
          id="pricing-title"
          className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
        >
          Сколько стоит, чтобы Самосайт работал на вас
        </h2>
      </header>

      <div className="mx-auto max-w-[640px]">
        <div className="rounded-3xl border-2 border-accent bg-white p-7 shadow-card sm:p-10">
          <div className="flex items-baseline gap-2">
            <span className="text-[44px] font-bold text-ink sm:text-[64px]">299</span>
            <span className="text-[18px] text-ink-soft sm:text-[22px]">₽ в месяц</span>
          </div>

          <p className="mt-2 text-[14px] text-ink-soft sm:text-[16px]">
            Один тариф — без сложных матриц, без апселов, без «звёздочек».
          </p>

          <ul className="mt-6 space-y-2.5">
            {INCLUDED.map((line) => (
              <li
                key={line}
                className="flex items-baseline gap-2.5 text-[14px] text-ink sm:text-[15.5px]"
              >
                <Check className="h-4 w-4 shrink-0 translate-y-0.5 text-accent" strokeWidth={2.5} />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <a
            href="#top"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover sm:text-[16px]"
          >
            Собрать мой Самосайт
            <ArrowRight className="h-4 w-4" />
          </a>

          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            Первый месяц бесплатно · Карта не нужна
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-[480px] text-center text-[14px] leading-relaxed text-ink-soft sm:mt-10 sm:text-[15px]">
          Час работы SMM-щика стоит дороже. Час маркетолога — в разы. Самосайт делает то, что им
          пришлось бы делать каждую неделю — но автоматически.
        </p>
      </div>
    </section>
  );
}
