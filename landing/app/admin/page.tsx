"use client";

/**
 * Admin dashboard (canon `AdminDashboard` drop-in, canon 0.2.0-alpha.1).
 *
 * Replaces hand-rolled Tailwind dashboard with canon's controlled
 * `S11_Dashboard`. Visual = canon's verbatim render (5 KPI tiles +
 * 14-day applications-per-day trend chart). Drift = 0 from canvas.
 *
 * Data shape matches `GET /admin/api/dashboard` envelope 1:1 (see
 * `backend/app/admin/routers/api.py::admin_api_dashboard`):
 *   - counters: apps_total / apps_pending / sites_published /
 *               leads_total / feedback_total
 *   - applications_series_14d: [{ day: ISO date, count }]
 *
 * `_embed={false}` is critical — without it, canon renders its own
 * `<AdminChrome>` inside, double-nesting with our `AdminChrome` wrapper.
 *
 * Source: `packages/canon/src/admin-core/index.tsx::S11_Dashboard`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.2`.
 */

import { AdminDashboard } from "@samosite/canon/admin-core";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { DashboardPendingPanel } from "@/components/admin/DashboardPendingPanel";
import { adminRequest, type AppRow, type DashboardData } from "@/lib/admin-api";

interface AppsListData {
  total: number;
  items: AppRow[];
  limit: number;
  offset: number;
}

/** Top-N pending apps shown in canon's "ТОП-5 PENDING" slot. */
const PENDING_PREVIEW_LIMIT = 5;

type Section = "dashboard" | "apps" | "sites" | "leads" | "feedback" | "waitlist" | "settings";

function sectionToPath(section: Section): string {
  return section === "dashboard" ? "/admin" : `/admin/${section}`;
}

export default function AdminHomePage() {
  return (
    <AdminChrome>
      <DashboardScreen />
    </AdminChrome>
  );
}

function DashboardScreen() {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // KPI tiles + 14-day trend (canon reads these from `data`).
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Real "ТОП-5 PENDING" rows — canon hard-codes this slot, so we fetch
  // and inject it ourselves (see DashboardPendingPanel).
  const [pending, setPending] = useState<AppRow[] | null>(null);
  const [pendingError, setPendingError] = useState<string | null>(null);
  const [pendingLoading, setPendingLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await adminRequest<DashboardData>("/dashboard");
    setLoading(false);
    if (result.ok) setData(result.data);
    else setError(result.error);
  }, []);

  const loadPending = useCallback(async () => {
    setPendingLoading(true);
    setPendingError(null);
    const result = await adminRequest<AppsListData>("/apps", {
      query: { status: "pending", limit: PENDING_PREVIEW_LIMIT, offset: 0 },
    });
    setPendingLoading(false);
    if (result.ok) setPending(result.data.items);
    else setPendingError(result.error);
  }, []);

  const refresh = useCallback(() => {
    void loadDashboard();
    void loadPending();
  }, [loadDashboard, loadPending]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [dash, apps] = await Promise.all([
        adminRequest<DashboardData>("/dashboard"),
        adminRequest<AppsListData>("/apps", {
          query: { status: "pending", limit: PENDING_PREVIEW_LIMIT, offset: 0 },
        }),
      ]);
      if (cancelled) return;
      setLoading(false);
      if (dash.ok) setData(dash.data);
      else setError(dash.error);
      setPendingLoading(false);
      if (apps.ok) setPending(apps.data.items);
      else setPendingError(apps.error);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div ref={wrapperRef} data-admin-dashboard>
      <AdminDashboard
        _embed={false}
        data={data ?? undefined}
        loading={loading}
        error={error}
        onNavigate={(section: Section) => router.push(sectionToPath(section))}
        onRefresh={refresh}
      />
      <DashboardPendingPanel
        rootRef={wrapperRef}
        items={pending}
        loading={pendingLoading}
        error={pendingError}
        onSeeAll={() => router.push("/admin/apps")}
        onRowClick={(appId: string) => router.push(`/admin/apps/${appId}`)}
      />
    </div>
  );
}
