"use client";

/**
 * DashboardPendingPanel — real "ТОП-5 PENDING" list for the admin dashboard.
 *
 * WHY THIS EXISTS (canon gap: canon-gap-0903-dashboard-pending)
 * --------------------------------------------------------------
 * Canon's `S11_Dashboard` (`@samosite/canon/admin-core`) renders the
 * right-hand "QUICK · ТОП-5 PENDING" card with FIVE HARD-CODED MOCK rows
 * (`#A-1842 studia-anna · 47 постов`, `Барбершоп Самара`, …). Those rows
 * are baked into the JSX — the component exposes NO prop for them and
 * ignores the `data` prop entirely (only the 5 KPI tiles + the 14-day
 * trend chart read real `data`). So in production the founder's dashboard
 * always shows the same five fake applications, regardless of what's
 * actually pending.
 *
 * Canon is vendored (`packages/canon/src/*` is protected — never edited
 * here; changes round-trip through Claude Design). So, per the established
 * consumer-side workaround pattern (see `landing/components/SiteHeader.tsx`),
 * this component:
 *
 *   1. locates canon's pending card in the DOM (by its Mono label text),
 *   2. hides it (`display:none` — canon never sets `display` on the Card,
 *      so React's style-diff never re-writes it, mirroring SiteHeader),
 *   3. portals a pixel-faithful replacement built from canon's OWN
 *      primitives (`Card`/`Mono`/`Badge`) + `VT` tokens into the same grid
 *      slot (a `display:contents` host so the `<Card>` becomes the grid
 *      item directly — identical layout to canon's),
 *   4. feeds it real rows from `GET /admin/api/apps?status=pending&limit=5`.
 *
 * Reusing canon primitives (not hand-rolled Tailwind) keeps drift = 0 and
 * respects the "never transcribe canon JSX" rule.
 *
 * REMOVAL TRIGGER: when canon ships an interactive `S11_Dashboard` that
 * accepts a `pending` prop (or reads `data.pending_preview`), delete this
 * component and pass the rows straight through. Track in
 * `packages/canon/CHANGELOG.md` "Known gaps".
 *
 * If the canon card can't be located (e.g. canon restructured the
 * dashboard), the workaround no-ops gracefully: the mock card stays
 * visible (a dev-only console warning fires) — never crashes the page.
 */

