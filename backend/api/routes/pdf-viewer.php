<?php
// PDF Viewer Proxy
// Proxies Cloudinary raw PDF files to serve them inline instead of as attachments

if (!isset($_GET['url'])) {
    http_response_code(400);
    echo "Missing url parameter";
    exit;
}

$url = $_GET['url'];

// Basic validation to ensure it's a cloudinary PDF URL
if (strpos($url, 'res.cloudinary.com') === false || !str_ends_with(strtolower($url), '.pdf')) {
    http_response_code(400);
    echo "Invalid PDF URL";
    exit;
}

// Fetch the PDF using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // For local dev if needed
$pdfContent = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode !== 200 || !$pdfContent) {
    error_log("pdf-viewer proxy failed. URL: " . $url . " HTTP Code: " . $httpCode);
    http_response_code(404);
    echo "Could not fetch the PDF document";
    exit;
}

// Extract filename
$filename = basename(parse_url($url, PHP_URL_PATH));

// Serve the PDF inline
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Cache-Control: public, max-age=86400'); // Cache for 1 day
header('Content-Length: ' . strlen($pdfContent));

echo $pdfContent;
exit;
