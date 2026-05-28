// @samosite/canon · presets
// Pluggable design-system layer for generated client sites.
// One engine, many families × themes. See docs/PRESETS_ARCHITECTURE.md.

import React from 'react';
import { VT, BRAND } from '../tokens';

// ───────────────────────────────────────────────────────────────
// CONTRACTS
// ───────────────────────────────────────────────────────────────

export type FamilyKey = 'editorial' | 'bento' | 'display' | 'split' | 'stacked';
export type SpectrumKey = 'classic' | 'bold' | 'soft' | 'dark';

export interface ThemeColors {
  bg: string;
  bgAlt: string;
  ink: string;
  inkSoft: string;
  inkFaint: string;
  line: string;
  lineSoft: string;
  accent: string;
  accentSoft: string;
  accentInk: string;
  /** Inverse block (quote / footer / services-on-dark). */
  invBg: string;
  invInk: string;
  invAccent: string;
  invInkSoft: string;
}

export interface ThemeFonts {
  display: string;
  body: string;
  mono: string;
}

export interface ThemeRadii {
  card: number;
  btn: number;
  photo: number;
  mark: number;
}

export interface ThemeVoice {
  displayWeight: 400 | 500 | 600 | 700 | 800;
  italicAccent: boolean;
  dropCap: boolean;
  /** photo CSS filter, e.g. 'grayscale(0.6) contrast(1.1)' */
  photoFilter?: string;
}

export interface Theme {
  id: string;
  family: FamilyKey;
  spectrum: SpectrumKey;
  label: string;
  colors: ThemeColors;
  fonts: ThemeFonts;
  radii: ThemeRadii;
  voice: ThemeVoice;
}

// Slot contracts — what content a family expects.
// Each family declares which slots it consumes; renderer passes only what's needed.

export interface SlotMeta {
  brand: string;
  host: string;
  category: string;
  address: string;
  since: string;
  rating: string;
  reviewsN: number;
}

export interface SlotHero {
  headingLines: string[];          // for editorial: ["Кофе", "& завтраки", "с 07:30"]
  leadParagraph?: string;          // lead with optional drop-cap
  photoSrc: string;
  photoCaption?: string;
  gallery?: string[];              // extra photos for families with galleries (display/split)
}

export interface SlotStat {
  num: string;                     // "07:30" or "3" — string for unit-pairing
  unit?: string;                   // " мин"
  label: string;
}

export interface SlotMenuItem {
  num: string;                     // "01" — used by editorial
  name: string;
  desc?: string;
  price: string;
}

export interface SlotQuote {
  text: string;                    // may contain <em> markers via [[...]]
  authorName: string;
  authorSource: string;
  authorWhen: string;
}

export interface SlotCta {
  primary: { label: string; href?: string };
  secondary?: { label: string; href?: string };
  phone?: string;
}

export interface SlotContent {
  meta: SlotMeta;
  hero: SlotHero;
  stats: SlotStat[];
  menu?: { eyebrow: string; title: string; items: SlotMenuItem[] };
  quote: SlotQuote;
  cta: SlotCta;
}

// Preset = composition of (family, theme) + content
export interface Preset {
  themeId: string;
  familyId: FamilyKey;
}

// ───────────────────────────────────────────────────────────────
// THEMES · EDITORIAL family
// ───────────────────────────────────────────────────────────────

export const editorialWarm: Theme = {
  id: 'editorial-warm',
  family: 'editorial',
  spectrum: 'bold',
  label: 'тёплая · классика',
  colors: {
    bg: '#FAF6F0',
    bgAlt: '#F2E6D2',
    ink: '#211C17',
    inkSoft: '#5C5048',
    inkFaint: '#897C6E',
    line: '#211C17',
    lineSoft: '#D3C7B0',
    accent: '#A8412E',
    accentSoft: 'rgba(168,65,46,0.10)',
    accentInk: '#FAF6F0',
    invBg: '#211C17',
    invInk: '#FAF6F0',
    invAccent: '#D9A441',
    invInkSoft: '#B5A98F',
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: true },
};

export const editorialNoir: Theme = {
  id: 'editorial-noir',
  family: 'editorial',
  spectrum: 'dark',
  label: 'тёмная · золото',
  colors: {
    bg: '#14110D',
    bgAlt: '#211C16',
    ink: '#EFE7D6',
    inkSoft: '#9A8F79',
    inkFaint: '#6B6354',
    line: '#EFE7D6',
    lineSoft: '#34301F',
    accent: '#D4A24E',
    accentSoft: 'rgba(212,162,78,0.14)',
    accentInk: '#14110D',
    invBg: '#D4A24E',
    invInk: '#14110D',
    invAccent: '#14110D',
    invInkSoft: '#6B4F1E',
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: true, photoFilter: 'contrast(1.05) saturate(0.85)' },
};

export const editorialMono: Theme = {
  id: 'editorial-mono',
  family: 'editorial',
  spectrum: 'bold',
  label: 'спокойная · teal',
  colors: {
    bg: '#ECEAE5',
    bgAlt: '#DEDBD3',
    ink: '#15211E',
    inkSoft: '#52605C',
    inkFaint: '#84908B',
    line: '#15211E',
    lineSoft: '#B8B5AD',
    accent: '#356E60',
    accentSoft: 'rgba(53,110,96,0.12)',
    accentInk: '#F4F2EC',
    invBg: '#15211E',
    invInk: '#ECEAE5',
    invAccent: '#7FB3A4',
    invInkSoft: '#5E6B66',
  },
  fonts: {
    display: "'Geist Mono', 'JetBrains Mono', monospace",
    body: "'Geist Mono', 'JetBrains Mono', monospace",
    mono: "'Geist Mono', 'JetBrains Mono', monospace",
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: false, dropCap: true, photoFilter: 'grayscale(0.6) contrast(1.1)' },
};

// ───────────────────────────────────────────────────────────────
// THEMES · BENTO family — модульная сетка
// ───────────────────────────────────────────────────────────────

