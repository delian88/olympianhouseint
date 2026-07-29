# Use official PHP CLI image with Alpine (ultra lightweight)
FROM php:8.2-cli-alpine

# Install PDO MySQL extension
RUN docker-php-ext-install pdo pdo_mysql

# Set working directory
WORKDIR /app

# Copy backend files
COPY . .

# Expose port (Render automatically passes PORT env var)
EXPOSE 8080

# Run PHP built-in web server routing all requests through api/index.php
CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-8080} api/index.php"]
