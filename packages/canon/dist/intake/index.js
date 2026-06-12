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
function Btn(props) {
  const { children, variant = "primary", size = "md", style, icon, iconRight, onClick, type, disabled, ...rest } = props;
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
  return /* @__PURE__ */ jsxs("button", { ...rest, type: type ?? "button", onClick, disabled, "data-ss-cta": true, style: { ...base, ...variants[variant], ...style }, children: [
    icon,
    children,
    iconRight
  ] });
}
function Checkbox({ checked = false, label, link }) {
  return /* @__PURE__ */ jsxs("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: VT.inkSoft, lineHeight: 1.45, cursor: "pointer" }, children: [
    /* @__PURE__ */ jsx("span", { style: {
      flex: "0 0 auto",
      width: 18,
      height: 18,
      borderRadius: 5,
      border: `1.5px solid ${checked ? VT.accent : VT.line}`,
      background: checked ? VT.accent : VT.white,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 1
    }, children: checked && /* @__PURE__ */ jsx("svg", { width: 11, height: 11, viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 3, children: /* @__PURE__ */ jsx("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
    /* @__PURE__ */ jsxs("span", { children: [
      label,
      link && /* @__PURE__ */ jsxs(Fragment, { children: [
        " ",
        /* @__PURE__ */ jsx("a", { style: { color: VT.accent, textDecoration: "underline" }, children: link })
      ] })
    ] })
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
function Spinner({ size = 14 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style: { animation: "vt-spin 0.9s linear infinite" }, children: /* @__PURE__ */ jsx("circle", { cx: 12, cy: 12, r: 9, fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeDasharray: "40 20", strokeLinecap: "round" }) });
}

// src/presets/index.tsx
import React from "react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var editorialWarm = {
  id: "editorial-warm",
  family: "editorial",
  spectrum: "bold",
  label: "\u0442\u0451\u043F\u043B\u0430\u044F \xB7 \u043A\u043B\u0430\u0441\u0441\u0438\u043A\u0430",
  colors: {
    bg: "#FAF6F0",
    bgAlt: "#F2E6D2",
    ink: "#211C17",
    inkSoft: "#5C5048",
    inkFaint: "#897C6E",
    line: "#211C17",
    lineSoft: "#D3C7B0",
    accent: "#A8412E",
    accentSoft: "rgba(168,65,46,0.10)",
    accentInk: "#FAF6F0",
    invBg: "#211C17",
    invInk: "#FAF6F0",
    invAccent: "#D9A441",
    invInkSoft: "#B5A98F"
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace"
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: true }
};
var editorialNoir = {
  id: "editorial-noir",
  family: "editorial",
  spectrum: "dark",
  label: "\u0442\u0451\u043C\u043D\u0430\u044F \xB7 \u0437\u043E\u043B\u043E\u0442\u043E",
  colors: {
    bg: "#14110D",
    bgAlt: "#211C16",
    ink: "#EFE7D6",
    inkSoft: "#9A8F79",
    inkFaint: "#6B6354",
    line: "#EFE7D6",
    lineSoft: "#34301F",
    accent: "#D4A24E",
    accentSoft: "rgba(212,162,78,0.14)",
    accentInk: "#14110D",
    invBg: "#D4A24E",
    invInk: "#14110D",
    invAccent: "#14110D",
    invInkSoft: "#6B4F1E"
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace"
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: true, photoFilter: "contrast(1.05) saturate(0.85)" }
};
var editorialMono = {
  id: "editorial-mono",
  family: "editorial",
  spectrum: "bold",
  label: "\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F \xB7 teal",
  colors: {
    bg: "#ECEAE5",
    bgAlt: "#DEDBD3",
    ink: "#15211E",
    inkSoft: "#52605C",
    inkFaint: "#84908B",
    line: "#15211E",
    lineSoft: "#B8B5AD",
    accent: "#356E60",
    accentSoft: "rgba(53,110,96,0.12)",
    accentInk: "#F4F2EC",
    invBg: "#15211E",
    invInk: "#ECEAE5",
    invAccent: "#7FB3A4",
    invInkSoft: "#5E6B66"
  },
  fonts: {
    display: "'Geist Mono', 'JetBrains Mono', monospace",
    body: "'Geist Mono', 'JetBrains Mono', monospace",
    mono: "'Geist Mono', 'JetBrains Mono', monospace"
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: false, dropCap: true, photoFilter: "grayscale(0.6) contrast(1.1)" }
};
var bentoNoir = {
  id: "bento-noir",
  family: "bento",
  spectrum: "dark",
  label: "\u0442\u0451\u043C\u043D\u0430\u044F \xB7 \u0433\u0440\u0430\u0444\u0438\u0442",
  colors: {
    bg: "#0E0F10",
    bgAlt: "#17191B",
    ink: "#F2F0EC",
    inkSoft: "#9A9B98",
    inkFaint: "#6B6D6B",
    line: "#262A2C",
    lineSoft: "#1E2123",
    accent: "#C2D94A",
    accentSoft: "rgba(194,217,74,0.14)",
    accentInk: "#0E0F10",
    invBg: "#F2F0EC",
    invInk: "#0E0F10",
    invAccent: "#0E0F10",
    invInkSoft: "#5C5E5C"
  },
  fonts: { display: "'Space Grotesk', sans-serif", body: "'Space Grotesk', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 10, photo: 14, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var bentoLight = {
  id: "bento-light",
  family: "bento",
  spectrum: "classic",
  label: "\u0441\u0432\u0435\u0442\u043B\u0430\u044F \xB7 \u0441\u0442\u0430\u043B\u044C",
  colors: {
    bg: "#EFF1F4",
    bgAlt: "#FFFFFF",
    ink: "#16202E",
    inkSoft: "#5A6678",
    inkFaint: "#95A0AF",
    line: "#E0E4EA",
    lineSoft: "#ECEFF3",
    accent: "#2D5B8E",
    accentSoft: "rgba(45,91,142,0.10)",
    accentInk: "#FFFFFF",
    invBg: "#16202E",
    invInk: "#FFFFFF",
    invAccent: "#7FA8D9",
    invInkSoft: "#6B7787"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 16, btn: 8, photo: 16, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var bentoClay = {
  id: "bento-clay",
  family: "bento",
  spectrum: "soft",
  label: "\u0442\u0451\u043F\u043B\u0430\u044F \xB7 \u0433\u043B\u0438\u043D\u0430",
  colors: {
    bg: "#EDE6DB",
    bgAlt: "#F7F2E9",
    ink: "#2A211A",
    inkSoft: "#5C5048",
    inkFaint: "#8A7C6C",
    line: "#DBD2C3",
    lineSoft: "#E5DDD0",
    accent: "#B56A43",
    accentSoft: "rgba(181,106,67,0.12)",
    accentInk: "#F7F2E9",
    invBg: "#2A211A",
    invInk: "#F7F2E9",
    invAccent: "#D9A441",
    invInkSoft: "#8A7C6C"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 18, btn: 999, photo: 18, mark: 10 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var displaySoft = {
  id: "display-soft",
  family: "display",
  spectrum: "soft",
  label: "\u0440\u043E\u0437\u043E\u0432\u0430\u044F \xB7 \u0431\u044C\u044E\u0442\u0438",
  colors: {
    bg: "#F6E7E3",
    bgAlt: "#FBF3F1",
    ink: "#2A1820",
    inkSoft: "#6B4A52",
    inkFaint: "#9C7B82",
    line: "#E8CFC9",
    lineSoft: "#F0DED9",
    accent: "#8C4A52",
    accentSoft: "rgba(140,74,82,0.10)",
    accentInk: "#F6E7E3",
    invBg: "#2A1820",
    invInk: "#F6E7E3",
    invAccent: "#D99CA0",
    invInkSoft: "#8C6168"
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 10, btn: 999, photo: 10, mark: 6 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false }
};
var displayBold = {
  id: "display-bold",
  family: "display",
  spectrum: "bold",
  label: "\u043C\u044F\u0442\u043D\u0430\u044F \xB7 \u0441\u043C\u0435\u043B\u0430\u044F",
  colors: {
    bg: "#D6EDE3",
    bgAlt: "#E6F4EC",
    ink: "#10211B",
    inkSoft: "#3C544A",
    inkFaint: "#6B8276",
    line: "#B6D8C9",
    lineSoft: "#C8E2D6",
    accent: "#13231D",
    accentSoft: "rgba(16,33,27,0.08)",
    accentInk: "#D6EDE3",
    invBg: "#10211B",
    invInk: "#D6EDE3",
    invAccent: "#9FD9C0",
    invInkSoft: "#5C7368"
  },
  fonts: { display: "'Fraunces', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: false }
};
var displayNoir = {
  id: "display-noir",
  family: "display",
  spectrum: "dark",
  label: "\u0442\u0451\u043C\u043D\u0430\u044F \xB7 \u0437\u043E\u043B\u043E\u0442\u043E",
  colors: {
    bg: "#141210",
    bgAlt: "#201D19",
    ink: "#EFE9DD",
    inkSoft: "#9A9082",
    inkFaint: "#6B645A",
    line: "#322D27",
    lineSoft: "#262320",
    accent: "#D9B36A",
    accentSoft: "rgba(217,179,106,0.14)",
    accentInk: "#141210",
    invBg: "#D9B36A",
    invInk: "#141210",
    invAccent: "#141210",
    invInkSoft: "#6B5630"
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 4, btn: 4, photo: 4, mark: 2 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false, photoFilter: "saturate(0.85) contrast(1.05)" }
};
var displayInk = {
  id: "display-ink",
  family: "display",
  spectrum: "dark",
  label: "\u0433\u0440\u0430\u0444\u0438\u0442 \xB7 \u043A\u043E\u0441\u0442\u044C",
  colors: {
    bg: "#100F0E",
    bgAlt: "#1A1917",
    ink: "#ECE7DF",
    inkSoft: "#8E8780",
    inkFaint: "#605A53",
    line: "#2A2825",
    lineSoft: "#201E1C",
    accent: "#C9C2B6",
    accentSoft: "rgba(201,194,182,0.12)",
    accentInk: "#100F0E",
    invBg: "#ECE7DF",
    invInk: "#100F0E",
    invAccent: "#100F0E",
    invInkSoft: "#7A746C"
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 3, btn: 3, photo: 3, mark: 2 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false, photoFilter: "grayscale(0.35) contrast(1.08)" }
};
var splitProduct = {
  id: "split-product",
  family: "split",
  spectrum: "classic",
  label: "\u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u0430\u044F \xB7 \u0441\u0438\u043D\u044F\u044F",
  colors: {
    bg: "#FFFFFF",
    bgAlt: "#F5F7FA",
    ink: "#12233B",
    inkSoft: "#4F6178",
    inkFaint: "#93A1B3",
    line: "#E3E9F0",
    lineSoft: "#EEF2F6",
    accent: "#244A8E",
    accentSoft: "rgba(36,74,142,0.08)",
    accentInk: "#FFFFFF",
    invBg: "#12233B",
    invInk: "#FFFFFF",
    invAccent: "#82A9DC",
    invInkSoft: "#6A7A8E"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 12, btn: 8, photo: 12, mark: 6 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var splitClay = {
  id: "split-clay",
  family: "split",
  spectrum: "soft",
  label: "\u0437\u0435\u043C\u043B\u044F\u043D\u0430\u044F \xB7 \u043E\u043B\u0438\u0432\u0430",
  colors: {
    bg: "#EFE8DA",
    bgAlt: "#E3D9C5",
    ink: "#2A2116",
    inkSoft: "#5C4F3A",
    inkFaint: "#8A7B5E",
    line: "#D7CBB2",
    lineSoft: "#E2D8C4",
    accent: "#6E713F",
    accentSoft: "rgba(110,113,63,0.12)",
    accentInk: "#EFE8DA",
    invBg: "#2A2116",
    invInk: "#EFE8DA",
    invAccent: "#A8AB6F",
    invInkSoft: "#8A7B5E"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 999, photo: 14, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false, photoFilter: "saturate(0.95) sepia(0.05)" }
};
var splitTeal = {
  id: "split-teal",
  family: "split",
  spectrum: "bold",
  label: "\u0431\u0438\u0440\u044E\u0437\u043E\u0432\u0430\u044F \xB7 \u0441\u043C\u0435\u043B\u0430\u044F",
  colors: {
    bg: "#FFFFFF",
    bgAlt: "#EAF6F4",
    ink: "#0E2422",
    inkSoft: "#3F5C58",
    inkFaint: "#7D9794",
    line: "#D2E6E2",
    lineSoft: "#E6F2F0",
    accent: "#127068",
    accentSoft: "rgba(18,112,104,0.10)",
    accentInk: "#FFFFFF",
    invBg: "#0E2422",
    invInk: "#EAF6F4",
    invAccent: "#5FB8AC",
    invInkSoft: "#5C7672"
  },
  fonts: { display: "'Space Grotesk', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 6, btn: 6, photo: 6, mark: 4 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var stackedCorporate = {
  id: "stacked-corporate",
  family: "stacked",
  spectrum: "classic",
  label: "\u0434\u0435\u043B\u043E\u0432\u0430\u044F \xB7 \u0441\u0438\u043D\u0435-\u0441\u0435\u0440\u0430\u044F",
  colors: {
    bg: "#FFFFFF",
    bgAlt: "#F4F6F8",
    ink: "#1C2A39",
    inkSoft: "#5B6A7B",
    inkFaint: "#95A2B0",
    line: "#E4E9EE",
    lineSoft: "#EFF2F5",
    accent: "#1C2A39",
    accentSoft: "#EEF1F4",
    accentInk: "#FFFFFF",
    invBg: "#1C2A39",
    invInk: "#FFFFFF",
    invAccent: "#8CA3BC",
    invInkSoft: "#6B7888"
  },
  fonts: { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 12, btn: 8, photo: 12, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var stackedCream = {
  id: "stacked-cream",
  family: "stacked",
  spectrum: "soft",
  label: "\u0442\u0451\u043F\u043B\u0430\u044F \xB7 \u043E\u0445\u0440\u0430",
  colors: {
    bg: "#FAF5EC",
    bgAlt: "#FFFFFF",
    ink: "#2A2118",
    inkSoft: "#5C5040",
    inkFaint: "#8A7C66",
    line: "#E8DECB",
    lineSoft: "#F0E8D8",
    accent: "#A8631F",
    accentSoft: "rgba(168,99,31,0.10)",
    accentInk: "#FAF5EC",
    invBg: "#2A2118",
    invInk: "#FAF5EC",
    invAccent: "#D9A441",
    invInkSoft: "#8A7C66"
  },
  fonts: { display: "'Fraunces', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 999, photo: 14, mark: 8 },
  voice: { displayWeight: 500, italicAccent: false, dropCap: false, photoFilter: "sepia(0.05) saturate(0.95)" }
};
var stackedSlate = {
  id: "stacked-slate",
  family: "stacked",
  spectrum: "bold",
  label: "\u0433\u0440\u0430\u0444\u0438\u0442 \xB7 \u0430\u043A\u0446\u0435\u043D\u0442",
  colors: {
    bg: "#FBFBFA",
    bgAlt: "#F2F2F0",
    ink: "#1A1A1A",
    inkSoft: "#4F4F4D",
    inkFaint: "#8A8A86",
    line: "#E4E4E0",
    lineSoft: "#EEEEEB",
    accent: "#C24E2E",
    accentSoft: "rgba(194,78,46,0.10)",
    accentInk: "#FBFBFA",
    invBg: "#1A1A1A",
    invInk: "#FBFBFA",
    invAccent: "#E08A5C",
    invInkSoft: "#6B6B68"
  },
  fonts: { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 10, btn: 6, photo: 10, mark: 6 },
  voice: { displayWeight: 800, italicAccent: false, dropCap: false }
};
var themes = {
  [editorialWarm.id]: editorialWarm,
  [editorialNoir.id]: editorialNoir,
  [editorialMono.id]: editorialMono,
  [bentoNoir.id]: bentoNoir,
  [bentoLight.id]: bentoLight,
  [bentoClay.id]: bentoClay,
  [displaySoft.id]: displaySoft,
  [displayBold.id]: displayBold,
  [displayNoir.id]: displayNoir,
  [displayInk.id]: displayInk,
  [splitProduct.id]: splitProduct,
  [splitClay.id]: splitClay,
  [splitTeal.id]: splitTeal,
  [stackedCorporate.id]: stackedCorporate,
  [stackedCream.id]: stackedCream,
  [stackedSlate.id]: stackedSlate
};
function getTheme(themeId) {
  const t = themes[themeId];
  if (!t) throw new Error(`@samosite/canon/presets: unknown themeId "${themeId}"`);
  return t;
}
function EditorialFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, mn = content.menu, q = content.quote;
  const accentEm = (text) => text.split(/\[\[(.+?)\]\]/g).map(
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx2(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx2("em", { style: { fontStyle: v.italicAccent ? "italic" : "normal", color: c.accent }, children: p }, i)
  );
  const rule = `1px solid ${c.line}`;
  const ruleSoft = `1px solid ${c.lineSoft}`;
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { padding: "10px 16px 8px", borderBottom: `2px solid ${c.ink}`, textAlign: "center", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: c.inkSoft, marginBottom: 3 }, children: [
        "\u0441 ",
        m.since,
        " \xB7 ",
        m.category
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 25, fontWeight: v.displayWeight, letterSpacing: "-0.02em", lineHeight: 1 }, children: m.brand })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 16px", borderBottom: rule, fontFamily: f.mono, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: c.inkSoft, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u2605\u2605\u2605\u2605\u2605 ",
        m.rating
      ] }),
      /* @__PURE__ */ jsxs2("span", { children: [
        m.reviewsN,
        " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "12px 16px 10px", borderBottom: rule, flex: "0 0 auto" }, children: /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 26, fontWeight: v.displayWeight, lineHeight: 0.96, letterSpacing: "-0.03em", margin: 0 }, children: content.hero.headingLines.map((l, i) => /* @__PURE__ */ jsxs2(React.Fragment, { children: [
      accentEm(l),
      i < content.hero.headingLines.length - 1 && /* @__PURE__ */ jsx2("br", {})
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "1 1 auto", minHeight: 70, position: "relative", overflow: "hidden", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }),
      /* @__PURE__ */ jsx2("div", { style: { position: "absolute", left: 0, bottom: 0, padding: "4px 10px", background: c.bg, borderTop: rule, borderRight: rule, fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft }, children: content.hero.photoCaption || m.address })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx2("div", { style: { padding: "7px 16px 5px", fontFamily: f.mono, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: c.inkSoft }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8, padding: "5px 16px", borderTop: i ? ruleSoft : "none" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkFaint, flex: "0 0 auto" }, children: it.num }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.display, fontSize: 13, fontWeight: v.displayWeight, whiteSpace: "nowrap", flex: "0 0 auto" }, children: it.name }),
        /* @__PURE__ */ jsx2("span", { style: { flex: 1, borderBottom: `1px dotted ${c.lineSoft}`, transform: "translateY(-3px)" } }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 10, fontWeight: 600, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", padding: "9px 16px", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontStyle: "italic", fontSize: 13, lineHeight: 1.3 }, children: accentEm(q.text) }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "stretch", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("a", { style: { flex: 1, background: c.accent, color: c.accentInk, padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }, children: [
        content.cta.primary.label,
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.display, fontSize: 18, fontStyle: v.italicAccent ? "italic" : "normal" }, children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { padding: "0 14px", display: "flex", alignItems: "center", fontFamily: f.mono, fontSize: 10, color: c.accentInk, background: c.ink, whiteSpace: "nowrap" }, children: content.cta.phone })
    ] })
  ] });
}
function renderEm(text, color, italic) {
  return text.split(/\[\[(.+?)\]\]/g).map(
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx2(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx2("em", { style: { fontStyle: italic ? "italic" : "normal", color }, children: p }, i)
  );
}
function BentoFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, s = content.stats, mn = content.menu, q = content.quote;
  const tile = { background: c.bgAlt, borderRadius: r.card, border: `1px solid ${c.line}`, padding: 11, overflow: "hidden" };
  const lbl = { fontFamily: f.mono, fontSize: 8, color: c.inkFaint, textTransform: "uppercase", letterSpacing: "0.06em" };
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", padding: 11, gap: 7, fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 7, fontFamily: f.display, fontWeight: 700, fontSize: 13, letterSpacing: "-0.02em" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 20, height: 20, background: c.accent, color: c.accentInk, borderRadius: r.mark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }, children: m.brand[0] }),
        m.brand
      ] }),
      /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkSoft }, children: [
        "\u2605 ",
        m.rating
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, background: c.accent, color: c.accentInk, border: "none", flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 8, padding: 13 }, children: [
      /* @__PURE__ */ jsxs2("span", { style: { alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 5, background: c.bg, color: c.accent, padding: "4px 8px", borderRadius: 999, fontSize: 8, fontWeight: 700, fontFamily: f.mono, textTransform: "uppercase", letterSpacing: "0.05em" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 4, height: 4, background: c.accent, borderRadius: "50%" } }),
        "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F"
      ] }),
      /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 22, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0 }, children: content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "") })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, flex: "0 0 auto" }, children: s.slice(0, 3).map((st, i) => /* @__PURE__ */ jsxs2("div", { style: tile, children: [
      /* @__PURE__ */ jsx2("div", { style: lbl, children: st.label }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 3, color: i === 1 ? c.accent : c.ink }, children: [
        st.num,
        /* @__PURE__ */ jsx2("span", { style: { fontSize: 11, color: c.inkFaint }, children: st.unit })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx2("div", { style: { borderRadius: r.card, overflow: "hidden", flex: "1 1 auto", minHeight: 50 }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { ...lbl, marginBottom: 6 }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, paddingTop: i ? 6 : 0, marginTop: i ? 6 : 0, borderTop: i ? `1px solid ${c.line}` : "none" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.accent, fontWeight: 700, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, lineHeight: 1.35 }, children: renderEm(q.text, c.accent, false) }),
      /* @__PURE__ */ jsxs2("div", { style: { ...lbl, marginTop: 6 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, flex: "0 0 auto", background: c.invBg, color: c.invInk, border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em" }, children: content.cta.primary.label }),
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.invInkSoft, marginTop: 1 }, children: content.cta.phone })
      ] }),
      /* @__PURE__ */ jsx2("span", { style: { width: 28, height: 28, background: c.accent, color: c.accentInk, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "0 0 auto" }, children: "\u2192" })
    ] })
  ] });
}
function DisplayFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, s = content.stats, mn = content.menu;
  const lines = content.hero.headingLines;
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600 }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 6, height: 6, background: c.accent, borderRadius: "50%" } }),
        m.brand
      ] }),
      /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: c.ink, padding: "5px 10px", border: `1px solid ${c.ink}`, borderRadius: 999 }, children: [
        "\u2605 ",
        m.rating
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "2px 16px 12px", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 44, fontWeight: v.displayWeight, lineHeight: 0.84, letterSpacing: "-0.045em", margin: 0 }, children: lines.map((l, i) => /* @__PURE__ */ jsx2("span", { style: { display: "block", color: i === 1 ? c.accent : c.ink, fontStyle: i === 1 && v.italicAccent ? "italic" : "normal", textIndent: i === 1 ? 16 : 0, textAlign: i === 2 ? "right" : "left" }, children: renderEm(l, c.accent, v.italicAccent) }, i)) }) }),
    /* @__PURE__ */ jsx2("div", { style: { flex: "1 1 auto", minHeight: 60, overflow: "hidden" }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, flex: "0 0 auto" }, children: s.slice(0, 3).map((st, i) => /* @__PURE__ */ jsxs2("div", { style: { flex: 1, padding: "8px 10px", textAlign: "center", borderRight: i < 2 ? `1px solid ${c.line}` : "none" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, lineHeight: 1, color: c.accent }, children: [
        st.num,
        /* @__PURE__ */ jsx2("span", { style: { fontSize: 11, color: c.inkFaint }, children: st.unit })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 7.5, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft, marginTop: 3 }, children: st.label })
    ] }, i)) }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "8px 16px 4px", flex: "0 0 auto" }, children: (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, padding: "4px 0", borderTop: i ? `1px solid ${c.lineSoft}` : "none" }, children: [
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
      /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.inkSoft, flex: "0 0 auto" }, children: it.price })
    ] }, i)) }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 16px", background: c.invBg, color: c.invInk, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: c.invInkSoft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: m.address }),
      /* @__PURE__ */ jsxs2("a", { style: { background: c.invAccent, color: c.invBg, padding: "9px 16px", borderRadius: r.btn, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", flex: "0 0 auto" }, children: [
        content.cta.primary.label.split(" ")[0],
        " \u2192"
      ] })
    ] })
  ] });
}
function SplitFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, s = content.stats, mn = content.menu, q = content.quote;
  const heading = content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "");
  const div = `1px solid ${c.invInkSoft}55`;
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flex: "1 1 auto", minHeight: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { width: "42%", minHeight: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0, background: c.invBg, color: c.invInk, display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700 }, children: [
            m.brand,
            /* @__PURE__ */ jsx2("span", { style: { color: c.invAccent }, children: "." })
          ] }),
          /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 8, opacity: 0.7 }, children: [
            "\u2605 ",
            m.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 14px" }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: c.invAccent, marginBottom: 8 }, children: m.category }),
          /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 24, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }, children: heading }),
          /* @__PURE__ */ jsxs2("p", { style: { fontSize: 11, lineHeight: 1.5, opacity: 0.82, margin: "10px 0 0" }, children: [
            content.hero.leadParagraph?.slice(0, 96),
            "\u2026"
          ] })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: `repeat(${s.length}, 1fr)`, borderTop: div, flex: "0 0 auto" }, children: s.map((st, i) => /* @__PURE__ */ jsxs2("div", { style: { padding: "9px 6px", textAlign: "center", borderRight: i < s.length - 1 ? div : void 0 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 16, fontWeight: 800, color: c.invAccent, lineHeight: 1 }, children: [
            st.num,
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 10 }, children: st.unit })
          ] }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 7, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.65, marginTop: 3 }, children: st.label })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", padding: "11px 16px 9px", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: 7 }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, padding: "5px 0", borderTop: i ? `1px solid ${c.lineSoft}` : "none" }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 8.5, color: c.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 10, fontWeight: 700, color: c.accent, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", padding: "9px 16px", background: c.bgAlt, borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, lineHeight: 1.4 }, children: renderEm(q.text, c.accent, false) }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("a", { style: { background: c.accent, color: c.accentInk, padding: "13px 16px", textAlign: "center", fontSize: 12, fontWeight: 700, flex: "0 0 auto", display: "block" }, children: [
      content.cta.primary.label,
      " \u2192"
    ] })
  ] });
}
function StackedFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, mn = content.menu, q = content.quote;
  const heading = content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "");
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${c.line}`, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em" }, children: m.brand }),
      /* @__PURE__ */ jsx2("a", { style: { background: c.accent, color: c.accentInk, padding: "7px 13px", borderRadius: r.btn, fontSize: 11, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 18px 10px", textAlign: "center", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: c.accentSoft, color: c.accent, borderRadius: 999, fontSize: 10, fontWeight: 500, marginBottom: 9 }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 5, height: 5, background: c.accent, borderRadius: "50%" } }),
        m.category,
        " \xB7 ",
        m.address.split(",").pop()?.trim()
      ] }),
      /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 23, fontWeight: v.displayWeight, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "0 auto", maxWidth: "94%" }, children: heading }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "center", gap: 8, fontSize: 11, color: c.inkSoft, marginTop: 9, alignItems: "center" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx2("b", { children: m.rating }),
        /* @__PURE__ */ jsx2("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs2("span", { children: [
          m.reviewsN,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { flex: "1 1 auto", minHeight: 50, margin: "0 18px", borderRadius: r.photo, overflow: "hidden" }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "11px 18px 4px", flex: "0 0 auto" }, children: (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "8px 11px", marginBottom: 6, border: `1px solid ${c.line}`, borderRadius: r.btn, background: c.bgAlt }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 9.5, color: c.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.desc })
      ] }),
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 11.5, fontWeight: 700, color: c.accent, whiteSpace: "nowrap", flex: "0 0 auto" }, children: it.price })
    ] }, i)) }),
    /* @__PURE__ */ jsx2("div", { style: { padding: "6px 18px 10px", flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs2("div", { style: { padding: "10px 12px", borderRadius: r.card, background: c.accentSoft, fontSize: 11, lineHeight: 1.4 }, children: [
      renderEm(q.text, c.accent, false),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 9, color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 18px", display: "flex", gap: 8, flex: "0 0 auto", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("a", { style: { flex: 1, background: c.accent, color: c.accentInk, padding: "12px", borderRadius: r.btn, textAlign: "center", fontSize: 13, fontWeight: 600 }, children: content.cta.primary.label }),
      /* @__PURE__ */ jsx2("a", { style: { padding: "12px 16px", border: `1px solid ${c.line}`, borderRadius: r.btn, textAlign: "center", fontSize: 12, whiteSpace: "nowrap", display: "flex", alignItems: "center", color: c.ink }, children: content.cta.phone })
    ] })
  ] });
}
var FAMILIES = {
  editorial: EditorialFamily,
  bento: BentoFamily,
  display: DisplayFamily,
  split: SplitFamily,
  stacked: StackedFamily
};
function PresetRenderer({ preset, content }) {
  const theme = getTheme(preset.themeId);
  const Family = FAMILIES[preset.familyId] ?? FAMILIES.editorial;
  if (theme.family !== preset.familyId) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn(`[@samosite/canon] preset mismatch: theme "${theme.id}" is for family "${theme.family}", but preset.familyId is "${preset.familyId}"`);
    }
  }
  return /* @__PURE__ */ jsx2(Family, { theme, content });
}
function MiniChrome({ host, children, height = 720 }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    overflow: "hidden",
    borderRadius: 12,
    border: `1px solid ${VT.lineSoft}`,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    height,
    background: VT.white
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", background: "#fff", borderBottom: `1px solid ${VT.line}`, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: [
        host,
        ".",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children })
  ] });
}
var EX_U = (id, w = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
var fixtureCoffeeLena = {
  meta: { brand: "\u0423\u0442\u0440\u043E \u0443 \u041B\u0435\u043D\u044B", host: "lena", category: "\u041A\u043E\u0444\u0435\u0439\u043D\u044F", address: "\u041F\u043B\u0430\u0442\u043E\u043D\u043E\u0432\u0430 12, \u0412\u043E\u0440\u043E\u043D\u0435\u0436", since: "2019", rating: "4.9", reviewsN: 128 },
  hero: {
    headingLines: ["\u041A\u043E\u0444\u0435", "[[&]] \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u0438", "\u0441 07:30"],
    leadParagraph: "\u041B\u0435\u043D\u0430 \u043E\u0431\u0436\u0430\u0440\u0438\u0432\u0430\u0435\u0442 \u0437\u0435\u0440\u043D\u043E \u0441\u0430\u043C\u0430, \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E. \u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u043C\u043E\u043B\u043E\u043A\u043E \u0431\u0435\u0437 \u0434\u043E\u043F\u043B\u0430\u0442. \u0412\u044B\u043D\u043E\u0441 \u0437\u0430 \u0442\u0440\u0438 \u043C\u0438\u043D\u0443\u0442\u044B \u2014 \u0443\u0441\u043F\u0435\u0435\u0442\u0435 \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443.",
    photoSrc: EX_U("photo-1495474472287-4d71bcdd2085", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0441\u0442\u043E\u0439\u043A\u0430, \u0447\u0435\u0442\u0432\u0435\u0440\u0433 08:14"
  },
  stats: [
    { num: "07:30", label: "\u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435" },
    { num: "3", unit: " \u043C\u0438\u043D", label: "\u0432\u044B\u043D\u043E\u0441" },
    { num: "0 \u20BD", label: "\u0430\u043B\u044C\u0442.\u043C\u043E\u043B\u043E\u043A\u043E" }
  ],
  menu: {
    eyebrow: "\u041C\u0435\u043D\u044E \u0443\u0442\u0440\u0430",
    title: "\u0427\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 [[\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C]]",
    items: [
      { num: "01", name: "\u041A\u0430\u043F\u0443\u0447\u0438\u043D\u043E", desc: "250 \u043C\u043B \xB7 \u0430\u043B\u044C\u0442.\u043C\u043E\u043B\u043E\u043A\u043E \u0431\u0435\u0437 \u0434\u043E\u043F\u043B\u0430\u0442", price: "220 \u20BD" },
      { num: "02", name: "\u0420\u0430\u0444 \u0432\u0430\u043D\u0438\u043B\u044C\u043D\u044B\u0439", desc: "300 \u043C\u043B \xB7 \u043D\u0430 \u0441\u043B\u0438\u0432\u043A\u0430\u0445", price: "280 \u20BD" },
      { num: "03", name: "\u0421\u044B\u0440\u043D\u0438\u043A\u0438 \u0441\u043E \u0441\u043C\u0435\u0442\u0430\u043D\u043E\u0439", desc: "3 \u0448\u0442 \xB7 180 \u0433", price: "340 \u20BD" },
      { num: "04", name: "\u0410\u0432\u043E\u043A\u0430\u0434\u043E-\u0442\u043E\u0441\u0442", desc: "\u0441 \u044F\u0439\u0446\u043E\u043C-\u043F\u0430\u0448\u043E\u0442", price: "390 \u20BD" }
    ]
  },
  quote: { text: '\xAB\u0420\u0435\u0431\u044F\u0442\u0430 \u043F\u043E\u043C\u043D\u044F\u0442 \u043C\u043E\u0451 [["\u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u043E"]] \u0441 \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E \u0440\u0430\u0437\u0430.\xBB', authorName: "\u0410\u043B\u0438\u043D\u0430 \u041A.", authorSource: "2\u0413\u0418\u0421", authorWhen: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A \u043F\u0440\u0438\u0445\u043E\u0434\u0443" }, phone: "+7 (900) 000-00-12" }
};
var fixtureBakeryDom = {
  meta: { brand: "\u041F\u0435\u043A\u0430\u0440\u043D\u044F \xAB\u0414\u043E\u043C\xBB", host: "dom-bakery", category: "\u041F\u0435\u043A\u0430\u0440\u043D\u044F", address: "\u0411\u043E\u043B\u044C\u0448\u0430\u044F \u041A\u043E\u043D\u044E\u0448\u0435\u043D\u043D\u0430\u044F 9, \u041F\u0438\u0442\u0435\u0440", since: "2017", rating: "4.8", reviewsN: 246 },
  hero: {
    headingLines: ["\u0425\u043B\u0435\u0431", "\u043D\u0430 [[\u0437\u0430\u043A\u0432\u0430\u0441\u043A\u0435]]", "\u0434\u043E \u043F\u043E\u043B\u0443\u0434\u043D\u044F"],
    leadParagraph: "\u041F\u0435\u0447\u0451\u043C \u0432 5 \u0443\u0442\u0440\u0430, \u0432\u044B\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u043C \u043A 7. \u041F\u043E\u0441\u043B\u0435 12:00 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u2014 \u043B\u0443\u0447\u0448\u0435 \u0431\u0440\u0430\u0442\u044C \u0441 \u0443\u0442\u0440\u0430 \u0438\u043B\u0438 \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0430\u043A\u0430\u043D\u0443\u043D\u0435 \u0447\u0435\u0440\u0435\u0437 Telegram.",
    photoSrc: EX_U("photo-1509440159596-0249088772ff", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043F\u0435\u0447\u044C, \u0441\u0440\u0435\u0434\u0430 06:30"
  },
  stats: [
    { num: "05:00", label: "\u043D\u0430\u0447\u0430\u043B\u043E \u0432\u044B\u043F\u0435\u0447\u043A\u0438" },
    { num: "18", label: "\u0432\u0438\u0434\u043E\u0432 \u0445\u043B\u0435\u0431\u0430" },
    { num: "0 \u20BD", label: "\u0434\u0440\u043E\u0436\u0436\u0435\u0439" }
  ],
  menu: {
    eyebrow: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432 \u043F\u0435\u0447\u043A\u0435",
    title: "\u0427\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 [[\u043D\u0430 \u0437\u0430\u0432\u0442\u0440\u0430]]",
    items: [
      { num: "01", name: "\u0411\u043E\u0440\u043E\u0434\u0438\u043D\u0441\u043A\u0438\u0439 \u043D\u0430 \u0437\u0430\u043A\u0432\u0430\u0441\u043A\u0435", desc: "500 \u0433 \xB7 \u0441 \u0442\u043C\u0438\u043D\u043E\u043C", price: "240 \u20BD" },
      { num: "02", name: "\u0411\u0430\u0433\u0435\u0442 \u0444\u0435\u0440\u043C\u0435\u0440\u0441\u043A\u0438\u0439", desc: "320 \u0433 \xB7 \u0445\u0440\u0443\u0441\u0442\u044F\u0449\u0430\u044F \u043A\u043E\u0440\u043A\u0430", price: "180 \u20BD" },
      { num: "03", name: "\u0427\u0438\u0430\u0431\u0430\u0442\u0442\u0430 \u043E\u043B\u0438\u0432\u043A\u043E\u0432\u0430\u044F", desc: "280 \u0433", price: "210 \u20BD" },
      { num: "04", name: "\u0421\u043B\u043E\u0439\u043A\u0430 \u0441 \u044F\u0431\u043B\u043E\u043A\u043E\u043C", desc: "110 \u0433 \xB7 \u0434\u043E\u043C\u0430\u0448\u043D\u0435\u0435 \u0442\u0435\u0441\u0442\u043E", price: "120 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0425\u043B\u0435\u0431 \u043A\u0430\u043A \u0443 \u0431\u0430\u0431\u0443\u0448\u043A\u0438 \u0432 \u0434\u0435\u0440\u0435\u0432\u043D\u0435. [[\u041A\u043E\u0440\u043A\u0430 \u0442\u0430\u043A\u0430\u044F \u0436\u0435]], \u043D\u0435 \u043A\u0430\u043A \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435.\xBB", authorName: "\u041C\u0430\u0440\u0438\u044F \u0420.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "5 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A \u0443\u0442\u0440\u0443" }, phone: "+7 (900) 000-00-11" }
};
var fixtureAutoPark = {
  meta: { brand: "Park \xB7 \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441", host: "park-auto", category: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441", address: "\u041F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u0430\u044F 14, \u0421\u0430\u043C\u0430\u0440\u0430", since: "2013", rating: "4.8", reviewsN: 214 },
  hero: {
    headingLines: ["\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", "\u0437\u0430 [[30 \u043C\u0438\u043D\u0443\u0442]]", "\u0431\u0435\u0437 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432"],
    leadParagraph: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0432\u043E\u043D\u043E\u043A \u0438 \u0440\u0430\u0441\u0447\u0451\u0442. \u041F\u043E\u0441\u043B\u0435 \xAB\u0434\u0430\xBB \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u043C \u2014 \u0431\u0435\u0437 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432 \u0432 \u0447\u0435\u043A\u0435. \u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B \u043E\u043A\u043D\u0430 14:00 \u0438 16:30.",
    photoSrc: EX_U("photo-1486262715619-67b85e0b08d3", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0431\u043E\u043A\u0441 \u21162, \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A"
  },
  stats: [
    { num: "12", unit: " \u043B\u0435\u0442", label: "\u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435" },
    { num: "4.8", label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433 2\u0413\u0418\u0421" },
    { num: "6 \u043C\u0435\u0441", label: "\u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441 \u0431\u0435\u0437 \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u0435\u043A",
    title: "\u0427\u0442\u043E [[\u0434\u0435\u043B\u0430\u0435\u043C]] \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
    items: [
      { num: "01", name: "\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", desc: "\u0445\u043E\u0434\u043E\u0432\u0430\u044F, \u0442\u043E\u0440\u043C\u043E\u0437\u0430, \u042D\u0411\u0423 \xB7 30 \u043C\u0438\u043D", price: "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" },
      { num: "02", name: "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430 + \u0444\u0438\u043B\u044C\u0442\u0440", desc: "\u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B \u0438\u043B\u0438 \u0430\u043D\u0430\u043B\u043E\u0433", price: "\u043E\u0442 1 200 \u20BD" },
      { num: "03", name: "\u0422\u043E\u0440\u043C\u043E\u0437\u043D\u044B\u0435 \u043A\u043E\u043B\u043E\u0434\u043A\u0438", desc: "\u043F\u0435\u0440\u0435\u0434\u043D\u0438\u0435 / \u0437\u0430\u0434\u043D\u0438\u0435", price: "\u043E\u0442 2 800 \u20BD" },
      { num: "04", name: "\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", desc: "3D \xB7 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F 6 \u043C\u0435\u0441", price: "\u043E\u0442 2 400 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u043B\u0438, \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438, \u0447\u0442\u043E \u0438 \u0437\u0430\u0447\u0435\u043C. [[\u041D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u0430\u043B\u0438]].\xBB", authorName: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u0412.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", authorWhen: "6 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443" }, phone: "+7 (900) 000-00-08" }
};
var fixtureNailsAnna = {
  meta: { brand: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B", host: "anna-nails", category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", address: "\u041A\u0443\u0439\u0431\u044B\u0448\u0435\u0432\u0430 8, \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", since: "2017", rating: "5.0", reviewsN: 86 },
  hero: {
    headingLines: ["\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", "\u043C\u0430\u043D\u0438\u043A\u044E\u0440,", "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F [[3 \u043D\u0435\u0434\u0435\u043B\u0438]]"],
    leadParagraph: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043E\u0434\u043D\u0430 \u0410\u043D\u043D\u0430, \u043D\u0435 \u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440. \u0417\u0430\u043F\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 Telegram, \u0431\u0435\u0437 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0438 CRM. \u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 \u0434\u0432\u0430 \u043D\u043E\u0433\u0442\u044F \u0432 \u043F\u043E\u0434\u0430\u0440\u043E\u043A \u043F\u0440\u0438 \u043F\u0435\u0440\u0432\u043E\u043C \u0432\u0438\u0437\u0438\u0442\u0435.",
    photoSrc: EX_U("photo-1604654894610-df63bc536371", 720),
    gallery: [EX_U("photo-1610992015732-2449b76344bc", 480), EX_U("photo-1632345031435-8727f6897d53", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0440\u0430\u0431\u043E\u0442\u0430, \u0447\u0435\u0442\u0432\u0435\u0440\u0433"
  },
  stats: [
    { num: "21", unit: " \u0434\u0435\u043D\u044C", label: "\u0441\u0440\u0435\u0434\u043D\u044F\u044F \u043D\u043E\u0441\u043A\u0430" },
    { num: "5.0", label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433" },
    { num: "9", unit: " \u043B\u0435\u0442", label: "\u043E\u043F\u044B\u0442\u0430" }
  ],
  menu: {
    eyebrow: "\u0426\u0435\u043D\u044B \u0437\u0430 \u043C\u0430\u0439",
    title: "\u0427\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 [[\u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E]]",
    items: [
      { num: "01", name: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", desc: "\u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439, \u0431\u0435\u0440\u0435\u0436\u043D\u043E \xB7 1,5 \u0447", price: "2 400 \u20BD" },
      { num: "02", name: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 2 \u043D\u043E\u0433\u0442\u044F", desc: "\u043E\u0442 \u043F\u0440\u043E\u0441\u0442\u043E\u0433\u043E \u0434\u043E \u0441\u043B\u043E\u0436\u043D\u043E\u0433\u043E", price: "300 \u20BD" },
      { num: "03", name: "\u0421\u043D\u044F\u0442\u0438\u0435 \u0447\u0443\u0436\u043E\u0433\u043E \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", desc: "\u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E, \u0431\u0435\u0437 \u0432\u0440\u0435\u0434\u0430", price: "500 \u20BD" },
      { num: "04", name: "\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", desc: "\u0434\u043B\u044F \u0442\u043E\u043D\u043A\u0438\u0445 \u0438 \u043B\u043E\u043C\u043A\u0438\u0445", price: "600 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0410\u043D\u043D\u0430 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442. [[\u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432]].\xBB", authorName: "\u041E\u043B\u0435\u0441\u044F \u041D.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0432 Telegram" }, phone: "@anna_studio" }
};
var fixtureBrowsSochi = {
  meta: { brand: "Brow Bar \u0421\u043E\u043B\u044C", host: "sol-brows", category: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B", address: "\u041D\u0430\u0432\u0430\u0433\u0438\u043D\u0441\u043A\u0430\u044F 9, \u0421\u043E\u0447\u0438", since: "2019", rating: "4.9", reviewsN: 154 },
  hero: {
    headingLines: ["\u0411\u0440\u043E\u0432\u0438", "\u043F\u043E [[\u0432\u0430\u0448\u0435\u0439]]", "\u0444\u043E\u0440\u043C\u0435 \u043B\u0438\u0446\u0430"],
    leadParagraph: "\u041D\u0435 \u0440\u0438\u0441\u0443\u0435\u043C \u0447\u0443\u0436\u0443\u044E \u0444\u043E\u0440\u043C\u0443 \u2014 \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u0438\u0432\u0430\u0435\u043C \u0432\u0430\u0448\u0443. \u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F, \u043B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435 \u0437\u0430 \u043E\u0434\u0438\u043D \u0432\u0438\u0437\u0438\u0442. \u0414\u0435\u0440\u0436\u0438\u0442\u0441\u044F 6 \u043D\u0435\u0434\u0435\u043B\u044C.",
    photoSrc: EX_U("photo-1633681926022-84c23e8cb2d6", 720),
    gallery: [EX_U("photo-1522335789203-aabd1fc54bc9", 480), EX_U("photo-1457972729786-0411a3b2b626", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0441\u0442\u0443\u0434\u0438\u044F, \u0441\u0440\u0435\u0434\u0430"
  },
  stats: [
    { num: "6", unit: " \u043D\u0435\u0434", label: "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F" },
    { num: "40", unit: " \u043C\u0438\u043D", label: "\u043D\u0430 \u0432\u0438\u0437\u0438\u0442" },
    { num: "4.9", label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441",
    title: "\u0427\u0442\u043E [[\u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442]] \u0447\u0430\u0449\u0435",
    items: [
      { num: "01", name: "\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F + \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", desc: "\u0432\u043E\u0441\u043A, \u043F\u0438\u043D\u0446\u0435\u0442, \u043A\u0440\u0430\u0441\u043A\u0430 \u0438\u043B\u0438 \u0445\u043D\u0430", price: "1 400 \u20BD" },
      { num: "02", name: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0440\u043E\u0432\u0435\u0439", desc: "\u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F \u0444\u043E\u0440\u043C\u044B \u043D\u0430 6 \u043D\u0435\u0434\u0435\u043B\u044C", price: "2 200 \u20BD" },
      { num: "03", name: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u043D\u0438\u0446", desc: "\u0431\u0435\u0437 \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u044F, \u0441\u0432\u043E\u0439 \u043E\u0431\u044A\u0451\u043C", price: "2 600 \u20BD" },
      { num: "04", name: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441 \u0431\u0440\u043E\u0432\u0438 + \u0440\u0435\u0441\u043D\u0438\u0446\u044B", desc: "\u0437\u0430 \u043E\u0434\u0438\u043D \u0432\u0438\u0437\u0438\u0442, \u0432\u044B\u0433\u043E\u0434\u043D\u0435\u0435", price: "4 200 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u041F\u0435\u0440\u0432\u044B\u0439 \u0440\u0430\u0437 brow-\u043C\u0430\u0441\u0442\u0435\u0440 \u043D\u0435 \u0441\u0434\u0435\u043B\u0430\u043B\u0430 \u043C\u043D\u0435 [[\u0447\u0443\u0436\u0438\u0435 \u0431\u0440\u043E\u0432\u0438]]. \u0421\u0432\u043E\u0438, \u043D\u043E \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u044B\u0435.\xBB", authorName: "\u041A\u0430\u0440\u0438\u043D\u0430 \u0422.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "1 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D" }, phone: "\u043E\u043D\u043B\u0430\u0439\u043D-\u0437\u0430\u043F\u0438\u0441\u044C" }
};
var fixtureBarberFedor = {
  meta: { brand: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xAB\u0424\u0451\u0434\u043E\u0440\xBB", host: "fedor-barber", category: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F", address: "\u041D\u0438\u043A\u0438\u0442\u0441\u043A\u0438\u0439 3, \u041C\u043E\u0441\u043A\u0432\u0430", since: "2018", rating: "4.9", reviewsN: 312 },
  hero: {
    headingLines: ["\u0421\u0442\u0440\u0438\u0436\u043A\u0430", "[[+]] \u0431\u043E\u0440\u043E\u0434\u0430", "\u0437\u0430 45 \u043C\u0438\u043D\u0443\u0442"],
    leadParagraph: "\u0422\u043E\u043B\u044C\u043A\u043E \u043C\u0443\u0436\u0441\u043A\u0438\u0435 \u0441\u0442\u0440\u0438\u0436\u043A\u0438 \u0438 \u0431\u043E\u0440\u043E\u0434\u0430. \u0411\u0435\u0437 \u0441\u0430\u043B\u043E\u043D\u0430, \u0431\u0435\u0437 \u0436\u0435\u043D\u0441\u043A\u043E\u0433\u043E \u0437\u0430\u043B\u0430, \u0431\u0435\u0437 \u043C\u0443\u0437\u044B\u043A\u0438 \u0432 \u043D\u0430\u0443\u0448\u043D\u0438\u043A\u0430\u0445 \u043C\u0430\u0441\u0442\u0435\u0440\u0430. \u0412\u0438\u0441\u043A\u0438 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u2014 \u043F\u043E\u0441\u043B\u0435 \u0441\u0442\u0440\u0438\u0436\u043A\u0438, \u0435\u0441\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435.",
    photoSrc: EX_U("photo-1503951914875-452162b0f3f1", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043A\u0440\u0435\u0441\u043B\u043E, \u0441\u0443\u0431\u0431\u043E\u0442\u0430",
    gallery: [
      EX_U("photo-1599351431613-18ef1fdd27e1", 480),
      EX_U("photo-1622286342621-4bd786c2447c", 480)
    ]
  },
  stats: [
    { num: "45", unit: " \u043C\u0438\u043D", label: "\u043D\u0430 \u0441\u0442\u0440\u0438\u0436\u043A\u0443" },
    { num: "8", unit: " \u043B\u0435\u0442", label: "\u0441 2018" },
    { num: "4", label: "\u043C\u0430\u0441\u0442\u0435\u0440\u0430" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441",
    title: "\u0427\u0442\u043E [[\u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442]] \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435",
    items: [
      { num: "01", name: "\u041C\u0443\u0436\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0438\u0436\u043A\u0430", desc: "\u043C\u0430\u0448\u0438\u043D\u043A\u0430 + \u043D\u043E\u0436\u043D\u0438\u0446\u044B", price: "2 200 \u20BD" },
      { num: "02", name: "\u0421\u0442\u0440\u0438\u0436\u043A\u0430 + \u0431\u043E\u0440\u043E\u0434\u0430", desc: "\u0441 \u0433\u043E\u0440\u044F\u0447\u0438\u043C \u043F\u043E\u043B\u043E\u0442\u0435\u043D\u0446\u0435\u043C", price: "3 000 \u20BD" },
      { num: "03", name: "\u041A\u0430\u043C\u0443\u0444\u043B\u044F\u0436 \u0441\u0435\u0434\u0438\u043D\u044B", desc: "20 \u043C\u0438\u043D \xB7 \u0441\u0442\u043E\u0439\u043A\u043E", price: "1 200 \u20BD" },
      { num: "04", name: "\u041E\u043F\u0430\u0441\u043D\u043E\u0439 \u0431\u0440\u0438\u0442\u0432\u043E\u0439", desc: "\u0433\u043E\u043B\u043E\u0432\u0430 \u0438\u043B\u0438 \u0431\u043E\u0440\u043E\u0434\u0430", price: "1 800 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0425\u043E\u0436\u0443 \u043A \u0413\u043B\u0435\u0431\u0443 \u0442\u0440\u0435\u0442\u0438\u0439 \u0433\u043E\u0434. [[\u0412\u0441\u0435\u0433\u0434\u0430 \u0432\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442]], \u043A\u0430\u043A \u0441\u0442\u0440\u0438\u0433\u043B\u0438 \u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0440\u0430\u0437.\xBB", authorName: "\u0410\u043D\u0442\u043E\u043D \u041A.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", authorWhen: "4 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043A \u043C\u0430\u0441\u0442\u0435\u0440\u0443" }, phone: "+7 (900) 000-00-14" }
};
var fixtureFitnessMetod = {
  meta: { brand: "\u0421\u0442\u0443\u0434\u0438\u044F \xAB\u041C\u0435\u0442\u043E\u0434\xBB", host: "metod-studio", category: "\u041F\u0438\u043B\u0430\u0442\u0435\u0441", address: "\u041F\u0438\u043E\u043D\u0435\u0440\u0441\u043A\u0430\u044F 12, \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", since: "2018", rating: "4.9", reviewsN: 187 },
  hero: {
    headingLines: ["\u041F\u0438\u043B\u0430\u0442\u0435\u0441", "\u0432 \u0433\u0440\u0443\u043F\u043F\u0435", "[[\u0438\u0437 \u0448\u0435\u0441\u0442\u0438]]"],
    leadParagraph: "\u041A\u0430\u0436\u0434\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u2014 \u043B\u0438\u0447\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0442\u0440\u0435\u043D\u0435\u0440\u0430. \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0437\u0430. \u041F\u0435\u0440\u0432\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 50 \u043C\u0438\u043D\u0443\u0442.",
    photoSrc: EX_U("photo-1518611012118-696072aa579a", 720),
    gallery: [EX_U("photo-1571019613454-1cb2f99b2d8b", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0437\u0430\u043B, \u0443\u0442\u0440\u043E \u0432\u0442\u043E\u0440\u043D\u0438\u043A\u0430"
  },
  stats: [
    { num: "6", label: "\u0432 \u0433\u0440\u0443\u043F\u043F\u0435" },
    { num: "12", label: "\u0442\u0440\u0435\u043D\u0435\u0440\u043E\u0432" },
    { num: "8", unit: " \u043B\u0435\u0442", label: "\u0441\u0442\u0443\u0434\u0438\u0438" }
  ],
  menu: {
    eyebrow: "\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442\u044B",
    title: "\u0427\u0442\u043E [[\u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442]] \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446",
    items: [
      { num: "01", name: "\u0420\u0430\u0437\u043E\u0432\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435", desc: "\u043F\u0435\u0440\u0432\u043E\u0435 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", price: "1 400 \u20BD" },
      { num: "02", name: "4 \u0432 \u043C\u0435\u0441\u044F\u0446", desc: "\u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E", price: "5 200 \u20BD" },
      { num: "03", name: "8 \u0432 \u043C\u0435\u0441\u044F\u0446", desc: "\u0441\u0430\u043C\u044B\u0439 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439", price: "9 800 \u20BD" },
      { num: "04", name: "12 \u0432 \u043C\u0435\u0441\u044F\u0446", desc: "\u0434\u043B\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0445", price: "13 200 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0427\u0435\u0440\u0435\u0437 \u0442\u0440\u0438 \u043C\u0435\u0441\u044F\u0446\u0430 [[\u0437\u0430\u0431\u044B\u043B\u0430 \u043F\u0440\u043E \u0431\u043E\u043B\u044C \u0432 \u0441\u043F\u0438\u043D\u0435]]. \u0425\u043E\u0442\u044F \u043F\u0440\u0438\u0448\u043B\u0430 \u0442\u0443\u0434\u0430 \u0438\u043C\u0435\u043D\u043D\u043E \u0441 \u043D\u0435\u0439.\xBB", authorName: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430 \u041C.", authorSource: "2\u0413\u0418\u0421", authorWhen: "1 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u0435\u0440\u0432\u043E\u0435" }, phone: "+7 (900) 000-00-50" }
};
var fixtureLegalSitnikov = {
  meta: { brand: "\u0421\u0438\u0442\u043D\u0438\u043A\u043E\u0432 \u0438 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u044B", host: "sitnikov-law", category: "\u042E\u0440.\u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430", address: "\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F 14, \u043E\u0444. 412, \u041C\u043E\u0441\u043A\u0432\u0430", since: "2014", rating: "4.9", reviewsN: 312 },
  hero: {
    headingLines: ["\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u0434\u0435\u043D\u0435\u0433", "\u043E\u0442 [[\u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430]]", "\u0431\u0435\u0437 \u0430\u0432\u0430\u043D\u0441\u0430"],
    leadParagraph: "\u0411\u0435\u0440\u0451\u043C \u0434\u0435\u043B\u043E \u0432 \u0440\u0430\u0431\u043E\u0442\u0443 \u2014 \u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u0432\u044B\u0438\u0433\u0440\u044B\u0448\u0430. \u041F\u0435\u0440\u0432\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430 \u0438 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 40 \u043C\u0438\u043D\u0443\u0442. \u0421\u043A\u0430\u0436\u0435\u043C \u0441\u0440\u0430\u0437\u0443, \u0435\u0441\u0442\u044C \u043B\u0438 \u043F\u0435\u0440\u0441\u043F\u0435\u043A\u0442\u0438\u0432\u0430.",
    photoSrc: EX_U("photo-1497366754035-f200968a6e72", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043E\u0444\u0438\u0441, \u0447\u0435\u0442\u0432\u0435\u0440\u0433"
  },
  stats: [
    { num: "94%", label: "\u0434\u0435\u043B \u0432\u044B\u0438\u0433\u0440\u0430\u043D\u043E" },
    { num: "312", label: "\u0434\u0435\u043B \u0432 2024" },
    { num: "10", unit: " \u043B\u0435\u0442", label: "\u0432 \u043E\u0434\u043D\u043E\u043C \u043E\u0444\u0438\u0441\u0435" }
  ],
  menu: {
    eyebrow: "\u0423\u0441\u043B\u0443\u0433\u0438",
    title: "\u0427\u0442\u043E [[\u0432\u0435\u0434\u0451\u043C]] \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
    items: [
      { num: "01", name: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u043E\u0442 \u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430", desc: "\u043D\u0435\u0443\u0441\u0442\u043E\u0439\u043A\u0430, \u0440\u0430\u0441\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u0435, \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u043A\u0430", price: "20% \u043E\u0442 \u0441\u0443\u043C\u043C\u044B" },
      { num: "02", name: "\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0435 \u0441\u043F\u043E\u0440\u044B", desc: "\u0440\u0430\u0437\u0432\u043E\u0434, \u0440\u0430\u0437\u0434\u0435\u043B, \u0430\u043B\u0438\u043C\u0435\u043D\u0442\u044B", price: "\u043E\u0442 30 000 \u20BD" },
      { num: "03", name: "\u0422\u0440\u0443\u0434\u043E\u0432\u044B\u0435 \u0441\u043F\u043E\u0440\u044B", desc: "\u0443\u0432\u043E\u043B\u044C\u043D\u0435\u043D\u0438\u0435, \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435", price: "\u043E\u0442 25 000 \u20BD" },
      { num: "04", name: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0435\u0439", desc: "\u0432\u043E\u0437\u0432\u0440\u0430\u0442, \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F, \u0437\u0430\u043C\u0435\u043D\u0430", price: "15% \u043E\u0442 \u0441\u0443\u043C\u043C\u044B" }
    ]
  },
  quote: { text: "\xAB\u0412\u0435\u0440\u043D\u0443\u043B\u0438 1,2 \u043C\u043B\u043D \u043D\u0435\u0443\u0441\u0442\u043E\u0439\u043A\u0438 \u043E\u0442 \u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430 \u0437\u0430 4 \u043C\u0435\u0441\u044F\u0446\u0430. [[\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0430\u0432\u0430\u043D\u0441\u043E\u0432]] \u2014 \u0432\u0441\u0451 \u043F\u043E\u0441\u043B\u0435 \u0441\u0443\u0434\u0430.\xBB", authorName: "\u041C\u0438\u0445\u0430\u0438\u043B \u041F.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E" }, phone: "+7 (900) 000-00-40" }
};
var fixturePhotoMarta = {
  meta: { brand: "\u041C\u0430\u0440\u0442\u0430 \xB7 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444", host: "marta-photo", category: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444", address: "\u0432\u044B\u0435\u0437\u0434 \u043F\u043E \u041C\u043E\u0441\u043A\u0432\u0435", since: "2020", rating: "5.0", reviewsN: 94 },
  hero: {
    headingLines: ["\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0435", "\u0441\u044A\u0451\u043C\u043A\u0438 [[\u0434\u043E\u043C\u0430]]", "\u0438 \u0432 \u0441\u0442\u0443\u0434\u0438\u0438"],
    leadParagraph: "\u0411\u0435\u0437 \u043F\u0440\u0438\u043D\u0443\u0436\u0434\u0451\u043D\u043D\u044B\u0445 \u043F\u043E\u0437 \u0438 \u043D\u0430\u0442\u044F\u043D\u0443\u0442\u044B\u0445 \u0443\u043B\u044B\u0431\u043E\u043A. \u0421\u043D\u0438\u043C\u0430\u044E \u043A\u0430\u043A \u0435\u0441\u0442\u044C: \u0434\u0435\u0442\u0438 \u0432\u043E\u0437\u044F\u0442\u0441\u044F, \u0431\u0430\u0431\u0443\u0448\u043A\u0430 \u0432\u043E\u0440\u0447\u0438\u0442, \u043A\u043E\u0442 \u043D\u0435 \u0432\u043F\u0438\u0441\u0430\u043B\u0441\u044F. \u041F\u0435\u0440\u0435\u0434\u0430\u044E 70+ \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u044B\u0445 \u0444\u043E\u0442\u043E \u0447\u0435\u0440\u0435\u0437 2 \u043D\u0435\u0434\u0435\u043B\u0438.",
    photoSrc: EX_U("photo-1452587925148-ce544e77e70d", 720),
    gallery: [EX_U("photo-1606216794074-735e91aa2c92", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0441\u0435\u043C\u044C\u044F \u041A., \u044F\u043D\u0432\u0430\u0440\u044C"
  },
  stats: [
    { num: "70+", label: "\u0444\u043E\u0442\u043E \u0432 \u0441\u044A\u0451\u043C\u043A\u0435" },
    { num: "14", unit: " \u0434\u043D\u0435\u0439", label: "\u0434\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430" },
    { num: "6", unit: " \u043B\u0435\u0442", label: "\u043E\u043F\u044B\u0442\u0430" }
  ],
  menu: {
    eyebrow: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B",
    title: "\u0427\u0442\u043E [[\u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442]] \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
    items: [
      { num: "01", name: "\u0421\u0435\u043C\u0435\u0439\u043D\u0430\u044F \u0441\u044A\u0451\u043C\u043A\u0430 \u0434\u043E\u043C\u0430", desc: "2 \u0447\u0430\u0441\u0430 \xB7 70+ \u0444\u043E\u0442\u043E", price: "18 000 \u20BD" },
      { num: "02", name: "\u041F\u0440\u043E\u0433\u0443\u043B\u043A\u0430 \u043D\u0430 \u0443\u043B\u0438\u0446\u0435", desc: "1,5 \u0447\u0430\u0441\u0430 \xB7 50+ \u0444\u043E\u0442\u043E", price: "14 000 \u20BD" },
      { num: "03", name: "\u0421\u0442\u0443\u0434\u0438\u044F", desc: "1 \u0447\u0430\u0441 \xB7 40+ \u0444\u043E\u0442\u043E \xB7 \u0430\u0440\u0435\u043D\u0434\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E", price: "12 000 \u20BD" },
      { num: "04", name: "\u0411\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0441\u0442\u044C + \u043F\u043E\u0441\u043B\u0435", desc: "\u043F\u0430\u043A\u0435\u0442 \u0438\u0437 \u0434\u0432\u0443\u0445 \u0441\u044A\u0451\u043C\u043E\u043A", price: "28 000 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0421\u044B\u043D \u043D\u0438 \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u043D\u0435 \u0441\u0438\u0434\u0435\u043B \u043D\u0430 \u043C\u0435\u0441\u0442\u0435. \u041C\u0430\u0440\u0442\u0430 [[\u043F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u043B\u0430 \u044D\u0442\u043E \u0432 \u043F\u043B\u044E\u0441]] \u2014 \u043A\u0430\u0434\u0440\u044B \u0436\u0438\u0432\u044B\u0435, \u043D\u0435 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u0447\u043D\u044B\u0435.\xBB", authorName: "\u042E\u043B\u0438\u044F \u0421.", authorSource: "Instagram", authorWhen: "\u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 WhatsApp" }, phone: "\u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 WhatsApp" }
};
var fixtureTattooLine = {
  meta: { brand: "Line tattoo", host: "line-tattoo", category: "\u0422\u0430\u0442\u0443-\u0441\u0442\u0443\u0434\u0438\u044F", address: "\u041C\u0430\u043B\u0430\u044F \u0411\u0440\u043E\u043D\u043D\u0430\u044F 6, \u041C\u043E\u0441\u043A\u0432\u0430", since: "2016", rating: "5.0", reviewsN: 218 },
  hero: {
    headingLines: ["\u0422\u043E\u043D\u043A\u0438\u0435", "[[\u043B\u0438\u043D\u0438\u0438]] \u0438", "\u043C\u0438\u043D\u0438\u043C\u0430\u043B\u0438\u0437\u043C"],
    leadParagraph: "\u0422\u043E\u043B\u044C\u043A\u043E \u0442\u043E\u043D\u043A\u0438\u0435 \u043B\u0438\u043D\u0438\u0438, \u043C\u0438\u043D\u0438\u043C\u0430\u043B \u0438 \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F. \u041D\u0438\u043A\u0430\u043A\u043E\u0433\u043E \u043E\u043B\u0434\u0441\u043A\u0443\u043B\u0430, \u0440\u0435\u0430\u043B\u0438\u0437\u043C\u0430 \u0438 \u0446\u0432\u0435\u0442\u043D\u044B\u0445 \u043F\u043E\u0440\u0442\u0440\u0435\u0442\u043E\u0432. \u0417\u0430\u043F\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 \u044D\u0441\u043A\u0438\u0437 \u2014 \u043F\u0440\u0438\u043D\u043E\u0441\u0438\u0442\u0435 \u0438\u0434\u0435\u044E, \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438 \u043C\u0435\u0441\u0442\u043E.",
    photoSrc: EX_U("photo-1565058379802-bbe93b2f703a", 720),
    gallery: [EX_U("photo-1611501275019-9b5cda994e8d", 480), EX_U("photo-1542856391-010fb87dcfed", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0440\u0430\u0431\u043E\u0442\u0430 \u0412\u043B\u0430\u0434\u0430, \u043C\u0430\u0440\u0442"
  },
  stats: [
    { num: "4", label: "\u043C\u0430\u0441\u0442\u0435\u0440\u0430" },
    { num: "10", unit: " \u043B\u0435\u0442", label: "\u0441\u0442\u0443\u0434\u0438\u0438" },
    { num: "218", label: "\u043E\u0442\u0437\u044B\u0432\u043E\u0432" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441",
    title: "\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u2014 [[15 \u043C\u0438\u043D\u0443\u0442]] \u0440\u0430\u0431\u043E\u0442\u044B",
    items: [
      { num: "01", name: "\u041C\u0438\u043D\u0438-\u044D\u0441\u043A\u0438\u0437 \u0434\u043E 5 \u0441\u043C", desc: "\u043B\u0438\u043D\u0438\u0438, \u0441\u0438\u043C\u0432\u043E\u043B\u044B, \u0446\u0438\u0444\u0440\u044B", price: "5 000 \u20BD" },
      { num: "02", name: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 5\u201315 \u0441\u043C", desc: "\u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F, \u0431\u043E\u0442\u0430\u043D\u0438\u043A\u0430, \u043D\u0430\u0434\u043F\u0438\u0441\u0438", price: "\u043E\u0442 12 000 \u20BD" },
      { num: "03", name: "\u0427\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u044B", desc: "\u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u044D\u0441\u043A\u0438\u0437\u043E\u0432", price: "8 000 \u20BD" },
      { num: "04", name: "\u041F\u0435\u0440\u0435\u043A\u0440\u044B\u0442\u0438\u0435 \u0441\u0442\u0430\u0440\u043E\u0439", desc: "\u043E\u0446\u0435\u043D\u043A\u0430 \u043F\u043E \u0444\u043E\u0442\u043E", price: "\u043F\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0451\u043D\u043D\u043E\u0441\u0442\u0438" }
    ]
  },
  quote: { text: "\xAB\u0412\u043B\u0430\u0434 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043B [[\u0438\u043C\u0435\u043D\u043D\u043E \u0442\u043E, \u0447\u0442\u043E \u044F \u0445\u043E\u0442\u0435\u043B\u0430]], \u043D\u043E \u043D\u0435 \u043C\u043E\u0433\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u044C. \u041B\u0438\u043D\u0438\u0438 \u0442\u043E\u043D\u043A\u0438\u0435, \u043D\u0435 \u0440\u0430\u0441\u043F\u043B\u044B\u043B\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 \u0433\u043E\u0434.\xBB", authorName: "\u0414\u0430\u0440\u044C\u044F \u041B.", authorSource: "Instagram", authorWhen: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u041F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u044D\u0441\u043A\u0438\u0437" }, phone: "@line_tattoo" }
};

// src/intake/preview.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var NICHE_GENERIC = {
  flavorLine: "\u0440\u044F\u0434\u043E\u043C \u0441 \u0432\u0430\u043C\u0438",
  menuEyebrow: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B",
  ctaLabel: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",
  fallbackServices: [
    { title: "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430" },
    { title: "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F" },
    { title: "\u0412\u044B\u0435\u0437\u0434 \u043D\u0430 \u043C\u0435\u0441\u0442\u043E" }
  ]
};
var NICHES = [
  { match: /маникюр|ногт|бьюти|салон|брови|ресниц|космет|визаж/i, copy: {
    flavorLine: "\u043F\u043E \u0437\u0430\u043F\u0438\u0441\u0438",
    menuEyebrow: "\u041F\u0440\u0430\u0439\u0441",
    ctaLabel: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",
    fallbackServices: [{ title: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0441 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435\u043C" }, { title: "\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F" }, { title: "\u0414\u0438\u0437\u0430\u0439\u043D" }]
  } },
  { match: /кофе|кафе|пекарн|кондитер|ресторан|бар|столов|еда/i, copy: {
    flavorLine: "\u043E\u0442\u043A\u0440\u044B\u0442\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F",
    menuEyebrow: "\u041C\u0435\u043D\u044E",
    ctaLabel: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C",
    fallbackServices: [{ title: "\u041D\u0430\u043F\u0438\u0442\u043A\u0438" }, { title: "\u0417\u0430\u0432\u0442\u0440\u0430\u043A\u0438" }, { title: "\u0412\u044B\u043F\u0435\u0447\u043A\u0430" }]
  } },
  { match: /автосервис|шиномонтаж|детейлинг|автомойк|сто\b/i, copy: {
    flavorLine: "\u0431\u0435\u0437 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432",
    menuEyebrow: "\u041F\u0440\u0430\u0439\u0441 \u0431\u0435\u0437 \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u0435\u043A",
    ctaLabel: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443",
    fallbackServices: [{ title: "\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430" }, { title: "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430" }, { title: "\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435" }]
  } },
  { match: /барбер|парикмахер|стрижк/i, copy: {
    flavorLine: "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F",
    menuEyebrow: "\u041F\u0440\u0430\u0439\u0441",
    ctaLabel: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F",
    fallbackServices: [{ title: "\u0421\u0442\u0440\u0438\u0436\u043A\u0430" }, { title: "\u0411\u043E\u0440\u043E\u0434\u0430" }, { title: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441" }]
  } },
  { match: /электрик|сантехник|ремонт|мастер|отделк|монтаж/i, copy: {
    flavorLine: "\u0432\u044B\u0435\u0437\u0434 \u0441\u0435\u0433\u043E\u0434\u043D\u044F",
    menuEyebrow: "\u0420\u0430\u0431\u043E\u0442\u044B \u0438 \u0446\u0435\u043D\u044B",
    ctaLabel: "\u0412\u044B\u0437\u0432\u0430\u0442\u044C \u043C\u0430\u0441\u0442\u0435\u0440\u0430",
    fallbackServices: [{ title: "\u0412\u044B\u0435\u0437\u0434 \u0438 \u043E\u0441\u043C\u043E\u0442\u0440" }, { title: "\u0421\u0440\u043E\u0447\u043D\u044B\u0439 \u0440\u0435\u043C\u043E\u043D\u0442" }, { title: "\u041C\u043E\u043D\u0442\u0430\u0436 \u043F\u043E\u0434 \u043A\u043B\u044E\u0447" }]
  } },
  { match: /юрист|юр\.|право|адвокат|бухгалт|консалт/i, copy: {
    flavorLine: "\u043F\u0435\u0440\u0432\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F",
    menuEyebrow: "\u0423\u0441\u043B\u0443\u0433\u0438",
    ctaLabel: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E",
    fallbackServices: [{ title: "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F" }, { title: "\u0412\u0435\u0434\u0435\u043D\u0438\u0435 \u0434\u0435\u043B\u0430" }, { title: "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B" }]
  } }
];
function nicheCopyFor(category) {
  if (!category) return NICHE_GENERIC;
  const hit = NICHES.find((n) => n.match.test(category));
  return hit ? hit.copy : NICHE_GENERIC;
}
var TRANSLIT = {
  \u0430: "a",
  \u0431: "b",
  \u0432: "v",
  \u0433: "g",
  \u0434: "d",
  \u0435: "e",
  \u0451: "e",
  \u0436: "zh",
  \u0437: "z",
  \u0438: "i",
  \u0439: "i",
  \u043A: "k",
  \u043B: "l",
  \u043C: "m",
  \u043D: "n",
  \u043E: "o",
  \u043F: "p",
  \u0440: "r",
  \u0441: "s",
  \u0442: "t",
  \u0443: "u",
  \u0444: "f",
  \u0445: "h",
  \u0446: "c",
  \u0447: "ch",
  \u0448: "sh",
  \u0449: "sch",
  \u044A: "",
  \u044B: "y",
  \u044C: "",
  \u044D: "e",
  \u044E: "yu",
  \u044F: "ya"
};
function draftHostSlug(name) {
  const slug = name.toLowerCase().split("").map((ch) => TRANSLIT[ch] !== void 0 ? TRANSLIT[ch] : ch).join("").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24).replace(/-+$/g, "");
  return slug || "vash-sait";
}
var SOURCE_NAMES = {
  yandex_maps: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
  telegram: "Telegram-\u043A\u0430\u043D\u0430\u043B",
  twogis: "2\u0413\u0418\u0421",
  avito: "Avito",
  website: "\u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
};
function photoPlaceholder(seed) {
  const angle = 35 + seed * 17;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='480'><defs><pattern id='s' width='14' height='14' patternTransform='rotate(${angle})' patternUnits='userSpaceOnUse'><rect width='14' height='14' fill='#EDE4D6'/><rect width='7' height='14' fill='#E2D5C2'/></pattern></defs><rect width='100%' height='100%' fill='url(%23s)'/><text x='50%' y='50%' font-family='monospace' font-size='22' fill='#8A7C6E' text-anchor='middle'>\u0444\u043E\u0442\u043E \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg).replace(/%2523/g, "%23")}`;
}
function pluralRu(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}
function draftToSlotContent(draft) {
  const niche = nicheCopyFor(draft.category);
  const host = draftHostSlug(draft.name);
  const districtShort = draft.district ? draft.district.replace(/\s*район\s*/i, "").trim() : null;
  const headingLines = [
    draft.category || draft.name,
    districtShort ? `\u0432 [[${districtShort}]]` : `[[${niche.flavorLine}]]`
  ];
  if (districtShort) headingLines.push(niche.flavorLine);
  const photos = draft.photos.length > 0 ? draft.photos : [photoPlaceholder(1), photoPlaceholder(2)];
  const stats = [];
  if (draft.rating) stats.push({ num: String(draft.rating.value), label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433" });
  if (draft.rating && draft.rating.count > 0) stats.push({ num: String(draft.rating.count), label: "\u043E\u0442\u0437\u044B\u0432\u043E\u0432" });
  if (draft.photos.length > 0) stats.push({ num: String(draft.photos.length), label: "\u0444\u043E\u0442\u043E" });
  if (stats.length < 3 && draft.services.length > 0) stats.push({ num: String(draft.services.length), label: pluralRu(draft.services.length, "\u0443\u0441\u043B\u0443\u0433\u0430", "\u0443\u0441\u043B\u0443\u0433\u0438", "\u0443\u0441\u043B\u0443\u0433") });
  const serviceItems = (draft.services.length > 0 ? draft.services : niche.fallbackServices.map((s) => ({ ...s, price: null }))).slice(0, 6).map((s, i) => ({
    num: String(i + 1).padStart(2, "0"),
    name: s.title,
    desc: s.price ? void 0 : "\u0446\u0435\u043D\u0443 \u0443\u0442\u043E\u0447\u043D\u0438\u043C \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435",
    price: s.price || "\xB7 \xB7 \xB7"
  }));
  const rawReview = draft.reviews[0];
  const quote = rawReview ? {
    text: `\xAB${rawReview.text}\xBB`,
    authorName: rawReview.author,
    authorSource: SOURCE_NAMES[draft.source],
    authorWhen: ""
  } : {
    text: "\xAB\u0417\u0434\u0435\u0441\u044C \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0432\u0430\u0448\u0438 \u043E\u0442\u0437\u044B\u0432\u044B \u2014 \u0437\u0430\u0431\u0435\u0440\u0451\u043C \u0438\u0445 \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\xBB",
    authorName: BRAND.name,
    authorSource: "\u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A",
    authorWhen: ""
  };
  return {
    meta: {
      brand: draft.name,
      host,
      category: draft.category || "\u0412\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
      address: draft.district || `${host}.${BRAND.domain}`,
      since: "",
      rating: draft.rating ? String(draft.rating.value) : "\u2014",
      reviewsN: draft.rating ? draft.rating.count : draft.reviews.length
    },
    hero: {
      headingLines,
      leadParagraph: rawReview ? rawReview.text : `${draft.category || "\u0412\u0430\u0448\u0435 \u0434\u0435\u043B\u043E"} \u2014 \u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0440\u0430\u043D \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u0422\u0435\u043A\u0441\u0442\u044B \u0434\u043E\u043F\u0438\u0448\u0435\u043C \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435.`,
      photoSrc: photos[0],
      gallery: photos.slice(1, 3),
      photoCaption: draft.photos.length > 0 ? `\u0424\u043E\u0442\u043E \xB7 ${SOURCE_NAMES[draft.source]}` : "\u043C\u0435\u0441\u0442\u043E \u0434\u043B\u044F \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E"
    },
    stats,
    menu: { eyebrow: niche.menuEyebrow, title: "\u0423\u0441\u043B\u0443\u0433\u0438", items: serviceItems },
    quote,
    cta: { primary: { label: niche.ctaLabel }, phone: `${host}.${BRAND.domain}` }
  };
}
function draftPreset(draft, activeTheme) {
  const themeId = activeTheme || draft.theme_id;
  let familyId = draft.family_id;
  try {
    familyId = getTheme(themeId).family;
  } catch {
  }
  return { themeId, familyId };
}
function morphSlotContent(baseDraft, incoming, stage, counts) {
  const base = draftToSlotContent(baseDraft);
  const si = STAGE_ORDER.indexOf(stage);
  const out = { ...base, meta: { ...base.meta }, hero: { ...base.hero } };
  if (si >= 1 && incoming?.name) {
    out.meta.brand = incoming.name;
    out.meta.host = draftHostSlug(incoming.name);
    if (incoming.category) out.meta.category = incoming.category;
  }
  const photos = incoming?.photos || [];
  if (photos.length > 0 && counts.photos > 0) {
    out.hero.photoSrc = photos[0];
    const gallery = [...base.hero.gallery || []];
    for (let i = 0; i < gallery.length && i + 1 < Math.min(counts.photos, photos.length); i++) {
      gallery[i] = photos[i + 1];
    }
    out.hero.gallery = gallery;
  }
  if (si >= 2 && incoming?.reviews && incoming.reviews.length > 0) {
    const r = incoming.reviews[0];
    out.quote = { text: `\xAB${r.text}\xBB`, authorName: r.author, authorSource: incoming.source ? SOURCE_NAMES[incoming.source] : "", authorWhen: "" };
  }
  if (incoming?.services && incoming.services.length > 0) {
    out.menu = {
      ...base.menu,
      items: incoming.services.slice(0, 6).map((s, i) => ({
        num: String(i + 1).padStart(2, "0"),
        name: s.title,
        price: s.price || "\xB7 \xB7 \xB7"
      }))
    };
  }
  return out;
}
var mockPreviewDraftRich = {
  source: "yandex_maps",
  name: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B",
  category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
  district: "\u041F\u0435\u0442\u0440\u043E\u0433\u0440\u0430\u0434\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
  rating: { value: 4.9, count: 67 },
  photos: [
    "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=480&q=80",
    "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=480&q=80"
  ],
  reviews: [
    { author: "\u041E\u043B\u0435\u0441\u044F \u041D.", text: "\u0410\u043D\u043D\u0430 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442. \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432", rating: 5 },
    { author: "\u041C\u0430\u0440\u0438\u043D\u0430 \u0412.", text: "\u0425\u043E\u0436\u0443 \u043F\u043E\u043B\u0433\u043E\u0434\u0430, \u0437\u0430\u043F\u0438\u0441\u044C \u0434\u0435\u043D\u044C \u0432 \u0434\u0435\u043D\u044C \u043F\u043E\u0447\u0442\u0438 \u043D\u0435 \u043F\u043E\u0439\u043C\u0430\u0442\u044C \u2014 \u043E\u043D\u043E \u0442\u043E\u0433\u043E \u0441\u0442\u043E\u0438\u0442", rating: 5 }
  ],
  services: [
    { title: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", price: "2 400 \u20BD" },
    { title: "\u0421\u043D\u044F\u0442\u0438\u0435 \u0447\u0443\u0436\u043E\u0433\u043E \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", price: "500 \u20BD" },
    { title: "\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", price: "600 \u20BD" },
    { title: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 2 \u043D\u043E\u0433\u0442\u044F", price: "300 \u20BD" }
  ],
  theme_id: "display-soft",
  family_id: "display"
};
var mockPreviewDraftSparse = {
  source: "twogis",
  name: "\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u043A \u0421\u0435\u0440\u0433\u0435\u0439",
  category: "\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u043A",
  district: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
  rating: null,
  photos: [],
  reviews: [],
  services: [],
  theme_id: "stacked-corporate",
  family_id: "stacked"
};
var mockThemeOptions = ["display-soft", "stacked-cream", "bento-clay"];
var PV_KEYFRAMES = `
@keyframes ssp-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
@keyframes ssp-shimmer { 0%, 100% { opacity: 0.55 } 50% { opacity: 0.25 } }
`;
function PvShell({ children, width = 680, mobile = false, intakeStep }) {
  if (mobile) {
    return /* @__PURE__ */ jsxs3("div", { "data-intake-step": intakeStep, style: { width: "100%", minHeight: "100%", background: VT.bg, fontFamily: VT.font.sans, position: "relative" }, children: [
      /* @__PURE__ */ jsx3("style", { children: PV_KEYFRAMES }),
      /* @__PURE__ */ jsxs3("div", { style: { padding: "18px 16px 28px", position: "relative" }, children: [
        /* @__PURE__ */ jsx3("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
          position: "absolute",
          top: 10,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: 999,
          background: VT.bgSoft,
          border: `1px solid ${VT.line}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: VT.inkSoft,
          fontSize: 18,
          zIndex: 2
        }, children: "\xD7" }),
        children
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs3("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx3("style", { children: PV_KEYFRAMES }),
    /* @__PURE__ */ jsxs3("div", { "data-intake-step": intakeStep, style: {
      width,
      maxWidth: "100%",
      background: VT.bg,
      borderRadius: VT.r.xl,
      boxShadow: VT.shadow.pop,
      padding: 28,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx3("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
        position: "absolute",
        top: 14,
        right: 14,
        width: 32,
        height: 32,
        borderRadius: 999,
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: VT.inkSoft,
        fontSize: 18
      }, children: "\xD7" }),
      children
    ] })
  ] });
}
function PvHeader({ activeDot, loading = false, title, sub, onBack }) {
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      onBack && /* @__PURE__ */ jsxs3("button", { onClick: onBack, style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px 4px 4px",
        borderRadius: 999,
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        cursor: "pointer",
        fontFamily: VT.font.sans,
        fontSize: 12,
        fontWeight: 500,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx3("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        activeDot,
        "/4"
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx3("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < activeDot ? VT.accent : VT.line,
        animation: loading && i === activeDot - 1 ? "ssp-pulse 1.2s ease-in-out infinite" : "none"
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx3("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx3("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
var BUILD_STAGES = [
  { id: "fetching", label: () => "\u0427\u0438\u0442\u0430\u0435\u043C \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A" },
  { id: "photos", label: (c) => c.photos > 0 ? `\u0417\u0430\u0431\u0440\u0430\u043B\u0438 ${c.photos} \u0444\u043E\u0442\u043E` : "\u0417\u0430\u0431\u0438\u0440\u0430\u0435\u043C \u0444\u043E\u0442\u043E" },
  { id: "reviews", label: (c) => c.reviews > 0 ? `\u041D\u0430\u0448\u043B\u0438 ${c.reviews} ${pluralRu(c.reviews, "\u043E\u0442\u0437\u044B\u0432", "\u043E\u0442\u0437\u044B\u0432\u0430", "\u043E\u0442\u0437\u044B\u0432\u043E\u0432")}` : "\u0418\u0449\u0435\u043C \u043E\u0442\u0437\u044B\u0432\u044B" },
  { id: "styling", label: () => "\u041F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u0441\u0442\u0438\u043B\u044C \u043F\u043E\u0434 \u043D\u0438\u0448\u0443" }
];
var STAGE_ORDER = ["fetching", "photos", "reviews", "styling"];
function StageRow({ state, label }) {
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: `1px solid ${VT.lineSoft}` }, children: [
    /* @__PURE__ */ jsxs3("span", { style: {
      width: 22,
      height: 22,
      borderRadius: "50%",
      flex: "0 0 auto",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: state === "done" ? VT.successSoft : state === "active" ? VT.accentSoft : VT.bgSoft,
      border: state === "pending" ? `1px solid ${VT.line}` : "none",
      color: state === "done" ? VT.success : VT.accent
    }, children: [
      state === "done" && /* @__PURE__ */ jsx3("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12l4 4 10-10" }) }),
      state === "active" && /* @__PURE__ */ jsx3(Spinner, { size: 12 }),
      state === "pending" && /* @__PURE__ */ jsx3("span", { style: { width: 5, height: 5, borderRadius: "50%", background: VT.inkFaint } })
    ] }),
    /* @__PURE__ */ jsx3("span", { style: {
      fontSize: 14,
      lineHeight: 1.35,
      fontWeight: state === "active" ? 600 : 500,
      color: state === "pending" ? VT.inkFaint : VT.ink,
      fontVariantNumeric: "tabular-nums"
    }, children: label })
  ] });
}
function SkeletonPreview({ stage, counts, draftSkeleton, height = 380 }) {
  const si = STAGE_ORDER.indexOf(stage);
  const bar = (w, h = 10, solid = false) => /* @__PURE__ */ jsx3("span", { style: {
    display: "block",
    width: w,
    height: h,
    borderRadius: 3,
    background: solid ? VT.ink : VT.line,
    animation: solid ? "none" : "ssp-shimmer 1.4s ease-in-out infinite"
  } });
  const name = draftSkeleton?.name;
  const host = name ? draftHostSlug(name) : "vash-sait";
  let paletteDots = null;
  if (si >= 3 && draftSkeleton?.theme_id) {
    try {
      const t = getTheme(draftSkeleton.theme_id);
      paletteDots = [t.colors.bg, t.colors.accent, t.colors.ink, t.colors.bgAlt];
    } catch {
      paletteDots = null;
    }
  }
  return /* @__PURE__ */ jsx3(MiniChrome, { host, height, children: /* @__PURE__ */ jsxs3("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: 14, gap: 10, background: VT.white }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx3("span", { style: { width: 18, height: 18, borderRadius: 5, background: si >= 1 ? VT.accentSoft : VT.line, flex: "0 0 auto" } }),
      name && si >= 1 ? /* @__PURE__ */ jsx3("span", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }, children: name }) : bar("38%", 11)
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
      bar("82%", 16, !!name && si >= 3),
      bar("58%", 16)
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      flex: "1 1 auto",
      minHeight: 70,
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
      background: counts.photos > 0 ? `repeating-linear-gradient(45deg, ${VT.accentSoft} 0 10px, ${VT.bgSoft} 10px 20px)` : VT.bgSoft,
      animation: counts.photos > 0 ? "none" : "ssp-shimmer 1.4s ease-in-out infinite",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: counts.photos > 0 && /* @__PURE__ */ jsxs3("span", { style: {
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.08em",
      background: VT.bg,
      border: `1px solid ${VT.line}`,
      borderRadius: 999,
      padding: "4px 10px",
      color: VT.inkSoft,
      fontVariantNumeric: "tabular-nums"
    }, children: [
      counts.photos,
      " \u0424\u041E\u0422\u041E"
    ] }) }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [0, 1].map((i) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      bar(i === 0 ? "44%" : "36%", 9),
      /* @__PURE__ */ jsx3("span", { style: { flex: 1 } }),
      bar("14%", 9)
    ] }, i)) }),
    /* @__PURE__ */ jsx3("div", { style: {
      borderRadius: 8,
      padding: "8px 10px",
      background: counts.reviews > 0 ? VT.successSoft : VT.bgSoft,
      animation: counts.reviews > 0 ? "none" : "ssp-shimmer 1.4s ease-in-out infinite",
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 18
    }, children: counts.reviews > 0 && /* @__PURE__ */ jsxs3("span", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.06em", color: "oklch(0.32 0.12 145)", fontVariantNumeric: "tabular-nums" }, children: [
      counts.reviews,
      " ",
      pluralRu(counts.reviews, "\u041E\u0422\u0417\u042B\u0412", "\u041E\u0422\u0417\u042B\u0412\u0410", "\u041E\u0422\u0417\u042B\u0412\u041E\u0412").toUpperCase(),
      " \xB7 \u0418\u0417 \u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A\u0410"
    ] }) }),
    paletteDots && /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
      /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: "0.1em", color: VT.inkFaint }, children: "\u0421\u0422\u0418\u041B\u042C" }),
      paletteDots.map((col, i) => /* @__PURE__ */ jsx3("span", { style: { width: 14, height: 14, borderRadius: "50%", background: col, border: `1px solid ${VT.line}`, flex: "0 0 auto" } }, i))
    ] })
  ] }) });
}
function S3_StepBuilding({
  stage = "photos",
  counts = { photos: 4, reviews: 0 },
  draftSkeleton,
  source = "yandex_maps",
  timedOut = false,
  baseDraft,
  onSkipToContact,
  onBack,
  mobile = false
}) {
  const si = STAGE_ORDER.indexOf(stage);
  const stages = /* @__PURE__ */ jsx3("div", { style: { marginTop: 4 }, children: BUILD_STAGES.map((st, i) => /* @__PURE__ */ jsx3(
    StageRow,
    {
      state: i < si ? "done" : i === si ? "active" : "pending",
      label: st.label(counts)
    },
    st.id
  )) });
  if (baseDraft && !timedOut) {
    const content = morphSlotContent(baseDraft, draftSkeleton, stage, counts);
    const preset = draftPreset(baseDraft, baseDraft.theme_id);
    const frame = /* @__PURE__ */ jsxs3("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: {
        position: "absolute",
        top: -10,
        left: 14,
        transform: "rotate(-5deg)",
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.16em",
        color: VT.accent,
        background: VT.bg,
        border: `1.5px dashed ${VT.accent}`,
        borderRadius: 4,
        padding: "4px 10px",
        zIndex: 3,
        animation: "ssp-pulse 1.3s ease-in-out infinite"
      }, children: "\u0421\u041E\u0411\u0418\u0420\u0410\u0415\u041C\u2026" }),
      /* @__PURE__ */ jsx3(MiniChrome, { host: content.meta.host, height: mobile ? 400 : 500, children: /* @__PURE__ */ jsx3("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" }, children: /* @__PURE__ */ jsx3("div", { style: { height: mobile ? 740 : 920, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsx3(PresetRenderer, { preset, content }) }) }) })
    ] });
    return /* @__PURE__ */ jsxs3(PvShell, { width: 1040, mobile, intakeStep: "building", children: [
      /* @__PURE__ */ jsx3(
        PvHeader,
        {
          activeDot: 2,
          loading: true,
          title: "\u0417\u0430\u043C\u0435\u043D\u044F\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u0440 \u043D\u0430 \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435",
          sub: /* @__PURE__ */ jsxs3(Fragment2, { children: [
            "\u0411\u0435\u0440\u0451\u043C \u0444\u043E\u0442\u043E, \u043E\u0442\u0437\u044B\u0432\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u2014 ",
            SOURCE_NAMES[source],
            ". \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E 15\u201340 \u0441\u0435\u043A\u0443\u043D\u0434."
          ] }),
          onBack
        }
      ),
      mobile ? /* @__PURE__ */ jsxs3("div", { style: { marginTop: 16 }, children: [
        frame,
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 12 }, children: [
          /* @__PURE__ */ jsx3(Spinner, { size: 14 }),
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 12.5, fontWeight: 600, fontVariantNumeric: "tabular-nums" }, children: BUILD_STAGES[si]?.label(counts) }),
          /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 10.5, letterSpacing: "0.08em", marginLeft: "auto" }, children: [
            si + 1,
            "/4"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 22, marginTop: 18, alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsx3("div", { style: { flex: "1 1 62%", minWidth: 0 }, children: frame }),
        /* @__PURE__ */ jsxs3("div", { style: { flex: "1 1 38%", minWidth: 0, paddingTop: 2 }, children: [
          stages,
          /* @__PURE__ */ jsx3("div", { style: { marginTop: 14, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: "\u0427\u0438\u0441\u043B\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u2014 \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E \u043C\u0435\u0440\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u0430\u0440\u0441\u0435\u0440 \u0438\u0445 \u043D\u0430\u0445\u043E\u0434\u0438\u0442. \u0424\u043E\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u0440\u0430 \u0437\u0430\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u0432\u0430\u0448\u0438\u043C\u0438 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443, \u0441\u043B\u0435\u0432\u0430 \u043D\u0430\u043F\u0440\u0430\u0432\u043E." })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs3(PvShell, { width: 680, mobile, intakeStep: "building", children: [
    /* @__PURE__ */ jsx3(
      PvHeader,
      {
        activeDot: 2,
        loading: true,
        title: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
        sub: /* @__PURE__ */ jsxs3(Fragment2, { children: [
          "\u0411\u0435\u0440\u0451\u043C \u0444\u043E\u0442\u043E, \u043E\u0442\u0437\u044B\u0432\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u2014 ",
          SOURCE_NAMES[source],
          ". \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E 15\u201340 \u0441\u0435\u043A\u0443\u043D\u0434."
        ] })
      }
    ),
    timedOut ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
      /* @__PURE__ */ jsxs3("div", { style: {
        marginTop: 18,
        padding: "14px 16px",
        background: VT.infoSoft,
        borderRadius: VT.r.md,
        fontSize: 14,
        lineHeight: 1.5,
        color: "oklch(0.36 0.10 240)"
      }, children: [
        /* @__PURE__ */ jsx3("b", { children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E." }),
        " \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0438 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A, \u043E\u0431\u044B\u0447\u043D\u043E \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 2 \u0447\u0430\u0441\u043E\u0432."
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: mobile ? "column" : "row", gap: 14, marginTop: 18, alignItems: "stretch" }, children: [
        /* @__PURE__ */ jsx3("div", { style: { flex: 1, minWidth: 0 }, children: stages }),
        /* @__PURE__ */ jsx3("div", { style: { flex: mobile ? "none" : "0 0 280px" }, children: /* @__PURE__ */ jsx3(SkeletonPreview, { stage, counts, draftSkeleton, height: mobile ? 280 : 300 }) })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx3(Btn, { style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), onClick: onSkipToContact, children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442" }) })
    ] }) : /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: mobile ? "column" : "row", gap: 18, marginTop: 18, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }, children: [
        stages,
        /* @__PURE__ */ jsx3("div", { style: { marginTop: "auto", paddingTop: 14, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: "\u0427\u0438\u0441\u043B\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u2014 \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E \u043C\u0435\u0440\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u0430\u0440\u0441\u0435\u0440 \u0438\u0445 \u043D\u0430\u0445\u043E\u0434\u0438\u0442." })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { flex: mobile ? "none" : "0 0 300px" }, children: /* @__PURE__ */ jsx3(SkeletonPreview, { stage, counts, draftSkeleton, height: mobile ? 320 : 380 }) })
    ] })
  ] });
}
function FoundRow({ label, value, dim = false }) {
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", gap: 10, padding: "6px 0", borderTop: `1px solid ${VT.lineSoft}` }, children: [
    /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.1em", color: VT.inkFaint, flex: "0 0 76px" }, children: label }),
    /* @__PURE__ */ jsx3("span", { style: {
      fontFamily: VT.font.mono,
      fontSize: 12.5,
      fontVariantNumeric: "tabular-nums",
      color: dim ? VT.inkFaint : VT.ink,
      minWidth: 0
    }, children: value })
  ] });
}
function ThemeSwatch({ themeId, active, onSelect }) {
  let bg = VT.bgSoft, accent = VT.accent, label = themeId;
  try {
    const t = getTheme(themeId);
    bg = t.colors.bg;
    accent = t.colors.accent;
    label = t.label;
  } catch {
  }
  return /* @__PURE__ */ jsxs3("button", { onClick: onSelect, style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "7px 10px",
    borderRadius: 999,
    background: active ? VT.white : "transparent",
    border: `1.5px solid ${active ? VT.accent : VT.line}`,
    cursor: "pointer",
    fontFamily: VT.font.sans,
    fontSize: 12,
    fontWeight: active ? 600 : 500,
    color: active ? VT.ink : VT.inkSoft
  }, children: [
    /* @__PURE__ */ jsx3("span", { style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      flex: "0 0 auto",
      background: `linear-gradient(135deg, ${bg} 50%, ${accent} 50%)`,
      border: `1px solid ${VT.line}`
    } }),
    label
  ] });
}
function S3_StepPreview({
  draft = mockPreviewDraftRich,
  themeOptions = mockThemeOptions,
  activeTheme,
  onThemeChange,
  onClaim,
  onBack,
  variant,
  nicheLabel,
  mobile = false
}) {
  const v = variant || (draft.photos.length >= 3 || draft.reviews.length > 0 ? "rich" : "sparse");
  const content = draftToSlotContent(draft);
  const preset = draftPreset(draft, activeTheme);
  const frameH = mobile ? 420 : 560;
  const innerH = mobile ? 760 : 980;
  if (v === "demo") {
    const label = nicheLabel || draft.category || "\u0412\u0430\u0448\u0435 \u0434\u0435\u043B\u043E";
    const demoFrame = /* @__PURE__ */ jsxs3("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: {
        position: "absolute",
        top: -10,
        left: 14,
        transform: "rotate(-5deg)",
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.16em",
        color: VT.accent,
        background: VT.bg,
        border: `1.5px dashed ${VT.accent}`,
        borderRadius: 4,
        padding: "4px 10px",
        zIndex: 3
      }, children: "\u041F\u0420\u0418\u041C\u0415\u0420" }),
      /* @__PURE__ */ jsx3(MiniChrome, { host: content.meta.host, height: frameH, children: /* @__PURE__ */ jsx3("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" }, children: /* @__PURE__ */ jsx3("div", { style: { height: innerH, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsx3(PresetRenderer, { preset, content }) }) }) })
    ] });
    const demoPanel = /* @__PURE__ */ jsxs3(Fragment2, { children: [
      /* @__PURE__ */ jsxs3("p", { style: { fontSize: 15, lineHeight: 1.5, margin: 0 }, children: [
        "\u0422\u0430\u043A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0441\u0430\u0439\u0442 \u0434\u043B\u044F \u043D\u0438\u0448\u0438 \xAB",
        label,
        "\xBB. \u0414\u0430\u043B\u044C\u0448\u0435 \u0432\u0430\u0448\u0438 \u0444\u043E\u0442\u043E, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0437\u044B\u0432\u044B"
      ] }),
      themeOptions.length > 1 && /* @__PURE__ */ jsxs3("div", { style: { marginTop: 16 }, children: [
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 8 }, children: "\u0421\u0422\u0418\u041B\u042C" }),
        /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: themeOptions.slice(0, 3).map((id) => /* @__PURE__ */ jsx3(
          ThemeSwatch,
          {
            themeId: id,
            active: (activeTheme || draft.theme_id) === id,
            onSelect: () => onThemeChange?.(id)
          },
          id
        )) })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx3(Btn, { "data-cta": "claim-demo", style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), onClick: onClaim, children: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430 \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435" }) }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 8, fontSize: 12.5, color: VT.inkFaint, textAlign: "center" }, children: "\u041C\u0435\u043D\u044C\u0448\u0435 \u043C\u0438\u043D\u0443\u0442\u044B. \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B" }),
      /* @__PURE__ */ jsx3("button", { onClick: onBack, style: {
        display: "block",
        margin: "12px auto 0",
        background: "transparent",
        border: "none",
        color: VT.inkSoft,
        fontSize: 13,
        cursor: "pointer",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        fontFamily: VT.font.sans
      }, children: "\u0414\u0440\u0443\u0433\u0430\u044F \u043D\u0438\u0448\u0430" })
    ] });
    return /* @__PURE__ */ jsx3(PvShell, { width: 1040, mobile, intakeStep: "demo", children: mobile ? /* @__PURE__ */ jsxs3("div", { style: { marginTop: 4 }, children: [
      demoFrame,
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 14 }, children: demoPanel })
    ] }) : /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 22, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { flex: "1 1 62%", minWidth: 0 }, children: demoFrame }),
      /* @__PURE__ */ jsx3("div", { style: { flex: "1 1 38%", minWidth: 0, paddingTop: 8 }, children: demoPanel })
    ] }) });
  }
  const frame = /* @__PURE__ */ jsxs3("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx3(MiniChrome, { host: content.meta.host, height: frameH, children: /* @__PURE__ */ jsx3("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" }, children: /* @__PURE__ */ jsx3("div", { style: { height: innerH, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsx3(PresetRenderer, { preset, content }) }) }) }),
    /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: {
      position: "absolute",
      top: -10,
      right: 14,
      transform: "rotate(6deg)",
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.16em",
      color: VT.accent,
      background: VT.bg,
      border: `1.5px dashed ${VT.accent}`,
      borderRadius: 4,
      padding: "4px 10px"
    }, children: "\u0427\u0415\u0420\u041D\u041E\u0412\u0418\u041A" }),
    v === "sparse" && /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: 8,
      fontSize: 12.5,
      color: VT.inkSoft,
      lineHeight: 1.45,
      display: "flex",
      alignItems: "center",
      gap: 7
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: { width: 14, height: 14, borderRadius: 3, flex: "0 0 auto", background: `repeating-linear-gradient(45deg, ${VT.accentSoft} 0 4px, ${VT.bgSoft} 4px 8px)`, border: `1px solid ${VT.line}` } }),
      "\u0424\u043E\u0442\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u043C \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435"
    ] })
  ] });
  const found = /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 6 }, children: [
      "\u0427\u0422\u041E \u041C\u042B \u041D\u0410\u0428\u041B\u0418 \xB7 ",
      SOURCE_NAMES[draft.source].toUpperCase()
    ] }),
    /* @__PURE__ */ jsx3(FoundRow, { label: "\u0424\u041E\u0422\u041E", value: draft.photos.length > 0 ? draft.photos.length : "\u2014 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435", dim: draft.photos.length === 0 }),
    /* @__PURE__ */ jsx3(FoundRow, { label: "\u041E\u0422\u0417\u042B\u0412\u042B", value: draft.rating && draft.rating.count > 0 ? draft.rating.count : draft.reviews.length > 0 ? draft.reviews.length : "\u2014 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435", dim: !(draft.rating && draft.rating.count > 0) && draft.reviews.length === 0 }),
    /* @__PURE__ */ jsx3(FoundRow, { label: "\u0423\u0421\u041B\u0423\u0413\u0418", value: draft.services.length > 0 ? draft.services.length : "\u2014 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435", dim: draft.services.length === 0 }),
    draft.district && /* @__PURE__ */ jsx3(FoundRow, { label: "\u0420\u0410\u0419\u041E\u041D", value: draft.district.replace(/\s*район\s*/i, "") }),
    draft.rating && /* @__PURE__ */ jsx3(FoundRow, { label: "\u0420\u0415\u0419\u0422\u0418\u041D\u0413", value: `\u2605 ${draft.rating.value}` })
  ] });
  const controls = /* @__PURE__ */ jsxs3(Fragment2, { children: [
    themeOptions.length > 1 && /* @__PURE__ */ jsxs3("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 8 }, children: "\u0421\u0422\u0418\u041B\u042C" }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: themeOptions.slice(0, 3).map((id) => /* @__PURE__ */ jsx3(
        ThemeSwatch,
        {
          themeId: id,
          active: (activeTheme || draft.theme_id) === id,
          onSelect: () => onThemeChange?.(id)
        },
        id
      )) })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { marginTop: 18, fontSize: 13.5, color: VT.inkSoft, lineHeight: 1.5 }, children: "\u042D\u0442\u043E \u044D\u0441\u043A\u0438\u0437. \u041F\u043E\u043B\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u2014 \u0441 \u0442\u0435\u043A\u0441\u0442\u0430\u043C\u0438 \u0438 \u0432\u0441\u0435\u043C\u0438 \u0444\u043E\u0442\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0437\u0430 2 \u0447\u0430\u0441\u0430." }),
    /* @__PURE__ */ jsx3("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx3(Btn, { "data-cta": "claim-draft", style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), onClick: onClaim, children: "\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" }) }),
    /* @__PURE__ */ jsx3("button", { onClick: onBack, style: {
      display: "block",
      margin: "12px auto 0",
      background: "transparent",
      border: "none",
      color: VT.inkSoft,
      fontSize: 13,
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      fontFamily: VT.font.sans
    }, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A" })
  ] });
  return /* @__PURE__ */ jsxs3(PvShell, { width: 920, mobile, intakeStep: "preview", children: [
    /* @__PURE__ */ jsx3(
      PvHeader,
      {
        activeDot: 2,
        title: "\u0412\u043E\u0442 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
        sub: v === "sparse" ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
          "\u0421\u043E\u0431\u0440\u0430\u043B\u0438 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u043D\u0430\u0448\u043B\u0438. \u0421\u0442\u0438\u043B\u044C ",
          BRAND.name,
          " \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \xAB",
          draft.category || "\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
          "\xBB."
        ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
          "\u0421\u043E\u0431\u0440\u0430\u043D \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E \u0438 \u043E\u0442\u0437\u044B\u0432\u043E\u0432. \u0421\u0442\u0438\u043B\u044C ",
          BRAND.name,
          " \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \xAB",
          draft.category || "\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
          "\xBB."
        ] })
      }
    ),
    mobile ? /* @__PURE__ */ jsxs3("div", { style: { marginTop: 16 }, children: [
      frame,
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 16 }, children: found }),
      controls
    ] }) : /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 22, marginTop: 18, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { flex: "1 1 58%", minWidth: 0 }, children: frame }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: "1 1 42%", minWidth: 0, paddingTop: 2 }, children: [
        found,
        controls
      ] })
    ] })
  ] });
}

// src/intake/rev2.tsx
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var NICHE_LIB = [
  { id: "manicure", label: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", synonyms: ["\u043D\u043E\u0433\u0442\u0438", "\u0433\u0435\u043B\u044C-\u043B\u0430\u043A", "\u043F\u0435\u0434\u0438\u043A\u044E\u0440", "\u043D\u0435\u0439\u043B"], theme_id: "display-soft", family_id: "display", theme_options: ["display-soft", "stacked-cream", "bento-clay"] },
  { id: "brows", label: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B", synonyms: ["\u0431\u0440\u043E\u0432\u0438", "\u0440\u0435\u0441\u043D\u0438\u0446\u044B", "\u043B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "\u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435"], theme_id: "display-bold", family_id: "display", theme_options: ["display-bold", "display-soft", "bento-clay"] },
  { id: "barber", label: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F", synonyms: ["\u0431\u0430\u0440\u0431\u0435\u0440", "\u0431\u043E\u0440\u043E\u0434\u0430"], theme_id: "display-noir", family_id: "display", theme_options: ["display-noir", "bento-noir", "stacked-slate"] },
  { id: "hair", label: "\u041F\u0430\u0440\u0438\u043A\u043C\u0430\u0445\u0435\u0440\u0441\u043A\u0430\u044F", synonyms: ["\u0441\u0442\u0440\u0438\u0436\u043A\u0430", "\u043F\u0430\u0440\u0438\u043A\u043C\u0430\u0445\u0435\u0440", "\u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", "\u0432\u043E\u043B\u043E\u0441\u044B"], theme_id: "stacked-cream", family_id: "stacked", theme_options: ["stacked-cream", "display-soft", "editorial-warm"] },
  { id: "cosmetic", label: "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433", synonyms: ["\u043A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433\u0438\u044F", "\u0447\u0438\u0441\u0442\u043A\u0430 \u043B\u0438\u0446\u0430", "\u0443\u0445\u043E\u0434 \u0437\u0430 \u043A\u043E\u0436\u0435\u0439", "\u0432\u0438\u0437\u0430\u0436"], theme_id: "bento-clay", family_id: "bento", theme_options: ["bento-clay", "display-soft", "editorial-warm"] },
  { id: "massage", label: "\u041C\u0430\u0441\u0441\u0430\u0436", synonyms: ["\u043C\u0430\u0441\u0441\u0430\u0436", "\u0441\u043F\u0430", "\u043E\u0441\u0442\u0435\u043E\u043F\u0430\u0442"], theme_id: "split-product", family_id: "split", theme_options: ["split-product", "split-teal", "stacked-cream"] },
  { id: "tattoo", label: "\u0422\u0430\u0442\u0443", synonyms: ["\u0442\u0430\u0442\u0443", "\u0442\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0430", "\u043F\u0438\u0440\u0441\u0438\u043D\u0433"], theme_id: "display-ink", family_id: "display", theme_options: ["display-ink", "bento-noir", "editorial-mono"] },
  { id: "photo", label: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444", synonyms: ["\u0444\u043E\u0442\u043E", "\u0444\u043E\u0442\u043E\u0441\u0435\u0441\u0441\u0438\u044F", "\u0441\u044A\u0451\u043C\u043A\u0430", "\u0432\u0438\u0434\u0435\u043E\u0433\u0440\u0430\u0444"], theme_id: "split-teal", family_id: "split", theme_options: ["split-teal", "editorial-mono", "bento-light"] },
  { id: "psy", label: "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", synonyms: ["\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433", "\u0442\u0435\u0440\u0430\u043F\u0438\u044F", "\u043F\u0441\u0438\u0445\u043E\u0442\u0435\u0440\u0430\u043F\u0435\u0432\u0442", "\u043A\u043E\u0443\u0447"], theme_id: "stacked-corporate", family_id: "stacked", theme_options: ["stacked-corporate", "editorial-mono", "bento-light"] },
  { id: "electric", label: "\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u043A \u0438 \u0440\u0435\u043C\u043E\u043D\u0442", synonyms: ["\u044D\u043B\u0435\u043A\u0442\u0440\u0438\u043A", "\u0441\u0430\u043D\u0442\u0435\u0445\u043D\u0438\u043A", "\u0440\u0435\u043C\u043E\u043D\u0442", "\u043C\u0430\u0441\u0442\u0435\u0440", "\u043C\u043E\u043D\u0442\u0430\u0436"], theme_id: "bento-noir", family_id: "bento", theme_options: ["bento-noir", "stacked-slate", "split-product"] }
];
function matchNiche(freeText) {
  if (!freeText) return null;
  const q = freeText.trim().toLowerCase();
  if (!q) return null;
  return NICHE_LIB.find(
    (n) => n.label.toLowerCase().includes(q) || q.includes(n.label.toLowerCase()) || n.synonyms.some((s) => q.includes(s) || s.includes(q))
  ) || null;
}
var U = (id, w = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
var NICHE_DEMO_DRAFTS = {
  manicure: {
    source: "yandex_maps",
    name: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B",
    category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
    district: "\u041F\u0435\u0442\u0440\u043E\u0433\u0440\u0430\u0434\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.9, count: 67 },
    photos: [U("photo-1604654894610-df63bc536371"), U("photo-1610992015732-2449b76344bc", 480), U("photo-1632345031435-8727f6897d53", 480)],
    reviews: [{ author: "\u041E\u043B\u0435\u0441\u044F \u041D.", text: "\u0410\u043D\u043D\u0430 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442. \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432", rating: 5 }],
    services: [
      { title: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", price: "2 400 \u20BD" },
      { title: "\u0421\u043D\u044F\u0442\u0438\u0435 \u0447\u0443\u0436\u043E\u0433\u043E \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", price: "500 \u20BD" },
      { title: "\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", price: "600 \u20BD" },
      { title: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 2 \u043D\u043E\u0433\u0442\u044F", price: "300 \u20BD" }
    ],
    theme_id: "display-soft",
    family_id: "display"
  },
  brows: {
    source: "yandex_maps",
    name: "Brow-\u0431\u0430\u0440 \u0410\u043B\u0438\u0441\u044B",
    category: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B",
    district: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.9, count: 54 },
    photos: [U("photo-1560869713-7d0a29430803")],
    reviews: [{ author: "\u041A\u0438\u0440\u0430 \u041C.", text: "\u0424\u043E\u0440\u043C\u0443 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0440\u0430\u0437\u0430, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F \u043C\u0435\u0441\u044F\u0446", rating: 5 }],
    services: [
      { title: "\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F \u0438 \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", price: "1 600 \u20BD" },
      { title: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0440\u043E\u0432\u0435\u0439", price: "2 200 \u20BD" },
      { title: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u043D\u0438\u0446", price: "2 500 \u20BD" }
    ],
    theme_id: "display-bold",
    family_id: "display"
  },
  barber: {
    source: "yandex_maps",
    name: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xAB\u0424\u0451\u0434\u043E\u0440\xBB",
    category: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F",
    district: "\u0411\u0430\u0441\u043C\u0430\u043D\u043D\u044B\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.8, count: 211 },
    photos: [U("photo-1503951914875-452162b0f3f1")],
    reviews: [{ author: "\u0418\u0433\u043E\u0440\u044C \u0421.", text: "\u0421\u0442\u0440\u0438\u0433\u0443\u0441\u044C \u0434\u0432\u0430 \u0433\u043E\u0434\u0430, \u043D\u0438 \u0440\u0430\u0437\u0443 \u043D\u0435 \u043F\u0440\u0438\u0448\u043B\u043E\u0441\u044C \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0442\u044C \u0434\u0432\u0430\u0436\u0434\u044B", rating: 5 }],
    services: [
      { title: "\u0421\u0442\u0440\u0438\u0436\u043A\u0430", price: "1 700 \u20BD" },
      { title: "\u0411\u043E\u0440\u043E\u0434\u0430", price: "1 100 \u20BD" },
      { title: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441", price: "2 500 \u20BD" }
    ],
    theme_id: "display-noir",
    family_id: "display"
  },
  hair: {
    source: "yandex_maps",
    name: "\u0421\u0430\u043B\u043E\u043D \xAB\u041B\u043E\u043A\u043E\u043D\xBB",
    category: "\u041F\u0430\u0440\u0438\u043A\u043C\u0430\u0445\u0435\u0440\u0441\u043A\u0430\u044F",
    district: "\u0410\u0434\u043C\u0438\u0440\u0430\u043B\u0442\u0435\u0439\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.8, count: 154 },
    photos: [U("photo-1560066984-138dadb4c035")],
    reviews: [{ author: "\u0412\u0435\u0440\u0430 \u0421.", text: "\u041F\u0440\u0438\u0448\u043B\u0430 \u0441 \u0444\u043E\u0442\u043E \u0438\u0437 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0430 \u2014 \u0443\u0448\u043B\u0430 \u0441 \u044D\u0442\u043E\u0439 \u0436\u0435 \u0433\u043E\u043B\u043E\u0432\u043E\u0439. \u041F\u0435\u0440\u0432\u044B\u0439 \u0440\u0430\u0437 \u0442\u0430\u043A", rating: 5 }],
    services: [
      { title: "\u0416\u0435\u043D\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0438\u0436\u043A\u0430", price: "1 800 \u20BD" },
      { title: "\u041C\u0443\u0436\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0438\u0436\u043A\u0430", price: "1 200 \u20BD" },
      { title: "\u041E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435 \u0432 \u043E\u0434\u0438\u043D \u0442\u043E\u043D", price: "\u043E\u0442 4 500 \u20BD" },
      { title: "\u0423\u043A\u043B\u0430\u0434\u043A\u0430", price: "1 500 \u20BD" }
    ],
    theme_id: "stacked-cream",
    family_id: "stacked"
  },
  cosmetic: {
    source: "yandex_maps",
    name: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u042E\u043B\u0438\u0438 \u041C\u0438\u0440\u043D\u043E\u0439",
    category: "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433",
    district: "\u0422\u0432\u0435\u0440\u0441\u043A\u043E\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.9, count: 92 },
    photos: [U("photo-1570172619644-dfd03ed5d881")],
    reviews: [{ author: "\u041E\u043B\u044C\u0433\u0430 \u0422.", text: "\u042E\u043B\u0438\u044F \u043D\u0435 \u043F\u0440\u043E\u0434\u0430\u0451\u0442 \u043B\u0438\u0448\u043D\u0435\u0433\u043E: \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0443 \u043C\u043E\u0438\u0445 \u0431\u0430\u043D\u043E\u043A \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0430 \u0432 \u043C\u0443\u0441\u043E\u0440, \u043A\u043E\u0436\u0430 \u0441\u043A\u0430\u0437\u0430\u043B\u0430 \u0441\u043F\u0430\u0441\u0438\u0431\u043E", rating: 5 }],
    services: [
      { title: "\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0447\u0438\u0441\u0442\u043A\u0430", price: "3 500 \u20BD" },
      { title: "\u041F\u0438\u043B\u0438\u043D\u0433 \u043A\u0443\u0440\u0441\u043E\u043C", price: "\u043E\u0442 2 800 \u20BD" },
      { title: "\u0423\u0445\u043E\u0434 \u043F\u043E \u0442\u0438\u043F\u0443 \u043A\u043E\u0436\u0438", price: "3 200 \u20BD" },
      { title: "\u041C\u0430\u0441\u0441\u0430\u0436 \u043B\u0438\u0446\u0430", price: "2 400 \u20BD" }
    ],
    theme_id: "bento-clay",
    family_id: "bento"
  },
  massage: {
    source: "yandex_maps",
    name: "\u0421\u0442\u0443\u0434\u0438\u044F \u043C\u0430\u0441\u0441\u0430\u0436\u0430 \xAB\u0422\u043E\u043D\u0443\u0441\xBB",
    category: "\u041C\u0430\u0441\u0441\u0430\u0436",
    district: "\u041C\u043E\u0441\u043A\u043E\u0432\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.9, count: 76 },
    photos: [U("photo-1544161515-4ab6ce6db874")],
    reviews: [{ author: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u041A.", text: "\u0421\u043F\u0438\u043D\u0430 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0430 \u043D\u044B\u0442\u044C \u043F\u043E\u0441\u043B\u0435 \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E \u0441\u0435\u0430\u043D\u0441\u0430, \u0445\u043E\u0436\u0443 \u0440\u0430\u0437 \u0432 \u0434\u0432\u0435 \u043D\u0435\u0434\u0435\u043B\u0438", rating: 5 }],
    services: [
      { title: "\u041A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u043C\u0430\u0441\u0441\u0430\u0436 \u0441\u043F\u0438\u043D\u044B", price: "2 200 \u20BD" },
      { title: "\u041E\u0431\u0449\u0438\u0439 \u043C\u0430\u0441\u0441\u0430\u0436, 90 \u043C\u0438\u043D\u0443\u0442", price: "3 800 \u20BD" },
      { title: "\u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u043E\u0435 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435", price: "2 900 \u20BD" }
    ],
    theme_id: "split-product",
    family_id: "split"
  },
  tattoo: {
    source: "yandex_maps",
    name: "\u0421\u0442\u0443\u0434\u0438\u044F \xAB\u041B\u0438\u043D\u0438\u044F\xBB",
    category: "\u0422\u0430\u0442\u0443",
    district: "\u0422\u0430\u0433\u0430\u043D\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 5, count: 63 },
    photos: [U("photo-1565058379802-bbe93b2f703a")],
    reviews: [{ author: "\u0414\u0430\u0440\u044C\u044F \u041B.", text: "\u041D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043B\u0438 \u0438\u043C\u0435\u043D\u043D\u043E \u0442\u043E, \u0447\u0442\u043E \u044F \u0445\u043E\u0442\u0435\u043B\u0430, \u043D\u043E \u043D\u0435 \u043C\u043E\u0433\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u044C. \u041B\u0438\u043D\u0438\u0438 \u0442\u043E\u043D\u043A\u0438\u0435, \u043D\u0435 \u0440\u0430\u0441\u043F\u043B\u044B\u043B\u0438\u0441\u044C", rating: 5 }],
    services: [
      { title: "\u041C\u0438\u043D\u0438-\u044D\u0441\u043A\u0438\u0437 \u0434\u043E 5 \u0441\u043C", price: "5 000 \u20BD" },
      { title: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 5\u201315 \u0441\u043C", price: "\u043E\u0442 12 000 \u20BD" },
      { title: "\u0427\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u044B", price: "8 000 \u20BD" }
    ],
    theme_id: "display-ink",
    family_id: "display"
  },
  photo: {
    source: "yandex_maps",
    name: "\u041C\u0430\u0440\u0442\u0430 \u041A\u043B\u0438\u043C\u043E\u0432\u0430",
    category: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444",
    district: "\u0425\u0430\u043C\u043E\u0432\u043D\u0438\u043A\u0438",
    rating: { value: 5, count: 41 },
    photos: [U("photo-1452587925148-ce544e77e70d")],
    reviews: [{ author: "\u0410\u043D\u043D\u0430 \u0412.", text: "\u0421\u043D\u044F\u043B\u0430 \u043D\u0430\u0448\u0443 \u0441\u0432\u0430\u0434\u044C\u0431\u0443 \u0442\u0430\u043A, \u0447\u0442\u043E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u0438 \u043F\u043B\u0430\u043A\u0430\u043B\u0438 \u043D\u0430\u0434 \u0430\u043B\u044C\u0431\u043E\u043C\u043E\u043C. \u0414\u0432\u0430\u0436\u0434\u044B", rating: 5 }],
    services: [
      { title: "\u0427\u0430\u0441\u043E\u0432\u0430\u044F \u0441\u044A\u0451\u043C\u043A\u0430", price: "7 000 \u20BD" },
      { title: "\u0421\u0435\u043C\u0435\u0439\u043D\u0430\u044F \u0444\u043E\u0442\u043E\u0441\u0435\u0441\u0441\u0438\u044F", price: "9 500 \u20BD" },
      { title: "\u0421\u0432\u0430\u0434\u0435\u0431\u043D\u044B\u0439 \u0434\u0435\u043D\u044C", price: "\u043E\u0442 35 000 \u20BD" }
    ],
    theme_id: "split-teal",
    family_id: "split"
  },
  psy: {
    source: "yandex_maps",
    name: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u041B\u0430\u043D\u0441\u043A\u043E\u0439",
    category: "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433",
    district: "\u0411\u0430\u0441\u043C\u0430\u043D\u043D\u044B\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 5, count: 47 },
    photos: [U("photo-1573497620053-ea5300f94f21")],
    reviews: [{ author: "\u0430\u043D\u043E\u043D\u0438\u043C\u043D\u044B\u0439 \u043E\u0442\u0437\u044B\u0432", text: "\u0427\u0435\u0440\u0435\u0437 \u0434\u0432\u0430 \u043C\u0435\u0441\u044F\u0446\u0430 \u044F \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0430 \u043F\u0440\u043E\u0441\u044B\u043F\u0430\u0442\u044C\u0441\u044F \u0432 4 \u0443\u0442\u0440\u0430 \u043E\u0442 \u0442\u0440\u0435\u0432\u043E\u0433\u0438. \u041B\u0443\u0447\u0448\u0435\u0435, \u0447\u0442\u043E \u044F \u0441\u0434\u0435\u043B\u0430\u043B\u0430 \u0434\u043B\u044F \u0441\u0435\u0431\u044F", rating: 5 }],
    services: [
      { title: "\u0420\u0430\u0437\u043E\u0432\u0430\u044F \u0441\u0435\u0441\u0441\u0438\u044F", price: "4 000 \u20BD" },
      { title: "\u041F\u0430\u043A\u0435\u0442 4 \u0441\u0435\u0441\u0441\u0438\u0438", price: "14 400 \u20BD" },
      { title: "\u041E\u043D\u043B\u0430\u0439\u043D-\u0441\u0435\u0441\u0441\u0438\u044F", price: "3 500 \u20BD" }
    ],
    theme_id: "stacked-corporate",
    family_id: "stacked"
  },
  electric: {
    source: "yandex_maps",
    name: "\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u043A \u0421\u0435\u0440\u0433\u0435\u0439",
    category: "\u042D\u043B\u0435\u043A\u0442\u0440\u0438\u043A \u0438 \u0440\u0435\u043C\u043E\u043D\u0442",
    district: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0441\u043A\u0438\u0439 \u0440\u0430\u0439\u043E\u043D",
    rating: { value: 4.8, count: 89 },
    photos: [U("photo-1621905251918-48416bd8575a")],
    reviews: [{ author: "\u041F\u0430\u0432\u0435\u043B \u041D.", text: "\u041F\u0440\u0438\u0435\u0445\u0430\u043B \u0432 \u0442\u043E\u0442 \u0436\u0435 \u0434\u0435\u043D\u044C, \u043D\u0430\u0448\u0451\u043B \u043F\u0440\u043E\u0432\u043E\u0434\u043A\u0443 \u043F\u043E\u0434 \u0448\u0442\u0443\u043A\u0430\u0442\u0443\u0440\u043A\u043E\u0439 \u0431\u0435\u0437 \u0432\u0441\u043A\u0440\u044B\u0442\u0438\u044F \u0432\u0441\u0435\u0439 \u0441\u0442\u0435\u043D\u044B", rating: 5 }],
    services: [
      { title: "\u0412\u044B\u0435\u0437\u0434 \u0438 \u043E\u0441\u043C\u043E\u0442\u0440", price: "0 \u20BD" },
      { title: "\u0421\u0440\u043E\u0447\u043D\u044B\u0439 \u0440\u0435\u043C\u043E\u043D\u0442", price: "\u043E\u0442 1 500 \u20BD" },
      { title: "\u041C\u043E\u043D\u0442\u0430\u0436 \u043F\u043E\u0434 \u043A\u043B\u044E\u0447", price: "\u043F\u043E \u0441\u043C\u0435\u0442\u0435" }
    ],
    theme_id: "bento-noir",
    family_id: "bento"
  }
};
function demoDraftFor(nicheId, freeText) {
  const niche = nicheId ? NICHE_LIB.find((n) => n.id === nicheId) || null : matchNiche(freeText || "");
  if (niche) {
    return { draft: NICHE_DEMO_DRAFTS[niche.id], niche, nicheLabel: niche.label };
  }
  const raw = (freeText || "\u0412\u0430\u0448\u0435 \u0434\u0435\u043B\u043E").trim().slice(0, 24);
  const label = raw.charAt(0).toUpperCase() + raw.slice(1);
  const generic = {
    ...NICHE_DEMO_DRAFTS.psy,
    category: label,
    theme_id: "editorial-mono",
    family_id: "editorial"
  };
  return { draft: generic, niche: null, nicheLabel: label };
}
var GENERIC_THEME_OPTIONS = ["editorial-mono", "editorial-warm", "stacked-slate"];
var mockSourceCandidates = [
  { id: "cand-1", name: "\u0421\u0442\u0443\u0434\u0438\u044F \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430 \u0410\u043D\u043D\u044B", address: "\u0411\u043E\u043B\u044C\u0448\u043E\u0439 \u043F\u0440. \u041F.\u0421., 32, \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", rating: { value: 4.9, count: 38 }, photo: U("photo-1604654894610-df63bc536371", 160) },
  { id: "cand-2", name: "Anna Nails", address: "\u041B\u0435\u043D\u0438\u043D\u0441\u043A\u0438\u0439 \u043F\u0440., 84, \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", rating: { value: 4.7, count: 12 }, photo: null },
  { id: "cand-3", name: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0443 \u0410\u043D\u043D\u044B", address: "\u0443\u043B. \u0421\u0430\u0432\u0443\u0448\u043A\u0438\u043D\u0430, 7, \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", rating: null, photo: null }
];
var R2_KEYFRAMES = `
@keyframes ssr-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
@keyframes ssr-shimmer { 0%, 100% { opacity: 0.55 } 50% { opacity: 0.25 } }
`;
function R2Shell({ children, width = 560, mobile = false }) {
  if (mobile) {
    return /* @__PURE__ */ jsxs4("div", { style: { width: "100%", minHeight: "100%", background: VT.bg, fontFamily: VT.font.sans, position: "relative" }, children: [
      /* @__PURE__ */ jsx4("style", { children: R2_KEYFRAMES }),
      /* @__PURE__ */ jsxs4("div", { style: { padding: "18px 16px 28px", position: "relative" }, children: [
        /* @__PURE__ */ jsx4("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
          position: "absolute",
          top: 10,
          right: 12,
          width: 32,
          height: 32,
          borderRadius: 999,
          background: VT.bgSoft,
          border: `1px solid ${VT.line}`,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: VT.inkSoft,
          fontSize: 18,
          zIndex: 2
        }, children: "\xD7" }),
        children
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs4("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx4("style", { children: R2_KEYFRAMES }),
    /* @__PURE__ */ jsxs4("div", { style: {
      width,
      maxWidth: "100%",
      background: VT.bg,
      borderRadius: VT.r.xl,
      boxShadow: VT.shadow.pop,
      padding: 28,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx4("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
        position: "absolute",
        top: 14,
        right: 14,
        width: 32,
        height: 32,
        borderRadius: 999,
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: VT.inkSoft,
        fontSize: 18
      }, children: "\xD7" }),
      children
    ] })
  ] });
}
function R2Header({ activeDot, title, sub, onBack }) {
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    (onBack || activeDot) && /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      onBack && /* @__PURE__ */ jsxs4("button", { onClick: onBack, style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px 4px 4px",
        borderRadius: 999,
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        cursor: "pointer",
        fontFamily: VT.font.sans,
        fontSize: 12,
        fontWeight: 500,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx4("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx4("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      activeDot != null && /* @__PURE__ */ jsxs4(Fragment3, { children: [
        /* @__PURE__ */ jsxs4(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
          "\u0428\u0410\u0413 ",
          activeDot,
          "/4"
        ] }),
        /* @__PURE__ */ jsx4("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx4("span", { style: { width: 28, height: 4, borderRadius: 2, background: i < activeDot ? VT.accent : VT.line } }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx4("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx4("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
function R2Label({ children }) {
  return /* @__PURE__ */ jsx4("label", { style: { display: "block", fontSize: 13, fontWeight: 600, color: VT.ink, marginBottom: 6, fontFamily: VT.font.sans }, children });
}
function R2Input({ value, placeholder, onChange }) {
  return /* @__PURE__ */ jsx4(
    "input",
    {
      value,
      placeholder,
      onChange: (e) => onChange?.(e.target.value),
      style: {
        width: "100%",
        boxSizing: "border-box",
        padding: "13px 15px",
        background: VT.white,
        border: `1.5px solid ${value ? VT.accent : VT.line}`,
        borderRadius: VT.r.md,
        outline: "none",
        fontSize: 14.5,
        fontFamily: VT.font.sans,
        color: VT.ink
      }
    }
  );
}
function R2TextLink({ children, onClick, block = false }) {
  return /* @__PURE__ */ jsx4("button", { onClick, style: {
    display: "block",
    width: block ? "100%" : void 0,
    textAlign: block ? "left" : "center",
    margin: block ? 0 : "12px auto 0",
    padding: block ? "9px 0" : 0,
    borderTop: block ? `1px solid ${VT.lineSoft}` : "none",
    background: "transparent",
    border: block ? void 0 : "none",
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "none",
    fontFamily: VT.font.sans,
    fontSize: 13.5,
    color: VT.inkSoft,
    cursor: "pointer",
    lineHeight: 1.45,
    textDecoration: block ? "none" : "underline",
    textUnderlineOffset: 3
  }, children });
}
function S3_StepNiche({
  niches = NICHE_LIB,
  freeText = "",
  onFreeTextChange,
  onPick,
  onShowExample,
  mobile = false
}) {
  return /* @__PURE__ */ jsx4(R2Shell, { width: 640, mobile, children: /* @__PURE__ */ jsxs4("div", { "data-intake-step": "niche", children: [
    /* @__PURE__ */ jsx4("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance", paddingRight: 36 }, children: "\u0427\u0435\u043C \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0435\u0441\u044C?" }),
    /* @__PURE__ */ jsx4("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C, \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442. \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u0438 \u0431\u0435\u0437 \u0432\u0430\u0448\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }),
    /* @__PURE__ */ jsx4("div", { style: { display: "grid", gap: 8, marginTop: 18, gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)" }, children: niches.map((n) => /* @__PURE__ */ jsx4("button", { "data-niche-id": n.id, onClick: () => onPick?.(n.id), style: {
      minHeight: 48,
      padding: "10px 8px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
      fontFamily: VT.font.sans,
      fontSize: 13.5,
      fontWeight: 600,
      color: VT.ink,
      cursor: "pointer",
      lineHeight: 1.25,
      textWrap: "balance"
    }, children: n.label }, n.id)) }),
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 8, marginTop: 14, flexDirection: mobile ? "column" : "row" }, children: [
      /* @__PURE__ */ jsx4(
        "div",
        {
          style: { flex: 1, minWidth: 0 },
          onKeyDown: (e) => {
            if (e.key === "Enter" && freeText) onShowExample?.(freeText);
          },
          children: /* @__PURE__ */ jsx4(R2Input, { value: freeText, placeholder: "\u0414\u0440\u0443\u0433\u043E\u0435: \u043A\u043E\u043D\u0434\u0438\u0442\u0435\u0440, \u0440\u0435\u043F\u0435\u0442\u0438\u0442\u043E\u0440, \u043A\u043B\u0438\u043D\u0438\u043D\u0433\u2026", onChange: onFreeTextChange })
        }
      ),
      /* @__PURE__ */ jsx4(
        Btn,
        {
          variant: "soft",
          style: { flex: "0 0 auto", opacity: freeText ? 1 : 0.6 },
          onClick: () => freeText && onShowExample?.(freeText),
          children: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440"
        }
      )
    ] })
  ] }) });
}
var LINK_SOURCE_LABELS = {
  yandex_maps: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
  telegram: "Telegram-\u043A\u0430\u043D\u0430\u043B",
  twogis: "2\u0413\u0418\u0421",
  avito: "Avito-\u043F\u0440\u043E\u0444\u0438\u043B\u044C",
  instagram: "Instagram-\u043F\u0440\u043E\u0444\u0438\u043B\u044C",
  website: "\u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442"
};
function ratingLine(rating) {
  if (!rating) return null;
  const m10 = rating.count % 10, m100 = rating.count % 100;
  const word = m10 === 1 && m100 !== 11 ? "\u043E\u0442\u0437\u044B\u0432" : m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14) ? "\u043E\u0442\u0437\u044B\u0432\u0430" : "\u043E\u0442\u0437\u044B\u0432\u043E\u0432";
  return `${String(rating.value).replace(".", ",")} \u2605 \xB7 ${rating.count} ${word}`;
}
function CandidateCard({ cand, idx, onPick }) {
  const line = ratingLine(cand.rating);
  return /* @__PURE__ */ jsxs4("button", { "data-candidate-idx": idx, onClick: onPick, style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    width: "100%",
    padding: "12px 14px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: VT.font.sans
  }, children: [
    cand.photo ? /* @__PURE__ */ jsx4("img", { src: cand.photo, alt: "", style: { width: 44, height: 44, borderRadius: VT.r.sm, objectFit: "cover", flex: "0 0 auto" } }) : /* @__PURE__ */ jsx4("span", { style: {
      width: 44,
      height: 44,
      borderRadius: VT.r.sm,
      flex: "0 0 auto",
      background: VT.accentSoft,
      color: VT.accentInk,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 18,
      fontWeight: 700
    }, children: cand.name.charAt(0) }),
    /* @__PURE__ */ jsxs4("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }, children: [
      /* @__PURE__ */ jsx4("span", { style: { fontSize: 14.5, fontWeight: 600, color: VT.ink, lineHeight: 1.3 }, children: cand.name }),
      /* @__PURE__ */ jsx4("span", { style: { fontSize: 12.5, color: VT.inkSoft, lineHeight: 1.35 }, children: cand.address }),
      line && /* @__PURE__ */ jsx4("span", { style: { fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint, fontVariantNumeric: "tabular-nums", marginTop: 1 }, children: line })
    ] }),
    /* @__PURE__ */ jsx4("span", { style: { color: VT.inkFaint, fontSize: 16, flex: "0 0 auto" }, children: "\u2192" })
  ] });
}
function SkeletonCandidate() {
  return /* @__PURE__ */ jsxs4("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: VT.white,
    border: `1px solid ${VT.lineSoft}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx4("span", { style: { width: 44, height: 44, borderRadius: VT.r.sm, background: VT.bgSoft, animation: "ssr-shimmer 1.4s ease-in-out infinite", flex: "0 0 auto" } }),
    /* @__PURE__ */ jsxs4("span", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 7 }, children: [
      /* @__PURE__ */ jsx4("span", { style: { display: "block", width: "52%", height: 11, borderRadius: 3, background: VT.line, animation: "ssr-shimmer 1.4s ease-in-out infinite" } }),
      /* @__PURE__ */ jsx4("span", { style: { display: "block", width: "74%", height: 9, borderRadius: 3, background: VT.lineSoft, animation: "ssr-shimmer 1.4s ease-in-out infinite" } })
    ] })
  ] });
}
function SearchStateNote({ tone, title, body, primary, onPrimary, ghost, onGhost, link, onLink }) {
  const bg = tone === "warn" ? VT.warnSoft : VT.infoSoft;
  const fg = tone === "warn" ? "oklch(0.42 0.13 70)" : "oklch(0.36 0.10 240)";
  return /* @__PURE__ */ jsxs4("div", { style: { marginTop: 14, padding: "16px 16px 18px", background: bg, borderRadius: VT.r.md }, children: [
    /* @__PURE__ */ jsx4("div", { style: { fontSize: 15, fontWeight: 700, color: fg, marginBottom: 4 }, children: title }),
    /* @__PURE__ */ jsx4("div", { style: { fontSize: 13.5, lineHeight: 1.5, color: fg }, children: body }),
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }, children: [
      primary && /* @__PURE__ */ jsx4(Btn, { size: "sm", onClick: onPrimary, children: primary }),
      ghost && /* @__PURE__ */ jsx4(Btn, { size: "sm", variant: "secondary", onClick: onGhost, children: ghost })
    ] }),
    link && /* @__PURE__ */ jsx4("button", { onClick: onLink, style: {
      display: "block",
      marginTop: 10,
      padding: 0,
      background: "transparent",
      border: "none",
      color: fg,
      fontSize: 12.5,
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 3,
      fontFamily: VT.font.sans
    }, children: link })
  ] });
}
function S3_StepSource({
  mode = "search",
  query = "",
  city = "",
  onQueryChange,
  onCityChange,
  searching = false,
  candidates = null,
  searchError = "none",
  retryAfterSeconds = 59,
  onSearch,
  onPickCandidate,
  onNotMine,
  url = "",
  source = null,
  counts = null,
  onUrlChange,
  onBuild,
  onSwitchMode,
  onPhotoBranch,
  onBack,
  mobile = false
}) {
  const canSearch = !!query && !searching && searchError !== "ratelimited";
  const searchBody = /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 8, marginTop: 18, flexDirection: mobile ? "column" : "row" }, children: [
      /* @__PURE__ */ jsxs4("div", { style: { flex: mobile ? "none" : "1 1 70%", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx4(R2Label, { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u043B\u0430" }),
        /* @__PURE__ */ jsx4(R2Input, { value: query, placeholder: "\u0421\u0442\u0443\u0434\u0438\u044F \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430 \u0410\u043D\u043D\u044B", onChange: onQueryChange })
      ] }),
      /* @__PURE__ */ jsxs4("div", { style: { flex: mobile ? "none" : "1 1 30%", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx4(R2Label, { children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx4(R2Input, { value: city, placeholder: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", onChange: onCityChange })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 14 }, children: [
      /* @__PURE__ */ jsx4(
        Btn,
        {
          style: { width: "100%", opacity: canSearch ? 1 : 0.55 },
          onClick: canSearch ? onSearch : void 0,
          iconRight: searching ? /* @__PURE__ */ jsx4(Spinner, { size: 15 }) : /* @__PURE__ */ jsx4(IconArrow, {}),
          children: "\u041D\u0430\u0439\u0442\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445"
        }
      ),
      searchError === "ratelimited" ? /* @__PURE__ */ jsxs4("div", { style: { marginTop: 8, fontSize: 12.5, color: VT.inkSoft, textAlign: "center", fontVariantNumeric: "tabular-nums" }, children: [
        "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u0438\u0441\u043A \u0441\u043D\u043E\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0447\u0435\u0440\u0435\u0437 0:",
        String(retryAfterSeconds).padStart(2, "0")
      ] }) : /* @__PURE__ */ jsx4("div", { style: { marginTop: 8, fontSize: 12.5, color: VT.inkFaint, textAlign: "center" }, children: "\u0418\u0449\u0435\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C \u0434\u0430\u043D\u043D\u044B\u043C \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442" })
    ] }),
    searching && /* @__PURE__ */ jsxs4("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }, children: [
      /* @__PURE__ */ jsx4(SkeletonCandidate, {}),
      /* @__PURE__ */ jsx4(SkeletonCandidate, {})
    ] }),
    !searching && candidates && candidates.length > 0 && /* @__PURE__ */ jsxs4("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, marginBottom: 8 }, children: "\u042D\u0442\u043E \u0432\u044B?" }),
      /* @__PURE__ */ jsx4("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: candidates.slice(0, 3).map((c, i) => /* @__PURE__ */ jsx4(CandidateCard, { cand: c, idx: i, onPick: () => onPickCandidate?.(c.id) }, c.id)) }),
      /* @__PURE__ */ jsx4(R2TextLink, { onClick: onNotMine, children: "\u0417\u0434\u0435\u0441\u044C \u043D\u0435\u0442 \u043C\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430" })
    ] }),
    !searching && searchError === "empty" && /* @__PURE__ */ jsx4(
      SearchStateNote,
      {
        tone: "warn",
        title: "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445",
        body: "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u043B\u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u0441\u043F\u043E\u0441\u043E\u0431",
        primary: "\u0418\u0441\u043A\u0430\u0442\u044C \u0435\u0449\u0451 \u0440\u0430\u0437",
        onPrimary: onNotMine,
        ghost: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",
        onGhost: () => onSwitchMode?.("link"),
        link: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u0444\u043E\u0442\u043E \u2192",
        onLink: onPhotoBranch
      }
    ),
    !searching && searchError === "network" && /* @__PURE__ */ jsx4(
      SearchStateNote,
      {
        tone: "info",
        title: "\u041A\u0430\u0440\u0442\u044B \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u044E\u0442",
        body: "\u0422\u0430\u043A\u043E\u0435 \u0431\u044B\u0432\u0430\u0435\u0442. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0438\u043B\u0438 \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443",
        primary: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
        onPrimary: onSearch,
        ghost: "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",
        onGhost: () => onSwitchMode?.("link")
      }
    ),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx4(R2TextLink, { block: true, onClick: () => onSwitchMode?.("link"), children: "\u0415\u0441\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 Telegram, \u042F.\u041A\u0430\u0440\u0442\u044B \u0438\u043B\u0438 \u0441\u0430\u0439\u0442? \u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0435\u0451 \u2192" }),
      /* @__PURE__ */ jsx4(R2TextLink, { block: true, onClick: onPhotoBranch, children: "\u041D\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435? \u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u0444\u043E\u0442\u043E \u2192" })
    ] })
  ] });
  const linkBody = /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx4(R2Label, { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }),
      /* @__PURE__ */ jsx4(R2Input, { value: url, placeholder: "https://yandex.ru/maps/\u2026", onChange: onUrlChange })
    ] }),
    source && LINK_SOURCE_LABELS[source] && /* @__PURE__ */ jsxs4("div", { style: {
      marginTop: 10,
      padding: "12px 14px",
      background: VT.successSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.32 0.12 145)"
    }, children: [
      /* @__PURE__ */ jsx4("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx4("path", { d: "M5 12l4 4 10-10" }) }),
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx4("b", { children: LINK_SOURCE_LABELS[source] }),
        counts ? /* @__PURE__ */ jsxs4("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx4(Btn, { style: { width: "100%", opacity: url ? 1 : 0.55 }, iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), onClick: url ? onBuild : void 0, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }) }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx4(R2TextLink, { block: true, onClick: () => onSwitchMode?.("search"), children: "\u041D\u0430\u0439\u0442\u0438 \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E \u2192" }) })
  ] });
  return /* @__PURE__ */ jsx4(R2Shell, { width: 560, mobile, children: /* @__PURE__ */ jsxs4("div", { "data-intake-step": "source", children: [
    mode === "search" ? /* @__PURE__ */ jsx4(
      R2Header,
      {
        activeDot: 1,
        onBack,
        title: "\u041D\u0430\u0439\u0434\u0451\u043C \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
        sub: `${BRAND.name} \u0432\u043E\u0437\u044C\u043C\u0451\u0442 \u0444\u043E\u0442\u043E, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0437\u044B\u0432\u044B \u043E\u0442\u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u043E\u043D\u0438 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C`
      }
    ) : /* @__PURE__ */ jsx4(
      R2Header,
      {
        activeDot: 1,
        onBack,
        title: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443",
        sub: "Telegram-\u043A\u0430\u043D\u0430\u043B, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      }
    ),
    mode === "search" ? searchBody : linkBody
  ] }) });
}

// src/intake/index.tsx
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
function ModalShell({ children, width = 540, intakeStep }) {
  return /* @__PURE__ */ jsx5("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs5("div", { "data-intake-step": intakeStep, style: {
    width,
    maxWidth: "100%",
    background: VT.bg,
    borderRadius: VT.r.xl,
    boxShadow: VT.shadow.pop,
    padding: 28,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx5("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
      position: "absolute",
      top: 14,
      right: 14,
      width: 32,
      height: 32,
      borderRadius: 999,
      background: VT.bgSoft,
      border: `1px solid ${VT.line}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: VT.inkSoft,
      fontSize: 18
    }, children: "\xD7" }),
    children
  ] }) });
}
function StepHeader({ step, total, title, sub, showBack = true }) {
  return /* @__PURE__ */ jsxs5(Fragment4, { children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && showBack && /* @__PURE__ */ jsxs5("button", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px 4px 4px",
        borderRadius: 999,
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        cursor: "pointer",
        fontFamily: VT.font.sans,
        fontSize: 12,
        fontWeight: 500,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx5("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        step,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx5("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < step ? VT.accent : VT.line
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx5("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx5("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
function SvgLink() {
  return /* @__PURE__ */ jsxs5("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx5("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" }),
    /* @__PURE__ */ jsx5("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" })
  ] });
}
function SvgPaperclip() {
  return /* @__PURE__ */ jsx5("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" }) });
}
function ModeSwitcher({ mode = "link", onModeChange }) {
  const tab = (id, label, icon) => {
    const active = mode === id;
    return /* @__PURE__ */ jsxs5(
      "button",
      {
        onClick: () => onModeChange?.(id),
        style: {
          flex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 999,
          background: active ? VT.white : "transparent",
          boxShadow: active ? "0 1px 0 rgba(0,0,0,0.04), 0 6px 14px -8px rgba(120,60,30,0.18)" : "none",
          border: "none",
          cursor: "pointer",
          fontFamily: VT.font.sans,
          fontSize: 14,
          fontWeight: active ? 600 : 500,
          color: active ? VT.ink : VT.inkSoft
        },
        children: [
          /* @__PURE__ */ jsx5("span", { style: { fontSize: 15, display: "inline-flex" }, children: icon }),
          label
        ]
      },
      id
    );
  };
  return /* @__PURE__ */ jsxs5("div", { role: "tablist", "aria-label": "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430", style: {
    display: "flex",
    gap: 4,
    padding: 4,
    background: VT.bgSoft,
    border: `1px solid ${VT.line}`,
    borderRadius: 999,
    marginTop: 18
  }, children: [
    tab("link", "\u0421\u0441\u044B\u043B\u043A\u0430", /* @__PURE__ */ jsx5(SvgLink, {})),
    tab("photo", "\u0424\u043E\u0442\u043E", /* @__PURE__ */ jsx5(SvgPaperclip, {}))
  ] });
}
var SOURCE_LIB = {
  yandex_maps: { label: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", icon: "\u{1F5FA}\uFE0F", tier: "ok" },
  telegram: { label: "Telegram-\u043A\u0430\u043D\u0430\u043B", icon: "\u2708\uFE0F", tier: "ok" },
  twogis: { label: "2\u0413\u0418\u0421", icon: "\u{1F4CD}", tier: "ok" },
  avito: { label: "Avito-\u043F\u0440\u043E\u0444\u0438\u043B\u044C", icon: "\u{1F170}\uFE0F", tier: "ok" },
  instagram: { label: "Instagram-\u043F\u0440\u043E\u0444\u0438\u043B\u044C", icon: "\u{1F4F7}", tier: "ok" },
  website: { label: "\u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442", icon: "\u{1F310}", tier: "ok" },
  vk: { label: "VK-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430", icon: "V", tier: "soon" },
  whatsapp: { label: "WhatsApp-\u043A\u0430\u0442\u0430\u043B\u043E\u0433", icon: "\u{1F7E2}", tier: "soon" },
  youtube: { label: "YouTube-\u043A\u0430\u043D\u0430\u043B", icon: "\u25B6\uFE0F", tier: "soon" },
  unknown: { label: "\u043D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A", icon: "?", tier: "unknown" }
};
function SourceBadge({ source, counts, onCorrect }) {
  const meta = SOURCE_LIB[source] || SOURCE_LIB.unknown;
  const tier = meta.tier;
  if (tier === "ok") {
    return /* @__PURE__ */ jsxs5("div", { style: {
      padding: "12px 14px",
      background: VT.successSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.32 0.12 145)"
    }, children: [
      /* @__PURE__ */ jsx5("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M5 12l4 4 10-10" }) }),
      /* @__PURE__ */ jsxs5("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx5("b", { children: meta.label }),
        counts ? /* @__PURE__ */ jsxs5("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx5("button", { onClick: onCorrect, style: {
        marginLeft: "auto",
        background: "transparent",
        border: "none",
        color: "oklch(0.38 0.12 145)",
        fontSize: 12,
        cursor: "pointer",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        fontFamily: VT.font.sans
      }, children: "\u043D\u0435 \u0442\u043E?" })
    ] });
  }
  if (tier === "soon") {
    return /* @__PURE__ */ jsxs5("div", { style: {
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.36 0.10 240)"
    }, children: [
      /* @__PURE__ */ jsx5("span", { style: { fontSize: 16 }, children: meta.icon }),
      /* @__PURE__ */ jsxs5("span", { children: [
        /* @__PURE__ */ jsx5("b", { children: meta.label }),
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A \u0434\u043E\u0431\u0430\u0432\u0438\u043C."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs5("div", { style: {
    padding: "12px 14px",
    background: VT.warnSoft,
    borderRadius: VT.r.md,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13.5,
    color: "oklch(0.42 0.13 70)"
  }, children: [
    /* @__PURE__ */ jsx5("span", { style: { fontSize: 16 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsx5("span", { children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0444\u043E\u0442\u043E \u2192" })
  ] });
}
function LinkInput({ value, placeholder = "https://...", onChange, loading = false }) {
  const empty = !value;
  return /* @__PURE__ */ jsxs5("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: VT.white,
    border: `1.5px solid ${empty ? VT.line : VT.accent}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx5(IconLink, {}),
    /* @__PURE__ */ jsx5(
      "input",
      {
        type: "url",
        value: value || "",
        placeholder,
        onChange: (e) => onChange?.(e.target.value),
        style: {
          flex: 1,
          fontFamily: VT.font.mono,
          fontSize: 14,
          color: empty ? VT.inkFaint : VT.ink,
          border: "none",
          outline: "none",
          background: "transparent"
        }
      }
    ),
    loading && /* @__PURE__ */ jsx5("span", { style: { color: VT.success, display: "inline-flex" }, children: /* @__PURE__ */ jsx5(Spinner, { size: 14 }) })
  ] });
}
var PHOTO_LIMITS = { minFiles: 5, maxFiles: 60, maxFileBytes: 15 * 1024 * 1024, maxTotalBytes: 200 * 1024 * 1024 };
function PhotoDropZone({ compact = false, onPick }) {
  return /* @__PURE__ */ jsxs5("div", { style: {
    border: `1.5px dashed ${VT.accent}`,
    background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
    borderRadius: VT.r.lg,
    padding: compact ? 20 : 28,
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx5("div", { style: { fontSize: compact ? 22 : 26, marginBottom: 6 }, children: "\u{1F4F7}" }),
    /* @__PURE__ */ jsx5("div", { style: { fontSize: compact ? 14 : 15, fontWeight: 600 }, children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }),
    /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, color: VT.inkSoft, margin: "4px 0 12px" }, children: "\u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \xB7 JPEG / PNG / WebP / HEIC" }),
    /* @__PURE__ */ jsx5(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" }),
    /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 10, fontFamily: VT.font.mono }, children: "5\u201360 \u0444\u0430\u0439\u043B\u043E\u0432 \xB7 \u0434\u043E 15 \u041C\u0411 \u043A\u0430\u0436\u0434\u044B\u0439 \xB7 \u0434\u043E 200 \u041C\u0411 \u0432\u0441\u0435\u0433\u043E" })
  ] });
}
function PhotoThumb({ name, sizeKb = 2400, idx = 0, onRemove }) {
  return /* @__PURE__ */ jsxs5("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx5("div", { style: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
      flex: "0 0 auto"
    } }),
    /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs5("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx5("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
      width: 28,
      height: 28,
      borderRadius: 6,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: VT.inkFaint,
      fontSize: 18
    }, children: "\xD7" })
  ] });
}
function PhotoList({ files, onRemove }) {
  const totalKb = files.reduce((s, f) => s + (f.sizeKb || 2400), 0);
  return /* @__PURE__ */ jsxs5("div", { style: { marginTop: 14 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 ",
        files.length,
        " \u0418\u0417 ",
        PHOTO_LIMITS.maxFiles
      ] }),
      /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 11 }, children: [
        (totalKb / 1e3).toFixed(1),
        " \u041C\u0411 \xB7 \u2264 200 \u041C\u0411"
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: files.map((f, i) => /* @__PURE__ */ jsx5(
      PhotoThumb,
      {
        name: f.name,
        sizeKb: f.sizeKb,
        idx: i,
        onRemove: () => onRemove?.(i)
      },
      i
    )) })
  ] });
}
function FieldLabel({ children, required = false }) {
  return /* @__PURE__ */ jsxs5("label", { style: {
    display: "block",
    fontSize: 13,
    color: VT.inkSoft,
    fontWeight: 500,
    marginBottom: 6
  }, children: [
    children,
    required && /* @__PURE__ */ jsx5("span", { style: { color: VT.accent, marginLeft: 4 }, children: "*" })
  ] });
}
function FieldInput({ value, placeholder, onChange, mono = false, type = "text" }) {
  return /* @__PURE__ */ jsx5(
    "input",
    {
      type,
      value: value || "",
      placeholder,
      onChange: (e) => onChange?.(e.target.value),
      style: {
        width: "100%",
        boxSizing: "border-box",
        padding: "12px 14px",
        background: VT.white,
        border: `1px solid ${value ? VT.accent : VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14,
        lineHeight: 1.5,
        fontFamily: mono ? VT.font.mono : VT.font.sans,
        color: VT.ink,
        outline: "none"
      }
    }
  );
}
function FieldTextarea({ value, placeholder, onChange, rows = 4 }) {
  return /* @__PURE__ */ jsx5(
    "textarea",
    {
      value: value || "",
      placeholder,
      onChange: (e) => onChange?.(e.target.value),
      rows,
      style: {
        width: "100%",
        boxSizing: "border-box",
        resize: "vertical",
        padding: "12px 14px",
        background: VT.white,
        border: `1px solid ${value ? VT.accent : VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14,
        lineHeight: 1.5,
        fontFamily: VT.font.sans,
        color: VT.ink,
        outline: "none"
      }
    }
  );
}
function CustomerContactPicker({ type = "phone", value = "", onTypeChange, onValueChange }) {
  const tab = (id, label, icon) => {
    const active = type === id;
    return /* @__PURE__ */ jsxs5(
      "button",
      {
        onClick: () => onTypeChange?.(id),
        style: {
          flex: 1,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "10px 12px",
          borderRadius: 999,
          background: active ? VT.white : "transparent",
          boxShadow: active ? "0 1px 0 rgba(0,0,0,0.04), 0 6px 14px -8px rgba(120,60,30,0.18)" : "none",
          border: "none",
          cursor: "pointer",
          fontFamily: VT.font.sans,
          fontSize: 13.5,
          fontWeight: active ? 600 : 500,
          color: active ? VT.ink : VT.inkSoft
        },
        children: [
          /* @__PURE__ */ jsx5("span", { style: { fontSize: 14 }, children: icon }),
          label
        ]
      },
      id
    );
  };
  const ph = type === "phone" ? "+7 921 234-56-78" : "@your_handle";
  return /* @__PURE__ */ jsxs5(Fragment4, { children: [
    /* @__PURE__ */ jsxs5("div", { role: "tablist", style: {
      display: "flex",
      gap: 4,
      padding: 4,
      background: VT.bgSoft,
      border: `1px solid ${VT.line}`,
      borderRadius: 999,
      marginBottom: 8
    }, children: [
      tab("phone", "\u0422\u0435\u043B\u0435\u0444\u043E\u043D", "\u{1F4F1}"),
      tab("telegram", "Telegram", "\u2708\uFE0F")
    ] }),
    /* @__PURE__ */ jsx5(FieldInput, { value, placeholder: ph, mono: true, onChange: onValueChange })
  ] });
}
function TextFileThumb({ name, sizeKb = 240, onRemove }) {
  return /* @__PURE__ */ jsxs5("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "8px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx5("div", { style: {
      width: 32,
      height: 32,
      borderRadius: 6,
      background: VT.bgSoft,
      border: `1px solid ${VT.line}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      flex: "0 0 auto"
    }, children: "\u{1F4C4}" }),
    /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs5("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx5("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
      width: 26,
      height: 26,
      borderRadius: 6,
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: VT.inkFaint,
      fontSize: 16
    }, children: "\xD7" })
  ] });
}
function TextFilesDropZone({ onPick }) {
  return /* @__PURE__ */ jsxs5("div", { style: {
    border: `1.5px dashed ${VT.line}`,
    background: VT.bgSoft,
    borderRadius: VT.r.md,
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 12
  }, children: [
    /* @__PURE__ */ jsx5("div", { style: {
      width: 38,
      height: 38,
      borderRadius: 8,
      background: VT.white,
      border: `1px solid ${VT.line}`,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 16,
      flex: "0 0 auto"
    }, children: "\u{1F4CE}" }),
    /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 13.5, fontWeight: 500 }, children: "\u041F\u0440\u0430\u0439\u0441, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433, FAQ" }),
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: VT.inkFaint, fontFamily: VT.font.mono, marginTop: 1 }, children: "PDF / DOCX / TXT / RTF \xB7 \u0434\u043E 10 \u0444\u0430\u0439\u043B\u043E\u0432" })
    ] }),
    /* @__PURE__ */ jsx5(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" })
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs5("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: VT.inkMuted,
    marginTop: 14,
    fontFamily: VT.font.mono,
    letterSpacing: "0.02em"
  }, children: [
    /* @__PURE__ */ jsx5("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx5("path", { d: "M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" }) }),
    "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha"
  ] });
}
function S3_Step1_Link({
  url = "",
  source = null,
  counts = null,
  total = 3,
  onUrlChange,
  onModeChange,
  onCorrect,
  onContinue
}) {
  const canContinue = !!url && source && SOURCE_LIB[source]?.tier === "ok";
  return /* @__PURE__ */ jsxs5(ModalShell, { width: 540, intakeStep: "source", children: [
    /* @__PURE__ */ jsx5(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442",
        sub: `\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u2014 ${BRAND.name} \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0438 \u0437\u0430\u0431\u0435\u0440\u0451\u0442 \u0432\u0441\u0451 \u043D\u0443\u0436\u043D\u043E\u0435`
      }
    ),
    /* @__PURE__ */ jsx5(ModeSwitcher, { mode: "link", onModeChange }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }),
      /* @__PURE__ */ jsx5(
        LinkInput,
        {
          value: url,
          placeholder: "https://t.me/studia_anna",
          onChange: onUrlChange,
          loading: !!url && !source
        }
      )
    ] }),
    source && /* @__PURE__ */ jsx5("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx5(SourceBadge, { source, counts, onCorrect }) }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: [
      /* @__PURE__ */ jsx5(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u041F\u041E\u0414\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0415\u041C:" }),
      " ",
      "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 Telegram-\u043A\u0430\u043D\u0430\u043B \xB7 Instagram \xB7 2\u0413\u0418\u0421 \xB7 Avito \xB7 \u0432\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442"
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx5(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx5(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx5(CaptchaNotice, {})
  ] });
}
function S3_Step1_Photo({
  files = [],
  total = 4,
  onPick,
  onRemove,
  onModeChange,
  onContinue
}) {
  const empty = files.length === 0;
  const canContinue = files.length >= PHOTO_LIMITS.minFiles;
  return /* @__PURE__ */ jsxs5(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx5(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442",
        sub: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u044B, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u043F\u0440\u043E\u0444\u0438\u043B\u044F, \u0444\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438 \u043C\u0435\u043D\u044E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C"
      }
    ),
    /* @__PURE__ */ jsx5(ModeSwitcher, { mode: "photo", onModeChange }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx5(PhotoDropZone, { compact: !empty, onPick }) }),
    !empty && /* @__PURE__ */ jsx5(PhotoList, { files, onRemove }),
    !empty && files.length < PHOTO_LIMITS.minFiles && /* @__PURE__ */ jsxs5("div", { style: {
      marginTop: 12,
      fontSize: 12.5,
      color: VT.inkSoft,
      padding: "8px 12px",
      background: VT.warnSoft,
      borderRadius: VT.r.sm
    }, children: [
      "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0435\u0449\u0451 ",
      PHOTO_LIMITS.minFiles - files.length,
      " \u2014 \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u043D\u0443\u0436\u043D\u043E \u043C\u0438\u043D\u0438\u043C\u0443\u043C ",
      PHOTO_LIMITS.minFiles,
      " \u0444\u043E\u0442\u043E."
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx5(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx5(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx5(CaptchaNotice, {})
  ] });
}
function S3_Step2_PhotoDesc({
  description = "",
  city = "",
  customerContact = "",
  customerContactType = "phone",
  textFiles = [],
  onDescriptionChange,
  onCityChange,
  onCustomerContactChange,
  onCustomerContactTypeChange,
  onPickTextFile,
  onRemoveTextFile,
  onBack,
  onContinue
}) {
  const ok = description.length >= 30 && !!city && !!customerContact;
  return /* @__PURE__ */ jsxs5(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx5(
      StepHeader,
      {
        step: 2,
        total: 4,
        title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435",
        sub: "\u041F\u0430\u0440\u0430 \u0441\u0442\u0440\u043E\u043A, \u0447\u0442\u043E\u0431\u044B \u0418\u0418 \u0441\u043E\u0431\u0440\u0430\u043B \u0441\u0430\u0439\u0442 \u0442\u043E\u0447\u043D\u0435\u0435"
      }
    ),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { required: true, children: "\u0427\u0442\u043E \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435" }),
      /* @__PURE__ */ jsx5(
        FieldTextarea,
        {
          value: description,
          placeholder: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440, \u043F\u0435\u0434\u0438\u043A\u044E\u0440, \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435. 7 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430, \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435, \u0432\u044B\u0435\u0437\u0434 \u043D\u0430 \u0434\u043E\u043C",
          onChange: onDescriptionChange,
          rows: 4
        }
      )
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx5(FieldLabel, { required: true, children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx5(FieldInput, { value: city, placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A", onChange: onCityChange })
      ] }),
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx5(FieldLabel, { required: true, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435" }),
        /* @__PURE__ */ jsx5(
          CustomerContactPicker,
          {
            type: customerContactType,
            value: customerContact,
            onTypeChange: onCustomerContactTypeChange,
            onValueChange: onCustomerContactChange
          }
        ),
        /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 6, lineHeight: 1.4 }, children: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u041A\u0443\u0434\u0430 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432\u0430\u043C \u043B\u0438\u0447\u043D\u043E \u2014 \u0441\u043F\u0440\u043E\u0441\u0438\u043C \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0448\u0430\u0433\u0435." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0444\u0430\u0439\u043B\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }),
      textFiles.length === 0 ? /* @__PURE__ */ jsx5(TextFilesDropZone, { onPick: onPickTextFile }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
        textFiles.map((f, i) => /* @__PURE__ */ jsx5(
          TextFileThumb,
          {
            name: f.name,
            sizeKb: f.sizeKb,
            onRemove: () => onRemoveTextFile?.(i)
          },
          i
        )),
        /* @__PURE__ */ jsx5("button", { onClick: onPickTextFile, style: {
          alignSelf: "flex-start",
          marginTop: 4,
          background: "transparent",
          border: "none",
          color: VT.accent,
          fontSize: 13,
          cursor: "pointer",
          textDecoration: "underline",
          textUnderlineOffset: 3,
          fontFamily: VT.font.sans
        }, children: "+ \u0435\u0449\u0451 \u0444\u0430\u0439\u043B" })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx5(
      Btn,
      {
        style: { flex: 1, opacity: ok ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx5(IconArrow, {}),
        onClick: ok ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx5(CaptchaNotice, {})
  ] });
}
function ChannelOption({ value, label, hint, icon, selected, onSelect }) {
  return /* @__PURE__ */ jsxs5(
    "label",
    {
      onClick: () => onSelect?.(value),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: selected ? VT.accentSoft : VT.white,
        border: `1.5px solid ${selected ? VT.accent : VT.line}`,
        borderRadius: VT.r.md,
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ jsx5("span", { style: {
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1.5px solid ${selected ? VT.accent : VT.line}`,
          background: VT.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto"
        }, children: selected && /* @__PURE__ */ jsx5("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }) }),
        /* @__PURE__ */ jsx5("span", { style: { fontSize: 16 }, children: icon }),
        /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx5("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx5("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 1 }, children: hint })
        ] })
      ]
    }
  );
}
function S3_StepContact({
  step,
  total,
  channel = "telegram",
  contact = "",
  consent = true,
  // 0.10.0 additive: копи-оверрайды для превью-флоу + мягкие notice-плашки.
  // Дефолты = строки 0.3.0 → photo-ветка и классическая link-ветка byte-identical.
  title = "\u041A\u0443\u0434\u0430 \u0432\u0430\u043C \u043F\u0438\u0441\u0430\u0442\u044C?",
  sub = "\u041E\u0434\u0438\u043D \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u0432\u0430\u0441 \u2014 \u0442\u0443\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442 \u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432.",
  notice = null,
  // null | 'preview_failed' | 'preview_timeout'
  onChannelChange,
  onContactChange,
  onConsentChange,
  onBack,
  onSubmit
}) {
  const ph = {
    telegram: "@your_handle",
    phone: "+7 921 234-56-78",
    email: "you@example.ru",
    max: "@your_handle"
  }[channel];
  return /* @__PURE__ */ jsxs5(ModalShell, { width: 540, intakeStep: "contact", children: [
    /* @__PURE__ */ jsx5(
      StepHeader,
      {
        step,
        total,
        title,
        sub
      }
    ),
    notice === "preview_failed" && /* @__PURE__ */ jsx5("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.warnSoft,
      borderRadius: VT.r.md,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "oklch(0.42 0.13 70)"
    }, children: "\u041D\u0435 \u0434\u043E\u0442\u044F\u043D\u0443\u043B\u0438\u0441\u044C \u0434\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
    notice === "preview_timeout" && /* @__PURE__ */ jsx5("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "oklch(0.36 0.10 240)"
    }, children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0438 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
        /* @__PURE__ */ jsx5(
          ChannelOption,
          {
            value: "telegram",
            label: "Telegram",
            hint: "\u043C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u043E",
            icon: "\u2708\uFE0F",
            selected: channel === "telegram",
            onSelect: onChannelChange
          }
        ),
        /* @__PURE__ */ jsx5(
          ChannelOption,
          {
            value: "phone",
            label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
            hint: "SMS-\u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
            icon: "\u{1F4F1}",
            selected: channel === "phone",
            onSelect: onChannelChange
          }
        ),
        /* @__PURE__ */ jsx5(
          ChannelOption,
          {
            value: "email",
            label: "Email",
            hint: "\u043F\u0438\u0441\u044C\u043C\u043E\u043C",
            icon: "\u{1F4E7}",
            selected: channel === "email",
            onSelect: onChannelChange
          }
        ),
        /* @__PURE__ */ jsx5(
          ChannelOption,
          {
            value: "max",
            label: "MAX",
            hint: "\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440 \u043E\u0442 VK",
            icon: "\u{1F4AC}",
            selected: channel === "max",
            onSelect: onChannelChange
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: channel === "phone" ? "\u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0434\u043B\u044F SMS" : channel === "email" ? "\u0412\u0430\u0448 email" : channel === "max" ? "\u0412\u0430\u0448 MAX (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" }),
      /* @__PURE__ */ jsx5(FieldInput, { value: contact, placeholder: ph, mono: true, onChange: onContactChange })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx5(
      Checkbox,
      {
        checked: consent,
        onChange: (v) => onConsentChange?.(v),
        label: /* @__PURE__ */ jsx5(Fragment4, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }),
        link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
      }
    ) }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 20 }, children: /* @__PURE__ */ jsx5(
      Btn,
      {
        style: { flex: 1, opacity: contact && consent ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx5(IconArrow, {}),
        onClick: contact && consent ? onSubmit : void 0,
        children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"
      }
    ) }),
    /* @__PURE__ */ jsx5(CaptchaNotice, {})
  ] });
}
function SummaryRow({ label, value }) {
  return /* @__PURE__ */ jsxs5("div", { style: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "10px 0",
    borderTop: `1px solid ${VT.line}`
  }, children: [
    /* @__PURE__ */ jsx5("div", { style: {
      flex: "0 0 130px",
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.08em",
      color: VT.inkFaint,
      paddingTop: 2
    }, children: label }),
    /* @__PURE__ */ jsx5("div", { style: { flex: 1, fontSize: 14, color: VT.ink, lineHeight: 1.45, wordBreak: "break-word" }, children: value })
  ] });
}
function pluralFiles(n) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "\u0444\u0430\u0439\u043B";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "\u0444\u0430\u0439\u043B\u0430";
  return "\u0444\u0430\u0439\u043B\u043E\u0432";
}
function S3_FinalConfirm({ mode = "link", total = 3, summary = {}, onClose }) {
  return /* @__PURE__ */ jsxs5(ModalShell, { width: 540, intakeStep: "confirm", children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        total,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx5("span", { style: { width: 28, height: 4, borderRadius: 2, background: VT.accent } }, i)) })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: VT.successSoft,
      color: VT.success,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsx5("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M5 12l4 4 10-10" }) }) }),
    /* @__PURE__ */ jsx5("h2", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 8px", lineHeight: 1.15 }, children: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442" }),
    /* @__PURE__ */ jsxs5("p", { style: { fontSize: 15, lineHeight: 1.5, color: VT.inkSoft, margin: 0 }, children: [
      "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 ",
      /* @__PURE__ */ jsx5("b", { style: { color: VT.ink }, children: "2 \u0447\u0430\u0441\u043E\u0432" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 20 }, children: [
      mode === "link" && summary.url && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u0421\u0421\u042B\u041B\u041A\u0410", value: /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.url }) }),
      summary.themeLabel && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u0421\u0422\u0418\u041B\u042C", value: summary.themeLabel }),
      mode === "photo" && /* @__PURE__ */ jsxs5(Fragment4, { children: [
        /* @__PURE__ */ jsx5(SummaryRow, { label: "\u0424\u0410\u0419\u041B\u042B", value: `${summary.fileCount || 0} \u0444\u043E\u0442\u043E` }),
        summary.description && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u041E\u041F\u0418\u0421\u0410\u041D\u0418\u0415", value: summary.description }),
        summary.city && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u0413\u041E\u0420\u041E\u0414", value: summary.city }),
        summary.customerContact && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u041D\u0410 \u0421\u0410\u0419\u0422\u0415", value: /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.customerContact }) }),
        summary.textFileCount > 0 && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u0422\u0415\u041A\u0421\u0422\u042B", value: `${summary.textFileCount} ${pluralFiles(summary.textFileCount)}` })
      ] }),
      /* @__PURE__ */ jsx5(
        SummaryRow,
        {
          label: "\u041D\u0410\u041F\u0418\u0428\u0415\u041C \u0412\u0410\u041C",
          value: /* @__PURE__ */ jsxs5("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
            summary.contact,
            /* @__PURE__ */ jsxs5("span", { style: { color: VT.inkFaint }, children: [
              " \xB7 ",
              {
                telegram: "Telegram",
                phone: "SMS",
                email: "Email",
                max: "MAX"
              }[summary.channel] || ""
            ] })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: 24 }, children: /* @__PURE__ */ jsx5(Btn, { variant: "secondary", style: { width: "100%" }, onClick: onClose, iconRight: /* @__PURE__ */ jsx5(IconArrow, {}), children: "\u041E\u043A, \u0436\u0434\u0443" }) })
  ] });
}
function SubmitModal(props) {
  const {
    mode = "link",
    step = 1,
    // step 1 link
    url = "",
    source = null,
    counts = null,
    onUrlChange,
    onCorrect,
    // step 1 photo
    files = [],
    onPickPhoto,
    onRemovePhoto,
    // mode-switcher
    onModeChange,
    // step 2 photo
    description = "",
    city = "",
    customerContact = "",
    customerContactType = "phone",
    textFiles = [],
    onDescriptionChange,
    onCityChange,
    onCustomerContactChange,
    onCustomerContactTypeChange,
    onPickTextFile,
    onRemoveTextFile,
    // contact
    channel = "telegram",
    contact = "",
    consent = true,
    onChannelChange,
    onContactChange,
    onConsentChange,
    // navigation
    onBack,
    onContinue,
    onSubmit,
    onClose,
    // final
    summary,
    // 0.10.0 · «сайт до контакта» (additive). UI-статус — superset poll-статуса:
    // 'timeout' — решение консьюмера по своему таймеру (> 40 c), бэкенд его не шлёт.
    // preview = {
    //   status: 'building' | 'ready' | 'failed' | 'timeout',
    //   stage?, counts?, draftSkeleton?, draft?,            // из poll-ответа
    //   baseDraft?,                                         // 0.11.0 · есть → сборка = морф §5
    //   themeOptions?, activeTheme?, onThemeChange?,        // переключатель 2-3 тем
    //   variant?: 'rich' | 'sparse', mobile?,
    // }
    preview = null,
    contactNotice = null,
    // прокидывается в S3_StepContact на шаге 3 превью-флоу
    // 0.11.0 · rev.2 «ниша-демо» (additive). Вход ДО ссылки:
    // entry = {
    //   step: 'niche' | 'demo' | 'source',
    //   // niche:  niches?, freeText?, onFreeTextChange?, onPick?, onShowExample?
    //   // demo:   demoDraft (из demoDraftFor), nicheLabel?, themeOptions?,
    //   //         activeTheme?, onThemeChange?, onClaimDemo?, onOtherNiche?
    //   // source: sourceMode?, query?, city?, onQueryChange?, onCityChange?,
    //   //         searching?, candidates?, searchError?, retryAfterSeconds?,
    //   //         onSearch?, onPickCandidate?, onNotMine?, onSwitchMode?, onPhotoBranch?
    //   mobile?,
    // }
    // Состояние темы: activeTheme живёт с шага 0b и протаскивается через сборку
    // в превью и payload заявки. userThemeTouched=true → выбор человека сильнее
    // draft.theme_id бэкенда (ТЗ rev.2 §2) — правило реализует консьюмер.
    entry = null
  } = props;
  const previewFlow = mode === "link" && !!preview;
  const total = mode === "photo" ? 4 : previewFlow ? 4 : 3;
  if (entry && entry.step === "niche") {
    return /* @__PURE__ */ jsx5(
      S3_StepNiche,
      {
        niches: entry.niches,
        freeText: entry.freeText,
        onFreeTextChange: entry.onFreeTextChange,
        onPick: entry.onPick,
        onShowExample: entry.onShowExample,
        mobile: entry.mobile
      }
    );
  }
  if (entry && entry.step === "demo") {
    return /* @__PURE__ */ jsx5(
      S3_StepPreview,
      {
        variant: "demo",
        draft: entry.demoDraft,
        nicheLabel: entry.nicheLabel,
        themeOptions: entry.themeOptions || [],
        activeTheme: entry.activeTheme,
        onThemeChange: entry.onThemeChange,
        onClaim: entry.onClaimDemo || onContinue,
        onBack: entry.onOtherNiche,
        mobile: entry.mobile
      }
    );
  }
  if (entry && entry.step === "source") {
    return /* @__PURE__ */ jsx5(
      S3_StepSource,
      {
        mode: entry.sourceMode || "search",
        query: entry.query,
        city: entry.city,
        onQueryChange: entry.onQueryChange,
        onCityChange: entry.onCityChange,
        searching: entry.searching,
        candidates: entry.candidates,
        searchError: entry.searchError,
        retryAfterSeconds: entry.retryAfterSeconds,
        onSearch: entry.onSearch,
        onPickCandidate: entry.onPickCandidate,
        onNotMine: entry.onNotMine,
        url,
        source,
        counts,
        onUrlChange,
        onBuild: onContinue,
        onSwitchMode: entry.onSwitchMode,
        onPhotoBranch: entry.onPhotoBranch,
        onBack,
        mobile: entry.mobile
      }
    );
  }
  if (previewFlow && step === 2) {
    if (preview.status === "ready" && preview.draft) {
      return /* @__PURE__ */ jsx5(
        S3_StepPreview,
        {
          draft: preview.draft,
          themeOptions: preview.themeOptions || [],
          activeTheme: preview.activeTheme,
          onThemeChange: preview.onThemeChange,
          onClaim: onContinue,
          onBack,
          variant: preview.variant,
          mobile: preview.mobile
        }
      );
    }
    if (preview.status === "failed") {
      return /* @__PURE__ */ jsx5(
        S3_StepContact,
        {
          step: 3,
          total,
          title: "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442?",
          sub: "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u043F\u043E\u043B\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443, \u043E\u0431\u044B\u0447\u043D\u043E \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 2 \u0447\u0430\u0441\u043E\u0432.",
          notice: "preview_failed",
          channel,
          contact,
          consent,
          onChannelChange,
          onContactChange,
          onConsentChange,
          onBack,
          onSubmit
        }
      );
    }
    return /* @__PURE__ */ jsx5(
      S3_StepBuilding,
      {
        stage: preview.stage,
        counts: preview.counts,
        draftSkeleton: preview.draftSkeleton,
        baseDraft: preview.baseDraft,
        source: preview.source,
        timedOut: preview.status === "timeout",
        onSkipToContact: onContinue,
        onBack,
        mobile: preview.mobile
      }
    );
  }
  if (previewFlow && step === 3) {
    return /* @__PURE__ */ jsx5(
      S3_StepContact,
      {
        step: 3,
        total,
        title: "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442?",
        sub: "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u043F\u043E\u043B\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443, \u043E\u0431\u044B\u0447\u043D\u043E \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 2 \u0447\u0430\u0441\u043E\u0432.",
        notice: contactNotice,
        channel,
        contact,
        consent,
        onChannelChange,
        onContactChange,
        onConsentChange,
        onBack,
        onSubmit
      }
    );
  }
  if (previewFlow && step === 4) {
    const s = summary || {
      url,
      channel,
      contact,
      themeLabel: preview.activeTheme || void 0
    };
    return /* @__PURE__ */ jsx5(S3_FinalConfirm, { mode: "link", total, summary: s, onClose });
  }
  if (step === 1 && mode === "link") {
    return /* @__PURE__ */ jsx5(
      S3_Step1_Link,
      {
        url,
        source,
        counts,
        total,
        onUrlChange,
        onModeChange,
        onCorrect,
        onContinue
      }
    );
  }
  if (step === 1 && mode === "photo") {
    return /* @__PURE__ */ jsx5(
      S3_Step1_Photo,
      {
        files,
        total,
        onPick: onPickPhoto,
        onRemove: onRemovePhoto,
        onModeChange,
        onContinue
      }
    );
  }
  if (step === 2 && mode === "photo") {
    return /* @__PURE__ */ jsx5(
      S3_Step2_PhotoDesc,
      {
        description,
        city,
        customerContact,
        customerContactType,
        textFiles,
        onDescriptionChange,
        onCityChange,
        onCustomerContactChange,
        onCustomerContactTypeChange,
        onPickTextFile,
        onRemoveTextFile,
        onBack,
        onContinue
      }
    );
  }
  if (step === 2 && mode === "link" || step === 3 && mode === "photo") {
    return /* @__PURE__ */ jsx5(
      S3_StepContact,
      {
        step,
        total,
        channel,
        contact,
        consent,
        onChannelChange,
        onContactChange,
        onConsentChange,
        onBack,
        onSubmit
      }
    );
  }
  if (step === 3 && mode === "link" || step === 4 && mode === "photo") {
    const s = summary || {
      url,
      fileCount: files.length,
      description,
      city,
      customerContact,
      textFileCount: textFiles.length,
      channel,
      contact
    };
    return /* @__PURE__ */ jsx5(S3_FinalConfirm, { mode, total, summary: s, onClose });
  }
  return /* @__PURE__ */ jsx5(
    S3_Step1_Link,
    {
      url,
      source,
      counts,
      total,
      onUrlChange,
      onModeChange
    }
  );
}
function PhotoDrawer(props) {
  return /* @__PURE__ */ jsx5(S3_Step1_Photo, { ...props, total: 4 });
}
var Confirmation = S3_FinalConfirm;
export {
  Confirmation,
  GENERIC_THEME_OPTIONS,
  NICHE_DEMO_DRAFTS,
  NICHE_LIB,
  PHOTO_LIMITS,
  PhotoDrawer,
  S3_FinalConfirm,
  S3_Step1_Link,
  S3_Step1_Photo,
  S3_Step2_PhotoDesc,
  S3_StepBuilding,
  S3_StepContact,
  S3_StepNiche,
  S3_StepPreview,
  S3_StepSource,
  SOURCE_LIB,
  SubmitModal,
  demoDraftFor,
  draftHostSlug,
  draftPreset,
  draftToSlotContent,
  matchNiche,
  mockPreviewDraftRich,
  mockPreviewDraftSparse,
  mockSourceCandidates,
  mockThemeOptions,
  morphSlotContent,
  nicheCopyFor
};
//# sourceMappingURL=index.js.map