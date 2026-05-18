# ADR-0006: Fernet application-level encryption for PII fields, with Yandex KMS in M3+

Date: 2026-05-18
Status: Accepted

## Context

Лиды на клиентских сайтах содержат ПДн конечных посетителей (имя, телефон, сообщение). ФЗ-420 (с июля 2024) криминализирует операторов ПДн за утечки — штрафы до 500 млн ₽ при повторном нарушении, потенциальный реальный срок при крупных утечках [verify: точная редакция и пороги].

Сценарии утечки, против которых защищаемся:
1. **DB dump утекает наружу** (insider, backup misconfigured, SQL injection): без шифрования — все ПДн читаются; с шифрованием — bytes без ключа
2. **Compromised Postgres user** (через SQL injection на одном эндпоинте): атакующий не должен иметь возможности экстрагировать ПДн без ключа приложения
3. **Stolen backup**: encryption at rest для backup отдельно

TLS в транзите — обеспечивает Caddy с Let's Encrypt. Диск VPS — не шифруется на уровне Selectel по умолчанию [verify: Selectel options для encrypted volumes]; полагаться на это нельзя.

Опции application-level шифрования:
- Fernet (cryptography library) — symmetric AES-128-CBC + HMAC-SHA256, simple API
- AES-256-GCM ручной (cryptography library Hazmat) — больше контроля, но больше места для ошибок
- pgcrypto — encryption на уровне БД, но ключ всё равно где-то живёт; для transparent encryption годится, для targeted PII — не лучше Fernet
- Yandex Cloud KMS + Envelope encryption — production-grade, audit log, ротация ключей

## Decision

We will use **Fernet symmetric encryption** for PII fields in `leads` table at MVP. Master key (`FERNET_KEY`) stored in environment variable, never written to disk in plaintext on the VPS.

**Encrypted fields (BYTEA type in Postgres):**
- `leads.name_enc`
- `leads.phone_enc`
- `leads.message_enc`

**Encryption pattern:**
- Encrypt on write in `core/leads/repository.py`
- Decrypt on read ONLY in admin endpoints and user TG-bot reveal endpoint (authenticated, audit-logged)
- Bulk export of decrypted leads — manual operation only, requires founder password + TOTP

**Key management:**
- M1 (MVP): `FERNET_KEY` в Docker secret, прочитанный из 1Password-vault при деплое (manual paste при `docker compose up`); НЕТ в `.env` файле на диске
- M3+: миграция на Yandex Cloud KMS envelope encryption (data key per record, KMS rotates master); см. backlog T-S.X

**Rotation:**
- Master key rotation каждые 90 дней
- Реализация: добавить поле `leads.fernet_key_id`, поддерживать чтение с N последних ключей одновременно, фоновая job пере-шифрует старые записи

**Backups:**
- pg_dump → gpg-encrypted с отдельным backup-ключом (НЕ Fernet) → Selectel Cold Storage
- Backup ключ — split-knowledge: половина у founder в 1Password, половина — в Yandex Cloud KMS Secret [verify: Yandex Cloud Lockbox availability]

## Alternatives considered

- **No app-level encryption, rely on disk encryption + TLS** — rejected. Disk encryption Selectel optional, no LUKS by default; SQLi на одном эндпоинте → весь PII доступен.
- **AES-256-GCM ручной** — rejected. Fernet проще и достаточно для MVP; вероятность ошибки реализации ниже.
- **pgcrypto в БД** — rejected. Ключ всё равно живёт в приложении или конфиге; не уменьшает attack surface против app-level compromise.
- **Yandex Cloud KMS сразу в M1** — rejected на старте. Усложняет local development (нужно стаббить KMS), добавляет ~7 дней; миграция на KMS из Fernet — детерминированная и быстрая (rewrite ciphertext с тем же plaintext, новым provider).

## Consequences

**Positive:**
- DB dump утекает → ПДн не читаются без `FERNET_KEY`
- SQLi на read-only endpoint → возвращает BYTEA, не plaintext
- ФЗ-152 ст. 19 — соответствие требованию шифрования с использованием сертифицированных средств (Fernet = AES-128 + HMAC-SHA256, оба алгоритма не запрещены; для гос.сектора нужны ГОСТ — для нас не применимо). [verify: уточнить требование к шифрованию ПДн оператором не из гос.сектора]

**Negative:**
- Decryption латентность на каждый admin-view списка лидов; mitigation: лимит 50 на страницу
- Поиск по зашифрованным полям невозможен (нельзя `WHERE phone_enc = ?`) — для MVP не нужно
- Потеря `FERNET_KEY` = потеря всех лидов навсегда. Mitigation: ключ в 2-х местах (1Password vault + bootstrap-документ в банковской ячейке после первых платящих)

**Neutral:**
- Migration to KMS — отдельный спринт в M3+, ADR обновится.

## Verification

```bash
# 1. Поля в БД — BYTEA, не TEXT:
psql -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name='leads' AND column_name LIKE '%_enc'"
# Должно показать data_type = bytea для name_enc, phone_enc, message_enc

# 2. Никакие лог-строки не содержат plaintext PII:
docker compose logs api | grep -iE "phone|email|message" | grep -vE "\\*+|\\[REDACTED\\]"

# 3. Test: write/read roundtrip с разными ключами:
pytest tests/unit/core/leads/test_encryption.py

# 4. Backup восстанавливается:
make restore-backup-test
```

## Open questions

- **OQ-6.1**: Нужна ли ФСТЭК-сертификация средств шифрования для частного оператора ПДн? (Распространённое заблуждение — для не-гос требований нет, но проверить с юристом.)
- **OQ-6.2**: Yandex Cloud Lockbox vs KMS — что использовать на M3+ миграции?