import { Badge, Card, Mono } from "@samosite/canon/primitives";
import { VT } from "@samosite/canon/tokens";
import { type RefObject, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { AppRow } from "@/lib/admin-api";

const GAP_ID = "canon-gap-0903-dashboard-pending";
/** Exact text of canon's Mono label — our DOM anchor for the card. */
const LABEL = "ТОП-5 PENDING";
const HOST_ATTR = "data-ss-pending-real";

interface PendingPanelProps {
  /** Wrapper around `<AdminDashboard>` — scopes the DOM search. */
  rootRef: RefObject<HTMLDivElement | null>;
  items: AppRow[] | null;
  loading: boolean;
  error: string | null;
  /** "все →" — navigate to the full applications list. */
  onSeeAll: () => void;
  /** Row click — navigate to that application's detail. */
  onRowClick: (appId: string) => void;
}

export function DashboardPendingPanel({
  rootRef,
  items,
  loading,
  error,
  onSeeAll,
  onRowClick,
}: PendingPanelProps) {
  const [host, setHost] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    let hostEl: HTMLDivElement | null = null;
    let observer: MutationObserver | null = null;

    // Canon's label only — exclude the one inside our own portal host
    // (our replacement card carries the same "ТОП-5 PENDING" text).
    const findCanonLabel = () =>
      Array.from(root.querySelectorAll("span")).find(
        (el) => el.textContent?.includes(LABEL) && !el.closest(`[${HOST_ATTR}]`),
      );

    const mount = (): boolean => {
      const existing = root.querySelector<HTMLDivElement>(`[${HOST_ATTR}]`);
      if (existing) {
        hostEl = existing;
        setHost(existing);
        return true;
      }
      const label = findCanonLabel();
      const header = label?.parentElement; // flex header (label + "все →")
      const card = header?.parentElement; // canon's <Card>
      const grid = card?.parentElement; // 2-col grid (chart | pending)
      if (!label || !header || !card || !grid) return false;

      // Hide canon's mock card. `display` is absent from Card's base style
      // (see canon primitives), so React's reconciler never re-writes it.
      (card as HTMLElement).style.display = "none";

      // `display:contents` host → our <Card> becomes the grid item directly,
      // landing in the same 1fr column canon's card occupied.
      hostEl = document.createElement("div");
      hostEl.setAttribute(HOST_ATTR, "1");
      hostEl.style.display = "contents";
      grid.appendChild(hostEl);
      setHost(hostEl);
      return true;
    };

    if (!mount()) {
      // Canon DOM not ready yet (or structure changed) — watch + retry.
      observer = new MutationObserver(() => {
        if (mount()) observer?.disconnect();
      });
      observer.observe(root, { childList: true, subtree: true });
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[${GAP_ID}] pending card not located yet — observing DOM`);
      }
    }

    return () => {
      observer?.disconnect();
      if (hostEl?.parentElement) hostEl.parentElement.removeChild(hostEl);
      // Restore canon's card (defensive — usually unmounts with the page).
      const card = findCanonLabel()?.parentElement?.parentElement as HTMLElement | undefined;
      if (card) card.style.display = "";
      setHost(null);
    };
  }, [rootRef]);

  if (!host) return null;
  return createPortal(
    <PanelBody
      items={items}
      loading={loading}
      error={error}
      onSeeAll={onSeeAll}
      onRowClick={onRowClick}
    />,
    host,
  );
}

// ─────────────────────────────────────────────────────────────
// Visual — replicates canon S11_Dashboard's pending card 1:1
// (packages/canon/src/admin-core/index.tsx, the QUICK · ТОП-5 card).
// ─────────────────────────────────────────────────────────────

function PanelBody({
  items,
  loading,
  error,
  onSeeAll,
  onRowClick,
}: Omit<PendingPanelProps, "rootRef">) {
  const rows = (items ?? []).slice(0, 5);
  return (
    <Card style={{ padding: 20 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
        }}
      >
        <Mono style={{ fontSize: 10.5, letterSpacing: "0.1em" }}>QUICK · ТОП-5 PENDING</Mono>
        <button
          type="button"
          onClick={onSeeAll}
          style={{
            fontSize: 12,
            color: VT.accent,
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          все →
        </button>
      </div>

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} style={{ padding: "8px 10px", borderBottom: `1px solid ${VT.lineSoft}` }}>
              <Shimmer width="80%" height={14} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div style={{ padding: "18px 10px", textAlign: "center", color: VT.inkSoft, fontSize: 13 }}>
          Не удалось загрузить заявки
        </div>
      ) : rows.length === 0 ? (
        <div
          style={{ padding: "18px 10px", textAlign: "center", color: VT.inkFaint, fontSize: 13 }}
        >
          Нет заявок в очереди
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onRowClick(a.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: VT.r.sm,
                cursor: "pointer",
                fontSize: 13,
                borderBottom: `1px solid ${VT.lineSoft}`,
                background: "transparent",
                border: "none",
                textAlign: "left",
                fontFamily: "inherit",
                width: "100%",
              }}
            >
              <Mono style={{ fontSize: 11, width: 56 }}>{shortId(a.id)}</Mono>
              <Badge kind="neutral" style={{ padding: "2px 7px", fontSize: 10.5, borderRadius: 4 }}>
                {sourceLabel(a.source_type)}
              </Badge>
              <span
                style={{
                  flex: 1,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {appName(a)}
              </span>
              <Mono style={{ fontSize: 11 }}>{timeAgo(a.created_at)}</Mono>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}

function Shimmer({ width, height }: { width: number | string; height: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width,
        height,
        borderRadius: 4,
        background: VT.bgSoft,
        backgroundImage: `linear-gradient(90deg, ${VT.bgSoft}, ${VT.lineSoft}, ${VT.bgSoft})`,
        backgroundSize: "200% 100%",
        // vt-shimmer keyframe ships with <CanonStyles /> (app/layout.tsx).
        animation: "vt-shimmer 1.4s ease-in-out infinite",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────
// Field helpers
// ─────────────────────────────────────────────────────────────

const SOURCE_LABELS: Record<string, string> = {
  telegram: "TG",
  ymaps: "YM",
  photo: "Photo",
};

function sourceLabel(source: AppRow["source_type"]): string {
  return SOURCE_LABELS[source] ?? source;
}

function shortId(id: string): string {
  return `#${id.slice(0, 6)}`;
}

function appName(a: AppRow): string {
  if (a.mode === "photo") {
    return [a.city, a.description_preview].filter(Boolean).join(" · ") || "Фото-заявка";
  }
  const url = (a.source_url ?? "").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  return url || a.description_preview || a.city || "Заявка";
}

function timeAgo(iso: string | null): string {
  if (!iso) return "";
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return "";
  const sec = Math.max(0, Math.floor((Date.now() - t) / 1000));
  if (sec < 60) return "только что";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} мин назад`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ч назад`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} дн назад`;
  return new Date(t).toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}
