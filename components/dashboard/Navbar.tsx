"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, LogOut, Search, User } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearUser } from "@/lib/store/auth-slice";
import { logoutRequest } from "@/lib/auth/client";
import { useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs";
import { SidebarToggle } from "@/components/dashboard/SidebarToggle";
import { ThemeToggle } from "@/components/dashboard/ThemeToggle";

export function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((s) => s.auth.user);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function handleLogout() {
    await logoutRequest();
    dispatch(clearUser());
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--admin-border)] bg-[var(--admin-surface)]/85 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        <SidebarToggle />

        <div className="min-w-0 flex-1">
          <Breadcrumbs />
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="relative">
            <Search className="pointer-events-none absolute top-2.5 left-3 h-4 w-4 text-[var(--admin-muted)]" />
            <input
              type="search"
              placeholder="Search modules…"
              className="w-52 rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-2)] py-2 pr-4 pl-9 text-xs text-[var(--admin-text)] outline-none transition focus:border-emerald focus:ring-2 focus:ring-[var(--admin-ring)] lg:w-64"
            />
          </div>
        </div>

        <ThemeToggle />

        <div className="relative" ref={notifRef}>
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            className="relative rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-2 text-[var(--admin-text)] transition hover:bg-[var(--admin-surface-2)]"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald ring-2 ring-[var(--admin-surface)]" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-3 shadow-2xl">
              <div className="mb-2 text-xs font-bold text-[var(--admin-text)]">
                Notifications
              </div>
              <div className="space-y-2 text-xs text-[var(--admin-muted)]">
                <div className="rounded-xl bg-[var(--admin-surface-2)] p-3">
                  Welcome to the EIDF Admin Console.
                </div>
                <div className="rounded-xl bg-[var(--admin-surface-2)] p-3">
                  CMS modules are under active development.
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface)] py-1.5 pr-3 pl-1.5 transition hover:bg-[var(--admin-surface-2)]"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-mid text-xs font-bold text-gold shadow-sm">
              {user?.name?.slice(0, 1) || "A"}
            </div>
            <div className="hidden text-left sm:block">
              <div className="text-xs font-bold text-[var(--admin-text)]">
                {user?.name || "Administrator"}
              </div>
              <div className="text-[10px] capitalize text-[var(--admin-muted)]">
                {user?.role?.replace("_", " ") || "admin"}
              </div>
            </div>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-2xl">
              <div className="border-b border-[var(--admin-border)] px-4 py-3">
                <div className="text-xs font-bold text-[var(--admin-text)]">
                  {user?.email}
                </div>
              </div>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)]"
                onClick={() => setProfileOpen(false)}
              >
                <User className="h-3.5 w-3.5 text-emerald" /> Profile & Settings
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <LogOut className="h-3.5 w-3.5" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
