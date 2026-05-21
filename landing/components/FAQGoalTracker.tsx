"use client";

/**
 * `<FAQGoalTracker>` — client-island который ловит `toggle` events на
 * любых `<details>` элементах внутри родительского `<section id="faq">`.
 *
 * Реализация attach-once: после mount находит `#faq` через `closest`,
 * вешает один listener на `<dl>` контейнер (event-delegation), fires
 * Я.Метрика goal `faq_open` каждый раз когда любой `<details>` открывается.
 *
 * Не fires на close (юзер прочитал ответ — `open=false` нам не интересно).
 *
 * Зачем не делать FAQ полностью client-компонентом: 10-item массив +
 * ChevronDown icon + className-логика — много рендера. Server-component
 * остаётся zero-JS bundle для статичного контента, наш island — ~200
 * байт инкремент.
 *
 * Goal fires на КАЖДОЕ открытие (не дедупится по item). Если юзер открыл
 * 3 разных вопроса — это 3 goal events. Я.Метрика sessions
 * сами дедуплицируют визиты, агрегация на их стороне.
 *
 * Usage:
 *   <section id="faq">
 *     <FAQGoalTracker />
 *     <h2>...</h2>
 *     <dl>...{items.map → <details>}...</dl>
 *   </section>
 */

import { useEffect } from "react";

import { reachGoal } from "@/lib/metrika";

export function FAQGoalTracker() {
  useEffect(() => {
    const section = document.getElementById("faq");
    if (!section) return;

    // `toggle` events не bubble через standard event flow в некоторых
    // браузерах, поэтому ставим listener в capture phase (3-й аргумент
    // true) — гарантированно ловит. Modern спецификация уже bubbles, но
    // на старых Safari useCapture=true бесплатная страховка.
    const handler = (event: Event) => {
      const target = event.target;
      if (!(target instanceof HTMLDetailsElement)) return;
      if (target.open) {
        reachGoal("faq_open", { question: target.dataset["faqId"] ?? "unknown" });
      }
    };
    section.addEventListener("toggle", handler, true);
    return () => section.removeEventListener("toggle", handler, true);
  }, []);

  return null;
}
