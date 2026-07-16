'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · landing v3 — 11 blocks · canon 0.8.0
// Single-file port of landing-v3-{a,b,c,d}.jsx + landing-v3.jsx from the canvas project.
// See docs/COPY.md for canonical messaging and CHANGELOG 0.8.0 for what changed.

import React from 'react';
import { VT, BRAND } from '../tokens';
import { Btn, IconArrow, IconLink, BrandMark } from '../primitives';
import {
  PresetRenderer, MiniChrome as PresetMiniChrome, samplePresets,
  type Preset, type SlotContent, type Theme,
} from '../presets';

// ── from landing-v3-a.jsx ── (helpers + blocks 1-2: Hero, Examples)
// Tokens from ../tokens (VT, BRAND, BrandMark, Btn, IconArrow, IconLink).

    // ───────── helpers ─────────

    function sectionPad(mobile) {
      const v = mobile ? 20 : 80;
      return { paddingLeft: v, paddingRight: v, boxSizing: 'border-box' };
    }

    function Eyebrow({ children, mobile, kind = 'accent' }) {
      const palette = kind === 'accent' ?
      { bg: VT.accentSoft, fg: VT.accent, dot: VT.accent } :
      { bg: VT.bgSoft, fg: VT.inkSoft, dot: VT.inkFaint };
      return (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: VT.font.mono, fontSize: mobile ? 10.5 : 11.5, letterSpacing: '0.14em',
          color: palette.fg, fontWeight: 500,
          padding: '6px 12px', background: palette.bg, borderRadius: 6
        }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.dot }} />
      {children}
    </div>);

    }

    function H2({ children, mobile, align = 'center' }) {
      return (
        <h2 style={{
          fontSize: mobile ? 30 : 52,
          lineHeight: mobile ? 1.1 : 1.05,
          fontWeight: 700, letterSpacing: '-0.03em',
          margin: '14px 0 0', textWrap: 'balance', textAlign: align
        }}>{children}</h2>);

    }

    function Sub({ children, mobile, align = 'center', maxWidth = 720 }) {
      return (
        <p style={{
          fontSize: mobile ? 16 : 19, lineHeight: 1.45,
          color: VT.inkSoft, margin: '14px auto 0',
          maxWidth: mobile ? '100%' : maxWidth, textWrap: 'pretty',
          textAlign: align
        }}>{children}</p>);

    }

    // ───────── BLOCK 1 · HERO ─────────

    const SOURCE_ICONS = [
    { id: 'yandex', name: 'Яндекс.Карты',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 2 C 7.5 2, 4 5.5, 4 10 C 4 15, 12 22, 12 22 C 12 22, 20 15, 20 10 C 20 5.5, 16.5 2, 12 2 Z" fill="#FC3F1D" /><circle cx="12" cy="10" r="3.2" fill="#fff" /></svg> },
    { id: 'tg', name: 'Telegram',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#229ED9" /><path d="M19.5 6 L4 12 L9 14 L15 9.5 L11 14.5 L11.3 18 L13.5 16 L17 18 Z" fill="#fff" /></svg> },
    { id: '2gis', name: '2ГИС',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#19BB4F" /><text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, Helvetica, sans-serif" fontWeight="900" fontSize="14" fill="#fff">2</text></svg> },
    { id: 'avito', name: 'Avito',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="#0AF" /><circle cx="18" cy="7.5" r="3" fill="#FF9C00" /><text x="9" y="17" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="10" fill="#fff">A</text></svg> },
    { id: 'ig', name: 'Instagram',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><defs><linearGradient id="iggr3a" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stopColor="#FEDA77" /><stop offset="30%" stopColor="#F58529" /><stop offset="60%" stopColor="#DD2A7B" /><stop offset="100%" stopColor="#8134AF" /></linearGradient></defs><rect width="24" height="24" rx="6" fill="url(#iggr3a)" /><rect x="6" y="6" width="12" height="12" rx="3.5" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="12" cy="12" r="3" fill="none" stroke="#fff" strokeWidth="1.6" /><circle cx="16" cy="8" r="0.9" fill="#fff" /></svg> },
    { id: 'site', name: 'старый сайт',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="oklch(0.40 0.04 250)" /><circle cx="12" cy="12" r="6" fill="none" stroke="#fff" strokeWidth="1.5" /><ellipse cx="12" cy="12" rx="2.8" ry="6" fill="none" stroke="#fff" strokeWidth="1.5" /><path d="M6 12h12" stroke="#fff" strokeWidth="1.5" /></svg> },
    { id: 'card', name: 'фото меню или буклета',
      icon: <svg viewBox="0 0 24 24" width="22" height="22"><rect width="24" height="24" rx="6" fill="oklch(0.74 0.08 70)" /><rect x="6" y="8" width="12" height="9" rx="1.5" fill="none" stroke="#fff" strokeWidth="1.4" /><path d="M8 11.5h4M8 14h6" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" /></svg> }];

    function HeroBlock({ mobile }) {
      return (
        <section id="hero" style={{ ...sectionPad(mobile), paddingTop: mobile ? 28 : 56, position: 'relative', zIndex: 1 }}>
      <div style={{
            maxWidth: mobile ? '100%' : 1200, margin: '0 auto',
            textAlign: mobile ? 'left' : 'center'
          }}>
        <h1 style={{
              fontSize: mobile ? 'clamp(32px, 8.8vw, 44px)' : 76,
              lineHeight: mobile ? 1.06 : 1.04,
              fontWeight: 700, letterSpacing: '-0.035em',
              margin: 0,
              textWrap: 'balance'
            }}>
          Соберём за{' '}
          <span style={{ position: 'relative', color: VT.accent, whiteSpace: 'nowrap' }}>
            2 часа
            {!mobile && <span aria-hidden="true" style={{
                  position: 'absolute', left: 2, right: 6, bottom: 6, height: 14,
                  background: VT.accentSoft, opacity: 0.7, zIndex: -1, borderRadius: 3
                }} />}
          </span>{' '}
          сайт, который ловит заявки.<br />Дальше&nbsp;он <span style={{ color: VT.accent }}>сам становится лучше</span> каждую неделю.
        </h1>

        <p style={{
              fontSize: mobile ? 16.5 : 20, lineHeight: 1.5, color: VT.inkSoft,
              margin: mobile ? '20px 0 0' : '28px auto 0',
              maxWidth: mobile ? '100%' : 860, textWrap: 'pretty'
            }}>
          Покажите Самосайту, где вы ведёте дела: Яндекс.Карты, Telegram, 2ГИС, Avito или Instagram. Если ничего нет, сфотографируйте меню или буклет.
        </p>
        <p style={{
              fontSize: mobile ? 16.5 : 20, lineHeight: 1.5, color: VT.inkSoft,
              margin: mobile ? '10px 0 0' : '12px auto 0',
              maxWidth: mobile ? '100%' : 860, textWrap: 'balance'
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
              alignItems: mobile ? 'stretch' : 'center'
            }}>
          <div style={{
                flex: 1, display: 'flex', alignItems: 'center', gap: 10,
                padding: mobile ? '12px 14px' : '0 18px', minWidth: 0
              }}>
            <IconLink />
            <span style={{
                  color: VT.inkFaint, fontSize: mobile ? 15 : 16,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                }}>Вставьте ссылку или загрузите фото</span>
          </div>
          <Btn style={{
                padding: mobile ? '14px 20px' : '14px 26px',
                borderRadius: mobile ? 10 : 999
              }} iconRight={<IconArrow />}>
            Собрать сайт за 2 часа
          </Btn>
        </div>

        <div style={{
              marginTop: mobile ? 10 : 12,
              textAlign: mobile ? 'left' : 'center',
              fontFamily: VT.font.mono, fontSize: mobile ? 11.5 : 12.5,
              letterSpacing: '0.03em', color: VT.inkSoft, lineHeight: 1.45
            }}>
          Тариф «Старт» — бесплатно навсегда. Платные <b style={{ color: VT.accent }}>от 690 ₽/мес</b> · первый месяц на платном бесплатно, карту привязывать не надо
        </div>

        <div style={{
              marginTop: mobile ? 14 : 18,
              textAlign: mobile ? 'left' : 'center'
            }}>
          <a href="#examples" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                color: VT.inkSoft, fontSize: mobile ? 14 : 15,
                textDecoration: 'underline', textUnderlineOffset: 4,
                textDecorationColor: VT.line
              }}>
            Сначала посмотреть примеры
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <ChipStrip mobile={mobile} />
      </div>
    </section>);

    }

    // ───────── ChipStrip · переиспользуемый стрип «СОБИРАЕМ ИЗ» ─────────
    // Вынесен из inline-кода Hero (canon 0.7.2), чтобы стрип можно было
    // переиспользовать без транскрипции разметки.
    function ChipStrip({ mobile = false, label = 'СОБИРАЕМ ИЗ', items = SOURCE_ICONS, align }) {
      const a = align ?? (mobile ? 'start' : 'center');
      const alignItems = a === 'center' ? 'center' : 'flex-start';
      const justify = alignItems === 'center' ? 'center' : 'flex-start';
      return (
        <div style={{
          marginTop: mobile ? 22 : 36,
          display: 'flex', flexDirection: 'column', gap: 10,
          alignItems
        }}>
      {label &&
          <div style={{
            fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
            color: VT.inkFaint, fontWeight: 600
          }}>{label}</div>
          }
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: justify }}>
        {items.map((s) =>
            <span key={s.id} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '5px 14px 5px 5px',
              background: VT.white, border: `1px solid ${VT.line}`,
              borderRadius: 999,
              fontSize: 13, color: VT.ink, fontWeight: 500
            }}>
            {s.icon}
            {s.name}
          </span>
            )}
      </div>
    </div>);

    }

    // ───────── BLOCK 2 · EXAMPLES ─────────

    function Star({ filled = true, size = 10 }) {
      return (
        <svg width={size} height={size} viewBox="0 0 20 20"
        fill={filled ? '#f4a93b' : 'none'} stroke={filled ? '#f4a93b' : '#ccc'}
        strokeWidth="1.5" strokeLinejoin="round">
      <path d="M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z" />
    </svg>);

    }

    function PhotoFill({ tone = 'peach', src, style }) {
      const tones = {
        peach: ['oklch(0.84 0.07 50)', 'oklch(0.62 0.09 35)', 'oklch(0.46 0.07 30)'],
        sage: ['oklch(0.82 0.06 145)', 'oklch(0.58 0.08 145)', 'oklch(0.38 0.06 145)'],
        slate: ['oklch(0.80 0.04 240)', 'oklch(0.55 0.06 240)', 'oklch(0.35 0.04 240)'],
        warm: ['oklch(0.88 0.05 70)', 'oklch(0.70 0.10 50)', 'oklch(0.48 0.10 35)']
      };
      const [c1, c2, c3] = tones[tone] || tones.peach;
      // Always render the colored gradient as background; if src exists, layer the photo
      // on top and remove it on error so the gradient remains visible.
      return (
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `radial-gradient(120% 80% at 30% 20%, ${c1} 0%, transparent 55%), radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%), linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)`,
          ...style
        }}>
      {src && <img src={src} alt="" loading="lazy"
          onError={(e) => {e.currentTarget.style.display = 'none';}}
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center', display: 'block'
          }} />}
    </div>);

    }

    function MiniSiteCard({ ex }) {
      return (
        <div className="ss-card-lift" style={{
          background: VT.white, color: VT.ink,
          border: `1px solid ${VT.line}`,
          borderRadius: 18, overflow: 'hidden',
          boxShadow: '0 18px 36px -18px rgba(120,60,30,0.22)',
          display: 'flex', flexDirection: 'column', width: '100%'
        }}>
      <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '8px 12px', background: VT.bgSoft,
            borderBottom: `1px solid ${VT.line}`
          }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
        <span style={{ marginLeft: 8, fontFamily: VT.font.mono, fontSize: 10, color: VT.inkFaint }}>
          {ex.handle}.{BRAND.domain}
        </span>
      </div>

      <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '9px 12px', background: '#fff',
            borderBottom: `1px solid ${VT.line}`
          }}>
        <span style={{
              width: 24, height: 24, flex: '0 0 auto', borderRadius: 7,
              background: ex.accent, color: '#fff',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13
            }}>{ex.letter}</span>
        <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: '-0.015em' }}>{ex.name}</span>
        <span style={{
              marginLeft: 'auto',
              fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkSoft
            }}>телефон</span>
        <span style={{
              padding: '4px 10px', borderRadius: 999,
              background: ex.accent, color: '#fff', fontSize: 10.5, fontWeight: 600
            }}>Записаться</span>
      </div>

      <div style={{ padding: '14px 14px 12px', borderBottom: `1px solid ${VT.line}` }}>
        <div style={{
              fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
              color: ex.accent, fontWeight: 600
            }}>{ex.category.toUpperCase()} · {ex.city.toUpperCase()}</div>
        <h3 style={{
              fontSize: 17, fontWeight: 700, letterSpacing: '-0.025em',
              margin: '6px 0 0', lineHeight: 1.15, textWrap: 'balance', whiteSpace: 'pre-line'
            }}>{ex.heroLine}</h3>
        <div style={{
              marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px', background: VT.bgSoft,
              border: `1px solid ${VT.line}`, borderRadius: 999, fontSize: 11
            }}>
          <span style={{ display: 'inline-flex', gap: 1 }}>
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} filled size={10} />)}
          </span>
          <b>{ex.rating} ★</b>
          <span style={{ color: VT.inkSoft }}>· {ex.reviewCount} отзывов</span>
        </div>
        <div style={{ marginTop: 10 }}>
          <PhotoFill tone={ex.tone} src={ex.heroPhoto} style={{
                aspectRatio: '16 / 9', borderRadius: 8, border: `1px solid ${VT.line}`
              }} />
        </div>
      </div>

      <div style={{ padding: '12px 14px' }}>
        <div style={{
              fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
              color: ex.accent, fontWeight: 600, marginBottom: 8
            }}>УСЛУГИ И ЦЕНЫ</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ex.services.map(([n, pr]) =>
              <div key={n} style={{
                background: VT.white, border: `1px solid ${VT.line}`,
                borderRadius: 10, padding: '8px 10px',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '-0.01em' }}>{n}</div>
                <div style={{ fontFamily: VT.font.mono, fontSize: 11, marginTop: 1 }}>{pr}</div>
              </div>
              <span style={{
                  padding: '4px 8px', borderRadius: 999,
                  background: ex.accentSoft, color: ex.accent,
                  fontSize: 10, fontWeight: 600
                }}>Записаться →</span>
            </div>
              )}
        </div>
      </div>

      <div style={{ padding: '12px 14px', background: VT.bgSoft, borderTop: `1px solid ${VT.line}` }}>
        <div style={{
              fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.12em',
              color: ex.accent, fontWeight: 600, marginBottom: 8
            }}>ОТЗЫВ</div>
        <div style={{
              background: VT.white, border: `1px solid ${VT.line}`,
              borderRadius: 10, padding: '8px 10px'
            }}>
          <div style={{ display: 'flex', gap: 1, marginBottom: 4 }}>
            {Array.from({ length: 5 }).map((_, j) => <Star key={j} filled size={9} />)}
          </div>
          <p style={{ margin: 0, fontSize: 11.5, lineHeight: 1.4 }}>«{ex.review}»</p>
          <div style={{ marginTop: 4, fontSize: 10, color: VT.inkSoft }}>{ex.reviewAuthor}</div>
        </div>
      </div>

      <div style={{ padding: '12px 14px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
          {ex.gallery.map((g, i) =>
              <PhotoFill key={i} tone={g.tone || ex.tone} src={g.src}
              style={{ aspectRatio: '1 / 1', borderRadius: 4 }} />
              )}
        </div>
      </div>

      <div style={{ padding: '0 14px 14px', marginTop: 'auto' }}>
        <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              padding: '11px 14px', borderRadius: 10,
              background: ex.accent, color: '#fff',
              fontSize: 13, fontWeight: 700
            }}>Записаться онлайн →</div>
      </div>
    </div>);

    }

    function ExamplesSection({ mobile }) {
      const showcase = samplePresets || [];
      const MiniChrome = PresetMiniChrome;

      const ExampleCard = ({ item }) => {
        const [hover, setHover] = React.useState(false);
        return (
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
        <div style={{
              display: 'flex', alignItems: 'center',
              gap: 10, marginBottom: 14, minHeight: 28, minWidth: 0
            }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.accent, flex: '0 0 auto' }} />
          <span style={{
                fontSize: mobile ? 14 : 15, fontWeight: 600, letterSpacing: '-0.015em',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0
              }}>{item.tagline}</span>
        </div>
        <div
              onMouseEnter={() => !mobile && setHover(true)}
              onMouseLeave={() => setHover(false)}
              style={{
                display: 'flex', borderRadius: 12, position: 'relative',
                transform: hover ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hover ?
                '0 1px 2px rgba(40,28,18,0.04), 0 10px 24px -14px rgba(120,70,40,0.20), 0 4px 10px -8px rgba(40,28,18,0.08)' :
                '0 1px 2px rgba(40,28,18,0.03), 0 6px 16px -12px rgba(120,70,40,0.14), 0 2px 6px -6px rgba(40,28,18,0.05)',
                transition: 'transform .22s cubic-bezier(0.22,0.61,0.36,1), box-shadow .22s ease'
              }}>
              
          <MiniChrome host={item.content.meta.host}>
            <PresetRenderer preset={item.preset} content={item.content} />
          </MiniChrome>
        </div>
      </div>);

      };

      return (
        <section id="examples" style={{ ...sectionPad(mobile), marginTop: mobile ? 56 : 110, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Вот как будет<br />выглядеть ваш сайт</H2>
        <Sub mobile={mobile}>
          Стилистик много — Самосайт подбирает её под нишу и контент. Если не зайдёт — поменяете в один клик из библиотеки.
        </Sub>
      </div>

      <ExamplesCarousel mobile={mobile} items={showcase} renderCard={(item) => <ExampleCard item={item} />} />

      <HowItPicks mobile={mobile} />

      <div style={{ marginTop: mobile ? 28 : 44, textAlign: 'center' }}>
        <a href="#hero" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, flexWrap: 'nowrap',
              background: VT.accent, color: '#fff', fontWeight: 700,
              padding: mobile ? '13px 22px' : '16px 32px',
              borderRadius: 999, fontSize: mobile ? 15 : 17, lineHeight: 1.2,
              textDecoration: 'none',
              boxShadow: '0 12px 28px -12px rgba(120,60,30,0.45)',
              maxWidth: '100%', boxSizing: 'border-box'
            }}>
          <span>Собрать такой&nbsp;же из&nbsp;моего источника&nbsp;→</span>
        </a>
        <div style={{
              marginTop: 14, fontFamily: VT.font.mono, fontSize: 12,
              color: VT.inkFaint, letterSpacing: '0.02em'
            }}>Самосайт сам подберёт стиль — потом можно поменять</div>
      </div>
    </section>);

    }

    // ───── ExamplesCarousel — горизонтальный скролл с дотами/стрелками ─────
    function ExamplesCarousel({ mobile, items, renderCard }) {
      const scrollerRef = React.useRef(null);
      const [atStart, setAtStart] = React.useState(true);
      const [atEnd, setAtEnd] = React.useState(false);
      const [activeIdx, setActiveIdx] = React.useState(0);
      const [hoverPrev, setHoverPrev] = React.useState(false);
      const [hoverNext, setHoverNext] = React.useState(false);

      const updateBounds = React.useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        setAtStart(el.scrollLeft <= 1);
        setAtEnd(el.scrollLeft >= maxScroll - 1);
        const firstChild = el.firstElementChild && el.firstElementChild.firstElementChild;
        const step = firstChild ? firstChild.getBoundingClientRect().width + 14 : el.clientWidth;
        const idx = Math.round(el.scrollLeft / step);
        const maxIdx = (el.firstElementChild && el.firstElementChild.childElementCount || 1) - 1;
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

      const scrollBy = (direction) => {
        const el = scrollerRef.current;
        if (!el) return;
        const step = Math.max(280, el.clientWidth / 3);
        el.scrollBy({ left: step * direction, behavior: 'smooth' });
      };

      const arrowStyle = (disabled, hovered, direction) => ({
        position: 'absolute', top: '50%',
        [direction === -1 ? 'left' : 'right']: -28,
        transform: `translateY(-50%) ${hovered && !disabled ? `translateX(${direction * 2}px) scale(1.05)` : ''}`.trim(),
        width: 56, height: 56, borderRadius: '50%', border: 'none',
        background: VT.white,
        color: disabled ? VT.inkMuted : VT.ink,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
        transition: 'opacity .2s ease, transform .2s ease, box-shadow .2s ease',
        boxShadow: hovered && !disabled ?
        '0 16px 40px -12px rgba(120,60,30,0.30), 0 4px 12px -4px rgba(0,0,0,0.10)' :
        '0 8px 24px -8px rgba(120,60,30,0.20), 0 2px 6px -2px rgba(0,0,0,0.06)',
        padding: 0, fontFamily: 'inherit', zIndex: 5
      });

      const ArrowIcon = ({ direction }) =>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: direction === -1 ? 'scaleX(-1)' : undefined }}>
      <path d="M5 12 H19" />
      <path d="M13 6 L19 12 L13 18" />
    </svg>;

      return (
        <div style={{
          position: 'relative',
          marginTop: mobile ? 28 : 56,
          maxWidth: mobile ? 'none' : 1200,
          marginLeft: mobile ? undefined : 'auto',
          marginRight: mobile ? undefined : 'auto'
        }}>
      {mobile && items.length > 1 &&
          <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginBottom: 14 }}>
          {items.map((_, i) => {
              const active = i === activeIdx;
              return (
                <button
                  key={i} type="button" aria-label={`Слайд ${i + 1}`}
                  onClick={() => {
                    const el = scrollerRef.current;
                    if (!el) return;
                    const child = el.firstElementChild && el.firstElementChild.children[i];
                    if (child) el.scrollTo({ left: child.offsetLeft - 20, behavior: 'smooth' });
                  }}
                  style={{
                    width: active ? 20 : 7, height: 7, borderRadius: 999,
                    background: active ? VT.accent : VT.line,
                    border: 'none', padding: 0, cursor: 'pointer',
                    transition: 'width .25s ease, background .25s ease'
                  }} />);

            })}
        </div>
          }

      <div
            ref={scrollerRef}
            style={{
              marginLeft: mobile ? -16 : -32,
              marginRight: mobile ? -16 : -32,
              overflowX: 'auto', WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
              scrollPaddingLeft: mobile ? 16 : 32,
              scrollbarWidth: 'none',
              '--ss-fade-w': mobile ? '44px' : '64px',
              '--ss-fade-l': atStart ? '0px' : 'var(--ss-fade-w)',
              '--ss-fade-r': atEnd ? '0px' : 'var(--ss-fade-w)',
              maskImage: 'linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 var(--ss-fade-l), #000 calc(100% - var(--ss-fade-r)), transparent 100%)',
              transition: 'mask-image .25s ease, -webkit-mask-image .25s ease'
            }}>
            
        <style>{`.ss-preset-carousel::-webkit-scrollbar{display:none}`}</style>
        <div className="ss-preset-carousel" style={{
              display: 'flex',
              gap: mobile ? 12 : 24,
              padding: mobile ? '0 56px 16px 16px' : '0 32px 16px',
              alignItems: 'flex-start'
            }}>
          {items.map((item, i) =>
              <div key={i} style={{
                flex: mobile ? '0 0 94%' : '0 0 calc((100% - 80px) / 3)',
                scrollSnapAlign: 'start',
                display: 'flex', minWidth: 0
              }}>
              {renderCard(item, i)}
            </div>
              )}
        </div>
      </div>

      {!mobile &&
          <>
          <button type="button" aria-label="Предыдущий пример" disabled={atStart}
            onClick={() => scrollBy(-1)}
            onMouseEnter={() => setHoverPrev(true)} onMouseLeave={() => setHoverPrev(false)}
            style={arrowStyle(atStart, hoverPrev, -1)}>
            <ArrowIcon direction={-1} />
          </button>
          <button type="button" aria-label="Следующий пример" disabled={atEnd}
            onClick={() => scrollBy(1)}
            onMouseEnter={() => setHoverNext(true)} onMouseLeave={() => setHoverNext(false)}
            style={arrowStyle(atEnd, hoverNext, 1)}>
            <ArrowIcon direction={1} />
          </button>
        </>
          }
    </div>);

    }

    // ───── HowItPicks — как Самосайт собирает дизайн из ваших материалов ─────
    function HowItPicks({ mobile }) {
      const EU = (id, w = 480) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

      // «Извлечение»: реальное фото → выведенная палитра + шрифт. Доказывает тезис.
      const extractions = [
      {
        niche: 'Кофейня', photo: EU('photo-1495474472287-4d71bcdd2085'),
        filter: 'saturate(1.02)',
        palette: ['#FAF6F0', '#C9A57B', '#A8412E', '#211C17'],
        fontName: 'Fraunces', fontCss: "'Fraunces', Georgia, serif", italic: true,
        note: 'тёплое, бумажное'
      },
      {
        niche: 'Маникюр', photo: EU('photo-1604654894610-df63bc536371'),
        filter: 'saturate(1.0)',
        palette: ['#F6E7E3', '#D99CA0', '#8C4A52', '#2A1820'],
        fontName: 'Instrument Serif', fontCss: "'Instrument Serif', Georgia, serif", italic: true,
        note: 'мягкое, бьюти'
      },
      {
        niche: 'Автосервис', photo: EU('photo-1486262715619-67b85e0b08d3'),
        filter: 'contrast(1.05) saturate(0.9)',
        palette: ['#0E0F10', '#9A9B98', '#C2D94A', '#F2F0EC'],
        fontName: 'Space Grotesk', fontCss: "'Space Grotesk', sans-serif", italic: false,
        note: 'строгое, техничное'
      }];

      const mechanics = [
      { n: '01', title: 'Есть фирстиль — повторит', body: 'Распознаёт шрифт и цвета с буклета, визитки или вывески.' },
      { n: '02', title: 'Нет — соберёт сам', body: 'Палитру берёт с ваших фото, шрифт — под тон текста.' },
      { n: '03', title: 'Раскладка под контент', body: 'Цифры — в плитки, меню — в журнал, атмосфера — в крупные фото.' },
      { n: '04', title: 'Не зашло — клик', body: 'Библиотека готовых стилей, тексты и фото остаются на местах.' }];

      const ExtractionCard = ({ ex }) =>
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md,
        overflow: 'hidden', display: 'flex', flexDirection: 'column'
      }}>
      <div style={{ position: 'relative', height: mobile ? 96 : 88, overflow: 'hidden' }}>
        <img src={ex.photo} alt="" loading="lazy" style={{
            width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: ex.filter
          }} />
        <span style={{
            position: 'absolute', top: 8, left: 8,
            fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.06em', fontWeight: 700,
            color: VT.ink, background: 'rgba(250,246,240,0.92)',
            padding: '3px 8px', borderRadius: 999, textTransform: 'uppercase',
            backdropFilter: 'blur(4px)'
          }}>{ex.niche}</span>
      </div>

      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{ fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.06em', color: VT.inkFaint, fontWeight: 600, marginBottom: 6 }}>
          ЦВЕТА ИЗ ФОТО
        </div>
        <div style={{ display: 'flex', borderRadius: 7, overflow: 'hidden', boxShadow: `0 1px 2px rgba(40,28,18,0.10)` }}>
          {ex.palette.map((c, i) =>
            <span key={i} style={{ flex: 1, height: 22, background: c }} />
            )}
        </div>
        <div style={{ marginTop: 9, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
          <span style={{
              fontFamily: ex.fontCss, fontStyle: ex.italic ? 'italic' : 'normal',
              fontSize: 20, color: VT.ink, lineHeight: 1
            }}>Аа Бб</span>
          <span style={{ fontFamily: VT.font.mono, fontSize: 9.5, color: VT.inkSoft, textAlign: 'right' }}>{ex.fontName}</span>
        </div>
      </div>
    </div>;

      return (
        <div style={{
          marginTop: 0, maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto',
          padding: mobile ? '20px 18px' : '26px 30px',
          background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.lg
        }}>
      <h3 style={{
            fontSize: mobile ? 23 : 30, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.032em',
            color: VT.ink, marginBottom: 8, maxWidth: 720, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', textWrap: 'balance'
          }}>Дизайн собирается из ваших материалов — <span style={{ color: VT.accent }}>а не из шаблона</span></h3>
      <p style={{
            fontSize: mobile ? 13.5 : 15, lineHeight: 1.45, color: VT.inkSoft,
            marginBottom: mobile ? 16 : 20, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', textWrap: 'pretty'
          }}>Палитру Самосайт вытягивает из ваших фото, а шрифт подбирает под тон. Поэтому сайт кофейни не похож на сайт автосервиса.</p>

      {/* EXTRACTION SHOWCASE — фото → палитра + шрифт */}
      <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: mobile ? 8 : 12
          }}>
        {extractions.map((ex, i) => <ExtractionCard key={i} ex={ex} />)}
      </div>

      {/* MECHANICS STRIP */}
      <div style={{
            marginTop: mobile ? 16 : 20,
            paddingTop: mobile ? 16 : 20,
            borderTop: `1px solid ${VT.line}`,
            display: 'grid',
            gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(4, 1fr)',
            gap: mobile ? 12 : 18
          }}>
        {mechanics.map((m, i) =>
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: VT.font.mono, fontSize: 11, fontWeight: 700, color: VT.accent }}>{m.n}</span>
              <div style={{ fontSize: mobile ? 13.5 : 14.5, fontWeight: 700, letterSpacing: '-0.015em', color: VT.ink, lineHeight: 1.2 }}>{m.title}</div>
            </div>
            <p style={{ fontSize: mobile ? 12 : 12.5, lineHeight: 1.45, color: VT.inkSoft, margin: 0 }}>{m.body}</p>
          </div>
            )}
      </div>
    </div>);

    }

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
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 36 : 56}px auto 0`,
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

// ── from landing-v3-c.jsx ──
// ───────── BLOCK 5 · BASE WORK ─────────

const BASE_ITEMS = [
  {
    title: 'Ловит заявки',
    body: 'Клиент нажал «Записаться», и уведомление падает туда, где вам удобно: в Telegram, MAX, на почту или SMS. Без CRM и отдельных кабинетов.',
    metric: '4 канала',
    metricNote: 'на выбор',
    palette: { bg: 'oklch(0.955 0.018 60)', ink: VT.accentInk, stroke: VT.line },
    icon: (
      <svg viewBox="0 0 64 64" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="10" y="14" width="44" height="36" rx="5"/>
        <path d="M10 22 L32 36 L54 22"/>
      </svg>
    ),
  },
  {
    title: 'Отбирает отзывы',
    body: 'Читает все отзывы из источника, на сайт ставит 4–6 самых тёплых и конкретных. Придёт отзыв сильнее прежних — заменит сам.',
    metric: '4–6',
    metricNote: 'лучших в неделю',
    palette: { bg: 'oklch(0.955 0.018 60)', ink: VT.accentInk, stroke: VT.line },
    icon: (
      <svg viewBox="0 0 64 64" width="32" height="32" fill="currentColor">
        <path d="M32 8 L37 23 L53 23 L40 33 L45 49 L32 39 L19 49 L24 33 L11 23 L27 23 Z"/>
      </svg>
    ),
  },
  {
    title: 'Готов к поиску',
    body: 'Самосайт всё настраивает для Яндекса и Google: защищённое соединение, карта сайта, разметка цен и часов. Дальше поисковики подхватывают сайт сами, обычно за несколько дней.',
    metric: 'Яндекс',
    metricNote: '+ Google',
    palette: { bg: 'oklch(0.955 0.018 60)', ink: VT.accentInk, stroke: VT.line },
    icon: (
      <svg viewBox="0 0 64 64" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="27" cy="27" r="14"/>
        <path d="M38 38 L54 54"/>
      </svg>
    ),
  },
  {
    title: 'Отсекает спам',
    body: 'Антибот-проверка, которую живой человек не замечает. Боты упираются в стену, до вас доходят только настоящие заявки.',
    metric: '0',
    metricNote: 'ботов в заявках',
    palette: { bg: 'oklch(0.955 0.018 60)', ink: VT.accentInk, stroke: VT.line },
    icon: (
      <svg viewBox="0 0 64 64" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
          Это то, что на других сайтах надо настраивать руками или платить SMM-щику. Здесь работает из коробки.
        </Sub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 28 : 48}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 14 : 22,
      }}>
        {BASE_ITEMS.map((item) => (
          <div key={item.title} style={{
            background: VT.white, borderRadius: 18,
            border: `1px solid ${VT.line}`,
            boxShadow: '0 1px 2px rgba(40,28,18,0.03), 0 14px 34px -26px rgba(120,60,30,0.16)',
            padding: mobile ? '22px 22px' : '28px 30px',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
              <span style={{
                flex: '0 0 auto', width: 46, height: 46, borderRadius: 12,
                background: VT.accentSoft, color: VT.accent,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>{item.icon}</span>
              <h3 style={{
                fontSize: mobile ? 20 : 22, fontWeight: 800, letterSpacing: '-0.025em',
                margin: 0, lineHeight: 1.15, color: VT.ink,
              }}>{item.title}</h3>
            </div>
            <p style={{
              margin: 0, fontSize: mobile ? 14.5 : 15.5, lineHeight: 1.5,
              color: VT.inkSoft, textWrap: 'pretty',
            }}>{item.body}</p>
            <div style={{
              marginTop: 'auto', paddingTop: 18,
              borderTop: `1px solid ${VT.lineSoft}`,
              display: 'flex', alignItems: 'baseline', gap: 9,
            }}>
              <span style={{
                fontSize: mobile ? 22 : 26, fontWeight: 800, letterSpacing: '-0.03em',
                color: VT.accent, lineHeight: 1,
              }}>{item.metric}</span>
              <span style={{
                fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.07em',
                textTransform: 'uppercase', color: VT.inkFaint, fontWeight: 600,
              }}>{item.metricNote}</span>
            </div>
          </div>
        ))}
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
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 32 : 56}px auto 0`,
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
    title: 'Не понравилась рекомендация — отклоните, и она исчезнет',
    body: 'Никаких «нейросеть знает лучше».',
    demo: 'approve',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.8A8.5 8.5 0 1 1 21 11.5Z"/><path d="M8.5 12l2.2 2.2 4.8-4.8"/>
      </svg>
    ),
  },
  {
    title: 'Текст и фото правите в один клик',
    body: 'Прямо на сайте, без отдельных редакторов.',
    demo: 'edit',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
      </svg>
    ),
  },
  {
    title: 'Сайт ваш, заберёте в любой момент',
    body: 'Архив HTML и фотографий скачивается одной кнопкой. Доступ к нему — пока активен аккаунт и ещё 10 дней, если решите уйти.',
    demo: 'export',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>
      </svg>
    ),
  },
  {
    title: 'Удаляется в одно нажатие',
    body: 'Без звонков в поддержку и уговоров «подумайте ещё».',
    demo: 'delete',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/>
      </svg>
    ),
  },
];

