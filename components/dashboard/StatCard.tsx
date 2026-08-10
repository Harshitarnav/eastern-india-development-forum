"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  hint,
  icon: Icon,
  accent = "gold",
  index = 0,
}: {
  label: string;
  value: string;
  hint?: string;
  icon: LucideIcon;
  accent?: "gold" | "emerald" | "navy" | "amber" | "sky";
  index?: number;
}) {
  const accents = {
    gold: "bg-gold/15 text-amber-600 dark:text-gold",
    emerald: "bg-emerald/15 text-emerald-dark dark:text-emerald",
    navy: "bg-navy/10 text-navy dark:bg-sky-400/10 dark:text-sky-300",
    amber: "bg-amber/15 text-amber-600 dark:text-amber-400",
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-400/10 dark:text-sky-300",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group rounded-3xl border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 shadow-[var(--admin-shadow)] transition-all hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-lg"
    >
      <div className="mb-4 flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl transition-transform group-hover:scale-105",
            accents[accent]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {hint && (
          <span className="rounded-full bg-[var(--admin-surface-2)] px-2 py-1 text-[10px] font-bold text-[var(--admin-muted)]">
            {hint}
          </span>
        )}
      </div>
      <div className="font-display text-2xl font-extrabold text-[var(--admin-text)]">
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold text-[var(--admin-muted)]">{label}</div>
    </motion.div>
  );
}
