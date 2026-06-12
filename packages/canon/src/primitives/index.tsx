'use client';
import React from 'react';
import { VT, BRAND } from '../tokens';

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
      color: VT.accent, fontWeight: 500,
      padding: '6px 12px', background: VT.accentSoft,
      borderRadius: VT.r.sm,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: VT.accent }} />
      {children}
    </div>
  );
}

export function Mono({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <span style={{ fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, ...style }}>{children}</span>;
}

export function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.lg, ...style }}>
      {children}
    </div>
  );
}

export function Btn(props: {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'soft';
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
} & Record<`data-${string}`, string | undefined>) {
  const { children, variant = 'primary', size = 'md', style, icon, iconRight, onClick, type, disabled, ...rest } = props;
  const isSm = size === 'sm';
  const base: React.CSSProperties = {
    fontFamily: VT.font.sans, fontWeight: 600,
    fontSize: isSm ? 13 : 15,
    padding: isSm ? '8px 14px' : '12px 22px',
    borderRadius: VT.r.pill,
    border: 'none', cursor: disabled ? 'default' : 'pointer',
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    whiteSpace: 'nowrap', transition: 'background .15s', opacity: disabled ? 0.5 : 1,
  };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: VT.accent, color: VT.white },
    secondary: { background: VT.white, color: VT.ink, border: `1px solid ${VT.line}` },
    ghost: { background: 'transparent', color: VT.ink },
    soft: { background: VT.accentSoft, color: VT.accentInk },
  };
  return (
    <button {...rest} type={type ?? 'button'} onClick={onClick} disabled={disabled} data-ss-cta style={{ ...base, ...variants[variant], ...style }}>
      {icon}{children}{iconRight}
    </button>
  );
}

export function Input({ placeholder, value, icon, style }: { placeholder?: string; value?: string; icon?: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
      background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md,
      fontSize: 15, color: value ? VT.ink : VT.inkFaint, ...style,
    }}>
      {icon}
      <span style={{ flex: 1, fontFamily: value && /^[a-z0-9_./:@\-]+$/i.test(String(value)) ? VT.font.mono : VT.font.sans }}>
        {value || placeholder}
      </span>
    </div>
  );
}

export function Badge({ kind = 'success', children, style }: {
  kind?: 'success' | 'info' | 'warn' | 'danger' | 'neutral' | 'loading';
  children: React.ReactNode; style?: React.CSSProperties;
}) {
  const map: Record<string, { bg: string; fg: string; dot: string }> = {
    success: { bg: VT.successSoft, fg: 'oklch(0.32 0.11 145)', dot: VT.success },
    info:    { bg: VT.infoSoft,    fg: 'oklch(0.38 0.10 240)', dot: VT.info },
    warn:    { bg: VT.warnSoft,    fg: 'oklch(0.40 0.12 70)',  dot: VT.warn },
    danger:  { bg: VT.dangerSoft,  fg: 'oklch(0.42 0.15 28)',  dot: VT.danger },
    neutral: { bg: VT.bgSoft,      fg: VT.inkSoft,             dot: VT.inkMuted },
    loading: { bg: VT.bgSoft,      fg: VT.inkSoft,             dot: VT.inkMuted },
  };
  const c = map[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: VT.r.pill, background: c.bg, color: c.fg,
      fontSize: 14, fontWeight: 500, ...style,
    }}>{children}</span>
  );
}

export function Checkbox({ checked = false, label, link }: { checked?: boolean; label?: React.ReactNode; link?: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 13.5, color: VT.inkSoft, lineHeight: 1.45, cursor: 'pointer' }}>
      <span style={{
        flex: '0 0 auto', width: 18, height: 18, borderRadius: 5,
        border: `1.5px solid ${checked ? VT.accent : VT.line}`,
        background: checked ? VT.accent : VT.white,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
      }}>
        {checked && (
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3}>
            <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      <span>{label}{link && <> <a style={{ color: VT.accent, textDecoration: 'underline' }}>{link}</a></>}</span>
    </label>
  );
}

export function IconLink() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={VT.inkFaint} strokeWidth={1.8} strokeLinecap="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5"/>
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19"/>
    </svg>
  );
}

export function IconArrow({ size = 18 }: { size?: number }) {
  return <span style={{ fontSize: size, lineHeight: 1 }}>→</span>;
}

export function Spinner({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ animation: 'vt-spin 0.9s linear infinite' }}>
      <circle cx={12} cy={12} r={9} fill="none" stroke="currentColor" strokeWidth={2.5} strokeDasharray="40 20" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = 26 }: { size?: number }) {
  const s = size;
  return (
    <span aria-label={BRAND.name} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: s, height: s, flex: '0 0 auto',
      borderRadius: Math.round(s * 0.27),
      background: VT.accent, color: '#fff',
      fontFamily: 'Onest, system-ui, sans-serif',
      fontWeight: 800, fontSize: Math.round(s * 0.66),
      letterSpacing: '-0.04em', lineHeight: 1,
      paddingBottom: Math.max(1, Math.round(s * 0.04)),
    }}>С</span>
  );
}

export function BrandMark({ size = 22, fontSize, color }: { size?: number; fontSize?: number; color?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: fontSize || 20, letterSpacing: '-0.02em', color: color || VT.ink }}>
      <Logo size={size} />
      {BRAND.name}
    </span>
  );
}
