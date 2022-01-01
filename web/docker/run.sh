#!/bin/sh

env
cp -v /app/configs/config.js /app/public/config.js

sed -i "s~{{NEXT_PUBLIC_API_URL}}~$NEXT_PUBLIC_API_URL~" /app/public/config.js

cat /app/public/config.js

echo "Starting app"
exec "$@"