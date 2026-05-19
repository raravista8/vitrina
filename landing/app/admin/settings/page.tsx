"use client";

/**
 * Settings (#19). Read-only snapshot of which integrations are
 * configured (booleans only — SECURITY.md §A02: secrets never echo).
 *
 * Backend: GET /admin/api/settings
 *
 * Design source: `~/Downloads/vitrina ui/code/admin/Settings.tsx`. The
 * canvas's health-check / secret-rotation / audit-log panels need
 * backend endpoints we haven't built yet (`/admin/api/health`,
 * `/admin/api/secrets`, `/admin/api/audit`). They land in a follow-up
 * PR once those routes exist; today we ship the configured-flag
 * matrix the API already exposes.
 */

import { Check, X } from "lucide-react";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type SettingsSnapshot } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

export default function AdminSettingsPage() {
  return (
    <AdminChrome>
      <SettingsScreen />
    </AdminChrome>
  );
}

function SettingsScreen() {
  const [data, setData] = useState<SettingsSnapshot | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<SettingsSnapshot>("/settings");
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
          Не удалось загрузить настройки ({error}).
        </p>
      </div>
    );
  }
  if (data === null) {
    return <div className="p-6 text-sm text-ink-faint sm:p-10">Загружаем…</div>;
  }

  return (
    <div className="p-6 sm:p-10">
      <header>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
          SETTINGS · SYSTEM
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Настройки</h1>
        <p className="mt-2 max-w-2xl text-sm text-ink-soft">
          Что включено в окружении. Сами значения секретов не показываются — только индикатор
          «настроено / не настроено» по SECURITY.md §A02.
        </p>
      </header>

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <Card title="Окружение">
          <Field label="Environment" value={data.environment} mono />
          <Field label="Log level" value={data.log_level} mono />
          <Field label="App base URL" value={data.app_base_url} mono />
          <Field label="Landing base URL" value={data.landing_base_url} mono />
          <Field label="Sites base domain" value={data.sites_base_domain} mono />
        </Card>
        <Card title="Feature flags">
          <FlagRow label="MAX-бот (FEATURE_MAX_BOT)" enabled={data.feature_max_bot} />
          <FlagRow label="Авто-синк (FEATURE_AUTO_SYNC)" enabled={data.feature_auto_sync} />
        </Card>
      </section>

      <section className="mt-3 rounded-2xl border border-line bg-white p-5 shadow-card">
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-faint">
          ИНТЕГРАЦИИ
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <FlagRow label="Yandex SmartCaptcha" enabled={data.captcha_configured} />
          <FlagRow label="Telegram-бот" enabled={data.tg_bot_configured} />
          <FlagRow label="YandexGPT" enabled={data.yandexgpt_configured} />
          <FlagRow label="ЮKassa" enabled={data.yookassa_configured} />
          <FlagRow label="Yandex Object Storage (S3)" enabled={data.s3_configured} />
          <FlagRow label="Fernet keys (лиды-шифрование)" enabled={data.fernet_keys_configured} />
        </div>
        <p className="mt-4 font-mono text-[11px] text-ink-faint">
          Все секреты читаются из env, никогда не из БД. Ротация описана в SECURITY.md §5.
        </p>
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

function FlagRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="bg-paper-soft/40 flex items-center gap-2.5 rounded-md border border-line px-3 py-2 text-sm">
      <span
        className={cn(
          "inline-flex h-5 w-5 items-center justify-center rounded-full",
          enabled ? "bg-success-soft text-success" : "bg-danger-soft text-danger",
        )}
        aria-hidden
      >
        {enabled ? (
          <Check className="h-3 w-3" strokeWidth={3} />
        ) : (
          <X className="h-3 w-3" strokeWidth={3} />
        )}
      </span>
      <span className="text-ink">{label}</span>
      <span className="ml-auto font-mono text-[11px] text-ink-faint">
        {enabled ? "настроено" : "не настроено"}
      </span>
    </div>
  );
}
