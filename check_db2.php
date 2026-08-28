<?php
require 'backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('SELECT config FROM landing_page_config WHERE id = 1');
$res = $stmt->fetchColumn();
echo json_encode(json_decode($res, true)['companyProfile'] ?? null, JSON_PRETTY_PRINT);
