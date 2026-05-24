'use client';

// @samosite/canon · intake · 0.3.0
//
// SubmitModal rewrite — TWO BRANCHES with mode-switcher and inline confirmation.
//
//   mode = 'link'  →  Step 1 (link)        → Step 2 (contact) → Step 3 (confirm)
//   mode = 'photo' →  Step 1 (photo files) → Step 2 (описание + city +
//                     customer_contact, опц. text_files) → Step 3 (contact)
//                                                       → Step 4 (confirm)
//
// Mode-switcher (pill tabs «🔗 ссылка / 📎 фото») rendered on Step 1 in both
// branches so user can switch without closing the modal. Branch state survives
// the switch (consumer's responsibility — store both branches' partial state).
//
// Removed in 0.3.0:
//   • `S5_Confirmation` (standalone screen) — confirm is now final step inline
//   • `S3_Step3_TgBot` — personal-bot onboarding deferred to post-approval email
//   • `S4_TGBotInvite` — private-channel bot invite (not used by canvas import)
//   • `SOURCE_LIB.instagram` special `ok-instagram` tier — Instagram is now
//     a regular `ok` source
//   • CaptchaNotice `· невидимо` suffix
//
// See CHANGELOG.md §0.3.0 for full migration guide.

import React from 'react';
import { VT, BRAND } from '../tokens';
import { Mono, Btn, Checkbox, IconLink, IconArrow, Spinner } from '../primitives';


// ─────────────────────────────────────────────────────────────
// Shell

function ModalShell({ children, width = 540 }) {
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

function StepHeader({ step, total, title, sub, showBack = true }) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        {step > 1 && showBack && (
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
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2, textWrap: 'balance' }}>
        {title}
      </h2>
      {sub && <p style={{ fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }}>{sub}</p>}
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// Mode switcher (Step 1 only) — pill tabs «🔗 ссылка / 📎 фото»

function SvgLink() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5"/>
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19"/>
    </svg>
  );
}

function SvgPaperclip() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.44 11.05 12.25 20.24a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  );
}

function ModeSwitcher({ mode = 'link', onModeChange }) {
  const tab = (id, label, icon) => {
    const active = mode === id;
    return (
      <button key={id}
        onClick={() => onModeChange?.(id)}
        style={{
          flex: 1,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '10px 14px', borderRadius: 999,
          background: active ? VT.white : 'transparent',
          boxShadow: active ? '0 1px 0 rgba(0,0,0,0.04), 0 6px 14px -8px rgba(120,60,30,0.18)' : 'none',
          border: 'none', cursor: 'pointer',
          fontFamily: VT.font.sans, fontSize: 14,
          fontWeight: active ? 600 : 500,
          color: active ? VT.ink : VT.inkSoft,
        }}>
        <span style={{ fontSize: 15, display: 'inline-flex' }}>{icon}</span>
        {label}
      </button>
    );
  };
  return (
    <div role="tablist" aria-label="Источник для сайта" style={{
      display: 'flex', gap: 4, padding: 4,
      background: VT.bgSoft, border: `1px solid ${VT.line}`,
      borderRadius: 999,
      marginTop: 18,
    }}>
      {tab('link', 'Ссылка', <SvgLink />)}
      {tab('photo', 'Фото', <SvgPaperclip />)}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Source-detection badge (Instagram = plain `ok`, no special-case)

const SOURCE_LIB = {
  yandex_maps: { label: 'Яндекс.Карты',     icon: '🗺️', tier: 'ok' },
  telegram:    { label: 'Telegram-канал',   icon: '✈️', tier: 'ok' },
  twogis:      { label: '2ГИС',             icon: '📍', tier: 'ok' },
  avito:       { label: 'Avito-профиль',    icon: '🅰️', tier: 'ok' },
  instagram:   { label: 'Instagram',        icon: '📷', tier: 'ok' },
  website:     { label: 'Свой сайт',        icon: '🌐', tier: 'ok' },
  vk:          { label: 'VK-страница',      icon: 'V',  tier: 'soon' },
  whatsapp:    { label: 'WhatsApp-каталог', icon: '🟢', tier: 'soon' },
  youtube:     { label: 'YouTube-канал',    icon: '▶️', tier: 'soon' },
  unknown:     { label: 'не распознали',    icon: '?',  tier: 'unknown' },
};

function SourceBadge({ source, counts, onCorrect }) {
  const meta = SOURCE_LIB[source] || SOURCE_LIB.unknown;
  const tier = meta.tier;
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
        <button onClick={onCorrect} style={{
          marginLeft: 'auto', background: 'transparent', border: 'none',
          color: 'oklch(0.38 0.12 145)', fontSize: 12, cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: 3,
          fontFamily: VT.font.sans,
        }}>не то?</button>
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
        <span><b>{meta.label}</b> — скоро поддержим. Оставьте email — напишем, как добавим.</span>
      </div>
    );
  }
  return (
    <div style={{
      padding: '12px 14px',
      background: VT.warnSoft, borderRadius: VT.r.md,
      display: 'flex', alignItems: 'center', gap: 10,
      fontSize: 13.5, color: 'oklch(0.42 0.13 70)',
    }}>
      <span style={{ fontSize: 16 }}>⚠️</span>
      <span>Не распознали — проверьте ссылку. Или переключитесь на фото →</span>
    </div>
  );
}

