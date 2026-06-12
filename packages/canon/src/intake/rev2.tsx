'use client';

// @samosite/canon · intake/rev2 · 0.11.0
//
// Rev.2 «ниша-демо» — вход ДО ссылки (CANON_INSTANT_PREVIEW_REV2_TZ):
//
//   Шаг 0 «Ниша» (S3_StepNiche)  → тап по плашке
//   Шаг 0b «Пример»              → S3_StepPreview variant="demo" (preview.tsx)
//   Шаг 1 «Источник» (S3_StepSource) → поиск по названию (вход A, приоритет)
//                                      / ссылка (вход B) / фото (вход C)
//   Шаг 2 «Сборка-морф»          → S3_StepBuilding baseDraft={…} (preview.tsx)
//
// Принцип: показывать раньше, чем просить. Пример рендерится на клиенте
// из NICHE_DEMO_DRAFTS за 0 секунд — никаких сетевых вызовов внутри канона.
//
// Все компоненты controlled (паттерн 0.3.0/0.9.1): zero-prop = canvas-mock.
// Доты прогресса: шаги 0/0b их НЕ имеют (витрина, не воронка); появляются с шага 1.

import React from 'react';
import { VT, BRAND } from '../tokens';
import { Mono, Btn, IconArrow, Spinner } from '../primitives';
import type { PreviewDraft } from './preview';

// ─────────────────────────────────────────────────────────────
// CONTRACT · NicheItem + NICHE_LIB (frozen, ТЗ rev.2 §6)

export interface NicheItem {
  id: string;                 // 'manicure' | 'brows' | …
  label: string;              // «Маникюр»
  synonyms: string[];         // матчинг свободного поля
  theme_id: string;           // тема по умолчанию
  family_id: string;
  theme_options: string[];    // 2–3 theme_id для свотчей
}

export const NICHE_LIB: NicheItem[] = [
  { id: 'manicure', label: 'Маникюр',           synonyms: ['ногти', 'гель-лак', 'педикюр', 'нейл'],                  theme_id: 'display-soft',      family_id: 'display', theme_options: ['display-soft', 'stacked-cream', 'bento-clay'] },
  { id: 'brows',    label: 'Брови и ресницы',   synonyms: ['брови', 'ресницы', 'ламинирование', 'наращивание'],      theme_id: 'display-bold',      family_id: 'display', theme_options: ['display-bold', 'display-soft', 'bento-clay'] },
  { id: 'barber',   label: 'Барбершоп',         synonyms: ['барбер', 'борода'],                                       theme_id: 'display-noir',      family_id: 'display', theme_options: ['display-noir', 'bento-noir', 'stacked-slate'] },
  { id: 'hair',     label: 'Парикмахерская',    synonyms: ['стрижка', 'парикмахер', 'окрашивание', 'волосы'],        theme_id: 'stacked-cream',     family_id: 'stacked', theme_options: ['stacked-cream', 'display-soft', 'editorial-warm'] },
  { id: 'cosmetic', label: 'Косметолог',        synonyms: ['косметология', 'чистка лица', 'уход за кожей', 'визаж'], theme_id: 'bento-clay',        family_id: 'bento',   theme_options: ['bento-clay', 'display-soft', 'editorial-warm'] },
  { id: 'massage',  label: 'Массаж',            synonyms: ['массаж', 'спа', 'остеопат'],                              theme_id: 'split-product',     family_id: 'split',   theme_options: ['split-product', 'split-teal', 'stacked-cream'] },
  { id: 'tattoo',   label: 'Тату',              synonyms: ['тату', 'татуировка', 'пирсинг'],                          theme_id: 'display-ink',       family_id: 'display', theme_options: ['display-ink', 'bento-noir', 'editorial-mono'] },
  { id: 'photo',    label: 'Фотограф',          synonyms: ['фото', 'фотосессия', 'съёмка', 'видеограф'],             theme_id: 'split-teal',        family_id: 'split',   theme_options: ['split-teal', 'editorial-mono', 'bento-light'] },
  { id: 'psy',      label: 'Психолог',          synonyms: ['психолог', 'терапия', 'психотерапевт', 'коуч'],          theme_id: 'stacked-corporate', family_id: 'stacked', theme_options: ['stacked-corporate', 'editorial-mono', 'bento-light'] },
  { id: 'electric', label: 'Электрик и ремонт', synonyms: ['электрик', 'сантехник', 'ремонт', 'мастер', 'монтаж'],   theme_id: 'bento-noir',        family_id: 'bento',   theme_options: ['bento-noir', 'stacked-slate', 'split-product'] },
];

