"use client";

/**
 * SiteHeader — drop-in wrapper around canon's `<StickyHeader>` (0.4.0).
 *
 * Wires the public-facing «Войти» and brand-logo links to prod routes:
 *
 *   • `loginHref="/login"` — master's customer-login (canon's
 *     <CustomerLogin> at /login). Was /admin-demo (placeholder) before
 *     0.4.0 shipped a real login.
 *
 *   • `homeHref="/"` — brand-mark click goes to landing root (proper
 *     Next route link). Replaces the 0.3.x click-delegation patch that
 *     intercepted clicks on .ss-brand-hover and called router.push('/').
 *     Canon 0.4.0 added the prop, so we drop the patch.
 *
 *   • `onMakeSiteClick` — primary CTA «Сделать сайт» dispatches the
 *     `samosite:open-submit` custom event; Hero listens.
 *
 * Renders both desktop + mobile canon variants via Tailwind sm: toggle
 * (same `ResponsiveCanonSection` pattern used on landing/app/page.tsx).
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
        <StickyHeader
          mobile={false}
          loginHref="/login"
          homeHref="/"
          onMakeSiteClick={openSubmitModal}
        />
      </div>
      <div className="sm:hidden">
        <StickyHeader
          mobile={true}
          loginHref="/login"
          homeHref="/"
          onMakeSiteClick={openSubmitModal}
        />
      </div>
    </>
  );
}
