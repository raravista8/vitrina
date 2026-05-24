'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Fragment } from 'react';
import { VT } from '../tokens';
import { Eyebrow, Mono, Card, Btn, Input, IconLink, IconArrow, Spinner } from '../primitives';


// ── Common pieces ────────────────────────────────────────────
function MiniHero({ url }) {
  // Compact reproduction of the Hero input — for the "in-context" preview
  return (
    <div style={{
      display: 'flex', gap: 8, alignItems: 'center',
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: VT.r.pill,
      padding: 8,
      boxShadow: VT.shadow.card,
    }}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
        <IconLink />
        <span style={{
          fontFamily: VT.font.mono, fontSize: 14, color: VT.ink,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{url}</span>
      </div>
      <Btn iconRight={<IconArrow />}>Собрать мою витрину</Btn>
    </div>
  );
}

function StateBadge({ kind, icon, children }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 14px', borderRadius: VT.r.pill,
      background: kind === 'success' ? VT.successSoft : kind === 'info' ? VT.infoSoft : kind === 'warn' ? VT.warnSoft : VT.bgSoft,
      color: kind === 'success' ? 'oklch(0.34 0.12 145)' : kind === 'info' ? 'oklch(0.38 0.10 240)' : kind === 'warn' ? 'oklch(0.40 0.13 70)' : VT.inkSoft,
      fontSize: 14, fontWeight: 500,
    }}>
      <span style={{ width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </span>
      {children}
    </span>
  );
}

// ── State definitions ────────────────────────────────────────
const STATES = [
  {
    id: 'loading',
    label: '1 · Loading',
    kind: 'neutral',
    url: 't.me/barbershop_samara',
    badge: <StateBadge kind="neutral" icon={<Spinner />}>проверяем…</StateBadge>,
    note: 'После paste — client-side regex определил тип (<100ms). Запрос preview API в фоне, 3s timeout.',
    api: 'GET /api/preview?url=… (debounced 300ms)',
  },
  {
    id: 'tg-success',
    label: '2 · ✓ Telegram',
    kind: 'success',
    url: 't.me/barbershop_samara',
    badge: <StateBadge kind="success" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Telegram-канал — нашли 47 постов и 12 фото</StateBadge>,
    note: 'Bot API getChat + getChatHistory(1). CTA «Собрать мою витрину» активна — open Submit modal.',
    api: 'GET /api/preview → {source:"telegram", posts:47, photos:12}',
  },
  {
    id: 'ymaps-success',
    label: '3 · ✓ Яндекс.Карты',
    kind: 'success',
    url: 'yandex.ru/maps/-/CDvI7QJM',
    badge: <StateBadge kind="success" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Яндекс.Карты — нашли карточку, 24 отзыва и 18 фото</StateBadge>,
    note: 'Geosearch API find. Если карточка не найдена → fallback к статичному ✓ без чисел.',
    api: 'GET /api/preview → {source:"yandex_maps", reviews:24, photos:18}',
  },
  {
    id: 'preview-timeout',
    label: '4 · ✓ Без чисел (preview timeout >3s)',
    kind: 'success',
    url: 't.me/privatechannel',
    badge: <StateBadge kind="success" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Telegram-канал</StateBadge>,
    note: 'FR-005a: regex отдал тип, preview API не ответил за 3s → бейдж без чисел, продолжаем нормально.',
    api: 'Timeout fallback — UI не блокирует submit',
  },
  {
    id: 'ig-success',
    label: '5 · ✓ Instagram',
    kind: 'success',
    url: 'instagram.com/master.nails.spb',
    badge: <StateBadge kind="success" icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Instagram</StateBadge>,
    note: '0.3.0: Instagram теперь обычный ok-источник. Заявка идёт в общую очередь, ручная обработка решит что вытаскивать.',
    api: 'GET /api/preview → {source:"instagram", status:"ok"}',
  },
  {
    id: 'vk-waitlist',
    label: '6 · ℹ️ ВКонтакте — waitlist + photo CTA',
    kind: 'info',
    url: 'vk.com/master_nails',
    badge: <StateBadge kind="info" icon={<span style={{fontSize: 14}}>ℹ️</span>}>ВКонтакте скоро будет — оставьте email</StateBadge>,
    waitlist: true,
    photoCta: true,
    note: 'Identical pattern to IG. Параллельная CTA: «Или скриншот страницы + фото работ».',
    api: 'POST /api/feedback { type:"source_request", source_name:"vk" }',
  },
  {
    id: 'other-waitlist',
    label: '7 · ℹ️ Другой known источник (2GIS / Avito / WA / YT / Дзен)',
    kind: 'info',
    url: '2gis.ru/samara/firm/70000001045896531',
    badge: <StateBadge kind="info" icon={<span style={{fontSize: 14}}>ℹ️</span>}>2GIS скоро будет — оставьте email</StateBadge>,
    waitlist: true,
    photoCta: false,
    note: 'Без photo CTA — 2GIS/Avito/WA не закрываются скриншотом профиля.',
    api: 'POST /api/feedback { type:"source_request", source_name:"2gis" }',
  },
  {
    id: 'unknown-url',
    label: '8 · ⚠️ Не узнали источник',
    kind: 'warn',
    url: 'https://my-portfolio.example.com',
    badge: <StateBadge kind="warn" icon={<span style={{fontSize: 14}}>⚠️</span>}>Не узнали источник. Какой это?</StateBadge>,
    unknownInput: true,
    note: 'Open input. Сохраняем как source_request c source_name=user-typed для аналитики.',
    api: 'POST /api/feedback { type:"source_request", source_name:<user>, source_url_raw:<url> }',
  },
  {
    id: 'not-url',
    label: '9 · ⚠️ Не ссылка и не файл',
    kind: 'warn',
    url: 'мастер маникюра',
    badge: <StateBadge kind="warn" icon={<span style={{fontSize: 14}}>⚠️</span>}>Введите ссылку на Telegram, Яндекс.Карты или загрузите фото</StateBadge>,
    note: 'CTA «Собрать мою витрину» disabled, fallback-ссылка «📷 загрузить фото» подчёркнута.',
    api: '— (client-side only)',
  },
];

// ── Waitlist capture (inline под бейджем) ────────────────────
function WaitlistCapture({ source, withPhotoCta }) {
  const label = source === 'instagram' ? 'Instagram'
    : source === 'vk' ? 'ВКонтакте'
    : source === '2gis' ? '2GIS' : source;
  return (
    <div style={{
      marginTop: 12,
      background: VT.infoSoft,
      border: `1px solid oklch(0.85 0.05 240)`,
      borderRadius: VT.r.lg,
      padding: 16,
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'oklch(0.32 0.10 240)' }}>
        Напишем, когда добавим {label}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 10, alignItems: 'stretch' }}>
        <Input placeholder="email или @telegram" style={{ flex: 1, padding: '10px 14px', borderRadius: VT.r.md, fontSize: 14 }} />
        <Btn variant="primary" size="sm" style={{ borderRadius: VT.r.md }}>Сохранить</Btn>
      </div>
      {withPhotoCta && (
        <div style={{
          marginTop: 12, paddingTop: 12, borderTop: `1px dashed oklch(0.85 0.05 240)`,
          fontSize: 13.5, color: VT.inkSoft,
        }}>
          Или сделайте сейчас — без ожидания:
          <a style={{
            display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 8,
            color: VT.accent, fontWeight: 600, textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}>
            📷 Загрузить скриншот профиля + фото работ
            <IconArrow size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

function UnknownSourceInput() {
  return (
    <div style={{
      marginTop: 12,
      background: VT.warnSoft,
      border: `1px solid oklch(0.85 0.06 70)`,
      borderRadius: VT.r.lg,
      padding: 16,
    }}>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'oklch(0.36 0.13 70)' }}>
        Какой это источник?
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8, marginTop: 10 }}>
        <Input placeholder="название источника (например, «Дзен» или «свой блог»)" style={{ flex: 1, padding: '10px 14px', borderRadius: VT.r.md, fontSize: 14 }} />
        <Btn variant="primary" size="sm" style={{ borderRadius: VT.r.md }}>Сообщить</Btn>
      </div>
    </div>
  );
}

