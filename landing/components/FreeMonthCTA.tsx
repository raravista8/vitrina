/**
 * `<FreeMonthCTA>` — landing v2 финальный «Dojim»-блок.
 *
 * Spec: docs/COPY.md §2.7 + user feedback batch 3 («final block too
 * weak — needs proper objection-killer, not just a hero repeat»).
 *
 * Composition:
 *   1. Brand-mark + headline turns «Самосайт» into a verb («собрать
 *      себя») — same trick as Hero H1 but in imperative form.
 *   2. 4-bullet summary of what the user gets immediately — closes
 *      the «что я получу за эти деньги» fear before pricing block.
 *   3. CTA + microcopy: «карта не нужна», «можно удалить за секунду»,
 *      «данные в РФ» — last-mile objection killers.
 *   4. Alternative path («есть вопросы — напишите») for the truly
 *      undecided who scrolled this far without clicking.
 */

import { ArrowRight, Check, Gift } from "lucide-react";

import { ClickGoalTracker } from "./ClickGoalTracker";

const BULLETS = [
  "Сайт на адресе ваш-сайт.samosite.online",
  "Кнопка «Записаться» и приём заявок в Telegram",
  "Свежие отзывы и фото каждую неделю",
  "Аналитика посещений и заявок в личном кабинете",
];

// v2.1.3 §1.2 — last-mile assurances удалены целиком: «Карта не нужна»
// дублировалась 4× по странице, «Удалить за секунду · Данные хранятся в
// РФ» перекатились на customer-site (где они в контексте более полезны).
// Pricing card теперь несёт основной risk-reversal; Hero — micro-version;
// Dojim — только финальный CTA без шумовых assurance-плашек.
const ASSURANCES: readonly string[] = [];

export function FreeMonthCTA() {
  return (
    <section
      id="free-month"
      data-section="free-month"
      aria-labelledby="free-month-title"
      className="py-16 text-white sm:py-24"
      style={{ background: "oklch(0.20 0.020 60)" }}
    >
      <div data-section-body="free-month" className="px-5 sm:px-16">
        <div className="mx-auto max-w-[900px] sm:text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-white sm:h-20 sm:w-20">
            <Gift className="h-9 w-9 sm:h-11 sm:w-11" strokeWidth={1.6} />
          </div>
          <h2
            id="free-month-title"
            className="mt-6 text-[34px] font-bold leading-[1.05] tracking-tight sm:mt-8 sm:text-[56px]"
          >
            Дайте Самосайту собрать себя
          </h2>
          {/* v2.1.3 §1.1 — Footer/dojim para укорочен. «Через две минуты»
            → «через 2 часа» (единый SLA), второе предложение про сайт
            убрано (избыточно после Hero + 8 BigFeatures). Остался один
            тёплый punchline про «первые заявки в Telegram». */}
          <p
            className="mt-4 text-[16px] leading-relaxed sm:mx-auto sm:mt-6 sm:max-w-[640px] sm:text-[19px]"
            style={{ color: "oklch(0.85 0.014 60)" }}
          >
            Через неделю — первые заявки в Telegram
          </p>
          {/* What you get — 4 bullets */}
          {/* 4 bullets — 2×2 grid of dark cards per canon FreeMonthSection
            line 2353. Each card: subtle white/5 bg + soft border +
            circular terracotta check + white text. Eyebrow "Получите сразу"
            dropped: canon doesn't have it, the 2-col grid alone is
            visually self-contained. */}
          <ul className="mx-auto mt-6 grid max-w-[680px] list-none grid-cols-1 gap-2.5 p-0 text-left sm:mt-9 sm:grid-cols-2 sm:gap-3.5">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-start gap-2.5 rounded-[12px] border px-3.5 py-3"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <span
                  aria-hidden
                  className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-white"
                >
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
                <span
                  className="text-[14px] leading-[1.4] sm:text-[15px]"
                  style={{ color: "oklch(0.92 0.012 60)" }}
                >
                  {b}
                </span>
              </li>
            ))}
          </ul>
          {/* CTA. `data-cta` атрибут — anchor для <ClickGoalTracker>
            ниже, который fires `free_month_cta_click` goal в Я.Метрику.
            Note: ведёт на `#top` (Hero input), не открывает SubmitModal
            напрямую — финальный dojim рассматривается как «вернуть
            пользователя ко вводу ссылки». */}
          <a
            href="#top"
            data-cta="free-month-cta"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[16px] font-semibold text-white shadow-pop hover:bg-accent-hover sm:mt-12 sm:px-9 sm:py-5 sm:text-[18px]"
          >
            Сделать Самосайт
            <ArrowRight className="h-5 w-5" />
          </a>
          <ClickGoalTracker selector='[data-cta="free-month-cta"]' goal="free_month_cta_click" />
          <p className="mt-4 text-[14px] sm:text-[15px]" style={{ color: "oklch(0.70 0.014 60)" }}>
            Первый месяц — бесплатно. Самосайт сам напомнит, когда подойдёт срок
          </p>
          {/* v2.1.3 §1.2 — last-mile assurances удалены. См. ASSURANCES
            const выше + rationale (Pricing card теперь держит risk-
            reversal). Блок остаётся в коде защитой на случай возврата
            assurances в будущей итерации. */}
          {ASSURANCES.length > 0 ? (
            <ul
              className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest sm:mt-10"
              style={{ color: "oklch(0.65 0.014 60)" }}
            >
              {ASSURANCES.map((a, i) => (
                <li key={a} className="flex items-center gap-1.5">
                  {i > 0 ? <span aria-hidden>·</span> : null}
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {/* Footer alt-path per canon FreeMonthSection line 2398. Soft
            border-top divider above a centered inline group:
              Есть вопросы?  [Посмотрите ответы ↓]  или  [напишите нам →]
            Last-mile alternative for visitors who scrolled this far
            without clicking the CTA. */}
          <div
            className="mt-7 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 border-t pt-5 text-[13.5px] sm:mt-10 sm:gap-x-2 sm:pt-6 sm:text-[14.5px]"
            style={{
              borderColor: "rgba(255,255,255,0.10)",
              color: "oklch(0.82 0.014 60)",
            }}
          >
            <span>Есть вопросы?</span>
            <a
              href="#faq"
              className="text-accent-soft underline decoration-1 underline-offset-[3px] hover:decoration-2"
            >
              Посмотрите ответы ↓
            </a>
            <span>или</span>
            <a
              href="/feedback"
              className="text-accent-soft underline decoration-1 underline-offset-[3px] hover:decoration-2"
            >
              напишите нам →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
