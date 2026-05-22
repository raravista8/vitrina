// ESLint 9 flat config. Next 16's eslint-config-next ships native flat
// configs via subpath exports; FlatCompat is not required (and conflicts
// with how `@next/eslint-plugin-next` registers plugins).

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "dist/**",
      "coverage/**",
      // Canon source — JSX prototypes loaded by @babel/standalone at runtime,
      // not production code. They reference globals (`window.SamosaytLanding`
      // etc.) the linter can't resolve, and we deliberately keep them byte-
      // identical to the design handoff so future regen scripts stay reliable.
      "tests/visual/canon-source/**",
      // Per-run mismatch diffs + Playwright HTML reports — ephemeral.
      "tests/visual/__diff/**",
      "playwright-report/**",
      "test-results/**",
    ],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "warn",
    },
  },
];

export default config;
