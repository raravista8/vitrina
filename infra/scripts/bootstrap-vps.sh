#!/usr/bin/env bash
#
# Vitrina — VPS bootstrap for Ubuntu 24.04 LTS.
#
# Reproduces Phases 1–3 from docs/runbooks/vps-bootstrap.md:
#   Phase 1  security finalization (timezone, swap, kernel reboot, apt upgrade)
#   Phase 2  Docker Engine + Compose v2 + gh CLI + dev tooling
#   Phase 3  /opt/vitrina + /var/log/vitrina with correct deploy:deploy perms
#
# Idempotent: re-running on a fully bootstrapped host produces no changes.
# Each step prints `[ok]` (no change) or `[changed]` (action taken).
#
# Out of scope (deliberately):
#   - cloning the repo or generating secrets  (Phase 4 — run by hand once)
#   - bringing up postgres/redis              (Phase 5 — `make dev-up-infra`)
#   - opening firewall ports beyond 22/80/443 (operator opt-in)
#   - touching sshd_config                    (already locked down)
#
# Usage:
#   sudo ./infra/scripts/bootstrap-vps.sh [--dry-run] [--no-reboot]
#
# Flags:
#   --dry-run    Show every action that would be taken; touch nothing.
#   --no-reboot  Skip the reboot at the end of Phase 1 even if pending.
#
# Recovery / re-run:
#   The script is safe to re-run after partial failure. It uses guards like
#   `command -v docker >/dev/null` and file-presence checks so already-applied
#   steps short-circuit. The only non-idempotent step is the final `reboot`,
#   which only fires if /var/run/reboot-required exists.

set -euo pipefail
IFS=$'\n\t'

# --- args + globals -----------------------------------------------------------

DRY_RUN=false
NO_REBOOT=false
for arg in "$@"; do
    case "$arg" in
        --dry-run)    DRY_RUN=true ;;
        --no-reboot)  NO_REBOOT=true ;;
        -h|--help)
            sed -n '2,30p' "$0"
            exit 0
            ;;
        *)
            echo "unknown flag: $arg (use --help)" >&2
            exit 2
            ;;
    esac
done

readonly UBUNTU_CODENAME="$(. /etc/os-release && echo "${VERSION_CODENAME:-noble}")"
readonly DEPLOY_USER="${VITRINA_DEPLOY_USER:-deploy}"
readonly TIMEZONE="${VITRINA_TZ:-Europe/Moscow}"
readonly SWAP_SIZE_GB="${VITRINA_SWAP_GB:-4}"

# --- helpers ------------------------------------------------------------------

log()     { echo "[$(date -Iseconds)] $*"; }
ok()      { log "[ok]      $*"; }
changed() { log "[changed] $*"; }
fail()    { log "[FAIL]    $*" >&2; exit 1; }

# Idempotent line-in-file: append `$2` to file `$1` if not present.
ensure_line() {
    local file="$1" line="$2"
    if [ ! -f "$file" ] || ! grep -qxF -- "$line" "$file"; then
        $DRY_RUN || echo "$line" | sudo tee -a "$file" >/dev/null
        changed "appended to $file: $line"
    else
        ok "$file already contains: $line"
    fi
}

run() {
    if $DRY_RUN; then
        echo "  + $*"
    else
        eval "$@"
    fi
}

require_root_via_sudo() {
    if [ "$(id -u)" -ne 0 ]; then
        sudo -n true 2>/dev/null || fail "this script needs passwordless sudo for user $USER"
    fi
}

trap 'fail "interrupted at line $LINENO"' ERR

# --- pre-flight ---------------------------------------------------------------

log "=== Vitrina VPS bootstrap ==="
log "dry-run: $DRY_RUN | no-reboot: $NO_REBOOT"
log "host: $(hostname) | os: $UBUNTU_CODENAME | deploy user: $DEPLOY_USER"
require_root_via_sudo

if [ "$UBUNTU_CODENAME" != "noble" ]; then
    log "[warn] tested on Ubuntu 24.04 noble; you're on $UBUNTU_CODENAME — proceeding"
fi

# --- Phase 1.1: timezone ------------------------------------------------------

log "--- Phase 1.1: timezone ---"
if [ "$(timedatectl show --value -p Timezone)" = "$TIMEZONE" ]; then
    ok "timezone already $TIMEZONE"
else
    run sudo timedatectl set-timezone "$TIMEZONE"
    changed "timezone set to $TIMEZONE"
fi

# --- Phase 1.2: apt update + upgrade ------------------------------------------

log "--- Phase 1.2: apt update + security upgrades ---"
run sudo DEBIAN_FRONTEND=noninteractive apt-get update -q
upgradable=$(apt list --upgradable 2>/dev/null | grep -v '^Listing' | wc -l || true)
if [ "$upgradable" -gt 0 ]; then
    run sudo DEBIAN_FRONTEND=noninteractive apt-get -y \
        -o Dpkg::Options::='--force-confdef' \
        -o Dpkg::Options::='--force-confold' \
        upgrade
    changed "upgraded $upgradable packages"