/** Матчинг свободного поля по словарю синонимов. null → generic (editorial). */
export function matchNiche(freeText: string): NicheItem | null {
  if (!freeText) return null;
  const q = freeText.trim().toLowerCase();
  if (!q) return null;
  return NICHE_LIB.find((n) =>
    n.label.toLowerCase().includes(q) || q.includes(n.label.toLowerCase()) ||
    n.synonyms.some((s) => q.includes(s) || s.includes(q))
  ) || null;
}

// ─────────────────────────────────────────────────────────────
// Demo-фикстуры · PreviewDraft на нишу — рендер примера за 0 c, без сети.
// Тот же контракт, что у боевого черновика, поэтому 0b → морф → превью
// работают на ОДНОМ chassis без размонтирования (ТЗ §5).

const U = (id: string, w = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const NICHE_DEMO_DRAFTS: Record<string, PreviewDraft> = {
  manicure: {
    source: 'yandex_maps', name: 'Студия Анны', category: 'Маникюр', district: 'Петроградский район',
    rating: { value: 4.9, count: 67 },
    photos: [U('photo-1604654894610-df63bc536371'), U('photo-1610992015732-2449b76344bc', 480), U('photo-1632345031435-8727f6897d53', 480)],
    reviews: [{ author: 'Олеся Н.', text: 'Анна спокойная, объясняет, что делает. Никогда не было сколов', rating: 5 }],
    services: [
      { title: 'Маникюр + покрытие', price: '2 400 ₽' },
      { title: 'Снятие чужого покрытия', price: '500 ₽' },
      { title: 'Укрепление акригелем', price: '600 ₽' },
      { title: 'Дизайн на 2 ногтя', price: '300 ₽' },
    ],
    theme_id: 'display-soft', family_id: 'display',
  },
  brows: {
    source: 'yandex_maps', name: 'Brow-бар Алисы', category: 'Брови и ресницы', district: 'Центральный район',
    rating: { value: 4.9, count: 54 },
    photos: [U('photo-1560869713-7d0a29430803')],
    reviews: [{ author: 'Кира М.', text: 'Форму подобрали с первого раза, держится месяц', rating: 5 }],
    services: [
      { title: 'Коррекция и окрашивание', price: '1 600 ₽' },
      { title: 'Ламинирование бровей', price: '2 200 ₽' },
      { title: 'Ламинирование ресниц', price: '2 500 ₽' },
    ],
    theme_id: 'display-bold', family_id: 'display',
  },
  barber: {
    source: 'yandex_maps', name: 'Барбершоп «Фёдор»', category: 'Барбершоп', district: 'Басманный район',
    rating: { value: 4.8, count: 211 },
    photos: [U('photo-1503951914875-452162b0f3f1')],
    reviews: [{ author: 'Игорь С.', text: 'Стригусь два года, ни разу не пришлось объяснять дважды', rating: 5 }],
    services: [
      { title: 'Стрижка', price: '1 700 ₽' },
      { title: 'Борода', price: '1 100 ₽' },
      { title: 'Комплекс', price: '2 500 ₽' },
    ],
    theme_id: 'display-noir', family_id: 'display',
  },
  hair: {
    source: 'yandex_maps', name: 'Салон «Локон»', category: 'Парикмахерская', district: 'Адмиралтейский район',
    rating: { value: 4.8, count: 154 },
    photos: [U('photo-1560066984-138dadb4c035')],
    reviews: [{ author: 'Вера С.', text: 'Пришла с фото из интернета — ушла с этой же головой. Первый раз так', rating: 5 }],
    services: [
      { title: 'Женская стрижка', price: '1 800 ₽' },
      { title: 'Мужская стрижка', price: '1 200 ₽' },
      { title: 'Окрашивание в один тон', price: 'от 4 500 ₽' },
      { title: 'Укладка', price: '1 500 ₽' },
    ],
    theme_id: 'stacked-cream', family_id: 'stacked',
  },
  cosmetic: {
    source: 'yandex_maps', name: 'Кабинет Юлии Мирной', category: 'Косметолог', district: 'Тверской район',
    rating: { value: 4.9, count: 92 },
    photos: [U('photo-1570172619644-dfd03ed5d881')],
    reviews: [{ author: 'Ольга Т.', text: 'Юлия не продаёт лишнего: половину моих банок отправила в мусор, кожа сказала спасибо', rating: 5 }],
    services: [
      { title: 'Комбинированная чистка', price: '3 500 ₽' },
      { title: 'Пилинг курсом', price: 'от 2 800 ₽' },
      { title: 'Уход по типу кожи', price: '3 200 ₽' },
      { title: 'Массаж лица', price: '2 400 ₽' },
    ],
    theme_id: 'bento-clay', family_id: 'bento',
  },
  massage: {
    source: 'yandex_maps', name: 'Студия массажа «Тонус»', category: 'Массаж', district: 'Московский район',
    rating: { value: 4.9, count: 76 },
    photos: [U('photo-1544161515-4ab6ce6db874')],
    reviews: [{ author: 'Дмитрий К.', text: 'Спина перестала ныть после третьего сеанса, хожу раз в две недели', rating: 5 }],
    services: [
      { title: 'Классический массаж спины', price: '2 200 ₽' },
      { title: 'Общий массаж, 90 минут', price: '3 800 ₽' },
      { title: 'Спортивное восстановление', price: '2 900 ₽' },
    ],
    theme_id: 'split-product', family_id: 'split',
  },
  tattoo: {
    source: 'yandex_maps', name: 'Студия «Линия»', category: 'Тату', district: 'Таганский район',
    rating: { value: 5.0, count: 63 },
    photos: [U('photo-1565058379802-bbe93b2f703a')],
    reviews: [{ author: 'Дарья Л.', text: 'Нарисовали именно то, что я хотела, но не могла объяснить. Линии тонкие, не расплылись', rating: 5 }],
    services: [
      { title: 'Мини-эскиз до 5 см', price: '5 000 ₽' },
      { title: 'Средний 5–15 см', price: 'от 12 000 ₽' },
      { title: 'Час работы', price: '8 000 ₽' },
    ],
    theme_id: 'display-ink', family_id: 'display',
  },
  photo: {
    source: 'yandex_maps', name: 'Марта Климова', category: 'Фотограф', district: 'Хамовники',
    rating: { value: 5.0, count: 41 },
    photos: [U('photo-1452587925148-ce544e77e70d')],
    reviews: [{ author: 'Анна В.', text: 'Сняла нашу свадьбу так, что родители плакали над альбомом. Дважды', rating: 5 }],
    services: [
      { title: 'Часовая съёмка', price: '7 000 ₽' },
      { title: 'Семейная фотосессия', price: '9 500 ₽' },
      { title: 'Свадебный день', price: 'от 35 000 ₽' },
    ],
    theme_id: 'split-teal', family_id: 'split',
  },
  psy: {
    source: 'yandex_maps', name: 'Дмитрий Ланской', category: 'Психолог', district: 'Басманный район',
    rating: { value: 5.0, count: 47 },
    photos: [U('photo-1573497620053-ea5300f94f21')],
    reviews: [{ author: 'анонимный отзыв', text: 'Через два месяца я перестала просыпаться в 4 утра от тревоги. Лучшее, что я сделала для себя', rating: 5 }],
    services: [
      { title: 'Разовая сессия', price: '4 000 ₽' },
      { title: 'Пакет 4 сессии', price: '14 400 ₽' },
      { title: 'Онлайн-сессия', price: '3 500 ₽' },
    ],
    theme_id: 'stacked-corporate', family_id: 'stacked',
  },
  electric: {
    source: 'yandex_maps', name: 'Электрик Сергей', category: 'Электрик и ремонт', district: 'Калининский район',
    rating: { value: 4.8, count: 89 },
    photos: [U('photo-1621905251918-48416bd8575a')],
    reviews: [{ author: 'Павел Н.', text: 'Приехал в тот же день, нашёл проводку под штукатуркой без вскрытия всей стены', rating: 5 }],
    services: [
      { title: 'Выезд и осмотр', price: '0 ₽' },
      { title: 'Срочный ремонт', price: 'от 1 500 ₽' },
      { title: 'Монтаж под ключ', price: 'по смете' },
    ],
    theme_id: 'bento-noir', family_id: 'bento',
  },
};

/**
 * Demo-черновик для шага 0b: по id ниши, либо по свободному полю.
 * Свободное поле без матча → generic: editorial-тема, введённое слово
 * становится подписью категории (обрезка 24 символа, первая буква заглавная).
 */
export function demoDraftFor(nicheId: string | null, freeText?: string): { draft: PreviewDraft; niche: NicheItem | null; nicheLabel: string } {
  const niche = nicheId ? NICHE_LIB.find((n) => n.id === nicheId) || null : matchNiche(freeText || '');
  if (niche) {
    return { draft: NICHE_DEMO_DRAFTS[niche.id], niche, nicheLabel: niche.label };
  }
  const raw = (freeText || 'Ваше дело').trim().slice(0, 24);
  const label = raw.charAt(0).toUpperCase() + raw.slice(1);
  const generic: PreviewDraft = {
    ...NICHE_DEMO_DRAFTS.psy,
    category: label,
    theme_id: 'editorial-mono', family_id: 'editorial',
  };
  return { draft: generic, niche: null, nicheLabel: label };
}

export const GENERIC_THEME_OPTIONS = ['editorial-mono', 'editorial-warm', 'stacked-slate'];

// ─────────────────────────────────────────────────────────────
// CONTRACT · SourceCandidate (frozen, ТЗ rev.2 §6/§7)

export interface SourceCandidate {
  id: string;                      // opaque, уходит в POST /api/preview/draft
  name: string;
  address: string;
  rating: { value: number; count: number } | null;
  photo: string | null;
}

export const mockSourceCandidates: SourceCandidate[] = [
  { id: 'cand-1', name: 'Студия маникюра Анны', address: 'Большой пр. П.С., 32, Санкт-Петербург', rating: { value: 4.9, count: 38 }, photo: U('photo-1604654894610-df63bc536371', 160) },
  { id: 'cand-2', name: 'Anna Nails', address: 'Ленинский пр., 84, Санкт-Петербург', rating: { value: 4.7, count: 12 }, photo: null },
  { id: 'cand-3', name: 'Маникюр у Анны', address: 'ул. Савушкина, 7, Санкт-Петербург', rating: null, photo: null },
];

// ─────────────────────────────────────────────────────────────
// Local UI bits (модалка/шапка — локальные копии паттерна preview.tsx,
// чтобы не плодить кросс-импорты; photo-ветка остаётся byte-identical)

const R2_KEYFRAMES = `
@keyframes ssr-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
@keyframes ssr-shimmer { 0%, 100% { opacity: 0.55 } 50% { opacity: 0.25 } }
`;

function R2Shell({ children, width = 560, mobile = false }: { children: React.ReactNode; width?: number; mobile?: boolean }) {
  if (mobile) {
    return (
      <div style={{ width: '100%', minHeight: '100%', background: VT.bg, fontFamily: VT.font.sans, position: 'relative' }}>
        <style>{R2_KEYFRAMES}</style>
        <div style={{ padding: '18px 16px 28px', position: 'relative' }}>
          <button aria-label="Закрыть" style={{
            position: 'absolute', top: 10, right: 12, width: 32, height: 32, borderRadius: 999,
            background: VT.bgSoft, border: `1px solid ${VT.line}`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: VT.inkSoft, fontSize: 18, zIndex: 2,
          }}>×</button>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div style={{
      background: 'rgba(0,0,0,0.32)', minHeight: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24, fontFamily: VT.font.sans,
    }}>
      <style>{R2_KEYFRAMES}</style>
      <div style={{
        width, maxWidth: '100%', background: VT.bg,
        borderRadius: VT.r.xl, boxShadow: VT.shadow.pop,
        padding: 28, position: 'relative',
      }}>
        <button aria-label="Закрыть" style={{
          position: 'absolute', top: 14, right: 14, width: 32, height: 32, borderRadius: 999,
          background: VT.bgSoft, border: `1px solid ${VT.line}`,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: VT.inkSoft, fontSize: 18,
        }}>×</button>
        {children}
      </div>
    </div>
  );
}

function R2Header({ activeDot, title, sub, onBack }: { activeDot?: number; title: string; sub?: React.ReactNode; onBack?: () => void }) {
  return (
    <>
      {(onBack || activeDot) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          {onBack && (
            <button onClick={onBack} style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 10px 4px 4px', borderRadius: 999,
              background: VT.bgSoft, border: `1px solid ${VT.line}`,
              cursor: 'pointer', fontFamily: VT.font.sans, fontSize: 12, fontWeight: 500, color: VT.inkSoft,
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 6l-6 6 6 6"/></svg>
              Назад
            </button>
          )}
          {activeDot != null && (
            <>
              <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ШАГ {activeDot}/4</Mono>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} style={{ width: 28, height: 4, borderRadius: 2, background: i < activeDot ? VT.accent : VT.line }} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2, textWrap: 'balance' }}>{title}</h2>
      {sub && <p style={{ fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }}>{sub}</p>}
    </>
  );
}

function R2Label({ children }: { children: React.ReactNode }) {
  return <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: VT.ink, marginBottom: 6, fontFamily: VT.font.sans }}>{children}</label>;
}