export const bentoNoir: Theme = {
  id: 'bento-noir', family: 'bento', spectrum: 'dark', label: 'тёмная · графит',
  colors: {
    bg: '#0E0F10', bgAlt: '#17191B', ink: '#F2F0EC', inkSoft: '#9A9B98', inkFaint: '#6B6D6B',
    line: '#262A2C', lineSoft: '#1E2123',
    accent: '#C2D94A', accentSoft: 'rgba(194,217,74,0.14)', accentInk: '#0E0F10',
    invBg: '#F2F0EC', invInk: '#0E0F10', invAccent: '#0E0F10', invInkSoft: '#5C5E5C',
  },
  fonts: { display: "'Space Grotesk', sans-serif", body: "'Space Grotesk', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 10, photo: 14, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false },
};

export const bentoLight: Theme = {
  id: 'bento-light', family: 'bento', spectrum: 'classic', label: 'светлая · сталь',
  colors: {
    bg: '#EFF1F4', bgAlt: '#FFFFFF', ink: '#16202E', inkSoft: '#5A6678', inkFaint: '#95A0AF',
    line: '#E0E4EA', lineSoft: '#ECEFF3',
    accent: '#2D5B8E', accentSoft: 'rgba(45,91,142,0.10)', accentInk: '#FFFFFF',
    invBg: '#16202E', invInk: '#FFFFFF', invAccent: '#7FA8D9', invInkSoft: '#6B7787',
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 16, btn: 8, photo: 16, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false },
};

export const bentoClay: Theme = {
  id: 'bento-clay', family: 'bento', spectrum: 'soft', label: 'тёплая · глина',
  colors: {
    bg: '#EDE6DB', bgAlt: '#F7F2E9', ink: '#2A211A', inkSoft: '#5C5048', inkFaint: '#8A7C6C',
    line: '#DBD2C3', lineSoft: '#E5DDD0',
    accent: '#B56A43', accentSoft: 'rgba(181,106,67,0.12)', accentInk: '#F7F2E9',
    invBg: '#2A211A', invInk: '#F7F2E9', invAccent: '#D9A441', invInkSoft: '#8A7C6C',
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 18, btn: 999, photo: 18, mark: 10 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false },
};

// ───────────────────────────────────────────────────────────────
// THEMES · DISPLAY family — гигантская типографика
// ───────────────────────────────────────────────────────────────

export const displaySoft: Theme = {
  id: 'display-soft', family: 'display', spectrum: 'soft', label: 'розовая · бьюти',
  colors: {
    bg: '#F6E7E3', bgAlt: '#FBF3F1', ink: '#2A1820', inkSoft: '#6B4A52', inkFaint: '#9C7B82',
    line: '#E8CFC9', lineSoft: '#F0DED9',
    accent: '#8C4A52', accentSoft: 'rgba(140,74,82,0.10)', accentInk: '#F6E7E3',
    invBg: '#2A1820', invInk: '#F6E7E3', invAccent: '#D99CA0', invInkSoft: '#8C6168',
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 10, btn: 999, photo: 10, mark: 6 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false },
};

export const displayBold: Theme = {
  id: 'display-bold', family: 'display', spectrum: 'bold', label: 'мятная · смелая',
  colors: {
    bg: '#D6EDE3', bgAlt: '#E6F4EC', ink: '#10211B', inkSoft: '#3C544A', inkFaint: '#6B8276',
    line: '#B6D8C9', lineSoft: '#C8E2D6',
    accent: '#13231D', accentSoft: 'rgba(16,33,27,0.08)', accentInk: '#D6EDE3',
    invBg: '#10211B', invInk: '#D6EDE3', invAccent: '#9FD9C0', invInkSoft: '#5C7368',
  },
  fonts: { display: "'Fraunces', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: false },
};

export const displayNoir: Theme = {
  id: 'display-noir', family: 'display', spectrum: 'dark', label: 'тёмная · золото',
  colors: {
    bg: '#141210', bgAlt: '#201D19', ink: '#EFE9DD', inkSoft: '#9A9082', inkFaint: '#6B645A',
    line: '#322D27', lineSoft: '#262320',
    accent: '#D9B36A', accentSoft: 'rgba(217,179,106,0.14)', accentInk: '#141210',
    invBg: '#D9B36A', invInk: '#141210', invAccent: '#141210', invInkSoft: '#6B5630',
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 4, btn: 4, photo: 4, mark: 2 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false, photoFilter: 'saturate(0.85) contrast(1.05)' },
};

// Tattoo-oriented: refined black-and-bone palette, thin elegant serif, fine-line feel.
// Mirrors the 2026 fine-line studio trend (gallery-like, "let the work speak").
export const displayInk: Theme = {
  id: 'display-ink', family: 'display', spectrum: 'dark', label: 'графит · кость',
  colors: {
    bg: '#100F0E', bgAlt: '#1A1917', ink: '#ECE7DF', inkSoft: '#8E8780', inkFaint: '#605A53',
    line: '#2A2825', lineSoft: '#201E1C',
    accent: '#C9C2B6', accentSoft: 'rgba(201,194,182,0.12)', accentInk: '#100F0E',
    invBg: '#ECE7DF', invInk: '#100F0E', invAccent: '#100F0E', invInkSoft: '#7A746C',
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 3, btn: 3, photo: 3, mark: 2 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false, photoFilter: 'grayscale(0.35) contrast(1.08)' },
};

// ───────────────────────────────────────────────────────────────
// THEMES · SPLIT family — двухколоночная, цветовые блоки
// ───────────────────────────────────────────────────────────────

export const splitProduct: Theme = {
  id: 'split-product', family: 'split', spectrum: 'classic', label: 'продуктовая · синяя',
  colors: {
    bg: '#FFFFFF', bgAlt: '#F5F7FA', ink: '#12233B', inkSoft: '#4F6178', inkFaint: '#93A1B3',
    line: '#E3E9F0', lineSoft: '#EEF2F6',
    accent: '#244A8E', accentSoft: 'rgba(36,74,142,0.08)', accentInk: '#FFFFFF',
    invBg: '#12233B', invInk: '#FFFFFF', invAccent: '#82A9DC', invInkSoft: '#6A7A8E',
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 12, btn: 8, photo: 12, mark: 6 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false },
};

export const splitClay: Theme = {
  id: 'split-clay', family: 'split', spectrum: 'soft', label: 'земляная · олива',
  colors: {
    bg: '#EFE8DA', bgAlt: '#E3D9C5', ink: '#2A2116', inkSoft: '#5C4F3A', inkFaint: '#8A7B5E',
    line: '#D7CBB2', lineSoft: '#E2D8C4',
    accent: '#6E713F', accentSoft: 'rgba(110,113,63,0.12)', accentInk: '#EFE8DA',
    invBg: '#2A2116', invInk: '#EFE8DA', invAccent: '#A8AB6F', invInkSoft: '#8A7B5E',
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 999, photo: 14, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false, photoFilter: 'saturate(0.95) sepia(0.05)' },
};

export const splitTeal: Theme = {
  id: 'split-teal', family: 'split', spectrum: 'bold', label: 'бирюзовая · смелая',
  colors: {
    bg: '#FFFFFF', bgAlt: '#EAF6F4', ink: '#0E2422', inkSoft: '#3F5C58', inkFaint: '#7D9794',
    line: '#D2E6E2', lineSoft: '#E6F2F0',
    accent: '#127068', accentSoft: 'rgba(18,112,104,0.10)', accentInk: '#FFFFFF',
    invBg: '#0E2422', invInk: '#EAF6F4', invAccent: '#5FB8AC', invInkSoft: '#5C7672',
  },
  fonts: { display: "'Space Grotesk', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 6, btn: 6, photo: 6, mark: 4 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false },
};

// ───────────────────────────────────────────────────────────────
// THEMES · STACKED family — классическая вертикальная
// ───────────────────────────────────────────────────────────────

export const stackedCorporate: Theme = {
  id: 'stacked-corporate', family: 'stacked', spectrum: 'classic', label: 'деловая · сине-серая',
  colors: {
    bg: '#FFFFFF', bgAlt: '#F4F6F8', ink: '#1C2A39', inkSoft: '#5B6A7B', inkFaint: '#95A2B0',
    line: '#E4E9EE', lineSoft: '#EFF2F5',
    accent: '#1C2A39', accentSoft: '#EEF1F4', accentInk: '#FFFFFF',
    invBg: '#1C2A39', invInk: '#FFFFFF', invAccent: '#8CA3BC', invInkSoft: '#6B7888',
  },
  fonts: { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 12, btn: 8, photo: 12, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false },
};

export const stackedCream: Theme = {
  id: 'stacked-cream', family: 'stacked', spectrum: 'soft', label: 'тёплая · охра',
  colors: {
    bg: '#FAF5EC', bgAlt: '#FFFFFF', ink: '#2A2118', inkSoft: '#5C5040', inkFaint: '#8A7C66',
    line: '#E8DECB', lineSoft: '#F0E8D8',
    accent: '#A8631F', accentSoft: 'rgba(168,99,31,0.10)', accentInk: '#FAF5EC',
    invBg: '#2A2118', invInk: '#FAF5EC', invAccent: '#D9A441', invInkSoft: '#8A7C66',
  },
  fonts: { display: "'Fraunces', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 999, photo: 14, mark: 8 },
  voice: { displayWeight: 500, italicAccent: false, dropCap: false, photoFilter: 'sepia(0.05) saturate(0.95)' },
};

export const stackedSlate: Theme = {
  id: 'stacked-slate', family: 'stacked', spectrum: 'bold', label: 'графит · акцент',
  colors: {
    bg: '#FBFBFA', bgAlt: '#F2F2F0', ink: '#1A1A1A', inkSoft: '#4F4F4D', inkFaint: '#8A8A86',
    line: '#E4E4E0', lineSoft: '#EEEEEB',
    accent: '#C24E2E', accentSoft: 'rgba(194,78,46,0.10)', accentInk: '#FBFBFA',
    invBg: '#1A1A1A', invInk: '#FBFBFA', invAccent: '#E08A5C', invInkSoft: '#6B6B68',
  },
  fonts: { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 10, btn: 6, photo: 10, mark: 6 },
  voice: { displayWeight: 800, italicAccent: false, dropCap: false },
};

// Theme registry — single source of truth for lookups.
export const themes: Record<string, Theme> = {
  [editorialWarm.id]: editorialWarm,
  [editorialNoir.id]: editorialNoir,
  [editorialMono.id]: editorialMono,
  [bentoNoir.id]: bentoNoir,
  [bentoLight.id]: bentoLight,
  [bentoClay.id]: bentoClay,
  [displaySoft.id]: displaySoft,
  [displayBold.id]: displayBold,
  [displayNoir.id]: displayNoir,
  [displayInk.id]: displayInk,
  [splitProduct.id]: splitProduct,
  [splitClay.id]: splitClay,
  [splitTeal.id]: splitTeal,
  [stackedCorporate.id]: stackedCorporate,
  [stackedCream.id]: stackedCream,
  [stackedSlate.id]: stackedSlate,
};

export function getTheme(themeId: string): Theme {
  const t = themes[themeId];
  if (!t) throw new Error(`@samosite/canon/presets: unknown themeId "${themeId}"`);
  return t;
}

// ───────────────────────────────────────────────────────────────
// EDITORIAL FAMILY
// Single markup, themed via Theme. Inline styles read from theme.
// ───────────────────────────────────────────────────────────────

export function EditorialFamily({ theme, content }: { theme: Theme; content: SlotContent }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const accentEm = (text) => text.split(/\[\[(.+?)\]\]/g).map((p, i) =>
    i % 2 === 0
      ? <React.Fragment key={i}>{p}</React.Fragment>
      : <em key={i} style={{ fontStyle: v.italicAccent ? 'italic' : 'normal', color: c.accent }}>{p}</em>
  );
  const rule = `1px solid ${c.line}`;
  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      {/* masthead */}
      <div style={{ padding: '11px 16px 9px', borderBottom: `2px solid ${c.ink}`, textAlign: 'center' }}>
        <div style={{ fontFamily: f.mono, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: c.inkSoft, marginBottom: 4 }}>с {content.meta.since} · {content.meta.category}</div>
        <div style={{ fontFamily: f.display, fontStyle: v.italicAccent ? 'italic' : 'normal', fontSize: 27, fontWeight: v.displayWeight, letterSpacing: '-0.02em', lineHeight: 1 }}>{content.meta.brand}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 16px', borderBottom: rule, fontFamily: f.mono, fontSize: 8, letterSpacing: '0.1em', textTransform: 'uppercase', color: c.inkSoft }}>
        <span>★★★★★ {content.meta.rating}</span><span>{content.meta.reviewsN} отзывов</span>
      </div>
      {/* headline */}
      <div style={{ padding: '14px 16px 12px', borderBottom: rule }}>
        <h1 style={{ fontFamily: f.display, fontSize: 30, fontWeight: v.displayWeight, lineHeight: 0.95, letterSpacing: '-0.03em', margin: 0 }}>
          {content.hero.headingLines.map((l, i) => (
            <React.Fragment key={i}>{accentEm(l)}{i < content.hero.headingLines.length - 1 && <br />}</React.Fragment>
          ))}
        </h1>
      </div>
      {/* photo fills remaining height */}
      <div style={{ flex: 1, minHeight: 0, position: 'relative', overflow: 'hidden', borderBottom: rule }}>
        <img src={content.hero.photoSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: v.photoFilter, display: 'block' }} />
        <div style={{ position: 'absolute', left: 0, bottom: 0, padding: '4px 10px', background: c.bg, borderTop: rule, borderRight: rule, fontFamily: f.mono, fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.inkSoft }}>{content.hero.photoCaption || content.meta.address}</div>
      </div>
      {/* footer CTA */}
      <div style={{ display: 'flex', alignItems: 'stretch' }}>
        <a style={{ flex: 1, background: c.accent, color: c.accentInk, padding: '12px 16px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
          {content.cta.primary.label}<span style={{ fontFamily: f.display, fontSize: 18, fontStyle: v.italicAccent ? 'italic' : 'normal' }}>→</span>
        </a>
        <div style={{ padding: '0 14px', display: 'flex', alignItems: 'center', fontFamily: f.mono, fontSize: 10, color: c.accentInk, background: c.ink, whiteSpace: 'nowrap' }}>{content.cta.phone}</div>
      </div>
    </div>
  );
}


// ───────────────────────────────────────────────────────────────
// Shared helper — render [[...]] markers as accent <em>
// ───────────────────────────────────────────────────────────────

function renderEm(text: string, color: string, italic: boolean) {
  return text.split(/\[\[(.+?)\]\]/g).map((p, i) =>
    i % 2 === 0
      ? <React.Fragment key={i}>{p}</React.Fragment>
      : <em key={i} style={{ fontStyle: italic ? 'italic' : 'normal', color }}>{p}</em>
  );
}

// ───────────────────────────────────────────────────────────────
// BENTO FAMILY — модульная сетка плиток
// ───────────────────────────────────────────────────────────────

export function BentoFamily({ theme, content }: { theme: Theme; content: SlotContent }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const s = content.stats;
  const tile = { background: c.bgAlt, borderRadius: r.card, border: `1px solid ${c.line}`, padding: 12, overflow: 'hidden' };
  const lbl = { fontFamily: f.mono, fontSize: 8, color: c.inkFaint, textTransform: 'uppercase', letterSpacing: '0.06em' };
  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 12, gap: 8, fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '0 0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: f.display, fontWeight: 700, fontSize: 13, letterSpacing: '-0.02em' }}>
          <span style={{ width: 20, height: 20, background: c.accent, color: c.accentInk, borderRadius: r.mark, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{content.meta.brand[0]}</span>{content.meta.brand}
        </div>
        <span style={{ fontFamily: f.mono, fontSize: 9, color: c.inkSoft }}>★ {content.meta.rating}</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto 1fr', gap: 8 }}>
        <div style={{ ...tile, gridColumn: 'span 2', background: c.accent, color: c.accentInk, border: 'none', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 5, background: c.bg, color: c.accent, padding: '4px 8px', borderRadius: 999, fontSize: 8, fontWeight: 700, fontFamily: f.mono, textTransform: 'uppercase', letterSpacing: '0.05em' }}><span style={{ width: 4, height: 4, background: c.accent, borderRadius: '50%' }} />свободно сегодня</span>
          <h1 style={{ fontFamily: f.display, fontSize: 22, fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.035em', margin: '10px 0 0' }}>{content.hero.headingLines.join(' ').replace(/\[\[|\]\]/g, '')}</h1>
        </div>
        {s[0] && <div style={tile}><div style={lbl}>{s[0].label}</div><div style={{ fontFamily: f.display, fontSize: 23, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 4 }}>{s[0].num}<span style={{ fontSize: 13, color: c.inkFaint }}>{s[0].unit}</span></div></div>}
        {s[1] && <div style={tile}><div style={lbl}>{s[1].label}</div><div style={{ fontFamily: f.display, fontSize: 23, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.1, marginTop: 4, color: c.accent }}>{s[1].num}<span style={{ fontSize: 13, color: c.inkFaint }}>{s[1].unit}</span></div></div>}
        <div style={{ gridColumn: 'span 2', borderRadius: r.card, overflow: 'hidden', minHeight: 0 }}>
          <img src={content.hero.photoSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: v.photoFilter, display: 'block' }} />
        </div>
      </div>
      <div style={{ ...tile, flex: '0 0 auto', background: c.invBg, color: c.invInk, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px' }}>
        <div><div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.02em' }}>{content.cta.primary.label}</div><div style={{ fontFamily: f.mono, fontSize: 9, color: c.invInkSoft, marginTop: 1 }}>{content.cta.phone}</div></div>
        <span style={{ width: 28, height: 28, background: c.accent, color: c.accentInk, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>→</span>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// DISPLAY FAMILY — гигантская типографика
// ───────────────────────────────────────────────────────────────

export function DisplayFamily({ theme, content }: { theme: Theme; content: SlotContent }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const lines = content.hero.headingLines;
  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', flex: '0 0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12, fontWeight: 600 }}><span style={{ width: 6, height: 6, background: c.accent, borderRadius: '50%' }} />{content.meta.brand}</div>
        <span style={{ fontFamily: f.mono, fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.08em', color: c.ink, padding: '5px 10px', border: `1px solid ${c.ink}`, borderRadius: 999 }}>★ {content.meta.rating}</span>
      </div>
      <div style={{ padding: '2px 16px 14px', flex: '0 0 auto' }}>
        <h1 style={{ fontFamily: f.display, fontSize: 50, fontWeight: v.displayWeight, lineHeight: 0.84, letterSpacing: '-0.045em', margin: 0 }}>
          {lines.map((l, i) => (
            <span key={i} style={{ display: 'block', color: i === 1 ? c.accent : c.ink, fontStyle: i === 1 && v.italicAccent ? 'italic' : 'normal', textIndent: i === 1 ? 16 : 0, textAlign: i === 2 ? 'right' : 'left' }}>{renderEm(l, c.accent, v.italicAccent)}</span>
          ))}
        </h1>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        <img src={content.hero.photoSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: v.photoFilter, display: 'block' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '11px 16px', background: c.invBg, color: c.invInk, flex: '0 0 auto' }}>
        <div style={{ fontFamily: f.mono, fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.06em', color: c.invInkSoft }}>{content.meta.address}</div>
        <a style={{ background: c.invAccent, color: c.invBg, padding: '9px 16px', borderRadius: r.btn, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>{content.cta.primary.label} →</a>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// SPLIT FAMILY — двухколоночная, цветовые блоки
// ───────────────────────────────────────────────────────────────

export function SplitFamily({ theme, content }: { theme: Theme; content: SlotContent }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const s = content.stats;
  const heading = content.hero.headingLines.join(' ').replace(/\[\[|\]\]/g, '');
  const div = `1px solid ${c.invInkSoft}55`;
  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ width: '42%', minHeight: 0, overflow: 'hidden' }}>
        <img src={content.hero.photoSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: v.photoFilter, display: 'block' }} />
      </div>
      <div style={{ flex: 1, minWidth: 0, background: c.invBg, color: c.invInk, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: '0 0 auto' }}>
          <div style={{ fontFamily: f.display, fontSize: 14, fontWeight: 700 }}>{content.meta.brand}<span style={{ color: c.invAccent }}>.</span></div>
          <span style={{ fontFamily: f.mono, fontSize: 8, opacity: 0.7 }}>★ {content.meta.rating}</span>
        </div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 16px' }}>
          <div style={{ fontFamily: f.mono, fontSize: 8, textTransform: 'uppercase', letterSpacing: '0.12em', color: c.invAccent, marginBottom: 8 }}>{content.meta.category}</div>
          <h1 style={{ fontFamily: f.display, fontSize: 25, fontWeight: 800, lineHeight: 0.98, letterSpacing: '-0.03em', margin: 0 }}>{heading}</h1>
          <p style={{ fontSize: 11, lineHeight: 1.5, opacity: 0.82, margin: '10px 0 0' }}>{content.hero.leadParagraph?.slice(0, 88)}…</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${s.length}, 1fr)`, borderTop: div, flex: '0 0 auto' }}>
          {s.map((st, i) => (
            <div key={i} style={{ padding: '9px 6px', textAlign: 'center', borderRight: i < s.length - 1 ? div : undefined }}>
              <div style={{ fontFamily: f.display, fontSize: 16, fontWeight: 800, color: c.invAccent, lineHeight: 1 }}>{st.num}<span style={{ fontSize: 10 }}>{st.unit}</span></div>
              <div style={{ fontFamily: f.mono, fontSize: 7, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.65, marginTop: 3 }}>{st.label}</div>
            </div>
          ))}
        </div>
        <a style={{ background: c.accent, color: c.accentInk, padding: '12px 16px', textAlign: 'center', fontSize: 12, fontWeight: 700, flex: '0 0 auto' }}>{content.cta.primary.label.split(' ')[0]} →</a>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// STACKED FAMILY — классическая вертикальная карточная
// ───────────────────────────────────────────────────────────────

export function StackedFamily({ theme, content }: { theme: Theme; content: SlotContent }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const heading = content.hero.headingLines.join(' ').replace(/\[\[|\]\]/g, '');
  return (
    <div style={{ background: c.bg, color: c.ink, fontFamily: f.body, flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden', fontVariantNumeric: 'tabular-nums' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 16px', borderBottom: `1px solid ${c.line}`, flex: '0 0 auto' }}>
        <div style={{ fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: '-0.015em' }}>{content.meta.brand}</div>
        <a style={{ background: c.accent, color: c.accentInk, padding: '7px 13px', borderRadius: r.btn, fontSize: 11, fontWeight: 600 }}>Записаться</a>
      </div>
      <div style={{ padding: '18px 18px 12px', textAlign: 'center', flex: '0 0 auto' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: c.accentSoft, color: c.accent, borderRadius: 999, fontSize: 10, fontWeight: 500, marginBottom: 10 }}><span style={{ width: 5, height: 5, background: c.accent, borderRadius: '50%' }} />{content.meta.category} · {content.meta.address.split(',').pop()?.trim()}</div>
        <h1 style={{ fontFamily: f.display, fontSize: 25, fontWeight: v.displayWeight, lineHeight: 1.04, letterSpacing: '-0.025em', margin: '0 auto', maxWidth: '94%' }}>{heading}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, fontSize: 11, color: c.inkSoft, marginTop: 10, alignItems: 'center' }}><span style={{ color: c.accent }}>★★★★★</span><b>{content.meta.rating}</b><span style={{ color: c.inkFaint }}>·</span><span>{content.meta.reviewsN} отзывов</span></div>
      </div>
      <div style={{ flex: 1, minHeight: 0, margin: '0 18px', borderRadius: r.photo, overflow: 'hidden' }}>
        <img src={content.hero.photoSrc} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: v.photoFilter, display: 'block' }} />
      </div>
      <div style={{ padding: '14px 18px', display: 'flex', gap: 8, flex: '0 0 auto' }}>
        <a style={{ flex: 1, background: c.accent, color: c.accentInk, padding: '12px', borderRadius: r.btn, textAlign: 'center', fontSize: 13, fontWeight: 600 }}>{content.cta.primary.label}</a>
        <a style={{ padding: '12px 16px', border: `1px solid ${c.line}`, borderRadius: r.btn, textAlign: 'center', fontSize: 12, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', color: c.ink }}>{content.cta.phone}</a>
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// PRESET RENDERER
// Single entry point: pass (preset, content) → get themed family render.
// ───────────────────────────────────────────────────────────────

const FAMILIES: Record<FamilyKey, React.ComponentType<{ theme: Theme; content: SlotContent }>> = {
  editorial: EditorialFamily,
  bento: BentoFamily,
  display: DisplayFamily,
  split: SplitFamily,
  stacked: StackedFamily,
};

export function PresetRenderer({ preset, content }: { preset: Preset; content: SlotContent }) {
  const theme = getTheme(preset.themeId);
  const Family = FAMILIES[preset.familyId] ?? FAMILIES.editorial;
  if (theme.family !== preset.familyId) {
    // Soft guard: theme belongs to another family. Renderer still works but logs in dev.
    if (typeof console !== 'undefined' && console.warn) {
      console.warn(`[@samosite/canon] preset mismatch: theme "${theme.id}" is for family "${theme.family}", but preset.familyId is "${preset.familyId}"`);
    }
  }
  return <Family theme={theme} content={content} />;
}

// ───────────────────────────────────────────────────────────────
// MiniChrome — browser frame wrapper, canon-side (uses VT tokens)
// ───────────────────────────────────────────────────────────────

export function MiniChrome({ host, children, height = 460 }: { host: string; children: React.ReactNode; height?: number }) {
  return (
    <div style={{
      overflow: 'hidden', borderRadius: 12,
      border: `1px solid ${VT.lineSoft}`,
      display: 'flex', flexDirection: 'column',
      width: '100%', minWidth: 0, height,
      background: VT.white,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 10px', background: '#fff', borderBottom: `1px solid ${VT.line}`, flex: '0 0 auto' }}>
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e3decf' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e3decf' }} />
        <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e3decf' }} />
        <span style={{ marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }}>{host}.{BRAND.domain}</span>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        {children}
      </div>
    </div>
  );
}

// ───────────────────────────────────────────────────────────────
// FIXTURES · разные бизнесы для карусели на лендинге
// ───────────────────────────────────────────────────────────────

// Real photography via Unsplash CDN, direct stable photo ids.
const EX_U = (id: string, w = 720): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const fixtureCoffeeLena: SlotContent = {
  meta: { brand: 'Утро у Лены', host: 'lena', category: 'Кофейня', address: 'Платонова 12, Воронеж', since: '2019', rating: '4.9', reviewsN: 128 },
  hero: {
    headingLines: ['Кофе', '[[&]] завтраки', 'с 07:30'],
    leadParagraph: 'Лена обжаривает зерно сама, раз в неделю. Альтернативное молоко без доплат. Вынос за три минуты — успеете на работу.',
    photoSrc: EX_U('photo-1495474472287-4d71bcdd2085', 720),
    photoCaption: 'Фото · стойка, четверг 08:14',
  },
  stats: [
    { num: '07:30', label: 'открытие' },
    { num: '3', unit: ' мин', label: 'вынос' },
    { num: '0 ₽', label: 'альт.молоко' },
  ],
  menu: {
    eyebrow: 'Меню утра',
    title: 'Что заказывают [[каждый день]]',
    items: [
      { num: '01', name: 'Капучино', desc: '250 мл · альт.молоко без доплат', price: '220 ₽' },
      { num: '02', name: 'Раф ванильный', desc: '300 мл · на сливках', price: '280 ₽' },
      { num: '03', name: 'Сырники со сметаной', desc: '3 шт · 180 г', price: '340 ₽' },
      { num: '04', name: 'Авокадо-тост', desc: 'с яйцом-пашот', price: '390 ₽' },
    ],
  },
  quote: { text: '«Ребята помнят моё [["как обычно"]] с третьего раза.»', authorName: 'Алина К.', authorSource: '2ГИС', authorWhen: '2 недели назад' },
  cta: { primary: { label: 'Заказать к приходу' }, phone: '+7 (900) 000-00-12' },
};

export const fixtureBakeryDom: SlotContent = {
  meta: { brand: 'Пекарня «Дом»', host: 'dom-bakery', category: 'Пекарня', address: 'Большая Конюшенная 9, Питер', since: '2017', rating: '4.8', reviewsN: 246 },
  hero: {
    headingLines: ['Хлеб', 'на [[закваске]]', 'до полудня'],
    leadParagraph: 'Печём в 5 утра, выкладываем к 7. После 12:00 ничего не остаётся — лучше брать с утра или заказывать накануне через Telegram.',
    photoSrc: EX_U('photo-1509440159596-0249088772ff', 720),
    photoCaption: 'Фото · печь, среда 06:30',
  },
  stats: [
    { num: '05:00', label: 'начало выпечки' },
    { num: '18', label: 'видов хлеба' },
    { num: '0 ₽', label: 'дрожжей' },
  ],
  menu: {
    eyebrow: 'Сегодня в печке',
    title: 'Что заказывают [[на завтра]]',
    items: [
      { num: '01', name: 'Бородинский на закваске', desc: '500 г · с тмином', price: '240 ₽' },
      { num: '02', name: 'Багет фермерский', desc: '320 г · хрустящая корка', price: '180 ₽' },
      { num: '03', name: 'Чиабатта оливковая', desc: '280 г', price: '210 ₽' },
      { num: '04', name: 'Слойка с яблоком', desc: '110 г · домашнее тесто', price: '120 ₽' },
    ],
  },
  quote: { text: '«Хлеб как у бабушки в деревне. [[Корка такая же]], не как в магазине.»', authorName: 'Мария Р.', authorSource: 'Яндекс', authorWhen: '5 дней назад' },
  cta: { primary: { label: 'Заказать к утру' }, phone: '+7 (900) 000-00-11' },
};

export const fixtureAutoPark: SlotContent = {
  meta: { brand: 'Park · автосервис', host: 'park-auto', category: 'Автосервис', address: 'Промышленная 14, Самара', since: '2013', rating: '4.8', reviewsN: 214 },
  hero: {
    headingLines: ['Диагностика', 'за [[30 минут]]', 'без сюрпризов'],
    leadParagraph: 'Сначала звонок и расчёт. После «да» начинаем — без сюрпризов в чеке. Сегодня свободны окна 14:00 и 16:30.',
    photoSrc: EX_U('photo-1486262715619-67b85e0b08d3', 720),
    photoCaption: 'Фото · бокс №2, понедельник',
  },
  stats: [
    { num: '12', unit: ' лет', label: 'на одном месте' },
    { num: '4.8', label: 'рейтинг 2ГИС' },
    { num: '6 мес', label: 'гарантия' },
  ],
  menu: {
    eyebrow: 'Прайс без звёздочек',
    title: 'Что [[делаем]] чаще всего',
    items: [
      { num: '01', name: 'Компьютерная диагностика', desc: 'ходовая, тормоза, ЭБУ · 30 мин', price: 'бесплатно' },
      { num: '02', name: 'Замена масла + фильтр', desc: 'оригинал или аналог', price: 'от 1 200 ₽' },
      { num: '03', name: 'Тормозные колодки', desc: 'передние / задние', price: 'от 2 800 ₽' },
      { num: '04', name: 'Развал-схождение', desc: '3D · гарантия 6 мес', price: 'от 2 400 ₽' },
    ],
  },
  quote: { text: '«Сначала позвонили, объяснили, что и зачем. [[Ничего лишнего не навязали]].»', authorName: 'Дмитрий В.', authorSource: 'Яндекс.Карты', authorWhen: '6 дней назад' },
  cta: { primary: { label: 'Записаться на диагностику' }, phone: '+7 (900) 000-00-08' },
};

export const fixtureNailsAnna: SlotContent = {
  meta: { brand: 'Студия Анны', host: 'anna-nails', category: 'Маникюр', address: 'Куйбышева 8, Екатеринбург', since: '2017', rating: '5.0', reviewsN: 86 },
  hero: {
    headingLines: ['Аппаратный', 'маникюр,', 'держится [[3 недели]]'],
    leadParagraph: 'Работает одна Анна, не конвейер. Запись через Telegram, без звонков и CRM. Дизайн на два ногтя в подарок при первом визите.',
    photoSrc: EX_U('photo-1604654894610-df63bc536371', 720),
    gallery: [EX_U('photo-1610992015732-2449b76344bc', 480), EX_U('photo-1632345031435-8727f6897d53', 480)],
    photoCaption: 'Фото · работа, четверг',
  },
  stats: [
    { num: '21', unit: ' день', label: 'средняя носка' },
    { num: '5.0', label: 'рейтинг' },
    { num: '9', unit: ' лет', label: 'опыта' },
  ],
  menu: {
    eyebrow: 'Цены за май',
    title: 'Что заказывают [[чаще всего]]',
    items: [
      { num: '01', name: 'Маникюр + покрытие', desc: 'аппаратный, бережно · 1,5 ч', price: '2 400 ₽' },
      { num: '02', name: 'Дизайн на 2 ногтя', desc: 'от простого до сложного', price: '300 ₽' },
      { num: '03', name: 'Снятие чужого покрытия', desc: 'аккуратно, без вреда', price: '500 ₽' },
      { num: '04', name: 'Укрепление акригелем', desc: 'для тонких и ломких', price: '600 ₽' },
    ],
  },
  quote: { text: '«Анна спокойная, объясняет, что делает. [[Никогда не было сколов]].»', authorName: 'Олеся Н.', authorSource: 'Яндекс', authorWhen: '3 дня назад' },
  cta: { primary: { label: 'Записаться в Telegram' }, phone: '@anna_studio' },
};

export const fixtureBrowsSochi: SlotContent = {
  meta: { brand: 'Brow Bar Соль', host: 'sol-brows', category: 'Брови и ресницы', address: 'Навагинская 9, Сочи', since: '2019', rating: '4.9', reviewsN: 154 },
  hero: {
    headingLines: ['Брови', 'по [[вашей]]', 'форме лица'],
    leadParagraph: 'Не рисуем чужую форму — подчёркиваем вашу. Коррекция, ламинирование, окрашивание за один визит. Держится 6 недель.',
    photoSrc: EX_U('photo-1487412947147-5cebf100ffc2', 720),
    gallery: [EX_U('photo-1522335789203-aabd1fc54bc9', 480), EX_U('photo-1457972729786-0411a3b2b626', 480)],
    photoCaption: 'Фото · ламинирование, среда',
  },
  stats: [
    { num: '6', unit: ' нед', label: 'держится' },
    { num: '40', unit: ' мин', label: 'на визит' },
    { num: '4.9', label: 'рейтинг' },
  ],
  menu: {
    eyebrow: 'Прайс',
    title: 'Что [[выбирают]] чаще',
    items: [
      { num: '01', name: 'Коррекция + окрашивание', desc: 'воск, пинцет, краска или хна', price: '1 400 ₽' },
      { num: '02', name: 'Ламинирование бровей', desc: 'фиксация формы на 6 недель', price: '2 200 ₽' },
      { num: '03', name: 'Ламинирование ресниц', desc: 'без наращивания, свой объём', price: '2 600 ₽' },
      { num: '04', name: 'Комплекс брови + ресницы', desc: 'за один визит, выгоднее', price: '4 200 ₽' },
    ],
  },
  quote: { text: '«Первый раз brow-мастер не сделала мне [[чужие брови]]. Свои, но аккуратные.»', authorName: 'Карина Т.', authorSource: 'Яндекс', authorWhen: '1 неделю назад' },
  cta: { primary: { label: 'Записаться онлайн' }, phone: 'онлайн-запись' },
};

export const fixtureBarberFedor: SlotContent = {
  meta: { brand: 'Барбершоп «Фёдор»', host: 'fedor-barber', category: 'Барбершоп', address: 'Никитский 3, Москва', since: '2018', rating: '4.9', reviewsN: 312 },
  hero: {
    headingLines: ['Стрижка', '[[+]] борода', 'за 45 минут'],
    leadParagraph: 'Только мужские стрижки и борода. Без салона, без женского зала, без музыки в наушниках мастера. Виски бесплатно — после стрижки, если хотите.',
    photoSrc: EX_U('photo-1503951914875-452162b0f3f1', 720),
    photoCaption: 'Фото · кресло, суббота',
    gallery: [
      EX_U('photo-1599351431613-18ef1fdd27e1', 480),
      EX_U('photo-1622286342621-4bd786c2447c', 480),
    ],
  },
  stats: [
    { num: '45', unit: ' мин', label: 'на стрижку' },
    { num: '8', unit: ' лет', label: 'с 2018' },
    { num: '4', label: 'мастера' },
  ],
  menu: {
    eyebrow: 'Прайс',
    title: 'Что [[заказывают]] постоянные',
    items: [
      { num: '01', name: 'Мужская стрижка', desc: 'машинка + ножницы', price: '2 200 ₽' },
      { num: '02', name: 'Стрижка + борода', desc: 'с горячим полотенцем', price: '3 000 ₽' },
      { num: '03', name: 'Камуфляж седины', desc: '20 мин · стойко', price: '1 200 ₽' },
      { num: '04', name: 'Опасной бритвой', desc: 'голова или борода', price: '1 800 ₽' },
    ],
  },
  quote: { text: '«Хожу к Глебу третий год. [[Всегда вспоминает]], как стригли в прошлый раз.»', authorName: 'Антон К.', authorSource: 'Яндекс.Карты', authorWhen: '4 дня назад' },
  cta: { primary: { label: 'Записаться к мастеру' }, phone: '+7 (900) 000-00-14' },
};

export const fixtureFitnessMetod: SlotContent = {
  meta: { brand: 'Студия «Метод»', host: 'metod-studio', category: 'Пилатес', address: 'Пионерская 12, Санкт-Петербург', since: '2018', rating: '4.9', reviewsN: 187 },
  hero: {
    headingLines: ['Пилатес', 'в группе', '[[из шести]]'],
    leadParagraph: 'Каждое занятие — личное внимание тренера. Безопасный прогресс без перегруза. Первое занятие — бесплатно, занимает 50 минут.',
    photoSrc: EX_U('photo-1518611012118-696072aa579a', 720),
    gallery: [EX_U('photo-1571019613454-1cb2f99b2d8b', 480)],
    photoCaption: 'Фото · зал, утро вторника',
  },
  stats: [
    { num: '6', label: 'в группе' },
    { num: '12', label: 'тренеров' },
    { num: '8', unit: ' лет', label: 'студии' },
  ],
  menu: {
    eyebrow: 'Абонементы',
    title: 'Что [[покупают]] на первый месяц',
    items: [
      { num: '01', name: 'Разовое занятие', desc: 'первое — бесплатно', price: '1 400 ₽' },
      { num: '02', name: '4 в месяц', desc: 'раз в неделю', price: '5 200 ₽' },
      { num: '03', name: '8 в месяц', desc: 'самый популярный', price: '9 800 ₽' },
      { num: '04', name: '12 в месяц', desc: 'для регулярных', price: '13 200 ₽' },
    ],
  },
  quote: { text: '«Через три месяца [[забыла про боль в спине]]. Хотя пришла туда именно с ней.»', authorName: 'Екатерина М.', authorSource: '2ГИС', authorWhen: '1 неделю назад' },
  cta: { primary: { label: 'Записаться на первое' }, phone: '+7 (900) 000-00-50' },
};

export const fixtureLegalSitnikov: SlotContent = {
  meta: { brand: 'Ситников и партнёры', host: 'sitnikov-law', category: 'Юр.практика', address: 'Тверская 14, оф. 412, Москва', since: '2014', rating: '4.9', reviewsN: 312 },
  hero: {
    headingLines: ['Возврат денег', 'от [[застройщика]]', 'без аванса'],
    leadParagraph: 'Берём дело в работу — платите только после выигрыша. Первая консультация бесплатна и занимает 40 минут. Скажем сразу, есть ли перспектива.',
    photoSrc: EX_U('photo-1497366754035-f200968a6e72', 720),
    photoCaption: 'Фото · офис, четверг',
  },
  stats: [
    { num: '94%', label: 'дел выиграно' },
    { num: '312', label: 'дел в 2024' },
    { num: '10', unit: ' лет', label: 'в одном офисе' },
  ],
  menu: {
    eyebrow: 'Услуги',
    title: 'Что [[ведём]] чаще всего',
    items: [
      { num: '01', name: 'Возврат от застройщика', desc: 'неустойка, расторжение, просрочка', price: '20% от суммы' },
      { num: '02', name: 'Семейные споры', desc: 'развод, раздел, алименты', price: 'от 30 000 ₽' },
      { num: '03', name: 'Трудовые споры', desc: 'увольнение, восстановление', price: 'от 25 000 ₽' },
      { num: '04', name: 'Защита потребителей', desc: 'возврат, гарантия, замена', price: '15% от суммы' },
    ],
  },
  quote: { text: '«Вернули 1,2 млн неустойки от застройщика за 4 месяца. [[Никаких авансов]] — всё после суда.»', authorName: 'Михаил П.', authorSource: 'Яндекс', authorWhen: '2 недели назад' },
  cta: { primary: { label: 'Записаться на консультацию' }, phone: '+7 (900) 000-00-40' },
};

export const fixturePhotoMarta: SlotContent = {
  meta: { brand: 'Марта · фотограф', host: 'marta-photo', category: 'Фотограф', address: 'выезд по Москве', since: '2020', rating: '5.0', reviewsN: 94 },
  hero: {
    headingLines: ['Семейные', 'съёмки [[дома]]', 'и в студии'],
    leadParagraph: 'Без принуждённых поз и натянутых улыбок. Снимаю как есть: дети возятся, бабушка ворчит, кот не вписался. Передаю 70+ обработанных фото через 2 недели.',
    photoSrc: EX_U('photo-1452587925148-ce544e77e70d', 720),
    gallery: [EX_U('photo-1606216794074-735e91aa2c92', 480)],
    photoCaption: 'Фото · семья К., январь',
  },
  stats: [
    { num: '70+', label: 'фото в съёмке' },
    { num: '14', unit: ' дней', label: 'до результата' },
    { num: '6', unit: ' лет', label: 'опыта' },
  ],
  menu: {
    eyebrow: 'Форматы',
    title: 'Что [[заказывают]] чаще всего',
    items: [
      { num: '01', name: 'Семейная съёмка дома', desc: '2 часа · 70+ фото', price: '18 000 ₽' },
      { num: '02', name: 'Прогулка на улице', desc: '1,5 часа · 50+ фото', price: '14 000 ₽' },
      { num: '03', name: 'Студия', desc: '1 час · 40+ фото · аренда отдельно', price: '12 000 ₽' },
      { num: '04', name: 'Беременность + после', desc: 'пакет из двух съёмок', price: '28 000 ₽' },
    ],
  },
  quote: { text: '«Сын ни секунды не сидел на месте. Марта [[превратила это в плюс]] — кадры живые, не постановочные.»', authorName: 'Юлия С.', authorSource: 'Instagram', authorWhen: 'месяц назад' },
  cta: { primary: { label: 'Написать в WhatsApp' }, phone: 'написать в WhatsApp' },
};

export const fixtureTattooLine: SlotContent = {
  meta: { brand: 'Line tattoo', host: 'line-tattoo', category: 'Тату-студия', address: 'Малая Бронная 6, Москва', since: '2016', rating: '5.0', reviewsN: 218 },
  hero: {
    headingLines: ['Тонкие', '[[линии]] и', 'минимализм'],
    leadParagraph: 'Только тонкие линии, минимал и геометрия. Никакого олдскула, реализма и цветных портретов. Запись через эскиз — приносите идею, обсуждаем размер и место.',
    photoSrc: EX_U('photo-1565058379802-bbe93b2f703a', 720),
    gallery: [EX_U('photo-1611501275019-9b5cda994e8d', 480), EX_U('photo-1542856391-010fb87dcfed', 480)],
    photoCaption: 'Фото · работа Влада, март',
  },
  stats: [
    { num: '4', label: 'мастера' },
    { num: '10', unit: ' лет', label: 'студии' },
    { num: '218', label: 'отзывов' },
  ],
  menu: {
    eyebrow: 'Прайс',
    title: 'Минимум — [[15 минут]] работы',
    items: [
      { num: '01', name: 'Мини-эскиз до 5 см', desc: 'линии, символы, цифры', price: '5 000 ₽' },
      { num: '02', name: 'Средний 5–15 см', desc: 'геометрия, ботаника, надписи', price: 'от 12 000 ₽' },
      { num: '03', name: 'Час работы', desc: 'для крупных эскизов', price: '8 000 ₽' },
      { num: '04', name: 'Перекрытие старой', desc: 'оценка по фото', price: 'по договорённости' },
    ],
  },
  quote: { text: '«Влад нарисовал [[именно то, что я хотела]], но не могла объяснить. Линии тонкие, не расплылись через год.»', authorName: 'Дарья Л.', authorSource: 'Instagram', authorWhen: '2 недели назад' },
  cta: { primary: { label: 'Прислать эскиз' }, phone: '@line_tattoo' },
};

// Sample presets — carousel on landing. NOW with real structural variety:
// different families (editorial / bento / display / split / stacked), not just
// recolors. Each business gets the family that fits its nature.
export const samplePresets: { preset: Preset; content: SlotContent; tagline: string }[] = [
  { preset: { themeId: 'display-soft',      familyId: 'display'   }, content: fixtureNailsAnna,      tagline: 'Маникюр · Екатеринбург' },
  { preset: { themeId: 'bento-noir',        familyId: 'bento'     }, content: fixtureAutoPark,       tagline: 'Автосервис · Самара' },
  { preset: { themeId: 'editorial-warm',    familyId: 'editorial' }, content: fixtureCoffeeLena,    tagline: 'Кофейня · Воронеж' },
  { preset: { themeId: 'display-noir',      familyId: 'display'   }, content: fixtureBarberFedor,    tagline: 'Барбершоп · Москва' },
  { preset: { themeId: 'split-product',     familyId: 'split'     }, content: fixtureFitnessMetod,   tagline: 'Пилатес · Петербург' },
  { preset: { themeId: 'display-ink',       familyId: 'display'   }, content: fixtureTattooLine,     tagline: 'Тату-студия · Москва' },
  { preset: { themeId: 'stacked-corporate', familyId: 'stacked'   }, content: fixtureLegalSitnikov,  tagline: 'Юр.практика · Москва' },
  { preset: { themeId: 'split-teal',        familyId: 'split'     }, content: fixturePhotoMarta,     tagline: 'Фотограф · Москва' },
  { preset: { themeId: 'stacked-cream',     familyId: 'stacked'   }, content: fixtureBakeryDom,      tagline: 'Пекарня · Петербург' },
  { preset: { themeId: 'display-bold',      familyId: 'display'   }, content: fixtureBrowsSochi,     tagline: 'Брови и ресницы · Сочи' },
];
