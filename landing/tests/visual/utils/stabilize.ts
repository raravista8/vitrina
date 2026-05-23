/**
 * Stabilize a page for deterministic pixel-perfect screenshots.
 *
 * Call BEFORE every screenshot. Without this, you'll get flaky diffs
 * from animations, late-loading fonts, timestamp UI, and lazy images.
 *
 * This addresses the gap noted in `landing/CLAUDE.md` § Pixel-perfect
 * testing protocol → Gap. It's why Hero @ 768/390 is stuck at 🟡 in
 * `docs/handoff/VISUAL_COVERAGE.md` — the canon-baseline + prod-screenshot
 * pair flakes without this stabilization, even with
 * `--force-prefers-reduced-motion` at the browser level.
 *
 * Usage:
 *
 *   import { stabilize } from "./utils/stabilize";
 *
 *   test("hero matches baseline", async ({ page }) => {
 *     await page.goto("/");
 *     await stabilize(page);
 *     const buf = await page.locator('[data-section="hero"]').screenshot();
 *     // … compareToBaseline(buf, …);
 *   });
 */

import type { Page } from "@playwright/test";

/** Fixed timestamp used to freeze the clock. Picked to be unambiguously
 *  in the past so any "X days ago" UI renders deterministically. */
const FROZEN_NOW = new Date("2026-01-01T12:00:00.000Z").valueOf();

export interface StabilizeOptions {
  /** Extra settle time after networkidle (ms). Default 100. */
  settleMs?: number;
  /** Override the frozen timestamp. */
  now?: number;
}

export async function stabilize(page: Page, opts: StabilizeOptions = {}): Promise<void> {
  const settleMs = opts.settleMs ?? 100;
  const frozen = opts.now ?? FROZEN_NOW;

  // 1. Freeze Date. Anything reading `Date.now()` (timestamps, "X days ago",
  //    SSR cache hashes that depend on time) renders deterministically.
  //    addInitScript fires before any page script — Recharts and any client
  //    component that calls Date.now() at mount-time gets the frozen value.
  await page.addInitScript((nowValue) => {
    const OriginalDate = Date;
    class FrozenDate extends OriginalDate {
      constructor(...args: unknown[]) {
        if (args.length === 0) {
          super(nowValue);
        } else {
          // @ts-expect-error — forwarding to Date constructor with variadic args
          super(...args);
        }
      }
      static override now() {
        return nowValue;
      }
    }
    // @ts-expect-error — overriding global Date
    globalThis.Date = FrozenDate;
  }, frozen);

  // 2. Kill ALL animations / transitions / scroll smoothing via CSS injection.
  //    `--force-prefers-reduced-motion` at the browser level handles most
  //    framework animations, but inline-styled canon components and Recharts
  //    transitions slip through. Belt and suspenders.
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
      }
      html {
        scroll-behavior: auto !important;
      }
      /* Opt-out hook: add [data-visual-test-hide] to anything inherently
         non-deterministic (live counters, toasts, etc.) */
      [data-visual-test-hide] {
        visibility: hidden !important;
      }
    `,
  });

  // 3. Wait for fonts. Self-hosted Onest + JetBrains Mono need to finish
  //    loading before screenshot — fallback fonts have different metrics
  //    that shift entire sections vertically.
  await page.evaluate(() => document.fonts.ready);

  // 4. Wait for every <img> to finish decoding. Lazy-loaded brand glyphs,
  //    canon icons, customer-site placeholders pop in otherwise.
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(
      imgs.map((img) =>
        img.complete && img.naturalWidth > 0
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            }),
      ),
    );
  });

  // 5. Network idle + settle. Catches late SSR hydration paints
  //    (Recharts mounts after hydration, recalculates sizes once).
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(settleMs);
}
