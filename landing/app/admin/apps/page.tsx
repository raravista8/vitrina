"use client";

/**
 * Apps list (#12). Filter chips by status + paginated table. Each row
 * links to /admin/apps/{id} (screen #13).
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/AppsList.tsx`. The
 * canvas's free-text search field is omitted in PR-G — the backend
 * /apps endpoint doesn't take ?q yet. Wire it up in a follow-up once
 * the search becomes a real bottleneck.
 */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type AppRow } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

type StatusFilter = "all" | "pending" | "approved" | "rejected" | "fulfilled";

const PAGE_SIZE = 50;

export default function AppsListPage() {
  return (
    <AdminChrome>
      <AppsList />
    </AdminChrome>
  );
}

function AppsList() {
  const [status, setStatus] = useState<StatusFilter>("pending");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<AppRow[]>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // The setLoading(true) → fetch → setLoading(false) flip-flop is the
  // canonical "load data on prop change" pattern. The eslint rule's
  // experimental check still flags it; the setStates inside this effect
  // are intentional state advancement, not derived render-state.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const result = await adminRequest<{
        total: number;
        items: AppRow[];
        limit: number;
        offset: number;
      }>("/apps", {
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
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">ЗАЯВКИ</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Очередь модерации
        </h1>
      </header>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <FilterChip
          active={status === "all"}
          onClick={() => {
            setStatus("all");
            setPage(0);
          }}
          label="Все"
        />
        <FilterChip
          active={status === "pending"}
          onClick={() => {
            setStatus("pending");
            setPage(0);
          }}
          label="Ждут модерации"
        />
        <FilterChip
          active={status === "approved"}
          onClick={() => {
            setStatus("approved");
            setPage(0);
          }}
          label="Одобрены"
        />
        <FilterChip
          active={status === "fulfilled"}
          onClick={() => {
            setStatus("fulfilled");
            setPage(0);
          }}
          label="Выполнены"
        />
        <FilterChip
          active={status === "rejected"}
          onClick={() => {
            setStatus("rejected");
            setPage(0);
          }}
          label="Отклонены"
        />
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
              {["ID", "Создана", "Источник", "URL", "Контакт", "Статус", ""].map((h) => (
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
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-ink-faint">
                  Загружаем…
                </td>
              </tr>
            ) : null}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center text-sm text-ink-faint">
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
                  <Link href={`/admin/apps/${row.id}`} className="text-ink underline">
                    {row.id.slice(0, 8)}
                  </Link>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {formatDate(row.created_at)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-md bg-paper-soft px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                    {row.source_type}
                  </span>
                </td>
                <td className="max-w-[240px] truncate px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {row.source_url ?? "—"}
                </td>
                <td className="px-4 py-3 font-mono text-[12px]">{row.contact_value_masked}</td>
                <td className="px-4 py-3">
                  <StatusPill status={row.status} />
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

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm",
        active
          ? "border-transparent bg-accent-soft text-accent"
          : "border-line bg-white text-ink-soft hover:border-ink-faint",
      )}
    >
      {label}
    </button>
  );
}

export function StatusPill({ status }: { status: string }) {
  const { className, label } = useMemo(() => statusStyle(status), [status]);
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

function statusStyle(status: string): { className: string; label: string } {
  switch (status) {
    case "pending":
      return { className: "bg-warn-soft text-warn", label: "Ждёт модерации" };
    case "approved":
      return { className: "bg-info-soft text-info", label: "Одобрена" };
    case "rejected":
      return { className: "bg-danger-soft text-danger", label: "Отклонена" };
    case "fulfilled":
      return { className: "bg-success-soft text-success", label: "Выполнена" };
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
    hour: "2-digit",
    minute: "2-digit",
  });
}
