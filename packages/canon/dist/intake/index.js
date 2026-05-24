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

// src/intake/index.tsx
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function ModalShell({ children, width = 540 }) {
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
function StepHeader({ step, total, title, sub, showBack = true }) {
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }, children: [
      step > 1 && showBack && /* @__PURE__ */ jsxs2("button", { style: {
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
    /* @__PURE__ */ jsx2("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.2, textWrap: "balance" }, children: title }),
    sub && /* @__PURE__ */ jsx2("p", { style: { fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }, children: sub })
  ] });
}
function SvgLink() {
  return /* @__PURE__ */ jsxs2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", children: [
    /* @__PURE__ */ jsx2("path", { d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5" }),
    /* @__PURE__ */ jsx2("path", { d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19" })
  ] });
}
function SvgPaperclip() {
  return /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" }) });
}
function ModeSwitcher({ mode = "link", onModeChange }) {
  const tab = (id, label, icon) => {
    const active = mode === id;
    return /* @__PURE__ */ jsxs2(
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
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 15, display: "inline-flex" }, children: icon }),
          label
        ]
      },
      id
    );
  };
  return /* @__PURE__ */ jsxs2("div", { role: "tablist", "aria-label": "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0434\u043B\u044F \u0441\u0430\u0439\u0442\u0430", style: {
    display: "flex",
    gap: 4,
    padding: 4,
    background: VT.bgSoft,
    border: `1px solid ${VT.line}`,
    borderRadius: 999,
    marginTop: 18
  }, children: [
    tab("link", "\u0421\u0441\u044B\u043B\u043A\u0430", /* @__PURE__ */ jsx2(SvgLink, {})),
    tab("photo", "\u0424\u043E\u0442\u043E", /* @__PURE__ */ jsx2(SvgPaperclip, {}))
  ] });
}
var SOURCE_LIB = {
  yandex_maps: { label: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", icon: "\u{1F5FA}\uFE0F", tier: "ok" },
  telegram: { label: "Telegram-\u043A\u0430\u043D\u0430\u043B", icon: "\u2708\uFE0F", tier: "ok" },
  twogis: { label: "2\u0413\u0418\u0421", icon: "\u{1F4CD}", tier: "ok" },
  avito: { label: "Avito-\u043F\u0440\u043E\u0444\u0438\u043B\u044C", icon: "\u{1F170}\uFE0F", tier: "ok" },
  instagram: { label: "Instagram", icon: "\u{1F4F7}", tier: "ok" },
  website: { label: "\u0421\u0432\u043E\u0439 \u0441\u0430\u0439\u0442", icon: "\u{1F310}", tier: "ok" },
  vk: { label: "VK-\u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430", icon: "V", tier: "soon" },
  whatsapp: { label: "WhatsApp-\u043A\u0430\u0442\u0430\u043B\u043E\u0433", icon: "\u{1F7E2}", tier: "soon" },
  youtube: { label: "YouTube-\u043A\u0430\u043D\u0430\u043B", icon: "\u25B6\uFE0F", tier: "soon" },
  unknown: { label: "\u043D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438", icon: "?", tier: "unknown" }
};
function SourceBadge({ source, counts, onCorrect }) {
  const meta = SOURCE_LIB[source] || SOURCE_LIB.unknown;
  const tier = meta.tier;
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
      /* @__PURE__ */ jsx2("button", { onClick: onCorrect, style: {
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
        " \u2014 \u0441\u043A\u043E\u0440\u043E \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u043C. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email \u2014 \u043D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u0430\u043A \u0434\u043E\u0431\u0430\u0432\u0438\u043C."
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
    /* @__PURE__ */ jsx2("span", { children: "\u041D\u0435 \u0440\u0430\u0441\u043F\u043E\u0437\u043D\u0430\u043B\u0438 \u2014 \u043F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443. \u0418\u043B\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u0444\u043E\u0442\u043E \u2192" })
  ] });
}
function LinkInput({ value, placeholder = "https://...", onChange, loading = false }) {
  const empty = !value;
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: VT.white,
    border: `1.5px solid ${empty ? VT.line : VT.accent}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx2(IconLink, {}),
    /* @__PURE__ */ jsx2(
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
    loading && /* @__PURE__ */ jsx2("span", { style: { color: VT.success, display: "inline-flex" }, children: /* @__PURE__ */ jsx2(Spinner, { size: 14 }) })
  ] });
}
var PHOTO_LIMITS = { minFiles: 5, maxFiles: 60, maxFileBytes: 15 * 1024 * 1024, maxTotalBytes: 200 * 1024 * 1024 };
function PhotoDropZone({ compact = false, onPick }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    border: `1.5px dashed ${VT.accent}`,
    background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
    borderRadius: VT.r.lg,
    padding: compact ? 20 : 28,
    textAlign: "center"
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: { fontSize: compact ? 22 : 26, marginBottom: 6 }, children: "\u{1F4F7}" }),
    /* @__PURE__ */ jsx2("div", { style: { fontSize: compact ? 14 : 15, fontWeight: 600 }, children: "\u041F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0444\u0430\u0439\u043B\u044B \u0441\u044E\u0434\u0430" }),
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, color: VT.inkSoft, margin: "4px 0 12px" }, children: "\u0438\u043B\u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \u0447\u0442\u043E\u0431\u044B \u0432\u044B\u0431\u0440\u0430\u0442\u044C \xB7 JPEG / PNG / WebP / HEIC" }),
    /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0444\u0430\u0439\u043B\u044B" }),
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 10, fontFamily: VT.font.mono }, children: "5\u201360 \u0444\u0430\u0439\u043B\u043E\u0432 \xB7 \u0434\u043E 15 \u041C\u0411 \u043A\u0430\u0436\u0434\u044B\u0439 \xB7 \u0434\u043E 200 \u041C\u0411 \u0432\u0441\u0435\u0433\u043E" })
  ] });
}
function PhotoThumb({ name, sizeKb = 2400, idx = 0, onRemove }) {
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
      width: 44,
      height: 44,
      borderRadius: 8,
      background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
      flex: "0 0 auto"
    } }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
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
  return /* @__PURE__ */ jsxs2("div", { style: { marginTop: 14 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsxs2(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0417\u0410\u0413\u0420\u0423\u0416\u0415\u041D\u041E \xB7 ",
        files.length,
        " \u0418\u0417 ",
        PHOTO_LIMITS.maxFiles
      ] }),
      /* @__PURE__ */ jsxs2(Mono, { style: { fontSize: 11 }, children: [
        (totalKb / 1e3).toFixed(1),
        " \u041C\u0411 \xB7 \u2264 200 \u041C\u0411"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: files.map((f, i) => /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsxs2("label", { style: {
    display: "block",
    fontSize: 13,
    color: VT.inkSoft,
    fontWeight: 500,
    marginBottom: 6
  }, children: [
    children,
    required && /* @__PURE__ */ jsx2("span", { style: { color: VT.accent, marginLeft: 4 }, children: "*" })
  ] });
}
function FieldInput({ value, placeholder, onChange, mono = false, type = "text" }) {
  return /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsx2(
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
    return /* @__PURE__ */ jsxs2(
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
          /* @__PURE__ */ jsx2("span", { style: { fontSize: 14 }, children: icon }),
          label
        ]
      },
      id
    );
  };
  const ph = type === "phone" ? "+7 921 234-56-78" : "@your_handle";
  return /* @__PURE__ */ jsxs2(Fragment2, { children: [
    /* @__PURE__ */ jsxs2("div", { role: "tablist", style: {
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
    /* @__PURE__ */ jsx2(FieldInput, { value, placeholder: ph, mono: true, onChange: onValueChange })
  ] });
}
function TextFileThumb({ name, sizeKb = 240, onRemove }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: "8px 12px",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.md
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: {
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
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
      /* @__PURE__ */ jsxs2("div", { style: { fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }, children: [
        name.split(".").pop().toUpperCase(),
        " \xB7 ",
        (sizeKb / 1e3).toFixed(1),
        " MB"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("button", { "aria-label": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", onClick: onRemove, style: {
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    border: `1.5px dashed ${VT.line}`,
    background: VT.bgSoft,
    borderRadius: VT.r.md,
    padding: 14,
    display: "flex",
    alignItems: "center",
    gap: 12
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: {
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
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, minWidth: 0 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 13.5, fontWeight: 500 }, children: "\u041F\u0440\u0430\u0439\u0441, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u044F \u0443\u0441\u043B\u0443\u0433, FAQ" }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11.5, color: VT.inkFaint, fontFamily: VT.font.mono, marginTop: 1 }, children: "PDF / DOCX / TXT / RTF \xB7 \u0434\u043E 10 \u0444\u0430\u0439\u043B\u043E\u0432" })
    ] }),
    /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", onClick: onPick, children: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C" })
  ] });
}
function CaptchaNotice() {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    fontSize: 11.5,
    color: VT.inkMuted,
    marginTop: 14,
    fontFamily: VT.font.mono,
    letterSpacing: "0.02em"
  }, children: [
    /* @__PURE__ */ jsx2("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsx2("path", { d: "M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z" }) }),
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
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 540, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0432\u0430\u0448\u0443 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443 \u0438\u043B\u0438 \u043F\u0440\u043E\u0444\u0438\u043B\u044C, \u0438\u0437 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043C\u044B \u0441\u0434\u0435\u043B\u0430\u0435\u043C \u0441\u0430\u0439\u0442"
      }
    ),
    /* @__PURE__ */ jsx2(ModeSwitcher, { mode: "link", onModeChange }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx2(FieldLabel, { children: "\u0421\u0441\u044B\u043B\u043A\u0430" }),
      /* @__PURE__ */ jsx2(
        LinkInput,
        {
          value: url,
          placeholder: "https://t.me/studia_anna",
          onChange: onUrlChange,
          loading: !!url && !source
        }
      )
    ] }),
    source && /* @__PURE__ */ jsx2("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ jsx2(SourceBadge, { source, counts, onCorrect }) }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 16, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }, children: [
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: "\u041F\u041E\u0414\u0414\u0415\u0420\u0416\u0418\u0412\u0410\u0415\u041C:" }),
      " ",
      "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \xB7 Telegram-\u043A\u0430\u043D\u0430\u043B \xB7 Instagram \xB7 2\u0413\u0418\u0421 \xB7 Avito \xB7 \u0432\u0430\u0448 \u0441\u0442\u0430\u0440\u044B\u0439 \u0441\u0430\u0439\u0442"
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx2(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx2(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx2(CaptchaNotice, {})
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
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 1,
        total,
        showBack: false,
        title: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E \u0432\u0430\u0448\u0435\u0433\u043E \u0434\u0435\u043B\u0430",
        sub: "\u0420\u0430\u0431\u043E\u0442\u044B, \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u043F\u0440\u043E\u0444\u0438\u043B\u044F, \u0444\u043E\u0442\u043E \u0432\u0438\u0437\u0438\u0442\u043A\u0438, \u0431\u0443\u043A\u043B\u0435\u0442\u0430 \u0438\u043B\u0438 \u043C\u0435\u043D\u044E \u2014 \u0441\u043E\u0431\u0435\u0440\u0451\u043C \u0441\u0430\u0439\u0442 \u0438\u0437 \u0442\u043E\u0433\u043E, \u0447\u0442\u043E \u0443 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C"
      }
    ),
    /* @__PURE__ */ jsx2(ModeSwitcher, { mode: "photo", onModeChange }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx2(PhotoDropZone, { compact: !empty, onPick }) }),
    !empty && /* @__PURE__ */ jsx2(PhotoList, { files, onRemove }),
    !empty && files.length < PHOTO_LIMITS.minFiles && /* @__PURE__ */ jsxs2("div", { style: {
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
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx2(
      Btn,
      {
        style: { flex: 1, opacity: canContinue ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx2(IconArrow, {}),
        onClick: canContinue ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx2(CaptchaNotice, {})
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
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 560, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step: 2,
        total: 4,
        title: "\u0420\u0430\u0441\u0441\u043A\u0430\u0436\u0438\u0442\u0435 \u043E \u0432\u0430\u0448\u0435\u043C \u0434\u0435\u043B\u0435",
        sub: "\u0427\u0442\u043E \u043D\u0430\u043C \u043D\u0443\u0436\u043D\u043E \u0437\u043D\u0430\u0442\u044C \u043F\u0435\u0440\u0435\u0434 \u0442\u0435\u043C \u043A\u0430\u043A \u043D\u0430\u0447\u0430\u0442\u044C?"
      }
    ),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx2(FieldLabel, { required: true, children: "\u0427\u0442\u043E \u0432\u044B \u0434\u0435\u043B\u0430\u0435\u0442\u0435" }),
      /* @__PURE__ */ jsx2(
        FieldTextarea,
        {
          value: description,
          placeholder: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440, \u043F\u0435\u0434\u0438\u043A\u044E\u0440, \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u0435. 7 \u043B\u0435\u0442 \u043E\u043F\u044B\u0442\u0430, \u0440\u0430\u0431\u043E\u0442\u0430\u044E \u0432 \u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A\u0435, \u0432\u044B\u0435\u0437\u0434 \u043D\u0430 \u0434\u043E\u043C",
          onChange: onDescriptionChange,
          rows: 4
        }
      )
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 16, display: "grid", gridTemplateColumns: "1fr", gap: 16 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2(FieldLabel, { required: true, children: "\u0413\u043E\u0440\u043E\u0434" }),
        /* @__PURE__ */ jsx2(FieldInput, { value: city, placeholder: "\u041F\u0435\u0442\u0440\u043E\u0437\u0430\u0432\u043E\u0434\u0441\u043A", onChange: onCityChange })
      ] }),
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2(FieldLabel, { required: true, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u044B \u043D\u0430 \u0441\u0430\u0439\u0442\u0435" }),
        /* @__PURE__ */ jsx2(
          CustomerContactPicker,
          {
            type: customerContactType,
            value: customerContact,
            onTypeChange: onCustomerContactTypeChange,
            onValueChange: onCustomerContactChange
          }
        ),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 11.5, color: VT.inkFaint, marginTop: 6, lineHeight: 1.4 }, children: "\u041F\u043E\u043A\u0430\u0436\u0435\u043C \u043A\u043B\u0438\u0435\u043D\u0442\u0430\u043C \u043D\u0430 \u0441\u0430\u0439\u0442\u0435. \u041A\u0443\u0434\u0430 \u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432\u0430\u043C \u043B\u0438\u0447\u043D\u043E \u2014 \u0441\u043F\u0440\u043E\u0441\u0438\u043C \u043D\u0430 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0448\u0430\u0433\u0435." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx2(FieldLabel, { children: "\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0435 \u0444\u0430\u0439\u043B\u044B (\u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)" }),
      textFiles.length === 0 ? /* @__PURE__ */ jsx2(TextFilesDropZone, { onPick: onPickTextFile }) : /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
        textFiles.map((f, i) => /* @__PURE__ */ jsx2(
          TextFileThumb,
          {
            name: f.name,
            sizeKb: f.sizeKb,
            onRemove: () => onRemoveTextFile?.(i)
          },
          i
        )),
        /* @__PURE__ */ jsx2("button", { onClick: onPickTextFile, style: {
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
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 22 }, children: /* @__PURE__ */ jsx2(
      Btn,
      {
        style: { flex: 1, opacity: ok ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx2(IconArrow, {}),
        onClick: ok ? onContinue : void 0,
        children: "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C"
      }
    ) }),
    /* @__PURE__ */ jsx2(CaptchaNotice, {})
  ] });
}
function ChannelOption({ value, label, hint, icon, selected, onSelect }) {
  return /* @__PURE__ */ jsxs2(
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
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 540, children: [
    /* @__PURE__ */ jsx2(
      StepHeader,
      {
        step,
        total,
        title: "\u041A\u0443\u0434\u0430 \u0432\u0430\u043C \u043F\u0438\u0441\u0430\u0442\u044C?",
        sub: "\u041E\u0434\u0438\u043D \u043E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u2014 \u0442\u0443\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0433\u043E\u0442\u043E\u0432\u044B\u0439 \u0441\u0430\u0439\u0442 \u0438 \u0437\u0430\u044F\u0432\u043A\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u043E\u0432."
      }
    ),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 20 }, children: [
      /* @__PURE__ */ jsx2(FieldLabel, { children: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u043A\u0430\u043D\u0430\u043B" }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }, children: [
        /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2(
          ChannelOption,
          {
            value: "email",
            label: "Email",
            hint: "\u043D\u0430 \u044F\u0449\u0438\u043A",
            icon: "\u{1F4E7}",
            selected: channel === "email",
            onSelect: onChannelChange
          }
        ),
        /* @__PURE__ */ jsx2(
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
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 18 }, children: [
      /* @__PURE__ */ jsx2(FieldLabel, { children: channel === "phone" ? "\u041D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430" : channel === "email" ? "Email" : channel === "max" ? "\u041B\u043E\u0433\u0438\u043D \u0432 MAX" : "\u0412\u0430\u0448 Telegram (\u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043D\u043E\u043C\u0435\u0440)" }),
      /* @__PURE__ */ jsx2(FieldInput, { value: contact, placeholder: ph, mono: true, onChange: onContactChange })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsx2(
      Checkbox,
      {
        checked: consent,
        onChange: (v) => onConsentChange?.(v),
        label: /* @__PURE__ */ jsx2(Fragment2, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430 \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445 \u0438 \u043F\u0443\u0431\u043B\u0438\u043A\u0430\u0446\u0438\u044E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043E\u0432 \u043D\u0430 \u0441\u0430\u0439\u0442\u0435 \u0441\u043E\u0433\u043B\u0430\u0441\u043D\u043E" }),
        link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0435 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438"
      }
    ) }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: 20 }, children: /* @__PURE__ */ jsx2(
      Btn,
      {
        style: { flex: 1, opacity: contact && consent ? 1 : 0.55 },
        iconRight: /* @__PURE__ */ jsx2(IconArrow, {}),
        onClick: contact && consent ? onSubmit : void 0,
        children: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0437\u0430\u044F\u0432\u043A\u0443"
      }
    ) }),
    /* @__PURE__ */ jsx2(CaptchaNotice, {})
  ] });
}
function SummaryRow({ label, value }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    padding: "10px 0",
    borderTop: `1px solid ${VT.line}`
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: {
      flex: "0 0 130px",
      fontFamily: VT.font.mono,
      fontSize: 11,
      letterSpacing: "0.08em",
      color: VT.inkFaint,
      paddingTop: 2
    }, children: label }),
    /* @__PURE__ */ jsx2("div", { style: { flex: 1, fontSize: 14, color: VT.ink, lineHeight: 1.45, wordBreak: "break-word" }, children: value })
  ] });
}
function S3_FinalConfirm({ mode = "link", total = 3, summary = {}, onClose }) {
  return /* @__PURE__ */ jsxs2(ModalShell, { width: 540, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }, children: [
      /* @__PURE__ */ jsxs2(Mono, { style: { fontSize: 11, letterSpacing: "0.1em" }, children: [
        "\u0428\u0410\u0413 ",
        total,
        "/",
        total
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 4 }, children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ jsx2("span", { style: { width: 28, height: 4, borderRadius: 2, background: VT.accent } }, i)) })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: VT.successSoft,
      color: VT.success,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center"
    }, children: /* @__PURE__ */ jsx2("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10" }) }) }),
    /* @__PURE__ */ jsx2("h2", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", margin: "16px 0 8px", lineHeight: 1.15 }, children: "\u0413\u043E\u0442\u043E\u0432\u0438\u043C \u0432\u0430\u0448 \u0441\u0430\u0439\u0442" }),
    /* @__PURE__ */ jsxs2("p", { style: { fontSize: 15, lineHeight: 1.5, color: VT.inkSoft, margin: 0 }, children: [
      "\u0421\u0432\u044F\u0436\u0435\u043C\u0441\u044F \u0441 \u0432\u0430\u043C\u0438 \u0438 \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u0441\u0441\u044B\u043B\u043A\u0443 \u0432 \u0442\u0435\u0447\u0435\u043D\u0438\u0435 ",
      /* @__PURE__ */ jsx2("b", { style: { color: VT.ink }, children: "2 \u0447\u0430\u0441\u043E\u0432" }),
      "."
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: 20 }, children: [
      mode === "link" && summary.url && /* @__PURE__ */ jsx2(SummaryRow, { label: "\u0421\u0421\u042B\u041B\u041A\u0410", value: /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.url }) }),
      mode === "photo" && /* @__PURE__ */ jsxs2(Fragment2, { children: [
        /* @__PURE__ */ jsx2(SummaryRow, { label: "\u0424\u0410\u0419\u041B\u042B", value: `${summary.fileCount || 0} \u0444\u043E\u0442\u043E` }),
        summary.description && /* @__PURE__ */ jsx2(SummaryRow, { label: "\u041E\u041F\u0418\u0421\u0410\u041D\u0418\u0415", value: summary.description }),
        summary.city && /* @__PURE__ */ jsx2(SummaryRow, { label: "\u0413\u041E\u0420\u041E\u0414", value: summary.city }),
        summary.customerContact && /* @__PURE__ */ jsx2(SummaryRow, { label: "\u041D\u0410 \u0421\u0410\u0419\u0422\u0415", value: /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: summary.customerContact }) }),
        summary.textFileCount > 0 && /* @__PURE__ */ jsx2(SummaryRow, { label: "\u0422\u0415\u041A\u0421\u0422\u042B", value: `${summary.textFileCount} \u0444\u0430\u0439\u043B\u043E\u0432` })
      ] }),
      /* @__PURE__ */ jsx2(
        SummaryRow,
        {
          label: "\u041D\u0410\u041F\u0418\u0428\u0415\u041C \u0412\u0410\u041C",
          value: /* @__PURE__ */ jsxs2("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
            summary.contact,
            /* @__PURE__ */ jsxs2("span", { style: { color: VT.inkFaint }, children: [
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
    /* @__PURE__ */ jsx2("div", { style: { marginTop: 24 }, children: /* @__PURE__ */ jsx2(Btn, { variant: "secondary", style: { width: "100%" }, onClick: onClose, children: "\u041F\u043E\u043D\u044F\u0442\u043D\u043E" }) })
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
    return /* @__PURE__ */ jsx2(
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
    return /* @__PURE__ */ jsx2(
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
    return /* @__PURE__ */ jsx2(
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
    return /* @__PURE__ */ jsx2(
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
    return /* @__PURE__ */ jsx2(S3_FinalConfirm, { mode, total, summary: s, onClose });
  }
  return /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsx2(S3_Step1_Photo, { ...props, total: 4 });
}
var Confirmation = S3_FinalConfirm;
export {
  Confirmation,
  PHOTO_LIMITS,
  PhotoDrawer,
  S3_FinalConfirm,
  S3_Step1_Link,
  S3_Step1_Photo,
  S3_Step2_PhotoDesc,
  S3_StepContact,
  SOURCE_LIB,
  SubmitModal
};
//# sourceMappingURL=index.js.map