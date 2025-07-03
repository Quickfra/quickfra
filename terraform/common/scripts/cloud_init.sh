#!/usr/bin/env bash
set -euo pipefail

# ─────── 1. Password Generator ───────
generate_coolify_password() {
  upper=$(tr -dc 'A-Z' < /dev/urandom | head -c1)
  lower=$(tr -dc 'a-z' < /dev/urandom | head -c1)
  number=$(tr -dc '0-9' < /dev/urandom | head -c1)
  symbol=$(tr -dc '!@#$%^&*()_+=-[]{};:,.?' < /dev/urandom | head -c1)
  rest=$(tr -dc 'A-Za-z0-9!@#$%^&*()_+=-[]{};:,.?' < /dev/urandom | head -c12)
  password="${upper}${lower}${number}${symbol}${rest}"
  password=$(echo "$password" | fold -w1 | shuf | tr -d '\n')
  echo "$password"
}

# ─────── 2. System Refresh ───────
system_refresh() {
  apt-get update -y
  apt-get dist-upgrade -y
  apt-get autoremove -y
  apt-get clean -y
}

# ─────── 3. Install Base Utilities ───────
install_base_utilities() {
  apt-get install -y --no-install-recommends \
    curl wget git htop vim ufw fail2ban \
    unattended-upgrades software-properties-common \
    apt-transport-https ca-certificates gnupg lsb-release
}

# ─────── 3. Enable Fail2Ban ───────
enable_fail2ban() {
  systemctl enable --now fail2ban
}


# ─────── 4. SSH Hardening ───────
ssh_hardening() {
  sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
  systemctl restart ssh
}

# ─────── 5. Firewall Setup ───────
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

# ─────── 6. Install Coolify ───────
install_coolify() {
  export ROOT_USERNAME="${app_name}"
  export ROOT_USER_EMAIL="${root_user_email}"
  export ROOT_USER_PASSWORD="${root_user_password}"
  export DISABLE_REGISTRATION="true"
  curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
}

# ─────── 7. Allow Coolify Ports ───────
allow_coolify_ports() {
  ufw allow 8000,6001,6002/tcp
}

# ─────── 8. Main ───────
main() {
  system_refresh
  install_base_utilities
  ssh_hardening
  setup_firewall
  enable_fail2ban

  install_coolify
  allow_coolify_ports

  echo "===== Quickfra bootstrap complete ====="
}

# ─────── Execute Main ───────
main
