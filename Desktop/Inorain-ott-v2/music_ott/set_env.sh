#!/bin/bash

FILE_PATH=$(find /usr/share/nginx/html/dist -type f -name "*")


for file in $FILE_PATH; do
    sed -i "s|__CARD_PATH__|$CARD_PATH|g" "$file"

    sed -i "s|__AUTH_PATH__|$AUTH_PATH|g" "$file"

    sed -i "s|__SIDEBAR_PATH__|$SIDEBAR_PATH|g" "$file"

    sed -i "s|__MAIN_PATH__|$MAIN_PATH|g" "$file"

    sed -i "s|__SEARCH_PATH__|$SEARCH_PATH|g" "$file"

    sed -i "s|__SETTINGS_PATH__|$SETTINGS_PATH|g" "$file"

    sed -i "s|__MUSIC_PATH__|$MUSIC_PATH|g" "$file"

    sed -i "s|__RADIO_PATH__|$RADIO_PATH|g" "$file"

    sed -i "s|__PLAYER_PATH__|$PLAYER_PATH|g" "$file"

    sed -i "s|__VOD_CONTROLS_PATH__|$VOD_CONTROLS_PATH|g" "$file"

    sed -i "s|__LIVE_CONTROLS_PATH__|$LIVE_CONTROLS_PATH|g" "$file"

    sed -i "s|__PUBLIC_PATH__|$PUBLIC_PATH|g" "$file"
done


# create config json data
# CONF=$(cat <<EOF
# {
#   "app_name": "$APP_NAME",
#   "service_name": "$SERVICE_NAME",
#   "host": "$HOST",
# }
# EOF
# )

# Send POST register to monitoring service
# curl -X POST "$MONITORING_HOST/api/register" \
#      -H "Content-Type: application/json" \
#      -d "$CONF"

# Create Healthchecks file
# touch "healthchecks"
