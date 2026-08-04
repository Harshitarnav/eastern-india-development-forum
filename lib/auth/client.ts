"use client";

export function getCsrfToken() {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|; )eidf_admin_csrf=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : "";
}

export async function loginRequest(payload: {
  email: string;
  password: string;
  rememberMe?: boolean;
}) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-Token": getCsrfToken(),
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

export async function logoutRequest() {
  await fetch("/api/auth/logout", {
    method: "POST",
    headers: { "X-CSRF-Token": getCsrfToken() },
    credentials: "include",
  });
}

export async function meRequest() {
  const res = await fetch("/api/auth/me", { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data.user ?? null;
}
