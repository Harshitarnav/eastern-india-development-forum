"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { AdminNavItem } from "@/lib/admin/nav";
import { isNavChildActive, isNavItemActive } from "@/lib/admin/nav";
import { cn } from "@/lib/utils";

function useHash() {
  const [hash, setHash] = useState("");
  useEffect(() => {
    setHash(window.location.hash);
    const onHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
}

function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-[var(--admin-surface-2)] px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-[var(--admin-sidebar-muted)] uppercase",
        className
      )}
    >
      Soon
    </span>
  );
}

function isChildLinkActive(
  pathname: string,
  href: string,
  search: string,
  hash: string
) {
  if (href.includes("#")) {
    const [path, fragment] = href.split("#");
    return pathname === path && hash === `#${fragment}`;
  }
  return isNavChildActive(pathname, href, search);
}

function SidebarFlyout({
  item,
  pathname,
  search,
  hash,
  position,
  parentActive,
  onNavigate,
  onMouseEnter,
  onMouseLeave,
}: {
  item: AdminNavItem;
  pathname: string;
  search: string;
  hash: string;
  position: { top: number; left: number };
  parentActive: boolean;
  onNavigate: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -6, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
      style={{ top: position.top, left: position.left }}
      className="fixed z-[200] w-[220px]"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="absolute top-0 -left-3 h-full w-3" aria-hidden />

      <div className="relative overflow-hidden rounded-2xl border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.35)]">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />
        <span
          aria-hidden
          className="absolute top-4 -left-1.5 h-3 w-3 rotate-45 border-b border-l border-[var(--admin-border)] bg-[var(--admin-surface)]"
        />

        <Link
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-2.5 border-b border-[var(--admin-border)] px-4 py-3 transition-colors",
            hasChildren && "border-b",
            parentActive
              ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-sidebar-active-text)]"
              : "text-[var(--admin-text)] hover:bg-[var(--admin-surface-2)]"
          )}
        >
          <Icon
            className={cn(
              "h-4 w-4 shrink-0",
              parentActive ? "text-[var(--admin-sidebar-active-text)]" : "text-emerald"
            )}
          />
          <span className="min-w-0 flex-1 truncate text-xs font-bold">{item.label}</span>
          {item.underDevelopment && <SoonBadge />}
        </Link>

        {hasChildren && (
          <ul className="p-2">
            {item.children!.map((child) => {
              const childActive = isChildLinkActive(pathname, child.href, search, hash);
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    className={cn(
                      "group flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all",
                      childActive
                        ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-sidebar-active-text)] shadow-sm ring-1 ring-gold/20"
                        : "text-[var(--admin-sidebar-text)] hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-text)]"
                    )}
                  >
                    <ChevronRight
                      className={cn(
                        "h-3 w-3 shrink-0 transition-transform group-hover:translate-x-0.5",
                        childActive
                          ? "text-[var(--admin-sidebar-active-text)]"
                          : "text-[var(--admin-sidebar-muted)]"
                      )}
                    />
                    <span className="truncate">{child.label}</span>
                    {child.underDevelopment && <SoonBadge className="ml-auto shrink-0" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

export function SidebarNavItem({
  item,
  collapsed,
  showFlyout,
  pathname,
  onNavigate,
}: {
  item: AdminNavItem;
  collapsed: boolean;
  showFlyout: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const hash = useHash();

  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [flyoutPos, setFlyoutPos] = useState({ top: 0, left: 0 });

  const Icon = item.icon;
  const hasChildren = Boolean(item.children?.length);
  const parentActive = isNavItemActive(pathname, item.href);
  const childActive =
    hasChildren &&
    item.children!.some((child) => isChildLinkActive(pathname, child.href, search, hash));
  const isActive = parentActive || childActive;

  useEffect(() => {
    if (childActive) setExpanded(true);
  }, [childActive]);

  const updateFlyoutPos = useCallback(() => {
    if (!anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const flyoutHeight = hasChildren ? 48 + (item.children?.length ?? 0) * 44 : 48;
    const maxTop = window.innerHeight - flyoutHeight - 12;
    setFlyoutPos({
      top: Math.min(Math.max(rect.top, 12), maxTop),
      left: rect.right + 10,
    });
  }, [hasChildren, item.children?.length]);

  const handleMouseEnter = () => {
    if (!showFlyout) return;
    setHovered(true);
    updateFlyoutPos();
  };

  const linkClass = cn(
    "group flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all",
    collapsed && "justify-center px-2",
    isActive
      ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-sidebar-active-text)] shadow-sm ring-1 ring-gold/20"
      : "text-[var(--admin-sidebar-text)] hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-text)]"
  );

  const iconClass = cn(
    "h-4 w-4 shrink-0 transition-colors",
    isActive
      ? "text-[var(--admin-sidebar-active-text)]"
      : "text-[var(--admin-sidebar-muted)] group-hover:text-emerald"
  );

  if (!collapsed && hasChildren) {
    return (
      <div className="space-y-0.5">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={`${expanded ? "Collapse" : "Expand"} ${item.label} submenu`}
          className={cn(
            "group flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all",
            isActive
              ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-sidebar-active-text)] shadow-sm ring-1 ring-gold/20"
              : "text-[var(--admin-sidebar-text)] hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-text)]"
          )}
        >
          <Icon className={iconClass} />
          <span className="min-w-0 flex-1 truncate">{item.label}</span>
          {item.underDevelopment && <SoonBadge className="shrink-0" />}
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 shrink-0 transition-transform",
              expanded && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-4 space-y-0.5 overflow-hidden border-l border-[var(--admin-sidebar-border)] pl-2"
            >
              {item.children!.map((child) => {
                const active = isChildLinkActive(pathname, child.href, search, hash);
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-[11px] font-semibold transition-all",
                        active
                          ? "bg-[var(--admin-sidebar-active)] text-[var(--admin-sidebar-active-text)]"
                          : "text-[var(--admin-sidebar-muted)] hover:bg-[var(--admin-sidebar-hover)] hover:text-[var(--admin-text)]"
                      )}
                    >
                      <span className="h-1 w-1 shrink-0 rounded-full bg-current opacity-60" />
                      <span className="truncate">{child.label}</span>
                    </Link>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <>
      <div
        ref={anchorRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        className="relative"
      >
        <Link href={item.href} onClick={onNavigate} className={linkClass}>
          <Icon className={iconClass} />
          {!collapsed && (
            <>
              <span className="truncate">{item.label}</span>
              {item.underDevelopment && <SoonBadge className="ml-auto shrink-0" />}
            </>
          )}
        </Link>
      </div>

      {showFlyout &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {hovered && (
              <SidebarFlyout
                item={item}
                pathname={pathname}
                search={search}
                hash={hash}
                position={flyoutPos}
                parentActive={isActive}
                onNavigate={() => {
                  setHovered(false);
                  onNavigate();
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setHovered(false)}
              />
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
