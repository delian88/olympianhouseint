<?php
/**
 * Upload Routes
 *
 * POST /api/upload  → Uploads a file to Cloudinary and returns the URL. Requires Auth.
 */

require_once __DIR__ . '/../middleware/auth.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    return;
}

// Require authentication for uploads
$payload = Auth::requireAuth();

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'No file uploaded or upload error.']);
    return;
}

$file = $_FILES['file'];
$tmpPath = $file['tmp_name'];
$fileName = $file['name'];

$cloudName = getenv('CLOUDINARY_CLOUD_NAME');
$apiKey = getenv('CLOUDINARY_API_KEY');
$apiSecret = getenv('CLOUDINARY_API_SECRET');

if (!$cloudName || !$apiKey || !$apiSecret) {
    http_response_code(500);
    echo json_encode(['error' => 'Cloudinary credentials not configured on the server.']);
    return;
}

// Generate Cloudinary signature
$timestamp = time();
$paramsToSign = "timestamp=" . $timestamp;
$signature = sha1($paramsToSign . $apiSecret);

$ch = curl_init();
$cloudinaryUrl = "https://api.cloudinary.com/v1_1/{$cloudName}/auto/upload";

if (class_exists('CURLFile')) {
    $cfile = new CURLFile($tmpPath, $file['type'], $fileName);
} else {
    $cfile = curl_file_create($tmpPath, $file['type'], $fileName);
}

$postFields = [
    'file' => $cfile,
    'api_key' => $apiKey,
    'timestamp' => $timestamp,
    'signature' => $signature
];

curl_setopt($ch, CURLOPT_URL, $cloudinaryUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if (curl_errno($ch)) {
    http_response_code(500);
    echo json_encode(['error' => 'cURL error: ' . curl_error($ch)]);
    curl_close($ch);
    return;
}

curl_close($ch);

$data = json_decode($response, true);

if ($httpCode === 200 && isset($data['secure_url'])) {
    echo json_encode(['url' => $data['secure_url']]);
} else {
    http_response_code($httpCode);
    echo json_encode([
        'error' => 'Cloudinary upload failed.',
        'details' => $data
    ]);
}
