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
 * Photos: лежат локально в `landing/public/examples/{slug}-hero.jpg` и
 * `{slug}-{1..4}.jpg`. Скачаны из Unsplash и закоммичены в repo — works со
 * строгим CSP `img-src 'self'` без exception на зарубежный CDN. В production
 * T14.7 заменит этот flow на customer-specific фото из Yandex Object Storage
 * через `/render` proxy. До тех пор палитро-tinted градиент остаётся как
 * fallback (если файл отсутствует — `<img>` падает на background-стиле).
 */

import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";

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
    <article className="ss-card-lift flex w-full shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card sm:w-auto sm:snap-none">
      {/* Hero photo (real local JPEG; palette gradient as fallback background) */}
      <div
        className="relative h-[180px] w-full overflow-hidden sm:h-[220px]"
        style={{ background: PALETTE_GRADIENT[ex.palette] }}
      >
        <Image
          src={ex.heroPhoto}
          alt={`${ex.name} — ${ex.category}`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 86vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-soft shadow-sm">
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

        {/* Curated review. v2.1.3 §1.2 — badge «★ ЛУЧШИЙ — выбрал ИИ»
            убран. Pilot test показал что в карточках-превью эта плашка
            создавала эффект «вот они продают AI-отзывы», а не «вот сайт».
            ИИ-кураторство остаётся фоновой механикой (см. ADR-0010),
            метка просто не выводится в preview. На реальных customer-
            сайтах badge может появляться отдельно. */}
        {ex.reviews[0] ? (
          <blockquote className="mt-1 rounded-xl bg-accent-soft px-3 py-2.5 text-[12.5px] leading-snug text-accent-ink">
            «{ex.reviews[0].text}» — <span className="font-medium">{ex.reviews[0].author}</span>
          </blockquote>
        ) : null}

        {/* Mini-gallery — plain <img> к /examples/<slug>-N.jpg.
            Намеренно НЕ next/image:
              • Thumbnails уже маленькие (20-70 KB original) — оптимизация
                через /_next/image proxy не даёт ощутимого выигрыша.
              • `/_next/image?url=...` pattern попадает в некоторые EasyList
                adblocker-правила (видели регрессию: gallery с next/image
                рендерилась только как palette-gradient placeholder, hero
                с тем же markup работал — отличие именно adblock-фильтры).
              • Plain <img loading="lazy"> работает идентично везде.
            Hero photo остался на next/image — там responsive sizes
            (33vw/50vw/86vw) реально полезны. */}
        <div className="mt-1 grid grid-cols-4 gap-1.5">
          {ex.gallery.slice(0, 4).map((src) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-md"
              style={{ background: PALETTE_GRADIENT[ex.palette] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
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
        {/* v2.2 canon (финал 2) — title shifted from product-self-reference
            («собрались сами») to user-outcome timing («через несколько минут»).
            User-test feedback: «получите ... через несколько минут» reads as
            promise + speed in one beat, lower cognitive load than the
            self-referential verb. */}
        <h2
          id="examples-title"
          className="mt-2 text-[32px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[56px]"
        >
          Вот какой сайт вы получите
          <br className="hidden sm:block" /> через несколько минут
        </h2>
        <p className="mt-3 max-w-[680px] text-[16px] leading-relaxed text-ink-soft sm:mx-auto sm:mt-4 sm:text-[18px]">
          Реальные сайты, которые Самосайт собрал из разных источников — с вашими фото, услугами и
          лучшими отзывами
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

      {/* v2.1.3 §1.2 — mobile carousel hint «← листайте вправо →» удалён.
          scroll-snap-type: x mandatory + видимая «обрезка» правой карточки
          даёт достаточный affordance — explicit подсказка избыточна и
          выглядит как «инструкция для слабых». */}
    </section>
  );
}
