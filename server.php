<?php
/**
 * Single-container Unified Router (PHP + React SPA)
 * Serves React frontend static files from dist/ and routes /api/* to backend/api/index.php
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// ─── 1. Route API requests to PHP backend router ─────────────────────────────
if (str_starts_with($uri, '/api')) {
    $_SERVER['SCRIPT_NAME'] = '/api/index.php';
    require __DIR__ . '/backend/api/index.php';
    exit;
}

// ─── 2. Serve static assets directly from dist/ ──────────────────────────────
$file = __DIR__ . '/dist' . $uri;
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $mimeTypes = [
        'css'   => 'text/css; charset=utf-8',
        'js'    => 'application/javascript; charset=utf-8',
        'mjs'   => 'application/javascript; charset=utf-8',
        'json'  => 'application/json',
        'png'   => 'image/png',
        'jpg'   => 'image/jpeg',
        'jpeg'  => 'image/jpeg',
        'gif'   => 'image/gif',
        'svg'   => 'image/svg+xml',
        'ico'   => 'image/x-icon',
        'webp'  => 'image/webp',
        'woff'  => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf'   => 'font/ttf',
    ];
    $contentType = $mimeTypes[strtolower($ext)] ?? (function_exists('mime_content_type') ? mime_content_type($file) : 'application/octet-stream');
    header("Content-Type: {$contentType}");
    readfile($file);
    exit;
}

// ─── 3. Fallback to dist/index.html for React SPA client routes ──────────────
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/dist/index.html');
