<?php
/**
 * Database Configuration — PDO MySQL Singleton
 * Reads credentials from a .env file or server environment variables.
 */

class Database {
    private static ?PDO $instance = null;

    /**
     * Returns the single PDO instance (creates it on first call).
     */
    public static function getInstance(): PDO {
        if (self::$instance === null) {
            // Check potential .env locations
            $possibleEnvFiles = [
                __DIR__ . '/.env',
                dirname(__DIR__) . '/.env',
                dirname(__DIR__, 2) . '/.env',
            ];

            foreach ($possibleEnvFiles as $envFile) {
                if (file_exists($envFile)) {
                    self::loadEnv($envFile);
                }
            }

            $dsnStr = getenv('DATABASE_URL') ?: ($_ENV['DATABASE_URL'] ?? '');

            if ($dsnStr) {
                $parsed = parse_url($dsnStr);
                $host   = $parsed['host']  ?? 'localhost';
                $port   = $parsed['port']  ?? 3306;
                $dbname = ltrim($parsed['path'] ?? '', '/');
                $user   = $parsed['user']  ?? '';
                $pass   = rawurldecode($parsed['pass'] ?? '');
            } else {
                $host   = getenv('DB_HOST') ?: ($_ENV['DB_HOST'] ?? 'localhost');
                $port   = getenv('DB_PORT') ?: ($_ENV['DB_PORT'] ?? 3306);
                $dbname = getenv('DB_NAME') ?: ($_ENV['DB_NAME'] ?? 'ohi_db');
                $user   = getenv('DB_USER') ?: ($_ENV['DB_USER'] ?? 'root');
                $pass   = getenv('DB_PASS') !== false ? getenv('DB_PASS') : ($_ENV['DB_PASS'] ?? '');
            }

            if (!$dbname) {
                http_response_code(500);
                die(json_encode(['error' => 'Database parameters not configured.']));
            }

            try {
                self::$instance = new PDO(
                    "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4",
                    $user,
                    $pass,
                    [
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES   => false,
                        PDO::ATTR_TIMEOUT            => 5,
                    ]
                );
            } catch (PDOException $e) {
                http_response_code(500);
                die(json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]));
            }
        }

        return self::$instance;
    }

    /**
     * Minimal .env parser — sets environment variables from KEY=VALUE lines.
     */
    private static function loadEnv(string $path): void {
        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            $line = trim($line);
            if ($line === '' || str_starts_with($line, '#')) continue;
            if (!str_contains($line, '=')) continue;
            [$key, $value] = explode('=', $line, 2);
            $key   = trim($key);
            $value = trim($value, " \t\n\r\0\x0B\"'");
            if (!getenv($key)) {
                putenv("{$key}={$value}");
                $_ENV[$key] = $value;
            }
        }
    }
}
