/**
 * `<Pricing>` — landing v2 секция с тарифом.
 *
 * Spec: docs/COPY.md §2.6 + canon `PricingSection`
 * (landing-samosite.jsx line 2078).
 *
 * User feedback batch 3 («No pricing on landing — visitors hit the
 * #pricing anchor in nav but the block doesn't exist; «Первый месяц
 * бесплатно» вызывает вопрос «а потом сколько»). Скрытие цены = главная
 * причина потерянной конверсии.
 *
 * v2 решение: один план, явная цена, фрейминг через «сам». Сравнение с
 * альтернативой (час работы SMM-щика дороже месяца Самосайта) — anchors
 * value.
 *
 * Layout per canon (Phase C-Pricing rebuild):
 *   1. Section header — H2 «Один тариф — без сюрпризов» + sub paragraph
 *      «Не надо выбирать пакеты...» (sub was previously INSIDE card; canon
 *      keeps it in section header above).
 *   2. Pricing card:
 *      • «ОДИН ТАРИФ» mono caps badge top-right, accent-soft chip
 *      • Eyebrow ✓ «ПЕРВЫЙ МЕСЯЦ — БЕСПЛАТНО» (circular terracotta
 *        check + mono caps text). Replaces prod's pill that wrapped
 *        the whole phrase.
 *      • Price line: «потом 990 ₽ / месяц» with huge 76 px price
 *      • 7 bullets with circular success (green) check, not terracotta
 *      • Full-width CTA «Сделать Самосайт →»
 *      • Mono caps «Первый месяц бесплатно» under CTA
 *   3. Value anchor «Час работы SMM-щика...» below card
 */

import { ArrowRight, Check } from "lucide-react";

import { SectionViewTracker } from "./SectionViewTracker";

const INCLUDED = [
  "Сам собирает сайт за 2 часа",
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
      data-section="pricing"
      aria-labelledby="pricing-title"
      className="bg-paper-soft px-5 pb-0 pt-14 sm:px-16 sm:pb-0 sm:pt-24"
    >
      <SectionViewTracker goal="pricing_view" />
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-12 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Сколько стоит</p>
        {/* v2.1.3 §1.1 — H2 переписана: «Один тариф — без сюрпризов»
            короче, прямее, держит обещание простоты. */}
        <h2
          id="pricing-title"
          className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
        >
          Один тариф —
          <br className="hidden sm:block" /> без сюрпризов
        </h2>
        {/* Sub paragraph per canon line 2096 — moved from inside the card
            into the section header so the price card itself reads
            cleaner (just price + bullets + CTA). */}
        <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
          Не надо выбирать пакеты, считать апселы и читать «звёздочки». 990&nbsp;₽ в месяц — и весь
          Самосайт в вашем распоряжении
        </p>
      </header>

      <div className="mx-auto max-w-[640px]">
        <div className="ss-pricing-card relative overflow-hidden rounded-[22px] border border-line bg-white px-[22px] py-7 shadow-card sm:px-10 sm:py-11">
          {/* «ОДИН ТАРИФ» badge top-right per canon line 2120. Mono caps
              chip on accent-soft background. */}
          <div className="absolute right-[18px] top-[18px] rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-accent-ink sm:right-6 sm:top-6">
            Один тариф
          </div>

          {/* Eyebrow ✓ ПЕРВЫЙ МЕСЯЦ — БЕСПЛАТНО per canon line 2131.
              Circular terracotta check icon + mono caps text. */}
          <div className="inline-flex items-center gap-2 font-mono text-[11.5px] font-bold uppercase tracking-[0.12em] text-accent-ink">
            <span
              aria-hidden
              className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-white"
            >
              <Check className="h-2.5 w-2.5" strokeWidth={3} />
            </span>
            Первый месяц — бесплатно
          </div>

          {/* Price layout per canon line 2147: «потом 990 ₽ / месяц».
              Big 56/76 px price flanked by smaller «потом» and «/ месяц». */}
          <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-[16px] font-medium text-ink-soft sm:text-[20px]">потом</span>
            <span className="text-[56px] font-bold leading-none tracking-[-0.04em] text-ink sm:text-[76px]">
              990&nbsp;₽
            </span>
            <span className="text-[16px] text-ink-soft sm:text-[18px]">/ месяц</span>
          </div>

          {/* 7 bullets — circular success (green) check on success-soft bg
              per canon line 2167. Was terracotta in pre-canon prod. */}
          <ul className="mt-[22px] flex list-none flex-col gap-2.5 p-0">
            {INCLUDED.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-[14.5px] leading-[1.45] text-ink sm:text-[15.5px]"
              >
                <span
                  aria-hidden
                  className="mt-[2px] inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-success-soft text-success"
                >
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          {/* CTA — full width, terracotta, with arrow. */}
          <a
            href="#top"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover sm:mt-8 sm:px-7 sm:py-4 sm:text-[16px]"
          >
            Сделать Самосайт
            <ArrowRight className="h-4 w-4" />
          </a>
          <p className="mt-3 text-center font-mono text-[11.5px] uppercase tracking-[0.08em] text-ink-faint">
            Первый месяц бесплатно
          </p>
        </div>

        {/* Value anchor below card per canon line 2196 — soft inkSoft text
            framing 990 ₽ vs SMM/marketing hourly rates. */}
        <p className="mx-auto mt-5 max-w-[560px] text-center text-[13.5px] leading-[1.55] text-ink-soft sm:mt-6 sm:text-[14.5px]">
          Час работы SMM-щика стоит дороже. Час маркетолога — в разы. Самосайт делает то, что им
          пришлось бы делать каждую неделю — но автоматически.
        </p>
      </div>
    </section>
  );
}
