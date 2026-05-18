# Vitrina — Testing Strategy

> **TL;DR — security-first testing pyramid**
> - Pyramid (unit → integration → e2e → security-specific) с упором на security-tests как separate category
> - Coverage targets: `core/` ≥85%, adapters ≥60%, no target for `api/` routers (covered by integration)
> - Property-based testing для парсеров и sanitizers; mutation testing для `core/leads/encryption` и `core/auth/`

---

## 1. Pyramid

| Layer | Scope | Tool | Speed | Coverage target |
|---|---|---|---|---|
| Unit | `core/*` без I/O, чистые функции, доменная логика | `pytest`, `pytest-asyncio`, `hypothesis` | <100ms/test | core ≥85% |
| Integration | api routes + real Postgres + Redis (testcontainers) | `pytest`, `testcontainers-python` | <2s/test | api routes 100% endpoints touched |
| E2E | Browser → landing → API → admin publish → customer site | `playwright` (Python or Node) | <30s/test | critical paths only |
| Security | SSRF, prompt injection, XSS, authz matrix, brute force, fuzz | `pytest` + custom fixtures, `hypothesis` | varies | 100% threat-table coverage |
| Load | Smoke + endurance | `k6` | nightly CI | NFR targets |
| Visual regression (landing) | Lighthouse + screenshot diff | `lighthouse-ci`, `pixelmatch` | 1min/scenario | landing & template |

---

## 2. Test layout

```
backend/tests/
  unit/
    core/
      parsing/
      content/
      auth/
      leads/
      consent/
  integration/
    api/
    parsers/
      ymaps/fixtures/
      tg/fixtures/
      vk/fixtures/
      ig_archive/fixtures/
      photos/fixtures/
    content/
    workflows/   # full app → parser → content → publish
  e2e/
    test_application_to_publish.py
    test_admin_login_flow.py
    test_customer_site_lead.py
  security/
    test_ssrf.py
    test_prompt_injection.py
    test_xss_on_customer_site.py
    test_authz_matrix.py
    test_admin_brute_force.py
    test_pii_obfuscation.py
    test_crypto_roundtrip.py
    test_job_payload_hmac.py
    test_snapshot_sanitizer.py
    test_leads_intake.py
    test_photo_upload.py
    test_parser_isolation.py
  load/
    landing.js
    leads_intake.js
```

---

## 3. TDD policy

- **TDD enforced для**: `core/leads/encryption`, `core/auth/`, `core/parsing/url_validator` (SSRF guard), `core/content/output_validator` (prompt injection defence)
- **TDD optional для**: `api/` routers (integration tests sufficient), Jinja2 templates (visual review sufficient)
- Pre-commit hook reminds: when files in `core/{leads,auth,parsing/url_validator,content/output_validator}/` modified, corresponding test file must also be modified (same commit)

---

## 4. Property-based tests

Use `hypothesis` for:
- URL validator: generate arbitrary URLs, assert SSRF guard rejects all private-IP-resolving ones
- Phone obfuscator: generate phone variants, assert masked output matches `+7\*+\d{4}`
- Snapshot sanitizer: generate arbitrary text, assert output passes bleach roundtrip
- Fernet roundtrip: generate arbitrary bytes, assert `decrypt(encrypt(x, k), k) == x` and `decrypt(encrypt(x, k), wrong_k)` raises

---

## 5. Mutation testing

`mutmut` against `core/leads/encryption.py`, `core/auth/admin.py`. Run weekly in CI. Target: mutation score ≥80%.

---

## 6. Golden files / fixtures

- Parser fixtures: 3 referent inputs per source type, committed in `tests/integration/parsers/<source>/fixtures/`
- Generation fixtures: 5 referent `(snapshot, expected_content)` pairs; soft assertions (semantic similarity, not exact match)
- Lighthouse golden scores: stored in `tests/e2e/lighthouse-baseline.json`; CI fails if any score drops >2 points

---

## 7. Security test suite (cross-ref to SECURITY.md §8)

| Test file | Coverage | Threat |
|---|---|---|
| `test_ssrf.py` | 20+ payloads: localhost/IPv4 private/IPv6 ULA/redirect chain/DNS rebinding | T5.1, T5.2 |
| `test_prompt_injection.py` | 50+ patterns from `tests/security/corpora/prompt_injections.txt`; weekly extension | T6.1 |
| `test_xss_on_customer_site.py` | Render template with malicious generated content; assert Playwright sees no script exec | A05 |
| `test_authz_matrix.py` | Parametric: every endpoint × {anonymous, wrong-user, right-user, admin} | A01 |
| `test_admin_brute_force.py` | Drive 6 failed logins, assert IP locked | T7.1 |
| `test_pii_obfuscation.py` | 30 RU-realistic strings with phones/emails/names, assert obfuscated output | T6.2 |
| `test_crypto_roundtrip.py` | Fernet encrypt/decrypt, key rotation, wrong key | A04 |
| `test_job_payload_hmac.py` | Tampered payload rejected | T3.1 |
| `test_snapshot_sanitizer.py` | XSS payloads in snapshots, assert sanitized | T6.1 |
| `test_leads_intake.py` | Captcha bypass attempts, honeypot, rate limit | T8.1 |
| `test_photo_upload.py` | Magic-byte spoofing, oversized files, polyglot files | FR-014, FR-015 |
| `test_parser_isolation.py` | Parser worker has no route to postgres | T3.3, T5.4 |

---

## 8. Test data strategy

- **Synthetic only**: no production data in tests, no real PII even in fixtures
- **Faker (RU locale)** for realistic but fake names/phones/addresses
- **Generated archives** for IG/TG export tests — built once via script in `tests/integration/parsers/<source>/_build_fixtures.py`

---

## 9. CI test matrix

| Stage | Trigger | Duration target | Block merge? |
|---|---|---|---|
| Lint+format | every push | <30s | Yes |
| Unit | every push | <2min | Yes |
| Integration | every push | <8min | Yes |
| Security (subset: SSRF + prompt_injection + crypto + authz) | every push | <5min | Yes |
| Security (full) | nightly | <30min | Notify only |
| E2E | every push to main | <15min | Yes for main |
| Load smoke | nightly | <20min | Notify |
| Mutation | weekly | <2h | Notify |
| Lighthouse on template | every push touching templates | <3min | Yes if score <90 |

---

## 10. Performance budgets in tests

- Landing TTFB measured in load test, fail if p95 >500ms
- Template render <100ms per site
- LLM call mocked in tests; real latency measured separately in dev `make benchmark-llm`