function LinkInput({ value, placeholder = 'https://...', onChange, loading = false }) {
  const empty = !value;
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '14px 16px',
      background: VT.white,
      border: `1.5px solid ${empty ? VT.line : VT.accent}`,
      borderRadius: VT.r.md,
    }}>
      <IconLink />
      <input
        type="url"
        value={value || ''}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
        style={{
          flex: 1, fontFamily: VT.font.mono, fontSize: 14,
          color: empty ? VT.inkFaint : VT.ink,
          border: 'none', outline: 'none', background: 'transparent',
        }} />
      {loading && (
        <span style={{ color: VT.success, display: 'inline-flex' }}>
          <Spinner size={14} />
        </span>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Photo upload — drop-zone + thumb list
// Soft limits 0.3.0: 5..60 files, ≤15 MB each, ≤200 MB total.

const PHOTO_LIMITS = { minFiles: 5, maxFiles: 60, maxFileBytes: 15 * 1024 * 1024, maxTotalBytes: 200 * 1024 * 1024 };

function PhotoDropZone({ compact = false, onPick }) {
  return (
    <div style={{
      border: `1.5px dashed ${VT.accent}`,
      background: `repeating-linear-gradient(45deg, ${VT.bg} 0 8px, ${VT.accentSoft} 8px 9px)`,
      borderRadius: VT.r.lg,
      padding: compact ? 20 : 28,
      textAlign: 'center',
    }}>
      <div style={{ fontSize: compact ? 22 : 26, marginBottom: 6 }}>📷</div>
      <div style={{ fontSize: compact ? 14 : 15, fontWeight: 600 }}>
        Перетащите файлы сюда
      </div>
      <div style={{ fontSize: 13, color: VT.inkSoft, margin: '4px 0 12px' }}>
        или нажмите чтобы выбрать · JPEG / PNG / WebP / HEIC
      </div>
      <Btn variant="secondary" size="sm" onClick={onPick}>Выбрать файлы</Btn>
      <div style={{ fontSize: 11.5, color: VT.inkFaint, marginTop: 10, fontFamily: VT.font.mono }}>
        5–60 файлов · до 15 МБ каждый · до 200 МБ всего
      </div>
    </div>
  );
}

function PhotoThumb({ name, sizeKb = 2400, idx = 0, onRemove }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      padding: '10px 12px',
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 8,
        background: `repeating-linear-gradient(${30 + idx * 35}deg, ${VT.accentSoft} 0 6px, ${VT.bgSoft} 6px 12px)`,
        flex: '0 0 auto',
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }}>
          {name.split('.').pop().toUpperCase()} · {(sizeKb / 1000).toFixed(1)} MB
        </div>
      </div>
      <button aria-label="Удалить" onClick={onRemove} style={{
        width: 28, height: 28, borderRadius: 6,
        background: 'transparent', border: 'none',
        cursor: 'pointer', color: VT.inkFaint, fontSize: 18,
      }}>×</button>
    </div>
  );
}

