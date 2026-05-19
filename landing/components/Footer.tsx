/**
 * Footer — minimal, legal-first. Real legal page contents land with T1.8
 * (lawyer-reviewed privacy + offer in versioned MDX).
 */

import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-neutral-200 bg-white px-6 py-10 text-sm text-neutral-600">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p>© {year} Vitrina · ИП «Vitrina» · vitrina.site</p>
        <nav aria-label="Legal" className="flex flex-wrap justify-center gap-4 sm:gap-6">
          <Link className="hover:text-neutral-900 hover:underline" href="/privacy">
            Политика конфиденциальности
          </Link>
          <Link className="hover:text-neutral-900 hover:underline" href="/offer">
            Оферта
          </Link>
          <Link className="hover:text-neutral-900 hover:underline" href="/feedback">
            Обратная связь
          </Link>
        </nav>
      </div>
    </footer>
  );
}
