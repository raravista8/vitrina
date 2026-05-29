"use client";

// src/customer/index.tsx
import React from "react";

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
function IconArrow({ size = 18 }) {
  return /* @__PURE__ */ jsx("span", { style: { fontSize: size, lineHeight: 1 }, children: "\u2192" });
}

// src/customer/index.tsx
import { Fragment as Fragment3, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    position: "relative",
    overflow: "hidden",
    background: src ? "#222" : `
        radial-gradient(110% 80% at 30% 20%, ${c1} 0%, transparent 55%),
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
        style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }
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
    fontSize: Math.round(size * 0.42),
    letterSpacing: "-0.02em"
  }, children: initial });
}
function CStar({ filled = true, size = 13 }) {
  return /* @__PURE__ */ jsx2("svg", { width: size, height: size, viewBox: "0 0 20 20", fill: filled ? "#f4a93b" : "none", stroke: filled ? "#f4a93b" : "#ccc", strokeWidth: "1.5", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" }) });
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
  return /* @__PURE__ */ jsxs2("header", { style: {
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
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.name })
    ] }),
    /* @__PURE__ */ jsx2("nav", { style: { display: "flex", alignItems: "center", gap: 22, marginLeft: 12, fontSize: 14, color: s.sub }, children: links.map(([label, href]) => /* @__PURE__ */ jsx2("a", { href, style: { color: "inherit", textDecoration: "none" }, children: label }, label)) }),
    /* @__PURE__ */ jsxs2("div", { style: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsxs2("a", { href: `tel:${STUDIO.phoneHref}`, style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: VT.font.mono,
        fontSize: 14,
        color: s.ink,
        textDecoration: "none",
        fontWeight: 500
      }, children: [
        /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
        STUDIO.phone
      ] }),
      /* @__PURE__ */ jsx2("a", { href: "#book", style: {
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
  return /* @__PURE__ */ jsxs2("section", { style: {
    padding: "48px 36px 40px",
    borderBottom: `1px solid ${s.line}`,
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 36,
    alignItems: "center"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { children: [
      /* @__PURE__ */ jsxs2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent }, children: [
        STUDIO.category.toUpperCase(),
        " \xB7 ",
        STUDIO.city.toUpperCase()
      ] }),
      /* @__PURE__ */ jsx2("h1", { style: {
        fontSize: 52,
        fontWeight: 700,
        letterSpacing: "-0.035em",
        lineHeight: 1.04,
        margin: "14px 0 16px",
        whiteSpace: "pre-line",
        textWrap: "balance"
      }, children: STUDIO.hero.title }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 17, lineHeight: 1.5, color: s.sub, maxWidth: 480, margin: 0, textWrap: "pretty" }, children: STUDIO.hero.sub }),
      /* @__PURE__ */ jsxs2("div", { style: {
        marginTop: 24,
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 999
      }, children: [
        /* @__PURE__ */ jsx2("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx2(CStar, { filled: true, size: 14 }, i)) }),
        /* @__PURE__ */ jsx2("span", { style: { fontWeight: 700, color: s.ink, fontSize: 14 }, children: STUDIO.trust.rating }),
        /* @__PURE__ */ jsxs2("span", { style: { color: s.sub, fontSize: 13 }, children: [
          "\xB7 ",
          STUDIO.trust.reviews,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 12, marginTop: 22, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsxs2("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx2(IconArrow, { size: 16 })
        ] }),
        /* @__PURE__ */ jsxs2("a", { href: `tel:${STUDIO.phoneHref}`, style: {
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
          /* @__PURE__ */ jsx2("svg", { width: "15", height: "15", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
          STUDIO.phone
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(CPhoto, { tone: s.photoTone, src: STUDIO_PHOTOS.hero, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` }, children: [
      /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)"
      } }),
      /* @__PURE__ */ jsxs2("div", { style: { position: "absolute", left: 20, bottom: 18, right: 20, color: "#fff" }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: "0.12em", opacity: 0.9 }, children: "\u0421\u0422\u0423\u0414\u0418\u042F \u0412 \u0426\u0415\u041D\u0422\u0420\u0415 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A\u0410" }),
        /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, fontSize: 15, marginTop: 4 }, children: STUDIO.address })
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
  return /* @__PURE__ */ jsxs2("section", { style: {
    padding: "20px 36px",
    background: s.bgAlt,
    borderBottom: `1px solid ${s.line}`,
    display: "flex",
    alignItems: "center",
    gap: 28,
    flexWrap: "wrap"
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
      display: "flex",
      alignItems: "baseline",
      gap: 8,
      fontFamily: VT.font.mono,
      fontSize: 12,
      letterSpacing: "0.1em",
      color: s.sub
    }, children: [
      "\u041D\u0410\u0421 \u0412\u042B\u0411\u0420\u0410\u041B\u0418",
      /* @__PURE__ */ jsx2("span", { style: { fontFamily: VT.font.sans, fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", color: s.ink }, children: STUDIO.trust.clients }),
      /* @__PURE__ */ jsxs2("span", { children: [
        "\u0427\u0415\u041B\u041E\u0412\u0415\u041A \u0417\u0410 ",
        STUDIO.trust.years.toUpperCase()
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", alignItems: "center", gap: 18, marginLeft: "auto", flexWrap: "wrap" }, children: badges.map((b) => /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", flexDirection: "column", gap: 1 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { fontSize: 13, fontWeight: 600, color: s.ink, display: "flex", alignItems: "center", gap: 6 }, children: [
          b.stars,
          " ",
          /* @__PURE__ */ jsx2("span", { style: { color: "#f4a93b" }, children: "\u2605" }),
          /* @__PURE__ */ jsxs2("span", { style: { color: s.sub, fontWeight: 400 }, children: [
            "\xB7 ",
            b.name
          ] })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: b.count })
      ] })
    ] }, b.name)) })
  ] });
}
function CustomerServices({ s }) {
  return /* @__PURE__ */ jsxs2("section", { id: "services", style: { padding: "52px 36px 40px", scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0423\u0421\u041B\u0423\u0413\u0418 \u0418 \u0426\u0415\u041D\u042B" }),
        /* @__PURE__ */ jsx2("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u044F \u0434\u0435\u043B\u0430\u044E" })
      ] }),
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u0446\u0435\u043D\u044B \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B \xB7 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u044B 12 \u043C\u0430\u044F 2026" })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 14
    }, children: STUDIO.services.map((sv, i) => /* @__PURE__ */ jsxs2("article", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 16,
      padding: 22,
      display: "flex",
      flexDirection: "column",
      gap: 12,
      gridColumn: i === 0 && STUDIO.services.length % 2 === 1 ? "1 / -1" : "auto"
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16 }, children: [
        /* @__PURE__ */ jsx2("h3", { style: { fontSize: 19, fontWeight: 700, letterSpacing: "-0.022em", margin: 0, color: s.ink, lineHeight: 1.2 }, children: sv.name }),
        /* @__PURE__ */ jsxs2("div", { style: { textAlign: "right", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 18, fontWeight: 700, color: s.ink, letterSpacing: "-0.01em" }, children: sv.price }),
          sv.priceHint && /* @__PURE__ */ jsx2("div", { style: { fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }, children: sv.priceHint })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 14, color: s.sub, lineHeight: 1.5, margin: 0, flex: 1 }, children: sv.desc }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 12, marginTop: "auto" }, children: [
        sv.dur && /* @__PURE__ */ jsxs2("span", { style: {
          fontFamily: VT.font.mono,
          fontSize: 12,
          color: s.sub,
          display: "inline-flex",
          alignItems: "center",
          gap: 5
        }, children: [
          /* @__PURE__ */ jsxs2("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "9" }),
            /* @__PURE__ */ jsx2("path", { d: "M12 7v5l3 2" })
          ] }),
          sv.dur
        ] }),
        /* @__PURE__ */ jsxs2("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx2(IconArrow, { size: 14 })
        ] })
      ] })
    ] }, sv.name)) })
  ] });
}
function ProcessIcon({ kind, color, soft }) {
  const sz = 26;
  const svg = {
    calendar: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("rect", { x: "3", y: "5", width: "18", height: "16", rx: "2" }),
      /* @__PURE__ */ jsx2("path", { d: "M8 3v4M16 3v4M3 10h18" })
    ] }),
    pin: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
      /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "10", r: "3" })
    ] }),
    coffee: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
      /* @__PURE__ */ jsx2("path", { d: "M4 8h13v5a5 5 0 0 1-5 5H9 a5 5 0 0 1-5-5z" }),
      /* @__PURE__ */ jsx2("path", { d: "M17 9 h2 a3 3 0 0 1 0 6 h-2" }),
      /* @__PURE__ */ jsx2("path", { d: "M7 4 c 0 1 1 1 1 2 s -1 1 -1 2" }),
      /* @__PURE__ */ jsx2("path", { d: "M11 4 c 0 1 1 1 1 2 s -1 1 -1 2" })
    ] }),
    sparkles: /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 24 24", width: sz, height: sz, fill: "currentColor", children: [
      /* @__PURE__ */ jsx2("path", { d: "M12 3 L13.4 8.2 L18.6 9 L13.4 9.8 L12 15 L10.6 9.8 L5.4 9 L10.6 8.2 Z" }),
      /* @__PURE__ */ jsx2("circle", { cx: "19", cy: "18", r: "1.6" }),
      /* @__PURE__ */ jsx2("circle", { cx: "6", cy: "19", r: "1.2" })
    ] })
  }[kind];
  return /* @__PURE__ */ jsx2("div", { style: {
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
  return /* @__PURE__ */ jsxs2("section", { style: { padding: "40px 36px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, borderBottom: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041A\u0410\u041A \u0411\u0423\u0414\u0415\u0422" }),
      /* @__PURE__ */ jsxs2("h2", { style: { fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: [
        "\u041E\u0442 \u0437\u0430\u043F\u0438\u0441\u0438 \u0434\u043E\xA0\u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430 \u2014",
        /* @__PURE__ */ jsx2("br", {}),
        "\u0447\u0435\u0442\u044B\u0440\u0435 \u0448\u0430\u0433\u0430"
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      position: "relative"
    }, children: STUDIO.process.map((p, i) => /* @__PURE__ */ jsxs2("div", { style: { position: "relative" }, children: [
      i < STUDIO.process.length - 1 && /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: {
        position: "absolute",
        top: 26,
        right: -16,
        width: 32,
        height: 2,
        background: `repeating-linear-gradient(to right, ${s.line} 0 4px, transparent 4px 8px)`
      } }),
      /* @__PURE__ */ jsx2(ProcessIcon, { kind: icons[i], color: s.accent, soft: s.accentSoft }),
      /* @__PURE__ */ jsxs2("div", { style: {
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
      /* @__PURE__ */ jsx2("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "4px 0 6px", color: s.ink }, children: p.title }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 13.5, color: s.sub, lineHeight: 1.5, margin: 0 }, children: p.body })
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
  return /* @__PURE__ */ jsxs2("section", { style: { padding: "52px 36px 40px" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 18, flexWrap: "wrap", gap: 12 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041F\u041E\u0420\u0422\u0424\u041E\u041B\u0418\u041E" }),
        /* @__PURE__ */ jsx2("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0420\u0430\u0431\u043E\u0442\u044B" })
      ] }),
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11.5, color: s.sub }, children: "\u043E\u0431\u043D\u043E\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0438\u0437\xA0\u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430 \u0435\u0436\u0435\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u043E" })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridAutoRows: "170px",
      gap: 10
    }, children: tiles.map((t, i) => /* @__PURE__ */ jsx2(CPhoto, { tone: t.tone, src: t.src, style: {
      gridColumn: t.span === "l" ? "span 2" : "span 1",
      gridRow: t.span === "l" ? "span 2" : "span 1",
      borderRadius: 12,
      border: `1px solid ${s.line}`
    } }, i)) })
  ] });
}
function CustomerReviews({ s }) {
  return /* @__PURE__ */ jsxs2("section", { id: "reviews", style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}`, scrollMarginTop: 80 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E\u0422\u0417\u042B\u0412\u042B" }),
        /* @__PURE__ */ jsx2("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 8px", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u0433\u043E\u0432\u043E\u0440\u044F\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u044B" }),
        /* @__PURE__ */ jsxs2("div", { style: { fontSize: 14, color: s.sub, display: "flex", alignItems: "center", gap: 8 }, children: [
          /* @__PURE__ */ jsx2("span", { style: { display: "inline-flex", gap: 1 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx2(CStar, { filled: true, size: 14 }, i)) }),
          /* @__PURE__ */ jsx2("span", { style: { fontWeight: 600, color: s.ink }, children: "4.9 \u0438\u0437 5" }),
          /* @__PURE__ */ jsxs2("span", { children: [
            "\xB7 ",
            STUDIO.trust.reviews,
            " \u043E\u0442\u0437\u044B\u0432\u043E\u0432 \u043D\u0430\xA0\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u0430\u0445"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: { color: s.accent }, children: "\u2605" }),
        /* @__PURE__ */ jsx2("span", { children: "\u041B\u0423\u0427\u0428\u0418\u0415 \u2014 \u0412\u042B\u0411\u0420\u0410\u041B \u0418\u0418 \xB7 \u041E\u0411\u041D\u041E\u0412\u041B\u042F\u0415\u0422\u0421\u042F \u0415\u0416\u0415\u041D\u0415\u0414\u0415\u041B\u042C\u041D\u041E" })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }, children: STUDIO.reviews.map((r, i) => /* @__PURE__ */ jsxs2("div", { style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 14,
      padding: 20,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: 12
    }, children: [
      r.curated && /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
        /* @__PURE__ */ jsx2(ReviewAvatar, { name: r.author, tone: r.tone, size: 36 }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, fontSize: 14, color: s.ink, lineHeight: 1.1 }, children: r.author }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: s.sub, fontFamily: VT.font.mono, marginTop: 2 }, children: r.date })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 2 }, children: Array.from({ length: 5 }).map((_, j) => /* @__PURE__ */ jsx2(CStar, { filled: j < r.stars, size: 13 }, j)) }),
      /* @__PURE__ */ jsxs2("p", { style: { fontSize: 14, lineHeight: 1.55, color: s.ink, margin: 0, textWrap: "pretty" }, children: [
        "\xAB",
        r.text,
        "\xBB"
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 28,
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10
    }, children: [
      /* @__PURE__ */ jsxs2("a", { href: "#book", style: {
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
        /* @__PURE__ */ jsx2(IconArrow, { size: 16 })
      ] }),
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12, color: s.sub }, children: "\u0431\u043B\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u043E\u043A\u043D\u043E \u2014 \u0447\u0435\u0442\u0432\u0435\u0440\u0433 14:00" })
    ] })
  ] });
}
function CustomerAbout({ s }) {
  return /* @__PURE__ */ jsxs2("section", { id: "about", style: {
    padding: "52px 36px",
    display: "grid",
    gridTemplateColumns: "0.8fr 1.2fr",
    gap: 36,
    alignItems: "flex-start",
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsx2("div", { children: /* @__PURE__ */ jsx2(CPhoto, { tone: "rose", src: STUDIO_PHOTOS.master, style: { aspectRatio: "4 / 5", borderRadius: 16, border: `1px solid ${s.line}` } }) }),
    /* @__PURE__ */ jsxs2("div", { children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u041E \u041C\u0410\u0421\u0422\u0415\u0420\u0415" }),
      /* @__PURE__ */ jsx2("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 4px", lineHeight: 1.1 }, children: STUDIO.about.masterName }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 15, color: s.sub, marginBottom: 16 }, children: STUDIO.about.role }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 15.5, lineHeight: 1.6, color: s.ink, margin: "0 0 22px", maxWidth: 560, textWrap: "pretty" }, children: STUDIO.about.bio }),
      /* @__PURE__ */ jsx2("div", { style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10,
        marginBottom: 24
      }, children: STUDIO.about.creds.map(([title, body]) => /* @__PURE__ */ jsxs2("div", { style: {
        background: s.bgAlt,
        border: `1px solid ${s.line}`,
        borderRadius: 12,
        padding: "12px 14px"
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 13.5, fontWeight: 600, color: s.ink, letterSpacing: "-0.01em" }, children: title }),
        /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: s.sub, marginTop: 2 }, children: body })
      ] }, title)) }),
      /* @__PURE__ */ jsx2("h3", { style: { fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 10px" }, children: "\u0427\u0442\u043E \u0432\u0445\u043E\u0434\u0438\u0442" }),
      /* @__PURE__ */ jsx2("ul", { style: { listStyle: "none", padding: 0, margin: 0, fontSize: 14.5, color: s.ink, display: "flex", flexDirection: "column", gap: 8 }, children: STUDIO.guarantees.map((item) => /* @__PURE__ */ jsxs2("li", { style: { display: "flex", gap: 10, alignItems: "flex-start", lineHeight: 1.5 }, children: [
        /* @__PURE__ */ jsx2("span", { style: {
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
        }, children: /* @__PURE__ */ jsx2("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M5 12 l4 4 10 -10" }) }) }),
        item
      ] }, item)) })
    ] })
  ] });
}
function CustomerFaq({ s }) {
  return /* @__PURE__ */ jsxs2("section", { style: { padding: "52px 36px 40px", background: s.bgAlt, borderTop: `1px solid ${s.line}` }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0427\u0410\u0421\u0422\u042B\u0415 \u0412\u041E\u041F\u0420\u041E\u0421\u042B" }),
      /* @__PURE__ */ jsx2("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 0", lineHeight: 1.1 }, children: "\u0427\u0442\u043E \u043E\u0431\u044B\u0447\u043D\u043E \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u044E\u0442" })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      maxWidth: 760,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: 8
    }, children: STUDIO.faq.map(([q, a], i) => /* @__PURE__ */ jsxs2("details", { open: i === 0, style: {
      background: s.white,
      border: `1px solid ${s.line}`,
      borderRadius: 12,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsxs2("summary", { style: {
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
        /* @__PURE__ */ jsx2("span", { style: { flex: 1 }, children: q }),
        /* @__PURE__ */ jsx2("span", { style: {
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
      /* @__PURE__ */ jsx2("div", { style: {
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
  return /* @__PURE__ */ jsxs2("div", { children: [
    label && /* @__PURE__ */ jsx2("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsx2("div", { style: {
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 14,
    border: `1px solid ${s.line}`,
    background: s.bgAlt,
    aspectRatio: "1 / 1",
    minHeight: 280
  }, children: [
    /* @__PURE__ */ jsxs2("svg", { viewBox: "0 0 400 400", width: "100%", height: "100%", style: { display: "block", opacity: 0.6 }, children: [
      /* @__PURE__ */ jsx2("defs", { children: /* @__PURE__ */ jsx2("pattern", { id: "grid-map", width: "40", height: "40", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsx2("path", { d: "M 40 0 L 0 0 0 40", fill: "none", stroke: s.line, strokeWidth: "1" }) }) }),
      /* @__PURE__ */ jsx2("rect", { width: "400", height: "400", fill: "url(#grid-map)" }),
      /* @__PURE__ */ jsx2("path", { d: "M 0 220 Q 100 180, 180 220 T 400 200", fill: "none", stroke: s.accent, strokeWidth: "3", strokeLinecap: "round", opacity: "0.5" }),
      /* @__PURE__ */ jsx2("path", { d: "M 40 0 L 80 120 L 60 240 L 100 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx2("path", { d: "M 220 0 L 260 180 L 240 400", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", opacity: "0.4" }),
      /* @__PURE__ */ jsx2("path", { d: "M 0 80 L 400 60", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" }),
      /* @__PURE__ */ jsx2("path", { d: "M 0 340 L 400 320", fill: "none", stroke: s.sub, strokeWidth: "1.5", opacity: "0.3" })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        background: s.accent,
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 12,
        fontSize: 13,
        fontWeight: 600,
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.35)",
        whiteSpace: "nowrap"
      }, children: STUDIO.name }),
      /* @__PURE__ */ jsx2("svg", { width: "22", height: "14", viewBox: "0 0 22 14", fill: s.accent, children: /* @__PURE__ */ jsx2("path", { d: "M0 0 L22 0 L11 14 Z" }) })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
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
  return /* @__PURE__ */ jsxs2("section", { id: "book", style: {
    padding: "52px 36px 40px",
    borderTop: `1px solid ${s.line}`,
    background: s.bg,
    scrollMarginTop: 80
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center", marginBottom: 28 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, letterSpacing: "0.14em", color: s.accent, fontWeight: 600 }, children: "\u0417\u0410\u041F\u0418\u0421\u042C" }),
      /* @__PURE__ */ jsx2("h2", { style: { fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em", margin: "6px 0 6px", lineHeight: 1.1 }, children: "\u0417\u0430\u043F\u0438\u0448\u0438\u0442\u0435\u0441\u044C \u043E\u043D\u043B\u0430\u0439\u043D \u0437\u0430 30 \u0441\u0435\u043A\u0443\u043D\u0434" }),
      /* @__PURE__ */ jsx2("p", { style: { fontSize: 15.5, color: s.sub, margin: 0 }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0437\u0430 15 \u043C\u0438\u043D\u0443\u0442. \u0414\u0430\u043D\u043D\u044B\u0435 \u043D\u0435\xA0\u043F\u0435\u0440\u0435\u0434\u0430\u0451\u043C \u0442\u0440\u0435\u0442\u044C\u0438\u043C \u043B\u0438\u0446\u0430\u043C." })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24, alignItems: "stretch" }, children: [
      /* @__PURE__ */ jsx2("div", { style: {
        background: s.white,
        border: `1px solid ${s.line}`,
        borderRadius: 18,
        padding: 28
      }, children: confirmed ? /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: s.bgAlt, borderRadius: 12 }, children: [
        /* @__PURE__ */ jsx2("span", { style: { width: 40, height: 40, borderRadius: "50%", background: VT.successSoft, color: VT.success, display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx2("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("div", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0417\u0430\u044F\u0432\u043A\u0430 \u043E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430" }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 13.5, color: s.sub }, children: "\u041F\u0435\u0440\u0435\u0437\u0432\u043E\u043D\u044E \u0432\xA0\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u0447\u0430\u0441\u0430. \u041C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443." })
        ] })
      ] }) : /* @__PURE__ */ jsxs2(Fragment3, { children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx2(CustomerInput, { label: "\u041A\u0430\u043A \u0432\u0430\u0441 \u0437\u043E\u0432\u0443\u0442", placeholder: "\u0418\u043C\u044F", s }),
          /* @__PURE__ */ jsx2(CustomerInput, { label: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", placeholder: "+7 ___ ___-__-__", s })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }, children: [
          /* @__PURE__ */ jsx2(CustomerSelect, { label: "\u0423\u0441\u043B\u0443\u0433\u0430", value: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", s }),
          /* @__PURE__ */ jsx2(CustomerSelect, { label: "\u0423\u0434\u043E\u0431\u043D\u043E\u0435 \u0432\u0440\u0435\u043C\u044F", value: "\u0437\u0430\u0432\u0442\u0440\u0430, \u043F\u043E\u0441\u043B\u0435 14:00", s })
        ] }),
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10, color: s.sub, marginTop: 10 }, children: `<input type="text" name="company" tabIndex={-1} style="display:none"> // honeypot` }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: 14 }, children: /* @__PURE__ */ jsx2(Checkbox, { checked: false, label: /* @__PURE__ */ jsx2(Fragment3, { children: "\u0421\u043E\u0433\u043B\u0430\u0441\u0435\u043D \u043D\u0430\xA0\u043E\u0431\u0440\u0430\u0431\u043E\u0442\u043A\u0443 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0445 \u0434\u0430\u043D\u043D\u044B\u0445" }), link: "\u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0430" }) }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: 16 }, children: /* @__PURE__ */ jsxs2("a", { href: "#book", style: {
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
          /* @__PURE__ */ jsx2(IconArrow, { size: 16 })
        ] }) }),
        /* @__PURE__ */ jsx2(Mono, { style: { display: "block", fontSize: 11, color: s.sub, marginTop: 10, textAlign: "center" }, children: "\u0417\u0430\u0449\u0438\u0449\u0435\u043D\u043E Yandex SmartCaptcha" }),
        /* @__PURE__ */ jsxs2("div", { style: {
          marginTop: 18,
          paddingTop: 16,
          borderTop: `1px solid ${s.line}`,
          textAlign: "center"
        }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, color: s.sub, marginBottom: 10 }, children: "\u041D\u0435 \u043B\u044E\u0431\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u044B? \u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u0432\xA0\u043C\u0435\u0441\u0441\u0435\u043D\u0434\u0436\u0435\u0440:" }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }, children: [
            /* @__PURE__ */ jsxs2("a", { href: `https://t.me/${STUDIO.tg.replace("@", "")}`, style: {
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
              /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z" }) }),
              "Telegram"
            ] }),
            /* @__PURE__ */ jsxs2("a", { href: `https://wa.me/${STUDIO.whatsapp}`, style: {
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
              /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", children: /* @__PURE__ */ jsx2("path", { d: "M12 2 A10 10 0 0 0 3 17 L2 22 L7 21 A10 10 0 1 0 12 2 Z M9 7 C 9.5 7 10 7.5 10.5 9 C 11 10 11 10.5 10 11 C 9.5 11.5 9 12 10 13 C 11 14 12 14.5 12.5 14 C 13 13 13.5 13 14.5 13.5 C 15.5 14 16 14.5 16 15 C 16 17 13 17 11 16 C 9 15 7 13 7 11 C 7 9 8 7 9 7 Z" }) }),
              "WhatsApp"
            ] }),
            /* @__PURE__ */ jsxs2("a", { href: `tel:${STUDIO.phoneHref}`, style: {
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
              /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinejoin: "round", strokeLinecap: "round", children: /* @__PURE__ */ jsx2("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
              "\u041F\u043E\u0437\u0432\u043E\u043D\u0438\u0442\u044C"
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { id: "contact", style: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        scrollMarginTop: 80
      }, children: [
        /* @__PURE__ */ jsx2(MapPlaceholder, { s }),
        /* @__PURE__ */ jsxs2("div", { style: {
          background: s.white,
          border: `1px solid ${s.line}`,
          borderRadius: 14,
          padding: "16px 18px"
        }, children: [
          /* @__PURE__ */ jsx2("div", { style: {
            fontFamily: VT.font.mono,
            fontSize: 11,
            letterSpacing: "0.12em",
            color: s.accent,
            fontWeight: 600,
            marginBottom: 8
          }, children: "\u0413\u0414\u0415 \u0418 \u041A\u041E\u0413\u0414\u0410" }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }, children: [
            /* @__PURE__ */ jsx2("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx2("path", { d: "M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z" }),
              /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "10", r: "3" })
            ] }) }),
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.address })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 10, alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsx2("span", { style: { color: s.accent, marginTop: 1, flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx2("circle", { cx: "12", cy: "12", r: "9" }),
              /* @__PURE__ */ jsx2("path", { d: "M12 7v5l3 2" })
            ] }) }),
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 14, color: s.ink, lineHeight: 1.4 }, children: STUDIO.hours })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function CustomerSelect({ label, value, s }) {
  return /* @__PURE__ */ jsxs2("div", { children: [
    label && /* @__PURE__ */ jsx2("div", { style: { fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }, children: label }),
    /* @__PURE__ */ jsxs2("div", { style: {
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
      /* @__PURE__ */ jsx2("span", { children: value }),
      /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: s.sub, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M6 9l6 6 6-6" }) })
    ] })
  ] });
}
function CustomerLeadForm({ s, confirmed = false }) {
  return /* @__PURE__ */ jsx2(CustomerBooking, { s, confirmed });
}
function CustomerFooter({ s, plan = "free" }) {
  return /* @__PURE__ */ jsxs2("footer", { style: {
    padding: "22px 36px 24px",
    borderTop: `1px solid ${s.line}`,
    background: s.bgAlt,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    fontSize: 13,
    color: s.sub
  }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx2("span", { style: { color: s.ink, fontWeight: 600 }, children: STUDIO.name }),
        /* @__PURE__ */ jsxs2("span", { children: [
          "\xB7 ",
          STUDIO.address
        ] }),
        /* @__PURE__ */ jsx2("a", { href: `tel:${STUDIO.phoneHref}`, style: { color: "inherit", textDecoration: "none", fontFamily: VT.font.mono }, children: STUDIO.phone })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 18, fontSize: 12.5 }, children: [
        /* @__PURE__ */ jsx2("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u041F\u043E\u043B\u0438\u0442\u0438\u043A\u0430 \u043A\u043E\u043D\u0444\u0438\u0434\u0435\u043D\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438" }),
        /* @__PURE__ */ jsx2("a", { style: { color: "inherit", textDecoration: "none" }, children: "\u0420\u0435\u043A\u0432\u0438\u0437\u0438\u0442\u044B" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 14, fontSize: 12 }, children: [
      /* @__PURE__ */ jsxs2("span", { children: [
        "\xA9 2026 ",
        STUDIO.name,
        ". \u0418\u041F \u041F\u0435\u0442\u0440\u043E\u0432\u0430 \u0410. \u0418., \u0441\u0430\u043C\u043E\u0437\u0430\u043D\u044F\u0442\u0430\u044F."
      ] }),
      plan === "free" ? /* @__PURE__ */ jsxs2("a", { style: {
        color: s.sub,
        textDecoration: "none",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: VT.font.mono,
        fontSize: 11.5
      }, children: [
        "\u0421\u0414\u0415\u041B\u0410\u041D\u041E \u041D\u0410 ",
        /* @__PURE__ */ jsx2("b", { style: { color: s.ink, fontFamily: VT.font.sans }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0435" }),
        " \u2192"
      ] }) : /* @__PURE__ */ jsx2("span", {})
    ] })
  ] });
}
function S7_CustomerSite({ scheme = "cream", plan = "free" }) {
  const s = SCHEMES[scheme];
  return /* @__PURE__ */ jsxs2("div", { style: { background: s.bg, color: s.ink, fontFamily: VT.font.sans, minHeight: "100%", letterSpacing: "-0.005em", position: "relative" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: {
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
      /* @__PURE__ */ jsx2("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx2("span", { style: { width: 10, height: 10, borderRadius: "50%", background: s.line } }),
      /* @__PURE__ */ jsx2("span", { style: { marginLeft: 12 }, children: "studia-anna.samosite.online" })
    ] }),
    /* @__PURE__ */ jsx2(CustomerHeader, { s }),
    /* @__PURE__ */ jsx2(CustomerHero, { s }),
    /* @__PURE__ */ jsx2(CustomerSocialBar, { s }),
    /* @__PURE__ */ jsx2(CustomerServices, { s }),
    /* @__PURE__ */ jsx2(CustomerProcess, { s }),
    /* @__PURE__ */ jsx2(CustomerGallery, { s }),
    /* @__PURE__ */ jsx2(CustomerReviews, { s }),
    /* @__PURE__ */ jsx2(CustomerAbout, { s }),
    /* @__PURE__ */ jsx2(CustomerFaq, { s }),
    /* @__PURE__ */ jsx2(CustomerBooking, { s }),
    /* @__PURE__ */ jsx2(CustomerFooter, { s, plan })
  ] });
}
function S8_LeadFormConfirm() {
  const s = SCHEMES.cream;
  return /* @__PURE__ */ jsx2("div", { style: { background: s.bg, fontFamily: VT.font.sans, padding: 24 }, children: /* @__PURE__ */ jsx2(CustomerLeadForm, { s, confirmed: true }) });
}
function S7_SchemeSwatches() {
  return /* @__PURE__ */ jsx2("div", { style: {
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
    return /* @__PURE__ */ jsxs2("div", { style: { width: 200 }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        height: 110,
        borderRadius: VT.r.md,
        overflow: "hidden",
        border: `1px solid ${s.line}`,
        background: s.bg,
        display: "flex",
        flexDirection: "column"
      }, children: [
        /* @__PURE__ */ jsx2("div", { style: { flex: 1, padding: 12, color: s.ink, fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
        /* @__PURE__ */ jsx2("div", { style: { height: 8, background: s.accent } }),
        /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 4, padding: 8 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx2("div", { style: { flex: 1, height: 14, borderRadius: 3, background: s.accentSoft } }, i)) })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { marginTop: 8, fontSize: 13, fontWeight: 600 }, children: name }),
      /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.inkFaint }, children: hint })
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
  return /* @__PURE__ */ jsxs2(
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
        /* @__PURE__ */ jsxs2("span", { style: { display: "flex", alignItems: "center", gap: 13, flex: 1, minWidth: 0 }, children: [
          /* @__PURE__ */ jsx2("span", { style: {
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
          }, children: checked && /* @__PURE__ */ jsx2("svg", { width: "11", height: "11", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3.4", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
          /* @__PURE__ */ jsx2("span", { style: { flex: 1, minWidth: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.25, color: VT.ink }, children: label })
        ] }),
        /* @__PURE__ */ jsxs2("span", { style: {
          flex: "0 0 auto",
          width: mobile ? "auto" : 116,
          paddingLeft: mobile ? 34 : 0,
          display: "flex",
          alignItems: "center",
          gap: 9
        }, children: [
          /* @__PURE__ */ jsx2("span", { style: { flex: 1, height: 5, borderRadius: 99, background: VT.bgSoft, overflow: "hidden" }, children: /* @__PURE__ */ jsx2("span", { style: { display: "block", height: "100%", width: pct + "%", background: VT.accent, borderRadius: 99, transition: "width .35s cubic-bezier(.2,.7,.2,1)" } }) }),
          /* @__PURE__ */ jsxs2("span", { style: {
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
  if (shown) return /* @__PURE__ */ jsx2("div", { style: { marginTop: 10 }, children });
  return /* @__PURE__ */ jsx2(
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
  return textarea ? /* @__PURE__ */ jsx2("textarea", { value, onChange: (e) => onChange(e.target.value), placeholder, style: { ...common, resize: "vertical", minHeight: 84 } }) : /* @__PURE__ */ jsx2("input", { value, onChange: (e) => onChange(e.target.value), placeholder, style: common });
}
function FBVoteSection({ title, items, votes, onToggle, ownVal, ownShown, onOwnShow, onOwnChange, ownPlaceholder, mobile }) {
  return /* @__PURE__ */ jsxs2("div", { style: { marginTop: 18 }, children: [
    /* @__PURE__ */ jsx2("h3", { style: { fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", margin: "0 0 2px" }, children: title }),
    /* @__PURE__ */ jsx2("p", { style: { fontSize: 12.5, color: VT.inkFaint, margin: "0 0 8px" }, children: "\u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u043D\u0443\u0436\u043D\u043E\u0435 \u2014 \u0433\u043E\u043B\u043E\u0441 \u0437\u0430\u0441\u0447\u0438\u0442\u0430\u0435\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443" }),
    /* @__PURE__ */ jsx2("div", { children: items.map(([key, label, base], i) => /* @__PURE__ */ jsx2(
      FBVoteRow,
      {
        label,
        base,
        first: i === 0,
        mobile,
        checked: !!votes[key],
        onToggle: () => onToggle(key)
      },
      key
    )) }),
    /* @__PURE__ */ jsx2(FBReveal, { label: "+ \u0441\u0432\u043E\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442", shown: ownShown, onShow: onOwnShow, children: /* @__PURE__ */ jsx2(FBField, { placeholder: ownPlaceholder, value: ownVal, onChange: onOwnChange }) })
  ] });
}
function S9_FeedbackModal({ mobile }) {
  const { useState: useState2 } = React;
  const [open, setOpen] = useState2(true);
  const [votes, setVotes] = useState2({});
  const [ownSrc, setOwnSrc] = useState2("");
  const [ownFeat, setOwnFeat] = useState2("");
  const [showOwnSrc, setShowOwnSrc] = useState2(false);
  const [showOwnFeat, setShowOwnFeat] = useState2(false);
  const [showMsg, setShowMsg] = useState2(false);
  const [msg, setMsg] = useState2("");
  const [name, setName] = useState2("");
  const [contact, setContact] = useState2("");
  const [submitted, setSubmitted] = useState2(false);
  const baseTotal = 340;
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
  const FauxPage = () => /* @__PURE__ */ jsxs2("div", { style: { position: "absolute", inset: 0, overflow: "hidden", padding: mobile ? "20px" : "32px 48px", filter: open ? "blur(2px)" : "none" }, children: [
    /* @__PURE__ */ jsx2("div", { style: { height: 18, width: mobile ? 120 : 180, background: VT.line, borderRadius: 6, opacity: 0.6 } }),
    /* @__PURE__ */ jsx2("div", { style: { height: mobile ? 32 : 46, width: "70%", background: VT.line, borderRadius: 10, opacity: 0.5, marginTop: 22 } }),
    /* @__PURE__ */ jsx2("div", { style: { height: 14, width: "52%", background: VT.line, borderRadius: 6, opacity: 0.4, marginTop: 16 } }),
    /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: mobile ? "column" : "row", gap: 16, marginTop: 30 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx2("div", { style: { flex: 1, height: mobile ? 90 : 150, background: VT.line, borderRadius: 14, opacity: 0.35 } }, i)) })
  ] });
  return /* @__PURE__ */ jsxs2("div", { "data-feedback-modal": true, style: { position: "relative", width: "100%", minHeight: "100%", background: VT.bg, fontFamily: VT.font.sans, color: VT.ink, letterSpacing: "-0.01em" }, children: [
    /* @__PURE__ */ jsx2(FauxPage, {}),
    !open && /* @__PURE__ */ jsxs2(
      "button",
      {
        type: "button",
        "data-floating-feedback-btn": true,
        onClick: () => {
          reset();
          setOpen(true);
        },
        style: {
          position: "absolute",
          right: mobile ? 16 : 28,
          bottom: mobile ? 16 : 28,
          zIndex: 3,
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
          /* @__PURE__ */ jsx2("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx2("path", { d: "M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" }) }),
          "\u0427\u0435\u0433\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442?"
        ]
      }
    ),
    open && /* @__PURE__ */ jsx2("div", { style: {
      position: "absolute",
      inset: 0,
      zIndex: 4,
      background: "oklch(0.30 0.02 60 / 0.46)",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: mobile ? "14px 10px" : "40px 24px"
    }, children: /* @__PURE__ */ jsxs2("div", { style: {
      position: "relative",
      width: "100%",
      maxWidth: mobile ? 9999 : 560,
      background: VT.bg,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.xl,
      boxShadow: VT.shadow.pop,
      overflow: "hidden"
    }, children: [
      /* @__PURE__ */ jsx2(
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
          children: /* @__PURE__ */ jsx2("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.2", strokeLinecap: "round", children: /* @__PURE__ */ jsx2("path", { d: "M6 6l12 12M18 6L6 18" }) })
        }
      ),
      submitted ? /* @__PURE__ */ jsxs2("div", { style: { textAlign: "center", padding: mobile ? "48px 24px" : "56px 36px" }, children: [
        /* @__PURE__ */ jsx2("div", { style: {
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: VT.success,
          color: "#fff",
          display: "grid",
          placeItems: "center",
          margin: "0 auto 20px",
          boxShadow: `0 0 0 8px ${VT.successSoft}`
        }, children: /* @__PURE__ */ jsx2("svg", { width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsx2("h2", { style: { fontSize: 23, fontWeight: 700, letterSpacing: "-0.02em", margin: 0 }, children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u0433\u043E\u043B\u043E\u0441 \u0443\u0447\u043B\u0438" }),
        /* @__PURE__ */ jsxs2("p", { style: { fontSize: 15, color: VT.inkSoft, maxWidth: 380, margin: "10px auto 0", lineHeight: 1.5 }, children: [
          "\u0417\u0430\u0441\u0447\u0438\u0442\u0430\u043B\u0438 ",
          n,
          " ",
          fbPlural(n),
          ". \u041A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E \u043F\u0443\u043D\u043A\u0442\u0443 \u043D\u0430\u0431\u0435\u0440\u0451\u0442\u0441\u044F 10 \u2014 \u0431\u0435\u0440\u0451\u043C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443",
          contact.trim() ? " \u0438 \u043D\u0430\u043F\u0438\u0448\u0435\u043C \u0432\u0430\u043C." : ". \u0425\u043E\u0442\u0438\u0442\u0435 \u0443\u0437\u043D\u0430\u0442\u044C \u043E \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u2014 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442."
        ] }),
        /* @__PURE__ */ jsx2("div", { style: { marginTop: 24 }, onClick: () => setOpen(false), children: /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", style: { cursor: "pointer" }, children: "\u0413\u043E\u0442\u043E\u0432\u043E" }) })
      ] }) : /* @__PURE__ */ jsxs2("div", { style: { padding: mobile ? "26px 20px 22px" : "30px 32px 26px" }, children: [
        /* @__PURE__ */ jsx2("h2", { style: { fontSize: mobile ? 21 : 24, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 40px 8px 0", lineHeight: 1.12 }, children: "\u0421\u043A\u0430\u0436\u0438\u0442\u0435, \u0447\u0435\u0433\u043E \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442" }),
        /* @__PURE__ */ jsx2("p", { style: { fontSize: 14, color: VT.inkSoft, margin: 0, maxWidth: 440, lineHeight: 1.45 }, children: "\u041D\u0430\u0431\u0438\u0440\u0430\u0435\u043C 10 \u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u043F\u043E \u043F\u0443\u043D\u043A\u0442\u0443 \u2014 \u0431\u0435\u0440\u0451\u043C \u0432 \u0440\u0430\u0431\u043E\u0442\u0443. \u0427\u0435\u043C \u0431\u043E\u043B\u044C\u0448\u0435 \u043B\u044E\u0434\u0435\u0439 \u043F\u0440\u043E\u0441\u044F\u0442 \u043E\u0434\u043D\u043E \u0438 \u0442\u043E \u0436\u0435, \u0442\u0435\u043C \u0431\u044B\u0441\u0442\u0440\u0435\u0435 \u0437\u0430\u043F\u0443\u0441\u043A\u0430\u0435\u043C." }),
        /* @__PURE__ */ jsxs2("span", { style: {
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
          /* @__PURE__ */ jsx2("span", { style: { width: 7, height: 7, borderRadius: "50%", background: VT.success, boxShadow: `0 0 0 4px ${VT.successSoft}` } }),
          /* @__PURE__ */ jsx2("b", { style: { color: VT.ink, fontVariantNumeric: "tabular-nums" }, children: baseTotal + n }),
          "\xA0\u0433\u043E\u043B\u043E\u0441\u043E\u0432 \u0437\u0430 \u043D\u0435\u0434\u0435\u043B\u044E"
        ] }),
        /* @__PURE__ */ jsx2(
          FBVoteSection,
          {
            title: "\u0425\u043E\u0447\u0443 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A",
            items: FB_SOURCES,
            votes,
            onToggle: toggle,
            mobile,
            ownVal: ownSrc,
            ownShown: showOwnSrc,
            onOwnShow: () => setShowOwnSrc(true),
            onOwnChange: setOwnSrc,
            ownPlaceholder: "\u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0430"
          }
        ),
        /* @__PURE__ */ jsx2(
          FBVoteSection,
          {
            title: "\u0425\u043E\u0447\u0443 \u0444\u0438\u0447\u0443",
            items: FB_FEATURES,
            votes,
            onToggle: toggle,
            mobile,
            ownVal: ownFeat,
            ownShown: showOwnFeat,
            onOwnShow: () => setShowOwnFeat(true),
            onOwnChange: setOwnFeat,
            ownPlaceholder: "\u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0438\u0447\u0438"
          }
        ),
        /* @__PURE__ */ jsxs2("div", { style: {
          marginTop: 20,
          paddingLeft: 15,
          borderLeft: `3px solid ${awake ? VT.accent : VT.line}`,
          opacity: awake ? 1 : 0.5,
          pointerEvents: awake ? "auto" : "none",
          transition: "opacity .3s, border-color .3s"
        }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 12, alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsx2("span", { style: {
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
            }, children: awake && /* @__PURE__ */ jsx2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "white", strokeWidth: "3", children: /* @__PURE__ */ jsx2("path", { d: "M5 12l4 4 10-10", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("strong", { style: { display: "block", fontSize: 15.5, fontWeight: 700 }, children: "\u041D\u0430\u043F\u0438\u0448\u0435\u043C, \u043A\u043E\u0433\u0434\u0430 \u0434\u043E\u0431\u0430\u0432\u0438\u043C" }),
              /* @__PURE__ */ jsx2("span", { style: { display: "block", fontSize: 13, color: VT.inkSoft, marginTop: 3, lineHeight: 1.4 }, children: "\u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043D\u0442\u0430\u043A\u0442 \u2014 \u0441\u043E\u043E\u0431\u0449\u0438\u043C, \u043A\u0430\u043A \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0430\u0448 \u0433\u043E\u043B\u043E\u0441 \u043D\u0430\u0431\u0435\u0440\u0451\u0442 10 \u0438 \u043F\u0443\u043D\u043A\u0442 \u043F\u043E\u043F\u0430\u0434\u0451\u0442 \u0432 \u0440\u0430\u0431\u043E\u0442\u0443. \u041D\u0438\u043A\u043E\u043C\u0443 \u043D\u0435 \u043F\u043E\u043A\u0430\u0436\u0435\u043C \u0438 \u0441\u043F\u0430\u043C\u0438\u0442\u044C \u043D\u0435 \u0431\u0443\u0434\u0435\u043C." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 11, marginTop: 14 }, children: [
            /* @__PURE__ */ jsx2(FBField, { placeholder: "\u0418\u043C\u044F", value: name, onChange: setName }),
            /* @__PURE__ */ jsx2(FBField, { placeholder: "Email, \u0442\u0435\u043B\u0435\u0444\u043E\u043D \u0438\u043B\u0438 @telegram", value: contact, onChange: setContact })
          ] }),
          /* @__PURE__ */ jsx2(FBReveal, { label: "+ \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439", shown: showMsg, onShow: () => setShowMsg(true), children: /* @__PURE__ */ jsx2(FBField, { textarea: true, placeholder: "\u0447\u0442\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0440\u0430\u0441\u0441\u043A\u0430\u0437\u0430\u0442\u044C", value: msg, onChange: setMsg }) })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 16, marginTop: 24, flexWrap: "wrap" }, children: [
          /* @__PURE__ */ jsx2("div", { onClick: () => {
            if (n > 0) setSubmitted(true);
          }, style: { width: mobile ? "100%" : "auto" }, children: /* @__PURE__ */ jsx2(Btn, { size: "md", style: { width: mobile ? "100%" : "auto", opacity: n === 0 ? 0.45 : 1, cursor: n === 0 ? "not-allowed" : "pointer" }, children: n > 0 ? `\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C ${n} ${fbPlural(n)}` : "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u0433\u043E\u043B\u043E\u0441" }) }),
          n === 0 && !mobile && /* @__PURE__ */ jsx2("span", { style: { fontSize: 13.5, color: VT.inkFaint }, children: "\u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043F\u0443\u043D\u043A\u0442" })
        ] })
      ] })
    ] }) })
  ] });
}
var S9_FeedbackPage = S9_FeedbackModal;
var CustomerSite = S7_CustomerSite;
var LeadForm = S8_LeadFormConfirm;
var FeedbackPage = S9_FeedbackModal;
export {
  CustomerSite,
  FeedbackPage,
  LeadForm,
  S7_CustomerSite,
  S7_SchemeSwatches,
  S8_LeadFormConfirm,
  S9_FeedbackModal,
  S9_FeedbackPage
};
//# sourceMappingURL=index.js.map