/**
 * @deprecated (on the landing) Retired from the home page by the
 * «Витрина v5» recomposition (canon 0.12.0) — the landing footer is now
 * canon `V5_Footer` (links prop → /privacy, /offer), composed in
 * `components/V5Landing.tsx`. Still mounted on the standalone legal
 * pages (`app/privacy`, `app/offer`) until they migrate; do not add new
 * imports elsewhere.
 *
 * Footer (v2) — minimal lockup per docs/COPY.md §2.8.
 *
 * Слева: brand-mark + строка «© Самосайт · samosite.online · все данные
 * хранятся в РФ».
 * Справа: legal-links (privacy / offer / feedback). На mobile стека-ются.
 */

import Link from "next/link";

import { BrandMark } from "@/components/BrandMark";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-line bg-paper px-5 py-10 text-[13px] text-ink-faint sm:mt-24 sm:px-16">
      <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <BrandMark size={20} fontSize={15} textClassName="text-ink-soft" />
          <span>© {year} · samosite.online · все данные хранятся в РФ</span>
        </div>
        <nav aria-label="Legal" className="flex flex-wrap gap-4 sm:gap-6">
          <Link className="hover:text-ink hover:underline" href="/privacy">
            Политика конфиденциальности
          </Link>
          <Link className="hover:text-ink hover:underline" href="/offer">
            Оферта
          </Link>
          {/* Feedback is a modal now (canon 0.9.1) — `/feedback` is retired
              (301 → `/`). This anchor opens the global `<FeedbackModal />` via
              its document-delegated `data-ss-feedback` hook. `href="/feedback"`
              stays as a no-JS fallback (the 301 lands users home). */}
          <a className="hover:text-ink hover:underline" href="/feedback" data-ss-feedback="footer">
            Обратная связь
          </a>
        </nav>
      </div>
    </footer>
  );
}