else
    ok "apt: no pending upgrades"
fi

# --- Phase 1.3: unattended-upgrades -------------------------------------------

log "--- Phase 1.3: unattended-upgrades ---"
if dpkg -l unattended-upgrades >/dev/null 2>&1 \
        && systemctl is-active --quiet unattended-upgrades; then
    ok "unattended-upgrades installed + active"
else
    run sudo DEBIAN_FRONTEND=noninteractive apt-get -y install unattended-upgrades
    run sudo systemctl enable --now unattended-upgrades
    changed "unattended-upgrades installed + enabled"
fi

# --- Phase 1.4: swap ----------------------------------------------------------

log "--- Phase 1.4: ${SWAP_SIZE_GB}GB swap ---"
if swapon --show | grep -q '/swapfile'; then
    ok "/swapfile already active"
else
    if [ -f /swapfile ]; then
        ok "/swapfile exists but inactive — activating"
    else
        run sudo fallocate -l "${SWAP_SIZE_GB}G" /swapfile
        run sudo chmod 600 /swapfile
        run sudo mkswap /swapfile
        changed "created /swapfile (${SWAP_SIZE_GB}G)"
    fi
    run sudo swapon /swapfile
    ensure_line /etc/fstab '/swapfile none swap sw 0 0'
fi

# --- Phase 1.5: swappiness + vfs_cache_pressure tune --------------------------

log "--- Phase 1.5: vm.swappiness tune ---"
SYSCTL_FILE=/etc/sysctl.d/99-vitrina.conf
if [ -f "$SYSCTL_FILE" ] && grep -q 'vm.swappiness=10' "$SYSCTL_FILE"; then
    ok "$SYSCTL_FILE already configured"
else
    $DRY_RUN || {
        sudo tee "$SYSCTL_FILE" >/dev/null <<'SYSCTLEOF'
# Vitrina — tune VM for low-swap-pressure server workload.
vm.swappiness=10
vm.vfs_cache_pressure=50
SYSCTLEOF
        sudo sysctl -p "$SYSCTL_FILE" >/dev/null
    }
    changed "wrote $SYSCTL_FILE (swappiness=10, vfs_cache_pressure=50)"
fi

# --- Phase 2.1: Docker prereqs ------------------------------------------------

log "--- Phase 2.1: Docker apt prereqs ---"
run sudo DEBIAN_FRONTEND=noninteractive apt-get -y install \
    ca-certificates curl gnupg lsb-release
ok "ca-certificates / curl / gnupg / lsb-release installed"

# --- Phase 2.2: Docker GPG + apt repo -----------------------------------------

log "--- Phase 2.2: Docker GPG key ---"
KEYRING=/etc/apt/keyrings/docker.asc
if [ -f "$KEYRING" ]; then
    ok "$KEYRING already present"
else
    run sudo install -m 0755 -d /etc/apt/keyrings
    $DRY_RUN || curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo tee "$KEYRING" >/dev/null
    run sudo chmod a+r "$KEYRING"
    changed "fetched Docker GPG key → $KEYRING"
fi

log "--- Phase 2.3: Docker apt repo ---"
APT_LIST=/etc/apt/sources.list.d/docker.list
DESIRED_REPO="deb [arch=$(dpkg --print-architecture) signed-by=$KEYRING] https://download.docker.com/linux/ubuntu $UBUNTU_CODENAME stable"
if [ -f "$APT_LIST" ] && grep -qF "$DESIRED_REPO" "$APT_LIST"; then
    ok "Docker apt repo already configured"
else
    $DRY_RUN || echo "$DESIRED_REPO" | sudo tee "$APT_LIST" >/dev/null
    run sudo DEBIAN_FRONTEND=noninteractive apt-get update -q
    changed "wrote $APT_LIST"
fi

# --- Phase 2.4: Docker install ------------------------------------------------

log "--- Phase 2.4: Docker Engine + Compose v2 ---"
if command -v docker >/dev/null && docker compose version >/dev/null 2>&1; then
    ok "docker + compose v2 already installed ($(docker --version | head -c40)…)"
else
    run sudo DEBIAN_FRONTEND=noninteractive apt-get -y install \
        docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    changed "installed Docker Engine + Compose v2"
fi

# --- Phase 2.5: deploy → docker group -----------------------------------------

log "--- Phase 2.5: $DEPLOY_USER → docker group ---"
if id -nG "$DEPLOY_USER" 2>/dev/null | tr ' ' '\n' | grep -qx docker; then
    ok "$DEPLOY_USER already in docker group"
