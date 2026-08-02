<?php
/**
 * JWT Authentication Middleware
 * Validates Bearer tokens and returns the decoded payload.
 *
 * Using a pure-PHP HMAC-SHA256 implementation — no external library required,
 * so it works on Namecheap shared hosting without Composer.
 */

class Auth {
    /**
     * Call this at the top of any protected route.
     * Sends 401 and exits if the token is missing or invalid.
     * Returns the decoded payload array on success.
     */
    public static function requireAuth(): array {
        $payload = self::getPayload();
        if ($payload === null) {
            http_response_code(401);
            die(json_encode(['error' => 'Unauthorized. Valid Bearer token required.']));
        }
        return $payload;
    }

    /**
     * Decodes and verifies the JWT from the Authorization header.
     * Returns the payload array on success, null on failure.
     */
    public static function getPayload(): ?array {
        $header = '';
        if (isset($_SERVER['Authorization'])) {
            $header = trim($_SERVER['Authorization']);
        } elseif (isset($_SERVER['HTTP_AUTHORIZATION'])) {
            $header = trim($_SERVER['HTTP_AUTHORIZATION']);
        } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
            $header = trim($_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
        } else {
            $headers = [];
            if (function_exists('apache_request_headers')) {
                $headers = apache_request_headers();
            } elseif (function_exists('getallheaders')) {
                $headers = getallheaders();
            }
            foreach ($headers as $key => $value) {
                if (strtolower($key) === 'authorization') {
                    $header = trim($value);
                    break;
                }
            }
        }
        if (!str_starts_with($header, 'Bearer ')) return null;

        $token  = substr($header, 7);
        $secret = getenv('JWT_SECRET');
        if (!$secret) return null;

        $parts = explode('.', $token);
        if (count($parts) !== 3) return null;

        [$b64Header, $b64Payload, $b64Sig] = $parts;

        // Verify signature
        $expectedSig = self::base64UrlEncode(
            hash_hmac('sha256', "{$b64Header}.{$b64Payload}", $secret, true)
        );
        if (!hash_equals($expectedSig, $b64Sig)) return null;

        // Decode payload
        $payload = json_decode(self::base64UrlDecode($b64Payload), true);
        if (!is_array($payload)) return null;

        // Check expiry
        if (isset($payload['exp']) && $payload['exp'] < time()) return null;

        return $payload;
    }

    /**
     * Creates a signed JWT token for the given user data.
     */
    public static function createToken(array $data, int $expirySeconds = 86400): string {
        $secret = getenv('JWT_SECRET') ?: 'changeme';
        $now    = time();

        $header  = self::base64UrlEncode(json_encode(['alg' => 'HS256', 'typ' => 'JWT']));
        $payload = self::base64UrlEncode(json_encode(array_merge($data, [
            'iat' => $now,
            'exp' => $now + $expirySeconds,
        ])));

        $sig = self::base64UrlEncode(
            hash_hmac('sha256', "{$header}.{$payload}", $secret, true)
        );

        return "{$header}.{$payload}.{$sig}";
    }

    // ── Helpers ────────────────────────────────────────────────────────────────

    private static function base64UrlEncode(string $data): string {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }

    private static function base64UrlDecode(string $data): string {
        return base64_decode(strtr($data, '-_', '+/') . str_repeat('=', (4 - strlen($data) % 4) % 4));
    }
}
