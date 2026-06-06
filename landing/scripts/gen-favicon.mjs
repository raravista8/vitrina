// Favicon generator — produces app/favicon.ico + app/apple-icon.png from the
// brand mark, and rewrites app/icon.svg's fill to the sRGB hex of the canon
// accent.
//
// WHY THIS EXISTS
// ---------------
// Search engines (Yandex/Google) show a generic globe instead of our «С» mark
// because:
//   1. There was NO /favicon.ico at the site root — Yandex's favicon robot is
//      old-school and looks for /favicon.ico specifically; an SVG-only icon is
//      not enough for it.
//   2. icon.svg fills with `oklch(...)`, which SVG *rasterizers* (resvg/librsvg,
//      and likely the engines' own favicon rasterizers) don't understand → they
//      fall back to BLACK. Browsers render oklch fine, so this only bites the
//      raster path that search engines use.
//
// FIX: bake the sRGB hex into icon.svg (visually identical in browsers, but now
// every rasterizer renders terracotta), and emit a real multi-size favicon.ico
// + apple-icon.png. Next.js App Router serves app/favicon.ico at /favicon.ico
// and app/apple-icon.png at /apple-icon.png automatically.
//
// Rendering is done through Chromium (Playwright) — the same engine real users
// see — so the raster is faithful (oklch + font fallback handled natively).
//
// Run from landing/:  node scripts/gen-favicon.mjs
// Re-run whenever the brand mark changes. Output files ARE committed.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import sharp from "sharp";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const APP = resolve(__dirname, "..", "app");
const ACCENT_OKLCH = "oklch(0.605 0.155 35)"; // canon `accent` token
const SIZES_ICO = [16, 32, 48]; // packed into favicon.ico
const APPLE = 180; // apple-touch-icon

/** Pack PNG buffers into a single PNG-embedded .ico (Vista+ format). */
function buildIco(items) {
  const count = items.length;
  const dir = Buffer.alloc(6 + count * 16);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // type = icon
  dir.writeUInt16LE(count, 4);
  let offset = 6 + count * 16;
  items.forEach((it, i) => {
    const e = 6 + i * 16;
    dir.writeUInt8(it.size >= 256 ? 0 : it.size, e + 0); // width (0 ⇒ 256)
    dir.writeUInt8(it.size >= 256 ? 0 : it.size, e + 1); // height
    dir.writeUInt8(0, e + 2); // palette count
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // color planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(it.buf.length, e + 8); // bytes
    dir.writeUInt32LE(offset, e + 12); // offset
    offset += it.buf.length;
  });
  return Buffer.concat([dir, ...items.map((it) => it.buf)]);
}

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });

// 1. Resolve the canon accent oklch → sRGB hex by painting + sampling a pixel.
await page.setContent(
  `<div id="s" style="width:16px;height:16px;background:${ACCENT_OKLCH}"></div>`,
);
const swatch = await page.locator("#s").screenshot();
const { data } = await sharp(swatch).raw().toBuffer({ resolveWithObject: true });
const hex =
  "#" +
  [data[0], data[1], data[2]]
    .map((c) => c.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();
console.log(`accent ${ACCENT_OKLCH} → ${hex}`);

// 2. Rewrite icon.svg fill oklch → hex (browser-identical, rasterizer-safe).
const svgPath = resolve(APP, "icon.svg");
let svg = readFileSync(svgPath, "utf8");
svg = svg.replace(
  /fill="oklch\([^"]*\)"/,
  `fill="${hex}"`, // sRGB of canon accent oklch(0.605 0.155 35) — see header
);
writeFileSync(svgPath, svg);
console.log("rewrote app/icon.svg fill →", hex);

/** Render the brand SVG at `size` px on a transparent backdrop. */
async function renderPng(size) {
  const sized = svg
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`);
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<style>html,body{margin:0;padding:0;background:transparent}</style>${sized}`,
  );
  return page.locator("svg").screenshot({ omitBackground: true });
}

// 3. favicon.ico (16/32/48) — what Yandex/Google favicon robots fetch.
const icoItems = [];
for (const size of SIZES_ICO) icoItems.push({ size, buf: await renderPng(size) });
writeFileSync(resolve(APP, "favicon.ico"), buildIco(icoItems));
console.log("wrote app/favicon.ico", SIZES_ICO.join("/"));

// 4. apple-icon.png (180×180) — iOS home-screen; SVG isn't supported there.
writeFileSync(resolve(APP, "apple-icon.png"), await renderPng(APPLE));
console.log(`wrote app/apple-icon.png ${APPLE}×${APPLE}`);

await browser.close();
