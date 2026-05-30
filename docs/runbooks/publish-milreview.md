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

## 5. ⚠️ Deferred — must do before calling it "done for the client"

These are **flagged, not done** in the initial build:

1. **Content reconciliation (TZ §7).** The content store was extracted from the
   design canon, where some station names/regions/wording are *representative /
   reconstructed*. The real `milreview.ru` source is **windows-1251**. Pull the
   live content (decode cp1251 → UTF-8) and replace: station/разъезд/о.п. names,
   regions, news/приказ texts, the «А знаете ли вы?» (ст. Обоянь) blurb, the
   «N мая в истории» entry, photo captions. **Do not invent** — pull from the
   source or ask the client. Edit `sites-template/milreview/content/*.json` and
   re-publish.
   - Known structural fixups already applied: a few duplicate station ids in the
     canon directory were de-collided (Кичера/Кунерма/Гурское) so each station
     gets its own page — re-verify these ids against the real source.
2. **Images.** The home featured photo + full-station photos currently hot-link
   `https://milreview.ru/pics/...`. For prod, pull them to our S3/CDN and update
   the `img`/`photos` URLs in the content store.
3. **Domain strategy (TZ §4.5).** `milreview.samosite.online` is live. Decide
   with the client whether `milreview.ru` stays primary (then add a canonical /
   redirect strategy) or fully moves to the subdomain. Affects canonical + 301s.
4. **Nice-to-haves not in canon scope:** per-document full-text pages
   (`/docs/<slug>` — canon links go to the table), real archive-year pages
   (canon links are `#`), working station search (the nav box is inert, as in
   canon).

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
