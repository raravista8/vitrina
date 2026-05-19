"use client";

/**
 * Sites list (#14). Status filter + paginated table mirroring the
 * apps list pattern from PR-G. Each row links to /admin/sites/{id}.
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/SitesList.tsx`.
 * The canvas's counter tiles (Active / Sync paused / Archived /
 * Leads 7d) aren't exposed by the current backend; PR-I expands the
 * dashboard with them. Here we ship the table + chips only.
 */

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type SiteRow } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 50;

type StatusFilter =
  | "all"
  | "pending"
  | "parsing"
  | "generating"
  | "review"
  | "published"
  | "sync_paused"
  | "archived";

export default function SitesListPage() {
  return (
    <AdminChrome>
      <SitesList />
    </AdminChrome>
  );
}

function SitesList() {
  const [status, setStatus] = useState<StatusFilter>("published");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<SiteRow[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const result = await adminRequest<{
        total: number;
        items: SiteRow[];
        limit: number;
        offset: number;
      }>("/sites", {
        query: {
          status: status === "all" ? undefined : status,
          limit: PAGE_SIZE,
          offset: page * PAGE_SIZE,
        },
      });
      if (cancelled) return;
      setLoading(false);
      if (result.ok) {
        setItems(result.data.items);
        setTotal(result.data.total);
      } else {
        setError(result.error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [status, page]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="p-6 sm:p-10">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">САЙТЫ</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Опубликованные сайты
        </h1>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {(
          [
            ["all", "Все"],
            ["published", "Опубликованы"],
            ["pending", "В очереди"],
            ["parsing", "Парсятся"],
            ["generating", "Генерируются"],
            ["review", "На ревью"],
            ["sync_paused", "Sync paused"],
            ["archived", "Архив"],
          ] as ReadonlyArray<readonly [StatusFilter, string]>
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setStatus(key);
              setPage(0);
            }}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm",
              status === key
                ? "border-transparent bg-accent-soft text-accent"
                : "border-line bg-white text-ink-soft hover:border-ink-faint",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-6 rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить список ({error}).
        </p>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-paper-soft">
            <tr>
              {["Subdomain", "Источник", "Status", "Опубликован", "Last sync", ""].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-ink-faint"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading && items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-ink-faint">
                  Загружаем…
                </td>
              </tr>
            ) : null}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-ink-faint">
                  Пусто.
                </td>
              </tr>
            ) : null}
            {items.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-paper-soft/40 border-b border-line last:border-b-0"
              >
                <td className="px-4 py-3 font-mono text-[12px]">
                  <Link href={`/admin/sites/${row.id}`} className="text-ink underline">
                    {row.subdomain}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-md bg-paper-soft px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    {row.source_type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <SiteStatusPill status={row.status} />
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {formatDate(row.published_at)}
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {formatDate(row.last_synced_at)}
                </td>
                <td className="px-4 py-3 text-right text-ink-faint">→</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-ink-soft">
          <span>
            {items.length > 0
              ? `${page * PAGE_SIZE + 1}–${page * PAGE_SIZE + items.length} из ${total.toLocaleString("ru-RU")}`
              : "Пусто"}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="rounded-md px-2 py-1 text-ink-soft hover:bg-paper-soft disabled:opacity-40"
            >
              ←
            </button>
            <span className="font-mono text-xs text-ink-soft">
              {page + 1} / {pages}
            </span>
            <button
              type="button"
              disabled={page + 1 >= pages}
              onClick={() => setPage(page + 1)}
              className="rounded-md px-2 py-1 text-ink-soft hover:bg-paper-soft disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SiteStatusPill({ status }: { status: string }) {
  const { className, label } = styleFor(status);
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        className,
      )}
    >
      {label}
    </span>
  );
}

function styleFor(status: string): { className: string; label: string } {
  switch (status) {
    case "published":
      return { className: "bg-success-soft text-success", label: "Опубликован" };
    case "pending":
      return { className: "bg-warn-soft text-warn", label: "В очереди" };
    case "parsing":
      return { className: "bg-info-soft text-info", label: "Парсится" };
    case "generating":
      return { className: "bg-info-soft text-info", label: "Генерируется" };
    case "review":
      return { className: "bg-accent-soft text-accent", label: "Ревью" };
    case "sync_paused":
      return { className: "bg-warn-soft text-warn", label: "Sync paused" };
    case "archived":
      return { className: "bg-paper-soft text-ink-soft", label: "Архив" };
    default:
      return { className: "bg-paper-soft text-ink-soft", label: status };
  }
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
