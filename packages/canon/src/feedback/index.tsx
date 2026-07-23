'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · feedback v2 «Fb2_» — 0.13.0 «Фарфор и лак».
// Одна модалка FeedbackV2Modal, два режима: mode="blocker" (причина отказа уходящего
// посетителя + оффер бесплатного черновика) и mode="question" (задать вопрос, «отвечаю лично»).
// Controlled (паттерн 0.9.1/0.12.0): данные — пропсами, действия — колбэками. Внутри НЕТ
// fetch / Date.now / Math.random / localStorage / window.*: показ-логику §5, сеть, капчу и
// Метрику делает консьюмер. Zero-prop = canvas-mock. data-* хуки: data-feedback-v2 /
// data-fb-mode / data-fb-reason / data-fb-channel / data-fb-cta / data-fb-fab.
// Копи — побайтово из реестра §4 (COPY); причины (REASONS) — enum консьерж-таблицы 1:1
// (коды заморожены в БД и Метрике). Стили — Fb2_Styles (scoped .fb2, значения токенов VT).
// Заменяет удалённый vote-first S9_FeedbackModal (см. CHANGELOG 0.13.0).
import React, { useState, useEffect, useRef } from 'react';

export type FbV2Mode = 'blocker' | 'question';
export type FbV2Channel = 'telegram' | 'whatsapp' | 'email';
export interface FbV2Reason { code: string; label: string }
export interface FbV2Payload {
  mode: FbV2Mode;
  reason?: string;              // mode=blocker — код выбранной причины
  note?: string;                // mode=blocker — «почему», ≤200
  question?: string;            // mode=question
  channel?: FbV2Channel;        // опционально в blocker, обязательно в question
  contact?: string;             // опционально в blocker, обязательно в question
}
export interface FeedbackV2ModalProps {
  open?: boolean;                                  // controlled open; omit → canvas-mock
  mode?: FbV2Mode;                                 // 'blocker' | 'question'
  onOpenChange?: (open: boolean) => void;
  reasons?: FbV2Reason[];                          // дефолт = REASONS
  reason?: string | null;                          // код выбранной причины
  onReasonChange?: (code: string) => void;
  note?: string;
  onNoteChange?: (v: string) => void;
  question?: string;
  onQuestionChange?: (v: string) => void;
  channel?: FbV2Channel;
  onChannelChange?: (c: FbV2Channel) => void;
  contact?: string;
  onContactChange?: (v: string) => void;
  onSubmit?: (payload: FbV2Payload) => void;       // сеть — консьюмер
  submitting?: boolean;
  error?: boolean;
  submitted?: boolean;
  mobile?: boolean;
  embedded?: boolean;                              // как в 0.9.1: canvas-артборд vs viewport-fixed
}
export interface FeedbackV2FabProps {
  onClick?: () => void;
  embedded?: boolean;                              // canvas: position:absolute вместо fixed
}

// ───────── реестр копи (§4 — единственный источник строк; nbsp после коротких предлогов) ─────────
const COPY = {
  'blocker.title':          'Что останавливает прямо сейчас?',
  'blocker.note.label':     'Почему — одним предложением',
  'blocker.offer.title':    'Соберу черновик вашего сайта бесплатно — куда прислать?',
  'blocker.cta':            'Прислать черновик',
  'blocker.skip':           'Просто отправить ответ',
  'question.fab':           'Задать вопрос',
  'question.cta':           'Отправить',
  'question.sign':          'Читаю каждый ответ сам и\u00A0отвечаю лично',
  'thanks.blocker.contact': 'Пришлю черновик в\u00A0{channel}',
  'thanks.blocker.plain':   'Спасибо, это правда помогает',
  'thanks.question':        'Отвечу лично в\u00A0{channel}',
};

// ───────── причины (7) — коды заморожены в БД/Метрике, формулировки консьерж-таблицы 1:1 ─────────
const REASONS: FbV2Reason[] = [
  { code: 'enough_maps',    label: 'Мне хватает Яндекс.Карт и 2ГИС' },
  { code: 'booking_covers', label: 'Запись уже в Dikidi/YClients — зачем ещё сайт?' },
  { code: 'unclear_value',  label: 'Не понял, что именно получу' },
  { code: 'price',          label: 'Дорого' },
  { code: 'no_trust',       label: 'Не доверяю: непонятно, кто вы' },
  { code: 'not_now',        label: 'Пока просто смотрю — вернусь позже' },
  { code: 'other',          label: 'Другое — напишу словами' },
];

