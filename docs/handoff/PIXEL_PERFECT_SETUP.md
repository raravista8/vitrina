# Pixel-Perfect Setup — Playwright + pixelmatch

> Конкретная инфраструктура для сверки прод-кода с каноном на 1440 / 768 / 390. Без этого блока handoff бесполезен: ТЗ говорит «pixel-perfect», но не объясняет как.

---

## 1. Что нужно установить

```bash
npm install -D playwright pixelmatch pngjs sharp tsx
npx playwright install chromium
```

В корень репо положить **только chromium** (не firefox/webkit) — экономия CI-времени и стабильность скриншотов.

---

## 2. Структура файлов

```
tests/visual/
├── playwright.config.ts          ← конфиг (см. §3)
├── viewports.ts                  ← 3 размера константой
├── baselines/                    ← эталоны из канона (committed в git, LFS не нужен)
│   ├── 1440/
│   │   ├── landing-hero.png
│   │   ├── landing-examples.png
│   │   └── ...
│   ├── 768/
│   └── 390/
├── diffs/                        ← .gitignore'd, сюда падают pixel-diffs при провале
├── generate-baselines.spec.ts    ← скрипт генерации эталонов из canon/index.html
├── landing.spec.ts               ← assertion-тесты по prod-сборке
├── customer.spec.ts
├── intake.spec.ts
├── admin.spec.ts
└── _utils/
    ├── compare.ts                ← pixelmatch wrapper с threshold 0.02
    └── stable.ts                 ← подавление анимаций/времени/случайных подписей
```

---

## 3. `playwright.config.ts`

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/visual',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'tests/visual/report' }]],
  use: {
    baseURL: process.env.E2E_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure',
    // отключаем сглаживание и subpixel-фоны
    deviceScaleFactor: 2,
    colorScheme: 'light',
    reducedMotion: 'reduce',
  },
  expect: {
    // используем нашу comparator (pixelmatch), а не toMatchSnapshot,
    // — toMatchSnapshot чувствителен к версии Chromium.
    timeout: 10_000,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'tablet',  use: { ...devices['Desktop Chrome'], viewport: { width: 768,  height: 1024 } } },
    { name: 'mobile',  use: { ...devices['Desktop Chrome'], viewport: { width: 390,  height: 844 } } },
  ],
});
```

---

## 4. `_utils/stable.ts` — стабилизация скриншотов

```ts
import type { Page } from '@playwright/test';

