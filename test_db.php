<?php
require 'backend/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('SELECT config FROM landing_page_config WHERE id=1');
$config = $stmt->fetchColumn();
echo $config;
