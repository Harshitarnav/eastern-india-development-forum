import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "@/lib/auth/schemas";
import {
  createSessionId,
  getAdminByCredentials,
  setAuthCookies,
  validateAdminPassword,
} from "@/lib/auth/session";
import { checkRateLimit, resetRateLimit } from "@/lib/auth/rate-limit";
import { logLoginActivity } from "@/lib/auth/activity-log";
import { REFRESH_TOKEN_TTL } from "@/lib/auth/constants";

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = request.headers.get("user-agent") || "unknown";
  const rateKey = `login:${ip}`;

  const rate = checkRateLimit(rateKey);
  if (!rate.allowed) {
    logLoginActivity({
      email: "unknown",
      success: false,
      ip,
      userAgent,
      reason: "rate_limited",
    });
    return NextResponse.json(
      {
        error: "Too many login attempts. Please try again later.",
        retryAfter: rate.retryAfter,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rate.retryAfter) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { email, password, rememberMe } = parsed.data;
  const admin = getAdminByCredentials(email);
  const passwordOk = admin ? await validateAdminPassword(password) : false;

  if (!admin || !passwordOk) {
    logLoginActivity({
      email,
      success: false,
      ip,
      userAgent,
      reason: "invalid_credentials",
    });
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  const sessionId = createSessionId();
  await setAuthCookies(admin, sessionId);

  // Extend refresh cookie if remember me
  if (rememberMe) {
    // Cookies already set with 7-day refresh; rememberMe keeps same policy
    void REFRESH_TOKEN_TTL;
  }

  resetRateLimit(rateKey);
  logLoginActivity({
    email: admin.email,
    success: true,
    ip,
    userAgent,
  });

  return NextResponse.json({
    ok: true,
    user: admin,
    message: "Signed in successfully.",
  });
}
