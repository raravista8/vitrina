"use client";

/**
 * V5Landing — прод-композиция главной «Витрина v5 · Фарфор и лак»
 * (canon 0.12.0, `packages/canon/src/landing/v5.tsx`).
 *
 * Почему ручная композиция, а не `<V5_Page/>`:
 *   • `V5_Page` не пробрасывает `links` в `V5_Footer` — его дефолты
 *     (`docs/politika.html` / `oferta.html`) не наши роуты `/privacy` /
 *     `/offer`;
 *   • нам нужны `data-section`-обёртки на каждой секции для нашего
 *     тулинга (visual-smoke suite `tests/visual/utils/sections.ts`,
 *     будущие anchor-цели) — canon несёт только свои `data-metric` /
 *     `data-entry` хуки.
 *   Структура 1:1 повторяет `V5_Page` (порядок секций, `.v5.js`-корень,
 *   FinalCta + Footer после <main>), отличие только в перечисленном.
 *
 * Контракты:
 *   • CTA → `onIntake(entry, niche)` → `openIntake2(entry, {niche})`
 *     (событийный контракт `components/intake2/host.tsx`; модалку за ним
 *     строит отдельный агент — здесь только диспатч) + цель `form_open`
 *     с параметром `entry`.
 *   • Section-view цели: canon вешает `data-metric="story_view|
 *     reviews_view|pricing_view"` на секции (CHANGELOG 0.12.0 §5) —
 *     IntersectionObserver (threshold 0.4, по разу) ниже стреляет
 *     одноимённые цели через `ssTrack` (reachGoal + dataLayer.push).
 *   • FAQ: `onFaqOpen(id)` → цель `faq_open` (param `question`).
 *   • JSON-LD FAQPage рендерится из canon-реестра `FAQ_ITEMS` — единый
 *     источник для аккордеона и разметки (правило синхронности из
 *     `docs/handoff/CANON_LANDING_V5_EXPORT_TZ.md` §3). Живёт здесь, а не
 *     в layout.tsx: (а) FAQPage-разметка должна быть только на странице
 *     с самим FAQ (layout общий для /admin, /privacy, …); (б) canon dist
 *     несёт `"use client"` — его data-экспорты нечитаемы из server
 *     components. Client-компонент SSR'ится, так что <script> попадает
 *     в первичный HTML для краулеров.
 */

import { useCallback, useEffect, useRef } from "react";

import {
  DEFAULT_ANCHORS,
  FAQ_ITEMS,
  V5_Examples,
  V5_Faq,
  V5_FinalCta,
  V5_Footer,
  V5_Header,
  V5_Hero,
  V5_Honest,
  V5_HowItWorks,
  V5_Pricing,
  V5_Reviews,
  V5_Story,
  V5_Styles,
} from "@samosite/canon/landing";

import { Intake2Host, openIntake2 } from "@/components/intake2/host";
import { ssTrack, type MetrikaGoal } from "@/lib/metrika";

/** Локальная форма canon `FaqItem` (модуль заshim'лен как any — см.
 *  `types/samosite-canon.d.ts`). */
interface FaqItemShape {
  id: string;
  q: string;
  a: string;
}

/* JSON-LD FAQPage — считается один раз на модуль из canon-реестра.
   Копи НЕ перенабирается: строки идут из FAQ_ITEMS как есть. */
const FAQ_JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: (FAQ_ITEMS as FaqItemShape[]).map((it) => ({
    "@type": "Question",
    name: it.q,
    acceptedAnswer: { "@type": "Answer", text: it.a },
  })),
});

/* Section-view цели, которые canon декларирует через data-metric
   (CHANGELOG 0.12.0 §5). Set — чтобы незнакомый атрибут из будущего
   canon-рефреша не улетел в Метрику несогласованной целью. */
const SECTION_VIEW_GOALS = new Set<MetrikaGoal>(["story_view", "reviews_view", "pricing_view"]);

const FOOTER_LINKS = {
  politika: "/privacy",
  oferta: "/offer",
  support: "https://t.me/samosite",
};

export function V5Landing() {
  const rootRef = useRef<HTMLDivElement>(null);

  /* Section-view goals — IntersectionObserver по canon-овским
     `[data-metric]`, threshold 0.4, fire-once per section. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;

    const fired = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || fired.has(entry.target)) continue;
          fired.add(entry.target);
          io.unobserve(entry.target);
          const goal = entry.target.getAttribute("data-metric") as MetrikaGoal | null;
          if (goal && SECTION_VIEW_GOALS.has(goal)) ssTrack(goal);
        }
      },
      { threshold: 0.4 },
    );

    root.querySelectorAll("[data-metric]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Все CTA (header / hero / story / pricing-* / example-<id> / final) —
     один обработчик: цель form_open {entry[, niche]} + открытие интейка
     через событийный контракт. */
  const onIntake = useCallback((entry: string, niche?: string) => {
    ssTrack("form_open", { entry, ...(niche ? { niche } : {}) });
    openIntake2(entry, niche ? { niche } : {});
  }, []);

  const onFaqOpen = useCallback((id: string) => {
    ssTrack("faq_open", { question: id });
  }, []);

  return (
    <div ref={rootRef} className="v5 js">
      <V5_Styles />
      <V5_Header anchors={DEFAULT_ANCHORS} onIntake={onIntake} />
      <main>
        <div data-section="hero">
          <V5_Hero onIntake={onIntake} />
        </div>
        <div data-section="story">
          <V5_Story onIntake={onIntake} />
        </div>
        <div data-section="examples">
          <V5_Examples layout="carousel" onIntake={onIntake} />
        </div>
        <div data-section="how">
          <V5_HowItWorks />
        </div>
        <div data-section="reviews">
          <V5_Reviews />
        </div>
        <div data-section="pricing">
          <V5_Pricing onIntake={onIntake} />
        </div>
        <div data-section="honest">
          <V5_Honest />
        </div>
        <div data-section="faq">
          <V5_Faq onFaqOpen={onFaqOpen} />
        </div>
      </main>
      {/* FinalCta + Footer вне <main> — как в canon `V5_Page`. */}
      <div data-section="final">
        <V5_FinalCta onIntake={onIntake} />
      </div>
      <V5_Footer links={FOOTER_LINKS} />
      {/* Интейк v2 — слушатель события samosite:open-intake; модалка
          реализуется за этим контрактом отдельно (см. intake2/host.tsx). */}
      <Intake2Host />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_JSON_LD }} />
    </div>
  );
}
