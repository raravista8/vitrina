"use client";

import { Download, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import { ContactsForm } from "@/components/lk/ContactsForm";
import { DeletedState, DeleteModal } from "@/components/lk/DeleteModal";
import { KeywordsCard } from "@/components/lk/KeywordsCard";
import { useLk } from "@/components/lk/LkShell";
import { type KeywordGroups, type SettingsData, lkApi } from "@/lib/lk-api";

export default function SettingsPage() {
  const { site, toast } = useLk();
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [keywords, setKeywords] = useState<KeywordGroups | null>(null);
  const [minus, setMinus] = useState<string[]>([]);
  const [deleted, setDeleted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    void (async () => {
      const [s, kw, mw] = await Promise.all([
        lkApi.settings(),
        lkApi.keywords(),
        lkApi.minusWords(),
      ]);
      if (s.ok) setSettings(s.data);
      if (kw.ok) setKeywords(kw.data.groups);
      if (mw.ok) setMinus(mw.data.words);
    })();
  }, []);

  if (deleted) return <DeletedState />;

  if (!settings || !keywords) {
    return (
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent" />
    );
  }

  return (
    <div data-section="lk-settings" className="flex flex-col gap-5">
      <h1 className="text-[26px] font-extrabold tracking-tight">Настройки</h1>

      <ContactsForm initial={settings.contacts} onSaved={toast} />

      <KeywordsCard initial={keywords} minusWords={minus} onSaved={toast} />

      <NotificationsBlock initial={settings.notifications} onSaved={toast} />

      <PasswordBlock onSaved={toast} />

      <SiteManagement settings={settings} onDelete={() => setShowDelete(true)} />

      {showDelete && (
        <DeleteModal
          subdomain={site.subdomain}
          onClose={() => setShowDelete(false)}
          onDeleted={() => {
            setShowDelete(false);
            setDeleted(true);
          }}
        />
      )}
    </div>
  );
}

function Toggle({
  on,
  onToggle,
  disabled = false,
}: {
  on: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-disabled={disabled}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        on ? "bg-accent" : "bg-line"
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`}
      />
    </button>
  );
}

function NotificationsBlock({
  initial,
  onSaved,
}: {
  initial: { tg: boolean; email: boolean };
  onSaved: (msg: string) => void;
}) {
  // Telegram delivery isn't wired yet (TG is blocked from the VPS — needs a
  // proxy, OPERATIONS §4), so the TG channel is shown off + disabled. Only Email
  // is live; saves always persist tg:false so the backend never routes to TG.
  const [emailOn, setEmailOn] = useState(initial.email);
  const saveEmail = async (next: boolean) => {
    setEmailOn(next);
    const r = await lkApi.saveNotifications({ tg: false, email: next });
    onSaved(r.ok ? "Уведомления сохранены" : "Не удалось сохранить");
  };
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-bold text-ink">Уведомления о заявках</h2>
      <p className="mt-0.5 text-[13px] text-ink-soft">Куда присылать новые заявки с сайта.</p>
      <div className="mt-4 flex flex-col divide-y divide-line">
        <div className="flex items-center justify-between py-3">
          <span className="flex items-center gap-2 text-[14px] text-ink-faint">
            Telegram
            <span className="rounded-full bg-paper-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
              Скоро
            </span>
          </span>
          <Toggle on={false} disabled onToggle={() => {}} />
        </div>
        <div className="flex items-center justify-between py-3">
          <span className="text-[14px] text-ink">Email</span>
          <Toggle on={emailOn} onToggle={() => saveEmail(!emailOn)} />
        </div>
      </div>
    </section>
  );
}

function PasswordBlock({ onSaved }: { onSaved: (msg: string) => void }) {
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [rep, setRep] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const ready = cur.length > 0 && next.length >= 8 && next === rep;

  const submit = async () => {
    if (!ready) return;
    setBusy(true);
    setErr(null);
    const r = await lkApi.changePassword(cur, next);
    setBusy(false);
    if (r.ok) {
      setCur("");
      setNext("");
      setRep("");
      onSaved("Пароль изменён");
    } else if (r.error === "invalid_current_password") {
      setErr("Текущий пароль неверный");
    } else if (r.error === "too_many_attempts") {
      setErr("Слишком много попыток — попробуйте позже");
    } else {
      setErr("Не удалось изменить пароль");
    }
  };

  const field = (v: string, set: (s: string) => void, ph: string) => (
    <input
      type="password"
      value={v}
      onChange={(e) => set(e.target.value)}
      placeholder={ph}
      className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-accent"
    />
  );

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="mb-4 text-[16px] font-bold text-ink">Пароль</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {field(cur, setCur, "Текущий")}
        {field(next, setNext, "Новый (≥ 8)")}
        {field(rep, setRep, "Повторите новый")}
      </div>
      {next.length > 0 && next.length < 8 && (
        <p className="mt-2 text-[12px] text-ink-faint">Минимум 8 символов</p>
      )}
      {rep.length > 0 && next !== rep && (
        <p className="mt-2 text-[12px] text-danger">Пароли не совпадают</p>
      )}
      {err && <p className="mt-2 text-[12.5px] text-danger">{err}</p>}
      <button
        type="button"
        onClick={submit}
        disabled={!ready || busy}
        className="mt-4 rounded-full bg-accent px-5 py-2 text-[14px] font-semibold text-white hover:bg-accent-hover disabled:opacity-40"
      >
        {busy ? "Сохраняем…" : "Изменить пароль"}
      </button>
    </section>
  );
}

function SiteManagement({ settings, onDelete }: { settings: SettingsData; onDelete: () => void }) {
  const pub = settings.site.published_at
    ? new Date(settings.site.published_at).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";
  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="mb-4 text-[16px] font-bold text-ink">Управление сайтом</h2>
      <dl className="grid grid-cols-2 gap-y-2.5 text-[13px]">
        <dt className="text-ink-faint">Статус</dt>
        <dd className="text-right font-medium text-success">Опубликован</dd>
        <dt className="text-ink-faint">Дата публикации</dt>
        <dd className="text-right text-ink">{pub}</dd>
      </dl>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={lkApi.archiveUrl}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[14px] font-semibold text-ink hover:bg-paper-soft"
        >
          <Download className="h-4 w-4" /> Скачать архив
        </a>
        <button
          type="button"
          onClick={onDelete}
          className="border-danger/40 hover:bg-danger/5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[14px] font-semibold text-danger"
        >
          <Trash2 className="h-4 w-4" /> Удалить сайт
        </button>
      </div>
    </section>
  );
}
