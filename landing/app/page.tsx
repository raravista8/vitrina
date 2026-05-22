/**
 * Landing root page (v2.1.3 final structure).
 *
 * Sections per docs/COPY.md §2 + CLAUDE_CODE_TZ_session_v2.1.3.md §1.5:
 *
 *   1. Nav         — inside Hero
 *   2. Hero        — H1 «три сам» + input + CTA
 *   3. Examples    — 3 demo cases (carousel on mobile)
 *   4. Story       — 6 steps zigzag, все начинаются с «Сам…»
 *   5. Platforms   — 7 active / 3 coming-soon sources
 *   6. BigFeatures — 8 «сам» cards + closer «А вы — хозяин»
 *   7. Ownership   — «Восемь «сам» — но кнопка всегда у вас» + admin
 *                    dashboard mock (Phase X2, canon финал 2)
 *   8. Analytics   — demo панели аналитики (Phase 7/9, NEW v2.1.3)
 *   9. Pricing     — 990 ₽/мес single tariff
 *   10. FAQ         — 10 questions through «Самосайт сам…» framing
 *   11. FreeMonthCTA — Dojim final CTA «Дайте Самосайту собрать себя»
 *   12. Footer
 *
 * Removed in v2.1.3:
 *   - SocialProof (47/1284/4.9★ + testimonials) — pilot test показал
 *     путаницу «продаём сайт или отзывы». См. v2.1.3 §1.2 + Phase 36.
 *
 * Order rationale:
 *   - Analytics AFTER BigFeatures, BEFORE Pricing — «вижу что получу»
 *     создаёт ценность перед тем как назвать цену.
 *   - FAQ BEFORE FreeMonthCTA — answers concerns before final dojim.
 */

import { AnalyticsSection } from "@/components/AnalyticsSection";
import { BigFeatures } from "@/components/BigFeatures";
import { Examples } from "@/components/Examples";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FreeMonthCTA } from "@/components/FreeMonthCTA";
import { Hero } from "@/components/Hero";
import { OwnershipSection } from "@/components/OwnershipSection";
import { Platforms } from "@/components/Platforms";
import { Pricing } from "@/components/Pricing";
import { Story } from "@/components/Story";

// v2.1.3 §1.2 — SocialProof секция (47 сайтов / 1284 заявок / 4.9★ +
// 4 testimonials) удалена целиком: для пилота на 47 мастерах с
// reviews-генерацией ИИ создавала путаницу «продаём ли мы Самосайт
// или отзывы». Возможный revert — restore из git history (PR-H #70).

/**
 * ISR revalidation — Next.js регенерит prerender каждые 60 секунд.
 *
 * Это меняет default response header c `cache-control: s-maxage=31536000`
 * (год) на `cache-control: s-maxage=60, stale-while-revalidate=...`. Цель —
 * через минуту после deploy любой fetch видит свежее, без необходимости
 * руками рестартовать контейнер. Аудиторам и QA это критично — иначе
 * любой кэш (browser / ISP-proxy / CDN) может год показывать старую
 * версию.
 *
 * 60 секунд — баланс: достаточно коротко чтобы аудит-итерации шли быстро,
 * достаточно длинно чтобы не нагружать сервер при пике трафика (один
 * regen-cycle на минуту = ≤60 builds/час).
 *
 * Static assets (`/_next/static/*`, `/examples/*.jpg`) этим НЕ затрагиваются
 * — у них content-hash в имени, могут кэшироваться год без риска
 * расхождения.
 */
export const revalidate = 60;

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <Examples />
      <Story />
      <Platforms />
      <BigFeatures />
      <OwnershipSection />
      <AnalyticsSection />
      <Pricing />
      <FAQ />
      <FreeMonthCTA />
      <Footer />
    </main>
  );
}
