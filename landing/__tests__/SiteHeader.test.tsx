import "@testing-library/jest-dom/vitest";

import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { SAMOSITE_OPEN_SUBMIT, SiteHeader } from "@/components/SiteHeader";

// SiteHeader is a thin wrapper around canon 0.6.0 <StickyHeader>.
// Canon 0.6.0 dropped the `loginHref` / `homeHref` / `onMakeSiteClick`
// props that 0.4.0 shipped; the wrapper restores their behaviour via
// a useEffect-based DOM mutation + global click handler.
//
// What this spec locks:
//   1. «Войти» → /login  (canon ships #login, mutation rewrites it).
//   2. Brand-mark → /    (canon ships #hero, mutation rewrites it).
//   3. Primary CTA click → SAMOSITE_OPEN_SUBMIT event fired
//      (canon ships <a href="#hero">, handler preventDefault + dispatch).

describe("SiteHeader — wrapper around canon 0.6.0 StickyHeader", () => {
  it("renders the brand «Самосайт» (Cyrillic per PRD §3)", () => {
    render(<SiteHeader />);
    // The brand is wordmarked inside <BrandMark> — both desktop +
    // mobile variants render it, so it appears at least twice.
    const brand = screen.getAllByText("Самосайт");
    expect(brand.length).toBeGreaterThanOrEqual(2);
  });

  it("«Войти» link points to /login (post-mutation)", () => {
    render(<SiteHeader />);
    const loginLinks = screen.getAllByRole("link", { name: /Войти/i });
    expect(loginLinks.length).toBeGreaterThan(0);
    for (const link of loginLinks) {
      expect(link).toHaveAttribute("href", "/login");
    }
  });

  it("brand-mark link points to / (post-mutation)", () => {
    render(<SiteHeader />);
    // Canon 0.6.0 wraps <BrandMark> in <a href="#hero">. Our effect
    // distinguishes the brand-mark anchor (no inline background) from
    // the primary CTA anchor (background: VT.accent) and rewrites
    // only the brand-mark's href to /.
    const allHeroAnchors = document.querySelectorAll<HTMLAnchorElement>(".ss-sticky-header a");
    const brandAnchors = Array.from(allHeroAnchors).filter((a) => a.getAttribute("href") === "/");
    expect(brandAnchors.length).toBeGreaterThanOrEqual(2);
  });

  it("primary CTA click dispatches samosite:open-submit event", () => {
    render(<SiteHeader />);
    const listener = vi.fn();
    window.addEventListener(SAMOSITE_OPEN_SUBMIT, listener);
    // Canon 0.6.0 renders the primary CTA as <a href="#hero" style="background:VT.accent;…">
    // with text «Собрать за 2 часа →» (desktop) / «Собрать →» (mobile).
    // Our effect tags it with data-ss-primary-cta=1 — query by that.
    const ctas = document.querySelectorAll<HTMLAnchorElement>("a[data-ss-primary-cta]");
    expect(ctas.length).toBeGreaterThan(0);
    fireEvent.click(ctas[0]!);
    expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener(SAMOSITE_OPEN_SUBMIT, listener);
  });

  it("primary CTA copy is «Собрать» (canon 0.6.0)", () => {
    render(<SiteHeader />);
    // Mobile: «Собрать», Desktop: «Собрать за 2 часа». Either way
    // starts with «Собрать».
    const ctas = document.querySelectorAll<HTMLAnchorElement>("a[data-ss-primary-cta]");
    expect(ctas.length).toBeGreaterThan(0);
    for (const cta of Array.from(ctas)) {
      expect(cta.textContent?.trim().startsWith("Собрать")).toBe(true);
    }
  });
});
