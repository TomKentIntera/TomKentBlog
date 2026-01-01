FROM php:8.3-cli

WORKDIR /var/www/html

# System deps for common PHP extensions + Composer
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        default-mysql-client \
        git \
        unzip \
        libzip-dev \
        libpng-dev \
        libonig-dev \
        libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# PHP extensions needed for Laravel + MySQL
RUN docker-php-ext-install -j"$(nproc)" pdo_mysql zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

EXPOSE 8000

# Dev-friendly default command:
# - installs deps (if needed)
# - ensures .env exists
# - ensures app key exists
# - runs migrations
# - serves app
CMD sh -lc "test -f .env || cp .env.example .env; composer install --no-interaction --prefer-dist && php artisan key:generate --force && until mysqladmin ping -h\"${DB_HOST:-db}\" -u\"${DB_USERNAME:-blog}\" -p\"${DB_PASSWORD:-blog}\" --silent; do sleep 1; done; php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000"
