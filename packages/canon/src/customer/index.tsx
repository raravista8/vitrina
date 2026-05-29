'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Fragment } from 'react';
import { VT } from '../tokens';
import { Mono, Card, Btn, Checkbox, IconArrow, Spinner } from '../primitives';


// ── #7 Customer site template ──────────────────────────────
// 3 auto color schemes based on dominant photo color. Schemes share structure;
// only foreground/accent vary. Default = "warm cream" (matches Concept A).

const SCHEMES = {
  cream: { bg: VT.bg, bgAlt: VT.bgSoft, ink: VT.ink, sub: VT.inkSoft, line: VT.line, accent: VT.accent, accentSoft: VT.accentSoft, white: VT.white, photoTone: 'peach' },
  slate: { bg: 'oklch(0.96 0.005 250)', bgAlt: 'oklch(0.93 0.008 250)', ink: 'oklch(0.20 0.012 250)', sub: 'oklch(0.42 0.014 250)', line: 'oklch(0.88 0.006 250)', accent: 'oklch(0.55 0.13 250)', accentSoft: 'oklch(0.93 0.04 250)', white: '#ffffff', photoTone: 'slate' },
  sage:  { bg: 'oklch(0.97 0.008 145)', bgAlt: 'oklch(0.94 0.01 145)', ink: 'oklch(0.20 0.012 145)', sub: 'oklch(0.42 0.014 145)', line: 'oklch(0.88 0.008 145)', accent: 'oklch(0.50 0.12 145)', accentSoft: 'oklch(0.92 0.04 145)', white: '#ffffff', photoTone: 'sage' },
};

// Photo-like block — gradient mimics a real photo (no clip-art).
// `src` wins if provided — falls back to gradient.
function CPhoto({ tone = 'peach', src, children, style }) {
  const tones = {
    peach: ['oklch(0.86 0.07 50)', 'oklch(0.62 0.10 35)', 'oklch(0.42 0.08 28)'],
    sage:  ['oklch(0.84 0.06 145)', 'oklch(0.58 0.08 145)', 'oklch(0.34 0.06 145)'],
    slate: ['oklch(0.82 0.04 240)', 'oklch(0.52 0.06 240)', 'oklch(0.30 0.04 240)'],
    warm:  ['oklch(0.88 0.06 70)',  'oklch(0.70 0.12 50)', 'oklch(0.42 0.10 35)'],
    rose:  ['oklch(0.86 0.06 25)',  'oklch(0.62 0.10 20)', 'oklch(0.38 0.08 18)'],
  };
  const [c1, c2, c3] = tones[tone] || tones.peach;
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      background: src ? '#222' : `
        radial-gradient(110% 80% at 30% 20%, ${c1} 0%, transparent 55%),
        radial-gradient(110% 70% at 80% 90%, ${c3} 0%, transparent 55%),
        linear-gradient(160deg, ${c1} 0%, ${c2} 55%, ${c3} 100%)
      `,
      ...style,
    }}>
      {src && (
        <img src={src} alt="" loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
    </div>
  );
}

