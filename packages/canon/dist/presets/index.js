// src/presets/index.tsx
import React from "react";

// src/tokens.ts
var VT = {
  // Surfaces
  bg: "oklch(0.972 0.012 80)",
  bgSoft: "oklch(0.945 0.014 75)",
  white: "#ffffff",
  // Ink
  ink: "oklch(0.215 0.018 60)",
  inkSoft: "oklch(0.42 0.020 60)",
  inkFaint: "oklch(0.56 0.020 60)",
  inkMuted: "oklch(0.68 0.016 60)",
  // Lines
  line: "oklch(0.88 0.012 70)",
  lineSoft: "oklch(0.93 0.010 70)",
  // Accent — terracotta
  accent: "oklch(0.605 0.155 35)",
  accentHover: "oklch(0.54 0.16 35)",
  accentSoft: "oklch(0.92 0.045 40)",
  accentInk: "oklch(0.42 0.14 35)",
  // Semantic
  success: "oklch(0.58 0.13 145)",
  successSoft: "oklch(0.93 0.05 145)",
  info: "oklch(0.62 0.10 240)",
  infoSoft: "oklch(0.93 0.035 240)",
  warn: "oklch(0.66 0.14 70)",
  warnSoft: "oklch(0.94 0.06 80)",
  danger: "oklch(0.55 0.18 28)",
  dangerSoft: "oklch(0.93 0.055 28)",
  r: { sm: 6, md: 10, lg: 14, xl: 18, pill: 999 },
  shadow: {
    card: "0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)",
    pop: "0 18px 40px -16px rgba(120,60,30,0.25)"
  },
  font: {
    sans: "Onest, system-ui, -apple-system, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace"
  }
};
var BRAND = {
  name: "\u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442",
  domain: "samosite.online",
  bot: "@SamositeIntakeBot",
  contactBot: "@SamositeBot"
};
var tokens = {
  color: {
    accent: VT.accent,
    accentSoft: VT.accentSoft,
    accentInk: VT.accentInk,
    accentHover: VT.accentHover,
    ink: VT.ink,
    inkSoft: VT.inkSoft,
    inkFaint: VT.inkFaint,
    inkMuted: VT.inkMuted,
    line: VT.line,
    lineSoft: VT.lineSoft,
    bg: VT.bg,
    bgSoft: VT.bgSoft,
    white: VT.white,
    success: VT.success,
    successSoft: VT.successSoft,
    info: VT.info,
    infoSoft: VT.infoSoft,
    warn: VT.warn,
    warnSoft: VT.warnSoft,
    danger: VT.danger,
    dangerSoft: VT.dangerSoft
  },
  font: VT.font,
  shadow: VT.shadow,
  radius: { sm: 10, md: 14, lg: 18, xl: 22, "2xl": 28, full: 999 }
};

