#!/usr/bin/env bash

# ─────── Wait for APT Lock ───────
wait_for_apt_lock() {
  while fuser /var/lib/apt/lists/lock >/dev/null 2>&1 ||
    log "[SYSTEM] :: Waiting for APT lock to be released..."
    fuser /var/lib/dpkg/lock >/dev/null 2>&1 ||
    fuser /var/lib/dpkg/lock-frontend >/dev/null 2>&1; do
    sleep 2
  done
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

