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
import { useCallback, useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type DashboardData } from "@/lib/admin-api";

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
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await adminRequest<DashboardData>("/dashboard");
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
      const result = await adminRequest<DashboardData>("/dashboard");
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
    <AdminDashboard
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      onNavigate={(section: Section) => router.push(sectionToPath(section))}
      onRefresh={load}
    />
  );
}
