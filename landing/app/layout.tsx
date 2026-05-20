import type { Metadata } from "next";
import Script from "next/script";

import { FeedbackFloatingButton } from "@/components/FeedbackForm";

import "./globals.css";

const SITE_URL = process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://samosite.online";

// Yandex.Метрика counter ID. Empty → no script injected (safe default
// for dev and for deploys before the operator has created a counter
// at metrika.yandex.ru). Add to /opt/vitrina/.env on the VPS once
// the counter is registered — see docs/runbooks/yandex-services.md.
const YM_ID = process.env["NEXT_PUBLIC_YANDEX_METRIKA_ID"]?.trim() ?? "";

// Y.Webmaster ownership-verification token. Pasted from the
// «Settings → Verification → Meta tag» page. Same env contract as
// Metrika: empty → no tag emitted.
const YANDEX_VERIFICATION = process.env["NEXT_PUBLIC_YANDEX_VERIFICATION"]?.trim() ?? "";

// SEO keyword corpus — covers the 12 ICP categories from PRD §2 plus
// the JTBD long-tail real masters search for. Kept as a flat list
// because Next.js's Metadata.keywords flattens into a single
// comma-separated tag anyway. We're not stuffing — every phrase below
// is genuinely a search a Russian micro-business owner runs when
// considering a website. Sources: Я.Wordstat for "сайт для <профессия>"
// + the ICP table in PRD §2.
const SEO_KEYWORDS = [
  // Brand
  "Самосайт",
  "samosite",
  // Core product category
  "сайт для мастера",
  "сайт-визитка для самозанятого",
  "сайт для частного мастера",
  "сайт для малого бизнеса",
  // ICP — beauty
  "сайт для маникюра",
  "сайт для мастера маникюра",
  "сайт для барбершопа",
  "сайт для парикмахерской",
  "сайт для мастера бровей",
  "сайт для мастера ресниц",
  "сайт для тату-мастера",
  "сайт для косметолога",
  // ICP — wellness
  "сайт для психолога",
  "сайт для психотерапевта",
  "сайт для фитнес-тренера",
  "сайт для йога-студии",
  // ICP — services
  "сайт для фотографа",
  "сайт для кондитера",
  "сайт для репетитора",
  "сайт для частного преподавателя",
  // JTBD / functional
  "форма записи на сайте",
  "приём заявок с сайта",
  "сайт из Telegram-канала",
  "сайт из Яндекс.Карт",
  "сайт из фото",
  "конструктор сайтов для услуг",
  "автоматическое обновление сайта",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Copy from docs/COPY.md §1 — single source of truth.
  title: {
    default: "Самосайт — сайт, который сам себя ведёт и приносит вам заявки",
    template: "%s · Самосайт",
  },
  description:
    "Самосайт — сайт-канал заявок для частных мастеров и малых услуг. ИИ собирает сайт из вашего источника (Telegram-канал, Яндекс.Карты или фото) и сам обновляет его каждую неделю.",
  applicationName: "Самосайт",
  authors: [{ name: "Самосайт" }],
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Самосайт",
    title: "Сайт, который сам себя ведёт и приносит вам заявки",
    description:
      "Самосайт собирает сайт из вашего Telegram-канала, Яндекс.Карт или фото — и сам обновляет его каждую неделю.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Самосайт — сайт, который сам себя ведёт",
    description:
      "ИИ собирает сайт за пару минут и сам ловит заявки. Первый месяц бесплатно без карты.",
  },
  robots: { index: true, follow: true },
  // Y.Webmaster ownership verification. Conditionally included — when
  // NEXT_PUBLIC_YANDEX_VERIFICATION is empty the property is dropped
  // entirely (Next.js doesn't emit an empty meta tag).
  ...(YANDEX_VERIFICATION ? { verification: { yandex: YANDEX_VERIFICATION } } : {}),
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Самосайт",
      url: SITE_URL,
      description:
        "Самосайт — AI-сборщик сайтов-каналов заявок для частных мастеров и малых услуг в РФ.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Самосайт",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      offers: { "@type": "Offer", price: "990", priceCurrency: "RUB" },
      url: SITE_URL,
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-paper text-ink antialiased">
        {children}
        <FeedbackFloatingButton />
        <script
          type="application/ld+json"
          // Structured data must be a single literal JSON string; Next handles
          // HTML-escaping for the surrounding script element, and the JSON-LD
          // content itself contains no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {/* Yandex.Метрика — only loaded when an ID is provided. Snippet
            mirrors metrika.yandex.ru → "Code for the site" verbatim so
            that operators can diff their counter-page-issued code
            against this and find them identical. Init params:
              - ssr:true              — page is server-rendered (Next SSG)
              - webvisor:true         — session replay (early UX work)
              - clickmap:true         — heatmap of clicks
              - ecommerce:"dataLayer" — opt-in for future commerce events
              - referrer / url        — explicit values for SPA-style routing
              - accurateTrackBounce   — register a hit only after 15 s on page
              - trackLinks            — register outbound link clicks
            Loaded `afterInteractive` so it doesn't block FCP/LCP —
            Lighthouse Performance stays ≥90 (PRD §6 NFR). mc.yandex.ru
            is in the landing CSP allowlist (infra/Caddyfile script-src
            / img-src / connect-src — SECURITY.md §A02). */}
        {YM_ID ? (
          <>
            <Script
              id="yandex-metrika"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${YM_ID}", "ym");

                  ym(${YM_ID}, "init", {
                       ssr:true,
                       webvisor:true,
                       clickmap:true,
                       ecommerce:"dataLayer",
                       referrer: document.referrer,
                       url: location.href,
                       accurateTrackBounce:true,
                       trackLinks:true
                  });
                `,
              }}
            />
            {/* <noscript> beacon — covers users who disabled JS, per
                Я.Метрика's standard install. The beacon is a 1×1
                tracking pixel from mc.yandex.ru, not a content image,
                so next/image would be wrong (no lazy-loading, no
                width/height optimisation, no need for blur). */}
            <noscript>
              <div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://mc.yandex.ru/watch/${YM_ID}`}
                  style={{ position: "absolute", left: "-9999px" }}
                  alt=""
                />
              </div>
            </noscript>
          </>
        ) : null}
      </body>
    </html>
  );
}
