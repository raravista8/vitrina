# @samosite/canon

> Canonical UI for **Самосайт** (samosite.online). Single source of truth for visual design — same React render that the dev canvas uses, packaged as a real npm module.

**Current version: `0.3.0`** — **BREAKING.** Intake flow rewrite: link/photo branches with mode-switcher, Step 2 photo (description + city + customer_contact + opt. text_files), inline Confirmation. `S5_Confirmation` / `S3_Step3_TgBot` / `S4_TGBotInvite` removed; Instagram `ok-instagram` tier removed; `CaptchaNotice` no longer carries `· невидимо`. See [CHANGELOG](./CHANGELOG.md#030--intake-flow-rewrite-breaking--2026-05-24) for the full migration guide and backend checklist for hand-rolled consumers.

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
| `@samosite/canon/intake` | `SubmitModal`, `Confirmation`, `PhotoDrawer` (back-compat) + step components `S3_Step1_Link`, `S3_Step1_Photo`, `S3_Step2_PhotoDesc`, `S3_StepContact`, `S3_FinalConfirm` + constants `SOURCE_LIB`, `PHOTO_LIMITS` |
| `@samosite/canon/customer` | `CustomerSite`, `LeadForm`, `FeedbackPage` + `S7_SchemeSwatches` |
| `@samosite/canon/source` | `SourceDetectionBadge` (desktop catalog) + `S2_Desktop`, `S2_Mobile` |
| `@samosite/canon/admin-demo` | `ClientAdminDemo` — `/admin-demo` page |
| `@samosite/canon/admin-core` | **Interactive (0.2.0):** `AdminLogin`, `AdminDashboard`, `AppsList`, `AppDetail`, `AdminChrome`, `StatusPill`, `StatTile` + shared design surfaces `SkeletonBlock`, `EmptyState`, `ErrorBlock`, `RateLimitCountdown`, `FilterChip`, `TrendChart` + all prop types |
| `@samosite/canon/admin-ops` | **Interactive (0.2.0):** `SitesList`, `SiteDetail`, `Leads` (включая decrypt modal), `Waitlist`, `FeedbackInbox`, `Settings` + all prop types |
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

## SubmitModal — 2-branch flow (0.3.0)

Single component, fully controlled. Consumer owns `mode` + `step` + per-step state, hands them in via props and provides `on*Change` callbacks. The modal renders the right step for `(mode, step)` and emits navigation events you wire to your local state machine.

```tsx
'use client';
import { useState } from 'react';
import { SubmitModal, SOURCE_LIB } from '@samosite/canon/intake';

type Mode = 'link' | 'photo';
type Channel = 'telegram' | 'phone' | 'email' | 'max';
type CustomerContactType = 'phone' | 'telegram';

export function SubmitFlow() {
  // mode + step
  const [mode, setMode] = useState<Mode>('link');
  const [step, setStep] = useState<number>(1);

  // link branch
  const [url, setUrl] = useState('');
  const [source, setSource] = useState<keyof typeof SOURCE_LIB | null>(null);
  const [counts, setCounts] = useState<string | null>(null);

  // photo branch
  const [files, setFiles] = useState<File[]>([]);
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [customerContactType, setCustomerContactType] = useState<CustomerContactType>('phone');
  const [textFiles, setTextFiles] = useState<File[]>([]);

  // contact step
  const [channel, setChannel] = useState<Channel>('telegram');
  const [contact, setContact] = useState('');
  const [consent, setConsent] = useState(true);

  // submission
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setSubmitting(true);
    const body = new FormData();
    body.append('mode', mode);
    body.append('channel', channel);
    body.append('contact', contact);
    body.append('consent', String(consent));
    if (mode === 'link') {
      body.append('url', url);
    } else {
      files.forEach(f => body.append('files[]', f));
      body.append('description', description);
      body.append('city', city);
      body.append('customer_contact', customerContact);
      body.append('customer_contact_type', customerContactType);
      textFiles.forEach(f => body.append('text_files[]', f));
    }
    await fetch('/api/submit-application', { method: 'POST', body });
    setSubmitting(false);
    setStep(mode === 'photo' ? 4 : 3); // advance to confirm
  }

  return (
    <SubmitModal
      mode={mode}
      step={step}
      onModeChange={setMode}

      // link
      url={url} onUrlChange={setUrl}
      source={source} counts={counts}
      onCorrect={() => setSource(null)}

      // photo
      files={files}
      onPickPhoto={() => pickFiles().then(setFiles)}
      onRemovePhoto={(i) => setFiles(prev => prev.filter((_, k) => k !== i))}

      // photo step 2
      description={description} onDescriptionChange={setDescription}
      city={city} onCityChange={setCity}
      customerContact={customerContact} onCustomerContactChange={setCustomerContact}
      customerContactType={customerContactType} onCustomerContactTypeChange={setCustomerContactType}
      textFiles={textFiles}
      onPickTextFile={() => pickFiles({ types: 'text' }).then(f => setTextFiles(prev => [...prev, ...f]))}
      onRemoveTextFile={(i) => setTextFiles(prev => prev.filter((_, k) => k !== i))}

      // contact
      channel={channel} onChannelChange={setChannel}
      contact={contact} onContactChange={setContact}
      consent={consent} onConsentChange={setConsent}

      // navigation
      onContinue={() => setStep(s => s + 1)}
      onBack={() => setStep(s => Math.max(1, s - 1))}
      onSubmit={submit}
      onClose={() => setStep(1) /* or close handler */}
    />
  );
}
```

### Opening from the Hero

The Hero pill emits a synthetic click on the photo-link companion when the user wants the photo flow. Wire both entry points the same way — they only differ in the initial `mode`:

```tsx
function HeroWithModal() {
  const [open, setOpen] = useState(false);
  const [initialMode, setInitialMode] = useState<Mode>('link');

  // From the input + "Сделать Самосайт" CTA — defaults to link with current url.
  function openLink(urlSeed: string) {
    setInitialMode('link');
    // …seed url state in your store…
    setOpen(true);
  }

  // From the "или загрузите фото…" link directly under the input pill.
  function openPhoto() {
    setInitialMode('photo');
    setOpen(true);
  }

  return open ? <SubmitFlow /* …with initialMode wiring… */ /> : <Hero onLinkSubmit={openLink} onPhotoUpload={openPhoto} />;
}
```

### Backend contract

`POST /api/submit-application` accepts both branches in one endpoint:

| Field | Branch | Required | Notes |
|---|---|---|---|
| `mode` | both | yes | `'link' \| 'photo'` |
| `url` | link | yes | URL string, server-side `detect_source()` for analytics |
| `files[]` | photo | yes (5..60) | JPEG / PNG / WebP / HEIC, ≤15 MB each, ≤200 MB total |
| `description` | photo | yes (≥30 chars) | wrap in `<user_content>` for LLM prompt |
| `city` | photo | yes | TEXT |
| `customer_contact` | photo | yes | **public** — rendered on customer site CTA |
| `customer_contact_type` | photo | yes | `'phone' \| 'telegram'` |
| `text_files[]` | photo | no (0..10) | PDF / DOCX / TXT / RTF; magic-byte validated |
| `channel` | both | yes | `'telegram' \| 'phone' \| 'email' \| 'max'` |
| `contact` | both | yes | **private** — notify channel for ops |
| `consent` | both | yes | bool; copy must cover BOTH `contact` and `customer_contact` purposes |

Endpoints removed in 0.3.0 — delete them server-side:

- `GET /api/tg-bot-personal-status`
- `POST /api/submit-application/finalize-via-email`
- (verify) `GET /api/tg-bot-status?app_id=…` if only personal-bot

See [CHANGELOG `0.3.0`](./CHANGELOG.md#030--intake-flow-rewrite-breaking--2026-05-24) for the full backend + security checklist.

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
