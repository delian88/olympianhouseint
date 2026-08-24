<?php
/**
 * Auth Routes
 *
 * POST /api/auth/login     → Validates credentials, returns JWT token
 * POST /api/auth/register  → Creates a new admin user (requires superadmin JWT)
 * POST /api/auth/me        → Returns current user info from token (requires JWT)
 */

require_once __DIR__ . '/../config/database.php';
require_once __DIR__ . '/../middleware/auth.php';

$db     = Database::getInstance();
$method = $_SERVER['REQUEST_METHOD'];

// Only POST is accepted on all auth routes
if ($method !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
    return;
}

// Determine sub-route: /api/auth/login, /api/auth/register, /api/auth/me
$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$action = basename($uri); // "login", "register", or "me"

// ─── POST /api/auth/login ─────────────────────────────────────────────────────
if ($action === 'login') {
    $body = json_decode(file_get_contents('php://input'), true);
    $email    = trim($body['email']    ?? '');
    $password = trim($body['password'] ?? '');

    if (!$email || !$password) {
        http_response_code(422);
        echo json_encode(['error' => 'Email and password are required.']);
        return;
    }

    $stmt = $db->prepare('SELECT id, email, password_hash, role FROM admin_users WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid email or password.']);
        return;
    }

    $expirySeconds = (int)(getenv('JWT_EXPIRY') ?: 604800);
    $token = Auth::createToken([
        'sub'   => $user['id'],
        'email' => $user['email'],
        'role'  => $user['role'],
    ], $expirySeconds);

    echo json_encode([
        'token' => $token,
        'user'  => [
            'id'    => $user['id'],
            'email' => $user['email'],
            'role'  => $user['role'],
        ],
    ]);
    return;
}

// ─── POST /api/auth/me ────────────────────────────────────────────────────────
if ($action === 'me') {
    $payload = Auth::requireAuth();

    $stmt = $db->prepare(
        'SELECT u.id, u.email, u.role, p.full_name, p.phone, p.avatar_url
         FROM admin_users u
         LEFT JOIN admin_profiles p ON p.user_id = u.id
         WHERE u.id = :id LIMIT 1'
    );
    $stmt->execute([':id' => $payload['sub']]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(404);
        echo json_encode(['error' => 'User not found.']);
        return;
    }

    echo json_encode(['user' => $user]);
    return;
}

// ─── POST /api/auth/register ──────────────────────────────────────────────────
if ($action === 'register') {
    // Only existing superadmin can create new users
    $payload = Auth::requireAuth();
    if (($payload['role'] ?? '') !== 'SuperAdmin') {
        http_response_code(403);
        echo json_encode(['error' => 'Only SuperAdmins can register new users.']);
        return;
    }

    $body     = json_decode(file_get_contents('php://input'), true);
    $email    = trim($body['email']     ?? '');
    $password = trim($body['password']  ?? '');
    $role     = trim($body['role']      ?? 'Editor');
    $fullName = trim($body['full_name'] ?? '');

    if (!$email || !$password) {
        http_response_code(422);
        echo json_encode(['error' => 'Email and password are required.']);
        return;
    }

    if (strlen($password) < 8) {
        http_response_code(422);
        echo json_encode(['error' => 'Password must be at least 8 characters.']);
        return;
    }

    // Check if email already exists
    $stmt = $db->prepare('SELECT id FROM admin_users WHERE email = :email LIMIT 1');
    $stmt->execute([':email' => $email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode(['error' => 'An account with this email already exists.']);
        return;
    }

    $allowedRoles  = ['SuperAdmin', 'Admin', 'Editor'];
    if (!in_array($role, $allowedRoles, true)) $role = 'Editor';

    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $db->beginTransaction();
    try {
        // Insert admin user
        $stmt = $db->prepare(
            'INSERT INTO admin_users (email, password_hash, role) VALUES (:email, :hash, :role)'
        );
        $stmt->execute([':email' => $email, ':hash' => $passwordHash, ':role' => $role]);
        $userId = (int) $db->lastInsertId();

        // Auto-create linked profile
        $stmt = $db->prepare(
            'INSERT INTO admin_profiles (user_id, full_name, email, role) VALUES (:uid, :name, :email, :role)'
        );
        $stmt->execute([':uid' => $userId, ':name' => $fullName, ':email' => $email, ':role' => $role]);

        $db->commit();
    } catch (Exception $e) {
        $db->rollBack();
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed: ' . $e->getMessage()]);
        return;
    }

    http_response_code(201);
    echo json_encode(['message' => 'User registered successfully.', 'id' => $userId]);
    return;
}

// ─── Unknown sub-route ────────────────────────────────────────────────────────
http_response_code(404);
echo json_encode(['error' => 'Auth route not found.']);
