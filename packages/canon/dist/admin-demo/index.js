"use client";

// src/admin-demo/index.tsx
import { useState } from "react";

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
var BRAND = {
  name: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442",
  domain: "samosite.online",
  bot: "@SamositeIntakeBot",
  contactBot: "@SamositeBot"
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
function Mono({ children, style }) {
  return /* @__PURE__ */ jsx("span", { style: { fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, ...style }, children });
}
function Logo({ size = 26 }) {
  const s = size;
  return /* @__PURE__ */ jsx("span", { "aria-label": BRAND.name, style: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: s,
    height: s,
    flex: "0 0 auto",
    borderRadius: Math.round(s * 0.27),
    background: VT.accent,
    color: "#fff",
    fontFamily: "Onest, system-ui, sans-serif",
    fontWeight: 800,
    fontSize: Math.round(s * 0.66),
    letterSpacing: "-0.04em",
    lineHeight: 1,
    paddingBottom: Math.max(1, Math.round(s * 0.04))
  }, children: "\u0421" });
}
function BrandMark({ size = 22, fontSize, color }) {
  return /* @__PURE__ */ jsxs("span", { style: { display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: fontSize || 20, letterSpacing: "-0.02em", color: color || VT.ink }, children: [
    /* @__PURE__ */ jsx(Logo, { size }),
    BRAND.name
  ] });
}

