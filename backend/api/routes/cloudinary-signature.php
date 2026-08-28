<?php
require_once __DIR__ . "/../middleware/auth.php";
$method = $_SERVER["REQUEST_METHOD"];
if ($method !== "GET") {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed."]);
    return;
}
Auth::requireAuth();
$cloudName = getenv("CLOUDINARY_CLOUD_NAME");
$apiKey = getenv("CLOUDINARY_API_KEY");
$apiSecret = getenv("CLOUDINARY_API_SECRET");
if (!$cloudName || !$apiKey || !$apiSecret) {
    http_response_code(500);
    echo json_encode(["error" => "Cloudinary credentials not configured."]);
    return;
}
$timestamp = time();

// Cloudinary signature requires parameters to be alphabetically sorted.
// 'timestamp' comes before 'unique_filename' which comes before 'use_filename'
$paramsToSign = "timestamp=" . $timestamp . "&unique_filename=false&use_filename=true";
$signature = sha1($paramsToSign . $apiSecret);

echo json_encode([
    "signature" => $signature,
    "timestamp" => $timestamp,
    "api_key" => $apiKey,
    "cloud_name" => $cloudName
]);
