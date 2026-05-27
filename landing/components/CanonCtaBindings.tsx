"use client";

/**
 * CanonCtaBindings — wires canon body-section CTAs to the prod
 * SubmitModal + the prod /admin-demo route, without forking canon.
 *
 * Canon 0.6.0 renders 4 CTA-points in the body (besides Hero, which is
 * hand-rolled): Monday-mid-page, Pricing, FinalCta — all primary accent
 * buttons emitted as `<a href="#hero">` with inline accent background;
 * Ownership demo link — `<a href="client-admin-demo.html">`. Without
 * intervention these would either dead-anchor to `#hero` (visitor
 * scrolls but no modal opens) or 404 (relative URL resolves to
 * `samosite.online/client-admin-demo.html`).
 *
 * Why DOM mutation instead of forking canon: canon 0.6.0 removed the
 * `onMakeSiteClick` / `homeHref` / `loginHref` props that 0.4.0 shipped
 * (regression noted in `docs/handoff/CANON_SWAP_PLAN.md §StickyHeader
 * href regression`). The same mitigation pattern used in
 * `SiteHeader.tsx` is reused here for body CTAs.
 *
 * Behaviour after mount:
 *  - Every `<a href="#hero">` with an accent background inside `<main>`
 *    is tagged with `data-ss-primary-cta="1"`.
 *  - `SiteHeader.tsx`'s existing `document`-scoped click delegation
 *    matches `a[data-ss-primary-cta]` anywhere on the page, calls
 *    `preventDefault()`, and dispatches the `samosite:open-submit`
 *    CustomEvent. Hero's effect listens for that event and opens
 *    `<SubmitModal />` in `link` mode.
 *  - Every `<a href*="client-admin-demo">` has its `href` rewritten to
 *    `/admin-demo` (the actual Next.js route lives at
 *    `landing/app/admin-demo/page.tsx`). Native anchor click navigates.
 *
 * MutationObserver scoped to `<main>` re-applies the bindings every
 * time canon re-renders (mobile-toggle, hover state, any future canon
 * refactor that re-mounts the section subtree).
 *
 * Returns `null` — this is a pure side-effect component. Mount once,
 * anywhere inside the page tree. We mount it in `landing/app/page.tsx`
 * right after `<SiteHeader />` so the effect runs before the user has
 * any chance to click a body CTA.
 *
 * If canon 0.7.x restores `onMakeSiteClick` props OR ships first-class
 * `href` overrides on the body CTAs — delete this file, wire props
 * directly, document the deprecation in
 * `docs/handoff/CANON_SWAP_PLAN.md`.
 */

import { useEffect } from "react";

/* Same heuristic as `SiteHeader.tsx::isPrimaryCtaAnchor`. Canon emits
 * primary CTAs with inline `style="background: oklch(...)"` (or
 * `rgb(...)` after a future refactor). Brand-mark / nav-link / login
 * anchors carry `text-decoration: none; color: inherit` instead — no
 * inline background — so the test correctly excludes them. */
function isPrimaryCtaAnchor(a: HTMLAnchorElement): boolean {
  const bg = a.style.background || a.style.backgroundColor || "";
  return bg.includes("oklch") || bg.startsWith("rgb");
}

export function CanonCtaBindings() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const main = document.querySelector("main");
    if (!main) return;

    const fixCtas = () => {
      /* Primary CTAs — mark them so SiteHeader's global click delegation
       * picks them up. The dataset write itself does NOT cancel the
       * anchor's native scroll-to-#hero behaviour — that's handled by
       * `event.preventDefault()` inside the delegated click handler in
       * SiteHeader.tsx. So if SiteHeader didn't mount (impossible on
       * prod, but conceptually), users would still get the anchor
       * scroll fallback instead of broken-button behaviour. */
      for (const a of Array.from(main.querySelectorAll<HTMLAnchorElement>('a[href="#hero"]'))) {
        if (isPrimaryCtaAnchor(a)) {
          a.dataset["ssPrimaryCta"] = "1";
        }
      }
      /* Ownership demo link — `<a href="client-admin-demo.html">` from
       * canon 0.6.0. We use href substring match so any future canon
       * variant (e.g. `./client-admin-demo.html`) is still caught.
       * Idempotent: setting the same href twice is a no-op. */
      for (const a of Array.from(
        main.querySelectorAll<HTMLAnchorElement>('a[href*="client-admin-demo"]'),
      )) {
        a.setAttribute("href", "/admin-demo");
      }
    };

    fixCtas();
    const observer = new MutationObserver(fixCtas);
    observer.observe(main, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
