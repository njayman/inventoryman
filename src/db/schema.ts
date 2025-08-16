import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const suppliers = sqliteTable("suppliers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()),
});

export const customers = sqliteTable("customers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  supplierId: integer("supplier_id").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(new Date()),
});

export const restocks = sqliteTable("restocks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull(),
  supplierId: integer("supplier_id").notNull(),
  quantity: real("quantity").notNull(),
  unit: text("unit").notNull(),
  price: real("price").notNull(),
  restockedAt: integer("restocked_at", { mode: "timestamp" }).default(
    new Date()
  ),

  productIdFk: integer("product_id").references(() => products.id),
  supplierIdFk: integer("supplier_id").references(() => suppliers.id),
});

export const sales = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: integer("customer_id").notNull(),
  totalPrice: real("total_price").notNull(), // Total price of the sale
  saleDate: integer("sale_date", { mode: "timestamp" }).default(new Date()),

  // Foreign key
  customerIdFk: integer("customer_id").references(() => customers.id),
});

export const saleItems = sqliteTable("sale_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  saleId: integer("sale_id").notNull(),
  restockId: integer("restock_id").notNull(),
  quantity: real("quantity").notNull(), // Quantity sold from this restock batch
  price: real("price").notNull(), // Selling price per unit

  // Foreign keys
  saleIdFk: integer("sale_id").references(() => sales.id),
  restockIdFk: integer("restock_id").references(() => restocks.id),
});

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).defaultNow(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).defaultNow(),
});
