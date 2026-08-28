<?php
require_once __DIR__ . '/config/database.php';

$db = Database::getInstance();
$stmt = $db->prepare('SELECT id, config FROM landing_page_config WHERE id = 1 LIMIT 1');
$stmt->execute();
$row = $stmt->fetch();

if (!$row) {
    echo "No config found.\n";
    exit;
}

$config = json_decode($row['config'], true);

function cleanBase64(&$item) {
    if (is_array($item)) {
        foreach ($item as $key => &$value) {
            cleanBase64($value);
        }
    } else if (is_string($item) && strpos($item, 'data:image') === 0) {
        // Disabled aggressive base64 removal as it was causing data loss for users
        // uploading images from old dashboard sessions.
        // if (strlen($item) > 100000) {
        //    echo "Found large base64 string (size: " . strlen($item) . ")\n";
        //    // $item = ''; // NO LONGER DELETING USER DATA
        // }
    }
}

cleanBase64($config);

$configJson = json_encode($config);
echo "New config size: " . strlen($configJson) . "\n";

$updateStmt = $db->prepare('UPDATE landing_page_config SET config = :config WHERE id = 1');
$updateStmt->execute([':config' => $configJson]);

echo "Cleaned up database config.\n";
