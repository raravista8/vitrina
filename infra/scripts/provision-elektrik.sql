-- Provision the elektrik-spb customer site (owner User + published Site).
--
-- Run ONCE on prod after `alembic upgrade head` (migration 0014 adds the
-- schema; this seeds the business rows). NOT in the migration on purpose —
-- seeding rows in a migration pollutes the shared test DB (other tests assert
-- global row counts). Idempotent: re-running is a no-op.
--
-- The site_id MUST match sites-template/elektrik/content/site.json
-- (window.__SITE_ID), so the landing's lead form posts to a real published site.
--
-- Owner contact is a site-scoped placeholder until the client gives a real
-- notify channel (phone/TG/email) — update users.contact_type/contact_value
-- then. Login is 'elektrik-spb'; password_hash is set when the ЛК is provisioned.
--
-- Usage on the VPS:
--   docker compose ... exec -T postgres \
--     psql -U vitrina_migrator -d vitrina -f - < infra/scripts/provision-elektrik.sql
-- (or pipe the file via stdin / copy it in).

INSERT INTO users (id, contact_type, contact_value, plan, login)
VALUES (
    'e1ec0a17-0000-4000-8000-000000000002'::uuid,
    'email',
    'owner@elektrik-spb.samosite.online',
    'pro',
    'elektrik-spb'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO sites (
    id, user_id, subdomain, source_type, source_url, status,
    settings, seo_submission_log, published_at
)
VALUES (
    'e1ec0a17-0000-4000-8000-000000000001'::uuid,
    'e1ec0a17-0000-4000-8000-000000000002'::uuid,
    'elektrik-spb',
    'website',
    'https://www.avito.ru/brands/i173924916',
    'published',
    '{}'::jsonb,
    '{}'::jsonb,
    now()
)
ON CONFLICT (id) DO NOTHING;
