#!/usr/bin/env bash
set -euo pipefail

# ------- load variables injected by terraform -------
export APP_NAME="${app_name}"
export COOLIFY_EMAIL="${coolify_email}"
export COOLIFY_PASSWORD="${coolify_password}"
export DOMAIN="${domain_name}"
export CLOUDFLARE_TUNNEL_TOKEN="${cloudflare_tunnel_token}"

RAW="https://raw.githubusercontent.com/quickfra/feature/terraform-infra/scripts"

grab() {  # tiny helper that fails fast
  source <(curl -fsSL "$RAW/$1") || { printf >&2 "❌  %s\n" "$1"; exit 1; }
}

# ------- load defaults (non‑secret) -------
grab env/defaults.sh

# ------- import libraries (pure) ----------
for f in utils system security coolify; do
  grab lib/${f}.sh
done

for f in install mail; do
  grab tasks/coolify/${f}.sh
done

for f in system security; do
  grab tasks/system/${f}.sh
done

# ------- main orchestration ---------------
main() {
  log "== Setting up the system =="
  task_setup_system
  task_setup_security
  log "== Installing Coolify =="
  task_setup_coolify
  log "== Installing Mail Service =="
  task_setup_mail
  log "== Allowing Access to the Panel =="
  allow_coolify_access
  log "== All done =="

}

main "$@"
