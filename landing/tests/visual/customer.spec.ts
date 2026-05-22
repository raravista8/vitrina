/**
 * Visual regression spec for the customer-site Jinja template.
 *
 * Renders `sites-template/index.html.j2` against deterministic fixtures
 * (`infra/scripts/render-customer-fixture.py`), serves the result on a
 * local HTTP server, and screenshots each `[data-section="..."]` per
 * viewport.
 *
 * Scope (PR-C / Tier 2a — scaffolding only):
 *   • Spec file + section map + fixture renderer + gitignored output dir.
 *   • Every section runs as smoke-only (`auditedViewports: []` in
 *     `utils/customer-sections.ts`) — selector resolves, no pixel
 *     assertion. This gates structural regressions (a missing section
 *     surfaces as red CI) without requiring the Linux baseline regen
 *     pass to land in the same PR.
 *   • Pixel assertions get enabled in a follow-up PR: regen baselines
 *     under Docker Linux (matches CI Ubuntu), commit the 36 PNGs, flip
 *     entries to `["1440","768","390"]`.
 *
 * How a baseline gets created (follow-up PR):
 *   `bash infra/scripts/generate-customer-baselines-linux.sh`
 *   → renders fixture → serves it → screenshots from canon's
 *     `screens-customer.jsx` against the rendered fixture per section.
 *
 * Why HTTP not file:// :
 *   • Browsers gate certain CSS features (background-image() in some
 *     `@font-face` declarations) behind same-origin policy. file:// is
 *     opaque-origin so font weights silently fall back.
 *   • The Jinja template's `<link rel="stylesheet" href="/static/booking.css">`
 *     is an absolute path that only resolves with an HTTP server's
 *     document-root semantics.
 *
 * The server lifecycle is per-spec (started in `beforeAll`, killed in
 * `afterAll`) so parallel tests don't fight over the port. Port chosen
 * is 4322 — outside Next dev (3000) and the landing.spec.ts prod
 * server (3001 / 4310 in earlier sweeps).
 */
import { test, expect } from "@playwright/test";
import http from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

import { CUSTOMER_SECTIONS } from "./utils/customer-sections";

const FIXTURE_DIR = path.resolve(__dirname, "__fixtures__", "customer-site");
const PORT = 4322;
const BASE = `http://localhost:${PORT}`;

let server: http.Server | null = null;

/* Tiny static server. We deliberately don't pull a dep (express, serve-handler)
   — node:http + a 30-line MIME table covers the 3 file types our fixture
   needs (html, css, png placeholder). */
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

test.describe("customer-site visual regression", () => {
  test.beforeAll(async () => {
    /* Spec requires the fixture to exist — render it first via
         poetry run python infra/scripts/render-customer-fixture.py
       or via the Tier 2a baseline generator. We don't auto-render here
       to keep the spec hermetic + fast (Python startup is ~300ms).
       If absent, fail fast with a clear message rather than a 404. */
    if (!existsSync(path.join(FIXTURE_DIR, "index.html"))) {
      throw new Error(
        `Customer-site fixture missing at ${FIXTURE_DIR}/index.html. ` +
          `Run: poetry run python infra/scripts/render-customer-fixture.py`,
      );
    }
    server = await startStaticServer(FIXTURE_DIR, PORT);
  });

  test.afterAll(async () => {
    if (server) {
      await new Promise<void>((resolve) => server?.close(() => resolve()));
      server = null;
    }
  });

  for (const section of CUSTOMER_SECTIONS) {
    test(`${section.label}`, async ({ page }, testInfo) => {
      const viewport = testInfo.project.name.endsWith("desktop")
        ? "1440"
        : testInfo.project.name.endsWith("tablet")
          ? "768"
          : "390";

      await page.goto(BASE, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      const locator = page.locator(`[data-section="${section.dataSection}"]`);

      /* Mobile-only or desktop-only sections (e.g. sticky-mobile CTA is
         display:none at sm+ in booking.css). The `hiddenOn` list spells
         out the viewports where the section is INTENTIONALLY not
         visible — we simply skip the assertion there. The selector may
         still exist in DOM but with `display: none`. */
      if (section.hiddenOn?.includes(viewport)) {
        testInfo.annotations.push({
          type: "viewport-hidden",
          description: `${section.label} @ ${viewport}: intentionally hidden (CSS display:none)`,
        });
        return;
      }

      await expect(
        locator,
        `selector "[data-section=${section.dataSection}]" missing in rendered fixture — ` +
          `did the section get renamed/removed in sites-template/index.html.j2?`,
      ).toBeVisible({ timeout: 10_000 });

      /* Smoke-only mode while baselines aren't yet generated. Same
         pattern as landing.spec.ts: keeping the smoke check gives us
         structural-regression coverage right now; pixel-diff
         assertions get unlocked when the follow-up PR adds Linux
         baselines + flips `auditedViewports`. */
      if (!section.auditedViewports.includes(viewport)) {
        testInfo.annotations.push({
          type: "pending-baseline",
          description: `${section.label} @ ${viewport}: smoke-only — baselines pending Tier 2a follow-up`,
        });
        return;
      }

      /* Pixel diff path goes here once auditedViewports flips on. The
         comparator (`utils/diff.ts`) and budget config can be lifted
         verbatim from landing.spec.ts — keep this branch empty for now
         so the spec compiles + runs in smoke mode. */
      throw new Error("Pixel-diff path not yet implemented — see Tier 2a follow-up PR");
    });
  }
});
