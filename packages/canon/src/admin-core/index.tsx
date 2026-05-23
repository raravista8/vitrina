'use client';

import React, { useState, useEffect, useCallback, Fragment } from 'react';
import { VT } from '../tokens';
import { Eyebrow, Mono, Card, Btn, Badge, IconArrow, Spinner } from '../primitives';


// ─────────────────────────────────────────────────────────────
// 1. Shared design surfaces
// ─────────────────────────────────────────────────────────────

function SkeletonBlock({ width = '100%', height = 14, radius = 4, style }) {
  return (
    <span aria-hidden="true" style={{
      display: 'inline-block', width, height, borderRadius: radius,
      background: VT.bgSoft,
      backgroundImage: `linear-gradient(90deg, ${VT.bgSoft}, ${VT.lineSoft}, ${VT.bgSoft})`,
      backgroundSize: '200% 100%',
      animation: 'vt-shimmer 1.4s ease-in-out infinite',
      ...style,
    }} />
  );
}

function EmptyState({ title, hint }) {
  return (
    <div role="status" style={{
      padding: '48px 24px', textAlign: 'center',
      color: VT.inkFaint, fontFamily: VT.font.sans,
    }}>
      <div aria-hidden="true" style={{ fontSize: 28, opacity: 0.6, marginBottom: 8 }}>∅</div>
      <div style={{ fontSize: 14.5, fontWeight: 500, color: VT.inkSoft, marginBottom: 4 }}>{title}</div>
      {hint && <div style={{ fontSize: 13 }}>{hint}</div>}
    </div>
  );
}

