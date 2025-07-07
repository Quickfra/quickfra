#!/usr/bin/env bash

replace_snappymail_name(){
    local title=$(escape_sed "$APP_NAME")
    local config_file="$SNAPPYMAIL_CONFIG_FILE"
    sed -i "s#SnappyMail#$title#g" "$config_file"
}

# Replace snappymail login credentials the same as the coolify panel so the user does not get confused.
# This is a temporary solution until the user can set their own credentials.
# It is recommended to change the password after the first login.
replace_snappymail_login() {
    local config_file="$SNAPPYMAIL_CONFIG_FILE"
    local admin_login=$(escape_sed "$COOLIFY_EMAIL")
    local admin_password=$(escape_sed "$(hash "$COOLIFY_PASSWORD")")
    # Replace admin login with the coolify admin email
    sed -i "s#^admin_login = .*#admin_login = \"$admin_login\"#" "$config_file"
    # Replace admin password with the coolify admin password
    sed -i "s#^admin_password = .*#admin_password = \"$admin_password\"#" "$config_file"
}

config_snappymail() {
    replace_snappymail_name
    replace_snappymail_login
}