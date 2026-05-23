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
 * `onMarkInDevelopment` is exposed by canon but the backend doesn't
 * have a corresponding endpoint yet — we wire a placeholder that warns
 * to the console. Once `POST /admin/api/waitlist/{source}/mark-in-dev`
 * lands, swap in a real fetch.
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
  }, []);

  return (
    <Waitlist
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      onMarkInDevelopment={(sourceName: string) => {
        // TODO: wire to POST /admin/api/waitlist/{sourceName}/mark-in-dev once backend exposes it.
        console.warn(`[admin] markInDevelopment(${sourceName}) — backend endpoint not yet wired`);
      }}
    />
  );
}
