import { NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import { resetCmsToSeed, invalidateCmsCache } from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";

export async function POST() {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  invalidateCmsCache();
  const snapshot = await resetCmsToSeed(auth.user.email);
  revalidateCms();
  return NextResponse.json({
    ok: true,
    updatedAt: snapshot.updatedAt,
    counts: {
      items: snapshot.items.length,
      seo: snapshot.seo.length,
      navigation: snapshot.navigation.length,
      media: snapshot.media.length,
    },
  });
}
