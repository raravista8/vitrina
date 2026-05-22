// Vitrina · Design tokens — Concept A "Тёплая бумага" (canonical)
// Single source of truth for all 19 screens.

if (!window.__vt_tokens) { window.__vt_tokens = true; (function vtTokens(){

const TOKENS = {
  // Surfaces
  bg:        'oklch(0.972 0.012 80)',   // cream — page background
  bgSoft:    'oklch(0.945 0.014 75)',   // softer cream for chips/inputs
  white:     '#ffffff',                  // cards

  // Ink
  ink:       'oklch(0.215 0.018 60)',   // warm near-black — h1, body
  inkSoft:   'oklch(0.42 0.020 60)',    // sub, body-on-card
  inkFaint:  'oklch(0.56 0.020 60)',    // microcopy, placeholder
  inkMuted:  'oklch(0.68 0.016 60)',    // disabled

  // Lines
  line:      'oklch(0.88 0.012 70)',    // 1px dividers, card borders
  lineSoft:  'oklch(0.93 0.010 70)',

  // Accent — terracotta (primary action)
  accent:       'oklch(0.605 0.155 35)',
  accentHover:  'oklch(0.54 0.16 35)',
  accentSoft:   'oklch(0.92 0.045 40)',   // pale peach for chip bg / highlight
  accentInk:    'oklch(0.42 0.14 35)',    // for text on accentSoft

  // Semantic
  success:      'oklch(0.58 0.13 145)',   // detection ✓
  successSoft:  'oklch(0.93 0.05 145)',
  info:         'oklch(0.62 0.10 240)',   // waitlist ℹ️
  infoSoft:     'oklch(0.93 0.035 240)',
  warn:         'oklch(0.66 0.14 70)',    // unknown ⚠️
  warnSoft:     'oklch(0.94 0.06 80)',
  danger:       'oklch(0.55 0.18 28)',
  dangerSoft:   'oklch(0.93 0.055 28)',

  // Radii (tailwind-ish)
  r:    { sm: 6, md: 10, lg: 14, xl: 18, pill: 999 },
  // Shadows
  shadow: {
    card: '0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)',
    pop:  '0 18px 40px -16px rgba(120,60,30,0.25)',
  },
  // Type
  font: {
    sans: "Onest, system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },
};

// ── Primitive UI helpers (concept-A styled) ──────────────────
// Mini "shadcn-shaped" components for the design canvas. The real
// production .tsx files in /code use actual shadcn/ui imports.

function Eyebrow({ children }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: TOKENS.font.mono, fontSize: 11, letterSpacing: '0.12em',
      color: TOKENS.accent, fontWeight: 500,
      padding: '6px 12px', background: TOKENS.accentSoft,
      borderRadius: TOKENS.r.sm,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: TOKENS.accent }} />
      {children}
    </div>
  );
}

function Mono({ children, style }) {
  return <span style={{ fontFamily: TOKENS.font.mono, fontSize: 12, color: TOKENS.inkFaint, ...style }}>{children}</span>;
}

function Card({ children, style }) {
  return (
    <div style={{
      background: TOKENS.white,
      border: `1px solid ${TOKENS.line}`,
      borderRadius: TOKENS.r.lg,
      ...style,
    }}>{children}</div>
  );
}

function Btn({ children, variant = 'primary', size = 'md', style, icon, iconRight }) {
  const isSm = size === 'sm';
  const base = {
    fontFamily: TOKENS.font.sans, fontWeight: 600,
    fontSize: isSm ? 13 : 15,
    padding: isSm ? '8px 14px' : '12px 22px',
    borderRadius: TOKENS.r.pill,
    border: 'none', cursor: 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    whiteSpace: 'nowrap',
    transition: 'background .15s',
  };
  const variants = {
    primary: { background: TOKENS.accent, color: TOKENS.white },
    secondary: { background: TOKENS.white, color: TOKENS.ink, border: `1px solid ${TOKENS.line}` },
    ghost: { background: 'transparent', color: TOKENS.ink },
    soft: { background: TOKENS.accentSoft, color: TOKENS.accentInk },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...style }}>
      {icon}
      {children}
      {iconRight}
    </button>
  );
}

