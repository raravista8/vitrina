'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · landing v3 — 11 blocks · canon 0.6.0
// Single-file port of landing-v3-{a,b,c,d}.jsx + landing-v3.jsx from the canvas project.
// See docs/COPY.md for canonical messaging and CHANGELOG 0.6.0 for what changed.

import React from 'react';
import { VT, BRAND } from '../tokens';
import { Btn, IconArrow, IconLink, BrandMark } from '../primitives';
import {
  PresetRenderer, MiniChrome as PresetMiniChrome, samplePresets,
  type Preset, type SlotContent, type Theme,
} from '../presets';

// ── from landing-v3-a.jsx ──
// ───────── helpers ─────────

function sectionPad(mobile) {
  const v = mobile ? 20 : 80;
  return { paddingLeft: v, paddingRight: v, boxSizing: 'border-box' };
}

function Eyebrow({ children, mobile, kind = 'accent' }) {
  const palette = kind === 'accent'
    ? { bg: VT.accentSoft, fg: VT.accent, dot: VT.accent }
    : { bg: VT.bgSoft, fg: VT.inkSoft, dot: VT.inkFaint };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: VT.font.mono, fontSize: mobile ? 10.5 : 11.5, letterSpacing: '0.14em',
      color: palette.fg, fontWeight: 500,
      padding: '6px 12px', background: palette.bg, borderRadius: 6,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.dot }} />
      {children}
    </div>
  );
}

function H2({ children, mobile, align = 'center' }) {
  return (
    <h2 style={{
      fontSize: mobile ? 30 : 52,
      lineHeight: mobile ? 1.1 : 1.05,
      fontWeight: 700, letterSpacing: '-0.03em',
      margin: '14px 0 0', textWrap: 'balance', textAlign: align,
    }}>{children}</h2>
  );
}

function Sub({ children, mobile, align = 'center', maxWidth = 720 }) {
  return (
    <p style={{
      fontSize: mobile ? 16 : 19, lineHeight: 1.45,
      color: VT.inkSoft, margin: '14px auto 0',
      maxWidth: mobile ? '100%' : maxWidth, textWrap: 'pretty',
      textAlign: align,
    }}>{children}</p>
  );
}

// ───────── BLOCK 1 · HERO ─────────

