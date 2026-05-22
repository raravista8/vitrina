/**
 * Visual regression spec for the intake flow (SCREEN_INDEX.md #2-9).
 *
 * Covers 15 screens across 4 families:
 *   • 9 SourceDetectionBadge states (via `/dev/source-badge` grid)
 *   • 3 SubmitModal steps (opened via `window.__open_submit_modal`,
 *     mounted directly on the requested step via the `e2eInitialStep`
 *     prop added in the per-step follow-up)
 *   • PhotoDrawer (opened via `window.__open_photo_drawer`)
 *   • LeadForm + FeedbackForm (full-page routes / customer fixture)
 *
 * SubmitModal per-step assertion strategy:
 *   Each step entry passes `{step: {kind, ...}}` to the window hook;
 *   the modal mounts directly on that step (skips Step1Contact's
 *   POST /api/submit-application which needs captcha + a backend
 *   response). Step 2 polls /api/tg-bot-personal-status, so the spec
 *   intercepts the route with `{started: false}` to keep the modal on
 *   step 2 throughout the screenshot window. The compound selector
 *   `[data-modal="submit-modal"][data-step="<kind>"]` re-fires
 *   Playwright's visibility wait on step transitions.
 *
 * Scope (still smoke-only in this PR):
 *   All screens have `auditedViewports: []`. Selectors resolve = no
 *   structural regression. Pixel-diff path is a stub — comes in the
 *   Linux baseline regenerator PR that lifts customer + intake out of
 *   smoke-only together.
 *
 * Requires `NEXT_PUBLIC_E2E=1` build for three reasons:
 *   1. `/dev/source-badge` page is gated by this env (otherwise
 *      returns "Not available" stub — see PR #112).
 *   2. `window.__open_submit_modal` / `__open_photo_drawer` hooks in
 *      Hero are gated by this env (otherwise undefined). Spec fails
 *      fast with a clear message if hook is missing.
 *   3. `SubmitModal::e2eInitialStep` prop pass-through in Hero is
 *      gated — without the env, the prop is always undefined and the
 *      modal mounts at the default `contact` step regardless of the
 *      hook call.
 *
 * CI workflow runs `NEXT_PUBLIC_E2E=1 npm run build` before this spec.
 * Local: `NEXT_PUBLIC_E2E=1 npm run build && PORT=4310 npm run start`.
 */
import { test, expect, type Page } from "@playwright/test";
import http from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { INTAKE_SCREENS } from "./utils/intake-screens";

const FIXTURE_DIR = path.resolve(__dirname, "__fixtures__", "customer-site");
const CUSTOMER_PORT = 4323;
const CUSTOMER_BASE = `http://localhost:${CUSTOMER_PORT}`;

let customerServer: http.Server | null = null;

/* Tiny static server reused from customer.spec.ts pattern. Serves the
   rendered customer-site fixture for the LeadForm test (#8). */
function startStaticServer(rootDir: string, port: number): Promise<http.Server> {
  const MIME: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
  };
  return new Promise((resolve, reject) => {
    const srv = http.createServer((req, res) => {
      try {
        const urlPath = decodeURIComponent((req.url ?? "/").split("?")[0] ?? "/");
        let filePath = path.join(rootDir, urlPath);
        if (filePath.endsWith("/") || (existsSync(filePath) && statSync(filePath).isDirectory())) {
          filePath = path.join(filePath, "index.html");
        }
        if (!filePath.startsWith(rootDir) || !existsSync(filePath)) {
          res.writeHead(404).end("not found");
          return;
        }
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME[ext] ?? "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(readFileSync(filePath));
      } catch (e) {
        res.writeHead(500).end(String(e));
      }
    });
    srv.listen(port, () => resolve(srv));
    srv.on("error", reject);
  });
}

async function ensureE2EHooksLoaded(page: Page): Promise<void> {
  /* The window-hook is added in `Hero.tsx::useEffect` — it only mounts
     once Hero is hydrated client-side. We wait up to 3 s for it. If
     missing entirely, the build wasn't done with NEXT_PUBLIC_E2E=1
     and we fail with an actionable message rather than a vague timeout. */
  const ok = await page
    .waitForFunction(
      () =>
        typeof (window as unknown as { __open_submit_modal?: unknown }).__open_submit_modal ===
        "function",
      undefined,
      { timeout: 3_000 },
    )
    .then(() => true)
    .catch(() => false);
  if (!ok) {
    throw new Error(
      "window.__open_submit_modal hook missing — build the landing with " +
        "`NEXT_PUBLIC_E2E=1 npm run build && npm run start` so Hero mounts the hook.",
    );
  }
}

