import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SAMOSITE_OPEN_SUBMIT, SiteHeader } from "@/components/SiteHeader";

// SiteHeader is a thin wrapper around canon 0.2.3 <StickyHeader>. We
// don't re-test canon's internal markup here — that's locked by the
// canon package's own pixel-diff. We only verify the two prod-routing
// behaviours that the wrapper owns:
//   1. The «Войти» link points to our `/admin/login` (canon's default
//      is `https://samosite.online/login`, wrong path on our infra).
//   2. The «Собрать сайт» CTA dispatches the SAMOSITE_OPEN_SUBMIT
//      custom event (Hero listens for it to open SubmitModal).

describe("SiteHeader — prod wiring around canon StickyHeader 0.2.3", () => {
  it("renders the brand «Самосайт» (Cyrillic per PRD §3)", () => {
    render(<SiteHeader />);
    // The brand is wordmarked inside <BrandMark> — both desktop +
    // mobile variants render it, so it appears at least twice.
    const brand = screen.getAllByText("Самосайт");
    expect(brand.length).toBeGreaterThanOrEqual(2);
  });

  it("«Войти» link points to /login — master's customer-login page (canon 0.4.0)", () => {
    // Public-facing «Войти» now leads to canon's <CustomerLogin> at
    // /login (canon 0.4.0). Before 0.4.0 it was /admin-demo placeholder;
    // founder/operator admin at /admin/login is NOT surfaced here.
    render(<SiteHeader />);
    const loginLinks = screen.getAllByRole("link", { name: /Войти/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    for (const link of loginLinks) {
      expect(link).toHaveAttribute("href", "/login");
    }
  });

  it("brand-mark link points to / (canon 0.4.0 homeHref)", () => {
    // Canon 0.4.0 added `<StickyHeader homeHref>` so brand-mark is a
    // proper <a href> instead of needing the 0.3.x click-delegation
    // patch (PR #138 — now removed).
    render(<SiteHeader />);
    const brandAnchors = document.querySelectorAll<HTMLAnchorElement>(
      ".ss-sticky-header .ss-brand-hover",
    );
    expect(brandAnchors.length).toBeGreaterThanOrEqual(2);
    for (const a of Array.from(brandAnchors)) {
      expect(a.getAttribute("href")).toBe("/");
    }
  });

  it("«Собрать сайт» CTA dispatches samosite:open-submit event", () => {
    render(<SiteHeader />);
    const listener = vi.fn();
    window.addEventListener(SAMOSITE_OPEN_SUBMIT, listener);
    // Canon labels: desktop «Собрать сайт», mobile «Собрать». Both
    // are rendered (one hidden via CSS) so we pick the desktop one.
    const ctas = screen.getAllByRole("button", { name: /^Собрать сайт/ });
    expect(ctas.length).toBeGreaterThan(0);
    fireEvent.click(ctas[0]!);
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(SAMOSITE_OPEN_SUBMIT, listener);
  });

  it("falls back to <button>, not <a href=#hero>, when handler is wired", () => {
    // Canon 0.2.3 contract: if onMakeSiteClick supplied, render <button>;
    // else <a href="#hero">. We supply a handler, so element type must
    // be <button> — guards against accidental href-anchor regression
    // that would bypass openSubmitModal entirely.
    render(<SiteHeader />);
    const ctas = screen.getAllByRole("button", { name: /^Собрать/ });
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of ctas) {
      expect(cta.tagName).toBe("BUTTON");
    }
  });
});
