// Screens #14-#19 · Admin ops
// Concept A · "Тёплая бумага"

if (!window.__vt_admin2) { window.__vt_admin2 = true; (function vtAdmin2(){

const VT = window.VT;
const { Eyebrow, Mono, Card, Btn, Input, Badge, Checkbox, IconLink, IconArrow, Spinner, AdminChrome, StatusPill, StatTile } = window;

// ── #14 Sites list ─────────────────────────────────────────
const SITES_DATA = [
  ['studia-anna.samosite.online', 'an***@gmail', 'published', '2026-05-19 06:00', 4, 'free'],
  ['barber-samara.samosite.online', '+7***5678', 'published', '2026-05-19 06:00', 12, 'pro'],
  ['lashes-dom.samosite.online', '@les***', 'published', '2026-05-18 06:00', 2, 'free'],
  ['psy-marina.samosite.online', 'ma***@gmail', 'sync_paused', '2026-05-12 06:00', 0, 'free'],
  ['fit-studio-msk.samosite.online', '@fit***', 'published', '2026-05-19 06:00', 7, 'pro'],
  ['konditer-katya.samosite.online', 'ka***@yandex', 'published', '2026-05-19 06:00', 3, 'free'],
  ['tutor-eng-spb.samosite.online', '+7***1122', 'archived', '—', 0, 'free'],
];

function SiteStatusPill({ status }) {
  const m = {
    published: ['опубликован', VT.successSoft, 'oklch(0.34 0.12 145)'],
    sync_paused: ['sync paused', VT.warnSoft, 'oklch(0.40 0.13 70)'],
    archived: ['архив', VT.bgSoft, VT.inkSoft],
  }[status];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 9px', borderRadius: 999, background: m[1], color: m[2], fontSize: 11.5, fontWeight: 500 }}><span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />{m[0]}</span>;
}

function S14_SitesList() {
  return (
    <AdminChrome active="sites">
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>САЙТЫ</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Опубликованные сайты</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="sm">CSV</Btn>
            <Btn size="sm">+ Создать вручную</Btn>
          </div>
        </div>

        {/* Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 16 }}>
          <StatTile label="Активных" value="34" sub="опубликованы и синкаются" />
          <StatTile label="Sync paused" value="2" sub="последний sync >7 дней" />
          <StatTile label="Архивных" value="3" />
          <StatTile label="Лидов за 7д" value="42" delta="+18%" deltaSign="+" />
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                {['Subdomain', 'Контакт', 'Тариф', 'Status', 'Last sync', 'Лиды 7д', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em', color: VT.inkFaint, fontWeight: 500 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SITES_DATA.map(([sub, contact, status, sync, leads, plan]) => (
                <tr key={sub} style={{ borderBottom: `1px solid ${VT.lineSoft}`, cursor: 'pointer' }}>
                  <td style={{ padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 12.5 }}>{sub}</td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12 }}>{contact}</Mono></td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      padding: '2px 8px', borderRadius: 4, fontSize: 10.5, fontWeight: 600,
                      background: plan === 'pro' ? VT.accentSoft : VT.bgSoft,
                      color: plan === 'pro' ? VT.accentInk : VT.inkSoft,
                      fontFamily: VT.font.mono, letterSpacing: '0.08em',
                    }}>{plan.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}><SiteStatusPill status={status} /></td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12, color: VT.inkSoft }}>{sync}</Mono></td>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{leads}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right', color: VT.inkFaint }}>→</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AdminChrome>
  );
}

// ── #15 Site detail ────────────────────────────────────────
function S15_SiteDetail() {
  return (
    <AdminChrome active="sites">
      <div style={{ padding: '20px 32px 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: VT.inkFaint, marginBottom: 8 }}>
          <a style={{ color: VT.inkFaint }}>Сайты</a>
          <span>/</span>
          <Mono style={{ color: VT.ink }}>studia-anna.samosite.online</Mono>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24, marginBottom: 18 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 6px' }}>Студия Анны</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: VT.inkSoft }}>
              <a style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: VT.accent, textDecoration: 'underline' }}><Mono>studia-anna.samosite.online</Mono> ↗</a>
              <span>·</span>
              <SiteStatusPill status="published" />
              <span>·</span>
              <span>опубликован 14 дней назад</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="sm">Архив</Btn>
            <Btn variant="secondary" size="sm">Pause sync</Btn>
            <Btn size="sm" iconRight={<IconArrow size={14} />}>Re-publish</Btn>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
          {/* Iframe preview */}
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '10px 14px', borderBottom: `1px solid ${VT.line}`, display: 'flex', alignItems: 'center', gap: 6, background: VT.bgSoft, fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.line }} />
              <span style={{ marginLeft: 10 }}>studia-anna.samosite.online</span>
              <span style={{ marginLeft: 'auto' }}>iframe preview</span>
            </div>
            <div style={{ aspectRatio: '4 / 3', background: VT.bg, padding: 14, position: 'relative' }}>
              {/* mini-header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 10, borderBottom: `1px solid ${VT.line}` }}>
                <span style={{ width: 22, height: 22, borderRadius: 6, background: 'oklch(0.55 0.13 30)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, letterSpacing: '-0.04em' }}>А</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: VT.ink }}>Студия Анны</span>
                <span style={{ marginLeft: 'auto', padding: '3px 9px', borderRadius: 999, background: VT.accent, color: '#fff', fontSize: 10, fontWeight: 600 }}>Записаться</span>
              </div>
              {/* hero */}
              <div style={{ marginTop: 10 }}>
                <div style={{ fontFamily: VT.font.mono, fontSize: 9, letterSpacing: '0.12em', color: VT.accent, fontWeight: 600 }}>МАНИКЮР · ПЕТРОЗАВОДСК</div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.025em', marginTop: 4, lineHeight: 1.15 }}>Маникюр — без боли, держится 3 недели</div>
                <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 9px', background: VT.bgSoft, border: `1px solid ${VT.line}`, borderRadius: 999, fontSize: 10.5 }}>
                  <span style={{ color: '#f4a93b' }}>★★★★★</span>
                  <b style={{ color: VT.ink }}>4.9</b>
                  <span style={{ color: VT.inkFaint }}>· 38 отзывов</span>
                </div>
              </div>
              {/* services preview */}
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[['Маникюр аппаратный', '1 500 ₽'], ['Маникюр + гель-лак', '2 200 ₽'], ['Педикюр', '2 800 ₽']].map(([n, p]) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', padding: '5px 8px', background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 6, fontSize: 11 }}>
                    <span style={{ flex: 1, color: VT.ink }}>{n}</span>
                    <Mono style={{ fontSize: 11, color: VT.ink, fontWeight: 600 }}>{p}</Mono>
                  </div>
                ))}
              </div>
              {/* gallery thumbs */}
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 3 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} style={{ aspectRatio: '1/1', borderRadius: 4, background: `repeating-linear-gradient(${30 + i*22}deg, ${VT.accentSoft} 0 5px, ${VT.bgSoft} 5px 10px)` }} />
                ))}
              </div>
            </div>
          </Card>

          {/* Right rail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <Card style={{ padding: 18 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ЛИДЫ · 7 ДНЕЙ</Mono>
              <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>4 <span style={{ fontSize: 12, fontWeight: 500, color: VT.success }}>+1 сегодня</span></div>
              <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['Анна П***', '+7***1234', '2 ч'],
                  ['Сергей М***', '@ser***', '6 ч'],
                  ['Мария К***', '+7***5678', '1 д'],
                  ['Алексей Р***', 'al***@gmail', '3 д'],
                ].map(([n, c, ago]) => (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, padding: '6px 0', borderBottom: `1px dashed ${VT.line}` }}>
                    <span style={{ fontWeight: 500 }}>{n}</span>
                    <Mono style={{ fontSize: 12 }}>{c}</Mono>
                    <Mono style={{ marginLeft: 'auto', fontSize: 11 }}>{ago}</Mono>
                  </div>
                ))}
              </div>
              <Btn variant="ghost" size="sm" style={{ marginTop: 8, color: VT.accent }}>Все лиды →</Btn>
            </Card>

            <Card style={{ padding: 18 }}>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>SYNC HISTORY</Mono>
              <div style={{ marginTop: 10, fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft, lineHeight: 1.7 }}>
                <div><span style={{ color: VT.success }}>✓</span> 2026-05-19 06:00 · 2 новых фото</div>
                <div><span style={{ color: VT.success }}>✓</span> 2026-05-12 06:00 · no diff</div>
                <div><span style={{ color: VT.success }}>✓</span> 2026-05-05 06:00 · 5 новых постов</div>
                <div><span style={{ color: VT.warn }}>⏸</span> 2026-04-28 06:00 · TG bot kicked, retry 1/3</div>
                <div><span style={{ color: VT.success }}>✓</span> 2026-04-21 06:00 · 1 новое фото</div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminChrome>
  );
}

// ── #16 Leads ──────────────────────────────────────────────
const LEADS_DATA = [
  ['studia-anna.samosite.online', 'Анна П***', '+7***1234', '«Хочу записаться на маникюр в субботу днём, если есть окно»', '2026-05-19 12:22'],
  ['barber-samara.samosite.online', 'Сергей М***', '@ser***', '«Можно ли постричься завтра в обед?»', '2026-05-19 11:08'],
  ['lashes-dom.samosite.online', 'Мария К***', '+7***5678', '«Сколько стоит наращивание ресниц?»', '2026-05-19 10:44'],
  ['fit-studio-msk.samosite.online', 'Алексей Р***', 'al***@gmail', '—', '2026-05-19 09:30'],
  ['konditer-katya.samosite.online', 'Ольга Т***', '+7***9012', '«Торт на свадьбу 12 июля, на 80 человек, медовик»', '2026-05-19 08:12'],
];

function S16_Leads({ decryptModal = false }) {
  return (
    <AdminChrome active="leads">
      <div style={{ padding: '24px 32px 40px', position: 'relative' }}>
        <Eyebrow>ЛИДЫ</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Все сайты</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <Btn variant="secondary" size="sm">CSV (encrypted)</Btn>
            <Btn size="sm">🔓 Расшифровать bulk export</Btn>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, marginBottom: 14, alignItems: 'center' }}>
          <Mono style={{ fontSize: 12 }}>Всего: 142 · 7 дней: 42 · сегодня: 6</Mono>
          <Badge kind="info" style={{ padding: '3px 10px', fontSize: 11.5 }}>🔒 Fernet AES-128 · ключ в FERNET_KEY env</Badge>
        </div>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                {['Сайт', 'Имя', 'Контакт', 'Сообщение', 'Когда', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em', color: VT.inkFaint, fontWeight: 500 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEADS_DATA.map(([site, name, contact, msg, ts]) => (
                <tr key={site + ts} style={{ borderBottom: `1px solid ${VT.lineSoft}` }}>
                  <td style={{ padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft, maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{site}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 500 }}>{name}</td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 12 }}>{contact}</Mono></td>
                  <td style={{ padding: '12px 16px', color: VT.inkSoft, maxWidth: 360, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{msg}</td>
                  <td style={{ padding: '12px 16px' }}><Mono style={{ fontSize: 11.5, color: VT.inkFaint }}>{ts}</Mono></td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <Btn variant="ghost" size="sm" style={{ fontSize: 12 }}>🔓 раскрыть</Btn>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Audit note */}
        <Mono style={{ fontSize: 11, color: VT.inkFaint, marginTop: 10, display: 'block' }}>
          Каждый decrypt пишется в audit log с admin_id, ip, lead_id, ts. FR-053: маски в логах.
        </Mono>

        {/* Bulk export TOTP modal */}
        {decryptModal && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.32)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
          }}>
            <Card style={{ width: 360, padding: 24, background: VT.bg }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 8px' }}>Подтвердите TOTP</h3>
              <p style={{ fontSize: 13, color: VT.inkSoft, margin: '0 0 14px' }}>Bulk export расшифровывает 142 лида. Введите код.</p>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} style={{ flex: 1, aspectRatio: '1 / 1.2', background: VT.white, border: `1px solid ${VT.line}`, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>•</div>
                ))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <Btn variant="secondary" size="sm" style={{ flex: 1 }}>Отмена</Btn>
                <Btn size="sm" style={{ flex: 1 }}>Расшифровать</Btn>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminChrome>
  );
}

