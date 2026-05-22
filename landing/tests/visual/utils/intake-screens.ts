/**
 * Map of intake-flow screens to visual-test (SCREEN_INDEX.md #2-9).
 *
 * Three families, each with its own host page + selector strategy:
 *
 *   1. **SourceDetectionBadge (#2)** — 9 states on the standalone
 *      `/dev/source-badge` page added in PR #112. Each state is a
 *      `[data-state="<id>"]` block; the spec picks one at a time.
 *
 *   2. **SubmitModal / PhotoDrawer (#3, #5, #6)** — overlays opened
 *      on top of the Hero page via debug hooks (window.__open_*).
 *      Selectors: `[data-modal="submit-modal"][data-step="<kind>"]`
 *      and `[data-modal="photo-drawer"]`.
 *
 *   3. **LeadForm (#8) + FeedbackForm (#9)** — full-page screens.
 *      LeadForm lives inside the customer-site Jinja fixture (already
 *      rendered for Tier 2a customer.spec.ts) — spec serves the same
 *      `__fixtures__/customer-site/` dir and scrolls to `#book`.
 *      FeedbackForm is the `/feedback` Next.js route.
 *
 * Tier 2b-2 lands all entries as `auditedViewports: []` (smoke-only).
 * The pixel-diff path activates in a follow-up after canon JSX
 * (`screens-intake.jsx`) gets matching `data-state` / `data-modal`
 * attrs so the baseline generator can extract per-screen crops.
 */
import type { ViewportName } from "./sections";

export type IntakeFamily = "source-badge" | "submit-modal" | "photo-drawer" | "form-page";

export interface IntakeScreen {
  id: string;
  label: string;
  family: IntakeFamily;
  /** For family=source-badge: the `data-state` attr to screenshot.
   *  For family=submit-modal: the `data-step` value (and how to open).
   *  For family=photo-drawer: nothing (single overlay; viewport disambiguates).
   *  For family=form-page: the Next.js path (relative to BASE_URL). */
  setup:
    | { family: "source-badge"; state: string }
    | {
        family: "submit-modal";
        step: "contact" | "tg_bot" | "confirmation";
        /** Optional URL pre-fill (passed to __open_submit_modal). */
        url?: string;
      }
    | { family: "photo-drawer" }
    | { family: "form-page"; path: string; selector: string };
  /** Per-viewport pixel-audit gate (same semantics as landing-sections). */
  auditedViewports: ViewportName[];
  /** Viewports where this screen is intentionally hidden (e.g.
   *  photo-drawer-mobile != photo-drawer-desktop, sticky-mobile only on 390). */
  hiddenOn?: ViewportName[];
}

/* 8 screens covering SCREEN_INDEX.md #2-6, #8, #9 (skipping #4 TG-bot
   setup which is just step 3 of SubmitModal with channel=telegram —
   covered via submit-modal-step3-tg). */
export const INTAKE_SCREENS: IntakeScreen[] = [
  // Source-badge family — 9 states from /dev/source-badge.
  {
    id: "src-mvp-loading-tg",
    label: "SourceBadge / mvp-loading-tg",
    family: "source-badge",
    setup: { family: "source-badge", state: "mvp-loading-tg" },
    auditedViewports: [],
  },
  {
    id: "src-mvp-ready-tg",
    label: "SourceBadge / mvp-ready-tg-counts",
    family: "source-badge",
    setup: { family: "source-badge", state: "mvp-ready-tg-counts" },
    auditedViewports: [],
  },
  {
    id: "src-mvp-ready-ymaps",
    label: "SourceBadge / mvp-ready-ymaps-counts",
    family: "source-badge",
    setup: { family: "source-badge", state: "mvp-ready-ymaps-counts" },
    auditedViewports: [],
  },
  {
    id: "src-mvp-fallback",
    label: "SourceBadge / mvp-fallback-tg",
    family: "source-badge",
    setup: { family: "source-badge", state: "mvp-fallback-tg" },
    auditedViewports: [],
  },
  {
    id: "src-waitlist-instagram",
    label: "SourceBadge / waitlist-instagram",
    family: "source-badge",
    setup: { family: "source-badge", state: "waitlist-instagram" },
    auditedViewports: [],
  },
  {
    id: "src-waitlist-vkontakte",
    label: "SourceBadge / waitlist-vkontakte",
    family: "source-badge",
    setup: { family: "source-badge", state: "waitlist-vkontakte" },
    auditedViewports: [],
  },
  {
    id: "src-waitlist-twogis",
    label: "SourceBadge / waitlist-twogis",
    family: "source-badge",
    setup: { family: "source-badge", state: "waitlist-twogis" },
    auditedViewports: [],
  },
  {
    id: "src-unknown-url",
    label: "SourceBadge / unknown-url",
    family: "source-badge",
    setup: { family: "source-badge", state: "unknown-url" },
    auditedViewports: [],
  },
  {
    id: "src-not-url",
    label: "SourceBadge / not-url",
    family: "source-badge",
    setup: { family: "source-badge", state: "not-url" },
    auditedViewports: [],
  },

  // SubmitModal family — 3 steps.
  {
    id: "submit-step-contact",
    label: "SubmitModal / step 1 — contact picker",
    family: "submit-modal",
    setup: { family: "submit-modal", step: "contact", url: "https://t.me/studia_anny" },
    auditedViewports: [],
  },
  {
    id: "submit-step-tg-bot",
    label: "SubmitModal / step 2 — TG bot invite",
    family: "submit-modal",
    setup: { family: "submit-modal", step: "tg_bot", url: "https://t.me/studia_anny" },
    auditedViewports: [],
  },
  {
    id: "submit-step-confirmation",
    label: "SubmitModal / step 3 — confirmation",
    family: "submit-modal",
    setup: { family: "submit-modal", step: "confirmation" },
    auditedViewports: [],
  },

  // PhotoDrawer — single overlay; desktop = centered modal, mobile =
  // bottom-sheet, viewport disambiguates.
  {
    id: "photo-drawer",
    label: "PhotoDrawer",
    family: "photo-drawer",
    setup: { family: "photo-drawer" },
    auditedViewports: [],
  },

  // Form pages — full-screen Next.js routes (or customer-site fixture).
  {
    id: "lead-form",
    label: "LeadForm — customer site #book section",
    family: "form-page",
    setup: { family: "form-page", path: "/", selector: '[data-section="book"]' },
    auditedViewports: [],
  },
  {
    id: "feedback-form",
    label: "FeedbackForm — /feedback",
    family: "form-page",
    setup: { family: "form-page", path: "/feedback", selector: "main" },
    auditedViewports: [],
  },
];

export function intakeBaselinePath(screenId: string, viewport: ViewportName): string {
  return `tests/visual/baselines/intake/${screenId}-${viewport}.png`;
}
