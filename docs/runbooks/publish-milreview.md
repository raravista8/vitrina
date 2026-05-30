# Runbook — publish the milreview content site

> **What this is.** «Железнодорожный путеводитель» (`milreview`) is a hand-built
> **content** site (railway reference: schema, documents, stations, signaling,
> reports), not an LLM-generated booking page. It's served at
> `milreview.samosite.online` as static files on the shared
> `*.samosite.online` wildcard — the exact same S3-origin + Caddy path every
> customer site uses, no infra change.
>
> Source of truth: templates + content store in `sites-template/milreview/`,
> rendered by `backend/app/core/publishing/milreview.py`.

> **Serving model (this prod): app-server origin, not Object Storage.** This VPS
> has no S3 write path (the `vitrina-prod` bucket exists as the wildcard origin,
> but the api has no write credentials — so no customer site is served from S3
> today). milreview is therefore served **directly by the api**: it renders the
> whole site once at startup and serves it by Host, and Caddy routes
> `milreview.samosite.online` → `api:8000` via a dedicated block. No S3 needed.

---

## 1. How it's wired

- **Templates:** `sites-template/milreview/*.j2` (`_layout` + 6 pages + per-station).
- **Content store:** `sites-template/milreview/content/*.json` (news, docs,
  directory, stations, signaling, reports, site meta) — committed, editable.
- **Render:** `app.core.publishing.milreview.render_all()` → `{key: (html, ctype)}`,
  run once in the api lifespan (`app.state.milreview_files`).
- **Serve:** `app/api/routers/milreview_site.py` — a Host-guarded catch-all GET
  returns those files (404 for any non-milreview Host). Caddy block
  `milreview.samosite.online` (`infra/Caddyfile`) reverse-proxies everything to
  `api:8000`, so `/`, `index.html`, `station-1706.html`, `styles.css`,
  `sitemap.xml`, `robots.txt` and `/api/*` all resolve.
- **SEO baked in:** server-rendered chronicle/docs (crawlable; JS only filters
  the DOM), one page per station with unique `<title>`/description/canonical +
  JSON-LD `Article`, site-wide JSON-LD `WebSite`, OG/Twitter, `sitemap.xml`
  (home + all pages + all stations), `robots.txt`. CSP set by the route
  (content-site policy); HSTS/X-Frame-Options from the Caddy `security_headers`
  snippet. **No watermark.**

## 2. Publish = deploy the api (run on the VPS)

milreview is rendered at api startup, so "publishing" is just a normal **backend
deploy** (templates + content travel in the api image):

```bash
ssh deploy@135.106.137.30
cd /opt/vitrina && git pull --ff-only origin main
C="docker compose --env-file .env -f infra/docker-compose.yml -f infra/docker-compose.staging.yml"

# rebuild + recreate api (renders milreview on boot)
$C build api && $C up -d --no-deps api

# reload Caddy so the new milreview.samosite.online block is live (first deploy only)
$C exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile

# optional: eyeball the rendered output without serving (no S3 needed)
$C exec -T api python -m app.workers.publish_milreview --out /tmp/milreview-dist
$C exec -T api ls /tmp/milreview-dist | wc -l        # expect ~64 files
```

`caddy reload` is **atomic** — if the new config fails to validate, Caddy keeps
running the previous one (the live site is never dropped). The Caddy block only
needs reloading on the *first* deploy (or when `infra/Caddyfile` changes);
content-only updates just need the api rebuilt + recreated.

Re-publish on content change: edit `sites-template/milreview/content/*.json`,
merge to `main`, `git pull` on the VPS, `$C build api && $C up -d --no-deps api`.

**Future (when Object Storage write creds land):** `python -m
app.workers.publish_milreview` uploads the same render to S3 under the
`milreview/` prefix; point a wildcard/CDN origin at it and drop the dedicated
Caddy block. The CLI + `--out` dry-run already work for that path.

## 3. Create the client login (one-off)

The master logs in at `https://samosite.online/login` (canon `CustomerLogin`)
→ `/admin-demo`. Seed the `users` row (bcrypt password from env — never commit it):

```bash
$C exec -T -e MILREVIEW_PASSWORD='<initial password>' api \
  python -m app.workers.seed_milreview_user
# → "milreview login created: login='milreview', plan='pro'"
```

Credentials to hand the client (initial — they can ask to rotate):

```
Адрес входа: https://samosite.online/login
Логин:       milreview
Пароль:      <the password you set>
```

