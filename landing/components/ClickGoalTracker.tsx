"use client";

/**
 * `<ClickGoalTracker>` — client-island который attach'ит click-listener
 * на элемент с заданным `data-cta` атрибутом и fires Я.Метрика goal.
 *
 * Зачем: позволяет server-компонентам трекать клики без перевода всего
 * компонента в client. CTA рендерится server-side (SSR, SEO, linkable),
 * tracker — крошечный client island ~150 байт.
 *
 * Pattern (близок к `FAQGoalTracker` + `SectionViewTracker`):
 *   - Server `<a data-cta="free-month-cta">...</a>`
 *   - Server `<ClickGoalTracker selector='[data-cta="free-month-cta"]' goal="free_month_cta_click" />`
 *
 * Limitations:
 *   - Selector ищется внутри `document` (global). Если на странице несколько
 *     элементов с тем же `data-cta` — все получат tracker. Это OK для
 *     наших CTA (по одному в section).
 *   - Не привязан к scope текущего section'а. Если нужна изоляция —
 *     передавай уникальный selector.
 *
 * Usage:
 *   <section>
 *     <a data-cta="free-month-cta" href="#top">...</a>
 *     <ClickGoalTracker selector='[data-cta="free-month-cta"]'
 *                       goal="free_month_cta_click" />
 *   </section>
 */

import { useEffect } from "react";

import { type MetrikaGoal, reachGoal } from "@/lib/metrika";

interface ClickGoalTrackerProps {
  /** CSS selector targeting clickable element(s). */
  selector: string;
  goal: MetrikaGoal;
}

export function ClickGoalTracker({ selector, goal }: ClickGoalTrackerProps) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (elements.length === 0) return;
    const handler = () => reachGoal(goal);
    for (const el of elements) {
      el.addEventListener("click", handler);
    }
    return () => {
      for (const el of elements) {
        el.removeEventListener("click", handler);
      }
    };
  }, [selector, goal]);

  return null;
}
