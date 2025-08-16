import { DB_FILE_NAME } from "@/utils/constants";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Where to store the restored SQLite database
    const dbPath = path.join(process.cwd(), DB_FILE_NAME);

    // Bun.write accepts File, Blob, ArrayBuffer, string, etc.
    await Bun.write(dbPath, file);

    return NextResponse.json({ message: "Database restored successfully." });
  } catch (error: unknown) {
    console.error("Error restoring DB:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to restore database.",
      },
      { status: 500 }
    );
  }
}
