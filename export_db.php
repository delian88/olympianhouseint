<?php
$host = '127.0.0.1';
$port = 3306;
$db   = 'ohi_db';
$user = 'root';
$pass = '';

try {
    $pdo = new PDO("mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8mb4"
    ]);

    $tables = ['admin_users', 'admin_profiles', 'landing_page_config'];
    $out = "-- OHI Production Database Export\n";
    $out .= "-- Generated: " . date('Y-m-d H:i:s') . "\n";
    $out .= "SET FOREIGN_KEY_CHECKS=0;\nSET NAMES utf8mb4;\n\n";

    foreach ($tables as $table) {
        $out .= "DROP TABLE IF EXISTS `$table`;\n";
        $stmt = $pdo->query("SHOW CREATE TABLE `$table`");
        $row = $stmt->fetch(PDO::FETCH_NUM);
        $out .= $row[1] . ";\n\n";

        $rows = $pdo->query("SELECT * FROM `$table`")->fetchAll(PDO::FETCH_ASSOC);
        if (!empty($rows)) {
            foreach ($rows as $r) {
                $cols = array_map(fn($c) => "`" . $c . "`", array_keys($r));
                $vals = array_map(function($v) use ($pdo) {
                    if ($v === null) return "NULL";
                    return $pdo->quote($v);
                }, array_values($r));
                $out .= "INSERT INTO `$table` (" . implode(', ', $cols) . ") VALUES (" . implode(', ', $vals) . ");\n";
            }
            $out .= "\n";
        }
    }

    $out .= "SET FOREIGN_KEY_CHECKS=1;\n";

    file_put_contents(__DIR__ . '/ohi_production_database_export.sql', $out);
    echo "Export successful! Created ohi_production_database_export.sql (" . number_format(filesize(__DIR__ . '/ohi_production_database_export.sql')) . " bytes)\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
