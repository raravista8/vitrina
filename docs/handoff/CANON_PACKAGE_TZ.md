# ТЗ — `@samosite/canon` npm-пакет

> **Адресат:** команда Claude Design (авторы канона).
> **Заказчик:** vitrina / самосайт продакшен.
> **Цель:** убрать слой ручной транскрипции «канон-JSX → прод-Tailwind» и сделать канон **источником истины не только визуально, но и в коде**.

---

## 1. Зачем

Текущий handoff package (`design_handoff_samosite/`) — это **визуальные референсы** на Babel-standalone HTML+JSX. Я (Claude Code, vitrina-side) использую их так:

```
canon JSX → читаю → переношу значения в Tailwind classes → пишу TSX
```

В этом цикле я ошибаюсь на 5–15 % от значений. На 19 экранов × 50–200 значений на экран = сотни мелких промахов, которые видны на проде как «кривовато». **Pixel-diff в CI не успевает за этим** (baselines для 9 секций × 3 viewport = 27 ячеек, я успеваю качественно сверить ~3).

После каждого вашего рефреша канона drift накапливается ещё больше — потому что я не вижу что именно изменилось.

**Если канон — это npm-пакет**, я делаю:

```tsx
import { ExamplesSection } from '@samosite/canon';

export default function Page() {
  return <ExamplesSection />;
}
```

И визуально это **гарантированно 1:1 с каноном** — тот же React-рендер, те же inline-стили, те же значения. Дальше я делаю per-section swap на собственную Tailwind-версию, но **только** под pixel-diff гейтом, который сравнивает с импортированным компонентом канона.

---

## 2. Scope v0.1

19 экранов из `SCREEN_INDEX.md` + примитивы + токены. Конкретно:

### 2.1 Экраны (компоненты-default-export)

| Файл сейчас | Экспорт в пакете | Из какого канон-файла |
|---|---|---|
| `canon/landing-samosite.jsx::SamosaytLanding_Desktop/Mobile` | `Landing` (комбинирует все секции) | landing-samosite.jsx |
| `canon/landing-samosite.jsx::HeroBlock` | `HeroSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::ExamplesSection` | `ExamplesSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::StorySection` | `StorySection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::PlatformsSection` | `PlatformsSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::BigFeaturesSection` | `BigFeaturesSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::OwnershipSection` | `OwnershipSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::AnalyticsSection` | `AnalyticsSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::PricingSection` | `PricingSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::FaqSection` | `FaqSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::FreeMonthSection` | `FreeMonthSection` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::StickyHeader` | `StickyHeader` | landing-samosite.jsx |
| `canon/landing-samosite.jsx::Footer` | `Footer` | landing-samosite.jsx |
| `canon/screens-intake.jsx::S3_SubmitModal` | `SubmitModal` | screens-intake.jsx |
| `canon/screens-intake.jsx::S5_Confirmation` | `Confirmation` | screens-intake.jsx |
| `canon/screens-intake.jsx::S6_PhotoDrawer` | `PhotoDrawer` | screens-intake.jsx |
| `canon/screens-intake.jsx::S8_LeadFormConfirm` | `LeadForm` | screens-intake.jsx |
| `canon/screens-intake.jsx::S9_FeedbackPage` | `FeedbackPage` | screens-intake.jsx |
| `canon/screen-02-source.jsx::S2_Desktop/Mobile` | `SourceDetectionBadge` | screen-02-source.jsx |
| `canon/screens-customer.jsx::S7_CustomerSite` | `CustomerSite` | screens-customer.jsx |
| `canon/screens-client-admin-demo.jsx::ClientAdminDemo` | `ClientAdminDemo` | screens-client-admin-demo.jsx |
| `canon/screens-admin-core.jsx::S10..S13` | `AdminLogin`, `AdminDashboard`, `AppsList`, `AppDetail` | screens-admin-core.jsx |
| `canon/screens-admin-ops.jsx::S14..S19` | `SitesList`, `SiteDetail`, `Leads`, `Waitlist`, `FeedbackInbox`, `Settings` | screens-admin-ops.jsx |

### 2.2 Примитивы

```ts
export {
  SectionTitle,       // h2 — 30/52 px, weight 700, tracking -0.03em, leading 1.1/1.05
  SectionSub,         // p — 16/19 px, leading 1.45, max-w 680
  Btn,                // основная кнопка (вариант primary / ghost / iconRight)
  Mono,               // span/div с JetBrains Mono
  IconArrow,          // → SVG
  IconCheck,          // ✓ SVG
  Logo,               // BrandMark с «С» Onest 800
  FeatureGlyph,       // 8 SVG-иконок BigFeatures (sparkles/refresh/star/...)
  StoryStepColorful,  // карточка зигзаг-шага со стикером «ШАГ N»
  PlatformLogo,       // box-логотип платформы (Я.Карты, TG, IG...)
  PlatformCard,       // bento-tile секции Platforms
  FeatureCard,        // карточка BigFeatures (8 штук, p 22/28, gap 14, decorative 01-08)
  SiteCard,           // preview customer-сайта в Examples (3 штуки)
} from '@samosite/canon/primitives';
```

### 2.3 Токены

```ts
// @samosite/canon/tokens
export const tokens = {
  color: {
    accent: 'oklch(0.605 0.155 35)',
    accentSoft: 'oklch(0.92 0.045 40)',
    accentInk: 'oklch(0.42 0.14 35)',
    accentHover: 'oklch(0.56 0.16 32)',
    ink: 'oklch(0.215 0.018 60)',
    inkSoft: 'oklch(0.42 0.012 60)',
    inkFaint: 'oklch(0.58 0.008 60)',
    line: 'oklch(0.88 0.008 60)',
    lineSoft: 'oklch(0.93 0.006 60)',
    bg: 'oklch(0.972 0.012 80)',
    bgSoft: 'oklch(0.945 0.014 75)',
    white: '#ffffff',
    success: 'oklch(0.58 0.13 145)',
    successSoft: 'oklch(0.94 0.05 145)',
  },
  font: {
    sans: 'Onest, ui-sans-serif, system-ui, sans-serif',
    mono: 'JetBrains Mono, ui-monospace, monospace',
  },
  shadow: {
    card: '0 6px 24px -8px rgba(40,30,20,0.10), 0 1px 0 rgba(40,30,20,0.04)',
    pop:  '0 14px 32px -10px rgba(40,30,20,0.20)',
    hard: '6px 6px 0 0 var(--ink, oklch(0.215 0.018 60))',
  },
  radius: {
    sm: 10, md: 14, lg: 18, xl: 22, '2xl': 28, full: 999,
  },
} as const;

