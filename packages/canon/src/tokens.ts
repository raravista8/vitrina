// @samosite/canon · tokens
// Single source of truth. Mirrors canon/tokens.jsx structure but as plain TS object.

export const VT = {
  // Surfaces
  bg:        'oklch(0.972 0.012 80)',
  bgSoft:    'oklch(0.945 0.014 75)',
  white:     '#ffffff',

  // Ink
  ink:       'oklch(0.215 0.018 60)',
  inkSoft:   'oklch(0.42 0.020 60)',
  inkFaint:  'oklch(0.56 0.020 60)',
  inkMuted:  'oklch(0.68 0.016 60)',

  // Lines
  line:      'oklch(0.88 0.012 70)',
  lineSoft:  'oklch(0.93 0.010 70)',

  // Accent — terracotta
  accent:       'oklch(0.605 0.155 35)',
  accentHover:  'oklch(0.54 0.16 35)',
  accentSoft:   'oklch(0.92 0.045 40)',
  accentInk:    'oklch(0.42 0.14 35)',

  // Semantic
  success:      'oklch(0.58 0.13 145)',
  successSoft:  'oklch(0.93 0.05 145)',
  info:         'oklch(0.62 0.10 240)',
  infoSoft:     'oklch(0.93 0.035 240)',
  warn:         'oklch(0.66 0.14 70)',
  warnSoft:     'oklch(0.94 0.06 80)',
  danger:       'oklch(0.55 0.18 28)',
  dangerSoft:   'oklch(0.93 0.055 28)',

  r:    { sm: 6, md: 10, lg: 14, xl: 18, pill: 999 },
  shadow: {
    card: '0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)',
    pop:  '0 18px 40px -16px rgba(120,60,30,0.25)',
  },
  font: {
    sans: "Onest, system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
} as const;

export const BRAND = {
  name: 'Самосайт',
  domain: 'samosite.online',
  bot: '@SamositeIntakeBot',
  contactBot: '@SamositeBot',
} as const;

// Per CANON_PACKAGE_TZ §2.3 — flat token shape for tailwind-preset & external use
export const tokens = {
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
    dangerSoft: VT.dangerSoft,
  },
  font: VT.font,
  shadow: VT.shadow,
  radius: { sm: 10, md: 14, lg: 18, xl: 22, '2xl': 28, full: 999 },
} as const;

export type Tokens = typeof tokens;
