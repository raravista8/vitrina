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
 * Order matches `docs/handoff/specs/03_session_v2.1.3.md §1.5` (final
 * landing structure), and matches `landing/app/page.tsx` JSX order. Keep
 * them in sync — both files drift together when a section is added/removed.
 */

export interface VisualSection {
  /** Stable id used in baseline filenames. */
  id: string;
  /** CSS selector used by Playwright `page.locator()`. */
  selector: string;
  /** Short human label for test names + diff PNG captions. */
  label: string;
  /**
   * Pixel-audit gate. When `true`, the spec asserts ≤2 % diff against the
   * committed baseline PNG. When `false`, the spec only smoke-checks that
   * the selector resolves on prod (canon and prod still have structural
   * divergence — see `docs/handoff/specs/03_session_v2.1.3.md §1.5`).
   *
   * Phase C flips entries to `true` one PR at a time as each section is
   * ported. **Flip happens in the SAME PR that ports the section** — that's
   * what locks in the new pixel state.
   */
  audited: boolean;
}

export const LANDING_SECTIONS: VisualSection[] = [
  /* Hero — full first viewport. Hero has no `<section>` wrapper today (it
     IS the main top area) so we anchor on the first child of <main>. */
  { id: "hero", selector: "main > :first-child", label: "Hero (#1)", audited: false },
  { id: "examples", selector: "section#examples", label: "Examples (#2)", audited: false },
  { id: "story", selector: "section#how-it-works", label: "Story (#3)", audited: false },
  { id: "platforms", selector: "section#platforms", label: "Platforms (#4)", audited: false },
  /* BigFeatures has `id="features"` on prod (legacy from PR-C) — keeping
     the prod id stable to avoid breaking deep-links from blog posts and
     bookmarks. Baseline filename still uses `big-features` for clarity. */
  {
    id: "big-features",
    selector: "section#features",
    label: "BigFeatures (#5)",
    audited: false,
  },
  { id: "ownership", selector: "section#ownership", label: "Ownership (#6)", audited: false },
  { id: "analytics", selector: "section#analytics", label: "Analytics (#7)", audited: false },
  { id: "pricing", selector: "section#pricing", label: "Pricing (#8)", audited: false },
  { id: "faq", selector: "section#faq", label: "FAQ (#9)", audited: false },
  {
    id: "free-month",
    selector: "section#free-month",
    label: "FreeMonth CTA (#10)",
    audited: false,
  },
];

export const VIEWPORTS = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
] as const;

export type ViewportName = (typeof VIEWPORTS)[number]["name"];

/** Resolve the baseline PNG path for a (section, viewport) pair. */
export function baselinePath(sectionId: string, viewport: ViewportName): string {
  return `tests/visual/baselines/${sectionId}-${viewport}.png`;
}
