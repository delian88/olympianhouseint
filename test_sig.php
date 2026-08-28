<?php
$cloudName = "h8he9fel";
$apiKey = "234241878558291";
$apiSecret = "UGpz_fzQXMWe9YxyAmyF843HxzA";

$timestamp = time();
$signature = sha1("timestamp=" . $timestamp . $apiSecret);

$file = base64_encode(file_get_contents(__DIR__ . "/test.txt")); // Just dummy
echo json_encode([
    "url" => "https://api.cloudinary.com/v1_1/$cloudName/auto/upload",
    "timestamp" => $timestamp,
    "api_key" => $apiKey,
    "signature" => $signature
]);
