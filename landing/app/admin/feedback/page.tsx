"use client";

/**
 * Feedback inbox (canon `FeedbackInbox` drop-in, canon 0.2.0).
 *
 * Replaces hand-rolled list+detail split with canon's controlled
 * `S18_FeedbackInbox`. Visual = canon's verbatim render (type filter
 * chips + real `<input type="search">` + paginated list with type
 * badges + collapsed JSONB-checkboxes panel). Drift = 0 from canvas.
 *
 * Backend: GET /admin/api/feedback?type_filter=&q=&limit=&offset=
 *
 * The `onRowClick` callback receives the feedback row id; canon's
 * detail panel is part of the same component (list/detail split is
 * canon-owned). Our consumer doesn't navigate elsewhere on click —
 * canon expands the detail inline.
 *
 * Source: `packages/canon/src/admin-ops/index.tsx::S18_FeedbackInbox`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.9`.
 */

import { FeedbackInbox } from "@samosite/canon/admin-ops";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type FeedbackRow } from "@/lib/admin-api";

type FeedbackType = "source_request" | "feature_request" | "bug" | "general";
type TypeFilter = FeedbackType | "all";

const PAGE_SIZE = 50;

interface FeedbackInboxData {
  total: number;
  items: FeedbackRow[];
  limit: number;
  offset: number;
}

export default function AdminFeedbackPage() {
  return (
    <AdminChrome>
      <FeedbackInboxScreen />
    </AdminChrome>
  );
}

function FeedbackInboxScreen() {
  const [data, setData] = useState<FeedbackInboxData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<FeedbackInboxData>("/feedback", {
        query: {
          type_filter: typeFilter === "all" ? undefined : typeFilter,
          q: searchQuery || undefined,
          limit: PAGE_SIZE,
          offset,
        },
      });
      if (cancelled) return;
      setLoading(false);
      if (result.ok) setData(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, [typeFilter, searchQuery, offset]);

  return (
    <FeedbackInbox
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      typeFilter={typeFilter}
      onTypeFilterChange={(next: TypeFilter) => {
        setTypeFilter(next);
        setOffset(0);
        setLoading(true);
      }}
      searchQuery={searchQuery}
      onSearchChange={(q: string) => {
        // No debounce here — canon's `<input type="search">` emits onChange
        // per keystroke; backend `ilike` query handles short strings cheaply.
        // If we later see load spikes from this, add debounce via setTimeout.
        setSearchQuery(q);
        setOffset(0);
        setLoading(true);
      }}
      onPageChange={(nextOffset: number) => {
        setOffset(nextOffset);
        setLoading(true);
      }}
      onRowClick={(_feedbackId: string) => {
        // Canon's FeedbackInbox handles detail-pane expansion internally;
        // we don't navigate elsewhere on click. Kept as a callback in case
        // a future iteration wants per-row routing.
      }}
    />
  );
}