// ───────── каналы (та же тройка, что в интейке) ─────────
const CHANNELS = [
  { id: 'telegram', label: 'Telegram', ph: '@username',              icon: ['M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z'] },
  { id: 'whatsapp', label: 'WhatsApp', ph: '+7 (___) ___-__-__',      icon: ['M12 2a10 10 0 0 0-9 15L2 22l5-1a10 10 0 1 0 5-19z', 'M9 7c.5 0 1 .5 1.5 2 .5 1 .5 1.5-.5 2-.5.5-1 1 0 2s2 1.5 2.5 1c.5-1 1-1 2-.5s1.5 1 1.5 1.5c0 2-3 2-5 1-2-1-4-3-4-5 0-2 1-4 2-4z'] },
  { id: 'email',    label: 'Email',    ph: 'you@mail.ru',             icon: ['M3 5.5h18v13H3z', 'm3 6 9 7 9-7'] },
];
const channelLabel = (id) => (CHANNELS.find(c => c.id === id) || CHANNELS[0]).label;
const sub = (key, ch) => COPY[key].replace('{channel}', channelLabel(ch));

// ───────── валидация контакта по каналу ─────────
function formatPhone(v) {
  let d = (v || '').replace(/\D/g, '');
  if (d[0] === '8') d = '7' + d.slice(1);
  if (d && d[0] !== '7') d = '7' + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = '+7';
  if (p.length) out += ' (' + p.slice(0, 3);
  if (p.length >= 3) out += ') ' + p.slice(3, 6);
  if (p.length >= 6) out += '-' + p.slice(6, 8);
  if (p.length >= 8) out += '-' + p.slice(8, 10);
  return out;
}
function contactValid(channel, value) {
  const v = (value || '').trim(); if (!v) return false;
  if (channel === 'whatsapp') return v.replace(/\D/g, '').length === 11;
  if (channel === 'email') return /^\S+@\S+\.\S+$/.test(v);
  return /^@?[A-Za-z0-9_.]{2,}$/.test(v); // telegram
}
function contactError(channel) {
  if (channel === 'whatsapp') return 'Введите номер полностью: +7 и 10 цифр';
  if (channel === 'email') return 'Проверьте адрес — нужен вид you@mail.ru';
  return 'Минимум 2 символа, латиница/цифры';
}

// ───────── примитивы (module-scope: стабильный тип, ремаунт-ловушку 0.9.5 не повторяем) ─────────
function Icon({ d, size = 22, sw = 1.9, fill }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d.map((p, i) => <path key={i} d={p} />)}</svg>;
}
const S = {
  label: { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-45)' },
  input: { width: '100%', padding: '13px 14px', border: '1px solid var(--line-2)', background: '#fff', font: 'inherit', fontSize: 16, color: 'var(--ink)', outline: 'none' },
  hint: { fontSize: 15, lineHeight: 1.5, color: 'var(--ink-70)' },
};

function ReasonCard({ reason, active, first, onSelect, mobile }) {
  return (
    <button type="button" role="radio" aria-checked={active} tabIndex={(active || first) ? 0 : -1}
      data-fb-reason={reason.code} onClick={() => onSelect(reason.code)}
      className={'rcard' + (active ? ' is-active' : '')}
      style={{ fontSize: mobile ? 15.5 : 15 }}>
      <span className="rdot" aria-hidden="true">{active ? <Icon d={['M20 6 9 17l-5-5']} size={13} sw={3} /> : null}</span>
      <span style={{ flex: 1, minWidth: 0, textWrap: 'pretty' }}>{reason.label}</span>
    </button>
  );
}

function ChannelChips({ channel, onChannel }) {
  return (
    <div role="radiogroup" aria-label="Куда прислать" style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
      {CHANNELS.map(c => (
        <button key={c.id} type="button" role="radio" aria-checked={channel === c.id} data-fb-channel={c.id}
          onClick={() => onChannel(c.id)} className={'chip' + (channel === c.id ? ' is-active' : '')}>
          <span style={{ marginRight: 8, display: 'inline-flex' }}><Icon d={c.icon} size={15} sw={1.9} fill={c.id === 'telegram' ? 'currentColor' : undefined} /></span>{c.label}
        </button>
      ))}
    </div>
  );
}

