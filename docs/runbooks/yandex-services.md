# Yandex services — operator setup

> One-time manual steps to register `samosite.online` in Yandex's
> ecosystem. After completion, the backend SEO submitter and the landing
> Метрика snippet light up automatically. Order matters only between
> 1 and 3; 2 and 4 can run in parallel.

---

## 1. Я.Вебмастер — site verification + sitemap

**Why.** Lets Yandex index `samosite.online` (the landing). Issuing an
OAuth token here also unlocks the backend's per-publish recrawl ping
for **customer sites** (`backend/app/core/seo/adapters/yandex_webmaster.py`
→ FR-033).

### Steps

1. Log in to `https://webmaster.yandex.ru` with the founder account
   (or the dedicated `noreply@samosite.online` mailbox once that exists).
2. **Add site** → `https://samosite.online`.
3. **Подтверждение прав** → choose **Meta-тэг**. Yandex shows a string
   like:

   ```html
   <meta name="yandex-verification" content="a1b2c3d4e5f6g7h8" />
   ```

   Copy ONLY the `content` value (`a1b2c3d4…`).
4. On the VPS:

   ```bash
   ssh deploy@135.106.137.30
   cd /opt/vitrina
   # Append (or update) the token
   sudoedit .env   # set NEXT_PUBLIC_YANDEX_VERIFICATION=a1b2c3d4e5f6g7h8
   sudo -u deploy /opt/vitrina/infra/scripts/deploy.sh --staging
   ```

   The landing rebuilds; the meta tag now appears in `view-source:` of
   the homepage.
5. Back in Я.Вебмастер → **Проверить**. Status should flip to
   «Подтверждено» within a minute.
6. **Файлы Sitemap** → add `https://samosite.online/sitemap.xml`.
   (Next.js generates this at build time from `landing/app/sitemap.ts`.)
7. **Создать OAuth-токен** for the backend SEO pings:
   - https://oauth.yandex.ru/client/new → **Self-hosted application**
   - Permissions: `webmaster:hostinfo` + `webmaster:verify`
   - Save the resulting token in 1Password vault entry
     "Vitrina · Yandex services" and on the VPS:

     ```bash
     sudoedit /opt/vitrina/.env   # set YANDEX_WEBMASTER_API_KEY=y0_AgA...
     sudo -u deploy /opt/vitrina/infra/scripts/deploy.sh --staging --no-pull --no-build
     ```

   No code change needed — the adapter reads it at runtime.

### Smoke test (after deploy)

```bash
# Verification tag is in the HTML:
curl -s https://samosite.online | grep -i 'yandex-verification'

# Sitemap is reachable:
curl -sI https://samosite.online/sitemap.xml | head -3
curl -s  https://samosite.online/sitemap.xml | head -20

# Robots references the sitemap:
curl -s https://samosite.online/robots.txt
```

### Hazard

- Don't switch verification method after «Подтверждено» — Yandex will
  un-verify and the meta tag would need a different value.
- The OAuth token expires after 1 year. Calendar: rotation at year
  anniversary (see SECURITY.md §5 rotation table — add an entry once
  the first token issues).

---

## 2. Я.Метрика — analytics + session replay

**Why.** Track signup-funnel conversion (Hero paste → CTA → modal
submit) and watch session replays of the first 100 testers. Wired to
the landing only — customer sites can opt in later (per-site setting,
out of scope here).

### Current production counter

| | |
|---|---|
| Counter ID | **`109331571`** |
| Site | `samosite.online` |
| Owner account | founder (see 1Password «Vitrina · Yandex services») |
| Webvisor / Clickmap / Accurate-bounce | enabled |
| ecommerce | enabled (`dataLayer`) — opt-in for future commerce events |

Snippet in `landing/app/layout.tsx` matches metrika.yandex.ru's
generated code verbatim; diff your console-emitted snippet against the
file to confirm parity after any Я.Метрика settings change.

### First-time setup (only if creating a brand-new counter)

1. Log in to `https://metrika.yandex.ru` with the same account as
   step 1 above.
2. **Добавить счётчик**:
   - Имя: `Samosite — landing`
   - Адрес сайта: `samosite.online`
   - Часовой пояс: `Europe/Moscow`
   - ☑ **Вебвизор** (session replay) — we want this for early UX work
   - ☑ **Карта кликов**
   - ☑ **Тщательное отслеживание отказов**
   - ☑ **Электронная коммерция** (источник: `dataLayer`)
   - Согласие на обработку — submit
3. Copy the **numeric counter ID** from the counter list. Save in
   1Password under «Vitrina · Yandex services».
4. On the VPS:

   ```bash
   sudoedit /opt/vitrina/.env   # set NEXT_PUBLIC_YANDEX_METRIKA_ID=<numeric>
   sudo -u deploy /opt/vitrina/infra/scripts/deploy.sh --staging
   ```

5. In Я.Метрика's counter settings → **Код счётчика** → **Проверить**.
   Should turn green within ~5 minutes after the deploy. If not, see
   troubleshooting below.

### Smoke test (after deploy)

