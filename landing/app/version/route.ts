/**
 * `GET /version` — landing build version probe.
 *
 * Простой JSON endpoint для smoke-проверок: «вижу ли я ожидаемый git SHA на
 * проде?». Используется founder'ом и внешними аудиторами:
 *
 *   curl -s https://samosite.online/version | jq
 *   # {"git_sha":"269094c","built_at":"2026-05-21T12:08:00Z",
 *   #  "tag":"269094c · 2026-05-21T12:08:00Z"}
 *
 * Не под `/api/*` — этот префикс rewrite'ится на FastAPI в `next.config.mjs`,
 * там нет build-time контекста landing'а.
 *
 * Response headers:
 *   - `Cache-Control: no-store` — версия должна быть всегда свежая, иначе
 *     теряется весь смысл endpoint'а.
 *   - `Access-Control-Allow-Origin: *` — чтобы можно было вызвать из
 *     headless-Chrome / monitoring tools без CORS-плясок.
 *
 * Spec / why this exists: see `landing/lib/build-info.ts` doc-comment.
 */

import { NextResponse } from "next/server";

import { BUILD_TAG, BUILD_TIME, BUILD_VERSION } from "@/lib/build-info";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      git_sha: BUILD_VERSION,
      built_at: BUILD_TIME,
      tag: BUILD_TAG,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