function R2Input({ value, placeholder, onChange }: { value: string; placeholder: string; onChange?: (v: string) => void }) {
  return (
    <input value={value} placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '13px 15px', background: VT.white,
        border: `1.5px solid ${value ? VT.accent : VT.line}`,
        borderRadius: VT.r.md, outline: 'none',
        fontSize: 14.5, fontFamily: VT.font.sans, color: VT.ink,
      }} />
  );
}

function R2TextLink({ children, onClick, block = false }: { children: React.ReactNode; onClick?: () => void; block?: boolean }) {
  return (
    <button onClick={onClick} style={{
      display: 'block', width: block ? '100%' : undefined, textAlign: block ? 'left' : 'center',
      margin: block ? 0 : '12px auto 0', padding: block ? '9px 0' : 0,
      borderTop: block ? `1px solid ${VT.lineSoft}` : 'none',
      background: 'transparent', border: block ? undefined : 'none',
      borderLeft: 'none', borderRight: 'none', borderBottom: 'none',
      fontFamily: VT.font.sans, fontSize: 13.5, color: VT.inkSoft,
      cursor: 'pointer', lineHeight: 1.45,
      textDecoration: block ? 'none' : 'underline', textUnderlineOffset: 3,
    }}>{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// ШАГ 0 · S3_StepNiche (niche-pick)

export interface S3_StepNicheProps {
  niches?: NicheItem[];                       // default NICHE_LIB
  freeText?: string;
  onFreeTextChange?: (v: string) => void;
  onPick?: (nicheId: string) => void;
  onShowExample?: (freeText: string) => void; // Enter в поле = клик по кнопке
  mobile?: boolean;
}

export function S3_StepNiche({
  niches = NICHE_LIB,
  freeText = '',
  onFreeTextChange,
  onPick,
  onShowExample,
  mobile = false,
}: S3_StepNicheProps) {
  return (
    <R2Shell width={640} mobile={mobile}>
      <div data-intake-step="niche">
        <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.025em', margin: '0 0 8px', lineHeight: 1.2, textWrap: 'balance', paddingRight: 36 }}>
          Чем занимаетесь?
        </h2>
        <p style={{ fontSize: 14.5, color: VT.inkSoft, lineHeight: 1.5, margin: 0 }}>
          Покажем, как будет выглядеть ваш сайт. Бесплатно и без ваших данных
        </p>

        <div style={{ display: 'grid', gap: 8, marginTop: 18, gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(5, 1fr)' }}>
          {niches.map((n) => (
            <button key={n.id} data-niche-id={n.id} onClick={() => onPick?.(n.id)} style={{
              minHeight: 48, padding: '10px 8px',
              background: VT.white, border: `1px solid ${VT.line}`, borderRadius: VT.r.md,
              fontFamily: VT.font.sans, fontSize: 13.5, fontWeight: 600, color: VT.ink,
              cursor: 'pointer', lineHeight: 1.25, textWrap: 'balance',
            }}>{n.label}</button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 14, flexDirection: mobile ? 'column' : 'row' }}>
          <div style={{ flex: 1, minWidth: 0 }}
            onKeyDown={(e) => { if (e.key === 'Enter' && freeText) onShowExample?.(freeText); }}>
            <R2Input value={freeText} placeholder="Другое: кондитер, репетитор, клининг…" onChange={onFreeTextChange} />
          </div>
          <Btn variant="soft" style={{ flex: '0 0 auto', opacity: freeText ? 1 : 0.6 }}
            onClick={() => freeText && onShowExample?.(freeText)}>
            Показать пример
          </Btn>
        </div>
      </div>
    </R2Shell>
  );
}

// ─────────────────────────────────────────────────────────────
// ШАГ 1 · S3_StepSource (source-idle/-searching/-results/-empty/-error/-ratelimited + link)

export type SourceSearchError = 'none' | 'empty' | 'network' | 'ratelimited';

const LINK_SOURCE_LABELS: Record<string, string> = {
  yandex_maps: 'Яндекс.Карты', telegram: 'Telegram-канал', twogis: '2ГИС',
  avito: 'Avito-профиль', instagram: 'Instagram-профиль', website: 'Свой сайт',
};

export interface S3_StepSourceProps {
  mode?: 'search' | 'link';
  // вход A · поиск
  query?: string; city?: string;
  onQueryChange?: (v: string) => void;
  onCityChange?: (v: string) => void;
  searching?: boolean;
  candidates?: SourceCandidate[] | null;     // null = ещё не искали
  searchError?: SourceSearchError;
  retryAfterSeconds?: number;                // живой отсчёт — на консьюмере
  onSearch?: () => void;
  onPickCandidate?: (id: string) => void;
  onNotMine?: () => void;                    // «Здесь нет моего дела» → фокус в поле, запрос сохранён
  // вход B · ссылка — текущие пропсы линк-инпута rev.1 как есть
  url?: string;
  source?: string | null;                    // бейдж ok рисуем здесь; soon/unknown — маршрут rev.1
  counts?: string | null;
  onUrlChange?: (v: string) => void;
  onBuild?: () => void;                      // «Собрать черновик» (бейдж ok)
  // навигация
  onSwitchMode?: (m: 'search' | 'link') => void;
  onPhotoBranch?: () => void;
  onBack?: () => void;
  mobile?: boolean;
}

function ratingLine(rating: SourceCandidate['rating']): string | null {
  if (!rating) return null;
  const m10 = rating.count % 10, m100 = rating.count % 100;
  const word = (m10 === 1 && m100 !== 11) ? 'отзыв'
    : (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) ? 'отзыва' : 'отзывов';
  return `${String(rating.value).replace('.', ',')} ★ · ${rating.count} ${word}`;
}

function CandidateCard({ cand, idx, onPick }: { cand: SourceCandidate; idx: number; onPick?: () => void }) {
  const line = ratingLine(cand.rating);
  return (
    <button data-candidate-idx={idx} onClick={onPick} style={{
      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
      padding: '12px 14px', background: VT.white,
      border: `1px solid ${VT.line}`, borderRadius: VT.r.md,
      cursor: 'pointer', textAlign: 'left', fontFamily: VT.font.sans,
    }}>
      {cand.photo ? (
        <img src={cand.photo} alt="" style={{ width: 44, height: 44, borderRadius: VT.r.sm, objectFit: 'cover', flex: '0 0 auto' }} />
      ) : (
        <span style={{
          width: 44, height: 44, borderRadius: VT.r.sm, flex: '0 0 auto',
          background: VT.accentSoft, color: VT.accentInk,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 700,
        }}>{cand.name.charAt(0)}</span>
      )}
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: 14.5, fontWeight: 600, color: VT.ink, lineHeight: 1.3 }}>{cand.name}</span>
        <span style={{ fontSize: 12.5, color: VT.inkSoft, lineHeight: 1.35 }}>{cand.address}</span>
        {line && <span style={{ fontFamily: VT.font.mono, fontSize: 11.5, color: VT.inkFaint, fontVariantNumeric: 'tabular-nums', marginTop: 1 }}>{line}</span>}
      </span>
      <span style={{ color: VT.inkFaint, fontSize: 16, flex: '0 0 auto' }}>→</span>
    </button>
  );
}

function SkeletonCandidate() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 14px', background: VT.white,
      border: `1px solid ${VT.lineSoft}`, borderRadius: VT.r.md,
    }}>
      <span style={{ width: 44, height: 44, borderRadius: VT.r.sm, background: VT.bgSoft, animation: 'ssr-shimmer 1.4s ease-in-out infinite', flex: '0 0 auto' }} />
      <span style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 7 }}>
        <span style={{ display: 'block', width: '52%', height: 11, borderRadius: 3, background: VT.line, animation: 'ssr-shimmer 1.4s ease-in-out infinite' }} />
        <span style={{ display: 'block', width: '74%', height: 9, borderRadius: 3, background: VT.lineSoft, animation: 'ssr-shimmer 1.4s ease-in-out infinite' }} />
      </span>
    </div>
  );
}

