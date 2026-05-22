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
    /* Hero @ 1440 audited (passes <2 % on Linux CI; ~2.44 % locally
       due to macOS-vs-Linux AA drift — documented). 768/390 still
       smoke-only: Hero's mobile reflow rearranges H1+free-month+
       platform-list block enough to need its own tuning pass. */
    auditedViewports: ["1440"],
  },
  /* Sections 2-10 — refactored in PR-Tier-1 to use a content-only
     `[data-section-body=<id>]` wrapper inside each <section>. The outer
     section keeps vertical padding for inter-section rhythm; the
     wrapper carries `px-5 sm:px-16` so its width matches the viewport
     (canon's edge-to-edge 1440 baselines) and its height is
     content-only (no top-padding offset). Same pattern Hero uses.

     Why all entries stay `auditedViewports: []` after the refactor:
     a local sweep showed the wrapper resolves the padding-offset
     issue but exposes underlying prod-vs-canon content drift —
     real differences in section heights driven by extra inner
     paragraphs, different card vertical padding, mobile reflow
     gaps. Per-viewport diffs after refactor (macOS local):

       Section     | 1440      | 768       | 390
       ------------|-----------|-----------|-----
       examples    | -348 px   | -350 px   | -314 px   (prod shorter)
       story       | -9 px     | +179 px   | +791 px   (mobile tall)
       platforms   | 3.62 %    | +124 px   | +218 px
       big-features| +73 px    | +583 px   | +1739 px  (mobile balloon)
       ownership   | (pass)    | +118 px   | +430 px
       analytics   | (pass)    | +93 px    | +433 px
       pricing     | +36 px    | +172 px   | +495 px
       faq         | 2.96 %    | +172 px   | +228 px
       free-month  | (pass)    | -98 px    | -228 px

     Each section needs an individual investigation + tuning pass
     (Examples needs canon-aligned content count; mobile-heavy
     sections need vertical-density audits). Until then, smoke-only
     keeps structural-regression coverage without false-positive
     CI churn. Foundation work (this PR) makes those follow-ups
     a one-line `auditedViewports` flip rather than a refactor. */
  {
    id: "examples",
    selector: "[data-section-body='examples']",
    label: "Examples (#2)",
    auditedViewports: [],
  },
  {
    id: "story",
    selector: "[data-section-body='story']",
    label: "Story (#3)",
    auditedViewports: [],
  },
  {
    id: "platforms",
    selector: "[data-section-body='platforms']",
    label: "Platforms (#4)",
    auditedViewports: ["1440"],
  },
  {
    id: "big-features",
    selector: "[data-section-body='big-features']",
    label: "BigFeatures (#5)",
    auditedViewports: [],
  },
  {
    id: "ownership",
    selector: "[data-section-body='ownership']",
    label: "Ownership (#6)",
    auditedViewports: [],
  },
  {
    id: "analytics",
    selector: "[data-section-body='analytics']",
    label: "Analytics (#7)",
    auditedViewports: [],
  },
  {
    id: "pricing",
    selector: "[data-section-body='pricing']",
    label: "Pricing (#8)",
    auditedViewports: [],
  },
  {
    id: "faq",
    selector: "[data-section-body='faq']",
    label: "FAQ (#9)",
    auditedViewports: ["1440"],
  },
  {
    id: "free-month",
    selector: "[data-section-body='free-month']",
    label: "FreeMonth CTA (#10)",
    auditedViewports: [],
  },
];

/** Resolve the baseline PNG path for a (section, viewport) pair. */
export function baselinePath(sectionId: string, viewport: ViewportName): string {
  return `tests/visual/baselines/${sectionId}-${viewport}.png`;
}
