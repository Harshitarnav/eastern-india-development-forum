import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import { listForms, updateFormStatus } from "@/lib/cms/forms-store";
import {
  isSupabaseConfigured,
  supabasePatch,
  supabaseSelect,
} from "@/lib/cms/supabase-store";
import { isLandingSignup } from "@/lib/join";

type SignupRow = { contribution_type?: string | null };

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;

  if (isSupabaseConfigured()) {
    try {
      const rows = await supabaseSelect<SignupRow>(
        "membership_applications",
        "select=*&order=created_at.desc"
      );
      return NextResponse.json({
        rows: rows.filter((row) => isLandingSignup(row.contribution_type)),
        source: "supabase",
      });
    } catch (err) {
      console.warn("supabase signup forms failed, using file store", err);
    }
  }

  const rows = (await listForms("membership")).filter((row) =>
    isLandingSignup(row.contribution_type)
  );
  return NextResponse.json({
    rows,
    source: "file",
    message: isSupabaseConfigured()
      ? undefined
      : "Showing local file-store submissions (configure Supabase for cloud sync).",
  });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;

  let body: { id?: string; status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.id || !body.status) {
    return NextResponse.json({ error: "id and status required" }, { status: 400 });
  }

  if (isSupabaseConfigured()) {
    try {
      await supabasePatch("membership_applications", `id=eq.${body.id}`, {
        status: body.status,
      });
      return NextResponse.json({ ok: true, source: "supabase" });
    } catch (err) {
      console.warn("supabase signup patch failed, using file store", err);
    }
  }

  const updated = await updateFormStatus("membership", body.id, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, source: "file" });
}
