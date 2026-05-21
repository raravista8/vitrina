/**
 * `<SocialProof>` — landing v2 секция «У нас уже работает».
 *
 * User feedback batch 3 («No social proof of самого Самосайта»):
 *   - Examples = demo (как будет выглядеть мой сайт)
 *   - SocialProof = proof (работает ли это вообще)
 *
 * Два разных страха, оба надо закрыть. Examples живёт ниже Hero,
 * SocialProof — ВЫШЕ Examples (чтобы вначале «работает» → потом
 * «вот как у тебя будет»).
 *
 * Composition:
 *   1. 3 number badges (сайтов работает / заявок собрано / рейтинг)
 *   2. 4 testimonials с author + niche + city + цитата + leads/мес
 *      (число заявок — конкретика, не «много»)
 */

import { Star } from "lucide-react";

import { STATS, TESTIMONIALS, type Testimonial } from "@/content/social-proof";

const PALETTE_GRADIENT: Record<Testimonial["palette"], string> = {
  peach: "linear-gradient(135deg, oklch(0.84 0.07 50) 0%, oklch(0.62 0.09 35) 100%)",
  sage: "linear-gradient(135deg, oklch(0.82 0.06 145) 0%, oklch(0.58 0.08 145) 100%)",
  sky: "linear-gradient(135deg, oklch(0.86 0.06 220) 0%, oklch(0.55 0.10 230) 100%)",
  butter: "linear-gradient(135deg, oklch(0.90 0.08 90) 0%, oklch(0.66 0.13 75) 100%)",
  rose: "linear-gradient(135deg, oklch(0.86 0.06 25) 0%, oklch(0.65 0.10 20) 100%)",
  lavender: "linear-gradient(135deg, oklch(0.86 0.06 290) 0%, oklch(0.60 0.10 285) 100%)",
};

function TestimonialCard({ t }: { t: Testimonial }) {
  // Author initial для avatar — берём первую букву имени.
  const initial = t.author.charAt(0);
  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7">
      <header className="flex items-center gap-3">
        {/* Avatar placeholder — gradient until мы получим реальные
            фото мастеров (T14.7 / `/render` proxy). */}
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[18px] font-bold text-white"
          style={{ background: PALETTE_GRADIENT[t.palette] }}
        >
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-ink">{t.author}</p>
          <p className="text-[12.5px] text-ink-soft">
            {t.niche} · {t.city}
          </p>
        </div>
        <span className="rounded-full bg-success-soft px-2 py-1 font-mono text-[10px] font-medium text-success">
          {t.leadsPerMonth} зая/мес
        </span>
      </header>

      <blockquote className="text-[15px] leading-relaxed text-ink-soft sm:text-[16px]">
        «{t.text}»
      </blockquote>
    </article>
  );
}

export function SocialProof() {
  return (
    <section
      id="social-proof"
      aria-labelledby="social-proof-title"
      className="bg-paper px-5 py-14 sm:px-16 sm:py-20"
    >
      <header className="mx-auto mb-10 max-w-[1100px] sm:mb-14 sm:text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-accent">Уже работает</p>
        <h2
          id="social-proof-title"
          className="mt-2 text-[30px] font-bold leading-[1.05] tracking-tight text-ink sm:text-[48px]"
        >
          Мастера уже собрали сайты — и получают заявки
        </h2>
      </header>

      {/* Number badges */}
      <ul
        aria-label="Статистика Самосайта"
        className="mx-auto mb-12 grid max-w-[900px] grid-cols-3 gap-3 sm:mb-16 sm:gap-6"
      >
        <li className="rounded-2xl border border-line bg-white p-5 text-center sm:p-7">
          <div className="text-[28px] font-bold text-ink sm:text-[40px]">{STATS.sitesRunning}</div>
          <div className="mt-1 text-[12px] text-ink-soft sm:text-[14px]">сайтов работает</div>
        </li>
        <li className="rounded-2xl border border-line bg-white p-5 text-center sm:p-7">
          <div className="text-[28px] font-bold text-ink sm:text-[40px]">
            {STATS.totalLeads.toLocaleString("ru-RU")}
          </div>
          <div className="mt-1 text-[12px] text-ink-soft sm:text-[14px]">заявок собрано</div>
        </li>
        <li className="rounded-2xl border border-line bg-white p-5 text-center sm:p-7">
          <div className="inline-flex items-baseline gap-1 text-[28px] font-bold text-ink sm:text-[40px]">
            {STATS.averageRating.toFixed(1)}
            <Star className="h-5 w-5 text-accent sm:h-7 sm:w-7" fill="currentColor" stroke="none" />
          </div>
          <div className="mt-1 text-[12px] text-ink-soft sm:text-[14px]">средняя оценка</div>
        </li>
      </ul>

      {/* Testimonial grid */}
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {TESTIMONIALS.map((t) => (
          <TestimonialCard key={t.id} t={t} />
        ))}
      </div>
    </section>
  );
}
