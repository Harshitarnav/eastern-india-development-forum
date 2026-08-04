import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  CSRF_COOKIE,
  SESSION_COOKIE,
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
} from "@/lib/auth/constants";
import {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  type AccessTokenPayload,
} from "@/lib/auth/jwt";
import type { AdminUser } from "@/lib/store/auth-slice";

export function createSessionId() {
  return randomBytes(24).toString("hex");
}

export function createCsrfToken() {
  return randomBytes(32).toString("hex");
}

function cookieBase(maxAge: number) {
  return {
    httpOnly: true as const,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function setAuthCookies(user: AdminUser, sessionId: string) {
  const cookieStore = await cookies();
  const accessToken = await signAccessToken({
    sub: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    sid: sessionId,
  });
  const refreshToken = await signRefreshToken({
    sub: user.id,
    sid: sessionId,
  });
  const csrf = createCsrfToken();

  cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken, cookieBase(ACCESS_TOKEN_TTL));
  cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, cookieBase(REFRESH_TOKEN_TTL));
  cookieStore.set(SESSION_COOKIE, sessionId, cookieBase(REFRESH_TOKEN_TTL));
  cookieStore.set(CSRF_COOKIE, csrf, {
    ...cookieBase(REFRESH_TOKEN_TTL),
    httpOnly: false,
  });

  return { accessToken, refreshToken, csrf };
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  for (const name of [
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    CSRF_COOKIE,
    SESSION_COOKIE,
  ]) {
    cookieStore.set(name, "", { ...cookieBase(0), maxAge: 0 });
  }
}

export async function getSessionUser(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;

  // Access missing (expired cookie cleared) but refresh may still be valid
  if (!access) {
    return refreshSessionFromCookies();
  }

  try {
    const payload = await verifyAccessToken(access);
    return {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      role: payload.role,
    };
  } catch {
    return refreshSessionFromCookies();
  }
}

async function refreshSessionFromCookies(): Promise<AdminUser | null> {
  const cookieStore = await cookies();
  const refresh = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refresh) return null;

  try {
    const payload = await verifyRefreshToken(refresh);
    const user = getAdminById(payload.sub);
    if (!user) return null;
    await setAuthCookies(user, payload.sid);
    return user;
  } catch {
    return null;
  }
}

export async function getAccessPayload(): Promise<AccessTokenPayload | null> {
  const cookieStore = await cookies();
  const access = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value;
  if (!access) return null;
  try {
    return await verifyAccessToken(access);
  } catch {
    return null;
  }
}

/** Built-in admin directory — replace with DB later */
export function getAdminByCredentials(email: string) {
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@eidf.org.in").toLowerCase();
  if (email.toLowerCase() !== adminEmail) return null;

  return {
    id: "admin-001",
    email: adminEmail,
    name: process.env.ADMIN_NAME || "EIDF Administrator",
    role: "super_admin" as const,
  };
}

export function getAdminById(id: string) {
  if (id !== "admin-001") return null;
  return getAdminByCredentials(process.env.ADMIN_EMAIL || "admin@eidf.org.in");
}

export async function validateAdminPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD || "EIDF@Admin2026!";
  const hash = process.env.ADMIN_PASSWORD_HASH;

  if (hash) {
    const { verifyPassword } = await import("@/lib/auth/password");
    return verifyPassword(password, hash);
  }

  // Constant-time-ish compare for plain env password (dev / bootstrap)
  if (password.length !== configured.length) return false;
  let mismatch = 0;
  for (let i = 0; i < configured.length; i++) {
    mismatch |= configured.charCodeAt(i) ^ password.charCodeAt(i);
  }
  return mismatch === 0;
}
