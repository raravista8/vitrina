"use client";

// src/landing/index.tsx
import React from "react";

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
function IconLink() {
  return /* @__PURE__ */ jsxs("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: VT.inkFaint, strokeWidth: 1.8, strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" }),
    /* @__PURE__ */ jsx("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" })
  ] });
}
function IconArrow({ size = 18 }) {
  return /* @__PURE__ */ jsx("span", { style: { fontSize: size, lineHeight: 1 }, children: "\u2192" });
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

// src/landing/index.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function sectionPad(mobile) {
  const v = mobile ? 20 : 80;
  return { paddingLeft: v, paddingRight: v, boxSizing: "border-box" };
}
function H2({ children, mobile, align = "center" }) {
  return /* @__PURE__ */ jsx2("h2", { style: {
    fontSize: mobile ? 30 : 52,
    lineHeight: mobile ? 1.1 : 1.05,
    fontWeight: 700,
    letterSpacing: "-0.03em",
    margin: "14px 0 0",
    textWrap: "balance",
    textAlign: align
  }, children });
}
function Sub({ children, mobile, align = "center", maxWidth = 720 }) {
  return /* @__PURE__ */ jsx2("p", { style: {
    fontSize: mobile ? 16 : 19,
    lineHeight: 1.45,
    color: VT.inkSoft,
    margin: "14px auto 0",
    maxWidth: mobile ? "100%" : maxWidth,
    textWrap: "pretty",
    textAlign: align
  }, children });
}
var SOURCE_ICONS = [
  {
    id: "yandex",
    name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx2("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx2("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx2("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx2("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsxs2("linearGradient", { id: "iggr3a", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx2("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx2("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx2("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx2("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggr3a)" }),
      /* @__PURE__ */ jsx2("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "site",
    name: "\u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx2("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx2("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx2("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx2("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
function HeroBlock({ mobile }) {
  return /* @__PURE__ */ jsx2("section", { id: "hero", style: { ...sectionPad(mobile), paddingTop: mobile ? 28 : 56, position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxs2("div", { style: {
    maxWidth: mobile ? "100%" : 1120,
    margin: "0 auto",
    textAlign: mobile ? "left" : "center"
  }, children: [
    /* @__PURE__ */ jsxs2("h1", { style: {
      fontSize: mobile ? "clamp(32px, 8.8vw, 44px)" : 76,
      lineHeight: mobile ? 1.06 : 1.04,
      fontWeight: 700,
      letterSpacing: "-0.035em",
      margin: 0,
      textWrap: "balance"
    }, children: [
      "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0437\u0430",
      " ",
      /* @__PURE__ */ jsxs2("span", { style: { position: "relative", color: VT.accent, whiteSpace: "nowrap" }, children: [
        "2 \u0447\u0430\u0441\u0430",
        !mobile && /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: {
          position: "absolute",
          left: 2,
          right: 6,
          bottom: 6,
          height: 14,
          background: VT.accentSoft,
          opacity: 0.7,
          zIndex: -1,
          borderRadius: 3
        } })
      ] }),
      " ",
      "\u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043B\u043E\u0432\u0438\u0442 \u0437\u0430\u044F\u0432\u043A\u0438.",
      /* @__PURE__ */ jsx2("br", {}),
      "\u0414\u0430\u043B\u044C\u0448\u0435\xA0\u043E\u043D ",
      /* @__PURE__ */ jsx2("span", { style: { color: VT.accent }, children: "\u0441\u0430\u043C \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043B\u0443\u0447\u0448\u0435" }),
      " \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E."
    ] }),
    /* @__PURE__ */ jsx2("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "20px 0 0" : "28px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "pretty"
    }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u0435\u0434\u0451\u0442\u0435 \u0441\u0432\u043E\u0438 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u044D\u0442\u043E\u0433\u043E \u043D\u0435\u0442 \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442." }),
    /* @__PURE__ */ jsxs2("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "10px 0 0" : "12px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "pretty"
    }, children: [
      "\u0427\u0435\u0440\u0435\u0437 ",
      /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "2 \u0447\u0430\u0441\u0430 \u0441\u0430\u0439\u0442 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438" }),
      ". \u0414\u0430\u043B\u044C\u0448\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0441\u0430\u043C: \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442, \u043F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442, \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0434\u0438 \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A."
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "ss-hero-pill", style: {
      marginTop: mobile ? 22 : 32,
      display: "flex",
      flexDirection: mobile ? "column" : "row",
      gap: mobile ? 10 : 8,
      maxWidth: mobile ? "100%" : 680,
      marginLeft: mobile ? 0 : "auto",
      marginRight: mobile ? 0 : "auto",
      background: VT.white,
      padding: mobile ? 10 : 8,
      borderRadius: mobile ? 14 : 999,
      border: `1px solid ${VT.line}`,
      boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)",
      alignItems: mobile ? "stretch" : "center"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: mobile ? "12px 14px" : "0 18px",
        minWidth: 0
      }, children: [
        /* @__PURE__ */ jsx2(IconLink, {}),
        /* @__PURE__ */ jsx2("span", { style: {
          color: VT.inkFaint,
          fontSize: mobile ? 15 : 16,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, children: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" })
      ] }),
      /* @__PURE__ */ jsx2(Btn, { style: {
        padding: mobile ? "14px 20px" : "14px 26px",
        borderRadius: mobile ? 10 : 999
      }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 10 : 12,
      textAlign: mobile ? "left" : "center",
      fontFamily: VT.font.mono,
      fontSize: mobile ? 11.5 : 12.5,
      letterSpacing: "0.03em",
      color: VT.inkSoft,
      lineHeight: 1.45
    }, children: [
      "990 \u20BD/\u043C\u0435\u0441 \xB7 \u0434\u043B\u044F \u043F\u0435\u0440\u0432\u043E\u0439 \u0441\u043E\u0442\u043D\u0438 ",
      /* @__PURE__ */ jsx2("b", { style: { color: VT.accent }, children: "490 \u20BD \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430" }),
      " \xB7 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E"
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 14 : 18,
      textAlign: mobile ? "left" : "center"
    }, children: /* @__PURE__ */ jsxs2("a", { href: "#examples", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: VT.inkSoft,
      fontSize: mobile ? 14 : 15,
      textDecoration: "underline",
      textUnderlineOffset: 4,
      textDecorationColor: VT.line
    }, children: [
      "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u044B",
      /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2193" })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 22 : 36,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      alignItems: mobile ? "flex-start" : "center"
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0421\u041E\u0411\u0418\u0420\u0410\u0415\u041C \u0418\u0417" }),
      /* @__PURE__ */ jsx2("div", { style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: mobile ? "flex-start" : "center"
      }, children: SOURCE_ICONS.map((s) => /* @__PURE__ */ jsxs2("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "5px 14px 5px 5px",
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 13,
        color: VT.ink,
        fontWeight: 500
      }, children: [
        s.icon,
        s.name
      ] }, s.id)) })
    ] })
  ] }) });
}
function Star({ filled = true, size = 10 }) {
  return /* @__PURE__ */ jsx2(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 20 20",
      fill: filled ? "#f4a93b" : "none",
      stroke: filled ? "#f4a93b" : "#ccc",
      strokeWidth: "1.5",
      strokeLinejoin: "round",
      children: /* @__PURE__ */ jsx2("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" })
    }
  );
}
function PhotoFill({ tone = "peach", src, style }) {
  const tones = {
    peach: ["oklch(0.84 0.07 50)", "oklch(0.62 0.09 35)", "oklch(0.46 0.07 30)"],
    sage: ["oklch(0.82 0.06 145)", "oklch(0.58 0.08 145)", "oklch(0.38 0.06 145)"],
    slate: ["oklch(0.80 0.04 240)", "oklch(0.55 0.06 240)", "oklch(0.35 0.04 240)"],
    warm: ["oklch(0.88 0.05 70)", "oklch(0.70 0.10 50)", "oklch(0.48 0.10 35)"]
  };
  const [c1, c2, c3] = tones[tone] || tones.peach;
  return /* @__PURE__ */ jsx2("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: src ? "#222" : `radial-gradient(120% 80% at 30% 20%, ${c1} 0%, transparent 55%), radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%), linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
    ...style
  }, children: src && /* @__PURE__ */ jsx2("img", { src, alt: "", loading: "lazy", style: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block"
  } }) });
}
function MiniSiteCard({ ex }) {
  return /* @__PURE__ */ jsxs2("div", { className: "ss-card-lift", style: {
    background: VT.white,
    color: VT.ink,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 18px 36px -18px rgba(120,60,30,0.22)",
    display: "flex",
    flexDirection: "column",
    width: "100%"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "8px 12px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: 8, fontFamily: VT.font.mono, fontSize: 10, color: VT.inkFaint }, children: [
        ex.handle,
        ".",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 12px",
      background: "#fff",
      borderBottom: `1px solid ${VT.line}`
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        width: 24,
        height: 24,
        flex: "0 0 auto",
        borderRadius: 7,
        background: ex.accent,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 13
      }, children: ex.letter }),
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 12.5, fontWeight: 700, letterSpacing: "-0.015em" }, children: ex.name }),
      /* @__PURE__ */ jsx2("span", { style: {
        marginLeft: "auto",
        fontFamily: VT.font.mono,
        fontSize: 10.5,
        color: VT.inkSoft
      }, children: "\u0442\u0435\u043B\u0435\u0444\u043E\u043D" }),
      /* @__PURE__ */ jsx2("span", { style: {
        padding: "4px 10px",
        borderRadius: 999,
        background: ex.accent,
        color: "#fff",
        fontSize: 10.5,
        fontWeight: 600
      }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 14px 12px", borderBottom: `1px solid ${VT.line}` }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: ex.accent,
        fontWeight: 600
      }, children: [
        ex.category.toUpperCase(),
        " \xB7 ",
        ex.city.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx2("h3", { style: {
        fontSize: 17,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        margin: "6px 0 0",
        lineHeight: 1.15,
        textWrap: "balance",
        whiteSpace: "pre-line"
      }, children: ex.heroLine }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 8,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 11
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx2(Star, { filled: true, size: 10 }, i)) }),
        /* @__PURE__ */ jsxs2("b", { children: [
          ex.rating,
          " \u2605"
        ] }),
        /* @__PURE__ */ jsxs2("span", { style: { color: VT.inkSoft }, children: [
          "\xB7 ",
          ex.reviewCount,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx2(PhotoFill, { tone: ex.tone, src: ex.heroPhoto, style: {
        aspectRatio: "16 / 9",
        borderRadius: 8,
        border: `1px solid ${VT.line}`
      } }) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 14px" }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: ex.accent,
        fontWeight: 600,
        marginBottom: 8
      }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: ex.services.map(([n, pr]) => /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 10,
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em" }, children: n }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, marginTop: 1 }, children: pr })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: {
          padding: "4px 8px",
          borderRadius: 999,
          background: ex.accentSoft,
          color: ex.accent,
          fontSize: 10,
          fontWeight: 600
        }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192" })
      ] }, n)) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 14px", background: VT.bgSoft, borderTop: `1px solid ${VT.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: ex.accent,
        fontWeight: 600,
        marginBottom: 8
      }, children: "\u041E\u0422\u0417\u042B\u0412" }),
      /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 10,
        padding: "8px 10px"
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 1, marginBottom: 4 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx2(Star, { filled: true, size: 9 }, j)) }),
        /* @__PURE__ */ jsxs2("p", { style: { margin: 0, fontSize: 11.5, lineHeight: 1.4 }, children: [
          "\xAB",
          ex.review,
          "\xBB"
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: 4, fontSize: 10, color: VT.inkSoft }, children: ex.reviewAuthor })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "12px 14px" }, children: /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }, children: ex.gallery.map((g, i) => /* @__PURE__ */ jsx2(
      PhotoFill,
      {
        tone: g.tone || ex.tone,
        src: g.src,
        style: { aspectRatio: "1 / 1", borderRadius: 4 }
      },
      i
    )) }) }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "0 14px 14px", marginTop: "auto" }, children: /* @__PURE__ */ jsx2("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "11px 14px",
      borderRadius: 10,
      background: ex.accent,
      color: "#fff",
      fontSize: 13,
      fontWeight: 700
    }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u2192" }) })
  ] });
}
function ExamplesSection({ mobile }) {
  const U = (id, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
  const examples = [
    {
      handle: "morning-coffee",
      name: "\u0423\u0442\u0440\u043E \u0443 \u041B\u0435\u043D\u044B",
      category: "\u041A\u043E\u0444\u0435\u0439\u043D\u044F",
      city: "\u0412\u043E\u0440\u043E\u043D\u0435\u0436",
      tone: "warm",
      accent: "oklch(0.55 0.13 30)",
      accentSoft: "oklch(0.93 0.05 40)",
      letter: "\u0423",
      src: "Telegram-\u043A\u0430\u043D\u0430\u043B\u0430",
      heroLine: "\u041A\u043E\u0444\u0435 \u0438 \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u0438\n\u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 \u041F\u043B\u0430\u0442\u043E\u043D\u043E\u0432\u0430, 12",
      heroPhoto: U("photo-1495474472287-4d71bcdd2085"),
      rating: "4.9",
      reviewCount: 28,
      services: [
        ["\u041A\u0430\u043F\u0443\u0447\u0438\u043D\u043E / \u043B\u0430\u0442\u0442\u0435", "180 \u20BD"],
        ["\u0421\u044B\u0440\u043D\u0438\u043A \u0441\u043E \u0441\u043C\u0435\u0442\u0430\u043D\u043E\u0439", "220 \u20BD"],
        ["\u0417\u0430\u0432\u0442\u0440\u0430\u043A \u0432\u044B\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0434\u043D\u044F", "450 \u20BD"]
      ],
      review: "\u041B\u0443\u0447\u0448\u0438\u0439 \u0440\u0430\u0444 \u0432 \u0433\u043E\u0440\u043E\u0434\u0435, \u0438 \u0440\u0435\u0431\u044F\u0442\u0430 \u0432\u0441\u0435\u0433\u0434\u0430 \u043F\u043E\u043C\u043D\u044F\u0442 \u043C\u043E\u0451 \xAB\u0442\u043E \u0436\u0435, \u0447\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E\xBB.",
      reviewAuthor: "\u0410\u043B\u0438\u043D\u0430 \u041A.",
      gallery: [
        { src: U("photo-1509042239860-f550ce710b93", 300) },
        { src: U("photo-1572442388796-11668a67e53d", 300) },
        { src: U("photo-1554118811-1e0d58224f24", 300) },
        { src: U("photo-1497636577773-f1231844b336", 300) }
      ]
    },
    {
      handle: "avto-park",
      name: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 Park",
      category: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441",
      city: "\u0421\u0430\u043C\u0430\u0440\u0430",
      tone: "slate",
      accent: "oklch(0.40 0.06 250)",
      accentSoft: "oklch(0.93 0.045 250)",
      letter: "P",
      src: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442",
      heroLine: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441,\n\u0433\u0434\u0435 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0442, \u043F\u043E\u0442\u043E\u043C \u0447\u0438\u043D\u044F\u0442",
      heroPhoto: U("photo-1486262715619-67b85e0b08d3"),
      rating: "5.0",
      reviewCount: 56,
      services: [
        ["\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", "1 500 \u20BD"],
        ["\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430", "900 \u20BD"],
        ["\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", "2 400 \u20BD"]
      ],
      review: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u043B\u0438, \u0432\u0441\u0451 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438, \u043F\u043E \u043A\u0430\u043A\u043E\u0439 \u043F\u0440\u0438\u0447\u0438\u043D\u0435 \u0447\u0442\u043E \u043C\u0435\u043D\u044F\u0435\u043C. \u041D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u0430\u043B\u0438.",
      reviewAuthor: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u0412.",
      gallery: [
        { src: U("photo-1632823471565-1ecdf5c69f4d", 300) },
        { src: U("photo-1530046339160-ce3e530c7d2f", 300) },
        { src: U("photo-1487754180451-c456f719a1fc", 300) },
        { src: U("photo-1493238792000-8113da705763", 300) }
      ]
    },
    {
      handle: "flow-dance",
      name: "\u0428\u043A\u043E\u043B\u0430 \u0442\u0430\u043D\u0446\u0435\u0432 Flow",
      category: "\u0422\u0430\u043D\u0446\u044B",
      city: "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440",
      tone: "sage",
      accent: "oklch(0.45 0.11 145)",
      accentSoft: "oklch(0.93 0.06 145)",
      letter: "F",
      src: "\u0441\u0442\u0430\u0440\u043E\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
      heroLine: "\u0421\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u0445\u043E\u0440\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u044F\n\u0441 \u043D\u0443\u043B\u044F \u2014 \u0434\u043B\u044F \u0432\u0437\u0440\u043E\u0441\u043B\u044B\u0445",
      heroPhoto: U("photo-1547153760-18fc86324498"),
      rating: "4.8",
      reviewCount: 19,
      services: [
        ["\u041F\u0440\u043E\u0431\u043D\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435", "500 \u20BD"],
        ["\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442 4 \u0437\u0430\u043D\u044F\u0442\u0438\u044F", "3 200 \u20BD"],
        ["\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442 8 \u0437\u0430\u043D\u044F\u0442\u0438\u0439", "5 600 \u20BD"]
      ],
      review: "\u0411\u0435\u0437 \u044D\u0437\u043E\u0442\u0435\u0440\u0438\u043A\u0438 \u0438 \u043E\u0446\u0435\u043D\u043E\u043A. \u041F\u0440\u0435\u043F\u043E\u0434\u0430\u0432\u0430\u0442\u0435\u043B\u0438 \u0442\u0435\u0440\u043F\u0435\u043B\u0438\u0432\u043E \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0442 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F, \u0433\u0440\u0443\u043F\u043F\u0430 \u0434\u0440\u0443\u0436\u043D\u0430\u044F.",
      reviewAuthor: "\u041E\u043B\u0435\u0441\u044F \u041D.",
      gallery: [
        { src: U("photo-1535525153412-5a42439a210d", 300) },
        { src: U("photo-1518609878373-06d740f60d8b", 300) },
        { src: U("photo-1508700115892-45ecd05ae2ad", 300) },
        { src: U("photo-1518611012118-696072aa579a", 300) }
      ]
    }
  ];
  const Caption = ({ ex }) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", height: "100%", width: "100%" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent, flex: "0 0 auto" } }),
      /* @__PURE__ */ jsxs2("span", { style: { fontSize: mobile ? 14.5 : 16, fontWeight: 600, letterSpacing: "-0.015em" }, children: [
        "\u0421\u043E\u0431\u0440\u0430\u043D \u0438\u0437 ",
        ex.src
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { flex: 1, minHeight: 0, display: "flex" }, children: /* @__PURE__ */ jsx2(MiniSiteCard, { ex }) })
  ] });
  return /* @__PURE__ */ jsxs2("section", { id: "examples", style: { ...sectionPad(mobile), marginTop: mobile ? 56 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(H2, { mobile, children: [
        "\u0412\u043E\u0442 \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx2(Sub, { mobile, children: "\u0422\u0440\u0438 \u043F\u0440\u0438\u043C\u0435\u0440\u0430 \u0438\u0437 \u0440\u0430\u0437\u043D\u044B\u0445 \u0434\u0435\u043B. \u0412\u0441\u0435 \u0441\u043E\u0431\u0440\u0430\u043D\u044B \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u2014 \u0441\u043E \u0441\u0432\u043E\u0438\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438, \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F\u043C\u0438 \u0440\u0430\u0431\u043E\u0442." })
    ] }),
    mobile ? /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 28,
      marginLeft: -20,
      marginRight: -20,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      scrollSnapType: "x mandatory",
      scrollPaddingLeft: 20,
      scrollbarWidth: "none"
    }, children: [
      /* @__PURE__ */ jsx2("style", { children: `.ss-v3-carousel::-webkit-scrollbar{display:none}` }),
      /* @__PURE__ */ jsx2("div", { className: "ss-v3-carousel", style: {
        display: "flex",
        gap: 14,
        padding: "0 20px 24px",
        alignItems: "stretch"
      }, children: examples.map((ex) => /* @__PURE__ */ jsx2("div", { style: { flex: "0 0 86%", scrollSnapAlign: "start", display: "flex" }, children: /* @__PURE__ */ jsx2(Caption, { ex }) }, ex.name)) })
    ] }) : /* @__PURE__ */ jsx2("div", { style: {
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridAutoRows: "1fr",
      gap: 24,
      maxWidth: 1280,
      margin: "48px auto 0",
      alignItems: "stretch"
    }, children: examples.map((ex) => /* @__PURE__ */ jsx2(Caption, { ex }, ex.name)) }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 28 : 44, textAlign: "center" }, children: /* @__PURE__ */ jsx2("a", { href: "#hero", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: VT.accent,
      color: "#fff",
      fontWeight: 700,
      padding: mobile ? "14px 24px" : "16px 32px",
      borderRadius: 999,
      fontSize: mobile ? 16 : 17,
      textDecoration: "none",
      boxShadow: "0 12px 28px -12px rgba(120,60,30,0.45)"
    }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u0436\u0435 \u0438\u0437 \u043C\u043E\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u2192" }) })
  ] });
}
var CYCLE_STEPS = [
  {
    n: "01",
    title: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u0442",
    cadence: "\u043E\u0434\u0438\u043D \u0440\u0430\u0437",
    body: "\u041F\u043E\u043A\u0430\u0436\u0435\u0442\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u2014 \u0437\u0430 2 \u0447\u0430\u0441\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438, \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0438 \u0433\u0430\u043B\u0435\u0440\u0435\u0435\u0439 \u0440\u0430\u0431\u043E\u0442. \u0422\u0435\u043A\u0441\u0442\u044B \u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u043C.",
    palette: { bg: "oklch(0.95 0.05 40)", ink: "oklch(0.32 0.14 35)", dec: "oklch(0.86 0.10 40)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3" }),
      /* @__PURE__ */ jsx2("path", { d: "M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3" })
    ] })
  },
  {
    n: "02",
    title: "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    body: "\u0420\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0437\u0430\u0433\u043B\u044F\u0434\u044B\u0432\u0430\u0435\u0442 \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041D\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u044B, \u043F\u043E\u0441\u0442\u044B \u0438\u043B\u0438 \u0444\u043E\u0442\u043E \u2014 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0451\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442. \u041E\u0442 \u0432\u0430\u0441 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.",
    palette: { bg: "oklch(0.94 0.06 95)", ink: "oklch(0.36 0.12 85)", dec: "oklch(0.84 0.12 90)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M14 32 a18 18 0 0 1 30 -13" }),
      /* @__PURE__ */ jsx2("path", { d: "M44 12 L44 22 L34 22" }),
      /* @__PURE__ */ jsx2("path", { d: "M50 32 a18 18 0 0 1 -30 13" }),
      /* @__PURE__ */ jsx2("path", { d: "M20 52 L20 42 L30 42" })
    ] })
  },
  {
    n: "03",
    title: "\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C",
    body: "\u0421\u043C\u043E\u0442\u0440\u0438\u0442, \u043A\u0430\u043A \u0432\u0435\u0434\u0443\u0442 \u0441\u0435\u0431\u044F \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438: \u043A\u0442\u043E \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B, \u0434\u043E \u0447\u0435\u0433\u043E \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u043B, \u0433\u0434\u0435 \u0437\u0430\u043A\u0440\u044B\u043B \u0432\u043A\u043B\u0430\u0434\u043A\u0443. \u0421\u0447\u0438\u0442\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0438 \u043E\u0442\u043A\u0443\u0434\u0430 \u043E\u043D\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442.",
    palette: { bg: "oklch(0.94 0.05 200)", ink: "oklch(0.34 0.10 220)", dec: "oklch(0.82 0.08 210)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M4 32 C 14 18, 50 18, 60 32" }),
      /* @__PURE__ */ jsx2("path", { d: "M4 32 C 14 46, 50 46, 60 32" }),
      /* @__PURE__ */ jsx2("circle", { cx: "32", cy: "32", r: "8" }),
      /* @__PURE__ */ jsx2("circle", { cx: "32", cy: "32", r: "3", fill: "currentColor" })
    ] })
  },
  {
    n: "04",
    title: "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
    body: "\u041F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0442\u0440\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C, \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u0442\u044C \u0438\u043D\u0430\u0447\u0435 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B.",
    palette: { bg: "oklch(0.94 0.05 145)", ink: "oklch(0.32 0.11 145)", dec: "oklch(0.82 0.08 145)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M12 14 L52 14 L52 44 L36 44 L28 54 L28 44 L12 44 Z" }),
      /* @__PURE__ */ jsx2("path", { d: "M22 26 L42 26 M22 34 L36 34" })
    ] })
  }
];
function CycleCard({ step, size = 240 }) {
  const p = step.palette;
  return /* @__PURE__ */ jsxs2("div", { style: {
    width: size,
    padding: 18,
    boxSizing: "border-box",
    background: p.bg,
    border: `2px solid ${p.ink}`,
    borderRadius: 18,
    boxShadow: `5px 5px 0 0 ${p.ink}`,
    color: p.ink,
    height: "100%",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        width: 48,
        height: 48,
        borderRadius: "50%",
        background: "#fff",
        border: `2px solid ${p.ink}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        color: p.ink,
        flex: "0 0 auto"
      }, children: step.icon }),
      /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: p.ink,
          opacity: 0.7,
          fontWeight: 600
        }, children: step.n }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: 6,
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.06em",
      color: p.ink,
      opacity: 0.75,
      fontStyle: "italic"
    }, children: step.cadence }),
    /* @__PURE__ */ jsx2("p", { style: {
      margin: "10px 0 0",
      fontSize: 13.5,
      lineHeight: 1.4,
      color: p.ink,
      textWrap: "pretty"
    }, children: step.body })
  ] });
}
function DesktopCycle() {
  const cardW = 250, cardH = 230;
  const gap = 40;
  const W = cardW * 4 + gap * 3;
  const arcH = 100;
  const H = cardH + arcH + 60;
  const cx = (i) => i * (cardW + gap) + cardW / 2;
  return /* @__PURE__ */ jsxs2("div", { style: { position: "relative", width: "100%", maxWidth: W, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(4, ${cardW}px)`,
      columnGap: gap,
      alignItems: "stretch",
      position: "relative",
      zIndex: 1
    }, children: CYCLE_STEPS.map((step, i) => /* @__PURE__ */ jsxs2("div", { style: { position: "relative", display: "flex" }, children: [
      /* @__PURE__ */ jsx2(CycleCard, { step, size: cardW }),
      i < 3 && /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 56,
        right: -gap,
        width: gap,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: VT.accent
      }, children: /* @__PURE__ */ jsxs2("svg", { width: gap, height: "24", viewBox: `0 0 ${gap} 24`, fill: "none", children: [
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: `M 2 12 L ${gap - 8} 12`,
            stroke: VT.accent,
            strokeWidth: "2.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx2(
          "path",
          {
            d: `M ${gap - 12} 6 L ${gap - 4} 12 L ${gap - 12} 18`,
            stroke: VT.accent,
            strokeWidth: "2.5",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            fill: "none"
          }
        )
      ] }) })
    ] }, step.n)) }),
    /* @__PURE__ */ jsxs2(
      "svg",
      {
        width: "100%",
        viewBox: `0 0 ${W} ${arcH + 60}`,
        preserveAspectRatio: "none",
        style: { display: "block", marginTop: -8, height: arcH + 60 },
        children: [
          /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2(
            "marker",
            {
              id: "v3retArr",
              viewBox: "0 0 10 10",
              refX: "8",
              refY: "5",
              markerWidth: "7",
              markerHeight: "7",
              orient: "auto-start-reverse",
              children: /* @__PURE__ */ jsx2("path", { d: "M0 0 L10 5 L0 10 z", fill: VT.accent })
            }
          ) }),
          /* @__PURE__ */ jsx2(
            "path",
            {
              d: `M ${cx(3)} 8 C ${cx(3)} ${arcH + 30}, ${cx(1)} ${arcH + 30}, ${cx(1)} 8`,
              fill: "none",
              stroke: VT.accent,
              strokeWidth: "2.5",
              strokeDasharray: "6 5",
              markerEnd: "url(#v3retArr)"
            }
          ),
          /* @__PURE__ */ jsx2("foreignObject", { x: (cx(1) + cx(3)) / 2 - 130, y: arcH + 6, width: "260", height: "40", children: /* @__PURE__ */ jsx2("div", { xmlns: "http://www.w3.org/1999/xhtml", style: {
            textAlign: "center",
            fontFamily: VT.font.mono,
            fontSize: 12,
            letterSpacing: "0.06em",
            color: VT.accent,
            fontWeight: 700
          }, children: "\u0438 \u0441\u043D\u043E\u0432\u0430 \u2014 \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E" }) })
        ]
      }
    )
  ] });
}
function MobileCycle() {
  return /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: CYCLE_STEPS.map((step, idx) => {
    const p = step.palette;
    const isLast = idx === CYCLE_STEPS.length - 1;
    return /* @__PURE__ */ jsxs2("div", { children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        background: p.bg,
        border: `2px solid ${p.ink}`,
        borderRadius: 18,
        boxShadow: `4px 4px 0 0 ${p.ink}`,
        padding: 18,
        color: p.ink
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsx2("span", { style: {
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#fff",
            border: `2px solid ${p.ink}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flex: "0 0 auto",
            color: p.ink
          }, children: step.icon }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsxs2("div", { style: {
              fontFamily: VT.font.mono,
              fontSize: 11,
              letterSpacing: "0.08em",
              opacity: 0.7,
              fontWeight: 600
            }, children: [
              step.n,
              " \xB7 ",
              step.cadence
            ] }),
            /* @__PURE__ */ jsx2("div", { style: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("p", { style: { margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.45, textWrap: "pretty" }, children: step.body })
      ] }),
      !isLast && /* @__PURE__ */ jsx2("div", { style: {
        textAlign: "center",
        height: 20,
        color: p.ink,
        fontSize: 18,
        lineHeight: "20px"
      }, children: "\u2193" })
    ] }, step.n);
  }) });
}
function CycleSection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "cycle", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(H2, { mobile, children: [
        "\u042D\u0442\u043E \u043D\u0435 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u043E\u0434\u0438\u043D \u0440\u0430\u0437.",
        /* @__PURE__ */ jsx2("br", {}),
        "\u042D\u0442\u043E \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C."
      ] }),
      /* @__PURE__ */ jsx2(Sub, { mobile, maxWidth: 760, children: "\u041E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043B\u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u0414\u0430\u043B\u044C\u0448\u0435 \u043E\u043D \u0441\u0430\u043C \u0445\u043E\u0434\u0438\u0442 \u043F\u043E \u043A\u0440\u0443\u0433\u0443: \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442, \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u043D\u0430 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439, \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u043A \u0432\u0430\u043C \u0441 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438. \u0427\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B." })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: !mobile ? /* @__PURE__ */ jsx2(DesktopCycle, {}) : /* @__PURE__ */ jsx2(MobileCycle, {}) }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx2("p", { style: {
      fontSize: mobile ? 15 : 17,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty",
      fontStyle: "italic"
    }, children: "\u0421\u0430\u0439\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u043D\u0435 \u043A\u0430\u043A \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0444\u0430\u0439\u043B \u2014 \u044D\u0442\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u043E\u043D \u043D\u0435\u043C\u043D\u043E\u0433\u043E \u0434\u0440\u0443\u0433\u043E\u0439. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0447\u0443\u0442\u044C \u043B\u0443\u0447\u0448\u0435, \u0447\u0435\u043C \u0431\u044B\u043B." }) }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx2("a", { href: "#hero", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: VT.accent,
      color: "#fff",
      fontWeight: 700,
      padding: mobile ? "14px 24px" : "16px 32px",
      borderRadius: 999,
      fontSize: mobile ? 16 : 17,
      textDecoration: "none",
      boxShadow: "0 12px 28px -12px rgba(120,60,30,0.45)"
    }, children: "\u0417\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0446\u0438\u043A\u043B \u2014 \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u0439 \u0441\u0430\u0439\u0442 \u2192" }) })
  ] });
}
var MONDAY_CARDS = [
  {
    accent: "oklch(0.605 0.155 35)",
    accentBg: "oklch(0.94 0.04 40)",
    eyebrow: "\u0426\u0415\u041D\u041D\u041E\u0421\u0422\u041D\u041E\u0415 \u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415",
    caseLabel: "\u041F\u0440\u0438\u043C\u0435\u0440: \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441",
    title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u0442 \u043C\u0438\u043C\u043E",
    body: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u0417\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430 \u0441\u0430\u0439\u0442 \u0437\u0430\u0448\u043B\u0438 ",
        /* @__PURE__ */ jsx2("b", { children: "312 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ". ",
        /* @__PURE__ */ jsx2("b", { children: "224" }),
        " \u0437\u0430\u043A\u0440\u044B\u043B\u0438 \u0435\u0433\u043E, \u0434\u043E \u0443\u0441\u043B\u0443\u0433 \u0434\u0430\u0436\u0435 \u043D\u0435 \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u0432."
      ] }),
      /* @__PURE__ */ jsx2("span", { children: "\u0412 \u0432\u0430\u0448\u0438\u0445 \u043E\u0442\u0437\u044B\u0432\u0430\u0445 \u043B\u044E\u0434\u0438 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u043F\u0438\u0448\u0443\u0442: \xAB\u0432\u0441\u0451 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434 \u0442\u0435\u043C, \u043A\u0430\u043A \u0447\u0438\u043D\u0438\u0442\u044C\xBB \u0438 \xAB\u043D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u044B\u0432\u0430\u043B\u0438\xBB. \u0412\u043E\u0442 \u0432\u0430\u0448\u0430 \u0441\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u0430. \u0412 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 \u0435\u0451 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0442." })
    ],
    suggestion: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx2("b", { children: "\xAB\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441, \u0433\u0434\u0435 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0442, \u043F\u043E\u0442\u043E\u043C \u0447\u0438\u043D\u044F\u0442\xBB" })
    ] }),
    actions: ["\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", "\u0414\u0440\u0443\u0433\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442", "\u041D\u0435 \u043D\u0430\u0434\u043E"]
  },
  {
    accent: "oklch(0.50 0.16 270)",
    accentBg: "oklch(0.94 0.04 270)",
    eyebrow: "\u041A\u041E\u041D\u0422\u0415\u041D\u0422",
    caseLabel: "\u041F\u0440\u0438\u043C\u0435\u0440: \u043A\u043E\u0444\u0435\u0439\u043D\u044F",
    title: "\xAB\u0417\u0430\u0432\u0442\u0440\u0430\u043A\u0438\xBB \u043D\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0442",
    body: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u0418\u0437 ",
        /* @__PURE__ */ jsx2("b", { children: "156 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ", \u043E\u0442\u043A\u0440\u044B\u0432\u0448\u0438\u0445 \u043C\u0435\u043D\u044E, ",
        /* @__PURE__ */ jsx2("b", { children: "98" }),
        " \u043D\u0430\u0436\u0430\u043B\u0438 \u043D\u0430 \xAB\u041A\u043E\u0444\u0435 \u0438 \u0434\u0435\u0441\u0435\u0440\u0442\u044B\xBB. \u041D\u0430 \xAB\u0417\u0430\u0432\u0442\u0440\u0430\u043A\u0438\xBB \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438 ",
        /* @__PURE__ */ jsx2("b", { children: "72" }),
        " \u0438 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx2("b", { children: "4" }),
        " \u0437\u0430\u043A\u0430\u0437\u0430\u043B\u0438."
      ] }),
      /* @__PURE__ */ jsx2("span", { children: "\u0423 \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u043E\u0432 \u043D\u0435\u0442 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0438 \u043D\u0435\u0442 \u0441\u043E\u0441\u0442\u0430\u0432\u0430. \u0422\u043E\u043B\u044C\u043A\u043E \u0446\u0435\u043D\u0430 \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435. \u0427\u0435\u043B\u043E\u0432\u0435\u043A \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442, \u0447\u0442\u043E \u0442\u0430\u043C \u0432 \u0441\u0435\u0442\u0435 \u0438 \u0441\u0442\u043E\u0438\u0442 \u043B\u0438 \u043E\u043D\u043E \u0442\u043E\u0433\u043E." })
    ],
    suggestion: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C ",
      /* @__PURE__ */ jsx2("b", { children: "3\u20134 \u0444\u043E\u0442\u043E" }),
      " \u0438 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u0442\u044C, \u0447\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442."
    ] }),
    actions: ["\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E", "\u0421\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", "\u041F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C"]
  },
  {
    accent: "oklch(0.45 0.11 145)",
    accentBg: "oklch(0.93 0.06 145)",
    eyebrow: "\u0421\u0422\u0420\u0423\u041A\u0422\u0423\u0420\u0410",
    caseLabel: "\u041F\u0440\u0438\u043C\u0435\u0440: \u0447\u0430\u0441\u0442\u043D\u0430\u044F \u043A\u043B\u0438\u043D\u0438\u043A\u0430",
    title: "\u041E\u0442\u0437\u044B\u0432\u044B \u0447\u0438\u0442\u0430\u044E\u0442. \xAB\u041E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u2014 \u043D\u0435\u0442",
    body: [
      /* @__PURE__ */ jsxs2("span", { children: [
        /* @__PURE__ */ jsx2("b", { children: "68%" }),
        " \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439 \u0434\u043E\u043B\u0438\u0441\u0442\u044B\u0432\u0430\u044E\u0442 \u0434\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u0438\u0434\u044F\u0442 \u043D\u0430 \u043D\u0438\u0445 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C ",
        /* @__PURE__ */ jsx2("b", { children: "22 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        ". \u0414\u043E \u0431\u043B\u043E\u043A\u0430 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx2("b", { children: "19%" }),
        ". \u041F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435 \u0443\u0445\u043E\u0434\u044F\u0442 \u0437\u0430 ",
        /* @__PURE__ */ jsx2("b", { children: "4 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        "."
      ] }),
      /* @__PURE__ */ jsx2("span", { children: "\u0421\u0435\u0439\u0447\u0430\u0441 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0438\u0434\u0451\u0442 \u0440\u0430\u043D\u044C\u0448\u0435 \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u044A\u0435\u0434\u0430\u0435\u0442 \u0438\u043C \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435." })
    ],
    suggestion: /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx2("b", { children: "\u043E\u0442\u0437\u044B\u0432\u044B \u043F\u043E\u0434\u043D\u044F\u0442\u044C \u0432\u044B\u0448\u0435" }),
      ", \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u043E \u0430\u0431\u0437\u0430\u0446\u0430 \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \u0432\u043D\u0438\u0437."
    ] }),
    actions: ["\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C, \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442", "\u041D\u0435 \u043D\u0430\u0434\u043E"]
  }
];
function MondayCard({ card, n, mobile }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 18px 36px -18px rgba(120,60,30,0.22)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      padding: "12px 16px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: card.accent,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 800,
        letterSpacing: "-0.04em"
      }, children: "\u0421" }),
      /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, fontWeight: 700, color: VT.ink, lineHeight: 1.15 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.04em" }, children: "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \xB7 9:14" })
      ] }),
      /* @__PURE__ */ jsxs2("span", { style: {
        marginLeft: "auto",
        fontFamily: VT.font.mono,
        fontSize: 10,
        letterSpacing: "0.1em",
        color: card.accent,
        background: card.accentBg,
        padding: "4px 8px",
        borderRadius: 6,
        fontWeight: 700
      }, children: [
        n,
        " / 3"
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 18px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 10.5,
        letterSpacing: "0.12em",
        color: card.accent,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: card.accent } }),
        /* @__PURE__ */ jsx2("span", { children: card.eyebrow }),
        /* @__PURE__ */ jsx2("span", { style: { marginLeft: "auto", fontStyle: "italic", fontWeight: 500, color: VT.inkFaint, letterSpacing: "0.02em" }, children: card.caseLabel })
      ] }),
      /* @__PURE__ */ jsx2("h3", { style: {
        fontSize: mobile ? 19 : 22,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        margin: 0,
        lineHeight: 1.2,
        color: VT.ink
      }, children: card.title }),
      card.body.map((p, i) => /* @__PURE__ */ jsx2("p", { style: {
        margin: 0,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: p }, i)),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 4,
        padding: "12px 14px",
        background: card.accentBg,
        borderRadius: 12
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 10,
          letterSpacing: "0.12em",
          fontWeight: 700,
          opacity: 0.8,
          color: card.accent
        }, children: "\u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }),
        /* @__PURE__ */ jsx2("div", { style: {
          marginTop: 4,
          fontSize: mobile ? 14.5 : 15.5,
          lineHeight: 1.45,
          color: VT.ink
        }, children: card.suggestion })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      padding: 10,
      borderTop: `1px solid ${VT.line}`,
      background: "#fff",
      display: "grid",
      gridTemplateColumns: `1fr auto auto`,
      gap: 6
    }, children: [
      /* @__PURE__ */ jsx2("button", { type: "button", style: {
        padding: "10px 14px",
        borderRadius: 10,
        border: "none",
        background: card.accent,
        color: "#fff",
        fontSize: 13.5,
        fontWeight: 600,
        cursor: "pointer"
      }, children: card.actions[0] }),
      /* @__PURE__ */ jsx2("button", { type: "button", style: {
        padding: "10px 12px",
        borderRadius: 10,
        background: "#fff",
        color: VT.ink,
        border: `1px solid ${VT.line}`,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer"
      }, children: card.actions[1] }),
      /* @__PURE__ */ jsx2("button", { type: "button", style: {
        padding: "10px 12px",
        borderRadius: 10,
        background: "#fff",
        color: VT.inkSoft,
        border: `1px solid ${VT.line}`,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer"
      }, children: card.actions[2] })
    ] })
  ] });
}
function MondaySection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "monday", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(H2, { mobile, children: [
        "\u041F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u2014 \u0442\u0440\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F,",
        /* @__PURE__ */ jsx2("br", {}),
        "\u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435"
      ] }),
      /* @__PURE__ */ jsx2(Sub, { mobile, maxWidth: 820, children: "\u0412\u0441\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043C\u043E\u0442\u0440\u0438\u0442, \u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0443 \u0432\u0430\u0441 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u0412 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0440\u0430\u0437\u0431\u043E\u0440: \u0433\u0434\u0435 \u0447\u0442\u043E \u043F\u0440\u043E\u0441\u0435\u043B\u043E \u0438 \u0447\u0442\u043E \u0441 \u044D\u0442\u0438\u043C \u0434\u0435\u043B\u0430\u0442\u044C. \u041D\u0435 \u043E\u0431\u0449\u0438\u043C\u0438 \u0444\u0440\u0430\u0437\u0430\u043C\u0438 \u2014 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E." })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1280,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: mobile ? /* @__PURE__ */ jsxs2("div", { style: {
      marginLeft: -20,
      marginRight: -20,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      scrollSnapType: "x mandatory",
      scrollPaddingLeft: 20,
      scrollbarWidth: "none"
    }, children: [
      /* @__PURE__ */ jsx2("style", { children: `.ss-v3-monday::-webkit-scrollbar{display:none}` }),
      /* @__PURE__ */ jsx2("div", { className: "ss-v3-monday", style: {
        display: "flex",
        gap: 14,
        padding: "4px 20px 24px",
        alignItems: "stretch"
      }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx2("div", { style: { flex: "0 0 88%", scrollSnapAlign: "start", display: "flex" }, children: /* @__PURE__ */ jsx2(MondayCard, { card: c, n: i + 1, mobile }) }, i)) })
    ] }) : /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      alignItems: "stretch"
    }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx2(MondayCard, { card: c, n: i + 1, mobile }, i)) }) }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx2("p", { style: {
      fontSize: mobile ? 14.5 : 16,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty"
    }, children: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u0430\u0432\u043E\u043A \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F. \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS." }) }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx2("a", { href: "#hero", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      background: VT.accent,
      color: "#fff",
      fontWeight: 700,
      padding: mobile ? "14px 24px" : "16px 32px",
      borderRadius: 999,
      fontSize: mobile ? 16 : 17,
      textDecoration: "none",
      boxShadow: "0 12px 28px -12px rgba(120,60,30,0.45)"
    }, children: "\u0425\u043E\u0447\u0443 \u0442\u0430\u043A\u0438\u0435 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u0434\u043B\u044F \u0441\u0432\u043E\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u2192" }) })
  ] });
}
var BASE_ITEMS = [
  {
    title: "\u041B\u043E\u0432\u0438\u0442 \u0437\u0430\u044F\u0432\u043A\u0438",
    body: "\u041A\u043B\u0438\u0435\u043D\u0442 \u043D\u0430\u0436\u0430\u043B \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u2014 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0434\u0430\u0435\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0432\u0430\u043C \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS. \u0411\u0435\u0437 CRM \u0438 \u0431\u0435\u0437 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u043E\u0432.",
    metric: "4 \u043A\u0430\u043D\u0430\u043B\u0430",
    metricNote: "\u043D\u0430 \u0432\u044B\u0431\u043E\u0440",
    palette: { bg: "oklch(0.94 0.045 40)", ink: "oklch(0.42 0.16 35)", stroke: "oklch(0.85 0.08 40)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("rect", { x: "10", y: "14", width: "44", height: "36", rx: "5" }),
      /* @__PURE__ */ jsx2("path", { d: "M10 22 L32 36 L54 22" })
    ] })
  },
  {
    title: "\u041E\u0442\u0431\u0438\u0440\u0430\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u044B",
    body: "\u0427\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u041D\u0430 \u0441\u0430\u0439\u0442 \u0441\u0442\u0430\u0432\u0438\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445 \u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445. \u041F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043E\u0442\u0437\u044B\u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442 \u0441\u0430\u043C.",
    metric: "4\u20136",
    metricNote: "\u043B\u0443\u0447\u0448\u0438\u0445 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E",
    palette: { bg: "oklch(0.94 0.045 80)", ink: "oklch(0.42 0.13 70)", stroke: "oklch(0.86 0.08 80)" },
    icon: /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M32 8 L37 23 L53 23 L40 33 L45 49 L32 39 L19 49 L24 33 L11 23 L27 23 Z" }) })
  },
  {
    title: "\u041F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A",
    body: "\u0421\u0440\u0430\u0437\u0443 \u0432 \u0438\u043D\u0434\u0435\u043A\u0441\u0435 \u042F\u043D\u0434\u0435\u043A\u0441\u0430 \u0438 Google. \u0417\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435, \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u0434\u043B\u044F \u043A\u0430\u0440\u0442 \u0438 \u0441\u043D\u0438\u043F\u043F\u0435\u0442\u043E\u0432. \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u0437 \u043A\u043E\u0440\u043E\u0431\u043A\u0438.",
    metric: "\u042F\u043D\u0434\u0435\u043A\u0441",
    metricNote: "+ Google",
    palette: { bg: "oklch(0.94 0.04 145)", ink: "oklch(0.40 0.11 145)", stroke: "oklch(0.86 0.07 145)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("circle", { cx: "27", cy: "27", r: "14" }),
      /* @__PURE__ */ jsx2("path", { d: "M38 38 L54 54" })
    ] })
  },
  {
    title: "\u041E\u0442\u0441\u0435\u043A\u0430\u0435\u0442 \u0441\u043F\u0430\u043C",
    body: "\u0410\u043D\u0442\u0438\u0431\u043E\u0442-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0436\u0438\u0432\u043E\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u043D\u0435 \u0437\u0430\u043C\u0435\u0447\u0430\u0435\u0442. \u0411\u043E\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u044E\u0442 \u0442\u0438\u0448\u0438\u043D\u0443. \u0414\u043E \u0432\u0430\u0441 \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438.",
    metric: "0",
    metricNote: "\u0431\u043E\u0442\u043E\u0432 \u0432 \u0434\u0435\u043D\u044C",
    palette: { bg: "oklch(0.94 0.04 270)", ink: "oklch(0.42 0.15 270)", stroke: "oklch(0.85 0.08 270)" },
    icon: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M32 8 L52 16 L52 32 C 52 44, 42 54, 32 56 C 22 54, 12 44, 12 32 L12 16 Z" }),
      /* @__PURE__ */ jsx2("path", { d: "M22 32 L29 39 L42 24" })
    ] })
  }
];
function BaseWorkSection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "base", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx2(H2, { mobile, children: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u2014 \u0442\u043E\u0436\u0435 \u043D\u0430 \u043D\u0451\u043C" }),
      /* @__PURE__ */ jsx2(Sub, { mobile, maxWidth: 720, children: "\u042D\u0442\u043E \u0442\u043E, \u0447\u0442\u043E \u043D\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445 \u043D\u0430\u0434\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u0440\u0443\u043A\u0430\u043C\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0438\u0442\u044C SMM-\u0449\u0438\u043A\u0443. \u0417\u0434\u0435\u0441\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u0437 \u043A\u043E\u0440\u043E\u0431\u043A\u0438, \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0447\u0430\u0441\u0442\u0438\u044F." })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 14 : 22
    }, children: BASE_ITEMS.map((item, i) => {
      const pal = item.palette;
      return /* @__PURE__ */ jsxs2("div", { style: {
        position: "relative",
        background: VT.white,
        borderRadius: 20,
        border: `1px solid ${VT.line}`,
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 18px 40px -24px rgba(120,60,30,0.18)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: {
          background: pal.bg,
          padding: mobile ? "22px 22px 18px" : "26px 28px 22px",
          borderBottom: `1px solid ${pal.stroke}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16
        }, children: [
          /* @__PURE__ */ jsx2("div", { style: {
            flex: "0 0 auto",
            width: mobile ? 56 : 64,
            height: mobile ? 56 : 64,
            borderRadius: 16,
            background: VT.white,
            color: pal.ink,
            border: `2px solid ${pal.ink}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `3px 3px 0 0 ${pal.ink}`
          }, children: item.icon }),
          /* @__PURE__ */ jsxs2("div", { style: {
            textAlign: "right",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0
          }, children: [
            /* @__PURE__ */ jsx2("div", { style: {
              fontSize: mobile ? 26 : 34,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              color: pal.ink
            }, children: item.metric }),
            /* @__PURE__ */ jsx2("div", { style: {
              marginTop: 4,
              fontFamily: VT.font.mono,
              fontSize: mobile ? 10.5 : 11.5,
              letterSpacing: "0.08em",
              color: pal.ink,
              opacity: 0.75,
              fontWeight: 600,
              textTransform: "uppercase"
            }, children: item.metricNote })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: {
          padding: mobile ? "18px 22px 22px" : "22px 28px 26px",
          display: "flex",
          flexDirection: "column",
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx2("h3", { style: {
            fontSize: mobile ? 20 : 23,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: 0,
            lineHeight: 1.2,
            color: VT.ink
          }, children: item.title }),
          /* @__PURE__ */ jsx2("p", { style: {
            margin: "8px 0 0",
            fontSize: mobile ? 14.5 : 15.5,
            lineHeight: 1.5,
            color: VT.inkSoft,
            textWrap: "pretty"
          }, children: item.body })
        ] })
      ] }, item.title);
    }) })
  ] });
}
var SOURCES_LIST = [
  {
    id: "yandex",
    name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    pull: "\u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B",
    featured: true,
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram-\u043A\u0430\u043D\u0430\u043B",
    pull: "\u043F\u043E\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx2("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    pull: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F",
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsxs2("linearGradient", { id: "iggrC", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx2("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx2("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx2("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx2("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggrC)" }),
      /* @__PURE__ */ jsx2("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx2("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx2("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u043E\u0442\u0437\u044B\u0432\u044B",
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx2("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx2("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "site",
    name: "\u0412\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    pull: "\u0442\u0435\u043A\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0443\u0441\u043B\u0443\u0433\u0438",
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx2("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx2("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0424\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    pull: "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx2("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx2("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
var SOURCES_SOON = ["\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435", "Ozon", "YouTube"];
function SourcesSection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "sources", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx2(H2, { mobile, children: "\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0432\u0441\u0451 \u0435\u0441\u0442\u044C \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx2(Sub, { mobile, maxWidth: 720, children: "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0432\u0441\u0451, \u0433\u0434\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435 \u0443\u0436\u0435 \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442 \u2014 \u0445\u0432\u0430\u0442\u0438\u0442 \u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430." })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 10 : 14
    }, children: SOURCES_LIST.map((s) => /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: mobile ? 14 : 18,
      padding: s.featured ? mobile ? "18px 18px" : "22px 24px" : mobile ? "14px 16px" : "18px 22px",
      background: VT.white,
      border: `1px solid ${s.featured ? VT.accent : VT.line}`,
      borderRadius: 14,
      position: "relative"
    }, children: [
      s.featured && /* @__PURE__ */ jsx2("span", { style: {
        position: "absolute",
        top: -10,
        right: 16,
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: "#fff",
        background: VT.accent,
        padding: "3px 8px",
        borderRadius: 6,
        fontWeight: 700
      }, children: "\u0427\u0410\u0429\u0415 \u0412\u0421\u0415\u0413\u041E" }),
      /* @__PURE__ */ jsx2("span", { style: { flex: "0 0 auto" }, children: s.logo }),
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          fontSize: mobile ? 15.5 : 17,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.022em",
          lineHeight: 1.2
        }, children: s.name }),
        /* @__PURE__ */ jsxs2("div", { style: {
          marginTop: 3,
          fontFamily: VT.font.mono,
          fontSize: mobile ? 11.5 : 12.5,
          letterSpacing: "0.02em",
          color: VT.inkSoft
        }, children: [
          "\u0437\u0430\u0431\u0438\u0440\u0430\u0435\u043C: ",
          s.pull
        ] })
      ] })
    ] }, s.id)) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 20 : 28,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 20 : 28}px auto 0`,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      justifyContent: mobile ? "flex-start" : "center"
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0421\u041A\u041E\u0420\u041E \u041F\u041E\u0414\u041A\u041B\u042E\u0427\u0418\u041C" }),
      SOURCES_SOON.map((n) => /* @__PURE__ */ jsx2("span", { style: {
        padding: "6px 14px",
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 13,
        color: VT.inkSoft,
        fontWeight: 500
      }, children: n }, n)),
      /* @__PURE__ */ jsx2("a", { style: {
        fontSize: 13.5,
        color: VT.accent,
        textDecoration: "underline",
        textUnderlineOffset: 4,
        marginLeft: mobile ? 0 : 6
      }, children: "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u2192" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 32 : 56,
      maxWidth: mobile ? "100%" : 1100,
      margin: `${mobile ? 32 : 56}px auto 0`,
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 18,
      padding: mobile ? "24px 22px" : "36px 44px",
      display: "flex",
      flexDirection: mobile ? "column" : "row",
      gap: mobile ? 18 : 32,
      alignItems: mobile ? "flex-start" : "center",
      position: "relative",
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        flex: "0 0 auto",
        width: mobile ? 64 : 88,
        height: mobile ? 64 : 88
      }, children: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 88 88", width: "100%", height: "100%", children: [
        /* @__PURE__ */ jsx2("path", { d: "M44 4 C 24 4, 10 18, 10 38 C 10 60, 44 84, 44 84 C 44 84, 78 60, 78 38 C 78 18, 64 4, 44 4 Z", fill: "#FC3F1D" }),
        /* @__PURE__ */ jsx2("text", { x: "44", y: "48", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "32", fill: "#fff", children: "\u042F" })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("h3", { style: {
          margin: 0,
          fontSize: mobile ? 21 : 26,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          color: VT.ink,
          textWrap: "balance"
        }, children: "\xAB\u0423 \u043C\u0435\u043D\u044F \u0436\u0435 \u0435\u0441\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445. \u0417\u0430\u0447\u0435\u043C \u043C\u043D\u0435 \u0435\u0449\u0451 \u0441\u0430\u0439\u0442?\xBB" }),
        /* @__PURE__ */ jsxs2("p", { style: {
          margin: "10px 0 0",
          fontSize: mobile ? 14.5 : 16,
          lineHeight: 1.5,
          color: VT.inkSoft,
          textWrap: "pretty"
        }, children: [
          "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u041A\u0430\u0440\u0442\u0430\u0445 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0432\u0430\u0441 \u0442\u0435\u043C, \u043A\u0442\u043E \u0438 \u0442\u0430\u043A \u0438\u0449\u0435\u0442 \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u0441. ",
          /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "\u0421\u0430\u0439\u0442 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0438 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0448\u0438\u0440\u043E\u043A\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C" }),
          " \u2014 \u0442\u0443\u0434\u0430, \u043A\u0443\u0434\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u0434\u043E\u0442\u044F\u0433\u0438\u0432\u0430\u0435\u0442\u0441\u044F. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0431\u0435\u0440\u0451\u0442 \u043E\u0442\u0442\u0443\u0434\u0430 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438 \u0434\u0435\u043B\u0430\u0435\u0442 \u0438\u0437 \u043D\u0438\u0445 \u0442\u043E, \u0447\u0435\u0433\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u041A\u0430\u0440\u0442\u0430\u0445 \u043D\u0435 \u0443\u043C\u0435\u0435\u0442."
        ] })
      ] })
    ] })
  ] });
}
var OWNER_POINTS = [
  {
    title: "\u041D\u0435 \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u0430\u0441\u044C \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u2014 \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u0435, \u0438 \u043E\u043D\u0430 \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442.",
    body: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \xAB\u043D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u044C \u0437\u043D\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0435\xBB."
  },
  {
    title: "\u0422\u0435\u043A\u0441\u0442 \u0438 \u0444\u043E\u0442\u043E \u043F\u0440\u0430\u0432\u0438\u0442\u0435 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A",
    body: "\u043F\u0440\u044F\u043C\u043E \u043D\u0430 \u0441\u0430\u0439\u0442\u0435, \u0431\u0435\u0437 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u043E\u0432."
  },
  {
    title: "\u0421\u0430\u0439\u0442 \u0432\u0430\u0448 \u2014 \u0437\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442.",
    body: "\u0410\u0440\u0445\u0438\u0432 HTML \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439."
  },
  {
    title: "\u0423\u0434\u0430\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043E\u0434\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u0435.",
    body: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 \u0438 \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \xAB\u0434\u0430\u0439\u0442\u0435 \u043F\u043E\u0434\u0443\u043C\u0430\u0442\u044C\xBB."
  }
];
function OwnershipSection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "ownership", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(H2, { mobile, children: [
        "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0434\u0435\u043B\u0430\u0435\u0442 \u0440\u0443\u0442\u0438\u043D\u0443.",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0420\u0435\u0448\u0435\u043D\u0438\u044F \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0437\u0430 \u0432\u0430\u043C\u0438"
      ] }),
      /* @__PURE__ */ jsx2(Sub, { mobile, maxWidth: 760, children: "\u0412\u0441\u0451, \u0447\u0442\u043E \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0418\u0418 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0435\u0440\u0435\u0437 \u0432\u0430\u0448\u0435 \xAB\u0434\u0430\xBB. \u0412\u0441\u0451, \u0447\u0442\u043E \u0441\u043E\u0431\u0440\u0430\u043B \u2014 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C. \u0417\u0430\u0445\u043E\u0442\u0435\u043B\u0438 \u0443\u0439\u0442\u0438 \u2014 \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u0438 \u0443\u0448\u043B\u0438." })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 980,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 10 : 14
    }, children: OWNER_POINTS.map((pt, i) => /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      padding: mobile ? "18px 18px" : "22px 24px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        flex: "0 0 auto",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: VT.accentSoft,
        color: VT.accent,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 2
      }, children: /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12 l4 4 10 -10" }) }) }),
      /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          fontSize: mobile ? 15.5 : 16.5,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.015em",
          lineHeight: 1.3
        }, children: pt.title }),
        /* @__PURE__ */ jsx2("div", { style: {
          marginTop: 4,
          fontSize: mobile ? 14 : 15,
          lineHeight: 1.45,
          color: VT.inkSoft
        }, children: pt.body })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 22 : 30, textAlign: "center" }, children: /* @__PURE__ */ jsxs2("a", { href: "client-admin-demo.html", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: mobile ? "12px 22px" : "14px 28px",
      background: VT.white,
      color: VT.ink,
      border: `1px solid ${VT.line}`,
      borderRadius: 999,
      fontSize: mobile ? 14.5 : 15,
      fontWeight: 600,
      textDecoration: "none"
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: VT.accent,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 10
      }, children: "\u25B6" }),
      "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0435\u043C\u043E \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430",
      /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2197" })
    ] }) })
  ] });
}
function AnalyticsSection({ mobile }) {
  const days = [5, 6, 8, 7, 9, 7, 5];
  const dayLabels = ["\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431", "\u0412\u0441"];
  const peakIdx = 4;
  const max = Math.max(...days);
  const observations = [
    {
      tag: "\u041F\u0418\u041A",
      tagColor: "oklch(0.60 0.15 35)",
      text: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0412 ",
        /* @__PURE__ */ jsx2("b", { children: "\u043F\u044F\u0442\u043D\u0438\u0446\u0443" }),
        " \u0437\u0430\u044F\u0432\u043E\u043A \u0432 \u0434\u0432\u0430 \u0440\u0430\u0437\u0430 \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0432 \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435. \u041F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u043F\u0440\u0438\u0432\u044B\u0447\u043A\u0443 \xAB\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u0435\u043B\u0430 \u043F\u0435\u0440\u0435\u0434 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u043C\u0438\xBB."
      ] })
    },
    {
      tag: "\u0420\u041E\u0421\u0422",
      tagColor: "oklch(0.50 0.13 145)",
      text: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430 ",
        /* @__PURE__ */ jsx2("b", { children: "+34%" }),
        " \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E. \u041F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u043E\u0434\u043D\u044F\u043B\u0438 \u0431\u043B\u043E\u043A \u043D\u0430\u0432\u0435\u0440\u0445 \u0433\u043B\u0430\u0432\u043D\u043E\u0439."
      ] })
    },
    {
      tag: "\u041F\u0420\u041E\u0412\u0410\u041B",
      tagColor: "oklch(0.50 0.16 270)",
      text: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\xAB\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436\xBB \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442, \u043D\u043E ",
        /* @__PURE__ */ jsx2("b", { children: "\u043D\u0435 \u043D\u0430\u0436\u0438\u043C\u0430\u044E\u0442" }),
        ". \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043D\u0435\u0442 \u0446\u0435\u043D \u2014 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A."
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs2("section", { id: "analytics", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(H2, { mobile, children: [
        "\u0422\u0435 \u0436\u0435 \u0434\u0430\u043D\u043D\u044B\u0435, \u0447\u0442\u043E \u0432\u0438\u0434\u0438\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442,",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0443 \u0432\u0430\u0441 \u043F\u0435\u0440\u0435\u0434 \u0433\u043B\u0430\u0437\u0430\u043C\u0438"
      ] }),
      /* @__PURE__ */ jsx2(Sub, { mobile, maxWidth: 760, children: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438, \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B\u0438, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u043B \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u0440\u0430\u0432\u043A\u0443 \u2014 \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u043D\u0435\u0434\u0435\u043B\u0435 \u0432\u0438\u0434\u0438\u0442\u0435, \u043A\u0430\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C \u0446\u0438\u0444\u0440\u044B." })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      background: VT.white,
      color: VT.ink,
      borderRadius: 22,
      overflow: "hidden",
      boxShadow: "0 24px 50px -28px rgba(120,60,30,0.25), 0 0 0 1px rgba(0,0,0,0.02)",
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        padding: mobile ? "12px 16px" : "14px 22px",
        borderBottom: `1px solid ${VT.line}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: VT.bgSoft
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" } }),
          /* @__PURE__ */ jsx2("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" } }),
          /* @__PURE__ */ jsx2("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#28C840" } })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: {
          flex: 1,
          padding: "5px 12px",
          background: VT.white,
          border: `1px solid ${VT.line}`,
          borderRadius: 6,
          fontFamily: VT.font.mono,
          fontSize: 11.5,
          color: VT.inkSoft,
          letterSpacing: "0.02em",
          display: mobile ? "none" : "flex",
          alignItems: "center",
          gap: 8
        }, children: [
          /* @__PURE__ */ jsxs2("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ jsx2("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
            /* @__PURE__ */ jsx2("path", { d: "M7 11 V7 a5 5 0 0 1 10 0 V11" })
          ] }),
          "app.samosite.online/analytics"
        ] }),
        /* @__PURE__ */ jsxs2("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.ink,
          fontWeight: 600
        }, children: [
          /* @__PURE__ */ jsx2("span", { style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "oklch(0.65 0.18 145)",
            boxShadow: "0 0 0 3px oklch(0.65 0.18 145 / 0.25)"
          } }),
          "LIVE"
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: {
        padding: mobile ? "12px 16px" : "14px 26px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        borderBottom: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { fontSize: mobile ? 14 : 16, fontWeight: 700, letterSpacing: "-0.02em" }, children: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 Park \xB7 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" }),
        /* @__PURE__ */ jsx2("span", { style: { flex: 1 } }),
        ["7 \u0434\u043D\u0435\u0439", "30 \u0434\u043D\u0435\u0439", "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F"].map((p, i) => /* @__PURE__ */ jsx2("button", { type: "button", style: {
          padding: "6px 12px",
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontSize: 12.5,
          fontWeight: 600,
          background: i === 0 ? VT.accent : "transparent",
          color: i === 0 ? "#fff" : VT.inkSoft,
          fontFamily: "inherit"
        }, children: p }, p))
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { padding: mobile ? "18px 16px" : "24px 26px" }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          display: "grid",
          gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: mobile ? 10 : 14
        }, children: [
          { label: "\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439", value: "1 284", delta: "+18%" },
          { label: "\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u044B \u0443\u0441\u043B\u0443\u0433", value: "892", delta: "+24%" },
          { label: "\u0437\u0430\u044F\u0432\u043E\u043A", value: "47", delta: "+12%", accent: true },
          { label: "\u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F", value: "3.7%", delta: "+0.4 \u043F.\u043F." }
        ].map((k, i) => /* @__PURE__ */ jsxs2("div", { style: {
          padding: mobile ? 14 : 16,
          borderRadius: 12,
          background: k.accent ? VT.accentSoft : VT.bgSoft,
          border: `1px solid ${k.accent ? VT.accent : VT.line}`,
          position: "relative",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ jsx2("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: VT.inkFaint,
            fontWeight: 600,
            textTransform: "uppercase"
          }, children: k.label }),
          /* @__PURE__ */ jsx2("div", { style: {
            marginTop: 8,
            fontSize: mobile ? 26 : 32,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: VT.ink,
            lineHeight: 1,
            fontFamily: VT.font.mono
          }, children: k.value }),
          /* @__PURE__ */ jsxs2("div", { style: {
            marginTop: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11.5,
            color: "oklch(0.50 0.13 145)",
            fontWeight: 600
          }, children: [
            /* @__PURE__ */ jsx2("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M5 1 L9 7 L1 7 Z" }) }),
            k.delta,
            " ",
            /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint, fontWeight: 500 }, children: "\u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E" })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxs2("div", { style: {
          marginTop: 18,
          padding: 18,
          borderRadius: 14,
          background: VT.bgSoft,
          border: `1px solid ${VT.line}`,
          position: "relative"
        }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u043E \u0434\u043D\u044F\u043C" }),
            /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: "\u043F\u043D \u2013 \u0432\u0441" }),
            /* @__PURE__ */ jsxs2("span", { style: { marginLeft: "auto", fontFamily: VT.font.mono, fontSize: 11, color: VT.inkSoft }, children: [
              "\u0432\u0441\u0435\u0433\u043E ",
              /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "47" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: {
            marginTop: 22,
            position: "relative",
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            alignItems: "end",
            height: mobile ? 140 : 180
          }, children: [
            /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }, children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx2("div", { style: { borderTop: `1px dashed ${VT.line}` } }, i)) }),
            days.map((d, i) => /* @__PURE__ */ jsx2("div", { style: {
              height: `${d / max * 100}%`,
              background: i === peakIdx ? `linear-gradient(180deg, ${VT.accent}, oklch(0.50 0.16 35))` : "oklch(0.84 0.06 50)",
              borderRadius: "6px 6px 0 0",
              position: "relative",
              boxShadow: i === peakIdx ? "0 -2px 16px rgba(217, 119, 87, 0.4)" : "none"
            }, children: /* @__PURE__ */ jsx2("span", { style: {
              position: "absolute",
              top: -20,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: VT.font.mono,
              fontSize: 11,
              color: i === peakIdx ? VT.accent : VT.inkSoft,
              fontWeight: i === peakIdx ? 700 : 500
            }, children: d }) }, i))
          ] }),
          /* @__PURE__ */ jsx2("div", { style: {
            marginTop: 6,
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            color: VT.inkFaint,
            textAlign: "center",
            letterSpacing: "0.04em"
          }, children: dayLabels.map((l, i) => /* @__PURE__ */ jsx2("span", { style: {
            color: i === peakIdx ? VT.accentSoft : "inherit",
            fontWeight: i === peakIdx ? 700 : 500
          }, children: l }, l)) })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: {
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? 12 : 16
        }, children: [
          /* @__PURE__ */ jsxs2("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx2("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438" }),
            [
              ["\u042F\u043D\u0434\u0435\u043A\u0441", 48, "oklch(0.55 0.14 30)"],
              ["Google", 22, "oklch(0.48 0.13 240)"],
              ["\u041F\u0440\u044F\u043C\u044B\u0435 \u0437\u0430\u0445\u043E\u0434\u044B", 12, "oklch(0.50 0.12 145)"],
              ["\u0421\u043E\u0446\u0441\u0435\u0442\u0438", 11, "oklch(0.55 0.10 280)"],
              ["\u0414\u0440\u0443\u0433\u043E\u0435", 7, "oklch(0.60 0.04 60)"]
            ].map(([label, v, color]) => /* @__PURE__ */ jsxs2("div", { style: { marginBottom: 9 }, children: [
              /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", fontSize: 12.5 }, children: [
                /* @__PURE__ */ jsx2("span", { style: { color: VT.ink }, children: label }),
                /* @__PURE__ */ jsxs2("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600 }, children: [
                  v,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx2("div", { style: { marginTop: 5, height: 6, background: VT.line, borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ jsx2("div", { style: { width: `${v}%`, height: "100%", background: color } }) })
            ] }, label))
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx2("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u0421\u0430\u043C\u044B\u0435 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }),
            [
              ["\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430", 142, "+34%"],
              ["\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", 98, "+8%"],
              ["\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", 64, "+2%"],
              ["\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436", 41, "\u221212%"]
            ].map(([n, v, delta]) => /* @__PURE__ */ jsxs2("div", { style: {
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              padding: "8px 0",
              borderBottom: `1px dashed ${VT.line}`
            }, children: [
              /* @__PURE__ */ jsx2("span", { style: { color: VT.ink, fontSize: 13 }, children: n }),
              /* @__PURE__ */ jsx2("span", { style: {
                fontFamily: VT.font.mono,
                fontSize: 11,
                fontWeight: 600,
                color: String(delta).startsWith("+") ? "oklch(0.75 0.16 145)" : "oklch(0.70 0.14 30)"
              }, children: delta }),
              /* @__PURE__ */ jsx2("span", { style: { flex: 1 } }),
              /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600, fontSize: 13 }, children: v })
            ] }, n))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("p", { style: {
      marginTop: mobile ? 22 : 30,
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 22 : 30}px auto 0`,
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.5,
      color: VT.inkSoft,
      textAlign: "center",
      textWrap: "pretty"
    }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0442\u0443\u0434\u0430 \u0436\u0435, \u043A\u0443\u0434\u0430 \u0438 \u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS. \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E, \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u043C\u0438 \u043D\u0430\u0439\u0434\u0443\u0442 \u0432\u0430\u0441." }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 20 : 28, textAlign: "center" }, children: /* @__PURE__ */ jsxs2("a", { href: "client-admin-demo.html", style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: mobile ? "13px 22px" : "15px 28px",
      background: VT.white,
      color: VT.ink,
      border: `1px solid ${VT.line}`,
      borderRadius: 999,
      fontSize: mobile ? 14.5 : 15.5,
      fontWeight: 600,
      textDecoration: "none",
      boxShadow: "0 6px 18px -10px rgba(120,60,30,0.20)"
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: VT.accent,
        color: VT.ink,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 9
      }, children: "\u25B6" }),
      "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0435\u043C\u043E \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430",
      /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2197" })
    ] }) })
  ] });
}
var PRICING_BULLETS = [
  "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430",
  "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u043C \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E",
  "\u041F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u043C \u0442\u0440\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0447\u0442\u043E \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C",
  "\u041F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u043C \u0437\u0430\u044F\u0432\u043A\u0438 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS",
  "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u0438 \u0441\u0432\u043E\u0434\u043A\u0430 \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E",
  "\u0417\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435, \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u042F\u043D\u0434\u0435\u043A\u0441 \u0438 Google",
  "\u0414\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u043E\u0441\u0441\u0438\u0438, \u043F\u043E \u0424\u0417-152"
];
function PricingSection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "pricing", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsx2("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxs2(H2, { mobile, children: [
      "\u041E\u0434\u0438\u043D \u0442\u0430\u0440\u0438\u0444.",
      /* @__PURE__ */ jsx2("br", {}),
      "\u0411\u0435\u0437 \u0430\u043F\u0441\u0435\u043B\u043E\u0432 \u0438 \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u0435\u043A"
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 48}px auto 0`
    }, children: [
      /* @__PURE__ */ jsxs2("div", { className: "ss-pricing-card", style: {
        background: VT.white,
        border: `2px solid ${VT.accent}`,
        borderRadius: 22,
        padding: mobile ? "28px 22px" : "44px 44px",
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 24px 60px -24px rgba(120,60,30,0.30)",
        position: "relative",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          position: "absolute",
          top: mobile ? 12 : 18,
          right: mobile ? -28 : -24,
          transform: "rotate(8deg)",
          background: VT.accent,
          color: "#fff",
          padding: mobile ? "5px 28px" : "6px 32px",
          fontFamily: VT.font.mono,
          fontSize: mobile ? 10.5 : 12,
          letterSpacing: "0.12em",
          fontWeight: 700,
          boxShadow: "0 4px 12px rgba(120,60,30,0.3)"
        }, children: "\u041C\u042B \u0417\u0410\u041F\u0423\u0421\u041A\u0410\u0415\u041C\u0421\u042F" }),
        /* @__PURE__ */ jsxs2("div", { style: { marginTop: mobile ? 28 : 16 }, children: [
          /* @__PURE__ */ jsx2("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: mobile ? 11 : 12.5,
            letterSpacing: "0.14em",
            color: VT.accent,
            fontWeight: 700
          }, children: "\u041F\u0415\u0420\u0412\u041E\u0419 \u0421\u041E\u0422\u041D\u0415 \u2014 \u041D\u0410\u0412\u0421\u0415\u0413\u0414\u0410" }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginTop: 8 }, children: [
            /* @__PURE__ */ jsx2("span", { style: {
              fontSize: mobile ? 56 : 88,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: VT.ink
            }, children: "490\xA0\u20BD" }),
            /* @__PURE__ */ jsx2("span", { style: { fontSize: mobile ? 16 : 20, color: VT.inkSoft, fontWeight: 500 }, children: "\u0432 \u043C\u0435\u0441\u044F\u0446" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: {
            marginTop: 6,
            fontSize: mobile ? 13.5 : 14.5,
            color: VT.inkSoft
          }, children: [
            "\u043F\u043E\u0442\u043E\u043C ",
            /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "990 \u20BD / \u043C\u0435\u0441\u044F\u0446" }),
            " \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0445"
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: {
          marginTop: mobile ? 18 : 22,
          padding: mobile ? "14px 16px" : "16px 22px",
          background: VT.accentSoft,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          gap: 14
        }, children: [
          /* @__PURE__ */ jsx2("span", { style: {
            flex: "0 0 auto",
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: VT.accent,
            color: "#fff",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsxs2("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx2("path", { d: "M20 12 V22 H4 V12" }),
            /* @__PURE__ */ jsx2("rect", { x: "2", y: "7", width: "20", height: "5", rx: "1" }),
            /* @__PURE__ */ jsx2("path", { d: "M12 22 V7" }),
            /* @__PURE__ */ jsx2("path", { d: "M12 7 C 12 3.5, 7.5 3.5, 7.5 7 C 7.5 7, 9.5 7, 12 7 Z" }),
            /* @__PURE__ */ jsx2("path", { d: "M12 7 C 12 3.5, 16.5 3.5, 16.5 7 C 16.5 7, 14.5 7, 12 7 Z" })
          ] }) }),
          /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ jsx2("div", { style: {
              fontSize: mobile ? 15.5 : 17,
              fontWeight: 700,
              color: VT.ink,
              letterSpacing: "-0.015em",
              lineHeight: 1.2
            }, children: "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0432\u043E\u043E\u0431\u0449\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" }),
            /* @__PURE__ */ jsx2("div", { style: {
              marginTop: 2,
              fontSize: mobile ? 13 : 14,
              color: VT.accent,
              fontWeight: 500
            }, children: "\u041A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { marginTop: mobile ? 20 : 26 }, children: [
          /* @__PURE__ */ jsx2("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: VT.inkFaint,
            fontWeight: 600,
            marginBottom: 10
          }, children: "\u0412\u0425\u041E\u0414\u0418\u0422 \u0412\u0421\u0401" }),
          /* @__PURE__ */ jsx2("ul", { style: {
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: 10
          }, children: PRICING_BULLETS.map((b) => /* @__PURE__ */ jsxs2("li", { style: {
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            fontSize: mobile ? 14.5 : 15.5,
            color: VT.ink,
            lineHeight: 1.45
          }, children: [
            /* @__PURE__ */ jsx2("span", { style: {
              flex: "0 0 auto",
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: VT.successSoft,
              color: VT.success,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 1
            }, children: /* @__PURE__ */ jsx2("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12 l4 4 10 -10" }) }) }),
            /* @__PURE__ */ jsx2("span", { children: b })
          ] }, b)) })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 24 : 32 }, children: /* @__PURE__ */ jsx2(Btn, { style: {
          width: "100%",
          padding: mobile ? "14px 22px" : "16px 26px",
          fontSize: mobile ? 15 : 16
        }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }) }),
        /* @__PURE__ */ jsx2("div", { style: {
          marginTop: 12,
          textAlign: "center",
          fontSize: 12.5,
          color: VT.inkSoft,
          fontStyle: "italic"
        }, children: "\u041E\u043F\u043B\u0430\u0442\u0443 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u043E\u0442\u043E\u043C, \u0435\u0441\u043B\u0438 \u0440\u0435\u0448\u0438\u0442\u0435 \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u043C\u0435\u0441\u044F\u0446\u0430." })
      ] }),
      /* @__PURE__ */ jsx2("p", { style: {
        margin: `${mobile ? 22 : 30}px auto 0`,
        maxWidth: 600,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.55,
        color: VT.inkSoft,
        textAlign: "center",
        textWrap: "pretty"
      }, children: "\u0427\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u044B SMM-\u0449\u0438\u043A\u0430 \u0441\u0442\u043E\u0438\u0442 \u0434\u043E\u0440\u043E\u0436\u0435. \u0414\u0435\u043D\u044C \u0432 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0435 \u0432 \u0434\u0435\u0441\u044F\u0442\u043A\u0438 \u0440\u0430\u0437. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0434\u0435\u043B\u0430\u0435\u0442 \u0442\u043E \u0436\u0435 \u0441\u0430\u043C\u043E\u0435: \u0431\u0435\u0437 \u0437\u0430\u0440\u043F\u043B\u0430\u0442\u044B, \u0431\u0435\u0437 \u043E\u0442\u043F\u0443\u0441\u043A\u043E\u0432, \u0431\u0435\u0437 \u0437\u0430\u0431\u044B\u0442\u044B\u0445 \u0437\u0430\u0434\u0430\u0447." })
    ] })
  ] });
}
var FAQ_NEW = [
  {
    q: "\xAB\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u0430\u043C \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0443\u043B\u0443\u0447\u0448\u0435\u043D\u0438\u044F\xBB \u2014 \u043E\u043D \u0447\u0442\u043E, \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u0435\u0442 \u043C\u043E\u0439 \u0441\u0430\u0439\u0442 \u0431\u0435\u0437 \u043C\u0435\u043D\u044F?",
    a: "\u041D\u0435\u0442. \u041A\u0430\u0436\u0434\u0430\u044F \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u2014 \u044D\u0442\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B \u0432\u0438\u0434\u0438\u0442\u0435, \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C. \u0414\u0430\u043B\u044C\u0448\u0435 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435: \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C, \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u0442\u044C \u0438\u043D\u0430\u0447\u0435 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F. \u0411\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \xAB\u0434\u0430\xBB \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F. \u041D\u0435 \u043D\u0443\u0436\u043D\u044B \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 \u2014 \u043E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0432 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0430\u0445."
  },
  {
    q: "\u041D\u0430 \u043A\u0430\u043A\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u043E\u043D \u0441\u0442\u0440\u043E\u0438\u0442 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438?",
    a: "\u041D\u0430 \u0442\u043E\u043C, \u043A\u0430\u043A \u0432\u0435\u043B\u0438 \u0441\u0435\u0431\u044F \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u0437\u0430 \u043F\u0440\u043E\u0448\u043B\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E: \u0447\u0442\u043E \u043E\u0442\u043A\u0440\u044B\u043B\u0438, \u0433\u0434\u0435 \u0437\u0430\u043A\u0440\u044B\u043B\u0438, \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0434\u043E\u0433\u0430\u0434\u043E\u043A, \u0442\u043E\u043B\u044C\u043A\u043E \u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043B\u0438\u043A\u0438. \u0415\u0441\u043B\u0438 \u0434\u0430\u043D\u043D\u044B\u0445 \u043C\u0430\u043B\u043E (\u043F\u0435\u0440\u0432\u0430\u044F \u043D\u0435\u0434\u0435\u043B\u044F \u0438\u043B\u0438 \u0440\u0435\u0434\u043A\u043E \u0437\u0430\u0445\u043E\u0434\u044F\u0442) \u2014 \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0439 \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435 \u0431\u0443\u0434\u0435\u0442. \u0427\u0442\u043E\u0431\u044B \u043D\u0435 \u0432\u044B\u0434\u0443\u043C\u044B\u0432\u0430\u0442\u044C."
  },
  {
    q: "\u0410 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0443\u0436\u0435 \u043F\u0440\u0438\u043C\u0435\u043D\u0451\u043D\u043D\u0443\u044E \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044E \u043C\u043E\u0436\u043D\u043E?",
    a: "\u0414\u0430, \u043B\u044E\u0431\u0443\u044E \u043F\u0440\u0430\u0432\u043A\u0443 \u043E\u0442\u043A\u0430\u0442\u044B\u0432\u0430\u0435\u043C \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A. \u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0440\u0430\u0432\u043E\u043A \u0445\u0440\u0430\u043D\u0438\u0442\u0441\u044F 90 \u0434\u043D\u0435\u0439."
  }
];
var FAQ_REST = [
  {
    q: "\u0410 \u0441\u0430\u043C \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u043C\u043E\u0433\u0443?",
    a: "\u0414\u0430. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0441\u0430\u0439\u0442, \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043B\u044E\u0431\u043E\u0439 \u0431\u043B\u043E\u043A \u2014 \u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u043F\u0440\u044F\u043C\u043E \u0442\u0430\u043C. \u0422\u0430\u043A \u0436\u0435 \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u0435 \u0444\u043E\u0442\u043E, \u0441\u043A\u0440\u043E\u0435\u0442\u0435 \u0443\u0441\u043B\u0443\u0433\u0443 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u0435 \u0446\u0435\u043D\u0443. \u0421\u0430\u0439\u0442 \u0432\u0430\u0448."
  },
  {
    q: "\u0423 \u043C\u0435\u043D\u044F \u043D\u0435\u0442 \u043D\u0438 Telegram-\u043A\u0430\u043D\u0430\u043B\u0430, \u043D\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445. \u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0442\u044C?",
    a: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 5\u201310 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0448\u0430\u043F\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0438\u0437 \u044D\u0442\u043E\u0433\u043E. \u041D\u0430 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0435\u0441\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E\xBB."
  },
  {
    q: "\u0410 \u0435\u0441\u043B\u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0447\u0442\u043E-\u0442\u043E \u043D\u0435 \u0442\u043E?",
    a: "\u041F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u0435 \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435, \u043F\u0430\u0440\u0430 \u043A\u043B\u0438\u043A\u043E\u0432. \u0415\u0441\u043B\u0438 \u0441\u043E\u0432\u0441\u0435\u043C \u043D\u0435 \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0440\u0430\u0442\u044C\xBB, \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0437\u0430\u043D\u043E\u0432\u043E \u0441 \u0434\u0440\u0443\u0433\u0438\u043C \u0442\u043E\u043D\u043E\u043C \u0438\u043B\u0438 \u0430\u043A\u0446\u0435\u043D\u0442\u043E\u043C."
  },
  {
    q: "\u041C\u043E\u0439 Telegram-\u043A\u0430\u043D\u0430\u043B \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0435\u0433\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0435\u0442?",
    a: "\u0414\u0430. \u041D\u0430 \u0432\u0440\u0435\u043C\u044F \u0441\u0431\u043E\u0440\u043A\u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0431\u043E\u0442\u0430 @SamositeIntakeBot \u0430\u0434\u043C\u0438\u043D\u043E\u043C \u0432 \u0441\u0432\u043E\u0439 \u043A\u0430\u043D\u0430\u043B \u043D\u0430 \u043F\u044F\u0442\u044C \u043C\u0438\u043D\u0443\u0442. \u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E\u0441\u0442\u044B \u0438 \u0441\u0440\u0430\u0437\u0443 \u0432\u044B\u0439\u0434\u0435\u043C. \u0411\u043E\u0442 \u043D\u0435 \u043F\u0438\u0448\u0435\u0442 \u0432 \u043A\u0430\u043D\u0430\u043B \u0438 \u043D\u0435 \u0432\u0438\u0434\u0438\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432."
  },
  {
    q: "\u041A\u0430\u043A \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442, \u043A\u0430\u043A\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u043B\u0443\u0447\u0448\u0438\u0435?",
    a: "\u0427\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430, \u043E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442 \u043E\u0434\u043D\u043E\u0441\u043B\u043E\u0436\u043D\u044B\u0435 (\xAB\u043D\u043E\u0440\u043C\xBB, \xAB-\xBB, \xAB\u043E\u043A\xBB), \u0442\u0440\u043E\u0439\u043A\u0438, \u0441\u043F\u0430\u043C \u0438 \u0442\u043E\u043A\u0441\u0438\u0447\u043D\u044B\u0435. \u0418\u0437 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0445\u0441\u044F \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445 \u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445. \u0420\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442: \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043E\u0442\u0437\u044B\u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442."
  },
  {
    q: "\u041A\u0443\u0434\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442 \u0437\u0430\u044F\u0432\u043A\u0443, \u0435\u0441\u043B\u0438 \u0443 \u043C\u0435\u043D\u044F \u043D\u0435\u0442 Telegram?",
    a: "\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u043E\u0434\u0438\u043D \u043A\u0430\u043D\u0430\u043B \u0438\u0437 \u0447\u0435\u0442\u044B\u0440\u0451\u0445: Telegram, MAX (\u0440\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u0438\u0439 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440 \u043E\u0442 VK), email \u0438\u043B\u0438 SMS \u043D\u0430 \u0442\u0435\u043B\u0435\u0444\u043E\u043D. \u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u0430\u0434\u0430\u0435\u0442 \u0442\u0443\u0434\u0430. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 CRM \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439."
  },
  {
    q: "\u0410 \u043C\u043E\u0439 \u0434\u043E\u043C\u0435\u043D \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043C\u043E\u0436\u043D\u043E?",
    a: "\u0415\u0441\u043B\u0438 \u0434\u043E\u043C\u0435\u043D \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u2014 \u043F\u0440\u0438\u0448\u043B\u0438\u0442\u0435, \u043F\u043E\u043C\u043E\u0436\u0435\u043C \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C DNS. \u0415\u0441\u043B\u0438 \u043D\u0435\u0442 \u2014 \u0441\u0430\u0439\u0442 \u0441\u0440\u0430\u0437\u0443 \u0436\u0438\u0432\u0451\u0442 \u043D\u0430 \u0430\u0434\u0440\u0435\u0441\u0435 \u0432\u0430\u0448-\u0441\u0430\u0439\u0442.samosite.online \u0441\u043E \u0432\u0441\u0435\u043C \u0442\u0435\u043C \u0436\u0435 \u0441\u0430\u043C\u044B\u043C. \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E."
  },
  {
    q: "\u0427\u0442\u043E \u0441 \u043C\u043E\u0438\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438, \u0435\u0441\u043B\u0438 \u044F \u043E\u0442\u043A\u0430\u0436\u0443\u0441\u044C \u043E\u0442 \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438?",
    a: "\u0421\u0430\u0439\u0442 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0451\u0442 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u0440\u0430\u0437\u0443. \u0422\u0435\u043A\u0441\u0442\u044B, \u0444\u043E\u0442\u043E \u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u0443\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 10 \u0434\u043D\u0435\u0439. \u0414\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u0441\u043A\u0430\u0447\u0430\u0435\u0442\u0435 \u0430\u0440\u0445\u0438\u0432 (HTML \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438) \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439. \u041F\u043E \u0424\u0417-152, \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u043E\u0441\u0441\u0438\u0438."
  },
  {
    q: "\u0410 \u0435\u0441\u043B\u0438 \u043A\u043B\u0438\u0435\u043D\u0442 \u043F\u043E\u0436\u0430\u043B\u0443\u0435\u0442\u0441\u044F \u043D\u0430 \u0441\u0430\u0439\u0442 \u2014 \u043A\u0442\u043E \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442?",
    a: "\u0417\u0430 \u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442\u0435 \u0432\u044B \u043A\u0430\u043A \u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446 \u0434\u0435\u043B\u0430. \u041C\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C, \u0447\u0442\u043E \u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u043D\u0430\u0440\u0443\u0448\u0430\u0435\u0442 \u0437\u0430\u043A\u043E\u043D. \u0424\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C \u2014 \u043D\u0430 \u0432\u0430\u0441. \xAB\u0421\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B\xBB, \xAB\u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F 14 \u0434\u043D\u0435\u0439\xBB \u2014 \u044D\u0442\u043E \u0432\u0430\u0448\u0438 \u043E\u0431\u0435\u0449\u0430\u043D\u0438\u044F. \u0415\u0441\u043B\u0438 \u043A\u043B\u0438\u0435\u043D\u0442 \u043F\u0438\u0448\u0435\u0442 \u043F\u0440\u043E \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0441\u0430\u0439\u0442\u0430 \u2014 \u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C, \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u043C."
  },
  {
    q: "\u0427\u0435\u0433\u043E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u041D\u0415 \u0443\u043C\u0435\u0435\u0442?",
    a: "\u041D\u0435 \u0441\u0434\u0435\u043B\u0430\u0435\u0442 \u0441\u0430\u0439\u0442 \xAB\u0438\u0437 \u043D\u0438\u0447\u0435\u0433\u043E\xBB \u2014 \u043D\u0443\u0436\u043D\u0430 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0430 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438\u043B\u0438 \u0444\u043E\u0442\u043E. \u041D\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u0442 \u0444\u043E\u0442\u043E \u0438 \u043D\u0435 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442 \u0447\u0443\u0436\u0438\u0435. \u041D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u0432 \u0447\u0430\u0442\u0430\u0445 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438. \u041D\u0435 \u043F\u043E\u043A\u0443\u043F\u0430\u0435\u0442 \u0434\u043E\u043C\u0435\u043D \u0438 \u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443. \u041D\u0435 \u0434\u0435\u043B\u0430\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D\u044B \u0441 \u043E\u043F\u043B\u0430\u0442\u043E\u0439 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u044F\u0432\u043A\u0438."
  }
];
function FaqItem({ q, a, defaultOpen, mobile, highlight }) {
  return /* @__PURE__ */ jsxs2("details", { open: defaultOpen, style: {
    background: VT.white,
    border: `1px solid ${highlight ? VT.accent : VT.line}`,
    borderRadius: 14,
    padding: 0,
    overflow: "hidden",
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsxs2("summary", { style: {
      listStyle: "none",
      cursor: "pointer",
      padding: mobile ? "16px 18px" : "18px 22px",
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontSize: mobile ? 15.5 : 16.5,
      fontWeight: 600,
      color: VT.ink,
      lineHeight: 1.35
    }, children: [
      /* @__PURE__ */ jsx2("style", { children: `details > summary::-webkit-details-marker { display: none; }` }),
      /* @__PURE__ */ jsx2("span", { style: { flex: 1 }, children: q }),
      /* @__PURE__ */ jsx2("span", { style: {
        flex: "0 0 auto",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: VT.bgSoft,
        color: VT.accent,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
        fontWeight: 700,
        lineHeight: 1
      }, children: "+" })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      padding: mobile ? "0 18px 16px" : "0 22px 20px",
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.55,
      color: VT.inkSoft,
      textWrap: "pretty"
    }, children: a })
  ] });
}
function FaqSection({ mobile }) {
  return /* @__PURE__ */ jsxs2("section", { id: "faq", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsx2("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx2(H2, { mobile, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0445\u043E\u0442\u044F\u0442 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 860,
      margin: `${mobile ? 28 : 48}px auto 0`
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.accent,
        fontWeight: 700,
        marginBottom: 12,
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
        "\u041F\u0420\u041E \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u042B\u0415 \u0420\u0415\u041A\u041E\u041C\u0415\u041D\u0414\u0410\u0426\u0418\u0418"
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_NEW.map((f, i) => /* @__PURE__ */ jsx2(FaqItem, { q: f.q, a: f.a, defaultOpen: i === 0, mobile, highlight: true }, f.q)) }),
      /* @__PURE__ */ jsx2("div", { style: {
        marginTop: 28,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600,
        marginBottom: 12
      }, children: "\u041E\u0421\u0422\u0410\u041B\u042C\u041D\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_REST.map((f) => /* @__PURE__ */ jsx2(FaqItem, { q: f.q, a: f.a, mobile }, f.q)) })
    ] })
  ] });
}
function FinalCtaSection({ mobile }) {
  const ladder = [
    { when: "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430", what: "\u0443 \u0432\u0430\u0441 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E", what: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u0440\u0438\u0448\u043B\u0451\u0442 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F, \u0447\u0442\u043E \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446", what: "\u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0441\u0430\u043C\u0438 \u0431\u044B \u043D\u0435 \u0434\u043E\u0433\u0430\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C" }
  ];
  return /* @__PURE__ */ jsx2("section", { id: "cta", style: {
    ...sectionPad(mobile),
    marginTop: mobile ? 64 : 130,
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1360,
    margin: `${mobile ? 64 : 130}px auto 0`
  }, children: /* @__PURE__ */ jsxs2("div", { style: {
    background: "oklch(0.20 0.020 60)",
    color: VT.bg,
    borderRadius: mobile ? 22 : 28,
    padding: mobile ? "36px 22px" : "72px 64px",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
      position: "absolute",
      right: -140,
      top: -120,
      width: 420,
      height: 420,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${VT.accent} 0%, transparent 60%)`,
      opacity: 0.4
    } }),
    /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
      position: "absolute",
      left: -100,
      bottom: -120,
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: `radial-gradient(circle, oklch(0.6 0.10 50) 0%, transparent 65%)`,
      opacity: 0.3
    } }),
    /* @__PURE__ */ jsxs2("div", { style: { position: "relative", maxWidth: 920, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2("h2", { style: {
        fontSize: mobile ? 28 : 50,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        margin: 0,
        lineHeight: 1.08,
        textWrap: "balance"
      }, children: [
        "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u2014 \u0441\u0430\u0439\u0442.",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0441\u0430\u043C\u0438",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0431\u044B \u043D\u0435 \u0434\u043E\u0433\u0430\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C."
      ] }),
      /* @__PURE__ */ jsx2("p", { style: {
        fontSize: mobile ? 16 : 19,
        lineHeight: 1.5,
        color: "oklch(0.85 0.014 60)",
        margin: `${mobile ? 16 : 22}px auto 0`,
        maxWidth: 720,
        textWrap: "pretty"
      }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u0435\u0434\u0451\u0442\u0435 \u0441\u0432\u043E\u0438 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0418\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442. \u0414\u0430\u043B\u044C\u0448\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442." }),
      /* @__PURE__ */ jsxs2("p", { style: {
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.5,
        color: "oklch(0.92 0.012 60)",
        margin: `${mobile ? 12 : 14}px auto 0`,
        maxWidth: 720,
        textWrap: "pretty",
        fontWeight: 500
      }, children: [
        "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u0414\u043B\u044F \u043F\u0435\u0440\u0432\u043E\u0439 \u0441\u043E\u0442\u043D\u0438 \u2014 ",
        /* @__PURE__ */ jsx2("b", { style: { color: VT.accentSoft }, children: "490 \u20BD \u0432 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430" }),
        "."
      ] }),
      /* @__PURE__ */ jsx2("div", { style: {
        marginTop: mobile ? 26 : 36,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
        gap: mobile ? 10 : 14,
        textAlign: "left",
        maxWidth: 880,
        margin: `${mobile ? 26 : 36}px auto 0`,
        position: "relative"
      }, children: ladder.map((rung, i) => /* @__PURE__ */ jsxs2("div", { style: {
        padding: mobile ? "16px 16px" : "20px 20px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsxs2("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.12em",
          color: VT.accentSoft,
          fontWeight: 700
        }, children: [
          /* @__PURE__ */ jsx2("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
          "\u0428\u0410\u0413 ",
          i + 1
        ] }),
        /* @__PURE__ */ jsx2("div", { style: {
          fontSize: mobile ? 18 : 21,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.025em",
          lineHeight: 1.15
        }, children: rung.when }),
        /* @__PURE__ */ jsx2("div", { style: {
          fontSize: mobile ? 14 : 14.5,
          color: "oklch(0.85 0.014 60)",
          lineHeight: 1.4,
          textWrap: "pretty"
        }, children: rung.what })
      ] }, i)) }),
      /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 28 : 36, display: "inline-flex" }, children: /* @__PURE__ */ jsx2(Btn, { iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), style: {
        padding: mobile ? "14px 24px" : "18px 32px",
        fontSize: mobile ? 16 : 18
      }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }) }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: mobile ? 20 : 26,
        paddingTop: mobile ? 16 : 22,
        borderTop: "1px solid rgba(255,255,255,0.10)",
        fontSize: mobile ? 13.5 : 14.5,
        color: "oklch(0.82 0.014 60)"
      }, children: [
        "\u041E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B? ",
        /* @__PURE__ */ jsx2("a", { style: {
          color: VT.accentSoft,
          textDecoration: "underline",
          textUnderlineOffset: 3
        }, children: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u2192" })
      ] })
    ] })
  ] }) });
}
function StickyHeader({ mobile = false }) {
  const px = mobile ? 20 : 80;
  const primaryStyle = mobile ? {
    background: VT.accent,
    color: "#fff",
    fontWeight: 600,
    fontSize: 13.5,
    padding: "8px 16px",
    borderRadius: 999,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 4,
    border: "none"
  } : {
    background: VT.accent,
    color: "#fff",
    fontWeight: 600,
    padding: "10px 20px",
    borderRadius: 999,
    fontSize: 14,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    boxShadow: "0 6px 16px -8px rgba(120,60,30,0.4)",
    border: "none"
  };
  const primaryLabel = mobile ? "\u0421\u043E\u0431\u0440\u0430\u0442\u044C" : "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0437\u0430 2 \u0447\u0430\u0441\u0430";
  return /* @__PURE__ */ jsxs2("div", { className: "ss-sticky-header", style: {
    position: "sticky",
    top: 0,
    zIndex: 10,
    width: "100%",
    paddingLeft: px,
    paddingRight: px,
    paddingTop: mobile ? 10 : 14,
    paddingBottom: mobile ? 10 : 14,
    background: "oklch(0.972 0.012 80 / 0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: `1px solid ${VT.lineSoft}`,
    boxSizing: "border-box"
  }, children: [
    /* @__PURE__ */ jsx2("style", { children: `
        .ss-sticky-header a.ss-nav-link { color: ${VT.inkSoft}; text-decoration: none; padding: 6px 2px; transition: color .15s ease; }
        .ss-sticky-header a.ss-nav-link:hover { color: ${VT.ink}; }
        .ss-sticky-header a.ss-login-link { color: ${VT.inkSoft}; text-decoration: none; border-radius: 999px; }
        .ss-sticky-header a.ss-login-link:hover { color: ${VT.ink}; background: ${VT.bgSoft}; }
      ` }),
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }, children: [
      /* @__PURE__ */ jsx2("a", { href: "#hero", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx2(BrandMark, { size: mobile ? 22 : 26, fontSize: mobile ? 18 : 20 }) }),
      !mobile ? /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 24, fontSize: 14 }, children: [
        /* @__PURE__ */ jsx2("a", { href: "#cycle", className: "ss-nav-link", children: "\u0426\u0438\u043A\u043B 4 \u0441\u0430\u043C" }),
        /* @__PURE__ */ jsx2("a", { href: "#monday", className: "ss-nav-link", children: "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A" }),
        /* @__PURE__ */ jsx2("a", { href: "#examples", className: "ss-nav-link", children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" }),
        /* @__PURE__ */ jsx2("a", { href: "#pricing", className: "ss-nav-link", children: "\u0426\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx2("a", { href: "#faq", className: "ss-nav-link", children: "\u041F\u043E\u043C\u043E\u0449\u044C" }),
        /* @__PURE__ */ jsx2("a", { href: "#login", className: "ss-login-link", style: {
          fontWeight: 500,
          fontSize: 14,
          padding: "8px 16px"
        }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs2("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] }) : /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx2("a", { href: "#login", className: "ss-login-link", style: { fontWeight: 500, fontSize: 13.5, padding: "8px 12px" }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs2("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] })
    ] })
  ] });
}
function Footer({ mobile }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    ...sectionPad(mobile),
    marginTop: mobile ? 40 : 64,
    paddingTop: mobile ? 22 : 28,
    borderTop: `1px solid ${VT.line}`,
    display: "flex",
    flexDirection: mobile ? "column" : "row",
    gap: mobile ? 14 : 18,
    justifyContent: "space-between",
    alignItems: mobile ? "flex-start" : "center",
    fontSize: 12.5,
    color: VT.inkFaint,
    position: "relative",
    zIndex: 1
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx2(BrandMark, { size: 20, fontSize: 15, color: VT.inkSoft }),
      /* @__PURE__ */ jsxs2("span", { children: [
        "\xA9 2026 \xB7 ",
        BRAND.domain,
        " \xB7 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u0424"
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx2("a", { style: { color: "inherit" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
      /* @__PURE__ */ jsx2("a", { style: { color: "inherit" }, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
      /* @__PURE__ */ jsx2("a", { style: { color: "inherit" }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" })
    ] })
  ] });
}
function SamosaytLandingV3({ mobile = false }) {
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const PREPS = /(^|[\s\u00A0(])([иваоксуяАИВОКСУЯ]|[Нн][еаио]|[Пп]о|[Зз]а|[Дд]о|[Оо]т|[Ии]з)(\s)/g;
    const SKIP = /* @__PURE__ */ new Set(["SCRIPT", "STYLE", "CODE", "SVG", "PATH", "INPUT", "TEXTAREA"]);
    const walk = (node) => {
      if (!node) return;
      if (node.nodeType === 3) {
        const t = node.nodeValue;
        if (!t || t.length < 3) return;
        const nt = t.replace(PREPS, (_, pre, w, sp) => `${pre}${w}\xA0`);
        if (nt !== t) node.nodeValue = nt;
        return;
      }
      if (node.nodeType !== 1) return;
      if (SKIP.has(node.tagName)) return;
      const cs = node.getAttribute && node.getAttribute("data-mono");
      if (cs === "true") return;
      for (let c = node.firstChild; c; c = c.nextSibling) walk(c);
    };
    walk(root);
    const STRIP = root.querySelectorAll("h1, h2, h3, h4, h5, h6, p, li, button, summary, blockquote");
    STRIP.forEach((el) => {
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      let last = null, n;
      while (n = tw.nextNode()) {
        if (n.nodeValue && n.nodeValue.replace(/\s/g, "")) last = n;
      }
      if (!last) return;
      const v = last.nodeValue;
      const trimmed = v.replace(/[\s\u00A0]+$/, "");
      if (!trimmed.endsWith(".") || trimmed.endsWith("...") || trimmed.endsWith("..")) return;
      last.nodeValue = v.replace(/\.[\s\u00A0]*$/, "");
    });
  }, [mobile]);
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx2("style", { children: `
        .ss-hero-pill:focus-within {
          border-color: ${VT.accent} !important;
          box-shadow: 0 0 0 4px ${VT.accentSoft}, 0 12px 32px -16px rgba(120,60,30,0.25) !important;
        }
        .ss-card-lift { transition: transform .2s ease-out, box-shadow .2s ease-out; }
        .ss-card-lift:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -14px rgba(120,60,30,0.18); }
        .ss-pricing-card { transition: transform .2s ease-out, box-shadow .2s ease-out; }
        .ss-pricing-card:hover { transform: translateY(-1px); box-shadow: 0 24px 60px -24px rgba(120,60,30,0.35); }
        details summary { transition: background-color .15s ease; }
        details summary:hover { background-color: ${VT.bgSoft}; }
        html { scroll-behavior: smooth; }
      ` }),
    /* @__PURE__ */ jsxs2("div", { ref: rootRef, className: "ss-v3-root", style: {
      width: "100%",
      minHeight: "100%",
      background: VT.bg,
      color: VT.ink,
      fontFamily: VT.font.sans,
      paddingTop: 0,
      paddingBottom: mobile ? 32 : 64,
      position: "relative",
      overflow: "hidden",
      letterSpacing: "-0.01em"
    }, children: [
      /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
        position: "absolute",
        right: mobile ? -120 : -180,
        top: mobile ? -100 : -160,
        width: mobile ? 380 : 720,
        height: mobile ? 380 : 720,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${VT.accentSoft} 0%, transparent 65%)`,
        opacity: 0.85,
        pointerEvents: "none"
      } }),
      /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
        position: "absolute",
        left: mobile ? -100 : -120,
        top: mobile ? 700 : 600,
        width: mobile ? 280 : 480,
        height: mobile ? 280 : 480,
        borderRadius: "50%",
        background: `radial-gradient(circle, oklch(0.94 0.020 90) 0%, transparent 70%)`,
        opacity: 0.7,
        pointerEvents: "none"
      } }),
      /* @__PURE__ */ jsx2(StickyHeader, { mobile }),
      /* @__PURE__ */ jsx2(HeroBlock, { mobile }),
      /* @__PURE__ */ jsx2(ExamplesSection, { mobile }),
      /* @__PURE__ */ jsx2(CycleSection, { mobile }),
      /* @__PURE__ */ jsx2(MondaySection, { mobile }),
      /* @__PURE__ */ jsx2(BaseWorkSection, { mobile }),
      /* @__PURE__ */ jsx2(SourcesSection, { mobile }),
      /* @__PURE__ */ jsx2(OwnershipSection, { mobile }),
      /* @__PURE__ */ jsx2(AnalyticsSection, { mobile }),
      /* @__PURE__ */ jsx2(PricingSection, { mobile }),
      /* @__PURE__ */ jsx2(FaqSection, { mobile }),
      /* @__PURE__ */ jsx2(FinalCtaSection, { mobile }),
      /* @__PURE__ */ jsx2(Footer, { mobile })
    ] })
  ] });
}
function SamosaytLandingV3_Desktop() {
  return /* @__PURE__ */ jsx2(SamosaytLandingV3, { mobile: false });
}
function SamosaytLandingV3_Mobile() {
  return /* @__PURE__ */ jsx2(SamosaytLandingV3, { mobile: true });
}
var SamosaytLanding = SamosaytLandingV3;
var Landing = SamosaytLandingV3;
var ConceptA_Desktop = SamosaytLandingV3_Desktop;
var ConceptA_Mobile = SamosaytLandingV3_Mobile;
var SamosaytLanding_Desktop = SamosaytLandingV3_Desktop;
var SamosaytLanding_Mobile = SamosaytLandingV3_Mobile;
var HeroSection = HeroBlock;
export {
  AnalyticsSection,
  BaseWorkSection,
  ConceptA_Desktop,
  ConceptA_Mobile,
  CycleSection,
  ExamplesSection,
  FaqSection,
  FinalCtaSection,
  HeroBlock,
  HeroSection,
  Landing,
  MondaySection,
  OwnershipSection,
  PricingSection,
  SamosaytLanding,
  SamosaytLandingV3,
  SamosaytLandingV3_Desktop,
  SamosaytLandingV3_Mobile,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  SourcesSection,
  StickyHeader
};
//# sourceMappingURL=index.js.map