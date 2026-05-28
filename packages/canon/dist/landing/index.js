"use client";

// src/landing/index.tsx
import React2 from "react";

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
  const c = theme.colors;
  const f = theme.fonts;
  const r = theme.radii;
  const v = theme.voice;
  const withEm = (text) => {
    const parts = text.split(/\[\[(.+?)\]\]/g);
    return parts.map(
      (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx2(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx2("em", { style: {
        fontStyle: v.italicAccent ? "italic" : "normal",
        color: c.accent,
        fontWeight: v.displayWeight
      }, children: p }, i)
    );
  };
  const hr = { borderBottom: `1px solid ${c.line}` };
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: c.bg,
    color: c.ink,
    fontFamily: f.body,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    fontVariantNumeric: "tabular-nums"
  }, children: [
    /* @__PURE__ */ jsxs2("header", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "13px 16px 11px",
      ...hr
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: f.display,
        fontStyle: v.italicAccent ? "italic" : "normal",
        fontSize: 15,
        fontWeight: v.displayWeight,
        letterSpacing: "-0.01em",
        color: c.ink
      }, children: content.meta.brand }),
      /* @__PURE__ */ jsx2("a", { style: {
        background: c.accent,
        color: c.accentInk,
        padding: "6px 12px",
        fontFamily: f.mono,
        fontSize: 9,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        borderRadius: r.btn,
        cursor: "pointer"
      }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      justifyContent: "space-between",
      padding: "9px 16px",
      fontFamily: f.mono,
      fontSize: 9,
      color: c.inkSoft,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      ...hr
    }, children: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u0441 ",
        content.meta.since
      ] }),
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u2605\u2605\u2605\u2605\u2605 ",
        content.meta.rating
      ] }),
      /* @__PURE__ */ jsxs2("span", { children: [
        content.meta.reviewsN,
        " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("section", { style: { padding: "16px 16px 18px", ...hr }, children: /* @__PURE__ */ jsx2("h1", { style: {
      fontFamily: f.display,
      fontSize: 34,
      fontWeight: v.displayWeight,
      lineHeight: 0.94,
      letterSpacing: "-0.025em",
      color: c.ink,
      margin: 0
    }, children: content.hero.headingLines.map((line, i) => /* @__PURE__ */ jsxs2(React.Fragment, { children: [
      withEm(line),
      i < content.hero.headingLines.length - 1 && /* @__PURE__ */ jsx2("br", {})
    ] }, i)) }) }),
    content.hero.leadParagraph && /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 16px", ...hr }, children: [
      v.dropCap && /* @__PURE__ */ jsx2("span", { style: {
        fontFamily: f.display,
        fontSize: 44,
        fontWeight: v.displayWeight,
        float: "left",
        lineHeight: 0.85,
        margin: "4px 8px 0 0",
        color: c.accent
      }, children: content.hero.leadParagraph[0] }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 13, lineHeight: 1.55, color: c.ink, margin: 0 }, children: v.dropCap ? content.hero.leadParagraph.slice(1) : content.hero.leadParagraph })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { aspectRatio: "4 / 3", overflow: "hidden", position: "relative", ...hr }, children: [
      /* @__PURE__ */ jsx2(
        "img",
        {
          src: content.hero.photoSrc,
          alt: "",
          loading: "lazy",
          style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" }
        }
      ),
      content.hero.photoCaption && /* @__PURE__ */ jsx2("div", { style: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "5px 10px",
        background: c.bg,
        fontFamily: f.mono,
        fontSize: 9,
        color: c.inkSoft,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        borderTop: `1px solid ${c.line}`
      }, children: content.hero.photoCaption })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      padding: "12px 16px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...hr
    }, children: [
      /* @__PURE__ */ jsxs2("a", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: c.accent,
        color: c.accentInk,
        padding: "13px 16px",
        borderRadius: r.btn,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        cursor: "pointer"
      }, children: [
        content.cta.primary.label,
        /* @__PURE__ */ jsx2("span", { style: {
          fontFamily: f.display,
          fontSize: 22,
          fontStyle: v.italicAccent ? "italic" : "normal"
        }, children: "\u2192" })
      ] }),
      content.cta.phone && /* @__PURE__ */ jsx2("a", { style: {
        textAlign: "center",
        padding: "10px 16px",
        border: `1px solid ${c.ink}`,
        borderRadius: r.btn,
        fontSize: 12,
        fontFamily: f.mono,
        letterSpacing: "0.05em",
        color: c.ink,
        cursor: "pointer"
      }, children: content.cta.phone })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(${content.stats.length}, 1fr)`,
      ...hr
    }, children: content.stats.map((s, i) => /* @__PURE__ */ jsxs2("div", { style: {
      padding: "12px 8px",
      textAlign: "center",
      borderRight: i < content.stats.length - 1 ? `1px solid ${c.line}` : void 0
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        fontFamily: f.display,
        fontSize: 22,
        fontWeight: v.displayWeight,
        color: c.accent,
        lineHeight: 1,
        marginBottom: 3
      }, children: [
        s.num,
        s.unit && /* @__PURE__ */ jsx2("span", { style: { fontSize: 12, color: c.inkSoft }, children: s.unit })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: f.mono,
        fontSize: 8,
        color: c.inkSoft,
        textTransform: "uppercase",
        letterSpacing: "0.08em"
      }, children: s.label })
    ] }, i)) }),
    content.menu && /* @__PURE__ */ jsxs2("section", { style: { padding: "18px 16px", ...hr }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        fontFamily: f.mono,
        fontSize: 9,
        color: c.inkSoft,
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: 10,
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { height: 1, background: c.inkSoft, flex: 1 } }),
        content.menu.eyebrow,
        /* @__PURE__ */ jsx2("span", { style: { height: 1, background: c.inkSoft, flex: 1 } })
      ] }),
      /* @__PURE__ */ jsx2("h3", { style: {
        fontFamily: f.display,
        fontSize: 20,
        fontWeight: v.displayWeight,
        lineHeight: 1,
        letterSpacing: "-0.015em",
        marginBottom: 12,
        color: c.ink
      }, children: withEm(content.menu.title) }),
      content.menu.items.slice(0, 3).map((it, i, arr) => /* @__PURE__ */ jsxs2("div", { style: {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 10,
        alignItems: "baseline",
        padding: "9px 0",
        borderBottom: i < arr.length - 1 ? `1px dotted ${c.lineSoft}` : void 0
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.accent }, children: it.num }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: v.displayWeight, color: c.ink }, children: it.name }),
          it.desc && /* @__PURE__ */ jsx2("div", { style: { fontSize: 10, color: c.inkSoft, marginTop: 2 }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: {
          fontFamily: f.display,
          fontStyle: v.italicAccent ? "italic" : "normal",
          fontSize: 14,
          color: c.ink
        }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("section", { style: { padding: "14px 16px", ...hr }, children: [
      /* @__PURE__ */ jsx2("p", { style: {
        fontFamily: f.display,
        fontStyle: v.italicAccent ? "italic" : "normal",
        fontSize: 15,
        lineHeight: 1.3,
        margin: 0,
        color: c.ink
      }, children: content.quote.text.split(/\[\[(.+?)\]\]/g).map(
        (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx2(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx2("em", { style: { color: c.accent, fontStyle: "normal" }, children: p }, i)
      ) }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: c.inkSoft, marginTop: 8 }, children: [
        content.quote.authorName,
        " \xB7 ",
        content.quote.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("footer", { style: {
      padding: "11px 16px",
      background: c.invBg,
      color: c.invInk,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: f.mono,
      fontSize: 9,
      textTransform: "uppercase",
      letterSpacing: "0.08em",
      opacity: 0.7
    }, children: [
      /* @__PURE__ */ jsx2("span", { children: content.meta.address }),
      /* @__PURE__ */ jsxs2("span", { children: [
        content.meta.host,
        ".",
        BRAND.domain
      ] })
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
  const card = {
    background: c.bgAlt,
    borderRadius: r.card,
    padding: 14,
    border: `1px solid ${c.line}`,
    overflow: "hidden"
  };
  const label = {
    fontFamily: f.mono,
    fontSize: 9,
    color: c.inkFaint,
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    marginBottom: 8
  };
  const s = content.stats;
  const m = content.menu;
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, padding: 14, fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, padding: "0 2px" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, fontFamily: f.display, fontWeight: 700, fontSize: 14, letterSpacing: "-0.02em" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 22, height: 22, background: c.accent, color: c.accentInk, borderRadius: r.mark, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }, children: content.meta.brand[0] }),
        content.meta.brand
      ] }),
      /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.inkSoft }, children: [
        "\u2605 ",
        content.meta.rating
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4", background: c.accent, color: c.accentInk, border: "none", padding: "20px 16px" }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, background: c.bg, color: c.accent, padding: "5px 9px", borderRadius: 999, fontSize: 9, fontWeight: 700, fontFamily: f.mono, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { width: 5, height: 5, background: c.accent, borderRadius: "50%" } }),
          "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F"
        ] }),
        /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 27, fontWeight: 800, lineHeight: 0.96, letterSpacing: "-0.035em", margin: 0 }, children: content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "") })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx2("div", { style: label, children: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F" }),
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }, children: "14:00 \xB7 16:30" }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 10, color: c.inkSoft, marginTop: 2 }, children: content.cta.primary.label.toLowerCase() })
      ] }),
      s[0] && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx2("div", { style: label, children: s[0].label }),
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }, children: [
          s[0].num,
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: c.inkFaint }, children: s[0].unit })
        ] })
      ] }),
      s[1] && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx2("div", { style: label, children: s[1].label }),
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", color: c.accent }, children: [
          s[1].num,
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: c.inkFaint }, children: s[1].unit })
        ] })
      ] }),
      s[2] && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx2("div", { style: label, children: s[2].label }),
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }, children: [
          s[2].num,
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: c.inkFaint }, children: s[2].unit })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { gridColumn: "span 4", borderRadius: r.card, overflow: "hidden", aspectRatio: "16/9" }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4", background: c.invBg, color: c.invInk, border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "16px 18px" }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em" }, children: content.cta.primary.label }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 10, color: c.invInkSoft, marginTop: 2 }, children: content.cta.phone })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: { width: 32, height: 32, background: c.accent, color: c.accentInk, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }, children: "\u2192" })
      ] }),
      m && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4" }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }, children: m.title.replace(/\[\[|\]\]/g, "") }),
        m.items.map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: i < m.items.length - 1 ? `1px solid ${c.line}` : void 0 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 12 }, children: it.name }),
          /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 12, color: c.accent, fontWeight: 500 }, children: it.price })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4" }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 15, fontWeight: 500, marginBottom: 4 }, children: content.cta.phone }),
        /* @__PURE__ */ jsxs2("div", { style: { fontSize: 10, color: c.inkSoft }, children: [
          content.meta.address,
          " \xB7 ",
          content.meta.host,
          ".",
          BRAND.domain
        ] })
      ] })
    ] })
  ] });
}
function DisplayFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const lines = content.hero.headingLines;
  const m = content.menu;
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, display: "flex", flexDirection: "column", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 18px" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, background: c.accent, borderRadius: "50%" } }),
        content.meta.brand
      ] }),
      /* @__PURE__ */ jsx2("span", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: c.ink, padding: "6px 12px", border: `1px solid ${c.ink}`, borderRadius: 999 }, children: content.cta.phone })
    ] }),
    /* @__PURE__ */ jsxs2("section", { style: { padding: "16px 18px 22px" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", fontFamily: f.mono, fontSize: 9, color: c.inkSoft, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${c.line}` }, children: [
        /* @__PURE__ */ jsxs2("span", { children: [
          "\u0441 ",
          content.meta.since,
          " \xB7 ",
          content.meta.address
        ] }),
        /* @__PURE__ */ jsxs2("span", { children: [
          "\u2605\u2605\u2605\u2605\u2605 ",
          content.meta.rating
        ] })
      ] }),
      /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 60, fontWeight: v.displayWeight, lineHeight: 0.85, letterSpacing: "-0.045em", margin: 0 }, children: lines.map((line, i) => /* @__PURE__ */ jsx2("span", { style: {
        display: "block",
        color: i === 1 ? c.accent : c.ink,
        fontStyle: i === 1 && v.italicAccent ? "italic" : "normal",
        textIndent: i === 1 ? 20 : 0,
        textAlign: i === 2 ? "right" : "left"
      }, children: renderEm(line, c.accent, v.italicAccent) }, i)) }),
      content.stats[0] && /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center", marginTop: 18, paddingTop: 18, borderTop: `1px solid ${c.line}` }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 46, fontWeight: v.displayWeight, lineHeight: 0.85, color: c.accent, fontStyle: v.italicAccent ? "italic" : "normal", whiteSpace: "nowrap" }, children: [
          content.stats[0].num,
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 22 }, children: content.stats[0].unit })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { fontSize: 13, lineHeight: 1.45, color: c.inkSoft }, children: [
          /* @__PURE__ */ jsx2("b", { style: { color: c.ink }, children: content.stats[0].label }),
          /* @__PURE__ */ jsx2("br", {}),
          content.hero.leadParagraph?.split(".")[0],
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 6, padding: "0 14px 18px" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { gridColumn: "1 / 2", gridRow: "1 / 3", borderRadius: r.photo, overflow: "hidden", aspectRatio: "1/1" }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsx2("div", { style: { borderRadius: r.photo, overflow: "hidden", aspectRatio: "1/1", background: c.bgAlt }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.gallery?.[0] ?? content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsx2("div", { style: { borderRadius: r.photo, overflow: "hidden", aspectRatio: "1/1", background: c.bgAlt }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.gallery?.[1] ?? content.hero.gallery?.[0] ?? content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "0 14px 22px", display: "flex", flexDirection: "column", gap: 7 }, children: [
      /* @__PURE__ */ jsxs2("a", { style: { background: c.invBg, color: c.invInk, padding: 15, borderRadius: r.btn, textAlign: "center", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", cursor: "pointer" }, children: [
        content.cta.primary.label,
        " \u2192"
      ] }),
      /* @__PURE__ */ jsxs2("a", { style: { padding: 12, border: `1px solid ${c.ink}`, borderRadius: r.btn, textAlign: "center", fontSize: 11, fontWeight: 500 }, children: [
        content.meta.reviewsN,
        " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \xB7 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C"
      ] })
    ] }),
    m && /* @__PURE__ */ jsxs2("section", { style: { background: c.invBg, color: c.invInk, padding: "20px 18px" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.invAccent, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 20, height: 1, background: c.invAccent } }),
        m.eyebrow
      ] }),
      m.items.slice(0, 2).map((it, i, arr) => /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "baseline", padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${c.invInkSoft}` : void 0 }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, lineHeight: 1.05 }, children: it.name }),
          it.desc && /* @__PURE__ */ jsx2("div", { style: { fontSize: 10, color: c.invInkSoft, marginTop: 3 }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 18, color: c.invAccent }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("footer", { style: { padding: 18, textAlign: "center", background: c.bg }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 18, marginBottom: 6 }, children: content.meta.brand }),
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkFaint, textTransform: "uppercase", letterSpacing: "0.08em" }, children: content.meta.address })
    ] })
  ] });
}
function SplitFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.menu;
  const heading = content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "");
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, display: "flex", flexDirection: "column", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 15, fontWeight: 700, letterSpacing: "-0.02em" }, children: [
        content.meta.brand,
        /* @__PURE__ */ jsx2("span", { style: { color: c.accent }, children: "." })
      ] }),
      /* @__PURE__ */ jsx2("a", { style: { background: c.accent, color: c.accentInk, padding: "7px 14px", borderRadius: r.btn, fontSize: 11, fontWeight: 600 }, children: content.cta.primary.label.split(" ")[0] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { style: { aspectRatio: "4/3", overflow: "hidden", borderRight: `1px solid ${c.line}` }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14, background: c.bgAlt }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: 8 }, children: content.meta.category }),
          /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 24, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }, children: heading })
        ] }),
        /* @__PURE__ */ jsx2("p", { style: { fontSize: 11, lineHeight: 1.5, color: c.inkSoft, margin: 0 }, children: content.hero.leadParagraph?.slice(0, 110) })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: c.invBg, color: c.invInk }, children: content.stats.map((s, i) => /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 10px", textAlign: "center", borderRight: i < content.stats.length - 1 ? `1px solid ${c.invInkSoft}` : void 0 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 22, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", color: c.invAccent, marginBottom: 4 }, children: [
        s.num,
        /* @__PURE__ */ jsx2("span", { style: { fontSize: 12 }, children: s.unit })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.75 }, children: s.label })
    ] }, i)) }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 14px", borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: c.accent, marginBottom: 8 }, children: "\u043A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C" }),
      /* @__PURE__ */ jsx2("h3", { style: { fontFamily: f.display, fontSize: 17, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }, children: content.quote.text.replace(/[«»"\[\]]/g, "") }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkSoft, marginTop: 8 }, children: [
        content.quote.authorName,
        " \xB7 ",
        content.quote.authorSource
      ] })
    ] }),
    m && /* @__PURE__ */ jsxs2("div", { style: { padding: "20px 14px", background: c.bgAlt, borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("h3", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14 }, children: m.eyebrow }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: m.items.slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: {
        background: i === 1 ? c.accent : c.bg,
        color: i === 1 ? c.accentInk : c.ink,
        border: `1px solid ${i === 1 ? c.accent : c.line}`,
        borderRadius: r.card,
        padding: 14,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12
      }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700 }, children: it.name }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 10, opacity: 0.8, marginTop: 2 }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 800, whiteSpace: "nowrap" }, children: it.price })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.mono, fontSize: 13, fontWeight: 500 }, children: content.cta.phone }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 10, color: c.inkSoft }, children: content.meta.address })
      ] }),
      /* @__PURE__ */ jsxs2("a", { style: { background: c.invBg, color: c.invInk, padding: "11px 16px", borderRadius: r.btn, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }, children: [
        content.cta.primary.label.split(" ")[0],
        " \u2192"
      ] })
    ] })
  ] });
}
function StackedFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.menu;
  const cardBox = { background: c.bgAlt, border: `1px solid ${c.line}`, borderRadius: r.card };
  const heading = content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "");
  return /* @__PURE__ */ jsxs2("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, display: "flex", flexDirection: "column", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em" }, children: content.meta.brand }),
      /* @__PURE__ */ jsx2("a", { style: { background: c.accent, color: c.accentInk, padding: "8px 14px", borderRadius: r.btn, fontSize: 12, fontWeight: 600 }, children: "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("section", { style: { padding: "18px 16px 20px" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: c.accentSoft, color: c.accent, borderRadius: 999, fontSize: 11, fontWeight: 500, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 6, height: 6, background: c.accent, borderRadius: "50%" } }),
        content.meta.category,
        " \xB7 ",
        content.meta.address.split(",").pop()?.trim()
      ] }),
      /* @__PURE__ */ jsx2("h1", { style: { fontFamily: f.display, fontSize: 27, fontWeight: v.displayWeight, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 10px" }, children: heading }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 13, lineHeight: 1.5, color: c.inkSoft, marginBottom: 14 }, children: content.hero.leadParagraph }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 10, fontSize: 12, color: c.inkSoft, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx2("b", { children: content.meta.rating }),
        /* @__PURE__ */ jsx2("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs2("span", { children: [
          content.meta.reviewsN,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] }),
        /* @__PURE__ */ jsx2("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs2("span", { children: [
          "\u0441 ",
          content.meta.since
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { borderRadius: r.photo, overflow: "hidden", aspectRatio: "16/10", marginBottom: 14 }, children: /* @__PURE__ */ jsx2("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
        /* @__PURE__ */ jsx2("a", { style: { background: c.accent, color: c.accentInk, padding: 14, borderRadius: r.btn, textAlign: "center", fontSize: 14, fontWeight: 600 }, children: content.cta.primary.label }),
        /* @__PURE__ */ jsx2("a", { style: { padding: 12, border: `1px solid ${c.line}`, borderRadius: r.btn, textAlign: "center", fontSize: 13 }, children: content.cta.phone })
      ] })
    ] }),
    m && /* @__PURE__ */ jsxs2("section", { style: { padding: "22px 16px", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx2("h3", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, letterSpacing: "-0.02em", marginBottom: 4 }, children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B" }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 11, color: c.inkSoft, marginBottom: 14 }, children: m.eyebrow }),
      /* @__PURE__ */ jsx2("div", { style: { ...cardBox, padding: 14 }, children: m.items.map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: i < m.items.length - 1 ? `1px solid ${c.line}` : void 0, gap: 12 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 2 }, children: it.name }),
          it.desc && /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, color: c.inkSoft }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }, children: it.price })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx2("section", { style: { padding: "18px 16px", borderTop: `1px solid ${c.line}` }, children: /* @__PURE__ */ jsxs2("div", { style: { background: c.accentSoft, borderRadius: r.card, padding: "14px 16px" }, children: [
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 13, lineHeight: 1.5, margin: 0, color: c.ink }, children: content.quote.text.replace(/\[\[|\]\]/g, "") }),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 10, color: c.inkSoft, marginTop: 8, display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ jsxs2("span", { children: [
          content.quote.authorName,
          " \xB7 ",
          content.quote.authorSource
        ] }),
        /* @__PURE__ */ jsx2("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" })
      ] })
    ] }) })
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
function MiniChrome({ host, children }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    overflow: "hidden",
    borderRadius: 12,
    border: `1px solid ${VT.lineSoft}`,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    height: "100%",
    background: VT.white,
    alignSelf: "flex-start"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "7px 10px",
      background: "#fff",
      borderBottom: `1px solid ${VT.line}`,
      flex: "0 0 auto"
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsxs2("span", { style: {
        marginLeft: 10,
        fontFamily: VT.font.mono,
        fontSize: 11,
        color: VT.inkFaint
      }, children: [
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
    photoSrc: EX_U("photo-1487412947147-5cebf100ffc2", 720),
    gallery: [EX_U("photo-1522335789203-aabd1fc54bc9", 480), EX_U("photo-1457972729786-0411a3b2b626", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u0441\u0440\u0435\u0434\u0430"
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
var samplePresets = [
  { preset: { themeId: "display-soft", familyId: "display" }, content: fixtureNailsAnna, tagline: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \xB7 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433" },
  { preset: { themeId: "bento-noir", familyId: "bento" }, content: fixtureAutoPark, tagline: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 \xB7 \u0421\u0430\u043C\u0430\u0440\u0430" },
  { preset: { themeId: "editorial-warm", familyId: "editorial" }, content: fixtureCoffeeLena, tagline: "\u041A\u043E\u0444\u0435\u0439\u043D\u044F \xB7 \u0412\u043E\u0440\u043E\u043D\u0435\u0436" },
  { preset: { themeId: "display-noir", familyId: "display" }, content: fixtureBarberFedor, tagline: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "split-product", familyId: "split" }, content: fixtureFitnessMetod, tagline: "\u041F\u0438\u043B\u0430\u0442\u0435\u0441 \xB7 \u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433" },
  { preset: { themeId: "display-ink", familyId: "display" }, content: fixtureTattooLine, tagline: "\u0422\u0430\u0442\u0443-\u0441\u0442\u0443\u0434\u0438\u044F \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "stacked-corporate", familyId: "stacked" }, content: fixtureLegalSitnikov, tagline: "\u042E\u0440.\u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "split-teal", familyId: "split" }, content: fixturePhotoMarta, tagline: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "stacked-cream", familyId: "stacked" }, content: fixtureBakeryDom, tagline: "\u041F\u0435\u043A\u0430\u0440\u043D\u044F \xB7 \u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433" },
  { preset: { themeId: "display-bold", familyId: "display" }, content: fixtureBrowsSochi, tagline: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B \xB7 \u0421\u043E\u0447\u0438" }
];

// src/landing/index.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
function sectionPad(mobile) {
  const v = mobile ? 20 : 80;
  return { paddingLeft: v, paddingRight: v, boxSizing: "border-box" };
}
function H2({ children, mobile, align = "center" }) {
  return /* @__PURE__ */ jsx3("h2", { style: {
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
  return /* @__PURE__ */ jsx3("p", { style: {
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
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx3("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx3("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx3("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx3("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("defs", { children: /* @__PURE__ */ jsxs3("linearGradient", { id: "iggr3a", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx3("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx3("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx3("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx3("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggr3a)" }),
      /* @__PURE__ */ jsx3("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx3("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "site",
    name: "\u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx3("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx3("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx3("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx3("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
function ChipStrip({
  mobile = false,
  label = "\u0421\u041E\u0411\u0418\u0420\u0410\u0415\u041C \u0418\u0417",
  items = SOURCE_ICONS,
  align
}) {
  const alignItems = (align ?? (mobile ? "start" : "center")) === "center" ? "center" : "flex-start";
  const justify = alignItems === "center" ? "center" : "flex-start";
  return /* @__PURE__ */ jsxs3("div", { style: {
    marginTop: mobile ? 22 : 36,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems
  }, children: [
    label && /* @__PURE__ */ jsx3("div", { style: {
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.12em",
      color: VT.inkFaint,
      fontWeight: 600
    }, children: label }),
    /* @__PURE__ */ jsx3("div", { style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      justifyContent: justify
    }, children: items.map((s) => /* @__PURE__ */ jsxs3("span", { style: {
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
  ] });
}
function HeroBlock({ mobile }) {
  return /* @__PURE__ */ jsx3("section", { id: "hero", style: { ...sectionPad(mobile), paddingTop: mobile ? 28 : 56, position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxs3("div", { style: {
    maxWidth: mobile ? "100%" : 1120,
    margin: "0 auto",
    textAlign: mobile ? "left" : "center"
  }, children: [
    /* @__PURE__ */ jsxs3("h1", { style: {
      fontSize: mobile ? "clamp(32px, 8.8vw, 44px)" : 76,
      lineHeight: mobile ? 1.06 : 1.04,
      fontWeight: 700,
      letterSpacing: "-0.035em",
      margin: 0,
      textWrap: "balance"
    }, children: [
      "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0437\u0430",
      " ",
      /* @__PURE__ */ jsxs3("span", { style: { position: "relative", color: VT.accent, whiteSpace: "nowrap" }, children: [
        "2 \u0447\u0430\u0441\u0430",
        !mobile && /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx3("br", {}),
      "\u0414\u0430\u043B\u044C\u0448\u0435\xA0\u043E\u043D ",
      /* @__PURE__ */ jsx3("span", { style: { color: VT.accent }, children: "\u0441\u0430\u043C \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043B\u0443\u0447\u0448\u0435" }),
      " \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E."
    ] }),
    /* @__PURE__ */ jsx3("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "20px 0 0" : "28px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "pretty"
    }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0432\u0435\u0434\u0451\u0442\u0435 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442, \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442." }),
    /* @__PURE__ */ jsx3("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "10px 0 0" : "12px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "pretty"
    }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438, \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0438 \u0444\u043E\u0442\u043E. \u0422\u0435\u043A\u0441\u0442\u044B \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u043C. \u041A\u043E\u0433\u0434\u0430 \u043F\u0440\u0438\u0434\u0443\u0442 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438, \u043D\u0430\u0447\u043D\u0451\u0442 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C, \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0434\u0438 \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A." }),
    /* @__PURE__ */ jsxs3("div", { className: "ss-hero-pill", style: {
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
      /* @__PURE__ */ jsxs3("div", { style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: mobile ? "12px 14px" : "0 18px",
        minWidth: 0
      }, children: [
        /* @__PURE__ */ jsx3(IconLink, {}),
        /* @__PURE__ */ jsx3("span", { style: {
          color: VT.inkFaint,
          fontSize: mobile ? 15 : 16,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, children: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" })
      ] }),
      /* @__PURE__ */ jsx3(Btn, { style: {
        padding: mobile ? "14px 20px" : "14px 26px",
        borderRadius: mobile ? 10 : 999
      }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: mobile ? 10 : 12,
      textAlign: mobile ? "left" : "center",
      fontFamily: VT.font.mono,
      fontSize: mobile ? 11.5 : 12.5,
      letterSpacing: "0.03em",
      color: VT.inkSoft,
      lineHeight: 1.45
    }, children: [
      "\u0422\u0430\u0440\u0438\u0444 \xAB\u0421\u0442\u0430\u0440\u0442\xBB \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430. \u041F\u043B\u0430\u0442\u043D\u044B\u0435 ",
      /* @__PURE__ */ jsx3("b", { style: { color: VT.accent }, children: "\u043E\u0442 690 \u20BD/\u043C\u0435\u0441" }),
      " \xB7 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430 \u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E"
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 14 : 18,
      textAlign: mobile ? "left" : "center"
    }, children: /* @__PURE__ */ jsxs3("a", { href: "#examples", style: {
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
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2193" })
    ] }) }),
    /* @__PURE__ */ jsx3(ChipStrip, { mobile })
  ] }) });
}
function ExamplesSection({ mobile }) {
  const showcase = samplePresets;
  const ExampleCard = ({
    item
  }) => {
    const [hover, setHover] = React2.useState(false);
    return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", width: "100%", minWidth: 0 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        minHeight: 28,
        minWidth: 0
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent, flex: "0 0 auto" } }),
        /* @__PURE__ */ jsx3("span", { style: {
          fontSize: mobile ? 14 : 15,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0
        }, children: item.tagline })
      ] }),
      /* @__PURE__ */ jsx3(
        "div",
        {
          onMouseEnter: () => !mobile && setHover(true),
          onMouseLeave: () => setHover(false),
          style: {
            display: "flex",
            borderRadius: 12,
            position: "relative",
            transform: hover ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hover ? "0 1px 2px rgba(40,28,18,0.04), 0 10px 24px -14px rgba(120,70,40,0.20), 0 4px 10px -8px rgba(40,28,18,0.08)" : "0 1px 2px rgba(40,28,18,0.03), 0 6px 16px -12px rgba(120,70,40,0.14), 0 2px 6px -6px rgba(40,28,18,0.05)",
            transition: "transform .22s cubic-bezier(0.22,0.61,0.36,1), box-shadow .22s ease"
          },
          children: /* @__PURE__ */ jsx3(MiniChrome, { host: item.content.meta.host, children: /* @__PURE__ */ jsx3(PresetRenderer, { preset: item.preset, content: item.content }) })
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxs3("section", { id: "examples", style: { ...sectionPad(mobile), marginTop: mobile ? 56 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u0412\u043E\u0442 \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx3(Sub, { mobile, children: "\u0421\u0442\u0438\u043B\u0438\u0441\u0442\u0438\u043A \u043C\u043D\u043E\u0433\u043E \u2014 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442 \u0435\u0451 \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442. \u0415\u0441\u043B\u0438 \u043D\u0435 \u0437\u0430\u0439\u0434\u0451\u0442 \u2014 \u043F\u043E\u043C\u0435\u043D\u044F\u0435\u0442\u0435 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A \u0438\u0437 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438." })
    ] }),
    /* @__PURE__ */ jsx3(ExamplesCarousel, { mobile, items: showcase, renderCard: (item) => /* @__PURE__ */ jsx3(ExampleCard, { item }) }),
    /* @__PURE__ */ jsx3(HowItPicks, { mobile }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: mobile ? 28 : 44, textAlign: "center" }, children: [
      /* @__PURE__ */ jsx3("a", { href: "#hero", style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "nowrap",
        background: VT.accent,
        color: "#fff",
        fontWeight: 700,
        padding: mobile ? "13px 22px" : "16px 32px",
        borderRadius: 999,
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.2,
        textDecoration: "none",
        boxShadow: "0 12px 28px -12px rgba(120,60,30,0.45)",
        maxWidth: "100%",
        boxSizing: "border-box"
      }, children: /* @__PURE__ */ jsx3("span", { children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439\xA0\u0436\u0435 \u0438\u0437\xA0\u043C\u043E\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\xA0\u2192" }) }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: 14,
        fontFamily: VT.font.mono,
        fontSize: 12,
        color: VT.inkFaint,
        letterSpacing: "0.02em"
      }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u0430\u043C \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u0442 \u0441\u0442\u0438\u043B\u044C \u2014 \u043F\u043E\u0442\u043E\u043C \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C" })
    ] })
  ] });
}
function ExamplesCarousel({
  mobile,
  items,
  renderCard
}) {
  const scrollerRef = React2.useRef(null);
  const wrapRef = React2.useRef(null);
  const [atStart, setAtStart] = React2.useState(true);
  const [atEnd, setAtEnd] = React2.useState(false);
  const [activeIdx, setActiveIdx] = React2.useState(0);
  const [hoverPrev, setHoverPrev] = React2.useState(false);
  const [hoverNext, setHoverNext] = React2.useState(false);
  const updateBounds = React2.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= maxScroll - 1);
    const firstChild = el.firstElementChild?.firstElementChild;
    const step = firstChild ? firstChild.getBoundingClientRect().width + 14 : el.clientWidth;
    const idx = Math.round(el.scrollLeft / step);
    const maxIdx = (el.firstElementChild?.childElementCount ?? 1) - 1;
    setActiveIdx(Math.max(0, Math.min(idx, maxIdx)));
  }, []);
  React2.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds);
    return () => {
      el.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
    };
  }, [updateBounds]);
  const scrollBy = (direction) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.max(280, el.clientWidth / 3);
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };
  const arrowStyle = (disabled, hovered, direction) => ({
    position: "absolute",
    top: "50%",
    [direction === -1 ? "left" : "right"]: -28,
    transform: `translateY(-50%) ${hovered && !disabled ? `translateX(${direction * 2}px) scale(1.05)` : ""}`.trim(),
    width: 56,
    height: 56,
    borderRadius: "50%",
    border: "none",
    background: VT.white,
    color: disabled ? VT.inkMuted : VT.ink,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: disabled ? "default" : "pointer",
    opacity: disabled ? 0 : 1,
    pointerEvents: disabled ? "none" : "auto",
    transition: "opacity .2s ease, transform .2s ease, box-shadow .2s ease",
    boxShadow: hovered && !disabled ? "0 16px 40px -12px rgba(120,60,30,0.30), 0 4px 12px -4px rgba(0,0,0,0.10)" : "0 8px 24px -8px rgba(120,60,30,0.20), 0 2px 6px -2px rgba(0,0,0,0.06)",
    padding: 0,
    fontFamily: "inherit",
    zIndex: 5
  });
  const ArrowIcon = ({ direction }) => /* @__PURE__ */ jsxs3(
    "svg",
    {
      width: "22",
      height: "22",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { transform: direction === -1 ? "scaleX(-1)" : void 0 },
      children: [
        /* @__PURE__ */ jsx3("path", { d: "M5 12 H19" }),
        /* @__PURE__ */ jsx3("path", { d: "M13 6 L19 12 L13 18" })
      ]
    }
  );
  return /* @__PURE__ */ jsxs3(
    "div",
    {
      ref: wrapRef,
      style: {
        position: "relative",
        marginTop: mobile ? 28 : 56,
        maxWidth: mobile ? "none" : 1344,
        marginLeft: mobile ? void 0 : "auto",
        marginRight: mobile ? void 0 : "auto"
      },
      children: [
        mobile && items.length > 1 && /* @__PURE__ */ jsx3("div", { style: {
          display: "flex",
          justifyContent: "center",
          gap: 7,
          marginBottom: 14
        }, children: items.map((_, i) => {
          const active = i === activeIdx;
          return /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              "aria-label": `\u0421\u043B\u0430\u0439\u0434 ${i + 1}`,
              onClick: () => {
                const el = scrollerRef.current;
                if (!el) return;
                const child = el.firstElementChild?.children[i];
                if (child) el.scrollTo({ left: child.offsetLeft - 20, behavior: "smooth" });
              },
              style: {
                width: active ? 20 : 7,
                height: 7,
                borderRadius: 999,
                background: active ? VT.accent : VT.line,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width .25s ease, background .25s ease"
              }
            },
            i
          );
        }) }),
        /* @__PURE__ */ jsxs3(
          "div",
          {
            ref: scrollerRef,
            style: {
              marginLeft: mobile ? -16 : 0,
              marginRight: mobile ? -16 : 0,
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: mobile ? 16 : 32,
              scrollbarWidth: "none",
              // Fade-out mask — soft edges that hint at off-screen content.
              // Mask is symmetric and toggled per-side via stops collapsing to 0px.
              // Left side fades only when scrolled away from start; right fades only when more content awaits.
              ["--ss-fade-w"]: mobile ? "44px" : "64px",
              ["--ss-fade-l"]: atStart ? "0px" : "var(--ss-fade-w)",
              ["--ss-fade-r"]: atEnd ? "0px" : "var(--ss-fade-w)",
              maskImage: "linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)",
              transition: "mask-image .25s ease, -webkit-mask-image .25s ease"
            },
            children: [
              /* @__PURE__ */ jsx3("style", { children: `.ss-preset-carousel::-webkit-scrollbar{display:none}` }),
              /* @__PURE__ */ jsx3("div", { className: "ss-preset-carousel", style: {
                display: "flex",
                gap: mobile ? 12 : 24,
                padding: mobile ? "0 56px 16px 16px" : "0 32px 16px",
                alignItems: "flex-start"
              }, children: items.map((item, i) => /* @__PURE__ */ jsx3("div", { style: {
                flex: mobile ? "0 0 94%" : "0 0 calc((100% - 80px) / 3)",
                scrollSnapAlign: "start",
                display: "flex",
                minWidth: 0
              }, children: renderCard(item, i) }, i)) })
            ]
          }
        ),
        !mobile && /* @__PURE__ */ jsxs3(Fragment2, { children: [
          /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043F\u0440\u0438\u043C\u0435\u0440",
              disabled: atStart,
              onClick: () => scrollBy(-1),
              onMouseEnter: () => setHoverPrev(true),
              onMouseLeave: () => setHoverPrev(false),
              style: arrowStyle(atStart, hoverPrev, -1),
              children: /* @__PURE__ */ jsx3(ArrowIcon, { direction: -1 })
            }
          ),
          /* @__PURE__ */ jsx3(
            "button",
            {
              type: "button",
              "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u0438\u043C\u0435\u0440",
              disabled: atEnd,
              onClick: () => scrollBy(1),
              onMouseEnter: () => setHoverNext(true),
              onMouseLeave: () => setHoverNext(false),
              style: arrowStyle(atEnd, hoverNext, 1),
              children: /* @__PURE__ */ jsx3(ArrowIcon, { direction: 1 })
            }
          )
        ] })
      ]
    }
  );
}
function HowItPicks({ mobile }) {
  const items = [
    {
      n: "01",
      title: "\u0415\u0441\u043B\u0438 \u0441\u0442\u0438\u043B\u044C \u0443\u0436\u0435 \u0435\u0441\u0442\u044C, \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442 \u0435\u0433\u043E",
      body: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0431\u0443\u043A\u043B\u0435\u0442, \u0432\u0438\u0437\u0438\u0442\u043A\u0443 \u0438\u043B\u0438 \u0432\u044B\u0432\u0435\u0441\u043A\u0443. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u0442 \u0448\u0440\u0438\u0444\u0442 \u0438 \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0435 \u0446\u0432\u0435\u0442\u0430, \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442 \u0442\u0430\u043A\u0438\u0435 \u0436\u0435. \u0412\u0430\u0448 \u0441\u0442\u0438\u043B\u044C \u043D\u0438\u043A\u0443\u0434\u0430 \u043D\u0435 \u0434\u0435\u043D\u0435\u0442\u0441\u044F.",
      demo: "swatches"
    },
    {
      n: "02",
      title: "\u0415\u0441\u043B\u0438 \u0441\u0442\u0438\u043B\u044F \u043D\u0435\u0442, \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u043C",
      body: "\u0426\u0432\u0435\u0442\u0430 \u0432\u043E\u0437\u044C\u043C\u0451\u0442 \u0441 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439: \u0443 \u0442\u0451\u043F\u043B\u043E\u0439 \u043A\u043E\u0444\u0435\u0439\u043D\u0438 \u2014 \u043C\u043E\u043B\u043E\u0447\u043D\u044B\u0435 \u0438 \u0442\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u043E\u0432\u044B\u0435, \u0443 \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430 \u043D\u0430 \u0440\u043E\u0437\u043E\u0432\u043E\u043C \u0444\u043E\u043D\u0435 \u2014 \u043F\u044B\u043B\u044C\u043D\u043E-\u0440\u043E\u0437\u043E\u0432\u044B\u0435 \u0438 \u0431\u043E\u0440\u0434\u043E. \u0428\u0440\u0438\u0444\u0442 \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u0442 \u043F\u043E\u0434 \u0442\u043E\u043D \u0442\u0435\u043A\u0441\u0442\u0430: \u0434\u043B\u044F \u043B\u0438\u0447\u043D\u043E\u0433\u043E, \u0430\u0432\u0442\u043E\u0440\u0441\u043A\u043E\u0433\u043E \u2014 \u043C\u044F\u0433\u043A\u0438\u0439 \u0441 \u0437\u0430\u0441\u0435\u0447\u043A\u0430\u043C\u0438, \u0434\u043B\u044F \u0441\u0443\u0445\u043E\u0433\u043E \u0438 \u0442\u043E\u0447\u043D\u043E\u0433\u043E \u2014 \u0441\u0442\u0440\u043E\u0433\u0438\u0439 \u0438 \u0440\u043E\u0432\u043D\u044B\u0439.",
      demo: "fonts"
    },
    {
      n: "03",
      title: "\u0420\u0430\u0441\u043A\u043B\u0430\u0434\u043A\u0443 \u0432\u044B\u0431\u0435\u0440\u0435\u0442 \u043F\u043E\u0434 \u0432\u0430\u0448 \u043A\u043E\u043D\u0442\u0435\u043D\u0442",
      body: "\u041C\u043D\u043E\u0433\u043E \u0446\u0438\u0444\u0440, \u0446\u0435\u043D \u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0439 \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0438\u0437 \u043F\u043B\u0438\u0442\u043E\u043A. \u041C\u0435\u043D\u044E, \u0438\u0441\u0442\u043E\u0440\u0438\u0438, \u043E\u0442\u0437\u044B\u0432\u044B \u2014 \u0440\u0430\u0437\u043B\u043E\u0436\u0438\u0442 \u043A\u0430\u043A \u0436\u0443\u0440\u043D\u0430\u043B. \u0423\u043F\u043E\u0440 \u043D\u0430 \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0443 \u2014 \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0444\u043E\u0442\u043E \u0432 \u0434\u0432\u0435 \u043A\u043E\u043B\u043E\u043D\u043A\u0438.",
      demo: "grids"
    },
    {
      n: "04",
      title: "\u041D\u0435 \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u043E\u0441\u044C \u2014 \u043F\u043E\u043C\u0435\u043D\u044F\u0435\u0442\u0435 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A",
      body: "\u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u043B\u0435\u0436\u0438\u0442 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0433\u043E\u0442\u043E\u0432\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439, \u0438 \u0441\u0430\u0439\u0442 \u043F\u0435\u0440\u0435\u0441\u0442\u0440\u043E\u0438\u0442\u0441\u044F \u0437\u0430 \u0441\u0435\u043A\u0443\u043D\u0434\u044B. \u0422\u0435\u043A\u0441\u0442\u044B \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0438 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u043D\u0430 \u043C\u0435\u0441\u0442\u0430\u0445.",
      demo: "switch"
    }
  ];
  const accent = VT.accent;
  const tray = (children) => /* @__PURE__ */ jsx3("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md,
    padding: "14px 16px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    minHeight: 56
  }, children });
  const Demo = ({ kind }) => {
    if (kind === "swatches") {
      const sets = [
        ["#FAF6F0", "#A8412E", "#211C17"],
        ["#0E0F10", "#C2D94A", "#9A9B98"],
        ["#F6E7E3", "#8C4A52", "#2A1820"]
      ];
      return tray(
        /* @__PURE__ */ jsx3(Fragment2, { children: sets.map((set, i) => /* @__PURE__ */ jsx3("div", { style: { display: "flex", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(40,28,18,0.08)" }, children: set.map((col, j) => /* @__PURE__ */ jsx3("span", { style: { width: 22, height: 30, background: col } }, j)) }, i)) })
      );
    }
    if (kind === "fonts") {
      return tray(
        /* @__PURE__ */ jsxs3(Fragment2, { children: [
          /* @__PURE__ */ jsx3("span", { style: { fontFamily: "'Fraunces', serif", fontSize: 22, fontStyle: "italic", color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx3("span", { style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx3("span", { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 19, color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx3("span", { style: { fontFamily: "'Instrument Serif', serif", fontSize: 23, color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx3("span", { style: { fontFamily: "'Inter', sans-serif", fontSize: 21, fontWeight: 700, color: VT.ink }, children: "\u0410\u0430" })
        ] })
      );
    }
    if (kind === "grids") {
      const cell = (style) => /* @__PURE__ */ jsx3("span", { style: { background: VT.accentSoft, borderRadius: 3, ...style } });
      const frame = { width: 52, height: 44, padding: 5, border: `1px solid ${VT.line}`, borderRadius: 7, background: VT.bg };
      return tray(
        /* @__PURE__ */ jsxs3(Fragment2, { children: [
          /* @__PURE__ */ jsxs3("div", { style: { ...frame, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 3 }, children: [
            cell({ gridColumn: "span 2" }),
            cell({}),
            cell({})
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { ...frame, display: "flex", flexDirection: "column", gap: 3 }, children: [
            cell({ height: 8 }),
            cell({ flex: 1 }),
            cell({ height: 5, width: "60%" })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: { ...frame, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }, children: [
            cell({}),
            cell({})
          ] })
        ] })
      );
    }
    return tray(
      /* @__PURE__ */ jsxs3(Fragment2, { children: [
        ["#A8412E", "#2D5B8E", "#356E60", "#8C4A52"].map((col, i) => /* @__PURE__ */ jsx3("span", { style: {
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: col,
          border: i === 0 ? `2px solid ${VT.ink}` : `2px solid transparent`,
          boxShadow: i === 0 ? `0 0 0 2px ${VT.white}, 0 0 0 3px ${VT.ink}` : "none"
        } }, i)),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, marginLeft: "auto" }, children: "\u2192 1 \u043A\u043B\u0438\u043A" })
      ] })
    );
  };
  return /* @__PURE__ */ jsxs3("div", { style: {
    marginTop: 0,
    maxWidth: 1100,
    marginLeft: "auto",
    marginRight: "auto",
    padding: mobile ? "24px 20px" : "40px 44px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.lg
  }, children: [
    /* @__PURE__ */ jsx3("h3", { style: {
      fontSize: mobile ? 22 : 28,
      fontWeight: 700,
      lineHeight: 1.12,
      letterSpacing: "-0.025em",
      color: VT.ink,
      marginBottom: 12,
      maxWidth: 720
    }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0434\u0438\u0437\u0430\u0439\u043D \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432, \u0430 \u043D\u0435 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0438\u0437 \u0448\u0430\u0431\u043B\u043E\u043D\u0430" }),
    /* @__PURE__ */ jsx3("p", { style: {
      fontSize: mobile ? 14 : 16,
      lineHeight: 1.5,
      color: VT.inkSoft,
      marginBottom: mobile ? 20 : 28,
      maxWidth: 680
    }, children: "\u0415\u0441\u043B\u0438 \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0443\u0436\u0435 \u0435\u0441\u0442\u044C, \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0435\u0433\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442. \u0415\u0441\u043B\u0438 \u043D\u0435\u0442, \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u043C \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E \u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u0432. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u0441\u0430\u0439\u0442 \u043A\u043E\u0444\u0435\u0439\u043D\u0438 \u043D\u0435 \u043F\u043E\u0445\u043E\u0436 \u043D\u0430 \u0441\u0430\u0439\u0442 \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441\u0430, \u0434\u0430\u0436\u0435 \u0435\u0441\u043B\u0438 \u043E\u0431\u0430 \u0441\u043E\u0431\u0440\u0430\u043D\u044B \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439." }),
    /* @__PURE__ */ jsx3("div", { style: {
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 14 : 18,
      alignItems: "stretch"
    }, children: items.map((it, i) => /* @__PURE__ */ jsxs3("div", { style: {
      background: VT.bg,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.lg,
      padding: mobile ? 22 : 28,
      display: "flex",
      flexDirection: "column"
    }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          fontFamily: VT.font.mono,
          fontSize: 13,
          fontWeight: 700,
          color: "#fff",
          background: accent,
          width: 32,
          height: 32,
          borderRadius: 9,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "0.02em",
          flex: "0 0 auto"
        }, children: it.n }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: mobile ? 18 : 19, fontWeight: 700, letterSpacing: "-0.015em", color: VT.ink, lineHeight: 1.2 }, children: it.title })
      ] }),
      /* @__PURE__ */ jsx3("p", { style: { fontSize: mobile ? 14.5 : 15, lineHeight: 1.55, color: VT.inkSoft, margin: 0 }, children: it.body }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: "auto", paddingTop: 18 }, children: /* @__PURE__ */ jsx3(Demo, { kind: it.demo }) })
    ] }, i)) })
  ] });
}
var CYCLE_STEPS = [
  {
    n: "01",
    title: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u0442",
    cadence: "\u043E\u0434\u0438\u043D \u0440\u0430\u0437",
    body: "\u041F\u043E\u043A\u0430\u0436\u0435\u0442\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u2014 \u0437\u0430 2 \u0447\u0430\u0441\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438, \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0438 \u0433\u0430\u043B\u0435\u0440\u0435\u0435\u0439 \u0440\u0430\u0431\u043E\u0442. \u0422\u0435\u043A\u0441\u0442\u044B \u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u043C.",
    palette: { bg: "oklch(0.95 0.05 40)", ink: "oklch(0.32 0.14 35)", dec: "oklch(0.86 0.10 40)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("path", { d: "M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3" }),
      /* @__PURE__ */ jsx3("path", { d: "M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3" })
    ] })
  },
  {
    n: "02",
    title: "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    body: "\u0420\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0437\u0430\u0433\u043B\u044F\u0434\u044B\u0432\u0430\u0435\u0442 \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041D\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u044B, \u043F\u043E\u0441\u0442\u044B \u0438\u043B\u0438 \u0444\u043E\u0442\u043E \u2014 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0451\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442. \u041E\u0442 \u0432\u0430\u0441 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.",
    palette: { bg: "oklch(0.94 0.06 95)", ink: "oklch(0.36 0.12 85)", dec: "oklch(0.84 0.12 90)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("path", { d: "M14 32 a18 18 0 0 1 30 -13" }),
      /* @__PURE__ */ jsx3("path", { d: "M44 12 L44 22 L34 22" }),
      /* @__PURE__ */ jsx3("path", { d: "M50 32 a18 18 0 0 1 -30 13" }),
      /* @__PURE__ */ jsx3("path", { d: "M20 52 L20 42 L30 42" })
    ] })
  },
  {
    n: "03",
    title: "\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C",
    body: "\u0421\u043C\u043E\u0442\u0440\u0438\u0442, \u043A\u0430\u043A \u0432\u0435\u0434\u0443\u0442 \u0441\u0435\u0431\u044F \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438: \u043A\u0442\u043E \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B, \u0434\u043E \u0447\u0435\u0433\u043E \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u043B, \u0433\u0434\u0435 \u0437\u0430\u043A\u0440\u044B\u043B \u0432\u043A\u043B\u0430\u0434\u043A\u0443. \u0421\u0447\u0438\u0442\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0438 \u043E\u0442\u043A\u0443\u0434\u0430 \u043E\u043D\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442.",
    palette: { bg: "oklch(0.94 0.05 200)", ink: "oklch(0.34 0.10 220)", dec: "oklch(0.82 0.08 210)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("path", { d: "M4 32 C 14 18, 50 18, 60 32" }),
      /* @__PURE__ */ jsx3("path", { d: "M4 32 C 14 46, 50 46, 60 32" }),
      /* @__PURE__ */ jsx3("circle", { cx: "32", cy: "32", r: "8" }),
      /* @__PURE__ */ jsx3("circle", { cx: "32", cy: "32", r: "3", fill: "currentColor" })
    ] })
  },
  {
    n: "04",
    title: "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
    body: "\u041A\u043E\u0433\u0434\u0430 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0431\u0440\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445, \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0434\u043E \u0442\u0440\u0451\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C, \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u0442\u044C \u0438\u043D\u0430\u0447\u0435 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B.",
    palette: { bg: "oklch(0.94 0.05 145)", ink: "oklch(0.32 0.11 145)", dec: "oklch(0.82 0.08 145)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("path", { d: "M12 14 L52 14 L52 44 L36 44 L28 54 L28 44 L12 44 Z" }),
      /* @__PURE__ */ jsx3("path", { d: "M22 26 L42 26 M22 34 L36 34" })
    ] })
  }
];
function CycleCard({ step, size = 240 }) {
  const p = step.palette;
  return /* @__PURE__ */ jsxs3("div", { style: {
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
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
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
      /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: p.ink,
          opacity: 0.7,
          fontWeight: 600
        }, children: step.n }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: 6,
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.06em",
      color: p.ink,
      opacity: 0.75,
      fontStyle: "italic"
    }, children: step.cadence }),
    /* @__PURE__ */ jsx3("p", { style: {
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
  return /* @__PURE__ */ jsxs3("div", { style: { position: "relative", width: "100%", maxWidth: W, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx3("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(4, ${cardW}px)`,
      columnGap: gap,
      alignItems: "stretch",
      position: "relative",
      zIndex: 1
    }, children: CYCLE_STEPS.map((step, i) => /* @__PURE__ */ jsxs3("div", { style: { position: "relative", display: "flex" }, children: [
      /* @__PURE__ */ jsx3(CycleCard, { step, size: cardW }),
      i < 3 && /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 56,
        right: -gap,
        width: gap,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: VT.accent
      }, children: /* @__PURE__ */ jsxs3("svg", { width: gap, height: "24", viewBox: `0 0 ${gap} 24`, fill: "none", children: [
        /* @__PURE__ */ jsx3(
          "path",
          {
            d: `M 2 12 L ${gap - 8} 12`,
            stroke: VT.accent,
            strokeWidth: "2.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx3(
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
    /* @__PURE__ */ jsxs3(
      "svg",
      {
        width: "100%",
        viewBox: `0 0 ${W} ${arcH + 60}`,
        preserveAspectRatio: "none",
        style: { display: "block", marginTop: -8, height: arcH + 60 },
        children: [
          /* @__PURE__ */ jsx3("defs", { children: /* @__PURE__ */ jsx3(
            "marker",
            {
              id: "v3retArr",
              viewBox: "0 0 10 10",
              refX: "8",
              refY: "5",
              markerWidth: "7",
              markerHeight: "7",
              orient: "auto-start-reverse",
              children: /* @__PURE__ */ jsx3("path", { d: "M0 0 L10 5 L0 10 z", fill: VT.accent })
            }
          ) }),
          /* @__PURE__ */ jsx3(
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
          /* @__PURE__ */ jsx3("foreignObject", { x: (cx(1) + cx(3)) / 2 - 130, y: arcH + 6, width: "260", height: "40", children: /* @__PURE__ */ jsx3("div", { xmlns: "http://www.w3.org/1999/xhtml", style: {
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
  return /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: CYCLE_STEPS.map((step, idx) => {
    const p = step.palette;
    const isLast = idx === CYCLE_STEPS.length - 1;
    return /* @__PURE__ */ jsxs3("div", { children: [
      /* @__PURE__ */ jsxs3("div", { style: {
        background: p.bg,
        border: `2px solid ${p.ink}`,
        borderRadius: 18,
        boxShadow: `4px 4px 0 0 ${p.ink}`,
        padding: 18,
        color: p.ink
      }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsx3("span", { style: {
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
          /* @__PURE__ */ jsxs3("div", { children: [
            /* @__PURE__ */ jsxs3("div", { style: {
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
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
          ] })
        ] }),
        /* @__PURE__ */ jsx3("p", { style: { margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.45, textWrap: "pretty" }, children: step.body })
      ] }),
      !isLast && /* @__PURE__ */ jsx3("div", { style: {
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
  return /* @__PURE__ */ jsxs3("section", { id: "cycle", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u042D\u0442\u043E \u043D\u0435 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u043E\u0434\u0438\u043D \u0440\u0430\u0437.",
        /* @__PURE__ */ jsx3("br", {}),
        "\u042D\u0442\u043E \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C."
      ] }),
      /* @__PURE__ */ jsx3(Sub, { mobile, maxWidth: 760, children: "\u041E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043B\u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u0414\u0430\u043B\u044C\u0448\u0435 \u043E\u043D \u0441\u0430\u043C \u0445\u043E\u0434\u0438\u0442 \u043F\u043E \u043A\u0440\u0443\u0433\u0443: \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442, \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u043D\u0430 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439, \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u043A \u0432\u0430\u043C \u0441 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438. \u0427\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B." })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: !mobile ? /* @__PURE__ */ jsx3(DesktopCycle, {}) : /* @__PURE__ */ jsx3(MobileCycle, {}) }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx3("p", { style: {
      fontSize: mobile ? 15 : 17,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty",
      fontStyle: "italic"
    }, children: "\u0421\u0430\u0439\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u043D\u0435 \u043A\u0430\u043A \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0444\u0430\u0439\u043B \u2014 \u044D\u0442\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u043E\u043D \u043D\u0435\u043C\u043D\u043E\u0433\u043E \u0434\u0440\u0443\u0433\u043E\u0439. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0447\u0443\u0442\u044C \u043B\u0443\u0447\u0448\u0435, \u0447\u0435\u043C \u0431\u044B\u043B." }) }),
    /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx3("a", { href: "#hero", style: {
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
      /* @__PURE__ */ jsxs3("span", { children: [
        "\u0417\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430 \u0441\u0430\u0439\u0442 \u0437\u0430\u0448\u043B\u0438 ",
        /* @__PURE__ */ jsx3("b", { children: "312 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ". ",
        /* @__PURE__ */ jsx3("b", { children: "224" }),
        " \u0437\u0430\u043A\u0440\u044B\u043B\u0438 \u0435\u0433\u043E, \u0434\u043E \u0443\u0441\u043B\u0443\u0433 \u0434\u0430\u0436\u0435 \u043D\u0435 \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u0432."
      ] }),
      /* @__PURE__ */ jsx3("span", { children: "\u0412 \u0432\u0430\u0448\u0438\u0445 \u043E\u0442\u0437\u044B\u0432\u0430\u0445 \u043B\u044E\u0434\u0438 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u043F\u0438\u0448\u0443\u0442: \xAB\u0432\u0441\u0451 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434 \u0442\u0435\u043C, \u043A\u0430\u043A \u0447\u0438\u043D\u0438\u0442\u044C\xBB \u0438 \xAB\u043D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u044B\u0432\u0430\u043B\u0438\xBB. \u0412\u043E\u0442 \u0432\u0430\u0448\u0430 \u0441\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u0430. \u0412 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 \u0435\u0451 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0442." })
    ],
    suggestion: /* @__PURE__ */ jsxs3(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx3("b", { children: "\xAB\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441, \u0433\u0434\u0435 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0442, \u043F\u043E\u0442\u043E\u043C \u0447\u0438\u043D\u044F\u0442\xBB" })
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
      /* @__PURE__ */ jsxs3("span", { children: [
        "\u0418\u0437 ",
        /* @__PURE__ */ jsx3("b", { children: "156 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ", \u043E\u0442\u043A\u0440\u044B\u0432\u0448\u0438\u0445 \u043C\u0435\u043D\u044E, ",
        /* @__PURE__ */ jsx3("b", { children: "98" }),
        " \u043D\u0430\u0436\u0430\u043B\u0438 \u043D\u0430 \xAB\u041A\u043E\u0444\u0435 \u0438 \u0434\u0435\u0441\u0435\u0440\u0442\u044B\xBB. \u041D\u0430 \xAB\u0417\u0430\u0432\u0442\u0440\u0430\u043A\u0438\xBB \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438 ",
        /* @__PURE__ */ jsx3("b", { children: "72" }),
        " \u0438 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx3("b", { children: "4" }),
        " \u0437\u0430\u043A\u0430\u0437\u0430\u043B\u0438."
      ] }),
      /* @__PURE__ */ jsx3("span", { children: "\u0423 \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u043E\u0432 \u043D\u0435\u0442 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0438 \u043D\u0435\u0442 \u0441\u043E\u0441\u0442\u0430\u0432\u0430. \u0422\u043E\u043B\u044C\u043A\u043E \u0446\u0435\u043D\u0430 \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435. \u0427\u0435\u043B\u043E\u0432\u0435\u043A \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442, \u0447\u0442\u043E \u0442\u0430\u043C \u0432 \u0441\u0435\u0442\u0435 \u0438 \u0441\u0442\u043E\u0438\u0442 \u043B\u0438 \u043E\u043D\u043E \u0442\u043E\u0433\u043E." })
    ],
    suggestion: /* @__PURE__ */ jsxs3(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C ",
      /* @__PURE__ */ jsx3("b", { children: "3\u20134 \u0444\u043E\u0442\u043E" }),
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
      /* @__PURE__ */ jsxs3("span", { children: [
        /* @__PURE__ */ jsx3("b", { children: "68%" }),
        " \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439 \u0434\u043E\u043B\u0438\u0441\u0442\u044B\u0432\u0430\u044E\u0442 \u0434\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u0438\u0434\u044F\u0442 \u043D\u0430 \u043D\u0438\u0445 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C ",
        /* @__PURE__ */ jsx3("b", { children: "22 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        ". \u0414\u043E \u0431\u043B\u043E\u043A\u0430 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx3("b", { children: "19%" }),
        ". \u041F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435 \u0443\u0445\u043E\u0434\u044F\u0442 \u0437\u0430 ",
        /* @__PURE__ */ jsx3("b", { children: "4 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        "."
      ] }),
      /* @__PURE__ */ jsx3("span", { children: "\u0421\u0435\u0439\u0447\u0430\u0441 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0438\u0434\u0451\u0442 \u0440\u0430\u043D\u044C\u0448\u0435 \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u044A\u0435\u0434\u0430\u0435\u0442 \u0438\u043C \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435." })
    ],
    suggestion: /* @__PURE__ */ jsxs3(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx3("b", { children: "\u043E\u0442\u0437\u044B\u0432\u044B \u043F\u043E\u0434\u043D\u044F\u0442\u044C \u0432\u044B\u0448\u0435" }),
      ", \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u043E \u0430\u0431\u0437\u0430\u0446\u0430 \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \u0432\u043D\u0438\u0437."
    ] }),
    actions: ["\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C, \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442", "\u041D\u0435 \u043D\u0430\u0434\u043E"]
  }
];
function MondayCard({ card, n, mobile }) {
  return /* @__PURE__ */ jsxs3("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 18px 36px -18px rgba(120,60,30,0.22)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }, children: [
    /* @__PURE__ */ jsxs3("div", { style: {
      padding: "12px 16px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
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
      /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 13, fontWeight: 700, color: VT.ink, lineHeight: 1.15 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.04em" }, children: "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \xB7 9:14" })
      ] }),
      /* @__PURE__ */ jsxs3("span", { style: {
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
    /* @__PURE__ */ jsxs3("div", { style: { padding: "18px 18px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: {
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
        /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: card.accent } }),
        /* @__PURE__ */ jsx3("span", { children: card.eyebrow }),
        /* @__PURE__ */ jsx3("span", { style: { marginLeft: "auto", fontStyle: "italic", fontWeight: 500, color: VT.inkFaint, letterSpacing: "0.02em" }, children: card.caseLabel })
      ] }),
      /* @__PURE__ */ jsx3("h3", { style: {
        fontSize: mobile ? 19 : 22,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        margin: 0,
        lineHeight: 1.2,
        color: VT.ink
      }, children: card.title }),
      card.body.map((p, i) => /* @__PURE__ */ jsx3("p", { style: {
        margin: 0,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: p }, i)),
      /* @__PURE__ */ jsxs3("div", { style: {
        marginTop: 4,
        padding: "12px 14px",
        background: card.accentBg,
        borderRadius: 12
      }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 10,
          letterSpacing: "0.12em",
          fontWeight: 700,
          opacity: 0.8,
          color: card.accent
        }, children: "\u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }),
        /* @__PURE__ */ jsx3("div", { style: {
          marginTop: 4,
          fontSize: mobile ? 14.5 : 15.5,
          lineHeight: 1.45,
          color: VT.ink
        }, children: card.suggestion })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: {
      padding: 10,
      borderTop: `1px solid ${VT.line}`,
      background: "#fff",
      display: "grid",
      gridTemplateColumns: `1fr auto auto`,
      gap: 6
    }, children: [
      /* @__PURE__ */ jsx3("button", { type: "button", style: {
        padding: "10px 14px",
        borderRadius: 10,
        border: "none",
        background: card.accent,
        color: "#fff",
        fontSize: 13.5,
        fontWeight: 600,
        cursor: "pointer"
      }, children: card.actions[0] }),
      /* @__PURE__ */ jsx3("button", { type: "button", style: {
        padding: "10px 12px",
        borderRadius: 10,
        background: "#fff",
        color: VT.ink,
        border: `1px solid ${VT.line}`,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer"
      }, children: card.actions[1] }),
      /* @__PURE__ */ jsx3("button", { type: "button", style: {
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
  return /* @__PURE__ */ jsxs3("section", { id: "monday", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u041F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u2014 \u0442\u0440\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F,",
        /* @__PURE__ */ jsx3("br", {}),
        "\u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435"
      ] }),
      /* @__PURE__ */ jsx3(Sub, { mobile, maxWidth: 820, children: "\u0412\u0441\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043C\u043E\u0442\u0440\u0438\u0442, \u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0443 \u0432\u0430\u0441 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u0412 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0440\u0430\u0437\u0431\u043E\u0440: \u0433\u0434\u0435 \u0447\u0442\u043E \u043F\u0440\u043E\u0441\u0435\u043B\u043E \u0438 \u0447\u0442\u043E \u0441 \u044D\u0442\u0438\u043C \u0434\u0435\u043B\u0430\u0442\u044C. \u041D\u0435 \u043E\u0431\u0449\u0438\u043C\u0438 \u0444\u0440\u0430\u0437\u0430\u043C\u0438 \u2014 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E." })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1280,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: mobile ? /* @__PURE__ */ jsxs3("div", { style: {
      marginLeft: -20,
      marginRight: -20,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      scrollSnapType: "x mandatory",
      scrollPaddingLeft: 20,
      scrollbarWidth: "none"
    }, children: [
      /* @__PURE__ */ jsx3("style", { children: `.ss-v3-monday::-webkit-scrollbar{display:none}` }),
      /* @__PURE__ */ jsx3("div", { className: "ss-v3-monday", style: {
        display: "flex",
        gap: 14,
        padding: "4px 20px 24px",
        alignItems: "stretch"
      }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx3("div", { style: { flex: "0 0 88%", scrollSnapAlign: "start", display: "flex" }, children: /* @__PURE__ */ jsx3(MondayCard, { card: c, n: i + 1, mobile }) }, i)) })
    ] }) : /* @__PURE__ */ jsx3("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      alignItems: "stretch"
    }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx3(MondayCard, { card: c, n: i + 1, mobile }, i)) }) }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx3("p", { style: {
      fontSize: mobile ? 14.5 : 16,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty"
    }, children: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u0430\u0432\u043E\u043A \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F. \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS." }) }),
    /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx3("a", { href: "#hero", style: {
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
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("rect", { x: "10", y: "14", width: "44", height: "36", rx: "5" }),
      /* @__PURE__ */ jsx3("path", { d: "M10 22 L32 36 L54 22" })
    ] })
  },
  {
    title: "\u041E\u0442\u0431\u0438\u0440\u0430\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u044B",
    body: "\u0427\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u041D\u0430 \u0441\u0430\u0439\u0442 \u0441\u0442\u0430\u0432\u0438\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445 \u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445. \u041F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043E\u0442\u0437\u044B\u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442 \u0441\u0430\u043C.",
    metric: "4\u20136",
    metricNote: "\u043B\u0443\u0447\u0448\u0438\u0445 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E",
    palette: { bg: "oklch(0.94 0.045 80)", ink: "oklch(0.42 0.13 70)", stroke: "oklch(0.86 0.08 80)" },
    icon: /* @__PURE__ */ jsx3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { d: "M32 8 L37 23 L53 23 L40 33 L45 49 L32 39 L19 49 L24 33 L11 23 L27 23 Z" }) })
  },
  {
    title: "\u041F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A",
    body: "\u0421\u0440\u0430\u0437\u0443 \u0432 \u0438\u043D\u0434\u0435\u043A\u0441\u0435 \u042F\u043D\u0434\u0435\u043A\u0441\u0430 \u0438 Google. \u0417\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435, \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u0434\u043B\u044F \u043A\u0430\u0440\u0442 \u0438 \u0441\u043D\u0438\u043F\u043F\u0435\u0442\u043E\u0432. \u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u0437 \u043A\u043E\u0440\u043E\u0431\u043A\u0438.",
    metric: "\u042F\u043D\u0434\u0435\u043A\u0441",
    metricNote: "+ Google",
    palette: { bg: "oklch(0.94 0.04 145)", ink: "oklch(0.40 0.11 145)", stroke: "oklch(0.86 0.07 145)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("circle", { cx: "27", cy: "27", r: "14" }),
      /* @__PURE__ */ jsx3("path", { d: "M38 38 L54 54" })
    ] })
  },
  {
    title: "\u041E\u0442\u0441\u0435\u043A\u0430\u0435\u0442 \u0441\u043F\u0430\u043C",
    body: "\u0410\u043D\u0442\u0438\u0431\u043E\u0442-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0436\u0438\u0432\u043E\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u043D\u0435 \u0437\u0430\u043C\u0435\u0447\u0430\u0435\u0442. \u0411\u043E\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u044E\u0442 \u0442\u0438\u0448\u0438\u043D\u0443. \u0414\u043E \u0432\u0430\u0441 \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438.",
    metric: "0",
    metricNote: "\u0431\u043E\u0442\u043E\u0432 \u0432 \u0437\u0430\u044F\u0432\u043A\u0430\u0445",
    palette: { bg: "oklch(0.94 0.04 270)", ink: "oklch(0.42 0.15 270)", stroke: "oklch(0.85 0.08 270)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "2.6", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx3("path", { d: "M32 8 L52 16 L52 32 C 52 44, 42 54, 32 56 C 22 54, 12 44, 12 32 L12 16 Z" }),
      /* @__PURE__ */ jsx3("path", { d: "M22 32 L29 39 L42 24" })
    ] })
  }
];
function BaseWorkSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "base", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx3(H2, { mobile, children: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u2014 \u0442\u043E\u0436\u0435 \u043D\u0430 \u043D\u0451\u043C" }),
      /* @__PURE__ */ jsx3(Sub, { mobile, maxWidth: 720, children: "\u042D\u0442\u043E \u0442\u043E, \u0447\u0442\u043E \u043D\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445 \u043D\u0430\u0434\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u0440\u0443\u043A\u0430\u043C\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0438\u0442\u044C SMM-\u0449\u0438\u043A\u0443. \u0417\u0434\u0435\u0441\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u0437 \u043A\u043E\u0440\u043E\u0431\u043A\u0438, \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0443\u0447\u0430\u0441\u0442\u0438\u044F." })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 14 : 22
    }, children: BASE_ITEMS.map((item, i) => {
      const pal = item.palette;
      return /* @__PURE__ */ jsxs3("div", { style: {
        position: "relative",
        background: VT.white,
        borderRadius: 20,
        border: `1px solid ${VT.line}`,
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 18px 40px -24px rgba(120,60,30,0.18)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ jsxs3("div", { style: {
          background: pal.bg,
          padding: mobile ? "22px 22px 18px" : "26px 28px 22px",
          borderBottom: `1px solid ${pal.stroke}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16
        }, children: [
          /* @__PURE__ */ jsx3("div", { style: {
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
          /* @__PURE__ */ jsxs3("div", { style: {
            textAlign: "right",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0
          }, children: [
            /* @__PURE__ */ jsx3("div", { style: {
              fontSize: mobile ? 26 : 34,
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 1,
              color: pal.ink
            }, children: item.metric }),
            /* @__PURE__ */ jsx3("div", { style: {
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
        /* @__PURE__ */ jsxs3("div", { style: {
          padding: mobile ? "18px 22px 22px" : "22px 28px 26px",
          display: "flex",
          flexDirection: "column",
          flex: 1
        }, children: [
          /* @__PURE__ */ jsx3("h3", { style: {
            fontSize: mobile ? 20 : 23,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: 0,
            lineHeight: 1.2,
            color: VT.ink
          }, children: item.title }),
          /* @__PURE__ */ jsx3("p", { style: {
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
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram-\u043A\u0430\u043D\u0430\u043B",
    pull: "\u043F\u043E\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx3("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    pull: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("defs", { children: /* @__PURE__ */ jsxs3("linearGradient", { id: "iggrC", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx3("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx3("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx3("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx3("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggrC)" }),
      /* @__PURE__ */ jsx3("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx3("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx3("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u043E\u0442\u0437\u044B\u0432\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx3("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx3("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "site",
    name: "\u0412\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    pull: "\u0442\u0435\u043A\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0443\u0441\u043B\u0443\u0433\u0438",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx3("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx3("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0424\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    pull: "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx3("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx3("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
var SOURCES_SOON = ["\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435", "Ozon", "YouTube"];
function SourcesSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "sources", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx3(H2, { mobile, children: "\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0432\u0441\u0451 \u0435\u0441\u0442\u044C \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx3(Sub, { mobile, maxWidth: 720, children: "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0432\u0441\u0451, \u0433\u0434\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435 \u0443\u0436\u0435 \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442 \u2014 \u0445\u0432\u0430\u0442\u0438\u0442 \u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430." })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 10 : 14
    }, children: SOURCES_LIST.map((s) => /* @__PURE__ */ jsxs3("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: mobile ? 14 : 18,
      padding: s.featured ? mobile ? "18px 18px" : "22px 24px" : mobile ? "14px 16px" : "18px 22px",
      background: VT.white,
      border: `1px solid ${s.featured ? VT.accent : VT.line}`,
      borderRadius: 14,
      position: "relative"
    }, children: [
      s.featured && /* @__PURE__ */ jsx3("span", { style: {
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
      /* @__PURE__ */ jsx3("span", { style: { flex: "0 0 auto" }, children: s.logo }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          fontSize: mobile ? 15.5 : 17,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.022em",
          lineHeight: 1.2
        }, children: s.name }),
        /* @__PURE__ */ jsxs3("div", { style: {
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
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: mobile ? 20 : 28,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 20 : 28}px auto 0`,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      justifyContent: mobile ? "flex-start" : "center"
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0421\u041A\u041E\u0420\u041E \u041F\u041E\u0414\u041A\u041B\u042E\u0427\u0418\u041C" }),
      SOURCES_SOON.map((n) => /* @__PURE__ */ jsx3("span", { style: {
        padding: "6px 14px",
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 13,
        color: VT.inkSoft,
        fontWeight: 500
      }, children: n }, n)),
      /* @__PURE__ */ jsx3("a", { style: {
        fontSize: 13.5,
        color: VT.accent,
        textDecoration: "underline",
        textUnderlineOffset: 4,
        marginLeft: mobile ? 0 : 6
      }, children: "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u2192" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: {
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
      /* @__PURE__ */ jsx3("span", { style: {
        flex: "0 0 auto",
        width: mobile ? 64 : 88,
        height: mobile ? 64 : 88
      }, children: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 88 88", width: "100%", height: "100%", children: [
        /* @__PURE__ */ jsx3("path", { d: "M44 4 C 24 4, 10 18, 10 38 C 10 60, 44 84, 44 84 C 44 84, 78 60, 78 38 C 78 18, 64 4, 44 4 Z", fill: "#FC3F1D" }),
        /* @__PURE__ */ jsx3("text", { x: "44", y: "48", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "32", fill: "#fff", children: "\u042F" })
      ] }) }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("h3", { style: {
          margin: 0,
          fontSize: mobile ? 21 : 26,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          color: VT.ink,
          textWrap: "balance"
        }, children: "\xAB\u0423 \u043C\u0435\u043D\u044F \u0436\u0435 \u0435\u0441\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445. \u0417\u0430\u0447\u0435\u043C \u043C\u043D\u0435 \u0435\u0449\u0451 \u0441\u0430\u0439\u0442?\xBB" }),
        /* @__PURE__ */ jsxs3("p", { style: {
          margin: "10px 0 0",
          fontSize: mobile ? 14.5 : 16,
          lineHeight: 1.5,
          color: VT.inkSoft,
          textWrap: "pretty"
        }, children: [
          "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u041A\u0430\u0440\u0442\u0430\u0445 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0432\u0430\u0441 \u0442\u0435\u043C, \u043A\u0442\u043E \u0438 \u0442\u0430\u043A \u0438\u0449\u0435\u0442 \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u0441. ",
          /* @__PURE__ */ jsx3("b", { style: { color: VT.ink }, children: "\u0421\u0430\u0439\u0442 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0438 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0448\u0438\u0440\u043E\u043A\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C" }),
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
    body: "\u0410\u0440\u0445\u0438\u0432 HTML \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \u2014 \u043F\u043E\u043A\u0430 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0430\u043A\u0442\u0438\u0432\u0435\u043D \u0438 \u0435\u0449\u0451 10 \u0434\u043D\u0435\u0439 \u043F\u043E\u0441\u043B\u0435 \u043E\u0442\u043A\u0430\u0437\u0430."
  },
  {
    title: "\u0423\u0434\u0430\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043E\u0434\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u0435.",
    body: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 \u0438 \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \xAB\u0434\u0430\u0439\u0442\u0435 \u043F\u043E\u0434\u0443\u043C\u0430\u0442\u044C\xBB."
  }
];
function OwnershipSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "ownership", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0434\u0435\u043B\u0430\u0435\u0442 \u0440\u0443\u0442\u0438\u043D\u0443.",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0420\u0435\u0448\u0435\u043D\u0438\u044F \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0437\u0430 \u0432\u0430\u043C\u0438"
      ] }),
      /* @__PURE__ */ jsx3(Sub, { mobile, maxWidth: 760, children: "\u0412\u0441\u0451, \u0447\u0442\u043E \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0418\u0418 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0435\u0440\u0435\u0437 \u0432\u0430\u0448\u0435 \xAB\u0434\u0430\xBB. \u0412\u0441\u0451, \u0447\u0442\u043E \u0441\u043E\u0431\u0440\u0430\u043B \u2014 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C. \u0417\u0430\u0445\u043E\u0442\u0435\u043B\u0438 \u0443\u0439\u0442\u0438 \u2014 \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u0438 \u0443\u0448\u043B\u0438." })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 980,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 10 : 14
    }, children: OWNER_POINTS.map((pt, i) => /* @__PURE__ */ jsxs3("div", { style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 14,
      padding: mobile ? "18px 18px" : "22px 24px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
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
      }, children: /* @__PURE__ */ jsx3("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12 l4 4 10 -10" }) }) }),
      /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          fontSize: mobile ? 15.5 : 16.5,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.015em",
          lineHeight: 1.3
        }, children: pt.title }),
        /* @__PURE__ */ jsx3("div", { style: {
          marginTop: 4,
          fontSize: mobile ? 14 : 15,
          lineHeight: 1.45,
          color: VT.inkSoft
        }, children: pt.body })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 22 : 30, textAlign: "center" }, children: /* @__PURE__ */ jsxs3("a", { href: "client-admin-demo.html", style: {
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
      /* @__PURE__ */ jsx3("span", { style: {
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
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2197" })
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
      text: /* @__PURE__ */ jsxs3(Fragment2, { children: [
        "\u0412 ",
        /* @__PURE__ */ jsx3("b", { children: "\u043F\u044F\u0442\u043D\u0438\u0446\u0443" }),
        " \u0437\u0430\u044F\u0432\u043E\u043A \u0432 \u0434\u0432\u0430 \u0440\u0430\u0437\u0430 \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0432 \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435. \u041F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u043F\u0440\u0438\u0432\u044B\u0447\u043A\u0443 \xAB\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u0435\u043B\u0430 \u043F\u0435\u0440\u0435\u0434 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u043C\u0438\xBB."
      ] })
    },
    {
      tag: "\u0420\u041E\u0421\u0422",
      tagColor: "oklch(0.50 0.13 145)",
      text: /* @__PURE__ */ jsxs3(Fragment2, { children: [
        "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430 ",
        /* @__PURE__ */ jsx3("b", { children: "+34%" }),
        " \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E. \u041F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u043E\u0434\u043D\u044F\u043B\u0438 \u0431\u043B\u043E\u043A \u043D\u0430\u0432\u0435\u0440\u0445 \u0433\u043B\u0430\u0432\u043D\u043E\u0439."
      ] })
    },
    {
      tag: "\u041F\u0420\u041E\u0412\u0410\u041B",
      tagColor: "oklch(0.50 0.16 270)",
      text: /* @__PURE__ */ jsxs3(Fragment2, { children: [
        "\xAB\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436\xBB \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442, \u043D\u043E ",
        /* @__PURE__ */ jsx3("b", { children: "\u043D\u0435 \u043D\u0430\u0436\u0438\u043C\u0430\u044E\u0442" }),
        ". \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043D\u0435\u0442 \u0446\u0435\u043D \u2014 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A."
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs3("section", { id: "analytics", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u0412\u0438\u0434\u0438\u0442\u0435 \u0440\u043E\u0432\u043D\u043E \u0442\u043E \u0436\u0435,",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0447\u0442\u043E \u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx3(Sub, { mobile, maxWidth: 760, children: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438, \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B\u0438, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u043B \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u0440\u0430\u0432\u043A\u0443 \u2014 \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u043D\u0435\u0434\u0435\u043B\u0435 \u0432\u0438\u0434\u0438\u0442\u0435, \u043A\u0430\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C \u0446\u0438\u0444\u0440\u044B." })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: {
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
      /* @__PURE__ */ jsxs3("div", { style: {
        padding: mobile ? "12px 16px" : "14px 22px",
        borderBottom: `1px solid ${VT.line}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: VT.bgSoft
      }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx3("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" } }),
          /* @__PURE__ */ jsx3("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" } }),
          /* @__PURE__ */ jsx3("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#28C840" } })
        ] }),
        /* @__PURE__ */ jsxs3("div", { style: {
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
          /* @__PURE__ */ jsxs3("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ jsx3("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
            /* @__PURE__ */ jsx3("path", { d: "M7 11 V7 a5 5 0 0 1 10 0 V11" })
          ] }),
          "app.samosite.online/analytics"
        ] }),
        /* @__PURE__ */ jsxs3("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.ink,
          fontWeight: 600
        }, children: [
          /* @__PURE__ */ jsx3("span", { style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "oklch(0.65 0.18 145)",
            boxShadow: "0 0 0 3px oklch(0.65 0.18 145 / 0.25)"
          } }),
          "LIVE"
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: {
        padding: mobile ? "12px 16px" : "14px 26px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        borderBottom: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: { fontSize: mobile ? 14 : 16, fontWeight: 700, letterSpacing: "-0.02em" }, children: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 Park \xB7 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" }),
        /* @__PURE__ */ jsx3("span", { style: { flex: 1 } }),
        ["7 \u0434\u043D\u0435\u0439", "30 \u0434\u043D\u0435\u0439", "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F"].map((p, i) => /* @__PURE__ */ jsx3("button", { type: "button", style: {
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
      /* @__PURE__ */ jsxs3("div", { style: { padding: mobile ? "18px 16px" : "24px 26px" }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          display: "grid",
          gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: mobile ? 10 : 14
        }, children: [
          { label: "\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439", value: "1 284", delta: "+18%" },
          { label: "\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u044B \u0443\u0441\u043B\u0443\u0433", value: "892", delta: "+24%" },
          { label: "\u0437\u0430\u044F\u0432\u043E\u043A", value: "47", delta: "+12%", accent: true },
          { label: "\u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F", value: "3.7%", delta: "+0.4 \u043F.\u043F." }
        ].map((k, i) => /* @__PURE__ */ jsxs3("div", { style: {
          padding: mobile ? 14 : 16,
          borderRadius: 12,
          background: k.accent ? VT.accentSoft : VT.bgSoft,
          border: `1px solid ${k.accent ? VT.accent : VT.line}`,
          position: "relative",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ jsx3("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: VT.inkFaint,
            fontWeight: 600,
            textTransform: "uppercase"
          }, children: k.label }),
          /* @__PURE__ */ jsx3("div", { style: {
            marginTop: 8,
            fontSize: mobile ? 26 : 32,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: VT.ink,
            lineHeight: 1,
            fontFamily: VT.font.mono
          }, children: k.value }),
          /* @__PURE__ */ jsxs3("div", { style: {
            marginTop: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11.5,
            color: "oklch(0.50 0.13 145)",
            fontWeight: 600
          }, children: [
            /* @__PURE__ */ jsx3("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { d: "M5 1 L9 7 L1 7 Z" }) }),
            k.delta,
            " ",
            /* @__PURE__ */ jsx3("span", { style: { color: VT.inkFaint, fontWeight: 500 }, children: "\u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E" })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxs3("div", { style: {
          marginTop: 18,
          padding: 18,
          borderRadius: 14,
          background: VT.bgSoft,
          border: `1px solid ${VT.line}`,
          position: "relative"
        }, children: [
          /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
            /* @__PURE__ */ jsx3("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u043E \u0434\u043D\u044F\u043C" }),
            /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: "\u043F\u043D \u2013 \u0432\u0441" }),
            /* @__PURE__ */ jsxs3("span", { style: { marginLeft: "auto", fontFamily: VT.font.mono, fontSize: 11, color: VT.inkSoft }, children: [
              "\u0432\u0441\u0435\u0433\u043E ",
              /* @__PURE__ */ jsx3("b", { style: { color: VT.ink }, children: "47" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: {
            marginTop: 22,
            position: "relative",
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            alignItems: "end",
            height: mobile ? 140 : 180
          }, children: [
            /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }, children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx3("div", { style: { borderTop: `1px dashed ${VT.line}` } }, i)) }),
            days.map((d, i) => /* @__PURE__ */ jsx3("div", { style: {
              height: `${d / max * 100}%`,
              background: i === peakIdx ? `linear-gradient(180deg, ${VT.accent}, oklch(0.50 0.16 35))` : "oklch(0.84 0.06 50)",
              borderRadius: "6px 6px 0 0",
              position: "relative",
              boxShadow: i === peakIdx ? "0 -2px 16px rgba(217, 119, 87, 0.4)" : "none"
            }, children: /* @__PURE__ */ jsx3("span", { style: {
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
          /* @__PURE__ */ jsx3("div", { style: {
            marginTop: 6,
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            color: VT.inkFaint,
            textAlign: "center",
            letterSpacing: "0.04em"
          }, children: dayLabels.map((l, i) => /* @__PURE__ */ jsx3("span", { style: {
            color: i === peakIdx ? VT.accentSoft : "inherit",
            fontWeight: i === peakIdx ? 700 : 500
          }, children: l }, l)) })
        ] }),
        /* @__PURE__ */ jsxs3("div", { style: {
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? 12 : 16
        }, children: [
          /* @__PURE__ */ jsxs3("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438" }),
            [
              ["\u042F\u043D\u0434\u0435\u043A\u0441", 48, "oklch(0.55 0.14 30)"],
              ["Google", 22, "oklch(0.48 0.13 240)"],
              ["\u041F\u0440\u044F\u043C\u044B\u0435 \u0437\u0430\u0445\u043E\u0434\u044B", 12, "oklch(0.50 0.12 145)"],
              ["\u0421\u043E\u0446\u0441\u0435\u0442\u0438", 11, "oklch(0.55 0.10 280)"],
              ["\u0414\u0440\u0443\u0433\u043E\u0435", 7, "oklch(0.60 0.04 60)"]
            ].map(([label, v, color]) => /* @__PURE__ */ jsxs3("div", { style: { marginBottom: 9 }, children: [
              /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", fontSize: 12.5 }, children: [
                /* @__PURE__ */ jsx3("span", { style: { color: VT.ink }, children: label }),
                /* @__PURE__ */ jsxs3("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600 }, children: [
                  v,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx3("div", { style: { marginTop: 5, height: 6, background: VT.line, borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ jsx3("div", { style: { width: `${v}%`, height: "100%", background: color } }) })
            ] }, label))
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u0421\u0430\u043C\u044B\u0435 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }),
            [
              ["\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430", 142, "+34%"],
              ["\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", 98, "+8%"],
              ["\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", 64, "+2%"],
              ["\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436", 41, "\u221212%"]
            ].map(([n, v, delta]) => /* @__PURE__ */ jsxs3("div", { style: {
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              padding: "8px 0",
              borderBottom: `1px dashed ${VT.line}`
            }, children: [
              /* @__PURE__ */ jsx3("span", { style: { color: VT.ink, fontSize: 13 }, children: n }),
              /* @__PURE__ */ jsx3("span", { style: {
                fontFamily: VT.font.mono,
                fontSize: 11,
                fontWeight: 600,
                color: String(delta).startsWith("+") ? "oklch(0.75 0.16 145)" : "oklch(0.70 0.14 30)"
              }, children: delta }),
              /* @__PURE__ */ jsx3("span", { style: { flex: 1 } }),
              /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600, fontSize: 13 }, children: v })
            ] }, n))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("p", { style: {
      marginTop: mobile ? 22 : 30,
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 22 : 30}px auto 0`,
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.5,
      color: VT.inkSoft,
      textAlign: "center",
      textWrap: "pretty"
    }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0442\u0443\u0434\u0430 \u0436\u0435, \u043A\u0443\u0434\u0430 \u0438 \u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS. \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E, \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u043C\u0438 \u043D\u0430\u0439\u0434\u0443\u0442 \u0432\u0430\u0441." }),
    /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 20 : 28, textAlign: "center" }, children: /* @__PURE__ */ jsxs3("a", { href: "client-admin-demo.html", style: {
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
      /* @__PURE__ */ jsx3("span", { style: {
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
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2197" })
    ] }) })
  ] });
}
var PLANS = ["\u0421\u0442\u0430\u0440\u0442", "\u041B\u0438\u0447\u043D\u044B\u0439", "\u0411\u0438\u0437\u043D\u0435\u0441", "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F", "\u0421\u0442\u0443\u0434\u0438\u044F"];
var PLAN_HILITE = -1;
var PRICING_MATRIX = [
  {
    rows: [
      { label: "\u0426\u0435\u043D\u0430 / \u043C\u0435\u0441", vals: ["0 \u20BD", "690 \u20BD", "1 490 \u20BD", "2 990 \u20BD", "6 990 \u20BD"] },
      { label: "\u0426\u0435\u043D\u0430 / \u0433\u043E\u0434", vals: ["0 \u20BD", "6 620 \u20BD", "14 300 \u20BD", "28 700 \u20BD", "67 100 \u20BD"] },
      { label: "\u0412\u044B\u0433\u043E\u0434\u0430 \u0433\u043E\u0434\u043E\u0432\u043E\u0433\u043E", vals: ["\u2014", "\u221220%", "\u221220%", "\u221220%", "\u221220%"] },
      { label: "\u0414\u043B\u044F \u043A\u043E\u0433\u043E", vals: ["\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C", "\u0421\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u044B\u0435, \u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B", "\u041C\u0430\u043B\u044B\u0439 \u0431\u0438\u0437\u043D\u0435\u0441, \u0444\u0440\u0438\u043B\u0430\u043D\u0441", "\u0418\u043D\u0444\u043E\u0431\u0438\u0437\u043D\u0435\u0441, \u043C\u0430\u043B\u044B\u0435 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430", "\u0421\u0442\u0443\u0434\u0438\u0438, \u0431\u0435\u043B\u044B\u0435 \u043C\u0435\u0442\u043A\u0438"] }
    ]
  },
  {
    title: "\u0421\u0430\u0439\u0442\u044B \u0438 \u0445\u043E\u0441\u0442\u0438\u043D\u0433",
    rows: [
      { label: "\u0421\u0430\u0439\u0442\u043E\u0432 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0435", vals: ["1", "1", "3", "10", "30"] },
      { label: "\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D", vals: [false, false, "3", "10", "30"] },
      { label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446 \u043D\u0430 \u0441\u0430\u0439\u0442", vals: ["3", "10", "50", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439"] },
      { label: "\u0425\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043C\u0435\u0434\u0438\u0430", vals: ["500 \u041C\u0411", "5 \u0413\u0411", "20 \u0413\u0411", "100 \u0413\u0411", "500 \u0413\u0411"] },
      { label: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 (SSL)", vals: [true, true, true, true, true] },
      { label: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0431\u0440\u0435\u043D\u0434\u0438\u043D\u0433\u0430 Samosite", vals: [false, true, true, true, true] }
    ]
  },
  {
    title: "\u0418\u0418-\u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 (\u0432 \u043C\u0435\u0441\u044F\u0446)",
    rows: [
      { label: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0441\u0430\u0439\u0442\u0430 \u0446\u0435\u043B\u0438\u043A\u043E\u043C", vals: ["1 (\u0440\u0430\u0437\u043E\u0432\u043E)", "2", "10", "40", "150"] },
      { label: "\u041F\u0435\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0431\u043B\u043E\u043A\u043E\u0432", vals: ["10", "30", "150", "600", "2 000"] },
      { label: "\u0410\u043D\u0430\u043B\u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432", vals: ["1", "5", "25", "100", "400"] },
      { label: "\u0418\u0418-\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 (\u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 / \u043A\u043E\u043D\u0442\u0435\u043D\u0442)", vals: [false, "10", "50", "200", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439*"] },
      { label: "\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0418\u0418-\u043C\u043E\u0434\u0435\u043B\u0438", vals: ["Yandex", "Claude", "Claude", "Claude", "Claude"] },
      { label: "\u041F\u0440\u0438 \u043F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u0438\u0438 \u043B\u0438\u043C\u0438\u0442\u0430", vals: ["\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0430", "\u0443\u043F\u0440\u043E\u0449\u0451\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "\u0443\u043F\u0440\u043E\u0449\u0451\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "\u0443\u043F\u0440\u043E\u0449\u0451\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "\u043C\u044F\u0433\u043A\u0438\u0439 \u043B\u0438\u043C\u0438\u0442"] }
    ]
  },
  {
    title: "\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438",
    rows: [
      { label: "\u0428\u0430\u0431\u043B\u043E\u043D\u044B", vals: ["\u0431\u0430\u0437\u043E\u0432\u044B\u0435", "\u0432\u0441\u0435", "\u0432\u0441\u0435", "\u0432\u0441\u0435 + \u043F\u0440\u0435\u043C\u0438\u0443\u043C", "\u0432\u0441\u0435 + \u043F\u0440\u0435\u043C\u0438\u0443\u043C"] },
      { label: "\u0424\u043E\u0440\u043C\u044B \u0438 \u0437\u0430\u044F\u0432\u043A\u0438", vals: ["1 \u0444\u043E\u0440\u043C\u0430", true, true, true, true] },
      { label: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430", vals: [false, "\u0431\u0430\u0437\u043E\u0432\u0430\u044F", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u0430\u044F", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u0430\u044F", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u0430\u044F"] },
      { label: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043A\u043E\u0434\u0430", vals: [false, false, false, true, true] },
      { label: "\u0420\u0430\u0431\u043E\u0442\u0430 \u043F\u043E\u0434 \u0431\u0440\u0435\u043D\u0434 \u043A\u043B\u0438\u0435\u043D\u0442\u0430", vals: [false, false, false, false, true] },
      { label: "\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F", vals: [false, false, "2 \u0447\u0435\u043B.", "5 \u0447\u0435\u043B.", "15 \u0447\u0435\u043B."] }
    ]
  },
  {
    title: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430",
    rows: [
      { label: "\u041A\u0430\u043D\u0430\u043B", vals: ["\u0431\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439", "\u0447\u0430\u0442", "\u0447\u0430\u0442", "\u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u044B\u0439 \u0447\u0430\u0442", "\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"] },
      { label: "\u0412\u0440\u0435\u043C\u044F \u043E\u0442\u0432\u0435\u0442\u0430", vals: ["\u2014", "24 \u0447", "12 \u0447", "4 \u0447", "1 \u0447"] }
    ]
  }
];
function MatrixCell({ v, hi }) {
  const base = {
    fontSize: 13.5,
    lineHeight: 1.35,
    color: VT.ink,
    textAlign: "center",
    fontVariantNumeric: "tabular-nums"
  };
  if (v === true) {
    return /* @__PURE__ */ jsx3("span", { style: { display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: VT.successSoft, color: VT.success, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx3("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12 l4 4 10 -10" }) }) });
  }
  if (v === false) {
    return /* @__PURE__ */ jsx3("span", { style: { color: VT.inkFaint, fontSize: 16 }, children: "\u2014" });
  }
  return /* @__PURE__ */ jsx3("span", { style: { ...base, fontWeight: hi ? 700 : 500, color: hi ? VT.ink : VT.inkSoft }, children: v });
}
function PricingMatrix({ mobile }) {
  const firstCol = mobile ? 132 : 240;
  const planCol = mobile ? 96 : 150;
  const totalW = firstCol + planCol * 5;
  const cellPad = mobile ? "10px 8px" : "12px 14px";
  return /* @__PURE__ */ jsxs3("div", { style: {
    marginTop: mobile ? 24 : 40,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    overflow: "hidden",
    background: VT.white,
    boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 18px 48px -28px rgba(120,60,30,0.20)"
  }, children: [
    /* @__PURE__ */ jsx3("div", { style: mobile ? { overflowX: "auto", WebkitOverflowScrolling: "touch" } : { overflow: "visible" }, children: /* @__PURE__ */ jsxs3("div", { style: { minWidth: mobile ? totalW : 0 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: {
        display: "grid",
        gridTemplateColumns: `${firstCol}px repeat(5, ${planCol}px)`,
        position: "sticky",
        top: 0,
        zIndex: 2,
        background: VT.white,
        borderBottom: `2px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsx3("div", { style: { padding: cellPad, position: "sticky", left: 0, background: VT.white, zIndex: 4 } }),
        PLANS.map((p, i) => /* @__PURE__ */ jsxs3("div", { style: {
          padding: cellPad,
          textAlign: "center",
          background: i === PLAN_HILITE ? VT.accentSoft : "transparent",
          borderTopLeftRadius: i === PLAN_HILITE ? 12 : 0,
          borderTopRightRadius: i === PLAN_HILITE ? 12 : 0
        }, children: [
          i === PLAN_HILITE && /* @__PURE__ */ jsx3("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            color: VT.accent,
            fontWeight: 700,
            marginBottom: 4,
            textTransform: "uppercase"
          }, children: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439" }),
          /* @__PURE__ */ jsx3("div", { style: {
            fontSize: mobile ? 15 : 17,
            fontWeight: 700,
            letterSpacing: "-0.015em",
            color: i === PLAN_HILITE ? VT.accent : VT.ink
          }, children: p })
        ] }, p))
      ] }),
      PRICING_MATRIX.map((group, gi) => /* @__PURE__ */ jsxs3("div", { children: [
        group.title && /* @__PURE__ */ jsx3("div", { style: {
          gridColumn: "1 / -1",
          padding: mobile ? "10px 10px" : "11px 14px",
          background: VT.bgSoft,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.1em",
          color: VT.inkFaint,
          fontWeight: 700,
          textTransform: "uppercase",
          borderTop: `1px solid ${VT.line}`,
          borderBottom: `1px solid ${VT.line}`
        }, children: group.title }),
        group.rows.map((row, ri) => {
          const isPriceMonth = gi === 0 && ri === 0;
          return /* @__PURE__ */ jsxs3("div", { style: {
            display: "grid",
            gridTemplateColumns: `${firstCol}px repeat(5, ${planCol}px)`,
            borderBottom: `1px solid ${VT.lineSoft}`,
            alignItems: "center"
          }, children: [
            /* @__PURE__ */ jsx3("div", { style: {
              padding: cellPad,
              fontSize: mobile ? 12 : 13.5,
              color: VT.ink,
              fontWeight: isPriceMonth ? 600 : 400,
              position: "sticky",
              left: 0,
              background: VT.white,
              zIndex: 3,
              borderRight: `1px solid ${VT.line}`,
              boxShadow: mobile ? "6px 0 8px -6px rgba(40,28,18,0.12)" : "none"
            }, children: row.label }),
            row.vals.map((v, ci) => /* @__PURE__ */ jsx3("div", { style: {
              padding: cellPad,
              textAlign: "center",
              background: ci === PLAN_HILITE ? VT.accentSoft : "transparent",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ jsx3(MatrixCell, { v, hi: isPriceMonth || ci === PLAN_HILITE }) }, ci))
          ] }, ri);
        })
      ] }, gi))
    ] }) }),
    mobile && /* @__PURE__ */ jsx3("div", { style: {
      padding: "10px 14px",
      textAlign: "center",
      fontSize: 12,
      color: VT.inkFaint,
      fontFamily: VT.font.mono,
      borderTop: `1px solid ${VT.line}`
    }, children: "\u2190 \u0442\u0430\u0431\u043B\u0438\u0446\u0430 \u043B\u0438\u0441\u0442\u0430\u0435\u0442\u0441\u044F \u0432\u0431\u043E\u043A \u2192" })
  ] });
}
function PricingSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "pricing", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx3(H2, { mobile, children: "\u0422\u0430\u0440\u0438\u0444 \u043F\u043E\u0434 \u0432\u0430\u0448 \u043C\u0430\u0441\u0448\u0442\u0430\u0431" }),
      /* @__PURE__ */ jsx3("p", { style: {
        margin: `${mobile ? 14 : 18}px auto 0`,
        maxWidth: 600,
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: "\u041E\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u0440\u0442\u0430 \u0434\u043E \u0441\u0442\u0443\u0434\u0438\u0439\u043D\u043E\u0433\u043E. \u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430 \u043B\u044E\u0431\u043E\u043C \u043F\u043B\u0430\u0442\u043D\u043E\u043C \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E." })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { maxWidth: 1100, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx3(PricingMatrix, { mobile }),
      /* @__PURE__ */ jsxs3("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: [
        /* @__PURE__ */ jsx3(Btn, { style: {
          padding: mobile ? "14px 26px" : "16px 36px",
          fontSize: mobile ? 15 : 16
        }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
        /* @__PURE__ */ jsx3("div", { style: {
          marginTop: 12,
          fontSize: 12.5,
          color: VT.inkSoft,
          fontStyle: "italic"
        }, children: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0442\u0430\u0440\u0438\u0444\u0435 \u2014 \u043E\u043F\u043B\u0430\u0442\u0443 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u043E\u0442\u043E\u043C, \u0435\u0441\u043B\u0438 \u0440\u0435\u0448\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0438." })
      ] }),
      /* @__PURE__ */ jsx3("p", { style: {
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
  return /* @__PURE__ */ jsxs3("details", { open: defaultOpen, style: {
    background: VT.white,
    border: `1px solid ${highlight ? VT.accent : VT.line}`,
    borderRadius: 14,
    padding: 0,
    overflow: "hidden",
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsxs3("summary", { style: {
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
      /* @__PURE__ */ jsx3("style", { children: `details > summary::-webkit-details-marker { display: none; }` }),
      /* @__PURE__ */ jsx3("span", { style: { flex: 1 }, children: q }),
      /* @__PURE__ */ jsx3("span", { style: {
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
    /* @__PURE__ */ jsx3("div", { style: {
      padding: mobile ? "0 18px 16px" : "0 22px 20px",
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.55,
      color: VT.inkSoft,
      textWrap: "pretty"
    }, children: a })
  ] });
}
function FaqSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "faq", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsx3("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx3(H2, { mobile, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0445\u043E\u0442\u044F\u0442 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 860,
      margin: `${mobile ? 28 : 48}px auto 0`
    }, children: [
      /* @__PURE__ */ jsxs3("div", { style: {
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
        /* @__PURE__ */ jsx3("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
        "\u041F\u0420\u041E \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u042B\u0415 \u0420\u0415\u041A\u041E\u041C\u0415\u041D\u0414\u0410\u0426\u0418\u0418"
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_NEW.map((f, i) => /* @__PURE__ */ jsx3(FaqItem, { q: f.q, a: f.a, defaultOpen: i === 0, mobile, highlight: true }, f.q)) }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: 28,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600,
        marginBottom: 12
      }, children: "\u041E\u0421\u0422\u0410\u041B\u042C\u041D\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_REST.map((f) => /* @__PURE__ */ jsx3(FaqItem, { q: f.q, a: f.a, mobile }, f.q)) })
    ] })
  ] });
}
function FinalCtaSection({ mobile }) {
  const ladder = [
    { when: "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430", what: "\u0443 \u0432\u0430\u0441 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E", what: "\u043F\u043E\u0434\u0442\u044F\u043D\u0435\u0442 \u0441\u0432\u0435\u0436\u0438\u0435 \u043F\u043E\u0441\u0442\u044B, \u0446\u0435\u043D\u044B \u0438 \u0444\u043E\u0442\u043E \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446", what: "\u043D\u0430\u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u2014 \u0438 \u043D\u0430\u0447\u043D\u0451\u0442 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C, \u0447\u0442\u043E \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C" }
  ];
  return /* @__PURE__ */ jsx3("section", { id: "cta", style: {
    ...sectionPad(mobile),
    marginTop: mobile ? 64 : 130,
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1360,
    margin: `${mobile ? 64 : 130}px auto 0`
  }, children: /* @__PURE__ */ jsxs3("div", { style: {
    background: "oklch(0.20 0.020 60)",
    color: VT.bg,
    borderRadius: mobile ? 22 : 28,
    padding: mobile ? "36px 22px" : "72px 64px",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
      position: "absolute",
      right: -140,
      top: -120,
      width: 420,
      height: 420,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${VT.accent} 0%, transparent 60%)`,
      opacity: 0.4
    } }),
    /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
      position: "absolute",
      left: -100,
      bottom: -120,
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: `radial-gradient(circle, oklch(0.6 0.10 50) 0%, transparent 65%)`,
      opacity: 0.3
    } }),
    /* @__PURE__ */ jsxs3("div", { style: { position: "relative", maxWidth: 920, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3("h2", { style: {
        fontSize: mobile ? 28 : 50,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        margin: 0,
        lineHeight: 1.08,
        textWrap: "balance"
      }, children: [
        "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u2014 \u0441\u0430\u0439\u0442.",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0441\u0430\u043C\u0438",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0431\u044B \u043D\u0435 \u0434\u043E\u0433\u0430\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C."
      ] }),
      /* @__PURE__ */ jsx3("p", { style: {
        fontSize: mobile ? 16 : 19,
        lineHeight: 1.5,
        color: "oklch(0.85 0.014 60)",
        margin: `${mobile ? 16 : 22}px auto 0`,
        maxWidth: 720,
        textWrap: "pretty"
      }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u0435\u0434\u0451\u0442\u0435 \u0441\u0432\u043E\u0438 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0418\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442. \u0414\u0430\u043B\u044C\u0448\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442." }),
      /* @__PURE__ */ jsxs3("p", { style: {
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.5,
        color: "oklch(0.92 0.012 60)",
        margin: `${mobile ? 12 : 14}px auto 0`,
        maxWidth: 720,
        textWrap: "pretty",
        fontWeight: 500
      }, children: [
        "\u0422\u0430\u0440\u0438\u0444 \xAB\u0421\u0442\u0430\u0440\u0442\xBB \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430. \u041D\u0430 \u043F\u043B\u0430\u0442\u043D\u044B\u0445 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u0434\u0430\u043B\u044C\u0448\u0435 ",
        /* @__PURE__ */ jsx3("b", { style: { color: VT.accentSoft }, children: "\u043E\u0442 690 \u20BD \u0432 \u043C\u0435\u0441\u044F\u0446" }),
        "."
      ] }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: mobile ? 26 : 36,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
        gap: mobile ? 10 : 14,
        textAlign: "left",
        maxWidth: 880,
        margin: `${mobile ? 26 : 36}px auto 0`,
        position: "relative"
      }, children: ladder.map((rung, i) => /* @__PURE__ */ jsxs3("div", { style: {
        padding: mobile ? "16px 16px" : "20px 20px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsxs3("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.12em",
          color: VT.accentSoft,
          fontWeight: 700
        }, children: [
          /* @__PURE__ */ jsx3("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
          "\u0428\u0410\u0413 ",
          i + 1
        ] }),
        /* @__PURE__ */ jsx3("div", { style: {
          fontSize: mobile ? 18 : 21,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.025em",
          lineHeight: 1.15
        }, children: rung.when }),
        /* @__PURE__ */ jsx3("div", { style: {
          fontSize: mobile ? 14 : 14.5,
          color: "oklch(0.85 0.014 60)",
          lineHeight: 1.4,
          textWrap: "pretty"
        }, children: rung.what })
      ] }, i)) }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 28 : 36, display: "inline-flex" }, children: /* @__PURE__ */ jsx3(Btn, { iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), style: {
        padding: mobile ? "14px 24px" : "18px 32px",
        fontSize: mobile ? 16 : 18
      }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }) }),
      /* @__PURE__ */ jsxs3("div", { style: {
        marginTop: mobile ? 20 : 26,
        paddingTop: mobile ? 16 : 22,
        borderTop: "1px solid rgba(255,255,255,0.10)",
        fontSize: mobile ? 13.5 : 14.5,
        color: "oklch(0.82 0.014 60)"
      }, children: [
        "\u041E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B? ",
        /* @__PURE__ */ jsx3("a", { style: {
          color: VT.accentSoft,
          textDecoration: "underline",
          textUnderlineOffset: 3
        }, children: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u2192" })
      ] })
    ] })
  ] }) });
}
function StickyHeader({ mobile = false }) {
  const px = mobile ? 20 : "clamp(24px, 4vw, 80px)";
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
    border: "none",
    whiteSpace: "nowrap",
    flex: "0 0 auto"
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
    border: "none",
    whiteSpace: "nowrap",
    flex: "0 0 auto"
  };
  const primaryLabel = mobile ? "\u0421\u043E\u0431\u0440\u0430\u0442\u044C" : "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0437\u0430 2 \u0447\u0430\u0441\u0430";
  return /* @__PURE__ */ jsxs3("div", { className: "ss-sticky-header", style: {
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
    /* @__PURE__ */ jsx3("style", { children: `
        .ss-sticky-header a.ss-nav-link { color: ${VT.inkSoft}; text-decoration: none; padding: 6px 2px; transition: color .15s ease; }
        .ss-sticky-header a.ss-nav-link:hover { color: ${VT.ink}; }
        .ss-sticky-header a.ss-login-link { color: ${VT.inkSoft}; text-decoration: none; border-radius: 999px; }
        .ss-sticky-header a.ss-login-link:hover { color: ${VT.ink}; background: ${VT.bgSoft}; }
      ` }),
    /* @__PURE__ */ jsxs3("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }, children: [
      /* @__PURE__ */ jsx3("a", { href: "#hero", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx3(BrandMark, { size: mobile ? 22 : 26, fontSize: mobile ? 18 : 20 }) }),
      !mobile ? /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: "clamp(12px, 1.6vw, 24px)", fontSize: 14, flexWrap: "nowrap", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("a", { href: "#examples", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" }),
        /* @__PURE__ */ jsx3("a", { href: "#pricing", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u0426\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx3("a", { href: "#faq", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u041F\u043E\u043C\u043E\u0449\u044C" }),
        /* @__PURE__ */ jsx3("a", { href: "#login", className: "ss-login-link", style: {
          fontWeight: 500,
          fontSize: 14,
          padding: "8px 16px",
          whiteSpace: "nowrap"
        }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs3("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] }) : /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx3("a", { href: "#login", className: "ss-login-link", style: { fontWeight: 500, fontSize: 13.5, padding: "8px 12px" }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs3("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] })
    ] })
  ] });
}
function Footer({ mobile }) {
  return /* @__PURE__ */ jsxs3("div", { style: {
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
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx3(BrandMark, { size: 20, fontSize: 15, color: VT.inkSoft }),
      /* @__PURE__ */ jsxs3("span", { children: [
        "\xA9 2026 \xB7 ",
        BRAND.domain,
        " \xB7 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u0424"
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx3("a", { style: { color: "inherit" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
      /* @__PURE__ */ jsx3("a", { style: { color: "inherit" }, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
      /* @__PURE__ */ jsx3("a", { style: { color: "inherit" }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" })
    ] })
  ] });
}
function SamosaytLandingV3({ mobile = false }) {
  const rootRef = React2.useRef(null);
  React2.useEffect(() => {
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
  return /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx3("style", { children: `
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
    /* @__PURE__ */ jsxs3("div", { ref: rootRef, className: "ss-v3-root", style: {
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
      /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx3(StickyHeader, { mobile }),
      /* @__PURE__ */ jsx3(HeroBlock, { mobile }),
      /* @__PURE__ */ jsx3(ExamplesSection, { mobile }),
      /* @__PURE__ */ jsx3(CycleSection, { mobile }),
      /* @__PURE__ */ jsx3(MondaySection, { mobile }),
      /* @__PURE__ */ jsx3(BaseWorkSection, { mobile }),
      /* @__PURE__ */ jsx3(SourcesSection, { mobile }),
      /* @__PURE__ */ jsx3(OwnershipSection, { mobile }),
      /* @__PURE__ */ jsx3(AnalyticsSection, { mobile }),
      /* @__PURE__ */ jsx3(PricingSection, { mobile }),
      /* @__PURE__ */ jsx3(FaqSection, { mobile }),
      /* @__PURE__ */ jsx3(FinalCtaSection, { mobile }),
      /* @__PURE__ */ jsx3(Footer, { mobile })
    ] })
  ] });
}
function SamosaytLandingV3_Desktop() {
  return /* @__PURE__ */ jsx3(SamosaytLandingV3, { mobile: false });
}
function SamosaytLandingV3_Mobile() {
  return /* @__PURE__ */ jsx3(SamosaytLandingV3, { mobile: true });
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
  ChipStrip,
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
  SOURCE_ICONS,
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