function ContactField({ channel, value, onChange }) {
  const [touched, setTouched] = useState(false);
  const meta = CHANNELS.find(c => c.id === channel) || CHANNELS[0];
  const valid = contactValid(channel, value);
  const showErr = touched && !!(value || '').trim() && !valid;
  const border = showErr ? '#D98A8A' : (touched && valid ? '#8FC3B4' : 'var(--line-2)');
  const handle = (e) => { const raw = e.target.value; onChange(channel === 'whatsapp' ? formatPhone(raw) : raw); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ position: 'relative' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none', display: 'inline-flex' }}><Icon d={meta.icon} size={16} sw={1.9} fill={channel === 'telegram' ? 'currentColor' : undefined} /></span>
        <input style={{ ...S.input, paddingLeft: 38, borderColor: border }} value={value} placeholder={meta.ph}
          inputMode={channel === 'whatsapp' ? 'tel' : (channel === 'email' ? 'email' : 'text')}
          autoComplete="off" onChange={handle} onBlur={() => setTouched(true)} aria-label="Контакт" />
      </div>
      {showErr && <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#B23B3B' }}><Icon d={['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z']} size={15} sw={2} /> {contactError(channel)}</span>}
    </div>
  );
}

function Spinner({ size = 16 }) {
  return <span className="fb2-spin" style={{ display: 'inline-block', width: size, height: size, borderRadius: '50%', border: '2px solid rgba(251,249,244,.4)', borderTopColor: 'var(--on-accent)' }} />;
}

function ErrorBanner() {
  return (
    <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 9, border: '1px solid #D98A8A', background: '#FAEFEE', padding: '11px 13px', fontSize: 13.5, lineHeight: 1.45, color: '#B23B3B', marginTop: 4 }}>
      <span style={{ flex: 'none', marginTop: 1 }}><Icon d={['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z']} size={16} sw={2} /></span>
      <span>Не получилось отправить. Проверьте интернет и попробуйте ещё раз — всё заполненное сохранилось.</span>
    </div>
  );
}

// ───────── благодарность (короткая, без конфетти) ─────────
function Thanks({ mode, channel, contactSent, onClose }) {
  const text = mode === 'question'
    ? sub('thanks.question', channel)
    : (contactSent ? sub('thanks.blocker.contact', channel) : COPY['thanks.blocker.plain']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 15, textAlign: 'center', padding: '20px 4px 6px', maxWidth: 420, margin: '0 auto' }}>
      <span style={{ width: 58, height: 58, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={['M20 6 9 17l-5-5']} size={28} sw={2.4} /></span>
      <h3 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 27, lineHeight: 1.04, color: 'var(--ink)', margin: 0 }}>Спасибо</h3>
      <p style={{ ...S.hint, margin: 0 }}>{text}</p>
      <button className="btn btn--block" type="button" data-fb-cta="thanks-close" onClick={onClose} style={{ marginTop: 6 }}>Понятно</button>
    </div>
  );
}

