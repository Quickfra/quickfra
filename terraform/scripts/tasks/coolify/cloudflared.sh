#!/usr/bin/env bash

create_coolify_cloudflared_project() {
  local project_name="Cloudflare Tunneling"
  local project_desc="Project for managing Cloudflare tunneling services"

  local uuid="$(create_coolify_project "$project_name" "$project_desc")"
  echo "$uuid"
}

create_coolify_cloudflared_resource() {
  local project_uuid="$1"

  local uuid="$(create_coolify_resource \
  "$project_uuid" \
  "Cloudflared Tunnel" \
  "Cloudflare Tunnel Service for secure access to Coolify and other services" \
  "cloudflared")"
  echo "$uuid"
}

set_cloudflared_env_token() {
  local resource_uuid="$1"
  local token="$CLOUDFLARE_TUNNEL_TOKEN"

  set_coolify_app_env_var "$resource_uuid" "CLOUDFLARE_TUNNEL_TOKEN" "$token"
}

task_setup_cloudfared() {
  set -x
  log "[COOLIFY] :: Setting up Cloudflare Tunneling..."
  local project_uuid="$(create_coolify_cloudflared_project)"
  echo "DEBUG: project_uuid=[$project_uuid]"
  local resource_uuid="$(create_coolify_cloudflared_resource "$project_uuid")"
  echo "DEBUG: resource_uuid=[$resource_uuid]"
  set_cloudflared_env_token "$resource_uuid"
  log "[COOLIFY] :: Cloudflare Tunneling setup complete."
  set +x
}