// ── #17 Waitlist aggregation ───────────────────────────────
const WAITLIST_DATA = [
  ['instagram', 'Instagram (прямой парсинг)', 24, '2026-04-03', 'high'],
  ['vk', 'ВКонтакте', 18, '2026-03-28', 'high'],
  ['2gis', '2GIS', 11, '2026-04-12', 'high'],
  ['avito', 'Avito', 7, '2026-04-05', 'low'],
  ['whatsapp', 'WhatsApp Catalog', 6, '2026-04-19', 'low'],
  ['youtube', 'YouTube / Shorts', 4, '2026-05-01', 'low'],
  ['max', 'MAX-канал', 3, '2026-04-22', 'low'],
  ['dzen', 'Дзен', 2, '2026-05-08', 'low'],
  ['own_site', 'Свой сайт', 2, '2026-05-11', 'low'],
];

function S17_Waitlist() {
  return (
    <AdminChrome active="waitlist">
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>WAITLIST · ADR-0009</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 6px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Голоса по источникам</h1>
        </div>
        <p style={{ fontSize: 14, color: VT.inkSoft, margin: '0 0 22px', maxWidth: 680 }}>
          Группировка по <Mono style={{fontSize:12}}>source_name</Mono> · уникальные контакты · первое обращение. Зелёным — &ge;10 голосов, можно приоритизировать ADR.
        </p>

        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
            <thead>
              <tr style={{ background: VT.bgSoft, borderBottom: `1px solid ${VT.line}` }}>
                {['Источник', 'Голосов', 'Первое обращение', ''].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.08em', color: VT.inkFaint, fontWeight: 500 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WAITLIST_DATA.map(([key, name, votes, first, prio]) => (
                <tr key={key} style={{
                  borderBottom: `1px solid ${VT.lineSoft}`,
                  background: prio === 'high' ? 'oklch(0.97 0.03 145 / 0.5)' : 'transparent',
                }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Mono style={{ fontSize: 11, padding: '2px 7px', background: VT.bgSoft, borderRadius: 4 }}>{key}</Mono>
                      <span style={{ fontWeight: 500 }}>{name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22, fontWeight: 700, color: prio === 'high' ? VT.success : VT.ink }}>{votes}</span>
                      {prio === 'high' && <Badge kind="success" style={{ padding: '2px 8px', fontSize: 10.5, borderRadius: 4 }}>≥ 10 · ПОРА</Badge>}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}><Mono style={{ fontSize: 12, color: VT.inkSoft }}>{first}</Mono></td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    {prio === 'high' ? (
                      <Btn size="sm">Уведомить waitlist</Btn>
                    ) : (
                      <Btn variant="ghost" size="sm" style={{ color: VT.inkFaint }}>—</Btn>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </AdminChrome>
  );
}

// ── #18 Feedback inbox ─────────────────────────────────────
const FEEDBACK_DATA = [
  ['#F-238', 'feature_request', 'an***@gmail', '«Хочу YCLIENTS интеграцию, иначе фронт-офис ведут по двум окнам»', ['yclients'], '12 мин'],
  ['#F-237', 'source_request', '+7***5678', 'Instagram нужен реально много кто просит', ['instagram'], '2 ч'],
  ['#F-236', 'bug', 'st***@yandex', '«После публикации фавикон не подтянулся»', [], '4 ч'],
  ['#F-235', 'feature_request', '@les***', 'Свой домен и убрать «Сделано на Самосайте»', ['custom_domain', 'no_watermark'], '8 ч'],
  ['#F-234', 'general', 'ma***@gmail', '«Спасибо! Уже 3 лида за неделю»', [], '1 д'],
];

function FbTypePill({ type }) {
  const m = {
    source_request:  ['источник',   VT.infoSoft,    'oklch(0.38 0.10 240)'],
    feature_request: ['фича',       VT.accentSoft,  VT.accentInk],
    bug:             ['баг',        VT.dangerSoft,  'oklch(0.42 0.15 28)'],
    general:         ['другое',     VT.bgSoft,      VT.inkSoft],
  }[type];
  return <span style={{ display: 'inline-flex', padding: '2px 8px', borderRadius: 4, background: m[1], color: m[2], fontSize: 10.5, fontWeight: 600, fontFamily: VT.font.mono, letterSpacing: '0.06em' }}>{m[0].toUpperCase()}</span>;
}

function S18_FeedbackInbox() {
  return (
    <AdminChrome active="feedback">
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>FEEDBACK INBOX</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Обратная связь</h1>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
          {[
            ['Все', 142, true],
            ['Источник', 56, false],
            ['Фича', 48, false],
            ['Баг', 12, false],
            ['Другое', 26, false],
          ].map(([label, count, active]) => (
            <button key={label} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 999,
              background: active ? VT.accentSoft : VT.white,
              color: active ? VT.accentInk : VT.ink,
              border: `1px solid ${active ? 'transparent' : VT.line}`,
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}>{label} <Mono style={{ fontSize: 11, color: 'inherit', opacity: 0.7 }}>{count}</Mono></button>
          ))}
        </div>

        {/* List + detail split */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            {FEEDBACK_DATA.map(([id, type, contact, msg, checks, ago], i) => (
              <div key={id} style={{
                padding: '14px 16px',
                borderBottom: i < FEEDBACK_DATA.length - 1 ? `1px solid ${VT.lineSoft}` : 'none',
                background: i === 0 ? VT.accentSoft : 'transparent',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <Mono style={{ fontSize: 11.5 }}>{id}</Mono>
                  <FbTypePill type={type} />
                  <Mono style={{ marginLeft: 'auto', fontSize: 11, color: VT.inkFaint }}>{ago}</Mono>
                </div>
                <div style={{ fontSize: 13, color: VT.inkSoft, lineHeight: 1.45, marginBottom: 4 }}>{msg}</div>
                <Mono style={{ fontSize: 11, color: VT.inkFaint }}>{contact}</Mono>
              </div>
            ))}
          </Card>

          {/* Detail of #F-238 */}
          <Card style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <Mono>#F-238</Mono>
              <FbTypePill type="feature_request" />
              <Mono style={{ marginLeft: 'auto', fontSize: 11, color: VT.inkFaint }}>2026-05-19 14:22</Mono>
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 6px' }}>Запрос фичи</h3>
            <Mono style={{ fontSize: 12, color: VT.inkSoft }}>an***@gmail</Mono>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: VT.ink, margin: '14px 0 18px' }}>
              «Хочу YCLIENTS интеграцию, иначе фронт-офис ведут по двум окнам — раздражает клиенток. Готова доплачивать.»
            </p>
            <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>CHECKBOXES · JSONB</Mono>
            <pre style={{
              margin: '6px 0 0', padding: 14,
              background: VT.bgSoft, border: `1px solid ${VT.line}`, borderRadius: VT.r.sm,
              fontFamily: VT.font.mono, fontSize: 12, lineHeight: 1.55, color: VT.inkSoft,
            }}>{`{
  "features": ["yclients"],
  "sources": [],
  "other_feature": null,
  "other_source": null
}`}</pre>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <Btn variant="secondary" size="sm">Ответить</Btn>
              <Btn variant="secondary" size="sm">→ в backlog</Btn>
              <Btn variant="ghost" size="sm" style={{ color: VT.inkFaint, marginLeft: 'auto' }}>Архив</Btn>
            </div>
          </Card>
        </div>
      </div>
    </AdminChrome>
  );
}

// ── #19 Settings / system ───────────────────────────────────
function HealthRow({ name, status, latency, note }) {
  const ok = status === 'ok';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${VT.lineSoft}` }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: ok ? VT.success : VT.danger, boxShadow: `0 0 0 4px ${ok ? VT.successSoft : VT.dangerSoft}` }} />
      <span style={{ fontSize: 14, fontWeight: 500, minWidth: 120 }}>{name}</span>
      <Mono style={{ fontSize: 12, color: VT.inkSoft }}>{status.toUpperCase()}</Mono>
      <Mono style={{ marginLeft: 'auto', fontSize: 12, color: VT.inkFaint }}>{latency}</Mono>
      <Mono style={{ fontSize: 11.5, color: VT.inkFaint, minWidth: 220, textAlign: 'right' }}>{note}</Mono>
    </div>
  );
}

function S19_Settings() {
  return (
    <AdminChrome active="settings">
      <div style={{ padding: '24px 32px 40px' }}>
        <Eyebrow>SETTINGS · SYSTEM</Eyebrow>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '10px 0 18px' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', margin: 0 }}>Система</h1>
          <Mono style={{ fontSize: 12, color: VT.inkFaint }}>uptime · 14 дней 3 часа</Mono>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 14 }}>
          <Card style={{ padding: 22 }}>
            <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>HEALTH CHECKS</Mono>
            <div style={{ marginTop: 10 }}>
              <HealthRow name="PostgreSQL" status="ok" latency="3 ms" note="14/20 connections" />
              <HealthRow name="Redis" status="ok" latency="0.4 ms" note="cache hit rate 92%" />
              <HealthRow name="S3 (Selectel)" status="ok" latency="42 ms" note="bucket vitrina-sites" />
              <HealthRow name="YandexGPT 5 Pro" status="ok" latency="1.2 s" note="квота: 1240/5000 запросов" />
              <HealthRow name="Yandex SmartCaptcha" status="ok" latency="180 ms" note="—" />
              <HealthRow name="TG Bot API" status="ok" latency="220 ms" note="—" />
              <HealthRow name="Caddy / wildcard SSL" status="ok" latency="—" note="cert exp в 47 днях" />
            </div>
          </Card>

          <Card style={{ padding: 22 }}>
            <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>SECRETS · ROTATION</Mono>
            <div style={{ marginTop: 10, fontSize: 13 }}>
              {[
                ['FERNET_KEY', '142 дня назад', 'warn'],
                ['DATABASE_URL', '8 дней назад', 'ok'],
                ['TG_BOT_TOKEN', '23 дня назад', 'ok'],
                ['YANDEX_GPT_API_KEY', '8 дней назад', 'ok'],
                ['SMARTCAPTCHA_KEY', '54 дня назад', 'ok'],
                ['SMTP_PASSWORD', '210 дней назад', 'warn'],
              ].map(([name, ago, lvl]) => (
                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: `1px dashed ${VT.line}` }}>
                  <Mono style={{ flex: 1, fontSize: 12 }}>{name}</Mono>
                  <Mono style={{ fontSize: 11.5, color: VT.inkSoft }}>{ago}</Mono>
                  {lvl === 'warn' && <Badge kind="warn" style={{ padding: '1px 7px', fontSize: 10, borderRadius: 4 }}>ROTATE</Badge>}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card style={{ padding: 22, marginTop: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Mono style={{ fontSize: 10.5, letterSpacing: '0.1em' }}>ADMIN ACTIONS · ПОСЛЕДНИЕ 20</Mono>
            <Btn variant="ghost" size="sm" style={{ marginLeft: 'auto' }}>экспорт JSONL</Btn>
          </div>
          <div style={{ marginTop: 10, fontFamily: VT.font.mono, fontSize: 12, color: VT.inkSoft, lineHeight: 1.7 }}>
            {[
              ['14:22:18', 'founder', 'lead.decrypt', 'lead_id=8124 · site=studia-anna'],
              ['14:12:04', 'founder', 'site.publish', '#A-1837 → barber-samara'],
              ['13:48:11', 'founder', 'application.reject', '#A-1836 · reason=spam'],
              ['12:30:55', 'founder', 'lead.bulk_decrypt', 'count=12 · totp_verified=true'],
              ['11:02:00', 'system', 'sync.run', '34 sites · 5 diff · 0 errors'],
              ['09:15:33', 'founder', 'application.publish', '#A-1834 → psy-marina'],
              ['08:48:12', 'founder', 'feedback.reply', '#F-235'],
              ['07:00:00', 'system', 'cron.daily_summary', 'sent TG'],
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 10 }}>
                <span style={{ color: VT.inkFaint }}>{r[0]}</span>
                <span style={{ color: r[1] === 'system' ? VT.info : VT.accent, width: 64 }}>{r[1]}</span>
                <span style={{ color: VT.ink, width: 160 }}>{r[2]}</span>
                <span style={{ flex: 1 }}>{r[3]}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminChrome>
  );
}

Object.assign(window, { S14_SitesList, S15_SiteDetail, S16_Leads, S17_Waitlist, S18_FeedbackInbox, S19_Settings });

})(); } // end __vt_admin2 guard
