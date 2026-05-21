"use client";

/**
 * `<SectionViewTracker>` — невидимый client-компонент, fires a Я.Метрика
 * goal один раз когда родительская секция попадает во viewport.
 *
 * Зачем: section-view goals (`socialproof_view`, `pricing_view`) нужны
 * чтобы измерять scroll-depth funnel («сколько посетителей вообще
 * доскроллили до Pricing»). Альтернатива — Я.Метрика scroll-depth
 * webvisor heatmap, но goals дают **дискретные** числа для воронки.
 *
 * Реализация: `<section>` остаётся server-component (zero JS bundle),
 * client-island только этот tracker. Он рендерится как `<span
 * aria-hidden>` zero-size в начале секции; `IntersectionObserver` следит
 * за `<span>` (proxy для секции) и fires goal один раз.
 *
 * Single-fire semantics: после первого fire — `disconnect()`. Перезагрузка
 * страницы — новая сессия → goal fires заново (Я.Метрика sessions работают
 * по counter ID, дедупликация на их стороне в рамках одной visit).
 *
 * Threshold 0.25 = «25% секции видно» — баланс между «scrolled past»
 * (нужен 0.0) и «фокус читает» (нужен 0.5+). На 0.25 fires когда секция
 * заняла четверть viewport — это уверенная intent, не accidental scroll.
 *
 * Usage:
 *   <section id="pricing">
 *     <SectionViewTracker goal="pricing_view" />
 *     <h2>...</h2>
 *     ...
 *   </section>
 */

import { useEffect, useRef } from "react";

import { type MetrikaGoal, reachGoal } from "@/lib/metrika";

interface SectionViewTrackerProps {
  goal: MetrikaGoal;
  /** Threshold ratio (0.0–1.0). Default 0.25. */
  threshold?: number;
}

export function SectionViewTracker({ goal, threshold = 0.25 }: SectionViewTrackerProps) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    let fired = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !fired) {
            fired = true;
            reachGoal(goal);
            observer.disconnect();
            return;
          }
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [goal, threshold]);

  return <span ref={ref} aria-hidden="true" />;
}
