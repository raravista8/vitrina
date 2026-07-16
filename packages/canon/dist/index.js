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

// src/CanonStyles.tsx
import { jsx } from "react/jsx-runtime";
var CSS = '/* @samosite/canon \xB7 interactive styles (CANON_PACKAGE_TZ \xA72.4) */\n\n:root {\n  --accent:      #7A2B34;\n  --accent-soft: #F1E4E5;\n  --accent-ink:  #631F27;\n  --ink:         #1B1712;\n  --bg:          #F2EEE6;\n  --bg-soft:     #ECE5D9;\n}\n\n@keyframes vt-spin { to { transform: rotate(360deg); } }\n@keyframes vt-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }\n@keyframes vt-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }\n.vt-pulse { animation: vt-pulse 2s ease-in-out infinite; }\n\nhtml { scroll-behavior: smooth; }\n\n.ss-card-lift { transition: transform .2s ease-out, box-shadow .2s ease-out; will-change: transform; }\n.ss-card-lift:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -14px rgba(120,60,30,0.18); }\n\n.ss-story-card { transition: transform .2s ease-out; will-change: transform; }\n.ss-story-card:hover { transform: translateY(-1px); }\n\n.ss-pricing-card { transition: transform .2s ease-out, box-shadow .2s ease-out; will-change: transform; }\n.ss-pricing-card:hover { transform: translateY(-1px); box-shadow: 0 14px 24px -16px rgba(120,60,30,0.22); }\n\nbutton[data-ss-cta],\na[href="#hero"], a[href="#book"], a[href="/admin-demo"], a[href="/login"] {\n  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease, background-color .15s ease;\n}\nbutton[data-ss-cta]:hover:not(:disabled),\na[href="#hero"]:hover, a[href="#book"]:hover,\na[href="/admin-demo"]:hover, a[href="/login"]:hover {\n  transform: translateY(-1px);\n  filter: brightness(0.95);\n  box-shadow: 0 16px 32px -14px rgba(120,60,30,0.45);\n}\n\n:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 0; }\n\ndetails summary { transition: background-color .15s ease; cursor: pointer; }\ndetails summary:hover { background-color: var(--bg-soft); }\n\n.ss-hero-pill { transition: border-color .15s ease, box-shadow .15s ease; }\n.ss-hero-pill:focus-within {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 4px var(--accent-soft), 0 12px 32px -16px rgba(120,60,30,0.25);\n}\n';
function CanonStyles() {
  return /* @__PURE__ */ jsx("style", { "data-samosite-canon": "v0.3", dangerouslySetInnerHTML: { __html: CSS } });
}

// src/primitives/index.tsx
import { Fragment, jsx as jsx2, jsxs } from "react/jsx-runtime";
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
    /* @__PURE__ */ jsx2("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
    children
  ] });
}
function Mono({ children, style }) {
  return /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, ...style }, children });
}
function Card({ children, style }) {
  return /* @__PURE__ */ jsx2("div", { style: { background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.lg, ...style }, children });
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
function Input({ placeholder, value, icon, style }) {
  return /* @__PURE__ */ jsxs("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 16px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md,
    fontSize: 15,
    color: value ? VT.ink : VT.inkFaint,
    ...style
  }, children: [
    icon,
    /* @__PURE__ */ jsx2("span", { style: { flex: 1, fontFamily: value && /^[a-z0-9_./:@\-]+$/i.test(String(value)) ? VT.font.mono : VT.font.sans }, children: value || placeholder })
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
  return /* @__PURE__ */ jsx2("span", { style: {
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
function Checkbox({ checked = false, label, link }) {
  return /* @__PURE__ */ jsxs("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: VT.inkSoft, lineHeight: 1.45, cursor: "pointer" }, children: [
    /* @__PURE__ */ jsx2("span", { style: {
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
    }, children: checked && /* @__PURE__ */ jsx2("svg", { width: 11, height: 11, viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: 3, children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
    /* @__PURE__ */ jsxs("span", { children: [
      label,
      link && /* @__PURE__ */ jsxs(Fragment, { children: [
        " ",
        /* @__PURE__ */ jsx2("a", { style: { color: VT.accent, textDecoration: "underline" }, children: link })
      ] })
    ] })
  ] });
}
function IconLink() {
  return /* @__PURE__ */ jsxs("svg", { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: VT.inkFaint, strokeWidth: 1.8, strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx2("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" }),
    /* @__PURE__ */ jsx2("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" })
  ] });
}
function IconArrow({ size = 18 }) {
  return /* @__PURE__ */ jsx2("span", { style: { fontSize: size, lineHeight: 1 }, children: "\u2192" });
}
function Spinner({ size = 14 }) {
  return /* @__PURE__ */ jsx2("svg", { width: size, height: size, viewBox: "0 0 24 24", style: { animation: "vt-spin 0.9s linear infinite" }, children: /* @__PURE__ */ jsx2("circle", { cx: 12, cy: 12, r: 9, fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeDasharray: "40 20", strokeLinecap: "round" }) });
}
function Logo({ size = 26 }) {
  const s = size;
  return /* @__PURE__ */ jsx2("span", { "aria-label": BRAND.name, style: {
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
    /* @__PURE__ */ jsx2(Logo, { size }),
    BRAND.name
  ] });
}

// src/landing/index.tsx
import React3 from "react";

// src/presets/index.tsx
import React from "react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
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
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx3(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx3("em", { style: { fontStyle: v.italicAccent ? "italic" : "normal", color: c.accent }, children: p }, i)
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
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 25, fontWeight: v.displayWeight, letterSpacing: "-0.02em", lineHeight: 1 }, children: m.brand })
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
    /* @__PURE__ */ jsx3("div", { style: { padding: "12px 16px 10px", borderBottom: rule, flex: "0 0 auto" }, children: /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 26, fontWeight: v.displayWeight, lineHeight: 0.96, letterSpacing: "-0.03em", margin: 0 }, children: content.hero.headingLines.map((l, i) => /* @__PURE__ */ jsxs2(React.Fragment, { children: [
      accentEm(l),
      i < content.hero.headingLines.length - 1 && /* @__PURE__ */ jsx3("br", {})
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "1 1 auto", minHeight: 70, position: "relative", overflow: "hidden", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }),
      /* @__PURE__ */ jsx3("div", { style: { position: "absolute", left: 0, bottom: 0, padding: "4px 10px", background: c.bg, borderTop: rule, borderRight: rule, fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft }, children: content.hero.photoCaption || m.address })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx3("div", { style: { padding: "7px 16px 5px", fontFamily: f.mono, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: c.inkSoft }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8, padding: "5px 16px", borderTop: i ? ruleSoft : "none" }, children: [
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkFaint, flex: "0 0 auto" }, children: it.num }),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.display, fontSize: 13, fontWeight: v.displayWeight, whiteSpace: "nowrap", flex: "0 0 auto" }, children: it.name }),
        /* @__PURE__ */ jsx3("span", { style: { flex: 1, borderBottom: `1px dotted ${c.lineSoft}`, transform: "translateY(-3px)" } }),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 10, fontWeight: 600, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", padding: "9px 16px", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontStyle: "italic", fontSize: 13, lineHeight: 1.3 }, children: accentEm(q.text) }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "stretch", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("a", { style: { flex: 1, background: c.accent, color: c.accentInk, padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }, children: [
        content.cta.primary.label,
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.display, fontSize: 18, fontStyle: v.italicAccent ? "italic" : "normal" }, children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { padding: "0 14px", display: "flex", alignItems: "center", fontFamily: f.mono, fontSize: 10, color: c.accentInk, background: c.ink, whiteSpace: "nowrap" }, children: content.cta.phone })
    ] })
  ] });
}
function renderEm(text, color, italic) {
  return text.split(/\[\[(.+?)\]\]/g).map(
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx3(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx3("em", { style: { fontStyle: italic ? "italic" : "normal", color }, children: p }, i)
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
        /* @__PURE__ */ jsx3("span", { style: { width: 20, height: 20, background: c.accent, color: c.accentInk, borderRadius: r.mark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }, children: m.brand[0] }),
        m.brand
      ] }),
      /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkSoft }, children: [
        "\u2605 ",
        m.rating
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, background: c.accent, color: c.accentInk, border: "none", flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 8, padding: 13 }, children: [
      /* @__PURE__ */ jsxs2("span", { style: { alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 5, background: c.bg, color: c.accent, padding: "4px 8px", borderRadius: 999, fontSize: 8, fontWeight: 700, fontFamily: f.mono, textTransform: "uppercase", letterSpacing: "0.05em" }, children: [
        /* @__PURE__ */ jsx3("span", { style: { width: 4, height: 4, background: c.accent, borderRadius: "50%" } }),
        "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F"
      ] }),
      /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 22, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0 }, children: content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "") })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, flex: "0 0 auto" }, children: s.slice(0, 3).map((st, i) => /* @__PURE__ */ jsxs2("div", { style: tile, children: [
      /* @__PURE__ */ jsx3("div", { style: lbl, children: st.label }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 3, color: i === 1 ? c.accent : c.ink }, children: [
        st.num,
        /* @__PURE__ */ jsx3("span", { style: { fontSize: 11, color: c.inkFaint }, children: st.unit })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx3("div", { style: { borderRadius: r.card, overflow: "hidden", flex: "1 1 auto", minHeight: 50 }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { ...lbl, marginBottom: 6 }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, paddingTop: i ? 6 : 0, marginTop: i ? 6 : 0, borderTop: i ? `1px solid ${c.line}` : "none" }, children: [
        /* @__PURE__ */ jsx3("span", { style: { fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.accent, fontWeight: 700, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontSize: 11, lineHeight: 1.35 }, children: renderEm(q.text, c.accent, false) }),
      /* @__PURE__ */ jsxs2("div", { style: { ...lbl, marginTop: 6 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { ...tile, flex: "0 0 auto", background: c.invBg, color: c.invInk, border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em" }, children: content.cta.primary.label }),
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.invInkSoft, marginTop: 1 }, children: content.cta.phone })
      ] }),
      /* @__PURE__ */ jsx3("span", { style: { width: 28, height: 28, background: c.accent, color: c.accentInk, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "0 0 auto" }, children: "\u2192" })
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
        /* @__PURE__ */ jsx3("span", { style: { width: 6, height: 6, background: c.accent, borderRadius: "50%" } }),
        m.brand
      ] }),
      /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: c.ink, padding: "5px 10px", border: `1px solid ${c.ink}`, borderRadius: 999 }, children: [
        "\u2605 ",
        m.rating
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { padding: "2px 16px 12px", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 44, fontWeight: v.displayWeight, lineHeight: 0.84, letterSpacing: "-0.045em", margin: 0 }, children: lines.map((l, i) => /* @__PURE__ */ jsx3("span", { style: { display: "block", color: i === 1 ? c.accent : c.ink, fontStyle: i === 1 && v.italicAccent ? "italic" : "normal", textIndent: i === 1 ? 16 : 0, textAlign: i === 2 ? "right" : "left" }, children: renderEm(l, c.accent, v.italicAccent) }, i)) }) }),
    /* @__PURE__ */ jsx3("div", { style: { flex: "1 1 auto", minHeight: 60, overflow: "hidden" }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsx3("div", { style: { display: "flex", borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, flex: "0 0 auto" }, children: s.slice(0, 3).map((st, i) => /* @__PURE__ */ jsxs2("div", { style: { flex: 1, padding: "8px 10px", textAlign: "center", borderRight: i < 2 ? `1px solid ${c.line}` : "none" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, lineHeight: 1, color: c.accent }, children: [
        st.num,
        /* @__PURE__ */ jsx3("span", { style: { fontSize: 11, color: c.inkFaint }, children: st.unit })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 7.5, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft, marginTop: 3 }, children: st.label })
    ] }, i)) }),
    /* @__PURE__ */ jsx3("div", { style: { padding: "8px 16px 4px", flex: "0 0 auto" }, children: (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, padding: "4px 0", borderTop: i ? `1px solid ${c.lineSoft}` : "none" }, children: [
      /* @__PURE__ */ jsx3("span", { style: { fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
      /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.inkSoft, flex: "0 0 auto" }, children: it.price })
    ] }, i)) }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 16px", background: c.invBg, color: c.invInk, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: c.invInkSoft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: m.address }),
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
      /* @__PURE__ */ jsx3("div", { style: { width: "42%", minHeight: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0, background: c.invBg, color: c.invInk, display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700 }, children: [
            m.brand,
            /* @__PURE__ */ jsx3("span", { style: { color: c.invAccent }, children: "." })
          ] }),
          /* @__PURE__ */ jsxs2("span", { style: { fontFamily: f.mono, fontSize: 8, opacity: 0.7 }, children: [
            "\u2605 ",
            m.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 14px" }, children: [
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: c.invAccent, marginBottom: 8 }, children: m.category }),
          /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 24, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }, children: heading }),
          /* @__PURE__ */ jsxs2("p", { style: { fontSize: 11, lineHeight: 1.5, opacity: 0.82, margin: "10px 0 0" }, children: [
            content.hero.leadParagraph?.slice(0, 96),
            "\u2026"
          ] })
        ] }),
        /* @__PURE__ */ jsx3("div", { style: { display: "grid", gridTemplateColumns: `repeat(${s.length}, 1fr)`, borderTop: div, flex: "0 0 auto" }, children: s.map((st, i) => /* @__PURE__ */ jsxs2("div", { style: { padding: "9px 6px", textAlign: "center", borderRight: i < s.length - 1 ? div : void 0 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 16, fontWeight: 800, color: c.invAccent, lineHeight: 1 }, children: [
            st.num,
            /* @__PURE__ */ jsx3("span", { style: { fontSize: 10 }, children: st.unit })
          ] }),
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 7, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.65, marginTop: 3 }, children: st.label })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", padding: "11px 16px 9px", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: 7 }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, padding: "5px 0", borderTop: i ? `1px solid ${c.lineSoft}` : "none" }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 8.5, color: c.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 10, fontWeight: 700, color: c.accent, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: "0 0 auto", padding: "9px 16px", background: c.bgAlt, borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontSize: 11, lineHeight: 1.4 }, children: renderEm(q.text, c.accent, false) }),
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
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em" }, children: m.brand }),
      /* @__PURE__ */ jsx3("a", { style: { background: c.accent, color: c.accentInk, padding: "7px 13px", borderRadius: r.btn, fontSize: 11, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 18px 10px", textAlign: "center", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: c.accentSoft, color: c.accent, borderRadius: 999, fontSize: 10, fontWeight: 500, marginBottom: 9 }, children: [
        /* @__PURE__ */ jsx3("span", { style: { width: 5, height: 5, background: c.accent, borderRadius: "50%" } }),
        m.category,
        " \xB7 ",
        m.address.split(",").pop()?.trim()
      ] }),
      /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 23, fontWeight: v.displayWeight, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "0 auto", maxWidth: "94%" }, children: heading }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "center", gap: 8, fontSize: 11, color: c.inkSoft, marginTop: 9, alignItems: "center" }, children: [
        /* @__PURE__ */ jsx3("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx3("b", { children: m.rating }),
        /* @__PURE__ */ jsx3("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs2("span", { children: [
          m.reviewsN,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { flex: "1 1 auto", minHeight: 50, margin: "0 18px", borderRadius: r.photo, overflow: "hidden" }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsx3("div", { style: { padding: "11px 18px 4px", flex: "0 0 auto" }, children: (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "8px 11px", marginBottom: 6, border: `1px solid ${c.line}`, borderRadius: r.btn, background: c.bgAlt }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 9.5, color: c.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.desc })
      ] }),
      /* @__PURE__ */ jsx3("span", { style: { fontSize: 11.5, fontWeight: 700, color: c.accent, whiteSpace: "nowrap", flex: "0 0 auto" }, children: it.price })
    ] }, i)) }),
    /* @__PURE__ */ jsx3("div", { style: { padding: "6px 18px 10px", flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs2("div", { style: { padding: "10px 12px", borderRadius: r.card, background: c.accentSoft, fontSize: 11, lineHeight: 1.4 }, children: [
      renderEm(q.text, c.accent, false),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 9, color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 18px", display: "flex", gap: 8, flex: "0 0 auto", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("a", { style: { flex: 1, background: c.accent, color: c.accentInk, padding: "12px", borderRadius: r.btn, textAlign: "center", fontSize: 13, fontWeight: 600 }, children: content.cta.primary.label }),
      /* @__PURE__ */ jsx3("a", { style: { padding: "12px 16px", border: `1px solid ${c.line}`, borderRadius: r.btn, textAlign: "center", fontSize: 12, whiteSpace: "nowrap", display: "flex", alignItems: "center", color: c.ink }, children: content.cta.phone })
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
  return /* @__PURE__ */ jsx3(Family, { theme, content });
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
      /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: [
        host,
        ".",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children })
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

// src/landing/v5.tsx
import { useState, useEffect, useRef } from "react";
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var noop = () => {
};
var MONO = VT.font.mono;
var SANS = VT.font.sans;
var INK = VT.ink;
var INK70 = VT.inkSoft;
var INK45 = VT.inkFaint;
var LINE = VT.line;
var LINE2 = VT.lineStrong;
var BONE = VT.bg;
var ACCENT = VT.accent;
var V5_CSS = `
:root{
  --bone:${VT.bg};--paper:${VT.white};--ink:${VT.ink};--ink-70:${VT.inkSoft};--ink-45:${VT.inkFaint};
  --line:${VT.line};--line-2:${VT.lineStrong};--accent:${VT.accent};--accent-dk:${VT.accentHover};
  --on-accent:${VT.onAccent};--dark:${VT.dark};--dark-70:${VT.darkSoft};--accent-on-dark:${VT.accentOnDark};
  --wrap:1320px;--pad:clamp(20px,4vw,44px);
  --display:${VT.font.display};--text:${VT.font.sans};--mono:${VT.font.mono};
  --fs-body:clamp(15px,1.05vw,17px);--fs-lead:clamp(18px,1.35vw,21px);--fs-small:16px;--fs-label:12px;
}
.v5 *{box-sizing:border-box;}
.v5{background:var(--bone);color:var(--ink);font-family:var(--text);font-size:var(--fs-body);line-height:1.55;font-weight:400;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
.v5 h1,.v5 h2,.v5 h3,.v5 p{margin:0;}
.v5 img{display:block;max-width:100%;}
.v5 *{border-radius:0 !important;box-shadow:none !important;}
.v5 button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit;}
.v5 a{color:var(--accent);text-decoration:none;}
.v5 a:hover{color:var(--accent-dk);}
.v5 ::selection{background:var(--accent);color:var(--on-accent);}
.v5 :focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
.v5 .wrap{max-width:var(--wrap);margin-inline:auto;padding-inline:var(--pad);}
.v5 .bento12{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(24px,3vw,52px);}
.v5 .hero-h{font-family:var(--display);font-weight:800;font-size:clamp(52px,7.6vw,104px);line-height:.95;letter-spacing:-.01em;text-wrap:balance;overflow-wrap:normal;word-break:keep-all;hyphens:manual;}
.v5 .h2{font-family:var(--display);font-weight:700;font-size:clamp(38px,4.6vw,64px);line-height:1.04;letter-spacing:-.01em;text-wrap:balance;padding-bottom:.04em;overflow-wrap:normal;word-break:keep-all;hyphens:manual;}
.v5 .lead{font-size:var(--fs-lead);line-height:1.5;color:var(--ink-70);text-wrap:pretty;}
.v5 .small{font-size:var(--fs-small);line-height:1.55;color:var(--ink-70);}
.v5 .how-mon__head .small,.v5 .msg__d{font-size:16px;line-height:1.55;}
.v5 .accent{color:var(--accent);}
.v5 .label{font-family:var(--mono);font-weight:500;font-size:var(--fs-label);line-height:1.3;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-45);}
.v5 .btn{--h:54px;display:inline-flex;align-items:center;justify-content:center;gap:10px;height:var(--h);padding:0 26px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;transition:background .16s ease;}
.v5 .btn .arw{display:inline-block;transition:transform .16s ease;}
.v5 .btn:hover{background:var(--accent-dk);color:var(--on-accent);}
.v5 .btn:hover .arw{transform:translateX(4px);}
.v5 .btn--56{--h:56px;font-size:16.5px;padding:0 30px;}
.v5 .btn--44{--h:44px;font-size:15px;padding:0 20px;}
.v5 .btn--sec{background:transparent;color:var(--ink);border:1px solid var(--line-2);}
.v5 .btn--sec:hover{background:var(--ink);color:var(--paper);border-color:var(--ink);}
.v5 .btn--block{display:flex;width:100%;}
.v5 .tlink{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);text-decoration:none;transition:color .16s ease;background:none;}
.v5 .tlink .u{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;transition:text-underline-offset .16s ease;}
.v5 .tlink:hover{color:var(--ink);}
.v5 .tlink:hover .u{text-underline-offset:5px;}
.v5 .tlink .arw{display:inline-block;transition:transform .16s ease;}
.v5 .tlink:hover .arw{transform:translateX(3px);}
.v5 .section{margin-top:clamp(64px,8vw,116px);}
.v5 .shead{padding-bottom:22px;margin-bottom:clamp(30px,3.4vw,44px);border-bottom:1px solid var(--line-2);display:flex;flex-direction:column;align-items:flex-start;gap:12px;}
.v5 .shead__l{display:flex;flex-direction:column;gap:14px;min-width:0;}
.v5 .shead__l .h2{max-width:26ch;}
.v5 #story-h{max-width:none;}
.v5 #how .shead,.v5 #reviews .shead{border-bottom:none;padding-bottom:0;}
.v5 .shead__note{max-width:72ch;text-align:left;font-size:16px;line-height:1.5;color:var(--ink-70);text-wrap:pretty;}
.v5 .hdr{position:sticky;top:0;z-index:60;background:color-mix(in srgb,var(--bone) 88%,transparent);backdrop-filter:saturate(1.2) blur(8px);border-bottom:1px solid var(--line);}
.v5 .hdr__in{height:66px;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.v5 .logo{font-family:var(--display);font-weight:800;font-size:26px;letter-spacing:-.01em;color:var(--ink);}
.v5 .logo b{color:var(--accent);font-weight:800;}
.v5 .hdr__nav{display:flex;align-items:center;gap:30px;}
.v5 .hdr__links{display:flex;align-items:center;gap:24px;}
.v5 .hdr__links a{font-family:var(--text);font-weight:500;font-size:14.5px;color:var(--ink);}
.v5 .hdr__links a:hover{color:var(--accent);}
.v5 .hdr__cta-m{display:none;}
.v5 .hdr__anchors{display:none;}
.v5 .hero{position:relative;padding-block:clamp(30px,3.6vw,52px) clamp(44px,5vw,72px);}
.v5 .hero__grid{display:grid;grid-template-columns:minmax(0,1.05fr) min(46vw,680px);gap:clamp(32px,5vw,64px);align-items:start;}
.v5 .hero__copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(18px,2vw,26px);max-width:none;}
.v5 .hero__lead{max-width:40ch;}
.v5 .hero__cta{display:flex;flex-direction:column;align-items:flex-start;gap:14px;}
.v5 .hero__examples{display:inline-flex;align-items:center;gap:8px;font-family:var(--text);font-weight:600;font-size:16px;color:var(--ink);text-decoration:none;transition:color .16s;}
.v5 .hero__examples span:first-child{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:4px;transition:text-underline-offset .16s;}
.v5 .hero__examples:hover span:first-child{text-underline-offset:6px;}
.v5 .hero__examples .arw{text-decoration:none;}
.v5 .hero__proof{font-family:var(--mono);font-size:13.5px;line-height:1.6;letter-spacing:.01em;color:var(--ink-70);max-width:46ch;}
.v5 .hero__proof b{color:var(--ink);font-weight:500;}
.v5 .hero__preview{position:relative;align-self:start;height:clamp(510px,54vw,660px);margin:0;}
.v5 .hero__preview #hero-preview-root{height:100%;}
.v5 .story{display:grid;grid-template-columns:1fr;gap:clamp(28px,4vw,72px);align-items:start;}
.v5 .story__lead{max-width:70ch;}
.v5 .src{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;margin-top:26px;padding-top:22px;border-top:1px solid var(--line);}
.v5 .src__i{display:inline-flex;align-items:center;gap:9px;font-family:var(--text);font-weight:500;font-size:15px;color:var(--ink);}
.v5 .src__i svg{color:var(--accent);flex:none;}
.v5 .steps{position:relative;border-top:2px solid var(--ink);}
.v5 .steprow{position:relative;display:grid;grid-template-columns:clamp(96px,11vw,168px) minmax(0,1fr);gap:clamp(18px,3vw,44px);padding:clamp(30px,3.6vw,52px) 0;border-bottom:1px solid var(--line-2);}
.v5 .steprow:last-child{border-bottom:none;}
.v5 .steprow__n{font-family:var(--display);font-weight:800;font-size:clamp(64px,9vw,132px);line-height:.74;letter-spacing:-.02em;color:var(--accent);}
.v5 .steprow__c{display:flex;flex-direction:column;gap:14px;padding-top:clamp(4px,.6vw,10px);}
.v5 .steprow__head{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;}
.v5 .steprow__t{font-family:var(--display);font-weight:700;font-size:clamp(26px,2.3vw,36px);line-height:1.02;letter-spacing:-.01em;max-width:24ch;}
.v5 .steprow__when{color:var(--accent);font-weight:600;}
.v5 .steprow__d{color:var(--ink-70);max-width:54ch;font-size:18px;line-height:1.55;}
.v5 .how-mon{margin-top:clamp(34px,4vw,56px);display:grid;grid-template-columns:.82fr 1.18fr;gap:clamp(24px,3.6vw,56px);align-items:center;}
.v5 .how-mon__head{display:flex;flex-direction:column;gap:12px;}
.v5 .how-mon__h{font-family:var(--display);font-weight:700;font-size:clamp(22px,2vw,30px);line-height:1.06;}
.v5 .how-mon__head .small{max-width:40ch;}
.v5 .msg{position:relative;background:#fff;border:1px solid var(--ink);border-left:3px solid var(--accent);padding:22px;color:var(--ink);}
.v5 .msg::before{content:"";position:absolute;top:10px;left:10px;right:-10px;bottom:-10px;border:1px solid var(--accent);z-index:-1;pointer-events:none;}
.v5 .msg__head{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.v5 .msg__head .label{color:var(--accent);}
.v5 .msg__head .tag2{margin-left:auto;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--ink-45);border:1px solid var(--line-2);padding:3px 8px;}
.v5 .msg__t{font-weight:600;font-size:18px;line-height:1.3;margin-bottom:7px;color:var(--ink);}
.v5 .msg__d{color:var(--ink-70);}
.v5 .msg__act{display:flex;align-items:center;gap:20px;margin-top:16px;flex-wrap:wrap;}
.v5 .msg__act .btn{background:var(--accent);color:var(--on-accent);}
.v5 .msg__act .glink{font-weight:500;color:var(--ink-45);}
.v5 .msg__act .glink:hover{color:var(--ink);}
.v5 .pt-name{font-family:var(--display);font-weight:700;font-size:27px;line-height:1;letter-spacing:-.01em;}
.v5 .pt-tag{font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:none;color:var(--accent);}
.v5 .pt-sub{font-size:12.5px;color:var(--ink-70);}
.v5 .pt-price{font-family:var(--display);font-weight:700;font-size:40px;line-height:1;margin-top:4px;}
.v5 .pt-price span{font-family:var(--text);font-size:15px;font-weight:500;color:var(--ink-45);}
.v5 .tcards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:stretch;}
.v5 .tcard{border:1px solid var(--ink);background:var(--paper);padding:26px 24px;display:flex;flex-direction:column;}
.v5 .tcard .btn{margin-top:auto;}
.v5 .tcard--hi{border-top:3px solid var(--accent);}
.v5 .tcard--hi .pt-name{color:var(--accent);}
.v5 .tcard__head{display:flex;flex-direction:column;gap:5px;margin-bottom:16px;}
.v5 .tcard__head .pt-name{font-size:32px;}
.v5 .tcard__head .pt-sub{min-height:0;max-width:none;}
.v5 .tcard__list{list-style:none;margin:0 0 18px;padding:0;}
.v5 .tcard__list li{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:11px 0;border-bottom:1px solid var(--line);font-size:14.5px;color:var(--ink-70);}
.v5 .tcard__list li:last-child{border-bottom:none;}
.v5 .tcard__list b{font-family:var(--mono);font-weight:500;font-size:13px;color:var(--ink);white-space:nowrap;}
.v5 .tcard__list b.no{color:var(--ink-45);}
.v5 .tcard .btn{white-space:normal;height:auto;min-height:48px;padding-top:12px;padding-bottom:12px;line-height:1.2;}
.v5 .tcommon{margin-top:20px;font-size:14.5px;line-height:1.55;color:var(--ink-70);max-width:74ch;}
.v5 .tcommon b{color:var(--ink);font-weight:600;}
.v5 .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,3vw,52px);}
.v5 .rev{margin:0;display:flex;flex-direction:column;gap:16px;border-top:2px solid var(--ink);padding-top:18px;}
.v5 .rev__q{margin:0;font-family:var(--display);font-weight:600;font-size:clamp(20px,1.75vw,25px);line-height:1.16;letter-spacing:-.005em;text-wrap:pretty;}
.v5 .rev__a{margin-top:auto;display:flex;align-items:center;gap:12px;}
.v5 .rev__ph{width:44px;height:44px;border-radius:50% !important;overflow:hidden;flex:none;position:relative;background:repeating-linear-gradient(135deg,#E5DFD3 0 8px,#D6CEBE 8px 16px);display:flex;align-items:center;justify-content:center;font-family:var(--text);font-weight:600;font-size:16px;color:var(--ink-70);}
.v5 .rev__ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.v5 .rev__at{font-family:var(--mono);font-size:11.5px;letter-spacing:.05em;line-height:1.5;color:var(--ink-70);display:flex;flex-direction:column;gap:4px;min-width:0;}
.v5 .rev__at span{color:var(--ink-45);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.v5 .hrow{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,4vw,64px);align-items:baseline;padding:clamp(22px,2.4vw,32px) 0;border-bottom:1px solid var(--line);}
.v5 .hrow__t{font-family:var(--display);font-weight:700;font-size:clamp(24px,2.4vw,34px);line-height:1.04;letter-spacing:-.01em;}
.v5 .hrow__d{color:var(--ink-70);max-width:44ch;font-size:16px;}
.v5 .faq-short{grid-column:2 / 12;}
.v5 .faq-short .tlink{display:inline !important;font:inherit;line-height:inherit;letter-spacing:inherit;color:var(--ink);vertical-align:baseline;padding:0;}
.v5 .faq-short .tlink .u,.v5 .faq-short .tlink{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;}
.v5 .faq{grid-column:2 / 12;border-top:1px solid var(--line);}
.v5 .acc{border-bottom:1px solid var(--line);}
.v5 .acc__btn{display:flex;align-items:center;justify-content:space-between;gap:22px;width:100%;text-align:left;padding:22px 2px;font-weight:500;font-size:17px;color:var(--ink);transition:color .12s;}
.v5 .acc__btn:hover{color:var(--accent);}
.v5 .acc__plus{font-family:var(--text);font-weight:400;font-size:26px;line-height:1;color:var(--accent);transition:transform .18s ease;flex:none;}
.v5 .acc.is-open .acc__plus{transform:rotate(45deg);}
.v5 .acc__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .22s ease;}
.v5 .acc.is-open .acc__panel{grid-template-rows:1fr;}
.v5 .acc__panel>div{overflow:hidden;}
.v5 .acc__a{padding:0 48px 24px 2px;color:var(--ink-70);}
.v5 .final{margin-top:clamp(64px,8vw,116px);background:var(--dark);color:var(--paper);padding-block:clamp(76px,9vw,132px);}
.v5 .final__h{color:var(--paper);max-width:20ch;}
.v5 .final__h .accent{color:var(--accent-on-dark);}
.v5 .final__p{max-width:52ch;color:var(--dark-70);margin-top:26px;}
.v5 .final__cta{display:flex;align-items:center;gap:26px;flex-wrap:wrap;margin-top:38px;}
.v5 .final .tlink,.v5 .final .tlink:hover{color:var(--paper);}
.v5 .ft{background:var(--dark);color:var(--paper);border-top:1px solid #2E2820;}
.v5 .ft__in{display:flex;align-items:center;justify-content:space-between;gap:22px;min-height:92px;padding-block:22px;flex-wrap:wrap;}
.v5 .ft__logo{font-family:var(--display);font-weight:800;font-size:22px;color:var(--paper);}
.v5 .ft__meta{color:var(--dark-70);font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;}
.v5 .ft__links{display:flex;gap:20px;}
.v5 .ft__links a{font-size:var(--fs-small);color:var(--paper);}
.v5 .ft__links a:hover{color:var(--accent-on-dark);}
@media (prefers-reduced-motion:no-preference){.v5.js .reveal{opacity:0;transform:translateY(14px);transition:opacity .6s cubic-bezier(.2,0,0,1),transform .6s cubic-bezier(.2,0,0,1);}.v5.js .reveal.in{opacity:1;transform:none;}}
@media (max-width:1000px){.v5 .story{grid-template-columns:1fr;}.v5 .how-mon{grid-template-columns:1fr;}}
@media (max-width:900px){.v5 .hero__grid{grid-template-columns:1fr;}.v5 .hero__preview{align-self:auto;min-height:0;height:auto;margin-bottom:26px;}.v5 .hero{padding-top:14px;min-height:0;}.v5 .hero__copy{gap:16px;}}
@media (max-width:720px){.v5 .hdr__links,.v5 .hdr__cta{display:none;}.v5 .hdr__cta-m{display:inline-flex;}.v5 .hdr__anchors{display:flex;gap:20px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:0 var(--pad) 11px;scrollbar-width:none;}.v5 .hdr__anchors::-webkit-scrollbar{display:none;}.v5 .hdr__anchors a{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);white-space:nowrap;}.v5 .revs{grid-template-columns:1fr;}.v5 .shead__l .h2,.v5 .shead__note{max-width:none;}.v5 .steprow{grid-template-columns:clamp(64px,17vw,96px) 1fr;gap:14px 18px;}.v5 .steprow__t{font-size:clamp(24px,7vw,30px);}.v5 .hrow{grid-template-columns:1fr;gap:8px;}.v5 .faq-short,.v5 .faq{grid-column:1 / -1;}.v5 .tcards{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.v5 *,.v5 *::before,.v5 *::after{transition-duration:0ms !important;animation-duration:0ms !important;}}
`;
function V5_Styles() {
  return /* @__PURE__ */ jsx4("style", { "data-samosite-canon-v5": "0.12", dangerouslySetInnerHTML: { __html: V5_CSS } });
}
function useReveal() {
  const ref = useRef(null);
  const [inv, setInv] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setInv(true);
      return;
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          setInv(true);
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.06 });
    io.observe(el);
    const t = setTimeout(() => setInv(true), 1600);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
  return [ref, "reveal" + (inv ? " in" : "")];
}
var useMedia = (limit) => {
  const [n, setN] = useState(typeof window !== "undefined" && window.innerWidth < limit);
  useEffect(() => {
    const on = () => setN(window.innerWidth < limit);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, [limit]);
  return n;
};
var useCompact = () => useMedia(640);
var useNarrow = () => useMedia(900);
var uns = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 900}&q=80`;
function Img({ id, w, label, ph, style, pos, src }) {
  const [err, setErr] = useState(false);
  const base = { display: "block", width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center" };
  if (err || !id && !src) {
    return /* @__PURE__ */ jsx4("div", { style: { ...base, ...style, backgroundImage: `repeating-linear-gradient(135deg, ${ph[0]} 0 11px, ${ph[1]} 11px 22px)`, display: "flex", alignItems: "flex-end", padding: 10 }, children: /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 9.5, letterSpacing: ".05em", textTransform: "uppercase", color: ph[2], background: ph[3] || "rgba(255,255,255,.6)", padding: "3px 7px" }, children: label }) });
  }
  return /* @__PURE__ */ jsx4("img", { src: src || uns(id, w), alt: label, loading: "lazy", onError: () => setErr(true), style: { ...base, ...style } });
}
function FakeCTA({ style, children }) {
  return /* @__PURE__ */ jsx4("a", { href: "#", onClick: (e) => e.preventDefault(), tabIndex: -1, "aria-hidden": "true", style: { cursor: "default", ...style }, children });
}
function Tail({ P, priceLabel, rows, quote, cta, compact }) {
  return /* @__PURE__ */ jsxs3("div", { style: { padding: compact ? "16px 20px 20px" : "18px 22px 22px", display: "flex", flexDirection: "column", gap: 15 }, children: [
    /* @__PURE__ */ jsxs3("div", { children: [
      /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: P.soft, marginBottom: 11 }, children: priceLabel }),
      rows.map((r, i) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", gap: 12, padding: "9px 0", borderBottom: i < rows.length - 1 ? `1px solid ${P.line}` : "none" }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ jsx4("div", { style: { fontFamily: SANS, fontWeight: 600, fontSize: 14, color: P.ink }, children: r[0] }),
          r[2] && /* @__PURE__ */ jsx4("div", { style: { fontFamily: SANS, fontSize: 11.5, color: P.soft, marginTop: 2 }, children: r[2] })
        ] }),
        /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 12.5, color: P.ink, whiteSpace: "nowrap" }, children: r[1] })
      ] }, i))
    ] }),
    quote && /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 6, padding: "12px 14px", background: P.line, borderLeft: `3px solid ${P.accent}` }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx4("span", { "aria-label": "5 \u0438\u0437 5", style: { color: "#C9922E", fontSize: 13, letterSpacing: "1.5px" }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 10, letterSpacing: ".06em", color: P.soft }, children: "5,0 \xB7 \u042F\u043D\u0434\u0435\u043A\u0441" })
      ] }),
      /* @__PURE__ */ jsx4("p", { style: { margin: 0, fontFamily: P.serif, fontStyle: "italic", fontSize: 16.5, lineHeight: 1.34, color: P.ink }, children: quote[0] }),
      /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 10, letterSpacing: ".03em", color: P.soft }, children: quote[1] })
    ] }),
    /* @__PURE__ */ jsxs3(FakeCTA, { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: P.btn || P.accent, color: P.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 14, padding: "13px 18px", textDecoration: "none" }, children: [
      cta,
      " ",
      /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
    ] })
  ] });
}
var Pn = { bg: "#F7EFEC", ink: "#2A2320", soft: "#8A7C74", line: "#EEE1DC", accent: "#B0656F", btn: "#2A2320", onAccent: "#FAF4F1", serif: "'Cormorant', Georgia, serif" };
function NailHero() {
  const compact = useCompact();
  return /* @__PURE__ */ jsxs3("div", { style: { background: Pn.bg, color: Pn.ink }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { position: "relative", height: compact ? 300 : 520 }, children: [
      /* @__PURE__ */ jsx4(Img, { src: "img/nails.png", label: "\u043C\u0430\u043D\u0438\u043A\u044E\u0440 \xB7 \u043C\u0430\u043A\u0440\u043E", ph: ["#E7C9C9", "#D9AEB2", "#7A3A44"], pos: "center 45%" }),
      /* @__PURE__ */ jsx4("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,16,15,.62) 0%, rgba(20,16,15,0) 42%)" } }),
      /* @__PURE__ */ jsx4("div", { style: { position: "absolute", top: 16, left: 18, fontFamily: MONO, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#fff", opacity: 0.92 }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433" }),
      /* @__PURE__ */ jsx4("div", { style: { position: "absolute", left: 18, right: 18, bottom: 18 }, children: /* @__PURE__ */ jsxs3("h3", { style: { margin: 0, fontFamily: Pn.serif, fontWeight: 600, fontSize: 38, lineHeight: 1, letterSpacing: "-.01em", color: "#FBFBFC" }, children: [
        "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440,",
        /* @__PURE__ */ jsx4("br", {}),
        /* @__PURE__ */ jsx4("span", { style: { fontStyle: "italic", color: "#F4C9C4" }, children: "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx4(
      Tail,
      {
        P: Pn,
        priceLabel: "\u0426\u0435\u043D\u044B \u0437\u0430 \u0438\u044E\u043B\u044C",
        rows: [["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", "2 400 \u20BD", "\u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439, \u0431\u0435\u0440\u0435\u0436\u043D\u043E \xB7 1,5 \u0447"], ["\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 2 \u043D\u043E\u0433\u0442\u044F", "300 \u20BD", "\u043E\u0442 \u043F\u0440\u043E\u0441\u0442\u043E\u0433\u043E \u0434\u043E \u0441\u043B\u043E\u0436\u043D\u043E\u0433\u043E"], ["\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", "600 \u20BD", "\u0434\u043B\u044F \u0442\u043E\u043D\u043A\u0438\u0445 \u0438 \u043B\u043E\u043C\u043A\u0438\u0445"]],
        quote: ["\xAB\u0410\u043D\u043D\u0430 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442. \u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432.\xBB", "\u041E\u043B\u0435\u0441\u044F \u041D. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441 \xB7 3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"],
        cta: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0432 Telegram"
      }
    )
  ] });
}
var Pb = { bg: "#E7E2D6", ink: "#231C15", soft: "#6B5C48", line: "#D6CCB8", accent: "#8C4A22", btn: "#231C15", onAccent: "#F1EADC", serif: "'Oswald', sans-serif" };
function BarberPoster() {
  const compact = useCompact();
  return /* @__PURE__ */ jsxs3("div", { style: { background: Pb.bg, color: Pb.ink }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { padding: "26px 22px 20px" }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: Pb.soft, marginBottom: 14 }, children: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xAB\u0424\u0451\u0434\u043E\u0440\xBB \xB7 \u041C\u043E\u0441\u043A\u0432\u0430 \xB7 \u0441 2018" }),
      /* @__PURE__ */ jsxs3("h3", { style: { margin: 0, fontFamily: Pb.serif, fontWeight: 700, fontSize: 62, lineHeight: 0.9, letterSpacing: ".004em", textTransform: "uppercase", color: Pb.ink }, children: [
        "\u0421\u0442\u0440\u0438\u0436\u043A\u0430",
        /* @__PURE__ */ jsx4("br", {}),
        /* @__PURE__ */ jsx4("span", { style: { color: Pb.accent }, children: "+ \u0431\u043E\u0440\u043E\u0434\u0430" }),
        /* @__PURE__ */ jsx4("br", {}),
        "\u0437\u0430 45 \u043C\u0438\u043D\u0443\u0442"
      ] }),
      /* @__PURE__ */ jsx4("p", { style: { margin: "18px 0 0", fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: Pb.soft, maxWidth: "34ch" }, children: "\u0422\u043E\u043B\u044C\u043A\u043E \u043C\u0443\u0436\u0441\u043A\u0438\u0435 \u0441\u0442\u0440\u0438\u0436\u043A\u0438. \u0412\u0438\u0441\u043A\u0438 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u0435\u0441\u043B\u0438 \u0437\u0430\u0439\u0434\u0451\u0442\u0435 \u043F\u043E\u0441\u043B\u0435 \u0441\u0442\u0440\u0438\u0436\u043A\u0438" })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: { height: compact ? 120 : 150, borderTop: `1px solid ${Pb.line}`, borderBottom: `1px solid ${Pb.line}` }, children: /* @__PURE__ */ jsx4(Img, { id: "photo-1503951914875-452162b0f3f1", w: 900, label: "\u043A\u0440\u0435\u0441\u043B\u043E, \u0441\u0443\u0431\u0431\u043E\u0442\u0430", ph: ["#3A2A1E", "#2A1E14", "#D8C4A8", "rgba(0,0,0,.4)"], pos: "center 20%" }) }),
    /* @__PURE__ */ jsx4(
      Tail,
      {
        P: Pb,
        priceLabel: "\u041F\u0440\u0430\u0439\u0441",
        compact: true,
        rows: [["\u041C\u0443\u0436\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0438\u0436\u043A\u0430", "2 200 \u20BD", "\u043C\u0430\u0448\u0438\u043D\u043A\u0430 + \u043D\u043E\u0436\u043D\u0438\u0446\u044B"], ["\u0421\u0442\u0440\u0438\u0436\u043A\u0430 + \u0431\u043E\u0440\u043E\u0434\u0430", "3 000 \u20BD", "\u0441 \u0433\u043E\u0440\u044F\u0447\u0438\u043C \u043F\u043E\u043B\u043E\u0442\u0435\u043D\u0446\u0435\u043C"], ["\u041E\u043F\u0430\u0441\u043D\u043E\u0439 \u0431\u0440\u0438\u0442\u0432\u043E\u0439", "1 800 \u20BD", "\u0433\u043E\u043B\u043E\u0432\u0430 \u0438\u043B\u0438 \u0431\u043E\u0440\u043E\u0434\u0430"]],
        quote: ["\xAB\u0425\u043E\u0436\u0443 \u043A \u0413\u043B\u0435\u0431\u0443 \u0442\u0440\u0435\u0442\u0438\u0439 \u0433\u043E\u0434. \u0412\u0441\u0435\u0433\u0434\u0430 \u0432\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442, \u043A\u0430\u043A \u0441\u0442\u0440\u0438\u0433\u043B\u0438 \u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0440\u0430\u0437.\xBB", "\u0410\u043D\u0442\u043E\u043D \u041A. \xB7 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 4 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434"],
        cta: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043A \u043C\u0430\u0441\u0442\u0435\u0440\u0443"
      }
    )
  ] });
}
var Ps = { bg: "#FFFFFF", ink: "#1A1D1C", soft: "#727975", line: "#ECECEA", accent: "#2F7A68", btn: "#1A1D1C", onAccent: "#FFFFFF", serif: "'Spectral', Georgia, serif" };
function SkinBeforeAfter() {
  const compact = useCompact();
  const Half = ({ id, tag, ph, pos }) => /* @__PURE__ */ jsx4("div", { style: { position: "relative", flex: 1, overflow: "hidden" }, children: /* @__PURE__ */ jsx4(Img, { id, w: 520, label: tag, ph, pos }) });
  return /* @__PURE__ */ jsxs3("div", { style: { background: Ps.bg, color: Ps.ink }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { padding: "22px 22px 16px" }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: Ps.accent, marginBottom: 11 }, children: "\u041A\u0430\u0431\u0438\u043D\u0435\u0442 \u042E\u043B\u0438\u0438 \xB7 \u043A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433" }),
      /* @__PURE__ */ jsxs3("h3", { style: { margin: 0, fontFamily: Ps.serif, fontWeight: 600, fontSize: 28, lineHeight: 1.08, color: Ps.ink }, children: [
        "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u043C\u043E\u0442\u0440\u0438\u043C \u043A\u043E\u0436\u0443, ",
        /* @__PURE__ */ jsx4("span", { style: { fontStyle: "italic", color: Ps.accent }, children: "\u043F\u043E\u0442\u043E\u043C \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u043C \u0443\u0445\u043E\u0434" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 3, height: compact ? 168 : 240, padding: "0 22px" }, children: [
      /* @__PURE__ */ jsx4(Half, { id: "photo-1570172619644-dfd03ed5d881", tag: "\u0447\u0438\u0441\u0442\u043A\u0430", ph: ["#D8C9BE", "#C9B6A8", "#4A3C32"], pos: "center 30%" }),
      /* @__PURE__ */ jsx4(Half, { id: "photo-1616394584738-fc6e612e71b9", tag: "\u0443\u0445\u043E\u0434", ph: ["#E7E7E5", "#D6D6D3", "#3A3E3C"], pos: "center 30%" })
    ] }),
    /* @__PURE__ */ jsx4(
      Tail,
      {
        P: Ps,
        priceLabel: "\u041F\u0440\u0430\u0439\u0441",
        rows: [["\u041A\u043E\u043C\u0431\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0447\u0438\u0441\u0442\u043A\u0430", "3 200 \u20BD", "\u0441 \u0443\u0445\u043E\u0434\u043E\u043C \u043F\u043E \u0442\u0438\u043F\u0443 \u043A\u043E\u0436\u0438 \xB7 1,5 \u0447"], ["\u041F\u0438\u043B\u0438\u043D\u0433 \u043F\u043E \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0438\u044F\u043C", "\u043E\u0442 2 400 \u20BD", "\u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043E\u0441\u043B\u0435 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0438"], ["\u041F\u0435\u0440\u0432\u0438\u0447\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", "\u0440\u0430\u0437\u0431\u043E\u0440 \u043A\u043E\u0436\u0438 \u0438 \u043F\u043B\u0430\u043D"]],
        quote: ["\xAB\u041D\u0435 \u0432\u043F\u0430\u0440\u0438\u0432\u0430\u0435\u0442 \u043B\u0438\u0448\u043D\u0435\u0433\u043E. \u0421\u043A\u0430\u0437\u0430\u043B\u0430, \u0447\u0442\u043E \u0445\u0432\u0430\u0442\u0438\u0442 \u0442\u0440\u0451\u0445 \u0447\u0438\u0441\u0442\u043E\u043A, \u0430 \u043D\u0435 \u043A\u0443\u0440\u0441\u0430 \u0438\u0437 \u0434\u0435\u0441\u044F\u0442\u0438.\xBB", "\u041E\u043B\u044C\u0433\u0430 \u0412. \xB7 2\u0413\u0418\u0421 \xB7 1 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434"],
        cta: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443"
      }
    )
  ] });
}
var Pr = { bg: "#EFE7DA", ink: "#241E17", soft: "#6E6053", line: "#DBD0BE", accent: "#7A5A3C", btn: "#241E17", onAccent: "#F5EFE4", serif: "'Playfair Display', Georgia, serif" };
function BrowMinimal() {
  const compact = useCompact();
  return /* @__PURE__ */ jsxs3("div", { style: { background: Pr.bg, color: Pr.ink }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { padding: "46px 30px 30px", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 9.5, letterSpacing: ".2em", textTransform: "uppercase", color: Pr.soft }, children: "Brow Bar \u0421\u043E\u043B\u044C \xB7 \u0421\u043E\u0447\u0438" }),
      /* @__PURE__ */ jsxs3("h3", { style: { margin: "22px auto 0", fontFamily: Pr.serif, fontWeight: 600, fontSize: 34, lineHeight: 1.06, color: Pr.ink, maxWidth: "15ch" }, children: [
        "\u0411\u0440\u043E\u0432\u0438 \u043F\u043E \u0432\u0430\u0448\u0435\u0439 ",
        /* @__PURE__ */ jsx4("span", { style: { fontStyle: "italic" }, children: "\u0444\u043E\u0440\u043C\u0435 \u043B\u0438\u0446\u0430" })
      ] })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: { height: compact ? 188 : 250, margin: "0 30px" }, children: /* @__PURE__ */ jsx4(Img, { id: "photo-1616683693504-3ea7e9ad6fec", w: 720, label: "\u0431\u0440\u043E\u0432\u0438 \u043A\u0440\u0443\u043F\u043D\u043E", ph: ["#DED3C0", "#CFC1A8", "#3A3128"], pos: "center 30%" }) }),
    /* @__PURE__ */ jsxs3("div", { style: { padding: "30px 30px 34px", textAlign: "center", display: "flex", flexDirection: "column", gap: 20 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", justifyContent: "center", gap: 34, fontFamily: SANS, fontSize: 13.5 }, children: [
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsx4("div", { style: { fontWeight: 600 }, children: "\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F + \u0446\u0432\u0435\u0442" }),
          /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 12.5, color: Pr.soft, marginTop: 3 }, children: "1 400 \u20BD" })
        ] }),
        /* @__PURE__ */ jsxs3("div", { children: [
          /* @__PURE__ */ jsx4("div", { style: { fontWeight: 600 }, children: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435" }),
          /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 12.5, color: Pr.soft, marginTop: 3 }, children: "2 200 \u20BD" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 7, padding: "16px 18px", background: Pr.line }, children: [
        /* @__PURE__ */ jsx4("span", { "aria-label": "5 \u0438\u0437 5", style: { color: "#C9922E", fontSize: 13, letterSpacing: "2px" }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx4("p", { style: { margin: 0, fontFamily: Pr.serif, fontStyle: "italic", fontSize: 16.5, lineHeight: 1.34, color: Pr.ink, maxWidth: "24ch" }, children: "\xAB\u0424\u043E\u0440\u043C\u0443 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B\u0438 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E, \u043B\u0438\u0446\u043E \u0431\u0443\u0434\u0442\u043E \u043E\u0442\u043A\u0440\u044B\u043B\u043E\u0441\u044C\xBB" }),
        /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 10, letterSpacing: ".03em", color: Pr.soft }, children: "\u041C\u0430\u0440\u0438\u043D\u0430 \u0412. \xB7 5,0 \xB7 \u042F\u043D\u0434\u0435\u043A\u0441" })
      ] }),
      /* @__PURE__ */ jsx4(FakeCTA, { style: { alignSelf: "center", fontFamily: SANS, fontWeight: 600, fontSize: 14, color: Pr.ink, textDecoration: "underline", textUnderlineOffset: 4, textDecorationColor: Pr.accent, textDecorationThickness: "1.5px" }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u2192" })
    ] })
  ] });
}
var Pc = { bg: "#F6F0F3", ink: "#221A24", soft: "#6E6472", line: "#E7DBE4", accent: "#9C2A8E", btn: "#221A24", onAccent: "#F9F0F6", serif: "'Cormorant', Georgia, serif" };
function ColoristMenu() {
  const items = [
    ["01", "\u0421\u043B\u043E\u0436\u043D\u043E\u0435 \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", "airtouch, \u0431\u0430\u043B\u0430\u044F\u0436 \xB7 \u043E\u0442 3 \u0447", "\u043E\u0442 6 500 \u20BD"],
    ["02", "\u0422\u043E\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435", "\u043E\u0441\u0432\u0435\u0436\u0438\u0442\u044C \u0446\u0432\u0435\u0442 \xB7 1,5 \u0447", "3 200 \u20BD"],
    ["03", "\u041E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435 \u0432 \u043E\u0434\u0438\u043D \u0442\u043E\u043D", "\u043A\u043E\u0440\u043D\u0438 \u0438\u043B\u0438 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E", "\u043E\u0442 3 800 \u20BD"],
    ["04", "\u0411\u043E\u0442\u043E\u043A\u0441 \u0434\u043B\u044F \u0432\u043E\u043B\u043E\u0441", "\u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0441\u043B\u0435 \u043E\u0441\u0432\u0435\u0442\u043B\u0435\u043D\u0438\u044F", "4 500 \u20BD"],
    ["05", "\u0423\u0445\u043E\u0434 \u0437\u0430 \u0446\u0432\u0435\u0442\u043E\u043C", "\u0434\u043E\u043C\u0430\u0448\u043D\u044F\u044F \u0441\u0445\u0435\u043C\u0430 \u0432 \u043F\u043E\u0434\u0430\u0440\u043E\u043A", "1 500 \u20BD"]
  ];
  return /* @__PURE__ */ jsxs3("div", { style: { background: Pc.bg, color: Pc.ink }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 14, padding: "22px 22px 16px", borderBottom: `1px solid ${Pc.line}` }, children: [
      /* @__PURE__ */ jsxs3("div", { children: [
        /* @__PURE__ */ jsx4("div", { style: { fontFamily: MONO, fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: Pc.accent, marginBottom: 9 }, children: "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442 \u041A\u0438\u0440\u0430 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" }),
        /* @__PURE__ */ jsxs3("h3", { style: { margin: 0, fontFamily: Pc.serif, fontWeight: 600, fontSize: 30, lineHeight: 1.02, color: Pc.ink }, children: [
          "\u041F\u0440\u0430\u0439\u0441 ",
          /* @__PURE__ */ jsx4("span", { style: { fontStyle: "italic", color: Pc.accent }, children: "\u0431\u0435\u0437 \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u0435\u043A" })
        ] })
      ] }),
      /* @__PURE__ */ jsx4("div", { style: { width: 74, height: 74, flex: "0 0 auto", overflow: "hidden" }, children: /* @__PURE__ */ jsx4(Img, { id: "photo-1580618672591-eb180b1a973f", w: 200, label: "\u0446\u0432\u0435\u0442", ph: ["#E7D9E2", "#D6C0CF", "#5A3A50"], pos: "center 30%" }) })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: { padding: "6px 22px 4px" }, children: items.map((r, i) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", gap: 14, padding: "13px 0", borderBottom: i < items.length - 1 ? `1px solid ${Pc.line}` : "none" }, children: [
      /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 11, color: Pc.soft, flex: "0 0 auto" }, children: r[0] }),
      /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0, flex: 1 }, children: [
        /* @__PURE__ */ jsx4("div", { style: { fontFamily: SANS, fontWeight: 600, fontSize: 15, color: Pc.ink }, children: r[1] }),
        /* @__PURE__ */ jsx4("div", { style: { fontFamily: SANS, fontSize: 11.5, color: Pc.soft, marginTop: 2 }, children: r[2] })
      ] }),
      /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 13, color: Pc.ink, whiteSpace: "nowrap" }, children: r[3] })
    ] }, i)) }),
    /* @__PURE__ */ jsx4("div", { style: { padding: "16px 22px 22px" }, children: /* @__PURE__ */ jsxs3(FakeCTA, { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: Pc.btn, color: Pc.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 14, padding: "13px 18px", textDecoration: "none" }, children: [
      "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043A \u043A\u043E\u043B\u043E\u0440\u0438\u0441\u0442\u0443 ",
      /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
    ] }) })
  ] });
}
var EXAMPLES = [
  { id: "nails", niche: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", anatomy: "\u0444\u043E\u0442\u043E-\u0433\u0435\u0440\u043E\u0439", domain: "anna-nails", Comp: NailHero, note: "\u041C\u044F\u0433\u043A\u0438\u0439 \u043D\u044E\u0434 \u0441 \u0444\u043E\u0442\u043E \u0441\u0442\u0430\u043B \u0446\u0432\u0435\u0442\u043E\u043C \u0441\u0430\u0439\u0442\u0430 \u2014 \u0442\u0451\u043F\u043B\u044B\u0439 \u0438 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439.", palette: ["#F7EFEC", "#B0656F", "#2A2320"] },
  { id: "barber", niche: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F", anatomy: "\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A-\u043F\u043B\u0430\u043A\u0430\u0442", domain: "fedor-barber", Comp: BarberPoster, note: "\u0423 \u0424\u0451\u0434\u043E\u0440\u0430 \u043E\u0434\u043D\u043E \u0444\u043E\u0442\u043E, \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u0441\u0430\u0439\u0442 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F \u043D\u0430 \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u0431\u0443\u043A\u0432\u0430\u0445.", palette: ["#E7E2D6", "#8C4A22", "#231C15"] },
  { id: "skin", niche: "\u041A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433", anatomy: "\u0434\u043E-\u043F\u043E\u0441\u043B\u0435", domain: "yulia-skin", Comp: SkinBeforeAfter, note: "\u0414\u0432\u0430 \u043A\u0430\u0434\u0440\u0430 \u0440\u0430\u0431\u043E\u0442 \u042E\u043B\u0438\u0438 \u0432 \u043F\u0435\u0440\u0432\u043E\u043C \u044D\u043A\u0440\u0430\u043D\u0435 \u2014 \u0431\u0435\u0437 \u0441\u0442\u043E\u043A\u043E\u0432\u044B\u0445 \u043A\u0430\u0440\u0442\u0438\u043D\u043E\u043A.", palette: ["#FFFFFF", "#2F7A68", "#1A1D1C"] },
  { id: "brows", niche: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B", anatomy: "\u043C\u0438\u043D\u0438\u043C\u0430\u043B", domain: "sol-brows", Comp: BrowMinimal, note: "\u0412 \u043F\u0440\u0430\u0439\u0441\u0435 \u0434\u0432\u0435 \u0443\u0441\u043B\u0443\u0433\u0438. \u0421\u0430\u0439\u0442 \u0432\u044B\u0448\u0435\u043B \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u043C: \u043E\u0434\u0438\u043D \u043A\u0430\u0434\u0440 \u0438 \u043C\u043D\u043E\u0433\u043E \u043F\u0443\u0441\u0442\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430.", palette: ["#EFE7DA", "#7A5A3C", "#241E17"] },
  { id: "colorist", niche: "\u041A\u043E\u043B\u043E\u0440\u0438\u0441\u0442", anatomy: "\u043F\u0440\u0430\u0439\u0441-\u043C\u0435\u043D\u044E", domain: "kira-color", Comp: ColoristMenu, note: "\u041F\u044F\u0442\u044C \u0443\u0441\u043B\u0443\u0433 \u0441 \u0446\u0435\u043D\u0430\u043C\u0438. \u041F\u0440\u0430\u0439\u0441 \u0441\u0442\u0430\u043B \u0433\u043B\u0430\u0432\u043D\u044B\u043C \u0431\u043B\u043E\u043A\u043E\u043C, \u0441\u0430\u0439\u0442 \u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u043A\u0430\u043A \u043C\u0435\u043D\u044E.", palette: ["#F6F0F3", "#9C2A8E", "#221A24"] }
];
var ROWS = [{ ratio: [7, 5], side: "left" }, { ratio: [6, 6], side: "right" }, { ratio: [7, 5], side: "left" }, { ratio: [6, 6], side: "right" }, { ratio: [7, 5], side: "left" }];
function SitePreview({ children, stretch, decorative }) {
  return /* @__PURE__ */ jsx4("div", { "aria-hidden": decorative ? "true" : void 0, style: { border: `1px solid ${INK}`, overflow: "hidden", background: "#fff", height: stretch ? "100%" : "auto" }, children });
}
function PreviewWithCTA({ children, stretch, onView, label }) {
  const narrow = useNarrow();
  const [hover, setHover] = useState(false);
  const show = narrow || hover;
  const btn = narrow ? { position: "absolute", top: 0, left: 0, right: 0, justifyContent: "center", padding: "11px 14px", background: "rgba(27,23,18,.9)", color: "#F2EEE6" } : { position: "absolute", top: "50%", left: "50%", transform: `translate(-50%,-50%) scale(${hover ? 1 : 0.96})`, padding: "13px 22px", background: "#1B1712", color: "#F2EEE6" };
  return /* @__PURE__ */ jsxs3("div", { onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), style: { position: "relative", height: stretch ? "100%" : "auto" }, children: [
    /* @__PURE__ */ jsx4(SitePreview, { stretch, decorative: true, children }),
    !narrow && /* @__PURE__ */ jsx4("div", { style: { position: "absolute", inset: 0, background: "rgba(27,23,18,.28)", opacity: hover ? 1 : 0, transition: "opacity .18s ease", pointerEvents: "none" } }),
    /* @__PURE__ */ jsxs3(
      "button",
      {
        type: "button",
        onClick: onView,
        "aria-label": label ? `\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0430\u0439\u0442 \u2014 ${label}` : "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0430\u0439\u0442",
        style: { display: "inline-flex", alignItems: "center", gap: 8, font: "inherit", fontWeight: 700, fontSize: 14, cursor: "pointer", border: "none", whiteSpace: "nowrap", opacity: show ? 1 : 0, transition: "opacity .18s ease, transform .18s ease", pointerEvents: show ? "auto" : "none", ...btn },
        children: [
          "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0441\u0430\u0439\u0442 ",
          /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
        ]
      }
    )
  ] });
}
function V5_SiteViewer({ data, onClose, onClaim }) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  useEffect(() => {
    const opener = document.activeElement;
    document.body.classList.add("is-locked");
    if (closeRef.current) closeRef.current.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("is-locked");
      document.removeEventListener("keydown", onKey);
      if (opener && opener.focus) opener.focus();
    };
  }, []);
  const trapTab = (e) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const f = panelRef.current.querySelectorAll("button");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  const build = () => {
    onClose();
    if (onClaim) onClaim("example-" + data.id, data.niche);
  };
  const Comp = data.Comp;
  return /* @__PURE__ */ jsxs3("div", { role: "dialog", "aria-modal": "true", "aria-label": `\u041F\u0440\u0438\u043C\u0435\u0440 \u0441\u0430\u0439\u0442\u0430 \u2014 ${data.niche}`, onKeyDown: trapTab, style: { position: "fixed", inset: 0, zIndex: 120, display: "flex", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsx4("div", { onClick: onClose, style: { position: "absolute", inset: 0, background: "rgba(27,23,18,.7)", cursor: "pointer" } }),
    /* @__PURE__ */ jsxs3("div", { ref: panelRef, style: { position: "relative", width: "min(480px,100%)", height: "100%", display: "flex", flexDirection: "column", background: "#fff", borderInline: `1px solid ${INK}` }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", gap: 12, padding: "10px 10px 10px 18px", background: BONE, borderBottom: `1px solid ${INK}` }, children: [
        /* @__PURE__ */ jsxs3("span", { style: { flex: 1, minWidth: 0, fontFamily: MONO, fontSize: 11.5, letterSpacing: ".04em", color: INK70, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: [
          /* @__PURE__ */ jsx4("span", { style: { color: ACCENT }, children: "\u25B8" }),
          " ",
          data.domain,
          ".samosite.online"
        ] }),
        /* @__PURE__ */ jsx4("button", { ref: closeRef, type: "button", onClick: onClose, "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440", style: { width: 44, height: 44, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", border: `1px solid ${LINE2}`, color: INK, fontSize: 20, lineHeight: 1, cursor: "pointer" }, children: "\xD7" })
      ] }),
      /* @__PURE__ */ jsx4("div", { style: { flex: "1 1 auto", overflowY: "auto", WebkitOverflowScrolling: "touch" }, children: /* @__PURE__ */ jsx4(Comp, {}) }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: "0 0 auto", padding: "14px 18px", background: BONE, borderTop: `1px solid ${INK}`, display: "flex", flexDirection: "column", gap: 8 }, children: [
        /* @__PURE__ */ jsxs3("button", { type: "button", onClick: build, "data-entry": "example-" + data.id, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", minHeight: 52, padding: "13px 20px", background: ACCENT, color: VT.onAccent, border: "none", font: "inherit", fontFamily: SANS, fontWeight: 600, fontSize: 16, cursor: "pointer" }, children: [
          "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u0436\u0435 \u0437\u0430 2 \u0447\u0430\u0441\u0430 ",
          /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
        ] }),
        /* @__PURE__ */ jsxs3("span", { style: { fontFamily: MONO, fontSize: 10.5, letterSpacing: ".04em", color: INK70, textAlign: "center" }, children: [
          data.niche,
          " \xB7 \u0441\u043E\u0431\u0440\u0430\u043D \u0438\u0437 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u043C\u0430\u0441\u0442\u0435\u0440\u0430"
        ] })
      ] })
    ] })
  ] });
}
function Swatches({ palette }) {
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    palette.map((c, i) => /* @__PURE__ */ jsx4("span", { title: c, style: { width: 28, height: 28, borderRadius: "50%", background: c, border: `1px solid ${LINE2}`, flex: "0 0 auto" } }, i)),
    /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 11, letterSpacing: ".04em", color: INK45, marginLeft: 2 }, children: "\u043F\u0430\u043B\u0438\u0442\u0440\u0430 \u0438\u0437 \u0444\u043E\u0442\u043E" })
  ] });
}
function Meta({ data }) {
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 18, alignSelf: "start", position: "sticky", top: 96 }, children: [
    /* @__PURE__ */ jsx4("div", { style: { display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }, children: /* @__PURE__ */ jsx4("span", { style: { fontFamily: VT.font.display, fontWeight: 700, fontSize: 34, lineHeight: 1, letterSpacing: "-.01em", color: INK }, children: data.niche }) }),
    /* @__PURE__ */ jsx4("p", { style: { margin: 0, fontFamily: SANS, fontSize: 15.5, lineHeight: 1.5, color: INK70, maxWidth: "34ch", textWrap: "pretty" }, children: data.note }),
    /* @__PURE__ */ jsx4(Swatches, { palette: data.palette })
  ] });
}
function ExampleRowC({ data, row, onView, idx }) {
  const narrow = useNarrow();
  const Comp = data.Comp;
  const preview = /* @__PURE__ */ jsx4(PreviewWithCTA, { onView: () => onView(data), label: data.niche, children: /* @__PURE__ */ jsx4(Comp, {}) });
  const meta = /* @__PURE__ */ jsx4(Meta, { data });
  if (narrow) return /* @__PURE__ */ jsxs3("div", { "data-example-idx": idx, style: { display: "flex", flexDirection: "column", gap: 22 }, children: [
    meta,
    preview
  ] });
  const [a, b] = row.ratio;
  const previewFirst = row.side === "left";
  return /* @__PURE__ */ jsx4("div", { "data-example-idx": idx, style: { display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "clamp(24px,3vw,52px)", alignItems: "start" }, children: previewFirst ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx4("div", { style: { gridColumn: `span ${a}` }, children: preview }),
    /* @__PURE__ */ jsx4("div", { style: { gridColumn: `span ${b}` }, children: meta })
  ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
    /* @__PURE__ */ jsx4("div", { style: { gridColumn: `span ${b}` }, children: meta }),
    /* @__PURE__ */ jsx4("div", { style: { gridColumn: `span ${a}` }, children: preview })
  ] }) });
}
function CarouselCard({ data, onView }) {
  const Comp = data.Comp;
  return /* @__PURE__ */ jsxs3("div", { style: { flex: "0 0 auto", width: "clamp(300px,80vw,376px)", scrollSnapAlign: "start", display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 11 }, children: [
      /* @__PURE__ */ jsx4("span", { style: { fontFamily: VT.font.display, fontWeight: 700, fontSize: 26, lineHeight: 1, letterSpacing: "-.01em", color: INK }, children: data.niche }),
      /* @__PURE__ */ jsx4("p", { style: { margin: 0, fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: INK70, textWrap: "pretty", minHeight: "3em" }, children: data.note }),
      /* @__PURE__ */ jsx4(Swatches, { palette: data.palette })
    ] }),
    /* @__PURE__ */ jsx4(PreviewWithCTA, { onView: () => onView(data), label: data.niche, children: /* @__PURE__ */ jsx4(Comp, {}) })
  ] });
}
function CarouselExamples({ items, onView }) {
  const scroller = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pos, setPos] = useState(1);
  const cardStep = () => {
    const el = scroller.current;
    if (!el) return 0;
    const card = el.querySelector("[data-card]");
    return card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
  };
  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    const step = cardStep();
    if (step) setPos(Math.min(items.length, Math.max(1, Math.round(el.scrollLeft / step) + 1)));
  };
  useEffect(() => {
    onScroll();
    window.addEventListener("resize", onScroll);
    return () => window.removeEventListener("resize", onScroll);
  }, [items.length]);
  const nudge = (dir) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };
  const onKey = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nudge(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      nudge(-1);
    }
  };
  const Arrow = ({ dir, disabled }) => /* @__PURE__ */ jsx4("button", { type: "button", "aria-label": dir < 0 ? "\u041D\u0430\u0437\u0430\u0434" : "\u0412\u043F\u0435\u0440\u0451\u0434", onClick: () => nudge(dir), disabled, style: { width: 46, height: 46, flex: "0 0 auto", display: "inline-flex", alignItems: "center", justifyContent: "center", background: disabled ? "transparent" : "#fff", border: `1px solid ${disabled ? LINE : INK}`, color: disabled ? LINE2 : INK, cursor: disabled ? "default" : "pointer", fontSize: 20, lineHeight: 1, transition: "background .15s, border-color .15s, color .15s" }, children: dir < 0 ? "\u2190" : "\u2192" });
  return /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16, marginBottom: 20 }, children: [
      /* @__PURE__ */ jsxs3("span", { "aria-live": "polite", style: { fontFamily: MONO, fontSize: 12, letterSpacing: ".1em", color: INK70 }, children: [
        pos,
        " / ",
        items.length
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 10 }, children: [
        /* @__PURE__ */ jsx4(Arrow, { dir: -1, disabled: atStart }),
        /* @__PURE__ */ jsx4(Arrow, { dir: 1, disabled: atEnd })
      ] })
    ] }),
    /* @__PURE__ */ jsx4(
      "div",
      {
        ref: scroller,
        onScroll,
        tabIndex: 0,
        role: "region",
        "aria-label": `\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0441\u0430\u0439\u0442\u043E\u0432, ${items.length} \u043A\u0430\u0440\u0442\u043E\u0447\u0435\u043A \u2014 \u043F\u0440\u043E\u043A\u0440\u0443\u0442\u043A\u0430 \u0441\u0442\u0440\u0435\u043B\u043A\u0430\u043C\u0438`,
        onKeyDown: onKey,
        style: { display: "flex", gap: 24, overflowX: "auto", scrollSnapType: "x mandatory", paddingBottom: 14, margin: "0 calc(-1*var(--pad))", paddingInline: "var(--pad)", scrollPaddingInline: "var(--pad)", WebkitOverflowScrolling: "touch" },
        children: items.map((e, i) => /* @__PURE__ */ jsx4("div", { "data-card": true, "data-example-idx": i, id: "ex-" + e.id, style: { display: "flex" }, children: /* @__PURE__ */ jsx4(CarouselCard, { data: e, onView }) }, e.id))
      }
    )
  ] });
}
function V5_Examples({ layout = "carousel", onIntake = noop }) {
  const [viewer, setViewer] = useState(null);
  const onView = (data) => setViewer(data);
  return /* @__PURE__ */ jsx4("section", { className: "section", id: "examples", "aria-labelledby": "ex-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx4("div", { className: "shead", children: /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "ex-h", children: "\u041F\u044F\u0442\u044C \u0441\u0430\u0439\u0442\u043E\u0432, \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0438\u0437\xA0\u043F\u0440\u043E\u0444\u0438\u043B\u0435\u0439 \u043C\u0430\u0441\u0442\u0435\u0440\u043E\u0432" }) }) }),
    /* @__PURE__ */ jsx4("div", { id: "examples-root", "data-layout": layout, "aria-label": "\u041F\u0440\u0438\u043C\u0435\u0440\u044B \u0441\u0433\u0435\u043D\u0435\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0441\u0430\u0439\u0442\u043E\u0432", style: { minHeight: 600 }, children: layout === "carousel" ? /* @__PURE__ */ jsx4(CarouselExamples, { items: EXAMPLES, onView }) : /* @__PURE__ */ jsx4("div", { style: { display: "flex", flexDirection: "column", gap: "clamp(56px,7vw,104px)" }, children: EXAMPLES.map((e, i) => /* @__PURE__ */ jsx4("div", { id: "ex-" + e.id, children: /* @__PURE__ */ jsx4(ExampleRowC, { data: e, row: ROWS[i], onView, idx: i }) }, e.id)) }) }),
    /* @__PURE__ */ jsx4("p", { className: "lead", style: { marginTop: "clamp(40px,4vw,64px)", maxWidth: "74ch" }, children: "\u041F\u0430\u043B\u0438\u0442\u0440\u0443 \u0438\xA0\u0448\u0440\u0438\u0444\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0431\u0435\u0440\u0451\u0442 \u0438\u0437\xA0\u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E. \u0415\u0441\u043B\u0438 \u0441\u0442\u0438\u043B\u044C \u043D\u0435\xA0\u043F\u043E\u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F, \u043F\u043E\u043C\u0435\u043D\u044F\u0435\u0442\u0435 \u0432\xA0\u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A." }),
    viewer && /* @__PURE__ */ jsx4(V5_SiteViewer, { data: viewer, onClose: () => setViewer(null), onClaim: onIntake })
  ] }) });
}
function V5_HeroSite() {
  const compact = useCompact();
  const rows = [["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", "2 400 \u20BD"], ["\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 2 \u043D\u043E\u0433\u0442\u044F", "300 \u20BD"], ["\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", "600 \u20BD"], ["\u0421\u043D\u044F\u0442\u0438\u0435 \u0447\u0443\u0436\u043E\u0433\u043E \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", "400 \u20BD"]];
  return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", height: compact ? "auto" : "100%", minHeight: 0, background: Pn.bg, color: Pn.ink }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 16px", borderBottom: `1px solid ${Pn.line}` }, children: [
      /* @__PURE__ */ jsx4("span", { style: { fontFamily: Pn.serif, fontWeight: 600, fontSize: 18, color: Pn.ink }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
      /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 9, letterSpacing: ".12em", textTransform: "uppercase", color: Pn.soft }, children: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433 \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { position: "relative", flex: compact ? "0 0 auto" : "1 1 auto", height: compact ? 300 : "auto", minHeight: 0 }, children: [
      /* @__PURE__ */ jsx4(Img, { src: "img/nails.png", label: "\u043C\u0430\u043D\u0438\u043A\u044E\u0440 \xB7 \u043C\u0430\u043A\u0440\u043E", ph: ["#E7C9C9", "#D9AEB2", "#7A3A44"], style: { objectPosition: "center 28%" } }),
      /* @__PURE__ */ jsx4("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,16,15,.66) 0%, rgba(20,16,15,0) 50%)" } }),
      /* @__PURE__ */ jsxs3("h3", { style: { position: "absolute", left: 16, right: 16, bottom: 14, margin: 0, fontFamily: Pn.serif, fontWeight: 600, fontSize: 25, lineHeight: 1, letterSpacing: "-.01em", color: "#FBFBFC" }, children: [
        "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440, ",
        /* @__PURE__ */ jsx4("span", { style: { fontStyle: "italic", color: "#F4C9C4" }, children: "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { flex: "0 0 auto", padding: "11px 16px 14px", display: "flex", flexDirection: "column", gap: 8 }, children: [
      rows.map((r, i) => /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, paddingBottom: i < rows.length - 1 ? 8 : 0, borderBottom: i < rows.length - 1 ? `1px solid ${Pn.line}` : "none" }, children: [
        /* @__PURE__ */ jsx4("span", { style: { fontFamily: SANS, fontWeight: 600, fontSize: 13.5, color: Pn.ink }, children: r[0] }),
        /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 12, color: Pn.ink, whiteSpace: "nowrap" }, children: r[1] })
      ] }, i)),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 6, padding: "12px 14px", background: "#F0E3DE", borderLeft: `3px solid ${Pn.accent}` }, children: [
        /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx4("span", { "aria-label": "5 \u0438\u0437 5", style: { color: "#C9922E", fontSize: 13, letterSpacing: "1.5px" }, children: "\u2605\u2605\u2605\u2605\u2605" }),
          /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 10, letterSpacing: ".06em", color: Pn.soft }, children: "5,0 \xB7 \u042F\u043D\u0434\u0435\u043A\u0441" })
        ] }),
        /* @__PURE__ */ jsx4("p", { style: { margin: 0, fontFamily: Pn.serif, fontWeight: 600, fontStyle: "italic", fontSize: 17.5, lineHeight: 1.3, color: Pn.ink }, children: "\xAB\u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F \u0440\u043E\u0432\u043D\u043E \u0442\u0440\u0438 \u043D\u0435\u0434\u0435\u043B\u0438\xBB" }),
        /* @__PURE__ */ jsx4("span", { style: { fontFamily: MONO, fontSize: 10, letterSpacing: ".03em", color: Pn.soft }, children: "\u041E\u043B\u0435\u0441\u044F \u041D. \xB7 3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434" })
      ] }),
      /* @__PURE__ */ jsxs3(FakeCTA, { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: Pn.btn, color: Pn.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 13.5, padding: "11px 16px", textDecoration: "none", marginTop: 2 }, children: [
        "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0432 Telegram ",
        /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
      ] })
    ] })
  ] });
}
var DEFAULT_ANCHORS = [
  { href: "#examples", label: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" },
  { href: "#how", label: "\u041A\u0430\u043A \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442" },
  { href: "#reviews", label: "\u041E\u0442\u0437\u044B\u0432\u044B" },
  { href: "#tariffs", label: "\u0422\u0430\u0440\u0438\u0444\u044B" },
  { href: "#faq", label: "\u0412\u043E\u043F\u0440\u043E\u0441\u044B" }
];
function V5_Header({ anchors = DEFAULT_ANCHORS, onIntake = noop }) {
  return /* @__PURE__ */ jsxs3("header", { className: "hdr", children: [
    /* @__PURE__ */ jsxs3("div", { className: "wrap hdr__in", children: [
      /* @__PURE__ */ jsxs3("a", { className: "logo", href: "#top", children: [
        "\u0421\u0430\u043C\u043E",
        /* @__PURE__ */ jsx4("b", { children: "\u0441\u0430\u0439\u0442" })
      ] }),
      /* @__PURE__ */ jsxs3("nav", { className: "hdr__nav", "aria-label": "\u041E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F", children: [
        /* @__PURE__ */ jsx4("div", { className: "hdr__links", children: anchors.map((a) => /* @__PURE__ */ jsx4("a", { href: a.href, children: a.label }, a.href)) }),
        /* @__PURE__ */ jsx4("button", { className: "btn btn--44 hdr__cta", type: "button", "data-entry": "header", onClick: () => onIntake("header"), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
        /* @__PURE__ */ jsx4("button", { className: "btn btn--44 hdr__cta-m", type: "button", "data-entry": "header", onClick: () => onIntake("header"), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442" })
      ] })
    ] }),
    /* @__PURE__ */ jsx4("nav", { className: "hdr__anchors", "aria-label": "\u0420\u0430\u0437\u0434\u0435\u043B\u044B \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B", children: anchors.map((a) => /* @__PURE__ */ jsx4("a", { href: a.href, children: a.label }, a.href)) })
  ] });
}
function V5_Hero({ onIntake = noop }) {
  const [copyRef, copyCls] = useReveal();
  const [prevRef, prevCls] = useReveal();
  return /* @__PURE__ */ jsx4("section", { className: "hero", id: "top", "aria-label": "\u041E\u0444\u0444\u0435\u0440", children: /* @__PURE__ */ jsxs3("div", { className: "hero__grid wrap", children: [
    /* @__PURE__ */ jsxs3("div", { ref: copyRef, className: "hero__copy " + copyCls, children: [
      /* @__PURE__ */ jsxs3("h1", { className: "hero-h", children: [
        "\u0421\u0430\u0439\u0442 \u0434\u043B\u044F \u0431\u044C\u044E\u0442\u0438-\u043C\u0430\u0441\u0442\u0435\u0440\u0430 ",
        /* @__PURE__ */ jsx4("span", { className: "accent", children: "\u0437\u0430\xA02\xA0\u0447\u0430\u0441\u0430" })
      ] }),
      /* @__PURE__ */ jsx4("p", { className: "lead hero__lead", children: "\u041D\u0430\u0437\u043E\u0432\u0438\u0442\u0435 \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E \u0438\xA0\u0433\u043E\u0440\u043E\u0434 \u2014 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043D\u0430\u0439\u0434\u0451\u0442 \u0432\u0430\u0448\u0443 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0432\xA02\u0413\u0418\u0421 \u0438\u043B\u0438 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441\xA0\u041A\u0430\u0440\u0442\u0430\u0445, \u0437\u0430\u0431\u0435\u0440\u0451\u0442 \u043E\u0442\u0442\u0443\u0434\u0430 \u0443\u0441\u043B\u0443\u0433\u0438, \u0446\u0435\u043D\u044B, \u043E\u0442\u0437\u044B\u0432\u044B, \u0444\u043E\u0442\u043E \u0438\xA0\u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0438\u0437\xA0\u043D\u0438\u0445 \u0441\u0430\u0439\u0442." }),
      /* @__PURE__ */ jsxs3("div", { className: "hero__cta", children: [
        /* @__PURE__ */ jsxs3("button", { className: "btn btn--56", type: "button", "data-entry": "hero", onClick: () => onIntake("hero"), children: [
          "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430 ",
          /* @__PURE__ */ jsx4("span", { className: "arw", children: "\u2192" })
        ] }),
        /* @__PURE__ */ jsxs3("a", { className: "hero__examples", href: "#examples", children: [
          /* @__PURE__ */ jsx4("span", { children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u043F\u0440\u0438\u043C\u0435\u0440\u044B" }),
          " ",
          /* @__PURE__ */ jsx4("span", { className: "arw", "aria-hidden": "true", children: "\u2192" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("p", { className: "hero__proof", children: [
        "\u0421\u0442\u0430\u0440\u0442: ",
        /* @__PURE__ */ jsx4("b", { children: "0\xA0\u20BD" }),
        " \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430 \xB7 \u043F\u043B\u0430\u0442\u043D\u044B\u0435 ",
        /* @__PURE__ */ jsx4("b", { children: "\u043E\u0442\xA0690\xA0\u20BD/\u043C\u0435\u0441" }),
        ", \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u0431\u0435\u0437\xA0\u043A\u0430\u0440\u0442\u044B"
      ] })
    ] }),
    /* @__PURE__ */ jsx4("figure", { ref: prevRef, className: "hero__preview " + prevCls, "aria-label": "\u041F\u0440\u0438\u043C\u0435\u0440 \u0441\u0430\u0439\u0442\u0430, \u0441\u043E\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u043E\u043C", children: /* @__PURE__ */ jsx4("div", { id: "hero-preview-root", children: /* @__PURE__ */ jsx4(SitePreview, { stretch: true, decorative: true, children: /* @__PURE__ */ jsx4(V5_HeroSite, {}) }) }) })
  ] }) });
}
function V5_Story({ onIntake = noop }) {
  const [ref, cls] = useReveal();
  return /* @__PURE__ */ jsx4("section", { className: "section", id: "story", "data-metric": "story_view", "aria-labelledby": "story-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx4("div", { className: "shead", children: /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "story-h", children: "\u0417\u0430\u043F\u0438\u0441\u044C \u0432\xA0Dikidi, \u0444\u043E\u0442\u043E \u0432\xA02\u0413\u0418\u0421, \u043E\u0442\u0437\u044B\u0432\u044B \u043D\u0430\xA0\u041A\u0430\u0440\u0442\u0430\u0445. \u0412\u043C\u0435\u0441\u0442\u0435 \u043D\u0438\u0433\u0434\u0435" }) }) }),
    /* @__PURE__ */ jsx4("div", { className: "story", children: /* @__PURE__ */ jsxs3("div", { ref, className: "story__lead " + cls, children: [
      /* @__PURE__ */ jsx4("p", { className: "lead", children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0432\u0441\u0451 \u0432\xA0\u043E\u0434\u043D\u043E \u043C\u0435\u0441\u0442\u043E. \u0425\u0432\u0430\u0442\u0438\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0432\xA02\u0413\u0418\u0421 \u0438\u043B\u0438 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441\xA0\u041A\u0430\u0440\u0442\u0430\u0445, \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442, \u0441\u043D\u0438\u043C\u043A\u0430 \u043F\u0440\u0430\u0439\u0441\u0430. \u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0443\xA0\u0432\u0430\u0441: \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u043F\u043E\u0432\u0435\u0434\u0451\u0442 \u0432\xA0\u0432\u0430\u0448 Dikidi \u0438\u043B\u0438 YClients." }),
      /* @__PURE__ */ jsxs3("div", { className: "src", "aria-label": "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438, \u0438\u0437 \u043A\u043E\u0442\u043E\u0440\u044B\u0445 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0432\u0438\u0442\u0440\u0438\u043D\u0430", children: [
        /* @__PURE__ */ jsxs3("span", { className: "src__i", children: [
          /* @__PURE__ */ jsxs3("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx4("path", { d: "M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" }),
            /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "10", r: "2.6" })
          ] }),
          "\u042F.\u041A\u0430\u0440\u0442\u044B"
        ] }),
        /* @__PURE__ */ jsxs3("span", { className: "src__i", children: [
          /* @__PURE__ */ jsxs3("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx4("path", { d: "M9 4 3 6.2v14L9 18l6 2.2 6-2.2v-14L15 6.2 9 4z" }),
            /* @__PURE__ */ jsx4("path", { d: "M9 4v14M15 6.2v14" })
          ] }),
          "2\u0413\u0418\u0421"
        ] }),
        /* @__PURE__ */ jsxs3("span", { className: "src__i", children: [
          /* @__PURE__ */ jsxs3("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx4("path", { d: "M22 3 2 11l6 2.3L11 20l3-4.6L20 20z" }),
            /* @__PURE__ */ jsx4("path", { d: "m8 13.3 9-6.8-6 8" })
          ] }),
          "Telegram"
        ] }),
        /* @__PURE__ */ jsxs3("span", { className: "src__i", children: [
          /* @__PURE__ */ jsxs3("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx4("rect", { x: "3", y: "4.5", width: "18", height: "15", rx: "0" }),
            /* @__PURE__ */ jsx4("circle", { cx: "8.5", cy: "10", r: "1.8" }),
            /* @__PURE__ */ jsx4("path", { d: "m21 16-5-5-8 8" })
          ] }),
          "\u0444\u043E\u0442\u043E"
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("a", { className: "tlink", href: "#start", "data-entry": "story", onClick: (e) => {
        e.preventDefault();
        onIntake("story");
      }, style: { marginTop: 26 }, children: [
        /* @__PURE__ */ jsx4("span", { className: "u", children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0438\u0437 \u043F\u0440\u043E\u0444\u0438\u043B\u044F" }),
        " ",
        /* @__PURE__ */ jsx4("span", { className: "arw", children: "\u2192" })
      ] })
    ] }) })
  ] }) });
}
var STEPS = [
  ["01", "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044C", "2 \u043C\u0438\u043D\u0443\u0442\u044B.", /* @__PURE__ */ jsx4(Fragment2, { children: "\u042F\u043D\u0434\u0435\u043A\u0441 \u041A\u0430\u0440\u0442\u044B, 2\u0413\u0418\u0421, Telegram \u0438\u043B\u0438 \u043F\u0430\u043F\u043A\u0430 \u0441\xA0\u0444\u043E\u0442\u043E. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0437\u0430\u0431\u0435\u0440\u0451\u0442 \u0443\u0441\u043B\u0443\u0433\u0438, \u0446\u0435\u043D\u044B, \u043E\u0442\u0437\u044B\u0432\u044B \u0438\xA0\u0444\u043E\u0442\u043E." })],
  ["02", "\u0421\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442", "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430.", /* @__PURE__ */ jsx4(Fragment2, { children: "\u0422\u0435\u043A\u0441\u0442\u044B \u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u043C, \u043F\u0430\u043B\u0438\u0442\u0440\u0443 \u0438\xA0\u0448\u0440\u0438\u0444\u0442 \u0431\u0435\u0440\u0451\u0442 \u0438\u0437\xA0\u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E. \u0412\u044B \u0433\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \xAB\u043E\u043A\xBB \u2014 \u0441\u0430\u0439\u0442 \u0432\u044B\u0445\u043E\u0434\u0438\u0442 \u043D\u0430\xA0\u0430\u0434\u0440\u0435\u0441\u0435 \u0432\u0438\u0434\u0430 anna-nails.samosite.online" })],
  ["03", "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0441\u0430\u043C", "\u0420\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E.", /* @__PURE__ */ jsx4(Fragment2, { children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043E\u0442\u0431\u0438\u0440\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\xA0\u0432\u044B\u0432\u043E\u0434\u0438\u0442 \u0438\u0445\xA0\u043D\u0430\xA0\u0441\u0430\u0439\u0442, \u0430\xA0\u0435\u0441\u043B\u0438 \u0432\xA0\u043F\u0440\u043E\u0444\u0438\u043B\u0435 \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u0438\u0441\u044C \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u043B\u0438 \u0446\u0435\u043D\u044B \u2014 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u0438\u0445\xA0\u0443\xA0\u0432\u0430\u0441." })],
  ["04", "\u041F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0438\u0434\u0435\u0438 \u0440\u043E\u0441\u0442\u0430", "\u041F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u0432 9:00.", /* @__PURE__ */ jsx4(Fragment2, { children: "\u0414\u043E\xA0\u0442\u0440\u0451\u0445 \u0438\u0434\u0435\u0439; \u043A\u0430\u0436\u0434\u0430\u044F \u043E\u043F\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u043D\u0430\xA0\u0432\u0430\u0448\u0438 \u0446\u0438\u0444\u0440\u044B \u0438\xA0\u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u043E\u0434\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435. \u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0432\xA0\u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A." })]
];
function StepRow({ n, t, when, d }) {
  const [ref, cls] = useReveal();
  return /* @__PURE__ */ jsxs3("div", { ref, className: "steprow " + cls, children: [
    /* @__PURE__ */ jsx4("span", { className: "steprow__n", children: n }),
    /* @__PURE__ */ jsxs3("div", { className: "steprow__c", children: [
      /* @__PURE__ */ jsx4("div", { className: "steprow__head", children: /* @__PURE__ */ jsx4("h3", { className: "steprow__t", children: t }) }),
      /* @__PURE__ */ jsxs3("p", { className: "steprow__d", children: [
        /* @__PURE__ */ jsx4("b", { className: "steprow__when", children: when }),
        " ",
        d
      ] })
    ] })
  ] });
}
function V5_HowItWorks() {
  const [monRef, monCls] = useReveal();
  return /* @__PURE__ */ jsx4("section", { className: "section", id: "how", "aria-labelledby": "how-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxs3("div", { className: "shead", children: [
      /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "how-h", children: "\u0421\u043E\u0431\u0440\u0430\u043B\u0438 \u0437\u0430\xA02 \u0447\u0430\u0441\u0430 \u2014 \u0434\u0430\u043B\u044C\u0448\u0435 \u0441\u0430\u0439\u0442 \u0440\u0430\u0437\u0432\u0438\u0432\u0430\u0435\u0442 \u0441\u0435\u0431\u044F \u0441\u0430\u043C" }) }),
      /* @__PURE__ */ jsx4("p", { className: "small shead__note", children: "\u0427\u0435\u0442\u044B\u0440\u0435 \u0448\u0430\u0433\u0430. \u0412\u044B \u0443\u0447\u0430\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u0432\xA0\u043F\u0435\u0440\u0432\u043E\u043C" })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "steps", children: STEPS.map((s) => /* @__PURE__ */ jsx4(StepRow, { n: s[0], t: s[1], when: s[2], d: s[3] }, s[0])) }),
    /* @__PURE__ */ jsxs3("div", { ref: monRef, className: "how-mon " + monCls, children: [
      /* @__PURE__ */ jsxs3("div", { className: "how-mon__head", children: [
        /* @__PURE__ */ jsx4("span", { className: "label", style: { color: "var(--accent)" }, children: "\u041F\u0440\u0438\u043C\u0435\u0440 \xB7 \u043F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u0432 9:00" }),
        /* @__PURE__ */ jsx4("h3", { className: "how-mon__h", children: "\u0422\u0430\u043A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u043F\u0438\u0441\u044C\u043C\u043E \u0432\xA0\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A" }),
        /* @__PURE__ */ jsx4("p", { className: "small", children: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\xA0\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F, \u043F\u043E\u043A\u0430 \u0432\u044B \u043D\u0435\xA0\u043D\u0430\u0436\u043C\u0451\u0442\u0435 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB. \u041F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0432\xA0Telegram, MAX, \u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS." })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "msg", children: [
        /* @__PURE__ */ jsxs3("div", { className: "msg__head", children: [
          /* @__PURE__ */ jsx4("span", { className: "label", children: "\u041F\u043D 09:00 \xB7 \u0418\u0434\u0435\u044F" }),
          /* @__PURE__ */ jsx4("span", { className: "tag2", children: "1 / 3" })
        ] }),
        /* @__PURE__ */ jsx4("p", { className: "msg__t", children: "\xAB\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u043E\u0433\u0442\u0435\u0439\xBB \u0441\u043C\u043E\u0442\u0440\u044F\u0442, \u043D\u043E \u043D\u0435 \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0442\u0441\u044F" }),
        /* @__PURE__ */ jsx4("p", { className: "msg__d", children: "\u0423 \u0443\u0441\u043B\u0443\u0433\u0438 \u043D\u0435\u0442 \u0446\u0435\u043D\u044B \u0438 \u0444\u043E\u0442\u043E. \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C 3\u20134 \u0444\u043E\u0442\u043E \u0438 \u0446\u0435\u043D\u0443 \xAB\u043E\u0442 300\xA0\u20BD\xBB?" }),
        /* @__PURE__ */ jsxs3("div", { className: "msg__act", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx4("span", { className: "btn btn--44", style: { cursor: "default" }, children: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C" }),
          /* @__PURE__ */ jsx4("span", { className: "tlink glink", children: /* @__PURE__ */ jsx4("span", { className: "u", children: "\u0421\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442" }) }),
          /* @__PURE__ */ jsx4("span", { className: "tlink glink", children: /* @__PURE__ */ jsx4("span", { className: "u", children: "\u041D\u0435 \u043D\u0430\u0434\u043E" }) })
        ] })
      ] })
    ] })
  ] }) });
}
var REVIEWS = [
  { q: /* @__PURE__ */ jsx4(Fragment2, { children: "\xAB\u0420\u0430\u043D\u044C\u0448\u0435 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u043B\u0430 \u043F\u0440\u0430\u0439\u0441 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u043E\u043C \u0432\xA0\u0434\u0438\u0440\u0435\u043A\u0442. \u0422\u0435\u043F\u0435\u0440\u044C \u043A\u0438\u0434\u0430\u044E \u0441\u0441\u044B\u043B\u043A\u0443 \u2014 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u0441\u0430\u043C \u0432\u0441\u0451 \u0432\u0438\u0434\u0438\u0442 \u0438\xA0\u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F\xBB" }), ini: "\u0410", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80", who: "\u0410\u043D\u043D\u0430 \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \xB7 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", site: "anna-nails.samosite.online" },
  { q: /* @__PURE__ */ jsx4(Fragment2, { children: "\xAB\u0421\u0430\u0439\u0442 \u0441\u043E\u0431\u0440\u0430\u043B\u0441\u044F \u0438\u0437\xA0\u043C\u043E\u0435\u0433\u043E 2\u0413\u0418\u0421, \u043F\u043E\u043A\u0430 \u044F \u0441\u0442\u0440\u0438\u0433 \u043A\u043B\u0438\u0435\u043D\u0442\u0430. \u041F\u043E\u043C\u0435\u043D\u044F\u043B \u043E\u0434\u043D\u043E \u0444\u043E\u0442\u043E \u0438\xA0\u043D\u0430\u0436\u0430\u043B \xAB\u043E\u043A\xBB\xBB" }), ini: "\u0424", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&q=80", who: "\u0424\u0451\u0434\u043E\u0440 \xB7 \u0431\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xB7 \u041C\u043E\u0441\u043A\u0432\u0430", site: "fedor-barber.samosite.online" },
  { q: /* @__PURE__ */ jsx4(Fragment2, { children: "\xAB\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u0447\u043D\u044B\u0435 \u0438\u0434\u0435\u0438 \u2014 \u043A\u0430\u043A \u0430\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0430\u0442\u043E\u0440, \u043A\u043E\u0442\u043E\u0440\u043E\u0433\u043E \u0443\xA0\u043C\u0435\u043D\u044F \u043D\u0435\u0442. \u041E\u0434\u043D\u043E \u0434\u0435\u043B\u043E \u0432\xA0\u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0441\u0434\u0435\u043B\u0430\u043B\u0430 \u0438\xA0\u0437\u0430\u0431\u044B\u043B\u0430\xBB" }), ini: "\u042E", img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=96&q=80", who: "\u042E\u043B\u0438\u044F \xB7 \u043A\u043E\u0441\u043C\u0435\u0442\u043E\u043B\u043E\u0433 \xB7 \u041A\u0430\u0437\u0430\u043D\u044C", site: "yulia-skin.samosite.online" }
];
function ReviewCard({ q, ini, img, who, site }) {
  const [ref, cls] = useReveal();
  return /* @__PURE__ */ jsxs3("figure", { ref, className: "rev " + cls, children: [
    /* @__PURE__ */ jsx4("blockquote", { className: "rev__q", children: q }),
    /* @__PURE__ */ jsxs3("figcaption", { className: "rev__a", children: [
      /* @__PURE__ */ jsxs3("span", { className: "rev__ph", "aria-hidden": "true", children: [
        /* @__PURE__ */ jsx4("b", { children: ini }),
        /* @__PURE__ */ jsx4("img", { src: img, alt: "", loading: "lazy", onError: (e) => e.target.remove() })
      ] }),
      /* @__PURE__ */ jsxs3("span", { className: "rev__at", children: [
        who,
        /* @__PURE__ */ jsx4("span", { children: site })
      ] })
    ] })
  ] });
}
function V5_Reviews() {
  return /* @__PURE__ */ jsx4("section", { className: "section", id: "reviews", "data-metric": "reviews_view", "aria-labelledby": "rev-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx4("div", { className: "shead", children: /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "rev-h", children: "\u041C\u0430\u0441\u0442\u0435\u0440\u0430 \u043E\xA0\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" }) }) }),
    /* @__PURE__ */ jsx4("div", { className: "revs", children: REVIEWS.map((r, i) => /* @__PURE__ */ jsx4(ReviewCard, { ...r }, i)) })
  ] }) });
}
var TIERS = [
  { entry: "pricing-start", name: "\u0421\u0442\u0430\u0440\u0442", tag: null, sub: /* @__PURE__ */ jsx4(Fragment2, { children: "\u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430" }), price: /* @__PURE__ */ jsx4(Fragment2, { children: "0\xA0\u20BD" }), hi: false, cta: "\u041D\u0430\u0447\u0430\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", secondary: true, rows: [["\u0421\u0430\u0439\u0442\u043E\u0432 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0435", "1", false], ["\u0421\u0442\u0440\u0430\u043D\u0438\u0446 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435", "1", false], ["\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D", "\u043D\u0435\u0442", true], ["\u0418\u0434\u0435\u0439 \u043F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C", "\u043D\u0435\u0442", true], ["\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", "\u043E\u0431\u044B\u0447\u043D\u0430\u044F", false]] },
  { entry: "pricing-lichny", name: "\u041B\u0438\u0447\u043D\u044B\u0439", tag: "\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439", sub: /* @__PURE__ */ jsx4(Fragment2, { children: "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0430 \u043D\u0435\xA0\u043D\u0443\u0436\u043D\u0430" }), price: /* @__PURE__ */ jsxs3(Fragment2, { children: [
    "690\xA0\u20BD",
    /* @__PURE__ */ jsx4("span", { children: "/\u043C\u0435\u0441" })
  ] }), hi: true, cta: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", secondary: false, rows: [["\u0421\u0430\u0439\u0442\u043E\u0432 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0435", "1", false], ["\u0421\u0442\u0440\u0430\u043D\u0438\u0446 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435", "\u0434\u043E 5", false], ["\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D", "\u0434\u0430", false], ["\u0418\u0434\u0435\u0439 \u043F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C", "\u0434\u043E 3", false], ["\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", "\u043E\u0431\u044B\u0447\u043D\u0430\u044F", false]] },
  { entry: "pricing-biznes", name: "\u0411\u0438\u0437\u043D\u0435\u0441", tag: null, sub: /* @__PURE__ */ jsx4(Fragment2, { children: "\u0414\u043B\u044F \u0441\u0442\u0443\u0434\u0438\u0439 \u0441\xA0\u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u0438\u043C\u0438 \u043C\u0430\u0441\u0442\u0435\u0440\u0430\u043C\u0438" }), price: /* @__PURE__ */ jsxs3(Fragment2, { children: [
    "1 490\xA0\u20BD",
    /* @__PURE__ */ jsx4("span", { children: "/\u043C\u0435\u0441" })
  ] }), hi: false, cta: "\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", secondary: true, rows: [["\u0421\u0430\u0439\u0442\u043E\u0432 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0435", "3", false], ["\u0421\u0442\u0440\u0430\u043D\u0438\u0446 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435", "\u0434\u043E 15", false], ["\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D", "\u0434\u0430", false], ["\u0418\u0434\u0435\u0439 \u043F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C", "\u0434\u043E 10", false], ["\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430", "\u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u0430\u044F", false]] }
];
function V5_Pricing({ onIntake = noop }) {
  return /* @__PURE__ */ jsx4("section", { className: "section", id: "tariffs", "data-metric": "pricing_view", "aria-labelledby": "tf-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxs3("div", { className: "shead", children: [
      /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "tf-h", children: "\u041E\u043A\u0443\u043F\u0438\u0442\u0441\u044F \u0441\xA01 \u0437\u0430\u043A\u0430\u0437\u0430" }) }),
      /* @__PURE__ */ jsx4("p", { className: "small shead__note", children: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 \u0447\u0435\u043A \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430 \u2014 \u043E\u043A\u043E\u043B\u043E 2\xA0400\xA0\u20BD: \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u0435\u043D\u0442 \u0441\xA0\u0441\u0430\u0439\u0442\u0430 \u043E\u043A\u0443\u043F\u0430\u0435\u0442 \xAB\u041B\u0438\u0447\u043D\u044B\u0439\xBB \u043D\u0430\xA0\u0442\u0440\u0438 \u043C\u0435\u0441\u044F\u0446\u0430 \u0432\u043F\u0435\u0440\u0451\u0434. \u0421\u043E\xA0\xAB\u0421\u0442\u0430\u0440\u0442\u0430\xBB \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u043D\u0430\xA0\u043F\u043B\u0430\u0442\u043D\u044B\u0439: \u0441\u0430\u0439\u0442 \u0438\xA0\u0434\u0430\u043D\u043D\u044B\u0435 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsx4("div", { className: "tcards", "aria-label": "\u0422\u0430\u0440\u0438\u0444\u044B", children: TIERS.map((t) => /* @__PURE__ */ jsxs3("div", { className: "tcard" + (t.hi ? " tcard--hi" : ""), "data-pricing-tier": t.entry.replace("pricing-", ""), children: [
      /* @__PURE__ */ jsxs3("div", { className: "tcard__head", children: [
        /* @__PURE__ */ jsx4("span", { className: "pt-name", children: t.name }),
        t.tag ? /* @__PURE__ */ jsx4("span", { className: "pt-tag", children: t.tag }) : null,
        /* @__PURE__ */ jsx4("span", { className: "pt-sub", children: t.sub }),
        /* @__PURE__ */ jsx4("span", { className: "pt-price", children: t.price })
      ] }),
      /* @__PURE__ */ jsx4("ul", { className: "tcard__list", children: t.rows.map((r, i) => /* @__PURE__ */ jsxs3("li", { children: [
        /* @__PURE__ */ jsx4("span", { children: r[0] }),
        /* @__PURE__ */ jsx4("b", { className: r[2] ? "no" : void 0, children: r[1] })
      ] }, i)) }),
      /* @__PURE__ */ jsx4("button", { className: "btn btn--44 btn--block" + (t.secondary ? " btn--sec" : ""), type: "button", "data-entry": t.entry, onClick: () => onIntake(t.entry), children: t.cta })
    ] }, t.entry)) }),
    /* @__PURE__ */ jsxs3("p", { className: "tcommon", children: [
      /* @__PURE__ */ jsx4("b", { children: "\u0412\u043E \u0432\u0441\u0435\u0445 \u0442\u0430\u0440\u0438\u0444\u0430\u0445:" }),
      " \u0430\u0434\u0440\u0435\u0441 \u043D\u0430\xA0samosite.online, \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435 \u0440\u0430\u0437 \u0432\xA0\u043D\u0435\u0434\u0435\u043B\u044E, \u044D\u043A\u0441\u043F\u043E\u0440\u0442 \u0441\u0430\u0439\u0442\u0430 \u0430\u0440\u0445\u0438\u0432\u043E\u043C, \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0434\u0430\u043D\u043D\u044B\u0445 \u043F\u043E\xA0\u043E\u0434\u043D\u043E\u043C\u0443 \u043D\u0430\u0436\u0430\u0442\u0438\u044E."
    ] })
  ] }) });
}
var HONEST = [
  ["\u0411\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \xAB\u0434\u0430\xBB \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\xA0\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F", "\u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u0447\u043D\u044B\u0435 \u0438\u0434\u0435\u0438 \u0436\u0434\u0443\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \xAB\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C\xBB. \u0421\u0430\u043C\u0438 \u043D\u0430\xA0\u0441\u0430\u0439\u0442 \u043D\u0435\xA0\u043F\u043E\u043F\u0430\u0434\u0430\u044E\u0442"],
  ["\u0417\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0441\u0430\u0439\u0442 \u0430\u0440\u0445\u0438\u0432\u043E\u043C \u0432\xA0\u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A", "HTML \u0438\xA0\u0432\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B, \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0451\u0442\u0435 \u043D\u0430\xA0\u043B\u044E\u0431\u043E\u0439 \u0445\u043E\u0441\u0442\u0438\u043D\u0433"],
  ["\u0423\u0434\u0430\u043B\u0438\u043C \u043F\u043E\xA0\u043E\u0434\u043D\u043E\u043C\u0443 \u043D\u0430\u0436\u0430\u0442\u0438\u044E", "\u0414\u0430\u043D\u043D\u044B\u0435 \u0441\u0442\u0438\u0440\u0430\u0435\u043C \u043F\u043E\xA0\u0437\u0430\u043F\u0440\u043E\u0441\u0443, \u0431\u0435\u0437 \u0443\u0433\u043E\u0432\u043E\u0440\u043E\u0432 \u0438\xA0\u0443\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F"]
];
function HonestRow({ t, d }) {
  const [ref, cls] = useReveal();
  return /* @__PURE__ */ jsxs3("div", { ref, className: "hrow " + cls, children: [
    /* @__PURE__ */ jsx4("p", { className: "hrow__t", children: t }),
    /* @__PURE__ */ jsx4("p", { className: "hrow__d", children: d })
  ] });
}
function V5_Honest() {
  return /* @__PURE__ */ jsx4("section", { className: "section", "aria-labelledby": "honest-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx4("div", { className: "shead", children: /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "honest-h", children: "\u0421\u0430\u0439\u0442 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0432\u0430\u0448\u0438\u043C" }) }) }),
    /* @__PURE__ */ jsx4("div", { className: "honest", children: HONEST.map((h, i) => /* @__PURE__ */ jsx4(HonestRow, { t: h[0], d: h[1] }, i)) })
  ] }) });
}
var FAQ_ITEMS = [
  { id: "karty", q: "\u0423 \u043C\u0435\u043D\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445. \u0417\u0430\u0447\u0435\u043C \u0435\u0449\u0451 \u0441\u0430\u0439\u0442?", a: "\u041A\u0430\u0440\u0442\u044B \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u0432\u0430\u0441 \u0442\u0435\u043C, \u043A\u0442\u043E \u0443\u0436\u0435 \u0438\u0449\u0435\u0442 \u0440\u044F\u0434\u043E\u043C. \u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0448\u0438\u0440\u043E\u043A\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C \u2014 \xAB\u043C\u0430\u043D\u0438\u043A\u044E\u0440 + \u0440\u0430\u0439\u043E\u043D\xBB, \xAB\u0431\u0440\u043E\u0432\u0438 + \u0433\u043E\u0440\u043E\u0434\xBB \u2014 \u0438 \u043F\u0440\u0438\u0432\u043E\u0434\u0438\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0434\u043E \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043E\u043D \u043E\u0442\u043A\u0440\u044B\u043B \u041A\u0430\u0440\u0442\u044B \u0438 \u0443\u0432\u0438\u0434\u0435\u043B \u0442\u0430\u043C \u0432\u0441\u0435\u0445 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0445." },
  { id: "why-2h", q: "\u041F\u043E\u0447\u0435\u043C\u0443 2 \u0447\u0430\u0441\u0430? \u0410 \u0435\u0441\u043B\u0438 \u043D\u0435 \u0441\u043E\u0431\u0435\u0440\u0451\u0442\u0441\u044F?", a: "2 \u0447\u0430\u0441\u0430 \u2014 \u0432\u0440\u0435\u043C\u044F \u0441\u0431\u043E\u0440\u043A\u0438 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430 \u043F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u0432\u044B \u043F\u043E\u043A\u0430\u0437\u0430\u043B\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044C. \u041E\u0431\u044B\u0447\u043D\u043E \u0431\u044B\u0441\u0442\u0440\u0435\u0435. \u0415\u0441\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0438 \u043D\u0443\u0436\u0435\u043D \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u2014 \u043F\u0440\u0435\u0434\u0443\u043F\u0440\u0435\u0434\u0438\u043C \u0441\u0440\u0430\u0437\u0443 \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0430\u0439\u0442 \u0433\u043E\u0442\u043E\u0432. \u0411\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \xAB\u043E\u043A\xBB \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u0442\u0441\u044F." },
  { id: "dikidi", q: "\u042F \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E \u0447\u0435\u0440\u0435\u0437 Dikidi \u0438\u043B\u0438 YClients. \u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u0441 \u0437\u0430\u043F\u0438\u0441\u044C\u044E?", a: "\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0443 \u0432\u0430\u0441: \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u043F\u043E\u0432\u0435\u0434\u0451\u0442 \u0432 \u0432\u0430\u0448 Dikidi \u0438\u043B\u0438 YClients. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0443\u0441\u043B\u0443\u0433\u0438, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0437\u044B\u0432\u044B, \u0437\u0430\u043F\u0438\u0441\u044C \u0432\u0435\u0434\u0451\u0442 \u0432\u0430\u0448 \u0441\u0435\u0440\u0432\u0438\u0441." },
  { id: "edit", q: "\u0422\u0435\u043A\u0441\u0442\u044B, \u0444\u043E\u0442\u043E \u0438 \u0446\u0435\u043D\u044B \u0441\u043C\u043E\u0433\u0443 \u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0441\u0430\u043C?", a: "\u0414\u0430, \u0432\u0441\u0451 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435. \u0412\u0430\u0448\u0438 \u043F\u0440\u0430\u0432\u043A\u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043D\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442." },
  { id: "photos-only", q: "\u0423 \u043C\u0435\u043D\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442. \u042D\u0442\u043E\u0433\u043E \u0445\u0432\u0430\u0442\u0438\u0442?", a: "\u0425\u0432\u0430\u0442\u0438\u0442. \u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u0444\u043E\u0442\u043E \u0438 \u043F\u043E\u0434\u043F\u0438\u0441\u0435\u0439. \u0415\u0441\u043B\u0438 \u0447\u0435\u0433\u043E-\u0442\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0438\u0442, \u0441\u043F\u0440\u043E\u0441\u0438\u043C \u043E\u0434\u0438\u043D \u0440\u0430\u0437, \u0441\u043F\u0438\u0441\u043A\u043E\u043C." },
  { id: "tg-closed", q: "\u041C\u043E\u0439 Telegram-\u043A\u0430\u043D\u0430\u043B \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0435\u0433\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0435\u0442?", a: "\u0422\u043E\u043B\u044C\u043A\u043E \u0435\u0441\u043B\u0438 \u0432\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u0435 \u0431\u043E\u0442\u0430 \u0432 \u043A\u0430\u043D\u0430\u043B. \u0411\u0435\u0437 \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A\u0430\u043D\u0430\u043B \u043D\u0435 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F." },
  { id: "seo", q: "\u0421\u0430\u0439\u0442 \u043F\u043E\u043F\u0430\u0434\u0451\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A \u042F\u043D\u0434\u0435\u043A\u0441\u0430 \u0438 Google?", a: "\u0414\u0430. \u0423 \u0441\u0430\u0439\u0442\u0430 \u0441\u0432\u043E\u0439 \u0430\u0434\u0440\u0435\u0441 \u0438 \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u0434\u043B\u044F \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u0438\u043A\u043E\u0432. \u041E\u0431\u044B\u0447\u043D\u043E \u0438\u043D\u0434\u0435\u043A\u0441\u0430\u0446\u0438\u044F \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 1\u20132 \u043D\u0435\u0434\u0435\u043B\u0438." },
  { id: "no-pay", q: "\u041D\u0435 \u0437\u0430\u043F\u043B\u0430\u0447\u0443 \u043F\u043E\u0441\u043B\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u044F\u0446\u0430. \u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u0441 \u0441\u0430\u0439\u0442\u043E\u043C?", a: "\u0421\u0430\u0439\u0442 \u043D\u0435 \u0432\u044B\u043A\u043B\u044E\u0447\u0438\u0442\u0441\u044F \u0432 \u0442\u043E\u0442 \u0436\u0435 \u0434\u0435\u043D\u044C. \u041C\u0435\u0441\u044F\u0446 \u043E\u043D \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u043A \u0435\u0441\u0442\u044C, \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0451\u0442 \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0442\u044C\u0441\u044F. \u0415\u0449\u0451 \u0447\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u043E\u0442\u043A\u043B\u044E\u0447\u0430\u0435\u0442\u0441\u044F. \u0410\u0440\u0445\u0438\u0432 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u0430\u043C\u0438 \u0437\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0432 \u043B\u044E\u0431\u043E\u0439 \u0434\u0435\u043D\u044C \u0434\u043E \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F." },
  { id: "leave", q: "\u0427\u0442\u043E \u0431\u0443\u0434\u0435\u0442 \u0441 \u0434\u0430\u043D\u043D\u044B\u043C\u0438, \u0435\u0441\u043B\u0438 \u044F \u0443\u0439\u0434\u0443?", a: "\u0421\u0430\u0439\u0442 \u0437\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0430\u0440\u0445\u0438\u0432\u043E\u043C, \u0434\u0430\u043D\u043D\u044B\u0435 \u0443\u0434\u0430\u043B\u0438\u043C \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u043D\u0430\u0436\u0430\u0442\u0438\u044E." }
];
function V5_Faq({ items = FAQ_ITEMS, onFaqOpen = () => {
} }) {
  const [open, setOpen] = useState(items.length ? items[0].id : null);
  const toggle = (it) => {
    const next = open === it.id ? null : it.id;
    setOpen(next);
    if (next === it.id) onFaqOpen(it.id);
  };
  return /* @__PURE__ */ jsx4("section", { className: "section", id: "faq", "aria-labelledby": "faq-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsx4("div", { className: "shead", children: /* @__PURE__ */ jsx4("div", { className: "shead__l", children: /* @__PURE__ */ jsx4("h2", { className: "h2", id: "faq-h", children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0445\u043E\u0442\u044F\u0442 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C" }) }) }),
    /* @__PURE__ */ jsxs3("div", { className: "bento12", children: [
      /* @__PURE__ */ jsxs3("p", { className: "lead faq-short", children: [
        "\u041D\u0435\xA0\u043D\u0430\u0448\u043B\u0438 \u043E\u0442\u0432\u0435\u0442 \u2014 ",
        /* @__PURE__ */ jsx4("a", { className: "tlink", href: "https://t.me/samosite", target: "_blank", rel: "noopener", children: "\u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u0432 Telegram" }),
        ", \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u043C \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0434\u043D\u044F."
      ] }),
      /* @__PURE__ */ jsx4("div", { className: "faq", children: items.map((it) => {
        const isOpen = open === it.id;
        return /* @__PURE__ */ jsxs3("div", { className: "acc" + (isOpen ? " is-open" : ""), "data-faq": true, "data-faq-item": it.id, children: [
          /* @__PURE__ */ jsxs3("button", { className: "acc__btn", "aria-expanded": isOpen, onClick: () => toggle(it), children: [
            /* @__PURE__ */ jsx4("span", { children: it.q }),
            /* @__PURE__ */ jsx4("span", { className: "acc__plus", "aria-hidden": "true", children: "+" })
          ] }),
          /* @__PURE__ */ jsx4("div", { className: "acc__panel", children: /* @__PURE__ */ jsx4("div", { children: /* @__PURE__ */ jsx4("p", { className: "acc__a", children: it.a }) }) })
        ] }, it.id);
      }) })
    ] })
  ] }) });
}
function V5_FinalCta({ onIntake = noop }) {
  return /* @__PURE__ */ jsx4("section", { className: "final", id: "start", "aria-labelledby": "final-h", children: /* @__PURE__ */ jsxs3("div", { className: "wrap", children: [
    /* @__PURE__ */ jsxs3("h2", { className: "h2 final__h", id: "final-h", style: { marginTop: 16 }, children: [
      "\u041D\u0430\u0437\u043E\u0432\u0438\u0442\u0435 \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E \u0438\xA0\u0433\u043E\u0440\u043E\u0434 \u2014 ",
      /* @__PURE__ */ jsx4("span", { className: "accent", children: "\u0447\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430" }),
      " \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442"
    ] }),
    /* @__PURE__ */ jsx4("p", { className: "final__p", children: "\u0422\u0430\u0440\u0438\u0444 \xAB\u0421\u0442\u0430\u0440\u0442\xBB \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u044B\u0439 \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430. \u041F\u043B\u0430\u0442\u043D\u044B\u0435 \u043E\u0442\xA0690\xA0\u20BD/\u043C\u0435\u0441, \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0430 \u043D\u0435\xA0\u043D\u0443\u0436\u043D\u0430." }),
    /* @__PURE__ */ jsxs3("div", { className: "final__cta", children: [
      /* @__PURE__ */ jsxs3("button", { className: "btn btn--56", type: "button", "data-entry": "final", onClick: () => onIntake("final"), children: [
        "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430 ",
        /* @__PURE__ */ jsx4("span", { className: "arw", children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsxs3("a", { className: "tlink", href: "https://t.me/samosite", target: "_blank", rel: "noopener", children: [
        /* @__PURE__ */ jsx4("span", { className: "u", children: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043D\u0430\u043C \u0432 Telegram" }),
        " ",
        /* @__PURE__ */ jsx4("span", { className: "arw", children: "\u2192" })
      ] })
    ] })
  ] }) });
}
function V5_Footer({ links }) {
  const L = links || { politika: "docs/politika.html", oferta: "docs/oferta.html", support: "https://t.me/samosite" };
  return /* @__PURE__ */ jsx4("footer", { className: "ft", children: /* @__PURE__ */ jsxs3("div", { className: "wrap ft__in", children: [
    /* @__PURE__ */ jsxs3("span", { className: "ft__logo", children: [
      "\u0421\u0430\u043C\u043E",
      /* @__PURE__ */ jsx4("span", { style: { color: VT.accentOnDark }, children: "\u0441\u0430\u0439\u0442" })
    ] }),
    /* @__PURE__ */ jsx4("span", { className: "ft__meta", children: "\xA9 2026 \xB7 samosite.online \xB7 \u0418\u041F \u0418\u0432\u0430\u043D\u043E\u0432\u0430 \u0410. \u0410. \xB7 \u0418\u041D\u041D 660000000000 \xB7 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u0424" }),
    /* @__PURE__ */ jsxs3("nav", { className: "ft__links", "aria-label": "\u0414\u043E\u043A\u0443\u043C\u0435\u043D\u0442\u044B", children: [
      /* @__PURE__ */ jsx4("a", { href: L.politika, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445" }),
      /* @__PURE__ */ jsx4("a", { href: L.oferta, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
      /* @__PURE__ */ jsx4("a", { href: L.support, target: "_blank", rel: "noopener", children: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430" })
    ] })
  ] }) });
}
function V5_Page({ onIntake = noop, onFaqOpen = () => {
}, anchors, withStyles = true }) {
  return /* @__PURE__ */ jsxs3("div", { className: "v5 js", children: [
    withStyles && /* @__PURE__ */ jsx4(V5_Styles, {}),
    /* @__PURE__ */ jsx4(V5_Header, { anchors, onIntake }),
    /* @__PURE__ */ jsxs3("main", { id: "top", children: [
      /* @__PURE__ */ jsx4(V5_Hero, { onIntake }),
      /* @__PURE__ */ jsx4(V5_Story, { onIntake }),
      /* @__PURE__ */ jsx4(V5_Examples, { layout: "carousel", onIntake }),
      /* @__PURE__ */ jsx4(V5_HowItWorks, {}),
      /* @__PURE__ */ jsx4(V5_Reviews, {}),
      /* @__PURE__ */ jsx4(V5_Pricing, { onIntake }),
      /* @__PURE__ */ jsx4(V5_Honest, {}),
      /* @__PURE__ */ jsx4(V5_Faq, { onFaqOpen })
    ] }),
    /* @__PURE__ */ jsx4(V5_FinalCta, { onIntake }),
    /* @__PURE__ */ jsx4(V5_Footer, {})
  ] });
}

// src/landing/index.tsx
import { Fragment as Fragment3, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function sectionPad(mobile) {
  const v = mobile ? 20 : 80;
  return { paddingLeft: v, paddingRight: v, boxSizing: "border-box" };
}
function H2({ children, mobile, align = "center" }) {
  return /* @__PURE__ */ jsx5("h2", { style: {
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
  return /* @__PURE__ */ jsx5("p", { style: {
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
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram",
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx5("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx5("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx5("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx5("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "iggr3a", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx5("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx5("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx5("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx5("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggr3a)" }),
      /* @__PURE__ */ jsx5("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx5("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "site",
    name: "\u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx5("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx5("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx5("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx5("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
function HeroBlock({ mobile }) {
  return /* @__PURE__ */ jsx5("section", { id: "hero", style: { ...sectionPad(mobile), paddingTop: mobile ? 28 : 56, position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxs4("div", { style: {
    maxWidth: mobile ? "100%" : 1200,
    margin: "0 auto",
    textAlign: mobile ? "left" : "center"
  }, children: [
    /* @__PURE__ */ jsxs4("h1", { style: {
      fontSize: mobile ? "clamp(32px, 8.8vw, 44px)" : 76,
      lineHeight: mobile ? 1.06 : 1.04,
      fontWeight: 700,
      letterSpacing: "-0.035em",
      margin: 0,
      textWrap: "balance"
    }, children: [
      "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0437\u0430",
      " ",
      /* @__PURE__ */ jsxs4("span", { style: { position: "relative", color: VT.accent, whiteSpace: "nowrap" }, children: [
        "2 \u0447\u0430\u0441\u0430",
        !mobile && /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx5("br", {}),
      "\u0414\u0430\u043B\u044C\u0448\u0435\xA0\u043E\u043D ",
      /* @__PURE__ */ jsx5("span", { style: { color: VT.accent }, children: "\u0441\u0430\u043C \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043B\u0443\u0447\u0448\u0435" }),
      " \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E."
    ] }),
    /* @__PURE__ */ jsx5("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "20px 0 0" : "28px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "pretty"
    }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0432\u0435\u0434\u0451\u0442\u0435 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442, \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442." }),
    /* @__PURE__ */ jsx5("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "10px 0 0" : "12px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "balance"
    }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438, \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0438 \u0444\u043E\u0442\u043E. \u0422\u0435\u043A\u0441\u0442\u044B \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u043C. \u041A\u043E\u0433\u0434\u0430 \u043F\u0440\u0438\u0434\u0443\u0442 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438, \u043D\u0430\u0447\u043D\u0451\u0442 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C, \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0440\u0430\u0434\u0438 \u043D\u043E\u0432\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A." }),
    /* @__PURE__ */ jsxs4("div", { className: "ss-hero-pill", style: {
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
      /* @__PURE__ */ jsxs4("div", { style: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: mobile ? "12px 14px" : "0 18px",
        minWidth: 0
      }, children: [
        /* @__PURE__ */ jsx5(IconLink, {}),
        /* @__PURE__ */ jsx5("span", { style: {
          color: VT.inkFaint,
          fontSize: mobile ? 15 : 16,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, children: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" })
      ] }),
      /* @__PURE__ */ jsx5(Btn, { style: {
        padding: mobile ? "14px 20px" : "14px 26px",
        borderRadius: mobile ? 10 : 999
      }, iconRight: /* @__PURE__ */ jsx5(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: {
      marginTop: mobile ? 10 : 12,
      textAlign: mobile ? "left" : "center",
      fontFamily: VT.font.mono,
      fontSize: mobile ? 11.5 : 12.5,
      letterSpacing: "0.03em",
      color: VT.inkSoft,
      lineHeight: 1.45
    }, children: [
      "\u0422\u0430\u0440\u0438\u0444 \xAB\u0421\u0442\u0430\u0440\u0442\xBB \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430. \u041F\u043B\u0430\u0442\u043D\u044B\u0435 ",
      /* @__PURE__ */ jsx5("b", { style: { color: VT.accent }, children: "\u043E\u0442 690 \u20BD/\u043C\u0435\u0441" }),
      " \xB7 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430 \u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E"
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 14 : 18,
      textAlign: mobile ? "left" : "center"
    }, children: /* @__PURE__ */ jsxs4("a", { href: "#examples", style: {
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
      /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", children: "\u2193" })
    ] }) }),
    /* @__PURE__ */ jsx5(ChipStrip, { mobile })
  ] }) });
}
function ChipStrip({ mobile = false, label = "\u0421\u041E\u0411\u0418\u0420\u0410\u0415\u041C \u0418\u0417", items = SOURCE_ICONS, align }) {
  const a = align ?? (mobile ? "start" : "center");
  const alignItems = a === "center" ? "center" : "flex-start";
  const justify = alignItems === "center" ? "center" : "flex-start";
  return /* @__PURE__ */ jsxs4("div", { style: {
    marginTop: mobile ? 22 : 36,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems
  }, children: [
    label && /* @__PURE__ */ jsx5("div", { style: {
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.12em",
      color: VT.inkFaint,
      fontWeight: 600
    }, children: label }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: justify }, children: items.map(
      (s) => /* @__PURE__ */ jsxs4("span", { style: {
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
      ] }, s.id)
    ) })
  ] });
}
function ExamplesSection({ mobile }) {
  const showcase = samplePresets || [];
  const MiniChrome2 = MiniChrome;
  const ExampleCard = ({ item }) => {
    const [hover, setHover] = React3.useState(false);
    return /* @__PURE__ */ jsxs4("div", { style: { display: "flex", flexDirection: "column", width: "100%", minWidth: 0 }, children: [
      /* @__PURE__ */ jsxs4("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
        minHeight: 28,
        minWidth: 0
      }, children: [
        /* @__PURE__ */ jsx5("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent, flex: "0 0 auto" } }),
        /* @__PURE__ */ jsx5("span", { style: {
          fontSize: mobile ? 14 : 15,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0
        }, children: item.tagline })
      ] }),
      /* @__PURE__ */ jsx5(
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
          children: /* @__PURE__ */ jsx5(MiniChrome2, { host: item.content.meta.host, children: /* @__PURE__ */ jsx5(PresetRenderer, { preset: item.preset, content: item.content }) })
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxs4("section", { id: "examples", style: { ...sectionPad(mobile), marginTop: mobile ? 56 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs4(H2, { mobile, children: [
        "\u0412\u043E\u0442 \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx5(Sub, { mobile, children: "\u0421\u0442\u0438\u043B\u0438\u0441\u0442\u0438\u043A \u043C\u043D\u043E\u0433\u043E \u2014 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442 \u0435\u0451 \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442. \u0415\u0441\u043B\u0438 \u043D\u0435 \u0437\u0430\u0439\u0434\u0451\u0442 \u2014 \u043F\u043E\u043C\u0435\u043D\u044F\u0435\u0442\u0435 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A \u0438\u0437 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438." })
    ] }),
    /* @__PURE__ */ jsx5(ExamplesCarousel, { mobile, items: showcase, renderCard: (item) => /* @__PURE__ */ jsx5(ExampleCard, { item }) }),
    /* @__PURE__ */ jsx5(HowItPicks, { mobile }),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: mobile ? 28 : 44, textAlign: "center" }, children: [
      /* @__PURE__ */ jsx5("a", { href: "#hero", style: {
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
      }, children: /* @__PURE__ */ jsx5("span", { children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439\xA0\u0436\u0435 \u0438\u0437\xA0\u043C\u043E\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\xA0\u2192" }) }),
      /* @__PURE__ */ jsx5("div", { style: {
        marginTop: 14,
        fontFamily: VT.font.mono,
        fontSize: 12,
        color: VT.inkFaint,
        letterSpacing: "0.02em"
      }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u0430\u043C \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u0442 \u0441\u0442\u0438\u043B\u044C \u2014 \u043F\u043E\u0442\u043E\u043C \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043C\u0435\u043D\u044F\u0442\u044C" })
    ] })
  ] });
}
function ExamplesCarousel({ mobile, items, renderCard }) {
  const scrollerRef = React3.useRef(null);
  const [atStart, setAtStart] = React3.useState(true);
  const [atEnd, setAtEnd] = React3.useState(false);
  const [activeIdx, setActiveIdx] = React3.useState(0);
  const [hoverPrev, setHoverPrev] = React3.useState(false);
  const [hoverNext, setHoverNext] = React3.useState(false);
  const updateBounds = React3.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= maxScroll - 1);
    const firstChild = el.firstElementChild && el.firstElementChild.firstElementChild;
    const step = firstChild ? firstChild.getBoundingClientRect().width + 14 : el.clientWidth;
    const idx = Math.round(el.scrollLeft / step);
    const maxIdx = (el.firstElementChild && el.firstElementChild.childElementCount || 1) - 1;
    setActiveIdx(Math.max(0, Math.min(idx, maxIdx)));
  }, []);
  React3.useEffect(() => {
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
  const ArrowIcon = ({ direction }) => /* @__PURE__ */ jsxs4(
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
        /* @__PURE__ */ jsx5("path", { d: "M5 12 H19" }),
        /* @__PURE__ */ jsx5("path", { d: "M13 6 L19 12 L13 18" })
      ]
    }
  );
  return /* @__PURE__ */ jsxs4("div", { style: {
    position: "relative",
    marginTop: mobile ? 28 : 56,
    maxWidth: mobile ? "none" : 1200,
    marginLeft: mobile ? void 0 : "auto",
    marginRight: mobile ? void 0 : "auto"
  }, children: [
    mobile && items.length > 1 && /* @__PURE__ */ jsx5("div", { style: { display: "flex", justifyContent: "center", gap: 7, marginBottom: 14 }, children: items.map((_, i) => {
      const active = i === activeIdx;
      return /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          "aria-label": `\u0421\u043B\u0430\u0439\u0434 ${i + 1}`,
          onClick: () => {
            const el = scrollerRef.current;
            if (!el) return;
            const child = el.firstElementChild && el.firstElementChild.children[i];
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
    /* @__PURE__ */ jsxs4(
      "div",
      {
        ref: scrollerRef,
        style: {
          marginLeft: mobile ? -16 : -32,
          marginRight: mobile ? -16 : -32,
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: mobile ? 16 : 32,
          scrollbarWidth: "none",
          "--ss-fade-w": mobile ? "44px" : "64px",
          "--ss-fade-l": atStart ? "0px" : "var(--ss-fade-w)",
          "--ss-fade-r": atEnd ? "0px" : "var(--ss-fade-w)",
          maskImage: "linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)",
          transition: "mask-image .25s ease, -webkit-mask-image .25s ease"
        },
        children: [
          /* @__PURE__ */ jsx5("style", { children: `.ss-preset-carousel::-webkit-scrollbar{display:none}` }),
          /* @__PURE__ */ jsx5("div", { className: "ss-preset-carousel", style: {
            display: "flex",
            gap: mobile ? 12 : 24,
            padding: mobile ? "0 56px 16px 16px" : "0 32px 16px",
            alignItems: "flex-start"
          }, children: items.map(
            (item, i) => /* @__PURE__ */ jsx5("div", { style: {
              flex: mobile ? "0 0 94%" : "0 0 calc((100% - 80px) / 3)",
              scrollSnapAlign: "start",
              display: "flex",
              minWidth: 0
            }, children: renderCard(item, i) }, i)
          ) })
        ]
      }
    ),
    !mobile && /* @__PURE__ */ jsxs4(Fragment3, { children: [
      /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043F\u0440\u0438\u043C\u0435\u0440",
          disabled: atStart,
          onClick: () => scrollBy(-1),
          onMouseEnter: () => setHoverPrev(true),
          onMouseLeave: () => setHoverPrev(false),
          style: arrowStyle(atStart, hoverPrev, -1),
          children: /* @__PURE__ */ jsx5(ArrowIcon, { direction: -1 })
        }
      ),
      /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u0438\u043C\u0435\u0440",
          disabled: atEnd,
          onClick: () => scrollBy(1),
          onMouseEnter: () => setHoverNext(true),
          onMouseLeave: () => setHoverNext(false),
          style: arrowStyle(atEnd, hoverNext, 1),
          children: /* @__PURE__ */ jsx5(ArrowIcon, { direction: 1 })
        }
      )
    ] })
  ] });
}
function HowItPicks({ mobile }) {
  const EU = (id, w = 480) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
  const extractions = [
    {
      niche: "\u041A\u043E\u0444\u0435\u0439\u043D\u044F",
      photo: EU("photo-1495474472287-4d71bcdd2085"),
      filter: "saturate(1.02)",
      palette: ["#FAF6F0", "#C9A57B", "#A8412E", "#211C17"],
      fontName: "Fraunces",
      fontCss: "'Fraunces', Georgia, serif",
      italic: true,
      note: "\u0442\u0451\u043F\u043B\u043E\u0435, \u0431\u0443\u043C\u0430\u0436\u043D\u043E\u0435"
    },
    {
      niche: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
      photo: EU("photo-1604654894610-df63bc536371"),
      filter: "saturate(1.0)",
      palette: ["#F6E7E3", "#D99CA0", "#8C4A52", "#2A1820"],
      fontName: "Instrument Serif",
      fontCss: "'Instrument Serif', Georgia, serif",
      italic: true,
      note: "\u043C\u044F\u0433\u043A\u043E\u0435, \u0431\u044C\u044E\u0442\u0438"
    },
    {
      niche: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441",
      photo: EU("photo-1486262715619-67b85e0b08d3"),
      filter: "contrast(1.05) saturate(0.9)",
      palette: ["#0E0F10", "#9A9B98", "#C2D94A", "#F2F0EC"],
      fontName: "Space Grotesk",
      fontCss: "'Space Grotesk', sans-serif",
      italic: false,
      note: "\u0441\u0442\u0440\u043E\u0433\u043E\u0435, \u0442\u0435\u0445\u043D\u0438\u0447\u043D\u043E\u0435"
    }
  ];
  const mechanics = [
    { n: "01", title: "\u0415\u0441\u0442\u044C \u0444\u0438\u0440\u0441\u0442\u0438\u043B\u044C \u2014 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442", body: "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u0442 \u0448\u0440\u0438\u0444\u0442 \u0438 \u0446\u0432\u0435\u0442\u0430 \u0441 \u0431\u0443\u043A\u043B\u0435\u0442\u0430, \u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u0438\u043B\u0438 \u0432\u044B\u0432\u0435\u0441\u043A\u0438." },
    { n: "02", title: "\u041D\u0435\u0442 \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u043C", body: "\u041F\u0430\u043B\u0438\u0442\u0440\u0443 \u0431\u0435\u0440\u0451\u0442 \u0441 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E, \u0448\u0440\u0438\u0444\u0442 \u2014 \u043F\u043E\u0434 \u0442\u043E\u043D \u0442\u0435\u043A\u0441\u0442\u0430." },
    { n: "03", title: "\u0420\u0430\u0441\u043A\u043B\u0430\u0434\u043A\u0430 \u043F\u043E\u0434 \u043A\u043E\u043D\u0442\u0435\u043D\u0442", body: "\u0426\u0438\u0444\u0440\u044B \u2014 \u0432 \u043F\u043B\u0438\u0442\u043A\u0438, \u043C\u0435\u043D\u044E \u2014 \u0432 \u0436\u0443\u0440\u043D\u0430\u043B, \u0430\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430 \u2014 \u0432 \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0444\u043E\u0442\u043E." },
    { n: "04", title: "\u041D\u0435 \u0437\u0430\u0448\u043B\u043E \u2014 \u043A\u043B\u0438\u043A", body: "\u0411\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0430 \u0433\u043E\u0442\u043E\u0432\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439, \u0442\u0435\u043A\u0441\u0442\u044B \u0438 \u0444\u043E\u0442\u043E \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u043C\u0435\u0441\u0442\u0430\u0445." }
  ];
  const ExtractionCard = ({ ex }) => /* @__PURE__ */ jsxs4("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { position: "relative", height: mobile ? 96 : 88, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsx5("img", { src: ex.photo, alt: "", loading: "lazy", style: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        filter: ex.filter
      } }),
      /* @__PURE__ */ jsx5("span", { style: {
        position: "absolute",
        top: 8,
        left: 8,
        fontFamily: VT.font.mono,
        fontSize: 9,
        letterSpacing: "0.06em",
        fontWeight: 700,
        color: VT.ink,
        background: "rgba(250,246,240,0.92)",
        padding: "3px 8px",
        borderRadius: 999,
        textTransform: "uppercase",
        backdropFilter: "blur(4px)"
      }, children: ex.niche })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { padding: "10px 12px 12px" }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 9, letterSpacing: "0.06em", color: VT.inkFaint, fontWeight: 600, marginBottom: 6 }, children: "\u0426\u0412\u0415\u0422\u0410 \u0418\u0417 \u0424\u041E\u0422\u041E" }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", borderRadius: 7, overflow: "hidden", boxShadow: `0 1px 2px rgba(40,28,18,0.10)` }, children: ex.palette.map(
        (c, i) => /* @__PURE__ */ jsx5("span", { style: { flex: 1, height: 22, background: c } }, i)
      ) }),
      /* @__PURE__ */ jsxs4("div", { style: { marginTop: 9, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8 }, children: [
        /* @__PURE__ */ jsx5("span", { style: {
          fontFamily: ex.fontCss,
          fontStyle: ex.italic ? "italic" : "normal",
          fontSize: 20,
          color: VT.ink,
          lineHeight: 1
        }, children: "\u0410\u0430 \u0411\u0431" }),
        /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 9.5, color: VT.inkSoft, textAlign: "right" }, children: ex.fontName })
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxs4("div", { style: {
    marginTop: 0,
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    padding: mobile ? "20px 18px" : "26px 30px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.lg
  }, children: [
    /* @__PURE__ */ jsxs4("h3", { style: {
      fontSize: mobile ? 23 : 30,
      fontWeight: 800,
      lineHeight: 1.08,
      letterSpacing: "-0.032em",
      color: VT.ink,
      marginBottom: 8,
      maxWidth: 720,
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      textWrap: "balance"
    }, children: [
      "\u0414\u0438\u0437\u0430\u0439\u043D \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432\u200A\u2014\u200A",
      /* @__PURE__ */ jsx5("span", { style: { color: VT.accent }, children: "\u0430 \u043D\u0435 \u0438\u0437 \u0448\u0430\u0431\u043B\u043E\u043D\u0430" })
    ] }),
    /* @__PURE__ */ jsx5("p", { style: {
      fontSize: mobile ? 13.5 : 15,
      lineHeight: 1.45,
      color: VT.inkSoft,
      marginBottom: mobile ? 16 : 20,
      maxWidth: 560,
      marginLeft: "auto",
      marginRight: "auto",
      textAlign: "center",
      textWrap: "pretty"
    }, children: "\u041F\u0430\u043B\u0438\u0442\u0440\u0443 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0432\u044B\u0442\u044F\u0433\u0438\u0432\u0430\u0435\u0442 \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E, \u0430 \u0448\u0440\u0438\u0444\u0442 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442 \u043F\u043E\u0434 \u0442\u043E\u043D. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u0441\u0430\u0439\u0442 \u043A\u043E\u0444\u0435\u0439\u043D\u0438 \u043D\u0435 \u043F\u043E\u0445\u043E\u0436 \u043D\u0430 \u0441\u0430\u0439\u0442 \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441\u0430." }),
    /* @__PURE__ */ jsx5("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: mobile ? 8 : 12
    }, children: extractions.map((ex, i) => /* @__PURE__ */ jsx5(ExtractionCard, { ex }, i)) }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 16 : 20,
      paddingTop: mobile ? 16 : 20,
      borderTop: `1px solid ${VT.line}`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(4, 1fr)",
      gap: mobile ? 12 : 18
    }, children: mechanics.map(
      (m, i) => /* @__PURE__ */ jsxs4("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", gap: 6 }, children: [
          /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 11, fontWeight: 700, color: VT.accent }, children: m.n }),
          /* @__PURE__ */ jsx5("div", { style: { fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, letterSpacing: "-0.015em", color: VT.ink, lineHeight: 1.2 }, children: m.title })
        ] }),
        /* @__PURE__ */ jsx5("p", { style: { fontSize: mobile ? 12 : 12.5, lineHeight: 1.45, color: VT.inkSoft, margin: 0 }, children: m.body })
      ] }, i)
    ) })
  ] });
}
var CYCLE_STEPS = [
  {
    n: "01",
    title: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u0442",
    cadence: "\u043E\u0434\u0438\u043D \u0440\u0430\u0437",
    body: "\u041F\u043E\u043A\u0430\u0436\u0435\u0442\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u2014 \u0437\u0430 2 \u0447\u0430\u0441\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0441\u043E \u0432\u0441\u0435\u043C\u0438 \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438, \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438 \u0438 \u0433\u0430\u043B\u0435\u0440\u0435\u0435\u0439 \u0440\u0430\u0431\u043E\u0442. \u0422\u0435\u043A\u0441\u0442\u044B \u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u043C.",
    palette: { bg: "oklch(0.95 0.05 40)", ink: "oklch(0.32 0.14 35)", dec: "oklch(0.86 0.10 40)" },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3" }),
      /* @__PURE__ */ jsx5("path", { d: "M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3" })
    ] })
  },
  {
    n: "02",
    title: "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    body: "\u0420\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0437\u0430\u0433\u043B\u044F\u0434\u044B\u0432\u0430\u0435\u0442 \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041D\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u044B, \u043F\u043E\u0441\u0442\u044B \u0438\u043B\u0438 \u0444\u043E\u0442\u043E \u2014 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0451\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442. \u041E\u0442 \u0432\u0430\u0441 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.",
    palette: { bg: "oklch(0.94 0.06 95)", ink: "oklch(0.36 0.12 85)", dec: "oklch(0.84 0.12 90)" },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M14 32 a18 18 0 0 1 30 -13" }),
      /* @__PURE__ */ jsx5("path", { d: "M44 12 L44 22 L34 22" }),
      /* @__PURE__ */ jsx5("path", { d: "M50 32 a18 18 0 0 1 -30 13" }),
      /* @__PURE__ */ jsx5("path", { d: "M20 52 L20 42 L30 42" })
    ] })
  },
  {
    n: "03",
    title: "\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C",
    body: "\u0421\u043C\u043E\u0442\u0440\u0438\u0442, \u043A\u0430\u043A \u0432\u0435\u0434\u0443\u0442 \u0441\u0435\u0431\u044F \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438: \u043A\u0442\u043E \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B, \u0434\u043E \u0447\u0435\u0433\u043E \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u043B, \u0433\u0434\u0435 \u0437\u0430\u043A\u0440\u044B\u043B \u0432\u043A\u043B\u0430\u0434\u043A\u0443. \u0421\u0447\u0438\u0442\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0438 \u043E\u0442\u043A\u0443\u0434\u0430 \u043E\u043D\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442.",
    palette: { bg: "oklch(0.94 0.05 200)", ink: "oklch(0.34 0.10 220)", dec: "oklch(0.82 0.08 210)" },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M4 32 C 14 18, 50 18, 60 32" }),
      /* @__PURE__ */ jsx5("path", { d: "M4 32 C 14 46, 50 46, 60 32" }),
      /* @__PURE__ */ jsx5("circle", { cx: "32", cy: "32", r: "8" }),
      /* @__PURE__ */ jsx5("circle", { cx: "32", cy: "32", r: "3", fill: "currentColor" })
    ] })
  },
  {
    n: "04",
    title: "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
    body: "\u041A\u043E\u0433\u0434\u0430 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0431\u0440\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445, \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0434\u043E \u0442\u0440\u0451\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C, \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u0442\u044C \u0438\u043D\u0430\u0447\u0435 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B.",
    palette: { bg: "oklch(0.94 0.05 145)", ink: "oklch(0.32 0.11 145)", dec: "oklch(0.82 0.08 145)" },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 14 L52 14 L52 44 L36 44 L28 54 L28 44 L12 44 Z" }),
      /* @__PURE__ */ jsx5("path", { d: "M22 26 L42 26 M22 34 L36 34" })
    ] })
  }
];
function CycleCard({ step, size = 240 }) {
  const p = step.palette;
  return /* @__PURE__ */ jsxs4("div", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsxs4("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx5("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: p.ink,
          opacity: 0.7,
          fontWeight: 600
        }, children: step.n }),
        /* @__PURE__ */ jsx5("div", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: 6,
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.06em",
      color: p.ink,
      opacity: 0.75,
      fontStyle: "italic"
    }, children: step.cadence }),
    /* @__PURE__ */ jsx5("p", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: { position: "relative", width: "100%", maxWidth: W, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx5("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(4, ${cardW}px)`,
      columnGap: gap,
      alignItems: "stretch",
      position: "relative",
      zIndex: 1
    }, children: CYCLE_STEPS.map((step, i) => /* @__PURE__ */ jsxs4("div", { style: { position: "relative", display: "flex" }, children: [
      /* @__PURE__ */ jsx5(CycleCard, { step, size: cardW }),
      i < 3 && /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 56,
        right: -gap,
        width: gap,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: VT.accent
      }, children: /* @__PURE__ */ jsxs4("svg", { width: gap, height: "24", viewBox: `0 0 ${gap} 24`, fill: "none", children: [
        /* @__PURE__ */ jsx5(
          "path",
          {
            d: `M 2 12 L ${gap - 8} 12`,
            stroke: VT.accent,
            strokeWidth: "2.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx5(
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
    /* @__PURE__ */ jsxs4(
      "svg",
      {
        width: "100%",
        viewBox: `0 0 ${W} ${arcH + 60}`,
        preserveAspectRatio: "none",
        style: { display: "block", marginTop: -8, height: arcH + 60 },
        children: [
          /* @__PURE__ */ jsx5("defs", { children: /* @__PURE__ */ jsx5(
            "marker",
            {
              id: "v3retArr",
              viewBox: "0 0 10 10",
              refX: "8",
              refY: "5",
              markerWidth: "7",
              markerHeight: "7",
              orient: "auto-start-reverse",
              children: /* @__PURE__ */ jsx5("path", { d: "M0 0 L10 5 L0 10 z", fill: VT.accent })
            }
          ) }),
          /* @__PURE__ */ jsx5(
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
          /* @__PURE__ */ jsx5("foreignObject", { x: (cx(1) + cx(3)) / 2 - 130, y: arcH + 6, width: "260", height: "40", children: /* @__PURE__ */ jsx5("div", { xmlns: "http://www.w3.org/1999/xhtml", style: {
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
  return /* @__PURE__ */ jsx5("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: CYCLE_STEPS.map((step, idx) => {
    const p = step.palette;
    const isLast = idx === CYCLE_STEPS.length - 1;
    return /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsxs4("div", { style: {
        background: p.bg,
        border: `2px solid ${p.ink}`,
        borderRadius: 18,
        boxShadow: `4px 4px 0 0 ${p.ink}`,
        padding: 18,
        color: p.ink
      }, children: [
        /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
          /* @__PURE__ */ jsx5("span", { style: {
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
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsxs4("div", { style: {
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
            /* @__PURE__ */ jsx5("div", { style: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
          ] })
        ] }),
        /* @__PURE__ */ jsx5("p", { style: { margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.45, textWrap: "pretty" }, children: step.body })
      ] }),
      !isLast && /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("section", { id: "cycle", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs4(H2, { mobile, children: [
        "\u042D\u0442\u043E \u043D\u0435 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435 \u043E\u0434\u0438\u043D \u0440\u0430\u0437.",
        /* @__PURE__ */ jsx5("br", {}),
        "\u042D\u0442\u043E \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C."
      ] }),
      /* @__PURE__ */ jsx5(Sub, { mobile, maxWidth: 760, children: "\u041E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043B\u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u0414\u0430\u043B\u044C\u0448\u0435 \u043E\u043D \u0441\u0430\u043C \u0445\u043E\u0434\u0438\u0442 \u043F\u043E \u043A\u0440\u0443\u0433\u0443: \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442, \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u043D\u0430 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439, \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u043A \u0432\u0430\u043C \u0441 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438. \u0427\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B." })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: !mobile ? /* @__PURE__ */ jsx5(DesktopCycle, {}) : /* @__PURE__ */ jsx5(MobileCycle, {}) }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx5("p", { style: {
      fontSize: mobile ? 15 : 17,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty",
      fontStyle: "italic"
    }, children: "\u0421\u0430\u0439\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u043D\u0435 \u043A\u0430\u043A \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0444\u0430\u0439\u043B \u2014 \u044D\u0442\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u043E\u043D \u043D\u0435\u043C\u043D\u043E\u0433\u043E \u0434\u0440\u0443\u0433\u043E\u0439. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0447\u0443\u0442\u044C \u043B\u0443\u0447\u0448\u0435, \u0447\u0435\u043C \u0431\u044B\u043B." }) }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx5("a", { href: "#hero", style: {
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
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u0417\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430 \u0441\u0430\u0439\u0442 \u0437\u0430\u0448\u043B\u0438 ",
        /* @__PURE__ */ jsx5("b", { children: "312 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ". ",
        /* @__PURE__ */ jsx5("b", { children: "224" }),
        " \u0437\u0430\u043A\u0440\u044B\u043B\u0438 \u0435\u0433\u043E, \u0434\u043E \u0443\u0441\u043B\u0443\u0433 \u0434\u0430\u0436\u0435 \u043D\u0435 \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u0432."
      ] }),
      /* @__PURE__ */ jsx5("span", { children: "\u0412 \u0432\u0430\u0448\u0438\u0445 \u043E\u0442\u0437\u044B\u0432\u0430\u0445 \u043B\u044E\u0434\u0438 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u043F\u0438\u0448\u0443\u0442: \xAB\u0432\u0441\u0451 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434 \u0442\u0435\u043C, \u043A\u0430\u043A \u0447\u0438\u043D\u0438\u0442\u044C\xBB \u0438 \xAB\u043D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u044B\u0432\u0430\u043B\u0438\xBB. \u0412\u043E\u0442 \u0432\u0430\u0448\u0430 \u0441\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u0430. \u0412 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 \u0435\u0451 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0442." })
    ],
    suggestion: /* @__PURE__ */ jsxs4(Fragment3, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx5("b", { children: "\xAB\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441, \u0433\u0434\u0435 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0442, \u043F\u043E\u0442\u043E\u043C \u0447\u0438\u043D\u044F\u0442\xBB" })
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
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u0418\u0437 ",
        /* @__PURE__ */ jsx5("b", { children: "156 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ", \u043E\u0442\u043A\u0440\u044B\u0432\u0448\u0438\u0445 \u043C\u0435\u043D\u044E, ",
        /* @__PURE__ */ jsx5("b", { children: "98" }),
        " \u043D\u0430\u0436\u0430\u043B\u0438 \u043D\u0430 \xAB\u041A\u043E\u0444\u0435 \u0438 \u0434\u0435\u0441\u0435\u0440\u0442\u044B\xBB. \u041D\u0430 \xAB\u0417\u0430\u0432\u0442\u0440\u0430\u043A\u0438\xBB \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438 ",
        /* @__PURE__ */ jsx5("b", { children: "72" }),
        " \u0438 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx5("b", { children: "4" }),
        " \u0437\u0430\u043A\u0430\u0437\u0430\u043B\u0438."
      ] }),
      /* @__PURE__ */ jsx5("span", { children: "\u0423 \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u043E\u0432 \u043D\u0435\u0442 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0438 \u043D\u0435\u0442 \u0441\u043E\u0441\u0442\u0430\u0432\u0430. \u0422\u043E\u043B\u044C\u043A\u043E \u0446\u0435\u043D\u0430 \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435. \u0427\u0435\u043B\u043E\u0432\u0435\u043A \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442, \u0447\u0442\u043E \u0442\u0430\u043C \u0432 \u0441\u0435\u0442\u0435 \u0438 \u0441\u0442\u043E\u0438\u0442 \u043B\u0438 \u043E\u043D\u043E \u0442\u043E\u0433\u043E." })
    ],
    suggestion: /* @__PURE__ */ jsxs4(Fragment3, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C ",
      /* @__PURE__ */ jsx5("b", { children: "3\u20134 \u0444\u043E\u0442\u043E" }),
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
      /* @__PURE__ */ jsxs4("span", { children: [
        /* @__PURE__ */ jsx5("b", { children: "68%" }),
        " \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439 \u0434\u043E\u043B\u0438\u0441\u0442\u044B\u0432\u0430\u044E\u0442 \u0434\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u0438\u0434\u044F\u0442 \u043D\u0430 \u043D\u0438\u0445 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C ",
        /* @__PURE__ */ jsx5("b", { children: "22 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        ". \u0414\u043E \u0431\u043B\u043E\u043A\u0430 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx5("b", { children: "19%" }),
        ". \u041F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435 \u0443\u0445\u043E\u0434\u044F\u0442 \u0437\u0430 ",
        /* @__PURE__ */ jsx5("b", { children: "4 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        "."
      ] }),
      /* @__PURE__ */ jsx5("span", { children: "\u0421\u0435\u0439\u0447\u0430\u0441 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0438\u0434\u0451\u0442 \u0440\u0430\u043D\u044C\u0448\u0435 \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u044A\u0435\u0434\u0430\u0435\u0442 \u0438\u043C \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435." })
    ],
    suggestion: /* @__PURE__ */ jsxs4(Fragment3, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx5("b", { children: "\u043E\u0442\u0437\u044B\u0432\u044B \u043F\u043E\u0434\u043D\u044F\u0442\u044C \u0432\u044B\u0448\u0435" }),
      ", \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0441\u043E\u043A\u0440\u0430\u0442\u0438\u0442\u044C \u0434\u043E \u0430\u0431\u0437\u0430\u0446\u0430 \u0438 \u0443\u0431\u0440\u0430\u0442\u044C \u0432\u043D\u0438\u0437."
    ] }),
    actions: ["\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C", "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C, \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442", "\u041D\u0435 \u043D\u0430\u0434\u043E"]
  }
];
function MondayCard({ card, n, mobile }) {
  return /* @__PURE__ */ jsxs4("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 18px 36px -18px rgba(120,60,30,0.22)",
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }, children: [
    /* @__PURE__ */ jsxs4("div", { style: {
      padding: "12px 16px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsxs4("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, fontWeight: 700, color: VT.ink, lineHeight: 1.15 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.04em" }, children: "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \xB7 9:14" })
      ] }),
      /* @__PURE__ */ jsxs4("span", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { padding: "18px 18px 14px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }, children: [
      /* @__PURE__ */ jsxs4("div", { style: {
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
        /* @__PURE__ */ jsx5("span", { style: { width: 8, height: 8, borderRadius: "50%", background: card.accent } }),
        /* @__PURE__ */ jsx5("span", { children: card.eyebrow }),
        /* @__PURE__ */ jsx5("span", { style: { marginLeft: "auto", fontStyle: "italic", fontWeight: 500, color: VT.inkFaint, letterSpacing: "0.02em" }, children: card.caseLabel })
      ] }),
      /* @__PURE__ */ jsx5("h3", { style: {
        fontSize: mobile ? 19 : 22,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        margin: 0,
        lineHeight: 1.2,
        color: VT.ink
      }, children: card.title }),
      card.body.map((p, i) => /* @__PURE__ */ jsx5("p", { style: {
        margin: 0,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: p }, i)),
      /* @__PURE__ */ jsxs4("div", { style: {
        marginTop: 4,
        padding: "12px 14px",
        background: card.accentBg,
        borderRadius: 12
      }, children: [
        /* @__PURE__ */ jsx5("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 10,
          letterSpacing: "0.12em",
          fontWeight: 700,
          opacity: 0.8,
          color: card.accent
        }, children: "\u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }),
        /* @__PURE__ */ jsx5("div", { style: {
          marginTop: 4,
          fontSize: mobile ? 14.5 : 15.5,
          lineHeight: 1.45,
          color: VT.ink
        }, children: card.suggestion })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: {
      padding: 10,
      borderTop: `1px solid ${VT.line}`,
      background: "#fff",
      display: "grid",
      gridTemplateColumns: `1fr auto auto`,
      gap: 6
    }, children: [
      /* @__PURE__ */ jsx5("button", { type: "button", style: {
        padding: "10px 14px",
        borderRadius: 10,
        border: "none",
        background: card.accent,
        color: "#fff",
        fontSize: 13.5,
        fontWeight: 600,
        cursor: "pointer"
      }, children: card.actions[0] }),
      /* @__PURE__ */ jsx5("button", { type: "button", style: {
        padding: "10px 12px",
        borderRadius: 10,
        background: "#fff",
        color: VT.ink,
        border: `1px solid ${VT.line}`,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer"
      }, children: card.actions[1] }),
      /* @__PURE__ */ jsx5("button", { type: "button", style: {
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
  return /* @__PURE__ */ jsxs4("section", { id: "monday", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs4(H2, { mobile, children: [
        "\u041F\u043E \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430\u043C \u2014 \u0442\u0440\u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F,",
        /* @__PURE__ */ jsx5("br", {}),
        "\u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435"
      ] }),
      /* @__PURE__ */ jsx5(Sub, { mobile, maxWidth: 820, children: "\u0412\u0441\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043C\u043E\u0442\u0440\u0438\u0442, \u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0443 \u0432\u0430\u0441 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u0412 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0440\u0430\u0437\u0431\u043E\u0440: \u0433\u0434\u0435 \u0447\u0442\u043E \u043F\u0440\u043E\u0441\u0435\u043B\u043E \u0438 \u0447\u0442\u043E \u0441 \u044D\u0442\u0438\u043C \u0434\u0435\u043B\u0430\u0442\u044C. \u041D\u0435 \u043E\u0431\u0449\u0438\u043C\u0438 \u0444\u0440\u0430\u0437\u0430\u043C\u0438 \u2014 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E." })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: mobile ? /* @__PURE__ */ jsxs4("div", { style: {
      marginLeft: -20,
      marginRight: -20,
      overflowX: "auto",
      WebkitOverflowScrolling: "touch",
      scrollSnapType: "x mandatory",
      scrollPaddingLeft: 20,
      scrollbarWidth: "none"
    }, children: [
      /* @__PURE__ */ jsx5("style", { children: `.ss-v3-monday::-webkit-scrollbar{display:none}` }),
      /* @__PURE__ */ jsx5("div", { className: "ss-v3-monday", style: {
        display: "flex",
        gap: 14,
        padding: "4px 20px 24px",
        alignItems: "stretch"
      }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx5("div", { style: { flex: "0 0 88%", scrollSnapAlign: "start", display: "flex" }, children: /* @__PURE__ */ jsx5(MondayCard, { card: c, n: i + 1, mobile }) }, i)) })
    ] }) : /* @__PURE__ */ jsx5("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      alignItems: "stretch"
    }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx5(MondayCard, { card: c, n: i + 1, mobile }, i)) }) }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx5("p", { style: {
      fontSize: mobile ? 14.5 : 16,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty"
    }, children: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u0430\u0432\u043E\u043A \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F. \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS." }) }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx5("a", { href: "#hero", style: {
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
    body: "\u041A\u043B\u0438\u0435\u043D\u0442 \u043D\u0430\u0436\u0430\u043B \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB, \u0438 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0434\u0430\u0435\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0432\u0430\u043C \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS. \u0411\u0435\u0437 CRM \u0438 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u043E\u0432.",
    metric: "4 \u043A\u0430\u043D\u0430\u043B\u0430",
    metricNote: "\u043D\u0430 \u0432\u044B\u0431\u043E\u0440",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("rect", { x: "10", y: "14", width: "44", height: "36", rx: "5" }),
      /* @__PURE__ */ jsx5("path", { d: "M10 22 L32 36 L54 22" })
    ] })
  },
  {
    title: "\u041E\u0442\u0431\u0438\u0440\u0430\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u044B",
    body: "\u0427\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430, \u043D\u0430 \u0441\u0430\u0439\u0442 \u0441\u0442\u0430\u0432\u0438\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445 \u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445. \u041F\u0440\u0438\u0434\u0451\u0442 \u043E\u0442\u0437\u044B\u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u043F\u0440\u0435\u0436\u043D\u0438\u0445 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442 \u0441\u0430\u043C.",
    metric: "4\u20136",
    metricNote: "\u043B\u0443\u0447\u0448\u0438\u0445 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsx5("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "currentColor", children: /* @__PURE__ */ jsx5("path", { d: "M32 8 L37 23 L53 23 L40 33 L45 49 L32 39 L19 49 L24 33 L11 23 L27 23 Z" }) })
  },
  {
    title: "\u0413\u043E\u0442\u043E\u0432 \u043A \u043F\u043E\u0438\u0441\u043A\u0443",
    body: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0432\u0441\u0451 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442 \u0434\u043B\u044F \u042F\u043D\u0434\u0435\u043A\u0441\u0430 \u0438 Google: \u0437\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435, \u043A\u0430\u0440\u0442\u0430 \u0441\u0430\u0439\u0442\u0430, \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u0446\u0435\u043D \u0438 \u0447\u0430\u0441\u043E\u0432. \u0414\u0430\u043B\u044C\u0448\u0435 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u0438\u043A\u0438 \u043F\u043E\u0434\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u044E\u0442 \u0441\u0430\u0439\u0442 \u0441\u0430\u043C\u0438, \u043E\u0431\u044B\u0447\u043D\u043E \u0437\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0434\u043D\u0435\u0439.",
    metric: "\u042F\u043D\u0434\u0435\u043A\u0441",
    metricNote: "+ Google",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("circle", { cx: "27", cy: "27", r: "14" }),
      /* @__PURE__ */ jsx5("path", { d: "M38 38 L54 54" })
    ] })
  },
  {
    title: "\u041E\u0442\u0441\u0435\u043A\u0430\u0435\u0442 \u0441\u043F\u0430\u043C",
    body: "\u0410\u043D\u0442\u0438\u0431\u043E\u0442-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0436\u0438\u0432\u043E\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u043D\u0435 \u0437\u0430\u043C\u0435\u0447\u0430\u0435\u0442. \u0411\u043E\u0442\u044B \u0443\u043F\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0432 \u0441\u0442\u0435\u043D\u0443, \u0434\u043E \u0432\u0430\u0441 \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438.",
    metric: "0",
    metricNote: "\u0431\u043E\u0442\u043E\u0432 \u0432 \u0437\u0430\u044F\u0432\u043A\u0430\u0445",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M32 8 L52 16 L52 32 C 52 44, 42 54, 32 56 C 22 54, 12 44, 12 32 L12 16 Z" }),
      /* @__PURE__ */ jsx5("path", { d: "M22 32 L29 39 L42 24" })
    ] })
  }
];
function BaseWorkSection({ mobile }) {
  return /* @__PURE__ */ jsxs4("section", { id: "base", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx5(H2, { mobile, children: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u2014 \u0442\u043E\u0436\u0435 \u043D\u0430 \u043D\u0451\u043C" }),
      /* @__PURE__ */ jsx5(Sub, { mobile, maxWidth: 720, children: "\u042D\u0442\u043E \u0442\u043E, \u0447\u0442\u043E \u043D\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445 \u043D\u0430\u0434\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u0440\u0443\u043A\u0430\u043C\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0438\u0442\u044C SMM-\u0449\u0438\u043A\u0443. \u0417\u0434\u0435\u0441\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u0437 \u043A\u043E\u0440\u043E\u0431\u043A\u0438." })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 14 : 22
    }, children: BASE_ITEMS.map((item) => /* @__PURE__ */ jsxs4("div", { style: {
      background: VT.white,
      borderRadius: 18,
      border: `1px solid ${VT.line}`,
      boxShadow: "0 1px 2px rgba(40,28,18,0.03), 0 14px 34px -26px rgba(120,60,30,0.16)",
      padding: mobile ? "22px 22px" : "28px 30px",
      display: "flex",
      flexDirection: "column"
    }, children: [
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsx5("span", { style: {
          flex: "0 0 auto",
          width: 46,
          height: 46,
          borderRadius: 12,
          background: VT.accentSoft,
          color: VT.accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: item.icon }),
        /* @__PURE__ */ jsx5("h3", { style: {
          fontSize: mobile ? 20 : 22,
          fontWeight: 800,
          letterSpacing: "-0.025em",
          margin: 0,
          lineHeight: 1.15,
          color: VT.ink
        }, children: item.title })
      ] }),
      /* @__PURE__ */ jsx5("p", { style: {
        margin: 0,
        fontSize: mobile ? 14.5 : 15.5,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: item.body }),
      /* @__PURE__ */ jsxs4("div", { style: {
        marginTop: "auto",
        paddingTop: 18,
        borderTop: `1px solid ${VT.lineSoft}`,
        display: "flex",
        alignItems: "baseline",
        gap: 9
      }, children: [
        /* @__PURE__ */ jsx5("span", { style: {
          fontSize: mobile ? 22 : 26,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: VT.accent,
          lineHeight: 1
        }, children: item.metric }),
        /* @__PURE__ */ jsx5("span", { style: {
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: VT.inkFaint,
          fontWeight: 600
        }, children: item.metricNote })
      ] })
    ] }, item.title)) })
  ] });
}
var SOURCES_LIST = [
  {
    id: "yandex",
    name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    pull: "\u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B",
    featured: true,
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram-\u043A\u0430\u043D\u0430\u043B",
    pull: "\u043F\u043E\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx5("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    pull: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F",
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("defs", { children: /* @__PURE__ */ jsxs4("linearGradient", { id: "iggrC", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx5("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx5("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx5("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx5("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggrC)" }),
      /* @__PURE__ */ jsx5("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx5("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx5("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u043E\u0442\u0437\u044B\u0432\u044B",
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx5("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx5("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "site",
    name: "\u0412\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    pull: "\u0442\u0435\u043A\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0443\u0441\u043B\u0443\u0433\u0438",
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx5("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx5("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0424\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    pull: "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx5("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx5("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx5("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
var SOURCES_SOON = ["\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435", "Ozon", "YouTube"];
function SourcesSection({ mobile }) {
  return /* @__PURE__ */ jsxs4("section", { id: "sources", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx5(H2, { mobile, children: "\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0432\u0441\u0451 \u0435\u0441\u0442\u044C \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx5(Sub, { mobile, maxWidth: 720, children: "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0432\u0441\u0451, \u0433\u0434\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435 \u0443\u0436\u0435 \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442 \u2014 \u0445\u0432\u0430\u0442\u0438\u0442 \u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430." })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 10 : 14
    }, children: SOURCES_LIST.map((s) => /* @__PURE__ */ jsxs4("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: mobile ? 14 : 18,
      padding: s.featured ? mobile ? "18px 18px" : "22px 24px" : mobile ? "14px 16px" : "18px 22px",
      background: VT.white,
      border: `1px solid ${s.featured ? VT.accent : VT.line}`,
      borderRadius: 14,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx5("span", { style: { flex: "0 0 auto" }, children: s.logo }),
      /* @__PURE__ */ jsxs4("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx5("div", { style: {
          fontSize: mobile ? 15.5 : 17,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.022em",
          lineHeight: 1.2
        }, children: s.name }),
        /* @__PURE__ */ jsxs4("div", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: {
      marginTop: mobile ? 20 : 28,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 20 : 28}px auto 0`,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 10,
      justifyContent: mobile ? "flex-start" : "center"
    }, children: [
      /* @__PURE__ */ jsx5("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0421\u041A\u041E\u0420\u041E \u041F\u041E\u0414\u041A\u041B\u042E\u0427\u0418\u041C" }),
      SOURCES_SOON.map((n) => /* @__PURE__ */ jsx5("span", { style: {
        padding: "6px 14px",
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 13,
        color: VT.inkSoft,
        fontWeight: 500
      }, children: n }, n)),
      /* @__PURE__ */ jsx5("a", { style: {
        fontSize: 13.5,
        color: VT.accent,
        textDecoration: "underline",
        textUnderlineOffset: 4,
        marginLeft: mobile ? 0 : 6
      }, children: "\u041D\u0435 \u043D\u0430\u0448\u043B\u0438 \u0441\u0432\u043E\u044E? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u2192" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: {
      marginTop: mobile ? 32 : 56,
      maxWidth: mobile ? "100%" : 1200,
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
      /* @__PURE__ */ jsx5("span", { style: {
        flex: "0 0 auto",
        width: mobile ? 64 : 88,
        height: mobile ? 64 : 88
      }, children: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 88 88", width: "100%", height: "100%", children: [
        /* @__PURE__ */ jsx5("path", { d: "M44 4 C 24 4, 10 18, 10 38 C 10 60, 44 84, 44 84 C 44 84, 78 60, 78 38 C 78 18, 64 4, 44 4 Z", fill: "#FC3F1D" }),
        /* @__PURE__ */ jsx5("text", { x: "44", y: "48", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "32", fill: "#fff", children: "\u042F" })
      ] }) }),
      /* @__PURE__ */ jsxs4("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx5("h3", { style: {
          margin: 0,
          fontSize: mobile ? 21 : 26,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          lineHeight: 1.2,
          color: VT.ink,
          textWrap: "balance"
        }, children: "\xAB\u0423 \u043C\u0435\u043D\u044F \u0436\u0435 \u0435\u0441\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445. \u0417\u0430\u0447\u0435\u043C \u043C\u043D\u0435 \u0435\u0449\u0451 \u0441\u0430\u0439\u0442?\xBB" }),
        /* @__PURE__ */ jsxs4("p", { style: {
          margin: "10px 0 0",
          fontSize: mobile ? 14.5 : 16,
          lineHeight: 1.5,
          color: VT.inkSoft,
          textWrap: "pretty"
        }, children: [
          "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u041A\u0430\u0440\u0442\u0430\u0445 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0432\u0430\u0441 \u0442\u0435\u043C, \u043A\u0442\u043E \u0438 \u0442\u0430\u043A \u0438\u0449\u0435\u0442 \u0438\u043C\u0435\u043D\u043D\u043E \u0432\u0430\u0441. ",
          /* @__PURE__ */ jsx5("b", { style: { color: VT.ink }, children: "\u0421\u0430\u0439\u0442 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0438 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0448\u0438\u0440\u043E\u043A\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C" }),
          " \u2014 \u0442\u0443\u0434\u0430, \u043A\u0443\u0434\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u0434\u043E\u0442\u044F\u0433\u0438\u0432\u0430\u0435\u0442\u0441\u044F. \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0431\u0435\u0440\u0451\u0442 \u043E\u0442\u0442\u0443\u0434\u0430 \u0434\u0430\u043D\u043D\u044B\u0435 \u0438 \u0434\u0435\u043B\u0430\u0435\u0442 \u0438\u0437 \u043D\u0438\u0445 \u0442\u043E, \u0447\u0435\u0433\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u0432 \u041A\u0430\u0440\u0442\u0430\u0445 \u043D\u0435 \u0443\u043C\u0435\u0435\u0442."
        ] })
      ] })
    ] })
  ] });
}
var OWNER_POINTS = [
  {
    title: "\u041D\u0435 \u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u0430\u0441\u044C \u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u044F \u2014 \u043E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u0435, \u0438 \u043E\u043D\u0430 \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442",
    body: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \xAB\u043D\u0435\u0439\u0440\u043E\u0441\u0435\u0442\u044C \u0437\u043D\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0435\xBB.",
    demo: "approve",
    icon: /* @__PURE__ */ jsxs4("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.8A8.5 8.5 0 1 1 21 11.5Z" }),
      /* @__PURE__ */ jsx5("path", { d: "M8.5 12l2.2 2.2 4.8-4.8" })
    ] })
  },
  {
    title: "\u0422\u0435\u043A\u0441\u0442 \u0438 \u0444\u043E\u0442\u043E \u043F\u0440\u0430\u0432\u0438\u0442\u0435 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A",
    body: "\u041F\u0440\u044F\u043C\u043E \u043D\u0430 \u0441\u0430\u0439\u0442\u0435, \u0431\u0435\u0437 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u043E\u0432.",
    demo: "edit",
    icon: /* @__PURE__ */ jsxs4("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 20h9" }),
      /* @__PURE__ */ jsx5("path", { d: "M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" })
    ] })
  },
  {
    title: "\u0421\u0430\u0439\u0442 \u0432\u0430\u0448, \u0437\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442",
    body: "\u0410\u0440\u0445\u0438\u0432 HTML \u0438 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0441\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439. \u0414\u043E\u0441\u0442\u0443\u043F \u043A \u043D\u0435\u043C\u0443 \u2014 \u043F\u043E\u043A\u0430 \u0430\u043A\u0442\u0438\u0432\u0435\u043D \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u0438 \u0435\u0449\u0451 10 \u0434\u043D\u0435\u0439, \u0435\u0441\u043B\u0438 \u0440\u0435\u0448\u0438\u0442\u0435 \u0443\u0439\u0442\u0438.",
    demo: "export",
    icon: /* @__PURE__ */ jsxs4("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
      /* @__PURE__ */ jsx5("path", { d: "M7 10l5 5 5-5" }),
      /* @__PURE__ */ jsx5("path", { d: "M12 15V3" })
    ] })
  },
  {
    title: "\u0423\u0434\u0430\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u043E\u0434\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u0435",
    body: "\u0411\u0435\u0437 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0432 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443 \u0438 \u0443\u0433\u043E\u0432\u043E\u0440\u043E\u0432 \xAB\u043F\u043E\u0434\u0443\u043C\u0430\u0439\u0442\u0435 \u0435\u0449\u0451\xBB.",
    demo: "delete",
    icon: /* @__PURE__ */ jsxs4("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M3 6h18" }),
      /* @__PURE__ */ jsx5("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
      /* @__PURE__ */ jsx5("path", { d: "M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" })
    ] })
  }
];
function OwnerDemo({ kind, mobile }) {
  const pill = (label, opts = {}) => /* @__PURE__ */ jsx5("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "6px 12px",
    borderRadius: 999,
    fontSize: 12.5,
    fontWeight: 600,
    whiteSpace: "nowrap",
    ...opts
  }, children: label });
  if (kind === "approve") {
    return /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }, children: [
      pill(/* @__PURE__ */ jsxs4(Fragment3, { children: [
        /* @__PURE__ */ jsx5("span", { style: { fontSize: 14 }, children: "\u2713" }),
        "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C"
      ] }), { background: VT.accent, color: "#fff" }),
      pill("\u0418\u043D\u0430\u0447\u0435", { background: VT.white, color: VT.ink, border: `1px solid ${VT.line}` }),
      pill("\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C", { background: VT.white, color: VT.inkSoft, border: `1px solid ${VT.line}` })
    ] });
  }
  if (kind === "edit") {
    return /* @__PURE__ */ jsxs4("div", { style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      borderRadius: 10,
      border: `1.5px dashed ${VT.accent}`,
      background: VT.accentSoft,
      fontSize: 13,
      color: VT.ink,
      fontWeight: 500
    }, children: [
      "\u041A\u0430\u043F\u0443\u0447\u0438\u043D\u043E \u043D\u0430 \u043E\u0432\u0441\u044F\u043D\u043E\u043C",
      /* @__PURE__ */ jsx5("span", { style: { width: 1.5, height: 16, background: VT.accent, animation: "none" } }),
      /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.accent }, children: "\u043F\u0440\u0430\u0432\u043A\u0430" })
    ] });
  }
  if (kind === "export") {
    return /* @__PURE__ */ jsxs4("div", { style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 14px",
      borderRadius: 10,
      background: VT.white,
      border: `1px solid ${VT.line}`
    }, children: [
      /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }, children: "\u0441\u0430\u0439\u0442.zip" }),
      /* @__PURE__ */ jsx5("span", { style: { fontSize: 11, color: VT.inkFaint }, children: "HTML + \u0444\u043E\u0442\u043E" }),
      /* @__PURE__ */ jsx5("span", { style: {
        width: 24,
        height: 24,
        borderRadius: 7,
        background: VT.accent,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13
      }, children: "\u2193" })
    ] });
  }
  return /* @__PURE__ */ jsxs4("div", { style: { display: "inline-flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsxs4("span", { style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 7,
      padding: "8px 14px",
      borderRadius: 999,
      fontSize: 12.5,
      fontWeight: 600,
      background: VT.white,
      color: VT.ink,
      border: `1px solid ${VT.line}`
    }, children: [
      /* @__PURE__ */ jsxs4("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx5("path", { d: "M3 6h18" }),
        /* @__PURE__ */ jsx5("path", { d: "M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14" }),
        /* @__PURE__ */ jsx5("path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })
      ] }),
      "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0430\u0439\u0442"
    ] }),
    /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: "1 \u043A\u043B\u0438\u043A" })
  ] });
}
function OwnershipSection({ mobile }) {
  return /* @__PURE__ */ jsxs4("section", { id: "ownership", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs4(H2, { mobile, children: [
        "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0434\u0435\u043B\u0430\u0435\u0442 \u0440\u0443\u0442\u0438\u043D\u0443.",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0420\u0435\u0448\u0435\u043D\u0438\u044F \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0437\u0430 \u0432\u0430\u043C\u0438"
      ] }),
      /* @__PURE__ */ jsx5(Sub, { mobile, maxWidth: 760, children: "\u0412\u0441\u0451, \u0447\u0442\u043E \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442, \u0438\u0434\u0451\u0442 \u0447\u0435\u0440\u0435\u0437 \u0432\u0430\u0448\u0435 \xAB\u0434\u0430\xBB. \u0412\u0441\u0451, \u0447\u0442\u043E \u0441\u043E\u0431\u0440\u0430\u043B, \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u0435. \u0417\u0430\u0445\u043E\u0442\u0438\u0442\u0435 \u0443\u0439\u0442\u0438 \u2014 \u0437\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0438 \u0443\u0439\u0434\u0451\u0442\u0435." })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
      gap: mobile ? 12 : 16
    }, children: OWNER_POINTS.map((pt, i) => /* @__PURE__ */ jsxs4("div", { style: {
      display: "flex",
      flexDirection: "column",
      padding: mobile ? "20px 20px" : "26px 28px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 18
    }, children: [
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 13, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsx5("span", { style: {
          flex: "0 0 auto",
          width: 44,
          height: 44,
          borderRadius: 12,
          background: VT.accent,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: pt.icon }),
        /* @__PURE__ */ jsx5("div", { style: {
          fontSize: mobile ? 19 : 22,
          fontWeight: 800,
          color: VT.ink,
          letterSpacing: "-0.025em",
          lineHeight: 1.12
        }, children: pt.title })
      ] }),
      /* @__PURE__ */ jsx5("p", { style: {
        margin: 0,
        fontSize: mobile ? 14 : 15,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: pt.body }),
      /* @__PURE__ */ jsx5("div", { style: { marginTop: "auto", paddingTop: 18 }, children: /* @__PURE__ */ jsx5(OwnerDemo, { kind: pt.demo, mobile }) })
    ] }, i)) })
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
      text: /* @__PURE__ */ jsxs4(Fragment3, { children: [
        "\u0412 ",
        /* @__PURE__ */ jsx5("b", { children: "\u043F\u044F\u0442\u043D\u0438\u0446\u0443" }),
        " \u0437\u0430\u044F\u0432\u043E\u043A \u0432 \u0434\u0432\u0430 \u0440\u0430\u0437\u0430 \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0432 \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435. \u041F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u043F\u0440\u0438\u0432\u044B\u0447\u043A\u0443 \xAB\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u0435\u043B\u0430 \u043F\u0435\u0440\u0435\u0434 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u043C\u0438\xBB."
      ] })
    },
    {
      tag: "\u0420\u041E\u0421\u0422",
      tagColor: "oklch(0.50 0.13 145)",
      text: /* @__PURE__ */ jsxs4(Fragment3, { children: [
        "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430 ",
        /* @__PURE__ */ jsx5("b", { children: "+34%" }),
        " \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E. \u041F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u043E\u0434\u043D\u044F\u043B\u0438 \u0431\u043B\u043E\u043A \u043D\u0430\u0432\u0435\u0440\u0445 \u0433\u043B\u0430\u0432\u043D\u043E\u0439."
      ] })
    },
    {
      tag: "\u041F\u0420\u041E\u0412\u0410\u041B",
      tagColor: "oklch(0.50 0.16 270)",
      text: /* @__PURE__ */ jsxs4(Fragment3, { children: [
        "\xAB\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436\xBB \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442, \u043D\u043E ",
        /* @__PURE__ */ jsx5("b", { children: "\u043D\u0435 \u043D\u0430\u0436\u0438\u043C\u0430\u044E\u0442" }),
        ". \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043D\u0435\u0442 \u0446\u0435\u043D \u2014 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A."
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs4("section", { id: "analytics", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs4(H2, { mobile, children: [
        "\u0412\u0438\u0434\u0438\u0442\u0435 \u0440\u043E\u0432\u043D\u043E \u0442\u043E \u0436\u0435,",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0447\u0442\u043E \u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx5(Sub, { mobile, maxWidth: 760, children: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438, \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B\u0438, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u043B \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u0440\u0430\u0432\u043A\u0443 \u2014 \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u043D\u0435\u0434\u0435\u043B\u0435 \u0432\u0438\u0434\u0438\u0442\u0435, \u043A\u0430\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C \u0446\u0438\u0444\u0440\u044B." })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsxs4("div", { style: {
        padding: mobile ? "12px 16px" : "14px 22px",
        borderBottom: `1px solid ${VT.line}`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: VT.bgSoft
      }, children: [
        /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx5("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" } }),
          /* @__PURE__ */ jsx5("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" } }),
          /* @__PURE__ */ jsx5("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#28C840" } })
        ] }),
        /* @__PURE__ */ jsxs4("div", { style: {
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
          /* @__PURE__ */ jsxs4("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [
            /* @__PURE__ */ jsx5("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
            /* @__PURE__ */ jsx5("path", { d: "M7 11 V7 a5 5 0 0 1 10 0 V11" })
          ] }),
          "app.samosite.online/analytics"
        ] }),
        /* @__PURE__ */ jsxs4("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.ink,
          fontWeight: 600
        }, children: [
          /* @__PURE__ */ jsx5("span", { style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "oklch(0.65 0.18 145)",
            boxShadow: "0 0 0 3px oklch(0.65 0.18 145 / 0.25)"
          } }),
          "LIVE"
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { style: {
        padding: mobile ? "12px 16px" : "14px 26px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexWrap: "wrap",
        borderBottom: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsx5("span", { style: { fontSize: mobile ? 14 : 16, fontWeight: 700, letterSpacing: "-0.02em" }, children: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 Park \xB7 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" }),
        /* @__PURE__ */ jsx5("span", { style: { flex: 1 } }),
        ["7 \u0434\u043D\u0435\u0439", "30 \u0434\u043D\u0435\u0439", "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F"].map((p, i) => /* @__PURE__ */ jsx5("button", { type: "button", style: {
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
      /* @__PURE__ */ jsxs4("div", { style: { padding: mobile ? "18px 16px" : "24px 26px" }, children: [
        /* @__PURE__ */ jsx5("div", { style: {
          display: "grid",
          gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
          gap: mobile ? 10 : 14
        }, children: [
          { label: "\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439", value: "1 284", delta: "+18%" },
          { label: "\u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u044B \u0443\u0441\u043B\u0443\u0433", value: "892", delta: "+24%" },
          { label: "\u0437\u0430\u044F\u0432\u043E\u043A", value: "47", delta: "+12%", accent: true },
          { label: "\u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F", value: "3.7%", delta: "+0.4 \u043F.\u043F." }
        ].map((k, i) => /* @__PURE__ */ jsxs4("div", { style: {
          padding: mobile ? 14 : 16,
          borderRadius: 12,
          background: k.accent ? VT.accentSoft : VT.bgSoft,
          border: `1px solid ${k.accent ? VT.accent : VT.line}`,
          position: "relative",
          overflow: "hidden"
        }, children: [
          /* @__PURE__ */ jsx5("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: VT.inkFaint,
            fontWeight: 600,
            textTransform: "uppercase"
          }, children: k.label }),
          /* @__PURE__ */ jsx5("div", { style: {
            marginTop: 8,
            fontSize: mobile ? 26 : 32,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: VT.ink,
            lineHeight: 1,
            fontFamily: VT.font.mono
          }, children: k.value }),
          /* @__PURE__ */ jsxs4("div", { style: {
            marginTop: 6,
            display: "inline-flex",
            alignItems: "center",
            gap: 5,
            fontSize: 11.5,
            color: "oklch(0.50 0.13 145)",
            fontWeight: 600
          }, children: [
            /* @__PURE__ */ jsx5("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: /* @__PURE__ */ jsx5("path", { d: "M5 1 L9 7 L1 7 Z" }) }),
            k.delta,
            " ",
            /* @__PURE__ */ jsx5("span", { style: { color: VT.inkFaint, fontWeight: 500 }, children: "\u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E" })
          ] })
        ] }, i)) }),
        /* @__PURE__ */ jsxs4("div", { style: {
          marginTop: 18,
          padding: 18,
          borderRadius: 14,
          background: VT.bgSoft,
          border: `1px solid ${VT.line}`,
          position: "relative"
        }, children: [
          /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
            /* @__PURE__ */ jsx5("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u043E \u0434\u043D\u044F\u043C" }),
            /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: "\u043F\u043D \u2013 \u0432\u0441" }),
            /* @__PURE__ */ jsxs4("span", { style: { marginLeft: "auto", fontFamily: VT.font.mono, fontSize: 11, color: VT.inkSoft }, children: [
              "\u0432\u0441\u0435\u0433\u043E ",
              /* @__PURE__ */ jsx5("b", { style: { color: VT.ink }, children: "47" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { style: {
            marginTop: 22,
            position: "relative",
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            alignItems: "end",
            height: mobile ? 140 : 180
          }, children: [
            /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }, children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx5("div", { style: { borderTop: `1px dashed ${VT.line}` } }, i)) }),
            days.map((d, i) => /* @__PURE__ */ jsx5("div", { style: {
              height: `${d / max * 100}%`,
              background: i === peakIdx ? `linear-gradient(180deg, ${VT.accent}, oklch(0.50 0.16 35))` : "oklch(0.84 0.06 50)",
              borderRadius: "6px 6px 0 0",
              position: "relative",
              boxShadow: i === peakIdx ? "0 -2px 16px rgba(217, 119, 87, 0.4)" : "none"
            }, children: /* @__PURE__ */ jsx5("span", { style: {
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
          /* @__PURE__ */ jsx5("div", { style: {
            marginTop: 6,
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            color: VT.inkFaint,
            textAlign: "center",
            letterSpacing: "0.04em"
          }, children: dayLabels.map((l, i) => /* @__PURE__ */ jsx5("span", { style: {
            color: i === peakIdx ? VT.accentSoft : "inherit",
            fontWeight: i === peakIdx ? 700 : 500
          }, children: l }, l)) })
        ] }),
        /* @__PURE__ */ jsxs4("div", { style: {
          marginTop: 16,
          display: "grid",
          gridTemplateColumns: mobile ? "1fr" : "1fr 1fr",
          gap: mobile ? 12 : 16
        }, children: [
          /* @__PURE__ */ jsxs4("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx5("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438" }),
            [
              ["\u042F\u043D\u0434\u0435\u043A\u0441", 48, "oklch(0.55 0.14 30)"],
              ["Google", 22, "oklch(0.48 0.13 240)"],
              ["\u041F\u0440\u044F\u043C\u044B\u0435 \u0437\u0430\u0445\u043E\u0434\u044B", 12, "oklch(0.50 0.12 145)"],
              ["\u0421\u043E\u0446\u0441\u0435\u0442\u0438", 11, "oklch(0.55 0.10 280)"],
              ["\u0414\u0440\u0443\u0433\u043E\u0435", 7, "oklch(0.60 0.04 60)"]
            ].map(([label, v, color]) => /* @__PURE__ */ jsxs4("div", { style: { marginBottom: 9 }, children: [
              /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", fontSize: 12.5 }, children: [
                /* @__PURE__ */ jsx5("span", { style: { color: VT.ink }, children: label }),
                /* @__PURE__ */ jsxs4("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600 }, children: [
                  v,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx5("div", { style: { marginTop: 5, height: 6, background: VT.line, borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ jsx5("div", { style: { width: `${v}%`, height: "100%", background: color } }) })
            ] }, label))
          ] }),
          /* @__PURE__ */ jsxs4("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx5("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u0421\u0430\u043C\u044B\u0435 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }),
            [
              ["\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430", 142, "+34%"],
              ["\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", 98, "+8%"],
              ["\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", 64, "+2%"],
              ["\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436", 41, "\u221212%"]
            ].map(([n, v, delta]) => /* @__PURE__ */ jsxs4("div", { style: {
              display: "flex",
              alignItems: "baseline",
              gap: 10,
              padding: "8px 0",
              borderBottom: `1px dashed ${VT.line}`
            }, children: [
              /* @__PURE__ */ jsx5("span", { style: { color: VT.ink, fontSize: 13 }, children: n }),
              /* @__PURE__ */ jsx5("span", { style: {
                fontFamily: VT.font.mono,
                fontSize: 11,
                fontWeight: 600,
                color: String(delta).startsWith("+") ? "oklch(0.75 0.16 145)" : "oklch(0.70 0.14 30)"
              }, children: delta }),
              /* @__PURE__ */ jsx5("span", { style: { flex: 1 } }),
              /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600, fontSize: 13 }, children: v })
            ] }, n))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("p", { style: {
      marginTop: mobile ? 22 : 30,
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 22 : 30}px auto 0`,
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.5,
      color: VT.inkSoft,
      textAlign: "center",
      textWrap: "pretty"
    }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0442\u0443\u0434\u0430 \u0436\u0435, \u043A\u0443\u0434\u0430 \u0438 \u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS. \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E, \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u043C\u0438 \u043D\u0430\u0439\u0434\u0443\u0442 \u0432\u0430\u0441." }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: mobile ? 20 : 28, textAlign: "center" }, children: /* @__PURE__ */ jsxs4("a", { href: "client-admin-demo.html", style: {
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
      /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", children: "\u2197" })
    ] }) })
  ] });
}
var PLAN_HILITE = 2;
var PLAN_META = [
  { name: "\u0421\u0442\u0430\u0440\u0442", price: "0", unit: "\u20BD", sub: "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430" },
  { name: "\u041B\u0438\u0447\u043D\u044B\u0439", price: "690", unit: "\u20BD/\u043C\u0435\u0441", sub: "6 620 \u20BD/\u0433\u043E\u0434" },
  { name: "\u0411\u0438\u0437\u043D\u0435\u0441", price: "1 490", unit: "\u20BD/\u043C\u0435\u0441", sub: "14 300 \u20BD/\u0433\u043E\u0434", hot: true },
  { name: "\u041A\u043E\u043C\u043F\u0430\u043D\u0438\u044F", price: "2 990", unit: "\u20BD/\u043C\u0435\u0441", sub: "28 700 \u20BD/\u0433\u043E\u0434" },
  { name: "\u0421\u0442\u0443\u0434\u0438\u044F", price: "6 990", unit: "\u20BD/\u043C\u0435\u0441", sub: "67 100 \u20BD/\u0433\u043E\u0434" }
];
var PRICING_MATRIX = [
  {
    rows: [
      { label: "\u0412\u044B\u0433\u043E\u0434\u0430 \u0433\u043E\u0434\u043E\u0432\u043E\u0433\u043E", vals: ["\u2014", "\u221220%", "\u221220%", "\u221220%", "\u221220%"] },
      { label: "\u0414\u043B\u044F \u043A\u043E\u0433\u043E", vals: ["\u041F\u043E\u043F\u0440\u043E\u0431\u043E\u0432\u0430\u0442\u044C", "\u0421\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u044B\u0435, \u043B\u0438\u0447\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B", "\u041C\u0430\u043B\u044B\u0439 \u0431\u0438\u0437\u043D\u0435\u0441", "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u0440\u0435\u043D\u0434\u043E\u0432, \u0438\u043D\u0444\u043E\u0431\u0438\u0437\u043D\u0435\u0441", "\u0421\u0442\u0443\u0434\u0438\u0438 \u0438 \u0430\u0433\u0435\u043D\u0442\u0441\u0442\u0432\u0430"] }
    ]
  },
  {
    title: "\u0421\u0430\u0439\u0442\u044B \u0438 \u0445\u043E\u0441\u0442\u0438\u043D\u0433",
    rows: [
      { label: "\u0421\u0430\u0439\u0442\u043E\u0432 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442\u0435", vals: ["1", "1", "2", "8", "30"] },
      { label: "\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D", vals: [false, "1", "2", "8", "30"] },
      { label: "\u041F\u043E\u0434\u0434\u043E\u043C\u0435\u043D samosite", vals: [true, true, true, true, true] },
      { label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446 \u043D\u0430 \u0441\u0430\u0439\u0442", vals: ["3", "15", "50", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439"] },
      { label: "\u0425\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 \u043C\u0435\u0434\u0438\u0430", vals: ["500 \u041C\u0411", "5 \u0413\u0411", "20 \u0413\u0411", "100 \u0413\u0411", "500 \u0413\u0411"] },
      { label: "\u041C\u0435\u0441\u044F\u0447\u043D\u044B\u0439 \u0442\u0440\u0430\u0444\u0438\u043A", vals: ["5 \u0413\u0411", "50 \u0413\u0411", "200 \u0413\u0411", "1 \u0422\u0411", "5 \u0422\u0411"] },
      { label: "\u0421\u0435\u0440\u0442\u0438\u0444\u0438\u043A\u0430\u0442 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0441\u0442\u0438 (SSL)", vals: [true, true, true, true, true] },
      { label: "\u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0431\u0440\u0435\u043D\u0434\u0438\u043D\u0433\u0430 samosite", vals: [false, true, true, true, true] }
    ]
  },
  {
    title: "\u0418\u0418-\u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0438 (\u0432 \u043C\u0435\u0441\u044F\u0446)",
    rows: [
      { label: "\u041A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u0418\u0418-\u043C\u043E\u0434\u0435\u043B\u0438", vals: ["Yandex", "Claude", "Claude", "Claude", "Claude"] },
      { label: "\u0413\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0441\u0430\u0439\u0442\u0430 \u0446\u0435\u043B\u0438\u043A\u043E\u043C", vals: ["1 (\u0440\u0430\u0437\u043E\u0432\u043E)", "2", "8", "30", "120"] },
      { label: "\u041F\u0435\u0440\u0435\u0433\u0435\u043D\u0435\u0440\u0430\u0446\u0438\u044F \u0431\u043B\u043E\u043A\u043E\u0432", vals: ["10", "30", "120", "500", "1 800"] },
      { label: "\u0410\u043D\u0430\u043B\u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432", vals: ["1", "5", "20", "80", "350"] },
      { label: "\u0418\u0418-\u0440\u0435\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u0446\u0438\u0438 (\u043F\u0440\u043E\u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 / \u043A\u043E\u043D\u0442\u0435\u043D\u0442)", vals: [false, "10", "40", "180", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439*"] },
      { label: "\u041F\u0440\u0438 \u043F\u0440\u0435\u0432\u044B\u0448\u0435\u043D\u0438\u0438 \u043B\u0438\u043C\u0438\u0442\u0430", vals: ["\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0430", "\u0443\u043F\u0440\u043E\u0449\u0451\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "\u0443\u043F\u0440\u043E\u0449\u0451\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "\u0443\u043F\u0440\u043E\u0449\u0451\u043D\u043D\u044B\u0439 \u0440\u0435\u0436\u0438\u043C", "\u043C\u044F\u0433\u043A\u0438\u0439 \u043B\u0438\u043C\u0438\u0442"] },
      { label: "\u0414\u043E\u043A\u0443\u043F\u043A\u0430 \u043E\u043F\u0435\u0440\u0430\u0446\u0438\u0439 \u0441\u0432\u0435\u0440\u0445 \u043B\u0438\u043C\u0438\u0442\u0430", vals: [false, true, true, true, true] }
    ]
  },
  {
    title: "\u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0441\u0430\u0439\u0442\u0430",
    rows: [
      { label: "\u0428\u0430\u0431\u043B\u043E\u043D\u044B", vals: ["\u0431\u0430\u0437\u043E\u0432\u044B\u0435", "\u0432\u0441\u0435 \u0431\u0430\u0437\u043E\u0432\u044B\u0435", "\u0432\u0441\u0435 \u0431\u0430\u0437\u043E\u0432\u044B\u0435", "\u0432\u0441\u0435 + \u043F\u0440\u0435\u043C\u0438\u0443\u043C", "\u0432\u0441\u0435 + \u043F\u0440\u0435\u043C\u0438\u0443\u043C"] },
      { label: "\u0424\u043E\u0440\u043C\u044B \u0438 \u0437\u0430\u044F\u0432\u043A\u0438", vals: ["1 \u0444\u043E\u0440\u043C\u0430", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439"] },
      { label: "\u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 / \u0432 Telegram", vals: [false, true, true, true, true] },
      { label: "\u0412\u0438\u0434\u0436\u0435\u0442\u044B \u0441\u043E\u0446\u0441\u0435\u0442\u0435\u0439 \u0438 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u043E\u0432", vals: [false, true, true, true, true] },
      { label: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u042F.\u041C\u0435\u0442\u0440\u0438\u043A\u0438 \u0438 \u043F\u0438\u043A\u0441\u0435\u043B\u0435\u0439", vals: [false, true, true, true, true] },
      { label: "\u041F\u0440\u0438\u0451\u043C \u043F\u043B\u0430\u0442\u0435\u0436\u0435\u0439 (\u042EKassa, \u0422\u0438\u043D\u044C\u043A\u043E\u0444\u0444)", vals: [false, false, true, true, true] },
      { label: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u0438 \u043A\u0430\u0442\u0430\u043B\u043E\u0433 \u0442\u043E\u0432\u0430\u0440\u043E\u0432", vals: [false, false, "\u0434\u043E 50 \u043F\u043E\u0437.", "\u0434\u043E 500 \u043F\u043E\u0437.", "\u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439"] },
      { label: "SEO-\u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0442\u0440\u0430\u043D\u0438\u0446", vals: ["\u0431\u0430\u0437\u043E\u0432\u044B\u0435", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435"] },
      { label: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0434\u043E\u043C\u0435\u043D-\u0437\u043E\u043D\u044B (*.brand.ru)", vals: [false, false, false, true, true] },
      { label: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043A\u043E\u0434\u0430 \u0441\u0430\u0439\u0442\u0430", vals: [false, false, false, false, true] }
    ]
  },
  {
    title: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430",
    rows: [
      { label: "\u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u044B \u0438 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438", vals: [false, true, true, true, true] },
      { label: "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438 \u0442\u0440\u0430\u0444\u0438\u043A\u0430", vals: [false, false, true, true, true] },
      { label: "\u0412\u043E\u0440\u043E\u043D\u043A\u0430 \u0437\u0430\u044F\u0432\u043E\u043A \u0438 \u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u0438", vals: [false, false, true, true, true] },
      { label: "\u0421\u0440\u0430\u0432\u043D\u0435\u043D\u0438\u0435 \u0432\u0435\u0440\u0441\u0438\u0439 \u0441\u0430\u0439\u0442\u0430", vals: [false, false, false, true, true] },
      { label: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u043E\u0442\u0447\u0451\u0442\u043E\u0432 (CSV / Excel)", vals: [false, false, false, true, true] }
    ]
  },
  {
    title: "\u041A\u043E\u043C\u0430\u043D\u0434\u0430 \u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u044B",
    rows: [
      { label: "\u041A\u043E\u043C\u0430\u043D\u0434\u043D\u044B\u0439 \u0434\u043E\u0441\u0442\u0443\u043F", vals: [false, false, "2 \u0447\u0435\u043B.", "5 \u0447\u0435\u043B.", "15 \u0447\u0435\u043B."] },
      { label: "\u0420\u043E\u043B\u0438 \u0438 \u043F\u0440\u0430\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0430", vals: [false, false, "\u0431\u0430\u0437\u043E\u0432\u044B\u0435", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435", "\u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u043D\u044B\u0435"] },
      { label: "\u0420\u0430\u0431\u043E\u0442\u0430 \u043F\u043E\u0434 \u0431\u0440\u0435\u043D\u0434\u043E\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430", vals: [false, false, false, false, true] },
      { label: "\u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u0441\u0430\u0439\u0442\u0430 \u0432 \u0430\u043A\u043A\u0430\u0443\u043D\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430", vals: [false, false, false, false, true] },
      { label: "\u0411\u0438\u043B\u043B\u0438\u043D\u0433 \u043E\u0442 \u0438\u043C\u0435\u043D\u0438 \u0441\u0442\u0443\u0434\u0438\u0438", vals: [false, false, false, false, true] }
    ]
  },
  {
    title: "\u041F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430",
    rows: [
      { label: "\u0411\u0430\u0437\u0430 \u0437\u043D\u0430\u043D\u0438\u0439 \u0438 \u0432\u0438\u0434\u0435\u043E\u0443\u0440\u043E\u043A\u0438", vals: [true, true, true, true, true] },
      { label: "\u041A\u0430\u043D\u0430\u043B \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0438", vals: ["\u2014", "\u0447\u0430\u0442", "\u0447\u0430\u0442", "\u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442\u043D\u044B\u0439 \u0447\u0430\u0442", "\u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"] },
      { label: "\u0412\u0440\u0435\u043C\u044F \u043E\u0442\u0432\u0435\u0442\u0430", vals: ["\u2014", "24 \u0447", "12 \u0447", "4 \u0447", "1 \u0447"] },
      { label: "\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u044B (\u043E\u043D\u043B\u0430\u0439\u043D)", vals: [false, false, false, false, true] }
    ]
  }
];
function MatrixCell({ v, hi }) {
  if (v === true) {
    return /* @__PURE__ */ jsx5("span", { style: { display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: VT.successSoft, color: VT.success, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx5("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M5 12 l4 4 10 -10" }) }) });
  }
  if (v === false) {
    return /* @__PURE__ */ jsx5("span", { style: { color: VT.inkFaint, fontSize: 16 }, children: "\u2014" });
  }
  return /* @__PURE__ */ jsx5("span", { style: { fontSize: 13.5, lineHeight: 1.35, textAlign: "center", fontVariantNumeric: "tabular-nums", fontWeight: hi ? 700 : 500, color: hi ? VT.ink : VT.inkSoft }, children: v });
}
function PricingMatrix({ mobile }) {
  const firstCol = mobile ? 132 : 240;
  const planCol = mobile ? 116 : 192;
  const totalW = firstCol + planCol * 5;
  const cellPad = mobile ? "10px 8px" : "12px 14px";
  const cols = `${firstCol}px repeat(5, ${planCol}px)`;
  const hiBg = (ci) => ci === PLAN_HILITE ? VT.accentSoft : "transparent";
  const hiSide = (ci) => ci === PLAN_HILITE ? { boxShadow: `inset 1px 0 0 ${VT.accent}33, inset -1px 0 0 ${VT.accent}33` } : {};
  return /* @__PURE__ */ jsxs4("div", { style: {
    marginTop: mobile ? 24 : 40,
    border: `1px solid ${VT.line}`,
    borderRadius: 20,
    overflow: "hidden",
    background: VT.white,
    boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 24px 60px -30px rgba(120,60,30,0.28)"
  }, children: [
    /* @__PURE__ */ jsx5("div", { style: mobile ? { overflowX: "auto", WebkitOverflowScrolling: "touch" } : { overflow: "visible" }, children: /* @__PURE__ */ jsxs4("div", { style: { minWidth: mobile ? totalW : 0 }, children: [
      /* @__PURE__ */ jsxs4("div", { style: {
        display: "grid",
        gridTemplateColumns: cols,
        position: "sticky",
        top: 0,
        zIndex: 2,
        background: VT.white,
        borderBottom: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsxs4("div", { style: {
          padding: mobile ? "14px 10px" : "20px 18px",
          position: "sticky",
          left: 0,
          background: VT.white,
          zIndex: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end"
        }, children: [
          /* @__PURE__ */ jsx5("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: VT.inkFaint,
            fontWeight: 700,
            textTransform: "uppercase"
          }, children: "5 \u0442\u0430\u0440\u0438\u0444\u043E\u0432" }),
          /* @__PURE__ */ jsx5("div", { style: { marginTop: 4, fontSize: mobile ? 11.5 : 13, color: VT.inkSoft, lineHeight: 1.35 }, children: "\u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" })
        ] }),
        PLAN_META.map((p, i) => {
          const hot = i === PLAN_HILITE;
          return /* @__PURE__ */ jsxs4("div", { style: {
            padding: mobile ? "14px 8px 14px" : `${hot ? 14 : 20}px 12px 18px`,
            textAlign: "center",
            position: "relative",
            background: hot ? VT.accentSoft : "transparent",
            ...hiSide(i)
          }, children: [
            hot && /* @__PURE__ */ jsx5("div", { style: {
              display: "inline-block",
              marginBottom: 8,
              fontFamily: VT.font.mono,
              fontSize: 9,
              letterSpacing: "0.1em",
              fontWeight: 700,
              color: "#fff",
              background: VT.accent,
              padding: "3px 9px",
              borderRadius: 999,
              textTransform: "uppercase"
            }, children: "\u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439" }),
            /* @__PURE__ */ jsx5("div", { style: {
              fontSize: mobile ? 13.5 : 15,
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: hot ? VT.accent : VT.ink
            }, children: p.name }),
            /* @__PURE__ */ jsxs4("div", { style: {
              marginTop: 6,
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
              gap: 3,
              fontVariantNumeric: "tabular-nums"
            }, children: [
              /* @__PURE__ */ jsx5("span", { style: {
                fontSize: mobile ? 19 : 26,
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: VT.ink,
                lineHeight: 1
              }, children: p.price }),
              /* @__PURE__ */ jsx5("span", { style: { fontSize: mobile ? 10.5 : 12, fontWeight: 600, color: VT.inkSoft }, children: p.unit })
            ] }),
            /* @__PURE__ */ jsx5("div", { style: {
              marginTop: 4,
              fontSize: mobile ? 9.5 : 11,
              color: VT.inkFaint,
              lineHeight: 1.3
            }, children: p.sub })
          ] }, p.name);
        })
      ] }),
      PRICING_MATRIX.map((group, gi) => /* @__PURE__ */ jsxs4("div", { children: [
        group.title && /* @__PURE__ */ jsx5("div", { style: {
          gridColumn: "1 / -1",
          padding: mobile ? "9px 10px" : "10px 18px",
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
        group.rows.map((row, ri) => /* @__PURE__ */ jsxs4("div", { style: {
          display: "grid",
          gridTemplateColumns: cols,
          borderBottom: `1px solid ${VT.lineSoft}`,
          alignItems: "stretch",
          background: ri % 2 === 1 ? VT.bgSoft + "80" : "transparent"
        }, children: [
          /* @__PURE__ */ jsx5("div", { style: {
            padding: cellPad,
            fontSize: mobile ? 12 : 13.5,
            color: VT.inkSoft,
            position: "sticky",
            left: 0,
            zIndex: 3,
            background: ri % 2 === 1 ? VT.bg : VT.white,
            borderRight: `1px solid ${VT.line}`,
            boxShadow: mobile ? "6px 0 8px -6px rgba(40,28,18,0.12)" : "none",
            display: "flex",
            alignItems: "center"
          }, children: row.label }),
          row.vals.map((v, ci) => /* @__PURE__ */ jsx5("div", { style: {
            padding: cellPad,
            textAlign: "center",
            background: hiBg(ci),
            ...hiSide(ci),
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }, children: /* @__PURE__ */ jsx5(MatrixCell, { v, hi: ci === PLAN_HILITE }) }, ci))
        ] }, ri))
      ] }, gi)),
      /* @__PURE__ */ jsxs4("div", { style: { display: "grid", gridTemplateColumns: cols, alignItems: "stretch" }, children: [
        /* @__PURE__ */ jsx5("div", { style: {
          position: "sticky",
          left: 0,
          zIndex: 3,
          background: VT.white,
          borderRight: `1px solid ${VT.line}`
        } }),
        PLAN_META.map((p, i) => {
          const hot = i === PLAN_HILITE;
          return /* @__PURE__ */ jsx5("div", { style: {
            padding: mobile ? "12px 6px" : "16px 10px",
            textAlign: "center",
            background: hot ? VT.accentSoft : "transparent",
            ...hiSide(i)
          }, children: /* @__PURE__ */ jsx5("a", { href: "#hero", style: {
            display: "inline-block",
            width: "100%",
            boxSizing: "border-box",
            padding: mobile ? "8px 4px" : "9px 10px",
            fontSize: mobile ? 11.5 : 13,
            fontWeight: 700,
            borderRadius: 999,
            textDecoration: "none",
            whiteSpace: "nowrap",
            background: hot ? VT.accent : "transparent",
            color: hot ? "#fff" : VT.accent,
            border: hot ? "none" : `1px solid ${VT.accent}`
          }, children: i === 0 ? "\u041D\u0430\u0447\u0430\u0442\u044C" : "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" }) }, p.name);
        })
      ] })
    ] }) }),
    mobile && /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("section", { id: "pricing", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx5(H2, { mobile, children: "\u0422\u0430\u0440\u0438\u0444 \u043F\u043E\u0434 \u0432\u0430\u0448 \u043C\u0430\u0441\u0448\u0442\u0430\u0431" }),
      /* @__PURE__ */ jsx5("p", { style: {
        margin: `${mobile ? 14 : 18}px auto 0`,
        maxWidth: 600,
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: "\u041E\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u0440\u0442\u0430 \u0434\u043E \u0441\u0442\u0443\u0434\u0438\u0439\u043D\u043E\u0433\u043E. \u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430 \u043B\u044E\u0431\u043E\u043C \u043F\u043B\u0430\u0442\u043D\u043E\u043C \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E." })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { maxWidth: 1200, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx5(PricingMatrix, { mobile }),
      /* @__PURE__ */ jsx5("div", { style: { marginTop: 10, fontSize: 12, color: VT.inkFaint, textAlign: mobile ? "left" : "center" }, children: "* \u0431\u0435\u0437 \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0439 \u0432 \u0440\u0430\u043C\u043A\u0430\u0445 \u0447\u0435\u0441\u0442\u043D\u043E\u0433\u043E \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F" }),
      /* @__PURE__ */ jsxs4("div", { style: { marginTop: mobile ? 18 : 28, textAlign: "center" }, children: [
        /* @__PURE__ */ jsx5(Btn, { style: { padding: mobile ? "14px 26px" : "16px 36px", fontSize: mobile ? 15 : 16 }, iconRight: /* @__PURE__ */ jsx5(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
        /* @__PURE__ */ jsx5("div", { style: { marginTop: 12, fontSize: 12.5, color: VT.inkSoft, fontStyle: "italic" }, children: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0442\u0430\u0440\u0438\u0444\u0435 \u2014 \u043E\u043F\u043B\u0430\u0442\u0443 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u043E\u0442\u043E\u043C, \u0435\u0441\u043B\u0438 \u0440\u0435\u0448\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0438." })
      ] }),
      /* @__PURE__ */ jsx5("p", { style: {
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
  return /* @__PURE__ */ jsxs4("details", { open: defaultOpen, style: {
    background: VT.white,
    border: `1px solid ${highlight ? VT.accent : VT.line}`,
    borderRadius: 14,
    padding: 0,
    overflow: "hidden",
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsxs4("summary", { style: {
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
      /* @__PURE__ */ jsx5("style", { children: `details > summary::-webkit-details-marker { display: none; }` }),
      /* @__PURE__ */ jsx5("span", { style: { flex: 1 }, children: q }),
      /* @__PURE__ */ jsx5("span", { style: {
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
    /* @__PURE__ */ jsx5("div", { style: {
      padding: mobile ? "0 18px 16px" : "0 22px 20px",
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.55,
      color: VT.inkSoft,
      textWrap: "pretty"
    }, children: a })
  ] });
}
function FaqSection({ mobile }) {
  return /* @__PURE__ */ jsxs4("section", { id: "faq", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsx5("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx5(H2, { mobile, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0445\u043E\u0442\u044F\u0442 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsxs4("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 860,
      margin: `${mobile ? 28 : 48}px auto 0`
    }, children: [
      /* @__PURE__ */ jsxs4("div", { style: {
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
        /* @__PURE__ */ jsx5("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
        "\u041F\u0420\u041E \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u042B\u0415 \u0420\u0415\u041A\u041E\u041C\u0415\u041D\u0414\u0410\u0426\u0418\u0418"
      ] }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_NEW.map((f, i) => /* @__PURE__ */ jsx5(FaqItem, { q: f.q, a: f.a, defaultOpen: i === 0, mobile, highlight: true }, f.q)) }),
      /* @__PURE__ */ jsx5("div", { style: {
        marginTop: 28,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600,
        marginBottom: 12
      }, children: "\u041E\u0421\u0422\u0410\u041B\u042C\u041D\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_REST.map((f) => /* @__PURE__ */ jsx5(FaqItem, { q: f.q, a: f.a, mobile }, f.q)) })
    ] })
  ] });
}
function FinalCtaSection({ mobile }) {
  const ladder = [
    { when: "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430", what: "\u0443 \u0432\u0430\u0441 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E", what: "\u043F\u043E\u0434\u0442\u044F\u043D\u0435\u0442 \u0441\u0432\u0435\u0436\u0438\u0435 \u043F\u043E\u0441\u0442\u044B, \u0446\u0435\u043D\u044B \u0438 \u0444\u043E\u0442\u043E \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446", what: "\u043D\u0430\u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u2014 \u0438 \u043D\u0430\u0447\u043D\u0451\u0442 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C, \u0447\u0442\u043E \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C" }
  ];
  return /* @__PURE__ */ jsx5("section", { id: "cta", style: {
    ...sectionPad(mobile),
    marginTop: mobile ? 64 : 130,
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1200,
    margin: `${mobile ? 64 : 130}px auto 0`
  }, children: /* @__PURE__ */ jsxs4("div", { style: {
    background: "oklch(0.20 0.020 60)",
    color: VT.bg,
    borderRadius: mobile ? 22 : 28,
    padding: mobile ? "36px 22px" : "72px 64px",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
      position: "absolute",
      right: -140,
      top: -120,
      width: 420,
      height: 420,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${VT.accent} 0%, transparent 60%)`,
      opacity: 0.4
    } }),
    /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
      position: "absolute",
      left: -100,
      bottom: -120,
      width: 320,
      height: 320,
      borderRadius: "50%",
      background: `radial-gradient(circle, oklch(0.6 0.10 50) 0%, transparent 65%)`,
      opacity: 0.3
    } }),
    /* @__PURE__ */ jsxs4("div", { style: { position: "relative", maxWidth: 920, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs4("h2", { style: {
        fontSize: mobile ? 28 : 50,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        margin: 0,
        lineHeight: 1.08,
        textWrap: "balance"
      }, children: [
        "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430 \u2014 \u0441\u0430\u0439\u0442.",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0441\u0430\u043C\u0438",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0431\u044B \u043D\u0435 \u0434\u043E\u0433\u0430\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C."
      ] }),
      /* @__PURE__ */ jsx5("p", { style: {
        fontSize: mobile ? 16 : 19,
        lineHeight: 1.5,
        color: "oklch(0.85 0.014 60)",
        margin: `${mobile ? 16 : 22}px auto 0`,
        maxWidth: 720,
        textWrap: "pretty"
      }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0441\u0435\u0439\u0447\u0430\u0441 \u0432\u0435\u0434\u0451\u0442\u0435 \u0441\u0432\u043E\u0438 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0418\u043B\u0438 \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442. \u0414\u0430\u043B\u044C\u0448\u0435 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442." }),
      /* @__PURE__ */ jsxs4("p", { style: {
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.5,
        color: "oklch(0.92 0.012 60)",
        margin: `${mobile ? 12 : 14}px auto 0`,
        maxWidth: 720,
        textWrap: "pretty",
        fontWeight: 500
      }, children: [
        "\u0422\u0430\u0440\u0438\u0444 \xAB\u0421\u0442\u0430\u0440\u0442\xBB \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u043D\u0430\u0432\u0441\u0435\u0433\u0434\u0430. \u041D\u0430 \u043F\u043B\u0430\u0442\u043D\u044B\u0445 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u0434\u0430\u043B\u044C\u0448\u0435 ",
        /* @__PURE__ */ jsx5("b", { style: { color: VT.accentSoft }, children: "\u043E\u0442 690 \u20BD \u0432 \u043C\u0435\u0441\u044F\u0446" }),
        "."
      ] }),
      /* @__PURE__ */ jsx5("div", { style: {
        marginTop: mobile ? 26 : 36,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
        gap: mobile ? 10 : 14,
        textAlign: "left",
        maxWidth: 880,
        margin: `${mobile ? 26 : 36}px auto 0`,
        position: "relative"
      }, children: ladder.map((rung, i) => /* @__PURE__ */ jsxs4("div", { style: {
        padding: mobile ? "16px 16px" : "20px 20px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.10)",
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        gap: 6,
        position: "relative"
      }, children: [
        /* @__PURE__ */ jsxs4("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.12em",
          color: VT.accentSoft,
          fontWeight: 700
        }, children: [
          /* @__PURE__ */ jsx5("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
          "\u0428\u0410\u0413 ",
          i + 1
        ] }),
        /* @__PURE__ */ jsx5("div", { style: {
          fontSize: mobile ? 18 : 21,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.025em",
          lineHeight: 1.15
        }, children: rung.when }),
        /* @__PURE__ */ jsx5("div", { style: {
          fontSize: mobile ? 14 : 14.5,
          color: "oklch(0.85 0.014 60)",
          lineHeight: 1.4,
          textWrap: "pretty"
        }, children: rung.what })
      ] }, i)) }),
      /* @__PURE__ */ jsx5("div", { style: { marginTop: mobile ? 28 : 36, display: "inline-flex" }, children: /* @__PURE__ */ jsx5(Btn, { iconRight: /* @__PURE__ */ jsx5(IconArrow, {}), style: {
        padding: mobile ? "14px 24px" : "18px 32px",
        fontSize: mobile ? 16 : 18
      }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }) }),
      /* @__PURE__ */ jsxs4("div", { style: {
        marginTop: mobile ? 20 : 26,
        paddingTop: mobile ? 16 : 22,
        borderTop: "1px solid rgba(255,255,255,0.10)",
        fontSize: mobile ? 13.5 : 14.5,
        color: "oklch(0.82 0.014 60)"
      }, children: [
        "\u041E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B? ",
        /* @__PURE__ */ jsx5("a", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { className: "ss-sticky-header", style: {
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
    /* @__PURE__ */ jsx5("style", { children: `
        /* \u0415\u0434\u0438\u043D\u044B\u0439 hover \u0434\u043B\u044F \u0432\u0441\u0435\u0445 \u043F\u0443\u043D\u043A\u0442\u043E\u0432 \u043C\u0435\u043D\u044E (\u0432\u043A\u043B\u044E\u0447\u0430\u044F \xAB\u0412\u043E\u0439\u0442\u0438\xBB).
           !important \u2014 \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0435 \u043F\u0435\u0440\u0435\u0436\u0438\u0432\u0430\u043B\u043E \u044D\u043A\u0441\u043F\u043E\u0440\u0442/\u0437\u0430\u043F\u0435\u043A\u0430\u043D\u0438\u0435
           \u0432\u044B\u0447\u0438\u0441\u043B\u0435\u043D\u043D\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439 \u0438\u043D\u043B\u0430\u0439\u043D\u043E\u043C (\u0438\u043D\u043B\u0430\u0439\u043D\u043E\u0432\u044B\u0439 color/background
           \u043F\u043E \u0441\u043F\u0435\u0446\u0438\u0444\u0438\u0447\u043D\u043E\u0441\u0442\u0438 \u0431\u044C\u0451\u0442 \u043F\u0440\u0430\u0432\u0438\u043B\u043E \u043A\u043B\u0430\u0441\u0441\u0430). */
        .ss-sticky-header a.ss-nav-link {
          color: ${VT.inkSoft}; text-decoration: none;
          padding: 6px 12px; border-radius: 999px;
          transition: color .15s ease, background .15s ease;
        }
        .ss-sticky-header a.ss-nav-link:hover {
          color: ${VT.ink} !important;
          background: ${VT.bgSoft} !important;
        }
      ` }),
    /* @__PURE__ */ jsxs4("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16
    }, children: [
      /* @__PURE__ */ jsx5("a", { href: "#hero", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx5(BrandMark, { size: mobile ? 22 : 26, fontSize: mobile ? 18 : 20 }) }),
      !mobile ? /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: "clamp(12px, 1.6vw, 24px)", fontSize: 14, flexWrap: "nowrap", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx5("a", { href: "#examples", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" }),
        /* @__PURE__ */ jsx5("a", { href: "#pricing", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u0426\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx5("a", { href: "#faq", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u041F\u043E\u043C\u043E\u0449\u044C" }),
        /* @__PURE__ */ jsx5("a", { href: "#login", className: "ss-nav-link", style: {
          fontWeight: 500,
          fontSize: 14,
          whiteSpace: "nowrap"
        }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs4("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] }) : /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx5("a", { href: "#login", className: "ss-nav-link", style: { fontWeight: 500, fontSize: 13.5 }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs4("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx5("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] })
    ] })
  ] });
}
function FloatingFeedback({ mobile }) {
  return /* @__PURE__ */ jsxs4(
    "a",
    {
      href: "#feedback",
      "aria-label": "\u0427\u0435\u0433\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442?",
      style: {
        position: "fixed",
        right: mobile ? 16 : 24,
        bottom: mobile ? 16 : 24,
        zIndex: 40,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: mobile ? "12px 16px" : "13px 20px",
        background: VT.white,
        color: VT.ink,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontFamily: VT.font.sans,
        fontSize: mobile ? 14 : 14.5,
        fontWeight: 600,
        letterSpacing: "-0.01em",
        textDecoration: "none",
        boxShadow: "0 1px 0 rgba(0,0,0,0.02), 0 14px 32px -12px rgba(120,60,30,0.30), 0 4px 12px -6px rgba(40,28,18,0.12)",
        cursor: "pointer"
      },
      children: [
        /* @__PURE__ */ jsx5("span", { style: {
          flex: "0 0 auto",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: VT.accent,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: /* @__PURE__ */ jsx5("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.8A8.5 8.5 0 1 1 21 11.5Z" }) }) }),
        "\u0427\u0435\u0433\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442?"
      ]
    }
  );
}
function Footer({ mobile }) {
  return /* @__PURE__ */ jsxs4("div", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx5(BrandMark, { size: 20, fontSize: 15, color: VT.inkSoft }),
      /* @__PURE__ */ jsxs4("span", { children: [
        "\xA9 2026 \xB7 ",
        BRAND.domain,
        " \xB7 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u0424"
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx5("a", { style: { color: "inherit" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
      /* @__PURE__ */ jsx5("a", { style: { color: "inherit" }, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
      /* @__PURE__ */ jsx5("a", { style: { color: "inherit" }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" })
    ] })
  ] });
}
function SamosaytLandingV3({ mobile = false }) {
  const rootRef = React3.useRef(null);
  React3.useEffect(() => {
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
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsx5("style", { children: `
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
    /* @__PURE__ */ jsxs4("div", { ref: rootRef, className: "ss-v3-root", style: {
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
      /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx5(StickyHeader, { mobile }),
      /* @__PURE__ */ jsx5(HeroBlock, { mobile }),
      /* @__PURE__ */ jsx5(ExamplesSection, { mobile }),
      /* @__PURE__ */ jsx5(CycleSection, { mobile }),
      /* @__PURE__ */ jsx5(MondaySection, { mobile }),
      /* @__PURE__ */ jsx5(BaseWorkSection, { mobile }),
      /* @__PURE__ */ jsx5(SourcesSection, { mobile }),
      /* @__PURE__ */ jsx5(AnalyticsSection, { mobile }),
      /* @__PURE__ */ jsx5(OwnershipSection, { mobile }),
      /* @__PURE__ */ jsx5(PricingSection, { mobile }),
      /* @__PURE__ */ jsx5(FaqSection, { mobile }),
      /* @__PURE__ */ jsx5(FinalCtaSection, { mobile }),
      /* @__PURE__ */ jsx5(Footer, { mobile }),
      /* @__PURE__ */ jsx5(FloatingFeedback, { mobile })
    ] })
  ] });
}
function SamosaytLandingV3_Desktop() {
  return /* @__PURE__ */ jsx5(SamosaytLandingV3, { mobile: false });
}
function SamosaytLandingV3_Mobile() {
  return /* @__PURE__ */ jsx5(SamosaytLandingV3, { mobile: true });
}
var SamosaytLanding = SamosaytLandingV3;
var Landing = SamosaytLandingV3;
var ConceptA_Desktop = SamosaytLandingV3_Desktop;
var ConceptA_Mobile = SamosaytLandingV3_Mobile;
var SamosaytLanding_Desktop = SamosaytLandingV3_Desktop;
var SamosaytLanding_Mobile = SamosaytLandingV3_Mobile;
var HeroSection = HeroBlock;

// src/intake/preview.tsx
import { Fragment as Fragment4, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs5("div", { "data-intake-step": intakeStep, style: { width: "100%", minHeight: "100%", background: VT.bg, fontFamily: VT.font.sans, position: "relative" }, children: [
      /* @__PURE__ */ jsx6("style", { children: PV_KEYFRAMES }),
      /* @__PURE__ */ jsxs5("div", { style: { padding: "18px 16px 28px", position: "relative" }, children: [
        /* @__PURE__ */ jsx6("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx6("style", { children: PV_KEYFRAMES }),
    /* @__PURE__ */ jsxs5("div", { "data-intake-step": intakeStep, style: {
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
    ] })
  ] });
}
function PvHeader({ activeDot, loading = false, title, sub, onBack }) {
  return /* @__PURE__ */ jsxs5(Fragment4, { children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      onBack && /* @__PURE__ */ jsxs5("button", { onClick: onBack, style: {
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
      /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        activeDot,
        "/4"
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx6("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < activeDot ? VT.accent : VT.line,
        animation: loading && i === activeDot - 1 ? "ssp-pulse 1.2s ease-in-out infinite" : "none"
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx6("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx6("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
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
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderTop: `1px solid ${VT.lineSoft}` }, children: [
    /* @__PURE__ */ jsxs5("span", { style: {
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
      state === "done" && /* @__PURE__ */ jsx6("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M5 12l4 4 10-10" }) }),
      state === "active" && /* @__PURE__ */ jsx6(Spinner, { size: 12 }),
      state === "pending" && /* @__PURE__ */ jsx6("span", { style: { width: 5, height: 5, borderRadius: "50%", background: VT.inkFaint } })
    ] }),
    /* @__PURE__ */ jsx6("span", { style: {
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
  const bar = (w, h = 10, solid = false) => /* @__PURE__ */ jsx6("span", { style: {
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
  return /* @__PURE__ */ jsx6(MiniChrome, { host, height, children: /* @__PURE__ */ jsxs5("div", { style: { flex: 1, display: "flex", flexDirection: "column", padding: 14, gap: 10, background: VT.white }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx6("span", { style: { width: 18, height: 18, borderRadius: 5, background: si >= 1 ? VT.accentSoft : VT.line, flex: "0 0 auto" } }),
      name && si >= 1 ? /* @__PURE__ */ jsx6("span", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em" }, children: name }) : bar("38%", 11)
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
      bar("82%", 16, !!name && si >= 3),
      bar("58%", 16)
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
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
    }, children: counts.photos > 0 && /* @__PURE__ */ jsxs5("span", { style: {
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
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [0, 1].map((i) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
      bar(i === 0 ? "44%" : "36%", 9),
      /* @__PURE__ */ jsx6("span", { style: { flex: 1 } }),
      bar("14%", 9)
    ] }, i)) }),
    /* @__PURE__ */ jsx6("div", { style: {
      borderRadius: 8,
      padding: "8px 10px",
      background: counts.reviews > 0 ? VT.successSoft : VT.bgSoft,
      animation: counts.reviews > 0 ? "none" : "ssp-shimmer 1.4s ease-in-out infinite",
      display: "flex",
      alignItems: "center",
      gap: 8,
      minHeight: 18
    }, children: counts.reviews > 0 && /* @__PURE__ */ jsxs5("span", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.06em", color: "oklch(0.32 0.12 145)", fontVariantNumeric: "tabular-nums" }, children: [
      counts.reviews,
      " ",
      pluralRu(counts.reviews, "\u041E\u0422\u0417\u042B\u0412", "\u041E\u0422\u0417\u042B\u0412\u0410", "\u041E\u0422\u0417\u042B\u0412\u041E\u0412").toUpperCase(),
      " \xB7 \u0418\u0417 \u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A\u0410"
    ] }) }),
    paletteDots && /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
      /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: "0.1em", color: VT.inkFaint }, children: "\u0421\u0422\u0418\u041B\u042C" }),
      paletteDots.map((col, i) => /* @__PURE__ */ jsx6("span", { style: { width: 14, height: 14, borderRadius: "50%", background: col, border: `1px solid ${VT.line}`, flex: "0 0 auto" } }, i))
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
  const stages = /* @__PURE__ */ jsx6("div", { style: { marginTop: 4 }, children: BUILD_STAGES.map((st, i) => /* @__PURE__ */ jsx6(
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
    const frame = /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx6("span", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx6(MiniChrome, { host: content.meta.host, height: mobile ? 400 : 500, children: /* @__PURE__ */ jsx6("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" }, children: /* @__PURE__ */ jsx6("div", { style: { height: mobile ? 740 : 920, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsx6(PresetRenderer, { preset, content }) }) }) })
    ] });
    return /* @__PURE__ */ jsxs5(PvShell, { width: 1040, mobile, intakeStep: "building", children: [
      /* @__PURE__ */ jsx6(
        PvHeader,
        {
          activeDot: 2,
          loading: true,
          title: "\u0417\u0430\u043C\u0435\u043D\u044F\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u0440 \u043D\u0430 \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435",
          sub: /* @__PURE__ */ jsxs5(Fragment4, { children: [
            "\u0411\u0435\u0440\u0451\u043C \u0444\u043E\u0442\u043E, \u043E\u0442\u0437\u044B\u0432\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u2014 ",
            SOURCE_NAMES[source],
            ". \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E 15\u201340 \u0441\u0435\u043A\u0443\u043D\u0434."
          ] }),
          onBack
        }
      ),
      mobile ? /* @__PURE__ */ jsxs5("div", { style: { marginTop: 16 }, children: [
        frame,
        /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 12 }, children: [
          /* @__PURE__ */ jsx6(Spinner, { size: 14 }),
          /* @__PURE__ */ jsx6("span", { style: { fontSize: 12.5, fontWeight: 600, fontVariantNumeric: "tabular-nums" }, children: BUILD_STAGES[si]?.label(counts) }),
          /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 10.5, letterSpacing: "0.08em", marginLeft: "auto" }, children: [
            si + 1,
            "/4"
          ] })
        ] })
      ] }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 22, marginTop: 18, alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsx6("div", { style: { flex: "1 1 62%", minWidth: 0 }, children: frame }),
        /* @__PURE__ */ jsxs5("div", { style: { flex: "1 1 38%", minWidth: 0, paddingTop: 2 }, children: [
          stages,
          /* @__PURE__ */ jsx6("div", { style: { marginTop: 14, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: "\u0427\u0438\u0441\u043B\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u2014 \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E \u043C\u0435\u0440\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u0430\u0440\u0441\u0435\u0440 \u0438\u0445 \u043D\u0430\u0445\u043E\u0434\u0438\u0442. \u0424\u043E\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u0440\u0430 \u0437\u0430\u043C\u0435\u043D\u044F\u044E\u0442\u0441\u044F \u0432\u0430\u0448\u0438\u043C\u0438 \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443, \u0441\u043B\u0435\u0432\u0430 \u043D\u0430\u043F\u0440\u0430\u0432\u043E." })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs5(PvShell, { width: 680, mobile, intakeStep: "building", children: [
    /* @__PURE__ */ jsx6(
      PvHeader,
      {
        activeDot: 2,
        loading: true,
        title: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
        sub: /* @__PURE__ */ jsxs5(Fragment4, { children: [
          "\u0411\u0435\u0440\u0451\u043C \u0444\u043E\u0442\u043E, \u043E\u0442\u0437\u044B\u0432\u044B \u0438 \u0443\u0441\u043B\u0443\u0433\u0438 \u0438\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u2014 ",
          SOURCE_NAMES[source],
          ". \u041E\u0431\u044B\u0447\u043D\u043E \u044D\u0442\u043E 15\u201340 \u0441\u0435\u043A\u0443\u043D\u0434."
        ] })
      }
    ),
    timedOut ? /* @__PURE__ */ jsxs5(Fragment4, { children: [
      /* @__PURE__ */ jsxs5("div", { style: {
        marginTop: 18,
        padding: "14px 16px",
        background: VT.infoSoft,
        borderRadius: VT.r.md,
        fontSize: 14,
        lineHeight: 1.5,
        color: "oklch(0.36 0.10 240)"
      }, children: [
        /* @__PURE__ */ jsx6("b", { children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E." }),
        " \u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0438 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A, \u043E\u0431\u044B\u0447\u043D\u043E \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 2 \u0447\u0430\u0441\u043E\u0432."
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: mobile ? "column" : "row", gap: 14, marginTop: 18, alignItems: "stretch" }, children: [
        /* @__PURE__ */ jsx6("div", { style: { flex: 1, minWidth: 0 }, children: stages }),
        /* @__PURE__ */ jsx6("div", { style: { flex: mobile ? "none" : "0 0 280px" }, children: /* @__PURE__ */ jsx6(SkeletonPreview, { stage, counts, draftSkeleton, height: mobile ? 280 : 300 }) })
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx6(Btn, { style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx6(IconArrow, {}), onClick: onSkipToContact, children: "\u041E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442" }) })
    ] }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: mobile ? "column" : "row", gap: 18, marginTop: 18, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }, children: [
        stages,
        /* @__PURE__ */ jsx6("div", { style: { marginTop: "auto", paddingTop: 14, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: "\u0427\u0438\u0441\u043B\u0430 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u2014 \u0441\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E \u043C\u0435\u0440\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u0430\u0440\u0441\u0435\u0440 \u0438\u0445 \u043D\u0430\u0445\u043E\u0434\u0438\u0442." })
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { flex: mobile ? "none" : "0 0 300px" }, children: /* @__PURE__ */ jsx6(SkeletonPreview, { stage, counts, draftSkeleton, height: mobile ? 320 : 380 }) })
    ] })
  ] });
}
function FoundRow({ label, value, dim = false }) {
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", gap: 10, padding: "6px 0", borderTop: `1px solid ${VT.lineSoft}` }, children: [
    /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.1em", color: VT.inkFaint, flex: "0 0 76px" }, children: label }),
    /* @__PURE__ */ jsx6("span", { style: {
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
  return /* @__PURE__ */ jsxs5("button", { onClick: onSelect, style: {
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
    /* @__PURE__ */ jsx6("span", { style: {
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
    const demoFrame = /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx6("span", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx6(MiniChrome, { host: content.meta.host, height: frameH, children: /* @__PURE__ */ jsx6("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" }, children: /* @__PURE__ */ jsx6("div", { style: { height: innerH, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsx6(PresetRenderer, { preset, content }) }) }) })
    ] });
    const demoPanel = /* @__PURE__ */ jsxs5(Fragment4, { children: [
      /* @__PURE__ */ jsxs5("p", { style: { fontSize: 15, lineHeight: 1.5, margin: 0 }, children: [
        "\u0422\u0430\u043A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0441\u0430\u0439\u0442 \u0434\u043B\u044F \u043D\u0438\u0448\u0438 \xAB",
        label,
        "\xBB. \u0414\u0430\u043B\u044C\u0448\u0435 \u0432\u0430\u0448\u0438 \u0444\u043E\u0442\u043E, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0437\u044B\u0432\u044B"
      ] }),
      themeOptions.length > 1 && /* @__PURE__ */ jsxs5("div", { style: { marginTop: 16 }, children: [
        /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 8 }, children: "\u0421\u0422\u0418\u041B\u042C" }),
        /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: themeOptions.slice(0, 3).map((id) => /* @__PURE__ */ jsx6(
          ThemeSwatch,
          {
            themeId: id,
            active: (activeTheme || draft.theme_id) === id,
            onSelect: () => onThemeChange?.(id)
          },
          id
        )) })
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx6(Btn, { "data-cta": "claim-demo", style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx6(IconArrow, {}), onClick: onClaim, children: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430 \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435" }) }),
      /* @__PURE__ */ jsx6("div", { style: { marginTop: 8, fontSize: 12.5, color: VT.inkFaint, textAlign: "center" }, children: "\u041C\u0435\u043D\u044C\u0448\u0435 \u043C\u0438\u043D\u0443\u0442\u044B. \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B" }),
      /* @__PURE__ */ jsx6("button", { onClick: onBack, style: {
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
    return /* @__PURE__ */ jsx6(PvShell, { width: 1040, mobile, intakeStep: "demo", children: mobile ? /* @__PURE__ */ jsxs5("div", { style: { marginTop: 4 }, children: [
      demoFrame,
      /* @__PURE__ */ jsx6("div", { style: { marginTop: 14 }, children: demoPanel })
    ] }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 22, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx6("div", { style: { flex: "1 1 62%", minWidth: 0 }, children: demoFrame }),
      /* @__PURE__ */ jsx6("div", { style: { flex: "1 1 38%", minWidth: 0, paddingTop: 8 }, children: demoPanel })
    ] }) });
  }
  const frame = /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx6(MiniChrome, { host: content.meta.host, height: frameH, children: /* @__PURE__ */ jsx6("div", { style: { flex: 1, minHeight: 0, overflowY: "auto" }, children: /* @__PURE__ */ jsx6("div", { style: { height: innerH, display: "flex", flexDirection: "column" }, children: /* @__PURE__ */ jsx6(PresetRenderer, { preset, content }) }) }) }),
    /* @__PURE__ */ jsx6("span", { "aria-hidden": "true", style: {
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
    v === "sparse" && /* @__PURE__ */ jsxs5("div", { style: {
      marginTop: 8,
      fontSize: 12.5,
      color: VT.inkSoft,
      lineHeight: 1.45,
      display: "flex",
      alignItems: "center",
      gap: 7
    }, children: [
      /* @__PURE__ */ jsx6("span", { style: { width: 14, height: 14, borderRadius: 3, flex: "0 0 auto", background: `repeating-linear-gradient(45deg, ${VT.accentSoft} 0 4px, ${VT.bgSoft} 4px 8px)`, border: `1px solid ${VT.line}` } }),
      "\u0424\u043E\u0442\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u043C \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435"
    ] })
  ] });
  const found = /* @__PURE__ */ jsxs5("div", { children: [
    /* @__PURE__ */ jsxs5(Mono, { style: { fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 6 }, children: [
      "\u0427\u0422\u041E \u041C\u042B \u041D\u0410\u0428\u041B\u0418 \xB7 ",
      SOURCE_NAMES[draft.source].toUpperCase()
    ] }),
    /* @__PURE__ */ jsx6(FoundRow, { label: "\u0424\u041E\u0422\u041E", value: draft.photos.length > 0 ? draft.photos.length : "\u2014 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435", dim: draft.photos.length === 0 }),
    /* @__PURE__ */ jsx6(FoundRow, { label: "\u041E\u0422\u0417\u042B\u0412\u042B", value: draft.rating && draft.rating.count > 0 ? draft.rating.count : draft.reviews.length > 0 ? draft.reviews.length : "\u2014 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435", dim: !(draft.rating && draft.rating.count > 0) && draft.reviews.length === 0 }),
    /* @__PURE__ */ jsx6(FoundRow, { label: "\u0423\u0421\u041B\u0423\u0413\u0418", value: draft.services.length > 0 ? draft.services.length : "\u2014 \u043F\u0440\u0438 \u043F\u043E\u043B\u043D\u043E\u0439 \u0441\u0431\u043E\u0440\u043A\u0435", dim: draft.services.length === 0 }),
    draft.district && /* @__PURE__ */ jsx6(FoundRow, { label: "\u0420\u0410\u0419\u041E\u041D", value: draft.district.replace(/\s*район\s*/i, "") }),
    draft.rating && /* @__PURE__ */ jsx6(FoundRow, { label: "\u0420\u0415\u0419\u0422\u0418\u041D\u0413", value: `\u2605 ${draft.rating.value}` })
  ] });
  const controls = /* @__PURE__ */ jsxs5(Fragment4, { children: [
    themeOptions.length > 1 && /* @__PURE__ */ jsxs5("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 11, letterSpacing: "0.12em", display: "block", marginBottom: 8 }, children: "\u0421\u0422\u0418\u041B\u042C" }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexWrap: "wrap", gap: 6 }, children: themeOptions.slice(0, 3).map((id) => /* @__PURE__ */ jsx6(
        ThemeSwatch,
        {
          themeId: id,
          active: (activeTheme || draft.theme_id) === id,
          onSelect: () => onThemeChange?.(id)
        },
        id
      )) })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { marginTop: 18, fontSize: 13.5, color: VT.inkSoft, lineHeight: 1.5 }, children: "\u042D\u0442\u043E \u044D\u0441\u043A\u0438\u0437. \u041F\u043E\u043B\u043D\u0443\u044E \u0432\u0435\u0440\u0441\u0438\u044E \u2014 \u0441 \u0442\u0435\u043A\u0441\u0442\u0430\u043C\u0438 \u0438 \u0432\u0441\u0435\u043C\u0438 \u0444\u043E\u0442\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0437\u0430 2 \u0447\u0430\u0441\u0430." }),
    /* @__PURE__ */ jsx6("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx6(Btn, { "data-cta": "claim-draft", style: { width: "100%" }, iconRight: /* @__PURE__ */ jsx6(IconArrow, {}), onClick: onClaim, children: "\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" }) }),
    /* @__PURE__ */ jsx6("button", { onClick: onBack, style: {
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
  return /* @__PURE__ */ jsxs5(PvShell, { width: 920, mobile, intakeStep: "preview", children: [
    /* @__PURE__ */ jsx6(
      PvHeader,
      {
        activeDot: 2,
        title: "\u0412\u043E\u0442 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430",
        sub: v === "sparse" ? /* @__PURE__ */ jsxs5(Fragment4, { children: [
          "\u0421\u043E\u0431\u0440\u0430\u043B\u0438 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u043D\u0430\u0448\u043B\u0438. \u0421\u0442\u0438\u043B\u044C ",
          BRAND.name,
          " \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \xAB",
          draft.category || "\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
          "\xBB."
        ] }) : /* @__PURE__ */ jsxs5(Fragment4, { children: [
          "\u0421\u043E\u0431\u0440\u0430\u043D \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E \u0438 \u043E\u0442\u0437\u044B\u0432\u043E\u0432. \u0421\u0442\u0438\u043B\u044C ",
          BRAND.name,
          " \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u043B \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \xAB",
          draft.category || "\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
          "\xBB."
        ] })
      }
    ),
    mobile ? /* @__PURE__ */ jsxs5("div", { style: { marginTop: 16 }, children: [
      frame,
      /* @__PURE__ */ jsx6("div", { style: { marginTop: 16 }, children: found }),
      controls
    ] }) : /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 22, marginTop: 18, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx6("div", { style: { flex: "1 1 58%", minWidth: 0 }, children: frame }),
      /* @__PURE__ */ jsxs5("div", { style: { flex: "1 1 42%", minWidth: 0, paddingTop: 2 }, children: [
        found,
        controls
      ] })
    ] })
  ] });
}

// src/intake/rev2.tsx
import { Fragment as Fragment5, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsxs6("div", { style: { width: "100%", minHeight: "100%", background: VT.bg, fontFamily: VT.font.sans, position: "relative" }, children: [
      /* @__PURE__ */ jsx7("style", { children: R2_KEYFRAMES }),
      /* @__PURE__ */ jsxs6("div", { style: { padding: "18px 16px 28px", position: "relative" }, children: [
        /* @__PURE__ */ jsx7("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx7("style", { children: R2_KEYFRAMES }),
    /* @__PURE__ */ jsxs6("div", { style: {
      width,
      maxWidth: "100%",
      background: VT.bg,
      borderRadius: VT.r.xl,
      boxShadow: VT.shadow.pop,
      padding: 28,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsx7("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs6(Fragment5, { children: [
    (onBack || activeDot) && /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      onBack && /* @__PURE__ */ jsxs6("button", { onClick: onBack, style: {
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
        /* @__PURE__ */ jsx7("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx7("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      activeDot != null && /* @__PURE__ */ jsxs6(Fragment5, { children: [
        /* @__PURE__ */ jsxs6(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
          "\u0428\u0410\u0413 ",
          activeDot,
          "/4"
        ] }),
        /* @__PURE__ */ jsx7("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ jsx7("span", { style: { width: 28, height: 4, borderRadius: 2, background: i < activeDot ? VT.accent : VT.line } }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx7("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx7("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
function R2Label({ children }) {
  return /* @__PURE__ */ jsx7("label", { style: { display: "block", fontSize: 13, fontWeight: 600, color: VT.ink, marginBottom: 6, fontFamily: VT.font.sans }, children });
}
function R2Input({ value, placeholder, onChange }) {
  return /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsx7("button", { onClick, style: {
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
  return /* @__PURE__ */ jsx7(R2Shell, { width: 640, mobile, children: /* @__PURE__ */ jsxs6("div", { "data-intake-step": "niche", children: [
    /* @__PURE__ */ jsx7("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance", paddingRight: 36 }, children: "\u0427\u0435\u043C \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442\u0435\u0441\u044C?" }),
    /* @__PURE__ */ jsx7("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C, \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442 \u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442. \u0411\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u0438 \u0431\u0435\u0437 \u0432\u0430\u0448\u0438\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }),
    /* @__PURE__ */ jsx7("div", { style: { display: "grid", gap: 8, marginTop: 18, gridTemplateColumns: mobile ? "1fr 1fr" : "repeat(5, 1fr)" }, children: niches.map((n) => /* @__PURE__ */ jsx7("button", { "data-niche-id": n.id, onClick: () => onPick?.(n.id), style: {
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
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 8, marginTop: 14, flexDirection: mobile ? "column" : "row" }, children: [
      /* @__PURE__ */ jsx7(
        "div",
        {
          style: { flex: 1, minWidth: 0 },
          onKeyDown: (e) => {
            if (e.key === "Enter" && freeText) onShowExample?.(freeText);
          },
          children: /* @__PURE__ */ jsx7(R2Input, { value: freeText, placeholder: "\u0414\u0440\u0443\u0433\u043E\u0435: \u043A\u043E\u043D\u0434\u0438\u0442\u0435\u0440, \u0440\u0435\u043F\u0435\u0442\u0438\u0442\u043E\u0440, \u043A\u043B\u0438\u043D\u0438\u043D\u0433\u2026", onChange: onFreeTextChange })
        }
      ),
      /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsxs6("button", { "data-candidate-idx": idx, onClick: onPick, style: {
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
    cand.photo ? /* @__PURE__ */ jsx7("img", { src: cand.photo, alt: "", style: { width: 44, height: 44, borderRadius: VT.r.sm, objectFit: "cover", flex: "0 0 auto" } }) : /* @__PURE__ */ jsx7("span", { style: {
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
    /* @__PURE__ */ jsxs6("span", { style: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }, children: [
      /* @__PURE__ */ jsx7("span", { style: { fontSize: 14.5, fontWeight: 600, color: VT.ink, lineHeight: 1.3 }, children: cand.name }),
      /* @__PURE__ */ jsx7("span", { style: { fontSize: 12.5, color: VT.inkSoft, lineHeight: 1.35 }, children: cand.address }),
      line && /* @__PURE__ */ jsx7("span", { style: { fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint, fontVariantNumeric: "tabular-nums", marginTop: 1 }, children: line })
    ] }),
    /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint, fontSize: 16, flex: "0 0 auto" }, children: "\u2192" })
  ] });
}
function SkeletonCandidate() {
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: VT.white,
    border: `1px solid ${VT.lineSoft}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx7("span", { style: { width: 44, height: 44, borderRadius: VT.r.sm, background: VT.bgSoft, animation: "ssr-shimmer 1.4s ease-in-out infinite", flex: "0 0 auto" } }),
    /* @__PURE__ */ jsxs6("span", { style: { flex: 1, display: "flex", flexDirection: "column", gap: 7 }, children: [
      /* @__PURE__ */ jsx7("span", { style: { display: "block", width: "52%", height: 11, borderRadius: 3, background: VT.line, animation: "ssr-shimmer 1.4s ease-in-out infinite" } }),
      /* @__PURE__ */ jsx7("span", { style: { display: "block", width: "74%", height: 9, borderRadius: 3, background: VT.lineSoft, animation: "ssr-shimmer 1.4s ease-in-out infinite" } })
    ] })
  ] });
}
function SearchStateNote({ tone, title, body, primary, onPrimary, ghost, onGhost, link, onLink }) {
  const bg = tone === "warn" ? VT.warnSoft : VT.infoSoft;
  const fg = tone === "warn" ? "oklch(0.42 0.13 70)" : "oklch(0.36 0.10 240)";
  return /* @__PURE__ */ jsxs6("div", { style: { marginTop: 14, padding: "16px 16px 18px", background: bg, borderRadius: VT.r.md }, children: [
    /* @__PURE__ */ jsx7("div", { style: { fontSize: 15, fontWeight: 700, color: fg, marginBottom: 4 }, children: title }),
    /* @__PURE__ */ jsx7("div", { style: { fontSize: 13.5, lineHeight: 1.5, color: fg }, children: body }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }, children: [
      primary && /* @__PURE__ */ jsx7(Btn, { size: "sm", onClick: onPrimary, children: primary }),
      ghost && /* @__PURE__ */ jsx7(Btn, { size: "sm", variant: "secondary", onClick: onGhost, children: ghost })
    ] }),
    link && /* @__PURE__ */ jsx7("button", { onClick: onLink, style: {
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
  const searchBody = /* @__PURE__ */ jsxs6(Fragment5, { children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 8, marginTop: 18, flexDirection: mobile ? "column" : "row" }, children: [
      /* @__PURE__ */ jsxs6("div", { style: { flex: mobile ? "none" : "1 1 70%", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx7(R2Label, { children: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u043B\u0430" }),
        /* @__PURE__ */ jsx7(R2Input, { value: query, placeholder: "\u0421\u0442\u0443\u0434\u0438\u044F \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430 \u0410\u043D\u043D\u044B", onChange: onQueryChange })
      ] }),
      /* @__PURE__ */ jsxs6("div", { style: { flex: mobile ? "none" : "1 1 30%", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx7(R2Label, { children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx7(R2Input, { value: city, placeholder: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", onChange: onCityChange })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 14 }, children: [
      /* @__PURE__ */ jsx7(
        Btn,
        {
          style: { width: "100%", opacity: canSearch ? 1 : 0.55 },
          onClick: canSearch ? onSearch : void 0,
          iconRight: searching ? /* @__PURE__ */ jsx7(Spinner, { size: 15 }) : /* @__PURE__ */ jsx7(IconArrow, {}),
          children: "\u041D\u0430\u0439\u0442\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445"
        }
      ),
      searchError === "ratelimited" ? /* @__PURE__ */ jsxs6("div", { style: { marginTop: 8, fontSize: 12.5, color: VT.inkSoft, textAlign: "center", fontVariantNumeric: "tabular-nums" }, children: [
        "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432. \u041F\u043E\u0438\u0441\u043A \u0441\u043D\u043E\u0432\u0430 \u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D \u0447\u0435\u0440\u0435\u0437 0:",
        String(retryAfterSeconds).padStart(2, "0")
      ] }) : /* @__PURE__ */ jsx7("div", { style: { marginTop: 8, fontSize: 12.5, color: VT.inkFaint, textAlign: "center" }, children: "\u0418\u0449\u0435\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C \u0434\u0430\u043D\u043D\u044B\u043C \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442" })
    ] }),
    searching && /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }, children: [
      /* @__PURE__ */ jsx7(SkeletonCandidate, {}),
      /* @__PURE__ */ jsx7(SkeletonCandidate, {})
    ] }),
    !searching && candidates && candidates.length > 0 && /* @__PURE__ */ jsxs6("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx7("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, marginBottom: 8 }, children: "\u042D\u0442\u043E \u0432\u044B?" }),
      /* @__PURE__ */ jsx7("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: candidates.slice(0, 3).map((c, i) => /* @__PURE__ */ jsx7(CandidateCard, { cand: c, idx: i, onPick: () => onPickCandidate?.(c.id) }, c.id)) }),
      /* @__PURE__ */ jsx7(R2TextLink, { onClick: onNotMine, children: "\u0417\u0434\u0435\u0441\u044C \u043D\u0435\u0442 \u043C\u043E\u0435\u0433\u043E \u0434\u0435\u043B\u0430" })
    ] }),
    !searching && searchError === "empty" && /* @__PURE__ */ jsx7(
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
    !searching && searchError === "network" && /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx7(R2TextLink, { block: true, onClick: () => onSwitchMode?.("link"), children: "\u0415\u0441\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 Telegram, \u042F.\u041A\u0430\u0440\u0442\u044B \u0438\u043B\u0438 \u0441\u0430\u0439\u0442? \u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0435\u0451 \u2192" }),
      /* @__PURE__ */ jsx7(R2TextLink, { block: true, onClick: onPhotoBranch, children: "\u041D\u0435\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B \u0432 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442\u0435? \u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u0444\u043E\u0442\u043E \u2192" })
    ] })
  ] });
  const linkBody = /* @__PURE__ */ jsxs6(Fragment5, { children: [
    /* @__PURE__ */ jsxs6("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx7(R2Label, { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }),
      /* @__PURE__ */ jsx7(R2Input, { value: url, placeholder: "https://yandex.ru/maps/\u2026", onChange: onUrlChange })
    ] }),
    source && LINK_SOURCE_LABELS[source] && /* @__PURE__ */ jsxs6("div", { style: {
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
      /* @__PURE__ */ jsx7("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx7("path", { d: "M5 12l4 4 10-10" }) }),
      /* @__PURE__ */ jsxs6("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx7("b", { children: LINK_SOURCE_LABELS[source] }),
        counts ? /* @__PURE__ */ jsxs6("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] })
    ] }),
    /* @__PURE__ */ jsx7("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx7(Btn, { style: { width: "100%", opacity: url ? 1 : 0.55 }, iconRight: /* @__PURE__ */ jsx7(IconArrow, {}), onClick: url ? onBuild : void 0, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }) }),
    /* @__PURE__ */ jsx7("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx7(R2TextLink, { block: true, onClick: () => onSwitchMode?.("search"), children: "\u041D\u0430\u0439\u0442\u0438 \u043F\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044E \u2192" }) })
  ] });
  return /* @__PURE__ */ jsx7(R2Shell, { width: 560, mobile, children: /* @__PURE__ */ jsxs6("div", { "data-intake-step": "source", children: [
    mode === "search" ? /* @__PURE__ */ jsx7(
      R2Header,
      {
        activeDot: 1,
        onBack,
        title: "\u041D\u0430\u0439\u0434\u0451\u043C \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
        sub: `${BRAND.name} \u0432\u043E\u0437\u044C\u043C\u0451\u0442 \u0444\u043E\u0442\u043E, \u0446\u0435\u043D\u044B \u0438 \u043E\u0442\u0437\u044B\u0432\u044B \u043E\u0442\u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u043E\u043D\u0438 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C`
      }
    ) : /* @__PURE__ */ jsx7(
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
import React4, { useState as useState2, useEffect as useEffect2, useRef as useRef2 } from "react";
import { jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
var In2_CSS = ".in2{--bone:#F2EEE6;--paper:#FBF9F4;--ink:#1B1712;--ink-70:#4C463C;--ink-45:#6E675A;--line:#E5DFD3;--line-2:#D6CEBE;--accent:#7A2B34;--accent-dk:#631F27;--on-accent:#FBF9F4;--display:'Sofia Sans Condensed',system-ui,sans-serif;--text:'Onest',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;}.in2 *{box-sizing:border-box;border-radius:0;box-shadow:none;}.in2 button{font-family:inherit;}.in2 .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:52px;padding:0 24px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;border:none;cursor:pointer;transition:background .16s;}.in2 .btn:hover:not(:disabled){background:var(--accent-dk);}.in2 .btn .arw{display:inline-block;transition:transform .16s;}.in2 .btn:hover:not(:disabled) .arw{transform:translateX(4px);}.in2 .btn--block{display:flex;width:100%;}.in2 .btn--sec{background:transparent;color:var(--ink);border:1px solid var(--line-2);}.in2 .btn--sec:hover:not(:disabled){background:var(--ink);color:var(--paper);border-color:var(--ink);}.in2 .chip{display:inline-flex;align-items:center;height:38px;padding:0 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:600;line-height:1;cursor:pointer;transition:background .14s,border-color .14s;}.in2 .chip:hover{border-color:var(--ink-45);}.in2 .chip.is-active{background:var(--accent);border-color:var(--accent);color:var(--paper);font-weight:700;}.in2 .chip--other{border-style:dashed;}.in2 .tlink{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);background:none;border:none;cursor:pointer;text-decoration:none;font:inherit;line-height:inherit;}.in2 .tlink .u{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;}.in2 .tlink .arw{display:inline-block;transition:transform .16s;}.in2 .tlink:hover .arw{transform:translateX(3px);}.in2 .ss-iconbtn{width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;color:var(--ink);background:none;border:none;cursor:pointer;transition:background .14s;}.in2 .ss-iconbtn:hover{background:var(--bone);}@keyframes in2Skel{from{background-position:200% 0}to{background-position:-200% 0}}@keyframes in2Spin{to{transform:rotate(360deg)}}.in2 .ss-skel{background:linear-gradient(90deg,var(--bone) 25%,#FAF7F0 50%,var(--bone) 75%);background-size:200% 100%;animation:in2Skel 1.3s linear infinite;}.in2 .ss-spin{animation:in2Spin .8s linear infinite;}.in2 .ss-demo-scroll::-webkit-scrollbar{width:8px;}.in2 .ss-demo-scroll::-webkit-scrollbar-thumb{background:rgba(27,23,18,.22);}";
function In2_Styles() {
  return React4.createElement("style", { "data-samosite-canon-in2": "0.12", dangerouslySetInnerHTML: { __html: In2_CSS } });
}
function Icon({ d, size = 22, sw = 1.8, fill }) {
  return /* @__PURE__ */ jsx8("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: fill || "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", children: d.map((p, i) => /* @__PURE__ */ jsx8("path", { d: p }, i)) });
}
var S = {
  label: { fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-45)" },
  input: { width: "100%", padding: "13px 14px", border: "1px solid var(--line-2)", background: "#fff", font: "inherit", fontSize: 16, color: "var(--ink)", outline: "none" },
  field: { display: "flex", flexDirection: "column", gap: 7 },
  hint: { fontSize: 15.5, lineHeight: 1.5, color: "var(--ink-70)" }
};
function Field({ label, children }) {
  return /* @__PURE__ */ jsxs7("label", { style: S.field, children: [
    /* @__PURE__ */ jsx8("span", { style: S.label, children: label }),
    children
  ] });
}
function Chip({ active, children, onClick, dashed, ...rest }) {
  return /* @__PURE__ */ jsx8("button", { type: "button", onClick, role: "radio", "aria-checked": !!active, ...rest, className: "chip" + (active ? " is-active" : "") + (dashed ? " chip--other" : ""), style: { fontSize: 14.5 }, children });
}
function Cta({ ok, onClick, missing, children, ...rest }) {
  return /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
    /* @__PURE__ */ jsxs7("button", { className: "btn btn--block", type: "button", onClick, disabled: !ok, ...rest, style: { opacity: ok ? 1 : 0.5, cursor: ok ? "pointer" : "not-allowed" }, children: [
      children,
      " ",
      /* @__PURE__ */ jsx8("span", { className: "arw", children: "\u2192" })
    ] }),
    !ok && missing ? /* @__PURE__ */ jsxs7("span", { style: { textAlign: "center", fontSize: 13, color: "var(--ink-45)" }, children: [
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
  const [h, setH] = useState2(false);
  return /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsx8("span", { style: { flex: "0 0 auto", width: 36, height: 36, display: "inline-flex", alignItems: "center", justifyContent: "center", background: active ? "var(--accent)" : "var(--bone)", border: "1px solid " + (active ? "var(--accent)" : "var(--line)"), color: active ? "var(--paper)" : "var(--accent)" }, children: /* @__PURE__ */ jsx8(Icon, { d: icon, size: 17 }) }),
        /* @__PURE__ */ jsxs7("span", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx8("span", { style: { display: "block", fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }, children: label }),
          sub ? /* @__PURE__ */ jsx8("span", { style: { display: "block", fontSize: 12.5, color: "var(--ink-45)", marginTop: 1 }, children: sub }) : null
        ] }),
        active ? /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)", flex: "none" }, children: "\u0432\u044B\u0431\u0440\u0430\u043D" }) : /* @__PURE__ */ jsx8("span", { style: { color: "var(--ink-45)", flex: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["m9 18 6-6-6-6"], size: 16, sw: 2 }) })
      ]
    }
  );
}
function CityInput({ value, onChange, forceOpen }) {
  const [open, setOpen] = useState2(!!forceOpen);
  const [active, setActive] = useState2(-1);
  const wrapRef = useRef2(null);
  const q = (value || "").trim().toLowerCase();
  const matches = q ? CITIES.filter((c) => c.toLowerCase().includes(q)).slice(0, 6) : CITIES.slice(0, 6);
  const exact = CITIES.some((c) => c.toLowerCase() === q);
  const none = !!q && matches.length === 0;
  const show = open && (matches.length > 0 || none) && !(exact && matches.length === 1);
  useEffect2(() => {
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
  return /* @__PURE__ */ jsxs7("div", { ref: wrapRef, children: [
    /* @__PURE__ */ jsxs7("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z", "M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z"], size: 17 }) }),
      /* @__PURE__ */ jsx8("input", { style: { ...S.input, paddingLeft: 36 }, value, placeholder: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u0433\u043E\u0440\u043E\u0434", onFocus: () => setOpen(true), onChange: (e) => {
        onChange(e.target.value);
        setOpen(true);
        setActive(-1);
      }, onKeyDown: onKey, autoComplete: "off", role: "combobox", "aria-expanded": show, "aria-autocomplete": "list" })
    ] }),
    show && /* @__PURE__ */ jsxs7("ul", { style: { listStyle: "none", margin: "6px 0 0", padding: 4, background: "#fff", border: "1px solid var(--line-2)", maxHeight: 232, overflowY: "auto" }, children: [
      none && /* @__PURE__ */ jsx8("li", { children: /* @__PURE__ */ jsxs7("button", { type: "button", onMouseDown: (e) => {
        e.preventDefault();
        pick(value.trim());
      }, style: { width: "100%", textAlign: "left", padding: "10px 12px", border: "none", background: "var(--bone)", color: "var(--ink)", font: "inherit", fontSize: 15, cursor: "pointer" }, children: [
        "\u041E\u0441\u0442\u0430\u0432\u0438\u043C \u043A\u0430\u043A \u0435\u0441\u0442\u044C: \xAB",
        value.trim(),
        "\xBB"
      ] }) }),
      matches.map((c, i) => /* @__PURE__ */ jsx8("li", { children: /* @__PURE__ */ jsx8("button", { type: "button", onMouseDown: (e) => {
        e.preventDefault();
        pick(c);
      }, onMouseEnter: () => setActive(i), style: { width: "100%", textAlign: "left", padding: "10px 12px", border: "none", background: i === active ? "var(--bone)" : "transparent", color: "var(--ink)", font: "inherit", fontSize: 15, cursor: "pointer" }, children: c }) }, c))
    ] })
  ] });
}
function LinkInput({ value, onChange }) {
  const [touched, setTouched] = useState2(false);
  const info = linkInfo(value);
  const showState = (touched || (value || "").trim().length > 3) && info.state !== "empty";
  const tone = info.state === "invalid" ? "#B23B3B" : info.state === "ok" ? "#2F7A68" : "var(--ink-70)";
  const border = !showState ? "var(--line-2)" : info.state === "invalid" ? "#D98A8A" : info.state === "ok" ? "#8FC3B4" : "var(--line-2)";
  return /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
    /* @__PURE__ */ jsxs7("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1", "M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1"], size: 17 }) }),
      /* @__PURE__ */ jsx8("input", { style: { ...S.input, paddingLeft: 36, borderColor: border }, value, placeholder: "\u042F.\u041A\u0430\u0440\u0442\u044B, 2\u0413\u0418\u0421, Telegram, Avito\u2026", onChange: (e) => onChange(e.target.value), onBlur: () => setTouched(true), inputMode: "url", autoComplete: "off" })
    ] }),
    showState && /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: tone }, children: [
      /* @__PURE__ */ jsx8(Icon, { d: info.state === "invalid" ? ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"] : info.state === "ok" ? ["M20 6 9 17l-5-5"] : ["M12 8v4", "M12 16h.01", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"], size: 15, sw: 2 }),
      info.msg
    ] })
  ] });
}
function ContactInput({ channel, value, onChange, initialTouched }) {
  const [touched, setTouched] = useState2(!!initialTouched);
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
  return /* @__PURE__ */ jsxs7(Field, { label, children: [
    /* @__PURE__ */ jsxs7("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: iconD, size: 17 }) }),
      /* @__PURE__ */ jsx8("input", { style: { ...S.input, paddingLeft: 36, borderColor: border }, value, placeholder: ph, inputMode: phone ? "tel" : channel === "Email" ? "email" : "text", autoComplete: "off", onChange: handle, onBlur: () => setTouched(true) })
    ] }),
    showErr && /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx8(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 15, sw: 2 }),
      " ",
      contactError(channel)
    ] })
  ] });
}
function BookingLink({ value, onChange }) {
  const [touched, setTouched] = useState2(false);
  const info = bookingUrlInfo(value);
  const show = (touched || (value || "").trim().length > 3) && info.state !== "empty";
  const tone = info.state === "invalid" ? "#B23B3B" : info.state === "ok" ? "#2F7A68" : "var(--ink-70)";
  const border = !show ? "var(--line-2)" : info.state === "invalid" ? "#D98A8A" : info.state === "ok" ? "#8FC3B4" : "var(--line-2)";
  return /* @__PURE__ */ jsxs7(Field, { label: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043E\u043D\u043B\u0430\u0439\u043D-\u0437\u0430\u043F\u0438\u0441\u044C (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", children: [
    /* @__PURE__ */ jsxs7("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1", "M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1"], size: 17 }) }),
      /* @__PURE__ */ jsx8("input", { style: { ...S.input, paddingLeft: 36, borderColor: border }, value, placeholder: "https://dikidi.net/\u2026", onChange: (e) => onChange(e.target.value), onBlur: () => setTouched(true), inputMode: "url", autoComplete: "off" })
    ] }),
    show && /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: tone }, children: [
      /* @__PURE__ */ jsx8(Icon, { d: info.state === "invalid" ? ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"] : info.state === "ok" ? ["M20 6 9 17l-5-5"] : ["M12 8v4", "M12 16h.01", "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z"], size: 15, sw: 2 }),
      info.msg
    ] })
  ] });
}
function BookingPhone({ value, onChange }) {
  const [touched, setTouched] = useState2(false);
  const bad = touched && (value || "").trim() !== "" && (value || "").replace(/\D/g, "").length !== 11;
  return /* @__PURE__ */ jsxs7(Field, { label: "\u041D\u043E\u043C\u0435\u0440 \u0434\u043B\u044F \u0437\u0430\u043F\u0438\u0441\u0438 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", children: [
    /* @__PURE__ */ jsxs7("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2z"], size: 17 }) }),
      /* @__PURE__ */ jsx8("input", { style: { ...S.input, paddingLeft: 36, borderColor: bad ? "#D98A8A" : "var(--line-2)" }, value, placeholder: "+7 (___) ___-__-__", onChange: (e) => onChange(formatPhone(e.target.value)), onBlur: () => setTouched(true), inputMode: "tel", autoComplete: "off" })
    ] }),
    /* @__PURE__ */ jsx8("span", { style: { fontSize: 13.5, color: bad ? "#B23B3B" : "var(--ink-45)" }, children: bad ? "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E: +7 \u0438 10 \u0446\u0438\u0444\u0440" : "\u041A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u043E\u0442\u043A\u0440\u043E\u0435\u0442 \u0437\u0432\u043E\u043D\u043E\u043A \u0438\u043B\u0438 WhatsApp \u043D\u0430 \u044D\u0442\u043E\u0442 \u043D\u043E\u043C\u0435\u0440. \u041F\u0443\u0441\u0442\u043E \u2014 \u0432\u043E\u0437\u044C\u043C\u0451\u043C \u0438\u0437 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438." })
  ] });
}
function Uploader({ label, sub, multiple, accept, icon, onFiles, initial, max }) {
  max = max || 5;
  const fmtMB = (b) => (b / 1048576).toFixed(1).replace(".", ",") + " \u041C\u0411";
  const ref = useRef2(null);
  const [files, setFiles] = useState2(initial || []);
  const [err, setErr] = useState2("");
  const [over, setOver] = useState2(false);
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
  return /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs7(
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
          /* @__PURE__ */ jsx8("span", { style: { flex: "0 0 auto", width: 42, height: 42, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#fff", border: "1px solid var(--line)", color: "var(--accent)" }, children: icon }),
          /* @__PURE__ */ jsxs7("span", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ jsx8("span", { style: { display: "block", fontWeight: 600, fontSize: 15.5 }, children: label }),
            /* @__PURE__ */ jsx8("span", { style: { display: "block", fontSize: 13, color: "var(--ink-70)", marginTop: 2 }, children: sub })
          ] })
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, alignItems: "flex-start" }, children: [
      files.map((f, i) => /* @__PURE__ */ jsxs7("span", { style: { display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 3, width: 62 }, children: [
        /* @__PURE__ */ jsxs7("span", { title: f.name, style: { position: "relative", width: 62, height: 62, border: "1px solid var(--line-2)", background: "#fff", overflow: "hidden", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "var(--ink-45)" }, children: [
          f.url ? /* @__PURE__ */ jsx8("img", { src: f.url, alt: f.name, style: { width: "100%", height: "100%", objectFit: "cover" } }) : /* @__PURE__ */ jsx8(Icon, { d: ["M3 4.5h18v15H3z", "m3 15 5-5 4 4 3-3 6 6"], size: 22 }),
          /* @__PURE__ */ jsx8("button", { type: "button", "aria-label": "\u0423\u0431\u0440\u0430\u0442\u044C " + f.name, onClick: () => removeAt(i), style: { position: "absolute", top: 3, right: 3, width: 20, height: 20, borderRadius: "50%", border: "none", background: "rgba(27,23,18,.75)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", padding: 0 }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M18 6 6 18", "m6 6 12 12"], size: 11, sw: 2.4 }) })
        ] }),
        f.size ? /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 10, color: "var(--ink-45)", whiteSpace: "nowrap" }, children: fmtMB(f.size) }) : null
      ] }, i)),
      multiple ? /* @__PURE__ */ jsxs7("span", { style: { fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-45)", alignSelf: "center" }, children: [
        files.length,
        " \u0438\u0437 ",
        max
      ] }) : /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: "var(--ink-70)", maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", alignSelf: "center" }, children: files[0].name })
    ] }),
    err && /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx8(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 15, sw: 2 }),
      " ",
      err
    ] }),
    /* @__PURE__ */ jsx8("input", { ref, type: "file", accept, multiple, style: { display: "none" }, onChange: (e) => {
      push(e.target.files || []);
      e.target.value = "";
    } })
  ] });
}
function Ph({ src, w, pos, P, label, style }) {
  const [err, setErr] = useState2(false);
  if (err) return /* @__PURE__ */ jsx8("div", { style: { width: "100%", height: "100%", backgroundImage: "repeating-linear-gradient(135deg, " + P.line + " 0 12px, " + P.bg + " 12px 24px)", display: "flex", alignItems: "flex-end", padding: 8, ...style || {} }, children: label ? /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 9, letterSpacing: ".05em", textTransform: "uppercase", color: P.soft, background: "rgba(255,255,255,.72)", padding: "2px 6px" }, children: label }) : null });
  return /* @__PURE__ */ jsx8("img", { src: demoSrc(src, w), alt: "", loading: "lazy", onError: () => setErr(true), style: { width: "100%", height: "100%", objectFit: "cover", objectPosition: pos || "center", display: "block", ...style || {} } });
}
function DemoSite({ niche, height }) {
  const f = DEMO_FIX[niche] || DEMO_FIX["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
  const P = DEMO_PAL[niche] || DEMO_PAL["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
  const Label = ({ children }) => /* @__PURE__ */ jsx8("div", { style: { fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: P.soft, marginBottom: 12 }, children });
  const BtnD = ({ children }) => /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: P.btn, color: P.onBtn, fontWeight: 700, fontSize: 14, padding: "13px 18px" }, children: [
    children,
    " ",
    /* @__PURE__ */ jsx8("span", { children: "\u2192" })
  ] });
  return /* @__PURE__ */ jsxs7("div", { style: { height, background: P.bg, display: "flex", flexDirection: "column", overflow: "hidden", userSelect: "none" }, "aria-hidden": "true", children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderBottom: "1px solid var(--line)", background: "var(--bone)", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { display: "inline-flex", gap: 5 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx8("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--line-2)" } }, i)) }),
      /* @__PURE__ */ jsx8("span", { style: { flex: 1, textAlign: "center" }, children: /* @__PURE__ */ jsxs7("span", { style: { fontFamily: "var(--mono)", fontSize: 10.5, color: "var(--ink-70)", background: "#fff", border: "1px solid var(--line)", padding: "2px 12px" }, children: [
        f.host,
        ".samosite.online"
      ] }) }),
      /* @__PURE__ */ jsx8("span", { style: { width: 31 } })
    ] }),
    /* @__PURE__ */ jsxs7("div", { className: "ss-demo-scroll", style: { flex: 1, minHeight: 0, overflowY: "auto", overscrollBehavior: "contain" }, children: [
      /* @__PURE__ */ jsxs7("div", { style: { position: "relative", height: 280 }, children: [
        /* @__PURE__ */ jsx8(Ph, { src: f.img, w: 1200, pos: "center 24%", P, label: "\u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442" }),
        /* @__PURE__ */ jsx8("div", { style: { position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(20,16,15,.66) 0%, rgba(20,16,15,0) 46%)" } }),
        /* @__PURE__ */ jsxs7("div", { style: { position: "absolute", top: 14, left: 20, right: 20, display: "flex", justifyContent: "space-between", gap: 12 }, children: [
          /* @__PURE__ */ jsxs7("span", { style: { fontFamily: "var(--mono)", fontSize: 9.5, letterSpacing: ".16em", textTransform: "uppercase", color: "#fff", opacity: 0.92 }, children: [
            f.brand,
            " \xB7 ",
            f.cat
          ] }),
          /* @__PURE__ */ jsxs7("span", { style: { fontFamily: "var(--mono)", fontSize: 10.5, color: "#fff", background: "rgba(20,16,15,.45)", padding: "3px 9px" }, children: [
            "\u2605 ",
            f.rating,
            " \xB7 ",
            f.n,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
          ] })
        ] }),
        /* @__PURE__ */ jsxs7("h3", { style: { position: "absolute", left: 20, right: 20, bottom: 16, margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: 36, lineHeight: 1, letterSpacing: "-.01em", color: "#FBFBFC" }, children: [
          f.h[0],
          /* @__PURE__ */ jsx8("br", {}),
          /* @__PURE__ */ jsx8("span", { style: { fontStyle: "italic", color: P.hl }, children: f.h[1] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { padding: "22px 24px 8px" }, children: [
        /* @__PURE__ */ jsx8(Label, { children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B" }),
        f.items.map((it, i) => /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "baseline", gap: 14, padding: "9px 0", borderBottom: i < f.items.length - 1 ? "1px solid " + P.line : "none" }, children: [
          /* @__PURE__ */ jsxs7("div", { style: { minWidth: 0, flex: 1 }, children: [
            /* @__PURE__ */ jsx8("div", { style: { fontWeight: 600, fontSize: 14, color: P.ink }, children: it[0] }),
            it[2] ? /* @__PURE__ */ jsx8("div", { style: { fontSize: 11.5, color: P.soft, marginTop: 2 }, children: it[2] }) : null
          ] }),
          /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 12.5, color: P.ink, whiteSpace: "nowrap" }, children: it[1] })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsx8("div", { style: { padding: "14px 24px 26px" }, children: /* @__PURE__ */ jsx8(BtnD, { children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" }) }),
      /* @__PURE__ */ jsxs7("div", { style: { padding: "0 24px 26px" }, children: [
        /* @__PURE__ */ jsx8(Label, { children: "\u041E\u0442\u0437\u044B\u0432\u044B" }),
        /* @__PURE__ */ jsx8("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: f.revs.map((r, i) => /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 7, padding: "14px 16px", background: P.line, borderLeft: "3px solid " + P.accent }, children: [
          /* @__PURE__ */ jsx8("span", { "aria-label": "5 \u0438\u0437 5", style: { color: "#C9922E", fontSize: 13, letterSpacing: "1.5px" }, children: "\u2605\u2605\u2605\u2605\u2605" }),
          /* @__PURE__ */ jsx8("p", { style: { margin: 0, fontWeight: 600, fontSize: 15.5, lineHeight: 1.45, color: P.ink }, children: r[0] }),
          /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: P.ink, opacity: 0.75 }, children: r[1] })
        ] }, i)) })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { padding: "0 24px 12px" }, children: [
        /* @__PURE__ */ jsx8(Label, { children: "\u0420\u0430\u0431\u043E\u0442\u044B" }),
        /* @__PURE__ */ jsx8("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }, children: f.gal.map((g, i) => /* @__PURE__ */ jsx8("div", { style: { aspectRatio: "1 / 1", overflow: "hidden" }, children: /* @__PURE__ */ jsx8(Ph, { src: g, w: 600, P, label: "\u0444\u043E\u0442\u043E " + (i + 1) }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { padding: "18px 24px 22px", textAlign: "center", display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ jsx8(BtnD, { children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" }),
        /* @__PURE__ */ jsxs7("span", { style: { fontSize: 12, color: P.soft }, children: [
          f.addr,
          " \xB7 \u2605 ",
          f.rating,
          " \xB7 ",
          f.n,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { borderTop: "1px solid " + P.line, padding: "10px 24px", display: "flex", justifyContent: "space-between", gap: 12, fontFamily: "var(--mono)", fontSize: 10, color: P.soft }, children: [
        /* @__PURE__ */ jsxs7("span", { children: [
          f.host,
          ".samosite.online"
        ] }),
        /* @__PURE__ */ jsx8("span", { children: "\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" })
      ] })
    ] })
  ] });
}
function SkeletonDemo({ height }) {
  const L = (w, h, extra) => /* @__PURE__ */ jsx8("span", { className: "ss-skel", style: { display: "block", width: w, height: h || 12, ...extra || {} } });
  return /* @__PURE__ */ jsxs7("div", { style: { height, background: "#fff", display: "flex", flexDirection: "column" }, "aria-label": "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u0440\u2026", children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "9px 12px", borderBottom: "1px solid var(--line)", background: "var(--bone)", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { display: "inline-flex", gap: 5 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx8("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "var(--line-2)" } }, i)) }),
      /* @__PURE__ */ jsx8("span", { style: { flex: 1, display: "flex", justifyContent: "center" }, children: L(130, 18) }),
      /* @__PURE__ */ jsx8("span", { style: { width: 31 } })
    ] }),
    /* @__PURE__ */ jsxs7("div", { style: { flex: 1, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 13, overflow: "hidden" }, children: [
      L("34%", 10),
      L("82%", 28),
      L("60%", 28),
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 11, marginTop: 6 }, children: [
        L("100%", 13),
        L("100%", 13),
        L("90%", 13)
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 12, marginTop: 6, alignItems: "center" }, children: [
        L(118, 36),
        L(90, 11)
      ] }),
      /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--ink-45)", textAlign: "center", marginTop: 4 }, children: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u043C \u043F\u0440\u0438\u043C\u0435\u0440\u2026" })
    ] })
  ] });
}
function In2_StepExample({ niche = "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", onNicheChange, loading, onClaim, mobile }) {
  const other = niche === "\u0414\u0440\u0443\u0433\u043E\u0435";
  return /* @__PURE__ */ jsxs7("div", { "data-intake-step": "example", style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs7("div", { role: "tablist", "aria-label": "\u0422\u0438\u043F \u0434\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u0438", style: { display: "flex", flexWrap: "wrap", gap: 8 }, children: [
      NICHE_ORDER.map((n) => /* @__PURE__ */ jsx8("button", { type: "button", role: "tab", "aria-selected": niche === n, "data-niche-id": n, onClick: () => onNicheChange && onNicheChange(n), className: "chip" + (niche === n ? " is-active" : ""), style: { fontSize: 14.5 }, children: n }, n)),
      /* @__PURE__ */ jsx8("button", { type: "button", role: "tab", "aria-selected": other, "data-niche-id": "\u0414\u0440\u0443\u0433\u043E\u0435", onClick: () => onNicheChange && onNicheChange("\u0414\u0440\u0443\u0433\u043E\u0435"), className: "chip chip--other" + (other ? " is-active" : ""), style: { fontSize: 14.5 }, children: "\u0414\u0440\u0443\u0433\u043E\u0435" })
    ] }),
    other ? /* @__PURE__ */ jsxs7("div", { style: { padding: "30px 22px", textAlign: "center", border: "1px dashed var(--line-2)", background: "var(--bone)" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { fontFamily: "var(--display)", fontSize: 22, color: "var(--ink)", marginBottom: 8 }, children: "\u0421\u043E\u0431\u0435\u0440\u0451\u043C \u043F\u043E\u0434 \u0432\u0430\u0448\u0435 \u043D\u0430\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435" }),
      /* @__PURE__ */ jsx8("p", { style: { ...S.hint, maxWidth: 380, margin: "0 auto" }, children: "\u0414\u0438\u0437\u0430\u0439\u043D \u0438 \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u043E\u0434\u0441\u0442\u0440\u043E\u0438\u043C \u043F\u043E\u0434 \u0432\u0430\u0448\u0438 \u0440\u0430\u0431\u043E\u0442\u044B \u2014 \u043F\u0440\u0438\u043C\u0435\u0440\u044B \u0432\u044B\u0448\u0435 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442, \u043A\u0430\u043A \u044D\u0442\u043E \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0443 \u0431\u044C\u044E\u0442\u0438-\u043C\u0430\u0441\u0442\u0435\u0440\u043E\u0432." })
    ] }) : mobile ? /* @__PURE__ */ jsx8("div", { style: { margin: "2px -18px -20px", padding: "16px 18px 0", background: "#E9E0CD", borderTop: "1px solid var(--line-2)" }, children: /* @__PURE__ */ jsx8("div", { style: { overflow: "hidden" }, children: loading ? /* @__PURE__ */ jsx8(SkeletonDemo, { height: 452 }) : /* @__PURE__ */ jsx8(DemoSite, { niche, height: 452 }) }) }) : /* @__PURE__ */ jsx8("div", { style: { margin: "2px -32px -26px", padding: "24px 32px 0", background: "#E9E0CD", borderTop: "1px solid var(--line-2)" }, children: /* @__PURE__ */ jsx8("div", { style: { maxWidth: 830, margin: "0 auto", overflow: "hidden" }, children: loading ? /* @__PURE__ */ jsx8(SkeletonDemo, { height: 520 }) : /* @__PURE__ */ jsx8(DemoSite, { niche, height: 520 }) }) })
  ] });
}
function In2_StepExampleFooter({ onClaim }) {
  return /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs7("button", { className: "btn btn--block", type: "button", "data-cta": "claim-example", onClick: onClaim, children: [
      "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439 \u0434\u043B\u044F \u043C\u0435\u043D\u044F ",
      /* @__PURE__ */ jsx8("span", { className: "arw", children: "\u2192" })
    ] }),
    /* @__PURE__ */ jsx8("span", { style: { textAlign: "center", fontSize: 13, color: "var(--ink-70)" }, children: "\u041C\u0435\u043D\u044C\u0448\u0435 \u043C\u0438\u043D\u0443\u0442\u044B. \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u043F\u043E\u043A\u0430 \u043D\u0435 \u043D\u0443\u0436\u043D\u044B" })
  ] });
}
function AltList({ title, mode, onPick, exclude }) {
  return /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsx8("span", { style: S.label, children: title }),
    ["name", "screenshot", "link", "photo"].filter((id) => id !== exclude).map((id) => /* @__PURE__ */ jsx8(AltPath, { icon: ALT_PATHS[id].icon, label: ALT_PATHS[id].label, sub: ALT_PATHS[id].sub, active: id === mode, "data-source-path": id, onClick: () => onPick(id) }, id))
  ] });
}
function In2_StepSource(props) {
  const { path = "name", onPathChange, name = "", city = "", onName, onCity, openCity, link = "", onLink, screenshotName = "", onScreenshot, photos = 0, onPhotos, refineHint, niche = "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", mobile } = props;
  let pane = null, cta = null;
  if (path === "name") {
    pane = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      refineHint && /* @__PURE__ */ jsx8("div", { style: { border: "1px solid #DFC391", background: "#F8F1E1", color: "#8A5A24", padding: "10px 13px", fontSize: 13.5, lineHeight: 1.45 }, children: "\u0421\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441 \u0432\u044B\u0432\u0435\u0441\u043A\u043E\u0439 \u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0433\u043E\u0440\u043E\u0434 \u2014 \u0442\u0430\u043A \u043D\u0430\u0439\u0434\u0451\u043C \u0442\u043E\u0447\u043D\u0435\u0435." }),
      /* @__PURE__ */ jsx8(Field, { label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u043B\u0430", children: /* @__PURE__ */ jsxs7("div", { style: { position: "relative" }, children: [
        /* @__PURE__ */ jsx8("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "m20 20-3.5-3.5"], size: 17 }) }),
        /* @__PURE__ */ jsx8("input", { style: { ...S.input, paddingLeft: 36 }, value: name, placeholder: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B", onChange: (e) => onName && onName(e.target.value) })
      ] }) }),
      /* @__PURE__ */ jsx8(Field, { label: "\u0413\u043E\u0440\u043E\u0434 (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", children: /* @__PURE__ */ jsx8(CityInput, { value: city, onChange: (v) => onCity && onCity(v), forceOpen: openCity }) })
    ] });
    cta = /* @__PURE__ */ jsx8(Cta, { ok: !!name.trim(), onClick: props.onSubmit, missing: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", "data-cta": "source-next", children: "\u041D\u0430\u0439\u0442\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445" });
  } else if (path === "screenshot") {
    pane = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsx8(Uploader, { label: "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438", sub: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435, \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 (Ctrl+V) \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0430\u0439\u043B", accept: "image/*", icon: /* @__PURE__ */ jsx8(Icon, { d: ["M3 4.5h18v15H3z", "m3 15 5-5 4 4 3-3 6 6"], size: 20 }), initial: screenshotName ? [{ name: screenshotName, size: 1363149 }] : [], onFiles: (arr) => onScreenshot && onScreenshot(arr[0] ? arr[0].name : "") }, "shot"),
      /* @__PURE__ */ jsx8("p", { style: S.hint, children: "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434 \u2014 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E \u043D\u0435 \u0432\u0430\u0436\u043D\u043E. \u041D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u043C \u2014 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043C \u0432\u0432\u0435\u0441\u0442\u0438 \u0440\u0443\u043A\u0430\u043C\u0438." })
    ] });
    cta = /* @__PURE__ */ jsx8(Cta, { ok: !!screenshotName, onClick: props.onSubmit, missing: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442", "data-cta": "source-next", children: "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443" });
  } else if (path === "link") {
    const li = linkInfo(link);
    const linkOk = li.state === "ok" || li.state === "unknown";
    const lf = DEMO_FIX[niche] || DEMO_FIX["\u041C\u0430\u043D\u0438\u043A\u044E\u0440"];
    pane = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx8(Field, { label: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044C", children: /* @__PURE__ */ jsx8(LinkInput, { value: link, onChange: (v) => onLink && onLink(v) }) }),
      li.state === "ok" && /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 13, padding: "12px 14px", border: "1px solid var(--line)", background: "var(--bone)" }, children: [
        /* @__PURE__ */ jsx8("img", { src: demoSrc(lf.img, 120), alt: "", style: { width: 46, height: 46, objectFit: "cover", flex: "none", border: "1px solid var(--line-2)" } }),
        /* @__PURE__ */ jsxs7("div", { style: { minWidth: 0, flex: 1 }, children: [
          /* @__PURE__ */ jsxs7("div", { style: { fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }, children: [
            lf.brand,
            " ",
            /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--accent)", border: "1px solid var(--line-2)", padding: "2px 8px", marginLeft: 6, verticalAlign: "2px" }, children: li.provider })
          ] }),
          /* @__PURE__ */ jsx8("div", { style: { fontSize: 12.5, color: "var(--ink-45)", marginTop: 2 }, children: "\u041F\u043E\u0434\u0442\u044F\u043D\u0435\u043C \u043E\u0442\u0441\u044E\u0434\u0430 \u0444\u043E\u0442\u043E, \u0443\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B" })
        ] })
      ] })
    ] });
    cta = /* @__PURE__ */ jsx8(Cta, { ok: linkOk, onClick: props.onSubmit, missing: li.state === "invalid" ? "\u0440\u0430\u0431\u043E\u0447\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430" : "\u0441\u0441\u044B\u043B\u043A\u0430", "data-cta": "source-next", children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435" });
  } else {
    pane = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsx8(Uploader, { label: "\u0424\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \u0438\u043B\u0438 \u043F\u0440\u0430\u0439\u0441\u0430", sub: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435, \u0432\u0441\u0442\u0430\u0432\u044C\u0442\u0435 (Ctrl+V) \u0438\u043B\u0438 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043E 5 \u0444\u043E\u0442\u043E", multiple: true, accept: "image/*", icon: /* @__PURE__ */ jsx8(Icon, { d: ["M3 4.5h18v15H3z", "M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3", "m21 16-5-5-8 8"], size: 20 }), initial: photos ? Array.from({ length: Math.min(photos, 5) }, (_, i) => ({ name: "\u0424\u043E\u0442\u043E " + (i + 1), size: [2516582, 1887436, 3250585, 2306867, 1677722][i] })) : [], onFiles: (arr) => onPhotos && onPhotos(arr.length) }, "ph"),
      /* @__PURE__ */ jsx8("p", { style: S.hint, children: "\u041D\u0435\u0447\u0438\u0442\u0430\u0435\u043C\u044B\u0439 \u043F\u0440\u0430\u0439\u0441 \u043D\u0435 \u043F\u043E\u043C\u0435\u0448\u0430\u0435\u0442 \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0435 \u2014 \u043F\u043E\u043F\u0440\u043E\u0441\u0438\u043C \u043F\u0435\u0440\u0435\u0441\u043D\u044F\u0442\u044C \u0443\u0436\u0435 \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440\u0435." })
    ] });
    cta = /* @__PURE__ */ jsx8(Cta, { ok: !!photos, onClick: props.onSubmit, missing: "\u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E \u0444\u043E\u0442\u043E", "data-cta": "source-next", children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0438\u0437 \u0444\u043E\u0442\u043E" });
  }
  const alts = /* @__PURE__ */ jsx8(AltList, { title: "\u0421\u043F\u043E\u0441\u043E\u0431\u044B", mode: path, onPick: (id) => onPathChange && onPathChange(id) });
  return {
    body: /* @__PURE__ */ jsx8("div", { "data-intake-step": "source", children: mobile ? /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: [
      pane,
      /* @__PURE__ */ jsx8("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 16 }, children: alts })
    ] }) : /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { flex: 1.25, minWidth: 0 }, children: pane }),
      /* @__PURE__ */ jsx8("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: alts })
    ] }) }),
    footer: cta
  };
}
function In2_StepNotFound({ path = "name", name = "", city = "", onPick, onRetry, mobile }) {
  const shot = path === "screenshot";
  const text = /* @__PURE__ */ jsx8("p", { style: S.hint, children: shot ? "\u041D\u0435 \u0441\u043C\u043E\u0433\u043B\u0438 \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0441\u043E \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u0430 \u2014 \u0442\u0430\u043A\u043E\u0435 \u0431\u044B\u0432\u0430\u0435\u0442 \u0441 \u043E\u0431\u0440\u0435\u0437\u0430\u043D\u043D\u044B\u043C\u0438 \u043A\u0430\u0434\u0440\u0430\u043C\u0438. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u0441\u043F\u043E\u0441\u043E\u0431: \u0432\u0441\u0451, \u0447\u0442\u043E \u0432\u044B \u0432\u0432\u0435\u043B\u0438, \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E." : "\u041F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \xAB" + ((name || "").trim() || "\u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F") + "\xBB" + (city ? " \xB7 " + city : "") + " \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0448\u043B\u0438 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445 \u0438 \u0432 2\u0413\u0418\u0421. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u2014 \u0438\u043B\u0438 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u0441 \u0434\u0440\u0443\u0433\u043E\u0439 \u0441\u0442\u043E\u0440\u043E\u043D\u044B." });
  const alts = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsx8("span", { style: S.label, children: "\u0414\u0440\u0443\u0433\u0438\u0435 \u0441\u043F\u043E\u0441\u043E\u0431\u044B" }),
    !shot && /* @__PURE__ */ jsx8(AltPath, { icon: ALT_PATHS.screenshot.icon, label: ALT_PATHS.screenshot.label, sub: ALT_PATHS.screenshot.sub, "data-source-path": "screenshot", onClick: () => onPick("screenshot") }),
    /* @__PURE__ */ jsx8(AltPath, { icon: ALT_PATHS.link.icon, label: ALT_PATHS.link.label, sub: ALT_PATHS.link.sub, "data-source-path": "link", onClick: () => onPick("link") }),
    /* @__PURE__ */ jsx8(AltPath, { icon: ALT_PATHS.photo.icon, label: ALT_PATHS.photo.label, sub: ALT_PATHS.photo.sub, "data-source-path": "photo", onClick: () => onPick("photo") })
  ] });
  return {
    body: /* @__PURE__ */ jsx8("div", { "data-intake-step": "source", children: mobile ? /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: [
      text,
      /* @__PURE__ */ jsx8("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 16 }, children: alts })
    ] }) : /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { flex: 1.25, minWidth: 0 }, children: text }),
      /* @__PURE__ */ jsx8("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: alts })
    ] }) }),
    footer: /* @__PURE__ */ jsxs7("button", { className: "btn btn--block", type: "button", "data-cta": "source-next", onClick: onRetry, children: [
      shot ? "\u0412\u0432\u0435\u0441\u0442\u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0440\u0443\u043A\u0430\u043C\u0438" : "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434",
      " ",
      /* @__PURE__ */ jsx8("span", { className: "arw", children: "\u2192" })
    ] })
  };
}
function In2_StepRecognize({ onCancel }) {
  return {
    body: /* @__PURE__ */ jsxs7("div", { "data-intake-step": "recognize", style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 18, padding: "32px 0" }, children: [
      /* @__PURE__ */ jsx8("div", { className: "ss-spin", style: { width: 46, height: 46, borderRadius: "50%", border: "3px solid var(--line-2)", borderTopColor: "var(--accent)" } }),
      /* @__PURE__ */ jsx8("p", { style: { ...S.hint, textAlign: "center" }, children: "\u0427\u0438\u0442\u0430\u0435\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438 \u0433\u043E\u0440\u043E\u0434 \u0441\u043E \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u0430, \u0438\u0449\u0435\u043C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u043D\u0430 \u041A\u0430\u0440\u0442\u0430\u0445\u2026" })
    ] }),
    footer: /* @__PURE__ */ jsx8("button", { className: "tlink", type: "button", onClick: onCancel, style: { display: "block", margin: "0 auto", fontWeight: 500, color: "var(--ink-45)" }, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C" })
  };
}
function In2_StepConfirmCard({ candidates = [], selectedId = 0, onSelect, onConfirm, onReject, path, mobile }) {
  return {
    body: /* @__PURE__ */ jsxs7("div", { "data-intake-step": "confirm", style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx8("p", { style: S.hint, children: path === "screenshot" ? "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0438 \u043D\u0430\u0448\u043B\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0448\u0443:" : "\u041D\u0430\u0448\u043B\u0438 \u043F\u043E\u0445\u043E\u0436\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0448\u0443:" }),
      /* @__PURE__ */ jsx8("div", { role: "radiogroup", "aria-label": "\u041D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438", style: { display: mobile ? "flex" : "grid", flexDirection: "column", gridTemplateColumns: "1fr 1fr", gap: 10, alignItems: "stretch" }, children: candidates.map((c, i) => {
        const on = i === selectedId;
        return /* @__PURE__ */ jsxs7("button", { type: "button", role: "radio", "aria-checked": on, "data-candidate-idx": i, onClick: () => onSelect && onSelect(i), style: { position: "relative", textAlign: "left", padding: "15px 16px", border: on ? "1.5px solid var(--accent)" : "1px solid var(--line-2)", background: on ? "var(--bone)" : "#fff", cursor: "pointer", display: "flex", flexDirection: "column", gap: 6, font: "inherit", transition: "border-color .14s, background .14s" }, children: [
          /* @__PURE__ */ jsx8("span", { style: { position: "absolute", top: 12, right: 12, fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--ink-45)", border: "1px solid var(--line-2)", background: "#fff", padding: "3px 7px" }, children: c.source }),
          /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--display)", fontSize: 21, color: "var(--ink)", paddingRight: 92, lineHeight: 1.05 }, children: c.brand }),
          /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", gap: 8, color: "var(--ink-70)", fontSize: 14 }, children: [
            /* @__PURE__ */ jsx8(Icon, { d: ["M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z", "M12 10.2a2.2 2.2 0 1 0 0-.1"], size: 15, sw: 2 }),
            " ",
            c.address
          ] }),
          /* @__PURE__ */ jsxs7("span", { style: { fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink)" }, children: [
            "\u2605 ",
            c.rating,
            " \xB7 ",
            c.reviewsN,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
          ] })
        ] }, i);
      }) })
    ] }),
    footer: /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsxs7("button", { className: "btn btn--block", type: "button", "data-cta": "card-confirm", onClick: onConfirm, children: [
        "\u0414\u0430, \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C ",
        /* @__PURE__ */ jsx8("span", { className: "arw", children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsx8("button", { className: "tlink", type: "button", onClick: onReject, style: { alignSelf: "center", fontWeight: 500, color: "var(--ink-45)" }, children: "\u041D\u0438\u0447\u0435\u0433\u043E \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u2014 \u0438\u0441\u043A\u0430\u0442\u044C \u0435\u0449\u0451" })
    ] })
  };
}
function In2_StepBooking({ platform = "dikidi", onPlatformChange, url = "", onUrl, phone = "", onPhone, mobile }) {
  const showUrl = platform === "dikidi" || platform === "yclients";
  const showPhone = platform === "phone";
  const ui = bookingUrlInfo(url);
  const phoneOk = !showPhone || (phone || "").trim() === "" || (phone || "").replace(/\D/g, "").length === 11;
  const bok = !!platform && (showUrl ? ui.state !== "invalid" : true) && phoneOk;
  const form = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsx8("p", { style: S.hint, children: "\u0417\u0430\u043F\u0438\u0441\u044C \u043E\u0441\u0442\u0430\u0432\u0438\u043C \u0432\u0430\u0448\u0435\u0439: \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u0432\u0435\u0434\u0451\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0432\u0430\u043C \u0443\u0434\u043E\u0431\u043D\u043E." }),
    /* @__PURE__ */ jsx8("div", { role: "radiogroup", "aria-label": "\u041A\u0430\u043A \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0435\u0441\u044C", style: { display: "flex", flexWrap: "wrap", gap: 9 }, children: BOOKING.map((b) => /* @__PURE__ */ jsx8(Chip, { active: platform === b.id, "data-booking-platform": b.id, onClick: () => onPlatformChange && onPlatformChange(b.id), children: b.label }, b.id)) }),
    showUrl && /* @__PURE__ */ jsx8(BookingLink, { value: url, onChange: (v) => onUrl && onUrl(v) }),
    showPhone && /* @__PURE__ */ jsx8(BookingPhone, { value: phone, onChange: (v) => onPhone && onPhone(v) }),
    platform === "none" && /* @__PURE__ */ jsx8("p", { style: { ...S.hint, fontSize: 13.5, color: "var(--ink-45)" }, children: "\u041D\u0435 \u0441\u0442\u0440\u0430\u0448\u043D\u043E: \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u043C \u043A\u043D\u043E\u043F\u043A\u0443 \xAB\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C\xBB \u2014 \u0437\u0430\u044F\u0432\u043A\u0438 \u043F\u0440\u0438\u0434\u0443\u0442 \u0432 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440." })
  ] });
  const aside = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    /* @__PURE__ */ jsx8("span", { style: S.label, children: "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442" }),
    [["01", "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB"], ["02", "\u041E\u043D\u0430 \u0432\u0435\u0434\u0451\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0432\u044B \u0443\u0436\u0435 \u0432\u0435\u0434\u0451\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C"], ["03", "\u041F\u043E\u043C\u0435\u043D\u044F\u0442\u044C \u0441\u043F\u043E\u0441\u043E\u0431 \u043C\u043E\u0436\u043D\u043E \u0432 \u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442"]].map((r) => /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", flex: "none" }, children: r[0] }),
      /* @__PURE__ */ jsx8("span", { style: { fontSize: 14.5, color: "var(--ink-70)" }, children: r[1] })
    ] }, r[0]))
  ] });
  return {
    body: /* @__PURE__ */ jsx8("div", { "data-intake-step": "booking", children: mobile ? form : /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { flex: 1.25, minWidth: 0 }, children: form }),
      /* @__PURE__ */ jsx8("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: aside })
    ] }) }),
    footer: /* @__PURE__ */ jsx8(Cta, { ok: bok, onClick: (props) => {
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
  const form = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsx8("p", { style: S.hint, children: "\u0413\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E \u043E\u0442\u0432\u0435\u0447\u0430\u0442\u044C. \u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \xAB\u0434\u0430\xBB." }),
    /* @__PURE__ */ jsx8("div", { role: "radiogroup", "aria-label": "\u041A\u0430\u043D\u0430\u043B \u0441\u0432\u044F\u0437\u0438", style: { display: "flex", flexWrap: "wrap", gap: 9 }, children: CHANNELS.map((c) => /* @__PURE__ */ jsx8(Chip, { active: channel === c, "data-contact-channel": c, onClick: () => onChannel && onChannel(c), children: c }, c)) }),
    /* @__PURE__ */ jsx8(ContactInput, { channel, value: contact, onChange: (v) => onContact && onContact(v), initialTouched: touched }),
    /* @__PURE__ */ jsxs7("label", { style: { display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13.5, color: "var(--ink-70)" }, children: [
      /* @__PURE__ */ jsx8("input", { type: "checkbox", checked: consent, onChange: (e) => onConsent && onConsent(e.target.checked), style: { marginTop: 2, accentColor: "var(--accent)", width: 17, height: 17 } }),
      /* @__PURE__ */ jsxs7("span", { children: [
        "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 ",
        /* @__PURE__ */ jsx8("a", { href: H.politika, target: "_blank", rel: "noopener", style: aStyle, children: "\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }),
        " \u0438 \u0441 ",
        /* @__PURE__ */ jsx8("a", { href: H.oferta, target: "_blank", rel: "noopener", style: aStyle, children: "\u043E\u0444\u0435\u0440\u0442\u043E\u0439" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, color: "var(--ink-45)" }, children: [
      /* @__PURE__ */ jsx8(Icon, { d: ["M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z", "m9 12 2 2 4-4"], size: 15, sw: 1.8 }),
      " \u041E\u0442 \u0440\u043E\u0431\u043E\u0442\u043E\u0432 \u0437\u0430\u0449\u0438\u0449\u0430\u0435\u0442 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u0430\u044F \u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430 \u2014 \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E"
    ] }),
    submitError && /* @__PURE__ */ jsxs7("div", { role: "alert", style: { display: "flex", alignItems: "flex-start", gap: 9, border: "1px solid #D98A8A", background: "#FAEFEE", padding: "11px 13px", fontSize: 13.5, lineHeight: 1.45, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx8("span", { style: { flex: "none", marginTop: 1 }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 16, sw: 2 }) }),
      /* @__PURE__ */ jsx8("span", { children: "\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u2014 \u0444\u043E\u0440\u043C\u0430 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0430, \u0432\u0432\u043E\u0434\u0438\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E." })
    ] })
  ] });
  const aside = /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    /* @__PURE__ */ jsx8("span", { style: S.label, children: "\u0427\u0442\u043E \u0434\u0430\u043B\u044C\u0448\u0435" }),
    [["01", "\u041F\u0440\u0438\u0448\u043B\u0451\u043C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u2014 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435"], ["02", "\u0421\u043A\u0430\u0436\u0435\u0442\u0435 \xAB\u0434\u0430\xBB \u2014 \u0438\u043B\u0438 \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C"], ["03", "\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C. \u0410\u0434\u0440\u0435\u0441 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C \u2014 \u0432\u0430\u0448\u0438"]].map((r) => /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
      /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", flex: "none" }, children: r[0] }),
      /* @__PURE__ */ jsx8("span", { style: { fontSize: 14.5, color: "var(--ink-70)" }, children: r[1] })
    ] }, r[0])),
    /* @__PURE__ */ jsx8("p", { style: { fontSize: 12.5, color: "var(--ink-45)", marginTop: 4 }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u043D\u0443\u0436\u0435\u043D \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430 \u2014 \u043D\u0438\u043A\u0430\u043A\u0438\u0445 \u0440\u0430\u0441\u0441\u044B\u043B\u043E\u043A." })
  ] });
  return {
    body: /* @__PURE__ */ jsx8("div", { "data-intake-step": "contacts", children: mobile ? form : /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 30, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { flex: 1.25, minWidth: 0 }, children: form }),
      /* @__PURE__ */ jsx8("div", { style: { flex: 1, minWidth: 0, borderLeft: "1px solid var(--line)", paddingLeft: 30 }, children: aside })
    ] }) }),
    footer: /* @__PURE__ */ jsx8(Cta, { ok, onClick: (props) => {
    }, missing, "data-cta": "submit", children: submitError ? "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u043A\u0443" : "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443 \u2192" }),
    ok
  };
}
function In2_StepDone({ channel = "Telegram", contact = "@anna_nails", onEditContact, onClose, foundCard, mobile }) {
  return {
    body: /* @__PURE__ */ jsxs7("div", { "data-intake-step": "done", style: { display: "flex", flexDirection: "column", gap: 18, padding: "4px 0 2px", maxWidth: 520, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 13, textAlign: "center" }, children: [
        /* @__PURE__ */ jsx8("span", { style: { width: 62, height: 62, borderRadius: "50%", background: "var(--accent)", color: "var(--on-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx8(Icon, { d: ["M20 6 9 17l-5-5"], size: 30, sw: 2.4 }) }),
        /* @__PURE__ */ jsx8("h3", { style: { fontFamily: "var(--display)", fontSize: 26, color: "var(--ink)" }, children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0432\u0430\u0448 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }),
        /* @__PURE__ */ jsxs7("p", { style: { ...S.hint, maxWidth: 400 }, children: [
          "\u041F\u0440\u0438\u0448\u043B\u0451\u043C \u0432 ",
          channel,
          contact ? " \u043D\u0430 " + contact : "",
          " \u043F\u0440\u0438\u043C\u0435\u0440\u043D\u043E \u0447\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430.",
          " ",
          /* @__PURE__ */ jsx8("button", { className: "tlink", type: "button", onClick: onEditContact, style: { fontWeight: 600, color: "var(--accent)" }, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { borderTop: "1px solid var(--line)", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }, children: [
        /* @__PURE__ */ jsx8("span", { style: S.label, children: "\u0427\u0442\u043E \u0434\u0430\u043B\u044C\u0448\u0435" }),
        [["01", "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043F\u043E \u0441\u0441\u044B\u043B\u043A\u0435"], ["02", "\u0421\u043A\u0430\u0436\u0435\u0442\u0435 \xAB\u0434\u0430\xBB \u2014 \u0438\u043B\u0438 \u0447\u0442\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C"], ["03", "\u041F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u043C. \u0410\u0434\u0440\u0435\u0441 \u0438 \u0437\u0430\u043F\u0438\u0441\u044C \u2014 \u0432\u0430\u0448\u0438"]].map((r) => /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "baseline", gap: 12 }, children: [
          /* @__PURE__ */ jsx8("span", { style: { fontFamily: "var(--mono)", fontSize: 11, color: "var(--accent)", flex: "none" }, children: r[0] }),
          /* @__PURE__ */ jsx8("span", { style: { fontSize: 14.5, color: "var(--ink-70)" }, children: r[1] })
        ] }, r[0]))
      ] }),
      foundCard && /* @__PURE__ */ jsxs7("p", { style: { fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--ink-70)" }, children: [
        "\u041A\u0430\u0440\u0442\u043E\u0447\u043A\u0430: ",
        foundCard.brand
      ] })
    ] }),
    footer: /* @__PURE__ */ jsx8("button", { className: "btn btn--block", type: "button", "data-cta": "done-close", onClick: onClose, children: "\u041F\u043E\u043D\u044F\u0442\u043D\u043E" })
  };
}
function In2_Modal({ step, title, canBack, onBack, onClose, progress, restored, onDraftReset, submitError, onRetry, closeConfirm, onConfirmClose, onCancelClose, body, footer, footerOverride, mobile, embedded }) {
  const cardMax = 960;
  const outer = embedded ? { position: "relative", height: "100%", display: "flex", alignItems: "stretch", justifyContent: "center", background: "transparent" } : { position: "fixed", inset: 0, zIndex: 200, background: "rgba(27,23,18,.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: mobile ? "flex-end" : "center", justifyContent: "center" };
  const sheet = embedded ? { width: "100%", height: "100%", background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" } : { width: mobile ? "100%" : "min(" + cardMax + "px, calc(100vw - 40px))", maxHeight: mobile ? "94vh" : "90vh", background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" };
  return /* @__PURE__ */ jsx8("div", { className: "in2", style: outer, role: "dialog", "aria-modal": "true", "aria-label": "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442", children: /* @__PURE__ */ jsxs7("div", { style: sheet, children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderBottom: "1px solid var(--line)", flex: "0 0 auto" }, children: [
      canBack ? /* @__PURE__ */ jsx8("button", { className: "ss-iconbtn", type: "button", onClick: onBack, "aria-label": "\u041D\u0430\u0437\u0430\u0434", children: /* @__PURE__ */ jsx8(Icon, { d: ["M15 18l-6-6 6-6"], size: 20, sw: 2 }) }) : /* @__PURE__ */ jsx8("span", { style: { width: 38 } }),
      /* @__PURE__ */ jsx8("div", { style: { flex: 1, minWidth: 0, textAlign: "center" }, children: title ? /* @__PURE__ */ jsx8("div", { style: { fontFamily: "var(--display)", fontWeight: 700, fontSize: mobile ? 21 : 24, lineHeight: 1.04, letterSpacing: "-.01em", color: "var(--ink)" }, children: title }) : null }),
      /* @__PURE__ */ jsx8("button", { className: "ss-iconbtn", type: "button", onClick: onClose, "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", children: /* @__PURE__ */ jsx8(Icon, { d: ["M18 6 6 18", "m6 6 12 12"], size: 20, sw: 2 }) })
    ] }),
    progress != null && /* @__PURE__ */ jsx8("div", { style: { height: 3, background: "var(--line)", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx8("div", { style: { height: "100%", width: progress * 100 + "%", background: "var(--accent)", transition: "width .3s cubic-bezier(.2,.7,.3,1)" } }) }),
    /* @__PURE__ */ jsxs7("div", { style: { padding: mobile ? "20px 18px" : "26px 32px", overflowY: "auto", flex: 1 }, children: [
      restored && /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "var(--bone)", border: "1px solid var(--line-2)", padding: "9px 12px", marginBottom: 16, fontSize: 13.5, color: "var(--ink-70)" }, children: [
        /* @__PURE__ */ jsxs7("span", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx8(Icon, { d: ["M3 12a9 9 0 1 0 3-6.7", "M3 4v5h5"], size: 15, sw: 2 }),
          " \u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u0441 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430"
        ] }),
        /* @__PURE__ */ jsx8("button", { className: "tlink", type: "button", onClick: onDraftReset, style: { fontSize: 13, fontWeight: 500, color: "var(--ink-45)", whiteSpace: "nowrap" }, children: "\u041D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043D\u043E\u0432\u043E" })
      ] }),
      body
    ] }),
    footer && /* @__PURE__ */ jsx8("div", { style: { padding: mobile ? "14px 18px" : "16px 26px 22px", borderTop: "1px solid var(--line)", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx8("div", { style: { maxWidth: mobile ? "none" : 460, margin: "0 auto" }, children: footer }) }),
    closeConfirm && /* @__PURE__ */ jsx8("div", { style: { position: "absolute", inset: 0, zIndex: 6, background: "rgba(251,249,244,.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }, role: "alertdialog", "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u043C\u0443?", children: /* @__PURE__ */ jsxs7("div", { style: { textAlign: "center", maxWidth: 340, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx8("h3", { style: { fontFamily: "var(--display)", fontWeight: 700, fontSize: 26, color: "var(--ink)" }, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0444\u043E\u0440\u043C\u0443?" }),
      /* @__PURE__ */ jsx8("p", { style: { ...S.hint, marginBottom: 10 }, children: "\u0412\u0432\u043E\u0434 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u043B\u0438 \u2014 \u043A\u043E\u0433\u0434\u0430 \u0432\u0435\u0440\u043D\u0451\u0442\u0435\u0441\u044C, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0435 \u0441 \u044D\u0442\u043E\u0433\u043E \u0436\u0435 \u043C\u0435\u0441\u0442\u0430." }),
      /* @__PURE__ */ jsx8("button", { className: "btn btn--block", type: "button", onClick: onCancelClose, children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435" }),
      /* @__PURE__ */ jsx8("button", { className: "tlink", type: "button", onClick: onConfirmClose, style: { marginTop: 6, fontWeight: 500, color: "var(--ink-45)" }, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" })
    ] }) })
  ] }) });
}

// src/intake/index.tsx
import { Fragment as Fragment6, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function ModalShell({ children, width = 540, intakeStep }) {
  return /* @__PURE__ */ jsx9("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs8("div", { "data-intake-step": intakeStep, style: {
    width,
    maxWidth: "100%",
    background: VT.bg,
    borderRadius: VT.r.xl,
    boxShadow: VT.shadow.pop,
    padding: 28,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx9("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs8(Fragment6, { children: [
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && showBack && /* @__PURE__ */ jsxs8("button", { style: {
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
        /* @__PURE__ */ jsx9("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx9("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        step,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx9("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx9("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < step ? VT.accent : VT.line
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx9("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx9("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
function SvgLink() {
  return /* @__PURE__ */ jsxs8("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx9("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" }),
    /* @__PURE__ */ jsx9("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" })
  ] });
}
function SvgPaperclip() {
  return /* @__PURE__ */ jsx9("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx9("path", { d: "M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" }) });
}
function ModeSwitcher({ mode = "link", onModeChange }) {
  const tab = (id, label, icon) => {
    const active = mode === id;
    return /* @__PURE__ */ jsxs8(
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
          /* @__PURE__ */ jsx9("span", { style: { fontSize: 15, display: "inline-flex" }, children: icon }),
          label
        ]
      },
      id
    );
  };
  return /* @__PURE__ */ jsxs8("div", { role: "tablist", "aria-label": "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430", style: {
    display: "flex",
    gap: 4,
    padding: 4,
    background: VT.bgSoft,
    border: `1px solid ${VT.line}`,
    borderRadius: 999,
    marginTop: 18
  }, children: [
    tab("link", "\u0421\u0441\u044B\u043B\u043A\u0430", /* @__PURE__ */ jsx9(SvgLink, {})),
    tab("photo", "\u0424\u043E\u0442\u043E", /* @__PURE__ */ jsx9(SvgPaperclip, {}))
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
    return /* @__PURE__ */ jsxs8("div", { style: {
      padding: "12px 14px",
      background: VT.successSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.32 0.12 145)"
    }, children: [
      /* @__PURE__ */ jsx9("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx9("path", { d: "M5 12l4 4 10-10" }) }),
      /* @__PURE__ */ jsxs8("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx9("b", { children: meta.label }),
        counts ? /* @__PURE__ */ jsxs8("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx9("button", { onClick: onCorrect, style: {
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
    return /* @__PURE__ */ jsxs8("div", { style: {
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.36 0.10 240)"
    }, children: [
      /* @__PURE__ */ jsx9("span", { style: { fontSize: 16 }, children: meta.icon }),
      /* @__PURE__ */ jsxs8("span", { children: [
        /* @__PURE__ */ jsx9("b", { children: meta.label }),
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A \u0434\u043E\u0431\u0430\u0432\u0438\u043C."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs8("div", { style: {
    padding: "12px 14px",
    background: VT.warnSoft,
    borderRadius: VT.r.md,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13.5,
    color: "oklch(0.42 0.13 70)"
  }, children: [
    /* @__PURE__ */ jsx9("span", { style: { fontSize: 16 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsx9("span", { children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0444\u043E\u0442\u043E \u2192" })
  ] });
}
function LinkInput2({ value, placeholder = "https://...", onChange, loading = false }) {
  const empty = !value;
  return /* @__PURE__ */ jsxs8("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: VT.white,
    border: `1.5px solid ${empty ? VT.line : VT.accent}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx9(IconLink, {}),
    /* @__PURE__ */ jsx9(
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
    loading && /* @__PURE__ */ jsx9("span", { style: { color: VT.success, display: "inline-flex" }, children: /* @__PURE__ */ jsx9(Spinner, { size: 14 }) })
  ] });
}
var PHOTO_LIMITS = { minFiles: 5, maxFiles: 60, maxFileBytes: 15 * 1024 * 1024, maxTotalBytes: 200 * 1024 * 1024 };
function PhotoDropZone({ compact = false, onPick }) {
  return /* @__PURE__ */ jsxs8("div", { style: {
    border: `1.5px dashed ${VT.accent}`,
    background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
    borderRadius: VT.r.lg,
    padding: compact ? 20 : 28,
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx9("div", { style: { fontSize: compact ? 22 : 26, marginBottom: 6 }, children: "\u{1F4F7}" }),
    /* @__PURE__ */ jsx9("div", { style: { fontSize: compact ? 14 : 15, fontWeight: 600 }, children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }),
    /* @__PURE__ */ jsx9("div", { style: { fontSize: 13, color: VT.inkSoft, margin: "4px 0 12px" }, children: "\u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \xB7 JPEG / PNG / WebP / HEIC" }),
    /* @__PURE__ */ jsx9(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" }),
    /* @__PURE__ */ jsx9("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 10, fontFamily: VT.font.mono }, children: "5\u201360 \u0444\u0430\u0439\u043B\u043E\u0432 \xB7 \u0434\u043E 15 \u041C\u0411 \u043A\u0430\u0436\u0434\u044B\u0439 \xB7 \u0434\u043E 200 \u041C\u0411 \u0432\u0441\u0435\u0433\u043E" })
  ] });
}
function PhotoThumb({ name, sizeKb = 2400, idx = 0, onRemove }) {
  return /* @__PURE__ */ jsxs8("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx9("div", { style: {
      width: 44,
      height: 44,
      borderRadius: 8,
      background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
      flex: "0 0 auto"
    } }),
    /* @__PURE__ */ jsxs8("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs8("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx9("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
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
  return /* @__PURE__ */ jsxs8("div", { style: { marginTop: 14 }, children: [
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 ",
        files.length,
        " \u0418\u0417 ",
        PHOTO_LIMITS.maxFiles
      ] }),
      /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 11 }, children: [
        (totalKb / 1e3).toFixed(1),
        " \u041C\u0411 \xB7 \u2264 200 \u041C\u0411"
      ] })
    ] }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: files.map((f, i) => /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsxs8("label", { style: {
    display: "block",
    fontSize: 13,
    color: VT.inkSoft,
    fontWeight: 500,
    marginBottom: 6
  }, children: [
    children,
    required && /* @__PURE__ */ jsx9("span", { style: { color: VT.accent, marginLeft: 4 }, children: "*" })
  ] });
}
function FieldInput({ value, placeholder, onChange, mono = false, type = "text" }) {
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsxs8(
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
          /* @__PURE__ */ jsx9("span", { style: { fontSize: 14 }, children: icon }),
          label
        ]
      },
      id
    );
  };
  const ph = type === "phone" ? "+7 921 234-56-78" : "@your_handle";
  return /* @__PURE__ */ jsxs8(Fragment6, { children: [
    /* @__PURE__ */ jsxs8("div", { role: "tablist", style: {
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
    /* @__PURE__ */ jsx9(FieldInput, { value, placeholder: ph, mono: true, onChange: onValueChange })
  ] });
}
function TextFileThumb({ name, sizeKb = 240, onRemove }) {
  return /* @__PURE__ */ jsxs8("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "8px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx9("div", { style: {
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
    /* @__PURE__ */ jsxs8("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs8("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx9("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
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
  return /* @__PURE__ */ jsxs8("div", { style: {
    border: `1.5px dashed ${VT.line}`,
    background: VT.bgSoft,
    borderRadius: VT.r.md,
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 12
  }, children: [
    /* @__PURE__ */ jsx9("div", { style: {
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
    /* @__PURE__ */ jsxs8("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 13.5, fontWeight: 500 }, children: "\u041F\u0440\u0430\u0439\u0441, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433, FAQ" }),
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 11.5, color: VT.inkFaint, fontFamily: VT.font.mono, marginTop: 1 }, children: "PDF / DOCX / TXT / RTF \xB7 \u0434\u043E 10 \u0444\u0430\u0439\u043B\u043E\u0432" })
    ] }),
    /* @__PURE__ */ jsx9(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" })
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs8("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: VT.inkMuted,
    marginTop: 14,
    fontFamily: VT.font.mono,
    letterSpacing: "0.02em"
  }, children: [
    /* @__PURE__ */ jsx9("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx9("path", { d: "M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" }) }),
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
  return /* @__PURE__ */ jsxs8(ModalShell, { width: 540, intakeStep: "source", children: [
    /* @__PURE__ */ jsx9(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442",
        sub: `\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u2014 ${BRAND.name} \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0438 \u0437\u0430\u0431\u0435\u0440\u0451\u0442 \u0432\u0441\u0451 \u043D\u0443\u0436\u043D\u043E\u0435`
      }
    ),
    /* @__PURE__ */ jsx9(ModeSwitcher, { mode: "link", onModeChange }),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx9(FieldLabel, { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }),
      /* @__PURE__ */ jsx9(
        LinkInput2,
        {
          value: url,
          placeholder: "https://t.me/studia_anna",
          onChange: onUrlChange,
          loading: !!url && !source
        }
      )
    ] }),
    source && /* @__PURE__ */ jsx9("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx9(SourceBadge, { source, counts, onCorrect }) }),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: [
      /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u041F\u041E\u0414\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0415\u041C:" }),
      " ",
      "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 Telegram-\u043A\u0430\u043D\u0430\u043B \xB7 Instagram \xB7 2\u0413\u0418\u0421 \xB7 Avito \xB7 \u0432\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442"
    ] }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx9(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx9(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx9(CaptchaNotice, {})
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
  return /* @__PURE__ */ jsxs8(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx9(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0438\u0437 \u044D\u0442\u043E\u0433\u043E \u0441\u0430\u0439\u0442",
        sub: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u044B, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u043F\u0440\u043E\u0444\u0438\u043B\u044F, \u0444\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438 \u043C\u0435\u043D\u044E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C"
      }
    ),
    /* @__PURE__ */ jsx9(ModeSwitcher, { mode: "photo", onModeChange }),
    /* @__PURE__ */ jsx9("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx9(PhotoDropZone, { compact: !empty, onPick }) }),
    !empty && /* @__PURE__ */ jsx9(PhotoList, { files, onRemove }),
    !empty && files.length < PHOTO_LIMITS.minFiles && /* @__PURE__ */ jsxs8("div", { style: {
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
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx9(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx9(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx9(CaptchaNotice, {})
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
  return /* @__PURE__ */ jsxs8(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx9(
      StepHeader,
      {
        step: 2,
        total: 4,
        title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435",
        sub: "\u041F\u0430\u0440\u0430 \u0441\u0442\u0440\u043E\u043A, \u0447\u0442\u043E\u0431\u044B \u0418\u0418 \u0441\u043E\u0431\u0440\u0430\u043B \u0441\u0430\u0439\u0442 \u0442\u043E\u0447\u043D\u0435\u0435"
      }
    ),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx9(FieldLabel, { required: true, children: "\u0427\u0442\u043E \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435" }),
      /* @__PURE__ */ jsx9(
        FieldTextarea,
        {
          value: description,
          placeholder: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440, \u043F\u0435\u0434\u0438\u043A\u044E\u0440, \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435. 7 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430, \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435, \u0432\u044B\u0435\u0437\u0434 \u043D\u0430 \u0434\u043E\u043C",
          onChange: onDescriptionChange,
          rows: 4
        }
      )
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx9(FieldLabel, { required: true, children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx9(FieldInput, { value: city, placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A", onChange: onCityChange })
      ] }),
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx9(FieldLabel, { required: true, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435" }),
        /* @__PURE__ */ jsx9(
          CustomerContactPicker,
          {
            type: customerContactType,
            value: customerContact,
            onTypeChange: onCustomerContactTypeChange,
            onValueChange: onCustomerContactChange
          }
        ),
        /* @__PURE__ */ jsx9("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 6, lineHeight: 1.4 }, children: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u041A\u0443\u0434\u0430 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432\u0430\u043C \u043B\u0438\u0447\u043D\u043E \u2014 \u0441\u043F\u0440\u043E\u0441\u0438\u043C \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0448\u0430\u0433\u0435." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx9(FieldLabel, { children: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0444\u0430\u0439\u043B\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }),
      textFiles.length === 0 ? /* @__PURE__ */ jsx9(TextFilesDropZone, { onPick: onPickTextFile }) : /* @__PURE__ */ jsxs8("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
        textFiles.map((f, i) => /* @__PURE__ */ jsx9(
          TextFileThumb,
          {
            name: f.name,
            sizeKb: f.sizeKb,
            onRemove: () => onRemoveTextFile?.(i)
          },
          i
        )),
        /* @__PURE__ */ jsx9("button", { onClick: onPickTextFile, style: {
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
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx9(
      Btn,
      {
        style: { flex: 1, opacity: ok ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx9(IconArrow, {}),
        onClick: ok ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx9(CaptchaNotice, {})
  ] });
}
function ChannelOption({ value, label, hint, icon, selected, onSelect }) {
  return /* @__PURE__ */ jsxs8(
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
        /* @__PURE__ */ jsx9("span", { style: {
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `1.5px solid ${selected ? VT.accent : VT.line}`,
          background: VT.white,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 auto"
        }, children: selected && /* @__PURE__ */ jsx9("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }) }),
        /* @__PURE__ */ jsx9("span", { style: { fontSize: 16 }, children: icon }),
        /* @__PURE__ */ jsxs8("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx9("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx9("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 1 }, children: hint })
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
  return /* @__PURE__ */ jsxs8(ModalShell, { width: 540, intakeStep: "contact", children: [
    /* @__PURE__ */ jsx9(
      StepHeader,
      {
        step,
        total,
        title,
        sub
      }
    ),
    notice === "preview_failed" && /* @__PURE__ */ jsx9("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.warnSoft,
      borderRadius: VT.r.md,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "oklch(0.42 0.13 70)"
    }, children: "\u041D\u0435 \u0434\u043E\u0442\u044F\u043D\u0443\u043B\u0438\u0441\u044C \u0434\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u0421\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0432\u0440\u0443\u0447\u043D\u0443\u044E \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
    notice === "preview_timeout" && /* @__PURE__ */ jsx9("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      fontSize: 13.5,
      lineHeight: 1.5,
      color: "oklch(0.36 0.10 240)"
    }, children: "\u0421\u043E\u0431\u0438\u0440\u0430\u0435\u043C \u0434\u043E\u043B\u044C\u0448\u0435 \u043E\u0431\u044B\u0447\u043D\u043E\u0433\u043E. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442, \u0438 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A" }),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx9(FieldLabel, { children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
      /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
        /* @__PURE__ */ jsx9(
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
        /* @__PURE__ */ jsx9(
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
        /* @__PURE__ */ jsx9(
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
        /* @__PURE__ */ jsx9(
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
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx9(FieldLabel, { children: channel === "phone" ? "\u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0434\u043B\u044F SMS" : channel === "email" ? "\u0412\u0430\u0448 email" : channel === "max" ? "\u0412\u0430\u0448 MAX (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" }),
      /* @__PURE__ */ jsx9(FieldInput, { value: contact, placeholder: ph, mono: true, onChange: onContactChange })
    ] }),
    /* @__PURE__ */ jsx9("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx9(
      Checkbox,
      {
        checked: consent,
        onChange: (v) => onConsentChange?.(v),
        label: /* @__PURE__ */ jsx9(Fragment6, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }),
        link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
      }
    ) }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 20 }, children: /* @__PURE__ */ jsx9(
      Btn,
      {
        style: { flex: 1, opacity: contact && consent ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx9(IconArrow, {}),
        onClick: contact && consent ? onSubmit : void 0,
        children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"
      }
    ) }),
    /* @__PURE__ */ jsx9(CaptchaNotice, {})
  ] });
}
function SummaryRow({ label, value }) {
  return /* @__PURE__ */ jsxs8("div", { style: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "10px 0",
    borderTop: `1px solid ${VT.line}`
  }, children: [
    /* @__PURE__ */ jsx9("div", { style: {
      flex: "0 0 130px",
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.08em",
      color: VT.inkFaint,
      paddingTop: 2
    }, children: label }),
    /* @__PURE__ */ jsx9("div", { style: { flex: 1, fontSize: 14, color: VT.ink, lineHeight: 1.45, wordBreak: "break-word" }, children: value })
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
  return /* @__PURE__ */ jsxs8(ModalShell, { width: 540, intakeStep: "confirm", children: [
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        total,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx9("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx9("span", { style: { width: 28, height: 4, borderRadius: 2, background: VT.accent } }, i)) })
    ] }),
    /* @__PURE__ */ jsx9("div", { style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: VT.successSoft,
      color: VT.success,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsx9("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx9("path", { d: "M5 12l4 4 10-10" }) }) }),
    /* @__PURE__ */ jsx9("h2", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 8px", lineHeight: 1.15 }, children: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442" }),
    /* @__PURE__ */ jsxs8("p", { style: { fontSize: 15, lineHeight: 1.5, color: VT.inkSoft, margin: 0 }, children: [
      "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 ",
      /* @__PURE__ */ jsx9("b", { style: { color: VT.ink }, children: "2 \u0447\u0430\u0441\u043E\u0432" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { marginTop: 20 }, children: [
      mode === "link" && summary.url && /* @__PURE__ */ jsx9(SummaryRow, { label: "\u0421\u0421\u042B\u041B\u041A\u0410", value: /* @__PURE__ */ jsx9("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.url }) }),
      summary.themeLabel && /* @__PURE__ */ jsx9(SummaryRow, { label: "\u0421\u0422\u0418\u041B\u042C", value: summary.themeLabel }),
      mode === "photo" && /* @__PURE__ */ jsxs8(Fragment6, { children: [
        /* @__PURE__ */ jsx9(SummaryRow, { label: "\u0424\u0410\u0419\u041B\u042B", value: `${summary.fileCount || 0} \u0444\u043E\u0442\u043E` }),
        summary.description && /* @__PURE__ */ jsx9(SummaryRow, { label: "\u041E\u041F\u0418\u0421\u0410\u041D\u0418\u0415", value: summary.description }),
        summary.city && /* @__PURE__ */ jsx9(SummaryRow, { label: "\u0413\u041E\u0420\u041E\u0414", value: summary.city }),
        summary.customerContact && /* @__PURE__ */ jsx9(SummaryRow, { label: "\u041D\u0410 \u0421\u0410\u0419\u0422\u0415", value: /* @__PURE__ */ jsx9("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.customerContact }) }),
        summary.textFileCount > 0 && /* @__PURE__ */ jsx9(SummaryRow, { label: "\u0422\u0415\u041A\u0421\u0422\u042B", value: `${summary.textFileCount} ${pluralFiles(summary.textFileCount)}` })
      ] }),
      /* @__PURE__ */ jsx9(
        SummaryRow,
        {
          label: "\u041D\u0410\u041F\u0418\u0428\u0415\u041C \u0412\u0410\u041C",
          value: /* @__PURE__ */ jsxs8("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
            summary.contact,
            /* @__PURE__ */ jsxs8("span", { style: { color: VT.inkFaint }, children: [
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
    /* @__PURE__ */ jsx9("div", { style: { marginTop: 24 }, children: /* @__PURE__ */ jsx9(Btn, { variant: "secondary", style: { width: "100%" }, onClick: onClose, iconRight: /* @__PURE__ */ jsx9(IconArrow, {}), children: "\u041E\u043A, \u0436\u0434\u0443" }) })
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
      return /* @__PURE__ */ jsx9(
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
      return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(S3_FinalConfirm, { mode: "link", total, summary: s, onClose });
  }
  if (step === 1 && mode === "link") {
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(
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
    return /* @__PURE__ */ jsx9(S3_FinalConfirm, { mode, total, summary: s, onClose });
  }
  return /* @__PURE__ */ jsx9(
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
  return /* @__PURE__ */ jsx9(S3_Step1_Photo, { ...props, total: 4 });
}
var Confirmation = S3_FinalConfirm;

// src/customer/index.tsx
import React5 from "react";
import { Fragment as Fragment8, jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var SCHEMES = {
  cream: { bg: VT.bg, bgAlt: VT.bgSoft, ink: VT.ink, sub: VT.inkSoft, line: VT.line, accent: VT.accent, accentSoft: VT.accentSoft, white: VT.white, photoTone: "peach" },
  slate: { bg: "oklch(0.96 0.005 250)", bgAlt: "oklch(0.93 0.008 250)", ink: "oklch(0.20 0.012 250)", sub: "oklch(0.42 0.014 250)", line: "oklch(0.88 0.006 250)", accent: "oklch(0.55 0.13 250)", accentSoft: "oklch(0.93 0.04 250)", white: "#ffffff", photoTone: "slate" },
  sage: { bg: "oklch(0.97 0.008 145)", bgAlt: "oklch(0.94 0.01 145)", ink: "oklch(0.20 0.012 145)", sub: "oklch(0.42 0.014 145)", line: "oklch(0.88 0.008 145)", accent: "oklch(0.50 0.12 145)", accentSoft: "oklch(0.92 0.04 145)", white: "#ffffff", photoTone: "sage" }
};
function CPhoto({ tone = "peach", src, children, style }) {
  const tones = {
    peach: ["oklch(0.86 0.07 50)", "oklch(0.62 0.10 35)", "oklch(0.42 0.08 28)"],
    sage: ["oklch(0.84 0.06 145)", "oklch(0.58 0.08 145)", "oklch(0.34 0.06 145)"],
    slate: ["oklch(0.82 0.04 240)", "oklch(0.52 0.06 240)", "oklch(0.30 0.04 240)"],
    warm: ["oklch(0.88 0.06 70)", "oklch(0.70 0.12 50)", "oklch(0.42 0.10 35)"],
    rose: ["oklch(0.86 0.06 25)", "oklch(0.62 0.10 20)", "oklch(0.38 0.08 18)"]
  };
  const [c1, c2, c3] = tones[tone] || tones.peach;
  return /* @__PURE__ */ jsxs9("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: src ? "#222" : `
        radial-gradient(110% 80% at 30% 20%, ${c1} 0%, transparent 55%),
        radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%),
        linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)
      `,
    ...style
  }, children: [
    src && /* @__PURE__ */ jsx10(
      "img",
      {
        src,
        alt: "",
        loading: "lazy",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }
    ),
    !src && /* @__PURE__ */ jsx10("div", { "aria-hidden": "true", style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `
            radial-gradient(60% 30% at 20% 5%, rgba(255,255,255,0.18) 0%, transparent 60%),
            radial-gradient(40% 20% at 80% 95%, rgba(0,0,0,0.15) 0%, transparent 60%)
          `
    } }),
    children
  ] });
}
var U2 = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
var STUDIO_PHOTOS = {
  hero: U2("photo-1604654894610-df63bc536371", 1100),
  master: U2("photo-1580618672591-eb180b1a973f", 600),
  gallery: [
    U2("photo-1607779097040-26e80aa78e66", 600),
    U2("photo-1610992015732-2449b76344bc", 600),
    U2("photo-1632345031435-8727f6897d53", 600),
    U2("photo-1604902396830-aca29e19b067", 600),
    U2("photo-1604654894610-df63bc536371", 600),
    U2("photo-1607779097040-26e80aa78e66", 600),
    U2("photo-1604902396830-aca29e19b067", 600),
    U2("photo-1610992015732-2449b76344bc", 600),
    U2("photo-1632345031435-8727f6897d53", 600),
    U2("photo-1607779097040-26e80aa78e66", 600)
  ]
};
function ReviewAvatar({ name, tone = "peach", size = 36 }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const tones = {
    peach: ["oklch(0.78 0.10 50)", "oklch(0.55 0.12 35)"],
    rose: ["oklch(0.80 0.09 25)", "oklch(0.56 0.11 18)"],
    sage: ["oklch(0.78 0.08 145)", "oklch(0.52 0.10 145)"],
    slate: ["oklch(0.78 0.05 240)", "oklch(0.52 0.06 240)"],
    butter: ["oklch(0.84 0.10 85)", "oklch(0.58 0.12 75)"]
  };
  const [c1, c2] = tones[tone] || tones.peach;
  return /* @__PURE__ */ jsx10("span", { style: {
    width: size,
    height: size,
    borderRadius: "50%",
    flex: "0 0 auto",
    background: `linear-gradient(140deg, ${c1}, ${c2})`,
    color: "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    fontSize: Math.round(size * 0.42),
    letterSpacing: "-0.02em"
  }, children: initial });
}
function CStar({ filled = true, size = 13 }) {
  return /* @__PURE__ */ jsx10("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: filled ? "#f4a93b" : "none", stroke: filled ? "#f4a93b" : "#ccc", strokeWidth: "1.5", strokeLinejoin: "round", children: /* @__PURE__ */ jsx10("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" }) });
}
var STUDIO = {
  name: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B",
  logo: { letter: "\u0410", bg: "oklch(0.55 0.13 30)", fg: "#fff" },
  category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
  city: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A",
  address: "\u0433. \u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A, \u0443\u043B. \u041B\u0435\u043D\u0438\u043D\u0430, 12",
  hours: "\u043F\u043D\u2013\u0441\u0431 \xB7 10:00\u201320:00 \xB7 \u0432\u0441 \u0432\u044B\u0445\u043E\u0434\u043D\u043E\u0439",
  phone: "+7 921 234-56-78",
  phoneHref: "+79212345678",
  tg: "@studia_anna",
  whatsapp: "79212345678",
  trust: { years: "9 \u043B\u0435\u0442", clients: "1 200+", rating: "4.9 \u2605", reviews: 38 },
  hero: {
    title: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0432\xA0\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435 \u2014\n\u0431\u0435\u0437 \u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438",
    sub: "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \u0438\xA0\u0441\u0442\u043E\u0439\u043A\u043E\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435. \u041E\u0434\u0438\u043D \u043A\u043B\u0438\u0435\u043D\u0442 \u0432\xA0\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437\xA0\u0441\u043F\u0435\u0448\u043A\u0438, \u0432\xA0\u0442\u0438\u0448\u0438\u043D\u0435, \u0441\xA0\u043A\u043E\u0444\u0435."
  },
  services: [
    { name: "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440", desc: "\u0411\u0435\u0437 \u0432\u043E\u0434\u044B, \u043A\u0443\u0442\u0438\u043A\u0443\u043B\u0430 \u0438\xA0\u0444\u043E\u0440\u043C\u0430 \u2014 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E", dur: "60 \u043C\u0438\u043D", price: "1 500 \u20BD", priceHint: "" },
    { name: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0433\u0435\u043B\u044C-\u043B\u0430\u043A\u043E\u043C", desc: "\u0421\u0442\u043E\u0439\u043A\u043E\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438", dur: "90 \u043C\u0438\u043D", price: "2 200 \u20BD", priceHint: "" },
    { name: "\u041F\u0435\u0434\u0438\u043A\u044E\u0440 \u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", desc: "\u0411\u0435\u0440\u0435\u0436\u043D\u043E \u043A\xA0\u043A\u043E\u0436\u0435, \u0441\xA0\u0440\u0430\u0441\u043F\u0430\u0440\u0438\u0432\u0430\u043D\u0438\u0435\u043C", dur: "90 \u043C\u0438\u043D", price: "2 800 \u20BD", priceHint: "" },
    { name: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u043E\u0433\u0442\u0435\u0439", desc: "\u0424\u0440\u0435\u043D\u0447, \u043E\u043C\u0431\u0440\u0435, \u0432\u0442\u0438\u0440\u043A\u0438, \u0440\u0438\u0441\u0443\u043D\u043E\u043A", dur: "", price: "\u043E\u0442 150 \u20BD", priceHint: "\u0437\u0430 \u043D\u043E\u0433\u043E\u0442\u044C" },
    { name: "\u0421\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", desc: "\u0410\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E, \u0431\u0435\u0437\xA0\u0432\u0440\u0435\u0434\u0430 \u0434\u043B\u044F\xA0\u043D\u043E\u0433\u0442\u044F", dur: "20 \u043C\u0438\u043D", price: "500 \u20BD", priceHint: "" }
  ],
  process: [
    { title: "\u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442\u0435\u0441\u044C", body: "\u0427\u0435\u0440\u0435\u0437 \u0441\u0430\u0439\u0442, Telegram \u0438\u043B\u0438\xA0\u0437\u0432\u043E\u043D\u043E\u043A \u2014 \u043E\u0442\u0432\u0435\u0442\u0438\u043C \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0430." },
    { title: "\u041F\u0440\u0438\u0445\u043E\u0434\u0438\u0442\u0435", body: "\u0421\u0442\u0443\u0434\u0438\u044F \u0432\xA0\u0446\u0435\u043D\u0442\u0440\u0435 \u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0430. \u041F\u0430\u0440\u043A\u043E\u0432\u043A\u0430 \u0432\u043E\xA0\u0434\u0432\u043E\u0440\u0435." },
    { title: "\u0414\u0435\u043B\u0430\u0435\u043C \u043C\u0430\u043D\u0438\u043A\u044E\u0440", body: "\u0422\u0438\u0448\u0438\u043D\u0430, \u043A\u043E\u0444\u0435, \u0432\u0430\u0448 \u0441\u0435\u0440\u0438\u0430\u043B \u043D\u0430\xA0\u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0440\u0435 \u2014 \u0431\u0435\u0437\xA0\u0431\u043E\u043B\u0442\u043E\u0432\u043D\u0438, \u0435\u0441\u043B\u0438 \u043D\u0435\xA0\u0445\u043E\u0447\u0435\u0442\u0441\u044F." },
    { title: "\u0423\u0445\u043E\u0434\u0438\u0442\u0435 \u043A\u0440\u0430\u0441\u0438\u0432\u044B\u043C\u0438", body: "\u041F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438 \u0438\u043B\u0438\xA0\u0432\u043E\u0437\u0432\u0440\u0430\u0442. \u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u043C \u043D\u0430\xA0\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0440\u0430\u0437." }
  ],
  reviews: [
    { author: "\u041D\u0430\u0442\u0430\u043B\u044C\u044F \u041A.", date: "\u042F.\u041A\u0430\u0440\u0442\u044B \xB7 12 \u0430\u043F\u0440", stars: 5, text: "\u041E\u0447\u0435\u043D\u044C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0438\xA0\u0431\u0435\u0440\u0435\u0436\u043D\u043E, \u0444\u043E\u0440\u043C\u0430 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438. \u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u044E\u0434\u0430, \u0438\xA0\u043F\u043E\u0434\u0440\u0443\u0433 \u043F\u0440\u0438\u0432\u0435\u043B\u0430. \u0410\u043D\u044F \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F.", curated: true, tone: "peach" },
    { author: "\u041C\u0430\u0440\u0438\u044F \u041B.", date: "\u042F.\u041A\u0430\u0440\u0442\u044B \xB7 02 \u0430\u043F\u0440", stars: 5, text: "\u0427\u0438\u0441\u0442\u043E, \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E, \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u043E\u0432\u0440\u0435\u043C\u044F. \u041A\u043E\u0444\u0435 \u0442\u043E\u0436\u0435 \u0432\u043A\u0443\u0441\u043D\u044B\u0439 \u{1F642} \u0423\u0434\u043E\u0431\u043D\u043E \u0437\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0447\u0435\u0440\u0435\u0437 \u0431\u043E\u0442, \u043C\u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u044E\u0442 \u0437\u0430 10 \u043C\u0438\u043D\u0443\u0442.", curated: true, tone: "rose" },
    { author: "\u0414\u0430\u0440\u044C\u044F \u041D.", date: "\u042F.\u041A\u0430\u0440\u0442\u044B \xB7 28 \u043C\u0430\u0440", stars: 5, text: "\u0417\u0430\u043F\u0438\u0441\u0430\u043B\u0430 \u043D\u0430\xA0\u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u0434\u0435\u043D\u044C \u2014 \u0432\u0441\u0451 \u0443\u0441\u043F\u0435\u043B\u0438 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u043E \u043A\xA0\u0441\u0432\u0430\u0434\u044C\u0431\u0435. \u0421\u043F\u0430\u0441\u0438\u0431\u043E \u0437\u0430\xA0\u0432\u044B\u0440\u0443\u0447\u043A\u0443, \u0442\u0435\u043F\u0435\u0440\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u044E\u0434\u0430.", curated: false, tone: "sage" },
    { author: "\u0410\u043D\u043D\u0430 \u0421.", date: "Telegram \xB7 21 \u043C\u0430\u0440", stars: 5, text: "\u041F\u0440\u0438\u0445\u043E\u0436\u0443 \u0443\u0436\u0435 2 \u0433\u043E\u0434\u0430, \u043D\u0438 \u043E\u0434\u043D\u043E\u0433\u043E \u043D\u0430\u0440\u0435\u043A\u0430\u043D\u0438\u044F. \u0426\u0435\u043D\u044B \u0430\u0434\u0435\u043A\u0432\u0430\u0442\u043D\u044B\u0435, \u043C\u0430\u0441\u0442\u0435\u0440 \u0440\u0430\u0441\u0442\u0451\u0442 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441\u043E\xA0\u043C\u043D\u043E\u0439.", curated: false, tone: "butter" },
    { author: "\u042E\u043B\u0438\u044F \u0412.", date: "2GIS \xB7 14 \u043C\u0430\u0440", stars: 5, text: "\u0423\u0434\u043E\u0431\u043D\u044B\u0439 \u0441\u0430\u0439\u0442, \u0443\u0434\u043E\u0431\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C, \u0443\u0434\u043E\u0431\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E. \u041D\u0435 \u043B\u044E\u0431\u043B\u044E \u0441\u0430\u043B\u043E\u043D\u044B \u2014 \u0430\xA0\u0437\u0434\u0435\u0441\u044C \u043A\u0430\u043A\xA0\u0434\u043E\u043C\u0430, \u0442\u0438\u0445\u043E \u0438\xA0\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E.", curated: false, tone: "slate" },
    { author: "\u041E\u043B\u044C\u0433\u0430 \u041C.", date: "\u042F.\u041A\u0430\u0440\u0442\u044B \xB7 06 \u043C\u0430\u0440", stars: 5, text: "\u0421\u0434\u0435\u043B\u0430\u043B\u0430 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \u043F\u0435\u0440\u0435\u0434 \u043E\u0442\u043F\u0443\u0441\u043A\u043E\u043C, \u0447\u0435\u0440\u0435\u0437 3 \u043D\u0435\u0434\u0435\u043B\u0438 \u0432\u0435\u0440\u043D\u0443\u043B\u0430\u0441\u044C \u2014 \u0432\u0441\u0451 \u043A\u0430\u043A\xA0\u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u043E. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0441\u043A\u043E\u043B\u043E\u0432.", curated: false, tone: "peach" }
  ],
  about: {
    masterName: "\u0410\u043D\u043D\u0430 \u041F\u0435\u0442\u0440\u043E\u0432\u0430",
    role: "\u041C\u0430\u0441\u0442\u0435\u0440 \u043D\u043E\u0433\u0442\u0435\u0432\u043E\u0433\u043E \u0441\u0435\u0440\u0432\u0438\u0441\u0430",
    bio: "\u0420\u0430\u0431\u043E\u0442\u0430\u044E \u0441 2017 \u0433\u043E\u0434\u0430, \u043F\u0440\u043E\u0448\u043B\u0430 \u043E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0432 Vivienne Sabo, \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E \u043F\u043E\u0432\u044B\u0448\u0430\u044E \u043A\u0432\u0430\u043B\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044E. \u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432\xA0\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437\xA0\u0441\u043F\u0435\u0448\u043A\u0438, \u0441\xA0\u0447\u0430\u0448\u043A\u043E\u0439 \u043A\u043E\u0444\u0435 \u0438\xA0\u0432\u0430\u0448\u0438\u043C \u0441\u0435\u0440\u0438\u0430\u043B\u043E\u043C \u043D\u0430\xA0\u043F\u0440\u043E\u0435\u043A\u0442\u043E\u0440\u0435.",
    creds: [
      ["Vivienne Sabo \xB7 2017", "\u0431\u0430\u0437\u043E\u0432\u044B\u0439 \u043A\u0443\u0440\u0441"],
      ["Nail-school Moscow \xB7 2019", "\u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440"],
      ["\u0421\u0430\u043D-\u044D\u043F\u0438\u0434 \u0437\u0430\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u2116", "\u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u0441\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u044B\u0435"],
      ["\u0421\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u0430\u044F \xB7 \u0441 2020", "\u043E\u043F\u043B\u0430\u0442\u0430 \u043F\u043E\xA0\u0421\u0411\u041F \u0438\xA0\u043A\u0430\u0441\u0441\u043E\u0439"]
    ]
  },
  guarantees: [
    "\u0412\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B \u2014 \u0441\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u044B\u0435, \u043E\u0434\u043D\u043E\u0440\u0430\u0437\u043E\u0432\u044B\u0435",
    "\u041F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438 \u0438\u043B\u0438\xA0\u0432\u043E\u0437\u0432\u0440\u0430\u0442",
    "\u0423\u0434\u043E\u0431\u043D\u0430\u044F \u043F\u0430\u0440\u043A\u043E\u0432\u043A\u0430 \u0432\u043E\xA0\u0434\u0432\u043E\u0440\u0435",
    "\u041C\u043E\u0436\u043D\u043E \u0441\xA0\u0434\u0435\u0442\u044C\u043C\u0438 \u2014 \u0435\u0441\u0442\u044C \u0437\u043E\u043D\u0430 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F"
  ],
  faq: [
    [
      "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043D\u0430\xA0\u0441\u0430\u043C\u043E\u043C \u0434\u0435\u043B\u0435 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435?",
      "\u0413\u0435\u043B\u044C-\u043B\u0430\u043A \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438 \u043F\u0440\u0438\xA0\u043E\u0431\u044B\u0447\u043D\u043E\u0439 \u043D\u0430\u0433\u0440\u0443\u0437\u043A\u0435. \u0415\u0441\u043B\u0438 \u0435\u0441\u0442\u044C \u0441\u043A\u043E\u043B\u044B \u0432\xA0\u043F\u0435\u0440\u0432\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u044E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u0415\u0441\u043B\u0438 \u0432\xA0\u0442\u0440\u0435\u0442\u044C\u044E \u2014 \u044D\u0442\u043E \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0440\u043E\u043A."
    ],
    [
      "\u0427\u0442\u043E \u0435\u0441\u043B\u0438 \u0444\u043E\u0440\u043C\u0430 \u043D\u043E\u0433\u0442\u0435\u0439 \u043D\u0435\xA0\u043F\u043E\u0434\u043E\u0439\u0434\u0451\u0442?",
      "\u041F\u0435\u0440\u0435\u0434 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435\u043C \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E \u0433\u043E\u0442\u043E\u0432\u0443\u044E \u0444\u043E\u0440\u043C\u0443 \u2014 \u0435\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u043D\u0435\xA0\u0442\u0430\u043A, \u0441\u0440\u0430\u0437\u0443 \u0438\u0441\u043F\u0440\u0430\u0432\u043B\u044F\u044E. \u041F\u043E\u0441\u043B\u0435 \u2014 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u0434\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 3 \u0434\u043D\u0435\u0439 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E."
    ],
    [
      "\u041C\u043E\u0436\u043D\u043E \u043B\u0438\xA0\u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u043B\u0438\xA0\u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0437\u0430\u043F\u0438\u0441\u044C?",
      "\u0414\u0430, \u0437\u0430 24 \u0447\u0430\u0441\u0430 \u2014 \u0431\u0435\u0437\xA0\u0432\u043E\u043F\u0440\u043E\u0441\u043E\u0432. \u0415\u0441\u043B\u0438 \u0437\u0430\xA0\u043F\u0430\u0440\u0443 \u0447\u0430\u0441\u043E\u0432 \u2014 \u043F\u043E\u0441\u0442\u0430\u0440\u0430\u044E\u0441\u044C, \u043D\u043E\xA0\u043C\u0435\u0441\u0442\u043E \u043C\u043E\u0436\u0435\u0442 \u0443\u0436\u0435 \u0437\u0430\u0431\u0440\u0430\u0442\u044C \u0434\u0440\u0443\u0433\u043E\u0439 \u043A\u043B\u0438\u0435\u043D\u0442."
    ],
    [
      "\u041C\u043E\u0436\u043D\u043E \u0441\xA0\u0434\u0435\u0442\u044C\u043C\u0438?",
      "\u041C\u043E\u0436\u043D\u043E. \u0415\u0441\u0442\u044C \u0437\u043E\u043D\u0430 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F \u0441\xA0\u043C\u0443\u043B\u044C\u0442\u0438\u043A\u0430\u043C\u0438 \u0438\xA0\u0438\u0433\u0440\u0443\u0448\u043A\u0430\u043C\u0438. \u0415\u0441\u043B\u0438 \u0440\u0435\u0431\u0451\u043D\u043A\u0443 \u043C\u0435\u043D\u044C\u0448\u0435 \u0442\u0440\u0451\u0445 \u2014 \u043B\u0443\u0447\u0448\u0435 \u0441\xA0\u043A\u0435\u043C-\u0442\u043E, \u0447\u0442\u043E\u0431\u044B \u0443\xA0\u043C\u0435\u043D\u044F \u0431\u044B\u043B\u0438 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0435 \u0440\u0443\u043A\u0438."
    ],
    [
      "\u041A\u0430\u043A \u043E\u043F\u043B\u0430\u0442\u0438\u0442\u044C?",
      "\u041A\u0430\u0440\u0442\u043E\u0439, \u0421\u0411\u041F \u043F\u043E QR, \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u043C\u0438. \u0427\u0435\u043A \u0432\u044B\u0434\u0430\u044E \u2014 \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u0430\u044F, \u0432\u0441\u0451 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E."
    ],
    [
      "\u0415\u0441\u0442\u044C \u043B\u0438\xA0\u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F \u043D\u0430\xA0\u0440\u0430\u0431\u043E\u0442\u0443?",
      "\u0414\u0430. \u0415\u0441\u043B\u0438 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0441\u043E\u0448\u043B\u043E \u0440\u0430\u043D\u044C\u0448\u0435 \u0441\u0440\u043E\u043A\u0430 \u0431\u0435\u0437\xA0\u044F\u0432\u043D\u044B\u0445 \u043F\u0440\u0438\u0447\u0438\u043D (\u043C\u0435\u0445\u0430\u043D\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0441\u043A\u043E\u043B \u043D\u0435\xA0\u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F) \u2014 \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u044E \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E."
    ],
    [
      "\u041F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442\u0435 \u0432\xA0\u0432\u044B\u0445\u043E\u0434\u043D\u044B\u0435?",
      "\u0421\u0443\u0431\u0431\u043E\u0442\u0430 \u2014 \u0440\u0430\u0431\u043E\u0447\u0438\u0439 \u0434\u0435\u043D\u044C, \u0434\u043E 20:00. \u0412\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435 \u2014 \u0432\u044B\u0445\u043E\u0434\u043D\u043E\u0439, \u043D\u043E\xA0\u0438\u043D\u043E\u0433\u0434\u0430 \u0431\u044B\u0432\u0430\u044E\u0442 \u0441\u0435\u0441\u0441\u0438\u0438 \u043F\u043E\u0434 \u0437\u0430\u043F\u0438\u0441\u044C \u0437\u0430\u0440\u0430\u043D\u0435\u0435."
    ],
    [
      "\u041F\u0430\u0440\u043A\u043E\u0432\u043A\u0430 \u0435\u0441\u0442\u044C?",
      "\u0414\u0430, \u0432\u043E\xA0\u0434\u0432\u043E\u0440\u0435 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. \u041D\u0430 \u0443\u043B\u0438\u0446\u0443 \u043D\u0435\xA0\u0432\u044B\u0435\u0437\u0436\u0430\u0439\u0442\u0435 \u2014 \u0442\u0430\u043C \u043F\u043B\u0430\u0442\u043D\u0430\u044F \u0437\u043E\u043D\u0430."
    ]
  ]
};
function CustomerHeader({ s }) {
  const links = [
    ["\u0423\u0441\u043B\u0443\u0433\u0438", "#services"],
    ["\u041E\u0442\u0437\u044B\u0432\u044B", "#reviews"],
    ["\u041E \u043C\u0430\u0441\u0442\u0435\u0440\u0435", "#about"],
    ["\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B", "#contact"]
  ];
  return /* @__PURE__ */ jsxs9("header", { style: {
    position: "sticky",
    top: 0,
    zIndex: 5,
    background: `${s.white}ee`,
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${s.line}`,
    padding: "12px 36px",
    display: "flex",
    alignItems: "center",
    gap: 24
  }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx10("span", { style: {
        width: 32,
        height: 32,
        flex: "0 0 auto",
        borderRadius: 9,
        background: STUDIO.logo.bg,
        color: STUDIO.logo.fg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 16,
        letterSpacing: "-0.04em",
        lineHeight: 1
      }, children: STUDIO.logo.letter }),
      /* @__PURE__ */ jsx10("div", { style: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.name })
    ] }),
    /* @__PURE__ */ jsx10("nav", { style: { display: "flex", alignItems: "center", gap: 22, marginLeft: 12, fontSize: 14, color: s.sub }, children: links.map(([label, href]) => /* @__PURE__ */ jsx10("a", { href, style: { color: "inherit", textDecoration: "none" }, children: label }, label)) }),
    /* @__PURE__ */ jsxs9("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxs9("a", { href: `tel:${STUDIO.phoneHref}`, style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: s.ink,
        textDecoration: "none",
        fontWeight: 500
      }, children: [
        /* @__PURE__ */ jsx10("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx10("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
        STUDIO.phone
      ] }),
      /* @__PURE__ */ jsx10("a", { href: "#book", style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: s.accent,
        color: s.white,
        fontWeight: 600,
        padding: "9px 18px",
        borderRadius: 999,
        fontSize: 14,
        textDecoration: "none"
      }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] })
  ] });
}
function CustomerHero({ s }) {
  return /* @__PURE__ */ jsxs9("section", { style: {
    padding: "48px 36px 40px",
    borderBottom: `1px solid ${s.line}`,
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 36,
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsxs9("div", { children: [
      /* @__PURE__ */ jsxs9("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent }, children: [
        STUDIO.category.toUpperCase(),
        " \xB7 ",
        STUDIO.city.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx10("h1", { style: {
        fontSize: 52,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.04,
        margin: "14px 0 16px",
        whiteSpace: "pre-line",
        textWrap: "balance"
      }, children: STUDIO.hero.title }),
      /* @__PURE__ */ jsx10("p", { style: { fontSize: 17, lineHeight: 1.5, color: s.sub, maxWidth: 480, margin: 0, textWrap: "pretty" }, children: STUDIO.hero.sub }),
      /* @__PURE__ */ jsxs9("div", { style: {
        marginTop: 24,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 999
      }, children: [
        /* @__PURE__ */ jsx10("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx10(CStar, { filled: true, size: 14 }, i)) }),
        /* @__PURE__ */ jsx10("span", { style: { fontWeight: 700, color: s.ink, fontSize: 14 }, children: STUDIO.trust.rating }),
        /* @__PURE__ */ jsxs9("span", { style: { color: s.sub, fontSize: 13 }, children: [
          "\xB7 ",
          STUDIO.trust.reviews,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
        ] })
      ] }),
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs9("a", { href: "#book", style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: s.accent,
          color: s.white,
          fontWeight: 600,
          padding: "14px 26px",
          borderRadius: 999,
          fontSize: 16,
          textDecoration: "none",
          boxShadow: "0 10px 24px -12px rgba(0,0,0,0.25)"
        }, children: [
          "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F ",
          /* @__PURE__ */ jsx10(IconArrow, { size: 16 })
        ] }),
        /* @__PURE__ */ jsxs9("a", { href: `tel:${STUDIO.phoneHref}`, style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "transparent",
          color: s.ink,
          fontWeight: 600,
          padding: "14px 22px",
          borderRadius: 999,
          fontSize: 15,
          border: `1px solid ${s.line}`,
          textDecoration: "none"
        }, children: [
          /* @__PURE__ */ jsx10("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx10("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
          STUDIO.phone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs9(CPhoto, { tone: s.photoTone, src: STUDIO_PHOTOS.hero, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` }, children: [
      /* @__PURE__ */ jsx10("div", { "aria-hidden": "true", style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)"
      } }),
      /* @__PURE__ */ jsxs9("div", { style: { position: "absolute", left: 20, bottom: 18, right: 20, color: "#fff" }, children: [
        /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", opacity: 0.9 }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0412 \u0426\u0415\u041D\u0422\u0420\u0415 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A\u0410" }),
        /* @__PURE__ */ jsx10("div", { style: { fontWeight: 600, fontSize: 15, marginTop: 4 }, children: STUDIO.address })
      ] })
    ] })
  ] });
}
function CustomerSocialBar({ s }) {
  const badges = [
    { logo: "\u042F.\u041A", name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", stars: "4.9", count: "38 \u043E\u0442\u0437\u044B\u0432\u043E\u0432" },
    { logo: "2\u0413", name: "2GIS", stars: "5.0", count: "12 \u043E\u0442\u0437\u044B\u0432\u043E\u0432" },
    { logo: "TG", name: "Telegram", stars: "\u2605\u2605\u2605\u2605\u2605", count: "420 \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432" }
  ];
  return /* @__PURE__ */ jsxs9("section", { style: {
    padding: "20px 36px",
    background: s.bgAlt,
    borderBottom: `1px solid ${s.line}`,
    display: "flex",
    alignItems: "center",
    gap: 28,
    flexWrap: "wrap"
  }, children: [
    /* @__PURE__ */ jsxs9("div", { style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      fontFamily: VT.font.mono,
      fontSize: 12,
      letterSpacing: "0.1em",
      color: s.sub
    }, children: [
      "\u041D\u0410\u0421 \u0412\u042B\u0411\u0420\u0410\u041B\u0418",
      /* @__PURE__ */ jsx10("span", { style: { fontFamily: VT.font.sans, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.trust.clients }),
      /* @__PURE__ */ jsxs9("span", { children: [
        "\u0427\u0415\u041B\u041E\u0412\u0415\u041A \u0417\u0410 ",
        STUDIO.trust.years.toUpperCase()
      ] })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: { display: "flex", alignItems: "center", gap: 18, marginLeft: "auto", flexWrap: "wrap" }, children: badges.map((b) => /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx10("span", { style: {
        width: 30,
        height: 30,
        borderRadius: 8,
        background: s.white,
        border: `1px solid ${s.line}`,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: VT.font.mono,
        fontSize: 11,
        fontWeight: 700,
        color: s.ink
      }, children: b.logo }),
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", flexDirection: "column", gap: 1 }, children: [
        /* @__PURE__ */ jsxs9("div", { style: { fontSize: 13, fontWeight: 600, color: s.ink, display: "flex", alignItems: "center", gap: 6 }, children: [
          b.stars,
          " ",
          /* @__PURE__ */ jsx10("span", { style: { color: "#f4a93b" }, children: "\u2605" }),
          /* @__PURE__ */ jsxs9("span", { style: { color: s.sub, fontWeight: 400 }, children: [
            "\xB7 ",
            b.name
          ] })
        ] }),
        /* @__PURE__ */ jsx10("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: b.count })
      ] })
    ] }, b.name)) })
  ] });
}
function CustomerServices({ s }) {
  return /* @__PURE__ */ jsxs9("section", { id: "services", style: { padding: "52px 36px 40px", scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs9("div", { children: [
        /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
        /* @__PURE__ */ jsx10("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u044F \u0434\u0435\u043B\u0430\u044E" })
      ] }),
      /* @__PURE__ */ jsx10(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u0446\u0435\u043D\u044B \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u044B 12 \u043C\u0430\u044F 2026" })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 14
    }, children: STUDIO.services.map((sv, i) => /* @__PURE__ */ jsxs9("article", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 16,
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      gridColumn: i === 0 && STUDIO.services.length % 2 === 1 ? "1 / -1" : "auto"
    }, children: [
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }, children: [
        /* @__PURE__ */ jsx10("h3", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", margin: 0, color: s.ink, lineHeight: 1.2 }, children: sv.name }),
        /* @__PURE__ */ jsxs9("div", { style: { textAlign: "right", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 18, fontWeight: 700, color: s.ink, letterSpacing: "-0.01em" }, children: sv.price }),
          sv.priceHint && /* @__PURE__ */ jsx10("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: sv.priceHint })
        ] })
      ] }),
      /* @__PURE__ */ jsx10("p", { style: { fontSize: 14, color: s.sub, lineHeight: 1.5, margin: 0, flex: 1 }, children: sv.desc }),
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }, children: [
        sv.dur && /* @__PURE__ */ jsxs9("span", { style: {
          fontFamily: VT.font.mono,
          fontSize: 12,
          color: s.sub,
          display: "inline-flex",
          alignItems: "center",
          gap: 5
        }, children: [
          /* @__PURE__ */ jsxs9("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx10("circle", { cx: "12", cy: "12", r: "9" }),
            /* @__PURE__ */ jsx10("path", { d: "M12 7v5l3 2" })
          ] }),
          sv.dur
        ] }),
        /* @__PURE__ */ jsxs9("a", { href: "#book", style: {
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 14,
          fontWeight: 600,
          color: s.accent,
          textDecoration: "none",
          padding: "8px 14px",
          borderRadius: 999,
          background: s.accentSoft
        }, children: [
          "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F ",
          /* @__PURE__ */ jsx10(IconArrow, { size: 14 })
        ] })
      ] })
    ] }, sv.name)) })
  ] });
}
function ProcessIcon({ kind, color, soft }) {
  const sz = 26;
  const svg = {
    calendar: /* @__PURE__ */ jsxs9("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx10("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
      /* @__PURE__ */ jsx10("path", { d: "M8 3v4M16 3v4M3 10h18" })
    ] }),
    pin: /* @__PURE__ */ jsxs9("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx10("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
      /* @__PURE__ */ jsx10("circle", { cx: "12", cy: "10", r: "3" })
    ] }),
    coffee: /* @__PURE__ */ jsxs9("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx10("path", { d: "M4 8h13v5a5 5 0 0 1-5 5H9 a5 5 0 0 1-5-5z" }),
      /* @__PURE__ */ jsx10("path", { d: "M17 9 h2 a3 3 0 0 1 0 6 h-2" }),
      /* @__PURE__ */ jsx10("path", { d: "M7 4 c 0 1 1 1 1 2 s -1 1 -1 2" }),
      /* @__PURE__ */ jsx10("path", { d: "M11 4 c 0 1 1 1 1 2 s -1 1 -1 2" })
    ] }),
    sparkles: /* @__PURE__ */ jsxs9("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "currentColor", children: [
      /* @__PURE__ */ jsx10("path", { d: "M12 3 L13.4 8.2 L18.6 9 L13.4 9.8 L12 15 L10.6 9.8 L5.4 9 L10.6 8.2 Z" }),
      /* @__PURE__ */ jsx10("circle", { cx: "19", cy: "18", r: "1.6" }),
      /* @__PURE__ */ jsx10("circle", { cx: "6", cy: "19", r: "1.2" })
    ] })
  }[kind];
  return /* @__PURE__ */ jsx10("div", { style: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: soft,
    color,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto"
  }, children: svg });
}
function CustomerProcess({ s }) {
  const icons = ["calendar", "pin", "coffee", "sparkles"];
  return /* @__PURE__ */ jsxs9("section", { style: { padding: "40px 36px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, borderBottom: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041A\u0410\u041A \u0411\u0423\u0414\u0415\u0422" }),
      /* @__PURE__ */ jsxs9("h2", { style: { fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: [
        "\u041E\u0442 \u0437\u0430\u043F\u0438\u0441\u0438 \u0434\u043E\xA0\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u2014",
        /* @__PURE__ */ jsx10("br", {}),
        "\u0447\u0435\u0442\u044B\u0440\u0435 \u0448\u0430\u0433\u0430"
      ] })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      position: "relative"
    }, children: STUDIO.process.map((p, i) => /* @__PURE__ */ jsxs9("div", { style: { position: "relative" }, children: [
      i < STUDIO.process.length - 1 && /* @__PURE__ */ jsx10("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 26,
        right: -16,
        width: 32,
        height: 2,
        background: `repeating-linear-gradient(to right, ${s.line} 0 4px, transparent 4px 8px)`
      } }),
      /* @__PURE__ */ jsx10(ProcessIcon, { kind: icons[i], color: s.accent, soft: s.accentSoft }),
      /* @__PURE__ */ jsxs9("div", { style: {
        marginTop: 14,
        fontFamily: VT.font.mono,
        fontSize: 11.5,
        letterSpacing: "0.12em",
        color: s.sub,
        fontWeight: 600
      }, children: [
        "\u0428\u0410\u0413 ",
        i + 1
      ] }),
      /* @__PURE__ */ jsx10("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "4px 0 6px", color: s.ink }, children: p.title }),
      /* @__PURE__ */ jsx10("p", { style: { fontSize: 13.5, color: s.sub, lineHeight: 1.5, margin: 0 }, children: p.body })
    ] }, p.title)) })
  ] });
}
function CustomerGallery({ s }) {
  const tiles = [
    { tone: s.photoTone, span: "l", src: STUDIO_PHOTOS.gallery[0] },
    { tone: "warm", span: "s", src: STUDIO_PHOTOS.gallery[1] },
    { tone: "rose", span: "s", src: STUDIO_PHOTOS.gallery[2] },
    { tone: s.photoTone, span: "s", src: STUDIO_PHOTOS.gallery[3] },
    { tone: "warm", span: "s", src: STUDIO_PHOTOS.gallery[4] },
    { tone: "rose", span: "s", src: STUDIO_PHOTOS.gallery[5] },
    { tone: s.photoTone, span: "s", src: STUDIO_PHOTOS.gallery[6] },
    { tone: "warm", span: "s", src: STUDIO_PHOTOS.gallery[7] },
    { tone: "rose", span: "s", src: STUDIO_PHOTOS.gallery[8] },
    { tone: s.photoTone, span: "s", src: STUDIO_PHOTOS.gallery[9] }
  ];
  return /* @__PURE__ */ jsxs9("section", { style: { padding: "52px 36px 40px" }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs9("div", { children: [
        /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041F\u041E\u0420\u0422\u0424\u041E\u041B\u0418\u041E" }),
        /* @__PURE__ */ jsx10("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0420\u0430\u0431\u043E\u0442\u044B" })
      ] }),
      /* @__PURE__ */ jsx10(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E" })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "170px",
      gap: 10
    }, children: tiles.map((t, i) => /* @__PURE__ */ jsx10(CPhoto, { tone: t.tone, src: t.src, style: {
      gridColumn: t.span === "l" ? "span 2" : "span 1",
      gridRow: t.span === "l" ? "span 2" : "span 1",
      borderRadius: 12,
      border: `1px solid ${s.line}`
    } }, i)) })
  ] });
}
function CustomerReviews({ s }) {
  return /* @__PURE__ */ jsxs9("section", { id: "reviews", style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs9("div", { children: [
        /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E\u0422\u0417\u042B\u0412\u042B" }),
        /* @__PURE__ */ jsx10("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 8px", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u044F\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u044B" }),
        /* @__PURE__ */ jsxs9("div", { style: { fontSize: 14, color: s.sub, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx10("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx10(CStar, { filled: true, size: 14 }, i)) }),
          /* @__PURE__ */ jsx10("span", { style: { fontWeight: 600, color: s.ink }, children: "4.9 \u0438\u0437 5" }),
          /* @__PURE__ */ jsxs9("span", { children: [
            "\xB7 ",
            STUDIO.trust.reviews,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs9("div", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        background: s.white,
        border: `1px solid ${s.line}`,
        borderRadius: 999,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: s.sub
      }, children: [
        /* @__PURE__ */ jsx10("span", { style: { color: s.accent }, children: "\u2605" }),
        /* @__PURE__ */ jsx10("span", { children: "\u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0412\u042B\u0411\u0420\u0410\u041B \u0418\u0418 \xB7 \u041E\u0411\u041D\u041E\u0412\u041B\u042F\u0415\u0422\u0421\u042F \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u041E" })
      ] })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }, children: STUDIO.reviews.map((r, i) => /* @__PURE__ */ jsxs9("div", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 14,
      padding: 20,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }, children: [
      r.curated && /* @__PURE__ */ jsx10("span", { style: {
        position: "absolute",
        top: 14,
        right: 14,
        fontFamily: VT.font.mono,
        fontSize: 10,
        letterSpacing: "0.1em",
        background: s.accentSoft,
        color: s.accent,
        padding: "3px 8px",
        borderRadius: 4,
        fontWeight: 700
      }, children: "\u2605 \u041B\u0423\u0427\u0428\u0418\u0419" }),
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
        /* @__PURE__ */ jsx10(ReviewAvatar, { name: r.author, tone: r.tone, size: 36 }),
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsx10("div", { style: { fontWeight: 600, fontSize: 14, color: s.ink, lineHeight: 1.1 }, children: r.author }),
          /* @__PURE__ */ jsx10("div", { style: { fontSize: 12, color: s.sub, fontFamily: VT.font.mono, marginTop: 2 }, children: r.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx10("div", { style: { display: "flex", gap: 2 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx10(CStar, { filled: j < r.stars, size: 13 }, j)) }),
      /* @__PURE__ */ jsxs9("p", { style: { fontSize: 14, lineHeight: 1.55, color: s.ink, margin: 0, textWrap: "pretty" }, children: [
        "\xAB",
        r.text,
        "\xBB"
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs9("div", { style: {
      marginTop: 28,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs9("a", { href: "#book", style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        background: s.accent,
        color: s.white,
        fontWeight: 600,
        padding: "14px 28px",
        borderRadius: 999,
        fontSize: 16,
        textDecoration: "none"
      }, children: [
        "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043A\xA0\u0410\u043D\u043D\u0435 ",
        /* @__PURE__ */ jsx10(IconArrow, { size: 16 })
      ] }),
      /* @__PURE__ */ jsx10(Mono, { style: { fontSize: 12, color: s.sub }, children: "\u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u043E\u043A\u043D\u043E \u2014 \u0447\u0435\u0442\u0432\u0435\u0440\u0433 14:00" })
    ] })
  ] });
}
function CustomerAbout({ s }) {
  return /* @__PURE__ */ jsxs9("section", { id: "about", style: {
    padding: "52px 36px",
    display: "grid",
    gridTemplateColumns: "0.8fr 1.2fr",
    gap: 36,
    alignItems: "flex-start",
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsx10("div", { children: /* @__PURE__ */ jsx10(CPhoto, { tone: "rose", src: STUDIO_PHOTOS.master, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` } }) }),
    /* @__PURE__ */ jsxs9("div", { children: [
      /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E \u041C\u0410\u0421\u0422\u0415\u0420\u0415" }),
      /* @__PURE__ */ jsx10("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 4px", lineHeight: 1.1 }, children: STUDIO.about.masterName }),
      /* @__PURE__ */ jsx10("div", { style: { fontSize: 15, color: s.sub, marginBottom: 16 }, children: STUDIO.about.role }),
      /* @__PURE__ */ jsx10("p", { style: { fontSize: 15.5, lineHeight: 1.6, color: s.ink, margin: "0 0 22px", maxWidth: 560, textWrap: "pretty" }, children: STUDIO.about.bio }),
      /* @__PURE__ */ jsx10("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
        marginBottom: 24
      }, children: STUDIO.about.creds.map(([title, body]) => /* @__PURE__ */ jsxs9("div", { style: {
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 12,
        padding: "12px 14px"
      }, children: [
        /* @__PURE__ */ jsx10("div", { style: { fontSize: 13.5, fontWeight: 600, color: s.ink, letterSpacing: "-0.01em" }, children: title }),
        /* @__PURE__ */ jsx10("div", { style: { fontSize: 12, color: s.sub, marginTop: 2 }, children: body })
      ] }, title)) }),
      /* @__PURE__ */ jsx10("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }, children: "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442" }),
      /* @__PURE__ */ jsx10("ul", { style: { listStyle: "none", padding: 0, margin: 0, fontSize: 14.5, color: s.ink, display: "flex", flexDirection: "column", gap: 8 }, children: STUDIO.guarantees.map((item) => /* @__PURE__ */ jsxs9("li", { style: { display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.5 }, children: [
        /* @__PURE__ */ jsx10("span", { style: {
          flex: "0 0 auto",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: s.accentSoft,
          color: s.accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1
        }, children: /* @__PURE__ */ jsx10("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx10("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        item
      ] }, item)) })
    ] })
  ] });
}
function CustomerFaq({ s }) {
  return /* @__PURE__ */ jsxs9("section", { style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0427\u0410\u0421\u0422\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx10("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442" })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: {
      maxWidth: 760,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }, children: STUDIO.faq.map(([q, a], i) => /* @__PURE__ */ jsxs9("details", { open: i === 0, style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 12,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs9("summary", { style: {
        listStyle: "none",
        cursor: "pointer",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        fontSize: 15.5,
        fontWeight: 600,
        color: s.ink,
        lineHeight: 1.35
      }, children: [
        /* @__PURE__ */ jsx10("span", { style: { flex: 1 }, children: q }),
        /* @__PURE__ */ jsx10("span", { style: {
          flex: "0 0 auto",
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: s.bgAlt,
          color: s.accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 17,
          fontWeight: 700,
          lineHeight: 1
        }, children: "+" })
      ] }),
      /* @__PURE__ */ jsx10("div", { style: {
        padding: "0 20px 16px",
        fontSize: 14.5,
        lineHeight: 1.6,
        color: s.sub,
        textWrap: "pretty"
      }, children: a })
    ] }, q)) })
  ] });
}
function CustomerInput({ placeholder, s, multiline, label }) {
  return /* @__PURE__ */ jsxs9("div", { children: [
    label && /* @__PURE__ */ jsx10("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsx10("div", { style: {
      padding: "13px 16px",
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 10,
      fontSize: 15,
      color: VT.inkFaint,
      minHeight: multiline ? 70 : "auto",
      fontFamily: VT.font.sans
    }, children: placeholder })
  ] });
}
function MapPlaceholder({ s }) {
  return /* @__PURE__ */ jsxs9("div", { style: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    border: `1px solid ${s.line}`,
    background: s.bgAlt,
    aspectRatio: "1 / 1",
    minHeight: 280
  }, children: [
    /* @__PURE__ */ jsxs9("svg", { viewBox: "0 0 400 400", width: "100%", height: "100%", style: { display: "block", opacity: 0.6 }, children: [
      /* @__PURE__ */ jsx10("defs", { children: /* @__PURE__ */ jsx10("pattern", { id: "grid-map", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx10("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: s.line, strokeWidth: "1" }) }) }),
      /* @__PURE__ */ jsx10("rect", { width: "400", height: "400", fill: "url(#grid-map)" }),
      /* @__PURE__ */ jsx10("path", { d: "M 0 220 Q 100 180, 180 220 T 400 200", fill: "none", stroke: s.accent, strokeWidth: "3", strokeLinecap: "round", opacity: "0.5" }),
      /* @__PURE__ */ jsx10("path", { d: "M 40 0 L 80 120 L 60 240 L 100 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx10("path", { d: "M 220 0 L 260 180 L 240 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx10("path", { d: "M 0 80 L 400 60", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" }),
      /* @__PURE__ */ jsx10("path", { d: "M 0 340 L 400 320", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" })
    ] }),
    /* @__PURE__ */ jsxs9("div", { style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsx10("div", { style: {
        background: s.accent,
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.35)",
        whiteSpace: "nowrap"
      }, children: STUDIO.name }),
      /* @__PURE__ */ jsx10("svg", { width: "22", height: "14", viewBox: "0 0 22 14", fill: s.accent, children: /* @__PURE__ */ jsx10("path", { d: "M0 0 L22 0 L11 14 Z" }) })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: {
      position: "absolute",
      left: 12,
      bottom: 12,
      fontFamily: VT.font.mono,
      fontSize: 10.5,
      color: s.sub,
      background: s.white,
      padding: "4px 8px",
      borderRadius: 6,
      border: `1px solid ${s.line}`
    }, children: "\u042F.\u041A\u0410\u0420\u0422\u042B \xB7 \u0418\u041D\u0422\u0415\u0420\u0410\u041A\u0422\u0418\u0412\u041D\u0410\u042F" })
  ] });
}
function CustomerBooking({ s, confirmed = false }) {
  return /* @__PURE__ */ jsxs9("section", { id: "book", style: {
    padding: "52px 36px 40px",
    borderTop: `1px solid ${s.line}`,
    background: s.bg,
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx10("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0417\u0410\u041F\u0418\u0421\u042C" }),
      /* @__PURE__ */ jsx10("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 6px", lineHeight: 1.1 }, children: "\u0417\u0430\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043E\u043D\u043B\u0430\u0439\u043D \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434" }),
      /* @__PURE__ */ jsx10("p", { style: { fontSize: 15.5, color: s.sub, margin: 0 }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442. \u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\xA0\u043F\u0435\u0440\u0435\u0434\u0430\u0451\u043C \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C." })
    ] }),
    /* @__PURE__ */ jsxs9("div", { style: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx10("div", { style: {
        background: s.white,
        border: `1px solid ${s.line}`,
        borderRadius: 18,
        padding: 28
      }, children: confirmed ? /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: s.bgAlt, borderRadius: 12 }, children: [
        /* @__PURE__ */ jsx10("span", { style: { width: 40, height: 40, borderRadius: "50%", background: VT.successSoft, color: VT.success, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx10("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx10("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsx10("div", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430" }),
          /* @__PURE__ */ jsx10("div", { style: { fontSize: 13.5, color: s.sub }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0430. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443." })
        ] })
      ] }) : /* @__PURE__ */ jsxs9(Fragment8, { children: [
        /* @__PURE__ */ jsxs9("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx10(CustomerInput, { label: "\u041A\u0430\u043A \u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442", placeholder: "\u0418\u043C\u044F", s }),
          /* @__PURE__ */ jsx10(CustomerInput, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", placeholder: "+7 ___ ___-__-__", s })
        ] }),
        /* @__PURE__ */ jsxs9("div", { style: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx10(CustomerSelect, { label: "\u0423\u0441\u043B\u0443\u0433\u0430", value: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", s }),
          /* @__PURE__ */ jsx10(CustomerSelect, { label: "\u0423\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F", value: "\u0437\u0430\u0432\u0442\u0440\u0430, \u043F\u043E\u0441\u043B\u0435 14:00", s })
        ] }),
        /* @__PURE__ */ jsx10(Mono, { style: { fontSize: 10, color: s.sub, marginTop: 10 }, children: `<input type="text" name="company" tabIndex={-1} style="display:none"> // honeypot` }),
        /* @__PURE__ */ jsx10("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx10(Checkbox, { checked: false, label: /* @__PURE__ */ jsx10(Fragment8, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430" }) }),
        /* @__PURE__ */ jsx10("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsxs9("a", { href: "#book", style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          background: s.accent,
          color: s.white,
          fontWeight: 700,
          padding: "15px 24px",
          borderRadius: 12,
          fontSize: 16,
          textDecoration: "none",
          letterSpacing: "-0.005em"
        }, children: [
          "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F ",
          /* @__PURE__ */ jsx10(IconArrow, { size: 16 })
        ] }) }),
        /* @__PURE__ */ jsx10(Mono, { style: { display: "block", fontSize: 11, color: s.sub, marginTop: 10, textAlign: "center" }, children: "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha" }),
        /* @__PURE__ */ jsxs9("div", { style: {
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid ${s.line}`,
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsx10("div", { style: { fontSize: 13, color: s.sub, marginBottom: 10 }, children: "\u041D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u044B? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\xA0\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440:" }),
          /* @__PURE__ */ jsxs9("div", { style: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxs9("a", { href: `https://t.me/${STUDIO.tg.replace("@", "")}`, style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "oklch(0.62 0.13 240)",
              color: "#fff",
              fontWeight: 600,
              padding: "11px 18px",
              borderRadius: 10,
              fontSize: 14,
              textDecoration: "none"
            }, children: [
              /* @__PURE__ */ jsx10("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx10("path", { d: "M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" }) }),
              "Telegram"
            ] }),
            /* @__PURE__ */ jsxs9("a", { href: `https://wa.me/${STUDIO.whatsapp}`, style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "oklch(0.62 0.14 145)",
              color: "#fff",
              fontWeight: 600,
              padding: "11px 18px",
              borderRadius: 10,
              fontSize: 14,
              textDecoration: "none"
            }, children: [
              /* @__PURE__ */ jsx10("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx10("path", { d: "M12 2 A10 10 0 0 0 3 17 L2 22 L7 21 A10 10 0 1 0 12 2 Z M9 7 C 9.5 7 10 7.5 10.5 9 C 11 10 11 10.5 10 11 C 9.5 11.5 9 12 10 13 C 11 14 12 14.5 12.5 14 C 13 13 13.5 13 14.5 13.5 C 15.5 14 16 14.5 16 15 C 16 17 13 17 11 16 C 9 15 7 13 7 11 C 7 9 8 7 9 7 Z" }) }),
              "WhatsApp"
            ] }),
            /* @__PURE__ */ jsxs9("a", { href: `tel:${STUDIO.phoneHref}`, style: {
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: s.bgAlt,
              color: s.ink,
              fontWeight: 600,
              padding: "11px 18px",
              borderRadius: 10,
              fontSize: 14,
              textDecoration: "none",
              border: `1px solid ${s.line}`
            }, children: [
              /* @__PURE__ */ jsx10("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: /* @__PURE__ */ jsx10("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
              "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs9("div", { id: "contact", style: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        scrollMarginTop: 80
      }, children: [
        /* @__PURE__ */ jsx10(MapPlaceholder, { s }),
        /* @__PURE__ */ jsxs9("div", { style: {
          background: s.white,
          border: `1px solid ${s.line}`,
          borderRadius: 14,
          padding: "16px 18px"
        }, children: [
          /* @__PURE__ */ jsx10("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: s.accent,
            fontWeight: 600,
            marginBottom: 8
          }, children: "\u0413\u0414\u0415 \u0418 \u041A\u041E\u0413\u0414\u0410" }),
          /* @__PURE__ */ jsxs9("div", { style: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }, children: [
            /* @__PURE__ */ jsx10("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs9("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx10("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
              /* @__PURE__ */ jsx10("circle", { cx: "12", cy: "10", r: "3" })
            ] }) }),
            /* @__PURE__ */ jsx10("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.address })
          ] }),
          /* @__PURE__ */ jsxs9("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsx10("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs9("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx10("circle", { cx: "12", cy: "12", r: "9" }),
              /* @__PURE__ */ jsx10("path", { d: "M12 7v5l3 2" })
            ] }) }),
            /* @__PURE__ */ jsx10("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.hours })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function CustomerSelect({ label, value, s }) {
  return /* @__PURE__ */ jsxs9("div", { children: [
    label && /* @__PURE__ */ jsx10("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsxs9("div", { style: {
      padding: "13px 16px",
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 10,
      fontSize: 15,
      color: s.ink,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsx10("span", { children: value }),
      /* @__PURE__ */ jsx10("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx10("path", { d: "M6 9l6 6 6-6" }) })
    ] })
  ] });
}
function CustomerLeadForm({ s, confirmed = false }) {
  return /* @__PURE__ */ jsx10(CustomerBooking, { s, confirmed });
}
function CustomerFooter({ s, plan = "free" }) {
  return /* @__PURE__ */ jsxs9("footer", { style: {
    padding: "22px 36px 24px",
    borderTop: `1px solid ${s.line}`,
    background: s.bgAlt,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontSize: 13,
    color: s.sub
  }, children: [
    /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx10("span", { style: { color: s.ink, fontWeight: 600 }, children: STUDIO.name }),
        /* @__PURE__ */ jsxs9("span", { children: [
          "\xB7 ",
          STUDIO.address
        ] }),
        /* @__PURE__ */ jsx10("a", { href: `tel:${STUDIO.phoneHref}`, style: { color: "inherit", textDecoration: "none", fontFamily: VT.font.mono }, children: STUDIO.phone })
      ] }),
      /* @__PURE__ */ jsxs9("div", { style: { display: "flex", gap: 18, fontSize: 12.5 }, children: [
        /* @__PURE__ */ jsx10("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
        /* @__PURE__ */ jsx10("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 12 }, children: [
      /* @__PURE__ */ jsxs9("span", { children: [
        "\xA9 2026 ",
        STUDIO.name,
        ". \u0418\u041F \u041F\u0435\u0442\u0440\u043E\u0432\u0430 \u0410. \u0418., \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u0430\u044F."
      ] }),
      plan === "free" ? /* @__PURE__ */ jsxs9("a", { style: {
        color: s.sub,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: VT.font.mono,
        fontSize: 11.5
      }, children: [
        "\u0421\u0414\u0415\u041B\u0410\u041D\u041E \u041D\u0410 ",
        /* @__PURE__ */ jsx10("b", { style: { color: s.ink, fontFamily: VT.font.sans }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" }),
        " \u2192"
      ] }) : /* @__PURE__ */ jsx10("span", {})
    ] })
  ] });
}
function S7_CustomerSite({ scheme = "cream", plan = "free" }) {
  const s = SCHEMES[scheme];
  return /* @__PURE__ */ jsxs9("div", { style: { background: s.bg, color: s.ink, fontFamily: VT.font.sans, minHeight: "100%", letterSpacing: "-0.005em", position: "relative" }, children: [
    /* @__PURE__ */ jsxs9("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "10px 14px",
      borderBottom: `1px solid ${s.line}`,
      background: s.white,
      fontFamily: VT.font.mono,
      fontSize: 12,
      color: VT.inkFaint
    }, children: [
      /* @__PURE__ */ jsx10("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx10("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx10("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx10("span", { style: { marginLeft: 12 }, children: "studia-anna.samosite.online" })
    ] }),
    /* @__PURE__ */ jsx10(CustomerHeader, { s }),
    /* @__PURE__ */ jsx10(CustomerHero, { s }),
    /* @__PURE__ */ jsx10(CustomerSocialBar, { s }),
    /* @__PURE__ */ jsx10(CustomerServices, { s }),
    /* @__PURE__ */ jsx10(CustomerProcess, { s }),
    /* @__PURE__ */ jsx10(CustomerGallery, { s }),
    /* @__PURE__ */ jsx10(CustomerReviews, { s }),
    /* @__PURE__ */ jsx10(CustomerAbout, { s }),
    /* @__PURE__ */ jsx10(CustomerFaq, { s }),
    /* @__PURE__ */ jsx10(CustomerBooking, { s }),
    /* @__PURE__ */ jsx10(CustomerFooter, { s, plan })
  ] });
}
function S8_LeadFormConfirm() {
  const s = SCHEMES.cream;
  return /* @__PURE__ */ jsx10("div", { style: { background: s.bg, fontFamily: VT.font.sans, padding: 24 }, children: /* @__PURE__ */ jsx10(CustomerLeadForm, { s, confirmed: true }) });
}
function S7_SchemeSwatches() {
  return /* @__PURE__ */ jsx10("div", { style: {
    background: VT.bg,
    padding: 28,
    fontFamily: VT.font.sans,
    display: "flex",
    gap: 18,
    alignItems: "flex-start"
  }, children: [
    ["cream", "\u0422\u0451\u043F\u043B\u0430\u044F", "\u0434\u0435\u0444\u043E\u043B\u0442 \u0434\u043B\u044F\xA0\u0431\u0435\u0436\u0435\u0432\u044B\u0445/\u0442\u0451\u043F\u043B\u044B\u0445 \u0444\u043E\u0442\u043E"],
    ["slate", "\u0425\u043E\u043B\u043E\u0434\u043D\u0430\u044F", "\u0434\u043B\u044F \u0447\u0451\u0440\u043D\u043E-\u0431\u0435\u043B\u044B\u0445 / \u0433\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u044B\u0445 \u0444\u043E\u0442\u043E"],
    ["sage", "\u041F\u0440\u0438\u0440\u043E\u0434\u043D\u0430\u044F", "\u0434\u043B\u044F \u0437\u0435\u043B\u0451\u043D\u044B\u0445 / \u0434\u0440\u0435\u0432\u0435\u0441\u043D\u044B\u0445 \u0442\u043E\u043D\u043E\u0432"]
  ].map(([key, name, hint]) => {
    const s = SCHEMES[key];
    return /* @__PURE__ */ jsxs9("div", { style: { width: 200 }, children: [
      /* @__PURE__ */ jsxs9("div", { style: {
        height: 110,
        borderRadius: VT.r.md,
        overflow: "hidden",
        border: `1px solid ${s.line}`,
        background: s.bg,
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ jsx10("div", { style: { flex: 1, padding: 12, color: s.ink, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
        /* @__PURE__ */ jsx10("div", { style: { height: 8, background: s.accent } }),
        /* @__PURE__ */ jsx10("div", { style: { display: "flex", gap: 4, padding: 8 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx10("div", { style: { flex: 1, height: 14, borderRadius: 3, background: s.accentSoft } }, i)) })
      ] }),
      /* @__PURE__ */ jsx10("div", { style: { marginTop: 8, fontSize: 13, fontWeight: 600 }, children: name }),
      /* @__PURE__ */ jsx10("div", { style: { fontSize: 12, color: VT.inkFaint }, children: hint })
    ] }, key);
  }) });
}
var FB_SOURCES = [
  ["vk", "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435", 9],
  ["ozon", "Ozon-\u0432\u0438\u0442\u0440\u0438\u043D\u0430", 7],
  ["youtube", "YouTube / Shorts", 6],
  ["dzen", "\u0414\u0437\u0435\u043D", 4],
  ["max", "MAX-\u043A\u0430\u043D\u0430\u043B", 2]
];
var FB_FEATURES = [
  ["yclients", "YCLIENTS \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F", 8],
  ["amocrm", "amoCRM \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F", 5],
  ["custom_domain", "\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D", 9],
  ["no_watermark", "\u0423\u0431\u0440\u0430\u0442\u044C \xAB\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435\xBB", 7],
  ["multilang", "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u044F\u0437\u044B\u043A\u043E\u0432", 3],
  ["payments", "\u041E\u043D\u043B\u0430\u0439\u043D-\u043E\u043F\u043B\u0430\u0442\u0430", 6],
  ["blog", "\u0411\u043B\u043E\u0433-CMS", 4],
  ["stats", "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439", 5]
];
var WAITLIST_SOURCES = FB_SOURCES.map(([k, l]) => [k, l]);
var FEATURE_LIST = FB_FEATURES.map(([k, l]) => [k, l]);
function fbPlural(n) {
  const d = n % 10, h = n % 100;
  if (h >= 11 && h <= 14) return "\u0433\u043E\u043B\u043E\u0441\u043E\u0432";
  if (d === 1) return "\u0433\u043E\u043B\u043E\u0441";
  if (d >= 2 && d <= 4) return "\u0433\u043E\u043B\u043E\u0441\u0430";
  return "\u0433\u043E\u043B\u043E\u0441\u043E\u0432";
}
function FBVoteRow({ label, base, checked, onToggle, first, mobile }) {
  const v = base + (checked ? 1 : 0);
  const done = v >= 10;
  const pct = Math.min(v, 10) / 10 * 100;
  return /* @__PURE__ */ jsxs9(
    "label",
    {
      onClick: onToggle,
      style: {
        display: "flex",
        flexDirection: mobile ? "column" : "row",
        alignItems: mobile ? "stretch" : "center",
        gap: mobile ? 7 : 13,
        padding: "11px 0",
        borderTop: first ? "none" : `1px solid ${VT.lineSoft}`,
        cursor: "pointer",
        userSelect: "none"
      },
      children: [
        /* @__PURE__ */ jsxs9("span", { style: { display: "flex", alignItems: "center", gap: 13, flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx10("span", { style: {
            flex: "0 0 auto",
            width: 21,
            height: 21,
            borderRadius: 6,
            border: `2px solid ${checked ? VT.accent : VT.line}`,
            background: checked ? VT.accent : VT.white,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all .16s"
          }, children: checked && /* @__PURE__ */ jsx10("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3.4", children: /* @__PURE__ */ jsx10("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
          /* @__PURE__ */ jsx10("span", { style: { flex: 1, minWidth: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.25, color: VT.ink }, children: label })
        ] }),
        /* @__PURE__ */ jsxs9("span", { style: {
          flex: "0 0 auto",
          width: mobile ? "auto" : 116,
          paddingLeft: mobile ? 34 : 0,
          display: "flex",
          alignItems: "center",
          gap: 9
        }, children: [
          /* @__PURE__ */ jsx10("span", { style: { flex: 1, height: 5, borderRadius: 99, background: VT.bgSoft, overflow: "hidden" }, children: /* @__PURE__ */ jsx10("span", { style: { display: "block", height: "100%", width: pct + "%", background: VT.accent, borderRadius: 99, transition: "width .35s cubic-bezier(.2,.7,.2,1)" } }) }),
          /* @__PURE__ */ jsxs9("span", { style: {
            fontFamily: VT.font.mono,
            fontSize: 12,
            fontWeight: 500,
            fontVariantNumeric: "tabular-nums",
            whiteSpace: "nowrap",
            color: done ? VT.accent : VT.inkFaint
          }, children: [
            Math.min(v, 10),
            "/10"
          ] })
        ] })
      ]
    }
  );
}
function FBReveal({ label, shown, onShow, children }) {
  if (shown) return /* @__PURE__ */ jsx10("div", { style: { marginTop: 10 }, children });
  return /* @__PURE__ */ jsx10(
    "button",
    {
      type: "button",
      onClick: onShow,
      style: {
        marginTop: 12,
        background: "none",
        border: "none",
        cursor: "pointer",
        color: VT.accent,
        fontFamily: VT.font.sans,
        fontSize: 13.5,
        fontWeight: 600,
        padding: "2px 0"
      },
      children: label
    }
  );
}
function FBField({ placeholder, value, onChange, textarea }) {
  const common = {
    width: "100%",
    boxSizing: "border-box",
    fontFamily: VT.font.sans,
    fontSize: 16,
    color: VT.ink,
    background: VT.white,
    border: `1.5px solid ${VT.line}`,
    borderRadius: VT.r.md,
    padding: "11px 13px",
    outline: "none"
  };
  return textarea ? /* @__PURE__ */ jsx10("textarea", { value, onChange: (e) => onChange(e.target.value), placeholder, style: { ...common, resize: "vertical", minHeight: 84 } }) : /* @__PURE__ */ jsx10("input", { value, onChange: (e) => onChange(e.target.value), placeholder, style: common });
}
function FBVoteSection({ title, items, votes, onToggle, baseOf, ownVal, ownShown, onOwnShow, onOwnChange, ownPlaceholder, mobile }) {
  return /* @__PURE__ */ jsxs9("div", { style: { marginTop: 18 }, children: [
    /* @__PURE__ */ jsx10("h3", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", margin: "0 0 2px" }, children: title }),
    /* @__PURE__ */ jsx10("p", { style: { fontSize: 12.5, color: VT.inkFaint, margin: "0 0 8px" }, children: "\u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u043D\u0443\u0436\u043D\u043E\u0435 \u2014 \u0433\u043E\u043B\u043E\u0441 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443" }),
    /* @__PURE__ */ jsx10("div", { children: items.map(([key, label, base], i) => /* @__PURE__ */ jsx10(
      FBVoteRow,
      {
        label,
        base: baseOf(key, base),
        first: i === 0,
        mobile,
        checked: !!votes[key],
        onToggle: () => onToggle(key)
      },
      key
    )) }),
    /* @__PURE__ */ jsx10(FBReveal, { label: "+ \u0441\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442", shown: ownShown, onShow: onOwnShow, children: /* @__PURE__ */ jsx10(FBField, { placeholder: ownPlaceholder, value: ownVal, onChange: onOwnChange }) })
  ] });
}
function S9_FeedbackModal(props = {}) {
  const p = props;
  const {
    mobile,
    open: openProp,
    onOpenChange,
    tally,
    onSubmit,
    submitting = false,
    error = null,
    embedded: embeddedProp
  } = p;
  const { useState: useState8 } = React5;
  const isControlled = openProp !== void 0;
  const isCanvas = !isControlled && typeof onSubmit !== "function";
  const embedded = embeddedProp !== void 0 ? embeddedProp : isCanvas;
  const [internalOpen, setInternalOpen] = useState8(isCanvas);
  const isOpen = isControlled ? openProp : internalOpen;
  const setOpen = (v) => {
    if (onOpenChange) onOpenChange(v);
    if (!isControlled) setInternalOpen(v);
  };
  const [votes, setVotes] = useState8({});
  const [ownSrc, setOwnSrc] = useState8("");
  const [ownFeat, setOwnFeat] = useState8("");
  const [showOwnSrc, setShowOwnSrc] = useState8(false);
  const [showOwnFeat, setShowOwnFeat] = useState8(false);
  const [showMsg, setShowMsg] = useState8(false);
  const [msg, setMsg] = useState8("");
  const [name, setName] = useState8("");
  const [contact, setContact] = useState8("");
  const [submitted, setSubmitted] = useState8(false);
  const tallyItems = tally && tally.items || null;
  const baseOf = (key, fallback) => tallyItems && tallyItems[key] != null ? tallyItems[key] : fallback;
  const baseTotal = tally && tally.total_week != null ? tally.total_week : 340;
  const checkedCount = Object.values(votes).filter(Boolean).length;
  const ownCount = (ownSrc.trim() ? 1 : 0) + (ownFeat.trim() ? 1 : 0);
  const n = checkedCount + ownCount;
  const awake = n > 0;
  const toggle = (key) => setVotes((v) => ({ ...v, [key]: !v[key] }));
  const reset = () => {
    setVotes({});
    setOwnSrc("");
    setOwnFeat("");
    setShowOwnSrc(false);
    setShowOwnFeat(false);
    setShowMsg(false);
    setMsg("");
    setName("");
    setContact("");
    setSubmitted(false);
  };
  const buildPayload = () => ({
    votes: [
      ...FB_SOURCES.filter(([k]) => votes[k]).map(([k]) => ({ kind: "source", key: k })),
      ...FB_FEATURES.filter(([k]) => votes[k]).map(([k]) => ({ kind: "feature", key: k }))
    ],
    own_source: ownSrc.trim() || null,
    own_feature: ownFeat.trim() || null,
    message: msg.trim() || null,
    name: name.trim() || null,
    contact: contact.trim() || null
  });
  const handleSubmit = async () => {
    if (n === 0 || submitting) return;
    if (typeof onSubmit === "function") {
      try {
        await onSubmit(buildPayload());
        setSubmitted(true);
      } catch (e) {
      }
    } else {
      setSubmitted(true);
    }
  };
  const FauxPage = () => /* @__PURE__ */ jsxs9("div", { style: { position: "absolute", inset: 0, overflow: "hidden", padding: mobile ? "20px" : "32px 48px", filter: isOpen ? "blur(2px)" : "none" }, children: [
    /* @__PURE__ */ jsx10("div", { style: { height: 18, width: mobile ? 120 : 180, background: VT.line, borderRadius: 6, opacity: 0.6 } }),
    /* @__PURE__ */ jsx10("div", { style: { height: mobile ? 32 : 46, width: "70%", background: VT.line, borderRadius: 10, opacity: 0.5, marginTop: 22 } }),
    /* @__PURE__ */ jsx10("div", { style: { height: 14, width: "52%", background: VT.line, borderRadius: 6, opacity: 0.4, marginTop: 16 } }),
    /* @__PURE__ */ jsx10("div", { style: { display: "flex", flexDirection: mobile ? "column" : "row", gap: 16, marginTop: 30 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx10("div", { style: { flex: 1, height: mobile ? 90 : 150, background: VT.line, borderRadius: 14, opacity: 0.35 } }, i)) })
  ] });
  const FloatingBtn = ({ fixed }) => /* @__PURE__ */ jsxs9(
    "button",
    {
      type: "button",
      "data-floating-feedback-btn": true,
      onClick: () => setOpen(true),
      style: {
        position: fixed ? "fixed" : "absolute",
        right: mobile ? 16 : 28,
        bottom: mobile ? 16 : 28,
        zIndex: fixed ? 2147483e3 : 3,
        background: VT.accent,
        color: VT.white,
        border: "none",
        cursor: "pointer",
        padding: "14px 20px",
        borderRadius: VT.r.pill,
        fontFamily: VT.font.sans,
        fontSize: 14.5,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        boxShadow: VT.shadow.pop
      },
      children: [
        /* @__PURE__ */ jsx10("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx10("path", { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" }) }),
        "\u0427\u0435\u0433\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442?"
      ]
    }
  );
  const Dialog = () => /* @__PURE__ */ jsx10(
    "div",
    {
      "data-feedback-modal": true,
      style: {
        position: embedded ? "absolute" : "fixed",
        inset: 0,
        zIndex: embedded ? 4 : 2147483600,
        background: "oklch(0.30 0.02 60 / 0.46)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: mobile ? "14px 10px" : "40px 24px",
        overflowY: "auto"
      },
      onClick: (e) => {
        if (e.target === e.currentTarget) setOpen(false);
      },
      children: /* @__PURE__ */ jsxs9("div", { style: {
        position: "relative",
        width: "100%",
        maxWidth: mobile ? 9999 : 560,
        background: VT.bg,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.xl,
        boxShadow: VT.shadow.pop,
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsx10(
          "button",
          {
            type: "button",
            onClick: () => setOpen(false),
            "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
            style: {
              position: "absolute",
              top: 14,
              right: 14,
              zIndex: 2,
              width: 34,
              height: 34,
              borderRadius: VT.r.pill,
              border: "none",
              background: VT.bgSoft,
              color: VT.inkSoft,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: /* @__PURE__ */ jsx10("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: /* @__PURE__ */ jsx10("path", { d: "M6 6l12 12M18 6L6 18" }) })
          }
        ),
        submitted ? /* @__PURE__ */ jsxs9("div", { style: { textAlign: "center", padding: mobile ? "48px 24px" : "56px 36px" }, children: [
          /* @__PURE__ */ jsx10("div", { style: {
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: VT.success,
            color: "#fff",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 20px",
            boxShadow: `0 0 0 8px ${VT.successSoft}`
          }, children: /* @__PURE__ */ jsx10("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", children: /* @__PURE__ */ jsx10("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
          /* @__PURE__ */ jsx10("h2", { style: { fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }, children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0433\u043E\u043B\u043E\u0441 \u0443\u0447\u043B\u0438" }),
          /* @__PURE__ */ jsxs9("p", { style: { fontSize: 15, color: VT.inkSoft, maxWidth: 380, margin: "10px auto 0", lineHeight: 1.5 }, children: [
            "\u0417\u0430\u0441\u0447\u0438\u0442\u0430\u043B\u0438 ",
            n,
            " ",
            fbPlural(n),
            ". \u041A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E \u043F\u0443\u043D\u043A\u0442\u0443 \u043D\u0430\u0431\u0435\u0440\u0451\u0442\u0441\u044F 10 \u2014 \u0431\u0435\u0440\u0451\u043C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443",
            contact.trim() ? " \u0438 \u043D\u0430\u043F\u0438\u0448\u0435\u043C \u0432\u0430\u043C." : ". \u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442."
          ] }),
          /* @__PURE__ */ jsx10("div", { style: { marginTop: 24 }, onClick: () => setOpen(false), children: /* @__PURE__ */ jsx10(Btn, { variant: "secondary", size: "sm", style: { cursor: "pointer" }, children: "\u0413\u043E\u0442\u043E\u0432\u043E" }) })
        ] }) : /* @__PURE__ */ jsxs9("div", { style: { padding: mobile ? "26px 20px 22px" : "30px 32px 26px" }, children: [
          /* @__PURE__ */ jsx10("h2", { style: { fontSize: mobile ? 21 : 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 40px 8px 0", lineHeight: 1.12 }, children: "\u0421\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0435\u0433\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442" }),
          /* @__PURE__ */ jsx10("p", { style: { fontSize: 14, color: VT.inkSoft, margin: 0, maxWidth: 440, lineHeight: 1.45 }, children: "\u041D\u0430\u0431\u0438\u0440\u0430\u0435\u043C 10 \u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u043F\u043E \u043F\u0443\u043D\u043A\u0442\u0443 \u2014 \u0431\u0435\u0440\u0451\u043C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443. \u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u043B\u044E\u0434\u0435\u0439 \u043F\u0440\u043E\u0441\u044F\u0442 \u043E\u0434\u043D\u043E \u0438 \u0442\u043E \u0436\u0435, \u0442\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C." }),
          /* @__PURE__ */ jsxs9("span", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            marginTop: 14,
            fontSize: 12.5,
            color: VT.inkSoft,
            fontWeight: 500,
            background: VT.white,
            border: `1px solid ${VT.line}`,
            padding: "6px 12px",
            borderRadius: VT.r.pill,
            whiteSpace: "nowrap"
          }, children: [
            /* @__PURE__ */ jsx10("span", { style: { width: 7, height: 7, borderRadius: "50%", background: VT.success, boxShadow: `0 0 0 4px ${VT.successSoft}` } }),
            /* @__PURE__ */ jsx10("b", { style: { color: VT.ink, fontVariantNumeric: "tabular-nums" }, children: baseTotal + n }),
            "\xA0\u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E"
          ] }),
          /* @__PURE__ */ jsx10(
            FBVoteSection,
            {
              title: "\u0425\u043E\u0447\u0443 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
              items: FB_SOURCES,
              votes,
              onToggle: toggle,
              mobile,
              baseOf,
              ownVal: ownSrc,
              ownShown: showOwnSrc,
              onOwnShow: () => setShowOwnSrc(true),
              onOwnChange: setOwnSrc,
              ownPlaceholder: "\u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430"
            }
          ),
          /* @__PURE__ */ jsx10(
            FBVoteSection,
            {
              title: "\u0425\u043E\u0447\u0443 \u0444\u0438\u0447\u0443",
              items: FB_FEATURES,
              votes,
              onToggle: toggle,
              mobile,
              baseOf,
              ownVal: ownFeat,
              ownShown: showOwnFeat,
              onOwnShow: () => setShowOwnFeat(true),
              onOwnChange: setOwnFeat,
              ownPlaceholder: "\u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u0447\u0438"
            }
          ),
          /* @__PURE__ */ jsxs9("div", { style: {
            marginTop: 20,
            paddingLeft: 15,
            borderLeft: `3px solid ${awake ? VT.accent : VT.line}`,
            opacity: awake ? 1 : 0.5,
            pointerEvents: awake ? "auto" : "none",
            transition: "opacity .3s, border-color .3s"
          }, children: [
            /* @__PURE__ */ jsxs9("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
              /* @__PURE__ */ jsx10("span", { style: {
                flex: "0 0 auto",
                width: 28,
                height: 28,
                borderRadius: "50%",
                marginTop: 1,
                border: `2px solid ${awake ? VT.success : VT.line}`,
                background: awake ? VT.success : VT.white,
                color: "#fff",
                display: "grid",
                placeItems: "center",
                transition: "all .3s"
              }, children: awake && /* @__PURE__ */ jsx10("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", children: /* @__PURE__ */ jsx10("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
              /* @__PURE__ */ jsxs9("div", { children: [
                /* @__PURE__ */ jsx10("strong", { style: { display: "block", fontSize: 15.5, fontWeight: 700 }, children: "\u041D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u043E\u0433\u0434\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u043C" }),
                /* @__PURE__ */ jsx10("span", { style: { display: "block", fontSize: 13, color: VT.inkSoft, marginTop: 3, lineHeight: 1.4 }, children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u2014 \u0441\u043E\u043E\u0431\u0449\u0438\u043C, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0448 \u0433\u043E\u043B\u043E\u0441 \u043D\u0430\u0431\u0435\u0440\u0451\u0442 10 \u0438 \u043F\u0443\u043D\u043A\u0442 \u043F\u043E\u043F\u0430\u0434\u0451\u0442 \u0432 \u0440\u0430\u0431\u043E\u0442\u0443. \u041D\u0438\u043A\u043E\u043C\u0443 \u043D\u0435 \u043F\u043E\u043A\u0430\u0436\u0435\u043C \u0438 \u0441\u043F\u0430\u043C\u0438\u0442\u044C \u043D\u0435 \u0431\u0443\u0434\u0435\u043C." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs9("div", { style: { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 11, marginTop: 14 }, children: [
              /* @__PURE__ */ jsx10(FBField, { placeholder: "\u0418\u043C\u044F", value: name, onChange: setName }),
              /* @__PURE__ */ jsx10(FBField, { placeholder: "Email, \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", value: contact, onChange: setContact })
            ] }),
            /* @__PURE__ */ jsx10(FBReveal, { label: "+ \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439", shown: showMsg, onShow: () => setShowMsg(true), children: /* @__PURE__ */ jsx10(FBField, { textarea: true, placeholder: "\u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C", value: msg, onChange: setMsg }) })
          ] }),
          error && /* @__PURE__ */ jsx10("p", { style: { marginTop: 14, marginBottom: 0, fontSize: 13.5, fontWeight: 500, color: VT.danger }, children: error }),
          /* @__PURE__ */ jsxs9("div", { style: { display: "flex", alignItems: "center", gap: 16, marginTop: error ? 12 : 24, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsx10("div", { onClick: handleSubmit, style: { width: mobile ? "100%" : "auto" }, children: /* @__PURE__ */ jsx10(
              Btn,
              {
                size: "md",
                icon: submitting ? /* @__PURE__ */ jsx10(Spinner, { size: 15 }) : void 0,
                style: { width: mobile ? "100%" : "auto", opacity: n === 0 || submitting ? 0.55 : 1, cursor: n === 0 || submitting ? "not-allowed" : "pointer" },
                children: submitting ? "\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u2026" : n > 0 ? `\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C ${n} ${fbPlural(n)}` : "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0433\u043E\u043B\u043E\u0441"
              }
            ) }),
            n === 0 && !mobile && !submitting && /* @__PURE__ */ jsx10("span", { style: { fontSize: 13.5, color: VT.inkFaint }, children: "\u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043F\u0443\u043D\u043A\u0442" })
          ] })
        ] })
      ] })
    }
  );
  if (embedded) {
    return /* @__PURE__ */ jsxs9("div", { style: { position: "relative", width: "100%", minHeight: "100%", background: VT.bg, fontFamily: VT.font.sans, color: VT.ink, letterSpacing: "-0.01em" }, children: [
      FauxPage(),
      !isOpen && FloatingBtn({ fixed: false }),
      isOpen && Dialog()
    ] });
  }
  return /* @__PURE__ */ jsxs9(React5.Fragment, { children: [
    !isOpen && FloatingBtn({ fixed: true }),
    isOpen && Dialog()
  ] });
}
var S9_FeedbackPage = S9_FeedbackModal;
var CustomerSite = S7_CustomerSite;
var LeadForm = S8_LeadFormConfirm;
var FeedbackPage = S9_FeedbackModal;

// src/admin-demo/index.tsx
import { useState as useState4 } from "react";
import { Fragment as Fragment10, jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsxs10("svg", { ...props, children: [
        /* @__PURE__ */ jsx11("path", { d: "M4 20V12" }),
        /* @__PURE__ */ jsx11("path", { d: "M10 20V6" }),
        /* @__PURE__ */ jsx11("path", { d: "M16 20V14" }),
        /* @__PURE__ */ jsx11("path", { d: "M22 20V9" })
      ] });
    case "site":
      return /* @__PURE__ */ jsxs10("svg", { ...props, children: [
        /* @__PURE__ */ jsx11("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        /* @__PURE__ */ jsx11("path", { d: "M3 8h18" }),
        /* @__PURE__ */ jsx11("circle", { cx: "7", cy: "6", r: "0.5", fill: "currentColor" })
      ] });
    case "inbox":
      return /* @__PURE__ */ jsxs10("svg", { ...props, children: [
        /* @__PURE__ */ jsx11("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
        /* @__PURE__ */ jsx11("path", { d: "M3 14h5l1.5 2h5L16 14h5" })
      ] });
    case "star":
      return /* @__PURE__ */ jsx11("svg", { ...props, fill: "currentColor", stroke: "none", children: /* @__PURE__ */ jsx11("path", { d: "M12 2 L14.5 8.5 L21.5 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.5 9.3 L9.5 8.5 Z" }) });
    case "list":
      return /* @__PURE__ */ jsxs10("svg", { ...props, children: [
        /* @__PURE__ */ jsx11("path", { d: "M8 6h13" }),
        /* @__PURE__ */ jsx11("path", { d: "M8 12h13" }),
        /* @__PURE__ */ jsx11("path", { d: "M8 18h13" }),
        /* @__PURE__ */ jsx11("circle", { cx: "4", cy: "6", r: "1.2" }),
        /* @__PURE__ */ jsx11("circle", { cx: "4", cy: "12", r: "1.2" }),
        /* @__PURE__ */ jsx11("circle", { cx: "4", cy: "18", r: "1.2" })
      ] });
    case "gear":
      return /* @__PURE__ */ jsxs10("svg", { ...props, children: [
        /* @__PURE__ */ jsx11("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ jsx11("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })
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
  return /* @__PURE__ */ jsxs10("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 6
  }, children: [
    /* @__PURE__ */ jsx11("div", { style: { fontSize: 12.5, color: VT.inkFaint, fontWeight: 500, letterSpacing: "-0.005em" }, children: label }),
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
      /* @__PURE__ */ jsx11("span", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink, lineHeight: 1 }, children: value }),
      /* @__PURE__ */ jsxs10("span", { style: {
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
    /* @__PURE__ */ jsxs10("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, style: { marginTop: 4 }, children: [
      /* @__PURE__ */ jsx11("path", { d: area, fill: color, fillOpacity: "0.12" }),
      /* @__PURE__ */ jsx11("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
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
  return /* @__PURE__ */ jsxs10("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs10("div", { children: [
        /* @__PURE__ */ jsx11("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "\u0422\u0440\u0430\u0444\u0438\u043A \u0437\u0430 30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx11("div", { style: { fontSize: 13, color: VT.inkFaint, marginTop: 2 }, children: "\u041A\u0430\u0436\u0434\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u2014 \u0434\u0435\u043D\u044C. \u0417\u0430\u044F\u0432\u043A\u0438 \u0438\u0434\u0443\u0442 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044F\u043C." })
      ] }),
      /* @__PURE__ */ jsxs10("div", { style: { display: "inline-flex", gap: 14, fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs10("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx11("span", { style: { width: 10, height: 10, borderRadius: "50%", background: VT.accent } }),
          "\u041F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"
        ] }),
        /* @__PURE__ */ jsxs10("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx11("span", { style: { width: 10, height: 2, background: "oklch(0.5 0.13 240)" } }),
          "\u0417\u0430\u044F\u0432\u043A\u0438"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: H, style: { display: "block" }, children: [
      [0, 0.25, 0.5, 0.75, 1].map((t, i) => /* @__PURE__ */ jsxs10("g", { children: [
        /* @__PURE__ */ jsx11(
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
        /* @__PURE__ */ jsx11("text", { x: PAD.left - 8, y: PAD.top + inner.h * t + 4, fontSize: "10", fill: VT.inkFaint, textAnchor: "end", fontFamily: VT.font.mono, children: Math.round(maxV * (1 - t)) })
      ] }, i)),
      /* @__PURE__ */ jsx11("path", { d: visitsArea, fill: VT.accent, fillOpacity: "0.10" }),
      /* @__PURE__ */ jsx11("path", { d: visitsPath, fill: "none", stroke: VT.accent, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      leads.map((l, i) => /* @__PURE__ */ jsx11(
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
      xLabels.map((i, k) => /* @__PURE__ */ jsx11("text", { x: xFor(i), y: H - 8, fontSize: "11", fill: VT.inkFaint, textAnchor: "middle", children: xLabelText[k] }, k))
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
  return /* @__PURE__ */ jsxs10("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsx11("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 4 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442" }),
    /* @__PURE__ */ jsxs10("div", { style: { fontSize: 13, color: VT.inkFaint, marginBottom: 16 }, children: [
      "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0441\u0430\u043C\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B. ",
      BRAND.name,
      " \u0434\u0435\u0440\u0436\u0438\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0441\u0432\u0435\u0436\u0435\u0439."
    ] }),
    /* @__PURE__ */ jsx11("div", { style: { display: "flex", height: 14, borderRadius: 7, overflow: "hidden" }, children: sources.map((s) => /* @__PURE__ */ jsx11("span", { style: { width: `${s.share}%`, background: s.color } }, s.name)) }),
    /* @__PURE__ */ jsx11("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }, children: sources.map((s) => /* @__PURE__ */ jsxs10("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: VT.ink
    }, children: [
      /* @__PURE__ */ jsx11("span", { style: { width: 12, height: 12, borderRadius: 3, background: s.color, flex: "0 0 auto" } }),
      /* @__PURE__ */ jsx11("span", { style: { flex: 1 }, children: s.name }),
      /* @__PURE__ */ jsxs10("b", { style: { fontFamily: VT.font.mono, color: VT.ink }, children: [
        s.share,
        "%"
      ] })
    ] }, s.name)) })
  ] });
}
function AnalyticsTab() {
  return /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs10("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsx11(
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
      /* @__PURE__ */ jsx11(
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
      /* @__PURE__ */ jsx11(
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
      /* @__PURE__ */ jsx11(
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
    /* @__PURE__ */ jsx11(TrafficChart, {}),
    /* @__PURE__ */ jsxs10("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsx11(SourceBreakdown, {}),
      /* @__PURE__ */ jsxs10("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 16,
        padding: 22
      }, children: [
        /* @__PURE__ */ jsx11("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 16 }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E" }),
        /* @__PURE__ */ jsx11("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }, children: [
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u0434\u0435\u043D\u044C", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u2014 142 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F, 8 \u0437\u0430\u044F\u0432\u043E\u043A"],
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u043A\u0430\u043D\u0430\u043B", "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 +24% \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E"],
          ["\u041B\u0443\u0447\u0448\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430", "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u2014 12 \u0437\u0430\u043F\u0438\u0441\u0435\u0439"],
          ["\u0427\u0442\u043E \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C", "\u0421\u0432\u0435\u0436\u0438\u0435 3 \u0444\u043E\u0442\u043E \u0438\u0437 Telegram + 1 \u043D\u043E\u0432\u044B\u0439 \u043E\u0442\u0437\u044B\u0432 \u0441\xA0\u042F.\u041A\u0430\u0440\u0442"]
        ].map(([k, v]) => /* @__PURE__ */ jsxs10("li", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
          /* @__PURE__ */ jsx11("span", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.08em", color: VT.inkFaint }, children: k.toUpperCase() }),
          /* @__PURE__ */ jsx11("span", { style: { fontSize: 14, color: VT.ink }, children: v })
        ] }, k)) })
      ] })
    ] })
  ] });
}
function SiteEditTab() {
  const [title, setTitle] = useState4("\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0432\xA0\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435 \u2014 \u0431\u0435\u0437\xA0\u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438");
  const [sub, setSub] = useState4("\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440 \u0438\xA0\u0441\u0442\u043E\u0439\u043A\u043E\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435. \u041E\u0434\u0438\u043D \u043A\u043B\u0438\u0435\u043D\u0442 \u0432\xA0\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437\xA0\u0441\u043F\u0435\u0448\u043A\u0438, \u0432\xA0\u0442\u0438\u0448\u0438\u043D\u0435, \u0441\xA0\u043A\u043E\u0444\u0435.");
  const [accent, setAccent] = useState4(VT.accent);
  const [sections, setSections] = useState4({ reviews: true, gallery: true, services: true, faq: true, map: true });
  const accentSwatches = [
    VT.accent,
    "oklch(0.5 0.12 250)",
    "oklch(0.5 0.12 145)",
    "oklch(0.5 0.15 25)",
    "oklch(0.45 0.12 285)"
  ];
  const togSection = (k) => setSections((s) => ({ ...s, [k]: !s[k] }));
  return /* @__PURE__ */ jsxs10("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, alignItems: "flex-start" }, children: [
    /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      padding: 22,
      position: "sticky",
      top: 88
    }, children: [
      /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }, children: [
        /* @__PURE__ */ jsx11("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: "\u041F\u0440\u0435\u0432\u044C\u044E" }),
        /* @__PURE__ */ jsx11(Mono, { style: { fontSize: 11.5 }, children: DEMO_SITE.domain })
      ] }),
      /* @__PURE__ */ jsxs10("div", { style: {
        background: VT.bgSoft,
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsxs10("div", { style: { padding: "24px 22px" }, children: [
          /* @__PURE__ */ jsx11("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", color: accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx11("h2", { style: {
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: "10px 0 8px",
            lineHeight: 1.1,
            color: VT.ink,
            textWrap: "balance"
          }, children: title }),
          /* @__PURE__ */ jsx11("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: 0, lineHeight: 1.5 }, children: sub }),
          /* @__PURE__ */ jsx11("div", { style: {
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
        /* @__PURE__ */ jsx11("div", { style: { borderTop: `1px solid ${VT.line}`, padding: 14, background: VT.white }, children: Object.entries({
          services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
          reviews: "\u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432",
          gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
          faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
          map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
        }).map(([k, label]) => /* @__PURE__ */ jsxs10("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 0",
          borderBottom: `1px solid ${VT.lineSoft}`,
          fontSize: 13,
          color: sections[k] ? VT.ink : VT.inkFaint,
          textDecoration: sections[k] ? "none" : "line-through"
        }, children: [
          /* @__PURE__ */ jsx11("span", { style: { color: sections[k] ? VT.success : VT.inkMuted, fontSize: 14 }, children: sections[k] ? "\u25CF" : "\u25CB" }),
          label
        ] }, k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx11(EditorBlock, { title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (H1)", children: /* @__PURE__ */ jsx11(
        "textarea",
        {
          value: title,
          onChange: (e) => setTitle(e.target.value),
          rows: 2,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsx11(EditorBlock, { title: "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", children: /* @__PURE__ */ jsx11(
        "textarea",
        {
          value: sub,
          onChange: (e) => setSub(e.target.value),
          rows: 3,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsxs10(EditorBlock, { title: "\u0426\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u0430", children: [
        /* @__PURE__ */ jsx11("div", { style: { display: "flex", gap: 8 }, children: accentSwatches.map((c) => /* @__PURE__ */ jsx11("button", { onClick: () => setAccent(c), style: {
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
        /* @__PURE__ */ jsx11("div", { style: { marginTop: 8, fontSize: 12, color: VT.inkFaint, fontFamily: VT.font.mono }, children: accent })
      ] }),
      /* @__PURE__ */ jsx11(EditorBlock, { title: "Hero-\u0444\u043E\u0442\u043E", children: /* @__PURE__ */ jsxs10("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        background: VT.bgSoft,
        borderRadius: 10
      }, children: [
        /* @__PURE__ */ jsx11("div", { style: {
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
          border: `1px solid ${VT.line}`
        } }),
        /* @__PURE__ */ jsx11("div", { style: { flex: 1, fontSize: 13, color: VT.inkSoft }, children: "hero-anna-1.jpg \xB7 1.2 MB" }),
        /* @__PURE__ */ jsx11("button", { style: editorSecondaryBtn, children: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C" })
      ] }) }),
      /* @__PURE__ */ jsx11(EditorBlock, { title: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u0438", children: /* @__PURE__ */ jsx11("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: Object.entries({
        services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
        reviews: "\u041E\u0442\u0437\u044B\u0432\u044B (\u2605 \u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0432\u044B\u0431\u0440\u0430\u043D\u044B \u0418\u0418)",
        gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
        faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
        map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
      }).map(([k, label]) => /* @__PURE__ */ jsxs10("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
        cursor: "pointer",
        fontSize: 14,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx11("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: sections[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx11("span", { style: {
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
        /* @__PURE__ */ jsx11("input", { type: "checkbox", checked: sections[k], onChange: () => togSection(k), style: { display: "none" } }),
        label
      ] }, k)) }) }),
      /* @__PURE__ */ jsx11("button", { style: {
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
  return /* @__PURE__ */ jsxs10("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx11("div", { style: { fontSize: 12, fontWeight: 600, color: VT.inkFaint, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }, children: title }),
    children
  ] });
}
function LeadsTab() {
  const [leads, setLeads] = useState4([
    { id: 1, name: "\u0410\u043D\u043D\u0430 \u041F.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \xB7 14:32", source: "TG", status: "new" },
    { id: 2, name: "\u042E\u043B\u0438\u044F \u0412.", contact: "@example_user", service: "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440", when: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F \xB7 12:18", source: "TG", status: "new" },
    { id: 3, name: "\u041C\u0438\u0445\u0430\u0438\u043B \u0421.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "\u0432\u0447\u0435\u0440\u0430 \xB7 18:42", source: "\u0442\u0435\u043B", status: "new" },
    { id: 4, name: "\u0414\u0430\u0440\u044C\u044F \u041D.", contact: "darya@\u25A6\u25A6\u25A6.ru", service: "\u041F\u0435\u0434\u0438\u043A\u044E\u0440", when: "\u0432\u0447\u0435\u0440\u0430 \xB7 11:05", source: "email", status: "answered" },
    { id: 5, name: "\u041E\u043B\u044C\u0433\u0430 \u041C.", contact: "@example_user", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "TG", status: "booked" },
    { id: 6, name: "\u0415\u043B\u0435\u043D\u0430 \u041A.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u0421\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", when: "2 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "TG", status: "booked" },
    { id: 7, name: "\u0422\u0430\u0442\u044C\u044F\u043D\u0430 \u0420.", contact: "@example_user", service: "\u0414\u0438\u0437\u0430\u0439\u043D", when: "3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "\u0442\u0435\u043B", status: "declined" },
    { id: 8, name: "\u041C\u0430\u0440\u0438\u044F \u041B.", contact: "+7 999 \u25A6\u25A6\u25A6-\u25A6\u25A6-\u25A6\u25A6", service: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", when: "4 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434", source: "TG", status: "booked" }
  ]);
  const [filter, setFilter] = useState4("all");
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
  return /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsx11("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: filters.map(([id, label, count]) => /* @__PURE__ */ jsxs10("button", { onClick: () => setFilter(id), style: {
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
      /* @__PURE__ */ jsx11("span", { style: {
        padding: "1px 7px",
        borderRadius: 999,
        background: filter === id ? "rgba(255,255,255,0.18)" : VT.bgSoft,
        fontSize: 11,
        fontFamily: VT.font.mono
      }, children: count })
    ] }, id)) }),
    /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs10("div", { style: {
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
        /* @__PURE__ */ jsx11("span", { children: "\u0418\u041C\u042F" }),
        /* @__PURE__ */ jsx11("span", { children: "\u041A\u041E\u041D\u0422\u0410\u041A\u0422" }),
        /* @__PURE__ */ jsx11("span", { children: "\u0423\u0421\u041B\u0423\u0413\u0410" }),
        /* @__PURE__ */ jsx11("span", { children: "\u041A\u041E\u0413\u0414\u0410" }),
        /* @__PURE__ */ jsx11("span", { children: "\u041A\u0410\u041D\u0410\u041B" }),
        /* @__PURE__ */ jsx11("span", { children: "\u0421\u0422\u0410\u0422\u0423\u0421" }),
        /* @__PURE__ */ jsx11("span", { children: "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F" })
      ] }),
      filtered.map((l) => /* @__PURE__ */ jsxs10("div", { style: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr",
        padding: "14px 18px",
        borderBottom: `1px solid ${VT.lineSoft}`,
        alignItems: "center",
        fontSize: 13.5,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx11("span", { style: { fontWeight: 600 }, children: l.name }),
        /* @__PURE__ */ jsx11("span", { style: { fontFamily: VT.font.mono, color: VT.inkSoft }, children: l.contact }),
        /* @__PURE__ */ jsx11("span", { children: l.service }),
        /* @__PURE__ */ jsx11("span", { style: { color: VT.inkSoft }, children: l.when }),
        /* @__PURE__ */ jsx11("span", { style: { fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: l.source }),
        /* @__PURE__ */ jsx11("span", { children: /* @__PURE__ */ jsx11("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: statusInfo[l.status].bg,
          color: statusInfo[l.status].fg,
          fontSize: 11.5,
          fontWeight: 600
        }, children: statusInfo[l.status].label }) }),
        /* @__PURE__ */ jsxs10("span", { style: { display: "flex", gap: 6 }, children: [
          l.status === "new" && /* @__PURE__ */ jsxs10(Fragment10, { children: [
            /* @__PURE__ */ jsx11("button", { onClick: () => setStatus(l.id, "booked"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.accent,
              color: "#fff",
              border: "none",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer"
            }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C" }),
            /* @__PURE__ */ jsx11("button", { onClick: () => setStatus(l.id, "declined"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.white,
              color: VT.inkSoft,
              border: `1px solid ${VT.line}`,
              fontSize: 11.5,
              cursor: "pointer"
            }, children: "\xD7" })
          ] }),
          l.status === "answered" && /* @__PURE__ */ jsx11("button", { onClick: () => setStatus(l.id, "booked"), style: {
            padding: "5px 10px",
            borderRadius: 6,
            background: VT.accent,
            color: "#fff",
            border: "none",
            fontSize: 11.5,
            fontWeight: 600,
            cursor: "pointer"
          }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u043D" }),
          (l.status === "booked" || l.status === "declined") && /* @__PURE__ */ jsx11("span", { style: { color: VT.inkFaint, fontSize: 11.5 }, children: "\u2014" })
        ] })
      ] }, l.id)),
      filtered.length === 0 && /* @__PURE__ */ jsx11("div", { style: { padding: 40, textAlign: "center", color: VT.inkFaint }, children: "\u0417\u0430\u044F\u0432\u043E\u043A \u0432\xA0\u044D\u0442\u043E\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u0435 \u043D\u0435\u0442" })
    ] })
  ] });
}
function ReviewsTab() {
  const [reviews, setReviews] = useState4([
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
  return /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsxs10("div", { style: {
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
      /* @__PURE__ */ jsxs10("div", { children: [
        /* @__PURE__ */ jsx11("div", { style: { fontSize: 16, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "AI-\u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0441\u0442\u0432\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432" }),
        /* @__PURE__ */ jsxs10("div", { style: { fontSize: 13.5, color: VT.inkSoft, marginTop: 2 }, children: [
          "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E ",
          /* @__PURE__ */ jsx11("b", { children: shownCount }),
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438\u0437 ",
          reviews.length,
          ". ",
          BRAND.name,
          " \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445."
        ] })
      ] }),
      /* @__PURE__ */ jsx11("button", { style: {
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
    /* @__PURE__ */ jsx11("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: reviews.map((r) => /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: r.shown ? `1px solid ${VT.line}` : `1px dashed ${VT.line}`,
      borderRadius: 14,
      padding: 16,
      opacity: r.shown ? 1 : 0.55,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
        /* @__PURE__ */ jsx11("span", { style: {
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
        /* @__PURE__ */ jsxs10("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsx11("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: r.author }),
            r.topPick && /* @__PURE__ */ jsx11("span", { style: {
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
          /* @__PURE__ */ jsxs10("div", { style: {
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
      /* @__PURE__ */ jsxs10("p", { style: {
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
      /* @__PURE__ */ jsxs10("label", { style: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 12.5,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx11("span", { style: {
          width: 30,
          height: 18,
          borderRadius: 9,
          background: r.shown ? VT.success : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx11("span", { style: {
          position: "absolute",
          top: 2,
          left: r.shown ? 14 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s"
        } }) }),
        /* @__PURE__ */ jsx11("input", { type: "checkbox", checked: r.shown, onChange: () => toggleShown(r.id), style: { display: "none" } }),
        r.shown ? "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043D\u0430\xA0\u0441\u0430\u0439\u0442\u0435" : "\u0421\u043A\u0440\u044B\u0442"
      ] })
    ] }, r.id)) })
  ] });
}
function ServicesTab() {
  const [services, setServices] = useState4([
    { id: 1, name: "\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439 \u043C\u0430\u043D\u0438\u043A\u044E\u0440", duration: "60 \u043C\u0438\u043D", price: "1 500 \u20BD" },
    { id: 2, name: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u0433\u0435\u043B\u044C-\u043B\u0430\u043A\u043E\u043C", duration: "90 \u043C\u0438\u043D", price: "2 200 \u20BD" },
    { id: 3, name: "\u041F\u0435\u0434\u0438\u043A\u044E\u0440 \u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", duration: "90 \u043C\u0438\u043D", price: "2 800 \u20BD" },
    { id: 4, name: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u043E\u0433\u0442\u0435\u0439", duration: "", price: "\u043E\u0442 150 \u20BD" },
    { id: 5, name: "\u0421\u043D\u044F\u0442\u0438\u0435 \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", duration: "20 \u043C\u0438\u043D", price: "500 \u20BD" }
  ]);
  const [edit, setEdit] = useState4(null);
  return /* @__PURE__ */ jsxs10("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs10("div", { style: {
      padding: "14px 22px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsxs10("div", { style: { fontSize: 15, fontWeight: 600, color: VT.ink }, children: [
        "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B \u2014 ",
        services.length
      ] }),
      /* @__PURE__ */ jsx11("button", { style: {
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
    services.map((sv) => /* @__PURE__ */ jsx11("div", { style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 0.8fr 0.8fr 0.6fr",
      padding: "14px 22px",
      borderBottom: `1px solid ${VT.lineSoft}`,
      alignItems: "center",
      gap: 10
    }, children: edit === sv.id ? /* @__PURE__ */ jsxs10(Fragment10, { children: [
      /* @__PURE__ */ jsx11(
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
      /* @__PURE__ */ jsx11("input", { defaultValue: sv.duration, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx11("input", { defaultValue: sv.price, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx11("button", { onClick: () => setEdit(null), style: { ...editorSecondaryBtn, fontSize: 12 }, children: "OK" })
    ] }) : /* @__PURE__ */ jsxs10(Fragment10, { children: [
      /* @__PURE__ */ jsx11("span", { style: { fontSize: 14, color: VT.ink, fontWeight: 500 }, children: sv.name }),
      /* @__PURE__ */ jsx11("span", { style: { fontFamily: VT.font.mono, fontSize: 12.5, color: VT.inkSoft }, children: sv.duration || "\u2014" }),
      /* @__PURE__ */ jsx11("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }, children: sv.price }),
      /* @__PURE__ */ jsxs10("span", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx11("button", { onClick: () => setEdit(sv.id), style: { ...editorSecondaryBtn, fontSize: 11 }, children: "\u270E" }),
        /* @__PURE__ */ jsx11(
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
  const [notify, setNotify] = useState4({ tg: true, max: false, email: true });
  const [paused, setPaused] = useState4(false);
  return /* @__PURE__ */ jsxs10("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
    /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430" }),
      /* @__PURE__ */ jsxs10("div", { style: {
        padding: "14px 16px",
        background: VT.bgSoft,
        borderRadius: 10,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxs10("div", { children: [
          /* @__PURE__ */ jsx11("div", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink }, children: DEMO_SITE.plan }),
          /* @__PURE__ */ jsxs10("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 2 }, children: [
            "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \xB7 ",
            DEMO_SITE.nextBilling
          ] })
        ] }),
        /* @__PURE__ */ jsx11("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: "oklch(0.93 0.06 145)",
          color: "oklch(0.32 0.11 145)",
          fontSize: 11.5,
          fontWeight: 600
        }, children: "\u0410\u041A\u0422\u0418\u0412\u041D\u0410" })
      ] }),
      /* @__PURE__ */ jsxs10("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx11("button", { style: editorSecondaryBtn, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443" }),
        /* @__PURE__ */ jsx11("button", { style: { ...editorSecondaryBtn, color: VT.danger }, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx11("div", { style: { fontFamily: VT.font.mono, fontSize: 14, color: VT.ink, marginBottom: 10 }, children: DEMO_SITE.domain }),
      /* @__PURE__ */ jsx11("button", { style: editorSecondaryBtn, children: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D" })
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438" }),
      /* @__PURE__ */ jsx11("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
        ["tg", "Telegram", "@anna_studio", "#229ED9"],
        ["max", "MAX", "\u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E", "oklch(0.55 0.13 285)"],
        ["email", "Email", "anna@studio.ru", VT.accent]
      ].map(([k, label, value, color]) => /* @__PURE__ */ jsxs10("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: notify[k] ? VT.bgSoft : VT.white,
        border: `1px solid ${notify[k] ? VT.line : VT.lineSoft}`,
        borderRadius: 10,
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsx11("span", { style: {
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
        /* @__PURE__ */ jsxs10("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx11("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx11("div", { style: { fontSize: 12, color: VT.inkSoft, fontFamily: VT.font.mono }, children: value })
        ] }),
        /* @__PURE__ */ jsx11("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: notify[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx11("span", { style: {
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
        /* @__PURE__ */ jsx11("input", { type: "checkbox", checked: notify[k], onChange: () => setNotify((n) => ({ ...n, [k]: !n[k] })), style: { display: "none" } })
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u043E\u043C" }),
      /* @__PURE__ */ jsxs10("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx11("button", { onClick: () => setPaused((p) => !p), style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: paused ? VT.success : VT.white,
          color: paused ? "#fff" : VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${paused ? VT.success : VT.line}`,
          cursor: "pointer"
        }, children: paused ? "\u25B6 \u0412\u043E\u0437\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" : "\u23F8 \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443" }),
        /* @__PURE__ */ jsx11("button", { style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: VT.white,
          color: VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${VT.line}`,
          cursor: "pointer"
        }, children: "\u2193 \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432 (HTML + \u0444\u043E\u0442\u043E)" }),
        /* @__PURE__ */ jsx11("button", { style: {
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
  const [tab, setTab] = useState4("analytics");
  const currentTab = TABS.find((t) => t.id === tab);
  return /* @__PURE__ */ jsxs10("div", { style: {
    width: "100%",
    minHeight: "100vh",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    letterSpacing: "-0.005em",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxs10("header", { style: {
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
      /* @__PURE__ */ jsx11(BrandMark, { size: 26, fontSize: 18 }),
      /* @__PURE__ */ jsx11("span", { style: {
        padding: "4px 10px",
        borderRadius: 6,
        background: VT.bgSoft,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0414\u0415\u041C\u041E \xB7 \u041B\u0418\u0427\u041D\u042B\u0419 \u041A\u0410\u0411\u0418\u041D\u0415\u0422" }),
      /* @__PURE__ */ jsx11("div", { style: { flex: 1 } }),
      /* @__PURE__ */ jsxs10("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx11("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.success } }),
        /* @__PURE__ */ jsx11(Mono, { style: { fontSize: 13, color: VT.ink }, children: DEMO_SITE.domain }),
        "\xB7 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D"
      ] }),
      /* @__PURE__ */ jsx11("a", { href: "index.html", style: {
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
      /* @__PURE__ */ jsx11("a", { href: "#", style: {
        padding: "8px 16px",
        borderRadius: 999,
        background: VT.accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        textDecoration: "none"
      }, children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0430\u0439\u0442 \u2197" })
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flex: 1, minHeight: 0 }, children: [
      /* @__PURE__ */ jsxs10("aside", { style: {
        width: 240,
        flex: "0 0 auto",
        background: VT.white,
        borderRight: `1px solid ${VT.line}`,
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }, children: [
        /* @__PURE__ */ jsx11("div", { style: {
          padding: "6px 14px",
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          color: VT.inkFaint,
          fontWeight: 600,
          marginBottom: 4
        }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0410\u041D\u041D\u042B" }),
        TABS.map((t) => /* @__PURE__ */ jsxs10("button", { onClick: () => setTab(t.id), style: {
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
          /* @__PURE__ */ jsx11("span", { style: { color: tab === t.id ? VT.accent : VT.inkSoft, display: "inline-flex" }, children: /* @__PURE__ */ jsx11(NavIcon, { kind: t.icon, size: 17 }) }),
          /* @__PURE__ */ jsx11("span", { style: { flex: 1 }, children: t.label }),
          t.badge && /* @__PURE__ */ jsx11("span", { style: {
            padding: "1px 7px",
            borderRadius: 999,
            background: VT.accent,
            color: "#fff",
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            fontWeight: 700
          }, children: t.badge })
        ] }, t.id)),
        /* @__PURE__ */ jsx11("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsxs10("div", { style: {
          margin: "20px 6px 0",
          padding: 14,
          background: VT.bgSoft,
          borderRadius: 12,
          fontSize: 12.5,
          color: VT.inkSoft,
          lineHeight: 1.5
        }, children: [
          /* @__PURE__ */ jsx11("div", { style: { fontWeight: 600, color: VT.ink, marginBottom: 4 }, children: "\u042D\u0442\u043E \u0434\u0435\u043C\u043E" }),
          "\u0412\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0438\u0436\u0435 \u2014 \u043F\u0440\u0438\u043C\u0435\u0440. \u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u041B\u041A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0442\u0430\u043A \u0436\u0435."
        ] })
      ] }),
      /* @__PURE__ */ jsxs10("main", { style: { flex: 1, minWidth: 0, padding: "24px 28px 60px", overflowX: "hidden" }, children: [
        /* @__PURE__ */ jsx11("div", { style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx11("h1", { style: {
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          margin: 0,
          lineHeight: 1.1,
          color: VT.ink
        }, children: currentTab.label }) }),
        tab === "analytics" && /* @__PURE__ */ jsx11(AnalyticsTab, {}),
        tab === "site" && /* @__PURE__ */ jsx11(SiteEditTab, {}),
        tab === "leads" && /* @__PURE__ */ jsx11(LeadsTab, {}),
        tab === "reviews" && /* @__PURE__ */ jsx11(ReviewsTab, {}),
        tab === "services" && /* @__PURE__ */ jsx11(ServicesTab, {}),
        tab === "settings" && /* @__PURE__ */ jsx11(SettingsTab, {})
      ] })
    ] })
  ] });
}

// src/admin-core/index.tsx
import React7, { useState as useState5, useEffect as useEffect5, useCallback as useCallback3 } from "react";
import { Fragment as Fragment12, jsx as jsx12, jsxs as jsxs11 } from "react/jsx-runtime";
function SkeletonBlock({ width = "100%", height = 14, radius = 4, style }) {
  return /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: {
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
  return /* @__PURE__ */ jsxs11("div", { role: "status", style: {
    padding: "48px 24px",
    textAlign: "center",
    color: VT.inkFaint,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx12("div", { "aria-hidden": "true", style: { fontSize: 28, opacity: 0.6, marginBottom: 8 }, children: "\u2205" }),
    /* @__PURE__ */ jsx12("div", { style: { fontSize: 14.5, fontWeight: 500, color: VT.inkSoft, marginBottom: 4 }, children: title }),
    hint && /* @__PURE__ */ jsx12("div", { style: { fontSize: 13 }, children: hint })
  ] });
}
function ErrorBlock({ title, message, onRetry }) {
  return /* @__PURE__ */ jsx12(Card, { role: "alert", style: {
    padding: 18,
    background: VT.dangerSoft,
    borderColor: "oklch(0.86 0.06 28)"
  }, children: /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { fontSize: 18 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs11("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx12("div", { style: { fontWeight: 600, fontSize: 14, color: "oklch(0.4 0.15 28)" }, children: title || "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A" }),
      message && /* @__PURE__ */ jsx12("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 2 }, children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsx12("button", { type: "button", onClick: onRetry, style: {
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
function RateLimitCountdown({ retryAfterSeconds = 2843 }) {
  const [remaining, setRemaining] = useState5(retryAfterSeconds);
  useEffect5(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxs11("div", { role: "alert", style: {
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
    /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs11("span", { children: [
      "5 \u043D\u0435\u0443\u0434\u0430\u0447 \u0437\u0430 15 \u043C\u0438\u043D \u2014 IP \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ",
      /* @__PURE__ */ jsxs11(Mono, { style: { color: "inherit", fontSize: 13 }, children: [
        mm,
        ":",
        ss
      ] }),
      "."
    ] })
  ] });
}
function TextField({ type = "text", value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono }) {
  return /* @__PURE__ */ jsx12(
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
  return /* @__PURE__ */ jsxs11("div", { style: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    minHeight: "100%",
    background: VT.bgSoft,
    fontFamily: VT.font.sans,
    color: VT.ink,
    letterSpacing: "-0.005em"
  }, children: [
    /* @__PURE__ */ jsxs11("aside", { style: {
      background: VT.bg,
      borderRight: `1px solid ${VT.line}`,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 18 }, children: [
        /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.bg } }),
        /* @__PURE__ */ jsx12("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx12(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 6px", fontSize: 10, borderRadius: 4 }, children: "ADMIN" })
      ] }),
      /* @__PURE__ */ jsx12("nav", { "aria-label": "Admin sections", style: { display: "flex", flexDirection: "column", gap: 4 }, children: NAV.map(([key, name, icon]) => {
        const isActive = activeKey === key;
        const count = badges?.[key];
        return /* @__PURE__ */ jsxs11(
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
              /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { fontSize: 15, width: 18, display: "inline-flex" }, children: icon }),
              name,
              typeof count === "number" && count > 0 && /* @__PURE__ */ jsx12(Badge, { kind: "warn", style: { marginLeft: "auto", padding: "1px 7px", fontSize: 10, borderRadius: 999 }, children: count })
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxs11("div", { style: { marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { width: 24, height: 24, borderRadius: "50%", background: VT.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: VT.accentInk, fontWeight: 600 }, children: u.initials }),
        /* @__PURE__ */ jsx12("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: u.username }),
        /* @__PURE__ */ jsx12(
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
    /* @__PURE__ */ jsx12("main", { style: { minWidth: 0 }, children })
  ] });
}
var LOGIN_ERROR_MSG = {
  invalid_credentials: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C",
  invalid_challenge: "\u0421\u0435\u0441\u0441\u0438\u044F \u0438\u0441\u0442\u0435\u043A\u043B\u0430. \u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0437\u0430\u043D\u043E\u0432\u043E.",
  invalid_code: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.",
  rate_limited: "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u043E\u0434\u043E\u0436\u0434\u0438\u0442\u0435.",
  network_error: "\u041D\u0435\u0442 \u0441\u0432\u044F\u0437\u0438 \u0441 \u0441\u0435\u0440\u0432\u0435\u0440\u043E\u043C.",
  unknown_error: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."
};
function S10_AdminLogin(props) {
  const [uStep, setUStep] = useState5(props.step ?? 1);
  const [uUser, setUUser] = useState5(props.username ?? "founder@samosite.online");
  const [uPass, setUPass] = useState5(props.password ?? "");
  const [uTotp, setUTotp] = useState5(props.totp ?? "");
  const [uBackup, setUBackup] = useState5(props.backupCode ?? "");
  const [uMode, setUMode] = useState5(props.mode ?? "totp");
  const step = props.step ?? uStep;
  const setStep = props.onStepChange ?? setUStep;
  const username = props.username ?? uUser;
  const setUsername = props.onUsernameChange ?? setUUser;
  const password = props.password ?? uPass;
  const setPassword = props.onPasswordChange ?? setUPass;
  const totp = props.totp ?? uTotp;
  const setTotp = props.onTotpChange ?? setUTotp;
  const backupCode = props.backupCode ?? uBackup;
  const setBackupCode = props.onBackupCodeChange ?? setUBackup;
  const mode = props.mode ?? uMode;
  const setMode = props.onModeChange ?? setUMode;
  const {
    loading,
    error,
    rateLimited,
    rateLimitedRetryAfterSeconds = 2843,
    onSubmitCredentials,
    onSubmitCode
  } = props;
  const onSubmit1 = useCallback3((e) => {
    e.preventDefault();
    if (loading) return;
    if (onSubmitCredentials) {
      onSubmitCredentials(username, password);
    } else {
      setStep(2);
    }
  }, [loading, onSubmitCredentials, username, password, setStep]);
  const onSubmit2 = useCallback3((e) => {
    e.preventDefault();
    if (loading) return;
    const code = mode === "totp" ? totp : backupCode;
    if (onSubmitCode) onSubmitCode(mode, code);
  }, [loading, mode, totp, backupCode, onSubmitCode]);
  return /* @__PURE__ */ jsx12("div", { style: {
    background: VT.bgSoft,
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: VT.font.sans,
    padding: 24
  }, children: /* @__PURE__ */ jsxs11(Card, { style: { width: 400, padding: 28 }, children: [
    /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.white } }),
      /* @__PURE__ */ jsx12("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
      /* @__PURE__ */ jsx12(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 7px", fontSize: 10 }, children: "ADMIN" })
    ] }),
    /* @__PURE__ */ jsx12("h1", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }, children: step === 1 ? "\u0412\u0445\u043E\u0434 \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0443" : "\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F" }),
    /* @__PURE__ */ jsx12("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: "0 0 18px" }, children: step === 1 ? "\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F founder. \u0412\u0441\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F." : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F-\u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430." }),
    rateLimited && /* @__PURE__ */ jsx12(RateLimitCountdown, { retryAfterSeconds: rateLimitedRetryAfterSeconds }),
    error && !rateLimited && /* @__PURE__ */ jsx12("div", { role: "alert", style: {
      padding: "8px 12px",
      background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`,
      borderRadius: VT.r.md,
      fontSize: 13,
      color: "oklch(0.4 0.15 28)",
      marginBottom: 14
    }, children: LOGIN_ERROR_MSG[error] || LOGIN_ERROR_MSG.unknown_error }),
    step === 1 ? /* @__PURE__ */ jsxs11("form", { onSubmit: onSubmit1, children: [
      /* @__PURE__ */ jsx12("label", { htmlFor: "ss-admin-email", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "Email" }),
      /* @__PURE__ */ jsx12(
        TextField,
        {
          type: "text",
          value: username,
          onChange: setUsername,
          ariaLabel: "Email",
          autoFocus: true,
          disabled: loading || rateLimited,
          mono: true,
          style: { marginBottom: 10 }
        }
      ),
      /* @__PURE__ */ jsx12("label", { htmlFor: "ss-admin-password", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
      /* @__PURE__ */ jsx12(
        TextField,
        {
          type: "password",
          value: password,
          onChange: setPassword,
          ariaLabel: "\u041F\u0430\u0440\u043E\u043B\u044C",
          placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
          disabled: loading || rateLimited,
          mono: true
        }
      ),
      /* @__PURE__ */ jsx12("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx12(
        Btn,
        {
          type: "submit",
          style: { width: "100%" },
          disabled: loading || rateLimited || !username || !password,
          iconRight: loading ? /* @__PURE__ */ jsx12(Spinner, { size: 14 }) : /* @__PURE__ */ jsx12(IconArrow, {}),
          children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0414\u0430\u043B\u044C\u0448\u0435"
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs11("form", { onSubmit: onSubmit2, children: [
      /* @__PURE__ */ jsx12("div", { role: "tablist", "aria-label": "\u0421\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F", style: { display: "flex", gap: 6, marginBottom: 12, padding: 3, background: VT.bgSoft, borderRadius: VT.r.md, border: `1px solid ${VT.line}` }, children: [
        ["totp", "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440"],
        ["backup", "Backup-\u043A\u043E\u0434"]
      ].map(([key, label]) => {
        const isActive = mode === key;
        return /* @__PURE__ */ jsx12(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": isActive,
            onClick: () => setMode(key),
            disabled: loading || rateLimited,
            style: {
              flex: 1,
              padding: "6px 10px",
              border: "none",
              borderRadius: VT.r.sm,
              background: isActive ? VT.white : "transparent",
              color: isActive ? VT.ink : VT.inkSoft,
              boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.04)" : "none",
              fontSize: 13,
              fontWeight: isActive ? 600 : 500,
              cursor: "pointer",
              fontFamily: "inherit"
            },
            children: label
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsx12("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 6 }, children: mode === "totp" ? "\u041A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430" : "Backup-\u043A\u043E\u0434" }),
      /* @__PURE__ */ jsx12(
        TextField,
        {
          type: "text",
          value: mode === "totp" ? totp : backupCode,
          onChange: mode === "totp" ? setTotp : setBackupCode,
          ariaLabel: mode === "totp" ? "TOTP \u043A\u043E\u0434" : "Backup-\u043A\u043E\u0434",
          inputMode: "numeric",
          maxLength: mode === "totp" ? 6 : 12,
          placeholder: mode === "totp" ? "\xB7 \xB7 \xB7 \xB7 \xB7 \xB7" : "aaaa-bbbb-cccc",
          autoFocus: true,
          disabled: loading || rateLimited,
          mono: true,
          style: { fontSize: 20, letterSpacing: mode === "totp" ? "0.4em" : "0.1em", textAlign: "center" }
        }
      ),
      /* @__PURE__ */ jsxs11("div", { style: { marginTop: 18, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx12(
          Btn,
          {
            variant: "secondary",
            type: "button",
            onClick: () => setStep(1),
            disabled: loading,
            style: { flex: "0 0 auto" },
            children: "\u2190 \u041D\u0430\u0437\u0430\u0434"
          }
        ),
        /* @__PURE__ */ jsx12(
          Btn,
          {
            type: "submit",
            style: { flex: 1 },
            disabled: loading || rateLimited || !(mode === "totp" ? totp : backupCode),
            iconRight: loading ? /* @__PURE__ */ jsx12(Spinner, { size: 14 }) : /* @__PURE__ */ jsx12(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        )
      ] })
    ] })
  ] }) });
}
function StatTile({ label, value, delta, deltaSign, sub, onClick, loading }) {
  const clickable = !!onClick && !loading;
  return /* @__PURE__ */ jsx12(
    Card,
    {
      style: {
        padding: 18,
        cursor: clickable ? "pointer" : "default",
        transition: "transform .15s ease, box-shadow .15s ease"
      },
      children: /* @__PURE__ */ jsxs11(
        "div",
        {
          role: clickable ? "button" : void 0,
          tabIndex: clickable ? 0 : void 0,
          onClick: clickable ? onClick : void 0,
          onKeyDown: clickable ? (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          } : void 0,
          children: [
            /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: String(label).toUpperCase() }),
            loading ? /* @__PURE__ */ jsx12("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsx12(SkeletonBlock, { width: 64, height: 28, radius: 6 }) }) : /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }, children: [
              /* @__PURE__ */ jsx12("span", { style: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em" }, children: value }),
              delta && /* @__PURE__ */ jsxs11("span", { style: {
                fontSize: 12.5,
                fontWeight: 600,
                color: deltaSign === "+" ? VT.success : deltaSign === "-" ? VT.danger : VT.inkSoft
              }, children: [
                deltaSign,
                delta
              ] })
            ] }),
            sub && !loading && /* @__PURE__ */ jsx12("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 4 }, children: sub }),
            loading && /* @__PURE__ */ jsx12("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ jsx12(SkeletonBlock, { width: "50%", height: 10 }) })
          ]
        }
      )
    }
  );
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
  return /* @__PURE__ */ jsxs11("span", { style: {
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
    /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    m[2]
  ] });
}
function FilterChip({ label, active, count, onClick, disabled }) {
  return /* @__PURE__ */ jsxs11(
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
        count != null && /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
      ]
    }
  );
}
function TrendChart({ series, height = 200, labels }) {
  const points = series && series.length ? series.map((s) => typeof s === "number" ? s : s.count ?? 0) : [12, 18, 14, 22, 28, 24, 32, 38, 30, 42, 48, 44, 52];
  const max = Math.max(...points, 1);
  const w = 720;
  const xLabels = labels || ["\u041F\u043D", "\u0412\u0442", "\u0421\u0440", "\u0427\u0442", "\u041F\u0442", "\u0421\u0431", "\u0412\u0441"];
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i / (points.length - 1) * w} ${height - 30 - p / max * (height - 50)}`).join(" ");
  const area = path + ` L ${w} ${height - 30} L 0 ${height - 30} Z`;
  return /* @__PURE__ */ jsxs11("svg", { viewBox: `0 0 ${w} ${height}`, width: "100%", height, preserveAspectRatio: "none", role: "img", "aria-label": "\u0413\u0440\u0430\u0444\u0438\u043A \u0437\u0430\u044F\u0432\u043E\u043A", children: [
    /* @__PURE__ */ jsx12("path", { d: area, fill: VT.accentSoft, opacity: "0.7" }),
    /* @__PURE__ */ jsx12("path", { d: path, fill: "none", stroke: VT.accent, strokeWidth: "2" }),
    points.map((p, i) => /* @__PURE__ */ jsx12("circle", { cx: i / (points.length - 1) * w, cy: height - 30 - p / max * (height - 50), r: "3", fill: VT.bg, stroke: VT.accent, strokeWidth: "1.5" }, i)),
    xLabels.map((l, i) => /* @__PURE__ */ jsx12("text", { x: i / (xLabels.length - 1) * w, y: height - 8, fontSize: "11", fill: VT.inkFaint, fontFamily: "JetBrains Mono, monospace", textAnchor: i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle", children: l }, l + i))
  ] });
}
var MOCK_DASHBOARD = {
  counters: {
    apps_total: 142,
    apps_pending: 12,
    sites_published: 34,
    leads_total: 217,
    feedback_total: 6
  },
  applications_series_14d: [
    { day: "2026-05-06", count: 12 },
    { day: "2026-05-07", count: 18 },
    { day: "2026-05-08", count: 14 },
    { day: "2026-05-09", count: 22 },
    { day: "2026-05-10", count: 28 },
    { day: "2026-05-11", count: 24 },
    { day: "2026-05-12", count: 32 },
    { day: "2026-05-13", count: 38 },
    { day: "2026-05-14", count: 30 },
    { day: "2026-05-15", count: 42 },
    { day: "2026-05-16", count: 48 },
    { day: "2026-05-17", count: 44 },
    { day: "2026-05-18", count: 52 },
    { day: "2026-05-19", count: 8 }
  ]
};
var COUNTER_TILES = [
  { key: "apps_total", label: "\u0412\u0441\u0435\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A", section: "apps" },
  { key: "apps_pending", label: "Pending", section: "apps" },
  { key: "sites_published", label: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043E", section: "sites" },
  { key: "leads_total", label: "\u041B\u0438\u0434\u044B", section: "leads" },
  { key: "feedback_total", label: "Feedback", section: "feedback" }
];
function S11_Dashboard({ data, loading, error, onNavigate, onRefresh, _embed }) {
  const d = data || MOCK_DASHBOARD;
  const Wrap = _embed === false ? React7.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "dashboard", onNavigate };
  return /* @__PURE__ */ jsx12(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs11("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs11("div", { children: [
        /* @__PURE__ */ jsx12(Eyebrow, { children: "DASHBOARD" }),
        /* @__PURE__ */ jsx12("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "10px 0 0" }, children: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" })
      ] }),
      /* @__PURE__ */ jsxs11("div", { style: { display: "flex", gap: 8 }, children: [
        onRefresh && /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" }),
        /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", children: "7 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: "30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", children: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx12(ErrorBlock, { message: error, onRetry: onRefresh }),
    /* @__PURE__ */ jsx12("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: error ? 14 : 0 }, children: COUNTER_TILES.map((t) => /* @__PURE__ */ jsx12(
      StatTile,
      {
        label: t.label,
        value: loading ? "" : d.counters[t.key] ?? 0,
        loading,
        onClick: onNavigate ? () => onNavigate(t.section) : void 0
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxs11("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginTop: 14 }, children: [
      /* @__PURE__ */ jsxs11(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxs11("div", { children: [
            /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0417\u0410\u042F\u0412\u041A\u0418 \xB7 14 \u0414\u041D\u0415\u0419" }),
            /* @__PURE__ */ jsx12("div", { style: { fontSize: 20, fontWeight: 700, marginTop: 4 }, children: loading ? /* @__PURE__ */ jsx12(SkeletonBlock, { width: 80, height: 20 }) : d.applications_series_14d.reduce((s, x) => s + x.count, 0) })
          ] }),
          /* @__PURE__ */ jsx12(Btn, { variant: "ghost", size: "sm", children: "CSV" })
        ] }),
        loading ? /* @__PURE__ */ jsx12(SkeletonBlock, { width: "100%", height: 200, radius: 8 }) : /* @__PURE__ */ jsx12(TrendChart, { series: d.applications_series_14d, labels: d.applications_series_14d.map((s) => s.day.slice(8)) })
      ] }),
      /* @__PURE__ */ jsxs11(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "QUICK \xB7 \u0422\u041E\u041F-5 PENDING" }),
          /* @__PURE__ */ jsx12(
            "button",
            {
              type: "button",
              onClick: () => onNavigate && onNavigate("apps"),
              style: {
                fontSize: 12,
                color: VT.accent,
                textDecoration: "underline",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit"
              },
              children: "\u0432\u0441\u0435 \u2192"
            }
          )
        ] }),
        loading ? /* @__PURE__ */ jsx12("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx12("div", { style: { padding: "8px 10px", borderBottom: `1px solid ${VT.lineSoft}` }, children: /* @__PURE__ */ jsx12(SkeletonBlock, { width: "80%", height: 14 }) }, i)) }) : /* @__PURE__ */ jsx12("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
          ["#A-1842", "TG", "studia-anna \xB7 47 \u043F\u043E\u0441\u0442\u043E\u0432", "12 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1841", "YM", "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \u0421\u0430\u043C\u0430\u0440\u0430 \xB7 24 \u043E\u0442\u0437.", "34 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1840", "Photo", "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u041C\u0430\u0440\u0438\u043D\u0430 \xB7 12 \u0444\u043E\u0442\u043E", "1 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1839", "TG", "\u0414\u043E\u043C \u0440\u0435\u0441\u043D\u0438\u0446 \xB7 89 \u043F\u043E\u0441\u0442\u043E\u0432", "2 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1838", "YM", "\u0421\u0442\u0443\u0434\u0438\u044F \u0439\u043E\u0433\u0438 \xB7 56 \u043E\u0442\u0437.", "3 \u0447 \u043D\u0430\u0437\u0430\u0434"]
        ].map(([id, src, name, ago]) => /* @__PURE__ */ jsxs11(
          "button",
          {
            type: "button",
            onClick: () => onNavigate && onNavigate("apps"),
            style: {
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
              width: "100%"
            },
            children: [
              /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 11, width: 56 }, children: id }),
              /* @__PURE__ */ jsx12(Badge, { kind: "neutral", style: { padding: "2px 7px", fontSize: 10.5, borderRadius: 4 }, children: src }),
              /* @__PURE__ */ jsx12("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
              /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 11 }, children: ago })
            ]
          },
          id
        )) })
      ] })
    ] })
  ] }) });
}
var MOCK_APPS_LIST = {
  total: 142,
  limit: 10,
  offset: 0,
  items: [
    { id: "#A-1842", source_type: "telegram", source_url: "t.me/studia_anna", contact_type: "email", contact_value_masked: "an***@gmail", status: "new", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-19T14:22:00Z" },
    { id: "#A-1841", source_type: "yandex_maps", source_url: "yandex.ru/maps/...", contact_type: "phone", contact_value_masked: "+7***1234", status: "parsing", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-19T13:48:00Z" },
    { id: "#A-1840", source_type: "photos", source_url: "\u2014 \xB7 12 \u0444\u0430\u0439\u043B\u043E\u0432", contact_type: "telegram", contact_value_masked: "@mar***", status: "new", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-19T12:15:00Z" },
    { id: "#A-1839", source_type: "telegram", source_url: "t.me/lashes_dom", contact_type: "phone", contact_value_masked: "+7***5678", status: "generated", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-19T11:02:00Z" },
    { id: "#A-1838", source_type: "yandex_maps", source_url: "yandex.ru/maps/...", contact_type: "email", contact_value_masked: "st***@yandex", status: "parsing", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-19T09:30:00Z" },
    { id: "#A-1837", source_type: "telegram", source_url: "t.me/barber_samara", contact_type: "telegram", contact_value_masked: "@ser***", status: "published", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-18T18:44:00Z" },
    { id: "#A-1836", source_type: "photos", source_url: "\u2014 \xB7 24 \u0444\u0430\u0439\u043B\u0430", contact_type: "email", contact_value_masked: "ku***@mail", status: "rejected", rejection_reason: "\u043D\u0438\u0437\u043A\u043E\u0435 \u043A\u0430\u0447\u0435\u0441\u0442\u0432\u043E", is_manual_review: false, user_id: null, created_at: "2026-05-18T17:22:00Z" },
    { id: "#A-1835", source_type: "yandex_maps", source_url: "yandex.ru/maps/...", contact_type: "phone", contact_value_masked: "+7***9012", status: "published", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-18T15:10:00Z" },
    { id: "#A-1834", source_type: "telegram", source_url: "t.me/psychomarina", contact_type: "email", contact_value_masked: "ma***@gmail", status: "rework", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-18T13:05:00Z" },
    { id: "#A-1833", source_type: "yandex_maps", source_url: "yandex.ru/maps/...", contact_type: "telegram", contact_value_masked: "@fit***", status: "published", rejection_reason: null, is_manual_review: false, user_id: null, created_at: "2026-05-18T11:48:00Z" }
  ]
};
var STATUS_FILTERS = [
  ["all", "\u0412\u0441\u0435"],
  ["pending", "\u041D\u0430 \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438"],
  ["approved", "\u041E\u0434\u043E\u0431\u0440\u0435\u043D\u044B"],
  ["rejected", "\u041E\u0442\u043A\u043B\u043E\u043D\u0435\u043D\u044B"]
];
function formatTs(iso) {
  return iso.replace("T", " ").slice(0, 16);
}
function S12_AppsList({
  data,
  loading,
  error,
  statusFilter = "all",
  onStatusFilterChange,
  onPageChange,
  onRowClick,
  _embed
}) {
  const d = data || MOCK_APPS_LIST;
  const Wrap = _embed === false ? React7.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: () => {
  } };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx12(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs11("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx12(Eyebrow, { children: "\u0417\u0410\u042F\u0412\u041A\u0418" }),
    /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx12("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438" }),
      /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV" })
    ] }),
    error && /* @__PURE__ */ jsx12("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx12(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx12("div", { style: { display: "flex", gap: 6 }, children: STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx12(
        FilterChip,
        {
          label,
          active: statusFilter === key,
          onClick: () => onStatusFilterChange && onStatusFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx12("div", { style: { marginLeft: "auto", display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxs11("div", { style: {
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
        /* @__PURE__ */ jsxs11("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx12("circle", { cx: "11", cy: "11", r: "7" }),
          /* @__PURE__ */ jsx12("path", { d: "M21 21l-4.3-4.3", strokeLinecap: "round" })
        ] }),
        "\u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443, ID, \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs11(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs11("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx12("thead", { children: /* @__PURE__ */ jsx12("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["ID", "\u0421\u043E\u0437\u0434\u0430\u043D\u0430", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0421\u0442\u0430\u0442\u0443\u0441", ""].map((h) => /* @__PURE__ */ jsx12("th", { scope: "col", style: {
          textAlign: "left",
          padding: "12px 16px",
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.inkFaint,
          fontWeight: 500
        }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs11("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => /* @__PURE__ */ jsx12("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [60, 90, 80, 180, 90, 80, 18].map((w, j) => /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx12(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs11(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(row.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(row.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx12(Mono, { children: row.id }) }),
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px", color: VT.inkSoft }, children: /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 12 }, children: formatTs(row.created_at) }) }),
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx12(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: row.source_type }) }),
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 12 }, children: row.source_url || "\u2014" }) }),
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 12 }, children: row.contact_value_masked }) }),
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx12(StatusPill, { status: row.status }) }),
                /* @__PURE__ */ jsx12("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx12("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            row.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx12(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u044F\u0432\u043E\u043A", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0435\u0440\u0432\u0430\u044F \u2014 \u043E\u043D\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && /* @__PURE__ */ jsxs11("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs11("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs11("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx12(
            Btn,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit),
              disabled: d.offset === 0 || loading,
              children: "\u2190"
            }
          ),
          /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs11(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx12(
            Btn,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit),
              disabled: d.offset + d.limit >= d.total || loading,
              children: "\u2192"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}
var MOCK_APP_DETAIL = {
  application: {
    id: "#A-1842",
    source_type: "telegram",
    source_url: "t.me/studia_anna",
    contact_type: "email",
    contact_value_masked: "an***@gmail",
    status: "pending",
    rejection_reason: null,
    is_manual_review: false,
    user_id: "u_1842",
    created_at: "2026-05-19T14:22:00Z"
  },
  user: {
    id: "u_1842",
    contact_type: "email",
    contact_value_masked: "an***@gmail",
    plan: "trial",
    plan_until: "2026-06-19"
  },
  consent: {
    id: "c_4711",
    policy_version: 2,
    created_at: "2026-05-19T14:22:18Z"
  }
};
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
  return /* @__PURE__ */ jsx12("pre", { style: { margin: 0, fontFamily: VT.font.mono, fontSize: 12.5, lineHeight: 1.55, color: VT.inkSoft }, children: lines.map((row, i) => /* @__PURE__ */ jsxs11("div", { children: [
    /* @__PURE__ */ jsx12("span", { style: { color: row[1] }, children: row[0] }),
    row[2] && /* @__PURE__ */ jsx12("span", { style: { color: row[3] }, children: row[2] })
  ] }, i)) });
}
function S13_AppDetail({
  data,
  loading,
  error,
  onApprove,
  onReject,
  onBack,
  actionLoading,
  actionError,
  _embed
}) {
  const d = data || MOCK_APP_DETAIL;
  const [rejectOpen, setRejectOpen] = useState5(false);
  const [rejectReason, setRejectReason] = useState5("");
  const app = d.application;
  const isPending = app && app.status === "pending";
  const Wrap = _embed === false ? React7.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: onBack ? () => onBack() : void 0 };
  const submitReject = () => {
    if (onReject) onReject(app.id, rejectReason || void 0);
    setRejectOpen(false);
    setRejectReason("");
  };
  if (loading) {
    return /* @__PURE__ */ jsx12(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs11("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx12(SkeletonBlock, { width: 140, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx12(SkeletonBlock, { width: 320, height: 28, radius: 6, style: { marginBottom: 20 } }),
      /* @__PURE__ */ jsxs11("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx12(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx12(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) }),
        /* @__PURE__ */ jsx12(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx12(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx12(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs11("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx12(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0417\u0430\u044F\u0432\u043A\u0438"
        }
      ),
      /* @__PURE__ */ jsx12("span", { children: "/" }),
      /* @__PURE__ */ jsx12(Mono, { style: { color: VT.ink }, children: app.id })
    ] }),
    error && /* @__PURE__ */ jsx12("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx12(ErrorBlock, { message: error }) }),
    actionError && /* @__PURE__ */ jsx12("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx12(ErrorBlock, { title: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435", message: actionError }) }),
    /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs11("div", { children: [
        /* @__PURE__ */ jsx12("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440" }),
        /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          app.source_url && /* @__PURE__ */ jsx12("a", { href: `https://${app.source_url.replace(/^https?:\/\//, "")}`, target: "_blank", rel: "noreferrer", style: { color: VT.accent, textDecoration: "underline", textUnderlineOffset: 2 }, children: /* @__PURE__ */ jsx12(Mono, { style: { color: "inherit" }, children: app.source_url }) }),
          /* @__PURE__ */ jsx12("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx12("span", { children: app.contact_value_masked }),
          /* @__PURE__ */ jsx12("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx12(Mono, { children: formatTs(app.created_at) }),
          /* @__PURE__ */ jsx12(StatusPill, { status: app.status }),
          app.is_manual_review && /* @__PURE__ */ jsx12(Badge, { kind: "warn", style: { fontSize: 11, padding: "2px 8px" }, children: "manual review" })
        ] })
      ] }),
      /* @__PURE__ */ jsx12("div", { style: { display: "flex", gap: 8 }, children: isPending ? /* @__PURE__ */ jsxs11(Fragment12, { children: [
        /* @__PURE__ */ jsx12(
          Btn,
          {
            variant: "secondary",
            size: "sm",
            onClick: () => setRejectOpen(true),
            disabled: !!actionLoading,
            style: { color: VT.danger, border: `1px solid ${VT.dangerSoft}` },
            children: "\u041E\u0442\u043A\u043B\u043E\u043D\u0438\u0442\u044C"
          }
        ),
        /* @__PURE__ */ jsx12(
          Btn,
          {
            size: "sm",
            onClick: () => onApprove && onApprove(app.id),
            disabled: !!actionLoading,
            iconRight: actionLoading ? /* @__PURE__ */ jsx12(Spinner, { size: 14 }) : /* @__PURE__ */ jsx12(IconArrow, { size: 14 }),
            children: actionLoading ? "\u041E\u0434\u043E\u0431\u0440\u044F\u0435\u043C\u2026" : "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C"
          }
        )
      ] }) : /* @__PURE__ */ jsxs11(Badge, { kind: app.status === "approved" || app.status === "published" ? "success" : "neutral", style: { padding: "6px 12px" }, children: [
        "\u0423\u0436\u0435 ",
        STATUS_MAP[app.status]?.[2] || app.status
      ] }) })
    ] }),
    rejectOpen && /* @__PURE__ */ jsxs11(Card, { style: { padding: 16, marginBottom: 14, borderColor: "oklch(0.85 0.06 28)" }, children: [
      /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em", color: VT.danger }, children: "\u041F\u0420\u0418\u0427\u0418\u041D\u0410 \u041E\u0422\u041A\u0410\u0417\u0410" }),
      /* @__PURE__ */ jsx12(
        "textarea",
        {
          value: rejectReason,
          onChange: (e) => setRejectReason(e.target.value),
          placeholder: "\u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E. \u0411\u0443\u0434\u0435\u0442 \u0437\u0430\u043B\u043E\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 audit-log.",
          rows: 3,
          style: {
            width: "100%",
            boxSizing: "border-box",
            marginTop: 6,
            padding: "8px 12px",
            background: VT.white,
            border: `1px solid ${VT.line}`,
            borderRadius: VT.r.md,
            fontSize: 13,
            fontFamily: VT.font.sans,
            outline: "none",
            resize: "vertical",
            color: VT.ink
          }
        }
      ),
      /* @__PURE__ */ jsxs11("div", { style: { display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsx12(Btn, { variant: "secondary", size: "sm", onClick: () => {
          setRejectOpen(false);
          setRejectReason("");
        }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx12(
          Btn,
          {
            size: "sm",
            onClick: submitReject,
            disabled: !!actionLoading,
            style: { background: VT.danger },
            children: actionLoading ? "\u041E\u0442\u043A\u043B\u043E\u043D\u044F\u0435\u043C\u2026" : "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C \u043E\u0442\u043A\u0430\u0437"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs11("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs11(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE SNAPSHOT \xB7 JSON" }),
          /* @__PURE__ */ jsx12(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "raw" })
        ] }),
        /* @__PURE__ */ jsx12("div", { style: {
          background: VT.bgSoft,
          borderRadius: VT.r.sm,
          padding: 14,
          border: `1px solid ${VT.line}`,
          maxHeight: 280,
          overflow: "auto"
        }, children: /* @__PURE__ */ jsx12(JsonTree, {}) })
      ] }),
      /* @__PURE__ */ jsxs11(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "GENERATED CONTENT" }),
          /* @__PURE__ */ jsx12(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: "\u2713 sanitized" }),
          /* @__PURE__ */ jsx12(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "\u2197 preview" })
        ] }),
        /* @__PURE__ */ jsxs11("div", { style: { background: VT.bgSoft, borderRadius: VT.r.sm, padding: 14, border: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx12("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.accent, letterSpacing: "0.1em", marginBottom: 6 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx12("div", { style: { fontWeight: 700, fontSize: 20, lineHeight: 1.15, marginBottom: 8 }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
          /* @__PURE__ */ jsx12("div", { style: { fontSize: 13, lineHeight: 1.5, color: VT.inkSoft }, children: "\u0420\u0430\u0431\u043E\u0442\u0430\u044E \u0441 2017 \u0433\u043E\u0434\u0430, \u043F\u0440\u043E\u0448\u043B\u0430 \u043A\u0443\u0440\u0441\u044B \u0432 [SCHOOL]. \u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432 \u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u0441\u043F\u0435\u0448\u043A\u0438, \u0441 \u0447\u0430\u0448\u043A\u043E\u0439 \u043A\u043E\u0444\u0435." }),
          /* @__PURE__ */ jsx12("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx12("div", { "aria-hidden": "true", style: { flex: 1, aspectRatio: "1/1", borderRadius: 6, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` } }, i)) }),
          /* @__PURE__ */ jsx12("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }, children: "\u2248 320 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \xB7 \u2248 12 \u20BD \xB7 \u043C\u043E\u0434\u0435\u043B\u044C: YandexGPT 5 Pro" })
        ] })
      ] })
    ] }),
    (d.user || d.consent) && /* @__PURE__ */ jsxs11("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }, children: [
      d.user && /* @__PURE__ */ jsxs11(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "USER" }),
        /* @__PURE__ */ jsxs11("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx12("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442" }),
            /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 13, color: VT.ink }, children: d.user.contact_value_masked })
          ] }),
          /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx12("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0430\u0440\u0438\u0444" }),
            /* @__PURE__ */ jsx12(
              Badge,
              {
                kind: d.user.plan === "pro" ? "success" : d.user.plan === "trial" ? "info" : "neutral",
                style: { padding: "2px 9px", fontSize: 11.5 },
                children: d.user.plan
              }
            )
          ] }),
          d.user.plan_until && /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx12("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0410\u043A\u0442\u0438\u0432\u0435\u043D \u0434\u043E" }),
            /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 13 }, children: d.user.plan_until })
          ] })
        ] })
      ] }),
      d.consent && /* @__PURE__ */ jsxs11(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "CONSENT" }),
        /* @__PURE__ */ jsxs11("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx12("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0412\u0435\u0440\u0441\u0438\u044F \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438" }),
            /* @__PURE__ */ jsxs11(Mono, { style: { fontSize: 13 }, children: [
              "v",
              d.consent.policy_version
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx12("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" }),
            /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 13 }, children: formatTs(d.consent.created_at) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs11(Card, { style: { marginTop: 14, padding: 18 }, children: [
      /* @__PURE__ */ jsx12(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "AUDIT LOG" }),
      /* @__PURE__ */ jsxs11("div", { style: { marginTop: 10, fontSize: 13, fontFamily: VT.font.mono, color: VT.inkSoft, lineHeight: 1.7 }, children: [
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:22:18" }),
          " \xB7 application.submitted \xB7 ip 195.***.***.42"
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:22:19" }),
          " \xB7 parser.tg.start \xB7 @studia_anna"
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:22:34" }),
          " \xB7 parser.tg.ok \xB7 posts=47 photos=12"
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:22:35" }),
          " \xB7 llm.generate.start \xB7 model=yandexgpt-5-pro"
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:23:02" }),
          " \xB7 llm.generate.ok \xB7 tokens=320 cost_rub=12.40"
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
          " \xB7 sanitize.ok \xB7 bleach.clean allowlist=v1"
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx12("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
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

// src/admin-ops/index.tsx
import React8, { useState as useState6, useMemo as useMemo3 } from "react";
import { Fragment as Fragment14, jsx as jsx13, jsxs as jsxs12 } from "react/jsx-runtime";
function formatTs2(iso) {
  if (!iso) return "\u2014";
  return iso.replace("T", " ").slice(0, 16);
}
function formatRel(iso) {
  if (!iso) return "\u2014";
  return iso.slice(0, 10);
}
function TextField2({ value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono, type = "text" }) {
  return /* @__PURE__ */ jsx13(
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
  const Wrap = _embed === false ? React8.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx13(Eyebrow, { children: "\u0421\u0410\u0419\u0422\u042B" }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx13("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsx13(Btn, { variant: "secondary", size: "sm", children: "CSV" })
    ] }),
    error && /* @__PURE__ */ jsx13("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx13(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsx13("div", { style: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }, children: SITE_STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx13(
      FilterChip,
      {
        label,
        active: statusFilter === key,
        onClick: () => onStatusFilterChange && onStatusFilterChange(key)
      },
      key
    )) }),
    /* @__PURE__ */ jsxs12(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs12("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx13("thead", { children: /* @__PURE__ */ jsx13("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["Subdomain", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "Status", "Last sync", ""].map((h) => /* @__PURE__ */ jsx13("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs12("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx13("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [160, 80, 220, 110, 110, 18].map((w, j) => /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((s) => /* @__PURE__ */ jsxs12(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(s.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(s.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsxs12("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12.5 }, children: [
                  s.subdomain,
                  ".samosite.online",
                  s.custom_domain && /* @__PURE__ */ jsx13(Badge, { kind: "success", style: { marginLeft: 8, padding: "1px 7px", fontSize: 10, borderRadius: 4 }, children: s.custom_domain })
                ] }),
                /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: s.source_type }) }),
                /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: s.source_url }) }),
                /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(StatusPill, { status: s.status }) }),
                /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: formatTs2(s.last_synced_at) }) }),
                /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            s.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx13(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0441\u0430\u0439\u0442\u043E\u0432", hint: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B \xAB\u0417\u0430\u044F\u0432\u043A\u0438\xBB \u2014 \u0442\u0430\u043C \u043E\u0434\u043E\u0431\u0440\u044F\u0439\u0442\u0435 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0439\u0442\u0435." }),
      !showEmpty && /* @__PURE__ */ jsxs12("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs12("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx13(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx13(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs12(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx13(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
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
  const Wrap = _embed === false ? React8.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  if (loading) {
    return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx13(SkeletonBlock, { width: 200, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx13(SkeletonBlock, { width: 280, height: 28, radius: 6, style: { marginBottom: 24 } }),
      /* @__PURE__ */ jsxs12("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx13(SkeletonBlock, { width: "100%", height: 420, radius: 10 }),
        /* @__PURE__ */ jsx13(SkeletonBlock, { width: "100%", height: 420, radius: 10 })
      ] })
    ] }) });
  }
  const renderAction = (action, variant = "secondary") => {
    const enabled = actionEnabled(action, site.status);
    const isLoading = actionLoading === action;
    const anyLoading = !!actionLoading;
    return /* @__PURE__ */ jsx13(
      Btn,
      {
        size: "sm",
        variant,
        disabled: !enabled || anyLoading,
        onClick: () => enabled && onAction && onAction(site.id, action),
        iconRight: isLoading ? /* @__PURE__ */ jsx13(Spinner, { size: 14 }) : variant === "primary" ? /* @__PURE__ */ jsx13(IconArrow, { size: 14 }) : void 0,
        children: isLoading ? "..." : ACTION_LABELS[action]
      },
      action
    );
  };
  const primaryAction = site.status === "pending_review" ? "publish" : site.status === "published" ? "republish" : site.status === "paused" ? "resume_sync" : site.status === "archived" ? "unarchive" : null;
  const secondaryActions = ["publish", "republish", "pause_sync", "resume_sync", "archive", "unarchive"].filter((a) => a !== primaryAction && actionEnabled(a, site.status));
  const safePreviewUrl = previewUrl || (site.subdomain ? `https://${site.subdomain}.samosite.online` : null);
  return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx13(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0421\u0430\u0439\u0442\u044B"
        }
      ),
      /* @__PURE__ */ jsx13("span", { children: "/" }),
      /* @__PURE__ */ jsxs12(Mono, { style: { color: VT.ink }, children: [
        site.subdomain,
        ".samosite.online"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx13("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx13(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxs12("div", { children: [
        /* @__PURE__ */ jsx13("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: site.subdomain.replace(/-/g, " ") }),
        /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          safePreviewUrl && /* @__PURE__ */ jsxs12("a", { href: safePreviewUrl, target: "_blank", rel: "noreferrer", style: { display: "inline-flex", alignItems: "center", gap: 4, color: VT.accent, textDecoration: "underline" }, children: [
            /* @__PURE__ */ jsxs12(Mono, { style: { color: "inherit" }, children: [
              site.subdomain,
              ".samosite.online"
            ] }),
            " \u2197"
          ] }),
          /* @__PURE__ */ jsx13("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx13(StatusPill, { status: site.status }),
          site.published_at && /* @__PURE__ */ jsxs12(Fragment14, { children: [
            /* @__PURE__ */ jsx13("span", { children: "\xB7" }),
            /* @__PURE__ */ jsxs12("span", { children: [
              "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D ",
              formatRel(site.published_at)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }, children: [
        secondaryActions.map((a) => renderAction(a, "secondary")),
        primaryAction && renderAction(primaryAction, "primary")
      ] })
    ] }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs12(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxs12("div", { style: { padding: "10px 14px", borderBottom: `1px solid ${VT.line}`, display: "flex", alignItems: "center", gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
          /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx13("span", { style: { marginLeft: 10 }, children: safePreviewUrl }),
          /* @__PURE__ */ jsx13("span", { style: { marginLeft: "auto" }, children: "preview" })
        ] }),
        safePreviewUrl ? /* @__PURE__ */ jsx13(
          "iframe",
          {
            src: safePreviewUrl,
            title: `${site.subdomain} preview`,
            sandbox: "allow-same-origin allow-scripts allow-popups-to-escape-sandbox",
            style: { width: "100%", aspectRatio: "4 / 3", border: "none", background: VT.bg, display: "block" }
          }
        ) : /* @__PURE__ */ jsxs12("div", { style: { aspectRatio: "4 / 3", background: VT.bg, padding: 14, position: "relative" }, children: [
          /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: "oklch(0.55 0.13 30)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, letterSpacing: "-0.04em" }, children: "\u0410" }),
            /* @__PURE__ */ jsx13("span", { style: { fontSize: 12, fontWeight: 700, color: VT.ink }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
            /* @__PURE__ */ jsx13("span", { style: { marginLeft: "auto", padding: "3px 9px", borderRadius: 999, background: VT.accent, color: "#fff", fontSize: 10, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
          ] }),
          /* @__PURE__ */ jsxs12("div", { style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsx13("div", { style: { fontFamily: VT.font.mono, fontSize: 9, letterSpacing: "0.12em", color: VT.accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
            /* @__PURE__ */ jsx13("div", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", marginTop: 4, lineHeight: 1.15 }, children: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u2014 \u0431\u0435\u0437 \u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" })
          ] }),
          /* @__PURE__ */ jsx13("div", { style: { marginTop: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx13("div", { "aria-hidden": "true", style: { aspectRatio: "1/1", borderRadius: 4, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` } }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        /* @__PURE__ */ jsxs12(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u041B\u0418\u0414\u042B" }),
          /* @__PURE__ */ jsx13("div", { style: { fontSize: 28, fontWeight: 700, marginTop: 6 }, children: d.leads_count }),
          /* @__PURE__ */ jsx13(
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
        /* @__PURE__ */ jsxs12(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A" }),
          /* @__PURE__ */ jsxs12("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx13("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0438\u043F" }),
              /* @__PURE__ */ jsx13(Badge, { kind: "neutral", style: { padding: "2px 9px", fontSize: 11.5, borderRadius: 4 }, children: site.source_type })
            ] }),
            /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx13("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "URL" }),
              /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: site.source_url })
            ] }),
            /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx13("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "Last sync" }),
              /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: formatTs2(site.last_synced_at) })
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
  const Wrap = _embed === false ? React8.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "leads" };
  const [uSelected, setUSelected] = useState6([]);
  const [uModalOpen, setUModalOpen] = useState6(false);
  const [uTotp, setUTotp] = useState6("");
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
  return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "24px 32px 40px", position: "relative" }, children: [
    /* @__PURE__ */ jsx13(Eyebrow, { children: "\u041B\u0418\u0414\u042B" }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx13("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        selected.length > 0 && /* @__PURE__ */ jsxs12(
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
        /* @__PURE__ */ jsxs12(
          Btn,
          {
            size: "sm",
            onClick: openModal,
            disabled: selected.length === 0 || loading,
            iconRight: /* @__PURE__ */ jsx13(IconArrow, { size: 14 }),
            children: [
              "\u{1F513} \u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C (",
              selected.length,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs12(Mono, { style: { fontSize: 12 }, children: [
        "\u0412\u0441\u0435\u0433\u043E: ",
        d.total,
        " \xB7 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E: ",
        d.items?.length ?? 0
      ] }),
      /* @__PURE__ */ jsx13(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 11.5 }, children: "\u{1F512} Fernet AES \u2014 plaintext \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 TOTP-\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F" })
    ] }),
    error && /* @__PURE__ */ jsx13("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx13(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs12(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs12("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx13("thead", { children: /* @__PURE__ */ jsxs12("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx13("th", { scope: "col", style: { width: 48, padding: "12px 16px", textAlign: "left" }, children: /* @__PURE__ */ jsx13(
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
          ["ID", "\u0421\u0430\u0439\u0442", "IP prefix", "Status", "\u041A\u043E\u0433\u0434\u0430"].map((h) => /* @__PURE__ */ jsx13("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h))
        ] }) }),
        /* @__PURE__ */ jsxs12("tbody", { children: [
          loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs12("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(SkeletonBlock, { width: 14, height: 14, radius: 3 }) }),
            [90, 160, 120, 90, 110].map((w, j) => /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(SkeletonBlock, { width: w, height: 12 }) }, j))
          ] }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs12("tr", { style: {
            borderBottom: `1px solid ${VT.lineSoft}`,
            background: isSelected(row.id) ? VT.accentSoft : "transparent"
          }, children: [
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(
              "input",
              {
                type: "checkbox",
                "aria-label": `\u0412\u044B\u0431\u0440\u0430\u0442\u044C ${row.id}`,
                checked: isSelected(row.id),
                onChange: (e) => setSelected(row.id, e.target.checked)
              }
            ) }),
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(Mono, { children: row.id }) }),
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft }, children: row.site_id }),
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: row.ip_prefix || "\u2014" }) }),
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(StatusPill, { status: row.status, size: "sm" }) }),
            /* @__PURE__ */ jsx13("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11.5, color: VT.inkFaint }, children: formatTs2(row.created_at) }) })
          ] }, row.id))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx13(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043B\u0438\u0434\u043E\u0432", hint: "\u041A\u043E\u0433\u0434\u0430 \u043A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442 \u0444\u043E\u0440\u043C\u0443 \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0441\u0430\u0439\u0442\u043E\u0432 \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && !loading && /* @__PURE__ */ jsxs12("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs12("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx13(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx13(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 10, display: "block" }, children: "\u0412\u0441\u0435 \u0440\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432 audit-log (admin_actions) \u2014 admin_id, ip, lead_ids, ts." }),
    modalOpen && /* @__PURE__ */ jsx13(
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
        children: /* @__PURE__ */ jsx13(Card, { style: { width: decryptedRows ? 560 : 380, padding: 24, background: VT.bg }, children: !decryptedRows ? /* @__PURE__ */ jsxs12(Fragment14, { children: [
          /* @__PURE__ */ jsx13("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 TOTP" }),
          /* @__PURE__ */ jsxs12("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C ",
            /* @__PURE__ */ jsx13("b", { children: selected.length }),
            " ",
            selected.length === 1 ? "\u043B\u0438\u0434" : "\u043B\u0438\u0434\u043E\u0432",
            ". \u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430."
          ] }),
          decryptError && /* @__PURE__ */ jsx13("div", { role: "alert", style: {
            padding: "8px 12px",
            background: VT.dangerSoft,
            border: `1px solid oklch(0.85 0.06 28)`,
            borderRadius: VT.r.md,
            fontSize: 13,
            color: "oklch(0.4 0.15 28)",
            marginBottom: 14
          }, children: decryptError }),
          /* @__PURE__ */ jsx13(
            TextField2,
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
          /* @__PURE__ */ jsxs12("div", { style: { marginTop: 14, display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsx13(Btn, { variant: "secondary", size: "sm", style: { flex: 1 }, onClick: cancel, disabled: !!decryptLoading, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
            /* @__PURE__ */ jsx13(
              Btn,
              {
                size: "sm",
                style: { flex: 1 },
                onClick: submitDecrypt,
                disabled: !totp || totp.length < 6 || !!decryptLoading,
                iconRight: decryptLoading ? /* @__PURE__ */ jsx13(Spinner, { size: 14 }) : void 0,
                children: decryptLoading ? "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C\u2026" : "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs12(Fragment14, { children: [
          /* @__PURE__ */ jsxs12("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043E \xB7 ",
            decryptedRows.length
          ] }),
          /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11, color: VT.inkFaint, display: "block", marginBottom: 12 }, children: "\u0417\u0430\u043B\u043E\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 audit-log. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u043E\u043A\u043D\u043E \u2014 plaintext \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442 \u0438\u0437 DOM." }),
          /* @__PURE__ */ jsx13("div", { style: { maxHeight: 360, overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }, children: decryptedRows.map((r) => /* @__PURE__ */ jsxs12(Card, { style: { padding: 12, border: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }, children: [
              /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11.5 }, children: r.id }),
              /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: r.site_id }),
              /* @__PURE__ */ jsx13(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(r.created_at) })
            ] }),
            /* @__PURE__ */ jsx13("div", { style: { fontSize: 13, fontWeight: 500 }, children: r.name || "\u2014" }),
            /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: r.phone || "\u2014" }),
            r.message && /* @__PURE__ */ jsxs12("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 4, lineHeight: 1.5 }, children: [
              "\xAB",
              r.message,
              "\xBB"
            ] })
          ] }, r.id)) }),
          /* @__PURE__ */ jsx13("div", { style: { marginTop: 14, display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx13(Btn, { size: "sm", onClick: cancel, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" }) })
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
  const Wrap = _embed === false ? React8.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "waitlist" };
  const items = d.items || [];
  const readyItems = items.filter((it) => it.ready);
  const restItems = items.filter((it) => !it.ready);
  return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx13(Eyebrow, { children: "WAITLIST \xB7 ADR-0009" }),
    /* @__PURE__ */ jsx13("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 6px" }, children: /* @__PURE__ */ jsx13("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0413\u043E\u043B\u043E\u0441\u0430 \u043F\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C" }) }),
    /* @__PURE__ */ jsxs12("p", { style: { fontSize: 14, color: VT.inkSoft, margin: "0 0 22px", maxWidth: 680 }, children: [
      "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E ",
      /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: "source_name" }),
      ". \u0417\u0435\u043B\u0451\u043D\u044B\u043C \u2014 \u2265",
      d.threshold,
      " \u0433\u043E\u043B\u043E\u0441\u043E\u0432, \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C ADR."
    ] }),
    error && /* @__PURE__ */ jsx13("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx13(ErrorBlock, { message: error }) }),
    !loading && items.length === 0 && /* @__PURE__ */ jsx13(Card, { style: { padding: 0 }, children: /* @__PURE__ */ jsx13(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438", hint: "\u0413\u043E\u043B\u043E\u0441\u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0438\u0437 feedback-\u0444\u043E\u0440\u043C\u044B \u0438 source-detection \xABunknown\xBB." }) }),
    (loading || items.length > 0) && /* @__PURE__ */ jsx13(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs12("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 }, children: [
      /* @__PURE__ */ jsx13("thead", { children: /* @__PURE__ */ jsx13("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0413\u043E\u043B\u043E\u0441\u043E\u0432", "\u041F\u0435\u0440\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435", ""].map((h) => /* @__PURE__ */ jsx13("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
      /* @__PURE__ */ jsxs12("tbody", { children: [
        loading && [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx13("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [200, 100, 140, 120].map((w, j) => /* @__PURE__ */ jsx13("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx13(SkeletonBlock, { width: w, height: 14 }) }, j)) }, i)),
        !loading && readyItems.map((it) => /* @__PURE__ */ jsx13(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name)),
        !loading && readyItems.length > 0 && restItems.length > 0 && /* @__PURE__ */ jsx13("tr", { "aria-hidden": "true", children: /* @__PURE__ */ jsx13("td", { colSpan: 4, style: { padding: "6px 16px", background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: /* @__PURE__ */ jsxs12(Mono, { style: { fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.08em" }, children: [
          "\u2500\u2500\u2500 \u041D\u0418\u0416\u0415 \u041F\u041E\u0420\u041E\u0413\u0410 (",
          d.threshold,
          " \u0413\u041E\u041B\u041E\u0421\u041E\u0412) \u2500\u2500\u2500"
        ] }) }) }),
        !loading && restItems.map((it) => /* @__PURE__ */ jsx13(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name))
      ] })
    ] }) })
  ] }) });
}
function WaitlistRow({ item, threshold, onMarkInDevelopment }) {
  return /* @__PURE__ */ jsxs12("tr", { style: {
    borderBottom: `1px solid ${VT.lineSoft}`,
    background: item.ready ? "oklch(0.97 0.03 145 / 0.5)" : "transparent"
  }, children: [
    /* @__PURE__ */ jsx13("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11, padding: "2px 7px", background: VT.bgSoft, borderRadius: 4 }, children: item.source_name }),
      /* @__PURE__ */ jsx13("span", { style: { fontWeight: 500 }, children: SOURCE_LABELS[item.source_name] || item.source_name })
    ] }) }),
    /* @__PURE__ */ jsx13("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx13("span", { style: { fontSize: 22, fontWeight: 700, color: item.ready ? VT.success : VT.ink }, children: item.votes }),
      item.ready && /* @__PURE__ */ jsxs12(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: [
        "\u2265 ",
        threshold,
        " \xB7 \u041F\u041E\u0420\u0410"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx13("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: item.first_seen }) }),
    /* @__PURE__ */ jsx13("td", { style: { padding: "14px 16px", textAlign: "right" }, children: item.ready ? /* @__PURE__ */ jsx13(Btn, { size: "sm", onClick: () => onMarkInDevelopment && onMarkInDevelopment(item.source_name), children: "\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443" }) : /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2014" }) })
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
  return /* @__PURE__ */ jsx13("span", { style: { display: "inline-flex", padding: "2px 8px", borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: "0.06em" }, children: m[0].toUpperCase() });
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
  const Wrap = _embed === false ? React8.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "feedback" };
  const [selectedId, setSelectedId] = useState6(null);
  const selected = useMemo3(() => {
    const items = d.items || [];
    if (selectedId) return items.find((it) => it.id === selectedId) || items[0] || null;
    return items[0] || null;
  }, [d.items, selectedId]);
  const handleRowClick = (id) => {
    setSelectedId(id);
    if (onRowClick) onRowClick(id);
  };
  return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx13(Eyebrow, { children: "FEEDBACK INBOX" }),
    /* @__PURE__ */ jsx13("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: /* @__PURE__ */ jsx13("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" }) }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx13("div", { style: { display: "flex", gap: 6 }, children: FB_TYPE_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx13(
        FilterChip,
        {
          label,
          active: typeFilter === key,
          onClick: () => onTypeFilterChange && onTypeFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx13("div", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ jsx13(
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
    error && /* @__PURE__ */ jsx13("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx13(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs12(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs12("div", { style: { padding: "14px 16px", borderBottom: `1px solid ${VT.lineSoft}` }, children: [
          /* @__PURE__ */ jsx13(SkeletonBlock, { width: "60%", height: 12, style: { marginBottom: 6 } }),
          /* @__PURE__ */ jsx13(SkeletonBlock, { width: "90%", height: 14 })
        ] }, i)),
        !loading && (d.items || []).length === 0 && /* @__PURE__ */ jsx13(EmptyState, { title: "Inbox \u043F\u0443\u0441\u0442", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0441\u0442\u0430\u0432\u0438\u0442 feedback \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
        !loading && (d.items || []).map((row, i, arr) => {
          const isSelected = selected && selected.id === row.id;
          return /* @__PURE__ */ jsxs12(
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
                /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }, children: [
                  /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11.5 }, children: row.id }),
                  /* @__PURE__ */ jsx13(FbTypePill, { type: row.type }),
                  /* @__PURE__ */ jsx13(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(row.created_at) })
                ] }),
                /* @__PURE__ */ jsx13("div", { style: { fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: row.message }),
                /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: row.email_or_contact_masked || "\u2014" })
              ]
            },
            row.id
          );
        }),
        !loading && (d.items || []).length > 0 && onPageChange && /* @__PURE__ */ jsxs12("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft, borderTop: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsxs12("span", { children: [
            d.offset + 1,
            "\u2013",
            Math.min(d.offset + d.limit, d.total),
            " \u0438\u0437 ",
            d.total
          ] }),
          /* @__PURE__ */ jsxs12("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx13(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0, children: "\u2190" }),
            /* @__PURE__ */ jsx13(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total, children: "\u2192" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx13(Card, { style: { padding: 22 }, children: !selected ? /* @__PURE__ */ jsx13(EmptyState, { title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C \u0441\u043B\u0435\u0432\u0430" }) : /* @__PURE__ */ jsxs12(Fragment14, { children: [
        /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx13(Mono, { children: selected.id }),
          /* @__PURE__ */ jsx13(FbTypePill, { type: selected.type }),
          /* @__PURE__ */ jsx13(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(selected.created_at) })
        ] }),
        /* @__PURE__ */ jsx13("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: selected.type === "source_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" : selected.type === "feature_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0444\u0438\u0447\u0438" : selected.type === "bug" ? "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435" : "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }),
        selected.email_or_contact_masked && /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: selected.email_or_contact_masked }),
        /* @__PURE__ */ jsx13("p", { style: { fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: "14px 0 18px" }, children: selected.message }),
        selected.source_name && /* @__PURE__ */ jsxs12("div", { style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE NAME" }),
          /* @__PURE__ */ jsx13("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ jsx13(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 12 }, children: selected.source_name }) })
        ] }),
        selected.checkboxes && Object.keys(selected.checkboxes).length > 0 && /* @__PURE__ */ jsxs12("details", { open: false, children: [
          /* @__PURE__ */ jsx13("summary", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: VT.inkSoft,
            cursor: "pointer",
            padding: "6px 0",
            listStyle: "none"
          }, children: "CHECKBOXES \xB7 JSONB \u25BE" }),
          /* @__PURE__ */ jsx13("pre", { style: {
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
  return /* @__PURE__ */ jsxs12("span", { style: {
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
    /* @__PURE__ */ jsx13("span", { "aria-hidden": "true", children: on ? "\u2713" : "\u26A0" }),
    label || (on ? "\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D" : "\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D")
  ] });
}
function KeyValueRow({ label, children }) {
  return /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${VT.line}`, gap: 16 }, children: [
    /* @__PURE__ */ jsx13("span", { style: { fontSize: 13, color: VT.inkSoft }, children: label }),
    /* @__PURE__ */ jsx13("div", { children })
  ] });
}
function S19_Settings({ data, loading, error, onRefresh, _embed }) {
  const d = data || MOCK_SETTINGS;
  const Wrap = _embed === false ? React8.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "settings" };
  const envBadge = d.environment === "prod" ? { kind: "danger", label: "PROD" } : d.environment === "staging" ? { kind: "warn", label: "STAGING" } : { kind: "info", label: "DEV" };
  return /* @__PURE__ */ jsx13(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs12("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx13(Eyebrow, { children: "SETTINGS \xB7 SYSTEM" }),
    /* @__PURE__ */ jsxs12("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx13("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430" }),
      onRefresh && /* @__PURE__ */ jsx13(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" })
    ] }),
    error && /* @__PURE__ */ jsx13("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx13(ErrorBlock, { message: error, onRetry: onRefresh }) }),
    loading && /* @__PURE__ */ jsxs12("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsx13(SkeletonBlock, { width: "100%", height: 200, radius: 10 }),
      /* @__PURE__ */ jsx13(SkeletonBlock, { width: "100%", height: 200, radius: 10 })
    ] }),
    !loading && /* @__PURE__ */ jsxs12("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs12(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0421\u0420\u0415\u0414\u0410" }),
        /* @__PURE__ */ jsxs12("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Environment", children: /* @__PURE__ */ jsx13(Badge, { kind: envBadge.kind, style: { padding: "2px 10px", fontSize: 11.5 }, children: envBadge.label }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Log level", children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 13 }, children: d.log_level }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0411\u0410\u0417\u041E\u0412\u042B\u0415 URL" }),
        /* @__PURE__ */ jsxs12("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "App", children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: d.app_base_url }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Landing", children: /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 12 }, children: d.landing_base_url }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Sites", children: /* @__PURE__ */ jsxs12(Mono, { style: { fontSize: 12 }, children: [
            "*.",
            d.sites_base_domain
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "FEATURE FLAGS" }),
        /* @__PURE__ */ jsxs12("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "MAX-bot integration", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.feature_max_bot, label: d.feature_max_bot ? "on" : "off" }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Auto-sync sites", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.feature_auto_sync, label: d.feature_auto_sync ? "on" : "off" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0412\u041D\u0415\u0428\u041D\u0418\u0415 \u0421\u0415\u0420\u0412\u0418\u0421\u042B" }),
        /* @__PURE__ */ jsxs12("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Captcha", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.captcha_configured }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Telegram-\u0431\u043E\u0442", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.tg_bot_configured }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "YandexGPT", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.yandexgpt_configured }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "\u042EKassa", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.yookassa_configured }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "S3 storage", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.s3_configured }) }),
          /* @__PURE__ */ jsx13(KeyValueRow, { label: "Fernet keys", children: /* @__PURE__ */ jsx13(ConfiguredBadge, { on: d.fernet_keys_configured }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx13(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 14, display: "block" }, children: "Read-only snapshot. \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u043A\u0440\u0435\u0442\u043E\u0432 \u043D\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u044E\u0442\u0441\u044F \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0430\u0442\u0443\u0441 \xAB\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D/\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\xBB." })
  ] }) });
}
var SitesList = S14_SitesList;
var SiteDetail = S15_SiteDetail;
var Leads = S16_Leads;
var Waitlist = S17_Waitlist;
var FeedbackInbox = S18_FeedbackInbox;
var Settings = S19_Settings;

// src/auth/index.tsx
import { useState as useState7, useEffect as useEffect6, useCallback as useCallback4 } from "react";
import { jsx as jsx14, jsxs as jsxs13 } from "react/jsx-runtime";
var CUSTOMER_ERROR_MSG = {
  invalid_credentials: "\u041D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043C\u044B \u0432\u0430\u043C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438.",
  rate_limited: null,
  // rendered via CustomerRateLimitNotice w/ countdown
  network_error: "\u0421\u0435\u0442\u044C \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443.",
  unknown_error: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443."
};
function CustomerRateLimitNotice({ retryAfterSeconds = 263 }) {
  const [remaining, setRemaining] = useState7(retryAfterSeconds);
  useEffect6(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const totalMin = Math.ceil(remaining / 60);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxs13("div", { role: "alert", style: {
    padding: "10px 12px",
    background: VT.dangerSoft,
    border: `1px solid oklch(0.85 0.06 28)`,
    borderRadius: VT.r.md,
    fontSize: 13,
    color: "oklch(0.4 0.15 28)",
    marginBottom: 14,
    lineHeight: 1.5
  }, children: [
    /* @__PURE__ */ jsx14("span", { "aria-hidden": "true", style: { marginRight: 6 }, children: "\u26A0\uFE0F" }),
    "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 ",
    totalMin,
    "\xA0\u043C\u0438\u043D \u2014 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",
    " ",
    /* @__PURE__ */ jsxs13("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
      mm,
      ":",
      ss
    ] }),
    "."
  ] });
}
function CustomerErrorNotice({ code }) {
  const msg = CUSTOMER_ERROR_MSG[code] || CUSTOMER_ERROR_MSG.unknown_error;
  if (!msg) return null;
  return /* @__PURE__ */ jsxs13("div", { role: "alert", style: {
    padding: "10px 12px",
    background: VT.dangerSoft,
    border: `1px solid oklch(0.85 0.06 28)`,
    borderRadius: VT.r.md,
    fontSize: 13,
    color: "oklch(0.4 0.15 28)",
    marginBottom: 14,
    lineHeight: 1.5
  }, children: [
    /* @__PURE__ */ jsx14("span", { "aria-hidden": "true", style: { marginRight: 6 }, children: "\u26A0\uFE0F" }),
    msg
  ] });
}
function CLTextField({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  ariaLabel,
  autoComplete,
  autoFocus,
  disabled,
  mono,
  style
}) {
  return /* @__PURE__ */ jsx14(
    "input",
    {
      id,
      type,
      value: value ?? "",
      onChange: (e) => onChange(e.target.value),
      placeholder,
      "aria-label": ariaLabel,
      autoComplete,
      autoFocus,
      disabled,
      style: {
        width: "100%",
        boxSizing: "border-box",
        padding: "11px 13px",
        background: disabled ? VT.bgSoft : VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14.5,
        color: VT.ink,
        fontFamily: mono ? VT.font.mono : VT.font.sans,
        outline: "none",
        ...style
      }
    }
  );
}
function S20_CustomerLogin(props) {
  const [uLogin, setULogin] = useState7(props.login ?? "");
  const [uPass, setUPass] = useState7(props.password ?? "");
  const login = props.login ?? uLogin;
  const password = props.password ?? uPass;
  const setLogin = props.onLoginChange ?? setULogin;
  const setPassword = props.onPasswordChange ?? setUPass;
  const { loading, error, retryAfterSeconds, onSubmit, onCreateSiteClick } = props;
  const isRateLimited = error === "rate_limited";
  const handleSubmit = useCallback4((e) => {
    e.preventDefault();
    if (loading || isRateLimited) return;
    if (onSubmit) onSubmit();
  }, [loading, isRateLimited, onSubmit]);
  return /* @__PURE__ */ jsx14("div", { style: {
    background: VT.bgSoft,
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: VT.font.sans,
    color: VT.ink,
    padding: "40px 24px",
    boxSizing: "border-box"
  }, children: /* @__PURE__ */ jsxs13("div", { style: { width: "100%", maxWidth: 420 }, children: [
    /* @__PURE__ */ jsx14("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18
    }, children: /* @__PURE__ */ jsx14("a", { href: "/", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx14(BrandMark, { size: 26, fontSize: 20 }) }) }),
    /* @__PURE__ */ jsxs13(Card, { style: {
      padding: 28,
      boxShadow: VT.shadow.card,
      borderTop: `2px solid ${VT.success}`
    }, children: [
      /* @__PURE__ */ jsx14("h1", { style: {
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        margin: "0 0 6px",
        lineHeight: 1.2
      }, children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0432\u043E\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" }),
      /* @__PURE__ */ jsx14("p", { style: {
        fontSize: 13.5,
        color: VT.inkSoft,
        margin: "0 0 18px",
        lineHeight: 1.5
      }, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u043F\u0440\u0438\u0441\u043B\u0430\u043B\u0438 \u0432\u0430\u043C \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430." }),
      isRateLimited ? /* @__PURE__ */ jsx14(CustomerRateLimitNotice, { retryAfterSeconds: retryAfterSeconds ?? 263 }) : error && /* @__PURE__ */ jsx14(CustomerErrorNotice, { code: error }),
      /* @__PURE__ */ jsxs13("form", { onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsx14("label", { htmlFor: "ss-customer-login", style: {
          display: "block",
          fontSize: 12,
          color: VT.inkSoft,
          marginBottom: 4,
          fontWeight: 500
        }, children: "\u041B\u043E\u0433\u0438\u043D" }),
        /* @__PURE__ */ jsx14(
          CLTextField,
          {
            id: "ss-customer-login",
            type: "text",
            value: login,
            onChange: setLogin,
            ariaLabel: "\u041B\u043E\u0433\u0438\u043D",
            autoComplete: "username",
            placeholder: "\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, studia-anna",
            autoFocus: true,
            disabled: loading || isRateLimited,
            mono: true,
            style: { marginBottom: 12 }
          }
        ),
        /* @__PURE__ */ jsx14("label", { htmlFor: "ss-customer-password", style: {
          display: "block",
          fontSize: 12,
          color: VT.inkSoft,
          marginBottom: 4,
          fontWeight: 500
        }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
        /* @__PURE__ */ jsx14(
          CLTextField,
          {
            id: "ss-customer-password",
            type: "password",
            value: password,
            onChange: setPassword,
            ariaLabel: "\u041F\u0430\u0440\u043E\u043B\u044C",
            autoComplete: "current-password",
            placeholder: "\u041F\u0430\u0440\u043E\u043B\u044C \u0438\u0437 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F",
            disabled: loading || isRateLimited,
            mono: true
          }
        ),
        /* @__PURE__ */ jsx14("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx14(
          Btn,
          {
            type: "submit",
            style: { width: "100%" },
            disabled: loading || isRateLimited || !login || !password,
            iconRight: loading ? /* @__PURE__ */ jsx14(Spinner, { size: 14 }) : /* @__PURE__ */ jsx14(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs13("div", { style: {
      marginTop: 22,
      textAlign: "center",
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0415\u0449\u0451 \u043D\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430?",
      " ",
      onCreateSiteClick ? /* @__PURE__ */ jsxs13(
        "button",
        {
          type: "button",
          onClick: onCreateSiteClick,
          style: {
            border: "none",
            background: "transparent",
            color: VT.accent,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 13.5,
            padding: 0
          },
          children: [
            "\u0421\u0434\u0435\u043B\u0430\u0442\u044C\xA0",
            /* @__PURE__ */ jsx14("span", { "aria-hidden": "true", children: "\u2192" })
          ]
        }
      ) : /* @__PURE__ */ jsxs13("a", { href: "/", style: {
        color: VT.accent,
        fontWeight: 600,
        textDecoration: "none"
      }, children: [
        "\u0421\u0434\u0435\u043B\u0430\u0442\u044C\xA0",
        /* @__PURE__ */ jsx14("span", { "aria-hidden": "true", children: "\u2192" })
      ] })
    ] }),
    /* @__PURE__ */ jsx14("div", { style: {
      marginTop: 14,
      textAlign: "center",
      fontSize: 11.5,
      color: VT.inkFaint,
      lineHeight: 1.5
    }, children: "\u0414\u043E\u0441\u0442\u0443\u043F \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0432\u044B\u0434\u0430\u0451\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430 \u2014 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C." })
  ] }) });
}
var CustomerLogin = S20_CustomerLogin;

// src/source/index.tsx
import { jsx as jsx15, jsxs as jsxs14 } from "react/jsx-runtime";
function MiniHero({ url }) {
  return /* @__PURE__ */ jsxs14("div", { style: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.pill,
    padding: 8,
    boxShadow: VT.shadow.card
  }, children: [
    /* @__PURE__ */ jsxs14("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }, children: [
      /* @__PURE__ */ jsx15(IconLink, {}),
      /* @__PURE__ */ jsx15("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: VT.ink,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }, children: url })
    ] }),
    /* @__PURE__ */ jsx15(Btn, { iconRight: /* @__PURE__ */ jsx15(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
  ] });
}
function StateBadge({ kind, icon, children }) {
  return /* @__PURE__ */ jsxs14("span", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "8px 14px",
    borderRadius: VT.r.pill,
    background: kind === "success" ? VT.successSoft : kind === "info" ? VT.infoSoft : kind === "warn" ? VT.warnSoft : VT.bgSoft,
    color: kind === "success" ? "oklch(0.34 0.12 145)" : kind === "info" ? "oklch(0.38 0.10 240)" : kind === "warn" ? "oklch(0.40 0.13 70)" : VT.inkSoft,
    fontSize: 14,
    fontWeight: 500
  }, children: [
    /* @__PURE__ */ jsx15("span", { style: { width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: icon }),
    children
  ] });
}
var STATES = [
  {
    id: "loading",
    label: "1 \xB7 Loading",
    kind: "neutral",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "neutral", icon: /* @__PURE__ */ jsx15(Spinner, {}), children: "\u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" }),
    note: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u043B \u0442\u0438\u043F (<100ms). \u0417\u0430\u043F\u0440\u043E\u0441 preview API \u0432 \u0444\u043E\u043D\u0435, 3s timeout.",
    api: "GET /api/preview?url=\u2026 (debounced 300ms)"
  },
  {
    id: "tg-success",
    label: "2 \xB7 \u2713 Telegram",
    kind: "success",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx15("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx15("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B \u2014 \u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E" }),
    note: "Bot API getChat + getChatHistory(1). CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB \u0430\u043A\u0442\u0438\u0432\u043D\u0430 \u2014 open Submit modal.",
    api: 'GET /api/preview \u2192 {source:"telegram", posts:47, photos:12}'
  },
  {
    id: "ymaps-success",
    label: "3 \xB7 \u2713 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    kind: "success",
    url: "yandex.ru/maps/-/CDvI7QJM",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx15("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx15("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u2014 \u043D\u0430\u0448\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443, 24 \u043E\u0442\u0437\u044B\u0432\u0430 \u0438 18 \u0444\u043E\u0442\u043E" }),
    note: "Geosearch API find. \u0415\u0441\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u2192 fallback \u043A \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u043E\u043C\u0443 \u2713 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B.",
    api: 'GET /api/preview \u2192 {source:"yandex_maps", reviews:24, photos:18}'
  },
  {
    id: "preview-timeout",
    label: "4 \xB7 \u2713 \u0411\u0435\u0437 \u0447\u0438\u0441\u0435\u043B (preview timeout >3s)",
    kind: "success",
    url: "t.me/privatechannel",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx15("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx15("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B" }),
    note: "FR-005a: regex \u043E\u0442\u0434\u0430\u043B \u0442\u0438\u043F, preview API \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0437\u0430 3s \u2192 \u0431\u0435\u0439\u0434\u0436 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E.",
    api: "Timeout fallback \u2014 UI \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 submit"
  },
  {
    id: "ig-success",
    label: "5 \xB7 \u2713 Instagram",
    kind: "success",
    url: "instagram.com/master.nails.spb",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx15("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx15("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Instagram" }),
    note: "0.3.0: Instagram \u0442\u0435\u043F\u0435\u0440\u044C \u043E\u0431\u044B\u0447\u043D\u044B\u0439 ok-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u0417\u0430\u044F\u0432\u043A\u0430 \u0438\u0434\u0451\u0442 \u0432 \u043E\u0431\u0449\u0443\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0440\u0443\u0447\u043D\u0430\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0440\u0435\u0448\u0438\u0442 \u0447\u0442\u043E \u0432\u044B\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0442\u044C.",
    api: 'GET /api/preview \u2192 {source:"instagram", status:"ok"}'
  },
  {
    id: "vk-waitlist",
    label: "6 \xB7 \u2139\uFE0F \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u2014 waitlist + photo CTA",
    kind: "info",
    url: "vk.com/master_nails",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx15("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
    waitlist: true,
    photoCta: true,
    note: "Identical pattern to IG. \u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u0430\u044F CTA: \xAB\u0418\u043B\u0438 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B + \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442\xBB.",
    api: 'POST /api/feedback { type:"source_request", source_name:"vk" }'
  },
  {
    id: "other-waitlist",
    label: "7 \xB7 \u2139\uFE0F \u0414\u0440\u0443\u0433\u043E\u0439 known \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A (2GIS / Avito / WA / YT / \u0414\u0437\u0435\u043D)",
    kind: "info",
    url: "2gis.ru/samara/firm/70000001045896531",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx15("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "2GIS \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
    waitlist: true,
    photoCta: false,
    note: "\u0411\u0435\u0437 photo CTA \u2014 2GIS/Avito/WA \u043D\u0435 \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u044E\u0442\u0441\u044F \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u043E\u043C \u043F\u0440\u043E\u0444\u0438\u043B\u044F.",
    api: 'POST /api/feedback { type:"source_request", source_name:"2gis" }'
  },
  {
    id: "unknown-url",
    label: "8 \xB7 \u26A0\uFE0F \u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
    kind: "warn",
    url: "https://my-portfolio.example.com",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx15("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E?" }),
    unknownInput: true,
    note: "Open input. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u043A\u0430\u043A source_request c source_name=user-typed \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438.",
    api: 'POST /api/feedback { type:"source_request", source_name:<user>, source_url_raw:<url> }'
  },
  {
    id: "not-url",
    label: "9 \xB7 \u26A0\uFE0F \u041D\u0435 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438 \u043D\u0435 \u0444\u0430\u0439\u043B",
    kind: "warn",
    url: "\u043C\u0430\u0441\u0442\u0435\u0440 \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430",
    badge: /* @__PURE__ */ jsx15(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx15("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" }),
    note: "CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB disabled, fallback-\u0441\u0441\u044B\u043B\u043A\u0430 \xAB\u{1F4F7} \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E\xBB \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u0430.",
    api: "\u2014 (client-side only)"
  }
];
function WaitlistCapture({ source, withPhotoCta }) {
  const label = source === "instagram" ? "Instagram" : source === "vk" ? "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435" : source === "2gis" ? "2GIS" : source;
  return /* @__PURE__ */ jsxs14("div", { style: {
    marginTop: 12,
    background: VT.infoSoft,
    border: `1px solid oklch(0.85 0.05 240)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsxs14("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.32 0.10 240)" }, children: [
      "\u041D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u043E\u0433\u0434\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u043C ",
      label
    ] }),
    /* @__PURE__ */ jsxs14("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx15(Input, { placeholder: "email \u0438\u043B\u0438 @telegram", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx15(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })
    ] }),
    withPhotoCta && /* @__PURE__ */ jsxs14("div", { style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px dashed oklch(0.85 0.05 240)`,
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0418\u043B\u0438 \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F:",
      /* @__PURE__ */ jsxs14("a", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginLeft: 8,
        color: VT.accent,
        fontWeight: 600,
        textDecoration: "underline",
        textUnderlineOffset: 3
      }, children: [
        "\u{1F4F7} \u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F + \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442",
        /* @__PURE__ */ jsx15(IconArrow, { size: 14 })
      ] })
    ] })
  ] });
}
function UnknownSourceInput() {
  return /* @__PURE__ */ jsxs14("div", { style: {
    marginTop: 12,
    background: VT.warnSoft,
    border: `1px solid oklch(0.85 0.06 70)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx15("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.36 0.13 70)" }, children: "\u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A?" }),
    /* @__PURE__ */ jsxs14("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10 }, children: [
      /* @__PURE__ */ jsx15(Input, { placeholder: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \xAB\u0414\u0437\u0435\u043D\xBB \u0438\u043B\u0438 \xAB\u0441\u0432\u043E\u0439 \u0431\u043B\u043E\u0433\xBB)", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx15(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u043E\u0431\u0449\u0438\u0442\u044C" })
    ] })
  ] });
}
function StateRow({ s }) {
  return /* @__PURE__ */ jsx15(Card, { style: { padding: 24 }, children: /* @__PURE__ */ jsxs14("div", { style: { display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 32 }, children: [
    /* @__PURE__ */ jsxs14("div", { children: [
      /* @__PURE__ */ jsx15("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsx15(MiniHero, { url: s.url }),
      /* @__PURE__ */ jsx15("div", { style: { marginTop: 12, paddingLeft: 16 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx15(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx15(UnknownSourceInput, {})
    ] }),
    /* @__PURE__ */ jsxs14("div", { style: { borderLeft: `1px dashed ${VT.line}`, paddingLeft: 24 }, children: [
      /* @__PURE__ */ jsx15("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: "\u041B\u041E\u0413\u0418\u041A\u0410" }),
      /* @__PURE__ */ jsx15("div", { style: { fontSize: 14, lineHeight: 1.5, color: VT.ink }, children: s.note }),
      /* @__PURE__ */ jsx15("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, margin: "16px 0 6px" }, children: "API" }),
      /* @__PURE__ */ jsx15("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 12,
        color: VT.inkSoft,
        background: VT.bgSoft,
        padding: "8px 12px",
        borderRadius: VT.r.sm,
        wordBreak: "break-all"
      }, children: s.api })
    ] })
  ] }) });
}
function S2_Desktop() {
  return /* @__PURE__ */ jsxs14("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "40px 56px 64px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsxs14("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx15(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 SOURCE DETECTION" }),
      /* @__PURE__ */ jsx15(Mono, { style: { fontSize: 12 }, children: "FR-005, FR-005a, ADR-0009" })
    ] }),
    /* @__PURE__ */ jsx15("h2", { style: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.1 }, children: "\u0411\u0435\u0439\u0434\u0436\u0438 \u043F\u043E\u0434 input \u2014 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F live preview" }),
    /* @__PURE__ */ jsx15("p", { style: { fontSize: 16, lineHeight: 1.5, color: VT.inkSoft, maxWidth: 820, margin: "0 0 32px" }, children: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0437\u0430 <100ms \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0431\u0435\u0439\u0434\u0436. \u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E preview API (3s timeout) \u0434\u043E\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0447\u0438\u0441\u043B\u0430\u043C\u0438. MVP-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438: Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B. \u041E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u2014 waitlist + \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u0430\u044F CTA \u043D\u0430 \u0444\u043E\u0442\u043E-\u0444\u043B\u043E\u0443." }),
    /* @__PURE__ */ jsx15("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: STATES.map((s) => /* @__PURE__ */ jsx15(StateRow, { s }, s.id)) })
  ] });
}
function S2_Mobile() {
  const mobile = STATES.filter((s) => ["loading", "tg-success", "ig-success", "unknown-url"].includes(s.id));
  return /* @__PURE__ */ jsxs14("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "20px 16px 40px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsx15(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 MOBILE" }),
    /* @__PURE__ */ jsx15("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "12px 0 18px", lineHeight: 1.15 }, children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0431\u0435\u0439\u0434\u0436\u0430 \u2014 4 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445" }),
    /* @__PURE__ */ jsx15("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: mobile.map((s) => /* @__PURE__ */ jsxs14(Card, { style: { padding: 14 }, children: [
      /* @__PURE__ */ jsx15("div", { style: { fontSize: 10.5, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 6 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsxs14("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.lg,
        padding: 10
      }, children: [
        /* @__PURE__ */ jsxs14("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 8px" }, children: [
          /* @__PURE__ */ jsx15(IconLink, {}),
          /* @__PURE__ */ jsx15("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s.url })
        ] }),
        /* @__PURE__ */ jsx15(Btn, { iconRight: /* @__PURE__ */ jsx15(IconArrow, {}), style: { borderRadius: VT.r.md, width: "100%" }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
      ] }),
      /* @__PURE__ */ jsx15("div", { style: { marginTop: 10 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx15(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx15(UnknownSourceInput, {})
    ] }, s.id)) })
  ] });
}
var SourceDetectionBadge = S2_Desktop;
export {
  AdminChrome,
  AdminDashboard,
  AdminLogin,
  AnalyticsSection,
  AppDetail,
  AppsList,
  BRAND,
  Badge,
  BaseWorkSection,
  BentoFamily,
  BrandMark,
  Btn,
  CanonStyles,
  Card,
  Checkbox,
  ChipStrip,
  ClientAdminDemo,
  ConceptA_Desktop,
  ConceptA_Mobile,
  Confirmation,
  CustomerLogin,
  CustomerSite,
  CycleSection,
  DEFAULT_ANCHORS,
  DisplayFamily,
  EXAMPLES,
  EditorialFamily,
  EmptyState,
  ErrorBlock,
  ExamplesSection,
  Eyebrow,
  FAQ_ITEMS,
  FaqSection,
  FeedbackInbox,
  FeedbackPage,
  FilterChip,
  FinalCtaSection,
  GENERIC_THEME_OPTIONS,
  HeroBlock,
  HeroSection,
  IconArrow,
  IconLink,
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
  Input,
  Landing,
  LeadForm,
  Leads,
  Logo,
  MiniChrome,
  MondaySection,
  Mono,
  NICHE_DEMO_DRAFTS,
  NICHE_LIB,
  NICHE_LIB_V2,
  OwnershipSection,
  PHOTO_LIMITS,
  PhotoDrawer,
  PresetRenderer,
  PricingSection,
  RateLimitCountdown,
  S10_AdminLogin,
  S11_Dashboard,
  S12_AppsList,
  S13_AppDetail,
  S14_SitesList,
  S15_SiteDetail,
  S16_Leads,
  S17_Waitlist,
  S18_FeedbackInbox,
  S19_Settings,
  S20_CustomerLogin,
  S2_Desktop,
  S2_Mobile,
  S3_FinalConfirm,
  S3_Step1_Link,
  S3_Step1_Photo,
  S3_Step2_PhotoDesc,
  S3_StepBuilding,
  S3_StepContact,
  S3_StepNiche,
  S3_StepPreview,
  S3_StepSource,
  S7_CustomerSite,
  S7_SchemeSwatches,
  S8_LeadFormConfirm,
  S9_FeedbackModal,
  S9_FeedbackPage,
  SOURCE_LIB,
  SamosaytLanding,
  SamosaytLandingV3,
  SamosaytLandingV3_Desktop,
  SamosaytLandingV3_Mobile,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  Settings,
  SiteDetail,
  SitesList,
  SkeletonBlock,
  SourceDetectionBadge,
  SourcesSection,
  Spinner,
  SplitFamily,
  StackedFamily,
  StatTile,
  StatusPill,
  StickyHeader,
  SubmitModal,
  TrendChart,
  V5_CSS,
  V5_Examples,
  V5_Faq,
  V5_FinalCta,
  V5_Footer,
  V5_Header,
  V5_Hero,
  V5_HeroSite,
  V5_Honest,
  V5_HowItWorks,
  V5_Page,
  V5_Pricing,
  V5_Reviews,
  V5_SiteViewer,
  V5_Story,
  V5_Styles,
  VT,
  Waitlist,
  bentoClay,
  bentoLight,
  bentoNoir,
  demoDraftFor,
  displayBold,
  displayInk,
  displayNoir,
  displaySoft,
  draftHostSlug,
  draftPreset,
  draftToSlotContent,
  editorialMono,
  editorialNoir,
  editorialWarm,
  fixtureAutoPark,
  fixtureBakeryDom,
  fixtureBarberFedor,
  fixtureBrowsSochi,
  fixtureCoffeeLena,
  fixtureFitnessMetod,
  fixtureLegalSitnikov,
  fixtureNailsAnna,
  fixturePhotoMarta,
  fixtureTattooLine,
  getTheme,
  matchNiche,
  mockPreviewDraftRich,
  mockPreviewDraftSparse,
  mockSourceCandidates,
  mockThemeOptions,
  morphSlotContent,
  nicheCopyFor,
  samplePresets,
  splitClay,
  splitProduct,
  splitTeal,
  stackedCorporate,
  stackedCream,
  stackedSlate,
  themes,
  tokens
};
//# sourceMappingURL=index.js.map