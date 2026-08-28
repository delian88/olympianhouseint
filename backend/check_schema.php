<?php
require 'c:/Users/PC/OHI-UPDATED/backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('DESCRIBE landing_page_config');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($rows);
