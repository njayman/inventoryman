import { NextResponse } from "next/server";
import db from "@/db";
import { admins } from "@/db/schema";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const newUsername =
    username || `admin_${Math.random().toString(36).substring(2, 10)}`;
  const newPassword = password || Math.random().toString(36).substring(2, 12);
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.insert(admins).values({
    username: newUsername,
    password: hashedPassword,
  });

  return NextResponse.json({
    message: `Admin credentials updated. Username: ${newUsername}, Password: ${newPassword}`,
  });
}
