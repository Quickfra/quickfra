
#!/usr/bin/env bash

# ─────── Enable Fail2Ban ───────
enable_fail2ban() {
  log "[SECURITY] :: Enabling Fail2Ban"
  systemctl enable --now fail2ban
}

# ─────── SSH Hardening ───────
ssh_hardening() {
  log "[SECURITY] :: Hardening SSH configuration"
  sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' /etc/ssh/sshd_config
  systemctl restart ssh
}

# ─────── Firewall Setup ───────
setup_firewall() {
  log "[SECURITY] :: Setting up firewall"
  ufw default deny incoming
  ufw default allow outgoing
  ufw allow 22/tcp
  ufw allow 80,443/tcp
  ufw --force enable
}