/**
 * Ambient module shims for `@samosite/canon` path-exports.
 *
 * The vendored canon package (`packages/canon/`) ships ESM without
 * generated `.d.ts` — DTS bundling tripped on React 19 strict types
 * (see `packages/canon/CHANGELOG.md` "loose-typed best-effort" note).
 *
 * Empty-body `declare module "X";` is the canonical pattern for
 * "implicit any module" — every named/default/namespace import resolves
 * to `any` without TS errors. Trade-off: zero IntelliSense for these
 * imports. Acceptable for canon imports since the consuming code
 * inspected the package source directly to find member names.
 *
 * If/when canon ships proper DTS in a future release, this file becomes
 * a no-op (TypeScript prefers package-side declarations over ambient
 * shims of the same module name).
 */
declare module "@samosite/canon";
declare module "@samosite/canon/landing";
declare module "@samosite/canon/intake";
declare module "@samosite/canon/customer";
declare module "@samosite/canon/admin-demo";
declare module "@samosite/canon/admin-core";
declare module "@samosite/canon/admin-ops";
declare module "@samosite/canon/auth";
declare module "@samosite/canon/source";
declare module "@samosite/canon/primitives";
declare module "@samosite/canon/tokens";
declare module "@samosite/canon/tailwind-preset";
