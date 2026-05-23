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

// src/intake/index.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ModalShell({ children, width = 520 }) {
  return /* @__PURE__ */ jsx2("div", { style: {
    background: "rgba(0,0,0,0.32)",
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs2("div", { style: {
    width,
    maxWidth: "100%",
    background: VT.bg,
    borderRadius: VT.r.xl,
    boxShadow: VT.shadow.pop,
    padding: 28,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx2("button", { "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && onBack && /* @__PURE__ */ jsxs2("button", { style: {
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
        /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M15 6l-6 6 6 6" }) }),
        "\u041D\u0430\u0437\u0430\u0434"
      ] }),
      /* @__PURE__ */ jsxs2(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        step,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx2("span", { style: {
        width: 28,
        height: 4,
        borderRadius: 2,
        background: i < step ? VT.accent : VT.line
      } }, i)) })
    ] }),
    /* @__PURE__ */ jsx2("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2 }, children: title }),
    sub && /* @__PURE__ */ jsx2("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
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
    return /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        padding: "12px 14px",
        background: VT.successSoft,
        borderRadius: VT.r.md,
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: 13.5,
        color: "oklch(0.32 0.12 145)"
      }, children: [
        /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10" }) }),
        /* @__PURE__ */ jsxs2("span", { children: [
          "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
          /* @__PURE__ */ jsx2("b", { children: "Instagram" }),
          /* @__PURE__ */ jsx2("span", { style: { color: "oklch(0.42 0.11 145)" }, children: " \xB7 \u043D\u0443\u0436\u0435\u043D \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: { fontSize: 18 }, children: "\u{1F4F7}" }),
        /* @__PURE__ */ jsx2("span", { style: { flex: 1 }, children: "\u0418\u0437 Instagram \u043C\u044B \u0437\u0430\u0431\u0435\u0440\u0451\u043C \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u043E, \u0447\u0442\u043E \u0432\u044B \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0441\u0430\u043C\u0438 \u2014 \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0448\u0430\u043F\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0438 5\u201310 \u0444\u043E\u0442\u043E \u0440\u0430\u0431\u043E\u0442" }),
        /* @__PURE__ */ jsx2(Btn, { size: "sm", variant: "secondary", children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u2192" })
      ] })
    ] });
  }
  if (tier === "ok") {
    return /* @__PURE__ */ jsxs2("div", { style: {
      padding: "12px 14px",
      background: VT.successSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.32 0.12 145)"
    }, children: [
      /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10" }) }),
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u0420\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438: ",
        /* @__PURE__ */ jsx2("b", { children: meta.label }),
        counts ? /* @__PURE__ */ jsxs2("span", { style: { color: "oklch(0.42 0.11 145)" }, children: [
          " \xB7 ",
          counts
        ] }) : null
      ] }),
      /* @__PURE__ */ jsx2("button", { style: {
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
    return /* @__PURE__ */ jsxs2("div", { style: {
      padding: "12px 14px",
      background: VT.infoSoft,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: 13.5,
      color: "oklch(0.36 0.10 240)"
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 16 }, children: meta.icon }),
      /* @__PURE__ */ jsxs2("span", { children: [
        /* @__PURE__ */ jsx2("b", { children: meta.label }),
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A\xA0\u0434\u043E\u0431\u0430\u0432\u0438\u043C."
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs2("div", { style: {
    padding: "12px 14px",
    background: VT.warnSoft,
    borderRadius: VT.r.md,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13.5,
    color: "oklch(0.42 0.13 70)"
  }, children: [
    /* @__PURE__ */ jsx2("span", { style: { fontSize: 16 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs2("span", { children: [
      "\u041D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438 \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443. \u0418\u043B\u0438 ",
      /* @__PURE__ */ jsx2("a", { style: { color: "oklch(0.42 0.13 70)", textDecoration: "underline" }, children: "\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438 \u2192" })
    ] })
  ] });
}
function LinkInput({ value }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: VT.white,
    border: `1.5px solid ${VT.accent}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx2(IconLink, {}),
    /* @__PURE__ */ jsx2("span", { style: { flex: 1, fontFamily: VT.font.mono, fontSize: 14, color: VT.ink }, children: value }),
    /* @__PURE__ */ jsx2("span", { style: { color: VT.success, display: "inline-flex" }, children: /* @__PURE__ */ jsx2(Spinner, { size: 14 }) })
  ] });
}
function S3_Step1_Link({ url = "https://t.me/studia_anna", source = "telegram", counts = "\u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E" }) {
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 520, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 1,
        total: 3,
        title: "\u0414\u0430\u0439\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0432\u0430\u0448\u0435 \u0434\u0435\u043B\u043E",
        sub: "\u0427\u0442\u043E \u0443\xA0\u0432\u0430\u0441 \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u043E\u043D\u043B\u0430\u0439\u043D \u2014 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B, Telegram-\u043A\u0430\u043D\u0430\u043B, 2\u0413\u0418\u0421 \u0438\u043B\u0438 \u0432\u0430\u0448 \u0441\u0430\u0439\u0442"
      }
    ),
    /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: "20px 0 6px" }, children: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A" }),
    /* @__PURE__ */ jsx2(LinkInput, { value: url }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx2(SourceBadge, { source, counts, url }) }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint }, children: [
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u041F\u041E\u0414\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0415\u041C:" }),
      " ",
      "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 Telegram-\u043A\u0430\u043D\u0430\u043B \xB7 Instagram \xB7 2\u0413\u0418\u0421 \xB7 Avito \xB7 \u0432\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442 \xB7 \u0444\u043E\u0442\u043E \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438 \u043C\u0435\u043D\u044E"
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx2(Btn, { style: { flex: 1 }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 14, fontSize: 13, color: VT.inkSoft }, children: [
      "\u041D\u0435\u0442 \u043D\u0438\u0447\u0435\u0433\u043E \u043E\u043D\u043B\u0430\u0439\u043D? ",
      /* @__PURE__ */ jsx2("a", { style: { color: VT.accent, textDecoration: "underline" }, children: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438, \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438\xA0\u0440\u0430\u0431\u043E\u0442 \u2192" })
    ] })
  ] });
}
function ChannelOption({ value, label, hint, icon, selected }) {
  return /* @__PURE__ */ jsxs2("label", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "12px 14px",
    background: selected ? VT.accentSoft : VT.white,
    border: `1.5px solid ${selected ? VT.accent : VT.line}`,
    borderRadius: VT.r.md,
    cursor: "pointer"
  }, children: [
    /* @__PURE__ */ jsx2("span", { style: {
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `1.5px solid ${selected ? VT.accent : VT.line}`,
      background: VT.white,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "0 0 auto"
    }, children: selected && /* @__PURE__ */ jsx2("span", { style: { width: 8, height: 8, borderRadius: "50%", background: VT.accent } }) }),
    /* @__PURE__ */ jsx2("span", { style: { fontSize: 16 }, children: icon }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 600, color: VT.ink }, children: label }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 1 }, children: hint })
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "14px 16px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx2("span", { style: {
      fontFamily: VT.font.mono,
      fontSize: 15,
      color: value ? VT.ink : VT.inkFaint,
      flex: 1
    }, children: value || ph }),
    value && /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: VT.success, strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10" }) })
  ] });
}
function S3_Step2_Contact({ channel = "telegram", value = "@studia_anna" }) {
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 520, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 2,
        total: 2,
        title: "\u041A\u0443\u0434\u0430 \u0432\u0430\u043C \u043F\u0438\u0441\u0430\u0442\u044C?",
        sub: "\u041E\u0434\u0438\u043D \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u2014 \u0442\u0443\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430\xA0\u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442 \u0438\xA0\u0437\u0430\u044F\u0432\u043A\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432."
      }
    ),
    /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: "18px 0 8px" }, children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
      /* @__PURE__ */ jsx2(
        ChannelOption,
        {
          value: "telegram",
          label: "Telegram",
          hint: "\u043D\u0430\u043F\u0438\u0448\u0435\u0442 \u043D\u0430\u0448 \u0431\u043E\u0442 \xB7 \u043C\u0433\u043D\u043E\u0432\u0435\u043D\u043D\u043E",
          icon: "\u2708\uFE0F",
          selected: channel === "telegram"
        }
      ),
      /* @__PURE__ */ jsx2(
        ChannelOption,
        {
          value: "phone",
          label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
          hint: "SMS-\u0443\u0432\u0435\u0434\u043E\u043C\u043B\u0435\u043D\u0438\u044F",
          icon: "\u{1F4F1}",
          selected: channel === "phone"
        }
      ),
      /* @__PURE__ */ jsx2(
        ChannelOption,
        {
          value: "email",
          label: "Email",
          hint: "\u043D\u0430 \u044F\u0449\u0438\u043A",
          icon: "\u{1F4E7}",
          selected: channel === "email"
        }
      ),
      /* @__PURE__ */ jsx2(
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
    /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: "18px 0 6px" }, children: channel === "phone" ? "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" : channel === "email" ? "Email" : channel === "max" ? "\u041B\u043E\u0433\u0438\u043D \u0432 MAX" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438\xA0\u043D\u043E\u043C\u0435\u0440)" }),
    /* @__PURE__ */ jsx2(ContactValueInput, { channel, value }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx2(Checkbox, { checked: true, label: /* @__PURE__ */ jsx2(Fragment2, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }) }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 20 }, children: /* @__PURE__ */ jsx2(Btn, { style: { flex: 1 }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C" }) }),
    /* @__PURE__ */ jsx2(CaptchaNotice, {})
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: VT.inkMuted,
    marginTop: 10,
    fontFamily: VT.font.mono,
    letterSpacing: "0.02em"
  }, children: [
    /* @__PURE__ */ jsx2("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx2("path", { d: "M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" }) }),
    "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha \xB7 \u043D\u0435\u0432\u0438\u0434\u0438\u043C\u043E"
  ] });
}
function S3_Step3_TgBot() {
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 3,
        total: 3,
        title: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0431\u043E\u0442\u0430 \u043D\u0430 1 \u043C\u0438\u043D\u0443\u0442\u0443",
        sub: /* @__PURE__ */ jsxs2(Fragment2, { children: [
          "\u0427\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u0432\u0430\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0441\u0430\u0439\u0442 \u0438\xA0\u0437\u0430\u044F\u0432\u043A\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432 \u2014 \u043D\u0430\u0439\u0434\u0438\u0442\u0435 \u0432 Telegram ",
          /* @__PURE__ */ jsx2("b", { children: BRAND.contactBot }),
          " \u0438\xA0\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0421\u0442\u0430\u0440\u0442\xBB."
        ] })
      }
    ),
    /* @__PURE__ */ jsx2("ol", { style: {
      margin: "20px 0 0",
      padding: 0,
      listStyle: "none",
      display: "flex",
      flexDirection: "column",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 Telegram \u0438\xA0\u043D\u0430\u0439\u0434\u0438\u0442\u0435 ",
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13, color: VT.ink }, children: BRAND.contactBot })
      ] }),
      /* @__PURE__ */ jsxs2(Fragment2, { children: [
        "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ",
        /* @__PURE__ */ jsx2("b", { children: "\xAB\u0421\u0442\u0430\u0440\u0442\xBB" }),
        " \u2014 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u0434\u0435\u043B\u0430\u0442\u044C \u043D\u0435\xA0\u043D\u0443\u0436\u043D\u043E"
      ] }),
      /* @__PURE__ */ jsx2(Fragment2, { children: "\u041C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u0441\u0430\u0439\u0442 \u0441\u044E\u0434\u0430 \u0436\u0435, \u0432\xA0\u043B\u0438\u0447\u043A\u0443" })
    ].map((line, i) => /* @__PURE__ */ jsxs2("li", { style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: "12px 14px",
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md
    }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, lineHeight: 1.5, color: VT.ink }, children: line })
    ] }, i)) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 14,
      padding: "12px 14px",
      background: VT.accentSoft,
      border: `1px solid ${VT.accentSoft}`,
      borderRadius: VT.r.md,
      display: "flex",
      alignItems: "center",
      gap: 12
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        width: 38,
        height: 38,
        borderRadius: 10,
        background: VT.white,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18
      }, children: "\u{1F916}" }),
      /* @__PURE__ */ jsxs2("div", { style: { flex: 1 }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 15, fontWeight: 500 }, children: BRAND.contactBot }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.accentInk }, children: "\u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0432 Telegram" })
      ] }),
      /* @__PURE__ */ jsx2(Btn, { size: "sm", children: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
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
      /* @__PURE__ */ jsx2("span", { style: { color: VT.accent, display: "inline-flex" }, children: /* @__PURE__ */ jsx2(Spinner, { size: 14 }) }),
      /* @__PURE__ */ jsx2("span", { children: "\u0416\u0434\u0451\u043C, \u043F\u043E\u043A\u0430 \u0432\u044B \u043D\u0430\u0436\u043C\u0451\u0442\u0435 \xAB\u0421\u0442\u0430\u0440\u0442\xBB\u2026" }),
      /* @__PURE__ */ jsx2(Mono, { style: { marginLeft: "auto", fontSize: 11 }, children: "5 \u0441\u0435\u043A" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 14,
      fontSize: 13,
      color: VT.inkSoft,
      lineHeight: 1.5
    }, children: [
      "\u041D\u0435\u0442 Telegram \u0438\u043B\u0438\xA0\u043D\u0435\xA0\u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442\u0441\u044F?",
      " ",
      /* @__PURE__ */ jsx2("a", { style: { color: VT.accent, textDecoration: "underline", textUnderlineOffset: 3 }, children: "\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430\xA0\u043F\u043E\u0447\u0442\u0443 \u2192" })
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
  if (step === 1) return /* @__PURE__ */ jsx2(S3_Step1_Link, { url: sourceUrl, source, counts });
  if (step === 2) return /* @__PURE__ */ jsx2(S3_Step2_Contact, { channel, value: contact });
  return /* @__PURE__ */ jsx2(S3_Step1_Link, { url: sourceUrl, source, counts });
}
function S5_Confirmation({ contactType = "telegram" }) {
  const isTg = contactType === "telegram";
  return /* @__PURE__ */ jsx2("div", { style: {
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
  }, children: /* @__PURE__ */ jsxs2("div", { style: { maxWidth: 560, width: "100%" }, children: [
    /* @__PURE__ */ jsx2(BrandMark, { size: 22, fontSize: 18 }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: 36,
      width: 64,
      height: 64,
      borderRadius: "50%",
      background: VT.successSoft,
      color: VT.success,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsx2("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
    /* @__PURE__ */ jsx2("h1", { style: { fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", margin: "20px 0 12px", lineHeight: 1.1, textWrap: "balance" }, children: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442" }),
    /* @__PURE__ */ jsx2("p", { style: { fontSize: 18, lineHeight: 1.5, color: VT.inkSoft, margin: 0, maxWidth: 480 }, children: "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441\xA0\u0432\u0430\u043C\u0438 \u0438\xA0\u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 2\xA0\u0447\u0430\u0441\u043E\u0432" }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 28 }, children: /* @__PURE__ */ jsx2(Btn, { variant: "secondary", iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430\xA0\u0433\u043B\u0430\u0432\u043D\u0443\u044E" }) })
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "10px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: {
      width: 48,
      height: 48,
      borderRadius: 8,
      background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
      flex: "0 0 auto"
    } }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: "JPEG \xB7 2.4 MB" })
    ] }),
    /* @__PURE__ */ jsxs2("select", { defaultValue: type, style: {
      fontFamily: VT.font.sans,
      fontSize: 12.5,
      padding: "6px 8px",
      borderRadius: 8,
      border: `1px solid ${VT.line}`,
      background: VT.bgSoft,
      color: VT.ink
    }, children: [
      /* @__PURE__ */ jsx2("option", { value: "work", children: "\u0440\u0430\u0431\u043E\u0442\u0430" }),
      /* @__PURE__ */ jsx2("option", { value: "profile_screenshot", children: "\u0448\u0430\u043F\u043A\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044F" }),
      /* @__PURE__ */ jsx2("option", { value: "business_card", children: "\u0432\u0438\u0437\u0438\u0442\u043A\u0430" }),
      /* @__PURE__ */ jsx2("option", { value: "booklet", children: "\u0431\u0443\u043A\u043B\u0435\u0442" })
    ] }),
    /* @__PURE__ */ jsx2("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", style: {
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
  return /* @__PURE__ */ jsxs2(Wrap, { width: 620, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 1,
        total: 2,
        title: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E",
        sub: "\u0420\u0430\u0431\u043E\u0442\u044B, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442 \u0448\u0430\u043F\u043A\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044F, \u0432\u0438\u0437\u0438\u0442\u043A\u0430 \u0438\u043B\u0438\xA0\u0431\u0443\u043A\u043B\u0435\u0442. \u041E\u0442 5 \u0434\u043E 30 \u0444\u0430\u0439\u043B\u043E\u0432, \u0434\u043E 10 \u041C\u0411 \u043A\u0430\u0436\u0434\u044B\u0439.",
        onBack: false
      }
    ),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 18,
      border: `1.5px dashed ${VT.accent}`,
      background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
      borderRadius: VT.r.lg,
      padding: 28,
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 26, marginBottom: 6 }, children: "\u{1F4F7}" }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 15, fontWeight: 600 }, children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, color: VT.inkSoft, margin: "4px 0 12px" }, children: "\u0438\u043B\u0438\xA0\u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \xB7 JPEG / PNG / WebP / HEIC" }),
      /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 3 \u0418\u0417 30" }),
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11 }, children: "6.8 \u041C\u0411 \xB7 \u2264 100 \u041C\u0411" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
        /* @__PURE__ */ jsx2(PhotoThumb, { name: "IMG_2847.jpg", type: "work", idx: 0 }),
        /* @__PURE__ */ jsx2(PhotoThumb, { name: "profile-screenshot.png", type: "profile_screenshot", idx: 1 }),
        /* @__PURE__ */ jsx2(PhotoThumb, { name: "vizitka-front.jpg", type: "business_card", idx: 2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
      /* @__PURE__ */ jsx2(FormField, { label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0434\u0435\u043B\u0430", placeholder: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
      /* @__PURE__ */ jsx2(FormField, { label: "\u0413\u043E\u0440\u043E\u0434", placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A" }),
      /* @__PURE__ */ jsx2(FormField, { label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F", placeholder: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", select: true, options: ICP }),
      /* @__PURE__ */ jsx2(FormField, { label: "Email", placeholder: "anya@example.com" }),
      /* @__PURE__ */ jsx2("div", { style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ jsx2(FormField, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", placeholder: "+7 921 234-56-78" }) })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx2(Checkbox, { checked: false, label: /* @__PURE__ */ jsx2(Fragment2, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }) }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 10, marginTop: 18 }, children: /* @__PURE__ */ jsx2(Btn, { style: { flex: 1 }, iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0441\u0430\u0439\u0442 \u0438\u0437\xA0\u0444\u043E\u0442\u043E" }) }),
    /* @__PURE__ */ jsx2(CaptchaNotice, {})
  ] });
}
function FormField({ label, placeholder, select, options = [] }) {
  return /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, fontWeight: 500, marginBottom: 4 }, children: label }),
    /* @__PURE__ */ jsxs2("div", { style: {
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
      /* @__PURE__ */ jsx2("span", { children: placeholder }),
      select && /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx2("path", { d: "M6 9l6 6 6-6", strokeLinecap: "round", strokeLinejoin: "round" }) })
    ] })
  ] });
}
function MobileSheet({ children }) {
  return /* @__PURE__ */ jsx2("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: "rgba(0,0,0,0.32)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    fontFamily: VT.font.sans
  }, children: /* @__PURE__ */ jsxs2("div", { style: {
    width: "100%",
    background: VT.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 28,
    position: "relative"
  }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: {
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
export {
  Confirmation,
  PhotoDrawer,
  S3_Step1_Link,
  S3_Step2_Contact,
  S3_Step3_TgBot,
  S3_SubmitModal,
  S5_Confirmation,
  S6_PhotoDrawer,
  SubmitModal
};
//# sourceMappingURL=index.js.map