/**
 * Visual regression spec for the landing page.
 *
 * For every section in `LANDING_SECTIONS` × every viewport in `VIEWPORTS`,
 * we screenshot the production-built landing and compare against the
 * committed baseline PNG from `tests/visual/baselines/`. Diff ≤2% passes.
 *
 * How a baseline gets created:
 *   `npm run test:visual:update`
 *   → runs `infra/scripts/generate-canon-baselines.sh` which serves the
 *     canon Babel-prototype on a local port and screenshots it. Commit the
 *     resulting PNG churn in `git status` if it's the intentional new canon.
 *
 * How a regression looks in CI:
 *   This spec writes diff PNGs to `tests/visual/__diff/` on mismatch.
 *   The Github Action uploads that dir as an artifact named
 *   `visual-diff-<sha>` — download to eyeball what pixels moved.
 *
 * Stability notes:
 *   • Each test pins exactly one viewport via Playwright's `viewport` config,
 *     so a section captured at 1440 is always compared against the 1440 PNG.
 *   • `page.goto('/')` lands on the Next.js prod build. Animations are
 *     suppressed by `--force-prefers-reduced-motion` in `playwright.config.ts`
 *     so hover lifts (.ss-card-lift etc.) don't flake first-paint timing.
 *   • Tests assume the `next start` server is reachable at `BASE_URL` — the
 *     CI workflow brings it up before running this; locally use a separate
 *     terminal with `npm run start`.
 */

import { test, expect } from "@playwright/test";
import path from "node:path";
import { LANDING_SECTIONS, baselinePath } from "./utils/sections";
import { compareToBaseline } from "./utils/diff";

const DIFF_DIR = path.join(__dirname, "__diff");
const REPO_LANDING = path.resolve(__dirname, "..", "..");

/* Each Playwright project (chromium-desktop/tablet/mobile) sets its own
   viewport via the config. `test.info().project.name` tells us which one
   we're in, which we map back to the viewport name embedded in baseline
   filenames. */
function viewportNameFromProject(projectName: string): "1440" | "768" | "390" {
  if (projectName.endsWith("desktop")) return "1440";
  if (projectName.endsWith("tablet")) return "768";
  if (projectName.endsWith("mobile")) return "390";
  throw new Error(`Unknown project: ${projectName}`);
}

test.describe("landing visual regression", () => {
  for (const section of LANDING_SECTIONS) {
    test(`${section.label}`, async ({ page }, testInfo) => {
      const viewport = viewportNameFromProject(testInfo.project.name);

      await page.goto("/", { waitUntil: "networkidle" });
      /* Belt-and-braces: wait for fonts before screenshotting, otherwise
         first paint can use Times-fallback for ~80ms. */
      await page.evaluate(() => document.fonts.ready);

      const locator = page.locator(section.selector);
      await expect(
        locator,
        `selector "${section.selector}" missing on prod — did a section get renamed/removed?`,
      ).toBeVisible({ timeout: 10_000 });

      /* Smoke-only mode for un-audited sections: we verify the selector
         resolves (= structure didn't break) but skip pixel comparison
         until Phase C ports the section to match canon dimensions.
         The corresponding baseline PNG still exists in
         `tests/visual/baselines/` — it's the target that Phase C aims
         for. Once the prod section lands at canon dimensions, flip
         `audited: true` in `utils/sections.ts` in the SAME PR. */
      if (!section.audited) {
        testInfo.annotations.push({
          type: "pending-audit",
          description: `${section.label}: smoke-only — flip 'audited: true' when porting in Phase C`,
        });
        return;
      }

      const baseline = path.join(REPO_LANDING, baselinePath(section.id, viewport));
      const buf = await locator.screenshot();
      const result = compareToBaseline(buf, baseline, {
        diffDir: DIFF_DIR,
        label: `${section.id}-${viewport}`,
        /* threshold here is the per-pixel sensitivity passed to pixelmatch.
           0.1 = "noticeable to the human eye" (pixelmatch docs). The 2%
           BUDGET is enforced below — i.e. up to 2% of pixels may differ
           noticeably, anything beyond that is a real regression. */
        threshold: 0.1,
      });

      expect(
        result.pct,
        `Section "${section.label}" @ ${viewport}: ${result.diff}/${result.total} px differ ` +
          `(${(result.pct * 100).toFixed(2)}% > 2.00% budget). ` +
          (result.diffPath ? `Diff PNG: ${path.relative(REPO_LANDING, result.diffPath)}` : ""),
      ).toBeLessThanOrEqual(0.02);
    });
  }
});
