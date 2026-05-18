# Vitrina landing

Next.js 14 (App Router) + Tailwind + shadcn/ui (Radix primitives). Per
[`docs/COPY.md`](../docs/COPY.md) — canonical messaging for the hero and
benefits stack will land in T1.4.

## Dev

```bash
nvm use 20
npm install
npm run dev          # http://localhost:3000
```

Or run the whole stack via `make dev` from repo root.

## Commands

| npm script          | What it does                    |
| ------------------- | ------------------------------- |
| `npm run dev`       | next dev on :3000               |
| `npm run build`     | next build (SSG where possible) |
| `npm run start`     | next start (production)         |
| `npm run lint`      | eslint via next/core-web-vitals |
| `npm run typecheck` | tsc --noEmit                    |
| `npm test`          | vitest run                      |
| `npm run format`    | prettier --write                |
