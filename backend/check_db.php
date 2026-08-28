<?php
require_once __DIR__ . '/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query("SELECT config FROM landing_page_config WHERE id = 1");
$row = $stmt->fetch();
$config = json_decode($row['config'], true);
$projects = $config['portfolioPage']['projects'] ?? null;
echo "Is array? " . (is_array($projects) ? "yes" : "no") . "\n";
echo "Count: " . (is_array($projects) ? count($projects) : "null") . "\n";
echo "Type in JS terms: " . (is_array($projects) ? (array_is_list($projects) ? "array" : "object") : "null") . "\n";
