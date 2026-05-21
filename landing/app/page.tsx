/**
 * Landing root page (v2).
 *
 * Sections per docs/COPY.md §2:
 *   1. Nav      — внутри Hero компонента
 *   2. Hero     — без eyebrow, без benefits-stack (см. COPY.md §11.1-11.2)
 *   3. Examples — 3 кейса (mobile carousel)
 *   4. Story    — 6 шагов зигзаг
 *   5. Platforms — 2 списка (ok / soon)
 *   6. BigFeatures — 4 новых карточки (включая «Сам выбирает отзывы»)
 *   7. FreeMonthCTA — тёмный risk-reversal блок
 *   8. Footer
 *
 * Старые v1 компоненты (BenefitsStack, HowItWorks, ICPCards, Pricing, FAQ)
 * больше не отображаются. Файлы пока оставлены в репо — удалять отдельным
 * housekeeping-PR после ревью v2 на проде.
 */

import { BigFeatures } from "@/components/BigFeatures";
import { Examples } from "@/components/Examples";
import { Footer } from "@/components/Footer";
import { FreeMonthCTA } from "@/components/FreeMonthCTA";
import { Hero } from "@/components/Hero";
import { Platforms } from "@/components/Platforms";
import { Story } from "@/components/Story";

export default function HomePage() {
  return (
    <main id="top">
      <Hero />
      <Examples />
      <Story />
      <Platforms />
      <BigFeatures />
      <FreeMonthCTA />
      <Footer />
    </main>
  );
}
