/**
 * `/customer-demo` — public customer-site demo page.
 *
 * Pure drop-in of canon's `CustomerSite` component, just like
 * `/admin-demo` does for `ClientAdminDemo`. Shows visitors what a
 * published customer-site looks like — the full booking-page that real
 * masters get after their submission gets approved.
 *
 * Different from `/admin-demo` in one detail: canon's `CustomerSite`
 * supports three palette schemes (cream / slate / sage), chosen at
 * publish time per-master based on their brand vibe. The page accepts a
 * `?scheme=` query param so marketing can deep-link to a specific
 * variant (e.g. for А/B-testing which one converts best from the
 * lendings) without rebuilding three separate routes.
 *
 * Why this exists as a standalone page:
 *   1. Marketing motion: visitors curious about «что мне сделает Самосайт»
 *      can see a full real-shape customer-site without anyone needing to
 *      submit a real application first.
 *   2. Zero-cost: canon ships the component, we drop it in. Same pattern
 *      as `/admin-demo` (PR #122).
 *   3. Avoids the cold-start chicken-and-egg «we have no published sites
 *      yet, so there's nothing to link to from the landing examples
 *      section» problem.
 *
 * What this page does NOT do:
 *   - No real master data — `CustomerSite` ships mock «Студия Анны»
 *     content baked into the canon component. Real customer-sites live
 *     at `<subdomain>.samosite.online` once published.
 *   - No lead-form submission — canon's `LeadForm` is read-only
 *     (input → no handler). Real published sites have a working form
 *     posting to `POST /api/leads` (see `core/leads/` Fernet encryption).
 *   - No `plan=pro` flag exposed — both planes show the same canon
 *     visual; the only difference on real sites is the «Сделано на
 *     Самосайте» footer watermark (free) vs none (pro), and canon's
 *     mock doesn't differentiate visibly.
 *
 * Spec: `docs/handoff/specs/02_customer_v2.1.md` (full booking-page
 * structure, 10 sections + sticky-header + sticky-mobile-CTA).
 */
import type { Metadata } from "next";
import { CustomerSite } from "@samosite/canon/customer";

export const metadata: Metadata = {
  title: "Демо customer-сайта · Самосайт",
  description:
    "Посмотрите, как выглядит сайт частного мастера, собранный Самосайтом: запись, отзывы, услуги, галерея — всё на одном экране.",
  // Public demo, indexable so it ranks for "сайт мастера маникюра", etc.
  robots: { index: true, follow: true },
};

/**
 * ISR — same 60s window as `/` and `/admin-demo`. Canon component is
 * static + mock-only, but the short revalidate ensures a future canon
 * refresh (regen `packages/canon/dist/` + redeploy) propagates within
 * a minute without needing a manual container restart.
 */
export const revalidate = 60;

/**
 * Type for canon's `scheme` prop. Canon ships three palettes; we
 * mirror their literal-string union here so typos in the URL fall
 * through to the safe default rather than failing the render.
 */
type CustomerScheme = "cream" | "slate" | "sage";
const VALID_SCHEMES: ReadonlyArray<CustomerScheme> = ["cream", "slate", "sage"];

/**
 * Next 16 App Router passes `searchParams` as a Promise in async
 * server components — destructure it with `await` to match the API.
 * If `?scheme=` is missing or invalid we fall back to `cream` (canon's
 * own default).
 */
export default async function CustomerDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ scheme?: string }>;
}) {
  const params = await searchParams;
  const requested = params.scheme as CustomerScheme | undefined;
  const scheme: CustomerScheme =
    requested && VALID_SCHEMES.includes(requested) ? requested : "cream";

  return <CustomerSite scheme={scheme} />;
}
