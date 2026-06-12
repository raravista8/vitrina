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
    /* @__PURE__ */ jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", background: VT.accent } }),
    children
  ] });
}
function Mono({ children, style }) {
  return /* @__PURE__ */ jsx("span", { style: { fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, ...style }, children });
}
function Card({ children, style }) {
  return /* @__PURE__ */ jsx("div", { style: { background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.lg, ...style }, children });
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
    /* @__PURE__ */ jsx("span", { style: { flex: 1, fontFamily: value && /^[a-z0-9_./:@\-]+$/i.test(String(value)) ? VT.font.mono : VT.font.sans }, children: value || placeholder })
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

// src/source/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function MiniHero({ url }) {
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    background: VT.white,
    border: `1px solid ${VT.line}`,
    borderRadius: VT.r.pill,
    padding: 8,
    boxShadow: VT.shadow.card
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1, display: "flex", alignItems: "center", gap: 10, padding: "0 16px" }, children: [
      /* @__PURE__ */ jsx2(IconLink, {}),
      /* @__PURE__ */ jsx2("span", { style: {
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: VT.ink,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }, children: url })
    ] }),
    /* @__PURE__ */ jsx2(Btn, { iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
  ] });
}
function StateBadge({ kind, icon, children }) {
  return /* @__PURE__ */ jsxs2("span", { style: {
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
    /* @__PURE__ */ jsx2("span", { style: { width: 18, height: 18, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: icon }),
    children
  ] });
}
var STATES = [
  {
    id: "loading",
    label: "1 \xB7 Loading",
    kind: "neutral",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "neutral", icon: /* @__PURE__ */ jsx2(Spinner, {}), children: "\u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" }),
    note: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0438\u043B \u0442\u0438\u043F (<100ms). \u0417\u0430\u043F\u0440\u043E\u0441 preview API \u0432 \u0444\u043E\u043D\u0435, 3s timeout.",
    api: "GET /api/preview?url=\u2026 (debounced 300ms)"
  },
  {
    id: "tg-success",
    label: "2 \xB7 \u2713 Telegram",
    kind: "success",
    url: "t.me/barbershop_samara",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B \u2014 \u043D\u0430\u0448\u043B\u0438 47 \u043F\u043E\u0441\u0442\u043E\u0432 \u0438 12 \u0444\u043E\u0442\u043E" }),
    note: "Bot API getChat + getChatHistory(1). CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB \u0430\u043A\u0442\u0438\u0432\u043D\u0430 \u2014 open Submit modal.",
    api: 'GET /api/preview \u2192 {source:"telegram", posts:47, photos:12}'
  },
  {
    id: "ymaps-success",
    label: "3 \xB7 \u2713 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B",
    kind: "success",
    url: "yandex.ru/maps/-/CDvI7QJM",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u2014 \u043D\u0430\u0448\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443, 24 \u043E\u0442\u0437\u044B\u0432\u0430 \u0438 18 \u0444\u043E\u0442\u043E" }),
    note: "Geosearch API find. \u0415\u0441\u043B\u0438 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430 \u2192 fallback \u043A \u0441\u0442\u0430\u0442\u0438\u0447\u043D\u043E\u043C\u0443 \u2713 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B.",
    api: 'GET /api/preview \u2192 {source:"yandex_maps", reviews:24, photos:18}'
  },
  {
    id: "preview-timeout",
    label: "4 \xB7 \u2713 \u0411\u0435\u0437 \u0447\u0438\u0441\u0435\u043B (preview timeout >3s)",
    kind: "success",
    url: "t.me/privatechannel",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Telegram-\u043A\u0430\u043D\u0430\u043B" }),
    note: "FR-005a: regex \u043E\u0442\u0434\u0430\u043B \u0442\u0438\u043F, preview API \u043D\u0435 \u043E\u0442\u0432\u0435\u0442\u0438\u043B \u0437\u0430 3s \u2192 \u0431\u0435\u0439\u0434\u0436 \u0431\u0435\u0437 \u0447\u0438\u0441\u0435\u043B, \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0435\u043C \u043D\u043E\u0440\u043C\u0430\u043B\u044C\u043D\u043E.",
    api: "Timeout fallback \u2014 UI \u043D\u0435 \u0431\u043B\u043E\u043A\u0438\u0440\u0443\u0435\u0442 submit"
  },
  {
    id: "ig-success",
    label: "5 \xB7 \u2713 Instagram",
    kind: "success",
    url: "instagram.com/master.nails.spb",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "success", icon: /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }), children: "Instagram" }),
    note: "0.3.0: Instagram \u0442\u0435\u043F\u0435\u0440\u044C \u043E\u0431\u044B\u0447\u043D\u044B\u0439 ok-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u0417\u0430\u044F\u0432\u043A\u0430 \u0438\u0434\u0451\u0442 \u0432 \u043E\u0431\u0449\u0443\u044E \u043E\u0447\u0435\u0440\u0435\u0434\u044C, \u0440\u0443\u0447\u043D\u0430\u044F \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0430 \u0440\u0435\u0448\u0438\u0442 \u0447\u0442\u043E \u0432\u044B\u0442\u0430\u0441\u043A\u0438\u0432\u0430\u0442\u044C.",
    api: 'GET /api/preview \u2192 {source:"instagram", status:"ok"}'
  },
  {
    id: "vk-waitlist",
    label: "6 \xB7 \u2139\uFE0F \u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u2014 waitlist + photo CTA",
    kind: "info",
    url: "vk.com/master_nails",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx2("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435 \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
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
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "info", icon: /* @__PURE__ */ jsx2("span", { style: { fontSize: 14 }, children: "\u2139\uFE0F" }), children: "2GIS \u0441\u043A\u043E\u0440\u043E \u0431\u0443\u0434\u0435\u0442 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 email" }),
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
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx2("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u041D\u0435 \u0443\u0437\u043D\u0430\u043B\u0438 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A. \u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E?" }),
    unknownInput: true,
    note: "Open input. \u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u043C \u043A\u0430\u043A source_request c source_name=user-typed \u0434\u043B\u044F \u0430\u043D\u0430\u043B\u0438\u0442\u0438\u043A\u0438.",
    api: 'POST /api/feedback { type:"source_request", source_name:<user>, source_url_raw:<url> }'
  },
  {
    id: "not-url",
    label: "9 \xB7 \u26A0\uFE0F \u041D\u0435 \u0441\u0441\u044B\u043B\u043A\u0430 \u0438 \u043D\u0435 \u0444\u0430\u0439\u043B",
    kind: "warn",
    url: "\u043C\u0430\u0441\u0442\u0435\u0440 \u043C\u0430\u043D\u0438\u043A\u044E\u0440\u0430",
    badge: /* @__PURE__ */ jsx2(StateBadge, { kind: "warn", icon: /* @__PURE__ */ jsx2("span", { style: { fontSize: 14 }, children: "\u26A0\uFE0F" }), children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B \u0438\u043B\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043E\u0442\u043E" }),
    note: "CTA \xAB\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443\xBB disabled, fallback-\u0441\u0441\u044B\u043B\u043A\u0430 \xAB\u{1F4F7} \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0444\u043E\u0442\u043E\xBB \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u0430.",
    api: "\u2014 (client-side only)"
  }
];
function WaitlistCapture({ source, withPhotoCta }) {
  const label = source === "instagram" ? "Instagram" : source === "vk" ? "\u0412\u041A\u043E\u043D\u0442\u0430\u043A\u0442\u0435" : source === "2gis" ? "2GIS" : source;
  return /* @__PURE__ */ jsxs2("div", { style: {
    marginTop: 12,
    background: VT.infoSoft,
    border: `1px solid oklch(0.85 0.05 240)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.32 0.10 240)" }, children: [
      "\u041D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u043E\u0433\u0434\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u043C ",
      label
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx2(Input, { placeholder: "email \u0438\u043B\u0438 @telegram", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx2(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" })
    ] }),
    withPhotoCta && /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 12,
      paddingTop: 12,
      borderTop: `1px dashed oklch(0.85 0.05 240)`,
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0418\u043B\u0438 \u0441\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u0441\u0435\u0439\u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u044F:",
      /* @__PURE__ */ jsxs2("a", { style: {
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
        /* @__PURE__ */ jsx2(IconArrow, { size: 14 })
      ] })
    ] })
  ] });
}
function UnknownSourceInput() {
  return /* @__PURE__ */ jsxs2("div", { style: {
    marginTop: 12,
    background: VT.warnSoft,
    border: `1px solid oklch(0.85 0.06 70)`,
    borderRadius: VT.r.lg,
    padding: 16
  }, children: [
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, fontWeight: 600, color: "oklch(0.36 0.13 70)" }, children: "\u041A\u0430\u043A\u043E\u0439 \u044D\u0442\u043E \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A?" }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "row", gap: 8, marginTop: 10 }, children: [
      /* @__PURE__ */ jsx2(Input, { placeholder: "\u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 (\u043D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \xAB\u0414\u0437\u0435\u043D\xBB \u0438\u043B\u0438 \xAB\u0441\u0432\u043E\u0439 \u0431\u043B\u043E\u0433\xBB)", style: { flex: 1, padding: "10px 14px", borderRadius: VT.r.md, fontSize: 14 } }),
      /* @__PURE__ */ jsx2(Btn, { variant: "primary", size: "sm", style: { borderRadius: VT.r.md }, children: "\u0421\u043E\u043E\u0431\u0449\u0438\u0442\u044C" })
    ] })
  ] });
}
function StateRow({ s }) {
  return /* @__PURE__ */ jsx2(Card, { style: { padding: 24 }, children: /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 32 }, children: [
    /* @__PURE__ */ jsxs2("div", { children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsx2(MiniHero, { url: s.url }),
      /* @__PURE__ */ jsx2("div", { style: { marginTop: 12, paddingLeft: 16 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx2(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx2(UnknownSourceInput, {})
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { borderLeft: `1px dashed ${VT.line}`, paddingLeft: 24 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 8 }, children: "\u041B\u041E\u0413\u0418\u041A\u0410" }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 14, lineHeight: 1.5, color: VT.ink }, children: s.note }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 11, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, margin: "16px 0 6px" }, children: "API" }),
      /* @__PURE__ */ jsx2("div", { style: {
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "40px 56px 64px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }, children: [
      /* @__PURE__ */ jsx2(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 SOURCE DETECTION" }),
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: "FR-005, FR-005a, ADR-0009" })
    ] }),
    /* @__PURE__ */ jsx2("h2", { style: { fontSize: 40, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 8px", lineHeight: 1.1 }, children: "\u0411\u0435\u0439\u0434\u0436\u0438 \u043F\u043E\u0434 input \u2014 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F live preview" }),
    /* @__PURE__ */ jsx2("p", { style: { fontSize: 16, lineHeight: 1.5, color: VT.inkSoft, maxWidth: 820, margin: "0 0 32px" }, children: "\u041F\u043E\u0441\u043B\u0435 paste \u2014 client-side regex \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A \u0437\u0430 <100ms \u0438 \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 \u0431\u0435\u0439\u0434\u0436. \u041F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u043E preview API (3s timeout) \u0434\u043E\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0447\u0438\u0441\u043B\u0430\u043C\u0438. MVP-\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0438: Telegram, \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B. \u041E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0435 \u2014 waitlist + \u043F\u0430\u0440\u0430\u043B\u043B\u0435\u043B\u044C\u043D\u0430\u044F CTA \u043D\u0430 \u0444\u043E\u0442\u043E-\u0444\u043B\u043E\u0443." }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 18 }, children: STATES.map((s) => /* @__PURE__ */ jsx2(StateRow, { s }, s.id)) })
  ] });
}
function S2_Mobile() {
  const mobile = STATES.filter((s) => ["loading", "tg-success", "ig-success", "unknown-url"].includes(s.id));
  return /* @__PURE__ */ jsxs2("div", { style: {
    width: "100%",
    minHeight: "100%",
    background: VT.bg,
    color: VT.ink,
    fontFamily: VT.font.sans,
    padding: "20px 16px 40px",
    letterSpacing: "-0.01em"
  }, children: [
    /* @__PURE__ */ jsx2(Eyebrow, { children: "\u042D\u041A\u0420\u0410\u041D #2 \xB7 MOBILE" }),
    /* @__PURE__ */ jsx2("h2", { style: { fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "12px 0 18px", lineHeight: 1.15 }, children: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0431\u0435\u0439\u0434\u0436\u0430 \u2014 4 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0445" }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: mobile.map((s) => /* @__PURE__ */ jsxs2(Card, { style: { padding: 14 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 10.5, fontFamily: VT.font.mono, letterSpacing: "0.08em", color: VT.inkFaint, marginBottom: 6 }, children: s.label.toUpperCase() }),
      /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.lg,
        padding: 10
      }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "8px 8px" }, children: [
          /* @__PURE__ */ jsx2(IconLink, {}),
          /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: s.url })
        ] }),
        /* @__PURE__ */ jsx2(Btn, { iconRight: /* @__PURE__ */ jsx2(IconArrow, {}), style: { borderRadius: VT.r.md, width: "100%" }, children: "\u0421\u043E\u0431\u0440\u0430\u0442\u044C \u043C\u043E\u044E \u0432\u0438\u0442\u0440\u0438\u043D\u0443" })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { marginTop: 10 }, children: s.badge }),
      s.waitlist && /* @__PURE__ */ jsx2(WaitlistCapture, { source: s.id.split("-")[0], withPhotoCta: s.photoCta }),
      s.unknownInput && /* @__PURE__ */ jsx2(UnknownSourceInput, {})
    ] }, s.id)) })
  ] });
}
var SourceDetectionBadge = S2_Desktop;
export {
  S2_Desktop,
  S2_Mobile,
  SourceDetectionBadge
};
//# sourceMappingURL=index.js.map