import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  getCmsMedia,
  upsertCmsMedia,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";
import { isSupabaseConfigured } from "@/lib/cms/supabase-store";
import { randomUUID } from "crypto";

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
    return NextResponse.json({ media });
  }

  // Multipart upload → Supabase Storage when configured, else reject with guidance
  const form = await request.formData();
  const file = form.get("file");
  const alt = String(form.get("alt") || "");
  const folder = String(form.get("folder") || "general");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file required" }, { status: 400 });
  }
  if (!alt.trim()) {
    return NextResponse.json({ error: "alt text required" }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        error:
          "File upload requires Supabase. Register a public URL via JSON, or configure SUPABASE_* env vars.",
      },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const ext = file.name.split(".").pop() || "bin";
  const objectPath = `${folder}/${Date.now()}-${randomUUID()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const uploadRes = await fetch(
    `${url}/storage/v1/object/eidf-media/${objectPath}`,
    {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": file.type || "application/octet-stream",
        "x-upsert": "true",
      },
      body: bytes,
    }
  );

  if (!uploadRes.ok) {
    const text = await uploadRes.text();
    return NextResponse.json(
      { error: `Upload failed: ${text}` },
      { status: 502 }
    );
  }

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
  return NextResponse.json({ media });
}
