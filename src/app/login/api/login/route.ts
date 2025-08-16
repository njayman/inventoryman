import { NextResponse } from "next/server";
import db from "@/db";
import { admins } from "@/db/schema";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const admin = await db.query.admins.findFirst({
    where: eq(admins.username, username),
  });

  if (!admin) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid username or password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ message: "Login successful" });
  response.cookies.set("admin-auth", "true", { httpOnly: true, path: "/" });

  return response;
}
