/**
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
    <footer className="border-t border-line bg-paper px-5 py-10 text-[13px] text-ink-faint sm:px-16">
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
          <Link className="hover:text-ink hover:underline" href="/feedback">
            Обратная связь
          </Link>
        </nav>
      </div>
    </footer>
  );
}
