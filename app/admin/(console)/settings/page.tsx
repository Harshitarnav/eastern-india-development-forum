"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { Palette, ShieldCheck, User } from "lucide-react";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

export default function AdminSettingsPage() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-[var(--admin-text)] md:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[var(--admin-muted)]">
          Account, appearance, and security preferences for your admin session.
        </p>
      </div>

      <div
        id="appearance"
        className="scroll-mt-24 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)] md:p-8"
      >
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gold/20 to-amber/10 text-amber-600 dark:text-gold">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
                Appearance
              </h2>
              <p className="text-xs text-[var(--admin-muted)]">
                Switch between light, dark, or system theme
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              title: "Light",
              desc: "Soft sky & emerald accents",
              swatch: "from-[#f3f6fb] via-white to-[#e8f8f1]",
            },
            {
              title: "Dark",
              desc: "Navy depth with gold highlights",
              swatch: "from-[#070e1a] via-[#111b2e] to-[#0d2a24]",
            },
            {
              title: "Brand",
              desc: "Navy · Emerald · Gold · Sky",
              swatch: "from-navy via-emerald to-gold",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-2xl border border-[var(--admin-border)]"
            >
              <div className={`h-16 bg-gradient-to-br ${card.swatch}`} />
              <div className="bg-[var(--admin-surface-2)] px-3 py-2.5">
                <div className="text-xs font-bold text-[var(--admin-text)]">{card.title}</div>
                <div className="text-[10px] text-[var(--admin-muted)]">{card.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        id="profile"
        className="scroll-mt-24 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)] md:p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/10 text-navy dark:bg-sky-400/10 dark:text-sky-300">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
              Profile
            </h2>
            <p className="text-xs text-[var(--admin-muted)]">
              Signed-in administrator identity
            </p>
          </div>
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-[var(--admin-border)] py-3">
            <dt className="text-[var(--admin-muted)]">Name</dt>
            <dd className="font-semibold text-[var(--admin-text)]">{user?.name || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4 border-b border-[var(--admin-border)] py-3">
            <dt className="text-[var(--admin-muted)]">Email</dt>
            <dd className="font-semibold text-[var(--admin-text)]">{user?.email || "—"}</dd>
          </div>
          <div className="flex justify-between gap-4 py-3">
            <dt className="text-[var(--admin-muted)]">Role</dt>
            <dd className="font-semibold capitalize text-[var(--admin-text)]">
              {user?.role?.replace("_", " ") || "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div
        id="security"
        className="scroll-mt-24 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)] md:p-8"
      >
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
              Security
            </h2>
            <p className="text-xs text-[var(--admin-muted)]">
              JWT session · httpOnly cookies · idle auto-logout · CSRF token
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-[var(--admin-muted)]">
          Password rotation and multi-admin user management will be available in the Users
          and Roles modules.
        </p>
      </div>
    </div>
  );
}
