#!/usr/bin/env bash
# Generate visual-regression baselines from the canon landing prototype.
#
# Workflow:
#   1. Spawn an http server over `landing/tests/visual/canon-source/` so
#      `_visual-host.html` can fetch its sidecar `.jsx` files via relative
#      paths (Babel-standalone loads `<script src="tokens.jsx">` etc.).
#   2. Drive Playwright (`generate-canon-baselines.ts`) — opens the wrapper
#      at three viewports, waits for `data-vh-ready=1`, screenshots each of
#      the 10 sections, writes PNGs to `landing/tests/visual/baselines/`.
#   3. Tear the server down on exit (trap handles SIGINT/error/normal exit).
#
# Run from repo root:
#   bash infra/scripts/generate-canon-baselines.sh
#
# Re-running OVERWRITES committed baselines — that's the intended behavior
# when canon changes. The PNG diff in `git status` is the diff to review.
#
# Why bash + ts instead of a single .ts: spawning a long-lived static server
# alongside a child Playwright process is ergonomic in shell (background +
# trap), painful in Node (handle lifecycle). The .ts file owns *only*
# screenshot orchestration — server is shell's problem.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
CANON_DIR="$REPO_ROOT/landing/tests/visual/canon-source"
SERVER_PORT="${CANON_SERVER_PORT:-9876}"

if [ ! -d "$CANON_DIR" ]; then
  echo "[!] canon source not found: $CANON_DIR" >&2
  echo "    Did the handoff package import go through? See PR #95." >&2
  exit 1
fi

if [ ! -f "$CANON_DIR/_visual-host.html" ]; then
  echo "[!] _visual-host.html missing — generator can't render variants" >&2
  exit 1
fi

# Start static server in background. `npx http-server` ships with the
# landing devDependencies (already pulled in by Next's tooling chain).
echo "[*] starting static server on :$SERVER_PORT (root: $CANON_DIR)"
cd "$REPO_ROOT/landing"
npx --yes http-server "$CANON_DIR" -p "$SERVER_PORT" -s --cors >/tmp/canon-server.log 2>&1 &
SERVER_PID=$!

cleanup() {
  echo "[*] stopping static server (pid $SERVER_PID)"
  kill "$SERVER_PID" 2>/dev/null || true
  wait "$SERVER_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

# Wait until server responds — Playwright `goto()` will hang otherwise.
for i in 1 2 3 4 5 6 7 8; do
  if curl -sf "http://127.0.0.1:$SERVER_PORT/_visual-host.html?variant=desktop" \
       -o /dev/null; then
    echo "[*] server up after ${i}s"
    break
  fi
  sleep 1
done

# Hand off to Playwright. `BASE_URL` tells the .ts where to fetch the canon.
# Must run from `landing/` so tsx resolves `@playwright/test` etc. against
# the local `node_modules/`. The .ts script lives there too.
export BASE_URL="http://127.0.0.1:$SERVER_PORT"
cd "$REPO_ROOT/landing"
npx tsx tests/visual/generate-baselines.ts

echo "[*] baselines written → landing/tests/visual/baselines/"
echo "    Review the PNG diff via \`git status\` and commit if it's the new canon."
