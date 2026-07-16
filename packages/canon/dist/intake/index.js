"use client";

// src/tokens.ts
var VT = {
  // Surfaces — тёплый фарфор
  bg: "#F2EEE6",
  // bone — фон страницы
  bgSoft: "#ECE5D9",
  // мягкая заливка секций
  white: "#FBF9F4",
  // paper — карточки/поверхности (тёплый белый)
  paper: "#FBF9F4",
  // алиас paper
  // Ink — тёплый near-black
  ink: "#1B1712",
  inkSoft: "#4C463C",
  // ink-70 — вторичный текст, лиды
  inkFaint: "#6E675A",
  // ink-45 — mono-подписи, плейсхолдеры (≥4.5:1 на bone)
  inkMuted: "#8A8173",
  // ещё светлее — декоративные подписи
  // Lines
  line: "#E5DFD3",
  // волосяная
  lineSoft: "#EFEAE0",
  // едва заметная
  lineStrong: "#D6CEBE",
  // line-2 — сильнее (НОВЫЙ токен, из :root)
  // Accent — бордо («лак»)
  accent: "#7A2B34",
  accentHover: "#631F27",
  // accent-dk
  accentSoft: "#F1E4E5",
  // мягкая винная заливка (тон accent, светлый)
  accentInk: "#631F27",
  // винный для текста на светлом
  onAccent: "#FBF9F4",
  // текст на бордо (НОВЫЙ токен, = paper)
  // Тёмные экраны (финал + футер) — акцент на тёмном отдельный (бордо на тёмном не читается)
  dark: "#1B1712",
  // НОВЫЙ
  darkSoft: "#B4AA9A",
  // dark-70 — текст на тёмном (НОВЫЙ)
  accentOnDark: "#E0A9A0",
  // светло-розовый акцент на тёмном (НОВЫЙ)
  // Semantic (утилитарные — не входят в ребренд палитры)
  success: "oklch(0.58 0.13 145)",
  successSoft: "oklch(0.93 0.05 145)",
  info: "oklch(0.62 0.10 240)",
  infoSoft: "oklch(0.93 0.035 240)",
  warn: "oklch(0.66 0.14 70)",
  warnSoft: "oklch(0.94 0.06 80)",
  danger: "oklch(0.55 0.18 28)",
  dangerSoft: "oklch(0.93 0.055 28)",
  // ЖЕЛЕЗНОЕ ПРАВИЛО: нулевые скругления и отсутствие теней — глобально, из токенов
  r: { sm: 0, md: 0, lg: 0, xl: 0, pill: 0 },
  shadow: {
    card: "none",
    pop: "none"
  },
  font: {
    display: "'Sofia Sans Condensed', system-ui, -apple-system, sans-serif",
    // H1/H2/H3, номера, логотип — 700/800 (НОВЫЙ)
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
    onAccent: VT.onAccent,
    ink: VT.ink,
    inkSoft: VT.inkSoft,
    inkFaint: VT.inkFaint,
    inkMuted: VT.inkMuted,
    line: VT.line,
    lineSoft: VT.lineSoft,
    lineStrong: VT.lineStrong,
    bg: VT.bg,
    bgSoft: VT.bgSoft,
    white: VT.white,
    paper: VT.paper,
    dark: VT.dark,
    darkSoft: VT.darkSoft,
    accentOnDark: VT.accentOnDark,
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
  // ЖЕЛЕЗНОЕ ПРАВИЛО: все радиусы = 0
  radius: { sm: 0, md: 0, lg: 0, xl: 0, "2xl": 0, full: 0 }
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

// src/intake/in2.tsx
import React2, { useState, useEffect, useRef } from "react";
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var In2_CSS = ".in2{--bone:#F2EEE6;--paper:#FBF9F4;--ink:#1B1712;--ink-70:#4C463C;--ink-45:#6E675A;--line:#E5DFD3;--line-2:#D6CEBE;--accent:#7A2B34;--accent-dk:#631F27;--on-accent:#FBF9F4;--display:'Sofia Sans Condensed',system-ui,sans-serif;--text:'Onest',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;}.in2 *{box-sizing:border-box;border-radius:0;box-shadow:none;}.in2 button{font-family:inherit;}.in2 .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:52px;padding:0 24px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;border:none;cursor:pointer;transition:background .16s;}.in2 .btn:hover:not(:disabled){background:var(--accent-dk);}.in2 .btn .arw{display:inline-block;transition:transform .16s;}.in2 .btn:hover:not(:disabled) .arw{transform:translateX(4px);}.in2 .btn--block{display:flex;width:100%;}.in2 .btn--sec{background:transparent;color:var(--ink);border:1px solid var(--line-2);}.in2 .btn--sec:hover:not(:disabled){background:var(--ink);color:var(--paper);border-color:var(--ink);}.in2 .chip{display:inline-flex;align-items:center;height:38px;padding:0 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:600;line-height:1;cursor:pointer;transition:background .14s,border-color .14s;}.in2 .chip:hover{border-color:var(--ink-45);}.in2 .chip.is-active{background:var(--accent);border-color:var(--accent);color:var(--paper);font-weight:700;}.in2 .chip--other{border-style:dashed;}.in2 .tlink{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);background:none;border:none;cursor:pointer;text-decoration:none;font:inherit;line-height:inherit;}.in2 .tlink .u{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;}.in2 .tlink .arw{display:inline-block;transition:transform .16s;}.in2 .tlink:hover .arw{transform:translateX(3px);}.in2 .ss-iconbtn{width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;color:var(--ink);background:none;border:none;cursor:pointer;transition:background .14s;}.in2 .ss-iconbtn:hover{background:var(--bone);}@keyframes in2Skel{from{background-position:200% 0}to{background-position:-200% 0}}@keyframes in2Spin{to{transform:rotate(360deg)}}.in2 .ss-skel{background:linear-gradient(90deg,var(--bone) 25%,#FAF7F0 50%,var(--bone) 75%);background-size:200% 100%;animation:in2Skel 1.3s linear infinite;}.in2 .ss-spin{animation:in2Spin .8s linear infinite;}.in2 .ss-demo-scroll::-webkit-scrollbar{width:8px;}.in2 .ss-demo-scroll::-webkit-scrollbar-thumb{background:rgba(27,23,18,.22);}";
function In2_Styles() {
  return React2.createElement("style", { "data-samosite-canon-in2": "0.12", dangerouslySetInnerHTML: { __html: In2_CSS } });
}
function Icon({ d, size = 22, sw = 1.8, fill }) {
  return /* @__PURE__ */ jsx5("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: fill || "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", children: d.map((p, i) => /* @__PURE__ */ jsx5("path", { d: p }, i)) });
}
var S = {
  label: { fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-45)" },
  input: { width: "100%", padding: "13px 14px", border: "1px solid var(--line-2)", background: "#fff", font: "inherit", fontSize: 16, color: "var(--ink)", outline: "none" },
  field: { display: "flex", flexDirection: "column", gap: 7 },
  hint: { fontSize: 15.5, lineHeight: 1.5, color: "var(--ink-70)" }
};
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs5("label", { style: S.field, children: [
    /* @__PURE__ */ jsx5("span", { style: S.label, children: label }),
    children
  ] });
}
function Chip({ active, children, onClick, dashed, ...rest }) {
  return /* @__PURE__ */ jsx5("button", { type: "button", onClick, role: "radio", "aria-checked": !!active, ...rest, className: "chip" + (active ? " is-active" : "") + (dashed ? " chip--other" : ""), style: { fontSize: 14.5 }, children });
}
function Cta({ ok, onClick, missing, children, ...rest }) {
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
    /* @__PURE__ */ jsxs5("button", { className: "btn btn--block", type: "button", onClick, disabled: !ok, ...rest, style: { opacity: ok ? 1 : 0.5, cursor: ok ? "pointer" : "not-allowed" }, children: [
      children,
      " ",
      /* @__PURE__ */ jsx5("span", { className: "arw", children: "\u2192" })
    ] }),
    !ok && missing ? /* @__PURE__ */ jsxs5("span", { style: { textAlign: "center", fontSize: 13, color: "var(--ink-45)" }, children: [
      "\u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C: ",
      missing
    ] }) : null
  ] });
}
var NICHE_ORDER = ["\u041C\u0430\u043D\u0438\u043A\u044E\u0440", "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B", "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F", "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433", "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442"];
var BOOKING = [{ id: "dikidi", label: "Dikidi" }, { id: "yclients", label: "YClients" }, { id: "phone", label: "\u041F\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0443 \u0438 \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0430\u0445" }, { id: "none", label: "\u041F\u043E\u043A\u0430 \u043D\u0438\u043A\u0430\u043A" }];
var CHANNELS = ["Telegram", "MAX", "WhatsApp", "Email", "\u0422\u0435\u043B\u0435\u0444\u043E\u043D/SMS"];
var PHONE_CH = ["WhatsApp", "\u0422\u0435\u043B\u0435\u0444\u043E\u043D/SMS"];
var CITIES = ["\u041C\u043E\u0441\u043A\u0432\u0430", "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A", "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", "\u041A\u0430\u0437\u0430\u043D\u044C", "\u041D\u0438\u0436\u043D\u0438\u0439 \u041D\u043E\u0432\u0433\u043E\u0440\u043E\u0434", "\u0427\u0435\u043B\u044F\u0431\u0438\u043D\u0441\u043A", "\u0421\u0430\u043C\u0430\u0440\u0430", "\u0423\u0444\u0430", "\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443", "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440", "\u041E\u043C\u0441\u043A", "\u0412\u043E\u0440\u043E\u043D\u0435\u0436", "\u041F\u0435\u0440\u043C\u044C", "\u0412\u043E\u043B\u0433\u043E\u0433\u0440\u0430\u0434", "\u0421\u043E\u0447\u0438", "\u0422\u044E\u043C\u0435\u043D\u044C", "\u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A", "\u0421\u0430\u0440\u0430\u0442\u043E\u0432", "\u0422\u043E\u043B\u044C\u044F\u0442\u0442\u0438"];
var demoSrc = (img, w) => img.indexOf("photo-") === 0 ? "https://images.unsplash.com/" + img + "?auto=format&fit=crop&w=" + w + "&q=80" : img;
var DEMO_FIX = {
  "\u041C\u0430\u043D\u0438\u043A\u044E\u0440": { brand: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B", host: "anna-nails", cat: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \xB7 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", h: ["\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440,", "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438"], img: "img/nails.png", items: [["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0441 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435\u043C", "2 200 \u20BD", "\u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439, \u0431\u0435\u0440\u0435\u0436\u043D\u043E \xB7 1,5 \u0447"], ["\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", "+600 \u20BD", "\u0434\u043B\u044F \u0442\u043E\u043D\u043A\u0438\u0445 \u0438 \u043B\u043E\u043C\u043A\u0438\u0445"], ["\u0414\u0438\u0437\u0430\u0439\u043D \u2014 \u0434\u0432\u0430 \u043D\u043E\u0433\u0442\u044F", "\u043E\u0442 300 \u20BD", "\u043E\u0442 \u043F\u0440\u043E\u0441\u0442\u043E\u0433\u043E \u0434\u043E \u0441\u043B\u043E\u0436\u043D\u043E\u0433\u043E"], ["\u041F\u0435\u0434\u0438\u043A\u044E\u0440 \u0441 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435\u043C", "2 800 \u20BD", "\u0441\u043C\u0430\u0440\u0442-\u043F\u0435\u0434\u0438\u043A\u044E\u0440 \xB7 2 \u0447"], ["\u0421\u043D\u044F\u0442\u0438\u0435 \u0447\u0443\u0436\u043E\u0433\u043E \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", "500 \u20BD", "\u0431\u0435\u0437 \u0441\u043F\u0435\u0448\u043A\u0438 \u0438 \u0444\u0440\u0435\u0437\u044B \xAB\u043D\u0430 \u0436\u0438\u0432\u0443\u044E\xBB"]], gal: ["img/nails.png", "photo-1519014816548-bf5fe059798b", "photo-1604654894610-df63bc536371", "photo-1610992015732-2449b76344bc"], revs: [["\xAB\u0410\u043D\u043D\u0430 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442. \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432.\xBB", "\u041E\u043B\u0435\u0441\u044F \u041D. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u0417\u0430\u043F\u0438\u0441\u0430\u043B\u0430\u0441\u044C \u0432\u0435\u0447\u0435\u0440\u043E\u043C, \u0443\u0442\u0440\u043E\u043C \u0443\u0436\u0435 \u0441 \u043D\u043E\u0433\u0442\u044F\u043C\u0438. \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u0447\u0438\u0441\u0442\u043E, \u0432\u0441\u0451 \u0441\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u043E.\xBB", "\u041C\u0430\u0440\u0438\u043D\u0430 \u041A. \xB7 2\u0413\u0418\u0421 \xB7 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u0425\u043E\u0436\u0443 \u043F\u043E\u043B\u0433\u043E\u0434\u0430 \u2014 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0440\u0435\u0430\u043B\u044C\u043D\u043E \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F \u0442\u0440\u0438 \u043D\u0435\u0434\u0435\u043B\u0438.\xBB", "\u0414\u0430\u0448\u0430 \u0422. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434"]], addr: "\u041C\u0430\u043B\u044B\u0448\u0435\u0432\u0430 12, \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", rating: "4.9", n: 137, brand2: "Anna Nails Studio", addr2: "\u041B\u0435\u043D\u0438\u043D\u0430 40, \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", rating2: "4.7", n2: 41 },
  "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B": { brand: "\u0411\u0440\u043E\u0432\u0438 \u0412\u0435\u0440\u044B", host: "vera-brows", cat: "\u0411\u0440\u043E\u0432\u0438 \xB7 \u041A\u0430\u0437\u0430\u043D\u044C", h: ["\u0411\u0440\u043E\u0432\u0438 \u043F\u043E \u0432\u0430\u0448\u0435\u0439", "\u0444\u043E\u0440\u043C\u0435 \u043B\u0438\u0446\u0430"], img: "photo-1616683693504-3ea7e9ad6fec", items: [["\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F + \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", "1 200 \u20BD", "\u0432\u043E\u0441\u043A \u0438\u043B\u0438 \u043F\u0438\u043D\u0446\u0435\u0442 \xB7 40 \u043C\u0438\u043D"], ["\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0441 \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435\u043C", "2 000 \u20BD", "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 4\u20136 \u043D\u0435\u0434\u0435\u043B\u044C"], ["\u0410\u0440\u0445\u0438\u0442\u0435\u043A\u0442\u0443\u0440\u0430 \u0441 \u043D\u0443\u043B\u044F", "1 500 \u20BD", "\u043F\u043E\u0434\u0431\u043E\u0440 \u0444\u043E\u0440\u043C\u044B \u043F\u043E \u043B\u0438\u0446\u0443"], ["\u041E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u043D\u0438\u0446", "800 \u20BD", "\u043A\u0440\u0430\u0441\u043A\u0430 \u0438\u043B\u0438 \u0445\u043D\u0430"], ["\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F \u043C\u0443\u0436\u0441\u043A\u0438\u0445 \u0431\u0440\u043E\u0432\u0435\u0439", "1 000 \u20BD", "\u0435\u0441\u0442\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u0430\u044F \u0444\u043E\u0440\u043C\u0430"]], gal: ["photo-1616683693504-3ea7e9ad6fec", "photo-1594736797933-d0501ba2fe65", "photo-1583001931096-959e9a1a6223", "photo-1588514912908-8f5891714f8d"], revs: [["\xAB\u041F\u0435\u0440\u0432\u044B\u0439 \u0440\u0430\u0437 \u043C\u0430\u0441\u0442\u0435\u0440 \u043D\u0435 \u0441\u0434\u0435\u043B\u0430\u043B\u0430 \u043C\u043D\u0435 \u0447\u0443\u0436\u0438\u0435 \u0431\u0440\u043E\u0432\u0438 \u2014 \u0441\u0432\u043E\u0438, \u043D\u043E \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u044B\u0435.\xBB", "\u041A\u0430\u0440\u0438\u043D\u0430 \u0422. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u0424\u043E\u0440\u043C\u0443 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E, \u043B\u0438\u0446\u043E \u0431\u0443\u0434\u0442\u043E \u043E\u0442\u043A\u0440\u044B\u043B\u043E\u0441\u044C.\xBB", "\u041C\u0430\u0440\u0438\u043D\u0430 \u0412. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 5,0"], ["\xAB\u041D\u0435 \u0440\u0438\u0441\u0443\u044E \u0431\u0440\u043E\u0432\u0438 \u0443\u0442\u0440\u043E\u043C \u0432\u043E\u043E\u0431\u0449\u0435. \u042D\u043A\u043E\u043D\u043E\u043C\u0438\u044F \u043F\u043E\u043B\u0443\u0447\u0430\u0441\u0430 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C.\xBB", "\u0410\u043D\u044F \u0421. \xB7 2\u0413\u0418\u0421 \xB7 2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434"]], addr: "\u0411\u0430\u0443\u043C\u0430\u043D\u0430 8, \u041A\u0430\u0437\u0430\u043D\u044C", rating: "5.0", n: 89, brand2: "Vera Brows", addr2: "\u041A\u0440\u0435\u043C\u043B\u0451\u0432\u0441\u043A\u0430\u044F 21, \u041A\u0430\u0437\u0430\u043D\u044C", rating2: "4.8", n2: 27 },
  "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F": { brand: "\u0411\u0440\u0438\u0442\u0432\u0430", host: "britva", cat: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xB7 \u0422\u044E\u043C\u0435\u043D\u044C", h: ["\u0421\u0442\u0440\u0438\u0436\u043A\u0430 + \u0431\u043E\u0440\u043E\u0434\u0430", "\u0437\u0430 45 \u043C\u0438\u043D\u0443\u0442"], img: "photo-1503951914875-452162b0f3f1", items: [["\u041C\u0443\u0436\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0438\u0436\u043A\u0430", "1 800 \u20BD", "\u043C\u0430\u0448\u0438\u043D\u043A\u0430 + \u043D\u043E\u0436\u043D\u0438\u0446\u044B \xB7 45 \u043C\u0438\u043D"], ["\u0421\u0442\u0440\u0438\u0436\u043A\u0430 + \u0431\u043E\u0440\u043E\u0434\u0430", "2 900 \u20BD", "\u0441 \u0433\u043E\u0440\u044F\u0447\u0438\u043C \u043F\u043E\u043B\u043E\u0442\u0435\u043D\u0446\u0435\u043C"], ["\u0411\u043E\u0440\u043E\u0434\u0430", "1 400 \u20BD", "\u0444\u043E\u0440\u043C\u0430 + \u043E\u043A\u0430\u043D\u0442\u043E\u0432\u043A\u0430"], ["\u041E\u043F\u0430\u0441\u043D\u043E\u0439 \u0431\u0440\u0438\u0442\u0432\u043E\u0439", "1 600 \u20BD", "\u0433\u043E\u043B\u043E\u0432\u0430 \u0438\u043B\u0438 \u0431\u043E\u0440\u043E\u0434\u0430"], ["\u041E\u0442\u0435\u0446 + \u0441\u044B\u043D", "2 800 \u20BD", "\u0440\u0435\u0431\u0451\u043D\u043E\u043A \u0434\u043E 12 \u043B\u0435\u0442"]], gal: ["photo-1503951914875-452162b0f3f1", "photo-1585747860715-2ba37e788b70", "photo-1622287162716-f311baa1a2b8", "photo-1521490878406-4b7f8f5f9cd4"], revs: [["\xAB\u0425\u043E\u0436\u0443 \u0442\u0440\u0435\u0442\u0438\u0439 \u0433\u043E\u0434. \u0412\u0441\u0435\u0433\u0434\u0430 \u043F\u043E\u043C\u043D\u0438\u0442, \u043A\u0430\u043A \u0441\u0442\u0440\u0438\u0433\u043B\u0438 \u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0440\u0430\u0437.\xBB", "\u0410\u043D\u0442\u043E\u043D \u041A. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \u041A\u0430\u0440\u0442\u044B \xB7 4 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u0411\u0435\u0437 \u043B\u0438\u0448\u043D\u0438\u0445 \u0440\u0430\u0437\u0433\u043E\u0432\u043E\u0440\u043E\u0432: \u043F\u0440\u0438\u0448\u0451\u043B, \u043F\u043E\u0441\u0442\u0440\u0438\u0433\u043B\u0438, \u0443\u0448\u0451\u043B. 40 \u043C\u0438\u043D\u0443\u0442.\xBB", "\u0418\u0433\u043E\u0440\u044C \u041C. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u0421\u044B\u043D \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B \u0431\u043E\u044F\u0442\u044C\u0441\u044F \u0441\u0442\u0440\u0438\u0447\u044C\u0441\u044F. \u042D\u0442\u043E \u043B\u0443\u0447\u0448\u0430\u044F \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F.\xBB", "\u041F\u0430\u0432\u0435\u043B \u0414. \xB7 2\u0413\u0418\u0421 \xB7 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434"]], addr: "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0438 55, \u0422\u044E\u043C\u0435\u043D\u044C", rating: "4.8", n: 214, brand2: "\u0411\u0440\u0438\u0442\u0432\u0430 \u043D\u0430 \u041B\u0435\u043D\u0438\u043D\u0430", addr2: "\u041B\u0435\u043D\u0438\u043D\u0430 4, \u0422\u044E\u043C\u0435\u043D\u044C", rating2: "4.6", n2: 58 },
  "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433": { brand: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u0418\u0440\u0438\u043D\u044B", host: "irina-skin", cat: "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433 \xB7 \u0421\u043E\u0447\u0438", h: ["\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u043C\u043E\u0442\u0440\u0438\u043C \u043A\u043E\u0436\u0443,", "\u043F\u043E\u0442\u043E\u043C \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u0443\u0445\u043E\u0434"], img: "photo-1616394584738-fc6e612e71b9", items: [["\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0447\u0438\u0441\u0442\u043A\u0430", "3 000 \u20BD", "\u0441 \u0443\u0445\u043E\u0434\u043E\u043C \u043F\u043E \u0442\u0438\u043F\u0443 \u043A\u043E\u0436\u0438 \xB7 1,5 \u0447"], ["\u041F\u0438\u043B\u0438\u043D\u0433 \u043F\u043E \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0438\u044F\u043C", "\u043E\u0442 2 500 \u20BD", "\u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043E\u0441\u043B\u0435 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438"], ["\u0423\u0445\u043E\u0434 \u043F\u043E \u0442\u0438\u043F\u0443 \u043A\u043E\u0436\u0438", "2 800 \u20BD", "\u0434\u043E\u043C\u0430\u0448\u043D\u044F\u044F \u0441\u0445\u0435\u043C\u0430 \u0432 \u043F\u043E\u0434\u0430\u0440\u043E\u043A"], ["\u041C\u0430\u0441\u0441\u0430\u0436 \u043B\u0438\u0446\u0430", "2 000 \u20BD", "\u0431\u0443\u043A\u043A\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043B\u0438 \u043A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439"], ["\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", "\u0440\u0430\u0437\u0431\u043E\u0440 \u043A\u043E\u0436\u0438 \u0438 \u043F\u043B\u0430\u043D"]], gal: ["photo-1570172619644-dfd03ed5d881", "photo-1616394584738-fc6e612e71b9", "photo-1512290923902-8a9f81dc236c", "photo-1519824145371-296894a0daa9"], revs: [["\xAB\u041D\u0435 \u0432\u043F\u0430\u0440\u0438\u0432\u0430\u0435\u0442 \u043B\u0438\u0448\u043D\u0435\u0433\u043E: \u0441\u043A\u0430\u0437\u0430\u043B\u0430, \u0447\u0442\u043E \u0445\u0432\u0430\u0442\u0438\u0442 \u0442\u0440\u0451\u0445 \u0447\u0438\u0441\u0442\u043E\u043A, \u0430 \u043D\u0435 \u043A\u0443\u0440\u0441\u0430 \u0438\u0437 \u0434\u0435\u0441\u044F\u0442\u0438.\xBB", "\u041E\u043B\u044C\u0433\u0430 \u0412. \xB7 2\u0413\u0418\u0421 \xB7 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u041A\u043E\u0436\u0430 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u043B\u0430 \u0448\u0435\u043B\u0443\u0448\u0438\u0442\u044C\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u043F\u043E \u0435\u0451 \u0441\u0445\u0435\u043C\u0435.\xBB", "\u041D\u0430\u0442\u0430\u0448\u0430 \u0411. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 2 \u043C\u0435\u0441\u044F\u0446\u0430 \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0438 \u0447\u0435\u0441\u0442\u043D\u0430\u044F \u2014 \u0431\u0435\u0437 \u043D\u0430\u0432\u044F\u0437\u044B\u0432\u0430\u043D\u0438\u044F \u043A\u0443\u0440\u0441\u043E\u0432.\xBB", "\u0412\u0435\u0440\u0430 \u041B. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434"]], addr: "\u041D\u0430\u0432\u0430\u0433\u0438\u043D\u0441\u043A\u0430\u044F 3, \u0421\u043E\u0447\u0438", rating: "4.9", n: 76, brand2: "\u0418\u0440\u0438\u043D\u0430 \u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433", addr2: "\u0413\u043E\u0440\u044C\u043A\u043E\u0433\u043E 30, \u0421\u043E\u0447\u0438", rating2: "4.7", n2: 19 },
  "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442": { brand: "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442 \u041A\u0438\u0440\u0430", host: "kira-color", cat: "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430", h: ["\u0426\u0432\u0435\u0442 \u0432\u043E\u043B\u043E\u0441 \u043F\u043E", "\u0432\u0430\u0448\u0435\u043C\u0443 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C\u0443"], img: "photo-1580618672591-eb180b1a973f", items: [["\u0421\u043B\u043E\u0436\u043D\u043E\u0435 \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", "\u043E\u0442 9 000 \u20BD", "airtouch, \u0431\u0430\u043B\u0430\u044F\u0436 \xB7 \u043E\u0442 3 \u0447"], ["\u0422\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "4 500 \u20BD", "\u043E\u0441\u0432\u0435\u0436\u0438\u0442\u044C \u0446\u0432\u0435\u0442 \xB7 1,5 \u0447"], ["\u041E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435 \u0432 \u043E\u0434\u0438\u043D \u0442\u043E\u043D", "\u043E\u0442 5 000 \u20BD", "\u043A\u043E\u0440\u043D\u0438 \u0438\u043B\u0438 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E"], ["\u0411\u043E\u0442\u043E\u043A\u0441 \u0434\u043B\u044F \u0432\u043E\u043B\u043E\u0441", "5 000 \u20BD", "\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435 \u043E\u0441\u0432\u0435\u0442\u043B\u0435\u043D\u0438\u044F"], ["\u0423\u0445\u043E\u0434 \u0437\u0430 \u0446\u0432\u0435\u0442\u043E\u043C", "2 000 \u20BD", "\u0434\u043E\u043C\u0430\u0448\u043D\u044F\u044F \u0441\u0445\u0435\u043C\u0430 \u0432 \u043F\u043E\u0434\u0430\u0440\u043E\u043A"]], gal: ["photo-1580618672591-eb180b1a973f", "photo-1560066984-138dadb4c035", "photo-1522337660859-02fbefca4702", "photo-1595476108010-b4d1f102b1b1"], revs: [["\xAB\u041D\u0435 \u0441\u0436\u0451\u0433 \u0434\u043B\u0438\u043D\u0443 \u0438 \u043F\u043E\u043F\u0430\u043B \u0432 \u043E\u0442\u0442\u0435\u043D\u043E\u043A \u0441 \u043F\u0435\u0440\u0432\u043E\u0433\u043E \u0440\u0430\u0437\u0430.\xBB", "\u041D\u0430\u0441\u0442\u044F \u0420. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u041F\u043E\u043A\u0430\u0437\u0430\u043B\u0430 \u043D\u0430 \u043F\u0430\u043B\u0438\u0442\u0440\u0435, \u0447\u0442\u043E \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0441\u044F. \u041F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u0440\u043E\u0432\u043D\u043E \u044D\u0442\u043E.\xBB", "\u042E\u043B\u044F \u0412. \xB7 2\u0413\u0418\u0421 \xB7 2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434"], ["\xAB\u041F\u043E\u0441\u043B\u0435 \u043E\u0441\u0432\u0435\u0442\u043B\u0435\u043D\u0438\u044F \u0432\u043E\u043B\u043E\u0441\u044B \u0436\u0438\u0432\u044B\u0435. \u041D\u0435 \u0434\u0443\u043C\u0430\u043B\u0430, \u0447\u0442\u043E \u0442\u0430\u043A \u0431\u044B\u0432\u0430\u0435\u0442.\xBB", "\u041A\u0430\u0442\u044F \u041C. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434"]], addr: "\u041F\u044F\u0442\u043D\u0438\u0446\u043A\u0430\u044F 24, \u041C\u043E\u0441\u043A\u0432\u0430", rating: "4.9", n: 137, brand2: "Kira Color Bar", addr2: "\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F 9, \u041C\u043E\u0441\u043A\u0432\u0430", rating2: "4.8", n2: 63 }
};
DEMO_FIX["\u0414\u0440\u0443\u0433\u043E\u0435"] = DEMO_FIX["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
var DEMO_PAL = {
  "\u041C\u0430\u043D\u0438\u043A\u044E\u0440": { bg: "#F7EFEC", ink: "#2A2320", soft: "#8A7C74", line: "#EEE1DC", accent: "#B0656F", btn: "#2A2320", onBtn: "#FAF4F1", serif: "'Cormorant', Georgia, serif", hl: "#F4C9C4" },
  "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B": { bg: "#EFE7DA", ink: "#241E17", soft: "#6E6053", line: "#DBD0BE", accent: "#7A5A3C", btn: "#241E17", onBtn: "#F5EFE4", serif: "'Playfair Display', Georgia, serif", hl: "#E8D9BF" },
  "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F": { bg: "#E7E2D6", ink: "#231C15", soft: "#6B5C48", line: "#D6CCB8", accent: "#8C4A22", btn: "#231C15", onBtn: "#F1EADC", serif: "'Oswald', sans-serif", hl: "#E8C9A8" },
  "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433": { bg: "#FFFFFF", ink: "#1A1D1C", soft: "#727975", line: "#ECECEA", accent: "#2F7A68", btn: "#1A1D1C", onBtn: "#FFFFFF", serif: "'Spectral', Georgia, serif", hl: "#BFE0D6" },
  "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442": { bg: "#F6F0F3", ink: "#221A24", soft: "#6E6472", line: "#E7DBE4", accent: "#9C2A8E", btn: "#221A24", onBtn: "#F9F0F6", serif: "'Cormorant', Georgia, serif", hl: "#EAC6E3" }
};
DEMO_PAL["\u0414\u0440\u0443\u0433\u043E\u0435"] = DEMO_PAL["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
var NICHE_LIB_V2 = NICHE_ORDER.concat(["\u0414\u0440\u0443\u0433\u043E\u0435"]).map((id) => ({ id, label: id, fixture: DEMO_FIX[id], palette: DEMO_PAL[id], other: id === "\u0414\u0440\u0443\u0433\u043E\u0435" }));
function formatPhone(v) {
  let digits = (v || "").replace(/\D/g, "");
  if (digits[0] === "8") digits = "7" + digits.slice(1);
  if (digits && digits[0] !== "7") digits = "7" + digits;
  digits = digits.slice(0, 11);
  const p = digits.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ") " + p.slice(3, 6);
  if (p.length >= 6) out += "-" + p.slice(6, 8);
  if (p.length >= 8) out += "-" + p.slice(8, 10);
  return out;
}
function contactValid(channel, value) {
  const v = (value || "").trim();
  if (!v) return false;
  if (PHONE_CH.indexOf(channel) >= 0) return v.replace(/\D/g, "").length === 11;
  if (channel === "Email") return /^\S+@\S+\.\S+$/.test(v);
  return /^@?[A-Za-z0-9_.]{2,}$/.test(v);
}
function contactError(channel) {
  if (PHONE_CH.indexOf(channel) >= 0) return "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E: +7 \u0438 10 \u0446\u0438\u0444\u0440";
  if (channel === "Email") return "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u2014 \u043D\u0443\u0436\u0435\u043D \u0432\u0438\u0434 you@mail.ru";
  return "\u041C\u0438\u043D\u0438\u043C\u0443\u043C 2 \u0441\u0438\u043C\u0432\u043E\u043B\u0430, \u043B\u0430\u0442\u0438\u043D\u0438\u0446\u0430/\u0446\u0438\u0444\u0440\u044B";
}
function linkInfo(raw) {
  const v = (raw || "").trim();
  if (!v) return { state: "empty" };
  if (/\s/.test(v) || !/[.]/.test(v)) return { state: "invalid", msg: "\u041F\u043E\u0445\u043E\u0436\u0435, \u044D\u0442\u043E \u043D\u0435 \u0441\u0441\u044B\u043B\u043A\u0430 \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441" };
  const s = v.toLowerCase();
  const providers = [{ re: /(yandex\.|ya\.ru|maps\.yandex)/, name: "\u042F\u043D\u0434\u0435\u043A\u0441 \u041A\u0430\u0440\u0442\u044B" }, { re: /2gis\./, name: "2\u0413\u0418\u0421" }, { re: /(t\.me|telegram\.)/, name: "Telegram" }, { re: /avito\./, name: "Avito" }, { re: /(vk\.com|vk\.ru)/, name: "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435" }, { re: /(dikidi|yclients)/, name: "\u0437\u0430\u043F\u0438\u0441\u044C" }];
  const hit = providers.find((p) => p.re.test(s));
  if (hit) return { state: "ok", provider: hit.name, msg: "\u0423\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A: " + hit.name };
  return { state: "unknown", msg: "\u0421\u0441\u044B\u043B\u043A\u0443 \u043F\u0440\u0438\u043C\u0435\u043C \u2014 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u043C \u0441\u0430\u043C\u0438" };
}
function bookingUrlInfo(raw) {
  const v = (raw || "").trim();
  if (!v) return { state: "empty" };
  if (/\s/.test(v) || !/\./.test(v)) return { state: "invalid", msg: "\u041F\u043E\u0445\u043E\u0436\u0435, \u044D\u0442\u043E \u043D\u0435 \u0441\u0441\u044B\u043B\u043A\u0430 \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441" };
  if (/(dikidi|yclients)/i.test(v)) return { state: "ok", msg: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0437\u0430\u043F\u0438\u0441\u044C \u2014 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u043C \u043A\u043D\u043E\u043F\u043A\u0443 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB" };
  return { state: "unknown", msg: "\u041D\u0435 \u043F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 Dikidi \u0438\u043B\u0438 YClients \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u043C \u0441\u0430\u043C\u0438" };
}
var ALT_PATHS = {
  name: { icon: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "m20 20-3.5-3.5"], label: "\u0412\u0432\u0435\u0441\u0442\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434", sub: "\u041D\u0430\u0439\u0434\u0451\u043C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445 \u0441\u0430\u043C\u0438" },
  screenshot: { icon: ["M3 4.5h18v15H3z", "m3 15 5-5 4 4 3-3 6 6"], label: "\u0415\u0441\u0442\u044C \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438", sub: "\u0418\u0437 \u041A\u0430\u0440\u0442 \u0438\u043B\u0438 2\u0413\u0418\u0421 \u2014 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u043C \u0441\u0430\u043C\u0438" },
  link: { icon: ["M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1", "M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1"], label: "\u0415\u0441\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044C", sub: "\u041A\u0430\u0440\u0442\u044B, 2\u0413\u0418\u0421, Telegram, Avito, \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435" },
  photo: { icon: ["M3 4.5h18v15H3z", "M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3", "m21 16-5-5-8 8"], label: "\u041D\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435", sub: "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \u0438\u043B\u0438 \u043F\u0440\u0430\u0439\u0441\u0430" }
};
function AltPath({ icon, label, sub, onClick, active, ...rest }) {
  const [h, setH] = useState(false);
  return /* @__PURE__ */ jsxs5(
    "button",
    {
      type: "button",
      onClick: active ? void 0 : onClick,
      onMouseEnter: () => setH(true),
      onMouseLeave: () => setH(false),
      "aria-current": active ? "true" : void 0,
      ...rest,
      style: { width: "100%", display: "flex", alignItems: "center", gap: 12, textAlign: "left", padding: "11px 12px", border: active ? "1.5px solid var(--accent)" : "1px solid " + (h ? "var(--line-2)" : "var(--line)"), background: active || h ? "var(--bone)" : "#fff", cursor: active ? "default" : "pointer", transition: "background .14s, border-color .14s", font: "inherit" },
      children: [
        /* @__PURE__ */ jsx5("span", { style: { flex: "0 0 auto", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: active ? "var(--accent)" : "var(--bone)", border: "1px solid " + (active ? "var(--accent)" : "var(--line)"), color: active ? "var(--paper)" : "var(--accent)" }, children: /* @__PURE__ */ jsx5(Icon, { d: icon, size: 17 }) }),
        /* @__PURE__ */ jsxs5("span", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx5("span", { style: { display: "block", fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }, children: label }),
          sub ? /* @__PURE__ */ jsx5("span", { style: { display: "block", fontSize: 12.5, color: "var(--ink-45)", marginTop: 1 }, children: sub }) : null
        ] }),
        active ? /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", flex: "none" }, children: "\u0432\u044B\u0431\u0440\u0430\u043D" }) : /* @__PURE__ */ jsx5("span", { style: { color: "var(--ink-45)", flex: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["m9 18 6-6-6-6"], size: 16, sw: 2 }) })
      ]
    }
  );
}
function CityInput({ value, onChange, forceOpen }) {
  const [open, setOpen] = useState(!!forceOpen);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const q = (value || "").trim().toLowerCase();
  const matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 6) : CITIES.slice(0, 6);
  const exact = CITIES.some((c) => c.toLowerCase() === q);
  const none = !!q && matches.length === 0;
  const show = open && (matches.length > 0 || none) && !(exact && matches.length === 1);
  useEffect(() => {
    const onDoc = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const pick = (c) => {
    onChange(c);
    setOpen(false);
    setActive(-1);
  };
  const onKey = (e) => {
    if (!show) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, matches.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      pick(matches[active]);
    } else if (e.key === "Escape") setOpen(false);
  };
  return /* @__PURE__ */ jsxs5("div", { ref: wrapRef, children: [
    /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z", "M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z"], size: 17 }) }),
      /* @__PURE__ */ jsx5("input", { style: { ...S.input, paddingLeft: 36 }, value, placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u0433\u043E\u0440\u043E\u0434", onFocus: () => setOpen(true), onChange: (e) => {
        onChange(e.target.value);
        setOpen(true);
        setActive(-1);
      }, onKeyDown: onKey, autoComplete: "off", role: "combobox", "aria-expanded": show, "aria-autocomplete": "list" })
    ] }),
    show && /* @__PURE__ */ jsxs5("ul", { style: { listStyle: "none", margin: "6px 0 0", padding: 4, background: "#fff", border: "1px solid var(--line-2)", maxHeight: 232, overflowY: "auto" }, children: [
      none && /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsxs5("button", { type: "button", onMouseDown: (e) => {
        e.preventDefault();
        pick(value.trim());
      }, style: { width: "100%", textAlign: "left", padding: "10px 12px", border: "none", background: "var(--bone)", color: "var(--ink)", font: "inherit", fontSize: 15, cursor: "pointer" }, children: [
        "\u041E\u0441\u0442\u0430\u0432\u0438\u043C \u043A\u0430\u043A \u0435\u0441\u0442\u044C: \xAB",
        value.trim(),
        "\xBB"
      ] }) }),
      matches.map((c, i) => /* @__PURE__ */ jsx5("li", { children: /* @__PURE__ */ jsx5("button", { type: "button", onMouseDown: (e) => {
        e.preventDefault();
        pick(c);
      }, onMouseEnter: () => setActive(i), style: { width: "100%", textAlign: "left", padding: "10px 12px", border: "none", background: i === active ? "var(--bone)" : "transparent", color: "var(--ink)", font: "inherit", fontSize: 15, cursor: "pointer" }, children: c }) }, c))
    ] })
  ] });
}
function LinkInput({ value, onChange }) {
  const [touched, setTouched] = useState(false);
  const info = linkInfo(value);
  const showState = (touched || (value || "").trim().length > 3) && info.state !== "empty";
  const tone = info.state === "invalid" ? "#B23B3B" : info.state === "ok" ? "#2F7A68" : "var(--ink-70)";
  const border = !showState ? "var(--line-2)" : info.state === "invalid" ? "#D98A8A" : info.state === "ok" ? "#8FC3B4" : "var(--line-2)";
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1", "M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1"], size: 17 }) }),
      /* @__PURE__ */ jsx5("input", { style: { ...S.input, paddingLeft: 36, borderColor: border }, value, placeholder: "\u042F.\u041A\u0430\u0440\u0442\u044B, 2\u0413\u0418\u0421, Telegram, Avito\u2026", onChange: (e) => onChange(e.target.value), onBlur: () => setTouched(true), inputMode: "url", autoComplete: "off" })
    ] }),
    showState && /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: tone }, children: [
      /* @__PURE__ */ jsx5(Icon, { d: info.state === "invalid" ? ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"] : info.state === "ok" ? ["M20 6 9 17l-5-5"] : ["M12 8v4", "M12 16h.01", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"], size: 15, sw: 2 }),
      info.msg
    ] })
  ] });
}
function ContactInput({ channel, value, onChange, initialTouched }) {
  const [touched, setTouched] = useState(!!initialTouched);
  const phone = PHONE_CH.indexOf(channel) >= 0;
  const ph = { "Telegram": "@username", "MAX": "@username", "WhatsApp": "+7 (___) ___-__-__", "Email": "you@mail.ru", "\u0422\u0435\u043B\u0435\u0444\u043E\u043D/SMS": "+7 (___) ___-__-__" }[channel];
  const label = channel === "Email" ? "\u041F\u043E\u0447\u0442\u0430" : phone ? "\u0422\u0435\u043B\u0435\u0444\u043E\u043D" : "\u041D\u0438\u043A \u0432 " + channel;
  const valid = contactValid(channel, value);
  const showErr = touched && !!(value || "").trim() && !valid;
  const border = showErr ? "#D98A8A" : touched && valid ? "#8FC3B4" : "var(--line-2)";
  const handle = (e) => {
    const raw = e.target.value;
    onChange(phone ? formatPhone(raw) : raw);
  };
  const iconD = phone ? ["M6.6 3.5 9 3l2 4.5-2 1.3a12 12 0 0 0 5.7 5.7l1.3-2 4.5 2-.5 2.4a2 2 0 0 1-2.3 1.6A16 16 0 0 1 3.4 5.8 2 2 0 0 1 5 3.5z"] : channel === "Email" ? ["M3 5.5h18v13H3z", "m3 6 9 7 9-7"] : ["M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M4.5 20a7.5 7.5 0 0 1 15 0"];
  return /* @__PURE__ */ jsxs5(Field, { label, children: [
    /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: iconD, size: 17 }) }),
      /* @__PURE__ */ jsx5("input", { style: { ...S.input, paddingLeft: 36, borderColor: border }, value, placeholder: ph, inputMode: phone ? "tel" : channel === "Email" ? "email" : "text", autoComplete: "off", onChange: handle, onBlur: () => setTouched(true) })
    ] }),
    showErr && /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx5(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 15, sw: 2 }),
      " ",
      contactError(channel)
    ] })
  ] });
}
function BookingLink({ value, onChange }) {
  const [touched, setTouched] = useState(false);
  const info = bookingUrlInfo(value);
  const show = (touched || (value || "").trim().length > 3) && info.state !== "empty";
  const tone = info.state === "invalid" ? "#B23B3B" : info.state === "ok" ? "#2F7A68" : "var(--ink-70)";
  const border = !show ? "var(--line-2)" : info.state === "invalid" ? "#D98A8A" : info.state === "ok" ? "#8FC3B4" : "var(--line-2)";
  return /* @__PURE__ */ jsxs5(Field, { label: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043E\u043D\u043B\u0430\u0439\u043D-\u0437\u0430\u043F\u0438\u0441\u044C (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", children: [
    /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1", "M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1"], size: 17 }) }),
      /* @__PURE__ */ jsx5("input", { style: { ...S.input, paddingLeft: 36, borderColor: border }, value, placeholder: "https://dikidi.net/\u2026", onChange: (e) => onChange(e.target.value), onBlur: () => setTouched(true), inputMode: "url", autoComplete: "off" })
    ] }),
    show && /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: tone }, children: [
      /* @__PURE__ */ jsx5(Icon, { d: info.state === "invalid" ? ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"] : info.state === "ok" ? ["M20 6 9 17l-5-5"] : ["M12 8v4", "M12 16h.01", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"], size: 15, sw: 2 }),
      info.msg
    ] })
  ] });
}
function BookingPhone({ value, onChange }) {
  const [touched, setTouched] = useState(false);
  const bad = touched && (value || "").trim() !== "" && (value || "").replace(/\D/g, "").length !== 11;
  return /* @__PURE__ */ jsxs5(Field, { label: "\u041D\u043E\u043C\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", children: [
    /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2z"], size: 17 }) }),
      /* @__PURE__ */ jsx5("input", { style: { ...S.input, paddingLeft: 36, borderColor: bad ? "#D98A8A" : "var(--line-2)" }, value, placeholder: "+7 (___) ___-__-__", onChange: (e) => onChange(formatPhone(e.target.value)), onBlur: () => setTouched(true), inputMode: "tel", autoComplete: "off" })
    ] }),
    /* @__PURE__ */ jsx5("span", { style: { fontSize: 13.5, color: bad ? "#B23B3B" : "var(--ink-45)" }, children: bad ? "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E: +7 \u0438 10 \u0446\u0438\u0444\u0440" : "\u041A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u043E\u0442\u043A\u0440\u043E\u0435\u0442 \u0437\u0432\u043E\u043D\u043E\u043A \u0438\u043B\u0438 WhatsApp \u043D\u0430 \u044D\u0442\u043E\u0442 \u043D\u043E\u043C\u0435\u0440. \u041F\u0443\u0441\u0442\u043E \u2014 \u0432\u043E\u0437\u044C\u043C\u0451\u043C \u0438\u0437 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438." })
  ] });
}
function Uploader({ label, sub, multiple, accept, icon, onFiles, initial, max }) {
  max = max || 5;
  const fmtMB = (b) => (b / 1048576).toFixed(1).replace(".", ",") + " \u041C\u0411";
  const ref = useRef(null);
  const [files, setFiles] = useState(initial || []);
  const [err, setErr] = useState("");
  const [over, setOver] = useState(false);
  const apply = (arr, e) => {
    setFiles(arr);
    setErr(e || "");
    onFiles && onFiles(arr);
  };
  const push = (list) => {
    let arr = multiple ? files.slice() : [];
    let e = "";
    Array.from(list).forEach((f) => {
      if (f.type && f.type.indexOf("image/") !== 0) {
        e = "\u042D\u0442\u043E \u043D\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u2014 \u043D\u0443\u0436\u0435\u043D JPG, PNG \u0438\u043B\u0438 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442";
        return;
      }
      if (f.size > 8 * 1024 * 1024) {
        e = "\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 8 \u041C\u0411 \u2014 \u043F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u043F\u043E\u043B\u0435\u0433\u0447\u0435";
        return;
      }
      const it = { name: f.name || "\u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435", url: URL.createObjectURL(f), size: f.size };
      if (multiple) {
        if (arr.length < max) arr.push(it);
        else e = "\u041D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 " + max + " \u0444\u043E\u0442\u043E";
      } else arr = [it];
    });
    apply(arr, e);
  };
  const removeAt = (i) => {
    const arr = files.slice();
    arr.splice(i, 1);
    apply(arr, "");
  };
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs5(
      "button",
      {
        type: "button",
        onClick: () => ref.current && ref.current.click(),
        onDragOver: (e) => {
          e.preventDefault();
          setOver(true);
        },
        onDragLeave: () => setOver(false),
        onDrop: (e) => {
          e.preventDefault();
          setOver(false);
          if (e.dataTransfer && e.dataTransfer.files.length) push(e.dataTransfer.files);
        },
        style: { width: "100%", display: "flex", alignItems: "center", gap: 14, textAlign: "left", padding: "18px 16px", border: "1.5px dashed " + (over ? "var(--accent)" : "var(--line-2)"), background: over ? "#F4E9E6" : "var(--bone)", color: "var(--ink)", cursor: "pointer", transition: "border-color .14s, background .14s" },
        children: [
          /* @__PURE__ */ jsx5("span", { style: { flex: "0 0 auto", width: 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#fff", border: "1px solid var(--line)", color: "var(--accent)" }, children: icon }),
          /* @__PURE__ */ jsxs5("span", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ jsx5("span", { style: { display: "block", fontWeight: 600, fontSize: 15.5 }, children: label }),
            /* @__PURE__ */ jsx5("span", { style: { display: "block", fontSize: 13, color: "var(--ink-70)", marginTop: 2 }, children: sub })
          ] })
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-start" }, children: [
      files.map((f, i) => /* @__PURE__ */ jsxs5("span", { style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3, width: 62 }, children: [
        /* @__PURE__ */ jsxs5("span", { title: f.name, style: { position: "relative", width: 62, height: 62, border: "1px solid var(--line-2)", background: "#fff", overflow: "hidden", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-45)" }, children: [
          f.url ? /* @__PURE__ */ jsx5("img", { src: f.url, alt: f.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ jsx5(Icon, { d: ["M3 4.5h18v15H3z", "m3 15 5-5 4 4 3-3 6 6"], size: 22 }),
          /* @__PURE__ */ jsx5("button", { type: "button", "aria-label": "\u0423\u0431\u0440\u0430\u0442\u044C " + f.name, onClick: () => removeAt(i), style: { position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", border: "none", background: "rgba(27,23,18,.75)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M18 6 6 18", "m6 6 12 12"], size: 11, sw: 2.4 }) })
        ] }),
        f.size ? /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-45)", whiteSpace: "nowrap" }, children: fmtMB(f.size) }) : null
      ] }, i)),
      multiple ? /* @__PURE__ */ jsxs5("span", { style: { fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-45)", alignSelf: "center" }, children: [
        files.length,
        " \u0438\u0437 ",
        max
      ] }) : /* @__PURE__ */ jsx5("span", { style: { fontSize: 13, color: "var(--ink-70)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", alignSelf: "center" }, children: files[0].name })
    ] }),
    err && /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx5(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 15, sw: 2 }),
      " ",
      err
    ] }),
    /* @__PURE__ */ jsx5("input", { ref, type: "file", accept, multiple, style: { display: "none" }, onChange: (e) => {
      push(e.target.files || []);
      e.target.value = "";
    } })
  ] });
}
function Ph({ src, w, pos, P, label, style }) {
  const [err, setErr] = useState(false);
  if (err) return /* @__PURE__ */ jsx5("div", { style: { width: "100%", height: "100%", backgroundImage: "repeating-linear-gradient(135deg, " + P.line + " 0 12px, " + P.bg + " 12px 24px)", display: "flex", alignItems: "flex-end", padding: 8, ...style || {} }, children: label ? /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: P.soft, background: "rgba(255,255,255,.72)", padding: "2px 6px" }, children: label }) : null });
  return /* @__PURE__ */ jsx5("img", { src: demoSrc(src, w), alt: "", loading: "lazy", onError: () => setErr(true), style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", ...style || {} } });
}
function DemoSite({ niche, height }) {
  const f = DEMO_FIX[niche] || DEMO_FIX["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
  const P = DEMO_PAL[niche] || DEMO_PAL["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
  const Label = ({ children }) => /* @__PURE__ */ jsx5("div", { style: { fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: P.soft, marginBottom: 12 }, children });
  const BtnD = ({ children }) => /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: P.btn, color: P.onBtn, fontWeight: 700, fontSize: 14, padding: "13px 18px" }, children: [
    children,
    " ",
    /* @__PURE__ */ jsx5("span", { children: "\u2192" })
  ] });
  return /* @__PURE__ */ jsxs5("div", { style: { height, background: P.bg, display: "flex", flexDirection: "column", overflow: "hidden", userSelect: "none" }, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderBottom: "1px solid var(--line)", background: "var(--bone)", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { display: "inline-flex", gap: 5 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx5("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--line-2)" } }, i)) }),
      /* @__PURE__ */ jsx5("span", { style: { flex: 1, textAlign: "center" }, children: /* @__PURE__ */ jsxs5("span", { style: { fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-70)", background: "#fff", border: "1px solid var(--line)", padding: "2px 12px" }, children: [
        f.host,
        ".samosite.online"
      ] }) }),
      /* @__PURE__ */ jsx5("span", { style: { width: 31 } })
    ] }),
    /* @__PURE__ */ jsxs5("div", { className: "ss-demo-scroll", style: { flex: 1, minHeight: 0, overflowY: "auto", overscrollBehavior: "contain" }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { position: "relative", height: 280 }, children: [
        /* @__PURE__ */ jsx5(Ph, { src: f.img, w: 1200, pos: "center 24%", P, label: "\u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442" }),
        /* @__PURE__ */ jsx5("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,16,15,.66) 0%, rgba(20,16,15,0) 46%)" } }),
        /* @__PURE__ */ jsxs5("div", { style: { position: "absolute", top: 14, left: 20, right: 20, display: "flex", justifyContent: "space-between", gap: 12 }, children: [
          /* @__PURE__ */ jsxs5("span", { style: { fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#fff", opacity: 0.92 }, children: [
            f.brand,
            " \xB7 ",
            f.cat
          ] }),
          /* @__PURE__ */ jsxs5("span", { style: { fontFamily: "var(--mono)", fontSize: 10.5, color: "#fff", background: "rgba(20,16,15,.45)", padding: "3px 9px" }, children: [
            "\u2605 ",
            f.rating,
            " \xB7 ",
            f.n,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("h3", { style: { position: "absolute", left: 20, right: 20, bottom: 16, margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: 36, lineHeight: 1, letterSpacing: "-.01em", color: "#FBFBFC" }, children: [
          f.h[0],
          /* @__PURE__ */ jsx5("br", {}),
          /* @__PURE__ */ jsx5("span", { style: { fontStyle: "italic", color: P.hl }, children: f.h[1] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { padding: "22px 24px 8px" }, children: [
        /* @__PURE__ */ jsx5(Label, { children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B" }),
        f.items.map((it, i) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", gap: 14, padding: "9px 0", borderBottom: i < f.items.length - 1 ? "1px solid " + P.line : "none" }, children: [
          /* @__PURE__ */ jsxs5("div", { style: { minWidth: 0, flex: 1 }, children: [
            /* @__PURE__ */ jsx5("div", { style: { fontWeight: 600, fontSize: 14, color: P.ink }, children: it[0] }),
            it[2] ? /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: P.soft, marginTop: 2 }, children: it[2] }) : null
          ] }),
          /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 12.5, color: P.ink, whiteSpace: "nowrap" }, children: it[1] })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsx5("div", { style: { padding: "14px 24px 26px" }, children: /* @__PURE__ */ jsx5(BtnD, { children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" }) }),
      /* @__PURE__ */ jsxs5("div", { style: { padding: "0 24px 26px" }, children: [
        /* @__PURE__ */ jsx5(Label, { children: "\u041E\u0442\u0437\u044B\u0432\u044B" }),
        /* @__PURE__ */ jsx5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: f.revs.map((r, i) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 7, padding: "14px 16px", background: P.line, borderLeft: "3px solid " + P.accent }, children: [
          /* @__PURE__ */ jsx5("span", { "aria-label": "5 \u0438\u0437 5", style: { color: "#C9922E", fontSize: 13, letterSpacing: "1.5px" }, children: "\u2605\u2605\u2605\u2605\u2605" }),
          /* @__PURE__ */ jsx5("p", { style: { margin: 0, fontWeight: 600, fontSize: 15.5, lineHeight: 1.45, color: P.ink }, children: r[0] }),
          /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: P.ink, opacity: 0.75 }, children: r[1] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { padding: "0 24px 12px" }, children: [
        /* @__PURE__ */ jsx5(Label, { children: "\u0420\u0430\u0431\u043E\u0442\u044B" }),
        /* @__PURE__ */ jsx5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }, children: f.gal.map((g, i) => /* @__PURE__ */ jsx5("div", { style: { aspectRatio: "1 / 1", overflow: "hidden" }, children: /* @__PURE__ */ jsx5(Ph, { src: g, w: 600, P, label: "\u0444\u043E\u0442\u043E " + (i + 1) }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { padding: "18px 24px 22px", textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ jsx5(BtnD, { children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" }),
        /* @__PURE__ */ jsxs5("span", { style: { fontSize: 12, color: P.soft }, children: [
          f.addr,
          " \xB7 \u2605 ",
          f.rating,
          " \xB7 ",
          f.n,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { borderTop: "1px solid " + P.line, padding: "10px 24px", display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--mono)", fontSize: 10, color: P.soft }, children: [
        /* @__PURE__ */ jsxs5("span", { children: [
          f.host,
          ".samosite.online"
        ] }),
        /* @__PURE__ */ jsx5("span", { children: "\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" })
      ] })
    ] })
  ] });
}
function SkeletonDemo({ height }) {
  const L = (w, h, extra) => /* @__PURE__ */ jsx5("span", { className: "ss-skel", style: { display: "block", width: w, height: h || 12, ...extra || {} } });
  return /* @__PURE__ */ jsxs5("div", { style: { height, background: "#fff", display: "flex", flexDirection: "column" }, "aria-label": "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u0440\u2026", children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderBottom: "1px solid var(--line)", background: "var(--bone)", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { display: "inline-flex", gap: 5 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx5("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--line-2)" } }, i)) }),
      /* @__PURE__ */ jsx5("span", { style: { flex: 1, display: "flex", justifyContent: "center" }, children: L(130, 18) }),
      /* @__PURE__ */ jsx5("span", { style: { width: 31 } })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { flex: 1, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }, children: [
      L("34%", 10),
      L("82%", 28),
      L("60%", 28),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 11, marginTop: 6 }, children: [
        L("100%", 13),
        L("100%", 13),
        L("90%", 13)
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 12, marginTop: 6, alignItems: "center" }, children: [
        L(118, 36),
        L(90, 11)
      ] }),
      /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-45)", textAlign: "center", marginTop: 4 }, children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u0440\u2026" })
    ] })
  ] });
}
function In2_StepExample({ niche = "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", onNicheChange, loading, onClaim, mobile }) {
  const other = niche === "\u0414\u0440\u0443\u0433\u043E\u0435";
  return /* @__PURE__ */ jsxs5("div", { "data-intake-step": "example", style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs5("div", { role: "tablist", "aria-label": "\u0422\u0438\u043F \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438", style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: [
      NICHE_ORDER.map((n) => /* @__PURE__ */ jsx5("button", { type: "button", role: "tab", "aria-selected": niche === n, "data-niche-id": n, onClick: () => onNicheChange && onNicheChange(n), className: "chip" + (niche === n ? " is-active" : ""), style: { fontSize: 14.5 }, children: n }, n)),
      /* @__PURE__ */ jsx5("button", { type: "button", role: "tab", "aria-selected": other, "data-niche-id": "\u0414\u0440\u0443\u0433\u043E\u0435", onClick: () => onNicheChange && onNicheChange("\u0414\u0440\u0443\u0433\u043E\u0435"), className: "chip chip--other" + (other ? " is-active" : ""), style: { fontSize: 14.5 }, children: "\u0414\u0440\u0443\u0433\u043E\u0435" })
    ] }),
    other ? /* @__PURE__ */ jsxs5("div", { style: { padding: "30px 22px", textAlign: "center", border: "1px dashed var(--line-2)", background: "var(--bone)" }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)", marginBottom: 8 }, children: "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u043F\u043E\u0434 \u0432\u0430\u0448\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" }),
      /* @__PURE__ */ jsx5("p", { style: { ...S.hint, maxWidth: 380, margin: "0 auto" }, children: "\u0414\u0438\u0437\u0430\u0439\u043D \u0438 \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u043E\u0434\u0441\u0442\u0440\u043E\u0438\u043C \u043F\u043E\u0434 \u0432\u0430\u0448\u0438 \u0440\u0430\u0431\u043E\u0442\u044B \u2014 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0432\u044B\u0448\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442, \u043A\u0430\u043A \u044D\u0442\u043E \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0443 \u0431\u044C\u044E\u0442\u0438-\u043C\u0430\u0441\u0442\u0435\u0440\u043E\u0432." })
    ] }) : mobile ? /* @__PURE__ */ jsx5("div", { style: { margin: "2px -18px -20px", padding: "16px 18px 0", background: "#E9E0CD", borderTop: "1px solid var(--line-2)" }, children: /* @__PURE__ */ jsx5("div", { style: { overflow: "hidden" }, children: loading ? /* @__PURE__ */ jsx5(SkeletonDemo, { height: 452 }) : /* @__PURE__ */ jsx5(DemoSite, { niche, height: 452 }) }) }) : /* @__PURE__ */ jsx5("div", { style: { margin: "2px -32px -26px", padding: "24px 32px 0", background: "#E9E0CD", borderTop: "1px solid var(--line-2)" }, children: /* @__PURE__ */ jsx5("div", { style: { maxWidth: 830, margin: "0 auto", overflow: "hidden" }, children: loading ? /* @__PURE__ */ jsx5(SkeletonDemo, { height: 520 }) : /* @__PURE__ */ jsx5(DemoSite, { niche, height: 520 }) }) })
  ] });
}
function In2_StepExampleFooter({ onClaim }) {
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs5("button", { className: "btn btn--block", type: "button", "data-cta": "claim-example", onClick: onClaim, children: [
      "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u0434\u043B\u044F \u043C\u0435\u043D\u044F ",
      /* @__PURE__ */ jsx5("span", { className: "arw", children: "\u2192" })
    ] }),
    /* @__PURE__ */ jsx5("span", { style: { textAlign: "center", fontSize: 13, color: "var(--ink-70)" }, children: "\u041C\u0435\u043D\u044C\u0448\u0435 \u043C\u0438\u043D\u0443\u0442\u044B. \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B" })
  ] });
}
function AltList({ title, mode, onPick, exclude }) {
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsx5("span", { style: S.label, children: title }),
    ["name", "screenshot", "link", "photo"].filter((id) => id !== exclude).map((id) => /* @__PURE__ */ jsx5(AltPath, { icon: ALT_PATHS[id].icon, label: ALT_PATHS[id].label, sub: ALT_PATHS[id].sub, active: id === mode, "data-source-path": id, onClick: () => onPick(id) }, id))
  ] });
}
function In2_StepSource(props) {
  const { path = "name", onPathChange, name = "", city = "", onName, onCity, openCity, link = "", onLink, screenshotName = "", onScreenshot, photos = 0, onPhotos, refineHint, niche = "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", mobile } = props;
  let pane = null, cta = null;
  if (path === "name") {
    pane = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      refineHint && /* @__PURE__ */ jsx5("div", { style: { border: "1px solid #DFC391", background: "#F8F1E1", color: "#8A5A24", padding: "10px 13px", fontSize: 13.5, lineHeight: 1.45 }, children: "\u0421\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441 \u0432\u044B\u0432\u0435\u0441\u043A\u043E\u0439 \u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0433\u043E\u0440\u043E\u0434 \u2014 \u0442\u0430\u043A \u043D\u0430\u0439\u0434\u0451\u043C \u0442\u043E\u0447\u043D\u0435\u0435." }),
      /* @__PURE__ */ jsx5(Field, { label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u043B\u0430", children: /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsx5("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "m20 20-3.5-3.5"], size: 17 }) }),
        /* @__PURE__ */ jsx5("input", { style: { ...S.input, paddingLeft: 36 }, value: name, placeholder: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B", onChange: (e) => onName && onName(e.target.value) })
      ] }) }),
      /* @__PURE__ */ jsx5(Field, { label: "\u0413\u043E\u0440\u043E\u0434 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", children: /* @__PURE__ */ jsx5(CityInput, { value: city, onChange: (v) => onCity && onCity(v), forceOpen: openCity }) })
    ] });
    cta = /* @__PURE__ */ jsx5(Cta, { ok: !!name.trim(), onClick: props.onSubmit, missing: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", "data-cta": "source-next", children: "\u041D\u0430\u0439\u0442\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445" });
  } else if (path === "screenshot") {
    pane = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsx5(Uploader, { label: "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438", sub: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435, \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 (Ctrl+V) \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B", accept: "image/*", icon: /* @__PURE__ */ jsx5(Icon, { d: ["M3 4.5h18v15H3z", "m3 15 5-5 4 4 3-3 6 6"], size: 20 }), initial: screenshotName ? [{ name: screenshotName, size: 1363149 }] : [], onFiles: (arr) => onScreenshot && onScreenshot(arr[0] ? arr[0].name : "") }, "shot"),
      /* @__PURE__ */ jsx5("p", { style: S.hint, children: "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434 \u2014 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0435 \u0432\u0430\u0436\u043D\u043E. \u041D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u043C \u2014 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043C \u0432\u0432\u0435\u0441\u0442\u0438 \u0440\u0443\u043A\u0430\u043C\u0438." })
    ] });
    cta = /* @__PURE__ */ jsx5(Cta, { ok: !!screenshotName, onClick: props.onSubmit, missing: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442", "data-cta": "source-next", children: "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443" });
  } else if (path === "link") {
    const li = linkInfo(link);
    const linkOk = li.state === "ok" || li.state === "unknown";
    const lf = DEMO_FIX[niche] || DEMO_FIX["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
    pane = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx5(Field, { label: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044C", children: /* @__PURE__ */ jsx5(LinkInput, { value: link, onChange: (v) => onLink && onLink(v) }) }),
      li.state === "ok" && /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", border: "1px solid var(--line)", background: "var(--bone)" }, children: [
        /* @__PURE__ */ jsx5("img", { src: demoSrc(lf.img, 120), alt: "", style: { width: 46, height: 46, objectFit: "cover", flex: "none", border: "1px solid var(--line-2)" } }),
        /* @__PURE__ */ jsxs5("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ jsxs5("div", { style: { fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }, children: [
            lf.brand,
            " ",
            /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--line-2)", padding: "2px 8px", marginLeft: 6, verticalAlign: "2px" }, children: li.provider })
          ] }),
          /* @__PURE__ */ jsx5("div", { style: { fontSize: 12.5, color: "var(--ink-45)", marginTop: 2 }, children: "\u041F\u043E\u0434\u0442\u044F\u043D\u0435\u043C \u043E\u0442\u0441\u044E\u0434\u0430 \u0444\u043E\u0442\u043E, \u0443\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B" })
        ] })
      ] })
    ] });
    cta = /* @__PURE__ */ jsx5(Cta, { ok: linkOk, onClick: props.onSubmit, missing: li.state === "invalid" ? "\u0440\u0430\u0431\u043E\u0447\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430" : "\u0441\u0441\u044B\u043B\u043A\u0430", "data-cta": "source-next", children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435" });
  } else {
    pane = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsx5(Uploader, { label: "\u0424\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \u0438\u043B\u0438 \u043F\u0440\u0430\u0439\u0441\u0430", sub: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435, \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 (Ctrl+V) \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043E 5 \u0444\u043E\u0442\u043E", multiple: true, accept: "image/*", icon: /* @__PURE__ */ jsx5(Icon, { d: ["M3 4.5h18v15H3z", "M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3", "m21 16-5-5-8 8"], size: 20 }), initial: photos ? Array.from({ length: Math.min(photos, 5) }, (_, i) => ({ name: "\u0424\u043E\u0442\u043E " + (i + 1), size: [2516582, 1887436, 3250585, 2306867, 1677722][i] })) : [], onFiles: (arr) => onPhotos && onPhotos(arr.length) }, "ph"),
      /* @__PURE__ */ jsx5("p", { style: S.hint, children: "\u041D\u0435\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u043F\u0440\u0430\u0439\u0441 \u043D\u0435 \u043F\u043E\u043C\u0435\u0448\u0430\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u2014 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043C \u043F\u0435\u0440\u0435\u0441\u043D\u044F\u0442\u044C \u0443\u0436\u0435 \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435." })
    ] });
    cta = /* @__PURE__ */ jsx5(Cta, { ok: !!photos, onClick: props.onSubmit, missing: "\u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E \u0444\u043E\u0442\u043E", "data-cta": "source-next", children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u0444\u043E\u0442\u043E" });
  }
  const alts = /* @__PURE__ */ jsx5(AltList, { title: "\u0421\u043F\u043E\u0441\u043E\u0431\u044B", mode: path, onPick: (id) => onPathChange && onPathChange(id) });
  return {
    body: /* @__PURE__ */ jsx5("div", { "data-intake-step": "source", children: mobile ? /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: [
      pane,
      /* @__PURE__ */ jsx5("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 16 }, children: alts })
    ] }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx5("div", { style: { flex: 1.25, minWidth: 0 }, children: pane }),
      /* @__PURE__ */ jsx5("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: alts })
    ] }) }),
    footer: cta
  };
}
function In2_StepNotFound({ path = "name", name = "", city = "", onPick, onRetry, mobile }) {
  const shot = path === "screenshot";
  const text = /* @__PURE__ */ jsx5("p", { style: S.hint, children: shot ? "\u041D\u0435 \u0441\u043C\u043E\u0433\u043B\u0438 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u0430 \u2014 \u0442\u0430\u043A\u043E\u0435 \u0431\u044B\u0432\u0430\u0435\u0442 \u0441 \u043E\u0431\u0440\u0435\u0437\u0430\u043D\u043D\u044B\u043C\u0438 \u043A\u0430\u0434\u0440\u0430\u043C\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u0441\u043F\u043E\u0441\u043E\u0431: \u0432\u0441\u0451, \u0447\u0442\u043E \u0432\u044B \u0432\u0432\u0435\u043B\u0438, \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E." : "\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \xAB" + ((name || "").trim() || "\u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F") + "\xBB" + (city ? " \xB7 " + city : "") + " \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445 \u0438 \u0432 2\u0413\u0418\u0421. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u2014 \u0438\u043B\u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u0441 \u0434\u0440\u0443\u0433\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B." });
  const alts = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsx5("span", { style: S.label, children: "\u0414\u0440\u0443\u0433\u0438\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B" }),
    !shot && /* @__PURE__ */ jsx5(AltPath, { icon: ALT_PATHS.screenshot.icon, label: ALT_PATHS.screenshot.label, sub: ALT_PATHS.screenshot.sub, "data-source-path": "screenshot", onClick: () => onPick("screenshot") }),
    /* @__PURE__ */ jsx5(AltPath, { icon: ALT_PATHS.link.icon, label: ALT_PATHS.link.label, sub: ALT_PATHS.link.sub, "data-source-path": "link", onClick: () => onPick("link") }),
    /* @__PURE__ */ jsx5(AltPath, { icon: ALT_PATHS.photo.icon, label: ALT_PATHS.photo.label, sub: ALT_PATHS.photo.sub, "data-source-path": "photo", onClick: () => onPick("photo") })
  ] });
  return {
    body: /* @__PURE__ */ jsx5("div", { "data-intake-step": "source", children: mobile ? /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: [
      text,
      /* @__PURE__ */ jsx5("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 16 }, children: alts })
    ] }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx5("div", { style: { flex: 1.25, minWidth: 0 }, children: text }),
      /* @__PURE__ */ jsx5("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: alts })
    ] }) }),
    footer: /* @__PURE__ */ jsxs5("button", { className: "btn btn--block", type: "button", "data-cta": "source-next", onClick: onRetry, children: [
      shot ? "\u0412\u0432\u0435\u0441\u0442\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0440\u0443\u043A\u0430\u043C\u0438" : "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434",
      " ",
      /* @__PURE__ */ jsx5("span", { className: "arw", children: "\u2192" })
    ] })
  };
}
function In2_StepRecognize({ onCancel }) {
  return {
    body: /* @__PURE__ */ jsxs5("div", { "data-intake-step": "recognize", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "32px 0" }, children: [
      /* @__PURE__ */ jsx5("div", { className: "ss-spin", style: { width: 46, height: 46, borderRadius: "50%", border: "3px solid var(--line-2)", borderTopColor: "var(--accent)" } }),
      /* @__PURE__ */ jsx5("p", { style: { ...S.hint, textAlign: "center" }, children: "\u0427\u0438\u0442\u0430\u0435\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434 \u0441\u043E \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u0430, \u0438\u0449\u0435\u043C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445\u2026" })
    ] }),
    footer: /* @__PURE__ */ jsx5("button", { className: "tlink", type: "button", onClick: onCancel, style: { display: "block", margin: "0 auto", fontWeight: 500, color: "var(--ink-45)" }, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" })
  };
}
function In2_StepConfirmCard({ candidates = [], selectedId = 0, onSelect, onConfirm, onReject, path, mobile }) {
  return {
    body: /* @__PURE__ */ jsxs5("div", { "data-intake-step": "confirm", style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx5("p", { style: S.hint, children: path === "screenshot" ? "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0438 \u043D\u0430\u0448\u043B\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0448\u0443:" : "\u041D\u0430\u0448\u043B\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0448\u0443:" }),
      /* @__PURE__ */ jsx5("div", { role: "radiogroup", "aria-label": "\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438", style: { display: mobile ? "flex" : "grid", flexDirection: "column", gridTemplateColumns: "1fr 1fr", gap: 10, alignItems: "stretch" }, children: candidates.map((c, i) => {
        const on = i === selectedId;
        return /* @__PURE__ */ jsxs5("button", { type: "button", role: "radio", "aria-checked": on, "data-candidate-idx": i, onClick: () => onSelect && onSelect(i), style: { position: "relative", textAlign: "left", padding: "15px 16px", border: on ? "1.5px solid var(--accent)" : "1px solid var(--line-2)", background: on ? "var(--bone)" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6, font: "inherit", transition: "border-color .14s, background .14s" }, children: [
          /* @__PURE__ */ jsx5("span", { style: { position: "absolute", top: 12, right: 12, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-45)", border: "1px solid var(--line-2)", background: "#fff", padding: "3px 7px" }, children: c.source }),
          /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--display)", fontSize: 21, color: "var(--ink)", paddingRight: 92, lineHeight: 1.05 }, children: c.brand }),
          /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", gap: 8, color: "var(--ink-70)", fontSize: 14 }, children: [
            /* @__PURE__ */ jsx5(Icon, { d: ["M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z", "M12 10.2a2.2 2.2 0 1 0 0-.1"], size: 15, sw: 2 }),
            " ",
            c.address
          ] }),
          /* @__PURE__ */ jsxs5("span", { style: { fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink)" }, children: [
            "\u2605 ",
            c.rating,
            " \xB7 ",
            c.reviewsN,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
          ] })
        ] }, i);
      }) })
    ] }),
    footer: /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsxs5("button", { className: "btn btn--block", type: "button", "data-cta": "card-confirm", onClick: onConfirm, children: [
        "\u0414\u0430, \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C ",
        /* @__PURE__ */ jsx5("span", { className: "arw", children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsx5("button", { className: "tlink", type: "button", onClick: onReject, style: { alignSelf: "center", fontWeight: 500, color: "var(--ink-45)" }, children: "\u041D\u0438\u0447\u0435\u0433\u043E \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u2014 \u0438\u0441\u043A\u0430\u0442\u044C \u0435\u0449\u0451" })
    ] })
  };
}
function In2_StepBooking({ platform = "dikidi", onPlatformChange, url = "", onUrl, phone = "", onPhone, mobile }) {
  const showUrl = platform === "dikidi" || platform === "yclients";
  const showPhone = platform === "phone";
  const ui = bookingUrlInfo(url);
  const phoneOk = !showPhone || (phone || "").trim() === "" || (phone || "").replace(/\D/g, "").length === 11;
  const bok = !!platform && (showUrl ? ui.state !== "invalid" : true) && phoneOk;
  const form = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsx5("p", { style: S.hint, children: "\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0441\u0442\u0430\u0432\u0438\u043C \u0432\u0430\u0448\u0435\u0439: \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u0432\u0435\u0434\u0451\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0432\u0430\u043C \u0443\u0434\u043E\u0431\u043D\u043E." }),
    /* @__PURE__ */ jsx5("div", { role: "radiogroup", "aria-label": "\u041A\u0430\u043A \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0435\u0441\u044C", style: { display: "flex", flexWrap: "wrap", gap: 9 }, children: BOOKING.map((b) => /* @__PURE__ */ jsx5(Chip, { active: platform === b.id, "data-booking-platform": b.id, onClick: () => onPlatformChange && onPlatformChange(b.id), children: b.label }, b.id)) }),
    showUrl && /* @__PURE__ */ jsx5(BookingLink, { value: url, onChange: (v) => onUrl && onUrl(v) }),
    showPhone && /* @__PURE__ */ jsx5(BookingPhone, { value: phone, onChange: (v) => onPhone && onPhone(v) }),
    platform === "none" && /* @__PURE__ */ jsx5("p", { style: { ...S.hint, fontSize: 13.5, color: "var(--ink-45)" }, children: "\u041D\u0435 \u0441\u0442\u0440\u0430\u0448\u043D\u043E: \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u043C \u043A\u043D\u043E\u043F\u043A\u0443 \xAB\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C\xBB \u2014 \u0437\u0430\u044F\u0432\u043A\u0438 \u043F\u0440\u0438\u0434\u0443\u0442 \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440." })
  ] });
  const aside = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    /* @__PURE__ */ jsx5("span", { style: S.label, children: "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442" }),
    [["01", "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB"], ["02", "\u041E\u043D\u0430 \u0432\u0435\u0434\u0451\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0432\u044B \u0443\u0436\u0435 \u0432\u0435\u0434\u0451\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C"], ["03", "\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u0441\u043F\u043E\u0441\u043E\u0431 \u043C\u043E\u0436\u043D\u043E \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442"]].map((r) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", flex: "none" }, children: r[0] }),
      /* @__PURE__ */ jsx5("span", { style: { fontSize: 14.5, color: "var(--ink-70)" }, children: r[1] })
    ] }, r[0]))
  ] });
  return {
    body: /* @__PURE__ */ jsx5("div", { "data-intake-step": "booking", children: mobile ? form : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx5("div", { style: { flex: 1.25, minWidth: 0 }, children: form }),
      /* @__PURE__ */ jsx5("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: aside })
    ] }) }),
    footer: /* @__PURE__ */ jsx5(Cta, { ok: bok, onClick: (props) => {
    }, missing: !platform ? "\u0432\u044B\u0431\u0440\u0430\u0442\u044C, \u043A\u0430\u043A \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0435\u0441\u044C" : showPhone ? "\u043D\u043E\u043C\u0435\u0440 \u0446\u0435\u043B\u0438\u043A\u043E\u043C \u2014 \u0438\u043B\u0438 \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u0435 \u043F\u043E\u043B\u0435" : "\u0440\u0430\u0431\u043E\u0447\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 \u2014 \u0438\u043B\u0438 \u043E\u0447\u0438\u0441\u0442\u0438\u0442\u0435 \u043F\u043E\u043B\u0435", "data-cta": "booking-next", children: "\u0414\u0430\u043B\u044C\u0448\u0435" }),
    bok
  };
}
function In2_StepContacts({ channel = "Telegram", onChannel, contact = "", onContact, consent = false, onConsent, submitError, hrefs, touched, mobile }) {
  const okContact = contactValid(channel, contact);
  const ok = okContact && consent;
  const missing = [okContact ? null : "\u043A\u043E\u043D\u0442\u0430\u043A\u0442", consent ? null : "\u0441\u043E\u0433\u043B\u0430\u0441\u0438\u0435"].filter(Boolean).join(" \u0438 ");
  const aStyle = { color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 2 };
  const H = hrefs || { politika: "docs/politika.html", oferta: "docs/oferta.html" };
  const form = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsx5("p", { style: S.hint, children: "\u0413\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E \u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C. \u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \xAB\u0434\u0430\xBB." }),
    /* @__PURE__ */ jsx5("div", { role: "radiogroup", "aria-label": "\u041A\u0430\u043D\u0430\u043B \u0441\u0432\u044F\u0437\u0438", style: { display: "flex", flexWrap: "wrap", gap: 9 }, children: CHANNELS.map((c) => /* @__PURE__ */ jsx5(Chip, { active: channel === c, "data-contact-channel": c, onClick: () => onChannel && onChannel(c), children: c }, c)) }),
    /* @__PURE__ */ jsx5(ContactInput, { channel, value: contact, onChange: (v) => onContact && onContact(v), initialTouched: touched }),
    /* @__PURE__ */ jsxs5("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13.5, color: "var(--ink-70)" }, children: [
      /* @__PURE__ */ jsx5("input", { type: "checkbox", checked: consent, onChange: (e) => onConsent && onConsent(e.target.checked), style: { marginTop: 2, accentColor: "var(--accent)", width: 17, height: 17 } }),
      /* @__PURE__ */ jsxs5("span", { children: [
        "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 ",
        /* @__PURE__ */ jsx5("a", { href: H.politika, target: "_blank", rel: "noopener", style: aStyle, children: "\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }),
        " \u0438 \u0441 ",
        /* @__PURE__ */ jsx5("a", { href: H.oferta, target: "_blank", rel: "noopener", style: aStyle, children: "\u043E\u0444\u0435\u0440\u0442\u043E\u0439" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--ink-45)" }, children: [
      /* @__PURE__ */ jsx5(Icon, { d: ["M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z", "m9 12 2 2 4-4"], size: 15, sw: 1.8 }),
      " \u041E\u0442 \u0440\u043E\u0431\u043E\u0442\u043E\u0432 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u0442 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u2014 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E"
    ] }),
    submitError && /* @__PURE__ */ jsxs5("div", { role: "alert", style: { display: "flex", alignItems: "flex-start", gap: 9, border: "1px solid #D98A8A", background: "#FAEFEE", padding: "11px 13px", fontSize: 13.5, lineHeight: 1.45, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx5("span", { style: { flex: "none", marginTop: 1 }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 16, sw: 2 }) }),
      /* @__PURE__ */ jsx5("span", { children: "\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u2014 \u0444\u043E\u0440\u043C\u0430 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0430, \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E." })
    ] })
  ] });
  const aside = /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    /* @__PURE__ */ jsx5("span", { style: S.label, children: "\u0427\u0442\u043E \u0434\u0430\u043B\u044C\u0448\u0435" }),
    [["01", "\u041F\u0440\u0438\u0448\u043B\u0451\u043C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u2014 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435"], ["02", "\u0421\u043A\u0430\u0436\u0435\u0442\u0435 \xAB\u0434\u0430\xBB \u2014 \u0438\u043B\u0438 \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C"], ["03", "\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C. \u0410\u0434\u0440\u0435\u0441 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C \u2014 \u0432\u0430\u0448\u0438"]].map((r) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", flex: "none" }, children: r[0] }),
      /* @__PURE__ */ jsx5("span", { style: { fontSize: 14.5, color: "var(--ink-70)" }, children: r[1] })
    ] }, r[0])),
    /* @__PURE__ */ jsx5("p", { style: { fontSize: 12.5, color: "var(--ink-45)", marginTop: 4 }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u043D\u0443\u0436\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430 \u2014 \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A." })
  ] });
  return {
    body: /* @__PURE__ */ jsx5("div", { "data-intake-step": "contacts", children: mobile ? form : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx5("div", { style: { flex: 1.25, minWidth: 0 }, children: form }),
      /* @__PURE__ */ jsx5("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: aside })
    ] }) }),
    footer: /* @__PURE__ */ jsx5(Cta, { ok, onClick: (props) => {
    }, missing, "data-cta": "submit", children: submitError ? "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443" : "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u2192" }),
    ok
  };
}
function In2_StepDone({ channel = "Telegram", contact = "@anna_nails", onEditContact, onClose, foundCard, mobile }) {
  return {
    body: /* @__PURE__ */ jsxs5("div", { "data-intake-step": "done", style: { display: "flex", flexDirection: "column", gap: 18, padding: "4px 0 2px", maxWidth: 520, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 13, textAlign: "center" }, children: [
        /* @__PURE__ */ jsx5("span", { style: { width: 62, height: 62, borderRadius: "50%", background: "var(--accent)", color: "var(--on-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx5(Icon, { d: ["M20 6 9 17l-5-5"], size: 30, sw: 2.4 }) }),
        /* @__PURE__ */ jsx5("h3", { style: { fontFamily: "var(--display)", fontSize: 26, color: "var(--ink)" }, children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0432\u0430\u0448 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }),
        /* @__PURE__ */ jsxs5("p", { style: { ...S.hint, maxWidth: 400 }, children: [
          "\u041F\u0440\u0438\u0448\u043B\u0451\u043C \u0432 ",
          channel,
          contact ? " \u043D\u0430 " + contact : "",
          " \u043F\u0440\u0438\u043C\u0435\u0440\u043D\u043E \u0447\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430.",
          " ",
          /* @__PURE__ */ jsx5("button", { className: "tlink", type: "button", onClick: onEditContact, style: { fontWeight: 600, color: "var(--accent)" }, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }, children: [
        /* @__PURE__ */ jsx5("span", { style: S.label, children: "\u0427\u0442\u043E \u0434\u0430\u043B\u044C\u0448\u0435" }),
        [["01", "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435"], ["02", "\u0421\u043A\u0430\u0436\u0435\u0442\u0435 \xAB\u0434\u0430\xBB \u2014 \u0438\u043B\u0438 \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C"], ["03", "\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C. \u0410\u0434\u0440\u0435\u0441 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C \u2014 \u0432\u0430\u0448\u0438"]].map((r) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
          /* @__PURE__ */ jsx5("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", flex: "none" }, children: r[0] }),
          /* @__PURE__ */ jsx5("span", { style: { fontSize: 14.5, color: "var(--ink-70)" }, children: r[1] })
        ] }, r[0]))
      ] }),
      foundCard && /* @__PURE__ */ jsxs5("p", { style: { fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink-70)" }, children: [
        "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430: ",
        foundCard.brand
      ] })
    ] }),
    footer: /* @__PURE__ */ jsx5("button", { className: "btn btn--block", type: "button", "data-cta": "done-close", onClick: onClose, children: "\u041F\u043E\u043D\u044F\u0442\u043D\u043E" })
  };
}
function In2_Modal({ step, title, canBack, onBack, onClose, progress, restored, onDraftReset, submitError, onRetry, closeConfirm, onConfirmClose, onCancelClose, body, footer, footerOverride, mobile, embedded }) {
  const cardMax = 960;
  const outer = embedded ? { position: "relative", height: "100%", display: "flex", alignItems: "stretch", justifyContent: "center", background: "transparent" } : { position: "fixed", inset: 0, zIndex: 200, background: "rgba(27,23,18,.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: mobile ? "flex-end" : "center", justifyContent: "center" };
  const sheet = embedded ? { width: "100%", height: "100%", background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" } : { width: mobile ? "100%" : "min(" + cardMax + "px, calc(100vw - 40px))", maxHeight: mobile ? "94vh" : "90vh", background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" };
  return /* @__PURE__ */ jsx5("div", { className: "in2", style: outer, role: "dialog", "aria-modal": "true", "aria-label": "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442", children: /* @__PURE__ */ jsxs5("div", { style: sheet, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--line)", flex: "0 0 auto" }, children: [
      canBack ? /* @__PURE__ */ jsx5("button", { className: "ss-iconbtn", type: "button", onClick: onBack, "aria-label": "\u041D\u0430\u0437\u0430\u0434", children: /* @__PURE__ */ jsx5(Icon, { d: ["M15 18l-6-6 6-6"], size: 20, sw: 2 }) }) : /* @__PURE__ */ jsx5("span", { style: { width: 38 } }),
      /* @__PURE__ */ jsx5("div", { style: { flex: 1, minWidth: 0, textAlign: "center" }, children: title ? /* @__PURE__ */ jsx5("div", { style: { fontFamily: "var(--display)", fontWeight: 700, fontSize: mobile ? 21 : 24, lineHeight: 1.04, letterSpacing: "-.01em", color: "var(--ink)" }, children: title }) : null }),
      /* @__PURE__ */ jsx5("button", { className: "ss-iconbtn", type: "button", onClick: onClose, "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", children: /* @__PURE__ */ jsx5(Icon, { d: ["M18 6 6 18", "m6 6 12 12"], size: 20, sw: 2 }) })
    ] }),
    progress != null && /* @__PURE__ */ jsx5("div", { style: { height: 3, background: "var(--line)", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx5("div", { style: { height: "100%", width: progress * 100 + "%", background: "var(--accent)", transition: "width .3s cubic-bezier(.2,.7,.3,1)" } }) }),
    /* @__PURE__ */ jsxs5("div", { style: { padding: mobile ? "20px 18px" : "26px 32px", overflowY: "auto", flex: 1 }, children: [
      restored && /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--bone)", border: "1px solid var(--line-2)", padding: "9px 12px", marginBottom: 16, fontSize: 13.5, color: "var(--ink-70)" }, children: [
        /* @__PURE__ */ jsxs5("span", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx5(Icon, { d: ["M3 12a9 9 0 1 0 3-6.7", "M3 4v5h5"], size: 15, sw: 2 }),
          " \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430"
        ] }),
        /* @__PURE__ */ jsx5("button", { className: "tlink", type: "button", onClick: onDraftReset, style: { fontSize: 13, fontWeight: 500, color: "var(--ink-45)", whiteSpace: "nowrap" }, children: "\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E" })
      ] }),
      body
    ] }),
    footer && /* @__PURE__ */ jsx5("div", { style: { padding: mobile ? "14px 18px" : "16px 26px 22px", borderTop: "1px solid var(--line)", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx5("div", { style: { maxWidth: mobile ? "none" : 460, margin: "0 auto" }, children: footer }) }),
    closeConfirm && /* @__PURE__ */ jsx5("div", { style: { position: "absolute", inset: 0, zIndex: 6, background: "rgba(251,249,244,.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }, role: "alertdialog", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u043C\u0443?", children: /* @__PURE__ */ jsxs5("div", { style: { textAlign: "center", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx5("h3", { style: { fontFamily: "var(--display)", fontWeight: 700, fontSize: 26, color: "var(--ink)" }, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u043C\u0443?" }),
      /* @__PURE__ */ jsx5("p", { style: { ...S.hint, marginBottom: 10 }, children: "\u0412\u0432\u043E\u0434 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u043B\u0438 \u2014 \u043A\u043E\u0433\u0434\u0430 \u0432\u0435\u0440\u043D\u0451\u0442\u0435\u0441\u044C, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435 \u0441 \u044D\u0442\u043E\u0433\u043E \u0436\u0435 \u043C\u0435\u0441\u0442\u0430." }),
      /* @__PURE__ */ jsx5("button", { className: "btn btn--block", type: "button", onClick: onCancelClose, children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435" }),
      /* @__PURE__ */ jsx5("button", { className: "tlink", type: "button", onClick: onConfirmClose, style: { marginTop: 6, fontWeight: 500, color: "var(--ink-45)" }, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" })
    ] }) })
  ] }) });
}

// src/intake/index.tsx
import { Fragment as Fragment4, jsx as jsx6, jsxs as jsxs6 } from "react/jsx-runtime";
function ModalShell({ children, width = 540, intakeStep }) {
  return /* @__PURE__ */ jsx6("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs6("div", { "data-intake-step": intakeStep, style: {
    width,
    maxWidth: "100%",
    background: VT.bg,
    borderRadius: VT.r.xl,
    boxShadow: VT.shadow.pop,
    padding: 28,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx6("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs6(Fragment4, { children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && showBack && /* @__PURE__ */ jsxs6("button", { style: {
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
        /* @__PURE__ */ jsx6("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      /* @__PURE__ */ jsxs6(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        step,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx6("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < step ? VT.accent : VT.line
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx6("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx6("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
function SvgLink() {
  return /* @__PURE__ */ jsxs6("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx6("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" }),
    /* @__PURE__ */ jsx6("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" })
  ] });
}
function SvgPaperclip() {
  return /* @__PURE__ */ jsx6("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" }) });
}
function ModeSwitcher({ mode = "link", onModeChange }) {
  const tab = (id, label, icon) => {
    const active = mode === id;
    return /* @__PURE__ */ jsxs6(
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
          /* @__PURE__ */ jsx6("span", { style: { fontSize: 15, display: "inline-flex" }, children: icon }),
          label
        ]
      },
      id
    );
  };
  return /* @__PURE__ */ jsxs6("div", { role: "tablist", "aria-label": "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430", style: {
    display: "flex",
    gap: 4,
    padding: 4,
    background: VT.bgSoft,
    border: `1px solid ${VT.line}`,
    borderRadius: 999,
    marginTop: 18
  }, children: [
    tab("link", "\u0421\u0441\u044B\u043B\u043A\u0430", /* @__PURE__ */ jsx6(SvgLink, {})),
    tab("photo", "\u0424\u043E\u0442\u043E", /* @__PURE__ */ jsx6(SvgPaperclip, {}))
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
    return /* @__PURE__ */ jsxs6("div", { style: {
      padding: "12px 14px",
      background: VT.successSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.32 0.12 145)"
    }, children: [
      /* @__PURE__ */ jsx6("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M5 12l4 4 10-10" }) }),
      /* @__PURE__ */ jsxs6("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx6("b", { children: meta.label }),
        counts ? /* @__PURE__ */ jsxs6("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx6("button", { onClick: onCorrect, style: {
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
    return /* @__PURE__ */ jsxs6("div", { style: {
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.36 0.10 240)"
    }, children: [
      /* @__PURE__ */ jsx6("span", { style: { fontSize: 16 }, children: meta.icon }),
      /* @__PURE__ */ jsxs6("span", { children: [
        /* @__PURE__ */ jsx6("b", { children: meta.label }),
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A \u0434\u043E\u0431\u0430\u0432\u0438\u043C."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs6("div", { style: {
    padding: "12px 14px",
    background: VT.warnSoft,
    borderRadius: VT.r.md,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13.5,
    color: "oklch(0.42 0.13 70)"
  }, children: [
    /* @__PURE__ */ jsx6("span", { style: { fontSize: 16 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsx6("span", { children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0444\u043E\u0442\u043E \u2192" })
  ] });
}
function LinkInput2({ value, placeholder = "https://...", onChange, loading = false }) {
  const empty = !value;
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: VT.white,
    border: `1.5px solid ${empty ? VT.line : VT.accent}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx6(IconLink, {}),
    /* @__PURE__ */ jsx6(
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
    loading && /* @__PURE__ */ jsx6("span", { style: { color: VT.success, display: "inline-flex" }, children: /* @__PURE__ */ jsx6(Spinner, { size: 14 }) })
  ] });
}
var PHOTO_LIMITS = { minFiles: 5, maxFiles: 60, maxFileBytes: 15 * 1024 * 1024, maxTotalBytes: 200 * 1024 * 1024 };
function PhotoDropZone({ compact = false, onPick }) {
  return /* @__PURE__ */ jsxs6("div", { style: {
    border: `1.5px dashed ${VT.accent}`,
    background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
    borderRadius: VT.r.lg,
    padding: compact ? 20 : 28,
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: { fontSize: compact ? 22 : 26, marginBottom: 6 }, children: "\u{1F4F7}" }),
    /* @__PURE__ */ jsx6("div", { style: { fontSize: compact ? 14 : 15, fontWeight: 600 }, children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }),
    /* @__PURE__ */ jsx6("div", { style: { fontSize: 13, color: VT.inkSoft, margin: "4px 0 12px" }, children: "\u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \xB7 JPEG / PNG / WebP / HEIC" }),
    /* @__PURE__ */ jsx6(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" }),
    /* @__PURE__ */ jsx6("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 10, fontFamily: VT.font.mono }, children: "5\u201360 \u0444\u0430\u0439\u043B\u043E\u0432 \xB7 \u0434\u043E 15 \u041C\u0411 \u043A\u0430\u0436\u0434\u044B\u0439 \xB7 \u0434\u043E 200 \u041C\u0411 \u0432\u0441\u0435\u0433\u043E" })
  ] });
}
function PhotoThumb({ name, sizeKb = 2400, idx = 0, onRemove }) {
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
      flex: "0 0 auto"
    } }),
    /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs6("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx6("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
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
  return /* @__PURE__ */ jsxs6("div", { style: { marginTop: 14 }, children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxs6(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 ",
        files.length,
        " \u0418\u0417 ",
        PHOTO_LIMITS.maxFiles
      ] }),
      /* @__PURE__ */ jsxs6(Mono, { style: { fontSize: 11 }, children: [
        (totalKb / 1e3).toFixed(1),
        " \u041C\u0411 \xB7 \u2264 200 \u041C\u0411"
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: files.map((f, i) => /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsxs6("label", { style: {
    display: "block",
    fontSize: 13,
    color: VT.inkSoft,
    fontWeight: 500,
    marginBottom: 6
  }, children: [
    children,
    required && /* @__PURE__ */ jsx6("span", { style: { color: VT.accent, marginLeft: 4 }, children: "*" })
  ] });
}
function FieldInput({ value, placeholder, onChange, mono = false, type = "text" }) {
  return /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsxs6(
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
          /* @__PURE__ */ jsx6("span", { style: { fontSize: 14 }, children: icon }),
          label
        ]
      },
      id
    );
  };
  const ph = type === "phone" ? "+7 921 234-56-78" : "@your_handle";
  return /* @__PURE__ */ jsxs6(Fragment4, { children: [
    /* @__PURE__ */ jsxs6("div", { role: "tablist", style: {
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
    /* @__PURE__ */ jsx6(FieldInput, { value, placeholder: ph, mono: true, onChange: onValueChange })
  ] });
}
function TextFileThumb({ name, sizeKb = 240, onRemove }) {
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "8px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: {
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
    /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs6("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx6("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    border: `1.5px dashed ${VT.line}`,
    background: VT.bgSoft,
    borderRadius: VT.r.md,
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 12
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: {
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
    /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 13.5, fontWeight: 500 }, children: "\u041F\u0440\u0430\u0439\u0441, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433, FAQ" }),
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 11.5, color: VT.inkFaint, fontFamily: VT.font.mono, marginTop: 1 }, children: "PDF / DOCX / TXT / RTF \xB7 \u0434\u043E 10 \u0444\u0430\u0439\u043B\u043E\u0432" })
    ] }),
    /* @__PURE__ */ jsx6(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" })
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: VT.inkMuted,
    marginTop: 14,
    fontFamily: VT.font.mono,
    letterSpacing: "0.02em"
  }, children: [
    /* @__PURE__ */ jsx6("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx6("path", { d: "M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" }) }),
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
  return /* @__PURE__ */ jsxs6(ModalShell, { width: 540, intakeStep: "source", children: [
    /* @__PURE__ */ jsx6(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442",
        sub: `\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u2014 ${BRAND.name} \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0438 \u0437\u0430\u0431\u0435\u0440\u0451\u0442 \u0432\u0441\u0451 \u043D\u0443\u0436\u043D\u043E\u0435`
      }
    ),
    /* @__PURE__ */ jsx6(ModeSwitcher, { mode: "link", onModeChange }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx6(FieldLabel, { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }),
      /* @__PURE__ */ jsx6(
        LinkInput2,
        {
          value: url,
          placeholder: "https://t.me/studia_anna",
          onChange: onUrlChange,
          loading: !!url && !source
        }
      )
    ] }),
    source && /* @__PURE__ */ jsx6("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx6(SourceBadge, { source, counts, onCorrect }) }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: [
      /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u041F\u041E\u0414\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0415\u041C:" }),
      " ",
      "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 Telegram-\u043A\u0430\u043D\u0430\u043B \xB7 Instagram \xB7 2\u0413\u0418\u0421 \xB7 Avito \xB7 \u0432\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442"
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx6(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx6(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx6(CaptchaNotice, {})
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
  return /* @__PURE__ */ jsxs6(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx6(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442",
        sub: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u044B, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u043F\u0440\u043E\u0444\u0438\u043B\u044F, \u0444\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438 \u043C\u0435\u043D\u044E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C"
      }
    ),
    /* @__PURE__ */ jsx6(ModeSwitcher, { mode: "photo", onModeChange }),
    /* @__PURE__ */ jsx6("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx6(PhotoDropZone, { compact: !empty, onPick }) }),
    !empty && /* @__PURE__ */ jsx6(PhotoList, { files, onRemove }),
    !empty && files.length < PHOTO_LIMITS.minFiles && /* @__PURE__ */ jsxs6("div", { style: {
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
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx6(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx6(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx6(CaptchaNotice, {})
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
  return /* @__PURE__ */ jsxs6(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx6(
      StepHeader,
      {
        step: 2,
        total: 4,
        title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435",
        sub: "\u041F\u0430\u0440\u0430 \u0441\u0442\u0440\u043E\u043A, \u0447\u0442\u043E\u0431\u044B \u0418\u0418 \u0441\u043E\u0431\u0440\u0430\u043B \u0441\u0430\u0439\u0442 \u0442\u043E\u0447\u043D\u0435\u0435"
      }
    ),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx6(FieldLabel, { required: true, children: "\u0427\u0442\u043E \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435" }),
      /* @__PURE__ */ jsx6(
        FieldTextarea,
        {
          value: description,
          placeholder: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440, \u043F\u0435\u0434\u0438\u043A\u044E\u0440, \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435. 7 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430, \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435, \u0432\u044B\u0435\u0437\u0434 \u043D\u0430 \u0434\u043E\u043C",
          onChange: onDescriptionChange,
          rows: 4
        }
      )
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx6(FieldLabel, { required: true, children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx6(FieldInput, { value: city, placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A", onChange: onCityChange })
      ] }),
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx6(FieldLabel, { required: true, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435" }),
        /* @__PURE__ */ jsx6(
          CustomerContactPicker,
          {
            type: customerContactType,
            value: customerContact,
            onTypeChange: onCustomerContactTypeChange,
            onValueChange: onCustomerContactChange
          }
        ),
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 6, lineHeight: 1.4 }, children: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u041A\u0443\u0434\u0430 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432\u0430\u043C \u043B\u0438\u0447\u043D\u043E \u2014 \u0441\u043F\u0440\u043E\u0441\u0438\u043C \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0448\u0430\u0433\u0435." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx6(FieldLabel, { children: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0444\u0430\u0439\u043B\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }),
      textFiles.length === 0 ? /* @__PURE__ */ jsx6(TextFilesDropZone, { onPick: onPickTextFile }) : /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
        textFiles.map((f, i) => /* @__PURE__ */ jsx6(
          TextFileThumb,
          {
            name: f.name,
            sizeKb: f.sizeKb,
            onRemove: () => onRemoveTextFile?.(i)
          },
          i
        )),
        /* @__PURE__ */ jsx6("button", { onClick: onPickTextFile, style: {
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
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx6(
      Btn,
      {
        style: { flex: 1, opacity: ok ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx6(IconArrow, {}),
        onClick: ok ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx6(CaptchaNotice, {})
  ] });
}
function ChannelOption({ value, label, hint, icon, selected, onSelect }) {
  return /* @__PURE__ */ jsxs6(
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
        /* @__PURE__ */ jsx6("span", { style: {
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1.5px solid ${selected ? VT.accent : VT.line}`,
          background: VT.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto"
        }, children: selected && /* @__PURE__ */ jsx6("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }) }),
        /* @__PURE__ */ jsx6("span", { style: { fontSize: 16 }, children: icon }),
        /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 1 }, children: hint })
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
  return /* @__PURE__ */ jsxs6(ModalShell, { width: 540, intakeStep: "contact", children: [
    /* @__PURE__ */ jsx6(
      StepHeader,
      {
        step,
        total,
        title,
        sub
      }
    ),
    notice === "preview_failed" && /* @__PURE__ */ jsx6("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.warnSoft,
      borderRadius: VT.r.md,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "oklch(0.42 0.13 70)"
    }, children: "\u041D\u0435 \u0434\u043E\u0442\u044F\u043D\u0443\u043B\u0438\u0441\u044C \u0434\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
    notice === "preview_timeout" && /* @__PURE__ */ jsx6("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "oklch(0.36 0.10 240)"
    }, children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0438 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx6(FieldLabel, { children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
      /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
        /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6(
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
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx6(FieldLabel, { children: channel === "phone" ? "\u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0434\u043B\u044F SMS" : channel === "email" ? "\u0412\u0430\u0448 email" : channel === "max" ? "\u0412\u0430\u0448 MAX (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" }),
      /* @__PURE__ */ jsx6(FieldInput, { value: contact, placeholder: ph, mono: true, onChange: onContactChange })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx6(
      Checkbox,
      {
        checked: consent,
        onChange: (v) => onConsentChange?.(v),
        label: /* @__PURE__ */ jsx6(Fragment4, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }),
        link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
      }
    ) }),
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 20 }, children: /* @__PURE__ */ jsx6(
      Btn,
      {
        style: { flex: 1, opacity: contact && consent ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx6(IconArrow, {}),
        onClick: contact && consent ? onSubmit : void 0,
        children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"
      }
    ) }),
    /* @__PURE__ */ jsx6(CaptchaNotice, {})
  ] });
}
function SummaryRow({ label, value }) {
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "10px 0",
    borderTop: `1px solid ${VT.line}`
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: {
      flex: "0 0 130px",
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.08em",
      color: VT.inkFaint,
      paddingTop: 2
    }, children: label }),
    /* @__PURE__ */ jsx6("div", { style: { flex: 1, fontSize: 14, color: VT.ink, lineHeight: 1.45, wordBreak: "break-word" }, children: value })
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
  return /* @__PURE__ */ jsxs6(ModalShell, { width: 540, intakeStep: "confirm", children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxs6(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        total,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx6("span", { style: { width: 28, height: 4, borderRadius: 2, background: VT.accent } }, i)) })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: VT.successSoft,
      color: VT.success,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsx6("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M5 12l4 4 10-10" }) }) }),
    /* @__PURE__ */ jsx6("h2", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 8px", lineHeight: 1.15 }, children: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442" }),
    /* @__PURE__ */ jsxs6("p", { style: { fontSize: 15, lineHeight: 1.5, color: VT.inkSoft, margin: 0 }, children: [
      "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 ",
      /* @__PURE__ */ jsx6("b", { style: { color: VT.ink }, children: "2 \u0447\u0430\u0441\u043E\u0432" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 20 }, children: [
      mode === "link" && summary.url && /* @__PURE__ */ jsx6(SummaryRow, { label: "\u0421\u0421\u042B\u041B\u041A\u0410", value: /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.url }) }),
      summary.themeLabel && /* @__PURE__ */ jsx6(SummaryRow, { label: "\u0421\u0422\u0418\u041B\u042C", value: summary.themeLabel }),
      mode === "photo" && /* @__PURE__ */ jsxs6(Fragment4, { children: [
        /* @__PURE__ */ jsx6(SummaryRow, { label: "\u0424\u0410\u0419\u041B\u042B", value: `${summary.fileCount || 0} \u0444\u043E\u0442\u043E` }),
        summary.description && /* @__PURE__ */ jsx6(SummaryRow, { label: "\u041E\u041F\u0418\u0421\u0410\u041D\u0418\u0415", value: summary.description }),
        summary.city && /* @__PURE__ */ jsx6(SummaryRow, { label: "\u0413\u041E\u0420\u041E\u0414", value: summary.city }),
        summary.customerContact && /* @__PURE__ */ jsx6(SummaryRow, { label: "\u041D\u0410 \u0421\u0410\u0419\u0422\u0415", value: /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.customerContact }) }),
        summary.textFileCount > 0 && /* @__PURE__ */ jsx6(SummaryRow, { label: "\u0422\u0415\u041A\u0421\u0422\u042B", value: `${summary.textFileCount} ${pluralFiles(summary.textFileCount)}` })
      ] }),
      /* @__PURE__ */ jsx6(
        SummaryRow,
        {
          label: "\u041D\u0410\u041F\u0418\u0428\u0415\u041C \u0412\u0410\u041C",
          value: /* @__PURE__ */ jsxs6("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
            summary.contact,
            /* @__PURE__ */ jsxs6("span", { style: { color: VT.inkFaint }, children: [
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
    /* @__PURE__ */ jsx6("div", { style: { marginTop: 24 }, children: /* @__PURE__ */ jsx6(Btn, { variant: "secondary", style: { width: "100%" }, onClick: onClose, iconRight: /* @__PURE__ */ jsx6(IconArrow, {}), children: "\u041E\u043A, \u0436\u0434\u0443" }) })
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
      return /* @__PURE__ */ jsx6(
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
      return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(S3_FinalConfirm, { mode: "link", total, summary: s, onClose });
  }
  if (step === 1 && mode === "link") {
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(
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
    return /* @__PURE__ */ jsx6(S3_FinalConfirm, { mode, total, summary: s, onClose });
  }
  return /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsx6(S3_Step1_Photo, { ...props, total: 4 });
}
var Confirmation = S3_FinalConfirm;
export {
  Confirmation,
  GENERIC_THEME_OPTIONS,
  In2_CSS,
  In2_Modal,
  In2_StepBooking,
  In2_StepConfirmCard,
  In2_StepContacts,
  In2_StepDone,
  In2_StepExample,
  In2_StepExampleFooter,
  In2_StepNotFound,
  In2_StepRecognize,
  In2_StepSource,
  In2_Styles,
  NICHE_DEMO_DRAFTS,
  NICHE_LIB,
  NICHE_LIB_V2,
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