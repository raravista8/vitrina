import type { Metadata } from "next";

// Feedback («Чего не хватает?») is now the canon 0.9.1 controlled modal,
// mounted globally below via `<FeedbackModal />` (its own fixed FAB). The
// adapter self-hides on `/admin*` + `/login`, so the FAB stays off the
// founder area + auth. The standalone `/feedback` page was retired this PR
// (301 → `/`); entry points (FAB, Footer, Sources link) open the modal.
import "./globals.css";

import { CanonStyles } from "@samosite/canon";

import { FeedbackModal } from "@/components/FeedbackModal";
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

// Google Search Console ownership-verification token — the value inside the
// `<meta name="google-site-verification" content="…">` GSC shows on its
// HTML-tag verification screen. Same env contract (empty → no tag). Needed so
// the founder can verify the property in Search Console and then URL Inspection
// → Request Indexing — the only lever that actually nudges Google to re-crawl
// and refresh how the homepage appears (favicon + snippet).
const GOOGLE_VERIFICATION = process.env["NEXT_PUBLIC_GOOGLE_VERIFICATION"]?.trim() ?? "";

// Only providers with a configured token are emitted (empty object → no tag).
const VERIFICATION = {
  ...(YANDEX_VERIFICATION ? { yandex: YANDEX_VERIFICATION } : {}),
  ...(GOOGLE_VERIFICATION ? { google: GOOGLE_VERIFICATION } : {}),
};

// SEO keyword corpus — v5 «Фарфор и лак» (июль 2026): строго бьюти-кластер
// по указанию founder. Психологи/репетиторы/кондитеры/фитнес и generic
// «конструктор сайтов» удалены — размывали бьюти-релевантность страницы.
// Нишевые объёмные запросы («сайт для мастера маникюра», «для бровиста»)
// главная одна не соберёт — их закрывают будущие нишевые страницы
// (маникюр / барбершоп / брови / косметолог).
const SEO_KEYWORDS = [
  "сайт для бьюти-мастера",
  "сайт для мастера маникюра",
  "сайт для маникюра",
  "сайт для мастера бровей",
  "сайт для мастера ресниц",
  "сайт для косметолога",
  "сайт для парикмахера",
  "сайт для барбершопа",
  "сайт-визитка для мастера",
  "сайт с онлайн-записью",
  "сайт из Яндекс Карт",
  "сайт из 2ГИС",
  "сайт из фото работ",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Two registers on purpose:
  //   • SEO `title` / `description` (this block) — SERP-facing, front-loaded
  //     with high-volume queries (сайт для бьюти-мастера / маникюра / с
  //     записью). Kept truthful to the product, so no SERP↔landing
  //     mismatch bounce vs the Hero H1.
  //   • OG / Twitter `title/description` + `opengraph-image.tsx` — social-
  //     share-facing, kept promise-focused («за 2 часа, запись и заявки»);
  //     keyword-stuffing там бьёт по CTR. Держи их синхронными с visible
  //     H1 в `V5Landing.tsx` (canon 0.12.0 «Витрина v5 · Фарфор и лак»).
  title: {
    default: "Сайт для бьюти-мастера за 2 часа — Самосайт",
    template: "%s · Самосайт",
  },
  description:
    "Самосайт соберёт сайт бьюти-мастера из Яндекс Карт, 2ГИС или фото работ: услуги, цены, отзывы. Кнопка «Записаться» ведёт в ваш Dikidi или YClients. Старт: 0 ₽.",
  applicationName: "Самосайт",
  authors: [{ name: "Самосайт" }],
  keywords: SEO_KEYWORDS,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: SITE_URL,
    siteName: "Самосайт",
    title: "Соберём за 2 часа сайт бьюти-мастера, который ловит заявки",
    description:
      "Самосайт соберёт сайт из вашей карточки в 2ГИС, на Яндекс Картах или из фото работ. Дальше сам обновляет отзывы и цены каждую неделю.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Соберём за 2 часа сайт бьюти-мастера, который ловит заявки",
    description:
      "ИИ соберёт сайт бьюти-мастера за 2 часа из Яндекс Карт, 2ГИС или фото. Старт бесплатно, платные от 690 ₽/мес.",
  },
  robots: { index: true, follow: true },
  // Ownership verification (Yandex.Webmaster + Google Search Console).
  // Conditionally included — empty token-set drops the `verification` key
  // entirely (Next.js doesn't emit empty meta tags).
  ...(Object.keys(VERIFICATION).length ? { verification: VERIFICATION } : {}),
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "Самосайт",
      alternateName: "Samosite",
      url: SITE_URL,
      // Raster brand mark (the «С» terracotta tile) — lets Google/Yandex
      // associate our logo with the brand. SVG isn't accepted for the
      // schema.org `logo` property, so point at the 180×180 apple-icon.png.
      logo: `${SITE_URL}/apple-icon.png`,
      description:
        "Самосайт — AI-сборщик сайтов для бьюти-мастеров и малых услуг в РФ: сайт из карточки на Картах или фото работ, с записью и заявками.",
    },
    {
      "@type": "SoftwareApplication",
      name: "Самосайт",
      operatingSystem: "Web",
      applicationCategory: "BusinessApplication",
      // canon 0.7.x: freemium 5-tier model — «Старт» free forever, paid
      // from 690 ₽/мес. Offer price reflects the free entry tier (0) to
      // match the advertised landing (hero + PricingMatrix lead with
      // «бесплатно навсегда»). Was stale single-plan "990". Backend
      // ЮKassa reconciliation tracked in CANON_SWAP_PLAN.md §Pricing model.
      offers: { "@type": "Offer", price: "0", priceCurrency: "RUB" },
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
        {/* Global feedback modal (canon 0.9.1 S9_FeedbackModal via a thin
            adapter — tally←GET / onSubmit→POST, embedded). Renders its own
            fixed «Чего не хватает?» FAB; self-hides on /admin* and /login.
            Zero layout footprint (position:fixed only). Replaces the retired
            /feedback page. */}
        <FeedbackModal />
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
