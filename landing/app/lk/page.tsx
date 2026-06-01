"use client";

import { ChevronDown, Inbox, Phone, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { useLk } from "@/components/lk/LkShell";
import { StatusMenu } from "@/components/lk/StatusMenu";
import {
  LEAD_STATUS_META,
  type LeadRow,
  type LeadsData,
  type LeadStatus,
  lkApi,
} from "@/lib/lk-api";

type Filter = "all" | LeadStatus;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "new", label: "Новые" },
  { id: "in_progress", label: "В работе" },
  { id: "done", label: "Выполнены" },
];

export default function LeadsPage() {
  const { site, toast, setNewCount } = useLk();
  const [data, setData] = useState<LeadsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const r = await lkApi.leads();
      if (cancelled) return;
      if (r.ok) setData(r.data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!data) return [];
    const needle = q.trim().toLowerCase();
    return data.items.filter((l) => {
      if (filter !== "all" && l.status !== filter) return false;
      if (!needle) return true;
      return [l.name, l.phone, l.service]
        .map((x) => (x ?? "").toLowerCase())
        .some((h) => h.includes(needle));
    });
  }, [data, q, filter]);

  const counts = useMemo(() => {
    const sc = data?.status_counts;
    return {
      all: data?.items.length ?? 0,
      new: sc?.new ?? 0,
      in_progress: sc?.in_progress ?? 0,
      done: sc?.done ?? 0,
    };
  }, [data]);

  const onStatus = useCallback(
    async (id: string, status: LeadStatus) => {
      const r = await lkApi.setStatus(id, status);
      if (!r.ok) {
        toast("Не удалось изменить статус");
        return;
      }
      setData((prev) => {
        if (!prev) return prev;
        const items = prev.items.map((l) => (l.id === id ? { ...l, status } : l));
        const sc: Record<LeadStatus, number> = { new: 0, in_progress: 0, done: 0, declined: 0 };
        for (const l of items) sc[l.status] += 1;
        setNewCount(sc.new);
        return { ...prev, items, status_counts: sc, new_count: sc.new };
      });
      toast(`Статус заявки: ${LEAD_STATUS_META[status].label}`);
    },
    [toast, setNewCount],
  );

  const onNote = useCallback(async (id: string, note: string) => {
    await lkApi.setNote(id, note);
  }, []);

  const resetSearch = () => {
    setQ("");
    setFilter("all");
  };

  if (loading) {
    return (
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent" />
    );
  }

  const hasLeads = (data?.items.length ?? 0) > 0;

  return (
    <div data-section="lk-leads">
      <header className="mb-5 flex items-center gap-3">
        <h1 className="text-[26px] font-extrabold tracking-tight">Заявки</h1>
        {counts.new > 0 && (
          <span className="rounded-full bg-accent px-2.5 py-1 text-[12px] font-bold text-white">
            {counts.new} новых
          </span>
        )}
      </header>

      {!hasLeads ? (
        <EmptyNoLeads domain={site.domain} />
      ) : (
        <>
          <div className="mb-4 flex flex-col gap-3">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Поиск по имени, телефону, услуге"
                className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-9 text-[14px] outline-none focus:border-accent"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-faint hover:text-ink"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const n = counts[f.id as keyof typeof counts] ?? 0;
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={`rounded-full px-3 py-1.5 text-[13px] font-medium ${
                      active
                        ? "bg-ink text-white"
                        : "border border-line bg-white text-ink-soft hover:bg-paper-soft"
                    }`}
                  >
                    {f.label}
                    <span className={active ? "ml-1.5 opacity-70" : "ml-1.5 text-ink-faint"}>
                      {n}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyNoMatch q={q} filter={filter} onReset={resetSearch} />
          ) : (
            <div className="flex flex-col gap-2.5">
              {filtered.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  open={openId === lead.id}
                  onToggle={() => setOpenId((id) => (id === lead.id ? null : lead.id))}
                  onStatus={(s) => onStatus(lead.id, s)}
                  onNote={(n) => onNote(lead.id, n)}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
  } catch {
    return iso.slice(0, 10);
  }
}

function LeadCard({
  lead,
  open,
  onToggle,
  onStatus,
  onNote,
}: {
  lead: LeadRow;
  open: boolean;
  onToggle: () => void;
  onStatus: (s: LeadStatus) => void;
  onNote: (note: string) => void;
}) {
  const [note, setNote] = useState(lead.note ?? "");
  const phoneTel = (lead.phone ?? "").replace(/[^\d+]/g, "");

  return (
    <article className="overflow-hidden rounded-2xl border border-line bg-white">
      <button
        type="button"
        onClick={onToggle}
        className="hover:bg-paper-soft/40 flex w-full items-center gap-3 px-4 py-3.5 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-semibold text-ink">
            {lead.name || "Без имени"}
          </span>
          <span className="block truncate text-[12.5px] text-ink-faint">
            {[lead.service, lead.object_type, fmtDate(lead.created_at)].filter(Boolean).join(" · ")}
          </span>
        </span>
        <StatusMenu status={lead.status} onChange={onStatus} />
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-ink-faint transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-line px-4 py-4">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
            <Field label="Телефон">
              {lead.phone ? (
                <a href={`tel:${phoneTel}`} className="font-medium text-accent">
                  {lead.phone}
                </a>
              ) : (
                "—"
              )}
            </Field>
            <Field label="Тип объекта">{lead.object_type || "—"}</Field>
            <Field label="Услуга">{lead.service || "—"}</Field>
            <Field label="Адрес / район">{lead.address || "—"}</Field>
            <Field label="Удобное время">{lead.call_time || "—"}</Field>
            <Field label="Дата">{fmtDate(lead.created_at)}</Field>
          </dl>

          {lead.comment && (
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                Комментарий
              </p>
              <p className="mt-1 whitespace-pre-wrap text-[13.5px] text-ink">{lead.comment}</p>
            </div>
          )}

          {lead.photo_count > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
                Фото ({lead.photo_count})
              </p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: lead.photo_count }).map((_, i) => (
                  <a
                    key={i}
                    href={`/api/lk/leads/${lead.id}/photo/${i}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-16 w-16 place-items-center overflow-hidden rounded-lg border border-line bg-paper-soft"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/api/lk/leads/${lead.id}/photo/${i}`}
                      alt={`Фото ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
              Заметка (видите только вы)
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => {
                if (note !== (lead.note ?? "")) onNote(note);
              }}
              rows={2}
              placeholder="Например: перезвонить после 18:00"
              className="mt-1 w-full resize-y rounded-xl border border-line bg-paper-soft px-3 py-2 text-[13.5px] outline-none focus:border-accent"
            />
          </div>

          {lead.phone && (
            <a
              href={`tel:${phoneTel}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-[14px] font-semibold text-white hover:bg-accent-hover"
            >
              <Phone className="h-4 w-4" /> Позвонить
            </a>
          )}
        </div>
      )}
    </article>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{label}</dt>
      <dd className="mt-0.5 text-ink">{children}</dd>
    </div>
  );
}

