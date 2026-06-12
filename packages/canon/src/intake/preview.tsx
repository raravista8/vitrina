'use client';

// @samosite/canon · intake/preview · 0.11.0
//
// «Сайт до контакта» — мгновенный превью черновика в link-ветке SubmitModal.
//
//   Шаг 1 (ссылка) → Шаг 2 «Сборка» (S3_StepBuilding, 15–40 c, живой прогресс)
//                  → Шаг 2 «Превью» (S3_StepPreview, тот же дот — статус ready)
//                  → Шаг 3 (контакт) → Шаг 4 (подтверждение)
//
// Прогресс-доты: 4 видимых шага. Сборка и превью — ОДИН дот «Превью»;
// сборка — его loading-состояние (пульс).
//
// 0.11.0 · rev.2 «ниша-демо» (additive): S3_StepPreview получил variant='demo'
// (шаг 0b «Пример»: штамп ПРИМЕР, без дотов), S3_StepBuilding — baseDraft
// (морф «пример → черновик», ТЗ rev.2 §5: тот же chassis, слоты подменяются).
// Вход по нише и поиск по названию — ./rev2.tsx (S3_StepNiche, S3_StepSource).
//
// Контракт PreviewDraft — ЗАМОРОЖЕН (ТЗ §6). Бэкенд строится по нему
// параллельно. Поля сверх контракта — только через явное согласование.
//
// Рендер превью — строго через существующий PresetRenderer (0.7.1+):
// draftToSlotContent() — чистый маппер PreviewDraft → SlotContent.
// Нового рендерера сайтов здесь НЕТ.
//
// Все компоненты controlled (паттерн 0.3.0/0.9.1): zero-prop = canvas-mock,
// сеть и state — на консьюмере, внутри никаких вызовов.

import React from 'react';
import { VT, BRAND } from '../tokens';
import { Mono, Btn, IconArrow, Spinner } from '../primitives';
import { PresetRenderer, MiniChrome, getTheme } from '../presets';
import type { SlotContent, Preset } from '../presets';

// ─────────────────────────────────────────────────────────────
// CONTRACT · PreviewDraft (frozen, ТЗ §6)

export type PreviewSource = 'yandex_maps' | 'telegram' | 'twogis' | 'avito' | 'website';

export interface PreviewDraft {
  source: PreviewSource;
  name: string;                      // всегда есть (иначе preview-failed)
  category: string | null;           // ниша; null → generic-тема
  district: string | null;           // «Петроградский район» / null
  rating: { value: number; count: number } | null;
  photos: string[];                  // URL, 0..9; <3 → preview-sparse
  reviews: { author: string; text: string; rating: number }[]; // 0..4, сырые
  services: { title: string; price: string | null }[];         // 0..6
  theme_id: string;                  // авто-подбор бэкендом, из 16 существующих
  family_id: string;                 // одно из 5 семейств
}

export type BuildStage = 'fetching' | 'photos' | 'reviews' | 'styling';
export type BuildStatus = 'building' | 'ready' | 'failed';

export interface BuildCounts { photos: number; reviews: number }

/** Shape of the consumer's poll response (документация контракта, сеть — на консьюмере). */
export interface BuildPollResponse {
  status: BuildStatus;
  stage: BuildStage;
  counts: BuildCounts;
  draft?: PreviewDraft;
}

// ─────────────────────────────────────────────────────────────
// Niche dictionary — шаблонные тексты превью (БЕЗ LLM в синхронном пути).
// LLM-тексты приходят позже, в полной сборке.

interface NicheCopy {
  flavorLine: string;        // третья строка заголовка
  menuEyebrow: string;
  ctaLabel: string;
  fallbackServices: { title: string }[];
}

const NICHE_GENERIC: NicheCopy = {
  flavorLine: 'рядом с вами',
  menuEyebrow: 'Услуги и цены',
  ctaLabel: 'Записаться',
  fallbackServices: [
    { title: 'Основная услуга' },
    { title: 'Консультация' },
    { title: 'Выезд на место' },
  ],
};

