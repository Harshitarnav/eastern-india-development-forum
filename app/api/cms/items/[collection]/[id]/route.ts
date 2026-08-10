import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  deleteCmsItem,
  getCmsItemRecords,
  upsertCmsItem,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";

type Ctx = { params: Promise<{ collection: string; id: string }> };

export async function GET(_request: NextRequest, ctx: Ctx) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const { collection, id } = await ctx.params;
  const items = await getCmsItemRecords(collection, { includeUnpublished: true });
  const item = items.find((i) => i.id === id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, ctx: Ctx) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const { collection, id } = await ctx.params;
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  invalidateCmsCache();
  const item = await upsertCmsItem(
    {
      id,
      collection,
      data: (body.data as Record<string, unknown>) || body,
      sort_order: Number(body.sort_order ?? 0),
      is_published: body.is_published !== false,
      slug: (body.slug as string) || null,
    },
    auth.user.email
  );
  revalidateCms();
  return NextResponse.json({ item });
}

export async function DELETE(_request: NextRequest, ctx: Ctx) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const { collection, id } = await ctx.params;
  invalidateCmsCache();
  await deleteCmsItem(collection, id, auth.user.email);
  revalidateCms();
  return NextResponse.json({ ok: true });
}
