<?php
require 'backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('SELECT config FROM landing_page_config WHERE id = 1');
$config = json_decode($stmt->fetchColumn(), true);
$config['companyProfile']['brochurePdf'] = "https://example.com/test.pdf";
$newConfigJson = json_encode($config);
$stmt = $db->prepare('UPDATE landing_page_config SET config = :config, updated_at = NOW() WHERE id = 1');
$stmt->execute([':config' => $newConfigJson]);
echo "Updated config. Checking what's in DB now...\n";
$stmt2 = $db->query('SELECT config FROM landing_page_config WHERE id = 1');
$finalConfig = json_decode($stmt2->fetchColumn(), true);
echo $finalConfig['companyProfile']['brochurePdf'] ?? 'MISSING';
