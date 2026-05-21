/**
 * Build metadata — single source of truth для версии задеплоенного landing'а.
 *
 * Зачем: аудиторы/QA/founder должны иметь способ за секунду понять «вижу ли
 * я свежую страницу или браузерный/CDN кэш». Раньше пришлось бы листать
 * git log, сравнивать commit'ы с тем что в HTML, и гадать стоит ли prerender
 * cache года (`s-maxage=31536000`) между ними и сервером.
 *
 * Теперь:
 *   - `<meta name="x-build-version" content="269094c-2026-05-21T12:08Z">` в
 *     каждом HTML, видно в `view-source` и через `curl | grep x-build`.
 *   - `GET /api/version` JSON endpoint для smoke-проверок.
 *
 * Значения резолвятся **во время `next build`** (Next.js bakes
 * `process.env.NEXT_PUBLIC_*` в client bundle, и обычные `process.env`
 * в server bundle). Из-за этого Dockerfile должен пробрасывать
 * `BUILD_VERSION` + `BUILD_TIME` как `ARG`s, а compose — через `.env` или
 * прямо из `deploy.sh`.
 *
 * Fallback `"dev"` / `null` нормален для локального `npm run dev` — это
 * как раз сигнал что build ещё не выполнялся.
 */

/** Git short-SHA (7 chars), or `"dev"` if not built. */
export const BUILD_VERSION: string = process.env.BUILD_VERSION || "dev";

/** ISO-8601 UTC timestamp of `next build`, or `null` in dev. */
export const BUILD_TIME: string | null = process.env.BUILD_TIME || null;

/** Combined display string: `"269094c · 2026-05-21T12:08Z"`. */
export const BUILD_TAG: string = BUILD_TIME ? `${BUILD_VERSION} · ${BUILD_TIME}` : BUILD_VERSION;
