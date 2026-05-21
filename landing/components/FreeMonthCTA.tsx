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

const BULLETS = [
  "Сайт на адресе ваш-сайт.samosite.online",
  "Кнопка «Записаться» и приём заявок в Telegram",
  "Свежие отзывы и фото каждую неделю",
  "Аналитика посещений и заявок в личном кабинете",
];

const ASSURANCES = [
  "Карта не нужна",
  "Удалить за секунду в личном кабинете",
  "Данные хранятся в РФ",
];

export function FreeMonthCTA() {
  return (
    <section
      id="free-month"
      aria-labelledby="free-month-title"
      className="px-5 py-16 text-white sm:px-16 sm:py-24"
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
          Дайте Самосайту собрать себя
        </h2>

        <p
          className="mt-4 text-[16px] leading-relaxed sm:mx-auto sm:mt-6 sm:max-w-[640px] sm:text-[19px]"
          style={{ color: "oklch(0.85 0.014 60)" }}
        >
          Через две минуты у вас будет работающий сайт с услугами, ценами и отзывами. Через неделю —
          первые заявки в Telegram.
        </p>

        {/* What you get — 4 bullets */}
        <div className="mt-8 sm:mt-10">
          <p
            className="mb-3 font-mono text-[11px] uppercase tracking-widest sm:mb-4"
            style={{ color: "oklch(0.75 0.05 35)" }}
          >
            Что получите сразу
          </p>
          <ul className="mx-auto max-w-[540px] space-y-2.5 text-left sm:space-y-3">
            {BULLETS.map((b) => (
              <li
                key={b}
                className="flex items-baseline gap-3 text-[15px] sm:text-[17px]"
                style={{ color: "oklch(0.9 0.012 60)" }}
              >
                <Check className="h-4 w-4 shrink-0 translate-y-0.5 text-accent" strokeWidth={2.5} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <a
          href="#top"
          className="mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-[16px] font-semibold text-white shadow-pop hover:bg-accent-hover sm:mt-12 sm:px-9 sm:py-5 sm:text-[18px]"
        >
          Собрать мой Самосайт
          <ArrowRight className="h-5 w-5" />
        </a>

        <p className="mt-4 text-[14px] sm:text-[15px]" style={{ color: "oklch(0.70 0.014 60)" }}>
          Первый месяц — бесплатно. Самосайт сам напомнит, когда подойдёт срок.
        </p>

        {/* Last-mile assurances */}
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

        {/* Alternative — for the undecided */}
        <p
          className="mt-8 text-[14px] sm:mt-10 sm:text-[15px]"
          style={{ color: "oklch(0.75 0.014 60)" }}
        >
          Есть вопросы?{" "}
          <a
            href="#faq"
            className="decoration-accent/50 font-medium text-accent underline underline-offset-4 hover:decoration-accent"
          >
            Посмотрите ответы ↓
          </a>{" "}
          или{" "}
          <a
            href="/feedback"
            className="decoration-accent/50 font-medium text-accent underline underline-offset-4 hover:decoration-accent"
          >
            напишите нам →
          </a>
        </p>
      </div>
    </section>
  );
}