const SOURCE_ICONS = [
  { id: 'yandex', name: 'Яндекс.Карты',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z" fill="#FC3F1D"/><circle cx="12" cy="10" r="3.2" fill="#fff"/></svg> },
  { id: 'tg', name: 'Telegram',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#229ED9"/><path d="M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z" fill="#fff"/></svg> },
  { id: '2gis', name: '2ГИС',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#19BB4F"/><text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="14" fill="#fff">2</text></svg> },
  { id: 'avito', name: 'Avito',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#0AF"/><circle cx="18" cy="7.5" r="3" fill="#FF9C00"/><text x="9" y="17" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="10" fill="#fff">A</text></svg> },
  { id: 'ig', name: 'Instagram',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><defs><linearGradient id="iggr3a" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#FEDA77"/><stop offset="30%" stopColor="#F58529"/><stop offset="60%" stopColor="#DD2A7B"/><stop offset="100%" stopColor="#8134AF"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#iggr3a)"/><rect x="6" y="6" width="12" height="12" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="16" cy="8" r="0.9" fill="#fff"/></svg> },
  { id: 'site', name: 'старый сайт',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="oklch(0.40 0.04 250)"/><circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.8" ry="6" fill="none" stroke="#fff" strokeWidth="1.5"/><path d="M6 12h12" stroke="#fff" strokeWidth="1.5"/></svg> },
  { id: 'card', name: 'фото меню или буклета',
    icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="oklch(0.74 0.08 70)"/><rect x="6" y="8" width="12" height="9" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.4"/><path d="M8 11.5h4M8 14h6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg> },
];

function HeroBlock({ mobile }) {
  return (
    <section id="hero" style={{ ...sectionPad(mobile), paddingTop: mobile ? 28 : 56, position: 'relative', zIndex: 1 }}>
      <div style={{
        maxWidth: mobile ? '100%' : 1120, margin: '0 auto',
        textAlign: mobile ? 'left' : 'center',
      }}>
        <h1 style={{
          fontSize: mobile ? 'clamp(32px, 8.8vw, 44px)' : 76,
          lineHeight: mobile ? 1.06 : 1.04,
          fontWeight: 700, letterSpacing: '-0.035em',
          margin: 0,
          textWrap: 'balance',
        }}>
          Соберём за{' '}
          <span style={{ position: 'relative', color: VT.accent, whiteSpace: 'nowrap' }}>
            2 часа
            {!mobile && <span aria-hidden="true" style={{
              position: 'absolute', left: 2, right: 6, bottom: 6, height: 14,
              background: VT.accentSoft, opacity: 0.7, zIndex: -1, borderRadius: 3,
            }} />}
          </span>{' '}
          сайт, который ловит заявки.<br/>Дальше&nbsp;он <span style={{ color: VT.accent }}>сам становится лучше</span> каждую неделю.
        </h1>

        <p style={{
          fontSize: mobile ? 16.5 : 20, lineHeight: 1.5, color: VT.inkSoft,
          margin: mobile ? '20px 0 0' : '28px auto 0',
          maxWidth: mobile ? '100%' : 860, textWrap: 'pretty',
        }}>
          Покажите Самосайту, где вы ведёте дела: Яндекс.Карты, Telegram, 2ГИС, Avito или Instagram. Если ничего нет, сфотографируйте меню или буклет.
        </p>
        <p style={{
          fontSize: mobile ? 16.5 : 20, lineHeight: 1.5, color: VT.inkSoft,
          margin: mobile ? '10px 0 0' : '12px auto 0',
          maxWidth: mobile ? '100%' : 860, textWrap: 'pretty',
        }}>
          Самосайт соберёт сайт со всеми услугами, ценами, отзывами и фото. Тексты напишет сам. Когда придут первые посетители, начнёт подсказывать, что поправить ради новых заявок.
        </p>

        <div className="ss-hero-pill" style={{
          marginTop: mobile ? 22 : 32,
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 10 : 8,
          maxWidth: mobile ? '100%' : 680,
          marginLeft: mobile ? 0 : 'auto', marginRight: mobile ? 0 : 'auto',
          background: VT.white,
          padding: mobile ? 10 : 8,
          borderRadius: mobile ? 14 : 999,
          border: `1px solid ${VT.line}`,
          boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)',
          alignItems: mobile ? 'stretch' : 'center',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: 10,
            padding: mobile ? '12px 14px' : '0 18px', minWidth: 0,
          }}>
            <IconLink />
            <span style={{
              color: VT.inkFaint, fontSize: mobile ? 15 : 16,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>Вставьте ссылку или загрузите фото</span>
          </div>
          <Btn style={{
            padding: mobile ? '14px 20px' : '14px 26px',
            borderRadius: mobile ? 10 : 999,
          }} iconRight={<IconArrow />}>
            Собрать сайт за 2 часа
          </Btn>
        </div>

        <div style={{
          marginTop: mobile ? 10 : 12,
          textAlign: mobile ? 'left' : 'center',
          fontFamily: VT.font.mono, fontSize: mobile ? 11.5 : 12.5,
          letterSpacing: '0.03em', color: VT.inkSoft, lineHeight: 1.45,
        }}>
          Тариф «Старт» — бесплатно навсегда. Платные <b style={{ color: VT.accent }}>от 690 ₽/мес</b> · первый месяц на платном бесплатно, карту привязывать не надо
        </div>

        <div style={{
          marginTop: mobile ? 14 : 18,
          textAlign: mobile ? 'left' : 'center',
        }}>
          <a href="#examples" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: VT.inkSoft, fontSize: mobile ? 14 : 15,
            textDecoration: 'underline', textUnderlineOffset: 4,
            textDecorationColor: VT.line,
          }}>
            Сначала посмотреть примеры
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div style={{
          marginTop: mobile ? 22 : 36,
          display: 'flex', flexDirection: 'column', gap: 10,
          alignItems: mobile ? 'flex-start' : 'center',
        }}>
          <div style={{
            fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
            color: VT.inkFaint, fontWeight: 600,
          }}>СОБИРАЕМ ИЗ</div>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            justifyContent: mobile ? 'flex-start' : 'center',
          }}>
            {SOURCE_ICONS.map(s => (
              <span key={s.id} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '5px 14px 5px 5px',
                background: VT.white, border: `1px solid ${VT.line}`,
                borderRadius: 999,
                fontSize: 13, color: VT.ink, fontWeight: 500,
              }}>
                {s.icon}
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ───────── BLOCK 2 · EXAMPLES ─────────

function Star({ filled = true, size = 10 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20"
         fill={filled ? '#f4a93b' : 'none'} stroke={filled ? '#f4a93b' : '#ccc'}
         strokeWidth="1.5" strokeLinejoin="round">
      <path d="M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z"/>
    </svg>
  );
}

function PhotoFill({ tone = 'peach', src, style }: any) {
  const tones: Record<string, [string, string, string]> = {
    peach: ['oklch(0.84 0.07 50)', 'oklch(0.62 0.09 35)', 'oklch(0.46 0.07 30)'],
    sage:  ['oklch(0.82 0.06 145)', 'oklch(0.58 0.08 145)', 'oklch(0.38 0.06 145)'],
    slate: ['oklch(0.80 0.04 240)', 'oklch(0.55 0.06 240)', 'oklch(0.35 0.04 240)'],
    warm:  ['oklch(0.88 0.05 70)', 'oklch(0.70 0.10 50)', 'oklch(0.48 0.10 35)'],
  };
  const [c1, c2, c3] = tones[tone] || tones.peach;
  // Always render the colored gradient as background; if src exists, layer the
  // photo on top and remove it on error so the gradient remains visible.
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: `radial-gradient(120% 80% at 30% 20%, ${c1} 0%, transparent 55%), radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%), linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
      ...style,
    }}>
      {src && <img src={src} alt="" loading="lazy"
        onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center', display: 'block',
        }} />}
    </div>
  );
}

// ───────── BLOCK 2 · EXAMPLES — Soft Bento 2026 ─────────
//
// Three client-site mockups. One unified system: cream surface, white bento
// cards, warm diffuse shadows, single Geist family, conversational headlines.
// Only ACCENT + content change per site. Hero composition differs per niche
// (stacked / photo-status / photo-strip) so the three don't read as clones.

const EX_T = {
  bg: '#FAF8F3',
  card: '#FFFFFF',
  cardLine: 'rgba(0,0,0,0.06)',
  ink: '#1A1612',
  inkSoft: '#6B6359',
  inkFaint: '#9B9388',
  font: "'Geist', 'Inter', system-ui, -apple-system, sans-serif",
  radiusLg: 24,
  radiusMd: 20,
  radiusSm: 16,
  radiusBtn: 12,
  radiusChip: 100,
  shadowSm: '0 1px 2px rgba(60,30,15,0.04)',
  shadowCta: '0 4px 12px rgba(60,30,15,0.10)',
};

function MiniChrome({ host, children }: any) {
  return (
    <div style={{
      overflow: 'hidden', borderRadius: 10,
      border: `1px solid ${VT.line}`,
      display: 'flex', flexDirection: 'column', width: '100%', height: '100%',
      minWidth: 0, background: EX_T.bg, fontFamily: EX_T.font,
      color: EX_T.ink, fontVariantNumeric: 'tabular-nums',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 10px', background: '#fff',
        borderBottom: `1px solid ${VT.line}`, flex: '0 0 auto',
      }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e3decf' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e3decf' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e3decf' }} />
        <span style={{
          marginLeft: 10, fontSize: 10, fontWeight: 500,
          color: EX_T.inkFaint,
        }}>{host}.{BRAND.domain}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

function EX_Chip({ accent, accentSoft, children }: any) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px', borderRadius: EX_T.radiusChip,
      background: accentSoft, color: accent,
      fontSize: 11, fontWeight: 500, letterSpacing: '-0.005em',
      lineHeight: 1.2, maxWidth: '100%',
      overflow: 'hidden', whiteSpace: 'nowrap',
      textOverflow: 'ellipsis', minWidth: 0,
    }}>{children}</span>
  );
}

function EX_Card({ children, style, tinted, accentSoft }: any) {
  return (
    <div style={{
      background: tinted ? accentSoft : EX_T.card,
      borderRadius: EX_T.radiusMd,
      boxShadow: tinted ? 'none' : EX_T.shadowSm,
      padding: 16,
      ...style,
    }}>{children}</div>
  );
}

function EX_CTA({ accent, color = '#fff', children }: any) {
  return (
    <div style={{
      width: '100%', textAlign: 'center',
      padding: '12px 14px', borderRadius: EX_T.radiusBtn,
      background: accent, color,
      fontSize: 14, fontWeight: 600, letterSpacing: '-0.005em',
      boxShadow: EX_T.shadowCta,
    }}>{children}</div>
  );
}

function EX_CTAGhost({ children, color = EX_T.ink }: any) {
  return (
    <div style={{
      width: '100%', textAlign: 'center',
      padding: '11px 14px', borderRadius: EX_T.radiusBtn,
      background: 'transparent', color,
      fontSize: 14, fontWeight: 500, letterSpacing: '-0.005em',
      border: `1px solid ${EX_T.cardLine}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
    }}>{children}</div>
  );
}

function EX_PhoneIcon({ size = 14, color = EX_T.ink }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function EX_PinIcon({ size = 14, color = EX_T.inkSoft }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function EX_ClockIcon({ size = 14, color = EX_T.inkSoft }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function EX_StarRow({ count = 5, color, size = 11 }: any) {
  return (
    <div style={{ display: 'inline-flex', gap: 1 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function EX_Avatar({ accent, accentSoft, size = 32, src, initial }: any) {
  if (src) {
    return (
      <PhotoFill tone="peach" src={src} style={{
        width: size, height: size, borderRadius: '50%', flex: '0 0 auto',
      }} />
    );
  }
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flex: '0 0 auto',
      background: accentSoft, color: accent,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.42, fontWeight: 600,
    }}>{initial}</span>
  );
}

function EX_MiniHeader({ name, accent }: any) {
  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 5,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 10, padding: '10px 14px',
      background: 'rgba(250,248,243,0.85)',
      backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${EX_T.cardLine}`,
      flex: '0 0 auto', minWidth: 0,
    }}>
      <span style={{
        fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.01em', color: EX_T.ink,
        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        flex: '1 1 auto', minWidth: 0,
      }}>{name}</span>
      <span style={{
        padding: '6px 11px', borderRadius: 10,
        background: accent, color: '#fff',
        fontSize: 11.5, fontWeight: 600, letterSpacing: '-0.005em',
        whiteSpace: 'nowrap', boxShadow: EX_T.shadowCta, flex: '0 0 auto',
      }}>Записаться</span>
    </div>
  );
}

function EX_TrustRow({ rating, reviewsN, since, accent }: any) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      marginTop: 12, fontSize: 12.5, color: EX_T.inkSoft, flexWrap: 'wrap',
    }}>
      <EX_StarRow color={accent} size={12} />
      <span style={{ fontWeight: 600, color: EX_T.ink }}>{rating}</span>
      <span style={{ color: EX_T.inkFaint }}>·</span>
      <span>{reviewsN} отзывов</span>
      <span style={{ color: EX_T.inkFaint }}>·</span>
      <span>с {since}</span>
    </div>
  );
}

function EX_HeroStacked({ category, address, heading, sub, photoSrc, photoTone, rating, reviewsN, since, phone, ctaText, accent, accentSoft }: any) {
  return (
    <EX_Card>
      <EX_Chip accent={accent} accentSoft={accentSoft}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
        {category} · {address}
      </EX_Chip>
      <h2 style={{
        margin: '12px 0 6px', fontSize: 28, fontWeight: 600, letterSpacing: '-0.025em',
        lineHeight: 1.05, color: EX_T.ink, textWrap: 'balance',
      }}>{heading}</h2>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, color: EX_T.inkSoft, letterSpacing: '-0.005em' }}>{sub}</p>
      <EX_TrustRow rating={rating} reviewsN={reviewsN} since={since} accent={accent} />
      <div style={{ marginTop: 14 }}>
        <PhotoFill tone={photoTone} src={photoSrc}
          style={{ aspectRatio: '4 / 3', borderRadius: EX_T.radiusSm }} />
      </div>
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <EX_CTA accent={accent}>{ctaText}</EX_CTA>
        <EX_CTAGhost><EX_PhoneIcon size={14} color={EX_T.ink} />{phone}</EX_CTAGhost>
      </div>
    </EX_Card>
  );
}

function EX_HeroStatus({ category, address, heading, sub, photoSrc, photoTone, statusText, statusSub, rating, reviewsN, since, phone, ctaText, accent, accentSoft }: any) {
  return (
    <EX_Card style={{ padding: 0, overflow: 'hidden' }}>
      <PhotoFill tone={photoTone} src={photoSrc} style={{ aspectRatio: '16 / 9' }} />
      <div style={{ padding: 16 }}>
        <EX_Chip accent={accent} accentSoft={accentSoft}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
          {category} · {address}
        </EX_Chip>
        <h2 style={{
          margin: '12px 0 6px', fontSize: 26, fontWeight: 600, letterSpacing: '-0.025em',
          lineHeight: 1.05, color: EX_T.ink, textWrap: 'balance',
        }}>{heading}</h2>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, color: EX_T.inkSoft }}>{sub}</p>
        <div style={{
          marginTop: 14, padding: '10px 12px', background: accentSoft, borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: accent,
            boxShadow: `0 0 0 4px ${accent}22`, flex: '0 0 auto',
          }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: accent, lineHeight: 1.2 }}>{statusText}</div>
            <div style={{ fontSize: 11.5, color: EX_T.ink, marginTop: 2, lineHeight: 1.3 }}>{statusSub}</div>
          </div>
        </div>
        <EX_TrustRow rating={rating} reviewsN={reviewsN} since={since} accent={accent} />
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <EX_CTA accent={accent}>{ctaText}</EX_CTA>
          <EX_CTAGhost><EX_PhoneIcon size={14} color={EX_T.ink} />{phone}</EX_CTAGhost>
        </div>
      </div>
    </EX_Card>
  );
}

function EX_HeroStrip({ category, address, heading, sub, stripPhotos, photoTone, rating, reviewsN, since, phone, ctaText, accent, accentSoft }: any) {
  return (
    <EX_Card>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {stripPhotos.map((src: string, i: number) => (
          <PhotoFill key={i} tone={photoTone} src={src} style={{ aspectRatio: '1 / 1', borderRadius: 10 }} />
        ))}
      </div>
      <div style={{ marginTop: 14 }}>
        <EX_Chip accent={accent} accentSoft={accentSoft}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent }} />
          {category} · {address}
        </EX_Chip>
      </div>
      <h2 style={{
        margin: '12px 0 6px', fontSize: 26, fontWeight: 600, letterSpacing: '-0.025em',
        lineHeight: 1.05, color: EX_T.ink, textWrap: 'balance',
      }}>{heading}</h2>
      <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.45, color: EX_T.inkSoft }}>{sub}</p>
      <EX_TrustRow rating={rating} reviewsN={reviewsN} since={since} accent={accent} />
      <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <EX_CTA accent={accent}>{ctaText}</EX_CTA>
        <EX_CTAGhost><EX_PhoneIcon size={14} color={EX_T.ink} />{phone}</EX_CTAGhost>
      </div>
    </EX_Card>
  );
}

function EX_ReviewBento({ name, source, body, rating, accent, accentSoft, initial, when, photo }: any) {
  return (
    <EX_Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <EX_Avatar initial={initial} accent={accent} accentSoft={accentSoft} src={photo} />
        <div style={{ minWidth: 0, flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: EX_T.ink, letterSpacing: '-0.005em' }}>{name}</div>
          <div style={{ fontSize: 11.5, color: EX_T.inkSoft, marginTop: 1 }}>{source}</div>
        </div>
        <EX_StarRow count={rating} color={accent} size={11} />
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.5, color: EX_T.ink, letterSpacing: '-0.005em' }}>{body}</p>
      <div style={{ marginTop: 8, fontSize: 11, color: EX_T.inkFaint }}>{when}</div>
    </EX_Card>
  );
}

function EX_SectionTitle({ children, sub }: any) {
  return (
    <div style={{ padding: '4px 4px' }}>
      <h3 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: EX_T.ink, lineHeight: 1.15 }}>{children}</h3>
      {sub && <p style={{ margin: '4px 0 0', fontSize: 13, color: EX_T.inkSoft, lineHeight: 1.4 }}>{sub}</p>}
    </div>
  );
}

function EX_FeaturedService({ title, hint, price, photoSrc, photoTone, accent }: any) {
  return (
    <EX_Card style={{ padding: 0, overflow: 'hidden' }}>
      <PhotoFill tone={photoTone} src={photoSrc} style={{ aspectRatio: '16 / 9' }} />
      <div style={{ padding: 16 }}>
        <h4 style={{
          margin: 0, fontSize: 16, fontWeight: 600, letterSpacing: '-0.015em',
          color: EX_T.ink, lineHeight: 1.2, textWrap: 'balance',
        }}>{title}</h4>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginTop: 6 }}>
          <p style={{ margin: 0, fontSize: 12.5, color: EX_T.inkSoft, lineHeight: 1.4, flex: 1, minWidth: 0 }}>{hint}</p>
          <span style={{ fontSize: 18, fontWeight: 600, color: EX_T.ink, whiteSpace: 'nowrap', letterSpacing: '-0.01em', flex: '0 0 auto' }}>{price}</span>
        </div>
        <div style={{ marginTop: 14 }}>
          <EX_CTA accent={accent}>Записаться</EX_CTA>
        </div>
      </div>
    </EX_Card>
  );
}

function EX_SmallService({ title, hint, price }: any) {
  return (
    <EX_Card style={{ padding: 14, display: 'flex', flexDirection: 'column' }}>
      <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, letterSpacing: '-0.01em', color: EX_T.ink, lineHeight: 1.25 }}>{title}</h4>
      {hint && <p style={{ margin: '4px 0 0', fontSize: 12, color: EX_T.inkSoft, lineHeight: 1.35 }}>{hint}</p>}
      <div style={{ marginTop: 'auto', paddingTop: 10 }}>
        <span style={{ fontSize: 16, fontWeight: 600, color: EX_T.ink, letterSpacing: '-0.01em' }}>{price}</span>
      </div>
    </EX_Card>
  );
}

function EX_ServiceList({ items, accent }: any) {
  return (
    <EX_Card>
      {items.map((it: any, i: number) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 12, padding: '10px 0',
          borderBottom: i === items.length - 1 ? 'none' : `1px solid ${EX_T.cardLine}`,
        }}>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, color: EX_T.ink, letterSpacing: '-0.005em' }}>{it.name}</div>
            {it.hint && <div style={{ fontSize: 11.5, color: EX_T.inkSoft, marginTop: 1, lineHeight: 1.3 }}>{it.hint}</div>}
          </div>
          <span style={{ fontSize: 13.5, fontWeight: 600, color: EX_T.ink, whiteSpace: 'nowrap' }}>{it.price}</span>
        </div>
      ))}
      <div style={{ marginTop: 12 }}>
        <EX_CTA accent={accent}>Все услуги · записаться</EX_CTA>
      </div>
    </EX_Card>
  );
}

function EX_StatsRow({ stats }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
      {stats.map((s: any, i: number) => (
        <EX_Card key={i} style={{ padding: 12, textAlign: 'left' }}>
          <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: '-0.025em', color: EX_T.ink, lineHeight: 1 }}>{s.big}</div>
          <div style={{ fontSize: 11.5, color: EX_T.inkSoft, marginTop: 6, lineHeight: 1.3, letterSpacing: '-0.005em' }}>{s.text}</div>
        </EX_Card>
      ))}
    </div>
  );
}

function EX_Gallery({ photos, tone }: any) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <div style={{ gridColumn: '1 / -1' }}>
        <PhotoFill tone={tone} src={photos[0]} style={{ aspectRatio: '16 / 10', borderRadius: EX_T.radiusMd, boxShadow: EX_T.shadowSm }} />
      </div>
      <PhotoFill tone={tone} src={photos[1]} style={{ aspectRatio: '1 / 1', borderRadius: EX_T.radiusMd, boxShadow: EX_T.shadowSm }} />
      <PhotoFill tone={tone} src={photos[2]} style={{ aspectRatio: '1 / 1', borderRadius: EX_T.radiusMd, boxShadow: EX_T.shadowSm }} />
    </div>
  );
}

function EX_Contact({ address, hours, phone, accent, photoSrc, photoTone }: any) {
  return (
    <EX_Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <EX_PinIcon size={15} color={accent} />
        <span style={{ fontSize: 14, fontWeight: 600, color: EX_T.ink, letterSpacing: '-0.005em' }}>{address}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 8, fontSize: 12.5, color: EX_T.inkSoft, flexWrap: 'wrap' }}>
        <EX_ClockIcon size={13} color={EX_T.inkSoft} />
        <span>{hours}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginLeft: 4 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%', background: '#3FB66A',
            boxShadow: '0 0 0 3px rgba(63,182,106,0.18)',
          }} />
          <span style={{ color: '#2A8A4D', fontWeight: 500 }}>открыто</span>
        </span>
      </div>
      <div style={{ marginTop: 12 }}>
        <PhotoFill tone={photoTone} src={photoSrc} style={{ aspectRatio: '16 / 7', borderRadius: EX_T.radiusSm }} />
      </div>
      <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <EX_CTA accent={accent}>Записаться</EX_CTA>
        <EX_CTAGhost><EX_PhoneIcon size={14} color={EX_T.ink} />{phone}</EX_CTAGhost>
      </div>
    </EX_Card>
  );
}

function EX_FinalCTA({ heading, sub, ctaText, hint, accent, accentSoft }: any) {
  return (
    <EX_Card tinted accentSoft={accentSoft} style={{ padding: 22, textAlign: 'center' }}>
      <h3 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: '-0.02em', color: EX_T.ink, lineHeight: 1.1, textWrap: 'balance' }}>{heading}</h3>
      <p style={{ margin: '6px 0 16px', fontSize: 13, color: EX_T.inkSoft, lineHeight: 1.45 }}>{sub}</p>
      <EX_CTA accent={accent}>{ctaText}</EX_CTA>
      <div style={{ marginTop: 10, fontSize: 11.5, color: EX_T.inkSoft }}>{hint}</div>
    </EX_Card>
  );
}

function EX_Footer({ host }: any) {
  return (
    <div style={{
      padding: '12px 16px 14px', flex: '0 0 auto',
      borderTop: `1px solid ${EX_T.cardLine}`,
      fontSize: 11, color: EX_T.inkFaint, lineHeight: 1.4, letterSpacing: '-0.005em',
    }}>{host}.{BRAND.domain} · собран на Самосайте · обновлён сегодня</div>
  );
}

const EX_U = (id: string, w = 600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=72`;

function EX_renderSite(cfg: any) {
  const HeroComp =
    cfg.heroVariant === 'status' ? EX_HeroStatus :
    cfg.heroVariant === 'strip'  ? EX_HeroStrip  : EX_HeroStacked;
  const heroProps: any = {
    category: cfg.category, address: cfg.address,
    heading: cfg.heroHeading, sub: cfg.heroSub,
    photoTone: cfg.heroTone,
    rating: cfg.rating, reviewsN: cfg.reviewsN, since: cfg.since,
    phone: cfg.phone, ctaText: cfg.heroCta,
    accent: cfg.accent, accentSoft: cfg.accentSoft,
  };
  if (cfg.heroVariant === 'strip') heroProps.stripPhotos = cfg.stripPhotos;
  else heroProps.photoSrc = cfg.heroPhoto;
  if (cfg.heroVariant === 'status') {
    heroProps.statusText = cfg.statusText;
    heroProps.statusSub  = cfg.statusSub;
  }
  return (
    <MiniChrome host={cfg.host}>
      <EX_MiniHeader name={cfg.brand} accent={cfg.accent} />
      <div style={{ flex: 1, padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <HeroComp {...heroProps} />
        <EX_ReviewBento {...cfg.review} accent={cfg.accent} accentSoft={cfg.accentSoft} />
        <EX_SectionTitle sub="Цены за май">Услуги и&nbsp;цены</EX_SectionTitle>
        <EX_FeaturedService {...cfg.featured} accent={cfg.accent} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <EX_SmallService {...cfg.smalls[0]} />
          <EX_SmallService {...cfg.smalls[1]} />
        </div>
        <EX_ServiceList items={cfg.listItems} accent={cfg.accent} />
        <div style={{ marginTop: 4 }}><EX_SectionTitle>Цифры</EX_SectionTitle></div>
        <EX_StatsRow stats={cfg.stats} />
        <div style={{ marginTop: 4 }}><EX_SectionTitle sub="обновлено на этой неделе">Последние работы</EX_SectionTitle></div>
        <EX_Gallery photos={cfg.gallery} tone={cfg.galleryTone} />
        <div style={{ marginTop: 4 }}><EX_SectionTitle>Где найти</EX_SectionTitle></div>
        <EX_Contact address={cfg.address} hours={cfg.hours} phone={cfg.phone} accent={cfg.accent} photoSrc={cfg.mapPhoto} photoTone={cfg.mapTone} />
        <EX_FinalCTA heading={cfg.finalHeading} sub={cfg.finalSub} ctaText={cfg.finalCta} hint={cfg.finalHint} accent={cfg.accent} accentSoft={cfg.accentSoft} />
      </div>
      <EX_Footer host={cfg.host} />
    </MiniChrome>
  );
}

function EX_CoffeeSite() {
  return EX_renderSite({
    brand: 'Утро у Лены', host: 'lena',
    accent: '#D97757', accentSoft: 'rgba(217,119,87,0.10)',
    category: 'Кофейня', address: 'Платонова 12',
    heroHeading: 'Кофе и завтраки в центре Воронежа',
    heroSub: 'Зерно недельной обжарки. Альт.молоко без доплат. Вынос за 3 минуты до работы.',
    heroPhoto: EX_U('photo-1453614512568-c4024d13c247', 720), heroTone: 'warm',
    heroCta: 'Записаться · заказать к приходу', phone: '+7 (473) 220-12-12',
    rating: '4.9', reviewsN: 128, since: '2019',
    review: {
      name: 'Алина К.', source: '2ГИС · 8 отзывов', rating: 5,
      body: 'Лучший раф в городе. И ребята помнят моё «как обычно» с третьего раза. Захожу каждое утро по дороге на работу.',
      initial: 'А', when: '2 недели назад',
      photo: EX_U('photo-1494790108377-be9c29b29330', 120),
    },
    featured: {
      title: 'Завтрак выходного дня',
      hint: 'Сырник, авокадо-тост, кофе на выбор. Готовим только по сб–вс.',
      price: '450 ₽',
      photoSrc: EX_U('photo-1525351484163-7529414344d8', 600), photoTone: 'warm',
    },
    smalls: [
      { title: 'Капучино · альт.молоко', hint: 'без доплат', price: '220 ₽' },
      { title: 'Сырник со сметаной', hint: 'до 15:00', price: '220 ₽' },
    ],
    listItems: [
      { name: 'Латте', hint: 'двойной шот', price: '240 ₽' },
      { name: 'Раф ванильный', price: '260 ₽' },
      { name: 'Авокадо-тост', hint: 'на бородинском', price: '380 ₽' },
      { name: 'Гранола с йогуртом', price: '290 ₽' },
    ],
    stats: [
      { big: 'с 2019', text: 'на Платонова — седьмой год' },
      { big: '3 мин', text: 'средний вынос на работу' },
      { big: '0 ₽', text: 'доплата за альт.молоко' },
    ],
    gallery: [
      EX_U('photo-1559925393-8be0ec4767c8', 600),
      EX_U('photo-1559496417-e7f25cb247f3', 360),
      EX_U('photo-1494314671902-399b18174975', 360),
    ],
    galleryTone: 'warm',
    hours: 'пн–вс · 7:00–22:00',
    mapPhoto: EX_U('photo-1524350876685-274059332603', 600), mapTone: 'warm',
    finalHeading: 'Приходите на капучино',
    finalSub: 'Сегодня открыты до 22:00. Дойдёт ваш заказ за 3 минуты.',
    finalCta: 'Заказать с собой',
    finalHint: 'Или просто заходите · мы на Платонова, 12',
  });
}

function EX_AutoSite() {
  return EX_renderSite({
    brand: 'Park · автосервис', host: 'park-auto',
    accent: '#3B5876', accentSoft: 'rgba(59,88,118,0.10)',
    heroVariant: 'status',
    category: 'Автосервис', address: 'Промышленная 14',
    statusText: 'Свободно сегодня',
    statusSub: '14:00 и 16:30 · диагностика бесплатно',
    heroHeading: 'Диагностика за 30 минут. Чиним только нужное.',
    heroSub: 'Сначала звонок и расчёт. После «да» начинаем — без сюрпризов в чеке.',
    heroPhoto: EX_U('photo-1486262715619-67b85e0b08d3', 720), heroTone: 'slate',
    heroCta: 'Записаться · диагностика бесплатно', phone: '+7 (846) 333-08-08',
    rating: '4.8', reviewsN: 214, since: '2013',
    review: {
      name: 'Дмитрий В.', source: 'Яндекс.Карты · 23 отзыва', rating: 5,
      body: 'Сначала позвонили, объяснили, что и зачем меняем. Ничего лишнего не навязали, дали выбрать между оригиналом и аналогом.',
      initial: 'Д', when: '6 дней назад',
      photo: EX_U('photo-1500648767791-00dcc994a43e', 120),
    },
    featured: {
      title: 'Компьютерная диагностика',
      hint: 'Ходовая, тормоза, ошибки ЭБУ, уровни жидкостей. 30 минут.',
      price: 'бесплатно',
      photoSrc: EX_U('photo-1492144534655-ae79c964c9d7', 600), photoTone: 'slate',
    },
    smalls: [
      { title: 'Замена масла + фильтр', hint: '40 минут', price: 'от 900 ₽' },
      { title: 'Развал-схождение 3D', hint: 'гарантия 6 мес', price: 'от 2 400 ₽' },
    ],
    listItems: [
      { name: 'Тормозные колодки', hint: 'оригинал и аналоги', price: 'от 1 800 ₽' },
      { name: 'Замена сцепления', price: 'от 9 000 ₽' },
      { name: 'Ремонт подвески', hint: 'с гарантией 1 год', price: 'договорная' },
      { name: 'Шиномонтаж R13–R20', price: 'от 700 ₽' },
    ],
    stats: [
      { big: '12 лет', text: 'в одном боксе на Промышленной' },
      { big: '1 200', text: 'авто проходит через нас в год' },
      { big: '1 год', text: 'гарантия на любую работу' },
    ],
    gallery: [
      EX_U('photo-1487754180451-c456f719a1fc', 600),
      EX_U('photo-1503376780353-7e6692767b70', 360),
      EX_U('photo-1493238792000-8113da705763', 360),
    ],
    galleryTone: 'slate',
    hours: 'пн–сб · 9:00–20:00',
    mapPhoto: EX_U('photo-1450101499163-c8848c66ca85', 600), mapTone: 'slate',
    finalHeading: 'Заезжайте на диагностику',
    finalSub: 'Сегодня свободны окна 14:00 и 16:30. Диагностика бесплатно.',
    finalCta: 'Записаться на сегодня',
    finalHint: 'Ответим в WhatsApp или перезвоним за 10 минут',
  });
}

function EX_NailsSite() {
  return EX_renderSite({
    brand: 'Студия Анны', host: 'anna-nails',
    accent: '#8C4A5E', accentSoft: 'rgba(140,74,94,0.10)',
    heroVariant: 'strip',
    stripPhotos: [
      EX_U('photo-1607779097040-26e80aa78e66', 240),
      EX_U('photo-1632345031435-8727f6897d53', 240),
      EX_U('photo-1604902396830-aca29e19b067', 240),
    ],
    category: 'Маникюр', address: 'Куйбышева 8',
    heroHeading: 'Аппаратный маникюр, держится 21 день',
    heroSub: 'Работает одна Анна, не конвейер. Запись через Telegram, без звонков и CRM.',
    heroTone: 'peach',
    heroCta: 'Записаться в Telegram', phone: '@anna_studio',
    rating: '5.0', reviewsN: 86, since: '2017',
    review: {
      name: 'Олеся Н.', source: 'Яндекс · постоянный клиент', rating: 5,
      body: 'Анна спокойная, объясняет, что делает. Маникюр держится ровно до следующей записи — три недели. Никогда не было сколов.',
      initial: 'О', when: '3 дня назад',
      photo: EX_U('photo-1438761681033-6461ffad8d80', 120),
    },
    featured: {
      title: 'Маникюр + покрытие гель-лак',
      hint: 'Без обрезания, аппаратный. 1 ч 40 мин. Дизайн на 2 ногтя — в подарок.',
      price: '3 200 ₽',
      photoSrc: EX_U('photo-1607779097040-26e80aa78e66', 600), photoTone: 'peach',
    },
    smalls: [
      { title: 'Маникюр аппаратный', hint: 'без покрытия', price: '2 000 ₽' },
      { title: 'Дизайн от 1 ногтя', hint: 'линии · втирка · френч', price: 'от 150 ₽' },
    ],
    listItems: [
      { name: 'Снятие чужого покрытия', price: '500 ₽' },
      { name: 'Укрепление гелем', hint: 'без наращивания', price: '+ 800 ₽' },
      { name: 'Френч / лунный', price: '+ 400 ₽' },
      { name: 'Японский маникюр', hint: 'p-shine, без покрытия', price: '1 800 ₽' },
    ],
    stats: [
      { big: '9 лет', text: 'опыта · обучалась у О. Соколовой' },
      { big: '21 день', text: 'средняя носка покрытия' },
      { big: '86', text: 'постоянных клиентов с 2017' },
    ],
    gallery: [
      EX_U('photo-1632345031435-8727f6897d53', 600),
      EX_U('photo-1604902396830-aca29e19b067', 360),
      EX_U('photo-1601612628452-9e99ced43524', 360),
    ],
    galleryTone: 'peach',
    hours: 'пн–пт · 10:00–20:00',
    mapPhoto: EX_U('photo-1522337360788-8b13dee7a37e', 600), mapTone: 'peach',
    finalHeading: 'Запишитесь на эту неделю',
    finalSub: 'Сегодня свободны вторник и четверг после 16:00.',
    finalCta: 'Записаться в Telegram',
    finalHint: 'Отвечаю в течение 30 минут',
  });
}

function ExamplesSection({ mobile }: any) {
  // Curated list of presets to showcase variety. Pulled from the canon preset
  // library (currently 3 themes of the editorial family; more families ship
  // in subsequent versions).
  //
  // CRO note: 6+ items in a carousel signals "lots of options"; a 3-column
  // grid would lock in "only three". The carousel is the message.
  const showcase = samplePresets;

  const ExampleCard = ({
    item,
  }: { item: typeof showcase[number] }) => {
    const [hover, setHover] = React.useState(false);
    return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        gap: 10, marginBottom: 14, minHeight: 28,
        minWidth: 0,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.accent, flex: '0 0 auto' }} />
        <span style={{
          fontSize: mobile ? 14 : 15, fontWeight: 600,
          letterSpacing: '-0.015em',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          minWidth: 0,
        }}>{item.tagline}</span>
      </div>
      <div
        onMouseEnter={() => !mobile && setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex',
          borderRadius: 12,
          position: 'relative',
          transform: hover ? 'translateY(-2px)' : 'translateY(0)',
          boxShadow: hover
            ? '0 1px 2px rgba(40,28,18,0.04), 0 10px 24px -14px rgba(120,70,40,0.20), 0 4px 10px -8px rgba(40,28,18,0.08)'
            : '0 1px 2px rgba(40,28,18,0.03), 0 6px 16px -12px rgba(120,70,40,0.14), 0 2px 6px -6px rgba(40,28,18,0.05)',
          transition: 'transform .22s cubic-bezier(0.22,0.61,0.36,1), box-shadow .22s ease',
        }}
      >
        <PresetMiniChrome host={item.content.meta.host}>
          <PresetRenderer preset={item.preset} content={item.content} />
        </PresetMiniChrome>
      </div>
    </div>
    );
  };

  return (
    <section id="examples" style={{ ...sectionPad(mobile), marginTop: mobile ? 56 : 110, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Вот как будет<br/>выглядеть ваш сайт</H2>
        <Sub mobile={mobile}>
          Стилистик много — Самосайт подбирает её под нишу и контент. Если не зайдёт — поменяете в один клик из библиотеки.
        </Sub>
      </div>

      {/* Carousel: same component on mobile and desktop, just with different
          flex-basis. Desktop shows 3 visible + scroll, mobile shows 1 +
          snap. The variety lives in the scrolled-off cards. */}
      <ExamplesCarousel mobile={mobile} items={showcase} renderCard={(item) => <ExampleCard item={item} />} />

      {/* How AI picks — пояснение под каруселью */}
      <HowItPicks mobile={mobile} />

      <div style={{ marginTop: mobile ? 28 : 44, textAlign: 'center' }}>
        <a href="#hero" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'nowrap',
          background: VT.accent, color: '#fff', fontWeight: 700,
          padding: mobile ? '13px 22px' : '16px 32px',
          borderRadius: 999, fontSize: mobile ? 15 : 17,
          lineHeight: 1.2, textDecoration: 'none',
          boxShadow: '0 12px 28px -12px rgba(120,60,30,0.45)',
          maxWidth: '100%', boxSizing: 'border-box',
        }}>
          <span>Собрать такой&nbsp;же из&nbsp;моего источника&nbsp;→</span>
        </a>
        <div style={{
          marginTop: 14, fontFamily: VT.font.mono, fontSize: 12,
          color: VT.inkFaint, letterSpacing: '0.02em',
        }}>Самосайт сам подберёт стиль — потом можно поменять</div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// ExamplesCarousel — горизонтальный скролл с навигационными стрелками
// ─────────────────────────────────────────────────────────────

function ExamplesCarousel<T>({
  mobile, items, renderCard,
}: {
  mobile: boolean;
  items: T[];
  renderCard: (item: T, i: number) => React.ReactNode;
}) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const [atStart, setAtStart] = React.useState(true);
  const [atEnd, setAtEnd] = React.useState(false);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [hoverPrev, setHoverPrev] = React.useState(false);
  const [hoverNext, setHoverNext] = React.useState(false);

  // Recompute scroll position state on scroll / resize.
  const updateBounds = React.useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= maxScroll - 1);
    // Active slide = nearest card to the left edge (accounts for the scroll padding).
    const firstChild = el.firstElementChild?.firstElementChild as HTMLElement | undefined;
    const step = firstChild ? firstChild.getBoundingClientRect().width + 14 : el.clientWidth;
    const idx = Math.round(el.scrollLeft / step);
    const maxIdx = (el.firstElementChild?.childElementCount ?? 1) - 1;
    setActiveIdx(Math.max(0, Math.min(idx, maxIdx)));
  }, []);

  React.useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateBounds();
    el.addEventListener('scroll', updateBounds, { passive: true });
    window.addEventListener('resize', updateBounds);
    return () => {
      el.removeEventListener('scroll', updateBounds);
      window.removeEventListener('resize', updateBounds);
    };
  }, [updateBounds]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by approximately one card-width (one third of viewport on desktop).
    const step = Math.max(280, el.clientWidth / 3);
    el.scrollBy({ left: step * direction, behavior: 'smooth' });
  };

  // Arrow button style — big circle, white background, soft shadow, lifts on hover.
  const arrowStyle = (disabled: boolean, hovered: boolean, direction: 1 | -1): React.CSSProperties => ({
    position: 'absolute', top: '50%',
    [direction === -1 ? 'left' : 'right']: -28,
    transform: `translateY(-50%) ${hovered && !disabled ? `translateX(${direction * 2}px) scale(1.05)` : ''}`.trim(),
    width: 56, height: 56, borderRadius: '50%',
    border: 'none',
    background: VT.white,
    color: disabled ? VT.inkMuted : VT.ink,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0 : 1,
    pointerEvents: disabled ? 'none' : 'auto',
    transition: 'opacity .2s ease, transform .2s ease, box-shadow .2s ease',
    boxShadow: hovered && !disabled
      ? '0 16px 40px -12px rgba(120,60,30,0.30), 0 4px 12px -4px rgba(0,0,0,0.10)'
      : '0 8px 24px -8px rgba(120,60,30,0.20), 0 2px 6px -2px rgba(0,0,0,0.06)',
    padding: 0,
    fontFamily: 'inherit',
    zIndex: 5,
  } as React.CSSProperties);

  const ArrowIcon = ({ direction }: { direction: 1 | -1 }) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: direction === -1 ? 'scaleX(-1)' : undefined }}>
      <path d="M5 12 H19" />
      <path d="M13 6 L19 12 L13 18" />
    </svg>
  );

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'relative',
        marginTop: mobile ? 28 : 56,
        maxWidth: mobile ? 'none' : 1344,
        marginLeft: mobile ? undefined : 'auto',
        marginRight: mobile ? undefined : 'auto',
      }}
    >
      {/* Mobile dots — над каруселью (карточки высокие, снизу не видно) */}
      {mobile && items.length > 1 && (
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 7,
          marginBottom: 14,
        }}>
          {items.map((_, i) => {
            const active = i === activeIdx;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Слайд ${i + 1}`}
                onClick={() => {
                  const el = scrollerRef.current;
                  if (!el) return;
                  const child = el.firstElementChild?.children[i] as HTMLElement | undefined;
                  if (child) el.scrollTo({ left: child.offsetLeft - 20, behavior: 'smooth' });
                }}
                style={{
                  width: active ? 20 : 7, height: 7, borderRadius: 999,
                  background: active ? VT.accent : VT.line,
                  border: 'none', padding: 0, cursor: 'pointer',
                  transition: 'width .25s ease, background .25s ease',
                }}
              />
            );
          })}
        </div>
      )}

      <div
        ref={scrollerRef}
        style={{
          marginLeft: mobile ? -16 : 0,
          marginRight: mobile ? -16 : 0,
          overflowX: 'auto', WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: mobile ? 16 : 32,
          scrollbarWidth: 'none',
          // Fade-out mask — soft edges that hint at off-screen content.
          // Mask is symmetric and toggled per-side via stops collapsing to 0px.
          // Left side fades only when scrolled away from start; right fades only when more content awaits.
          ['--ss-fade-w' as any]: mobile ? '44px' : '64px',
          ['--ss-fade-l' as any]: atStart ? '0px' : 'var(--ss-fade-w)',
          ['--ss-fade-r' as any]: atEnd ? '0px' : 'var(--ss-fade-w)',
          maskImage: 'linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)',
          transition: 'mask-image .25s ease, -webkit-mask-image .25s ease',
        }}
      >
        <style>{`.ss-preset-carousel::-webkit-scrollbar{display:none}`}</style>
        <div className="ss-preset-carousel" style={{
          display: 'flex',
          gap: mobile ? 12 : 24,
          padding: mobile ? '0 56px 16px 16px' : '0 32px 16px',
          alignItems: 'flex-start',
        }}>
          {items.map((item, i) => (
            <div key={i} style={{
              flex: mobile ? '0 0 94%' : '0 0 calc((100% - 80px) / 3)',
              scrollSnapAlign: 'start',
              display: 'flex', minWidth: 0,
            }}>
              {renderCard(item, i)}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow controls — desktop only, side-mounted, big circles */}
      {!mobile && (
        <>
          <button
            type="button"
            aria-label="Предыдущий пример"
            disabled={atStart}
            onClick={() => scrollBy(-1)}
            onMouseEnter={() => setHoverPrev(true)}
            onMouseLeave={() => setHoverPrev(false)}
            style={arrowStyle(atStart, hoverPrev, -1)}
          >
            <ArrowIcon direction={-1} />
          </button>
          <button
            type="button"
            aria-label="Следующий пример"
            disabled={atEnd}
            onClick={() => scrollBy(1)}
            onMouseEnter={() => setHoverNext(true)}
            onMouseLeave={() => setHoverNext(false)}
            style={arrowStyle(atEnd, hoverNext, 1)}
          >
            <ArrowIcon direction={1} />
          </button>
        </>
      )}

    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HowItPicks — объяснение, как ИИ выбирает стиль
// ─────────────────────────────────────────────────────────────

function HowItPicks({ mobile }: { mobile: boolean }) {
  const items = [
    {
      n: '01',
      title: 'Если стиль уже есть, повторит его',
      body: 'Загрузите буклет, визитку или вывеску. Самосайт распознает шрифт и фирменные цвета, поставит на сайт такие же. Ваш стиль никуда не денется.',
      demo: 'swatches' as const,
    },
    {
      n: '02',
      title: 'Если стиля нет, соберёт сам',
      body: 'Цвета возьмёт с ваших фотографий: у тёплой кофейни — молочные и терракотовые, у маникюра на розовом фоне — пыльно-розовые и бордо. Шрифт подберёт под тон текста: для личного, авторского — мягкий с засечками, для сухого и точного — строгий и ровный.',
      demo: 'fonts' as const,
    },
    {
      n: '03',
      title: 'Раскладку выберет под ваш контент',
      body: 'Много цифр, цен и гарантий — соберёт из плиток. Меню, истории, отзывы — разложит как журнал. Упор на атмосферу — поставит крупные фото в две колонки.',
      demo: 'grids' as const,
    },
    {
      n: '04',
      title: 'Не понравилось — поменяете в один клик',
      body: 'В кабинете лежит библиотека готовых стилей. Откройте, выберите другой, и сайт перестроится за секунды. Тексты и фотографии останутся на местах.',
      demo: 'switch' as const,
    },
  ];

  const accent = VT.accent;

  // Small visual demos under each point — turns dry text into a show, not a tell.
  // Each demo sits on a white tray so it reads as a deliberate sample, not stray bits.
  const tray = (children: React.ReactNode) => (
    <div style={{
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 12,
      minHeight: 56,
    }}>{children}</div>
  );

  const Demo = ({ kind }: { kind: 'swatches' | 'fonts' | 'grids' | 'switch' }) => {
    if (kind === 'swatches') {
      const sets = [
        ['#FAF6F0', '#A8412E', '#211C17'],
        ['#0E0F10', '#C2D94A', '#9A9B98'],
        ['#F6E7E3', '#8C4A52', '#2A1820'],
      ];
      return tray(
        <>
          {sets.map((set, i) => (
            <div key={i} style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', boxShadow: '0 1px 3px rgba(40,28,18,0.08)' }}>
              {set.map((col, j) => <span key={j} style={{ width: 22, height: 30, background: col }} />)}
            </div>
          ))}
        </>
      );
    }
    if (kind === 'fonts') {
      return tray(
        <>
          <span style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontStyle: 'italic', color: VT.ink }}>Аа</span>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: VT.ink }}>Аа</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 19, color: VT.ink }}>Аа</span>
          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 23, color: VT.ink }}>Аа</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 21, fontWeight: 700, color: VT.ink }}>Аа</span>
        </>
      );
    }
    if (kind === 'grids') {
      const cell = (style: React.CSSProperties) => <span style={{ background: VT.accentSoft, borderRadius: 3, ...style }} />;
      const frame: React.CSSProperties = { width: 52, height: 44, padding: 5, border: `1px solid ${VT.line}`, borderRadius: 7, background: VT.bg };
      return tray(
        <>
          {/* bento mini */}
          <div style={{ ...frame, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 3 }}>
            {cell({ gridColumn: 'span 2' })}{cell({})}{cell({})}
          </div>
          {/* editorial mini */}
          <div style={{ ...frame, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {cell({ height: 8 })}{cell({ flex: 1 })}{cell({ height: 5, width: '60%' })}
          </div>
          {/* split mini */}
          <div style={{ ...frame, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
            {cell({})}{cell({})}
          </div>
        </>
      );
    }
    // switch
    return tray(
      <>
        {['#A8412E', '#2D5B8E', '#356E60', '#8C4A52'].map((col, i) => (
          <span key={i} style={{
            width: 26, height: 26, borderRadius: '50%', background: col,
            border: i === 0 ? `2px solid ${VT.ink}` : `2px solid transparent`,
            boxShadow: i === 0 ? `0 0 0 2px ${VT.white}, 0 0 0 3px ${VT.ink}` : 'none',
          }} />
        ))}
        <span style={{ fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint, marginLeft: 'auto' }}>→ 1 клик</span>
      </>
    );
  };

  return (
    <div style={{
      marginTop: 0,
      maxWidth: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: mobile ? '24px 20px' : '40px 44px',
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: VT.r.lg,
    }}>
      <h3 style={{
        fontSize: mobile ? 22 : 28, fontWeight: 700,
        lineHeight: 1.12, letterSpacing: '-0.025em',
        color: VT.ink, marginBottom: 12,
        maxWidth: 720,
      }}>Самосайт собирает дизайн из ваших материалов, а не подставляет из шаблона</h3>
      <p style={{
        fontSize: mobile ? 14 : 16, lineHeight: 1.5,
        color: VT.inkSoft, marginBottom: mobile ? 20 : 28,
        maxWidth: 680,
      }}>Если фирменный стиль уже есть, Самосайт его повторит. Если нет, соберёт сам из ваших фото и текстов. Поэтому сайт кофейни не похож на сайт автосервиса, даже если оба собраны одной кнопкой.</p>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 14 : 18,
        alignItems: 'stretch',
      }}>
        {items.map((it, i) => (
          <div key={i} style={{
            background: VT.bg,
            border: `1px solid ${VT.line}`,
            borderRadius: VT.r.lg,
            padding: mobile ? 22 : 28,
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <span style={{
                fontFamily: VT.font.mono, fontSize: 13, fontWeight: 700,
                color: '#fff', background: accent,
                width: 32, height: 32, borderRadius: 9,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                letterSpacing: '0.02em', flex: '0 0 auto',
              }}>{it.n}</span>
              <div style={{ fontSize: mobile ? 18 : 19, fontWeight: 700, letterSpacing: '-0.015em', color: VT.ink, lineHeight: 1.2 }}>{it.title}</div>
            </div>
            <p style={{ fontSize: mobile ? 14.5 : 15, lineHeight: 1.55, color: VT.inkSoft, margin: 0 }}>{it.body}</p>
            <div style={{ marginTop: 'auto', paddingTop: 18 }}>
              <Demo kind={it.demo} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ─────────────────────────────────────────────────────────────

// ── from landing-v3-b.jsx ──
// ───────── BLOCK 3 · CYCLE 4 САМ ─────────

const CYCLE_STEPS = [
  {
    n: '01', title: 'Собирает', cadence: 'один раз',
    body: 'Покажете источник — за 2 часа Самосайт соберёт сайт со всеми услугами, ценами, отзывами и галереей работ. Тексты пишет сам.',
    palette: { bg: 'oklch(0.95 0.05 40)', ink: 'oklch(0.32 0.14 35)', dec: 'oklch(0.86 0.10 40)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3"/>
        <path d="M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3"/>
      </svg>
    ),
  },
  {
    n: '02', title: 'Обновляет', cadence: 'каждую неделю',
    body: 'Раз в неделю заглядывает в источник. Новые цены, посты или фото — перенесёт на сайт. От вас ничего не нужно.',
    palette: { bg: 'oklch(0.94 0.06 95)', ink: 'oklch(0.36 0.12 85)', dec: 'oklch(0.84 0.12 90)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 32 a18 18 0 0 1 30 -13"/>
        <path d="M44 12 L44 22 L34 22"/>
        <path d="M50 32 a18 18 0 0 1 -30 13"/>
        <path d="M20 52 L20 42 L30 42"/>
      </svg>
    ),
  },
  {
    n: '03', title: 'Наблюдает', cadence: 'каждый день',
    body: 'Смотрит, как ведут себя посетители: кто что нажал, до чего долистал, где закрыл вкладку. Считает заявки и откуда они приходят.',
    palette: { bg: 'oklch(0.94 0.05 200)', ink: 'oklch(0.34 0.10 220)', dec: 'oklch(0.82 0.08 210)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 32 C 14 18, 50 18, 60 32"/>
        <path d="M4 32 C 14 46, 50 46, 60 32"/>
        <circle cx="32" cy="32" r="8"/>
        <circle cx="32" cy="32" r="3" fill="currentColor"/>
      </svg>
    ),
  },
  {
    n: '04', title: 'Предлагает', cadence: 'каждый понедельник',
    body: 'Когда за неделю набралось достаточно данных, в понедельник присылает до трёх предложений, как сделать сайт сильнее. Применить, переделать иначе или отказаться — решаете вы.',
    palette: { bg: 'oklch(0.94 0.05 145)', ink: 'oklch(0.32 0.11 145)', dec: 'oklch(0.82 0.08 145)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 14 L52 14 L52 44 L36 44 L28 54 L28 44 L12 44 Z"/>
        <path d="M22 26 L42 26 M22 34 L36 34"/>
      </svg>
    ),
  },
];

function CycleCard({ step, size = 240 }) {
  const p = step.palette;
  return (
    <div style={{
      width: size, padding: 18,
      boxSizing: 'border-box',
      background: p.bg,
      border: `2px solid ${p.ink}`,
      borderRadius: 18,
      boxShadow: `5px 5px 0 0 ${p.ink}`,
      color: p.ink,
      height: '100%',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{
          width: 48, height: 48, borderRadius: '50%',
          background: '#fff', border: `2px solid ${p.ink}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          color: p.ink, flex: '0 0 auto',
        }}>{step.icon}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{
            fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em',
            color: p.ink, opacity: 0.7, fontWeight: 600,
          }}>{step.n}</div>
          <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.022em', lineHeight: 1.1 }}>
            {step.title}
          </div>
        </div>
      </div>
      <div style={{
        marginTop: 6,
        fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.06em',
        color: p.ink, opacity: 0.75, fontStyle: 'italic',
      }}>{step.cadence}</div>
      <p style={{
        margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.4,
        color: p.ink, textWrap: 'pretty',
      }}>{step.body}</p>
    </div>
  );
}

