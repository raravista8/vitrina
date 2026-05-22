# Visual regression — landing canon

Pixel-perfect (≤2 % diff) comparison of every landing section against
canon baselines at three viewports.

## Quick start

```bash
# from repo root
cd landing
npm install
npx playwright install --with-deps chromium   # one-time

# in another terminal — keep this running:
npm run start    # serves prod build on :3000 (run `npm run build` first)

# then in your dev terminal:
npm run test:visual                            # spec runs against :3000
```

## Files

| Path                                                  | What                                                                                  |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `landing/tests/visual/landing.spec.ts`                | Spec — one test per (section × viewport), threshold ≤2 %                              |
| `landing/tests/visual/utils/sections.ts`              | Section list (10 entries) + selectors + viewport table                                |
| `landing/tests/visual/utils/diff.ts`                  | `pixelmatch` wrapper — refuses dimension drift, writes diff PNGs                      |
| `landing/tests/visual/baselines/`                     | 30 committed PNG baselines (10 sections × 3 viewports)                                |
| `landing/tests/visual/canon-source/`                  | Canon prototype mirror (488 KB) — used only by the regen script                       |
| `landing/tests/visual/canon-source/_visual-host.html` | Wrapper that picks the canon variant (`?variant=mobile`) and tags sections post-mount |
| `landing/playwright.config.ts`                        | 3 projects (chromium-desktop/tablet/mobile), animations off                           |
| `infra/scripts/generate-canon-baselines.sh`           | One-shot baseline regenerator (spawns static server + Playwright)                     |
| `landing/tests/visual/generate-baselines.ts`          | Inner half of the regenerator — drives Playwright                                     |
| `.github/workflows/visual-regression.yml`             | CI job (PR + push to main, paths-filtered)                                            |

## When a test fails on your branch

1. Re-run locally: `npm run test:visual`.
2. Open `landing/tests/visual/__diff/<section>-<viewport>.diff.png` — red
   pixels are the regression.
3. Decide:
   - **Bug in prod.** Fix it; rerun the test until green.
   - **Intentional design change** (canon updated, copy refresh, etc.).
     Regenerate baselines:
     ```bash
     npm run test:visual:update      # rewrites tests/visual/baselines/*.png
     git status                       # eyeball the PNG churn
     git add tests/visual/baselines/
     ```
     Then commit alongside the code change.

## Why ≤2 %, not zero

Onest font antialiasing flips ~50–200 sub-pixel values across runs on
the same machine, more across CI vs local. Pixelmatch's per-pixel
`threshold: 0.1` already absorbs that noise; the 2 % budget on top
catches "section moved 5 px" or "color drifted" without flagging
font-renderer noise.

## CI behavior

The job runs on PRs that touch `landing/` (paths filter in the YAML).
On failure it uploads:

- `landing/tests/visual/__diff/` — per-section diff PNGs
- `landing/playwright-report/` — full HTML report with screenshots

Both live under `visual-diff-<sha>` artifact, 7-day retention.

## Known gaps (kept out of scope for Phase A)

- Cross-browser baselines (Firefox/Safari). Single Chromium project today.
- Admin screens (`/admin/*`) — Phase G. Add to `sections.ts` when porting.
- Customer site (`*.samosite.online`, Jinja2). Separate spec when needed.
- Intentional-difference allowlist (e.g. tolerate sparkline jitter in
  Analytics). Today the budget is uniform 2 %.
