import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";
import { verifyRefreshToken } from "@/lib/auth/jwt";
import { getAdminById, setAuthCookies } from "@/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refresh) {
    return NextResponse.json({ error: "No refresh token." }, { status: 401 });
  }

  try {
    const payload = await verifyRefreshToken(refresh);
    const user = getAdminById(payload.sub);
    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 401 });
    }
    await setAuthCookies(user, payload.sid);
    return NextResponse.json({ ok: true, user });
  } catch {
    return NextResponse.json({ error: "Session expired." }, { status: 401 });
  }
}
