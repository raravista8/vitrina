"use client";

/**
 * Waitlist (#17). GROUP BY source_name from the `feedback` table.
 * Rows with ≥10 distinct contacts are highlighted as "ready" — per
 * FR-092 / ADR-0009 that's the threshold at which the founder
 * prioritises shipping an adapter.
 *
 * Backend: GET /admin/api/waitlist (PR-E)
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/Waitlist.tsx`.
 * The "Уведомить waitlist" mass-mail button from the canvas is
 * out of scope — backend doesn't expose `/waitlist/{source}/notify`
 * today. Add when the email-blast worker lands.
 */

import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type WaitlistRow } from "@/lib/admin-api";

interface WaitlistData {
  items: WaitlistRow[];
  threshold: number;
}

export default function AdminWaitlistPage() {
  return (
    <AdminChrome>
      <WaitlistScreen />
    </AdminChrome>
  );
}

function WaitlistScreen() {
  const [data, setData] = useState<WaitlistData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<WaitlistData>("/waitlist");
      if (cancelled) return;
      if (result.ok) setData(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="p-6 sm:p-10">
        <p className="rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить waitlist ({error}).
        </p>
      </div>
    );
  }
  if (data === null) {
    return <div className="p-6 text-sm text-ink-faint sm:p-10">Считаем…</div>;
  }

  return (
    <div className="p-6 sm:p-10">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          WAITLIST · ADR-0009
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Голоса по источникам
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Группировка по{" "}
          <code className="rounded bg-paper-soft px-1 font-mono text-xs">source_name</code>,
          уникальные контакты, первое и последнее обращение. Зелёным — источники, набравшие порог{" "}
          <b>≥ {data.threshold}</b> голосов (FR-092).
        </p>
      </header>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-paper-soft">
            <tr>
              {["Источник", "Голосов", "Первое обращение", "Последнее", "Статус"].map((h) => (
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
            {data.items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-sm text-ink-faint">
                  Пока никто не запросил источник.
                </td>
              </tr>
            ) : null}
            {data.items.map((row) => (
              <tr
                key={row.source_name}
                className={
                  row.ready ? "bg-success-soft/30 border-b border-line" : "border-b border-line"
                }
              >
                <td className="px-4 py-3.5">
                  <span className="rounded bg-paper-soft px-2 py-0.5 font-mono text-[11px] text-ink-soft">
                    {row.source_name}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span
                    className={"text-2xl font-bold " + (row.ready ? "text-success" : "text-ink")}
                  >
                    {row.votes.toLocaleString("ru-RU")}
                  </span>
                  {row.ready ? (
                    <span className="ml-3 rounded-full bg-success-soft px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-success">
                      ≥ {data.threshold} · пора
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-3.5 font-mono text-[12px] text-ink-faint">
                  {formatDate(row.first_seen)}
                </td>
                <td className="px-4 py-3.5 font-mono text-[12px] text-ink-faint">
                  {formatDate(row.last_seen)}
                </td>
                <td className="px-4 py-3.5 text-sm text-ink-soft">
                  {row.ready ? "ready" : "below threshold"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit", year: "2-digit" });
}
