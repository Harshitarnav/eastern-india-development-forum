"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FolderKanban,
  Users,
  Handshake,
  Calendar,
  Download,
  Clock,
  PlusCircle,
  FileText,
  ArrowRight,
  ShieldCheck,
  Globe,
  MapPin,
  Building2,
  ScrollText,
  ImageIcon,
  Mail,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { useAppSelector } from "@/lib/store/hooks";

type DashboardPayload = {
  stats: {
    projects: number;
    schemes: number;
    tenders: number;
    openTenders: number;
    events: number;
    partners: number;
    reports: number;
    gallery: number;
    zones: number;
    states: number;
    offices: number;
    news: number;
    leaders: number;
    membershipApplications: number;
    contactMessages: number;
    proposals: number;
    pendingRequests: number;
  };
  activity: {
    id: string;
    title: string;
    time: string;
    tag: string;
    href: string;
  }[];
  recentForms: {
    id: string;
    kind: "contact" | "membership" | "proposal";
    name: string;
    email: string;
    detail: string;
    status: string;
    created_at: string;
  }[];
  upcomingEvents: {
    id: string;
    title: string;
    date: string;
    location: string;
    type: string;
    mode: string;
  }[];
  meta: {
    cmsUpdatedAt: string;
    siteName: string;
    source: string;
  };
};

const quickActions = [
  { label: "Edit Website CMS", href: "/admin/cms", icon: Globe },
  { label: "Review Forms", href: "/admin/forms", icon: FileText },
  { label: "Manage Events", href: "/admin/events", icon: Calendar },
  { label: "Open Settings", href: "/admin/settings", icon: PlusCircle },
];

function fmt(n: number) {
  return n.toLocaleString("en-IN");
}

