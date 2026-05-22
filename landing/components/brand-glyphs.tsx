/**
 * Brand-recognizable SVG-glyphs для 3 платформ: Яндекс.Карты, 2ГИС, Avito.
 *
 * Spec: docs/COPY.md §«Бренд» + CLAUDE_CODE_TZ_session_v2.1.3.md §1.4.
 *
 * Эти glyphs используются в двух местах:
 *   1. `<Platforms>` секция — большой 20×20 chip с full SVG.
 *   2. `<Hero>` compact platform list под input — micro 16×16 inline.
 *
 * Извлечено из inline `<Platforms>` definitions в Phase 5/9 v2.1.3
 * roadmap чтобы избежать DRY violation между Hero и Platforms. Если
 * нужно добавить новый бренд (например, реальный «V» для VK или
 * YouTube play-glyph) — расширяй этот файл, не отдельный компонент.
 *
 * Все glyphs:
 *   - viewBox 0 0 20 20
 *   - aria-hidden="true" role="presentation" — accessibility tree
 *     ignores; meaningful text живёт в parent <span> с brand name
 *   - Size настраивается через `width`/`height` props (default 20)
 *
 * Цвета — точные brand colors (verified на public assets brand kits
 * на январь 2026):
 *   - Yandex Maps red:  #FC3F1D
 *   - 2GIS green:       #19BB4F
 *   - Avito blue:       #00AAFF
 *   - Avito orange:     #FF9C00
 */

interface BrandGlyphProps {
  /** Size в px. Default 20 (для Platforms). Hero compact list — 16. */
  size?: number;
}

/** Яндекс.Карты — красный pin-drop #FC3F1D с белым кругом внутри. */
export function YandexMapsGlyph({ size = 20 }: BrandGlyphProps = {}) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      aria-hidden="true"
      role="presentation"
      className="-mr-0.5"
    >
      <path
        d="M10 1.5c-3.6 0-6.5 2.9-6.5 6.5 0 4.4 6.5 10.5 6.5 10.5s6.5-6.1 6.5-10.5c0-3.6-2.9-6.5-6.5-6.5z"
        fill="#FC3F1D"
      />
      <circle cx="10" cy="8" r="2.6" fill="#FFFFFF" />
    </svg>
  );
}

/** 2ГИС — зелёный rounded-square #19BB4F с белой жирной «2». */
export function TwoGisGlyph({ size = 20 }: BrandGlyphProps = {}) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true" role="presentation">
      <rect x="0" y="0" width="20" height="20" rx="4.5" fill="#19BB4F" />
      <text
        x="10"
        y="15"
        textAnchor="middle"
        fontFamily='"Onest", "Inter", system-ui, sans-serif'
        fontWeight="900"
        fontSize="14"
        fill="#FFFFFF"
      >
        2
      </text>
    </svg>
  );
}

/** Avito — голубой #00AAFF rounded-square + оранжевый #FF9C00 accent + белая «A». */
export function AvitoGlyph({ size = 20 }: BrandGlyphProps = {}) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size} aria-hidden="true" role="presentation">
      <rect x="0" y="0" width="20" height="20" rx="4.5" fill="#00AAFF" />
      <circle cx="14.5" cy="5.5" r="3.2" fill="#FF9C00" />
      <text
        x="10"
        y="17"
        textAnchor="middle"
        fontFamily='"Onest", "Inter", system-ui, sans-serif'
        fontWeight="900"
        fontSize="15"
        fill="#FFFFFF"
      >
        A
      </text>
    </svg>
  );
}
