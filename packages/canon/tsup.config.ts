import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/tokens.ts',
    'src/CanonStyles.tsx',
    'src/tailwind-preset.ts',
    'src/primitives/index.tsx',
    'src/landing/index.tsx',
    'src/intake/index.tsx',
    'src/customer/index.tsx',
    'src/admin-demo/index.tsx',
    'src/admin-core/index.tsx',
    'src/admin-core/types.ts',
    'src/admin-ops/index.tsx',
    'src/admin-ops/types.ts',
    'src/auth/index.tsx',
    'src/source/index.tsx',
    'src/presets/index.tsx',
  ],
  format: ['esm'],
  // DTS disabled: admin-demo/index.tsx (loose typing from canvas-prototype era —
  // `resize: 'vertical'` as string, useState literal-type narrowing) breaks under
  // React 19 strict CSSProperties. Upstream tsup.config.ts ships `dts: true` but
  // its own build hits the same admin-* errors (canon CHANGELOG 0.7.1 «Известные
  // проблемы»). Patching vendored source would diverge from the design canvas;
  // landing consumer uses ambient module shims in landing/types/samosite-canon.d.ts
  // instead. Re-enable when canon authors tighten admin-demo typings or move it
  // out of the dts entry list.
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: { '.css': 'copy' },
  onSuccess: 'cp src/styles.css dist/styles.css',
  esbuildOptions(opts) {
    opts.jsx = 'automatic';
  },
});
