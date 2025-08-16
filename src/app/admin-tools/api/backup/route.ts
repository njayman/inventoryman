import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const dbPath = path.join(process.cwd(), "sqlite.db");

  const file = Bun.file(dbPath);

  if (!(await file.exists())) {
    return NextResponse.json(
      { message: "Database file not found." },
      { status: 404 }
    );
  }

  // Stream file directly in the response
  return new Response(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": "attachment; filename=sqlite_backup.db",
    },
  });
}
