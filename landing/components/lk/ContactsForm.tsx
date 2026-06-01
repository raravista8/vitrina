"use client";

import { useMemo, useState } from "react";

import { type Contacts, lkApi } from "@/lib/lk-api";

const PHONE_RE = /^\+?[0-9()\s-]{10,18}$/;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const TG_RE = /^@?[a-z0-9_]{4,32}$/;

type Field = keyof Contacts;

const FIELDS: { key: Field; label: string; placeholder: string; optional?: boolean }[] = [
  { key: "person", label: "Контактное лицо", placeholder: "Как к вам обращаться" },
  { key: "phone", label: "Телефон", placeholder: "+7 ___ ___-__-__" },
  { key: "email", label: "Email", placeholder: "you@example.ru" },
  { key: "telegram", label: "Telegram", placeholder: "@username", optional: true },
  { key: "zone", label: "Зона выезда", placeholder: "СПб и Ленобласть" },
];

function fieldError(key: Field, v: string): string | null {
  const val = v.trim();
  if (key === "telegram") return val && !TG_RE.test(val) ? "Похоже на ошибку" : null;
  if (!val) return "Заполните поле";
  if (key === "phone" && !PHONE_RE.test(val)) return "Неверный телефон";
  if (key === "email" && !EMAIL_RE.test(val)) return "Неверный email";
  return null;
}

export function ContactsForm({
  initial,
  onSaved,
}: {
  initial: Contacts;
  onSaved: (msg: string) => void;
}) {
  const [saved, setSaved] = useState<Contacts>(initial);
  const [form, setForm] = useState<Contacts>(initial);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverFields, setServerFields] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  const dirty = useMemo(
    () => (Object.keys(form) as Field[]).some((k) => form[k] !== saved[k]),
    [form, saved],
  );
  const valid = useMemo(() => FIELDS.every((f) => fieldError(f.key, form[f.key]) === null), [form]);

  const set = (k: Field, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setServerFields((s) => s.filter((x) => x !== k));
  };

  const save = async () => {
    if (!dirty || !valid) return;
    setBusy(true);
    const r = await lkApi.saveContacts(form);
    setBusy(false);
    if (r.ok) {
      setSaved(form);
      setServerFields([]);
      onSaved("Контакты сохранены");
    } else if (r.error === "validation" && r.fields) {
      setServerFields(r.fields);
    } else {
      onSaved("Не удалось сохранить");
    }
  };

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-[16px] font-bold text-ink">Контакты</h2>
        {dirty && <span className="text-[12px] font-medium text-warn">● не сохранено</span>}
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        {FIELDS.map((f) => {
          const localErr = touched[f.key] ? fieldError(f.key, form[f.key]) : null;
          const err = localErr ?? (serverFields.includes(f.key) ? "Проверьте поле" : null);
          return (
            <label key={f.key} className={f.key === "zone" ? "sm:col-span-2" : ""}>
              <span className="mb-1 block text-[12.5px] font-medium text-ink-soft">
                {f.label}
                {f.optional && <span className="text-ink-faint"> · необязательно</span>}
              </span>
              <input
                value={form[f.key]}
                onChange={(e) => set(f.key, e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, [f.key]: true }))}
                placeholder={f.placeholder}
                className={`w-full rounded-xl border bg-white px-3 py-2.5 text-[14px] outline-none ${
                  err ? "border-danger" : "border-line focus:border-accent"
                }`}
              />
              {err && <span className="mt-1 block text-[12px] text-danger">{err}</span>}
            </label>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={!dirty || !valid || busy}
          className="rounded-full bg-accent px-5 py-2 text-[14px] font-semibold text-white hover:bg-accent-hover disabled:opacity-40"
        >
          {busy ? "Сохраняем…" : "Сохранить"}
        </button>
        {dirty && (
          <button
            type="button"
            onClick={() => {
              setForm(saved);
              setTouched({});
              setServerFields([]);
            }}
            className="text-[14px] font-medium text-ink-soft hover:text-ink"
          >
            Отменить
          </button>
        )}
      </div>
    </section>
  );
}