test.describe("intake visual regression", () => {
  test.beforeAll(async () => {
    /* Customer-site fixture is needed only for the LeadForm test
       (#book section on the rendered customer-site). It's the same
       fixture produced by `infra/scripts/render-customer-fixture.py`
       — already present if the workflow's render-fixture step ran. */
    if (existsSync(path.join(FIXTURE_DIR, "index.html"))) {
      customerServer = await startStaticServer(FIXTURE_DIR, CUSTOMER_PORT);
    }
  });

  test.afterAll(async () => {
    if (customerServer) {
      await new Promise<void>((resolve) => customerServer?.close(() => resolve()));
      customerServer = null;
    }
  });

  for (const screen of INTAKE_SCREENS) {
    test(`${screen.label}`, async ({ page }, testInfo) => {
      const viewport = testInfo.project.name.endsWith("desktop")
        ? "1440"
        : testInfo.project.name.endsWith("tablet")
          ? "768"
          : "390";

      if (screen.hiddenOn?.includes(viewport)) {
        testInfo.annotations.push({
          type: "viewport-hidden",
          description: `${screen.label} @ ${viewport}: intentionally hidden`,
        });
        return;
      }

      /* Family-specific setup — each family lands the screen via its
         own path, then converges on `expect(locator).toBeVisible()`. */
      let locator;

      if (screen.setup.family === "source-badge") {
        await page.goto("/dev/source-badge", { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        locator = page.locator(`[data-state="${screen.setup.state}"]`);
      } else if (screen.setup.family === "submit-modal") {
        /* Per-step assertion path: hand the desired Step to
           `__open_submit_modal` via the `step` field added in the
           per-step follow-up. SubmitModal's `e2eInitialStep` prop
           mounts the wizard directly on that step — bypasses
           Step1Contact's POST /api/submit-application (which needs
           captcha + a seeded backend response).

           Step 2 (tg_bot) renders Step2TgBot which IMMEDIATELY
           starts polling GET /api/tg-bot-personal-status. Intercept
           that route with `{started: false}` so the modal stays on
           step 2 throughout the screenshot window — without the
           intercept, the polling either 404s (and silently stops)
           or, worse, intermittently 200s + advances to step 3
           mid-screenshot. */
        if (screen.setup.step === "tg_bot") {
          await page.route("**/api/tg-bot-personal-status*", async (route) => {
            await route.fulfill({
              status: 200,
              contentType: "application/json",
              body: JSON.stringify({ ok: true, data: { started: false } }),
            });
          });
        }
        await page.goto("/", { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await ensureE2EHooksLoaded(page);
        const stepKind = screen.setup.step;
        const url = screen.setup.url;
        /* Build the Step value the modal expects per its
           discriminated union. Step 2 needs an applicationId; step 3
           needs a contactType. Both are throwaway for smoke purposes —
           Step2TgBot logs the id, Step3Confirmation only branches on
           contactType for copy. */
        const stepValue =
          stepKind === "tg_bot"
            ? { kind: "tg_bot" as const, applicationId: "e2e-mock-app-id" }
            : stepKind === "confirmation"
              ? { kind: "confirmation" as const, contactType: "telegram" as const }
              : { kind: "contact" as const };
        await page.evaluate(
          (opts) => {
            const w = window as unknown as {
              __open_submit_modal?: (o?: { url?: string; step?: typeof opts.step }) => void;
            };
            w.__open_submit_modal?.(opts);
          },
          { url, step: stepValue },
        );
        /* Compound selector — `data-step` re-renders when the step
           transitions, so Playwright's visibility wait correctly
           gates on the screenshot-target step (not just "any modal
           is open"). */
        locator = page.locator(`[data-modal="submit-modal"][data-step="${stepKind}"]`);
      } else if (screen.setup.family === "photo-drawer") {
        await page.goto("/", { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        await ensureE2EHooksLoaded(page);
        await page.evaluate(() => {
          const w = window as unknown as { __open_photo_drawer?: () => void };
          w.__open_photo_drawer?.();
        });
        locator = page.locator('[data-modal="photo-drawer"]');
      } else {
        /* form-page family. LeadForm uses the customer-site fixture
           (different host on CUSTOMER_BASE); FeedbackForm uses the
           Next.js prod server at baseURL. */
        const isLeadForm = screen.setup.path === "/" && screen.setup.selector.includes("book");
        if (isLeadForm) {
          if (!customerServer) {
            throw new Error(
              "Customer-site fixture not rendered. Run: " +
                "poetry run python infra/scripts/render-customer-fixture.py",
            );
          }
          await page.goto(CUSTOMER_BASE, { waitUntil: "networkidle" });
        } else {
          await page.goto(screen.setup.path, { waitUntil: "networkidle" });
        }
        await page.evaluate(() => document.fonts.ready);
        locator = page.locator(screen.setup.selector);
      }

      await expect(
        locator,
        `selector resolution failed for screen "${screen.label}" — ` +
          `did the data-attr get renamed/removed in prod?`,
      ).toBeVisible({ timeout: 10_000 });

      if (!screen.auditedViewports.includes(viewport)) {
        testInfo.annotations.push({
          type: "pending-baseline",
          description: `${screen.label} @ ${viewport}: smoke-only — baselines pending Tier 2b-2 follow-up`,
        });
        return;
      }

      throw new Error("Pixel-diff path not yet implemented — see Tier 2b-2 follow-up PR");
    });
  }
});
