'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Fragment } from 'react';
import { VT, BRAND } from '../tokens';
import { Mono, Card, Btn, Input, IconLink, IconArrow, BrandMark } from '../primitives';


// ─────────────────────────────────────────────────────────────
// Reusable: glyph illustrations for "how it works"
// Hand-tuned simple geometric SVG — paper/scissor vibe, no clip-art.

const G_BG = VT.accentSoft;     // pale peach
const G_INK = VT.accent;
const G_INK_DARK = 'oklch(0.32 0.14 35)';

function Glyph({ size = 88, children, tint }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 18,
      background: tint || G_BG, color: G_INK_DARK,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flex: '0 0 auto', position: 'relative', overflow: 'hidden',
    }}>{children}</div>
  );
}

function GlyphLink({ size = 88 }) {
  // a link/chain
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.65} height={size * 0.65} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3"/>
        <path d="M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3"/>
      </svg>
    </Glyph>
  );
}

function GlyphAI({ size = 88 }) {
  // sparkles / ai
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="currentColor">
        <path d="M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z"/>
        <circle cx="50" cy="50" r="4"/>
        <circle cx="14" cy="48" r="2.5"/>
      </svg>
    </Glyph>
  );
}

function GlyphGlobe({ size = 88 }) {
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <circle cx="32" cy="32" r="22"/>
        <ellipse cx="32" cy="32" rx="10" ry="22"/>
        <path d="M10 32h44"/>
      </svg>
    </Glyph>
  );
}

function GlyphRefresh({ size = 88 }) {
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 32 a18 18 0 0 1 30 -13"/>
        <path d="M44 12 L44 22 L34 22"/>
        <path d="M50 32 a18 18 0 0 1 -30 13"/>
        <path d="M20 52 L20 42 L30 42"/>
      </svg>
    </Glyph>
  );
}

function GlyphInbox({ size = 88 }) {
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
        <rect x="10" y="14" width="44" height="36" rx="5"/>
        <path d="M10 34 L22 34 L26 40 L38 40 L42 34 L54 34"/>
      </svg>
    </Glyph>
  );
}

function GlyphChart({ size = 88 }) {
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 48 L24 30 L34 38 L54 14"/>
        <path d="M44 14 L54 14 L54 24"/>
      </svg>
    </Glyph>
  );
}

function GlyphGift({ size = 88 }) {
  return (
    <Glyph size={size}>
      <svg viewBox="0 0 64 64" width={size * 0.7} height={size * 0.7} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="24" width="44" height="28" rx="3"/>
        <path d="M10 24 L54 24"/>
        <path d="M32 24 L32 52"/>
        <path d="M22 24 C 22 14, 32 14, 32 24"/>
        <path d="M42 24 C 42 14, 32 14, 32 24"/>
      </svg>
    </Glyph>
  );
}

// ─────────────────────────────────────────────────────────────
// Example site preview cards — REAL selling-page mock
// (hero photo, services with prices, curated reviews, gallery, CTA)

