"use client";

// src/admin-ops/index.tsx
import React2, { useState as useState2, useMemo } from "react";

// src/tokens.ts
var VT = {
  // Surfaces
  bg: "oklch(0.972 0.012 80)",
  bgSoft: "oklch(0.945 0.014 75)",
  white: "#ffffff",
  // Ink
  ink: "oklch(0.215 0.018 60)",
  inkSoft: "oklch(0.42 0.020 60)",
  inkFaint: "oklch(0.56 0.020 60)",
  inkMuted: "oklch(0.68 0.016 60)",
  // Lines
  line: "oklch(0.88 0.012 70)",
  lineSoft: "oklch(0.93 0.010 70)",
  // Accent — terracotta
  accent: "oklch(0.605 0.155 35)",
  accentHover: "oklch(0.54 0.16 35)",
  accentSoft: "oklch(0.92 0.045 40)",
  accentInk: "oklch(0.42 0.14 35)",
  // Semantic
  success: "oklch(0.58 0.13 145)",
  successSoft: "oklch(0.93 0.05 145)",
  info: "oklch(0.62 0.10 240)",
  infoSoft: "oklch(0.93 0.035 240)",
  warn: "oklch(0.66 0.14 70)",
  warnSoft: "oklch(0.94 0.06 80)",
  danger: "oklch(0.55 0.18 28)",
  dangerSoft: "oklch(0.93 0.055 28)",
  r: { sm: 6, md: 10, lg: 14, xl: 18, pill: 999 },
  shadow: {
    card: "0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)",
    pop: "0 18px 40px -16px rgba(120,60,30,0.25)"
  },
  font: {
    sans: "Onest, system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace"
  }
};
var tokens = {
  color: {
    accent: VT.accent,
    accentSoft: VT.accentSoft,
    accentInk: VT.accentInk,
    accentHover: VT.accentHover,
    ink: VT.ink,
    inkSoft: VT.inkSoft,
    inkFaint: VT.inkFaint,
    inkMuted: VT.inkMuted,
    line: VT.line,
    lineSoft: VT.lineSoft,
    bg: VT.bg,
    bgSoft: VT.bgSoft,
    white: VT.white,
    success: VT.success,
    successSoft: VT.successSoft,
    info: VT.info,
    infoSoft: VT.infoSoft,
    warn: VT.warn,
    warnSoft: VT.warnSoft,
    danger: VT.danger,
    dangerSoft: VT.dangerSoft
  },
  font: VT.font,
  shadow: VT.shadow,
  radius: { sm: 10, md: 14, lg: 18, xl: 22, "2xl": 28, full: 999 }
};

// src/primitives/index.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function Eyebrow({ children }) {
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontFamily: VT.font.mono,
    fontSize: 11,
    letterSpacing: "0.12em",
    color: VT.accent,
    fontWeight: 500,
    padding: "6px 12px",
    background: VT.accentSoft,
    borderRadius: VT.r.sm
  }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
    children
  ] });
}
function Mono({ children, style }) {
  return /* @__PURE__ */ jsx("span", { style: { fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, ...style }, children });
}
function Card({ children, style }) {
  return /* @__PURE__ */ jsx("div", { style: { background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.lg, ...style }, children });
}
function Btn(props) {
  const { children, variant = "primary", size = "md", style, icon, iconRight, onClick, type, disabled } = props;
  const isSm = size === "sm";
  const base = {
    fontFamily: VT.font.sans,
    fontWeight: 600,
    fontSize: isSm ? 13 : 15,
    padding: isSm ? "8px 14px" : "12px 22px",
    borderRadius: VT.r.pill,
    border: "none",
    cursor: disabled ? "default" : "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    whiteSpace: "nowrap",
    transition: "background .15s",
    opacity: disabled ? 0.5 : 1
  };
  const variants = {
    primary: { background: VT.accent, color: VT.white },
    secondary: { background: VT.white, color: VT.ink, border: `1px solid ${VT.line}` },
    ghost: { background: "transparent", color: VT.ink },
    soft: { background: VT.accentSoft, color: VT.accentInk }
  };
  return /* @__PURE__ */ jsxs("button", { type: type ?? "button", onClick, disabled, "data-ss-cta": true, style: { ...base, ...variants[variant], ...style }, children: [
    icon,
    children,
    iconRight
  ] });
}
function Badge({ kind = "success", children, style }) {
  const map = {
    success: { bg: VT.successSoft, fg: "oklch(0.32 0.11 145)", dot: VT.success },
    info: { bg: VT.infoSoft, fg: "oklch(0.38 0.10 240)", dot: VT.info },
    warn: { bg: VT.warnSoft, fg: "oklch(0.40 0.12 70)", dot: VT.warn },
    danger: { bg: VT.dangerSoft, fg: "oklch(0.42 0.15 28)", dot: VT.danger },
    neutral: { bg: VT.bgSoft, fg: VT.inkSoft, dot: VT.inkMuted },
    loading: { bg: VT.bgSoft, fg: VT.inkSoft, dot: VT.inkMuted }
  };
  const c = map[kind];
  return /* @__PURE__ */ jsx("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: VT.r.pill,
    background: c.bg,
    color: c.fg,
    fontSize: 14,
    fontWeight: 500,
    ...style
  }, children });
}
function IconArrow({ size = 18 }) {
  return /* @__PURE__ */ jsx("span", { style: { fontSize: size, lineHeight: 1 }, children: "\u2192" });
}
function Spinner({ size = 14 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style: { animation: "vt-spin 0.9s linear infinite" }, children: /* @__PURE__ */ jsx("circle", { cx: 12, cy: 12, r: 9, fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeDasharray: "40 20", strokeLinecap: "round" }) });
}

