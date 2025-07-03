#!/usr/bin/env bash
set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

wait_for_apt_lock() {
  while fuser /var/lib/apt/lists/lock >/dev/null 2>&1 \
     || fuser /var/lib/dpkg/lock >/dev/null 2>&1 \
     || fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do
    echo "[INFO] Esperando a que se liberen los locks de apt/dpkg..."
    sleep 2
  done
}

create_ssh_user() {
  local username="${app_name}"
  local plain_pass="${coolify_password}"

  local hashed_pass
  hashed_pass=$(openssl passwd -6 "$plain_pass")

  if ! id -u "$username" >/dev/null 2>&1; then
    useradd -m -s /bin/bash -p "$hashed_pass" "$username"
    echo "Usuario $username creado."
  else
    echo "Usuario $username ya existe, actualizando contraseña."
    usermod -p "$hashed_pass" "$username"
  fi

  echo "Configuración SSH para $username completa."
}

# ─────── 1. System Refresh ───────
system_refresh() {
  wait_for_apt_lock
  apt-get update -y
  apt-get dist-upgrade -y
  apt-get autoremove -y
  apt-get clean -y
}

# ─────── 2. Install Base Utilities ───────
install_base_utilities() {
  wait_for_apt_lock
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
  sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
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
  export ROOT_USER_EMAIL="${coolify_email}"
  export ROOT_USER_PASSWORD="${coolify_password}"
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

  create_ssh_user

  setup_firewall
  enable_fail2ban

  install_coolify
  allow_coolify_ports

  echo "===== Quickfra bootstrap complete ====="
}

# ─────── Execute Main ───────
main
