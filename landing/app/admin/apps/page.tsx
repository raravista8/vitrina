"use client";

/**
 * Apps list (canon `AppsList` drop-in, canon 0.2.0-alpha.1).
 *
 * Replaces hand-rolled Tailwind table with canon's controlled
 * `S12_AppsList`. Visual = canon's verbatim render (status filter chips
 * + paginated table with mono ID, masked contact, pill status, hover
 * affordance). Drift = 0 from canvas.
 *
 * Data shape matches `GET /admin/api/apps` envelope 1:1 (see
 * `backend/app/admin/routers/api.py::admin_api_apps_list`):
 *   - { total, items: ApplicationRow[], limit, offset }
 *
 * Status filter values: 'all' | 'pending' | 'approved' | 'rejected'.
 * The previous hand-rolled UI also had a 'fulfilled' chip — dropped
 * because the canon enum doesn't include it and backend never returns
 * that status anyway (verified against `_advance_application` which
 * only writes 'approved' / 'rejected').
 *
 * Note: this file re-exports `StatusPill` from canon for back-compat
 * with `app/admin/apps/[id]/page.tsx` which previously imported it
 * from here. New code should import directly from
 * `@samosite/canon/admin-core`.
 *
 * Source: `packages/canon/src/admin-core/index.tsx::S12_AppsList`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.3`.
 */

import { AppsList, StatusPill } from "@samosite/canon/admin-core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type AppRow } from "@/lib/admin-api";

// Re-export for back-compat — `app/admin/apps/[id]/page.tsx` and
// `app/admin/sites/[id]/page.tsx` import from this module's path.
export { StatusPill };

type StatusFilter = "all" | "pending" | "approved" | "rejected";

const PAGE_SIZE = 50;

interface AppsListData {
  total: number;
  items: AppRow[];
  limit: number;
  offset: number;
}

export default function AppsListPage() {
  return (
    <AdminChrome>
      <AppsListScreen />
    </AdminChrome>
  );
}

function AppsListScreen() {
  const router = useRouter();
  // Default to «Все» so the moderation queue opens showing every application
  // (pending + approved + rejected), not just pending.
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<AppsListData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (currentStatus: StatusFilter, currentOffset: number) => {
    setLoading(true);
    setError(null);
    const result = await adminRequest<AppsListData>("/apps", {
      query: {
        status: currentStatus === "all" ? undefined : currentStatus,
        limit: PAGE_SIZE,
        offset: currentOffset,
      },
    });
    setLoading(false);
    if (result.ok) {
      setData(result.data);
    } else {
      setError(result.error);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<AppsListData>("/apps", {
        query: {
          status: statusFilter === "all" ? undefined : statusFilter,
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
  }, [statusFilter, offset]);

  return (
    <AppsList
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      statusFilter={statusFilter}
      onStatusFilterChange={(next: StatusFilter) => {
        setStatusFilter(next);
        setOffset(0);
        void load(next, 0);
      }}
      onPageChange={(nextOffset: number) => {
        setOffset(nextOffset);
        void load(statusFilter, nextOffset);
      }}
      onRowClick={(appId: string) => router.push(`/admin/apps/${appId}`)}
    />
  );
}
