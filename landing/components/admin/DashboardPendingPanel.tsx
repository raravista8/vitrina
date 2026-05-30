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
import { type RefObject, useEffect } from "react";

import type { AppRow } from "@/lib/admin-api";

/** Exact text of canon's Mono label — our DOM anchor for the mock card. */
const LABEL = "ТОП-5 PENDING";
/** Marker on our real panel so the mock-search never matches our own label. */
const SELF_ATTR = "data-ss-pending-real";

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
  // Hide canon's hard-coded mock pending card (canon-gap-0903). We deliberately
  // do NOT portal a replacement into canon's grid: appending a foreign node
  // into React-managed DOM made the reconciler remove it on re-render while a
  // persistent observer re-added it — an infinite loop that froze the whole
  // admin (the bug this fixes). Instead the observer ONLY toggles `display:none`
  // on the mock card — an attribute write, never a node op, so it cannot loop
  // and isn't even seen as a (childList) mutation. The REAL list renders below
  // as an ordinary React child (`<PanelBody>`), fully React-owned.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const hideMock = () => {
      const label = Array.from(root.querySelectorAll("span")).find(
        (el) => el.textContent?.includes(LABEL) && !el.closest(`[${SELF_ATTR}]`),
      );
      const card = label?.parentElement?.parentElement as HTMLElement | undefined; // canon <Card>
      if (card && card.style.display !== "none") card.style.display = "none";
    };
    hideMock();
    // childList-only observer: setting `display` is an attribute change, so it
    // never re-triggers this callback → no loop. Re-hides if canon re-creates
    // the card (e.g. loading→loaded).
    const observer = new MutationObserver(hideMock);
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [rootRef]);

  return (
    <div data-ss-pending-real="1" style={{ marginTop: 14 }}>
      <PanelBody
        items={items}
        loading={loading}
        error={error}
        onSeeAll={onSeeAll}
        onRowClick={onRowClick}
      />
    </div>
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
  website: "Сайт",
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
