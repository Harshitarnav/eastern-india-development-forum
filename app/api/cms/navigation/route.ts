import { NextRequest, NextResponse } from "next/server";
import { requireCmsAdmin } from "@/lib/cms/api-auth";
import {
  getCmsNavigation,
  setCmsNavigation,
  invalidateCmsCache,
} from "@/lib/cms/repository";
import { revalidateCms } from "@/lib/cms/revalidate";
import type { CmsNavItem } from "@/lib/cms/types";

export async function GET(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  const location = request.nextUrl.searchParams.get("location") as
    | CmsNavItem["location"]
    | null;
  const navigation = await getCmsNavigation(location || undefined);
  return NextResponse.json({ navigation });
}

export async function PUT(request: NextRequest) {
  const auth = await requireCmsAdmin();
  if ("error" in auth) return auth.error;
  let body: { navigation?: CmsNavItem[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!Array.isArray(body.navigation)) {
    return NextResponse.json({ error: "navigation array required" }, { status: 400 });
  }
  try {
    invalidateCmsCache();
    const snap = await setCmsNavigation(body.navigation, auth.user.email);
    revalidateCms("nav");
    return NextResponse.json({ navigation: snap.navigation });
  } catch (err) {
    console.error("cms navigation save failed", err);
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Failed to save navigation",
      },
      { status: 500 }
    );
  }
}
