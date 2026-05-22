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
var G_BG = VT.accentSoft;
var G_INK = VT.accent;
var G_INK_DARK = "oklch(0.32 0.14 35)";
function Glyph({ size = 88, children, tint }) {
  return /* @__PURE__ */ jsx2("div", { style: {
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
  return /* @__PURE__ */ jsx2(Glyph, { size, children: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: size * 0.7, height: size * 0.7, fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx2("rect", { x: "10", y: "24", width: "44", height: "28", rx: "3" }),
    /* @__PURE__ */ jsx2("path", { d: "M10 24 L54 24" }),
    /* @__PURE__ */ jsx2("path", { d: "M32 24 L32 52" }),
    /* @__PURE__ */ jsx2("path", { d: "M22 24 C 22 14, 32 14, 32 24" }),
    /* @__PURE__ */ jsx2("path", { d: "M42 24 C 42 14, 32 14, 32 24" })
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
    src && /* @__PURE__ */ jsx2(
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
    !src && /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: `
            radial-gradient(60% 30% at 20% 5%, rgba(255,255,255,0.18) 0%, transparent 60%),
            radial-gradient(40% 20% at 80% 95%, rgba(0,0,0,0.15) 0%, transparent 60%)
          `
    } }),
    children,
    label && !src && /* @__PURE__ */ jsx2("span", { style: {
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
  return /* @__PURE__ */ jsx2("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: filled ? "#f4a93b" : "none", stroke: filled ? "#f4a93b" : "#ccc", strokeWidth: "1.5", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" }) });
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
  return /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.line } }),
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
      logo && /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 12.5, fontWeight: 700, color: p.ink, letterSpacing: "-0.015em" }, children: name }),
      /* @__PURE__ */ jsx2("span", { style: {
        marginLeft: "auto",
        fontFamily: VT.font.mono,
        fontSize: 10.5,
        color: p.sub,
        whiteSpace: "nowrap"
      }, children: phone }),
      /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("h3", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx2(Star, { filled: true, size: 10 }, i)) }),
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
      /* @__PURE__ */ jsx2("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx2(PhotoBlock, { tone: ph, src: heroPhoto, style: {
        aspectRatio: "16 / 9",
        borderRadius: 8,
        border: `1px solid ${VT.line}`
      } }) }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: 10, display: "flex", gap: 6 }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
          flex: 1,
          textAlign: "center",
          padding: "8px 10px",
          borderRadius: 8,
          background: p.ac,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600
        }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u2192" }),
        /* @__PURE__ */ jsx2("span", { style: {
          padding: "8px 10px",
          borderRadius: 8,
          background: "transparent",
          color: p.ink,
          border: `1px solid ${VT.line}`,
          fontFamily: VT.font.mono,
          fontSize: 11,
          whiteSpace: "nowrap",
          flex: "0 0 auto"
        }, "aria-label": phone, children: /* @__PURE__ */ jsx2("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", style: { display: "inline-block", verticalAlign: "middle" }, children: /* @__PURE__ */ jsx2("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) })
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
      /* @__PURE__ */ jsx2("span", { children: "\u041D\u0410\u0421 \u0412\u042B\u0411\u0420\u0410\u041B\u0418" }),
      /* @__PURE__ */ jsx2("b", { style: { fontFamily: VT.font.sans, fontSize: 13, color: p.ink, letterSpacing: "-0.02em" }, children: clientsCount }),
      /* @__PURE__ */ jsx2("span", { children: "\u0427\u0415\u041B\u041E\u0412\u0415\u041A" }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: p.ac,
        fontWeight: 600,
        marginBottom: 8
      }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: services.slice(0, 3).map(([n, pr], i) => /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 10,
        padding: "8px 10px",
        display: "flex",
        alignItems: "center",
        gap: 8
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, fontWeight: 600, color: p.ink, letterSpacing: "-0.01em" }, children: n }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: p.ink, marginTop: 1 }, children: pr })
        ] }),
        /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("div", { style: {
        display: "flex",
        alignItems: "baseline",
        marginBottom: 8
      }, children: /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 9.5,
        letterSpacing: "0.12em",
        color: p.ac,
        fontWeight: 600
      }, children: "\u041E\u0422\u0417\u042B\u0412\u042B" }) }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: reviews.slice(0, 2).map((r, i) => /* @__PURE__ */ jsxs2("div", { style: {
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: 10,
        padding: "8px 10px",
        position: "relative"
      }, children: [
        i === 0 && /* @__PURE__ */ jsx2("span", { style: {
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
          /* @__PURE__ */ jsx2(MiniAvatar, { name: r.author, tone: reviewTones[i % reviewTones.length], size: 22 }),
          /* @__PURE__ */ jsxs2("div", { style: { minWidth: 0 }, children: [
            /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, fontWeight: 600, color: p.ink, lineHeight: 1.1 }, children: r.author }),
            /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 1, marginTop: 1 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx2(Star, { filled: true, size: 8 }, j)) })
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
    /* @__PURE__ */ jsx2("div", { style: { padding: "12px 14px" }, children: /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 3
    }, children: gallery.slice(0, 4).map((g, i) => /* @__PURE__ */ jsx2(
      PhotoBlock,
      {
        tone: g.tone || ph,
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
    logo: /* @__PURE__ */ jsx2(YandexIcon, {}),
    pull: "\u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0440\u0435\u0436\u0438\u043C \u0440\u0430\u0431\u043E\u0442\u044B",
    featured: true
  },
  {
    id: "telegram",
    name: "Telegram-\u043A\u0430\u043D\u0430\u043B",
    bg: "#229ED9",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx2(PlaneIcon, {}),
    pull: "\u043F\u043E\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  },
  {
    id: "instagram",
    name: "Instagram",
    bg: "linear-gradient(135deg, #FEDA77 0%, #F58529 30%, #DD2A7B 60%, #8134AF 100%)",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx2(CameraIcon, {}),
    pull: "\u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F"
  },
  {
    id: "2gis",
    name: "2\u0413\u0418\u0421",
    bg: "transparent",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx2(TwoGisIcon, {}),
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043E\u0442\u0437\u044B\u0432\u044B \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  },
  {
    id: "avito",
    name: "Avito",
    bg: "transparent",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx2(AvitoIcon, {}),
    pull: "\u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u0446\u0435\u043D\u044B \xB7 \u043E\u0442\u0437\u044B\u0432\u044B"
  },
  {
    id: "site",
    name: "\u0412\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442",
    bg: "oklch(0.42 0.04 250)",
    fg: "#fff",
    logo: /* @__PURE__ */ jsx2(GlobeMini, {}),
    pull: "\u0442\u0435\u043A\u0441\u0442\u044B \xB7 \u0444\u043E\u0442\u043E \xB7 \u0443\u0441\u043B\u0443\u0433\u0438"
  },
  {
    id: "card",
    name: "\u0424\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438\xA0\u043C\u0435\u043D\u044E",
    bg: "oklch(0.78 0.07 70)",
    fg: "#3a2410",
    logo: /* @__PURE__ */ jsx2(CardIcon, {}),
    pull: "\u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u0435\u043C \u0443\u0441\u043B\u0443\u0433\u0438 \xB7 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u044B"
  }
];
var PLATFORMS_SOON = [
  { id: "vk", name: "VK-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430", bg: "#0077FF", logo: "V" },
  { id: "ozon", name: "Ozon-\u0432\u0438\u0442\u0440\u0438\u043D\u0430", bg: "#005BFF", logo: "O" },
  { id: "youtube", name: "YouTube-\u043A\u0430\u043D\u0430\u043B", bg: "#FF0033", logo: /* @__PURE__ */ jsx2(PlayIcon, {}) }
];
function PlaneIcon() {
  return /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" }) });
}
function GlobeMini() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "9" }),
    /* @__PURE__ */ jsx2("ellipse", { cx: "12", cy: "12", rx: "4", ry: "9" }),
    /* @__PURE__ */ jsx2("path", { d: "M3 12h18" })
  ] });
}
function CardIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx2("rect", { x: "3", y: "6", width: "18", height: "12", rx: "2" }),
    /* @__PURE__ */ jsx2("path", { d: "M7 11h6M7 14h4" })
  ] });
}
function CameraIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", children: [
    /* @__PURE__ */ jsx2("rect", { x: "3", y: "6", width: "18", height: "14", rx: "2" }),
    /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "13", r: "4" }),
    /* @__PURE__ */ jsx2("path", { d: "M9 6l1-2h4l1 2" })
  ] });
}
function YandexIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", fill: "none", children: [
    /* @__PURE__ */ jsx2("path", { d: "M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z", fill: "#FC3F1D" }),
    /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "10", r: "3.2", fill: "#fff" })
  ] });
}
function TwoGisIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
    /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#19BB4F" }),
    /* @__PURE__ */ jsx2("text", { x: "12", y: "17", textAnchor: "middle", fontFamily: "Arial Black, Helvetica, sans-serif", fontWeight: "900", fontSize: "14", fill: "#fff", children: "2" })
  ] });
}
function AvitoIcon() {
  return /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: "22", height: "22", children: [
    /* @__PURE__ */ jsx2("rect", { width: "24", height: "24", rx: "6", fill: "#0AF" }),
    /* @__PURE__ */ jsx2("circle", { cx: "18", cy: "7.5", r: "3", fill: "#FF9C00" }),
    /* @__PURE__ */ jsx2("text", { x: "9", y: "17", textAnchor: "middle", fontFamily: "Arial, Helvetica, sans-serif", fontWeight: "800", fontSize: "10", fill: "#fff", children: "A" })
  ] });
}
function PlayIcon() {
  return /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M7 4 L20 12 L7 20 Z" }) });
}
function PlatformLogo({ size = 48, p }) {
  return /* @__PURE__ */ jsx2("span", { style: {
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
    /* @__PURE__ */ jsx2(PlatformLogo, { size: featured ? mobile ? 52 : 60 : mobile ? 44 : 50, p }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
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
    /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
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
    /* @__PURE__ */ jsx2("span", { style: {
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
    /* @__PURE__ */ jsx2("span", { style: { fontSize: 13.5, fontWeight: 500, color: VT.ink }, children: p.name }),
    /* @__PURE__ */ jsx2("span", { style: {
      fontFamily: VT.font.mono,
      fontSize: 10,
      letterSpacing: "0.1em",
      color: VT.inkFaint
    }, children: "\u0421\u041A\u041E\u0420\u041E" })
  ] });
}
function SectionTitle({ children, mobile, align = "center" }) {
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
function SectionSub({ children, mobile, align = "center" }) {
  return /* @__PURE__ */ jsx2("p", { style: {
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
      mobile ? " " : /* @__PURE__ */ jsx2("br", {}),
      /* @__PURE__ */ jsxs2("span", { style: { position: "relative", display: "inline-block", whiteSpace: mobile ? "normal" : "nowrap", color: VT.accent, padding: "0 2px" }, children: [
        "\u0441\u0430\u043C \u0441\u0435\u0431\u044F \u0441\u043E\u0431\u0435\u0440\u0451\u0442,",
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: {
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
      mobile ? " " : /* @__PURE__ */ jsx2("br", {}),
      /* @__PURE__ */ jsx2("span", { style: { display: "inline-block", whiteSpace: mobile ? "normal" : "nowrap", color: VT.accent, padding: "0 2px" }, children: "\u0441\u0430\u043C \u043E\u0431\u043D\u043E\u0432\u0438\u0442" }),
      " ",
      /* @__PURE__ */ jsx2("span", { style: { display: "inline-block", whiteSpace: mobile ? "normal" : "nowrap", color: VT.accent, padding: "0 2px" }, children: "\u0438 \u0441\u0430\u043C \u043F\u0440\u0438\u0432\u0435\u0434\u0451\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432" })
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
      /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "\u0434\u0435\u043B\u0430\u0435\u0442 \u0432\u0441\u0451 \u0441\u0430\u043C" }),
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
        /* @__PURE__ */ jsx2(IconLink, {}),
        /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint, fontSize: mobile ? 16 : 17 }, children: "\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\xA0\u0432\u0430\u0448 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u0438\u043B\u0438\xA0\u0441\u0430\u0439\u0442" })
      ] }),
      /* @__PURE__ */ jsxs2(Btn, { style: { padding: mobile ? "14px 20px" : "14px 26px", borderRadius: mobile ? 10 : 999 }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: [
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
      /* @__PURE__ */ jsx2("div", { style: {
        fontFamily: VT.font.mono,
        fontSize: 11,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u0418\u0417\xA0\u0427\u0415\u0413\u041E \u041C\u042B\xA0\u041C\u041E\u0416\u0415\u041C \u0421\u0414\u0415\u041B\u0410\u0422\u042C \u0412\u0410\u041C \u0421\u0410\u0419\u0422" }),
      /* @__PURE__ */ jsx2("div", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: {
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
    /* @__PURE__ */ jsx2("div", { style: {
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
      /* @__PURE__ */ jsx2("span", { style: {
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
        /* @__PURE__ */ jsx2("path", { d: "M20 12 V22 H4 V12" }),
        /* @__PURE__ */ jsx2("rect", { x: "2", y: "7", width: "20", height: "5", rx: "1" }),
        /* @__PURE__ */ jsx2("path", { d: "M12 22 V7" }),
        /* @__PURE__ */ jsx2("path", { d: "M12 7 C 12 3.5, 7.5 3.5, 7.5 7 C 7.5 7, 9.5 7, 12 7 Z" }),
        /* @__PURE__ */ jsx2("path", { d: "M12 7 C 12 3.5, 16.5 3.5, 16.5 7 C 16.5 7, 14.5 7, 12 7 Z" })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", minWidth: 0 }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
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
          /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "990 \u20BD/\u043C\u0435\u0441" })
        ] })
      ] })
    ] }) })
  ] });
}
function ExamplesSection({ mobile }) {
  const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
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
      heroPhoto: U("photo-1604654894610-df63bc536371"),
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
        { src: U("photo-1607779097040-26e80aa78e66", 300) },
        { src: U("photo-1610992015732-2449b76344bc", 300) },
        { src: U("photo-1632345031435-8727f6897d53", 300) },
        { src: U("photo-1604902396830-aca29e19b067", 300) }
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
      heroPhoto: U("photo-1503951914875-452162b0f3f1"),
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
        { src: U("photo-1599351431202-1e0f0137899a", 300) },
        { src: U("photo-1585747860715-2ba37e788b70", 300) },
        { src: U("photo-1622286342621-4bd786c2447c", 300) },
        { src: U("photo-1521490683312-b1aa64c1e0e2", 300) }
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
      heroPhoto: U("photo-1545205597-3d9d02c29597"),
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
        { src: U("photo-1575052814086-f385e2e2ad1b", 300) },
        { src: U("photo-1599901860904-17e6ed7083a0", 300) },
        { src: U("photo-1506126613408-eca07ce68773", 300) },
        { src: U("photo-1532798442725-41036acc7489", 300) }
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
      /* @__PURE__ */ jsx2("span", { style: {
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
    /* @__PURE__ */ jsx2("div", { style: { flex: 1, minHeight: 0, display: "flex" }, children: /* @__PURE__ */ jsx2(SiteCard, { ...ex, mobile }) })
  ] }, ex.name);
  return /* @__PURE__ */ jsxs2("section", { style: { marginTop: mobile ? 60 : 96, position: "relative", zIndex: 1 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
        "\u0412\u043E\u0442 \u043A\u0430\u043A\u043E\u0439 \u0441\u0430\u0439\u0442 \u0432\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u0435",
        /* @__PURE__ */ jsx2("br", {}),
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
      /* @__PURE__ */ jsx2("style", { children: `.ss-carousel::-webkit-scrollbar { display: none; }` }),
      /* @__PURE__ */ jsxs2("div", { className: "ss-carousel", style: {
        display: "flex",
        gap: 14,
        padding: "0 20px 24px",
        alignItems: "flex-start"
      }, children: [
        examples.map((ex) => /* @__PURE__ */ jsx2(CardWithCaption, { ex, isCarousel: true }, ex.name)),
        /* @__PURE__ */ jsx2("div", { style: { flex: "0 0 6px" }, "aria-hidden": "true" })
      ] })
    ] }) : /* @__PURE__ */ jsx2("div", { style: {
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridAutoRows: "1fr",
      gap: 24,
      maxWidth: 1280,
      margin: "48px auto 0",
      alignItems: "stretch"
    }, children: examples.map((ex) => /* @__PURE__ */ jsx2(CardWithCaption, { ex }, ex.name)) }),
    /* @__PURE__ */ jsx2("div", { style: {
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
      /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
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
  const wrap = (kids) => /* @__PURE__ */ jsx2("div", { style: {
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
          /* @__PURE__ */ jsx2("path", { d: "M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3" }),
          /* @__PURE__ */ jsx2("path", { d: "M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3" })
        ] })
      );
    case "ai":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "currentColor", children: [
          /* @__PURE__ */ jsx2("path", { d: "M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z" }),
          /* @__PURE__ */ jsx2("circle", { cx: "50", cy: "50", r: "3.5" }),
          /* @__PURE__ */ jsx2("circle", { cx: "15", cy: "48", r: "2.5" })
        ] })
      );
    case "globe":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("circle", { cx: "32", cy: "32", r: "22" }),
          /* @__PURE__ */ jsx2("ellipse", { cx: "32", cy: "32", rx: "10", ry: "22" }),
          /* @__PURE__ */ jsx2("path", { d: "M10 32h44" })
        ] })
      );
    case "refresh":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx2("path", { d: "M14 32 a18 18 0 0 1 30 -13" }),
          /* @__PURE__ */ jsx2("path", { d: "M44 12 L44 22 L34 22" }),
          /* @__PURE__ */ jsx2("path", { d: "M50 32 a18 18 0 0 1 -30 13" }),
          /* @__PURE__ */ jsx2("path", { d: "M20 52 L20 42 L30 42" })
        ] })
      );
    case "inbox":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("rect", { x: "10", y: "14", width: "44", height: "36", rx: "5" }),
          /* @__PURE__ */ jsx2("path", { d: "M10 34 L22 34 L26 40 L38 40 L42 34 L54 34" })
        ] })
      );
    case "chart":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 64 64", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "3.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx2("path", { d: "M10 48 L24 30 L34 38 L54 14" }),
          /* @__PURE__ */ jsx2("path", { d: "M44 14 L54 14 L54 24" })
        ] })
      );
  }
}
function StepDecor({ palette, side }) {
  const dot = (style) => /* @__PURE__ */ jsx2("span", { style: {
    position: "absolute",
    borderRadius: "50%",
    background: palette.dec,
    ...style
  } });
  const ring = (style) => /* @__PURE__ */ jsx2("span", { style: {
    position: "absolute",
    borderRadius: "50%",
    border: `2.5px solid ${palette.ink}`,
    ...style
  } });
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    dot({ width: 16, height: 16, top: -8, right: 24, opacity: 0.9 }),
    ring({ width: 22, height: 22, bottom: -10, left: 30 }),
    dot({ width: 10, height: 10, top: 40, right: -6, opacity: 0.7 }),
    /* @__PURE__ */ jsx2("svg", { width: "20", height: "20", viewBox: "0 0 20 20", style: { position: "absolute", top: -10, left: side === "left" ? 60 : "auto", right: side === "right" ? 60 : "auto" }, children: /* @__PURE__ */ jsx2("path", { d: "M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z", fill: palette.dec, stroke: palette.ink, strokeWidth: "1.2", strokeLinejoin: "round" }) })
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
      /* @__PURE__ */ jsx2(StepDecor, { palette, side }),
      /* @__PURE__ */ jsxs2("div", { style: { position: "relative", flex: "0 0 auto" }, children: [
        /* @__PURE__ */ jsx2(StepGlyph, { palette, kind, size: glyphSize }),
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
        /* @__PURE__ */ jsx2("h3", { style: {
          fontSize: mobile ? 19 : 24,
          fontWeight: 700,
          letterSpacing: "-0.022em",
          margin: 0,
          lineHeight: 1.15,
          color: palette.ink
        }, children: title }),
        /* @__PURE__ */ jsx2("p", { style: {
          fontSize: mobile ? 14.5 : 16,
          lineHeight: 1.5,
          color: "oklch(0.32 0.02 60)",
          margin: "8px 0 0",
          textWrap: "pretty"
        }, children: body })
      ] })
    ] }),
    !last && /* @__PURE__ */ jsx2("div", { style: {
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
          /* @__PURE__ */ jsx2(
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
          /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: mobile ? 14 : 15, color: VT.ink }, children: `<\u0432\u0430\u0448-\u0441\u0430\u0439\u0442>.${BRAND.domain}` }),
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
    /* @__PURE__ */ jsx2("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
      "\u041E\u0442 \u0432\u0430\u0441 \u2014 \u043E\u0434\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435,",
      /* @__PURE__ */ jsx2("br", {}),
      "\u0432\u0441\u0451 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 ",
      BRAND.name,
      " \u0441\u0434\u0435\u043B\u0430\u0435\u0442 \u0441\u0430\u043C"
    ] }) }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 32 : 56,
      maxWidth: mobile ? "100%" : 960,
      margin: `${mobile ? 32 : 56}px auto 0`,
      display: "flex",
      flexDirection: "column"
    }, children: steps.map((s, i) => /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2("br", {}),
        "\u0434\u043B\u044F\xA0\u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F ",
        BRAND.name,
        "\u0430"
      ] }),
      /* @__PURE__ */ jsx2(SectionSub, { mobile, children: "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u043B\u044E\u0431\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430, \u0433\u0434\u0435 \u043F\u0440\u043E \u0432\u0430\u0441 \u0443\u0436\u0435 \u0447\u0442\u043E-\u0442\u043E \u043D\u0430\u043F\u0438\u0441\u0430\u043D\u043E \u0438\u043B\u0438\xA0\u043F\u043E\u043A\u0430\u0437\u0430\u043D\u043E" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: mobile ? 28 : 56,
      maxWidth: mobile ? "100%" : 1080,
      margin: `${mobile ? 28 : 56}px auto 0`
    }, children: [
      /* @__PURE__ */ jsx2(PlatformCard, { p: featured, featured: true, mobile }),
      /* @__PURE__ */ jsx2("div", { style: {
        marginTop: mobile ? 10 : 14,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(3, 1fr)",
        gap: mobile ? 10 : 14
      }, children: rest.slice(0, 3).map((p) => /* @__PURE__ */ jsx2(PlatformCard, { p, mobile }, p.id)) }),
      /* @__PURE__ */ jsx2("div", { style: {
        marginTop: mobile ? 10 : 14,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "repeat(2, 1fr)",
        gap: mobile ? 10 : 14
      }, children: rest.slice(3).map((p) => /* @__PURE__ */ jsx2(PlatformCard, { p, mobile }, p.id)) }),
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
          /* @__PURE__ */ jsx2("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11.5,
            letterSpacing: "0.14em",
            color: VT.inkSoft,
            fontWeight: 600
          }, children: "\u0421\u041A\u041E\u0420\u041E \u041F\u041E\u0414\u041A\u041B\u042E\u0427\u0418\u041C" }),
          /* @__PURE__ */ jsx2("a", { style: {
            fontSize: 13,
            color: VT.accent,
            textDecoration: "underline",
            textUnderlineOffset: 3,
            cursor: "pointer"
          }, children: "\u041D\u0435\u0442 \u0432\u0430\u0448\u0435\u0439? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u2192" })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: {
          marginTop: 14,
          display: "flex",
          flexWrap: "wrap",
          gap: 8
        }, children: PLATFORMS_SOON.map((p) => /* @__PURE__ */ jsx2(PlatformSoonPill, { p, mobile }, p.id)) })
      ] })
    ] })
  ] });
}
function FeatureGlyph({ kind, size = 44, tint }) {
  const color = tint?.fg || VT.accentInk;
  const bg = tint?.bg || VT.accentSoft;
  const wrap = (kids) => /* @__PURE__ */ jsx2("div", { style: {
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
          /* @__PURE__ */ jsx2("path", { d: "M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z" }),
          /* @__PURE__ */ jsx2("circle", { cx: "19", cy: "19", r: "1.6" }),
          /* @__PURE__ */ jsx2("circle", { cx: "5", cy: "17", r: "1.2" })
        ] })
      );
    case "refresh":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx2("path", { d: "M3 12 a9 9 0 0 1 15 -6.5" }),
          /* @__PURE__ */ jsx2("path", { d: "M18 3 v4 h-4" }),
          /* @__PURE__ */ jsx2("path", { d: "M21 12 a9 9 0 0 1 -15 6.5" }),
          /* @__PURE__ */ jsx2("path", { d: "M6 21 v-4 h4" })
        ] })
      );
    case "star":
      return wrap(
        /* @__PURE__ */ jsx2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M12 2 L14.6 8.6 L21.6 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.4 9.3 L9.4 8.6 Z" }) })
      );
    case "inbox":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("rect", { x: "3", y: "5", width: "18", height: "14", rx: "2" }),
          /* @__PURE__ */ jsx2("path", { d: "M3 14 h5 l1.5 2 h5 L16 14 h5" })
        ] })
      );
    case "bar":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("path", { d: "M4 20 V12" }),
          /* @__PURE__ */ jsx2("path", { d: "M10 20 V6" }),
          /* @__PURE__ */ jsx2("path", { d: "M16 20 V14" }),
          /* @__PURE__ */ jsx2("path", { d: "M22 20 V9" })
        ] })
      );
    case "search":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("circle", { cx: "11", cy: "11", r: "6.5" }),
          /* @__PURE__ */ jsx2("path", { d: "M16 16 L21 21" })
        ] })
      );
    case "phone":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("rect", { x: "6", y: "2.5", width: "12", height: "19", rx: "2.5" }),
          /* @__PURE__ */ jsx2("path", { d: "M11 18.5 h2" })
        ] })
      );
    case "shield":
      return wrap(
        /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: s, height: s, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: [
          /* @__PURE__ */ jsx2("path", { d: "M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z" }),
          /* @__PURE__ */ jsx2("path", { d: "M8.5 12 L11 14.5 L15.5 9.5" })
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
    /* @__PURE__ */ jsx2("div", { style: { position: "relative", zIndex: 1 }, children: /* @__PURE__ */ jsx2(FeatureGlyph, { kind, size: mobile ? 56 : 64, tint }) }),
    /* @__PURE__ */ jsx2("h3", { style: {
      fontSize: mobile ? 24 : 28,
      fontWeight: 800,
      letterSpacing: "-0.032em",
      margin: "6px 0 0",
      lineHeight: 1.05,
      color: VT.ink,
      position: "relative",
      zIndex: 1
    }, children: heading }),
    /* @__PURE__ */ jsx2("div", { style: {
      fontSize: mobile ? 14.5 : 15.5,
      fontWeight: 700,
      color: tint?.fg || VT.accent,
      lineHeight: 1.35,
      letterSpacing: "-0.005em",
      position: "relative",
      zIndex: 1
    }, children: subtitle }),
    /* @__PURE__ */ jsx2("p", { style: {
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
        /* @__PURE__ */ jsx2("br", {}),
        "\u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u043E\u043D ",
        BRAND.name
      ] }),
      /* @__PURE__ */ jsxs2(SectionSub, { mobile, children: [
        BRAND.name,
        " \u2014 \u044D\u0442\u043E \u043D\u0435\xA0\u043E\u0434\u0438\u043D \u0442\u0440\u044E\u043A, \u0430\xA0\u0432\u043E\u0441\u0435\u043C\u044C \u0432\u0435\u0449\u0435\u0439, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043E\u043D \u0434\u0435\u043B\u0430\u0435\u0442 \u0441\u0430\u043C \u2014 \u043E\u0442\xA0\u043F\u0435\u0440\u0432\u043E\u0433\u043E \xAB\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u043F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u043C\xBB \u0434\u043E\xA0\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 56,
      maxWidth: mobile ? "100%" : 1240,
      margin: `${mobile ? 28 : 56}px auto 0`,
      display: "grid",
      gridTemplateColumns: mobile ? "1fr" : "repeat(4, 1fr)",
      gap: mobile ? 14 : 18
    }, children: features.map((f, i) => /* @__PURE__ */ jsx2(FeatureCard, { ...f, idx: i, mobile, tint: FEATURE_TINTS[f.kind] }, f.heading)) })
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
      /* @__PURE__ */ jsx2("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.74 0.13 25)" } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.82 0.13 85)" } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.78 0.13 145)" } }),
      /* @__PURE__ */ jsxs2("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: [
        "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u2014 ",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { padding: mobile ? 18 : 22 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
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
            /* @__PURE__ */ jsx2("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.success } }),
            "\u043E\u043F\u0443\u0431\u043B\u0438\u043A\u043E\u0432\u0430\u043D \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0451\u043D \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u0432 14:02"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: {
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
        /* @__PURE__ */ jsx2("div", { style: {
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "-0.025em",
          color: s.tone === "accent" ? VT.accent : VT.ink,
          lineHeight: 1
        }, children: s.num }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 3 }, children: s.lbl })
      ] }, i)) }),
      /* @__PURE__ */ jsx2("div", { style: {
        marginTop: 16,
        fontFamily: VT.font.mono,
        fontSize: 10.5,
        letterSpacing: "0.1em",
        color: VT.inkFaint,
        fontWeight: 600
      }, children: "\u041F\u041E\u0421\u041B\u0415\u0414\u041D\u0418\u0415 \u0417\u0410\u042F\u0412\u041A\u0418" }),
      /* @__PURE__ */ jsx2("div", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: { fontWeight: 600, color: VT.ink, minWidth: 70 }, children: nm }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, color: VT.inkSoft, flex: 1 }, children: contact }),
        /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, color: VT.inkFaint, fontSize: 11 }, children: time })
      ] }, i)) }),
      /* @__PURE__ */ jsx2("div", { style: {
        marginTop: 16,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 8
      }, children: [
        ["\u270E  \u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442\u044B", VT.accent, VT.accentSoft, true],
        ["\u{1F5BC}  \u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E", VT.ink, VT.bgSoft, false],
        ["\u23F8  \u041F\u043E\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0430\xA0\u043F\u0430\u0443\u0437\u0443", VT.inkSoft, VT.bgSoft, false],
        ["\u2193  \u0421\u043A\u0430\u0447\u0430\u0442\u044C \u0430\u0440\u0445\u0438\u0432", VT.inkSoft, VT.bgSoft, false]
      ].map(([label, fg, bg, primary], i) => /* @__PURE__ */ jsx2("div", { style: {
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
      /* @__PURE__ */ jsx2("path", { d: area, fill: color, fillOpacity: "0.12" }),
      /* @__PURE__ */ jsx2("path", { d: path, fill: "none", stroke: color, strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" })
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
        /* @__PURE__ */ jsx2("br", {}),
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
        /* @__PURE__ */ jsx2("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.74 0.13 25)" } }),
        /* @__PURE__ */ jsx2("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.82 0.13 85)" } }),
        /* @__PURE__ */ jsx2("span", { style: { width: 9, height: 9, borderRadius: "50%", background: "oklch(0.78 0.13 145)" } }),
        /* @__PURE__ */ jsx2("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }, children: "\u041B\u0438\u0447\u043D\u044B\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \xB7 \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430" })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: {
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
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.inkFaint, fontWeight: 500 }, children: s.label }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", color: s.tone === "accent" ? VT.accent : VT.ink, lineHeight: 1 }, children: s.num }),
          /* @__PURE__ */ jsxs2("span", { style: { fontFamily: VT.font.mono, fontSize: 12, fontWeight: 600, color: VT.success }, children: [
            "\u2191 ",
            s.delta
          ] })
        ] }),
        /* @__PURE__ */ jsx2(Sparkline, { points: s.sparkline, color: s.color })
      ] }, s.label)) }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 18,
        display: "grid",
        gridTemplateColumns: mobile ? "1fr" : "1.6fr 1fr",
        gap: 16
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { background: VT.bgSoft, borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 700, color: VT.ink }, children: "\u0422\u0440\u0430\u0444\u0438\u043A \u0437\u0430\xA030 \u0434\u043D\u0435\u0439" }),
            /* @__PURE__ */ jsxs2("div", { style: { display: "inline-flex", gap: 12, fontSize: 11.5, color: VT.inkSoft, marginLeft: "auto" }, children: [
              /* @__PURE__ */ jsxs2("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 }, children: [
                /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }),
                "\u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u044F"
              ] }),
              /* @__PURE__ */ jsxs2("span", { style: { display: "inline-flex", alignItems: "center", gap: 5 }, children: [
                /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 2, background: "oklch(0.5 0.13 240)" } }),
                "\u0437\u0430\u044F\u0432\u043A\u0438"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${W} ${H}`, width: "100%", height: mobile ? 180 : H, preserveAspectRatio: "none", style: { display: "block" }, children: [
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
            leads.map((l, i) => /* @__PURE__ */ jsx2("rect", { x: xFor(i) - 2, y: yFor(l * 10), width: "4", height: PAD.top + inner.h - yFor(l * 10), fill: "oklch(0.5 0.13 240)", opacity: "0.5", rx: "1" }, i)),
            xLabels.map((i, k) => /* @__PURE__ */ jsx2("text", { x: xFor(i), y: H - 8, fontSize: "11", fill: VT.inkFaint, textAnchor: "middle", children: xLabelText[k] }, k))
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { background: VT.bgSoft, borderRadius: 14, padding: 16 }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 700, color: VT.ink, marginBottom: 4 }, children: "\u041E\u0442\u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442" }),
          /* @__PURE__ */ jsxs2("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginBottom: 14 }, children: [
            BRAND.name,
            " \u0434\u0435\u0440\u0436\u0438\u0442 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438 \u0441\u0432\u0435\u0436\u0438\u043C\u0438 \u2014 \u043F\u043E\u044D\u0442\u043E\u043C\u0443 \u042F.\u041A\u0430\u0440\u0442\u044B #1"
          ] }),
          /* @__PURE__ */ jsx2("div", { style: { display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 12 }, children: sources.map((s) => /* @__PURE__ */ jsx2("span", { style: { width: `${s.share}%`, background: s.color } }, s.name)) }),
          /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: sources.map((s) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: VT.ink }, children: [
            /* @__PURE__ */ jsx2("span", { style: { width: 10, height: 10, borderRadius: 3, background: s.color, flex: "0 0 auto" } }),
            /* @__PURE__ */ jsx2("span", { style: { flex: 1 }, children: s.name }),
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
      /* @__PURE__ */ jsx2("span", { style: {
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
        /* @__PURE__ */ jsx2("path", { d: "M22 2 L11 13" }),
        /* @__PURE__ */ jsx2("path", { d: "M22 2 L15 22 L11 13 L2 9 L22 2 Z" })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: mobile ? 13.5 : 14.5, color: VT.accentInk, lineHeight: 1.45, flex: 1 }, children: [
        /* @__PURE__ */ jsx2("b", { style: { color: VT.accentInk }, children: "\u041A\u0440\u0430\u0442\u043A\u043E \u0438 \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u043E" }),
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
  return /* @__PURE__ */ jsx2("section", { style: {
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
    /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
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
      /* @__PURE__ */ jsx2("h2", { style: {
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
      /* @__PURE__ */ jsx2("ul", { style: {
        listStyle: "none",
        margin: "24px 0 0",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 14
      }, children: bullets.map(([title, body]) => /* @__PURE__ */ jsxs2("li", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
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
        }, children: /* @__PURE__ */ jsx2("svg", { width: "13", height: "13", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: mobile ? 15.5 : 17, fontWeight: 700, color: VT.ink, letterSpacing: "-0.015em" }, children: title }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: mobile ? 14 : 14.5, color: VT.inkSoft, lineHeight: 1.5, marginTop: 2 }, children: body })
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
        /* @__PURE__ */ jsx2("span", { style: {
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
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2197" })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { position: "relative" }, children: /* @__PURE__ */ jsx2(ControlPanelMock, { mobile }) })
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
        /* @__PURE__ */ jsx2("br", {}),
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
        /* @__PURE__ */ jsx2("div", { style: {
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
            /* @__PURE__ */ jsx2("span", { style: {
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: VT.accent,
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            }, children: /* @__PURE__ */ jsx2("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12 l4 4 10 -10" }) }) }),
            "\u041F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E"
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap", marginTop: 6 }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: mobile ? 16 : 20, color: VT.inkSoft, fontWeight: 500 }, children: "\u043F\u043E\u0442\u043E\u043C" }),
            /* @__PURE__ */ jsx2("span", { style: {
              fontSize: mobile ? 56 : 76,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: VT.ink
            }, children: "990\xA0\u20BD" }),
            /* @__PURE__ */ jsx2("span", { style: { fontSize: mobile ? 16 : 18, color: VT.inkSoft }, children: "/ \u043C\u0435\u0441\u044F\u0446" })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("ul", { style: {
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
        ] }, b)) }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 24 : 32 }, children: /* @__PURE__ */ jsxs2(Btn, { style: { width: "100%", padding: mobile ? "14px 22px" : "16px 26px", fontSize: mobile ? 15 : 16 }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: [
          "\u0421\u0434\u0435\u043B\u0430\u0442\u044C ",
          BRAND.name
        ] }) }),
        /* @__PURE__ */ jsx2("div", { style: {
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
      /* @__PURE__ */ jsx2("style", { children: `
          details > summary::-webkit-details-marker { display: none; }
        ` }),
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
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13, color: VT.ink }, children: BRAND.bot }),
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
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13, color: VT.ink }, children: `<\u0432\u0430\u0448-\u0441\u0430\u0439\u0442>.${BRAND.domain}` }),
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
    /* @__PURE__ */ jsx2("div", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsxs2(SectionTitle, { mobile, children: [
      "\u0427\u0442\u043E \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
      /* @__PURE__ */ jsx2("br", {}),
      "\u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442"
    ] }) }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: mobile ? 28 : 48,
      maxWidth: mobile ? "100%" : 820,
      margin: `${mobile ? 28 : 48}px auto 0`,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }, children: faqs.map((f, i) => /* @__PURE__ */ jsx2(FaqItem, { q: f.q, a: f.a, mobile, defaultOpen: i === 0 }, f.q)) })
  ] });
}
function FreeMonthSection({ mobile }) {
  const bullets = [
    /* @__PURE__ */ jsxs2(Fragment2, { children: [
      "\u0421\u0430\u0439\u0442 \u043D\u0430\xA0\u0430\u0434\u0440\u0435\u0441\u0435 ",
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13, color: "#fff" }, children: `\u0432\u0430\u0448-\u0441\u0430\u0439\u0442.${BRAND.domain}` })
    ] }),
    "\u041A\u043D\u043E\u043F\u043A\u0430 \xAB\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F\xBB \u0438\xA0\u043F\u0440\u0438\u0451\u043C \u0437\u0430\u044F\u0432\u043E\u043A \u0432 Telegram",
    "\u0421\u0432\u0435\u0436\u0438\u0435 \u043E\u0442\u0437\u044B\u0432\u044B \u0438\xA0\u0444\u043E\u0442\u043E \u043A\u0430\u0436\u0434\u0443\u044E \u043D\u0435\u0434\u0435\u043B\u044E",
    "\u0410\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0430 \u043F\u043E\u0441\u0435\u0449\u0435\u043D\u0438\u0439 \u0438\xA0\u0437\u0430\u044F\u0432\u043E\u043A \u0432\xA0\u043B\u0438\u0447\u043D\u043E\u043C \u043A\u0430\u0431\u0438\u043D\u0435\u0442\u0435"
  ];
  return /* @__PURE__ */ jsx2("section", { style: {
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
    /* @__PURE__ */ jsxs2("div", { style: { position: "relative", maxWidth: 820, margin: "0 auto", textAlign: "center" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { display: "inline-flex", marginBottom: mobile ? 14 : 20 }, children: /* @__PURE__ */ jsx2(GlyphGift, { size: mobile ? 58 : 76 }) }),
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
      /* @__PURE__ */ jsx2("p", { style: {
        fontSize: mobile ? 16 : 19,
        lineHeight: 1.5,
        color: "oklch(0.85 0.014 60)",
        margin: "14px auto 0",
        maxWidth: 640,
        textWrap: "pretty"
      }, children: "\u0427\u0435\u0440\u0435\u0437\xA02\xA0\u0447\u0430\u0441\u0430 \u0443\xA0\u0432\u0430\u0441 \u0431\u0443\u0434\u0435\u0442 \u0440\u0430\u0431\u043E\u0442\u0430\u044E\u0449\u0438\u0439 \u0441\u0430\u0439\u0442 \u0441\xA0\u0443\u0441\u043B\u0443\u0433\u0430\u043C\u0438, \u0446\u0435\u043D\u0430\u043C\u0438 \u0438\xA0\u043E\u0442\u0437\u044B\u0432\u0430\u043C\u0438. \u0427\u0435\u0440\u0435\u0437 \u043D\u0435\u0434\u0435\u043B\u044E \u2014 \u043F\u0435\u0440\u0432\u044B\u0435 \u0437\u0430\u044F\u0432\u043A\u0438 \u0432 Telegram." }),
      /* @__PURE__ */ jsx2("div", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: {
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
        }, children: /* @__PURE__ */ jsx2("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        /* @__PURE__ */ jsx2("span", { style: { fontSize: mobile ? 14 : 15, color: "oklch(0.92 0.012 60)", lineHeight: 1.4 }, children: b })
      ] }, i)) }),
      /* @__PURE__ */ jsx2("div", { style: { marginTop: mobile ? 24 : 32, display: "inline-flex" }, children: /* @__PURE__ */ jsxs2(Btn, { iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), style: { padding: mobile ? "14px 24px" : "18px 32px", fontSize: mobile ? 16 : 18 }, children: [
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
        /* @__PURE__ */ jsx2("span", { children: "\u0415\u0441\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441\u044B?" }),
        /* @__PURE__ */ jsx2("a", { style: {
          color: VT.accentSoft,
          textDecoration: "underline",
          textUnderlineOffset: 3
        }, children: "\u041F\u043E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043E\u0442\u0432\u0435\u0442\u044B \u2193" }),
        /* @__PURE__ */ jsx2("span", { children: "\u0438\u043B\u0438" }),
        /* @__PURE__ */ jsx2("a", { style: {
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
    /* @__PURE__ */ jsx2("style", { children: `
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
      /* @__PURE__ */ jsx2("div", { style: {
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
        /* @__PURE__ */ jsx2(BrandMark, { size: mobile ? 22 : 26, fontSize: mobile ? 18 : 20 }),
        !mobile ? /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 24, fontSize: 14, color: VT.inkSoft }, children: [
          /* @__PURE__ */ jsx2("a", { href: "#how", style: { color: "inherit", textDecoration: "none" }, children: "\u041A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442" }),
          /* @__PURE__ */ jsx2("a", { href: "#examples", style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u0440\u0438\u043C\u0435\u0440\u044B" }),
          /* @__PURE__ */ jsx2("a", { href: "#pricing", style: { color: "inherit", textDecoration: "none" }, children: "\u0426\u0435\u043D\u044B" }),
          /* @__PURE__ */ jsx2("a", { href: "#faq", style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u043E\u043C\u043E\u0449\u044C" }),
          /* @__PURE__ */ jsx2("a", { style: {
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
            /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
          ] })
        ] }) : /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6 }, children: [
          /* @__PURE__ */ jsx2("a", { href: "https://samosite.online/login", style: {
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
            /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx2("div", { id: "hero" }),
      /* @__PURE__ */ jsx2(HeroBlock, { mobile }),
      /* @__PURE__ */ jsx2("div", { id: "examples" }),
      /* @__PURE__ */ jsx2(ExamplesSection, { mobile }),
      /* @__PURE__ */ jsx2("div", { id: "how" }),
      /* @__PURE__ */ jsx2(StorySection, { mobile }),
      /* @__PURE__ */ jsx2(PlatformsSection, { mobile }),
      /* @__PURE__ */ jsx2(BigFeaturesSection, { mobile }),
      /* @__PURE__ */ jsx2(OwnershipSection, { mobile }),
      /* @__PURE__ */ jsx2(AnalyticsSection, { mobile }),
      /* @__PURE__ */ jsx2("div", { id: "pricing" }),
      /* @__PURE__ */ jsx2(PricingSection, { mobile }),
      /* @__PURE__ */ jsx2(FaqSection, { mobile }),
      /* @__PURE__ */ jsx2(FreeMonthSection, { mobile }),
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
          /* @__PURE__ */ jsx2(BrandMark, { size: 20, fontSize: 15, color: VT.inkSoft }),
          /* @__PURE__ */ jsxs2("span", { children: [
            "\xA9 2026 \xB7 ",
            BRAND.domain,
            " \xB7 \u0432\u0441\u0435 \u0434\u0430\u043D\u043D\u044B\u0435 \u0445\u0440\u0430\u043D\u044F\u0442\u0441\u044F \u0432\xA0\u0420\u0424"
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 18, flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsx2("a", { style: { color: "inherit" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
          /* @__PURE__ */ jsx2("a", { style: { color: "inherit" }, children: "\u041E\u0444\u0435\u0440\u0442\u0430" }),
          /* @__PURE__ */ jsx2("a", { style: { color: "inherit" }, children: "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C" })
        ] })
      ] })
    ] })
  ] });
}
function SamosaytLanding_Desktop() {
  return /* @__PURE__ */ jsx2(SamosaytLanding, { mobile: false });
}
function SamosaytLanding_Mobile() {
  return /* @__PURE__ */ jsx2(SamosaytLanding, { mobile: true });
}
var Landing = SamosaytLanding;
var HeroSection = HeroBlock;
var ConceptA_Desktop = SamosaytLanding_Desktop;
var ConceptA_Mobile = SamosaytLanding_Mobile;
export {
  AnalyticsSection,
  BigFeaturesSection,
  ConceptA_Desktop,
  ConceptA_Mobile,
  ExamplesSection,
  FaqSection,
  FeatureCard,
  FeatureGlyph,
  FreeMonthSection,
  HeroBlock,
  HeroSection,
  Landing,
  OwnershipSection,
  PlatformCard,
  PlatformLogo,
  PlatformsSection,
  PricingSection,
  SamosaytLanding,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  SectionSub,
  SectionTitle,
  SiteCard,
  StorySection,
  StoryStepColorful
};
//# sourceMappingURL=index.js.map