function Input({ placeholder, value, icon, style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '12px 16px',
      background: TOKENS.white,
      border: `1px solid ${TOKENS.line}`,
      borderRadius: TOKENS.r.md,
      fontSize: 15, color: value ? TOKENS.ink : TOKENS.inkFaint,
      ...style,
    }}>
      {icon}
      <span style={{ flex: 1, fontFamily: value && /^[a-z0-9_./:@\-]+$/i.test(String(value)) ? TOKENS.font.mono : TOKENS.font.sans }}>
        {value || placeholder}
      </span>
    </div>
  );
}

function Badge({ kind = 'success', children, style }) {
  const map = {
    success: { bg: TOKENS.successSoft, fg: 'oklch(0.32 0.11 145)', dot: TOKENS.success },
    info:    { bg: TOKENS.infoSoft,    fg: 'oklch(0.38 0.10 240)', dot: TOKENS.info },
    warn:    { bg: TOKENS.warnSoft,    fg: 'oklch(0.40 0.12 70)',  dot: TOKENS.warn },
    danger:  { bg: TOKENS.dangerSoft,  fg: 'oklch(0.42 0.15 28)',  dot: TOKENS.danger },
    neutral: { bg: TOKENS.bgSoft,      fg: TOKENS.inkSoft,          dot: TOKENS.inkMuted },
    loading: { bg: TOKENS.bgSoft,      fg: TOKENS.inkSoft,          dot: TOKENS.inkMuted },
  };
  const c = map[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: TOKENS.r.pill,
      background: c.bg, color: c.fg,
      fontSize: 14, fontWeight: 500,
      ...style,
    }}>{children}</span>
  );
}

function Checkbox({ checked = false, label, link }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: TOKENS.inkSoft, lineHeight: 1.45, cursor: 'pointer' }}>
      <span style={{
        flex: '0 0 auto', width: 18, height: 18, borderRadius: 5,
        border: `1.5px solid ${checked ? TOKENS.accent : TOKENS.line}`,
        background: checked ? TOKENS.accent : TOKENS.white,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        marginTop: 1,
      }}>
        {checked && (
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>
        )}
      </span>
      <span>
        {label}
        {link && <> <a style={{ color: TOKENS.accent, textDecoration: 'underline' }}>{link}</a></>}
      </span>
    </label>
  );
}

function IconLink() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TOKENS.inkFaint} strokeWidth="1.8" strokeLinecap="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5"/>
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19"/>
    </svg>
  );
}

function IconArrow({ size = 18 }) {
  return <span style={{ fontSize: size, lineHeight: 1 }}>→</span>;
}

function Spinner({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: 'vt-spin 0.9s linear infinite' }}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="40 20" strokeLinecap="round" />
    </svg>
  );
}

// spinner keyframes
if (typeof document !== 'undefined' && !document.getElementById('vt-anim')) {
  const s = document.createElement('style'); s.id = 'vt-anim';
  s.textContent = '@keyframes vt-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}

// ── Brand ─────────────────────────────────────────
const BRAND = {
  name: 'Самосайт',
  domain: 'samosite.online',
  bot: '@SamositeIntakeBot',
  contactBot: '@SamositeBot',
};

// Logo: rounded terracotta square with a clean bold "С" letterform
// (Cyrillic initial of Самосайт, rendered as actual Onest type — robust at every size).
function Logo({ size = 26 }) {
  const s = size;
  return (
    <span aria-label="Самосайт" style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: s, height: s, flex: '0 0 auto',
      borderRadius: Math.round(s * 0.27),
      background: TOKENS.accent,
      color: '#fff',
      fontFamily: "Onest, system-ui, sans-serif",
      fontWeight: 800,
      fontSize: Math.round(s * 0.66),
      letterSpacing: '-0.04em',
      lineHeight: 1,
      // optical centering — Cyrillic С leans slightly above the baseline
      paddingBottom: Math.max(1, Math.round(s * 0.04)),
    }}>С</span>
  );
}

function BrandMark({ size = 22, fontSize, color, bgColor }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: fontSize || 20, letterSpacing: '-0.02em', color: color || TOKENS.ink }}>
      <Logo size={size} bgColor={bgColor} />
      {BRAND.name}
    </span>
  );
}

Object.assign(window, { VT: TOKENS, BRAND, Logo, BrandMark, Eyebrow, Mono, Card, Btn, Input, Badge, Checkbox, IconLink, IconArrow, Spinner });

})(); } // end __vt_tokens guard