// ═════════ FeedbackV2Modal — одна модалка, два режима (controlled) ═════════
function FeedbackV2Modal(props: FeedbackV2ModalProps = {}) {
  const {
    mode = 'blocker',
    open: openProp,
    onOpenChange,
    reasons = REASONS,
    reason: reasonProp,
    onReasonChange,
    note: noteProp,
    onNoteChange,
    question: questionProp,
    onQuestionChange,
    channel: channelProp,
    onChannelChange,
    contact: contactProp,
    onContactChange,
    onSubmit,
    submitting = false,
    error = false,
    submitted: submittedProp,
    mobile = false,
    embedded: embeddedProp,
  } = props;

  // controlled vs canvas/mock — как в 0.9.1/0.12.0
  const isControlled = openProp !== undefined;
  const isCanvas = !isControlled && typeof onSubmit !== 'function';
  const embedded = embeddedProp !== undefined ? embeddedProp : isCanvas;

  const [openI, setOpenI] = useState(isCanvas);
  const isOpen = isControlled ? openProp : openI;
  const setOpen = (v) => { if (onOpenChange) onOpenChange(v); if (!isControlled) setOpenI(v); };

  // поля: prop+callback = controlled, иначе внутренний стейт (инициализируется из prop для canvas-показа)
  const [reasonI, setReasonI]     = useState(reasonProp ?? null);
  const [noteI, setNoteI]         = useState(noteProp ?? '');
  const [questionI, setQuestionI] = useState(questionProp ?? '');
  const [channelI, setChannelI]   = useState(channelProp ?? 'telegram');
  const [contactI, setContactI]   = useState(contactProp ?? '');
  const [submittedI, setSubmittedI] = useState(false);

  const reason   = onReasonChange   ? (reasonProp ?? null) : reasonI;
  const note     = onNoteChange     ? (noteProp ?? '')     : noteI;
  const question = onQuestionChange ? (questionProp ?? '') : questionI;
  const channel  = onChannelChange  ? (channelProp ?? 'telegram') : channelI;
  const contact  = onContactChange  ? (contactProp ?? '')  : contactI;
  const submitted = submittedProp !== undefined ? submittedProp : submittedI;

  const setReason   = onReasonChange   || setReasonI;
  const setNote     = onNoteChange     || setNoteI;
  const setQuestion = onQuestionChange || setQuestionI;
  const setChannel  = onChannelChange  || setChannelI;
  const setContact  = onContactChange  || setContactI;

  const dialogRef = useRef(null);
  const groupRef = useRef(null);

  // Esc + focus-trap только на реальном маунте (не в embedded-canvas: много артбордов на странице)
  useEffect(() => {
    if (!isOpen || embedded) return;
    const node = dialogRef.current;
    const onKey = (e) => {
      if (e.key === 'Escape') { e.stopPropagation(); setOpen(false); return; }
      if (e.key !== 'Tab' || !node) return;
      const f = node.querySelectorAll('button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])');
      const list = Array.prototype.filter.call(f, el => !el.disabled && el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey, true);
    const t = setTimeout(() => { if (node) { const el = node.querySelector('input,textarea,button'); el && el.focus(); } }, 30);
    return () => { document.removeEventListener('keydown', onKey, true); clearTimeout(t); };
  }, [isOpen, embedded, mode]);

  if (!isOpen) return null;

  // ── submit ──
  const contactOk = contactValid(channel, contact);
  const doSubmit = (payload, withContact) => {
    if (submitting) return;
    if (typeof onSubmit === 'function') { onSubmit(payload); }
    else { setSubmittedI(true); } // canvas / uncontrolled mock
  };
  const submitBlocker = () => { if (!reason || !contactOk) return; const p = { mode: 'blocker', reason }; const n = (note || '').trim(); if (n) p.note = n; p.channel = channel; p.contact = (contact || '').trim(); doSubmit(p, true); };
  const submitPlain   = () => { if (!reason) return; const p = { mode: 'blocker', reason }; const n = (note || '').trim(); if (n) p.note = n; doSubmit(p, false); };
  const submitQuestion = () => { if (!(question || '').trim() || !contactOk) return; doSubmit({ mode: 'question', question: (question || '').trim(), channel, contact: (contact || '').trim() }, true); };

  // радио-навигация стрелками по причинам
  const onGroupKey = (e) => {
    const codes = reasons.map(r => r.code);
    const i = codes.indexOf(reason);
    if (['ArrowDown', 'ArrowRight'].includes(e.key)) { e.preventDefault(); setReason(codes[Math.min((i < 0 ? -1 : i) + 1, codes.length - 1)]); }
    else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); setReason(codes[Math.max((i < 0 ? codes.length : i) - 1, 0)]); }
  };

  // ── тело по режиму ──
  let inner;
  if (submitted) {
    inner = <Thanks mode={mode} channel={channel} contactSent={mode === 'question' ? true : !!(contact || '').trim()} onClose={() => setOpen(false)} />;
  } else if (mode === 'question') {
    const qOk = !!(question || '').trim() && contactOk;
    inner = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h2 className="fb2-h">Задать вопрос</h2>
          <p style={{ ...S.hint, marginTop: 6 }}>Спрашивайте что угодно про Самосайт — как это работает, сколько стоит, подойдёт ли вам.</p>
        </div>
        <textarea className="fb2-ta" value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ваш вопрос…" rows={mobile ? 4 : 3} aria-label="Вопрос" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          <span style={S.label}>Куда ответить</span>
          <ChannelChips channel={channel} onChannel={setChannel} />
          <ContactField channel={channel} value={contact} onChange={setContact} />
        </div>
        {error && <ErrorBanner />}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn--block" type="button" data-fb-cta="send-question" disabled={!qOk || submitting} onClick={submitQuestion} style={{ opacity: (!qOk || submitting) ? .5 : 1, cursor: (!qOk || submitting) ? 'not-allowed' : 'pointer' }}>
            {submitting ? <><Spinner /> Отправляем…</> : <>{COPY['question.cta']} <span className="arw">→</span></>}
          </button>
          <p className="fb2-sign">{COPY['question.sign']}</p>
        </div>
      </div>
    );
  } else {
    // blocker: A1 (вопрос + причины) → A2 (раскрытие после выбора)
    const blockerCtaOk = !!reason && contactOk;
    inner = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="fb2-h">{COPY['blocker.title']}</h2>
        <div ref={groupRef} role="radiogroup" aria-label={COPY['blocker.title']} onKeyDown={onGroupKey} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reasons.map((r, i) => <ReasonCard key={r.code} reason={r} active={reason === r.code} first={i === 0 && !reason} onSelect={setReason} mobile={mobile} />)}
        </div>

        {reason && (
          <div className="fb2-a2" style={{ display: 'flex', flexDirection: 'column', gap: 18, borderTop: '1px solid var(--line)', paddingTop: 18 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              <span style={S.label}>{COPY['blocker.note.label']}</span>
              <input style={S.input} value={note} onChange={e => setNote(e.target.value)} maxLength={200} placeholder="Необязательно" />
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, borderLeft: '3px solid var(--accent)', paddingLeft: 15 }}>
              <strong style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 20, lineHeight: 1.1, letterSpacing: '-.01em', color: 'var(--ink)' }}>{COPY['blocker.offer.title']}</strong>
              <ChannelChips channel={channel} onChannel={setChannel} />
              <ContactField channel={channel} value={contact} onChange={setContact} />
            </div>

            {error && <ErrorBanner />}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button className="btn btn--block" type="button" data-fb-cta="send-blocker" disabled={!blockerCtaOk || submitting} onClick={submitBlocker} style={{ opacity: (!blockerCtaOk || submitting) ? .5 : 1, cursor: (!blockerCtaOk || submitting) ? 'not-allowed' : 'pointer' }}>
                {submitting ? <><Spinner /> Отправляем…</> : <>{COPY['blocker.cta']} <span className="arw">→</span></>}
              </button>
              <button className="tlink" type="button" data-fb-cta="send-plain" disabled={submitting} onClick={submitPlain} style={{ alignSelf: 'center', fontWeight: 500, color: 'var(--ink-45)' }}>{COPY['blocker.skip']}</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── оболочка ──
  const outer = embedded
    ? { position: 'relative', height: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'center', background: 'transparent' }
    : { position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(27,23,18,.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', display: 'flex', alignItems: mobile ? 'flex-end' : 'center', justifyContent: 'center', padding: mobile ? 0 : '32px 20px' };
  const sheet = embedded
    ? { width: '100%', height: '100%', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }
    : { width: mobile ? '100%' : 'min(520px, calc(100vw - 40px))', maxHeight: mobile ? '94vh' : '90vh', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' };

  return (
    <div className={'fb2' + (embedded ? '' : ' fb2-enter')} style={outer} data-feedback-v2="" data-fb-mode={mode}
      onClick={embedded ? undefined : (e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <div ref={dialogRef} style={sheet} role="dialog" aria-modal={embedded ? undefined : 'true'} aria-label={mode === 'question' ? 'Задать вопрос' : COPY['blocker.title']}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 12px 0', flex: '0 0 auto' }}>
          <button className="ss-iconbtn" type="button" onClick={() => setOpen(false)} aria-label="Закрыть"><Icon d={['M18 6 6 18', 'm6 6 12 12']} size={20} sw={2} /></button>
        </div>
        <div style={{ padding: mobile ? '4px 18px 22px' : '2px 32px 28px', overflowY: 'auto', flex: 1 }}>{inner}</div>
      </div>
    </div>
  );
}

// ═════════ FeedbackV2Fab — постоянная кнопка режима B ═════════
function FeedbackV2Fab({ onClick, embedded }: FeedbackV2FabProps) {
  return (
    <button type="button" data-fb-fab="" onClick={onClick}
      className="fb2 fb2-fab"
      style={{ position: embedded ? 'absolute' : 'fixed', right: 24, bottom: 24, zIndex: 190 }}>
      <span style={{ display: 'inline-flex' }}><Icon d={['M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z']} size={18} sw={2} /></span>
      {COPY['question.fab']}
    </button>
  );
}

// ───────── стили (scoped .fb2, значения «Фарфор и лак») ─────────
const Fb2_CSS = ".fb2{--bone:#F2EEE6;--paper:#FBF9F4;--ink:#1B1712;--ink-70:#4C463C;--ink-45:#6E675A;--line:#E5DFD3;--line-2:#D6CEBE;--accent:#7A2B34;--accent-dk:#631F27;--on-accent:#FBF9F4;--display:'Sofia Sans Condensed',system-ui,sans-serif;--text:'Onest',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;font-family:var(--text);color:var(--ink);line-height:1.55;}"
  + ".fb2 *{box-sizing:border-box;border-radius:0;box-shadow:none;}"
  + ".fb2 h2,.fb2 h3,.fb2 p{margin:0;}"
  + ".fb2 button{font-family:inherit;}"
  + ".fb2 .fb2-h{font-family:var(--display);font-weight:700;font-size:27px;line-height:1.04;letter-spacing:-.01em;color:var(--ink);padding-right:8px;text-wrap:balance;}"
  + ".fb2 .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:52px;padding:0 24px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;border:none;cursor:pointer;transition:background .16s;}"
  + ".fb2 .btn:hover:not(:disabled){background:var(--accent-dk);}"
  + ".fb2 .btn--block{display:flex;width:100%;}"
  + ".fb2 .btn .arw{display:inline-block;transition:transform .16s;}.fb2 .btn:hover:not(:disabled) .arw{transform:translateX(4px);}"
  + ".fb2 .chip{display:inline-flex;align-items:center;height:40px;padding:0 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:600;font-size:14.5px;line-height:1;cursor:pointer;transition:background .14s,border-color .14s;}"
  + ".fb2 .chip:hover{border-color:var(--ink-45);}"
  + ".fb2 .chip.is-active{background:var(--accent);border-color:var(--accent);color:var(--paper);font-weight:700;}"
  + ".fb2 .rcard{display:flex;align-items:center;gap:13px;width:100%;text-align:left;padding:14px 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:500;line-height:1.3;cursor:pointer;transition:background .14s,border-color .14s;}"
  + ".fb2 .rcard:hover{border-color:var(--ink-45);}"
  + ".fb2 .rcard.is-active{border:1.5px solid var(--accent);background:var(--bone);font-weight:600;}"
  + ".fb2 .rdot{flex:0 0 auto;width:22px;height:22px;border-radius:50%;border:2px solid var(--line-2);background:#fff;display:inline-flex;align-items:center;justify-content:center;color:var(--on-accent);transition:background .14s,border-color .14s;}"
  + ".fb2 .rcard.is-active .rdot{background:var(--accent);border-color:var(--accent);}"
  + ".fb2 .tlink{background:none;border:none;cursor:pointer;color:var(--ink);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:3px;font:inherit;padding:4px 2px;}"
  + ".fb2 .tlink:hover:not(:disabled){color:var(--accent);text-decoration-color:var(--accent);}"
  + ".fb2 .tlink:disabled{opacity:.5;cursor:default;}"
  + ".fb2 .fb2-ta{width:100%;padding:13px 14px;border:1px solid var(--line-2);background:#fff;font:inherit;font-size:16px;color:var(--ink);outline:none;resize:vertical;min-height:84px;}"
  + ".fb2 .fb2-ta:focus{border-color:var(--ink-45);}"
  + ".fb2 .fb2-sign{font-size:13.5px;font-style:italic;color:var(--ink-45);text-align:center;text-wrap:pretty;}"
  + ".fb2 .ss-iconbtn{width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;color:var(--ink);background:none;border:none;cursor:pointer;transition:background .14s;}.fb2 .ss-iconbtn:hover{background:var(--bone);}"
  + ".fb2.fb2-fab{display:inline-flex;align-items:center;gap:9px;height:auto;padding:14px 20px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:14.5px;line-height:1;border:none;cursor:pointer;transition:background .16s;}"
  + ".fb2.fb2-fab:hover{background:var(--accent-dk);}"
  + "@keyframes fb2Reveal{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}"
  + "@keyframes fb2Enter{from{opacity:0}to{opacity:1}}"
  + "@keyframes fb2Spin{to{transform:rotate(360deg)}}"
  + ".fb2 .fb2-a2{animation:fb2Reveal .26s cubic-bezier(.2,.7,.2,1);}"
  + ".fb2.fb2-enter{animation:fb2Enter .18s ease;}"
  + ".fb2 .fb2-spin{animation:fb2Spin .8s linear infinite;}"
  + "@media (prefers-reduced-motion: reduce){.fb2 .fb2-a2,.fb2.fb2-enter{animation:none;}.fb2 .btn .arw{transition:none;}}";

function Fb2_Styles() { return React.createElement('style', { 'data-samosite-canon-fb2': '0.13', dangerouslySetInnerHTML: { __html: Fb2_CSS } }); }

export { FeedbackV2Modal, FeedbackV2Fab, REASONS, CHANNELS, COPY, Fb2_CSS, Fb2_Styles, contactValid, formatPhone };
