/**
 * Landing root page — canon 0.6.0 v3 narrative composition.
 *
 * Sections per `packages/canon/CHANGELOG.md` §0.6.0 +
 * `CLAUDE_CODE_TZ_landing_v0.6.0.md` §3 (mostly fixed order — Cycle
 * BEFORE Monday, Ownership AFTER Cycle + Monday). NB: Analytics ↔
 * Ownership were swapped per product request (Ownership now sits
 * UNDER Analytics) — see #8/#9 below:
 *
 *   1. SiteHeader  — sticky nav                       ← LOCAL (hand-rolled)
 *   2. Hero        — interactive input + CTA          ← LOCAL (interactive)
 *   3. Examples    — «а как выглядит» before mechanism ← canon
 *   4. Cycle       — 4-«сам» mechanism                ← canon · NEW
 *   5. Monday      — 3 weekly recommendation cards    ← canon · NEW
 *   6. BaseWork    — «ещё это из коробки»             ← canon · NEW
 *   7. Sources     — «у меня X, подойдёт?»            ← canon · NEW
 *   8. Analytics   — demo charts                      ← canon
 *   9. Ownership   — control panel demo (moved below Analytics) ← canon
 *  10. Pricing     — 5-tier PricingMatrix (from 690 ₽) ← canon
 *  11. FAQ         — «про рекомендации» + остальные   ← canon
 *  12. FinalCta    — 3-step ladder                    ← canon · NEW
 *  13. Footer      — © Самосайт                       ← LOCAL
 *
 * Removed in 0.6.0 (canon BREAKING — exports gone): StorySection,
 * PlatformsSection, BigFeaturesSection, FreeMonthSection,
 * HeroPlatformStrip. Replaced by Cycle / Monday / BaseWork /
 * Sources / FinalCta as listed above.
 *
 * Hero stays hand-rolled (interactive flow: paste → debounced
 * preview → SubmitModal → POST /api/submit-application). Footer
 * stays hand-rolled — canon doesn't export it standalone. All
 * other sections come from `@samosite/canon/landing` and render
 * BOTH mobile + desktop variants — Tailwind `sm:` media query
 * picks one. ~80 KB extra HTML, ISR-cached for 60 s.
 *
 * Pricing note (canon 0.7.x): the 5-tier `PricingMatrix` (Старт 0 ₽,
 * платные 690 / 1490 / 2990 / 6990) is a FRONT-END model only. Backend
 * (ЮKassa) still charges a single 990 ₽ plan. Plan-aware billing +
 * reconciliation tracked in `docs/handoff/CANON_SWAP_PLAN.md`
 * §«Pricing model» — out of scope for this release.
 *
 * See also:
 *   - `docs/handoff/CANON_PACKAGE_TZ.md` — canon-as-package spec
 *   - `packages/canon/CHANGELOG.md` — full 0.6.0 delta
 *   - `landing/app/layout.tsx` — `<CanonStyles />` wired in <body>
 */

import {
  AnalyticsSection,
  BaseWorkSection,
  CycleSection,
  ExamplesSection,
  FaqSection,
  FinalCtaSection,
  MondaySection,
  OwnershipSection,
  PricingSection,
  SourcesSection,
} from "@samosite/canon/landing";

import { CanonCtaBindings } from "@/components/CanonCtaBindings";
import { FeedbackFloatingButton } from "@/components/FeedbackForm";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MetrikaGoals } from "@/components/MetrikaGoals";
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
 * to per-visitor cost.
 */
function ResponsiveCanonSection({
  Component,
  id,
}: {
  Component: (props: { mobile: boolean }) => React.JSX.Element;
  /** Identifier used by visual-regression spec selector
   *  `[data-section=<id>]` AND by in-page anchor navigation
   *  (`<a href="#examples">` in Hero, canon StickyHeader nav, etc.).
   *  Stays stable across canon refreshes (the wrapper is ours, the
   *  rendered canon variant inside is theirs).
   *
   *  `scroll-mt-20` (Tailwind = `scroll-margin-top: 5rem` = 80 px)
   *  offsets anchor-scrolls so the section's top sits BELOW the
   *  sticky header instead of being hidden behind it. Canon's
   *  StickyHeader is ~64-72 px tall — 80 px gives comfortable
   *  breathing room. */
  id: string;
}) {
  return (
    <div id={id} data-section={id} className="scroll-mt-20">
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
      {/* CanonCtaBindings — DOM-mutation wiring for canon body CTAs.
          Marks Monday/Pricing/FinalCta accent buttons with
          `data-ss-primary-cta` so SiteHeader's existing global click
          delegation opens SubmitModal. Removes the OwnershipSection
          «Посмотреть демо личного кабинета» button (user request);
          rewrites the remaining Analytics demo link to `/admin-demo`.
          Must mount AFTER SiteHeader so its click handler is wired
          first; relative order to Hero doesn't matter. */}
      <CanonCtaBindings />
      {/* MetrikaGoals — analytics telemetry for canon sections:
          IntersectionObserver `*_view` goals + click delegation
          (faq_open / feedback_open / login_click / analytics_demo_click).
          Funnel + cta_click goals live in SiteHeader / Hero / SubmitModal. */}
      <MetrikaGoals />
      <Hero />
      <ResponsiveCanonSection id="examples" Component={ExamplesSection} />
      <ResponsiveCanonSection id="cycle" Component={CycleSection} />
      <ResponsiveCanonSection id="monday" Component={MondaySection} />
      <ResponsiveCanonSection id="base-work" Component={BaseWorkSection} />
      <ResponsiveCanonSection id="sources" Component={SourcesSection} />
      <ResponsiveCanonSection id="analytics" Component={AnalyticsSection} />
      <ResponsiveCanonSection id="ownership" Component={OwnershipSection} />
      <ResponsiveCanonSection id="pricing" Component={PricingSection} />
      <ResponsiveCanonSection id="faq" Component={FaqSection} />
      <ResponsiveCanonSection id="final-cta" Component={FinalCtaSection} />
      <Footer />
      {/* Sticky bottom-right «Чего не хватает?» → /feedback. Was global
          in app/layout.tsx, removed in PR-G (paid-service polish), now
          re-added landing-only per user request — keeps it off /feedback
          (redundant) and /login (wrong context). `position: fixed` so
          tree placement is purely logical. */}
      <FeedbackFloatingButton />
    </main>
  );
}
