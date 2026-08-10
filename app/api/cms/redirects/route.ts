import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  getCmsRedirects,
  setCmsRedirects,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";
import type { CmsRedirect } from "@/lib/cms/types";

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const redirects = await getCmsRedirects();
  return NextResponse.json({ redirects });
}

export async function PUT(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  let body: { redirects?: CmsRedirect[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!Array.isArray(body.redirects)) {
    return NextResponse.json({ error: "redirects array required" }, { status: 400 });
  }
  invalidateCmsCache();
  const snap = await setCmsRedirects(body.redirects, auth.user.email);
  revalidateCms();
  return NextResponse.json({ redirects: snap.redirects });
}
