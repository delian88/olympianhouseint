<?php
require_once __DIR__ . '/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('SELECT config FROM landing_page_config WHERE id = 1');
echo $stmt->fetchColumn();
