/**
 * Prisma Seed Script
 * Creates the first SuperAdmin user in the database.
 *
 * Usage (from backend/ directory):
 *   node prisma/seed.js
 *
 * Or via npm script:
 *   npm run db:seed
 *
 * ⚠️  Change the email and password before running in production!
 */

import { execSync } from 'child_process';

/**
 * Generate a bcrypt hash using PHP (same algorithm as the PHP auth route).
 * This ensures the seed hash is compatible with password_verify() in PHP.
 * Requires php.exe to be available on PATH (WAMP adds it).
 */
function hashPassword(password) {
  try {
    // Use PHP's password_hash (bcrypt) — compatible with password_verify in auth.php
    const escaped = password.replace(/'/g, "\\'");
    const hash = execSync(
      `php -r "echo password_hash('${escaped}', PASSWORD_BCRYPT);"`,
      { encoding: 'utf8' }
    ).trim();
    return hash;
  } catch {
    // Fallback if PHP is not on PATH
    console.warn('⚠️  PHP not found on PATH. Using placeholder hash — update manually via phpMyAdmin.');
    return '$2y$10$PLACEHOLDER_REPLACE_THIS_WITH_REAL_BCRYPT_HASH_IN_DB';
  }
}

// ── Seed data — CHANGE THESE BEFORE RUNNING ──────────────────────────────────
const SUPERADMIN = {
  email: 'contact@olympianhouseintl.com',
  password: 'Olympianhouseintl$123',
  role: 'SuperAdmin',
  full_name: 'Olympian House Admin',
};
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  // Dynamic import to work with both ESM and CJS Prisma client
  const { PrismaClient } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    console.log('🌱 Seeding database...');

    // Check if superadmin already exists
    const existing = await prisma.adminUser.findUnique({
      where: { email: SUPERADMIN.email },
    });

    if (existing) {
      console.log(`⚠️  SuperAdmin (${SUPERADMIN.email}) already exists. Skipping.`);
      return;
    }

    // Create admin user
    const user = await prisma.adminUser.create({
      data: {
        email: SUPERADMIN.email,
        passwordHash: hashPassword(SUPERADMIN.password),
        role: SUPERADMIN.role,
        profile: {
          create: {
            fullName: SUPERADMIN.full_name,
            email: SUPERADMIN.email,
            role: SUPERADMIN.role,
          },
        },
      },
    });

    console.log(`✅ Created SuperAdmin: ${user.email} (id: ${user.id})`);
    console.log('');
    console.log('⚠️  IMPORTANT: Change the password immediately after first login!');
    console.log(`   Email:    ${SUPERADMIN.email}`);
    console.log(`   Password: ${SUPERADMIN.password}`);

    // Seed default landing page config (if not already present)
    const existingConfig = await prisma.landingPageConfig.findUnique({ where: { id: 1 } });
    if (!existingConfig) {
      await prisma.landingPageConfig.create({
        data: {
          id: 1,
          config: {
            theme: { primaryColor: '#05c1ff', accentColor: '#f9a11b' },
            hero: { titleLine1: "Africa's development story", titleLine2: "deserves investment-grade visibility" },
          },
        },
      });
      console.log('✅ Created default landing page config.');
    }

  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error('❌ Seed failed:', e.message);
  process.exit(1);
});
