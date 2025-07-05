#!/usr/bin/env bash
task_setup_mail() {
  
  # Set up variables for mail service
  local COOLIFY_MAIL_PROJECT_NAME="Mail Services"
  local COOLIFY_MAIL_PROJECT_DESC="Project for all mail-related infrastructure and automation"

  local COOLIFY_MAIL_PROJECT_UUID
  COOLIFY_MAIL_PROJECT_UUID=$(create_coolify_project "$COOLIFY_MAIL_PROJECT_NAME" "$COOLIFY_MAIL_PROJECT_DESC")

  local COOLIFY_MAIL_SERVER_NAME="Stalwart Mail Server"
  local COOLIFY_MAIL_SERVER_DESC="Stalwart Mail Server for handling all email services"

  local DOCKER_COMPOSE_RAW
  DOCKER_COMPOSE_RAW=$(curl -fsSL "$DOCKER_BASE_URL/stalwart.yaml")

  create_coolify_app_dockercompose \
    "$COOLIFY_MAIL_PROJECT_UUID" \
    "$(get_coolify_server_uuid)" \
    "production" \
    "$DOCKER_COMPOSE_RAW" \
    "$COOLIFY_MAIL_SERVER_NAME" \
    "$COOLIFY_MAIL_SERVER_DESC"
}