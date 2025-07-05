#!/usr/bin/env bash
task_setup_security() {
  enable_fail2ban
  ssh_hardening
  setup_firewall
}