export type Tokens = typeof tokens;
```

### 2.4 Tailwind preset (опционально, но крайне желательно)

```ts
// @samosite/canon/tailwind-preset
import { tokens } from './tokens';
export default {
  theme: {
    extend: {
      colors: {
        accent: tokens.color.accent,
        'accent-soft': tokens.color.accentSoft,
        // ...все остальные через kebab-case
      },
      fontFamily: {
        sans: tokens.font.sans.split(','),
        mono: tokens.font.mono.split(','),
      },
      boxShadow: {
        card: tokens.shadow.card,
        pop: tokens.shadow.pop,
      },
    },
  },
};
```

Это позволит мне сделать в `tailwind.config.ts`:

```ts
import canonPreset from '@samosite/canon/tailwind-preset';
export default { presets: [canonPreset], /* ... */ };
```

И мои собственные Tailwind-классы для swap'нутых секций используют **те же токены**, что канон. Drift = 0.

---

## 3. Структура пакета

```
@samosite/canon/
├── package.json
├── README.md
├── tsconfig.json
├── src/
│   ├── index.ts                    ← re-export всего
│   ├── tokens.ts
│   ├── primitives/
│   │   ├── index.ts
│   │   ├── SectionTitle.tsx
│   │   ├── SectionSub.tsx
│   │   ├── Btn.tsx
│   │   ├── Mono.tsx
│   │   ├── IconArrow.tsx
│   │   ├── Logo.tsx
│   │   ├── FeatureGlyph.tsx
│   │   ├── StoryStepColorful.tsx
│   │   ├── PlatformLogo.tsx
│   │   ├── PlatformCard.tsx
│   │   ├── FeatureCard.tsx
│   │   └── SiteCard.tsx
│   ├── landing/
│   │   ├── index.ts
│   │   ├── Landing.tsx              ← композиция всех секций
│   │   ├── HeroSection.tsx
│   │   ├── ExamplesSection.tsx
│   │   ├── StorySection.tsx
│   │   ├── PlatformsSection.tsx
│   │   ├── BigFeaturesSection.tsx
│   │   ├── OwnershipSection.tsx
│   │   ├── AnalyticsSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── FaqSection.tsx
│   │   ├── FreeMonthSection.tsx
│   │   ├── StickyHeader.tsx
│   │   └── Footer.tsx
│   ├── intake/
│   │   ├── SubmitModal.tsx
│   │   ├── Confirmation.tsx
│   │   ├── PhotoDrawer.tsx
│   │   ├── LeadForm.tsx
│   │   ├── FeedbackPage.tsx
│   │   └── SourceDetectionBadge.tsx
│   ├── customer/
│   │   └── CustomerSite.tsx
│   ├── admin/
│   │   ├── ClientAdminDemo.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AppsList.tsx
│   │   ├── AppDetail.tsx
│   │   ├── SitesList.tsx
│   │   ├── SiteDetail.tsx
│   │   ├── Leads.tsx
│   │   ├── Waitlist.tsx
│   │   ├── FeedbackInbox.tsx
│   │   └── Settings.tsx
│   └── tailwind-preset.ts
└── dist/                            ← bundled output (ESM + d.ts)
    ├── index.js
    ├── index.d.ts
    ├── tailwind-preset.js
    └── …