const NICHES: { match: RegExp; copy: NicheCopy }[] = [
  { match: /маникюр|ногт|бьюти|салон|брови|ресниц|космет|визаж/i, copy: {
    flavorLine: 'по записи',
    menuEyebrow: 'Прайс',
    ctaLabel: 'Записаться',
    fallbackServices: [{ title: 'Маникюр с покрытием' }, { title: 'Коррекция' }, { title: 'Дизайн' }],
  } },
  { match: /кофе|кафе|пекарн|кондитер|ресторан|бар|столов|еда/i, copy: {
    flavorLine: 'открыто сегодня',
    menuEyebrow: 'Меню',
    ctaLabel: 'Заказать',
    fallbackServices: [{ title: 'Напитки' }, { title: 'Завтраки' }, { title: 'Выпечка' }],
  } },
  { match: /автосервис|шиномонтаж|детейлинг|автомойк|сто\b/i, copy: {
    flavorLine: 'без сюрпризов',
    menuEyebrow: 'Прайс без звёздочек',
    ctaLabel: 'Записаться на диагностику',
    fallbackServices: [{ title: 'Диагностика' }, { title: 'Замена масла' }, { title: 'Развал-схождение' }],
  } },
  { match: /барбер|парикмахер|стрижк/i, copy: {
    flavorLine: 'свободно сегодня',
    menuEyebrow: 'Прайс',
    ctaLabel: 'Записаться',
    fallbackServices: [{ title: 'Стрижка' }, { title: 'Борода' }, { title: 'Комплекс' }],
  } },
  { match: /электрик|сантехник|ремонт|мастер|отделк|монтаж/i, copy: {
    flavorLine: 'выезд сегодня',
    menuEyebrow: 'Работы и цены',
    ctaLabel: 'Вызвать мастера',
    fallbackServices: [{ title: 'Выезд и осмотр' }, { title: 'Срочный ремонт' }, { title: 'Монтаж под ключ' }],
  } },
  { match: /юрист|юр\.|право|адвокат|бухгалт|консалт/i, copy: {
    flavorLine: 'первая консультация',
    menuEyebrow: 'Услуги',
    ctaLabel: 'Получить консультацию',
    fallbackServices: [{ title: 'Консультация' }, { title: 'Ведение дела' }, { title: 'Документы' }],
  } },
];

export function nicheCopyFor(category: string | null): NicheCopy {
  if (!category) return NICHE_GENERIC;
  const hit = NICHES.find((n) => n.match.test(category));
  return hit ? hit.copy : NICHE_GENERIC;
}

// ─────────────────────────────────────────────────────────────
// Helpers

const TRANSLIT: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'c', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', ь: '',
  э: 'e', ю: 'yu', я: 'ya',
};

export function draftHostSlug(name: string): string {
  const slug = name.toLowerCase()
    .split('').map((ch) => (TRANSLIT[ch] !== undefined ? TRANSLIT[ch] : ch)).join('')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24).replace(/-+$/g, '');
  return slug || 'vash-sait';
}

const SOURCE_NAMES: Record<PreviewSource, string> = {
  yandex_maps: 'Яндекс.Карты',
  telegram: 'Telegram-канал',
  twogis: '2ГИС',
  avito: 'Avito',
  website: 'ваш сайт',
};

