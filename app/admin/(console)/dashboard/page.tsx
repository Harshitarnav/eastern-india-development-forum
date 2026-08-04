"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  Handshake,
  Calendar,
  Download,
  Eye,
  Activity,
  Clock,
  PlusCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAppSelector } from "@/lib/store/hooks";

const stats = [
  { label: "Projects", value: "42", hint: "Active", icon: FolderKanban, accent: "gold" as const },
  { label: "Visitors (30d)", value: "18.4K", hint: "+12%", icon: Eye, accent: "emerald" as const },
  { label: "Members", value: "1,280", hint: "Network", icon: Users, accent: "sky" as const },
  { label: "Partners", value: "64", hint: "Institutions", icon: Handshake, accent: "amber" as const },
  { label: "Events", value: "12", hint: "Scheduled", icon: Calendar, accent: "gold" as const },
  { label: "Downloads", value: "3.1K", hint: "Reports", icon: Download, accent: "emerald" as const },
  { label: "Active Users", value: "9", hint: "Online", icon: Activity, accent: "sky" as const },
  { label: "Pending Requests", value: "7", hint: "Review", icon: Clock, accent: "amber" as const },
];

const activity = [
  { title: "Membership application received", time: "12 min ago", tag: "Forms" },
  { title: "Tender RFP document downloaded", time: "48 min ago", tag: "Tenders" },
  { title: "CMS tagline updated", time: "2 hrs ago", tag: "CMS" },
  { title: "Investor inquiry submitted", time: "Yesterday", tag: "Investments" },
];

const quickActions = [
  { label: "Edit Website CMS", href: "/admin/cms", icon: Globe },
  { label: "Review Forms", href: "/admin/forms", icon: FileText },
  { label: "Manage Events", href: "/admin/events", icon: Calendar },
  { label: "Open Settings", href: "/admin/settings", icon: PlusCircle },
];

export default function AdminDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--admin-border)] bg-gradient-to-br from-navy via-navy-mid to-emerald-900 p-7 text-white shadow-[var(--admin-shadow)] md:p-9 dark:from-[#0f1c33] dark:via-navy dark:to-[#0d2a24]"
      >
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative">
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure Console
          </div>
          <h1 className="font-display text-2xl font-extrabold md:text-3xl">
            Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/75">
            Monitor regional development operations, content, and requests from a single
            enterprise dashboard.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} index={i} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-4 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)] lg:col-span-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
              Recent Activity
            </h2>
            <span className="text-[11px] font-bold text-[var(--admin-muted)] uppercase">
              Timeline
            </span>
          </div>
          <div className="space-y-3">
            {activity.map((item) => (
              <div
                key={item.title}
                className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3"
              >
                <div>
                  <div className="text-sm font-semibold text-[var(--admin-text)]">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[11px] text-[var(--admin-muted)]">{item.time}</div>
                </div>
                <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:text-gold">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-5">
          <div className="rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)]">
            <h2 className="mb-4 font-display text-lg font-bold text-[var(--admin-text)]">
              Quick Actions
            </h2>
            <div className="grid gap-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center justify-between rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3 text-sm font-semibold text-[var(--admin-text)] transition hover:border-emerald/40 hover:bg-[var(--admin-surface)]"
                >
                  <span className="flex items-center gap-2.5">
                    <action.icon className="h-4 w-4 text-emerald" />
                    {action.label}
                  </span>
                  <ArrowRight className="h-4 w-4 text-[var(--admin-muted)]" />
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)]">
            <h2 className="mb-2 font-display text-lg font-bold text-[var(--admin-text)]">
              Website Status
            </h2>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-dark dark:text-emerald">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald" />
              All systems operational
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[var(--admin-muted)]">
              Public site, form APIs, and admin authentication are online. CMS modules marked
              “Soon” are scaffolding for upcoming releases.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-surface)] p-6">
          <h3 className="font-display text-base font-bold text-[var(--admin-text)]">
            Recent Form Submissions
          </h3>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">No data available yet.</p>
        </div>
        <div className="rounded-3xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-surface)] p-6">
          <h3 className="font-display text-base font-bold text-[var(--admin-text)]">
            Upcoming Events
          </h3>
          <p className="mt-2 text-sm text-[var(--admin-muted)]">
            This module is under development.
          </p>
        </div>
      </div>
    </div>
  );
}
