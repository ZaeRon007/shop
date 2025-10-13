CREATE TABLE IF NOT EXISTS `users` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `username` VARCHAR(40),
  `firstname` VARCHAR(40),
  `email` VARCHAR(255),
  `password` VARCHAR(255),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `products` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `code` VARCHAR(50),
  `name` VARCHAR(50),
  `description` VARCHAR(2000),
  `image` VARCHAR(50),
  `category` VARCHAR(50),
  `price` INT,
  `quantity` INT,
  `internal reference` VARCHAR(50),
  `shellId` INT,
  `inventoryStatus` VARCHAR(50),
  `rating` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `user_basket`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `product_id` INT,
  `quantity` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS `user_wishs`(
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT,
  `product_id` INT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE `user_basket` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `user_basket` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);

ALTER TABLE `user_wishs` ADD FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);
ALTER TABLE `user_wishs` ADD FOREIGN KEY (`product_id`) REFERENCES `products`(`id`);