function DesktopCycle() {
  // Horizontal flow: 01 (setup, one-off) → 02 → 03 → 04, with a return arc from 04 back to 02.
  // Reads naturally left-to-right. 01 sits apart with «один раз»; the rest is the weekly loop.
  const cardW = 250, cardH = 230;
  const gap = 40;
  const W = cardW * 4 + gap * 3;          // 4 cards in a row
  const arcH = 100;                        // space below for return arc
  const H = cardH + arcH + 60;

  // x positions of card centers
  const cx = (i) => i * (cardW + gap) + cardW / 2;

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: W, margin: '0 auto' }}>
      {/* row of cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(4, ${cardW}px)`,
        columnGap: gap,
        alignItems: 'stretch',
        position: 'relative',
        zIndex: 1,
      }}>
        {CYCLE_STEPS.map((step, i) => (
          <div key={step.n} style={{ position: 'relative', display: 'flex' }}>
            <CycleCard step={step} size={cardW} />
            {/* between-card forward arrow */}
            {i < 3 && (
              <div aria-hidden="true" style={{
                position: 'absolute',
                top: 56, right: -gap, width: gap, height: 24,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: VT.accent,
              }}>
                <svg width={gap} height="24" viewBox={`0 0 ${gap} 24`} fill="none">
                  <path d={`M 2 12 L ${gap - 8} 12`} stroke={VT.accent}
                        strokeWidth="2.5" strokeLinecap="round" />
                  <path d={`M ${gap - 12} 6 L ${gap - 4} 12 L ${gap - 12} 18`}
                        stroke={VT.accent} strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* return arc 04 → 02 (signals the weekly loop) */}
      <svg width="100%" viewBox={`0 0 ${W} ${arcH + 60}`}
           preserveAspectRatio="none"
           style={{ display: 'block', marginTop: -8, height: arcH + 60 }}>
        <defs>
          <marker id="v3retArr" viewBox="0 0 10 10" refX="8" refY="5"
                  markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill={VT.accent}/>
          </marker>
        </defs>
        {/* arc from bottom of card 04 (right-most) up to bottom of card 02 (second from left) */}
        <path d={`M ${cx(3)} 8 C ${cx(3)} ${arcH + 30}, ${cx(1)} ${arcH + 30}, ${cx(1)} 8`}
              fill="none" stroke={VT.accent} strokeWidth="2.5"
              strokeDasharray="6 5" markerEnd="url(#v3retArr)" />
        {/* label */}
        <foreignObject x={(cx(1) + cx(3)) / 2 - 130} y={arcH + 6} width="260" height="40">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{
            textAlign: 'center',
            fontFamily: VT.font.mono, fontSize: 12, letterSpacing: '0.06em',
            color: VT.accent, fontWeight: 700,
          }}>и снова — каждую неделю</div>
        </foreignObject>
      </svg>
    </div>
  );
}

