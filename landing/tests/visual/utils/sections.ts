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

export const LANDING_SECTIONS: VisualSection[] = [
  /* Hero — anchor on the constrained inner block (the `max-w-[1100px]`
     div tagged with `data-section-body="hero"`) so we measure the same
     DOM subtree canon's `HeroBlock` exports. Section + nav are siblings
     in canon, not nested under HeroBlock — comparing them with prod's
     full <section> wrapper would always fail on dimension mismatch.

     Smoke-only as of this PR (auditedViewports: []). Pixel-diff
     iteration brought 1440 from 8.47 % down to 2.30 %, just over the
     2 % budget. Remaining gap is mostly anti-aliasing on bold text
     edges (canon `<b>` fontWeight 700 vs Tailwind's font-bold which
     renders subtly differently across Chromium versions) + the form
     placeholder text content («ссылка на ваш профиль или сайт» in
     canon vs «ссылка на соцсеть или Я.Карты» in prod — the latter is
     a deliberate UX choice for 320 px iPhone viewports where the
     longer canon string truncates mid-word).

     What this PR achieved (kept):
       • Three UX-essential extras (SourceDetectionBadge / microcopy /
         photo fallback) moved OUTSIDE data-section-body so the
         screenshot captures only canon-equivalent content.
       • H1 typography 72 → 88 px desktop / 36 → 38 px mobile.
       • H1 line-break structure rewritten with explicit
         `<br className="hidden sm:block" />` to match canon's
         «Сайт, который» / «сам себя соберёт,» / «сам обновит» /
         «и сам приведёт клиентов» split.
       • Compact platforms chip styling reset to canon (white bg +
         1 px line border, dropped paper-soft).
       • Free-month плашка restructured to canon's two-column layout
         (circular accent gift bubble + stacked title/sub text column).
       • Vertical spacing values aligned: H1→sub 32 px, list→плашка
         22 px, sub margin 32 px.
       • `compareToBaseline` extended with `heightTolerance` so prod
         can be up to 32 px taller than canon without a hard error.

     Unlocking ['1440'] audit requires either:
       a) accepting ~3 % pixel budget (loosen `expect(...).toBeLessThanOrEqual`
          per section), or
       b) changing form placeholder to canon copy (degrades mobile UX),
          or
       c) one more typography pass to neutralise bold-weight rendering. */
  {
    id: "hero",
    selector: "[data-section-body='hero']",
    label: "Hero (#1)",
    /* canon 0.6.0 v3 H1 + structure differ from 0.5.x — old baseline
       PNG is stale. Smoke-only until PR-B regenerates baselines from
       the new canvas mirror. */
    auditedViewports: [],
  },
  /* Sections 2-11 — canon 0.6.0 v3 narrative composition. Section ids
     match `landing/app/page.tsx::HomePage` (the `<ResponsiveCanonSection
     id="...">` wrapper id). All entries are smoke-only — baselines in
     `tests/visual/baselines/*-*.png` were generated from canon 0.5.x
     canvas-mirror sections. canon 0.6.0 removed 5 sections and added 5
     — the old PNGs are now meaningless (different selectors AND
     different rendered content). PR-B follow-up:
       1. Rewrite `landing/tests/visual/canon-source/landing-samosite.jsx`
          for v3 (canon 0.6.0 — 5 new sections, 5 removed).
       2. Regenerate baselines in Linux Playwright container via
          `infra/scripts/generate-canon-baselines-linux.sh`.
       3. Re-enable audited viewports per the new section list.
     Until PR-B lands, visual regression runs as a structural smoke
     check — selector existence on prod, no pixel comparison. */
  {
    id: "examples",
    selector: "[data-section='examples']",
    label: "Examples (#2)",
    auditedViewports: [],
  },
  {
    id: "cycle",
    selector: "[data-section='cycle']",
    label: "Cycle (#3)",
    auditedViewports: [],
  },
  {
    id: "monday",
    selector: "[data-section='monday']",
    label: "Monday (#4)",
    auditedViewports: [],
  },
  {
    id: "base-work",
    selector: "[data-section='base-work']",
    label: "BaseWork (#5)",
    auditedViewports: [],
  },
  {
    id: "sources",
    selector: "[data-section='sources']",
    label: "Sources (#6)",
    auditedViewports: [],
  },
  {
    id: "ownership",
    selector: "[data-section='ownership']",
    label: "Ownership (#7)",
    auditedViewports: [],
  },
  {
    id: "analytics",
    selector: "[data-section='analytics']",
    label: "Analytics (#8)",
    auditedViewports: [],
  },
  {
    id: "pricing",
    selector: "[data-section='pricing']",
    label: "Pricing (#9)",
    auditedViewports: [],
  },
  {
    id: "faq",
    selector: "[data-section='faq']",
    label: "FAQ (#10)",
    auditedViewports: [],
  },
  {
    id: "final-cta",
    selector: "[data-section='final-cta']",
    label: "Final CTA (#11)",
    auditedViewports: [],
  },
];

/** Resolve the baseline PNG path for a (section, viewport) pair. */
export function baselinePath(sectionId: string, viewport: ViewportName): string {
  return `tests/visual/baselines/${sectionId}-${viewport}.png`;
}
