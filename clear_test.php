<?php
require_once 'backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query("SELECT config FROM landing_page_config WHERE id = 1");
$row = $stmt->fetch(PDO::FETCH_ASSOC);
$config = json_decode($row['config'], true);
unset($config['companyProfile']['brochurePdf']);
$stmt = $db->prepare("UPDATE landing_page_config SET config = ? WHERE id = 1");
$stmt->execute([json_encode($config)]);
echo "Removed test value";
