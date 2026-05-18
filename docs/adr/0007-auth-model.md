# ADR-0007: Magic-link + Yandex ID OAuth for users; password+TOTP for admin

Date: 2026-05-18
Status: Accepted

## Context

Два класса юзеров:
1. **End-users** (мастера, владельцы бизнеса) — нужен низкий friction, мобильный first, разовый вход редко
2. **Admin** (founder) — единственный пользователь, нужна максимальная защита

Существующие провайдеры идентичности:
- Auth0, Clerk, Cognito — зарубежные, не используем (трансграничная передача учётных данных, ФЗ-152)
- Keycloak self-hosted — overkill для 1 admin + magic-link юзеров
- Yandex ID — российский OAuth provider, юзеры уже имеют аккаунт

## Decision

**End-user authentication: passwordless только.**
- Magic link на email через SMTP (Yandex Mail для бизнеса или собственный SMTP-relay)
- Yandex ID OAuth (приоритет, т.к. ICP в РФ почти 100% имеет Yandex-аккаунт)
- Telegram Login Widget — для входа через TG-аккаунт (наша основная аудитория)

**Admin authentication:**
- Пароль (≥16 chars, bcrypt cost=12) + TOTP 2FA (`pyotp`)
- Сессия в server-side store (Redis), cookie httpOnly+Secure+SameSite=Strict
- Single admin account для MVP (founder)
- IP allowlist опционально — на старте отключено, можно включить если будут атаки

**Никаких JWT** для администрирования: server-side sessions, легко инвалидировать.

## Alternatives considered

- **Email+password для end-users** — rejected. Лишние attack surface (passwords reuse, breach replay), лишние UX-frictions (forgot password flow), нет преимуществ.
- **OAuth через VK ID** — rejected на старте, но добавить в backlog. ICP overlap с Yandex ID высокий, VK ID дополняет.
- **WebAuthn / passkeys для admin** — rejected на старте. Зрелость в РФ-браузерах ограничена; TOTP + strong password — достаточно для одного admin.
- **Auth0 / Clerk** — rejected. Зарубежные provider, ФЗ-152 проблематика.

## Consequences

**Positive:**
- End-user friction минимальный: 2 клика и вошёл через Yandex ID
- Admin защищён двумя факторами; single account = focused security
- Нет хранения паролей end-users → нет breach exposure

**Negative:**
- Зависимость от Yandex ID availability; mitigation: magic link fallback
- TG Login Widget — sendable phone numbers/usernames потенциально нарушают принцип «PII только с явного согласия»; mitigation: показать чекбокс согласия на оба механизма
- Если admin TOTP-устройство потеряно — recovery flow: backup-коды (8 шт., сгенерированы при включении 2FA, зашифрованы Fernet и хранятся в репозитарии 1Password)

**Neutral:**
- В MVP нет user roles внутри одной компании (например, мастер + ассистент). Backlog.

## Verification

```bash
# 1. Зависимости установлены:
grep -E "passlib|pyotp|authlib|httpx" backend/poetry.lock

# 2. Пароль НЕ хранится в открытом виде:
psql -c "SELECT column_name FROM information_schema.columns WHERE table_name='admin_credentials'"
# Должно быть: password_hash, totp_secret_enc, не password

# 3. Тесты:
pytest tests/security/test_admin_auth.py -v
# Проверяет: брутфорс блокируется, TOTP обязателен, session инвалидируется при logout, ip-rate-limit срабатывает

# 4. Magic link expires в 15 минут:
grep -E "MAGIC_LINK_TTL.*=.*900" backend/app/core/auth/  # 15 min in seconds
```