Re-running with a new `MILREVIEW_PASSWORD` rotates it. (The «Войти» link in the
milreview top-bar points at `samosite.online/login`; after auth the platform
redirects to `/admin-demo`.)

## 4. Verify live

```bash
curl -sI https://milreview.samosite.online/                | grep -i 'HTTP/\|content-type'
curl -s  https://milreview.samosite.online/                | grep -o '<title>[^<]*</title>'
curl -s  https://milreview.samosite.online/station-1706.html | grep -o '<title>[^<]*</title>'
curl -s  https://milreview.samosite.online/sitemap.xml      | head -5
curl -sI https://milreview.samosite.online/ | grep -i 'strict-transport\|content-security'  # edge headers
```

Browser smoke: home chronicle filters (год/тип/дорога) toggle rows + update
«показано N из M»; Схема directory links open station cards; Документы filters +
newest-first; Сигнализация traffic-light cycles 4 aspects; «Войти» → login.

## 5. Content reconciliation — DONE (TZ §7) + what remains

✅ **Content was re-pulled from the live `milreview.ru` (windows-1251 → UTF-8)**
and the whole content store rebuilt from the real source (no fabrication; build
scripts archived under `/tmp/milreview-src/*.py` in the session that did it):

- **Homepage:** real meta/title («…России, стран СНГ и Прибалтики»), the real
  «А знаете ли вы?» (Веребьинский овраг / Николай I — the earlier Обоянь blurb
  was reconstructed), real «Случайное изображение» (разъезд 239 км), real
  «30 мая в истории», real sources (incl. Google Maps).
- **Хроника:** all **94** real news items (real dates/wording/links), типы/теги
  inferred, links repointed (station→`station-N.html`, doc→`docs.html`,
  isi→`signaling.html`, events→`reports.html`, railway-перегон / archives /
  unknown stations → external `milreview.ru`).
- **Станции:** **90 real station pages** re-pulled — real spec (Регион / Год
  открытия / Код ЕСР / Статус / Принадлежность / Участок / Прежние названия),
  real «Часть 1/2» prose, real schematic-plan images (replacing the canon's
  generic SVG). The earlier reconstructed cards (e.g. Северобайкальск: was
  1974/934505 → real 1979/903204/«Нижнеангарск-I») are corrected. Directory
  regrouped by real road (Окт. 19 · ВСЖД 27 · ДВС 17 · ЮВС 11 · Моск. 1).

**What remains:**

1. **Images.** Station photos + schematic plans + the featured photo currently
   hot-link `https://milreview.ru/pics/...` (works; CSP allows that origin).
   Full localisation is **blocked on the same Object Storage gap** as everything
   else — binary assets (~100 MB+ of `_large` PNGs/JPGs) can't live in the repo /
   api image; they belong in the `vitrina-prod` bucket once write creds land.
   Hot-linking is the correct interim while `milreview.ru` stays primary.
2. **Domain strategy (TZ §4.5).** `milreview.samosite.online` is live. Decide
   with the client whether `milreview.ru` stays primary (then add a canonical /
   redirect strategy) or fully moves to the subdomain. Affects canonical + 301s
   **and** the external-link / hot-link strategy above.
3. **Docs table depth.** `docs.json` is the canon-derived ~23-row table; the real
   site has more приказы across per-issuer pages (`docs/rzd.html`,
   `docs/roszheldor.html`, …) + per-document full texts. News «приказ» links go
   to our table (`docs.html`), not the individual doc. Fetch + expand if wanted.
4. **Nice-to-haves not in canon scope:** real archive-year pages (currently link
   out to `milreview.ru/news20XX.html`), working station search (nav box inert,
   as in canon).

## 6. Files

| Concern | Path |
|---|---|
| Templates | `sites-template/milreview/*.j2` |
| Content store | `sites-template/milreview/content/*.json` |
| Styles (from canon) | `sites-template/milreview/styles.css` |
| Renderer | `backend/app/core/publishing/milreview.py` |
| Serving route (Host-guarded) | `backend/app/api/routers/milreview_site.py` (rendered in `app/main.py` lifespan) |
| Caddy edge block | `infra/Caddyfile.staging` (**active on prod**) + `infra/Caddyfile` (canonical) — `milreview.samosite.online` |
| Publish CLI (S3 / dry-run) | `backend/app/workers/publish_milreview.py` |
| Login seed | `backend/app/workers/seed_milreview_user.py` |
| Tests | `backend/tests/unit/publishing/test_milreview.py` |
