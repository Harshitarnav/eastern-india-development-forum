import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import { listForms, updateFormStatus } from "@/lib/cms/forms-store";

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;

  const rows = await listForms("proposal");
  return NextResponse.json({
    rows,
    source: "file",
    message: "Proposal submissions from the public site.",
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

  const updated = await updateFormStatus("proposal", body.id, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, source: "file" });
}
