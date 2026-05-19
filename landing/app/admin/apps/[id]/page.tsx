"use client";

/**
 * Application detail (#13). Source row + contact + consent + status
 * with two action buttons (approve / reject). The Design canvas's
 * "rework" verb is omitted in PR-G — backend currently exposes only
 * approve + reject transitions on `applications.status`. Add a rework
 * action when the parser-worker rework flow lands.
 *
 * Side effects:
 *   - Approve → POST /admin/api/apps/{id}/approve → refresh in place
 *   - Reject  → POST /admin/api/apps/{id}/reject  → refresh in place
 *
 * Anti-pattern guard (CLAUDE.md): never disable actions optimistically;
 * the row state is refreshed on success so a double-click stays safe
 * (backend returns 409 on the second attempt).
 */

import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { StatusPill } from "@/app/admin/apps/page";
import { adminRequest, type AppDetail } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

type ActionState = "idle" | "pending" | "error";

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
  const [data, setData] = useState<AppDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionState, setActionState] = useState<ActionState>("idle");
  const [actionError, setActionError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<AppDetail>(`/apps/${id}`);
      if (cancelled) return;
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

  async function act(verb: "approve" | "reject") {
    setActionState("pending");
    setActionError(null);
    const result = await adminRequest<{ application_id: string; status: string }>(
      `/apps/${id}/${verb}`,
      { method: "POST" },
    );
    if (result.ok) {
      setActionState("idle");
      setRefreshKey((n) => n + 1);
      return;
    }
    setActionState("error");
    setActionError(result.error);
  }

  if (error) {
    return (
      <div className="p-6 sm:p-10">
        <p className="rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить заявку ({error}).{" "}
          <button type="button" onClick={() => router.refresh()} className="underline">
            Обновить
          </button>
        </p>
      </div>
    );
  }
  if (data === null) {
    return <div className="p-6 text-sm text-ink-faint sm:p-10">Загружаем…</div>;
  }

  const app = data.application;
  const pendingApprove = app.status === "pending";

  return (
    <div className="p-6 sm:p-10">
      <p className="flex items-center gap-2 text-sm text-ink-soft">
        <Link href="/admin/apps" className="hover:text-ink hover:underline">
          Заявки
        </Link>{" "}
        / <span className="font-mono text-ink">{app.id.slice(0, 8)}</span>
      </p>

      <header className="mt-3 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Заявка от {formatDate(app.created_at)}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
            <span className="font-mono text-[12px]">{app.source_url ?? "(без URL)"}</span>
            <span>·</span>
            <span className="font-mono text-[12px]">{app.contact_value_masked}</span>
            <span>·</span>
            <StatusPill status={app.status} />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={!pendingApprove || actionState === "pending"}
            onClick={() => act("reject")}
            className={cn(
              "border-danger/40 inline-flex items-center gap-1.5 rounded-lg border bg-white px-4 py-2 text-sm font-medium text-danger",
              "hover:bg-danger-soft disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            Отклонить
          </button>
          <button
            type="button"
            disabled={!pendingApprove || actionState === "pending"}
            onClick={() => act("approve")}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white",
              "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {actionState === "pending" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Одобрить <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </header>

      {actionError ? (
        <p className="mt-4 rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Действие не прошло ({actionError}). Возможно, заявка уже модерирована.
        </p>
      ) : null}

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <Card title="Источник">
          <Field label="Тип" value={app.source_type} mono />
          <Field label="URL" value={app.source_url ?? "(без URL)"} mono />
          <Field label="Ручная модерация" value={app.is_manual_review ? "да" : "нет"} />
          <Field label="Создана" value={formatDate(app.created_at)} mono />
        </Card>
        <Card title="Контакт">
          <Field label="Тип" value={app.contact_type} />
          <Field label="Значение (mask)" value={app.contact_value_masked} mono />
          {data.user ? (
            <>
              <Field label="Тариф" value={data.user.plan} />
              <Field
                label="Тариф до"
                value={data.user.plan_until ? formatDate(data.user.plan_until) : "—"}
              />
            </>
          ) : null}
        </Card>
      </section>

      {data.consent ? (
        <section className="mt-3">
          <Card title="Согласие на ПДн">
            <Field label="Версия политики" value={String(data.consent.policy_version)} mono />
            <Field label="Подписано" value={formatDate(data.consent.created_at)} mono />
          </Card>
        </section>
      ) : null}
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
