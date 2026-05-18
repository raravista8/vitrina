// ESLint 9 flat config. Next 16's eslint-config-next ships native flat
// configs via subpath exports; FlatCompat is not required (and conflicts
// with how `@next/eslint-plugin-next` registers plugins).

import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "dist/**", "coverage/**"],
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
