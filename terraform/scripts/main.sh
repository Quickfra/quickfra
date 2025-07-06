#!/usr/bin/env bash
set -euo pipefail

# ------- load variables injected by terraform -------
export APP_NAME="${app_name:-quickfra}"
export COOLIFY_EMAIL="${coolify_email:-yourname@youremail.com}"
export COOLIFY_PASSWORD="${coolify_password}"
export DOMAIN="${domain_name:-yourdomain.com}"
export CLOUDFLARE_TUNNEL_TOKEN="${cloudflare_tunnel_token:-your_cloudflare_tunnel_token}"
export INSTALL_MAIL="${install_mail:-false}"

SOURCE_BASE_URL="https://raw.githubusercontent.com/quickfra/quickfra/feature/terraform-infra/terraform"

grab() {  # tiny helper that fails fast
  source <(curl -fsSL "$SOURCE_BASE_URL/scripts/$1") || { printf >&2 "❌  %s\n" "$1"; exit 1; }
}

# ------- load defaults (non‑secret) -------
grab env/defaults.sh

# ------- import libraries (pure) ----------
for f in utils system security coolify; do
  grab lib/${f}.sh
done

for f in install mail cloudflared; do
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
  if [[ "${INSTALL_MAIL,,}" == "true" || "$INSTALL_MAIL" == "1" ]]; then
    log "== Installing Mail Service =="
    task_setup_mail
    allow_mail_access
  fi
  task_setup_cloudfared
  log "== Allowing Access to the Panel =="
  allow_coolify_access
  log "== All done =="

}

main "$@"
