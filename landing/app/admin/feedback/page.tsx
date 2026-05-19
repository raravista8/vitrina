"use client";

/**
 * Feedback inbox (#18). List + detail layout. Filter chips by feedback
 * type; clicking a row opens the detail panel with the raw checkboxes
 * JSONB rendered for the founder's eye.
 *
 * Backend: GET /admin/api/feedback?type_filter=&q=
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/FeedbackInbox.tsx`.
 * The reply / archive / move-to-backlog verbs from the canvas don't
 * have backend endpoints yet — left out for now. The "ответить"
 * workflow goes via the existing TG notification dispatcher in the
 * meantime.
 */

import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type FeedbackRow } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 50;

type TypeFilter = "all" | "source_request" | "feature_request" | "bug" | "general";

const TYPE_META: Record<Exclude<TypeFilter, "all">, { label: string; className: string }> = {
  source_request: {
    label: "ИСТОЧНИК",
    className: "bg-info-soft text-info",
  },
  feature_request: {
    label: "ФИЧА",
    className: "bg-accent-soft text-accent",
  },
  bug: {
    label: "БАГ",
    className: "bg-danger-soft text-danger",
  },
  general: {
    label: "ДРУГОЕ",
    className: "bg-paper-soft text-ink-soft",
  },
};

export default function AdminFeedbackPage() {
  return (
    <AdminChrome>
      <FeedbackInbox />
    </AdminChrome>
  );
}

function FeedbackInbox() {
  const [type, setType] = useState<TypeFilter>("all");
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<FeedbackRow[]>([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<FeedbackRow | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const result = await adminRequest<{
        items: FeedbackRow[];
        total: number;
      }>("/feedback", {
        query: {
          type_filter: type === "all" ? undefined : type,
          limit: PAGE_SIZE,
          offset: page * PAGE_SIZE,
        },
      });
      if (cancelled) return;
      setLoading(false);
      if (result.ok) {
        setItems(result.data.items);
        setTotal(result.data.total);
        // Refresh detail panel to first row when filter changes.
        setSelected(result.data.items[0] ?? null);
      } else {
        setError(result.error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [type, page]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="p-6 sm:p-10">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          FEEDBACK INBOX
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Обратная связь
        </h1>
      </header>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {(
          [
            ["all", "Все"],
            ["source_request", "Источник"],
            ["feature_request", "Фича"],
            ["bug", "Баг"],
            ["general", "Другое"],
          ] as ReadonlyArray<readonly [TypeFilter, string]>
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => {
              setType(key);
              setPage(0);
            }}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm",
              type === key
                ? "border-transparent bg-accent-soft text-accent"
                : "border-line bg-white text-ink-soft hover:border-ink-faint",
            )}
          >
            {label}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить ({error}).
        </p>
      ) : null}

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.2fr_1fr]">
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-card">
          {loading && items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-faint">Загружаем…</p>
          ) : null}
          {!loading && items.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-ink-faint">
              По выбранному фильтру записей нет.
            </p>
          ) : null}
          {items.map((row) => {
            const meta =
              row.type in TYPE_META ? TYPE_META[row.type as keyof typeof TYPE_META] : null;
            const isSelected = selected?.id === row.id;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => setSelected(row)}
                className={cn(
                  "w-full border-b border-line p-4 text-left last:border-b-0",
                  isSelected ? "bg-accent-soft/40" : "hover:bg-paper-soft",
                )}
              >
                <div className="mb-1.5 flex items-center gap-2.5">
                  <span className="font-mono text-[11px] text-ink-faint">{row.id.slice(0, 8)}</span>
                  {meta ? (
                    <span
                      className={cn(
                        "rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
                        meta.className,
                      )}
                    >
                      {meta.label}
                    </span>
                  ) : null}
                  <span className="ml-auto font-mono text-[11px] text-ink-faint">
                    {formatRelative(row.created_at)}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm leading-snug text-ink-soft">
                  {row.message ?? "(без сообщения)"}
                </p>
                <p className="mt-1 font-mono text-[11px] text-ink-faint">
                  {row.email_or_contact_masked ?? "—"}
                </p>
              </button>
            );
          })}
        </div>
        {selected ? <FeedbackDetail row={selected} /> : null}
      </div>

      {total > PAGE_SIZE ? (
        <div className="mt-3 flex items-center justify-between text-sm text-ink-soft">
          <span>
            {page * PAGE_SIZE + 1}–{page * PAGE_SIZE + items.length} из{" "}
            {total.toLocaleString("ru-RU")}
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
      ) : null}
    </div>
  );
}

function FeedbackDetail({ row }: { row: FeedbackRow }) {
  const meta = row.type in TYPE_META ? TYPE_META[row.type as keyof typeof TYPE_META] : null;
  return (
    <div className="self-start rounded-2xl border border-line bg-white p-5 shadow-card">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="font-mono text-sm text-ink-soft">{row.id.slice(0, 8)}</span>
        {meta ? (
          <span
            className={cn(
              "rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider",
              meta.className,
            )}
          >
            {meta.label}
          </span>
        ) : null}
        <span className="ml-auto font-mono text-[11px] text-ink-faint">
          {formatDate(row.created_at)}
        </span>
      </div>
      <h3 className="text-lg font-bold tracking-tight text-ink">Запрос</h3>
      <p className="font-mono text-xs text-ink-faint">
        {row.email_or_contact_masked ?? "(контакт не указан)"}
      </p>
      {row.source_name ? (
        <p className="mt-2 text-sm text-ink-soft">
          Источник:{" "}
          <span className="rounded bg-paper-soft px-1.5 py-0.5 font-mono text-xs text-ink">
            {row.source_name}
          </span>
        </p>
      ) : null}
      <p className="mt-3 whitespace-pre-wrap leading-relaxed text-ink">
        {row.message ?? "(пустое сообщение)"}
      </p>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
        CHECKBOXES · JSONB
      </p>
      <pre className="mt-1 overflow-auto rounded-md border border-line bg-paper-soft p-3 font-mono text-xs leading-relaxed text-ink-soft">
        {JSON.stringify(row.checkboxes, null, 2)}
      </pre>
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

function formatRelative(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.round(diffMs / 60_000);
  if (minutes < 60) return `${minutes} мин`;
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} ч`;
  const days = Math.round(hours / 24);
  return `${days} дн`;
}
