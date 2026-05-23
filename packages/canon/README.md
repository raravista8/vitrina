# @samosite/canon

> Canonical UI for **Самосайт** (samosite.online). Single source of truth for visual design — same React render that the dev canvas uses, packaged as a real npm module.

**Current version: `0.2.0-alpha.1`** — admin-core interactive variants (AdminLogin, AdminChrome, AdminDashboard, AppsList, AppDetail are now drop-in for production). See [CHANGELOG](./CHANGELOG.md).

## Why this exists

The previous workflow was: design canvas in JSX → handoff doc → developer transcribes into prod TSX → drift on every value. **This package eliminates the transcription step.** Production imports the canon components and renders them directly. Visual diff vs canvas = 0 by construction.

```tsx
// landing/app/layout.tsx
import { CanonStyles } from '@samosite/canon';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <CanonStyles />
        {children}
      </body>
    </html>
  );
}

// landing/app/page.tsx
import {
  StickyHeader, HeroSection, ExamplesSection, StorySection,
  PlatformsSection, BigFeaturesSection, OwnershipSection,
  AnalyticsSection, PricingSection, FaqSection, FreeMonthSection,
  Landing,
} from '@samosite/canon/landing';

export default function Page() {
  // Either compose by section…
  return (
    <>
      <HeroSection />
      <ExamplesSection />
      <StorySection />
      {/* …rest */}
    </>
  );
  // …or use the prebuilt composition
  // return <Landing />;
}
```

## Install

```bash
npm install @samosite/canon
# peers
npm install react@>=19 react-dom@>=19
```

## Fonts

The canon assumes **Onest** (sans) and **JetBrains Mono** (mono) are loaded. Drop this in your `<head>` (Next.js: `next/font` is fine too):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap">
```

## CSS — `<CanonStyles />` or import the CSS file

Hover effects, focus rings, smooth-scroll, pulse — all live in one CSS sheet. Pick **one**:

```tsx
// option A — React provider (mount once in root layout)
import { CanonStyles } from '@samosite/canon';
<CanonStyles />
```

```ts
// option B — global CSS import (in your app's CSS entry, e.g. globals.css)
@import '@samosite/canon/styles.css';
```

Without one of these, hover-lift / pulse / focus-rings won't fire. Static layout still renders fine.

## Tailwind preset (optional, recommended for swap workflow)

```ts
// tailwind.config.ts
import canon from '@samosite/canon/tailwind-preset';
export default {
  presets: [canon],
  content: [/* ... */],
};
```

Your custom Tailwind classes now share token names with the canon (`bg-accent`, `text-ink-soft`, `rounded-lg`, `shadow-card`, …) — so per-section Tailwind swaps stay in lockstep with canon values.

## Path exports

| Entry | What's inside |
|---|---|
| `@samosite/canon` | Everything (barrel) |
| `@samosite/canon/tokens` | `VT`, `BRAND`, flat `tokens` object, `Tokens` type |
| `@samosite/canon/primitives` | `Eyebrow`, `Mono`, `Card`, `Btn`, `Input`, `Badge`, `Checkbox`, `Logo`, `BrandMark`, `IconArrow`, `IconLink`, `Spinner` |
| `@samosite/canon/landing` | `Landing`, `HeroSection`, `ExamplesSection`, `StorySection`, `PlatformsSection`, `BigFeaturesSection`, `OwnershipSection`, `AnalyticsSection`, `PricingSection`, `FaqSection`, `FreeMonthSection`, `SectionTitle`, `SectionSub`, `SiteCard`, `FeatureCard`, `PlatformCard`, `StoryStepColorful`, `FeatureGlyph`, `PlatformLogo` |
| `@samosite/canon/intake` | `SubmitModal`, `Confirmation`, `PhotoDrawer` + raw `S3_*`, `S5_*`, `S6_*` aliases |
| `@samosite/canon/customer` | `CustomerSite`, `LeadForm`, `FeedbackPage` + `S7_SchemeSwatches` |
| `@samosite/canon/source` | `SourceDetectionBadge` (desktop catalog) + `S2_Desktop`, `S2_Mobile` |
| `@samosite/canon/admin-demo` | `ClientAdminDemo` — `/admin-demo` page |
| `@samosite/canon/admin-core` | **Interactive (0.2.0):** `AdminLogin`, `AdminDashboard`, `AppsList`, `AppDetail`, `AdminChrome`, `StatusPill`, `StatTile` + shared design surfaces `SkeletonBlock`, `EmptyState`, `ErrorBlock`, `RateLimitCountdown`, `FilterChip`, `TrendChart` + all prop types |
| `@samosite/canon/admin-ops` | `SitesList`, `SiteDetail`, `Leads`, `Waitlist`, `FeedbackInbox`, `Settings` (presentational in 0.2.0-alpha.1, full props in 0.2.0) + **all prop types ready now** |
| `@samosite/canon/tailwind-preset` | Tailwind preset (default export) |
| `@samosite/canon/styles.css` | Raw CSS for option B above |

## Admin chrome — drop-in for prod (0.2.0)

`AdminChrome` + 4 admin-core screens accept full controlled props in 0.2.0. Pattern:

```tsx
// app/admin/layout.tsx
'use client';
import { AdminChrome } from '@samosite/canon/admin-core';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const section = (pathname.split('/')[2] ?? 'dashboard') as any;

  return (
    <AdminChrome
      active={section}
      user={{ username: 'founder@samosite.online', initials: 'F' }}
      badgeCounts={{ apps: 12, waitlist: 3 }}
      onNavigate={(s) => router.push(`/admin/${s === 'dashboard' ? '' : s}`)}
      onLogout={async () => {
        await fetch('/admin/api/logout', { method: 'POST' });
        router.push('/admin/login');
      }}>
      {children}
    </AdminChrome>
  );
}
```

```tsx
// app/admin/login/page.tsx
'use client';
import { useState } from 'react';
import { AdminLogin } from '@samosite/canon/admin-core';
import type { AdminLoginError, AdminLoginMode, AdminLoginStep } from '@samosite/canon/admin-core';

