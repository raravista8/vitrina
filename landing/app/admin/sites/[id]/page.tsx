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
 *   - publish, republish → POST /admin/sites/{id}/publish (form-encoded,
 *     Jinja route that returns a 302 with ?flash=... params)
 *   - pause_sync, resume_sync, archive, unarchive → NOT YET in backend
 *     (TODO: add corresponding routes under /admin/api/sites/{id}/...).
 *     Canon enables/disables these buttons via the status matrix; until
 *     backend lands, our onAction handler `console.warn`s and bails on
 *     these 4 verbs so the founder doesn't get a silent no-op.
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
    try {
      if (action === "publish" || action === "republish") {
        // Backend's publish endpoint is a Jinja form-handler that 302s on
        // success. We POST with `redirect: manual` so adminRequest's
        // opaqueredirect branch catches the 303 — same as auth re-routing.
        // Result envelope: any non-2xx is "not ok" — but the 302 we want
        // to follow is success. Detect it by `result.error === "auth_required"`
        // (which is what adminRequest synthesises for opaqueredirect).
        try {
          const response = await fetch(`/admin/sites/${siteId}/publish`, {
            method: "POST",
            credentials: "same-origin",
            redirect: "manual",
          });
          // 302 / opaqueredirect = success (Jinja flow). 4xx/5xx = error.
          if (response.type === "opaqueredirect" || response.status === 302) {
            // success
          } else if (!response.ok) {
            throw new Error(`publish_failed (${response.status})`);
          }
        } catch (err) {
          // Network error — surface to user via error state
          setError(err instanceof Error ? err.message : "network_error");
        }
        setRefreshKey((n) => n + 1);
        return;
      }
      // Not yet wired backend — log + return without mutating UI state.
      // Canon's status-aware matrix still disables these for the wrong
      // statuses; clicking through them on enabled statuses is a no-op
      // until the backend exposes JSON endpoints.
      console.warn(`[admin] action ${action} not yet wired to backend`);
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
