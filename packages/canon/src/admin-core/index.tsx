'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, Fragment } from 'react';
import { VT } from '../tokens';
import { Eyebrow, Mono, Card, Btn, Badge, IconArrow } from '../primitives';


// ── Admin chrome (sidebar + topbar) ──────────────────────────
const NAV = [
  ['dash', 'Dashboard', '📊'],
  ['apps', 'Заявки', '📥'],
  ['sites', 'Сайты', '🌐'],
  ['leads', 'Лиды', '📨'],
  ['feedback', 'Feedback', '💬'],
  ['waitlist', 'Waitlist', '⏳'],
  ['settings', 'Settings', '⚙️'],
];

function AdminChrome({ active, children }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '220px 1fr',
      minHeight: '100%', background: VT.bgSoft, fontFamily: VT.font.sans,
      color: VT.ink, letterSpacing: '-0.005em',
    }}>
      {/* Sidebar */}
      <aside style={{
        background: VT.bg, borderRight: `1px solid ${VT.line}`,
        padding: 16, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', marginBottom: 18 }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: 'inset 0 0 0 4px ' + VT.bg }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>Самосайт</span>
          <Badge kind="neutral" style={{ marginLeft: 'auto', padding: '2px 6px', fontSize: 10, borderRadius: 4 }}>ADMIN</Badge>
        </div>
        {NAV.map(([key, name, icon]) => (
          <a key={key} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', borderRadius: VT.r.sm,
            background: active === key ? VT.accentSoft : 'transparent',
            color: active === key ? VT.accentInk : VT.ink,
            fontSize: 14, fontWeight: active === key ? 600 : 500,
            cursor: 'pointer',
          }}>
            <span style={{ fontSize: 15, width: 18, display: 'inline-flex' }}>{icon}</span>
            {name}
            {key === 'apps' && (
              <Badge kind="warn" style={{ marginLeft: 'auto', padding: '1px 7px', fontSize: 10, borderRadius: 999 }}>12</Badge>
            )}
          </a>
        ))}
        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: VT.accentSoft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: VT.accentInk, fontWeight: 600 }}>F</span>
          founder@samosite.online
          <a style={{ marginLeft: 'auto', color: VT.inkFaint }}>выйти</a>
        </div>
      </aside>

      {/* Main */}
      <main style={{ minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}

// ── #10 Admin login ────────────────────────────────────────
function S10_AdminLogin({ step = 1, rateLimited = false }) {
  return (
    <div style={{
      background: VT.bgSoft, minHeight: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: VT.font.sans, padding: 24,
    }}>
      <Card style={{ width: 400, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <span style={{ width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: 'inset 0 0 0 4px ' + VT.white }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>Самосайт</span>
          <Badge kind="neutral" style={{ marginLeft: 'auto', padding: '2px 7px', fontSize: 10 }}>ADMIN</Badge>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
          {step === 1 ? 'Вход в админку' : 'Двухфакторная аутентификация'}
        </h1>
        <p style={{ fontSize: 13.5, color: VT.inkSoft, margin: '0 0 18px' }}>
          {step === 1 ? 'Только для founder. Все попытки логируются.' : 'Введите 6-значный код из приложения-аутентификатора.'}
        </p>

        {rateLimited && (
          <div style={{
            padding: '10px 12px', background: VT.dangerSoft,
            border: `1px solid oklch(0.85 0.06 28)`, borderRadius: VT.r.md,
            fontSize: 13, color: 'oklch(0.4 0.15 28)', marginBottom: 14,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span>⚠️</span>
            <span>5 неудач за 15 мин — IP заблокирован на 1 час. Осталось 47:23.</span>
          </div>
        )}

        {step === 1 ? (
          <>
            <label style={{ display: 'block', fontSize: 12, color: VT.inkSoft, marginBottom: 4 }}>Email</label>
            <div style={{ padding: '10px 12px', background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 14, marginBottom: 10, fontFamily: VT.font.mono }}>founder@samosite.online</div>
            <label style={{ display: 'block', fontSize: 12, color: VT.inkSoft, marginBottom: 4 }}>Пароль</label>
            <div style={{ padding: '10px 12px', background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, fontSize: 14, color: VT.inkFaint, fontFamily: VT.font.mono }}>••••••••••••••••</div>
          </>
        ) : (
          <>
            <label style={{ display: 'block', fontSize: 12, color: VT.inkSoft, marginBottom: 6 }}>Код из аутентификатора</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1,2,3,4,5,6].map(i => (
                <div key={i} style={{
                  flex: 1, aspectRatio: '1 / 1.2',
                  background: VT.white, border: `1.5px solid ${i <= 4 ? VT.accent : VT.line}`,
                  borderRadius: VT.r.sm, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: VT.font.mono, fontSize: 20, fontWeight: 600,
                }}>{i <= 4 ? '•' : ''}</div>
              ))}
            </div>
            <a style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: VT.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Использовать backup-код
            </a>
          </>
        )}

        <div style={{ marginTop: 18 }}>
          <Btn style={{ width: '100%' }} iconRight={<IconArrow />}>
            {step === 1 ? 'Дальше' : 'Войти'}
          </Btn>
        </div>
      </Card>
    </div>
  );
}

// ── Reusable stat tile ───────────────────────────────────────
function StatTile({ label, value, delta, deltaSign, sub }) {
  return (
    <Card style={{ padding: 18 }}>
      <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>{label.toUpperCase()}</Mono>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
        <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em' }}>{value}</span>
        {delta && (
          <span style={{
            fontSize: 12.5, fontWeight: 600,
            color: deltaSign === '+' ? VT.success : deltaSign === '-' ? VT.danger : VT.inkSoft,
          }}>{deltaSign}{delta}</span>
        )}
      </div>
      {sub && <div style={{ fontSize: 12, color: VT.inkFaint, marginTop: 4 }}>{sub}</div>}
    </Card>
  );
}

// ── Trend chart placeholder (recharts in production) ────────
function TrendChart({ height = 200 }) {
  const points = [12, 18, 14, 22, 28, 24, 32, 38, 30, 42, 48, 44, 52];
  const max = Math.max(...points);
  const w = 720;
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${height - 30 - (p / max) * (height - 50)}`).join(' ');
  const area = path + ` L ${w} ${height - 30} L 0 ${height - 30} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none">
      <path d={area} fill={VT.accentSoft} opacity="0.7" />
      <path d={path} fill="none" stroke={VT.accent} strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={(i / (points.length - 1)) * w} cy={height - 30 - (p / max) * (height - 50)} r="3" fill={VT.bg} stroke={VT.accent} strokeWidth="1.5"/>
      ))}
      {/* x labels */}
      {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].map((l, i) => (
        <text key={l} x={(i / 6) * w} y={height - 8} fontSize="11" fill={VT.inkFaint} fontFamily="JetBrains Mono, monospace" textAnchor={i === 0 ? 'start' : i === 6 ? 'end' : 'middle'}>{l}</text>
      ))}
    </svg>
  );
}

