/**
 * Landing root page (v2.1.3 final structure + @samosite/canon integration).
 *
 * Sections per docs/COPY.md §2 + CLAUDE_CODE_TZ_session_v2.1.3.md §1.5:
 *
 *   1. Nav         — inside Hero
 *   2. Hero        — H1 «три сам» + input + CTA   ← LOCAL (interactive)
 *   3. Examples    — 3 demo cases                  ← canon
 *   4. Story       — 6 steps zigzag                ← canon
 *   5. Platforms   — bento active + soon           ← canon
 *   6. BigFeatures — 8 «сам» cards                 ← canon
 *   7. Ownership   — copy + admin mock             ← canon
 *   8. Analytics   — demo charts                   ← canon
 *   9. Pricing     — 990 ₽/мес single tariff       ← canon
 *  10. FAQ         — 10 native <details> Q&A       ← canon
 *  11. FreeMonthCTA — Dojim final CTA              ← canon
 *  12. Footer       — © Самосайт                   ← LOCAL
 *
 * Why Hero + Footer stay local while the middle 9 sections come from
 * `@samosite/canon/landing`:
 *
 *   • Canon's `HeroBlock` is read-only — input is a `<span>` placeholder,
 *     CTA is `<a href="#hero">`. We need the real interactive form
 *     (paste → debounced live preview → click → SubmitModal wizard →
 *     POST /api/submit-application → confirmation). Replacing Hero with
 *     canon would visually align but break the entire signup conversion
 *     funnel, which is the only path to first-paying-user. Hero stays
 *     mine until canon ships a hook-based Hero variant.
 *
 *   • Canon doesn't export `Footer` standalone (it's inlined inside
 *     `<SamosaytLanding>`). Our local `Footer` already matches canon's
 *     slim footer pattern; we'd extract canon's footer to a future PR
 *     if a meaningful drift appears.
 *
 *   • All 9 middle sections are presentational — replacing them with
 *     canon gives byte-perfect visual fidelity instantly, with zero
 *     transcription drift. This is the core win of @samosite/canon.
 *
 * Responsive strategy:
 *
 *   Canon's components take a `mobile` boolean prop and emit DIFFERENT
 *   styles based on it (inline-styles, not Tailwind breakpoints). To
 *   match both viewports without a viewport-aware client component
 *   (which would defeat SSR), we render BOTH variants and hide one via
 *   CSS media query. Payload roughly doubles for these sections; for
 *   ISR-cached landing static this trade-off is acceptable (~80 KB
 *   extra HTML, cached for the 60s revalidate window).
 *
 * Removed in v2.1.3:
 *   - SocialProof — pilot UX test, см. v2.1.3 §1.2 + Phase 36.
 *
 * See also:
 *   - `docs/handoff/CANON_PACKAGE_TZ.md` for the canon-as-package spec
 *   - `packages/canon/CHANGELOG.md` for what's in 0.1.0
 *   - `landing/app/layout.tsx` — `<CanonStyles />` wired in <body>
 */

import {
  AnalyticsSection,
  BigFeaturesSection,
  ExamplesSection,
  FaqSection,
  FreeMonthSection,
  OwnershipSection,
  PlatformsSection,
  PricingSection,
  StorySection,
} from "@samosite/canon/landing";

import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * Render a canon section in BOTH desktop and mobile variants;
 * Tailwind `sm:` breakpoint (640+) picks one via display:none.
 *
 * Why not a viewport-aware client component:
 *   • Client-only render = no SSR HTML for crawlers / first paint.
 *   • Hydration mismatch warnings if `useState(window.innerWidth)`.
 *   • CSS media query is the only deterministic SSR-friendly way to
 *     pick between two static markups.
 *
 * Cost: ~80 KB extra HTML on first paint (the hidden variant). For
 * a landing page that's ISR-cached for 60s under Caddy, this is invisible
 * to per-visitor cost. Removable later by switching to a single-variant
 * canon (e.g. if canon ships a Tailwind-breakpoint-driven version).
 */
function ResponsiveCanonSection({
  Component,
  id,
}: {
  Component: (props: { mobile: boolean }) => React.JSX.Element;
  /** Identifier used by visual-regression spec selector
   *  `[data-section=<id>]`. Stays stable across canon refreshes (the
   *  wrapper is ours, the rendered canon variant inside is theirs). */
  id: string;
}) {
  return (
    <div data-section={id}>
      <div className="hidden sm:block">
        <Component mobile={false} />
      </div>
      <div className="sm:hidden">
        <Component mobile={true} />
      </div>
    </div>
  );
}

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
  return (
    <main id="top">
      <SiteHeader />
      <Hero />
      <ResponsiveCanonSection id="examples" Component={ExamplesSection} />
      <ResponsiveCanonSection id="story" Component={StorySection} />
      <ResponsiveCanonSection id="platforms" Component={PlatformsSection} />
      <ResponsiveCanonSection id="big-features" Component={BigFeaturesSection} />
      <ResponsiveCanonSection id="ownership" Component={OwnershipSection} />
      <ResponsiveCanonSection id="analytics" Component={AnalyticsSection} />
      <ResponsiveCanonSection id="pricing" Component={PricingSection} />
      <ResponsiveCanonSection id="faq" Component={FaqSection} />
      <ResponsiveCanonSection id="free-month" Component={FreeMonthSection} />
      <Footer />
    </main>
  );
}
