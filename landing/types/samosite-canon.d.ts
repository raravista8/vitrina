/**
 * Ambient module shims for `@samosite/canon` path-exports.
 *
 * The vendored canon package (`packages/canon/`) ships ESM without
 * generated `.d.ts` — DTS bundling tripped on React 19 strict types
 * (see `packages/canon/CHANGELOG.md` "loose-typed best-effort" note).
 *
 * Empty-body `declare module "X";` is the canonical pattern for
 * "implicit any module" — every named/default/namespace import resolves
 * to `any` without TS errors. Trade-off: zero IntelliSense for these
 * imports. Acceptable for canon imports since the consuming code
 * inspected the package source directly to find member names.
 *
 * If/when canon ships proper DTS in a future release, this file becomes
 * a no-op (TypeScript prefers package-side declarations over ambient
 * shims of the same module name).
 */
declare module "@samosite/canon";
declare module "@samosite/canon/landing";

/**
 * `@samosite/canon/intake` — typed shim (canon 0.11.0).
 *
 * Unlike the bodiless declarations below, this module gets explicit
 * types: the instant-preview consumer (`components/SubmitModal.tsx` +
 * `lib/preview-api.ts`) relies on the FROZEN data contracts from
 * `docs/handoff/CANON_INSTANT_PREVIEW_REV2_TZ.md` §6/§7 (`PreviewDraft`,
 * `SourceCandidate`, `BuildPollResponse`, …) and silent `any` here would
 * let the consumer drift from the backend being built against the same
 * contract. Shapes mirror `packages/canon/src/intake/{preview,rev2}.tsx`
 * 1:1 — when vendoring a new canon, re-verify against the source.
 *
 * `SubmitModal` itself stays loosely typed (`Record<string, unknown>`
 * props) — its full controlled surface is huge and canon ships no DTS;
 * the wrapper inspected the package source directly for member names.
 */
declare module "@samosite/canon/intake" {
  import type { ComponentType } from "react";

  // ── contracts (frozen, ТЗ rev.2 §6) ──────────────────────────────
  export interface NicheItem {
    id: string;
    label: string;
    synonyms: string[];
    theme_id: string;
    family_id: string;
    theme_options: string[];
  }

  export interface SourceCandidate {
    id: string;
    name: string;
    address: string;
    rating: { value: number; count: number } | null;
    photo: string | null;
  }

  export type SourceSearchError = "none" | "empty" | "network" | "ratelimited";

  export type PreviewSource = "yandex_maps" | "telegram" | "twogis" | "avito" | "website";

  export interface PreviewDraft {
    source: PreviewSource;
    name: string;
    category: string | null;
    district: string | null;
    rating: { value: number; count: number } | null;
    photos: string[];
    reviews: { author: string; text: string; rating: number }[];
    services: { title: string; price: string | null }[];
    theme_id: string;
    family_id: string;
  }

  export type BuildStage = "fetching" | "photos" | "reviews" | "styling";
  export type BuildStatus = "building" | "ready" | "failed";
  export interface BuildCounts {
    photos: number;
    reviews: number;
  }
  /** Shape of the consumer poll response (`GET /api/preview/draft/{id}` → data). */
  export interface BuildPollResponse {
    status: BuildStatus;
    stage: BuildStage;
    counts: BuildCounts;
    draft?: PreviewDraft;
  }

  // ── values consumed by the wrapper ───────────────────────────────
  export const SubmitModal: ComponentType<Record<string, unknown>>;
  export const NICHE_LIB: NicheItem[];
  export const GENERIC_THEME_OPTIONS: string[];
  export const mockSourceCandidates: SourceCandidate[];
  export function matchNiche(freeText: string): NicheItem | null;
  export function demoDraftFor(
    nicheId: string | null,
    freeText?: string,
  ): { draft: PreviewDraft; niche: NicheItem | null; nicheLabel: string };
}

/**
 * `@samosite/canon/presets` — minimal typed shim: the SubmitModal
 * wrapper only needs `getTheme(id).label` for the «СТИЛЬ» summary row.
 * Throws on unknown id (canon behaviour) — call inside try/catch.
 */
declare module "@samosite/canon/presets" {
  export function getTheme(themeId: string): {
    id: string;
    family: string;
    label: string;
    colors: Record<string, string>;
  };
}

declare module "@samosite/canon/customer";
declare module "@samosite/canon/admin-demo";
declare module "@samosite/canon/admin-core";
declare module "@samosite/canon/admin-ops";
declare module "@samosite/canon/auth";
declare module "@samosite/canon/source";
declare module "@samosite/canon/primitives";
declare module "@samosite/canon/tokens";
declare module "@samosite/canon/tailwind-preset";
