"use client";

/**
 * Settings (canon `Settings` drop-in, canon 0.2.0).
 *
 * Replaces hand-rolled boolean-matrix snapshot with canon's controlled
 * `S19_Settings`. Visual = canon's verbatim render (4 sections from TZ
 * data shape: Среда / Базовые URL / Feature flags / Внешние сервисы,
 * with paired "настроен / не настроен" badges per service). Drift = 0
 * from canvas.
 *
 * Backend: GET /admin/api/settings (read-only, SECURITY.md §A02 —
 * secrets are NEVER echoed; only booleans «configured / not configured»).
 *
 * Per canon CHANGELOG 0.2.0 «Migration mines»: the previous hand-rolled
 * Health-checks / Secret-rotation / Audit-log panels are not in TZ data
 * shape and so not in canon Settings. To add them back, build them as
 * separate components and compose alongside `<Settings>`.
 *
 * Source: `packages/canon/src/admin-ops/index.tsx::S19_Settings`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.10`.
 */

import { Settings } from "@samosite/canon/admin-ops";
import { useCallback, useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type SettingsSnapshot } from "@/lib/admin-api";

export default function AdminSettingsPage() {
  return (
    <AdminChrome>
      <SettingsScreen />
    </AdminChrome>
  );
}

function SettingsScreen() {
  const [data, setData] = useState<SettingsSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const result = await adminRequest<SettingsSnapshot>("/settings");
    setLoading(false);
    if (result.ok) setData(result.data);
    else setError(result.error);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<SettingsSnapshot>("/settings");
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
    <Settings
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      onRefresh={load}
    />
  );
}
