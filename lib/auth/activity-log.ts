export interface LoginActivity {
  id: string;
  email: string;
  success: boolean;
  ip: string;
  userAgent: string;
  reason?: string;
  at: string;
}

const MAX_LOGS = 200;
const logs: LoginActivity[] = [];

export function logLoginActivity(entry: Omit<LoginActivity, "id" | "at">) {
  const record: LoginActivity = {
    ...entry,
    id: `log_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    at: new Date().toISOString(),
  };
  logs.unshift(record);
  if (logs.length > MAX_LOGS) logs.length = MAX_LOGS;
  return record;
}

export function getLoginActivity(limit = 20) {
  return logs.slice(0, limit);
}
