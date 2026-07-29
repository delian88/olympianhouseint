# ─── 1. Build React Frontend ──────────────────────────────────────────────────
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

# ─── 2. Unified PHP Web Server Container ─────────────────────────────────────
FROM php:8.2-cli-alpine
RUN docker-php-ext-install pdo pdo_mysql

WORKDIR /app

# Copy built frontend assets and PHP backend code
COPY --from=frontend-builder /app/dist ./dist
COPY backend ./backend
COPY server.php ./server.php

EXPOSE 8080

# Start PHP server using server.php router on Render PORT
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} server.php"]
