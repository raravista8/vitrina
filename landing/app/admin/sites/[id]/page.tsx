"use client";

/**
 * Site detail (#15). Renders the site row + leads count + a deep-link
 * to the public site preview.
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/SiteDetail.tsx`.
 * Republish / pause-sync / archive actions from the canvas aren't
 * wired here — backend `/admin/api/sites/{id}` exposes only the read
 * surface in PR-E; the legacy Jinja routes still own the mutation
 * verbs. Until those move to JSON, this screen is read-only.
 */

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SiteStatusPill } from "@/app/admin/sites/page";
import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type SiteRow } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

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
  const id = params.id;
  const [data, setData] = useState<SiteDetailData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<SiteDetailData>(`/sites/${id}`);
      if (cancelled) return;
      if (result.ok) setData(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <div className="p-6 sm:p-10">
        <p className="rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить сайт ({error}).
        </p>
      </div>
    );
  }
  if (data === null) {
    return <div className="p-6 text-sm text-ink-faint sm:p-10">Загружаем…</div>;
  }

  const { site, leads_count } = data;
  const publicUrl = site.custom_domain
    ? `https://${site.custom_domain}`
    : `https://${site.subdomain}.samosite.online`;

  return (
    <div className="p-6 sm:p-10">
      <p className="flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/admin/sites" className="hover:text-ink hover:underline">
          Сайты
        </Link>{" "}
        / <span className="font-mono text-ink">{site.subdomain}</span>
      </p>

      <header className="mt-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {site.subdomain}.samosite.online
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <a
              href={publicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[12px] text-accent underline"
            >
              {publicUrl} <ExternalLink className="h-3 w-3" />
            </a>
            <span>·</span>
            <SiteStatusPill status={site.status} />
          </div>
        </div>
        <Link
          href={`/admin/leads?site_id=${site.id}`}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink",
            "hover:bg-paper-soft",
          )}
        >
          Лиды сайта ({leads_count.toLocaleString("ru-RU")})
        </Link>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <Card title="Сайт">
          <Field label="Поддомен" value={site.subdomain} mono />
          <Field label="Кастомный домен" value={site.custom_domain ?? "—"} mono />
          <Field label="Источник" value={site.source_type} />
          <Field label="URL источника" value={site.source_url ?? "—"} mono />
          <Field label="Статус" value={site.status} />
        </Card>
        <Card title="Тайминги">
          <Field label="Создан" value={formatDate(site.created_at)} mono />
          <Field label="Опубликован" value={formatDate(site.published_at)} mono />
          <Field label="Last sync" value={formatDate(site.last_synced_at)} mono />
        </Card>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-card">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          ПРЕВЬЮ САЙТА
        </p>
        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-paper-soft">
          <iframe
            src={publicUrl}
            title={`Превью ${site.subdomain}`}
            className="aspect-[4/3] w-full"
            loading="lazy"
            // Customer sites set their own restrictive CSP; sandbox is
            // a defence-in-depth (we still trust our own rendering).
            sandbox="allow-same-origin allow-scripts"
          />
        </div>
      </section>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">{title}</p>
      <dl className="mt-3 space-y-2 text-sm">{children}</dl>
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-ink-soft">{label}</dt>
      <dd
        className={cn("max-w-[60%] truncate text-right text-ink", mono && "font-mono text-[12px]")}
      >
        {value}
      </dd>
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
