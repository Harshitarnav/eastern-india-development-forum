"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  Phone,
  FileText,
  Briefcase,
  BookOpen,
  BarChart3,
  LayoutDashboard,
  Calendar,
  Images,
  Home,
  Info,
  FolderKanban,
  Users,
  Mail,
} from "lucide-react";
import {
  usePublicHeaderLayout,
  usePublicNav,
  usePublicSite,
} from "@/lib/cms/public-provider";
import { GlobalSearch } from "./GlobalSearch";
import { cn } from "@/lib/utils";
import { useLenisLock } from "@/components/motion";

const navLink = (active: boolean) =>
  cn(
    "relative px-3 py-2 text-[13px] font-semibold transition-colors whitespace-nowrap",
    active ? "text-gold" : "text-white/70 hover:text-white",
    active &&
      "after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:bg-gold"
  );

const PORTAL_ICONS: Record<string, typeof FileText> = {
  "/tenders": FileText,
  "/investors": Briefcase,
  "/schemes": LayoutDashboard,
  "/resources": BookOpen,
  "/analytics": BarChart3,
  "/events": Calendar,
  "/gallery": Images,
};

const PRIMARY_ICONS: Record<string, typeof Home> = {
  "/": Home,
  "/about": Info,
  "/projects": FolderKanban,
  "/membership": Users,
  "/events": Calendar,
  "/contact": Mail,
};

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const site = usePublicSite();
  const layout = usePublicHeaderLayout();
  const headerLinks = usePublicNav("header");
  const portalLinks = usePublicNav("portal");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const overlayOpen = mobileMenuOpen || searchOpen;

  useLenisLock(overlayOpen);

  const portalsActive = portalLinks.some((p) => pathname.startsWith(p.href));

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onPointer = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-portals-menu]")) return;
      setDropdownOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("keydown", onKey);
    };
  }, [dropdownOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (mq.matches) setMobileMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const { beforePortals, afterPortals } = useMemo(() => {
    if (!layout.showPortalsDropdown || layout.portalsPosition === "end") {
      return { beforePortals: headerLinks, afterPortals: [] as typeof headerLinks };
    }
    if (layout.portalsPosition === "before-cta") {
      return { beforePortals: headerLinks, afterPortals: [] as typeof headerLinks };
    }
    const splitAt = Math.max(1, Math.ceil(headerLinks.length / 2));
    return {
      beforePortals: headerLinks.slice(0, splitAt),
      afterPortals: headerLinks.slice(splitAt),
    };
  }, [headerLinks, layout.portalsPosition, layout.showPortalsDropdown]);

  const brandName =
    layout.brandTextMode === "short"
      ? site.shortName || "EIDF"
      : site.name || "Eastern India Development Forum";

  const shellAlign =
    layout.menuAlign === "left"
      ? "justify-start"
      : layout.menuAlign === "right"
        ? "justify-end"
        : layout.menuAlign === "center"
          ? "justify-center"
          : "justify-between";

  const navAlign =
    layout.menuAlign === "left"
      ? "mr-auto"
      : layout.menuAlign === "right"
        ? "ml-auto"
        : layout.menuAlign === "center"
          ? "mx-auto"
          : "";

  const compact = scrolled;

  const PortalsDropdown = (
    <div className="relative" data-portals-menu>
      <button
        type="button"
        onClick={() => setDropdownOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-2 text-[13px] font-semibold cursor-pointer transition-colors ${
          portalsActive ? "text-gold" : "text-white/75 hover:text-white"
        }`}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {layout.portalsLabel || "Portals"}
        <ChevronDown
          className={`h-3.5 w-3.5 text-gold/80 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {dropdownOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-3 w-[22rem] border border-white/10 bg-navy-deep/95 p-2 shadow-2xl z-50 backdrop-blur-xl"
          >
            <div className="mb-2 border-b border-white/10 px-3 py-2">
              <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold">
                Command portals
              </div>
              <p className="mt-0.5 text-[11px] text-white/45">
                Access data, investment, and programme interfaces
              </p>
            </div>
            <div className="grid grid-cols-1 gap-0.5">
              {portalLinks.map((item, i) => {
                const Icon = PORTAL_ICONS[item.href] || FileText;
                return (
                  <Link
                    key={`portal-${item.href}-${i}`}
                    href={item.href}
                    onClick={() => setDropdownOpen(false)}
                    className="group flex items-center gap-3 px-3 py-3 text-[13px] text-white/80 transition-colors hover:bg-white/6 hover:text-gold"
                  >
                    <span className="flex h-9 w-9 items-center justify-center border border-white/10 bg-white/5 text-gold/80 group-hover:border-gold/40">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <div
        className={cn(
          "z-40 w-full text-white",
          layout.sticky ? "sticky top-0" : "relative"
        )}
      >
        {layout.showTopBar && (
          <div className="border-b border-white/10 bg-navy-deep px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-medium text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 min-w-0">
                <ShieldCheck className="h-3.5 w-3.5 text-gold shrink-0" />
                <span className="truncate">
                  <span className="text-white/50">Reg. </span>
                  <span className="font-semibold tracking-wide">{site.regNo}</span>
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-white/80">
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-1 hover:text-gold transition-colors"
                  aria-label="Call"
                >
                  <Phone className="h-3 w-3 text-emerald" />
                  <span className="hidden sm:inline">{site.phone}</span>
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="hidden sm:inline hover:text-gold transition-colors truncate max-w-[160px] md:max-w-none"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        )}

        <header
          className={cn(
            "w-full border-b border-white/10 bg-navy-deep transition-shadow duration-300",
            compact && "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.55)]"
          )}
        >
          <div
            className={cn(
              "relative mx-auto flex max-w-7xl items-center gap-3 px-4 md:px-6 py-3",
              shellAlign
            )}
          >
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink"
            >
              <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/70 group-hover:ring-gold transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.logo || "/images/logo.png"}
                  alt="EIDF"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              {layout.showBrandText && (
                <div className="flex min-w-0 flex-col">
                  <span className="font-display text-[13px] sm:text-sm md:text-[15px] font-extrabold tracking-tight leading-tight group-hover:text-gold transition-colors truncate">
                    <span className="sm:hidden">{site.shortName || "EIDF"}</span>
                    <span className="hidden sm:inline">{brandName}</span>
                  </span>
                  {layout.brandTextMode === "full" && (
                    <span className="hidden sm:block text-[10px] text-white/45 font-medium mt-0.5 truncate">
                      {site.poweredBy}
                    </span>
                  )}
                </div>
              )}
            </Link>

            <nav className={cn("hidden lg:flex items-center gap-0.5", navAlign)}>
              {beforePortals.map((link, i) => (
                <Link
                  key={`nav-before-${link.href}-${i}`}
                  href={link.href}
                  className={navLink(isActive(link.href))}
                >
                  {link.label}
                </Link>
              ))}

              {layout.showPortalsDropdown &&
                layout.portalsPosition === "after-primary" &&
                PortalsDropdown}

              {afterPortals.map((link, i) => (
                <Link
                  key={`nav-after-${link.href}-${i}`}
                  href={link.href}
                  className={navLink(isActive(link.href))}
                >
                  {link.label}
                </Link>
              ))}

              {layout.showPortalsDropdown &&
                (layout.portalsPosition === "before-cta" ||
                  layout.portalsPosition === "end") &&
                PortalsDropdown}
            </nav>

            <div
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 shrink-0",
                layout.menuAlign === "left" && "ml-auto",
                layout.menuAlign === "center" && "absolute right-4 md:right-6"
              )}
            >
              {layout.showSearch && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4 text-gold" />
                </button>
              )}

              {layout.showCta && (
                <Link
                  href={layout.ctaHref || "/membership"}
                  className="hidden sm:inline-flex btn-primary !px-4 !py-2 !w-auto text-xs"
                  data-cursor="VIEW"
                >
                  {layout.ctaLabel || "Join Us"}
                </Link>
              )}

              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="lg:hidden flex h-10 w-10 items-center justify-center border border-white/15 bg-white/[0.04] text-white hover:bg-white/10 cursor-pointer"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-nav"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </header>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50" id="mobile-nav">
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="absolute inset-0 flex flex-col eidf-depth text-white"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-0.5 ring-2 ring-gold/60">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={site.logo || "/images/logo.png"}
                      alt=""
                      className="h-full w-full rounded-full object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-lg font-extrabold truncate">
                      {site.shortName || "EIDF"}
                    </div>
                    <div className="text-[10px] text-white/45 truncate uppercase tracking-[0.14em]">
                      Navigation
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
                <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold/80">
                  Explore
                </p>
                <ul className="space-y-1">
                  {headerLinks.map((item, i) => {
                    const active = isActive(item.href);
                    const Icon = PRIMARY_ICONS[item.href] || Home;
                    return (
                      <motion.li
                        key={`m-nav-${item.href}-${i}`}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 * i }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex min-h-14 items-center gap-4 border-b border-white/8 px-3 py-3.5 text-xl font-display font-bold transition-colors ${
                            active
                              ? "text-gold"
                              : "text-white/90 hover:text-white"
                          }`}
                        >
                          <Icon
                            className={`h-5 w-5 shrink-0 ${active ? "text-gold" : "text-white/35"}`}
                          />
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {layout.showPortalsDropdown && portalLinks.length > 0 && (
                  <>
                    <p className="px-3 mt-8 mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold/80">
                      {layout.portalsLabel || "Portals"}
                    </p>
                    <ul className="grid grid-cols-2 gap-2">
                      {portalLinks.map((item, i) => {
                        const active = isActive(item.href);
                        const Icon = PORTAL_ICONS[item.href] || FileText;
                        return (
                          <li key={`m-portal-${item.href}-${i}`}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`flex min-h-16 flex-col justify-center gap-2 border px-3 py-3 text-sm font-semibold transition-colors ${
                                active
                                  ? "border-gold/40 bg-gold/10 text-gold"
                                  : "border-white/10 bg-white/5 text-white/85 hover:bg-white/8"
                              }`}
                            >
                              <Icon
                                className={`h-4 w-4 ${active ? "text-gold" : "text-gold/55"}`}
                              />
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}
              </nav>

              <div className="border-t border-white/10 p-5 space-y-3">
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center justify-center gap-2 border border-white/15 bg-white/5 px-4 py-3.5 text-xs font-semibold text-white/85 hover:bg-white/10"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald" />
                  {site.phone}
                </a>
                {layout.showCta && (
                  <Link
                    href={layout.ctaHref || "/membership"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary !w-full"
                  >
                    {layout.ctaLabel || "Join Us"}
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
