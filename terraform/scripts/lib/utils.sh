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