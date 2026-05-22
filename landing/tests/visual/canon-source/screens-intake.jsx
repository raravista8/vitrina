// Screens #3 #4 #5 #6 · Application intake flow (Самосайт)
//
// Restructured per feedback (2026-05-21):
//   • Step 1: Link + source detection (success badge lives HERE, not on step 2)
//   • Step 2: Contact channel + value (radio picker for type → not auto-detected;
//             user explicitly chooses what's primary)
//   • Step 3: Channel-specific finish (TG: bot-invite OR fall back to email;
//             email: nothing extra; phone: optional SMS verification)
//   • Step nav with «Назад» button so users can always go back
//   • Wrong-source detection: tap the green badge to override to another platform
//
// Concept: «Тёплая бумага» · brand «Самосайт».

if (!window.__vt_intake) { window.__vt_intake = true; (function vtIntake(){

const VT = window.VT;
const { BRAND, Eyebrow, Mono, Card, Btn, Input, Badge, Checkbox, IconLink, IconArrow, Spinner } = window;

// ─────────────────────────────────────────────────────────────
// Shell + step header

function ModalShell({ children, width = 520 }) {
  return (
    <div style={{
      background: 'rgba(0,0,0,0.32)', minHeight: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: VT.font.sans,
    }}>
      <div style={{
        width, maxWidth: '100%', background: VT.bg,
        borderRadius: VT.r.xl, boxShadow: VT.shadow.pop,
        padding: 28, position: 'relative',
      }}>
        <button aria-label="Закрыть" style={{
          position: 'absolute', top: 14, right: 14,
          width: 32, height: 32, borderRadius: 999,
          background: VT.bgSoft, border: `1px solid ${VT.line}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: VT.inkSoft, fontSize: 18,
        }}>×</button>
        {children}
      </div>
    </div>
  );
}

function StepHeader({ step, total, title, sub, onBack = true }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        {step > 1 && onBack && (
          <button style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px 4px 4px', borderRadius: 999,
            background: VT.bgSoft, border: `1px solid ${VT.line}`,
            cursor: 'pointer', fontFamily: VT.font.sans, fontSize: 12, fontWeight: 500, color: VT.inkSoft,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6"/>
            </svg>
            Назад
          </button>
        )}
        <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ШАГ {step}/{total}</Mono>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{
              width: 28, height: 4, borderRadius: 2,
              background: i < step ? VT.accent : VT.line,
            }} />
          ))}
        </div>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2 }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }}>{sub}</p>}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Source badge — lives ON STEP 1 (not step 2 anymore).
// Click-to-correct: if auto-detect picked wrong (e.g. Instagram detected as TG),
// user can tap «не то?» and pick the right platform from a list.

const SOURCE_LIB = {
  yandex_maps: { label: 'Яндекс.Карты',     icon: '🗺️', tier: 'ok' },
  telegram:    { label: 'Telegram-канал',   icon: '✈️', tier: 'ok' },
  twogis:      { label: '2ГИС',             icon: '📍', tier: 'ok' },
  avito:       { label: 'Avito-профиль',    icon: '🅰️', tier: 'ok' },
  website:     { label: 'Свой сайт',        icon: '🌐', tier: 'ok' },
  instagram:   { label: 'Instagram',        icon: '📷', tier: 'ok-instagram' },
  vk:          { label: 'VK-страница',      icon: 'V',  tier: 'soon' },
  whatsapp:    { label: 'WhatsApp-каталог', icon: '🟢', tier: 'soon' },
  youtube:     { label: 'YouTube-канал',    icon: '▶️', tier: 'soon' },
  unknown:     { label: 'не распознали',    icon: '?',  tier: 'unknown' },
};

function SourceBadge({ source, counts, url, onCorrect }) {
  const meta = SOURCE_LIB[source] || SOURCE_LIB.unknown;
  const tier = meta.tier;
  if (tier === 'ok-instagram') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{
          padding: '12px 14px',
          background: VT.successSoft, borderRadius: VT.r.md,
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13.5, color: 'oklch(0.32 0.12 145)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4 4 10-10"/>
          </svg>
          <span>
            Распознали: <b>Instagram</b>
            <span style={{ color: 'oklch(0.42 0.11 145)' }}> · нужен скриншот профиля и фото работ</span>
          </span>
        </div>
        <div style={{
          padding: '12px 14px',
          background: VT.bgSoft, border: `1px dashed ${VT.line}`, borderRadius: VT.r.md,
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13, color: VT.inkSoft,
        }}>
          <span style={{ fontSize: 18 }}>📷</span>
          <span style={{ flex: 1 }}>Из Instagram мы заберём только то, что вы загрузите сами — скриншот шапки профиля и 5–10 фото работ</span>
          <Btn size="sm" variant="secondary">Загрузить →</Btn>
        </div>
      </div>
    );
  }
  if (tier === 'ok') {
    return (
      <div style={{
        padding: '12px 14px',
        background: VT.successSoft, borderRadius: VT.r.md,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 13.5, color: 'oklch(0.32 0.12 145)',
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4 10-10"/>
        </svg>
        <span>
          Распознали: <b>{meta.label}</b>
          {counts ? <span style={{ color: 'oklch(0.42 0.11 145)' }}> · {counts}</span> : null}
        </span>
        <button style={{
          marginLeft: 'auto', background: 'transparent', border: 'none',
          color: 'oklch(0.38 0.12 145)', fontSize: 12, cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: 3,
          fontFamily: VT.font.sans,
        }}>не то?</button>
      </div>
    );
  }
  if (tier === 'soon') {
    return (
      <div style={{
        padding: '12px 14px',
        background: VT.infoSoft, borderRadius: VT.r.md,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 13.5, color: 'oklch(0.36 0.10 240)',
      }}>
        <span style={{ fontSize: 16 }}>{meta.icon}</span>
        <span><b>{meta.label}</b> — скоро поддержим. Оставьте email — напишем, как добавим.</span>
      </div>
    );
  }
  // unknown
  return (
    <div style={{
      padding: '12px 14px',
      background: VT.warnSoft, borderRadius: VT.r.md,
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 13.5, color: 'oklch(0.42 0.13 70)',
    }}>
      <span style={{ fontSize: 16 }}>⚠️</span>
      <span>Не распознали — проверьте ссылку. Или <a style={{ color: 'oklch(0.42 0.13 70)', textDecoration: 'underline' }}>загрузите фото визитки →</a></span>
    </div>
  );
}

function LinkInput({ value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '14px 16px',
      background: VT.white, border: `1.5px solid ${VT.accent}`,
      borderRadius: VT.r.md,
    }}>
      <IconLink />
      <span style={{ flex: 1, fontFamily: VT.font.mono, fontSize: 14, color: VT.ink }}>
        {value}
      </span>
      <span style={{ color: VT.success, display: 'inline-flex' }}>
        <Spinner size={14} />
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 1 — Link

function S3_Step1_Link({ url = 'https://t.me/studia_anna', source = 'telegram', counts = 'нашли 47 постов и 12 фото' }) {
  return (
    <ModalShell width={520}>
      <StepHeader step={1} total={3} title="Дайте ссылку на ваше дело"
        sub="Что у вас уже есть онлайн — Яндекс.Карты, Telegram-канал, 2ГИС или ваш сайт" />

      <label style={{ display: 'block', fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: '20px 0 6px' }}>
        Ссылка на источник
      </label>
      <LinkInput value={url} />

      <div style={{ marginTop: 10 }}>
        <SourceBadge source={source} counts={counts} url={url} />
      </div>

      {/* Supported sources list — inline so users see exactly where it works */}
      <div style={{ marginTop: 16, fontSize: 12.5, color: VT.inkFaint }}>
        <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ПОДДЕРЖИВАЕМ:</Mono>{' '}
        Яндекс.Карты · Telegram-канал · Instagram · 2ГИС · Avito · ваш старый сайт · фото буклета или меню
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
        <Btn style={{ flex: 1 }} iconRight={<IconArrow />}>Продолжить</Btn>
      </div>

      <div style={{ marginTop: 14, fontSize: 13, color: VT.inkSoft }}>
        Нет ничего онлайн? <a style={{ color: VT.accent, textDecoration: 'underline' }}>Загрузите фото визитки, буклета или работ →</a>
      </div>
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 — Contact channel + value
// Explicit channel picker. No green "source detected" badge here — it's on step 1.

function ChannelOption({ value, label, hint, icon, selected }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px',
      background: selected ? VT.accentSoft : VT.white,
      border: `1.5px solid ${selected ? VT.accent : VT.line}`,
      borderRadius: VT.r.md, cursor: 'pointer',
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: '50%',
        border: `1.5px solid ${selected ? VT.accent : VT.line}`,
        background: VT.white,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flex: '0 0 auto',
      }}>
        {selected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: VT.accent }} />}
      </span>
      <span style={{ fontSize: 16 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: VT.ink }}>{label}</div>
        <div style={{ fontSize: 12, color: VT.inkFaint, marginTop: 1 }}>{hint}</div>
      </div>
    </label>
  );
}

function ContactValueInput({ channel, value }) {
  const ph = {
    telegram: '@your_handle',
    phone:    '+7 921 234-56-78',
    email:    'you@example.ru',
    max:      '@your_handle',
  }[channel] || '';
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '14px 16px',
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
    }}>
      <span style={{
        fontFamily: VT.font.mono, fontSize: 15,
        color: value ? VT.ink : VT.inkFaint, flex: 1,
      }}>
        {value || ph}
      </span>
      {value && (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={VT.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4 10-10"/>
        </svg>
      )}
    </div>
  );
}

function S3_Step2_Contact({ channel = 'telegram', value = '@studia_anna' }) {
  return (
    <ModalShell width={520}>
      <StepHeader step={2} total={2} title="Куда вам писать?"
        sub="Один основной контакт — туда придёт ссылка на готовый сайт и заявки клиентов." />

      <label style={{ display: 'block', fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: '18px 0 8px' }}>
        Основной канал
      </label>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <ChannelOption value="telegram" label="Telegram"
          hint="напишет наш бот · мгновенно"
          icon="✈️" selected={channel === 'telegram'} />
        <ChannelOption value="phone"    label="Телефон"
          hint="SMS-уведомления"
          icon="📱" selected={channel === 'phone'} />
        <ChannelOption value="email"    label="Email"
          hint="на ящик"
          icon="📧" selected={channel === 'email'} />
        <ChannelOption value="max"      label="MAX"
          hint="мессенджер от VK"
          icon="💬" selected={channel === 'max'} />
      </div>

      <label style={{ display: 'block', fontSize: 13, color: VT.inkSoft, fontWeight: 500, margin: '18px 0 6px' }}>
        {channel === 'phone' ? 'Номер телефона'
          : channel === 'email' ? 'Email'
          : channel === 'max' ? 'Логин в MAX'
          : 'Ваш Telegram (логин или номер)'}
      </label>
      <ContactValueInput channel={channel} value={value} />

      <div style={{ marginTop: 16 }}>
        <Checkbox checked={true} label={<>Согласен на обработку персональных данных согласно</>} link="политике конфиденциальности" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
        <Btn style={{ flex: 1 }} iconRight={<IconArrow />}>Продолжить</Btn>
      </div>

      <CaptchaNotice />
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 3 — Channel-specific finish.
// For Telegram: show bot-invite instructions WITH explicit "skip" fallback to email.
// For phone/email/max: simple "all done, we'll write you" summary.

function CaptchaNotice() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 11.5, color: VT.inkMuted, marginTop: 10,
      fontFamily: VT.font.mono, letterSpacing: '0.02em',
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"/>
      </svg>
      Защищено Yandex SmartCaptcha · невидимо
    </div>
  );
}

function S3_Step3_TgBot() {
  return (
    <ModalShell width={560}>
      <StepHeader step={3} total={3} title="Откройте бота на 1 минуту"
        sub={<>Чтобы прислать вам ссылку на сайт и заявки клиентов — найдите в Telegram <b>{BRAND.contactBot}</b> и нажмите «Старт».</>} />

      {/* steps mini-list */}
      <ol style={{
        margin: '20px 0 0', padding: 0, listStyle: 'none',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        {[
          <>Откройте Telegram и найдите <Mono style={{ fontSize: 13, color: VT.ink }}>{BRAND.contactBot}</Mono></>,
          <>Нажмите <b>«Старт»</b> — больше ничего делать не нужно</>,
          <>Мы пришлём ссылку на сайт сюда же, в личку</>,
        ].map((line, i) => (
          <li key={i} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '12px 14px',
            background: VT.white, border: `1px solid ${VT.line}`,
            borderRadius: VT.r.md,
          }}>
            <span style={{
              width: 24, height: 24, borderRadius: '50%',
              background: VT.accent, color: VT.white,
              fontFamily: VT.font.mono, fontSize: 12, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              flex: '0 0 auto', marginTop: 1,
            }}>{i + 1}</span>
            <span style={{ fontSize: 14, lineHeight: 1.5, color: VT.ink }}>{line}</span>
          </li>
        ))}
      </ol>

      {/* bot handle row */}
      <div style={{
        marginTop: 14, padding: '12px 14px',
        background: VT.accentSoft, border: `1px solid ${VT.accentSoft}`,
        borderRadius: VT.r.md,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: VT.white,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: VT.font.mono, fontSize: 15, fontWeight: 500 }}>{BRAND.contactBot}</div>
          <div style={{ fontSize: 12, color: VT.accentInk }}>откройте в Telegram</div>
        </div>
        <Btn size="sm">Открыть</Btn>
      </div>

      {/* Polling status */}
      <div style={{
        marginTop: 14, padding: '12px 14px',
        background: VT.bgSoft, borderRadius: VT.r.md,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 13.5, color: VT.inkSoft,
      }}>
        <span style={{ color: VT.accent, display: 'inline-flex' }}><Spinner size={14} /></span>
        <span>Ждём, пока вы нажмёте «Старт»…</span>
        <Mono style={{ marginLeft: 'auto', fontSize: 11 }}>5 сек</Mono>
      </div>

      {/* Always-present escape hatch */}
      <div style={{
        marginTop: 14, fontSize: 13, color: VT.inkSoft, lineHeight: 1.5,
      }}>
        Нет Telegram или не получается?{' '}
        <a style={{ color: VT.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Получить ссылку на почту →
        </a>
      </div>
    </ModalShell>
  );
}

// Legacy bot-invite for TG source channel (NOT contact — different flow:
// adding @SamositeIntakeBot to user's own channel so we can read posts).
// Used when the SOURCE is a private Telegram channel — kept for screen #4.

function S4_TGBotInvite() {
  return (
    <ModalShell width={560}>
      <StepHeader step={1} total={1} title="Канал приватный — пустите бота на 5 минут"
        sub={<>Канал закрыт от незарегистрированных. Чтобы достать посты — добавьте <b>{BRAND.bot}</b> как админа на время сбора. Сразу выйдем, как закончим.</>}
        onBack={false} />

      <div style={{ marginTop: 18 }}>
        <VideoPlaceholder />
      </div>

      <div style={{
        marginTop: 16, padding: '12px 14px',
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: VT.accentSoft,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18,
        }}>🤖</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: VT.font.mono, fontSize: 15, fontWeight: 500 }}>{BRAND.bot}</div>
          <div style={{ fontSize: 12, color: VT.inkFaint }}>добавить админом → дать «Управление сообщениями»</div>
        </div>
        <Btn variant="secondary" size="sm">Скопировать</Btn>
      </div>

      <div style={{
        marginTop: 14, padding: '14px 16px',
        background: VT.bgSoft, borderRadius: VT.r.md,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 14, color: VT.inkSoft,
      }}>
        <span style={{ color: VT.accent, display: 'inline-flex' }}><Spinner size={16} /></span>
        <span>Жду пока добавите бота…</span>
        <Mono style={{ marginLeft: 'auto', fontSize: 11 }}>polling · каждые 5с</Mono>
      </div>

      {/* Fallback */}
      <div style={{ marginTop: 12, fontSize: 13, color: VT.inkSoft, lineHeight: 1.5 }}>
        Не получается?{' '}
        <a style={{ color: VT.accent, textDecoration: 'underline', textUnderlineOffset: 3 }}>
          Загрузите HTML-экспорт канала вручную →
        </a>
      </div>
    </ModalShell>
  );
}

function VideoPlaceholder() {
  return (
    <div style={{
      aspectRatio: '16/9',
      borderRadius: VT.r.md,
      background: `repeating-linear-gradient(135deg, ${VT.bgSoft} 0 12px, ${VT.lineSoft} 12px 24px)`,
      border: `1px solid ${VT.line}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 6,
      fontFamily: VT.font.mono, fontSize: 12, color: VT.inkFaint,
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: VT.white, border: `1px solid ${VT.line}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: VT.accent, fontSize: 22,
      }}>▶</div>
      <span>[ видео-гайд · 20 сек ]</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Wrapper that decides which step to render based on `step` prop.
// Back-compat: index.html still calls <S3_SubmitModal/> with old props.

function S3_SubmitModal(props) {
  const { step = 1, source = 'telegram', sourceUrl = 'https://t.me/studia_anna',
          channel = 'telegram', contact = '@studia_anna', counts = 'нашли 47 постов и 12 фото' } = props;

  if (step === 1) return <S3_Step1_Link url={sourceUrl} source={source} counts={counts} />;
  if (step === 2) return <S3_Step2_Contact channel={channel} value={contact} />;
  return <S3_Step1_Link url={sourceUrl} source={source} counts={counts} />;
}

// ─────────────────────────────────────────────────────────────
// #5 Confirmation screen

function QRCodePlaceholder({ size = 144 }) {
  const cells = 13;
  const cell = size / cells;
  const dots = [];
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) {
    if ((x < 3 || x > cells - 4) && (y < 3 || y > cells - 4)) continue;
    if ((x * 7 + y * 13) % 5 < 2) dots.push(<rect key={x + 'x' + y} x={x*cell+1} y={y*cell+1} width={cell-2} height={cell-2} rx={1} fill={VT.ink} />);
  }
  const finder = (x, y) => (
    <g key={x+'_'+y}>
      <rect x={x*cell} y={y*cell} width={3*cell} height={3*cell} fill="none" stroke={VT.ink} strokeWidth="2"/>
      <rect x={(x+1)*cell} y={(y+1)*cell} width={cell} height={cell} fill={VT.ink}/>
    </g>
  );
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{
      background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md, padding: 8,
    }}>
      {dots}
      {finder(0, 0)}
      {finder(cells - 3, 0)}
      {finder(0, cells - 3)}
    </svg>
  );
}

function S5_Confirmation({ contactType = 'telegram' }) {
  const isTg = contactType === 'telegram';
  return (
    <div style={{
      width: '100%', minHeight: '100%', background: VT.bg, color: VT.ink,
      fontFamily: VT.font.sans, padding: 32, letterSpacing: '-0.01em',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div style={{ maxWidth: 560, width: '100%' }}>
        <window.BrandMark size={22} fontSize={18} />

        <div style={{
          marginTop: 36, width: 64, height: 64, borderRadius: '50%',
          background: VT.successSoft, color: VT.success,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 style={{ fontSize: 38, fontWeight: 700, letterSpacing: '-0.03em', margin: '20px 0 12px', lineHeight: 1.1, textWrap: 'balance' }}>
          Готовим ваш сайт
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.5, color: VT.inkSoft, margin: 0, maxWidth: 480 }}>
          Свяжемся с вами и пришлём ссылку в течение 2 часов
        </p>
        <div style={{ marginTop: 28 }}>
          <Btn variant="secondary" iconRight={<IconArrow />}>Вернуться на главную</Btn>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// #6 Photo drawer

const ICP = [
  'Маникюр', 'Барбер', 'Тату-мастер', 'Фитнес-тренер',
  'Психолог', 'Фотограф', 'Кондитер', 'Кулинар',
  'Репетитор', 'Мастер ресниц', 'Бровист', 'Прочее',
];

function PhotoThumb({ name, type, idx }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      padding: '10px 12px',
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 8,
        background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
        flex: '0 0 auto',
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }}>JPEG · 2.4 MB</div>
      </div>
      <select defaultValue={type} style={{
        fontFamily: VT.font.sans, fontSize: 12.5,
        padding: '6px 8px', borderRadius: 8,
        border: `1px solid ${VT.line}`, background: VT.bgSoft, color: VT.ink,
      }}>
        <option value="work">работа</option>
        <option value="profile_screenshot">шапка профиля</option>
        <option value="business_card">визитка</option>
        <option value="booklet">буклет</option>
      </select>
      <button aria-label="Удалить" style={{
        width: 28, height: 28, borderRadius: 6,
        background: 'transparent', border: 'none',
        cursor: 'pointer', color: VT.inkFaint, fontSize: 18,
      }}>×</button>
    </div>
  );
}

function S6_PhotoDrawer({ variant = 'desktop' }) {
  const Wrap = variant === 'desktop' ? ModalShell : MobileSheet;
  return (
    <Wrap width={620}>
      <StepHeader step={1} total={2} title="Загрузите фото"
        sub="Работы, скриншот шапки профиля, визитка или буклет. От 5 до 30 файлов, до 10 МБ каждый."
        onBack={false} />

      <div style={{
        marginTop: 18,
        border: `1.5px dashed ${VT.accent}`,
        background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
        borderRadius: VT.r.lg,
        padding: 28,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 26, marginBottom: 6 }}>📷</div>
        <div style={{ fontSize: 15, fontWeight: 600 }}>Перетащите файлы сюда</div>
        <div style={{ fontSize: 13, color: VT.inkSoft, margin: '4px 0 12px' }}>
          или нажмите чтобы выбрать · JPEG / PNG / WebP / HEIC
        </div>
        <Btn variant="secondary" size="sm">Выбрать файлы</Btn>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ЗАГРУЖЕНО · 3 ИЗ 30</Mono>
          <Mono style={{ fontSize: 11 }}>6.8 МБ · ≤ 100 МБ</Mono>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PhotoThumb name="IMG_2847.jpg" type="work" idx={0} />
          <PhotoThumb name="profile-screenshot.png" type="profile_screenshot" idx={1} />
          <PhotoThumb name="vizitka-front.jpg" type="business_card" idx={2} />
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <FormField label="Название дела" placeholder="Студия Анны" />
        <FormField label="Город" placeholder="Петрозаводск" />
        <FormField label="Категория" placeholder="Маникюр" select options={ICP} />
        <FormField label="Email" placeholder="anya@example.com" />
        <div style={{ gridColumn: '1 / -1' }}>
          <FormField label="Телефон или @telegram" placeholder="+7 921 234-56-78" />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <Checkbox checked={false} label={<>Согласен на обработку персональных данных согласно</>} link="политике конфиденциальности" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 18 }}>
        <Btn style={{ flex: 1 }} iconRight={<IconArrow />}>Создать сайт из фото</Btn>
      </div>
      <CaptchaNotice />
    </Wrap>
  );
}

function FormField({ label, placeholder, select, options = [] }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, color: VT.inkSoft, fontWeight: 500, marginBottom: 4 }}>
        {label}
      </label>
      <div style={{
        padding: '10px 12px',
        background: VT.white, border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md, fontSize: 14, color: VT.inkFaint,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span>{placeholder}</span>
        {select && (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
    </div>
  );
}

function MobileSheet({ children }) {
  return (
    <div style={{
      width: '100%', minHeight: '100%', background: 'rgba(0,0,0,0.32)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      fontFamily: VT.font.sans,
    }}>
      <div style={{
        width: '100%', background: VT.bg,
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        padding: 20, paddingBottom: 28,
        position: 'relative',
      }}>
        <span aria-hidden="true" style={{
          display: 'block', width: 42, height: 4, borderRadius: 2,
          background: VT.line, margin: '0 auto 14px',
        }} />
        {children}
      </div>
    </div>
  );
}

Object.assign(window, {
  S3_SubmitModal, S3_Step1_Link, S3_Step2_Contact, S3_Step3_TgBot,
  S5_Confirmation, S6_PhotoDrawer,
});

})(); } // end __vt_intake guard
