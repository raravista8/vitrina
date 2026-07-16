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
 * yandex-metrika-goals.md` ссылается на эти имена). Структура под canon
 * 0.7.x landing (11 блоков). Каждое имя нужно завести руками на
 * metrika.yandex.ru → «Цели» (тип «JavaScript-событие», идентификатор =
 * строка ниже). См. runbook.
 *
 * ── Воронка конверсии (P0) ──
 *   hero_paste            — юзер paste'ил что-то в Hero input
 *   cta_click             — клик по любой «Собрать сайт за 2 часа»;
 *                           param `source`: header | hero | monday |
 *                           pricing | final
 *   hero_submit_attempt   — клик по CTA именно в Hero (+ detection/mode)
 *   submit_modal_open     — модалка добавления сайта открылась (любой вход)
 *   submit_photo_mode     — выбран режим загрузки фото
 *   submit_contact_step   — дошёл до шага «куда писать»
 *   hero_submit_success   — backend ответил 200 на submit
 *
 * ── Instant-preview intake (canon 0.11.0 rev.2 «ниша-демо», P0) ──
 * Новая воронка ниша → демо → источник → превью → заявка
 * (`docs/handoff/CANON_INSTANT_PREVIEW_REV2_TZ.md §8`):
 *   intake_niche_pick     — выбрана ниша на шаге 0; param `niche`:
 *                           id из NICHE_LIB | free_text
 *   intake_demo_view      — показан пример сайта (шаг 0b)
 *   intake_demo_claim     — клик «Заменить на ваши данные» (шаг 0b)
 *   intake_source_search  — запущен поиск по названию (шаг 1)
 *   intake_candidate_pick — выбран кандидат из выдачи Я.Карт
 *   intake_preview_view   — показан готовый черновик (превью)
 *   intake_draft_claim    — клик «Забрать сайт бесплатно» на превью
 *
 * ── Вовлечённость по секциям (P1, scroll-into-view) ──
 *   examples_view · cycle_view · monday_view · pricing_view ·
 *   final_cta_view        — секция попала во viewport (по разу)
 *   faq_open              — раскрыт любой <details> в FAQ (param `question`)
 *
 * ── Вторичные действия (P2) ──
 *   examples_anchor_click — «Сначала посмотреть примеры ↓» в Hero
 *   login_click           — «Войти» в шапке (→ /login)
 *   feedback_open         — открытие feedback-модалки; param `source`: fab |
 *                           sources | footer | event
 *   feedback_submit       — успешная отправка голосов; param `votes` (кол-во)
 *   analytics_demo_click  — «Посмотреть демо ЛК» под аналитикой (→ /admin-demo)
 *
 * Removed (секций больше нет в canon 0.7.x — НЕ удалять в metrika.yandex.ru,
 * исторические метрики остаются, но больше не fires):
 *   socialproof_view      — SocialProof удалён (canon 0.6.0)
 *   free_month_cta_click  — FreeMonth → FinalCta (canon 0.6.0)
 *
 * Пример usage:
 *   import { reachGoal } from "@/lib/metrika";
 *   onPaste={() => reachGoal("hero_paste")}
 */

export type MetrikaGoal =
  // ── Витрина v5 (canon 0.12.0, P0) ──
  // Section-view цели по `data-metric` атрибутам canon (`story_view` /
  // `reviews_view` / `pricing_view`) + `form_open` (клик любого CTA,
  // param `entry`: hero | header | story | final | pricing-* |
  // example-<id>) + `faq_open` (param `question` = FaqItem.id).
  // Проводка: `components/V5Landing.tsx` (IntersectionObserver 0.4,
  // once) через `ssTrack` ниже (reachGoal + dataLayer.push).
  | "story_view"
  | "reviews_view"
  | "pricing_view"
  | "form_open"
  // ── Воронка (P0, v3 — legacy; fires только из @deprecated компонентов) ──
  | "hero_paste"
  | "cta_click"
  | "hero_submit_attempt"
  | "submit_modal_open"
  | "submit_photo_mode"
  | "submit_contact_step"
  | "hero_submit_success"
  // ── Instant-preview intake (rev.2, P0) ──
  | "intake_niche_pick"
  | "intake_demo_view"
  | "intake_demo_claim"
  | "intake_source_search"
  | "intake_candidate_pick"
  | "intake_preview_view"
  | "intake_draft_claim"
  // ── Секции (P1) ──
  | "examples_view"
  | "cycle_view"
  | "monday_view"
  | "pricing_view"
  | "final_cta_view"
  | "faq_open"
  // ── Вторичные (P2) ──
  | "examples_anchor_click"
  | "login_click"
  | "feedback_open"
  | "feedback_submit"
  | "analytics_demo_click";

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

/**
 * `ssTrack` — v5-проводка событий (прототип «Витрина v5» звал одноимённый
 * глобал; в canon-пакете глобалей нет, трекер вешает консьюмер — мы).
 *
 * Делает ДВЕ вещи за один вызов:
 *   1. `reachGoal` в Я.Метрику (no-op без counter ID — см. выше);
 *   2. push в `window.dataLayer` — тот самый layer, на который Метрика
 *      подписана через `ecommerce:"dataLayer"` в init-снippet'е; также
 *      пригоден любому будущему tag-менеджеру. Пушим ВСЕГДА (даже без
 *      counter ID) — дешёвый массив, удобен для отладки в dev.
 *
 * Fire-and-forget, безопасен в SSR.
 */
export function ssTrack(goal: MetrikaGoal, params?: Record<string, unknown>): void {
  reachGoal(goal, params);
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: goal, ...(params ?? {}) });
}