function EmptyNoLeads({ domain }: { domain: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-line bg-white px-6 py-16 text-center">
      <Inbox className="h-10 w-10 text-ink-muted" />
      <p className="mt-4 text-[18px] font-bold text-ink">Заявок пока нет</p>
      <p className="mt-1.5 max-w-sm text-[14px] text-ink-soft">
        Когда посетитель оставит заявку на сайте — она появится здесь и придёт вам в Telegram.
      </p>
      <a
        href={`https://${domain}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 rounded-full border border-line px-5 py-2 text-[14px] font-semibold text-ink hover:bg-paper-soft"
      >
        Открыть сайт
      </a>
    </div>
  );
}

function EmptyNoMatch({ q, filter, onReset }: { q: string; filter: Filter; onReset: () => void }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-line bg-white px-6 py-14 text-center">
      <Search className="h-9 w-9 text-ink-muted" />
      <p className="mt-3 text-[16px] font-bold text-ink">Ничего не нашли</p>
      <p className="mt-1.5 text-[14px] text-ink-soft">
        {q.trim() ? `По запросу «${q.trim()}» заявок нет` : "В этом статусе заявок нет"}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 rounded-full bg-ink px-4 py-2 text-[13px] font-semibold text-white"
      >
        Сбросить поиск
      </button>
    </div>
  );
}