// src/admin-core/index.tsx
import React, { useState, useEffect, useCallback } from "react";
import { Fragment as Fragment3, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SkeletonBlock({ width = "100%", height = 14, radius = 4, style }) {
  return /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: {
    display: "inline-block",
    width,
    height,
    borderRadius: radius,
    background: VT.bgSoft,
    backgroundImage: `linear-gradient(90deg, ${VT.bgSoft}, ${VT.lineSoft}, ${VT.bgSoft})`,
    backgroundSize: "200% 100%",
    animation: "vt-shimmer 1.4s ease-in-out infinite",
    ...style
  } });
}
function EmptyState({ title, hint }) {
  return /* @__PURE__ */ jsxs2("div", { role: "status", style: {
    padding: "48px 24px",
    textAlign: "center",
    color: VT.inkFaint,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: { fontSize: 28, opacity: 0.6, marginBottom: 8 }, children: "\u2205" }),
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 14.5, fontWeight: 500, color: VT.inkSoft, marginBottom: 4 }, children: title }),
    hint && /* @__PURE__ */ jsx2("div", { style: { fontSize: 13 }, children: hint })
  ] });
}
function ErrorBlock({ title, message, onRetry }) {
  return /* @__PURE__ */ jsx2(Card, { role: "alert", style: {
    padding: 18,
    background: VT.dangerSoft,
    borderColor: "oklch(0.86 0.06 28)"
  }, children: /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { fontSize: 18 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, fontSize: 14, color: "oklch(0.4 0.15 28)" }, children: title || "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A" }),
      message && /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 2 }, children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsx2("button", { type: "button", onClick: onRetry, style: {
      border: "none",
      background: VT.white,
      color: VT.ink,
      padding: "6px 12px",
      borderRadius: VT.r.pill,
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: VT.font.sans
    }, children: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C" })
  ] }) });
}
var NAV = [
  ["dashboard", "Dashboard", "\u{1F4CA}"],
  ["apps", "\u0417\u0430\u044F\u0432\u043A\u0438", "\u{1F4E5}"],
  ["sites", "\u0421\u0430\u0439\u0442\u044B", "\u{1F310}"],
  ["leads", "\u041B\u0438\u0434\u044B", "\u{1F4E8}"],
  ["feedback", "Feedback", "\u{1F4AC}"],
  ["waitlist", "Waitlist", "\u23F3"],
  ["settings", "Settings", "\u2699\uFE0F"]
];
var SECTION_ALIAS = { dash: "dashboard" };
function AdminChrome({
  active = "dashboard",
  user,
  onNavigate,
  onLogout,
  badgeCounts,
  children
}) {
  const activeKey = SECTION_ALIAS[active] || active;
  const u = user || { username: "founder@samosite.online", initials: "F" };
  const badges = badgeCounts ?? { apps: 12 };
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    minHeight: "100%",
    background: VT.bgSoft,
    fontFamily: VT.font.sans,
    color: VT.ink,
    letterSpacing: "-0.005em"
  }, children: [
    /* @__PURE__ */ jsxs2("aside", { style: {
      background: VT.bg,
      borderRight: `1px solid ${VT.line}`,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 18 }, children: [
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.bg } }),
        /* @__PURE__ */ jsx2("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 6px", fontSize: 10, borderRadius: 4 }, children: "ADMIN" })
      ] }),
      /* @__PURE__ */ jsx2("nav", { "aria-label": "Admin sections", style: { display: "flex", flexDirection: "column", gap: 4 }, children: NAV.map(([key, name, icon]) => {
        const isActive = activeKey === key;
        const count = badges?.[key];
        return /* @__PURE__ */ jsxs2(
          "button",
          {
            type: "button",
            onClick: () => onNavigate && onNavigate(key),
            "aria-current": isActive ? "page" : void 0,
            style: {
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 10px",
              borderRadius: VT.r.sm,
              background: isActive ? VT.accentSoft : "transparent",
              color: isActive ? VT.accentInk : VT.ink,
              fontSize: 14,
              fontWeight: isActive ? 600 : 500,
              cursor: "pointer",
              textAlign: "left",
              border: "none",
              fontFamily: "inherit",
              width: "100%"
            },
            children: [
              /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { fontSize: 15, width: 18, display: "inline-flex" }, children: icon }),
              name,
              typeof count === "number" && count > 0 && /* @__PURE__ */ jsx2(Badge, { kind: "warn", style: { marginLeft: "auto", padding: "1px 7px", fontSize: 10, borderRadius: 999 }, children: count })
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 24, height: 24, borderRadius: "50%", background: VT.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: VT.accentInk, fontWeight: 600 }, children: u.initials }),
        /* @__PURE__ */ jsx2("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: u.username }),
        /* @__PURE__ */ jsx2(
          "button",
          {
            type: "button",
            onClick: () => onLogout && onLogout(),
            style: {
              border: "none",
              background: "transparent",
              color: VT.inkFaint,
              cursor: "pointer",
              fontSize: 12,
              fontFamily: "inherit",
              padding: 0
            },
            children: "\u0432\u044B\u0439\u0442\u0438"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx2("main", { style: { minWidth: 0 }, children })
  ] });
}
var STATUS_MAP = {
  // Applications (richer canon set + TZ API set)
  new: [VT.infoSoft, "oklch(0.38 0.10 240)", "\u043D\u043E\u0432\u0430\u044F"],
  parsing: [VT.infoSoft, "oklch(0.38 0.10 240)", "\u043F\u0430\u0440\u0441\u0438\u0442\u0441\u044F"],
  generated: [VT.warnSoft, "oklch(0.40 0.13 70)", "\u0433\u043E\u0442\u043E\u0432"],
  published: [VT.successSoft, "oklch(0.34 0.12 145)", "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D"],
  rejected: [VT.dangerSoft, "oklch(0.42 0.15 28)", "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D"],
  rework: [VT.warnSoft, "oklch(0.40 0.13 70)", "\u043F\u0435\u0440\u0435\u0434\u0435\u043B\u043A\u0430"],
  pending: [VT.infoSoft, "oklch(0.38 0.10 240)", "\u043D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438"],
  approved: [VT.successSoft, "oklch(0.34 0.12 145)", "\u043E\u0434\u043E\u0431\u0440\u0435\u043D\u0430"],
  // Sites
  draft: [VT.bgSoft, VT.inkSoft, "\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A"],
  generating: [VT.infoSoft, "oklch(0.38 0.10 240)", "\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u0443\u0435\u0442\u0441\u044F"],
  pending_review: [VT.warnSoft, "oklch(0.40 0.13 70)", "\u043D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"],
  paused: [VT.bgSoft, VT.inkSoft, "\u043D\u0430 \u043F\u0430\u0443\u0437\u0435"],
  archived: [VT.bgSoft, VT.inkMuted, "\u0432 \u0430\u0440\u0445\u0438\u0432\u0435"],
  // Leads
  read: [VT.bgSoft, VT.inkSoft, "\u043F\u0440\u043E\u0447\u0438\u0442\u0430\u043D"]
};
function StatusPill({ status, size = "md" }) {
  const m = STATUS_MAP[status] || [VT.bgSoft, VT.inkSoft, String(status)];
  return /* @__PURE__ */ jsxs2("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: size === "sm" ? "2px 7px" : "3px 9px",
    borderRadius: 999,
    background: m[0],
    color: m[1],
    fontSize: size === "sm" ? 11 : 11.5,
    fontWeight: 500
  }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    m[2]
  ] });
}
function FilterChip({ label, active, count, onClick, disabled }) {
  return /* @__PURE__ */ jsxs2(
    "button",
    {
      type: "button",
      onClick,
      disabled,
      "aria-pressed": active,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 999,
        background: active ? VT.accentSoft : VT.white,
        color: active ? VT.accentInk : VT.ink,
        border: `1px solid ${active ? "transparent" : VT.line}`,
        fontSize: 13,
        fontWeight: 500,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        fontFamily: "inherit"
      },
      children: [
        label,
        count != null && /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
      ]
    }
  );
}

