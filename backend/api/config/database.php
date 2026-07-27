<?php
/**
 * Database Configuration — PDO MySQL Singleton
 * Reads credentials from a .env file in the backend root.
 */

class Database {
    private static ?PDO $instance = null;

    /**
     * Returns the single PDO instance (creates it on first call).
     */
    public static function getInstance(): PDO {
        if (self::$instance === null) {
            // Load .env if not already loaded by index.php
            $envFile = dirname(__DIR__, 2) . '/.env';
            if (file_exists($envFile) && !getenv('DATABASE_URL')) {
                self::loadEnv($envFile);
            }

            $dsn = getenv('DATABASE_URL');
            if (!$dsn) {
                http_response_code(500);
                die(json_encode(['error' => 'DATABASE_URL is not configured.']));
            }

            // Parse the DSN: mysql://user:pass@host:port/dbname
            $parsed = parse_url($dsn);
            $host   = $parsed['host']  ?? 'localhost';
            $port   = $parsed['port']  ?? 3306;
            $dbname = ltrim($parsed['path'] ?? '', '/');
            $user   = $parsed['user']  ?? '';
            $pass   = rawurldecode($parsed['pass'] ?? '');

            try {
                self::$instance = new PDO(
                    "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4",
                    $user,
                    $pass,
                    [
                        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES   => false,
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
