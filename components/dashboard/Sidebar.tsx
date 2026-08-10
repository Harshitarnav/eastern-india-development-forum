"use client";

import Link from "next/link";
import { Suspense, useEffect } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { SidebarNavItem } from "@/components/dashboard/SidebarNavItem";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { adminNavItems } from "@/lib/admin/nav";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setSidebarMobileOpen } from "@/lib/store/ui-slice";
import { cn } from "@/lib/utils";

function SidebarNav({
  iconOnly,
  showFlyout,
  onNavigate,
}: {
  iconOnly: boolean;
  showFlyout: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav
      className="flex-1 space-y-0.5 overflow-y-auto overscroll-contain px-2 py-3"
      aria-label="Admin"
    >
      {adminNavItems.map((item) => (
        <SidebarNavItem
          key={item.href}
          item={item}
          collapsed={iconOnly}
          showFlyout={showFlyout}
          pathname={pathname}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-[var(--admin-sidebar-border)] p-4">
      <div className="rounded-2xl border border-[var(--admin-sidebar-border)] bg-gradient-to-br from-emerald/10 via-[var(--admin-surface-2)] to-gold/10 p-3">
        <div className="text-[10px] font-bold tracking-wider text-emerald-dark uppercase dark:text-emerald">
          Secure Session
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-[var(--admin-muted)]">
          Idle sessions expire automatically. Sign out when finished.
        </p>
      </div>
    </div>
  );
}

function DesktopSidebarHeader({ collapsed }: { collapsed: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center border-b border-[var(--admin-sidebar-border)] px-4 py-5",
        collapsed ? "justify-center px-2" : "gap-2.5"
      )}
    >
      <Link
        href="/admin/dashboard"
        className={cn(
          "flex min-w-0 items-center gap-2.5",
          collapsed && "justify-center"
        )}
      >
        <BrandLogo size="md" className="border-[var(--admin-sidebar-border)]" />
        {!collapsed && (
          <div className="min-w-0">
            <div className="truncate font-display text-sm font-bold text-[var(--admin-text)]">
              EIDF Admin
            </div>
            <div className="truncate text-[10px] font-medium text-[var(--admin-sidebar-muted)]">
              CMS Console
            </div>
          </div>
        )}
      </Link>
    </div>
  );
}

function MobileDrawerHeader({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-[var(--admin-sidebar-border)] px-4 py-5">
      <Link
        href="/admin/dashboard"
        onClick={onClose}
        className="flex min-w-0 items-center gap-2.5"
      >
        <BrandLogo size="md" className="border-[var(--admin-sidebar-border)]" />
        <div className="min-w-0">
          <div className="truncate font-display text-sm font-bold text-[var(--admin-text)]">
            EIDF Admin
          </div>
          <div className="truncate text-[10px] font-medium text-[var(--admin-sidebar-muted)]">
            CMS Console
          </div>
        </div>
      </Link>
      <button
        type="button"
        className="inline-flex rounded-lg p-1.5 text-[var(--admin-sidebar-muted)] transition hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-text)]"
        onClick={onClose}
        aria-label="Close menu"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function Sidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const collapsed = useAppSelector((s) => s.ui.sidebarCollapsed);
  const mobileOpen = useAppSelector((s) => s.ui.sidebarMobileOpen);

  const closeMobile = () => dispatch(setSidebarMobileOpen(false));

  // Close mobile drawer on route change
  useEffect(() => {
    dispatch(setSidebarMobileOpen(false));
  }, [pathname, dispatch]);

  // Lock body scroll while mobile drawer is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // Close mobile drawer on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dispatch(setSidebarMobileOpen(false));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, dispatch]);

  // Close mobile drawer when viewport becomes desktop (lg+)
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches) dispatch(setSidebarMobileOpen(false));
    };
    media.addEventListener("change", onChange);
    onChange();
    return () => media.removeEventListener("change", onChange);
  }, [dispatch]);

  const desktopWidth = collapsed ? "lg:w-[72px]" : "lg:w-[260px]";

  return (
    <>
      {/* Desktop sidebar — lg and up only (flex classes must be lg:-prefixed or hidden loses on mobile) */}
      <aside
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 lg:flex lg:flex-col",
          "border-r border-[var(--admin-sidebar-border)] bg-[var(--admin-sidebar)] transition-[width] duration-300",
          desktopWidth
        )}
      >
        <DesktopSidebarHeader collapsed={collapsed} />
        <Suspense fallback={<div className="flex-1 px-2 py-3" />}>
          <SidebarNav
            iconOnly={collapsed}
            showFlyout={collapsed}
            onNavigate={() => undefined}
          />
        </Suspense>
        {!collapsed && <SidebarFooter />}
      </aside>

      {/* Mobile drawer — below lg */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Close menu overlay"
              className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm dark:bg-black/60 lg:hidden"
              onClick={closeMobile}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 left-0 z-50 w-[min(280px,88vw)] max-w-full lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <div className="flex h-full flex-col border-r border-[var(--admin-sidebar-border)] bg-[var(--admin-sidebar)] shadow-2xl">
                <MobileDrawerHeader onClose={closeMobile} />
                <Suspense fallback={<div className="flex-1 px-2 py-3" />}>
                  <SidebarNav
                    iconOnly={false}
                    showFlyout={false}
                    onNavigate={closeMobile}
                  />
                </Suspense>
                <SidebarFooter />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
