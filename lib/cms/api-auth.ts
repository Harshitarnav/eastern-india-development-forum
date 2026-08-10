import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import type { AdminUser } from "@/lib/store/auth-slice";

export async function requireCmsAdmin(): Promise<
  { user: AdminUser } | { error: NextResponse }
> {
  const user = await getSessionUser();
  if (!user) {
    return {
      error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }
  return { user };
}
