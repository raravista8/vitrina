"use client";

/**
 * Sites list (canon `SitesList` drop-in, canon 0.2.0).
 *
 * Replaces hand-rolled Tailwind table with canon's controlled
 * `S14_SitesList`. Visual = canon's verbatim render (status filter chips
 * + paginated table). Drift = 0 from design canvas.
 *
 * Data shape per `GET /admin/api/sites` envelope. Canon's `SitesListData`
 * matches our `lib/admin-api.ts::SiteRow` 1:1 except:
 *   - Our SiteRow.source_url is `string | null`, canon's is `string`. We
 *     coerce null → "" before handing data to canon (it just renders
 *     the cell empty in that case).
 *
 * Per canon CHANGELOG 0.2.0 «Migration mines»: the previous hand-rolled
 * 4-tile KPI strip (Active / Sync paused / Archived / Leads 7d) is gone
 * — KPIs live on `AdminDashboard` now, not on this list.
 *
 * Note: this file re-exports `SiteStatusPill` from canon's `StatusPill`
 * for back-compat with `app/admin/sites/[id]/page.tsx` which previously
 * imported it from here. New code should import from
 * `@samosite/canon/admin-core`.
 *
 * Source: `packages/canon/src/admin-ops/index.tsx::S14_SitesList`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.5`.
 */

import { StatusPill } from "@samosite/canon/admin-core";
import { SitesList } from "@samosite/canon/admin-ops";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type SiteRow } from "@/lib/admin-api";

// Re-export for back-compat — `app/admin/sites/[id]/page.tsx` imports
// this from here. Same alias to canon `StatusPill` covers all status values.
export const SiteStatusPill = StatusPill;

type SiteStatus = "draft" | "generating" | "pending_review" | "published" | "paused" | "archived";

type StatusFilter = SiteStatus | "all";

const PAGE_SIZE = 50;

interface SitesListData {
  total: number;
  items: SiteRow[];
  limit: number;
  offset: number;
}

export default function SitesListPage() {
  return (
    <AdminChrome>
      <SitesListScreen />
    </AdminChrome>
  );
}

function SitesListScreen() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("published");
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState<SitesListData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<SitesListData>("/sites", {
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
    <SitesList
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      statusFilter={statusFilter}
      onStatusFilterChange={(next: StatusFilter) => {
        setStatusFilter(next);
        setOffset(0);
        setLoading(true);
      }}
      onPageChange={(nextOffset: number) => {
        setOffset(nextOffset);
        setLoading(true);
      }}
      onRowClick={(siteId: string) => router.push(`/admin/sites/${siteId}`)}
    />
  );
}
