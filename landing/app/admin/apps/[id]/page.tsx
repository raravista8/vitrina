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
    <>
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
      {data?.photo_details && <PhotoModePanel details={data.photo_details} />}
    </>
  );
}

function PhotoModePanel({ details }: { details: NonNullable<AppDetailEnvelope["photo_details"]> }) {
  return (
    <section
      data-section="app-detail-photo-mode"
      className="mx-auto mt-6 max-w-[1100px] rounded-2xl border border-line bg-paper-soft p-6 sm:p-8"
    >
      <h2 className="mb-5 text-[18px] font-bold tracking-tight text-ink">Заявка с фото</h2>

      {/* Public contact (rendered on the customer site CTA) */}
      <div className="mb-5 rounded-xl bg-white p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Контакт клиента на сайте
        </div>
        <div className="mt-1 flex items-baseline gap-3">
          <div className="font-mono text-[15px] text-ink">
            {details.customer_contact_value ?? "—"}
          </div>
          <div className="text-[12px] text-ink-soft">
            {details.customer_contact_type === "phone" ? "Телефон" : "Telegram"}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-5 rounded-xl bg-white p-4">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          Описание дела
        </div>
        <div className="mt-2 whitespace-pre-wrap text-[14px] leading-[1.5] text-ink">
          {details.description ?? "—"}
        </div>
        {details.city && (
          <div className="mt-3 text-[13px] text-ink-soft">
            <span className="font-semibold">Город:</span> {details.city}
          </div>
        )}
      </div>

      {/* Photos */}
      {details.photos.length > 0 && (
        <div className="mb-5">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            Фото ({details.photos.length})
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
            {details.photos.map((p) => (
              <a
                key={p.id}
                href={p.download_url}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-lg border border-line bg-white"
                title={`${p.filename} · ${formatSize(p.size_bytes)}`}
              >
                {/* Admin-only preview — signed S3 URLs change per session
                    so next/image's loader cache buys nothing; vanilla img
                    keeps the page simple. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.download_url}
                  alt={p.filename}
                  className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Text files */}
      {details.text_files.length > 0 && (
        <div>
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
            Текстовые файлы ({details.text_files.length})
          </div>
          <ul className="space-y-2">
            {details.text_files.map((f) => (
              <li
                key={f.id}
                className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span aria-hidden className="text-xl">
                    📄
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-[14px] text-ink">{f.filename}</div>
                    <div className="text-[12px] text-ink-soft">
                      {f.mime} · {formatSize(f.size_bytes)}
                    </div>
                  </div>
                </div>
                <a
                  href={f.download_url}
                  download={f.filename}
                  className="rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-white hover:bg-accent-hover"
                >
                  Скачать
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} Б`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
  return `${(bytes / 1024 / 1024).toFixed(1)} МБ`;
}
