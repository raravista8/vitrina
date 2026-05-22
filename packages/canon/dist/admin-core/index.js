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
function S10_AdminLogin({ step = 1, rateLimited = false }) {
  return /* @__PURE__ */ jsx2("div", { style: {
    background: VT.bgSoft,
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: VT.font.sans,
    padding: 24
  }, children: /* @__PURE__ */ jsxs2(Card, { style: { width: 400, padding: 28 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsx2("span", { style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.white } }),
      /* @__PURE__ */ jsx2("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
      /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 7px", fontSize: 10 }, children: "ADMIN" })
    ] }),
    /* @__PURE__ */ jsx2("h1", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }, children: step === 1 ? "\u0412\u0445\u043E\u0434 \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0443" : "\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F" }),
    /* @__PURE__ */ jsx2("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: "0 0 18px" }, children: step === 1 ? "\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F founder. \u0412\u0441\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F." : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F-\u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430." }),
    rateLimited && /* @__PURE__ */ jsxs2("div", { style: {
      padding: "10px 12px",
      background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`,
      borderRadius: VT.r.md,
      fontSize: 13,
      color: "oklch(0.4 0.15 28)",
      marginBottom: 14,
      display: "flex",
      alignItems: "center",
      gap: 8
    }, children: [
      /* @__PURE__ */ jsx2("span", { children: "\u26A0\uFE0F" }),
      /* @__PURE__ */ jsx2("span", { children: "5 \u043D\u0435\u0443\u0434\u0430\u0447 \u0437\u0430 15 \u043C\u0438\u043D \u2014 IP \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430 1 \u0447\u0430\u0441. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C 47:23." })
    ] }),
    step === 1 ? /* @__PURE__ */ jsxs2(Fragment2, { children: [
      /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "Email" }),
      /* @__PURE__ */ jsx2("div", { style: { padding: "10px 12px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 14, marginBottom: 10, fontFamily: VT.font.mono }, children: "founder@samosite.online" }),
      /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
      /* @__PURE__ */ jsx2("div", { style: { padding: "10px 12px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 14, color: VT.inkFaint, fontFamily: VT.font.mono }, children: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" })
    ] }) : /* @__PURE__ */ jsxs2(Fragment2, { children: [
      /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 6 }, children: "\u041A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430" }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 8 }, children: [1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx2("div", { style: {
        flex: 1,
        aspectRatio: "1 / 1.2",
        background: VT.white,
        border: `1.5px solid ${i <= 4 ? VT.accent : VT.line}`,
        borderRadius: VT.r.sm,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: VT.font.mono,
        fontSize: 20,
        fontWeight: 600
      }, children: i <= 4 ? "\u2022" : "" }, i)) }),
      /* @__PURE__ */ jsx2("a", { style: { display: "inline-block", marginTop: 12, fontSize: 13, color: VT.accent, textDecoration: "underline", textUnderlineOffset: 3 }, children: "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C backup-\u043A\u043E\u0434" })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx2(Btn, { style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: step === 1 ? "\u0414\u0430\u043B\u044C\u0448\u0435" : "\u0412\u043E\u0439\u0442\u0438" }) })
  ] }) });
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
function TrendChart({ height = 200 }) {
  const points = [12, 18, 14, 22, 28, 24, 32, 38, 30, 42, 48, 44, 52];
  const max = Math.max(...points);
  const w = 720;
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i / (points.length - 1) * w} ${height - 30 - p / max * (height - 50)}`).join(" ");
  const area = path + ` L ${w} ${height - 30} L 0 ${height - 30} Z`;
  return /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${w} ${height}`, width: "100%", height, preserveAspectRatio: "none", children: [
    /* @__PURE__ */ jsx2("path", { d: area, fill: VT.accentSoft, opacity: "0.7" }),
    /* @__PURE__ */ jsx2("path", { d: path, fill: "none", stroke: VT.accent, strokeWidth: "2" }),
    points.map((p, i) => /* @__PURE__ */ jsx2("circle", { cx: i / (points.length - 1) * w, cy: height - 30 - p / max * (height - 50), r: "3", fill: VT.bg, stroke: VT.accent, strokeWidth: "1.5" }, i)),
    ["\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431", "\u0412\u0441"].map((l, i) => /* @__PURE__ */ jsx2("text", { x: i / 6 * w, y: height - 8, fontSize: "11", fill: VT.inkFaint, fontFamily: "JetBrains Mono, monospace", textAnchor: i === 0 ? "start" : i === 6 ? "end" : "middle", children: l }, l))
  ] });
}
function S11_Dashboard() {
  return /* @__PURE__ */ jsx2(AdminChrome, { active: "dash", children: /* @__PURE__ */ jsxs2("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2(Eyebrow, { children: "DASHBOARD" }),
        /* @__PURE__ */ jsx2("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "10px 0 0" }, children: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "7 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: "30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }, children: [
      /* @__PURE__ */ jsx2(StatTile, { label: "\u0417\u0430\u044F\u0432\u043E\u043A \u0441\u0435\u0433\u043E\u0434\u043D\u044F", value: "8", delta: "+3", deltaSign: "+", sub: "\u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E 52" }),
      /* @__PURE__ */ jsx2(StatTile, { label: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E", value: "34", delta: "2", deltaSign: "+", sub: "\u0437\u0430 \u043C\u0435\u0441\u044F\u0446" }),
      /* @__PURE__ */ jsx2(StatTile, { label: "Pending", value: "12", sub: "\u0432 \u043E\u0447\u0435\u0440\u0435\u0434\u0438 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438" }),
      /* @__PURE__ */ jsx2(StatTile, { label: "Feedback inbox", value: "6", sub: "\u043D\u043E\u0432\u044B\u0445" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginTop: 14 }, children: [
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0417\u0410\u042F\u0412\u041A\u0418 \xB7 7 \u0414\u041D\u0415\u0419" }),
            /* @__PURE__ */ jsxs2("div", { style: { fontSize: 20, fontWeight: 700, marginTop: 4 }, children: [
              "52 ",
              /* @__PURE__ */ jsx2("span", { style: { fontSize: 12, fontWeight: 500, color: VT.success }, children: "+24% vs \u043F\u0440\u043E\u0448\u043B\u0430\u044F" })
            ] })
          ] }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "CSV" })
        ] }),
        /* @__PURE__ */ jsx2(TrendChart, {})
      ] }),
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "QUICK \xB7 \u0422\u041E\u041F-5 PENDING" }),
          /* @__PURE__ */ jsx2("a", { style: { fontSize: 12, color: VT.accent, textDecoration: "underline" }, children: "\u0432\u0441\u0435 \u2192" })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
          ["#A-1842", "TG", "studia-anna \xB7 47 \u043F\u043E\u0441\u0442\u043E\u0432", "12 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1841", "YM", "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \u0421\u0430\u043C\u0430\u0440\u0430 \xB7 24 \u043E\u0442\u0437.", "34 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1840", "Photo", "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u041C\u0430\u0440\u0438\u043D\u0430 \xB7 12 \u0444\u043E\u0442\u043E", "1 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1839", "TG", "\u0414\u043E\u043C \u0440\u0435\u0441\u043D\u0438\u0446 \xB7 89 \u043F\u043E\u0441\u0442\u043E\u0432", "2 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1838", "YM", "\u0421\u0442\u0443\u0434\u0438\u044F \u0439\u043E\u0433\u0438 \xB7 56 \u043E\u0442\u0437.", "3 \u0447 \u043D\u0430\u0437\u0430\u0434"]
        ].map(([id, src, name, ago]) => /* @__PURE__ */ jsxs2("a", { style: {
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "8px 10px",
          borderRadius: VT.r.sm,
          cursor: "pointer",
          fontSize: 13,
          borderBottom: `1px solid ${VT.lineSoft}`
        }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, width: 56 }, children: id }),
          /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { padding: "2px 7px", fontSize: 10.5, borderRadius: 4 }, children: src }),
          /* @__PURE__ */ jsx2("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11 }, children: ago })
        ] }, id)) })
      ] })
    ] })
  ] }) });
}
function StatusPill({ status }) {
  const map = {
    new: ["kind=info", "\u043D\u043E\u0432\u0430\u044F", VT.infoSoft, "oklch(0.38 0.10 240)"],
    parsing: ["kind=info", "\u043F\u0430\u0440\u0441\u0438\u0442\u0441\u044F", VT.infoSoft, "oklch(0.38 0.10 240)"],
    generated: ["kind=warn", "\u0433\u043E\u0442\u043E\u0432", VT.warnSoft, "oklch(0.40 0.13 70)"],
    published: ["kind=success", "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D", VT.successSoft, "oklch(0.34 0.12 145)"],
    rejected: ["kind=danger", "\u043E\u0442\u043A\u043B\u043E\u043D\u0451\u043D", VT.dangerSoft, "oklch(0.42 0.15 28)"],
    rework: ["kind=warn", "\u043F\u0435\u0440\u0435\u0434\u0435\u043B\u043A\u0430", VT.warnSoft, "oklch(0.40 0.13 70)"]
  }[status] || ["neutral", status, VT.bgSoft, VT.inkSoft];
  return /* @__PURE__ */ jsxs2("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "3px 9px",
    borderRadius: 999,
    background: map[2],
    color: map[3],
    fontSize: 11.5,
    fontWeight: 500
  }, children: [
    /* @__PURE__ */ jsx2("span", { style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    map[1]
  ] });
}
function FilterChip({ label, active, count }) {
  return /* @__PURE__ */ jsxs2("button", { style: {
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
    count != null && /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
  ] });
}
var APPS_DATA = [
  ["#A-1842", "2026-05-19 14:22", "telegram", "t.me/studia_anna", "an***@gmail", "new"],
  ["#A-1841", "2026-05-19 13:48", "yandex_maps", "yandex.ru/maps/...", "+7***1234", "parsing"],
  ["#A-1840", "2026-05-19 12:15", "photo", "\u2014 \xB7 12 \u0444\u0430\u0439\u043B\u043E\u0432", "@mar***", "new"],
  ["#A-1839", "2026-05-19 11:02", "telegram", "t.me/lashes_dom", "+7***5678", "generated"],
  ["#A-1838", "2026-05-19 09:30", "yandex_maps", "yandex.ru/maps/...", "st***@yandex", "parsing"],
  ["#A-1837", "2026-05-18 18:44", "telegram", "t.me/barber_samara", "@ser***", "published"],
  ["#A-1836", "2026-05-18 17:22", "photo", "\u2014 \xB7 24 \u0444\u0430\u0439\u043B\u0430", "ku***@mail", "rejected"],
  ["#A-1835", "2026-05-18 15:10", "yandex_maps", "yandex.ru/maps/...", "+7***9012", "published"],
  ["#A-1834", "2026-05-18 13:05", "telegram", "t.me/psychomarina", "ma***@gmail", "rework"],
  ["#A-1833", "2026-05-18 11:48", "yandex_maps", "yandex.ru/maps/...", "@fit***", "published"]
];
function S12_AppsList() {
  return /* @__PURE__ */ jsx2(AdminChrome, { active: "apps", children: /* @__PURE__ */ jsxs2("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx2(Eyebrow, { children: "\u0417\u0410\u042F\u0412\u041A\u0418" }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx2("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438" }),
      /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx2(FilterChip, { label: "\u0412\u0441\u0435", count: 142 }),
        /* @__PURE__ */ jsx2(FilterChip, { label: "\u041D\u043E\u0432\u044B\u0435", count: 8, active: true }),
        /* @__PURE__ */ jsx2(FilterChip, { label: "\u041F\u0430\u0440\u0441\u044F\u0442\u0441\u044F", count: 4 }),
        /* @__PURE__ */ jsx2(FilterChip, { label: "\u0413\u043E\u0442\u043E\u0432\u044B", count: 2 }),
        /* @__PURE__ */ jsx2(FilterChip, { label: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u044B", count: 34 }),
        /* @__PURE__ */ jsx2(FilterChip, { label: "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u044B", count: 6 })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { marginLeft: "auto", display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxs2("div", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 12px",
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 13,
        color: VT.inkFaint,
        minWidth: 240
      }, children: [
        /* @__PURE__ */ jsxs2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsx2("circle", { cx: "11", cy: "11", r: "7" }),
          /* @__PURE__ */ jsx2("path", { d: "M21 21l-4.3-4.3", strokeLinecap: "round" })
        ] }),
        "\u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443, ID, \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs2(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs2("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx2("thead", { children: /* @__PURE__ */ jsx2("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["ID", "\u0421\u043E\u0437\u0434\u0430\u043D\u0430", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0421\u0442\u0430\u0442\u0443\u0441", ""].map((h) => /* @__PURE__ */ jsx2("th", { style: {
          textAlign: "left",
          padding: "12px 16px",
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.inkFaint,
          fontWeight: 500
        }, children: h.toUpperCase() }, h)) }) }),
        /* @__PURE__ */ jsx2("tbody", { children: APPS_DATA.map(([id, ts, src, url, contact, status]) => /* @__PURE__ */ jsxs2("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: "pointer" }, children: [
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(Mono, { children: id }) }),
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px", color: VT.inkSoft }, children: /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: ts }) }),
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: src }) }),
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: url }) }),
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: contact }) }),
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(StatusPill, { status }) }),
          /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "\u2192" }) })
        ] }, id)) })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsx2("span", { children: "1\u201310 \u0438\u0437 142" }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "\u2190" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: "1" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "2" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "3" }),
          /* @__PURE__ */ jsx2(Mono, { style: { alignSelf: "center" }, children: "\u2026" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "15" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "\u2192" })
        ] })
      ] })
    ] })
  ] }) });
}
function JsonTree() {
  const lines = [
    ["{", VT.inkSoft],
    ['  "source": ', VT.inkSoft, '"telegram"', VT.success],
    ['  "channel": ', VT.inkSoft, '"@studia_anna"', VT.accent],
    ['  "stats": {', VT.inkSoft],
    ['    "posts": ', VT.inkSoft, "47", VT.ink],
    ['    "photos": ', VT.inkSoft, "12", VT.ink],
    ['    "subscribers": ', VT.inkSoft, "342", VT.ink],
    ["  },", VT.inkSoft],
    ['  "title": ', VT.inkSoft, '"\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440"', VT.accent],
    ['  "city": ', VT.inkSoft, '"\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A"', VT.accent],
    ['  "fetched_at": ', VT.inkSoft, '"2026-05-19T14:22:18Z"', VT.accent],
    ["}", VT.inkSoft]
  ];
  return /* @__PURE__ */ jsx2("pre", { style: { margin: 0, fontFamily: VT.font.mono, fontSize: 12.5, lineHeight: 1.55, color: VT.inkSoft }, children: lines.map((row, i) => /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("span", { style: { color: row[1] }, children: row[0] }),
    row[2] && /* @__PURE__ */ jsx2("span", { style: { color: row[3] }, children: row[2] })
  ] }, i)) });
}
function S13_AppDetail() {
  return /* @__PURE__ */ jsx2(AdminChrome, { active: "apps", children: /* @__PURE__ */ jsxs2("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx2("a", { style: { color: VT.inkFaint }, children: "\u0417\u0430\u044F\u0432\u043A\u0438" }),
      /* @__PURE__ */ jsx2("span", { children: "/" }),
      /* @__PURE__ */ jsx2(Mono, { style: { color: VT.ink }, children: "#A-1842" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440" }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: VT.inkSoft }, children: [
          /* @__PURE__ */ jsx2(Mono, { children: "t.me/studia_anna" }),
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2("span", { children: "an***@gmail" }),
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2(Mono, { children: "2026-05-19 14:22" }),
          /* @__PURE__ */ jsx2(StatusPill, { status: "new" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "\u0417\u0430\u043F\u0440\u043E\u0441\u0438\u0442\u044C \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u043A\u0443" }),
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", style: { color: VT.danger, border: `1px solid ${VT.dangerSoft}` }, children: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C" }),
        /* @__PURE__ */ jsx2(Btn, { size: "sm", iconRight: /* @__PURE__ */ jsx2(IconArrow, { size: 14 }), children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE SNAPSHOT \xB7 JSON" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "raw" })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: {
          background: VT.bgSoft,
          borderRadius: VT.r.sm,
          padding: 14,
          border: `1px solid ${VT.line}`,
          maxHeight: 280,
          overflow: "auto"
        }, children: /* @__PURE__ */ jsx2(JsonTree, {}) })
      ] }),
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "GENERATED CONTENT" }),
          /* @__PURE__ */ jsx2(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: "\u2713 sanitized" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "\u2197 preview" })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { background: VT.bgSoft, borderRadius: VT.r.sm, padding: 14, border: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.accent, letterSpacing: "0.1em", marginBottom: 6 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx2("div", { style: { fontWeight: 700, fontSize: 20, lineHeight: 1.15, marginBottom: 8 }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, lineHeight: 1.5, color: VT.inkSoft }, children: "\u0420\u0430\u0431\u043E\u0442\u0430\u044E \u0441 2017 \u0433\u043E\u0434\u0430, \u043F\u0440\u043E\u0448\u043B\u0430 \u043A\u0443\u0440\u0441\u044B \u0432 [SCHOOL]. \u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432 \u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u0441\u043F\u0435\u0448\u043A\u0438, \u0441 \u0447\u0430\u0448\u043A\u043E\u0439 \u043A\u043E\u0444\u0435." }),
          /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx2("div", { style: { flex: 1, aspectRatio: "1/1", borderRadius: 6, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` } }, i)) }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }, children: "\u2248 320 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \xB7 \u2248 12 \u20BD \xB7 \u043C\u043E\u0434\u0435\u043B\u044C: YandexGPT 5 Pro" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(Card, { style: { marginTop: 14, padding: 18 }, children: [
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "AUDIT LOG" }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: 10, fontSize: 13, fontFamily: VT.font.mono, color: VT.inkSoft, lineHeight: 1.7 }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:18" }),
          " \xB7 application.submitted \xB7 ip 195.***.***.42"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:19" }),
          " \xB7 parser.tg.start \xB7 @studia_anna"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:34" }),
          " \xB7 parser.tg.ok \xB7 posts=47 photos=12"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:35" }),
          " \xB7 llm.generate.start \xB7 model=yandexgpt-5-pro"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:23:02" }),
          " \xB7 llm.generate.ok \xB7 tokens=320 cost_rub=12.40"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
          " \xB7 sanitize.ok \xB7 bleach.clean allowlist=v1"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
          " \xB7 status.new \u2192 status.awaiting_review"
        ] })
      ] })
    ] })
  ] }) });
}
var AdminLogin = S10_AdminLogin;
var AdminDashboard = S11_Dashboard;
var AppsList = S12_AppsList;
var AppDetail = S13_AppDetail;
export {
  AdminChrome,
  AdminDashboard,
  AdminLogin,
  AppDetail,
  AppsList,
  S10_AdminLogin,
  S11_Dashboard,
  S12_AppsList,
  S13_AppDetail,
  StatTile,
  StatusPill
};
//# sourceMappingURL=index.js.map