function SearchStateNote({ tone, title, body, primary, onPrimary, ghost, onGhost, link, onLink }: {
  tone: 'warn' | 'info'; title: string; body: string;
  primary?: string; onPrimary?: () => void;
  ghost?: string; onGhost?: () => void;
  link?: string; onLink?: () => void;
}) {
  const bg = tone === 'warn' ? VT.warnSoft : VT.infoSoft;
  const fg = tone === 'warn' ? 'oklch(0.42 0.13 70)' : 'oklch(0.36 0.10 240)';
  return (
    <div style={{ marginTop: 14, padding: '16px 16px 18px', background: bg, borderRadius: VT.r.md }}>
      <div style={{ fontSize: 15, fontWeight: 700, color: fg, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.5, color: fg }}>{body}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        {primary && <Btn size="sm" onClick={onPrimary}>{primary}</Btn>}
        {ghost && <Btn size="sm" variant="secondary" onClick={onGhost}>{ghost}</Btn>}
      </div>
      {link && (
        <button onClick={onLink} style={{
          display: 'block', marginTop: 10, padding: 0,
          background: 'transparent', border: 'none', color: fg,
          fontSize: 12.5, cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: 3, fontFamily: VT.font.sans,
        }}>{link}</button>
      )}
    </div>
  );
}

