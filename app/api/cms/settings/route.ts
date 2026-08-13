import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import { getCmsSettings, updateCmsSettings, invalidateCmsCache } from "@/lib/cms/repository";
import { isSupabaseConfigured } from "@/lib/cms/supabase-store";
import { revalidateCms } from "@/lib/cms/revalidate";

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const settings = await getCmsSettings();
  return NextResponse.json({
    settings,
    meta: {
      source: isSupabaseConfigured() ? "database" : "local-file",
    },
  });
}

export async function PUT(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  try {
    invalidateCmsCache();
    const snapshot = await updateCmsSettings(body as never, auth.user.email);
    revalidateCms("settings");
    return NextResponse.json({
      settings: snapshot.settings,
      updatedAt: snapshot.updatedAt,
    });
  } catch (err) {
    console.error("cms settings save failed", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to save CMS settings",
      },
      { status: 500 }
    );
  }
}
