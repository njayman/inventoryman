import { drizzle } from "drizzle-orm/libsql";
import {
  admins,
  customers,
  products,
  restocks,
  saleItems,
  sales,
  suppliers,
} from "./schema";
import { DB_PATH } from "@/utils/constants";

const db = drizzle(DB_PATH, {
  logger: true,
  schema: {
    admins,
    customers,
    products,
    restocks,
    saleItems,
    sales,
    suppliers,
  },
});

export default db;