// src/admin-ops/index.tsx
import { Fragment as Fragment5, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function formatTs(iso) {
  if (!iso) return "\u2014";
  return iso.replace("T", " ").slice(0, 16);
}
function formatRel(iso) {
  if (!iso) return "\u2014";
  return iso.slice(0, 10);
}
function TextField({ value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono, type = "text" }) {
  return /* @__PURE__ */ jsx3(
    "input",
    {
      type,
      value: value ?? "",
      onChange: (e) => onChange && onChange(e.target.value),
      placeholder,
      "aria-label": ariaLabel,
      inputMode,
      maxLength,
      autoFocus,
      disabled,
      style: {
        width: "100%",
        boxSizing: "border-box",
        padding: "10px 12px",
        background: disabled ? VT.bgSoft : VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14,
        color: VT.ink,
        fontFamily: mono ? VT.font.mono : VT.font.sans,
        outline: "none",
        ...style
      }
    }
  );
}
var SITE_STATUS_FILTERS = [
  ["all", "\u0412\u0441\u0435"],
  ["published", "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u044B"],
  ["pending_review", "\u041D\u0430 \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0435"],
  ["paused", "\u041D\u0430 \u043F\u0430\u0443\u0437\u0435"],
  ["archived", "\u0410\u0440\u0445\u0438\u0432"]
];
var MOCK_SITES_LIST = {
  total: 39,
  limit: 10,
  offset: 0,
  items: [
    { id: "s1", user_id: "u1842", subdomain: "studia-anna", custom_domain: null, source_type: "telegram", source_url: "t.me/studia_anna", status: "published", last_synced_at: "2026-05-19T06:00:00Z", published_at: "2026-05-05T10:22:00Z", created_at: "2026-05-05T09:30:00Z" },
    { id: "s2", user_id: "u1837", subdomain: "barber-samara", custom_domain: null, source_type: "telegram", source_url: "t.me/barber_samara", status: "published", last_synced_at: "2026-05-19T06:00:00Z", published_at: "2026-05-04T14:10:00Z", created_at: "2026-05-04T13:00:00Z" },
    { id: "s3", user_id: "u1838", subdomain: "lashes-dom", custom_domain: null, source_type: "telegram", source_url: "t.me/lashes_dom", status: "published", last_synced_at: "2026-05-18T06:00:00Z", published_at: "2026-05-02T09:00:00Z", created_at: "2026-05-02T08:30:00Z" },
    { id: "s4", user_id: "u1834", subdomain: "psy-marina", custom_domain: null, source_type: "telegram", source_url: "t.me/psychomarina", status: "paused", last_synced_at: "2026-05-12T06:00:00Z", published_at: "2026-04-25T18:00:00Z", created_at: "2026-04-25T17:30:00Z" },
    { id: "s5", user_id: "u1833", subdomain: "fit-studio-msk", custom_domain: "fitstudio.ru", source_type: "yandex_maps", source_url: "yandex.ru/maps/...", status: "published", last_synced_at: "2026-05-19T06:00:00Z", published_at: "2026-04-22T11:00:00Z", created_at: "2026-04-22T10:30:00Z" },
    { id: "s6", user_id: "u1831", subdomain: "konditer-katya", custom_domain: null, source_type: "yandex_maps", source_url: "yandex.ru/maps/...", status: "published", last_synced_at: "2026-05-19T06:00:00Z", published_at: "2026-04-20T12:00:00Z", created_at: "2026-04-20T11:30:00Z" },
    { id: "s7", user_id: "u1825", subdomain: "tutor-eng-spb", custom_domain: null, source_type: "website", source_url: "tutor-eng.ru", status: "archived", last_synced_at: null, published_at: null, created_at: "2026-04-12T08:00:00Z" }
  ]
};
function S14_SitesList({
  data,
  loading,
  error,
  statusFilter = "all",
  onStatusFilterChange,
  onPageChange,
  onRowClick,
  _embed
}) {
  const d = data || MOCK_SITES_LIST;
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "\u0421\u0410\u0419\u0422\u042B" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "CSV" })
    ] }),
    error && /* @__PURE__ */ jsx3("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx3(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }, children: SITE_STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx3(
      FilterChip,
      {
        label,
        active: statusFilter === key,
        onClick: () => onStatusFilterChange && onStatusFilterChange(key)
      },
      key
    )) }),
    /* @__PURE__ */ jsxs3(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs3("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsx3("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["Subdomain", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "Status", "Last sync", ""].map((h) => /* @__PURE__ */ jsx3("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs3("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx3("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [160, 80, 220, 110, 110, 18].map((w, j) => /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((s) => /* @__PURE__ */ jsxs3(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(s.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(s.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsxs3("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12.5 }, children: [
                  s.subdomain,
                  ".samosite.online",
                  s.custom_domain && /* @__PURE__ */ jsx3(Badge, { kind: "success", style: { marginLeft: 8, padding: "1px 7px", fontSize: 10, borderRadius: 4 }, children: s.custom_domain })
                ] }),
                /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: s.source_type }) }),
                /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: s.source_url }) }),
                /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(StatusPill, { status: s.status }) }),
                /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: formatTs(s.last_synced_at) }) }),
                /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            s.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx3(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0441\u0430\u0439\u0442\u043E\u0432", hint: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B \xAB\u0417\u0430\u044F\u0432\u043A\u0438\xBB \u2014 \u0442\u0430\u043C \u043E\u0434\u043E\u0431\u0440\u044F\u0439\u0442\u0435 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0439\u0442\u0435." }),
      !showEmpty && /* @__PURE__ */ jsxs3("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs3("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs3(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
        ] })
      ] })
    ] })
  ] }) });
}
var MOCK_SITE_DETAIL = {
  site: {
    id: "s1",
    user_id: "u1842",
    subdomain: "studia-anna",
    custom_domain: null,
    source_type: "telegram",
    source_url: "t.me/studia_anna",
    status: "published",
    last_synced_at: "2026-05-19T06:00:00Z",
    published_at: "2026-05-05T10:22:00Z",
    created_at: "2026-05-05T09:30:00Z"
  },
  leads_count: 4
};
function actionEnabled(action, status) {
  if (status === "pending_review" && action === "publish") return true;
  if (status === "published" && (action === "republish" || action === "pause_sync" || action === "archive")) return true;
  if (status === "paused" && (action === "resume_sync" || action === "archive")) return true;
  if (status === "archived" && action === "unarchive") return true;
  return false;
}
var ACTION_LABELS = {
  publish: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C",
  republish: "Re-publish",
  pause_sync: "Pause sync",
  resume_sync: "Resume sync",
  archive: "\u0412 \u0430\u0440\u0445\u0438\u0432",
  unarchive: "\u0418\u0437 \u0430\u0440\u0445\u0438\u0432\u0430"
};
function S15_SiteDetail({
  data,
  loading,
  error,
  previewUrl,
  onAction,
  onBack,
  actionLoading,
  _embed
}) {
  const d = data || MOCK_SITE_DETAIL;
  const site = d.site;
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  if (loading) {
    return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx3(SkeletonBlock, { width: 200, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx3(SkeletonBlock, { width: 280, height: 28, radius: 6, style: { marginBottom: 24 } }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx3(SkeletonBlock, { width: "100%", height: 420, radius: 10 }),
        /* @__PURE__ */ jsx3(SkeletonBlock, { width: "100%", height: 420, radius: 10 })
      ] })
    ] }) });
  }
  const renderAction = (action, variant = "secondary") => {
    const enabled = actionEnabled(action, site.status);
    const isLoading = actionLoading === action;
    const anyLoading = !!actionLoading;
    return /* @__PURE__ */ jsx3(
      Btn,
      {
        size: "sm",
        variant,
        disabled: !enabled || anyLoading,
        onClick: () => enabled && onAction && onAction(site.id, action),
        iconRight: isLoading ? /* @__PURE__ */ jsx3(Spinner, { size: 14 }) : variant === "primary" ? /* @__PURE__ */ jsx3(IconArrow, { size: 14 }) : void 0,
        children: isLoading ? "..." : ACTION_LABELS[action]
      },
      action
    );
  };
  const primaryAction = site.status === "pending_review" ? "publish" : site.status === "published" ? "republish" : site.status === "paused" ? "resume_sync" : site.status === "archived" ? "unarchive" : null;
  const secondaryActions = ["publish", "republish", "pause_sync", "resume_sync", "archive", "unarchive"].filter((a) => a !== primaryAction && actionEnabled(a, site.status));
  const safePreviewUrl = previewUrl || (site.subdomain ? `https://${site.subdomain}.samosite.online` : null);
  return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx3(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0421\u0430\u0439\u0442\u044B"
        }
      ),
      /* @__PURE__ */ jsx3("span", { children: "/" }),
      /* @__PURE__ */ jsxs3(Mono, { style: { color: VT.ink }, children: [
        site.subdomain,
        ".samosite.online"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx3("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx3(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx3("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: site.subdomain.replace(/-/g, " ") }),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          safePreviewUrl && /* @__PURE__ */ jsxs3("a", { href: safePreviewUrl, target: "_blank", rel: "noreferrer", style: { display: "inline-flex", alignItems: "center", gap: 4, color: VT.accent, textDecoration: "underline" }, children: [
            /* @__PURE__ */ jsxs3(Mono, { style: { color: "inherit" }, children: [
              site.subdomain,
              ".samosite.online"
            ] }),
            " \u2197"
          ] }),
          /* @__PURE__ */ jsx3("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx3(StatusPill, { status: site.status }),
          site.published_at && /* @__PURE__ */ jsxs3(Fragment5, { children: [
            /* @__PURE__ */ jsx3("span", { children: "\xB7" }),
            /* @__PURE__ */ jsxs3("span", { children: [
              "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D ",
              formatRel(site.published_at)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }, children: [
        secondaryActions.map((a) => renderAction(a, "secondary")),
        primaryAction && renderAction(primaryAction, "primary")
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { padding: "10px 14px", borderBottom: `1px solid ${VT.line}`, display: "flex", alignItems: "center", gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
          /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx3("span", { style: { marginLeft: 10 }, children: safePreviewUrl }),
          /* @__PURE__ */ jsx3("span", { style: { marginLeft: "auto" }, children: "preview" })
        ] }),
        safePreviewUrl ? /* @__PURE__ */ jsx3(
          "iframe",
          {
            src: safePreviewUrl,
            title: `${site.subdomain} preview`,
            sandbox: "allow-same-origin allow-scripts allow-popups-to-escape-sandbox",
            style: { width: "100%", aspectRatio: "4 / 3", border: "none", background: VT.bg, display: "block" }
          }
        ) : /* @__PURE__ */ jsxs3("div", { style: { aspectRatio: "4 / 3", background: VT.bg, padding: 14, position: "relative" }, children: [
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: "oklch(0.55 0.13 30)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, letterSpacing: "-0.04em" }, children: "\u0410" }),
            /* @__PURE__ */ jsx3("span", { style: { fontSize: 12, fontWeight: 700, color: VT.ink }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
            /* @__PURE__ */ jsx3("span", { style: { marginLeft: "auto", padding: "3px 9px", borderRadius: 999, background: VT.accent, color: "#fff", fontSize: 10, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsx3("div", { style: { fontFamily: VT.font.mono, fontSize: 9, letterSpacing: "0.12em", color: VT.accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", marginTop: 4, lineHeight: 1.15 }, children: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u2014 \u0431\u0435\u0437 \u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" })
          ] }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: { aspectRatio: "1/1", borderRadius: 4, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` } }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        /* @__PURE__ */ jsxs3(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u041B\u0418\u0414\u042B" }),
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 28, fontWeight: 700, marginTop: 6 }, children: d.leads_count }),
          /* @__PURE__ */ jsx3(
            Btn,
            {
              variant: "ghost",
              size: "sm",
              style: { marginTop: 8, color: VT.accent, padding: 0 },
              onClick: () => onAction && onAction(site.id, "view_leads"),
              children: "\u0412\u0441\u0435 \u043B\u0438\u0434\u044B \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u2192"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs3(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A" }),
          /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx3("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0438\u043F" }),
              /* @__PURE__ */ jsx3(Badge, { kind: "neutral", style: { padding: "2px 9px", fontSize: 11.5, borderRadius: 4 }, children: site.source_type })
            ] }),
            /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx3("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "URL" }),
              /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: site.source_url })
            ] }),
            /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx3("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "Last sync" }),
              /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: formatTs(site.last_synced_at) })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
var MOCK_LEADS_LIST = {
  total: 142,
  limit: 10,
  offset: 0,
  items: [
    { id: "l_1842", site_id: "studia-anna", status: "new", ip_prefix: "85.140.0.0/16", created_at: "2026-05-19T12:22:00Z" },
    { id: "l_1841", site_id: "barber-samara", status: "new", ip_prefix: "178.34.0.0/16", created_at: "2026-05-19T11:08:00Z" },
    { id: "l_1840", site_id: "lashes-dom", status: "read", ip_prefix: "95.220.0.0/16", created_at: "2026-05-19T10:44:00Z" },
    { id: "l_1839", site_id: "fit-studio-msk", status: "new", ip_prefix: "46.180.0.0/16", created_at: "2026-05-19T09:30:00Z" },
    { id: "l_1838", site_id: "konditer-katya", status: "new", ip_prefix: "109.252.0.0/16", created_at: "2026-05-19T08:12:00Z" }
  ]
};
function S16_Leads(props) {
  const {
    data,
    loading,
    error,
    // siteFilter, onSiteFilterChange,    // reserved — UI deferred
    onPageChange,
    // Selection
    selectedLeadIds,
    onSelectLead,
    onClearSelection,
    onOpenDecryptModal,
    // Modal
    decryptModalOpen,
    decryptTotp,
    onDecryptTotpChange,
    onDecryptSubmit,
    onDecryptCancel,
    decryptedRows,
    decryptLoading,
    decryptError,
    _embed
  } = props;
  const d = data || MOCK_LEADS_LIST;
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "leads" };
  const [uSelected, setUSelected] = useState2([]);
  const [uModalOpen, setUModalOpen] = useState2(false);
  const [uTotp, setUTotp] = useState2("");
  const selected = selectedLeadIds ?? uSelected;
  const setSelected = onSelectLead ? (id, on) => onSelectLead(id, on) : (id, on) => setUSelected((prev) => on ? [...prev, id] : prev.filter((x) => x !== id));
  const clearSelection = onClearSelection ?? (() => setUSelected([]));
  const modalOpen = decryptModalOpen ?? props.decryptModal ?? uModalOpen;
  const openModal = onOpenDecryptModal ?? (() => setUModalOpen(true));
  const totp = decryptTotp ?? uTotp;
  const setTotp = onDecryptTotpChange ?? setUTotp;
  const cancel = onDecryptCancel ?? (() => {
    setUModalOpen(false);
    setUTotp("");
  });
  const submitDecrypt = () => {
    if (onDecryptSubmit) onDecryptSubmit(selected, totp);
  };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const isSelected = (id) => selected.includes(id);
  const allSelected = showItems && selected.length === d.items.length;
  return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px", position: "relative" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "\u041B\u0418\u0414\u042B" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        selected.length > 0 && /* @__PURE__ */ jsxs3(
          "button",
          {
            type: "button",
            onClick: clearSelection,
            style: { fontSize: 12, color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" },
            children: [
              "\u0441\u0431\u0440\u043E\u0441\u0438\u0442\u044C (",
              selected.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs3(
          Btn,
          {
            size: "sm",
            onClick: openModal,
            disabled: selected.length === 0 || loading,
            iconRight: /* @__PURE__ */ jsx3(IconArrow, { size: 14 }),
            children: [
              "\u{1F513} \u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C (",
              selected.length,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 12 }, children: [
        "\u0412\u0441\u0435\u0433\u043E: ",
        d.total,
        " \xB7 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E: ",
        d.items?.length ?? 0
      ] }),
      /* @__PURE__ */ jsx3(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 11.5 }, children: "\u{1F512} Fernet AES \u2014 plaintext \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 TOTP-\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F" })
    ] }),
    error && /* @__PURE__ */ jsx3("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx3(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs3(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs3("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsxs3("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx3("th", { scope: "col", style: { width: 48, padding: "12px 16px", textAlign: "left" }, children: /* @__PURE__ */ jsx3(
            "input",
            {
              type: "checkbox",
              "aria-label": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435",
              checked: allSelected,
              onChange: (e) => {
                if (e.target.checked) {
                  d.items.forEach((it) => !isSelected(it.id) && setSelected(it.id, true));
                } else {
                  clearSelection();
                }
              }
            }
          ) }),
          ["ID", "\u0421\u0430\u0439\u0442", "IP prefix", "Status", "\u041A\u043E\u0433\u0434\u0430"].map((h) => /* @__PURE__ */ jsx3("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h))
        ] }) }),
        /* @__PURE__ */ jsxs3("tbody", { children: [
          loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs3("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(SkeletonBlock, { width: 14, height: 14, radius: 3 }) }),
            [90, 160, 120, 90, 110].map((w, j) => /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(SkeletonBlock, { width: w, height: 12 }) }, j))
          ] }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs3("tr", { style: {
            borderBottom: `1px solid ${VT.lineSoft}`,
            background: isSelected(row.id) ? VT.accentSoft : "transparent"
          }, children: [
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(
              "input",
              {
                type: "checkbox",
                "aria-label": `\u0412\u044B\u0431\u0440\u0430\u0442\u044C ${row.id}`,
                checked: isSelected(row.id),
                onChange: (e) => setSelected(row.id, e.target.checked)
              }
            ) }),
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { children: row.id }) }),
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft }, children: row.site_id }),
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: row.ip_prefix || "\u2014" }) }),
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(StatusPill, { status: row.status, size: "sm" }) }),
            /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5, color: VT.inkFaint }, children: formatTs(row.created_at) }) })
          ] }, row.id))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx3(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043B\u0438\u0434\u043E\u0432", hint: "\u041A\u043E\u0433\u0434\u0430 \u043A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442 \u0444\u043E\u0440\u043C\u0443 \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0441\u0430\u0439\u0442\u043E\u0432 \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && !loading && /* @__PURE__ */ jsxs3("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs3("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 10, display: "block" }, children: "\u0412\u0441\u0435 \u0440\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432 audit-log (admin_actions) \u2014 admin_id, ip, lead_ids, ts." }),
    modalOpen && /* @__PURE__ */ jsx3(
      "div",
      {
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "decrypt-title",
        style: {
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.32)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
          zIndex: 10
        },
        children: /* @__PURE__ */ jsx3(Card, { style: { width: decryptedRows ? 560 : 380, padding: 24, background: VT.bg }, children: !decryptedRows ? /* @__PURE__ */ jsxs3(Fragment5, { children: [
          /* @__PURE__ */ jsx3("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 TOTP" }),
          /* @__PURE__ */ jsxs3("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C ",
            /* @__PURE__ */ jsx3("b", { children: selected.length }),
            " ",
            selected.length === 1 ? "\u043B\u0438\u0434" : "\u043B\u0438\u0434\u043E\u0432",
            ". \u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430."
          ] }),
          decryptError && /* @__PURE__ */ jsx3("div", { role: "alert", style: {
            padding: "8px 12px",
            background: VT.dangerSoft,
            border: `1px solid oklch(0.85 0.06 28)`,
            borderRadius: VT.r.md,
            fontSize: 13,
            color: "oklch(0.4 0.15 28)",
            marginBottom: 14
          }, children: decryptError }),
          /* @__PURE__ */ jsx3(
            TextField,
            {
              value: totp,
              onChange: setTotp,
              ariaLabel: "TOTP \u043A\u043E\u0434",
              inputMode: "numeric",
              maxLength: 6,
              placeholder: "\xB7 \xB7 \xB7 \xB7 \xB7 \xB7",
              autoFocus: true,
              disabled: !!decryptLoading,
              mono: true,
              style: { fontSize: 20, letterSpacing: "0.4em", textAlign: "center" }
            }
          ),
          /* @__PURE__ */ jsxs3("div", { style: { marginTop: 14, display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", style: { flex: 1 }, onClick: cancel, disabled: !!decryptLoading, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
            /* @__PURE__ */ jsx3(
              Btn,
              {
                size: "sm",
                style: { flex: 1 },
                onClick: submitDecrypt,
                disabled: !totp || totp.length < 6 || !!decryptLoading,
                iconRight: decryptLoading ? /* @__PURE__ */ jsx3(Spinner, { size: 14 }) : void 0,
                children: decryptLoading ? "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C\u2026" : "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs3(Fragment5, { children: [
          /* @__PURE__ */ jsxs3("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043E \xB7 ",
            decryptedRows.length
          ] }),
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint, display: "block", marginBottom: 12 }, children: "\u0417\u0430\u043B\u043E\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 audit-log. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u043E\u043A\u043D\u043E \u2014 plaintext \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442 \u0438\u0437 DOM." }),
          /* @__PURE__ */ jsx3("div", { style: { maxHeight: 360, overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }, children: decryptedRows.map((r) => /* @__PURE__ */ jsxs3(Card, { style: { padding: 12, border: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }, children: [
              /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5 }, children: r.id }),
              /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: r.site_id }),
              /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs(r.created_at) })
            ] }),
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 13, fontWeight: 500 }, children: r.name || "\u2014" }),
            /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: r.phone || "\u2014" }),
            r.message && /* @__PURE__ */ jsxs3("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 4, lineHeight: 1.5 }, children: [
              "\xAB",
              r.message,
              "\xBB"
            ] })
          ] }, r.id)) }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 14, display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx3(Btn, { size: "sm", onClick: cancel, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" }) })
        ] }) })
      }
    )
  ] }) });
}
var MOCK_WAITLIST = {
  threshold: 10,
  items: [
    { source_name: "instagram", votes: 24, first_seen: "2026-04-03", last_seen: "2026-05-19", ready: true },
    { source_name: "vk", votes: 18, first_seen: "2026-03-28", last_seen: "2026-05-18", ready: true },
    { source_name: "2gis", votes: 11, first_seen: "2026-04-12", last_seen: "2026-05-15", ready: true },
    { source_name: "avito", votes: 7, first_seen: "2026-04-05", last_seen: "2026-05-10", ready: false },
    { source_name: "whatsapp", votes: 6, first_seen: "2026-04-19", last_seen: "2026-05-08", ready: false },
    { source_name: "youtube", votes: 4, first_seen: "2026-05-01", last_seen: "2026-05-12", ready: false },
    { source_name: "max", votes: 3, first_seen: "2026-04-22", last_seen: "2026-05-06", ready: false },
    { source_name: "dzen", votes: 2, first_seen: "2026-05-08", last_seen: "2026-05-14", ready: false }
  ]
};
var SOURCE_LABELS = {
  instagram: "Instagram",
  vk: "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435",
  "2gis": "2GIS",
  avito: "Avito",
  whatsapp: "WhatsApp Catalog",
  youtube: "YouTube / Shorts",
  max: "MAX-\u043A\u0430\u043D\u0430\u043B",
  dzen: "\u0414\u0437\u0435\u043D",
  own_site: "\u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442",
  yandex_maps: "\u042F\u043D\u0434\u0435\u043A\u0441 \u041A\u0430\u0440\u0442\u044B",
  telegram: "Telegram"
};
function S17_Waitlist({ data, loading, error, onMarkInDevelopment, _embed }) {
  const d = data || MOCK_WAITLIST;
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "waitlist" };
  const items = d.items || [];
  const readyItems = items.filter((it) => it.ready);
  const restItems = items.filter((it) => !it.ready);
  return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "WAITLIST \xB7 ADR-0009" }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 6px" }, children: /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0413\u043E\u043B\u043E\u0441\u0430 \u043F\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C" }) }),
    /* @__PURE__ */ jsxs3("p", { style: { fontSize: 14, color: VT.inkSoft, margin: "0 0 22px", maxWidth: 680 }, children: [
      "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E ",
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: "source_name" }),
      ". \u0417\u0435\u043B\u0451\u043D\u044B\u043C \u2014 \u2265",
      d.threshold,
      " \u0433\u043E\u043B\u043E\u0441\u043E\u0432, \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C ADR."
    ] }),
    error && /* @__PURE__ */ jsx3("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx3(ErrorBlock, { message: error }) }),
    !loading && items.length === 0 && /* @__PURE__ */ jsx3(Card, { style: { padding: 0 }, children: /* @__PURE__ */ jsx3(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438", hint: "\u0413\u043E\u043B\u043E\u0441\u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0438\u0437 feedback-\u0444\u043E\u0440\u043C\u044B \u0438 source-detection \xABunknown\xBB." }) }),
    (loading || items.length > 0) && /* @__PURE__ */ jsx3(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs3("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 }, children: [
      /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsx3("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0413\u043E\u043B\u043E\u0441\u043E\u0432", "\u041F\u0435\u0440\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435", ""].map((h) => /* @__PURE__ */ jsx3("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
      /* @__PURE__ */ jsxs3("tbody", { children: [
        loading && [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx3("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [200, 100, 140, 120].map((w, j) => /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx3(SkeletonBlock, { width: w, height: 14 }) }, j)) }, i)),
        !loading && readyItems.map((it) => /* @__PURE__ */ jsx3(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name)),
        !loading && readyItems.length > 0 && restItems.length > 0 && /* @__PURE__ */ jsx3("tr", { "aria-hidden": "true", children: /* @__PURE__ */ jsx3("td", { colSpan: 4, style: { padding: "6px 16px", background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.08em" }, children: [
          "\u2500\u2500\u2500 \u041D\u0418\u0416\u0415 \u041F\u041E\u0420\u041E\u0413\u0410 (",
          d.threshold,
          " \u0413\u041E\u041B\u041E\u0421\u041E\u0412) \u2500\u2500\u2500"
        ] }) }) }),
        !loading && restItems.map((it) => /* @__PURE__ */ jsx3(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name))
      ] })
    ] }) })
  ] }) });
}
function WaitlistRow({ item, threshold, onMarkInDevelopment }) {
  return /* @__PURE__ */ jsxs3("tr", { style: {
    borderBottom: `1px solid ${VT.lineSoft}`,
    background: item.ready ? "oklch(0.97 0.03 145 / 0.5)" : "transparent"
  }, children: [
    /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, padding: "2px 7px", background: VT.bgSoft, borderRadius: 4 }, children: item.source_name }),
      /* @__PURE__ */ jsx3("span", { style: { fontWeight: 500 }, children: SOURCE_LABELS[item.source_name] || item.source_name })
    ] }) }),
    /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx3("span", { style: { fontSize: 22, fontWeight: 700, color: item.ready ? VT.success : VT.ink }, children: item.votes }),
      item.ready && /* @__PURE__ */ jsxs3(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: [
        "\u2265 ",
        threshold,
        " \xB7 \u041F\u041E\u0420\u0410"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: item.first_seen }) }),
    /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px", textAlign: "right" }, children: item.ready ? /* @__PURE__ */ jsx3(Btn, { size: "sm", onClick: () => onMarkInDevelopment && onMarkInDevelopment(item.source_name), children: "\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443" }) : /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2014" }) })
  ] });
}
var MOCK_FEEDBACK = {
  total: 142,
  limit: 10,
  offset: 0,
  items: [
    { id: "#F-238", type: "feature_request", source_name: null, email_or_contact_masked: "an***@gmail", message: "\xAB\u0425\u043E\u0447\u0443 YCLIENTS \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044E, \u0438\u043D\u0430\u0447\u0435 \u0444\u0440\u043E\u043D\u0442-\u043E\u0444\u0438\u0441 \u0432\u0435\u0434\u0443\u0442 \u043F\u043E \u0434\u0432\u0443\u043C \u043E\u043A\u043D\u0430\u043C \u2014 \u0440\u0430\u0437\u0434\u0440\u0430\u0436\u0430\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043A. \u0413\u043E\u0442\u043E\u0432\u0430 \u0434\u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0442\u044C.\xBB", checkboxes: { yclients: true, custom_domain: false }, created_at: "2026-05-19T14:22:00Z" },
    { id: "#F-237", type: "source_request", source_name: "instagram", email_or_contact_masked: "+7***5678", message: "Instagram \u043D\u0443\u0436\u0435\u043D \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043C\u043D\u043E\u0433\u043E \u043A\u0442\u043E \u043F\u0440\u043E\u0441\u0438\u0442", checkboxes: null, created_at: "2026-05-19T12:10:00Z" },
    { id: "#F-236", type: "bug", source_name: null, email_or_contact_masked: "st***@yandex", message: "\xAB\u041F\u043E\u0441\u043B\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0444\u0430\u0432\u0438\u043A\u043E\u043D \u043D\u0435 \u043F\u043E\u0434\u0442\u044F\u043D\u0443\u043B\u0441\u044F\xBB", checkboxes: null, created_at: "2026-05-19T10:00:00Z" },
    { id: "#F-235", type: "feature_request", source_name: null, email_or_contact_masked: "@les***", message: "\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \xAB\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435\xBB", checkboxes: { custom_domain: true, no_watermark: true }, created_at: "2026-05-19T06:00:00Z" },
    { id: "#F-234", type: "general", source_name: null, email_or_contact_masked: "ma***@gmail", message: "\xAB\u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u0423\u0436\u0435 3 \u043B\u0438\u0434\u0430 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E\xBB", checkboxes: null, created_at: "2026-05-18T18:00:00Z" }
  ]
};
var FB_TYPE_FILTERS = [
  ["all", "\u0412\u0441\u0435"],
  ["source_request", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A"],
  ["feature_request", "\u0424\u0438\u0447\u0430"],
  ["bug", "\u0411\u0430\u0433"],
  ["general", "\u0414\u0440\u0443\u0433\u043E\u0435"]
];
function FbTypePill({ type }) {
  const m = {
    source_request: ["\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A", VT.infoSoft, "oklch(0.38 0.10 240)"],
    feature_request: ["\u0444\u0438\u0447\u0430", VT.accentSoft, VT.accentInk],
    bug: ["\u0431\u0430\u0433", VT.dangerSoft, "oklch(0.42 0.15 28)"],
    general: ["\u0434\u0440\u0443\u0433\u043E\u0435", VT.bgSoft, VT.inkSoft]
  }[type] || ["\u2014", VT.bgSoft, VT.inkSoft];
  return /* @__PURE__ */ jsx3("span", { style: { display: "inline-flex", padding: "2px 8px", borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: "0.06em" }, children: m[0].toUpperCase() });
}
function S18_FeedbackInbox({
  data,
  loading,
  error,
  typeFilter = "all",
  onTypeFilterChange,
  searchQuery,
  onSearchChange,
  onPageChange,
  onRowClick,
  _embed
}) {
  const d = data || MOCK_FEEDBACK;
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "feedback" };
  const [selectedId, setSelectedId] = useState2(null);
  const selected = useMemo(() => {
    const items = d.items || [];
    if (selectedId) return items.find((it) => it.id === selectedId) || items[0] || null;
    return items[0] || null;
  }, [d.items, selectedId]);
  const handleRowClick = (id) => {
    setSelectedId(id);
    if (onRowClick) onRowClick(id);
  };
  return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "FEEDBACK INBOX" }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" }) }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", gap: 6 }, children: FB_TYPE_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx3(
        FilterChip,
        {
          label,
          active: typeFilter === key,
          onClick: () => onTypeFilterChange && onTypeFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx3("div", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ jsx3(
        "input",
        {
          type: "search",
          value: searchQuery ?? "",
          onChange: (e) => onSearchChange && onSearchChange(e.target.value),
          placeholder: "\u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0442\u0435\u043A\u0441\u0442\u0443",
          "aria-label": "\u041F\u043E\u0438\u0441\u043A \u043F\u043E feedback",
          style: {
            padding: "6px 12px",
            minWidth: 240,
            background: VT.white,
            border: `1px solid ${VT.line}`,
            borderRadius: 999,
            fontSize: 13,
            color: VT.ink,
            outline: "none",
            fontFamily: "inherit"
          }
        }
      ) })
    ] }),
    error && /* @__PURE__ */ jsx3("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx3(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs3("div", { style: { padding: "14px 16px", borderBottom: `1px solid ${VT.lineSoft}` }, children: [
          /* @__PURE__ */ jsx3(SkeletonBlock, { width: "60%", height: 12, style: { marginBottom: 6 } }),
          /* @__PURE__ */ jsx3(SkeletonBlock, { width: "90%", height: 14 })
        ] }, i)),
        !loading && (d.items || []).length === 0 && /* @__PURE__ */ jsx3(EmptyState, { title: "Inbox \u043F\u0443\u0441\u0442", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0441\u0442\u0430\u0432\u0438\u0442 feedback \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
        !loading && (d.items || []).map((row, i, arr) => {
          const isSelected = selected && selected.id === row.id;
          return /* @__PURE__ */ jsxs3(
            "button",
            {
              type: "button",
              onClick: () => handleRowClick(row.id),
              style: {
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "14px 16px",
                borderBottom: i < arr.length - 1 ? `1px solid ${VT.lineSoft}` : "none",
                background: isSelected ? VT.accentSoft : "transparent",
                cursor: "pointer",
                border: "none",
                fontFamily: "inherit"
              },
              children: [
                /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }, children: [
                  /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5 }, children: row.id }),
                  /* @__PURE__ */ jsx3(FbTypePill, { type: row.type }),
                  /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs(row.created_at) })
                ] }),
                /* @__PURE__ */ jsx3("div", { style: { fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: row.message }),
                /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: row.email_or_contact_masked || "\u2014" })
              ]
            },
            row.id
          );
        }),
        !loading && (d.items || []).length > 0 && onPageChange && /* @__PURE__ */ jsxs3("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft, borderTop: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsxs3("span", { children: [
            d.offset + 1,
            "\u2013",
            Math.min(d.offset + d.limit, d.total),
            " \u0438\u0437 ",
            d.total
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0, children: "\u2190" }),
            /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total, children: "\u2192" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx3(Card, { style: { padding: 22 }, children: !selected ? /* @__PURE__ */ jsx3(EmptyState, { title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C \u0441\u043B\u0435\u0432\u0430" }) : /* @__PURE__ */ jsxs3(Fragment5, { children: [
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx3(Mono, { children: selected.id }),
          /* @__PURE__ */ jsx3(FbTypePill, { type: selected.type }),
          /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs(selected.created_at) })
        ] }),
        /* @__PURE__ */ jsx3("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: selected.type === "source_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" : selected.type === "feature_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0444\u0438\u0447\u0438" : selected.type === "bug" ? "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435" : "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }),
        selected.email_or_contact_masked && /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: selected.email_or_contact_masked }),
        /* @__PURE__ */ jsx3("p", { style: { fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: "14px 0 18px" }, children: selected.message }),
        selected.source_name && /* @__PURE__ */ jsxs3("div", { style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE NAME" }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ jsx3(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 12 }, children: selected.source_name }) })
        ] }),
        selected.checkboxes && Object.keys(selected.checkboxes).length > 0 && /* @__PURE__ */ jsxs3("details", { open: false, children: [
          /* @__PURE__ */ jsx3("summary", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: VT.inkSoft,
            cursor: "pointer",
            padding: "6px 0",
            listStyle: "none"
          }, children: "CHECKBOXES \xB7 JSONB \u25BE" }),
          /* @__PURE__ */ jsx3("pre", { style: {
            margin: "6px 0 0",
            padding: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`,
            borderRadius: VT.r.sm,
            fontFamily: VT.font.mono,
            fontSize: 12,
            lineHeight: 1.55,
            color: VT.inkSoft,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
          }, children: JSON.stringify(selected.checkboxes, null, 2) })
        ] })
      ] }) })
    ] })
  ] }) });
}
var MOCK_SETTINGS = {
  environment: "prod",
  log_level: "INFO",
  app_base_url: "https://app.samosite.online",
  landing_base_url: "https://samosite.online",
  sites_base_domain: "samosite.online",
  feature_max_bot: false,
  feature_auto_sync: true,
  captcha_configured: true,
  tg_bot_configured: true,
  yandexgpt_configured: true,
  yookassa_configured: true,
  s3_configured: true,
  fernet_keys_configured: true
};
function ConfiguredBadge({ on, label }) {
  return /* @__PURE__ */ jsxs3("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "3px 9px",
    borderRadius: 999,
    background: on ? VT.successSoft : VT.warnSoft,
    color: on ? "oklch(0.34 0.12 145)" : "oklch(0.40 0.13 70)",
    fontSize: 11.5,
    fontWeight: 500
  }, children: [
    /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: on ? "\u2713" : "\u26A0" }),
    label || (on ? "\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D" : "\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D")
  ] });
}
function KeyValueRow({ label, children }) {
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${VT.line}`, gap: 16 }, children: [
    /* @__PURE__ */ jsx3("span", { style: { fontSize: 13, color: VT.inkSoft }, children: label }),
    /* @__PURE__ */ jsx3("div", { children })
  ] });
}
function S19_Settings({ data, loading, error, onRefresh, _embed }) {
  const d = data || MOCK_SETTINGS;
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "settings" };
  const envBadge = d.environment === "prod" ? { kind: "danger", label: "PROD" } : d.environment === "staging" ? { kind: "warn", label: "STAGING" } : { kind: "info", label: "DEV" };
  return /* @__PURE__ */ jsx3(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "SETTINGS \xB7 SYSTEM" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430" }),
      onRefresh && /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" })
    ] }),
    error && /* @__PURE__ */ jsx3("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx3(ErrorBlock, { message: error, onRetry: onRefresh }) }),
    loading && /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsx3(SkeletonBlock, { width: "100%", height: 200, radius: 10 }),
      /* @__PURE__ */ jsx3(SkeletonBlock, { width: "100%", height: 200, radius: 10 })
    ] }),
    !loading && /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0421\u0420\u0415\u0414\u0410" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Environment", children: /* @__PURE__ */ jsx3(Badge, { kind: envBadge.kind, style: { padding: "2px 10px", fontSize: 11.5 }, children: envBadge.label }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Log level", children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 13 }, children: d.log_level }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0411\u0410\u0417\u041E\u0412\u042B\u0415 URL" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "App", children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: d.app_base_url }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Landing", children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: d.landing_base_url }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Sites", children: /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 12 }, children: [
            "*.",
            d.sites_base_domain
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "FEATURE FLAGS" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "MAX-bot integration", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.feature_max_bot, label: d.feature_max_bot ? "on" : "off" }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Auto-sync sites", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.feature_auto_sync, label: d.feature_auto_sync ? "on" : "off" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0412\u041D\u0415\u0428\u041D\u0418\u0415 \u0421\u0415\u0420\u0412\u0418\u0421\u042B" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Captcha", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.captcha_configured }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Telegram-\u0431\u043E\u0442", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.tg_bot_configured }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "YandexGPT", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.yandexgpt_configured }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "\u042EKassa", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.yookassa_configured }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "S3 storage", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.s3_configured }) }),
          /* @__PURE__ */ jsx3(KeyValueRow, { label: "Fernet keys", children: /* @__PURE__ */ jsx3(ConfiguredBadge, { on: d.fernet_keys_configured }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 14, display: "block" }, children: "Read-only snapshot. \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u043A\u0440\u0435\u0442\u043E\u0432 \u043D\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u044E\u0442\u0441\u044F \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0430\u0442\u0443\u0441 \xAB\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D/\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\xBB." })
  ] }) });
}
var SitesList = S14_SitesList;
var SiteDetail = S15_SiteDetail;
var Leads = S16_Leads;
var Waitlist = S17_Waitlist;
var FeedbackInbox = S18_FeedbackInbox;
var Settings = S19_Settings;
export {
  FeedbackInbox,
  Leads,
  S14_SitesList,
  S15_SiteDetail,
  S16_Leads,
  S17_Waitlist,
  S18_FeedbackInbox,
  S19_Settings,
  Settings,
  SiteDetail,
  SitesList,
  Waitlist
};
//# sourceMappingURL=index.js.map