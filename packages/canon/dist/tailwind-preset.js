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

// src/tailwind-preset.ts
var preset = {
  theme: {
    extend: {
      colors: {
        accent: tokens.color.accent,
        "accent-soft": tokens.color.accentSoft,
        "accent-ink": tokens.color.accentInk,
        "accent-hover": tokens.color.accentHover,
        ink: { DEFAULT: tokens.color.ink, soft: tokens.color.inkSoft, faint: tokens.color.inkFaint, muted: tokens.color.inkMuted },
        line: { DEFAULT: tokens.color.line, soft: tokens.color.lineSoft },
        cream: tokens.color.bg,
        "cream-soft": tokens.color.bgSoft,
        success: { DEFAULT: tokens.color.success, soft: tokens.color.successSoft },
        info: { DEFAULT: tokens.color.info, soft: tokens.color.infoSoft },
        warn: { DEFAULT: tokens.color.warn, soft: tokens.color.warnSoft },
        danger: { DEFAULT: tokens.color.danger, soft: tokens.color.dangerSoft }
      },
      fontFamily: {
        sans: tokens.font.sans.split(",").map((s) => s.trim()),
        mono: tokens.font.mono.split(",").map((s) => s.trim())
      },
      borderRadius: {
        sm: `${tokens.radius.sm}px`,
        md: `${tokens.radius.md}px`,
        lg: `${tokens.radius.lg}px`,
        xl: `${tokens.radius.xl}px`,
        "2xl": `${tokens.radius["2xl"]}px`
      },
      boxShadow: { card: tokens.shadow.card, pop: tokens.shadow.pop }
    }
  }
};
var tailwind_preset_default = preset;
export {
  tailwind_preset_default as default
};
//# sourceMappingURL=tailwind-preset.js.map