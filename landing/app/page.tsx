/**
 * Landing root page — «Витрина v5 · Фарфор и лак» (canon 0.12.0).
 *
 * Вся композиция (11 canon-секций `V5_*` + intake2-хост + аналитика +
 * FAQPage JSON-LD) живёт в client-компоненте `components/V5Landing.tsx` —
 * page.tsx остаётся server component'ом ради route-segment config
 * (`revalidate`) — `'use client'`-файлы его экспортировать не могут.
 * Client-компонент SSR'ится, так что первичный HTML для краулеров полный.
 *
 * Порядок секций (canon `V5_Page` — источник истины):
 *   Header → Hero → Story → Examples → HowItWorks → Reviews → Pricing →
 *   Honest → Faq → FinalCta → Footer.
 *
 * v3-композиция (ResponsiveCanonSection + hand-rolled Hero / SiteHeader /
 * Footer / CanonCtaBindings / MetrikaGoals) retired этим PR — компоненты
 * остаются в repo с @deprecated-шапками до отдельного мажора-чистки
 * (см. `packages/canon/CHANGELOG.md` §0.12.0 «Депрекейт»).
 */

import { V5Landing } from "@/components/V5Landing";

/**
 * ISR revalidation — Next.js регенерит prerender каждые 60 секунд.
 *
 * Это меняет default response header c `cache-control: s-maxage=31536000`
 * (год) на `cache-control: s-maxage=60, stale-while-revalidate=...`. Цель —
 * через минуту после deploy любой fetch видит свежее, без необходимости
 * руками рестартовать контейнер.
 */
export const revalidate = 60;

export default function HomePage() {
  return <V5Landing />;
}
