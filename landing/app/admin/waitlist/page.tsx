"use client";

/**
 * Waitlist (canon `Waitlist` drop-in, canon 0.2.0).
 *
 * Replaces hand-rolled Tailwind list with canon's controlled
 * `S17_Waitlist`. Visual = canon's verbatim render (rows sorted by
 * votes desc, «≥N · ПОРА» ready badge driven by `data.threshold`,
 * visual divider between ready/below). Drift = 0 from canvas.
 *
 * Backend: GET /admin/api/waitlist (PR-E). Returns `{ items, threshold }`
 * — items are aggregated `feedback.source_name` counts with `votes`,
 * `first_seen`, `last_seen`, and a server-side `ready: bool` (true when
 * votes ≥ threshold, default 10 per FR-092 / ADR-0009).
 *
 * `onMarkInDevelopment` POSTs to
 * `/admin/api/waitlist/{source}/mark-in-development` (PR #129) which
 * soft-archives every feedback row of type='source_request' with the
 * matching `source_name` so the row disappears from the next waitlist
 * fetch. We re-fetch immediately on success so the founder sees the
 * row leave without a manual reload.
 *
 * Source: `packages/canon/src/admin-ops/index.tsx::S17_Waitlist`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.8`.
 */

import { Waitlist } from "@samosite/canon/admin-ops";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type WaitlistRow } from "@/lib/admin-api";

interface WaitlistData {
  items: WaitlistRow[];
  threshold: number;
}

export default function AdminWaitlistPage() {
  return (
    <AdminChrome>
      <WaitlistScreen />
    </AdminChrome>
  );
}

function WaitlistScreen() {
  const [data, setData] = useState<WaitlistData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<WaitlistData>("/waitlist");
      if (cancelled) return;
      setLoading(false);
      if (result.ok) setData(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  async function onMarkInDevelopment(sourceName: string) {
    // URL-encode the source name — could contain reserved chars (e.g. `+`
    // in some platform identifiers). FastAPI decodes the path arg
    // server-side. Backend returns 404 if the source has zero votes
    // (founder probably clicked a stale UI), 200 otherwise (idempotent
    // for already-marked rows).
    const encoded = encodeURIComponent(sourceName);
    const result = await adminRequest<{
      source_name: string;
      marked: number;
      idempotent: boolean;
    }>(`/waitlist/${encoded}/mark-in-development`, { method: "POST" });
    if (!result.ok) {
      // Surface to user via the canon error block — same channel as
      // the load error.
      setError(`mark_failed: ${result.error}`);
      return;
    }
    // Refetch on success — the marked rows disappear from aggregation.
    setRefreshKey((n) => n + 1);
  }

  return (
    <Waitlist
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      onMarkInDevelopment={onMarkInDevelopment}
    />
  );
}
