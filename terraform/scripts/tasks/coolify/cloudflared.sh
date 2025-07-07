#!/usr/bin/env bash

create_coolify_cloudflared_project() {
  local project_name="Cloudflare Tunneling"
  local project_desc="Project for managing Cloudflare tunneling services"

  create_coolify_project "$project_name" "$project_desc"
}

create_coolify_cloudflared_resource() {
  local project_uuid="$1"

  create_coolify_resource \
  "$project_uuid" \
  "Cloudflared Tunnel" \
  "Cloudflare Tunnel Service for secure access to Coolify and other services" \
  "cloudflared"
}

set_cloudflared_env_token() {
  local resource_uuid="$1"
  local token="$CLOUDFLARE_TUNNEL_TOKEN"

  set_coolify_app_env_var "$resource_uuid" "CLOUDFLARE_TUNNEL_TOKEN" "$token"
}

task_setup_cloudfared() {
  log "[COOLIFY] :: Setting up Cloudflare Tunneling..."
  local project_uuid="$(create_coolify_cloudflared_project)"
  local resource_uuid="$(create_coolify_cloudflared_resource "$project_uuid")"
  set_cloudflared_env_token "$resource_uuid"
  log "[COOLIFY] :: Cloudflare Tunneling setup complete."
}