// Полосатый плейсхолдер фото (sparse) — striped SVG, язык документа.
function photoPlaceholder(seed: number): string {
  const angle = 35 + seed * 17;
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='480'>`
    + `<defs><pattern id='s' width='14' height='14' patternTransform='rotate(${angle})' patternUnits='userSpaceOnUse'>`
    + `<rect width='14' height='14' fill='#EDE4D6'/><rect width='7' height='14' fill='#E2D5C2'/></pattern></defs>`
    + `<rect width='100%' height='100%' fill='url(%23s)'/>`
    + `<text x='50%' y='50%' font-family='monospace' font-size='22' fill='#8A7C6E' text-anchor='middle'>фото из источника</text></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg).replace(/%2523/g, '%23')}`;
}

function pluralRu(n: number, one: string, few: string, many: string): string {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

// ─────────────────────────────────────────────────────────────
// MAPPER · PreviewDraft → SlotContent (чистая функция, можно юзать на бэке-superset)

export function draftToSlotContent(draft: PreviewDraft): SlotContent {
  const niche = nicheCopyFor(draft.category);
  const host = draftHostSlug(draft.name);
  const districtShort = draft.district ? draft.district.replace(/\s*район\s*/i, '').trim() : null;

  const headingLines = [
    draft.category || draft.name,
    districtShort ? `в [[${districtShort}]]` : `[[${niche.flavorLine}]]`,
  ];
  if (districtShort) headingLines.push(niche.flavorLine);

  const photos = draft.photos.length > 0
    ? draft.photos
    : [photoPlaceholder(1), photoPlaceholder(2)];

  const stats: SlotContent['stats'] = [];
  if (draft.rating) stats.push({ num: String(draft.rating.value), label: 'рейтинг' });
  if (draft.rating && draft.rating.count > 0) stats.push({ num: String(draft.rating.count), label: 'отзывов' });
  if (draft.photos.length > 0) stats.push({ num: String(draft.photos.length), label: 'фото' });
  if (stats.length < 3 && draft.services.length > 0) stats.push({ num: String(draft.services.length), label: pluralRu(draft.services.length, 'услуга', 'услуги', 'услуг') });

  const serviceItems = (draft.services.length > 0 ? draft.services : niche.fallbackServices.map((s) => ({ ...s, price: null })))
    .slice(0, 6)
    .map((s, i) => ({
      num: String(i + 1).padStart(2, '0'),
      name: s.title,
      desc: (s as { price: string | null }).price ? undefined : 'цену уточним при полной сборке',
      price: (s as { price: string | null }).price || '· · ·',
    }));

  const rawReview = draft.reviews[0];
  const quote = rawReview
    ? {
        text: `«${rawReview.text}»`,
        authorName: rawReview.author,
        authorSource: SOURCE_NAMES[draft.source],
        authorWhen: '',
      }
    : {
        text: '«Здесь появятся ваши отзывы — заберём их из источника»',
        authorName: BRAND.name,
        authorSource: 'черновик',
        authorWhen: '',
      };

  return {
    meta: {
      brand: draft.name,
      host,
      category: draft.category || 'Ваше дело',
      address: draft.district || `${host}.${BRAND.domain}`,
      since: '',
      rating: draft.rating ? String(draft.rating.value) : '—',
      reviewsN: draft.rating ? draft.rating.count : draft.reviews.length,
    },
    hero: {
      headingLines,
      leadParagraph: rawReview ? rawReview.text : `${draft.category || 'Ваше дело'} — сайт собран из вашего источника. Тексты допишем при полной сборке.`,
      photoSrc: photos[0],
      gallery: photos.slice(1, 3),
      photoCaption: draft.photos.length > 0 ? `Фото · ${SOURCE_NAMES[draft.source]}` : 'место для ваших фото',
    },
    stats,
    menu: { eyebrow: niche.menuEyebrow, title: 'Услуги', items: serviceItems },
    quote,
    cta: { primary: { label: niche.ctaLabel }, phone: `${host}.${BRAND.domain}` },
  };
}

/** Preset для PresetRenderer из draft либо выбранной темы переключателя. */
export function draftPreset(draft: PreviewDraft, activeTheme?: string): Preset {
  const themeId = activeTheme || draft.theme_id;
  let familyId = draft.family_id as Preset['familyId'];
  try { familyId = getTheme(themeId).family; } catch { /* unknown id → keep draft family */ }
  return { themeId, familyId };
}

/**
 * rev.2 §5 · морф «пример → черновик»: слоты base-примера подменяются данными
 * источника по мере сборки. Чистая функция — одна на canvas и прод.
 *
 * | Слот              | Когда                              | Как                          |
 * |-------------------|------------------------------------|------------------------------|
 * | Название/категория| stage: fetching пройден (si ≥ 1)   | кросс-фейд текста            |
 * | Галерея/photoSrc  | по мере counts.photos              | по одному, слева направо     |
 * | Отзывы (quote)    | stage: reviews (si ≥ 2)            | кросс-фейд цитаты            |
 * | Услуги/цены       | incoming.services непустой         | стэггер строк                |
 * | Тема              | НЕ здесь — отдельным переходом ДО подмены контента (userThemeTouched, §2) |
 *
 * Анимации (кросс-фейд ~200 мс) вешает консьюмер, обязательно под
 * @media (prefers-reduced-motion: no-preference); сами подмены — мгновенные.
 */
export function morphSlotContent(
  baseDraft: PreviewDraft,
  incoming: Partial<PreviewDraft> | undefined,
  stage: BuildStage,
  counts: BuildCounts,
): SlotContent {
  const base = draftToSlotContent(baseDraft);
  const si = STAGE_ORDER.indexOf(stage);
  const out: SlotContent = { ...base, meta: { ...base.meta }, hero: { ...base.hero } };

  if (si >= 1 && incoming?.name) {
    out.meta.brand = incoming.name;
    out.meta.host = draftHostSlug(incoming.name);
    // §9: источник знает нишу точнее — категория источника выигрывает
    if (incoming.category) out.meta.category = incoming.category;
  }

  const photos = incoming?.photos || [];
  if (photos.length > 0 && counts.photos > 0) {
    out.hero.photoSrc = photos[0];
    const gallery = [...(base.hero.gallery || [])];
    for (let i = 0; i < gallery.length && i + 1 < Math.min(counts.photos, photos.length); i++) {
      gallery[i] = photos[i + 1];
    }
    out.hero.gallery = gallery;
  }

  if (si >= 2 && incoming?.reviews && incoming.reviews.length > 0) {
    const r = incoming.reviews[0];
    out.quote = { text: `«${r.text}»`, authorName: r.author, authorSource: incoming.source ? SOURCE_NAMES[incoming.source] : '', authorWhen: '' };
  }

  if (incoming?.services && incoming.services.length > 0) {
    out.menu = {
      ...base.menu,
      items: incoming.services.slice(0, 6).map((s, i) => ({
        num: String(i + 1).padStart(2, '0'),
        name: s.title,
        price: s.price || '· · ·',
      })),
    };
  }

  return out;
}

// ─────────────────────────────────────────────────────────────
// MOCK drafts — для zero-prop canvas-режима

export const mockPreviewDraftRich: PreviewDraft = {
  source: 'yandex_maps',
  name: 'Студия Анны',
  category: 'Маникюр',
  district: 'Петроградский район',
  rating: { value: 4.9, count: 67 },
  photos: [
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=720&q=80',
    'https://images.unsplash.com/photo-1610992015732-2449b76344bc?auto=format&fit=crop&w=480&q=80',
    'https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=480&q=80',
  ],
  reviews: [
    { author: 'Олеся Н.', text: 'Анна спокойная, объясняет, что делает. Никогда не было сколов', rating: 5 },
    { author: 'Марина В.', text: 'Хожу полгода, запись день в день почти не поймать — оно того стоит', rating: 5 },
  ],
  services: [
    { title: 'Маникюр + покрытие', price: '2 400 ₽' },
    { title: 'Снятие чужого покрытия', price: '500 ₽' },
    { title: 'Укрепление акригелем', price: '600 ₽' },
    { title: 'Дизайн на 2 ногтя', price: '300 ₽' },
  ],
  theme_id: 'display-soft',
  family_id: 'display',
};

export const mockPreviewDraftSparse: PreviewDraft = {
  source: 'twogis',
  name: 'Электрик Сергей',
  category: 'Электрик',
  district: 'Калининский район',
  rating: null,
  photos: [],
  reviews: [],
  services: [],
  theme_id: 'stacked-corporate',
  family_id: 'stacked',
};

export const mockThemeOptions = ['display-soft', 'stacked-cream', 'bento-clay'];

// ─────────────────────────────────────────────────────────────
// Shared chrome — shell + 4 дота с loading-состоянием.
// (Локальная копия ModalShell из index.tsx — photo-ветка остаётся byte-identical.)

const PV_KEYFRAMES = `
@keyframes ssp-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.35 } }
@keyframes ssp-shimmer { 0%, 100% { opacity: 0.55 } 50% { opacity: 0.25 } }
`;

function PvShell({ children, width = 680, mobile = false, intakeStep }: { children: React.ReactNode; width?: number; mobile?: boolean; intakeStep?: string }) {
  if (mobile) {
    return (
      <div data-intake-step={intakeStep} style={{ width: '100%', minHeight: '100%', background: VT.bg, fontFamily: VT.font.sans, position: 'relative' }}>
        <style>{PV_KEYFRAMES}</style>
        <div style={{ padding: '18px 16px 28px', position: 'relative' }}>
          <button aria-label="Закрыть" style={{
            position: 'absolute', top: 10, right: 12,
            width: 32, height: 32, borderRadius: 999,
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
      <style>{PV_KEYFRAMES}</style>
      <div data-intake-step={intakeStep} style={{
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

// 4 дота link-ветки превью-флоу. activeDot 1..4, loading → активный дот пульсирует.
function PvHeader({ activeDot, loading = false, title, sub, onBack }: {
  activeDot: number; loading?: boolean; title: string; sub?: React.ReactNode; onBack?: () => void;
}) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        {onBack && (
          <button onClick={onBack} style={{
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
        <Mono style={{ fontSize: 11, letterSpacing: '0.1em' }}>ШАГ {activeDot}/4</Mono>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{
              width: 28, height: 4, borderRadius: 2,
              background: i < activeDot ? VT.accent : VT.line,
              animation: loading && i === activeDot - 1 ? 'ssp-pulse 1.2s ease-in-out infinite' : 'none',
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
// S3_StepBuilding · шаг «Сборка»
// Реальный прогресс: этапы привязаны к poll-ответу бэкенда. Никакого AI-театра.

const BUILD_STAGES: { id: BuildStage; label: (c: BuildCounts) => string }[] = [
  { id: 'fetching', label: () => 'Читаем источник' },
  { id: 'photos', label: (c) => c.photos > 0 ? `Забрали ${c.photos} фото` : 'Забираем фото' },
  { id: 'reviews', label: (c) => c.reviews > 0 ? `Нашли ${c.reviews} ${pluralRu(c.reviews, 'отзыв', 'отзыва', 'отзывов')}` : 'Ищем отзывы' },
  { id: 'styling', label: () => 'Подбираем стиль под нишу' },
];

const STAGE_ORDER: BuildStage[] = ['fetching', 'photos', 'reviews', 'styling'];

function StageRow({ state, label }: { state: 'done' | 'active' | 'pending'; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: `1px solid ${VT.lineSoft}` }}>
      <span style={{
        width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: state === 'done' ? VT.successSoft : state === 'active' ? VT.accentSoft : VT.bgSoft,
        border: state === 'pending' ? `1px solid ${VT.line}` : 'none',
        color: state === 'done' ? VT.success : VT.accent,
      }}>
        {state === 'done' && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l4 4 10-10"/>
          </svg>
        )}
        {state === 'active' && <Spinner size={12} />}
        {state === 'pending' && <span style={{ width: 5, height: 5, borderRadius: '50%', background: VT.inkFaint }} />}
      </span>
      <span style={{
        fontSize: 14, lineHeight: 1.35,
        fontWeight: state === 'active' ? 600 : 500,
        color: state === 'pending' ? VT.inkFaint : VT.ink,
        fontVariantNumeric: 'tabular-nums',
      }}>{label}</span>
    </div>
  );
}

// Скелет превью — карточка MiniChrome уже на экране, блоки проявляются по данным.
function SkeletonPreview({ stage, counts, draftSkeleton, height = 380 }: {
  stage: BuildStage; counts: BuildCounts; draftSkeleton?: Partial<PreviewDraft>; height?: number;
}) {
  const si = STAGE_ORDER.indexOf(stage);
  const bar = (w: string, h = 10, solid = false) => (
    <span style={{
      display: 'block', width: w, height: h, borderRadius: 3,
      background: solid ? VT.ink : VT.line,
      animation: solid ? 'none' : 'ssp-shimmer 1.4s ease-in-out infinite',
    }} />
  );
  const name = draftSkeleton?.name;
  const host = name ? draftHostSlug(name) : 'vash-sait';
  let paletteDots: string[] | null = null;
  if (si >= 3 && draftSkeleton?.theme_id) {
    try {
      const t = getTheme(draftSkeleton.theme_id);
      paletteDots = [t.colors.bg, t.colors.accent, t.colors.ink, t.colors.bgAlt];
    } catch { paletteDots = null; }
  }
  return (
    <MiniChrome host={host} height={height}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 14, gap: 10, background: VT.white }}>
        {/* brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 18, height: 18, borderRadius: 5, background: si >= 1 ? VT.accentSoft : VT.line, flex: '0 0 auto' }} />
          {name && si >= 1
            ? <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em' }}>{name}</span>
            : bar('38%', 11)}
        </div>
        {/* heading */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {bar('82%', 16, !!name && si >= 3)}
          {bar('58%', 16)}
        </div>
        {/* photo area */}
        <div style={{
          flex: '1 1 auto', minHeight: 70, borderRadius: 8, overflow: 'hidden', position: 'relative',
          background: counts.photos > 0
            ? `repeating-linear-gradient(45deg, ${VT.accentSoft} 0 10px, ${VT.bgSoft} 10px 20px)`
            : VT.bgSoft,
          animation: counts.photos > 0 ? 'none' : 'ssp-shimmer 1.4s ease-in-out infinite',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {counts.photos > 0 && (
            <span style={{
              fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.08em',
              background: VT.bg, border: `1px solid ${VT.line}`, borderRadius: 999,
              padding: '4px 10px', color: VT.inkSoft, fontVariantNumeric: 'tabular-nums',
            }}>{counts.photos} ФОТО</span>
          )}
        </div>
        {/* service rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {bar(i === 0 ? '44%' : '36%', 9)}
              <span style={{ flex: 1 }} />
              {bar('14%', 9)}
            </div>
          ))}
        </div>
        {/* reviews band */}
        <div style={{
          borderRadius: 8, padding: '8px 10px',
          background: counts.reviews > 0 ? VT.successSoft : VT.bgSoft,
          animation: counts.reviews > 0 ? 'none' : 'ssp-shimmer 1.4s ease-in-out infinite',
          display: 'flex', alignItems: 'center', gap: 8, minHeight: 18,
        }}>
          {counts.reviews > 0 && (
            <span style={{ fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.06em', color: 'oklch(0.32 0.12 145)', fontVariantNumeric: 'tabular-nums' }}>
              {counts.reviews} {pluralRu(counts.reviews, 'ОТЗЫВ', 'ОТЗЫВА', 'ОТЗЫВОВ').toUpperCase()} · ИЗ ИСТОЧНИКА
            </span>
          )}
        </div>
        {/* palette row — появляется на этапе styling */}
        {paletteDots && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: VT.font.mono, fontSize: 9.5, letterSpacing: '0.1em', color: VT.inkFaint }}>СТИЛЬ</span>
            {paletteDots.map((col, i) => (
              <span key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: col, border: `1px solid ${VT.line}`, flex: '0 0 auto' }} />
            ))}
          </div>
        )}
      </div>
    </MiniChrome>
  );
}

export interface S3_StepBuildingProps {
  stage?: BuildStage;
  counts?: BuildCounts;
  draftSkeleton?: Partial<PreviewDraft>;
  source?: PreviewSource;
  /** > 40 c: «собираем дольше обычного» → CTA на контактный шаг. Сборка продолжается асинхронно. */
  timedOut?: boolean;
  /** rev.2 (0.11.0): demo-черновик из NICHE_DEMO_DRAFTS (./rev2). Есть → морф-режим ТЗ rev.2 §5:
   *  chassis примера остаётся на экране (НЕ размонтируется), слоты подменяются данными
   *  источника из draftSkeleton/counts. Нет → standalone-экран сборки rev.1 (путь hero-URL). */
  baseDraft?: PreviewDraft;
  onSkipToContact?: () => void;
  onBack?: () => void;
  mobile?: boolean;
}

export function S3_StepBuilding({
  stage = 'photos',
  counts = { photos: 4, reviews: 0 },
  draftSkeleton,
  source = 'yandex_maps',
  timedOut = false,
  baseDraft,
  onSkipToContact,
  onBack,
  mobile = false,
}: S3_StepBuildingProps) {
  const si = STAGE_ORDER.indexOf(stage);
  const stages = (
    <div style={{ marginTop: 4 }}>
      {BUILD_STAGES.map((st, i) => (
        <StageRow key={st.id}
          state={i < si ? 'done' : i === si ? 'active' : 'pending'}
          label={st.label(counts)} />
      ))}
    </div>
  );

  // ── rev.2 морф-режим (ТЗ §5): пример остаётся на экране, слоты подменяются.
  // Заголовок зависит от контекста: пришли через шаг 0b → «Заменяем пример…».
  if (baseDraft && !timedOut) {
    const content = morphSlotContent(baseDraft, draftSkeleton, stage, counts);
    const preset = draftPreset(baseDraft, baseDraft.theme_id);
    const frame = (
      <div style={{ position: 'relative' }}>
        <span aria-hidden="true" style={{
          position: 'absolute', top: -10, left: 14, transform: 'rotate(-5deg)',
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.16em',
          color: VT.accent, background: VT.bg,
          border: `1.5px dashed ${VT.accent}`, borderRadius: 4,
          padding: '4px 10px', zIndex: 3,
          animation: 'ssp-pulse 1.3s ease-in-out infinite',
        }}>СОБИРАЕМ…</span>
        <MiniChrome host={content.meta.host} height={mobile ? 400 : 500}>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <div style={{ height: mobile ? 740 : 920, display: 'flex', flexDirection: 'column' }}>
              <PresetRenderer preset={preset} content={content} />
            </div>
          </div>
        </MiniChrome>
      </div>
    );
    return (
      <PvShell width={1040} mobile={mobile} intakeStep="building">
        <PvHeader activeDot={2} loading
          title="Заменяем пример на ваши данные"
          sub={<>Берём фото, отзывы и услуги из вашего источника — {SOURCE_NAMES[source]}. Обычно это 15–40 секунд.</>}
          onBack={onBack} />
        {mobile ? (
          <div style={{ marginTop: 16 }}>
            {frame}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
              <Spinner size={14} />
              <span style={{ fontSize: 12.5, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>
                {BUILD_STAGES[si]?.label(counts)}
              </span>
              <Mono style={{ fontSize: 10.5, letterSpacing: '0.08em', marginLeft: 'auto' }}>{si + 1}/4</Mono>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 22, marginTop: 18, alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 62%', minWidth: 0 }}>{frame}</div>
            <div style={{ flex: '1 1 38%', minWidth: 0, paddingTop: 2 }}>
              {stages}
              <div style={{ marginTop: 14, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }}>
                Числа настоящие — считаем по мере того, как парсер их находит. Фото примера заменяются вашими по одному, слева направо.
              </div>
            </div>
          </div>
        )}
      </PvShell>
    );
  }

  return (
    <PvShell width={680} mobile={mobile} intakeStep="building">
      <PvHeader activeDot={2} loading
        title="Собираем черновик вашего сайта"
        sub={<>Берём фото, отзывы и услуги из вашего источника — {SOURCE_NAMES[source]}. Обычно это 15–40 секунд.</>} />

      {timedOut ? (
        <>
          <div style={{
            marginTop: 18, padding: '14px 16px',
            background: VT.infoSoft, borderRadius: VT.r.md,
            fontSize: 14, lineHeight: 1.5, color: 'oklch(0.36 0.10 240)',
          }}>
            <b>Собираем дольше обычного.</b> Источник отвечает медленно. Оставьте контакт, и мы пришлём готовый черновик, обычно в течение 2 часов.
          </div>
          <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 14, marginTop: 18, alignItems: 'stretch' }}>
            <div style={{ flex: 1, minWidth: 0 }}>{stages}</div>
            <div style={{ flex: mobile ? 'none' : '0 0 280px' }}>
              <SkeletonPreview stage={stage} counts={counts} draftSkeleton={draftSkeleton} height={mobile ? 280 : 300} />
            </div>
          </div>
          <div style={{ marginTop: 20 }}>
            <Btn style={{ width: '100%' }} iconRight={<IconArrow />} onClick={onSkipToContact}>
              Оставить контакт
            </Btn>
          </div>
        </>
      ) : (
        <div style={{ display: 'flex', flexDirection: mobile ? 'column' : 'row', gap: 18, marginTop: 18, alignItems: 'stretch' }}>
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            {stages}
            <div style={{ marginTop: 'auto', paddingTop: 14, fontSize: 12.5, color: VT.inkFaint, lineHeight: 1.5 }}>
              Числа настоящие — считаем по мере того, как парсер их находит.
            </div>
          </div>
          <div style={{ flex: mobile ? 'none' : '0 0 300px' }}>
            <SkeletonPreview stage={stage} counts={counts} draftSkeleton={draftSkeleton} height={mobile ? 320 : 380} />
          </div>
        </div>
      )}
    </PvShell>
  );
}

// ─────────────────────────────────────────────────────────────
// S3_StepPreview · шаг «Превью» — герой экрана = сам сайт

function FoundRow({ label, value, dim = false }: { label: string; value: React.ReactNode; dim?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '6px 0', borderTop: `1px solid ${VT.lineSoft}` }}>
      <span style={{ fontFamily: VT.font.mono, fontSize: 10.5, letterSpacing: '0.1em', color: VT.inkFaint, flex: '0 0 76px' }}>{label}</span>
      <span style={{
        fontFamily: VT.font.mono, fontSize: 12.5, fontVariantNumeric: 'tabular-nums',
        color: dim ? VT.inkFaint : VT.ink, minWidth: 0,
      }}>{value}</span>
    </div>
  );
}

function ThemeSwatch({ themeId, active, onSelect }: { themeId: string; active: boolean; onSelect?: () => void }) {
  let bg = VT.bgSoft, accent = VT.accent, label = themeId;
  try {
    const t = getTheme(themeId);
    bg = t.colors.bg; accent = t.colors.accent; label = t.label;
  } catch { /* unknown id — render as-is */ }
  return (
    <button onClick={onSelect} style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '7px 10px', borderRadius: 999,
      background: active ? VT.white : 'transparent',
      border: `1.5px solid ${active ? VT.accent : VT.line}`,
      cursor: 'pointer', fontFamily: VT.font.sans,
      fontSize: 12, fontWeight: active ? 600 : 500,
      color: active ? VT.ink : VT.inkSoft,
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: '50%', flex: '0 0 auto',
        background: `linear-gradient(135deg, ${bg} 50%, ${accent} 50%)`,
        border: `1px solid ${VT.line}`,
      }} />
      {label}
    </button>
  );
}

export interface S3_StepPreviewProps {
  draft?: PreviewDraft;
  themeOptions?: string[];        // 2–3 theme_id на переключатель (НЕ 16)
  activeTheme?: string;
  onThemeChange?: (id: string) => void;
  onClaim?: () => void;           // CTA «Забрать сайт бесплатно» · demo: «Заменить на ваши данные»
  onBack?: () => void;            // «Изменить источник» · demo: «Другая ниша»
  /** rev.2: 'demo' — шаг 0b «Пример»: штамп ПРИМЕР, панель «Что мы нашли» скрыта, доты не показываются. */
  variant?: 'demo' | 'rich' | 'sparse';
  /** rev.2 · variant='demo': подпись ниши в строке-пояснении. Для свободного ввода — введённое слово. Default: draft.category. */
  nicheLabel?: string;
  mobile?: boolean;
}

export function S3_StepPreview({
  draft = mockPreviewDraftRich,
  themeOptions = mockThemeOptions,
  activeTheme,
  onThemeChange,
  onClaim,
  onBack,
  variant,
  nicheLabel,
  mobile = false,
}: S3_StepPreviewProps) {
  const v = variant || (draft.photos.length >= 3 || draft.reviews.length > 0 ? 'rich' : 'sparse');
  const content = draftToSlotContent(draft);
  const preset = draftPreset(draft, activeTheme);
  const frameH = mobile ? 420 : 560;
  const innerH = mobile ? 760 : 980;

  // ── rev.2 · шаг 0b «Пример» (variant='demo'): герой экрана — сам сайт.
  // Без дотов (витрина, не воронка), штамп ПРИМЕР слева сверху.
  if (v === 'demo') {
    const label = nicheLabel || draft.category || 'Ваше дело';
    const demoFrame = (
      <div style={{ position: 'relative' }}>
        <span aria-hidden="true" style={{
          position: 'absolute', top: -10, left: 14, transform: 'rotate(-5deg)',
          fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.16em',
          color: VT.accent, background: VT.bg,
          border: `1.5px dashed ${VT.accent}`, borderRadius: 4,
          padding: '4px 10px', zIndex: 3,
        }}>ПРИМЕР</span>
        <MiniChrome host={content.meta.host} height={frameH}>
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
            <div style={{ height: innerH, display: 'flex', flexDirection: 'column' }}>
              <PresetRenderer preset={preset} content={content} />
            </div>
          </div>
        </MiniChrome>
      </div>
    );
    const demoPanel = (
      <>
        <p style={{ fontSize: 15, lineHeight: 1.5, margin: 0 }}>
          Так выглядит сайт для ниши «{label}». Дальше ваши фото, цены и отзывы
        </p>
        {themeOptions.length > 1 && (
          <div style={{ marginTop: 16 }}>
            <Mono style={{ fontSize: 11, letterSpacing: '0.12em', display: 'block', marginBottom: 8 }}>СТИЛЬ</Mono>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {themeOptions.slice(0, 3).map((id) => (
                <ThemeSwatch key={id} themeId={id}
                  active={(activeTheme || draft.theme_id) === id}
                  onSelect={() => onThemeChange?.(id)} />
              ))}
            </div>
          </div>
        )}
        <div style={{ marginTop: 18 }}>
          <Btn data-cta="claim-demo" style={{ width: '100%' }} iconRight={<IconArrow />} onClick={onClaim}>
            Заменить на ваши данные
          </Btn>
        </div>
        <div style={{ marginTop: 8, fontSize: 12.5, color: VT.inkFaint, textAlign: 'center' }}>
          Меньше минуты. Контакты пока не нужны
        </div>
        <button onClick={onBack} style={{
          display: 'block', margin: '12px auto 0',
          background: 'transparent', border: 'none', color: VT.inkSoft,
          fontSize: 13, cursor: 'pointer',
          textDecoration: 'underline', textUnderlineOffset: 3,
          fontFamily: VT.font.sans,
        }}>Другая ниша</button>
      </>
    );
    return (
      <PvShell width={1040} mobile={mobile} intakeStep="demo">
        {mobile ? (
          <div style={{ marginTop: 4 }}>
            {demoFrame}
            <div style={{ marginTop: 14 }}>{demoPanel}</div>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 22, alignItems: 'flex-start' }}>
            <div style={{ flex: '1 1 62%', minWidth: 0 }}>{demoFrame}</div>
            <div style={{ flex: '1 1 38%', minWidth: 0, paddingTop: 8 }}>{demoPanel}</div>
          </div>
        )}
      </PvShell>
    );
  }

  const frame = (
    <div style={{ position: 'relative' }}>
      <MiniChrome host={content.meta.host} height={frameH}>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
          <div style={{ height: innerH, display: 'flex', flexDirection: 'column' }}>
            <PresetRenderer preset={preset} content={content} />
          </div>
        </div>
      </MiniChrome>
      <span aria-hidden="true" style={{
        position: 'absolute', top: -10, right: 14, transform: 'rotate(6deg)',
        fontFamily: VT.font.mono, fontSize: 11, letterSpacing: '0.16em',
        color: VT.accent, background: VT.bg,
        border: `1.5px dashed ${VT.accent}`, borderRadius: 4,
        padding: '4px 10px',
      }}>ЧЕРНОВИК</span>
      {v === 'sparse' && (
        <div style={{
          marginTop: 8, fontSize: 12.5, color: VT.inkSoft, lineHeight: 1.45,
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <span style={{ width: 14, height: 14, borderRadius: 3, flex: '0 0 auto', background: `repeating-linear-gradient(45deg, ${VT.accentSoft} 0 4px, ${VT.bgSoft} 4px 8px)`, border: `1px solid ${VT.line}` }} />
          Фото добавим из источника при полной сборке
        </div>
      )}
    </div>
  );

  const found = (
    <div>
      <Mono style={{ fontSize: 11, letterSpacing: '0.12em', display: 'block', marginBottom: 6 }}>
        ЧТО МЫ НАШЛИ · {SOURCE_NAMES[draft.source].toUpperCase()}
      </Mono>
      <FoundRow label="ФОТО" value={draft.photos.length > 0 ? draft.photos.length : '— при полной сборке'} dim={draft.photos.length === 0} />
      <FoundRow label="ОТЗЫВЫ" value={draft.rating && draft.rating.count > 0 ? draft.rating.count : draft.reviews.length > 0 ? draft.reviews.length : '— при полной сборке'} dim={!(draft.rating && draft.rating.count > 0) && draft.reviews.length === 0} />
      <FoundRow label="УСЛУГИ" value={draft.services.length > 0 ? draft.services.length : '— при полной сборке'} dim={draft.services.length === 0} />
      {draft.district && <FoundRow label="РАЙОН" value={draft.district.replace(/\s*район\s*/i, '')} />}
      {draft.rating && <FoundRow label="РЕЙТИНГ" value={`★ ${draft.rating.value}`} />}
    </div>
  );

  const controls = (
    <>
      {themeOptions.length > 1 && (
        <div style={{ marginTop: 16 }}>
          <Mono style={{ fontSize: 11, letterSpacing: '0.12em', display: 'block', marginBottom: 8 }}>СТИЛЬ</Mono>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {themeOptions.slice(0, 3).map((id) => (
              <ThemeSwatch key={id} themeId={id}
                active={(activeTheme || draft.theme_id) === id}
                onSelect={() => onThemeChange?.(id)} />
            ))}
          </div>
        </div>
      )}
      <div style={{ marginTop: 18, fontSize: 13.5, color: VT.inkSoft, lineHeight: 1.5 }}>
        Это эскиз. Полную версию — с текстами и всеми фото — соберём за 2 часа.
      </div>
      <div style={{ marginTop: 14 }}>
        <Btn data-cta="claim-draft" style={{ width: '100%' }} iconRight={<IconArrow />} onClick={onClaim}>
          Забрать сайт бесплатно
        </Btn>
      </div>
      <button onClick={onBack} style={{
        display: 'block', margin: '12px auto 0',
        background: 'transparent', border: 'none', color: VT.inkSoft,
        fontSize: 13, cursor: 'pointer',
        textDecoration: 'underline', textUnderlineOffset: 3,
        fontFamily: VT.font.sans,
      }}>Изменить источник</button>
    </>
  );

  return (
    <PvShell width={920} mobile={mobile} intakeStep="preview">
      <PvHeader activeDot={2}
        title="Вот черновик вашего сайта"
        sub={v === 'sparse'
          ? <>Собрали из того, что нашли. Стиль {BRAND.name} подобрал под нишу «{draft.category || 'ваше дело'}».</>
          : <>Собран из ваших фото и отзывов. Стиль {BRAND.name} подобрал под нишу «{draft.category || 'ваше дело'}».</>} />

      {mobile ? (
        <div style={{ marginTop: 16 }}>
          {frame}
          <div style={{ marginTop: 16 }}>{found}</div>
          {controls}
        </div>
      ) : (
        <div style={{ display: 'flex', gap: 22, marginTop: 18, alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 58%', minWidth: 0 }}>{frame}</div>
          <div style={{ flex: '1 1 42%', minWidth: 0, paddingTop: 2 }}>
            {found}
            {controls}
          </div>
        </div>
      )}
    </PvShell>
  );
}
