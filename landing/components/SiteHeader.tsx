"use client";

/**
 * SiteHeader — drop-in wrapper around canon's `<StickyHeader>` (0.2.3).
 *
 * Why this exists:
 *   Canon ships StickyHeader as a presentational component. 0.2.3 added
 *   two optional props (`loginHref`, `onMakeSiteClick`) so consumers can
 *   wire it to real routes/handlers without forking. This file is the
 *   single place where we map canon's contract to our prod app:
 *
 *     - `loginHref="/admin/login"` (canon default points to absolute
 *       `https://samosite.online/login`, which is the wrong path on
 *       our infra — admin lives under `/admin/login`).
 *
 *     - `onMakeSiteClick` dispatches a custom DOM event
 *       (`samosite:open-submit`) that <Hero /> listens for and uses
 *       to open the SubmitModal. We can't pass a setState callback
 *       directly because page.tsx is a server component and we
 *       don't want to force it client-side (would defeat ISR/SSG
 *       and slow down LCP).
 *
 *       The event payload carries no data — Hero owns the modal
 *       state entirely. SiteHeader is the only sender, Hero is the
 *       only listener. If we ever need more emitters (Footer CTA,
 *       Pricing card, …), add them via `window.dispatchEvent` of
 *       the same event name.
 *
 * Why render both variants:
 *   Canon's StickyHeader takes a `mobile: boolean` prop and emits
 *   DIFFERENT inline styles based on it (not Tailwind breakpoints).
 *   Same pattern as `<ResponsiveCanonSection>` in app/page.tsx —
 *   render both, hide one via CSS. Cost: ~2 KB extra HTML on first
 *   paint. Removable if canon ships a Tailwind-breakpoint version.
 *
 * Removed nav from `<Hero>`:
 *   Before 0.2.3 we hand-rolled the same nav inside Hero.tsx (lines
 *   242-277). After this PR the canon version is the source of truth
 *   for the header — drift = 0 by construction.
 */

import { StickyHeader } from "@samosite/canon/landing";

/** Custom event name shared between SiteHeader (emit) and Hero (listen). */
export const SAMOSITE_OPEN_SUBMIT = "samosite:open-submit";

function openSubmitModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SAMOSITE_OPEN_SUBMIT));
}

export function SiteHeader() {
  return (
    <>
      <div className="hidden sm:block">
        <StickyHeader mobile={false} loginHref="/admin/login" onMakeSiteClick={openSubmitModal} />
      </div>
      <div className="sm:hidden">
        <StickyHeader mobile={true} loginHref="/admin/login" onMakeSiteClick={openSubmitModal} />
      </div>
    </>
  );
}
