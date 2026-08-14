-- CreateTable
CREATE TABLE `admin_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'Editor',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin_profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `full_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `phone` VARCHAR(50) NULL,
    `role` VARCHAR(50) NOT NULL DEFAULT 'Editor',
    `avatar_url` TEXT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `admin_profiles_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `landing_page_config` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `config` JSON NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin_profiles` ADD CONSTRAINT `admin_profiles_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;



-- Data Dump --

INSERT INTO admin_users (id, email, password_hash, role, created_at, updated_at) VALUES (1, 'contact@olympianhouseintl.com', '$2y$10$n8Y/1A5TmRU.W4TdmdL7Ae3rb/h7ARirkazdgKCLuDrnGcdy3Qx72', 'SuperAdmin', '2026-08-07 11:11:03', '2026-08-07 11:11:03');
INSERT INTO admin_profiles (id, user_id, full_name, email, phone, role, avatar_url, updated_at) VALUES (1, 1, 'Olympian House Admin', 'contact@olympianhouseintl.com', NULL, 'SuperAdmin', NULL, '2026-08-07 11:11:03');
INSERT INTO landing_page_config (id, config, updated_at) VALUES (1, '{"hero":{"titleLine1":"Africa''s development story","titleLine2":"deserves investment-grade visibility"},"theme":{"accentColor":"#f9a11b","primaryColor":"#05c1ff"}}', '2026-08-07 11:11:05');