function PhotoList({ files, onRemove }) {
  const totalKb = files.reduce((s, f) => s + (f.sizeKb || 2400), 0);
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>
          ЗАГРУЖЕНО · {files.length} ИЗ {PHOTO_LIMITS.maxFiles}
        </Mono>
        <Mono style={{ fontSize: 11 }}>{(totalKb / 1000).toFixed(1)} МБ · ≤ 200 МБ</Mono>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {files.map((f, i) => (
          <PhotoThumb key={i} name={f.name} sizeKb={f.sizeKb} idx={i}
            onRemove={() => onRemove?.(i)} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Form pieces

function FieldLabel({ children, required = false }) {
  return (
    <label style={{
      display: 'block', fontSize: 13, color: VT.inkSoft, fontWeight: 500,
      marginBottom: 6,
    }}>
      {children}
      {required && <span style={{ color: VT.accent, marginLeft: 4 }}>*</span>}
    </label>
  );
}

function FieldInput({ value, placeholder, onChange, mono = false, type = 'text' }) {
  return (
    <input
      type={type}
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '12px 14px',
        background: VT.white,
        border: `1px solid ${value ? VT.accent : VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14, lineHeight: 1.5,
        fontFamily: mono ? VT.font.mono : VT.font.sans,
        color: VT.ink, outline: 'none',
      }} />
  );
}

function FieldTextarea({ value, placeholder, onChange, rows = 4 }) {
  return (
    <textarea
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      rows={rows}
      style={{
        width: '100%', boxSizing: 'border-box', resize: 'vertical',
        padding: '12px 14px',
        background: VT.white,
        border: `1px solid ${value ? VT.accent : VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14, lineHeight: 1.5,
        fontFamily: VT.font.sans, color: VT.ink, outline: 'none',
      }} />
  );
}

// Customer-contact picker — explicit phone/tg radio (symmetric with notify-channel)

function CustomerContactPicker({ type = 'phone', value = '', onTypeChange, onValueChange }) {
  const tab = (id, label, icon) => {
    const active = type === id;
    return (
      <button key={id}
        onClick={() => onTypeChange?.(id)}
        style={{
          flex: 1,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '10px 12px', borderRadius: 999,
          background: active ? VT.white : 'transparent',
          boxShadow: active ? '0 1px 0 rgba(0,0,0,0.04), 0 6px 14px -8px rgba(120,60,30,0.18)' : 'none',
          border: 'none', cursor: 'pointer',
          fontFamily: VT.font.sans, fontSize: 13.5,
          fontWeight: active ? 600 : 500,
          color: active ? VT.ink : VT.inkSoft,
        }}>
        <span style={{ fontSize: 14 }}>{icon}</span>
        {label}
      </button>
    );
  };
  const ph = type === 'phone' ? '+7 921 234-56-78' : '@your_handle';
  return (
    <>
      <div role="tablist" style={{
        display: 'flex', gap: 4, padding: 4,
        background: VT.bgSoft, border: `1px solid ${VT.line}`,
        borderRadius: 999, marginBottom: 8,
      }}>
        {tab('phone', 'Телефон', '📱')}
        {tab('telegram', 'Telegram', '✈️')}
      </div>
      <FieldInput value={value} placeholder={ph} mono onChange={onValueChange} />
    </>
  );
}

// Text-file thumb — generic 📄 icon + name + size

function TextFileThumb({ name, sizeKb = 240, onRemove }) {
  return (
    <div style={{
      display: 'flex', gap: 12, alignItems: 'center',
      padding: '8px 12px',
      background: VT.white, border: `1px solid ${VT.line}`,
      borderRadius: VT.r.md,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 6,
        background: VT.bgSoft, border: `1px solid ${VT.line}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, flex: '0 0 auto',
      }}>📄</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</div>
        <div style={{ fontSize: 11, color: VT.inkFaint, fontFamily: VT.font.mono }}>
          {name.split('.').pop().toUpperCase()} · {(sizeKb / 1000).toFixed(1)} MB
        </div>
      </div>
      <button aria-label="Удалить" onClick={onRemove} style={{
        width: 26, height: 26, borderRadius: 6,
        background: 'transparent', border: 'none',
        cursor: 'pointer', color: VT.inkFaint, fontSize: 16,
      }}>×</button>
    </div>
  );
}

function TextFilesDropZone({ onPick }) {
  return (
    <div style={{
      border: `1.5px dashed ${VT.line}`,
      background: VT.bgSoft,
      borderRadius: VT.r.md,
      padding: 14,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 8,
        background: VT.white, border: `1px solid ${VT.line}`,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flex: '0 0 auto',
      }}>📎</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 500 }}>Прайс, описания услуг, FAQ</div>
        <div style={{ fontSize: 11.5, color: VT.inkFaint, fontFamily: VT.font.mono, marginTop: 1 }}>
          PDF / DOCX / TXT / RTF · до 10 файлов
        </div>
      </div>
      <Btn variant="secondary" size="sm" onClick={onPick}>Выбрать</Btn>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CaptchaNotice — 0.3.0: removed `· невидимо` suffix

function CaptchaNotice() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: 11.5, color: VT.inkMuted, marginTop: 14,
      fontFamily: VT.font.mono, letterSpacing: '0.02em',
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"/>
      </svg>
      Защищено Yandex SmartCaptcha
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 1 · LINK

function S3_Step1_Link({
  url = '', source = null, counts = null, total = 3,
  onUrlChange, onModeChange, onCorrect, onContinue,
}) {
  const canContinue = !!url && source && SOURCE_LIB[source]?.tier === 'ok';
  return (
    <ModalShell width={540}>
      <StepHeader step={1} total={total} showBack={false}
        title="Ссылка на вашу страницу или профиль, из которой мы сделаем сайт" />

      <ModeSwitcher mode="link" onModeChange={onModeChange} />

      <div style={{ marginTop: 18 }}>
        <FieldLabel>Ссылка</FieldLabel>
        <LinkInput value={url} placeholder="https://t.me/studia_anna"
          onChange={onUrlChange} loading={!!url && !source} />
      </div>

      {source && (
        <div style={{ marginTop: 10 }}>
          <SourceBadge source={source} counts={counts} onCorrect={onCorrect} />
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }}>
        <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ПОДДЕРЖИВАЕМ:</Mono>{' '}
        Яндекс.Карты · Telegram-канал · Instagram · 2ГИС · Avito · ваш старый сайт
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
        <Btn style={{ flex: 1, opacity: canContinue ? 1 : 0.55 }}
          iconRight={<IconArrow />} onClick={canContinue ? onContinue : undefined}>
          Продолжить
        </Btn>
      </div>

      <CaptchaNotice />
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 1 · PHOTO

function S3_Step1_Photo({
  files = [], total = 4,
  onPick, onRemove, onModeChange, onContinue,
}) {
  const empty = files.length === 0;
  const canContinue = files.length >= PHOTO_LIMITS.minFiles;
  return (
    <ModalShell width={560}>
      <StepHeader step={1} total={total} showBack={false}
        title="Загрузите фото вашего дела"
        sub="Работы, скриншоты профиля, фото визитки, буклета или меню — соберём сайт из того, что у вас есть" />

      <ModeSwitcher mode="photo" onModeChange={onModeChange} />

      <div style={{ marginTop: 18 }}>
        <PhotoDropZone compact={!empty} onPick={onPick} />
      </div>

      {!empty && <PhotoList files={files} onRemove={onRemove} />}

      {!empty && files.length < PHOTO_LIMITS.minFiles && (
        <div style={{
          marginTop: 12, fontSize: 12.5, color: VT.inkSoft,
          padding: '8px 12px', background: VT.warnSoft, borderRadius: VT.r.sm,
        }}>
          Загрузите ещё {PHOTO_LIMITS.minFiles - files.length} — чтобы собрать сайт нужно минимум {PHOTO_LIMITS.minFiles} фото.
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
        <Btn style={{ flex: 1, opacity: canContinue ? 1 : 0.55 }}
          iconRight={<IconArrow />} onClick={canContinue ? onContinue : undefined}>
          Продолжить
        </Btn>
      </div>

      <CaptchaNotice />
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP 2 · PHOTO · описание

function S3_Step2_PhotoDesc({
  description = '', city = '',
  customerContact = '', customerContactType = 'phone',
  textFiles = [],
  onDescriptionChange, onCityChange,
  onCustomerContactChange, onCustomerContactTypeChange,
  onPickTextFile, onRemoveTextFile,
  onBack, onContinue,
}) {
  const ok = description.length >= 30 && !!city && !!customerContact;
  return (
    <ModalShell width={560}>
      <StepHeader step={2} total={4}
        title="Расскажите о вашем деле"
        sub="Что нам нужно знать перед тем как начать?" />

      <div style={{ marginTop: 20 }}>
        <FieldLabel required>Что вы делаете</FieldLabel>
        <FieldTextarea value={description}
          placeholder="Маникюр, педикюр, наращивание. 7 лет опыта, работаю в Петрозаводске, выезд на дом"
          onChange={onDescriptionChange} rows={4} />
      </div>

      <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
        <div>
          <FieldLabel required>Город</FieldLabel>
          <FieldInput value={city} placeholder="Петрозаводск" onChange={onCityChange} />
        </div>
        <div>
          <FieldLabel required>Контакты на сайте</FieldLabel>
          <CustomerContactPicker
            type={customerContactType} value={customerContact}
            onTypeChange={onCustomerContactTypeChange}
            onValueChange={onCustomerContactChange} />
          <div style={{ fontSize: 11.5, color: VT.inkFaint, marginTop: 6, lineHeight: 1.4 }}>
            Покажем клиентам на сайте. Куда написать вам лично — спросим на следующем шаге.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <FieldLabel>Прикрепите текстовые файлы (необязательно)</FieldLabel>
        {textFiles.length === 0 ? (
          <TextFilesDropZone onPick={onPickTextFile} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {textFiles.map((f, i) => (
              <TextFileThumb key={i} name={f.name} sizeKb={f.sizeKb}
                onRemove={() => onRemoveTextFile?.(i)} />
            ))}
            <button onClick={onPickTextFile} style={{
              alignSelf: 'flex-start', marginTop: 4,
              background: 'transparent', border: 'none', color: VT.accent,
              fontSize: 13, cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: 3,
              fontFamily: VT.font.sans,
            }}>+ ещё файл</button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 22 }}>
        <Btn style={{ flex: 1, opacity: ok ? 1 : 0.55 }}
          iconRight={<IconArrow />} onClick={ok ? onContinue : undefined}>
          Продолжить
        </Btn>
      </div>

      <CaptchaNotice />
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// CONTACT step (link: step 2, photo: step 3)

function ChannelOption({ value, label, hint, icon, selected, onSelect }) {
  return (
    <label onClick={() => onSelect?.(value)}
      style={{
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

function S3_StepContact({
  step, total,
  channel = 'telegram', contact = '', consent = true,
  onChannelChange, onContactChange, onConsentChange,
  onBack, onSubmit,
}) {
  const ph = {
    telegram: '@your_handle',
    phone:    '+7 921 234-56-78',
    email:    'you@example.ru',
    max:      '@your_handle',
  }[channel];
  return (
    <ModalShell width={540}>
      <StepHeader step={step} total={total}
        title="Куда вам писать?"
        sub="Один основной контакт — туда придёт ссылка на готовый сайт и заявки клиентов." />

      <div style={{ marginTop: 20 }}>
        <FieldLabel>Основной канал</FieldLabel>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <ChannelOption value="telegram" label="Telegram" hint="мгновенно" icon="✈️"
            selected={channel === 'telegram'} onSelect={onChannelChange} />
          <ChannelOption value="phone"    label="Телефон"  hint="SMS-уведомления" icon="📱"
            selected={channel === 'phone'} onSelect={onChannelChange} />
          <ChannelOption value="email"    label="Email"    hint="на ящик" icon="📧"
            selected={channel === 'email'} onSelect={onChannelChange} />
          <ChannelOption value="max"      label="MAX"      hint="мессенджер от VK" icon="💬"
            selected={channel === 'max'} onSelect={onChannelChange} />
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <FieldLabel>
          {channel === 'phone' ? 'Номер телефона'
            : channel === 'email' ? 'Email'
            : channel === 'max' ? 'Логин в MAX'
            : 'Ваш Telegram (логин или номер)'}
        </FieldLabel>
        <FieldInput value={contact} placeholder={ph} mono onChange={onContactChange} />
      </div>

      <div style={{ marginTop: 16 }}>
        <Checkbox checked={consent}
          onChange={(v) => onConsentChange?.(v)}
          label={<>Согласен на обработку персональных данных и публикацию контактов на сайте согласно</>}
          link="политике конфиденциальности" />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20 }}>
        <Btn style={{ flex: 1, opacity: (contact && consent) ? 1 : 0.55 }}
          iconRight={<IconArrow />}
          onClick={(contact && consent) ? onSubmit : undefined}>
          Отправить заявку
        </Btn>
      </div>

      <CaptchaNotice />
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// FINAL confirmation — inline final step

function SummaryRow({ label, value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '10px 0',
      borderTop: `1px solid ${VT.line}`,
    }}>
      <div style={{
        flex: '0 0 130px',
        fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em',
        color: VT.inkFaint, paddingTop: 2,
      }}>{label}</div>
      <div style={{ flex: 1, fontSize: 14, color: VT.ink, lineHeight: 1.45, wordBreak: 'break-word' }}>
        {value}
      </div>
    </div>
  );
}

function S3_FinalConfirm({ mode = 'link', total = 3, summary = {}, onClose }) {
  return (
    <ModalShell width={540}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ШАГ {total}/{total}</Mono>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} style={{ width: 28, height: 4, borderRadius: 2, background: VT.accent }} />
          ))}
        </div>
      </div>

      <div style={{
        width: 56, height: 56, borderRadius: '50%',
        background: VT.successSoft, color: VT.success,
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12l4 4 10-10"/>
        </svg>
      </div>

      <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.03em', margin: '16px 0 8px', lineHeight: 1.15 }}>
        Готовим ваш сайт
      </h2>
      <p style={{ fontSize: 15, lineHeight: 1.5, color: VT.inkSoft, margin: 0 }}>
        Свяжемся с вами и пришлём ссылку в течение <b style={{ color: VT.ink }}>2 часов</b>.
      </p>

      <div style={{ marginTop: 20 }}>
        {mode === 'link' && summary.url && (
          <SummaryRow label="ССЫЛКА" value={<span style={{ fontFamily: VT.font.mono, fontSize: 13 }}>{summary.url}</span>} />
        )}
        {mode === 'photo' && (
          <>
            <SummaryRow label="ФАЙЛЫ" value={`${summary.fileCount || 0} фото`} />
            {summary.description && (
              <SummaryRow label="ОПИСАНИЕ" value={summary.description} />
            )}
            {summary.city && (
              <SummaryRow label="ГОРОД" value={summary.city} />
            )}
            {summary.customerContact && (
              <SummaryRow label="НА САЙТЕ" value={<span style={{ fontFamily: VT.font.mono, fontSize: 13 }}>{summary.customerContact}</span>} />
            )}
            {summary.textFileCount > 0 && (
              <SummaryRow label="ТЕКСТЫ" value={`${summary.textFileCount} файлов`} />
            )}
          </>
        )}
        <SummaryRow label="НАПИШЕМ ВАМ"
          value={
            <span style={{ fontFamily: VT.font.mono, fontSize: 13 }}>
              {summary.contact}
              <span style={{ color: VT.inkFaint }}> · {({
                telegram: 'Telegram', phone: 'SMS', email: 'Email', max: 'MAX',
              })[summary.channel] || ''}</span>
            </span>
          } />
      </div>

      <div style={{ marginTop: 24 }}>
        <Btn variant="secondary" style={{ width: '100%' }} onClick={onClose}>Понятно</Btn>
      </div>
    </ModalShell>
  );
}

// ─────────────────────────────────────────────────────────────
// Router — single controlled entry point.
//
// Consumer owns state; passes everything through props. See README §SubmitModal
// for full API surface + integration example.

function SubmitModal(props) {
  const {
    mode = 'link',
    step = 1,
    // step 1 link
    url = '', source = null, counts = null,
    onUrlChange, onCorrect,
    // step 1 photo
    files = [],
    onPickPhoto, onRemovePhoto,
    // mode-switcher
    onModeChange,
    // step 2 photo
    description = '', city = '',
    customerContact = '', customerContactType = 'phone',
    textFiles = [],
    onDescriptionChange, onCityChange,
    onCustomerContactChange, onCustomerContactTypeChange,
    onPickTextFile, onRemoveTextFile,
    // contact
    channel = 'telegram', contact = '', consent = true,
    onChannelChange, onContactChange, onConsentChange,
    // navigation
    onBack, onContinue, onSubmit, onClose,
    // final
    summary,
  } = props;

  const total = mode === 'photo' ? 4 : 3;

  if (step === 1 && mode === 'link') {
    return <S3_Step1_Link
      url={url} source={source} counts={counts} total={total}
      onUrlChange={onUrlChange} onModeChange={onModeChange}
      onCorrect={onCorrect} onContinue={onContinue} />;
  }
  if (step === 1 && mode === 'photo') {
    return <S3_Step1_Photo
      files={files} total={total}
      onPick={onPickPhoto} onRemove={onRemovePhoto}
      onModeChange={onModeChange} onContinue={onContinue} />;
  }
  if (step === 2 && mode === 'photo') {
    return <S3_Step2_PhotoDesc
      description={description} city={city}
      customerContact={customerContact} customerContactType={customerContactType}
      textFiles={textFiles}
      onDescriptionChange={onDescriptionChange} onCityChange={onCityChange}
      onCustomerContactChange={onCustomerContactChange}
      onCustomerContactTypeChange={onCustomerContactTypeChange}
      onPickTextFile={onPickTextFile} onRemoveTextFile={onRemoveTextFile}
      onBack={onBack} onContinue={onContinue} />;
  }
  if ((step === 2 && mode === 'link') || (step === 3 && mode === 'photo')) {
    return <S3_StepContact step={step} total={total}
      channel={channel} contact={contact} consent={consent}
      onChannelChange={onChannelChange} onContactChange={onContactChange}
      onConsentChange={onConsentChange}
      onBack={onBack} onSubmit={onSubmit} />;
  }
  if ((step === 3 && mode === 'link') || (step === 4 && mode === 'photo')) {
    const s = summary || {
      url, fileCount: files.length, description, city,
      customerContact, textFileCount: textFiles.length,
      channel, contact,
    };
    return <S3_FinalConfirm mode={mode} total={total} summary={s} onClose={onClose} />;
  }
  return <S3_Step1_Link
    url={url} source={source} counts={counts} total={total}
    onUrlChange={onUrlChange} onModeChange={onModeChange} />;
}

// ─────────────────────────────────────────────────────────────
// PhotoDrawer — kept ONLY as backward-compat shim. New flow integrates photos
// as Step 1.B of SubmitModal. Schedule for removal at 0.4.0.

function PhotoDrawer(props) {
  // Render the new Step 1 photo as a standalone surface — old consumers expected
  // a self-contained drawer. Mode switcher hidden (legacy didn't have it).
  return <S3_Step1_Photo {...props} total={4} />;
}

const Confirmation = S3_FinalConfirm;

export {
  SubmitModal,
  Confirmation,
  PhotoDrawer,
  // Internal step components for visual baselines & per-step testing
  S3_Step1_Link,
  S3_Step1_Photo,
  S3_Step2_PhotoDesc,
  S3_StepContact,
  S3_FinalConfirm,
  // Constants for consumers who validate client-side
  SOURCE_LIB,
  PHOTO_LIMITS,
};
