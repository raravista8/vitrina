"use client";

// src/admin-core/index.tsx
import React, { useState, useEffect, useCallback } from "react";

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
  return /* @__PURE__ */ jsx("span", { style: {
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
function IconArrow({ size = 18 }) {
  return /* @__PURE__ */ jsx("span", { style: { fontSize: size, lineHeight: 1 }, children: "\u2192" });
}
function Spinner({ size = 14 }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", style: { animation: "vt-spin 0.9s linear infinite" }, children: /* @__PURE__ */ jsx("circle", { cx: 12, cy: 12, r: 9, fill: "none", stroke: "currentColor", strokeWidth: 2.5, strokeDasharray: "40 20", strokeLinecap: "round" }) });
}

// src/admin-core/index.tsx
import { Fragment as Fragment3, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function SkeletonBlock({ width = "100%", height = 14, radius = 4, style }) {
  return /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: {
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
  return /* @__PURE__ */ jsxs2("div", { role: "status", style: {
    padding: "48px 24px",
    textAlign: "center",
    color: VT.inkFaint,
    fontFamily: VT.font.sans
  }, children: [
    /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: { fontSize: 28, opacity: 0.6, marginBottom: 8 }, children: "\u2205" }),
    /* @__PURE__ */ jsx2("div", { style: { fontSize: 14.5, fontWeight: 500, color: VT.inkSoft, marginBottom: 4 }, children: title }),
    hint && /* @__PURE__ */ jsx2("div", { style: { fontSize: 13 }, children: hint })
  ] });
}
function ErrorBlock({ title, message, onRetry }) {
  return /* @__PURE__ */ jsx2(Card, { role: "alert", style: {
    padding: 18,
    background: VT.dangerSoft,
    borderColor: "oklch(0.86 0.06 28)"
  }, children: /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { fontSize: 18 }, children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs2("div", { style: { flex: 1 }, children: [
      /* @__PURE__ */ jsx2("div", { style: { fontWeight: 600, fontSize: 14, color: "oklch(0.4 0.15 28)" }, children: title || "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A" }),
      message && /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, color: VT.inkSoft, marginTop: 2 }, children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsx2("button", { type: "button", onClick: onRetry, style: {
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
  const [remaining, setRemaining] = useState(retryAfterSeconds);
  useEffect(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1e3);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
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
    display: "flex",
    alignItems: "center",
    gap: 8
  }, children: [
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", children: "\u26A0\uFE0F" }),
    /* @__PURE__ */ jsxs2("span", { children: [
      "5 \u043D\u0435\u0443\u0434\u0430\u0447 \u0437\u0430 15 \u043C\u0438\u043D \u2014 IP \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D. \u041E\u0441\u0442\u0430\u043B\u043E\u0441\u044C ",
      /* @__PURE__ */ jsxs2(Mono, { style: { color: "inherit", fontSize: 13 }, children: [
        mm,
        ":",
        ss
      ] }),
      "."
    ] })
  ] });
}
function TextField({ type = "text", value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono }) {
  return /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsxs2("div", { style: {
    display: "grid",
    gridTemplateColumns: "220px 1fr",
    minHeight: "100%",
    background: VT.bgSoft,
    fontFamily: VT.font.sans,
    color: VT.ink,
    letterSpacing: "-0.005em"
  }, children: [
    /* @__PURE__ */ jsxs2("aside", { style: {
      background: VT.bg,
      borderRight: `1px solid ${VT.line}`,
      padding: 16,
      display: "flex",
      flexDirection: "column",
      gap: 4
    }, children: [
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, padding: "6px 8px", marginBottom: 18 }, children: [
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.bg } }),
        /* @__PURE__ */ jsx2("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
        /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 6px", fontSize: 10, borderRadius: 4 }, children: "ADMIN" })
      ] }),
      /* @__PURE__ */ jsx2("nav", { "aria-label": "Admin sections", style: { display: "flex", flexDirection: "column", gap: 4 }, children: NAV.map(([key, name, icon]) => {
        const isActive = activeKey === key;
        const count = badges?.[key];
        return /* @__PURE__ */ jsxs2(
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
              /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { fontSize: 15, width: 18, display: "inline-flex" }, children: icon }),
              name,
              typeof count === "number" && count > 0 && /* @__PURE__ */ jsx2(Badge, { kind: "warn", style: { marginLeft: "auto", padding: "1px 7px", fontSize: 10, borderRadius: 999 }, children: count })
            ]
          },
          key
        );
      }) }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 24, height: 24, borderRadius: "50%", background: VT.accentSoft, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: VT.accentInk, fontWeight: 600 }, children: u.initials }),
        /* @__PURE__ */ jsx2("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: u.username }),
        /* @__PURE__ */ jsx2(
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
    /* @__PURE__ */ jsx2("main", { style: { minWidth: 0 }, children })
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
  const [uStep, setUStep] = useState(props.step ?? 1);
  const [uUser, setUUser] = useState(props.username ?? "founder@samosite.online");
  const [uPass, setUPass] = useState(props.password ?? "");
  const [uTotp, setUTotp] = useState(props.totp ?? "");
  const [uBackup, setUBackup] = useState(props.backupCode ?? "");
  const [uMode, setUMode] = useState(props.mode ?? "totp");
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
  const onSubmit1 = useCallback((e) => {
    e.preventDefault();
    if (loading) return;
    if (onSubmitCredentials) {
      onSubmitCredentials(username, password);
    } else {
      setStep(2);
    }
  }, [loading, onSubmitCredentials, username, password, setStep]);
  const onSubmit2 = useCallback((e) => {
    e.preventDefault();
    if (loading) return;
    const code = mode === "totp" ? totp : backupCode;
    if (onSubmitCode) onSubmitCode(mode, code);
  }, [loading, mode, totp, backupCode, onSubmitCode]);
  return /* @__PURE__ */ jsx2("div", { style: {
    background: VT.bgSoft,
    minHeight: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: VT.font.sans,
    padding: 24
  }, children: /* @__PURE__ */ jsxs2(Card, { style: { width: 400, padding: 28 }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }, children: [
      /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: "inset 0 0 0 4px " + VT.white } }),
      /* @__PURE__ */ jsx2("span", { style: { fontWeight: 700, fontSize: 16 }, children: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442" }),
      /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { marginLeft: "auto", padding: "2px 7px", fontSize: 10 }, children: "ADMIN" })
    ] }),
    /* @__PURE__ */ jsx2("h1", { style: { fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 4px" }, children: step === 1 ? "\u0412\u0445\u043E\u0434 \u0432 \u0430\u0434\u043C\u0438\u043D\u043A\u0443" : "\u0414\u0432\u0443\u0445\u0444\u0430\u043A\u0442\u043E\u0440\u043D\u0430\u044F \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0446\u0438\u044F" }),
    /* @__PURE__ */ jsx2("p", { style: { fontSize: 13.5, color: VT.inkSoft, margin: "0 0 18px" }, children: step === 1 ? "\u0422\u043E\u043B\u044C\u043A\u043E \u0434\u043B\u044F founder. \u0412\u0441\u0435 \u043F\u043E\u043F\u044B\u0442\u043A\u0438 \u043B\u043E\u0433\u0438\u0440\u0443\u044E\u0442\u0441\u044F." : "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 6-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434 \u0438\u0437 \u043F\u0440\u0438\u043B\u043E\u0436\u0435\u043D\u0438\u044F-\u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430." }),
    rateLimited && /* @__PURE__ */ jsx2(RateLimitCountdown, { retryAfterSeconds: rateLimitedRetryAfterSeconds }),
    error && !rateLimited && /* @__PURE__ */ jsx2("div", { role: "alert", style: {
      padding: "8px 12px",
      background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`,
      borderRadius: VT.r.md,
      fontSize: 13,
      color: "oklch(0.4 0.15 28)",
      marginBottom: 14
    }, children: LOGIN_ERROR_MSG[error] || LOGIN_ERROR_MSG.unknown_error }),
    step === 1 ? /* @__PURE__ */ jsxs2("form", { onSubmit: onSubmit1, children: [
      /* @__PURE__ */ jsx2("label", { htmlFor: "ss-admin-email", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "Email" }),
      /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsx2("label", { htmlFor: "ss-admin-password", style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 4 }, children: "\u041F\u0430\u0440\u043E\u043B\u044C" }),
      /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsx2("div", { style: { marginTop: 18 }, children: /* @__PURE__ */ jsx2(
        Btn,
        {
          type: "submit",
          style: { width: "100%" },
          disabled: loading || rateLimited || !username || !password,
          iconRight: loading ? /* @__PURE__ */ jsx2(Spinner, { size: 14 }) : /* @__PURE__ */ jsx2(IconArrow, {}),
          children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0414\u0430\u043B\u044C\u0448\u0435"
        }
      ) })
    ] }) : /* @__PURE__ */ jsxs2("form", { onSubmit: onSubmit2, children: [
      /* @__PURE__ */ jsx2("div", { role: "tablist", "aria-label": "\u0421\u043F\u043E\u0441\u043E\u0431 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F", style: { display: "flex", gap: 6, marginBottom: 12, padding: 3, background: VT.bgSoft, borderRadius: VT.r.md, border: `1px solid ${VT.line}` }, children: [
        ["totp", "\u0410\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440"],
        ["backup", "Backup-\u043A\u043E\u0434"]
      ].map(([key, label]) => {
        const isActive = mode === key;
        return /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsx2("label", { style: { display: "block", fontSize: 12, color: VT.inkSoft, marginBottom: 6 }, children: mode === "totp" ? "\u041A\u043E\u0434 \u0438\u0437 \u0430\u0443\u0442\u0435\u043D\u0442\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u0430" : "Backup-\u043A\u043E\u0434" }),
      /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: 18, display: "flex", gap: 8 }, children: [
        /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2(
          Btn,
          {
            type: "submit",
            style: { flex: 1 },
            disabled: loading || rateLimited || !(mode === "totp" ? totp : backupCode),
            iconRight: loading ? /* @__PURE__ */ jsx2(Spinner, { size: 14 }) : /* @__PURE__ */ jsx2(IconArrow, {}),
            children: loading ? "\u041F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u043C\u2026" : "\u0412\u043E\u0439\u0442\u0438"
          }
        )
      ] })
    ] })
  ] }) });
}
function StatTile({ label, value, delta, deltaSign, sub, onClick, loading }) {
  const clickable = !!onClick && !loading;
  return /* @__PURE__ */ jsx2(
    Card,
    {
      style: {
        padding: 18,
        cursor: clickable ? "pointer" : "default",
        transition: "transform .15s ease, box-shadow .15s ease"
      },
      children: /* @__PURE__ */ jsxs2(
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
            /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: String(label).toUpperCase() }),
            loading ? /* @__PURE__ */ jsx2("div", { style: { marginTop: 8 }, children: /* @__PURE__ */ jsx2(SkeletonBlock, { width: 64, height: 28, radius: 6 }) }) : /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "baseline", gap: 10, marginTop: 6 }, children: [
              /* @__PURE__ */ jsx2("span", { style: { fontSize: 30, fontWeight: 700, letterSpacing: "-0.025em" }, children: value }),
              delta && /* @__PURE__ */ jsxs2("span", { style: {
                fontSize: 12.5,
                fontWeight: 600,
                color: deltaSign === "+" ? VT.success : deltaSign === "-" ? VT.danger : VT.inkSoft
              }, children: [
                deltaSign,
                delta
              ] })
            ] }),
            sub && !loading && /* @__PURE__ */ jsx2("div", { style: { fontSize: 12, color: VT.inkFaint, marginTop: 4 }, children: sub }),
            loading && /* @__PURE__ */ jsx2("div", { style: { marginTop: 6 }, children: /* @__PURE__ */ jsx2(SkeletonBlock, { width: "50%", height: 10 }) })
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
  return /* @__PURE__ */ jsxs2("span", { style: {
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
    /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { width: 5, height: 5, borderRadius: "50%", background: "currentColor" } }),
    m[2]
  ] });
}
function FilterChip({ label, active, count, onClick, disabled }) {
  return /* @__PURE__ */ jsxs2(
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
        count != null && /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, color: "inherit", opacity: 0.7 }, children: count })
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
  return /* @__PURE__ */ jsxs2("svg", { viewBox: `0 0 ${w} ${height}`, width: "100%", height, preserveAspectRatio: "none", role: "img", "aria-label": "\u0413\u0440\u0430\u0444\u0438\u043A \u0437\u0430\u044F\u0432\u043E\u043A", children: [
    /* @__PURE__ */ jsx2("path", { d: area, fill: VT.accentSoft, opacity: "0.7" }),
    /* @__PURE__ */ jsx2("path", { d: path, fill: "none", stroke: VT.accent, strokeWidth: "2" }),
    points.map((p, i) => /* @__PURE__ */ jsx2("circle", { cx: i / (points.length - 1) * w, cy: height - 30 - p / max * (height - 50), r: "3", fill: VT.bg, stroke: VT.accent, strokeWidth: "1.5" }, i)),
    xLabels.map((l, i) => /* @__PURE__ */ jsx2("text", { x: i / (xLabels.length - 1) * w, y: height - 8, fontSize: "11", fill: VT.inkFaint, fontFamily: "JetBrains Mono, monospace", textAnchor: i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle", children: l }, l + i))
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
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "dashboard", onNavigate };
  return /* @__PURE__ */ jsx2(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs2("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2(Eyebrow, { children: "DASHBOARD" }),
        /* @__PURE__ */ jsx2("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: "10px 0 0" }, children: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 8 }, children: [
        onRefresh && /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", onClick: onRefresh, children: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C" }),
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "7 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: "30 \u0434\u043D\u0435\u0439" }),
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "\u0412\u0441\u0451 \u0432\u0440\u0435\u043C\u044F" })
      ] })
    ] }),
    error && /* @__PURE__ */ jsx2(ErrorBlock, { message: error, onRetry: onRefresh }),
    /* @__PURE__ */ jsx2("div", { style: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginTop: error ? 14 : 0 }, children: COUNTER_TILES.map((t) => /* @__PURE__ */ jsx2(
      StatTile,
      {
        label: t.label,
        value: loading ? "" : d.counters[t.key] ?? 0,
        loading,
        onClick: onNavigate ? () => onNavigate(t.section) : void 0
      },
      t.key
    )) }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14, marginTop: 14 }, children: [
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }, children: [
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "\u0417\u0410\u042F\u0412\u041A\u0418 \xB7 14 \u0414\u041D\u0415\u0419" }),
            /* @__PURE__ */ jsx2("div", { style: { fontSize: 20, fontWeight: 700, marginTop: 4 }, children: loading ? /* @__PURE__ */ jsx2(SkeletonBlock, { width: 80, height: 20 }) : d.applications_series_14d.reduce((s, x) => s + x.count, 0) })
          ] }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", children: "CSV" })
        ] }),
        loading ? /* @__PURE__ */ jsx2(SkeletonBlock, { width: "100%", height: 200, radius: 8 }) : /* @__PURE__ */ jsx2(TrendChart, { series: d.applications_series_14d, labels: d.applications_series_14d.map((s) => s.day.slice(8)) })
      ] }),
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 20 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "QUICK \xB7 \u0422\u041E\u041F-5 PENDING" }),
          /* @__PURE__ */ jsx2(
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
        loading ? /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx2("div", { style: { padding: "8px 10px", borderBottom: `1px solid ${VT.lineSoft}` }, children: /* @__PURE__ */ jsx2(SkeletonBlock, { width: "80%", height: 14 }) }, i)) }) : /* @__PURE__ */ jsx2("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
          ["#A-1842", "TG", "studia-anna \xB7 47 \u043F\u043E\u0441\u0442\u043E\u0432", "12 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1841", "YM", "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \u0421\u0430\u043C\u0430\u0440\u0430 \xB7 24 \u043E\u0442\u0437.", "34 \u043C\u0438\u043D \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1840", "Photo", "\u041F\u0441\u0438\u0445\u043E\u043B\u043E\u0433 \u041C\u0430\u0440\u0438\u043D\u0430 \xB7 12 \u0444\u043E\u0442\u043E", "1 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1839", "TG", "\u0414\u043E\u043C \u0440\u0435\u0441\u043D\u0438\u0446 \xB7 89 \u043F\u043E\u0441\u0442\u043E\u0432", "2 \u0447 \u043D\u0430\u0437\u0430\u0434"],
          ["#A-1838", "YM", "\u0421\u0442\u0443\u0434\u0438\u044F \u0439\u043E\u0433\u0438 \xB7 56 \u043E\u0442\u0437.", "3 \u0447 \u043D\u0430\u0437\u0430\u0434"]
        ].map(([id, src, name, ago]) => /* @__PURE__ */ jsxs2(
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
              /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11, width: 56 }, children: id }),
              /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { padding: "2px 7px", fontSize: 10.5, borderRadius: 4 }, children: src }),
              /* @__PURE__ */ jsx2("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: name }),
              /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 11 }, children: ago })
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
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: () => {
  } };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;
  return /* @__PURE__ */ jsx2(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs2("div", { style: { padding: "24px 32px 40px" }, children: [
    /* @__PURE__ */ jsx2(Eyebrow, { children: "\u0417\u0410\u042F\u0412\u041A\u0418" }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", margin: "10px 0 18px" }, children: [
      /* @__PURE__ */ jsx2("h1", { style: { fontSize: 28, fontWeight: 700, letterSpacing: "-0.025em", margin: 0 }, children: "\u041E\u0447\u0435\u0440\u0435\u0434\u044C \u043C\u043E\u0434\u0435\u0440\u0430\u0446\u0438\u0438" }),
      /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 CSV" })
    ] }),
    error && /* @__PURE__ */ jsx2("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx2(ErrorBlock, { message: error }) }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 14, marginBottom: 14, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 6 }, children: STATUS_FILTERS.map(([key, label]) => /* @__PURE__ */ jsx2(
        FilterChip,
        {
          label,
          active: statusFilter === key,
          onClick: () => onStatusFilterChange && onStatusFilterChange(key)
        },
        key
      )) }),
      /* @__PURE__ */ jsx2("div", { style: { marginLeft: "auto", display: "flex", gap: 8 }, children: /* @__PURE__ */ jsxs2("div", { style: {
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
        /* @__PURE__ */ jsxs2("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsx2("circle", { cx: "11", cy: "11", r: "7" }),
          /* @__PURE__ */ jsx2("path", { d: "M21 21l-4.3-4.3", strokeLinecap: "round" })
        ] }),
        "\u043F\u043E\u0438\u0441\u043A \u043F\u043E \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u0443, ID, \u0438\u0441\u0442\u043E\u0447\u043D\u0438\u043A\u0443"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs2(Card, { style: { padding: 0, overflow: "hidden" }, children: [
      /* @__PURE__ */ jsxs2("table", { style: { width: "100%", borderCollapse: "collapse", fontSize: 13 }, children: [
        /* @__PURE__ */ jsx2("thead", { children: /* @__PURE__ */ jsx2("tr", { style: { background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }, children: ["ID", "\u0421\u043E\u0437\u0434\u0430\u043D\u0430", "\u0418\u0441\u0442\u043E\u0447\u043D\u0438\u043A", "URL", "\u041A\u043E\u043D\u0442\u0430\u043A\u0442", "\u0421\u0442\u0430\u0442\u0443\u0441", ""].map((h) => /* @__PURE__ */ jsx2("th", { scope: "col", style: {
          textAlign: "left",
          padding: "12px 16px",
          fontFamily: VT.font.mono,
          fontSize: 10.5,
          letterSpacing: "0.08em",
          color: VT.inkFaint,
          fontWeight: 500
        }, children: h.toUpperCase() }, h || "go")) }) }),
        /* @__PURE__ */ jsxs2("tbody", { children: [
          loading && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => /* @__PURE__ */ jsx2("tr", { style: { borderBottom: `1px solid ${VT.lineSoft}` }, children: [60, 90, 80, 180, 90, 80, 18].map((w, j) => /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(SkeletonBlock, { width: w, height: 12 }) }, j)) }, i)),
          showItems && d.items.map((row) => /* @__PURE__ */ jsxs2(
            "tr",
            {
              onClick: () => onRowClick && onRowClick(row.id),
              tabIndex: onRowClick ? 0 : void 0,
              onKeyDown: onRowClick ? (e) => {
                if (e.key === "Enter") onRowClick(row.id);
              } : void 0,
              style: { borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? "pointer" : "default" },
              children: [
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(Mono, { children: row.id }) }),
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px", color: VT.inkSoft }, children: /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: formatTs(row.created_at) }) }),
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(Badge, { kind: "neutral", style: { padding: "2px 8px", fontSize: 11, borderRadius: 4 }, children: row.source_type }) }),
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px", color: VT.inkSoft, maxWidth: 260, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: row.source_url || "\u2014" }) }),
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 12 }, children: row.contact_value_masked }) }),
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px" }, children: /* @__PURE__ */ jsx2(StatusPill, { status: row.status }) }),
                /* @__PURE__ */ jsx2("td", { style: { padding: "12px 16px", textAlign: "right" }, children: /* @__PURE__ */ jsx2("span", { "aria-hidden": "true", style: { color: VT.inkFaint }, children: "\u2192" }) })
              ]
            },
            row.id
          ))
        ] })
      ] }),
      showEmpty && /* @__PURE__ */ jsx2(EmptyState, { title: "\u041F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0437\u0430\u044F\u0432\u043E\u043A", hint: "\u041A\u043E\u0433\u0434\u0430 \u043F\u0440\u0438\u0434\u0451\u0442 \u043F\u0435\u0440\u0432\u0430\u044F \u2014 \u043E\u043D\u0430 \u043F\u043E\u044F\u0432\u0438\u0442\u0441\u044F \u0437\u0434\u0435\u0441\u044C." }),
      !showEmpty && /* @__PURE__ */ jsxs2("div", { style: { padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12.5, color: VT.inkSoft }, children: [
        /* @__PURE__ */ jsxs2("span", { children: [
          d.offset + 1,
          "\u2013",
          Math.min(d.offset + d.limit, d.total),
          " \u0438\u0437 ",
          d.total
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 6 }, children: [
          /* @__PURE__ */ jsx2(
            Btn,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit),
              disabled: d.offset === 0 || loading,
              children: "\u2190"
            }
          ),
          /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", style: { background: VT.accentSoft, color: VT.accentInk, border: "none" }, children: currentPage }),
          /* @__PURE__ */ jsxs2(Mono, { style: { alignSelf: "center" }, children: [
            "/ ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsx2("pre", { style: { margin: 0, fontFamily: VT.font.mono, fontSize: 12.5, lineHeight: 1.55, color: VT.inkSoft }, children: lines.map((row, i) => /* @__PURE__ */ jsxs2("div", { children: [
    /* @__PURE__ */ jsx2("span", { style: { color: row[1] }, children: row[0] }),
    row[2] && /* @__PURE__ */ jsx2("span", { style: { color: row[3] }, children: row[2] })
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
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const app = d.application;
  const isPending = app && app.status === "pending";
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: "apps", onNavigate: onBack ? () => onBack() : void 0 };
  const submitReject = () => {
    if (onReject) onReject(app.id, rejectReason || void 0);
    setRejectOpen(false);
    setRejectReason("");
  };
  if (loading) {
    return /* @__PURE__ */ jsx2(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs2("div", { style: { padding: "20px 32px 40px" }, children: [
      /* @__PURE__ */ jsx2(SkeletonBlock, { width: 140, height: 14, style: { marginBottom: 14 } }),
      /* @__PURE__ */ jsx2(SkeletonBlock, { width: 320, height: 28, radius: 6, style: { marginBottom: 20 } }),
      /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
        /* @__PURE__ */ jsx2(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx2(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) }),
        /* @__PURE__ */ jsx2(Card, { style: { padding: 18 }, children: /* @__PURE__ */ jsx2(SkeletonBlock, { width: "100%", height: 200, radius: 6 }) })
      ] })
    ] }) });
  }
  return /* @__PURE__ */ jsx2(Wrap, { ...wrapProps, children: /* @__PURE__ */ jsxs2("div", { style: { padding: "20px 32px 40px" }, children: [
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx2(
        "button",
        {
          type: "button",
          onClick: () => onBack && onBack(),
          style: { color: VT.inkFaint, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit", fontSize: 13 },
          children: "\u2190 \u0417\u0430\u044F\u0432\u043A\u0438"
        }
      ),
      /* @__PURE__ */ jsx2("span", { children: "/" }),
      /* @__PURE__ */ jsx2(Mono, { style: { color: VT.ink }, children: app.id })
    ] }),
    error && /* @__PURE__ */ jsx2("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx2(ErrorBlock, { message: error }) }),
    actionError && /* @__PURE__ */ jsx2("div", { style: { marginBottom: 14 }, children: /* @__PURE__ */ jsx2(ErrorBlock, { title: "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435", message: actionError }) }),
    /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, marginBottom: 22 }, children: [
      /* @__PURE__ */ jsxs2("div", { children: [
        /* @__PURE__ */ jsx2("h1", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.025em", margin: "0 0 6px" }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B \xB7 \u043C\u0430\u043D\u0438\u043A\u044E\u0440" }),
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: VT.inkSoft, flexWrap: "wrap" }, children: [
          app.source_url && /* @__PURE__ */ jsx2("a", { href: `https://${app.source_url.replace(/^https?:\/\//, "")}`, target: "_blank", rel: "noreferrer", style: { color: VT.accent, textDecoration: "underline", textUnderlineOffset: 2 }, children: /* @__PURE__ */ jsx2(Mono, { style: { color: "inherit" }, children: app.source_url }) }),
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2("span", { children: app.contact_value_masked }),
          /* @__PURE__ */ jsx2("span", { children: "\xB7" }),
          /* @__PURE__ */ jsx2(Mono, { children: formatTs(app.created_at) }),
          /* @__PURE__ */ jsx2(StatusPill, { status: app.status }),
          app.is_manual_review && /* @__PURE__ */ jsx2(Badge, { kind: "warn", style: { fontSize: 11, padding: "2px 8px" }, children: "manual review" })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 8 }, children: isPending ? /* @__PURE__ */ jsxs2(Fragment3, { children: [
        /* @__PURE__ */ jsx2(
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
        /* @__PURE__ */ jsx2(
          Btn,
          {
            size: "sm",
            onClick: () => onApprove && onApprove(app.id),
            disabled: !!actionLoading,
            iconRight: actionLoading ? /* @__PURE__ */ jsx2(Spinner, { size: 14 }) : /* @__PURE__ */ jsx2(IconArrow, { size: 14 }),
            children: actionLoading ? "\u041E\u0434\u043E\u0431\u0440\u044F\u0435\u043C\u2026" : "\u041E\u0434\u043E\u0431\u0440\u0438\u0442\u044C"
          }
        )
      ] }) : /* @__PURE__ */ jsxs2(Badge, { kind: app.status === "approved" || app.status === "published" ? "success" : "neutral", style: { padding: "6px 12px" }, children: [
        "\u0423\u0436\u0435 ",
        STATUS_MAP[app.status]?.[2] || app.status
      ] }) })
    ] }),
    rejectOpen && /* @__PURE__ */ jsxs2(Card, { style: { padding: 16, marginBottom: 14, borderColor: "oklch(0.85 0.06 28)" }, children: [
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em", color: VT.danger }, children: "\u041F\u0420\u0418\u0427\u0418\u041D\u0410 \u041E\u0422\u041A\u0410\u0417\u0410" }),
      /* @__PURE__ */ jsx2(
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
      /* @__PURE__ */ jsxs2("div", { style: { display: "flex", gap: 8, marginTop: 10, justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ jsx2(Btn, { variant: "secondary", size: "sm", onClick: () => {
          setRejectOpen(false);
          setRejectReason("");
        }, children: "\u041E\u0442\u043C\u0435\u043D\u0430" }),
        /* @__PURE__ */ jsx2(
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
    /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }, children: [
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "SOURCE SNAPSHOT \xB7 JSON" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "raw" })
        ] }),
        /* @__PURE__ */ jsx2("div", { style: {
          background: VT.bgSoft,
          borderRadius: VT.r.sm,
          padding: 14,
          border: `1px solid ${VT.line}`,
          maxHeight: 280,
          overflow: "auto"
        }, children: /* @__PURE__ */ jsx2(JsonTree, {}) })
      ] }),
      /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }, children: [
          /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "GENERATED CONTENT" }),
          /* @__PURE__ */ jsx2(Badge, { kind: "success", style: { padding: "2px 8px", fontSize: 10.5, borderRadius: 4 }, children: "\u2713 sanitized" }),
          /* @__PURE__ */ jsx2(Btn, { variant: "ghost", size: "sm", style: { marginLeft: "auto" }, children: "\u2197 preview" })
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { background: VT.bgSoft, borderRadius: VT.r.sm, padding: 14, border: `1px solid ${VT.line}` }, children: [
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 11, color: VT.accent, letterSpacing: "0.1em", marginBottom: 6 }, children: "\u041C\u0410\u041D\u0418\u041A\u042E\u0420 \xB7 \u041F\u0415\u0422\u0420\u041E\u0417\u0410\u0412\u041E\u0414\u0421\u041A" }),
          /* @__PURE__ */ jsx2("div", { style: { fontWeight: 700, fontSize: 20, lineHeight: 1.15, marginBottom: 8 }, children: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B" }),
          /* @__PURE__ */ jsx2("div", { style: { fontSize: 13, lineHeight: 1.5, color: VT.inkSoft }, children: "\u0420\u0430\u0431\u043E\u0442\u0430\u044E \u0441 2017 \u0433\u043E\u0434\u0430, \u043F\u0440\u043E\u0448\u043B\u0430 \u043A\u0443\u0440\u0441\u044B \u0432 [SCHOOL]. \u041F\u0440\u0438\u043D\u0438\u043C\u0430\u044E \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0438\u0435\u043D\u0442\u0430 \u0432 \u0447\u0430\u0441 \u2014 \u0431\u0435\u0437 \u0441\u043F\u0435\u0448\u043A\u0438, \u0441 \u0447\u0430\u0448\u043A\u043E\u0439 \u043A\u043E\u0444\u0435." }),
          /* @__PURE__ */ jsx2("div", { style: { display: "flex", gap: 6, marginTop: 12 }, children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsx2("div", { "aria-hidden": "true", style: { flex: 1, aspectRatio: "1/1", borderRadius: 6, background: `repeating-linear-gradient(${30 + i * 22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` } }, i)) }),
          /* @__PURE__ */ jsx2("div", { style: { fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }, children: "\u2248 320 \u0442\u043E\u043A\u0435\u043D\u043E\u0432 \xB7 \u2248 12 \u20BD \xB7 \u043C\u043E\u0434\u0435\u043B\u044C: YandexGPT 5 Pro" })
        ] })
      ] })
    ] }),
    (d.user || d.consent) && /* @__PURE__ */ jsxs2("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }, children: [
      d.user && /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "USER" }),
        /* @__PURE__ */ jsxs2("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041A\u043E\u043D\u0442\u0430\u043A\u0442" }),
            /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13, color: VT.ink }, children: d.user.contact_value_masked })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0422\u0430\u0440\u0438\u0444" }),
            /* @__PURE__ */ jsx2(
              Badge,
              {
                kind: d.user.plan === "pro" ? "success" : d.user.plan === "trial" ? "info" : "neutral",
                style: { padding: "2px 9px", fontSize: 11.5 },
                children: d.user.plan
              }
            )
          ] }),
          d.user.plan_until && /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0410\u043A\u0442\u0438\u0432\u0435\u043D \u0434\u043E" }),
            /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13 }, children: d.user.plan_until })
          ] })
        ] })
      ] }),
      d.consent && /* @__PURE__ */ jsxs2(Card, { style: { padding: 18 }, children: [
        /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "CONSENT" }),
        /* @__PURE__ */ jsxs2("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u0412\u0435\u0440\u0441\u0438\u044F \u043F\u043E\u043B\u0438\u0442\u0438\u043A\u0438" }),
            /* @__PURE__ */ jsxs2(Mono, { style: { fontSize: 13 }, children: [
              "v",
              d.consent.policy_version
            ] })
          ] }),
          /* @__PURE__ */ jsxs2("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx2("span", { style: { fontSize: 13, color: VT.inkSoft }, children: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u043E" }),
            /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 13 }, children: formatTs(d.consent.created_at) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2(Card, { style: { marginTop: 14, padding: 18 }, children: [
      /* @__PURE__ */ jsx2(Mono, { style: { fontSize: 10.5, letterSpacing: "0.1em" }, children: "AUDIT LOG" }),
      /* @__PURE__ */ jsxs2("div", { style: { marginTop: 10, fontSize: 13, fontFamily: VT.font.mono, color: VT.inkSoft, lineHeight: 1.7 }, children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:18" }),
          " \xB7 application.submitted \xB7 ip 195.***.***.42"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:19" }),
          " \xB7 parser.tg.start \xB7 @studia_anna"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:34" }),
          " \xB7 parser.tg.ok \xB7 posts=47 photos=12"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:22:35" }),
          " \xB7 llm.generate.start \xB7 model=yandexgpt-5-pro"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:23:02" }),
          " \xB7 llm.generate.ok \xB7 tokens=320 cost_rub=12.40"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
          " \xB7 sanitize.ok \xB7 bleach.clean allowlist=v1"
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { style: { color: VT.inkFaint }, children: "14:23:03" }),
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
export {
  AdminChrome,
  AdminDashboard,
  AdminLogin,
  AppDetail,
  AppsList,
  EmptyState,
  ErrorBlock,
  FilterChip,
  RateLimitCountdown,
  S10_AdminLogin,
  S11_Dashboard,
  S12_AppsList,
  S13_AppDetail,
  SkeletonBlock,
  StatTile,
  StatusPill,
  TrendChart
};
//# sourceMappingURL=index.js.map