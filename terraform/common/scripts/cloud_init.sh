#!/usr/bin/env bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# ─────── Wait for APT Lock ───────
wait_for_apt_lock() {
  while fuser /var/lib/apt/lists/lock >/dev/null 2>&1 ||
    fuser /var/lib/dpkg/lock >/dev/null 2>&1 ||
    fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do
    echo "[INFO] Waiting for locks to free from apt/dpkg..."
    sleep 2
  done
}

# ─────── Wait for Coolify ───────
wait_for_coolify() {
  while !is_coolify_ready; do
    echo "[INFO] Waiting for Coolify to be ready..."
    sleep 2
  done
}

# ─────── Check Health ───────
is_coolify_ready() {
  local url="http://localhost:8000/api/v1/health"
  [ "$(curl -sf "$url")" = "OK" ]
}

# ─────── Create Coolify Access Token ───────
create_coolify_access_token() {
  # Create plain token
  TOKEN=$(cat /proc/sys/kernel/random/uuid)

  # Hash it with SHA256
  TOKEN_HASH=$(echo -n "$TOKEN" | sha256sum | awk '{print $1}')

  # Insert into the database
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
INSERT INTO personal_access_tokens (
  tokenable_type, tokenable_id, name, token, team_id, abilities, created_at, updated_at
) VALUES (
  'App\Models\User', 0, 'Quickfra Automation', '$TOKEN_HASH', 0, '["root"]', NOW(), NOW()
);
EOF

  # Show plain token once
  echo "[INFO] Coolify API Access Token Generated"
  echo "$TOKEN" >/root/.coolify_api_token
  chmod 600 /root/.coolify_api_token
}

get_coolify_token() {
  cat /root/.coolify_api_token
}

get_coolify_server_data() {
  curl -s localhost:8000/api/v1/servers \
    --header "Authorization: Bearer $(get_coolify_token)" |
    jq '.[0]'
}

get_coolify_server_uuid() {
  get_coolify_server_data | jq -r '.uuid'
}

create_coolify_project() {
  local project_name="$1"
  local project_desc="$2"

  echo "[INFO] Creating Coolify project: $project_name"
  curl -s localhost:8000/api/v1/projects \
    --request POST \
    --header "Authorization: Bearer $(get_coolify_token)" \
    --header "Content-Type: application/json" \
    --data '{
      "name": "'"$project_name"'",
      "description": "'"$project_desc"'"
    }' | jq -r '.uuid'
}

create_coolify_app_dockercompose() {
  local project_uuid="$1"
  local server_uuid="$2"
  local environment_name="$3"
  local docker_compose_raw="$4"
  local app_name="$5"
  local app_desc="$6"

  echo "[INFO] Creating Coolify resource: $app_name"
  curl -s localhost:8000/api/v1/applications \
    --request POST \
    --header "Authorization: Bearer $(get_coolify_token)" \
    --header "Content-Type: application/json" \
    --data '{
  "project_uuid": "'"$project_uuid"'",
  "server_uuid": "'"$server_uuid"'",
  "environment_name": "'"$environment_name"'",
  "docker_compose_raw": "'"$docker_compose_raw"'",
  "name": "'"$app_name"'",
  "description": "'"$app_desc"'",
  "instant_deploy": true,
  "use_build_server": true,
  "connect_to_docker_network": true
  }' | jq -r '.uuid'
}
setup_mail_service() {
  # Set up variables for mail service
  local COOLIFY_MAIL_PROJECT_NAME="Mail Services"
  local COOLIFY_MAIL_PROJECT_DESC="Project for all mail-related infrastructure and automation"

  echo "[INFO] Creating the Mail Services project in Coolify"
  local COOLIFY_MAIL_PROJECT_UUID=$(create_coolify_project "$COOLIFY_MAIL_PROJECT_NAME" "$COOLIFY_MAIL_PROJECT_DESC")

  local COOLIFY_MAIL_SERVER_NAME="Stalwart Mail Server"
  local COOLIFY_MAIL_SERVER_DESC="Stalwart Mail Server for handling all email services"

  local DOCKER_COMPOSE_RAW=$(curl -fsSL "https://raw.githubusercontent.com/quickfra/quickfra/rama/ruta/docker-compose.yml")

  create_coolify_app_dockercompose \
    "$COOLIFY_MAIL_PROJECT_UUID" \
    "$(get_coolify_server_uuid)" \
    "production" \
    "$DOCKER_COMPOSE_RAW" \
    "$COOLIFY_MAIL_SERVER_NAME" \
    "$COOLIFY_MAIL_SERVER_DESC"
}

# ─────── System Refresh ───────
system_refresh() {
  wait_for_apt_lock
  apt-get update -y
  apt-get dist-upgrade -y
  apt-get autoremove -y
  apt-get clean -y
}

# ─────── Install Base Utilities ───────
install_base_utilities() {
  wait_for_apt_lock
  apt-get install -y --no-install-recommends \
    curl wget git htop vim ufw fail2ban \
    unattended-upgrades software-properties-common \
    apt-transport-https ca-certificates gnupg lsb-release
}

# ─────── Enable Fail2Ban ───────
enable_fail2ban() {
  systemctl enable --now fail2ban
}

# ─────── SSH Hardening ───────
ssh_hardening() {
  sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
  systemctl restart ssh
}

# ─────── Firewall Setup ───────
setup_firewall() {
  ufw default deny incoming
  ufw default allow outgoing
  ufw allow 22/tcp
  ufw allow 80,443/tcp
  ufw allow 25,465,587/tcp
  ufw allow 110,995/tcp
  ufw allow 143,993/tcp
  ufw --force enable
}

# ─────── Install Coolify ───────
install_coolify() {
  export ROOT_USERNAME="${app_name}"
  export ROOT_USER_EMAIL="${coolify_email}"
  export ROOT_USER_PASSWORD="${coolify_password}"
  export DISABLE_REGISTRATION="true"
  curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
}

# ─────── Allow Coolify Ports ───────
allow_coolify_ports() {
  ufw allow 8000,6001,6002/tcp
}

# ─────── Main ───────
main() {
  system_refresh
  install_base_utilities
  ssh_hardening

  setup_firewall
  enable_fail2ban

  install_coolify
  allow_coolify_ports

  wait_for_coolify
  create_coolify_access_token

  setup_mail_service
  echo "===== Quickfra bootstrap complete ====="
}

# ─────── Execute Main ───────
main
