"use client";

import { motion } from "framer-motion";
import { Construction, Inbox } from "lucide-react";
import Link from "next/link";

export function EmptyState({
  title = "This module is under development",
  description = "No data available yet. The EIDF CMS team is building this workspace for production use.",
  showCta = true,
}: {
  title?: string;
  description?: string;
  showCta?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-[var(--admin-border)] bg-[var(--admin-surface)] px-6 py-16 text-center shadow-[var(--admin-shadow)]"
    >
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-100 via-emerald/10 to-gold/15 dark:from-sky-400/10 dark:via-emerald/10 dark:to-gold/10">
          <Inbox className="h-9 w-9 text-navy dark:text-gold" />
        </div>
        <div className="absolute -right-1 -bottom-1 flex h-8 w-8 items-center justify-center rounded-xl bg-gold text-navy-deep shadow-md">
          <Construction className="h-4 w-4" />
        </div>
      </div>
      <h3 className="font-display text-xl font-bold text-[var(--admin-text)]">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--admin-muted)]">
        {description}
      </p>
      {showCta && (
        <Link
          href="/admin/dashboard"
          className="mt-6 rounded-full bg-gradient-to-r from-navy to-navy-mid px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:shadow-lg dark:from-gold dark:to-amber-500 dark:text-navy-deep"
        >
          Back to Dashboard
        </Link>
      )}
    </motion.div>
  );
}
