<?php
/**
 * OHI Backend — API Entry Point & Router
 *
 * All requests are routed through this file via .htaccess.
 * Deploy the entire `api/` folder to Namecheap public_html/api/
 */

declare(strict_types=1);

// ─── Load .env ────────────────────────────────────────────────────────────────
$envFile = dirname(__DIR__) . '/.env';
if (file_exists($envFile)) {
    $lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || str_starts_with($line, '#') || !str_contains($line, '=')) continue;
        [$key, $value] = explode('=', $line, 2);
        $key   = trim($key);
        $value = trim($value, " \t\n\r\0\x0B\"'");
        if (!getenv($key)) {
            putenv("{$key}={$value}");
            $_ENV[$key] = $value;
        }
    }
}

// ─── CORS Headers ─────────────────────────────────────────────────────────────
$allowedOrigin = getenv('CORS_ORIGIN') ?: '*';
$origin        = $_SERVER['HTTP_ORIGIN'] ?? '';

// Allow the configured origin, or any origin in development
if ($allowedOrigin === '*' || $origin === $allowedOrigin) {
    header("Access-Control-Allow-Origin: {$origin}");
} else {
    header("Access-Control-Allow-Origin: {$allowedOrigin}");
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Max-Age: 86400');
header('Content-Type: application/json; charset=UTF-8');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ─── Parse URI ────────────────────────────────────────────────────────────────
$requestUri  = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$scriptName  = dirname($_SERVER['SCRIPT_NAME']); // e.g. /api
$path        = '/' . trim(str_replace($scriptName, '', $requestUri), '/');

// ─── Route Dispatch ───────────────────────────────────────────────────────────
try {
    if ($path === '/' || $path === '') {
        // Health check / API info
        echo json_encode([
            'name'    => 'OHI API',
            'version' => '1.0.0',
            'status'  => 'running',
            'endpoints' => [
                'GET  /landing-config',
                'PUT  /landing-config',
                'POST /auth/login',
                'POST /auth/me',
                'POST /auth/register',
                'GET  /admin/profile',
                'PUT  /admin/profile',
                'GET  /admin/users',
                'DELETE /admin/users/{id}',
            ],
        ]);
        exit;
    }

    if (str_starts_with($path, '/landing-config')) {
        require __DIR__ . '/routes/landing.php';
        exit;
    }

    if (str_starts_with($path, '/auth/')) {
        require __DIR__ . '/routes/auth.php';
        exit;
    }

    if (str_starts_with($path, '/admin/')) {
        require __DIR__ . '/routes/admin.php';
        exit;
    }

    if (str_starts_with($path, '/chat')) {
        require __DIR__ . '/routes/chat.php';
        exit;
    }

    // ─── 404 Not Found ────────────────────────────────────────────────────────
    http_response_code(404);
    echo json_encode(['error' => "Route not found: {$path}"]);

} catch (Throwable $e) {
    $isDev = (getenv('APP_ENV') ?? 'production') === 'development';
    http_response_code(500);
    echo json_encode([
        'error'   => 'Internal server error.',
        'details' => $isDev ? $e->getMessage() : null,
        'file'    => $isDev ? $e->getFile() . ':' . $e->getLine() : null,
    ]);
}
