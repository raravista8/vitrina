"use client";

import { Download } from "lucide-react";
import { useState } from "react";

import { lkApi } from "@/lib/lk-api";

const CONFIRM_WORD = "удалить";

/** Delete confirmation (spec 02 §6.6): user types «удалить»; on the wire we
 * send the subdomain (the backend's typed-confirm guard from LK4), so the user
 * never has to know it. On success → full-screen DeletedState tombstone. */
export function DeleteModal({
  subdomain,
  onClose,
  onDeleted,
}: {
  subdomain: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  const [word, setWord] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const armed = word.trim().toLowerCase() === CONFIRM_WORD;

  const confirm = async () => {
    if (!armed) return;
    setBusy(true);
    setErr(null);
    const r = await lkApi.deleteSite(subdomain);
    setBusy(false);
    if (r.ok) onDeleted();
    else setErr("Не удалось удалить — попробуйте ещё раз");
  };

  return (
    <div className="bg-ink/40 fixed inset-0 z-50 grid place-items-center p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl border border-line bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[18px] font-bold text-danger">Удалить сайт?</h2>
        <p className="mt-2 text-[14px] text-ink-soft">
          Сайт сразу перестанет открываться. Архив (HTML + фото) будет доступен ещё{" "}
          <b className="text-ink">10 дней</b>, потом — окончательное удаление без возможности
          восстановить.
        </p>
        <p className="mt-4 text-[13px] text-ink-soft">
          Чтобы подтвердить, введите слово <b className="text-ink">удалить</b>:
        </p>
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="удалить"
          className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-2.5 text-[14px] outline-none focus:border-danger"
        />
        {err && <p className="mt-2 text-[12.5px] text-danger">{err}</p>}
        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-[14px] font-medium text-ink-soft hover:text-ink"
          >
            Отмена
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={!armed || busy}
            className="rounded-full bg-danger px-5 py-2 text-[14px] font-semibold text-white disabled:opacity-40"
          >
            {busy ? "Удаляем…" : "Удалить навсегда"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeletedState() {
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-paper p-6 text-center">
      <div className="max-w-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-paper-soft text-[28px]">
          🗑
        </div>
        <h1 className="mt-4 text-[22px] font-extrabold text-ink">Сайт удалён</h1>
        <p className="mt-2 text-[14px] text-ink-soft">
          Сайт больше не открывается. Архив доступен ещё <b className="text-ink">10 дней</b> — потом
          данные удаляются окончательно.
        </p>
        <a
          href={lkApi.archiveUrl}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[14px] font-semibold text-white hover:bg-accent-hover"
        >
          <Download className="h-4 w-4" /> Скачать архив
        </a>
      </div>
    </div>
  );
}
