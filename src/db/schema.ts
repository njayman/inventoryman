import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

const timestampRaw = sql.raw("CURRENT_TIMESTAMP");

export const units = sqliteTable("units", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(), // Unit name (e.g., "piece", "kg", "litre")
  createdAt: integer("created_at", { mode: "timestamp" }).default(timestampRaw),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(timestampRaw),
});

export const suppliers = sqliteTable("suppliers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  contactInfo: text("contact_info"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(timestampRaw),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(timestampRaw),
});

export const customers = sqliteTable("customers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  createdAt: integer("created_at", { mode: "timestamp" }).default(timestampRaw),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(timestampRaw),
});

export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description"),
  stockQuantity: real("stock_quantity").notNull().default(0),
  lowStockThreshold: real("low_stock_threshold").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).default(timestampRaw),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(timestampRaw),
});

export const restocks = sqliteTable("restocks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id").notNull(),
  supplierId: integer("supplier_id").notNull(),
  quantity: real("quantity").notNull(),
  unitId: integer("unit_id").notNull(),
  price: real("price").notNull(),
  restockedAt: integer("restocked_at", { mode: "timestamp" }).default(
    new Date()
  ),

  productIdFk: integer("product_id").references(() => products.id),
  supplierIdFk: integer("supplier_id").references(() => suppliers.id),
  unitIdFk: integer("unit_id").references(() => units.id),
});

export const sales = sqliteTable("sales", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  customerId: integer("customer_id").notNull(),
  totalPrice: real("total_price").notNull(),
  saleDate: integer("sale_date", { mode: "timestamp" }).default(timestampRaw),

  // Foreign key
  customerIdFk: integer("customer_id").references(() => customers.id),
});

export const saleItems = sqliteTable("sale_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  saleId: integer("sale_id").notNull(),
  restockId: integer("restock_id").notNull(),
  quantity: real("quantity").notNull(),
  price: real("price").notNull(),

  // Foreign keys
  saleIdFk: integer("sale_id").references(() => sales.id),
  restockIdFk: integer("restock_id").references(() => restocks.id),
});

export const purchases = sqliteTable("purchases", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  supplierId: integer("supplier_id").notNull(),
  totalAmount: real("total_amount").notNull(),
  purchaseDate: integer("purchase_date", { mode: "timestamp" }).default(
    timestampRaw
  ),

  // Foreign key
  supplierIdFk: integer("supplier_id").references(() => suppliers.id),
});

export const purchaseItems = sqliteTable("purchase_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  purchaseId: integer("purchase_id").notNull(),
  productId: integer("product_id").notNull(),
  quantity: real("quantity").notNull(),
  unitId: integer("unit_id").notNull(), // Reference to the units table
  price: real("price").notNull(), // Purchase price per unit

  // Foreign keys
  purchaseIdFk: integer("purchase_id").references(() => purchases.id),
  productIdFk: integer("product_id").references(() => products.id),
  unitIdFk: integer("unit_id").references(() => units.id),
});

export const admins = sqliteTable("admins", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(timestampRaw),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(timestampRaw),
});