// src/presets/index.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var editorialWarm = {
  id: "editorial-warm",
  family: "editorial",
  spectrum: "bold",
  label: "\u0442\u0451\u043F\u043B\u0430\u044F \xB7 \u043A\u043B\u0430\u0441\u0441\u0438\u043A\u0430",
  colors: {
    bg: "#FAF6F0",
    bgAlt: "#F2E6D2",
    ink: "#211C17",
    inkSoft: "#5C5048",
    inkFaint: "#897C6E",
    line: "#211C17",
    lineSoft: "#D3C7B0",
    accent: "#A8412E",
    accentSoft: "rgba(168,65,46,0.10)",
    accentInk: "#FAF6F0",
    invBg: "#211C17",
    invInk: "#FAF6F0",
    invAccent: "#D9A441",
    invInkSoft: "#B5A98F"
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace"
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: true }
};
var editorialNoir = {
  id: "editorial-noir",
  family: "editorial",
  spectrum: "dark",
  label: "\u0442\u0451\u043C\u043D\u0430\u044F \xB7 \u0437\u043E\u043B\u043E\u0442\u043E",
  colors: {
    bg: "#14110D",
    bgAlt: "#211C16",
    ink: "#EFE7D6",
    inkSoft: "#9A8F79",
    inkFaint: "#6B6354",
    line: "#EFE7D6",
    lineSoft: "#34301F",
    accent: "#D4A24E",
    accentSoft: "rgba(212,162,78,0.14)",
    accentInk: "#14110D",
    invBg: "#D4A24E",
    invInk: "#14110D",
    invAccent: "#14110D",
    invInkSoft: "#6B4F1E"
  },
  fonts: {
    display: "'Fraunces', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace"
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: true, photoFilter: "contrast(1.05) saturate(0.85)" }
};
var editorialMono = {
  id: "editorial-mono",
  family: "editorial",
  spectrum: "bold",
  label: "\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F \xB7 teal",
  colors: {
    bg: "#ECEAE5",
    bgAlt: "#DEDBD3",
    ink: "#15211E",
    inkSoft: "#52605C",
    inkFaint: "#84908B",
    line: "#15211E",
    lineSoft: "#B8B5AD",
    accent: "#356E60",
    accentSoft: "rgba(53,110,96,0.12)",
    accentInk: "#F4F2EC",
    invBg: "#15211E",
    invInk: "#ECEAE5",
    invAccent: "#7FB3A4",
    invInkSoft: "#5E6B66"
  },
  fonts: {
    display: "'Geist Mono', 'JetBrains Mono', monospace",
    body: "'Geist Mono', 'JetBrains Mono', monospace",
    mono: "'Geist Mono', 'JetBrains Mono', monospace"
  },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: false, dropCap: true, photoFilter: "grayscale(0.6) contrast(1.1)" }
};
var bentoNoir = {
  id: "bento-noir",
  family: "bento",
  spectrum: "dark",
  label: "\u0442\u0451\u043C\u043D\u0430\u044F \xB7 \u0433\u0440\u0430\u0444\u0438\u0442",
  colors: {
    bg: "#0E0F10",
    bgAlt: "#17191B",
    ink: "#F2F0EC",
    inkSoft: "#9A9B98",
    inkFaint: "#6B6D6B",
    line: "#262A2C",
    lineSoft: "#1E2123",
    accent: "#C2D94A",
    accentSoft: "rgba(194,217,74,0.14)",
    accentInk: "#0E0F10",
    invBg: "#F2F0EC",
    invInk: "#0E0F10",
    invAccent: "#0E0F10",
    invInkSoft: "#5C5E5C"
  },
  fonts: { display: "'Space Grotesk', sans-serif", body: "'Space Grotesk', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 10, photo: 14, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var bentoLight = {
  id: "bento-light",
  family: "bento",
  spectrum: "classic",
  label: "\u0441\u0432\u0435\u0442\u043B\u0430\u044F \xB7 \u0441\u0442\u0430\u043B\u044C",
  colors: {
    bg: "#EFF1F4",
    bgAlt: "#FFFFFF",
    ink: "#16202E",
    inkSoft: "#5A6678",
    inkFaint: "#95A0AF",
    line: "#E0E4EA",
    lineSoft: "#ECEFF3",
    accent: "#2D5B8E",
    accentSoft: "rgba(45,91,142,0.10)",
    accentInk: "#FFFFFF",
    invBg: "#16202E",
    invInk: "#FFFFFF",
    invAccent: "#7FA8D9",
    invInkSoft: "#6B7787"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 16, btn: 8, photo: 16, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var bentoClay = {
  id: "bento-clay",
  family: "bento",
  spectrum: "soft",
  label: "\u0442\u0451\u043F\u043B\u0430\u044F \xB7 \u0433\u043B\u0438\u043D\u0430",
  colors: {
    bg: "#EDE6DB",
    bgAlt: "#F7F2E9",
    ink: "#2A211A",
    inkSoft: "#5C5048",
    inkFaint: "#8A7C6C",
    line: "#DBD2C3",
    lineSoft: "#E5DDD0",
    accent: "#B56A43",
    accentSoft: "rgba(181,106,67,0.12)",
    accentInk: "#F7F2E9",
    invBg: "#2A211A",
    invInk: "#F7F2E9",
    invAccent: "#D9A441",
    invInkSoft: "#8A7C6C"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 18, btn: 999, photo: 18, mark: 10 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var displaySoft = {
  id: "display-soft",
  family: "display",
  spectrum: "soft",
  label: "\u0440\u043E\u0437\u043E\u0432\u0430\u044F \xB7 \u0431\u044C\u044E\u0442\u0438",
  colors: {
    bg: "#F6E7E3",
    bgAlt: "#FBF3F1",
    ink: "#2A1820",
    inkSoft: "#6B4A52",
    inkFaint: "#9C7B82",
    line: "#E8CFC9",
    lineSoft: "#F0DED9",
    accent: "#8C4A52",
    accentSoft: "rgba(140,74,82,0.10)",
    accentInk: "#F6E7E3",
    invBg: "#2A1820",
    invInk: "#F6E7E3",
    invAccent: "#D99CA0",
    invInkSoft: "#8C6168"
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 10, btn: 999, photo: 10, mark: 6 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false }
};
var displayBold = {
  id: "display-bold",
  family: "display",
  spectrum: "bold",
  label: "\u043C\u044F\u0442\u043D\u0430\u044F \xB7 \u0441\u043C\u0435\u043B\u0430\u044F",
  colors: {
    bg: "#D6EDE3",
    bgAlt: "#E6F4EC",
    ink: "#10211B",
    inkSoft: "#3C544A",
    inkFaint: "#6B8276",
    line: "#B6D8C9",
    lineSoft: "#C8E2D6",
    accent: "#13231D",
    accentSoft: "rgba(16,33,27,0.08)",
    accentInk: "#D6EDE3",
    invBg: "#10211B",
    invInk: "#D6EDE3",
    invAccent: "#9FD9C0",
    invInkSoft: "#5C7368"
  },
  fonts: { display: "'Fraunces', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 0, btn: 0, photo: 0, mark: 0 },
  voice: { displayWeight: 500, italicAccent: true, dropCap: false }
};
var displayNoir = {
  id: "display-noir",
  family: "display",
  spectrum: "dark",
  label: "\u0442\u0451\u043C\u043D\u0430\u044F \xB7 \u0437\u043E\u043B\u043E\u0442\u043E",
  colors: {
    bg: "#141210",
    bgAlt: "#201D19",
    ink: "#EFE9DD",
    inkSoft: "#9A9082",
    inkFaint: "#6B645A",
    line: "#322D27",
    lineSoft: "#262320",
    accent: "#D9B36A",
    accentSoft: "rgba(217,179,106,0.14)",
    accentInk: "#141210",
    invBg: "#D9B36A",
    invInk: "#141210",
    invAccent: "#141210",
    invInkSoft: "#6B5630"
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 4, btn: 4, photo: 4, mark: 2 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false, photoFilter: "saturate(0.85) contrast(1.05)" }
};
var displayInk = {
  id: "display-ink",
  family: "display",
  spectrum: "dark",
  label: "\u0433\u0440\u0430\u0444\u0438\u0442 \xB7 \u043A\u043E\u0441\u0442\u044C",
  colors: {
    bg: "#100F0E",
    bgAlt: "#1A1917",
    ink: "#ECE7DF",
    inkSoft: "#8E8780",
    inkFaint: "#605A53",
    line: "#2A2825",
    lineSoft: "#201E1C",
    accent: "#C9C2B6",
    accentSoft: "rgba(201,194,182,0.12)",
    accentInk: "#100F0E",
    invBg: "#ECE7DF",
    invInk: "#100F0E",
    invAccent: "#100F0E",
    invInkSoft: "#7A746C"
  },
  fonts: { display: "'Instrument Serif', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 3, btn: 3, photo: 3, mark: 2 },
  voice: { displayWeight: 400, italicAccent: true, dropCap: false, photoFilter: "grayscale(0.35) contrast(1.08)" }
};
var splitProduct = {
  id: "split-product",
  family: "split",
  spectrum: "classic",
  label: "\u043F\u0440\u043E\u0434\u0443\u043A\u0442\u043E\u0432\u0430\u044F \xB7 \u0441\u0438\u043D\u044F\u044F",
  colors: {
    bg: "#FFFFFF",
    bgAlt: "#F5F7FA",
    ink: "#12233B",
    inkSoft: "#4F6178",
    inkFaint: "#93A1B3",
    line: "#E3E9F0",
    lineSoft: "#EEF2F6",
    accent: "#244A8E",
    accentSoft: "rgba(36,74,142,0.08)",
    accentInk: "#FFFFFF",
    invBg: "#12233B",
    invInk: "#FFFFFF",
    invAccent: "#82A9DC",
    invInkSoft: "#6A7A8E"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 12, btn: 8, photo: 12, mark: 6 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var splitClay = {
  id: "split-clay",
  family: "split",
  spectrum: "soft",
  label: "\u0437\u0435\u043C\u043B\u044F\u043D\u0430\u044F \xB7 \u043E\u043B\u0438\u0432\u0430",
  colors: {
    bg: "#EFE8DA",
    bgAlt: "#E3D9C5",
    ink: "#2A2116",
    inkSoft: "#5C4F3A",
    inkFaint: "#8A7B5E",
    line: "#D7CBB2",
    lineSoft: "#E2D8C4",
    accent: "#6E713F",
    accentSoft: "rgba(110,113,63,0.12)",
    accentInk: "#EFE8DA",
    invBg: "#2A2116",
    invInk: "#EFE8DA",
    invAccent: "#A8AB6F",
    invInkSoft: "#8A7B5E"
  },
  fonts: { display: "'Inter Tight', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 999, photo: 14, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false, photoFilter: "saturate(0.95) sepia(0.05)" }
};
var splitTeal = {
  id: "split-teal",
  family: "split",
  spectrum: "bold",
  label: "\u0431\u0438\u0440\u044E\u0437\u043E\u0432\u0430\u044F \xB7 \u0441\u043C\u0435\u043B\u0430\u044F",
  colors: {
    bg: "#FFFFFF",
    bgAlt: "#EAF6F4",
    ink: "#0E2422",
    inkSoft: "#3F5C58",
    inkFaint: "#7D9794",
    line: "#D2E6E2",
    lineSoft: "#E6F2F0",
    accent: "#127068",
    accentSoft: "rgba(18,112,104,0.10)",
    accentInk: "#FFFFFF",
    invBg: "#0E2422",
    invInk: "#EAF6F4",
    invAccent: "#5FB8AC",
    invInkSoft: "#5C7672"
  },
  fonts: { display: "'Space Grotesk', sans-serif", body: "'Inter Tight', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 6, btn: 6, photo: 6, mark: 4 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var stackedCorporate = {
  id: "stacked-corporate",
  family: "stacked",
  spectrum: "classic",
  label: "\u0434\u0435\u043B\u043E\u0432\u0430\u044F \xB7 \u0441\u0438\u043D\u0435-\u0441\u0435\u0440\u0430\u044F",
  colors: {
    bg: "#FFFFFF",
    bgAlt: "#F4F6F8",
    ink: "#1C2A39",
    inkSoft: "#5B6A7B",
    inkFaint: "#95A2B0",
    line: "#E4E9EE",
    lineSoft: "#EFF2F5",
    accent: "#1C2A39",
    accentSoft: "#EEF1F4",
    accentInk: "#FFFFFF",
    invBg: "#1C2A39",
    invInk: "#FFFFFF",
    invAccent: "#8CA3BC",
    invInkSoft: "#6B7888"
  },
  fonts: { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 12, btn: 8, photo: 12, mark: 8 },
  voice: { displayWeight: 700, italicAccent: false, dropCap: false }
};
var stackedCream = {
  id: "stacked-cream",
  family: "stacked",
  spectrum: "soft",
  label: "\u0442\u0451\u043F\u043B\u0430\u044F \xB7 \u043E\u0445\u0440\u0430",
  colors: {
    bg: "#FAF5EC",
    bgAlt: "#FFFFFF",
    ink: "#2A2118",
    inkSoft: "#5C5040",
    inkFaint: "#8A7C66",
    line: "#E8DECB",
    lineSoft: "#F0E8D8",
    accent: "#A8631F",
    accentSoft: "rgba(168,99,31,0.10)",
    accentInk: "#FAF5EC",
    invBg: "#2A2118",
    invInk: "#FAF5EC",
    invAccent: "#D9A441",
    invInkSoft: "#8A7C66"
  },
  fonts: { display: "'Fraunces', Georgia, serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 14, btn: 999, photo: 14, mark: 8 },
  voice: { displayWeight: 500, italicAccent: false, dropCap: false, photoFilter: "sepia(0.05) saturate(0.95)" }
};
var stackedSlate = {
  id: "stacked-slate",
  family: "stacked",
  spectrum: "bold",
  label: "\u0433\u0440\u0430\u0444\u0438\u0442 \xB7 \u0430\u043A\u0446\u0435\u043D\u0442",
  colors: {
    bg: "#FBFBFA",
    bgAlt: "#F2F2F0",
    ink: "#1A1A1A",
    inkSoft: "#4F4F4D",
    inkFaint: "#8A8A86",
    line: "#E4E4E0",
    lineSoft: "#EEEEEB",
    accent: "#C24E2E",
    accentSoft: "rgba(194,78,46,0.10)",
    accentInk: "#FBFBFA",
    invBg: "#1A1A1A",
    invInk: "#FBFBFA",
    invAccent: "#E08A5C",
    invInkSoft: "#6B6B68"
  },
  fonts: { display: "'Inter', sans-serif", body: "'Inter', sans-serif", mono: "'JetBrains Mono', monospace" },
  radii: { card: 10, btn: 6, photo: 10, mark: 6 },
  voice: { displayWeight: 800, italicAccent: false, dropCap: false }
};
var themes = {
  [editorialWarm.id]: editorialWarm,
  [editorialNoir.id]: editorialNoir,
  [editorialMono.id]: editorialMono,
  [bentoNoir.id]: bentoNoir,
  [bentoLight.id]: bentoLight,
  [bentoClay.id]: bentoClay,
  [displaySoft.id]: displaySoft,
  [displayBold.id]: displayBold,
  [displayNoir.id]: displayNoir,
  [displayInk.id]: displayInk,
  [splitProduct.id]: splitProduct,
  [splitClay.id]: splitClay,
  [splitTeal.id]: splitTeal,
  [stackedCorporate.id]: stackedCorporate,
  [stackedCream.id]: stackedCream,
  [stackedSlate.id]: stackedSlate
};
function getTheme(themeId) {
  const t = themes[themeId];
  if (!t) throw new Error(`@samosite/canon/presets: unknown themeId "${themeId}"`);
  return t;
}
function EditorialFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, mn = content.menu, q = content.quote;
  const accentEm = (text) => text.split(/\[\[(.+?)\]\]/g).map(
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx("em", { style: { fontStyle: v.italicAccent ? "italic" : "normal", color: c.accent }, children: p }, i)
  );
  const rule = `1px solid ${c.line}`;
  const ruleSoft = `1px solid ${c.lineSoft}`;
  return /* @__PURE__ */ jsxs("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { padding: "10px 16px 8px", borderBottom: `2px solid ${c.ink}`, textAlign: "center", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.mono, fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: c.inkSoft, marginBottom: 3 }, children: [
        "\u0441 ",
        m.since,
        " \xB7 ",
        m.category
      ] }),
      /* @__PURE__ */ jsx("div", { style: { fontFamily: f.display, fontStyle: v.italicAccent ? "italic" : "normal", fontSize: 25, fontWeight: v.displayWeight, letterSpacing: "-0.02em", lineHeight: 1 }, children: m.brand })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", padding: "4px 16px", borderBottom: rule, fontFamily: f.mono, fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: c.inkSoft, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs("span", { children: [
        "\u2605\u2605\u2605\u2605\u2605 ",
        m.rating
      ] }),
      /* @__PURE__ */ jsxs("span", { children: [
        m.reviewsN,
        " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { padding: "12px 16px 10px", borderBottom: rule, flex: "0 0 auto" }, children: /* @__PURE__ */ jsx("h1", { style: { fontFamily: f.display, fontSize: 26, fontWeight: v.displayWeight, lineHeight: 0.96, letterSpacing: "-0.03em", margin: 0 }, children: content.hero.headingLines.map((l, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      accentEm(l),
      i < content.hero.headingLines.length - 1 && /* @__PURE__ */ jsx("br", {})
    ] }, i)) }) }),
    /* @__PURE__ */ jsxs("div", { style: { flex: "1 1 auto", minHeight: 70, position: "relative", overflow: "hidden", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }),
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", left: 0, bottom: 0, padding: "4px 10px", background: c.bg, borderTop: rule, borderRight: rule, fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft }, children: content.hero.photoCaption || m.address })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { flex: "0 0 auto", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx("div", { style: { padding: "7px 16px 5px", fontFamily: f.mono, fontSize: 8, letterSpacing: "0.14em", textTransform: "uppercase", color: c.inkSoft }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", gap: 8, padding: "5px 16px", borderTop: i ? ruleSoft : "none" }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkFaint, flex: "0 0 auto" }, children: it.num }),
        /* @__PURE__ */ jsx("span", { style: { fontFamily: f.display, fontSize: 13, fontWeight: v.displayWeight, whiteSpace: "nowrap", flex: "0 0 auto" }, children: it.name }),
        /* @__PURE__ */ jsx("span", { style: { flex: 1, borderBottom: `1px dotted ${c.lineSoft}`, transform: "translateY(-3px)" } }),
        /* @__PURE__ */ jsx("span", { style: { fontFamily: f.mono, fontSize: 10, fontWeight: 600, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { flex: "0 0 auto", padding: "9px 16px", borderBottom: rule }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontFamily: f.display, fontStyle: "italic", fontSize: 13, lineHeight: 1.3 }, children: accentEm(q.text) }),
      /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "stretch", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs("a", { style: { flex: 1, background: c.accent, color: c.accentInk, padding: "12px 16px", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }, children: [
        content.cta.primary.label,
        /* @__PURE__ */ jsx("span", { style: { fontFamily: f.display, fontSize: 18, fontStyle: v.italicAccent ? "italic" : "normal" }, children: "\u2192" })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { padding: "0 14px", display: "flex", alignItems: "center", fontFamily: f.mono, fontSize: 10, color: c.accentInk, background: c.ink, whiteSpace: "nowrap" }, children: content.cta.phone })
    ] })
  ] });
}
function renderEm(text, color, italic) {
  return text.split(/\[\[(.+?)\]\]/g).map(
    (p, i) => i % 2 === 0 ? /* @__PURE__ */ jsx(React.Fragment, { children: p }, i) : /* @__PURE__ */ jsx("em", { style: { fontStyle: italic ? "italic" : "normal", color }, children: p }, i)
  );
}
function BentoFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, s = content.stats, mn = content.menu, q = content.quote;
  const tile = { background: c.bgAlt, borderRadius: r.card, border: `1px solid ${c.line}`, padding: 11, overflow: "hidden" };
  const lbl = { fontFamily: f.mono, fontSize: 8, color: c.inkFaint, textTransform: "uppercase", letterSpacing: "0.06em" };
  return /* @__PURE__ */ jsxs("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", padding: 11, gap: 7, fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, fontFamily: f.display, fontWeight: 700, fontSize: 13, letterSpacing: "-0.02em" }, children: [
        /* @__PURE__ */ jsx("span", { style: { width: 20, height: 20, background: c.accent, color: c.accentInk, borderRadius: r.mark, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }, children: m.brand[0] }),
        m.brand
      ] }),
      /* @__PURE__ */ jsxs("span", { style: { fontFamily: f.mono, fontSize: 9, color: c.inkSoft }, children: [
        "\u2605 ",
        m.rating
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { ...tile, background: c.accent, color: c.accentInk, border: "none", flex: "0 0 auto", display: "flex", flexDirection: "column", gap: 8, padding: 13 }, children: [
      /* @__PURE__ */ jsxs("span", { style: { alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 5, background: c.bg, color: c.accent, padding: "4px 8px", borderRadius: 999, fontSize: 8, fontWeight: 700, fontFamily: f.mono, textTransform: "uppercase", letterSpacing: "0.05em" }, children: [
        /* @__PURE__ */ jsx("span", { style: { width: 4, height: 4, background: c.accent, borderRadius: "50%" } }),
        "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E \u0441\u0435\u0433\u043E\u0434\u043D\u044F"
      ] }),
      /* @__PURE__ */ jsx("h1", { style: { fontFamily: f.display, fontSize: 22, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.035em", margin: 0 }, children: content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "") })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 7, flex: "0 0 auto" }, children: s.slice(0, 3).map((st, i) => /* @__PURE__ */ jsxs("div", { style: tile, children: [
      /* @__PURE__ */ jsx("div", { style: lbl, children: st.label }),
      /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginTop: 3, color: i === 1 ? c.accent : c.ink }, children: [
        st.num,
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: c.inkFaint }, children: st.unit })
      ] })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { style: { borderRadius: r.card, overflow: "hidden", flex: "1 1 auto", minHeight: 50 }, children: /* @__PURE__ */ jsx("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsxs("div", { style: { ...tile, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx("div", { style: { ...lbl, marginBottom: 6 }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, paddingTop: i ? 6 : 0, marginTop: i ? 6 : 0, borderTop: i ? `1px solid ${c.line}` : "none" }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
        /* @__PURE__ */ jsx("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.accent, fontWeight: 700, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { ...tile, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, lineHeight: 1.35 }, children: renderEm(q.text, c.accent, false) }),
      /* @__PURE__ */ jsxs("div", { style: { ...lbl, marginTop: 6 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { ...tile, flex: "0 0 auto", background: c.invBg, color: c.invInk, border: "none", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px" }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em" }, children: content.cta.primary.label }),
        /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 9, color: c.invInkSoft, marginTop: 1 }, children: content.cta.phone })
      ] }),
      /* @__PURE__ */ jsx("span", { style: { width: 28, height: 28, background: c.accent, color: c.accentInk, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flex: "0 0 auto" }, children: "\u2192" })
    ] })
  ] });
}
function DisplayFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, s = content.stats, mn = content.menu;
  const lines = content.hero.headingLines;
  return /* @__PURE__ */ jsxs("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 600 }, children: [
        /* @__PURE__ */ jsx("span", { style: { width: 6, height: 6, background: c.accent, borderRadius: "50%" } }),
        m.brand
      ] }),
      /* @__PURE__ */ jsxs("span", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.08em", color: c.ink, padding: "5px 10px", border: `1px solid ${c.ink}`, borderRadius: 999 }, children: [
        "\u2605 ",
        m.rating
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { padding: "2px 16px 12px", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx("h1", { style: { fontFamily: f.display, fontSize: 44, fontWeight: v.displayWeight, lineHeight: 0.84, letterSpacing: "-0.045em", margin: 0 }, children: lines.map((l, i) => /* @__PURE__ */ jsx("span", { style: { display: "block", color: i === 1 ? c.accent : c.ink, fontStyle: i === 1 && v.italicAccent ? "italic" : "normal", textIndent: i === 1 ? 16 : 0, textAlign: i === 2 ? "right" : "left" }, children: renderEm(l, c.accent, v.italicAccent) }, i)) }) }),
    /* @__PURE__ */ jsx("div", { style: { flex: "1 1 auto", minHeight: 60, overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}`, flex: "0 0 auto" }, children: s.slice(0, 3).map((st, i) => /* @__PURE__ */ jsxs("div", { style: { flex: 1, padding: "8px 10px", textAlign: "center", borderRight: i < 2 ? `1px solid ${c.line}` : "none" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.display, fontSize: 18, fontWeight: v.displayWeight, lineHeight: 1, color: c.accent }, children: [
        st.num,
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: c.inkFaint }, children: st.unit })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 7.5, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft, marginTop: 3 }, children: st.label })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { style: { padding: "8px 16px 4px", flex: "0 0 auto" }, children: (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, padding: "4px 0", borderTop: i ? `1px solid ${c.lineSoft}` : "none" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 12, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
      /* @__PURE__ */ jsx("span", { style: { fontFamily: f.mono, fontSize: 10, color: c.inkSoft, flex: "0 0 auto" }, children: it.price })
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "11px 16px", background: c.invBg, color: c.invInk, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.06em", color: c.invInkSoft, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: m.address }),
      /* @__PURE__ */ jsxs("a", { style: { background: c.invAccent, color: c.invBg, padding: "9px 16px", borderRadius: r.btn, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap", flex: "0 0 auto" }, children: [
        content.cta.primary.label.split(" ")[0],
        " \u2192"
      ] })
    ] })
  ] });
}
function SplitFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, s = content.stats, mn = content.menu, q = content.quote;
  const heading = content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "");
  const div = `1px solid ${c.invInkSoft}55`;
  return /* @__PURE__ */ jsxs("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flex: "1 1 auto", minHeight: 0 }, children: [
      /* @__PURE__ */ jsx("div", { style: { width: "42%", minHeight: 0, overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
      /* @__PURE__ */ jsxs("div", { style: { flex: 1, minWidth: 0, background: c.invBg, color: c.invInk, display: "flex", flexDirection: "column" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { padding: "12px 14px", display: "flex", alignItems: "center", justifyContent: "space-between", flex: "0 0 auto" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700 }, children: [
            m.brand,
            /* @__PURE__ */ jsx("span", { style: { color: c.invAccent }, children: "." })
          ] }),
          /* @__PURE__ */ jsxs("span", { style: { fontFamily: f.mono, fontSize: 8, opacity: 0.7 }, children: [
            "\u2605 ",
            m.rating
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 14px" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: c.invAccent, marginBottom: 8 }, children: m.category }),
          /* @__PURE__ */ jsx("h1", { style: { fontFamily: f.display, fontSize: 24, fontWeight: 800, lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }, children: heading }),
          /* @__PURE__ */ jsxs("p", { style: { fontSize: 11, lineHeight: 1.5, opacity: 0.82, margin: "10px 0 0" }, children: [
            content.hero.leadParagraph?.slice(0, 96),
            "\u2026"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${s.length}, 1fr)`, borderTop: div, flex: "0 0 auto" }, children: s.map((st, i) => /* @__PURE__ */ jsxs("div", { style: { padding: "9px 6px", textAlign: "center", borderRight: i < s.length - 1 ? div : void 0 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.display, fontSize: 16, fontWeight: 800, color: c.invAccent, lineHeight: 1 }, children: [
            st.num,
            /* @__PURE__ */ jsx("span", { style: { fontSize: 10 }, children: st.unit })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 7, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.65, marginTop: 3 }, children: st.label })
        ] }, i)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { flex: "0 0 auto", padding: "11px 16px 9px", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.12em", color: c.accent, marginBottom: 7 }, children: mn?.eyebrow }),
      (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 8, padding: "5px 0", borderTop: i ? `1px solid ${c.lineSoft}` : "none" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { minWidth: 0 }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
          /* @__PURE__ */ jsx("div", { style: { fontFamily: f.mono, fontSize: 8.5, color: c.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.desc })
        ] }),
        /* @__PURE__ */ jsx("span", { style: { fontFamily: f.mono, fontSize: 10, fontWeight: 700, color: c.accent, flex: "0 0 auto" }, children: it.price })
      ] }, i))
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { flex: "0 0 auto", padding: "9px 16px", background: c.bgAlt, borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, lineHeight: 1.4 }, children: renderEm(q.text, c.accent, false) }),
      /* @__PURE__ */ jsxs("div", { style: { fontFamily: f.mono, fontSize: 8, textTransform: "uppercase", letterSpacing: "0.06em", color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }),
    /* @__PURE__ */ jsxs("a", { style: { background: c.accent, color: c.accentInk, padding: "13px 16px", textAlign: "center", fontSize: 12, fontWeight: 700, flex: "0 0 auto", display: "block" }, children: [
      content.cta.primary.label,
      " \u2192"
    ] })
  ] });
}
function StackedFamily({ theme, content }) {
  const c = theme.colors, f = theme.fonts, r = theme.radii, v = theme.voice;
  const m = content.meta, mn = content.menu, q = content.quote;
  const heading = content.hero.headingLines.join(" ").replace(/\[\[|\]\]/g, "");
  return /* @__PURE__ */ jsxs("div", { style: { background: c.bg, color: c.ink, fontFamily: f.body, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden", fontVariantNumeric: "tabular-nums" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", borderBottom: `1px solid ${c.line}`, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontFamily: f.display, fontSize: 14, fontWeight: 700, letterSpacing: "-0.015em" }, children: m.brand }),
      /* @__PURE__ */ jsx("a", { style: { background: c.accent, color: c.accentInk, padding: "7px 13px", borderRadius: r.btn, fontSize: 11, fontWeight: 600 }, children: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { padding: "14px 18px 10px", textAlign: "center", flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "inline-flex", alignItems: "center", gap: 5, padding: "4px 10px", background: c.accentSoft, color: c.accent, borderRadius: 999, fontSize: 10, fontWeight: 500, marginBottom: 9 }, children: [
        /* @__PURE__ */ jsx("span", { style: { width: 5, height: 5, background: c.accent, borderRadius: "50%" } }),
        m.category,
        " \xB7 ",
        m.address.split(",").pop()?.trim()
      ] }),
      /* @__PURE__ */ jsx("h1", { style: { fontFamily: f.display, fontSize: 23, fontWeight: v.displayWeight, lineHeight: 1.04, letterSpacing: "-0.025em", margin: "0 auto", maxWidth: "94%" }, children: heading }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "center", gap: 8, fontSize: 11, color: c.inkSoft, marginTop: 9, alignItems: "center" }, children: [
        /* @__PURE__ */ jsx("span", { style: { color: c.accent }, children: "\u2605\u2605\u2605\u2605\u2605" }),
        /* @__PURE__ */ jsx("b", { children: m.rating }),
        /* @__PURE__ */ jsx("span", { style: { color: c.inkFaint }, children: "\xB7" }),
        /* @__PURE__ */ jsxs("span", { children: [
          m.reviewsN,
          " \u043E\u0442\u0437\u044B\u0432\u043E\u0432"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { flex: "1 1 auto", minHeight: 50, margin: "0 18px", borderRadius: r.photo, overflow: "hidden" }, children: /* @__PURE__ */ jsx("img", { src: content.hero.photoSrc, alt: "", loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", filter: v.photoFilter, display: "block" } }) }),
    /* @__PURE__ */ jsx("div", { style: { padding: "11px 18px 4px", flex: "0 0 auto" }, children: (mn?.items || []).slice(0, 3).map((it, i) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "8px 11px", marginBottom: 6, border: `1px solid ${c.line}`, borderRadius: r.btn, background: c.bgAlt }, children: [
      /* @__PURE__ */ jsxs("div", { style: { minWidth: 0 }, children: [
        /* @__PURE__ */ jsx("div", { style: { fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.name }),
        /* @__PURE__ */ jsx("div", { style: { fontSize: 9.5, color: c.inkFaint, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }, children: it.desc })
      ] }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11.5, fontWeight: 700, color: c.accent, whiteSpace: "nowrap", flex: "0 0 auto" }, children: it.price })
    ] }, i)) }),
    /* @__PURE__ */ jsx("div", { style: { padding: "6px 18px 10px", flex: "0 0 auto" }, children: /* @__PURE__ */ jsxs("div", { style: { padding: "10px 12px", borderRadius: r.card, background: c.accentSoft, fontSize: 11, lineHeight: 1.4 }, children: [
      renderEm(q.text, c.accent, false),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 9, color: c.inkSoft, marginTop: 5 }, children: [
        q.authorName,
        " \xB7 ",
        q.authorSource
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { style: { padding: "12px 18px", display: "flex", gap: 8, flex: "0 0 auto", borderTop: `1px solid ${c.line}` }, children: [
      /* @__PURE__ */ jsx("a", { style: { flex: 1, background: c.accent, color: c.accentInk, padding: "12px", borderRadius: r.btn, textAlign: "center", fontSize: 13, fontWeight: 600 }, children: content.cta.primary.label }),
      /* @__PURE__ */ jsx("a", { style: { padding: "12px 16px", border: `1px solid ${c.line}`, borderRadius: r.btn, textAlign: "center", fontSize: 12, whiteSpace: "nowrap", display: "flex", alignItems: "center", color: c.ink }, children: content.cta.phone })
    ] })
  ] });
}
var FAMILIES = {
  editorial: EditorialFamily,
  bento: BentoFamily,
  display: DisplayFamily,
  split: SplitFamily,
  stacked: StackedFamily
};
function PresetRenderer({ preset, content }) {
  const theme = getTheme(preset.themeId);
  const Family = FAMILIES[preset.familyId] ?? FAMILIES.editorial;
  if (theme.family !== preset.familyId) {
    if (typeof console !== "undefined" && console.warn) {
      console.warn(`[@samosite/canon] preset mismatch: theme "${theme.id}" is for family "${theme.family}", but preset.familyId is "${preset.familyId}"`);
    }
  }
  return /* @__PURE__ */ jsx(Family, { theme, content });
}
function MiniChrome({ host, children, height = 720 }) {
  return /* @__PURE__ */ jsxs("div", { style: {
    overflow: "hidden",
    borderRadius: 12,
    border: `1px solid ${VT.lineSoft}`,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minWidth: 0,
    height,
    background: VT.white
  }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", background: "#fff", borderBottom: `1px solid ${VT.line}`, flex: "0 0 auto" }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsx("span", { style: { width: 7, height: 7, borderRadius: "50%", background: "#e3decf" } }),
      /* @__PURE__ */ jsxs("span", { style: { marginLeft: 10, fontFamily: VT.font.mono, fontSize: 11, color: VT.inkFaint }, children: [
        host,
        ".",
        BRAND.domain
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { flex: 1, display: "flex", flexDirection: "column", minHeight: 0 }, children })
  ] });
}
var EX_U = (id, w = 720) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
var fixtureCoffeeLena = {
  meta: { brand: "\u0423\u0442\u0440\u043E \u0443 \u041B\u0435\u043D\u044B", host: "lena", category: "\u041A\u043E\u0444\u0435\u0439\u043D\u044F", address: "\u041F\u043B\u0430\u0442\u043E\u043D\u043E\u0432\u0430 12, \u0412\u043E\u0440\u043E\u043D\u0435\u0436", since: "2019", rating: "4.9", reviewsN: 128 },
  hero: {
    headingLines: ["\u041A\u043E\u0444\u0435", "[[&]] \u0437\u0430\u0432\u0442\u0440\u0430\u043A\u0438", "\u0441 07:30"],
    leadParagraph: "\u041B\u0435\u043D\u0430 \u043E\u0431\u0436\u0430\u0440\u0438\u0432\u0430\u0435\u0442 \u0437\u0435\u0440\u043D\u043E \u0441\u0430\u043C\u0430, \u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E. \u0410\u043B\u044C\u0442\u0435\u0440\u043D\u0430\u0442\u0438\u0432\u043D\u043E\u0435 \u043C\u043E\u043B\u043E\u043A\u043E \u0431\u0435\u0437 \u0434\u043E\u043F\u043B\u0430\u0442. \u0412\u044B\u043D\u043E\u0441 \u0437\u0430 \u0442\u0440\u0438 \u043C\u0438\u043D\u0443\u0442\u044B \u2014 \u0443\u0441\u043F\u0435\u0435\u0442\u0435 \u043D\u0430 \u0440\u0430\u0431\u043E\u0442\u0443.",
    photoSrc: EX_U("photo-1495474472287-4d71bcdd2085", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0441\u0442\u043E\u0439\u043A\u0430, \u0447\u0435\u0442\u0432\u0435\u0440\u0433 08:14"
  },
  stats: [
    { num: "07:30", label: "\u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435" },
    { num: "3", unit: " \u043C\u0438\u043D", label: "\u0432\u044B\u043D\u043E\u0441" },
    { num: "0 \u20BD", label: "\u0430\u043B\u044C\u0442.\u043C\u043E\u043B\u043E\u043A\u043E" }
  ],
  menu: {
    eyebrow: "\u041C\u0435\u043D\u044E \u0443\u0442\u0440\u0430",
    title: "\u0427\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 [[\u043A\u0430\u0436\u0434\u044B\u0439 \u0434\u0435\u043D\u044C]]",
    items: [
      { num: "01", name: "\u041A\u0430\u043F\u0443\u0447\u0438\u043D\u043E", desc: "250 \u043C\u043B \xB7 \u0430\u043B\u044C\u0442.\u043C\u043E\u043B\u043E\u043A\u043E \u0431\u0435\u0437 \u0434\u043E\u043F\u043B\u0430\u0442", price: "220 \u20BD" },
      { num: "02", name: "\u0420\u0430\u0444 \u0432\u0430\u043D\u0438\u043B\u044C\u043D\u044B\u0439", desc: "300 \u043C\u043B \xB7 \u043D\u0430 \u0441\u043B\u0438\u0432\u043A\u0430\u0445", price: "280 \u20BD" },
      { num: "03", name: "\u0421\u044B\u0440\u043D\u0438\u043A\u0438 \u0441\u043E \u0441\u043C\u0435\u0442\u0430\u043D\u043E\u0439", desc: "3 \u0448\u0442 \xB7 180 \u0433", price: "340 \u20BD" },
      { num: "04", name: "\u0410\u0432\u043E\u043A\u0430\u0434\u043E-\u0442\u043E\u0441\u0442", desc: "\u0441 \u044F\u0439\u0446\u043E\u043C-\u043F\u0430\u0448\u043E\u0442", price: "390 \u20BD" }
    ]
  },
  quote: { text: '\xAB\u0420\u0435\u0431\u044F\u0442\u0430 \u043F\u043E\u043C\u043D\u044F\u0442 \u043C\u043E\u0451 [["\u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u043E"]] \u0441 \u0442\u0440\u0435\u0442\u044C\u0435\u0433\u043E \u0440\u0430\u0437\u0430.\xBB', authorName: "\u0410\u043B\u0438\u043D\u0430 \u041A.", authorSource: "2\u0413\u0418\u0421", authorWhen: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A \u043F\u0440\u0438\u0445\u043E\u0434\u0443" }, phone: "+7 (900) 000-00-12" }
};
var fixtureBakeryDom = {
  meta: { brand: "\u041F\u0435\u043A\u0430\u0440\u043D\u044F \xAB\u0414\u043E\u043C\xBB", host: "dom-bakery", category: "\u041F\u0435\u043A\u0430\u0440\u043D\u044F", address: "\u0411\u043E\u043B\u044C\u0448\u0430\u044F \u041A\u043E\u043D\u044E\u0448\u0435\u043D\u043D\u0430\u044F 9, \u041F\u0438\u0442\u0435\u0440", since: "2017", rating: "4.8", reviewsN: 246 },
  hero: {
    headingLines: ["\u0425\u043B\u0435\u0431", "\u043D\u0430 [[\u0437\u0430\u043A\u0432\u0430\u0441\u043A\u0435]]", "\u0434\u043E \u043F\u043E\u043B\u0443\u0434\u043D\u044F"],
    leadParagraph: "\u041F\u0435\u0447\u0451\u043C \u0432 5 \u0443\u0442\u0440\u0430, \u0432\u044B\u043A\u043B\u0430\u0434\u044B\u0432\u0430\u0435\u043C \u043A 7. \u041F\u043E\u0441\u043B\u0435 12:00 \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u2014 \u043B\u0443\u0447\u0448\u0435 \u0431\u0440\u0430\u0442\u044C \u0441 \u0443\u0442\u0440\u0430 \u0438\u043B\u0438 \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C \u043D\u0430\u043A\u0430\u043D\u0443\u043D\u0435 \u0447\u0435\u0440\u0435\u0437 Telegram.",
    photoSrc: EX_U("photo-1509440159596-0249088772ff", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043F\u0435\u0447\u044C, \u0441\u0440\u0435\u0434\u0430 06:30"
  },
  stats: [
    { num: "05:00", label: "\u043D\u0430\u0447\u0430\u043B\u043E \u0432\u044B\u043F\u0435\u0447\u043A\u0438" },
    { num: "18", label: "\u0432\u0438\u0434\u043E\u0432 \u0445\u043B\u0435\u0431\u0430" },
    { num: "0 \u20BD", label: "\u0434\u0440\u043E\u0436\u0436\u0435\u0439" }
  ],
  menu: {
    eyebrow: "\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0432 \u043F\u0435\u0447\u043A\u0435",
    title: "\u0427\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 [[\u043D\u0430 \u0437\u0430\u0432\u0442\u0440\u0430]]",
    items: [
      { num: "01", name: "\u0411\u043E\u0440\u043E\u0434\u0438\u043D\u0441\u043A\u0438\u0439 \u043D\u0430 \u0437\u0430\u043A\u0432\u0430\u0441\u043A\u0435", desc: "500 \u0433 \xB7 \u0441 \u0442\u043C\u0438\u043D\u043E\u043C", price: "240 \u20BD" },
      { num: "02", name: "\u0411\u0430\u0433\u0435\u0442 \u0444\u0435\u0440\u043C\u0435\u0440\u0441\u043A\u0438\u0439", desc: "320 \u0433 \xB7 \u0445\u0440\u0443\u0441\u0442\u044F\u0449\u0430\u044F \u043A\u043E\u0440\u043A\u0430", price: "180 \u20BD" },
      { num: "03", name: "\u0427\u0438\u0430\u0431\u0430\u0442\u0442\u0430 \u043E\u043B\u0438\u0432\u043A\u043E\u0432\u0430\u044F", desc: "280 \u0433", price: "210 \u20BD" },
      { num: "04", name: "\u0421\u043B\u043E\u0439\u043A\u0430 \u0441 \u044F\u0431\u043B\u043E\u043A\u043E\u043C", desc: "110 \u0433 \xB7 \u0434\u043E\u043C\u0430\u0448\u043D\u0435\u0435 \u0442\u0435\u0441\u0442\u043E", price: "120 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0425\u043B\u0435\u0431 \u043A\u0430\u043A \u0443 \u0431\u0430\u0431\u0443\u0448\u043A\u0438 \u0432 \u0434\u0435\u0440\u0435\u0432\u043D\u0435. [[\u041A\u043E\u0440\u043A\u0430 \u0442\u0430\u043A\u0430\u044F \u0436\u0435]], \u043D\u0435 \u043A\u0430\u043A \u0432 \u043C\u0430\u0433\u0430\u0437\u0438\u043D\u0435.\xBB", authorName: "\u041C\u0430\u0440\u0438\u044F \u0420.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "5 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043A\u0430\u0437\u0430\u0442\u044C \u043A \u0443\u0442\u0440\u0443" }, phone: "+7 (900) 000-00-11" }
};
var fixtureAutoPark = {
  meta: { brand: "Park \xB7 \u0430\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441", host: "park-auto", category: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441", address: "\u041F\u0440\u043E\u043C\u044B\u0448\u043B\u0435\u043D\u043D\u0430\u044F 14, \u0421\u0430\u043C\u0430\u0440\u0430", since: "2013", rating: "4.8", reviewsN: 214 },
  hero: {
    headingLines: ["\u0414\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", "\u0437\u0430 [[30 \u043C\u0438\u043D\u0443\u0442]]", "\u0431\u0435\u0437 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432"],
    leadParagraph: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0437\u0432\u043E\u043D\u043E\u043A \u0438 \u0440\u0430\u0441\u0447\u0451\u0442. \u041F\u043E\u0441\u043B\u0435 \xAB\u0434\u0430\xBB \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u043C \u2014 \u0431\u0435\u0437 \u0441\u044E\u0440\u043F\u0440\u0438\u0437\u043E\u0432 \u0432 \u0447\u0435\u043A\u0435. \u0421\u0435\u0433\u043E\u0434\u043D\u044F \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B \u043E\u043A\u043D\u0430 14:00 \u0438 16:30.",
    photoSrc: EX_U("photo-1486262715619-67b85e0b08d3", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0431\u043E\u043A\u0441 \u21162, \u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A"
  },
  stats: [
    { num: "12", unit: " \u043B\u0435\u0442", label: "\u043D\u0430 \u043E\u0434\u043D\u043E\u043C \u043C\u0435\u0441\u0442\u0435" },
    { num: "4.8", label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433 2\u0413\u0418\u0421" },
    { num: "6 \u043C\u0435\u0441", label: "\u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441 \u0431\u0435\u0437 \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u0435\u043A",
    title: "\u0427\u0442\u043E [[\u0434\u0435\u043B\u0430\u0435\u043C]] \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
    items: [
      { num: "01", name: "\u041A\u043E\u043C\u043F\u044C\u044E\u0442\u0435\u0440\u043D\u0430\u044F \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0430", desc: "\u0445\u043E\u0434\u043E\u0432\u0430\u044F, \u0442\u043E\u0440\u043C\u043E\u0437\u0430, \u042D\u0411\u0423 \xB7 30 \u043C\u0438\u043D", price: "\u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E" },
      { num: "02", name: "\u0417\u0430\u043C\u0435\u043D\u0430 \u043C\u0430\u0441\u043B\u0430 + \u0444\u0438\u043B\u044C\u0442\u0440", desc: "\u043E\u0440\u0438\u0433\u0438\u043D\u0430\u043B \u0438\u043B\u0438 \u0430\u043D\u0430\u043B\u043E\u0433", price: "\u043E\u0442 1 200 \u20BD" },
      { num: "03", name: "\u0422\u043E\u0440\u043C\u043E\u0437\u043D\u044B\u0435 \u043A\u043E\u043B\u043E\u0434\u043A\u0438", desc: "\u043F\u0435\u0440\u0435\u0434\u043D\u0438\u0435 / \u0437\u0430\u0434\u043D\u0438\u0435", price: "\u043E\u0442 2 800 \u20BD" },
      { num: "04", name: "\u0420\u0430\u0437\u0432\u0430\u043B-\u0441\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u0435", desc: "3D \xB7 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F 6 \u043C\u0435\u0441", price: "\u043E\u0442 2 400 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u0437\u0432\u043E\u043D\u0438\u043B\u0438, \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u043B\u0438, \u0447\u0442\u043E \u0438 \u0437\u0430\u0447\u0435\u043C. [[\u041D\u0438\u0447\u0435\u0433\u043E \u043B\u0438\u0448\u043D\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0432\u044F\u0437\u0430\u043B\u0438]].\xBB", authorName: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u0412.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", authorWhen: "6 \u0434\u043D\u0435\u0439 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u0434\u0438\u0430\u0433\u043D\u043E\u0441\u0442\u0438\u043A\u0443" }, phone: "+7 (900) 000-00-08" }
};
var fixtureNailsAnna = {
  meta: { brand: "\u0421\u0442\u0443\u0434\u0438\u044F \u0410\u043D\u043D\u044B", host: "anna-nails", category: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440", address: "\u041A\u0443\u0439\u0431\u044B\u0448\u0435\u0432\u0430 8, \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", since: "2017", rating: "5.0", reviewsN: 86 },
  hero: {
    headingLines: ["\u0410\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439", "\u043C\u0430\u043D\u0438\u043A\u044E\u0440,", "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F [[3 \u043D\u0435\u0434\u0435\u043B\u0438]]"],
    leadParagraph: "\u0420\u0430\u0431\u043E\u0442\u0430\u0435\u0442 \u043E\u0434\u043D\u0430 \u0410\u043D\u043D\u0430, \u043D\u0435 \u043A\u043E\u043D\u0432\u0435\u0439\u0435\u0440. \u0417\u0430\u043F\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 Telegram, \u0431\u0435\u0437 \u0437\u0432\u043E\u043D\u043A\u043E\u0432 \u0438 CRM. \u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 \u0434\u0432\u0430 \u043D\u043E\u0433\u0442\u044F \u0432 \u043F\u043E\u0434\u0430\u0440\u043E\u043A \u043F\u0440\u0438 \u043F\u0435\u0440\u0432\u043E\u043C \u0432\u0438\u0437\u0438\u0442\u0435.",
    photoSrc: EX_U("photo-1604654894610-df63bc536371", 720),
    gallery: [EX_U("photo-1610992015732-2449b76344bc", 480), EX_U("photo-1632345031435-8727f6897d53", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0440\u0430\u0431\u043E\u0442\u0430, \u0447\u0435\u0442\u0432\u0435\u0440\u0433"
  },
  stats: [
    { num: "21", unit: " \u0434\u0435\u043D\u044C", label: "\u0441\u0440\u0435\u0434\u043D\u044F\u044F \u043D\u043E\u0441\u043A\u0430" },
    { num: "5.0", label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433" },
    { num: "9", unit: " \u043B\u0435\u0442", label: "\u043E\u043F\u044B\u0442\u0430" }
  ],
  menu: {
    eyebrow: "\u0426\u0435\u043D\u044B \u0437\u0430 \u043C\u0430\u0439",
    title: "\u0427\u0442\u043E \u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 [[\u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E]]",
    items: [
      { num: "01", name: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 + \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u0435", desc: "\u0430\u043F\u043F\u0430\u0440\u0430\u0442\u043D\u044B\u0439, \u0431\u0435\u0440\u0435\u0436\u043D\u043E \xB7 1,5 \u0447", price: "2 400 \u20BD" },
      { num: "02", name: "\u0414\u0438\u0437\u0430\u0439\u043D \u043D\u0430 2 \u043D\u043E\u0433\u0442\u044F", desc: "\u043E\u0442 \u043F\u0440\u043E\u0441\u0442\u043E\u0433\u043E \u0434\u043E \u0441\u043B\u043E\u0436\u043D\u043E\u0433\u043E", price: "300 \u20BD" },
      { num: "03", name: "\u0421\u043D\u044F\u0442\u0438\u0435 \u0447\u0443\u0436\u043E\u0433\u043E \u043F\u043E\u043A\u0440\u044B\u0442\u0438\u044F", desc: "\u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E, \u0431\u0435\u0437 \u0432\u0440\u0435\u0434\u0430", price: "500 \u20BD" },
      { num: "04", name: "\u0423\u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u0435 \u0430\u043A\u0440\u0438\u0433\u0435\u043B\u0435\u043C", desc: "\u0434\u043B\u044F \u0442\u043E\u043D\u043A\u0438\u0445 \u0438 \u043B\u043E\u043C\u043A\u0438\u0445", price: "600 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0410\u043D\u043D\u0430 \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u0430\u044F, \u043E\u0431\u044A\u044F\u0441\u043D\u044F\u0435\u0442, \u0447\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u0442. [[\u041D\u0438\u043A\u043E\u0433\u0434\u0430 \u043D\u0435 \u0431\u044B\u043B\u043E \u0441\u043A\u043E\u043B\u043E\u0432]].\xBB", authorName: "\u041E\u043B\u0435\u0441\u044F \u041D.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "3 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u0432 Telegram" }, phone: "@anna_studio" }
};
var fixtureBrowsSochi = {
  meta: { brand: "Brow Bar \u0421\u043E\u043B\u044C", host: "sol-brows", category: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B", address: "\u041D\u0430\u0432\u0430\u0433\u0438\u043D\u0441\u043A\u0430\u044F 9, \u0421\u043E\u0447\u0438", since: "2019", rating: "4.9", reviewsN: 154 },
  hero: {
    headingLines: ["\u0411\u0440\u043E\u0432\u0438", "\u043F\u043E [[\u0432\u0430\u0448\u0435\u0439]]", "\u0444\u043E\u0440\u043C\u0435 \u043B\u0438\u0446\u0430"],
    leadParagraph: "\u041D\u0435 \u0440\u0438\u0441\u0443\u0435\u043C \u0447\u0443\u0436\u0443\u044E \u0444\u043E\u0440\u043C\u0443 \u2014 \u043F\u043E\u0434\u0447\u0451\u0440\u043A\u0438\u0432\u0430\u0435\u043C \u0432\u0430\u0448\u0443. \u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F, \u043B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435, \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435 \u0437\u0430 \u043E\u0434\u0438\u043D \u0432\u0438\u0437\u0438\u0442. \u0414\u0435\u0440\u0436\u0438\u0442\u0441\u044F 6 \u043D\u0435\u0434\u0435\u043B\u044C.",
    photoSrc: EX_U("photo-1633681926022-84c23e8cb2d6", 720),
    gallery: [EX_U("photo-1522335789203-aabd1fc54bc9", 480), EX_U("photo-1457972729786-0411a3b2b626", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0441\u0442\u0443\u0434\u0438\u044F, \u0441\u0440\u0435\u0434\u0430"
  },
  stats: [
    { num: "6", unit: " \u043D\u0435\u0434", label: "\u0434\u0435\u0440\u0436\u0438\u0442\u0441\u044F" },
    { num: "40", unit: " \u043C\u0438\u043D", label: "\u043D\u0430 \u0432\u0438\u0437\u0438\u0442" },
    { num: "4.9", label: "\u0440\u0435\u0439\u0442\u0438\u043D\u0433" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441",
    title: "\u0427\u0442\u043E [[\u0432\u044B\u0431\u0438\u0440\u0430\u044E\u0442]] \u0447\u0430\u0449\u0435",
    items: [
      { num: "01", name: "\u041A\u043E\u0440\u0440\u0435\u043A\u0446\u0438\u044F + \u043E\u043A\u0440\u0430\u0448\u0438\u0432\u0430\u043D\u0438\u0435", desc: "\u0432\u043E\u0441\u043A, \u043F\u0438\u043D\u0446\u0435\u0442, \u043A\u0440\u0430\u0441\u043A\u0430 \u0438\u043B\u0438 \u0445\u043D\u0430", price: "1 400 \u20BD" },
      { num: "02", name: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0431\u0440\u043E\u0432\u0435\u0439", desc: "\u0444\u0438\u043A\u0441\u0430\u0446\u0438\u044F \u0444\u043E\u0440\u043C\u044B \u043D\u0430 6 \u043D\u0435\u0434\u0435\u043B\u044C", price: "2 200 \u20BD" },
      { num: "03", name: "\u041B\u0430\u043C\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u0440\u0435\u0441\u043D\u0438\u0446", desc: "\u0431\u0435\u0437 \u043D\u0430\u0440\u0430\u0449\u0438\u0432\u0430\u043D\u0438\u044F, \u0441\u0432\u043E\u0439 \u043E\u0431\u044A\u0451\u043C", price: "2 600 \u20BD" },
      { num: "04", name: "\u041A\u043E\u043C\u043F\u043B\u0435\u043A\u0441 \u0431\u0440\u043E\u0432\u0438 + \u0440\u0435\u0441\u043D\u0438\u0446\u044B", desc: "\u0437\u0430 \u043E\u0434\u0438\u043D \u0432\u0438\u0437\u0438\u0442, \u0432\u044B\u0433\u043E\u0434\u043D\u0435\u0435", price: "4 200 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u041F\u0435\u0440\u0432\u044B\u0439 \u0440\u0430\u0437 brow-\u043C\u0430\u0441\u0442\u0435\u0440 \u043D\u0435 \u0441\u0434\u0435\u043B\u0430\u043B\u0430 \u043C\u043D\u0435 [[\u0447\u0443\u0436\u0438\u0435 \u0431\u0440\u043E\u0432\u0438]]. \u0421\u0432\u043E\u0438, \u043D\u043E \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u044B\u0435.\xBB", authorName: "\u041A\u0430\u0440\u0438\u043D\u0430 \u0422.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "1 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043E\u043D\u043B\u0430\u0439\u043D" }, phone: "\u043E\u043D\u043B\u0430\u0439\u043D-\u0437\u0430\u043F\u0438\u0441\u044C" }
};
var fixtureBarberFedor = {
  meta: { brand: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xAB\u0424\u0451\u0434\u043E\u0440\xBB", host: "fedor-barber", category: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F", address: "\u041D\u0438\u043A\u0438\u0442\u0441\u043A\u0438\u0439 3, \u041C\u043E\u0441\u043A\u0432\u0430", since: "2018", rating: "4.9", reviewsN: 312 },
  hero: {
    headingLines: ["\u0421\u0442\u0440\u0438\u0436\u043A\u0430", "[[+]] \u0431\u043E\u0440\u043E\u0434\u0430", "\u0437\u0430 45 \u043C\u0438\u043D\u0443\u0442"],
    leadParagraph: "\u0422\u043E\u043B\u044C\u043A\u043E \u043C\u0443\u0436\u0441\u043A\u0438\u0435 \u0441\u0442\u0440\u0438\u0436\u043A\u0438 \u0438 \u0431\u043E\u0440\u043E\u0434\u0430. \u0411\u0435\u0437 \u0441\u0430\u043B\u043E\u043D\u0430, \u0431\u0435\u0437 \u0436\u0435\u043D\u0441\u043A\u043E\u0433\u043E \u0437\u0430\u043B\u0430, \u0431\u0435\u0437 \u043C\u0443\u0437\u044B\u043A\u0438 \u0432 \u043D\u0430\u0443\u0448\u043D\u0438\u043A\u0430\u0445 \u043C\u0430\u0441\u0442\u0435\u0440\u0430. \u0412\u0438\u0441\u043A\u0438 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u2014 \u043F\u043E\u0441\u043B\u0435 \u0441\u0442\u0440\u0438\u0436\u043A\u0438, \u0435\u0441\u043B\u0438 \u0445\u043E\u0442\u0438\u0442\u0435.",
    photoSrc: EX_U("photo-1503951914875-452162b0f3f1", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043A\u0440\u0435\u0441\u043B\u043E, \u0441\u0443\u0431\u0431\u043E\u0442\u0430",
    gallery: [
      EX_U("photo-1599351431613-18ef1fdd27e1", 480),
      EX_U("photo-1622286342621-4bd786c2447c", 480)
    ]
  },
  stats: [
    { num: "45", unit: " \u043C\u0438\u043D", label: "\u043D\u0430 \u0441\u0442\u0440\u0438\u0436\u043A\u0443" },
    { num: "8", unit: " \u043B\u0435\u0442", label: "\u0441 2018" },
    { num: "4", label: "\u043C\u0430\u0441\u0442\u0435\u0440\u0430" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441",
    title: "\u0427\u0442\u043E [[\u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442]] \u043F\u043E\u0441\u0442\u043E\u044F\u043D\u043D\u044B\u0435",
    items: [
      { num: "01", name: "\u041C\u0443\u0436\u0441\u043A\u0430\u044F \u0441\u0442\u0440\u0438\u0436\u043A\u0430", desc: "\u043C\u0430\u0448\u0438\u043D\u043A\u0430 + \u043D\u043E\u0436\u043D\u0438\u0446\u044B", price: "2 200 \u20BD" },
      { num: "02", name: "\u0421\u0442\u0440\u0438\u0436\u043A\u0430 + \u0431\u043E\u0440\u043E\u0434\u0430", desc: "\u0441 \u0433\u043E\u0440\u044F\u0447\u0438\u043C \u043F\u043E\u043B\u043E\u0442\u0435\u043D\u0446\u0435\u043C", price: "3 000 \u20BD" },
      { num: "03", name: "\u041A\u0430\u043C\u0443\u0444\u043B\u044F\u0436 \u0441\u0435\u0434\u0438\u043D\u044B", desc: "20 \u043C\u0438\u043D \xB7 \u0441\u0442\u043E\u0439\u043A\u043E", price: "1 200 \u20BD" },
      { num: "04", name: "\u041E\u043F\u0430\u0441\u043D\u043E\u0439 \u0431\u0440\u0438\u0442\u0432\u043E\u0439", desc: "\u0433\u043E\u043B\u043E\u0432\u0430 \u0438\u043B\u0438 \u0431\u043E\u0440\u043E\u0434\u0430", price: "1 800 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0425\u043E\u0436\u0443 \u043A \u0413\u043B\u0435\u0431\u0443 \u0442\u0440\u0435\u0442\u0438\u0439 \u0433\u043E\u0434. [[\u0412\u0441\u0435\u0433\u0434\u0430 \u0432\u0441\u043F\u043E\u043C\u0438\u043D\u0430\u0435\u0442]], \u043A\u0430\u043A \u0441\u0442\u0440\u0438\u0433\u043B\u0438 \u0432 \u043F\u0440\u043E\u0448\u043B\u044B\u0439 \u0440\u0430\u0437.\xBB", authorName: "\u0410\u043D\u0442\u043E\u043D \u041A.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442\u044B", authorWhen: "4 \u0434\u043D\u044F \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043A \u043C\u0430\u0441\u0442\u0435\u0440\u0443" }, phone: "+7 (900) 000-00-14" }
};
var fixtureFitnessMetod = {
  meta: { brand: "\u0421\u0442\u0443\u0434\u0438\u044F \xAB\u041C\u0435\u0442\u043E\u0434\xBB", host: "metod-studio", category: "\u041F\u0438\u043B\u0430\u0442\u0435\u0441", address: "\u041F\u0438\u043E\u043D\u0435\u0440\u0441\u043A\u0430\u044F 12, \u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", since: "2018", rating: "4.9", reviewsN: 187 },
  hero: {
    headingLines: ["\u041F\u0438\u043B\u0430\u0442\u0435\u0441", "\u0432 \u0433\u0440\u0443\u043F\u043F\u0435", "[[\u0438\u0437 \u0448\u0435\u0441\u0442\u0438]]"],
    leadParagraph: "\u041A\u0430\u0436\u0434\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u2014 \u043B\u0438\u0447\u043D\u043E\u0435 \u0432\u043D\u0438\u043C\u0430\u043D\u0438\u0435 \u0442\u0440\u0435\u043D\u0435\u0440\u0430. \u0411\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u044B\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441 \u0431\u0435\u0437 \u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0437\u0430. \u041F\u0435\u0440\u0432\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E, \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 50 \u043C\u0438\u043D\u0443\u0442.",
    photoSrc: EX_U("photo-1518611012118-696072aa579a", 720),
    gallery: [EX_U("photo-1571019613454-1cb2f99b2d8b", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0437\u0430\u043B, \u0443\u0442\u0440\u043E \u0432\u0442\u043E\u0440\u043D\u0438\u043A\u0430"
  },
  stats: [
    { num: "6", label: "\u0432 \u0433\u0440\u0443\u043F\u043F\u0435" },
    { num: "12", label: "\u0442\u0440\u0435\u043D\u0435\u0440\u043E\u0432" },
    { num: "8", unit: " \u043B\u0435\u0442", label: "\u0441\u0442\u0443\u0434\u0438\u0438" }
  ],
  menu: {
    eyebrow: "\u0410\u0431\u043E\u043D\u0435\u043C\u0435\u043D\u0442\u044B",
    title: "\u0427\u0442\u043E [[\u043F\u043E\u043A\u0443\u043F\u0430\u044E\u0442]] \u043D\u0430 \u043F\u0435\u0440\u0432\u044B\u0439 \u043C\u0435\u0441\u044F\u0446",
    items: [
      { num: "01", name: "\u0420\u0430\u0437\u043E\u0432\u043E\u0435 \u0437\u0430\u043D\u044F\u0442\u0438\u0435", desc: "\u043F\u0435\u0440\u0432\u043E\u0435 \u2014 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E", price: "1 400 \u20BD" },
      { num: "02", name: "4 \u0432 \u043C\u0435\u0441\u044F\u0446", desc: "\u0440\u0430\u0437 \u0432 \u043D\u0435\u0434\u0435\u043B\u044E", price: "5 200 \u20BD" },
      { num: "03", name: "8 \u0432 \u043C\u0435\u0441\u044F\u0446", desc: "\u0441\u0430\u043C\u044B\u0439 \u043F\u043E\u043F\u0443\u043B\u044F\u0440\u043D\u044B\u0439", price: "9 800 \u20BD" },
      { num: "04", name: "12 \u0432 \u043C\u0435\u0441\u044F\u0446", desc: "\u0434\u043B\u044F \u0440\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0445", price: "13 200 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0427\u0435\u0440\u0435\u0437 \u0442\u0440\u0438 \u043C\u0435\u0441\u044F\u0446\u0430 [[\u0437\u0430\u0431\u044B\u043B\u0430 \u043F\u0440\u043E \u0431\u043E\u043B\u044C \u0432 \u0441\u043F\u0438\u043D\u0435]]. \u0425\u043E\u0442\u044F \u043F\u0440\u0438\u0448\u043B\u0430 \u0442\u0443\u0434\u0430 \u0438\u043C\u0435\u043D\u043D\u043E \u0441 \u043D\u0435\u0439.\xBB", authorName: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0430 \u041C.", authorSource: "2\u0413\u0418\u0421", authorWhen: "1 \u043D\u0435\u0434\u0435\u043B\u044E \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043F\u0435\u0440\u0432\u043E\u0435" }, phone: "+7 (900) 000-00-50" }
};
var fixtureLegalSitnikov = {
  meta: { brand: "\u0421\u0438\u0442\u043D\u0438\u043A\u043E\u0432 \u0438 \u043F\u0430\u0440\u0442\u043D\u0451\u0440\u044B", host: "sitnikov-law", category: "\u042E\u0440.\u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430", address: "\u0422\u0432\u0435\u0440\u0441\u043A\u0430\u044F 14, \u043E\u0444. 412, \u041C\u043E\u0441\u043A\u0432\u0430", since: "2014", rating: "4.9", reviewsN: 312 },
  hero: {
    headingLines: ["\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u0434\u0435\u043D\u0435\u0433", "\u043E\u0442 [[\u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430]]", "\u0431\u0435\u0437 \u0430\u0432\u0430\u043D\u0441\u0430"],
    leadParagraph: "\u0411\u0435\u0440\u0451\u043C \u0434\u0435\u043B\u043E \u0432 \u0440\u0430\u0431\u043E\u0442\u0443 \u2014 \u043F\u043B\u0430\u0442\u0438\u0442\u0435 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u043E\u0441\u043B\u0435 \u0432\u044B\u0438\u0433\u0440\u044B\u0448\u0430. \u041F\u0435\u0440\u0432\u0430\u044F \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044F \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u0430 \u0438 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 40 \u043C\u0438\u043D\u0443\u0442. \u0421\u043A\u0430\u0436\u0435\u043C \u0441\u0440\u0430\u0437\u0443, \u0435\u0441\u0442\u044C \u043B\u0438 \u043F\u0435\u0440\u0441\u043F\u0435\u043A\u0442\u0438\u0432\u0430.",
    photoSrc: EX_U("photo-1497366754035-f200968a6e72", 720),
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u043E\u0444\u0438\u0441, \u0447\u0435\u0442\u0432\u0435\u0440\u0433"
  },
  stats: [
    { num: "94%", label: "\u0434\u0435\u043B \u0432\u044B\u0438\u0433\u0440\u0430\u043D\u043E" },
    { num: "312", label: "\u0434\u0435\u043B \u0432 2024" },
    { num: "10", unit: " \u043B\u0435\u0442", label: "\u0432 \u043E\u0434\u043D\u043E\u043C \u043E\u0444\u0438\u0441\u0435" }
  ],
  menu: {
    eyebrow: "\u0423\u0441\u043B\u0443\u0433\u0438",
    title: "\u0427\u0442\u043E [[\u0432\u0435\u0434\u0451\u043C]] \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
    items: [
      { num: "01", name: "\u0412\u043E\u0437\u0432\u0440\u0430\u0442 \u043E\u0442 \u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430", desc: "\u043D\u0435\u0443\u0441\u0442\u043E\u0439\u043A\u0430, \u0440\u0430\u0441\u0442\u043E\u0440\u0436\u0435\u043D\u0438\u0435, \u043F\u0440\u043E\u0441\u0440\u043E\u0447\u043A\u0430", price: "20% \u043E\u0442 \u0441\u0443\u043C\u043C\u044B" },
      { num: "02", name: "\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0435 \u0441\u043F\u043E\u0440\u044B", desc: "\u0440\u0430\u0437\u0432\u043E\u0434, \u0440\u0430\u0437\u0434\u0435\u043B, \u0430\u043B\u0438\u043C\u0435\u043D\u0442\u044B", price: "\u043E\u0442 30 000 \u20BD" },
      { num: "03", name: "\u0422\u0440\u0443\u0434\u043E\u0432\u044B\u0435 \u0441\u043F\u043E\u0440\u044B", desc: "\u0443\u0432\u043E\u043B\u044C\u043D\u0435\u043D\u0438\u0435, \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u0435", price: "\u043E\u0442 25 000 \u20BD" },
      { num: "04", name: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0438\u0442\u0435\u043B\u0435\u0439", desc: "\u0432\u043E\u0437\u0432\u0440\u0430\u0442, \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u044F, \u0437\u0430\u043C\u0435\u043D\u0430", price: "15% \u043E\u0442 \u0441\u0443\u043C\u043C\u044B" }
    ]
  },
  quote: { text: "\xAB\u0412\u0435\u0440\u043D\u0443\u043B\u0438 1,2 \u043C\u043B\u043D \u043D\u0435\u0443\u0441\u0442\u043E\u0439\u043A\u0438 \u043E\u0442 \u0437\u0430\u0441\u0442\u0440\u043E\u0439\u0449\u0438\u043A\u0430 \u0437\u0430 4 \u043C\u0435\u0441\u044F\u0446\u0430. [[\u041D\u0438\u043A\u0430\u043A\u0438\u0445 \u0430\u0432\u0430\u043D\u0441\u043E\u0432]] \u2014 \u0432\u0441\u0451 \u043F\u043E\u0441\u043B\u0435 \u0441\u0443\u0434\u0430.\xBB", authorName: "\u041C\u0438\u0445\u0430\u0438\u043B \u041F.", authorSource: "\u042F\u043D\u0434\u0435\u043A\u0441", authorWhen: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C\u0441\u044F \u043D\u0430 \u043A\u043E\u043D\u0441\u0443\u043B\u044C\u0442\u0430\u0446\u0438\u044E" }, phone: "+7 (900) 000-00-40" }
};
var fixturePhotoMarta = {
  meta: { brand: "\u041C\u0430\u0440\u0442\u0430 \xB7 \u0444\u043E\u0442\u043E\u0433\u0440\u0430\u0444", host: "marta-photo", category: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444", address: "\u0432\u044B\u0435\u0437\u0434 \u043F\u043E \u041C\u043E\u0441\u043A\u0432\u0435", since: "2020", rating: "5.0", reviewsN: 94 },
  hero: {
    headingLines: ["\u0421\u0435\u043C\u0435\u0439\u043D\u044B\u0435", "\u0441\u044A\u0451\u043C\u043A\u0438 [[\u0434\u043E\u043C\u0430]]", "\u0438 \u0432 \u0441\u0442\u0443\u0434\u0438\u0438"],
    leadParagraph: "\u0411\u0435\u0437 \u043F\u0440\u0438\u043D\u0443\u0436\u0434\u0451\u043D\u043D\u044B\u0445 \u043F\u043E\u0437 \u0438 \u043D\u0430\u0442\u044F\u043D\u0443\u0442\u044B\u0445 \u0443\u043B\u044B\u0431\u043E\u043A. \u0421\u043D\u0438\u043C\u0430\u044E \u043A\u0430\u043A \u0435\u0441\u0442\u044C: \u0434\u0435\u0442\u0438 \u0432\u043E\u0437\u044F\u0442\u0441\u044F, \u0431\u0430\u0431\u0443\u0448\u043A\u0430 \u0432\u043E\u0440\u0447\u0438\u0442, \u043A\u043E\u0442 \u043D\u0435 \u0432\u043F\u0438\u0441\u0430\u043B\u0441\u044F. \u041F\u0435\u0440\u0435\u0434\u0430\u044E 70+ \u043E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u043D\u043D\u044B\u0445 \u0444\u043E\u0442\u043E \u0447\u0435\u0440\u0435\u0437 2 \u043D\u0435\u0434\u0435\u043B\u0438.",
    photoSrc: EX_U("photo-1452587925148-ce544e77e70d", 720),
    gallery: [EX_U("photo-1606216794074-735e91aa2c92", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0441\u0435\u043C\u044C\u044F \u041A., \u044F\u043D\u0432\u0430\u0440\u044C"
  },
  stats: [
    { num: "70+", label: "\u0444\u043E\u0442\u043E \u0432 \u0441\u044A\u0451\u043C\u043A\u0435" },
    { num: "14", unit: " \u0434\u043D\u0435\u0439", label: "\u0434\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0430" },
    { num: "6", unit: " \u043B\u0435\u0442", label: "\u043E\u043F\u044B\u0442\u0430" }
  ],
  menu: {
    eyebrow: "\u0424\u043E\u0440\u043C\u0430\u0442\u044B",
    title: "\u0427\u0442\u043E [[\u0437\u0430\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442]] \u0447\u0430\u0449\u0435 \u0432\u0441\u0435\u0433\u043E",
    items: [
      { num: "01", name: "\u0421\u0435\u043C\u0435\u0439\u043D\u0430\u044F \u0441\u044A\u0451\u043C\u043A\u0430 \u0434\u043E\u043C\u0430", desc: "2 \u0447\u0430\u0441\u0430 \xB7 70+ \u0444\u043E\u0442\u043E", price: "18 000 \u20BD" },
      { num: "02", name: "\u041F\u0440\u043E\u0433\u0443\u043B\u043A\u0430 \u043D\u0430 \u0443\u043B\u0438\u0446\u0435", desc: "1,5 \u0447\u0430\u0441\u0430 \xB7 50+ \u0444\u043E\u0442\u043E", price: "14 000 \u20BD" },
      { num: "03", name: "\u0421\u0442\u0443\u0434\u0438\u044F", desc: "1 \u0447\u0430\u0441 \xB7 40+ \u0444\u043E\u0442\u043E \xB7 \u0430\u0440\u0435\u043D\u0434\u0430 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E", price: "12 000 \u20BD" },
      { num: "04", name: "\u0411\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0441\u0442\u044C + \u043F\u043E\u0441\u043B\u0435", desc: "\u043F\u0430\u043A\u0435\u0442 \u0438\u0437 \u0434\u0432\u0443\u0445 \u0441\u044A\u0451\u043C\u043E\u043A", price: "28 000 \u20BD" }
    ]
  },
  quote: { text: "\xAB\u0421\u044B\u043D \u043D\u0438 \u0441\u0435\u043A\u0443\u043D\u0434\u044B \u043D\u0435 \u0441\u0438\u0434\u0435\u043B \u043D\u0430 \u043C\u0435\u0441\u0442\u0435. \u041C\u0430\u0440\u0442\u0430 [[\u043F\u0440\u0435\u0432\u0440\u0430\u0442\u0438\u043B\u0430 \u044D\u0442\u043E \u0432 \u043F\u043B\u044E\u0441]] \u2014 \u043A\u0430\u0434\u0440\u044B \u0436\u0438\u0432\u044B\u0435, \u043D\u0435 \u043F\u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043E\u0447\u043D\u044B\u0435.\xBB", authorName: "\u042E\u043B\u0438\u044F \u0421.", authorSource: "Instagram", authorWhen: "\u043C\u0435\u0441\u044F\u0446 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u041D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 WhatsApp" }, phone: "\u043D\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u0432 WhatsApp" }
};
var fixtureTattooLine = {
  meta: { brand: "Line tattoo", host: "line-tattoo", category: "\u0422\u0430\u0442\u0443-\u0441\u0442\u0443\u0434\u0438\u044F", address: "\u041C\u0430\u043B\u0430\u044F \u0411\u0440\u043E\u043D\u043D\u0430\u044F 6, \u041C\u043E\u0441\u043A\u0432\u0430", since: "2016", rating: "5.0", reviewsN: 218 },
  hero: {
    headingLines: ["\u0422\u043E\u043D\u043A\u0438\u0435", "[[\u043B\u0438\u043D\u0438\u0438]] \u0438", "\u043C\u0438\u043D\u0438\u043C\u0430\u043B\u0438\u0437\u043C"],
    leadParagraph: "\u0422\u043E\u043B\u044C\u043A\u043E \u0442\u043E\u043D\u043A\u0438\u0435 \u043B\u0438\u043D\u0438\u0438, \u043C\u0438\u043D\u0438\u043C\u0430\u043B \u0438 \u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F. \u041D\u0438\u043A\u0430\u043A\u043E\u0433\u043E \u043E\u043B\u0434\u0441\u043A\u0443\u043B\u0430, \u0440\u0435\u0430\u043B\u0438\u0437\u043C\u0430 \u0438 \u0446\u0432\u0435\u0442\u043D\u044B\u0445 \u043F\u043E\u0440\u0442\u0440\u0435\u0442\u043E\u0432. \u0417\u0430\u043F\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 \u044D\u0441\u043A\u0438\u0437 \u2014 \u043F\u0440\u0438\u043D\u043E\u0441\u0438\u0442\u0435 \u0438\u0434\u0435\u044E, \u043E\u0431\u0441\u0443\u0436\u0434\u0430\u0435\u043C \u0440\u0430\u0437\u043C\u0435\u0440 \u0438 \u043C\u0435\u0441\u0442\u043E.",
    photoSrc: EX_U("photo-1565058379802-bbe93b2f703a", 720),
    gallery: [EX_U("photo-1611501275019-9b5cda994e8d", 480), EX_U("photo-1542856391-010fb87dcfed", 480)],
    photoCaption: "\u0424\u043E\u0442\u043E \xB7 \u0440\u0430\u0431\u043E\u0442\u0430 \u0412\u043B\u0430\u0434\u0430, \u043C\u0430\u0440\u0442"
  },
  stats: [
    { num: "4", label: "\u043C\u0430\u0441\u0442\u0435\u0440\u0430" },
    { num: "10", unit: " \u043B\u0435\u0442", label: "\u0441\u0442\u0443\u0434\u0438\u0438" },
    { num: "218", label: "\u043E\u0442\u0437\u044B\u0432\u043E\u0432" }
  ],
  menu: {
    eyebrow: "\u041F\u0440\u0430\u0439\u0441",
    title: "\u041C\u0438\u043D\u0438\u043C\u0443\u043C \u2014 [[15 \u043C\u0438\u043D\u0443\u0442]] \u0440\u0430\u0431\u043E\u0442\u044B",
    items: [
      { num: "01", name: "\u041C\u0438\u043D\u0438-\u044D\u0441\u043A\u0438\u0437 \u0434\u043E 5 \u0441\u043C", desc: "\u043B\u0438\u043D\u0438\u0438, \u0441\u0438\u043C\u0432\u043E\u043B\u044B, \u0446\u0438\u0444\u0440\u044B", price: "5 000 \u20BD" },
      { num: "02", name: "\u0421\u0440\u0435\u0434\u043D\u0438\u0439 5\u201315 \u0441\u043C", desc: "\u0433\u0435\u043E\u043C\u0435\u0442\u0440\u0438\u044F, \u0431\u043E\u0442\u0430\u043D\u0438\u043A\u0430, \u043D\u0430\u0434\u043F\u0438\u0441\u0438", price: "\u043E\u0442 12 000 \u20BD" },
      { num: "03", name: "\u0427\u0430\u0441 \u0440\u0430\u0431\u043E\u0442\u044B", desc: "\u0434\u043B\u044F \u043A\u0440\u0443\u043F\u043D\u044B\u0445 \u044D\u0441\u043A\u0438\u0437\u043E\u0432", price: "8 000 \u20BD" },
      { num: "04", name: "\u041F\u0435\u0440\u0435\u043A\u0440\u044B\u0442\u0438\u0435 \u0441\u0442\u0430\u0440\u043E\u0439", desc: "\u043E\u0446\u0435\u043D\u043A\u0430 \u043F\u043E \u0444\u043E\u0442\u043E", price: "\u043F\u043E \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0451\u043D\u043D\u043E\u0441\u0442\u0438" }
    ]
  },
  quote: { text: "\xAB\u0412\u043B\u0430\u0434 \u043D\u0430\u0440\u0438\u0441\u043E\u0432\u0430\u043B [[\u0438\u043C\u0435\u043D\u043D\u043E \u0442\u043E, \u0447\u0442\u043E \u044F \u0445\u043E\u0442\u0435\u043B\u0430]], \u043D\u043E \u043D\u0435 \u043C\u043E\u0433\u043B\u0430 \u043E\u0431\u044A\u044F\u0441\u043D\u0438\u0442\u044C. \u041B\u0438\u043D\u0438\u0438 \u0442\u043E\u043D\u043A\u0438\u0435, \u043D\u0435 \u0440\u0430\u0441\u043F\u043B\u044B\u043B\u0438\u0441\u044C \u0447\u0435\u0440\u0435\u0437 \u0433\u043E\u0434.\xBB", authorName: "\u0414\u0430\u0440\u044C\u044F \u041B.", authorSource: "Instagram", authorWhen: "2 \u043D\u0435\u0434\u0435\u043B\u0438 \u043D\u0430\u0437\u0430\u0434" },
  cta: { primary: { label: "\u041F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u044D\u0441\u043A\u0438\u0437" }, phone: "@line_tattoo" }
};
var samplePresets = [
  { preset: { themeId: "display-soft", familyId: "display" }, content: fixtureNailsAnna, tagline: "\u041C\u0430\u043D\u0438\u043A\u044E\u0440 \xB7 \u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433" },
  { preset: { themeId: "bento-noir", familyId: "bento" }, content: fixtureAutoPark, tagline: "\u0410\u0432\u0442\u043E\u0441\u0435\u0440\u0432\u0438\u0441 \xB7 \u0421\u0430\u043C\u0430\u0440\u0430" },
  { preset: { themeId: "editorial-warm", familyId: "editorial" }, content: fixtureCoffeeLena, tagline: "\u041A\u043E\u0444\u0435\u0439\u043D\u044F \xB7 \u0412\u043E\u0440\u043E\u043D\u0435\u0436" },
  { preset: { themeId: "display-noir", familyId: "display" }, content: fixtureBarberFedor, tagline: "\u0411\u0430\u0440\u0431\u0435\u0440\u0448\u043E\u043F \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "split-product", familyId: "split" }, content: fixtureFitnessMetod, tagline: "\u041F\u0438\u043B\u0430\u0442\u0435\u0441 \xB7 \u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433" },
  { preset: { themeId: "display-ink", familyId: "display" }, content: fixtureTattooLine, tagline: "\u0422\u0430\u0442\u0443-\u0441\u0442\u0443\u0434\u0438\u044F \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "stacked-corporate", familyId: "stacked" }, content: fixtureLegalSitnikov, tagline: "\u042E\u0440.\u043F\u0440\u0430\u043A\u0442\u0438\u043A\u0430 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "split-teal", familyId: "split" }, content: fixturePhotoMarta, tagline: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444 \xB7 \u041C\u043E\u0441\u043A\u0432\u0430" },
  { preset: { themeId: "stacked-cream", familyId: "stacked" }, content: fixtureBakeryDom, tagline: "\u041F\u0435\u043A\u0430\u0440\u043D\u044F \xB7 \u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433" },
  { preset: { themeId: "display-bold", familyId: "display" }, content: fixtureBrowsSochi, tagline: "\u0411\u0440\u043E\u0432\u0438 \u0438 \u0440\u0435\u0441\u043D\u0438\u0446\u044B \xB7 \u0421\u043E\u0447\u0438" }
];
export {
  BentoFamily,
  DisplayFamily,
  EditorialFamily,
  MiniChrome,
  PresetRenderer,
  SplitFamily,
  StackedFamily,
  bentoClay,
  bentoLight,
  bentoNoir,
  displayBold,
  displayInk,
  displayNoir,
  displaySoft,
  editorialMono,
  editorialNoir,
  editorialWarm,
  fixtureAutoPark,
  fixtureBakeryDom,
  fixtureBarberFedor,
  fixtureBrowsSochi,
  fixtureCoffeeLena,
  fixtureFitnessMetod,
  fixtureLegalSitnikov,
  fixtureNailsAnna,
  fixturePhotoMarta,
  fixtureTattooLine,
  getTheme,
  samplePresets,
  splitClay,
  splitProduct,
  splitTeal,
  stackedCorporate,
  stackedCream,
  stackedSlate,
  themes
};
//# sourceMappingURL=index.js.map