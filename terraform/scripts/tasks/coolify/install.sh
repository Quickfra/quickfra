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
}