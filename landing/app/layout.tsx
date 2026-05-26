import type { Metadata } from "next";

// `FeedbackFloatingButton` («Что не хватает?») удалён с публичного
// лендинга в PR-G — для платного сервиса «висящая» feedback-кнопка на
// главной создавала ощущение «ребята ещё пилят». Сам feedback-form
// доступен по `/feedback` (см. nav-link) + будет переехать в admin
// сайдбар как «Обратная связь» в follow-up.
import "./globals.css";

import { CanonStyles } from "@samosite/canon";
import { BUILD_TAG } from "@/lib/build-info";

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
  // Copy synced to canon 0.5.0 / packages/canon/docs/COPY.md. Когда
  // обновляешь visible H1 в `Hero.tsx`, синхронизируй ВСЕ четыре копии
  // ниже: SEO `title`, `description`, OG `title/description`, Twitter
  // `title/description` + `opengraph-image.tsx` alt + body. Иначе
  // расхождение между SERP-snippet'ом / соц-шерингом и landing-
  // страницей даёт «not what I expected» bounce.
  title: {
    default: "Самосайт — соберём за 2 часа сайт, который ловит заявки",
    template: "%s · Самосайт",
  },
  description:
    "Соберём за 2 часа сайт из вашего Telegram-канала, Яндекс.Карт, 2ГИС, Avito или фото меню. Дальше он сам становится лучше каждую неделю — по понедельникам подсказывает, что поправить ради новых заявок.",
  applicationName: "Самосайт",
  authors: [{ name: "Самосайт" }],
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Самосайт",
    title: "Соберём за 2 часа сайт, который ловит заявки",
    description:
      "Самосайт собирает сайт из вашего Telegram-канала, Яндекс.Карт, 2ГИС, Avito или фото меню. Дальше он сам становится лучше каждую неделю.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Самосайт — соберём за 2 часа сайт, который ловит заявки",
    description:
      "ИИ соберёт сайт за 2 часа из вашего Telegram-канала, Яндекс.Карт или фото. Для первой сотни — 490 ₽/мес навсегда.",
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

// Yandex.Метрика snippet rendered as raw HTML (not via `next/script`).
//
// Why a raw <script> instead of `next/script`:
//
// `next/script strategy="afterInteractive"` defers injection until
// React hydrates on the client, which means the *initial* server-
// rendered HTML response contains the snippet only inside the RSC
// streaming payload (`["$L5", …, "dangerouslySetInnerHTML": …]`), not
// as a parseable <script> tag. Я.Метрика's "Проверить" validator is a
// plain HTTP bot — it fetches the URL, greps the raw HTML for the tag,
// and never executes JS. Without a real <script> in the response body
// the verifier reports "код счётчика не найден" even though end-user
// browsers (which DO hydrate) eventually fire the beacon.
//
// Rendering the same payload via plain JSX `<script
// dangerouslySetInnerHTML>` keeps the tag in the static HTML for
// crawlers/verifiers, and the browser still parses + executes it
// during the initial document load. It runs synchronously in <head>,
// but the snippet itself only schedules an async load of tag.js, so
// FCP/LCP impact is < 1 ms.
const metrikaSnippet = (
  id: string,
) => `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();
for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window, document, "script", "https://mc.yandex.ru/metrika/tag.js?id=${id}", "ym");

ym(${id}, "init", {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        {/* Build version stamp — позволяет внешним аудиторам / QA / founder
            за секунду понять «вижу ли я свежее или браузерный/CDN кэш» без
            чтения git log. Резолвится в `next build` из ENV `BUILD_VERSION`
            + `BUILD_TIME` (см. `lib/build-info.ts`). Тот же tag доступен
            JSON-endpoint'ом `GET /version`. */}
        <meta name="x-build-version" content={BUILD_TAG} />

        {/* Yandex.Метрика — first thing in <head> so it counts the hit
            even if the user bails before hydration. Init params match
            metrika.yandex.ru's emitted snippet verbatim:
              - ssr:true              — page is server-rendered (Next SSG)
              - webvisor:true         — session replay (early UX work)
              - clickmap:true         — heatmap of clicks
              - ecommerce:"dataLayer" — opt-in for future commerce events
              - referrer / url        — explicit values for SPA routing
              - accurateTrackBounce   — register a hit only after 15s
              - trackLinks            — register outbound link clicks
            mc.yandex.ru is in the landing CSP allowlist (infra/Caddyfile
            script-src / img-src / connect-src — SECURITY.md §A02). */}
        {YM_ID ? <script dangerouslySetInnerHTML={{ __html: metrikaSnippet(YM_ID) }} /> : null}
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased">
        {/* @samosite/canon interactive styles — hover-lift, focus-rings,
            pulse keyframes, smooth-scroll. Per `packages/canon/README.md`
            this must be mounted ONCE at the root. Alternative:
            `import '@samosite/canon/styles.css'` in globals.css. */}
        <CanonStyles />
        {children}
        <script
          type="application/ld+json"
          // Structured data must be a single literal JSON string; Next handles
          // HTML-escaping for the surrounding script element, and the JSON-LD
          // content itself contains no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        {YM_ID ? (
          /* <noscript> beacon — covers users who disabled JS, per
             Я.Метрика's standard install. The beacon is a 1×1 tracking
             pixel from mc.yandex.ru, not a content image, so next/image
             would be wrong here. */
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
        ) : null}
      </body>
    </html>
  );
}