// ── State row ─────────────────────────────────────────────────
function StateRow({ s }) {
  return (
    <Card style={{ padding: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 32 }}>
        {/* Left — live UI */}
        <div>
          <div style={{ fontSize: 11, fontFamily: VT.font.mono, letterSpacing: '0.08em', color: VT.inkFaint, marginBottom: 8 }}>
            {s.label.toUpperCase()}
          </div>
          <MiniHero url={s.url} />
          <div style={{ marginTop: 12, paddingLeft: 16 }}>
            {s.badge}
          </div>
          {s.waitlist && <WaitlistCapture source={s.id.split('-')[0]} withPhotoCta={s.photoCta} />}
          {s.unknownInput && <UnknownSourceInput />}
        </div>
        {/* Right — annotation */}
        <div style={{ borderLeft: `1px dashed ${VT.line}`, paddingLeft: 24 }}>
          <div style={{ fontSize: 11, fontFamily: VT.font.mono, letterSpacing: '0.08em', color: VT.inkFaint, marginBottom: 8 }}>
            ЛОГИКА
          </div>
          <div style={{ fontSize: 14, lineHeight: 1.5, color: VT.ink }}>
            {s.note}
          </div>
          <div style={{ fontSize: 11, fontFamily: VT.font.mono, letterSpacing: '0.08em', color: VT.inkFaint, margin: '16px 0 6px' }}>
            API
          </div>
          <div style={{
            fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft,
            background: VT.bgSoft, padding: '8px 12px', borderRadius: VT.r.sm,
            wordBreak: 'break-all',
          }}>{s.api}</div>
        </div>
      </div>
    </Card>
  );
}

