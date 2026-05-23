"use client";

/**
 * Leads (canon `Leads` drop-in, canon 0.2.0).
 *
 * Replaces hand-rolled Tailwind table + bespoke decrypt-modal with
 * canon's controlled `S16_Leads`. Visual = canon's verbatim render
 * (multi-select checkboxes, audit-log warning inline, decrypt modal
 * with TOTP input). Drift = 0 from canvas.
 *
 * Critical security note (CHANGELOG 0.2.0 «Migration mines»):
 *
 *   The table now NEVER renders plaintext name / phone / message. It
 *   ONLY ever renders inside the decrypt-modal success view, after a
 *   successful POST /admin/api/leads/decrypt-bulk that the backend
 *   logs to admin_actions (SECURITY.md §A07 / §B7).
 *
 *   This is a defence-in-depth improvement over the previous hand-rolled
 *   table — the old version had `<DecryptedTable>` showing plaintext
 *   that, while gated behind the modal, was rendered into the DOM
 *   even before the user took action. Canon's model only paints
 *   plaintext after a fresh TOTP roundtrip.
 *
 * Backend contract (unchanged):
 *   GET  /admin/api/leads?site_id=&limit=&offset=
 *   POST /admin/api/leads/decrypt-bulk { lead_ids[], totp_code } → plaintext
 *
 * Source: `packages/canon/src/admin-ops/index.tsx::S16_Leads`.
 * Spec: `docs/handoff/CANON_ADMIN_INTERACTIVE_TZ.md §3.7`.
 */

import { Leads } from "@samosite/canon/admin-ops";
import { useEffect, useState } from "react";

import { AdminChrome } from "@/components/admin/AdminChrome";
import { adminRequest, type LeadDecrypted, type LeadRowMasked } from "@/lib/admin-api";

const PAGE_SIZE = 50;

interface LeadsListData {
  total: number;
  items: LeadRowMasked[];
  limit: number;
  offset: number;
}

export default function AdminLeadsPage() {
  return (
    <AdminChrome>
      <LeadsScreen />
    </AdminChrome>
  );
}

function LeadsScreen() {
  const [data, setData] = useState<LeadsListData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [siteFilter, setSiteFilter] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);

  // Selection + decrypt modal state — fully controlled, canon owns no UI state
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [decryptModalOpen, setDecryptModalOpen] = useState(false);
  const [decryptTotp, setDecryptTotp] = useState("");
  const [decryptedRows, setDecryptedRows] = useState<LeadDecrypted[] | null>(null);
  const [decryptLoading, setDecryptLoading] = useState(false);
  const [decryptError, setDecryptError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const result = await adminRequest<LeadsListData>("/leads", {
        query: {
          site_id: siteFilter ?? undefined,
          limit: PAGE_SIZE,
          offset,
        },
      });
      if (cancelled) return;
      setLoading(false);
      if (result.ok) setData(result.data);
      else setError(result.error);
    })();
    return () => {
      cancelled = true;
    };
  }, [siteFilter, offset]);

  async function onDecryptSubmit(leadIds: string[], totpCode: string) {
    setDecryptLoading(true);
    setDecryptError(null);
    const result = await adminRequest<{ leads: LeadDecrypted[]; count: number }>(
      "/leads/decrypt-bulk",
      { method: "POST", body: { lead_ids: leadIds, totp_code: totpCode } },
    );
    setDecryptLoading(false);
    if (result.ok) {
      setDecryptedRows(result.data.leads);
      setDecryptTotp("");
      return;
    }
    setDecryptError(mapDecryptError(result.error));
  }

  function onDecryptCancel() {
    setDecryptModalOpen(false);
    // Drop plaintext from memory on close — SECURITY.md §B7
    setDecryptedRows(null);
    setDecryptTotp("");
    setDecryptError(null);
  }

  function onSelectLead(leadId: string, selected: boolean) {
    setSelectedLeadIds((prev) =>
      selected ? [...prev, leadId] : prev.filter((id) => id !== leadId),
    );
  }

  return (
    <Leads
      _embed={false}
      data={data ?? undefined}
      loading={loading}
      error={error}
      siteFilter={siteFilter}
      onSiteFilterChange={(next: string | null) => {
        setSiteFilter(next);
        setOffset(0);
        setLoading(true);
      }}
      onPageChange={(nextOffset: number) => {
        setOffset(nextOffset);
        setLoading(true);
      }}
      selectedLeadIds={selectedLeadIds}
      onSelectLead={onSelectLead}
      onClearSelection={() => setSelectedLeadIds([])}
      onOpenDecryptModal={() => setDecryptModalOpen(true)}
      decryptModalOpen={decryptModalOpen}
      decryptTotp={decryptTotp}
      onDecryptTotpChange={(value: string) =>
        // Strip non-digits + cap at 6 — backend pattern \d{6}
        setDecryptTotp(value.replace(/\D/g, "").slice(0, 6))
      }
      onDecryptSubmit={onDecryptSubmit}
      onDecryptCancel={onDecryptCancel}
      decryptedRows={decryptedRows}
      decryptLoading={decryptLoading}
      decryptError={decryptError}
    />
  );
}

function mapDecryptError(code: string): string {
  if (code === "invalid_totp") return "Неверный код TOTP";
  if (code === "no_leads_found") return "Не нашли указанных лидов";
  if (code === "auth_required") return "Сессия истекла, войдите заново";
  if (code === "network_error") return "Нет связи с сервером";
  return `Не удалось расшифровать (${code})`;
}
