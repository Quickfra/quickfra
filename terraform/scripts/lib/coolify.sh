#!/usr/bin/env bash

# -------------------------------- API --------------------------------

# ─────── Check Health ───────
is_coolify_ready() {
  local url="http://localhost:8000/api/v1/health"
  [ "$(curl -sf "$url")" = "OK" ]
}

# ─────── Wait for Coolify ───────
wait_for_coolify() {
  while ! is_coolify_ready; do
    log "[COOLIFY] :: Waiting to be ready..."
    sleep 2
  done
}

# ─────── Create Coolify Access Token ───────
create_coolify_access_token() {
  log "[COOLIFY] :: Creating access token"
  # Create plain token
  local token=$(cat /proc/sys/kernel/random/uuid)

  # Hash it with SHA256
  local token_hash=$(echo -n "$token" | sha256sum | awk '{print $1}')

  # Insert into the database
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
INSERT INTO personal_access_tokens (
  tokenable_type, tokenable_id, name, token, team_id, abilities, created_at, updated_at
) VALUES (
  'App\Models\User', 0, 'Quickfra Automation', '$token_hash', 0, '["root"]', NOW(), NOW()
);
EOF

  # Enable API Usage
  docker exec -i coolify-db psql -U coolify -d coolify <<EOF
UPDATE instance_settings SET is_api_enabled = 'true';
EOF

  echo "$token" >/root/.coolify_api_token
  chmod 600 /root/.coolify_api_token
}

create_coolify_project() {

  local project_name="$1"
  local project_desc="$2"

  log "[COOLIFY] :: Creating project: $project_name"

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

  log "[COOLIFY] :: Creating Resource: $app_name"

  local docker_compose_raw_serialized=$(printf '%s' "$docker_compose_raw" | jq -Rs .)
  docker_compose_raw_b64=$(printf '%s' "$docker_compose_raw" | base64 -w 0)
  echo "$docker_compose_raw_b64"

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
  }'
}

get_coolify_token() {
  cat "$COOLIFY_TOKEN_PATH"
}

get_coolify_server_data() {
  curl -s localhost:8000/api/v1/servers \
    --header "Authorization: Bearer $(get_coolify_token)" |
    jq '.[0]'
}

get_coolify_server_uuid() {
  get_coolify_server_data | jq -r '.uuid'
}

# -------------------------------- UTILS --------------------------------ç
allow_coolify_access() {
  log "[COOLIFY] :: Allowing access to Coolify panel"
  # Allow Coolify ports in the firewall
  ufw allow 8000,6001,6002/tcp
}
