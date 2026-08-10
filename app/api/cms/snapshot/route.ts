import { NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import { getCmsSnapshot } from "@/lib/cms/repository";

export async function GET() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const snapshot = await getCmsSnapshot();
  return NextResponse.json({ snapshot });
}
