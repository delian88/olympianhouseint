<?php
require 'c:/Users/PC/OHI-UPDATED/backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query("SHOW VARIABLES LIKE 'max_allowed_packet'");
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($rows);
