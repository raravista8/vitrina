'use client';

import React, { useState, useMemo, Fragment } from 'react';
import { VT } from '../tokens';
import { Eyebrow, Mono, Card, Btn, Badge, IconArrow, Spinner } from '../primitives';
import { AdminChrome, StatusPill, SkeletonBlock, EmptyState, ErrorBlock, FilterChip } from '../admin-core';



// ─────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────

function formatTs(iso) {
  if (!iso) return '—';
  return iso.replace('T', ' ').slice(0, 16);
}
function formatRel(iso) {
  if (!iso) return '—';
  return iso.slice(0, 10);
}

// Shared input atom for text fields in modals
function TextField({ value, onChange, placeholder, ariaLabel, inputMode, maxLength, autoFocus, disabled, style, mono, type = 'text' }) {
  return (
    <input
      type={type}
      value={value ?? ''}
      onChange={(e) => onChange && onChange(e.target.value)}
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
// #14 SitesList (ТЗ §3.5)
// ─────────────────────────────────────────────────────────────

const SITE_STATUS_FILTERS = [
  ['all',            'Все'],
  ['published',      'Опубликованы'],
  ['pending_review', 'На проверке'],
  ['paused',         'На паузе'],
  ['archived',       'Архив'],
];

const MOCK_SITES_LIST = {
  total: 39,
  limit: 10,
  offset: 0,
  items: [
    { id: 's1', user_id: 'u1842', subdomain: 'studia-anna',     custom_domain: null, source_type: 'telegram',    source_url: 't.me/studia_anna',   status: 'published',      last_synced_at: '2026-05-19T06:00:00Z', published_at: '2026-05-05T10:22:00Z', created_at: '2026-05-05T09:30:00Z' },
    { id: 's2', user_id: 'u1837', subdomain: 'barber-samara',   custom_domain: null, source_type: 'telegram',    source_url: 't.me/barber_samara', status: 'published',      last_synced_at: '2026-05-19T06:00:00Z', published_at: '2026-05-04T14:10:00Z', created_at: '2026-05-04T13:00:00Z' },
    { id: 's3', user_id: 'u1838', subdomain: 'lashes-dom',      custom_domain: null, source_type: 'telegram',    source_url: 't.me/lashes_dom',    status: 'published',      last_synced_at: '2026-05-18T06:00:00Z', published_at: '2026-05-02T09:00:00Z', created_at: '2026-05-02T08:30:00Z' },
    { id: 's4', user_id: 'u1834', subdomain: 'psy-marina',      custom_domain: null, source_type: 'telegram',    source_url: 't.me/psychomarina',  status: 'paused',         last_synced_at: '2026-05-12T06:00:00Z', published_at: '2026-04-25T18:00:00Z', created_at: '2026-04-25T17:30:00Z' },
    { id: 's5', user_id: 'u1833', subdomain: 'fit-studio-msk',  custom_domain: 'fitstudio.ru', source_type: 'yandex_maps', source_url: 'yandex.ru/maps/...', status: 'published', last_synced_at: '2026-05-19T06:00:00Z', published_at: '2026-04-22T11:00:00Z', created_at: '2026-04-22T10:30:00Z' },
    { id: 's6', user_id: 'u1831', subdomain: 'konditer-katya',  custom_domain: null, source_type: 'yandex_maps', source_url: 'yandex.ru/maps/...', status: 'published',      last_synced_at: '2026-05-19T06:00:00Z', published_at: '2026-04-20T12:00:00Z', created_at: '2026-04-20T11:30:00Z' },
    { id: 's7', user_id: 'u1825', subdomain: 'tutor-eng-spb',   custom_domain: null, source_type: 'website',     source_url: 'tutor-eng.ru',       status: 'archived',       last_synced_at: null,                    published_at: null,                    created_at: '2026-04-12T08:00:00Z' },
  ],
};

function S14_SitesList({
  data,
  loading,
  error,
  statusFilter = 'all',
  onStatusFilterChange,
  onPageChange,
  onRowClick,
  _embed,
}) {
  const d = data || MOCK_SITES_LIST;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'sites' };
  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const totalPages = Math.max(1, Math.ceil(d.total / Math.max(1, d.limit)));
  const currentPage = Math.floor(d.offset / Math.max(1, d.limit)) + 1;

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>САЙТЫ</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Опубликованные сайты</h1>
          <Btn variant="secondary" size="sm">CSV</Btn>
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}

        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {SITE_STATUS_FILTERS.map(([key, label]) => (
            <FilterChip
              key={key}
              label={label}
              active={statusFilter === key}
              onClick={() => onStatusFilterChange && onStatusFilterChange(key)} />
          ))}
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                {['Subdomain', 'Источник', 'URL', 'Status', 'Last sync', ''].map(h => (
                  <th key={h || 'go'} scope="col" style={{ textAlign: 'left', padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em', color: VT.inkFaint, fontWeight: 500 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && [0,1,2,3,4,5,6].map(i => (
                <tr key={i} style={{ borderBottom: `1px solid ${VT.lineSoft}` }}>
                  {[160, 80, 220, 110, 110, 18].map((w, j) => (
                    <td key={j} style={{ padding: '12px 16px' }}>
                      <SkeletonBlock width={w} height={12} />
                    </td>
                  ))}
                </tr>
              ))}
              {showItems && d.items.map(s => (
                <tr
                  key={s.id}
                  onClick={() => onRowClick && onRowClick(s.id)}
                  tabIndex={onRowClick ? 0 : undefined}
                  onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter') onRowClick(s.id); } : undefined}
                  style={{ borderBottom: `1px solid ${VT.lineSoft}`, cursor: onRowClick ? 'pointer' : 'default' }}>
                  <td style={{ padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 12.5 }}>
                    {s.subdomain}.samosite.online
                    {s.custom_domain && <Badge kind="success" style={{ marginLeft: 8, padding: '1px 7px', fontSize: 10, borderRadius: 4 }}>{s.custom_domain}</Badge>}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Badge kind="neutral" style={{ padding: '2px 8px', fontSize: 11, borderRadius: 4 }}>{s.source_type}</Badge>
                  </td>
                  <td style={{ padding: '12px 16px', color: VT.inkSoft, maxWidth: 240, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <Mono style={{ fontSize: 12 }}>{s.source_url}</Mono>
                  </td>
                  <td style={{ padding: '12px 16px' }}><StatusPill status={s.status} /></td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12, color: VT.inkSoft }}>{formatTs(s.last_synced_at)}</Mono></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <span aria-hidden="true" style={{ color: VT.inkFaint }}>→</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showEmpty && <EmptyState title="Пока нет опубликованных сайтов" hint="Заявки приходят в раздел «Заявки» — там одобряйте и публикуйте." />}
          {!showEmpty && (
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: VT.inkSoft }}>
              <span>{d.offset + 1}–{Math.min(d.offset + d.limit, d.total)} из {d.total}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <Btn variant="ghost" size="sm" onClick={() => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit)} disabled={d.offset === 0 || loading}>←</Btn>
                <Btn variant="secondary" size="sm" style={{ background: VT.accentSoft, color: VT.accentInk, border: 'none' }}>{currentPage}</Btn>
                <Mono style={{ alignSelf: 'center' }}>/ {totalPages}</Mono>
                <Btn variant="ghost" size="sm" onClick={() => onPageChange && onPageChange(d.offset + d.limit, d.limit)} disabled={d.offset + d.limit >= d.total || loading}>→</Btn>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────
// #15 SiteDetail (ТЗ §3.6)
// ─────────────────────────────────────────────────────────────

const MOCK_SITE_DETAIL = {
  site: {
    id: 's1', user_id: 'u1842', subdomain: 'studia-anna',
    custom_domain: null, source_type: 'telegram',
    source_url: 't.me/studia_anna', status: 'published',
    last_synced_at: '2026-05-19T06:00:00Z',
    published_at: '2026-05-05T10:22:00Z',
    created_at: '2026-05-05T09:30:00Z',
  },
  leads_count: 4,
};

// Which actions are allowed in which status (TZ §3.6 acceptance)
function actionEnabled(action, status) {
  if (status === 'pending_review' && action === 'publish') return true;
  if (status === 'published'      && (action === 'republish' || action === 'pause_sync' || action === 'archive')) return true;
  if (status === 'paused'         && (action === 'resume_sync' || action === 'archive')) return true;
  if (status === 'archived'       && action === 'unarchive') return true;
  return false;
}

const ACTION_LABELS = {
  publish:      'Опубликовать',
  republish:    'Re-publish',
  pause_sync:   'Pause sync',
  resume_sync:  'Resume sync',
  archive:      'В архив',
  unarchive:    'Из архива',
};

function S15_SiteDetail({
  data,
  loading,
  error,
  previewUrl,
  onAction,
  onBack,
  actionLoading,
  _embed,
}) {
  const d = data || MOCK_SITE_DETAIL;
  const site = d.site;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'sites' };

  if (loading) {
    return (
      <Wrap {...wrapProps}>
        <div style={{ padding: '20px 32px 40px' }}>
          <SkeletonBlock width={200} height={14} style={{ marginBottom: 14 }} />
          <SkeletonBlock width={280} height={28} radius={6} style={{ marginBottom: 24 }} />
          <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
            <SkeletonBlock width="100%" height={420} radius={10} />
            <SkeletonBlock width="100%" height={420} radius={10} />
          </div>
        </div>
      </Wrap>
    );
  }

  const renderAction = (action, variant = 'secondary') => {
    const enabled = actionEnabled(action, site.status);
    const isLoading = actionLoading === action;
    const anyLoading = !!actionLoading;
    return (
      <Btn
        key={action}
        size="sm"
        variant={variant}
        disabled={!enabled || anyLoading}
        onClick={() => enabled && onAction && onAction(site.id, action)}
        iconRight={isLoading ? <Spinner size={14} /> : (variant === 'primary' ? <IconArrow size={14} /> : undefined)}>
        {isLoading ? '...' : ACTION_LABELS[action]}
      </Btn>
    );
  };

  // Choose the "primary" action by status — published→republish; pending_review→publish; paused→resume_sync; archived→unarchive
  const primaryAction =
    site.status === 'pending_review' ? 'publish' :
    site.status === 'published'      ? 'republish' :
    site.status === 'paused'         ? 'resume_sync' :
    site.status === 'archived'       ? 'unarchive' : null;
  const secondaryActions = ['publish', 'republish', 'pause_sync', 'resume_sync', 'archive', 'unarchive']
    .filter(a => a !== primaryAction && actionEnabled(a, site.status));

  const safePreviewUrl = previewUrl || (site.subdomain ? `https://${site.subdomain}.samosite.online` : null);

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '20px 32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }}>
          <button
            type="button"
            onClick={() => onBack && onBack()}
            style={{ color: VT.inkFaint, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 13 }}>
            ← Сайты
          </button>
          <span>/</span>
          <Mono style={{ color: VT.ink }}>{site.subdomain}.samosite.online</Mono>
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 6px' }}>
              {site.subdomain.replace(/-/g, ' ')}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: VT.inkSoft, flexWrap: 'wrap' }}>
              {safePreviewUrl && (
                <a href={safePreviewUrl} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: VT.accent, textDecoration: 'underline' }}>
                  <Mono style={{ color: 'inherit' }}>{site.subdomain}.samosite.online</Mono> ↗
                </a>
              )}
              <span>·</span>
              <StatusPill status={site.status} />
              {site.published_at && (<><span>·</span><span>опубликован {formatRel(site.published_at)}</span></>)}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {secondaryActions.map(a => renderAction(a, 'secondary'))}
            {primaryAction && renderAction(primaryAction, 'primary')}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
          {/* Iframe preview */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${VT.line}`, display: 'flex', alignItems: 'center', gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }}>
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
              <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
              <span style={{ marginLeft: 10 }}>{safePreviewUrl}</span>
              <span style={{ marginLeft: 'auto' }}>preview</span>
            </div>
            {safePreviewUrl ? (
              <iframe
                src={safePreviewUrl}
                title={`${site.subdomain} preview`}
                sandbox="allow-same-origin allow-scripts allow-popups-to-escape-sandbox"
                style={{ width: '100%', aspectRatio: '4 / 3', border: 'none', background: VT.bg, display: 'block' }} />
            ) : (
              <div style={{ aspectRatio: '4 / 3', background: VT.bg, padding: 14, position: 'relative' }}>
                {/* Static mini-preview for canvas (no previewUrl) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }}>
                  <span aria-hidden="true" style={{ width: 22, height: 22, borderRadius: 6, background: 'oklch(0.55 0.13 30)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, letterSpacing: '-0.04em' }}>А</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: VT.ink }}>Студия Анны</span>
                  <span style={{ marginLeft: 'auto', padding: '3px 9px', borderRadius: 999, background: VT.accent, color: '#fff', fontSize: 10, fontWeight: 600 }}>Записаться</span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <div style={{ fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.12em', color: VT.accent, fontWeight: 600 }}>МАНИКЮР · ПЕТРОЗАВОДСК</div>
                  <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.025em', marginTop: 4, lineHeight: 1.15 }}>Маникюр — без боли, держится 3 недели</div>
                </div>
                <div style={{ marginTop: 10, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} aria-hidden="true" style={{ aspectRatio: '1/1', borderRadius: 4, background: `repeating-linear-gradient(${30 + i*22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` }} />
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Right rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card style={{ padding: 18 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ЛИДЫ</Mono>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>{d.leads_count}</div>
              <Btn
                variant="ghost"
                size="sm"
                style={{ marginTop: 8, color: VT.accent, padding: 0 }}
                onClick={() => onAction && onAction(site.id, 'view_leads')}>
                Все лиды этого сайта →
              </Btn>
            </Card>

            <Card style={{ padding: 18 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ИСТОЧНИК</Mono>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: VT.inkSoft }}>Тип</span>
                  <Badge kind="neutral" style={{ padding: '2px 9px', fontSize: 11.5, borderRadius: 4 }}>{site.source_type}</Badge>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: VT.inkSoft }}>URL</span>
                  <Mono style={{ fontSize: 12 }}>{site.source_url}</Mono>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 13, color: VT.inkSoft }}>Last sync</span>
                  <Mono style={{ fontSize: 12 }}>{formatTs(site.last_synced_at)}</Mono>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────
// #16 Leads (ТЗ §3.7) — PII-sensitive
// ─────────────────────────────────────────────────────────────

const MOCK_LEADS_LIST = {
  total: 142,
  limit: 10,
  offset: 0,
  items: [
    { id: 'l_1842', site_id: 'studia-anna',     status: 'new',  ip_prefix: '85.140.0.0/16', created_at: '2026-05-19T12:22:00Z' },
    { id: 'l_1841', site_id: 'barber-samara',   status: 'new',  ip_prefix: '178.34.0.0/16', created_at: '2026-05-19T11:08:00Z' },
    { id: 'l_1840', site_id: 'lashes-dom',      status: 'read', ip_prefix: '95.220.0.0/16', created_at: '2026-05-19T10:44:00Z' },
    { id: 'l_1839', site_id: 'fit-studio-msk',  status: 'new',  ip_prefix: '46.180.0.0/16', created_at: '2026-05-19T09:30:00Z' },
    { id: 'l_1838', site_id: 'konditer-katya',  status: 'new',  ip_prefix: '109.252.0.0/16', created_at: '2026-05-19T08:12:00Z' },
  ],
};

function S16_Leads(props) {
  const {
    data,
    loading,
    error,
    // siteFilter, onSiteFilterChange,    // reserved — UI deferred
    onPageChange,

    // Selection
    selectedLeadIds,
    onSelectLead,
    onClearSelection,
    onOpenDecryptModal,

    // Modal
    decryptModalOpen,
    decryptTotp,
    onDecryptTotpChange,
    onDecryptSubmit,
    onDecryptCancel,
    decryptedRows,
    decryptLoading,
    decryptError,

    _embed,
  } = props;

  const d = data || MOCK_LEADS_LIST;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'leads' };

  // Uncontrolled selection fallback for canvas
  const [uSelected, setUSelected] = useState([]);
  const [uModalOpen, setUModalOpen] = useState(false);
  const [uTotp, setUTotp] = useState('');

  const selected = selectedLeadIds ?? uSelected;
  const setSelected = onSelectLead
    ? (id, on) => onSelectLead(id, on)
    : (id, on) => setUSelected(prev => on ? [...prev, id] : prev.filter(x => x !== id));
  const clearSelection = onClearSelection ?? (() => setUSelected([]));
  const modalOpen = decryptModalOpen ?? uModalOpen;
  const openModal = onOpenDecryptModal ?? (() => setUModalOpen(true));
  const totp = decryptTotp ?? uTotp;
  const setTotp = onDecryptTotpChange ?? setUTotp;
  const cancel = onDecryptCancel ?? (() => { setUModalOpen(false); setUTotp(''); });

  const submitDecrypt = () => {
    if (onDecryptSubmit) onDecryptSubmit(selected, totp);
  };

  const showItems = !loading && d.items && d.items.length > 0;
  const showEmpty = !loading && (!d.items || d.items.length === 0) && !error;
  const isSelected = (id) => selected.includes(id);
  const allSelected = showItems && selected.length === d.items.length;

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px', position: 'relative' }}>
        <Eyebrow>ЛИДЫ</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Все сайты</h1>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {selected.length > 0 && (
              <button
                type="button"
                onClick={clearSelection}
                style={{ fontSize: 12, color: VT.inkFaint, background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'inherit' }}>
                сбросить ({selected.length})
              </button>
            )}
            <Btn
              size="sm"
              onClick={openModal}
              disabled={selected.length === 0 || loading}
              iconRight={<IconArrow size={14} />}>
              🔓 Расшифровать ({selected.length})
            </Btn>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
          <Mono style={{ fontSize: 12 }}>Всего: {d.total} · показано: {d.items?.length ?? 0}</Mono>
          <Badge kind="info" style={{ padding: '3px 10px', fontSize: 11.5 }}>🔒 Fernet AES — plaintext только после TOTP-подтверждения</Badge>
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                <th scope="col" style={{ width: 48, padding: '12px 16px', textAlign: 'left' }}>
                  <input
                    type="checkbox"
                    aria-label="Выбрать все"
                    checked={allSelected}
                    onChange={(e) => {
                      if (e.target.checked) {
                        d.items.forEach(it => !isSelected(it.id) && setSelected(it.id, true));
                      } else {
                        clearSelection();
                      }
                    }} />
                </th>
                {['ID', 'Сайт', 'IP prefix', 'Status', 'Когда'].map(h => (
                  <th key={h} scope="col" style={{ textAlign: 'left', padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em', color: VT.inkFaint, fontWeight: 500 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading && [0,1,2,3,4].map(i => (
                <tr key={i} style={{ borderBottom: `1px solid ${VT.lineSoft}` }}>
                  <td style={{ padding: '12px 16px' }}><SkeletonBlock width={14} height={14} radius={3} /></td>
                  {[90, 160, 120, 90, 110].map((w, j) => (
                    <td key={j} style={{ padding: '12px 16px' }}>
                      <SkeletonBlock width={w} height={12} />
                    </td>
                  ))}
                </tr>
              ))}
              {showItems && d.items.map(row => (
                <tr key={row.id} style={{
                  borderBottom: `1px solid ${VT.lineSoft}`,
                  background: isSelected(row.id) ? VT.accentSoft : 'transparent',
                }}>
                  <td style={{ padding: '12px 16px' }}>
                    <input
                      type="checkbox"
                      aria-label={`Выбрать ${row.id}`}
                      checked={isSelected(row.id)}
                      onChange={(e) => setSelected(row.id, e.target.checked)} />
                  </td>
                  <td style={{ padding: '12px 16px' }}><Mono>{row.id}</Mono></td>
                  <td style={{ padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft }}>{row.site_id}</td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12 }}>{row.ip_prefix || '—'}</Mono></td>
                  <td style={{ padding: '12px 16px' }}><StatusPill status={row.status} size="sm" /></td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 11.5, color: VT.inkFaint }}>{formatTs(row.created_at)}</Mono></td>
                </tr>
              ))}
            </tbody>
          </table>
          {showEmpty && <EmptyState title="Пока нет лидов" hint="Когда кто-нибудь заполнит форму на одном из ваших сайтов — он появится здесь." />}
          {!showEmpty && !loading && (
            <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: VT.inkSoft }}>
              <span>{d.offset + 1}–{Math.min(d.offset + d.limit, d.total)} из {d.total}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <Btn variant="ghost" size="sm" onClick={() => onPageChange && onPageChange(Math.max(0, d.offset - d.limit), d.limit)} disabled={d.offset === 0 || loading}>←</Btn>
                <Btn variant="ghost" size="sm" onClick={() => onPageChange && onPageChange(d.offset + d.limit, d.limit)} disabled={d.offset + d.limit >= d.total || loading}>→</Btn>
              </div>
            </div>
          )}
        </Card>

        <Mono style={{ fontSize: 11, color: VT.inkFaint, marginTop: 10, display: 'block' }}>
          Все расшифровки логируются в audit-log (admin_actions) — admin_id, ip, lead_ids, ts.
        </Mono>

        {/* Decrypt modal (ТЗ §3.7) — overlay with TOTP, replaced by read-view after success */}
        {modalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="decrypt-title"
            style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 10,
            }}>
            <Card style={{ width: decryptedRows ? 560 : 380, padding: 24, background: VT.bg }}>
              {!decryptedRows ? (
                <>
                  <h3 id="decrypt-title" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>Подтвердите TOTP</h3>
                  <p style={{ fontSize: 13, color: VT.inkSoft, margin: '0 0 14px' }}>
                    Расшифровываем <b>{selected.length}</b> {selected.length === 1 ? 'лид' : 'лидов'}. Введите 6-значный код из аутентификатора.
                  </p>

                  {decryptError && (
                    <div role="alert" style={{
                      padding: '8px 12px', background: VT.dangerSoft,
                      border: `1px solid oklch(0.85 0.06 28)`, borderRadius: VT.r.md,
                      fontSize: 13, color: 'oklch(0.4 0.15 28)', marginBottom: 14,
                    }}>{decryptError}</div>
                  )}

                  <TextField
                    value={totp}
                    onChange={setTotp}
                    ariaLabel="TOTP код"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="· · · · · ·"
                    autoFocus
                    disabled={!!decryptLoading}
                    mono
                    style={{ fontSize: 20, letterSpacing: '0.4em', textAlign: 'center' }} />

                  <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                    <Btn variant="secondary" size="sm" style={{ flex: 1 }} onClick={cancel} disabled={!!decryptLoading}>Отмена</Btn>
                    <Btn
                      size="sm"
                      style={{ flex: 1 }}
                      onClick={submitDecrypt}
                      disabled={!totp || totp.length < 6 || !!decryptLoading}
                      iconRight={decryptLoading ? <Spinner size={14} /> : undefined}>
                      {decryptLoading ? 'Расшифровываем…' : 'Расшифровать'}
                    </Btn>
                  </div>
                </>
              ) : (
                <>
                  <h3 id="decrypt-title" style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>Расшифровано · {decryptedRows.length}</h3>
                  <Mono style={{ fontSize: 11, color: VT.inkFaint, display: 'block', marginBottom: 12 }}>
                    Залогировано в audit-log. Закройте окно — plaintext исчезнет из DOM.
                  </Mono>
                  <div style={{ maxHeight: 360, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {decryptedRows.map(r => (
                      <Card key={r.id} style={{ padding: 12, border: `1px solid ${VT.line}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <Mono style={{ fontSize: 11.5 }}>{r.id}</Mono>
                          <Mono style={{ fontSize: 11, color: VT.inkFaint }}>{r.site_id}</Mono>
                          <Mono style={{ marginLeft: 'auto', fontSize: 11, color: VT.inkFaint }}>{formatTs(r.created_at)}</Mono>
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 500 }}>{r.name || '—'}</div>
                        <Mono style={{ fontSize: 12, color: VT.inkSoft }}>{r.phone || '—'}</Mono>
                        {r.message && <div style={{ fontSize: 13, color: VT.inkSoft, marginTop: 4, lineHeight: 1.5 }}>«{r.message}»</div>}
                      </Card>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
                    <Btn size="sm" onClick={cancel}>Закрыть</Btn>
                  </div>
                </>
              )}
            </Card>
          </div>
        )}
      </div>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────
