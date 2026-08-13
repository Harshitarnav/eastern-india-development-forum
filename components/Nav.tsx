"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
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
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  usePublicHeaderLayout,
  usePublicNav,
  usePublicSite,
} from "@/lib/cms/public-provider";
import { GlobalSearch } from "./GlobalSearch";
import { cn } from "@/lib/utils";
import { useLenisLock } from "@/components/motion";

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

const PORTAL_META: Record<
  string,
  { blurb: string; detail: string; tone: string }
> = {
  "/tenders": {
    blurb: "Live tenders & RFPs",
    detail: "Browse active procurement opportunities across Eastern India.",
    tone: "from-amber/20 to-gold/5",
  },
  "/investors": {
    blurb: "Zones & capital access",
    detail: "Explore PPP corridors, industrial parks, and investment facilitation.",
    tone: "from-emerald/25 to-brand-blue/10",
  },
  "/schemes": {
    blurb: "Govt programmes",
    detail: "Central and state schemes mapped for enterprise and community impact.",
    tone: "from-brand-blue/20 to-navy-light/10",
  },
  "/resources": {
    blurb: "Reports & briefs",
    detail: "Research, policy notes, and knowledge assets for decision-makers.",
    tone: "from-gold/20 to-amber/5",
  },
  "/analytics": {
    blurb: "Regional intelligence",
    detail: "Track corridors, outcomes, and development signals in one view.",
    tone: "from-emerald/20 to-gold/5",
  },
  "/events": {
    blurb: "Forums & conclaves",
    detail: "Upcoming summits, dialogues, and stakeholder convenings.",
    tone: "from-brand-blue/20 to-emerald/10",
  },
  "/gallery": {
    blurb: "Visual archive",
    detail: "Moments from projects, events, and regional development work.",
    tone: "from-white/10 to-gold/5",
  },
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayOpen = mobileMenuOpen || searchOpen;

  useLenisLock(overlayOpen);

  const portalsActive = portalLinks.some((p) => pathname.startsWith(p.href));

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openDropdown = () => {
    clearCloseTimer();
    setDropdownOpen(true);
  };

  const scheduleCloseDropdown = () => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 220);
  };

  useEffect(() => {
    return () => clearCloseTimer();
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    clearCloseTimer();
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > 2);
      setDropdownOpen(false);
    };
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

  const NavItem = ({
    href,
    label,
  }: {
    href: string;
    label: string;
  }) => {
    const active = isActive(href);
    return (
      <Link
        href={href}
        className={cn(
          "relative px-2.5 py-1.5 text-[13px] font-semibold whitespace-nowrap transition-colors duration-200 xl:px-3",
          active ? "text-white" : "text-white/60 hover:text-white"
        )}
      >
        {label}
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-gold"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        )}
      </Link>
    );
  };

  const featuredPortal =
    portalLinks.find((p) => p.href === "/investors") || portalLinks[0];
  const gridPortals = portalLinks.filter(
    (p) => p.href !== featuredPortal?.href
  );

  const PortalsTrigger = (
    <div
      className="relative"
      data-portals-menu
      onMouseEnter={openDropdown}
      onMouseLeave={scheduleCloseDropdown}
    >
      <button
        type="button"
        onClick={() => {
          clearCloseTimer();
          setDropdownOpen((o) => !o);
        }}
        onFocus={openDropdown}
        className={cn(
          "relative flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-semibold cursor-pointer transition-colors duration-200 xl:px-3",
          portalsActive || dropdownOpen
            ? "text-white"
            : "text-white/60 hover:text-white"
        )}
        aria-expanded={dropdownOpen}
        aria-haspopup="true"
      >
        {layout.portalsLabel || "Portals"}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            dropdownOpen ? "rotate-180 text-gold" : "text-white/35"
          )}
        />
        {(portalsActive || dropdownOpen) && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-gold"
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          />
        )}
      </button>
    </div>
  );

  const MegaMenu = (
    <AnimatePresence>
      {dropdownOpen && layout.showPortalsDropdown && (
        <motion.div
          data-portals-menu
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "absolute inset-x-0 top-full z-[80] pt-3",
            scrolled ? "px-1 sm:px-2" : "px-3 sm:px-4"
          )}
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleCloseDropdown}
        >
          <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/12 bg-navy-deep shadow-[0_40px_100px_-30px_rgba(0,0,0,0.85)]">
            <div className="grid lg:grid-cols-12">
              {/* Featured panel */}
              {featuredPortal && (
                <Link
                  href={featuredPortal.href}
                  onClick={() => setDropdownOpen(false)}
                  className="group relative isolate overflow-hidden border-b border-white/10 p-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-7"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/eidf_03.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/85 to-navy/40" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-emerald/20 opacity-80" />
                  <div className="relative flex h-full min-h-[240px] flex-col justify-between">
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/30 bg-gold/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-gold">
                        <Sparkles className="h-3 w-3" />
                        Featured portal
                      </span>
                      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-white md:text-[1.7rem]">
                        {featuredPortal.label}
                      </h3>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/65">
                        {PORTAL_META[featuredPortal.href]?.detail ||
                          "Open this portal to explore opportunities across Eastern India."}
                      </p>
                    </div>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold transition-transform duration-300 group-hover:translate-x-1">
                      Enter portal
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Portal grid */}
              <div className="lg:col-span-8">
                <div className="flex items-end justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      Command portals
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      Data, capital, programmes, and intelligence — unified
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold text-white/45 sm:inline">
                    {portalLinks.length} portals
                  </span>
                </div>

                <div className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 xl:grid-cols-3">
                  {(gridPortals.length ? gridPortals : portalLinks).map(
                    (item, i) => {
                      const Icon = PORTAL_ICONS[item.href] || FileText;
                      const meta = PORTAL_META[item.href];
                      const active = isActive(item.href);
                      return (
                        <motion.div
                          key={`mega-${item.href}-${i}`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.04 * i,
                            duration: 0.28,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setDropdownOpen(false)}
                            className={cn(
                              "group relative flex h-full flex-col overflow-hidden rounded-xl border p-4 transition-all duration-300",
                              active
                                ? "border-gold/40 bg-gold/10"
                                : "border-white/8 bg-white/[0.03] hover:-translate-y-0.5 hover:border-gold/30 hover:bg-white/[0.06]"
                            )}
                          >
                            <div
                              className={cn(
                                "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                                meta?.tone || "from-gold/10 to-transparent"
                              )}
                            />
                            <div className="relative flex items-start justify-between gap-3">
                              <span
                                className={cn(
                                  "flex h-11 w-11 items-center justify-center rounded-xl border transition-colors",
                                  active
                                    ? "border-gold/40 bg-gold/15 text-gold"
                                    : "border-white/10 bg-navy/40 text-gold group-hover:border-gold/35 group-hover:bg-gold/10"
                                )}
                              >
                                <Icon className="h-5 w-5" />
                              </span>
                              <ArrowUpRight
                                className={cn(
                                  "h-4 w-4 transition-all duration-300",
                                  active
                                    ? "text-gold"
                                    : "text-white/25 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
                                )}
                              />
                            </div>
                            <div className="relative mt-3.5">
                              <div
                                className={cn(
                                  "font-display text-[15px] font-bold leading-snug",
                                  active ? "text-gold" : "text-white"
                                )}
                              >
                                {item.label}
                              </div>
                              <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-gold/70">
                                {meta?.blurb || "Open portal"}
                              </p>
                              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/45 group-hover:text-white/60">
                                {meta?.detail ||
                                  "Explore this EIDF portal interface."}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      );
                    }
                  )}
                </div>

                <div className="flex flex-col gap-3 border-t border-white/8 bg-white/[0.02] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/50">
                    <Link
                      href="/proposals/submit"
                      onClick={() => setDropdownOpen(false)}
                      className="font-semibold text-white/70 transition-colors hover:text-gold"
                    >
                      Submit a proposal
                    </Link>
                    <span className="hidden h-3 w-px bg-white/15 sm:block" />
                    <Link
                      href="/contact"
                      onClick={() => setDropdownOpen(false)}
                      className="transition-colors hover:text-gold"
                    >
                      Talk to EIDF desk
                    </Link>
                  </div>
                  <Link
                    href={layout.ctaHref || "/membership"}
                    onClick={() => setDropdownOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-gold px-4 py-2 text-xs font-bold text-navy-deep transition-colors hover:bg-gold-hover"
                  >
                    {layout.ctaLabel || "Join Us"}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div
        className={cn(
          "z-[70] w-full text-white transition-[padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          layout.sticky || scrolled ? "sticky top-0" : "relative",
          scrolled ? "px-2.5 pt-2.5 sm:px-4 sm:pt-3" : "px-0 pt-0"
        )}
      >
        {/* Meta strip */}
        {layout.showTopBar && (
          <div
            className={cn(
              "overflow-hidden border-white/10 bg-[#050b14] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              scrolled
                ? "max-h-0 border-b-0 py-0 opacity-0"
                : "max-h-12 border-b px-3 py-1.5 opacity-100 sm:px-5"
            )}
            aria-hidden={scrolled}
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 text-[10px] sm:text-[11px] font-medium">
              <div className="flex min-w-0 items-center gap-1.5 text-white/50">
                <ShieldCheck className="h-3 w-3 shrink-0 text-gold-soft/80" />
                <span className="truncate">
                  <span className="text-white/35">Reg. </span>
                  <span className="font-semibold tracking-wide text-white/70">
                    {site.regNo}
                  </span>
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-3 text-white/50">
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-1.5 transition-colors hover:text-gold-soft"
                  aria-label="Call"
                >
                  <Phone className="h-3 w-3 text-emerald" />
                  <span className="hidden sm:inline">{site.phone}</span>
                </a>
                <span className="hidden h-3 w-px bg-white/12 sm:block" />
                <a
                  href={`mailto:${site.email}`}
                  className="hidden truncate transition-colors hover:text-gold-soft sm:inline max-w-[180px] md:max-w-none"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Split-islands stage */}
        <div
          className={cn(
            "relative overflow-visible transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
            scrolled
              ? "rounded-2xl border border-white/12 bg-navy-deep/80 px-3 py-2.5 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.72),0_0_0_1px_rgba(201,168,75,0.08)] backdrop-blur-xl sm:px-4"
              : "border-b border-white/10 bg-navy-deep px-3 py-3.5 sm:px-5 md:py-4"
          )}
        >
          {/* Mobile */}
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 lg:hidden">
            <Link href="/" className="flex min-w-0 items-center gap-2.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white p-[3px] ring-2 ring-gold/45">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.logo || "/images/logo.png"}
                  alt="EIDF"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              {layout.showBrandText && (
                <span className="truncate font-display text-sm font-extrabold">
                  {site.shortName || "EIDF"}
                </span>
              )}
            </Link>
            <div className="flex items-center gap-2">
              {layout.showSearch && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-white/75 cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/[0.05] text-white cursor-pointer"
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

          {/* Desktop: two islands */}
          <div className="relative mx-auto hidden max-w-7xl items-center justify-between gap-4 lg:flex">
            {/* Brand island */}
            <Link
              href="/"
              className={cn(
                "group flex min-w-0 items-center gap-3 rounded-2xl border py-2 pl-2 pr-4 transition-colors hover:border-gold/30",
                scrolled
                  ? "border-white/8 bg-white/[0.04]"
                  : "border-white/10 bg-[#0c1a2c] shadow-[0_12px_32px_-18px_rgba(0,0,0,0.7)]"
              )}
            >
              <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white p-[3px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.logo || "/images/logo.png"}
                  alt="EIDF"
                  className="h-full w-full rounded-[0.6rem] object-contain"
                />
              </span>
              {layout.showBrandText && (
                <div className="min-w-0">
                  <div className="truncate font-display text-[14px] font-extrabold leading-tight tracking-tight text-white transition-colors group-hover:text-gold-soft">
                    {brandName}
                  </div>
                  {layout.brandTextMode === "full" && (
                    <div className="mt-0.5 truncate text-[10px] text-white/40">
                      {site.poweredBy}
                    </div>
                  )}
                </div>
              )}
            </Link>

            {/* Subtle bridge */}
            <div
              aria-hidden
              className="hidden h-px flex-1 bg-gradient-to-r from-white/10 via-gold/25 to-white/10 xl:block"
            />

            {/* Nav island */}
            <div
              className={cn(
                "flex items-center gap-2 rounded-2xl border p-1.5 transition-colors",
                scrolled
                  ? "border-white/8 bg-white/[0.04]"
                  : "border-white/10 bg-[#0c1a2c] shadow-[0_12px_32px_-18px_rgba(0,0,0,0.7)]"
              )}
            >
              <nav className="flex items-center gap-0.5 px-1">
                {beforePortals.map((link, i) => (
                  <NavItem
                    key={`nav-before-${link.href}-${i}`}
                    href={link.href}
                    label={link.label}
                  />
                ))}

                {layout.showPortalsDropdown &&
                  layout.portalsPosition === "after-primary" &&
                  PortalsTrigger}

                {afterPortals.map((link, i) => (
                  <NavItem
                    key={`nav-after-${link.href}-${i}`}
                    href={link.href}
                    label={link.label}
                  />
                ))}

                {layout.showPortalsDropdown &&
                  (layout.portalsPosition === "before-cta" ||
                    layout.portalsPosition === "end") &&
                  PortalsTrigger}
              </nav>

              <span
                aria-hidden
                className="mx-0.5 h-6 w-px bg-white/10"
              />

              {layout.showSearch && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white/55 transition-colors hover:bg-white/[0.07] hover:text-gold-soft cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}

              {layout.showCta && (
                <Link
                  href={layout.ctaHref || "/membership"}
                  className="group inline-flex items-center gap-1.5 rounded-xl bg-gold px-3.5 py-2 text-xs font-bold text-navy-deep transition-colors hover:bg-gold-hover"
                  data-cursor="VIEW"
                >
                  {layout.ctaLabel || "Join Us"}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              )}
            </div>
          </div>

          {MegaMenu}
        </div>
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
                    <div className="truncate font-display text-lg font-extrabold">
                      {site.shortName || "EIDF"}
                    </div>
                    <div className="truncate text-[10px] uppercase tracking-[0.14em] text-white/45">
                      Navigation
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-6">
                <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold/80">
                  Explore
                </p>
                <ul className="space-y-1.5">
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
                          className={cn(
                            "flex min-h-14 items-center gap-4 rounded-2xl border px-4 py-3.5 text-xl font-display font-bold transition-colors",
                            active
                              ? "border-white/15 bg-white/[0.1] text-white"
                              : "border-white/8 bg-white/[0.03] text-white/90 hover:bg-white/[0.06]"
                          )}
                        >
                          <Icon
                            className={cn(
                              "h-5 w-5 shrink-0",
                              active ? "text-gold-soft" : "text-white/35"
                            )}
                          />
                          {item.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {layout.showPortalsDropdown && portalLinks.length > 0 && (
                  <>
                    <p className="mb-3 mt-8 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold/80">
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
                              className={cn(
                                "flex min-h-16 flex-col justify-center gap-2 rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors",
                                active
                                  ? "border-gold/40 bg-gold/10 text-gold"
                                  : "border-white/10 bg-white/5 text-white/85 hover:bg-white/8"
                              )}
                            >
                              <Icon
                                className={cn(
                                  "h-4 w-4",
                                  active ? "text-gold" : "text-gold/55"
                                )}
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

              <div className="space-y-3 border-t border-white/10 p-5">
                <a
                  href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3.5 text-xs font-semibold text-white/85 hover:bg-white/10"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald" />
                  {site.phone}
                </a>
                {layout.showCta && (
                  <Link
                    href={layout.ctaHref || "/membership"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary !w-full !rounded-full"
                  >
                    {layout.ctaLabel || "Join Us"}
                    <ArrowUpRight className="h-4 w-4" />
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
