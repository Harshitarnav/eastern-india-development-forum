"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const labels: Record<string, string> = {
  admin: "Admin",
  dashboard: "Dashboard",
  cms: "Website CMS",
  projects: "Projects",
  states: "States",
  schemes: "Government Schemes",
  tenders: "Tender Management",
  investments: "Investment Opportunities",
  partners: "Partners",
  members: "Members",
  events: "Events",
  news: "News",
  gallery: "Gallery",
  downloads: "Downloads",
  forms: "Forms",
  testimonials: "Testimonials",
  leadership: "Leadership",
  users: "Users",
  roles: "Roles & Permissions",
  analytics: "Analytics",
  seo: "SEO",
  settings: "Settings",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1 text-xs">
      <Link
        href="/admin/dashboard"
        className="rounded-lg p-1 text-[var(--admin-muted)] transition hover:bg-[var(--admin-surface-2)] hover:text-[var(--admin-text)]"
      >
        <Home className="h-3.5 w-3.5" />
      </Link>
      {parts.map((part, idx) => {
        const href = "/" + parts.slice(0, idx + 1).join("/");
        const isLast = idx === parts.length - 1;
        const label = labels[part] || part;
        return (
          <div key={href} className="flex min-w-0 items-center gap-1">
            <ChevronRight className="h-3 w-3 shrink-0 text-[var(--admin-muted)]/60" />
            {isLast ? (
              <span className="truncate font-bold text-[var(--admin-text)]">{label}</span>
            ) : (
              <Link
                href={href === "/admin" ? "/admin/dashboard" : href}
                className="truncate text-[var(--admin-muted)] transition hover:text-[var(--admin-text)]"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