function ErrorBlock({ title, message, onRetry }) {
  return (
    <Card role="alert" style={{
      padding: 18, background: VT.dangerSoft, borderColor: 'oklch(0.86 0.06 28)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span aria-hidden="true" style={{ fontSize: 18 }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14, color: 'oklch(0.4 0.15 28)' }}>
            {title || 'Что-то пошло не так'}
          </div>
          {message && <div style={{ fontSize: 13, color: VT.inkSoft, marginTop: 2 }}>{message}</div>}
        </div>
        {onRetry && (
          <button type="button" onClick={onRetry} style={{
            border: 'none', background: VT.white, color: VT.ink,
            padding: '6px 12px', borderRadius: VT.r.pill,
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: VT.font.sans,
          }}>Повторить</button>
        )}
      </div>
    </Card>
  );
}

function RateLimitCountdown({ retryAfterSeconds = 2843 }) {
  const [remaining, setRemaining] = useState(retryAfterSeconds);
  useEffect(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  return (
    <div role="alert" style={{
      padding: '10px 12px', background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`, borderRadius: VT.r.md,
      fontSize: 13, color: 'oklch(0.4 0.15 28)', marginBottom: 14,
      display: 'flex', alignItems: 'center', gap: 8,
    }}>
      <span aria-hidden="true">⚠️</span>
      <span>5 неудач за 15 мин — IP заблокирован. Осталось <Mono style={{ color: 'inherit', fontSize: 13 }}>{mm}:{ss}</Mono>.</span>
    </div>
  );
}

// Shared input atom — terracotta focus ring uses :focus-visible from CanonStyles
function TextField({ type = 'text', value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={e => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      inputMode={inputMode}
      maxLength={maxLength}
      autoFocus={autoFocus}
      disabled={disabled}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '10px 12px',
        background: disabled ? VT.bgSoft : VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14, color: VT.ink,
        fontFamily: mono ? VT.font.mono : VT.font.sans,
        outline: 'none',
        ...style,
      }} />
  );
}

// ─────────────────────────────────────────────────────────────
// 2. AdminChrome (ТЗ §3.11) — sidebar nav + brand + user-pill
// ─────────────────────────────────────────────────────────────

const NAV = [
  ['dashboard', 'Dashboard', '📊'],
  ['apps',      'Заявки',    '📥'],
  ['sites',     'Сайты',     '🌐'],
  ['leads',     'Лиды',      '📨'],
  ['feedback',  'Feedback',  '💬'],
  ['waitlist',  'Waitlist',  '⏳'],
  ['settings',  'Settings',  '⚙️'],
];

// Back-compat alias for canvas — legacy 'dash' → 'dashboard'
const SECTION_ALIAS = { dash: 'dashboard' };

function AdminChrome({
  active = 'dashboard',
  user,
  onNavigate,
  onLogout,
  badgeCounts,
  children,
}) {
  const activeKey = SECTION_ALIAS[active] || active;
  const u = user || { username: 'founder@samosite.online', initials: 'F' };
  // Default badge for canvas/mock parity — only if no badgeCounts prop
  const badges = badgeCounts ?? { apps: 12 };

  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '220px 1fr',
      minHeight: '100%', background: VT.bgSoft, fontFamily: VT.font.sans,
      color: VT.ink, letterSpacing: '-0.005em',
    }}>
      <aside style={{
        background: VT.bg, borderRight: `1px solid ${VT.line}`,
        padding: 16, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', marginBottom: 18 }}>
          <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: 'inset 0 0 0 4px ' + VT.bg }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>Самосайт</span>
          <Badge kind="neutral" style={{ marginLeft: 'auto', padding: '2px 6px', fontSize: 10, borderRadius: 4 }}>ADMIN</Badge>
        </div>

        <nav aria-label="Admin sections" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV.map(([key, name, icon]) => {
            const isActive = activeKey === key;
            const count = badges?.[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => onNavigate && onNavigate(key)}
                aria-current={isActive ? 'page' : undefined}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: VT.r.sm,
                  background: isActive ? VT.accentSoft : 'transparent',
                  color: isActive ? VT.accentInk : VT.ink,
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer', textAlign: 'left',
                  border: 'none', fontFamily: 'inherit',
                  width: '100%',
                }}>
                <span aria-hidden="true" style={{ fontSize: 15, width: 18, display: 'inline-flex' }}>{icon}</span>
                {name}
                {typeof count === 'number' && count > 0 && (
                  <Badge kind="warn" style={{ marginLeft: 'auto', padding: '1px 7px', fontSize: 10, borderRadius: 999 }}>{count}</Badge>
                )}
              </button>
            );
          })}
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: `1px solid ${VT.line}`, fontSize: 12, color: VT.inkFaint, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span aria-hidden="true" style={{ width: 24, height: 24, borderRadius: '50%', background: VT.accentSoft, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: VT.accentInk, fontWeight: 600 }}>{u.initials}</span>
          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.username}</span>
          <button
            type="button"
            onClick={() => onLogout && onLogout()}
            style={{
              border: 'none', background: 'transparent',
              color: VT.inkFaint, cursor: 'pointer', fontSize: 12,
              fontFamily: 'inherit', padding: 0,
            }}>выйти</button>
        </div>
      </aside>

      <main style={{ minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 3. AdminLogin (ТЗ §3.1) — controlled 2-step form
// ─────────────────────────────────────────────────────────────

const LOGIN_ERROR_MSG = {
  invalid_credentials: 'Неверный логин или пароль',
  invalid_challenge: 'Сессия истекла. Начните заново.',
  invalid_code: 'Неверный код. Попробуйте ещё раз.',
  rate_limited: 'Слишком много попыток. Подождите.',
  network_error: 'Нет связи с сервером.',
  unknown_error: 'Что-то пошло не так. Попробуйте ещё раз.',
};

function S10_AdminLogin(props) {
  // ── Uncontrolled fallback state — only used when controlled prop is undefined
  const [uStep, setUStep] = useState(props.step ?? 1);
  const [uUser, setUUser] = useState(props.username ?? 'founder@samosite.online');
  const [uPass, setUPass] = useState(props.password ?? '');
  const [uTotp, setUTotp] = useState(props.totp ?? '');
  const [uBackup, setUBackup] = useState(props.backupCode ?? '');
  const [uMode, setUMode] = useState(props.mode ?? 'totp');

  const step = props.step ?? uStep;
  const setStep = props.onStepChange ?? setUStep;
  const username = props.username ?? uUser;
  const setUsername = props.onUsernameChange ?? setUUser;
  const password = props.password ?? uPass;
  const setPassword = props.onPasswordChange ?? setUPass;
  const totp = props.totp ?? uTotp;
  const setTotp = props.onTotpChange ?? setUTotp;
  const backupCode = props.backupCode ?? uBackup;
  const setBackupCode = props.onBackupCodeChange ?? setUBackup;
  const mode = props.mode ?? uMode;
  const setMode = props.onModeChange ?? setUMode;

  const { loading, error, rateLimited, rateLimitedRetryAfterSeconds = 2843,
          onSubmitCredentials, onSubmitCode } = props;

  const onSubmit1 = useCallback((e) => {
    e.preventDefault();
    if (loading) return;
    if (onSubmitCredentials) {
      onSubmitCredentials(username, password);
    } else {
      // Canvas demo behaviour — advance to step 2
      setStep(2);
    }
  }, [loading, onSubmitCredentials, username, password, setStep]);

  const onSubmit2 = useCallback((e) => {
    e.preventDefault();
    if (loading) return;
    const code = mode === 'totp' ? totp : backupCode;
    if (onSubmitCode) onSubmitCode(mode, code);
    // (no canvas fallback — staying on step 2 in demo)
  }, [loading, mode, totp, backupCode, onSubmitCode]);

  return (
    <div style={{
      background: VT.bgSoft, minHeight: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: VT.font.sans, padding: 24,
    }}>
      <Card style={{ width: 400, padding: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
          <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 6, background: VT.accent, boxShadow: 'inset 0 0 0 4px ' + VT.white }} />
          <span style={{ fontWeight: 700, fontSize: 16 }}>Самосайт</span>
          <Badge kind="neutral" style={{ marginLeft: 'auto', padding: '2px 7px', fontSize: 10 }}>ADMIN</Badge>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 4px' }}>
          {step === 1 ? 'Вход в админку' : 'Двухфакторная аутентификация'}
        </h1>
        <p style={{ fontSize: 13.5, color: VT.inkSoft, margin: '0 0 18px' }}>
          {step === 1 ? 'Только для founder. Все попытки логируются.' : 'Введите 6-значный код из приложения-аутентификатора.'}
        </p>

        {rateLimited && <RateLimitCountdown retryAfterSeconds={rateLimitedRetryAfterSeconds} />}

        {error && !rateLimited && (
          <div role="alert" style={{
            padding: '8px 12px', background: VT.dangerSoft,
            border: `1px solid oklch(0.85 0.06 28)`, borderRadius: VT.r.md,
            fontSize: 13, color: 'oklch(0.4 0.15 28)', marginBottom: 14,
          }}>{LOGIN_ERROR_MSG[error] || LOGIN_ERROR_MSG.unknown_error}</div>
        )}

        {step === 1 ? (
          <form onSubmit={onSubmit1}>
            <label htmlFor="ss-admin-email" style={{ display: 'block', fontSize: 12, color: VT.inkSoft, marginBottom: 4 }}>Email</label>
            <TextField
              type="text"
              value={username}
              onChange={setUsername}
              ariaLabel="Email"
              autoFocus
              disabled={loading || rateLimited}
              mono
              style={{ marginBottom: 10 }} />

            <label htmlFor="ss-admin-password" style={{ display: 'block', fontSize: 12, color: VT.inkSoft, marginBottom: 4 }}>Пароль</label>
            <TextField
              type="password"
              value={password}
              onChange={setPassword}
              ariaLabel="Пароль"
              placeholder="••••••••••••"
              disabled={loading || rateLimited}
              mono />

            <div style={{ marginTop: 18 }}>
              <Btn
                type="submit"
                style={{ width: '100%' }}
                disabled={loading || rateLimited || !username || !password}
                iconRight={loading ? <Spinner size={14} /> : <IconArrow />}>
                {loading ? 'Проверяем…' : 'Дальше'}
              </Btn>
            </div>
          </form>
        ) : (
          <form onSubmit={onSubmit2}>
            {/* Mode toggle */}
            <div role="tablist" aria-label="Способ подтверждения" style={{ display: 'flex', gap: 6, marginBottom: 12, padding: 3, background: VT.bgSoft, borderRadius: VT.r.md, border: `1px solid ${VT.line}` }}>
              {[
                ['totp', 'Аутентификатор'],
                ['backup', 'Backup-код'],
              ].map(([key, label]) => {
                const isActive = mode === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setMode(key)}
                    disabled={loading || rateLimited}
                    style={{
                      flex: 1, padding: '6px 10px',
                      border: 'none', borderRadius: VT.r.sm,
                      background: isActive ? VT.white : 'transparent',
                      color: isActive ? VT.ink : VT.inkSoft,
                      boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
                      fontSize: 13, fontWeight: isActive ? 600 : 500,
                      cursor: 'pointer', fontFamily: 'inherit',
                    }}>{label}</button>
                );
              })}
            </div>

            <label style={{ display: 'block', fontSize: 12, color: VT.inkSoft, marginBottom: 6 }}>
              {mode === 'totp' ? 'Код из аутентификатора' : 'Backup-код'}
            </label>
            <TextField
              type="text"
              value={mode === 'totp' ? totp : backupCode}
              onChange={mode === 'totp' ? setTotp : setBackupCode}
              ariaLabel={mode === 'totp' ? 'TOTP код' : 'Backup-код'}
              inputMode="numeric"
              maxLength={mode === 'totp' ? 6 : 12}
              placeholder={mode === 'totp' ? '· · · · · ·' : 'aaaa-bbbb-cccc'}
              autoFocus
              disabled={loading || rateLimited}
              mono
              style={{ fontSize: 20, letterSpacing: mode === 'totp' ? '0.4em' : '0.1em', textAlign: 'center' }} />

            <div style={{ marginTop: 18, display: 'flex', gap: 8 }}>
              <Btn
                variant="secondary"
                type="button"
                onClick={() => setStep(1)}
                disabled={loading}
                style={{ flex: '0 0 auto' }}>← Назад</Btn>
              <Btn
                type="submit"
                style={{ flex: 1 }}
                disabled={loading || rateLimited || !(mode === 'totp' ? totp : backupCode)}
                iconRight={loading ? <Spinner size={14} /> : <IconArrow />}>
                {loading ? 'Проверяем…' : 'Войти'}
              </Btn>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 4. Shared primitives (StatTile / StatusPill / FilterChip / TrendChart)
// ─────────────────────────────────────────────────────────────

function StatTile({ label, value, delta, deltaSign, sub, onClick, loading }) {
  const clickable = !!onClick && !loading;
  return (
    <Card
      style={{
        padding: 18,
        cursor: clickable ? 'pointer' : 'default',
        transition: 'transform .15s ease, box-shadow .15s ease',
      }}>
      <div
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        onClick={clickable ? onClick : undefined}
        onKeyDown={clickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } } : undefined}>
        <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>{String(label).toUpperCase()}</Mono>
        {loading ? (
          <div style={{ marginTop: 8 }}>
            <SkeletonBlock width={64} height={28} radius={6} />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
            <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em' }}>{value}</span>
            {delta && (
              <span style={{
                fontSize: 12.5, fontWeight: 600,
                color: deltaSign === '+' ? VT.success : deltaSign === '-' ? VT.danger : VT.inkSoft,
              }}>{deltaSign}{delta}</span>
            )}
          </div>
        )}
        {sub && !loading && <div style={{ fontSize: 12, color: VT.inkFaint, marginTop: 4 }}>{sub}</div>}
        {loading && <div style={{ marginTop: 6 }}><SkeletonBlock width="50%" height={10} /></div>}
      </div>
    </Card>
  );
}

// StatusPill — accepts application/site/lead statuses (ТЗ §3.12)
const STATUS_MAP = {
  // Applications (richer canon set + TZ API set)
  new:               [VT.infoSoft,    'oklch(0.38 0.10 240)', 'новая'],
  parsing:           [VT.infoSoft,    'oklch(0.38 0.10 240)', 'парсится'],
  generated:         [VT.warnSoft,    'oklch(0.40 0.13 70)',  'готов'],
  published:         [VT.successSoft, 'oklch(0.34 0.12 145)', 'опубликован'],
  rejected:          [VT.dangerSoft,  'oklch(0.42 0.15 28)',  'отклонён'],
  rework:            [VT.warnSoft,    'oklch(0.40 0.13 70)',  'переделка'],
  pending:           [VT.infoSoft,    'oklch(0.38 0.10 240)', 'на модерации'],
  approved:          [VT.successSoft, 'oklch(0.34 0.12 145)', 'одобрена'],
  // Sites
  draft:             [VT.bgSoft,      VT.inkSoft,             'черновик'],
  generating:        [VT.infoSoft,    'oklch(0.38 0.10 240)', 'генерируется'],
  pending_review:    [VT.warnSoft,    'oklch(0.40 0.13 70)',  'на проверке'],
  paused:            [VT.bgSoft,      VT.inkSoft,             'на паузе'],
  archived:          [VT.bgSoft,      VT.inkMuted,            'в архиве'],
  // Leads
  read:              [VT.bgSoft,      VT.inkSoft,             'прочитан'],
};

function StatusPill({ status, size = 'md' }) {
  const m = STATUS_MAP[status] || [VT.bgSoft, VT.inkSoft, String(status)];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: size === 'sm' ? '2px 7px' : '3px 9px',
      borderRadius: 999,
      background: m[0], color: m[1],
      fontSize: size === 'sm' ? 11 : 11.5, fontWeight: 500,
    }}>
      <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
      {m[2]}
    </span>
  );
}

function FilterChip({ label, active, count, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px', borderRadius: 999,
        background: active ? VT.accentSoft : VT.white,
        color: active ? VT.accentInk : VT.ink,
        border: `1px solid ${active ? 'transparent' : VT.line}`,
        fontSize: 13, fontWeight: 500,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit',
      }}>
      {label}
      {count != null && <Mono style={{ fontSize: 11, color: 'inherit', opacity: 0.7 }}>{count}</Mono>}
    </button>
  );
}

function TrendChart({ series, height = 200, labels }) {
  // series: Array<{day, count}> | Array<number> — both shapes accepted
  const points = series && series.length
    ? series.map(s => typeof s === 'number' ? s : (s.count ?? 0))
    : [12, 18, 14, 22, 28, 24, 32, 38, 30, 42, 48, 44, 52];
  const max = Math.max(...points, 1);
  const w = 720;
  const xLabels = labels || ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${(i / (points.length - 1)) * w} ${height - 30 - (p / max) * (height - 50)}`).join(' ');
  const area = path + ` L ${w} ${height - 30} L 0 ${height - 30} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${height}`} width="100%" height={height} preserveAspectRatio="none" role="img" aria-label="График заявок">
      <path d={area} fill={VT.accentSoft} opacity="0.7" />
      <path d={path} fill="none" stroke={VT.accent} strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={(i / (points.length - 1)) * w} cy={height - 30 - (p / max) * (height - 50)} r="3" fill={VT.bg} stroke={VT.accent} strokeWidth="1.5"/>
      ))}
      {xLabels.map((l, i) => (
        <text key={l + i} x={(i / (xLabels.length - 1)) * w} y={height - 8} fontSize="11" fill={VT.inkFaint} fontFamily="JetBrains Mono, monospace" textAnchor={i === 0 ? 'start' : i === xLabels.length - 1 ? 'end' : 'middle'}>{l}</text>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// 5. Dashboard (ТЗ §3.2)
// ─────────────────────────────────────────────────────────────

const MOCK_DASHBOARD = {
  counters: {
    apps_total: 142,
    apps_pending: 12,
    sites_published: 34,
    leads_total: 217,
    feedback_total: 6,
  },
  applications_series_14d: [
    { day: '2026-05-06', count: 12 }, { day: '2026-05-07', count: 18 },
    { day: '2026-05-08', count: 14 }, { day: '2026-05-09', count: 22 },
    { day: '2026-05-10', count: 28 }, { day: '2026-05-11', count: 24 },
    { day: '2026-05-12', count: 32 }, { day: '2026-05-13', count: 38 },
    { day: '2026-05-14', count: 30 }, { day: '2026-05-15', count: 42 },
    { day: '2026-05-16', count: 48 }, { day: '2026-05-17', count: 44 },
    { day: '2026-05-18', count: 52 }, { day: '2026-05-19', count: 8 },
  ],
};

const COUNTER_TILES = [
  { key: 'apps_total',      label: 'Всего заявок', section: 'apps' },
  { key: 'apps_pending',    label: 'Pending',      section: 'apps' },
  { key: 'sites_published', label: 'Опубликовано', section: 'sites' },
  { key: 'leads_total',     label: 'Лиды',         section: 'leads' },
  { key: 'feedback_total',  label: 'Feedback',     section: 'feedback' },
];

function S11_Dashboard({ data, loading, error, onNavigate, onRefresh, _embed }) {
  const d = data || MOCK_DASHBOARD;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'dashboard', onNavigate };

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22 }}>
          <div>
            <Eyebrow>DASHBOARD</Eyebrow>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: '10px 0 0' }}>Сегодня</h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {onRefresh && <Btn variant="secondary" size="sm" onClick={onRefresh}>Обновить</Btn>}
            <Btn variant="secondary" size="sm">7 дней</Btn>
            <Btn variant="secondary" size="sm" style={{ background: VT.accentSoft, color: VT.accentInk, border: 'none' }}>30 дней</Btn>
            <Btn variant="secondary" size="sm">Всё время</Btn>
          </div>
        </div>

        {error && <ErrorBlock message={error} onRetry={onRefresh} />}

        {/* 5 KPI tiles (ТЗ §3.2 data shape) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: error ? 14 : 0 }}>
          {COUNTER_TILES.map(t => (
            <StatTile
              key={t.key}
              label={t.label}
              value={loading ? '' : (d.counters[t.key] ?? 0)}
              loading={loading}
              onClick={onNavigate ? () => onNavigate(t.section) : undefined} />
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, marginTop: 14 }}>
          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div>
                <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ЗАЯВКИ · 14 ДНЕЙ</Mono>
                <div style={{ fontSize: 20, fontWeight: 700, marginTop: 4 }}>
                  {loading ? <SkeletonBlock width={80} height={20} /> : d.applications_series_14d.reduce((s, x) => s + x.count, 0)}
                </div>
              </div>
              <Btn variant="ghost" size="sm">CSV</Btn>
            </div>
            {loading
              ? <SkeletonBlock width="100%" height={200} radius={8} />
              : <TrendChart series={d.applications_series_14d} labels={d.applications_series_14d.map(s => s.day.slice(8))} />}
          </Card>

          <Card style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>QUICK · ТОП-5 PENDING</Mono>
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('apps')}
                style={{
                  fontSize: 12, color: VT.accent, textDecoration: 'underline',
                  background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                }}>все →</button>
            </div>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[0,1,2,3,4].map(i => (
                  <div key={i} style={{ padding: '8px 10px', borderBottom: `1px solid ${VT.lineSoft}` }}>
                    <SkeletonBlock width="80%" height={14} />
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  ['#A-1842', 'TG', 'studia-anna · 47 постов', '12 мин назад'],
                  ['#A-1841', 'YM', 'Барбершоп Самара · 24 отз.', '34 мин назад'],
                  ['#A-1840', 'Photo', 'Психолог Марина · 12 фото', '1 ч назад'],
                  ['#A-1839', 'TG', 'Дом ресниц · 89 постов', '2 ч назад'],
                  ['#A-1838', 'YM', 'Студия йоги · 56 отз.', '3 ч назад'],
                ].map(([id, src, name, ago]) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onNavigate && onNavigate('apps')}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: VT.r.sm,
                      cursor: 'pointer', fontSize: 13,
                      borderBottom: `1px solid ${VT.lineSoft}`,
                      background: 'transparent', border: 'none', textAlign: 'left',
                      fontFamily: 'inherit', width: '100%',
                    }}>
                    <Mono style={{ fontSize: 11, width: 56 }}>{id}</Mono>
                    <Badge kind="neutral" style={{ padding: '2px 7px', fontSize: 10.5, borderRadius: 4 }}>{src}</Badge>
                    <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</span>
                    <Mono style={{ fontSize: 11 }}>{ago}</Mono>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────
// 6. AppsList (ТЗ §3.3)
// ─────────────────────────────────────────────────────────────

const MOCK_APPS_LIST = {
  total: 142,
  limit: 10,
  offset: 0,
  items: [
    { id: '#A-1842', source_type: 'telegram',    source_url: 't.me/studia_anna',   contact_type: 'email',    contact_value_masked: 'an***@gmail',   status: 'new',       rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-19T14:22:00Z' },
    { id: '#A-1841', source_type: 'yandex_maps', source_url: 'yandex.ru/maps/...', contact_type: 'phone',    contact_value_masked: '+7***1234',     status: 'parsing',   rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-19T13:48:00Z' },
    { id: '#A-1840', source_type: 'photos',      source_url: '— · 12 файлов',     contact_type: 'telegram', contact_value_masked: '@mar***',       status: 'new',       rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-19T12:15:00Z' },
    { id: '#A-1839', source_type: 'telegram',    source_url: 't.me/lashes_dom',   contact_type: 'phone',    contact_value_masked: '+7***5678',     status: 'generated', rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-19T11:02:00Z' },
    { id: '#A-1838', source_type: 'yandex_maps', source_url: 'yandex.ru/maps/...', contact_type: 'email',    contact_value_masked: 'st***@yandex',  status: 'parsing',   rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-19T09:30:00Z' },
    { id: '#A-1837', source_type: 'telegram',    source_url: 't.me/barber_samara', contact_type: 'telegram', contact_value_masked: '@ser***',       status: 'published', rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-18T18:44:00Z' },
    { id: '#A-1836', source_type: 'photos',      source_url: '— · 24 файла',      contact_type: 'email',    contact_value_masked: 'ku***@mail',    status: 'rejected',  rejection_reason: 'низкое качество', is_manual_review: false, user_id: null, created_at: '2026-05-18T17:22:00Z' },
    { id: '#A-1835', source_type: 'yandex_maps', source_url: 'yandex.ru/maps/...', contact_type: 'phone',    contact_value_masked: '+7***9012',     status: 'published', rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-18T15:10:00Z' },
    { id: '#A-1834', source_type: 'telegram',    source_url: 't.me/psychomarina',  contact_type: 'email',    contact_value_masked: 'ma***@gmail',   status: 'rework',    rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-18T13:05:00Z' },
    { id: '#A-1833', source_type: 'yandex_maps', source_url: 'yandex.ru/maps/...', contact_type: 'telegram', contact_value_masked: '@fit***',       status: 'published', rejection_reason: null, is_manual_review: false, user_id: null, created_at: '2026-05-18T11:48:00Z' },
  ],
};

const STATUS_FILTERS = [
  ['all',       'Все'],
  ['pending',   'На модерации'],
  ['approved',  'Одобрены'],
  ['rejected',  'Отклонены'],
];

function formatTs(iso) {
  // "2026-05-19T14:22:00Z" → "2026-05-19 14:22"
  return iso.replace('T', ' ').slice(0, 16);
}

function S12_AppsList({
  data,
  loading,
  error,
  statusFilter = 'all',
  onStatusFilterChange,
  onPageChange,
  onRowClick,
  _embed,
}) {
  const d = data || MOCK_APPS_LIST;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'apps', onNavigate: () => {} };

  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>ЗАЯВКИ</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Очередь модерации</h1>
          <Btn variant="secondary" size="sm">Экспорт CSV</Btn>
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {STATUS_FILTERS.map(([key, label]) => (
              <FilterChip
                key={key}
                label={label}
                active={statusFilter === key}
                onClick={() => onStatusFilterChange && onStatusFilterChange(key)} />
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 12px', background: VT.white,
              border: `1px solid ${VT.line}`, borderRadius: 999,
              fontSize: 13, color: VT.inkFaint, minWidth: 240,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3" strokeLinecap="round"/></svg>
              поиск по контакту, ID, источнику
            </div>
          </div>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                {['ID', 'Создана', 'Источник', 'URL', 'Контакт', 'Статус', ''].map(h => (
                  <th key={h || 'go'} scope="col" style={{
                    textAlign: 'left', padding: '12px 16px',
                    fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em',
                    color: VT.inkFaint, fontWeight: 500,
                  }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && [0,1,2,3,4,5,6,7,8,9].map(i => (
                <tr key={i} style={{ borderBottom: `1px solid ${VT.lineSoft}` }}>
                  {[60,90,80,180,90,80,18].map((w, j) => (
                    <td key={j} style={{ padding: '12px 16px' }}>
                      <SkeletonBlock width={w} height={12} />
                    </td>
                  ))}
                </tr>
              ))}
              {showItems && d.items.map(row => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick && onRowClick(row.id)}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter') onRowClick(row.id); } : undefined}
                  style={{ borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? 'pointer' : 'default' }}>
                  <td style={{ padding: '12px 16px' }}><Mono>{row.id}</Mono></td>
                  <td style={{ padding: '12px 16px', color: VT.inkSoft }}><Mono style={{ fontSize: 12 }}>{formatTs(row.created_at)}</Mono></td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge kind="neutral" style={{ padding: '2px 8px', fontSize: 11, borderRadius: 4 }}>{row.source_type}</Badge>
                  </td>
                  <td style={{ padding: '12px 16px', color: VT.inkSoft, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Mono style={{ fontSize: 12 }}>{row.source_url || '—'}</Mono>
                  </td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12 }}>{row.contact_value_masked}</Mono></td>
                  <td style={{ padding: '12px 16px' }}><StatusPill status={row.status} /></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span aria-hidden="true" style={{ color: VT.inkFaint }}>→</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showEmpty && <EmptyState title="Пока нет заявок" hint="Когда придёт первая — она появится здесь." />}
          {!showEmpty && (
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: VT.inkSoft }}>
              <span>
                {d.offset + 1}–{Math.min(d.offset + d.limit, d.total)} из {d.total}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <Btn
                  variant="ghost" size="sm"
                  onClick={() => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit)}
                  disabled={d.offset === 0 || loading}>←</Btn>
                <Btn variant="secondary" size="sm" style={{ background: VT.accentSoft, color: VT.accentInk, border: 'none' }}>{currentPage}</Btn>
                <Mono style={{ alignSelf: 'center' }}>/ {totalPages}</Mono>
                <Btn
                  variant="ghost" size="sm"
                  onClick={() => onPageChange && onPageChange(d.offset + d.limit, d.limit)}
                  disabled={d.offset + d.limit >= d.total || loading}>→</Btn>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────
// 7. AppDetail (ТЗ §3.4)
// ─────────────────────────────────────────────────────────────

const MOCK_APP_DETAIL = {
  application: {
    id: '#A-1842',
    source_type: 'telegram',
    source_url: 't.me/studia_anna',
    contact_type: 'email',
    contact_value_masked: 'an***@gmail',
    status: 'pending',
    rejection_reason: null,
    is_manual_review: false,
    user_id: 'u_1842',
    created_at: '2026-05-19T14:22:00Z',
  },
  user: {
    id: 'u_1842',
    contact_type: 'email',
    contact_value_masked: 'an***@gmail',
    plan: 'trial',
    plan_until: '2026-06-19',
  },
  consent: {
    id: 'c_4711',
    policy_version: 2,
    created_at: '2026-05-19T14:22:18Z',
  },
};

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

function S13_AppDetail({
  data,
  loading,
  error,
  onApprove,
  onReject,
  onBack,
  actionLoading,
  actionError,
  _embed,
}) {
  const d = data || MOCK_APP_DETAIL;
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const app = d.application;
  const isPending = app && app.status === 'pending';
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'apps', onNavigate: onBack ? () => onBack() : undefined };

  const submitReject = () => {
    if (onReject) onReject(app.id, rejectReason || undefined);
    setRejectOpen(false);
    setRejectReason('');
  };

  if (loading) {
    return (
      <Wrap {...wrapProps}>
        <div style={{ padding: '20px 32px 40px' }}>
          <SkeletonBlock width={140} height={14} style={{ marginBottom: 14 }} />
          <SkeletonBlock width={320} height={28} radius={6} style={{ marginBottom: 20 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Card style={{ padding: 18 }}>
              <SkeletonBlock width="100%" height={200} radius={6} />
            </Card>
            <Card style={{ padding: 18 }}>
              <SkeletonBlock width="100%" height={200} radius={6} />
            </Card>
          </div>
        </div>
      </Wrap>
    );
  }

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '20px 32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }}>
          <button
            type="button"
            onClick={() => onBack && onBack()}
            style={{ color: VT.inkFaint, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 13 }}>
            ← Заявки
          </button>
          <span>/</span>
          <Mono style={{ color: VT.ink }}>{app.id}</Mono>
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}
        {actionError && <div style={{ marginBottom: 14 }}><ErrorBlock title="Не удалось выполнить действие" message={actionError} /></div>}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 22 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 6px' }}>
              Студия Анны · маникюр
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13.5, color: VT.inkSoft, flexWrap: 'wrap' }}>
              {app.source_url && (
                <a href={`https://${app.source_url.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" style={{ color: VT.accent, textDecoration: 'underline', textUnderlineOffset: 2 }}>
                  <Mono style={{ color: 'inherit' }}>{app.source_url}</Mono>
                </a>
              )}
              <span>·</span>
              <span>{app.contact_value_masked}</span>
              <span>·</span>
              <Mono>{formatTs(app.created_at)}</Mono>
              <StatusPill status={app.status} />
              {app.is_manual_review && <Badge kind="warn" style={{ fontSize: 11, padding: '2px 8px' }}>manual review</Badge>}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {isPending ? (
              <>
                <Btn
                  variant="secondary" size="sm"
                  onClick={() => setRejectOpen(true)}
                  disabled={!!actionLoading}
                  style={{ color: VT.danger, border: `1px solid ${VT.dangerSoft}` }}>
                  Отклонить
                </Btn>
                <Btn
                  size="sm"
                  onClick={() => onApprove && onApprove(app.id)}
                  disabled={!!actionLoading}
                  iconRight={actionLoading ? <Spinner size={14} /> : <IconArrow size={14} />}>
                  {actionLoading ? 'Одобряем…' : 'Одобрить'}
                </Btn>
              </>
            ) : (
              <Badge kind={app.status === 'approved' || app.status === 'published' ? 'success' : 'neutral'} style={{ padding: '6px 12px' }}>
                Уже {STATUS_MAP[app.status]?.[2] || app.status}
              </Badge>
            )}
          </div>
        </div>

        {rejectOpen && (
          <Card style={{ padding: 16, marginBottom: 14, borderColor: 'oklch(0.85 0.06 28)' }}>
            <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em', color: VT.danger }}>ПРИЧИНА ОТКАЗА</Mono>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Опционально. Будет залогировано в audit-log."
              rows={3}
              style={{
                width: '100%', boxSizing: 'border-box',
                marginTop: 6, padding: '8px 12px',
                background: VT.white, border: `1px solid ${VT.line}`,
                borderRadius: VT.r.md, fontSize: 13, fontFamily: VT.font.sans,
                outline: 'none', resize: 'vertical', color: VT.ink,
              }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 10, justifyContent: 'flex-end' }}>
              <Btn variant="secondary" size="sm" onClick={() => { setRejectOpen(false); setRejectReason(''); }}>Отмена</Btn>
              <Btn
                size="sm"
                onClick={submitReject}
                disabled={!!actionLoading}
                style={{ background: VT.danger }}>
                {actionLoading ? 'Отклоняем…' : 'Подтвердить отказ'}
              </Btn>
            </div>
          </Card>
        )}

        {/* 2-col body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
                  <div key={i} aria-hidden="true" style={{ flex: 1, aspectRatio: '1/1', borderRadius: 6, background: `repeating-linear-gradient(${30 + i*22}deg, ${VT.accentSoft} 0 5px, ${VT.bg} 5px 10px)` }} />
                ))}
              </div>
              <div style={{ fontFamily: VT.font.mono, fontSize: 10.5, color: VT.inkFaint, marginTop: 8 }}>≈ 320 токенов · ≈ 12 ₽ · модель: YandexGPT 5 Pro</div>
            </div>
          </Card>
        </div>

        {/* User + Consent panels (ТЗ §3.4) */}
        {(d.user || d.consent) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
            {d.user && (
              <Card style={{ padding: 18 }}>
                <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>USER</Mono>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: VT.inkSoft }}>Контакт</span>
                    <Mono style={{ fontSize: 13, color: VT.ink }}>{d.user.contact_value_masked}</Mono>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: VT.inkSoft }}>Тариф</span>
                    <Badge
                      kind={d.user.plan === 'pro' ? 'success' : d.user.plan === 'trial' ? 'info' : 'neutral'}
                      style={{ padding: '2px 9px', fontSize: 11.5 }}>
                      {d.user.plan}
                    </Badge>
                  </div>
                  {d.user.plan_until && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 13, color: VT.inkSoft }}>Активен до</span>
                      <Mono style={{ fontSize: 13 }}>{d.user.plan_until}</Mono>
                    </div>
                  )}
                </div>
              </Card>
            )}
            {d.consent && (
              <Card style={{ padding: 18 }}>
                <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>CONSENT</Mono>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: VT.inkSoft }}>Версия политики</span>
                    <Mono style={{ fontSize: 13 }}>v{d.consent.policy_version}</Mono>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: VT.inkSoft }}>Подтверждено</span>
                    <Mono style={{ fontSize: 13 }}>{formatTs(d.consent.created_at)}</Mono>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}

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
    </Wrap>
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
  SkeletonBlock,
  EmptyState,
  ErrorBlock,
  RateLimitCountdown,
  FilterChip,
  TrendChart,
  AdminLogin,
  AdminDashboard,
  AppsList,
  AppDetail
};


export type * from './types';
