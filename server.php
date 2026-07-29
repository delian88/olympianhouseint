<?php
/**
 * Single-container Unified Router (PHP + React SPA)
 * Serves React frontend static files from dist/ and routes /api/* to backend/api/index.php
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// 1. Route API requests to PHP backend router
if (str_starts_with($uri, '/api')) {
    $_SERVER['SCRIPT_NAME'] = '/api/index.php';
    require __DIR__ . '/backend/api/index.php';
    exit;
}

// 2. Serve static assets directly if file exists in dist/
$file = __DIR__ . '/dist' . $uri;
if ($uri !== '/' && file_exists($file) && !is_dir($file)) {
    return false; // Built-in PHP server handles content-type and static file response
}

// 3. Fallback to dist/index.html for React SPA routes (e.g. /admin/login)
header('Content-Type: text/html; charset=utf-8');
readfile(__DIR__ . '/dist/index.html');
