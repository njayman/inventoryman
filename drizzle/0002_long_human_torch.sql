PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_customers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`created_at` integer DEFAULT '"2025-08-16T14:45:38.757Z"',
	`updated_at` integer DEFAULT '"2025-08-16T14:45:38.757Z"'
);
--> statement-breakpoint
INSERT INTO `__new_customers`("id", "name", "email", "phone", "created_at", "updated_at") SELECT "id", "name", "email", "phone", "created_at", "updated_at" FROM `customers`;--> statement-breakpoint
DROP TABLE `customers`;--> statement-breakpoint
ALTER TABLE `__new_customers` RENAME TO `customers`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `customers_email_unique` ON `customers` (`email`);--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`supplier_id` integer NOT NULL,
	`created_at` integer DEFAULT '"2025-08-16T14:45:38.757Z"',
	`updated_at` integer DEFAULT '"2025-08-16T14:45:38.757Z"'
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "name", "description", "supplier_id", "created_at", "updated_at") SELECT "id", "name", "description", "supplier_id", "created_at", "updated_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
CREATE TABLE `__new_restocks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`product_id` integer,
	`supplier_id` integer,
	`quantity` real NOT NULL,
	`unit` text NOT NULL,
	`price` real NOT NULL,
	`restocked_at` integer DEFAULT '"2025-08-16T14:45:38.757Z"',
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_restocks`("id", "product_id", "supplier_id", "quantity", "unit", "price", "restocked_at") SELECT "id", "product_id", "supplier_id", "quantity", "unit", "price", "restocked_at" FROM `restocks`;--> statement-breakpoint
DROP TABLE `restocks`;--> statement-breakpoint
ALTER TABLE `__new_restocks` RENAME TO `restocks`;--> statement-breakpoint
CREATE TABLE `__new_sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`customer_id` integer,
	`total_price` real NOT NULL,
	`sale_date` integer DEFAULT '"2025-08-16T14:45:38.757Z"',
	FOREIGN KEY (`customer_id`) REFERENCES `customers`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_sales`("id", "customer_id", "total_price", "sale_date") SELECT "id", "customer_id", "total_price", "sale_date" FROM `sales`;--> statement-breakpoint
DROP TABLE `sales`;--> statement-breakpoint
ALTER TABLE `__new_sales` RENAME TO `sales`;--> statement-breakpoint
CREATE TABLE `__new_suppliers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`created_at` integer DEFAULT '"2025-08-16T14:45:38.756Z"',
	`updated_at` integer DEFAULT '"2025-08-16T14:45:38.756Z"'
);
--> statement-breakpoint
INSERT INTO `__new_suppliers`("id", "name", "email", "phone", "created_at", "updated_at") SELECT "id", "name", "email", "phone", "created_at", "updated_at" FROM `suppliers`;--> statement-breakpoint
DROP TABLE `suppliers`;--> statement-breakpoint
ALTER TABLE `__new_suppliers` RENAME TO `suppliers`;--> statement-breakpoint
CREATE UNIQUE INDEX `suppliers_email_unique` ON `suppliers` (`email`);