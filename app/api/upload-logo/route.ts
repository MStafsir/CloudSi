import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Only PNG/JPEG images are allowed" },
        { status: 400 }
      );
    }

    // Convert to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const logosDir = path.join(process.cwd(), "public", "images", "logos");
    await fs.mkdir(logosDir, { recursive: true });

    // We will always write to the canonical PNG filename requested by the UI
    // If the upload isn't PNG, still write bytes — for true format conversion install sharp.
    const destPath = path.join(logosDir, "logo-angkatan-25.png");

    await fs.writeFile(destPath, buffer);

    return NextResponse.json({
      message: "Logo uploaded successfully",
      path: "/images/logos/logo-angkatan-25.png",
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