export function S3_StepSource({
  mode = 'search',
  query = '', city = '',
  onQueryChange, onCityChange,
  searching = false,
  candidates = null,
  searchError = 'none',
  retryAfterSeconds = 59,
  onSearch, onPickCandidate, onNotMine,
  url = '', source = null, counts = null,
  onUrlChange, onBuild,
  onSwitchMode, onPhotoBranch, onBack,
  mobile = false,
}: S3_StepSourceProps) {
  const canSearch = !!query && !searching && searchError !== 'ratelimited';

  const searchBody = (
    <>
      <div style={{ display: 'flex', gap: 8, marginTop: 18, flexDirection: mobile ? 'column' : 'row' }}>
        <div style={{ flex: mobile ? 'none' : '1 1 70%', minWidth: 0 }}>
          <R2Label>Название вашего дела</R2Label>
          <R2Input value={query} placeholder="Студия маникюра Анны" onChange={onQueryChange} />
        </div>
        <div style={{ flex: mobile ? 'none' : '1 1 30%', minWidth: 0 }}>
          <R2Label>Город</R2Label>
          <R2Input value={city} placeholder="Санкт-Петербург" onChange={onCityChange} />
        </div>
      </div>

      <div style={{ marginTop: 14 }}>
        <Btn style={{ width: '100%', opacity: canSearch ? 1 : 0.55 }}
          onClick={canSearch ? onSearch : undefined}
          iconRight={searching ? <Spinner size={15} /> : <IconArrow />}>
          Найти на Картах
        </Btn>
        {searchError === 'ratelimited' ? (
          <div style={{ marginTop: 8, fontSize: 12.5, color: VT.inkSoft, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>
            Слишком много запросов. Поиск снова доступен через 0:{String(retryAfterSeconds).padStart(2, '0')}
          </div>
        ) : (
          <div style={{ marginTop: 8, fontSize: 12.5, color: VT.inkFaint, textAlign: 'center' }}>
            Ищем только по открытым данным Яндекс.Карт
          </div>
        )}
      </div>

      {searching && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 14 }}>
          <SkeletonCandidate /><SkeletonCandidate />
        </div>
      )}

      {!searching && candidates && candidates.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: VT.ink, marginBottom: 8 }}>Это вы?</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {candidates.slice(0, 3).map((c, i) => (
              <CandidateCard key={c.id} cand={c} idx={i} onPick={() => onPickCandidate?.(c.id)} />
            ))}
          </div>
          <R2TextLink onClick={onNotMine}>Здесь нет моего дела</R2TextLink>
        </div>
      )}

      {!searching && searchError === 'empty' && (
        <SearchStateNote tone="warn"
          title="Не нашли на Картах"
          body="Проверьте название или попробуйте другой способ"
          primary="Искать ещё раз" onPrimary={onNotMine}
          ghost="Вставить ссылку" onGhost={() => onSwitchMode?.('link')}
          link="Собрать из фото →" onLink={onPhotoBranch} />
      )}
      {!searching && searchError === 'network' && (
        <SearchStateNote tone="info"
          title="Карты не отвечают"
          body="Такое бывает. Попробуйте ещё раз или вставьте ссылку"
          primary="Повторить поиск" onPrimary={onSearch}
          ghost="Вставить ссылку" onGhost={() => onSwitchMode?.('link')} />
      )}

      <div style={{ marginTop: 18 }}>
        <R2TextLink block onClick={() => onSwitchMode?.('link')}>Есть ссылка на Telegram, Я.Карты или сайт? Вставьте её →</R2TextLink>
        <R2TextLink block onClick={onPhotoBranch}>Нет страницы в интернете? Соберём из фото →</R2TextLink>
      </div>
    </>
  );

  const linkBody = (
    <>
      <div style={{ marginTop: 18 }}>
        <R2Label>Ссылка</R2Label>
        <R2Input value={url} placeholder="https://yandex.ru/maps/…" onChange={onUrlChange} />
      </div>
      {source && LINK_SOURCE_LABELS[source] && (
        <div style={{
          marginTop: 10, padding: '12px 14px',
          background: VT.successSoft, borderRadius: VT.r.md,
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13.5, color: 'oklch(0.32 0.12 145)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l4 4 10-10"/></svg>
          <span>Распознали: <b>{LINK_SOURCE_LABELS[source]}</b>{counts ? <span style={{ color: 'oklch(0.42 0.11 145)' }}> · {counts}</span> : null}</span>
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <Btn style={{ width: '100%', opacity: url ? 1 : 0.55 }} iconRight={<IconArrow />} onClick={url ? onBuild : undefined}>
          Собрать черновик
        </Btn>
      </div>
      <div style={{ marginTop: 14 }}>
        <R2TextLink block onClick={() => onSwitchMode?.('search')}>Найти по названию →</R2TextLink>
      </div>
    </>
  );

  return (
    <R2Shell width={560} mobile={mobile}>
      <div data-intake-step="source">
        {mode === 'search' ? (
          <R2Header activeDot={1} onBack={onBack}
            title="Найдём ваше дело"
            sub={`${BRAND.name} возьмёт фото, цены и отзывы оттуда, где они уже есть`} />
        ) : (
          <R2Header activeDot={1} onBack={onBack}
            title="Вставьте ссылку"
            sub="Telegram-канал, Яндекс.Карты, 2ГИС, Avito или ваш сайт" />
        )}
        {mode === 'search' ? searchBody : linkBody}
      </div>
    </R2Shell>
  );
}
