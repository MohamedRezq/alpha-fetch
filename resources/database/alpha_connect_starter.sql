-- Adminer 4.8.1 MySQL 5.5.5-10.4.19-MariaDB dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `sync_logs`;
CREATE TABLE `sync_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_application_id` int(11) NOT NULL,
  `source` ENUM('extension', 'official_api', 'manual') DEFAULT NULL,
  `type` ENUM('employees', 'invoices', 'billing') DEFAULT NULL,
  `data` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (JSON_VALID(`data`)),
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`organization_application_id`) REFERENCES `organization_applications`(`id`)
);

DROP TABLE IF EXISTS `organization_applications`;
CREATE TABLE `organization_applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `organization_id` int(11) NOT NULL,
  `application_id` int(11) NOT NULL,
  `is_active` BOOLEAN DEFAULT FALSE,
  `data` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (JSON_VALID(`data`)),
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`)
);

DROP TABLE IF EXISTS `applications`;
CREATE TABLE `applications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `slug` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `logo` VARCHAR(255) DEFAULT NULL,
  `is_integrated` BOOLEAN DEFAULT FALSE,
  `category_id` int(11) NOT NULL,
  `data` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (JSON_VALID(`data`)),
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`)
);

DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) DEFAULT NULL,
  `slug` VARCHAR(255) DEFAULT NULL,
  `parent_category_id` int(11) NOT NULL DEFAULT 0,
  `logo` VARCHAR(255) DEFAULT NULL,
  `data` LONGTEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (JSON_VALID(`data`)),
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `deleted_at` DATETIME DEFAULT NULL,
  PRIMARY KEY (`id`)
);
INSERT INTO `alpha_connect`.`categories` (`id`, `name`, `slug`, `parent_category_id`, `logo`, `data`) 
VALUES (0, '-', '-', 0, '', '{"key":"value"}');