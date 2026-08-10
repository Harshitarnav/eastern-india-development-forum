import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  getCmsItemRecords,
  upsertCmsItem,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";
import type { CmsItemRecord } from "@/lib/cms/types";

export async function GET(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const collection = request.nextUrl.searchParams.get("collection");
  if (!collection) {
    return NextResponse.json({ error: "collection required" }, { status: 400 });
  }
  const items = await getCmsItemRecords(collection, { includeUnpublished: true });
  return NextResponse.json({ items });
}

export async function POST(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  let body: Partial<CmsItemRecord>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.collection || !body.id || !body.data) {
    return NextResponse.json(
      { error: "collection, id, and data are required" },
      { status: 400 }
    );
  }
  invalidateCmsCache();
  const item = await upsertCmsItem(
    {
      id: body.id,
      collection: body.collection,
      data: body.data,
      sort_order: body.sort_order ?? 0,
      is_published: body.is_published !== false,
      slug: body.slug || null,
    },
    auth.user.email
  );
  revalidateCms();
  return NextResponse.json({ item });
}