```

---

## 4. Технические требования

### 4.1 Stack

- **TypeScript 5+** (strict mode)
- **React 19** (peer dependency, не bundled)
- **Build:** `tsup` или `unbuild` → ESM + .d.ts (CommonJS не нужен — vitrina на Next 16 / ESM)
- **Inline styles остаются** как в каноне (`style={{padding: 24}}`) — это и есть точная спецификация. **НЕ нужно** конвертировать в Tailwind/CSS-in-JS на стороне пакета
- **Без runtime-зависимостей** кроме `react` + `react-dom` (peer)
- **Bundle size:** не критично (это не код для prod-сайта, это спецификация), но цель < 200 KB unminified

### 4.2 package.json

```json
{
  "name": "@samosite/canon",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": { "import": "./dist/index.js", "types": "./dist/index.d.ts" },
    "./tokens": { "import": "./dist/tokens.js", "types": "./dist/tokens.d.ts" },
    "./primitives": { "import": "./dist/primitives/index.js", "types": "./dist/primitives/index.d.ts" },
    "./landing": { "import": "./dist/landing/index.js", "types": "./dist/landing/index.d.ts" },
    "./intake": { "import": "./dist/intake/index.js", "types": "./dist/intake/index.d.ts" },
    "./customer": { "import": "./dist/customer/index.js", "types": "./dist/customer/index.d.ts" },
    "./admin": { "import": "./dist/admin/index.js", "types": "./dist/admin/index.d.ts" },
    "./tailwind-preset": { "import": "./dist/tailwind-preset.js" }
  },
  "peerDependencies": {
    "react": ">=19.0.0",
    "react-dom": ">=19.0.0"
  },
  "files": ["dist", "README.md"]
}
```

### 4.3 Что **НЕ** должно быть в пакете

- `design-canvas.jsx` (это dev-tool для канон-прототипа, не часть API)
- `_visual-host.html`, `index.html`, `landing.html`, `client-admin-demo.html` (тоже dev-tooling)
- Babel-standalone (вообще нигде)
- `window.*` глобалы (`window.__dc_reset`, etc.)
- Шрифты (Onest/JetBrains Mono — пусть consumer подключает сам, документация в README)

### 4.4 Шрифты

Документировать в README, что для корректного рендера нужно подключить:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Onest:wght@400;500;600;700;800&display=swap">
```

Альтернатива: экспортировать `<CanonStyles />` компонент, который вставляет нужный `<link>` через next/head.

---

## 5. Версионирование

```
0.1.x  — pre-launch, breaking changes OK без major bump
0.2.x  — после первой итерации на проде, breaking changes OK с patch notes
1.0.0  — после launch + freeze дизайна (если случится)
```

Каждый релиз — git tag + GitHub release + CHANGELOG.md. Breaking changes объявляются в CHANGELOG явно, чтобы я знал когда `npm update` опасно.

---

## 6. Как vitrina это потребляет

### Сценарий 1 — Drop-in замена (день 1)

```tsx
// landing/app/page.tsx — было
import { Hero } from '@/components/Hero';
import { Examples } from '@/components/Examples';
// ...

// landing/app/page.tsx — стало
import {
  HeroSection,
  ExamplesSection,
  StorySection,
  PlatformsSection,
  BigFeaturesSection,
  OwnershipSection,
  AnalyticsSection,
  PricingSection,
  FaqSection,
  FreeMonthSection,
  StickyHeader,
  Footer,
} from '@samosite/canon/landing';

export default function Page() {
  return (
    <>
      <StickyHeader />
      <HeroSection />
      <ExamplesSection />
      <StorySection />
      <PlatformsSection />
      <BigFeaturesSection />
      <OwnershipSection />
      <AnalyticsSection />
      <PricingSection />
      <FaqSection />
      <FreeMonthSection />
      <Footer />
    </>
  );
}
```

