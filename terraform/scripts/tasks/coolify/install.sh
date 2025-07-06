#!/usr/bin/env bash
# ─────── Install Coolify ───────
task_setup_coolify() {
  log "[COOLIFY] :: Setting up Coolify..."
  export ROOT_USERNAME="${app_name}"
  export ROOT_USER_EMAIL="${coolify_email}"
  export ROOT_USER_PASSWORD="${coolify_password}"
  curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash

  wait_for_coolify
  create_coolify_access_token

  set_coolify_domain "$DOMAIN"
  set_coolify_server_wildcard_domain "$DOMAIN" "$(get_main_coolify_server_uuid)"
}