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

// src/CanonStyles.tsx
import { jsx } from "react/jsx-runtime";
var CSS = '/* @samosite/canon \xB7 interactive styles (CANON_PACKAGE_TZ \xA72.4) */\n\n:root {\n  --accent:      oklch(0.605 0.155 35);\n  --accent-soft: oklch(0.92  0.045 40);\n  --accent-ink:  oklch(0.42  0.14  35);\n  --ink:         oklch(0.215 0.018 60);\n  --bg:          oklch(0.972 0.012 80);\n  --bg-soft:     oklch(0.945 0.014 75);\n}\n\n@keyframes vt-spin { to { transform: rotate(360deg); } }\n@keyframes vt-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }\n@keyframes vt-shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }\n.vt-pulse { animation: vt-pulse 2s ease-in-out infinite; }\n\nhtml { scroll-behavior: smooth; }\n\n.ss-card-lift { transition: transform .2s ease-out, box-shadow .2s ease-out; will-change: transform; }\n.ss-card-lift:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -14px rgba(120,60,30,0.18); }\n\n.ss-story-card { transition: transform .2s ease-out; will-change: transform; }\n.ss-story-card:hover { transform: translateY(-1px); }\n\n.ss-pricing-card { transition: transform .2s ease-out, box-shadow .2s ease-out; will-change: transform; }\n.ss-pricing-card:hover { transform: translateY(-1px); box-shadow: 0 14px 24px -16px rgba(120,60,30,0.22); }\n\nbutton[data-ss-cta],\na[href="#hero"], a[href="#book"], a[href="/admin-demo"], a[href="/login"] {\n  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease, background-color .15s ease;\n}\nbutton[data-ss-cta]:hover:not(:disabled),\na[href="#hero"]:hover, a[href="#book"]:hover,\na[href="/admin-demo"]:hover, a[href="/login"]:hover {\n  transform: translateY(-1px);\n  filter: brightness(0.95);\n  box-shadow: 0 16px 32px -14px rgba(120,60,30,0.45);\n}\n\n:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 6px; }\n\ndetails summary { transition: background-color .15s ease; cursor: pointer; }\ndetails summary:hover { background-color: var(--bg-soft); }\n\n.ss-hero-pill { transition: border-color .15s ease, box-shadow .15s ease; }\n.ss-hero-pill:focus-within {\n  border-color: var(--accent);\n  box-shadow: 0 0 0 4px var(--accent-soft), 0 12px 32px -16px rgba(120,60,30,0.25);\n}\n';
function CanonStyles() {
  return /* @__PURE__ */ jsx("style", { "data-samosite-canon": "v0.2", dangerouslySetInnerHTML: { __html: CSS } });
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
import React2 from "react";

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
  const c = theme.colors;
  const f = theme.fonts;
  const r = theme.radii;
  const v = theme.voice;
  const withEm = (text) => {
    const parts = text.split(/\[\[(.+?)\]\]/g);
    return parts.map(
      (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx3(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx3("em", { style: {
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
      /* @__PURE__ */ jsx3("div", { style: {
        fontFamily: f.display,
        fontStyle: v.italicAccent ? "italic" : "normal",
        fontSize: 15,
        fontWeight: v.displayWeight,
        letterSpacing: "-0.01em",
        color: c.ink
      }, children: content.meta.brand }),
      /* @__PURE__ */ jsx3("a", { style: {
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
    /* @__PURE__ */ jsx3("section", { style: { padding: "16px 16px 18px", ...hr }, children: /* @__PURE__ */ jsx3("h1", { style: {
      fontFamily: f.display,
      fontSize: 34,
      fontWeight: v.displayWeight,
      lineHeight: 0.94,
      letterSpacing: "-0.025em",
      color: c.ink,
      margin: 0
    }, children: content.hero.headingLines.map((line, i) => /* @__PURE__ */ jsxs2(React.Fragment, { children: [
      withEm(line),
      i < content.hero.headingLines.length - 1 && /* @__PURE__ */ jsx3("br", {})
    ] }, i)) }) }),
    content.hero.leadParagraph && /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 16px", ...hr }, children: [
      v.dropCap && /* @__PURE__ */ jsx3("span", { style: {
        fontFamily: f.display,
        fontSize: 44,
        fontWeight: v.displayWeight,
        float: "left",
        lineHeight: 0.85,
        margin: "4px 8px 0 0",
        color: c.accent
      }, children: content.hero.leadParagraph[0] }),
      /* @__PURE__ */ jsx3("p", { style: { fontSize: 13, lineHeight: 1.55, color: c.ink, margin: 0 }, children: v.dropCap ? content.hero.leadParagraph.slice(1) : content.hero.leadParagraph })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { aspectRatio: "4 / 3", overflow: "hidden", position: "relative", ...hr }, children: [
      /* @__PURE__ */ jsx3(
        "img",
        {
          src: content.hero.photoSrc,
          alt: "",
          loading: "lazy",
          style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" }
        }
      ),
      content.hero.photoCaption && /* @__PURE__ */ jsx3("div", { style: {
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
        /* @__PURE__ */ jsx3("span", { style: {
          fontFamily: f.display,
          fontSize: 22,
          fontStyle: v.italicAccent ? "italic" : "normal"
        }, children: "\u2192" })
      ] }),
      content.cta.phone && /* @__PURE__ */ jsx3("a", { style: {
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
    /* @__PURE__ */ jsx3("div", { style: {
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
        s.unit && /* @__PURE__ */ jsx3("span", { style: { fontSize: 12, color: c.inkSoft }, children: s.unit })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: {
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
        /* @__PURE__ */ jsx3("span", { style: { height: 1, background: c.inkSoft, flex: 1 } }),
        content.menu.eyebrow,
        /* @__PURE__ */ jsx3("span", { style: { height: 1, background: c.inkSoft, flex: 1 } })
      ] }),
      /* @__PURE__ */ jsx3("h3", { style: {
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
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.accent }, children: it.num }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: v.displayWeight, color: c.ink }, children: it.name }),
          it.desc && /* @__PURE__ */ jsx3("div", { style: { fontSize: 10, color: c.inkSoft, marginTop: 2 }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx3("span", { style: {
          fontFamily: f.display,
          fontStyle: v.italicAccent ? "italic" : "normal",
          fontSize: 14,
          color: c.ink
        }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("section", { style: { padding: "14px 16px", ...hr }, children: [
      /* @__PURE__ */ jsx3("p", { style: {
        fontFamily: f.display,
        fontStyle: v.italicAccent ? "italic" : "normal",
        fontSize: 15,
        lineHeight: 1.3,
        margin: 0,
        color: c.ink
      }, children: content.quote.text.split(/\[\[(.+?)\]\]/g).map(
        (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx3(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx3("em", { style: { color: c.accent, fontStyle: "normal" }, children: p }, i)
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
      /* @__PURE__ */ jsx3("span", { children: content.meta.address }),
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
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx3(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx3("em", { style: { fontStyle: italic ? "italic" : "normal", color }, children: p }, i)
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
        /* @__PURE__ */ jsx3("span", { style: { width: 22, height: 22, background: c.accent, color: c.accentInk, borderRadius: r.mark, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12 }, children: content.meta.brand[0] }),
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
          /* @__PURE__ */ jsx3("span", { style: { width: 5, height: 5, background: c.accent, borderRadius: "50%" } }),
          "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F"
        ] }),
        /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 27, fontWeight: 800, lineHeight: 0.96, letterSpacing: "-0.035em", margin: 0 }, children: content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "") })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx3("div", { style: label, children: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F" }),
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em" }, children: "14:00 \xB7 16:30" }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 10, color: c.inkSoft, marginTop: 2 }, children: content.cta.primary.label.toLowerCase() })
      ] }),
      s[0] && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx3("div", { style: label, children: s[0].label }),
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }, children: [
          s[0].num,
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 14, color: c.inkFaint }, children: s[0].unit })
        ] })
      ] }),
      s[1] && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx3("div", { style: label, children: s[1].label }),
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", color: c.accent }, children: [
          s[1].num,
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 14, color: c.inkFaint }, children: s[1].unit })
        ] })
      ] }),
      s[2] && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 2" }, children: [
        /* @__PURE__ */ jsx3("div", { style: label, children: s[2].label }),
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 26, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em" }, children: [
          s[2].num,
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 14, color: c.inkFaint }, children: s[2].unit })
        ] })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { gridColumn: "span 4", borderRadius: r.card, overflow: "hidden", aspectRatio: "16/9" }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4", background: c.invBg, color: c.invInk, border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", padding: "16px 18px" }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em" }, children: content.cta.primary.label }),
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 10, color: c.invInkSoft, marginTop: 2 }, children: content.cta.phone })
        ] }),
        /* @__PURE__ */ jsx3("span", { style: { width: 32, height: 32, background: c.accent, color: c.accentInk, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }, children: "\u2192" })
      ] }),
      m && /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4" }, children: [
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }, children: m.title.replace(/\[\[|\]\]/g, "") }),
        m.items.map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: i < m.items.length - 1 ? `1px solid ${c.line}` : void 0 }, children: [
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 12 }, children: it.name }),
          /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 12, color: c.accent, fontWeight: 500 }, children: it.price })
        ] }, i))
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { ...card, gridColumn: "span 4" }, children: [
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 15, fontWeight: 500, marginBottom: 4 }, children: content.cta.phone }),
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
        /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, background: c.accent, borderRadius: "50%" } }),
        content.meta.brand
      ] }),
      /* @__PURE__ */ jsx3("span", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: c.ink, padding: "6px 12px", border: `1px solid ${c.ink}`, borderRadius: 999 }, children: content.cta.phone })
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
      /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 60, fontWeight: v.displayWeight, lineHeight: 0.85, letterSpacing: "-0.045em", margin: 0 }, children: lines.map((line, i) => /* @__PURE__ */ jsx3("span", { style: {
        display: "block",
        color: i === 1 ? c.accent : c.ink,
        fontStyle: i === 1 && v.italicAccent ? "italic" : "normal",
        textIndent: i === 1 ? 20 : 0,
        textAlign: i === 2 ? "right" : "left"
      }, children: renderEm(line, c.accent, v.italicAccent) }, i)) }),
      content.stats[0] && /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: 16, alignItems: "center", marginTop: 18, paddingTop: 18, borderTop: `1px solid ${c.line}` }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 46, fontWeight: v.displayWeight, lineHeight: 0.85, color: c.accent, fontStyle: v.italicAccent ? "italic" : "normal", whiteSpace: "nowrap" }, children: [
          content.stats[0].num,
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 22 }, children: content.stats[0].unit })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { fontSize: 13, lineHeight: 1.45, color: c.inkSoft }, children: [
          /* @__PURE__ */ jsx3("b", { style: { color: c.ink }, children: content.stats[0].label }),
          /* @__PURE__ */ jsx3("br", {}),
          content.hero.leadParagraph?.split(".")[0],
          "."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 6, padding: "0 14px 18px" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { gridColumn: "1 / 2", gridRow: "1 / 3", borderRadius: r.photo, overflow: "hidden", aspectRatio: "1/1" }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsx3("div", { style: { borderRadius: r.photo, overflow: "hidden", aspectRatio: "1/1", background: c.bgAlt }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.gallery?.[0] ?? content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsx3("div", { style: { borderRadius: r.photo, overflow: "hidden", aspectRatio: "1/1", background: c.bgAlt }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.gallery?.[1] ?? content.hero.gallery?.[0] ?? content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) })
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
        /* @__PURE__ */ jsx3("span", { style: { width: 20, height: 1, background: c.invAccent } }),
        m.eyebrow
      ] }),
      m.items.slice(0, 2).map((it, i, arr) => /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr auto", gap: 14, alignItems: "baseline", padding: "10px 0", borderBottom: i < arr.length - 1 ? `1px solid ${c.invInkSoft}` : void 0 }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, lineHeight: 1.05 }, children: it.name }),
          it.desc && /* @__PURE__ */ jsx3("div", { style: { fontSize: 10, color: c.invInkSoft, marginTop: 3 }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 18, color: c.invAccent }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs2("footer", { style: { padding: 18, textAlign: "center", background: c.bg }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 18, marginBottom: 6 }, children: content.meta.brand }),
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkFaint, textTransform: "uppercase", letterSpacing: "0.08em" }, children: content.meta.address })
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
        /* @__PURE__ */ jsx3("span", { style: { color: c.accent }, children: "." })
      ] }),
      /* @__PURE__ */ jsx3("a", { style: { background: c.accent, color: c.accentInk, padding: "7px 14px", borderRadius: r.btn, fontSize: 11, fontWeight: 600 }, children: content.cta.primary.label.split(" ")[0] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("div", { style: { aspectRatio: "4/3", overflow: "hidden", borderRight: `1px solid ${c.line}` }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 14px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 14, background: c.bgAlt }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.1em", color: c.accent, marginBottom: 8 }, children: content.meta.category }),
          /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 24, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }, children: heading })
        ] }),
        /* @__PURE__ */ jsx3("p", { style: { fontSize: 11, lineHeight: 1.5, color: c.inkSoft, margin: 0 }, children: content.hero.leadParagraph?.slice(0, 110) })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: c.invBg, color: c.invInk }, children: content.stats.map((s, i) => /* @__PURE__ */ jsxs2("div", { style: { padding: "14px 10px", textAlign: "center", borderRight: i < content.stats.length - 1 ? `1px solid ${c.invInkSoft}` : void 0 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.display, fontSize: 22, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", color: c.invAccent, marginBottom: 4 }, children: [
        s.num,
        /* @__PURE__ */ jsx3("span", { style: { fontSize: 12 }, children: s.unit })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", opacity: 0.75 }, children: s.label })
    ] }, i)) }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 14px", borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.08em", color: c.accent, marginBottom: 8 }, children: "\u043A\u0430\u043A \u043C\u044B \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u043C" }),
      /* @__PURE__ */ jsx3("h3", { style: { fontFamily: f.display, fontSize: 17, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }, children: content.quote.text.replace(/[«»"\[\]]/g, "") }),
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkSoft, marginTop: 8 }, children: [
        content.quote.authorName,
        " \xB7 ",
        content.quote.authorSource
      ] })
    ] }),
    m && /* @__PURE__ */ jsxs2("div", { style: { padding: "20px 14px", background: c.bgAlt, borderBottom: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("h3", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 14 }, children: m.eyebrow }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: m.items.slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs2("div", { style: {
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
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700 }, children: it.name }),
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 10, opacity: 0.8, marginTop: 2 }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 800, whiteSpace: "nowrap" }, children: it.price })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "18px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.mono, fontSize: 13, fontWeight: 500 }, children: content.cta.phone }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 10, color: c.inkSoft }, children: content.meta.address })
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
      /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em" }, children: content.meta.brand }),
      /* @__PURE__ */ jsx3("a", { style: { background: c.accent, color: c.accentInk, padding: "8px 14px", borderRadius: r.btn, fontSize: 12, fontWeight: 600 }, children: "\u041A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("section", { style: { padding: "18px 16px 20px" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 10px", background: c.accentSoft, color: c.accent, borderRadius: 999, fontSize: 11, fontWeight: 500, marginBottom: 12 }, children: [
        /* @__PURE__ */ jsx3("span", { style: { width: 6, height: 6, background: c.accent, borderRadius: "50%" } }),
        content.meta.category,
        " \xB7 ",
        content.meta.address.split(",").pop()?.trim()
      ] }),
      /* @__PURE__ */ jsx3("h1", { style: { fontFamily: f.display, fontSize: 27, fontWeight: v.displayWeight, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 10px" }, children: heading }),
      /* @__PURE__ */ jsx3("p", { style: { fontSize: 13, lineHeight: 1.5, color: c.inkSoft, marginBottom: 14 }, children: content.hero.leadParagraph }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 10, fontSize: 12, color: c.inkSoft, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }, children: [
        /* @__PURE__ */ jsx3("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx3("b", { children: content.meta.rating }),
        /* @__PURE__ */ jsx3("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs2("span", { children: [
          content.meta.reviewsN,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] }),
        /* @__PURE__ */ jsx3("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs2("span", { children: [
          "\u0441 ",
          content.meta.since
        ] })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { borderRadius: r.photo, overflow: "hidden", aspectRatio: "16/10", marginBottom: 14 }, children: /* @__PURE__ */ jsx3("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
        /* @__PURE__ */ jsx3("a", { style: { background: c.accent, color: c.accentInk, padding: 14, borderRadius: r.btn, textAlign: "center", fontSize: 14, fontWeight: 600 }, children: content.cta.primary.label }),
        /* @__PURE__ */ jsx3("a", { style: { padding: 12, border: `1px solid ${c.line}`, borderRadius: r.btn, textAlign: "center", fontSize: 13 }, children: content.cta.phone })
      ] })
    ] }),
    m && /* @__PURE__ */ jsxs2("section", { style: { padding: "22px 16px", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx3("h3", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, letterSpacing: "-0.02em", marginBottom: 4 }, children: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438 \u0446\u0435\u043D\u044B" }),
      /* @__PURE__ */ jsx3("p", { style: { fontSize: 11, color: c.inkSoft, marginBottom: 14 }, children: m.eyebrow }),
      /* @__PURE__ */ jsx3("div", { style: { ...cardBox, padding: 14 }, children: m.items.map((it, i) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "10px 0", borderBottom: i < m.items.length - 1 ? `1px solid ${c.line}` : void 0, gap: 12 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 13, fontWeight: 600, marginBottom: 2 }, children: it.name }),
          it.desc && /* @__PURE__ */ jsx3("div", { style: { fontSize: 11, color: c.inkSoft }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx3("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 600, whiteSpace: "nowrap" }, children: it.price })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx3("section", { style: { padding: "18px 16px", borderTop: `1px solid ${c.line}` }, children: /* @__PURE__ */ jsxs2("div", { style: { background: c.accentSoft, borderRadius: r.card, padding: "14px 16px" }, children: [
      /* @__PURE__ */ jsx3("p", { style: { fontSize: 13, lineHeight: 1.5, margin: 0, color: c.ink }, children: content.quote.text.replace(/\[\[|\]\]/g, "") }),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 10, color: c.inkSoft, marginTop: 8, display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ jsxs2("span", { children: [
          content.quote.authorName,
          " \xB7 ",
          content.quote.authorSource
        ] }),
        /* @__PURE__ */ jsx3("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" })
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
  return /* @__PURE__ */ jsx3(Family, { theme, content });
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
      /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
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
import { Fragment as Fragment2, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function sectionPad(mobile) {
  const v = mobile ? 20 : 80;
  return { paddingLeft: v, paddingRight: v, boxSizing: "border-box" };
}
function H2({ children, mobile, align = "center" }) {
  return /* @__PURE__ */ jsx4("h2", { style: {
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
  return /* @__PURE__ */ jsx4("p", { style: {
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
      /* @__PURE__ */ jsx4("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx4("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx4("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx4("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx4("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx4("defs", { children: /* @__PURE__ */ jsxs3("linearGradient", { id: "iggr3a", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx4("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx4("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx4("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx4("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggr3a)" }),
      /* @__PURE__ */ jsx4("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx4("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "site",
    name: "\u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx4("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx4("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx4("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx4("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
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
    label && /* @__PURE__ */ jsx4("div", { style: {
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.12em",
      color: VT.inkFaint,
      fontWeight: 600
    }, children: label }),
    /* @__PURE__ */ jsx4("div", { style: {
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
  return /* @__PURE__ */ jsx4("section", { id: "hero", style: { ...sectionPad(mobile), paddingTop: mobile ? 28 : 56, position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsxs3("div", { style: {
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
        !mobile && /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx4("br", {}),
      "\u0414\u0430\u043B\u044C\u0448\u0435\xA0\u043E\u043D ",
      /* @__PURE__ */ jsx4("span", { style: { color: VT.accent }, children: "\u0441\u0430\u043C \u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0441\u044F \u043B\u0443\u0447\u0448\u0435" }),
      " \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E."
    ] }),
    /* @__PURE__ */ jsx4("p", { style: {
      fontSize: mobile ? 16.5 : 20,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: mobile ? "20px 0 0" : "28px auto 0",
      maxWidth: mobile ? "100%" : 860,
      textWrap: "pretty"
    }, children: "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0433\u0434\u0435 \u0432\u044B \u0432\u0435\u0434\u0451\u0442\u0435 \u0434\u0435\u043B\u0430: \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram, 2\u0413\u0418\u0421, Avito \u0438\u043B\u0438 Instagram. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442, \u0441\u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442." }),
    /* @__PURE__ */ jsx4("p", { style: {
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
        /* @__PURE__ */ jsx4(IconLink, {}),
        /* @__PURE__ */ jsx4("span", { style: {
          color: VT.inkFaint,
          fontSize: mobile ? 15 : 16,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap"
        }, children: "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" })
      ] }),
      /* @__PURE__ */ jsx4(Btn, { style: {
        padding: mobile ? "14px 20px" : "14px 26px",
        borderRadius: mobile ? 10 : 999
      }, iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" })
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
      /* @__PURE__ */ jsx4("b", { style: { color: VT.accent }, children: "\u043E\u0442 690 \u20BD/\u043C\u0435\u0441" }),
      " \xB7 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430 \u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E"
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
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
      /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2193" })
    ] }) }),
    /* @__PURE__ */ jsx4(ChipStrip, { mobile })
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
        /* @__PURE__ */ jsx4("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent, flex: "0 0 auto" } }),
        /* @__PURE__ */ jsx4("span", { style: {
          fontSize: mobile ? 14 : 15,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          minWidth: 0
        }, children: item.tagline })
      ] }),
      /* @__PURE__ */ jsx4(
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
          children: /* @__PURE__ */ jsx4(MiniChrome, { host: item.content.meta.host, children: /* @__PURE__ */ jsx4(PresetRenderer, { preset: item.preset, content: item.content }) })
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsxs3("section", { id: "examples", style: { ...sectionPad(mobile), marginTop: mobile ? 56 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u0412\u043E\u0442 \u043A\u0430\u043A \u0431\u0443\u0434\u0435\u0442",
        /* @__PURE__ */ jsx4("br", {}),
        "\u0432\u044B\u0433\u043B\u044F\u0434\u0435\u0442\u044C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx4(Sub, { mobile, children: "\u0421\u0442\u0438\u043B\u0438\u0441\u0442\u0438\u043A \u043C\u043D\u043E\u0433\u043E \u2014 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442 \u0435\u0451 \u043F\u043E\u0434 \u043D\u0438\u0448\u0443 \u0438 \u043A\u043E\u043D\u0442\u0435\u043D\u0442. \u0415\u0441\u043B\u0438 \u043D\u0435 \u0437\u0430\u0439\u0434\u0451\u0442 \u2014 \u043F\u043E\u043C\u0435\u043D\u044F\u0435\u0442\u0435 \u0432 \u043E\u0434\u0438\u043D \u043A\u043B\u0438\u043A \u0438\u0437 \u0431\u0438\u0431\u043B\u0438\u043E\u0442\u0435\u043A\u0438." })
    ] }),
    /* @__PURE__ */ jsx4(ExamplesCarousel, { mobile, items: showcase, renderCard: (item) => /* @__PURE__ */ jsx4(ExampleCard, { item }) }),
    /* @__PURE__ */ jsx4(HowItPicks, { mobile }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: mobile ? 28 : 44, textAlign: "center" }, children: [
      /* @__PURE__ */ jsx4("a", { href: "#hero", style: {
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
      }, children: /* @__PURE__ */ jsx4("span", { children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0442\u0430\u043A\u043E\u0439\xA0\u0436\u0435 \u0438\u0437\xA0\u043C\u043E\u0435\u0433\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\xA0\u2192" }) }),
      /* @__PURE__ */ jsx4("div", { style: {
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
        /* @__PURE__ */ jsx4("path", { d: "M5 12 H19" }),
        /* @__PURE__ */ jsx4("path", { d: "M13 6 L19 12 L13 18" })
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
        mobile && items.length > 1 && /* @__PURE__ */ jsx4("div", { style: {
          display: "flex",
          justifyContent: "center",
          gap: 7,
          marginBottom: 14
        }, children: items.map((_, i) => {
          const active = i === activeIdx;
          return /* @__PURE__ */ jsx4(
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
              /* @__PURE__ */ jsx4("style", { children: `.ss-preset-carousel::-webkit-scrollbar{display:none}` }),
              /* @__PURE__ */ jsx4("div", { className: "ss-preset-carousel", style: {
                display: "flex",
                gap: mobile ? 12 : 24,
                padding: mobile ? "0 56px 16px 16px" : "0 32px 16px",
                alignItems: "flex-start"
              }, children: items.map((item, i) => /* @__PURE__ */ jsx4("div", { style: {
                flex: mobile ? "0 0 94%" : "0 0 calc((100% - 80px) / 3)",
                scrollSnapAlign: "start",
                display: "flex",
                minWidth: 0
              }, children: renderCard(item, i) }, i)) })
            ]
          }
        ),
        !mobile && /* @__PURE__ */ jsxs3(Fragment2, { children: [
          /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              "aria-label": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043F\u0440\u0438\u043C\u0435\u0440",
              disabled: atStart,
              onClick: () => scrollBy(-1),
              onMouseEnter: () => setHoverPrev(true),
              onMouseLeave: () => setHoverPrev(false),
              style: arrowStyle(atStart, hoverPrev, -1),
              children: /* @__PURE__ */ jsx4(ArrowIcon, { direction: -1 })
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              type: "button",
              "aria-label": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043F\u0440\u0438\u043C\u0435\u0440",
              disabled: atEnd,
              onClick: () => scrollBy(1),
              onMouseEnter: () => setHoverNext(true),
              onMouseLeave: () => setHoverNext(false),
              style: arrowStyle(atEnd, hoverNext, 1),
              children: /* @__PURE__ */ jsx4(ArrowIcon, { direction: 1 })
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
  const tray = (children) => /* @__PURE__ */ jsx4("div", { style: {
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
        /* @__PURE__ */ jsx4(Fragment2, { children: sets.map((set, i) => /* @__PURE__ */ jsx4("div", { style: { display: "flex", borderRadius: 8, overflow: "hidden", boxShadow: "0 1px 3px rgba(40,28,18,0.08)" }, children: set.map((col, j) => /* @__PURE__ */ jsx4("span", { style: { width: 22, height: 30, background: col } }, j)) }, i)) })
      );
    }
    if (kind === "fonts") {
      return tray(
        /* @__PURE__ */ jsxs3(Fragment2, { children: [
          /* @__PURE__ */ jsx4("span", { style: { fontFamily: "'Fraunces', serif", fontSize: 22, fontStyle: "italic", color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx4("span", { style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx4("span", { style: { fontFamily: "'JetBrains Mono', monospace", fontSize: 19, color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx4("span", { style: { fontFamily: "'Instrument Serif', serif", fontSize: 23, color: VT.ink }, children: "\u0410\u0430" }),
          /* @__PURE__ */ jsx4("span", { style: { fontFamily: "'Inter', sans-serif", fontSize: 21, fontWeight: 700, color: VT.ink }, children: "\u0410\u0430" })
        ] })
      );
    }
    if (kind === "grids") {
      const cell = (style) => /* @__PURE__ */ jsx4("span", { style: { background: VT.accentSoft, borderRadius: 3, ...style } });
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
        ["#A8412E", "#2D5B8E", "#356E60", "#8C4A52"].map((col, i) => /* @__PURE__ */ jsx4("span", { style: {
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: col,
          border: i === 0 ? `2px solid ${VT.ink}` : `2px solid transparent`,
          boxShadow: i === 0 ? `0 0 0 2px ${VT.white}, 0 0 0 3px ${VT.ink}` : "none"
        } }, i)),
        /* @__PURE__ */ jsx4("span", { style: { fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, marginLeft: "auto" }, children: "\u2192 1 \u043A\u043B\u0438\u043A" })
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
    /* @__PURE__ */ jsx4("h3", { style: {
      fontSize: mobile ? 22 : 28,
      fontWeight: 700,
      lineHeight: 1.12,
      letterSpacing: "-0.025em",
      color: VT.ink,
      marginBottom: 12,
      maxWidth: 720
    }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0434\u0438\u0437\u0430\u0439\u043D \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u043E\u0432, \u0430 \u043D\u0435 \u043F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0438\u0437 \u0448\u0430\u0431\u043B\u043E\u043D\u0430" }),
    /* @__PURE__ */ jsx4("p", { style: {
      fontSize: mobile ? 14 : 16,
      lineHeight: 1.5,
      color: VT.inkSoft,
      marginBottom: mobile ? 20 : 28,
      maxWidth: 680
    }, children: "\u0415\u0441\u043B\u0438 \u0444\u0438\u0440\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C \u0443\u0436\u0435 \u0435\u0441\u0442\u044C, \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0435\u0433\u043E \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442. \u0415\u0441\u043B\u0438 \u043D\u0435\u0442, \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u043C \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0444\u043E\u0442\u043E \u0438 \u0442\u0435\u043A\u0441\u0442\u043E\u0432. \u041F\u043E\u044D\u0442\u043E\u043C\u0443 \u0441\u0430\u0439\u0442 \u043A\u043E\u0444\u0435\u0439\u043D\u0438 \u043D\u0435 \u043F\u043E\u0445\u043E\u0436 \u043D\u0430 \u0441\u0430\u0439\u0442 \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441\u0430, \u0434\u0430\u0436\u0435 \u0435\u0441\u043B\u0438 \u043E\u0431\u0430 \u0441\u043E\u0431\u0440\u0430\u043D\u044B \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439." }),
    /* @__PURE__ */ jsx4("div", { style: {
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
        /* @__PURE__ */ jsx4("span", { style: {
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
        /* @__PURE__ */ jsx4("div", { style: { fontSize: mobile ? 18 : 19, fontWeight: 700, letterSpacing: "-0.015em", color: VT.ink, lineHeight: 1.2 }, children: it.title })
      ] }),
      /* @__PURE__ */ jsx4("p", { style: { fontSize: mobile ? 14.5 : 15, lineHeight: 1.55, color: VT.inkSoft, margin: 0 }, children: it.body }),
      /* @__PURE__ */ jsx4("div", { style: { marginTop: "auto", paddingTop: 18 }, children: /* @__PURE__ */ jsx4(Demo, { kind: it.demo }) })
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
      /* @__PURE__ */ jsx4("path", { d: "M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3" }),
      /* @__PURE__ */ jsx4("path", { d: "M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3" })
    ] })
  },
  {
    n: "02",
    title: "\u041E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    body: "\u0420\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0437\u0430\u0433\u043B\u044F\u0434\u044B\u0432\u0430\u0435\u0442 \u0432 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041D\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u044B, \u043F\u043E\u0441\u0442\u044B \u0438\u043B\u0438 \u0444\u043E\u0442\u043E \u2014 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0451\u0442 \u043D\u0430 \u0441\u0430\u0439\u0442. \u041E\u0442 \u0432\u0430\u0441 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0443\u0436\u043D\u043E.",
    palette: { bg: "oklch(0.94 0.06 95)", ink: "oklch(0.36 0.12 85)", dec: "oklch(0.84 0.12 90)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx4("path", { d: "M14 32 a18 18 0 0 1 30 -13" }),
      /* @__PURE__ */ jsx4("path", { d: "M44 12 L44 22 L34 22" }),
      /* @__PURE__ */ jsx4("path", { d: "M50 32 a18 18 0 0 1 -30 13" }),
      /* @__PURE__ */ jsx4("path", { d: "M20 52 L20 42 L30 42" })
    ] })
  },
  {
    n: "03",
    title: "\u041D\u0430\u0431\u043B\u044E\u0434\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C",
    body: "\u0421\u043C\u043E\u0442\u0440\u0438\u0442, \u043A\u0430\u043A \u0432\u0435\u0434\u0443\u0442 \u0441\u0435\u0431\u044F \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0438: \u043A\u0442\u043E \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B, \u0434\u043E \u0447\u0435\u0433\u043E \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u043B, \u0433\u0434\u0435 \u0437\u0430\u043A\u0440\u044B\u043B \u0432\u043A\u043B\u0430\u0434\u043A\u0443. \u0421\u0447\u0438\u0442\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0438 \u043E\u0442\u043A\u0443\u0434\u0430 \u043E\u043D\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442.",
    palette: { bg: "oklch(0.94 0.05 200)", ink: "oklch(0.34 0.10 220)", dec: "oklch(0.82 0.08 210)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx4("path", { d: "M4 32 C 14 18, 50 18, 60 32" }),
      /* @__PURE__ */ jsx4("path", { d: "M4 32 C 14 46, 50 46, 60 32" }),
      /* @__PURE__ */ jsx4("circle", { cx: "32", cy: "32", r: "8" }),
      /* @__PURE__ */ jsx4("circle", { cx: "32", cy: "32", r: "3", fill: "currentColor" })
    ] })
  },
  {
    n: "04",
    title: "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442",
    cadence: "\u043A\u0430\u0436\u0434\u044B\u0439 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A",
    body: "\u041A\u043E\u0433\u0434\u0430 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0431\u0440\u0430\u043B\u043E\u0441\u044C \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0434\u0430\u043D\u043D\u044B\u0445, \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0434\u043E \u0442\u0440\u0451\u0445 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0439, \u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C, \u043F\u0435\u0440\u0435\u0434\u0435\u043B\u0430\u0442\u044C \u0438\u043D\u0430\u0447\u0435 \u0438\u043B\u0438 \u043E\u0442\u043A\u0430\u0437\u0430\u0442\u044C\u0441\u044F \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B.",
    palette: { bg: "oklch(0.94 0.05 145)", ink: "oklch(0.32 0.11 145)", dec: "oklch(0.82 0.08 145)" },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "36", height: "36", fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx4("path", { d: "M12 14 L52 14 L52 44 L36 44 L28 54 L28 44 L12 44 Z" }),
      /* @__PURE__ */ jsx4("path", { d: "M22 26 L42 26 M22 34 L36 34" })
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
      /* @__PURE__ */ jsx4("span", { style: {
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
        /* @__PURE__ */ jsx4("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: p.ink,
          opacity: 0.7,
          fontWeight: 600
        }, children: step.n }),
        /* @__PURE__ */ jsx4("div", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
      ] })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
      marginTop: 6,
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.06em",
      color: p.ink,
      opacity: 0.75,
      fontStyle: "italic"
    }, children: step.cadence }),
    /* @__PURE__ */ jsx4("p", { style: {
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
    /* @__PURE__ */ jsx4("div", { style: {
      display: "grid",
      gridTemplateColumns: `repeat(4, ${cardW}px)`,
      columnGap: gap,
      alignItems: "stretch",
      position: "relative",
      zIndex: 1
    }, children: CYCLE_STEPS.map((step, i) => /* @__PURE__ */ jsxs3("div", { style: { position: "relative", display: "flex" }, children: [
      /* @__PURE__ */ jsx4(CycleCard, { step, size: cardW }),
      i < 3 && /* @__PURE__ */ jsx4("div", { "aria-hidden": "true", style: {
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
        /* @__PURE__ */ jsx4(
          "path",
          {
            d: `M 2 12 L ${gap - 8} 12`,
            stroke: VT.accent,
            strokeWidth: "2.5",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx4(
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
          /* @__PURE__ */ jsx4("defs", { children: /* @__PURE__ */ jsx4(
            "marker",
            {
              id: "v3retArr",
              viewBox: "0 0 10 10",
              refX: "8",
              refY: "5",
              markerWidth: "7",
              markerHeight: "7",
              orient: "auto-start-reverse",
              children: /* @__PURE__ */ jsx4("path", { d: "M0 0 L10 5 L0 10 z", fill: VT.accent })
            }
          ) }),
          /* @__PURE__ */ jsx4(
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
          /* @__PURE__ */ jsx4("foreignObject", { x: (cx(1) + cx(3)) / 2 - 130, y: arcH + 6, width: "260", height: "40", children: /* @__PURE__ */ jsx4("div", { xmlns: "http://www.w3.org/1999/xhtml", style: {
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
  return /* @__PURE__ */ jsx4("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: CYCLE_STEPS.map((step, idx) => {
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
          /* @__PURE__ */ jsx4("span", { style: {
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
            /* @__PURE__ */ jsx4("div", { style: { fontSize: 20, fontWeight: 700, letterSpacing: "-0.022em", lineHeight: 1.1 }, children: step.title })
          ] })
        ] }),
        /* @__PURE__ */ jsx4("p", { style: { margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.45, textWrap: "pretty" }, children: step.body })
      ] }),
      !isLast && /* @__PURE__ */ jsx4("div", { style: {
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
        /* @__PURE__ */ jsx4("br", {}),
        "\u042D\u0442\u043E \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C."
      ] }),
      /* @__PURE__ */ jsx4(Sub, { mobile, maxWidth: 760, children: "\u041E\u0434\u0438\u043D \u0440\u0430\u0437 \u043F\u043E\u043A\u0430\u0437\u0430\u043B\u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0443, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C. \u0414\u0430\u043B\u044C\u0448\u0435 \u043E\u043D \u0441\u0430\u043C \u0445\u043E\u0434\u0438\u0442 \u043F\u043E \u043A\u0440\u0443\u0433\u0443: \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442, \u0441\u043C\u043E\u0442\u0440\u0438\u0442 \u043D\u0430 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439, \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u043A \u0432\u0430\u043C \u0441 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F\u043C\u0438. \u0427\u0442\u043E \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u2014 \u0440\u0435\u0448\u0430\u0435\u0442\u0435 \u0432\u044B." })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
      marginTop: mobile ? 36 : 56,
      maxWidth: mobile ? "100%" : 1200,
      margin: `${mobile ? 36 : 56}px auto 0`
    }, children: !mobile ? /* @__PURE__ */ jsx4(DesktopCycle, {}) : /* @__PURE__ */ jsx4(MobileCycle, {}) }),
    /* @__PURE__ */ jsx4("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx4("p", { style: {
      fontSize: mobile ? 15 : 17,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty",
      fontStyle: "italic"
    }, children: "\u0421\u0430\u0439\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F \u043D\u0435 \u043A\u0430\u043A \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0444\u0430\u0439\u043B \u2014 \u044D\u0442\u043E \u043F\u0440\u043E\u0446\u0435\u0441\u0441. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u043E\u043D \u043D\u0435\u043C\u043D\u043E\u0433\u043E \u0434\u0440\u0443\u0433\u043E\u0439. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0447\u0443\u0442\u044C \u043B\u0443\u0447\u0448\u0435, \u0447\u0435\u043C \u0431\u044B\u043B." }) }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx4("a", { href: "#hero", style: {
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
        /* @__PURE__ */ jsx4("b", { children: "312 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ". ",
        /* @__PURE__ */ jsx4("b", { children: "224" }),
        " \u0437\u0430\u043A\u0440\u044B\u043B\u0438 \u0435\u0433\u043E, \u0434\u043E \u0443\u0441\u043B\u0443\u0433 \u0434\u0430\u0436\u0435 \u043D\u0435 \u0434\u043E\u043B\u0438\u0441\u0442\u0430\u0432."
      ] }),
      /* @__PURE__ */ jsx4("span", { children: "\u0412 \u0432\u0430\u0448\u0438\u0445 \u043E\u0442\u0437\u044B\u0432\u0430\u0445 \u043B\u044E\u0434\u0438 \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u043E \u043F\u0438\u0448\u0443\u0442: \xAB\u0432\u0441\u0451 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0434 \u0442\u0435\u043C, \u043A\u0430\u043A \u0447\u0438\u043D\u0438\u0442\u044C\xBB \u0438 \xAB\u043D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u044B\u0432\u0430\u043B\u0438\xBB. \u0412\u043E\u0442 \u0432\u0430\u0448\u0430 \u0441\u0438\u043B\u044C\u043D\u0430\u044F \u0441\u0442\u043E\u0440\u043E\u043D\u0430. \u0412 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0435 \u0435\u0451 \u0441\u0435\u0439\u0447\u0430\u0441 \u043D\u0435\u0442." })
    ],
    suggestion: /* @__PURE__ */ jsxs3(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx4("b", { children: "\xAB\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441, \u0433\u0434\u0435 \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u044E\u0442, \u043F\u043E\u0442\u043E\u043C \u0447\u0438\u043D\u044F\u0442\xBB" })
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
        /* @__PURE__ */ jsx4("b", { children: "156 \u0447\u0435\u043B\u043E\u0432\u0435\u043A" }),
        ", \u043E\u0442\u043A\u0440\u044B\u0432\u0448\u0438\u0445 \u043C\u0435\u043D\u044E, ",
        /* @__PURE__ */ jsx4("b", { children: "98" }),
        " \u043D\u0430\u0436\u0430\u043B\u0438 \u043D\u0430 \xAB\u041A\u043E\u0444\u0435 \u0438 \u0434\u0435\u0441\u0435\u0440\u0442\u044B\xBB. \u041D\u0430 \xAB\u0417\u0430\u0432\u0442\u0440\u0430\u043A\u0438\xBB \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u043B\u0438 ",
        /* @__PURE__ */ jsx4("b", { children: "72" }),
        " \u0438 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx4("b", { children: "4" }),
        " \u0437\u0430\u043A\u0430\u0437\u0430\u043B\u0438."
      ] }),
      /* @__PURE__ */ jsx4("span", { children: "\u0423 \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u043E\u0432 \u043D\u0435\u0442 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u0439 \u0438 \u043D\u0435\u0442 \u0441\u043E\u0441\u0442\u0430\u0432\u0430. \u0422\u043E\u043B\u044C\u043A\u043E \u0446\u0435\u043D\u0430 \u0438 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435. \u0427\u0435\u043B\u043E\u0432\u0435\u043A \u043F\u0440\u043E\u0441\u0442\u043E \u043D\u0435 \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442, \u0447\u0442\u043E \u0442\u0430\u043C \u0432 \u0441\u0435\u0442\u0435 \u0438 \u0441\u0442\u043E\u0438\u0442 \u043B\u0438 \u043E\u043D\u043E \u0442\u043E\u0433\u043E." })
    ],
    suggestion: /* @__PURE__ */ jsxs3(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C ",
      /* @__PURE__ */ jsx4("b", { children: "3\u20134 \u0444\u043E\u0442\u043E" }),
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
        /* @__PURE__ */ jsx4("b", { children: "68%" }),
        " \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439 \u0434\u043E\u043B\u0438\u0441\u0442\u044B\u0432\u0430\u044E\u0442 \u0434\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u0438\u0434\u044F\u0442 \u043D\u0430 \u043D\u0438\u0445 \u0432 \u0441\u0440\u0435\u0434\u043D\u0435\u043C ",
        /* @__PURE__ */ jsx4("b", { children: "22 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        ". \u0414\u043E \u0431\u043B\u043E\u043A\u0430 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E ",
        /* @__PURE__ */ jsx4("b", { children: "19%" }),
        ". \u041F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435 \u0443\u0445\u043E\u0434\u044F\u0442 \u0437\u0430 ",
        /* @__PURE__ */ jsx4("b", { children: "4 \u0441\u0435\u043A\u0443\u043D\u0434\u044B" }),
        "."
      ] }),
      /* @__PURE__ */ jsx4("span", { children: "\u0421\u0435\u0439\u0447\u0430\u0441 \xAB\u043E \u043A\u043B\u0438\u043D\u0438\u043A\u0435\xBB \u0438\u0434\u0451\u0442 \u0440\u0430\u043D\u044C\u0448\u0435 \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438 \u0441\u044A\u0435\u0434\u0430\u0435\u0442 \u0438\u043C \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435." })
    ],
    suggestion: /* @__PURE__ */ jsxs3(Fragment2, { children: [
      "\u041F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u044E: ",
      /* @__PURE__ */ jsx4("b", { children: "\u043E\u0442\u0437\u044B\u0432\u044B \u043F\u043E\u0434\u043D\u044F\u0442\u044C \u0432\u044B\u0448\u0435" }),
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
      /* @__PURE__ */ jsx4("span", { style: {
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
        /* @__PURE__ */ jsx4("div", { style: { fontSize: 13, fontWeight: 700, color: VT.ink, lineHeight: 1.15 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx4("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.04em" }, children: "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \xB7 9:14" })
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
        /* @__PURE__ */ jsx4("span", { style: { width: 8, height: 8, borderRadius: "50%", background: card.accent } }),
        /* @__PURE__ */ jsx4("span", { children: card.eyebrow }),
        /* @__PURE__ */ jsx4("span", { style: { marginLeft: "auto", fontStyle: "italic", fontWeight: 500, color: VT.inkFaint, letterSpacing: "0.02em" }, children: card.caseLabel })
      ] }),
      /* @__PURE__ */ jsx4("h3", { style: {
        fontSize: mobile ? 19 : 22,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        margin: 0,
        lineHeight: 1.2,
        color: VT.ink
      }, children: card.title }),
      card.body.map((p, i) => /* @__PURE__ */ jsx4("p", { style: {
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
        /* @__PURE__ */ jsx4("div", { style: {
          fontFamily: VT.font.mono,
          fontSize: 10,
          letterSpacing: "0.12em",
          fontWeight: 700,
          opacity: 0.8,
          color: card.accent
        }, children: "\u041F\u0420\u0415\u0414\u041B\u041E\u0416\u0415\u041D\u0418\u0415" }),
        /* @__PURE__ */ jsx4("div", { style: {
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
      /* @__PURE__ */ jsx4("button", { type: "button", style: {
        padding: "10px 14px",
        borderRadius: 10,
        border: "none",
        background: card.accent,
        color: "#fff",
        fontSize: 13.5,
        fontWeight: 600,
        cursor: "pointer"
      }, children: card.actions[0] }),
      /* @__PURE__ */ jsx4("button", { type: "button", style: {
        padding: "10px 12px",
        borderRadius: 10,
        background: "#fff",
        color: VT.ink,
        border: `1px solid ${VT.line}`,
        fontSize: 12.5,
        fontWeight: 500,
        cursor: "pointer"
      }, children: card.actions[1] }),
      /* @__PURE__ */ jsx4("button", { type: "button", style: {
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
        /* @__PURE__ */ jsx4("br", {}),
        "\u043A\u0430\u043A \u0441\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0441\u0438\u043B\u044C\u043D\u0435\u0435"
      ] }),
      /* @__PURE__ */ jsx4(Sub, { mobile, maxWidth: 820, children: "\u0412\u0441\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0441\u043C\u043E\u0442\u0440\u0438\u0442, \u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0443 \u0432\u0430\u0441 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u0412 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0440\u0430\u0437\u0431\u043E\u0440: \u0433\u0434\u0435 \u0447\u0442\u043E \u043F\u0440\u043E\u0441\u0435\u043B\u043E \u0438 \u0447\u0442\u043E \u0441 \u044D\u0442\u0438\u043C \u0434\u0435\u043B\u0430\u0442\u044C. \u041D\u0435 \u043E\u0431\u0449\u0438\u043C\u0438 \u0444\u0440\u0430\u0437\u0430\u043C\u0438 \u2014 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u043E." })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
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
      /* @__PURE__ */ jsx4("style", { children: `.ss-v3-monday::-webkit-scrollbar{display:none}` }),
      /* @__PURE__ */ jsx4("div", { className: "ss-v3-monday", style: {
        display: "flex",
        gap: 14,
        padding: "4px 20px 24px",
        alignItems: "stretch"
      }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx4("div", { style: { flex: "0 0 88%", scrollSnapAlign: "start", display: "flex" }, children: /* @__PURE__ */ jsx4(MondayCard, { card: c, n: i + 1, mobile }) }, i)) })
    ] }) : /* @__PURE__ */ jsx4("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      alignItems: "stretch"
    }, children: MONDAY_CARDS.map((c, i) => /* @__PURE__ */ jsx4(MondayCard, { card: c, n: i + 1, mobile }, i)) }) }),
    /* @__PURE__ */ jsx4("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 28 : 44}px auto 0`
    }, children: /* @__PURE__ */ jsx4("p", { style: {
      fontSize: mobile ? 14.5 : 16,
      lineHeight: 1.5,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty"
    }, children: "\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043F\u0440\u0430\u0432\u043E\u043A \u0431\u0435\u0437 \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u043E\u0433\u043B\u0430\u0441\u043E\u0432\u0430\u043D\u0438\u044F. \u0423\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0442\u0443\u0434\u0430, \u0433\u0434\u0435 \u0443\u0434\u043E\u0431\u043D\u043E: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS." }) }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: /* @__PURE__ */ jsx4("a", { href: "#hero", style: {
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
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx4("rect", { x: "10", y: "14", width: "44", height: "36", rx: "5" }),
      /* @__PURE__ */ jsx4("path", { d: "M10 22 L32 36 L54 22" })
    ] })
  },
  {
    title: "\u041E\u0442\u0431\u0438\u0440\u0430\u0435\u0442 \u043E\u0442\u0437\u044B\u0432\u044B",
    body: "\u0427\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430, \u043D\u0430 \u0441\u0430\u0439\u0442 \u0441\u0442\u0430\u0432\u0438\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445 \u0438 \u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445. \u041F\u0440\u0438\u0434\u0451\u0442 \u043E\u0442\u0437\u044B\u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u043F\u0440\u0435\u0436\u043D\u0438\u0445 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442 \u0441\u0430\u043C.",
    metric: "4\u20136",
    metricNote: "\u043B\u0443\u0447\u0448\u0438\u0445 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsx4("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "currentColor", children: /* @__PURE__ */ jsx4("path", { d: "M32 8 L37 23 L53 23 L40 33 L45 49 L32 39 L19 49 L24 33 L11 23 L27 23 Z" }) })
  },
  {
    title: "\u0413\u043E\u0442\u043E\u0432 \u043A \u043F\u043E\u0438\u0441\u043A\u0443",
    body: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u0432\u0441\u0451 \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442 \u0434\u043B\u044F \u042F\u043D\u0434\u0435\u043A\u0441\u0430 \u0438 Google: \u0437\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u043E\u0435 \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435, \u043A\u0430\u0440\u0442\u0430 \u0441\u0430\u0439\u0442\u0430, \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u0446\u0435\u043D \u0438 \u0447\u0430\u0441\u043E\u0432. \u0414\u0430\u043B\u044C\u0448\u0435 \u043F\u043E\u0438\u0441\u043A\u043E\u0432\u0438\u043A\u0438 \u043F\u043E\u0434\u0445\u0432\u0430\u0442\u044B\u0432\u0430\u044E\u0442 \u0441\u0430\u0439\u0442 \u0441\u0430\u043C\u0438, \u043E\u0431\u044B\u0447\u043D\u043E \u0437\u0430 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0434\u043D\u0435\u0439.",
    metric: "\u042F\u043D\u0434\u0435\u043A\u0441",
    metricNote: "+ Google",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx4("circle", { cx: "27", cy: "27", r: "14" }),
      /* @__PURE__ */ jsx4("path", { d: "M38 38 L54 54" })
    ] })
  },
  {
    title: "\u041E\u0442\u0441\u0435\u043A\u0430\u0435\u0442 \u0441\u043F\u0430\u043C",
    body: "\u0410\u043D\u0442\u0438\u0431\u043E\u0442-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u0430, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u0436\u0438\u0432\u043E\u0439 \u0447\u0435\u043B\u043E\u0432\u0435\u043A \u043D\u0435 \u0437\u0430\u043C\u0435\u0447\u0430\u0435\u0442. \u0411\u043E\u0442\u044B \u0443\u043F\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0432 \u0441\u0442\u0435\u043D\u0443, \u0434\u043E \u0432\u0430\u0441 \u0434\u043E\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0437\u0430\u044F\u0432\u043A\u0438.",
    metric: "0",
    metricNote: "\u0431\u043E\u0442\u043E\u0432 \u0432 \u0437\u0430\u044F\u0432\u043A\u0430\u0445",
    palette: { bg: "oklch(0.955 0.018 60)", ink: VT.accentInk, stroke: VT.line },
    icon: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 64 64", width: "32", height: "32", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx4("path", { d: "M32 8 L52 16 L52 32 C 52 44, 42 54, 32 56 C 22 54, 12 44, 12 32 L12 16 Z" }),
      /* @__PURE__ */ jsx4("path", { d: "M22 32 L29 39 L42 24" })
    ] })
  }
];
function BaseWorkSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "base", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx4(H2, { mobile, children: "\u0411\u0430\u0437\u043E\u0432\u0430\u044F \u0440\u0430\u0431\u043E\u0442\u0430 \u2014 \u0442\u043E\u0436\u0435 \u043D\u0430 \u043D\u0451\u043C" }),
      /* @__PURE__ */ jsx4(Sub, { mobile, maxWidth: 720, children: "\u042D\u0442\u043E \u0442\u043E, \u0447\u0442\u043E \u043D\u0430 \u0434\u0440\u0443\u0433\u0438\u0445 \u0441\u0430\u0439\u0442\u0430\u0445 \u043D\u0430\u0434\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u0440\u0443\u043A\u0430\u043C\u0438 \u0438\u043B\u0438 \u043F\u043B\u0430\u0442\u0438\u0442\u044C SMM-\u0449\u0438\u043A\u0443. \u0417\u0434\u0435\u0441\u044C \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u0438\u0437 \u043A\u043E\u0440\u043E\u0431\u043A\u0438." })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
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
          /* @__PURE__ */ jsx4("div", { style: {
            flex: "0 0 auto",
            width: mobile ? 52 : 58,
            height: mobile ? 52 : 58,
            borderRadius: 14,
            background: VT.white,
            color: pal.ink,
            border: `1px solid ${VT.line}`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 2px rgba(40,28,18,0.04)"
          }, children: item.icon }),
          /* @__PURE__ */ jsxs3("div", { style: {
            textAlign: "right",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0
          }, children: [
            /* @__PURE__ */ jsx4("div", { style: {
              fontSize: mobile ? 22 : 28,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: pal.ink
            }, children: item.metric }),
            /* @__PURE__ */ jsx4("div", { style: {
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
          /* @__PURE__ */ jsx4("h3", { style: {
            fontSize: mobile ? 20 : 23,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: 0,
            lineHeight: 1.2,
            color: VT.ink
          }, children: item.title }),
          /* @__PURE__ */ jsx4("p", { style: {
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
      /* @__PURE__ */ jsx4("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
      /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
    ] })
  },
  {
    id: "tg",
    name: "Telegram-\u043A\u0430\u043D\u0430\u043B",
    pull: "\u043F\u043E\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "#229ED9" }),
      /* @__PURE__ */ jsx4("path", { d: "M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z", fill: "#fff" })
    ] })
  },
  {
    id: "ig",
    name: "Instagram",
    pull: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx4("defs", { children: /* @__PURE__ */ jsxs3("linearGradient", { id: "iggrC", x1: "0", y1: "1", x2: "1", y2: "0", children: [
        /* @__PURE__ */ jsx4("stop", { offset: "0%", stopColor: "#FEDA77" }),
        /* @__PURE__ */ jsx4("stop", { offset: "30%", stopColor: "#F58529" }),
        /* @__PURE__ */ jsx4("stop", { offset: "60%", stopColor: "#DD2A7B" }),
        /* @__PURE__ */ jsx4("stop", { offset: "100%", stopColor: "#8134AF" })
      ] }) }),
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "url(#iggrC)" }),
      /* @__PURE__ */ jsx4("rect", { x: "6", y: "6", width: "12", height: "12", rx: "3.5", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "3", fill: "none", stroke: "#fff", strokeWidth: "1.6" }),
      /* @__PURE__ */ jsx4("circle", { cx: "16", cy: "8", r: "0.9", fill: "#fff" })
    ] })
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
      /* @__PURE__ */ jsx4("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
    ] })
  },
  {
    id: "avito",
    name: "Avito",
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u043E\u0442\u0437\u044B\u0432\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
      /* @__PURE__ */ jsx4("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
      /* @__PURE__ */ jsx4("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
    ] })
  },
  {
    id: "site",
    name: "\u0412\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    pull: "\u0442\u0435\u043A\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0443\u0441\u043B\u0443\u0433\u0438",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.40 0.04 250)" }),
      /* @__PURE__ */ jsx4("circle", { cx: "12", cy: "12", r: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx4("ellipse", { cx: "12", cy: "12", rx: "2.8", ry: "6", fill: "none", stroke: "#fff", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx4("path", { d: "M6 12h12", stroke: "#fff", strokeWidth: "1.5" })
    ] })
  },
  {
    id: "card",
    name: "\u0424\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430",
    pull: "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0451\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B",
    logo: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 24 24", width: "30", height: "30", children: [
      /* @__PURE__ */ jsx4("rect", { width: "24", height: "24", rx: "6", fill: "oklch(0.74 0.08 70)" }),
      /* @__PURE__ */ jsx4("rect", { x: "6", y: "8", width: "12", height: "9", rx: "1.5", fill: "none", stroke: "#fff", strokeWidth: "1.4" }),
      /* @__PURE__ */ jsx4("path", { d: "M8 11.5h4M8 14h6", stroke: "#fff", strokeWidth: "1.4", strokeLinecap: "round" })
    ] })
  }
];
var SOURCES_SOON = ["\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435", "Ozon", "YouTube"];
function SourcesSection({ mobile }) {
  return /* @__PURE__ */ jsxs3("section", { id: "sources", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx4(H2, { mobile, children: "\u0423 \u0432\u0430\u0441 \u0443\u0436\u0435 \u0432\u0441\u0451 \u0435\u0441\u0442\u044C \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx4(Sub, { mobile, maxWidth: 720, children: "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0432\u0441\u0451, \u0433\u0434\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435 \u0443\u0436\u0435 \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u0415\u0441\u043B\u0438 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435\u0442 \u2014 \u0445\u0432\u0430\u0442\u0438\u0442 \u0444\u043E\u0442\u043E \u043C\u0435\u043D\u044E \u0438\u043B\u0438 \u0431\u0443\u043A\u043B\u0435\u0442\u0430." })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
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
      s.featured && /* @__PURE__ */ jsx4("span", { style: {
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
      /* @__PURE__ */ jsx4("span", { style: { flex: "0 0 auto" }, children: s.logo }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx4("div", { style: {
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
      /* @__PURE__ */ jsx4("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0421\u041A\u041E\u0420\u041E \u041F\u041E\u0414\u041A\u041B\u042E\u0427\u0418\u041C" }),
      SOURCES_SOON.map((n) => /* @__PURE__ */ jsx4("span", { style: {
        padding: "6px 14px",
        background: VT.bgSoft,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 13,
        color: VT.inkSoft,
        fontWeight: 500
      }, children: n }, n)),
      /* @__PURE__ */ jsx4("a", { style: {
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
      /* @__PURE__ */ jsx4("span", { style: {
        flex: "0 0 auto",
        width: mobile ? 64 : 88,
        height: mobile ? 64 : 88
      }, children: /* @__PURE__ */ jsxs3("svg", { viewBox: "0 0 88 88", width: "100%", height: "100%", children: [
        /* @__PURE__ */ jsx4("path", { d: "M44 4 C 24 4, 10 18, 10 38 C 10 60, 44 84, 44 84 C 44 84, 78 60, 78 38 C 78 18, 64 4, 44 4 Z", fill: "#FC3F1D" }),
        /* @__PURE__ */ jsx4("text", { x: "44", y: "48", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "32", fill: "#fff", children: "\u042F" })
      ] }) }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ jsx4("h3", { style: {
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
          /* @__PURE__ */ jsx4("b", { style: { color: VT.ink }, children: "\u0421\u0430\u0439\u0442 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u043D\u0430\u043F\u0440\u044F\u043C\u0443\u044E \u0438 \u043F\u043E\u043F\u0430\u0434\u0430\u0435\u0442 \u0432 \u043F\u043E\u0438\u0441\u043A \u043F\u043E \u0448\u0438\u0440\u043E\u043A\u0438\u043C \u0437\u0430\u043F\u0440\u043E\u0441\u0430\u043C" }),
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
        /* @__PURE__ */ jsx4("br", {}),
        "\u0420\u0435\u0448\u0435\u043D\u0438\u044F \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u0437\u0430 \u0432\u0430\u043C\u0438"
      ] }),
      /* @__PURE__ */ jsx4(Sub, { mobile, maxWidth: 760, children: "\u0412\u0441\u0451, \u0447\u0442\u043E \u043F\u0440\u0435\u0434\u043B\u0430\u0433\u0430\u0435\u0442 \u0418\u0418 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0447\u0435\u0440\u0435\u0437 \u0432\u0430\u0448\u0435 \xAB\u0434\u0430\xBB. \u0412\u0441\u0451, \u0447\u0442\u043E \u0441\u043E\u0431\u0440\u0430\u043B \u2014 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C. \u0417\u0430\u0445\u043E\u0442\u0435\u043B\u0438 \u0443\u0439\u0442\u0438 \u2014 \u0437\u0430\u0431\u0440\u0430\u043B\u0438 \u0438 \u0443\u0448\u043B\u0438." })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: {
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
      /* @__PURE__ */ jsx4("span", { style: {
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
      }, children: /* @__PURE__ */ jsx4("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx4("path", { d: "M5 12 l4 4 10 -10" }) }) }),
      /* @__PURE__ */ jsxs3("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx4("div", { style: {
          fontSize: mobile ? 15.5 : 16.5,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.015em",
          lineHeight: 1.3
        }, children: pt.title }),
        /* @__PURE__ */ jsx4("div", { style: {
          marginTop: 4,
          fontSize: mobile ? 14 : 15,
          lineHeight: 1.45,
          color: VT.inkSoft
        }, children: pt.body })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: mobile ? 22 : 30, textAlign: "center" }, children: /* @__PURE__ */ jsxs3("a", { href: "client-admin-demo.html", style: {
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
      /* @__PURE__ */ jsx4("span", { style: {
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
      /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2197" })
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
        /* @__PURE__ */ jsx4("b", { children: "\u043F\u044F\u0442\u043D\u0438\u0446\u0443" }),
        " \u0437\u0430\u044F\u0432\u043E\u043A \u0432 \u0434\u0432\u0430 \u0440\u0430\u0437\u0430 \u0431\u043E\u043B\u044C\u0448\u0435, \u0447\u0435\u043C \u0432 \u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435. \u041F\u043E\u0445\u043E\u0436\u0435 \u043D\u0430 \u043F\u0440\u0438\u0432\u044B\u0447\u043A\u0443 \xAB\u0440\u0435\u0448\u0438\u0442\u044C \u0434\u0435\u043B\u0430 \u043F\u0435\u0440\u0435\u0434 \u0432\u044B\u0445\u043E\u0434\u043D\u044B\u043C\u0438\xBB."
      ] })
    },
    {
      tag: "\u0420\u041E\u0421\u0422",
      tagColor: "oklch(0.50 0.13 145)",
      text: /* @__PURE__ */ jsxs3(Fragment2, { children: [
        "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430 ",
        /* @__PURE__ */ jsx4("b", { children: "+34%" }),
        " \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E. \u041F\u043E\u0441\u043B\u0435 \u0442\u043E\u0433\u043E, \u043A\u0430\u043A \u043F\u043E\u0434\u043D\u044F\u043B\u0438 \u0431\u043B\u043E\u043A \u043D\u0430\u0432\u0435\u0440\u0445 \u0433\u043B\u0430\u0432\u043D\u043E\u0439."
      ] })
    },
    {
      tag: "\u041F\u0420\u041E\u0412\u0410\u041B",
      tagColor: "oklch(0.50 0.16 270)",
      text: /* @__PURE__ */ jsxs3(Fragment2, { children: [
        "\xAB\u0428\u0438\u043D\u043E\u043C\u043E\u043D\u0442\u0430\u0436\xBB \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u044E\u0442, \u043D\u043E ",
        /* @__PURE__ */ jsx4("b", { children: "\u043D\u0435 \u043D\u0430\u0436\u0438\u043C\u0430\u044E\u0442" }),
        ". \u0412\u043E\u0437\u043C\u043E\u0436\u043D\u043E, \u043D\u0435\u0442 \u0446\u0435\u043D \u2014 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u0432 \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A."
      ] })
    }
  ];
  return /* @__PURE__ */ jsxs3("section", { id: "analytics", style: { ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs3("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs3(H2, { mobile, children: [
        "\u0412\u0438\u0434\u0438\u0442\u0435 \u0440\u043E\u0432\u043D\u043E \u0442\u043E \u0436\u0435,",
        /* @__PURE__ */ jsx4("br", {}),
        "\u0447\u0442\u043E \u0438 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442"
      ] }),
      /* @__PURE__ */ jsx4(Sub, { mobile, maxWidth: 760, children: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438, \u0447\u0442\u043E \u043D\u0430\u0436\u0430\u043B\u0438, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A. \u041F\u0440\u0438\u043C\u0435\u043D\u0438\u043B \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u043F\u0440\u0430\u0432\u043A\u0443 \u2014 \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0439 \u043D\u0435\u0434\u0435\u043B\u0435 \u0432\u0438\u0434\u0438\u0442\u0435, \u043A\u0430\u043A \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438\u0441\u044C \u0446\u0438\u0444\u0440\u044B." })
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
          /* @__PURE__ */ jsx4("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FF5F57" } }),
          /* @__PURE__ */ jsx4("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E" } }),
          /* @__PURE__ */ jsx4("span", { style: { width: 11, height: 11, borderRadius: "50%", background: "#28C840" } })
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
            /* @__PURE__ */ jsx4("rect", { x: "3", y: "11", width: "18", height: "11", rx: "2" }),
            /* @__PURE__ */ jsx4("path", { d: "M7 11 V7 a5 5 0 0 1 10 0 V11" })
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
          /* @__PURE__ */ jsx4("span", { style: {
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
        /* @__PURE__ */ jsx4("span", { style: { fontSize: mobile ? 14 : 16, fontWeight: 700, letterSpacing: "-0.02em" }, children: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 Park \xB7 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" }),
        /* @__PURE__ */ jsx4("span", { style: { flex: 1 } }),
        ["7 \u0434\u043D\u0435\u0439", "30 \u0434\u043D\u0435\u0439", "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F"].map((p, i) => /* @__PURE__ */ jsx4("button", { type: "button", style: {
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
        /* @__PURE__ */ jsx4("div", { style: {
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
          /* @__PURE__ */ jsx4("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.08em",
            color: VT.inkFaint,
            fontWeight: 600,
            textTransform: "uppercase"
          }, children: k.label }),
          /* @__PURE__ */ jsx4("div", { style: {
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
            /* @__PURE__ */ jsx4("svg", { width: "10", height: "10", viewBox: "0 0 10 10", fill: "currentColor", children: /* @__PURE__ */ jsx4("path", { d: "M5 1 L9 7 L1 7 Z" }) }),
            k.delta,
            " ",
            /* @__PURE__ */ jsx4("span", { style: { color: VT.inkFaint, fontWeight: 500 }, children: "\u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E" })
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
            /* @__PURE__ */ jsx4("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u043E \u0434\u043D\u044F\u043C" }),
            /* @__PURE__ */ jsx4("span", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: "\u043F\u043D \u2013 \u0432\u0441" }),
            /* @__PURE__ */ jsxs3("span", { style: { marginLeft: "auto", fontFamily: VT.font.mono, fontSize: 11, color: VT.inkSoft }, children: [
              "\u0432\u0441\u0435\u0433\u043E ",
              /* @__PURE__ */ jsx4("b", { style: { color: VT.ink }, children: "47" })
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
            /* @__PURE__ */ jsx4("div", { "aria-hidden": "true", style: {
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }, children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx4("div", { style: { borderTop: `1px dashed ${VT.line}` } }, i)) }),
            days.map((d, i) => /* @__PURE__ */ jsx4("div", { style: {
              height: `${d / max * 100}%`,
              background: i === peakIdx ? `linear-gradient(180deg, ${VT.accent}, oklch(0.50 0.16 35))` : "oklch(0.84 0.06 50)",
              borderRadius: "6px 6px 0 0",
              position: "relative",
              boxShadow: i === peakIdx ? "0 -2px 16px rgba(217, 119, 87, 0.4)" : "none"
            }, children: /* @__PURE__ */ jsx4("span", { style: {
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
          /* @__PURE__ */ jsx4("div", { style: {
            marginTop: 6,
            display: "grid",
            gridTemplateColumns: `repeat(${days.length}, 1fr)`,
            gap: 12,
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            color: VT.inkFaint,
            textAlign: "center",
            letterSpacing: "0.04em"
          }, children: dayLabels.map((l, i) => /* @__PURE__ */ jsx4("span", { style: {
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
            /* @__PURE__ */ jsx4("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438" }),
            [
              ["\u042F\u043D\u0434\u0435\u043A\u0441", 48, "oklch(0.55 0.14 30)"],
              ["Google", 22, "oklch(0.48 0.13 240)"],
              ["\u041F\u0440\u044F\u043C\u044B\u0435 \u0437\u0430\u0445\u043E\u0434\u044B", 12, "oklch(0.50 0.12 145)"],
              ["\u0421\u043E\u0446\u0441\u0435\u0442\u0438", 11, "oklch(0.55 0.10 280)"],
              ["\u0414\u0440\u0443\u0433\u043E\u0435", 7, "oklch(0.60 0.04 60)"]
            ].map(([label, v, color]) => /* @__PURE__ */ jsxs3("div", { style: { marginBottom: 9 }, children: [
              /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", fontSize: 12.5 }, children: [
                /* @__PURE__ */ jsx4("span", { style: { color: VT.ink }, children: label }),
                /* @__PURE__ */ jsxs3("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600 }, children: [
                  v,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx4("div", { style: { marginTop: 5, height: 6, background: VT.line, borderRadius: 3, overflow: "hidden" }, children: /* @__PURE__ */ jsx4("div", { style: { width: `${v}%`, height: "100%", background: color } }) })
            ] }, label))
          ] }),
          /* @__PURE__ */ jsxs3("div", { style: {
            padding: 18,
            borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`
          }, children: [
            /* @__PURE__ */ jsx4("div", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }, children: "\u0421\u0430\u043C\u044B\u0435 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u0435 \u0443\u0441\u043B\u0443\u0433\u0438" }),
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
              /* @__PURE__ */ jsx4("span", { style: { color: VT.ink, fontSize: 13 }, children: n }),
              /* @__PURE__ */ jsx4("span", { style: {
                fontFamily: VT.font.mono,
                fontSize: 11,
                fontWeight: 600,
                color: String(delta).startsWith("+") ? "oklch(0.75 0.16 145)" : "oklch(0.70 0.14 30)"
              }, children: delta }),
              /* @__PURE__ */ jsx4("span", { style: { flex: 1 } }),
              /* @__PURE__ */ jsx4("span", { style: { fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600, fontSize: 13 }, children: v })
            ] }, n))
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx4("p", { style: {
      marginTop: mobile ? 22 : 30,
      maxWidth: mobile ? "100%" : 720,
      margin: `${mobile ? 22 : 30}px auto 0`,
      fontSize: mobile ? 14.5 : 15.5,
      lineHeight: 1.5,
      color: VT.inkSoft,
      textAlign: "center",
      textWrap: "pretty"
    }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E \u0442\u0443\u0434\u0430 \u0436\u0435, \u043A\u0443\u0434\u0430 \u0438 \u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435: \u0432 Telegram, MAX, \u043D\u0430 \u043F\u043E\u0447\u0442\u0443 \u0438\u043B\u0438 SMS. \u0412 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E, \u0434\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u043C\u0438 \u043D\u0430\u0439\u0434\u0443\u0442 \u0432\u0430\u0441." }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: mobile ? 20 : 28, textAlign: "center" }, children: /* @__PURE__ */ jsxs3("a", { href: "client-admin-demo.html", style: {
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
      /* @__PURE__ */ jsx4("span", { style: {
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
      /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2197" })
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
    return /* @__PURE__ */ jsx4("span", { style: { display: "inline-flex", width: 22, height: 22, borderRadius: "50%", background: VT.successSoft, color: VT.success, alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx4("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx4("path", { d: "M5 12 l4 4 10 -10" }) }) });
  }
  if (v === false) {
    return /* @__PURE__ */ jsx4("span", { style: { color: VT.inkFaint, fontSize: 16 }, children: "\u2014" });
  }
  return /* @__PURE__ */ jsx4("span", { style: { ...base, fontWeight: hi ? 700 : 500, color: hi ? VT.ink : VT.inkSoft }, children: v });
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
    /* @__PURE__ */ jsx4("div", { style: mobile ? { overflowX: "auto", WebkitOverflowScrolling: "touch" } : { overflow: "visible" }, children: /* @__PURE__ */ jsxs3("div", { style: { minWidth: mobile ? totalW : 0 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: {
        display: "grid",
        gridTemplateColumns: `${firstCol}px repeat(5, ${planCol}px)`,
        position: "sticky",
        top: 0,
        zIndex: 2,
        background: VT.white,
        borderBottom: `2px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsx4("div", { style: { padding: cellPad, position: "sticky", left: 0, background: VT.white, zIndex: 4 } }),
        PLANS.map((p, i) => /* @__PURE__ */ jsxs3("div", { style: {
          padding: cellPad,
          textAlign: "center",
          background: i === PLAN_HILITE ? VT.accentSoft : "transparent",
          borderTopLeftRadius: i === PLAN_HILITE ? 12 : 0,
          borderTopRightRadius: i === PLAN_HILITE ? 12 : 0
        }, children: [
          i === PLAN_HILITE && /* @__PURE__ */ jsx4("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 9,
            letterSpacing: "0.1em",
            color: VT.accent,
            fontWeight: 700,
            marginBottom: 4,
            textTransform: "uppercase"
          }, children: "\u041F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439" }),
          /* @__PURE__ */ jsx4("div", { style: {
            fontSize: mobile ? 15 : 17,
            fontWeight: 700,
            letterSpacing: "-0.015em",
            color: i === PLAN_HILITE ? VT.accent : VT.ink
          }, children: p })
        ] }, p))
      ] }),
      PRICING_MATRIX.map((group, gi) => /* @__PURE__ */ jsxs3("div", { children: [
        group.title && /* @__PURE__ */ jsx4("div", { style: {
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
            /* @__PURE__ */ jsx4("div", { style: {
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
            row.vals.map((v, ci) => /* @__PURE__ */ jsx4("div", { style: {
              padding: cellPad,
              textAlign: "center",
              background: ci === PLAN_HILITE ? VT.accentSoft : "transparent",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ jsx4(MatrixCell, { v, hi: isPriceMonth || ci === PLAN_HILITE }) }, ci))
          ] }, ri);
        })
      ] }, gi))
    ] }) }),
    mobile && /* @__PURE__ */ jsx4("div", { style: {
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
      /* @__PURE__ */ jsx4(H2, { mobile, children: "\u0422\u0430\u0440\u0438\u0444 \u043F\u043E\u0434 \u0432\u0430\u0448 \u043C\u0430\u0441\u0448\u0442\u0430\u0431" }),
      /* @__PURE__ */ jsx4("p", { style: {
        margin: `${mobile ? 14 : 18}px auto 0`,
        maxWidth: 600,
        fontSize: mobile ? 15 : 17,
        lineHeight: 1.5,
        color: VT.inkSoft,
        textWrap: "pretty"
      }, children: "\u041E\u0442 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u0433\u043E \u0441\u0442\u0430\u0440\u0442\u0430 \u0434\u043E \u0441\u0442\u0443\u0434\u0438\u0439\u043D\u043E\u0433\u043E. \u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u043D\u0430 \u043B\u044E\u0431\u043E\u043C \u043F\u043B\u0430\u0442\u043D\u043E\u043C \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u043A\u0430\u0440\u0442\u0443 \u043F\u0440\u0438\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0435 \u043D\u0430\u0434\u043E." })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { maxWidth: 1100, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsx4(PricingMatrix, { mobile }),
      /* @__PURE__ */ jsxs3("div", { style: { marginTop: mobile ? 24 : 32, textAlign: "center" }, children: [
        /* @__PURE__ */ jsx4(Btn, { style: {
          padding: mobile ? "14px 26px" : "16px 36px",
          fontSize: mobile ? 15 : 16
        }, iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0437\u0430 2 \u0447\u0430\u0441\u0430" }),
        /* @__PURE__ */ jsx4("div", { style: {
          marginTop: 12,
          fontSize: 12.5,
          color: VT.inkSoft,
          fontStyle: "italic"
        }, children: "\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u043D\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E\u043C \u0442\u0430\u0440\u0438\u0444\u0435 \u2014 \u043E\u043F\u043B\u0430\u0442\u0443 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043F\u043E\u0442\u043E\u043C, \u0435\u0441\u043B\u0438 \u0440\u0435\u0448\u0438\u0442\u0435 \u0440\u0430\u0441\u0442\u0438." })
      ] }),
      /* @__PURE__ */ jsx4("p", { style: {
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
      /* @__PURE__ */ jsx4("style", { children: `details > summary::-webkit-details-marker { display: none; }` }),
      /* @__PURE__ */ jsx4("span", { style: { flex: 1 }, children: q }),
      /* @__PURE__ */ jsx4("span", { style: {
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
    /* @__PURE__ */ jsx4("div", { style: {
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
    /* @__PURE__ */ jsx4("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx4(H2, { mobile, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0445\u043E\u0442\u044F\u0442 \u0443\u0442\u043E\u0447\u043D\u0438\u0442\u044C" }) }),
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
        /* @__PURE__ */ jsx4("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
        "\u041F\u0420\u041E \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u042B\u0415 \u0420\u0415\u041A\u041E\u041C\u0415\u041D\u0414\u0410\u0426\u0418\u0418"
      ] }),
      /* @__PURE__ */ jsx4("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_NEW.map((f, i) => /* @__PURE__ */ jsx4(FaqItem, { q: f.q, a: f.a, defaultOpen: i === 0, mobile, highlight: true }, f.q)) }),
      /* @__PURE__ */ jsx4("div", { style: {
        marginTop: 28,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.12em",
        color: VT.inkFaint,
        fontWeight: 600,
        marginBottom: 12
      }, children: "\u041E\u0421\u0422\u0410\u041B\u042C\u041D\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx4("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: FAQ_REST.map((f) => /* @__PURE__ */ jsx4(FaqItem, { q: f.q, a: f.a, mobile }, f.q)) })
    ] })
  ] });
}
function FinalCtaSection({ mobile }) {
  const ladder = [
    { when: "\u0427\u0435\u0440\u0435\u0437 2 \u0447\u0430\u0441\u0430", what: "\u0443 \u0432\u0430\u0441 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E", what: "\u043F\u043E\u0434\u0442\u044F\u043D\u0435\u0442 \u0441\u0432\u0435\u0436\u0438\u0435 \u043F\u043E\u0441\u0442\u044B, \u0446\u0435\u043D\u044B \u0438 \u0444\u043E\u0442\u043E \u0438\u0437 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" },
    { when: "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446", what: "\u043D\u0430\u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0434\u0430\u043D\u043D\u044B\u0445 \u2014 \u0438 \u043D\u0430\u0447\u043D\u0451\u0442 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C, \u0447\u0442\u043E \u0443\u043B\u0443\u0447\u0448\u0438\u0442\u044C" }
  ];
  return /* @__PURE__ */ jsx4("section", { id: "cta", style: {
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
    /* @__PURE__ */ jsx4("div", { "aria-hidden": "true", style: {
      position: "absolute",
      right: -140,
      top: -120,
      width: 420,
      height: 420,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${VT.accent} 0%, transparent 60%)`,
      opacity: 0.4
    } }),
    /* @__PURE__ */ jsx4("div", { "aria-hidden": "true", style: {
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
        /* @__PURE__ */ jsx4("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0432\u044B\u0435 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F.",
        /* @__PURE__ */ jsx4("br", {}),
        "\u0427\u0435\u0440\u0435\u0437 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0441\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439 \u0432\u044B \u0441\u0430\u043C\u0438",
        /* @__PURE__ */ jsx4("br", {}),
        "\u0431\u044B \u043D\u0435 \u0434\u043E\u0433\u0430\u0434\u0430\u043B\u0438\u0441\u044C \u0441\u043E\u0431\u0440\u0430\u0442\u044C."
      ] }),
      /* @__PURE__ */ jsx4("p", { style: {
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
        /* @__PURE__ */ jsx4("b", { style: { color: VT.accentSoft }, children: "\u043E\u0442 690 \u20BD \u0432 \u043C\u0435\u0441\u044F\u0446" }),
        "."
      ] }),
      /* @__PURE__ */ jsx4("div", { style: {
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
          /* @__PURE__ */ jsx4("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
          "\u0428\u0410\u0413 ",
          i + 1
        ] }),
        /* @__PURE__ */ jsx4("div", { style: {
          fontSize: mobile ? 18 : 21,
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.025em",
          lineHeight: 1.15
        }, children: rung.when }),
        /* @__PURE__ */ jsx4("div", { style: {
          fontSize: mobile ? 14 : 14.5,
          color: "oklch(0.85 0.014 60)",
          lineHeight: 1.4,
          textWrap: "pretty"
        }, children: rung.what })
      ] }, i)) }),
      /* @__PURE__ */ jsx4("div", { style: { marginTop: mobile ? 28 : 36, display: "inline-flex" }, children: /* @__PURE__ */ jsx4(Btn, { iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), style: {
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
        /* @__PURE__ */ jsx4("a", { style: {
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
    /* @__PURE__ */ jsx4("style", { children: `
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
      /* @__PURE__ */ jsx4("a", { href: "#hero", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx4(BrandMark, { size: mobile ? 22 : 26, fontSize: mobile ? 18 : 20 }) }),
      !mobile ? /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: "clamp(12px, 1.6vw, 24px)", fontSize: 14, flexWrap: "nowrap", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx4("a", { href: "#examples", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" }),
        /* @__PURE__ */ jsx4("a", { href: "#pricing", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u0426\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx4("a", { href: "#faq", className: "ss-nav-link", style: { whiteSpace: "nowrap" }, children: "\u041F\u043E\u043C\u043E\u0449\u044C" }),
        /* @__PURE__ */ jsx4("a", { href: "#login", className: "ss-login-link", style: {
          fontWeight: 500,
          fontSize: 14,
          padding: "8px 16px",
          whiteSpace: "nowrap"
        }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs3("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
        ] })
      ] }) : /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx4("a", { href: "#login", className: "ss-login-link", style: { fontWeight: 500, fontSize: 13.5, padding: "8px 12px" }, children: "\u0412\u043E\u0439\u0442\u0438" }),
        /* @__PURE__ */ jsxs3("a", { href: "#hero", style: primaryStyle, children: [
          primaryLabel,
          " ",
          /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", children: "\u2192" })
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
      /* @__PURE__ */ jsx4(BrandMark, { size: 20, fontSize: 15, color: VT.inkSoft }),
      /* @__PURE__ */ jsxs3("span", { children: [
        "\xA9 2026 \xB7 ",
        BRAND.domain,
        " \xB7 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432 \u0420\u0424"
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx4("a", { style: { color: "inherit" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
      /* @__PURE__ */ jsx4("a", { style: { color: "inherit" }, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
      /* @__PURE__ */ jsx4("a", { style: { color: "inherit" }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" })
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
    /* @__PURE__ */ jsx4("style", { children: `
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
      /* @__PURE__ */ jsx4("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx4("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx4(StickyHeader, { mobile }),
      /* @__PURE__ */ jsx4(HeroBlock, { mobile }),
      /* @__PURE__ */ jsx4(ExamplesSection, { mobile }),
      /* @__PURE__ */ jsx4(CycleSection, { mobile }),
      /* @__PURE__ */ jsx4(MondaySection, { mobile }),
      /* @__PURE__ */ jsx4(BaseWorkSection, { mobile }),
      /* @__PURE__ */ jsx4(SourcesSection, { mobile }),
      /* @__PURE__ */ jsx4(OwnershipSection, { mobile }),
      /* @__PURE__ */ jsx4(AnalyticsSection, { mobile }),
      /* @__PURE__ */ jsx4(PricingSection, { mobile }),
      /* @__PURE__ */ jsx4(FaqSection, { mobile }),
      /* @__PURE__ */ jsx4(FinalCtaSection, { mobile }),
      /* @__PURE__ */ jsx4(Footer, { mobile })
    ] })
  ] });
}
function SamosaytLandingV3_Desktop() {
  return /* @__PURE__ */ jsx4(SamosaytLandingV3, { mobile: false });
}
function SamosaytLandingV3_Mobile() {
  return /* @__PURE__ */ jsx4(SamosaytLandingV3, { mobile: true });
}
var SamosaytLanding = SamosaytLandingV3;
var Landing = SamosaytLandingV3;
var ConceptA_Desktop = SamosaytLandingV3_Desktop;
var ConceptA_Mobile = SamosaytLandingV3_Mobile;
var SamosaytLanding_Desktop = SamosaytLandingV3_Desktop;
var SamosaytLanding_Mobile = SamosaytLandingV3_Mobile;
var HeroSection = HeroBlock;

// src/intake/index.tsx
import { Fragment as Fragment3, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function ModalShell({ children, width = 540 }) {
  return /* @__PURE__ */ jsx5("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && showBack && /* @__PURE__ */ jsxs4("button", { style: {
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
      /* @__PURE__ */ jsxs4(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
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
  return /* @__PURE__ */ jsxs4("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", children: [
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
    return /* @__PURE__ */ jsxs4(
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
  return /* @__PURE__ */ jsxs4("div", { role: "tablist", "aria-label": "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430", style: {
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
    return /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx5("b", { children: meta.label }),
        counts ? /* @__PURE__ */ jsxs4("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
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
    return /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsxs4("span", { children: [
        /* @__PURE__ */ jsx5("b", { children: meta.label }),
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A \u0434\u043E\u0431\u0430\u0432\u0438\u043C."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs4("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
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
  return /* @__PURE__ */ jsxs4("div", { style: { marginTop: 14 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxs4(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 ",
        files.length,
        " \u0418\u0417 ",
        PHOTO_LIMITS.maxFiles
      ] }),
      /* @__PURE__ */ jsxs4(Mono, { style: { fontSize: 11 }, children: [
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
  return /* @__PURE__ */ jsxs4("label", { style: {
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
    return /* @__PURE__ */ jsxs4(
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
  return /* @__PURE__ */ jsxs4(Fragment3, { children: [
    /* @__PURE__ */ jsxs4("div", { role: "tablist", style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs4("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
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
  return /* @__PURE__ */ jsxs4("div", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 13.5, fontWeight: 500 }, children: "\u041F\u0440\u0430\u0439\u0441, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433, FAQ" }),
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: VT.inkFaint, fontFamily: VT.font.mono, marginTop: 1 }, children: "PDF / DOCX / TXT / RTF \xB7 \u0434\u043E 10 \u0444\u0430\u0439\u043B\u043E\u0432" })
    ] }),
    /* @__PURE__ */ jsx5(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" })
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4(ModalShell, { width: 540, children: [
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
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 18 }, children: [
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
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: [
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
  return /* @__PURE__ */ jsxs4(ModalShell, { width: 560, children: [
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
    !empty && files.length < PHOTO_LIMITS.minFiles && /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx5(
      StepHeader,
      {
        step: 2,
        total: 4,
        title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435",
        sub: "\u041F\u0430\u0440\u0430 \u0441\u0442\u0440\u043E\u043A, \u0447\u0442\u043E\u0431\u044B \u0418\u0418 \u0441\u043E\u0431\u0440\u0430\u043B \u0441\u0430\u0439\u0442 \u0442\u043E\u0447\u043D\u0435\u0435"
      }
    ),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 20 }, children: [
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
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5(FieldLabel, { required: true, children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx5(FieldInput, { value: city, placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A", onChange: onCityChange })
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
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
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0444\u0430\u0439\u043B\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }),
      textFiles.length === 0 ? /* @__PURE__ */ jsx5(TextFilesDropZone, { onPick: onPickTextFile }) : /* @__PURE__ */ jsxs4("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
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
  return /* @__PURE__ */ jsxs4(
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
        /* @__PURE__ */ jsxs4("div", { style: { flex: 1, minWidth: 0 }, children: [
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
  return /* @__PURE__ */ jsxs4(ModalShell, { width: 540, children: [
    /* @__PURE__ */ jsx5(
      StepHeader,
      {
        step,
        total,
        title: "\u041A\u0443\u0434\u0430 \u0432\u0430\u043C \u043F\u0438\u0441\u0430\u0442\u044C?",
        sub: "\u041E\u0434\u0438\u043D \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u0434\u043B\u044F \u0432\u0430\u0441 \u2014 \u0442\u0443\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442 \u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432."
      }
    ),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
      /* @__PURE__ */ jsxs4("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
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
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx5(FieldLabel, { children: channel === "phone" ? "\u0412\u0430\u0448 \u043D\u043E\u043C\u0435\u0440 \u0434\u043B\u044F SMS" : channel === "email" ? "\u0412\u0430\u0448 email" : channel === "max" ? "\u0412\u0430\u0448 MAX (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" }),
      /* @__PURE__ */ jsx5(FieldInput, { value: contact, placeholder: ph, mono: true, onChange: onContactChange })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx5(
      Checkbox,
      {
        checked: consent,
        onChange: (v) => onConsentChange?.(v),
        label: /* @__PURE__ */ jsx5(Fragment3, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }),
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
  return /* @__PURE__ */ jsxs4("div", { style: {
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
  return /* @__PURE__ */ jsxs4(ModalShell, { width: 540, children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxs4(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
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
    /* @__PURE__ */ jsxs4("p", { style: { fontSize: 15, lineHeight: 1.5, color: VT.inkSoft, margin: 0 }, children: [
      "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 ",
      /* @__PURE__ */ jsx5("b", { style: { color: VT.ink }, children: "2 \u0447\u0430\u0441\u043E\u0432" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 20 }, children: [
      mode === "link" && summary.url && /* @__PURE__ */ jsx5(SummaryRow, { label: "\u0421\u0421\u042B\u041B\u041A\u0410", value: /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.url }) }),
      mode === "photo" && /* @__PURE__ */ jsxs4(Fragment3, { children: [
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
          value: /* @__PURE__ */ jsxs4("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
            summary.contact,
            /* @__PURE__ */ jsxs4("span", { style: { color: VT.inkFaint }, children: [
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
    summary
  } = props;
  const total = mode === "photo" ? 4 : 3;
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

// src/customer/index.tsx
import { Fragment as Fragment4, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: src ? "#222" : `
        radial-gradient(110% 80% at 30% 20%, ${c1} 0%, transparent 55%),
        radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%),
        linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)
      `,
    ...style
  }, children: [
    src && /* @__PURE__ */ jsx6(
      "img",
      {
        src,
        alt: "",
        loading: "lazy",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }
    ),
    !src && /* @__PURE__ */ jsx6("div", { "aria-hidden": "true", style: {
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
var U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
var STUDIO_PHOTOS = {
  hero: U("photo-1604654894610-df63bc536371", 1100),
  master: U("photo-1580618672591-eb180b1a973f", 600),
  gallery: [
    U("photo-1607779097040-26e80aa78e66", 600),
    U("photo-1610992015732-2449b76344bc", 600),
    U("photo-1632345031435-8727f6897d53", 600),
    U("photo-1604902396830-aca29e19b067", 600),
    U("photo-1604654894610-df63bc536371", 600),
    U("photo-1607779097040-26e80aa78e66", 600),
    U("photo-1604902396830-aca29e19b067", 600),
    U("photo-1610992015732-2449b76344bc", 600),
    U("photo-1632345031435-8727f6897d53", 600),
    U("photo-1607779097040-26e80aa78e66", 600)
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
  return /* @__PURE__ */ jsx6("span", { style: {
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
  return /* @__PURE__ */ jsx6("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: filled ? "#f4a93b" : "none", stroke: filled ? "#f4a93b" : "#ccc", strokeWidth: "1.5", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" }) });
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
  return /* @__PURE__ */ jsxs5("header", { style: {
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
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx6("span", { style: {
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
      /* @__PURE__ */ jsx6("div", { style: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.name })
    ] }),
    /* @__PURE__ */ jsx6("nav", { style: { display: "flex", alignItems: "center", gap: 22, marginLeft: 12, fontSize: 14, color: s.sub }, children: links.map(([label, href]) => /* @__PURE__ */ jsx6("a", { href, style: { color: "inherit", textDecoration: "none" }, children: label }, label)) }),
    /* @__PURE__ */ jsxs5("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxs5("a", { href: `tel:${STUDIO.phoneHref}`, style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: s.ink,
        textDecoration: "none",
        fontWeight: 500
      }, children: [
        /* @__PURE__ */ jsx6("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
        STUDIO.phone
      ] }),
      /* @__PURE__ */ jsx6("a", { href: "#book", style: {
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
  return /* @__PURE__ */ jsxs5("section", { style: {
    padding: "48px 36px 40px",
    borderBottom: `1px solid ${s.line}`,
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 36,
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsxs5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent }, children: [
        STUDIO.category.toUpperCase(),
        " \xB7 ",
        STUDIO.city.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx6("h1", { style: {
        fontSize: 52,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.04,
        margin: "14px 0 16px",
        whiteSpace: "pre-line",
        textWrap: "balance"
      }, children: STUDIO.hero.title }),
      /* @__PURE__ */ jsx6("p", { style: { fontSize: 17, lineHeight: 1.5, color: s.sub, maxWidth: 480, margin: 0, textWrap: "pretty" }, children: STUDIO.hero.sub }),
      /* @__PURE__ */ jsxs5("div", { style: {
        marginTop: 24,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 999
      }, children: [
        /* @__PURE__ */ jsx6("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx6(CStar, { filled: true, size: 14 }, i)) }),
        /* @__PURE__ */ jsx6("span", { style: { fontWeight: 700, color: s.ink, fontSize: 14 }, children: STUDIO.trust.rating }),
        /* @__PURE__ */ jsxs5("span", { style: { color: s.sub, fontSize: 13 }, children: [
          "\xB7 ",
          STUDIO.trust.reviews,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs5("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx6(IconArrow, { size: 16 })
        ] }),
        /* @__PURE__ */ jsxs5("a", { href: `tel:${STUDIO.phoneHref}`, style: {
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
          /* @__PURE__ */ jsx6("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
          STUDIO.phone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5(CPhoto, { tone: s.photoTone, src: STUDIO_PHOTOS.hero, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` }, children: [
      /* @__PURE__ */ jsx6("div", { "aria-hidden": "true", style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)"
      } }),
      /* @__PURE__ */ jsxs5("div", { style: { position: "absolute", left: 20, bottom: 18, right: 20, color: "#fff" }, children: [
        /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", opacity: 0.9 }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0412 \u0426\u0415\u041D\u0422\u0420\u0415 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A\u0410" }),
        /* @__PURE__ */ jsx6("div", { style: { fontWeight: 600, fontSize: 15, marginTop: 4 }, children: STUDIO.address })
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
  return /* @__PURE__ */ jsxs5("section", { style: {
    padding: "20px 36px",
    background: s.bgAlt,
    borderBottom: `1px solid ${s.line}`,
    display: "flex",
    alignItems: "center",
    gap: 28,
    flexWrap: "wrap"
  }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      fontFamily: VT.font.mono,
      fontSize: 12,
      letterSpacing: "0.1em",
      color: s.sub
    }, children: [
      "\u041D\u0410\u0421 \u0412\u042B\u0411\u0420\u0410\u041B\u0418",
      /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.sans, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.trust.clients }),
      /* @__PURE__ */ jsxs5("span", { children: [
        "\u0427\u0415\u041B\u041E\u0412\u0415\u041A \u0417\u0410 ",
        STUDIO.trust.years.toUpperCase()
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", alignItems: "center", gap: 18, marginLeft: "auto", flexWrap: "wrap" }, children: badges.map((b) => /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx6("span", { style: {
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
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 1 }, children: [
        /* @__PURE__ */ jsxs5("div", { style: { fontSize: 13, fontWeight: 600, color: s.ink, display: "flex", alignItems: "center", gap: 6 }, children: [
          b.stars,
          " ",
          /* @__PURE__ */ jsx6("span", { style: { color: "#f4a93b" }, children: "\u2605" }),
          /* @__PURE__ */ jsxs5("span", { style: { color: s.sub, fontWeight: 400 }, children: [
            "\xB7 ",
            b.name
          ] })
        ] }),
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: b.count })
      ] })
    ] }, b.name)) })
  ] });
}
function CustomerServices({ s }) {
  return /* @__PURE__ */ jsxs5("section", { id: "services", style: { padding: "52px 36px 40px", scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
        /* @__PURE__ */ jsx6("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u044F \u0434\u0435\u043B\u0430\u044E" })
      ] }),
      /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u0446\u0435\u043D\u044B \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u044B 12 \u043C\u0430\u044F 2026" })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 14
    }, children: STUDIO.services.map((sv, i) => /* @__PURE__ */ jsxs5("article", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 16,
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      gridColumn: i === 0 && STUDIO.services.length % 2 === 1 ? "1 / -1" : "auto"
    }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }, children: [
        /* @__PURE__ */ jsx6("h3", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", margin: 0, color: s.ink, lineHeight: 1.2 }, children: sv.name }),
        /* @__PURE__ */ jsxs5("div", { style: { textAlign: "right", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 18, fontWeight: 700, color: s.ink, letterSpacing: "-0.01em" }, children: sv.price }),
          sv.priceHint && /* @__PURE__ */ jsx6("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: sv.priceHint })
        ] })
      ] }),
      /* @__PURE__ */ jsx6("p", { style: { fontSize: 14, color: s.sub, lineHeight: 1.5, margin: 0, flex: 1 }, children: sv.desc }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }, children: [
        sv.dur && /* @__PURE__ */ jsxs5("span", { style: {
          fontFamily: VT.font.mono,
          fontSize: 12,
          color: s.sub,
          display: "inline-flex",
          alignItems: "center",
          gap: 5
        }, children: [
          /* @__PURE__ */ jsxs5("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx6("circle", { cx: "12", cy: "12", r: "9" }),
            /* @__PURE__ */ jsx6("path", { d: "M12 7v5l3 2" })
          ] }),
          sv.dur
        ] }),
        /* @__PURE__ */ jsxs5("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx6(IconArrow, { size: 14 })
        ] })
      ] })
    ] }, sv.name)) })
  ] });
}
function ProcessIcon({ kind, color, soft }) {
  const sz = 26;
  const svg = {
    calendar: /* @__PURE__ */ jsxs5("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx6("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
      /* @__PURE__ */ jsx6("path", { d: "M8 3v4M16 3v4M3 10h18" })
    ] }),
    pin: /* @__PURE__ */ jsxs5("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx6("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
      /* @__PURE__ */ jsx6("circle", { cx: "12", cy: "10", r: "3" })
    ] }),
    coffee: /* @__PURE__ */ jsxs5("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx6("path", { d: "M4 8h13v5a5 5 0 0 1-5 5H9 a5 5 0 0 1-5-5z" }),
      /* @__PURE__ */ jsx6("path", { d: "M17 9 h2 a3 3 0 0 1 0 6 h-2" }),
      /* @__PURE__ */ jsx6("path", { d: "M7 4 c 0 1 1 1 1 2 s -1 1 -1 2" }),
      /* @__PURE__ */ jsx6("path", { d: "M11 4 c 0 1 1 1 1 2 s -1 1 -1 2" })
    ] }),
    sparkles: /* @__PURE__ */ jsxs5("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "currentColor", children: [
      /* @__PURE__ */ jsx6("path", { d: "M12 3 L13.4 8.2 L18.6 9 L13.4 9.8 L12 15 L10.6 9.8 L5.4 9 L10.6 8.2 Z" }),
      /* @__PURE__ */ jsx6("circle", { cx: "19", cy: "18", r: "1.6" }),
      /* @__PURE__ */ jsx6("circle", { cx: "6", cy: "19", r: "1.2" })
    ] })
  }[kind];
  return /* @__PURE__ */ jsx6("div", { style: {
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
  return /* @__PURE__ */ jsxs5("section", { style: { padding: "40px 36px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, borderBottom: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041A\u0410\u041A \u0411\u0423\u0414\u0415\u0422" }),
      /* @__PURE__ */ jsxs5("h2", { style: { fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: [
        "\u041E\u0442 \u0437\u0430\u043F\u0438\u0441\u0438 \u0434\u043E\xA0\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u2014",
        /* @__PURE__ */ jsx6("br", {}),
        "\u0447\u0435\u0442\u044B\u0440\u0435 \u0448\u0430\u0433\u0430"
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      position: "relative"
    }, children: STUDIO.process.map((p, i) => /* @__PURE__ */ jsxs5("div", { style: { position: "relative" }, children: [
      i < STUDIO.process.length - 1 && /* @__PURE__ */ jsx6("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 26,
        right: -16,
        width: 32,
        height: 2,
        background: `repeating-linear-gradient(to right, ${s.line} 0 4px, transparent 4px 8px)`
      } }),
      /* @__PURE__ */ jsx6(ProcessIcon, { kind: icons[i], color: s.accent, soft: s.accentSoft }),
      /* @__PURE__ */ jsxs5("div", { style: {
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
      /* @__PURE__ */ jsx6("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "4px 0 6px", color: s.ink }, children: p.title }),
      /* @__PURE__ */ jsx6("p", { style: { fontSize: 13.5, color: s.sub, lineHeight: 1.5, margin: 0 }, children: p.body })
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
  return /* @__PURE__ */ jsxs5("section", { style: { padding: "52px 36px 40px" }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041F\u041E\u0420\u0422\u0424\u041E\u041B\u0418\u041E" }),
        /* @__PURE__ */ jsx6("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0420\u0430\u0431\u043E\u0442\u044B" })
      ] }),
      /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E" })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "170px",
      gap: 10
    }, children: tiles.map((t, i) => /* @__PURE__ */ jsx6(CPhoto, { tone: t.tone, src: t.src, style: {
      gridColumn: t.span === "l" ? "span 2" : "span 1",
      gridRow: t.span === "l" ? "span 2" : "span 1",
      borderRadius: 12,
      border: `1px solid ${s.line}`
    } }, i)) })
  ] });
}
function CustomerReviews({ s }) {
  return /* @__PURE__ */ jsxs5("section", { id: "reviews", style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E\u0422\u0417\u042B\u0412\u042B" }),
        /* @__PURE__ */ jsx6("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 8px", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u044F\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u044B" }),
        /* @__PURE__ */ jsxs5("div", { style: { fontSize: 14, color: s.sub, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx6("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx6(CStar, { filled: true, size: 14 }, i)) }),
          /* @__PURE__ */ jsx6("span", { style: { fontWeight: 600, color: s.ink }, children: "4.9 \u0438\u0437 5" }),
          /* @__PURE__ */ jsxs5("span", { children: [
            "\xB7 ",
            STUDIO.trust.reviews,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: {
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
        /* @__PURE__ */ jsx6("span", { style: { color: s.accent }, children: "\u2605" }),
        /* @__PURE__ */ jsx6("span", { children: "\u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0412\u042B\u0411\u0420\u0410\u041B \u0418\u0418 \xB7 \u041E\u0411\u041D\u041E\u0412\u041B\u042F\u0415\u0422\u0421\u042F \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u041E" })
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }, children: STUDIO.reviews.map((r, i) => /* @__PURE__ */ jsxs5("div", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 14,
      padding: 20,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }, children: [
      r.curated && /* @__PURE__ */ jsx6("span", { style: {
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
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
        /* @__PURE__ */ jsx6(ReviewAvatar, { name: r.author, tone: r.tone, size: 36 }),
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx6("div", { style: { fontWeight: 600, fontSize: 14, color: s.ink, lineHeight: 1.1 }, children: r.author }),
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 12, color: s.sub, fontFamily: VT.font.mono, marginTop: 2 }, children: r.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 2 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx6(CStar, { filled: j < r.stars, size: 13 }, j)) }),
      /* @__PURE__ */ jsxs5("p", { style: { fontSize: 14, lineHeight: 1.55, color: s.ink, margin: 0, textWrap: "pretty" }, children: [
        "\xAB",
        r.text,
        "\xBB"
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs5("div", { style: {
      marginTop: 28,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs5("a", { href: "#book", style: {
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
        /* @__PURE__ */ jsx6(IconArrow, { size: 16 })
      ] }),
      /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 12, color: s.sub }, children: "\u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u043E\u043A\u043D\u043E \u2014 \u0447\u0435\u0442\u0432\u0435\u0440\u0433 14:00" })
    ] })
  ] });
}
function CustomerAbout({ s }) {
  return /* @__PURE__ */ jsxs5("section", { id: "about", style: {
    padding: "52px 36px",
    display: "grid",
    gridTemplateColumns: "0.8fr 1.2fr",
    gap: 36,
    alignItems: "flex-start",
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsx6("div", { children: /* @__PURE__ */ jsx6(CPhoto, { tone: "rose", src: STUDIO_PHOTOS.master, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` } }) }),
    /* @__PURE__ */ jsxs5("div", { children: [
      /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E \u041C\u0410\u0421\u0422\u0415\u0420\u0415" }),
      /* @__PURE__ */ jsx6("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 4px", lineHeight: 1.1 }, children: STUDIO.about.masterName }),
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 15, color: s.sub, marginBottom: 16 }, children: STUDIO.about.role }),
      /* @__PURE__ */ jsx6("p", { style: { fontSize: 15.5, lineHeight: 1.6, color: s.ink, margin: "0 0 22px", maxWidth: 560, textWrap: "pretty" }, children: STUDIO.about.bio }),
      /* @__PURE__ */ jsx6("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
        marginBottom: 24
      }, children: STUDIO.about.creds.map(([title, body]) => /* @__PURE__ */ jsxs5("div", { style: {
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 12,
        padding: "12px 14px"
      }, children: [
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 13.5, fontWeight: 600, color: s.ink, letterSpacing: "-0.01em" }, children: title }),
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 12, color: s.sub, marginTop: 2 }, children: body })
      ] }, title)) }),
      /* @__PURE__ */ jsx6("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }, children: "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442" }),
      /* @__PURE__ */ jsx6("ul", { style: { listStyle: "none", padding: 0, margin: 0, fontSize: 14.5, color: s.ink, display: "flex", flexDirection: "column", gap: 8 }, children: STUDIO.guarantees.map((item) => /* @__PURE__ */ jsxs5("li", { style: { display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.5 }, children: [
        /* @__PURE__ */ jsx6("span", { style: {
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
        }, children: /* @__PURE__ */ jsx6("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        item
      ] }, item)) })
    ] })
  ] });
}
function CustomerFaq({ s }) {
  return /* @__PURE__ */ jsxs5("section", { style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0427\u0410\u0421\u0422\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx6("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442" })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
      maxWidth: 760,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }, children: STUDIO.faq.map(([q, a], i) => /* @__PURE__ */ jsxs5("details", { open: i === 0, style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 12,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs5("summary", { style: {
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
        /* @__PURE__ */ jsx6("span", { style: { flex: 1 }, children: q }),
        /* @__PURE__ */ jsx6("span", { style: {
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
      /* @__PURE__ */ jsx6("div", { style: {
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
  return /* @__PURE__ */ jsxs5("div", { children: [
    label && /* @__PURE__ */ jsx6("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsx6("div", { style: {
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    border: `1px solid ${s.line}`,
    background: s.bgAlt,
    aspectRatio: "1 / 1",
    minHeight: 280
  }, children: [
    /* @__PURE__ */ jsxs5("svg", { viewBox: "0 0 400 400", width: "100%", height: "100%", style: { display: "block", opacity: 0.6 }, children: [
      /* @__PURE__ */ jsx6("defs", { children: /* @__PURE__ */ jsx6("pattern", { id: "grid-map", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx6("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: s.line, strokeWidth: "1" }) }) }),
      /* @__PURE__ */ jsx6("rect", { width: "400", height: "400", fill: "url(#grid-map)" }),
      /* @__PURE__ */ jsx6("path", { d: "M 0 220 Q 100 180, 180 220 T 400 200", fill: "none", stroke: s.accent, strokeWidth: "3", strokeLinecap: "round", opacity: "0.5" }),
      /* @__PURE__ */ jsx6("path", { d: "M 40 0 L 80 120 L 60 240 L 100 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx6("path", { d: "M 220 0 L 260 180 L 240 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx6("path", { d: "M 0 80 L 400 60", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" }),
      /* @__PURE__ */ jsx6("path", { d: "M 0 340 L 400 320", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsx6("div", { style: {
        background: s.accent,
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.35)",
        whiteSpace: "nowrap"
      }, children: STUDIO.name }),
      /* @__PURE__ */ jsx6("svg", { width: "22", height: "14", viewBox: "0 0 22 14", fill: s.accent, children: /* @__PURE__ */ jsx6("path", { d: "M0 0 L22 0 L11 14 Z" }) })
    ] }),
    /* @__PURE__ */ jsx6("div", { style: {
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
  return /* @__PURE__ */ jsxs5("section", { id: "book", style: {
    padding: "52px 36px 40px",
    borderTop: `1px solid ${s.line}`,
    background: s.bg,
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0417\u0410\u041F\u0418\u0421\u042C" }),
      /* @__PURE__ */ jsx6("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 6px", lineHeight: 1.1 }, children: "\u0417\u0430\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043E\u043D\u043B\u0430\u0439\u043D \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434" }),
      /* @__PURE__ */ jsx6("p", { style: { fontSize: 15.5, color: s.sub, margin: 0 }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442. \u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\xA0\u043F\u0435\u0440\u0435\u0434\u0430\u0451\u043C \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C." })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx6("div", { style: {
        background: s.white,
        border: `1px solid ${s.line}`,
        borderRadius: 18,
        padding: 28
      }, children: confirmed ? /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: s.bgAlt, borderRadius: 12 }, children: [
        /* @__PURE__ */ jsx6("span", { style: { width: 40, height: 40, borderRadius: "50%", background: VT.successSoft, color: VT.success, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx6("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx6("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx6("div", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430" }),
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 13.5, color: s.sub }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0430. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443." })
        ] })
      ] }) : /* @__PURE__ */ jsxs5(Fragment4, { children: [
        /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx6(CustomerInput, { label: "\u041A\u0430\u043A \u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442", placeholder: "\u0418\u043C\u044F", s }),
          /* @__PURE__ */ jsx6(CustomerInput, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", placeholder: "+7 ___ ___-__-__", s })
        ] }),
        /* @__PURE__ */ jsxs5("div", { style: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx6(CustomerSelect, { label: "\u0423\u0441\u043B\u0443\u0433\u0430", value: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", s }),
          /* @__PURE__ */ jsx6(CustomerSelect, { label: "\u0423\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F", value: "\u0437\u0430\u0432\u0442\u0440\u0430, \u043F\u043E\u0441\u043B\u0435 14:00", s })
        ] }),
        /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 10, color: s.sub, marginTop: 10 }, children: `<input type="text" name="company" tabIndex={-1} style="display:none"> // honeypot` }),
        /* @__PURE__ */ jsx6("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx6(Checkbox, { checked: false, label: /* @__PURE__ */ jsx6(Fragment4, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430" }) }),
        /* @__PURE__ */ jsx6("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsxs5("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx6(IconArrow, { size: 16 })
        ] }) }),
        /* @__PURE__ */ jsx6(Mono, { style: { display: "block", fontSize: 11, color: s.sub, marginTop: 10, textAlign: "center" }, children: "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha" }),
        /* @__PURE__ */ jsxs5("div", { style: {
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid ${s.line}`,
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 13, color: s.sub, marginBottom: 10 }, children: "\u041D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u044B? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\xA0\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440:" }),
          /* @__PURE__ */ jsxs5("div", { style: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxs5("a", { href: `https://t.me/${STUDIO.tg.replace("@", "")}`, style: {
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
              /* @__PURE__ */ jsx6("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx6("path", { d: "M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" }) }),
              "Telegram"
            ] }),
            /* @__PURE__ */ jsxs5("a", { href: `https://wa.me/${STUDIO.whatsapp}`, style: {
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
              /* @__PURE__ */ jsx6("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx6("path", { d: "M12 2 A10 10 0 0 0 3 17 L2 22 L7 21 A10 10 0 1 0 12 2 Z M9 7 C 9.5 7 10 7.5 10.5 9 C 11 10 11 10.5 10 11 C 9.5 11.5 9 12 10 13 C 11 14 12 14.5 12.5 14 C 13 13 13.5 13 14.5 13.5 C 15.5 14 16 14.5 16 15 C 16 17 13 17 11 16 C 9 15 7 13 7 11 C 7 9 8 7 9 7 Z" }) }),
              "WhatsApp"
            ] }),
            /* @__PURE__ */ jsxs5("a", { href: `tel:${STUDIO.phoneHref}`, style: {
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
              /* @__PURE__ */ jsx6("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: /* @__PURE__ */ jsx6("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
              "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs5("div", { id: "contact", style: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        scrollMarginTop: 80
      }, children: [
        /* @__PURE__ */ jsx6(MapPlaceholder, { s }),
        /* @__PURE__ */ jsxs5("div", { style: {
          background: s.white,
          border: `1px solid ${s.line}`,
          borderRadius: 14,
          padding: "16px 18px"
        }, children: [
          /* @__PURE__ */ jsx6("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: s.accent,
            fontWeight: 600,
            marginBottom: 8
          }, children: "\u0413\u0414\u0415 \u0418 \u041A\u041E\u0413\u0414\u0410" }),
          /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }, children: [
            /* @__PURE__ */ jsx6("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs5("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx6("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
              /* @__PURE__ */ jsx6("circle", { cx: "12", cy: "10", r: "3" })
            ] }) }),
            /* @__PURE__ */ jsx6("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.address })
          ] }),
          /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsx6("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs5("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx6("circle", { cx: "12", cy: "12", r: "9" }),
              /* @__PURE__ */ jsx6("path", { d: "M12 7v5l3 2" })
            ] }) }),
            /* @__PURE__ */ jsx6("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.hours })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function CustomerSelect({ label, value, s }) {
  return /* @__PURE__ */ jsxs5("div", { children: [
    label && /* @__PURE__ */ jsx6("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsxs5("div", { style: {
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
      /* @__PURE__ */ jsx6("span", { children: value }),
      /* @__PURE__ */ jsx6("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx6("path", { d: "M6 9l6 6 6-6" }) })
    ] })
  ] });
}
function CustomerLeadForm({ s, confirmed = false }) {
  return /* @__PURE__ */ jsx6(CustomerBooking, { s, confirmed });
}
function CustomerFooter({ s, plan = "free" }) {
  return /* @__PURE__ */ jsxs5("footer", { style: {
    padding: "22px 36px 24px",
    borderTop: `1px solid ${s.line}`,
    background: s.bgAlt,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontSize: 13,
    color: s.sub
  }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx6("span", { style: { color: s.ink, fontWeight: 600 }, children: STUDIO.name }),
        /* @__PURE__ */ jsxs5("span", { children: [
          "\xB7 ",
          STUDIO.address
        ] }),
        /* @__PURE__ */ jsx6("a", { href: `tel:${STUDIO.phoneHref}`, style: { color: "inherit", textDecoration: "none", fontFamily: VT.font.mono }, children: STUDIO.phone })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 18, fontSize: 12.5 }, children: [
        /* @__PURE__ */ jsx6("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
        /* @__PURE__ */ jsx6("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 12 }, children: [
      /* @__PURE__ */ jsxs5("span", { children: [
        "\xA9 2026 ",
        STUDIO.name,
        ". \u0418\u041F \u041F\u0435\u0442\u0440\u043E\u0432\u0430 \u0410. \u0418., \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u0430\u044F."
      ] }),
      plan === "free" ? /* @__PURE__ */ jsxs5("a", { style: {
        color: s.sub,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: VT.font.mono,
        fontSize: 11.5
      }, children: [
        "\u0421\u0414\u0415\u041B\u0410\u041D\u041E \u041D\u0410 ",
        /* @__PURE__ */ jsx6("b", { style: { color: s.ink, fontFamily: VT.font.sans }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" }),
        " \u2192"
      ] }) : /* @__PURE__ */ jsx6("span", {})
    ] })
  ] });
}
function S7_CustomerSite({ scheme = "cream", plan = "free" }) {
  const s = SCHEMES[scheme];
  return /* @__PURE__ */ jsxs5("div", { style: { background: s.bg, color: s.ink, fontFamily: VT.font.sans, minHeight: "100%", letterSpacing: "-0.005em", position: "relative" }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
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
      /* @__PURE__ */ jsx6("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx6("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx6("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx6("span", { style: { marginLeft: 12 }, children: "studia-anna.samosite.online" })
    ] }),
    /* @__PURE__ */ jsx6(CustomerHeader, { s }),
    /* @__PURE__ */ jsx6(CustomerHero, { s }),
    /* @__PURE__ */ jsx6(CustomerSocialBar, { s }),
    /* @__PURE__ */ jsx6(CustomerServices, { s }),
    /* @__PURE__ */ jsx6(CustomerProcess, { s }),
    /* @__PURE__ */ jsx6(CustomerGallery, { s }),
    /* @__PURE__ */ jsx6(CustomerReviews, { s }),
    /* @__PURE__ */ jsx6(CustomerAbout, { s }),
    /* @__PURE__ */ jsx6(CustomerFaq, { s }),
    /* @__PURE__ */ jsx6(CustomerBooking, { s }),
    /* @__PURE__ */ jsx6(CustomerFooter, { s, plan })
  ] });
}
function S8_LeadFormConfirm() {
  const s = SCHEMES.cream;
  return /* @__PURE__ */ jsx6("div", { style: { background: s.bg, fontFamily: VT.font.sans, padding: 24 }, children: /* @__PURE__ */ jsx6(CustomerLeadForm, { s, confirmed: true }) });
}
function S7_SchemeSwatches() {
  return /* @__PURE__ */ jsx6("div", { style: {
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
    return /* @__PURE__ */ jsxs5("div", { style: { width: 200 }, children: [
      /* @__PURE__ */ jsxs5("div", { style: {
        height: 110,
        borderRadius: VT.r.md,
        overflow: "hidden",
        border: `1px solid ${s.line}`,
        background: s.bg,
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ jsx6("div", { style: { flex: 1, padding: 12, color: s.ink, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
        /* @__PURE__ */ jsx6("div", { style: { height: 8, background: s.accent } }),
        /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 4, padding: 8 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx6("div", { style: { flex: 1, height: 14, borderRadius: 3, background: s.accentSoft } }, i)) })
      ] }),
      /* @__PURE__ */ jsx6("div", { style: { marginTop: 8, fontSize: 13, fontWeight: 600 }, children: name }),
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 12, color: VT.inkFaint }, children: hint })
    ] }, key);
  }) });
}
var WAITLIST_SOURCES = [
  ["vk", "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435"],
  ["ozon", "Ozon-\u0432\u0438\u0442\u0440\u0438\u043D\u0430"],
  ["youtube", "YouTube / Shorts"],
  ["dzen", "\u0414\u0437\u0435\u043D"],
  ["max", "MAX-\u043A\u0430\u043D\u0430\u043B"]
];
var FEATURE_LIST = [
  ["yclients", "YCLIENTS \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F"],
  ["amocrm", "amoCRM \u0438\u043D\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044F"],
  ["custom_domain", "\u0421\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D"],
  ["no_watermark", "\u0423\u0431\u0440\u0430\u0442\u044C \xAB\u0421\u0434\u0435\u043B\u0430\u043D\u043E \u043D\u0430\xA0\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435\xBB"],
  ["multilang", "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u044F\u0437\u044B\u043A\u043E\u0432"],
  ["payments", "\u041E\u043D\u043B\u0430\u0439\u043D-\u043E\u043F\u043B\u0430\u0442\u0430"],
  ["blog", "\u0411\u043B\u043E\u0433-CMS"],
  ["stats", "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439"]
];
function FBSection({ title, items }) {
  return /* @__PURE__ */ jsxs5(Card, { style: { padding: 22 }, children: [
    /* @__PURE__ */ jsx6("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: title }),
    /* @__PURE__ */ jsx6("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: "\u041F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0433\u0430\u043B\u043E\u0447\u043A\u0443 \u043D\u0430\u043F\u0440\u043E\u0442\u0438\u0432 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\xA0\u043D\u0443\u0436\u043D\u043E. \u041A\u043E\u0433\u0434\u0430 \u0441\u043E\u0431\u0435\u0440\u0451\u043C 10 \u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u2014 \u0434\u043E\u0431\u0430\u0432\u0438\u043C." }),
    /* @__PURE__ */ jsx6("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: items.map(([key, label]) => /* @__PURE__ */ jsx6(Checkbox, { checked: false, label }, key)) }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 14 }, children: [
      /* @__PURE__ */ jsx6("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u0421\u0432\u043E\u0451 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)" }),
      /* @__PURE__ */ jsx6("div", { style: {
        padding: "10px 12px",
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 13.5,
        color: VT.inkFaint
      }, children: "\u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435" })
    ] })
  ] });
}
function S9_FeedbackPage() {
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "24px 40px 48px",
    minHeight: "100%",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsx6("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px", lineHeight: 1.15 }, children: "\u0421\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0435\u0433\u043E\xA0\u043D\u0435\xA0\u0445\u0432\u0430\u0442\u0430\u0435\u0442" }),
    /* @__PURE__ */ jsx6("p", { style: { fontSize: 14, color: VT.inkSoft, maxWidth: 600, margin: "0 0 18px" }, children: "\u0414\u0435\u043B\u0430\u0435\u043C \u043F\u043E\xA0\u0437\u0430\u043F\u0440\u043E\u0441\u0443. \u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u043B\u044E\u0434\u0435\u0439 \u043F\u0440\u043E\u0441\u044F\u0442 \u043E\u0434\u043D\u043E \u0438\xA0\u0442\u043E\xA0\u0436\u0435 \u2014 \u0442\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C" }),
    /* @__PURE__ */ jsx6(Card, { style: { padding: 16 }, children: /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("label", { style: { display: "block", fontSize: 11.5, color: VT.inkSoft, marginBottom: 4 }, children: "\u041A\u0430\u043A\xA0\u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442" }),
        /* @__PURE__ */ jsx6("div", { style: { padding: "8px 10px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 13.5, color: VT.inkFaint }, children: "\u0438\u043C\u044F" })
      ] }),
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("label", { style: { display: "block", fontSize: 11.5, color: VT.inkSoft, marginBottom: 4 }, children: "Email, \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438\xA0@telegram" }),
        /* @__PURE__ */ jsx6("div", { style: { padding: "8px 10px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 13.5, color: VT.inkFaint }, children: "\u043A\u043E\u043D\u0442\u0430\u043A\u0442" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs5("div", { style: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsx6(FBSection, { title: "\u0425\u043E\u0447\u0443 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A", items: WAITLIST_SOURCES }),
      /* @__PURE__ */ jsx6(FBSection, { title: "\u0425\u043E\u0447\u0443 \u0444\u0438\u0447\u0443", items: FEATURE_LIST })
    ] }),
    /* @__PURE__ */ jsxs5(Card, { style: { marginTop: 12, padding: 16 }, children: [
      /* @__PURE__ */ jsx6("label", { style: { display: "block", fontSize: 11.5, color: VT.inkSoft, marginBottom: 4 }, children: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)" }),
      /* @__PURE__ */ jsx6("div", { style: { padding: "8px 10px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 13.5, color: VT.inkFaint, minHeight: 72 }, children: "\u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C" }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 12 }, children: /* @__PURE__ */ jsx6(Btn, { size: "sm", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" }) })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: {
      position: "absolute",
      right: 24,
      bottom: 24,
      background: VT.ink,
      color: VT.white,
      padding: "12px 18px",
      borderRadius: 999,
      fontSize: 14,
      fontWeight: 500,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      boxShadow: "0 8px 24px -8px rgba(0,0,0,0.3)"
    }, children: [
      /* @__PURE__ */ jsx6("span", { style: { fontSize: 16 }, children: "\u{1F4AC}" }),
      "\u0427\u0435\u0433\u043E\xA0\u043D\u0435\xA0\u0445\u0432\u0430\u0442\u0430\u0435\u0442?"
    ] })
  ] });
}
var CustomerSite = S7_CustomerSite;
var LeadForm = S8_LeadFormConfirm;
var FeedbackPage = S9_FeedbackPage;

// src/admin-demo/index.tsx
import { useState } from "react";
import { Fragment as Fragment6, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsxs6("svg", { ...props, children: [
        /* @__PURE__ */ jsx7("path", { d: "M4 20V12" }),
        /* @__PURE__ */ jsx7("path", { d: "M10 20V6" }),
        /* @__PURE__ */ jsx7("path", { d: "M16 20V14" }),
        /* @__PURE__ */ jsx7("path", { d: "M22 20V9" })
      ] });
    case "site":
      return /* @__PURE__ */ jsxs6("svg", { ...props, children: [
        /* @__PURE__ */ jsx7("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        /* @__PURE__ */ jsx7("path", { d: "M3 8h18" }),
        /* @__PURE__ */ jsx7("circle", { cx: "7", cy: "6", r: "0.5", fill: "currentColor" })
      ] });
    case "inbox":
      return /* @__PURE__ */ jsxs6("svg", { ...props, children: [
        /* @__PURE__ */ jsx7("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
        /* @__PURE__ */ jsx7("path", { d: "M3 14h5l1.5 2h5L16 14h5" })
      ] });
    case "star":
      return /* @__PURE__ */ jsx7("svg", { ...props, fill: "currentColor", stroke: "none", children: /* @__PURE__ */ jsx7("path", { d: "M12 2 L14.5 8.5 L21.5 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.5 9.3 L9.5 8.5 Z" }) });
    case "list":
      return /* @__PURE__ */ jsxs6("svg", { ...props, children: [
        /* @__PURE__ */ jsx7("path", { d: "M8 6h13" }),
        /* @__PURE__ */ jsx7("path", { d: "M8 12h13" }),
        /* @__PURE__ */ jsx7("path", { d: "M8 18h13" }),
        /* @__PURE__ */ jsx7("circle", { cx: "4", cy: "6", r: "1.2" }),
        /* @__PURE__ */ jsx7("circle", { cx: "4", cy: "12", r: "1.2" }),
        /* @__PURE__ */ jsx7("circle", { cx: "4", cy: "18", r: "1.2" })
      ] });
    case "gear":
      return /* @__PURE__ */ jsxs6("svg", { ...props, children: [
        /* @__PURE__ */ jsx7("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ jsx7("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 6
  }, children: [
    /* @__PURE__ */ jsx7("div", { style: { fontSize: 12.5, color: VT.inkFaint, fontWeight: 500, letterSpacing: "-0.005em" }, children: label }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
      /* @__PURE__ */ jsx7("span", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink, lineHeight: 1 }, children: value }),
      /* @__PURE__ */ jsxs6("span", { style: {
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
    /* @__PURE__ */ jsxs6("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, style: { marginTop: 4 }, children: [
      /* @__PURE__ */ jsx7("path", { d: area, fill: color, fillOpacity: "0.12" }),
      /* @__PURE__ */ jsx7("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "\u0422\u0440\u0430\u0444\u0438\u043A \u0437\u0430 30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 13, color: VT.inkFaint, marginTop: 2 }, children: "\u041A\u0430\u0436\u0434\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u2014 \u0434\u0435\u043D\u044C. \u0417\u0430\u044F\u0432\u043A\u0438 \u0438\u0434\u0443\u0442 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044F\u043C." })
      ] }),
      /* @__PURE__ */ jsxs6("div", { style: { display: "inline-flex", gap: 14, fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs6("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx7("span", { style: { width: 10, height: 10, borderRadius: "50%", background: VT.accent } }),
          "\u041F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"
        ] }),
        /* @__PURE__ */ jsxs6("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx7("span", { style: { width: 10, height: 2, background: "oklch(0.5 0.13 240)" } }),
          "\u0417\u0430\u044F\u0432\u043A\u0438"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: H, style: { display: "block" }, children: [
      [0, 0.25, 0.5, 0.75, 1].map((t, i) => /* @__PURE__ */ jsxs6("g", { children: [
        /* @__PURE__ */ jsx7(
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
        /* @__PURE__ */ jsx7("text", { x: PAD.left - 8, y: PAD.top + inner.h * t + 4, fontSize: "10", fill: VT.inkFaint, textAnchor: "end", fontFamily: VT.font.mono, children: Math.round(maxV * (1 - t)) })
      ] }, i)),
      /* @__PURE__ */ jsx7("path", { d: visitsArea, fill: VT.accent, fillOpacity: "0.10" }),
      /* @__PURE__ */ jsx7("path", { d: visitsPath, fill: "none", stroke: VT.accent, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      leads.map((l, i) => /* @__PURE__ */ jsx7(
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
      xLabels.map((i, k) => /* @__PURE__ */ jsx7("text", { x: xFor(i), y: H - 8, fontSize: "11", fill: VT.inkFaint, textAnchor: "middle", children: xLabelText[k] }, k))
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsx7("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 4 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442" }),
    /* @__PURE__ */ jsxs6("div", { style: { fontSize: 13, color: VT.inkFaint, marginBottom: 16 }, children: [
      "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0441\u0430\u043C\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B. ",
      BRAND.name,
      " \u0434\u0435\u0440\u0436\u0438\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0441\u0432\u0435\u0436\u0435\u0439."
    ] }),
    /* @__PURE__ */ jsx7("div", { style: { display: "flex", height: 14, borderRadius: 7, overflow: "hidden" }, children: sources.map((s) => /* @__PURE__ */ jsx7("span", { style: { width: `${s.share}%`, background: s.color } }, s.name)) }),
    /* @__PURE__ */ jsx7("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }, children: sources.map((s) => /* @__PURE__ */ jsxs6("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: VT.ink
    }, children: [
      /* @__PURE__ */ jsx7("span", { style: { width: 12, height: 12, borderRadius: 3, background: s.color, flex: "0 0 auto" } }),
      /* @__PURE__ */ jsx7("span", { style: { flex: 1 }, children: s.name }),
      /* @__PURE__ */ jsxs6("b", { style: { fontFamily: VT.font.mono, color: VT.ink }, children: [
        s.share,
        "%"
      ] })
    ] }, s.name)) })
  ] });
}
function AnalyticsTab() {
  return /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs6("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsx7(TrafficChart, {}),
    /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsx7(SourceBreakdown, {}),
      /* @__PURE__ */ jsxs6("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 16,
        padding: 22
      }, children: [
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 16 }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E" }),
        /* @__PURE__ */ jsx7("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }, children: [
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u0434\u0435\u043D\u044C", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u2014 142 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F, 8 \u0437\u0430\u044F\u0432\u043E\u043A"],
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u043A\u0430\u043D\u0430\u043B", "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 +24% \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E"],
          ["\u041B\u0443\u0447\u0448\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430", "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u2014 12 \u0437\u0430\u043F\u0438\u0441\u0435\u0439"],
          ["\u0427\u0442\u043E \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C", "\u0421\u0432\u0435\u0436\u0438\u0435 3 \u0444\u043E\u0442\u043E \u0438\u0437 Telegram + 1 \u043D\u043E\u0432\u044B\u0439 \u043E\u0442\u0437\u044B\u0432 \u0441\xA0\u042F.\u041A\u0430\u0440\u0442"]
        ].map(([k, v]) => /* @__PURE__ */ jsxs6("li", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
          /* @__PURE__ */ jsx7("span", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.08em", color: VT.inkFaint }, children: k.toUpperCase() }),
          /* @__PURE__ */ jsx7("span", { style: { fontSize: 14, color: VT.ink }, children: v })
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
  return /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, alignItems: "flex-start" }, children: [
    /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      padding: 22,
      position: "sticky",
      top: 88
    }, children: [
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }, children: [
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: "\u041F\u0440\u0435\u0432\u044C\u044E" }),
        /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 11.5 }, children: DEMO_SITE.domain })
      ] }),
      /* @__PURE__ */ jsxs6("div", { style: {
        background: VT.bgSoft,
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsxs6("div", { style: { padding: "24px 22px" }, children: [
          /* @__PURE__ */ jsx7("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", color: accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx7("h2", { style: {
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: "10px 0 8px",
            lineHeight: 1.1,
            color: VT.ink,
            textWrap: "balance"
          }, children: title }),
          /* @__PURE__ */ jsx7("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: 0, lineHeight: 1.5 }, children: sub }),
          /* @__PURE__ */ jsx7("div", { style: {
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
        /* @__PURE__ */ jsx7("div", { style: { borderTop: `1px solid ${VT.line}`, padding: 14, background: VT.white }, children: Object.entries({
          services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
          reviews: "\u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432",
          gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
          faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
          map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
        }).map(([k, label]) => /* @__PURE__ */ jsxs6("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 0",
          borderBottom: `1px solid ${VT.lineSoft}`,
          fontSize: 13,
          color: sections[k] ? VT.ink : VT.inkFaint,
          textDecoration: sections[k] ? "none" : "line-through"
        }, children: [
          /* @__PURE__ */ jsx7("span", { style: { color: sections[k] ? VT.success : VT.inkMuted, fontSize: 14 }, children: sections[k] ? "\u25CF" : "\u25CB" }),
          label
        ] }, k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx7(EditorBlock, { title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (H1)", children: /* @__PURE__ */ jsx7(
        "textarea",
        {
          value: title,
          onChange: (e) => setTitle(e.target.value),
          rows: 2,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsx7(EditorBlock, { title: "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", children: /* @__PURE__ */ jsx7(
        "textarea",
        {
          value: sub,
          onChange: (e) => setSub(e.target.value),
          rows: 3,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsxs6(EditorBlock, { title: "\u0426\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u0430", children: [
        /* @__PURE__ */ jsx7("div", { style: { display: "flex", gap: 8 }, children: accentSwatches.map((c) => /* @__PURE__ */ jsx7("button", { onClick: () => setAccent(c), style: {
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
        /* @__PURE__ */ jsx7("div", { style: { marginTop: 8, fontSize: 12, color: VT.inkFaint, fontFamily: VT.font.mono }, children: accent })
      ] }),
      /* @__PURE__ */ jsx7(EditorBlock, { title: "Hero-\u0444\u043E\u0442\u043E", children: /* @__PURE__ */ jsxs6("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        background: VT.bgSoft,
        borderRadius: 10
      }, children: [
        /* @__PURE__ */ jsx7("div", { style: {
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
          border: `1px solid ${VT.line}`
        } }),
        /* @__PURE__ */ jsx7("div", { style: { flex: 1, fontSize: 13, color: VT.inkSoft }, children: "hero-anna-1.jpg \xB7 1.2 MB" }),
        /* @__PURE__ */ jsx7("button", { style: editorSecondaryBtn, children: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C" })
      ] }) }),
      /* @__PURE__ */ jsx7(EditorBlock, { title: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u0438", children: /* @__PURE__ */ jsx7("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: Object.entries({
        services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
        reviews: "\u041E\u0442\u0437\u044B\u0432\u044B (\u2605 \u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0432\u044B\u0431\u0440\u0430\u043D\u044B \u0418\u0418)",
        gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
        faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
        map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
      }).map(([k, label]) => /* @__PURE__ */ jsxs6("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
        cursor: "pointer",
        fontSize: 14,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx7("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: sections[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx7("span", { style: {
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
        /* @__PURE__ */ jsx7("input", { type: "checkbox", checked: sections[k], onChange: () => togSection(k), style: { display: "none" } }),
        label
      ] }, k)) }) }),
      /* @__PURE__ */ jsx7("button", { style: {
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx7("div", { style: { fontSize: 12, fontWeight: 600, color: VT.inkFaint, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }, children: title }),
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
  return /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsx7("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: filters.map(([id, label, count]) => /* @__PURE__ */ jsxs6("button", { onClick: () => setFilter(id), style: {
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
      /* @__PURE__ */ jsx7("span", { style: {
        padding: "1px 7px",
        borderRadius: 999,
        background: filter === id ? "rgba(255,255,255,0.18)" : VT.bgSoft,
        fontSize: 11,
        fontFamily: VT.font.mono
      }, children: count })
    ] }, id)) }),
    /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs6("div", { style: {
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
        /* @__PURE__ */ jsx7("span", { children: "\u0418\u041C\u042F" }),
        /* @__PURE__ */ jsx7("span", { children: "\u041A\u041E\u041D\u0422\u0410\u041A\u0422" }),
        /* @__PURE__ */ jsx7("span", { children: "\u0423\u0421\u041B\u0423\u0413\u0410" }),
        /* @__PURE__ */ jsx7("span", { children: "\u041A\u041E\u0413\u0414\u0410" }),
        /* @__PURE__ */ jsx7("span", { children: "\u041A\u0410\u041D\u0410\u041B" }),
        /* @__PURE__ */ jsx7("span", { children: "\u0421\u0422\u0410\u0422\u0423\u0421" }),
        /* @__PURE__ */ jsx7("span", { children: "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F" })
      ] }),
      filtered.map((l) => /* @__PURE__ */ jsxs6("div", { style: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr",
        padding: "14px 18px",
        borderBottom: `1px solid ${VT.lineSoft}`,
        alignItems: "center",
        fontSize: 13.5,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx7("span", { style: { fontWeight: 600 }, children: l.name }),
        /* @__PURE__ */ jsx7("span", { style: { fontFamily: VT.font.mono, color: VT.inkSoft }, children: l.contact }),
        /* @__PURE__ */ jsx7("span", { children: l.service }),
        /* @__PURE__ */ jsx7("span", { style: { color: VT.inkSoft }, children: l.when }),
        /* @__PURE__ */ jsx7("span", { style: { fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: l.source }),
        /* @__PURE__ */ jsx7("span", { children: /* @__PURE__ */ jsx7("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: statusInfo[l.status].bg,
          color: statusInfo[l.status].fg,
          fontSize: 11.5,
          fontWeight: 600
        }, children: statusInfo[l.status].label }) }),
        /* @__PURE__ */ jsxs6("span", { style: { display: "flex", gap: 6 }, children: [
          l.status === "new" && /* @__PURE__ */ jsxs6(Fragment6, { children: [
            /* @__PURE__ */ jsx7("button", { onClick: () => setStatus(l.id, "booked"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.accent,
              color: "#fff",
              border: "none",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer"
            }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C" }),
            /* @__PURE__ */ jsx7("button", { onClick: () => setStatus(l.id, "declined"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.white,
              color: VT.inkSoft,
              border: `1px solid ${VT.line}`,
              fontSize: 11.5,
              cursor: "pointer"
            }, children: "\xD7" })
          ] }),
          l.status === "answered" && /* @__PURE__ */ jsx7("button", { onClick: () => setStatus(l.id, "booked"), style: {
            padding: "5px 10px",
            borderRadius: 6,
            background: VT.accent,
            color: "#fff",
            border: "none",
            fontSize: 11.5,
            fontWeight: 600,
            cursor: "pointer"
          }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u043D" }),
          (l.status === "booked" || l.status === "declined") && /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint, fontSize: 11.5 }, children: "\u2014" })
        ] })
      ] }, l.id)),
      filtered.length === 0 && /* @__PURE__ */ jsx7("div", { style: { padding: 40, textAlign: "center", color: VT.inkFaint }, children: "\u0417\u0430\u044F\u0432\u043E\u043A \u0432\xA0\u044D\u0442\u043E\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u0435 \u043D\u0435\u0442" })
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
  return /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsxs6("div", { style: {
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
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("div", { style: { fontSize: 16, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "AI-\u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0441\u0442\u0432\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432" }),
        /* @__PURE__ */ jsxs6("div", { style: { fontSize: 13.5, color: VT.inkSoft, marginTop: 2 }, children: [
          "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E ",
          /* @__PURE__ */ jsx7("b", { children: shownCount }),
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438\u0437 ",
          reviews.length,
          ". ",
          BRAND.name,
          " \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445."
        ] })
      ] }),
      /* @__PURE__ */ jsx7("button", { style: {
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
    /* @__PURE__ */ jsx7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: reviews.map((r) => /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: r.shown ? `1px solid ${VT.line}` : `1px dashed ${VT.line}`,
      borderRadius: 14,
      padding: 16,
      opacity: r.shown ? 1 : 0.55,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
        /* @__PURE__ */ jsx7("span", { style: {
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
        /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsx7("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: r.author }),
            r.topPick && /* @__PURE__ */ jsx7("span", { style: {
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
          /* @__PURE__ */ jsxs6("div", { style: {
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
      /* @__PURE__ */ jsxs6("p", { style: {
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
      /* @__PURE__ */ jsxs6("label", { style: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 12.5,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx7("span", { style: {
          width: 30,
          height: 18,
          borderRadius: 9,
          background: r.shown ? VT.success : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx7("span", { style: {
          position: "absolute",
          top: 2,
          left: r.shown ? 14 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s"
        } }) }),
        /* @__PURE__ */ jsx7("input", { type: "checkbox", checked: r.shown, onChange: () => toggleShown(r.id), style: { display: "none" } }),
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs6("div", { style: {
      padding: "14px 22px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsxs6("div", { style: { fontSize: 15, fontWeight: 600, color: VT.ink }, children: [
        "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B \u2014 ",
        services.length
      ] }),
      /* @__PURE__ */ jsx7("button", { style: {
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
    services.map((sv) => /* @__PURE__ */ jsx7("div", { style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 0.8fr 0.8fr 0.6fr",
      padding: "14px 22px",
      borderBottom: `1px solid ${VT.lineSoft}`,
      alignItems: "center",
      gap: 10
    }, children: edit === sv.id ? /* @__PURE__ */ jsxs6(Fragment6, { children: [
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7("input", { defaultValue: sv.duration, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx7("input", { defaultValue: sv.price, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx7("button", { onClick: () => setEdit(null), style: { ...editorSecondaryBtn, fontSize: 12 }, children: "OK" })
    ] }) : /* @__PURE__ */ jsxs6(Fragment6, { children: [
      /* @__PURE__ */ jsx7("span", { style: { fontSize: 14, color: VT.ink, fontWeight: 500 }, children: sv.name }),
      /* @__PURE__ */ jsx7("span", { style: { fontFamily: VT.font.mono, fontSize: 12.5, color: VT.inkSoft }, children: sv.duration || "\u2014" }),
      /* @__PURE__ */ jsx7("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }, children: sv.price }),
      /* @__PURE__ */ jsxs6("span", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx7("button", { onClick: () => setEdit(sv.id), style: { ...editorSecondaryBtn, fontSize: 11 }, children: "\u270E" }),
        /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
    /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx7("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430" }),
      /* @__PURE__ */ jsxs6("div", { style: {
        padding: "14px 16px",
        background: VT.bgSoft,
        borderRadius: 10,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("div", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink }, children: DEMO_SITE.plan }),
          /* @__PURE__ */ jsxs6("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 2 }, children: [
            "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \xB7 ",
            DEMO_SITE.nextBilling
          ] })
        ] }),
        /* @__PURE__ */ jsx7("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: "oklch(0.93 0.06 145)",
          color: "oklch(0.32 0.11 145)",
          fontSize: 11.5,
          fontWeight: 600
        }, children: "\u0410\u041A\u0422\u0418\u0412\u041D\u0410" })
      ] }),
      /* @__PURE__ */ jsxs6("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx7("button", { style: editorSecondaryBtn, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443" }),
        /* @__PURE__ */ jsx7("button", { style: { ...editorSecondaryBtn, color: VT.danger }, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx7("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx7("div", { style: { fontFamily: VT.font.mono, fontSize: 14, color: VT.ink, marginBottom: 10 }, children: DEMO_SITE.domain }),
      /* @__PURE__ */ jsx7("button", { style: editorSecondaryBtn, children: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx7("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438" }),
      /* @__PURE__ */ jsx7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
        ["tg", "Telegram", "@anna_studio", "#229ED9"],
        ["max", "MAX", "\u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E", "oklch(0.55 0.13 285)"],
        ["email", "Email", "anna@studio.ru", VT.accent]
      ].map(([k, label, value, color]) => /* @__PURE__ */ jsxs6("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: notify[k] ? VT.bgSoft : VT.white,
        border: `1px solid ${notify[k] ? VT.line : VT.lineSoft}`,
        borderRadius: 10,
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsx7("span", { style: {
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
        /* @__PURE__ */ jsxs6("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx7("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx7("div", { style: { fontSize: 12, color: VT.inkSoft, fontFamily: VT.font.mono }, children: value })
        ] }),
        /* @__PURE__ */ jsx7("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: notify[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx7("span", { style: {
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
        /* @__PURE__ */ jsx7("input", { type: "checkbox", checked: notify[k], onChange: () => setNotify((n) => ({ ...n, [k]: !n[k] })), style: { display: "none" } })
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx7("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u043E\u043C" }),
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx7("button", { onClick: () => setPaused((p) => !p), style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: paused ? VT.success : VT.white,
          color: paused ? "#fff" : VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${paused ? VT.success : VT.line}`,
          cursor: "pointer"
        }, children: paused ? "\u25B6 \u0412\u043E\u0437\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" : "\u23F8 \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443" }),
        /* @__PURE__ */ jsx7("button", { style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: VT.white,
          color: VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${VT.line}`,
          cursor: "pointer"
        }, children: "\u2193 \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432 (HTML + \u0444\u043E\u0442\u043E)" }),
        /* @__PURE__ */ jsx7("button", { style: {
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    width: "100%",
    minHeight: "100vh",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    letterSpacing: "-0.005em",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxs6("header", { style: {
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
      /* @__PURE__ */ jsx7(BrandMark, { size: 26, fontSize: 18 }),
      /* @__PURE__ */ jsx7("span", { style: {
        padding: "4px 10px",
        borderRadius: 6,
        background: VT.bgSoft,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0414\u0415\u041C\u041E \xB7 \u041B\u0418\u0427\u041D\u042B\u0419 \u041A\u0410\u0411\u0418\u041D\u0415\u0422" }),
      /* @__PURE__ */ jsx7("div", { style: { flex: 1 } }),
      /* @__PURE__ */ jsxs6("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx7("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.success } }),
        /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 13, color: VT.ink }, children: DEMO_SITE.domain }),
        "\xB7 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D"
      ] }),
      /* @__PURE__ */ jsx7("a", { href: "index.html", style: {
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
      /* @__PURE__ */ jsx7("a", { href: "#", style: {
        padding: "8px 16px",
        borderRadius: 999,
        background: VT.accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        textDecoration: "none"
      }, children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0430\u0439\u0442 \u2197" })
    ] }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flex: 1, minHeight: 0 }, children: [
      /* @__PURE__ */ jsxs6("aside", { style: {
        width: 240,
        flex: "0 0 auto",
        background: VT.white,
        borderRight: `1px solid ${VT.line}`,
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }, children: [
        /* @__PURE__ */ jsx7("div", { style: {
          padding: "6px 14px",
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          color: VT.inkFaint,
          fontWeight: 600,
          marginBottom: 4
        }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0410\u041D\u041D\u042B" }),
        TABS.map((t) => /* @__PURE__ */ jsxs6("button", { onClick: () => setTab(t.id), style: {
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
          /* @__PURE__ */ jsx7("span", { style: { color: tab === t.id ? VT.accent : VT.inkSoft, display: "inline-flex" }, children: /* @__PURE__ */ jsx7(NavIcon, { kind: t.icon, size: 17 }) }),
          /* @__PURE__ */ jsx7("span", { style: { flex: 1 }, children: t.label }),
          t.badge && /* @__PURE__ */ jsx7("span", { style: {
            padding: "1px 7px",
            borderRadius: 999,
            background: VT.accent,
            color: "#fff",
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            fontWeight: 700
          }, children: t.badge })
        ] }, t.id)),
        /* @__PURE__ */ jsx7("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsxs6("div", { style: {
          margin: "20px 6px 0",
          padding: 14,
          background: VT.bgSoft,
          borderRadius: 12,
          fontSize: 12.5,
          color: VT.inkSoft,
          lineHeight: 1.5
        }, children: [
          /* @__PURE__ */ jsx7("div", { style: { fontWeight: 600, color: VT.ink, marginBottom: 4 }, children: "\u042D\u0442\u043E \u0434\u0435\u043C\u043E" }),
          "\u0412\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0438\u0436\u0435 \u2014 \u043F\u0440\u0438\u043C\u0435\u0440. \u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u041B\u041A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0442\u0430\u043A \u0436\u0435."
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("main", { style: { flex: 1, minWidth: 0, padding: "24px 28px 60px", overflowX: "hidden" }, children: [
        /* @__PURE__ */ jsx7("div", { style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx7("h1", { style: {
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          margin: 0,
          lineHeight: 1.1,
          color: VT.ink
        }, children: currentTab.label }) }),
        tab === "analytics" && /* @__PURE__ */ jsx7(AnalyticsTab, {}),
        tab === "site" && /* @__PURE__ */ jsx7(SiteEditTab, {}),
        tab === "leads" && /* @__PURE__ */ jsx7(LeadsTab, {}),
        tab === "reviews" && /* @__PURE__ */ jsx7(ReviewsTab, {}),
        tab === "services" && /* @__PURE__ */ jsx7(ServicesTab, {}),
        tab === "settings" && /* @__PURE__ */ jsx7(SettingsTab, {})
      ] })
    ] })
  ] });
}

// src/admin-core/index.tsx
import React4, { useState as useState2, useEffect as useEffect2, useCallback as useCallback2 } from "react";
import { Fragment as Fragment8, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function SkeletonBlock({ width = "100%", height = 14, radius = 4, style }) {
  return /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: {
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
  return /* @__PURE__ */ jsxs7("div", { role: "status", style: {
    padding: "48px 24px",
    textAlign: "center",
    color: VT.inkFaint,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx8("div", { "aria-hidden": "true", style: { fontSize: 28, opacity: 0.6, marginBottom: 8 }, children: "\u2205" }),
    /* @__PURE__ */ jsx8("div", { style: { fontSize: 14.5, fontWeight: 500, color: VT.inkSoft, marginBottom: 4 }, children: title }),
    hint && /* @__PURE__ */ jsx8("div", { style: { fontSize: 13 }, children: hint })
  ] });
}
function ErrorBlock({ title, message, onRetry }) {
  return /* @__PURE__ */ jsx8(Card, { role: "alert", style: {
    padding: 18,
    background: VT.dangerSoft,
    borderColor: "oklch(0.86 0.06 28)"
  }, children: /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { fontSize: 18 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs7("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx8("div", { style: { fontWeight: 600, fontSize: 14, color: "oklch(0.4 0.15 28)" }, children: title || "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A" }),
      message && /* @__PURE__ */ jsx8("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 2 }, children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsx8("button", { type: "button", onClick: onRetry, style: {
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
  const [remaining, setRemaining] = useState2(retryAfterSeconds);
  useEffect2(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxs7("div", { role: "alert", style: {
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
    /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs7("span", { children: [
      "5 \u043D\u0435\u0443\u0434\u0430\u0447 \u0437\u0430 15 \u043C\u0438\u043D \u2014 IP \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ",
      /* @__PURE__ */ jsxs7(Mono, { style: { color: "inherit", fontSize: 13 }, children: [
        mm,
        ":",
        ss
      ] }),
      "."
    ] })
  ] });
}
function TextField({ type = "text", value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono }) {
  return /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsxs7("div", { style: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    minHeight: "100%",
    background: VT.bgSoft,
    fontFamily: VT.font.sans,
    color: VT.ink,
    letterSpacing: "-0.005em"
  }, children: [
    /* @__PURE__ */ jsxs7("aside", { style: {
      background: VT.bg,
      borderRight: `1px solid ${VT.line}`,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 18 }, children: [
        /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.bg } }),
        /* @__PURE__ */ jsx8("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx8(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 6px", fontSize: 10, borderRadius: 4 }, children: "ADMIN" })
      ] }),
      /* @__PURE__ */ jsx8("nav", { "aria-label": "Admin sections", style: { display: "flex", flexDirection: "column", gap: 4 }, children: NAV.map(([key, name, icon]) => {
        const isActive = activeKey === key;
        const count = badges?.[key];
        return /* @__PURE__ */ jsxs7(
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
              /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { fontSize: 15, width: 18, display: "inline-flex" }, children: icon }),
              name,
              typeof count === "number" && count > 0 && /* @__PURE__ */ jsx8(Badge, { kind: "warn", style: { marginLeft: "auto", padding: "1px 7px", fontSize: 10, borderRadius: 999 }, children: count })
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxs7("div", { style: { marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 24, height: 24, borderRadius: "50%", background: VT.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: VT.accentInk, fontWeight: 600 }, children: u.initials }),
        /* @__PURE__ */ jsx8("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: u.username }),
        /* @__PURE__ */ jsx8(
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
    /* @__PURE__ */ jsx8("main", { style: { minWidth: 0 }, children })
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
  const [uStep, setUStep] = useState2(props.step ?? 1);
  const [uUser, setUUser] = useState2(props.username ?? "founder@samosite.online");
  const [uPass, setUPass] = useState2(props.password ?? "");
  const [uTotp, setUTotp] = useState2(props.totp ?? "");
  const [uBackup, setUBackup] = useState2(props.backupCode ?? "");
  const [uMode, setUMode] = useState2(props.mode ?? "totp");
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
  const onSubmit1 = useCallback2((e) => {
    e.preventDefault();
    if (loading) return;
    if (onSubmitCredentials) {
      onSubmitCredentials(username, password);
    } else {
      setStep(2);
    }
  }, [loading, onSubmitCredentials, username, password, setStep]);
  const onSubmit2 = useCallback2((e) => {
    e.preventDefault();
    if (loading) return;
    const code = mode === "totp" ? totp : backupCode;
    if (onSubmitCode) onSubmitCode(mode, code);
  }, [loading, mode, totp, backupCode, onSubmitCode]);
  return /* @__PURE__ */ jsx8("div", { style: {
    background: VT.bgSoft,
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: VT.font.sans,
    padding: 24
  }, children: /* @__PURE__ */ jsxs7(Card, { style: { width: 400, padding: 28 }, children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.white } }),
      /* @__PURE__ */ jsx8("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
      /* @__PURE__ */ jsx8(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 7px", fontSize: 10 }, children: "ADMIN" })
    ] }),
    /* @__PURE__ */ jsx8("h1", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }, children: step === 1 ? "\u0412\u0445\u043E\u0434 \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0443" : "\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F" }),
    /* @__PURE__ */ jsx8("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: "0 0 18px" }, children: step === 1 ? "\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F founder. \u0412\u0441\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F." : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F-\u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430." }),
    rateLimited && /* @__PURE__ */ jsx8(RateLimitCountdown, { retryAfterSeconds: rateLimitedRetryAfterSeconds }),
    error && !rateLimited && /* @__PURE__ */ jsx8("div", { role: "alert", style: {
      padding: "8px 12px",
      background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`,
      borderRadius: VT.r.md,
      fontSize: 13,
      color: "oklch(0.4 0.15 28)",
      marginBottom: 14
    }, children: LOGIN_ERROR_MSG[error] || LOGIN_ERROR_MSG.unknown_error }),
    step === 1 ? /* @__PURE__ */ jsxs7("form", { onSubmit: onSubmit1, children: [
      /* @__PURE__ */ jsx8("label", { htmlFor: "ss-admin-email", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "Email" }),
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsx8("label", { htmlFor: "ss-admin-password", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsx8("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx8(
        Btn,
        {
          type: "submit",
          style: { width: "100%" },
          disabled: loading || rateLimited || !username || !password,
          iconRight: loading ? /* @__PURE__ */ jsx8(Spinner, { size: 14 }) : /* @__PURE__ */ jsx8(IconArrow, {}),
          children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0414\u0430\u043B\u044C\u0448\u0435"
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs7("form", { onSubmit: onSubmit2, children: [
      /* @__PURE__ */ jsx8("div", { role: "tablist", "aria-label": "\u0421\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F", style: { display: "flex", gap: 6, marginBottom: 12, padding: 3, background: VT.bgSoft, borderRadius: VT.r.md, border: `1px solid ${VT.line}` }, children: [
        ["totp", "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440"],
        ["backup", "Backup-\u043A\u043E\u0434"]
      ].map(([key, label]) => {
        const isActive = mode === key;
        return /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsx8("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 6 }, children: mode === "totp" ? "\u041A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430" : "Backup-\u043A\u043E\u0434" }),
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsxs7("div", { style: { marginTop: 18, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8(
          Btn,
          {
            type: "submit",
            style: { flex: 1 },
            disabled: loading || rateLimited || !(mode === "totp" ? totp : backupCode),
            iconRight: loading ? /* @__PURE__ */ jsx8(Spinner, { size: 14 }) : /* @__PURE__ */ jsx8(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        )
      ] })
    ] })
  ] }) });
}
function StatTile({ label, value, delta, deltaSign, sub, onClick, loading }) {
  const clickable = !!onClick && !loading;
  return /* @__PURE__ */ jsx8(
    Card,
    {
      style: {
        padding: 18,
        cursor: clickable ? "pointer" : "default",
        transition: "transform .15s ease, box-shadow .15s ease"
      },
      children: /* @__PURE__ */ jsxs7(
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
            /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: String(label).toUpperCase() }),
            loading ? /* @__PURE__ */ jsx8("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: 64, height: 28, radius: 6 }) }) : /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }, children: [
              /* @__PURE__ */ jsx8("span", { style: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em" }, children: value }),
              delta && /* @__PURE__ */ jsxs7("span", { style: {
                fontSize: 12.5,
                fontWeight: 600,
                color: deltaSign === "+" ? VT.success : deltaSign === "-" ? VT.danger : VT.inkSoft
              }, children: [
                deltaSign,
                delta
              ] })
            ] }),
            sub && !loading && /* @__PURE__ */ jsx8("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 4 }, children: sub }),
            loading && /* @__PURE__ */ jsx8("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: "50%", height: 10 }) })
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
  return /* @__PURE__ */ jsxs7("span", { style: {
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
    /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    m[2]
  ] });
}
function FilterChip({ label, active, count, onClick, disabled }) {
  return /* @__PURE__ */ jsxs7(
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
        count != null && /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
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
  return /* @__PURE__ */ jsxs7("svg", { viewBox: `0 0 ${w} ${height}`, width: "100%", height, preserveAspectRatio: "none", role: "img", "aria-label": "\u0413\u0440\u0430\u0444\u0438\u043A \u0437\u0430\u044F\u0432\u043E\u043A", children: [
    /* @__PURE__ */ jsx8("path", { d: area, fill: VT.accentSoft, opacity: "0.7" }),
    /* @__PURE__ */ jsx8("path", { d: path, fill: "none", stroke: VT.accent, strokeWidth: "2" }),
    points.map((p, i) => /* @__PURE__ */ jsx8("circle", { cx: i / (points.length - 1) * w, cy: height - 30 - p / max * (height - 50), r: "3", fill: VT.bg, stroke: VT.accent, strokeWidth: "1.5" }, i)),
    xLabels.map((l, i) => /* @__PURE__ */ jsx8("text", { x: i / (xLabels.length - 1) * w, y: height - 8, fontSize: "11", fill: VT.inkFaint, fontFamily: "JetBrains Mono, monospace", textAnchor: i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle", children: l }, l + i))
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
  const Wrap = _embed === false ? React4.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "dashboard", onNavigate };
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs7("div", { children: [
        /* @__PURE__ */ jsx8(Eyebrow, { children: "DASHBOARD" }),
        /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "10px 0 0" }, children: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 8 }, children: [
        onRefresh && /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" }),
        /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", children: "7 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: "30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", children: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx8(ErrorBlock, { message: error, onRetry: onRefresh }),
    /* @__PURE__ */ jsx8("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: error ? 14 : 0 }, children: COUNTER_TILES.map((t) => /* @__PURE__ */ jsx8(
      StatTile,
      {
        label: t.label,
        value: loading ? "" : d.counters[t.key] ?? 0,
        loading,
        onClick: onNavigate ? () => onNavigate(t.section) : void 0
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginTop: 14 }, children: [
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxs7("div", { children: [
            /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0417\u0410\u042F\u0412\u041A\u0418 \xB7 14 \u0414\u041D\u0415\u0419" }),
            /* @__PURE__ */ jsx8("div", { style: { fontSize: 20, fontWeight: 700, marginTop: 4 }, children: loading ? /* @__PURE__ */ jsx8(SkeletonBlock, { width: 80, height: 20 }) : d.applications_series_14d.reduce((s, x) => s + x.count, 0) })
          ] }),
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", children: "CSV" })
        ] }),
        loading ? /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 200, radius: 8 }) : /* @__PURE__ */ jsx8(TrendChart, { series: d.applications_series_14d, labels: d.applications_series_14d.map((s) => s.day.slice(8)) })
      ] }),
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "QUICK \xB7 \u0422\u041E\u041F-5 PENDING" }),
          /* @__PURE__ */ jsx8(
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
        loading ? /* @__PURE__ */ jsx8("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx8("div", { style: { padding: "8px 10px", borderBottom: `1px solid ${VT.lineSoft}` }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: "80%", height: 14 }) }, i)) }) : /* @__PURE__ */ jsx8("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
          ["#A-1842", "TG", "studia-anna \xB7 47 \u043F\u043E\u0441\u0442\u043E\u0432", "12 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1841", "YM", "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \u0421\u0430\u043C\u0430\u0440\u0430 \xB7 24 \u043E\u0442\u0437.", "34 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1840", "Photo", "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u041C\u0430\u0440\u0438\u043D\u0430 \xB7 12 \u0444\u043E\u0442\u043E", "1 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1839", "TG", "\u0414\u043E\u043C \u0440\u0435\u0441\u043D\u0438\u0446 \xB7 89 \u043F\u043E\u0441\u0442\u043E\u0432", "2 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1838", "YM", "\u0421\u0442\u0443\u0434\u0438\u044F \u0439\u043E\u0433\u0438 \xB7 56 \u043E\u0442\u0437.", "3 \u0447 \u043D\u0430\u0437\u0430\u0434"]
        ].map(([id, src, name, ago]) => /* @__PURE__ */ jsxs7(
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
              /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, width: 56 }, children: id }),
              /* @__PURE__ */ jsx8(Badge, { kind: "neutral", style: { padding: "2px 7px", fontSize: 10.5, borderRadius: 4 }, children: src }),
              /* @__PURE__ */ jsx8("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
              /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11 }, children: ago })
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
  const Wrap = _embed === false ? React4.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: () => {
  } };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx8(Eyebrow, { children: "\u0417\u0410\u042F\u0412\u041A\u0418" }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438" }),
      /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV" })
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { display: "flex", gap: 6 }, children: STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx8(
        FilterChip,
        {
          label,
          active: statusFilter === key,
          onClick: () => onStatusFilterChange && onStatusFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx8("div", { style: { marginLeft: "auto", display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxs7("div", { style: {
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
        /* @__PURE__ */ jsxs7("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx8("circle", { cx: "11", cy: "11", r: "7" }),
          /* @__PURE__ */ jsx8("path", { d: "M21 21l-4.3-4.3", strokeLinecap: "round" })
        ] }),
        "\u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443, ID, \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs7(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs7("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx8("thead", { children: /* @__PURE__ */ jsx8("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["ID", "\u0421\u043E\u0437\u0434\u0430\u043D\u0430", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0421\u0442\u0430\u0442\u0443\u0441", ""].map((h) => /* @__PURE__ */ jsx8("th", { scope: "col", style: {
          textAlign: "left",
          padding: "12px 16px",
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.inkFaint,
          fontWeight: 500
        }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs7("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => /* @__PURE__ */ jsx8("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [60, 90, 80, 180, 90, 80, 18].map((w, j) => /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs7(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(row.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(row.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { children: row.id }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px", color: VT.inkSoft }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: formatTs(row.created_at) }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: row.source_type }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: row.source_url || "\u2014" }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: row.contact_value_masked }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(StatusPill, { status: row.status }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            row.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx8(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u044F\u0432\u043E\u043A", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0435\u0440\u0432\u0430\u044F \u2014 \u043E\u043D\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && /* @__PURE__ */ jsxs7("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs7("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx8(
            Btn,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit),
              disabled: d.offset === 0 || loading,
              children: "\u2190"
            }
          ),
          /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs7(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx8(
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
  return /* @__PURE__ */ jsx8("pre", { style: { margin: 0, fontFamily: VT.font.mono, fontSize: 12.5, lineHeight: 1.55, color: VT.inkSoft }, children: lines.map((row, i) => /* @__PURE__ */ jsxs7("div", { children: [
    /* @__PURE__ */ jsx8("span", { style: { color: row[1] }, children: row[0] }),
    row[2] && /* @__PURE__ */ jsx8("span", { style: { color: row[3] }, children: row[2] })
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
  const [rejectOpen, setRejectOpen] = useState2(false);
  const [rejectReason, setRejectReason] = useState2("");
  const app = d.application;
  const isPending = app && app.status === "pending";
  const Wrap = _embed === false ? React4.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: onBack ? () => onBack() : void 0 };
  const submitReject = () => {
    if (onReject) onReject(app.id, rejectReason || void 0);
    setRejectOpen(false);
    setRejectReason("");
  };
  if (loading) {
    return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx8(SkeletonBlock, { width: 140, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx8(SkeletonBlock, { width: 320, height: 28, radius: 6, style: { marginBottom: 20 } }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx8(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) }),
        /* @__PURE__ */ jsx8(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0417\u0430\u044F\u0432\u043A\u0438"
        }
      ),
      /* @__PURE__ */ jsx8("span", { children: "/" }),
      /* @__PURE__ */ jsx8(Mono, { style: { color: VT.ink }, children: app.id })
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    actionError && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { title: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435", message: actionError }) }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs7("div", { children: [
        /* @__PURE__ */ jsx8("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440" }),
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          app.source_url && /* @__PURE__ */ jsx8("a", { href: `https://${app.source_url.replace(/^https?:\/\//, "")}`, target: "_blank", rel: "noreferrer", style: { color: VT.accent, textDecoration: "underline", textUnderlineOffset: 2 }, children: /* @__PURE__ */ jsx8(Mono, { style: { color: "inherit" }, children: app.source_url }) }),
          /* @__PURE__ */ jsx8("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx8("span", { children: app.contact_value_masked }),
          /* @__PURE__ */ jsx8("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx8(Mono, { children: formatTs(app.created_at) }),
          /* @__PURE__ */ jsx8(StatusPill, { status: app.status }),
          app.is_manual_review && /* @__PURE__ */ jsx8(Badge, { kind: "warn", style: { fontSize: 11, padding: "2px 8px" }, children: "manual review" })
        ] })
      ] }),
      /* @__PURE__ */ jsx8("div", { style: { display: "flex", gap: 8 }, children: isPending ? /* @__PURE__ */ jsxs7(Fragment8, { children: [
        /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsx8(
          Btn,
          {
            size: "sm",
            onClick: () => onApprove && onApprove(app.id),
            disabled: !!actionLoading,
            iconRight: actionLoading ? /* @__PURE__ */ jsx8(Spinner, { size: 14 }) : /* @__PURE__ */ jsx8(IconArrow, { size: 14 }),
            children: actionLoading ? "\u041E\u0434\u043E\u0431\u0440\u044F\u0435\u043C\u2026" : "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C"
          }
        )
      ] }) : /* @__PURE__ */ jsxs7(Badge, { kind: app.status === "approved" || app.status === "published" ? "success" : "neutral", style: { padding: "6px 12px" }, children: [
        "\u0423\u0436\u0435 ",
        STATUS_MAP[app.status]?.[2] || app.status
      ] }) })
    ] }),
    rejectOpen && /* @__PURE__ */ jsxs7(Card, { style: { padding: 16, marginBottom: 14, borderColor: "oklch(0.85 0.06 28)" }, children: [
      /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em", color: VT.danger }, children: "\u041F\u0420\u0418\u0427\u0418\u041D\u0410 \u041E\u0422\u041A\u0410\u0417\u0410" }),
      /* @__PURE__ */ jsx8(
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
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", onClick: () => {
          setRejectOpen(false);
          setRejectReason("");
        }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx8(
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
    /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE SNAPSHOT \xB7 JSON" }),
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "raw" })
        ] }),
        /* @__PURE__ */ jsx8("div", { style: {
          background: VT.bgSoft,
          borderRadius: VT.r.sm,
          padding: 14,
          border: `1px solid ${VT.line}`,
          maxHeight: 280,
          overflow: "auto"
        }, children: /* @__PURE__ */ jsx8(JsonTree, {}) })
      ] }),
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "GENERATED CONTENT" }),
          /* @__PURE__ */ jsx8(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: "\u2713 sanitized" }),
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "\u2197 preview" })
        ] }),
        /* @__PURE__ */ jsxs7("div", { style: { background: VT.bgSoft, borderRadius: VT.r.sm, padding: 14, border: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx8("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.accent, letterSpacing: "0.1em", marginBottom: 6 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx8("div", { style: { fontWeight: 700, fontSize: 20, lineHeight: 1.15, marginBottom: 8 }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
          /* @__PURE__ */ jsx8("div", { style: { fontSize: 13, lineHeight: 1.5, color: VT.inkSoft }, children: "\u0420\u0430\u0431\u043E\u0442\u0430\u044E \u0441 2017 \u0433\u043E\u0434\u0430, \u043F\u0440\u043E\u0448\u043B\u0430 \u043A\u0443\u0440\u0441\u044B \u0432 [SCHOOL]. \u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432 \u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u0441\u043F\u0435\u0448\u043A\u0438, \u0441 \u0447\u0430\u0448\u043A\u043E\u0439 \u043A\u043E\u0444\u0435." }),
          /* @__PURE__ */ jsx8("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx8("div", { "aria-hidden": "true", style: { flex: 1, aspectRatio: "1/1", borderRadius: 6, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` } }, i)) }),
          /* @__PURE__ */ jsx8("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }, children: "\u2248 320 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \xB7 \u2248 12 \u20BD \xB7 \u043C\u043E\u0434\u0435\u043B\u044C: YandexGPT 5 Pro" })
        ] })
      ] })
    ] }),
    (d.user || d.consent) && /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }, children: [
      d.user && /* @__PURE__ */ jsxs7(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "USER" }),
        /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442" }),
            /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 13, color: VT.ink }, children: d.user.contact_value_masked })
          ] }),
          /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0430\u0440\u0438\u0444" }),
            /* @__PURE__ */ jsx8(
              Badge,
              {
                kind: d.user.plan === "pro" ? "success" : d.user.plan === "trial" ? "info" : "neutral",
                style: { padding: "2px 9px", fontSize: 11.5 },
                children: d.user.plan
              }
            )
          ] }),
          d.user.plan_until && /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0410\u043A\u0442\u0438\u0432\u0435\u043D \u0434\u043E" }),
            /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 13 }, children: d.user.plan_until })
          ] })
        ] })
      ] }),
      d.consent && /* @__PURE__ */ jsxs7(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "CONSENT" }),
        /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0412\u0435\u0440\u0441\u0438\u044F \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438" }),
            /* @__PURE__ */ jsxs7(Mono, { style: { fontSize: 13 }, children: [
              "v",
              d.consent.policy_version
            ] })
          ] }),
          /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" }),
            /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 13 }, children: formatTs(d.consent.created_at) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs7(Card, { style: { marginTop: 14, padding: 18 }, children: [
      /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "AUDIT LOG" }),
      /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10, fontSize: 13, fontFamily: VT.font.mono, color: VT.inkSoft, lineHeight: 1.7 }, children: [
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:22:18" }),
          " \xB7 application.submitted \xB7 ip 195.***.***.42"
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:22:19" }),
          " \xB7 parser.tg.start \xB7 @studia_anna"
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:22:34" }),
          " \xB7 parser.tg.ok \xB7 posts=47 photos=12"
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:22:35" }),
          " \xB7 llm.generate.start \xB7 model=yandexgpt-5-pro"
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:23:02" }),
          " \xB7 llm.generate.ok \xB7 tokens=320 cost_rub=12.40"
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
          " \xB7 sanitize.ok \xB7 bleach.clean allowlist=v1"
        ] }),
        /* @__PURE__ */ jsxs7("div", { children: [
          /* @__PURE__ */ jsx8("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
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
import React5, { useState as useState3, useMemo as useMemo2 } from "react";
import { Fragment as Fragment10, jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function formatTs2(iso) {
  if (!iso) return "\u2014";
  return iso.replace("T", " ").slice(0, 16);
}
function formatRel(iso) {
  if (!iso) return "\u2014";
  return iso.slice(0, 10);
}
function TextField2({ value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono, type = "text" }) {
  return /* @__PURE__ */ jsx9(
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
  const Wrap = _embed === false ? React5.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx9(Eyebrow, { children: "\u0421\u0410\u0419\u0422\u042B" }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx9("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsx9(Btn, { variant: "secondary", size: "sm", children: "CSV" })
    ] }),
    error && /* @__PURE__ */ jsx9("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx9(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }, children: SITE_STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx9(
      FilterChip,
      {
        label,
        active: statusFilter === key,
        onClick: () => onStatusFilterChange && onStatusFilterChange(key)
      },
      key
    )) }),
    /* @__PURE__ */ jsxs8(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs8("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx9("thead", { children: /* @__PURE__ */ jsx9("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["Subdomain", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "Status", "Last sync", ""].map((h) => /* @__PURE__ */ jsx9("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs8("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx9("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [160, 80, 220, 110, 110, 18].map((w, j) => /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((s) => /* @__PURE__ */ jsxs8(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(s.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(s.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsxs8("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12.5 }, children: [
                  s.subdomain,
                  ".samosite.online",
                  s.custom_domain && /* @__PURE__ */ jsx9(Badge, { kind: "success", style: { marginLeft: 8, padding: "1px 7px", fontSize: 10, borderRadius: 4 }, children: s.custom_domain })
                ] }),
                /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: s.source_type }) }),
                /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: s.source_url }) }),
                /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(StatusPill, { status: s.status }) }),
                /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: formatTs2(s.last_synced_at) }) }),
                /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            s.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx9(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0441\u0430\u0439\u0442\u043E\u0432", hint: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B \xAB\u0417\u0430\u044F\u0432\u043A\u0438\xBB \u2014 \u0442\u0430\u043C \u043E\u0434\u043E\u0431\u0440\u044F\u0439\u0442\u0435 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0439\u0442\u0435." }),
      !showEmpty && /* @__PURE__ */ jsxs8("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs8("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx9(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx9(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs8(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx9(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
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
  const Wrap = _embed === false ? React5.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  if (loading) {
    return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx9(SkeletonBlock, { width: 200, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx9(SkeletonBlock, { width: 280, height: 28, radius: 6, style: { marginBottom: 24 } }),
      /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx9(SkeletonBlock, { width: "100%", height: 420, radius: 10 }),
        /* @__PURE__ */ jsx9(SkeletonBlock, { width: "100%", height: 420, radius: 10 })
      ] })
    ] }) });
  }
  const renderAction = (action, variant = "secondary") => {
    const enabled = actionEnabled(action, site.status);
    const isLoading = actionLoading === action;
    const anyLoading = !!actionLoading;
    return /* @__PURE__ */ jsx9(
      Btn,
      {
        size: "sm",
        variant,
        disabled: !enabled || anyLoading,
        onClick: () => enabled && onAction && onAction(site.id, action),
        iconRight: isLoading ? /* @__PURE__ */ jsx9(Spinner, { size: 14 }) : variant === "primary" ? /* @__PURE__ */ jsx9(IconArrow, { size: 14 }) : void 0,
        children: isLoading ? "..." : ACTION_LABELS[action]
      },
      action
    );
  };
  const primaryAction = site.status === "pending_review" ? "publish" : site.status === "published" ? "republish" : site.status === "paused" ? "resume_sync" : site.status === "archived" ? "unarchive" : null;
  const secondaryActions = ["publish", "republish", "pause_sync", "resume_sync", "archive", "unarchive"].filter((a) => a !== primaryAction && actionEnabled(a, site.status));
  const safePreviewUrl = previewUrl || (site.subdomain ? `https://${site.subdomain}.samosite.online` : null);
  return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx9(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0421\u0430\u0439\u0442\u044B"
        }
      ),
      /* @__PURE__ */ jsx9("span", { children: "/" }),
      /* @__PURE__ */ jsxs8(Mono, { style: { color: VT.ink }, children: [
        site.subdomain,
        ".samosite.online"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx9("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx9(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxs8("div", { children: [
        /* @__PURE__ */ jsx9("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: site.subdomain.replace(/-/g, " ") }),
        /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          safePreviewUrl && /* @__PURE__ */ jsxs8("a", { href: safePreviewUrl, target: "_blank", rel: "noreferrer", style: { display: "inline-flex", alignItems: "center", gap: 4, color: VT.accent, textDecoration: "underline" }, children: [
            /* @__PURE__ */ jsxs8(Mono, { style: { color: "inherit" }, children: [
              site.subdomain,
              ".samosite.online"
            ] }),
            " \u2197"
          ] }),
          /* @__PURE__ */ jsx9("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx9(StatusPill, { status: site.status }),
          site.published_at && /* @__PURE__ */ jsxs8(Fragment10, { children: [
            /* @__PURE__ */ jsx9("span", { children: "\xB7" }),
            /* @__PURE__ */ jsxs8("span", { children: [
              "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D ",
              formatRel(site.published_at)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }, children: [
        secondaryActions.map((a) => renderAction(a, "secondary")),
        primaryAction && renderAction(primaryAction, "primary")
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs8(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxs8("div", { style: { padding: "10px 14px", borderBottom: `1px solid ${VT.line}`, display: "flex", alignItems: "center", gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
          /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx9("span", { style: { marginLeft: 10 }, children: safePreviewUrl }),
          /* @__PURE__ */ jsx9("span", { style: { marginLeft: "auto" }, children: "preview" })
        ] }),
        safePreviewUrl ? /* @__PURE__ */ jsx9(
          "iframe",
          {
            src: safePreviewUrl,
            title: `${site.subdomain} preview`,
            sandbox: "allow-same-origin allow-scripts allow-popups-to-escape-sandbox",
            style: { width: "100%", aspectRatio: "4 / 3", border: "none", background: VT.bg, display: "block" }
          }
        ) : /* @__PURE__ */ jsxs8("div", { style: { aspectRatio: "4 / 3", background: VT.bg, padding: 14, position: "relative" }, children: [
          /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: "oklch(0.55 0.13 30)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, letterSpacing: "-0.04em" }, children: "\u0410" }),
            /* @__PURE__ */ jsx9("span", { style: { fontSize: 12, fontWeight: 700, color: VT.ink }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
            /* @__PURE__ */ jsx9("span", { style: { marginLeft: "auto", padding: "3px 9px", borderRadius: 999, background: VT.accent, color: "#fff", fontSize: 10, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsx9("div", { style: { fontFamily: VT.font.mono, fontSize: 9, letterSpacing: "0.12em", color: VT.accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
            /* @__PURE__ */ jsx9("div", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", marginTop: 4, lineHeight: 1.15 }, children: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u2014 \u0431\u0435\u0437 \u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" })
          ] }),
          /* @__PURE__ */ jsx9("div", { style: { marginTop: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx9("div", { "aria-hidden": "true", style: { aspectRatio: "1/1", borderRadius: 4, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` } }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        /* @__PURE__ */ jsxs8(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u041B\u0418\u0414\u042B" }),
          /* @__PURE__ */ jsx9("div", { style: { fontSize: 28, fontWeight: 700, marginTop: 6 }, children: d.leads_count }),
          /* @__PURE__ */ jsx9(
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
        /* @__PURE__ */ jsxs8(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A" }),
          /* @__PURE__ */ jsxs8("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx9("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0438\u043F" }),
              /* @__PURE__ */ jsx9(Badge, { kind: "neutral", style: { padding: "2px 9px", fontSize: 11.5, borderRadius: 4 }, children: site.source_type })
            ] }),
            /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx9("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "URL" }),
              /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: site.source_url })
            ] }),
            /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx9("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "Last sync" }),
              /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: formatTs2(site.last_synced_at) })
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
  const Wrap = _embed === false ? React5.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "leads" };
  const [uSelected, setUSelected] = useState3([]);
  const [uModalOpen, setUModalOpen] = useState3(false);
  const [uTotp, setUTotp] = useState3("");
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
  return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "24px 32px 40px", position: "relative" }, children: [
    /* @__PURE__ */ jsx9(Eyebrow, { children: "\u041B\u0418\u0414\u042B" }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx9("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        selected.length > 0 && /* @__PURE__ */ jsxs8(
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
        /* @__PURE__ */ jsxs8(
          Btn,
          {
            size: "sm",
            onClick: openModal,
            disabled: selected.length === 0 || loading,
            iconRight: /* @__PURE__ */ jsx9(IconArrow, { size: 14 }),
            children: [
              "\u{1F513} \u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C (",
              selected.length,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 12 }, children: [
        "\u0412\u0441\u0435\u0433\u043E: ",
        d.total,
        " \xB7 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E: ",
        d.items?.length ?? 0
      ] }),
      /* @__PURE__ */ jsx9(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 11.5 }, children: "\u{1F512} Fernet AES \u2014 plaintext \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 TOTP-\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F" })
    ] }),
    error && /* @__PURE__ */ jsx9("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx9(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs8(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs8("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx9("thead", { children: /* @__PURE__ */ jsxs8("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx9("th", { scope: "col", style: { width: 48, padding: "12px 16px", textAlign: "left" }, children: /* @__PURE__ */ jsx9(
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
          ["ID", "\u0421\u0430\u0439\u0442", "IP prefix", "Status", "\u041A\u043E\u0433\u0434\u0430"].map((h) => /* @__PURE__ */ jsx9("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h))
        ] }) }),
        /* @__PURE__ */ jsxs8("tbody", { children: [
          loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs8("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(SkeletonBlock, { width: 14, height: 14, radius: 3 }) }),
            [90, 160, 120, 90, 110].map((w, j) => /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(SkeletonBlock, { width: w, height: 12 }) }, j))
          ] }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs8("tr", { style: {
            borderBottom: `1px solid ${VT.lineSoft}`,
            background: isSelected(row.id) ? VT.accentSoft : "transparent"
          }, children: [
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(
              "input",
              {
                type: "checkbox",
                "aria-label": `\u0412\u044B\u0431\u0440\u0430\u0442\u044C ${row.id}`,
                checked: isSelected(row.id),
                onChange: (e) => setSelected(row.id, e.target.checked)
              }
            ) }),
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(Mono, { children: row.id }) }),
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft }, children: row.site_id }),
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: row.ip_prefix || "\u2014" }) }),
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(StatusPill, { status: row.status, size: "sm" }) }),
            /* @__PURE__ */ jsx9("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11.5, color: VT.inkFaint }, children: formatTs2(row.created_at) }) })
          ] }, row.id))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx9(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043B\u0438\u0434\u043E\u0432", hint: "\u041A\u043E\u0433\u0434\u0430 \u043A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442 \u0444\u043E\u0440\u043C\u0443 \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0441\u0430\u0439\u0442\u043E\u0432 \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && !loading && /* @__PURE__ */ jsxs8("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs8("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx9(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx9(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 10, display: "block" }, children: "\u0412\u0441\u0435 \u0440\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432 audit-log (admin_actions) \u2014 admin_id, ip, lead_ids, ts." }),
    modalOpen && /* @__PURE__ */ jsx9(
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
        children: /* @__PURE__ */ jsx9(Card, { style: { width: decryptedRows ? 560 : 380, padding: 24, background: VT.bg }, children: !decryptedRows ? /* @__PURE__ */ jsxs8(Fragment10, { children: [
          /* @__PURE__ */ jsx9("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 TOTP" }),
          /* @__PURE__ */ jsxs8("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C ",
            /* @__PURE__ */ jsx9("b", { children: selected.length }),
            " ",
            selected.length === 1 ? "\u043B\u0438\u0434" : "\u043B\u0438\u0434\u043E\u0432",
            ". \u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430."
          ] }),
          decryptError && /* @__PURE__ */ jsx9("div", { role: "alert", style: {
            padding: "8px 12px",
            background: VT.dangerSoft,
            border: `1px solid oklch(0.85 0.06 28)`,
            borderRadius: VT.r.md,
            fontSize: 13,
            color: "oklch(0.4 0.15 28)",
            marginBottom: 14
          }, children: decryptError }),
          /* @__PURE__ */ jsx9(
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
          /* @__PURE__ */ jsxs8("div", { style: { marginTop: 14, display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsx9(Btn, { variant: "secondary", size: "sm", style: { flex: 1 }, onClick: cancel, disabled: !!decryptLoading, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
            /* @__PURE__ */ jsx9(
              Btn,
              {
                size: "sm",
                style: { flex: 1 },
                onClick: submitDecrypt,
                disabled: !totp || totp.length < 6 || !!decryptLoading,
                iconRight: decryptLoading ? /* @__PURE__ */ jsx9(Spinner, { size: 14 }) : void 0,
                children: decryptLoading ? "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C\u2026" : "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs8(Fragment10, { children: [
          /* @__PURE__ */ jsxs8("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043E \xB7 ",
            decryptedRows.length
          ] }),
          /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, color: VT.inkFaint, display: "block", marginBottom: 12 }, children: "\u0417\u0430\u043B\u043E\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 audit-log. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u043E\u043A\u043D\u043E \u2014 plaintext \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442 \u0438\u0437 DOM." }),
          /* @__PURE__ */ jsx9("div", { style: { maxHeight: 360, overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }, children: decryptedRows.map((r) => /* @__PURE__ */ jsxs8(Card, { style: { padding: 12, border: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }, children: [
              /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11.5 }, children: r.id }),
              /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: r.site_id }),
              /* @__PURE__ */ jsx9(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(r.created_at) })
            ] }),
            /* @__PURE__ */ jsx9("div", { style: { fontSize: 13, fontWeight: 500 }, children: r.name || "\u2014" }),
            /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: r.phone || "\u2014" }),
            r.message && /* @__PURE__ */ jsxs8("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 4, lineHeight: 1.5 }, children: [
              "\xAB",
              r.message,
              "\xBB"
            ] })
          ] }, r.id)) }),
          /* @__PURE__ */ jsx9("div", { style: { marginTop: 14, display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx9(Btn, { size: "sm", onClick: cancel, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" }) })
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
  const Wrap = _embed === false ? React5.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "waitlist" };
  const items = d.items || [];
  const readyItems = items.filter((it) => it.ready);
  const restItems = items.filter((it) => !it.ready);
  return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx9(Eyebrow, { children: "WAITLIST \xB7 ADR-0009" }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 6px" }, children: /* @__PURE__ */ jsx9("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0413\u043E\u043B\u043E\u0441\u0430 \u043F\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C" }) }),
    /* @__PURE__ */ jsxs8("p", { style: { fontSize: 14, color: VT.inkSoft, margin: "0 0 22px", maxWidth: 680 }, children: [
      "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E ",
      /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: "source_name" }),
      ". \u0417\u0435\u043B\u0451\u043D\u044B\u043C \u2014 \u2265",
      d.threshold,
      " \u0433\u043E\u043B\u043E\u0441\u043E\u0432, \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C ADR."
    ] }),
    error && /* @__PURE__ */ jsx9("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx9(ErrorBlock, { message: error }) }),
    !loading && items.length === 0 && /* @__PURE__ */ jsx9(Card, { style: { padding: 0 }, children: /* @__PURE__ */ jsx9(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438", hint: "\u0413\u043E\u043B\u043E\u0441\u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0438\u0437 feedback-\u0444\u043E\u0440\u043C\u044B \u0438 source-detection \xABunknown\xBB." }) }),
    (loading || items.length > 0) && /* @__PURE__ */ jsx9(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs8("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 }, children: [
      /* @__PURE__ */ jsx9("thead", { children: /* @__PURE__ */ jsx9("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0413\u043E\u043B\u043E\u0441\u043E\u0432", "\u041F\u0435\u0440\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435", ""].map((h) => /* @__PURE__ */ jsx9("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
      /* @__PURE__ */ jsxs8("tbody", { children: [
        loading && [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx9("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [200, 100, 140, 120].map((w, j) => /* @__PURE__ */ jsx9("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx9(SkeletonBlock, { width: w, height: 14 }) }, j)) }, i)),
        !loading && readyItems.map((it) => /* @__PURE__ */ jsx9(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name)),
        !loading && readyItems.length > 0 && restItems.length > 0 && /* @__PURE__ */ jsx9("tr", { "aria-hidden": "true", children: /* @__PURE__ */ jsx9("td", { colSpan: 4, style: { padding: "6px 16px", background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.08em" }, children: [
          "\u2500\u2500\u2500 \u041D\u0418\u0416\u0415 \u041F\u041E\u0420\u041E\u0413\u0410 (",
          d.threshold,
          " \u0413\u041E\u041B\u041E\u0421\u041E\u0412) \u2500\u2500\u2500"
        ] }) }) }),
        !loading && restItems.map((it) => /* @__PURE__ */ jsx9(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name))
      ] })
    ] }) })
  ] }) });
}
function WaitlistRow({ item, threshold, onMarkInDevelopment }) {
  return /* @__PURE__ */ jsxs8("tr", { style: {
    borderBottom: `1px solid ${VT.lineSoft}`,
    background: item.ready ? "oklch(0.97 0.03 145 / 0.5)" : "transparent"
  }, children: [
    /* @__PURE__ */ jsx9("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, padding: "2px 7px", background: VT.bgSoft, borderRadius: 4 }, children: item.source_name }),
      /* @__PURE__ */ jsx9("span", { style: { fontWeight: 500 }, children: SOURCE_LABELS[item.source_name] || item.source_name })
    ] }) }),
    /* @__PURE__ */ jsx9("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx9("span", { style: { fontSize: 22, fontWeight: 700, color: item.ready ? VT.success : VT.ink }, children: item.votes }),
      item.ready && /* @__PURE__ */ jsxs8(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: [
        "\u2265 ",
        threshold,
        " \xB7 \u041F\u041E\u0420\u0410"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx9("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: item.first_seen }) }),
    /* @__PURE__ */ jsx9("td", { style: { padding: "14px 16px", textAlign: "right" }, children: item.ready ? /* @__PURE__ */ jsx9(Btn, { size: "sm", onClick: () => onMarkInDevelopment && onMarkInDevelopment(item.source_name), children: "\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443" }) : /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2014" }) })
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
  return /* @__PURE__ */ jsx9("span", { style: { display: "inline-flex", padding: "2px 8px", borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: "0.06em" }, children: m[0].toUpperCase() });
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
  const Wrap = _embed === false ? React5.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "feedback" };
  const [selectedId, setSelectedId] = useState3(null);
  const selected = useMemo2(() => {
    const items = d.items || [];
    if (selectedId) return items.find((it) => it.id === selectedId) || items[0] || null;
    return items[0] || null;
  }, [d.items, selectedId]);
  const handleRowClick = (id) => {
    setSelectedId(id);
    if (onRowClick) onRowClick(id);
  };
  return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx9(Eyebrow, { children: "FEEDBACK INBOX" }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: /* @__PURE__ */ jsx9("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" }) }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx9("div", { style: { display: "flex", gap: 6 }, children: FB_TYPE_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx9(
        FilterChip,
        {
          label,
          active: typeFilter === key,
          onClick: () => onTypeFilterChange && onTypeFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx9("div", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ jsx9(
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
    error && /* @__PURE__ */ jsx9("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx9(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs8(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs8("div", { style: { padding: "14px 16px", borderBottom: `1px solid ${VT.lineSoft}` }, children: [
          /* @__PURE__ */ jsx9(SkeletonBlock, { width: "60%", height: 12, style: { marginBottom: 6 } }),
          /* @__PURE__ */ jsx9(SkeletonBlock, { width: "90%", height: 14 })
        ] }, i)),
        !loading && (d.items || []).length === 0 && /* @__PURE__ */ jsx9(EmptyState, { title: "Inbox \u043F\u0443\u0441\u0442", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0441\u0442\u0430\u0432\u0438\u0442 feedback \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
        !loading && (d.items || []).map((row, i, arr) => {
          const isSelected = selected && selected.id === row.id;
          return /* @__PURE__ */ jsxs8(
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
                /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }, children: [
                  /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11.5 }, children: row.id }),
                  /* @__PURE__ */ jsx9(FbTypePill, { type: row.type }),
                  /* @__PURE__ */ jsx9(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(row.created_at) })
                ] }),
                /* @__PURE__ */ jsx9("div", { style: { fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: row.message }),
                /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: row.email_or_contact_masked || "\u2014" })
              ]
            },
            row.id
          );
        }),
        !loading && (d.items || []).length > 0 && onPageChange && /* @__PURE__ */ jsxs8("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft, borderTop: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsxs8("span", { children: [
            d.offset + 1,
            "\u2013",
            Math.min(d.offset + d.limit, d.total),
            " \u0438\u0437 ",
            d.total
          ] }),
          /* @__PURE__ */ jsxs8("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx9(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0, children: "\u2190" }),
            /* @__PURE__ */ jsx9(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total, children: "\u2192" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx9(Card, { style: { padding: 22 }, children: !selected ? /* @__PURE__ */ jsx9(EmptyState, { title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C \u0441\u043B\u0435\u0432\u0430" }) : /* @__PURE__ */ jsxs8(Fragment10, { children: [
        /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx9(Mono, { children: selected.id }),
          /* @__PURE__ */ jsx9(FbTypePill, { type: selected.type }),
          /* @__PURE__ */ jsx9(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(selected.created_at) })
        ] }),
        /* @__PURE__ */ jsx9("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: selected.type === "source_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" : selected.type === "feature_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0444\u0438\u0447\u0438" : selected.type === "bug" ? "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435" : "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }),
        selected.email_or_contact_masked && /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: selected.email_or_contact_masked }),
        /* @__PURE__ */ jsx9("p", { style: { fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: "14px 0 18px" }, children: selected.message }),
        selected.source_name && /* @__PURE__ */ jsxs8("div", { style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE NAME" }),
          /* @__PURE__ */ jsx9("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ jsx9(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 12 }, children: selected.source_name }) })
        ] }),
        selected.checkboxes && Object.keys(selected.checkboxes).length > 0 && /* @__PURE__ */ jsxs8("details", { open: false, children: [
          /* @__PURE__ */ jsx9("summary", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: VT.inkSoft,
            cursor: "pointer",
            padding: "6px 0",
            listStyle: "none"
          }, children: "CHECKBOXES \xB7 JSONB \u25BE" }),
          /* @__PURE__ */ jsx9("pre", { style: {
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
  return /* @__PURE__ */ jsxs8("span", { style: {
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
    /* @__PURE__ */ jsx9("span", { "aria-hidden": "true", children: on ? "\u2713" : "\u26A0" }),
    label || (on ? "\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D" : "\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D")
  ] });
}
function KeyValueRow({ label, children }) {
  return /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${VT.line}`, gap: 16 }, children: [
    /* @__PURE__ */ jsx9("span", { style: { fontSize: 13, color: VT.inkSoft }, children: label }),
    /* @__PURE__ */ jsx9("div", { children })
  ] });
}
function S19_Settings({ data, loading, error, onRefresh, _embed }) {
  const d = data || MOCK_SETTINGS;
  const Wrap = _embed === false ? React5.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "settings" };
  const envBadge = d.environment === "prod" ? { kind: "danger", label: "PROD" } : d.environment === "staging" ? { kind: "warn", label: "STAGING" } : { kind: "info", label: "DEV" };
  return /* @__PURE__ */ jsx9(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs8("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx9(Eyebrow, { children: "SETTINGS \xB7 SYSTEM" }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx9("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430" }),
      onRefresh && /* @__PURE__ */ jsx9(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" })
    ] }),
    error && /* @__PURE__ */ jsx9("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx9(ErrorBlock, { message: error, onRetry: onRefresh }) }),
    loading && /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsx9(SkeletonBlock, { width: "100%", height: 200, radius: 10 }),
      /* @__PURE__ */ jsx9(SkeletonBlock, { width: "100%", height: 200, radius: 10 })
    ] }),
    !loading && /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs8(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0421\u0420\u0415\u0414\u0410" }),
        /* @__PURE__ */ jsxs8("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Environment", children: /* @__PURE__ */ jsx9(Badge, { kind: envBadge.kind, style: { padding: "2px 10px", fontSize: 11.5 }, children: envBadge.label }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Log level", children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 13 }, children: d.log_level }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0411\u0410\u0417\u041E\u0412\u042B\u0415 URL" }),
        /* @__PURE__ */ jsxs8("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "App", children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: d.app_base_url }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Landing", children: /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: d.landing_base_url }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Sites", children: /* @__PURE__ */ jsxs8(Mono, { style: { fontSize: 12 }, children: [
            "*.",
            d.sites_base_domain
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "FEATURE FLAGS" }),
        /* @__PURE__ */ jsxs8("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "MAX-bot integration", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.feature_max_bot, label: d.feature_max_bot ? "on" : "off" }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Auto-sync sites", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.feature_auto_sync, label: d.feature_auto_sync ? "on" : "off" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs8(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0412\u041D\u0415\u0428\u041D\u0418\u0415 \u0421\u0415\u0420\u0412\u0418\u0421\u042B" }),
        /* @__PURE__ */ jsxs8("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Captcha", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.captcha_configured }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Telegram-\u0431\u043E\u0442", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.tg_bot_configured }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "YandexGPT", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.yandexgpt_configured }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "\u042EKassa", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.yookassa_configured }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "S3 storage", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.s3_configured }) }),
          /* @__PURE__ */ jsx9(KeyValueRow, { label: "Fernet keys", children: /* @__PURE__ */ jsx9(ConfiguredBadge, { on: d.fernet_keys_configured }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 14, display: "block" }, children: "Read-only snapshot. \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u043A\u0440\u0435\u0442\u043E\u0432 \u043D\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u044E\u0442\u0441\u044F \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0430\u0442\u0443\u0441 \xAB\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D/\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\xBB." })
  ] }) });
}
var SitesList = S14_SitesList;
var SiteDetail = S15_SiteDetail;
var Leads = S16_Leads;
var Waitlist = S17_Waitlist;
var FeedbackInbox = S18_FeedbackInbox;
var Settings = S19_Settings;

// src/auth/index.tsx
import { useState as useState4, useEffect as useEffect3, useCallback as useCallback3 } from "react";
import { jsx as jsx10, jsxs as jsxs9 } from "react/jsx-runtime";
var CUSTOMER_ERROR_MSG = {
  invalid_credentials: "\u041D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043C\u044B \u0432\u0430\u043C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438.",
  rate_limited: null,
  // rendered via CustomerRateLimitNotice w/ countdown
  network_error: "\u0421\u0435\u0442\u044C \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443.",
  unknown_error: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443."
};
function CustomerRateLimitNotice({ retryAfterSeconds = 263 }) {
  const [remaining, setRemaining] = useState4(retryAfterSeconds);
  useEffect3(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const totalMin = Math.ceil(remaining / 60);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxs9("div", { role: "alert", style: {
    padding: "10px 12px",
    background: VT.dangerSoft,
    border: `1px solid oklch(0.85 0.06 28)`,
    borderRadius: VT.r.md,
    fontSize: 13,
    color: "oklch(0.4 0.15 28)",
    marginBottom: 14,
    lineHeight: 1.5
  }, children: [
    /* @__PURE__ */ jsx10("span", { "aria-hidden": "true", style: { marginRight: 6 }, children: "\u26A0\uFE0F" }),
    "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 ",
    totalMin,
    "\xA0\u043C\u0438\u043D \u2014 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",
    " ",
    /* @__PURE__ */ jsxs9("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
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
  return /* @__PURE__ */ jsxs9("div", { role: "alert", style: {
    padding: "10px 12px",
    background: VT.dangerSoft,
    border: `1px solid oklch(0.85 0.06 28)`,
    borderRadius: VT.r.md,
    fontSize: 13,
    color: "oklch(0.4 0.15 28)",
    marginBottom: 14,
    lineHeight: 1.5
  }, children: [
    /* @__PURE__ */ jsx10("span", { "aria-hidden": "true", style: { marginRight: 6 }, children: "\u26A0\uFE0F" }),
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
  return /* @__PURE__ */ jsx10(
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
  const [uLogin, setULogin] = useState4(props.login ?? "");
  const [uPass, setUPass] = useState4(props.password ?? "");
  const login = props.login ?? uLogin;
  const password = props.password ?? uPass;
  const setLogin = props.onLoginChange ?? setULogin;
  const setPassword = props.onPasswordChange ?? setUPass;
  const { loading, error, retryAfterSeconds, onSubmit, onCreateSiteClick } = props;
  const isRateLimited = error === "rate_limited";
  const handleSubmit = useCallback3((e) => {
    e.preventDefault();
    if (loading || isRateLimited) return;
    if (onSubmit) onSubmit();
  }, [loading, isRateLimited, onSubmit]);
  return /* @__PURE__ */ jsx10("div", { style: {
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
  }, children: /* @__PURE__ */ jsxs9("div", { style: { width: "100%", maxWidth: 420 }, children: [
    /* @__PURE__ */ jsx10("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18
    }, children: /* @__PURE__ */ jsx10("a", { href: "/", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx10(BrandMark, { size: 26, fontSize: 20 }) }) }),
    /* @__PURE__ */ jsxs9(Card, { style: {
      padding: 28,
      boxShadow: VT.shadow.card,
      borderTop: `2px solid ${VT.success}`
    }, children: [
      /* @__PURE__ */ jsx10("h1", { style: {
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        margin: "0 0 6px",
        lineHeight: 1.2
      }, children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0432\u043E\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" }),
      /* @__PURE__ */ jsx10("p", { style: {
        fontSize: 13.5,
        color: VT.inkSoft,
        margin: "0 0 18px",
        lineHeight: 1.5
      }, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u043F\u0440\u0438\u0441\u043B\u0430\u043B\u0438 \u0432\u0430\u043C \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430." }),
      isRateLimited ? /* @__PURE__ */ jsx10(CustomerRateLimitNotice, { retryAfterSeconds: retryAfterSeconds ?? 263 }) : error && /* @__PURE__ */ jsx10(CustomerErrorNotice, { code: error }),
      /* @__PURE__ */ jsxs9("form", { onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsx10("label", { htmlFor: "ss-customer-login", style: {
          display: "block",
          fontSize: 12,
          color: VT.inkSoft,
          marginBottom: 4,
          fontWeight: 500
        }, children: "\u041B\u043E\u0433\u0438\u043D" }),
        /* @__PURE__ */ jsx10(
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
        /* @__PURE__ */ jsx10("label", { htmlFor: "ss-customer-password", style: {
          display: "block",
          fontSize: 12,
          color: VT.inkSoft,
          marginBottom: 4,
          fontWeight: 500
        }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
        /* @__PURE__ */ jsx10(
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
        /* @__PURE__ */ jsx10("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx10(
          Btn,
          {
            type: "submit",
            style: { width: "100%" },
            disabled: loading || isRateLimited || !login || !password,
            iconRight: loading ? /* @__PURE__ */ jsx10(Spinner, { size: 14 }) : /* @__PURE__ */ jsx10(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs9("div", { style: {
      marginTop: 22,
      textAlign: "center",
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0415\u0449\u0451 \u043D\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430?",
      " ",
      onCreateSiteClick ? /* @__PURE__ */ jsxs9(
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
            /* @__PURE__ */ jsx10("span", { "aria-hidden": "true", children: "\u2192" })
          ]
        }
      ) : /* @__PURE__ */ jsxs9("a", { href: "/", style: {
        color: VT.accent,
        fontWeight: 600,
        textDecoration: "none"
      }, children: [
        "\u0421\u0434\u0435\u043B\u0430\u0442\u044C\xA0",
        /* @__PURE__ */ jsx10("span", { "aria-hidden": "true", children: "\u2192" })
      ] })
    ] }),
    /* @__PURE__ */ jsx10("div", { style: {
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
import { jsx as jsx11, jsxs as jsxs10 } from "react/jsx-runtime";
function MiniHero({ url }) {
  return /* @__PURE__ */ jsxs10("div", { style: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.pill,
    padding: 8,
    boxShadow: VT.shadow.card
  }, children: [
    /* @__PURE__ */ jsxs10("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }, children: [
      /* @__PURE__ */ jsx11(IconLink, {}),
      /* @__PURE__ */ jsx11("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: VT.ink,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }, children: url })
    ] }),
    /* @__PURE__ */ jsx11(Btn, { iconRight: /* @__PURE__ */ jsx11(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
  ] });
}
function StateBadge({ kind, icon, children }) {
  return /* @__PURE__ */ jsxs10("span", { style: {
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
    /* @__PURE__ */ jsx11("span", { style: { width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: icon }),
    children
  ] });
}
var STATES = [
  {
    id: "loading",
    label: "1 \xB7 Loading",
    kind: "neutral",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "neutral", icon: /* @__PURE__ */ jsx11(Spinner, {}), children: "\u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" }),
    note: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u043B \u0442\u0438\u043F (<100ms). \u0417\u0430\u043F\u0440\u043E\u0441 preview API \u0432 \u0444\u043E\u043D\u0435, 3s timeout.",
    api: "GET /api/preview?url=\u2026 (debounced 300ms)"
  },
  {
    id: "tg-success",
    label: "2 \xB7 \u2713 Telegram",
    kind: "success",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx11("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx11("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B \u2014 \u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E" }),
    note: "Bot API getChat + getChatHistory(1). CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB \u0430\u043A\u0442\u0438\u0432\u043D\u0430 \u2014 open Submit modal.",
    api: 'GET /api/preview \u2192 {source:"telegram", posts:47, photos:12}'
  },
  {
    id: "ymaps-success",
    label: "3 \xB7 \u2713 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    kind: "success",
    url: "yandex.ru/maps/-/CDvI7QJM",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx11("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx11("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u2014 \u043D\u0430\u0448\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443, 24 \u043E\u0442\u0437\u044B\u0432\u0430 \u0438 18 \u0444\u043E\u0442\u043E" }),
    note: "Geosearch API find. \u0415\u0441\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u2192 fallback \u043A \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u043E\u043C\u0443 \u2713 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B.",
    api: 'GET /api/preview \u2192 {source:"yandex_maps", reviews:24, photos:18}'
  },
  {
    id: "preview-timeout",
    label: "4 \xB7 \u2713 \u0411\u0435\u0437 \u0447\u0438\u0441\u0435\u043B (preview timeout >3s)",
    kind: "success",
    url: "t.me/privatechannel",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx11("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx11("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B" }),
    note: "FR-005a: regex \u043E\u0442\u0434\u0430\u043B \u0442\u0438\u043F, preview API \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0437\u0430 3s \u2192 \u0431\u0435\u0439\u0434\u0436 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E.",
    api: "Timeout fallback \u2014 UI \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 submit"
  },
  {
    id: "ig-success",
    label: "5 \xB7 \u2713 Instagram",
    kind: "success",
    url: "instagram.com/master.nails.spb",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx11("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx11("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Instagram" }),
    note: "0.3.0: Instagram \u0442\u0435\u043F\u0435\u0440\u044C \u043E\u0431\u044B\u0447\u043D\u044B\u0439 ok-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u0417\u0430\u044F\u0432\u043A\u0430 \u0438\u0434\u0451\u0442 \u0432 \u043E\u0431\u0449\u0443\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0440\u0443\u0447\u043D\u0430\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0440\u0435\u0448\u0438\u0442 \u0447\u0442\u043E \u0432\u044B\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0442\u044C.",
    api: 'GET /api/preview \u2192 {source:"instagram", status:"ok"}'
  },
  {
    id: "vk-waitlist",
    label: "6 \xB7 \u2139\uFE0F \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u2014 waitlist + photo CTA",
    kind: "info",
    url: "vk.com/master_nails",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx11("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
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
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx11("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "2GIS \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
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
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx11("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E?" }),
    unknownInput: true,
    note: "Open input. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u043A\u0430\u043A source_request c source_name=user-typed \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438.",
    api: 'POST /api/feedback { type:"source_request", source_name:<user>, source_url_raw:<url> }'
  },
  {
    id: "not-url",
    label: "9 \xB7 \u26A0\uFE0F \u041D\u0435 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438 \u043D\u0435 \u0444\u0430\u0439\u043B",
    kind: "warn",
    url: "\u043C\u0430\u0441\u0442\u0435\u0440 \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430",
    badge: /* @__PURE__ */ jsx11(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx11("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" }),
    note: "CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB disabled, fallback-\u0441\u0441\u044B\u043B\u043A\u0430 \xAB\u{1F4F7} \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E\xBB \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u0430.",
    api: "\u2014 (client-side only)"
  }
];
function WaitlistCapture({ source, withPhotoCta }) {
  const label = source === "instagram" ? "Instagram" : source === "vk" ? "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435" : source === "2gis" ? "2GIS" : source;
  return /* @__PURE__ */ jsxs10("div", { style: {
    marginTop: 12,
    background: VT.infoSoft,
    border: `1px solid oklch(0.85 0.05 240)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsxs10("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.32 0.10 240)" }, children: [
      "\u041D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u043E\u0433\u0434\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u043C ",
      label
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx11(Input, { placeholder: "email \u0438\u043B\u0438 @telegram", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx11(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })
    ] }),
    withPhotoCta && /* @__PURE__ */ jsxs10("div", { style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px dashed oklch(0.85 0.05 240)`,
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0418\u043B\u0438 \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F:",
      /* @__PURE__ */ jsxs10("a", { style: {
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
        /* @__PURE__ */ jsx11(IconArrow, { size: 14 })
      ] })
    ] })
  ] });
}
function UnknownSourceInput() {
  return /* @__PURE__ */ jsxs10("div", { style: {
    marginTop: 12,
    background: VT.warnSoft,
    border: `1px solid oklch(0.85 0.06 70)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx11("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.36 0.13 70)" }, children: "\u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A?" }),
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10 }, children: [
      /* @__PURE__ */ jsx11(Input, { placeholder: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \xAB\u0414\u0437\u0435\u043D\xBB \u0438\u043B\u0438 \xAB\u0441\u0432\u043E\u0439 \u0431\u043B\u043E\u0433\xBB)", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx11(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u043E\u0431\u0449\u0438\u0442\u044C" })
    ] })
  ] });
}
function StateRow({ s }) {
  return /* @__PURE__ */ jsx11(Card, { style: { padding: 24 }, children: /* @__PURE__ */ jsxs10("div", { style: { display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 32 }, children: [
    /* @__PURE__ */ jsxs10("div", { children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsx11(MiniHero, { url: s.url }),
      /* @__PURE__ */ jsx11("div", { style: { marginTop: 12, paddingLeft: 16 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx11(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx11(UnknownSourceInput, {})
    ] }),
    /* @__PURE__ */ jsxs10("div", { style: { borderLeft: `1px dashed ${VT.line}`, paddingLeft: 24 }, children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: "\u041B\u041E\u0413\u0418\u041A\u0410" }),
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 14, lineHeight: 1.5, color: VT.ink }, children: s.note }),
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, margin: "16px 0 6px" }, children: "API" }),
      /* @__PURE__ */ jsx11("div", { style: {
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
  return /* @__PURE__ */ jsxs10("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "40px 56px 64px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx11(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 SOURCE DETECTION" }),
      /* @__PURE__ */ jsx11(Mono, { style: { fontSize: 12 }, children: "FR-005, FR-005a, ADR-0009" })
    ] }),
    /* @__PURE__ */ jsx11("h2", { style: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.1 }, children: "\u0411\u0435\u0439\u0434\u0436\u0438 \u043F\u043E\u0434 input \u2014 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F live preview" }),
    /* @__PURE__ */ jsx11("p", { style: { fontSize: 16, lineHeight: 1.5, color: VT.inkSoft, maxWidth: 820, margin: "0 0 32px" }, children: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0437\u0430 <100ms \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0431\u0435\u0439\u0434\u0436. \u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E preview API (3s timeout) \u0434\u043E\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0447\u0438\u0441\u043B\u0430\u043C\u0438. MVP-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438: Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B. \u041E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u2014 waitlist + \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u0430\u044F CTA \u043D\u0430 \u0444\u043E\u0442\u043E-\u0444\u043B\u043E\u0443." }),
    /* @__PURE__ */ jsx11("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: STATES.map((s) => /* @__PURE__ */ jsx11(StateRow, { s }, s.id)) })
  ] });
}
function S2_Mobile() {
  const mobile = STATES.filter((s) => ["loading", "tg-success", "ig-success", "unknown-url"].includes(s.id));
  return /* @__PURE__ */ jsxs10("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "20px 16px 40px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsx11(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 MOBILE" }),
    /* @__PURE__ */ jsx11("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "12px 0 18px", lineHeight: 1.15 }, children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0431\u0435\u0439\u0434\u0436\u0430 \u2014 4 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445" }),
    /* @__PURE__ */ jsx11("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: mobile.map((s) => /* @__PURE__ */ jsxs10(Card, { style: { padding: 14 }, children: [
      /* @__PURE__ */ jsx11("div", { style: { fontSize: 10.5, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 6 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsxs10("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.lg,
        padding: 10
      }, children: [
        /* @__PURE__ */ jsxs10("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 8px" }, children: [
          /* @__PURE__ */ jsx11(IconLink, {}),
          /* @__PURE__ */ jsx11("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s.url })
        ] }),
        /* @__PURE__ */ jsx11(Btn, { iconRight: /* @__PURE__ */ jsx11(IconArrow, {}), style: { borderRadius: VT.r.md, width: "100%" }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
      ] }),
      /* @__PURE__ */ jsx11("div", { style: { marginTop: 10 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx11(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx11(UnknownSourceInput, {})
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
  DisplayFamily,
  EditorialFamily,
  EmptyState,
  ErrorBlock,
  ExamplesSection,
  Eyebrow,
  FaqSection,
  FeedbackInbox,
  FeedbackPage,
  FilterChip,
  FinalCtaSection,
  HeroBlock,
  HeroSection,
  IconArrow,
  IconLink,
  Input,
  Landing,
  LeadForm,
  Leads,
  Logo,
  MiniChrome,
  MondaySection,
  Mono,
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
  S3_StepContact,
  S7_CustomerSite,
  S7_SchemeSwatches,
  S8_LeadFormConfirm,
  S9_FeedbackPage,
  SOURCE_ICONS,
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
  VT,
  Waitlist,
  bentoClay,
  bentoLight,
  bentoNoir,
  displayBold,
  displayInk,
  displayNoir,
  displaySoft,
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