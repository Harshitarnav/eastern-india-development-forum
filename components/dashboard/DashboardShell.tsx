"use client";

import { PageReveal } from "@/components/loading/PageReveal";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/dashboard/Navbar";
import { SessionGuard } from "@/components/dashboard/SessionGuard";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <SessionGuard>
      <div className="admin-shell flex min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] transition-colors duration-300">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar />
          <main className="relative flex-1 p-4 md:p-6 lg:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.07),transparent_35%)] dark:bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_40%),radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06),transparent_35%)]" />
            <PageReveal className="relative">{children}</PageReveal>
          </main>
        </div>
      </div>
    </SessionGuard>
  );
}
