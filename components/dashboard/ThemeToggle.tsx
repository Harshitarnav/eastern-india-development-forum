"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const options = [
  { value: "light", icon: Sun, label: "Light" },
  { value: "dark", icon: Moon, label: "Dark" },
  { value: "system", icon: Monitor, label: "System" },
] as const;

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-2)]",
          compact ? "h-9 w-9" : "h-9 w-[112px]"
        )}
      />
    );
  }

  if (compact) {
    const next = theme === "dark" ? "light" : "dark";
    return (
      <button
        type="button"
        onClick={() => setTheme(next)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--admin-border)] bg-[var(--admin-surface)] text-[var(--admin-text)] shadow-sm transition hover:border-gold/40 hover:bg-[var(--admin-surface-2)]"
        aria-label={`Switch to ${next} mode`}
        title={`Switch to ${next} mode`}
      >
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-gold" />
        ) : (
          <Moon className="h-4 w-4 text-navy-mid" />
        )}
      </button>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--admin-border)] bg-[var(--admin-surface-2)] p-1 shadow-sm"
      role="group"
      aria-label="Theme"
    >
      {options.map(({ value, icon: Icon, label }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[11px] font-bold transition-all",
              active
                ? "bg-[var(--admin-surface)] text-navy shadow-sm dark:text-gold"
                : "text-[var(--admin-muted)] hover:text-[var(--admin-text)]"
            )}
            aria-pressed={active}
            title={label}
          >
            <Icon
              className={cn(
                "h-3.5 w-3.5",
                active && value === "dark" && "text-gold",
                active && value === "light" && "text-amber-500",
                active && value === "system" && "text-emerald"
              )}
            />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