// Photo set for the canonical "Студия Анны" template demo
const U = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`;
const STUDIO_PHOTOS = {
  hero: U('photo-1604654894610-df63bc536371', 1100),
  master: U('photo-1580618672591-eb180b1a973f', 600),
  gallery: [
    U('photo-1607779097040-26e80aa78e66', 600),
    U('photo-1610992015732-2449b76344bc', 600),
    U('photo-1632345031435-8727f6897d53', 600),
    U('photo-1604902396830-aca29e19b067', 600),
    U('photo-1604654894610-df63bc536371', 600),
    U('photo-1607779097040-26e80aa78e66', 600),
    U('photo-1604902396830-aca29e19b067', 600),
    U('photo-1610992015732-2449b76344bc', 600),
    U('photo-1632345031435-8727f6897d53', 600),
    U('photo-1607779097040-26e80aa78e66', 600),
  ],
};

// Tiny portrait-style placeholder for client avatars in reviews — generated as
// a soft gradient with initials. Real sites use Я.Карт avatars when available.
function ReviewAvatar({ name, tone = 'peach', size = 36 }) {
  const initial = (name || '?').trim().charAt(0).toUpperCase();
  const tones = {
    peach: ['oklch(0.78 0.10 50)',  'oklch(0.55 0.12 35)'],
    rose:  ['oklch(0.80 0.09 25)',  'oklch(0.56 0.11 18)'],
    sage:  ['oklch(0.78 0.08 145)', 'oklch(0.52 0.10 145)'],
    slate: ['oklch(0.78 0.05 240)', 'oklch(0.52 0.06 240)'],
    butter:['oklch(0.84 0.10 85)',  'oklch(0.58 0.12 75)'],
  };
  const [c1, c2] = tones[tone] || tones.peach;
  return (
    <span style={{
      width: size, height: size, borderRadius: '50%', flex: '0 0 auto',
      background: `linear-gradient(140deg, ${c1}, ${c2})`,
      color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: Math.round(size * 0.42), letterSpacing: '-0.02em',
    }}>{initial}</span>
  );
}

function CStar({ filled = true, size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill={filled ? '#f4a93b' : 'none'} stroke={filled ? '#f4a93b' : '#ccc'} strokeWidth="1.5" strokeLinejoin="round">
      <path d="M10 1.5 L12.6 7 L18.5 7.8 L14.3 12 L15.3 18 L10 15.2 L4.7 18 L5.7 12 L1.5 7.8 L7.4 7 Z"/>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Customer-site canonical demo data (Студия Анны · Маникюр · Петрозаводск)
// In production this is template-bound to the user's parsed source.

const STUDIO = {
  name:      'Студия Анны',
  logo:      { letter: 'А', bg: 'oklch(0.55 0.13 30)', fg: '#fff' },
  category:  'Маникюр',
  city:      'Петрозаводск',
  address:   'г. Петрозаводск, ул. Ленина, 12',
  hours:     'пн–сб · 10:00–20:00 · вс выходной',
  phone:     '+7 921 234-56-78',
  phoneHref: '+79212345678',
  tg:        '@studia_anna',
  whatsapp:  '79212345678',
  trust: { years: '9 лет', clients: '1 200+', rating: '4.9 ★', reviews: 38 },
  hero: {
    title: 'Маникюр в Петрозаводске —\nбез боли, держится 3 недели',
    sub:   'Аппаратный маникюр и стойкое покрытие. Один клиент в час — без спешки, в тишине, с кофе.',
  },
  services: [
    { name: 'Аппаратный маникюр',           desc: 'Без воды, кутикула и форма — идеально', dur: '60 мин', price: '1 500 ₽',     priceHint: '' },
    { name: 'Маникюр + покрытие гель-лаком', desc: 'Стойкое покрытие, держится 3 недели',   dur: '90 мин', price: '2 200 ₽',     priceHint: '' },
    { name: 'Педикюр аппаратный',           desc: 'Бережно к коже, с распариванием',       dur: '90 мин', price: '2 800 ₽',     priceHint: '' },
    { name: 'Дизайн ногтей',                 desc: 'Френч, омбре, втирки, рисунок',         dur: '',       price: 'от 150 ₽',   priceHint: 'за ноготь' },
    { name: 'Снятие покрытия',               desc: 'Аккуратно, без вреда для ногтя',        dur: '20 мин', price: '500 ₽',       priceHint: '' },
  ],
  process: [
    { title: 'Записываетесь',  body: 'Через сайт, Telegram или звонок — ответим в течение часа.' },
    { title: 'Приходите',      body: 'Студия в центре Петрозаводска. Парковка во дворе.' },
    { title: 'Делаем маникюр', body: 'Тишина, кофе, ваш сериал на проекторе — без болтовни, если не хочется.' },
    { title: 'Уходите красивыми', body: 'Покрытие держится 3 недели или возврат. Записываем на следующий раз.' },
  ],
  reviews: [
    { author: 'Наталья К.',  date: 'Я.Карты · 12 апр',   stars: 5, text: 'Очень аккуратно и бережно, форма держится 3 недели. Записываюсь только сюда, и подруг привела. Аня всегда внимательная.', curated: true, tone: 'peach' },
    { author: 'Мария Л.',    date: 'Я.Карты · 02 апр',   stars: 5, text: 'Чисто, спокойно, всегда вовремя. Кофе тоже вкусный 🙂 Удобно записываться через бот, мне отвечают за 10 минут.', curated: true, tone: 'rose' },
    { author: 'Дарья Н.',    date: 'Я.Карты · 28 мар',   stars: 5, text: 'Записала на следующий день — всё успели идеально к свадьбе. Спасибо за выручку, теперь только сюда.', curated: false, tone: 'sage' },
    { author: 'Анна С.',     date: 'Telegram · 21 мар',  stars: 5, text: 'Прихожу уже 2 года, ни одного нарекания. Цены адекватные, мастер растёт вместе со мной.', curated: false, tone: 'butter' },
    { author: 'Юлия В.',     date: '2GIS · 14 мар',      stars: 5, text: 'Удобный сайт, удобная запись, удобное место. Не люблю салоны — а здесь как дома, тихо и спокойно.', curated: false, tone: 'slate' },
    { author: 'Ольга М.',    date: 'Я.Карты · 06 мар',   stars: 5, text: 'Сделала маникюр перед отпуском, через 3 недели вернулась — всё как только что. Никаких сколов.', curated: false, tone: 'peach' },
  ],
  about: {
    masterName: 'Анна Петрова',
    role: 'Мастер ногтевого сервиса',
    bio: 'Работаю с 2017 года, прошла обучение в Vivienne Sabo, регулярно повышаю квалификацию. Принимаю одного клиента в час — без спешки, с чашкой кофе и вашим сериалом на проекторе.',
    creds: [
      ['Vivienne Sabo · 2017',          'базовый курс'],
      ['Nail-school Moscow · 2019',     'аппаратный маникюр'],
      ['Сан-эпид заключение №',         'материалы стерильные'],
      ['Самозанятая · с 2020',           'оплата по СБП и кассой'],
    ],
  },
  guarantees: [
    'Все материалы — стерильные, одноразовые',
    'Покрытие держится 3 недели или возврат',
    'Удобная парковка во дворе',
    'Можно с детьми — есть зона ожидания',
  ],
  faq: [
    ['Сколько на самом деле держится покрытие?',
      'Гель-лак держится 3 недели при обычной нагрузке. Если есть сколы в первую неделю — переделаю бесплатно. Если в третью — это нормальный срок.'],
    ['Что если форма ногтей не подойдёт?',
      'Перед покрытием показываю готовую форму — если что-то не так, сразу исправляю. После — можно подкорректировать в течение 3 дней бесплатно.'],
    ['Можно ли отменить или перенести запись?',
      'Да, за 24 часа — без вопросов. Если за пару часов — постараюсь, но место может уже забрать другой клиент.'],
    ['Можно с детьми?',
      'Можно. Есть зона ожидания с мультиками и игрушками. Если ребёнку меньше трёх — лучше с кем-то, чтобы у меня были свободные руки.'],
    ['Как оплатить?',
      'Картой, СБП по QR, наличными. Чек выдаю — самозанятая, всё официально.'],
    ['Есть ли гарантия на работу?',
      'Да. Если покрытие сошло раньше срока без явных причин (механический скол не считается) — переделаю бесплатно.'],
    ['Принимаете в выходные?',
      'Суббота — рабочий день, до 20:00. Воскресенье — выходной, но иногда бывают сессии под запись заранее.'],
    ['Парковка есть?',
      'Да, во дворе бесплатно. На улицу не выезжайте — там платная зона.'],
  ],
};

// ─────────────────────────────────────────────────────────────
// Sticky header with anchor nav + phone + CTA

function CustomerHeader({ s }) {
  const links = [
    ['Услуги',  '#services'],
    ['Отзывы',  '#reviews'],
    ['О мастере', '#about'],
    ['Контакты',  '#contact'],
  ];
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 5,
      background: `${s.white}ee`, backdropFilter: 'blur(10px)',
      borderBottom: `1px solid ${s.line}`,
      padding: '12px 36px',
      display: 'flex', alignItems: 'center', gap: 24,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 32, height: 32, flex: '0 0 auto',
          borderRadius: 9,
          background: STUDIO.logo.bg, color: STUDIO.logo.fg,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 16, letterSpacing: '-0.04em', lineHeight: 1,
        }}>{STUDIO.logo.letter}</span>
        <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: s.ink }}>
          {STUDIO.name}
        </div>
      </div>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 22, marginLeft: 12, fontSize: 14, color: s.sub }}>
        {links.map(([label, href]) => <a key={label} href={href} style={{ color: 'inherit', textDecoration: 'none' }}>{label}</a>)}
      </nav>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <a href={`tel:${STUDIO.phoneHref}`} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: VT.font.mono, fontSize: 14, color: s.ink, textDecoration: 'none',
          fontWeight: 500,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          {STUDIO.phone}
        </a>
        <a href="#book" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: s.accent, color: s.white, fontWeight: 600,
          padding: '9px 18px', borderRadius: 999, fontSize: 14,
          textDecoration: 'none',
        }}>Записаться</a>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero — formula title + sub + dual CTA + mini-trust + photo

function CustomerHero({ s }) {
  return (
    <section style={{
      padding: '48px 36px 40px',
      borderBottom: `1px solid ${s.line}`,
      display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 36, alignItems: 'center',
    }}>
      <div>
        <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent }}>
          {STUDIO.category.toUpperCase()} · {STUDIO.city.toUpperCase()}
        </div>
        <h1 style={{
          fontSize: 52, fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 1.04,
          margin: '14px 0 16px', whiteSpace: 'pre-line', textWrap: 'balance',
        }}>
          {STUDIO.hero.title}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.5, color: s.sub, maxWidth: 480, margin: 0, textWrap: 'pretty' }}>
          {STUDIO.hero.sub}
        </p>

        {/* mini-trust row */}
        <div style={{
          marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', background: s.bgAlt, border: `1px solid ${s.line}`,
          borderRadius: 999,
        }}>
          <span style={{ display: 'inline-flex', gap: 1 }}>
            {[0,1,2,3,4].map(i => <CStar key={i} filled size={14} />)}
          </span>
          <span style={{ fontWeight: 700, color: s.ink, fontSize: 14 }}>{STUDIO.trust.rating}</span>
          <span style={{ color: s.sub, fontSize: 13 }}>· {STUDIO.trust.reviews} отзывов на Яндекс.Картах</span>
        </div>

        {/* dual CTA */}
        <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
          <a href="#book" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: s.accent, color: s.white, fontWeight: 600,
            padding: '14px 26px', borderRadius: 999, fontSize: 16,
            textDecoration: 'none',
            boxShadow: '0 10px 24px -12px rgba(0,0,0,0.25)',
          }}>Записаться <IconArrow size={16} /></a>
          <a href={`tel:${STUDIO.phoneHref}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: s.ink, fontWeight: 600,
            padding: '14px 22px', borderRadius: 999, fontSize: 15,
            border: `1px solid ${s.line}`, textDecoration: 'none',
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            {STUDIO.phone}
          </a>
        </div>
      </div>

      {/* Hero photo */}
      <CPhoto tone={s.photoTone} src={STUDIO_PHOTOS.hero} style={{ aspectRatio: '4 / 5', borderRadius: 16, border: `1px solid ${s.line}` }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)',
        }} />
        <div style={{ position: 'absolute', left: 20, bottom: 18, right: 20, color: '#fff' }}>
          <div style={{ fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.12em', opacity: 0.9 }}>
            СТУДИЯ В ЦЕНТРЕ ПЕТРОЗАВОДСКА
          </div>
          <div style={{ fontWeight: 600, fontSize: 15, marginTop: 4 }}>{STUDIO.address}</div>
        </div>
      </CPhoto>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Social proof bar — narrow band right after hero (aggregator badges)

function CustomerSocialBar({ s }) {
  const badges = [
    { logo: 'Я.К', name: 'Яндекс.Карты', stars: '4.9', count: '38 отзывов' },
    { logo: '2Г', name: '2GIS',          stars: '5.0', count: '12 отзывов' },
    { logo: 'TG', name: 'Telegram',      stars: '★★★★★', count: '420 подписчиков' },
  ];
  return (
    <section style={{
      padding: '20px 36px', background: s.bgAlt, borderBottom: `1px solid ${s.line}`,
      display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap',
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', gap: 8,
        fontFamily: VT.font.mono, fontSize: 12, letterSpacing: '0.1em', color: s.sub,
      }}>
        НАС ВЫБРАЛИ
        <span style={{ fontFamily: VT.font.sans, fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: s.ink }}>
          {STUDIO.trust.clients}
        </span>
        <span>ЧЕЛОВЕК ЗА {STUDIO.trust.years.toUpperCase()}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginLeft: 'auto', flexWrap: 'wrap' }}>
        {badges.map(b => (
          <div key={b.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              width: 30, height: 30, borderRadius: 8, background: s.white,
              border: `1px solid ${s.line}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: VT.font.mono, fontSize: 11, fontWeight: 700, color: s.ink,
            }}>{b.logo}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: s.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                {b.stars} <span style={{ color: '#f4a93b' }}>★</span>
                <span style={{ color: s.sub, fontWeight: 400 }}>· {b.name}</span>
              </div>
              <div style={{ fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }}>{b.count}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Services — 5 cards with name/desc/duration/price + per-card CTA

function CustomerServices({ s }) {
  return (
    <section id="services" style={{ padding: '52px 36px 40px', scrollMarginTop: 80 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
            УСЛУГИ И ЦЕНЫ
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 0', lineHeight: 1.1 }}>
            Что я делаю
          </h2>
        </div>
        <Mono style={{ fontSize: 11.5, color: s.sub }}>цены актуальны · обновлены 12 мая 2026</Mono>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 14,
      }}>
        {STUDIO.services.map((sv, i) => (
          <article key={sv.name} style={{
            background: s.white, border: `1px solid ${s.line}`,
            borderRadius: 16, padding: 22,
            display: 'flex', flexDirection: 'column', gap: 12,
            gridColumn: (i === 0 && STUDIO.services.length % 2 === 1) ? '1 / -1' : 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 }}>
              <h3 style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.022em', margin: 0, color: s.ink, lineHeight: 1.2 }}>
                {sv.name}
              </h3>
              <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
                <div style={{ fontFamily: VT.font.mono, fontSize: 18, fontWeight: 700, color: s.ink, letterSpacing: '-0.01em' }}>
                  {sv.price}
                </div>
                {sv.priceHint && <div style={{ fontSize: 11.5, color: s.sub, fontFamily: VT.font.mono }}>{sv.priceHint}</div>}
              </div>
            </div>
            <p style={{ fontSize: 14, color: s.sub, lineHeight: 1.5, margin: 0, flex: 1 }}>{sv.desc}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
              {sv.dur && (
                <span style={{
                  fontFamily: VT.font.mono, fontSize: 12, color: s.sub,
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"/>
                    <path d="M12 7v5l3 2"/>
                  </svg>
                  {sv.dur}
                </span>
              )}
              <a href="#book" style={{
                marginLeft: 'auto',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontSize: 14, fontWeight: 600, color: s.accent,
                textDecoration: 'none',
                padding: '8px 14px', borderRadius: 999,
                background: s.accentSoft,
              }}>Записаться <IconArrow size={14} /></a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Process — 4 steps with icons (paper/scissor style)

function ProcessIcon({ kind, color, soft }) {
  const sz = 26;
  const svg = {
    calendar: <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></svg>,
    pin:      <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z"/><circle cx="12" cy="10" r="3"/></svg>,
    coffee:   <svg viewBox="0 0 24 24" width={sz} height={sz} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h13v5a5 5 0 0 1-5 5H9 a5 5 0 0 1-5-5z"/><path d="M17 9 h2 a3 3 0 0 1 0 6 h-2"/><path d="M7 4 c 0 1 1 1 1 2 s -1 1 -1 2"/><path d="M11 4 c 0 1 1 1 1 2 s -1 1 -1 2"/></svg>,
    sparkles: <svg viewBox="0 0 24 24" width={sz} height={sz} fill="currentColor"><path d="M12 3 L13.4 8.2 L18.6 9 L13.4 9.8 L12 15 L10.6 9.8 L5.4 9 L10.6 8.2 Z"/><circle cx="19" cy="18" r="1.6"/><circle cx="6" cy="19" r="1.2"/></svg>,
  }[kind];
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 14,
      background: soft, color,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      flex: '0 0 auto',
    }}>{svg}</div>
  );
}

function CustomerProcess({ s }) {
  const icons = ['calendar', 'pin', 'coffee', 'sparkles'];
  return (
    <section style={{ padding: '40px 36px', background: s.bgAlt, borderTop: `1px solid ${s.line}`, borderBottom: `1px solid ${s.line}` }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
          КАК БУДЕТ
        </div>
        <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 0', lineHeight: 1.1 }}>
          От записи до результата —<br/>четыре шага
        </h2>
      </div>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16,
        position: 'relative',
      }}>
        {STUDIO.process.map((p, i) => (
          <div key={p.title} style={{ position: 'relative' }}>
            {/* connector */}
            {i < STUDIO.process.length - 1 && (
              <div aria-hidden="true" style={{
                position: 'absolute', top: 26, right: -16, width: 32, height: 2,
                background: `repeating-linear-gradient(to right, ${s.line} 0 4px, transparent 4px 8px)`,
              }} />
            )}
            <ProcessIcon kind={icons[i]} color={s.accent} soft={s.accentSoft} />
            <div style={{
              marginTop: 14,
              fontFamily: VT.font.mono, fontSize: 11.5, letterSpacing: '0.12em',
              color: s.sub, fontWeight: 600,
            }}>ШАГ {i + 1}</div>
            <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', margin: '4px 0 6px', color: s.ink }}>
              {p.title}
            </h3>
            <p style={{ fontSize: 13.5, color: s.sub, lineHeight: 1.5, margin: 0 }}>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Gallery — masonry 4-col, 10 photos

function CustomerGallery({ s }) {
  const tiles = [
    { tone: s.photoTone, span: 'l',  src: STUDIO_PHOTOS.gallery[0] },
    { tone: 'warm',  span: 's', src: STUDIO_PHOTOS.gallery[1] },
    { tone: 'rose',  span: 's', src: STUDIO_PHOTOS.gallery[2] },
    { tone: s.photoTone, span: 's', src: STUDIO_PHOTOS.gallery[3] },
    { tone: 'warm',  span: 's', src: STUDIO_PHOTOS.gallery[4] },
    { tone: 'rose',  span: 's', src: STUDIO_PHOTOS.gallery[5] },
    { tone: s.photoTone, span: 's', src: STUDIO_PHOTOS.gallery[6] },
    { tone: 'warm',  span: 's', src: STUDIO_PHOTOS.gallery[7] },
    { tone: 'rose',  span: 's', src: STUDIO_PHOTOS.gallery[8] },
    { tone: s.photoTone, span: 's', src: STUDIO_PHOTOS.gallery[9] },
  ];
  return (
    <section style={{ padding: '52px 36px 40px' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
            ПОРТФОЛИО
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 0', lineHeight: 1.1 }}>
            Работы
          </h2>
        </div>
        <Mono style={{ fontSize: 11.5, color: s.sub }}>обновляется из источника еженедельно</Mono>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridAutoRows: '170px',
        gap: 10,
      }}>
        {tiles.map((t, i) => (
          <CPhoto key={i} tone={t.tone} src={t.src} style={{
            gridColumn: t.span === 'l' ? 'span 2' : 'span 1',
            gridRow: t.span === 'l' ? 'span 2' : 'span 1',
            borderRadius: 12,
            border: `1px solid ${s.line}`,
          }} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Reviews — full dedicated block, 6 cards with avatars + curated badges

function CustomerReviews({ s }) {
  return (
    <section id="reviews" style={{ padding: '52px 36px 40px', background: s.bgAlt, borderTop: `1px solid ${s.line}`, scrollMarginTop: 80 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
            ОТЗЫВЫ
          </div>
          <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 8px', lineHeight: 1.1 }}>
            Что говорят клиенты
          </h2>
          <div style={{ fontSize: 14, color: s.sub, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-flex', gap: 1 }}>
              {[0,1,2,3,4].map(i => <CStar key={i} filled size={14}/>)}
            </span>
            <span style={{ fontWeight: 600, color: s.ink }}>4.9 из 5</span>
            <span>· {STUDIO.trust.reviews} отзывов на Яндекс.Картах</span>
          </div>
        </div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 12px', background: s.white, border: `1px solid ${s.line}`,
          borderRadius: 999,
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.1em', color: s.sub,
        }}>
          <span style={{ color: s.accent }}>★</span>
          <span>ЛУЧШИЕ — ВЫБРАЛ ИИ · ОБНОВЛЯЕТСЯ ЕЖЕНЕДЕЛЬНО</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {STUDIO.reviews.map((r, i) => (
          <div key={i} style={{
            background: s.white, border: `1px solid ${s.line}`, borderRadius: 14, padding: 20,
            position: 'relative',
            display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {r.curated && (
              <span style={{
                position: 'absolute', top: 14, right: 14,
                fontFamily: VT.font.mono, fontSize: 10, letterSpacing: '0.1em',
                background: s.accentSoft, color: s.accent,
                padding: '3px 8px', borderRadius: 4, fontWeight: 700,
              }}>★ ЛУЧШИЙ</span>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <ReviewAvatar name={r.author} tone={r.tone} size={36} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: s.ink, lineHeight: 1.1 }}>{r.author}</div>
                <div style={{ fontSize: 12, color: s.sub, fontFamily: VT.font.mono, marginTop: 2 }}>{r.date}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 2 }}>
              {Array.from({ length: 5 }).map((_, j) => <CStar key={j} filled={j < r.stars} size={13} />)}
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: s.ink, margin: 0, textWrap: 'pretty' }}>
              «{r.text}»
            </p>
          </div>
        ))}
      </div>

      {/* Mid-page CTA — right after social proof */}
      <div style={{
        marginTop: 28, textAlign: 'center',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
      }}>
        <a href="#book" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: s.accent, color: s.white, fontWeight: 600,
          padding: '14px 28px', borderRadius: 999, fontSize: 16,
          textDecoration: 'none',
        }}>Записаться к Анне <IconArrow size={16} /></a>
        <Mono style={{ fontSize: 12, color: s.sub }}>ближайшее окно — четверг 14:00</Mono>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// About / specialist — photo + name + experience + creds

function CustomerAbout({ s }) {
  return (
    <section id="about" style={{
      padding: '52px 36px',
      display: 'grid', gridTemplateColumns: '0.8fr 1.2fr', gap: 36, alignItems: 'flex-start',
      scrollMarginTop: 80,
    }}>
      <div>
        <CPhoto tone="rose" src={STUDIO_PHOTOS.master} style={{ aspectRatio: '4 / 5', borderRadius: 16, border: `1px solid ${s.line}` }} />
      </div>
      <div>
        <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
          О МАСТЕРЕ
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 4px', lineHeight: 1.1 }}>
          {STUDIO.about.masterName}
        </h2>
        <div style={{ fontSize: 15, color: s.sub, marginBottom: 16 }}>{STUDIO.about.role}</div>
        <p style={{ fontSize: 15.5, lineHeight: 1.6, color: s.ink, margin: '0 0 22px', maxWidth: 560, textWrap: 'pretty' }}>
          {STUDIO.about.bio}
        </p>

        {/* creds row */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10,
          marginBottom: 24,
        }}>
          {STUDIO.about.creds.map(([title, body]) => (
            <div key={title} style={{
              background: s.bgAlt, border: `1px solid ${s.line}`, borderRadius: 12,
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: s.ink, letterSpacing: '-0.01em' }}>{title}</div>
              <div style={{ fontSize: 12, color: s.sub, marginTop: 2 }}>{body}</div>
            </div>
          ))}
        </div>

        {/* guarantees */}
        <h3 style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 10px' }}>Что входит</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 14.5, color: s.ink, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {STUDIO.guarantees.map(item => (
            <li key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', lineHeight: 1.5 }}>
              <span style={{
                flex: '0 0 auto', width: 20, height: 20, borderRadius: '50%',
                background: s.accentSoft, color: s.accent,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginTop: 1,
              }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 l4 4 10 -10"/></svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQ — 8 Q&A in accordion (native details/summary for SEO)

function CustomerFaq({ s }) {
  return (
    <section style={{ padding: '52px 36px 40px', background: s.bgAlt, borderTop: `1px solid ${s.line}` }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
          ЧАСТЫЕ ВОПРОСЫ
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 0', lineHeight: 1.1 }}>
          Что обычно спрашивают
        </h2>
      </div>
      <div style={{
        maxWidth: 760, margin: '0 auto',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        {STUDIO.faq.map(([q, a], i) => (
          <details key={q} open={i === 0} style={{
            background: s.white, border: `1px solid ${s.line}`, borderRadius: 12, overflow: 'hidden',
          }}>
            <summary style={{
              listStyle: 'none', cursor: 'pointer',
              padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
              fontSize: 15.5, fontWeight: 600, color: s.ink, lineHeight: 1.35,
            }}>
              <span style={{ flex: 1 }}>{q}</span>
              <span style={{
                flex: '0 0 auto', width: 26, height: 26, borderRadius: '50%',
                background: s.bgAlt, color: s.accent,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, fontWeight: 700, lineHeight: 1,
              }}>+</span>
            </summary>
            <div style={{
              padding: '0 20px 16px',
              fontSize: 14.5, lineHeight: 1.6, color: s.sub, textWrap: 'pretty',
            }}>{a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Final booking — form (3 fields) + map placeholder + contacts + messengers

function CustomerInput({ placeholder, s, multiline, label }) {
  return (
    <div>
      {label && <div style={{ fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }}>{label}</div>}
      <div style={{
        padding: '13px 16px',
        background: s.white, border: `1px solid ${s.line}`,
        borderRadius: 10, fontSize: 15, color: VT.inkFaint,
        minHeight: multiline ? 70 : 'auto',
        fontFamily: VT.font.sans,
      }}>{placeholder}</div>
    </div>
  );
}

function MapPlaceholder({ s }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden',
      borderRadius: 14, border: `1px solid ${s.line}`, background: s.bgAlt,
      aspectRatio: '1 / 1', minHeight: 280,
    }}>
      {/* abstract map lines */}
      <svg viewBox="0 0 400 400" width="100%" height="100%" style={{ display: 'block', opacity: 0.6 }}>
        <defs>
          <pattern id="grid-map" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={s.line} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#grid-map)" />
        <path d="M 0 220 Q 100 180, 180 220 T 400 200" fill="none" stroke={s.accent} strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
        <path d="M 40 0 L 80 120 L 60 240 L 100 400" fill="none" stroke={s.sub} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <path d="M 220 0 L 260 180 L 240 400" fill="none" stroke={s.sub} strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
        <path d="M 0 80 L 400 60" fill="none" stroke={s.sub} strokeWidth="1.5" opacity="0.3"/>
        <path d="M 0 340 L 400 320" fill="none" stroke={s.sub} strokeWidth="1.5" opacity="0.3"/>
      </svg>
      {/* pin */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -100%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
      }}>
        <div style={{
          background: s.accent, color: '#fff',
          padding: '8px 14px', borderRadius: 12,
          fontSize: 13, fontWeight: 600, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.35)',
          whiteSpace: 'nowrap',
        }}>{STUDIO.name}</div>
        <svg width="22" height="14" viewBox="0 0 22 14" fill={s.accent}><path d="M0 0 L22 0 L11 14 Z"/></svg>
      </div>
      <div style={{
        position: 'absolute', left: 12, bottom: 12,
        fontFamily: VT.font.mono, fontSize: 10.5, color: s.sub,
        background: s.white, padding: '4px 8px', borderRadius: 6,
        border: `1px solid ${s.line}`,
      }}>Я.КАРТЫ · ИНТЕРАКТИВНАЯ</div>
    </div>
  );
}

function CustomerBooking({ s, confirmed = false }) {
  return (
    <section id="book" style={{
      padding: '52px 36px 40px', borderTop: `1px solid ${s.line}`, background: s.bg,
      scrollMarginTop: 80,
    }}>
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.14em', color: s.accent, fontWeight: 600 }}>
          ЗАПИСЬ
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', margin: '6px 0 6px', lineHeight: 1.1 }}>
          Запишитесь онлайн за 30 секунд
        </h2>
        <p style={{ fontSize: 15.5, color: s.sub, margin: 0 }}>
          Перезвоню за 15 минут. Данные не передаём третьим лицам.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 24, alignItems: 'stretch' }}>
        {/* Form */}
        <div style={{
          background: s.white, border: `1px solid ${s.line}`,
          borderRadius: 18, padding: 28,
        }}>
          {confirmed ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: s.bgAlt, borderRadius: 12 }}>
              <span style={{ width: 40, height: 40, borderRadius: '50%', background: VT.successSoft, color: VT.success, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>Заявка отправлена</div>
                <div style={{ fontSize: 13.5, color: s.sub }}>Перезвоню в течение часа. Можно закрыть страницу.</div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <CustomerInput label="Как вас зовут" placeholder="Имя" s={s} />
                <CustomerInput label="Телефон или @telegram" placeholder="+7 ___ ___-__-__" s={s} />
              </div>
              <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <CustomerSelect label="Услуга" value="Маникюр + покрытие" s={s} />
                <CustomerSelect label="Удобное время" value="завтра, после 14:00" s={s} />
              </div>

              {/* honeypot (display:none in prod) */}
              <Mono style={{ fontSize: 10, color: s.sub, marginTop: 10 }}>{`<input type="text" name="company" tabIndex={-1} style="display:none"> // honeypot`}</Mono>

              <div style={{ marginTop: 14 }}>
                <Checkbox checked={false} label={<>Согласен на обработку персональных данных</>} link="политика" />
              </div>

              <div style={{ marginTop: 16 }}>
                <a href="#book" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: s.accent, color: s.white, fontWeight: 700,
                  padding: '15px 24px', borderRadius: 12, fontSize: 16,
                  textDecoration: 'none', letterSpacing: '-0.005em',
                }}>Записаться <IconArrow size={16} /></a>
              </div>
              <Mono style={{ display: 'block', fontSize: 11, color: s.sub, marginTop: 10, textAlign: 'center' }}>
                Защищено Yandex SmartCaptcha
              </Mono>

              {/* alt messengers */}
              <div style={{
                marginTop: 18, paddingTop: 16,
                borderTop: `1px solid ${s.line}`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 13, color: s.sub, marginBottom: 10 }}>Не любите формы? Напишите в мессенджер:</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                  <a href={`https://t.me/${STUDIO.tg.replace('@','')}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'oklch(0.62 0.13 240)', color: '#fff', fontWeight: 600,
                    padding: '11px 18px', borderRadius: 10, fontSize: 14,
                    textDecoration: 'none',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z"/></svg>
                    Telegram
                  </a>
                  <a href={`https://wa.me/${STUDIO.whatsapp}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'oklch(0.62 0.14 145)', color: '#fff', fontWeight: 600,
                    padding: '11px 18px', borderRadius: 10, fontSize: 14,
                    textDecoration: 'none',
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2 A10 10 0 0 0 3 17 L2 22 L7 21 A10 10 0 1 0 12 2 Z M9 7 C 9.5 7 10 7.5 10.5 9 C 11 10 11 10.5 10 11 C 9.5 11.5 9 12 10 13 C 11 14 12 14.5 12.5 14 C 13 13 13.5 13 14.5 13.5 C 15.5 14 16 14.5 16 15 C 16 17 13 17 11 16 C 9 15 7 13 7 11 C 7 9 8 7 9 7 Z"/></svg>
                    WhatsApp
                  </a>
                  <a href={`tel:${STUDIO.phoneHref}`} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: s.bgAlt, color: s.ink, fontWeight: 600,
                    padding: '11px 18px', borderRadius: 10, fontSize: 14,
                    textDecoration: 'none', border: `1px solid ${s.line}`,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    Позвонить
                  </a>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Map + contact card */}
        <div id="contact" style={{
          display: 'flex', flexDirection: 'column', gap: 14, scrollMarginTop: 80,
        }}>
          <MapPlaceholder s={s} />
          <div style={{
            background: s.white, border: `1px solid ${s.line}`, borderRadius: 14,
            padding: '16px 18px',
          }}>
            <div style={{
              fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.12em',
              color: s.accent, fontWeight: 600, marginBottom: 8,
            }}>ГДЕ И КОГДА</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <span style={{ color: s.accent, marginTop: 1, flex: '0 0 auto' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 C 7 2, 4 6, 4 10 C 4 16, 12 22, 12 22 C 12 22, 20 16, 20 10 C 20 6, 17 2, 12 2 Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <span style={{ fontSize: 14, color: s.ink, lineHeight: 1.4 }}>{STUDIO.address}</span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ color: s.accent, marginTop: 1, flex: '0 0 auto' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              </span>
              <span style={{ fontSize: 14, color: s.ink, lineHeight: 1.4 }}>{STUDIO.hours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CustomerSelect({ label, value, s }) {
  return (
    <div>
      {label && <div style={{ fontSize: 12.5, color: s.sub, fontWeight: 500, marginBottom: 5 }}>{label}</div>}
      <div style={{
        padding: '13px 16px',
        background: s.white, border: `1px solid ${s.line}`,
        borderRadius: 10, fontSize: 15, color: s.ink,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{value}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.sub} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </div>
    </div>
  );
}

// Re-exported for #8 confirmation artboard (back-compat)
function CustomerLeadForm({ s, confirmed = false }) {
  return <CustomerBooking s={s} confirmed={confirmed} />;
}

// ─────────────────────────────────────────────────────────────
// Footer + sticky mobile CTA

function CustomerFooter({ s, plan = 'free' }) {
  return (
    <footer style={{
      padding: '22px 36px 24px', borderTop: `1px solid ${s.line}`,
      background: s.bgAlt,
      display: 'flex', flexDirection: 'column', gap: 12,
      fontSize: 13, color: s.sub,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          <span style={{ color: s.ink, fontWeight: 600 }}>{STUDIO.name}</span>
          <span>· {STUDIO.address}</span>
          <a href={`tel:${STUDIO.phoneHref}`} style={{ color: 'inherit', textDecoration: 'none', fontFamily: VT.font.mono }}>{STUDIO.phone}</a>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 12.5 }}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Политика конфиденциальности</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>Реквизиты</a>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, fontSize: 12 }}>
        <span>© 2026 {STUDIO.name}. ИП Петрова А. И., самозанятая.</span>
        {plan === 'free' ? (
          <a style={{
            color: s.sub, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
            fontFamily: VT.font.mono, fontSize: 11.5,
          }}>
            СДЕЛАНО НА <b style={{ color: s.ink, fontFamily: VT.font.sans }}>Самосайте</b> →
          </a>
        ) : <span />}
      </div>
    </footer>
  );
}

function StickyMobileCTA({ s }) {
  // Demo-only: floats over the bottom of the artboard to show what mobile users see.
  return (
    <div aria-hidden="true" style={{
      position: 'sticky', bottom: 0, zIndex: 4,
      padding: '12px 16px',
      background: `${s.white}f5`, backdropFilter: 'blur(10px)',
      borderTop: `1px solid ${s.line}`,
      display: 'flex', alignItems: 'center', gap: 10,
      boxShadow: '0 -8px 24px -10px rgba(0,0,0,0.15)',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: s.sub, fontFamily: VT.font.mono, letterSpacing: '0.06em' }}>
          ОТ 1 500 ₽ · 60 МИН
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: s.ink, lineHeight: 1.2 }}>Маникюр у Анны</div>
      </div>
      <a href={`tel:${STUDIO.phoneHref}`} style={{
        width: 42, height: 42, borderRadius: 12,
        background: s.bgAlt, color: s.ink,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        border: `1px solid ${s.line}`, textDecoration: 'none',
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </a>
      <a href="#book" style={{
        background: s.accent, color: s.white, fontWeight: 700,
        padding: '12px 20px', borderRadius: 12, fontSize: 15,
        textDecoration: 'none',
      }}>Записаться</a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Composer

function S7_CustomerSite({ scheme = 'cream', plan = 'free' }) {
  const s = SCHEMES[scheme];
  return (
    <div style={{ background: s.bg, color: s.ink, fontFamily: VT.font.sans, minHeight: '100%', letterSpacing: '-0.005em', position: 'relative' }}>
      {/* simulated browser bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '10px 14px',
        borderBottom: `1px solid ${s.line}`, background: s.white,
        fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.line }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.line }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: s.line }} />
        <span style={{ marginLeft: 12 }}>studia-anna.samosite.online</span>
      </div>
      <CustomerHeader     s={s} />
      <CustomerHero       s={s} />
      <CustomerSocialBar  s={s} />
      <CustomerServices   s={s} />
      <CustomerProcess    s={s} />
      <CustomerGallery    s={s} />
      <CustomerReviews    s={s} />
      <CustomerAbout      s={s} />
      <CustomerFaq        s={s} />
      <CustomerBooking    s={s} />
      <CustomerFooter     s={s} plan={plan} />
    </div>
  );
}

// ── #8 Lead form — confirmation state ──────────────────────
function S8_LeadFormConfirm() {
  const s = SCHEMES.cream;
  return (
    <div style={{ background: s.bg, fontFamily: VT.font.sans, padding: 24 }}>
      <CustomerLeadForm s={s} confirmed={true} />
    </div>
  );
}

// ── Color scheme swatches ──────────────────────────────────
function S7_SchemeSwatches() {
  return (
    <div style={{
      background: VT.bg, padding: 28, fontFamily: VT.font.sans,
      display: 'flex', gap: 18, alignItems: 'flex-start',
    }}>
      {[
        ['cream', 'Тёплая', 'дефолт для бежевых/тёплых фото'],
        ['slate', 'Холодная', 'для чёрно-белых / графитовых фото'],
        ['sage', 'Природная', 'для зелёных / древесных тонов'],
      ].map(([key, name, hint]) => {
        const s = SCHEMES[key];
        return (
          <div key={key} style={{ width: 200 }}>
            <div style={{
              height: 110, borderRadius: VT.r.md, overflow: 'hidden',
              border: `1px solid ${s.line}`, background: s.bg,
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{ flex: 1, padding: 12, color: s.ink, fontWeight: 700, fontSize: 16, letterSpacing: '-0.02em' }}>
                Студия Анны
              </div>
              <div style={{ height: 8, background: s.accent }} />
              <div style={{ display: 'flex', gap: 4, padding: 8 }}>
                {[0,1,2].map(i => <div key={i} style={{ flex: 1, height: 14, borderRadius: 3, background: s.accentSoft }} />)}
              </div>
            </div>
            <div style={{ marginTop: 8, fontSize: 13, fontWeight: 600 }}>{name}</div>
            <div style={{ fontSize: 12, color: VT.inkFaint }}>{hint}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── #9 Feedback form ───────────────────────────────────────
// ADR-0009 rev.2: NOT a standalone /feedback page — a modal over any page.
// Foot-in-the-door: easy action first (one checkbox vote); the contact block
// wakes up only after the first vote. X/10 counters + progress bars give
// social proof and the "push it to 10" pull. [base] = current tally from API.
// ── #9 Feedback · public types (controlled API, ADR-0009 rev.2) ──
export type FbKind = 'source' | 'feature';
export type FbVote = { kind: FbKind; key: string };

export interface FbTally {
  /** option_key → votes (real count; UI clamps to 10) */
  items: Record<string, number>;
  /** votes in the trailing 7 days (shown in the header pill) */
  total_week: number;
}

export interface FbSubmitPayload {
  votes: FbVote[];
  own_source: string | null;
  own_feature: string | null;
  message: string | null;
  name: string | null;
  contact: string | null;
}

export interface S9_FeedbackModalProps {
  mobile?: boolean;
  /** controlled open; omit for canvas/uncontrolled */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** live counts from GET /api/feedback/tally; falls back to baked base */
  tally?: FbTally;
  /** receives the full payload; consumer does the POST + captcha around it */
  onSubmit?: (payload: FbSubmitPayload) => void | Promise<void>;
  submitting?: boolean;
  error?: string | null;
  /** false (prod): no FauxPage, overlay fixed to viewport.
   *  true (canvas): FauxPage behind + overlay absolute.
   *  Defaults to canvas mode only on a zero-prop / uncontrolled mount. */
  embedded?: boolean;
}

const FB_SOURCES = [
  ['vk', 'ВКонтакте', 9],
  ['ozon', 'Ozon-витрина', 7],
  ['youtube', 'YouTube / Shorts', 6],
  ['dzen', 'Дзен', 4],
  ['max', 'MAX-канал', 2],
];

const FB_FEATURES = [
  ['yclients', 'YCLIENTS интеграция', 8],
  ['amocrm', 'amoCRM интеграция', 5],
  ['custom_domain', 'Свой домен', 9],
  ['no_watermark', 'Убрать «Сделано на Самосайте»', 7],
  ['multilang', 'Несколько языков', 3],
  ['payments', 'Онлайн-оплата', 6],
  ['blog', 'Блог-CMS', 4],
  ['stats', 'Статистика посетителей', 5],
];

// Backward-compat: data names from 0.1.x.
const WAITLIST_SOURCES = FB_SOURCES.map(([k, l]) => [k, l]);
const FEATURE_LIST = FB_FEATURES.map(([k, l]) => [k, l]);

function fbPlural(n) {
  const d = n % 10, h = n % 100;
  if (h >= 11 && h <= 14) return 'голосов';
  if (d === 1) return 'голос';
  if (d >= 2 && d <= 4) return 'голоса';
  return 'голосов';
}

// One vote line: checkbox + label + meter (bar + X/10). +1 on check (optimistic).
// On mobile the meter drops below the label (full-width bar), indented to align.
function FBVoteRow({ label, base, checked, onToggle, first, mobile }) {
  const v = base + (checked ? 1 : 0);
  const done = v >= 10;
  const pct = Math.min(v, 10) / 10 * 100;
  return (
    <label
      onClick={onToggle}
      style={{
        display: 'flex', flexDirection: mobile ? 'column' : 'row',
        alignItems: mobile ? 'stretch' : 'center', gap: mobile ? 7 : 13,
        padding: '11px 0',
        borderTop: first ? 'none' : `1px solid ${VT.lineSoft}`,
        cursor: 'pointer', userSelect: 'none',
      }}
    >
      <span style={{ display: 'flex', alignItems: 'center', gap: 13, flex: 1, minWidth: 0 }}>
        <span style={{
          flex: '0 0 auto', width: 21, height: 21, borderRadius: 6,
          border: `2px solid ${checked ? VT.accent : VT.line}`,
          background: checked ? VT.accent : VT.white,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .16s',
        }}>
          {checked && (
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.4"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>
          )}
        </span>
        <span style={{ flex: 1, minWidth: 0, fontSize: 15, fontWeight: 500, lineHeight: 1.25, color: VT.ink }}>{label}</span>
      </span>
      <span style={{
        flex: '0 0 auto', width: mobile ? 'auto' : 116,
        paddingLeft: mobile ? 34 : 0,
        display: 'flex', alignItems: 'center', gap: 9,
      }}>
        <span style={{ flex: 1, height: 5, borderRadius: 99, background: VT.bgSoft, overflow: 'hidden' }}>
          <span style={{ display: 'block', height: '100%', width: pct + '%', background: VT.accent, borderRadius: 99, transition: 'width .35s cubic-bezier(.2,.7,.2,1)' }} />
        </span>
        <span style={{
          fontFamily: VT.font.mono, fontSize: 12, fontWeight: 500,
          fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap',
          color: done ? VT.accent : VT.inkFaint,
        }}>{Math.min(v, 10)}/10</span>
      </span>
    </label>
  );
}

// Small inline "+ свой вариант" / "+ комментарий" reveal link.
function FBReveal({ label, shown, onShow, children }) {
  if (shown) return <div style={{ marginTop: 10 }}>{children}</div>;
  return (
    <button
      type="button"
      onClick={onShow}
      style={{
        marginTop: 12, background: 'none', border: 'none', cursor: 'pointer',
        color: VT.accent, fontFamily: VT.font.sans, fontSize: 13.5, fontWeight: 600,
        padding: '2px 0',
      }}
    >{label}</button>
  );
}

function FBField({ placeholder, value, onChange, textarea }) {
  const common = {
    width: '100%', boxSizing: 'border-box', fontFamily: VT.font.sans, fontSize: 16,
    color: VT.ink, background: VT.white, border: `1.5px solid ${VT.line}`,
    borderRadius: VT.r.md, padding: '11px 13px', outline: 'none',
  };
  return textarea
    ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{ ...common, resize: 'vertical', minHeight: 84 }} />
    : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={common} />;
}

// `baseOf(key, fallback)` lets the section read live tally numbers (or baked base).
function FBVoteSection({ title, items, votes, onToggle, baseOf, ownVal, ownShown, onOwnShow, onOwnChange, ownPlaceholder, mobile }) {
  return (
    <div style={{ marginTop: 18 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 2px' }}>{title}</h3>
      <p style={{ fontSize: 12.5, color: VT.inkFaint, margin: '0 0 8px' }}>Отметьте нужное — голос засчитается сразу</p>
      <div>
        {items.map(([key, label, base], i) => (
          <FBVoteRow key={key} label={label} base={baseOf(key, base)} first={i === 0} mobile={mobile}
            checked={!!votes[key]} onToggle={() => onToggle(key)} />
        ))}
      </div>
      <FBReveal label="+ свой вариант" shown={ownShown} onShow={onOwnShow}>
        <FBField placeholder={ownPlaceholder} value={ownVal} onChange={onOwnChange} />
      </FBReveal>
    </div>
  );
}

// ── #9 Feedback · vote-first modal · controlled API (ADR-0009 rev.2) ──
// Zero-prop  → canvas mock (open=true, FauxPage behind, position:absolute).
// Prod mount → pass {open,onOpenChange,tally,onSubmit}; embedded=false drops
// the FauxPage and fixes the overlay to the viewport.
function S9_FeedbackModal(props: S9_FeedbackModalProps = {}) {
  const p = props;
  const {
    mobile,
    open: openProp,
    onOpenChange,
    tally,
    onSubmit,
    submitting = false,
    error = null,
    embedded: embeddedProp,
  } = p;
  const { useState } = React;

  // controlled vs canvas/mock
  const isControlled = openProp !== undefined;
  const isCanvas = !isControlled && typeof onSubmit !== 'function';
  const embedded = embeddedProp !== undefined ? embeddedProp : isCanvas;

  const [internalOpen, setInternalOpen] = useState(isCanvas); // canvas opens by default
  const isOpen = isControlled ? openProp : internalOpen;
  const setOpen = (v) => {
    if (onOpenChange) onOpenChange(v);
    if (!isControlled) setInternalOpen(v);
  };

  const [votes, setVotes] = useState({});
  const [ownSrc, setOwnSrc] = useState('');
  const [ownFeat, setOwnFeat] = useState('');
  const [showOwnSrc, setShowOwnSrc] = useState(false);
  const [showOwnFeat, setShowOwnFeat] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const [msg, setMsg] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // tally injection: real numbers from GET /api/feedback/tally, else baked base.
  const tallyItems = (tally && tally.items) || null;
  const baseOf = (key, fallback) => (tallyItems && tallyItems[key] != null ? tallyItems[key] : fallback);
  const baseTotal = (tally && tally.total_week != null) ? tally.total_week : 340;

  const checkedCount = Object.values(votes).filter(Boolean).length;
  const ownCount = (ownSrc.trim() ? 1 : 0) + (ownFeat.trim() ? 1 : 0);
  const n = checkedCount + ownCount;
  const awake = n > 0;

  const toggle = (key) => setVotes(v => ({ ...v, [key]: !v[key] }));
  const reset = () => {
    setVotes({}); setOwnSrc(''); setOwnFeat(''); setShowOwnSrc(false);
    setShowOwnFeat(false); setShowMsg(false); setMsg(''); setName('');
    setContact(''); setSubmitted(false);
  };

  const buildPayload = () => ({
    votes: [
      ...FB_SOURCES.filter(([k]) => votes[k]).map(([k]) => ({ kind: 'source', key: k })),
      ...FB_FEATURES.filter(([k]) => votes[k]).map(([k]) => ({ kind: 'feature', key: k })),
    ],
    own_source: ownSrc.trim() || null,
    own_feature: ownFeat.trim() || null,
    message: msg.trim() || null,
    name: name.trim() || null,
    contact: contact.trim() || null,
  });

  const handleSubmit = async () => {
    if (n === 0 || submitting) return;
    if (typeof onSubmit === 'function') {
      try {
        await onSubmit(buildPayload());
        setSubmitted(true);
      } catch (e) {
        /* consumer surfaces failure via `error` prop; keep modal open */
      }
    } else {
      setSubmitted(true); // canvas / uncontrolled mock
    }
  };

  // Faux page behind — canvas artboard only (embedded=true).
  const FauxPage = () => (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', padding: mobile ? '20px' : '32px 48px', filter: isOpen ? 'blur(2px)' : 'none' }}>
      <div style={{ height: 18, width: mobile ? 120 : 180, background: VT.line, borderRadius: 6, opacity: .6 }} />
      <div style={{ height: mobile ? 32 : 46, width: '70%', background: VT.line, borderRadius: 10, opacity: .5, marginTop: 22 }} />
      <div style={{ height: 14, width: '52%', background: VT.line, borderRadius: 6, opacity: .4, marginTop: 16 }} />
      <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 16, marginTop: 30 }}>
        {[0, 1, 2].map(i => <div key={i} style={{ flex: 1, height: mobile ? 90 : 150, background: VT.line, borderRadius: 14, opacity: .35 }} />)}
      </div>
    </div>
  );

  const FloatingBtn = ({ fixed }) => (
    <button
      type="button"
      data-floating-feedback-btn
      onClick={() => setOpen(true)}
      style={{
        position: fixed ? 'fixed' : 'absolute', right: mobile ? 16 : 28, bottom: mobile ? 16 : 28,
        zIndex: fixed ? 2147483000 : 3,
        background: VT.accent, color: VT.white, border: 'none', cursor: 'pointer',
        padding: '14px 20px', borderRadius: VT.r.pill,
        fontFamily: VT.font.sans, fontSize: 14.5, fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', gap: 9,
        boxShadow: VT.shadow.pop,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
      Чего не хватает?
    </button>
  );

  const Dialog = () => (
    <div
      data-feedback-modal
      style={{
        position: embedded ? 'absolute' : 'fixed', inset: 0,
        zIndex: embedded ? 4 : 2147483600,
        background: 'oklch(0.30 0.02 60 / 0.46)',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        padding: mobile ? '14px 10px' : '40px 24px',
        overflowY: 'auto',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div style={{
        position: 'relative', width: '100%', maxWidth: mobile ? 9999 : 560,
        background: VT.bg, border: `1px solid ${VT.line}`, borderRadius: VT.r.xl,
        boxShadow: VT.shadow.pop, overflow: 'hidden',
      }}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          style={{
            position: 'absolute', top: 14, right: 14, zIndex: 2,
            width: 34, height: 34, borderRadius: VT.r.pill,
            border: 'none', background: VT.bgSoft, color: VT.inkSoft,
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: mobile ? '48px 24px' : '56px 36px' }}>
            <div style={{
              width: 60, height: 60, borderRadius: '50%', background: VT.success, color: '#fff',
              display: 'grid', placeItems: 'center', margin: '0 auto 20px',
              boxShadow: `0 0 0 8px ${VT.successSoft}`,
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h2 style={{ fontSize: 23, fontWeight: 700, letterSpacing: '-0.02em', margin: 0 }}>Спасибо, голос учли</h2>
            <p style={{ fontSize: 15, color: VT.inkSoft, maxWidth: 380, margin: '10px auto 0', lineHeight: 1.5 }}>
              Засчитали {n} {fbPlural(n)}. Как только по пункту наберётся 10 — берём в работу
              {contact.trim() ? ' и напишем вам.' : '. Хотите узнать о запуске — оставьте контакт.'}
            </p>
            <div style={{ marginTop: 24 }} onClick={() => setOpen(false)}>
              <Btn variant="secondary" size="sm" style={{ cursor: 'pointer' }}>Готово</Btn>
            </div>
          </div>
        ) : (
          <div style={{ padding: mobile ? '26px 20px 22px' : '30px 32px 26px' }}>
            <h2 style={{ fontSize: mobile ? 21 : 24, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 40px 8px 0', lineHeight: 1.12 }}>
              Скажите, чего не хватает
            </h2>
            <p style={{ fontSize: 14, color: VT.inkSoft, margin: 0, maxWidth: 440, lineHeight: 1.45 }}>
              Набираем 10 голосов по пункту — берём в работу. Чем больше людей просят одно и то же, тем быстрее запускаем.
            </p>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14,
              fontSize: 12.5, color: VT.inkSoft, fontWeight: 500,
              background: VT.white, border: `1px solid ${VT.line}`, padding: '6px 12px', borderRadius: VT.r.pill, whiteSpace: 'nowrap',
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: VT.success, boxShadow: `0 0 0 4px ${VT.successSoft}` }} />
              <b style={{ color: VT.ink, fontVariantNumeric: 'tabular-nums' }}>{baseTotal + n}</b>&nbsp;голосов за неделю
            </span>

            <FBVoteSection
              title="Хочу источник" items={FB_SOURCES} votes={votes} onToggle={toggle} mobile={mobile} baseOf={baseOf}
              ownVal={ownSrc} ownShown={showOwnSrc} onOwnShow={() => setShowOwnSrc(true)}
              onOwnChange={setOwnSrc} ownPlaceholder="укажите название источника"
            />
            <FBVoteSection
              title="Хочу фичу" items={FB_FEATURES} votes={votes} onToggle={toggle} mobile={mobile} baseOf={baseOf}
              ownVal={ownFeat} ownShown={showOwnFeat} onOwnShow={() => setShowOwnFeat(true)}
              onOwnChange={setOwnFeat} ownPlaceholder="укажите название фичи"
            />

            <div style={{
              marginTop: 20, paddingLeft: 15,
              borderLeft: `3px solid ${awake ? VT.accent : VT.line}`,
              opacity: awake ? 1 : 0.5,
              pointerEvents: awake ? 'auto' : 'none',
              transition: 'opacity .3s, border-color .3s',
            }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <span style={{
                  flex: '0 0 auto', width: 28, height: 28, borderRadius: '50%', marginTop: 1,
                  border: `2px solid ${awake ? VT.success : VT.line}`,
                  background: awake ? VT.success : VT.white, color: '#fff',
                  display: 'grid', placeItems: 'center', transition: 'all .3s',
                }}>
                  {awake && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </span>
                <div>
                  <strong style={{ display: 'block', fontSize: 15.5, fontWeight: 700 }}>Напишем, когда добавим</strong>
                  <span style={{ display: 'block', fontSize: 13, color: VT.inkSoft, marginTop: 3, lineHeight: 1.4 }}>
                    Оставьте контакт — сообщим, как только ваш голос наберёт 10 и пункт попадёт в работу. Никому не покажем и спамить не будем.
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 11, marginTop: 14 }}>
                <FBField placeholder="Имя" value={name} onChange={setName} />
                <FBField placeholder="Email, телефон или @telegram" value={contact} onChange={setContact} />
              </div>
              <FBReveal label="+ комментарий" shown={showMsg} onShow={() => setShowMsg(true)}>
                <FBField textarea placeholder="что хотите рассказать" value={msg} onChange={setMsg} />
              </FBReveal>
            </div>

            {error && (
              <p style={{ marginTop: 14, marginBottom: 0, fontSize: 13.5, fontWeight: 500, color: VT.danger }}>{error}</p>
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: error ? 12 : 24, flexWrap: 'wrap' }}>
              <div onClick={handleSubmit} style={{ width: mobile ? '100%' : 'auto' }}>
                <Btn
                  size="md"
                  icon={submitting ? <Spinner size={15} /> : undefined}
                  style={{ width: mobile ? '100%' : 'auto', opacity: (n === 0 || submitting) ? 0.55 : 1, cursor: (n === 0 || submitting) ? 'not-allowed' : 'pointer' }}
                >
                  {submitting ? 'Отправляем…' : (n > 0 ? `Отправить ${n} ${fbPlural(n)}` : 'Отправить голос')}
                </Btn>
              </div>
              {n === 0 && !mobile && !submitting && <span style={{ fontSize: 13.5, color: VT.inkFaint }}>Отметьте хотя бы один пункт</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // ── Canvas artboard: FauxPage behind, overlay anchored to the container ──
  // NB: FauxPage/FloatingBtn/Dialog are INVOKED as functions ({Dialog()}), not
  // mounted as elements (<Dialog/>). Mounting them would give React a new
  // component type every render → full unmount/remount of the subtree on each
  // keystroke/toggle → scroll jumps to top + inputs lose focus. Calling them
  // inlines their JSX into this component's tree, so state edits just re-render.
  if (embedded) {
    return (
      <div style={{ position: 'relative', width: '100%', minHeight: '100%', background: VT.bg, fontFamily: VT.font.sans, color: VT.ink, letterSpacing: '-0.01em' }}>
        {FauxPage()}
        {!isOpen && FloatingBtn({ fixed: false })}
        {isOpen && Dialog()}
      </div>
    );
  }

  // ── Real mount: no FauxPage, overlay fixed to the viewport ──
  return (
    <React.Fragment>
      {!isOpen && FloatingBtn({ fixed: true })}
      {isOpen && Dialog()}
    </React.Fragment>
  );
}

// Back-compat alias: index/canvas still reference S9_FeedbackPage.
const S9_FeedbackPage = S9_FeedbackModal;

const CustomerSite = S7_CustomerSite;
const LeadForm = S8_LeadFormConfirm;
const FeedbackPage = S9_FeedbackModal;



export {
  S7_CustomerSite,
  S7_SchemeSwatches,
  S8_LeadFormConfirm,
  S9_FeedbackPage,
  S9_FeedbackModal,
  CustomerSite,
  LeadForm,
  FeedbackPage
};