// #17 Waitlist (ТЗ §3.8)
// ─────────────────────────────────────────────────────────────

const MOCK_WAITLIST = {
  threshold: 10,
  items: [
    { source_name: 'instagram', votes: 24, first_seen: '2026-04-03', last_seen: '2026-05-19', ready: true },
    { source_name: 'vk',        votes: 18, first_seen: '2026-03-28', last_seen: '2026-05-18', ready: true },
    { source_name: '2gis',      votes: 11, first_seen: '2026-04-12', last_seen: '2026-05-15', ready: true },
    { source_name: 'avito',     votes: 7,  first_seen: '2026-04-05', last_seen: '2026-05-10', ready: false },
    { source_name: 'whatsapp',  votes: 6,  first_seen: '2026-04-19', last_seen: '2026-05-08', ready: false },
    { source_name: 'youtube',   votes: 4,  first_seen: '2026-05-01', last_seen: '2026-05-12', ready: false },
    { source_name: 'max',       votes: 3,  first_seen: '2026-04-22', last_seen: '2026-05-06', ready: false },
    { source_name: 'dzen',      votes: 2,  first_seen: '2026-05-08', last_seen: '2026-05-14', ready: false },
  ],
};

const SOURCE_LABELS = {
  instagram: 'Instagram',
  vk:        'ВКонтакте',
  '2gis':    '2GIS',
  avito:     'Avito',
  whatsapp:  'WhatsApp Catalog',
  youtube:   'YouTube / Shorts',
  max:       'MAX-канал',
  dzen:      'Дзен',
  own_site:  'Свой сайт',
  yandex_maps: 'Яндекс Карты',
  telegram:  'Telegram',
};

