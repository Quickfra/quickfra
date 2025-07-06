#!/usr/bin/env bash

task_setup_cloudfared() {
  # Set up variables for mail service
  local coolify_project_name="Cloudflare"
  local coolify_project_desc="Project for managing Cloudflare services"

  local coolify_project_uuid
  coolify_project_uuid=$(create_coolify_project "$coolify_project_name" "$coolify_project_desc")

  local coolify_server_name="Cloudflared"
  local coolify_server_desc="Cloudflare Tunnel Service for secure access to Coolify and other services"

  local docker_compose_raw
  docker_compose_raw=$(curl -fsSL "$DOCKER_BASE_URL/cloudflared.yaml" | sed "s|%token%|$CLOUDFLARE_TUNNEL_TOKEN|g")

  create_coolify_app_dockercompose \
    "$coolify_project_uuid" \
    "$(get_coolify_server_uuid)" \
    "production" \
    "$docker_compose_raw" \
    "$coolify_server_name" \
    "$coolify_server_desc"
}
