"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { useLk } from "@/components/lk/LkShell";
import { type ChangeRequest, lkApi } from "@/lib/lk-api";

const CHIPS = [
  "Добавить услугу",
  "Изменить цены",
  "Поменять фото",
  "Обновить описание",
  "Поправить контакты",
  "Другое",
];

const CR_STATUS: Record<ChangeRequest["status"], { label: string; cls: string }> = {
  new: { label: "Отправлен", cls: "bg-accent-soft text-accent-ink" },
  in_progress: { label: "В работе", cls: "bg-warn-soft text-ink" },
  done: { label: "Готово", cls: "bg-success-soft text-ink" },
};

export default function ChangesPage() {
  const { toast } = useLk();
  const [text, setText] = useState("");
  const [items, setItems] = useState<ChangeRequest[]>([]);
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);

  const load = async () => {
    const r = await lkApi.changeRequests();
    if (r.ok) setItems(r.data.items);
  };
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const r = await lkApi.changeRequests();
      if (!cancelled && r.ok) setItems(r.data.items);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async () => {
    if (text.trim().length < 5) return;
    setSending(true);
    const r = await lkApi.createChangeRequest(text.trim());
    setSending(false);
    if (!r.ok) {
      toast("Не удалось отправить — попробуйте ещё раз");
      return;
    }
    setText("");
    setSentOk(true);
    setTimeout(() => setSentOk(false), 4000);
    await load();
  };

  return (
    <div data-section="lk-changes">
      <h1 className="mb-1.5 text-[26px] font-extrabold tracking-tight">Изменения</h1>
      <p className="mb-5 text-[14px] text-ink-soft">
        Опишите, что поправить на сайте — мы внесём правки и сообщим, когда готово.
      </p>

      <div className="rounded-2xl border border-line bg-white p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setText((t) => (t ? `${t}\n${c}: ` : `${c}: `))}
              className="rounded-full border border-line px-3 py-1.5 text-[13px] text-ink-soft hover:bg-paper-soft"
            >
              {c}
            </button>
          ))}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          placeholder="Например: добавить услугу «монтаж тёплого пола», цена от 1500 ₽/м²"
          className="w-full resize-y rounded-xl border border-line bg-paper-soft px-3 py-2.5 text-[14px] outline-none focus:border-accent"
        />
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={submit}
            disabled={text.trim().length < 5 || sending}
            className="rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-accent-hover disabled:opacity-40"
          >
            {sending ? "Отправляем…" : "Отправить запрос"}
          </button>
          {sentOk && (
            <span className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-success">
              <Check className="h-4 w-4" /> Отправлено — мы уже видим ваш запрос
            </span>
          )}
        </div>
      </div>

      {items.length > 0 && (
        <div className="mt-7">
          <h2 className="mb-3 text-[15px] font-bold text-ink">Ваши запросы</h2>
          <div className="flex flex-col gap-2.5">
            {items.map((cr) => {
              const st = CR_STATUS[cr.status];
              return (
                <div key={cr.id} className="rounded-2xl border border-line bg-white p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[12px] font-semibold ${st.cls}`}
                    >
                      {st.label}
                    </span>
                    <span className="text-[12px] text-ink-faint">
                      {new Date(cr.created_at).toLocaleDateString("ru-RU", {
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap text-[14px] text-ink">{cr.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
