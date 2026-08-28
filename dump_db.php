<?php
require 'backend/api/config/database.php';
$db = Database::getInstance();
$stmt = $db->query('SELECT config FROM landing_page_config WHERE id=1');
$row = $stmt->fetch(PDO::FETCH_ASSOC);
file_put_contents('db_dump.json', $row['config']);
echo "Done";