export default function AdminDashboardPage() {
  const user = useAppSelector((s) => s.auth.user);
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/cms/dashboard");
      if (!res.ok) throw new Error("Failed to load dashboard");
      return res.json() as Promise<DashboardPayload>;
    },
    refetchInterval: 60_000,
  });

  const stats = data?.stats;
  const statCards = stats
    ? [
        {
          label: "Projects",
          value: fmt(stats.projects),
          hint: "Published",
          icon: FolderKanban,
          accent: "gold" as const,
          href: "/admin/projects",
        },
        {
          label: "Open Tenders",
          value: fmt(stats.openTenders),
          hint: `${fmt(stats.tenders)} total`,
          icon: ScrollText,
          accent: "amber" as const,
          href: "/admin/tenders",
        },
        {
          label: "Membership Apps",
          value: fmt(stats.membershipApplications),
          hint: "Inbox",
          icon: Users,
          accent: "sky" as const,
          href: "/admin/forms",
        },
        {
          label: "Partners",
          value: fmt(stats.partners),
          hint: "Listed",
          icon: Handshake,
          accent: "emerald" as const,
          href: "/admin/partners",
        },
        {
          label: "Events",
          value: fmt(stats.events),
          hint: "Published",
          icon: Calendar,
          accent: "gold" as const,
          href: "/admin/events",
        },
        {
          label: "Reports",
          value: fmt(stats.reports),
          hint: "Knowledge center",
          icon: Download,
          accent: "emerald" as const,
          href: "/admin/downloads",
        },
        {
          label: "Investment Zones",
          value: fmt(stats.zones),
          hint: `${fmt(stats.states)} states`,
          icon: Building2,
          accent: "sky" as const,
          href: "/admin/investments",
        },
        {
          label: "Pending Requests",
          value: fmt(stats.pendingRequests),
          hint: "Needs review",
          icon: Clock,
          accent: "amber" as const,
          href: "/admin/forms",
        },
      ]
    : [];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl border border-[var(--admin-border)] bg-gradient-to-br from-navy via-navy-mid to-emerald-900 p-7 text-white shadow-[var(--admin-shadow)] md:p-9 dark:from-[#0f1c33] dark:via-navy dark:to-[#0d2a24]"
      >
        <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-gold">
              <ShieldCheck className="h-3.5 w-3.5" /> Live CMS Data
            </div>
            <h1 className="font-display text-2xl font-extrabold md:text-3xl">
              Welcome back{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-white/75">
              Counts and activity below are pulled from your CMS content and form
              inbox — not placeholder numbers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold text-white hover:bg-white/15 disabled:opacity-60"
          >
            {isFetching ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <RefreshCw className="h-3.5 w-3.5" />
            )}
            Refresh
          </button>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] py-16 text-sm text-[var(--admin-muted)]">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading live dashboard…
        </div>
      ) : isError || !stats ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          Could not load dashboard data.{" "}
          <button type="button" onClick={() => refetch()} className="font-bold underline">
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {statCards.map((stat, i) => (
              <Link key={stat.label} href={stat.href} className="block">
                <StatCard {...stat} index={i} />
              </Link>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Schemes", value: stats.schemes, href: "/admin/schemes", icon: ScrollText },
              { label: "Gallery items", value: stats.gallery, href: "/admin/gallery", icon: ImageIcon },
              { label: "Contact messages", value: stats.contactMessages, href: "/admin/forms", icon: Mail },
              { label: "Proposals", value: stats.proposals, href: "/admin/forms", icon: FileText },
            ].map((row) => (
              <Link
                key={row.label}
                href={row.href}
                className="flex items-center justify-between rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] px-4 py-3 text-sm shadow-[var(--admin-shadow)]"
              >
                <span className="flex items-center gap-2 font-semibold text-[var(--admin-text)]">
                  <row.icon className="h-4 w-4 text-gold" />
                  {row.label}
                </span>
                <span className="font-display text-lg font-bold text-[var(--admin-text)]">
                  {fmt(row.value)}
                </span>
              </Link>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-4 rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)] lg:col-span-7">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-lg font-bold text-[var(--admin-text)]">
                  Recent Activity
                </h2>
                <span className="text-[11px] font-bold uppercase text-[var(--admin-muted)]">
                  Live
                </span>
              </div>
              {data.activity.length === 0 ? (
                <p className="text-sm text-[var(--admin-muted)]">
                  No recent form activity yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {data.activity.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="flex items-start justify-between gap-3 rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3 transition hover:border-gold/30"
                    >
                      <div>
                        <div className="text-sm font-semibold text-[var(--admin-text)]">
                          {item.title}
                        </div>
                        <div className="mt-1 text-[11px] text-[var(--admin-muted)]">
                          {item.time}
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-bold text-amber-700 dark:text-gold">
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
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
                  CMS online · {data.meta.source}
                </div>
                <p className="mt-2 text-xs leading-relaxed text-[var(--admin-muted)]">
                  {data.meta.siteName} content last updated{" "}
                  {data.meta.cmsUpdatedAt
                    ? new Date(data.meta.cmsUpdatedAt).toLocaleString("en-IN")
                    : "—"}
                  . Offices: {fmt(stats.offices)} · Leadership: {fmt(stats.leaders)} · News:{" "}
                  {fmt(stats.news)}.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-[var(--admin-text)]">
                  Recent Form Submissions
                </h3>
                <Link
                  href="/admin/forms"
                  className="text-xs font-bold text-gold hover:underline"
                >
                  View all
                </Link>
              </div>
              {data.recentForms.length === 0 ? (
                <p className="text-sm text-[var(--admin-muted)]">No submissions yet.</p>
              ) : (
                <div className="space-y-3">
                  {data.recentForms.slice(0, 5).map((form) => (
                    <div
                      key={`${form.kind}-${form.id}`}
                      className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-semibold text-[var(--admin-text)]">
                            {form.name}
                          </div>
                          <div className="text-xs text-[var(--admin-muted)]">{form.email}</div>
                          <div className="mt-1 line-clamp-1 text-xs text-[var(--admin-muted)]">
                            {form.detail}
                          </div>
                        </div>
                        <span className="shrink-0 rounded-full bg-[var(--admin-surface)] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--admin-muted)]">
                          {form.kind}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[var(--admin-shadow)]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-base font-bold text-[var(--admin-text)]">
                  Upcoming Events
                </h3>
                <Link
                  href="/admin/events"
                  className="text-xs font-bold text-gold hover:underline"
                >
                  Manage
                </Link>
              </div>
              {data.upcomingEvents.length === 0 ? (
                <p className="text-sm text-[var(--admin-muted)]">No published events.</p>
              ) : (
                <div className="space-y-3">
                  {data.upcomingEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface-2)] px-4 py-3"
                    >
                      <div className="text-sm font-semibold text-[var(--admin-text)]">
                        {ev.title}
                      </div>
                      <div className="mt-1 flex flex-wrap gap-3 text-[11px] text-[var(--admin-muted)]">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-gold" /> {ev.date}
                        </span>
                        {ev.location ? (
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-emerald" /> {ev.location}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
