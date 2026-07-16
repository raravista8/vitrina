/**
 * Локальный аналитический хелпер интейка v2.
 *
 * НЕ трогаем `landing/lib/metrika.ts` (территория page-агента; его
 * `MetrikaGoal`-union не содержит интейк-v2-целей) — вместо этого шлём
 * напрямую в `window.dataLayer` + `window.ym` reachGoal. Имена целей —
 * из таблицы аналитики спеки интейка v2.
 *
 * Цели (завести на metrika.yandex.ru как «JavaScript-событие»):
 *   demo_shown                 {niche}    — показан пример ниши (шаг 01)
 *   niche_selected             {niche}    — выбрана ниша табом
 *   source_path                {path}     — активен путь источника (шаг 02)
 *   booking_platform_selected  {platform} — выбрана платформа записи (шаг 04)
 *   contacts_shown                        — показан шаг контактов (шаг 05)
 *   submit                     {channel, retry} — попытка отправки заявки
 */

export type Intake2Goal =
  | "demo_shown"
  | "niche_selected"
  | "source_path"
  | "booking_platform_selected"
  | "contacts_shown"
  | "submit";

const METRIKA_ID = process.env["NEXT_PUBLIC_YANDEX_METRIKA_ID"]?.trim() ?? "";

export function track(goal: Intake2Goal, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  // dataLayer — push всегда (GTM-совместимый формат из спеки).
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: goal, ...params });

  // Я.Метрика — только когда counter сконфигурирован (иначе no-op, как lib/metrika.ts).
  if (METRIKA_ID) {
    window.ym?.(Number(METRIKA_ID), "reachGoal", goal, params);
  }
}
