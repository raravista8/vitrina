/**
 * `<Examples>` — landing v2 секция «Примеры», 3 кейса.
 *
 * Доказательство «это реально работает». Каждая карточка содержит hero-фото,
 * имя+категория+город, услуги (3-4 топ-позиции с mono-ценой), куратор-отзывы
 * (1-2, ☆-rated), мини-галерею (4 thumbnails), и кнопку «Посмотреть пример».
 *
 * Layout:
 *   - **Mobile (<sm)**: горизонтальный scroll-snap карусель,
 *     `scroll-snap-type: x mandatory; scroll-snap-align: start;`,
 *     `min-width: 86vw` per card. Под каруселью — подсказка
 *     `← ЛИСТАЙТЕ ВПРАВО →`.
 *   - **Desktop (sm+)**: 3-col grid.
 *
 * Spec: docs/COPY.md §2.3 + `/tmp/samosite-canon/landing-samosite.jsx`.
 *
 * Image URLs в `EXAMPLES` — placeholders сейчас (нет файлов в `public/`).
 * В production T14.7 заменяет их на CDN-URLs через `/render` proxy.
 * До тех пор — палитра-tinted CSS-плашки (gradient placeholders),
 * чтобы card visual был непустым в dev и в CI.
 */

import { ArrowRight, Star } from "lucide-react";

import { EXAMPLES, type Example, sourceLabel } from "@/content/examples";

const PALETTE_GRADIENT: Record<Example["palette"], string> = {
  peach: "linear-gradient(135deg, oklch(0.84 0.07 50) 0%, oklch(0.62 0.09 35) 100%)",
  sage: "linear-gradient(135deg, oklch(0.82 0.06 145) 0%, oklch(0.58 0.08 145) 100%)",
  sky: "linear-gradient(135deg, oklch(0.86 0.06 220) 0%, oklch(0.55 0.10 230) 100%)",
  butter: "linear-gradient(135deg, oklch(0.90 0.08 90) 0%, oklch(0.66 0.13 75) 100%)",
  rose: "linear-gradient(135deg, oklch(0.86 0.06 25) 0%, oklch(0.65 0.10 20) 100%)",
  lavender: "linear-gradient(135deg, oklch(0.86 0.06 290) 0%, oklch(0.60 0.10 285) 100%)",
};

function ExampleCard({ ex }: { ex: Example }) {
  return (
    <article className="flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card sm:w-auto sm:snap-none">
      {/* Hero photo (placeholder gradient → CDN URL T14.7) */}
      <div
        aria-hidden="true"
        className="relative h-[180px] w-full sm:h-[220px]"
        style={{ background: PALETTE_GRADIENT[ex.palette] }}
      >
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft">
          {sourceLabel(ex.source)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <header>
          <h3 className="text-[19px] font-bold leading-tight text-ink">{ex.name}</h3>
          <p className="mt-1 text-[13px] text-ink-soft">
            {ex.category} · {ex.city}
          </p>
        </header>

        {/* Trust row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-faint">
          <span>{ex.yearsExperience} лет опыта</span>
          <span aria-hidden>·</span>
          <span>{ex.clientsServed.toLocaleString("ru-RU")}+ клиентов</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-0.5">
            {ex.rating.toFixed(1)} <Star className="h-3 w-3" fill="currentColor" stroke="none" />
          </span>
        </div>

        {/* Services */}
        <ul className="mt-1 space-y-1.5 text-[13px]">
          {ex.services.slice(0, 3).map((s) => (
            <li key={s.name} className="flex items-baseline justify-between gap-2">
              <span className="text-ink-soft">{s.name}</span>
              <span className="font-mono text-[12px] text-ink">{s.price}</span>
            </li>
          ))}
        </ul>

        {/* One curated review (badge ★ = ИИ-выбор per ADR-0010) */}
        {ex.reviews[0] ? (
          <blockquote className="mt-1 rounded-xl bg-accent-soft px-3 py-2.5 text-[12.5px] leading-snug text-accent-ink">
            <div className="mb-1 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider">
              <Star className="h-2.5 w-2.5" fill="currentColor" stroke="none" />
              ЛУЧШИЙ — выбрал ИИ
            </div>
            «{ex.reviews[0].text}» — <span className="font-medium">{ex.reviews[0].author}</span>
          </blockquote>
        ) : null}

        {/* Mini-gallery */}
        <div className="mt-1 grid grid-cols-4 gap-1.5">
          {ex.gallery.slice(0, 4).map((_, i) => (
            <div
              key={i}
              aria-hidden="true"
              className="aspect-square rounded-md"
              style={{ background: PALETTE_GRADIENT[ex.palette], opacity: 0.7 - i * 0.1 }}
            />
          ))}
        </div>

        {/* CTA */}
        <a
          href={`#example-${ex.id}`}
          className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-accent hover:text-accent-hover"
        >
          Посмотреть пример <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}

export function Examples() {
  return (
    <section
      id="examples"
      aria-labelledby="examples-title"
      className="bg-paper-soft px-5 py-14 sm:px-16 sm:py-24"
    >
      <header className="mx-auto mb-8 max-w-[1100px] sm:mb-12 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Примеры</p>
        {/* Title turns «Самосайт» into a self-referential verb («собрались
            сами») — reinforces the name as a promise rather than a label. */}
        <h2
          id="examples-title"
          className="mt-2 text-[32px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]"
        >
          Три Самосайта, которые собрались сами
        </h2>
        <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
          Реальные сайты мастеров. Ни одной строчки текста они не писали — Самосайт сам взял
          источник, сам разложил услуги, сам выбрал отзывы. Посмотрите, что получилось.
        </p>
      </header>

      {/* Cards — carousel on mobile, grid on desktop */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-auto sm:grid sm:max-w-[1280px] sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
        {EXAMPLES.map((ex) => (
          <div key={ex.id} className="w-[86vw] shrink-0 sm:w-auto">
            <ExampleCard ex={ex} />
          </div>
        ))}
      </div>

      {/* Mobile-only carousel hint */}
      <p
        aria-hidden="true"
        className="mt-4 text-center font-mono text-[11px] uppercase tracking-widest text-ink-faint sm:hidden"
      >
        ← листайте вправо →
      </p>
    </section>
  );
}
