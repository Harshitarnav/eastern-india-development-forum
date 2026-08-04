"use client";

import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  setSidebarCollapsed,
  setSidebarMobileOpen,
} from "@/lib/store/ui-slice";
import { cn } from "@/lib/utils";

function AnimatedSidebarGlyph({
  collapsed,
  className,
}: {
  collapsed: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex h-[15px] w-[19px] items-stretch gap-[3px]", className)}>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
        animate={{ width: collapsed ? 5 : 12 }}
        className="shrink-0 rounded-[3px] bg-current shadow-[0_0_10px_-2px_currentColor]"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3px]">
        {[0.6, 0.38, 0.22].map((opacity, i) => (
          <motion.span
            key={i}
            animate={{ opacity, scaleX: collapsed ? 0.7 : 1 }}
            transition={{ type: "spring", stiffness: 380, damping: 28, delay: i * 0.025 }}
            className="block h-[2.5px] w-full origin-left rounded-full bg-current"
          />
        ))}
      </div>
    </div>
  );
}

function MobileCloseGlyph({ className }: { className?: string }) {
  return (
    <div className={cn("relative h-3.5 w-3.5", className)}>
      <span className="absolute top-1/2 left-0 block h-[2px] w-full -translate-y-1/2 rotate-45 rounded-full bg-current" />
      <span className="absolute top-1/2 left-0 block h-[2px] w-full -translate-y-1/2 -rotate-45 rounded-full bg-current" />
    </div>
  );
}

function MobileMenuGlyph({ className }: { className?: string }) {
  return (
    <div className={cn("flex w-[17px] flex-col gap-[4.5px]", className)}>
      {[1, 0.72, 0.44].map((scale, i) => (
        <motion.span
          key={i}
          initial={false}
          animate={{ scaleX: scale }}
          className="block h-[2px] w-full origin-left rounded-full bg-current"
        />
      ))}
    </div>
  );
}

const spring = { type: "spring" as const, stiffness: 400, damping: 28 };

function ToggleShell({
  children,
  onClick,
  ariaLabel,
  ariaPressed,
  collapsed,
  tooltip,
  variant,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  ariaPressed?: boolean;
  collapsed?: boolean;
  tooltip: string;
  variant: "mobile" | "desktop";
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      transition={spring}
      className={cn(
        "group relative isolate inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-visible rounded-2xl outline-none",
        variant === "mobile" ? "lg:hidden" : "hidden lg:inline-flex"
      )}
    >
      {/* Outer glow */}
      <span
        aria-hidden
        className={cn(
          "absolute -inset-1 rounded-[18px] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100",
          collapsed
            ? "bg-gradient-to-br from-gold/60 via-amber/35 to-orange/20"
            : "bg-gradient-to-br from-emerald/45 via-teal/25 to-sky-400/20"
        )}
      />

      {/* Body */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 rounded-2xl border shadow-[0_2px_12px_-4px_rgba(0,0,0,0.25)] transition-all duration-300",
          collapsed
            ? "border-gold/40 bg-gradient-to-br from-gold/15 via-[var(--admin-surface)] to-amber/10 group-hover:border-gold/60 group-hover:shadow-[0_4px_20px_-6px_rgba(245,158,11,0.45)]"
            : "border-[var(--admin-border)] bg-gradient-to-br from-[var(--admin-surface)] via-[var(--admin-surface-2)] to-emerald/[0.06] group-hover:border-emerald/45 group-hover:shadow-[0_4px_20px_-6px_rgba(16,185,129,0.35)]"
        )}
      />

      {/* Top highlight */}
      <span
        aria-hidden
        className="absolute inset-x-2.5 top-0 h-px rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent dark:via-white/15"
      />

      {/* Icon */}
      <span
        className={cn(
          "relative z-10 transition-colors duration-300",
          collapsed ? "text-gold" : "text-emerald"
        )}
      >
        {children}
      </span>

      {/* Tooltip */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-[calc(100%+8px)] left-1/2 z-50 -translate-x-1/2 scale-90 rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface)] px-2.5 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap text-[var(--admin-text)] opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
      >
        {tooltip}
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 border-t border-l border-[var(--admin-border)] bg-[var(--admin-surface)]" />
      </span>
    </motion.button>
  );
}

export function SidebarToggle() {
  const dispatch = useAppDispatch();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.sidebarMobileOpen);

  return (
    <>
      <ToggleShell
        variant="mobile"
        ariaLabel={mobileOpen ? "Close sidebar menu" : "Open sidebar menu"}
        ariaPressed={mobileOpen}
        collapsed={mobileOpen}
        tooltip={mobileOpen ? "Close menu" : "Open menu"}
        onClick={() => dispatch(setSidebarMobileOpen(!mobileOpen))}
      >
        {mobileOpen ? <MobileCloseGlyph /> : <MobileMenuGlyph />}
      </ToggleShell>

      <ToggleShell
        variant="desktop"
        ariaLabel={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        ariaPressed={collapsed}
        collapsed={collapsed}
        tooltip={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => dispatch(setSidebarCollapsed(!collapsed))}
      >
        <AnimatedSidebarGlyph collapsed={collapsed} />
      </ToggleShell>
    </>
  );
}
