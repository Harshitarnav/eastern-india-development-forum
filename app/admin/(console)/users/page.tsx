import { getSessionUser } from "@/lib/auth/session";
import { ShieldCheck, User } from "lucide-react";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  const user = await getSessionUser();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          Users
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Single-admin mode is active. Multi-user accounts will unlock after Supabase Auth is connected.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/15 text-gold">
            <User className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-display text-lg font-bold text-[var(--admin-text)]">
              {user?.name || process.env.ADMIN_NAME || "EIDF Administrator"}
            </div>
            <div className="mt-1 text-sm text-[var(--admin-muted)]">
              {user?.email || process.env.ADMIN_EMAIL || "admin@eidf.org.in"}
            </div>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-3 py-1 text-xs font-bold text-emerald-dark">
              <ShieldCheck className="h-3.5 w-3.5" /> Super Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
