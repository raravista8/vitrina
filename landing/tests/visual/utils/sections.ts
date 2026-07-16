/**
 * Map of landing sections we visual-test. Source of truth for both
 * baseline generation (which crops to capture from canon/index.html) and
 * the test spec (which selectors to screenshot on prod).
 *
 * Each entry pins a *single* DOM anchor (the `<section>` id) that exists
 * in BOTH the canon JSX prototype and the prod Next.js page. That symmetry
 * is what makes a one-script baseline regeneration possible — no per-side
 * coordinates to keep in sync.
 *
 * Order matches the v5 composition in `landing/components/V5Landing.tsx`
 * (canon 0.12.0 `V5_Page` order). Keep them in sync — both files drift
 * together when a section is added/removed.
 */

export interface VisualSection {
  /** Stable id used in baseline filenames. */
  id: string;
  /** CSS selector used by Playwright `page.locator()`. */
  selector: string;
  /** Short human label for test names + diff PNG captions. */
  label: string;
  /**
   * Per-viewport pixel-audit gate. When a viewport name is in the list,
   * the spec asserts ≤2 % diff against `baselines/<id>-<viewport>.png`.
   * Viewports NOT in the list run a selector-only smoke check.
   *
   * The list is granular per viewport because canon and prod use different
   * box models (canon inline-style `content-box`, prod Tailwind
   * `border-box`). The mismatch is invisible at desktop where canon
   * declares explicit `maxWidth: 1100` (both engines arrive at 1100 px
   * inner width), but at smaller viewports canon's wrapper overflows by
   * the padding amount (~40 px) and dimensions diverge. Auditing only the
   * viewports where this resolves cleanly avoids 100 % failure rates on
   * unrelated viewports while still gating the most-watched (desktop)
   * surface.
   *
   * Phase C adds viewports per PR as sections get pixel-tuned.
   */
  auditedViewports: ViewportName[];
}

export const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
  { name: "375", width: 375, height: 812 },
] as const;

export type ViewportName = (typeof VIEWPORTS)[number]["name"];

/* «Витрина v5 · Фарфор и лак» (canon 0.12.0) — section ids match the
   `data-section` wrappers in `landing/components/V5Landing.tsx`.

   TODO(v5-baselines): ALL entries are SMOKE-ONLY (`auditedViewports:
   []`) — the committed baseline PNGs in `tests/visual/baselines/` are
   stale v3 captures and MUST NOT be compared against the v5 page.
   Baseline regeneration for v5 is a follow-up:
     1. Rebuild the canon-source mirror for v5 (canon 0.12.0 `V5_*`).
     2. Regenerate baselines in the Linux Playwright container via
        `infra/scripts/generate-canon-baselines-linux.sh`.
     3. Re-enable `auditedViewports` per section in that PR.
   Until then this suite is a structural smoke check: every
   `[data-section]` selector must resolve to a visible (non-empty)
   element on the prod build — no pixel comparison. */
export const LANDING_SECTIONS: VisualSection[] = [
  {
    id: "hero",
    selector: "[data-section='hero']",
    label: "Hero (#1)",
    auditedViewports: [],
  },
  {
    id: "story",
    selector: "[data-section='story']",
    label: "Story (#2)",
    auditedViewports: [],
  },
  {
    id: "examples",
    selector: "[data-section='examples']",
    label: "Examples (#3)",
    auditedViewports: [],
  },
  {
    id: "how",
    selector: "[data-section='how']",
    label: "HowItWorks (#4)",
    auditedViewports: [],
  },
  {
    id: "reviews",
    selector: "[data-section='reviews']",
    label: "Reviews (#5)",
    auditedViewports: [],
  },
  {
    id: "pricing",
    selector: "[data-section='pricing']",
    label: "Pricing (#6)",
    auditedViewports: [],
  },
  {
    id: "honest",
    selector: "[data-section='honest']",
    label: "Honest (#7)",
    auditedViewports: [],
  },
  {
    id: "faq",
    selector: "[data-section='faq']",
    label: "FAQ (#8)",
    auditedViewports: [],
  },
  {
    id: "final",
    selector: "[data-section='final']",
    label: "Final CTA (#9)",
    auditedViewports: [],
  },
];

/** Resolve the baseline PNG path for a (section, viewport) pair. */
export function baselinePath(sectionId: string, viewport: ViewportName): string {
  return `tests/visual/baselines/${sectionId}-${viewport}.png`;
}
