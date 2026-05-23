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
import { LANDING_SECTIONS, baselinePath, type ViewportName } from "./utils/sections";
import { compareToBaseline } from "./utils/diff";

const DIFF_DIR = path.join(__dirname, "__diff");
const REPO_LANDING = path.resolve(__dirname, "..", "..");

/* Playwright projects are named `chromium-<role>-<width>` (see
   `playwright.config.ts`). The width suffix IS the ViewportName —
   no mapping table needed, just extract it. Adding a new viewport
   to playwright.config.ts means no edit here. */
function viewportNameFromProject(projectName: string): ViewportName {
  const match = projectName.match(/-(\d+)$/);
  if (!match) {
    throw new Error(`Unknown project: ${projectName}. Expected chromium-<role>-<width> form.`);
  }
  return match[1] as ViewportName;
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

      /* Smoke-only mode when this (section, viewport) pair isn't in
         `auditedViewports`. Selector still resolves (= structure didn't
         break) but pixel comparison is skipped until Phase C ports the
         section to match canon dimensions at this viewport. The
         baseline PNG still exists in `tests/visual/baselines/` — it's
         the target. To opt in, add the viewport name to the section's
         `auditedViewports` array in `utils/sections.ts` in the SAME PR
         that ports the section. */
      if (!section.auditedViewports.includes(viewport)) {
        testInfo.annotations.push({
          type: "pending-audit",
          description: `${section.label} @ ${viewport}: smoke-only — add to auditedViewports in Phase C`,
        });
        return;
      }

      const baseline = path.join(REPO_LANDING, baselinePath(section.id, viewport));
      const buf = await locator.screenshot();
      const result = compareToBaseline(buf, baseline, {
        diffDir: DIFF_DIR,
        label: `${section.id}-${viewport}`,
        /* threshold here is the per-pixel sensitivity passed to pixelmatch.
           0.1 = "noticeable to the human eye" (pixelmatch docs). Bumped to
           0.20 to tolerate font-anti-aliasing differences between Linux
           CI runners and macOS dev machines — same Onest glyph renders
           a few sub-pixel intensity steps apart, which at 0.1 trips the
           comparator on every bold-text letter edge. 0.20 still flags
           real (5 px+) layout shifts and colour changes. */
        threshold: 0.2,
        /* Allow prod to be up to 32 px taller than canon. Common cause:
           Tailwind base styles add slightly more line-height / padding
           than canon's inline-style values. Width must still match (no
           horizontal-shift wiggle room). Diff runs over canon's height
           region, prod's bottom rows are ignored. */
        heightTolerance: 32,
      });

      /* Pixel budget — fraction of the canon-window pixels that may
         differ. 2 % budget is now feasible because baselines are
         regenerated on the SAME OS (Linux / Ubuntu) that CI runs on —
         see `infra/scripts/generate-canon-baselines-linux.sh`. The
         macOS-vs-Ubuntu font-AA gap from the earlier 4 % budget no
         longer applies because both sides of the comparison render in
         identical conditions. Local dev runs on macOS will see ~1 pp
         higher diff than CI — that's the cross-OS gap surfacing
         locally now, not in CI. */
      expect(
        result.pct,
        `Section "${section.label}" @ ${viewport}: ${result.diff}/${result.total} px differ ` +
          `(${(result.pct * 100).toFixed(2)}% > 2.00% budget). ` +
          (result.diffPath ? `Diff PNG: ${path.relative(REPO_LANDING, result.diffPath)}` : ""),
      ).toBeLessThanOrEqual(0.02);
    });
  }
});
