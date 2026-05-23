"use client";

/**
 * Site detail (canon `SiteDetail` drop-in, canon 0.2.0).
 *
 * Replaces hand-rolled Tailwind detail screen with canon's controlled
 * `S15_SiteDetail`. Visual = canon's verbatim render (header + status,
 * `<iframe sandbox>` preview pane via `previewUrl`, 6-action toolbar
 * with status-aware enable/disable matrix, `actionLoading` per action).
 * Drift = 0 from canvas.
 *
 * Per canon CHANGELOG 0.2.0:
 *   Actions = publish | republish | pause_sync | resume_sync | archive | unarchive.
 *
 * Backend coverage:
 *   - publish, republish → POST /admin/sites/{id}/publish (form-encoded
 *     Jinja route, returns 302). We post with `redirect: manual` so the
 *     opaqueredirect counts as success.
 *   - pause_sync, resume_sync, archive, unarchive → POST
 *     /admin/api/sites/{id}/{action} (JSON, see
 *     `backend/app/admin/routers/api.py::_advance_site_status`). Returns
 *     409 if the transition isn't allowed by the status matrix; canon
 *     already greys out illegal verbs, but we still surface the error
 *     via `actionError` if a race lets through a stale enable.
 *
 * Source: `packages/canon/src/admin-ops/index.tsx::S15_SiteDetail`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.6`.
 */

import { SiteDetail } from "@samosite/canon/admin-ops";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type SiteRow } from "@/lib/admin-api";

type SiteAction = "publish" | "republish" | "pause_sync" | "resume_sync" | "archive" | "unarchive";

interface SiteDetailData {
  site: SiteRow;
  leads_count: number;
}

export default function SiteDetailPage() {
  return (
    <AdminChrome>
      <SiteDetailScreen />
    </AdminChrome>
  );
}

function SiteDetailScreen() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params.id;
  const [data, setData] = useState<SiteDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<SiteAction | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<SiteDetailData>(`/sites/${id}`);
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

  const previewUrl = data
    ? data.site.custom_domain
      ? `https://${data.site.custom_domain}`
      : `https://${data.site.subdomain}.samosite.online`
    : undefined;

  async function onAction(siteId: string, action: SiteAction) {
    setActionLoading(action);
    setError(null);
    try {
      if (action === "publish" || action === "republish") {
        // Legacy Jinja endpoint: form-handler that returns a 302 redirect
        // on success. adminRequest follows JSON envelopes and would treat
        // the redirect as auth_required, so we hit fetch directly here.
        try {
          const response = await fetch(`/admin/sites/${siteId}/publish`, {
            method: "POST",
            credentials: "same-origin",
            redirect: "manual",
          });
          if (response.type === "opaqueredirect" || response.status === 302) {
            // success — fall through to refresh
          } else if (!response.ok) {
            throw new Error(`publish_failed (${response.status})`);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : "network_error");
        }
      } else {
        // JSON action endpoint: POST /admin/api/sites/{id}/{action}.
        // Returns 409 if the transition isn't allowed by the status
        // matrix (e.g. trying to pause_sync on an archived site).
        const result = await adminRequest<{
          site_id: string;
          status: string;
          action: string;
        }>(`/sites/${siteId}/${action}`, { method: "POST" });
        if (!result.ok) {
          setError(result.error);
        }
      }
      setRefreshKey((n) => n + 1);
    } finally {
      setActionLoading(null);
    }
  }

  return (
    <SiteDetail
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      previewUrl={previewUrl}
      onAction={onAction}
      onBack={() => router.push("/admin/sites")}
      actionLoading={actionLoading}
    />
  );
}
