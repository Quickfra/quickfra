#!/usr/bin/env bash
task_setup_mail() {
  log "[COOLIFY] :: Setting up Mail Service..."
  
  # Set up variables for mail service
  local coolify_project_name="Mail Services"
  local coolify_project_desc="Project for all mail-related infrastructure and automation"

  local coolify_project_uuid
  coolify_project_uuid=$(create_coolify_project "$coolify_project_name" "$coolify_project_desc")

  local coolify_resource_name="Stalwart Mail Server"
  local coolify_resource_desc="Stalwart Mail Server for handling all email services"

  local docker_compose_raw=$(curl -fsSL "$DOCKER_BASE_URL/stalwart.yaml"  | sed "s|yourdomain|$DOMAIN|g")

  create_coolify_app_dockercompose \
    "$coolify_project_uuid" \
    "$(get_coolify_server_uuid)" \
    "$COOLIFY_DEFAULT_ENVIRONMENT" \
    "$docker_compose_raw" \
    "$coolify_resource_name" \
    "$coolify_resource_desc"
}

allow_mail_access() {
  log "[COOLIFY] :: Allowing access to the mail server"
  ufw allow 25,465,587/tcp
  ufw allow 110,995/tcp
  ufw allow 143,993/tcp
}