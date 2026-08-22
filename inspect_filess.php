<?php
echo "Inspecting remote Filess.io MySQL server at 188.245.153.167:3306...\n";
$host = '188.245.153.167';
$port = 3306;
$user = 'ohi_db_vesselsraw';
$pass = '36767599192cb303f740afa55acb42a057686727';

try {
    $pdo = new PDO("mysql:host={$host};port={$port}", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_TIMEOUT => 10
    ]);

    $dbs = $pdo->query("SHOW DATABASES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Databases found (" . count($dbs) . "): " . implode(', ', $dbs) . "\n\n";

    foreach ($dbs as $dbName) {
        echo "=== Database: $dbName ===\n";
        try {
            $pdo->exec("USE `$dbName`");
            $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
            echo "Tables (" . count($tables) . "): " . implode(', ', $tables) . "\n";
            foreach ($tables as $table) {
                $count = $pdo->query("SELECT COUNT(*) FROM `$dbName`.`$table`")->fetchColumn();
                echo "  - `$table`: $count rows\n";
            }
        } catch (Exception $ex) {
            echo "  Error reading $dbName: " . $ex->getMessage() . "\n";
        }
        echo "\n";
    }

} catch (Exception $e) {
    echo "ERROR: " . $e->getMessage() . "\n";
}
