# Vitrina / Самосайт — security scan focus

> Appended to the `anthropics/claude-code-security-review` audit prompt
> via the `custom-security-scan-instructions` input. Encodes this
> project's threat model so the AI reviewer flags the things that
> actually matter here, not generic noise. Source of truth for the full
> model: `docs/SECURITY.md`.

This is an AI website generator for Russian micro-businesses. Stack:
Python 3.12 + FastAPI + SQLAlchemy 2.0 + Postgres + Redis (RQ) +
Jinja2 (customer sites); Next.js 16 + React 19 + Tailweb landing.
Only LLM is YandexGPT. FZ-152 (Russian PII law) compliant.

## Prioritise findings in these areas (highest signal first)

### 1. SSRF — user-provided URLs reach parsers
Code under `backend/app/core/parsing/` fetches user-submitted URLs
(Yandex.Maps, Telegram, etc.). Flag:
- Any outbound HTTP fetch of a user URL **without** allowlist + DNS
  resolution checks against private ranges (RFC1918, 127/8, 169.254/16,
  IPv6 ULA/link-local).
- DNS-rebinding gaps: a second DNS lookup between validation and the
  actual TCP connect (must pin the resolved IP).
- Redirects followed without re-validating each hop.
- Missing response-size / timeout caps on the fetch.

### 2. Prompt injection + untrusted LLM I/O
Scraped/uploaded content flows into YandexGPT prompts and back into
customer-site HTML. Flag:
- User/scraped content concatenated into an LLM prompt **without**
  `<user_content>` tagging.
- LLM output rendered or stored **without** `bleach.clean()` with a
  tight tag allowlist.
- LLM output URLs not checked against an allowlist (`javascript:`,
  `data:`, off-allowlist domains).

### 3. PII / FZ-152
- `leads.{name,phone,message}` must be Fernet-encrypted at write time
  (`*_enc` BYTEA). Flag plaintext PII writes.
- PII must never reach the LLM un-obfuscated (`[PHONE]`, `[EMAIL]`,
  `[NAME]`). Flag raw phone/email/name patterns sent to YandexGPT.
- Logs must mask PII (phone → `+7***1234`, email → `a***@host`,
  IP → /16). Flag PII in `logger.*` / `print` / structlog calls.

### 4. SQL injection
- ORM only. Flag any raw SQL built with f-strings / `.format()` /
  `%`-formatting / string concatenation. `text(":param")` bound
  parameters are OK; `text(f"... {var} ...")` is NOT.

### 5. Forbidden runtime imports (hard rule)
Flag any import of: `openai`, `anthropic`, `google.generativeai`,
`telethon`, `instaloader`, `instagram_private_api`. Only YandexGPT is
allowed as an LLM (ADR-0003); the others are legal/ToS landmines.

### 6. Secrets
- All secrets from env vars only. Flag any hardcoded key, token,
  password, Fernet key, or TOTP seed — including "example"/"default"
  values that look real. Flag committed `.env`.

### 7. Auth / admin
- Public endpoints need a rate-limit decorator. Flag public routes
  without one.
- Admin requires bcrypt(cost≥12) + TOTP. Flag any weakening, any
  "temporary" auth bypass, any debug backdoor.
- Pydantic schemas must set `model_config = ConfigDict(extra='forbid')`.
  Flag input schemas missing it.

### 8. Template / XSS
- Jinja2 global `autoescape=True`. Flag `{{ x | safe }}` and any
  `Markup(...)` over user/LLM data.
- Customer sites: flag unsanitised innerHTML / `dangerouslySetInnerHTML`
  over non-constant data.

## Deprioritise (likely false positives here)

- `landing/components/SiteHeader.tsx` + `CanonCtaBindings.tsx` —
  intentional client-side DOM mutation (canon vendoring workaround,
  documented in `docs/handoff/CANON_SWAP_PLAN.md`). Not DOM-based XSS.
- `packages/canon/**` — vendored UI source (round-tripped through the
  design pipeline). Inline styles there are the design spec, not code
  smells.
- `*.test.ts` / `*.test.tsx` / `tests/**` fixtures with obviously fake
  credentials/PII.
- `docs/**` — example payloads in threat-model docs are illustrative.