// ── #11 Dashboard ──────────────────────────────────────────
function S11_Dashboard() {
  return (
    <AdminChrome active="dash">
      <div style={{ padding: '24px 32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <Eyebrow>DASHBOARD</Eyebrow>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: '10px 0 0' }}>Сегодня</h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="sm">7 дней</Btn>
            <Btn variant="secondary" size="sm" style={{ background: VT.accentSoft, color: VT.accentInk, border: 'none' }}>30 дней</Btn>
            <Btn variant="secondary" size="sm">Всё время</Btn>
          </div>
        </div>

        {/* Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          <StatTile label="Заявок сегодня" value="8" delta="+3" deltaSign="+" sub="за неделю 52" />
          <StatTile label="Опубликовано" value="34" delta="2" deltaSign="+" sub="за месяц" />
          <StatTile label="Pending" value="12" sub="в очереди модерации" />
          <StatTile label="Feedback inbox" value="6" sub="новых" />
        </div>

        {/* Chart + Quick actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginTop: 14 }}>
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ЗАЯВКИ · 7 ДНЕЙ</Mono>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>52 <span style={{ fontSize: 12, fontWeight: 500, color: VT.success }}>+24% vs прошлая</span></div>
              </div>
              <Btn variant="ghost" size="sm">CSV</Btn>
            </div>
            <TrendChart />
          </Card>

          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>QUICK · ТОП-5 PENDING</Mono>
              <a style={{ fontSize: 12, color: VT.accent, textDecoration: 'underline' }}>все →</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['#A-1842', 'TG', 'studia-anna · 47 постов', '12 мин назад'],
                ['#A-1841', 'YM', 'Барбершоп Самара · 24 отз.', '34 мин назад'],
                ['#A-1840', 'Photo', 'Психолог Марина · 12 фото', '1 ч назад'],
                ['#A-1839', 'TG', 'Дом ресниц · 89 постов', '2 ч назад'],
                ['#A-1838', 'YM', 'Студия йоги · 56 отз.', '3 ч назад'],
              ].map(([id, src, name, ago]) => (
                <a key={id} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: VT.r.sm,
                  cursor: 'pointer', fontSize: 13,
                  borderBottom: `1px solid ${VT.lineSoft}`,
                }}>
                  <Mono style={{ fontSize: 11, width: 56 }}>{id}</Mono>
                  <Badge kind="neutral" style={{ padding: '2px 7px', fontSize: 10.5, borderRadius: 4 }}>{src}</Badge>
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                  <Mono style={{ fontSize: 11 }}>{ago}</Mono>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AdminChrome>
  );
}

// ── #12 Applications list ──────────────────────────────────
function StatusPill({ status }) {
  const map = {
    new:       ['kind=info',   'новая',       VT.infoSoft,    'oklch(0.38 0.10 240)'],
    parsing:   ['kind=info',   'парсится',    VT.infoSoft,    'oklch(0.38 0.10 240)'],
    generated: ['kind=warn',   'готов',       VT.warnSoft,    'oklch(0.40 0.13 70)'],
    published: ['kind=success','опубликован', VT.successSoft, 'oklch(0.34 0.12 145)'],
    rejected:  ['kind=danger', 'отклонён',    VT.dangerSoft,  'oklch(0.42 0.15 28)'],
    rework:    ['kind=warn',   'переделка',   VT.warnSoft,    'oklch(0.40 0.13 70)'],
  }[status] || ['neutral', status, VT.bgSoft, VT.inkSoft];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: map[2], color: map[3],
      fontSize: 11.5, fontWeight: 500,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
      {map[1]}
    </span>
  );
}

function FilterChip({ label, active, count }) {
  return (
    <button style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '6px 12px', borderRadius: 999,
      background: active ? VT.accentSoft : VT.white,
      color: active ? VT.accentInk : VT.ink,
      border: `1px solid ${active ? 'transparent' : VT.line}`,
      fontSize: 13, fontWeight: 500, cursor: 'pointer',
    }}>
      {label}
      {count != null && <Mono style={{ fontSize: 11, color: 'inherit', opacity: 0.7 }}>{count}</Mono>}
    </button>
  );
}

const APPS_DATA = [
  ['#A-1842', '2026-05-19 14:22', 'telegram', 't.me/studia_anna', 'an***@gmail', 'new'],
  ['#A-1841', '2026-05-19 13:48', 'yandex_maps', 'yandex.ru/maps/...', '+7***1234', 'parsing'],
  ['#A-1840', '2026-05-19 12:15', 'photo', '— · 12 файлов', '@mar***', 'new'],
  ['#A-1839', '2026-05-19 11:02', 'telegram', 't.me/lashes_dom', '+7***5678', 'generated'],
  ['#A-1838', '2026-05-19 09:30', 'yandex_maps', 'yandex.ru/maps/...', 'st***@yandex', 'parsing'],
  ['#A-1837', '2026-05-18 18:44', 'telegram', 't.me/barber_samara', '@ser***', 'published'],
  ['#A-1836', '2026-05-18 17:22', 'photo', '— · 24 файла', 'ku***@mail', 'rejected'],
  ['#A-1835', '2026-05-18 15:10', 'yandex_maps', 'yandex.ru/maps/...', '+7***9012', 'published'],
  ['#A-1834', '2026-05-18 13:05', 'telegram', 't.me/psychomarina', 'ma***@gmail', 'rework'],
  ['#A-1833', '2026-05-18 11:48', 'yandex_maps', 'yandex.ru/maps/...', '@fit***', 'published'],
];

function S12_AppsList() {
  return (
    <AdminChrome active="apps">
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>ЗАЯВКИ</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Очередь модерации</h1>
          <Btn variant="secondary" size="sm">Экспорт CSV</Btn>
        </div>

        {/* Filters row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            <FilterChip label="Все" count={142} />
            <FilterChip label="Новые" count={8} active />
            <FilterChip label="Парсятся" count={4} />
            <FilterChip label="Готовы" count={2} />
            <FilterChip label="Опубликованы" count={34} />
            <FilterChip label="Отклонены" count={6} />
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', background: VT.white,
              border: `1px solid ${VT.line}`, borderRadius: 999,
              fontSize: 13, color: VT.inkFaint, minWidth: 240,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" strokeLinecap="round"/></svg>
              поиск по контакту, ID, источнику
            </div>
          </div>
        </div>

        {/* Table */}
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                {['ID', 'Создана', 'Источник', 'URL', 'Контакт', 'Статус', ''].map(h => (
                  <th key={h} style={{
                    textAlign: 'left', padding: '12px 16px',
                    fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em',
                    color: VT.inkFaint, fontWeight: 500,
                  }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {APPS_DATA.map(([id, ts, src, url, contact, status]) => (
                <tr key={id} style={{ borderBottom: `1px solid ${VT.lineSoft}`, cursor: 'pointer' }}>
                  <td style={{ padding: '12px 16px' }}><Mono>{id}</Mono></td>
                  <td style={{ padding: '12px 16px', color: VT.inkSoft }}><Mono style={{ fontSize: 12 }}>{ts}</Mono></td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge kind="neutral" style={{ padding: '2px 8px', fontSize: 11, borderRadius: 4 }}>{src}</Badge>
                  </td>
                  <td style={{ padding: '12px 16px', color: VT.inkSoft, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Mono style={{ fontSize: 12 }}>{url}</Mono>
                  </td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12 }}>{contact}</Mono></td>
                  <td style={{ padding: '12px 16px' }}><StatusPill status={status} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span style={{ color: VT.inkFaint }}>→</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: VT.inkSoft }}>
            <span>1–10 из 142</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <Btn variant="ghost" size="sm">←</Btn>
              <Btn variant="secondary" size="sm" style={{ background: VT.accentSoft, color: VT.accentInk, border: 'none' }}>1</Btn>
              <Btn variant="ghost" size="sm">2</Btn>
              <Btn variant="ghost" size="sm">3</Btn>
              <Mono style={{ alignSelf: 'center' }}>…</Mono>
              <Btn variant="ghost" size="sm">15</Btn>
              <Btn variant="ghost" size="sm">→</Btn>
            </div>
          </div>
        </Card>
      </div>
    </AdminChrome>
  );
}

// ── #13 Application detail ──────────────────────────────────
function JsonTree() {
  const lines = [
    ['{', VT.inkSoft],
    ['  "source": ', VT.inkSoft, '"telegram"', VT.success],
    ['  "channel": ', VT.inkSoft, '"@studia_anna"', VT.accent],
    ['  "stats": {', VT.inkSoft],
    ['    "posts": ', VT.inkSoft, '47', VT.ink],
    ['    "photos": ', VT.inkSoft, '12', VT.ink],
    ['    "subscribers": ', VT.inkSoft, '342', VT.ink],
    ['  },', VT.inkSoft],
    ['  "title": ', VT.inkSoft, '"Студия Анны · маникюр"', VT.accent],
    ['  "city": ', VT.inkSoft, '"Петрозаводск"', VT.accent],
    ['  "fetched_at": ', VT.inkSoft, '"2026-05-19T14:22:18Z"', VT.accent],
    ['}', VT.inkSoft],
  ];
  return (
    <pre style={{ margin: 0, fontFamily: VT.font.mono, fontSize: 12.5, lineHeight: 1.55, color: VT.inkSoft }}>
      {lines.map((row, i) => (
        <div key={i}>
          <span style={{ color: row[1] }}>{row[0]}</span>
          {row[2] && <span style={{ color: row[3] }}>{row[2]}</span>}
        </div>
      ))}
    </pre>
  );
}

function S13_AppDetail() {
  return (
    <AdminChrome active="apps">
      <div style={{ padding: '20px 32px 40px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }}>
          <a style={{ color: VT.inkFaint }}>Заявки</a>
          <span>/</span>
          <Mono style={{ color: VT.ink }}>#A-1842</Mono>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 6px' }}>
              Студия Анны · маникюр
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: VT.inkSoft }}>
              <Mono>t.me/studia_anna</Mono>
              <span>·</span>
              <span>an***@gmail</span>
              <span>·</span>
              <Mono>2026-05-19 14:22</Mono>
              <StatusPill status="new" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="sm">Запросить переделку</Btn>
            <Btn variant="secondary" size="sm" style={{ color: VT.danger, border: `1px solid ${VT.dangerSoft}` }}>Отклонить</Btn>
            <Btn size="sm" iconRight={<IconArrow size={14} />}>Опубликовать</Btn>
          </div>
        </div>

        {/* 2-col body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {/* Source snapshot */}
          <Card style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>SOURCE SNAPSHOT · JSON</Mono>
              <Btn variant="ghost" size="sm" style={{ marginLeft: 'auto' }}>raw</Btn>
            </div>
            <div style={{
              background: VT.bgSoft, borderRadius: VT.r.sm,
              padding: 14, border: `1px solid ${VT.line}`,
              maxHeight: 280, overflow: 'auto',
            }}>
              <JsonTree />
            </div>
          </Card>

          {/* Generated content preview */}
          <Card style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>GENERATED CONTENT</Mono>
              <Badge kind="success" style={{ padding: '2px 8px', fontSize: 10.5, borderRadius: 4 }}>✓ sanitized</Badge>
              <Btn variant="ghost" size="sm" style={{ marginLeft: 'auto' }}>↗ preview</Btn>
            </div>
            <div style={{ background: VT.bgSoft, borderRadius: VT.r.sm, padding: 14, border: `1px solid ${VT.line}` }}>
              <div style={{ fontFamily: VT.font.mono, fontSize: 11, color: VT.accent, letterSpacing: '0.1em', marginBottom: 6 }}>МАНИКЮР · ПЕТРОЗАВОДСК</div>
              <div style={{ fontWeight: 700, fontSize: 20, lineHeight: 1.15, marginBottom: 8 }}>Студия Анны</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: VT.inkSoft }}>
                Работаю с 2017 года, прошла курсы в [SCHOOL]. Принимаю одного клиента в час — без спешки, с чашкой кофе.
              </div>
              <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ flex: 1, aspectRatio: '1/1', borderRadius: 6, background: `repeating-linear-gradient(${30 + i*22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` }} />
                ))}
              </div>
              <div style={{ fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }}>≈ 320 токенов · ≈ 12 ₽ · модель: YandexGPT 5 Pro</div>
            </div>
          </Card>
        </div>

        {/* Audit log */}
        <Card style={{ marginTop: 14, padding: 18 }}>
          <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>AUDIT LOG</Mono>
          <div style={{ marginTop: 10, fontSize: 13, fontFamily: VT.font.mono, color: VT.inkSoft, lineHeight: 1.7 }}>
            <div><span style={{ color: VT.inkFaint }}>14:22:18</span> · application.submitted · ip 195.***.***.42</div>
            <div><span style={{ color: VT.inkFaint }}>14:22:19</span> · parser.tg.start · @studia_anna</div>
            <div><span style={{ color: VT.inkFaint }}>14:22:34</span> · parser.tg.ok · posts=47 photos=12</div>
            <div><span style={{ color: VT.inkFaint }}>14:22:35</span> · llm.generate.start · model=yandexgpt-5-pro</div>
            <div><span style={{ color: VT.inkFaint }}>14:23:02</span> · llm.generate.ok · tokens=320 cost_rub=12.40</div>
            <div><span style={{ color: VT.inkFaint }}>14:23:03</span> · sanitize.ok · bleach.clean allowlist=v1</div>
            <div><span style={{ color: VT.inkFaint }}>14:23:03</span> · status.new → status.awaiting_review</div>
          </div>
        </Card>
      </div>
    </AdminChrome>
  );
}

const AdminLogin = S10_AdminLogin;
const AdminDashboard = S11_Dashboard;
const AppsList = S12_AppsList;
const AppDetail = S13_AppDetail;



export {
  S10_AdminLogin,
  S11_Dashboard,
  S12_AppsList,
  S13_AppDetail,
  AdminChrome,
  StatusPill,
  StatTile,
  AdminLogin,
  AdminDashboard,
  AppsList,
  AppDetail
};