function OwnerDemo({ kind, mobile }) {
  const pill = (label, opts = {}) => (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '6px 12px', borderRadius: 999, fontSize: 12.5, fontWeight: 600,
      whiteSpace: 'nowrap', ...opts,
    }}>{label}</span>
  );
  if (kind === 'approve') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {pill(<><span style={{ fontSize: 14 }}>✓</span>Применить</>, { background: VT.accent, color: '#fff' })}
        {pill('Иначе', { background: VT.white, color: VT.ink, border: `1px solid ${VT.line}` })}
        {pill('Отклонить', { background: VT.white, color: VT.inkSoft, border: `1px solid ${VT.line}` })}
      </div>
    );
  }
  if (kind === 'edit') {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '8px 12px', borderRadius: 10,
        border: `1.5px dashed ${VT.accent}`, background: VT.accentSoft,
        fontSize: 13, color: VT.ink, fontWeight: 500,
      }}>
        Капучино на овсяном<span style={{ width: 1.5, height: 16, background: VT.accent, animation: 'none' }} />
        <span style={{ fontFamily: VT.font.mono, fontSize: 11, color: VT.accent }}>правка</span>
      </div>
    );
  }
  if (kind === 'export') {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '8px 14px', borderRadius: 10,
        background: VT.white, border: `1px solid ${VT.line}`,
      }}>
        <span style={{ fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }}>сайт.zip</span>
        <span style={{ fontSize: 11, color: VT.inkFaint }}>HTML + фото</span>
        <span style={{
          width: 24, height: 24, borderRadius: 7, background: VT.accent, color: '#fff',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
        }}>↓</span>
      </div>
    );
  }
  // delete
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '8px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 600,
        background: VT.white, color: VT.ink, border: `1px solid ${VT.line}`,
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        Удалить сайт
      </span>
      <span style={{ fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }}>1 клик</span>
    </div>
  );
}