/** Замораживает время, анимации, шрифты, спиннеры. */
export async function stabilize(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      /* спиннеры → невидимы */
      [class*="spin"], [class*="Spinner"] { opacity: 0 !important; }
    `,
  });
  // ждём шрифты
  await page.evaluate(() => (document as any).fonts.ready);
  // ждём все <img> с src
  await page.evaluate(async () => {
    const imgs = Array.from(document.images);
    await Promise.all(imgs.map(img => img.complete ? Promise.resolve()
      : new Promise(res => { img.onload = img.onerror = () => res(null); })));
  });
  // даём React-рендеру осесть
  await page.waitForTimeout(150);
}
```

---

## 5. `_utils/compare.ts` — diff с порогом 2%

```ts
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

export interface CompareOpts {
  threshold?: number;        // per-pixel sensitivity, 0..1, default 0.1
  maxDiffRatio?: number;     // допустимая доля изменённых пикселей, default 0.02
}

export function assertPixelMatch(
  actualPng: Buffer,
  baselinePath: string,
  opts: CompareOpts = {},
) {
  const threshold = opts.threshold ?? 0.1;
  const maxDiff = opts.maxDiffRatio ?? 0.02;

  if (!existsSync(baselinePath)) {
    mkdirSync(dirname(baselinePath), { recursive: true });
    writeFileSync(baselinePath, actualPng);
    throw new Error(`No baseline at ${baselinePath} — created. Commit and re-run.`);
  }
  const baseline = PNG.sync.read(readFileSync(baselinePath));
  const actual = PNG.sync.read(actualPng);
  if (baseline.width !== actual.width || baseline.height !== actual.height) {
    throw new Error(`Size mismatch: baseline ${baseline.width}×${baseline.height} vs actual ${actual.width}×${actual.height}`);
  }
  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const diffPx = pixelmatch(baseline.data, actual.data, diff.data,
    baseline.width, baseline.height, { threshold });
  const ratio = diffPx / (baseline.width * baseline.height);
  if (ratio > maxDiff) {
    const diffPath = baselinePath.replace('/baselines/', '/diffs/').replace(/\.png$/, '.diff.png');
    mkdirSync(dirname(diffPath), { recursive: true });
    writeFileSync(diffPath, PNG.sync.write(diff));
    writeFileSync(diffPath.replace('.diff.png', '.actual.png'), actualPng);
    throw new Error(`Pixel diff ${(ratio*100).toFixed(2)}% > ${(maxDiff*100).toFixed(0)}% — see ${diffPath}`);
  }
}
```

---

## 6. Генерация baselines из канона

`canon/index.html` запускается через `npx serve design_handoff_samosite/canon -p 4999` (или любой статический сервер). Файл `generate-baselines.spec.ts` ходит по всем артбордам и сохраняет каждый как PNG в `baselines/<vp>/...`.

```ts
// tests/visual/generate-baselines.spec.ts
import { test } from '@playwright/test';
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { stabilize } from './_utils/stable';

const CANON_URL = process.env.CANON_URL ?? 'http://localhost:4999';

// Каждый артборд имеет id в DesignCanvas — см. canon/index.html `<DCArtboard id="..."/>`.
const ARTBOARDS = [
  // landing
  { name: 'landing-full',          viewport: 1440, selector: '#dc-artboard-s1-d' },
  { name: 'landing-full',          viewport: 390,  selector: '#dc-artboard-s1-m' },
  // source detection
  { name: 'source-states',         viewport: 1440, selector: '#dc-artboard-s2-d' },
  { name: 'source-states',         viewport: 390,  selector: '#dc-artboard-s2-m' },
  // submit modal
  { name: 'submit-step1-tg',       viewport: 1440, selector: '#dc-artboard-s3-step1' },
  { name: 'submit-step1-ig',       viewport: 1440, selector: '#dc-artboard-s3-step1-ig' },
  { name: 'submit-step2-tg',       viewport: 1440, selector: '#dc-artboard-s3-step2-tg' },
  { name: 'submit-step2-phone',    viewport: 1440, selector: '#dc-artboard-s3-step2-phone' },
  // ... остальные см. canon/index.html
];

for (const a of ARTBOARDS) {
  test(`baseline · ${a.name} @ ${a.viewport}`, async ({ page }) => {
    await page.setViewportSize({ width: a.viewport, height: 900 });
    await page.goto(CANON_URL, { waitUntil: 'networkidle' });
    // сбрасываем pan/zoom DesignCanvas, чтобы артборд был в 100%
    await page.evaluate(() => (window as any).__dc_reset?.());
    await stabilize(page);
    const el = await page.locator(a.selector);
    const png = await el.screenshot({ animations: 'disabled' });
    const out = `tests/visual/baselines/${a.viewport}/${a.name}.png`;
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, png);
  });
}
```

> ⚠️ `__dc_reset` нужно добавить в `canon/design-canvas.jsx` — глобальный хук, который ставит pan=(0,0) и zoom=1. Без него скриншот зависит от текущего состояния canvas.

Запуск (одноразово, при апдейте канона):
```bash
npx serve design_handoff_samosite/canon -p 4999 &
npx playwright test generate-baselines --project=desktop --project=tablet --project=mobile
git add tests/visual/baselines && git commit -m "chore(visual): regenerate baselines from canon"
```

---

## 7. Assertion-тесты на прод-сборку

`tests/visual/landing.spec.ts`:

```ts
import { test } from '@playwright/test';
import { assertPixelMatch } from './_utils/compare';
import { stabilize } from './_utils/stable';

const SECTIONS = [
  { id: 'hero',         selector: '[data-section="hero"]' },
  { id: 'examples',     selector: '[data-section="examples"]' },
  { id: 'story',        selector: '[data-section="story"]' },
  { id: 'platforms',    selector: '[data-section="platforms"]' },
  { id: 'big-features', selector: '[data-section="big-features"]' },
  { id: 'ownership',    selector: '[data-section="ownership"]' },
  { id: 'pricing',      selector: '[data-section="pricing"]' },
  { id: 'faq',          selector: '[data-section="faq"]' },
  { id: 'free-month',   selector: '[data-section="free-month"]' },
];

for (const s of SECTIONS) {
  test(`landing · ${s.id}`, async ({ page }, info) => {
    await page.goto('/');
    await stabilize(page);
    const png = await page.locator(s.selector).screenshot({ animations: 'disabled' });
    const vp = info.project.use.viewport!.width;
    assertPixelMatch(png, `tests/visual/baselines/${vp}/landing-${s.id}.png`);
  });
}
```

> 🔑 Прод-код должен расставить `data-section="..."` на каждой секции лендинга. То же — на customer-site, admin-экранах. Без data-атрибутов селекторы хрупкие.

---

## 8. CI — GitHub Actions

`.github/workflows/visual.yml`:

```yaml
name: visual-regression
on: [pull_request]

jobs:
  visual:
    runs-on: ubuntu-22.04
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: 'npm' }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npm run build && npm run start &
      - run: npx wait-on http://localhost:3000
      - run: npx playwright test --project=desktop --project=tablet --project=mobile
      - if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: visual-diffs
          path: tests/visual/diffs/
          retention-days: 14
```

---

## 9. Шрифты — критично

`Onest` и `JetBrains Mono` должны загружаться **до** скриншота. Варианты:

- **Self-host (рекомендуется для тестов):** скачать .woff2 в `public/fonts/`, `@font-face` с `font-display: block` в тестовом режиме (через env-flag). Иначе CI без интернета даст fallback-шрифт и diff будет 100%.
- **Google Fonts preload:** `<link rel="preload" href="..." as="font" crossorigin>` + `await document.fonts.ready` в `stabilize()`.

Канон тоже должен использовать тот же путь — иначе baselines и actual разойдутся даже при идентичной разметке.

---

## 10. Что считать «зелёным»

- `threshold: 0.1` (pixel-уровень) + `maxDiffRatio: 0.02` (доля пикселей) — рабочее значение для anti-aliasing на 2x.
- Если diff < 0.5% — это шум, мержить можно.
- Если diff 0.5–2% — посмотреть глазами на `diffs/*.diff.png`, чаще всего это subpixel-сдвиг на 1px → починить через округление в CSS (`transform: translateZ(0)` помогает).
- Если diff > 2% — провал, фиксить.

---

## 11. Чек-лист первого запуска

- [ ] `npm install -D playwright pixelmatch pngjs`
- [ ] Создан `tests/visual/` со структурой из §2
- [ ] В прод-коде расставлены `data-section`, `data-screen`, `data-modal` атрибуты по карте из `SCREEN_INDEX.md`
- [ ] Шрифты Onest/JetBrains Mono подключены идентично в каноне и проде
- [ ] `canon/design-canvas.jsx` дополнен `window.__dc_reset` — сброс pan/zoom
- [ ] Сгенерированы baselines на 3 viewports
- [ ] Прогнан один тест на проде → зелёный
- [ ] Подключен в CI на PR
