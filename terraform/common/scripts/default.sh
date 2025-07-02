#!/usr/bin/env bash
#

set -euo pipefail
export DEBIAN_FRONTEND=noninteractive

### 0. System refresh
apt-get update -y
apt-get dist-upgrade -y
apt-get autoremove -y
apt-get clean -y

### 1. Base utilities
apt-get install -y --no-install-recommends \
  curl wget git htop vim ufw fail2ban \
  unattended-upgrades software-properties-common \
  apt-transport-https ca-certificates gnupg lsb-release

### 2. SSH hardening
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart ssh

### 3. Firewall (UFW)
ufw default deny incoming
ufw default allow outgoing

# SSH
ufw allow 22/tcp

# Web
ufw allow 80,443,8080/tcp

# Mail
ufw allow 25,465,587/tcp
ufw allow 110,995/tcp
ufw allow 143,993/tcp
ufw --force enable

### 4. Fail2Ban
systemctl enable --now fail2ban

### Install Coolify
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash 

echo "===== Quickfra bootstrap complete ====="
