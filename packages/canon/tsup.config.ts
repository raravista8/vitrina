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
    'src/admin-ops/index.tsx',
    'src/source/index.tsx',
  ],
  format: ['esm'],
  dts: false,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  loader: { '.css': 'copy' },
  // Copy raw CSS to dist
  onSuccess: 'cp src/styles.css dist/styles.css',
  esbuildOptions(opts) {
    opts.jsx = 'automatic';
  },
});
