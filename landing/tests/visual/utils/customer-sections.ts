/**
 * Map of customer-site sections to visual-test. Source of truth for both
 * baseline generation (which crops to capture from canon `screens-customer.jsx`)
 * and the customer.spec.ts (which `[data-section="..."]` selectors to
 * screenshot on the rendered fixture).
 *
 * Order matches `docs/handoff/specs/02_customer_v2.1.md §1` (12 sections
 * + sticky-mobile-CTA which only renders on mobile). Each entry has the
 * SAME `data-section` value on both sides — canon JSX
 * `screens-customer.jsx::S7_CustomerSite` AND
 * `sites-template/index.html.j2` (added in PR-C / Tier 2a).
 *
 * Note on coverage:
 *   • Initial PR-C lands the scaffolding (this file + customer.spec.ts +
 *     fixture renderer). `auditedViewports: []` for ALL sections means
 *     spec runs as smoke-only (selector check) — no baseline assertions
 *     yet. Baselines + Linux regenerator come in a follow-up PR.
 *   • Single palette (`cream`) tested at pixel level. `slate` and `sage`
 *     are color-only variations; future tier will use unit colour-snap
 *     instead of pixel-screenshot to avoid 3× baseline storage.
 */
import type { ViewportName } from "./sections";

export interface CustomerSection {
  /** Stable id used in baseline filenames. */
  id: string;
  /** `[data-section="..."]` selector matching both canon + rendered fixture. */
  dataSection: string;
  /** Short human label for test names + diff PNG captions. */
  label: string;
  /**
   * Per-viewport pixel-audit gate. Spec asserts ≤2 % diff against
   * `baselines/customer/<id>-<viewport>.png` when the viewport is listed.
   * Viewports NOT listed run a selector-only smoke check (still
   * surfaces missing-section structural breaks).
   *
   * Tier 2a lands all entries as `[]` — assertions + baselines come in
   * the follow-up PR after Linux-baseline regen converges. This file
   * is the unblock-list for that follow-up: just add viewport names.
   */
  auditedViewports: ViewportName[];
  /**
   * Sections that ONLY exist on a specific viewport (e.g. sticky-mobile
   * CTA is mobile-only). Lists of viewports where the selector is
   * expected to be NOT visible. Spec uses this to skip the smoke check.
   */
  hiddenOn?: ViewportName[];
}

export const CUSTOMER_SECTIONS: CustomerSection[] = [
  {
    id: "sticky-header",
    dataSection: "sticky-header",
    label: "Sticky header (C1)",
    auditedViewports: [],
  },
  {
    id: "hero",
    dataSection: "hero",
    label: "Hero (C2)",
    auditedViewports: [],
  },
  {
    id: "social-bar",
    dataSection: "social-bar",
    label: "Social proof bar (C3)",
    auditedViewports: [],
  },
  {
    id: "services",
    dataSection: "services",
    label: "Services (C4)",
    auditedViewports: [],
  },
  {
    id: "process",
    dataSection: "process",
    label: "Process — 4 шага (C5)",
    auditedViewports: [],
  },
  {
    id: "gallery",
    dataSection: "gallery",
    label: "Gallery — masonry (C6)",
    auditedViewports: [],
  },
  {
    id: "reviews",
    dataSection: "reviews",
    label: "Reviews (C7)",
    auditedViewports: [],
  },
  {
    id: "about",
    dataSection: "about",
    label: "About — specialist (C8)",
    auditedViewports: [],
  },
  {
    id: "faq",
    dataSection: "faq",
    label: "FAQ (C9)",
    auditedViewports: [],
  },
  {
    id: "book",
    dataSection: "book",
    label: "Booking — form + map (C10)",
    auditedViewports: [],
  },
  {
    id: "footer",
    dataSection: "footer",
    label: "Footer (C11)",
    auditedViewports: [],
  },
  {
    /* Sticky mobile CTA — CSS `display: none` at sm+ per
       components/booking.css. Spec skips its smoke check on 1440 + 768. */
    id: "sticky-mobile",
    dataSection: "sticky-mobile",
    label: "Sticky mobile CTA (C12)",
    auditedViewports: [],
    hiddenOn: ["1440", "768"],
  },
];

/** Baseline path for customer-site sections — kept separate from landing
 *  baselines so the Linux regen scripts can be invoked independently. */
export function customerBaselinePath(sectionId: string, viewport: ViewportName): string {
  return `tests/visual/baselines/customer/${sectionId}-${viewport}.png`;
}
