#!/bin/bash

# Exit on error
set -e

# Cache configuration
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run migrations (be careful with this in production if you have multiple instances)
# php artisan migrate --force

# Set the port in nginx.conf
if [ ! -z "$PORT" ]; then
    sed -i "s/listen 80;/listen $PORT;/g" /etc/nginx/sites-available/default
fi

# Start php-fpm in background
php-fpm -D

# Start nginx in foreground
nginx -g "daemon off;"
