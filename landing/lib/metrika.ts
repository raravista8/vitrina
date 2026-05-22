/**
 * Yandex.Метрика — type-safe wrapper для `reachGoal` событий.
 *
 * Я.Метрика snippet (`landing/app/layout.tsx`) определяет global `ym(id, action, ...)`
 * только когда `NEXT_PUBLIC_YANDEX_METRIKA_ID` непустой. В dev / без counter
 * window.ym отсутствует — наивный вызов кинет ReferenceError на onClick.
 *
 * Этот модуль:
 *   1. Декларирует window.ym TypeScript-типом (см. `landing/types/yandex-metrika.d.ts`).
 *   2. Безопасно no-op'ит когда snippet не загружен (development, missing ID).
 *   3. Унифицирует чтение counter ID — он inlined в client bundle через
 *      `NEXT_PUBLIC_YANDEX_METRIKA_ID`, baked в build (см. `landing/Dockerfile`).
 *
 * Goals list (мейнтейним в одном месте — runbook `docs/runbooks/
 * yandex-metrika-goals.md` ссылается на эти имена):
 *
 *   hero_paste            — юзер paste'ил что-то в Hero input
 *   hero_submit_attempt   — клик по «Сделать Самосайт» (frontend pre-API)
 *   hero_submit_success   — backend ответил 200 на submit (post-modal flow)
 *   pricing_view          — Pricing секция попала во viewport
 *   faq_open              — юзер открыл любой <details> в FAQ
 *   free_month_cta_click  — клик по CTA в финальном Dojim-блоке
 *
 * Removed in v2.1.3 §1.2:
 *   socialproof_view      — SocialProof секция удалена из лендинга. Goal
 *                           НЕ удалять в metrika.yandex.ru (исторические
 *                           метрики остаются), но больше не fires.
 *
 * Каждое имя нужно завести руками на metrika.yandex.ru → «Цели». См. runbook.
 *
 * Пример usage:
 *   import { reachGoal } from "@/lib/metrika";
 *   onPaste={() => reachGoal("hero_paste")}
 */

export type MetrikaGoal =
  | "hero_paste"
  | "hero_submit_attempt"
  | "hero_submit_success"
  | "socialproof_view"
  | "pricing_view"
  | "faq_open"
  | "free_month_cta_click";

const METRIKA_ID = process.env["NEXT_PUBLIC_YANDEX_METRIKA_ID"]?.trim() ?? "";

/**
 * Fire a goal-conversion event in Yandex.Метрика.
 *
 * Safe to call from any client component — no-ops in SSR (no `window`),
 * in dev (no counter ID), or if the snippet failed to load.
 *
 * Returns void: callers don't await, they just fire-and-forget.
 */
export function reachGoal(goal: MetrikaGoal, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  if (!METRIKA_ID) return;
  // window.ym is injected by the inline snippet in app/layout.tsx — it
  // exists once the synchronous <script> tag runs, well before any user
  // interaction can fire. Defensive optional chaining covers the rare
  // case where the snippet was blocked (adblocker, network failure).
  window.ym?.(Number(METRIKA_ID), "reachGoal", goal, params);
}
