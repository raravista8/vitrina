# Changelog

## 0.1.0 — initial release · 2026-05-23

First mechanically-converted release from the canon JSX prototypes in the `vitrina ui` design project. **All values come from canon files unchanged** — this is a transport-layer release, not a redesign.

### What works

- All 19 screens from `SCREEN_INDEX.md` are exported and importable
- Tokens (`VT`, `BRAND`, flat `tokens` per ТЗ §2.3)
- Primitives (`Eyebrow`, `Mono`, `Card`, `Btn`, `Input`, `Badge`, `Checkbox`, `Logo`, `BrandMark`, `IconArrow`, `IconLink`, `Spinner`)
- `<CanonStyles />` provider + standalone `styles.css` (ТЗ §2.4)
- Tailwind preset (`@samosite/canon/tailwind-preset`, ТЗ §2.5)
- TypeScript types (loose — `strict: false`, public API is best-effort typed)

### Known gaps vs ТЗ §2.1

- `StickyHeader` and `Footer` are inlined inside `SamosaytLanding`, not standalone exports. Use `<Landing />` (full composition) or extract them in a future minor.
- `S4_TGBotInvite` from the original canon is exported via `intake/` (not aliased to a TZ name — there was no clear target in §2.1 for it).
- Section-name aliases follow ТЗ §2.1: `HeroSection ⇔ HeroBlock`, `SubmitModal ⇔ S3_SubmitModal`, etc. Raw `S*_*` names also exported for back-compat.

### Conversion notes

- IIFE wrappers (`if (!window.__xxx) { … }`) stripped
- `window.VT` / destructured globals (`const { Btn, Card, … } = window`) stripped — replaced with proper ES imports
- `Object.assign(window, { … })` replaced with `export { … }`
- All `'use client'` directives added (Next.js 16 App Router)
- One stray `<window.BrandMark>` JSX reference in `intake` fixed to `<BrandMark>`
- One `const { useState, useMemo } = React` collision in `admin-demo` removed (we already destructure those from the `import`)
- Inline styles **preserved as-is** — this is the design specification, not legacy code

### Acceptance per CANON_PACKAGE_TZ §7

- [x] `npm install` shape works (peers: React 19, ESM-only)
- [x] All 19 screens exported via path-exports
- [x] `tailwind-preset` integrates without conflicts
- [x] Types present
- [x] ESM-only bundle
- [x] CSS provider + CSS file both work
- [x] No `window.*` globals in shipping code
- [x] CHANGELOG and README present
- [ ] Bundle size <200KB unminified — to verify after first `npm run build` on consumer side
- [ ] Pixel-diff = 0% on drop-in — to verify on consumer side