function MobileCycle() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {CYCLE_STEPS.map((step, idx) => {
        const p = step.palette;
        const isLast = idx === CYCLE_STEPS.length - 1;
        return (
          <div key={step.n}>
            <div style={{
              background: p.bg, border: `2px solid ${p.ink}`, borderRadius: 18,
              boxShadow: `4px 4px 0 0 ${p.ink}`,
              padding: 18, color: p.ink,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: '#fff', border: `2px solid ${p.ink}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  flex: '0 0 auto', color: p.ink,
                }}>{step.icon}</span>
                <div>
                  <div style={{
                    fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em',
                    opacity: 0.7, fontWeight: 600,
                  }}>{step.n} · {step.cadence}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.022em', lineHeight: 1.1 }}>
                    {step.title}
                  </div>
                </div>
              </div>
              <p style={{ margin: '10px 0 0', fontSize: 14.5, lineHeight: 1.45, textWrap: 'pretty' }}>{step.body}</p>
            </div>
            {!isLast && (
              <div style={{
                textAlign: 'center', height: 20,
                color: p.ink, fontSize: 18, lineHeight: '20px',
              }}>↓</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CycleSection({ mobile }) {
  return (
    <section id="cycle" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>
          Это не сайт, который вы делаете один раз.<br/>
          Это сайт, который работает каждый день.
        </H2>
        <Sub mobile={mobile} maxWidth={760}>
          Один раз показали Самосайту, что у вас уже есть. Дальше он сам ходит по кругу: обновляет, смотрит на посетителей, приходит к вам с предложениями. Что применить — решаете вы.
        </Sub>
      </div>

      <div style={{
        marginTop: mobile ? 36 : 56,
        maxWidth: mobile ? '100%' : 1200,
        margin: `${mobile ? 36 : 56}px auto 0`,
      }}>
        {!mobile ? <DesktopCycle /> : <MobileCycle />}
      </div>

      <div style={{
        marginTop: mobile ? 28 : 44, textAlign: 'center',
        maxWidth: mobile ? '100%' : 720, margin: `${mobile ? 28 : 44}px auto 0`,
      }}>
        <p style={{
          fontSize: mobile ? 15 : 17, lineHeight: 1.5, color: VT.inkSoft,
          margin: 0, textWrap: 'pretty', fontStyle: 'italic',
        }}>
          Сайт получается не как готовый файл — это процесс. Каждую неделю он немного другой. Каждую неделю чуть лучше, чем был.
        </p>
      </div>

      <div style={{ marginTop: mobile ? 24 : 32, textAlign: 'center' }}>
        <a href="#hero" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: VT.accent, color: '#fff', fontWeight: 700,
          padding: mobile ? '14px 24px' : '16px 32px',
          borderRadius: 999, fontSize: mobile ? 16 : 17,
          textDecoration: 'none',
          boxShadow: '0 12px 28px -12px rgba(120,60,30,0.45)',
        }}>Запустить цикл — собрать мой сайт →</a>
      </div>
    </section>
  );
}

// ───────── BLOCK 4 · MONDAY CARDS ─────────

const MONDAY_CARDS = [
  {
    accent: 'oklch(0.605 0.155 35)', accentBg: 'oklch(0.94 0.04 40)',
    eyebrow: 'ЦЕННОСТНОЕ ПРЕДЛОЖЕНИЕ',
    caseLabel: 'Пример: автосервис',
    title: 'Заголовок проходит мимо',
    body: [
      <span>За неделю на сайт зашли <b>312 человек</b>. <b>224</b> закрыли его, до услуг даже не долистав.</span>,
      <span>В ваших отзывах люди постоянно пишут: «всё объяснили перед тем, как чинить» и «ничего лишнего не навязывали». Вот ваша сильная сторона. В заголовке её сейчас нет.</span>,
    ],
    suggestion: <>Предлагаю: <b>«Автосервис, где сначала объясняют, потом чинят»</b></>,
    actions: ['Применить', 'Другой вариант', 'Не надо'],
  },
  {
    accent: 'oklch(0.50 0.16 270)', accentBg: 'oklch(0.94 0.04 270)',
    eyebrow: 'КОНТЕНТ',
    caseLabel: 'Пример: кофейня',
    title: '«Завтраки» не работают',
    body: [
      <span>Из <b>156 человек</b>, открывших меню, <b>98</b> нажали на «Кофе и десерты». На «Завтраки» посмотрели <b>72</b> и только <b>4</b> заказали.</span>,
      <span>У завтраков нет фотографий и нет состава. Только цена и название. Человек просто не понимает, что там в сете и стоит ли оно того.</span>,
    ],
    suggestion: <>Предлагаю: добавить <b>3–4 фото</b> и расписать, что входит.</>,
    actions: ['Загрузить фото', 'Сгенерировать описание', 'Пропустить'],
  },
  {
    accent: 'oklch(0.45 0.11 145)', accentBg: 'oklch(0.93 0.06 145)',
    eyebrow: 'СТРУКТУРА',
    caseLabel: 'Пример: частная клиника',
    title: 'Отзывы читают. «О клинике» — нет',
    body: [
      <span><b>68%</b> посетителей долистывают до отзывов и сидят на них в среднем <b>22 секунды</b>. До блока «о клинике» доходят только <b>19%</b>. Почти все уходят за <b>4 секунды</b>.</span>,
      <span>Сейчас «о клинике» идёт раньше отзывов и съедает им внимание.</span>,
    ],
    suggestion: <>Предлагаю: <b>отзывы поднять выше</b>, «о клинике» сократить до абзаца и убрать вниз.</>,
    actions: ['Применить', 'Посмотреть, как будет', 'Не надо'],
  },
];

function MondayCard({ card, n, mobile }) {
  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 18, overflow: 'hidden',
      boxShadow: '0 18px 36px -18px rgba(120,60,30,0.22)',
      display: 'flex', flexDirection: 'column', height: '100%',
    }}>
      <div style={{
        padding: '12px 16px',
        background: VT.bgSoft,
        borderBottom: `1px solid ${VT.line}`,
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <span style={{
          width: 32, height: 32, borderRadius: '50%',
          background: card.accent, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 800, letterSpacing: '-0.04em',
        }}>С</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: VT.ink, lineHeight: 1.15 }}>
            Самосайт
          </div>
          <div style={{ fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, letterSpacing: '0.04em' }}>
            понедельник · 9:14
          </div>
        </div>
        <span style={{
          marginLeft: 'auto',
          fontFamily: VT.font.mono, fontSize: 10, letterSpacing: '0.1em',
          color: card.accent, background: card.accentBg,
          padding: '4px 8px', borderRadius: 6, fontWeight: 700,
        }}>{n} / 3</span>
      </div>

      <div style={{ padding: '18px 18px 14px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div style={{
          fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.12em',
          color: card.accent, fontWeight: 700,
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: card.accent }} />
          <span>{card.eyebrow}</span>
          <span style={{ marginLeft: 'auto', fontStyle: 'italic', fontWeight: 500, color: VT.inkFaint, letterSpacing: '0.02em' }}>{card.caseLabel}</span>
        </div>
        <h3 style={{
          fontSize: mobile ? 19 : 22, fontWeight: 700, letterSpacing: '-0.025em',
          margin: 0, lineHeight: 1.2, color: VT.ink,
        }}>{card.title}</h3>

        {card.body.map((p, i) => (
          <p key={i} style={{
            margin: 0, fontSize: mobile ? 14 : 15, lineHeight: 1.5,
            color: VT.inkSoft, textWrap: 'pretty',
          }}>{p}</p>
        ))}

        <div style={{
          marginTop: 4, padding: '12px 14px',
          background: card.accentBg, borderRadius: 12,
        }}>
          <div style={{
            fontFamily: VT.font.mono, fontSize: 10, letterSpacing: '0.12em',
            fontWeight: 700, opacity: 0.8, color: card.accent,
          }}>ПРЕДЛОЖЕНИЕ</div>
          <div style={{
            marginTop: 4, fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.45,
            color: VT.ink,
          }}>{card.suggestion}</div>
        </div>
      </div>

      <div style={{
        padding: 10, borderTop: `1px solid ${VT.line}`, background: '#fff',
        display: 'grid',
        gridTemplateColumns: `1fr auto auto`,
        gap: 6,
      }}>
        <button type="button" style={{
          padding: '10px 14px', borderRadius: 10, border: 'none',
          background: card.accent, color: '#fff',
          fontSize: 13.5, fontWeight: 600, cursor: 'pointer',
        }}>{card.actions[0]}</button>
        <button type="button" style={{
          padding: '10px 12px', borderRadius: 10,
          background: '#fff', color: VT.ink,
          border: `1px solid ${VT.line}`,
          fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
        }}>{card.actions[1]}</button>
        <button type="button" style={{
          padding: '10px 12px', borderRadius: 10,
          background: '#fff', color: VT.inkSoft,
          border: `1px solid ${VT.line}`,
          fontSize: 12.5, fontWeight: 500, cursor: 'pointer',
        }}>{card.actions[2]}</button>
      </div>
    </div>
  );
}

function MondaySection({ mobile }) {
  return (
    <section id="monday" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>
          По понедельникам — три предложения,<br/>как сделать сайт сильнее
        </H2>
        <Sub mobile={mobile} maxWidth={820}>
          Всю неделю Самосайт смотрит, что происходит у вас на сайте. В понедельник присылает разбор: где что просело и что с этим делать. Не общими фразами — конкретно.
        </Sub>
      </div>

      <div style={{
        marginTop: mobile ? 36 : 56,
        maxWidth: mobile ? '100%' : 1280, margin: `${mobile ? 36 : 56}px auto 0`,
      }}>
        {mobile ? (
          <div style={{
            marginLeft: -20, marginRight: -20,
            overflowX: 'auto', WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory', scrollPaddingLeft: 20,
            scrollbarWidth: 'none',
          }}>
            <style>{`.ss-v3-monday::-webkit-scrollbar{display:none}`}</style>
            <div className="ss-v3-monday" style={{
              display: 'flex', gap: 14, padding: '4px 20px 24px', alignItems: 'stretch',
            }}>
              {MONDAY_CARDS.map((c, i) => (
                <div key={i} style={{ flex: '0 0 88%', scrollSnapAlign: 'start', display: 'flex' }}>
                  <MondayCard card={c} n={i + 1} mobile={mobile} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24, alignItems: 'stretch',
          }}>
            {MONDAY_CARDS.map((c, i) => <MondayCard key={i} card={c} n={i + 1} mobile={mobile} />)}
          </div>
        )}
      </div>

      <div style={{
        marginTop: mobile ? 28 : 44, textAlign: 'center',
        maxWidth: mobile ? '100%' : 720, margin: `${mobile ? 28 : 44}px auto 0`,
      }}>
        <p style={{
          fontSize: mobile ? 14.5 : 16, lineHeight: 1.5, color: VT.inkSoft,
          margin: 0, textWrap: 'pretty',
        }}>
          Никаких правок без вашего согласования. Уведомления приходят туда, где удобно: в Telegram, MAX, на почту или SMS.
        </p>
      </div>

      <div style={{ marginTop: mobile ? 24 : 32, textAlign: 'center' }}>
        <a href="#hero" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: VT.accent, color: '#fff', fontWeight: 700,
          padding: mobile ? '14px 24px' : '16px 32px',
          borderRadius: 999, fontSize: mobile ? 16 : 17,
          textDecoration: 'none',
          boxShadow: '0 12px 28px -12px rgba(120,60,30,0.45)',
        }}>Хочу такие рекомендации для своего сайта →</a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────

// ── from landing-v3-c.jsx ──
// ───────── BLOCK 5 · BASE WORK ─────────

const BASE_ITEMS = [
  {
    title: 'Ловит заявки',
    body: 'Клиент нажал «Записаться» — уведомление падает туда, где вам удобно: в Telegram, MAX, на почту или SMS. Без CRM и без отдельных кабинетов.',
    metric: '4 канала',
    metricNote: 'на выбор',
    palette: { bg: 'oklch(0.94 0.045 40)', ink: 'oklch(0.42 0.16 35)', stroke: 'oklch(0.85 0.08 40)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="14" width="44" height="36" rx="5"/>
        <path d="M10 22 L32 36 L54 22"/>
      </svg>
    ),
  },
  {
    title: 'Отбирает отзывы',
    body: 'Читает все отзывы из источника. На сайт ставит 4–6 самых тёплых и конкретных. Появился отзыв сильнее — заменит сам.',
    metric: '4–6',
    metricNote: 'лучших в неделю',
    palette: { bg: 'oklch(0.94 0.045 80)', ink: 'oklch(0.42 0.13 70)', stroke: 'oklch(0.86 0.08 80)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="currentColor">
        <path d="M32 8 L37 23 L53 23 L40 33 L45 49 L32 39 L19 49 L24 33 L11 23 L27 23 Z"/>
      </svg>
    ),
  },
  {
    title: 'Попадает в поиск',
    body: 'Сразу в индексе Яндекса и Google. Защищённое соединение, разметка для карт и сниппетов. Работает из коробки.',
    metric: 'Яндекс',
    metricNote: '+ Google',
    palette: { bg: 'oklch(0.94 0.04 145)', ink: 'oklch(0.40 0.11 145)', stroke: 'oklch(0.86 0.07 145)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="27" cy="27" r="14"/>
        <path d="M38 38 L54 54"/>
      </svg>
    ),
  },
  {
    title: 'Отсекает спам',
    body: 'Антибот-проверка, которую живой человек не замечает. Боты получают тишину. До вас доходят только настоящие заявки.',
    metric: '0',
    metricNote: 'ботов в заявках',
    palette: { bg: 'oklch(0.94 0.04 270)', ink: 'oklch(0.42 0.15 270)', stroke: 'oklch(0.85 0.08 270)' },
    icon: (
      <svg viewBox="0 0 64 64" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 8 L52 16 L52 32 C 52 44, 42 54, 32 56 C 22 54, 12 44, 12 32 L12 16 Z"/>
        <path d="M22 32 L29 39 L42 24"/>
      </svg>
    ),
  },
];

function BaseWorkSection({ mobile }) {
  return (
    <section id="base" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Базовая работа — тоже на нём</H2>
        <Sub mobile={mobile} maxWidth={720}>
          Это то, что на других сайтах надо настраивать руками или платить SMM-щику. Здесь работает из коробки, без вашего участия.
        </Sub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 28 : 48}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 14 : 22,
      }}>
        {BASE_ITEMS.map((item, i) => {
          const pal = item.palette;
          return (
            <div key={item.title} style={{
              position: 'relative',
              background: VT.white, borderRadius: 20,
              border: `1px solid ${VT.line}`,
              boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 18px 40px -24px rgba(120,60,30,0.18)',
              overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              {/* colored band on top */}
              <div style={{
                background: pal.bg,
                padding: mobile ? '22px 22px 18px' : '26px 28px 22px',
                borderBottom: `1px solid ${pal.stroke}`,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16,
              }}>
                <div style={{
                  flex: '0 0 auto', width: mobile ? 56 : 64, height: mobile ? 56 : 64,
                  borderRadius: 16,
                  background: VT.white, color: pal.ink,
                  border: `2px solid ${pal.ink}`,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `3px 3px 0 0 ${pal.ink}`,
                }}>{item.icon}</div>
                <div style={{
                  textAlign: 'right', minWidth: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0,
                }}>
                  <div style={{
                    fontSize: mobile ? 26 : 34, fontWeight: 800,
                    letterSpacing: '-0.035em', lineHeight: 1, color: pal.ink,
                  }}>{item.metric}</div>
                  <div style={{
                    marginTop: 4,
                    fontFamily: VT.font.mono, fontSize: mobile ? 10.5 : 11.5,
                    letterSpacing: '0.08em', color: pal.ink, opacity: 0.75,
                    fontWeight: 600, textTransform: 'uppercase',
                  }}>{item.metricNote}</div>
                </div>
              </div>

              {/* body */}
              <div style={{
                padding: mobile ? '18px 22px 22px' : '22px 28px 26px',
                display: 'flex', flexDirection: 'column', flex: 1,
              }}>
                <h3 style={{
                  fontSize: mobile ? 20 : 23, fontWeight: 700, letterSpacing: '-0.025em',
                  margin: 0, lineHeight: 1.2, color: VT.ink,
                }}>{item.title}</h3>
                <p style={{
                  margin: '8px 0 0', fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.5,
                  color: VT.inkSoft, textWrap: 'pretty',
                }}>{item.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ───────── BLOCK 6 · SOURCES + Я.Карты ─────────

const SOURCES_LIST = [
  { id: 'yandex',   name: 'Яндекс.Карты',          pull: 'отзывы · услуги · цены · фото · режим работы', featured: true,
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><path d="M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z" fill="#FC3F1D"/><circle cx="12" cy="10" r="3.2" fill="#fff"/></svg> },
  { id: 'tg',       name: 'Telegram-канал',         pull: 'посты · фото работ · контакты',
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><rect width="24" height="24" rx="6" fill="#229ED9"/><path d="M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z" fill="#fff"/></svg> },
  { id: 'ig',       name: 'Instagram',              pull: 'скриншот профиля',
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><defs><linearGradient id="iggrC" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#FEDA77"/><stop offset="30%" stopColor="#F58529"/><stop offset="60%" stopColor="#DD2A7B"/><stop offset="100%" stopColor="#8134AF"/></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#iggrC)"/><rect x="6" y="6" width="12" height="12" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" strokeWidth="1.6"/><circle cx="16" cy="8" r="0.9" fill="#fff"/></svg> },
  { id: '2gis',     name: '2ГИС',                   pull: 'услуги · отзывы · контакты',
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><rect width="24" height="24" rx="6" fill="#19BB4F"/><text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="14" fill="#fff">2</text></svg> },
  { id: 'avito',    name: 'Avito',                  pull: 'услуги · цены · отзывы',
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><rect width="24" height="24" rx="6" fill="#0AF"/><circle cx="18" cy="7.5" r="3" fill="#FF9C00"/><text x="9" y="17" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="10" fill="#fff">A</text></svg> },
  { id: 'site',     name: 'Ваш старый сайт',        pull: 'тексты · фото · услуги',
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><rect width="24" height="24" rx="6" fill="oklch(0.40 0.04 250)"/><circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="1.5"/><ellipse cx="12" cy="12" rx="2.8" ry="6" fill="none" stroke="#fff" strokeWidth="1.5"/><path d="M6 12h12" stroke="#fff" strokeWidth="1.5"/></svg> },
  { id: 'card',     name: 'Фото меню или буклета',  pull: 'распознаём услуги · контакты',
    logo: <svg viewBox="0 0 24 24" width="30" height="30"><rect width="24" height="24" rx="6" fill="oklch(0.74 0.08 70)"/><rect x="6" y="8" width="12" height="9" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.4"/><path d="M8 11.5h4M8 14h6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg> },
];

const SOURCES_SOON = ['ВКонтакте', 'Ozon', 'YouTube'];

function SourcesSection({ mobile }) {
  return (
    <section id="sources" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>У вас уже всё есть для сайта</H2>
        <Sub mobile={mobile} maxWidth={720}>
          Подойдёт всё, где о вашем деле уже что-то написано. Если ничего нет — хватит фото меню или буклета.
        </Sub>
      </div>

      {/* sources grid */}
      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 28 : 48}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 10 : 14,
      }}>
        {SOURCES_LIST.map(s => (
          <div key={s.id} style={{
            display: 'flex', alignItems: 'center', gap: mobile ? 14 : 18,
            padding: s.featured ? (mobile ? '18px 18px' : '22px 24px') : (mobile ? '14px 16px' : '18px 22px'),
            background: VT.white, border: `1px solid ${s.featured ? VT.accent : VT.line}`,
            borderRadius: 14, position: 'relative',
          }}>
            {s.featured && (
              <span style={{
                position: 'absolute', top: -10, right: 16,
                fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
                color: '#fff', background: VT.accent,
                padding: '3px 8px', borderRadius: 6, fontWeight: 700,
              }}>ЧАЩЕ ВСЕГО</span>
            )}
            <span style={{ flex: '0 0 auto' }}>{s.logo}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: mobile ? 15.5 : 17, fontWeight: 700,
                color: VT.ink, letterSpacing: '-0.022em', lineHeight: 1.2,
              }}>{s.name}</div>
              <div style={{
                marginTop: 3,
                fontFamily: VT.font.mono, fontSize: mobile ? 11.5 : 12.5, letterSpacing: '0.02em',
                color: VT.inkSoft,
              }}>забираем: {s.pull}</div>
            </div>
          </div>
        ))}
      </div>

      {/* soon */}
      <div style={{
        marginTop: mobile ? 20 : 28,
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 20 : 28}px auto 0`,
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10,
        justifyContent: mobile ? 'flex-start' : 'center',
      }}>
        <span style={{
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
          color: VT.inkFaint, fontWeight: 600,
        }}>СКОРО ПОДКЛЮЧИМ</span>
        {SOURCES_SOON.map(n => (
          <span key={n} style={{
            padding: '6px 14px',
            background: VT.bgSoft, border: `1px solid ${VT.line}`,
            borderRadius: 999, fontSize: 13, color: VT.inkSoft, fontWeight: 500,
          }}>{n}</span>
        ))}
        <a style={{
          fontSize: 13.5, color: VT.accent, textDecoration: 'underline',
          textUnderlineOffset: 4, marginLeft: mobile ? 0 : 6,
        }}>Не нашли свою? Напишите →</a>
      </div>

      {/* Я.Карты sidebar */}
      <div style={{
        marginTop: mobile ? 32 : 56,
        maxWidth: mobile ? '100%' : 1100, margin: `${mobile ? 32 : 56}px auto 0`,
        background: VT.white,
        border: `1px solid ${VT.line}`, borderRadius: 18,
        padding: mobile ? '24px 22px' : '36px 44px',
        display: 'flex', flexDirection: mobile ? 'column' : 'row',
        gap: mobile ? 18 : 32, alignItems: mobile ? 'flex-start' : 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* big Я-pin decoration */}
        <span style={{
          flex: '0 0 auto',
          width: mobile ? 64 : 88, height: mobile ? 64 : 88,
        }}>
          <svg viewBox="0 0 88 88" width="100%" height="100%">
            <path d="M44 4 C 24 4, 10 18, 10 38 C 10 60, 44 84, 44 84 C 44 84, 78 60, 78 38 C 78 18, 64 4, 44 4 Z" fill="#FC3F1D"/>
            <text x="44" y="48" textAnchor="middle" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="32" fill="#fff">Я</text>
          </svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            margin: 0, fontSize: mobile ? 21 : 26,
            fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.2,
            color: VT.ink, textWrap: 'balance',
          }}>«У меня же есть страница в Яндекс.Картах. Зачем мне ещё сайт?»</h3>
          <p style={{
            margin: '10px 0 0', fontSize: mobile ? 14.5 : 16, lineHeight: 1.5,
            color: VT.inkSoft, textWrap: 'pretty',
          }}>
            Страница в Картах показывает вас тем, кто и так ищет именно вас. <b style={{ color: VT.ink }}>Сайт принимает заявки напрямую и попадает в поиск по широким запросам</b> — туда, куда страница не дотягивается. Самосайт берёт оттуда данные и делает из них то, чего страница в Картах не умеет.
          </p>
        </div>
      </div>
    </section>
  );
}

// ───────── BLOCK 7 · OWNERSHIP ─────────

const OWNER_POINTS = [
  {
    title: 'Не понравилась рекомендация — отклоните, и она исчезнет.',
    body: 'Никаких «нейросеть знает лучше».',
  },
  {
    title: 'Текст и фото правите в один клик',
    body: 'прямо на сайте, без отдельных редакторов.',
  },
  {
    title: 'Сайт ваш — заберёте в любой момент.',
    body: 'Архив HTML и фотографий скачивается одной кнопкой — пока аккаунт активен и ещё 10 дней после отказа.',
  },
  {
    title: 'Удаляется в одно нажатие.',
    body: 'Никаких звонков в поддержку и никаких «дайте подумать».',
  },
];

function OwnershipSection({ mobile }) {
  return (
    <section id="ownership" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Самосайт делает рутину.<br/>Решения остаются за вами</H2>
        <Sub mobile={mobile} maxWidth={760}>
          Всё, что предлагает ИИ — только через ваше «да». Всё, что собрал — можно поправить. Захотели уйти — забрали и ушли.
        </Sub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 980, margin: `${mobile ? 28 : 48}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 10 : 14,
      }}>
        {OWNER_POINTS.map((pt, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'flex-start', gap: 14,
            padding: mobile ? '18px 18px' : '22px 24px',
            background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 14,
          }}>
            <span style={{
              flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%',
              background: VT.accentSoft, color: VT.accent,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              marginTop: 2,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12 l4 4 10 -10"/>
              </svg>
            </span>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: mobile ? 15.5 : 16.5, fontWeight: 700,
                color: VT.ink, letterSpacing: '-0.015em', lineHeight: 1.3,
              }}>{pt.title}</div>
              <div style={{
                marginTop: 4, fontSize: mobile ? 14 : 15, lineHeight: 1.45,
                color: VT.inkSoft,
              }}>{pt.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: mobile ? 22 : 30, textAlign: 'center' }}>
        <a href="client-admin-demo.html" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: mobile ? '12px 22px' : '14px 28px',
          background: VT.white, color: VT.ink,
          border: `1px solid ${VT.line}`,
          borderRadius: 999, fontSize: mobile ? 14.5 : 15, fontWeight: 600,
          textDecoration: 'none',
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: VT.accent, color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10,
          }}>▶</span>
          Посмотреть демо личного кабинета
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

// ───────── BLOCK 8 · ANALYTICS ─────────

function AnalyticsSection({ mobile }) {
  // 47 заявок за неделю · по дням пн–вс
  const days = [5, 6, 8, 7, 9, 7, 5];
  const dayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  const peakIdx = 4; // Пятница
  const max = Math.max(...days);

  const observations = [
    {
      tag: 'ПИК',
      tagColor: 'oklch(0.60 0.15 35)',
      text: <>В <b>пятницу</b> заявок в два раза больше, чем в воскресенье. Похоже на привычку «решить дела перед выходными».</>,
    },
    {
      tag: 'РОСТ',
      tagColor: 'oklch(0.50 0.13 145)',
      text: <>Замена масла <b>+34%</b> за неделю. После того, как подняли блок наверх главной.</>,
    },
    {
      tag: 'ПРОВАЛ',
      tagColor: 'oklch(0.50 0.16 270)',
      text: <>«Шиномонтаж» открывают, но <b>не нажимают</b>. Возможно, нет цен — посмотрите в понедельник.</>,
    },
  ];

  return (
    <section id="analytics" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Видите ровно то же,<br/>что и Самосайт</H2>
        <Sub mobile={mobile} maxWidth={760}>
          Сколько зашли, откуда пришли, что нажали, сколько оставили заявок. Применил Самосайт правку — на следующей неделе видите, как изменились цифры.
        </Sub>
      </div>

      {/* Dashboard mock — dark, product-feeling */}
      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 28 : 48}px auto 0`,
        background: VT.white, color: VT.ink,
        borderRadius: 22, overflow: 'hidden',
        boxShadow: '0 24px 50px -28px rgba(120,60,30,0.25), 0 0 0 1px rgba(0,0,0,0.02)',
        position: 'relative',
      }}>
        {/* window chrome */}
        <div style={{
          padding: mobile ? '12px 16px' : '14px 22px',
          borderBottom: `1px solid ${VT.line}`,
          display: 'flex', alignItems: 'center', gap: 14,
          background: VT.bgSoft,
        }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FF5F57' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#FEBC2E' }} />
            <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28C840' }} />
          </div>
          <div style={{
            flex: 1, padding: '5px 12px',
            background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 6,
            fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkSoft,
            letterSpacing: '0.02em',
            display: mobile ? 'none' : 'flex', alignItems: 'center', gap: 8,
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11 V7 a5 5 0 0 1 10 0 V11"/>
            </svg>
            app.samosite.online/analytics
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em',
            color: VT.ink, fontWeight: 600,
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', background: 'oklch(0.65 0.18 145)',
              boxShadow: '0 0 0 3px oklch(0.65 0.18 145 / 0.25)',
            }} />
            LIVE
          </span>
        </div>

        {/* sub-toolbar */}
        <div style={{
          padding: mobile ? '12px 16px' : '14px 26px',
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
          borderBottom: `1px solid ${VT.line}`,
        }}>
          <span style={{ fontSize: mobile ? 14 : 16, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Автосервис Park · аналитика
          </span>
          <span style={{ flex: 1 }} />
          {['7 дней', '30 дней', 'Всё время'].map((p, i) => (
            <button key={p} type="button" style={{
              padding: '6px 12px', borderRadius: 8, border: 'none', cursor: 'pointer',
              fontSize: 12.5, fontWeight: 600,
              background: i === 0 ? VT.accent : 'transparent',
              color: i === 0 ? '#fff' : VT.inkSoft,
              fontFamily: 'inherit',
            }}>{p}</button>
          ))}
        </div>

        <div style={{ padding: mobile ? '18px 16px' : '24px 26px' }}>
          {/* KPI row */}
          <div style={{
            display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: mobile ? 10 : 14,
          }}>
            {[
              { label: 'посетителей',     value: '1 284', delta: '+18%' },
              { label: 'просмотры услуг', value: '892',   delta: '+24%' },
              { label: 'заявок',          value: '47',    delta: '+12%', accent: true },
              { label: 'конверсия',       value: '3.7%',  delta: '+0.4 п.п.' },
            ].map((k, i) => (
              <div key={i} style={{
                padding: mobile ? 14 : 16, borderRadius: 12,
                background: k.accent ? VT.accentSoft : VT.bgSoft,
                border: `1px solid ${k.accent ? VT.accent : VT.line}`,
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em',
                  color: VT.inkFaint, fontWeight: 600, textTransform: 'uppercase',
                }}>{k.label}</div>
                <div style={{
                  marginTop: 8, fontSize: mobile ? 26 : 32, fontWeight: 700,
                  letterSpacing: '-0.03em', color: VT.ink, lineHeight: 1, fontFamily: VT.font.mono,
                }}>{k.value}</div>
                <div style={{
                  marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5,
                  fontSize: 11.5, color: 'oklch(0.50 0.13 145)', fontWeight: 600,
                }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 1 L9 7 L1 7 Z"/></svg>
                  {k.delta} <span style={{ color: VT.inkFaint, fontWeight: 500 }}>за неделю</span>
                </div>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{
            marginTop: 18,
            padding: 18, borderRadius: 14,
            background: VT.bgSoft,
            border: `1px solid ${VT.line}`,
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: VT.ink }}>Заявки по дням</span>
              <span style={{ fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }}>пн – вс</span>
              <span style={{ marginLeft: 'auto', fontFamily: VT.font.mono, fontSize: 11, color: VT.inkSoft }}>
                всего <b style={{ color: VT.ink }}>47</b>
              </span>
            </div>

            <div style={{
              marginTop: 22, position: 'relative',
              display: 'grid', gridTemplateColumns: `repeat(${days.length}, 1fr)`,
              gap: 12, alignItems: 'end', height: mobile ? 140 : 180,
            }}>
              <div aria-hidden="true" style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ borderTop: `1px dashed ${VT.line}` }} />
                ))}
              </div>

              {days.map((d, i) => (
                <div key={i} style={{
                  height: `${(d / max) * 100}%`,
                  background: i === peakIdx
                    ? `linear-gradient(180deg, ${VT.accent}, oklch(0.50 0.16 35))`
                    : 'oklch(0.84 0.06 50)',
                  borderRadius: '6px 6px 0 0',
                  position: 'relative',
                  boxShadow: i === peakIdx ? '0 -2px 16px rgba(217, 119, 87, 0.4)' : 'none',
                }}>
                  <span style={{
                    position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                    fontFamily: VT.font.mono, fontSize: 11,
                    color: i === peakIdx ? VT.accent : VT.inkSoft,
                    fontWeight: i === peakIdx ? 700 : 500,
                  }}>{d}</span>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 6,
              display: 'grid', gridTemplateColumns: `repeat(${days.length}, 1fr)`,
              gap: 12, fontFamily: VT.font.mono, fontSize: 10.5,
              color: VT.inkFaint, textAlign: 'center', letterSpacing: '0.04em',
            }}>
              {dayLabels.map((l, i) => (
                <span key={l} style={{
                  color: i === peakIdx ? VT.accentSoft : 'inherit',
                  fontWeight: i === peakIdx ? 700 : 500,
                }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Sources + Top services */}
          <div style={{
            marginTop: 16,
            display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
            gap: mobile ? 12 : 16,
          }}>
            <div style={{
              padding: 18, borderRadius: 14,
              background: VT.bgSoft,
              border: `1px solid ${VT.line}`,
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }}>Откуда пришли</div>
              {[
                ['Яндекс',         48, 'oklch(0.55 0.14 30)'],
                ['Google',         22, 'oklch(0.48 0.13 240)'],
                ['Прямые заходы',  12, 'oklch(0.50 0.12 145)'],
                ['Соцсети',        11, 'oklch(0.55 0.10 280)'],
                ['Другое',          7, 'oklch(0.60 0.04 60)'],
              ].map(([label, v, color]) => (
                <div key={label} style={{ marginBottom: 9 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', fontSize: 12.5 }}>
                    <span style={{ color: VT.ink }}>{label}</span>
                    <span style={{ fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600 }}>{v}%</span>
                  </div>
                  <div style={{ marginTop: 5, height: 6, background: VT.line, borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ width: `${v}%`, height: '100%', background: color }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              padding: 18, borderRadius: 14,
              background: VT.bgSoft,
              border: `1px solid ${VT.line}`,
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: VT.ink, marginBottom: 12 }}>Самые кликабельные услуги</div>
              {[
                ['Замена масла',      142, '+34%'],
                ['Диагностика',        98,  '+8%'],
                ['Развал-схождение',   64,  '+2%'],
                ['Шиномонтаж',         41, '−12%'],
              ].map(([n, v, delta]) => (
                <div key={n} style={{
                  display: 'flex', alignItems: 'baseline', gap: 10,
                  padding: '8px 0', borderBottom: `1px dashed ${VT.line}`,
                }}>
                  <span style={{ color: VT.ink, fontSize: 13 }}>{n}</span>
                  <span style={{
                    fontFamily: VT.font.mono, fontSize: 11, fontWeight: 600,
                    color: String(delta).startsWith('+') ? 'oklch(0.75 0.16 145)' : 'oklch(0.70 0.14 30)',
                  }}>{delta}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ fontFamily: VT.font.mono, color: VT.ink, fontWeight: 600, fontSize: 13 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p style={{
        marginTop: mobile ? 22 : 30,
        maxWidth: mobile ? '100%' : 720, margin: `${mobile ? 22 : 30}px auto 0`,
        fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.5, color: VT.inkSoft,
        textAlign: 'center', textWrap: 'pretty',
      }}>
        Сводка приходит раз в неделю туда же, куда и всё остальное: в Telegram, MAX, на почту или SMS. В кабинет заходить необязательно, данные сами найдут вас.
      </p>

      {/* Demo CTA */}
      <div style={{ marginTop: mobile ? 20 : 28, textAlign: 'center' }}>
        <a href="client-admin-demo.html" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: mobile ? '13px 22px' : '15px 28px',
          background: VT.white, color: VT.ink,
          border: `1px solid ${VT.line}`,
          borderRadius: 999, fontSize: mobile ? 14.5 : 15.5, fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 6px 18px -10px rgba(120,60,30,0.20)',
        }}>
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: VT.accent, color: VT.ink,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9,
          }}>▶</span>
          Посмотреть демо личного кабинета
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────

// ── from landing-v3-d.jsx ──
// ───────── BLOCK 9 · PRICING ─────────

const PRICING_BULLETS = [
  'Соберём сайт за 2 часа из вашего источника',
  'Обновляем раз в неделю',
  'Когда наберётся данных — подсказываем по понедельникам, что улучшить',
  'Принимаем заявки туда, где удобно: в Telegram, MAX, на почту или SMS',
  'Аналитика в кабинете и сводка раз в неделю',
  'Защищённое соединение, попадает в Яндекс и Google',
  'Данные хранятся в России, по ФЗ-152',
];

// ───────── PRICING MATRIX · полная тарифная сетка ─────────

type CellVal = string | boolean;

const PLANS = ['Старт', 'Личный', 'Бизнес', 'Компания', 'Студия'];
const PLAN_HILITE = -1; // подсветка отключена

interface PriceRow { label: string; vals: CellVal[]; note?: string; }
interface PriceGroup { title?: string; rows: PriceRow[]; }

const PRICING_MATRIX: PriceGroup[] = [
  {
    rows: [
      { label: 'Цена / мес', vals: ['0 ₽', '690 ₽', '1 490 ₽', '2 990 ₽', '6 990 ₽'] },
      { label: 'Цена / год', vals: ['0 ₽', '6 620 ₽', '14 300 ₽', '28 700 ₽', '67 100 ₽'] },
      { label: 'Выгода годового', vals: ['—', '−20%', '−20%', '−20%', '−20%'] },
      { label: 'Для кого', vals: ['Попробовать', 'Самозанятые, личные сайты', 'Малый бизнес, фриланс', 'Инфобизнес, малые агентства', 'Студии, белые метки'] },
    ],
  },
  {
    title: 'Сайты и хостинг',
    rows: [
      { label: 'Сайтов в аккаунте', vals: ['1', '1', '3', '10', '30'] },
      { label: 'Свой домен', vals: [false, false, '3', '10', '30'] },
      { label: 'Страниц на сайт', vals: ['3', '10', '50', 'без ограничений', 'без ограничений'] },
      { label: 'Хранилище медиа', vals: ['500 МБ', '5 ГБ', '20 ГБ', '100 ГБ', '500 ГБ'] },
      { label: 'Сертификат безопасности (SSL)', vals: [true, true, true, true, true] },
      { label: 'Удаление брендинга Samosite', vals: [false, true, true, true, true] },
    ],
  },
  {
    title: 'ИИ-операции (в месяц)',
    rows: [
      { label: 'Генерация сайта целиком', vals: ['1 (разово)', '2', '10', '40', '150'] },
      { label: 'Перегенерация блоков', vals: ['10', '30', '150', '600', '2 000'] },
      { label: 'Анализ источников', vals: ['1', '5', '25', '100', '400'] },
      { label: 'ИИ-рекомендации (продвижение / контент)', vals: [false, '10', '50', '200', 'без ограничений*'] },
      { label: 'Качество ИИ-модели', vals: ['Yandex', 'Claude', 'Claude', 'Claude', 'Claude'] },
      { label: 'При превышении лимита', vals: ['блокировка', 'упрощённый режим', 'упрощённый режим', 'упрощённый режим', 'мягкий лимит'] },
    ],
  },
  {
    title: 'Возможности',
    rows: [
      { label: 'Шаблоны', vals: ['базовые', 'все', 'все', 'все + премиум', 'все + премиум'] },
      { label: 'Формы и заявки', vals: ['1 форма', true, true, true, true] },
      { label: 'Аналитика', vals: [false, 'базовая', 'расширенная', 'расширенная', 'расширенная'] },
      { label: 'Экспорт кода', vals: [false, false, false, true, true] },
      { label: 'Работа под бренд клиента', vals: [false, false, false, false, true] },
      { label: 'Командный доступ', vals: [false, false, '2 чел.', '5 чел.', '15 чел.'] },
    ],
  },
  {
    title: 'Поддержка',
    rows: [
      { label: 'Канал', vals: ['база знаний', 'чат', 'чат', 'приоритетный чат', 'персональный менеджер'] },
      { label: 'Время ответа', vals: ['—', '24 ч', '12 ч', '4 ч', '1 ч'] },
    ],
  },
];

function MatrixCell({ v, hi }: { v: CellVal; hi: boolean }) {
  const base: React.CSSProperties = {
    fontSize: 13.5, lineHeight: 1.35, color: VT.ink,
    textAlign: 'center', fontVariantNumeric: 'tabular-nums',
  };
  if (v === true) {
    return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: VT.successSoft, color: VT.success, alignItems: 'center', justifyContent: 'center' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 l4 4 10 -10"/></svg>
    </span>;
  }
  if (v === false) {
    return <span style={{ color: VT.inkFaint, fontSize: 16 }}>—</span>;
  }
  // price-like emphasis for first group handled by caller via hi
  return <span style={{ ...base, fontWeight: hi ? 700 : 500, color: hi ? VT.ink : VT.inkSoft }}>{v}</span>;
}

function PricingMatrix({ mobile }: { mobile: boolean }) {
  // Column widths: first column wide (label), 5 plan columns equal.
  const firstCol = mobile ? 132 : 240;
  const planCol = mobile ? 96 : 150;
  const totalW = firstCol + planCol * 5;

  const cellPad = mobile ? '10px 8px' : '12px 14px';

  return (
    <div style={{
      marginTop: mobile ? 24 : 40,
      border: `1px solid ${VT.line}`,
      borderRadius: 18,
      overflow: 'hidden',
      background: VT.white,
      boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 18px 48px -28px rgba(120,60,30,0.20)',
    }}>
      <div style={mobile ? { overflowX: 'auto', WebkitOverflowScrolling: 'touch' } : { overflow: 'visible' }}>
        <div style={{ minWidth: mobile ? totalW : 0 }}>
          {/* Header row: plan names + prices */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `${firstCol}px repeat(5, ${planCol}px)`,
            position: 'sticky', top: 0, zIndex: 2,
            background: VT.white,
            borderBottom: `2px solid ${VT.line}`,
          }}>
            <div style={{ padding: cellPad, position: 'sticky', left: 0, background: VT.white, zIndex: 4 }} />
            {PLANS.map((p, i) => (
              <div key={p} style={{
                padding: cellPad, textAlign: 'center',
                background: i === PLAN_HILITE ? VT.accentSoft : 'transparent',
                borderTopLeftRadius: i === PLAN_HILITE ? 12 : 0,
                borderTopRightRadius: i === PLAN_HILITE ? 12 : 0,
              }}>
                {i === PLAN_HILITE && (
                  <div style={{
                    fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.1em',
                    color: VT.accent, fontWeight: 700, marginBottom: 4, textTransform: 'uppercase',
                  }}>Популярный</div>
                )}
                <div style={{
                  fontSize: mobile ? 15 : 17, fontWeight: 700, letterSpacing: '-0.015em',
                  color: i === PLAN_HILITE ? VT.accent : VT.ink,
                }}>{p}</div>
              </div>
            ))}
          </div>

          {/* Groups */}
          {PRICING_MATRIX.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <div style={{
                  gridColumn: '1 / -1',
                  padding: mobile ? '10px 10px' : '11px 14px',
                  background: VT.bgSoft,
                  fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.1em',
                  color: VT.inkFaint, fontWeight: 700, textTransform: 'uppercase',
                  borderTop: `1px solid ${VT.line}`, borderBottom: `1px solid ${VT.line}`,
                }}>{group.title}</div>
              )}
              {group.rows.map((row, ri) => {
                const isPriceMonth = gi === 0 && ri === 0;
                return (
                  <div key={ri} style={{
                    display: 'grid',
                    gridTemplateColumns: `${firstCol}px repeat(5, ${planCol}px)`,
                    borderBottom: `1px solid ${VT.lineSoft}`,
                    alignItems: 'center',
                  }}>
                    <div style={{
                      padding: cellPad,
                      fontSize: mobile ? 12 : 13.5, color: VT.ink,
                      fontWeight: isPriceMonth ? 600 : 400,
                      position: 'sticky', left: 0, background: VT.white, zIndex: 3,
                      borderRight: `1px solid ${VT.line}`,
                      boxShadow: mobile ? '6px 0 8px -6px rgba(40,28,18,0.12)' : 'none',
                    }}>{row.label}</div>
                    {row.vals.map((v, ci) => (
                      <div key={ci} style={{
                        padding: cellPad, textAlign: 'center',
                        background: ci === PLAN_HILITE ? VT.accentSoft : 'transparent',
                        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <MatrixCell v={v} hi={isPriceMonth || ci === PLAN_HILITE} />
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      {mobile && (
        <div style={{
          padding: '10px 14px', textAlign: 'center',
          fontSize: 12, color: VT.inkFaint, fontFamily: VT.font.mono,
          borderTop: `1px solid ${VT.line}`,
        }}>← таблица листается вбок →</div>
      )}
    </div>
  );
}

function PricingSection({ mobile }) {
  return (
    <section id="pricing" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Тариф под ваш масштаб</H2>
        <p style={{
          margin: `${mobile ? 14 : 18}px auto 0`,
          maxWidth: 600,
          fontSize: mobile ? 15 : 17, lineHeight: 1.5,
          color: VT.inkSoft, textWrap: 'pretty',
        }}>
          От бесплатного старта до студийного. Первый месяц на любом платном — бесплатно, карту привязывать не надо.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <PricingMatrix mobile={mobile} />

        {/* CTA under the matrix */}
        <div style={{ marginTop: mobile ? 24 : 32, textAlign: 'center' }}>
          <Btn style={{
            padding: mobile ? '14px 26px' : '16px 36px',
            fontSize: mobile ? 15 : 16,
          }} iconRight={<IconArrow />}>
            Собрать сайт за 2 часа
          </Btn>
          <div style={{
            marginTop: 12, fontSize: 12.5, color: VT.inkSoft, fontStyle: 'italic',
          }}>
            Начните на бесплатном тарифе — оплату подключите потом, если решите расти.
          </div>
        </div>

        {/* Side note */}
        <p style={{
          margin: `${mobile ? 22 : 30}px auto 0`,
          maxWidth: 600,
          fontSize: mobile ? 14 : 15, lineHeight: 1.55,
          color: VT.inkSoft, textAlign: 'center', textWrap: 'pretty',
        }}>
          Час работы SMM-щика стоит дороже. День в агентстве в десятки раз. Самосайт делает то же самое: без зарплаты, без отпусков, без забытых задач.
        </p>
      </div>
    </section>
  );
}

// ───────── BLOCK 10 · FAQ ─────────

const FAQ_NEW = [
  {
    q: '«Самосайт сам предлагает улучшения» — он что, переделает мой сайт без меня?',
    a: 'Нет. Каждая рекомендация — это предложение. Сначала вы видите, как будет выглядеть. Дальше выбираете: применить, переделать иначе или отказаться. Без вашего «да» ничего не меняется. Не нужны рекомендации — отключите в настройках.',
  },
  {
    q: 'На каких данных он строит рекомендации?',
    a: 'На том, как вели себя посетители вашего сайта за прошлую неделю: что открыли, где закрыли, что нажали, откуда пришли. Никаких догадок, только реальные клики. Если данных мало (первая неделя или редко заходят) — рекомендаций просто не будет. Чтобы не выдумывать.',
  },
  {
    q: 'А отменить уже применённую рекомендацию можно?',
    a: 'Да, любую правку откатываем в один клик. История правок хранится 90 дней.',
  },
];

const FAQ_REST = [
  {
    q: 'А сам тексты править смогу?',
    a: 'Да. Откройте сайт, нажмите на любой блок — правьте прямо там. Так же замените фото, скроете услугу или поправите цену. Сайт ваш.',
  },
  {
    q: 'У меня нет ни Telegram-канала, ни страницы в Яндекс.Картах. Что делать?',
    a: 'Загрузите 5–10 фото работ, скриншот шапки профиля или просто фото меню или буклета. Самосайт соберёт сайт из этого. На стартовой странице есть кнопка «Загрузить фото».',
  },
  {
    q: 'А если Самосайт напишет что-то не то?',
    a: 'Поправите в кабинете, пара кликов. Если совсем не нравится — нажмите «пересобрать», Самосайт напишет заново с другим тоном или акцентом.',
  },
  {
    q: 'Мой Telegram-канал закрытый. Самосайт его прочитает?',
    a: 'Да. На время сборки добавьте бота @SamositeIntakeBot админом в свой канал на пять минут. Прочитаем посты и сразу выйдем. Бот не пишет в канал и не видит подписчиков.',
  },
  {
    q: 'Как Самосайт понимает, какие отзывы лучшие?',
    a: 'Читает все отзывы из источника, отбрасывает односложные («норм», «-», «ок»), тройки, спам и токсичные. Из оставшихся выбирает 4–6 самых тёплых и конкретных. Раз в неделю проверяет: появился отзыв сильнее — заменит.',
  },
  {
    q: 'Куда Самосайт отправит заявку, если у меня нет Telegram?',
    a: 'Выбираете один канал из четырёх: Telegram, MAX (российский мессенджер от VK), email или SMS на телефон. Заявка падает туда. Никаких CRM и отдельных приложений.',
  },
  {
    q: 'А мой домен подключить можно?',
    a: 'Если домен уже есть — пришлите, поможем настроить DNS. Если нет — сайт сразу живёт на адресе ваш-сайт.samosite.online со всем тем же самым. Бесплатно.',
  },
  {
    q: 'Что с моими данными, если я откажусь от подписки?',
    a: 'Сайт перестаёт показываться сразу. Тексты, фото и заявки удаляются в течение 10 дней. До удаления скачаете архив (HTML и фотографии) одной кнопкой. По ФЗ-152, все данные хранятся в России.',
  },
  {
    q: 'А если клиент пожалуется на сайт — кто отвечает?',
    a: 'За контент отвечаете вы как владелец дела. Мы проверяем, что текст не нарушает закон. Фактическая точность — на вас. «Стерильные инструменты», «гарантия 14 дней» — это ваши обещания. Если клиент пишет про техническую проблему сайта — напишите нам, поправим.',
  },
  {
    q: 'Чего Самосайт НЕ умеет?',
    a: 'Не сделает сайт «из ничего» — нужна хотя бы одна ссылка или фото. Не редактирует фото и не подбирает чужие. Не отвечает клиентам в чатах — только присылает заявки. Не покупает домен и не настраивает корпоративную почту. Не делает интернет-магазины с оплатой — только заявки.',
  },
];

function FaqItem({ q, a, defaultOpen, mobile, highlight }) {
  return (
    <details open={defaultOpen} style={{
      background: VT.white, border: `1px solid ${highlight ? VT.accent : VT.line}`,
      borderRadius: 14, padding: 0, overflow: 'hidden',
      position: 'relative',
    }}>
      <summary style={{
        listStyle: 'none', cursor: 'pointer',
        padding: mobile ? '16px 18px' : '18px 22px',
        display: 'flex', alignItems: 'center', gap: 14,
        fontSize: mobile ? 15.5 : 16.5, fontWeight: 600, color: VT.ink,
        lineHeight: 1.35,
      }}>
        <style>{`details > summary::-webkit-details-marker { display: none; }`}</style>
        <span style={{ flex: 1 }}>{q}</span>
        <span style={{
          flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%',
          background: VT.bgSoft, color: VT.accent,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700, lineHeight: 1,
        }}>+</span>
      </summary>
      <div style={{
        padding: mobile ? '0 18px 16px' : '0 22px 20px',
        fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.55, color: VT.inkSoft,
        textWrap: 'pretty',
      }}>{a}</div>
    </details>
  );
}

function FaqSection({ mobile }) {
  return (
    <section id="faq" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Что обычно хотят уточнить</H2>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 860,
        margin: `${mobile ? 28 : 48}px auto 0`,
      }}>
        {/* new (top) */}
        <div style={{
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
          color: VT.accent, fontWeight: 700, marginBottom: 12,
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: VT.accent }} />
          ПРО ЕЖЕНЕДЕЛЬНЫЕ РЕКОМЕНДАЦИИ
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ_NEW.map((f, i) => (
            <FaqItem key={f.q} q={f.q} a={f.a} defaultOpen={i === 0} mobile={mobile} highlight />
          ))}
        </div>

        {/* the rest */}
        <div style={{
          marginTop: 28,
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
          color: VT.inkFaint, fontWeight: 600, marginBottom: 12,
        }}>
          ОСТАЛЬНЫЕ ВОПРОСЫ
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQ_REST.map(f => (
            <FaqItem key={f.q} q={f.q} a={f.a} mobile={mobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ───────── BLOCK 11 · FINAL CTA ─────────

function FinalCtaSection({ mobile }) {
  // ladder data: 2 часа / неделя / месяц
  const ladder = [
    { when: 'Через 2 часа', what: 'у вас сайт, который принимает заявки' },
    { when: 'Через неделю', what: 'подтянет свежие посты, цены и фото из источника' },
    { when: 'Через месяц', what: 'наберётся данных — и начнёт подсказывать, что улучшить' },
  ];

  return (
    <section id="cta" style={{
      ...sectionPad(mobile),
      marginTop: mobile ? 64 : 130,
      position: 'relative', zIndex: 1,
      maxWidth: mobile ? '100%' : 1360,
      margin: `${mobile ? 64 : 130}px auto 0`,
    }}>
      <div style={{
        background: 'oklch(0.20 0.020 60)', color: VT.bg,
        borderRadius: mobile ? 22 : 28,
        padding: mobile ? '36px 22px' : '72px 64px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div aria-hidden="true" style={{
          position: 'absolute', right: -140, top: -120, width: 420, height: 420, borderRadius: '50%',
          background: `radial-gradient(circle, ${VT.accent} 0%, transparent 60%)`, opacity: 0.4,
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', left: -100, bottom: -120, width: 320, height: 320, borderRadius: '50%',
          background: `radial-gradient(circle, oklch(0.6 0.10 50) 0%, transparent 65%)`, opacity: 0.3,
        }} />

        <div style={{ position: 'relative', maxWidth: 920, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: mobile ? 28 : 50, fontWeight: 700, letterSpacing: '-0.03em',
            margin: 0, lineHeight: 1.08, textWrap: 'balance',
          }}>
            Через 2 часа — сайт.<br/>
            Через неделю — первые предложения.<br/>
            Через месяц — сайт, который вы сами<br/>бы не догадались собрать.
          </h2>
          <p style={{
            fontSize: mobile ? 16 : 19, lineHeight: 1.5, color: 'oklch(0.85 0.014 60)',
            margin: `${mobile ? 16 : 22}px auto 0`, maxWidth: 720, textWrap: 'pretty',
          }}>
            Покажите Самосайту, где вы сейчас ведёте свои дела: Яндекс.Карты, Telegram, 2ГИС, Avito или Instagram. Или просто сфотографируйте меню или буклет. Дальше работает Самосайт.
          </p>
          <p style={{
            fontSize: mobile ? 15 : 17, lineHeight: 1.5, color: 'oklch(0.92 0.012 60)',
            margin: `${mobile ? 12 : 14}px auto 0`, maxWidth: 720, textWrap: 'pretty',
            fontWeight: 500,
          }}>
            Тариф «Старт» — бесплатно навсегда. На платных первый месяц бесплатно, дальше <b style={{ color: VT.accentSoft }}>от 690 ₽ в месяц</b>.
          </p>

          {/* Ladder */}
          <div style={{
            marginTop: mobile ? 26 : 36,
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
            gap: mobile ? 10 : 14,
            textAlign: 'left',
            maxWidth: 880, margin: `${mobile ? 26 : 36}px auto 0`,
            position: 'relative',
          }}>
            {ladder.map((rung, i) => (
              <div key={i} style={{
                padding: mobile ? '16px 16px' : '20px 20px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: 14,
                display: 'flex', flexDirection: 'column', gap: 6,
                position: 'relative',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.12em',
                  color: VT.accentSoft, fontWeight: 700,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: VT.accent }} />
                  ШАГ {i + 1}
                </span>
                <div style={{
                  fontSize: mobile ? 18 : 21, fontWeight: 700, color: '#fff',
                  letterSpacing: '-0.025em', lineHeight: 1.15,
                }}>{rung.when}</div>
                <div style={{
                  fontSize: mobile ? 14 : 14.5, color: 'oklch(0.85 0.014 60)',
                  lineHeight: 1.4, textWrap: 'pretty',
                }}>{rung.what}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: mobile ? 28 : 36, display: 'inline-flex' }}>
            <Btn iconRight={<IconArrow />} style={{
              padding: mobile ? '14px 24px' : '18px 32px', fontSize: mobile ? 16 : 18,
            }}>
              Собрать сайт за 2 часа
            </Btn>
          </div>

          <div style={{
            marginTop: mobile ? 20 : 26,
            paddingTop: mobile ? 16 : 22,
            borderTop: '1px solid rgba(255,255,255,0.10)',
            fontSize: mobile ? 13.5 : 14.5, color: 'oklch(0.82 0.014 60)',
          }}>
            Остались вопросы? <a style={{
              color: VT.accentSoft, textDecoration: 'underline', textUnderlineOffset: 3,
            }}>Напишите нам →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────

// ── from landing-v3.jsx ──
// Standalone sticky header (избегаем зависимости от landing-samosite.jsx,
// чтобы v3-превью могло жить отдельно).
function StickyHeader({ mobile = false }) {
  const px = mobile ? 20 : 80;
  const primaryStyle = mobile
    ? { background: VT.accent, color: '#fff', fontWeight: 600, fontSize: 13.5,
        padding: '8px 16px', borderRadius: 999, textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none' }
    : { background: VT.accent, color: '#fff', fontWeight: 600,
        padding: '10px 20px', borderRadius: 999, fontSize: 14,
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
        boxShadow: '0 6px 16px -8px rgba(120,60,30,0.4)', border: 'none' };
  const primaryLabel = mobile ? 'Собрать' : 'Собрать за 2 часа';

  return (
    <div className="ss-sticky-header" style={{
      position: 'sticky', top: 0, zIndex: 10,
      width: '100%',
      paddingLeft: px, paddingRight: px,
      paddingTop: mobile ? 10 : 14, paddingBottom: mobile ? 10 : 14,
      background: 'oklch(0.972 0.012 80 / 0.92)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: `1px solid ${VT.lineSoft}`,
      boxSizing: 'border-box',
    }}>
      <style>{`
        .ss-sticky-header a.ss-nav-link { color: ${VT.inkSoft}; text-decoration: none; padding: 6px 2px; transition: color .15s ease; }
        .ss-sticky-header a.ss-nav-link:hover { color: ${VT.ink}; }
        .ss-sticky-header a.ss-login-link { color: ${VT.inkSoft}; text-decoration: none; border-radius: 999px; }
        .ss-sticky-header a.ss-login-link:hover { color: ${VT.ink}; background: ${VT.bgSoft}; }
      `}</style>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <a href="#hero" style={{ textDecoration: 'none', color: 'inherit' }}>
          <BrandMark size={mobile ? 22 : 26} fontSize={mobile ? 18 : 20} />
        </a>
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 14 }}>
            <a href="#examples" className="ss-nav-link">Примеры</a>
            <a href="#pricing" className="ss-nav-link">Цена</a>
            <a href="#faq" className="ss-nav-link">Помощь</a>
            <a href="#login" className="ss-login-link" style={{
              fontWeight: 500, fontSize: 14, padding: '8px 16px',
            }}>Войти</a>
            <a href="#hero" style={primaryStyle}>{primaryLabel} <span aria-hidden="true">→</span></a>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="#login" className="ss-login-link" style={{ fontWeight: 500, fontSize: 13.5, padding: '8px 12px' }}>Войти</a>
            <a href="#hero" style={primaryStyle}>{primaryLabel} <span aria-hidden="true">→</span></a>
          </div>
        )}
      </div>
    </div>
  );
}

function Footer({ mobile }) {
  return (
    <div style={{
      ...sectionPad(mobile),
      marginTop: mobile ? 40 : 64,
      paddingTop: mobile ? 22 : 28,
      borderTop: `1px solid ${VT.line}`,
      display: 'flex', flexDirection: mobile ? 'column' : 'row',
      gap: mobile ? 14 : 18,
      justifyContent: 'space-between',
      alignItems: mobile ? 'flex-start' : 'center',
      fontSize: 12.5, color: VT.inkFaint, position: 'relative', zIndex: 1,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <BrandMark size={20} fontSize={15} color={VT.inkSoft} />
        <span>© 2026 · {BRAND.domain} · все данные хранятся в РФ</span>
      </div>
      <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
        <a style={{ color: 'inherit' }}>Политика конфиденциальности</a>
        <a style={{ color: 'inherit' }}>Оферта</a>
        <a style={{ color: 'inherit' }}>Обратная связь</a>
      </div>
    </div>
  );
}

function SamosaytLandingV3({ mobile = false }) {
  const rootRef = React.useRef(null);
  // Russian typography: don't leave 1-letter prepositions/conjunctions at the end of a line.
  // Stitch them to the next word with nbsp at runtime.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const PREPS = /(^|[\s\u00A0(])([иваоксуяАИВОКСУЯ]|[Нн][еаио]|[Пп]о|[Зз]а|[Дд]о|[Оо]т|[Ии]з)(\s)/g;
    const SKIP = new Set(['SCRIPT', 'STYLE', 'CODE', 'SVG', 'PATH', 'INPUT', 'TEXTAREA']);
    const walk = (node) => {
      if (!node) return;
      if (node.nodeType === 3) {
        const t = node.nodeValue;
        if (!t || t.length < 3) return;
        const nt = t.replace(PREPS, (_, pre, w, sp) => `${pre}${w}\u00A0`);
        if (nt !== t) node.nodeValue = nt;
        return;
      }
      if (node.nodeType !== 1) return;
      if (SKIP.has(node.tagName)) return;
      const cs = node.getAttribute && node.getAttribute('data-mono');
      if (cs === 'true') return;
      for (let c = node.firstChild; c; c = c.nextSibling) walk(c);
    };
    walk(root);

    // Strip trailing periods from headings, paragraphs, list items, buttons & summaries.
    // (UI rule: no period after a heading or at the end of a single-purpose block.)
    const STRIP = root.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, button, summary, blockquote');
    STRIP.forEach(el => {
      // last non-empty text node
      const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
      let last = null, n;
      while ((n = tw.nextNode())) {
        if (n.nodeValue && n.nodeValue.replace(/\s/g, '')) last = n;
      }
      if (!last) return;
      const v = last.nodeValue;
      const trimmed = v.replace(/[\s\u00A0]+$/, '');
      // skip ellipsis or .. ; preserve ? !
      if (!trimmed.endsWith('.') || trimmed.endsWith('...') || trimmed.endsWith('..')) return;
      last.nodeValue = v.replace(/\.[\s\u00A0]*$/, '');
    });
  }, [mobile]);

  return (
    <>
      <style>{`
        .ss-hero-pill:focus-within {
          border-color: ${VT.accent} !important;
          box-shadow: 0 0 0 4px ${VT.accentSoft}, 0 12px 32px -16px rgba(120,60,30,0.25) !important;
        }
        .ss-card-lift { transition: transform .2s ease-out, box-shadow .2s ease-out; }
        .ss-card-lift:hover { transform: translateY(-1px); box-shadow: 0 10px 20px -14px rgba(120,60,30,0.18); }
        .ss-pricing-card { transition: transform .2s ease-out, box-shadow .2s ease-out; }
        .ss-pricing-card:hover { transform: translateY(-1px); box-shadow: 0 24px 60px -24px rgba(120,60,30,0.35); }
        details summary { transition: background-color .15s ease; }
        details summary:hover { background-color: ${VT.bgSoft}; }
        html { scroll-behavior: smooth; }
      `}</style>

      <div ref={rootRef} className="ss-v3-root" style={{
        width: '100%', minHeight: '100%', background: VT.bg, color: VT.ink,
        fontFamily: VT.font.sans, paddingTop: 0,
        paddingBottom: mobile ? 32 : 64,
        position: 'relative', overflow: 'hidden',
        letterSpacing: '-0.01em',
      }}>
        {/* decorative blobs */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          right: mobile ? -120 : -180, top: mobile ? -100 : -160,
          width: mobile ? 380 : 720, height: mobile ? 380 : 720,
          borderRadius: '50%',
          background: `radial-gradient(circle at 30% 30%, ${VT.accentSoft} 0%, transparent 65%)`,
          opacity: 0.85, pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute',
          left: mobile ? -100 : -120,
          top: mobile ? 700 : 600,
          width: mobile ? 280 : 480, height: mobile ? 280 : 480,
          borderRadius: '50%',
          background: `radial-gradient(circle, oklch(0.94 0.020 90) 0%, transparent 70%)`,
          opacity: 0.7, pointerEvents: 'none',
        }} />

        <StickyHeader mobile={mobile} />
        <HeroBlock        mobile={mobile} />
        <ExamplesSection  mobile={mobile} />
        <CycleSection     mobile={mobile} />
        <MondaySection    mobile={mobile} />
        <BaseWorkSection  mobile={mobile} />
        <SourcesSection   mobile={mobile} />
        <OwnershipSection mobile={mobile} />
        <AnalyticsSection mobile={mobile} />
        <PricingSection   mobile={mobile} />
        <FaqSection       mobile={mobile} />
        <FinalCtaSection  mobile={mobile} />
        <Footer mobile={mobile} />
      </div>
    </>
  );
}

function SamosaytLandingV3_Desktop() { return <SamosaytLandingV3 mobile={false} />; }
function SamosaytLandingV3_Mobile()  { return <SamosaytLandingV3 mobile={true} />; }

// ─────────────────────────────────────────────────────────────
// Public exports — canon 0.6.0
// ─────────────────────────────────────────────────────────────
// Back-compat aliases (kept so 0.5.x consumers still resolve, but visually point
// at the new v3 components — see CHANGELOG 0.6.0 "BREAKING" notes).
const SamosaytLanding = SamosaytLandingV3;
const Landing = SamosaytLandingV3;
const ConceptA_Desktop = SamosaytLandingV3_Desktop;
const ConceptA_Mobile = SamosaytLandingV3_Mobile;
const SamosaytLanding_Desktop = SamosaytLandingV3_Desktop;
const SamosaytLanding_Mobile = SamosaytLandingV3_Mobile;
// HeroBlock & HeroSection — same component (v3 HeroBlock).
const HeroSection = HeroBlock;

export {
  // v3 landing (canonical names)
  SamosaytLandingV3,
  SamosaytLandingV3_Desktop,
  SamosaytLandingV3_Mobile,

  // Back-compat aliases — visually point at v3
  SamosaytLanding,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  Landing,
  ConceptA_Desktop,
  ConceptA_Mobile,

  // Sections — composable
  StickyHeader,
  HeroBlock,
  HeroSection,
  ExamplesSection,
  CycleSection,
  MondaySection,
  BaseWorkSection,
  SourcesSection,
  OwnershipSection,
  AnalyticsSection,
  PricingSection,
  FaqSection,
  FinalCtaSection,
};
