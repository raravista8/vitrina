# Provisioning customer login credentials — manual workflow

> Pre-launch fake-door. После того как ты собрал customer-site через
> `create-customer-subdomain.md`, генерируй мастеру `{login, password}` и
> отправь в тот же канал, через который пришла заявка.
> Auth backend: canon 0.4.0 `<CustomerLogin>` → `POST /api/auth/login`
> → `users.login` + `users.password_hash` (bcrypt).

## Шаги

### 1. Найди user_id из application

В admin (`/admin/apps/<application_id>`) — поле `user_id`. Это
`users.id` (UUID) мастера в БД.

### 2. Сгенерируй пароль

```bash
PASSWORD=$(openssl rand -base64 12)
echo "Пароль: $PASSWORD"
# Запиши себе — после bcrypt уже не вытащить.
```

### 3. Захеши через bcrypt

SSH на VPS:

```bash
ssh deploy@135.106.137.30
cd /opt/vitrina

# Используем bcrypt из backend-контейнера
PASSWORD_HASH=$(docker compose exec -T api python -c "
import bcrypt, sys
plain = sys.argv[1].encode('utf-8')
salt = bcrypt.gensalt(rounds=12)
print(bcrypt.hashpw(plain, salt).decode('ascii'))
" "$PASSWORD")
echo "Hash: $PASSWORD_HASH"
```

### 4. Запиши в БД

```bash
LOGIN=studia-anna  # = subdomain
USER_ID="<uuid-from-admin>"

docker compose exec postgres psql -U vitrina vitrina_prod -c "
  UPDATE users
  SET login = '$LOGIN',
      password_hash = '$PASSWORD_HASH'
  WHERE id = '$USER_ID'
"
```

### 5. Отправь мастеру

Через тот канал, что в `applications.contact_*`:

```
Привет!

Ваш Самосайт готов: https://<subdomain>.samosite.online

Кабинет управления: https://samosite.online/login
Логин: <subdomain>
Пароль: <generated-password>

Сохраните это сообщение — пароль уже не показывается.
```

### 6. Проверь сам

```bash
curl -sS -X POST https://samosite.online/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"login\":\"$LOGIN\",\"password\":\"$PASSWORD\"}" \
  -i | head -20
# Expect: HTTP/2 200 + Set-Cookie: samosite_session=...
```

Затем открой `https://samosite.online/login` в инкогнито, введи login + password — должен перебросить на `/admin-demo`.

## Если что-то не так

| Симптом | Решение |
|---|---|
| `users.login` уже занят | Кто-то взял этот subdomain раньше. Выбери другой имя через постфикс (`studia-anna-spb` и т.п.) |
| `curl` возвращает 401 | Hash не записался / опечатка. `SELECT login, password_hash FROM users WHERE id='<uuid>'` — проверь что обе колонки заполнены |
| `curl` возвращает 429 | Rate-limit (5 неудачных за 15 мин → 5 мин блокировки). Подожди или `DEL customer_login_lockout:<login>` в Redis |
| Мастер вводит правильный пароль, но 401 | Сравни хеш: `bcrypt.checkpw("...".encode(), b"<stored_hash>")` через python в контейнере |

## Reset password

Когда мастер забыл пароль (пока нет self-service recovery):

1. Повтори §2-4 с новым паролем
2. Старая сессия в Redis не инвалидируется автоматически — мастер может зайти со старого устройства; если нужно жёстко форсировать:
   ```bash
   docker compose exec redis redis-cli --scan --pattern "customer_session:*" | \
     while read k; do
       # Дёрни user_id из payload — стоит ли удалять
       payload=$(docker compose exec -T redis redis-cli get "$k")
       echo "$payload" | grep -q '"user_id": "<user_id>"' && \
         docker compose exec redis redis-cli del "$k"
     done
   ```

## Когда автоматизируем

После 100+ клиентов: signup endpoint, password-recovery flow, magic-link
fallback. Сейчас — manual provisioning через этот runbook.

## Ссылки

- `app/api/routers/auth.py` — endpoint `/api/auth/login`
- `app/core/auth/customer.py` — `CustomerSessionStore`
- `app/infrastructure/postgres/models.py::User` — `login` / `password_hash` columns
- `landing/app/login/page.tsx` — UI (canon `<CustomerLogin>` wrapper)
- `docs/runbooks/create-customer-subdomain.md` — шаг до этого runbook'а
