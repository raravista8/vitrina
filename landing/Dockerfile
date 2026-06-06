# syntax=docker/dockerfile:1.7
# Vitrina landing — Next.js 16 (App Router) + @samosite/canon workspace dep.
#
# Build context = repo root (per docker-compose's `context: ..`). Dockerfile
# paths therefore prefix with `landing/` for the app itself, and pull
# `packages/canon/` alongside as a `file:` workspace dep.

# ---- Stage 1: deps -----------------------------------------------------------
FROM node:20-bookworm-slim AS deps
WORKDIR /app
# Copy landing's package files PLUS the vendored canon package (`file:`
# dep target). The canon copy is required at install time — without it
# `npm ci` cannot resolve `@samosite/canon`. `dist/` ships committed in
# the canon package (see `packages/canon/.gitignore` `!dist/`), so no
# build step needed.
COPY landing/package.json landing/package-lock.json* ./
COPY packages/canon /packages/canon
# Hack for `file:../packages/canon` to resolve from /app: package-lock.json
# records the path as `../packages/canon` relative to the package, which
# resolves to `/packages/canon` from `/app/../packages/canon` ✓.
#
# --install-links materialises `file:` deps as copies (not symlinks).
# Turbopack's peer-dep resolver doesn't follow symlinks — it looks for
# `react` from the canon package's PHYSICAL path. Without --install-links
# the next-stage build fails with `Cannot find package 'react'`.
RUN --mount=type=cache,target=/root/.npm npm ci --install-links

# ---- Stage 2: builder --------------------------------------------------------
FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# Public Next.js env vars MUST exist at *build time* — Next bakes
# `process.env["NEXT_PUBLIC_*"]` into the static bundle during
# `next build`, so a runtime `env_file:` in docker-compose is too late
# (the value is already an empty string in the prerendered HTML).
#
# Each var declared here is paired with a forwarding entry in
# `infra/docker-compose.yml :: services.landing.build.args` so compose
# pulls them out of the project's `.env`. Empty values are fine — a
# missing ID is intentional in dev and produces a no-op tag (see
# `landing/app/layout.tsx`).
#
# Add a new public var? Three steps:
#   1. Add `ARG` + `ENV` lines below
#   2. Add the same name under `landing.build.args` in compose
#   3. Add the var to `.env.example` with a comment
ARG NEXT_PUBLIC_SITE_URL=
ARG NEXT_PUBLIC_YANDEX_METRIKA_ID=
ARG NEXT_PUBLIC_YANDEX_VERIFICATION=
ARG NEXT_PUBLIC_GOOGLE_VERIFICATION=
ARG NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY=

# Build-version stamps. NOT `NEXT_PUBLIC_*` because они нужны только в
# server-side render (meta-tag + /version endpoint). Резолвятся в
# `landing/lib/build-info.ts`. Передаются из `infra/scripts/deploy.sh`
# (или вручную через `docker compose build --build-arg BUILD_VERSION=...`).
ARG BUILD_VERSION=dev
ARG BUILD_TIME=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION \
    NEXT_PUBLIC_GOOGLE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_VERIFICATION \
    NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY=$NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY \
    BUILD_VERSION=$BUILD_VERSION \
    BUILD_TIME=$BUILD_TIME

COPY --from=deps /app/node_modules ./node_modules
# Source for landing only — canon is already inside node_modules/@samosite/canon
# from the deps stage's --install-links copy.
COPY landing/ .
RUN npm run build

# ---- Stage 3: runtime --------------------------------------------------------
FROM node:20-bookworm-slim AS runtime
WORKDIR /app

# Build-version stamps are needed at RUNTIME too (not just build) so
# dynamic route handlers like `app/version/route.ts` (force-dynamic) can
# read them via `process.env`. Builder-stage ENV is sealed in the static
# bundle for prerender, but dynamic routes execute in this runtime
# container — they need the same values re-declared here.
ARG BUILD_VERSION=dev
ARG BUILD_TIME=

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    BUILD_VERSION=$BUILD_VERSION \
    BUILD_TIME=$BUILD_TIME

RUN groupadd --system --gid 1001 nodejs \
    && useradd  --system --uid 1001 --gid nodejs --create-home nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
