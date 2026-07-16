/**
 * Type declaration для Yandex.Метрика global `window.ym`.
 *
 * Snippet inject'ится в `landing/app/layout.tsx` как inline <script>.
 * Все вызовы `ym(id, action, ...args)` идут через `lib/metrika.ts`
 * wrapper — здесь только TypeScript ambient declaration.
 *
 * Действия которые мы реально используем (для type-safety):
 *   - "init"        — initialization (вызывается из snippet'а, не из нашего кода)
 *   - "reachGoal"   — fire a goal-conversion event
 *
 * Я.Метрика API supports also "hit", "extLink", "params", "userParams", etc —
 * добавляем по мере необходимости.
 */

declare global {
  interface Window {
    /**
     * Yandex.Метрика global function.
     *
     * Defined by the inline snippet in `app/layout.tsx`. Undefined when:
     *   - SSR (no window)
     *   - dev / staging without NEXT_PUBLIC_YANDEX_METRIKA_ID
     *   - adblocker blocked the snippet
     */
    ym?: (
      counterId: number,
      action: "init" | "reachGoal" | "hit" | "extLink" | "params" | "userParams",
      ...args: unknown[]
    ) => void;

    /**
     * Общий data layer (Я.Метрика подписана через `ecommerce:"dataLayer"`
     * в init-снippet'е). Создаётся лениво первым `ssTrack` (`lib/metrika.ts`)
     * или самим снippet'ом.
     */
    dataLayer?: Record<string, unknown>[];
  }
}

export {};
