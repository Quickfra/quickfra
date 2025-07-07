
#!/usr/bin/env bash

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
  ufw --force enable
}