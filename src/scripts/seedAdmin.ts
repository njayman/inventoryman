import db from "@/db";
import { admins } from "@/db/schema";
import bcrypt from "bcrypt";

async function seedAdmin() {
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await db.insert(admins).values({
    username: "admin",
    password: hashedPassword,
  });
  console.log("Admin user seeded!");
}

seedAdmin().catch((err) => {
  console.error(err);
});