export default function LoginPage() {
  const [step, setStep] = useState<AdminLoginStep>(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [totp, setTotp] = useState('');
  const [mode, setMode] = useState<AdminLoginMode>('totp');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AdminLoginError>(null);
  const [challengeId, setChallengeId] = useState<string | null>(null);

  return (
    <AdminLogin
      step={step} onStepChange={setStep}
      username={username} onUsernameChange={setUsername}
      password={password} onPasswordChange={setPassword}
      totp={totp} onTotpChange={setTotp}
      mode={mode} onModeChange={setMode}
      loading={loading}
      error={error}
      onSubmitCredentials={async (u, p) => {
        setLoading(true); setError(null);
        const r = await fetch('/admin/api/login', { method: 'POST', body: JSON.stringify({ username: u, password: p }) });
        setLoading(false);
        if (r.ok) { const j = await r.json(); setChallengeId(j.data.challenge_id); setStep(2); }
        else if (r.status === 429) setError('rate_limited');
        else setError('invalid_credentials');
      }}
      onSubmitCode={async (kind, code) => {
        setLoading(true); setError(null);
        const endpoint = kind === 'totp' ? '/admin/api/login/totp' : '/admin/api/login/backup';
        const r = await fetch(endpoint, { method: 'POST', body: JSON.stringify({ challenge_id: challengeId, code }) });
        setLoading(false);
        if (r.ok) window.location.href = '/admin';
        else setError('invalid_code');
      }} />
  );
}
```

More examples (Dashboard, AppsList, AppDetail) — same pattern: parent owns state, hands `data` + callbacks. See [CHANGELOG](./CHANGELOG.md#020-alpha1) for full prop list per component.

## Build

```bash
cd canon_pkg
npm install
npm run build       # → dist/ (esm + .d.ts + styles.css)
npm pack            # → samosite-canon-0.1.0.tgz, then npm install ./...tgz in consumer
```

## Progressive swap workflow

Once a section is wired via canon import, you can **swap** it for a hand-rolled Tailwind version — under a pixel-diff gate vs the canon component:

```tsx
// tests/visual/parity.spec.ts
import { ExamplesSection as CanonExamples } from '@samosite/canon/landing';
import { ExamplesSection as ProdExamples } from '@/components/ExamplesSection';
// render both → screenshot each → pixelmatch with threshold 0.02
// red test = your TW version drifted, don't merge
```

This is the only way to make sure your Tailwind rewrite doesn't quietly drift away from the canon over time.

## Versioning

- `0.1.x` — pre-launch, breaking changes possible on minor bumps
- `0.2.x` — post first-prod-integration
- `1.0.0` — frozen for v1

See [CHANGELOG.md](./CHANGELOG.md).

## What's NOT in this package

- No fonts bundled (consumer loads from Google Fonts or self-hosts)
- No dark mode
- No animations beyond purely-CSS hover/focus/pulse (no Framer Motion, no scroll-triggered)
- No `design-canvas.jsx` / Babel-standalone host (those stay in the design project)
- No screenshots / Storybook (use `canon/index.html` in the design project for visual reference)

## See also

- Design project: `vitrina ui` (this canon's source)
- Handoff package: `design_handoff_samosite/` (docs that pair with this code)
- Original ТЗ: `uploads/CANON_PACKAGE_TZ.md`
