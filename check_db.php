<?php
require 'backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('SELECT config FROM landing_page_config WHERE id = 1');
$res = $stmt->fetchColumn();
echo (strpos($res, 'brochurePdf') !== false) ? 'HAS_PDF' : 'NO_PDF';