```bash
# Snippet is in the HTML:
curl -s https://samosite.online | grep -E 'mc.yandex.ru|ym\(.*init'

# Network request fires from a real browser session (operator laptop):
#   1. Open https://samosite.online in Chrome
#   2. DevTools → Network → filter "yandex"
#   3. Reload — expect a POST to mc.yandex.ru/watch/<counter_id>
```

### Troubleshooting

- **«Код не найден на сайте»** → check `view-source:samosite.online` for
  the `ym(...)` snippet. If absent, `NEXT_PUBLIC_YANDEX_METRIKA_ID` is
  empty or the landing wasn't rebuilt (deploy.sh `--no-build` would
  skip the Next build; rerun without `--no-build`).
- **«Браузер блокирует код»** → an ad-blocker on the operator's machine
  blocks `mc.yandex.ru`. Test in incognito or from a different network.
- **Doubles up on local dev** → `.env` in repo root has
  `NEXT_PUBLIC_YANDEX_METRIKA_ID=` empty by default. Don't set it
  locally unless you want dev traffic in prod stats.

### Hazard

- Я.Метрика's terms require a privacy-policy mention. `landing/app/privacy/page.tsx`
  needs a one-line update referencing Я.Метрика as a processor before
  the counter goes live — track this in the same PR that wires the ID.
  See SECURITY.md §9.7.

---

## 3. Google Search Console — verify + request re-index

**Status: ready to verify.** The landing emits a
`<meta name="google-site-verification">` tag the moment
`NEXT_PUBLIC_GOOGLE_VERIFICATION` is set (same env contract + build-arg
plumbing as `NEXT_PUBLIC_YANDEX_VERIFICATION` — Dockerfile ARG/ENV +
compose `args:` + `landing/app/layout.tsx`). The token is empty by
default → no tag rendered.

### Why this matters (favicon + snippet)

Search Console is the **only lever** the operator has to nudge Google to
re-crawl the homepage and refresh how it appears (favicon, title,
description). Note up front:

- Google (and Yandex) **choose the snippet/description themselves** —
  `<meta name="description">` is a hint, not a command. They frequently
  synthesize the snippet from on-page body text, especially for a brand
  query. You **cannot force** a specific description; you can only ship a
  good meta + request a re-crawl and let it settle.
- The **favicon** comes from `/favicon.ico` at the site root
  (`landing/app/favicon.ico`, served by Next). Yandex's favicon robot is
  old-school and wants the `.ico` specifically — an SVG-only icon isn't
  enough, which is why the SERP showed a generic globe until the `.ico`
  shipped. Favicon refresh in the index lags the main crawl (days→weeks).

### Steps

1. Go to <https://search.google.com/search-console>, add a property.
   Prefer the **URL-prefix** property `https://samosite.online` (the
   HTML-tag method verifies it); the **Domain** property needs a DNS TXT
   record instead.
2. Choose **HTML tag** verification. Google shows
   `<meta name="google-site-verification" content="XXXXXX" />` — copy
   **only** the `content` value (no quotes, no `<meta>` wrapper).
3. On the VPS:
   ```
   sudoedit /opt/vitrina/.env   # set NEXT_PUBLIC_GOOGLE_VERIFICATION=XXXXXX
   ```
4. Rebuild **landing** with the build-arg (it's a `NEXT_PUBLIC_*` baked
   at build time — a plain restart won't pick it up). Same flow as any
   landing deploy (OPERATIONS §2).
5. Back in Search Console, click **Verify**.
6. Submit the sitemap: GSC → **Sitemaps** → add `sitemap.xml`.
7. **URL Inspection** → paste `https://samosite.online` → **Request
   Indexing**. This is what triggers the re-crawl. Re-crawl of the page
   is usually hours→days; favicon/snippet refresh in the SERP can take
   longer.

### Smoke test (after deploy)

```
# Verification tag is in the HTML:
curl -s https://samosite.online | grep -i 'google-site-verification'

# Favicon is served at the root (what the favicon robots fetch):
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://samosite.online/favicon.ico
# expect: 200 image/x-icon
```

### Backend SEO adapter (separate, P1)

The submit-on-publish adapter
(`backend/app/core/seo/adapters/google_search_console.py`) is a
different concern (auto-pinging GSC when a *customer* site publishes);
needs `GOOGLE_SEARCH_CONSOLE_*` service-account env. Independent of the
ownership-verification meta above.

---

## 4. Yandex.OAuth — needed for Я.ID social login

**Status: P2**. PRD §FR-062 / ADR-0007 use Я.ID OAuth as one of the
end-user auth methods. Out of scope for this runbook — track in the
auth PR.

---

## Related

- `docs/runbooks/staging-deploy.md` — how the deploy script picks up env changes
- `docs/runbooks/troubleshooting-deploy.md` — Caddy SNI / build issues
- `backend/app/core/seo/` — submitter ports + adapters
- `landing/app/layout.tsx` — where the meta tags + Metrika tag emit
- `landing/app/sitemap.ts` — what URLs Yandex sees
- `landing/app/robots.ts` — what's allowed to be crawled
- `docs/SECURITY.md` §9 — privacy-policy / РКН-notification dependencies
