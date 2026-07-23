'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · landing v5 — kit для полноразмерных сайтов-примеров (canon 0.14.0).
// Внутренний модуль: общие примитивы 5 сайтов (аналоги Img/Tail) + палитро-управляемые блоки секций.
// НЕ ре-экспортируется из index — только относительный импорт из ./v5-sites. Без window.*/IIFE/fetch.
import React, { useState, useEffect } from 'react';
import { VT } from '../tokens';


  // токены «Фарфор и лак» — хром/утилиты (радиус 0, тени none)
  const INK = '#1B1712', INK70 = '#4C463C', INK45 = '#6E675A';
  const LINE = '#E5DFD3', LINE2 = '#D6CEBE', BONE = '#F2EEE6';
  const ACCENT = '#7A2B34';
  const MONO = VT.font.mono;
  const SANS = VT.font.sans;

  // bespoke-палитры ниш — байт-в-байт из миниатюр
  const Pn = { bg: '#F7EFEC', ink: '#2A2320', soft: '#8A7C74', line: '#EEE1DC', accent: '#B0656F', btn: '#2A2320', onAccent: '#FAF4F1', serif: "'Cormorant', Georgia, serif" };
  const Pb = { bg: '#E7E2D6', ink: '#231C15', soft: '#6B5C48', line: '#D6CCB8', accent: '#8C4A22', btn: '#231C15', onAccent: '#F1EADC', serif: "'Oswald', sans-serif" };
  const Ps = { bg: '#FFFFFF', ink: '#1A1D1C', soft: '#727975', line: '#ECECEA', accent: '#2F7A68', btn: '#1A1D1C', onAccent: '#FFFFFF', serif: "'Spectral', Georgia, serif" };
  const Pr = { bg: '#EFE7DA', ink: '#241E17', soft: '#6E6053', line: '#DBD0BE', accent: '#7A5A3C', btn: '#241E17', onAccent: '#F5EFE4', serif: "'Playfair Display', Georgia, serif" };
  const Pc = { bg: '#F6F0F3', ink: '#221A24', soft: '#6E6472', line: '#E7DBE4', accent: '#9C2A8E', btn: '#221A24', onAccent: '#F9F0F6', serif: "'Cormorant', Georgia, serif" };

  const useMedia = (limit: number) => {
    const [n, setN] = useState(typeof window !== 'undefined' && window.innerWidth < limit);
    useEffect(() => {
      const on = () => setN(window.innerWidth < limit);
      window.addEventListener('resize', on);
      return () => window.removeEventListener('resize', on);
    }, [limit]);
    return n;
  };
  const useCompact = () => useMedia(640);
  const useNarrow = () => useMedia(900);

  const uns = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 900}&q=80`;

  // фото с деградацией: мёртвый id → штриховка + подпись; src переопределяет Unsplash
  function Img({ id, w, label, ph, style, pos, src }: any) {
    const [err, setErr] = useState(false);
    const base = { display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos || 'center' };
    const p = ph || ['#E5DFD3', '#D6CEBE', '#6E675A'];
    if (err || (!id && !src)) {
      return (
        <div style={{ ...base, ...style, backgroundImage: `repeating-linear-gradient(135deg, ${p[0]} 0 11px, ${p[1]} 11px 22px)`, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
          <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.05em', textTransform: 'uppercase', color: p[2], background: p[3] || 'rgba(255,255,255,.6)', padding: '3px 7px' }}>{label}</span>
        </div>
      );
    }
    return <img src={src || uns(id, w)} alt={label || ''} loading="lazy" onError={() => setErr(true)} style={{ ...base, ...style }} />;
  }

  // инертный CTA (выглядит как ссылка/кнопка, никуда не ведёт, вне tab-порядка)
  function FakeCTA({ style, children, block, kind }: any) {
    const base = block ? { display: 'flex', width: '100%' } : { display: 'inline-flex' };
    return <a href="#" onClick={(e) => e.preventDefault()} tabIndex={-1} aria-hidden="true"
      style={{ alignItems: 'center', justifyContent: 'center', gap: 8, cursor: 'default', textDecoration: 'none', ...base, ...style }}>{children}</a>;
  }

  function Stars({ n = 5, size = 13, gap = '1.5px', color = '#C9922E' }: any) {
    return <span aria-label={`${n} из 5`} style={{ color, fontSize: size, letterSpacing: gap, whiteSpace: 'nowrap' }}>{'★★★★★'.slice(0, n)}</span>;
  }

  // ── идентичность сайта (не sticky — sticky держит хром просмотрщика) ──
  function SiteHead({ P, name, meta, anchors, cta }: any) {
    const compact = useCompact();
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: compact ? '14px 20px' : '18px 40px', borderBottom: `1px solid ${P.line}`, background: P.bg }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
          <span style={{ fontFamily: P.serif, fontWeight: 600, fontSize: compact ? 20 : 23, lineHeight: 1, color: P.ink }}>{name}</span>
          {meta && <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase', color: P.soft }}>{meta}</span>}
        </div>
        {!compact && anchors && (
          <nav style={{ display: 'flex', gap: 26 }}>
            {anchors.map((a, i) => <FakeCTA key={i} style={{ fontFamily: SANS, fontWeight: 500, fontSize: 14, color: P.ink }}>{a}</FakeCTA>)}
          </nav>
        )}
        {cta && <FakeCTA style={{ fontFamily: SANS, fontWeight: 700, fontSize: compact ? 12.5 : 13.5, color: P.onAccent, background: P.btn, padding: compact ? '9px 13px' : '11px 18px', whiteSpace: 'nowrap' }}>{cta}</FakeCTA>}
      </div>
    );
  }

  const Wrap = ({ max = 1080, pad, children, style }: any) => (
    <div style={{ maxWidth: max, margin: '0 auto', paddingInline: pad || 'clamp(20px,5vw,40px)', ...style }}>{children}</div>
  );

  function SectionHead({ P, kicker, title, sub, center, accentWord }: any) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: center ? 'center' : 'left', alignItems: center ? 'center' : 'flex-start', marginBottom: 'clamp(24px,3vw,40px)' }}>
        {kicker && <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent }}>{kicker}</span>}
        <h2 style={{ margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: 'clamp(28px,3.4vw,42px)', lineHeight: 1.04, letterSpacing: '-.01em', color: P.ink, maxWidth: center ? '18ch' : '22ch' }}>{title}{accentWord && <> <span style={{ fontStyle: 'italic', color: P.accent }}>{accentWord}</span></>}</h2>
        {sub && <p style={{ margin: 0, fontFamily: SANS, fontSize: 15.5, lineHeight: 1.5, color: P.soft, maxWidth: '46ch', textWrap: 'pretty' }}>{sub}</p>}
      </div>
    );
  }

  // прайс: группы [{label, rows:[[name, price, meta]]}]
  function PriceList({ P, groups, dense }: any) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(22px,2.6vw,34px)' }}>
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.label && <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent, marginBottom: 6, paddingBottom: 10, borderBottom: `1px solid ${P.line}` }}>{g.label}</div>}
            {g.rows.map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: (dense ? '11px' : '15px') + ' 0', borderBottom: i < g.rows.length - 1 ? `1px solid ${P.line}` : 'none' }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 16, color: P.ink }}>{r[0]}</div>
                  {r[2] && <div style={{ fontFamily: SANS, fontSize: 13, color: P.soft, marginTop: 3 }}>{r[2]}</div>}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 14.5, color: P.ink, whiteSpace: 'nowrap' }}>{r[1]}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  // галерея: items [{id/src,label,ph,pos, span}] — span=2 растягивает на 2 колонки
  function Gallery({ items, cols = 3, gap = 3, ratio = '1 / 1' }: any) {
    const compact = useCompact();
    const c = compact ? Math.min(2, cols) : cols;
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${c}, 1fr)`, gap }}>
        {items.map((it, i) => (
          <div key={i} style={{ gridColumn: (!compact && it.span) ? `span ${it.span}` : 'span 1', aspectRatio: it.ratio || ratio, overflow: 'hidden', background: '#eee' }}>
            <Img id={it.id} src={it.src} w={it.w || 640} label={it.label} ph={it.ph} pos={it.pos} />
          </div>
        ))}
      </div>
    );
  }

  // отзывы: items [{n, source, text, who}] — один можно «длинный» (long)
  function Reviews({ P, items, cols = 3 }: any) {
    const compact = useCompact();
    const narrow = useNarrow();
    const c = compact ? 1 : (narrow ? Math.min(2, cols) : cols);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${c}, 1fr)`, gap: 'clamp(16px,2vw,28px)', alignItems: 'start' }}>
        {items.map((r, i) => (
          <figure key={i} style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 12, gridColumn: (!compact && r.long) ? 'span 2' : 'span 1', padding: '20px 22px', background: P.bg, borderTop: `2px solid ${P.accent}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
              <Stars n={r.n || 5} />
              <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.05em', color: P.soft }}>{(r.n || 5).toString().replace('.', ',')},0 · {r.source}</span>
            </div>
            <blockquote style={{ margin: 0, fontFamily: P.serif, fontStyle: 'italic', fontSize: r.long ? 21 : 18, lineHeight: 1.34, color: P.ink }}>{r.text}</blockquote>
            <figcaption style={{ marginTop: 'auto', fontFamily: MONO, fontSize: 10.5, letterSpacing: '.03em', color: P.soft }}>{r.who}</figcaption>
          </figure>
        ))}
      </div>
    );
  }

  // о мастере: facts [[value,label]]; photo {id/src,ph,pos}
  function About({ P, kicker, title, text, facts, photo, reverse }: any) {
    const narrow = useNarrow();
    const media = photo && (
      <div style={{ flex: narrow ? 'none' : '0 0 40%', aspectRatio: narrow ? '16 / 10' : '4 / 5', overflow: 'hidden', background: '#eee' }}>
        <Img id={photo.id} src={photo.src} w={photo.w || 700} label={photo.label} ph={photo.ph} pos={photo.pos} />
      </div>
    );
    const body = (
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {kicker && <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent }}>{kicker}</span>}
        <h2 style={{ margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1.06, letterSpacing: '-.01em', color: P.ink, maxWidth: '20ch' }}>{title}</h2>
        {(text || []).map((t, i) => <p key={i} style={{ margin: 0, fontFamily: SANS, fontSize: 15.5, lineHeight: 1.55, color: P.soft, maxWidth: '48ch', textWrap: 'pretty' }}>{t}</p>)}
        {facts && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px 34px', marginTop: 4, paddingTop: 18, borderTop: `1px solid ${P.line}` }}>
            {facts.map((f, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <span style={{ fontFamily: P.serif, fontWeight: 600, fontSize: 28, lineHeight: 1, color: P.accent }}>{f[0]}</span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.04em', color: P.soft, maxWidth: '18ch' }}>{f[1]}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 'clamp(24px,3.4vw,52px)', alignItems: narrow ? 'stretch' : 'center' }}>
        {reverse && !narrow ? <>{body}{media}</> : <>{media}{body}</>}
      </div>
    );
  }

  // запись + контакты: addr/hours строки; cta текст
  function Contacts({ P, title, addr, hours, phone, cta, note }: any) {
    const narrow = useNarrow();
    const Row = ({ k, v }: any) => (
      <div style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: `1px solid ${P.line}` }}>
        <span style={{ flex: '0 0 96px', fontFamily: MONO, fontSize: 10.5, letterSpacing: '.1em', textTransform: 'uppercase', color: P.soft }}>{k}</span>
        <span style={{ fontFamily: SANS, fontSize: 15, color: P.ink, whiteSpace: 'pre-line' }}>{v}</span>
      </div>
    );
    return (
      <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 'clamp(24px,3.4vw,52px)', alignItems: 'start' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: '0 0 18px', fontFamily: P.serif, fontWeight: 600, fontSize: 'clamp(26px,3vw,38px)', lineHeight: 1.06, letterSpacing: '-.01em', color: P.ink, maxWidth: '18ch' }}>{title}</h2>
          {addr && <Row k="Адрес" v={addr} />}
          {hours && <Row k="Часы" v={hours} />}
          {phone && <Row k="Связь" v={phone} />}
        </div>
        <div style={{ flex: narrow ? 'none' : '0 0 34%', alignSelf: narrow ? 'stretch' : 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <FakeCTA block style={{ background: P.accent, color: P.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 15.5, padding: '16px 20px' }}>{cta} <span aria-hidden="true">→</span></FakeCTA>
          {note && <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.03em', color: P.soft, textAlign: 'center' }}>{note}</span>}
        </div>
      </div>
    );
  }

  // футер сайта + watermark «Сделано на Самосайте» (некликабельный — реализм free-плана)
  function Watermark({ P, name, city }: any) {
    return (
      <footer style={{ background: P.btn, color: P.onAccent, paddingBlock: 'clamp(30px,4vw,48px)' }}>
        <Wrap style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ fontFamily: P.serif, fontWeight: 600, fontSize: 20, color: P.onAccent }}>{name}</span>
            {city && <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', opacity: .7 }}>{city}</span>}
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: MONO, fontSize: 11, letterSpacing: '.06em', opacity: .82 }}>
            <span style={{ width: 7, height: 7, background: P.accent, display: 'inline-block' }} />
            Сделано на&nbsp;Самосайте
          </span>
        </Wrap>
      </footer>
    );
  }

export {
  INK, INK70, INK45, LINE, LINE2, BONE, ACCENT, MONO, SANS,
  Pn, Pb, Ps, Pr, Pc, uns, Img, FakeCTA, Stars, SiteHead, Wrap,
  SectionHead, PriceList, Gallery, Reviews, About, Contacts, Watermark,
  useCompact, useNarrow,
};
