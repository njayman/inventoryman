import { drizzle } from "drizzle-orm/bun-sqlite";

const db = drizzle("sqlite.db", {
  schema: {
    suppliers: "suppliers",
    customers: "customers",
    products: "products",
    restocks: "restocks",
    sales: "sales",
    saleItems: "sale_items",
    admins: "admins",
  },
  logger: true,
});

export default db;
