"use client";

// src/auth/index.tsx
import { useState, useEffect, useCallback } from "react";

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

// src/auth/index.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var CUSTOMER_ERROR_MSG = {
  invalid_credentials: "\u041D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u043B\u043E\u0433\u0438\u043D \u0438\u043B\u0438 \u043F\u0430\u0440\u043E\u043B\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435, \u043A\u043E\u0442\u043E\u0440\u043E\u0435 \u043C\u044B \u0432\u0430\u043C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u043B\u0438.",
  rate_limited: null,
  // rendered via CustomerRateLimitNotice w/ countdown
  network_error: "\u0421\u0435\u0442\u044C \u043D\u0435 \u043E\u0442\u0432\u0435\u0447\u0430\u0435\u0442. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443.",
  unknown_error: "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u0447\u0435\u0440\u0435\u0437 \u043C\u0438\u043D\u0443\u0442\u0443."
};
function CustomerRateLimitNotice({ retryAfterSeconds = 263 }) {
  const [remaining, setRemaining] = useState(retryAfterSeconds);
  useEffect(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const totalMin = Math.ceil(remaining / 60);
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  return /* @__PURE__ */ jsxs2("div", { role: "alert", style: {
    padding: "10px 12px",
    background: VT.dangerSoft,
    border: `1px solid oklch(0.85 0.06 28)`,
    borderRadius: VT.r.md,
    fontSize: 13,
    color: "oklch(0.4 0.15 28)",
    marginBottom: 14,
    lineHeight: 1.5
  }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { marginRight: 6 }, children: "\u26A0\uFE0F" }),
    "\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043C\u043D\u043E\u0433\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0447\u0435\u0440\u0435\u0437 ",
    totalMin,
    "\xA0\u043C\u0438\u043D \u2014 \u043E\u0441\u0442\u0430\u043B\u043E\u0441\u044C",
    " ",
    /* @__PURE__ */ jsxs2("span", { style: { fontFamily: VT.font.mono, fontSize: 13 }, children: [
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
  return /* @__PURE__ */ jsxs2("div", { role: "alert", style: {
    padding: "10px 12px",
    background: VT.dangerSoft,
    border: `1px solid oklch(0.85 0.06 28)`,
    borderRadius: VT.r.md,
    fontSize: 13,
    color: "oklch(0.4 0.15 28)",
    marginBottom: 14,
    lineHeight: 1.5
  }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { marginRight: 6 }, children: "\u26A0\uFE0F" }),
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
  return /* @__PURE__ */ jsx2(
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
  const [uLogin, setULogin] = useState(props.login ?? "");
  const [uPass, setUPass] = useState(props.password ?? "");
  const login = props.login ?? uLogin;
  const password = props.password ?? uPass;
  const setLogin = props.onLoginChange ?? setULogin;
  const setPassword = props.onPasswordChange ?? setUPass;
  const { loading, error, retryAfterSeconds, onSubmit, onCreateSiteClick } = props;
  const isRateLimited = error === "rate_limited";
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (loading || isRateLimited) return;
    if (onSubmit) onSubmit();
  }, [loading, isRateLimited, onSubmit]);
  return /* @__PURE__ */ jsx2("div", { style: {
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
  }, children: /* @__PURE__ */ jsxs2("div", { style: { width: "100%", maxWidth: 420 }, children: [
    /* @__PURE__ */ jsx2("div", { style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 18
    }, children: /* @__PURE__ */ jsx2("a", { href: "/", style: { textDecoration: "none", color: "inherit" }, children: /* @__PURE__ */ jsx2(BrandMark, { size: 26, fontSize: 20 }) }) }),
    /* @__PURE__ */ jsxs2(Card, { style: {
      padding: 28,
      boxShadow: VT.shadow.card,
      borderTop: `2px solid ${VT.success}`
    }, children: [
      /* @__PURE__ */ jsx2("h1", { style: {
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        margin: "0 0 6px",
        lineHeight: 1.2
      }, children: "\u0412\u043E\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0432\u043E\u0439 \u043A\u0430\u0431\u0438\u043D\u0435\u0442" }),
      /* @__PURE__ */ jsx2("p", { style: {
        fontSize: 13.5,
        color: VT.inkSoft,
        margin: "0 0 18px",
        lineHeight: 1.5
      }, children: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C, \u043A\u043E\u0442\u043E\u0440\u044B\u0435 \u043C\u044B \u043F\u0440\u0438\u0441\u043B\u0430\u043B\u0438 \u0432\u0430\u043C \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430." }),
      isRateLimited ? /* @__PURE__ */ jsx2(CustomerRateLimitNotice, { retryAfterSeconds: retryAfterSeconds ?? 263 }) : error && /* @__PURE__ */ jsx2(CustomerErrorNotice, { code: error }),
      /* @__PURE__ */ jsxs2("form", { onSubmit: handleSubmit, noValidate: true, children: [
        /* @__PURE__ */ jsx2("label", { htmlFor: "ss-customer-login", style: {
          display: "block",
          fontSize: 12,
          color: VT.inkSoft,
          marginBottom: 4,
          fontWeight: 500
        }, children: "\u041B\u043E\u0433\u0438\u043D" }),
        /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2("label", { htmlFor: "ss-customer-password", style: {
          display: "block",
          fontSize: 12,
          color: VT.inkSoft,
          marginBottom: 4,
          fontWeight: 500
        }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
        /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2("div", { style: { marginTop: 20 }, children: /* @__PURE__ */ jsx2(
          Btn,
          {
            type: "submit",
            style: { width: "100%" },
            disabled: loading || isRateLimited || !login || !password,
            iconRight: loading ? /* @__PURE__ */ jsx2(Spinner, { size: 14 }) : /* @__PURE__ */ jsx2(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { style: {
      marginTop: 22,
      textAlign: "center",
      fontSize: 13.5,
      color: VT.inkSoft
    }, children: [
      "\u0415\u0449\u0451 \u043D\u0435\u0442 \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430?",
      " ",
      onCreateSiteClick ? /* @__PURE__ */ jsxs2(
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
            /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
          ]
        }
      ) : /* @__PURE__ */ jsxs2("a", { href: "/", style: {
        color: VT.accent,
        fontWeight: 600,
        textDecoration: "none"
      }, children: [
        "\u0421\u0434\u0435\u043B\u0430\u0442\u044C\xA0",
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u2192" })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("div", { style: {
      marginTop: 14,
      textAlign: "center",
      fontSize: 11.5,
      color: VT.inkFaint,
      lineHeight: 1.5
    }, children: "\u0414\u043E\u0441\u0442\u0443\u043F \u0432 \u043A\u0430\u0431\u0438\u043D\u0435\u0442 \u0432\u044B\u0434\u0430\u0451\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442\u0430 \u2014 \u043C\u044B \u043F\u0440\u0438\u0448\u043B\u0451\u043C \u043B\u043E\u0433\u0438\u043D \u0438 \u043F\u0430\u0440\u043E\u043B\u044C \u043F\u043E \u0443\u043A\u0430\u0437\u0430\u043D\u043D\u044B\u043C \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0430\u043C." })
  ] }) });
}
var CustomerLogin = S20_CustomerLogin;
export {
  CustomerLogin,
  S20_CustomerLogin
};
//# sourceMappingURL=index.js.map