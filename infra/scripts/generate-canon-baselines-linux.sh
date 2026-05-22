#!/usr/bin/env bash
# Generate canon visual baselines INSIDE the Playwright Linux container —
# same OS/Chromium combo as `landing / visual regression` runs on in GitHub
# Actions. Eliminates the macOS-vs-Ubuntu font-anti-aliasing gap that
# previously forced the spec budget up to 4 %.
#
# Workflow:
#   1. Spin up the Playwright Docker image (pinned to repo's Playwright
#      version — keep in sync with `landing/package.json`).
#   2. Mount the repo into /work + run `bash infra/scripts/generate-canon-
#      baselines.sh` inside. The shell variant brings up its own
#      http-server for the canon prototype on a container-local port.
#   3. PNGs land back on host through the mount.
#
# Run from repo root:
#   bash infra/scripts/generate-canon-baselines-linux.sh
#
# The committed baselines are now reference for Linux Chromium. A `git
# diff` after running this here on macOS will show pixel churn — that's
# the cross-OS gap surfacing. Commit the churn so CI compares prod-on-
# Linux against baseline-on-Linux (apples to apples).

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# Pin to a specific Playwright tag. v1.60.0-jammy matches the
# @playwright/test ^1.60.0 in landing/package.json. The -jammy variant
# is Ubuntu 22.04, same family the GitHub Actions ubuntu-latest runner
# uses. If you bump @playwright/test in package.json, bump this too.
PLAYWRIGHT_IMAGE="${PLAYWRIGHT_IMAGE:-mcr.microsoft.com/playwright:v1.60.0-jammy}"

if ! docker info >/dev/null 2>&1; then
  echo "[!] Docker daemon not reachable — start Docker Desktop first." >&2
  exit 1
fi

echo "[*] regenerating baselines inside $PLAYWRIGHT_IMAGE"
echo "[*] repo mount: $REPO_ROOT -> /work"

docker run --rm \
  -v "$REPO_ROOT:/work" \
  -w /work \
  --user "$(id -u):$(id -g)" \
  -e HOME=/tmp \
  "$PLAYWRIGHT_IMAGE" \
  bash -c '
    set -euo pipefail
    cd /work/landing
    # npm ci would re-run postinstall + try to re-fetch Playwright browsers
    # (already in the image). Skip with --ignore-scripts; the image has
    # chromium pre-installed under /ms-playwright.
    npm ci --ignore-scripts --silent
    export PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
    cd /work
    bash infra/scripts/generate-canon-baselines.sh
  '

echo
echo "[*] regen complete. Review the PNG churn:"
echo "    git status landing/tests/visual/baselines/"
echo "    git diff --stat landing/tests/visual/baselines/"
echo
echo "[*] commit the Linux-generated PNGs so CI compares against same-OS"
echo "    baselines. Local dev runs (macOS / Windows) will see a small"
echo "    cross-OS diff — that is expected; the gate is CI."
