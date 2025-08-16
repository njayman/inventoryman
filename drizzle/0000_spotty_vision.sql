CREATE TABLE `admins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password` text NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)),
	`updated_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_username_unique` ON `admins` (`username`);--> statement-breakpoint
CREATE TABLE `customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`created_at` integer DEFAULT '"2025-08-16T14:25:03.482Z"',
	`updated_at` integer DEFAULT '"2025-08-16T14:25:03.482Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `customers_email_unique` ON `customers` (`email`);--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`supplier_id` integer NOT NULL,
	`created_at` integer DEFAULT '"2025-08-16T14:25:03.482Z"',
	`updated_at` integer DEFAULT '"2025-08-16T14:25:03.482Z"'
);
--> statement-breakpoint
CREATE TABLE `restocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer,
	`supplier_id` integer,
	`quantity` real NOT NULL,
	`unit` text NOT NULL,
	`price` real NOT NULL,
	`restocked_at` integer DEFAULT '"2025-08-16T14:25:03.482Z"',
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sale_items` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sale_id` integer,
	`restock_id` integer,
	`quantity` real NOT NULL,
	`price` real NOT NULL,
	FOREIGN KEY (`sale_id`) REFERENCES `sales`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`restock_id`) REFERENCES `restocks`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` integer,
	`total_price` real NOT NULL,
	`sale_date` integer DEFAULT '"2025-08-16T14:25:03.483Z"',
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `suppliers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`created_at` integer DEFAULT '"2025-08-16T14:25:03.481Z"',
	`updated_at` integer DEFAULT '"2025-08-16T14:25:03.481Z"'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `suppliers_email_unique` ON `suppliers` (`email`);