"use client";

/**
 * Application detail (canon `AppDetail` drop-in, canon 0.2.0-alpha.1).
 *
 * Replaces hand-rolled Tailwind detail screen with canon's controlled
 * `S13_AppDetail`. Visual = canon's verbatim render (header with
 * source/contact/status, source-snapshot panel, generated-content panel,
 * action bar with approve/reject + inline reject reason). Drift = 0
 * from canvas.
 *
 * Behaviour stays consumer-side:
 *   - GET /admin/api/apps/{id} → AppDetailData { application, user, consent }
 *   - POST /admin/api/apps/{id}/approve → refresh in place
 *   - POST /admin/api/apps/{id}/reject  → refresh in place (optional reason
 *                                          dropped on the floor — the backend
 *                                          endpoint accepts no reason today;
 *                                          add when `_advance_application`
 *                                          gets a reason parameter)
 *
 * Anti-pattern guard (CLAUDE.md): never disable actions optimistically;
 * canon's `actionLoading` flag handles spinner state but row data is
 * refreshed on success so a double-click stays safe (backend returns
 * 409 on the second attempt).
 *
 * Source: `packages/canon/src/admin-core/index.tsx::S13_AppDetail`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.4`.
 */

import { AppDetail as CanonAppDetail } from "@samosite/canon/admin-core";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type AppDetail as AppDetailEnvelope } from "@/lib/admin-api";

export default function AppDetailPage() {
  return (
    <AdminChrome>
      <AppDetailScreen />
    </AdminChrome>
  );
}

function AppDetailScreen() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [data, setData] = useState<AppDetailEnvelope | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<AppDetailEnvelope>(`/apps/${id}`);
      if (cancelled) return;
      setLoading(false);
      if (result.ok) {
        setData(result.data);
        setError(null);
      } else {
        setError(result.error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, refreshKey]);

  const onApprove = useCallback(async (appId: string) => {
    setActionLoading(true);
    setActionError(null);
    const result = await adminRequest<{ application_id: string; status: string }>(
      `/apps/${appId}/approve`,
      { method: "POST" },
    );
    setActionLoading(false);
    if (result.ok) {
      setRefreshKey((n) => n + 1);
      return;
    }
    setActionError(result.error);
  }, []);

  const onReject = useCallback(async (appId: string, _reason?: string) => {
    // Canon's `onReject` carries an optional reason from its inline form,
    // but our backend's `_advance_application` doesn't accept one yet.
    // Drop the reason silently — TODO: wire through when the endpoint
    // signature grows a `reason` field.
    setActionLoading(true);
    setActionError(null);
    const result = await adminRequest<{ application_id: string; status: string }>(
      `/apps/${appId}/reject`,
      { method: "POST" },
    );
    setActionLoading(false);
    if (result.ok) {
      setRefreshKey((n) => n + 1);
      return;
    }
    setActionError(result.error);
  }, []);

  return (
    <CanonAppDetail
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      onApprove={onApprove}
      onReject={onReject}
      onBack={() => router.push("/admin/apps")}
      actionLoading={actionLoading}
      actionError={actionError}
    />
  );
}
