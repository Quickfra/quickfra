#!/usr/bin/env bash

# ─────── Logger ───────
log() { 
  printf '[%s] %s\n' "$(date +%T)" "$*" >&2
}