// src/admin-demo/index.tsx
import { Fragment as Fragment3, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DEMO_SITE = {
  name: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B",
  handle: "studia-anna",
  domain: "studia-anna.samosite.online",
  category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
  city: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A",
  publishedAt: "12 \u043C\u0430\u0440\u0442\u0430 2026",
  lastSync: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432 14:02",
  status: "published",
  plan: "990 \u20BD/\u043C\u0435\u0441",
  nextBilling: "15 \u0438\u044E\u043D\u044F 2026"
};
var TABS = [
  { id: "analytics", label: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430", icon: "bar" },
  { id: "site", label: "\u0421\u0430\u0439\u0442", icon: "site" },
  { id: "leads", label: "\u0417\u0430\u044F\u0432\u043A\u0438", icon: "inbox", badge: 3 },
  { id: "reviews", label: "\u041E\u0442\u0437\u044B\u0432\u044B", icon: "star" },
  { id: "services", label: "\u0423\u0441\u043B\u0443\u0433\u0438", icon: "list" },
  { id: "settings", label: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", icon: "gear" }
];
function NavIcon({ kind, size = 18 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (kind) {
    case "bar":
      return /* @__PURE__ */ jsxs2("svg", { ...props, children: [
        /* @__PURE__ */ jsx2("path", { d: "M4 20V12" }),
        /* @__PURE__ */ jsx2("path", { d: "M10 20V6" }),
        /* @__PURE__ */ jsx2("path", { d: "M16 20V14" }),
        /* @__PURE__ */ jsx2("path", { d: "M22 20V9" })
      ] });
    case "site":
      return /* @__PURE__ */ jsxs2("svg", { ...props, children: [
        /* @__PURE__ */ jsx2("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        /* @__PURE__ */ jsx2("path", { d: "M3 8h18" }),
        /* @__PURE__ */ jsx2("circle", { cx: "7", cy: "6", r: "0.5", fill: "currentColor" })
      ] });
    case "inbox":
      return /* @__PURE__ */ jsxs2("svg", { ...props, children: [
        /* @__PURE__ */ jsx2("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
        /* @__PURE__ */ jsx2("path", { d: "M3 14h5l1.5 2h5L16 14h5" })
      ] });
    case "star":
      return /* @__PURE__ */ jsx2("svg", { ...props, fill: "currentColor", stroke: "none", children: /* @__PURE__ */ jsx2("path", { d: "M12 2 L14.5 8.5 L21.5 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.5 9.3 L9.5 8.5 Z" }) });
    case "list":
      return /* @__PURE__ */ jsxs2("svg", { ...props, children: [
        /* @__PURE__ */ jsx2("path", { d: "M8 6h13" }),
        /* @__PURE__ */ jsx2("path", { d: "M8 12h13" }),
        /* @__PURE__ */ jsx2("path", { d: "M8 18h13" }),
        /* @__PURE__ */ jsx2("circle", { cx: "4", cy: "6", r: "1.2" }),
        /* @__PURE__ */ jsx2("circle", { cx: "4", cy: "12", r: "1.2" }),
        /* @__PURE__ */ jsx2("circle", { cx: "4", cy: "18", r: "1.2" })
      ] });
    case "gear":
      return /* @__PURE__ */ jsxs2("svg", { ...props, children: [
        /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ jsx2("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })
      ] });
  }
  return null;
}
function StatCard({ label, value, delta, deltaTone, points, color }) {
  const w = 140, h = 36;
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const xs = points.map((_, i) => i / (points.length - 1) * w);
  const ys = points.map((p) => h - (p - min) / range * (h - 4) - 2);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 6
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 12.5, color: VT.inkFaint, fontWeight: 500, letterSpacing: "-0.005em" }, children: label }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink, lineHeight: 1 }, children: value }),
      /* @__PURE__ */ jsxs2("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 12,
        fontWeight: 600,
        color: deltaTone === "up" ? VT.success : deltaTone === "down" ? VT.danger : VT.inkFaint
      }, children: [
        deltaTone === "up" ? "\u2191" : deltaTone === "down" ? "\u2193" : "",
        " ",
        delta
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, style: { marginTop: 4 }, children: [
      /* @__PURE__ */ jsx2("path", { d: area, fill: color, fillOpacity: "0.12" }),
      /* @__PURE__ */ jsx2("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
    ] })
  ] });
}
function TrafficChart() {
  const days = 30;
  const visits = Array.from({ length: days }, (_, i) => {
    const t = i / days;
    return Math.round(80 + 40 * Math.sin(i * 0.6) + 60 * t + (i % 7 === 0 ? 30 : 0));
  });
  const leads = visits.map((v) => Math.round(v * (0.04 + (Math.sin(v) + 1) * 0.02)));
  const W = 720, H = 260, PAD = { top: 16, right: 16, bottom: 28, left: 36 };
  const inner = { w: W - PAD.left - PAD.right, h: H - PAD.top - PAD.bottom };
  const maxV = Math.max(...visits) * 1.15;
  const xFor = (i) => PAD.left + i / (days - 1) * inner.w;
  const yFor = (v) => PAD.top + inner.h - v / maxV * inner.h;
  const visitsPath = visits.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
  const visitsArea = `${visitsPath} L ${xFor(days - 1)} ${yFor(0)} L ${xFor(0)} ${yFor(0)} Z`;
  const xLabels = [0, 7, 14, 21, 29];
  const xLabelText = ["1 \u043C\u0430\u044F", "8 \u043C\u0430\u044F", "15 \u043C\u0430\u044F", "22 \u043C\u0430\u044F", "30 \u043C\u0430\u044F"];
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "\u0422\u0440\u0430\u0444\u0438\u043A \u0437\u0430 30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, color: VT.inkFaint, marginTop: 2 }, children: "\u041A\u0430\u0436\u0434\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u2014 \u0434\u0435\u043D\u044C. \u0417\u0430\u044F\u0432\u043A\u0438 \u0438\u0434\u0443\u0442 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044F\u043C." })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", gap: 14, fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs2("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { width: 10, height: 10, borderRadius: "50%", background: VT.accent } }),
          "\u041F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"
        ] }),
        /* @__PURE__ */ jsxs2("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { width: 10, height: 2, background: "oklch(0.5 0.13 240)" } }),
          "\u0417\u0430\u044F\u0432\u043A\u0438"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: H, style: { display: "block" }, children: [
      [0, 0.25, 0.5, 0.75, 1].map((t, i) => /* @__PURE__ */ jsxs2("g", { children: [
        /* @__PURE__ */ jsx2(
          "line",
          {
            x1: PAD.left,
            x2: W - PAD.right,
            y1: PAD.top + inner.h * t,
            y2: PAD.top + inner.h * t,
            stroke: VT.lineSoft,
            strokeWidth: "1"
          }
        ),
        /* @__PURE__ */ jsx2("text", { x: PAD.left - 8, y: PAD.top + inner.h * t + 4, fontSize: "10", fill: VT.inkFaint, textAnchor: "end", fontFamily: VT.font.mono, children: Math.round(maxV * (1 - t)) })
      ] }, i)),
      /* @__PURE__ */ jsx2("path", { d: visitsArea, fill: VT.accent, fillOpacity: "0.10" }),
      /* @__PURE__ */ jsx2("path", { d: visitsPath, fill: "none", stroke: VT.accent, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      leads.map((l, i) => /* @__PURE__ */ jsx2(
        "rect",
        {
          x: xFor(i) - 2,
          y: yFor(l * 10),
          width: "4",
          height: PAD.top + inner.h - yFor(l * 10),
          fill: "oklch(0.5 0.13 240)",
          opacity: "0.5",
          rx: "1"
        },
        i
      )),
      xLabels.map((i, k) => /* @__PURE__ */ jsx2("text", { x: xFor(i), y: H - 8, fontSize: "11", fill: VT.inkFaint, textAnchor: "middle", children: xLabelText[k] }, k))
    ] })
  ] });
}
function SourceBreakdown() {
  const sources = [
    { name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", share: 45, color: "#FFCC00" },
    { name: "Telegram", share: 28, color: "#229ED9" },
    { name: "\u041F\u0440\u044F\u043C\u044B\u0435 \u0437\u0430\u0445\u043E\u0434\u044B", share: 15, color: VT.accent },
    { name: "2\u0413\u0418\u0421", share: 8, color: "#19BB4F" },
    { name: "Google", share: 4, color: "oklch(0.55 0.18 25)" }
  ];
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 4 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442" }),
    /* @__PURE__ */ jsxs2("div", { style: { fontSize: 13, color: VT.inkFaint, marginBottom: 16 }, children: [
      "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0441\u0430\u043C\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B. ",
      BRAND.name,
      " \u0434\u0435\u0440\u0436\u0438\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0441\u0432\u0435\u0436\u0435\u0439."
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", height: 14, borderRadius: 7, overflow: "hidden" }, children: sources.map((s) => /* @__PURE__ */ jsx2("span", { style: { width: `${s.share}%`, background: s.color } }, s.name)) }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }, children: sources.map((s) => /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: VT.ink
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: { width: 12, height: 12, borderRadius: 3, background: s.color, flex: "0 0 auto" } }),
      /* @__PURE__ */ jsx2("span", { style: { flex: 1 }, children: s.name }),
      /* @__PURE__ */ jsxs2("b", { style: { fontFamily: VT.font.mono, color: VT.ink }, children: [
        s.share,
        "%"
      ] })
    ] }, s.name)) })
  ] });
}
function AnalyticsTab() {
  return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsx2(
        StatCard,
        {
          label: "\u041F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F / 30 \u0434\u043D\u0435\u0439",
          value: "2 847",
          delta: "+18%",
          deltaTone: "up",
          color: VT.accent,
          points: [210, 198, 215, 240, 232, 260, 275, 290, 280, 295, 310, 325, 345, 360]
        }
      ),
      /* @__PURE__ */ jsx2(
        StatCard,
        {
          label: "\u0423\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u0438",
          value: "1 932",
          delta: "+22%",
          deltaTone: "up",
          color: "oklch(0.5 0.13 240)",
          points: [140, 145, 160, 170, 175, 180, 195, 210, 215, 225, 240, 250, 265, 275]
        }
      ),
      /* @__PURE__ */ jsx2(
        StatCard,
        {
          label: "\u0417\u0430\u044F\u0432\u043E\u043A \u043F\u0440\u0438\u043D\u044F\u0442\u043E",
          value: "78",
          delta: "+34%",
          deltaTone: "up",
          color: "oklch(0.55 0.12 145)",
          points: [2, 3, 4, 3, 5, 4, 5, 6, 5, 7, 6, 8, 7, 9]
        }
      ),
      /* @__PURE__ */ jsx2(
        StatCard,
        {
          label: "\u041A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u0432\xA0\u0437\u0430\u044F\u0432\u043A\u0443",
          value: "2.7%",
          delta: "+0.4\u043F\u043F",
          deltaTone: "up",
          color: "oklch(0.55 0.15 35)",
          points: [2.1, 2.2, 2.3, 2.2, 2.4, 2.3, 2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.8]
        }
      )
    ] }),
    /* @__PURE__ */ jsx2(TrafficChart, {}),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsx2(SourceBreakdown, {}),
      /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 16,
        padding: 22
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 16 }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E" }),
        /* @__PURE__ */ jsx2("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }, children: [
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u0434\u0435\u043D\u044C", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u2014 142 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F, 8 \u0437\u0430\u044F\u0432\u043E\u043A"],
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u043A\u0430\u043D\u0430\u043B", "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 +24% \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E"],
          ["\u041B\u0443\u0447\u0448\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430", "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u2014 12 \u0437\u0430\u043F\u0438\u0441\u0435\u0439"],
          ["\u0427\u0442\u043E \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C", "\u0421\u0432\u0435\u0436\u0438\u0435 3 \u0444\u043E\u0442\u043E \u0438\u0437 Telegram + 1 \u043D\u043E\u0432\u044B\u0439 \u043E\u0442\u0437\u044B\u0432 \u0441\xA0\u042F.\u041A\u0430\u0440\u0442"]
        ].map(([k, v]) => /* @__PURE__ */ jsxs2("li", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.08em", color: VT.inkFaint }, children: k.toUpperCase() }),
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: VT.ink }, children: v })
        ] }, k)) })
      ] })
    ] })
  ] });
}
function SiteEditTab() {
  const [title, setTitle] = useState("\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0432\xA0\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435 \u2014 \u0431\u0435\u0437\xA0\u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438");
  const [sub, setSub] = useState("\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \u0438\xA0\u0441\u0442\u043E\u0439\u043A\u043E\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435. \u041E\u0434\u0438\u043D \u043A\u043B\u0438\u0435\u043D\u0442 \u0432\xA0\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437\xA0\u0441\u043F\u0435\u0448\u043A\u0438, \u0432\xA0\u0442\u0438\u0448\u0438\u043D\u0435, \u0441\xA0\u043A\u043E\u0444\u0435.");
  const [accent, setAccent] = useState(VT.accent);
  const [sections, setSections] = useState({ reviews: true, gallery: true, services: true, faq: true, map: true });
  const accentSwatches = [
    VT.accent,
    "oklch(0.5 0.12 250)",
    "oklch(0.5 0.12 145)",
    "oklch(0.5 0.15 25)",
    "oklch(0.45 0.12 285)"
  ];
  const togSection = (k) => setSections((s) => ({ ...s, [k]: !s[k] }));
  return /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, alignItems: "flex-start" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      padding: 22,
      position: "sticky",
      top: 88
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: "\u041F\u0440\u0435\u0432\u044C\u044E" }),
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11.5 }, children: DEMO_SITE.domain })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.bgSoft,
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { padding: "24px 22px" }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", color: accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx2("h2", { style: {
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: "10px 0 8px",
            lineHeight: 1.1,
            color: VT.ink,
            textWrap: "balance"
          }, children: title }),
          /* @__PURE__ */ jsx2("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: 0, lineHeight: 1.5 }, children: sub }),
          /* @__PURE__ */ jsx2("div", { style: {
            marginTop: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 18px",
            borderRadius: 999,
            background: accent,
            color: "#fff",
            fontSize: 13,
            fontWeight: 600
          }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192" })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { borderTop: `1px solid ${VT.line}`, padding: 14, background: VT.white }, children: Object.entries({
          services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
          reviews: "\u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432",
          gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
          faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
          map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
        }).map(([k, label]) => /* @__PURE__ */ jsxs2("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 0",
          borderBottom: `1px solid ${VT.lineSoft}`,
          fontSize: 13,
          color: sections[k] ? VT.ink : VT.inkFaint,
          textDecoration: sections[k] ? "none" : "line-through"
        }, children: [
          /* @__PURE__ */ jsx2("span", { style: { color: sections[k] ? VT.success : VT.inkMuted, fontSize: 14 }, children: sections[k] ? "\u25CF" : "\u25CB" }),
          label
        ] }, k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx2(EditorBlock, { title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (H1)", children: /* @__PURE__ */ jsx2(
        "textarea",
        {
          value: title,
          onChange: (e) => setTitle(e.target.value),
          rows: 2,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsx2(EditorBlock, { title: "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", children: /* @__PURE__ */ jsx2(
        "textarea",
        {
          value: sub,
          onChange: (e) => setSub(e.target.value),
          rows: 3,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsxs2(EditorBlock, { title: "\u0426\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u0430", children: [
        /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 8 }, children: accentSwatches.map((c) => /* @__PURE__ */ jsx2("button", { onClick: () => setAccent(c), style: {
          width: 36,
          height: 36,
          borderRadius: 10,
          background: c,
          border: accent === c ? "3px solid #fff" : "1px solid rgba(0,0,0,0.08)",
          outline: accent === c ? `2px solid ${c}` : "none",
          cursor: "pointer",
          transition: "all .15s",
          outlineOffset: -1
        }, "aria-label": `\u0426\u0432\u0435\u0442 ${c}` }, c)) }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: 8, fontSize: 12, color: VT.inkFaint, fontFamily: VT.font.mono }, children: accent })
      ] }),
      /* @__PURE__ */ jsx2(EditorBlock, { title: "Hero-\u0444\u043E\u0442\u043E", children: /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        background: VT.bgSoft,
        borderRadius: 10
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
          border: `1px solid ${VT.line}`
        } }),
        /* @__PURE__ */ jsx2("div", { style: { flex: 1, fontSize: 13, color: VT.inkSoft }, children: "hero-anna-1.jpg \xB7 1.2 MB" }),
        /* @__PURE__ */ jsx2("button", { style: editorSecondaryBtn, children: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C" })
      ] }) }),
      /* @__PURE__ */ jsx2(EditorBlock, { title: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u0438", children: /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: Object.entries({
        services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
        reviews: "\u041E\u0442\u0437\u044B\u0432\u044B (\u2605 \u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0432\u044B\u0431\u0440\u0430\u043D\u044B \u0418\u0418)",
        gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
        faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
        map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
      }).map(([k, label]) => /* @__PURE__ */ jsxs2("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
        cursor: "pointer",
        fontSize: 14,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: sections[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx2("span", { style: {
          position: "absolute",
          top: 2,
          left: sections[k] ? 16 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        } }) }),
        /* @__PURE__ */ jsx2("input", { type: "checkbox", checked: sections[k], onChange: () => togSection(k), style: { display: "none" } }),
        label
      ] }, k)) }) }),
      /* @__PURE__ */ jsx2("button", { style: {
        background: VT.accent,
        color: "#fff",
        fontWeight: 700,
        padding: "14px 22px",
        borderRadius: 12,
        fontSize: 15,
        border: "none",
        cursor: "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8
      }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\xA0\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u0442\u044C \u2192" })
    ] })
  ] });
}
var editorTextarea = {
  width: "100%",
  padding: "10px 12px",
  background: VT.white,
  border: `1px solid ${VT.line}`,
  borderRadius: 10,
  fontSize: 14,
  color: VT.ink,
  fontFamily: VT.font.sans,
  resize: "vertical",
  lineHeight: 1.4,
  letterSpacing: "-0.005em"
};
var editorSecondaryBtn = {
  padding: "8px 14px",
  borderRadius: 8,
  background: VT.white,
  color: VT.ink,
  fontWeight: 500,
  fontSize: 13,
  border: `1px solid ${VT.line}`,
  cursor: "pointer"
};
function EditorBlock({ title, children }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, fontWeight: 600, color: VT.inkFaint, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }, children: title }),
    children
  ] });
}
function LeadsTab() {
  const [leads, setLeads] = useState([
    { id: 1, name: "\u0410\u043D\u043D\u0430 \u041F.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \xB7 14:32", source: "TG", status: "new" },
    { id: 2, name: "\u042E\u043B\u0438\u044F \u0412.", contact: "@example_user", service: "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440", when: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \xB7 12:18", source: "TG", status: "new" },
    { id: 3, name: "\u041C\u0438\u0445\u0430\u0438\u043B \u0421.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "\u0432\u0447\u0435\u0440\u0430 \xB7 18:42", source: "\u0442\u0435\u043B", status: "new" },
    { id: 4, name: "\u0414\u0430\u0440\u044C\u044F \u041D.", contact: "darya@\u25A6\u25A6\u25A6.ru", service: "\u041F\u0435\u0434\u0438\u043A\u044E\u0440", when: "\u0432\u0447\u0435\u0440\u0430 \xB7 11:05", source: "email", status: "answered" },
    { id: 5, name: "\u041E\u043B\u044C\u0433\u0430 \u041C.", contact: "@example_user", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "TG", status: "booked" },
    { id: 6, name: "\u0415\u043B\u0435\u043D\u0430 \u041A.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u0421\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", when: "2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "TG", status: "booked" },
    { id: 7, name: "\u0422\u0430\u0442\u044C\u044F\u043D\u0430 \u0420.", contact: "@example_user", service: "\u0414\u0438\u0437\u0430\u0439\u043D", when: "3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "\u0442\u0435\u043B", status: "declined" },
    { id: 8, name: "\u041C\u0430\u0440\u0438\u044F \u041B.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "4 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "TG", status: "booked" }
  ]);
  const [filter, setFilter] = useState("all");
  const statusInfo = {
    new: { label: "\u041D\u043E\u0432\u0430\u044F", bg: VT.accentSoft, fg: VT.accentInk },
    answered: { label: "\u041E\u0442\u0432\u0435\u0442\u0438\u043B\u0438", bg: "oklch(0.93 0.045 240)", fg: "oklch(0.36 0.10 240)" },
    booked: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u043D", bg: "oklch(0.93 0.06 145)", fg: "oklch(0.32 0.11 145)" },
    declined: { label: "\u041E\u0442\u043A\u0430\u0437", bg: VT.bgSoft, fg: VT.inkFaint }
  };
  const filters = [
    ["all", "\u0412\u0441\u0435", leads.length],
    ["new", "\u041D\u043E\u0432\u044B\u0435", leads.filter((l) => l.status === "new").length],
    ["answered", "\u0412 \u043E\u0442\u0432\u0435\u0442\u0435", leads.filter((l) => l.status === "answered").length],
    ["booked", "\u0417\u0430\u043F\u0438\u0441\u0430\u043D\u044B", leads.filter((l) => l.status === "booked").length]
  ];
  const filtered = filter === "all" ? leads : leads.filter((l) => l.status === filter);
  const setStatus = (id, status) => {
    setLeads((ls) => ls.map((l) => l.id === id ? { ...l, status } : l));
  };
  return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: filters.map(([id, label, count]) => /* @__PURE__ */ jsxs2("button", { onClick: () => setFilter(id), style: {
      padding: "8px 14px",
      borderRadius: 999,
      background: filter === id ? VT.ink : VT.white,
      color: filter === id ? "#fff" : VT.inkSoft,
      border: `1px solid ${filter === id ? VT.ink : VT.line}`,
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6
    }, children: [
      label,
      /* @__PURE__ */ jsx2("span", { style: {
        padding: "1px 7px",
        borderRadius: 999,
        background: filter === id ? "rgba(255,255,255,0.18)" : VT.bgSoft,
        fontSize: 11,
        fontFamily: VT.font.mono
      }, children: count })
    ] }, id)) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr",
        padding: "14px 18px",
        background: VT.bgSoft,
        borderBottom: `1px solid ${VT.line}`,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.08em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: [
        /* @__PURE__ */ jsx2("span", { children: "\u0418\u041C\u042F" }),
        /* @__PURE__ */ jsx2("span", { children: "\u041A\u041E\u041D\u0422\u0410\u041A\u0422" }),
        /* @__PURE__ */ jsx2("span", { children: "\u0423\u0421\u041B\u0423\u0413\u0410" }),
        /* @__PURE__ */ jsx2("span", { children: "\u041A\u041E\u0413\u0414\u0410" }),
        /* @__PURE__ */ jsx2("span", { children: "\u041A\u0410\u041D\u0410\u041B" }),
        /* @__PURE__ */ jsx2("span", { children: "\u0421\u0422\u0410\u0422\u0423\u0421" }),
        /* @__PURE__ */ jsx2("span", { children: "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F" })
      ] }),
      filtered.map((l) => /* @__PURE__ */ jsxs2("div", { style: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr",
        padding: "14px 18px",
        borderBottom: `1px solid ${VT.lineSoft}`,
        alignItems: "center",
        fontSize: 13.5,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { fontWeight: 600 }, children: l.name }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, color: VT.inkSoft }, children: l.contact }),
        /* @__PURE__ */ jsx2("span", { children: l.service }),
        /* @__PURE__ */ jsx2("span", { style: { color: VT.inkSoft }, children: l.when }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: l.source }),
        /* @__PURE__ */ jsx2("span", { children: /* @__PURE__ */ jsx2("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: statusInfo[l.status].bg,
          color: statusInfo[l.status].fg,
          fontSize: 11.5,
          fontWeight: 600
        }, children: statusInfo[l.status].label }) }),
        /* @__PURE__ */ jsxs2("span", { style: { display: "flex", gap: 6 }, children: [
          l.status === "new" && /* @__PURE__ */ jsxs2(Fragment3, { children: [
            /* @__PURE__ */ jsx2("button", { onClick: () => setStatus(l.id, "booked"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.accent,
              color: "#fff",
              border: "none",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer"
            }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C" }),
            /* @__PURE__ */ jsx2("button", { onClick: () => setStatus(l.id, "declined"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.white,
              color: VT.inkSoft,
              border: `1px solid ${VT.line}`,
              fontSize: 11.5,
              cursor: "pointer"
            }, children: "\xD7" })
          ] }),
          l.status === "answered" && /* @__PURE__ */ jsx2("button", { onClick: () => setStatus(l.id, "booked"), style: {
            padding: "5px 10px",
            borderRadius: 6,
            background: VT.accent,
            color: "#fff",
            border: "none",
            fontSize: 11.5,
            fontWeight: 600,
            cursor: "pointer"
          }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u043D" }),
          (l.status === "booked" || l.status === "declined") && /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint, fontSize: 11.5 }, children: "\u2014" })
        ] })
      ] }, l.id)),
      filtered.length === 0 && /* @__PURE__ */ jsx2("div", { style: { padding: 40, textAlign: "center", color: VT.inkFaint }, children: "\u0417\u0430\u044F\u0432\u043E\u043A \u0432\xA0\u044D\u0442\u043E\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u0435 \u043D\u0435\u0442" })
    ] })
  ] });
}
function ReviewsTab() {
  const [reviews, setReviews] = useState([
    { id: 1, author: "\u041D\u0430\u0442\u0430\u043B\u044C\u044F \u041A.", source: "\u042F.\u041A\u0430\u0440\u0442\u044B", date: "12 \u0430\u043F\u0440", rating: 5, text: "\u041E\u0447\u0435\u043D\u044C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0438\xA0\u0431\u0435\u0440\u0435\u0436\u043D\u043E, \u0444\u043E\u0440\u043C\u0430 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438. \u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u044E\u0434\u0430, \u0438\xA0\u043F\u043E\u0434\u0440\u0443\u0433 \u043F\u0440\u0438\u0432\u0435\u043B\u0430.", shown: true, topPick: true },
    { id: 2, author: "\u041C\u0430\u0440\u0438\u044F \u041B.", source: "\u042F.\u041A\u0430\u0440\u0442\u044B", date: "02 \u0430\u043F\u0440", rating: 5, text: "\u0427\u0438\u0441\u0442\u043E, \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E, \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u043E\u0432\u0440\u0435\u043C\u044F. \u041A\u043E\u0444\u0435 \u0442\u043E\u0436\u0435 \u0432\u043A\u0443\u0441\u043D\u044B\u0439 \u{1F642} \u0423\u0434\u043E\u0431\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u0431\u043E\u0442.", shown: true, topPick: true },
    { id: 3, author: "\u0414\u0430\u0440\u044C\u044F \u041D.", source: "\u042F.\u041A\u0430\u0440\u0442\u044B", date: "28 \u043C\u0430\u0440", rating: 5, text: "\u0417\u0430\u043F\u0438\u0441\u0430\u043B\u0430 \u043D\u0430\xA0\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0434\u0435\u043D\u044C, \u0432\u0441\u0451 \u0443\u0441\u043F\u0435\u043B\u0438 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u043A\xA0\u0441\u0432\u0430\u0434\u044C\u0431\u0435. \u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430\xA0\u0432\u044B\u0440\u0443\u0447\u043A\u0443!", shown: true, topPick: false },
    { id: 4, author: "\u0410\u043D\u043D\u0430 \u0421.", source: "Telegram", date: "21 \u043C\u0430\u0440", rating: 5, text: "\u041F\u0440\u0438\u0445\u043E\u0436\u0443 \u0443\u0436\u0435 2 \u0433\u043E\u0434\u0430, \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u043D\u0430\u0440\u0435\u043A\u0430\u043D\u0438\u044F. \u0426\u0435\u043D\u044B \u0430\u0434\u0435\u043A\u0432\u0430\u0442\u043D\u044B\u0435, \u043C\u0430\u0441\u0442\u0435\u0440 \u0440\u0430\u0441\u0442\u0451\u0442.", shown: true, topPick: false },
    { id: 5, author: "\u042E\u043B\u0438\u044F \u0412.", source: "2GIS", date: "14 \u043C\u0430\u0440", rating: 5, text: "\u0423\u0434\u043E\u0431\u043D\u044B\u0439 \u0441\u0430\u0439\u0442, \u0443\u0434\u043E\u0431\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C, \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E. \u041D\u0435 \u043B\u044E\u0431\u043B\u044E \u0441\u0430\u043B\u043E\u043D\u044B \u2014 \u0430\xA0\u0437\u0434\u0435\u0441\u044C \u043A\u0430\u043A\xA0\u0434\u043E\u043C\u0430.", shown: true, topPick: false },
    { id: 6, author: "\u041E\u043B\u044C\u0433\u0430 \u041C.", source: "\u042F.\u041A\u0430\u0440\u0442\u044B", date: "06 \u043C\u0430\u0440", rating: 5, text: "\u0421\u0434\u0435\u043B\u0430\u043B\u0430 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \u043F\u0435\u0440\u0435\u0434 \u043E\u0442\u043F\u0443\u0441\u043A\u043E\u043C, \u0447\u0435\u0440\u0435\u0437 3 \u043D\u0435\u0434\u0435\u043B\u0438 \u0432\u0435\u0440\u043D\u0443\u043B\u0430\u0441\u044C \u2014 \u0432\u0441\u0451 \u043A\u0430\u043A\xA0\u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E.", shown: true, topPick: false },
    { id: 7, author: "\u0410\u043D\u043E\u043D\u0438\u043C", source: "\u042F.\u041A\u0430\u0440\u0442\u044B", date: "02 \u043C\u0430\u0440", rating: 3, text: "\u041E\u043F\u043E\u0437\u0434\u0430\u043B\u0430 \u043D\u0430 5 \u043C\u0438\u043D\u0443\u0442, \u043D\u043E\xA0\u0432\xA0\u0446\u0435\u043B\u043E\u043C \u043E\u043A", shown: false, topPick: false },
    { id: 8, author: "\u041E\u043B\u044C\u0433\u0430", source: "\u042F.\u041A\u0430\u0440\u0442\u044B", date: "28 \u0444\u0435\u0432", rating: 4, text: "\u041D\u043E\u0440\u043C", shown: false, topPick: false }
  ]);
  const toggleShown = (id) => setReviews((rs) => rs.map((r) => r.id === id ? { ...r, shown: !r.shown } : r));
  const shownCount = reviews.filter((r) => r.shown).length;
  return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 14,
      flexWrap: "wrap"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 16, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "AI-\u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0441\u0442\u0432\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432" }),
        /* @__PURE__ */ jsxs2("div", { style: { fontSize: 13.5, color: VT.inkSoft, marginTop: 2 }, children: [
          "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E ",
          /* @__PURE__ */ jsx2("b", { children: shownCount }),
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438\u0437 ",
          reviews.length,
          ". ",
          BRAND.name,
          " \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445."
        ] })
      ] }),
      /* @__PURE__ */ jsx2("button", { style: {
        padding: "10px 18px",
        borderRadius: 999,
        background: VT.accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 13.5,
        border: "none",
        cursor: "pointer"
      }, children: "\u041F\u0435\u0440\u0435\u0447\u0438\u0442\u0430\u0442\u044C \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u2192" })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: reviews.map((r) => /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: r.shown ? `1px solid ${VT.line}` : `1px dashed ${VT.line}`,
      borderRadius: 14,
      padding: 16,
      opacity: r.shown ? 1 : 0.55,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
          width: 32,
          height: 32,
          borderRadius: "50%",
          flex: "0 0 auto",
          background: "linear-gradient(140deg, oklch(0.78 0.10 50), oklch(0.55 0.12 35))",
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: 14
        }, children: r.author[0] }),
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: r.author }),
            r.topPick && /* @__PURE__ */ jsx2("span", { style: {
              marginLeft: "auto",
              fontFamily: VT.font.mono,
              fontSize: 9.5,
              letterSpacing: "0.08em",
              background: VT.accentSoft,
              color: VT.accentInk,
              padding: "2px 6px",
              borderRadius: 3,
              fontWeight: 700
            }, children: "\u2605 \u0422\u041E\u041F" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11,
            color: VT.inkFaint,
            marginTop: 2
          }, children: [
            r.source,
            " \xB7 ",
            r.date,
            " \xB7 ",
            "\u2605".repeat(r.rating),
            "\u2606".repeat(5 - r.rating)
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("p", { style: {
        margin: "10px 0 0",
        fontSize: 13.5,
        lineHeight: 1.5,
        color: VT.ink,
        textWrap: "pretty"
      }, children: [
        "\xAB",
        r.text,
        "\xBB"
      ] }),
      /* @__PURE__ */ jsxs2("label", { style: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 12.5,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
          width: 30,
          height: 18,
          borderRadius: 9,
          background: r.shown ? VT.success : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx2("span", { style: {
          position: "absolute",
          top: 2,
          left: r.shown ? 14 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s"
        } }) }),
        /* @__PURE__ */ jsx2("input", { type: "checkbox", checked: r.shown, onChange: () => toggleShown(r.id), style: { display: "none" } }),
        r.shown ? "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430\xA0\u0441\u0430\u0439\u0442\u0435" : "\u0421\u043A\u0440\u044B\u0442"
      ] })
    ] }, r.id)) })
  ] });
}
function ServicesTab() {
  const [services, setServices] = useState([
    { id: 1, name: "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440", duration: "60 \u043C\u0438\u043D", price: "1 500 \u20BD" },
    { id: 2, name: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0433\u0435\u043B\u044C-\u043B\u0430\u043A\u043E\u043C", duration: "90 \u043C\u0438\u043D", price: "2 200 \u20BD" },
    { id: 3, name: "\u041F\u0435\u0434\u0438\u043A\u044E\u0440 \u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", duration: "90 \u043C\u0438\u043D", price: "2 800 \u20BD" },
    { id: 4, name: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u043E\u0433\u0442\u0435\u0439", duration: "", price: "\u043E\u0442 150 \u20BD" },
    { id: 5, name: "\u0421\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", duration: "20 \u043C\u0438\u043D", price: "500 \u20BD" }
  ]);
  const [edit, setEdit] = useState(null);
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      padding: "14px 22px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 15, fontWeight: 600, color: VT.ink }, children: [
        "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B \u2014 ",
        services.length
      ] }),
      /* @__PURE__ */ jsx2("button", { style: {
        padding: "8px 16px",
        borderRadius: 999,
        background: VT.accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        border: "none",
        cursor: "pointer"
      }, children: "+ \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443" })
    ] }),
    services.map((sv) => /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 0.8fr 0.8fr 0.6fr",
      padding: "14px 22px",
      borderBottom: `1px solid ${VT.lineSoft}`,
      alignItems: "center",
      gap: 10
    }, children: edit === sv.id ? /* @__PURE__ */ jsxs2(Fragment3, { children: [
      /* @__PURE__ */ jsx2(
        "input",
        {
          defaultValue: sv.name,
          onBlur: (e) => {
            setServices((s) => s.map((x) => x.id === sv.id ? { ...x, name: e.target.value } : x));
            setEdit(null);
          },
          style: { ...editorTextarea, padding: "6px 10px" },
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsx2("input", { defaultValue: sv.duration, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx2("input", { defaultValue: sv.price, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx2("button", { onClick: () => setEdit(null), style: { ...editorSecondaryBtn, fontSize: 12 }, children: "OK" })
    ] }) : /* @__PURE__ */ jsxs2(Fragment3, { children: [
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: VT.ink, fontWeight: 500 }, children: sv.name }),
      /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 12.5, color: VT.inkSoft }, children: sv.duration || "\u2014" }),
      /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }, children: sv.price }),
      /* @__PURE__ */ jsxs2("span", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx2("button", { onClick: () => setEdit(sv.id), style: { ...editorSecondaryBtn, fontSize: 11 }, children: "\u270E" }),
        /* @__PURE__ */ jsx2(
          "button",
          {
            onClick: () => setServices((s) => s.filter((x) => x.id !== sv.id)),
            style: { ...editorSecondaryBtn, fontSize: 11, color: VT.danger },
            children: "\xD7"
          }
        )
      ] })
    ] }) }, sv.id))
  ] });
}
function SettingsTab() {
  const [notify, setNotify] = useState({ tg: true, max: false, email: true });
  const [paused, setPaused] = useState(false);
  return /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430" }),
      /* @__PURE__ */ jsxs2("div", { style: {
        padding: "14px 16px",
        background: VT.bgSoft,
        borderRadius: 10,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink }, children: DEMO_SITE.plan }),
          /* @__PURE__ */ jsxs2("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 2 }, children: [
            "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \xB7 ",
            DEMO_SITE.nextBilling
          ] })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: "oklch(0.93 0.06 145)",
          color: "oklch(0.32 0.11 145)",
          fontSize: 11.5,
          fontWeight: 600
        }, children: "\u0410\u041A\u0422\u0418\u0412\u041D\u0410" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx2("button", { style: editorSecondaryBtn, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443" }),
        /* @__PURE__ */ jsx2("button", { style: { ...editorSecondaryBtn, color: VT.danger }, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 14, color: VT.ink, marginBottom: 10 }, children: DEMO_SITE.domain }),
      /* @__PURE__ */ jsx2("button", { style: editorSecondaryBtn, children: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438" }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
        ["tg", "Telegram", "@anna_studio", "#229ED9"],
        ["max", "MAX", "\u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E", "oklch(0.55 0.13 285)"],
        ["email", "Email", "anna@studio.ru", VT.accent]
      ].map(([k, label, value, color]) => /* @__PURE__ */ jsxs2("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: notify[k] ? VT.bgSoft : VT.white,
        border: `1px solid ${notify[k] ? VT.line : VT.lineSoft}`,
        borderRadius: 10,
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
          width: 36,
          height: 36,
          borderRadius: 8,
          background: notify[k] ? color : VT.bgSoft,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: 14,
          opacity: notify[k] ? 1 : 0.4,
          flex: "0 0 auto"
        }, children: label[0] }),
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.inkSoft, fontFamily: VT.font.mono }, children: value })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: notify[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx2("span", { style: {
          position: "absolute",
          top: 2,
          left: notify[k] ? 16 : 2,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        } }) }),
        /* @__PURE__ */ jsx2("input", { type: "checkbox", checked: notify[k], onChange: () => setNotify((n) => ({ ...n, [k]: !n[k] })), style: { display: "none" } })
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u043E\u043C" }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx2("button", { onClick: () => setPaused((p) => !p), style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: paused ? VT.success : VT.white,
          color: paused ? "#fff" : VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${paused ? VT.success : VT.line}`,
          cursor: "pointer"
        }, children: paused ? "\u25B6 \u0412\u043E\u0437\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" : "\u23F8 \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443" }),
        /* @__PURE__ */ jsx2("button", { style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: VT.white,
          color: VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${VT.line}`,
          cursor: "pointer"
        }, children: "\u2193 \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432 (HTML + \u0444\u043E\u0442\u043E)" }),
        /* @__PURE__ */ jsx2("button", { style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: VT.white,
          color: VT.danger,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${VT.line}`,
          cursor: "pointer"
        }, children: "\xD7 \u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0430\u0439\u0442" })
      ] })
    ] })
  ] });
}
function ClientAdminDemo() {
  const [tab, setTab] = useState("analytics");
  const currentTab = TABS.find((t) => t.id === tab);
  return /* @__PURE__ */ jsxs2("div", { style: {
    width: "100%",
    minHeight: "100vh",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    letterSpacing: "-0.005em",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxs2("header", { style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: `${VT.white}f0`,
      backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${VT.line}`,
      padding: "12px 28px",
      display: "flex",
      alignItems: "center",
      gap: 18
    }, children: [
      /* @__PURE__ */ jsx2(BrandMark, { size: 26, fontSize: 18 }),
      /* @__PURE__ */ jsx2("span", { style: {
        padding: "4px 10px",
        borderRadius: 6,
        background: VT.bgSoft,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0414\u0415\u041C\u041E \xB7 \u041B\u0418\u0427\u041D\u042B\u0419 \u041A\u0410\u0411\u0418\u041D\u0415\u0422" }),
      /* @__PURE__ */ jsx2("div", { style: { flex: 1 } }),
      /* @__PURE__ */ jsxs2("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.success } }),
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13, color: VT.ink }, children: DEMO_SITE.domain }),
        "\xB7 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D"
      ] }),
      /* @__PURE__ */ jsx2("a", { href: "index.html", style: {
        padding: "8px 14px",
        borderRadius: 999,
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        color: VT.ink,
        fontWeight: 500,
        fontSize: 13,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6
      }, children: "\u2190 \u041D\u0430\u0437\u0430\u0434 \u043A\xA0\u043B\u0435\u043D\u0434\u0438\u043D\u0433\u0443" }),
      /* @__PURE__ */ jsx2("a", { href: "#", style: {
        padding: "8px 16px",
        borderRadius: 999,
        background: VT.accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        textDecoration: "none"
      }, children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0430\u0439\u0442 \u2197" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flex: 1, minHeight: 0 }, children: [
      /* @__PURE__ */ jsxs2("aside", { style: {
        width: 240,
        flex: "0 0 auto",
        background: VT.white,
        borderRight: `1px solid ${VT.line}`,
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          padding: "6px 14px",
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          color: VT.inkFaint,
          fontWeight: 600,
          marginBottom: 4
        }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0410\u041D\u041D\u042B" }),
        TABS.map((t) => /* @__PURE__ */ jsxs2("button", { onClick: () => setTab(t.id), style: {
          padding: "10px 14px",
          borderRadius: 10,
          background: tab === t.id ? VT.accentSoft : "transparent",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: 10,
          fontSize: 14,
          color: tab === t.id ? VT.accentInk : VT.ink,
          fontWeight: tab === t.id ? 600 : 500,
          fontFamily: VT.font.sans
        }, children: [
          /* @__PURE__ */ jsx2("span", { style: { color: tab === t.id ? VT.accent : VT.inkSoft, display: "inline-flex" }, children: /* @__PURE__ */ jsx2(NavIcon, { kind: t.icon, size: 17 }) }),
          /* @__PURE__ */ jsx2("span", { style: { flex: 1 }, children: t.label }),
          t.badge && /* @__PURE__ */ jsx2("span", { style: {
            padding: "1px 7px",
            borderRadius: 999,
            background: VT.accent,
            color: "#fff",
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            fontWeight: 700
          }, children: t.badge })
        ] }, t.id)),
        /* @__PURE__ */ jsx2("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsxs2("div", { style: {
          margin: "20px 6px 0",
          padding: 14,
          background: VT.bgSoft,
          borderRadius: 12,
          fontSize: 12.5,
          color: VT.inkSoft,
          lineHeight: 1.5
        }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, color: VT.ink, marginBottom: 4 }, children: "\u042D\u0442\u043E \u0434\u0435\u043C\u043E" }),
          "\u0412\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0438\u0436\u0435 \u2014 \u043F\u0440\u0438\u043C\u0435\u0440. \u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u041B\u041A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0442\u0430\u043A \u0436\u0435."
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("main", { style: { flex: 1, minWidth: 0, padding: "24px 28px 60px", overflowX: "hidden" }, children: [
        /* @__PURE__ */ jsx2("div", { style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx2("h1", { style: {
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          margin: 0,
          lineHeight: 1.1,
          color: VT.ink
        }, children: currentTab.label }) }),
        tab === "analytics" && /* @__PURE__ */ jsx2(AnalyticsTab, {}),
        tab === "site" && /* @__PURE__ */ jsx2(SiteEditTab, {}),
        tab === "leads" && /* @__PURE__ */ jsx2(LeadsTab, {}),
        tab === "reviews" && /* @__PURE__ */ jsx2(ReviewsTab, {}),
        tab === "services" && /* @__PURE__ */ jsx2(ServicesTab, {}),
        tab === "settings" && /* @__PURE__ */ jsx2(SettingsTab, {})
      ] })
    ] })
  ] });
}
export {
  ClientAdminDemo
};
//# sourceMappingURL=index.js.map