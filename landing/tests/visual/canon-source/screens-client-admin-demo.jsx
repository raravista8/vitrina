// Демо личного кабинета клиента — интерактивная страница для показа
// возможностей с лендинга. Закрытый «sandboxed» прототип без реального
// API: всё локально, состояние в useState, изменения видны сразу.

if (!window.__ss_admin_demo) { window.__ss_admin_demo = true; (function ssAdminDemo(){

const VT = window.VT;
const { BRAND, Logo, BrandMark, Mono, Card, Btn, Checkbox, IconLink, IconArrow, Spinner } = window;
const { useState, useMemo } = React;

// ─────────────────────────────────────────────────────────────
// Mock data — Студия Анны

const DEMO_SITE = {
  name: 'Студия Анны',
  handle: 'studia-anna',
  domain: 'studia-anna.samosite.online',
  category: 'Маникюр',
  city: 'Петрозаводск',
  publishedAt: '12 марта 2026',
  lastSync: 'сегодня в 14:02',
  status: 'published',
  plan: '990 ₽/мес',
  nextBilling: '15 июня 2026',
};

const TABS = [
  { id: 'analytics', label: 'Аналитика', icon: 'bar' },
  { id: 'site',      label: 'Сайт',       icon: 'site' },
  { id: 'leads',     label: 'Заявки',     icon: 'inbox', badge: 3 },
  { id: 'reviews',   label: 'Отзывы',     icon: 'star' },
  { id: 'services',  label: 'Услуги',     icon: 'list' },
  { id: 'settings',  label: 'Настройки',  icon: 'gear' },
];

// ─────────────────────────────────────────────────────────────
// Helpers

function NavIcon({ kind, size = 18 }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (kind) {
    case 'bar':   return <svg {...props}><path d="M4 20V12"/><path d="M10 20V6"/><path d="M16 20V14"/><path d="M22 20V9"/></svg>;
    case 'site':  return <svg {...props}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 8h18"/><circle cx="7" cy="6" r="0.5" fill="currentColor"/></svg>;
    case 'inbox': return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 14h5l1.5 2h5L16 14h5"/></svg>;
    case 'star':  return <svg {...props} fill="currentColor" stroke="none"><path d="M12 2 L14.5 8.5 L21.5 9.3 L16.4 14 L17.9 21 L12 17.4 L6.1 21 L7.6 14 L2.5 9.3 L9.5 8.5 Z"/></svg>;
    case 'list':  return <svg {...props}><path d="M8 6h13"/><path d="M8 12h13"/><path d="M8 18h13"/><circle cx="4" cy="6" r="1.2"/><circle cx="4" cy="12" r="1.2"/><circle cx="4" cy="18" r="1.2"/></svg>;
    case 'gear':  return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3h0a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5h0a1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8v0a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// Stat card with sparkline

function StatCard({ label, value, delta, deltaTone, points, color }) {
  const w = 140, h = 36;
  const min = Math.min(...points), max = Math.max(...points);
  const range = (max - min) || 1;
  const xs = points.map((_, i) => (i / (points.length - 1)) * w);
  const ys = points.map(p => h - ((p - min) / range) * (h - 4) - 2);
  const path = xs.map((x, i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${ys[i].toFixed(1)}`).join(' ');
  const area = `${path} L ${w} ${h} L 0 ${h} Z`;
  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 14, padding: '16px 18px',
      display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ fontSize: 12.5, color: VT.inkFaint, fontWeight: 500, letterSpacing: '-0.005em' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', color: VT.ink, lineHeight: 1 }}>{value}</span>
        <span style={{
          fontFamily: VT.font.mono, fontSize: 12, fontWeight: 600,
          color: deltaTone === 'up' ? VT.success : deltaTone === 'down' ? VT.danger : VT.inkFaint,
        }}>
          {deltaTone === 'up' ? '↑' : deltaTone === 'down' ? '↓' : ''} {delta}
        </span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} style={{ marginTop: 4 }}>
        <path d={area} fill={color} fillOpacity="0.12" />
        <path d={path}  fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Big chart — daily visits + leads over 30 days

function TrafficChart() {
  const days = 30;
  // deterministic mock data
  const visits = Array.from({ length: days }, (_, i) => {
    const t = i / days;
    return Math.round(80 + 40 * Math.sin(i * 0.6) + 60 * t + (i % 7 === 0 ? 30 : 0));
  });
  const leads = visits.map(v => Math.round(v * (0.04 + (Math.sin(v) + 1) * 0.02)));

  const W = 720, H = 260, PAD = { top: 16, right: 16, bottom: 28, left: 36 };
  const inner = { w: W - PAD.left - PAD.right, h: H - PAD.top - PAD.bottom };
  const maxV = Math.max(...visits) * 1.15;
  const xFor = i => PAD.left + (i / (days - 1)) * inner.w;
  const yFor = v => PAD.top + inner.h - (v / maxV) * inner.h;

  const visitsPath = visits.map((v, i) => `${i === 0 ? 'M' : 'L'} ${xFor(i)} ${yFor(v)}`).join(' ');
  const visitsArea = `${visitsPath} L ${xFor(days - 1)} ${yFor(0)} L ${xFor(0)} ${yFor(0)} Z`;

  const xLabels = [0, 7, 14, 21, 29];
  const xLabelText = ['1 мая', '8 мая', '15 мая', '22 мая', '30 мая'];

  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 16, padding: 22,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <div style={{ fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: '-0.02em' }}>Трафик за 30 дней</div>
          <div style={{ fontSize: 13, color: VT.inkFaint, marginTop: 2 }}>Каждая точка — день. Заявки идут параллельно посетителям.</div>
        </div>
        <div style={{ display: 'inline-flex', gap: 14, fontSize: 12.5, color: VT.inkSoft }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: VT.accent }} />
            Посещения
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 10, height: 2, background: 'oklch(0.5 0.13 240)' }} />
            Заявки
          </span>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} style={{ display: 'block' }}>
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
          <g key={i}>
            <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + inner.h * t} y2={PAD.top + inner.h * t}
                  stroke={VT.lineSoft} strokeWidth="1" />
            <text x={PAD.left - 8} y={PAD.top + inner.h * t + 4} fontSize="10" fill={VT.inkFaint} textAnchor="end" fontFamily={VT.font.mono}>
              {Math.round(maxV * (1 - t))}
            </text>
          </g>
        ))}
        {/* visits area + line */}
        <path d={visitsArea} fill={VT.accent} fillOpacity="0.10" />
        <path d={visitsPath} fill="none" stroke={VT.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* leads bars */}
        {leads.map((l, i) => (
          <rect key={i}
            x={xFor(i) - 2} y={yFor(l * 10)}
            width="4" height={PAD.top + inner.h - yFor(l * 10)}
            fill="oklch(0.5 0.13 240)" opacity="0.5" rx="1" />
        ))}
        {/* x labels */}
        {xLabels.map((i, k) => (
          <text key={k} x={xFor(i)} y={H - 8} fontSize="11" fill={VT.inkFaint} textAnchor="middle">
            {xLabelText[k]}
          </text>
        ))}
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Source breakdown

function SourceBreakdown() {
  const sources = [
    { name: 'Яндекс.Карты',  share: 45, color: '#FFCC00' },
    { name: 'Telegram',      share: 28, color: '#229ED9' },
    { name: 'Прямые заходы', share: 15, color: VT.accent },
    { name: '2ГИС',          share:  8, color: '#19BB4F' },
    { name: 'Google',        share:  4, color: 'oklch(0.55 0.18 25)' },
  ];
  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 16, padding: 22,
    }}>
      <div style={{ fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: '-0.02em', marginBottom: 4 }}>
        Откуда приходят
      </div>
      <div style={{ fontSize: 13, color: VT.inkFaint, marginBottom: 16 }}>
        Я.Карты — самый эффективный канал. {BRAND.name} держит карточку свежей.
      </div>

      {/* stacked bar */}
      <div style={{ display: 'flex', height: 14, borderRadius: 7, overflow: 'hidden' }}>
        {sources.map(s => (
          <span key={s.name} style={{ width: `${s.share}%`, background: s.color }} />
        ))}
      </div>

      {/* legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
        {sources.map(s => (
          <div key={s.name} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13.5, color: VT.ink,
          }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flex: '0 0 auto' }} />
            <span style={{ flex: 1 }}>{s.name}</span>
            <b style={{ fontFamily: VT.font.mono, color: VT.ink }}>{s.share}%</b>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Analytics tab

function AnalyticsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12,
      }}>
        <StatCard label="Посещения / 30 дней"  value="2 847" delta="+18%" deltaTone="up"
          color={VT.accent}
          points={[210, 198, 215, 240, 232, 260, 275, 290, 280, 295, 310, 325, 345, 360]} />
        <StatCard label="Уникальные пользователи" value="1 932" delta="+22%" deltaTone="up"
          color="oklch(0.5 0.13 240)"
          points={[140, 145, 160, 170, 175, 180, 195, 210, 215, 225, 240, 250, 265, 275]} />
        <StatCard label="Заявок принято" value="78" delta="+34%" deltaTone="up"
          color="oklch(0.55 0.12 145)"
          points={[2, 3, 4, 3, 5, 4, 5, 6, 5, 7, 6, 8, 7, 9]} />
        <StatCard label="Конверсия в заявку" value="2.7%" delta="+0.4пп" deltaTone="up"
          color="oklch(0.55 0.15 35)"
          points={[2.1, 2.2, 2.3, 2.2, 2.4, 2.3, 2.5, 2.5, 2.6, 2.6, 2.7, 2.7, 2.7, 2.8]} />
      </div>

      <TrafficChart />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <SourceBreakdown />
        <div style={{
          background: VT.white, border: `1px solid ${VT.line}`,
          borderRadius: 16, padding: 22,
        }}>
          <div style={{ fontSize: 17, fontWeight: 700, color: VT.ink, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Сводка за неделю
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              ['Лучший день', 'Четверг — 142 посещения, 8 заявок'],
              ['Лучший канал', 'Я.Карты — выросли на +24% за неделю'],
              ['Лучшая услуга', 'Маникюр + покрытие — 12 записей'],
              ['Что обновилось', 'Свежие 3 фото из Telegram + 1 новый отзыв с Я.Карт'],
            ].map(([k, v]) => (
              <li key={k} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em', color: VT.inkFaint }}>{k.toUpperCase()}</span>
                <span style={{ fontSize: 14, color: VT.ink }}>{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Site tab — text editing + accent picker + photos

function SiteEditTab() {
  const [title, setTitle] = useState('Маникюр в Петрозаводске — без боли, держится 3 недели');
  const [sub, setSub] = useState('Аппаратный маникюр и стойкое покрытие. Один клиент в час — без спешки, в тишине, с кофе.');
  const [accent, setAccent] = useState(VT.accent);
  const [sections, setSections] = useState({ reviews: true, gallery: true, services: true, faq: true, map: true });

  const accentSwatches = [
    VT.accent,
    'oklch(0.5 0.12 250)',
    'oklch(0.5 0.12 145)',
    'oklch(0.5 0.15 25)',
    'oklch(0.45 0.12 285)',
  ];

  const togSection = (k) => setSections(s => ({ ...s, [k]: !s[k] }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, alignItems: 'flex-start' }}>
      {/* Left — live preview */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 16, padding: 22, position: 'sticky', top: 88,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: VT.ink }}>Превью</div>
          <Mono style={{ fontSize: 11.5 }}>{DEMO_SITE.domain}</Mono>
        </div>
        <div style={{
          background: VT.bgSoft, borderRadius: 10, overflow: 'hidden',
          border: `1px solid ${VT.line}`,
        }}>
          <div style={{ padding: '24px 22px' }}>
            <div style={{ fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.12em', color: accent, fontWeight: 600 }}>
              МАНИКЮР · ПЕТРОЗАВОДСК
            </div>
            <h2 style={{
              fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em',
              margin: '10px 0 8px', lineHeight: 1.1, color: VT.ink, textWrap: 'balance',
            }}>{title}</h2>
            <p style={{ fontSize: 13.5, color: VT.inkSoft, margin: 0, lineHeight: 1.5 }}>{sub}</p>
            <div style={{
              marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 18px', borderRadius: 999,
              background: accent, color: '#fff', fontSize: 13, fontWeight: 600,
            }}>Записаться →</div>
          </div>
          {/* sections list */}
          <div style={{ borderTop: `1px solid ${VT.line}`, padding: 14, background: VT.white }}>
            {Object.entries({
              services: 'Услуги и цены',
              reviews:  'Отзывы клиентов',
              gallery:  'Галерея работ',
              faq:      'Частые вопросы',
              map:      'Карта и контакты',
            }).map(([k, label]) => (
              <div key={k} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 0', borderBottom: `1px solid ${VT.lineSoft}`,
                fontSize: 13, color: sections[k] ? VT.ink : VT.inkFaint, textDecoration: sections[k] ? 'none' : 'line-through',
              }}>
                <span style={{ color: sections[k] ? VT.success : VT.inkMuted, fontSize: 14 }}>
                  {sections[k] ? '●' : '○'}
                </span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right — editor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <EditorBlock title="Заголовок (H1)">
          <textarea
            value={title} onChange={e => setTitle(e.target.value)}
            rows={2}
            style={editorTextarea}
          />
        </EditorBlock>

        <EditorBlock title="Подзаголовок">
          <textarea
            value={sub} onChange={e => setSub(e.target.value)}
            rows={3}
            style={editorTextarea}
          />
        </EditorBlock>

        <EditorBlock title="Цвет акцента">
          <div style={{ display: 'flex', gap: 8 }}>
            {accentSwatches.map(c => (
              <button key={c} onClick={() => setAccent(c)} style={{
                width: 36, height: 36, borderRadius: 10,
                background: c, border: accent === c ? '3px solid #fff' : '1px solid rgba(0,0,0,0.08)',
                outline: accent === c ? `2px solid ${c}` : 'none',
                cursor: 'pointer', transition: 'all .15s',
                outlineOffset: -1,
              }} aria-label={`Цвет ${c}`} />
            ))}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: VT.inkFaint, fontFamily: VT.font.mono }}>
            {accent}
          </div>
        </EditorBlock>

        <EditorBlock title="Hero-фото">
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px',
            background: VT.bgSoft, borderRadius: 10,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 8,
              background: `repeating-linear-gradient(135deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
              border: `1px solid ${VT.line}`,
            }} />
            <div style={{ flex: 1, fontSize: 13, color: VT.inkSoft }}>
              hero-anna-1.jpg · 1.2 MB
            </div>
            <button style={editorSecondaryBtn}>Заменить</button>
          </div>
        </EditorBlock>

        <EditorBlock title="Включить секции">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries({
              services: 'Услуги и цены',
              reviews:  'Отзывы (★ ЛУЧШИЕ — выбраны ИИ)',
              gallery:  'Галерея работ',
              faq:      'Частые вопросы',
              map:      'Карта и контакты',
            }).map(([k, label]) => (
              <label key={k} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0',
                cursor: 'pointer', fontSize: 14, color: VT.ink,
              }}>
                <span style={{
                  width: 36, height: 22, borderRadius: 11,
                  background: sections[k] ? VT.accent : VT.line,
                  position: 'relative', transition: 'background .15s', flex: '0 0 auto',
                }}>
                  <span style={{
                    position: 'absolute', top: 2, left: sections[k] ? 16 : 2,
                    width: 18, height: 18, borderRadius: '50%', background: '#fff',
                    transition: 'left .15s',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }} />
                </span>
                <input type="checkbox" checked={sections[k]} onChange={() => togSection(k)} style={{ display: 'none' }} />
                {label}
              </label>
            ))}
          </div>
        </EditorBlock>

        <button style={{
          background: VT.accent, color: '#fff', fontWeight: 700,
          padding: '14px 22px', borderRadius: 12, fontSize: 15,
          border: 'none', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>Сохранить и опубликовать →</button>
      </div>
    </div>
  );
}

const editorTextarea = {
  width: '100%', padding: '10px 12px',
  background: VT.white, border: `1px solid ${VT.line}`,
  borderRadius: 10, fontSize: 14, color: VT.ink,
  fontFamily: VT.font.sans, resize: 'vertical',
  lineHeight: 1.4, letterSpacing: '-0.005em',
};

const editorSecondaryBtn = {
  padding: '8px 14px', borderRadius: 8,
  background: VT.white, color: VT.ink, fontWeight: 500, fontSize: 13,
  border: `1px solid ${VT.line}`, cursor: 'pointer',
};

function EditorBlock({ title, children }) {
  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 14, padding: 16,
    }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: VT.inkFaint, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
        {title}
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Leads tab — table with status filtering

function LeadsTab() {
  const [leads, setLeads] = useState([
    { id: 1, name: 'Анна П.',     contact: '+7 999 ▦▦▦-▦▦-▦▦', service: 'Маникюр + покрытие', when: 'сегодня · 14:32',  source: 'TG',     status: 'new' },
    { id: 2, name: 'Юлия В.',     contact: '@example_user',     service: 'Аппаратный маникюр',  when: 'сегодня · 12:18',  source: 'TG',     status: 'new' },
    { id: 3, name: 'Михаил С.',   contact: '+7 999 ▦▦▦-▦▦-▦▦', service: 'Маникюр + покрытие', when: 'вчера · 18:42',     source: 'тел',    status: 'new' },
    { id: 4, name: 'Дарья Н.',    contact: 'darya@▦▦▦.ru',      service: 'Педикюр',            when: 'вчера · 11:05',    source: 'email',  status: 'answered' },
    { id: 5, name: 'Ольга М.',    contact: '@example_user',     service: 'Маникюр + покрытие', when: '2 дня назад',       source: 'TG',     status: 'booked' },
    { id: 6, name: 'Елена К.',    contact: '+7 999 ▦▦▦-▦▦-▦▦', service: 'Снятие покрытия',    when: '2 дня назад',       source: 'TG',     status: 'booked' },
    { id: 7, name: 'Татьяна Р.',  contact: '@example_user',     service: 'Дизайн',             when: '3 дня назад',       source: 'тел',    status: 'declined' },
    { id: 8, name: 'Мария Л.',    contact: '+7 999 ▦▦▦-▦▦-▦▦', service: 'Маникюр + покрытие', when: '4 дня назад',       source: 'TG',     status: 'booked' },
  ]);
  const [filter, setFilter] = useState('all');

  const statusInfo = {
    new:       { label: 'Новая',       bg: VT.accentSoft,  fg: VT.accentInk },
    answered:  { label: 'Ответили',    bg: 'oklch(0.93 0.045 240)', fg: 'oklch(0.36 0.10 240)' },
    booked:    { label: 'Записан',     bg: 'oklch(0.93 0.06 145)',  fg: 'oklch(0.32 0.11 145)' },
    declined:  { label: 'Отказ',       bg: VT.bgSoft, fg: VT.inkFaint },
  };

  const filters = [
    ['all', 'Все', leads.length],
    ['new', 'Новые', leads.filter(l => l.status === 'new').length],
    ['answered', 'В ответе', leads.filter(l => l.status === 'answered').length],
    ['booked', 'Записаны', leads.filter(l => l.status === 'booked').length],
  ];

  const filtered = filter === 'all' ? leads : leads.filter(l => l.status === filter);

  const setStatus = (id, status) => {
    setLeads(ls => ls.map(l => l.id === id ? { ...l, status } : l));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* filter chips */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {filters.map(([id, label, count]) => (
          <button key={id} onClick={() => setFilter(id)} style={{
            padding: '8px 14px', borderRadius: 999,
            background: filter === id ? VT.ink : VT.white, color: filter === id ? '#fff' : VT.inkSoft,
            border: `1px solid ${filter === id ? VT.ink : VT.line}`,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {label}
            <span style={{
              padding: '1px 7px', borderRadius: 999,
              background: filter === id ? 'rgba(255,255,255,0.18)' : VT.bgSoft,
              fontSize: 11, fontFamily: VT.font.mono,
            }}>{count}</span>
          </button>
        ))}
      </div>

      {/* table */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 16, overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr',
          padding: '14px 18px', background: VT.bgSoft, borderBottom: `1px solid ${VT.line}`,
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em',
          color: VT.inkFaint, fontWeight: 600,
        }}>
          <span>ИМЯ</span>
          <span>КОНТАКТ</span>
          <span>УСЛУГА</span>
          <span>КОГДА</span>
          <span>КАНАЛ</span>
          <span>СТАТУС</span>
          <span>ДЕЙСТВИЯ</span>
        </div>
        {filtered.map(l => (
          <div key={l.id} style={{
            display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.5fr 1.1fr 0.6fr 1fr 1.1fr',
            padding: '14px 18px',
            borderBottom: `1px solid ${VT.lineSoft}`,
            alignItems: 'center',
            fontSize: 13.5, color: VT.ink,
          }}>
            <span style={{ fontWeight: 600 }}>{l.name}</span>
            <span style={{ fontFamily: VT.font.mono, color: VT.inkSoft }}>{l.contact}</span>
            <span>{l.service}</span>
            <span style={{ color: VT.inkSoft }}>{l.when}</span>
            <span style={{ fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }}>{l.source}</span>
            <span>
              <span style={{
                padding: '4px 10px', borderRadius: 999,
                background: statusInfo[l.status].bg, color: statusInfo[l.status].fg,
                fontSize: 11.5, fontWeight: 600,
              }}>{statusInfo[l.status].label}</span>
            </span>
            <span style={{ display: 'flex', gap: 6 }}>
              {l.status === 'new' && (
                <>
                  <button onClick={() => setStatus(l.id, 'booked')} style={{
                    padding: '5px 10px', borderRadius: 6, background: VT.accent, color: '#fff',
                    border: 'none', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                  }}>Записать</button>
                  <button onClick={() => setStatus(l.id, 'declined')} style={{
                    padding: '5px 10px', borderRadius: 6, background: VT.white, color: VT.inkSoft,
                    border: `1px solid ${VT.line}`, fontSize: 11.5, cursor: 'pointer',
                  }}>×</button>
                </>
              )}
              {l.status === 'answered' && (
                <button onClick={() => setStatus(l.id, 'booked')} style={{
                  padding: '5px 10px', borderRadius: 6, background: VT.accent, color: '#fff',
                  border: 'none', fontSize: 11.5, fontWeight: 600, cursor: 'pointer',
                }}>Записан</button>
              )}
              {(l.status === 'booked' || l.status === 'declined') && (
                <span style={{ color: VT.inkFaint, fontSize: 11.5 }}>—</span>
              )}
            </span>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: 40, textAlign: 'center', color: VT.inkFaint }}>
            Заявок в этом статусе нет
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reviews tab — AI-curated list with show/hide toggles

function ReviewsTab() {
  const [reviews, setReviews] = useState([
    { id: 1, author: 'Наталья К.', source: 'Я.Карты', date: '12 апр', rating: 5, text: 'Очень аккуратно и бережно, форма держится 3 недели. Записываюсь только сюда, и подруг привела.', shown: true, topPick: true },
    { id: 2, author: 'Мария Л.',   source: 'Я.Карты', date: '02 апр', rating: 5, text: 'Чисто, спокойно, всегда вовремя. Кофе тоже вкусный 🙂 Удобно записываться через бот.', shown: true, topPick: true },
    { id: 3, author: 'Дарья Н.',   source: 'Я.Карты', date: '28 мар', rating: 5, text: 'Записала на следующий день, всё успели идеально к свадьбе. Спасибо за выручку!', shown: true, topPick: false },
    { id: 4, author: 'Анна С.',    source: 'Telegram', date: '21 мар', rating: 5, text: 'Прихожу уже 2 года, ни одного нарекания. Цены адекватные, мастер растёт.', shown: true, topPick: false },
    { id: 5, author: 'Юлия В.',    source: '2GIS',    date: '14 мар', rating: 5, text: 'Удобный сайт, удобная запись, удобное место. Не люблю салоны — а здесь как дома.', shown: true, topPick: false },
    { id: 6, author: 'Ольга М.',   source: 'Я.Карты', date: '06 мар', rating: 5, text: 'Сделала маникюр перед отпуском, через 3 недели вернулась — всё как только что.', shown: true, topPick: false },
    { id: 7, author: 'Аноним',     source: 'Я.Карты', date: '02 мар', rating: 3, text: 'Опоздала на 5 минут, но в целом ок', shown: false, topPick: false },
    { id: 8, author: 'Ольга',      source: 'Я.Карты', date: '28 фев', rating: 4, text: 'Норм', shown: false, topPick: false },
  ]);

  const toggleShown = (id) => setReviews(rs => rs.map(r => r.id === id ? { ...r, shown: !r.shown } : r));

  const shownCount = reviews.filter(r => r.shown).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {/* curation header */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 14, padding: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap',
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: VT.ink, letterSpacing: '-0.02em' }}>
            AI-кураторство отзывов
          </div>
          <div style={{ fontSize: 13.5, color: VT.inkSoft, marginTop: 2 }}>
            На сайте показано <b>{shownCount}</b> отзывов из {reviews.length}. {BRAND.name} обновляет подборку каждую неделю — выбирает 4–6 самых тёплых.
          </div>
        </div>
        <button style={{
          padding: '10px 18px', borderRadius: 999,
          background: VT.accent, color: '#fff', fontWeight: 600, fontSize: 13.5,
          border: 'none', cursor: 'pointer',
        }}>Перечитать все отзывы →</button>
      </div>

      {/* review cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {reviews.map(r => (
          <div key={r.id} style={{
            background: VT.white,
            border: r.shown ? `1px solid ${VT.line}` : `1px dashed ${VT.line}`,
            borderRadius: 14, padding: 16,
            opacity: r.shown ? 1 : 0.55,
            position: 'relative',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <span style={{
                width: 32, height: 32, borderRadius: '50%', flex: '0 0 auto',
                background: 'linear-gradient(140deg, oklch(0.78 0.10 50), oklch(0.55 0.12 35))',
                color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 14,
              }}>{r.author[0]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600, color: VT.ink }}>{r.author}</span>
                  {r.topPick && (
                    <span style={{
                      marginLeft: 'auto',
                      fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.08em',
                      background: VT.accentSoft, color: VT.accentInk,
                      padding: '2px 6px', borderRadius: 3, fontWeight: 700,
                    }}>★ ТОП</span>
                  )}
                </div>
                <div style={{
                  fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint, marginTop: 2,
                }}>
                  {r.source} · {r.date} · {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                </div>
              </div>
            </div>
            <p style={{
              margin: '10px 0 0', fontSize: 13.5, lineHeight: 1.5, color: VT.ink, textWrap: 'pretty',
            }}>«{r.text}»</p>
            <label style={{
              marginTop: 12, display: 'flex', alignItems: 'center', gap: 8,
              cursor: 'pointer', fontSize: 12.5, color: VT.inkSoft,
            }}>
              <span style={{
                width: 30, height: 18, borderRadius: 9,
                background: r.shown ? VT.success : VT.line,
                position: 'relative', transition: 'background .15s', flex: '0 0 auto',
              }}>
                <span style={{
                  position: 'absolute', top: 2, left: r.shown ? 14 : 2,
                  width: 14, height: 14, borderRadius: '50%', background: '#fff',
                  transition: 'left .15s',
                }} />
              </span>
              <input type="checkbox" checked={r.shown} onChange={() => toggleShown(r.id)} style={{ display: 'none' }} />
              {r.shown ? 'Показывается на сайте' : 'Скрыт'}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Services tab

function ServicesTab() {
  const [services, setServices] = useState([
    { id: 1, name: 'Аппаратный маникюр',           duration: '60 мин', price: '1 500 ₽' },
    { id: 2, name: 'Маникюр + покрытие гель-лаком', duration: '90 мин', price: '2 200 ₽' },
    { id: 3, name: 'Педикюр аппаратный',           duration: '90 мин', price: '2 800 ₽' },
    { id: 4, name: 'Дизайн ногтей',                 duration: '',        price: 'от 150 ₽' },
    { id: 5, name: 'Снятие покрытия',               duration: '20 мин',  price: '500 ₽' },
  ]);
  const [edit, setEdit] = useState(null);

  return (
    <div style={{
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: 16, overflow: 'hidden',
    }}>
      <div style={{
        padding: '14px 22px', background: VT.bgSoft, borderBottom: `1px solid ${VT.line}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: VT.ink }}>
          Услуги и цены — {services.length}
        </div>
        <button style={{
          padding: '8px 16px', borderRadius: 999,
          background: VT.accent, color: '#fff', fontWeight: 600, fontSize: 13,
          border: 'none', cursor: 'pointer',
        }}>+ Добавить услугу</button>
      </div>
      {services.map(sv => (
        <div key={sv.id} style={{
          display: 'grid', gridTemplateColumns: '1.5fr 0.8fr 0.8fr 0.6fr',
          padding: '14px 22px',
          borderBottom: `1px solid ${VT.lineSoft}`,
          alignItems: 'center', gap: 10,
        }}>
          {edit === sv.id ? (
            <>
              <input defaultValue={sv.name}
                onBlur={(e) => { setServices(s => s.map(x => x.id === sv.id ? { ...x, name: e.target.value } : x)); setEdit(null); }}
                style={{ ...editorTextarea, padding: '6px 10px' }} autoFocus />
              <input defaultValue={sv.duration} style={{ ...editorTextarea, padding: '6px 10px', fontFamily: VT.font.mono }} />
              <input defaultValue={sv.price} style={{ ...editorTextarea, padding: '6px 10px', fontFamily: VT.font.mono }} />
              <button onClick={() => setEdit(null)} style={{ ...editorSecondaryBtn, fontSize: 12 }}>OK</button>
            </>
          ) : (
            <>
              <span style={{ fontSize: 14, color: VT.ink, fontWeight: 500 }}>{sv.name}</span>
              <span style={{ fontFamily: VT.font.mono, fontSize: 12.5, color: VT.inkSoft }}>{sv.duration || '—'}</span>
              <span style={{ fontFamily: VT.font.mono, fontSize: 13, color: VT.ink, fontWeight: 600 }}>{sv.price}</span>
              <span style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => setEdit(sv.id)} style={{ ...editorSecondaryBtn, fontSize: 11 }}>✎</button>
                <button onClick={() => setServices(s => s.filter(x => x.id !== sv.id))}
                  style={{ ...editorSecondaryBtn, fontSize: 11, color: VT.danger }}>×</button>
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Settings tab

function SettingsTab() {
  const [notify, setNotify] = useState({ tg: true, max: false, email: true });
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
      {/* Billing */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 14, padding: 22,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: '-0.015em', marginBottom: 12 }}>
          Подписка
        </div>
        <div style={{
          padding: '14px 16px', background: VT.bgSoft, borderRadius: 10,
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.025em', color: VT.ink }}>{DEMO_SITE.plan}</div>
            <div style={{ fontSize: 12, color: VT.inkFaint, marginTop: 2 }}>Следующее списание · {DEMO_SITE.nextBilling}</div>
          </div>
          <span style={{
            padding: '4px 10px', borderRadius: 999,
            background: 'oklch(0.93 0.06 145)', color: 'oklch(0.32 0.11 145)',
            fontSize: 11.5, fontWeight: 600,
          }}>АКТИВНА</span>
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
          <button style={editorSecondaryBtn}>Изменить карту</button>
          <button style={{ ...editorSecondaryBtn, color: VT.danger }}>Отменить подписку</button>
        </div>
      </div>

      {/* Domain */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 14, padding: 22,
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: '-0.015em', marginBottom: 12 }}>
          Адрес сайта
        </div>
        <div style={{ fontFamily: VT.font.mono, fontSize: 14, color: VT.ink, marginBottom: 10 }}>
          {DEMO_SITE.domain}
        </div>
        <button style={editorSecondaryBtn}>Подключить свой домен</button>
      </div>

      {/* Notifications */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 14, padding: 22, gridColumn: '1 / -1',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: '-0.015em', marginBottom: 12 }}>
          Куда присылать заявки
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            ['tg',    'Telegram',  '@anna_studio',  '#229ED9'],
            ['max',   'MAX',       'не подключено', 'oklch(0.55 0.13 285)'],
            ['email', 'Email',     'anna@studio.ru', VT.accent],
          ].map(([k, label, value, color]) => (
            <label key={k} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              background: notify[k] ? VT.bgSoft : VT.white,
              border: `1px solid ${notify[k] ? VT.line : VT.lineSoft}`,
              borderRadius: 10,
              cursor: 'pointer',
            }}>
              <span style={{
                width: 36, height: 36, borderRadius: 8,
                background: notify[k] ? color : VT.bgSoft,
                color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, fontSize: 14, opacity: notify[k] ? 1 : 0.4,
                flex: '0 0 auto',
              }}>{label[0]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: VT.ink }}>{label}</div>
                <div style={{ fontSize: 12, color: VT.inkSoft, fontFamily: VT.font.mono }}>{value}</div>
              </div>
              <span style={{
                width: 36, height: 22, borderRadius: 11,
                background: notify[k] ? VT.accent : VT.line,
                position: 'relative', transition: 'background .15s', flex: '0 0 auto',
              }}>
                <span style={{
                  position: 'absolute', top: 2, left: notify[k] ? 16 : 2,
                  width: 18, height: 18, borderRadius: '50%', background: '#fff',
                  transition: 'left .15s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }} />
              </span>
              <input type="checkbox" checked={notify[k]} onChange={() => setNotify(n => ({ ...n, [k]: !n[k] }))} style={{ display: 'none' }} />
            </label>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div style={{
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: 14, padding: 22, gridColumn: '1 / -1',
      }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: VT.ink, letterSpacing: '-0.015em', marginBottom: 12 }}>
          Управление сайтом
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => setPaused(p => !p)} style={{
            padding: '10px 16px', borderRadius: 10,
            background: paused ? VT.success : VT.white,
            color: paused ? '#fff' : VT.ink, fontWeight: 600, fontSize: 13.5,
            border: `1px solid ${paused ? VT.success : VT.line}`,
            cursor: 'pointer',
          }}>
            {paused ? '▶ Возобновить' : '⏸ Поставить на паузу'}
          </button>
          <button style={{
            padding: '10px 16px', borderRadius: 10,
            background: VT.white, color: VT.ink, fontWeight: 600, fontSize: 13.5,
            border: `1px solid ${VT.line}`, cursor: 'pointer',
          }}>↓ Скачать архив (HTML + фото)</button>
          <button style={{
            padding: '10px 16px', borderRadius: 10,
            background: VT.white, color: VT.danger, fontWeight: 600, fontSize: 13.5,
            border: `1px solid ${VT.line}`, cursor: 'pointer',
          }}>× Удалить сайт</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main shell

function ClientAdminDemo() {
  const [tab, setTab] = useState('analytics');
  const currentTab = TABS.find(t => t.id === tab);

  return (
    <div style={{
      width: '100%', minHeight: '100vh', background: VT.bg, color: VT.ink,
      fontFamily: VT.font.sans, letterSpacing: '-0.005em',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: `${VT.white}f0`, backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${VT.line}`,
        padding: '12px 28px',
        display: 'flex', alignItems: 'center', gap: 18,
      }}>
        <BrandMark size={26} fontSize={18} />
        <span style={{
          padding: '4px 10px', borderRadius: 6, background: VT.bgSoft,
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.1em', color: VT.inkFaint, fontWeight: 600,
        }}>ДЕМО · ЛИЧНЫЙ КАБИНЕТ</span>
        <div style={{ flex: 1 }} />
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: 13, color: VT.inkSoft,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.success }} />
          <Mono style={{ fontSize: 13, color: VT.ink }}>{DEMO_SITE.domain}</Mono>
          · опубликован
        </span>
        <a href="index.html" style={{
          padding: '8px 14px', borderRadius: 999,
          background: VT.bgSoft, border: `1px solid ${VT.line}`,
          color: VT.ink, fontWeight: 500, fontSize: 13,
          textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>← Назад к лендингу</a>
        <a href="#" style={{
          padding: '8px 16px', borderRadius: 999,
          background: VT.accent, color: '#fff', fontWeight: 600, fontSize: 13,
          textDecoration: 'none',
        }}>Открыть сайт ↗</a>
      </header>

      {/* Main */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Sidebar */}
        <aside style={{
          width: 240, flex: '0 0 auto',
          background: VT.white, borderRight: `1px solid ${VT.line}`,
          padding: '20px 14px', display: 'flex', flexDirection: 'column', gap: 4,
        }}>
          <div style={{
            padding: '6px 14px',
            fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.1em',
            color: VT.inkFaint, fontWeight: 600, marginBottom: 4,
          }}>
            СТУДИЯ АННЫ
          </div>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '10px 14px', borderRadius: 10,
              background: tab === t.id ? VT.accentSoft : 'transparent',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 14, color: tab === t.id ? VT.accentInk : VT.ink, fontWeight: tab === t.id ? 600 : 500,
              fontFamily: VT.font.sans,
            }}>
              <span style={{ color: tab === t.id ? VT.accent : VT.inkSoft, display: 'inline-flex' }}>
                <NavIcon kind={t.icon} size={17} />
              </span>
              <span style={{ flex: 1 }}>{t.label}</span>
              {t.badge && (
                <span style={{
                  padding: '1px 7px', borderRadius: 999,
                  background: VT.accent, color: '#fff',
                  fontFamily: VT.font.mono, fontSize: 10.5, fontWeight: 700,
                }}>{t.badge}</span>
              )}
            </button>
          ))}

          {/* spacer */}
          <div style={{ flex: 1 }} />

          {/* mini help card */}
          <div style={{
            margin: '20px 6px 0', padding: 14,
            background: VT.bgSoft, borderRadius: 12,
            fontSize: 12.5, color: VT.inkSoft, lineHeight: 1.5,
          }}>
            <div style={{ fontWeight: 600, color: VT.ink, marginBottom: 4 }}>Это демо</div>
            Все данные ниже — пример. Реальный ЛК выглядит так же.
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, padding: '24px 28px 60px', overflowX: 'hidden' }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{
              fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em',
              margin: 0, lineHeight: 1.1, color: VT.ink,
            }}>{currentTab.label}</h1>
          </div>

          {tab === 'analytics' && <AnalyticsTab />}
          {tab === 'site'      && <SiteEditTab />}
          {tab === 'leads'     && <LeadsTab />}
          {tab === 'reviews'   && <ReviewsTab />}
          {tab === 'services'  && <ServicesTab />}
          {tab === 'settings'  && <SettingsTab />}
        </main>
      </div>
    </div>
  );
}

Object.assign(window, { ClientAdminDemo });

})(); } // end __ss_admin_demo guard
