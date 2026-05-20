import type { Config } from "tailwindcss";

/**
 * Самосайт — design tokens (Concept A · Тёплая бумага).
 *
 * Single source of truth for all 19 screens. Values mirror Claude
 * Design's `tokens.jsx` — colour, type, radii. OKLCH chosen for
 * perceptual uniformity: warm hues need it to read evenly across
 * surfaces.
 *
 * Production rule: never hardcode a hex/oklch in component markup —
 * refer to `bg-paper`, `text-ink`, `border-line`, `bg-accent`, etc.
 * The design canvas uses inline styles for demo purposes; production
 * is fully Tailwind.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Onest — Cyrillic-native geometric sans, picked by Design.
        // Falls back to Inter (self-hosted) then system stack.
        sans: ['"Onest"', '"Inter"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      colors: {
        paper: "oklch(0.972 0.012 80)", // page background — cream
        "paper-soft": "oklch(0.945 0.014 75)", // chip / input bg
        ink: "oklch(0.215 0.018 60)", // h1 + body — warm near-black
        "ink-soft": "oklch(0.42 0.020 60)", // sub / on-card body
        "ink-faint": "oklch(0.56 0.020 60)", // microcopy / placeholder
        "ink-muted": "oklch(0.68 0.016 60)", // disabled
        line: "oklch(0.88 0.012 70)", // 1px dividers / card borders
        "line-soft": "oklch(0.93 0.010 70)",

        accent: {
          DEFAULT: "oklch(0.605 0.155 35)", // terracotta — primary CTA
          hover: "oklch(0.54 0.16 35)",
          soft: "oklch(0.92 0.045 40)", // pale peach — chip / highlight bg
          ink: "oklch(0.42 0.14 35)", // text on accent-soft
        },

        // Semantic — Source-detection badges (#2) use these.
        success: {
          DEFAULT: "oklch(0.58 0.13 145)",
          soft: "oklch(0.93 0.05 145)",
        },
        info: {
          DEFAULT: "oklch(0.62 0.10 240)",
          soft: "oklch(0.93 0.035 240)",
        },
        warn: {
          DEFAULT: "oklch(0.66 0.14 70)",
          soft: "oklch(0.94 0.06 80)",
        },
        danger: {
          DEFAULT: "oklch(0.55 0.18 28)",
          soft: "oklch(0.93 0.055 28)",
        },
      },
      boxShadow: {
        card: "0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)",
        pop: "0 18px 40px -16px rgba(120,60,30,0.25)",
      },
      letterSpacing: {
        tightest: "-0.035em",
      },
    },
  },
  plugins: [],
};

export default config;
