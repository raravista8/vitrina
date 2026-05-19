"use client";

/**
 * Leads list (#16). Default view shows masked rows (IP /16 prefix only,
 * no PII fields). The "Раскрыть" button opens a TOTP-gated dialog that
 * decrypts the selected rows in one bulk request.
 *
 * Backend contract (PR-E):
 *   GET  /admin/api/leads?site_id=&limit=&offset=
 *   POST /admin/api/leads/decrypt-bulk { lead_ids[], totp_code } → plaintext
 *
 * SECURITY.md §A07 / §B7: decryption is logged per-id with admin_id +
 * lead_id + site_id (server side). The browser never persists the
 * plaintext — closing the dialog drops it from memory.
 */

import { Eye, EyeOff, Lock, ShieldCheck, Unlock } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type LeadDecrypted, type LeadRowMasked } from "@/lib/admin-api";
import { cn } from "@/lib/cn";

const PAGE_SIZE = 50;

export default function AdminLeadsPage() {
  return (
    <AdminChrome>
      <LeadsScreen />
    </AdminChrome>
  );
}

function LeadsScreen() {
  const [items, setItems] = useState<LeadRowMasked[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [decryptModalOpen, setDecryptModalOpen] = useState(false);
  const [decryptedLeads, setDecryptedLeads] = useState<LeadDecrypted[] | null>(null);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void (async () => {
      const result = await adminRequest<{
        items: LeadRowMasked[];
        total: number;
        limit: number;
        offset: number;
      }>("/leads", { query: { limit: PAGE_SIZE, offset: page * PAGE_SIZE } });
      if (cancelled) return;
      setLoading(false);
      if (result.ok) {
        setItems(result.data.items);
        setTotal(result.data.total);
      } else {
        setError(result.error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const allChecked = items.length > 0 && items.every((row) => selected.has(row.id));
  const someChecked = items.some((row) => selected.has(row.id));
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (allChecked) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((row) => row.id)));
    }
  }

  function closeDecrypt() {
    setDecryptModalOpen(false);
    setDecryptedLeads(null);
  }

  return (
    <div className="p-6 sm:p-10">
      <header className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">ЛИДЫ</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Все сайты</h1>
        </div>
        <button
          type="button"
          disabled={!someChecked}
          onClick={() => setDecryptModalOpen(true)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white",
            "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
          )}
        >
          <Unlock className="h-3.5 w-3.5" />
          Раскрыть выбранные ({selected.size})
        </button>
      </header>

      <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-info-soft px-3 py-1.5 text-sm text-info">
        <Lock className="h-3.5 w-3.5" />
        Поля name / phone / message зашифрованы (Fernet AES-128 + HMAC-SHA256). Расшифровка — по
        TOTP.
      </p>

      {error ? (
        <p className="mt-4 rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          Не удалось загрузить лиды ({error}).
        </p>
      ) : null}

      <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-paper-soft">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  aria-label="Выбрать все на странице"
                  className="focus:ring-accent/40 h-4 w-4 rounded border-line text-accent"
                />
              </th>
              {["ID", "Сайт", "Статус", "IP (mask)", "Создан"].map((h) => (
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
            {loading && items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-ink-faint">
                  Загружаем…
                </td>
              </tr>
            ) : null}
            {!loading && items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-sm text-ink-faint">
                  Пока ни одного лида.
                </td>
              </tr>
            ) : null}
            {items.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-paper-soft/40 border-b border-line last:border-b-0"
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selected.has(row.id)}
                    onChange={() => toggleOne(row.id)}
                    aria-label={`Выбрать ${row.id}`}
                    className="focus:ring-accent/40 h-4 w-4 rounded border-line text-accent"
                  />
                </td>
                <td className="px-4 py-3 font-mono text-[12px]">{row.id.slice(0, 8)}</td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {row.site_id.slice(0, 8)}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex rounded-full bg-paper-soft px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {row.ip_prefix ?? "—"}
                </td>
                <td className="px-4 py-3 font-mono text-[12px] text-ink-faint">
                  {formatDate(row.created_at)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-ink-soft">
          <span>
            {items.length > 0
              ? `${page * PAGE_SIZE + 1}–${page * PAGE_SIZE + items.length} из ${total.toLocaleString("ru-RU")}`
              : "Пусто"}
          </span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
              className="rounded-md px-2 py-1 text-ink-soft hover:bg-paper-soft disabled:opacity-40"
            >
              ←
            </button>
            <span className="font-mono text-xs text-ink-soft">
              {page + 1} / {pages}
            </span>
            <button
              type="button"
              disabled={page + 1 >= pages}
              onClick={() => setPage(page + 1)}
              className="rounded-md px-2 py-1 text-ink-soft hover:bg-paper-soft disabled:opacity-40"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
        <ShieldCheck className="h-3 w-3" />
        Каждый decrypt пишется в audit log с admin_id, lead_id, site_id.
      </p>

      {decryptModalOpen ? (
        <DecryptModal
          leadIds={Array.from(selected)}
          decrypted={decryptedLeads}
          onDecrypted={setDecryptedLeads}
          onClose={closeDecrypt}
        />
      ) : null}
    </div>
  );
}

function DecryptModal({
  leadIds,
  decrypted,
  onDecrypted,
  onClose,
}: {
  leadIds: string[];
  decrypted: LeadDecrypted[] | null;
  onDecrypted: (rows: LeadDecrypted[]) => void;
  onClose: () => void;
}) {
  const [code, setCode] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const headerText = useMemo(
    () =>
      decrypted === null
        ? `Подтвердите TOTP — расшифровать ${leadIds.length} ${pluralLead(leadIds.length)}.`
        : `Расшифровано ${decrypted.length} ${pluralLead(decrypted.length)}.`,
    [leadIds.length, decrypted],
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (code.length !== 6) return;
    setPending(true);
    setError(null);
    const result = await adminRequest<{ leads: LeadDecrypted[]; count: number }>(
      "/leads/decrypt-bulk",
      { method: "POST", body: { lead_ids: leadIds, totp_code: code } },
    );
    setPending(false);
    if (result.ok) {
      onDecrypted(result.data.leads);
      return;
    }
    setError(result.error);
  }

  return (
    <div
      className="bg-ink/60 fixed inset-0 z-50 grid place-items-center p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Подтверждение TOTP для расшифровки"
    >
      <div className="w-full max-w-2xl rounded-2xl bg-paper p-6 shadow-pop sm:p-8">
        <header className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold tracking-tight text-ink">Расшифровка</h2>
          <button
            type="button"
            aria-label="Закрыть"
            onClick={onClose}
            className="text-ink-faint hover:text-ink"
          >
            ✕
          </button>
        </header>
        <p className="mt-1 text-sm text-ink-soft">{headerText}</p>

        {decrypted === null ? (
          <form className="mt-4 space-y-3" onSubmit={submit}>
            <label className="block">
              <span className="text-xs font-medium text-ink-soft">Код из аутентификатора</span>
              <input
                type="text"
                inputMode="numeric"
                pattern="\d{6}"
                maxLength={6}
                autoFocus
                value={code}
                onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
                className="focus:ring-accent/40 mt-1 h-12 w-full rounded-md border border-line bg-white text-center font-mono text-xl tracking-[0.6em] text-ink focus:outline-none focus:ring-2"
              />
            </label>
            {error ? (
              <p className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">
                {mapDecryptError(error)}
              </p>
            ) : null}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-line bg-white px-4 py-2 text-sm font-medium text-ink-soft hover:bg-paper-soft"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={pending || code.length !== 6}
                className={cn(
                  "flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white",
                  "hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                {pending ? "…" : "Расшифровать"}
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4">
            <DecryptedTable rows={decrypted} />
            <p className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-ink-faint">
              <ShieldCheck className="h-3 w-3" />
              Записано в audit log. При закрытии диалога plaintext очищается из памяти страницы.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white"
            >
              Готово
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DecryptedTable({ rows }: { rows: LeadDecrypted[] }) {
  const [showFull, setShowFull] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <table className="w-full text-sm">
        <thead className="border-b border-line bg-paper-soft">
          <tr>
            {["ID", "Имя", "Телефон", "Сообщение", "Когда"].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left font-mono text-[10px] font-medium uppercase tracking-wider text-ink-faint"
              >
                {h}
              </th>
            ))}
            <th className="px-3 py-2 text-right">
              <button
                type="button"
                onClick={() => setShowFull((v) => !v)}
                aria-label={showFull ? "Скрыть значения" : "Показать значения"}
                className="text-ink-faint hover:text-ink"
              >
                {showFull ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-line last:border-b-0">
              <td className="px-3 py-2 font-mono text-[12px] text-ink-faint">
                {row.id.slice(0, 8)}
              </td>
              <td className="px-3 py-2 text-ink">{showFull ? (row.name ?? "—") : "•••"}</td>
              <td className="px-3 py-2 font-mono text-[12px]">
                {showFull ? (row.phone ?? "—") : "+7 ••• ••• ••••"}
              </td>
              <td className="max-w-[280px] truncate px-3 py-2 text-ink-soft">
                {showFull ? (row.message ?? "—") : "•••"}
              </td>
              <td className="px-3 py-2 font-mono text-[12px] text-ink-faint">
                {formatDate(row.created_at)}
              </td>
              <td className="px-3 py-2" />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function pluralLead(n: number): string {
  if (n % 10 === 1 && n % 100 !== 11) return "лид";
  if ([2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)) return "лида";
  return "лидов";
}

function mapDecryptError(code: string): string {
  if (code === "invalid_totp") return "Неверный код TOTP";
  if (code === "no_leads_found") return "Не нашли указанных лидов";
  if (code === "auth_required") return "Сессия истекла, войдите заново";
  if (code === "network_error") return "Нет связи с сервером";
  return `Не удалось расшифровать (${code})`;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
