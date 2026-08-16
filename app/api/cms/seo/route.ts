import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  getAllCmsSeo,
  getCmsSeo,
  upsertCmsSeo,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";
import type { CmsSeoRecord } from "@/lib/cms/types";

export async function GET(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const path = request.nextUrl.searchParams.get("path");
  if (path) {
    const seo = await getCmsSeo(path);
    return NextResponse.json({ seo });
  }
  const seo = await getAllCmsSeo();
  return NextResponse.json({ seo });
}

export async function PUT(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  let body: CmsSeoRecord;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.path) {
    return NextResponse.json({ error: "path required" }, { status: 400 });
  }
  invalidateCmsCache();
  const seo = await upsertCmsSeo(body, auth.user.email);
  revalidateCms("seo");
  return NextResponse.json({ seo });
}
