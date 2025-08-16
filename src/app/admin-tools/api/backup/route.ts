import { DB_FILE_NAME } from "@/utils/constants";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  const dbPath = path.join(process.cwd(), DB_FILE_NAME);

  const file = Bun.file(dbPath);

  if (!(await file.exists())) {
    return NextResponse.json(
      { message: "Database file not found." },
      { status: 404 }
    );
  }

  const timestamp = new Date().toISOString();
  return new Response(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename=sqlite_backup_${timestamp}.db`,
    },
  });
}
