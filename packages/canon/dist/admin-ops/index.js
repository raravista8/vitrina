"use client";

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

// src/admin-core/index.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var NAV = [
  ["dash", "Dashboard", "\u{1F4CA}"],
  ["apps", "\u0417\u0430\u044F\u0432\u043A\u0438", "\u{1F4E5}"],
  ["sites", "\u0421\u0430\u0439\u0442\u044B", "\u{1F310}"],
  ["leads", "\u041B\u0438\u0434\u044B", "\u{1F4E8}"],
  ["feedback", "Feedback", "\u{1F4AC}"],
  ["waitlist", "Waitlist", "\u23F3"],
  ["settings", "Settings", "\u2699\uFE0F"]
];
function AdminChrome({ active, children }) {
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
        /* @__PURE__ */ jsx2("span", { style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.bg } }),
        /* @__PURE__ */ jsx2("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 6px", fontSize: 10, borderRadius: 4 }, children: "ADMIN" })
      ] }),
      NAV.map(([key, name, icon]) => /* @__PURE__ */ jsxs2("a", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        borderRadius: VT.r.sm,
        background: active === key ? VT.accentSoft : "transparent",
        color: active === key ? VT.accentInk : VT.ink,
        fontSize: 14,
        fontWeight: active === key ? 600 : 500,
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { fontSize: 15, width: 18, display: "inline-flex" }, children: icon }),
        name,
        key === "apps" && /* @__PURE__ */ jsx2(Badge, { kind: "warn", style: { marginLeft: "auto", padding: "1px 7px", fontSize: 10, borderRadius: 999 }, children: "12" })
      ] }, key)),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 24, height: 24, borderRadius: "50%", background: VT.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: VT.accentInk, fontWeight: 600 }, children: "F" }),
        "founder@samosite.online",
        /* @__PURE__ */ jsx2("a", { style: { marginLeft: "auto", color: VT.inkFaint }, children: "\u0432\u044B\u0439\u0442\u0438" })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("main", { style: { minWidth: 0 }, children })
  ] });
}
function StatTile({ label, value, delta, deltaSign, sub }) {
  return /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
    /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: label.toUpperCase() }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }, children: [
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em" }, children: value }),
      delta && /* @__PURE__ */ jsxs2("span", { style: {
        fontSize: 12.5,
        fontWeight: 600,
        color: deltaSign === "+" ? VT.success : deltaSign === "-" ? VT.danger : VT.inkSoft
      }, children: [
        deltaSign,
        delta
      ] })
    ] }),
    sub && /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 4 }, children: sub })
  ] });
}

