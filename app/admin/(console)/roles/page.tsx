import { CheckCircle2, Shield } from "lucide-react";

export const metadata = { title: "Roles & Permissions" };

const PERMS = [
  "Edit website settings & hero",
  "Manage all CMS collections",
  "Edit navigation & SEO",
  "View & update form submissions",
  "Seed / reset CMS content",
];

export default function RolesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          Roles & Permissions
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Current deployment uses one Super Admin role with full CMS access.
        </p>
      </div>

      <div className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/10 text-navy dark:bg-gold/15 dark:text-gold">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="font-display text-lg font-bold text-[var(--admin-text)]">
              Super Admin
            </div>
            <div className="text-xs text-[var(--admin-muted)]">Full access · local JWT session</div>
          </div>
        </div>
        <ul className="space-y-2.5">
          {PERMS.map((p) => (
            <li
              key={p}
              className="flex items-center gap-2 text-sm text-[var(--admin-text)]"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
