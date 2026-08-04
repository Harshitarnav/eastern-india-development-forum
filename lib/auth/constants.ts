export const ACCESS_TOKEN_COOKIE = "eidf_admin_at";
export const REFRESH_TOKEN_COOKIE = "eidf_admin_rt";
export const CSRF_COOKIE = "eidf_admin_csrf";
export const SESSION_COOKIE = "eidf_admin_sid";

export const ACCESS_TOKEN_TTL = 15 * 60; // 15 minutes
export const REFRESH_TOKEN_TTL = 7 * 24 * 60 * 60; // 7 days
export const SESSION_IDLE_TTL = 60 * 60; // 1 hour idle timeout

export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
export const RATE_LIMIT_MAX_ATTEMPTS = 8;
