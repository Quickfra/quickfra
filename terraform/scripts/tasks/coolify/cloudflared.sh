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
  "cloudflared" \
  "%token%:$CLOUDFLARE_TUNNEL_TOKEN"
}

task_setup_cloudfared() {
  log "[COOLIFY] :: Setting up Cloudflare Tunneling..."
  local project_uuid="$(create_coolify_cloudflared_project)"
  create_coolify_cloudflared_resource "$project_uuid"
  log "[COOLIFY] :: Cloudflare Tunneling setup complete."
}
