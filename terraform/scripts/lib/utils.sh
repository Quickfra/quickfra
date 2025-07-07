#!/usr/bin/env bash

# ─────── Logger ───────
log() { 
  printf '[%s] %s\n' "$(date +%T)" "$*" >&2
}

hash() {
  local input="$1"
  python3 -c "import bcrypt; print(bcrypt.hashpw(b'$input', bcrypt.gensalt()).decode())"
}

escape_sed() {
  echo "$1" | sed -e 's/[\/&]/\\&/g'
}

is_container_running() {
  local name="$1"
  [ "$(docker inspect -f '{{.State.Status}}' "$name")" = "running" ]
}

wait_for_container() {
  local name="$1"
  local timeout="${2:-60}"
  local waited=0
  while ! is_container_running "$name"; do
    log "[${name^^}] :: Waiting to be running..." >&2
    sleep 2
    waited=$((waited + 2))
    if [ "$waited" -ge "$timeout" ]; then
      echo "[${name^^}] :: Timeout waiting for container to be running" >&2
      exit 1
    fi
  done
}