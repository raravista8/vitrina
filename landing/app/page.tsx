/**
 * Landing root page (v2 — PR-H final structure).
 *
 * Sections per docs/COPY.md §2 + user feedback batch 3:
 *
 *   1. Nav         — inside Hero
 *   2. Hero        — H1 «три сам» + input + CTA
 *   3. SocialProof — counter «N сайтов работает» + 4 testimonials (NEW, PR-H)
 *   4. Examples    — 3 demo cases (carousel on mobile)
 *   5. Story       — 6 steps zigzag, все начинаются с «Сам…»
 *   6. Platforms   — 2 list of supported / coming-soon sources
 *   7. BigFeatures — 8 «сам» cards + closer «А вы — хозяин»
 *   8. Pricing     — 299 ₽/мес single tariff (NEW, PR-H)
 *   9. FAQ         — 10 questions through «Самосайт сам…» framing (NEW, PR-H)
 *   10. FreeMonthCTA — full Dojim block
 *   11. Footer
 *
 * Order rationale (user feedback batch 3):
 *   - SocialProof EARLY (before Examples) because «работает ли это вообще»
 *     beats «как будет выглядеть мой сайт» as a fear.
 *   - Pricing AFTER BigFeatures so visitor sees value before price.
 *   - FAQ BEFORE FreeMonthCTA — answers concerns before final dojim.
 */

import { BigFeatures } from "@/components/BigFeatures";
import { Examples } from "@/components/Examples";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FreeMonthCTA } from "@/components/FreeMonthCTA";
import { Hero } from "@/components/Hero";
import { Platforms } from "@/components/Platforms";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { Story } from "@/components/Story";

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
      <SocialProof />
      <Examples />
      <Story />
      <Platforms />
      <BigFeatures />
      <Pricing />
      <FAQ />
      <FreeMonthCTA />
      <Footer />
    </main>
  );
}