function OwnershipSection({ mobile }) {
  return (
    <section id="ownership" style={{ ...sectionPad(mobile), marginTop: mobile ? 64 : 130, position: 'relative', zIndex: 1 }}>
      <div style={{ textAlign: 'center' }}>
        <H2 mobile={mobile}>Самосайт делает рутину.<br/>Решения остаются за вами</H2>
        <Sub mobile={mobile} maxWidth={760}>
          Всё, что предлагает Самосайт, идёт через ваше «да». Всё, что собрал, поправите. Захотите уйти — заберёте и уйдёте.
        </Sub>
      </div>

      <div style={{
        marginTop: mobile ? 28 : 48,
        maxWidth: mobile ? '100%' : 1200, margin: `${mobile ? 28 : 48}px auto 0`,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(2, 1fr)',
        gap: mobile ? 12 : 16,
      }}>
        {OWNER_POINTS.map((pt, i) => (
          <div key={i} style={{
            display: 'flex', flexDirection: 'column',
            padding: mobile ? '20px 20px' : '26px 28px',
            background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 18,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 12 }}>
              <span style={{
                flex: '0 0 auto', width: 44, height: 44, borderRadius: 12,
                background: VT.accent, color: '#fff',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              }}>{pt.icon}</span>
              <div style={{
                fontSize: mobile ? 19 : 22, fontWeight: 800,
                color: VT.ink, letterSpacing: '-0.025em', lineHeight: 1.12,
              }}>{pt.title}</div>
            </div>
            <p style={{
              margin: 0, fontSize: mobile ? 14 : 15, lineHeight: 1.5,
              color: VT.inkSoft, textWrap: 'pretty',
            }}>{pt.body}</p>
            <div style={{ marginTop: 'auto', paddingTop: 18 }}>
              <OwnerDemo kind={pt.demo} mobile={mobile} />
            </div>
          </div>
        ))}
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

// ───── PRICING MATRIX · полная тарифная сетка ─────

const PLANS = ['Старт', 'Личный', 'Бизнес', 'Компания', 'Студия'];
const PLAN_HILITE = 2; // «Бизнес» — рекомендуемый

// Цены вынесены в шапку-банд — в теле таблицы только характеристики.
const PLAN_META = [
  { name: 'Старт',    price: '0',     unit: '₽',      sub: 'бесплатно навсегда' },
  { name: 'Личный',   price: '690',   unit: '₽/мес', sub: '6 620 ₽/год' },
  { name: 'Бизнес',   price: '1 490', unit: '₽/мес', sub: '14 300 ₽/год', hot: true },
  { name: 'Компания', price: '2 990', unit: '₽/мес', sub: '28 700 ₽/год' },
  { name: 'Студия',   price: '6 990', unit: '₽/мес', sub: '67 100 ₽/год' },
];

const PRICING_MATRIX = [
  {
    rows: [
      { label: 'Выгода годового', vals: ['—', '−20%', '−20%', '−20%', '−20%'] },
      { label: 'Для кого', vals: ['Попробовать', 'Самозанятые, личные сайты', 'Малый бизнес', 'Несколько брендов, инфобизнес', 'Студии и агентства'] },
    ],
  },
  {
    title: 'Сайты и хостинг',
    rows: [
      { label: 'Сайтов в аккаунте', vals: ['1', '1', '2', '8', '30'] },
      { label: 'Свой домен', vals: [false, '1', '2', '8', '30'] },
      { label: 'Поддомен samosite', vals: [true, true, true, true, true] },
      { label: 'Страниц на сайт', vals: ['3', '15', '50', 'без ограничений', 'без ограничений'] },
      { label: 'Хранилище медиа', vals: ['500 МБ', '5 ГБ', '20 ГБ', '100 ГБ', '500 ГБ'] },
      { label: 'Месячный трафик', vals: ['5 ГБ', '50 ГБ', '200 ГБ', '1 ТБ', '5 ТБ'] },
      { label: 'Сертификат безопасности (SSL)', vals: [true, true, true, true, true] },
      { label: 'Удаление брендинга samosite', vals: [false, true, true, true, true] },
    ],
  },
  {
    title: 'ИИ-операции (в месяц)',
    rows: [
      { label: 'Качество ИИ-модели', vals: ['Yandex', 'Claude', 'Claude', 'Claude', 'Claude'] },
      { label: 'Генерация сайта целиком', vals: ['1 (разово)', '2', '8', '30', '120'] },
      { label: 'Перегенерация блоков', vals: ['10', '30', '120', '500', '1 800'] },
      { label: 'Анализ источников', vals: ['1', '5', '20', '80', '350'] },
      { label: 'ИИ-рекомендации (продвижение / контент)', vals: [false, '10', '40', '180', 'без ограничений*'] },
      { label: 'При превышении лимита', vals: ['блокировка', 'упрощённый режим', 'упрощённый режим', 'упрощённый режим', 'мягкий лимит'] },
      { label: 'Докупка операций сверх лимита', vals: [false, true, true, true, true] },
    ],
  },
  {
    title: 'Возможности сайта',
    rows: [
      { label: 'Шаблоны', vals: ['базовые', 'все базовые', 'все базовые', 'все + премиум', 'все + премиум'] },
      { label: 'Формы и заявки', vals: ['1 форма', 'без ограничений', 'без ограничений', 'без ограничений', 'без ограничений'] },
      { label: 'Уведомления на почту / в Telegram', vals: [false, true, true, true, true] },
      { label: 'Виджеты соцсетей и мессенджеров', vals: [false, true, true, true, true] },
      { label: 'Подключение Я.Метрики и пикселей', vals: [false, true, true, true, true] },
      { label: 'Приём платежей (ЮKassa, Тинькофф)', vals: [false, false, true, true, true] },
      { label: 'Корзина и каталог товаров', vals: [false, false, 'до 50 поз.', 'до 500 поз.', 'без ограничений'] },
      { label: 'SEO-настройки страниц', vals: ['базовые', 'расширенные', 'расширенные', 'расширенные', 'расширенные'] },
      { label: 'Подключение домен-зоны (*.brand.ru)', vals: [false, false, false, true, true] },
      { label: 'Экспорт кода сайта', vals: [false, false, false, false, true] },
    ],
  },
  {
    title: 'Аналитика',
    rows: [
      { label: 'Просмотры и посетители', vals: [false, true, true, true, true] },
      { label: 'Источники трафика', vals: [false, false, true, true, true] },
      { label: 'Воронка заявок и конверсии', vals: [false, false, true, true, true] },
      { label: 'Сравнение версий сайта', vals: [false, false, false, true, true] },
      { label: 'Экспорт отчётов (CSV / Excel)', vals: [false, false, false, true, true] },
    ],
  },
  {
    title: 'Команда и клиенты',
    rows: [
      { label: 'Командный доступ', vals: [false, false, '2 чел.', '5 чел.', '15 чел.'] },
      { label: 'Роли и права доступа', vals: [false, false, 'базовые', 'расширенные', 'расширенные'] },
      { label: 'Работа под брендом клиента', vals: [false, false, false, false, true] },
      { label: 'Передача сайта в аккаунт клиента', vals: [false, false, false, false, true] },
      { label: 'Биллинг от имени студии', vals: [false, false, false, false, true] },
    ],
  },
  {
    title: 'Поддержка',
    rows: [
      { label: 'База знаний и видеоуроки', vals: [true, true, true, true, true] },
      { label: 'Канал поддержки', vals: ['—', 'чат', 'чат', 'приоритетный чат', 'персональный менеджер'] },
      { label: 'Время ответа', vals: ['—', '24 ч', '12 ч', '4 ч', '1 ч'] },
      { label: 'Обучение команды (онлайн)', vals: [false, false, false, false, true] },
    ],
  },
];

function MatrixCell({ v, hi }) {
  if (v === true) {
    return <span style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: VT.successSoft, color: VT.success, alignItems: 'center', justifyContent: 'center' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 l4 4 10 -10"/></svg>
    </span>;
  }
  if (v === false) {
    return <span style={{ color: VT.inkFaint, fontSize: 16 }}>—</span>;
  }
  return <span style={{ fontSize: 13.5, lineHeight: 1.35, textAlign: 'center', fontVariantNumeric: 'tabular-nums', fontWeight: hi ? 700 : 500, color: hi ? VT.ink : VT.inkSoft }}>{v}</span>;
}

function PricingMatrix({ mobile }) {
  const firstCol = mobile ? 132 : 240;
  const planCol = mobile ? 116 : 192; // desktop: 240 + 5×192 = 1200, aligns with the page grid
  const totalW = firstCol + planCol * 5;
  const cellPad = mobile ? '10px 8px' : '12px 14px';
  const cols = `${firstCol}px repeat(5, ${planCol}px)`;

  // Continuous vertical highlight for the recommended column.
  const hiBg = (ci) => ci === PLAN_HILITE ? VT.accentSoft : 'transparent';
  const hiSide = (ci) => ci === PLAN_HILITE
    ? { boxShadow: `inset 1px 0 0 ${VT.accent}33, inset -1px 0 0 ${VT.accent}33` }
    : {};

  return (
    <div style={{
      marginTop: mobile ? 24 : 40,
      border: `1px solid ${VT.line}`, borderRadius: 20, overflow: 'hidden',
      background: VT.white,
      boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 24px 60px -30px rgba(120,60,30,0.28)',
    }}>
      <div style={mobile ? { overflowX: 'auto', WebkitOverflowScrolling: 'touch' } : { overflow: 'visible' }}>
        <div style={{ minWidth: mobile ? totalW : 0 }}>

          {/* PRICE HEADER BAND */}
          <div style={{
            display: 'grid', gridTemplateColumns: cols,
            position: 'sticky', top: 0, zIndex: 2,
            background: VT.white, borderBottom: `1px solid ${VT.line}`,
          }}>
            <div style={{
              padding: mobile ? '14px 10px' : '20px 18px',
              position: 'sticky', left: 0, background: VT.white, zIndex: 4,
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            }}>
              <div style={{
                fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.1em',
                color: VT.inkFaint, fontWeight: 700, textTransform: 'uppercase',
              }}>5 тарифов</div>
              <div style={{ marginTop: 4, fontSize: mobile ? 11.5 : 13, color: VT.inkSoft, lineHeight: 1.35 }}>
                первый месяц платного — бесплатно
              </div>
            </div>
            {PLAN_META.map((p, i) => {
              const hot = i === PLAN_HILITE;
              return (
                <div key={p.name} style={{
                  padding: mobile ? '14px 8px 14px' : `${hot ? 14 : 20}px 12px 18px`,
                  textAlign: 'center', position: 'relative',
                  background: hot ? VT.accentSoft : 'transparent',
                  ...hiSide(i),
                }}>
                  {hot && (
                    <div style={{
                      display: 'inline-block', marginBottom: 8,
                      fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.1em', fontWeight: 700,
                      color: '#fff', background: VT.accent,
                      padding: '3px 9px', borderRadius: 999, textTransform: 'uppercase',
                    }}>популярный</div>
                  )}
                  <div style={{
                    fontSize: mobile ? 13.5 : 15, fontWeight: 700, letterSpacing: '-0.015em',
                    color: hot ? VT.accent : VT.ink,
                  }}>{p.name}</div>
                  <div style={{
                    marginTop: 6, display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 3,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    <span style={{
                      fontSize: mobile ? 19 : 26, fontWeight: 800, letterSpacing: '-0.03em',
                      color: VT.ink, lineHeight: 1,
                    }}>{p.price}</span>
                    <span style={{ fontSize: mobile ? 10.5 : 12, fontWeight: 600, color: VT.inkSoft }}>{p.unit}</span>
                  </div>
                  <div style={{
                    marginTop: 4, fontSize: mobile ? 9.5 : 11, color: VT.inkFaint, lineHeight: 1.3,
                  }}>{p.sub}</div>
                </div>
              );
            })}
          </div>

          {PRICING_MATRIX.map((group, gi) => (
            <div key={gi}>
              {group.title && (
                <div style={{
                  gridColumn: '1 / -1',
                  padding: mobile ? '9px 10px' : '10px 18px',
                  background: VT.bgSoft,
                  fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.1em',
                  color: VT.inkFaint, fontWeight: 700, textTransform: 'uppercase',
                  borderTop: `1px solid ${VT.line}`, borderBottom: `1px solid ${VT.line}`,
                }}>{group.title}</div>
              )}
              {group.rows.map((row, ri) => (
                <div key={ri} style={{
                  display: 'grid', gridTemplateColumns: cols,
                  borderBottom: `1px solid ${VT.lineSoft}`, alignItems: 'stretch',
                  background: ri % 2 === 1 ? VT.bgSoft + '80' : 'transparent',
                }}>
                  <div style={{
                    padding: cellPad, fontSize: mobile ? 12 : 13.5, color: VT.inkSoft,
                    position: 'sticky', left: 0, zIndex: 3,
                    background: ri % 2 === 1 ? VT.bg : VT.white,
                    borderRight: `1px solid ${VT.line}`,
                    boxShadow: mobile ? '6px 0 8px -6px rgba(40,28,18,0.12)' : 'none',
                    display: 'flex', alignItems: 'center',
                  }}>{row.label}</div>
                  {row.vals.map((v, ci) => (
                    <div key={ci} style={{
                      padding: cellPad, textAlign: 'center',
                      background: hiBg(ci),
                      ...hiSide(ci),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <MatrixCell v={v} hi={ci === PLAN_HILITE} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}

          {/* CTA FOOTER ROW */}
          <div style={{ display: 'grid', gridTemplateColumns: cols, alignItems: 'stretch' }}>
            <div style={{
              position: 'sticky', left: 0, zIndex: 3, background: VT.white,
              borderRight: `1px solid ${VT.line}`,
            }} />
            {PLAN_META.map((p, i) => {
              const hot = i === PLAN_HILITE;
              return (
                <div key={p.name} style={{
                  padding: mobile ? '12px 6px' : '16px 10px', textAlign: 'center',
                  background: hot ? VT.accentSoft : 'transparent', ...hiSide(i),
                }}>
                  <a href="#hero" style={{
                    display: 'inline-block', width: '100%', boxSizing: 'border-box',
                    padding: mobile ? '8px 4px' : '9px 10px',
                    fontSize: mobile ? 11.5 : 13, fontWeight: 700,
                    borderRadius: 999, textDecoration: 'none', whiteSpace: 'nowrap',
                    background: hot ? VT.accent : 'transparent',
                    color: hot ? '#fff' : VT.accent,
                    border: hot ? 'none' : `1px solid ${VT.accent}`,
                  }}>{i === 0 ? 'Начать' : 'Выбрать'}</a>
                </div>
              );
            })}
          </div>
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
          margin: `${mobile ? 14 : 18}px auto 0`, maxWidth: 600,
          fontSize: mobile ? 15 : 17, lineHeight: 1.5, color: VT.inkSoft, textWrap: 'pretty',
        }}>
          От бесплатного старта до студийного. Первый месяц на любом платном — бесплатно, карту привязывать не надо.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <PricingMatrix mobile={mobile} />

        <div style={{ marginTop: 10, fontSize: 12, color: VT.inkFaint, textAlign: mobile ? 'left' : 'center' }}>
          * без ограничений в рамках честного использования
        </div>

        <div style={{ marginTop: mobile ? 18 : 28, textAlign: 'center' }}>
          <Btn style={{ padding: mobile ? '14px 26px' : '16px 36px', fontSize: mobile ? 15 : 16 }} iconRight={<IconArrow />}>
            Собрать сайт за 2 часа
          </Btn>
          <div style={{ marginTop: 12, fontSize: 12.5, color: VT.inkSoft, fontStyle: 'italic' }}>
            Начните на бесплатном тарифе — оплату подключите потом, если решите расти.
          </div>
        </div>

        <p style={{
          margin: `${mobile ? 22 : 30}px auto 0`, maxWidth: 600,
          fontSize: mobile ? 14 : 15, lineHeight: 1.55, color: VT.inkSoft, textAlign: 'center', textWrap: 'pretty',
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
      maxWidth: mobile ? '100%' : 1200,
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

// ── from landing-v3.jsx ──
// Standalone sticky header (избегаем зависимости от landing-samosite.jsx,
// чтобы v3-превью могло жить отдельно).
function StickyHeader({ mobile = false }) {
  // Боковые поля сужаются на средних экранах через clamp (canon 0.7.2 фикс),
  // чтобы в зоне ~720–1000px ряд не переполнялся и CTA не обрезалась.
  const px = mobile ? 20 : 'clamp(24px, 4vw, 80px)';
  const primaryStyle = mobile
    ? { background: VT.accent, color: '#fff', fontWeight: 600, fontSize: 13.5,
        padding: '8px 16px', borderRadius: 999, textDecoration: 'none',
        display: 'inline-flex', alignItems: 'center', gap: 4, border: 'none', whiteSpace: 'nowrap', flex: '0 0 auto' }
    : { background: VT.accent, color: '#fff', fontWeight: 600,
        padding: '10px 20px', borderRadius: 999, fontSize: 14,
        textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
        boxShadow: '0 6px 16px -8px rgba(120,60,30,0.4)', border: 'none', whiteSpace: 'nowrap', flex: '0 0 auto' };
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
        /* Единый hover для всех пунктов меню (включая «Войти»).
           !important — чтобы наведение переживало экспорт/запекание
           вычисленных стилей инлайном (инлайновый color/background
           по специфичности бьёт правило класса). */
        .ss-sticky-header a.ss-nav-link {
          color: ${VT.inkSoft}; text-decoration: none;
          padding: 6px 12px; border-radius: 999px;
          transition: color .15s ease, background .15s ease;
        }
        .ss-sticky-header a.ss-nav-link:hover {
          color: ${VT.ink} !important;
          background: ${VT.bgSoft} !important;
        }
      `}</style>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
      }}>
        <a href="#hero" style={{ textDecoration: 'none', color: 'inherit' }}>
          <BrandMark size={mobile ? 22 : 26} fontSize={mobile ? 18 : 20} />
        </a>
        {!mobile ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(12px, 1.6vw, 24px)', fontSize: 14, flexWrap: 'nowrap', minWidth: 0 }}>
            <a href="#examples" className="ss-nav-link" style={{ whiteSpace: 'nowrap' }}>Примеры</a>
            <a href="#pricing" className="ss-nav-link" style={{ whiteSpace: 'nowrap' }}>Цена</a>
            <a href="#faq" className="ss-nav-link" style={{ whiteSpace: 'nowrap' }}>Помощь</a>
            <a href="#login" className="ss-nav-link" style={{
              fontWeight: 500, fontSize: 14, whiteSpace: 'nowrap',
            }}>Войти</a>
            <a href="#hero" style={primaryStyle}>{primaryLabel} <span aria-hidden="true">→</span></a>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <a href="#login" className="ss-nav-link" style={{ fontWeight: 500, fontSize: 13.5 }}>Войти</a>
            <a href="#hero" style={primaryStyle}>{primaryLabel} <span aria-hidden="true">→</span></a>
          </div>
        )}
      </div>
    </div>
  );
}

function FloatingFeedback({ mobile }) {
  return (
    <a
      href="#feedback"
      aria-label="Чего не хватает?"
      style={{
        position: 'fixed',
        right: mobile ? 16 : 24,
        bottom: mobile ? 16 : 24,
        zIndex: 40,
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: mobile ? '12px 16px' : '13px 20px',
        background: VT.white,
        color: VT.ink,
        border: `1px solid ${VT.line}`,
        borderRadius: 999,
        fontFamily: VT.font.sans, fontSize: mobile ? 14 : 14.5, fontWeight: 600,
        letterSpacing: '-0.01em',
        textDecoration: 'none',
        boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 14px 32px -12px rgba(120,60,30,0.30), 0 4px 12px -6px rgba(40,28,18,0.12)',
        cursor: 'pointer',
      }}
    >
      <span style={{
        flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%',
        background: VT.accent, color: '#fff',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.6L3 21l1.9-5.8A8.5 8.5 0 1 1 21 11.5Z"/>
        </svg>
      </span>
      Чего не хватает?
    </a>
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
        <AnalyticsSection mobile={mobile} />
        <OwnershipSection mobile={mobile} />
        <PricingSection   mobile={mobile} />
        <FaqSection       mobile={mobile} />
        <FinalCtaSection  mobile={mobile} />
        <Footer mobile={mobile} />
        <FloatingFeedback mobile={mobile} />
      </div>
    </>
  );
}

function SamosaytLandingV3_Desktop() { return <SamosaytLandingV3 mobile={false} />; }
function SamosaytLandingV3_Mobile()  { return <SamosaytLandingV3 mobile={true} />; }

// ─────────────────────────────────────────────────────────────
// Public exports — canon 0.8.0
// ─────────────────────────────────────────────────────────────
const SamosaytLanding = SamosaytLandingV3;
const Landing = SamosaytLandingV3;
const ConceptA_Desktop = SamosaytLandingV3_Desktop;
const ConceptA_Mobile = SamosaytLandingV3_Mobile;
const SamosaytLanding_Desktop = SamosaytLandingV3_Desktop;
const SamosaytLanding_Mobile = SamosaytLandingV3_Mobile;
const HeroSection = HeroBlock;

export {
  SamosaytLandingV3,
  SamosaytLandingV3_Desktop,
  SamosaytLandingV3_Mobile,
  SamosaytLanding,
  SamosaytLanding_Desktop,
  SamosaytLanding_Mobile,
  Landing,
  ConceptA_Desktop,
  ConceptA_Mobile,
  StickyHeader,
  ChipStrip,
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

// ── 0.12.0 · Витрина v5 «Фарфор и лак» (additive; v3-секции выше — byte-identical) ──
// Новый namespace V5_* + реестры EXAMPLES/FAQ_ITEMS + V5_CSS/V5_Styles + V5_SiteViewer.
export * from './v5';
