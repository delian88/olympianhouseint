<?php
/**
 * Admin Profile Routes
 *
 * GET  /api/admin/profile       → Get logged-in user's profile (requires JWT)
 * PUT  /api/admin/profile       → Update logged-in user's profile (requires JWT)
 * GET  /api/admin/users         → List all admin users (SuperAdmin only)
 * DELETE /api/admin/users/{id}  → Delete admin user (SuperAdmin only)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$db      = Database::getInstance();
$method  = $_SERVER['REQUEST_METHOD'];
$uri     = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$parts   = array_values(array_filter(explode('/', $uri)));

// Determine action from URI segments
// e.g. /api/admin/profile or /api/admin/users or /api/admin/users/5
$action  = $parts[count($parts) - 1] ?? '';
$isUsers = in_array('users', $parts, true);

// ─── GET /api/admin/profile ───────────────────────────────────────────────────
if ($method === 'GET' && !$isUsers) {
    $payload = Auth::requireAuth();

    $stmt = $db->prepare(
        'SELECT p.id, p.user_id, p.full_name, p.email, p.phone, p.role, p.avatar_url, p.updated_at
         FROM admin_profiles p
         WHERE p.user_id = :uid LIMIT 1'
    );
    $stmt->execute([':uid' => $payload['sub']]);
    $profile = $stmt->fetch();

    if (!$profile) {
        http_response_code(404);
        echo json_encode(['error' => 'Profile not found.']);
        return;
    }

    echo json_encode(['data' => $profile]);
    return;
}

// ─── PUT /api/admin/profile ───────────────────────────────────────────────────
if ($method === 'PUT' && !$isUsers) {
    $payload = Auth::requireAuth();

    $body      = json_decode(file_get_contents('php://input'), true);
    $fullName  = trim($body['full_name']  ?? '');
    $phone     = trim($body['phone']      ?? '');
    $avatarUrl = trim($body['avatar_url'] ?? '');

    // Build dynamic update query
    $fields = [];
    $params = [':uid' => $payload['sub']];

    if ($fullName  !== '') { $fields[] = 'full_name = :full_name';  $params[':full_name']  = $fullName; }
    if ($phone     !== '') { $fields[] = 'phone = :phone';          $params[':phone']      = $phone; }
    if ($avatarUrl !== '') { $fields[] = 'avatar_url = :avatar_url';$params[':avatar_url'] = $avatarUrl; }

    if (empty($fields)) {
        http_response_code(422);
        echo json_encode(['error' => 'No valid fields provided for update.']);
        return;
    }

    $fields[] = 'updated_at = NOW()';
    $sql = 'UPDATE admin_profiles SET ' . implode(', ', $fields) . ' WHERE user_id = :uid';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    echo json_encode(['message' => 'Profile updated successfully.']);
    return;
}

// ─── GET /api/admin/users ─────────────────────────────────────────────────────
if ($method === 'GET' && $isUsers) {
    $payload = Auth::requireAuth();
    if (($payload['role'] ?? '') !== 'SuperAdmin') {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied. SuperAdmin role required.']);
        return;
    }

    $stmt = $db->query(
        'SELECT u.id, u.email, u.role, u.created_at,
                p.full_name, p.phone, p.avatar_url
         FROM admin_users u
         LEFT JOIN admin_profiles p ON p.user_id = u.id
         ORDER BY u.created_at DESC'
    );
    $users = $stmt->fetchAll();

    echo json_encode(['data' => $users]);
    return;
}

// ─── DELETE /api/admin/users/{id} ────────────────────────────────────────────
if ($method === 'DELETE' && $isUsers) {
    $payload = Auth::requireAuth();
    if (($payload['role'] ?? '') !== 'SuperAdmin') {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied. SuperAdmin role required.']);
        return;
    }

    // Extract user ID from URI (last numeric segment)
    $targetId = null;
    foreach (array_reverse($parts) as $part) {
        if (is_numeric($part)) { $targetId = (int)$part; break; }
    }

    if (!$targetId) {
        http_response_code(422);
        echo json_encode(['error' => 'User ID is required.']);
        return;
    }

    // Prevent self-deletion
    if ($targetId === (int)$payload['sub']) {
        http_response_code(400);
        echo json_encode(['error' => 'You cannot delete your own account.']);
        return;
    }

    $stmt = $db->prepare('DELETE FROM admin_users WHERE id = :id');
    $stmt->execute([':id' => $targetId]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found.']);
        return;
    }

    echo json_encode(['message' => 'User deleted successfully.']);
    return;
}

// ─── Method Not Allowed ───────────────────────────────────────────────────────
http_response_code(405);
echo json_encode(['error' => 'Method not allowed.']);