**Результат:** прод выглядит **байт-в-байт как canon/index.html**. Никакой моей транскрипции. Никакого drift.

### Сценарий 2 — Постепенный swap (недели 2-4)

Я по одной секции переписываю в Tailwind (потому что:
1. Tailwind = меньший bundle на проде
2. Кастомизация под пользователя — масштаб шрифтов, тёмная тема, A/B copy
3. Интерактив с backend API), и **только** под pixel-diff гейтом против исходного canon-компонента:

```tsx
// tests/visual/parity.spec.ts
import { ExamplesSection as CanonExamples } from '@samosite/canon/landing';
import { ExamplesSection as ProdExamples } from '@/components/Examples';
// render both side-by-side, screenshot, compare, ≤2% diff
```

Если мой Tailwind-вариант драйфтит — тест красный, я не мержу.

### Сценарий 3 — Customer-site (после день 1)

`@samosite/canon/customer` экспортирует `CustomerSite` как pure React component. Сейчас прод использует Jinja2 шаблон, но можно:
- Либо подключить React-render для customer-сайтов
- Либо сгенерить HTML из React-компонента (`renderToString`) при publish и склеить с Jinja для динамики

Это переход на тот же канон-источник для customer тоже.

---

## 7. Acceptance criteria

- [ ] `npm install @samosite/canon` работает в vitrina (Next.js 16, React 19)
- [ ] `import { HeroSection } from '@samosite/canon/landing'` рендерит идентично `canon/landing.html#dc-artboard-s1-d`
- [ ] Все 19 экранов доступны через path-exports
- [ ] `import canonPreset from '@samosite/canon/tailwind-preset'` интегрируется в `tailwind.config.ts` без конфликтов
- [ ] TypeScript types корректны (нет `any` в публичном API)
- [ ] Bundle ESM-only, без CommonJS
- [ ] Bundle размер < 200 KB unminified
- [ ] README документирует подключение шрифтов
- [ ] CHANGELOG ведётся с первого релиза
- [ ] Pixel-diff на проде против импортированного канон-компонента = **0 %** при первом drop-in (потому что это **тот же** React-рендер)

---

## 8. Out of scope (НЕ нужно делать)

- ❌ Storybook, Ladle, docs site (мы используем `canon/index.html` для preview как сейчас)
- ❌ Анимации (канон сейчас без них, прод тоже)
- ❌ Темизация (свет/тёмная) — позже
- ❌ i18n — все строки на русском, single locale
- ❌ a11y-аудит (это уже моя задача после интеграции)
- ❌ Скрипты для миграции с inline-styles на Tailwind (это **я делаю** в vitrina, см. сценарий 2)
- ❌ Поддержка React < 19

---

## 9. Сроки и собственные оценки

Я (vitrina-side, Claude Code) предполагаю что для команды Claude Design:

- **Базовая упаковка (без primitives/admin):** 1-2 дня
  - Только landing экраны + tokens. Дроп-ин для прод-лендинга.
- **Полный scope (19 экранов + primitives + tailwind-preset):** 3-5 дней
- **Поддержка после релиза:** ~2-4 часа на каждый canon-refresh

На моей стороне после релиза:

- **Drop-in замена prod лендинга:** 0.5 дня
- **Postaroe pixel-diff гейт между моими TW-версиями и канон-исходником:** 0.5 дня
- **Per-section swap (когда нужна кастомизация):** ~1-2 часа на секцию

---

## 10. Контакты

Вопросы по интеграции / неоднозначностям в этом ТЗ —  через тот же канал, что и handoff packages. Я готов оперативно отвечать в любом виде (документ, GitHub issue, MR-review).

---

**TL;DR для дизайн-команды:** упакуйте текущий канон как нормальный React+TS npm-пакет (peer-dep React 19, ESM-only, inline-styles как есть, экспорты по экранам + примитивам + токенам). Это полностью убирает мой ручной transcription-layer и даёт реальный single source of truth.

Если ОК — стартуйте с `landing/` секций как MVP, остальное (intake, customer, admin) могут идти второй итерацией.
