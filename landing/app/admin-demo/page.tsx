/**
 * `/admin-demo` — client admin demo page (screen #7b per
 * `docs/handoff/SCREEN_INDEX.md`).
 *
 * Pure drop-in of canon's `ClientAdminDemo` component — the full
 * 6-tab interactive ЛК mock that the design team ships. No backend,
 * no auth, just a static demo with mock data. Landing's
 * `OwnershipSection` CTA «Посмотреть демо ЛК ↗» points here (the
 * canon-source `landing-samosite.jsx::OwnershipSection` already has
 * `<a href="client-admin-demo.html">` which canon's `<CanonStyles />`
 * also hover-styles via `a[href="/admin-demo"]` rule — see
 * `packages/canon/src/CanonStyles.tsx`).
 *
 * Spec: `docs/handoff/specs/01_landing_v2.1.md §12`.
 *
 * Why this exists as a standalone page:
 *   1. Marketing motion: visitors of `/` can click «демо ЛК» and see
 *      the full personalized cockpit they'd get post-signup — proof
 *      of «вы — хозяин» (the OwnershipSection promise).
 *   2. Zero-cost: canon ships the component, we drop it in. No
 *      transcription, no API, no auth — pure visual demo with mock
 *      data baked into the canon component.
 *   3. Replaces the prototype `client-admin-demo.html` file in canon
 *      with a real Next.js route that users can deep-link to.
 *
 * What this page does NOT do:
 *   - No real API integration — canon's `ClientAdminDemo` uses static
 *     mock data only. Real ЛК would live under `/admin/*` (protected,
 *     post-login).
 *   - No auth check — public route, no login redirect.
 *   - No analytics tracking specific to the demo — Yandex Metrika
 *     covers it via the global page-view event.
 */
import type { Metadata } from "next";
import { ClientAdminDemo } from "@samosite/canon/admin-demo";

export const metadata: Metadata = {
  title: "Демо личного кабинета · Самосайт",
  description:
    "Посмотрите, как выглядит ваш личный кабинет на Самосайте: аналитика трафика, заявки, отзывы, услуги, настройки. Всё что вы получите после подключения.",
  // Public demo, indexable so it can rank for «личный кабинет Самосайт»
  // and similar long-tail. Robots default elsewhere allow indexing.
  robots: { index: true, follow: true },
};

/**
 * ISR revalidation — same 60-second window as landing root. Canon
 * component is static + mock-data only, but keeping the revalidate
 * window short means a future canon refresh (via
 * `packages/canon/dist/` regen + redeploy) propagates within a minute.
 */
export const revalidate = 60;

export default function AdminDemoPage() {
  return <ClientAdminDemo />;
}
