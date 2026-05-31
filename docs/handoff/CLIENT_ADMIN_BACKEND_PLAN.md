# Client ЛК — backend plan (`/api/lk/*`)

Backend for the client cabinet (`design_handoff_client_admin/`). The owner of one
site logs in and manages **their own** leads + change-requests + settings.
NOT the operator admin (`/admin/*`, TOTP) and NOT the landing demo.

## Already in place (reused)
- Customer auth — `POST /api/auth/login` (`User.login` + bcrypt `password_hash`,
  `CustomerSessionStore`, `samosite_session` cookie) + logout. milreview already
  seeded; elektrik seeded via `app/workers/seed_elektrik_user.py`.
- Leads + Fernet — `Lead` (name/phone/address_enc + object_type/service/call_time
  + `note_enc`) + `LeadPhoto` (Fernet image bytes in-DB). Decrypt in admin view.
- Founder feedback inbox — `Feedback` table + `/admin` aggregation.
- ЮKassa client (T9.1) for the future paid mode.

## Per-site lead structure (the key requirement)
`Site.settings['lead_schema'] = [{key,label,type,pii}]` — the ЛК renders cards /
columns from this. Electrician = 8 fields; milreview = `[]` → "no leads" state.
Returned by `GET /api/lk/site`. Provisioned per client (see provision SQL).

## Phasing
- **PR-LK1 ✅ (this PR)** — `require_customer_session` gate (cookie→user→site_id,
  server-scoped); migration 0015 (`leads.note_enc` + widen status CHECK to the
  union incl. `in_progress/done/declined`); `GET /api/lk/site` (+ lead_schema),
  `GET /api/lk/leads` (decrypt, filters `status/q/from/to`, status counts),
  `GET /api/lk/leads/{id}`, `GET /api/lk/leads/{id}/photo/{idx}` (owner-only
  decrypted JPEG). `seed_elektrik_user.py` + lead_schema provisioning.
- **PR-LK2 ✅ (#212)** — `POST /api/lk/leads/{id}/status` (4-state) + `/note` (enc);
  migration 0016 `change_request` table + `POST/GET /api/lk/change-requests` →
  surfaced in the founder feedback inbox (`source=lk_change_request`), status
  synced back via `GET/POST /admin/api/change-requests`.
- **PR-LK3 ✅ (#213)** — `GET /api/lk/settings` + `POST /settings/contacts`
  (server-validate phone/email/telegram, per-field 400, persist to
  `Site.settings`) + `/settings/notifications` + `POST /api/lk/password` (bcrypt
  verify current, best-effort per-user Redis rate-limit 5/h); `GET /api/lk/billing`
  free-state stub. No migration — settings live in `Site.settings` JSONB.
- **PR-LK4 ✅** — site soft-delete: migration 0017 (`sites.deleted_at` + widen
  status CHECK with `pending_purge`); `DELETE /api/lk/site` (typed `confirm`
  guard = subdomain; status→`pending_purge` + `deleted_at`; host suppressed to
  **410** immediately via `app.state.purged_hosts`, re-loaded from DB at startup;
  founder alert); `GET /api/lk/site/archive` (on-the-fly ZIP: `leads.csv`
  decrypted + lead photos + live rendered site HTML); cron hard-purge worker
  `app/workers/purge.py` (`pending_purge` + `deleted_at < now-10d` → DELETE site
  → DB cascades leads/photos/change-requests; structlog audit). **No pause**
  (intentionally dropped).
  - **Operator action:** schedule `python -m app.workers.purge` daily (RQ-scheduler
    glue, like `analytics_digest`). Until scheduled, soft-deleted sites stay 410'd
    but their lead data isn't hard-purged — run the command manually.
- **PR-LK5 ✅** — «Ключевые слова» (SEO), spec `specs/03_keywords.md`. New
  `core/keywords/` (pure): parse 4 groups from the rendered page (Title/H1→main,
  H2→h2, `<meta keywords>`→text, blog empty), apply groups to the live page's
  `<meta keywords>` (layout-neutral — visible Title/H1/H2 untouched, §6 fallback;
  full visible-copy rewrite is the customer-SSR pipeline's job), generate
  per-niche minus-words. `GET /api/lk/keywords` (stored-or-parse + persist),
  `PUT /api/lk/keywords` (sanitize/dedup/cap → store in `Site.settings['keywords']`
  + apply to served HTML in-process), `GET /api/lk/keywords/minus` (read-only,
  base + niche from `settings['niche']`). Startup re-applies stored keywords to
  the served page (survives restart). No migration. Niche `electrician` added to
  the elektrik provision + a one-off prod `settings || '{"niche":"electrician"}'`.
- **Analytics** — none; UI shows "в разработке", no endpoint.

## Per client
- **elektrik-spb** — full 8-field `lead_schema`; provision login + password
  (`ELEKTRIK_PASSWORD` env → `seed_elektrik_user.py`).
- **milreview** — login already seeded; `lead_schema=[]` → ЛК «Заявок нет», other
  tabs (Изменения/Оплата/Настройки) work.

## Infra caveats (this prod)
- No Object Storage → lead photos + the delete-archive ZIP are served by the api
  (decrypt route / on-the-fly zip), not S3 signed URLs.
- Lead-arrival + change-request notifications are stored but **delivery is inert**
  (TG blocked from VPS, SMTP unset — OPERATIONS §4/§5).

## Deviations from `specs/01_backend.md`
- Photos: auth-scoped decrypt route instead of S3 signed URLs (no bucket).
- change-requests: own table (Feedback lacks `site_id`+`status`) surfaced into the
  founder inbox, rather than literally the same table.
- Lead status enum widened (union) rather than replaced — keeps the operator admin
  working; the ЛК uses/maps the 4-state subset.
