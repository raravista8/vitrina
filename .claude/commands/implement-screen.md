---
description: Implement a single screen from canon with mandatory pixel-diff verification
---

You are implementing screen `$ARGUMENTS` from the canon handoff package. Follow this protocol exactly — deviating from it is what causes the "kriva verstka" problem.

## Step 1 — Resolve the three anchors

Before writing any code, read in order:

1. `docs/handoff/SCREEN_INDEX.md` — find the row for `$ARGUMENTS`. Get the canon source path and the prod destination.
2. `docs/handoff/VISUAL_COVERAGE.md` — check current status (🔵 canon-import / 🟢 pixel-audited / 🟡 smoke-only / 🔴 no baseline / ⚫ not built). Different statuses mean different starting points.
3. `landing/CLAUDE.md` — re-read "UI implementation protocol" and "Pixel-perfect testing protocol".
4. The relevant spec from `docs/handoff/specs/` (01_landing / 02_customer / 03_session / 04_typography / 05_admin / 06_public_screens).
5. The canon source file referenced in SCREEN_INDEX.md.

After reading, restate to me in 3-5 lines:
- **Source**: which canon entry exports this screen (or which `canon-source/*.jsx` is the reference)
- **Destination**: which prod file you'll edit
- **Current status**: from VISUAL_COVERAGE — what's already done, what's missing
- **Acceptance**: baselines that must pass at which viewports + any `data-section` selectors needed

Wait for my approval before Step 2.

## Step 2 — Plan, don't code

Output a step-by-step plan with verification per step:

```
1. [step] → verify: [check]
2. [step] → verify: [check]
3. [step] → verify: [check]
```

Specifically:
- If this replaces an existing component: include the migration protocol from `landing/CLAUDE.md` (grep usages → swap import → @deprecate old → verify in DOM)
- If this adds new: include the placement decision (new file in `landing/components/`? extend existing?)
- Include any new `data-section` attributes needed for visual specs
- Final step is ALWAYS `npm run test:visual -- -g "$ARGUMENTS"` and confirm `pct ≤ 0.02` at all 4 viewports

Wait for my approval before Step 3.

## Step 3 — Implement

Apply changes from the plan. Stay surgical: every changed line traces to this screen. Do NOT improve adjacent code, refactor neighbors, or "while I'm here" anything.

If you discover the spec / canon / prod relationship is more complex than Step 1 captured, STOP and revise the plan. Do not silently expand scope.

## Step 4 — Verify on prod route

Use the Playwright MCP (`playwright` server):
1. Run `npm run dev` if not running (or use existing dev server)
2. Navigate to the route containing `$ARGUMENTS`
3. Confirm `[data-section="<id>"]` exists in DOM where expected
4. Take a screenshot for the PR

If the selector doesn't exist or the component isn't visible on the route, STOP — the migration didn't complete. Diagnose and fix before continuing.

## Step 5 — Pixel-diff gate

Run from `landing/`:

```
npm run test:visual -- -g "$ARGUMENTS"
```

This runs the spec across all 4 viewports (desktop 1440, tablet 768, mobile 390, mobile-narrow 375).

**If it fails:**
1. Open the diff PNGs: `landing/tests/visual/__diff/<screen>-<viewport>.png`
2. Cross-reference against the symptom table in `landing/CLAUDE.md` § "Why baselines fail interpretation"
3. Identify the root cause: padding? font-weight? wrong token? font race? animation?
4. Fix the **implementation** (NOT the baseline). The baseline came from canon; if it's wrong, that's a Claude Design issue.
5. Re-run `npm run test:visual -- -g "$ARGUMENTS"`.
6. Repeat until passing.

**After 3 iterations**, if the diff is still > 2%, STOP and present:
- The diff PNG paths
- Your root-cause hypothesis
- Why fixing it would require changes outside this screen's scope

I'll decide whether to round-trip through Claude Design (canon update) or accept the deviation as a documented gap in `packages/canon/CHANGELOG.md`.

**Do NOT regenerate baselines as a "fix".** Running `npm run test:visual:update` overwrites the canon reference — that's only for intentional design refreshes, never for making a failing test pass.

## Step 6 — Definition of Done check

Confirm ALL apply before declaring done:

- [ ] `npm run lint` green
- [ ] `npm run typecheck` green
- [ ] `npm run test:visual -- -g "$ARGUMENTS"` passes at all 4 viewports (1440 / 768 / 390 / 375)
- [ ] `[data-section="<id>"]` present in DOM on prod route
- [ ] If migration: old component `@deprecated`, no active imports anywhere
- [ ] Component lists in `landing/CLAUDE.md` updated (moved between "consuming canon" and "still hand-rolled")
- [ ] `docs/handoff/VISUAL_COVERAGE.md` row updated for affected viewports

Output a final summary: what changed, what was verified, what's left for human review.

## STOP conditions (do not proceed; ask)

- Canon doesn't export the needed component (see "Still hand-rolled" in `landing/CLAUDE.md`)
- Spec and canon JSX contradict each other on this screen
- A required design token isn't in `@samosite/canon/tokens`
- The screen needs a state/variant present in spec but missing from canon (or vice versa)
- Pixel-diff still fails after 3 implementation iterations
- The `stabilize()` helper at `landing/tests/visual/utils/stabilize.ts` doesn't exist yet — this is a prerequisite for stabilizing Hero @ 768/390 and similar smoke-only screens. If it's missing, surface it as a blocker before proceeding.