// Photo-like placeholder OR a real Unsplash URL.
// `src` wins if provided — falls back to gradient if missing/loading.
function PhotoBlock({ tone = 'peach', src, children, style, label }) {
  const tones = {
    peach: ['oklch(0.84 0.07 50)', 'oklch(0.62 0.09 35)', 'oklch(0.46 0.07 30)'],
    sage:  ['oklch(0.82 0.06 145)', 'oklch(0.58 0.08 145)', 'oklch(0.38 0.06 145)'],
    slate: ['oklch(0.80 0.04 240)', 'oklch(0.55 0.06 240)', 'oklch(0.35 0.04 240)'],
    warm:  ['oklch(0.88 0.05 70)', 'oklch(0.70 0.10 50)', 'oklch(0.48 0.10 35)'],
    rose:  ['oklch(0.86 0.06 25)', 'oklch(0.65 0.10 20)', 'oklch(0.40 0.08 18)'],
  };
  const [c1, c2, c3] = tones[tone] || tones.peach;
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: src ? '#222' : `
        radial-gradient(120% 80% at 30% 20%, ${c1} 0%, transparent 55%),
        radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%),
        linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)
      `,
      ...style,
    }}>
      {src && (
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
            display: 'block',
          }}
        />
      )}
      {!src && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(60% 30% at 20% 5%, rgba(255,255,255,0.18) 0%, transparent 60%),
            radial-gradient(40% 20% at 80% 95%, rgba(0,0,0,0.15) 0%, transparent 60%)
          `,
        }} />
      )}
      {children}
      {label && !src && (
        <span style={{
          position: 'absolute', left: 8, bottom: 6,
          fontFamily: VT.font.mono, fontSize: 9, color: 'rgba(255,255,255,0.7)',
          letterSpacing: '0.08em',
        }}>{label}</span>
      )}
    </div>
  );
}

// Tiny SVG star
function Star({ filled = true, size = 11 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={filled ? '#f4a93b' : 'none'} stroke={filled ? '#f4a93b' : '#ccc'} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z"/>
    </svg>
  );
}

function ReviewCard({ author, text, rating = 5, curated = false }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.85)',
      border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: 10, padding: '10px 12px',
      fontSize: 12, lineHeight: 1.45,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', gap: 1 }}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled={i < rating} size={11} />)}
        </div>
        {curated && (
          <span style={{
            marginLeft: 'auto',
            fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.08em',
            color: 'oklch(0.42 0.14 35)', background: 'oklch(0.92 0.045 40)',
            padding: '2px 6px', borderRadius: 4, fontWeight: 600,
          }}>★ ЛУЧШИЙ</span>
        )}
      </div>
      <div style={{ marginTop: 6, color: 'oklch(0.22 0.018 60)' }}>
        «{text}»
      </div>
      <div style={{ marginTop: 4, fontSize: 10.5, color: 'oklch(0.55 0.02 60)' }}>{author}</div>
    </div>
  );
}

// Tiny avatar for review preview cards in landing examples
function MiniAvatar({ name, tone = 'peach', size = 26 }) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  const tones = {
    peach: ['oklch(0.78 0.10 50)',  'oklch(0.55 0.12 35)'],
    rose:  ['oklch(0.80 0.09 25)',  'oklch(0.56 0.11 18)'],
    sage:  ['oklch(0.78 0.08 145)', 'oklch(0.52 0.10 145)'],
    slate: ['oklch(0.78 0.05 240)', 'oklch(0.52 0.06 240)'],
  };
  const [c1, c2] = tones[tone] || tones.peach;
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flex: '0 0 auto',
      background: `linear-gradient(140deg, ${c1}, ${c2})`,
      color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: Math.round(size * 0.46),
    }}>{initial}</span>
  );
}

function SiteCard({ name, category, city, palette = 'peach', tone, mobile = false,
                    services = [], reviews = [], gallery = [], heroPhoto,
                    handle = 'studia',
                    heroFormula = null, // optional override; falls back to name
                    rating = '4.9',
                    reviewCount = 38,
                    clientsCount = '1 200+',
                    phone = '+7 999 111-11-11',
                    logo = null }) {
  const palettes = {
    peach: { bg: 'oklch(0.98 0.012 60)',  bgAlt: 'oklch(0.95 0.014 60)',  ink: 'oklch(0.22 0.018 60)',  sub: 'oklch(0.48 0.018 60)',  ac: VT.accent,              acSoft: 'oklch(0.93 0.05 40)' },
    sage:  { bg: 'oklch(0.98 0.012 145)', bgAlt: 'oklch(0.95 0.014 145)', ink: 'oklch(0.20 0.015 145)', sub: 'oklch(0.42 0.018 145)', ac: 'oklch(0.50 0.13 145)', acSoft: 'oklch(0.93 0.06 145)' },
    slate: { bg: 'oklch(0.98 0.005 250)', bgAlt: 'oklch(0.95 0.008 250)', ink: 'oklch(0.20 0.012 250)', sub: 'oklch(0.45 0.015 250)', ac: 'oklch(0.50 0.12 250)', acSoft: 'oklch(0.93 0.045 250)' },
  };
  const p = palettes[palette] || palettes.peach;
  const ph = tone || palette;
  const h1 = heroFormula || `${category} в ${city}`;
  const reviewTones = ['peach', 'rose', 'sage', 'slate'];

  return (
    <div className="ss-card-lift" style={{
      background: p.bg, color: p.ink,
      border: `1px solid ${VT.line}`,
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 18px 36px -18px rgba(120,60,30,0.22)',
      display: 'flex', flexDirection: 'column',
      width: '100%',
    }}>
      {/* browser chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '8px 12px',
        background: VT.bgSoft, borderBottom: `1px solid ${VT.line}`,
      }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
        <span style={{ marginLeft: 8, fontFamily: VT.font.mono, fontSize: 10, color: VT.inkFaint }}>
          {handle}.{BRAND.domain}
        </span>
      </div>

      {/* sticky-like header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '9px 12px',
        background: 'rgba(255,255,255,0.96)',
        borderBottom: `1px solid ${VT.line}`,
      }}>
        {logo && (
          <span style={{
            width: 24, height: 24, flex: '0 0 auto',
            borderRadius: 7,
            background: logo.bg || p.ac,
            color: logo.fg || '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 13, letterSpacing: '-0.04em', lineHeight: 1,
          }}>{logo.letter}</span>
        )}
        <span style={{ fontSize: 12.5, fontWeight: 700, color: p.ink, letterSpacing: '-0.015em' }}>
          {name}
        </span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: VT.font.mono, fontSize: 10.5, color: p.sub,
          whiteSpace: 'nowrap',
        }}>{phone}</span>
        <span style={{
          padding: '4px 10px', borderRadius: 999,
          background: p.ac, color: '#fff', fontSize: 10.5, fontWeight: 600,
        }}>Записаться</span>
      </div>

      {/* Hero — formula H1 + dual CTA + trust pill */}
      <div style={{
        padding: '14px 14px 12px',
        borderBottom: `1px solid ${VT.line}`,
      }}>
        <div style={{
          fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
          color: p.ac, fontWeight: 600,
        }}>
          {category.toUpperCase()} · {city.toUpperCase()}
        </div>
        <h3 style={{
          fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em',
          margin: '6px 0 0', lineHeight: 1.1, color: p.ink,
          textWrap: 'balance',
        }}>{h1}</h3>

        {/* trust pill */}
        <div style={{
          marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 10px', background: p.bgAlt, border: `1px solid ${VT.line}`,
          borderRadius: 999, fontSize: 11,
        }}>
          <span style={{ display: 'inline-flex', gap: 1 }}>
            {[0,1,2,3,4].map(i => <Star key={i} filled size={10} />)}
          </span>
          <b style={{ color: p.ink }}>{rating} ★</b>
          <span style={{ color: p.sub }}>· {reviewCount} отзывов</span>
        </div>

        {/* hero photo */}
        <div style={{ marginTop: 10 }}>
          <PhotoBlock tone={ph} src={heroPhoto} style={{
            aspectRatio: '16 / 9', borderRadius: 8, border: `1px solid ${VT.line}`,
          }} />
        </div>

        {/* dual CTA */}
        <div style={{ marginTop: 10, display: 'flex', gap: 6 }}>
          <span style={{
            flex: 1, textAlign: 'center',
            padding: '8px 10px', borderRadius: 8,
            background: p.ac, color: '#fff',
            fontSize: 12, fontWeight: 600,
          }}>Записаться →</span>
          <span style={{
            padding: '8px 10px', borderRadius: 8,
            background: 'transparent', color: p.ink,
            border: `1px solid ${VT.line}`,
            fontFamily: VT.font.mono, fontSize: 11,
            whiteSpace: 'nowrap', flex: '0 0 auto',
          }} aria-label={phone}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Social proof bar */}
      <div style={{
        padding: '8px 14px',
        background: p.bgAlt,
        borderBottom: `1px solid ${VT.line}`,
        display: 'flex', alignItems: 'center', gap: 8,
        fontFamily: VT.font.mono, fontSize: 10, letterSpacing: '0.06em', color: p.sub,
      }}>
        <span>НАС ВЫБРАЛИ</span>
        <b style={{ fontFamily: VT.font.sans, fontSize: 13, color: p.ink, letterSpacing: '-0.02em' }}>{clientsCount}</b>
        <span>ЧЕЛОВЕК</span>
        <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <span style={{
            fontSize: 8, fontWeight: 800, color: '#fff', background: '#FFCC00',
            width: 14, height: 14, borderRadius: 4,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>Я</span>
          <b style={{ fontFamily: VT.font.sans, color: p.ink }}>{rating} ★</b>
        </span>
      </div>

      {/* Services — cards (not list rows) */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
          color: p.ac, fontWeight: 600, marginBottom: 8,
        }}>
          УСЛУГИ И ЦЕНЫ
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {services.slice(0, 3).map(([n, pr], i) => (
            <div key={n} style={{
              background: VT.white, border: `1px solid ${VT.line}`,
              borderRadius: 10, padding: '8px 10px',
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: p.ink, letterSpacing: '-0.01em' }}>{n}</div>
                <div style={{ fontFamily: VT.font.mono, fontSize: 11, color: p.ink, marginTop: 1 }}>{pr}</div>
              </div>
              <span style={{
                padding: '4px 8px', borderRadius: 999,
                background: p.acSoft, color: p.ac,
                fontSize: 10, fontWeight: 600,
              }}>Записаться →</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews — cards with avatars + ★ ЛУЧШИЙ badge */}
      <div style={{ padding: '12px 14px', background: p.bgAlt, borderTop: `1px solid ${VT.line}` }}>
        <div style={{
          display: 'flex', alignItems: 'baseline',
          marginBottom: 8,
        }}>
          <div style={{
            fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
            color: p.ac, fontWeight: 600,
          }}>ОТЗЫВЫ</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {reviews.slice(0, 2).map((r, i) => (
            <div key={i} style={{
              background: VT.white, border: `1px solid ${VT.line}`,
              borderRadius: 10, padding: '8px 10px',
              position: 'relative',
            }}>
              {i === 0 && (
                <span style={{
                  position: 'absolute', top: 7, right: 8,
                  fontFamily: VT.font.mono, fontSize: 8, letterSpacing: '0.08em',
                  background: p.acSoft, color: p.ac,
                  padding: '2px 5px', borderRadius: 3, fontWeight: 700,
                }}>★ ЛУЧШИЙ</span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <MiniAvatar name={r.author} tone={reviewTones[i % reviewTones.length]} size={22} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: p.ink, lineHeight: 1.1 }}>{r.author}</div>
                  <div style={{ display: 'flex', gap: 1, marginTop: 1 }}>
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} filled size={8} />)}
                  </div>
                </div>
              </div>
              <p style={{
                margin: '6px 0 0', fontSize: 11.5, lineHeight: 1.4, color: p.ink,
                display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}>«{r.text}»</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mini gallery */}
      <div style={{ padding: '12px 14px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3,
        }}>
          {gallery.slice(0, 4).map((g, i) => (
            <PhotoBlock key={i} tone={g.tone || ph} src={g.src}
              style={{ aspectRatio: '1 / 1', borderRadius: 4 }} />
          ))}
        </div>
      </div>

      {/* Final CTA */}
      <div style={{ padding: '0 14px 14px', marginTop: 'auto' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '11px 14px', borderRadius: 10,
          background: p.ac, color: '#fff',
          fontSize: 13, fontWeight: 700,
        }}>
          Записаться онлайн →
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Platform chip — supported sources

// Real brand colors so each platform reads as itself, not as a generic chip.
const PLATFORMS_OK = [
  { id: 'yandex',   name: 'Яндекс.Карты',           bg: 'transparent', fg: '#000', logo: <YandexIcon />,
    pull: 'отзывы · услуги · цены · фото · режим работы', featured: true },
  { id: 'telegram', name: 'Telegram-канал',         bg: '#229ED9', fg: '#fff',    logo: <PlaneIcon />,
    pull: 'посты · фото работ · контакты' },
  { id: 'instagram', name: 'Instagram',             bg: 'linear-gradient(135deg, #FEDA77 0%, #F58529 30%, #DD2A7B 60%, #8134AF 100%)', fg: '#fff', logo: <CameraIcon />,
    pull: 'скриншот профиля' },
  { id: '2gis',     name: '2ГИС',                   bg: 'transparent', fg: '#fff', logo: <TwoGisIcon />,
    pull: 'услуги · отзывы · контакты' },
  { id: 'avito',    name: 'Avito',                  bg: 'transparent', fg: '#fff', logo: <AvitoIcon />,
    pull: 'услуги · цены · отзывы' },
  { id: 'site',     name: 'Ваш старый сайт',        bg: 'oklch(0.42 0.04 250)', fg: '#fff', logo: <GlobeMini />,
    pull: 'тексты · фото · услуги' },
  { id: 'card',     name: 'Фото буклета или меню', bg: 'oklch(0.78 0.07 70)', fg: '#3a2410', logo: <CardIcon />,
    pull: 'распознаем услуги · контакты' },
];

const PLATFORMS_SOON = [
  { id: 'vk',        name: 'VK-страница',      bg: '#0077FF', logo: 'V' },
  { id: 'ozon',      name: 'Ozon-витрина',     bg: '#005BFF', logo: 'O' },
  { id: 'youtube',   name: 'YouTube-канал',    bg: '#FF0033', logo: <PlayIcon /> },
];

function PlaneIcon()    { return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z"/></svg>; }
function GlobeMini()    { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>; }
function CardIcon()     { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 11h6M7 14h4"/></svg>; }
function CameraIcon()   { return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M9 6l1-2h4l1 2"/></svg>; }
function WhatsAppIcon() { return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2 A10 10 0 0 0 3 17 L2 22 L7 21 A10 10 0 1 0 12 2 Z"/></svg>; }

function YandexIcon() { return <svg viewBox="0 0 24 24" width="22" height="22" fill="none"><path d="M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z" fill="#FC3F1D"/><circle cx="12" cy="10" r="3.2" fill="#fff"/></svg>; }
function TwoGisIcon() { return <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#19BB4F"/><text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="14" fill="#fff">2</text></svg>; }
function AvitoIcon() { return <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#0AF"/><circle cx="18" cy="7.5" r="3" fill="#FF9C00"/><text x="9" y="17" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="10" fill="#fff">A</text></svg>; }

function PlayIcon()     { return <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M7 4 L20 12 L7 20 Z"/></svg>; }

function PlatformLogo({ size = 48, p }) {
  return (
    <span style={{
      width: size, height: size, borderRadius: Math.round(size * 0.27),
      background: p.bg, color: p.fg || '#fff',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 800, fontSize: Math.round(size * 0.46), letterSpacing: '-0.04em',
      flex: '0 0 auto',
      boxShadow: '0 1px 0 rgba(0,0,0,0.04)',
    }}>{p.logo}</span>
  );
}

function PlatformCard({ p, mobile, featured }) {
  return (
    <div className="ss-card-lift" style={{
      display: 'flex', alignItems: 'center', gap: mobile ? 14 : 18,
      padding: mobile ? '16px 16px' : (featured ? '22px 24px' : '18px 20px'),
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 18,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <PlatformLogo size={featured ? (mobile ? 52 : 60) : (mobile ? 44 : 50)} p={p} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: featured ? (mobile ? 17 : 19) : (mobile ? 15.5 : 17),
          fontWeight: 700, color: VT.ink, letterSpacing: '-0.022em', lineHeight: 1.2,
        }}>{p.name}</div>
        <div style={{
          marginTop: 4,
          fontFamily: VT.font.mono, fontSize: mobile ? 11 : 12, letterSpacing: '0.03em',
          color: VT.inkSoft,
        }}>забираем: {p.pull}</div>
      </div>
      {/* corner accent */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: -30, top: -30,
        width: 80, height: 80, borderRadius: '50%',
        background: p.bg,
        opacity: 0.07,
      }} />
    </div>
  );
}

function PlatformSoonPill({ p, mobile }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '10px 14px 10px 10px',
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 999,
    }}>
      <span style={{
        width: 24, height: 24, borderRadius: 7,
        background: p.bg, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: 11, letterSpacing: '-0.04em', flex: '0 0 auto',
      }}>{p.logo}</span>
      <span style={{ fontSize: 13.5, fontWeight: 500, color: VT.ink }}>{p.name}</span>
      <span style={{
        fontFamily: VT.font.mono, fontSize: 10, letterSpacing: '0.1em',
        color: VT.inkFaint,
      }}>СКОРО</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION wrappers

function SectionEyebrow({ children, mobile }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: VT.font.mono, fontSize: mobile ? 10.5 : 11.5, letterSpacing: '0.14em',
      color: VT.accent, fontWeight: 500,
      padding: '6px 12px', background: VT.accentSoft, borderRadius: 6,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: VT.accent }} />
      {children}
    </div>
  );
}

function SectionTitle({ children, mobile, align = 'center' }) {
  return (
    <h2 style={{
      fontSize: mobile ? 30 : 52,
      lineHeight: mobile ? 1.1 : 1.05,
      fontWeight: 700,
      letterSpacing: '-0.03em',
      margin: '14px 0 0', textWrap: 'balance',
      textAlign: align,
    }}>{children}</h2>
  );
}

function SectionSub({ children, mobile, align = 'center' }) {
  return (
    <p style={{
      fontSize: mobile ? 16 : 19, lineHeight: 1.45,
      color: VT.inkSoft, margin: '14px auto 0',
      maxWidth: mobile ? '100%' : 680, textWrap: 'pretty',
      textAlign: align,
    }}>{children}</p>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO

function HeroBlock({ mobile }) {
  return (
    <div style={{
      position: 'relative', zIndex: 1,
      maxWidth: mobile ? '100%' : 1100,
      margin: mobile ? '28px 0 0' : '52px auto 0',
      textAlign: mobile ? 'left' : 'center',
    }}>
      {/* H1 — три «сам», без eyebrow, без точки */}
      <h1 style={{
        fontSize: mobile ? 38 : 88,
        lineHeight: mobile ? 1.08 : 1.02,
        fontWeight: 700,
        letterSpacing: '-0.035em',
        margin: 0,
        textWrap: 'balance',
      }}>
        Сайт, который{mobile ? ' ' : <br />}
        <span style={{ position: 'relative', display: 'inline-block', whiteSpace: mobile ? 'normal' : 'nowrap', color: VT.accent, padding: '0 2px' }}>
          сам себя соберёт,
          <span aria-hidden="true" style={{
            position: 'absolute', left: 4, right: 14, bottom: mobile ? 3 : 8,
            height: mobile ? 8 : 14, background: VT.accentSoft, opacity: 0.7,
            zIndex: -1, borderRadius: 3,
          }} />
        </span>
        {mobile ? ' ' : <br />}
        <span style={{ display: 'inline-block', whiteSpace: mobile ? 'normal' : 'nowrap', color: VT.accent, padding: '0 2px' }}>сам обновит</span>
        {' '}
        <span style={{ display: 'inline-block', whiteSpace: mobile ? 'normal' : 'nowrap', color: VT.accent, padding: '0 2px' }}>и сам приведёт клиентов</span>
      </h1>

      <p style={{
        fontSize: mobile ? 17 : 20, lineHeight: 1.45, color: VT.inkSoft,
        margin: mobile ? '20px 0 0' : '32px auto 0',
        maxWidth: mobile ? '100%' : 760, textWrap: 'pretty',
      }}>
        Покажите ссылку — карты, Telegram или визитку. <b style={{ color: VT.ink }}>{BRAND.name} на базе ИИ соберёт сайт за 2 часа</b> и дальше <b style={{ color: VT.ink }}>делает всё сам</b>: обновляет цены, ловит заявки, ведёт аналитику и публикует лучшие отзывы
      </p>

      {/* Input + CTA */}
      <div className="ss-hero-pill" style={{
        marginTop: mobile ? 24 : 36,
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
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: mobile ? '12px 14px' : '0 18px' }}>
          <IconLink />
          <span style={{ color: VT.inkFaint, fontSize: mobile ? 16 : 17 }}>
            ссылка на ваш профиль или сайт
          </span>
        </div>
        <Btn style={{ padding: mobile ? '14px 20px' : '14px 26px', borderRadius: mobile ? 10 : 999 }} iconRight={<IconArrow />}>
          Сделать {BRAND.name}
        </Btn>
      </div>

      {/* Из чего мы можем сделать сайт — compact list of supported sources */}
      <div style={{
        marginTop: mobile ? 14 : 18,
        display: 'flex', flexDirection: 'column', gap: 8,
        alignItems: mobile ? 'flex-start' : 'center',
      }}>
        <div style={{
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.1em',
          color: VT.inkFaint, fontWeight: 600,
        }}>
          ИЗ ЧЕГО МЫ МОЖЕМ СДЕЛАТЬ ВАМ САЙТ
        </div>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 8,
          justifyContent: mobile ? 'flex-start' : 'center',
        }}>
          {PLATFORMS_OK.map(p => (
            <span key={p.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '5px 11px 5px 5px',
              background: VT.white, border: `1px solid ${VT.line}`,
              borderRadius: 999,
              fontSize: 12.5, color: VT.ink, fontWeight: 500,
            }}>
              <span style={{
                width: 20, height: 20, borderRadius: 6,
                background: p.bg, color: p.fg || '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 800, letterSpacing: '-0.04em',
                flex: '0 0 auto',
              }}>{p.logo}</span>
              {p.name}
            </span>
          ))}
        </div>
      </div>

      {/* Free-month + price badge — clear stacked layout */}
      <div style={{
        marginTop: mobile ? 16 : 22,
        display: 'flex', justifyContent: mobile ? 'flex-start' : 'center',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          padding: mobile ? '10px 16px 10px 12px' : '12px 22px 12px 14px',
          background: VT.white,
          border: `1.5px solid ${VT.accent}`,
          borderRadius: 999,
          maxWidth: '100%',
          flexWrap: 'nowrap',
        }}>
          {/* gift icon pill */}
          <span style={{
            width: mobile ? 32 : 36, height: mobile ? 32 : 36, borderRadius: '50%',
            background: VT.accent, color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            flex: '0 0 auto',
          }}>
            <svg width={mobile ? 16 : 18} height={mobile ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12 V22 H4 V12"/>
              <rect x="2" y="7" width="20" height="5" rx="1"/>
              <path d="M12 22 V7"/>
              <path d="M12 7 C 12 3.5, 7.5 3.5, 7.5 7 C 7.5 7, 9.5 7, 12 7 Z"/>
              <path d="M12 7 C 12 3.5, 16.5 3.5, 16.5 7 C 16.5 7, 14.5 7, 12 7 Z"/>
            </svg>
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
            <span style={{
              fontSize: mobile ? 15 : 16, fontWeight: 700, color: VT.ink,
              letterSpacing: '-0.01em', lineHeight: 1.1,
            }}>
              Первый месяц — бесплатно
            </span>
            <span style={{
              fontSize: mobile ? 12.5 : 13.5, color: VT.inkSoft, marginTop: 2, lineHeight: 1.3,
            }}>
              далее <b style={{ color: VT.ink }}>990 ₽/мес</b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EXAMPLES SECTION

function ExamplesSection({ mobile }) {
  // Real Unsplash photos — chosen to match each business category.
  // Crop params (w / fit / crop) keep file size light and aspect stable.
  const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;

  const examples = [
    {
      handle: 'studia-anna',
      name: 'Студия Анны',
      category: 'Маникюр',
      city: 'Петрозаводск',
      palette: 'peach', tone: 'peach',
      src: 'Telegram-канала',
      logo: { letter: 'А', bg: 'oklch(0.55 0.13 30)' },
      heroPhoto: U('photo-1604654894610-df63bc536371'),
      heroFormula: 'Маникюр — без боли,\nдержится 3 недели',
      rating: '4.9',
      reviewCount: 38,
      clientsCount: '1 200+',
      phone: '+7 (111) 111-11-11',
      services: [
        ['Маникюр аппаратный', '1 500 ₽'],
        ['Маникюр + гель-лак', '2 200 ₽'],
        ['Педикюр', '2 800 ₽'],
        ['Дизайн (за ноготь)', 'от 150 ₽'],
      ],
      reviews: [
        { author: 'Наталья К.', text: 'Очень аккуратно и бережно, форма держится 3 недели. Записываюсь только сюда!', rating: 5 },
        { author: 'Мария Л.', text: 'Чисто, спокойно, всегда вовремя. Кофе тоже вкусный 🙂', rating: 5 },
      ],
      gallery: [
        { src: U('photo-1607779097040-26e80aa78e66', 300) },
        { src: U('photo-1610992015732-2449b76344bc', 300) },
        { src: U('photo-1632345031435-8727f6897d53', 300) },
        { src: U('photo-1604902396830-aca29e19b067', 300) },
      ],
    },
    {
      handle: 'brest-barber',
      name: 'Барбер Brest',
      category: 'Барбершоп',
      city: 'Самара',
      palette: 'slate', tone: 'slate',
      src: 'Яндекс.Карт',
      logo: { letter: 'B', bg: 'oklch(0.32 0.04 250)' },
      heroPhoto: U('photo-1503951914875-452162b0f3f1'),
      heroFormula: 'Стрижки за час —\nкак вы любите',
      rating: '5.0',
      reviewCount: 47,
      clientsCount: '850+',
      phone: '+7 (111) 111-11-11',
      services: [
        ['Стрижка машинкой', '1 200 ₽'],
        ['Ножницы + укладка', '1 800 ₽'],
        ['Борода', '900 ₽'],
        ['Папа + сын', '2 200 ₽'],
      ],
      reviews: [
        { author: 'Артём В.', text: 'Стригусь второй год — Дима всегда чувствует, чего хочется, даже когда сам не знаю.', rating: 5 },
        { author: 'Иван П.', text: 'Удобная запись через сайт, музыка норм, кофе ждёт. Цена адекватная.', rating: 5 },
      ],
      gallery: [
        { src: U('photo-1599351431202-1e0f0137899a', 300) },
        { src: U('photo-1585747860715-2ba37e788b70', 300) },
        { src: U('photo-1622286342621-4bd786c2447c', 300) },
        { src: U('photo-1521490683312-b1aa64c1e0e2', 300) },
      ],
    },
    {
      handle: 'lotos-yoga',
      name: 'Школа йоги Лотос',
      category: 'Хатха-йога',
      city: 'Краснодар',
      palette: 'sage', tone: 'sage',
      src: 'фото визитки',
      logo: { letter: 'Л', bg: 'oklch(0.45 0.11 145)' },
      heroPhoto: U('photo-1545205597-3d9d02c29597'),
      heroFormula: 'Хатха-йога —\nдля тех, у кого болит спина',
      rating: '4.8',
      reviewCount: 14,
      clientsCount: '320+',
      phone: '+7 (111) 111-11-11',
      services: [
        ['Утренняя практика · 60м', '700 ₽'],
        ['Глубокая · 90м', '1 100 ₽'],
        ['Парная · 90м', '1 600 ₽'],
        ['Абонемент 8 занятий', '5 200 ₽'],
      ],
      reviews: [
        { author: 'Анна С.', text: 'После занятий тело другое — спина наконец-то расслабилась. Олег очень внимательный.', rating: 5 },
        { author: 'Дарья Н.', text: 'Атмосфера тёплая, без эзотерики. Группы маленькие, всё видно.', rating: 5 },
      ],
      gallery: [
        { src: U('photo-1575052814086-f385e2e2ad1b', 300) },
        { src: U('photo-1599901860904-17e6ed7083a0', 300) },
        { src: U('photo-1506126613408-eca07ce68773', 300) },
        { src: U('photo-1532798442725-41036acc7489', 300) },
      ],
    },
  ];

  // shared bit: caption above + card
  const CardWithCaption = ({ ex, isCarousel = false }) => (
    <div key={ex.name} style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      ...(isCarousel ? { flex: '0 0 86%', scrollSnapAlign: 'start' } : {}),
    }}>
      {/* Caption — placed ABOVE the card */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        marginBottom: 14,
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', background: VT.accent, flex: '0 0 auto',
        }} />
        <span style={{
          fontSize: mobile ? 14.5 : 16, fontWeight: 600, color: VT.ink,
          letterSpacing: '-0.015em',
        }}>Собран из {ex.src}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        <SiteCard {...ex} mobile={mobile} />
      </div>
    </div>
  );

  return (
    <section style={{ marginTop: mobile ? 60 : 96, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <SectionTitle mobile={mobile}>Вот какой сайт вы получите<br/>через несколько минут</SectionTitle>
        <SectionSub mobile={mobile}>
          Реальные сайты, которые {BRAND.name} собрал из разных источников — с вашими фото, услугами и лучшими отзывами
        </SectionSub>
      </div>

      {mobile ? (
        <div style={{
          marginTop: 28,
          marginLeft: -20, marginRight: -20,
          overflowX: 'auto', overflowY: 'visible',
          WebkitOverflowScrolling: 'touch',
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: 20,
          scrollbarWidth: 'none',
        }}>
          <style>{`.ss-carousel::-webkit-scrollbar { display: none; }`}</style>
          <div className="ss-carousel" style={{
            display: 'flex', gap: 14, padding: '0 20px 24px', alignItems: 'flex-start',
          }}>
            {examples.map(ex => <CardWithCaption key={ex.name} ex={ex} isCarousel />)}
            <div style={{ flex: '0 0 6px' }} aria-hidden="true" />
          </div>
        </div>
      ) : (
        <div style={{
          marginTop: 48,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gridAutoRows: '1fr',
          gap: 24, maxWidth: 1280,
          margin: '48px auto 0',
          alignItems: 'stretch',
        }}>
          {examples.map(ex => <CardWithCaption key={ex.name} ex={ex} />)}
        </div>
      )}

      {/* Single big CTA below all 3 cards */}
      <div style={{
        marginTop: mobile ? 28 : 44,
        textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <a href="#hero" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: VT.accent, color: '#fff', fontWeight: 700,
          padding: mobile ? '14px 24px' : '16px 32px',
          borderRadius: 999, fontSize: mobile ? 16 : 17,
          textDecoration: 'none',
          boxShadow: '0 12px 28px -12px rgba(120,60,30,0.45)',
          letterSpacing: '-0.005em',
        }}>Сделать себе такой {BRAND.name} <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// STORY SECTION — colorful, playful zig-zag layout
// Each step gets its own tint + decoration; layout alternates left/right on
// desktop; wavy connector ties them together.

const STEP_PALETTES = [
  { bg: 'oklch(0.95 0.05 40)',  ink: 'oklch(0.32 0.14 35)',  dec: 'oklch(0.86 0.10 40)'  }, // peach
  { bg: 'oklch(0.94 0.06 95)',  ink: 'oklch(0.36 0.12 85)',  dec: 'oklch(0.84 0.12 90)'  }, // butter
  { bg: 'oklch(0.94 0.05 200)', ink: 'oklch(0.34 0.10 220)', dec: 'oklch(0.82 0.08 210)' }, // sky
  { bg: 'oklch(0.94 0.05 145)', ink: 'oklch(0.32 0.11 145)', dec: 'oklch(0.82 0.08 145)' }, // sage
  { bg: 'oklch(0.94 0.06 25)',  ink: 'oklch(0.36 0.13 22)',  dec: 'oklch(0.82 0.10 22)'  }, // rose
  { bg: 'oklch(0.94 0.05 285)', ink: 'oklch(0.34 0.10 285)', dec: 'oklch(0.82 0.08 285)' }, // lavender
];

function StepGlyph({ palette, kind, size }) {
  const stroke = palette.ink;
  const fill = palette.dec;
  const sz = size * 0.62;
  const wrap = (kids) => (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#fff',
      border: `2px solid ${palette.ink}`,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      color: palette.ink,
      boxShadow: `4px 4px 0 0 ${palette.ink}`,
    }}>{kids}</div>
  );
  switch (kind) {
    case 'link':
      return wrap(
        <svg viewBox="0 0 64 64" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M28 36 a8 8 0 0 1 0 -11 l6 -6 a8 8 0 0 1 11 11 l-3 3"/>
          <path d="M36 28 a8 8 0 0 1 0 11 l-6 6 a8 8 0 0 1 -11 -11 l3 -3"/>
        </svg>
      );
    case 'ai':
      return wrap(
        <svg viewBox="0 0 64 64" width={sz} height={sz} fill="currentColor">
          <path d="M32 8 L36 24 L52 28 L36 32 L32 48 L28 32 L12 28 L28 24 Z"/>
          <circle cx="50" cy="50" r="3.5"/>
          <circle cx="15" cy="48" r="2.5"/>
        </svg>
      );
    case 'globe':
      return wrap(
        <svg viewBox="0 0 64 64" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <circle cx="32" cy="32" r="22"/>
          <ellipse cx="32" cy="32" rx="10" ry="22"/>
          <path d="M10 32h44"/>
        </svg>
      );
    case 'refresh':
      return wrap(
        <svg viewBox="0 0 64 64" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 32 a18 18 0 0 1 30 -13"/>
          <path d="M44 12 L44 22 L34 22"/>
          <path d="M50 32 a18 18 0 0 1 -30 13"/>
          <path d="M20 52 L20 42 L30 42"/>
        </svg>
      );
    case 'inbox':
      return wrap(
        <svg viewBox="0 0 64 64" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round">
          <rect x="10" y="14" width="44" height="36" rx="5"/>
          <path d="M10 34 L22 34 L26 40 L38 40 L42 34 L54 34"/>
        </svg>
      );
    case 'chart':
      return wrap(
        <svg viewBox="0 0 64 64" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 48 L24 30 L34 38 L54 14"/>
          <path d="M44 14 L54 14 L54 24"/>
        </svg>
      );
  }
}

// Decorative dots/shapes scattered around a card
function StepDecor({ palette, side }) {
  const dot = (style) => (
    <span style={{
      position: 'absolute', borderRadius: '50%', background: palette.dec, ...style,
    }} />
  );
  const ring = (style) => (
    <span style={{
      position: 'absolute', borderRadius: '50%',
      border: `2.5px solid ${palette.ink}`, ...style,
    }} />
  );
  return (
    <>
      {dot({ width: 16, height: 16, top: -8, right: 24, opacity: 0.9 })}
      {ring({ width: 22, height: 22, bottom: -10, left: 30 })}
      {dot({ width: 10, height: 10, top: 40, right: -6, opacity: 0.7 })}
      <svg width="20" height="20" viewBox="0 0 20 20" style={{ position: 'absolute', top: -10, left: side === 'left' ? 60 : 'auto', right: side === 'right' ? 60 : 'auto' }}>
        <path d="M10 1 L12 8 L19 10 L12 12 L10 19 L8 12 L1 10 L8 8 Z" fill={palette.dec} stroke={palette.ink} strokeWidth="1.2" strokeLinejoin="round"/>
      </svg>
    </>
  );
}

function StoryStepColorful({ idx, total, title, body, kind, mobile, palette }) {
  const side = idx % 2 === 0 ? 'right' : 'left';
  const glyphSize = mobile ? 84 : 108;
  const last = idx === total - 1;

  return (
    <div style={{ position: 'relative' }}>
      {/* Card */}
      <div className="ss-story-card" style={{
        background: palette.bg,
        border: `2px solid ${palette.ink}`,
        borderRadius: 22,
        padding: mobile ? '22px 20px' : '32px 36px',
        display: 'flex',
        flexDirection: mobile ? 'row' : (side === 'left' ? 'row' : 'row-reverse'),
        gap: mobile ? 18 : 32,
        alignItems: 'center',
        position: 'relative',
        boxShadow: `6px 6px 0 0 ${palette.ink}`,
        maxWidth: mobile ? '100%' : 760,
        marginLeft: mobile ? 0 : (side === 'left' ? 0 : 'auto'),
        marginRight: mobile ? 0 : (side === 'left' ? 'auto' : 0),
      }}>
        <StepDecor palette={palette} side={side} />

        {/* Glyph + sticker number */}
        <div style={{ position: 'relative', flex: '0 0 auto' }}>
          <StepGlyph palette={palette} kind={kind} size={glyphSize} />
          {/* sticker number — rotated tag */}
          <div style={{
            position: 'absolute',
            top: -10, left: -14,
            transform: 'rotate(-12deg)',
            background: palette.ink, color: '#fff',
            fontFamily: VT.font.mono, fontSize: 12, fontWeight: 600,
            padding: '4px 10px', borderRadius: 999,
            letterSpacing: '0.08em',
            boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
          }}>ШАГ {idx + 1}</div>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <h3 style={{
            fontSize: mobile ? 19 : 24,
            fontWeight: 700, letterSpacing: '-0.022em',
            margin: 0, lineHeight: 1.15,
            color: palette.ink,
          }}>{title}</h3>
          <p style={{
            fontSize: mobile ? 14.5 : 16,
            lineHeight: 1.5, color: 'oklch(0.32 0.02 60)',
            margin: '8px 0 0', textWrap: 'pretty',
          }}>{body}</p>
        </div>
      </div>

      {/* Wavy connector to next step (skipped on last) */}
      {!last && (
        <div style={{
          position: 'relative', height: mobile ? 36 : 56,
          display: 'flex', justifyContent: 'center',
        }}>
          <svg
            viewBox="0 0 80 60" preserveAspectRatio="none"
            width={mobile ? 50 : 70} height="100%"
            style={{ overflow: 'visible' }}
          >
            <path
              d="M40 0 C 20 20, 60 40, 40 60"
              fill="none"
              stroke={palette.ink}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="2 8"
            />
            {/* tiny arrowhead at end */}
            <path
              d="M34 52 L40 60 L46 52"
              fill="none" stroke={palette.ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

function StorySection({ mobile }) {
  const steps = [
    { kind: 'link',    title: 'Дайте ссылку на ваше дело',
      body: 'Страница на Яндекс.Картах, ваш Telegram-канал, профиль на Avito или просто фото визитки. Подойдёт всё, что у вас уже есть.' },
    { kind: 'ai',      title: 'ИИ соберёт продающий сайт',
      body: 'Найдёт услуги, цены, отзывы и фото. Сам напишет тексты, подберёт цвета и сложит в красивую галерею. За пару минут.' },
    { kind: 'globe',   title: 'Сайт появится на своём адресе',
      body: <>На <Mono style={{ fontSize: mobile ? 14 : 15, color: VT.ink }}>{`<ваш-сайт>.${BRAND.domain}`}</Mono> или подключите свой домен. Защищённый https, индексация в Яндексе и Google — из коробки.</> },
    { kind: 'refresh', title: 'Сам обновляется — или вы добавляете',
      body: 'Раз в неделю забирает свежие посты из источника. А если добавили новую услугу — просто пришлите фото и текст в личном кабинете, сайт обновится.' },
    { kind: 'inbox',   title: 'Заявки летят к вам в мессенджер',
      body: 'Клиент жмёт «Записаться» — вам приходит уведомление в Telegram, MAX или на почту. Никакого CRM — всё там, где вы и так читаете.' },
    { kind: 'chart',   title: 'Аналитика и полный контроль',
      body: 'Сколько людей зашли, откуда и сколько оставили заявок. В личном кабинете можно поправить, поставить на паузу или удалить сайт — в одно нажатие.' },
  ];

  return (
    <section style={{ marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <SectionTitle mobile={mobile}>От вас — одно действие,<br/>всё остальное {BRAND.name} сделает сам</SectionTitle>
      </div>

      <div style={{
        marginTop: mobile ? 32 : 56,
        maxWidth: mobile ? '100%' : 960,
        margin: `${mobile ? 32 : 56}px auto 0`,
        display: 'flex', flexDirection: 'column',
      }}>
        {steps.map((s, i) => (
          <StoryStepColorful
            key={s.title}
            idx={i}
            total={steps.length}
            kind={s.kind}
            title={s.title}
            body={s.body}
            mobile={mobile}
            palette={STEP_PALETTES[i % STEP_PALETTES.length]}
          />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PLATFORMS SECTION

function PlatformsSection({ mobile }) {
  const [featured, ...rest] = PLATFORMS_OK;

  return (
    <section style={{ marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1 }} id="sources">
      <div style={{ textAlign: 'center' }}>
        <SectionTitle mobile={mobile}>Что подойдёт<br/>для создания {BRAND.name}а</SectionTitle>
        <SectionSub mobile={mobile}>
          Подойдёт любая ссылка, где про вас уже что-то написано или показано
        </SectionSub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 56,
        maxWidth: mobile ? '100%' : 1080,
        margin: `${mobile ? 28 : 56}px auto 0`,
      }}>
        {/* featured platform — Я.Карты full-width */}
        <PlatformCard p={featured} featured mobile={mobile} />

        {/* rest — 5 cards in 3-2 grid */}
        <div style={{
          marginTop: mobile ? 10 : 14,
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
          gap: mobile ? 10 : 14,
        }}>
          {rest.slice(0, 3).map(p => <PlatformCard key={p.id} p={p} mobile={mobile} />)}
        </div>
        <div style={{
          marginTop: mobile ? 10 : 14,
          display: 'grid',
          gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
          gap: mobile ? 10 : 14,
        }}>
          {rest.slice(3).map(p => <PlatformCard key={p.id} p={p} mobile={mobile} />)}
        </div>

        {/* soon — inline pills with light email capture */}
        <div style={{
          marginTop: mobile ? 28 : 36,
          padding: mobile ? '20px 18px' : '22px 24px',
          background: VT.bgSoft,
          border: `1px dashed ${VT.line}`,
          borderRadius: 18,
        }}>
          <div style={{
            display: 'flex', alignItems: mobile ? 'flex-start' : 'center',
            justifyContent: 'space-between', gap: 16,
            flexDirection: mobile ? 'column' : 'row',
            flexWrap: 'wrap',
          }}>
            <div style={{
              fontFamily: VT.font.mono, fontSize: 11.5, letterSpacing: '0.14em',
              color: VT.inkSoft, fontWeight: 600,
            }}>
              СКОРО ПОДКЛЮЧИМ
            </div>
            <a style={{
              fontSize: 13, color: VT.accent, textDecoration: 'underline',
              textUnderlineOffset: 3, cursor: 'pointer',
            }}>Нет вашей? Напишите →</a>
          </div>
          <div style={{
            marginTop: 14,
            display: 'flex', flexWrap: 'wrap', gap: 8,
          }}>
            {PLATFORMS_SOON.map(p => <PlatformSoonPill key={p.id} p={p} mobile={mobile} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// BIG FEATURES — 8 «сам» cards in 4×2 grid + tall «А вы — хозяин» closer

function FeatureGlyph({ kind, size = 44, tint }) {
  const color = tint?.fg || VT.accentInk;
  const bg    = tint?.bg || VT.accentSoft;
  const wrap = (kids) => (
    <div style={{
      width: size, height: size, borderRadius: 14,
      background: bg, color,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flex: '0 0 auto',
    }}>{kids}</div>
  );
  const s = size * 0.6;
  switch (kind) {
    case 'sparkles':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
          <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"/>
          <circle cx="19" cy="19" r="1.6"/>
          <circle cx="5" cy="17" r="1.2"/>
        </svg>
      );
    case 'refresh':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12 a9 9 0 0 1 15 -6.5"/>
          <path d="M18 3 v4 h-4"/>
          <path d="M21 12 a9 9 0 0 1 -15 6.5"/>
          <path d="M6 21 v-4 h4"/>
        </svg>
      );
    case 'star':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="currentColor">
          <path d="M12 2 L14.6 8.6 L21.6 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.4 9.3 L9.4 8.6 Z"/>
        </svg>
      );
    case 'inbox':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <rect x="3" y="5" width="18" height="14" rx="2"/>
          <path d="M3 14 h5 l1.5 2 h5 L16 14 h5"/>
        </svg>
      );
    case 'bar':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="M4 20 V12"/>
          <path d="M10 20 V6"/>
          <path d="M16 20 V14"/>
          <path d="M22 20 V9"/>
        </svg>
      );
    case 'search':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="11" cy="11" r="6.5"/>
          <path d="M16 16 L21 21"/>
        </svg>
      );
    case 'phone':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <rect x="6" y="2.5" width="12" height="19" rx="2.5"/>
          <path d="M11 18.5 h2"/>
        </svg>
      );
    case 'shield':
      return wrap(
        <svg viewBox="0 0 24 24" width={s} height={s} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z"/>
          <path d="M8.5 12 L11 14.5 L15.5 9.5"/>
        </svg>
      );
  }
}

function FeatureCard({ heading, subtitle, body, kind, mobile, tint, idx }) {
  return (
    <div className="ss-card-lift" style={{
      background: tint?.cardBg || VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 22,
      padding: mobile ? 22 : 28,
      display: 'flex', flexDirection: 'column', gap: 14,
      height: '100%',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Big translucent index number — decorative */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: -14, right: -4,
        fontFamily: VT.font.mono, fontSize: 96, fontWeight: 800,
        color: tint?.fg, opacity: 0.22,
        letterSpacing: '-0.06em', lineHeight: 1, pointerEvents: 'none',
        zIndex: 0,
      }}>0{idx + 1}</span>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <FeatureGlyph kind={kind} size={mobile ? 56 : 64} tint={tint} />
      </div>

      <h3 style={{
        fontSize: mobile ? 24 : 28, fontWeight: 800, letterSpacing: '-0.032em',
        margin: '6px 0 0', lineHeight: 1.05, color: VT.ink,
        position: 'relative', zIndex: 1,
      }}>{heading}</h3>

      <div style={{
        fontSize: mobile ? 14.5 : 15.5, fontWeight: 700, color: tint?.fg || VT.accent,
        lineHeight: 1.35, letterSpacing: '-0.005em',
        position: 'relative', zIndex: 1,
      }}>{subtitle}</div>

      <p style={{
        fontSize: mobile ? 14 : 14.5, lineHeight: 1.55, color: VT.inkSoft,
        margin: 0, textWrap: 'pretty',
        position: 'relative', zIndex: 1,
      }}>{body}</p>
    </div>
  );
}

// per-icon palette so 8 cards have rhythm without being a carnival
const FEATURE_TINTS = {
  sparkles: { bg: 'oklch(0.93 0.05 40)',  fg: 'oklch(0.42 0.14 35)',  cardBg: VT.white },
  refresh:  { bg: 'oklch(0.93 0.06 95)',  fg: 'oklch(0.42 0.12 80)',  cardBg: VT.bgSoft },
  star:     { bg: 'oklch(0.93 0.05 60)',  fg: 'oklch(0.45 0.13 55)',  cardBg: VT.white },
  inbox:    { bg: 'oklch(0.93 0.05 200)', fg: 'oklch(0.36 0.10 220)', cardBg: VT.bgSoft },
  bar:      { bg: 'oklch(0.93 0.05 145)', fg: 'oklch(0.35 0.11 145)', cardBg: VT.bgSoft },
  search:   { bg: 'oklch(0.92 0.05 285)', fg: 'oklch(0.38 0.11 285)', cardBg: VT.white },
  phone:    { bg: 'oklch(0.92 0.05 25)',  fg: 'oklch(0.40 0.13 22)',  cardBg: VT.white },
  shield:   { bg: 'oklch(0.92 0.06 145)', fg: 'oklch(0.35 0.11 145)', cardBg: VT.bgSoft },
};

function BigFeaturesSection({ mobile }) {
  const features = [
    { kind: 'sparkles', heading: 'Сам соберётся',          subtitle: 'Дайте ссылку — соберётся за 2 часа',
      body: <>Дайте ссылку на Яндекс.Карты, Telegram-канал или просто фото визитки — {BRAND.name} за 2 часа найдёт услуги, цены, отзывы и фото. Сам напишет тексты и подберёт оформление.</> },
    { kind: 'refresh',  heading: 'Сам обновится',          subtitle: 'Каждую неделю — свежие посты, фото и цены',
      body: 'Забирает свежие посты, новые цены и фото из источника. Поменяли прайс в Яндекс.Картах — на сайте уже новый.' },
    { kind: 'star',     heading: 'Сам отберёт отзывы',     subtitle: 'На сайте — только лучшие',
      body: 'Прочитает все отзывы клиентов, отсеет «норм», тройки и троллей. Поставит на сайт 4–6 самых тёплых. Появился сильнее — заменит.' },
    { kind: 'inbox',    heading: 'Сам поймает заявку',     subtitle: 'В Telegram, MAX или почту',
      body: 'Клиент жмёт «Записаться» — уведомление падает в Telegram, MAX или на почту. Без CRM, без личных кабинетов, без забытых заявок.' },
    { kind: 'bar',      heading: 'Сам посчитает',          subtitle: 'Короткая сводка раз в неделю',
      body: 'Сколько людей зашли, откуда пришли, сколько оставили заявок. Без графиков — на человеческом языке.' },
    { kind: 'search',   heading: 'Сам попадёт в поиск',    subtitle: 'Клиенты найдут вас в Яндексе и Google',
      body: 'Сразу настроены индексация в Яндексе и Google, защищённый https, разметка для карт и поисковиков. Ничего настраивать не нужно.' },
    { kind: 'phone',    heading: 'Сам подстроится под телефон', subtitle: '80% клиентов зайдут с мобильного',
      body: `${BRAND.name} собирается так, чтобы на телефоне всё было удобно. Никаких отдельных мобильных версий.` },
    { kind: 'shield',   heading: 'Сам защитится от спама', subtitle: 'Только живые заявки — без ботов',
      body: 'Форма с антибот-проверкой, которую настоящий клиент даже не замечает. Боты получают тишину, вам приходят только заявки от людей.' },
  ];

  return (
    <section style={{ marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center', maxWidth: mobile ? '100%' : 800, margin: '0 auto' }}>
        <SectionTitle mobile={mobile}>Восемь «сам» —<br/>поэтому он {BRAND.name}</SectionTitle>
        <SectionSub mobile={mobile}>
          {BRAND.name} — это не один трюк, а восемь вещей, которые он делает сам — от первого «давайте посмотрим» до недельной аналитики
        </SectionSub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 56,
        maxWidth: mobile ? '100%' : 1240,
        margin: `${mobile ? 28 : 56}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(4, 1fr)',
        gap: mobile ? 14 : 18,
      }}>
        {features.map((f, i) => (
          <FeatureCard key={f.heading} {...f} idx={i} mobile={mobile} tint={FEATURE_TINTS[f.kind]} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// OWNERSHIP — flip from «product does it» to «what stays with you»
// Real visual mock of the user's control panel + portability bullets.

function ControlPanelMock({ mobile }) {
  return (
    <div style={{
      background: VT.white,
      border: `1px solid ${VT.line}`,
      borderRadius: 18,
      overflow: 'hidden',
      boxShadow: '0 24px 48px -24px rgba(120,60,30,0.25)',
    }}>
      {/* faux window chrome */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '10px 14px',
        background: VT.bgSoft, borderBottom: `1px solid ${VT.line}`,
      }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.74 0.13 25)' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.82 0.13 85)' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.78 0.13 145)' }} />
        <span style={{ marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }}>
          Личный кабинет — {BRAND.domain}
        </span>
      </div>

      <div style={{ padding: mobile ? 18 : 22 }}>
        {/* site row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 8px, ${VT.bgSoft} 8px 16px)`,
            border: `1px solid ${VT.line}`,
          }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: VT.ink, letterSpacing: '-0.01em' }}>
              студия-анны.{BRAND.domain}
            </div>
            <div style={{
              fontSize: 12, color: VT.success,
              display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 2,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: VT.success }} />
              опубликован · обновлён сегодня в 14:02
            </div>
          </div>
        </div>

        {/* mini stats */}
        <div style={{
          marginTop: 18,
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10,
        }}>
          {[
            { num: '347', lbl: 'посетителей', tone: 'ink' },
            { num: '14',  lbl: 'заявок',      tone: 'accent' },
            { num: '4.9', lbl: 'оценка',      tone: 'ink' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '12px 12px',
              background: VT.bgSoft,
              borderRadius: 12,
            }}>
              <div style={{
                fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em',
                color: s.tone === 'accent' ? VT.accent : VT.ink, lineHeight: 1,
              }}>{s.num}</div>
              <div style={{ fontSize: 11.5, color: VT.inkFaint, marginTop: 3 }}>{s.lbl}</div>
            </div>
          ))}
        </div>

        {/* recent leads */}
        <div style={{
          marginTop: 16,
          fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.1em',
          color: VT.inkFaint, fontWeight: 600,
        }}>ПОСЛЕДНИЕ ЗАЯВКИ</div>
        <div style={{
          marginTop: 8, display: 'flex', flexDirection: 'column', gap: 6,
        }}>
          {[
            ['Анна П.',  '+7 999 111-11-11', '14:32 · TG'],
            ['Юлия В.',  '@example_user',     '12:18 · TG'],
            ['Михаил С.', '+7 999 222-22-22', 'вчера · телефон'],
          ].map(([nm, contact, time], i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 10px',
              background: VT.white, border: `1px solid ${VT.lineSoft}`, borderRadius: 8,
              fontSize: 12.5,
            }}>
              <span style={{ fontWeight: 600, color: VT.ink, minWidth: 70 }}>{nm}</span>
              <span style={{ fontFamily: VT.font.mono, color: VT.inkSoft, flex: 1 }}>{contact}</span>
              <span style={{ fontFamily: VT.font.mono, color: VT.inkFaint, fontSize: 11 }}>{time}</span>
            </div>
          ))}
        </div>

        {/* action chips */}
        <div style={{
          marginTop: 16,
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8,
        }}>
          {[
            ['✎  Редактировать тексты',    VT.accent, VT.accentSoft, true],
            ['🖼  Заменить фото',          VT.ink,    VT.bgSoft,     false],
            ['⏸  Поставить на паузу',     VT.inkSoft, VT.bgSoft,    false],
            ['↓  Скачать архив',          VT.inkSoft, VT.bgSoft,    false],
          ].map(([label, fg, bg, primary], i) => (
            <div key={i} style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: bg,
              color: fg,
              border: primary ? `1px solid ${VT.accent}` : `1px solid ${VT.line}`,
              fontSize: 13, fontWeight: primary ? 600 : 500,
            }}>{label}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ANALYTICS — preview of the dashboard analytics + delivery note

function AnalyticsSection({ mobile }) {
  const stats = [
    { num: '2 847', delta: '+18%', label: 'посещений за 30 дней', tone: 'ink', color: VT.accent,
      sparkline: [210, 198, 215, 240, 232, 260, 275, 290, 280, 295, 310, 325, 345, 360] },
    { num: '78',    delta: '+34%', label: 'заявок принято',       tone: 'accent', color: 'oklch(0.55 0.12 145)',
      sparkline: [2, 3, 4, 3, 5, 4, 5, 6, 5, 7, 6, 8, 7, 9] },
    { num: '2.7%',  delta: '+0.4пп', label: 'конверсия в заявку', tone: 'ink', color: 'oklch(0.55 0.15 35)',
      sparkline: [2.1, 2.2, 2.3, 2.2, 2.4, 2.3, 2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.8] },
    { num: '4.9★',  delta: '+0.1',   label: 'средняя оценка',     tone: 'ink', color: 'oklch(0.55 0.15 75)',
      sparkline: [4.5, 4.6, 4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9] },
  ];

  // Big traffic chart
  const days = 30;
  const visits = Array.from({ length: days }, (_, i) =>
    Math.round(80 + 40 * Math.sin(i * 0.6) + 60 * (i / days) + (i % 7 === 0 ? 30 : 0))
  );
  const leads = visits.map(v => Math.round(v * (0.04 + (Math.sin(v) + 1) * 0.02)));
  const W = 720, H = 220, PAD = { top: 16, right: 16, bottom: 28, left: 36 };
  const inner = { w: W - PAD.left - PAD.right, h: H - PAD.top - PAD.bottom };
  const maxV = Math.max(...visits) * 1.15;
  const xFor = i => PAD.left + (i / (days - 1)) * inner.w;
  const yFor = v => PAD.top + inner.h - (v / maxV) * inner.h;
  const visitsPath = visits.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(v)}`).join(' ');
  const visitsArea = `${visitsPath} L ${xFor(days - 1)} ${yFor(0)} L ${xFor(0)} ${yFor(0)} Z`;
  const xLabels = [0, 7, 14, 21, 29];
  const xLabelText = ['1 мая', '8 мая', '15 мая', '22 мая', '30 мая'];

  // Sources
  const sources = [
    { name: 'Яндекс.Карты', share: 45, color: '#FFCC00' },
    { name: 'Telegram',     share: 28, color: '#229ED9' },
    { name: 'Прямые',       share: 15, color: VT.accent },
    { name: '2ГИС',         share:  8, color: '#19BB4F' },
    { name: 'Google',       share:  4, color: 'oklch(0.55 0.18 25)' },
  ];

  // Mini sparkline render fn
  function Sparkline({ points, color }) {
    const w = 100, h = 28;
    const min = Math.min(...points), max = Math.max(...points);
    const range = (max - min) || 1;
    const xs = points.map((_, i) => (i / (points.length - 1)) * w);
    const ys = points.map(p => h - ((p - min) / range) * (h - 4) - 2);
    const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
    const area = `${path} L ${w} ${h} L 0 ${h} Z`;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none">
        <path d={area} fill={color} fillOpacity="0.12" />
        <path d={path} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <section style={{
      marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1,
      maxWidth: mobile ? '100%' : 1200,
      margin: `${mobile ? 64 : 110}px auto 0`,
    }}>
      <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <SectionTitle mobile={mobile}>Видите всё,<br/>что происходит с сайтом</SectionTitle>
        <SectionSub mobile={mobile}>
          Сколько людей зашли, откуда пришли и сколько оставили заявок — в одном экране. {BRAND.name} ещё пришлёт сводку куда скажете — в Telegram, MAX или на почту
        </SectionSub>
      </div>

      {/* analytics card */}
      <div className="ss-card-lift" style={{
        marginTop: mobile ? 28 : 48,
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 22, padding: mobile ? 20 : 28,
        boxShadow: '0 24px 48px -24px rgba(120,60,30,0.18)',
      }}>
        {/* faux window chrome */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          paddingBottom: 14, borderBottom: `1px solid ${VT.lineSoft}`, marginBottom: 18,
        }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.74 0.13 25)' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.82 0.13 85)' }} />
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'oklch(0.78 0.13 145)' }} />
          <span style={{ marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }}>
            Личный кабинет · аналитика
          </span>
        </div>

        {/* 4 stat cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: mobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          gap: 12,
        }}>
          {stats.map(s => (
            <div key={s.label} style={{
              padding: 14, background: VT.bgSoft, borderRadius: 14,
              display: 'flex', flexDirection: 'column', gap: 6,
            }}>
              <div style={{ fontSize: 12, color: VT.inkFaint, fontWeight: 500 }}>{s.label}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', color: s.tone === 'accent' ? VT.accent : VT.ink, lineHeight: 1 }}>{s.num}</span>
                <span style={{ fontFamily: VT.font.mono, fontSize: 12, fontWeight: 600, color: VT.success }}>↑ {s.delta}</span>
              </div>
              <Sparkline points={s.sparkline} color={s.color} />
            </div>
          ))}
        </div>

        {/* big chart + source breakdown */}
        <div style={{
          marginTop: 18,
          display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1.6fr 1fr', gap: 16,
        }}>
          {/* chart */}
          <div style={{ background: VT.bgSoft, borderRadius: 14, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 10, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: VT.ink }}>Трафик за 30 дней</div>
              <div style={{ display: 'inline-flex', gap: 12, fontSize: 11.5, color: VT.inkSoft, marginLeft: 'auto' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.accent }} />посещения
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <span style={{ width: 8, height: 2, background: 'oklch(0.5 0.13 240)' }} />заявки
                </span>
              </div>
            </div>
            <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={mobile ? 180 : H} preserveAspectRatio="none" style={{ display: 'block' }}>
              {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
                <g key={i}>
                  <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + inner.h * t} y2={PAD.top + inner.h * t}
                        stroke={VT.lineSoft} strokeWidth="1" />
                  <text x={PAD.left - 8} y={PAD.top + inner.h * t + 4} fontSize="10" fill={VT.inkFaint} textAnchor="end" fontFamily={VT.font.mono}>
                    {Math.round(maxV * (1 - t))}
                  </text>
                </g>
              ))}
              <path d={visitsArea} fill={VT.accent} fillOpacity="0.10" />
              <path d={visitsPath} fill="none" stroke={VT.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {leads.map((l, i) => (
                <rect key={i} x={xFor(i) - 2} y={yFor(l * 10)} width="4" height={PAD.top + inner.h - yFor(l * 10)} fill="oklch(0.5 0.13 240)" opacity="0.5" rx="1" />
              ))}
              {xLabels.map((i, k) => (
                <text key={k} x={xFor(i)} y={H - 8} fontSize="11" fill={VT.inkFaint} textAnchor="middle">{xLabelText[k]}</text>
              ))}
            </svg>
          </div>

          {/* source breakdown */}
          <div style={{ background: VT.bgSoft, borderRadius: 14, padding: 16 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: VT.ink, marginBottom: 4 }}>Откуда приходят</div>
            <div style={{ fontSize: 11.5, color: VT.inkFaint, marginBottom: 14 }}>{BRAND.name} держит карточки свежими — поэтому Я.Карты #1</div>
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 12 }}>
              {sources.map(s => <span key={s.name} style={{ width: `${s.share}%`, background: s.color }} />)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {sources.map(s => (
                <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: VT.ink }}>
                  <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color, flex: '0 0 auto' }} />
                  <span style={{ flex: 1 }}>{s.name}</span>
                  <b style={{ fontFamily: VT.font.mono, color: VT.ink }}>{s.share}%</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Delivery note */}
      <div style={{
        marginTop: mobile ? 18 : 24,
        display: 'flex', flexDirection: mobile ? 'column' : 'row',
        alignItems: mobile ? 'flex-start' : 'center',
        gap: mobile ? 10 : 14,
        padding: mobile ? '14px 16px' : '14px 20px',
        background: VT.accentSoft, borderRadius: 14,
        maxWidth: 760, margin: `${mobile ? 18 : 24}px auto 0`,
      }}>
        <span style={{
          width: 36, height: 36, borderRadius: 10,
          background: VT.accent, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flex: '0 0 auto',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
            <path d="M22 2 L11 13"/><path d="M22 2 L15 22 L11 13 L2 9 L22 2 Z"/>
          </svg>
        </span>
        <div style={{ fontSize: mobile ? 13.5 : 14.5, color: VT.accentInk, lineHeight: 1.45, flex: 1 }}>
          <b style={{ color: VT.accentInk }}>Кратко и регулярно</b> — {BRAND.name} пришлёт сводку аналитики, куда скажете: в Telegram, MAX или на почту. Не нужно заходить в кабинет, чтобы знать как идут дела
        </div>
      </div>
    </section>
  );
}

function OwnershipSection({ mobile }) {
  const bullets = [
    ['Полный контроль', 'Правьте тексты, заменяйте фото, ставьте на паузу — в одно нажатие.'],
    ['Сайт ваш',        'Заберёте файлы или унесёте на другой домен — в любой момент.'],
    ['Аналитика тоже',  'Видите кто пришёл, откуда и сколько оставил заявок.'],
    ['Удалить за секунду', 'Передумали — нажали «удалить». Никаких звонков в поддержку.'],
  ];

  return (
    <section style={{
      marginTop: mobile ? 56 : 96, position: 'relative', zIndex: 1,
      maxWidth: mobile ? '100%' : 1200,
      margin: `${mobile ? 56 : 96}px auto 0`,
    }}>
      <div style={{
        background: VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: mobile ? 22 : 28,
        padding: mobile ? '32px 22px' : '56px 56px',
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1.1fr',
        gap: mobile ? 28 : 56,
        alignItems: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative bg */}
        <div aria-hidden="true" style={{
          position: 'absolute', right: -120, top: -100,
          width: 360, height: 360, borderRadius: '50%',
          background: `radial-gradient(circle, ${VT.accentSoft} 0%, transparent 65%)`,
          opacity: 0.5,
        }} />

        {/* text side */}
        <div style={{ position: 'relative' }}>
          <h2 style={{
            fontSize: mobile ? 30 : 44, fontWeight: 700, letterSpacing: '-0.03em',
            margin: '14px 0 0', lineHeight: 1.05, textWrap: 'balance',
          }}>
            Восемь «сам» — но кнопка всегда у вас
          </h2>
          <p style={{
            fontSize: mobile ? 16 : 18, lineHeight: 1.5, color: VT.inkSoft,
            margin: '14px 0 0', maxWidth: 480, textWrap: 'pretty',
          }}>
            {BRAND.name} делает рутину, но решения — за вами. В личном кабинете видна аналитика и доступны все действия с сайтом.
          </p>

          <ul style={{
            listStyle: 'none', margin: '24px 0 0', padding: 0,
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            {bullets.map(([title, body]) => (
              <li key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{
                  flex: '0 0 auto', width: 24, height: 24, borderRadius: '50%',
                  background: VT.accent, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12 l4 4 10 -10"/>
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: mobile ? 15.5 : 17, fontWeight: 700, color: VT.ink, letterSpacing: '-0.015em' }}>{title}</div>
                  <div style={{ fontSize: mobile ? 14 : 14.5, color: VT.inkSoft, lineHeight: 1.5, marginTop: 2 }}>{body}</div>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA to open interactive admin demo */}
          <a href="client-admin-demo.html" target="_blank" rel="noopener" style={{
            marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: mobile ? '12px 20px' : '14px 24px', borderRadius: 999,
            background: VT.ink, color: '#fff', fontWeight: 600, fontSize: mobile ? 14 : 15,
            textDecoration: 'none',
            boxShadow: '0 14px 28px -14px rgba(0,0,0,0.4)',
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 22, height: 22, borderRadius: '50%',
              background: VT.accent, color: '#fff', fontSize: 13,
            }}>▶</span>
            Посмотреть демо личного кабинета
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        {/* visual side */}
        <div style={{ position: 'relative' }}>
          <ControlPanelMock mobile={mobile} />
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// SOCIAL PROOF — 3 number badges + 4 testimonials (v2.1, PR-H)

function NumberBadge({ value, label, sub, mobile, tint }) {
  return (
    <div style={{
      background: tint?.bg || VT.white,
      border: `1px solid ${tint?.border || VT.line}`,
      borderRadius: 22, padding: mobile ? '24px 18px' : '36px 24px',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      {tint?.deco && (
        <div aria-hidden="true" style={{
          position: 'absolute', right: -50, top: -50,
          width: 160, height: 160, borderRadius: '50%',
          background: tint.deco, opacity: 0.5, pointerEvents: 'none',
        }} />
      )}
      <div style={{ position: 'relative' }}>
        <div style={{
          fontSize: mobile ? 52 : 76, fontWeight: 800, letterSpacing: '-0.04em',
          color: tint?.fg || VT.accent, lineHeight: 1,
        }}>{value}</div>
        <div style={{
          marginTop: 10, fontSize: mobile ? 14.5 : 16, color: VT.ink, fontWeight: 600,
        }}>{label}</div>
        {sub && (
          <div style={{
            marginTop: 4, fontFamily: VT.font.mono, fontSize: 11.5,
            color: VT.inkFaint, letterSpacing: '0.04em',
          }}>{sub}</div>
        )}
      </div>
    </div>
  );
}

function TestimonialCard({ author, role, monthly, text, mobile, tone = 'peach' }) {
  const tones = {
    peach: ['oklch(0.78 0.10 50)',  'oklch(0.55 0.12 35)'],
    rose:  ['oklch(0.80 0.09 25)',  'oklch(0.56 0.11 18)'],
    sage:  ['oklch(0.78 0.08 145)', 'oklch(0.52 0.10 145)'],
    slate: ['oklch(0.78 0.05 240)', 'oklch(0.52 0.06 240)'],
  };
  const [c1, c2] = tones[tone] || tones.peach;
  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 20, padding: mobile ? 22 : 28,
      display: 'flex', flexDirection: 'column', gap: 16,
      position: 'relative',
      boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -20px rgba(120,60,30,0.18)',
    }}>
      {/* huge open-quote */}
      <span aria-hidden="true" style={{
        position: 'absolute', top: 14, right: 22,
        fontFamily: 'Georgia, serif', fontSize: 80, lineHeight: 1,
        color: VT.accentSoft, fontWeight: 700,
        pointerEvents: 'none',
      }}>«</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => <Star key={i} filled size={15} />)}
        </div>
        <span style={{
          marginLeft: 'auto',
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em',
          color: VT.accentInk, background: VT.accentSoft,
          padding: '4px 10px', borderRadius: 6, fontWeight: 700,
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          <span style={{
            width: 16, height: 16, borderRadius: '50%',
            background: VT.accent, color: '#fff',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 800,
          }}>↑</span>
          {monthly} ЗАЯВОК/МЕС
        </span>
      </div>
      <p style={{
        margin: 0, fontSize: mobile ? 16 : 18, lineHeight: 1.5,
        color: VT.ink, textWrap: 'pretty', fontWeight: 500, letterSpacing: '-0.005em',
      }}>{text}</p>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto',
        paddingTop: 14, borderTop: `1px solid ${VT.lineSoft}`,
      }}>
        <span style={{
          width: 40, height: 40, borderRadius: '50%', flex: '0 0 auto',
          background: `linear-gradient(140deg, ${c1}, ${c2})`,
          color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700, fontSize: 16,
        }}>{author.trim().charAt(0)}</span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700, color: VT.ink, letterSpacing: '-0.01em' }}>{author}</div>
          <div style={{ fontSize: 12.5, color: VT.inkSoft, marginTop: 1 }}>{role}</div>
        </div>
      </div>
    </div>
  );
}

function SocialProofSection({ mobile }) {
  const testimonials = [
    { author: 'Анна И.',   role: 'Маникюр · Петрозаводск',  monthly: 32, tone: 'peach',
      text: `Раньше клиенты приходили только из Яндекс.Карт. За месяц на ${BRAND.name}е — больше заявок чем за полгода с одной карточки. И я ничего для этого не делала.` },
    { author: 'Сергей К.', role: 'Барбершоп · Самара',      monthly: 47, tone: 'slate',
      text: 'Самое ценное — записи приходят прямо в Telegram, я их не пропускаю. Раньше теряла половину звонков пока стригу клиента. Сейчас все заявки фиксируются.' },
    { author: 'Марина Л.', role: 'Психолог · Москва',       monthly: 18, tone: 'rose',
      text: 'Боялась, что ИИ напишет какую-то ерунду про мою работу. Открыла сайт — нормальные тёплые тексты, моими словами. Только отзывы клиентов и услуги, без «команды профессионалов».' },
    { author: 'Лена Ф.',   role: 'Фотограф · Казань',       monthly: 14, tone: 'sage',
      text: 'Сделала за 2 часа из своего Telegram-канала. Думала — выйдет шаблон, а получился сайт. Через неделю первый клиент пришёл из Яндекса.' },
  ];

  return (
    <section style={{ marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1 }} id="proof">
      <div style={{ textAlign: 'center', maxWidth: mobile ? '100%' : 820, margin: '0 auto' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 14px', background: VT.successSoft,
          color: 'oklch(0.32 0.12 145)', borderRadius: 999,
          fontFamily: VT.font.mono, fontSize: 12, letterSpacing: '0.08em', fontWeight: 600,
          marginBottom: 18,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: VT.success,
            animation: 'vt-pulse 2s ease-in-out infinite',
          }} />
          47 МАСТЕРОВ УЖЕ ПОЛЬЗУЮТСЯ
        </div>
        <style>{`
          @keyframes vt-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.4 } }
        `}</style>
        <SectionTitle mobile={mobile}>Работает —<br/>и приносит заявки</SectionTitle>
        <SectionSub mobile={mobile}>
          {BRAND.name} запущен пилотом для 47 мастеров. Вот результаты за первый месяц.
        </SectionSub>
      </div>

      {/* 3 big number badges */}
      <div style={{
        marginTop: mobile ? 36 : 56,
        maxWidth: mobile ? '100%' : 1100,
        margin: `${mobile ? 36 : 56}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(3, 1fr)',
        gap: mobile ? 12 : 18,
      }}>
        <NumberBadge value="47"     label="сайтов работает"
          sub="С августа 2025"
          tint={{ bg: VT.white, border: VT.line, fg: VT.accent, deco: VT.accentSoft }}
          mobile={mobile} />
        <NumberBadge value="1 284"  label="заявок собрано"
          sub="≈ 27 на каждого мастера"
          tint={{ bg: VT.accent, border: VT.accent, fg: '#fff', deco: 'rgba(255,255,255,0.15)' }}
          mobile={mobile} />
        <NumberBadge value="4.9★"   label="средняя оценка"
          sub="из 38 отзывов в Я.Картах"
          tint={{ bg: VT.white, border: VT.line, fg: 'oklch(0.55 0.15 75)', deco: 'oklch(0.92 0.10 80)' }}
          mobile={mobile} />
      </div>

      {/* 4 testimonials */}
      <div style={{
        marginTop: mobile ? 14 : 18,
        maxWidth: mobile ? '100%' : 1100,
        margin: `${mobile ? 14 : 18}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 12 : 18,
      }}>
        {testimonials.map(t => <TestimonialCard key={t.author} {...t} mobile={mobile} />)}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PRICING — single 299 ₽/мес tariff (v2.1, PR-H)

function PricingSection({ mobile }) {
  const bullets = [
    'Сам собирает сайт за 2 часа',
    'Сам обновляет 4 раза в месяц из источника',
    'Сам ловит заявки в Telegram / MAX / Email',
    'Сам отбирает лучшие отзывы каждую неделю',
    'Сам индексирует в Яндексе и Google',
    'Личный кабинет с аналитикой и контролем',
    'Защищённый https + данные хранятся в РФ',
  ];

  return (
    <section style={{ marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <SectionTitle mobile={mobile}>Один тариф —<br/>без сюрпризов</SectionTitle>
        <SectionSub mobile={mobile}>
          Не надо выбирать пакеты, считать апселы и читать «звёздочки». 990 ₽ в месяц — и весь {BRAND.name} в вашем распоряжении
        </SectionSub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 640,
        margin: `${mobile ? 28 : 48}px auto 0`,
      }}>
        <div className="ss-pricing-card" style={{
          background: VT.white,
          border: `1px solid ${VT.line}`,
          borderRadius: 22,
          padding: mobile ? '28px 22px' : '44px 40px',
          boxShadow: VT.shadow.card,
          position: 'relative', overflow: 'hidden',
        }}>
          {/* corner accent ribbon */}
          <div style={{
            position: 'absolute', top: mobile ? 18 : 24, right: mobile ? 18 : 24,
            fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.14em',
            color: VT.accentInk, background: VT.accentSoft,
            padding: '4px 10px', borderRadius: 999, fontWeight: 600,
          }}>
            ОДИН ТАРИФ
          </div>

          {/* Price */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: VT.font.mono, fontSize: 11.5, letterSpacing: '0.12em',
              color: VT.accentInk, fontWeight: 700,
              textTransform: 'uppercase',
            }}>
              <span style={{
                width: 18, height: 18, borderRadius: '50%',
                background: VT.accent, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12 l4 4 10 -10"/>
                </svg>
              </span>
              Первый месяц — бесплатно
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap', marginTop: 6 }}>
              <span style={{ fontSize: mobile ? 16 : 20, color: VT.inkSoft, fontWeight: 500 }}>
                потом
              </span>
              <span style={{
                fontSize: mobile ? 56 : 76, fontWeight: 700, letterSpacing: '-0.04em',
                lineHeight: 1, color: VT.ink,
              }}>990&nbsp;₽</span>
              <span style={{ fontSize: mobile ? 16 : 18, color: VT.inkSoft }}>/ месяц</span>
            </div>
          </div>

          {/* Bullets */}
          <ul style={{
            listStyle: 'none', margin: '22px 0 0', padding: 0,
            display: 'flex', flexDirection: 'column', gap: 10,
          }}>
            {bullets.map(b => (
              <li key={b} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                fontSize: mobile ? 14.5 : 15.5, color: VT.ink, lineHeight: 1.45,
              }}>
                <span style={{
                  flex: '0 0 auto', width: 22, height: 22, borderRadius: '50%',
                  background: VT.successSoft, color: VT.success,
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 1,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12 l4 4 10 -10"/>
                  </svg>
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div style={{ marginTop: mobile ? 24 : 32 }}>
            <Btn style={{ width: '100%', padding: mobile ? '14px 22px' : '16px 26px', fontSize: mobile ? 15 : 16 }} iconRight={<IconArrow />}>
              Сделать {BRAND.name}
            </Btn>
          </div>
          <div style={{
            marginTop: 12, textAlign: 'center',
            fontFamily: VT.font.mono, fontSize: 11.5, letterSpacing: '0.08em',
            color: VT.inkFaint,
          }}>
            Первый месяц бесплатно
          </div>
        </div>

        {/* Value anchor */}
        <p style={{
          margin: `${mobile ? 18 : 24}px auto 0`, maxWidth: 560,
          fontSize: mobile ? 13.5 : 14.5, lineHeight: 1.55,
          color: VT.inkSoft, textAlign: 'center', textWrap: 'pretty',
        }}>
          Час работы SMM-щика стоит дороже. Час маркетолога — в разы. {BRAND.name} делает то, что им пришлось бы делать каждую неделю — но автоматически.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ — 10 questions through «Самосайт сам …» (v2.1, PR-H)

function FaqItem({ q, a, defaultOpen, mobile }) {
  return (
    <details open={defaultOpen} style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 14, padding: 0, overflow: 'hidden',
    }}>
      <summary style={{
        listStyle: 'none', cursor: 'pointer',
        padding: mobile ? '16px 18px' : '18px 22px',
        display: 'flex', alignItems: 'center', gap: 14,
        fontSize: mobile ? 15.5 : 16.5, fontWeight: 600, color: VT.ink,
        lineHeight: 1.35,
      }}>
        <style>{`
          details > summary::-webkit-details-marker { display: none; }
        `}</style>
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
  const faqs = [
    {
      q: `А если ${BRAND.name} сам напишет что-то не то?`,
      a: <>Все тексты можно поправить в личном кабинете — пара кликов. Если совсем не нравится — нажмите «пересобрать», и {BRAND.name} напишет заново с другим тоном или акцентом.</>
    },
    {
      q: 'Я могу сам править тексты после сборки?',
      a: 'Да. В личном кабинете прямо на сайте — клик по любому блоку, правите текст. Также можно заменить фото, скрыть услугу, поправить цену. Сайт ваш.'
    },
    {
      q: 'Что если у меня нет Telegram-канала и нет карточки в Яндекс.Картах?',
      a: <>Загрузите 5–10 фото работ, скриншот шапки профиля или просто фото визитки — {BRAND.name} соберёт сайт из этого. На стартовой странице есть кнопка «Загрузить фото работ, скриншот профиля или визитку».</>
    },
    {
      q: `Мой Telegram-канал закрытый. ${BRAND.name} его прочитает?`,
      a: <>Да. На время сбора добавьте бота <Mono style={{ fontSize: 13, color: VT.ink }}>{BRAND.bot}</Mono> админом в свой канал на 5 минут — мы прочитаем посты и сразу выйдем. Это безопасно: бот не пишет в канал и не видит ваших подписчиков.</>
    },
    {
      q: `Как ${BRAND.name} сам понимает, какие отзывы лучшие?`,
      a: 'Читает все отзывы из источника, отбрасывает односложные («норм», «-», «ок»), тройки, спам и токсичные. Из оставшихся выбирает 4–6 самых тёплых и конкретных — тех, что прямо рассказывают, что понравилось. Каждую неделю проверяет: появился отзыв сильнее — заменит.'
    },
    {
      q: `Куда ${BRAND.name} сам отправит заявку, если у меня нет Telegram?`,
      a: 'Выбираете один канал из четырёх: Telegram, телефон (SMS), email или MAX (российский мессенджер от VK). Заявка падает туда. Никаких CRM и отдельных приложений — только то, что вы и так читаете.'
    },
    {
      q: `Может ли ${BRAND.name} сам подключить мой домен?`,
      a: <>Если у вас уже есть домен — пришлите его, мы поможем настроить DNS. Если нет — сайт сразу живёт на адресе <Mono style={{ fontSize: 13, color: VT.ink }}>{`<ваш-сайт>.${BRAND.domain}`}</Mono> со всем тем же самым, бесплатно.</>
    },
    {
      q: 'Что с моими данными, если я откажусь от подписки?',
      a: 'Сайт перестаёт показываться сразу. Все ваши данные — тексты, фото, заявки клиентов — удаляются в течение 10 дней. До удаления можно скачать архив (HTML + фото) одной кнопкой. По ФЗ-152 — все данные хранятся в РФ.'
    },
    {
      q: 'А если клиент жалуется на сайт — кто отвечает?',
      a: 'Ответственность за контент несёте вы как владелец дела. Мы проверяем, что текст не нарушает закон, но не контролируем фактическую точность («стерильные инструменты», «гарантия 14 дней» — это ваши обещания). Если клиент пишет про техническую проблему сайта — пишите нам, поправим.'
    },
    {
      q: `Что ${BRAND.name} сам НЕ умеет?`,
      a: 'Не пишет сайт «с нуля без источника» — нужна хотя бы одна ссылка или фото. Не редактирует фото и не подбирает чужие. Не отвечает клиентам в чатах за вас — только присылает заявки. Не покупает домен и не настраивает корпоративную почту. Не делает интернет-магазины с оплатой — только заявки.'
    },
  ];

  return (
    <section style={{ marginTop: mobile ? 64 : 110, position: 'relative', zIndex: 1 }} id="faq">
      <div style={{ textAlign: 'center' }}>
        <SectionTitle mobile={mobile}>Что чаще всего<br/>спрашивают</SectionTitle>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 820,
        margin: `${mobile ? 28 : 48}px auto 0`,
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {faqs.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} mobile={mobile} defaultOpen={i === 0} />)}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL FREE-MONTH CTA — Dojim block (v2.1)

function FreeMonthSection({ mobile }) {
  const bullets = [
    <>Сайт на адресе <Mono style={{ fontSize: 13, color: '#fff' }}>{`ваш-сайт.${BRAND.domain}`}</Mono></>,
    'Кнопка «Записаться» и приём заявок в Telegram',
    'Свежие отзывы и фото каждую неделю',
    'Аналитика посещений и заявок в личном кабинете',
  ];

  return (
    <section style={{
      marginTop: mobile ? 64 : 110,
      position: 'relative', zIndex: 1,
      maxWidth: mobile ? '100%' : 1200,
      margin: `${mobile ? 64 : 110}px auto 0`,
    }} id="cta">
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
        <div style={{ position: 'relative', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', marginBottom: mobile ? 14 : 20 }}>
            <GlyphGift size={mobile ? 58 : 76} />
          </div>
          <h2 style={{
            fontSize: mobile ? 30 : 54, fontWeight: 700, letterSpacing: '-0.03em',
            margin: 0, lineHeight: 1.05, textWrap: 'balance',
          }}>
            Дайте {BRAND.name}у собрать себя
          </h2>
          <p style={{
            fontSize: mobile ? 16 : 19, lineHeight: 1.5, color: 'oklch(0.85 0.014 60)',
            margin: '14px auto 0', maxWidth: 640, textWrap: 'pretty',
          }}>
            Через 2 часа у вас будет работающий сайт с услугами, ценами и отзывами. Через неделю — первые заявки в Telegram.
          </p>

          {/* 4 bullets */}
          <div style={{
            marginTop: mobile ? 24 : 36,
            display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
            gap: mobile ? 10 : 14,
            textAlign: 'left',
            maxWidth: 680, margin: `${mobile ? 24 : 36}px auto 0`,
          }}>
            {bullets.map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 14px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12,
              }}>
                <span style={{
                  flex: '0 0 auto', width: 20, height: 20, borderRadius: '50%',
                  background: VT.accent, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 1,
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12 l4 4 10 -10"/>
                  </svg>
                </span>
                <span style={{ fontSize: mobile ? 14 : 15, color: 'oklch(0.92 0.012 60)', lineHeight: 1.4 }}>{b}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ marginTop: mobile ? 24 : 32, display: 'inline-flex' }}>
            <Btn iconRight={<IconArrow />} style={{ padding: mobile ? '14px 24px' : '18px 32px', fontSize: mobile ? 16 : 18 }}>
              Сделать {BRAND.name}
            </Btn>
          </div>

          {/* Microcopy */}
          <div style={{
            marginTop: 12,
            fontSize: mobile ? 13 : 14, color: 'oklch(0.82 0.014 60)', textWrap: 'pretty',
          }}>
            Первый месяц — бесплатно. {BRAND.name} сам напомнит, когда подойдёт срок.
          </div>

          {/* Alt path */}
          <div style={{
            marginTop: mobile ? 22 : 30,
            paddingTop: mobile ? 18 : 22,
            borderTop: '1px solid rgba(255,255,255,0.10)',
            fontSize: mobile ? 13.5 : 14.5, color: 'oklch(0.82 0.014 60)',
            display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center',
            gap: mobile ? 4 : 8, width: '100%',
          }}>
            <span>Есть вопросы?</span>
            <a style={{
              color: VT.accentSoft, textDecoration: 'underline', textUnderlineOffset: 3,
            }}>Посмотрите ответы ↓</a>
            <span>или</span>
            <a style={{
              color: VT.accentSoft, textDecoration: 'underline', textUnderlineOffset: 3,
            }}>напишите нам →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN

function SamosaytLanding({ mobile = false }) {
  const padX = mobile ? 20 : 80;
  return (
    <>
      <style>{`
        .ss-hero-pill:focus-within {
          border-color: ${VT.accent} !important;
          box-shadow: 0 0 0 4px ${VT.accentSoft}, 0 12px 32px -16px rgba(120,60,30,0.25) !important;
        }
        .ss-hero-pill input::placeholder { color: ${VT.inkFaint}; opacity: 1; }
        .ss-card-lift {
          transition: transform .2s ease-out, box-shadow .2s ease-out;
        }
        .ss-card-lift:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 20px -14px rgba(120,60,30,0.18);
        }
        .ss-story-card { transition: transform .2s ease-out; }
        .ss-story-card:hover { transform: translateY(-1px); }
        .ss-pricing-card { transition: transform .2s ease-out, box-shadow .2s ease-out; }
        .ss-pricing-card:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 24px -16px rgba(120,60,30,0.22);
        }

        a[href="#hero"], a[href="#book"], a[href="/admin-demo"],
        a[href*="samosite.online/login"], a[href="client-admin-demo.html"],
        button {
          transition: transform .15s ease, box-shadow .15s ease, filter .15s ease, background-color .15s ease;
        }
        a[href="#hero"]:hover, a[href="#book"]:hover,
        a[href="/admin-demo"]:hover, a[href="client-admin-demo.html"]:hover,
        a[href*="samosite.online/login"]:hover,
        button:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(0.95);
          box-shadow: 0 16px 32px -14px rgba(120,60,30,0.45);
        }
        a:focus-visible, button:focus-visible {
          outline: 2px solid ${VT.accent};
          outline-offset: 3px;
          border-radius: 6px;
        }

        details summary { transition: background-color .15s ease; }
        details summary:hover { background-color: ${VT.bgSoft}; }

        html { scroll-behavior: smooth; }
      `}</style>
    <div style={{
      width: '100%', minHeight: '100%', background: VT.bg, color: VT.ink,
      fontFamily: VT.font.sans,
      paddingLeft: padX, paddingRight: padX,
      paddingTop: mobile ? 18 : 28,
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

      {/* Nav — sticky, with primary CTA "Собрать сайт" */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        marginLeft: -padX, marginRight: -padX,
        paddingLeft: padX, paddingRight: padX,
        paddingTop: mobile ? 10 : 14, paddingBottom: mobile ? 10 : 14,
        background: 'oklch(0.972 0.012 80 / 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${VT.lineSoft}`,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 16,
        }}>
          <BrandMark size={mobile ? 22 : 26} fontSize={mobile ? 18 : 20} />
          {!mobile ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 14, color: VT.inkSoft }}>
              <a href="#how" style={{ color: 'inherit', textDecoration: 'none' }}>Как это работает</a>
              <a href="#examples" style={{ color: 'inherit', textDecoration: 'none' }}>Примеры</a>
              <a href="#pricing" style={{ color: 'inherit', textDecoration: 'none' }}>Цены</a>
              <a href="#faq" style={{ color: 'inherit', textDecoration: 'none' }}>Помощь</a>
              <a style={{
                color: VT.inkSoft, fontWeight: 500, fontSize: 14,
                padding: '8px 16px', textDecoration: 'none',
              }} href="https://samosite.online/login">Войти</a>
              <a href="#hero" style={{
                background: VT.accent, color: '#fff', fontWeight: 600,
                padding: '10px 20px', borderRadius: 999, fontSize: 14,
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                boxShadow: '0 6px 16px -8px rgba(120,60,30,0.4)',
              }}>Сделать сайт <span aria-hidden="true">→</span></a>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <a href="https://samosite.online/login" style={{
                color: VT.inkSoft, fontWeight: 500, fontSize: 13.5,
                padding: '8px 12px', textDecoration: 'none',
              }}>Войти</a>
              <a href="#hero" style={{
                background: VT.accent, color: '#fff', fontWeight: 600, fontSize: 13.5,
                padding: '8px 16px', borderRadius: 999, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 4,
              }}>Сделать <span aria-hidden="true">→</span></a>
            </div>
          )}
        </div>
      </div>

      <div id="hero" />
      <HeroBlock mobile={mobile} />
      <div id="examples" />
      <ExamplesSection mobile={mobile} />
      <div id="how" />
      <StorySection mobile={mobile} />
      <PlatformsSection mobile={mobile} />
      <BigFeaturesSection mobile={mobile} />
      <OwnershipSection mobile={mobile} />
      <AnalyticsSection mobile={mobile} />
      <div id="pricing" />
      <PricingSection mobile={mobile} />
      <FaqSection mobile={mobile} />
      <FreeMonthSection mobile={mobile} />

      {/* slim footer */}
      <div style={{
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
          <span>© 2026 · {BRAND.domain} · все данные хранятся в РФ</span>
        </div>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap' }}>
          <a style={{ color: 'inherit' }}>Политика конфиденциальности</a>
          <a style={{ color: 'inherit' }}>Оферта</a>
          <a style={{ color: 'inherit' }}>Обратная связь</a>
        </div>
      </div>
    </div>
    </>
  );
}

function SamosaytLanding_Desktop() { return <SamosaytLanding mobile={false} />; }
function SamosaytLanding_Mobile()  { return <SamosaytLanding mobile={true} />; }

const Landing = SamosaytLanding;
const HeroSection = HeroBlock;

const ConceptA_Desktop = SamosaytLanding_Desktop;
const ConceptA_Mobile = SamosaytLanding_Mobile;

export {
  SamosaytLanding,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  ConceptA_Desktop,
  ConceptA_Mobile,
  Landing,
  HeroSection,
  HeroBlock,
  ExamplesSection,
  StorySection,
  PlatformsSection,
  BigFeaturesSection,
  OwnershipSection,
  AnalyticsSection,
  PricingSection,
  FaqSection,
  FreeMonthSection,
  SectionTitle,
  SectionSub,
  FeatureGlyph,
  StoryStepColorful,
  PlatformLogo,
  PlatformCard,
  FeatureCard,
  SiteCard
};

