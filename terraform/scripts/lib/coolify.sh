#!/usr/bin/env bash

# -------------------------------- API --------------------------------

# ─────── Check Health ───────
is_coolify_ready() {
  local url="http://localhost:8000/api/v1/health"
  [ "$(curl -sf "$url")" = "OK" ]
}

create_coolify_project() {

  local project_name="$1"
  local project_desc="$2"

  curl -s localhost:8000/api/v1/projects \
    --request POST \
    --header "Authorization: Bearer $(get_coolify_token)" \
    --header "Content-Type: application/json" \
    --data '{
      "name": "'"$project_name"'",
      "description": "'"$project_desc"'"
    }' | jq -r '.uuid'
}

create_coolify_app_dockercompose() {
  local project_uuid="$1"
  local server_uuid="$2"
  local environment_name="$3"
  local docker_compose_raw="$4"
  local app_name="$5"
  local app_desc="$6"

  local docker_compose_raw_serialized=$(printf '%s' "$docker_compose_raw" | jq -Rs .)
  local docker_compose_raw_b64=$(printf '%s' "$docker_compose_raw" | base64 -w 0)

  curl -s localhost:8000/api/v1/applications/dockercompose \
    --request POST \
    --header "Authorization: Bearer $(get_coolify_token)" \
    --header "Content-Type: application/json" \
    --data '{
 "project_uuid": "'"$project_uuid"'",
 "server_uuid": "'"$server_uuid"'",
 "environment_name": "'"$environment_name"'",
 "docker_compose_raw": "'"$docker_compose_raw_b64"'",
 "name": "'"$app_name"'",
 "description": "'"$app_desc"'",
 "instant_deploy": true
}' | jq -r '.uuid'
}

set_coolify_app_env_var() {
  local app_uuid="$1"
  local key="$2"
  local value="$3"

  curl -s localhost:8000/api/v1/applications/$app_uuid/envs \
    --request POST \
    --header "Authorization: Bearer $(get_coolify_token)" \
    --header "Content-Type: application/json" \
    --data '{
      "key": "'"$key"'",
      "value": "'"$value"'"
    }'
}

get_all_coolify_servers_data() {
  curl -s localhost:8000/api/v1/servers \
    --header "Authorization: Bearer $(get_coolify_token)"
}

get_main_coolify_server_data() {
  get_all_coolify_servers_data | jq ".[0]"
}

get_main_coolify_server_uuid() {
  get_main_coolify_server_data | jq -r '.uuid'
}

get_main_coolify_server_id() {
  get_main_coolify_server_data | jq -r '.settings.server_id'
}



# -------------------------------- UTILS --------------------------------ç
allow_coolify_access() {
  # Allow Coolify ports in the firewall
  ufw allow 8000,6001,6002/tcp
}

create_coolify_resource(){
  local project_uuid="$1"
  local resource_name="$2"
  local resource_desc="$3"
  local compose_file="$4"
  local replacements="${5:-}"

  local docker_compose_raw=$(curl -fsSL "$DOCKER_BASE_URL/${compose_file}.yaml")

  if [[ -n "$replacements" ]]; then
    # Split replacements by '|'
    IFS='|' read -ra TOKENS <<< "$replacements"
    for pair in "${TOKENS[@]}"; do
      local key="${pair%%:*}"
      local value="${pair#*:}"
      docker_compose_raw=$(echo "$docker_compose_raw" | sed "s|$key|$value|g")
    done
  fi

  create_coolify_app_dockercompose \
    "$project_uuid" \
    "$(get_main_coolify_server_uuid)" \
    "$COOLIFY_DEFAULT_ENVIRONMENT" \
    "$docker_compose_raw" \
    "$resource_name" \
    "$resource_desc"
}

# ─────── Wait for Coolify ───────
wait_for_coolify() {
  while ! is_coolify_ready; do
    log "[COOLIFY] :: Waiting to be ready..." >&2
    sleep 2
  done
}

# ─────── Create Coolify Access Token ───────
create_coolify_access_token() {
  # Create plain token
  local token=$(cat /proc/sys/kernel/random/uuid)

  # Hash it with SHA256
  local token_hash=$(echo -n "$token" | sha256sum | awk '{print $1}')

  # Insert into the database | TODO: Replace with API call once available
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
INSERT INTO personal_access_tokens (
  tokenable_type, tokenable_id, name, token, team_id, abilities, created_at, updated_at
) VALUES (
  'App\Models\User', 0, 'Quickfra Automation', '$token_hash', 0, '["root"]', NOW(), NOW()
);
EOF

  # Enable API Usage | TODO: Replace with API call once available
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
UPDATE instance_settings SET is_api_enabled = 'true';
EOF

  echo "$token" >/root/.coolify_api_token
  chmod 600 /root/.coolify_api_token
}

get_coolify_token() {
  cat "$COOLIFY_TOKEN_PATH"
}

set_coolify_domain() {
  local domain="$1"

  # TODO: Replace with API call once available
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
UPDATE instance_settings SET fqdn = 'http://coolify.$domain';
EOF
}

set_coolify_server_wildcard_domain() {
  local domain="$1"
  local server_id="$2"

  # TODO: Replace with API call once available
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
UPDATE server_settings SET wildcard_domain = 'http://$domain' WHERE server_id = '$(get_main_coolify_server_id)';
EOF
}


