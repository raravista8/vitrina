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
 *   2. Single tariff card — 990 ₽/мес (v2.1.3 §1.1: цена поднята с 299
 *      после user-testing на пилотной группе; включает full-stack:
 *      аналитика, AI-отзывы, weekly digest)
 *   3. Сравнение «час SMM-щика» / «час маркетолога» — anchor
 *   4. Risk-reversal note: первый месяц бесплатно (без упоминания карты —
 *      см. v2.1.3 §1.1)
 */

import { ArrowRight, Check } from "lucide-react";

import { SectionViewTracker } from "./SectionViewTracker";

const INCLUDED = [
  "Сам собирает сайт за 2 часа",
  "Сам обновляет 4 раза в месяц из источника",
  "Сам ловит заявки в Telegram / MAX / Email",
  "Сам отбирает лучшие отзывы каждую неделю",
  "Сам индексирует в Яндексе и Google",
  "Личный кабинет с аналитикой и контролем",
  "Защищённый https + данные хранятся в РФ",
];

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="bg-paper-soft px-5 py-14 sm:px-16 sm:py-24"
    >
      <SectionViewTracker goal="pricing_view" />
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Сколько стоит</p>
        {/* v2.1.3 §1.1 — H2 переписана: «Один тариф — без сюрпризов»
            короче, прямее, держит обещание простоты. */}
        <h2
          id="pricing-title"
          className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
        >
          Один тариф — без сюрпризов
        </h2>
      </header>

      <div className="mx-auto max-w-[640px]">
        <div className="ss-pricing-card rounded-3xl border-2 border-accent bg-white p-7 shadow-card sm:p-10">
          {/* Free-month chip над ценой — v2.1.3 §1.1: phyciacally moved
              risk-reversal внутрь pricing card. Зелёная плашка с галочкой
              «Первый месяц — бесплатно» отвечает за «не страшно начать»;
              сама цена «потом 990 ₽» уже воспринимается спокойно. */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[12px] font-semibold text-accent-ink">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            Первый месяц — бесплатно
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[44px] font-bold text-ink sm:text-[64px]">990</span>
            <span className="text-[18px] text-ink-soft sm:text-[22px]">₽ в месяц</span>
          </div>

          <p className="mt-2 text-[14px] text-ink-soft sm:text-[16px]">
            Не надо выбирать пакеты, считать апселы и читать «звёздочки»
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
            Сделать Самосайт
            <ArrowRight className="h-4 w-4" />
          </a>

          <p className="mt-3 text-center font-mono text-[11px] uppercase tracking-widest text-ink-faint">
            Первый месяц бесплатно
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-[480px] text-center text-[14px] leading-relaxed text-ink-soft sm:mt-10 sm:text-[15px]">
          Час работы SMM-щика стоит дороже. Час маркетолога — в разы. Самосайт делает то, что им
          пришлось бы делать каждую неделю — но автоматически.
        </p>
      </div>
    </section>
  );
}
