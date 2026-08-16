import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  getCmsMedia,
  upsertCmsMedia,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";
import { isSupabaseConfigured } from "@/lib/cms/supabase-store";
import { supabaseAuthHeaders } from "@/lib/supabase/headers";

function safeSegment(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48) || "file";
}

async function saveLocalUpload(file: File, folder: string) {
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const folderSafe = safeSegment(folder || "general");
  const filename = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const relDir = path.join("uploads", "cms", folderSafe);
  const absDir = path.join(process.cwd(), "public", relDir);
  await fs.mkdir(absDir, { recursive: true });
  const absPath = path.join(absDir, filename);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(absPath, bytes);
  return {
    url: `/${relDir.replace(/\\/g, "/")}/${filename}`,
    mime_type: file.type || null,
    size_bytes: file.size,
    title: file.name,
  };
}

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const media = await getCmsMedia();
  return NextResponse.json({ media });
}

export async function POST(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;

  const contentType = request.headers.get("content-type") || "";

  // JSON register (url already known / local public path)
  if (contentType.includes("application/json")) {
    let body: {
      url?: string;
      alt?: string;
      title?: string;
      folder?: string;
      mime_type?: string;
    };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }
    if (!body.url || !body.alt) {
      return NextResponse.json({ error: "url and alt required" }, { status: 400 });
    }
    invalidateCmsCache();
    const media = {
      id: randomUUID(),
      url: body.url,
      alt: body.alt,
      title: body.title || body.alt,
      folder: body.folder || "general",
      mime_type: body.mime_type || null,
      created_at: new Date().toISOString(),
    };
    await upsertCmsMedia(media, auth.user.email);
    revalidateCms();
    return NextResponse.json({ media, source: "url" });
  }

  const form = await request.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") || "").trim();
  const folder = String(form.get("folder") || "general");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  if (!alt) {
    return NextResponse.json({ error: "alt text required" }, { status: 400 });
  }

  // Prefer Supabase when configured; otherwise save into public/uploads for local CMS use
  if (isSupabaseConfigured()) {
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      const key =
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
      const ext = file.name.split(".").pop() || "bin";
      const objectPath = `${safeSegment(folder)}/${Date.now()}-${randomUUID()}.${ext}`;
      const bytes = Buffer.from(await file.arrayBuffer());

      const uploadRes = await fetch(
        `${url}/storage/v1/object/eidf-media/${objectPath}`,
        {
          method: "POST",
          headers: {
            ...supabaseAuthHeaders(key),
            "Content-Type": file.type || "application/octet-stream",
            "x-upsert": "true",
          },
          body: bytes,
        }
      );

      if (uploadRes.ok) {
        const publicUrl = `${url}/storage/v1/object/public/eidf-media/${objectPath}`;
        invalidateCmsCache();
        const media = {
          id: randomUUID(),
          url: publicUrl,
          alt,
          title: file.name,
          folder,
          mime_type: file.type,
          size_bytes: file.size,
          created_at: new Date().toISOString(),
        };
        await upsertCmsMedia(media, auth.user.email);
        revalidateCms("gallery");
        return NextResponse.json({ media, source: "supabase" });
      }
      console.warn("supabase upload failed, falling back to local", await uploadRes.text());
    } catch (err) {
      console.warn("supabase upload error, falling back to local", err);
    }
  }

  try {
    const local = await saveLocalUpload(file, folder);
    invalidateCmsCache();
    const media = {
      id: randomUUID(),
      url: local.url,
      alt,
      title: local.title,
      folder,
      mime_type: local.mime_type,
      size_bytes: local.size_bytes,
      created_at: new Date().toISOString(),
    };
    await upsertCmsMedia(media, auth.user.email);
    revalidateCms("gallery");
    return NextResponse.json({ media, source: "local" });
  } catch (err) {
    console.error("local upload failed", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
