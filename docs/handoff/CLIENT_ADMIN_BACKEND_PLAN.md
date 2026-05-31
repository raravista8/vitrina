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
- **PR-LK2** — `POST /api/lk/leads/{id}/status` (4-state) + `/note` (enc);
  `change_request` table + `POST/GET /api/lk/change-requests` → surfaced in the
  founder feedback inbox (`source=lk_change_request`), status synced back.
- **PR-LK3** — `GET /api/lk/settings` + `POST /settings/contacts`
  (server-validate phone/email/telegram, persist to `Site.settings`, flag site
  re-render) + `/settings/notifications` + `POST /api/lk/password` (bcrypt,
  invalidate other sessions, rate-limit); `GET /api/lk/billing` free-state stub.
- **PR-LK4** — site soft-delete: `sites.deleted_at` + `pending_purge`; `DELETE
  /api/lk/site` (site → 410 immediately, archive kept 10 days); `GET
  /api/lk/site/archive` (on-the-fly ZIP: rendered HTML + lead photos); cron
  hard-purge after 10 days + audit. **No pause** (intentionally dropped).
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
