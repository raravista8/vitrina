/**
 * Image-diff helper for pixel-perfect regression tests.
 *
 * Compares an actual screenshot (Buffer from Playwright) against a committed
 * baseline PNG (loaded via pngjs). Returns the % of pixels that differ —
 * tests assert `pct <= 0.02` (2%) per `docs/handoff/README.md §6`.
 *
 * Why a thin wrapper:
 *   • Forces a single tunable for what "match" means — every spec uses the
 *     same threshold + same anti-aliasing tolerance.
 *   • Emits diff PNGs to `tests/visual/__diff/` on failure — the CI artifact
 *     uploader picks them up so a PR reviewer can eyeball what changed
 *     without re-running locally.
 *   • Refuses to compare images of different dimensions — that's a structural
 *     regression (section grew taller), not a 2% pixel issue, and bubbling it
 *     up as a sharp error message saves the next dev five confused minutes.
 */

import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

export interface DiffResult {
  /** Total pixels in the screenshot (width * height). */
  total: number;
  /** Number of pixels that exceed pixelmatch's per-pixel threshold. */
  diff: number;
  /** `diff / total` — what the spec compares against ≤0.02. */
  pct: number;
  /** Where the diff PNG was written, if `writeDiffOnMismatch` was set. */
  diffPath?: string;
}

export interface DiffOptions {
  /**
   * Per-pixel anti-aliasing sensitivity (0..1). Lower = stricter.
   * Default 0.1 matches pixelmatch's docs recommendation for "noticeable to
   * the eye" — text antialiasing won't trip it, but a 5px shift will.
   */
  threshold?: number;
  /**
   * If set, write the diff image to this dir (named like the baseline).
   * Only used when `diff > 0` — passing tests don't pollute the dir.
   */
  diffDir?: string;
  /** Label used for the diff filename + thrown error messages. */
  label?: string;
}

export function compareToBaseline(
  actualBuf: Buffer,
  baselinePath: string,
  opts: DiffOptions = {},
): DiffResult {
  if (!fs.existsSync(baselinePath)) {
    throw new Error(
      `[visual] baseline missing: ${baselinePath}\n` +
        `Run: bash infra/scripts/generate-canon-baselines.sh — and commit the PNGs.`,
    );
  }
  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const actual = PNG.sync.read(actualBuf);

  // Refuse comparison if dimensions diverge — see file header rationale.
  if (baseline.width !== actual.width || baseline.height !== actual.height) {
    throw new Error(
      `[visual] dimension mismatch for ${opts.label ?? baselinePath}:\n` +
        `  baseline ${baseline.width}x${baseline.height}\n` +
        `  actual   ${actual.width}x${actual.height}\n` +
        `Section layout changed structurally — regen the baseline if intentional.`,
    );
  }

  const { width, height } = baseline;
  const diffPng = new PNG({ width, height });
  const diff = pixelmatch(baseline.data, actual.data, diffPng.data, width, height, {
    threshold: opts.threshold ?? 0.1,
    /* `includeAA: true` would gate antialiasing artefacts BUT it costs ~3×
       runtime and our 2% budget already absorbs them at threshold 0.1. */
    includeAA: false,
  });

  let diffPath: string | undefined;
  if (diff > 0 && opts.diffDir) {
    fs.mkdirSync(opts.diffDir, { recursive: true });
    const label = opts.label ?? path.basename(baselinePath, ".png");
    diffPath = path.join(opts.diffDir, `${label}.diff.png`);
    fs.writeFileSync(diffPath, PNG.sync.write(diffPng));
  }

  return {
    total: width * height,
    diff,
    pct: diff / (width * height),
    diffPath,
  };
}
