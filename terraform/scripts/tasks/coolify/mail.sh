
#!/usr/bin/env bash

create_coolify_mail_project() {
  local project_name="Mail Services"
  local project_desc="Project for managing mail services including mail server and webmail client"

  create_coolify_project "$project_name" "$project_desc"
}

create_coolify_mailserver_resource() {
  local project_uuid="$1"

  create_coolify_resource \
  "$project_uuid" \
  "Stalwart Mail Server" \
  "Stalwart Mail Server for handling all email services" \
  "stalwart" \
  "%domain%:$DOMAIN"
}

create_coolify_webmail_resource() {
  local project_uuid="$1"

  create_coolify_resource \
  "$project_uuid" \
  "Snappymail Web Client" \
  "Snappymail Webmail Client for accessing emails via web interface" \
  "snappymail"
}


task_setup_mail() {
  local project_uuid="$(create_coolify_mail_project)"

  create_coolify_mailserver_resource "$project_uuid"
  create_coolify_webmail_resource "$project_uuid"
}


allow_mail_access() {
  ufw allow 25,465,587/tcp
  ufw allow 110,995/tcp
  ufw allow 143,993/tcp
}