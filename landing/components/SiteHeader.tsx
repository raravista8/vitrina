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
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** Custom event name shared between SiteHeader (emit) and Hero (listen). */
export const SAMOSITE_OPEN_SUBMIT = "samosite:open-submit";

function openSubmitModal() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SAMOSITE_OPEN_SUBMIT));
}

export function SiteHeader() {
  const router = useRouter();

  // Brand-logo navigation patch. Canon's <StickyHeader> hardcodes the
  // brand anchor to `<a href="#hero">` (see canon/src/landing/index.tsx
  // line 2576). That works on the canvas demo (single-page composition)
  // and on / (where #hero exists in Hero.tsx), but only as a fragment
  // scroll — the URL gains `#hero`, not a real route. We want clicks on
  // the brand to behave like «go to the main page», even from a sub-route.
  //
  // Delegated listener catches clicks on `.ss-brand-hover` inside the
  // sticky header → preventDefault → router.push('/').
  //
  // Proper fix is canon 0.3.1 adding a `homeHref` prop (analogous to the
  // 0.2.3 `loginHref` addition); flagged in CHANGELOG follow-ups. Once
  // shipped, this effect drops out and we set `homeHref="/"`.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.(
        ".ss-sticky-header .ss-brand-hover",
      ) as HTMLAnchorElement | null;
      if (!a) return;
      // Allow modifier-clicks to behave naturally (open-in-new-tab etc.)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      e.preventDefault();
      router.push("/");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  // `loginHref` — public-facing «Войти» destination. Canon's prop accepts
  // any string (added in 0.2.3). For pre-launch we point at /admin-demo —
  // the master's site-management ЛК (canon's <ClientAdminDemo /> drop-in).
  // Operator/founder admin lives separately at /admin/login — not surfaced
  // on the public landing; founder bookmarks it.
  //
  // When real customer-auth lands (magic-link / OAuth, FR-062), introduce a
  // proper /login route that handles both audiences, and switch this href
  // there. /admin-demo stays as the post-login destination.
  return (
    <>
      <div className="hidden sm:block">
        <StickyHeader mobile={false} loginHref="/admin-demo" onMakeSiteClick={openSubmitModal} />
      </div>
      <div className="sm:hidden">
        <StickyHeader mobile={true} loginHref="/admin-demo" onMakeSiteClick={openSubmitModal} />
      </div>
    </>
  );
}