function S17_Waitlist({ data, loading, error, onMarkInDevelopment, _embed }) {
  const d = data || MOCK_WAITLIST;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'waitlist' };
  const items = d.items || [];
  const readyItems = items.filter(it => it.ready);
  const restItems = items.filter(it => !it.ready);

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>WAITLIST · ADR-0009</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 6px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Голоса по источникам</h1>
        </div>
        <p style={{ fontSize: 14, color: VT.inkSoft, margin: '0 0 22px', maxWidth: 680 }}>
          Группировка по <Mono style={{fontSize:12}}>source_name</Mono>. Зелёным — ≥{d.threshold} голосов, можно приоритизировать ADR.
        </p>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}

        {!loading && items.length === 0 && (
          <Card style={{ padding: 0 }}>
            <EmptyState title="Пока нет запросов на новые источники" hint="Голоса собираются из feedback-формы и source-detection «unknown»." />
          </Card>
        )}

        {(loading || items.length > 0) && (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
              <thead>
                <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                  {['Источник', 'Голосов', 'Первое обращение', ''].map(h => (
                    <th key={h || 'go'} scope="col" style={{ textAlign: 'left', padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em', color: VT.inkFaint, fontWeight: 500 }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading && [0,1,2,3,4,5].map(i => (
                  <tr key={i} style={{ borderBottom: `1px solid ${VT.lineSoft}` }}>
                    {[200, 100, 140, 120].map((w, j) => (
                      <td key={j} style={{ padding: '14px 16px' }}>
                        <SkeletonBlock width={w} height={14} />
                      </td>
                    ))}
                  </tr>
                ))}
                {!loading && readyItems.map(it => (
                  <WaitlistRow key={it.source_name} item={it} threshold={d.threshold} onMarkInDevelopment={onMarkInDevelopment} />
                ))}
                {!loading && readyItems.length > 0 && restItems.length > 0 && (
                  <tr aria-hidden="true">
                    <td colSpan={4} style={{ padding: '6px 16px', background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                      <Mono style={{ fontSize: 10.5, color: VT.inkFaint, letterSpacing: '0.08em' }}>
                        ─── НИЖЕ ПОРОГА ({d.threshold} ГОЛОСОВ) ───
                      </Mono>
                    </td>
                  </tr>
                )}
                {!loading && restItems.map(it => (
                  <WaitlistRow key={it.source_name} item={it} threshold={d.threshold} onMarkInDevelopment={onMarkInDevelopment} />
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </Wrap>
  );
}

function WaitlistRow({ item, threshold, onMarkInDevelopment }) {
  return (
    <tr style={{
      borderBottom: `1px solid ${VT.lineSoft}`,
      background: item.ready ? 'oklch(0.97 0.03 145 / 0.5)' : 'transparent',
    }}>
      <td style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Mono style={{ fontSize: 11, padding: '2px 7px', background: VT.bgSoft, borderRadius: 4 }}>{item.source_name}</Mono>
          <span style={{ fontWeight: 500 }}>{SOURCE_LABELS[item.source_name] || item.source_name}</span>
        </div>
      </td>
      <td style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 22, fontWeight: 700, color: item.ready ? VT.success : VT.ink }}>{item.votes}</span>
          {item.ready && <Badge kind="success" style={{ padding: '2px 8px', fontSize: 10.5, borderRadius: 4 }}>≥ {threshold} · ПОРА</Badge>}
        </div>
      </td>
      <td style={{ padding: '14px 16px' }}><Mono style={{ fontSize: 12, color: VT.inkSoft }}>{item.first_seen}</Mono></td>
      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
        {item.ready
          ? <Btn size="sm" onClick={() => onMarkInDevelopment && onMarkInDevelopment(item.source_name)}>В разработку</Btn>
          : <span aria-hidden="true" style={{ color: VT.inkFaint }}>—</span>}
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────
// #18 FeedbackInbox (ТЗ §3.9)
// ─────────────────────────────────────────────────────────────

const MOCK_FEEDBACK = {
  total: 142,
  limit: 10,
  offset: 0,
  items: [
    { id: '#F-238', type: 'feature_request', source_name: null,        email_or_contact_masked: 'an***@gmail',  message: '«Хочу YCLIENTS интеграцию, иначе фронт-офис ведут по двум окнам — раздражает клиенток. Готова доплачивать.»', checkboxes: { yclients: true, custom_domain: false }, created_at: '2026-05-19T14:22:00Z' },
    { id: '#F-237', type: 'source_request',  source_name: 'instagram',  email_or_contact_masked: '+7***5678',    message: 'Instagram нужен реально много кто просит',                                                                  checkboxes: null, created_at: '2026-05-19T12:10:00Z' },
    { id: '#F-236', type: 'bug',             source_name: null,        email_or_contact_masked: 'st***@yandex', message: '«После публикации фавикон не подтянулся»',                                                                  checkboxes: null, created_at: '2026-05-19T10:00:00Z' },
    { id: '#F-235', type: 'feature_request', source_name: null,        email_or_contact_masked: '@les***',      message: 'Свой домен и убрать «Сделано на Самосайте»',                                                                checkboxes: { custom_domain: true, no_watermark: true }, created_at: '2026-05-19T06:00:00Z' },
    { id: '#F-234', type: 'general',         source_name: null,        email_or_contact_masked: 'ma***@gmail',  message: '«Спасибо! Уже 3 лида за неделю»',                                                                          checkboxes: null, created_at: '2026-05-18T18:00:00Z' },
  ],
};

const FB_TYPE_FILTERS = [
  ['all',             'Все'],
  ['source_request',  'Источник'],
  ['feature_request', 'Фича'],
  ['bug',             'Баг'],
  ['general',         'Другое'],
];

function FbTypePill({ type }) {
  const m = {
    source_request:  ['источник',   VT.infoSoft,    'oklch(0.38 0.10 240)'],
    feature_request: ['фича',       VT.accentSoft,  VT.accentInk],
    bug:             ['баг',        VT.dangerSoft,  'oklch(0.42 0.15 28)'],
    general:         ['другое',     VT.bgSoft,      VT.inkSoft],
  }[type] || ['—', VT.bgSoft, VT.inkSoft];
  return <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: '0.06em' }}>{m[0].toUpperCase()}</span>;
}

function S18_FeedbackInbox({
  data,
  loading,
  error,
  typeFilter = 'all',
  onTypeFilterChange,
  searchQuery,
  onSearchChange,
  onPageChange,
  onRowClick,
  _embed,
}) {
  const d = data || MOCK_FEEDBACK;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'feedback' };

  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(() => {
    const items = d.items || [];
    if (selectedId) return items.find(it => it.id === selectedId) || items[0] || null;
    return items[0] || null;
  }, [d.items, selectedId]);

  const handleRowClick = (id) => {
    setSelectedId(id);
    if (onRowClick) onRowClick(id);
  };

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>FEEDBACK INBOX</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Обратная связь</h1>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {FB_TYPE_FILTERS.map(([key, label]) => (
              <FilterChip
                key={key}
                label={label}
                active={typeFilter === key}
                onClick={() => onTypeFilterChange && onTypeFilterChange(key)} />
            ))}
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <input
              type="search"
              value={searchQuery ?? ''}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
              placeholder="поиск по тексту"
              aria-label="Поиск по feedback"
              style={{
                padding: '6px 12px', minWidth: 240,
                background: VT.white, border: `1px solid ${VT.line}`,
                borderRadius: 999, fontSize: 13, color: VT.ink,
                outline: 'none', fontFamily: 'inherit',
              }} />
          </div>
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} /></div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
          {/* List */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {loading && [0,1,2,3,4].map(i => (
              <div key={i} style={{ padding: '14px 16px', borderBottom: `1px solid ${VT.lineSoft}` }}>
                <SkeletonBlock width="60%" height={12} style={{ marginBottom: 6 }} />
                <SkeletonBlock width="90%" height={14} />
              </div>
            ))}
            {!loading && (d.items || []).length === 0 && (
              <EmptyState title="Inbox пуст" hint="Когда пользователь оставит feedback — он появится здесь." />
            )}
            {!loading && (d.items || []).map((row, i, arr) => {
              const isSelected = selected && selected.id === row.id;
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => handleRowClick(row.id)}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '14px 16px',
                    borderBottom: i < arr.length - 1 ? `1px solid ${VT.lineSoft}` : 'none',
                    background: isSelected ? VT.accentSoft : 'transparent',
                    cursor: 'pointer', border: 'none', fontFamily: 'inherit',
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <Mono style={{ fontSize: 11.5 }}>{row.id}</Mono>
                    <FbTypePill type={row.type} />
                    <Mono style={{ marginLeft: 'auto', fontSize: 11, color: VT.inkFaint }}>{formatTs(row.created_at)}</Mono>
                  </div>
                  <div style={{ fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.message}</div>
                  <Mono style={{ fontSize: 11, color: VT.inkFaint }}>{row.email_or_contact_masked || '—'}</Mono>
                </button>
              );
            })}
            {!loading && (d.items || []).length > 0 && onPageChange && (
              <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12.5, color: VT.inkSoft, borderTop: `1px solid ${VT.line}` }}>
                <span>{d.offset + 1}–{Math.min(d.offset + d.limit, d.total)} из {d.total}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="ghost" size="sm" onClick={() => onPageChange(Math.max(0, d.offset - d.limit), d.limit)} disabled={d.offset === 0}>←</Btn>
                  <Btn variant="ghost" size="sm" onClick={() => onPageChange(d.offset + d.limit, d.limit)} disabled={d.offset + d.limit >= d.total}>→</Btn>
                </div>
              </div>
            )}
          </Card>

          {/* Detail */}
          <Card style={{ padding: 22 }}>
            {!selected ? (
              <EmptyState title="Выберите запись слева" />
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <Mono>{selected.id}</Mono>
                  <FbTypePill type={selected.type} />
                  <Mono style={{ marginLeft: 'auto', fontSize: 11, color: VT.inkFaint }}>{formatTs(selected.created_at)}</Mono>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                  {selected.type === 'source_request'  ? 'Запрос источника' :
                   selected.type === 'feature_request' ? 'Запрос фичи' :
                   selected.type === 'bug'             ? 'Сообщение об ошибке' : 'Сообщение'}
                </h3>
                {selected.email_or_contact_masked && <Mono style={{ fontSize: 12, color: VT.inkSoft }}>{selected.email_or_contact_masked}</Mono>}
                <p style={{ fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: '14px 0 18px' }}>
                  {selected.message}
                </p>
                {selected.source_name && (
                  <div style={{ marginBottom: 14 }}>
                    <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>SOURCE NAME</Mono>
                    <div style={{ marginTop: 4 }}>
                      <Badge kind="info" style={{ padding: '3px 10px', fontSize: 12 }}>{selected.source_name}</Badge>
                    </div>
                  </div>
                )}
                {selected.checkboxes && Object.keys(selected.checkboxes).length > 0 && (
                  <details open={false}>
                    <summary style={{
                      fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.1em',
                      color: VT.inkSoft, cursor: 'pointer', padding: '6px 0',
                      listStyle: 'none',
                    }}>
                      CHECKBOXES · JSONB ▾
                    </summary>
                    <pre style={{
                      margin: '6px 0 0', padding: 14,
                      background: VT.bgSoft, border: `1px solid ${VT.line}`, borderRadius: VT.r.sm,
                      fontFamily: VT.font.mono, fontSize: 12, lineHeight: 1.55, color: VT.inkSoft,
                      whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                    }}>{JSON.stringify(selected.checkboxes, null, 2)}</pre>
                  </details>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </Wrap>
  );
}

// ─────────────────────────────────────────────────────────────
// #19 Settings (ТЗ §3.10) — read-only snapshot
// ─────────────────────────────────────────────────────────────

const MOCK_SETTINGS = {
  environment: 'prod',
  log_level: 'INFO',
  app_base_url: 'https://app.samosite.online',
  landing_base_url: 'https://samosite.online',
  sites_base_domain: 'samosite.online',
  feature_max_bot: false,
  feature_auto_sync: true,
  captcha_configured: true,
  tg_bot_configured: true,
  yandexgpt_configured: true,
  yookassa_configured: true,
  s3_configured: true,
  fernet_keys_configured: true,
};

function ConfiguredBadge({ on, label }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '3px 9px', borderRadius: 999,
      background: on ? VT.successSoft : VT.warnSoft,
      color: on ? 'oklch(0.34 0.12 145)' : 'oklch(0.40 0.13 70)',
      fontSize: 11.5, fontWeight: 500,
    }}>
      <span aria-hidden="true">{on ? '✓' : '⚠'}</span>
      {label || (on ? 'настроен' : 'не настроен')}
    </span>
  );
}

function KeyValueRow({ label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px dashed ${VT.line}`, gap: 16 }}>
      <span style={{ fontSize: 13, color: VT.inkSoft }}>{label}</span>
      <div>{children}</div>
    </div>
  );
}

function S19_Settings({ data, loading, error, onRefresh, _embed }) {
  const d = data || MOCK_SETTINGS;
  const Wrap = _embed === false ? React.Fragment : AdminChrome;
  const wrapProps = _embed === false ? {} : { active: 'settings' };

  const envBadge =
    d.environment === 'prod' ? { kind: 'danger', label: 'PROD' } :
    d.environment === 'staging' ? { kind: 'warn', label: 'STAGING' } :
    { kind: 'info', label: 'DEV' };

  return (
    <Wrap {...wrapProps}>
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>SETTINGS · SYSTEM</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Система</h1>
          {onRefresh && <Btn variant="secondary" size="sm" onClick={onRefresh}>Обновить</Btn>}
        </div>

        {error && <div style={{ marginBottom: 14 }}><ErrorBlock message={error} onRetry={onRefresh} /></div>}

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <SkeletonBlock width="100%" height={200} radius={10} />
            <SkeletonBlock width="100%" height={200} radius={10} />
          </div>
        )}

        {!loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {/* Среда */}
            <Card style={{ padding: 22 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>СРЕДА</Mono>
              <div style={{ marginTop: 10 }}>
                <KeyValueRow label="Environment">
                  <Badge kind={envBadge.kind} style={{ padding: '2px 10px', fontSize: 11.5 }}>{envBadge.label}</Badge>
                </KeyValueRow>
                <KeyValueRow label="Log level">
                  <Mono style={{ fontSize: 13 }}>{d.log_level}</Mono>
                </KeyValueRow>
              </div>
            </Card>

            {/* Базовые URL */}
            <Card style={{ padding: 22 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>БАЗОВЫЕ URL</Mono>
              <div style={{ marginTop: 10 }}>
                <KeyValueRow label="App"><Mono style={{ fontSize: 12 }}>{d.app_base_url}</Mono></KeyValueRow>
                <KeyValueRow label="Landing"><Mono style={{ fontSize: 12 }}>{d.landing_base_url}</Mono></KeyValueRow>
                <KeyValueRow label="Sites"><Mono style={{ fontSize: 12 }}>*.{d.sites_base_domain}</Mono></KeyValueRow>
              </div>
            </Card>

            {/* Feature flags */}
            <Card style={{ padding: 22 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>FEATURE FLAGS</Mono>
              <div style={{ marginTop: 10 }}>
                <KeyValueRow label="MAX-bot integration">
                  <ConfiguredBadge on={d.feature_max_bot} label={d.feature_max_bot ? 'on' : 'off'} />
                </KeyValueRow>
                <KeyValueRow label="Auto-sync sites">
                  <ConfiguredBadge on={d.feature_auto_sync} label={d.feature_auto_sync ? 'on' : 'off'} />
                </KeyValueRow>
              </div>
            </Card>

            {/* Внешние сервисы */}
            <Card style={{ padding: 22 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ВНЕШНИЕ СЕРВИСЫ</Mono>
              <div style={{ marginTop: 10 }}>
                <KeyValueRow label="Captcha"><ConfiguredBadge on={d.captcha_configured} /></KeyValueRow>
                <KeyValueRow label="Telegram-бот"><ConfiguredBadge on={d.tg_bot_configured} /></KeyValueRow>
                <KeyValueRow label="YandexGPT"><ConfiguredBadge on={d.yandexgpt_configured} /></KeyValueRow>
                <KeyValueRow label="ЮKassa"><ConfiguredBadge on={d.yookassa_configured} /></KeyValueRow>
                <KeyValueRow label="S3 storage"><ConfiguredBadge on={d.s3_configured} /></KeyValueRow>
                <KeyValueRow label="Fernet keys"><ConfiguredBadge on={d.fernet_keys_configured} /></KeyValueRow>
              </div>
            </Card>
          </div>
        )}

        <Mono style={{ fontSize: 11, color: VT.inkFaint, marginTop: 14, display: 'block' }}>
          Read-only snapshot. Значения секретов не отображаются — только статус «настроен/не настроен».
        </Mono>
      </div>
    </Wrap>
  );
}

const SitesList = S14_SitesList;
const SiteDetail = S15_SiteDetail;
const Leads = S16_Leads;
const Waitlist = S17_Waitlist;
const FeedbackInbox = S18_FeedbackInbox;
const Settings = S19_Settings;



export {
  S14_SitesList,
  S15_SiteDetail,
  S16_Leads,
  S17_Waitlist,
  S18_FeedbackInbox,
  S19_Settings,
  SitesList,
  SiteDetail,
  Leads,
  Waitlist,
  FeedbackInbox,
  Settings
};


export type * from './types';
