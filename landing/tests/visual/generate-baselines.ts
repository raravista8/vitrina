/**
 * Visual baseline generator — drives Playwright to screenshot each landing
 * section from `_visual-host.html` at three viewports, writes PNGs to
 * `landing/tests/visual/baselines/`.
 *
 * Invoked by `generate-canon-baselines.sh` after the static server is up.
 * The shell sets `BASE_URL` to the local server origin.
 *
 * Why per-section screenshots (not full-page):
 *   • Full-page on mobile @ 390 is ~13000px tall — a single PNG of that
 *     size diffed end-to-end picks up cumulative offset drift from any
 *     one earlier section. Per-section captures isolate the regression.
 *   • PRs that touch one section don't blow up unrelated tests.
 *
 * Threshold note: the SHELL HOST disables `transition`/`animation` via
 * CSS in `_visual-host.html`, so the screenshots are deterministic across
 * runs. We still wait one extra frame after navigation to let Onest font
 * paint settle — without that, the first run after a cold cache shows
 * fallback Times-New-Roman for ~80ms.
 */

import { chromium, type Page } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import { LANDING_SECTIONS, VIEWPORTS } from "./utils/sections";

const BASE_URL = process.env.BASE_URL ?? "http://127.0.0.1:9876";
/* Generator lives at `landing/tests/visual/generate-baselines.ts`.
   Baselines go next to it in `./baselines/`. Repo root is three levels up
   (used only for friendly relative paths in console output). */
const BASELINES_DIR = path.resolve(__dirname, "baselines");
const REPO_ROOT = path.resolve(__dirname, "..", "..", "..");

async function waitForReady(page: Page) {
  /* `_visual-host.html` sets `data-vh-ready="1"` once it has tagged sections
     with `data-vh-section`. Without this gate, we'd race the React mount. */
  await page.waitForFunction(() => document.body.getAttribute("data-vh-ready") === "1", {
    timeout: 15_000,
  });
  /* Belt-and-braces: also wait for fonts. Avoids first-paint Times flash. */
  await page.evaluate(() => document.fonts.ready);
  /* One more frame so React's microtask queue drains before screenshot. */
  await page.evaluate(
    () => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))),
  );
}

async function captureViewport(viewportName: string, isMobile: boolean) {
  const viewport = VIEWPORTS.find((v) => v.name === viewportName)!;
  const variant = isMobile ? "mobile" : "desktop";
  const url = `${BASE_URL}/_visual-host.html?variant=${variant}`;

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();

  try {
    console.log(`[${viewport.name}/${variant}] ${url}`);
    await page.goto(url, { waitUntil: "networkidle" });
    await waitForReady(page);

    let okCount = 0;
    let skipCount = 0;
    for (const section of LANDING_SECTIONS) {
      const locator = page.locator(`[data-vh-section="${section.id}"]`);
      if ((await locator.count()) === 0) {
        console.warn(
          `  [skip] ${section.id} — no element tagged. Section may be missing in canon variant=${variant}.`,
        );
        skipCount++;
        continue;
      }
      const outPath = path.join(BASELINES_DIR, `${section.id}-${viewport.name}.png`);
      await locator.screenshot({ path: outPath });
      console.log(`  ✓ ${section.id} → ${path.relative(REPO_ROOT, outPath)}`);
      okCount++;
    }
    console.log(`[${viewport.name}/${variant}] ${okCount} ok, ${skipCount} skipped\n`);
  } finally {
    await browser.close();
  }
}

async function main() {
  fs.mkdirSync(BASELINES_DIR, { recursive: true });

  /* 1440 + 768 use the canon Desktop variant. 390 uses Mobile.
     The canon has only two layout variants — there's no separate tablet
     design. 768 captures Desktop at a smaller viewport, which exercises
     prod's Tailwind sm: breakpoint (640px+) without going to the canon's
     mobile layout. */
  await captureViewport("1440", /* mobile */ false);
  await captureViewport("768", /* mobile */ false);
  await captureViewport("390", /* mobile */ true);

  console.log("[done] baselines committed to", path.relative(REPO_ROOT, BASELINES_DIR));
}

main().catch((err) => {
  console.error("[!] baseline generation failed:", err);
  process.exit(1);
});
