<?php
/**
 * Landing Page Config Routes
 *
 * GET  /api/landing-config        → Returns the config JSON (public)
 * PUT  /api/landing-config        → Updates config (requires JWT auth)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$db     = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// ─── GET /api/landing-config ──────────────────────────────────────────────────
if ($method === 'GET') {
    $stmt = $db->prepare('SELECT id, config, updated_at FROM landing_page_config WHERE id = 1 LIMIT 1');
    $stmt->execute();
    $row = $stmt->fetch();

    if (!$row) {
        http_response_code(404);
        echo json_encode(['error' => 'Landing page config not found.']);
        return;
    }

    // config is stored as JSON string in MySQL. Avoid decoding and re-encoding it to save memory and prevent fatals.
    echo '{"data":{"id":';
    echo json_encode($row['id']);
    echo ',"config":';
    echo $row['config'];
    echo ',"updated_at":';
    echo json_encode($row['updated_at']);
    echo '}}';
    return;
}

// ─── PUT /api/landing-config ──────────────────────────────────────────────────
if ($method === 'PUT') {
    // Require authentication
    $payload = Auth::requireAuth();

    $body = json_decode(file_get_contents('php://input'), true);
    if (!isset($body['config']) || !is_array($body['config'])) {
        http_response_code(422);
        echo json_encode(['error' => 'Request body must include a "config" object.']);
        return;
    }

    $configJson = json_encode($body['config']);

    // Upsert: insert if id=1 doesn't exist, otherwise update
    $stmt = $db->prepare(
        'INSERT INTO landing_page_config (id, config, updated_at)
         VALUES (1, :config, NOW())
         ON DUPLICATE KEY UPDATE config = VALUES(config), updated_at = NOW()'
    );
    $stmt->execute([':config' => $configJson]);

    echo json_encode(['message' => 'Landing page config updated successfully.']);
    return;
}

// ─── Method Not Allowed ───────────────────────────────────────────────────────
http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
