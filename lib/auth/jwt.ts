import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type { AdminRole } from "@/lib/store/auth-slice";
import {
  ACCESS_TOKEN_TTL,
  REFRESH_TOKEN_TTL,
} from "@/lib/auth/constants";

export interface AccessTokenPayload extends JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: AdminRole;
  sid: string;
  typ: "access";
}

export interface RefreshTokenPayload extends JWTPayload {
  sub: string;
  sid: string;
  typ: "refresh";
}

function getSecret() {
  const secret = process.env.JWT_SECRET || process.env.ADMIN_JWT_SECRET;
  if (!secret || secret.length < 32) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "JWT_SECRET (min 32 chars) is required in production."
      );
    }
    // Dev-safe fallback — override in production via env
    return new TextEncoder().encode(
      "eidf-dev-jwt-secret-change-me-in-production-32+"
    );
  }
  return new TextEncoder().encode(secret);
}

export async function signAccessToken(payload: Omit<AccessTokenPayload, "typ">) {
  return new SignJWT({ ...payload, typ: "access" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ACCESS_TOKEN_TTL}s`)
    .sign(getSecret());
}

export async function signRefreshToken(
  payload: Omit<RefreshTokenPayload, "typ">,
  expiresInSeconds: number = REFRESH_TOKEN_TTL
) {
  return new SignJWT({ ...payload, typ: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${expiresInSeconds}s`)
    .sign(getSecret());
}

export async function verifyAccessToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  if (payload.typ !== "access") throw new Error("Invalid token type");
  return payload as AccessTokenPayload;
}

export async function verifyRefreshToken(token: string) {
  const { payload } = await jwtVerify(token, getSecret());
  if (payload.typ !== "refresh") throw new Error("Invalid token type");
  return payload as RefreshTokenPayload;
}
