// @samosite/canon · Tailwind preset
import { tokens } from './tokens';

const preset = {
  theme: {
    extend: {
      colors: {
        accent: tokens.color.accent,
        'accent-soft': tokens.color.accentSoft,
        'accent-ink': tokens.color.accentInk,
        'accent-hover': tokens.color.accentHover,
        ink: { DEFAULT: tokens.color.ink, soft: tokens.color.inkSoft, faint: tokens.color.inkFaint, muted: tokens.color.inkMuted },
        line: { DEFAULT: tokens.color.line, soft: tokens.color.lineSoft },
        cream: tokens.color.bg,
        'cream-soft': tokens.color.bgSoft,
        success: { DEFAULT: tokens.color.success, soft: tokens.color.successSoft },
        info:    { DEFAULT: tokens.color.info,    soft: tokens.color.infoSoft },
        warn:    { DEFAULT: tokens.color.warn,    soft: tokens.color.warnSoft },
        danger:  { DEFAULT: tokens.color.danger,  soft: tokens.color.dangerSoft },
      },
      fontFamily: {
        sans: tokens.font.sans.split(',').map(s => s.trim()),
        mono: tokens.font.mono.split(',').map(s => s.trim()),
      },
      borderRadius: {
        sm: `${tokens.radius.sm}px`, md: `${tokens.radius.md}px`,
        lg: `${tokens.radius.lg}px`, xl: `${tokens.radius.xl}px`,
        '2xl': `${tokens.radius['2xl']}px`,
      },
      boxShadow: { card: tokens.shadow.card, pop: tokens.shadow.pop },
    },
  },
};

export default preset;
