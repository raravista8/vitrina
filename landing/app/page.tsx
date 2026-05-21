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