// ── Artboards ─────────────────────────────────────────────────
function S2_Desktop() {
  return (
    <div style={{
      width: '100%', minHeight: '100%', background: VT.bg, color: VT.ink,
      fontFamily: VT.font.sans, padding: '40px 56px 64px',
      letterSpacing: '-0.01em',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <Eyebrow>ЭКРАН #2 · SOURCE DETECTION</Eyebrow>
        <Mono style={{ fontSize: 12 }}>FR-005, FR-005a, ADR-0009</Mono>
      </div>
      <h2 style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.1 }}>
        Бейджи под input — состояния live preview
      </h2>
      <p style={{ fontSize: 16, lineHeight: 1.5, color: VT.inkSoft, maxWidth: 820, margin: '0 0 32px' }}>
        После paste — client-side regex определяет источник за &lt;100ms и показывает бейдж.
        Параллельно preview API (3s timeout) дополняет числами. MVP-источники: Telegram, Яндекс.Карты.
        Остальное — waitlist + параллельная CTA на фото-флоу.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {STATES.map(s => <StateRow key={s.id} s={s} />)}
      </div>
    </div>
  );
}

function S2_Mobile() {
  // Mobile shows the same states stacked, badge wraps under input
  const mobile = STATES.filter(s => ['loading','tg-success','ig-success','unknown-url'].includes(s.id));
  return (
    <div style={{
      width: '100%', minHeight: '100%', background: VT.bg, color: VT.ink,
      fontFamily: VT.font.sans, padding: '20px 16px 40px',
      letterSpacing: '-0.01em',
    }}>
      <Eyebrow>ЭКРАН #2 · MOBILE</Eyebrow>
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', margin: '12px 0 18px', lineHeight: 1.15 }}>
        Состояния бейджа — 4 ключевых
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {mobile.map(s => (
          <Card key={s.id} style={{ padding: 14 }}>
            <div style={{ fontSize: 10.5, fontFamily: VT.font.mono, letterSpacing: '0.08em', color: VT.inkFaint, marginBottom: 6 }}>
              {s.label.toUpperCase()}
            </div>
            {/* mobile input — stacked CTA */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 8,
              background: VT.white, border: `1px solid ${VT.line}`,
              borderRadius: VT.r.lg, padding: 10,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 8px' }}>
                <IconLink />
                <span style={{ fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.url}</span>
              </div>
              <Btn iconRight={<IconArrow />} style={{ borderRadius: VT.r.md, width: '100%' }}>Собрать мою витрину</Btn>
            </div>
            <div style={{ marginTop: 10 }}>{s.badge}</div>
            {s.waitlist && <WaitlistCapture source={s.id.split('-')[0]} withPhotoCta={s.photoCta} />}
            {s.unknownInput && <UnknownSourceInput />}
          </Card>
        ))}
      </div>
    </div>
  );
}

const SourceDetectionBadge = S2_Desktop;



export {
  S2_Desktop,
  S2_Mobile,
  SourceDetectionBadge
};