else
    run sudo usermod -aG docker "$DEPLOY_USER"
    changed "$DEPLOY_USER added to docker group (re-login required to take effect)"
fi

# --- Phase 2.6: /etc/docker/daemon.json ---------------------------------------

log "--- Phase 2.6: /etc/docker/daemon.json ---"
DAEMON_JSON=/etc/docker/daemon.json
DESIRED_JSON='{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "50m",
    "max-file": "3"
  },
  "default-address-pools": [
    {"base": "172.30.0.0/16", "size": 24},
    {"base": "172.31.0.0/16", "size": 24}
  ],
  "live-restore": true,
  "userland-proxy": false
}'
if [ -f "$DAEMON_JSON" ] && diff -q <(echo "$DESIRED_JSON") "$DAEMON_JSON" >/dev/null 2>&1; then
    ok "$DAEMON_JSON already matches desired config"
else
    run sudo install -d -m 755 /etc/docker
    $DRY_RUN || echo "$DESIRED_JSON" | sudo tee "$DAEMON_JSON" >/dev/null
    run sudo systemctl restart docker
    changed "wrote $DAEMON_JSON + restarted docker"
fi

# --- Phase 2.7: gh CLI repo + dev tooling -------------------------------------

log "--- Phase 2.7: gh CLI + dev tooling ---"
GH_KEY=/etc/apt/keyrings/githubcli-archive-keyring.gpg
GH_LIST=/etc/apt/sources.list.d/github-cli.list
if [ ! -f "$GH_KEY" ]; then
    $DRY_RUN || curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of="$GH_KEY"
    run sudo chmod go+r "$GH_KEY"
    changed "fetched gh CLI GPG key"
fi
GH_REPO="deb [arch=$(dpkg --print-architecture) signed-by=$GH_KEY] https://cli.github.com/packages stable main"
if [ ! -f "$GH_LIST" ] || ! grep -qF "$GH_REPO" "$GH_LIST"; then
    $DRY_RUN || echo "$GH_REPO" | sudo tee "$GH_LIST" >/dev/null
    run sudo DEBIAN_FRONTEND=noninteractive apt-get update -q
    changed "wrote $GH_LIST"
fi

for pkg in git gh htop ncdu jq vim tmux python3-venv python3-pip; do
    if dpkg -l "$pkg" >/dev/null 2>&1; then
        ok "$pkg already installed"
    else
        run sudo DEBIAN_FRONTEND=noninteractive apt-get -y install "$pkg"
        changed "installed $pkg"
    fi
done

# --- Phase 3: directory structure ---------------------------------------------

log "--- Phase 3: /opt/vitrina + /var/log/vitrina ---"
declare -A DIRS=(
    ["/opt/vitrina"]="755"
    ["/opt/vitrina/data"]="755"
    ["/opt/vitrina/data/postgres"]="755"
    ["/opt/vitrina/data/redis"]="755"
    ["/opt/vitrina/backups"]="750"
    ["/var/log/vitrina"]="755"
)
for dir in "${!DIRS[@]}"; do
    mode="${DIRS[$dir]}"
    if [ -d "$dir" ]; then
        current_owner=$(stat -c '%U:%G' "$dir")
        current_mode=$(stat -c '%a' "$dir")
        if [ "$current_owner" = "$DEPLOY_USER:$DEPLOY_USER" ] && [ "$current_mode" = "$mode" ]; then
            ok "$dir ($mode $current_owner)"
            continue
        fi
    fi
    run sudo install -d -o "$DEPLOY_USER" -g "$DEPLOY_USER" -m "$mode" "$dir"
    changed "ensured $dir ($mode $DEPLOY_USER:$DEPLOY_USER)"
done

# --- Phase 1.6: final reboot if kernel-update pending -------------------------

log "--- Phase 1.6: reboot check ---"
if [ -f /var/run/reboot-required ]; then
    if $NO_REBOOT; then
        log "[warn] reboot needed but --no-reboot was passed; please reboot manually"
    elif $DRY_RUN; then
        log "[dry-run] would reboot now"
    else
        changed "scheduling reboot in 5s (SSH session will drop; reconnect after ~30-60s)"
        sudo systemd-run --on-active=5 systemctl reboot
    fi
else
    ok "no reboot needed"
fi

log "=== bootstrap complete ==="
log "next steps:"
log "  1. clone repo into /opt/vitrina (use git init + remote + fetch, since data/ subdirs exist)"
log "  2. generate secrets (FERNET_KEYS, JOB_HMAC_KEY, BACKUP_PASSPHRASE) → /opt/vitrina/.env.secrets (chmod 600)"
log "  3. assemble /opt/vitrina/.env from .env.example + .env.secrets"
log "  4. \`docker compose up -d postgres redis\` to smoke-test, then \`docker compose down\`"
