import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/lib/auth/constants";

function getSecret() {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    return new TextEncoder().encode(
      "eidf-dev-jwt-secret-change-me-in-production-32+"
    );
  }
  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest) {
  const access = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refresh = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (access) {
    try {
      const { payload } = await jwtVerify(access, getSecret());
      if (payload.typ === "access") return true;
    } catch {
      // try refresh presence for optimistic allow; route handlers revalidate
    }
  }

  if (refresh) {
    try {
      const { payload } = await jwtVerify(refresh, getSecret());
      return payload.typ === "refresh";
    } catch {
      return false;
    }
  }

  return false;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin");
  const isLogin = pathname === "/admin/login";
  const isAuthApi = pathname.startsWith("/api/auth");

  if (isAuthApi) {
    return NextResponse.next();
  }

  if (!isAdminArea) {
    return NextResponse.next();
  }

  const authed = await hasValidSession(request);

  if (isLogin) {
    if (authed) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};
