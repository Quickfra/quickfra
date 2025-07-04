#!/usr/bin/env bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

# ─────── Wait for APT Lock ───────
wait_for_apt_lock() {
  while fuser /var/lib/apt/lists/lock >/dev/null 2>&1 \
     || fuser /var/lib/dpkg/lock >/dev/null 2>&1 \
     || fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do
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
  local url="http://150.136.189.161:8000/api/v1/health"
  [ "$(curl -sf "$url")" = "OK" ]
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
  echo "===== Quickfra bootstrap complete ====="
}

# ─────── Execute Main ───────
main
