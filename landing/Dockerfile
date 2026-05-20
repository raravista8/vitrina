# syntax=docker/dockerfile:1.7
# Vitrina landing — Next.js 14 (App Router).

# ---- Stage 1: deps -----------------------------------------------------------
FROM node:20-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN --mount=type=cache,target=/root/.npm npm ci

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
ARG NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY=
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_YANDEX_METRIKA_ID=$NEXT_PUBLIC_YANDEX_METRIKA_ID \
    NEXT_PUBLIC_YANDEX_VERIFICATION=$NEXT_PUBLIC_YANDEX_VERIFICATION \
    NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY=$NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_CLIENT_KEY

COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---- Stage 3: runtime --------------------------------------------------------
FROM node:20-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

RUN groupadd --system --gid 1001 nodejs \
    && useradd  --system --uid 1001 --gid nodejs --create-home nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs
EXPOSE 3000
CMD ["npm", "run", "start"]
