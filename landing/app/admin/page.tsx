"use client";

/**
 * /admin landing screen — Dashboard (#11). Wraps in AdminChrome which
 * enforces the auth-gate (redirects to /admin/login when the cookie
 * is missing/expired).
 *
 * PR-F lands the chrome + a stripped-back dashboard view (counters
 * only); the full chart + apps preview lands with PR-G alongside
 * the apps screens.
 */

import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type DashboardData } from "@/lib/admin-api";

export default function AdminHomePage() {
  return (
    <AdminChrome>
      <DashboardScreen />
    </AdminChrome>
  );
}

function DashboardScreen() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<DashboardData>("/dashboard");
      if (cancelled) return;
      if (result.ok) setData(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="p-6 sm:p-10">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          ВЫ ВОШЛИ В АДМИНКУ
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Главная</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Заявки в очереди, опубликованные сайты, поступившие лиды и обратная связь — всё на одной
          странице.
        </p>
      </header>

      {error ? (
        <p className="mt-6 rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить метрики ({error}). Попробуйте обновить страницу.
        </p>
      ) : null}

      {data === null && error === null ? (
        <p className="mt-6 text-sm text-ink-faint">Считаем…</p>
      ) : null}

      {data !== null ? (
        <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Counter label="Все заявки" value={data.counters.apps_total} />
          <Counter
            label="Ждут модерации"
            value={data.counters.apps_pending}
            tone={data.counters.apps_pending > 0 ? "warn" : "default"}
          />
          <Counter label="Опубликованные сайты" value={data.counters.sites_published} />
          <Counter label="Лиды (всего)" value={data.counters.leads_total} />
          <Counter label="Feedback" value={data.counters.feedback_total} />
        </section>
      ) : null}
    </div>
  );
}

function Counter({
  label,
  value,
  tone = "default",
}: {
  label: string;
  value: number;
  tone?: "default" | "warn";
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wider text-ink-faint">{label}</p>
      <p
        className={
          "mt-2 text-3xl font-bold tracking-tight " + (tone === "warn" ? "text-warn" : "text-ink")
        }
      >
        {value.toLocaleString("ru-RU")}
      </p>
    </div>
  );
}