// src/admin-ops/index.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var SITES_DATA = [
  ["studia-anna.samosite.online", "an***@gmail", "published", "2026-05-19 06:00", 4, "free"],
  ["barber-samara.samosite.online", "+7***5678", "published", "2026-05-19 06:00", 12, "pro"],
  ["lashes-dom.samosite.online", "@les***", "published", "2026-05-18 06:00", 2, "free"],
  ["psy-marina.samosite.online", "ma***@gmail", "sync_paused", "2026-05-12 06:00", 0, "free"],
  ["fit-studio-msk.samosite.online", "@fit***", "published", "2026-05-19 06:00", 7, "pro"],
  ["konditer-katya.samosite.online", "ka***@yandex", "published", "2026-05-19 06:00", 3, "free"],
  ["tutor-eng-spb.samosite.online", "+7***1122", "archived", "\u2014", 0, "free"]
];
function SiteStatusPill({ status }) {
  const m = {
    published: ["\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D", VT.successSoft, "oklch(0.34 0.12 145)"],
    sync_paused: ["sync paused", VT.warnSoft, "oklch(0.40 0.13 70)"],
    archived: ["\u0430\u0440\u0445\u0438\u0432", VT.bgSoft, VT.inkSoft]
  }[status];
  return /* @__PURE__ */ jsxs3("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 9px", borderRadius: 999, background: m[1], color: m[2], fontSize: 11.5, fontWeight: 500 }, children: [
    /* @__PURE__ */ jsx3("span", { style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    m[0]
  ] });
}
function S14_SitesList() {
  return /* @__PURE__ */ jsx3(AdminChrome, { active: "sites", children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "\u0421\u0410\u0419\u0422\u042B" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "CSV" }),
        /* @__PURE__ */ jsx3(Btn, { size: "sm", children: "+ \u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0432\u0440\u0443\u0447\u043D\u0443\u044E" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx3(StatTile, { label: "\u0410\u043A\u0442\u0438\u0432\u043D\u044B\u0445", value: "34", sub: "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u044B \u0438 \u0441\u0438\u043D\u043A\u0430\u044E\u0442\u0441\u044F" }),
      /* @__PURE__ */ jsx3(StatTile, { label: "Sync paused", value: "2", sub: "\u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 sync >7 \u0434\u043D\u0435\u0439" }),
      /* @__PURE__ */ jsx3(StatTile, { label: "\u0410\u0440\u0445\u0438\u0432\u043D\u044B\u0445", value: "3" }),
      /* @__PURE__ */ jsx3(StatTile, { label: "\u041B\u0438\u0434\u043E\u0432 \u0437\u0430 7\u0434", value: "42", delta: "+18%", deltaSign: "+" })
    ] }),
    /* @__PURE__ */ jsx3(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs3("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsx3("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["Subdomain", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0422\u0430\u0440\u0438\u0444", "Status", "Last sync", "\u041B\u0438\u0434\u044B 7\u0434", ""].map((h) => /* @__PURE__ */ jsx3("th", { style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h)) }) }),
      /* @__PURE__ */ jsx3("tbody", { children: SITES_DATA.map(([sub, contact, status, sync, leads, plan]) => /* @__PURE__ */ jsxs3("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: "pointer" }, children: [
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12.5 }, children: sub }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: contact }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3("span", { style: {
          padding: "2px 8px",
          borderRadius: 4,
          fontSize: 10.5,
          fontWeight: 600,
          background: plan === "pro" ? VT.accentSoft : VT.bgSoft,
          color: plan === "pro" ? VT.accentInk : VT.inkSoft,
          fontFamily: VT.font.mono,
          letterSpacing: "0.08em"
        }, children: plan.toUpperCase() }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(SiteStatusPill, { status }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: sync }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", fontWeight: 600 }, children: leads }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", textAlign: "right", color: VT.inkFaint }, children: "\u2192" })
      ] }, sub)) })
    ] }) })
  ] }) });
}
function S15_SiteDetail() {
  return /* @__PURE__ */ jsx3(AdminChrome, { active: "sites", children: /* @__PURE__ */ jsxs3("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx3("a", { style: { color: VT.inkFaint }, children: "\u0421\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsx3("span", { children: "/" }),
      /* @__PURE__ */ jsx3(Mono, { style: { color: VT.ink }, children: "studia-anna.samosite.online" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx3("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: VT.inkSoft }, children: [
          /* @__PURE__ */ jsxs3("a", { style: { display: "inline-flex", alignItems: "center", gap: 4, color: VT.accent, textDecoration: "underline" }, children: [
            /* @__PURE__ */ jsx3(Mono, { children: "studia-anna.samosite.online" }),
            " \u2197"
          ] }),
          /* @__PURE__ */ jsx3("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx3(SiteStatusPill, { status: "published" }),
          /* @__PURE__ */ jsx3("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx3("span", { children: "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D 14 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "\u0410\u0440\u0445\u0438\u0432" }),
        /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "Pause sync" }),
        /* @__PURE__ */ jsx3(Btn, { size: "sm", iconRight: /* @__PURE__ */ jsx3(IconArrow, { size: 14 }), children: "Re-publish" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { padding: "10px 14px", borderBottom: `1px solid ${VT.line}`, display: "flex", alignItems: "center", gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
          /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx3("span", { style: { marginLeft: 10 }, children: "studia-anna.samosite.online" }),
          /* @__PURE__ */ jsx3("span", { style: { marginLeft: "auto" }, children: "iframe preview" })
        ] }),
        /* @__PURE__ */ jsxs3("div", { style: { aspectRatio: "4 / 3", background: VT.bg, padding: 14, position: "relative" }, children: [
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsx3("span", { style: { width: 22, height: 22, borderRadius: 6, background: "oklch(0.55 0.13 30)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, letterSpacing: "-0.04em" }, children: "\u0410" }),
            /* @__PURE__ */ jsx3("span", { style: { fontSize: 12, fontWeight: 700, color: VT.ink }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
            /* @__PURE__ */ jsx3("span", { style: { marginLeft: "auto", padding: "3px 9px", borderRadius: 999, background: VT.accent, color: "#fff", fontSize: 10, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsx3("div", { style: { fontFamily: VT.font.mono, fontSize: 9, letterSpacing: "0.12em", color: VT.accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", marginTop: 4, lineHeight: 1.15 }, children: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u2014 \u0431\u0435\u0437 \u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" }),
            /* @__PURE__ */ jsxs3("div", { style: { marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", background: VT.bgSoft, border: `1px solid ${VT.line}`, borderRadius: 999, fontSize: 10.5 }, children: [
              /* @__PURE__ */ jsx3("span", { style: { color: "#f4a93b" }, children: "\u2605\u2605\u2605\u2605\u2605" }),
              /* @__PURE__ */ jsx3("b", { style: { color: VT.ink }, children: "4.9" }),
              /* @__PURE__ */ jsx3("span", { style: { color: VT.inkFaint }, children: "\xB7 38 \u043E\u0442\u0437\u044B\u0432\u043E\u0432" })
            ] })
          ] }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 4 }, children: [["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", "1 500 \u20BD"], ["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u0433\u0435\u043B\u044C-\u043B\u0430\u043A", "2 200 \u20BD"], ["\u041F\u0435\u0434\u0438\u043A\u044E\u0440", "2 800 \u20BD"]].map(([n, p]) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", padding: "5px 8px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 6, fontSize: 11 }, children: [
            /* @__PURE__ */ jsx3("span", { style: { flex: 1, color: VT.ink }, children: n }),
            /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.ink, fontWeight: 600 }, children: p })
          ] }, n)) }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 8, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx3("div", { style: { aspectRatio: "1/1", borderRadius: 4, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` } }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        /* @__PURE__ */ jsxs3(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u041B\u0418\u0414\u042B \xB7 7 \u0414\u041D\u0415\u0419" }),
          /* @__PURE__ */ jsxs3("div", { style: { fontSize: 28, fontWeight: 700, marginTop: 6 }, children: [
            "4 ",
            /* @__PURE__ */ jsx3("span", { style: { fontSize: 12, fontWeight: 500, color: VT.success }, children: "+1 \u0441\u0435\u0433\u043E\u0434\u043D\u044F" })
          ] }),
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }, children: [
            ["\u0410\u043D\u043D\u0430 \u041F***", "+7***1234", "2 \u0447"],
            ["\u0421\u0435\u0440\u0433\u0435\u0439 \u041C***", "@ser***", "6 \u0447"],
            ["\u041C\u0430\u0440\u0438\u044F \u041A***", "+7***5678", "1 \u0434"],
            ["\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0420***", "al***@gmail", "3 \u0434"]
          ].map(([n, c, ago]) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, padding: "6px 0", borderBottom: `1px dashed ${VT.line}` }, children: [
            /* @__PURE__ */ jsx3("span", { style: { fontWeight: 500 }, children: n }),
            /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: c }),
            /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 11 }, children: ago })
          ] }, n)) }),
          /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", style: { marginTop: 8, color: VT.accent }, children: "\u0412\u0441\u0435 \u043B\u0438\u0434\u044B \u2192" })
        ] }),
        /* @__PURE__ */ jsxs3(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SYNC HISTORY" }),
          /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10, fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft, lineHeight: 1.7 }, children: [
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { style: { color: VT.success }, children: "\u2713" }),
              " 2026-05-19 06:00 \xB7 2 \u043D\u043E\u0432\u044B\u0445 \u0444\u043E\u0442\u043E"
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { style: { color: VT.success }, children: "\u2713" }),
              " 2026-05-12 06:00 \xB7 no diff"
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { style: { color: VT.success }, children: "\u2713" }),
              " 2026-05-05 06:00 \xB7 5 \u043D\u043E\u0432\u044B\u0445 \u043F\u043E\u0441\u0442\u043E\u0432"
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { style: { color: VT.warn }, children: "\u23F8" }),
              " 2026-04-28 06:00 \xB7 TG bot kicked, retry 1/3"
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { style: { color: VT.success }, children: "\u2713" }),
              " 2026-04-21 06:00 \xB7 1 \u043D\u043E\u0432\u043E\u0435 \u0444\u043E\u0442\u043E"
            ] })
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
var LEADS_DATA = [
  ["studia-anna.samosite.online", "\u0410\u043D\u043D\u0430 \u041F***", "+7***1234", "\xAB\u0425\u043E\u0447\u0443 \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \u0432 \u0441\u0443\u0431\u0431\u043E\u0442\u0443 \u0434\u043D\u0451\u043C, \u0435\u0441\u043B\u0438 \u0435\u0441\u0442\u044C \u043E\u043A\u043D\u043E\xBB", "2026-05-19 12:22"],
  ["barber-samara.samosite.online", "\u0421\u0435\u0440\u0433\u0435\u0439 \u041C***", "@ser***", "\xAB\u041C\u043E\u0436\u043D\u043E \u043B\u0438 \u043F\u043E\u0441\u0442\u0440\u0438\u0447\u044C\u0441\u044F \u0437\u0430\u0432\u0442\u0440\u0430 \u0432 \u043E\u0431\u0435\u0434?\xBB", "2026-05-19 11:08"],
  ["lashes-dom.samosite.online", "\u041C\u0430\u0440\u0438\u044F \u041A***", "+7***5678", "\xAB\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u043E\u0438\u0442 \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u043D\u0438\u0446?\xBB", "2026-05-19 10:44"],
  ["fit-studio-msk.samosite.online", "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0420***", "al***@gmail", "\u2014", "2026-05-19 09:30"],
  ["konditer-katya.samosite.online", "\u041E\u043B\u044C\u0433\u0430 \u0422***", "+7***9012", "\xAB\u0422\u043E\u0440\u0442 \u043D\u0430 \u0441\u0432\u0430\u0434\u044C\u0431\u0443 12 \u0438\u044E\u043B\u044F, \u043D\u0430 80 \u0447\u0435\u043B\u043E\u0432\u0435\u043A, \u043C\u0435\u0434\u043E\u0432\u0438\u043A\xBB", "2026-05-19 08:12"]
];
function S16_Leads({ decryptModal = false }) {
  return /* @__PURE__ */ jsx3(AdminChrome, { active: "leads", children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px", position: "relative" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "\u041B\u0418\u0414\u042B" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "CSV (encrypted)" }),
        /* @__PURE__ */ jsx3(Btn, { size: "sm", children: "\u{1F513} \u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C bulk export" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }, children: [
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: "\u0412\u0441\u0435\u0433\u043E: 142 \xB7 7 \u0434\u043D\u0435\u0439: 42 \xB7 \u0441\u0435\u0433\u043E\u0434\u043D\u044F: 6" }),
      /* @__PURE__ */ jsx3(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 11.5 }, children: "\u{1F512} Fernet AES-128 \xB7 \u043A\u043B\u044E\u0447 \u0432 FERNET_KEY env" })
    ] }),
    /* @__PURE__ */ jsx3(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs3("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
      /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsx3("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["\u0421\u0430\u0439\u0442", "\u0418\u043C\u044F", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435", "\u041A\u043E\u0433\u0434\u0430", ""].map((h) => /* @__PURE__ */ jsx3("th", { style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h)) }) }),
      /* @__PURE__ */ jsx3("tbody", { children: LEADS_DATA.map(([site, name, contact, msg, ts]) => /* @__PURE__ */ jsxs3("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: site }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", fontWeight: 500 }, children: name }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: contact }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 360, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: msg }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5, color: VT.inkFaint }, children: ts }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", style: { fontSize: 12 }, children: "\u{1F513} \u0440\u0430\u0441\u043A\u0440\u044B\u0442\u044C" }) })
      ] }, site + ts)) })
    ] }) }),
    /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 10, display: "block" }, children: "\u041A\u0430\u0436\u0434\u044B\u0439 decrypt \u043F\u0438\u0448\u0435\u0442\u0441\u044F \u0432 audit log \u0441 admin_id, ip, lead_id, ts. FR-053: \u043C\u0430\u0441\u043A\u0438 \u0432 \u043B\u043E\u0433\u0430\u0445." }),
    decryptModal && /* @__PURE__ */ jsx3("div", { style: {
      position: "absolute",
      inset: 0,
      background: "rgba(0,0,0,0.32)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }, children: /* @__PURE__ */ jsxs3(Card, { style: { width: 360, padding: 24, background: VT.bg }, children: [
      /* @__PURE__ */ jsx3("h3", { style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 TOTP" }),
      /* @__PURE__ */ jsx3("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: "Bulk export \u0440\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u0442 142 \u043B\u0438\u0434\u0430. \u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043A\u043E\u0434." }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", gap: 6 }, children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx3("div", { style: { flex: 1, aspectRatio: "1 / 1.2", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }, children: "\u2022" }, i)) }),
      /* @__PURE__ */ jsxs3("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", style: { flex: 1 }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx3(Btn, { size: "sm", style: { flex: 1 }, children: "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C" })
      ] })
    ] }) })
  ] }) });
}
var WAITLIST_DATA = [
  ["instagram", "Instagram (\u043F\u0440\u044F\u043C\u043E\u0439 \u043F\u0430\u0440\u0441\u0438\u043D\u0433)", 24, "2026-04-03", "high"],
  ["vk", "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435", 18, "2026-03-28", "high"],
  ["2gis", "2GIS", 11, "2026-04-12", "high"],
  ["avito", "Avito", 7, "2026-04-05", "low"],
  ["whatsapp", "WhatsApp Catalog", 6, "2026-04-19", "low"],
  ["youtube", "YouTube / Shorts", 4, "2026-05-01", "low"],
  ["max", "MAX-\u043A\u0430\u043D\u0430\u043B", 3, "2026-04-22", "low"],
  ["dzen", "\u0414\u0437\u0435\u043D", 2, "2026-05-08", "low"],
  ["own_site", "\u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442", 2, "2026-05-11", "low"]
];
function S17_Waitlist() {
  return /* @__PURE__ */ jsx3(AdminChrome, { active: "waitlist", children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "WAITLIST \xB7 ADR-0009" }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 6px" }, children: /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0413\u043E\u043B\u043E\u0441\u0430 \u043F\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C" }) }),
    /* @__PURE__ */ jsxs3("p", { style: { fontSize: 14, color: VT.inkSoft, margin: "0 0 22px", maxWidth: 680 }, children: [
      "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E ",
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12 }, children: "source_name" }),
      " \xB7 \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \xB7 \u043F\u0435\u0440\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435. \u0417\u0435\u043B\u0451\u043D\u044B\u043C \u2014 \u226510 \u0433\u043E\u043B\u043E\u0441\u043E\u0432, \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C ADR."
    ] }),
    /* @__PURE__ */ jsx3(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs3("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 }, children: [
      /* @__PURE__ */ jsx3("thead", { children: /* @__PURE__ */ jsx3("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0413\u043E\u043B\u043E\u0441\u043E\u0432", "\u041F\u0435\u0440\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435", ""].map((h) => /* @__PURE__ */ jsx3("th", { style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h)) }) }),
      /* @__PURE__ */ jsx3("tbody", { children: WAITLIST_DATA.map(([key, name, votes, first, prio]) => /* @__PURE__ */ jsxs3("tr", { style: {
        borderBottom: `1px solid ${VT.lineSoft}`,
        background: prio === "high" ? "oklch(0.97 0.03 145 / 0.5)" : "transparent"
      }, children: [
        /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, padding: "2px 7px", background: VT.bgSoft, borderRadius: 4 }, children: key }),
          /* @__PURE__ */ jsx3("span", { style: { fontWeight: 500 }, children: name })
        ] }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 22, fontWeight: 700, color: prio === "high" ? VT.success : VT.ink }, children: votes }),
          prio === "high" && /* @__PURE__ */ jsx3(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: "\u2265 10 \xB7 \u041F\u041E\u0420\u0410" })
        ] }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: first }) }),
        /* @__PURE__ */ jsx3("td", { style: { padding: "14px 16px", textAlign: "right" }, children: prio === "high" ? /* @__PURE__ */ jsx3(Btn, { size: "sm", children: "\u0423\u0432\u0435\u0434\u043E\u043C\u0438\u0442\u044C waitlist" }) : /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", style: { color: VT.inkFaint }, children: "\u2014" }) })
      ] }, key)) })
    ] }) })
  ] }) });
}
var FEEDBACK_DATA = [
  ["#F-238", "feature_request", "an***@gmail", "\xAB\u0425\u043E\u0447\u0443 YCLIENTS \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044E, \u0438\u043D\u0430\u0447\u0435 \u0444\u0440\u043E\u043D\u0442-\u043E\u0444\u0438\u0441 \u0432\u0435\u0434\u0443\u0442 \u043F\u043E \u0434\u0432\u0443\u043C \u043E\u043A\u043D\u0430\u043C\xBB", ["yclients"], "12 \u043C\u0438\u043D"],
  ["#F-237", "source_request", "+7***5678", "Instagram \u043D\u0443\u0436\u0435\u043D \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u043C\u043D\u043E\u0433\u043E \u043A\u0442\u043E \u043F\u0440\u043E\u0441\u0438\u0442", ["instagram"], "2 \u0447"],
  ["#F-236", "bug", "st***@yandex", "\xAB\u041F\u043E\u0441\u043B\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u0438 \u0444\u0430\u0432\u0438\u043A\u043E\u043D \u043D\u0435 \u043F\u043E\u0434\u0442\u044F\u043D\u0443\u043B\u0441\u044F\xBB", [], "4 \u0447"],
  ["#F-235", "feature_request", "@les***", "\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \xAB\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435\xBB", ["custom_domain", "no_watermark"], "8 \u0447"],
  ["#F-234", "general", "ma***@gmail", "\xAB\u0421\u043F\u0430\u0441\u0438\u0431\u043E! \u0423\u0436\u0435 3 \u043B\u0438\u0434\u0430 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E\xBB", [], "1 \u0434"]
];
function FbTypePill({ type }) {
  const m = {
    source_request: ["\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A", VT.infoSoft, "oklch(0.38 0.10 240)"],
    feature_request: ["\u0444\u0438\u0447\u0430", VT.accentSoft, VT.accentInk],
    bug: ["\u0431\u0430\u0433", VT.dangerSoft, "oklch(0.42 0.15 28)"],
    general: ["\u0434\u0440\u0443\u0433\u043E\u0435", VT.bgSoft, VT.inkSoft]
  }[type];
  return /* @__PURE__ */ jsx3("span", { style: { display: "inline-flex", padding: "2px 8px", borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: "0.06em" }, children: m[0].toUpperCase() });
}
function S18_FeedbackInbox() {
  return /* @__PURE__ */ jsx3(AdminChrome, { active: "feedback", children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "FEEDBACK INBOX" }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" }) }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", gap: 6, marginBottom: 14 }, children: [
      ["\u0412\u0441\u0435", 142, true],
      ["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", 56, false],
      ["\u0424\u0438\u0447\u0430", 48, false],
      ["\u0411\u0430\u0433", 12, false],
      ["\u0414\u0440\u0443\u0433\u043E\u0435", 26, false]
    ].map(([label, count, active]) => /* @__PURE__ */ jsxs3("button", { style: {
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
      cursor: "pointer"
    }, children: [
      label,
      " ",
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
    ] }, label)) }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsx3(Card, { style: { padding: 0, overflow: "hidden" }, children: FEEDBACK_DATA.map(([id, type, contact, msg, checks, ago], i) => /* @__PURE__ */ jsxs3("div", { style: {
        padding: "14px 16px",
        borderBottom: i < FEEDBACK_DATA.length - 1 ? `1px solid ${VT.lineSoft}` : "none",
        background: i === 0 ? VT.accentSoft : "transparent",
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5 }, children: id }),
          /* @__PURE__ */ jsx3(FbTypePill, { type }),
          /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: ago })
        ] }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4 }, children: msg }),
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: contact })
      ] }, id)) }),
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx3(Mono, { children: "#F-238" }),
          /* @__PURE__ */ jsx3(FbTypePill, { type: "feature_request" }),
          /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: "2026-05-19 14:22" })
        ] }),
        /* @__PURE__ */ jsx3("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: "\u0417\u0430\u043F\u0440\u043E\u0441 \u0444\u0438\u0447\u0438" }),
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: "an***@gmail" }),
        /* @__PURE__ */ jsx3("p", { style: { fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: "14px 0 18px" }, children: "\xAB\u0425\u043E\u0447\u0443 YCLIENTS \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044E, \u0438\u043D\u0430\u0447\u0435 \u0444\u0440\u043E\u043D\u0442-\u043E\u0444\u0438\u0441 \u0432\u0435\u0434\u0443\u0442 \u043F\u043E \u0434\u0432\u0443\u043C \u043E\u043A\u043D\u0430\u043C \u2014 \u0440\u0430\u0437\u0434\u0440\u0430\u0436\u0430\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u043A. \u0413\u043E\u0442\u043E\u0432\u0430 \u0434\u043E\u043F\u043B\u0430\u0447\u0438\u0432\u0430\u0442\u044C.\xBB" }),
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "CHECKBOXES \xB7 JSONB" }),
        /* @__PURE__ */ jsx3("pre", { style: {
          margin: "6px 0 0",
          padding: 14,
          background: VT.bgSoft,
          border: `1px solid ${VT.line}`,
          borderRadius: VT.r.sm,
          fontFamily: VT.font.mono,
          fontSize: 12,
          lineHeight: 1.55,
          color: VT.inkSoft
        }, children: `{
  "features": ["yclients"],
  "sources": [],
  "other_feature": null,
  "other_source": null
}` }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: 16, display: "flex", gap: 8 }, children: [
          /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "\u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C" }),
          /* @__PURE__ */ jsx3(Btn, { variant: "secondary", size: "sm", children: "\u2192 \u0432 backlog" }),
          /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", style: { color: VT.inkFaint, marginLeft: "auto" }, children: "\u0410\u0440\u0445\u0438\u0432" })
        ] })
      ] })
    ] })
  ] }) });
}
function HealthRow({ name, status, latency, note }) {
  const ok = status === "ok";
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${VT.lineSoft}` }, children: [
    /* @__PURE__ */ jsx3("span", { style: { width: 10, height: 10, borderRadius: "50%", background: ok ? VT.success : VT.danger, boxShadow: `0 0 0 4px ${ok ? VT.successSoft : VT.dangerSoft}` } }),
    /* @__PURE__ */ jsx3("span", { style: { fontSize: 14, fontWeight: 500, minWidth: 120 }, children: name }),
    /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: status.toUpperCase() }),
    /* @__PURE__ */ jsx3(Mono, { style: { marginLeft: "auto", fontSize: 12, color: VT.inkFaint }, children: latency }),
    /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5, color: VT.inkFaint, minWidth: 220, textAlign: "right" }, children: note })
  ] });
}
function S19_Settings() {
  return /* @__PURE__ */ jsx3(AdminChrome, { active: "settings", children: /* @__PURE__ */ jsxs3("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx3(Eyebrow, { children: "SETTINGS \xB7 SYSTEM" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx3("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430" }),
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 12, color: VT.inkFaint }, children: "uptime \xB7 14 \u0434\u043D\u0435\u0439 3 \u0447\u0430\u0441\u0430" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "HEALTH CHECKS" }),
        /* @__PURE__ */ jsxs3("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx3(HealthRow, { name: "PostgreSQL", status: "ok", latency: "3 ms", note: "14/20 connections" }),
          /* @__PURE__ */ jsx3(HealthRow, { name: "Redis", status: "ok", latency: "0.4 ms", note: "cache hit rate 92%" }),
          /* @__PURE__ */ jsx3(HealthRow, { name: "S3 (Selectel)", status: "ok", latency: "42 ms", note: "bucket vitrina-sites" }),
          /* @__PURE__ */ jsx3(HealthRow, { name: "YandexGPT 5 Pro", status: "ok", latency: "1.2 s", note: "\u043A\u0432\u043E\u0442\u0430: 1240/5000 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432" }),
          /* @__PURE__ */ jsx3(HealthRow, { name: "Yandex SmartCaptcha", status: "ok", latency: "180 ms", note: "\u2014" }),
          /* @__PURE__ */ jsx3(HealthRow, { name: "TG Bot API", status: "ok", latency: "220 ms", note: "\u2014" }),
          /* @__PURE__ */ jsx3(HealthRow, { name: "Caddy / wildcard SSL", status: "ok", latency: "\u2014", note: "cert exp \u0432 47 \u0434\u043D\u044F\u0445" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SECRETS \xB7 ROTATION" }),
        /* @__PURE__ */ jsx3("div", { style: { marginTop: 10, fontSize: 13 }, children: [
          ["FERNET_KEY", "142 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", "warn"],
          ["DATABASE_URL", "8 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434", "ok"],
          ["TG_BOT_TOKEN", "23 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", "ok"],
          ["YANDEX_GPT_API_KEY", "8 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434", "ok"],
          ["SMARTCAPTCHA_KEY", "54 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", "ok"],
          ["SMTP_PASSWORD", "210 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434", "warn"]
        ].map(([name, ago, lvl]) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: `1px dashed ${VT.line}` }, children: [
          /* @__PURE__ */ jsx3(Mono, { style: { flex: 1, fontSize: 12 }, children: name }),
          /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11.5, color: VT.inkSoft }, children: ago }),
          lvl === "warn" && /* @__PURE__ */ jsx3(Badge, { kind: "warn", style: { padding: "1px 7px", fontSize: 10, borderRadius: 4 }, children: "ROTATE" })
        ] }, name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3(Card, { style: { padding: 22, marginTop: 14 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center" }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "ADMIN ACTIONS \xB7 \u041F\u041E\u0421\u041B\u0415\u0414\u041D\u0418\u0415 20" }),
        /* @__PURE__ */ jsx3(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "\u044D\u043A\u0441\u043F\u043E\u0440\u0442 JSONL" })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 10, fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft, lineHeight: 1.7 }, children: [
        ["14:22:18", "founder", "lead.decrypt", "lead_id=8124 \xB7 site=studia-anna"],
        ["14:12:04", "founder", "site.publish", "#A-1837 \u2192 barber-samara"],
        ["13:48:11", "founder", "application.reject", "#A-1836 \xB7 reason=spam"],
        ["12:30:55", "founder", "lead.bulk_decrypt", "count=12 \xB7 totp_verified=true"],
        ["11:02:00", "system", "sync.run", "34 sites \xB7 5 diff \xB7 0 errors"],
        ["09:15:33", "founder", "application.publish", "#A-1834 \u2192 psy-marina"],
        ["08:48:12", "founder", "feedback.reply", "#F-235"],
        ["07:00:00", "system", "cron.daily_summary", "sent TG"]
      ].map((r, i) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 10 }, children: [
        /* @__PURE__ */ jsx3("span", { style: { color: VT.inkFaint }, children: r[0] }),
        /* @__PURE__ */ jsx3("span", { style: { color: r[1] === "system" ? VT.info : VT.accent, width: 64 }, children: r[1] }),
        /* @__PURE__ */ jsx3("span", { style: { color: VT.ink, width: 160 }, children: r[2] }),
        /* @__PURE__ */ jsx3("span", { style: { flex: 1 }, children: r[3] })
      ] }, i)) })
    ] })
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
