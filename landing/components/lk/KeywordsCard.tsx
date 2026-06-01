"use client";

import { Copy, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

import { type KeywordGroups, lkApi } from "@/lib/lk-api";

const GROUPS: { key: keyof KeywordGroups; title: string; hint: string }[] = [
  {
    key: "main",
    title: "Главная зона — Title, H1",
    hint: "Самые важные запросы — в заголовок и Title.",
  },
  { key: "h2", title: "H2 и подзаголовки услуг", hint: "Запросы для заголовков блоков услуг." },
  {
    key: "text",
    title: "Текст страницы и описания услуг",
    hint: "Вписываются в текст естественно, не списком.",
  },
  {
    key: "blog",
    title: "Блог / статьи",
    hint: "Под отдельные информационные страницы, не на главную.",
  },
];

const EMPTY: KeywordGroups = { main: [], h2: [], text: [], blog: [] };

export function KeywordsCard({
  initial,
  minusWords,
  onSaved,
}: {
  initial: KeywordGroups;
  minusWords: string[];
  onSaved: (msg: string) => void;
}) {
  const [groups, setGroups] = useState<KeywordGroups>(initial);
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);

  const total = useMemo(
    () =>
      (Object.keys(groups) as (keyof KeywordGroups)[]).reduce((n, k) => n + groups[k].length, 0),
    [groups],
  );

  const add = (key: keyof KeywordGroups, raw: string) => {
    const words = raw
      .split(",")
      .map((w) => w.trim())
      .filter(Boolean);
    if (!words.length) return;
    setGroups((g) => {
      const existing = new Set(g[key].map((w) => w.toLowerCase()));
      const merged = [...g[key], ...words.filter((w) => !existing.has(w.toLowerCase()))];
      return { ...g, [key]: merged };
    });
  };
  const remove = (key: keyof KeywordGroups, idx: number) =>
    setGroups((g) => ({ ...g, [key]: g[key].filter((_, i) => i !== idx) }));

  const save = async () => {
    setBusy(true);
    const r = await lkApi.saveKeywords(groups);
    setBusy(false);
    if (r.ok) {
      setGroups(r.data.groups);
      onSaved("Ключевые слова сохранены — обновим тексты сайта");
    } else {
      onSaved("Не удалось сохранить");
    }
  };

  const copyMinus = async () => {
    try {
      await navigator.clipboard.writeText(minusWords.join(", "));
      onSaved("Минус-слова скопированы");
    } catch {
      onSaved("Не удалось скопировать");
    }
  };

  const showGroups = editing || total > 0;

  return (
    <section className="rounded-2xl border border-line bg-white p-5">
      <h2 className="text-[16px] font-bold text-ink">Ключевые слова</h2>
      <p className="mt-0.5 text-[13px] text-ink-soft">
        Запросы, по которым вас находят в поиске. Прописаны на сайте — здесь можно поправить.
      </p>

      {!showGroups ? (
        <div className="bg-paper-soft/40 mt-4 grid place-items-center rounded-xl border border-dashed border-line px-6 py-10 text-center">
          <p className="text-[15px] font-semibold text-ink">Ключевых слов пока нет</p>
          <p className="mt-1 max-w-sm text-[13px] text-ink-soft">
            Добавьте запросы, по которым клиенты ищут ваши услуги — мы впишем их в тексты сайта.
          </p>
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[14px] font-semibold text-white hover:bg-accent-hover"
          >
            <Plus className="h-4 w-4" /> Добавить ключевые слова
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-col gap-5">
            {GROUPS.map((g) => (
              <KeywordGroup
                key={g.key}
                title={g.title}
                hint={g.hint}
                words={groups[g.key]}
                onAdd={(raw) => add(g.key, raw)}
                onRemove={(i) => remove(g.key, i)}
              />
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="rounded-full bg-accent px-5 py-2 text-[14px] font-semibold text-white hover:bg-accent-hover disabled:opacity-40"
            >
              {busy ? "Сохраняем…" : "Сохранить"}
            </button>
            <span className="text-[13px] text-ink-faint">Слов добавлено: {total}</span>
          </div>
        </>
      )}

      {/* minus-words — read-only */}
      <div className="bg-paper-soft/40 mt-6 rounded-xl border border-line p-4">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-[14px] font-bold text-ink">Минус-слова</h3>
          <span className="rounded-full bg-paper-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
            Яндекс.Директ
          </span>
        </div>
        <p className="mb-3 text-[12.5px] text-ink-soft">
          Это не контент сайта — список для рекламной кампании в Яндекс.Директе. У каждого сайта
          свой.
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {minusWords.map((w) => (
            <span key={w} className="rounded-full bg-white px-2.5 py-1 text-[12.5px] text-ink-soft">
              {w}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={copyMinus}
          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-semibold text-ink hover:bg-paper-soft"
        >
          <Copy className="h-3.5 w-3.5" /> Скопировать список
          <span className="text-ink-faint">{minusWords.length} слов</span>
        </button>
      </div>
    </section>
  );
}

function KeywordGroup({
  title,
  hint,
  words,
  onAdd,
  onRemove,
}: {
  title: string;
  hint: string;
  words: string[];
  onAdd: (raw: string) => void;
  onRemove: (idx: number) => void;
}) {
  const [val, setVal] = useState("");
  const commit = () => {
    if (val.trim()) {
      onAdd(val);
      setVal("");
    }
  };
  return (
    <div>
      <div className="mb-1.5 flex items-baseline gap-2">
        <span className="text-[13.5px] font-semibold text-ink">{title}</span>
        <span className="text-[11px] text-ink-faint">{words.length}</span>
      </div>
      <p className="mb-2 text-[12px] text-ink-faint">{hint}</p>
      <div className="flex flex-wrap gap-1.5">
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            className="inline-flex items-center gap-1 rounded-full bg-paper-soft px-2.5 py-1 text-[12.5px] text-ink"
          >
            {w}
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="text-ink-faint hover:text-danger"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            }
          }}
          placeholder="Добавить слово (Enter или через запятую)"
          className="min-w-0 flex-1 rounded-lg border border-line bg-white px-3 py-2 text-[13.5px] outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={commit}
          className="rounded-lg border border-line px-3 py-2 text-[13px] font-semibold text-ink hover:bg-paper-soft"
        >
          Добавить
        </button>
      </div>
    </div>
  );
}

export { EMPTY as EMPTY_KEYWORDS };
