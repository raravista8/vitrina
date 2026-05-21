/**
 * `<BrandMark>` — каноническая бренд-марка «Самосайт» (logo + wordmark).
 *
 * Spec source: `/tmp/samosite-canon/tokens.jsx` → функции `Logo` + `BrandMark`,
 * see also docs/COPY.md §«Бренд» (v2). Описание визуала:
 *
 *   ┌──────┐
 *   │   С  │ Самосайт                ← Onest 700 для wordmark, gap = 8 px
 *   └──────┘
 *
 *   • квадрат `border-radius: round(size × 0.27)`
 *   • фон `bg-accent` (`oklch(0.605 0.155 35)` — терракотовый, из tailwind.config)
 *   • буква «С» — Onest 800, размер 66% от size, letter-spacing −0.04 em,
 *     paddingBottom 4% от size (optical centering для кириллической С,
 *     которая немного выше baseline)
 *
 * Размеры (`size` proportional scaling):
 *   • 22 — admin sidebar, customer-site footer
 *   • 26 — landing nav (desktop)
 *   • 20 — landing footer (мини)
 *   • 80–512 — favicon / og-image generator (вызывается из `infra/scripts/`)
 *
 * Использование:
 *
 *   <BrandMark />                          ← Logo + «Самосайт», стандарт 22/16
 *   <BrandMark size={26} fontSize={20} />  ← landing nav
 *   <BrandMark logoOnly />                  ← только квадрат, без слова
 *
 * NOT to be confused with: `BenefitsStack`, `Hero` brand-text inline (которые
 * рендерят брэнд другими способами). Эти места постепенно мигрируют на
 * `<BrandMark>` в PR-C (E11) и PR-F (E14).
 */

import { cn } from "@/lib/cn";

interface LogoProps {
  /** Размер квадрата в пикселях. */
  size?: number;
  /** Tailwind className для дополнительных модификаций (margin / display etc). */
  className?: string;
  /** Цвет фона. По умолчанию `bg-accent` (терракотовый). Для тёмных секций
   *  можно передать `bg-white` или другой acc-token. */
  bgClassName?: string;
  /** Цвет буквы. По умолчанию белый. */
  letterClassName?: string;
}

export function Logo({
  size = 26,
  className,
  bgClassName = "bg-accent",
  letterClassName = "text-white",
}: LogoProps) {
  // Все рассчитанные пиксели проксируем через inline-style, потому что
  // конкретные числа зависят от run-time size — статичных Tailwind-классов
  // для произвольных размеров нет.
  const radius = Math.round(size * 0.27);
  const fontSize = Math.round(size * 0.66);
  const paddingBottom = Math.max(1, Math.round(size * 0.04));

  return (
    <span
      aria-label="Самосайт"
      role="img"
      className={cn(
        "inline-flex shrink-0 items-center justify-center font-bold leading-none",
        bgClassName,
        letterClassName,
        className,
      )}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        // Onest with bold weight — defined in tailwind.config.ts `fontFamily.sans`.
        // Letter spacing → tighter optical for cyrillic С at small sizes.
        fontFamily: '"Onest", "Inter", system-ui, sans-serif',
        fontWeight: 800,
        fontSize,
        letterSpacing: "-0.04em",
        paddingBottom,
      }}
    >
      С
    </span>
  );
}

interface BrandMarkProps {
  /** Размер квадрата логотипа. */
  size?: number;
  /** Размер шрифта wordmark «Самосайт». По умолчанию proportional ~size × 0.77. */
  fontSize?: number;
  /** Tailwind text-color для wordmark. По умолчанию `text-ink`. */
  textClassName?: string;
  /** Не рендерить «Самосайт», только квадратик. */
  logoOnly?: boolean;
  /** Tailwind className для wrapper. */
  className?: string;
  /** Цвет фона логотипа (см. `LogoProps.bgClassName`). */
  logoBgClassName?: string;
  /** Цвет буквы (см. `LogoProps.letterClassName`). */
  logoLetterClassName?: string;
}

export function BrandMark({
  size = 22,
  fontSize,
  textClassName = "text-ink",
  logoOnly = false,
  className,
  logoBgClassName,
  logoLetterClassName,
}: BrandMarkProps) {
  const wordSize = fontSize ?? Math.max(14, Math.round(size * 0.77));
  return (
    <span
      className={cn("inline-flex items-center gap-2 font-bold tracking-[-0.02em]", className)}
      style={{ fontSize: wordSize }}
    >
      <Logo size={size} bgClassName={logoBgClassName} letterClassName={logoLetterClassName} />
      {!logoOnly && <span className={textClassName}>Самосайт</span>}
    </span>
  );
}
