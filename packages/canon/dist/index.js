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
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var G_BG = VT.accentSoft;
var G_INK = VT.accent;
var G_INK_DARK = "oklch(0.32 0.14 35)";
function Glyph({ size = 88, children, tint }) {
  return /* @__PURE__ */ jsx3("div", { style: {
    width: size,
    height: size,
    borderRadius: 18,
    background: tint || G_BG,
    color: G_INK_DARK,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto",
    position: "relative",
    overflow: "hidden"
  }, children });
}
function GlyphGift({ size = 88 }) {
  return /* @__PURE__ */ jsx3(Glyph, { size, children: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: size * 0.7, height: size * 0.7, fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx3("rect", { x: "10", y: "24", width: "44", height: "28", rx: "3" }),
    /* @__PURE__ */ jsx3("path", { d: "M10 24 L54 24" }),
    /* @__PURE__ */ jsx3("path", { d: "M32 24 L32 52" }),
    /* @__PURE__ */ jsx3("path", { d: "M22 24 C 22 14, 32 14, 32 24" }),
    /* @__PURE__ */ jsx3("path", { d: "M42 24 C 42 14, 32 14, 32 24" })
  ] }) });
}
function PhotoBlock({ tone = "peach", src, children, style, label }) {
  const tones = {
    peach: ["oklch(0.84 0.07 50)", "oklch(0.62 0.09 35)", "oklch(0.46 0.07 30)"],
    sage: ["oklch(0.82 0.06 145)", "oklch(0.58 0.08 145)", "oklch(0.38 0.06 145)"],
    slate: ["oklch(0.80 0.04 240)", "oklch(0.55 0.06 240)", "oklch(0.35 0.04 240)"],
    warm: ["oklch(0.88 0.05 70)", "oklch(0.70 0.10 50)", "oklch(0.48 0.10 35)"],
    rose: ["oklch(0.86 0.06 25)", "oklch(0.65 0.10 20)", "oklch(0.40 0.08 18)"]
  };
  const [c1, c2, c3] = tones[tone] || tones.peach;
  return /* @__PURE__ */ jsxs2("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: src ? "#222" : `
        radial-gradient(120% 80% at 30% 20%, ${c1} 0%, transparent 55%),
        radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%),
        linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)
      `,
    ...style
  }, children: [
    src && /* @__PURE__ */ jsx3(
      "img",
      {
        src,
        alt: "",
        loading: "lazy",
        style: {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block"
        }
      }
    ),
    !src && /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `
            radial-gradient(60% 30% at 20% 5%, rgba(255,255,255,0.18) 0%, transparent 60%),
            radial-gradient(40% 20% at 80% 95%, rgba(0,0,0,0.15) 0%, transparent 60%)
          `
    } }),
    children,
    label && !src && /* @__PURE__ */ jsx3("span", { style: {
      position: "absolute",
      left: 8,
      bottom: 6,
      fontFamily: VT.font.mono,
      fontSize: 9,
      color: "rgba(255,255,255,0.7)",
      letterSpacing: "0.08em"
    }, children: label })
  ] });
}
function Star({ filled = true, size = 11 }) {
  return /* @__PURE__ */ jsx3("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: filled ? "#f4a93b" : "none", stroke: filled ? "#f4a93b" : "#ccc", strokeWidth: "1.5", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" }) });
}
function MiniAvatar({ name, tone = "peach", size = 26 }) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  const tones = {
    peach: ["oklch(0.78 0.10 50)", "oklch(0.55 0.12 35)"],
    rose: ["oklch(0.80 0.09 25)", "oklch(0.56 0.11 18)"],
    sage: ["oklch(0.78 0.08 145)", "oklch(0.52 0.10 145)"],
    slate: ["oklch(0.78 0.05 240)", "oklch(0.52 0.06 240)"]
  };
  const [c1, c2] = tones[tone] || tones.peach;
  return /* @__PURE__ */ jsx3("span", { style: {
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
    fontSize: Math.round(size * 0.46)
  }, children: initial });
}
function SiteCard({
  name,
  category,
  city,
  palette = "peach",
  tone,
  mobile = false,
  services = [],
  reviews = [],
  gallery = [],
  heroPhoto,
  handle = "studia",
  heroFormula = null,
  // optional override; falls back to name
  rating = "4.9",
  reviewCount = 38,
  clientsCount = "1 200+",
  phone = "+7 999 111-11-11",
  logo = null
}) {
  const palettes = {
    peach: { bg: "oklch(0.98 0.012 60)", bgAlt: "oklch(0.95 0.014 60)", ink: "oklch(0.22 0.018 60)", sub: "oklch(0.48 0.018 60)", ac: VT.accent, acSoft: "oklch(0.93 0.05 40)" },
    sage: { bg: "oklch(0.98 0.012 145)", bgAlt: "oklch(0.95 0.014 145)", ink: "oklch(0.20 0.015 145)", sub: "oklch(0.42 0.018 145)", ac: "oklch(0.50 0.13 145)", acSoft: "oklch(0.93 0.06 145)" },
    slate: { bg: "oklch(0.98 0.005 250)", bgAlt: "oklch(0.95 0.008 250)", ink: "oklch(0.20 0.012 250)", sub: "oklch(0.45 0.015 250)", ac: "oklch(0.50 0.12 250)", acSoft: "oklch(0.93 0.045 250)" }
  };
  const p = palettes[palette] || palettes.peach;
  const ph = tone || palette;
  const h1 = heroFormula || `${category} \u0432 ${city}`;
  const reviewTones = ["peach", "rose", "sage", "slate"];
  return /* @__PURE__ */ jsxs2("div", { className: "ss-card-lift", style: {
    background: p.bg,
    color: p.ink,
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
      /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: 8, fontFamily: VT.font.mono, fontSize: 10, color: VT.inkFaint }, children: [
        handle,
        ".",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "9px 12px",
      background: "rgba(255,255,255,0.96)",
      borderBottom: `1px solid ${VT.line}`
    }, children: [
      logo && /* @__PURE__ */ jsx3("span", { style: {
        width: 24,
        height: 24,
        flex: "0 0 auto",
        borderRadius: 7,
        background: logo.bg || p.ac,
        color: logo.fg || "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: 13,
        letterSpacing: "-0.04em",
        lineHeight: 1
      }, children: logo.letter }),
      /* @__PURE__ */ jsx3("span", { style: { fontSize: 12.5, fontWeight: 700, color: p.ink, letterSpacing: "-0.015em" }, children: name }),
      /* @__PURE__ */ jsx3("span", { style: {
        marginLeft: "auto",
        fontFamily: VT.font.mono,
        fontSize: 10.5,
        color: p.sub,
        whiteSpace: "nowrap"
      }, children: phone }),
      /* @__PURE__ */ jsx3("span", { style: {
        padding: "4px 10px",
        borderRadius: 999,
        background: p.ac,
        color: "#fff",
        fontSize: 10.5,
        fontWeight: 600
      }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      padding: "14px 14px 12px",
      borderBottom: `1px solid ${VT.line}`
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: p.ac,
        fontWeight: 600
      }, children: [
        category.toUpperCase(),
        " \xB7 ",
        city.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx3("h3", { style: {
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: "-0.025em",
        margin: "6px 0 0",
        lineHeight: 1.1,
        color: p.ink,
        textWrap: "balance"
      }, children: h1 }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 10,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        background: p.bgAlt,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 11
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx3(Star, { filled: true, size: 10 }, i)) }),
        /* @__PURE__ */ jsxs2("b", { style: { color: p.ink }, children: [
          rating,
          " \u2605"
        ] }),
        /* @__PURE__ */ jsxs2("span", { style: { color: p.sub }, children: [
          "\xB7 ",
          reviewCount,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx3(PhotoBlock, { tone: ph, src: heroPhoto, style: {
        aspectRatio: "16 / 9",
        borderRadius: 8,
        border: `1px solid ${VT.line}`
      } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: 10, display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          flex: 1,
          textAlign: "center",
          padding: "8px 10px",
          borderRadius: 8,
          background: p.ac,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600
        }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192" }),
        /* @__PURE__ */ jsx3("span", { style: {
          padding: "8px 10px",
          borderRadius: 8,
          background: "transparent",
          color: p.ink,
          border: `1px solid ${VT.line}`,
          fontFamily: VT.font.mono,
          fontSize: 11,
          whiteSpace: "nowrap",
          flex: "0 0 auto"
        }, "aria-label": phone, children: /* @__PURE__ */ jsx3("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline-block", verticalAlign: "middle" }, children: /* @__PURE__ */ jsx3("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      padding: "8px 14px",
      background: p.bgAlt,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: VT.font.mono,
      fontSize: 10,
      letterSpacing: "0.06em",
      color: p.sub
    }, children: [
      /* @__PURE__ */ jsx3("span", { children: "\u041D\u0410\u0421 \u0412\u042B\u0411\u0420\u0410\u041B\u0418" }),
      /* @__PURE__ */ jsx3("b", { style: { fontFamily: VT.font.sans, fontSize: 13, color: p.ink, letterSpacing: "-0.02em" }, children: clientsCount }),
      /* @__PURE__ */ jsx3("span", { children: "\u0427\u0415\u041B\u041E\u0412\u0415\u041A" }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          fontSize: 8,
          fontWeight: 800,
          color: "#fff",
          background: "#FFCC00",
          width: 14,
          height: 14,
          borderRadius: 4,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center"
        }, children: "\u042F" }),
        /* @__PURE__ */ jsxs2("b", { style: { fontFamily: VT.font.sans, color: p.ink }, children: [
          rating,
          " \u2605"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 14px" }, children: [
      /* @__PURE__ */ jsx3("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: p.ac,
        fontWeight: 600,
        marginBottom: 8
      }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: services.slice(0, 3).map(([n, pr], i) => /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 10,
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 12, fontWeight: 600, color: p.ink, letterSpacing: "-0.01em" }, children: n }),
          /* @__PURE__ */ jsx3("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: p.ink, marginTop: 1 }, children: pr })
        ] }),
        /* @__PURE__ */ jsx3("span", { style: {
          padding: "4px 8px",
          borderRadius: 999,
          background: p.acSoft,
          color: p.ac,
          fontSize: 10,
          fontWeight: 600
        }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192" })
      ] }, n)) })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 14px", background: p.bgAlt, borderTop: `1px solid ${VT.line}` }, children: [
      /* @__PURE__ */ jsx3("div", { style: {
        display: "flex",
        alignItems: "baseline",
        marginBottom: 8
      }, children: /* @__PURE__ */ jsx3("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: p.ac,
        fontWeight: 600
      }, children: "\u041E\u0422\u0417\u042B\u0412\u042B" }) }),
      /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: reviews.slice(0, 2).map((r, i) => /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 10,
        padding: "8px 10px",
        position: "relative"
      }, children: [
        i === 0 && /* @__PURE__ */ jsx3("span", { style: {
          position: "absolute",
          top: 7,
          right: 8,
          fontFamily: VT.font.mono,
          fontSize: 8,
          letterSpacing: "0.08em",
          background: p.acSoft,
          color: p.ac,
          padding: "2px 5px",
          borderRadius: 3,
          fontWeight: 700
        }, children: "\u2605 \u041B\u0423\u0427\u0428\u0418\u0419" }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx3(MiniAvatar, { name: r.author, tone: reviewTones[i % reviewTones.length], size: 22 }),
          /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 11, fontWeight: 600, color: p.ink, lineHeight: 1.1 }, children: r.author }),
            /* @__PURE__ */ jsx3("div", { style: { display: "flex", gap: 1, marginTop: 1 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx3(Star, { filled: true, size: 8 }, j)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("p", { style: {
          margin: "6px 0 0",
          fontSize: 11.5,
          lineHeight: 1.4,
          color: p.ink,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }, children: [
          "\xAB",
          r.text,
          "\xBB"
        ] })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { padding: "12px 14px" }, children: /* @__PURE__ */ jsx3("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 3
    }, children: gallery.slice(0, 4).map((g, i) => /* @__PURE__ */ jsx3(
      PhotoBlock,
      {
        tone: g.tone || ph,
        src: g.src,
        style: { aspectRatio: "1 / 1", borderRadius: 4 }
      },
      i
    )) }) }),
    /* @__PURE__ */ jsx3("div", { style: { padding: "0 14px 14px", marginTop: "auto" }, children: /* @__PURE__ */ jsx3("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      padding: "11px 14px",
      borderRadius: 10,
      background: p.ac,
      color: "#fff",
      fontSize: 13,
      fontWeight: 700
    }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D \u2192" }) })
  ] });
}
var PLATFORMS_OK = [
  {
    id: "yandex",
    name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    bg: "transparent",
    fg: "#000",
    logo: /* @__PURE__ */ jsx3(YandexIcon, {}),
    pull: "\u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B",
    featured: true
  },
  {
    id: "telegram",
    name: "Telegram-\u043A\u0430\u043D\u0430\u043B",
    bg: "#229ED9",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx3(PlaneIcon, {}),
    pull: "\u043F\u043E\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  },
  {
    id: "instagram",
    name: "Instagram",
    bg: "linear-gradient(135deg, #FEDA77 0%, #F58529 30%, #DD2A7B 60%, #8134AF 100%)",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx3(CameraIcon, {}),
    pull: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F"
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    bg: "transparent",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx3(TwoGisIcon, {}),
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  },
  {
    id: "avito",
    name: "Avito",
    bg: "transparent",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx3(AvitoIcon, {}),
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u043E\u0442\u0437\u044B\u0432\u044B"
  },
  {
    id: "site",
    name: "\u0412\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    bg: "oklch(0.42 0.04 250)",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx3(GlobeMini, {}),
    pull: "\u0442\u0435\u043A\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0443\u0441\u043B\u0443\u0433\u0438"
  },
  {
    id: "card",
    name: "\u0424\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438\xA0\u043C\u0435\u043D\u044E",
    bg: "oklch(0.78 0.07 70)",
    fg: "#3a2410",
    logo: /* @__PURE__ */ jsx3(CardIcon, {}),
    pull: "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  }
];
var PLATFORMS_SOON = [
  { id: "vk", name: "VK-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430", bg: "#0077FF", logo: "V" },
  { id: "ozon", name: "Ozon-\u0432\u0438\u0442\u0440\u0438\u043D\u0430", bg: "#005BFF", logo: "O" },
  { id: "youtube", name: "YouTube-\u043A\u0430\u043D\u0430\u043B", bg: "#FF0033", logo: /* @__PURE__ */ jsx3(PlayIcon, {}) }
];
function PlaneIcon() {
  return /* @__PURE__ */ jsx3("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { d: "M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" }) });
}
function GlobeMini() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ jsx3("ellipse", { cx: "12", cy: "12", rx: "4", ry: "9" }),
    /* @__PURE__ */ jsx3("path", { d: "M3 12h18" })
  ] });
}
function CardIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx3("rect", { x: "3", y: "6", width: "18", height: "12", rx: "2" }),
    /* @__PURE__ */ jsx3("path", { d: "M7 11h6M7 14h4" })
  ] });
}
function CameraIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx3("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "13", r: "4" }),
    /* @__PURE__ */ jsx3("path", { d: "M9 6l1-2h4l1 2" })
  ] });
}
function YandexIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "none", children: [
    /* @__PURE__ */ jsx3("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
    /* @__PURE__ */ jsx3("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
  ] });
}
function TwoGisIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
    /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
    /* @__PURE__ */ jsx3("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
  ] });
}
function AvitoIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
    /* @__PURE__ */ jsx3("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
    /* @__PURE__ */ jsx3("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
    /* @__PURE__ */ jsx3("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
  ] });
}
function PlayIcon() {
  return /* @__PURE__ */ jsx3("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { d: "M7 4 L20 12 L7 20 Z" }) });
}
function PlatformLogo({ size = 48, p }) {
  return /* @__PURE__ */ jsx3("span", { style: {
    width: size,
    height: size,
    borderRadius: Math.round(size * 0.27),
    background: p.bg,
    color: p.fg || "#fff",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 800,
    fontSize: Math.round(size * 0.46),
    letterSpacing: "-0.04em",
    flex: "0 0 auto",
    boxShadow: "0 1px 0 rgba(0,0,0,0.04)"
  }, children: p.logo });
}
function PlatformCard({ p, mobile, featured }) {
  return /* @__PURE__ */ jsxs2("div", { className: "ss-card-lift", style: {
    display: "flex",
    alignItems: "center",
    gap: mobile ? 14 : 18,
    padding: mobile ? "16px 16px" : featured ? "22px 24px" : "18px 20px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx3(PlatformLogo, { size: featured ? mobile ? 52 : 60 : mobile ? 44 : 50, p }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx3("div", { style: {
        fontSize: featured ? mobile ? 17 : 19 : mobile ? 15.5 : 17,
        fontWeight: 700,
        color: VT.ink,
        letterSpacing: "-0.022em",
        lineHeight: 1.2
      }, children: p.name }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 4,
        fontFamily: VT.font.mono,
        fontSize: mobile ? 11 : 12,
        letterSpacing: "0.03em",
        color: VT.inkSoft
      }, children: [
        "\u0437\u0430\u0431\u0438\u0440\u0430\u0435\u043C: ",
        p.pull
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
      position: "absolute",
      right: -30,
      top: -30,
      width: 80,
      height: 80,
      borderRadius: "50%",
      background: p.bg,
      opacity: 0.07
    } })
  ] });
}
function PlatformSoonPill({ p, mobile }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px 10px 10px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 999
  }, children: [
    /* @__PURE__ */ jsx3("span", { style: {
      width: 24,
      height: 24,
      borderRadius: 7,
      background: p.bg,
      color: "#fff",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      fontSize: 11,
      letterSpacing: "-0.04em",
      flex: "0 0 auto"
    }, children: p.logo }),
    /* @__PURE__ */ jsx3("span", { style: { fontSize: 13.5, fontWeight: 500, color: VT.ink }, children: p.name }),
    /* @__PURE__ */ jsx3("span", { style: {
      fontFamily: VT.font.mono,
      fontSize: 10,
      letterSpacing: "0.1em",
      color: VT.inkFaint
    }, children: "\u0421\u041A\u041E\u0420\u041E" })
  ] });
}
function SectionTitle({ children, mobile, align = "center" }) {
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
function SectionSub({ children, mobile, align = "center" }) {
  return /* @__PURE__ */ jsx3("p", { style: {
    fontSize: mobile ? 16 : 19,
    lineHeight: 1.45,
    color: VT.inkSoft,
    margin: "14px auto 0",
    maxWidth: mobile ? "100%" : 680,
    textWrap: "pretty",
    textAlign: align
  }, children });
}
function HeroBlock({ mobile }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1100,
    margin: mobile ? "28px 0 0" : "52px auto 0",
    textAlign: mobile ? "left" : "center"
  }, children: [
    /* @__PURE__ */ jsxs2("h1", { style: {
      fontSize: mobile ? 38 : 88,
      lineHeight: mobile ? 1.08 : 1.02,
      fontWeight: 700,
      letterSpacing: "-0.035em",
      margin: 0,
      textWrap: "balance"
    }, children: [
      "\u0421\u0430\u0439\u0442, \u043A\u043E\u0442\u043E\u0440\u044B\u0439",
      mobile ? " " : /* @__PURE__ */ jsx3("br", {}),
      /* @__PURE__ */ jsxs2("span", { style: { position: "relative", display: "inline-block", whiteSpace: mobile ? "normal" : "nowrap", color: VT.accent, padding: "0 2px" }, children: [
        "\u0441\u0430\u043C \u0441\u0435\u0431\u044F \u0441\u043E\u0431\u0435\u0440\u0451\u0442,",
        /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", style: {
          position: "absolute",
          left: 4,
          right: 14,
          bottom: mobile ? 3 : 8,
          height: mobile ? 8 : 14,
          background: VT.accentSoft,
          opacity: 0.7,
          zIndex: -1,
          borderRadius: 3
        } })
      ] }),
      mobile ? " " : /* @__PURE__ */ jsx3("br", {}),
      /* @__PURE__ */ jsx3("span", { style: { display: "inline-block", whiteSpace: mobile ? "normal" : "nowrap", color: VT.accent, padding: "0 2px" }, children: "\u0441\u0430\u043C \u043E\u0431\u043D\u043E\u0432\u0438\u0442" }),
      " ",
      /* @__PURE__ */ jsx3("span", { style: { display: "inline-block", whiteSpace: mobile ? "normal" : "nowrap", color: VT.accent, padding: "0 2px" }, children: "\u0438 \u0441\u0430\u043C \u043F\u0440\u0438\u0432\u0435\u0434\u0451\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })
    ] }),
    /* @__PURE__ */ jsxs2("p", { style: {
      fontSize: mobile ? 17 : 20,
      lineHeight: 1.45,
      color: VT.inkSoft,
      margin: mobile ? "20px 0 0" : "32px auto 0",
      maxWidth: mobile ? "100%" : 760,
      textWrap: "pretty"
    }, children: [
      "\u041F\u043E\u043A\u0430\u0436\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u2014 \u043A\u0430\u0440\u0442\u044B, Telegram \u0438\u043B\u0438 \u0432\u0438\u0437\u0438\u0442\u043A\u0443. ",
      /* @__PURE__ */ jsxs2("b", { style: { color: VT.ink }, children: [
        BRAND.name,
        " \u043D\u0430\xA0\u0431\u0430\u0437\u0435 \u0418\u0418 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0437\u0430\xA02\xA0\u0447\u0430\u0441\u0430"
      ] }),
      " \u0438\xA0\u0434\u0430\u043B\u044C\u0448\u0435 ",
      /* @__PURE__ */ jsx3("b", { style: { color: VT.ink }, children: "\u0434\u0435\u043B\u0430\u0435\u0442 \u0432\u0441\u0451 \u0441\u0430\u043C" }),
      ": \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u0446\u0435\u043D\u044B, \u043B\u043E\u0432\u0438\u0442 \u0437\u0430\u044F\u0432\u043A\u0438, \u0432\u0435\u0434\u0451\u0442 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0443 \u0438\xA0\u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0435\u0442 \u043B\u0443\u0447\u0448\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B"
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "ss-hero-pill", style: {
      marginTop: mobile ? 24 : 36,
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
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, padding: mobile ? "12px 14px" : "0 18px" }, children: [
        /* @__PURE__ */ jsx3(IconLink, {}),
        /* @__PURE__ */ jsx3("span", { style: { color: VT.inkFaint, fontSize: mobile ? 16 : 17 }, children: "\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\xA0\u0432\u0430\u0448 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u0438\u043B\u0438\xA0\u0441\u0430\u0439\u0442" })
      ] }),
      /* @__PURE__ */ jsxs2(Btn, { style: { padding: mobile ? "14px 20px" : "14px 26px", borderRadius: mobile ? 10 : 999 }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), children: [
        "\u0421\u0434\u0435\u043B\u0430\u0442\u044C ",
        BRAND.name
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 14 : 18,
      display: "flex",
      flexDirection: "column",
      gap: 8,
      alignItems: mobile ? "flex-start" : "center"
    }, children: [
      /* @__PURE__ */ jsx3("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0418\u0417\xA0\u0427\u0415\u0413\u041E \u041C\u042B\xA0\u041C\u041E\u0416\u0415\u041C \u0421\u0414\u0415\u041B\u0410\u0422\u042C \u0412\u0410\u041C \u0421\u0410\u0419\u0422" }),
      /* @__PURE__ */ jsx3("div", { style: {
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: mobile ? "flex-start" : "center"
      }, children: PLATFORMS_OK.map((p) => /* @__PURE__ */ jsxs2("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 11px 5px 5px",
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontSize: 12.5,
        color: VT.ink,
        fontWeight: 500
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          width: 20,
          height: 20,
          borderRadius: 6,
          background: p.bg,
          color: p.fg || "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          flex: "0 0 auto"
        }, children: p.logo }),
        p.name
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 16 : 22,
      display: "flex",
      justifyContent: mobile ? "flex-start" : "center"
    }, children: /* @__PURE__ */ jsxs2("div", { style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 12,
      padding: mobile ? "10px 16px 10px 12px" : "12px 22px 12px 14px",
      background: VT.white,
      border: `1.5px solid ${VT.accent}`,
      borderRadius: 999,
      maxWidth: "100%",
      flexWrap: "nowrap"
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
        width: mobile ? 32 : 36,
        height: mobile ? 32 : 36,
        borderRadius: "50%",
        background: VT.accent,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto"
      }, children: /* @__PURE__ */ jsxs2("svg", { width: mobile ? 16 : 18, height: mobile ? 16 : 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsx3("path", { d: "M20 12 V22 H4 V12" }),
        /* @__PURE__ */ jsx3("rect", { x: "2", y: "7", width: "20", height: "5", rx: "1" }),
        /* @__PURE__ */ jsx3("path", { d: "M12 22 V7" }),
        /* @__PURE__ */ jsx3("path", { d: "M12 7 C 12 3.5, 7.5 3.5, 7.5 7 C 7.5 7, 9.5 7, 12 7 Z" }),
        /* @__PURE__ */ jsx3("path", { d: "M12 7 C 12 3.5, 16.5 3.5, 16.5 7 C 16.5 7, 14.5 7, 12 7 Z" })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          fontSize: mobile ? 15 : 16,
          fontWeight: 700,
          color: VT.ink,
          letterSpacing: "-0.01em",
          lineHeight: 1.1
        }, children: "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" }),
        /* @__PURE__ */ jsxs2("span", { style: {
          fontSize: mobile ? 12.5 : 13.5,
          color: VT.inkSoft,
          marginTop: 2,
          lineHeight: 1.3
        }, children: [
          "\u0434\u0430\u043B\u0435\u0435 ",
          /* @__PURE__ */ jsx3("b", { style: { color: VT.ink }, children: "990 \u20BD/\u043C\u0435\u0441" })
        ] })
      ] })
    ] }) })
  ] });
}
function ExamplesSection({ mobile }) {
  const U2 = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
  const examples = [
    {
      handle: "studia-anna",
      name: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B",
      category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
      city: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A",
      palette: "peach",
      tone: "peach",
      src: "Telegram-\u043A\u0430\u043D\u0430\u043B\u0430",
      logo: { letter: "\u0410", bg: "oklch(0.55 0.13 30)" },
      heroPhoto: U2("photo-1604654894610-df63bc536371"),
      heroFormula: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u2014 \u0431\u0435\u0437\xA0\u0431\u043E\u043B\u0438,\n\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438",
      rating: "4.9",
      reviewCount: 38,
      clientsCount: "1 200+",
      phone: "+7 (111) 111-11-11",
      services: [
        ["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", "1 500 \u20BD"],
        ["\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u0433\u0435\u043B\u044C-\u043B\u0430\u043A", "2 200 \u20BD"],
        ["\u041F\u0435\u0434\u0438\u043A\u044E\u0440", "2 800 \u20BD"],
        ["\u0414\u0438\u0437\u0430\u0439\u043D (\u0437\u0430\xA0\u043D\u043E\u0433\u043E\u0442\u044C)", "\u043E\u0442 150 \u20BD"]
      ],
      reviews: [
        { author: "\u041D\u0430\u0442\u0430\u043B\u044C\u044F \u041A.", text: "\u041E\u0447\u0435\u043D\u044C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0438\xA0\u0431\u0435\u0440\u0435\u0436\u043D\u043E, \u0444\u043E\u0440\u043C\u0430 \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438. \u0417\u0430\u043F\u0438\u0441\u044B\u0432\u0430\u044E\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u044E\u0434\u0430!", rating: 5 },
        { author: "\u041C\u0430\u0440\u0438\u044F \u041B.", text: "\u0427\u0438\u0441\u0442\u043E, \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E, \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u043E\u0432\u0440\u0435\u043C\u044F. \u041A\u043E\u0444\u0435 \u0442\u043E\u0436\u0435 \u0432\u043A\u0443\u0441\u043D\u044B\u0439 \u{1F642}", rating: 5 }
      ],
      gallery: [
        { src: U2("photo-1607779097040-26e80aa78e66", 300) },
        { src: U2("photo-1610992015732-2449b76344bc", 300) },
        { src: U2("photo-1632345031435-8727f6897d53", 300) },
        { src: U2("photo-1604902396830-aca29e19b067", 300) }
      ]
    },
    {
      handle: "brest-barber",
      name: "\u0411\u0430\u0440\u0431\u0435\u0440 Brest",
      category: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F",
      city: "\u0421\u0430\u043C\u0430\u0440\u0430",
      palette: "slate",
      tone: "slate",
      src: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442",
      logo: { letter: "B", bg: "oklch(0.32 0.04 250)" },
      heroPhoto: U2("photo-1503951914875-452162b0f3f1"),
      heroFormula: "\u0421\u0442\u0440\u0438\u0436\u043A\u0438 \u0437\u0430\xA0\u0447\u0430\u0441 \u2014\n\u043A\u0430\u043A \u0432\u044B \u043B\u044E\u0431\u0438\u0442\u0435",
      rating: "5.0",
      reviewCount: 47,
      clientsCount: "850+",
      phone: "+7 (111) 111-11-11",
      services: [
        ["\u0421\u0442\u0440\u0438\u0436\u043A\u0430 \u043C\u0430\u0448\u0438\u043D\u043A\u043E\u0439", "1 200 \u20BD"],
        ["\u041D\u043E\u0436\u043D\u0438\u0446\u044B + \u0443\u043A\u043B\u0430\u0434\u043A\u0430", "1 800 \u20BD"],
        ["\u0411\u043E\u0440\u043E\u0434\u0430", "900 \u20BD"],
        ["\u041F\u0430\u043F\u0430 + \u0441\u044B\u043D", "2 200 \u20BD"]
      ],
      reviews: [
        { author: "\u0410\u0440\u0442\u0451\u043C \u0412.", text: "\u0421\u0442\u0440\u0438\u0433\u0443\u0441\u044C \u0432\u0442\u043E\u0440\u043E\u0439 \u0433\u043E\u0434 \u2014 \u0414\u0438\u043C\u0430 \u0432\u0441\u0435\u0433\u0434\u0430 \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442, \u0447\u0435\u0433\u043E \u0445\u043E\u0447\u0435\u0442\u0441\u044F, \u0434\u0430\u0436\u0435 \u043A\u043E\u0433\u0434\u0430 \u0441\u0430\u043C \u043D\u0435\xA0\u0437\u043D\u0430\u044E.", rating: 5 },
        { author: "\u0418\u0432\u0430\u043D \u041F.", text: "\u0423\u0434\u043E\u0431\u043D\u0430\u044F \u0437\u0430\u043F\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 \u0441\u0430\u0439\u0442, \u043C\u0443\u0437\u044B\u043A\u0430 \u043D\u043E\u0440\u043C, \u043A\u043E\u0444\u0435 \u0436\u0434\u0451\u0442. \u0426\u0435\u043D\u0430 \u0430\u0434\u0435\u043A\u0432\u0430\u0442\u043D\u0430\u044F.", rating: 5 }
      ],
      gallery: [
        { src: U2("photo-1599351431202-1e0f0137899a", 300) },
        { src: U2("photo-1585747860715-2ba37e788b70", 300) },
        { src: U2("photo-1622286342621-4bd786c2447c", 300) },
        { src: U2("photo-1521490683312-b1aa64c1e0e2", 300) }
      ]
    },
    {
      handle: "lotos-yoga",
      name: "\u0428\u043A\u043E\u043B\u0430 \u0439\u043E\u0433\u0438 \u041B\u043E\u0442\u043E\u0441",
      category: "\u0425\u0430\u0442\u0445\u0430-\u0439\u043E\u0433\u0430",
      city: "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440",
      palette: "sage",
      tone: "sage",
      src: "\u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438",
      logo: { letter: "\u041B", bg: "oklch(0.45 0.11 145)" },
      heroPhoto: U2("photo-1545205597-3d9d02c29597"),
      heroFormula: "\u0425\u0430\u0442\u0445\u0430-\u0439\u043E\u0433\u0430 \u2014\n\u0434\u043B\u044F \u0442\u0435\u0445, \u0443\xA0\u043A\u043E\u0433\u043E \u0431\u043E\u043B\u0438\u0442 \u0441\u043F\u0438\u043D\u0430",
      rating: "4.8",
      reviewCount: 14,
      clientsCount: "320+",
      phone: "+7 (111) 111-11-11",
      services: [
        ["\u0423\u0442\u0440\u0435\u043D\u043D\u044F\u044F \u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \xB7 60\u043C", "700 \u20BD"],
        ["\u0413\u043B\u0443\u0431\u043E\u043A\u0430\u044F \xB7 90\u043C", "1 100 \u20BD"],
        ["\u041F\u0430\u0440\u043D\u0430\u044F \xB7 90\u043C", "1 600 \u20BD"],
        ["\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442 8 \u0437\u0430\u043D\u044F\u0442\u0438\u0439", "5 200 \u20BD"]
      ],
      reviews: [
        { author: "\u0410\u043D\u043D\u0430 \u0421.", text: "\u041F\u043E\u0441\u043B\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u0442\u0435\u043B\u043E \u0434\u0440\u0443\u0433\u043E\u0435 \u2014 \u0441\u043F\u0438\u043D\u0430 \u043D\u0430\u043A\u043E\u043D\u0435\u0446-\u0442\u043E \u0440\u0430\u0441\u0441\u043B\u0430\u0431\u0438\u043B\u0430\u0441\u044C. \u041E\u043B\u0435\u0433 \u043E\u0447\u0435\u043D\u044C \u0432\u043D\u0438\u043C\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439.", rating: 5 },
        { author: "\u0414\u0430\u0440\u044C\u044F \u041D.", text: "\u0410\u0442\u043C\u043E\u0441\u0444\u0435\u0440\u0430 \u0442\u0451\u043F\u043B\u0430\u044F, \u0431\u0435\u0437\xA0\u044D\u0437\u043E\u0442\u0435\u0440\u0438\u043A\u0438. \u0413\u0440\u0443\u043F\u043F\u044B \u043C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435, \u0432\u0441\u0451 \u0432\u0438\u0434\u043D\u043E.", rating: 5 }
      ],
      gallery: [
        { src: U2("photo-1575052814086-f385e2e2ad1b", 300) },
        { src: U2("photo-1599901860904-17e6ed7083a0", 300) },
        { src: U2("photo-1506126613408-eca07ce68773", 300) },
        { src: U2("photo-1532798442725-41036acc7489", 300) }
      ]
    }
  ];
  const CardWithCaption = ({ ex, isCarousel = false }) => /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    ...isCarousel ? { flex: "0 0 86%", scrollSnapAlign: "start" } : {}
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 14
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        background: VT.accent,
        flex: "0 0 auto"
      } }),
      /* @__PURE__ */ jsxs2("span", { style: {
        fontSize: mobile ? 14.5 : 16,
        fontWeight: 600,
        color: VT.ink,
        letterSpacing: "-0.015em"
      }, children: [
        "\u0421\u043E\u0431\u0440\u0430\u043D \u0438\u0437 ",
        ex.src
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { flex: 1, minHeight: 0, display: "flex" }, children: /* @__PURE__ */ jsx3(SiteCard, { ...ex, mobile }) })
  ] }, ex.name);
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 60 : 96, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
        "\u0412\u043E\u0442 \u043A\u0430\u043A\u043E\u0439 \u0441\u0430\u0439\u0442 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0447\u0435\u0440\u0435\u0437 \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043C\u0438\u043D\u0443\u0442"
      ] }),
      /* @__PURE__ */ jsxs2(SectionSub, { mobile, children: [
        "\u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 ",
        BRAND.name,
        " \u0441\u043E\u0431\u0440\u0430\u043B \u0438\u0437\xA0\u0440\u0430\u0437\u043D\u044B\u0445 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u043E\u0432 \u2014 \u0441\xA0\u0432\u0430\u0448\u0438\u043C\u0438 \u0444\u043E\u0442\u043E, \u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438 \u0438\xA0\u043B\u0443\u0447\u0448\u0438\u043C\u0438 \u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438"
      ] })
    ] }),
    mobile ? /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 28,
      marginLeft: -20,
      marginRight: -20,
      overflowX: "auto",
      overflowY: "visible",
      WebkitOverflowScrolling: "touch",
      scrollSnapType: "x mandatory",
      scrollPaddingLeft: 20,
      scrollbarWidth: "none"
    }, children: [
      /* @__PURE__ */ jsx3("style", { children: `.ss-carousel::-webkit-scrollbar { display: none; }` }),
      /* @__PURE__ */ jsxs2("div", { className: "ss-carousel", style: {
        display: "flex",
        gap: 14,
        padding: "0 20px 24px",
        alignItems: "flex-start"
      }, children: [
        examples.map((ex) => /* @__PURE__ */ jsx3(CardWithCaption, { ex, isCarousel: true }, ex.name)),
        /* @__PURE__ */ jsx3("div", { style: { flex: "0 0 6px" }, "aria-hidden": "true" })
      ] })
    ] }) : /* @__PURE__ */ jsx3("div", { style: {
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridAutoRows: "1fr",
      gap: 24,
      maxWidth: 1280,
      margin: "48px auto 0",
      alignItems: "stretch"
    }, children: examples.map((ex) => /* @__PURE__ */ jsx3(CardWithCaption, { ex }, ex.name)) }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 44,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }, children: /* @__PURE__ */ jsxs2("a", { href: "#hero", style: {
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
      boxShadow: "0 12px 28px -12px rgba(120,60,30,0.45)",
      letterSpacing: "-0.005em"
    }, children: [
      "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0435\u0431\u0435 \u0442\u0430\u043A\u043E\u0439 ",
      BRAND.name,
      " ",
      /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2192" })
    ] }) })
  ] });
}
var STEP_PALETTES = [
  { bg: "oklch(0.95 0.05 40)", ink: "oklch(0.32 0.14 35)", dec: "oklch(0.86 0.10 40)" },
  // peach
  { bg: "oklch(0.94 0.06 95)", ink: "oklch(0.36 0.12 85)", dec: "oklch(0.84 0.12 90)" },
  // butter
  { bg: "oklch(0.94 0.05 200)", ink: "oklch(0.34 0.10 220)", dec: "oklch(0.82 0.08 210)" },
  // sky
  { bg: "oklch(0.94 0.05 145)", ink: "oklch(0.32 0.11 145)", dec: "oklch(0.82 0.08 145)" },
  // sage
  { bg: "oklch(0.94 0.06 25)", ink: "oklch(0.36 0.13 22)", dec: "oklch(0.82 0.10 22)" },
  // rose
  { bg: "oklch(0.94 0.05 285)", ink: "oklch(0.34 0.10 285)", dec: "oklch(0.82 0.08 285)" }
  // lavender
];
function StepGlyph({ palette, kind, size }) {
  const stroke = palette.ink;
  const fill = palette.dec;
  const sz = size * 0.62;
  const wrap = (kids) => /* @__PURE__ */ jsx3("div", { style: {
    width: size,
    height: size,
    borderRadius: "50%",
    background: "#fff",
    border: `2px solid ${palette.ink}`,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    color: palette.ink,
    boxShadow: `4px 4px 0 0 ${palette.ink}`
  }, children: kids });
  switch (kind) {
    case "link":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx3("path", { d: "M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3" }),
          /* @__PURE__ */ jsx3("path", { d: "M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3" })
        ] })
      );
    case "ai":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "currentColor", children: [
          /* @__PURE__ */ jsx3("path", { d: "M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z" }),
          /* @__PURE__ */ jsx3("circle", { cx: "50", cy: "50", r: "3.5" }),
          /* @__PURE__ */ jsx3("circle", { cx: "15", cy: "48", r: "2.5" })
        ] })
      );
    case "globe":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("circle", { cx: "32", cy: "32", r: "22" }),
          /* @__PURE__ */ jsx3("ellipse", { cx: "32", cy: "32", rx: "10", ry: "22" }),
          /* @__PURE__ */ jsx3("path", { d: "M10 32h44" })
        ] })
      );
    case "refresh":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx3("path", { d: "M14 32 a18 18 0 0 1 30 -13" }),
          /* @__PURE__ */ jsx3("path", { d: "M44 12 L44 22 L34 22" }),
          /* @__PURE__ */ jsx3("path", { d: "M50 32 a18 18 0 0 1 -30 13" }),
          /* @__PURE__ */ jsx3("path", { d: "M20 52 L20 42 L30 42" })
        ] })
      );
    case "inbox":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("rect", { x: "10", y: "14", width: "44", height: "36", rx: "5" }),
          /* @__PURE__ */ jsx3("path", { d: "M10 34 L22 34 L26 40 L38 40 L42 34 L54 34" })
        ] })
      );
    case "chart":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx3("path", { d: "M10 48 L24 30 L34 38 L54 14" }),
          /* @__PURE__ */ jsx3("path", { d: "M44 14 L54 14 L54 24" })
        ] })
      );
  }
}
function StepDecor({ palette, side }) {
  const dot = (style) => /* @__PURE__ */ jsx3("span", { style: {
    position: "absolute",
    borderRadius: "50%",
    background: palette.dec,
    ...style
  } });
  const ring = (style) => /* @__PURE__ */ jsx3("span", { style: {
    position: "absolute",
    borderRadius: "50%",
    border: `2.5px solid ${palette.ink}`,
    ...style
  } });
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    dot({ width: 16, height: 16, top: -8, right: 24, opacity: 0.9 }),
    ring({ width: 22, height: 22, bottom: -10, left: 30 }),
    dot({ width: 10, height: 10, top: 40, right: -6, opacity: 0.7 }),
    /* @__PURE__ */ jsx3("svg", { width: "20", height: "20", viewBox: "0 0 20 20", style: { position: "absolute", top: -10, left: side === "left" ? 60 : "auto", right: side === "right" ? 60 : "auto" }, children: /* @__PURE__ */ jsx3("path", { d: "M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z", fill: palette.dec, stroke: palette.ink, strokeWidth: "1.2", strokeLinejoin: "round" }) })
  ] });
}
function StoryStepColorful({ idx, total, title, body, kind, mobile, palette }) {
  const side = idx % 2 === 0 ? "right" : "left";
  const glyphSize = mobile ? 84 : 108;
  const last = idx === total - 1;
  return /* @__PURE__ */ jsxs2("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxs2("div", { className: "ss-story-card", style: {
      background: palette.bg,
      border: `2px solid ${palette.ink}`,
      borderRadius: 22,
      padding: mobile ? "22px 20px" : "32px 36px",
      display: "flex",
      flexDirection: mobile ? "row" : side === "left" ? "row" : "row-reverse",
      gap: mobile ? 18 : 32,
      alignItems: "center",
      position: "relative",
      boxShadow: `6px 6px 0 0 ${palette.ink}`,
      maxWidth: mobile ? "100%" : 760,
      marginLeft: mobile ? 0 : side === "left" ? 0 : "auto",
      marginRight: mobile ? 0 : side === "left" ? "auto" : 0
    }, children: [
      /* @__PURE__ */ jsx3(StepDecor, { palette, side }),
      /* @__PURE__ */ jsxs2("div", { style: { position: "relative", flex: "0 0 auto" }, children: [
        /* @__PURE__ */ jsx3(StepGlyph, { palette, kind, size: glyphSize }),
        /* @__PURE__ */ jsxs2("div", { style: {
          position: "absolute",
          top: -10,
          left: -14,
          transform: "rotate(-12deg)",
          background: palette.ink,
          color: "#fff",
          fontFamily: VT.font.mono,
          fontSize: 12,
          fontWeight: 600,
          padding: "4px 10px",
          borderRadius: 999,
          letterSpacing: "0.08em",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
        }, children: [
          "\u0428\u0410\u0413 ",
          idx + 1
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0, textAlign: "left" }, children: [
        /* @__PURE__ */ jsx3("h3", { style: {
          fontSize: mobile ? 19 : 24,
          fontWeight: 700,
          letterSpacing: "-0.022em",
          margin: 0,
          lineHeight: 1.15,
          color: palette.ink
        }, children: title }),
        /* @__PURE__ */ jsx3("p", { style: {
          fontSize: mobile ? 14.5 : 16,
          lineHeight: 1.5,
          color: "oklch(0.32 0.02 60)",
          margin: "8px 0 0",
          textWrap: "pretty"
        }, children: body })
      ] })
    ] }),
    !last && /* @__PURE__ */ jsx3("div", { style: {
      position: "relative",
      height: mobile ? 36 : 56,
      display: "flex",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsxs2(
      "svg",
      {
        viewBox: "0 0 80 60",
        preserveAspectRatio: "none",
        width: mobile ? 50 : 70,
        height: "100%",
        style: { overflow: "visible" },
        children: [
          /* @__PURE__ */ jsx3(
            "path",
            {
              d: "M40 0 C 20 20, 60 40, 40 60",
              fill: "none",
              stroke: palette.ink,
              strokeWidth: "3",
              strokeLinecap: "round",
              strokeDasharray: "2 8"
            }
          ),
          /* @__PURE__ */ jsx3(
            "path",
            {
              d: "M34 52 L40 60 L46 52",
              fill: "none",
              stroke: palette.ink,
              strokeWidth: "3",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        ]
      }
    ) })
  ] });
}
function StorySection({ mobile }) {
  const steps = [
    {
      kind: "link",
      title: "\u0414\u0430\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
      body: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445, \u0432\u0430\u0448 Telegram-\u043A\u0430\u043D\u0430\u043B, \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u043D\u0430 Avito \u0438\u043B\u0438\xA0\u043F\u0440\u043E\u0441\u0442\u043E \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438. \u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0432\u0441\u0451, \u0447\u0442\u043E\xA0\u0443\xA0\u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C."
    },
    {
      kind: "ai",
      title: "\u0418\u0418 \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u043F\u0440\u043E\u0434\u0430\u044E\u0449\u0438\u0439 \u0441\u0430\u0439\u0442",
      body: "\u041D\u0430\u0439\u0434\u0451\u0442 \u0443\u0441\u043B\u0443\u0433\u0438, \u0446\u0435\u043D\u044B, \u043E\u0442\u0437\u044B\u0432\u044B \u0438\xA0\u0444\u043E\u0442\u043E. \u0421\u0430\u043C \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0442\u0435\u043A\u0441\u0442\u044B, \u043F\u043E\u0434\u0431\u0435\u0440\u0451\u0442 \u0446\u0432\u0435\u0442\u0430 \u0438\xA0\u0441\u043B\u043E\u0436\u0438\u0442 \u0432\xA0\u043A\u0440\u0430\u0441\u0438\u0432\u0443\u044E \u0433\u0430\u043B\u0435\u0440\u0435\u044E. \u0417\u0430 \u043F\u0430\u0440\u0443 \u043C\u0438\u043D\u0443\u0442."
    },
    {
      kind: "globe",
      title: "\u0421\u0430\u0439\u0442 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u043D\u0430\xA0\u0441\u0432\u043E\u0451\u043C \u0430\u0434\u0440\u0435\u0441\u0435",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u041D\u0430 ",
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: mobile ? 14 : 15, color: VT.ink }, children: `<\u0432\u0430\u0448-\u0441\u0430\u0439\u0442>.${BRAND.domain}` }),
        " \u0438\u043B\u0438\xA0\u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u0441\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D. \u0417\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u044B\u0439 https, \u0438\u043D\u0434\u0435\u043A\u0441\u0430\u0446\u0438\u044F \u0432\xA0\u042F\u043D\u0434\u0435\u043A\u0441\u0435 \u0438 Google \u2014 \u0438\u0437\xA0\u043A\u043E\u0440\u043E\u0431\u043A\u0438."
      ] })
    },
    {
      kind: "refresh",
      title: "\u0421\u0430\u043C \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u2014 \u0438\u043B\u0438\xA0\u0432\u044B \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442\u0435",
      body: "\u0420\u0430\u0437 \u0432\xA0\u043D\u0435\u0434\u0435\u043B\u044E \u0437\u0430\u0431\u0438\u0440\u0430\u0435\u0442 \u0441\u0432\u0435\u0436\u0438\u0435 \u043F\u043E\u0441\u0442\u044B \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u0410 \u0435\u0441\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u0438\u043B\u0438 \u043D\u043E\u0432\u0443\u044E \u0443\u0441\u043B\u0443\u0433\u0443 \u2014 \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0438\xA0\u0442\u0435\u043A\u0441\u0442 \u0432\xA0\u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435, \u0441\u0430\u0439\u0442 \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0441\u044F."
    },
    {
      kind: "inbox",
      title: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043B\u0435\u0442\u044F\u0442 \u043A\xA0\u0432\u0430\u043C \u0432\xA0\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440",
      body: "\u041A\u043B\u0438\u0435\u043D\u0442 \u0436\u043C\u0451\u0442 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u2014 \u0432\u0430\u043C \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u0432 Telegram, MAX \u0438\u043B\u0438\xA0\u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443. \u041D\u0438\u043A\u0430\u043A\u043E\u0433\u043E CRM \u2014 \u0432\u0441\u0451 \u0442\u0430\u043C, \u0433\u0434\u0435 \u0432\u044B \u0438\xA0\u0442\u0430\u043A \u0447\u0438\u0442\u0430\u0435\u0442\u0435."
    },
    {
      kind: "chart",
      title: "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438\xA0\u043F\u043E\u043B\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C",
      body: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043B\u044E\u0434\u0435\u0439 \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u0438\xA0\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A. \u0412 \u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C, \u043F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443 \u0438\u043B\u0438\xA0\u0443\u0434\u0430\u043B\u0438\u0442\u044C \u0441\u0430\u0439\u0442 \u2014 \u0432\xA0\u043E\u0434\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u0435."
    }
  ];
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 64 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsx3("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
      "\u041E\u0442 \u0432\u0430\u0441 \u2014 \u043E\u0434\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435,",
      /* @__PURE__ */ jsx3("br", {}),
      "\u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 ",
      BRAND.name,
      " \u0441\u0434\u0435\u043B\u0430\u0435\u0442 \u0441\u0430\u043C"
    ] }) }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 32 : 56,
      maxWidth: mobile ? "100%" : 960,
      margin: `${mobile ? 32 : 56}px auto 0`,
      display: "flex",
      flexDirection: "column"
    }, children: steps.map((s, i) => /* @__PURE__ */ jsx3(
      StoryStepColorful,
      {
        idx: i,
        total: steps.length,
        kind: s.kind,
        title: s.title,
        body: s.body,
        mobile,
        palette: STEP_PALETTES[i % STEP_PALETTES.length]
      },
      s.title
    )) })
  ] });
}
function PlatformsSection({ mobile }) {
  const [featured, ...rest] = PLATFORMS_OK;
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 64 : 110, position: "relative", zIndex: 1 }, id: "sources", children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
        "\u0427\u0442\u043E \u043F\u043E\u0434\u043E\u0439\u0434\u0451\u0442",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0434\u043B\u044F\xA0\u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F ",
        BRAND.name,
        "\u0430"
      ] }),
      /* @__PURE__ */ jsx3(SectionSub, { mobile, children: "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u043B\u044E\u0431\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430, \u0433\u0434\u0435 \u043F\u0440\u043E \u0432\u0430\u0441 \u0443\u0436\u0435 \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u0438\u043B\u0438\xA0\u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 28 : 56,
      maxWidth: mobile ? "100%" : 1080,
      margin: `${mobile ? 28 : 56}px auto 0`
    }, children: [
      /* @__PURE__ */ jsx3(PlatformCard, { p: featured, featured: true, mobile }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: mobile ? 10 : 14,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
        gap: mobile ? 10 : 14
      }, children: rest.slice(0, 3).map((p) => /* @__PURE__ */ jsx3(PlatformCard, { p, mobile }, p.id)) }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: mobile ? 10 : 14,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
        gap: mobile ? 10 : 14
      }, children: rest.slice(3).map((p) => /* @__PURE__ */ jsx3(PlatformCard, { p, mobile }, p.id)) }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: mobile ? 28 : 36,
        padding: mobile ? "20px 18px" : "22px 24px",
        background: VT.bgSoft,
        border: `1px dashed ${VT.line}`,
        borderRadius: 18
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: {
          display: "flex",
          alignItems: mobile ? "flex-start" : "center",
          justifyContent: "space-between",
          gap: 16,
          flexDirection: mobile ? "column" : "row",
          flexWrap: "wrap"
        }, children: [
          /* @__PURE__ */ jsx3("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            color: VT.inkSoft,
            fontWeight: 600
          }, children: "\u0421\u041A\u041E\u0420\u041E \u041F\u041E\u0414\u041A\u041B\u042E\u0427\u0418\u041C" }),
          /* @__PURE__ */ jsx3("a", { style: {
            fontSize: 13,
            color: VT.accent,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            cursor: "pointer"
          }, children: "\u041D\u0435\u0442 \u0432\u0430\u0448\u0435\u0439? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u2192" })
        ] }),
        /* @__PURE__ */ jsx3("div", { style: {
          marginTop: 14,
          display: "flex",
          flexWrap: "wrap",
          gap: 8
        }, children: PLATFORMS_SOON.map((p) => /* @__PURE__ */ jsx3(PlatformSoonPill, { p, mobile }, p.id)) })
      ] })
    ] })
  ] });
}
function FeatureGlyph({ kind, size = 44, tint }) {
  const color = tint?.fg || VT.accentInk;
  const bg = tint?.bg || VT.accentSoft;
  const wrap = (kids) => /* @__PURE__ */ jsx3("div", { style: {
    width: size,
    height: size,
    borderRadius: 14,
    background: bg,
    color,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "0 0 auto"
  }, children: kids });
  const s = size * 0.6;
  switch (kind) {
    case "sparkles":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "currentColor", children: [
          /* @__PURE__ */ jsx3("path", { d: "M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" }),
          /* @__PURE__ */ jsx3("circle", { cx: "19", cy: "19", r: "1.6" }),
          /* @__PURE__ */ jsx3("circle", { cx: "5", cy: "17", r: "1.2" })
        ] })
      );
    case "refresh":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx3("path", { d: "M3 12 a9 9 0 0 1 15 -6.5" }),
          /* @__PURE__ */ jsx3("path", { d: "M18 3 v4 h-4" }),
          /* @__PURE__ */ jsx3("path", { d: "M21 12 a9 9 0 0 1 -15 6.5" }),
          /* @__PURE__ */ jsx3("path", { d: "M6 21 v-4 h4" })
        ] })
      );
    case "star":
      return wrap(
        /* @__PURE__ */ jsx3("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "currentColor", children: /* @__PURE__ */ jsx3("path", { d: "M12 2 L14.6 8.6 L21.6 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.4 9.3 L9.4 8.6 Z" }) })
      );
    case "inbox":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
          /* @__PURE__ */ jsx3("path", { d: "M3 14 h5 l1.5 2 h5 L16 14 h5" })
        ] })
      );
    case "bar":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("path", { d: "M4 20 V12" }),
          /* @__PURE__ */ jsx3("path", { d: "M10 20 V6" }),
          /* @__PURE__ */ jsx3("path", { d: "M16 20 V14" }),
          /* @__PURE__ */ jsx3("path", { d: "M22 20 V9" })
        ] })
      );
    case "search":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("circle", { cx: "11", cy: "11", r: "6.5" }),
          /* @__PURE__ */ jsx3("path", { d: "M16 16 L21 21" })
        ] })
      );
    case "phone":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("rect", { x: "6", y: "2.5", width: "12", height: "19", rx: "2.5" }),
          /* @__PURE__ */ jsx3("path", { d: "M11 18.5 h2" })
        ] })
      );
    case "shield":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx3("path", { d: "M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z" }),
          /* @__PURE__ */ jsx3("path", { d: "M8.5 12 L11 14.5 L15.5 9.5" })
        ] })
      );
  }
}
function FeatureCard({ heading, subtitle, body, kind, mobile, tint, idx }) {
  return /* @__PURE__ */ jsxs2("div", { className: "ss-card-lift", style: {
    background: tint?.cardBg || VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 22,
    padding: mobile ? 22 : 28,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    height: "100%",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs2("span", { "aria-hidden": "true", style: {
      position: "absolute",
      top: -14,
      right: -4,
      fontFamily: VT.font.mono,
      fontSize: 96,
      fontWeight: 800,
      color: tint?.fg,
      opacity: 0.22,
      letterSpacing: "-0.06em",
      lineHeight: 1,
      pointerEvents: "none",
      zIndex: 0
    }, children: [
      "0",
      idx + 1
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsx3(FeatureGlyph, { kind, size: mobile ? 56 : 64, tint }) }),
    /* @__PURE__ */ jsx3("h3", { style: {
      fontSize: mobile ? 24 : 28,
      fontWeight: 800,
      letterSpacing: "-0.032em",
      margin: "6px 0 0",
      lineHeight: 1.05,
      color: VT.ink,
      position: "relative",
      zIndex: 1
    }, children: heading }),
    /* @__PURE__ */ jsx3("div", { style: {
      fontSize: mobile ? 14.5 : 15.5,
      fontWeight: 700,
      color: tint?.fg || VT.accent,
      lineHeight: 1.35,
      letterSpacing: "-0.005em",
      position: "relative",
      zIndex: 1
    }, children: subtitle }),
    /* @__PURE__ */ jsx3("p", { style: {
      fontSize: mobile ? 14 : 14.5,
      lineHeight: 1.55,
      color: VT.inkSoft,
      margin: 0,
      textWrap: "pretty",
      position: "relative",
      zIndex: 1
    }, children: body })
  ] });
}
var FEATURE_TINTS = {
  sparkles: { bg: "oklch(0.93 0.05 40)", fg: "oklch(0.42 0.14 35)", cardBg: VT.white },
  refresh: { bg: "oklch(0.93 0.06 95)", fg: "oklch(0.42 0.12 80)", cardBg: VT.bgSoft },
  star: { bg: "oklch(0.93 0.05 60)", fg: "oklch(0.45 0.13 55)", cardBg: VT.white },
  inbox: { bg: "oklch(0.93 0.05 200)", fg: "oklch(0.36 0.10 220)", cardBg: VT.bgSoft },
  bar: { bg: "oklch(0.93 0.05 145)", fg: "oklch(0.35 0.11 145)", cardBg: VT.bgSoft },
  search: { bg: "oklch(0.92 0.05 285)", fg: "oklch(0.38 0.11 285)", cardBg: VT.white },
  phone: { bg: "oklch(0.92 0.05 25)", fg: "oklch(0.40 0.13 22)", cardBg: VT.white },
  shield: { bg: "oklch(0.92 0.06 145)", fg: "oklch(0.35 0.11 145)", cardBg: VT.bgSoft }
};
function BigFeaturesSection({ mobile }) {
  const features = [
    {
      kind: "sparkles",
      heading: "\u0421\u0430\u043C \u0441\u043E\u0431\u0435\u0440\u0451\u0442\u0441\u044F",
      subtitle: "\u0414\u0430\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0437\u0430\xA02\xA0\u0447\u0430\u0441\u0430",
      body: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0414\u0430\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram-\u043A\u0430\u043D\u0430\u043B \u0438\u043B\u0438\xA0\u043F\u0440\u043E\u0441\u0442\u043E \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u2014 ",
        BRAND.name,
        " \u0437\u0430\xA02\xA0\u0447\u0430\u0441\u0430 \u043D\u0430\u0439\u0434\u0451\u0442 \u0443\u0441\u043B\u0443\u0433\u0438, \u0446\u0435\u043D\u044B, \u043E\u0442\u0437\u044B\u0432\u044B \u0438\xA0\u0444\u043E\u0442\u043E. \u0421\u0430\u043C \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0442\u0435\u043A\u0441\u0442\u044B \u0438\xA0\u043F\u043E\u0434\u0431\u0435\u0440\u0451\u0442 \u043E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435."
      ] })
    },
    {
      kind: "refresh",
      heading: "\u0421\u0430\u043C \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0441\u044F",
      subtitle: "\u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0441\u0432\u0435\u0436\u0438\u0435 \u043F\u043E\u0441\u0442\u044B, \u0444\u043E\u0442\u043E \u0438\xA0\u0446\u0435\u043D\u044B",
      body: "\u0417\u0430\u0431\u0438\u0440\u0430\u0435\u0442 \u0441\u0432\u0435\u0436\u0438\u0435 \u043F\u043E\u0441\u0442\u044B, \u043D\u043E\u0432\u044B\u0435 \u0446\u0435\u043D\u044B \u0438\xA0\u0444\u043E\u0442\u043E \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430. \u041F\u043E\u043C\u0435\u043D\u044F\u043B\u0438 \u043F\u0440\u0430\u0439\u0441 \u0432\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445 \u2014 \u043D\u0430\xA0\u0441\u0430\u0439\u0442\u0435 \u0443\u0436\u0435 \u043D\u043E\u0432\u044B\u0439."
    },
    {
      kind: "star",
      heading: "\u0421\u0430\u043C \u043E\u0442\u0431\u0435\u0440\u0451\u0442 \u043E\u0442\u0437\u044B\u0432\u044B",
      subtitle: "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043B\u0443\u0447\u0448\u0438\u0435",
      body: "\u041F\u0440\u043E\u0447\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432, \u043E\u0442\u0441\u0435\u0435\u0442 \xAB\u043D\u043E\u0440\u043C\xBB, \u0442\u0440\u043E\u0439\u043A\u0438 \u0438\xA0\u0442\u0440\u043E\u043B\u043B\u0435\u0439. \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442 \u043D\u0430\xA0\u0441\u0430\u0439\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445. \u041F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442."
    },
    {
      kind: "inbox",
      heading: "\u0421\u0430\u043C \u043F\u043E\u0439\u043C\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0443",
      subtitle: "\u0412 Telegram, MAX \u0438\u043B\u0438\xA0\u043F\u043E\u0447\u0442\u0443",
      body: "\u041A\u043B\u0438\u0435\u043D\u0442 \u0436\u043C\u0451\u0442 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u2014 \u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u0435 \u043F\u0430\u0434\u0430\u0435\u0442 \u0432 Telegram, MAX \u0438\u043B\u0438\xA0\u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443. \u0411\u0435\u0437 CRM, \u0431\u0435\u0437\xA0\u043B\u0438\u0447\u043D\u044B\u0445 \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u043E\u0432, \u0431\u0435\u0437\xA0\u0437\u0430\u0431\u044B\u0442\u044B\u0445 \u0437\u0430\u044F\u0432\u043E\u043A."
    },
    {
      kind: "bar",
      heading: "\u0421\u0430\u043C \u043F\u043E\u0441\u0447\u0438\u0442\u0430\u0435\u0442",
      subtitle: "\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F \u0441\u0432\u043E\u0434\u043A\u0430 \u0440\u0430\u0437 \u0432\xA0\u043D\u0435\u0434\u0435\u043B\u044E",
      body: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043B\u044E\u0434\u0435\u0439 \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A. \u0411\u0435\u0437 \u0433\u0440\u0430\u0444\u0438\u043A\u043E\u0432 \u2014 \u043D\u0430\xA0\u0447\u0435\u043B\u043E\u0432\u0435\u0447\u0435\u0441\u043A\u043E\u043C \u044F\u0437\u044B\u043A\u0435."
    },
    {
      kind: "search",
      heading: "\u0421\u0430\u043C \u043F\u043E\u043F\u0430\u0434\u0451\u0442 \u0432\xA0\u043F\u043E\u0438\u0441\u043A",
      subtitle: "\u041A\u043B\u0438\u0435\u043D\u0442\u044B \u043D\u0430\u0439\u0434\u0443\u0442 \u0432\u0430\u0441 \u0432\xA0\u042F\u043D\u0434\u0435\u043A\u0441\u0435 \u0438 Google",
      body: "\u0421\u0440\u0430\u0437\u0443 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\u044B \u0438\u043D\u0434\u0435\u043A\u0441\u0430\u0446\u0438\u044F \u0432\xA0\u042F\u043D\u0434\u0435\u043A\u0441\u0435 \u0438 Google, \u0437\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u044B\u0439 https, \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u0434\u043B\u044F\xA0\u043A\u0430\u0440\u0442 \u0438\xA0\u043F\u043E\u0438\u0441\u043A\u043E\u0432\u0438\u043A\u043E\u0432. \u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0442\u044C \u043D\u0435\xA0\u043D\u0443\u0436\u043D\u043E."
    },
    {
      kind: "phone",
      heading: "\u0421\u0430\u043C \u043F\u043E\u0434\u0441\u0442\u0440\u043E\u0438\u0442\u0441\u044F \u043F\u043E\u0434 \u0442\u0435\u043B\u0435\u0444\u043E\u043D",
      subtitle: "80% \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u0437\u0430\u0439\u0434\u0443\u0442 \u0441\xA0\u043C\u043E\u0431\u0438\u043B\u044C\u043D\u043E\u0433\u043E",
      body: `${BRAND.name} \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442\u0441\u044F \u0442\u0430\u043A, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\xA0\u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435 \u0432\u0441\u0451 \u0431\u044B\u043B\u043E \u0443\u0434\u043E\u0431\u043D\u043E. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u043C\u043E\u0431\u0438\u043B\u044C\u043D\u044B\u0445 \u0432\u0435\u0440\u0441\u0438\u0439.`
    },
    {
      kind: "shield",
      heading: "\u0421\u0430\u043C \u0437\u0430\u0449\u0438\u0442\u0438\u0442\u0441\u044F \u043E\u0442\xA0\u0441\u043F\u0430\u043C\u0430",
      subtitle: "\u0422\u043E\u043B\u044C\u043A\u043E \u0436\u0438\u0432\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u2014 \u0431\u0435\u0437\xA0\u0431\u043E\u0442\u043E\u0432",
      body: "\u0424\u043E\u0440\u043C\u0430 \u0441\xA0\u0430\u043D\u0442\u0438\u0431\u043E\u0442-\u043F\u0440\u043E\u0432\u0435\u0440\u043A\u043E\u0439, \u043A\u043E\u0442\u043E\u0440\u0443\u044E \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0438\u0439 \u043A\u043B\u0438\u0435\u043D\u0442 \u0434\u0430\u0436\u0435 \u043D\u0435\xA0\u0437\u0430\u043C\u0435\u0447\u0430\u0435\u0442. \u0411\u043E\u0442\u044B \u043F\u043E\u043B\u0443\u0447\u0430\u044E\u0442 \u0442\u0438\u0448\u0438\u043D\u0443, \u0432\u0430\u043C \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u044F\u0432\u043A\u0438 \u043E\u0442\xA0\u043B\u044E\u0434\u0435\u0439."
    }
  ];
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 64 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center", maxWidth: mobile ? "100%" : 800, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
        "\u0412\u043E\u0441\u0435\u043C\u044C \xAB\u0441\u0430\u043C\xBB \u2014",
        /* @__PURE__ */ jsx3("br", {}),
        "\u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043E\u043D ",
        BRAND.name
      ] }),
      /* @__PURE__ */ jsxs2(SectionSub, { mobile, children: [
        BRAND.name,
        " \u2014 \u044D\u0442\u043E \u043D\u0435\xA0\u043E\u0434\u0438\u043D \u0442\u0440\u044E\u043A, \u0430\xA0\u0432\u043E\u0441\u0435\u043C\u044C \u0432\u0435\u0449\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u043D \u0434\u0435\u043B\u0430\u0435\u0442 \u0441\u0430\u043C \u2014 \u043E\u0442\xA0\u043F\u0435\u0440\u0432\u043E\u0433\u043E \xAB\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u043C\xBB \u0434\u043E\xA0\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438"
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 56,
      maxWidth: mobile ? "100%" : 1240,
      margin: `${mobile ? 28 : 56}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)",
      gap: mobile ? 14 : 18
    }, children: features.map((f, i) => /* @__PURE__ */ jsx3(FeatureCard, { ...f, idx: i, mobile, tint: FEATURE_TINTS[f.kind] }, f.heading)) })
  ] });
}
function ControlPanelMock({ mobile }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 18,
    overflow: "hidden",
    boxShadow: "0 24px 48px -24px rgba(120,60,30,0.25)"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      padding: "10px 14px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.74 0.13 25)" } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.82 0.13 85)" } }),
      /* @__PURE__ */ jsx3("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.78 0.13 145)" } }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
        "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u2014 ",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: mobile ? 18 : 22 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          width: 44,
          height: 44,
          borderRadius: 12,
          background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 8px, ${VT.bgSoft} 8px 16px)`,
          border: `1px solid ${VT.line}`
        } }),
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { fontSize: 14.5, fontWeight: 700, color: VT.ink, letterSpacing: "-0.01em" }, children: [
            "\u0441\u0442\u0443\u0434\u0438\u044F-\u0430\u043D\u043D\u044B.",
            BRAND.domain
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: {
            fontSize: 12,
            color: VT.success,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginTop: 2
          }, children: [
            /* @__PURE__ */ jsx3("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.success } }),
            "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432 14:02"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 10
      }, children: [
        { num: "347", lbl: "\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439", tone: "ink" },
        { num: "14", lbl: "\u0437\u0430\u044F\u0432\u043E\u043A", tone: "accent" },
        { num: "4.9", lbl: "\u043E\u0446\u0435\u043D\u043A\u0430", tone: "ink" }
      ].map((s, i) => /* @__PURE__ */ jsxs2("div", { style: {
        padding: "12px 12px",
        background: VT.bgSoft,
        borderRadius: 12
      }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          color: s.tone === "accent" ? VT.accent : VT.ink,
          lineHeight: 1
        }, children: s.num }),
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 3 }, children: s.lbl })
      ] }, i)) }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: 16,
        fontFamily: VT.font.mono,
        fontSize: 10.5,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u041F\u041E\u0421\u041B\u0415\u0414\u041D\u0418\u0415 \u0417\u0410\u042F\u0412\u041A\u0418" }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        gap: 6
      }, children: [
        ["\u0410\u043D\u043D\u0430 \u041F.", "+7 999 111-11-11", "14:32 \xB7 TG"],
        ["\u042E\u043B\u0438\u044F \u0412.", "@example_user", "12:18 \xB7 TG"],
        ["\u041C\u0438\u0445\u0430\u0438\u043B \u0421.", "+7 999 222-22-22", "\u0432\u0447\u0435\u0440\u0430 \xB7 \u0442\u0435\u043B\u0435\u0444\u043E\u043D"]
      ].map(([nm, contact, time], i) => /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 10px",
        background: VT.white,
        border: `1px solid ${VT.lineSoft}`,
        borderRadius: 8,
        fontSize: 12.5
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: { fontWeight: 600, color: VT.ink, minWidth: 70 }, children: nm }),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, color: VT.inkSoft, flex: 1 }, children: contact }),
        /* @__PURE__ */ jsx3("span", { style: { fontFamily: VT.font.mono, color: VT.inkFaint, fontSize: 11 }, children: time })
      ] }, i)) }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 8
      }, children: [
        ["\u270E  \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u044B", VT.accent, VT.accentSoft, true],
        ["\u{1F5BC}  \u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E", VT.ink, VT.bgSoft, false],
        ["\u23F8  \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443", VT.inkSoft, VT.bgSoft, false],
        ["\u2193  \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432", VT.inkSoft, VT.bgSoft, false]
      ].map(([label, fg, bg, primary], i) => /* @__PURE__ */ jsx3("div", { style: {
        padding: "10px 12px",
        borderRadius: 10,
        background: bg,
        color: fg,
        border: primary ? `1px solid ${VT.accent}` : `1px solid ${VT.line}`,
        fontSize: 13,
        fontWeight: primary ? 600 : 500
      }, children: label }, i)) })
    ] })
  ] });
}
function AnalyticsSection({ mobile }) {
  const stats = [
    {
      num: "2 847",
      delta: "+18%",
      label: "\u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0439 \u0437\u0430 30 \u0434\u043D\u0435\u0439",
      tone: "ink",
      color: VT.accent,
      sparkline: [210, 198, 215, 240, 232, 260, 275, 290, 280, 295, 310, 325, 345, 360]
    },
    {
      num: "78",
      delta: "+34%",
      label: "\u0437\u0430\u044F\u0432\u043E\u043A \u043F\u0440\u0438\u043D\u044F\u0442\u043E",
      tone: "accent",
      color: "oklch(0.55 0.12 145)",
      sparkline: [2, 3, 4, 3, 5, 4, 5, 6, 5, 7, 6, 8, 7, 9]
    },
    {
      num: "2.7%",
      delta: "+0.4\u043F\u043F",
      label: "\u043A\u043E\u043D\u0432\u0435\u0440\u0441\u0438\u044F \u0432 \u0437\u0430\u044F\u0432\u043A\u0443",
      tone: "ink",
      color: "oklch(0.55 0.15 35)",
      sparkline: [2.1, 2.2, 2.3, 2.2, 2.4, 2.3, 2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.8]
    },
    {
      num: "4.9\u2605",
      delta: "+0.1",
      label: "\u0441\u0440\u0435\u0434\u043D\u044F\u044F \u043E\u0446\u0435\u043D\u043A\u0430",
      tone: "ink",
      color: "oklch(0.55 0.15 75)",
      sparkline: [4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9]
    }
  ];
  const days = 30;
  const visits = Array.from(
    { length: days },
    (_, i) => Math.round(80 + 40 * Math.sin(i * 0.6) + 60 * (i / days) + (i % 7 === 0 ? 30 : 0))
  );
  const leads = visits.map((v) => Math.round(v * (0.04 + (Math.sin(v) + 1) * 0.02)));
  const W = 720, H = 220, PAD = { top: 16, right: 16, bottom: 28, left: 36 };
  const inner = { w: W - PAD.left - PAD.right, h: H - PAD.top - PAD.bottom };
  const maxV = Math.max(...visits) * 1.15;
  const xFor = (i) => PAD.left + i / (days - 1) * inner.w;
  const yFor = (v) => PAD.top + inner.h - v / maxV * inner.h;
  const visitsPath = visits.map((v, i) => `${i === 0 ? "M" : "L"} ${xFor(i)} ${yFor(v)}`).join(" ");
  const visitsArea = `${visitsPath} L ${xFor(days - 1)} ${yFor(0)} L ${xFor(0)} ${yFor(0)} Z`;
  const xLabels = [0, 7, 14, 21, 29];
  const xLabelText = ["1 \u043C\u0430\u044F", "8 \u043C\u0430\u044F", "15 \u043C\u0430\u044F", "22 \u043C\u0430\u044F", "30 \u043C\u0430\u044F"];
  const sources = [
    { name: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", share: 45, color: "#FFCC00" },
    { name: "Telegram", share: 28, color: "#229ED9" },
    { name: "\u041F\u0440\u044F\u043C\u044B\u0435", share: 15, color: VT.accent },
    { name: "2\u0413\u0418\u0421", share: 8, color: "#19BB4F" },
    { name: "Google", share: 4, color: "oklch(0.55 0.18 25)" }
  ];
  function Sparkline({ points, color }) {
    const w = 100, h = 28;
    const min = Math.min(...points), max = Math.max(...points);
    const range = max - min || 1;
    const xs = points.map((_, i) => i / (points.length - 1) * w);
    const ys = points.map((p) => h - (p - min) / range * (h - 4) - 2);
    const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(" ");
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, preserveAspectRatio: "none", children: [
      /* @__PURE__ */ jsx3("path", { d: area, fill: color, fillOpacity: "0.12" }),
      /* @__PURE__ */ jsx3("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
    ] });
  }
  return /* @__PURE__ */ jsxs2("section", { style: {
    marginTop: mobile ? 64 : 110,
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1200,
    margin: `${mobile ? 64 : 110}px auto 0`
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center", maxWidth: 760, margin: "0 auto" }, children: [
      /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
        "\u0412\u0438\u0434\u0438\u0442\u0435 \u0432\u0441\u0451,",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0447\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442 \u0441\xA0\u0441\u0430\u0439\u0442\u043E\u043C"
      ] }),
      /* @__PURE__ */ jsxs2(SectionSub, { mobile, children: [
        "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u043B\u044E\u0434\u0435\u0439 \u0437\u0430\u0448\u043B\u0438, \u043E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0448\u043B\u0438 \u0438 \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B\u0438 \u0437\u0430\u044F\u0432\u043E\u043A \u2014 \u0432\xA0\u043E\u0434\u043D\u043E\u043C \u044D\u043A\u0440\u0430\u043D\u0435. ",
        BRAND.name,
        " \u0435\u0449\u0451 \u043F\u0440\u0438\u0448\u043B\u0451\u0442 \u0441\u0432\u043E\u0434\u043A\u0443 \u043A\u0443\u0434\u0430 \u0441\u043A\u0430\u0436\u0435\u0442\u0435 \u2014 \u0432\xA0Telegram, MAX \u0438\u043B\u0438 \u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443"
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "ss-card-lift", style: {
      marginTop: mobile ? 28 : 48,
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 22,
      padding: mobile ? 20 : 28,
      boxShadow: "0 24px 48px -24px rgba(120,60,30,0.18)"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 6,
        paddingBottom: 14,
        borderBottom: `1px solid ${VT.lineSoft}`,
        marginBottom: 18
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.74 0.13 25)" } }),
        /* @__PURE__ */ jsx3("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.82 0.13 85)" } }),
        /* @__PURE__ */ jsx3("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.78 0.13 145)" } }),
        /* @__PURE__ */ jsx3("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \xB7 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" })
      ] }),
      /* @__PURE__ */ jsx3("div", { style: {
        display: "grid",
        gridTemplateColumns: mobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
        gap: 12
      }, children: stats.map((s) => /* @__PURE__ */ jsxs2("div", { style: {
        padding: 14,
        background: VT.bgSoft,
        borderRadius: 14,
        display: "flex",
        flexDirection: "column",
        gap: 6
      }, children: [
        /* @__PURE__ */ jsx3("div", { style: { fontSize: 12, color: VT.inkFaint, fontWeight: 500 }, children: s.label }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
          /* @__PURE__ */ jsx3("span", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", color: s.tone === "accent" ? VT.accent : VT.ink, lineHeight: 1 }, children: s.num }),
          /* @__PURE__ */ jsxs2("span", { style: { fontFamily: VT.font.mono, fontSize: 12, fontWeight: 600, color: VT.success }, children: [
            "\u2191 ",
            s.delta
          ] })
        ] }),
        /* @__PURE__ */ jsx3(Sparkline, { points: s.sparkline, color: s.color })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1.6fr 1fr",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { background: VT.bgSoft, borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsx3("div", { style: { fontSize: 14, fontWeight: 700, color: VT.ink }, children: "\u0422\u0440\u0430\u0444\u0438\u043A \u0437\u0430\xA030 \u0434\u043D\u0435\u0439" }),
            /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", gap: 12, fontSize: 11.5, color: VT.inkSoft, marginLeft: "auto" }, children: [
              /* @__PURE__ */ jsxs2("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 }, children: [
                /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }),
                "\u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"
              ] }),
              /* @__PURE__ */ jsxs2("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 }, children: [
                /* @__PURE__ */ jsx3("span", { style: { width: 8, height: 2, background: "oklch(0.5 0.13 240)" } }),
                "\u0437\u0430\u044F\u0432\u043A\u0438"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: mobile ? 180 : H, preserveAspectRatio: "none", style: { display: "block" }, children: [
            [0, 0.25, 0.5, 0.75, 1].map((t, i) => /* @__PURE__ */ jsxs2("g", { children: [
              /* @__PURE__ */ jsx3(
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
              /* @__PURE__ */ jsx3("text", { x: PAD.left - 8, y: PAD.top + inner.h * t + 4, fontSize: "10", fill: VT.inkFaint, textAnchor: "end", fontFamily: VT.font.mono, children: Math.round(maxV * (1 - t)) })
            ] }, i)),
            /* @__PURE__ */ jsx3("path", { d: visitsArea, fill: VT.accent, fillOpacity: "0.10" }),
            /* @__PURE__ */ jsx3("path", { d: visitsPath, fill: "none", stroke: VT.accent, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
            leads.map((l, i) => /* @__PURE__ */ jsx3("rect", { x: xFor(i) - 2, y: yFor(l * 10), width: "4", height: PAD.top + inner.h - yFor(l * 10), fill: "oklch(0.5 0.13 240)", opacity: "0.5", rx: "1" }, i)),
            xLabels.map((i, k) => /* @__PURE__ */ jsx3("text", { x: xFor(i), y: H - 8, fontSize: "11", fill: VT.inkFaint, textAnchor: "middle", children: xLabelText[k] }, k))
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { background: VT.bgSoft, borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ jsx3("div", { style: { fontSize: 14, fontWeight: 700, color: VT.ink, marginBottom: 4 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442" }),
          /* @__PURE__ */ jsxs2("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginBottom: 14 }, children: [
            BRAND.name,
            " \u0434\u0435\u0440\u0436\u0438\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0441\u0432\u0435\u0436\u0438\u043C\u0438 \u2014 \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u042F.\u041A\u0430\u0440\u0442\u044B #1"
          ] }),
          /* @__PURE__ */ jsx3("div", { style: { display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 12 }, children: sources.map((s) => /* @__PURE__ */ jsx3("span", { style: { width: `${s.share}%`, background: s.color } }, s.name)) }),
          /* @__PURE__ */ jsx3("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: sources.map((s) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: VT.ink }, children: [
            /* @__PURE__ */ jsx3("span", { style: { width: 10, height: 10, borderRadius: 3, background: s.color, flex: "0 0 auto" } }),
            /* @__PURE__ */ jsx3("span", { style: { flex: 1 }, children: s.name }),
            /* @__PURE__ */ jsxs2("b", { style: { fontFamily: VT.font.mono, color: VT.ink }, children: [
              s.share,
              "%"
            ] })
          ] }, s.name)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 18 : 24,
      display: "flex",
      flexDirection: mobile ? "column" : "row",
      alignItems: mobile ? "flex-start" : "center",
      gap: mobile ? 10 : 14,
      padding: mobile ? "14px 16px" : "14px 20px",
      background: VT.accentSoft,
      borderRadius: 14,
      maxWidth: 760,
      margin: `${mobile ? 18 : 24}px auto 0`
    }, children: [
      /* @__PURE__ */ jsx3("span", { style: {
        width: 36,
        height: 36,
        borderRadius: 10,
        background: VT.accent,
        color: "#fff",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto"
      }, children: /* @__PURE__ */ jsxs2("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
        /* @__PURE__ */ jsx3("path", { d: "M22 2 L11 13" }),
        /* @__PURE__ */ jsx3("path", { d: "M22 2 L15 22 L11 13 L2 9 L22 2 Z" })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: mobile ? 13.5 : 14.5, color: VT.accentInk, lineHeight: 1.45, flex: 1 }, children: [
        /* @__PURE__ */ jsx3("b", { style: { color: VT.accentInk }, children: "\u041A\u0440\u0430\u0442\u043A\u043E \u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E" }),
        " \u2014 ",
        BRAND.name,
        " \u043F\u0440\u0438\u0448\u043B\u0451\u0442 \u0441\u0432\u043E\u0434\u043A\u0443 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438, \u043A\u0443\u0434\u0430 \u0441\u043A\u0430\u0436\u0435\u0442\u0435: \u0432\xA0Telegram, MAX \u0438\u043B\u0438 \u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443. \u041D\u0435\xA0\u043D\u0443\u0436\u043D\u043E \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u044C \u0432\xA0\u043A\u0430\u0431\u0438\u043D\u0435\u0442, \u0447\u0442\u043E\u0431\u044B \u0437\u043D\u0430\u0442\u044C \u043A\u0430\u043A \u0438\u0434\u0443\u0442 \u0434\u0435\u043B\u0430"
      ] })
    ] })
  ] });
}
function OwnershipSection({ mobile }) {
  const bullets = [
    ["\u041F\u043E\u043B\u043D\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C", "\u041F\u0440\u0430\u0432\u044C\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u044B, \u0437\u0430\u043C\u0435\u043D\u044F\u0439\u0442\u0435 \u0444\u043E\u0442\u043E, \u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443 \u2014 \u0432\xA0\u043E\u0434\u043D\u043E \u043D\u0430\u0436\u0430\u0442\u0438\u0435."],
    ["\u0421\u0430\u0439\u0442 \u0432\u0430\u0448", "\u0417\u0430\u0431\u0435\u0440\u0451\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0438\u043B\u0438\xA0\u0443\u043D\u0435\u0441\u0451\u0442\u0435 \u043D\u0430\xA0\u0434\u0440\u0443\u0433\u043E\u0439 \u0434\u043E\u043C\u0435\u043D \u2014 \u0432\xA0\u043B\u044E\u0431\u043E\u0439 \u043C\u043E\u043C\u0435\u043D\u0442."],
    ["\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0442\u043E\u0436\u0435", "\u0412\u0438\u0434\u0438\u0442\u0435 \u043A\u0442\u043E \u043F\u0440\u0438\u0448\u0451\u043B, \u043E\u0442\u043A\u0443\u0434\u0430 \u0438\xA0\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043E\u0441\u0442\u0430\u0432\u0438\u043B \u0437\u0430\u044F\u0432\u043E\u043A."],
    ["\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0437\u0430\xA0\u0441\u0435\u043A\u0443\u043D\u0434\u0443", "\u041F\u0435\u0440\u0435\u0434\u0443\u043C\u0430\u043B\u0438 \u2014 \u043D\u0430\u0436\u0430\u043B\u0438 \xAB\u0443\u0434\u0430\u043B\u0438\u0442\u044C\xBB. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0432\xA0\u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0443."]
  ];
  return /* @__PURE__ */ jsx3("section", { style: {
    marginTop: mobile ? 56 : 96,
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1200,
    margin: `${mobile ? 56 : 96}px auto 0`
  }, children: /* @__PURE__ */ jsxs2("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: mobile ? 22 : 28,
    padding: mobile ? "32px 22px" : "56px 56px",
    display: "grid",
    gridTemplateColumns: mobile ? "1fr" : "1fr 1.1fr",
    gap: mobile ? 28 : 56,
    alignItems: "center",
    position: "relative",
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsx3("div", { "aria-hidden": "true", style: {
      position: "absolute",
      right: -120,
      top: -100,
      width: 360,
      height: 360,
      borderRadius: "50%",
      background: `radial-gradient(circle, ${VT.accentSoft} 0%, transparent 65%)`,
      opacity: 0.5
    } }),
    /* @__PURE__ */ jsxs2("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx3("h2", { style: {
        fontSize: mobile ? 30 : 44,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        margin: "14px 0 0",
        lineHeight: 1.05,
        textWrap: "balance"
      }, children: "\u0412\u043E\u0441\u0435\u043C\u044C \xAB\u0441\u0430\u043C\xBB \u2014 \u043D\u043E\xA0\u043A\u043D\u043E\u043F\u043A\u0430 \u0432\u0441\u0435\u0433\u0434\u0430 \u0443\xA0\u0432\u0430\u0441" }),
      /* @__PURE__ */ jsxs2("p", { style: {
        fontSize: mobile ? 16 : 18,
        lineHeight: 1.5,
        color: VT.inkSoft,
        margin: "14px 0 0",
        maxWidth: 480,
        textWrap: "pretty"
      }, children: [
        BRAND.name,
        " \u0434\u0435\u043B\u0430\u0435\u0442 \u0440\u0443\u0442\u0438\u043D\u0443, \u043D\u043E\xA0\u0440\u0435\u0448\u0435\u043D\u0438\u044F \u2014 \u0437\u0430\xA0\u0432\u0430\u043C\u0438. \u0412 \u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u0432\u0438\u0434\u043D\u0430 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u0438\xA0\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0432\u0441\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441\xA0\u0441\u0430\u0439\u0442\u043E\u043C."
      ] }),
      /* @__PURE__ */ jsx3("ul", { style: {
        listStyle: "none",
        margin: "24px 0 0",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }, children: bullets.map(([title, body]) => /* @__PURE__ */ jsxs2("li", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          flex: "0 0 auto",
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: VT.accent,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 2
        }, children: /* @__PURE__ */ jsx3("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx3("div", { style: { fontSize: mobile ? 15.5 : 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em" }, children: title }),
          /* @__PURE__ */ jsx3("div", { style: { fontSize: mobile ? 14 : 14.5, color: VT.inkSoft, lineHeight: 1.5, marginTop: 2 }, children: body })
        ] })
      ] }, title)) }),
      /* @__PURE__ */ jsxs2("a", { href: "client-admin-demo.html", target: "_blank", rel: "noopener", style: {
        marginTop: 24,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: mobile ? "12px 20px" : "14px 24px",
        borderRadius: 999,
        background: VT.ink,
        color: "#fff",
        fontWeight: 600,
        fontSize: mobile ? 14 : 15,
        textDecoration: "none",
        boxShadow: "0 14px 28px -14px rgba(0,0,0,0.4)"
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: VT.accent,
          color: "#fff",
          fontSize: 13
        }, children: "\u25B6" }),
        "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0435\u0442\u044C \u0434\u0435\u043C\u043E \u043B\u0438\u0447\u043D\u043E\u0433\u043E \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0430",
        /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2197" })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("div", { style: { position: "relative" }, children: /* @__PURE__ */ jsx3(ControlPanelMock, { mobile }) })
  ] }) });
}
function PricingSection({ mobile }) {
  const bullets = [
    "\u0421\u0430\u043C \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0441\u0430\u0439\u0442 \u0437\u0430\xA02\xA0\u0447\u0430\u0441\u0430",
    "\u0421\u0430\u043C \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 4 \u0440\u0430\u0437\u0430 \u0432\xA0\u043C\u0435\u0441\u044F\u0446 \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430",
    "\u0421\u0430\u043C \u043B\u043E\u0432\u0438\u0442 \u0437\u0430\u044F\u0432\u043A\u0438 \u0432 Telegram / MAX / Email",
    "\u0421\u0430\u043C \u043E\u0442\u0431\u0438\u0440\u0430\u0435\u0442 \u043B\u0443\u0447\u0448\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    "\u0421\u0430\u043C \u0438\u043D\u0434\u0435\u043A\u0441\u0438\u0440\u0443\u0435\u0442 \u0432\xA0\u042F\u043D\u0434\u0435\u043A\u0441\u0435 \u0438 Google",
    "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0441\xA0\u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u043E\u0439 \u0438\xA0\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435\u043C",
    "\u0417\u0430\u0449\u0438\u0449\u0451\u043D\u043D\u044B\u0439 https + \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432\xA0\u0420\u0424"
  ];
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 64 : 110, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
        "\u041E\u0434\u0438\u043D \u0442\u0430\u0440\u0438\u0444 \u2014",
        /* @__PURE__ */ jsx3("br", {}),
        "\u0431\u0435\u0437\xA0\u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432"
      ] }),
      /* @__PURE__ */ jsxs2(SectionSub, { mobile, children: [
        "\u041D\u0435 \u043D\u0430\u0434\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0442\u044C \u043F\u0430\u043A\u0435\u0442\u044B, \u0441\u0447\u0438\u0442\u0430\u0442\u044C \u0430\u043F\u0441\u0435\u043B\u044B \u0438\xA0\u0447\u0438\u0442\u0430\u0442\u044C \xAB\u0437\u0432\u0451\u0437\u0434\u043E\u0447\u043A\u0438\xBB. 990\xA0\u20BD \u0432\xA0\u043C\u0435\u0441\u044F\u0446 \u2014 \u0438\xA0\u0432\u0435\u0441\u044C ",
        BRAND.name,
        " \u0432\xA0\u0432\u0430\u0448\u0435\u043C \u0440\u0430\u0441\u043F\u043E\u0440\u044F\u0436\u0435\u043D\u0438\u0438"
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 640,
      margin: `${mobile ? 28 : 48}px auto 0`
    }, children: [
      /* @__PURE__ */ jsxs2("div", { className: "ss-pricing-card", style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 22,
        padding: mobile ? "28px 22px" : "44px 40px",
        boxShadow: VT.shadow.card,
        position: "relative",
        overflow: "hidden"
      }, children: [
        /* @__PURE__ */ jsx3("div", { style: {
          position: "absolute",
          top: mobile ? 18 : 24,
          right: mobile ? 18 : 24,
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.14em",
          color: VT.accentInk,
          background: VT.accentSoft,
          padding: "4px 10px",
          borderRadius: 999,
          fontWeight: 600
        }, children: "\u041E\u0414\u0418\u041D \u0422\u0410\u0420\u0418\u0424" }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
          /* @__PURE__ */ jsxs2("span", { style: {
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: VT.font.mono,
            fontSize: 11.5,
            letterSpacing: "0.12em",
            color: VT.accentInk,
            fontWeight: 700,
            textTransform: "uppercase"
          }, children: [
            /* @__PURE__ */ jsx3("span", { style: {
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: VT.accent,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ jsx3("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12 l4 4 10 -10" }) }) }),
            "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E"
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginTop: 6 }, children: [
            /* @__PURE__ */ jsx3("span", { style: { fontSize: mobile ? 16 : 20, color: VT.inkSoft, fontWeight: 500 }, children: "\u043F\u043E\u0442\u043E\u043C" }),
            /* @__PURE__ */ jsx3("span", { style: {
              fontSize: mobile ? 56 : 76,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: VT.ink
            }, children: "990\xA0\u20BD" }),
            /* @__PURE__ */ jsx3("span", { style: { fontSize: mobile ? 16 : 18, color: VT.inkSoft }, children: "/ \u043C\u0435\u0441\u044F\u0446" })
          ] })
        ] }),
        /* @__PURE__ */ jsx3("ul", { style: {
          listStyle: "none",
          margin: "22px 0 0",
          padding: 0,
          display: "flex",
          flexDirection: "column",
          gap: 10
        }, children: bullets.map((b) => /* @__PURE__ */ jsxs2("li", { style: {
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          fontSize: mobile ? 14.5 : 15.5,
          color: VT.ink,
          lineHeight: 1.45
        }, children: [
          /* @__PURE__ */ jsx3("span", { style: {
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
          }, children: /* @__PURE__ */ jsx3("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12 l4 4 10 -10" }) }) }),
          /* @__PURE__ */ jsx3("span", { children: b })
        ] }, b)) }),
        /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 24 : 32 }, children: /* @__PURE__ */ jsxs2(Btn, { style: { width: "100%", padding: mobile ? "14px 22px" : "16px 26px", fontSize: mobile ? 15 : 16 }, iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), children: [
          "\u0421\u0434\u0435\u043B\u0430\u0442\u044C ",
          BRAND.name
        ] }) }),
        /* @__PURE__ */ jsx3("div", { style: {
          marginTop: 12,
          textAlign: "center",
          fontFamily: VT.font.mono,
          fontSize: 11.5,
          letterSpacing: "0.08em",
          color: VT.inkFaint
        }, children: "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" })
      ] }),
      /* @__PURE__ */ jsxs2("p", { style: {
        margin: `${mobile ? 18 : 24}px auto 0`,
        maxWidth: 560,
        fontSize: mobile ? 13.5 : 14.5,
        lineHeight: 1.55,
        color: VT.inkSoft,
        textAlign: "center",
        textWrap: "pretty"
      }, children: [
        "\u0427\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u044B SMM-\u0449\u0438\u043A\u0430 \u0441\u0442\u043E\u0438\u0442 \u0434\u043E\u0440\u043E\u0436\u0435. \u0427\u0430\u0441 \u043C\u0430\u0440\u043A\u0435\u0442\u043E\u043B\u043E\u0433\u0430 \u2014 \u0432\xA0\u0440\u0430\u0437\u044B. ",
        BRAND.name,
        " \u0434\u0435\u043B\u0430\u0435\u0442 \u0442\u043E, \u0447\u0442\u043E\xA0\u0438\u043C \u043F\u0440\u0438\u0448\u043B\u043E\u0441\u044C \u0431\u044B \u0434\u0435\u043B\u0430\u0442\u044C \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043D\u043E\xA0\u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438."
      ] })
    ] })
  ] });
}
function FaqItem({ q, a, defaultOpen, mobile }) {
  return /* @__PURE__ */ jsxs2("details", { open: defaultOpen, style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: 0,
    overflow: "hidden"
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
      /* @__PURE__ */ jsx3("style", { children: `
          details > summary::-webkit-details-marker { display: none; }
        ` }),
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
  const faqs = [
    {
      q: `\u0410 \u0435\u0441\u043B\u0438 ${BRAND.name} \u0441\u0430\u043C \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0447\u0442\u043E-\u0442\u043E \u043D\u0435\xA0\u0442\u043E?`,
      a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0412\u0441\u0435 \u0442\u0435\u043A\u0441\u0442\u044B \u043C\u043E\u0436\u043D\u043E \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0432\xA0\u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u2014 \u043F\u0430\u0440\u0430 \u043A\u043B\u0438\u043A\u043E\u0432. \u0415\u0441\u043B\u0438 \u0441\u043E\u0432\u0441\u0435\u043C \u043D\u0435\xA0\u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u043F\u0435\u0440\u0435\u0441\u043E\u0431\u0440\u0430\u0442\u044C\xBB, \u0438 ",
        BRAND.name,
        " \u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u0437\u0430\u043D\u043E\u0432\u043E \u0441\xA0\u0434\u0440\u0443\u0433\u0438\u043C \u0442\u043E\u043D\u043E\u043C \u0438\u043B\u0438\xA0\u0430\u043A\u0446\u0435\u043D\u0442\u043E\u043C."
      ] })
    },
    {
      q: "\u042F \u043C\u043E\u0433\u0443 \u0441\u0430\u043C \u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u044B \u043F\u043E\u0441\u043B\u0435 \u0441\u0431\u043E\u0440\u043A\u0438?",
      a: "\u0414\u0430. \u0412 \u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435 \u043F\u0440\u044F\u043C\u043E \u043D\u0430\xA0\u0441\u0430\u0439\u0442\u0435 \u2014 \u043A\u043B\u0438\u043A \u043F\u043E\xA0\u043B\u044E\u0431\u043E\u043C\u0443 \u0431\u043B\u043E\u043A\u0443, \u043F\u0440\u0430\u0432\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442. \u0422\u0430\u043A\u0436\u0435 \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E, \u0441\u043A\u0440\u044B\u0442\u044C \u0443\u0441\u043B\u0443\u0433\u0443, \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0446\u0435\u043D\u0443. \u0421\u0430\u0439\u0442 \u0432\u0430\u0448."
    },
    {
      q: "\u0427\u0442\u043E \u0435\u0441\u043B\u0438 \u0443\xA0\u043C\u0435\u043D\u044F \u043D\u0435\u0442 Telegram-\u043A\u0430\u043D\u0430\u043B\u0430 \u0438\xA0\u043D\u0435\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0432\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445?",
      a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 5\u201310 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0448\u0430\u043F\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438\u043B\u0438\xA0\u043F\u0440\u043E\u0441\u0442\u043E \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u2014 ",
        BRAND.name,
        " \u0441\u043E\u0431\u0435\u0440\u0451\u0442 \u0441\u0430\u0439\u0442 \u0438\u0437\xA0\u044D\u0442\u043E\u0433\u043E. \u041D\u0430 \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u043E\u0439 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0435 \u0435\u0441\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438\u043B\u0438\xA0\u0432\u0438\u0437\u0438\u0442\u043A\u0443\xBB."
      ] })
    },
    {
      q: `\u041C\u043E\u0439 Telegram-\u043A\u0430\u043D\u0430\u043B \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439. ${BRAND.name} \u0435\u0433\u043E \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0435\u0442?`,
      a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0414\u0430. \u041D\u0430 \u0432\u0440\u0435\u043C\u044F \u0441\u0431\u043E\u0440\u0430 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0431\u043E\u0442\u0430 ",
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 13, color: VT.ink }, children: BRAND.bot }),
        " \u0430\u0434\u043C\u0438\u043D\u043E\u043C \u0432\xA0\u0441\u0432\u043E\u0439 \u043A\u0430\u043D\u0430\u043B \u043D\u0430 5 \u043C\u0438\u043D\u0443\u0442 \u2014 \u043C\u044B \u043F\u0440\u043E\u0447\u0438\u0442\u0430\u0435\u043C \u043F\u043E\u0441\u0442\u044B \u0438\xA0\u0441\u0440\u0430\u0437\u0443 \u0432\u044B\u0439\u0434\u0435\u043C. \u042D\u0442\u043E \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E: \u0431\u043E\u0442 \u043D\u0435\xA0\u043F\u0438\u0448\u0435\u0442 \u0432\xA0\u043A\u0430\u043D\u0430\u043B \u0438\xA0\u043D\u0435\xA0\u0432\u0438\u0434\u0438\u0442 \u0432\u0430\u0448\u0438\u0445 \u043F\u043E\u0434\u043F\u0438\u0441\u0447\u0438\u043A\u043E\u0432."
      ] })
    },
    {
      q: `\u041A\u0430\u043A ${BRAND.name} \u0441\u0430\u043C \u043F\u043E\u043D\u0438\u043C\u0430\u0435\u0442, \u043A\u0430\u043A\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u043B\u0443\u0447\u0448\u0438\u0435?`,
      a: "\u0427\u0438\u0442\u0430\u0435\u0442 \u0432\u0441\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430, \u043E\u0442\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442 \u043E\u0434\u043D\u043E\u0441\u043B\u043E\u0436\u043D\u044B\u0435 (\xAB\u043D\u043E\u0440\u043C\xBB, \xAB-\xBB, \xAB\u043E\u043A\xBB), \u0442\u0440\u043E\u0439\u043A\u0438, \u0441\u043F\u0430\u043C \u0438\xA0\u0442\u043E\u043A\u0441\u0438\u0447\u043D\u044B\u0435. \u0418\u0437 \u043E\u0441\u0442\u0430\u0432\u0448\u0438\u0445\u0441\u044F \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445 \u0438\xA0\u043A\u043E\u043D\u043A\u0440\u0435\u0442\u043D\u044B\u0445 \u2014 \u0442\u0435\u0445, \u0447\u0442\u043E\xA0\u043F\u0440\u044F\u043C\u043E \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442, \u0447\u0442\u043E\xA0\u043F\u043E\u043D\u0440\u0430\u0432\u0438\u043B\u043E\u0441\u044C. \u041A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442: \u043F\u043E\u044F\u0432\u0438\u043B\u0441\u044F \u043E\u0442\u0437\u044B\u0432 \u0441\u0438\u043B\u044C\u043D\u0435\u0435 \u2014 \u0437\u0430\u043C\u0435\u043D\u0438\u0442."
    },
    {
      q: `\u041A\u0443\u0434\u0430 ${BRAND.name} \u0441\u0430\u043C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442 \u0437\u0430\u044F\u0432\u043A\u0443, \u0435\u0441\u043B\u0438 \u0443\xA0\u043C\u0435\u043D\u044F \u043D\u0435\u0442 Telegram?`,
      a: "\u0412\u044B\u0431\u0438\u0440\u0430\u0435\u0442\u0435 \u043E\u0434\u0438\u043D \u043A\u0430\u043D\u0430\u043B \u0438\u0437\xA0\u0447\u0435\u0442\u044B\u0440\u0451\u0445: Telegram, \u0442\u0435\u043B\u0435\u0444\u043E\u043D (SMS), email \u0438\u043B\u0438 MAX (\u0440\u043E\u0441\u0441\u0438\u0439\u0441\u043A\u0438\u0439 \u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440 \u043E\u0442 VK). \u0417\u0430\u044F\u0432\u043A\u0430 \u043F\u0430\u0434\u0430\u0435\u0442 \u0442\u0443\u0434\u0430. \u041D\u0438\u043A\u0430\u043A\u0438\u0445 CRM \u0438\xA0\u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0445 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u0439 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u043E, \u0447\u0442\u043E\xA0\u0432\u044B \u0438\xA0\u0442\u0430\u043A \u0447\u0438\u0442\u0430\u0435\u0442\u0435."
    },
    {
      q: `\u041C\u043E\u0436\u0435\u0442 \u043B\u0438 ${BRAND.name} \u0441\u0430\u043C \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u043C\u043E\u0439 \u0434\u043E\u043C\u0435\u043D?`,
      a: /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u0415\u0441\u043B\u0438 \u0443\xA0\u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u0434\u043E\u043C\u0435\u043D \u2014 \u043F\u0440\u0438\u0448\u043B\u0438\u0442\u0435 \u0435\u0433\u043E, \u043C\u044B \u043F\u043E\u043C\u043E\u0436\u0435\u043C \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C DNS. \u0415\u0441\u043B\u0438 \u043D\u0435\u0442 \u2014 \u0441\u0430\u0439\u0442 \u0441\u0440\u0430\u0437\u0443 \u0436\u0438\u0432\u0451\u0442 \u043D\u0430\xA0\u0430\u0434\u0440\u0435\u0441\u0435 ",
        /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 13, color: VT.ink }, children: `<\u0432\u0430\u0448-\u0441\u0430\u0439\u0442>.${BRAND.domain}` }),
        " \u0441\u043E\xA0\u0432\u0441\u0435\u043C \u0442\u0435\u043C \u0436\u0435\xA0\u0441\u0430\u043C\u044B\u043C, \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E."
      ] })
    },
    {
      q: "\u0427\u0442\u043E \u0441\xA0\u043C\u043E\u0438\u043C\u0438 \u0434\u0430\u043D\u043D\u044B\u043C\u0438, \u0435\u0441\u043B\u0438 \u044F \u043E\u0442\u043A\u0430\u0436\u0443\u0441\u044C \u043E\u0442\xA0\u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0438?",
      a: "\u0421\u0430\u0439\u0442 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u0451\u0442 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C\u0441\u044F \u0441\u0440\u0430\u0437\u0443. \u0412\u0441\u0435 \u0432\u0430\u0448\u0438 \u0434\u0430\u043D\u043D\u044B\u0435 \u2014 \u0442\u0435\u043A\u0441\u0442\u044B, \u0444\u043E\u0442\u043E, \u0437\u0430\u044F\u0432\u043A\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u2014 \u0443\u0434\u0430\u043B\u044F\u044E\u0442\u0441\u044F \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 10 \u0434\u043D\u0435\u0439. \u0414\u043E \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u044F \u043C\u043E\u0436\u043D\u043E \u0441\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432 (HTML + \u0444\u043E\u0442\u043E) \u043E\u0434\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439. \u041F\u043E \u0424\u0417-152 \u2014 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432\xA0\u0420\u0424."
    },
    {
      q: "\u0410 \u0435\u0441\u043B\u0438 \u043A\u043B\u0438\u0435\u043D\u0442 \u0436\u0430\u043B\u0443\u0435\u0442\u0441\u044F \u043D\u0430\xA0\u0441\u0430\u0439\u0442 \u2014 \u043A\u0442\u043E \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442?",
      a: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0437\u0430\xA0\u043A\u043E\u043D\u0442\u0435\u043D\u0442 \u043D\u0435\u0441\u0451\u0442\u0435 \u0432\u044B \u043A\u0430\u043A\xA0\u0432\u043B\u0430\u0434\u0435\u043B\u0435\u0446 \u0434\u0435\u043B\u0430. \u041C\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C, \u0447\u0442\u043E\xA0\u0442\u0435\u043A\u0441\u0442 \u043D\u0435\xA0\u043D\u0430\u0440\u0443\u0448\u0430\u0435\u0442 \u0437\u0430\u043A\u043E\u043D, \u043D\u043E\xA0\u043D\u0435\xA0\u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C \u0444\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u0442\u043E\u0447\u043D\u043E\u0441\u0442\u044C (\xAB\u0441\u0442\u0435\u0440\u0438\u043B\u044C\u043D\u044B\u0435 \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442\u044B\xBB, \xAB\u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F 14 \u0434\u043D\u0435\u0439\xBB \u2014 \u044D\u0442\u043E \u0432\u0430\u0448\u0438 \u043E\u0431\u0435\u0449\u0430\u043D\u0438\u044F). \u0415\u0441\u043B\u0438 \u043A\u043B\u0438\u0435\u043D\u0442 \u043F\u0438\u0448\u0435\u0442 \u043F\u0440\u043E \u0442\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0443\u044E \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0441\u0430\u0439\u0442\u0430 \u2014 \u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C, \u043F\u043E\u043F\u0440\u0430\u0432\u0438\u043C."
    },
    {
      q: `\u0427\u0442\u043E ${BRAND.name} \u0441\u0430\u043C \u041D\u0415 \u0443\u043C\u0435\u0435\u0442?`,
      a: "\u041D\u0435 \u043F\u0438\u0448\u0435\u0442 \u0441\u0430\u0439\u0442 \xAB\u0441\xA0\u043D\u0443\u043B\u044F \u0431\u0435\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\xBB \u2014 \u043D\u0443\u0436\u043D\u0430 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0430 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438\u043B\u0438\xA0\u0444\u043E\u0442\u043E. \u041D\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u0443\u0435\u0442 \u0444\u043E\u0442\u043E \u0438\xA0\u043D\u0435\xA0\u043F\u043E\u0434\u0431\u0438\u0440\u0430\u0435\u0442 \u0447\u0443\u0436\u0438\u0435. \u041D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u0432\xA0\u0447\u0430\u0442\u0430\u0445 \u0437\u0430\xA0\u0432\u0430\u0441 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0435\u0442 \u0437\u0430\u044F\u0432\u043A\u0438. \u041D\u0435 \u043F\u043E\u043A\u0443\u043F\u0430\u0435\u0442 \u0434\u043E\u043C\u0435\u043D \u0438\xA0\u043D\u0435\xA0\u043D\u0430\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0435\u0442 \u043A\u043E\u0440\u043F\u043E\u0440\u0430\u0442\u0438\u0432\u043D\u0443\u044E \u043F\u043E\u0447\u0442\u0443. \u041D\u0435 \u0434\u0435\u043B\u0430\u0435\u0442 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442-\u043C\u0430\u0433\u0430\u0437\u0438\u043D\u044B \u0441\xA0\u043E\u043F\u043B\u0430\u0442\u043E\u0439 \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0437\u0430\u044F\u0432\u043A\u0438."
    }
  ];
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 64 : 110, position: "relative", zIndex: 1 }, id: "faq", children: [
    /* @__PURE__ */ jsx3("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
      "\u0427\u0442\u043E \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
      /* @__PURE__ */ jsx3("br", {}),
      "\u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442"
    ] }) }),
    /* @__PURE__ */ jsx3("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 820,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }, children: faqs.map((f, i) => /* @__PURE__ */ jsx3(FaqItem, { q: f.q, a: f.a, mobile, defaultOpen: i === 0 }, f.q)) })
  ] });
}
function FreeMonthSection({ mobile }) {
  const bullets = [
    /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "\u0421\u0430\u0439\u0442 \u043D\u0430\xA0\u0430\u0434\u0440\u0435\u0441\u0435 ",
      /* @__PURE__ */ jsx3(Mono, { style: { fontSize: 13, color: "#fff" }, children: `\u0432\u0430\u0448-\u0441\u0430\u0439\u0442.${BRAND.domain}` })
    ] }),
    "\u041A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u0438\xA0\u043F\u0440\u0438\u0451\u043C \u0437\u0430\u044F\u0432\u043E\u043A \u0432 Telegram",
    "\u0421\u0432\u0435\u0436\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\xA0\u0444\u043E\u0442\u043E \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0439 \u0438\xA0\u0437\u0430\u044F\u0432\u043E\u043A \u0432\xA0\u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435"
  ];
  return /* @__PURE__ */ jsx3("section", { style: {
    marginTop: mobile ? 64 : 110,
    position: "relative",
    zIndex: 1,
    maxWidth: mobile ? "100%" : 1200,
    margin: `${mobile ? 64 : 110}px auto 0`
  }, id: "cta", children: /* @__PURE__ */ jsxs2("div", { style: {
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
    /* @__PURE__ */ jsxs2("div", { style: { position: "relative", maxWidth: 820, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx3("div", { style: { display: "inline-flex", marginBottom: mobile ? 14 : 20 }, children: /* @__PURE__ */ jsx3(GlyphGift, { size: mobile ? 58 : 76 }) }),
      /* @__PURE__ */ jsxs2("h2", { style: {
        fontSize: mobile ? 30 : 54,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        margin: 0,
        lineHeight: 1.05,
        textWrap: "balance"
      }, children: [
        "\u0414\u0430\u0439\u0442\u0435 ",
        BRAND.name,
        "\u0443 \u0441\u043E\u0431\u0440\u0430\u0442\u044C \u0441\u0435\u0431\u044F"
      ] }),
      /* @__PURE__ */ jsx3("p", { style: {
        fontSize: mobile ? 16 : 19,
        lineHeight: 1.5,
        color: "oklch(0.85 0.014 60)",
        margin: "14px auto 0",
        maxWidth: 640,
        textWrap: "pretty"
      }, children: "\u0427\u0435\u0440\u0435\u0437\xA02\xA0\u0447\u0430\u0441\u0430 \u0443\xA0\u0432\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0438\u0439 \u0441\u0430\u0439\u0442 \u0441\xA0\u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438 \u0438\xA0\u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438. \u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0432\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u0432 Telegram." }),
      /* @__PURE__ */ jsx3("div", { style: {
        marginTop: mobile ? 24 : 36,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
        gap: mobile ? 10 : 14,
        textAlign: "left",
        maxWidth: 680,
        margin: `${mobile ? 24 : 36}px auto 0`
      }, children: bullets.map((b, i) => /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        alignItems: "flex-start",
        gap: 10,
        padding: "12px 14px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 12
      }, children: [
        /* @__PURE__ */ jsx3("span", { style: {
          flex: "0 0 auto",
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: VT.accent,
          color: "#fff",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 1
        }, children: /* @__PURE__ */ jsx3("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx3("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        /* @__PURE__ */ jsx3("span", { style: { fontSize: mobile ? 14 : 15, color: "oklch(0.92 0.012 60)", lineHeight: 1.4 }, children: b })
      ] }, i)) }),
      /* @__PURE__ */ jsx3("div", { style: { marginTop: mobile ? 24 : 32, display: "inline-flex" }, children: /* @__PURE__ */ jsxs2(Btn, { iconRight: /* @__PURE__ */ jsx3(IconArrow, {}), style: { padding: mobile ? "14px 24px" : "18px 32px", fontSize: mobile ? 16 : 18 }, children: [
        "\u0421\u0434\u0435\u043B\u0430\u0442\u044C ",
        BRAND.name
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 12,
        fontSize: mobile ? 13 : 14,
        color: "oklch(0.82 0.014 60)",
        textWrap: "pretty"
      }, children: [
        "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E. ",
        BRAND.name,
        " \u0441\u0430\u043C \u043D\u0430\u043F\u043E\u043C\u043D\u0438\u0442, \u043A\u043E\u0433\u0434\u0430 \u043F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0441\u0440\u043E\u043A."
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: mobile ? 22 : 30,
        paddingTop: mobile ? 18 : 22,
        borderTop: "1px solid rgba(255,255,255,0.10)",
        fontSize: mobile ? 13.5 : 14.5,
        color: "oklch(0.82 0.014 60)",
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: mobile ? 4 : 8,
        width: "100%"
      }, children: [
        /* @__PURE__ */ jsx3("span", { children: "\u0415\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B?" }),
        /* @__PURE__ */ jsx3("a", { style: {
          color: VT.accentSoft,
          textDecoration: "underline",
          textUnderlineOffset: 3
        }, children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u2193" }),
        /* @__PURE__ */ jsx3("span", { children: "\u0438\u043B\u0438" }),
        /* @__PURE__ */ jsx3("a", { style: {
          color: VT.accentSoft,
          textDecoration: "underline",
          textUnderlineOffset: 3
        }, children: "\u043D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043D\u0430\u043C \u2192" })
      ] })
    ] })
  ] }) });
}
function SamosaytLanding({ mobile = false }) {
  const padX = mobile ? 20 : 80;
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsx3("style", { children: `
        .ss-hero-pill:focus-within {
          border-color: ${VT.accent} !important;
          box-shadow: 0 0 0 4px ${VT.accentSoft}, 0 12px 32px -16px rgba(120,60,30,0.25) !important;
        }
        .ss-hero-pill input::placeholder { color: ${VT.inkFaint}; opacity: 1; }
        .ss-card-lift {
          transition: transform .2s ease-out, box-shadow .2s ease-out;
        }
        .ss-card-lift:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -14px rgba(120,60,30,0.18);
        }
        .ss-story-card { transition: transform .2s ease-out; }
        .ss-story-card:hover { transform: translateY(-1px); }
        .ss-pricing-card { transition: transform .2s ease-out, box-shadow .2s ease-out; }
        .ss-pricing-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 24px -16px rgba(120,60,30,0.22);
        }

        a[href="#hero"], a[href="#book"], a[href="/admin-demo"],
        a[href*="samosite.online/login"], a[href="client-admin-demo.html"],
        button {
          transition: transform .15s ease, box-shadow .15s ease, filter .15s ease, background-color .15s ease;
        }
        a[href="#hero"]:hover, a[href="#book"]:hover,
        a[href="/admin-demo"]:hover, a[href="client-admin-demo.html"]:hover,
        a[href*="samosite.online/login"]:hover,
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(0.95);
          box-shadow: 0 16px 32px -14px rgba(120,60,30,0.45);
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${VT.accent};
          outline-offset: 3px;
          border-radius: 6px;
        }

        details summary { transition: background-color .15s ease; }
        details summary:hover { background-color: ${VT.bgSoft}; }

        html { scroll-behavior: smooth; }
      ` }),
    /* @__PURE__ */ jsxs2("div", { style: {
      width: "100%",
      minHeight: "100%",
      background: VT.bg,
      color: VT.ink,
      fontFamily: VT.font.sans,
      paddingLeft: padX,
      paddingRight: padX,
      paddingTop: mobile ? 18 : 28,
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
      /* @__PURE__ */ jsx3("div", { style: {
        position: "sticky",
        top: 0,
        zIndex: 10,
        marginLeft: -padX,
        marginRight: -padX,
        paddingLeft: padX,
        paddingRight: padX,
        paddingTop: mobile ? 10 : 14,
        paddingBottom: mobile ? 10 : 14,
        background: "oklch(0.972 0.012 80 / 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${VT.lineSoft}`
      }, children: /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsx3(BrandMark, { size: mobile ? 22 : 26, fontSize: mobile ? 18 : 20 }),
        !mobile ? /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 24, fontSize: 14, color: VT.inkSoft }, children: [
          /* @__PURE__ */ jsx3("a", { href: "#how", style: { color: "inherit", textDecoration: "none" }, children: "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442" }),
          /* @__PURE__ */ jsx3("a", { href: "#examples", style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" }),
          /* @__PURE__ */ jsx3("a", { href: "#pricing", style: { color: "inherit", textDecoration: "none" }, children: "\u0426\u0435\u043D\u044B" }),
          /* @__PURE__ */ jsx3("a", { href: "#faq", style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u043E\u043C\u043E\u0449\u044C" }),
          /* @__PURE__ */ jsx3("a", { style: {
            color: VT.inkSoft,
            fontWeight: 500,
            fontSize: 14,
            padding: "8px 16px",
            textDecoration: "none"
          }, href: "https://samosite.online/login", children: "\u0412\u043E\u0439\u0442\u0438" }),
          /* @__PURE__ */ jsxs2("a", { href: "#hero", style: {
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
            boxShadow: "0 6px 16px -8px rgba(120,60,30,0.4)"
          }, children: [
            "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0441\u0430\u0439\u0442 ",
            /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2192" })
          ] })
        ] }) : /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx3("a", { href: "https://samosite.online/login", style: {
            color: VT.inkSoft,
            fontWeight: 500,
            fontSize: 13.5,
            padding: "8px 12px",
            textDecoration: "none"
          }, children: "\u0412\u043E\u0439\u0442\u0438" }),
          /* @__PURE__ */ jsxs2("a", { href: "#hero", style: {
            background: VT.accent,
            color: "#fff",
            fontWeight: 600,
            fontSize: 13.5,
            padding: "8px 16px",
            borderRadius: 999,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 4
          }, children: [
            "\u0421\u0434\u0435\u043B\u0430\u0442\u044C ",
            /* @__PURE__ */ jsx3("span", { "aria-hidden": "true", children: "\u2192" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx3("div", { id: "hero" }),
      /* @__PURE__ */ jsx3(HeroBlock, { mobile }),
      /* @__PURE__ */ jsx3("div", { id: "examples" }),
      /* @__PURE__ */ jsx3(ExamplesSection, { mobile }),
      /* @__PURE__ */ jsx3("div", { id: "how" }),
      /* @__PURE__ */ jsx3(StorySection, { mobile }),
      /* @__PURE__ */ jsx3(PlatformsSection, { mobile }),
      /* @__PURE__ */ jsx3(BigFeaturesSection, { mobile }),
      /* @__PURE__ */ jsx3(OwnershipSection, { mobile }),
      /* @__PURE__ */ jsx3(AnalyticsSection, { mobile }),
      /* @__PURE__ */ jsx3("div", { id: "pricing" }),
      /* @__PURE__ */ jsx3(PricingSection, { mobile }),
      /* @__PURE__ */ jsx3(FaqSection, { mobile }),
      /* @__PURE__ */ jsx3(FreeMonthSection, { mobile }),
      /* @__PURE__ */ jsxs2("div", { style: {
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
          /* @__PURE__ */ jsx3(BrandMark, { size: 20, fontSize: 15, color: VT.inkSoft }),
          /* @__PURE__ */ jsxs2("span", { children: [
            "\xA9 2026 \xB7 ",
            BRAND.domain,
            " \xB7 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432\xA0\u0420\u0424"
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsx3("a", { style: { color: "inherit" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
          /* @__PURE__ */ jsx3("a", { style: { color: "inherit" }, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
          /* @__PURE__ */ jsx3("a", { style: { color: "inherit" }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" })
        ] })
      ] })
    ] })
  ] });
}
function SamosaytLanding_Desktop() {
  return /* @__PURE__ */ jsx3(SamosaytLanding, { mobile: false });
}
function SamosaytLanding_Mobile() {
  return /* @__PURE__ */ jsx3(SamosaytLanding, { mobile: true });
}
var Landing = SamosaytLanding;
var HeroSection = HeroBlock;
var ConceptA_Desktop = SamosaytLanding_Desktop;
var ConceptA_Mobile = SamosaytLanding_Mobile;

// src/intake/index.tsx
import { Fragment as Fragment3, jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function ModalShell({ children, width = 520 }) {
  return /* @__PURE__ */ jsx4("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs3("div", { style: {
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
  ] }) });
}
function StepHeader({ step, total, title, sub, onBack = true }) {
  return /* @__PURE__ */ jsxs3(Fragment3, { children: [
    /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && onBack && /* @__PURE__ */ jsxs3("button", { style: {
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
      /* @__PURE__ */ jsxs3(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        step,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx4("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx4("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < step ? VT.accent : VT.line
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx4("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2 }, children: title }),
    sub && /* @__PURE__ */ jsx4("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
var SOURCE_LIB = {
  yandex_maps: { label: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", icon: "\u{1F5FA}\uFE0F", tier: "ok" },
  telegram: { label: "Telegram-\u043A\u0430\u043D\u0430\u043B", icon: "\u2708\uFE0F", tier: "ok" },
  twogis: { label: "2\u0413\u0418\u0421", icon: "\u{1F4CD}", tier: "ok" },
  avito: { label: "Avito-\u043F\u0440\u043E\u0444\u0438\u043B\u044C", icon: "\u{1F170}\uFE0F", tier: "ok" },
  website: { label: "\u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442", icon: "\u{1F310}", tier: "ok" },
  instagram: { label: "Instagram", icon: "\u{1F4F7}", tier: "ok-instagram" },
  vk: { label: "VK-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430", icon: "V", tier: "soon" },
  whatsapp: { label: "WhatsApp-\u043A\u0430\u0442\u0430\u043B\u043E\u0433", icon: "\u{1F7E2}", tier: "soon" },
  youtube: { label: "YouTube-\u043A\u0430\u043D\u0430\u043B", icon: "\u25B6\uFE0F", tier: "soon" },
  unknown: { label: "\u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438", icon: "?", tier: "unknown" }
};
function SourceBadge({ source, counts, url, onCorrect }) {
  const meta = SOURCE_LIB[source] || SOURCE_LIB.unknown;
  const tier = meta.tier;
  if (tier === "ok-instagram") {
    return /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: {
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
        /* @__PURE__ */ jsxs3("span", { children: [
          "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
          /* @__PURE__ */ jsx4("b", { children: "Instagram" }),
          /* @__PURE__ */ jsx4("span", { style: { color: "oklch(0.42 0.11 145)" }, children: " \xB7 \u043D\u0443\u0436\u0435\u043D \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: {
        padding: "12px 14px",
        background: VT.bgSoft,
        border: `1px dashed ${VT.line}`,
        borderRadius: VT.r.md,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx4("span", { style: { fontSize: 18 }, children: "\u{1F4F7}" }),
        /* @__PURE__ */ jsx4("span", { style: { flex: 1 }, children: "\u0418\u0437 Instagram \u043C\u044B \u0437\u0430\u0431\u0435\u0440\u0451\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u043E, \u0447\u0442\u043E \u0432\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0430\u043C\u0438 \u2014 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0448\u0430\u043F\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438 5\u201310 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442" }),
        /* @__PURE__ */ jsx4(Btn, { size: "sm", variant: "secondary", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u2192" })
      ] })
    ] });
  }
  if (tier === "ok") {
    return /* @__PURE__ */ jsxs3("div", { style: {
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
      /* @__PURE__ */ jsxs3("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx4("b", { children: meta.label }),
        counts ? /* @__PURE__ */ jsxs3("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx4("button", { style: {
        marginLeft: "auto",
        background: "transparent",
        border: "none",
        color: "oklch(0.38 0.12 145)",
        fontSize: 12,
        cursor: "pointer",
        textDecoration: "underline",
        textUnderlineOffset: 3,
        fontFamily: VT.font.sans
      }, children: "\u043D\u0435\xA0\u0442\u043E?" })
    ] });
  }
  if (tier === "soon") {
    return /* @__PURE__ */ jsxs3("div", { style: {
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.36 0.10 240)"
    }, children: [
      /* @__PURE__ */ jsx4("span", { style: { fontSize: 16 }, children: meta.icon }),
      /* @__PURE__ */ jsxs3("span", { children: [
        /* @__PURE__ */ jsx4("b", { children: meta.label }),
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A\xA0\u0434\u043E\u0431\u0430\u0432\u0438\u043C."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs3("div", { style: {
    padding: "12px 14px",
    background: VT.warnSoft,
    borderRadius: VT.r.md,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13.5,
    color: "oklch(0.42 0.13 70)"
  }, children: [
    /* @__PURE__ */ jsx4("span", { style: { fontSize: 16 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs3("span", { children: [
      "\u041D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438 \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443. \u0418\u043B\u0438 ",
      /* @__PURE__ */ jsx4("a", { style: { color: "oklch(0.42 0.13 70)", textDecoration: "underline" }, children: "\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u2192" })
    ] })
  ] });
}
function LinkInput({ value }) {
  return /* @__PURE__ */ jsxs3("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: VT.white,
    border: `1.5px solid ${VT.accent}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx4(IconLink, {}),
    /* @__PURE__ */ jsx4("span", { style: { flex: 1, fontFamily: VT.font.mono, fontSize: 14, color: VT.ink }, children: value }),
    /* @__PURE__ */ jsx4("span", { style: { color: VT.success, display: "inline-flex" }, children: /* @__PURE__ */ jsx4(Spinner, { size: 14 }) })
  ] });
}
function S3_Step1_Link({ url = "https://t.me/studia_anna", source = "telegram", counts = "\u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E" }) {
  return /* @__PURE__ */ jsxs3(ModalShell, { width: 520, children: [
    /* @__PURE__ */ jsx4(
      StepHeader,
      {
        step: 1,
        total: 3,
        title: "\u0414\u0430\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
        sub: "\u0427\u0442\u043E \u0443\xA0\u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u043E\u043D\u043B\u0430\u0439\u043D \u2014 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram-\u043A\u0430\u043D\u0430\u043B, 2\u0413\u0418\u0421 \u0438\u043B\u0438 \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      }
    ),
    /* @__PURE__ */ jsx4("label", { style: { display: "block", fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: "20px 0 6px" }, children: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A" }),
    /* @__PURE__ */ jsx4(LinkInput, { value: url }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx4(SourceBadge, { source, counts, url }) }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint }, children: [
      /* @__PURE__ */ jsx4(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u041F\u041E\u0414\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0415\u041C:" }),
      " ",
      "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 Telegram-\u043A\u0430\u043D\u0430\u043B \xB7 Instagram \xB7 2\u0413\u0418\u0421 \xB7 Avito \xB7 \u0432\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442 \xB7 \u0444\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438 \u043C\u0435\u043D\u044E"
    ] }),
    /* @__PURE__ */ jsx4("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx4(Btn, { style: { flex: 1 }, iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: 14, fontSize: 13, color: VT.inkSoft }, children: [
      "\u041D\u0435\u0442 \u043D\u0438\u0447\u0435\u0433\u043E \u043E\u043D\u043B\u0430\u0439\u043D? ",
      /* @__PURE__ */ jsx4("a", { style: { color: VT.accent, textDecoration: "underline" }, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438, \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438\xA0\u0440\u0430\u0431\u043E\u0442 \u2192" })
    ] })
  ] });
}
function ChannelOption({ value, label, hint, icon, selected }) {
  return /* @__PURE__ */ jsxs3("label", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: selected ? VT.accentSoft : VT.white,
    border: `1.5px solid ${selected ? VT.accent : VT.line}`,
    borderRadius: VT.r.md,
    cursor: "pointer"
  }, children: [
    /* @__PURE__ */ jsx4("span", { style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1.5px solid ${selected ? VT.accent : VT.line}`,
      background: VT.white,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto"
    }, children: selected && /* @__PURE__ */ jsx4("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }) }),
    /* @__PURE__ */ jsx4("span", { style: { fontSize: 16 }, children: icon }),
    /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 1 }, children: hint })
    ] })
  ] });
}
function ContactValueInput({ channel, value }) {
  const ph = {
    telegram: "@your_handle",
    phone: "+7 921 234-56-78",
    email: "you@example.ru",
    max: "@your_handle"
  }[channel] || "";
  return /* @__PURE__ */ jsxs3("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx4("span", { style: {
      fontFamily: VT.font.mono,
      fontSize: 15,
      color: value ? VT.ink : VT.inkFaint,
      flex: 1
    }, children: value || ph }),
    value && /* @__PURE__ */ jsx4("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: VT.success, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx4("path", { d: "M5 12l4 4 10-10" }) })
  ] });
}
function S3_Step2_Contact({ channel = "telegram", value = "@studia_anna" }) {
  return /* @__PURE__ */ jsxs3(ModalShell, { width: 520, children: [
    /* @__PURE__ */ jsx4(
      StepHeader,
      {
        step: 2,
        total: 2,
        title: "\u041A\u0443\u0434\u0430 \u0432\u0430\u043C \u043F\u0438\u0441\u0430\u0442\u044C?",
        sub: "\u041E\u0434\u0438\u043D \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u2014 \u0442\u0443\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\xA0\u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442 \u0438\xA0\u0437\u0430\u044F\u0432\u043A\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432."
      }
    ),
    /* @__PURE__ */ jsx4("label", { style: { display: "block", fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: "18px 0 8px" }, children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
    /* @__PURE__ */ jsxs3("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
      /* @__PURE__ */ jsx4(
        ChannelOption,
        {
          value: "telegram",
          label: "Telegram",
          hint: "\u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u043D\u0430\u0448 \u0431\u043E\u0442 \xB7 \u043C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u043E",
          icon: "\u2708\uFE0F",
          selected: channel === "telegram"
        }
      ),
      /* @__PURE__ */ jsx4(
        ChannelOption,
        {
          value: "phone",
          label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
          hint: "SMS-\u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
          icon: "\u{1F4F1}",
          selected: channel === "phone"
        }
      ),
      /* @__PURE__ */ jsx4(
        ChannelOption,
        {
          value: "email",
          label: "Email",
          hint: "\u043D\u0430 \u044F\u0449\u0438\u043A",
          icon: "\u{1F4E7}",
          selected: channel === "email"
        }
      ),
      /* @__PURE__ */ jsx4(
        ChannelOption,
        {
          value: "max",
          label: "MAX",
          hint: "\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440 \u043E\u0442 VK",
          icon: "\u{1F4AC}",
          selected: channel === "max"
        }
      )
    ] }),
    /* @__PURE__ */ jsx4("label", { style: { display: "block", fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: "18px 0 6px" }, children: channel === "phone" ? "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" : channel === "email" ? "Email" : channel === "max" ? "\u041B\u043E\u0433\u0438\u043D \u0432 MAX" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438\xA0\u043D\u043E\u043C\u0435\u0440)" }),
    /* @__PURE__ */ jsx4(ContactValueInput, { channel, value }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx4(Checkbox, { checked: true, label: /* @__PURE__ */ jsx4(Fragment3, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }) }),
    /* @__PURE__ */ jsx4("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 20 }, children: /* @__PURE__ */ jsx4(Btn, { style: { flex: 1 }, iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsx4(CaptchaNotice, {})
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs3("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: VT.inkMuted,
    marginTop: 10,
    fontFamily: VT.font.mono,
    letterSpacing: "0.02em"
  }, children: [
    /* @__PURE__ */ jsx4("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx4("path", { d: "M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" }) }),
    "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha \xB7 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E"
  ] });
}
function S3_Step3_TgBot() {
  return /* @__PURE__ */ jsxs3(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx4(
      StepHeader,
      {
        step: 3,
        total: 3,
        title: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u043E\u0442\u0430 \u043D\u0430 1 \u043C\u0438\u043D\u0443\u0442\u0443",
        sub: /* @__PURE__ */ jsxs3(Fragment3, { children: [
          "\u0427\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u0432\u0430\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0441\u0430\u0439\u0442 \u0438\xA0\u0437\u0430\u044F\u0432\u043A\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u2014 \u043D\u0430\u0439\u0434\u0438\u0442\u0435 \u0432 Telegram ",
          /* @__PURE__ */ jsx4("b", { children: BRAND.contactBot }),
          " \u0438\xA0\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0421\u0442\u0430\u0440\u0442\xBB."
        ] })
      }
    ),
    /* @__PURE__ */ jsx4("ol", { style: {
      margin: "20px 0 0",
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs3(Fragment3, { children: [
        "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 Telegram \u0438\xA0\u043D\u0430\u0439\u0434\u0438\u0442\u0435 ",
        /* @__PURE__ */ jsx4(Mono, { style: { fontSize: 13, color: VT.ink }, children: BRAND.contactBot })
      ] }),
      /* @__PURE__ */ jsxs3(Fragment3, { children: [
        "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ",
        /* @__PURE__ */ jsx4("b", { children: "\xAB\u0421\u0442\u0430\u0440\u0442\xBB" }),
        " \u2014 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u043D\u0435\xA0\u043D\u0443\u0436\u043D\u043E"
      ] }),
      /* @__PURE__ */ jsx4(Fragment3, { children: "\u041C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0441\u0430\u0439\u0442 \u0441\u044E\u0434\u0430 \u0436\u0435, \u0432\xA0\u043B\u0438\u0447\u043A\u0443" })
    ].map((line, i) => /* @__PURE__ */ jsxs3("li", { style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "12px 14px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md
    }, children: [
      /* @__PURE__ */ jsx4("span", { style: {
        width: 24,
        height: 24,
        borderRadius: "50%",
        background: VT.accent,
        color: VT.white,
        fontFamily: VT.font.mono,
        fontSize: 12,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flex: "0 0 auto",
        marginTop: 1
      }, children: i + 1 }),
      /* @__PURE__ */ jsx4("span", { style: { fontSize: 14, lineHeight: 1.5, color: VT.ink }, children: line })
    ] }, i)) }),
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.accentSoft,
      border: `1px solid ${VT.accentSoft}`,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsx4("div", { style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: VT.white,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }, children: "\u{1F916}" }),
      /* @__PURE__ */ jsxs3("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx4("div", { style: { fontFamily: VT.font.mono, fontSize: 15, fontWeight: 500 }, children: BRAND.contactBot }),
        /* @__PURE__ */ jsx4("div", { style: { fontSize: 12, color: VT.accentInk }, children: "\u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0432 Telegram" })
      ] }),
      /* @__PURE__ */ jsx4(Btn, { size: "sm", children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.bgSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      /* @__PURE__ */ jsx4("span", { style: { color: VT.accent, display: "inline-flex" }, children: /* @__PURE__ */ jsx4(Spinner, { size: 14 }) }),
      /* @__PURE__ */ jsx4("span", { children: "\u0416\u0434\u0451\u043C, \u043F\u043E\u043A\u0430 \u0432\u044B \u043D\u0430\u0436\u043C\u0451\u0442\u0435 \xAB\u0421\u0442\u0430\u0440\u0442\xBB\u2026" }),
      /* @__PURE__ */ jsx4(Mono, { style: { marginLeft: "auto", fontSize: 11 }, children: "5 \u0441\u0435\u043A" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: 14,
      fontSize: 13,
      color: VT.inkSoft,
      lineHeight: 1.5
    }, children: [
      "\u041D\u0435\u0442 Telegram \u0438\u043B\u0438\xA0\u043D\u0435\xA0\u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F?",
      " ",
      /* @__PURE__ */ jsx4("a", { style: { color: VT.accent, textDecoration: "underline", textUnderlineOffset: 3 }, children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443 \u2192" })
    ] })
  ] });
}
function S3_SubmitModal(props) {
  const {
    step = 1,
    source = "telegram",
    sourceUrl = "https://t.me/studia_anna",
    channel = "telegram",
    contact = "@studia_anna",
    counts = "\u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E"
  } = props;
  if (step === 1) return /* @__PURE__ */ jsx4(S3_Step1_Link, { url: sourceUrl, source, counts });
  if (step === 2) return /* @__PURE__ */ jsx4(S3_Step2_Contact, { channel, value: contact });
  return /* @__PURE__ */ jsx4(S3_Step1_Link, { url: sourceUrl, source, counts });
}
function S5_Confirmation({ contactType = "telegram" }) {
  const isTg = contactType === "telegram";
  return /* @__PURE__ */ jsx4("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: 32,
    letterSpacing: "-0.01em",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, children: /* @__PURE__ */ jsxs3("div", { style: { maxWidth: 560, width: "100%" }, children: [
    /* @__PURE__ */ jsx4(BrandMark, { size: 22, fontSize: 18 }),
    /* @__PURE__ */ jsx4("div", { style: {
      marginTop: 36,
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: VT.successSoft,
      color: VT.success,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsx4("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx4("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
    /* @__PURE__ */ jsx4("h1", { style: { fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", margin: "20px 0 12px", lineHeight: 1.1, textWrap: "balance" }, children: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442" }),
    /* @__PURE__ */ jsx4("p", { style: { fontSize: 18, lineHeight: 1.5, color: VT.inkSoft, margin: 0, maxWidth: 480 }, children: "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441\xA0\u0432\u0430\u043C\u0438 \u0438\xA0\u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 2\xA0\u0447\u0430\u0441\u043E\u0432" }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: 28 }, children: /* @__PURE__ */ jsx4(Btn, { variant: "secondary", iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430\xA0\u0433\u043B\u0430\u0432\u043D\u0443\u044E" }) })
  ] }) });
}
var ICP = [
  "\u041C\u0430\u043D\u0438\u043A\u044E\u0440",
  "\u0411\u0430\u0440\u0431\u0435\u0440",
  "\u0422\u0430\u0442\u0443-\u043C\u0430\u0441\u0442\u0435\u0440",
  "\u0424\u0438\u0442\u043D\u0435\u0441-\u0442\u0440\u0435\u043D\u0435\u0440",
  "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433",
  "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444",
  "\u041A\u043E\u043D\u0434\u0438\u0442\u0435\u0440",
  "\u041A\u0443\u043B\u0438\u043D\u0430\u0440",
  "\u0420\u0435\u043F\u0435\u0442\u0438\u0442\u043E\u0440",
  "\u041C\u0430\u0441\u0442\u0435\u0440 \u0440\u0435\u0441\u043D\u0438\u0446",
  "\u0411\u0440\u043E\u0432\u0438\u0441\u0442",
  "\u041F\u0440\u043E\u0447\u0435\u0435"
];
function PhotoThumb({ name, type, idx }) {
  return /* @__PURE__ */ jsxs3("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx4("div", { style: {
      width: 48,
      height: 48,
      borderRadius: 8,
      background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
      flex: "0 0 auto"
    } }),
    /* @__PURE__ */ jsxs3("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: "JPEG \xB7 2.4 MB" })
    ] }),
    /* @__PURE__ */ jsxs3("select", { defaultValue: type, style: {
      fontFamily: VT.font.sans,
      fontSize: 12.5,
      padding: "6px 8px",
      borderRadius: 8,
      border: `1px solid ${VT.line}`,
      background: VT.bgSoft,
      color: VT.ink
    }, children: [
      /* @__PURE__ */ jsx4("option", { value: "work", children: "\u0440\u0430\u0431\u043E\u0442\u0430" }),
      /* @__PURE__ */ jsx4("option", { value: "profile_screenshot", children: "\u0448\u0430\u043F\u043A\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044F" }),
      /* @__PURE__ */ jsx4("option", { value: "business_card", children: "\u0432\u0438\u0437\u0438\u0442\u043A\u0430" }),
      /* @__PURE__ */ jsx4("option", { value: "booklet", children: "\u0431\u0443\u043A\u043B\u0435\u0442" })
    ] }),
    /* @__PURE__ */ jsx4("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", style: {
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
function S6_PhotoDrawer({ variant = "desktop" }) {
  const Wrap = variant === "desktop" ? ModalShell : MobileSheet;
  return /* @__PURE__ */ jsxs3(Wrap, { width: 620, children: [
    /* @__PURE__ */ jsx4(
      StepHeader,
      {
        step: 1,
        total: 2,
        title: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E",
        sub: "\u0420\u0430\u0431\u043E\u0442\u044B, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0448\u0430\u043F\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F, \u0432\u0438\u0437\u0438\u0442\u043A\u0430 \u0438\u043B\u0438\xA0\u0431\u0443\u043A\u043B\u0435\u0442. \u041E\u0442 5 \u0434\u043E 30 \u0444\u0430\u0439\u043B\u043E\u0432, \u0434\u043E 10 \u041C\u0411 \u043A\u0430\u0436\u0434\u044B\u0439.",
        onBack: false
      }
    ),
    /* @__PURE__ */ jsxs3("div", { style: {
      marginTop: 18,
      border: `1.5px dashed ${VT.accent}`,
      background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
      borderRadius: VT.r.lg,
      padding: 28,
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 26, marginBottom: 6 }, children: "\u{1F4F7}" }),
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 15, fontWeight: 600 }, children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }),
      /* @__PURE__ */ jsx4("div", { style: { fontSize: 13, color: VT.inkSoft, margin: "4px 0 12px" }, children: "\u0438\u043B\u0438\xA0\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \xB7 JPEG / PNG / WebP / HEIC" }),
      /* @__PURE__ */ jsx4(Btn, { variant: "secondary", size: "sm", children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
        /* @__PURE__ */ jsx4(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 3 \u0418\u0417 30" }),
        /* @__PURE__ */ jsx4(Mono, { style: { fontSize: 11 }, children: "6.8 \u041C\u0411 \xB7 \u2264 100 \u041C\u0411" })
      ] }),
      /* @__PURE__ */ jsxs3("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
        /* @__PURE__ */ jsx4(PhotoThumb, { name: "IMG_2847.jpg", type: "work", idx: 0 }),
        /* @__PURE__ */ jsx4(PhotoThumb, { name: "profile-screenshot.png", type: "profile_screenshot", idx: 1 }),
        /* @__PURE__ */ jsx4(PhotoThumb, { name: "vizitka-front.jpg", type: "business_card", idx: 2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs3("div", { style: { marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsx4(FormField, { label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u0435\u043B\u0430", placeholder: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
      /* @__PURE__ */ jsx4(FormField, { label: "\u0413\u043E\u0440\u043E\u0434", placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A" }),
      /* @__PURE__ */ jsx4(FormField, { label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", placeholder: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", select: true, options: ICP }),
      /* @__PURE__ */ jsx4(FormField, { label: "Email", placeholder: "anya@example.com" }),
      /* @__PURE__ */ jsx4("div", { style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ jsx4(FormField, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", placeholder: "+7 921 234-56-78" }) })
    ] }),
    /* @__PURE__ */ jsx4("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx4(Checkbox, { checked: false, label: /* @__PURE__ */ jsx4(Fragment3, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }) }),
    /* @__PURE__ */ jsx4("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 18 }, children: /* @__PURE__ */ jsx4(Btn, { style: { flex: 1 }, iconRight: /* @__PURE__ */ jsx4(IconArrow, {}), children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0438\u0437\xA0\u0444\u043E\u0442\u043E" }) }),
    /* @__PURE__ */ jsx4(CaptchaNotice, {})
  ] });
}
function FormField({ label, placeholder, select, options = [] }) {
  return /* @__PURE__ */ jsxs3("div", { children: [
    /* @__PURE__ */ jsx4("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, fontWeight: 500, marginBottom: 4 }, children: label }),
    /* @__PURE__ */ jsxs3("div", { style: {
      padding: "10px 12px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
      fontSize: 14,
      color: VT.inkFaint,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsx4("span", { children: placeholder }),
      select && /* @__PURE__ */ jsx4("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx4("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) })
    ] })
  ] });
}
function MobileSheet({ children }) {
  return /* @__PURE__ */ jsx4("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: "rgba(0,0,0,0.32)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs3("div", { style: {
    width: "100%",
    background: VT.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 28,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx4("span", { "aria-hidden": "true", style: {
      display: "block",
      width: 42,
      height: 4,
      borderRadius: 2,
      background: VT.line,
      margin: "0 auto 14px"
    } }),
    children
  ] }) });
}
var SubmitModal = S3_SubmitModal;
var Confirmation = S5_Confirmation;
var PhotoDrawer = S6_PhotoDrawer;

// src/customer/index.tsx
import { Fragment as Fragment4, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs4("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: src ? "#222" : `
        radial-gradient(110% 80% at 30% 20%, ${c1} 0%, transparent 55%),
        radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%),
        linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)
      `,
    ...style
  }, children: [
    src && /* @__PURE__ */ jsx5(
      "img",
      {
        src,
        alt: "",
        loading: "lazy",
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
      }
    ),
    !src && /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
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
  return /* @__PURE__ */ jsx5("span", { style: {
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
  return /* @__PURE__ */ jsx5("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: filled ? "#f4a93b" : "none", stroke: filled ? "#f4a93b" : "#ccc", strokeWidth: "1.5", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" }) });
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
  return /* @__PURE__ */ jsxs4("header", { style: {
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
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsx5("div", { style: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.name })
    ] }),
    /* @__PURE__ */ jsx5("nav", { style: { display: "flex", alignItems: "center", gap: 22, marginLeft: 12, fontSize: 14, color: s.sub }, children: links.map(([label, href]) => /* @__PURE__ */ jsx5("a", { href, style: { color: "inherit", textDecoration: "none" }, children: label }, label)) }),
    /* @__PURE__ */ jsxs4("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxs4("a", { href: `tel:${STUDIO.phoneHref}`, style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: s.ink,
        textDecoration: "none",
        fontWeight: 500
      }, children: [
        /* @__PURE__ */ jsx5("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
        STUDIO.phone
      ] }),
      /* @__PURE__ */ jsx5("a", { href: "#book", style: {
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
  return /* @__PURE__ */ jsxs4("section", { style: {
    padding: "48px 36px 40px",
    borderBottom: `1px solid ${s.line}`,
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 36,
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsxs4("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent }, children: [
        STUDIO.category.toUpperCase(),
        " \xB7 ",
        STUDIO.city.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx5("h1", { style: {
        fontSize: 52,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.04,
        margin: "14px 0 16px",
        whiteSpace: "pre-line",
        textWrap: "balance"
      }, children: STUDIO.hero.title }),
      /* @__PURE__ */ jsx5("p", { style: { fontSize: 17, lineHeight: 1.5, color: s.sub, maxWidth: 480, margin: 0, textWrap: "pretty" }, children: STUDIO.hero.sub }),
      /* @__PURE__ */ jsxs4("div", { style: {
        marginTop: 24,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 999
      }, children: [
        /* @__PURE__ */ jsx5("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx5(CStar, { filled: true, size: 14 }, i)) }),
        /* @__PURE__ */ jsx5("span", { style: { fontWeight: 700, color: s.ink, fontSize: 14 }, children: STUDIO.trust.rating }),
        /* @__PURE__ */ jsxs4("span", { style: { color: s.sub, fontSize: 13 }, children: [
          "\xB7 ",
          STUDIO.trust.reviews,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs4("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx5(IconArrow, { size: 16 })
        ] }),
        /* @__PURE__ */ jsxs4("a", { href: `tel:${STUDIO.phoneHref}`, style: {
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
          /* @__PURE__ */ jsx5("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
          STUDIO.phone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4(CPhoto, { tone: s.photoTone, src: STUDIO_PHOTOS.hero, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` }, children: [
      /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)"
      } }),
      /* @__PURE__ */ jsxs4("div", { style: { position: "absolute", left: 20, bottom: 18, right: 20, color: "#fff" }, children: [
        /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", opacity: 0.9 }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0412 \u0426\u0415\u041D\u0422\u0420\u0415 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A\u0410" }),
        /* @__PURE__ */ jsx5("div", { style: { fontWeight: 600, fontSize: 15, marginTop: 4 }, children: STUDIO.address })
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
  return /* @__PURE__ */ jsxs4("section", { style: {
    padding: "20px 36px",
    background: s.bgAlt,
    borderBottom: `1px solid ${s.line}`,
    display: "flex",
    alignItems: "center",
    gap: 28,
    flexWrap: "wrap"
  }, children: [
    /* @__PURE__ */ jsxs4("div", { style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      fontFamily: VT.font.mono,
      fontSize: 12,
      letterSpacing: "0.1em",
      color: s.sub
    }, children: [
      "\u041D\u0410\u0421 \u0412\u042B\u0411\u0420\u0410\u041B\u0418",
      /* @__PURE__ */ jsx5("span", { style: { fontFamily: VT.font.sans, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.trust.clients }),
      /* @__PURE__ */ jsxs4("span", { children: [
        "\u0427\u0415\u041B\u041E\u0412\u0415\u041A \u0417\u0410 ",
        STUDIO.trust.years.toUpperCase()
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 18, marginLeft: "auto", flexWrap: "wrap" }, children: badges.map((b) => /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", flexDirection: "column", gap: 1 }, children: [
        /* @__PURE__ */ jsxs4("div", { style: { fontSize: 13, fontWeight: 600, color: s.ink, display: "flex", alignItems: "center", gap: 6 }, children: [
          b.stars,
          " ",
          /* @__PURE__ */ jsx5("span", { style: { color: "#f4a93b" }, children: "\u2605" }),
          /* @__PURE__ */ jsxs4("span", { style: { color: s.sub, fontWeight: 400 }, children: [
            "\xB7 ",
            b.name
          ] })
        ] }),
        /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: b.count })
      ] })
    ] }, b.name)) })
  ] });
}
function CustomerServices({ s }) {
  return /* @__PURE__ */ jsxs4("section", { id: "services", style: { padding: "52px 36px 40px", scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
        /* @__PURE__ */ jsx5("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u044F \u0434\u0435\u043B\u0430\u044E" })
      ] }),
      /* @__PURE__ */ jsx5(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u0446\u0435\u043D\u044B \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u044B 12 \u043C\u0430\u044F 2026" })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 14
    }, children: STUDIO.services.map((sv, i) => /* @__PURE__ */ jsxs4("article", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 16,
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      gridColumn: i === 0 && STUDIO.services.length % 2 === 1 ? "1 / -1" : "auto"
    }, children: [
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }, children: [
        /* @__PURE__ */ jsx5("h3", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", margin: 0, color: s.ink, lineHeight: 1.2 }, children: sv.name }),
        /* @__PURE__ */ jsxs4("div", { style: { textAlign: "right", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 18, fontWeight: 700, color: s.ink, letterSpacing: "-0.01em" }, children: sv.price }),
          sv.priceHint && /* @__PURE__ */ jsx5("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: sv.priceHint })
        ] })
      ] }),
      /* @__PURE__ */ jsx5("p", { style: { fontSize: 14, color: s.sub, lineHeight: 1.5, margin: 0, flex: 1 }, children: sv.desc }),
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }, children: [
        sv.dur && /* @__PURE__ */ jsxs4("span", { style: {
          fontFamily: VT.font.mono,
          fontSize: 12,
          color: s.sub,
          display: "inline-flex",
          alignItems: "center",
          gap: 5
        }, children: [
          /* @__PURE__ */ jsxs4("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "9" }),
            /* @__PURE__ */ jsx5("path", { d: "M12 7v5l3 2" })
          ] }),
          sv.dur
        ] }),
        /* @__PURE__ */ jsxs4("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx5(IconArrow, { size: 14 })
        ] })
      ] })
    ] }, sv.name)) })
  ] });
}
function ProcessIcon({ kind, color, soft }) {
  const sz = 26;
  const svg = {
    calendar: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
      /* @__PURE__ */ jsx5("path", { d: "M8 3v4M16 3v4M3 10h18" })
    ] }),
    pin: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
      /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "10", r: "3" })
    ] }),
    coffee: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx5("path", { d: "M4 8h13v5a5 5 0 0 1-5 5H9 a5 5 0 0 1-5-5z" }),
      /* @__PURE__ */ jsx5("path", { d: "M17 9 h2 a3 3 0 0 1 0 6 h-2" }),
      /* @__PURE__ */ jsx5("path", { d: "M7 4 c 0 1 1 1 1 2 s -1 1 -1 2" }),
      /* @__PURE__ */ jsx5("path", { d: "M11 4 c 0 1 1 1 1 2 s -1 1 -1 2" })
    ] }),
    sparkles: /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "currentColor", children: [
      /* @__PURE__ */ jsx5("path", { d: "M12 3 L13.4 8.2 L18.6 9 L13.4 9.8 L12 15 L10.6 9.8 L5.4 9 L10.6 8.2 Z" }),
      /* @__PURE__ */ jsx5("circle", { cx: "19", cy: "18", r: "1.6" }),
      /* @__PURE__ */ jsx5("circle", { cx: "6", cy: "19", r: "1.2" })
    ] })
  }[kind];
  return /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("section", { style: { padding: "40px 36px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, borderBottom: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041A\u0410\u041A \u0411\u0423\u0414\u0415\u0422" }),
      /* @__PURE__ */ jsxs4("h2", { style: { fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: [
        "\u041E\u0442 \u0437\u0430\u043F\u0438\u0441\u0438 \u0434\u043E\xA0\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u2014",
        /* @__PURE__ */ jsx5("br", {}),
        "\u0447\u0435\u0442\u044B\u0440\u0435 \u0448\u0430\u0433\u0430"
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      position: "relative"
    }, children: STUDIO.process.map((p, i) => /* @__PURE__ */ jsxs4("div", { style: { position: "relative" }, children: [
      i < STUDIO.process.length - 1 && /* @__PURE__ */ jsx5("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 26,
        right: -16,
        width: 32,
        height: 2,
        background: `repeating-linear-gradient(to right, ${s.line} 0 4px, transparent 4px 8px)`
      } }),
      /* @__PURE__ */ jsx5(ProcessIcon, { kind: icons[i], color: s.accent, soft: s.accentSoft }),
      /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsx5("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "4px 0 6px", color: s.ink }, children: p.title }),
      /* @__PURE__ */ jsx5("p", { style: { fontSize: 13.5, color: s.sub, lineHeight: 1.5, margin: 0 }, children: p.body })
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
  return /* @__PURE__ */ jsxs4("section", { style: { padding: "52px 36px 40px" }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041F\u041E\u0420\u0422\u0424\u041E\u041B\u0418\u041E" }),
        /* @__PURE__ */ jsx5("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0420\u0430\u0431\u043E\u0442\u044B" })
      ] }),
      /* @__PURE__ */ jsx5(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E" })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "170px",
      gap: 10
    }, children: tiles.map((t, i) => /* @__PURE__ */ jsx5(CPhoto, { tone: t.tone, src: t.src, style: {
      gridColumn: t.span === "l" ? "span 2" : "span 1",
      gridRow: t.span === "l" ? "span 2" : "span 1",
      borderRadius: 12,
      border: `1px solid ${s.line}`
    } }, i)) })
  ] });
}
function CustomerReviews({ s }) {
  return /* @__PURE__ */ jsxs4("section", { id: "reviews", style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E\u0422\u0417\u042B\u0412\u042B" }),
        /* @__PURE__ */ jsx5("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 8px", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u044F\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u044B" }),
        /* @__PURE__ */ jsxs4("div", { style: { fontSize: 14, color: s.sub, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx5("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx5(CStar, { filled: true, size: 14 }, i)) }),
          /* @__PURE__ */ jsx5("span", { style: { fontWeight: 600, color: s.ink }, children: "4.9 \u0438\u0437 5" }),
          /* @__PURE__ */ jsxs4("span", { children: [
            "\xB7 ",
            STUDIO.trust.reviews,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { style: {
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
        /* @__PURE__ */ jsx5("span", { style: { color: s.accent }, children: "\u2605" }),
        /* @__PURE__ */ jsx5("span", { children: "\u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0412\u042B\u0411\u0420\u0410\u041B \u0418\u0418 \xB7 \u041E\u0411\u041D\u041E\u0412\u041B\u042F\u0415\u0422\u0421\u042F \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u041E" })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }, children: STUDIO.reviews.map((r, i) => /* @__PURE__ */ jsxs4("div", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 14,
      padding: 20,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }, children: [
      r.curated && /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
        /* @__PURE__ */ jsx5(ReviewAvatar, { name: r.author, tone: r.tone, size: 36 }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx5("div", { style: { fontWeight: 600, fontSize: 14, color: s.ink, lineHeight: 1.1 }, children: r.author }),
          /* @__PURE__ */ jsx5("div", { style: { fontSize: 12, color: s.sub, fontFamily: VT.font.mono, marginTop: 2 }, children: r.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", gap: 2 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx5(CStar, { filled: j < r.stars, size: 13 }, j)) }),
      /* @__PURE__ */ jsxs4("p", { style: { fontSize: 14, lineHeight: 1.55, color: s.ink, margin: 0, textWrap: "pretty" }, children: [
        "\xAB",
        r.text,
        "\xBB"
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs4("div", { style: {
      marginTop: 28,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs4("a", { href: "#book", style: {
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
        /* @__PURE__ */ jsx5(IconArrow, { size: 16 })
      ] }),
      /* @__PURE__ */ jsx5(Mono, { style: { fontSize: 12, color: s.sub }, children: "\u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u043E\u043A\u043D\u043E \u2014 \u0447\u0435\u0442\u0432\u0435\u0440\u0433 14:00" })
    ] })
  ] });
}
function CustomerAbout({ s }) {
  return /* @__PURE__ */ jsxs4("section", { id: "about", style: {
    padding: "52px 36px",
    display: "grid",
    gridTemplateColumns: "0.8fr 1.2fr",
    gap: 36,
    alignItems: "flex-start",
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsx5("div", { children: /* @__PURE__ */ jsx5(CPhoto, { tone: "rose", src: STUDIO_PHOTOS.master, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` } }) }),
    /* @__PURE__ */ jsxs4("div", { children: [
      /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E \u041C\u0410\u0421\u0422\u0415\u0420\u0415" }),
      /* @__PURE__ */ jsx5("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 4px", lineHeight: 1.1 }, children: STUDIO.about.masterName }),
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 15, color: s.sub, marginBottom: 16 }, children: STUDIO.about.role }),
      /* @__PURE__ */ jsx5("p", { style: { fontSize: 15.5, lineHeight: 1.6, color: s.ink, margin: "0 0 22px", maxWidth: 560, textWrap: "pretty" }, children: STUDIO.about.bio }),
      /* @__PURE__ */ jsx5("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
        marginBottom: 24
      }, children: STUDIO.about.creds.map(([title, body]) => /* @__PURE__ */ jsxs4("div", { style: {
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 12,
        padding: "12px 14px"
      }, children: [
        /* @__PURE__ */ jsx5("div", { style: { fontSize: 13.5, fontWeight: 600, color: s.ink, letterSpacing: "-0.01em" }, children: title }),
        /* @__PURE__ */ jsx5("div", { style: { fontSize: 12, color: s.sub, marginTop: 2 }, children: body })
      ] }, title)) }),
      /* @__PURE__ */ jsx5("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }, children: "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442" }),
      /* @__PURE__ */ jsx5("ul", { style: { listStyle: "none", padding: 0, margin: 0, fontSize: 14.5, color: s.ink, display: "flex", flexDirection: "column", gap: 8 }, children: STUDIO.guarantees.map((item) => /* @__PURE__ */ jsxs4("li", { style: { display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.5 }, children: [
        /* @__PURE__ */ jsx5("span", { style: {
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
        }, children: /* @__PURE__ */ jsx5("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        item
      ] }, item)) })
    ] })
  ] });
}
function CustomerFaq({ s }) {
  return /* @__PURE__ */ jsxs4("section", { style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0427\u0410\u0421\u0422\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx5("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442" })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
      maxWidth: 760,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }, children: STUDIO.faq.map(([q, a], i) => /* @__PURE__ */ jsxs4("details", { open: i === 0, style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 12,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs4("summary", { style: {
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
        /* @__PURE__ */ jsx5("span", { style: { flex: 1 }, children: q }),
        /* @__PURE__ */ jsx5("span", { style: {
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
      /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { children: [
    label && /* @__PURE__ */ jsx5("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    border: `1px solid ${s.line}`,
    background: s.bgAlt,
    aspectRatio: "1 / 1",
    minHeight: 280
  }, children: [
    /* @__PURE__ */ jsxs4("svg", { viewBox: "0 0 400 400", width: "100%", height: "100%", style: { display: "block", opacity: 0.6 }, children: [
      /* @__PURE__ */ jsx5("defs", { children: /* @__PURE__ */ jsx5("pattern", { id: "grid-map", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx5("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: s.line, strokeWidth: "1" }) }) }),
      /* @__PURE__ */ jsx5("rect", { width: "400", height: "400", fill: "url(#grid-map)" }),
      /* @__PURE__ */ jsx5("path", { d: "M 0 220 Q 100 180, 180 220 T 400 200", fill: "none", stroke: s.accent, strokeWidth: "3", strokeLinecap: "round", opacity: "0.5" }),
      /* @__PURE__ */ jsx5("path", { d: "M 40 0 L 80 120 L 60 240 L 100 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx5("path", { d: "M 220 0 L 260 180 L 240 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx5("path", { d: "M 0 80 L 400 60", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" }),
      /* @__PURE__ */ jsx5("path", { d: "M 0 340 L 400 320", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsx5("div", { style: {
        background: s.accent,
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.35)",
        whiteSpace: "nowrap"
      }, children: STUDIO.name }),
      /* @__PURE__ */ jsx5("svg", { width: "22", height: "14", viewBox: "0 0 22 14", fill: s.accent, children: /* @__PURE__ */ jsx5("path", { d: "M0 0 L22 0 L11 14 Z" }) })
    ] }),
    /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("section", { id: "book", style: {
    padding: "52px 36px 40px",
    borderTop: `1px solid ${s.line}`,
    background: s.bg,
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx5("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0417\u0410\u041F\u0418\u0421\u042C" }),
      /* @__PURE__ */ jsx5("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 6px", lineHeight: 1.1 }, children: "\u0417\u0430\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043E\u043D\u043B\u0430\u0439\u043D \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434" }),
      /* @__PURE__ */ jsx5("p", { style: { fontSize: 15.5, color: s.sub, margin: 0 }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442. \u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\xA0\u043F\u0435\u0440\u0435\u0434\u0430\u0451\u043C \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C." })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx5("div", { style: {
        background: s.white,
        border: `1px solid ${s.line}`,
        borderRadius: 18,
        padding: 28
      }, children: confirmed ? /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: s.bgAlt, borderRadius: 12 }, children: [
        /* @__PURE__ */ jsx5("span", { style: { width: 40, height: 40, borderRadius: "50%", background: VT.successSoft, color: VT.success, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx5("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx5("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx5("div", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430" }),
          /* @__PURE__ */ jsx5("div", { style: { fontSize: 13.5, color: s.sub }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0430. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443." })
        ] })
      ] }) : /* @__PURE__ */ jsxs4(Fragment4, { children: [
        /* @__PURE__ */ jsxs4("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx5(CustomerInput, { label: "\u041A\u0430\u043A \u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442", placeholder: "\u0418\u043C\u044F", s }),
          /* @__PURE__ */ jsx5(CustomerInput, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", placeholder: "+7 ___ ___-__-__", s })
        ] }),
        /* @__PURE__ */ jsxs4("div", { style: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx5(CustomerSelect, { label: "\u0423\u0441\u043B\u0443\u0433\u0430", value: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", s }),
          /* @__PURE__ */ jsx5(CustomerSelect, { label: "\u0423\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F", value: "\u0437\u0430\u0432\u0442\u0440\u0430, \u043F\u043E\u0441\u043B\u0435 14:00", s })
        ] }),
        /* @__PURE__ */ jsx5(Mono, { style: { fontSize: 10, color: s.sub, marginTop: 10 }, children: `<input type="text" name="company" tabIndex={-1} style="display:none"> // honeypot` }),
        /* @__PURE__ */ jsx5("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx5(Checkbox, { checked: false, label: /* @__PURE__ */ jsx5(Fragment4, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430" }) }),
        /* @__PURE__ */ jsx5("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsxs4("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx5(IconArrow, { size: 16 })
        ] }) }),
        /* @__PURE__ */ jsx5(Mono, { style: { display: "block", fontSize: 11, color: s.sub, marginTop: 10, textAlign: "center" }, children: "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha \xB7 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E" }),
        /* @__PURE__ */ jsxs4("div", { style: {
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid ${s.line}`,
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsx5("div", { style: { fontSize: 13, color: s.sub, marginBottom: 10 }, children: "\u041D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u044B? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\xA0\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440:" }),
          /* @__PURE__ */ jsxs4("div", { style: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxs4("a", { href: `https://t.me/${STUDIO.tg.replace("@", "")}`, style: {
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
              /* @__PURE__ */ jsx5("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx5("path", { d: "M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" }) }),
              "Telegram"
            ] }),
            /* @__PURE__ */ jsxs4("a", { href: `https://wa.me/${STUDIO.whatsapp}`, style: {
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
              /* @__PURE__ */ jsx5("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx5("path", { d: "M12 2 A10 10 0 0 0 3 17 L2 22 L7 21 A10 10 0 1 0 12 2 Z M9 7 C 9.5 7 10 7.5 10.5 9 C 11 10 11 10.5 10 11 C 9.5 11.5 9 12 10 13 C 11 14 12 14.5 12.5 14 C 13 13 13.5 13 14.5 13.5 C 15.5 14 16 14.5 16 15 C 16 17 13 17 11 16 C 9 15 7 13 7 11 C 7 9 8 7 9 7 Z" }) }),
              "WhatsApp"
            ] }),
            /* @__PURE__ */ jsxs4("a", { href: `tel:${STUDIO.phoneHref}`, style: {
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
              /* @__PURE__ */ jsx5("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: /* @__PURE__ */ jsx5("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
              "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs4("div", { id: "contact", style: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        scrollMarginTop: 80
      }, children: [
        /* @__PURE__ */ jsx5(MapPlaceholder, { s }),
        /* @__PURE__ */ jsxs4("div", { style: {
          background: s.white,
          border: `1px solid ${s.line}`,
          borderRadius: 14,
          padding: "16px 18px"
        }, children: [
          /* @__PURE__ */ jsx5("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: s.accent,
            fontWeight: 600,
            marginBottom: 8
          }, children: "\u0413\u0414\u0415 \u0418 \u041A\u041E\u0413\u0414\u0410" }),
          /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }, children: [
            /* @__PURE__ */ jsx5("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs4("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx5("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
              /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "10", r: "3" })
            ] }) }),
            /* @__PURE__ */ jsx5("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.address })
          ] }),
          /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsx5("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs4("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx5("circle", { cx: "12", cy: "12", r: "9" }),
              /* @__PURE__ */ jsx5("path", { d: "M12 7v5l3 2" })
            ] }) }),
            /* @__PURE__ */ jsx5("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.hours })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function CustomerSelect({ label, value, s }) {
  return /* @__PURE__ */ jsxs4("div", { children: [
    label && /* @__PURE__ */ jsx5("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsx5("span", { children: value }),
      /* @__PURE__ */ jsx5("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("path", { d: "M6 9l6 6 6-6" }) })
    ] })
  ] });
}
function CustomerLeadForm({ s, confirmed = false }) {
  return /* @__PURE__ */ jsx5(CustomerBooking, { s, confirmed });
}
function CustomerFooter({ s, plan = "free" }) {
  return /* @__PURE__ */ jsxs4("footer", { style: {
    padding: "22px 36px 24px",
    borderTop: `1px solid ${s.line}`,
    background: s.bgAlt,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontSize: 13,
    color: s.sub
  }, children: [
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx5("span", { style: { color: s.ink, fontWeight: 600 }, children: STUDIO.name }),
        /* @__PURE__ */ jsxs4("span", { children: [
          "\xB7 ",
          STUDIO.address
        ] }),
        /* @__PURE__ */ jsx5("a", { href: `tel:${STUDIO.phoneHref}`, style: { color: "inherit", textDecoration: "none", fontFamily: VT.font.mono }, children: STUDIO.phone })
      ] }),
      /* @__PURE__ */ jsxs4("div", { style: { display: "flex", gap: 18, fontSize: 12.5 }, children: [
        /* @__PURE__ */ jsx5("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
        /* @__PURE__ */ jsx5("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 12 }, children: [
      /* @__PURE__ */ jsxs4("span", { children: [
        "\xA9 2026 ",
        STUDIO.name,
        ". \u0418\u041F \u041F\u0435\u0442\u0440\u043E\u0432\u0430 \u0410. \u0418., \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u0430\u044F."
      ] }),
      plan === "free" ? /* @__PURE__ */ jsxs4("a", { style: {
        color: s.sub,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: VT.font.mono,
        fontSize: 11.5
      }, children: [
        "\u0421\u0414\u0415\u041B\u0410\u041D\u041E \u041D\u0410 ",
        /* @__PURE__ */ jsx5("b", { style: { color: s.ink, fontFamily: VT.font.sans }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" }),
        " \u2192"
      ] }) : /* @__PURE__ */ jsx5("span", {})
    ] })
  ] });
}
function S7_CustomerSite({ scheme = "cream", plan = "free" }) {
  const s = SCHEMES[scheme];
  return /* @__PURE__ */ jsxs4("div", { style: { background: s.bg, color: s.ink, fontFamily: VT.font.sans, minHeight: "100%", letterSpacing: "-0.005em", position: "relative" }, children: [
    /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsx5("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx5("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx5("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx5("span", { style: { marginLeft: 12 }, children: "studia-anna.samosite.online" })
    ] }),
    /* @__PURE__ */ jsx5(CustomerHeader, { s }),
    /* @__PURE__ */ jsx5(CustomerHero, { s }),
    /* @__PURE__ */ jsx5(CustomerSocialBar, { s }),
    /* @__PURE__ */ jsx5(CustomerServices, { s }),
    /* @__PURE__ */ jsx5(CustomerProcess, { s }),
    /* @__PURE__ */ jsx5(CustomerGallery, { s }),
    /* @__PURE__ */ jsx5(CustomerReviews, { s }),
    /* @__PURE__ */ jsx5(CustomerAbout, { s }),
    /* @__PURE__ */ jsx5(CustomerFaq, { s }),
    /* @__PURE__ */ jsx5(CustomerBooking, { s }),
    /* @__PURE__ */ jsx5(CustomerFooter, { s, plan })
  ] });
}
function S8_LeadFormConfirm() {
  const s = SCHEMES.cream;
  return /* @__PURE__ */ jsx5("div", { style: { background: s.bg, fontFamily: VT.font.sans, padding: 24 }, children: /* @__PURE__ */ jsx5(CustomerLeadForm, { s, confirmed: true }) });
}
function S7_SchemeSwatches() {
  return /* @__PURE__ */ jsx5("div", { style: {
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
    return /* @__PURE__ */ jsxs4("div", { style: { width: 200 }, children: [
      /* @__PURE__ */ jsxs4("div", { style: {
        height: 110,
        borderRadius: VT.r.md,
        overflow: "hidden",
        border: `1px solid ${s.line}`,
        background: s.bg,
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ jsx5("div", { style: { flex: 1, padding: 12, color: s.ink, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
        /* @__PURE__ */ jsx5("div", { style: { height: 8, background: s.accent } }),
        /* @__PURE__ */ jsx5("div", { style: { display: "flex", gap: 4, padding: 8 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx5("div", { style: { flex: 1, height: 14, borderRadius: 3, background: s.accentSoft } }, i)) })
      ] }),
      /* @__PURE__ */ jsx5("div", { style: { marginTop: 8, fontSize: 13, fontWeight: 600 }, children: name }),
      /* @__PURE__ */ jsx5("div", { style: { fontSize: 12, color: VT.inkFaint }, children: hint })
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
  return /* @__PURE__ */ jsxs4(Card, { style: { padding: 22 }, children: [
    /* @__PURE__ */ jsx5("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: title }),
    /* @__PURE__ */ jsx5("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: "\u041F\u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0433\u0430\u043B\u043E\u0447\u043A\u0443 \u043D\u0430\u043F\u0440\u043E\u0442\u0438\u0432 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E\xA0\u043D\u0443\u0436\u043D\u043E. \u041A\u043E\u0433\u0434\u0430 \u0441\u043E\u0431\u0435\u0440\u0451\u043C 10 \u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u2014 \u0434\u043E\u0431\u0430\u0432\u0438\u043C." }),
    /* @__PURE__ */ jsx5("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }, children: items.map(([key, label]) => /* @__PURE__ */ jsx5(Checkbox, { checked: false, label }, key)) }),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 14 }, children: [
      /* @__PURE__ */ jsx5("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u0421\u0432\u043E\u0451 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)" }),
      /* @__PURE__ */ jsx5("div", { style: {
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
  return /* @__PURE__ */ jsxs4("div", { style: {
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "24px 40px 48px",
    minHeight: "100%",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsx5("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px", lineHeight: 1.15 }, children: "\u0421\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0435\u0433\u043E\xA0\u043D\u0435\xA0\u0445\u0432\u0430\u0442\u0430\u0435\u0442" }),
    /* @__PURE__ */ jsx5("p", { style: { fontSize: 14, color: VT.inkSoft, maxWidth: 600, margin: "0 0 18px" }, children: "\u0414\u0435\u043B\u0430\u0435\u043C \u043F\u043E\xA0\u0437\u0430\u043F\u0440\u043E\u0441\u0443. \u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u043B\u044E\u0434\u0435\u0439 \u043F\u0440\u043E\u0441\u044F\u0442 \u043E\u0434\u043D\u043E \u0438\xA0\u0442\u043E\xA0\u0436\u0435 \u2014 \u0442\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C" }),
    /* @__PURE__ */ jsx5(Card, { style: { padding: 16 }, children: /* @__PURE__ */ jsxs4("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5("label", { style: { display: "block", fontSize: 11.5, color: VT.inkSoft, marginBottom: 4 }, children: "\u041A\u0430\u043A\xA0\u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442" }),
        /* @__PURE__ */ jsx5("div", { style: { padding: "8px 10px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 13.5, color: VT.inkFaint }, children: "\u0438\u043C\u044F" })
      ] }),
      /* @__PURE__ */ jsxs4("div", { children: [
        /* @__PURE__ */ jsx5("label", { style: { display: "block", fontSize: 11.5, color: VT.inkSoft, marginBottom: 4 }, children: "Email, \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438\xA0@telegram" }),
        /* @__PURE__ */ jsx5("div", { style: { padding: "8px 10px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 13.5, color: VT.inkFaint }, children: "\u043A\u043E\u043D\u0442\u0430\u043A\u0442" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs4("div", { style: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsx5(FBSection, { title: "\u0425\u043E\u0447\u0443 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A", items: WAITLIST_SOURCES }),
      /* @__PURE__ */ jsx5(FBSection, { title: "\u0425\u043E\u0447\u0443 \u0444\u0438\u0447\u0443", items: FEATURE_LIST })
    ] }),
    /* @__PURE__ */ jsxs4(Card, { style: { marginTop: 12, padding: 16 }, children: [
      /* @__PURE__ */ jsx5("label", { style: { display: "block", fontSize: 11.5, color: VT.inkSoft, marginBottom: 4 }, children: "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 (\u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E)" }),
      /* @__PURE__ */ jsx5("div", { style: { padding: "8px 10px", background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 13.5, color: VT.inkFaint, minHeight: 72 }, children: "\u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C" }),
      /* @__PURE__ */ jsx5("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 12 }, children: /* @__PURE__ */ jsx5(Btn, { size: "sm", children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C" }) })
    ] }),
    /* @__PURE__ */ jsxs4("div", { style: {
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
      /* @__PURE__ */ jsx5("span", { style: { fontSize: 16 }, children: "\u{1F4AC}" }),
      "\u0427\u0435\u0433\u043E\xA0\u043D\u0435\xA0\u0445\u0432\u0430\u0442\u0430\u0435\u0442?"
    ] })
  ] });
}
var CustomerSite = S7_CustomerSite;
var LeadForm = S8_LeadFormConfirm;
var FeedbackPage = S9_FeedbackPage;

// src/admin-demo/index.tsx
import { useState } from "react";
import { Fragment as Fragment6, jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsxs5("svg", { ...props, children: [
        /* @__PURE__ */ jsx6("path", { d: "M4 20V12" }),
        /* @__PURE__ */ jsx6("path", { d: "M10 20V6" }),
        /* @__PURE__ */ jsx6("path", { d: "M16 20V14" }),
        /* @__PURE__ */ jsx6("path", { d: "M22 20V9" })
      ] });
    case "site":
      return /* @__PURE__ */ jsxs5("svg", { ...props, children: [
        /* @__PURE__ */ jsx6("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2" }),
        /* @__PURE__ */ jsx6("path", { d: "M3 8h18" }),
        /* @__PURE__ */ jsx6("circle", { cx: "7", cy: "6", r: "0.5", fill: "currentColor" })
      ] });
    case "inbox":
      return /* @__PURE__ */ jsxs5("svg", { ...props, children: [
        /* @__PURE__ */ jsx6("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
        /* @__PURE__ */ jsx6("path", { d: "M3 14h5l1.5 2h5L16 14h5" })
      ] });
    case "star":
      return /* @__PURE__ */ jsx6("svg", { ...props, fill: "currentColor", stroke: "none", children: /* @__PURE__ */ jsx6("path", { d: "M12 2 L14.5 8.5 L21.5 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.5 9.3 L9.5 8.5 Z" }) });
    case "list":
      return /* @__PURE__ */ jsxs5("svg", { ...props, children: [
        /* @__PURE__ */ jsx6("path", { d: "M8 6h13" }),
        /* @__PURE__ */ jsx6("path", { d: "M8 12h13" }),
        /* @__PURE__ */ jsx6("path", { d: "M8 18h13" }),
        /* @__PURE__ */ jsx6("circle", { cx: "4", cy: "6", r: "1.2" }),
        /* @__PURE__ */ jsx6("circle", { cx: "4", cy: "12", r: "1.2" }),
        /* @__PURE__ */ jsx6("circle", { cx: "4", cy: "18", r: "1.2" })
      ] });
    case "gear":
      return /* @__PURE__ */ jsxs5("svg", { ...props, children: [
        /* @__PURE__ */ jsx6("circle", { cx: "12", cy: "12", r: "3" }),
        /* @__PURE__ */ jsx6("path", { d: "M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" })
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 6
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: { fontSize: 12.5, color: VT.inkFaint, fontWeight: 500, letterSpacing: "-0.005em" }, children: label }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
      /* @__PURE__ */ jsx6("span", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink, lineHeight: 1 }, children: value }),
      /* @__PURE__ */ jsxs5("span", { style: {
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
    /* @__PURE__ */ jsxs5("svg", { viewBox: `0 0 ${w} ${h}`, width: "100%", height: h, style: { marginTop: 4 }, children: [
      /* @__PURE__ */ jsx6("path", { d: area, fill: color, fillOpacity: "0.12" }),
      /* @__PURE__ */ jsx6("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "\u0422\u0440\u0430\u0444\u0438\u043A \u0437\u0430 30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 13, color: VT.inkFaint, marginTop: 2 }, children: "\u041A\u0430\u0436\u0434\u0430\u044F \u0442\u043E\u0447\u043A\u0430 \u2014 \u0434\u0435\u043D\u044C. \u0417\u0430\u044F\u0432\u043A\u0438 \u0438\u0434\u0443\u0442 \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044F\u043C." })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "inline-flex", gap: 14, fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs5("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx6("span", { style: { width: 10, height: 10, borderRadius: "50%", background: VT.accent } }),
          "\u041F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"
        ] }),
        /* @__PURE__ */ jsxs5("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx6("span", { style: { width: 10, height: 2, background: "oklch(0.5 0.13 240)" } }),
          "\u0417\u0430\u044F\u0432\u043A\u0438"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: H, style: { display: "block" }, children: [
      [0, 0.25, 0.5, 0.75, 1].map((t, i) => /* @__PURE__ */ jsxs5("g", { children: [
        /* @__PURE__ */ jsx6(
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
        /* @__PURE__ */ jsx6("text", { x: PAD.left - 8, y: PAD.top + inner.h * t + 4, fontSize: "10", fill: VT.inkFaint, textAnchor: "end", fontFamily: VT.font.mono, children: Math.round(maxV * (1 - t)) })
      ] }, i)),
      /* @__PURE__ */ jsx6("path", { d: visitsArea, fill: VT.accent, fillOpacity: "0.10" }),
      /* @__PURE__ */ jsx6("path", { d: visitsPath, fill: "none", stroke: VT.accent, strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" }),
      leads.map((l, i) => /* @__PURE__ */ jsx6(
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
      xLabels.map((i, k) => /* @__PURE__ */ jsx6("text", { x: xFor(i), y: H - 8, fontSize: "11", fill: VT.inkFaint, textAnchor: "middle", children: xLabelText[k] }, k))
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    padding: 22
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 4 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442" }),
    /* @__PURE__ */ jsxs5("div", { style: { fontSize: 13, color: VT.inkFaint, marginBottom: 16 }, children: [
      "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0441\u0430\u043C\u044B\u0439 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0439 \u043A\u0430\u043D\u0430\u043B. ",
      BRAND.name,
      " \u0434\u0435\u0440\u0436\u0438\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443 \u0441\u0432\u0435\u0436\u0435\u0439."
    ] }),
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", height: 14, borderRadius: 7, overflow: "hidden" }, children: sources.map((s) => /* @__PURE__ */ jsx6("span", { style: { width: `${s.share}%`, background: s.color } }, s.name)) }),
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexDirection: "column", gap: 8, marginTop: 14 }, children: sources.map((s) => /* @__PURE__ */ jsxs5("div", { style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: VT.ink
    }, children: [
      /* @__PURE__ */ jsx6("span", { style: { width: 12, height: 12, borderRadius: 3, background: s.color, flex: "0 0 auto" } }),
      /* @__PURE__ */ jsx6("span", { style: { flex: 1 }, children: s.name }),
      /* @__PURE__ */ jsxs5("b", { style: { fontFamily: VT.font.mono, color: VT.ink }, children: [
        s.share,
        "%"
      ] })
    ] }, s.name)) })
  ] });
}
function AnalyticsTab() {
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsx6(
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
      /* @__PURE__ */ jsx6(
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
      /* @__PURE__ */ jsx6(
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
      /* @__PURE__ */ jsx6(
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
    /* @__PURE__ */ jsx6(TrafficChart, {}),
    /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsx6(SourceBreakdown, {}),
      /* @__PURE__ */ jsxs5("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 16,
        padding: 22
      }, children: [
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em", marginBottom: 16 }, children: "\u0421\u0432\u043E\u0434\u043A\u0430 \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E" }),
        /* @__PURE__ */ jsx6("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }, children: [
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u0434\u0435\u043D\u044C", "\u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u2014 142 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F, 8 \u0437\u0430\u044F\u0432\u043E\u043A"],
          ["\u041B\u0443\u0447\u0448\u0438\u0439 \u043A\u0430\u043D\u0430\u043B", "\u042F.\u041A\u0430\u0440\u0442\u044B \u2014 \u0432\u044B\u0440\u043E\u0441\u043B\u0438 \u043D\u0430 +24% \u0437\u0430\xA0\u043D\u0435\u0434\u0435\u043B\u044E"],
          ["\u041B\u0443\u0447\u0448\u0430\u044F \u0443\u0441\u043B\u0443\u0433\u0430", "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435 \u2014 12 \u0437\u0430\u043F\u0438\u0441\u0435\u0439"],
          ["\u0427\u0442\u043E \u043E\u0431\u043D\u043E\u0432\u0438\u043B\u043E\u0441\u044C", "\u0421\u0432\u0435\u0436\u0438\u0435 3 \u0444\u043E\u0442\u043E \u0438\u0437 Telegram + 1 \u043D\u043E\u0432\u044B\u0439 \u043E\u0442\u0437\u044B\u0432 \u0441\xA0\u042F.\u041A\u0430\u0440\u0442"]
        ].map(([k, v]) => /* @__PURE__ */ jsxs5("li", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: [
          /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.08em", color: VT.inkFaint }, children: k.toUpperCase() }),
          /* @__PURE__ */ jsx6("span", { style: { fontSize: 14, color: VT.ink }, children: v })
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
  return /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16, alignItems: "flex-start" }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      padding: 22,
      position: "sticky",
      top: 88
    }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }, children: [
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: "\u041F\u0440\u0435\u0432\u044C\u044E" }),
        /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 11.5 }, children: DEMO_SITE.domain })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: {
        background: VT.bgSoft,
        borderRadius: 10,
        overflow: "hidden",
        border: `1px solid ${VT.line}`
      }, children: [
        /* @__PURE__ */ jsxs5("div", { style: { padding: "24px 22px" }, children: [
          /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", color: accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx6("h2", { style: {
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: "-0.025em",
            margin: "10px 0 8px",
            lineHeight: 1.1,
            color: VT.ink,
            textWrap: "balance"
          }, children: title }),
          /* @__PURE__ */ jsx6("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: 0, lineHeight: 1.5 }, children: sub }),
          /* @__PURE__ */ jsx6("div", { style: {
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
        /* @__PURE__ */ jsx6("div", { style: { borderTop: `1px solid ${VT.line}`, padding: 14, background: VT.white }, children: Object.entries({
          services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
          reviews: "\u041E\u0442\u0437\u044B\u0432\u044B \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432",
          gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
          faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
          map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
        }).map(([k, label]) => /* @__PURE__ */ jsxs5("div", { style: {
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 0",
          borderBottom: `1px solid ${VT.lineSoft}`,
          fontSize: 13,
          color: sections[k] ? VT.ink : VT.inkFaint,
          textDecoration: sections[k] ? "none" : "line-through"
        }, children: [
          /* @__PURE__ */ jsx6("span", { style: { color: sections[k] ? VT.success : VT.inkMuted, fontSize: 14 }, children: sections[k] ? "\u25CF" : "\u25CB" }),
          label
        ] }, k)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
      /* @__PURE__ */ jsx6(EditorBlock, { title: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A (H1)", children: /* @__PURE__ */ jsx6(
        "textarea",
        {
          value: title,
          onChange: (e) => setTitle(e.target.value),
          rows: 2,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsx6(EditorBlock, { title: "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A", children: /* @__PURE__ */ jsx6(
        "textarea",
        {
          value: sub,
          onChange: (e) => setSub(e.target.value),
          rows: 3,
          style: editorTextarea
        }
      ) }),
      /* @__PURE__ */ jsxs5(EditorBlock, { title: "\u0426\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u0430", children: [
        /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 8 }, children: accentSwatches.map((c) => /* @__PURE__ */ jsx6("button", { onClick: () => setAccent(c), style: {
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
        /* @__PURE__ */ jsx6("div", { style: { marginTop: 8, fontSize: 12, color: VT.inkFaint, fontFamily: VT.font.mono }, children: accent })
      ] }),
      /* @__PURE__ */ jsx6(EditorBlock, { title: "Hero-\u0444\u043E\u0442\u043E", children: /* @__PURE__ */ jsxs5("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "10px 12px",
        background: VT.bgSoft,
        borderRadius: 10
      }, children: [
        /* @__PURE__ */ jsx6("div", { style: {
          width: 48,
          height: 48,
          borderRadius: 8,
          background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
          border: `1px solid ${VT.line}`
        } }),
        /* @__PURE__ */ jsx6("div", { style: { flex: 1, fontSize: 13, color: VT.inkSoft }, children: "hero-anna-1.jpg \xB7 1.2 MB" }),
        /* @__PURE__ */ jsx6("button", { style: editorSecondaryBtn, children: "\u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C" })
      ] }) }),
      /* @__PURE__ */ jsx6(EditorBlock, { title: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0435\u043A\u0446\u0438\u0438", children: /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: Object.entries({
        services: "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B",
        reviews: "\u041E\u0442\u0437\u044B\u0432\u044B (\u2605 \u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0432\u044B\u0431\u0440\u0430\u043D\u044B \u0418\u0418)",
        gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F \u0440\u0430\u0431\u043E\u0442",
        faq: "\u0427\u0430\u0441\u0442\u044B\u0435 \u0432\u043E\u043F\u0440\u043E\u0441\u044B",
        map: "\u041A\u0430\u0440\u0442\u0430 \u0438\xA0\u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
      }).map(([k, label]) => /* @__PURE__ */ jsxs5("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "6px 0",
        cursor: "pointer",
        fontSize: 14,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx6("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: sections[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx6("span", { style: {
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
        /* @__PURE__ */ jsx6("input", { type: "checkbox", checked: sections[k], onChange: () => togSection(k), style: { display: "none" } }),
        label
      ] }, k)) }) }),
      /* @__PURE__ */ jsx6("button", { style: {
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 14,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx6("div", { style: { fontSize: 12, fontWeight: 600, color: VT.inkFaint, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }, children: title }),
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
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsx6("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: filters.map(([id, label, count]) => /* @__PURE__ */ jsxs5("button", { onClick: () => setFilter(id), style: {
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
      /* @__PURE__ */ jsx6("span", { style: {
        padding: "1px 7px",
        borderRadius: 999,
        background: filter === id ? "rgba(255,255,255,0.18)" : VT.bgSoft,
        fontSize: 11,
        fontFamily: VT.font.mono
      }, children: count })
    ] }, id)) }),
    /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 16,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs5("div", { style: {
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
        /* @__PURE__ */ jsx6("span", { children: "\u0418\u041C\u042F" }),
        /* @__PURE__ */ jsx6("span", { children: "\u041A\u041E\u041D\u0422\u0410\u041A\u0422" }),
        /* @__PURE__ */ jsx6("span", { children: "\u0423\u0421\u041B\u0423\u0413\u0410" }),
        /* @__PURE__ */ jsx6("span", { children: "\u041A\u041E\u0413\u0414\u0410" }),
        /* @__PURE__ */ jsx6("span", { children: "\u041A\u0410\u041D\u0410\u041B" }),
        /* @__PURE__ */ jsx6("span", { children: "\u0421\u0422\u0410\u0422\u0423\u0421" }),
        /* @__PURE__ */ jsx6("span", { children: "\u0414\u0415\u0419\u0421\u0422\u0412\u0418\u042F" })
      ] }),
      filtered.map((l) => /* @__PURE__ */ jsxs5("div", { style: {
        display: "grid",
        gridTemplateColumns: "1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr",
        padding: "14px 18px",
        borderBottom: `1px solid ${VT.lineSoft}`,
        alignItems: "center",
        fontSize: 13.5,
        color: VT.ink
      }, children: [
        /* @__PURE__ */ jsx6("span", { style: { fontWeight: 600 }, children: l.name }),
        /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, color: VT.inkSoft }, children: l.contact }),
        /* @__PURE__ */ jsx6("span", { children: l.service }),
        /* @__PURE__ */ jsx6("span", { style: { color: VT.inkSoft }, children: l.when }),
        /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: l.source }),
        /* @__PURE__ */ jsx6("span", { children: /* @__PURE__ */ jsx6("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: statusInfo[l.status].bg,
          color: statusInfo[l.status].fg,
          fontSize: 11.5,
          fontWeight: 600
        }, children: statusInfo[l.status].label }) }),
        /* @__PURE__ */ jsxs5("span", { style: { display: "flex", gap: 6 }, children: [
          l.status === "new" && /* @__PURE__ */ jsxs5(Fragment6, { children: [
            /* @__PURE__ */ jsx6("button", { onClick: () => setStatus(l.id, "booked"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.accent,
              color: "#fff",
              border: "none",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer"
            }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C" }),
            /* @__PURE__ */ jsx6("button", { onClick: () => setStatus(l.id, "declined"), style: {
              padding: "5px 10px",
              borderRadius: 6,
              background: VT.white,
              color: VT.inkSoft,
              border: `1px solid ${VT.line}`,
              fontSize: 11.5,
              cursor: "pointer"
            }, children: "\xD7" })
          ] }),
          l.status === "answered" && /* @__PURE__ */ jsx6("button", { onClick: () => setStatus(l.id, "booked"), style: {
            padding: "5px 10px",
            borderRadius: 6,
            background: VT.accent,
            color: "#fff",
            border: "none",
            fontSize: 11.5,
            fontWeight: 600,
            cursor: "pointer"
          }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u043D" }),
          (l.status === "booked" || l.status === "declined") && /* @__PURE__ */ jsx6("span", { style: { color: VT.inkFaint, fontSize: 11.5 }, children: "\u2014" })
        ] })
      ] }, l.id)),
      filtered.length === 0 && /* @__PURE__ */ jsx6("div", { style: { padding: 40, textAlign: "center", color: VT.inkFaint }, children: "\u0417\u0430\u044F\u0432\u043E\u043A \u0432\xA0\u044D\u0442\u043E\u043C \u0441\u0442\u0430\u0442\u0443\u0441\u0435 \u043D\u0435\u0442" })
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
  return /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
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
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx6("div", { style: { fontSize: 16, fontWeight: 700, color: VT.ink, letterSpacing: "-0.02em" }, children: "AI-\u043A\u0443\u0440\u0430\u0442\u043E\u0440\u0441\u0442\u0432\u043E \u043E\u0442\u0437\u044B\u0432\u043E\u0432" }),
        /* @__PURE__ */ jsxs5("div", { style: { fontSize: 13.5, color: VT.inkSoft, marginTop: 2 }, children: [
          "\u041D\u0430 \u0441\u0430\u0439\u0442\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E ",
          /* @__PURE__ */ jsx6("b", { children: shownCount }),
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u0438\u0437 ",
          reviews.length,
          ". ",
          BRAND.name,
          " \u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 4\u20136 \u0441\u0430\u043C\u044B\u0445 \u0442\u0451\u043F\u043B\u044B\u0445."
        ] })
      ] }),
      /* @__PURE__ */ jsx6("button", { style: {
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
    /* @__PURE__ */ jsx6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: reviews.map((r) => /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: r.shown ? `1px solid ${VT.line}` : `1px dashed ${VT.line}`,
      borderRadius: 14,
      padding: 16,
      opacity: r.shown ? 1 : 0.55,
      position: "relative"
    }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "flex-start", gap: 10 }, children: [
        /* @__PURE__ */ jsx6("span", { style: {
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
        /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsxs5("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
            /* @__PURE__ */ jsx6("span", { style: { fontSize: 13.5, fontWeight: 600, color: VT.ink }, children: r.author }),
            r.topPick && /* @__PURE__ */ jsx6("span", { style: {
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
          /* @__PURE__ */ jsxs5("div", { style: {
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
      /* @__PURE__ */ jsxs5("p", { style: {
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
      /* @__PURE__ */ jsxs5("label", { style: {
        marginTop: 12,
        display: "flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        fontSize: 12.5,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx6("span", { style: {
          width: 30,
          height: 18,
          borderRadius: 9,
          background: r.shown ? VT.success : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx6("span", { style: {
          position: "absolute",
          top: 2,
          left: r.shown ? 14 : 2,
          width: 14,
          height: 14,
          borderRadius: "50%",
          background: "#fff",
          transition: "left .15s"
        } }) }),
        /* @__PURE__ */ jsx6("input", { type: "checkbox", checked: r.shown, onChange: () => toggleShown(r.id), style: { display: "none" } }),
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: 16,
    overflow: "hidden"
  }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
      padding: "14px 22px",
      background: VT.bgSoft,
      borderBottom: `1px solid ${VT.line}`,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }, children: [
      /* @__PURE__ */ jsxs5("div", { style: { fontSize: 15, fontWeight: 600, color: VT.ink }, children: [
        "\u0423\u0441\u043B\u0443\u0433\u0438 \u0438\xA0\u0446\u0435\u043D\u044B \u2014 ",
        services.length
      ] }),
      /* @__PURE__ */ jsx6("button", { style: {
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
    services.map((sv) => /* @__PURE__ */ jsx6("div", { style: {
      display: "grid",
      gridTemplateColumns: "1.5fr 0.8fr 0.8fr 0.6fr",
      padding: "14px 22px",
      borderBottom: `1px solid ${VT.lineSoft}`,
      alignItems: "center",
      gap: 10
    }, children: edit === sv.id ? /* @__PURE__ */ jsxs5(Fragment6, { children: [
      /* @__PURE__ */ jsx6(
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
      /* @__PURE__ */ jsx6("input", { defaultValue: sv.duration, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx6("input", { defaultValue: sv.price, style: { ...editorTextarea, padding: "6px 10px", fontFamily: VT.font.mono } }),
      /* @__PURE__ */ jsx6("button", { onClick: () => setEdit(null), style: { ...editorSecondaryBtn, fontSize: 12 }, children: "OK" })
    ] }) : /* @__PURE__ */ jsxs5(Fragment6, { children: [
      /* @__PURE__ */ jsx6("span", { style: { fontSize: 14, color: VT.ink, fontWeight: 500 }, children: sv.name }),
      /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 12.5, color: VT.inkSoft }, children: sv.duration || "\u2014" }),
      /* @__PURE__ */ jsx6("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }, children: sv.price }),
      /* @__PURE__ */ jsxs5("span", { style: { display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx6("button", { onClick: () => setEdit(sv.id), style: { ...editorSecondaryBtn, fontSize: 11 }, children: "\u270E" }),
        /* @__PURE__ */ jsx6(
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
  return /* @__PURE__ */ jsxs5("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
    /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430" }),
      /* @__PURE__ */ jsxs5("div", { style: {
        padding: "14px 16px",
        background: VT.bgSoft,
        borderRadius: 10,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between"
      }, children: [
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.025em", color: VT.ink }, children: DEMO_SITE.plan }),
          /* @__PURE__ */ jsxs5("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 2 }, children: [
            "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \xB7 ",
            DEMO_SITE.nextBilling
          ] })
        ] }),
        /* @__PURE__ */ jsx6("span", { style: {
          padding: "4px 10px",
          borderRadius: 999,
          background: "oklch(0.93 0.06 145)",
          color: "oklch(0.32 0.11 145)",
          fontSize: 11.5,
          fontWeight: 600
        }, children: "\u0410\u041A\u0422\u0418\u0412\u041D\u0410" })
      ] }),
      /* @__PURE__ */ jsxs5("div", { style: { marginTop: 12, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx6("button", { style: editorSecondaryBtn, children: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443" }),
        /* @__PURE__ */ jsx6("button", { style: { ...editorSecondaryBtn, color: VT.danger }, children: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u043F\u043E\u0434\u043F\u0438\u0441\u043A\u0443" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22
    }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0410\u0434\u0440\u0435\u0441 \u0441\u0430\u0439\u0442\u0430" }),
      /* @__PURE__ */ jsx6("div", { style: { fontFamily: VT.font.mono, fontSize: 14, color: VT.ink, marginBottom: 10 }, children: DEMO_SITE.domain }),
      /* @__PURE__ */ jsx6("button", { style: editorSecondaryBtn, children: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0441\u0432\u043E\u0439 \u0434\u043E\u043C\u0435\u043D" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u044B\u043B\u0430\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0438" }),
      /* @__PURE__ */ jsx6("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
        ["tg", "Telegram", "@anna_studio", "#229ED9"],
        ["max", "MAX", "\u043D\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u043E", "oklch(0.55 0.13 285)"],
        ["email", "Email", "anna@studio.ru", VT.accent]
      ].map(([k, label, value, color]) => /* @__PURE__ */ jsxs5("label", { style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 14px",
        background: notify[k] ? VT.bgSoft : VT.white,
        border: `1px solid ${notify[k] ? VT.line : VT.lineSoft}`,
        borderRadius: 10,
        cursor: "pointer"
      }, children: [
        /* @__PURE__ */ jsx6("span", { style: {
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
        /* @__PURE__ */ jsxs5("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
          /* @__PURE__ */ jsx6("div", { style: { fontSize: 12, color: VT.inkSoft, fontFamily: VT.font.mono }, children: value })
        ] }),
        /* @__PURE__ */ jsx6("span", { style: {
          width: 36,
          height: 22,
          borderRadius: 11,
          background: notify[k] ? VT.accent : VT.line,
          position: "relative",
          transition: "background .15s",
          flex: "0 0 auto"
        }, children: /* @__PURE__ */ jsx6("span", { style: {
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
        /* @__PURE__ */ jsx6("input", { type: "checkbox", checked: notify[k], onChange: () => setNotify((n) => ({ ...n, [k]: !n[k] })), style: { display: "none" } })
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: {
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 14,
      padding: 22,
      gridColumn: "1 / -1"
    }, children: [
      /* @__PURE__ */ jsx6("div", { style: { fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em", marginBottom: 12 }, children: "\u0423\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0441\u0430\u0439\u0442\u043E\u043C" }),
      /* @__PURE__ */ jsxs5("div", { style: { display: "flex", gap: 10, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx6("button", { onClick: () => setPaused((p) => !p), style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: paused ? VT.success : VT.white,
          color: paused ? "#fff" : VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${paused ? VT.success : VT.line}`,
          cursor: "pointer"
        }, children: paused ? "\u25B6 \u0412\u043E\u0437\u043E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" : "\u23F8 \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443" }),
        /* @__PURE__ */ jsx6("button", { style: {
          padding: "10px 16px",
          borderRadius: 10,
          background: VT.white,
          color: VT.ink,
          fontWeight: 600,
          fontSize: 13.5,
          border: `1px solid ${VT.line}`,
          cursor: "pointer"
        }, children: "\u2193 \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432 (HTML + \u0444\u043E\u0442\u043E)" }),
        /* @__PURE__ */ jsx6("button", { style: {
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
  return /* @__PURE__ */ jsxs5("div", { style: {
    width: "100%",
    minHeight: "100vh",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    letterSpacing: "-0.005em",
    display: "flex",
    flexDirection: "column"
  }, children: [
    /* @__PURE__ */ jsxs5("header", { style: {
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
      /* @__PURE__ */ jsx6(BrandMark, { size: 26, fontSize: 18 }),
      /* @__PURE__ */ jsx6("span", { style: {
        padding: "4px 10px",
        borderRadius: 6,
        background: VT.bgSoft,
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0414\u0415\u041C\u041E \xB7 \u041B\u0418\u0427\u041D\u042B\u0419 \u041A\u0410\u0411\u0418\u041D\u0415\u0422" }),
      /* @__PURE__ */ jsx6("div", { style: { flex: 1 } }),
      /* @__PURE__ */ jsxs5("span", { style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: 13,
        color: VT.inkSoft
      }, children: [
        /* @__PURE__ */ jsx6("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.success } }),
        /* @__PURE__ */ jsx6(Mono, { style: { fontSize: 13, color: VT.ink }, children: DEMO_SITE.domain }),
        "\xB7 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D"
      ] }),
      /* @__PURE__ */ jsx6("a", { href: "index.html", style: {
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
      /* @__PURE__ */ jsx6("a", { href: "#", style: {
        padding: "8px 16px",
        borderRadius: 999,
        background: VT.accent,
        color: "#fff",
        fontWeight: 600,
        fontSize: 13,
        textDecoration: "none"
      }, children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0430\u0439\u0442 \u2197" })
    ] }),
    /* @__PURE__ */ jsxs5("div", { style: { display: "flex", flex: 1, minHeight: 0 }, children: [
      /* @__PURE__ */ jsxs5("aside", { style: {
        width: 240,
        flex: "0 0 auto",
        background: VT.white,
        borderRight: `1px solid ${VT.line}`,
        padding: "20px 14px",
        display: "flex",
        flexDirection: "column",
        gap: 4
      }, children: [
        /* @__PURE__ */ jsx6("div", { style: {
          padding: "6px 14px",
          fontFamily: VT.font.mono,
          fontSize: 11,
          letterSpacing: "0.1em",
          color: VT.inkFaint,
          fontWeight: 600,
          marginBottom: 4
        }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0410\u041D\u041D\u042B" }),
        TABS.map((t) => /* @__PURE__ */ jsxs5("button", { onClick: () => setTab(t.id), style: {
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
          /* @__PURE__ */ jsx6("span", { style: { color: tab === t.id ? VT.accent : VT.inkSoft, display: "inline-flex" }, children: /* @__PURE__ */ jsx6(NavIcon, { kind: t.icon, size: 17 }) }),
          /* @__PURE__ */ jsx6("span", { style: { flex: 1 }, children: t.label }),
          t.badge && /* @__PURE__ */ jsx6("span", { style: {
            padding: "1px 7px",
            borderRadius: 999,
            background: VT.accent,
            color: "#fff",
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            fontWeight: 700
          }, children: t.badge })
        ] }, t.id)),
        /* @__PURE__ */ jsx6("div", { style: { flex: 1 } }),
        /* @__PURE__ */ jsxs5("div", { style: {
          margin: "20px 6px 0",
          padding: 14,
          background: VT.bgSoft,
          borderRadius: 12,
          fontSize: 12.5,
          color: VT.inkSoft,
          lineHeight: 1.5
        }, children: [
          /* @__PURE__ */ jsx6("div", { style: { fontWeight: 600, color: VT.ink, marginBottom: 4 }, children: "\u042D\u0442\u043E \u0434\u0435\u043C\u043E" }),
          "\u0412\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u043D\u0438\u0436\u0435 \u2014 \u043F\u0440\u0438\u043C\u0435\u0440. \u0420\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u041B\u041A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442 \u0442\u0430\u043A \u0436\u0435."
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("main", { style: { flex: 1, minWidth: 0, padding: "24px 28px 60px", overflowX: "hidden" }, children: [
        /* @__PURE__ */ jsx6("div", { style: { marginBottom: 20 }, children: /* @__PURE__ */ jsx6("h1", { style: {
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          margin: 0,
          lineHeight: 1.1,
          color: VT.ink
        }, children: currentTab.label }) }),
        tab === "analytics" && /* @__PURE__ */ jsx6(AnalyticsTab, {}),
        tab === "site" && /* @__PURE__ */ jsx6(SiteEditTab, {}),
        tab === "leads" && /* @__PURE__ */ jsx6(LeadsTab, {}),
        tab === "reviews" && /* @__PURE__ */ jsx6(ReviewsTab, {}),
        tab === "services" && /* @__PURE__ */ jsx6(ServicesTab, {}),
        tab === "settings" && /* @__PURE__ */ jsx6(SettingsTab, {})
      ] })
    ] })
  ] });
}

// src/admin-core/index.tsx
import React2, { useState as useState2, useEffect as useEffect2, useCallback as useCallback2 } from "react";
import { Fragment as Fragment8, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function SkeletonBlock({ width = "100%", height = 14, radius = 4, style }) {
  return /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: {
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
  return /* @__PURE__ */ jsxs6("div", { role: "status", style: {
    padding: "48px 24px",
    textAlign: "center",
    color: VT.inkFaint,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx7("div", { "aria-hidden": "true", style: { fontSize: 28, opacity: 0.6, marginBottom: 8 }, children: "\u2205" }),
    /* @__PURE__ */ jsx7("div", { style: { fontSize: 14.5, fontWeight: 500, color: VT.inkSoft, marginBottom: 4 }, children: title }),
    hint && /* @__PURE__ */ jsx7("div", { style: { fontSize: 13 }, children: hint })
  ] });
}
function ErrorBlock({ title, message, onRetry }) {
  return /* @__PURE__ */ jsx7(Card, { role: "alert", style: {
    padding: 18,
    background: VT.dangerSoft,
    borderColor: "oklch(0.86 0.06 28)"
  }, children: /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { fontSize: 18 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs6("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx7("div", { style: { fontWeight: 600, fontSize: 14, color: "oklch(0.4 0.15 28)" }, children: title || "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A" }),
      message && /* @__PURE__ */ jsx7("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 2 }, children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsx7("button", { type: "button", onClick: onRetry, style: {
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
  return /* @__PURE__ */ jsxs6("div", { role: "alert", style: {
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
    /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs6("span", { children: [
      "5 \u043D\u0435\u0443\u0434\u0430\u0447 \u0437\u0430 15 \u043C\u0438\u043D \u2014 IP \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ",
      /* @__PURE__ */ jsxs6(Mono, { style: { color: "inherit", fontSize: 13 }, children: [
        mm,
        ":",
        ss
      ] }),
      "."
    ] })
  ] });
}
function TextField({ type = "text", value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono }) {
  return /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsxs6("div", { style: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    minHeight: "100%",
    background: VT.bgSoft,
    fontFamily: VT.font.sans,
    color: VT.ink,
    letterSpacing: "-0.005em"
  }, children: [
    /* @__PURE__ */ jsxs6("aside", { style: {
      background: VT.bg,
      borderRight: `1px solid ${VT.line}`,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 18 }, children: [
        /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.bg } }),
        /* @__PURE__ */ jsx7("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx7(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 6px", fontSize: 10, borderRadius: 4 }, children: "ADMIN" })
      ] }),
      /* @__PURE__ */ jsx7("nav", { "aria-label": "Admin sections", style: { display: "flex", flexDirection: "column", gap: 4 }, children: NAV.map(([key, name, icon]) => {
        const isActive = activeKey === key;
        const count = badges?.[key];
        return /* @__PURE__ */ jsxs6(
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
              /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { fontSize: 15, width: 18, display: "inline-flex" }, children: icon }),
              name,
              typeof count === "number" && count > 0 && /* @__PURE__ */ jsx7(Badge, { kind: "warn", style: { marginLeft: "auto", padding: "1px 7px", fontSize: 10, borderRadius: 999 }, children: count })
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxs6("div", { style: { marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { width: 24, height: 24, borderRadius: "50%", background: VT.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: VT.accentInk, fontWeight: 600 }, children: u.initials }),
        /* @__PURE__ */ jsx7("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: u.username }),
        /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsx7("main", { style: { minWidth: 0 }, children })
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
  return /* @__PURE__ */ jsx7("div", { style: {
    background: VT.bgSoft,
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: VT.font.sans,
    padding: 24
  }, children: /* @__PURE__ */ jsxs6(Card, { style: { width: 400, padding: 28 }, children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.white } }),
      /* @__PURE__ */ jsx7("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
      /* @__PURE__ */ jsx7(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 7px", fontSize: 10 }, children: "ADMIN" })
    ] }),
    /* @__PURE__ */ jsx7("h1", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }, children: step === 1 ? "\u0412\u0445\u043E\u0434 \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0443" : "\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F" }),
    /* @__PURE__ */ jsx7("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: "0 0 18px" }, children: step === 1 ? "\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F founder. \u0412\u0441\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F." : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F-\u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430." }),
    rateLimited && /* @__PURE__ */ jsx7(RateLimitCountdown, { retryAfterSeconds: rateLimitedRetryAfterSeconds }),
    error && !rateLimited && /* @__PURE__ */ jsx7("div", { role: "alert", style: {
      padding: "8px 12px",
      background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`,
      borderRadius: VT.r.md,
      fontSize: 13,
      color: "oklch(0.4 0.15 28)",
      marginBottom: 14
    }, children: LOGIN_ERROR_MSG[error] || LOGIN_ERROR_MSG.unknown_error }),
    step === 1 ? /* @__PURE__ */ jsxs6("form", { onSubmit: onSubmit1, children: [
      /* @__PURE__ */ jsx7("label", { htmlFor: "ss-admin-email", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "Email" }),
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7("label", { htmlFor: "ss-admin-password", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx7(
        Btn,
        {
          type: "submit",
          style: { width: "100%" },
          disabled: loading || rateLimited || !username || !password,
          iconRight: loading ? /* @__PURE__ */ jsx7(Spinner, { size: 14 }) : /* @__PURE__ */ jsx7(IconArrow, {}),
          children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0414\u0430\u043B\u044C\u0448\u0435"
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs6("form", { onSubmit: onSubmit2, children: [
      /* @__PURE__ */ jsx7("div", { role: "tablist", "aria-label": "\u0421\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F", style: { display: "flex", gap: 6, marginBottom: 12, padding: 3, background: VT.bgSoft, borderRadius: VT.r.md, border: `1px solid ${VT.line}` }, children: [
        ["totp", "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440"],
        ["backup", "Backup-\u043A\u043E\u0434"]
      ].map(([key, label]) => {
        const isActive = mode === key;
        return /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsx7("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 6 }, children: mode === "totp" ? "\u041A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430" : "Backup-\u043A\u043E\u0434" }),
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsxs6("div", { style: { marginTop: 18, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx7(
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
        /* @__PURE__ */ jsx7(
          Btn,
          {
            type: "submit",
            style: { flex: 1 },
            disabled: loading || rateLimited || !(mode === "totp" ? totp : backupCode),
            iconRight: loading ? /* @__PURE__ */ jsx7(Spinner, { size: 14 }) : /* @__PURE__ */ jsx7(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        )
      ] })
    ] })
  ] }) });
}
function StatTile({ label, value, delta, deltaSign, sub, onClick, loading }) {
  const clickable = !!onClick && !loading;
  return /* @__PURE__ */ jsx7(
    Card,
    {
      style: {
        padding: 18,
        cursor: clickable ? "pointer" : "default",
        transition: "transform .15s ease, box-shadow .15s ease"
      },
      children: /* @__PURE__ */ jsxs6(
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
            /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: String(label).toUpperCase() }),
            loading ? /* @__PURE__ */ jsx7("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsx7(SkeletonBlock, { width: 64, height: 28, radius: 6 }) }) : /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }, children: [
              /* @__PURE__ */ jsx7("span", { style: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em" }, children: value }),
              delta && /* @__PURE__ */ jsxs6("span", { style: {
                fontSize: 12.5,
                fontWeight: 600,
                color: deltaSign === "+" ? VT.success : deltaSign === "-" ? VT.danger : VT.inkSoft
              }, children: [
                deltaSign,
                delta
              ] })
            ] }),
            sub && !loading && /* @__PURE__ */ jsx7("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 4 }, children: sub }),
            loading && /* @__PURE__ */ jsx7("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ jsx7(SkeletonBlock, { width: "50%", height: 10 }) })
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
  return /* @__PURE__ */ jsxs6("span", { style: {
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
    /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    m[2]
  ] });
}
function FilterChip({ label, active, count, onClick, disabled }) {
  return /* @__PURE__ */ jsxs6(
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
        count != null && /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
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
  return /* @__PURE__ */ jsxs6("svg", { viewBox: `0 0 ${w} ${height}`, width: "100%", height, preserveAspectRatio: "none", role: "img", "aria-label": "\u0413\u0440\u0430\u0444\u0438\u043A \u0437\u0430\u044F\u0432\u043E\u043A", children: [
    /* @__PURE__ */ jsx7("path", { d: area, fill: VT.accentSoft, opacity: "0.7" }),
    /* @__PURE__ */ jsx7("path", { d: path, fill: "none", stroke: VT.accent, strokeWidth: "2" }),
    points.map((p, i) => /* @__PURE__ */ jsx7("circle", { cx: i / (points.length - 1) * w, cy: height - 30 - p / max * (height - 50), r: "3", fill: VT.bg, stroke: VT.accent, strokeWidth: "1.5" }, i)),
    xLabels.map((l, i) => /* @__PURE__ */ jsx7("text", { x: i / (xLabels.length - 1) * w, y: height - 8, fontSize: "11", fill: VT.inkFaint, fontFamily: "JetBrains Mono, monospace", textAnchor: i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle", children: l }, l + i))
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
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "dashboard", onNavigate };
  return /* @__PURE__ */ jsx7(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs6("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7(Eyebrow, { children: "DASHBOARD" }),
        /* @__PURE__ */ jsx7("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "10px 0 0" }, children: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" })
      ] }),
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 8 }, children: [
        onRefresh && /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" }),
        /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", children: "7 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: "30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", children: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx7(ErrorBlock, { message: error, onRetry: onRefresh }),
    /* @__PURE__ */ jsx7("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: error ? 14 : 0 }, children: COUNTER_TILES.map((t) => /* @__PURE__ */ jsx7(
      StatTile,
      {
        label: t.label,
        value: loading ? "" : d.counters[t.key] ?? 0,
        loading,
        onClick: onNavigate ? () => onNavigate(t.section) : void 0
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginTop: 14 }, children: [
      /* @__PURE__ */ jsxs6(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0417\u0410\u042F\u0412\u041A\u0418 \xB7 14 \u0414\u041D\u0415\u0419" }),
            /* @__PURE__ */ jsx7("div", { style: { fontSize: 20, fontWeight: 700, marginTop: 4 }, children: loading ? /* @__PURE__ */ jsx7(SkeletonBlock, { width: 80, height: 20 }) : d.applications_series_14d.reduce((s, x) => s + x.count, 0) })
          ] }),
          /* @__PURE__ */ jsx7(Btn, { variant: "ghost", size: "sm", children: "CSV" })
        ] }),
        loading ? /* @__PURE__ */ jsx7(SkeletonBlock, { width: "100%", height: 200, radius: 8 }) : /* @__PURE__ */ jsx7(TrendChart, { series: d.applications_series_14d, labels: d.applications_series_14d.map((s) => s.day.slice(8)) })
      ] }),
      /* @__PURE__ */ jsxs6(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "QUICK \xB7 \u0422\u041E\u041F-5 PENDING" }),
          /* @__PURE__ */ jsx7(
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
        loading ? /* @__PURE__ */ jsx7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx7("div", { style: { padding: "8px 10px", borderBottom: `1px solid ${VT.lineSoft}` }, children: /* @__PURE__ */ jsx7(SkeletonBlock, { width: "80%", height: 14 }) }, i)) }) : /* @__PURE__ */ jsx7("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
          ["#A-1842", "TG", "studia-anna \xB7 47 \u043F\u043E\u0441\u0442\u043E\u0432", "12 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1841", "YM", "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \u0421\u0430\u043C\u0430\u0440\u0430 \xB7 24 \u043E\u0442\u0437.", "34 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1840", "Photo", "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u041C\u0430\u0440\u0438\u043D\u0430 \xB7 12 \u0444\u043E\u0442\u043E", "1 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1839", "TG", "\u0414\u043E\u043C \u0440\u0435\u0441\u043D\u0438\u0446 \xB7 89 \u043F\u043E\u0441\u0442\u043E\u0432", "2 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1838", "YM", "\u0421\u0442\u0443\u0434\u0438\u044F \u0439\u043E\u0433\u0438 \xB7 56 \u043E\u0442\u0437.", "3 \u0447 \u043D\u0430\u0437\u0430\u0434"]
        ].map(([id, src, name, ago]) => /* @__PURE__ */ jsxs6(
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
              /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 11, width: 56 }, children: id }),
              /* @__PURE__ */ jsx7(Badge, { kind: "neutral", style: { padding: "2px 7px", fontSize: 10.5, borderRadius: 4 }, children: src }),
              /* @__PURE__ */ jsx7("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
              /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 11 }, children: ago })
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
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: () => {
  } };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx7(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs6("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx7(Eyebrow, { children: "\u0417\u0410\u042F\u0412\u041A\u0418" }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx7("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438" }),
      /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV" })
    ] }),
    error && /* @__PURE__ */ jsx7("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx7(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx7("div", { style: { display: "flex", gap: 6 }, children: STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx7(
        FilterChip,
        {
          label,
          active: statusFilter === key,
          onClick: () => onStatusFilterChange && onStatusFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx7("div", { style: { marginLeft: "auto", display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxs6("div", { style: {
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
        /* @__PURE__ */ jsxs6("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx7("circle", { cx: "11", cy: "11", r: "7" }),
          /* @__PURE__ */ jsx7("path", { d: "M21 21l-4.3-4.3", strokeLinecap: "round" })
        ] }),
        "\u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443, ID, \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs6(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs6("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx7("thead", { children: /* @__PURE__ */ jsx7("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["ID", "\u0421\u043E\u0437\u0434\u0430\u043D\u0430", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0421\u0442\u0430\u0442\u0443\u0441", ""].map((h) => /* @__PURE__ */ jsx7("th", { scope: "col", style: {
          textAlign: "left",
          padding: "12px 16px",
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.inkFaint,
          fontWeight: 500
        }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs6("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => /* @__PURE__ */ jsx7("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [60, 90, 80, 180, 90, 80, 18].map((w, j) => /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx7(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs6(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(row.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(row.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx7(Mono, { children: row.id }) }),
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px", color: VT.inkSoft }, children: /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 12 }, children: formatTs(row.created_at) }) }),
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx7(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: row.source_type }) }),
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 12 }, children: row.source_url || "\u2014" }) }),
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 12 }, children: row.contact_value_masked }) }),
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx7(StatusPill, { status: row.status }) }),
                /* @__PURE__ */ jsx7("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            row.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx7(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u044F\u0432\u043E\u043A", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0435\u0440\u0432\u0430\u044F \u2014 \u043E\u043D\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && /* @__PURE__ */ jsxs6("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs6("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx7(
            Btn,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit),
              disabled: d.offset === 0 || loading,
              children: "\u2190"
            }
          ),
          /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs6(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx7(
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
  return /* @__PURE__ */ jsx7("pre", { style: { margin: 0, fontFamily: VT.font.mono, fontSize: 12.5, lineHeight: 1.55, color: VT.inkSoft }, children: lines.map((row, i) => /* @__PURE__ */ jsxs6("div", { children: [
    /* @__PURE__ */ jsx7("span", { style: { color: row[1] }, children: row[0] }),
    row[2] && /* @__PURE__ */ jsx7("span", { style: { color: row[3] }, children: row[2] })
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
  const Wrap = _embed === false ? React2.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: onBack ? () => onBack() : void 0 };
  const submitReject = () => {
    if (onReject) onReject(app.id, rejectReason || void 0);
    setRejectOpen(false);
    setRejectReason("");
  };
  if (loading) {
    return /* @__PURE__ */ jsx7(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs6("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx7(SkeletonBlock, { width: 140, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx7(SkeletonBlock, { width: 320, height: 28, radius: 6, style: { marginBottom: 20 } }),
      /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx7(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx7(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) }),
        /* @__PURE__ */ jsx7(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx7(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx7(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs6("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx7(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0417\u0430\u044F\u0432\u043A\u0438"
        }
      ),
      /* @__PURE__ */ jsx7("span", { children: "/" }),
      /* @__PURE__ */ jsx7(Mono, { style: { color: VT.ink }, children: app.id })
    ] }),
    error && /* @__PURE__ */ jsx7("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx7(ErrorBlock, { message: error }) }),
    actionError && /* @__PURE__ */ jsx7("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx7(ErrorBlock, { title: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435", message: actionError }) }),
    /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440" }),
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          app.source_url && /* @__PURE__ */ jsx7("a", { href: `https://${app.source_url.replace(/^https?:\/\//, "")}`, target: "_blank", rel: "noreferrer", style: { color: VT.accent, textDecoration: "underline", textUnderlineOffset: 2 }, children: /* @__PURE__ */ jsx7(Mono, { style: { color: "inherit" }, children: app.source_url }) }),
          /* @__PURE__ */ jsx7("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx7("span", { children: app.contact_value_masked }),
          /* @__PURE__ */ jsx7("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx7(Mono, { children: formatTs(app.created_at) }),
          /* @__PURE__ */ jsx7(StatusPill, { status: app.status }),
          app.is_manual_review && /* @__PURE__ */ jsx7(Badge, { kind: "warn", style: { fontSize: 11, padding: "2px 8px" }, children: "manual review" })
        ] })
      ] }),
      /* @__PURE__ */ jsx7("div", { style: { display: "flex", gap: 8 }, children: isPending ? /* @__PURE__ */ jsxs6(Fragment8, { children: [
        /* @__PURE__ */ jsx7(
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
        /* @__PURE__ */ jsx7(
          Btn,
          {
            size: "sm",
            onClick: () => onApprove && onApprove(app.id),
            disabled: !!actionLoading,
            iconRight: actionLoading ? /* @__PURE__ */ jsx7(Spinner, { size: 14 }) : /* @__PURE__ */ jsx7(IconArrow, { size: 14 }),
            children: actionLoading ? "\u041E\u0434\u043E\u0431\u0440\u044F\u0435\u043C\u2026" : "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C"
          }
        )
      ] }) : /* @__PURE__ */ jsxs6(Badge, { kind: app.status === "approved" || app.status === "published" ? "success" : "neutral", style: { padding: "6px 12px" }, children: [
        "\u0423\u0436\u0435 ",
        STATUS_MAP[app.status]?.[2] || app.status
      ] }) })
    ] }),
    rejectOpen && /* @__PURE__ */ jsxs6(Card, { style: { padding: 16, marginBottom: 14, borderColor: "oklch(0.85 0.06 28)" }, children: [
      /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em", color: VT.danger }, children: "\u041F\u0420\u0418\u0427\u0418\u041D\u0410 \u041E\u0422\u041A\u0410\u0417\u0410" }),
      /* @__PURE__ */ jsx7(
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
      /* @__PURE__ */ jsxs6("div", { style: { display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsx7(Btn, { variant: "secondary", size: "sm", onClick: () => {
          setRejectOpen(false);
          setRejectReason("");
        }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx7(
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
    /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs6(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE SNAPSHOT \xB7 JSON" }),
          /* @__PURE__ */ jsx7(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "raw" })
        ] }),
        /* @__PURE__ */ jsx7("div", { style: {
          background: VT.bgSoft,
          borderRadius: VT.r.sm,
          padding: 14,
          border: `1px solid ${VT.line}`,
          maxHeight: 280,
          overflow: "auto"
        }, children: /* @__PURE__ */ jsx7(JsonTree, {}) })
      ] }),
      /* @__PURE__ */ jsxs6(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "GENERATED CONTENT" }),
          /* @__PURE__ */ jsx7(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: "\u2713 sanitized" }),
          /* @__PURE__ */ jsx7(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "\u2197 preview" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { style: { background: VT.bgSoft, borderRadius: VT.r.sm, padding: 14, border: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx7("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.accent, letterSpacing: "0.1em", marginBottom: 6 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx7("div", { style: { fontWeight: 700, fontSize: 20, lineHeight: 1.15, marginBottom: 8 }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
          /* @__PURE__ */ jsx7("div", { style: { fontSize: 13, lineHeight: 1.5, color: VT.inkSoft }, children: "\u0420\u0430\u0431\u043E\u0442\u0430\u044E \u0441 2017 \u0433\u043E\u0434\u0430, \u043F\u0440\u043E\u0448\u043B\u0430 \u043A\u0443\u0440\u0441\u044B \u0432 [SCHOOL]. \u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432 \u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u0441\u043F\u0435\u0448\u043A\u0438, \u0441 \u0447\u0430\u0448\u043A\u043E\u0439 \u043A\u043E\u0444\u0435." }),
          /* @__PURE__ */ jsx7("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx7("div", { "aria-hidden": "true", style: { flex: 1, aspectRatio: "1/1", borderRadius: 6, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` } }, i)) }),
          /* @__PURE__ */ jsx7("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }, children: "\u2248 320 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \xB7 \u2248 12 \u20BD \xB7 \u043C\u043E\u0434\u0435\u043B\u044C: YandexGPT 5 Pro" })
        ] })
      ] })
    ] }),
    (d.user || d.consent) && /* @__PURE__ */ jsxs6("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }, children: [
      d.user && /* @__PURE__ */ jsxs6(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "USER" }),
        /* @__PURE__ */ jsxs6("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx7("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442" }),
            /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 13, color: VT.ink }, children: d.user.contact_value_masked })
          ] }),
          /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx7("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0430\u0440\u0438\u0444" }),
            /* @__PURE__ */ jsx7(
              Badge,
              {
                kind: d.user.plan === "pro" ? "success" : d.user.plan === "trial" ? "info" : "neutral",
                style: { padding: "2px 9px", fontSize: 11.5 },
                children: d.user.plan
              }
            )
          ] }),
          d.user.plan_until && /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx7("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0410\u043A\u0442\u0438\u0432\u0435\u043D \u0434\u043E" }),
            /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 13 }, children: d.user.plan_until })
          ] })
        ] })
      ] }),
      d.consent && /* @__PURE__ */ jsxs6(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "CONSENT" }),
        /* @__PURE__ */ jsxs6("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx7("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0412\u0435\u0440\u0441\u0438\u044F \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438" }),
            /* @__PURE__ */ jsxs6(Mono, { style: { fontSize: 13 }, children: [
              "v",
              d.consent.policy_version
            ] })
          ] }),
          /* @__PURE__ */ jsxs6("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx7("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" }),
            /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 13 }, children: formatTs(d.consent.created_at) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6(Card, { style: { marginTop: 14, padding: 18 }, children: [
      /* @__PURE__ */ jsx7(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "AUDIT LOG" }),
      /* @__PURE__ */ jsxs6("div", { style: { marginTop: 10, fontSize: 13, fontFamily: VT.font.mono, color: VT.inkSoft, lineHeight: 1.7 }, children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:22:18" }),
          " \xB7 application.submitted \xB7 ip 195.***.***.42"
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:22:19" }),
          " \xB7 parser.tg.start \xB7 @studia_anna"
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:22:34" }),
          " \xB7 parser.tg.ok \xB7 posts=47 photos=12"
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:22:35" }),
          " \xB7 llm.generate.start \xB7 model=yandexgpt-5-pro"
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:23:02" }),
          " \xB7 llm.generate.ok \xB7 tokens=320 cost_rub=12.40"
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
          " \xB7 sanitize.ok \xB7 bleach.clean allowlist=v1"
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
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
import React3, { useState as useState3, useMemo as useMemo2 } from "react";
import { Fragment as Fragment10, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function formatTs2(iso) {
  if (!iso) return "\u2014";
  return iso.replace("T", " ").slice(0, 16);
}
function formatRel(iso) {
  if (!iso) return "\u2014";
  return iso.slice(0, 10);
}
function TextField2({ value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono, type = "text" }) {
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
  const Wrap = _embed === false ? React3.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx8(Eyebrow, { children: "\u0421\u0410\u0419\u0422\u042B" }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", children: "CSV" })
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsx8("div", { style: { display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }, children: SITE_STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx8(
      FilterChip,
      {
        label,
        active: statusFilter === key,
        onClick: () => onStatusFilterChange && onStatusFilterChange(key)
      },
      key
    )) }),
    /* @__PURE__ */ jsxs7(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs7("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx8("thead", { children: /* @__PURE__ */ jsx8("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["Subdomain", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "Status", "Last sync", ""].map((h) => /* @__PURE__ */ jsx8("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs7("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6].map((i) => /* @__PURE__ */ jsx8("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [160, 80, 220, 110, 110, 18].map((w, j) => /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((s) => /* @__PURE__ */ jsxs7(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(s.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(s.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsxs7("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12.5 }, children: [
                  s.subdomain,
                  ".samosite.online",
                  s.custom_domain && /* @__PURE__ */ jsx8(Badge, { kind: "success", style: { marginLeft: 8, padding: "1px 7px", fontSize: 10, borderRadius: 4 }, children: s.custom_domain })
                ] }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: s.source_type }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 240, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: s.source_url }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(StatusPill, { status: s.status }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: formatTs2(s.last_synced_at) }) }),
                /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            s.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx8(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0445 \u0441\u0430\u0439\u0442\u043E\u0432", hint: "\u0417\u0430\u044F\u0432\u043A\u0438 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0432 \u0440\u0430\u0437\u0434\u0435\u043B \xAB\u0417\u0430\u044F\u0432\u043A\u0438\xBB \u2014 \u0442\u0430\u043C \u043E\u0434\u043E\u0431\u0440\u044F\u0439\u0442\u0435 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0443\u0439\u0442\u0435." }),
      !showEmpty && /* @__PURE__ */ jsxs7("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs7("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs7(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
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
  const Wrap = _embed === false ? React3.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "sites" };
  if (loading) {
    return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx8(SkeletonBlock, { width: 200, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx8(SkeletonBlock, { width: 280, height: 28, radius: 6, style: { marginBottom: 24 } }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 420, radius: 10 }),
        /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 420, radius: 10 })
      ] })
    ] }) });
  }
  const renderAction = (action, variant = "secondary") => {
    const enabled = actionEnabled(action, site.status);
    const isLoading = actionLoading === action;
    const anyLoading = !!actionLoading;
    return /* @__PURE__ */ jsx8(
      Btn,
      {
        size: "sm",
        variant,
        disabled: !enabled || anyLoading,
        onClick: () => enabled && onAction && onAction(site.id, action),
        iconRight: isLoading ? /* @__PURE__ */ jsx8(Spinner, { size: 14 }) : variant === "primary" ? /* @__PURE__ */ jsx8(IconArrow, { size: 14 }) : void 0,
        children: isLoading ? "..." : ACTION_LABELS[action]
      },
      action
    );
  };
  const primaryAction = site.status === "pending_review" ? "publish" : site.status === "published" ? "republish" : site.status === "paused" ? "resume_sync" : site.status === "archived" ? "unarchive" : null;
  const secondaryActions = ["publish", "republish", "pause_sync", "resume_sync", "archive", "unarchive"].filter((a) => a !== primaryAction && actionEnabled(a, site.status));
  const safePreviewUrl = previewUrl || (site.subdomain ? `https://${site.subdomain}.samosite.online` : null);
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx8(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0421\u0430\u0439\u0442\u044B"
        }
      ),
      /* @__PURE__ */ jsx8("span", { children: "/" }),
      /* @__PURE__ */ jsxs7(Mono, { style: { color: VT.ink }, children: [
        site.subdomain,
        ".samosite.online"
      ] })
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsxs7("div", { children: [
        /* @__PURE__ */ jsx8("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: site.subdomain.replace(/-/g, " ") }),
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          safePreviewUrl && /* @__PURE__ */ jsxs7("a", { href: safePreviewUrl, target: "_blank", rel: "noreferrer", style: { display: "inline-flex", alignItems: "center", gap: 4, color: VT.accent, textDecoration: "underline" }, children: [
            /* @__PURE__ */ jsxs7(Mono, { style: { color: "inherit" }, children: [
              site.subdomain,
              ".samosite.online"
            ] }),
            " \u2197"
          ] }),
          /* @__PURE__ */ jsx8("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx8(StatusPill, { status: site.status }),
          site.published_at && /* @__PURE__ */ jsxs7(Fragment10, { children: [
            /* @__PURE__ */ jsx8("span", { children: "\xB7" }),
            /* @__PURE__ */ jsxs7("span", { children: [
              "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D ",
              formatRel(site.published_at)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }, children: [
        secondaryActions.map((a) => renderAction(a, "secondary")),
        primaryAction && renderAction(primaryAction, "primary")
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        /* @__PURE__ */ jsxs7("div", { style: { padding: "10px 14px", borderBottom: `1px solid ${VT.line}`, display: "flex", alignItems: "center", gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
          /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
          /* @__PURE__ */ jsx8("span", { style: { marginLeft: 10 }, children: safePreviewUrl }),
          /* @__PURE__ */ jsx8("span", { style: { marginLeft: "auto" }, children: "preview" })
        ] }),
        safePreviewUrl ? /* @__PURE__ */ jsx8(
          "iframe",
          {
            src: safePreviewUrl,
            title: `${site.subdomain} preview`,
            sandbox: "allow-same-origin allow-scripts allow-popups-to-escape-sandbox",
            style: { width: "100%", aspectRatio: "4 / 3", border: "none", background: VT.bg, display: "block" }
          }
        ) : /* @__PURE__ */ jsxs7("div", { style: { aspectRatio: "4 / 3", background: VT.bg, padding: 14, position: "relative" }, children: [
          /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: "oklch(0.55 0.13 30)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, letterSpacing: "-0.04em" }, children: "\u0410" }),
            /* @__PURE__ */ jsx8("span", { style: { fontSize: 12, fontWeight: 700, color: VT.ink }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
            /* @__PURE__ */ jsx8("span", { style: { marginLeft: "auto", padding: "3px 9px", borderRadius: 999, background: VT.accent, color: "#fff", fontSize: 10, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
          ] }),
          /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsx8("div", { style: { fontFamily: VT.font.mono, fontSize: 9, letterSpacing: "0.12em", color: VT.accent, fontWeight: 600 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
            /* @__PURE__ */ jsx8("div", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.025em", marginTop: 4, lineHeight: 1.15 }, children: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \u2014 \u0431\u0435\u0437 \u0431\u043E\u043B\u0438, \u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F 3 \u043D\u0435\u0434\u0435\u043B\u0438" })
          ] }),
          /* @__PURE__ */ jsx8("div", { style: { marginTop: 10, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 3 }, children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ jsx8("div", { "aria-hidden": "true", style: { aspectRatio: "1/1", borderRadius: 4, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` } }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", flexDirection: "column", gap: 14 }, children: [
        /* @__PURE__ */ jsxs7(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u041B\u0418\u0414\u042B" }),
          /* @__PURE__ */ jsx8("div", { style: { fontSize: 28, fontWeight: 700, marginTop: 6 }, children: d.leads_count }),
          /* @__PURE__ */ jsx8(
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
        /* @__PURE__ */ jsxs7(Card, { style: { padding: 18 }, children: [
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0418\u0421\u0422\u041E\u0427\u041D\u0418\u041A" }),
          /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
            /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0438\u043F" }),
              /* @__PURE__ */ jsx8(Badge, { kind: "neutral", style: { padding: "2px 9px", fontSize: 11.5, borderRadius: 4 }, children: site.source_type })
            ] }),
            /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "URL" }),
              /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: site.source_url })
            ] }),
            /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "Last sync" }),
              /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: formatTs2(site.last_synced_at) })
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
  const Wrap = _embed === false ? React3.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "leads" };
  const [uSelected, setUSelected] = useState3([]);
  const [uModalOpen, setUModalOpen] = useState3(false);
  const [uTotp, setUTotp] = useState3("");
  const selected = selectedLeadIds ?? uSelected;
  const setSelected = onSelectLead ? (id, on) => onSelectLead(id, on) : (id, on) => setUSelected((prev) => on ? [...prev, id] : prev.filter((x) => x !== id));
  const clearSelection = onClearSelection ?? (() => setUSelected([]));
  const modalOpen = decryptModalOpen ?? uModalOpen;
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
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px", position: "relative" }, children: [
    /* @__PURE__ */ jsx8(Eyebrow, { children: "\u041B\u0418\u0414\u042B" }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0412\u0441\u0435 \u0441\u0430\u0439\u0442\u044B" }),
      /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        selected.length > 0 && /* @__PURE__ */ jsxs7(
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
        /* @__PURE__ */ jsxs7(
          Btn,
          {
            size: "sm",
            onClick: openModal,
            disabled: selected.length === 0 || loading,
            iconRight: /* @__PURE__ */ jsx8(IconArrow, { size: 14 }),
            children: [
              "\u{1F513} \u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C (",
              selected.length,
              ")"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 12, marginBottom: 14, alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs7(Mono, { style: { fontSize: 12 }, children: [
        "\u0412\u0441\u0435\u0433\u043E: ",
        d.total,
        " \xB7 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E: ",
        d.items?.length ?? 0
      ] }),
      /* @__PURE__ */ jsx8(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 11.5 }, children: "\u{1F512} Fernet AES \u2014 plaintext \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 TOTP-\u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F" })
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs7(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs7("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx8("thead", { children: /* @__PURE__ */ jsxs7("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx8("th", { scope: "col", style: { width: 48, padding: "12px 16px", textAlign: "left" }, children: /* @__PURE__ */ jsx8(
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
          ["ID", "\u0421\u0430\u0439\u0442", "IP prefix", "Status", "\u041A\u043E\u0433\u0434\u0430"].map((h) => /* @__PURE__ */ jsx8("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h))
        ] }) }),
        /* @__PURE__ */ jsxs7("tbody", { children: [
          loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs7("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: 14, height: 14, radius: 3 }) }),
            [90, 160, 120, 90, 110].map((w, j) => /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: w, height: 12 }) }, j))
          ] }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs7("tr", { style: {
            borderBottom: `1px solid ${VT.lineSoft}`,
            background: isSelected(row.id) ? VT.accentSoft : "transparent"
          }, children: [
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(
              "input",
              {
                type: "checkbox",
                "aria-label": `\u0412\u044B\u0431\u0440\u0430\u0442\u044C ${row.id}`,
                checked: isSelected(row.id),
                onChange: (e) => setSelected(row.id, e.target.checked)
              }
            ) }),
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { children: row.id }) }),
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft }, children: row.site_id }),
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: row.ip_prefix || "\u2014" }) }),
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(StatusPill, { status: row.status, size: "sm" }) }),
            /* @__PURE__ */ jsx8("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11.5, color: VT.inkFaint }, children: formatTs2(row.created_at) }) })
          ] }, row.id))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx8(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u043B\u0438\u0434\u043E\u0432", hint: "\u041A\u043E\u0433\u0434\u0430 \u043A\u0442\u043E-\u043D\u0438\u0431\u0443\u0434\u044C \u0437\u0430\u043F\u043E\u043B\u043D\u0438\u0442 \u0444\u043E\u0440\u043C\u0443 \u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u0438\u0437 \u0432\u0430\u0448\u0438\u0445 \u0441\u0430\u0439\u0442\u043E\u0432 \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && !loading && /* @__PURE__ */ jsxs7("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs7("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0 || loading, children: "\u2190" }),
          /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange && onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total || loading, children: "\u2192" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 10, display: "block" }, children: "\u0412\u0441\u0435 \u0440\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F \u0432 audit-log (admin_actions) \u2014 admin_id, ip, lead_ids, ts." }),
    modalOpen && /* @__PURE__ */ jsx8(
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
        children: /* @__PURE__ */ jsx8(Card, { style: { width: decryptedRows ? 560 : 380, padding: 24, background: VT.bg }, children: !decryptedRows ? /* @__PURE__ */ jsxs7(Fragment10, { children: [
          /* @__PURE__ */ jsx8("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 TOTP" }),
          /* @__PURE__ */ jsxs7("p", { style: { fontSize: 13, color: VT.inkSoft, margin: "0 0 14px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C ",
            /* @__PURE__ */ jsx8("b", { children: selected.length }),
            " ",
            selected.length === 1 ? "\u043B\u0438\u0434" : "\u043B\u0438\u0434\u043E\u0432",
            ". \u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430."
          ] }),
          decryptError && /* @__PURE__ */ jsx8("div", { role: "alert", style: {
            padding: "8px 12px",
            background: VT.dangerSoft,
            border: `1px solid oklch(0.85 0.06 28)`,
            borderRadius: VT.r.md,
            fontSize: 13,
            color: "oklch(0.4 0.15 28)",
            marginBottom: 14
          }, children: decryptError }),
          /* @__PURE__ */ jsx8(
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
          /* @__PURE__ */ jsxs7("div", { style: { marginTop: 14, display: "flex", gap: 8 }, children: [
            /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", style: { flex: 1 }, onClick: cancel, disabled: !!decryptLoading, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
            /* @__PURE__ */ jsx8(
              Btn,
              {
                size: "sm",
                style: { flex: 1 },
                onClick: submitDecrypt,
                disabled: !totp || totp.length < 6 || !!decryptLoading,
                iconRight: decryptLoading ? /* @__PURE__ */ jsx8(Spinner, { size: 14 }) : void 0,
                children: decryptLoading ? "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u044B\u0432\u0430\u0435\u043C\u2026" : "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u0442\u044C"
              }
            )
          ] })
        ] }) : /* @__PURE__ */ jsxs7(Fragment10, { children: [
          /* @__PURE__ */ jsxs7("h3", { id: "decrypt-title", style: { fontSize: 18, fontWeight: 700, margin: "0 0 8px" }, children: [
            "\u0420\u0430\u0441\u0448\u0438\u0444\u0440\u043E\u0432\u0430\u043D\u043E \xB7 ",
            decryptedRows.length
          ] }),
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, color: VT.inkFaint, display: "block", marginBottom: 12 }, children: "\u0417\u0430\u043B\u043E\u0433\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0432 audit-log. \u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u043E\u043A\u043D\u043E \u2014 plaintext \u0438\u0441\u0447\u0435\u0437\u043D\u0435\u0442 \u0438\u0437 DOM." }),
          /* @__PURE__ */ jsx8("div", { style: { maxHeight: 360, overflow: "auto", display: "flex", flexDirection: "column", gap: 10 }, children: decryptedRows.map((r) => /* @__PURE__ */ jsxs7(Card, { style: { padding: 12, border: `1px solid ${VT.line}` }, children: [
            /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }, children: [
              /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11.5 }, children: r.id }),
              /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: r.site_id }),
              /* @__PURE__ */ jsx8(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(r.created_at) })
            ] }),
            /* @__PURE__ */ jsx8("div", { style: { fontSize: 13, fontWeight: 500 }, children: r.name || "\u2014" }),
            /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: r.phone || "\u2014" }),
            r.message && /* @__PURE__ */ jsxs7("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 4, lineHeight: 1.5 }, children: [
              "\xAB",
              r.message,
              "\xBB"
            ] })
          ] }, r.id)) }),
          /* @__PURE__ */ jsx8("div", { style: { marginTop: 14, display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsx8(Btn, { size: "sm", onClick: cancel, children: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" }) })
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
  const Wrap = _embed === false ? React3.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "waitlist" };
  const items = d.items || [];
  const readyItems = items.filter((it) => it.ready);
  const restItems = items.filter((it) => !it.ready);
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx8(Eyebrow, { children: "WAITLIST \xB7 ADR-0009" }),
    /* @__PURE__ */ jsx8("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 6px" }, children: /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0413\u043E\u043B\u043E\u0441\u0430 \u043F\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430\u043C" }) }),
    /* @__PURE__ */ jsxs7("p", { style: { fontSize: 14, color: VT.inkSoft, margin: "0 0 22px", maxWidth: 680 }, children: [
      "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E ",
      /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: "source_name" }),
      ". \u0417\u0435\u043B\u0451\u043D\u044B\u043C \u2014 \u2265",
      d.threshold,
      " \u0433\u043E\u043B\u043E\u0441\u043E\u0432, \u043C\u043E\u0436\u043D\u043E \u043F\u0440\u0438\u043E\u0440\u0438\u0442\u0438\u0437\u0438\u0440\u043E\u0432\u0430\u0442\u044C ADR."
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    !loading && items.length === 0 && /* @__PURE__ */ jsx8(Card, { style: { padding: 0 }, children: /* @__PURE__ */ jsx8(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u043F\u0440\u043E\u0441\u043E\u0432 \u043D\u0430 \u043D\u043E\u0432\u044B\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438", hint: "\u0413\u043E\u043B\u043E\u0441\u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u044E\u0442\u0441\u044F \u0438\u0437 feedback-\u0444\u043E\u0440\u043C\u044B \u0438 source-detection \xABunknown\xBB." }) }),
    (loading || items.length > 0) && /* @__PURE__ */ jsx8(Card, { style: { padding: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsxs7("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13.5 }, children: [
      /* @__PURE__ */ jsx8("thead", { children: /* @__PURE__ */ jsx8("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "\u0413\u043E\u043B\u043E\u0441\u043E\u0432", "\u041F\u0435\u0440\u0432\u043E\u0435 \u043E\u0431\u0440\u0430\u0449\u0435\u043D\u0438\u0435", ""].map((h) => /* @__PURE__ */ jsx8("th", { scope: "col", style: { textAlign: "left", padding: "12px 16px", fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.08em", color: VT.inkFaint, fontWeight: 500 }, children: h.toUpperCase() }, h || "go")) }) }),
      /* @__PURE__ */ jsxs7("tbody", { children: [
        loading && [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx8("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [200, 100, 140, 120].map((w, j) => /* @__PURE__ */ jsx8("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx8(SkeletonBlock, { width: w, height: 14 }) }, j)) }, i)),
        !loading && readyItems.map((it) => /* @__PURE__ */ jsx8(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name)),
        !loading && readyItems.length > 0 && restItems.length > 0 && /* @__PURE__ */ jsx8("tr", { "aria-hidden": "true", children: /* @__PURE__ */ jsx8("td", { colSpan: 4, style: { padding: "6px 16px", background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: /* @__PURE__ */ jsxs7(Mono, { style: { fontSize: 10.5, color: VT.inkFaint, letterSpacing: "0.08em" }, children: [
          "\u2500\u2500\u2500 \u041D\u0418\u0416\u0415 \u041F\u041E\u0420\u041E\u0413\u0410 (",
          d.threshold,
          " \u0413\u041E\u041B\u041E\u0421\u041E\u0412) \u2500\u2500\u2500"
        ] }) }) }),
        !loading && restItems.map((it) => /* @__PURE__ */ jsx8(WaitlistRow, { item: it, threshold: d.threshold, onMarkInDevelopment }, it.source_name))
      ] })
    ] }) })
  ] }) });
}
function WaitlistRow({ item, threshold, onMarkInDevelopment }) {
  return /* @__PURE__ */ jsxs7("tr", { style: {
    borderBottom: `1px solid ${VT.lineSoft}`,
    background: item.ready ? "oklch(0.97 0.03 145 / 0.5)" : "transparent"
  }, children: [
    /* @__PURE__ */ jsx8("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, padding: "2px 7px", background: VT.bgSoft, borderRadius: 4 }, children: item.source_name }),
      /* @__PURE__ */ jsx8("span", { style: { fontWeight: 500 }, children: SOURCE_LABELS[item.source_name] || item.source_name })
    ] }) }),
    /* @__PURE__ */ jsx8("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx8("span", { style: { fontSize: 22, fontWeight: 700, color: item.ready ? VT.success : VT.ink }, children: item.votes }),
      item.ready && /* @__PURE__ */ jsxs7(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: [
        "\u2265 ",
        threshold,
        " \xB7 \u041F\u041E\u0420\u0410"
      ] })
    ] }) }),
    /* @__PURE__ */ jsx8("td", { style: { padding: "14px 16px" }, children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: item.first_seen }) }),
    /* @__PURE__ */ jsx8("td", { style: { padding: "14px 16px", textAlign: "right" }, children: item.ready ? /* @__PURE__ */ jsx8(Btn, { size: "sm", onClick: () => onMarkInDevelopment && onMarkInDevelopment(item.source_name), children: "\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043E\u0442\u043A\u0443" }) : /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2014" }) })
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
  return /* @__PURE__ */ jsx8("span", { style: { display: "inline-flex", padding: "2px 8px", borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: "0.06em" }, children: m[0].toUpperCase() });
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
  const Wrap = _embed === false ? React3.Fragment : AdminChrome;
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
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx8(Eyebrow, { children: "FEEDBACK INBOX" }),
    /* @__PURE__ */ jsx8("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" }) }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 10, marginBottom: 14, alignItems: "center", flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx8("div", { style: { display: "flex", gap: 6 }, children: FB_TYPE_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx8(
        FilterChip,
        {
          label,
          active: typeFilter === key,
          onClick: () => onTypeFilterChange && onTypeFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx8("div", { style: { marginLeft: "auto" }, children: /* @__PURE__ */ jsx8(
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
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 0, overflow: "hidden" }, children: [
        loading && [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxs7("div", { style: { padding: "14px 16px", borderBottom: `1px solid ${VT.lineSoft}` }, children: [
          /* @__PURE__ */ jsx8(SkeletonBlock, { width: "60%", height: 12, style: { marginBottom: 6 } }),
          /* @__PURE__ */ jsx8(SkeletonBlock, { width: "90%", height: 14 })
        ] }, i)),
        !loading && (d.items || []).length === 0 && /* @__PURE__ */ jsx8(EmptyState, { title: "Inbox \u043F\u0443\u0441\u0442", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u043E\u0441\u0442\u0430\u0432\u0438\u0442 feedback \u2014 \u043E\u043D \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
        !loading && (d.items || []).map((row, i, arr) => {
          const isSelected = selected && selected.id === row.id;
          return /* @__PURE__ */ jsxs7(
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
                /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }, children: [
                  /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11.5 }, children: row.id }),
                  /* @__PURE__ */ jsx8(FbTypePill, { type: row.type }),
                  /* @__PURE__ */ jsx8(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(row.created_at) })
                ] }),
                /* @__PURE__ */ jsx8("div", { style: { fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: row.message }),
                /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, color: VT.inkFaint }, children: row.email_or_contact_masked || "\u2014" })
              ]
            },
            row.id
          );
        }),
        !loading && (d.items || []).length > 0 && onPageChange && /* @__PURE__ */ jsxs7("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft, borderTop: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsxs7("span", { children: [
            d.offset + 1,
            "\u2013",
            Math.min(d.offset + d.limit, d.total),
            " \u0438\u0437 ",
            d.total
          ] }),
          /* @__PURE__ */ jsxs7("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(Math.max(0, d.offset - d.limit), d.limit), disabled: d.offset === 0, children: "\u2190" }),
            /* @__PURE__ */ jsx8(Btn, { variant: "ghost", size: "sm", onClick: () => onPageChange(d.offset + d.limit, d.limit), disabled: d.offset + d.limit >= d.total, children: "\u2192" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx8(Card, { style: { padding: 22 }, children: !selected ? /* @__PURE__ */ jsx8(EmptyState, { title: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0437\u0430\u043F\u0438\u0441\u044C \u0441\u043B\u0435\u0432\u0430" }) : /* @__PURE__ */ jsxs7(Fragment10, { children: [
        /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx8(Mono, { children: selected.id }),
          /* @__PURE__ */ jsx8(FbTypePill, { type: selected.type }),
          /* @__PURE__ */ jsx8(Mono, { style: { marginLeft: "auto", fontSize: 11, color: VT.inkFaint }, children: formatTs2(selected.created_at) })
        ] }),
        /* @__PURE__ */ jsx8("h3", { style: { fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 6px" }, children: selected.type === "source_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430" : selected.type === "feature_request" ? "\u0417\u0430\u043F\u0440\u043E\u0441 \u0444\u0438\u0447\u0438" : selected.type === "bug" ? "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0431 \u043E\u0448\u0438\u0431\u043A\u0435" : "\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435" }),
        selected.email_or_contact_masked && /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12, color: VT.inkSoft }, children: selected.email_or_contact_masked }),
        /* @__PURE__ */ jsx8("p", { style: { fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: "14px 0 18px" }, children: selected.message }),
        selected.source_name && /* @__PURE__ */ jsxs7("div", { style: { marginBottom: 14 }, children: [
          /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE NAME" }),
          /* @__PURE__ */ jsx8("div", { style: { marginTop: 4 }, children: /* @__PURE__ */ jsx8(Badge, { kind: "info", style: { padding: "3px 10px", fontSize: 12 }, children: selected.source_name }) })
        ] }),
        selected.checkboxes && Object.keys(selected.checkboxes).length > 0 && /* @__PURE__ */ jsxs7("details", { open: false, children: [
          /* @__PURE__ */ jsx8("summary", { style: {
            fontFamily: VT.font.mono,
            fontSize: 10.5,
            letterSpacing: "0.1em",
            color: VT.inkSoft,
            cursor: "pointer",
            padding: "6px 0",
            listStyle: "none"
          }, children: "CHECKBOXES \xB7 JSONB \u25BE" }),
          /* @__PURE__ */ jsx8("pre", { style: {
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
  return /* @__PURE__ */ jsxs7("span", { style: {
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
    /* @__PURE__ */ jsx8("span", { "aria-hidden": "true", children: on ? "\u2713" : "\u26A0" }),
    label || (on ? "\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D" : "\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D")
  ] });
}
function KeyValueRow({ label, children }) {
  return /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px dashed ${VT.line}`, gap: 16 }, children: [
    /* @__PURE__ */ jsx8("span", { style: { fontSize: 13, color: VT.inkSoft }, children: label }),
    /* @__PURE__ */ jsx8("div", { children })
  ] });
}
function S19_Settings({ data, loading, error, onRefresh, _embed }) {
  const d = data || MOCK_SETTINGS;
  const Wrap = _embed === false ? React3.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "settings" };
  const envBadge = d.environment === "prod" ? { kind: "danger", label: "PROD" } : d.environment === "staging" ? { kind: "warn", label: "STAGING" } : { kind: "info", label: "DEV" };
  return /* @__PURE__ */ jsx8(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs7("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx8(Eyebrow, { children: "SETTINGS \xB7 SYSTEM" }),
    /* @__PURE__ */ jsxs7("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx8("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u0421\u0438\u0441\u0442\u0435\u043C\u0430" }),
      onRefresh && /* @__PURE__ */ jsx8(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" })
    ] }),
    error && /* @__PURE__ */ jsx8("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx8(ErrorBlock, { message: error, onRetry: onRefresh }) }),
    loading && /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 200, radius: 10 }),
      /* @__PURE__ */ jsx8(SkeletonBlock, { width: "100%", height: 200, radius: 10 })
    ] }),
    !loading && /* @__PURE__ */ jsxs7("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0421\u0420\u0415\u0414\u0410" }),
        /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Environment", children: /* @__PURE__ */ jsx8(Badge, { kind: envBadge.kind, style: { padding: "2px 10px", fontSize: 11.5 }, children: envBadge.label }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Log level", children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 13 }, children: d.log_level }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0411\u0410\u0417\u041E\u0412\u042B\u0415 URL" }),
        /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "App", children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: d.app_base_url }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Landing", children: /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 12 }, children: d.landing_base_url }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Sites", children: /* @__PURE__ */ jsxs7(Mono, { style: { fontSize: 12 }, children: [
            "*.",
            d.sites_base_domain
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "FEATURE FLAGS" }),
        /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "MAX-bot integration", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.feature_max_bot, label: d.feature_max_bot ? "on" : "off" }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Auto-sync sites", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.feature_auto_sync, label: d.feature_auto_sync ? "on" : "off" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs7(Card, { style: { padding: 22 }, children: [
        /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0412\u041D\u0415\u0428\u041D\u0418\u0415 \u0421\u0415\u0420\u0412\u0418\u0421\u042B" }),
        /* @__PURE__ */ jsxs7("div", { style: { marginTop: 10 }, children: [
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Captcha", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.captcha_configured }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Telegram-\u0431\u043E\u0442", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.tg_bot_configured }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "YandexGPT", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.yandexgpt_configured }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "\u042EKassa", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.yookassa_configured }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "S3 storage", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.s3_configured }) }),
          /* @__PURE__ */ jsx8(KeyValueRow, { label: "Fernet keys", children: /* @__PURE__ */ jsx8(ConfiguredBadge, { on: d.fernet_keys_configured }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx8(Mono, { style: { fontSize: 11, color: VT.inkFaint, marginTop: 14, display: "block" }, children: "Read-only snapshot. \u0417\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0441\u0435\u043A\u0440\u0435\u0442\u043E\u0432 \u043D\u0435 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u044E\u0442\u0441\u044F \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u0430\u0442\u0443\u0441 \xAB\u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D/\u043D\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0435\u043D\xBB." })
  ] }) });
}
var SitesList = S14_SitesList;
var SiteDetail = S15_SiteDetail;
var Leads = S16_Leads;
var Waitlist = S17_Waitlist;
var FeedbackInbox = S18_FeedbackInbox;
var Settings = S19_Settings;

// src/source/index.tsx
import { jsx as jsx9, jsxs as jsxs8 } from "react/jsx-runtime";
function MiniHero({ url }) {
  return /* @__PURE__ */ jsxs8("div", { style: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.pill,
    padding: 8,
    boxShadow: VT.shadow.card
  }, children: [
    /* @__PURE__ */ jsxs8("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }, children: [
      /* @__PURE__ */ jsx9(IconLink, {}),
      /* @__PURE__ */ jsx9("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: VT.ink,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }, children: url })
    ] }),
    /* @__PURE__ */ jsx9(Btn, { iconRight: /* @__PURE__ */ jsx9(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
  ] });
}
function StateBadge({ kind, icon, children }) {
  return /* @__PURE__ */ jsxs8("span", { style: {
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
    /* @__PURE__ */ jsx9("span", { style: { width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: icon }),
    children
  ] });
}
var STATES = [
  {
    id: "loading",
    label: "1 \xB7 Loading",
    kind: "neutral",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "neutral", icon: /* @__PURE__ */ jsx9(Spinner, {}), children: "\u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" }),
    note: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u043B \u0442\u0438\u043F (<100ms). \u0417\u0430\u043F\u0440\u043E\u0441 preview API \u0432 \u0444\u043E\u043D\u0435, 3s timeout.",
    api: "GET /api/preview?url=\u2026 (debounced 300ms)"
  },
  {
    id: "tg-success",
    label: "2 \xB7 \u2713 Telegram",
    kind: "success",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx9("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx9("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B \u2014 \u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E" }),
    note: "Bot API getChat + getChatHistory(1). CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB \u0430\u043A\u0442\u0438\u0432\u043D\u0430 \u2014 open Submit modal.",
    api: 'GET /api/preview \u2192 {source:"telegram", posts:47, photos:12}'
  },
  {
    id: "ymaps-success",
    label: "3 \xB7 \u2713 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    kind: "success",
    url: "yandex.ru/maps/-/CDvI7QJM",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx9("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx9("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u2014 \u043D\u0430\u0448\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443, 24 \u043E\u0442\u0437\u044B\u0432\u0430 \u0438 18 \u0444\u043E\u0442\u043E" }),
    note: "Geosearch API find. \u0415\u0441\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u2192 fallback \u043A \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u043E\u043C\u0443 \u2713 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B.",
    api: 'GET /api/preview \u2192 {source:"yandex_maps", reviews:24, photos:18}'
  },
  {
    id: "preview-timeout",
    label: "4 \xB7 \u2713 \u0411\u0435\u0437 \u0447\u0438\u0441\u0435\u043B (preview timeout >3s)",
    kind: "success",
    url: "t.me/privatechannel",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx9("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx9("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B" }),
    note: "FR-005a: regex \u043E\u0442\u0434\u0430\u043B \u0442\u0438\u043F, preview API \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0437\u0430 3s \u2192 \u0431\u0435\u0439\u0434\u0436 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E.",
    api: "Timeout fallback \u2014 UI \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 submit"
  },
  {
    id: "ig-waitlist",
    label: "5 \xB7 \u2139\uFE0F Instagram \u2014 waitlist + photo CTA",
    kind: "info",
    url: "instagram.com/master.nails.spb",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx9("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "Instagram \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
    waitlist: true,
    photoCta: true,
    note: "ADR-0009: known waitlist source. \u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u0430\u044F CTA \u0437\u0430\u043A\u0440\u044B\u0432\u0430\u0435\u0442 80% IG-\u044E\u0437\u0435\u0440\u043E\u0432 \u0447\u0435\u0440\u0435\u0437 S4 (\u0444\u043E\u0442\u043E).",
    api: 'POST /api/feedback { type:"source_request", source_name:"instagram" }'
  },
  {
    id: "vk-waitlist",
    label: "6 \xB7 \u2139\uFE0F \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u2014 waitlist + photo CTA",
    kind: "info",
    url: "vk.com/master_nails",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx9("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
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
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx9("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "2GIS \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
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
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx9("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E?" }),
    unknownInput: true,
    note: "Open input. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u043A\u0430\u043A source_request c source_name=user-typed \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438.",
    api: 'POST /api/feedback { type:"source_request", source_name:<user>, source_url_raw:<url> }'
  },
  {
    id: "not-url",
    label: "9 \xB7 \u26A0\uFE0F \u041D\u0435 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438 \u043D\u0435 \u0444\u0430\u0439\u043B",
    kind: "warn",
    url: "\u043C\u0430\u0441\u0442\u0435\u0440 \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430",
    badge: /* @__PURE__ */ jsx9(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx9("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" }),
    note: "CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB disabled, fallback-\u0441\u0441\u044B\u043B\u043A\u0430 \xAB\u{1F4F7} \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E\xBB \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u0430.",
    api: "\u2014 (client-side only)"
  }
];
function WaitlistCapture({ source, withPhotoCta }) {
  const label = source === "instagram" ? "Instagram" : source === "vk" ? "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435" : source === "2gis" ? "2GIS" : source;
  return /* @__PURE__ */ jsxs8("div", { style: {
    marginTop: 12,
    background: VT.infoSoft,
    border: `1px solid oklch(0.85 0.05 240)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsxs8("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.32 0.10 240)" }, children: [
      "\u041D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u043E\u0433\u0434\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u043C ",
      label
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx9(Input, { placeholder: "email \u0438\u043B\u0438 @telegram", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx9(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })
    ] }),
    withPhotoCta && /* @__PURE__ */ jsxs8("div", { style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px dashed oklch(0.85 0.05 240)`,
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0418\u043B\u0438 \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F:",
      /* @__PURE__ */ jsxs8("a", { style: {
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
        /* @__PURE__ */ jsx9(IconArrow, { size: 14 })
      ] })
    ] })
  ] });
}
function UnknownSourceInput() {
  return /* @__PURE__ */ jsxs8("div", { style: {
    marginTop: 12,
    background: VT.warnSoft,
    border: `1px solid oklch(0.85 0.06 70)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx9("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.36 0.13 70)" }, children: "\u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A?" }),
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10 }, children: [
      /* @__PURE__ */ jsx9(Input, { placeholder: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \xAB\u0414\u0437\u0435\u043D\xBB \u0438\u043B\u0438 \xAB\u0441\u0432\u043E\u0439 \u0431\u043B\u043E\u0433\xBB)", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx9(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u043E\u0431\u0449\u0438\u0442\u044C" })
    ] })
  ] });
}
function StateRow({ s }) {
  return /* @__PURE__ */ jsx9(Card, { style: { padding: 24 }, children: /* @__PURE__ */ jsxs8("div", { style: { display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 32 }, children: [
    /* @__PURE__ */ jsxs8("div", { children: [
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsx9(MiniHero, { url: s.url }),
      /* @__PURE__ */ jsx9("div", { style: { marginTop: 12, paddingLeft: 16 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx9(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx9(UnknownSourceInput, {})
    ] }),
    /* @__PURE__ */ jsxs8("div", { style: { borderLeft: `1px dashed ${VT.line}`, paddingLeft: 24 }, children: [
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: "\u041B\u041E\u0413\u0418\u041A\u0410" }),
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 14, lineHeight: 1.5, color: VT.ink }, children: s.note }),
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, margin: "16px 0 6px" }, children: "API" }),
      /* @__PURE__ */ jsx9("div", { style: {
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
  return /* @__PURE__ */ jsxs8("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "40px 56px 64px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx9(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 SOURCE DETECTION" }),
      /* @__PURE__ */ jsx9(Mono, { style: { fontSize: 12 }, children: "FR-005, FR-005a, ADR-0009" })
    ] }),
    /* @__PURE__ */ jsx9("h2", { style: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.1 }, children: "\u0411\u0435\u0439\u0434\u0436\u0438 \u043F\u043E\u0434 input \u2014 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F live preview" }),
    /* @__PURE__ */ jsx9("p", { style: { fontSize: 16, lineHeight: 1.5, color: VT.inkSoft, maxWidth: 820, margin: "0 0 32px" }, children: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0437\u0430 <100ms \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0431\u0435\u0439\u0434\u0436. \u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E preview API (3s timeout) \u0434\u043E\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0447\u0438\u0441\u043B\u0430\u043C\u0438. MVP-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438: Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B. \u041E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u2014 waitlist + \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u0430\u044F CTA \u043D\u0430 \u0444\u043E\u0442\u043E-\u0444\u043B\u043E\u0443." }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: STATES.map((s) => /* @__PURE__ */ jsx9(StateRow, { s }, s.id)) })
  ] });
}
function S2_Mobile() {
  const mobile = STATES.filter((s) => ["loading", "tg-success", "ig-waitlist", "unknown-url"].includes(s.id));
  return /* @__PURE__ */ jsxs8("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "20px 16px 40px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsx9(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 MOBILE" }),
    /* @__PURE__ */ jsx9("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "12px 0 18px", lineHeight: 1.15 }, children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0431\u0435\u0439\u0434\u0436\u0430 \u2014 4 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445" }),
    /* @__PURE__ */ jsx9("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: mobile.map((s) => /* @__PURE__ */ jsxs8(Card, { style: { padding: 14 }, children: [
      /* @__PURE__ */ jsx9("div", { style: { fontSize: 10.5, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 6 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsxs8("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.lg,
        padding: 10
      }, children: [
        /* @__PURE__ */ jsxs8("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 8px" }, children: [
          /* @__PURE__ */ jsx9(IconLink, {}),
          /* @__PURE__ */ jsx9("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s.url })
        ] }),
        /* @__PURE__ */ jsx9(Btn, { iconRight: /* @__PURE__ */ jsx9(IconArrow, {}), style: { borderRadius: VT.r.md, width: "100%" }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
      ] }),
      /* @__PURE__ */ jsx9("div", { style: { marginTop: 10 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx9(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx9(UnknownSourceInput, {})
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
  BigFeaturesSection,
  BrandMark,
  Btn,
  CanonStyles,
  Card,
  Checkbox,
  ClientAdminDemo,
  ConceptA_Desktop,
  ConceptA_Mobile,
  Confirmation,
  CustomerSite,
  EmptyState,
  ErrorBlock,
  ExamplesSection,
  Eyebrow,
  FaqSection,
  FeatureCard,
  FeatureGlyph,
  FeedbackInbox,
  FeedbackPage,
  FilterChip,
  FreeMonthSection,
  HeroBlock,
  HeroSection,
  IconArrow,
  IconLink,
  Input,
  Landing,
  LeadForm,
  Leads,
  Logo,
  Mono,
  OwnershipSection,
  PhotoDrawer,
  PlatformCard,
  PlatformLogo,
  PlatformsSection,
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
  S2_Desktop,
  S2_Mobile,
  S3_Step1_Link,
  S3_Step2_Contact,
  S3_Step3_TgBot,
  S3_SubmitModal,
  S5_Confirmation,
  S6_PhotoDrawer,
  S7_CustomerSite,
  S7_SchemeSwatches,
  S8_LeadFormConfirm,
  S9_FeedbackPage,
  SamosaytLanding,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  SectionSub,
  SectionTitle,
  Settings,
  SiteCard,
  SiteDetail,
  SitesList,
  SkeletonBlock,
  SourceDetectionBadge,
  Spinner,
  StatTile,
  StatusPill,
  StorySection,
  StoryStepColorful,
  SubmitModal,
  TrendChart,
  VT,
  Waitlist,
  tokens
};
//# sourceMappingURL=index.js.map