"use client";

/**
 * SiteHeader — wrapper around canon's `<StickyHeader>` (0.6.0).
 *
 * Canon 0.6.0 REGRESSED the prop interface — `loginHref`, `homeHref`,
 * and `onMakeSiteClick` (all shipped in 0.4.0 and consumed here in
 * PR #140) are gone. Canon 0.6.0 hard-codes:
 *
 *   • brand-mark → `<a href="#hero">`  (we need `/`)
 *   • «Войти»    → `<a href="#login">` (we need `/login`)
 *   • primary CTA → `<a href="#hero">` (we need to open SubmitModal,
 *                                       not scroll to Hero)
 *
 * Since canon is vendored we can't patch it. Workaround: a single
 * useEffect mutates the right anchor attributes post-render + binds
 * a click handler on the primary CTA. Click delegation handles
 * canon re-renders.
 *
 * If canon 0.7.x restores `loginHref` / `homeHref` / `onMakeSiteClick`
 * — delete this wrapper's effect and pass the props directly.
 *
 * Renders both desktop + mobile canon variants via Tailwind sm: toggle
 * (same `ResponsiveCanonSection` pattern used on landing/app/page.tsx).
 */

import { StickyHeader } from "@samosite/canon/landing";
import { useEffect } from "react";

/** Custom event name shared between SiteHeader (emit) and Hero (listen). */
export const SAMOSITE_OPEN_SUBMIT = "samosite:open-submit";

function isPrimaryCtaAnchor(a: HTMLAnchorElement): boolean {
  /* Canon 0.6.0 §StickyHeader: the primary CTA anchor carries
   * `style="background: <accent>; color: #fff; ..."` (set via
   * inline `primaryStyle`). The brand-mark anchor wraps <BrandMark>
   * with `text-decoration: none; color: inherit`. We distinguish by
   * looking for the accent background — robust to canon adding more
   * `<a href="#hero">` anchors elsewhere on the header. */
  const bg = a.style.background || a.style.backgroundColor || "";
  return bg.includes("oklch") || bg.startsWith("rgb");
}

export function SiteHeader() {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const fixHrefs = () => {
      const hosts = document.querySelectorAll<HTMLElement>(".ss-sticky-header");
      for (const host of Array.from(hosts)) {
        // «Войти» — canon ships `#login`, we want `/login`.
        for (const a of Array.from(host.querySelectorAll<HTMLAnchorElement>("a.ss-login-link"))) {
          a.setAttribute("href", "/login");
        }
        // Brand-mark + primary CTA both ship as `<a href="#hero">`.
        for (const a of Array.from(host.querySelectorAll<HTMLAnchorElement>('a[href="#hero"]'))) {
          if (isPrimaryCtaAnchor(a)) {
            // Keep `#hero` as a no-JS fallback (scrolls to Hero, where
            // the in-Hero CTA opens the modal). Mark for our handler so
            // we can preventDefault on click without re-querying.
            a.dataset["ssPrimaryCta"] = "1";
          } else {
            // Brand-mark — route to landing root.
            a.setAttribute("href", "/");
          }
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>(
        "a[data-ss-primary-cta]",
      );
      if (!target) return;
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(SAMOSITE_OPEN_SUBMIT));
    };

    fixHrefs();
    // Canon re-renders on every interaction (mobile-toggle, hover, etc.).
    // Re-apply fixes via a tiny MutationObserver scoped to the sticky
    // header — much cheaper than a global observer + survives any
    // future canon refactor as long as the structural classes stay.
    const observer = new MutationObserver(fixHrefs);
    const hosts = document.querySelectorAll(".ss-sticky-header");
    for (const host of Array.from(hosts)) {
      observer.observe(host, { childList: true, subtree: true });
    }
    document.addEventListener("click", onClick);
    return () => {
      observer.disconnect();
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      <div className="hidden sm:block">
        <StickyHeader mobile={false} />
      </div>
      <div className="sm:hidden">
        <StickyHeader mobile={true} />
      </div>
    </>
  );
}
