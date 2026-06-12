/**
 * Instant-preview API client (canon 0.11.0 rev.2 consumer).
 *
 * Thin same-origin wrapper around the rev.2 backend contract frozen in
 * `docs/handoff/CANON_INSTANT_PREVIEW_REV2_TZ.md §7`:
 *
 *   GET  /api/preview/search?q=<название>&city=<город>
 *        → { ok, data: { candidates: SourceCandidate[] } }   // ≤3
 *        // 429 + Retry-After at >10 req/min/IP
 *   POST /api/preview/draft   body: { url } | { candidate_id }
 *        → { ok, data: { draft_id } }
 *   GET  /api/preview/draft/{id}
 *        → { ok, data: BuildPollResponse }                   // poll ~1.5s
 *
 * Mirrors the `lib/lk-api.ts` style: never throws — callers branch on
 * `ok`. The backend may NOT be deployed yet (graceful-degradation
 * requirement): a 404 / non-envelope response maps to `error: "network"`
 * so the canon source step shows its «Карты не отвечают» escape and the
 * draft flow falls back to failed → contact.
 */

import type { BuildPollResponse, SourceCandidate } from "@samosite/canon/intake";

export type PreviewApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: "ratelimited" | "network"; retryAfterSeconds?: number };

export type DraftRequestBody = { url: string } | { candidate_id: string };

async function request<T>(
  path: string,
  opts: { method?: "GET" | "POST"; body?: unknown } = {},
): Promise<PreviewApiResult<T>> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: opts.method ?? "GET",
      headers: opts.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      credentials: "same-origin",
    });
  } catch {
    return { ok: false, error: "network" };
  }
  if (res.status === 429) {
    const header = res.headers.get("Retry-After");
    const parsed = header === null ? Number.NaN : Number.parseInt(header, 10);
    return {
      ok: false,
      error: "ratelimited",
      retryAfterSeconds: Number.isFinite(parsed) && parsed > 0 ? parsed : undefined,
    };
  }
  let body: unknown;
  try {
    body = await res.json();
  } catch {
    return { ok: false, error: "network" };
  }
  const b = body as Record<string, unknown>;
  if (res.ok && b?.["ok"] === true && b["data"] !== undefined) {
    return { ok: true, data: b["data"] as T };
  }
  return { ok: false, error: "network" };
}

/** Search the source by business name (+ optional city) on Я.Карты. */
export async function searchSource(
  q: string,
  city: string,
): Promise<PreviewApiResult<{ candidates: SourceCandidate[] }>> {
  const params = new URLSearchParams({ q });
  if (city) params.set("city", city);
  const res = await request<{ candidates: SourceCandidate[] }>(
    `/api/preview/search?${params.toString()}`,
  );
  // Envelope shape guard — `data.candidates` must be an array. Anything
  // else (e.g. a future backend that 200s with a different payload)
  // degrades to the same network-error escape as a missing backend.
  if (res.ok && !Array.isArray(res.data.candidates)) {
    return { ok: false, error: "network" };
  }
  return res;
}

/** Kick off a draft build from a picked candidate or a pasted URL. */
export function createDraft(
  body: DraftRequestBody,
): Promise<PreviewApiResult<{ draft_id: string }>> {
  return request<{ draft_id: string }>("/api/preview/draft", { method: "POST", body });
}

/** Poll the draft build status (consumer polls ~1.5s per the rev.1 contract). */
export function pollDraft(draftId: string): Promise<PreviewApiResult<BuildPollResponse>> {
  return request<BuildPollResponse>(`/api/preview/draft/${encodeURIComponent(draftId)}`);
}
