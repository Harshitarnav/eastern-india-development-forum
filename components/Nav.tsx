"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [portalReady, setPortalReady] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const overlayOpen = mobileMenuOpen || searchOpen;

  useLenisLock(overlayOpen);

  useEffect(() => {
    setPortalReady(true);
  }, []);

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
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setMobileMenuOpen(false);
      else {
        setDropdownOpen(false);
        clearCloseTimer();
      }
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
          "relative px-2 py-1.5 text-[12px] font-semibold whitespace-nowrap transition-colors duration-200 2xl:px-3 2xl:text-[13px]",
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
          "relative flex items-center gap-1 px-2 py-1.5 text-[12px] font-semibold cursor-pointer transition-colors duration-200 2xl:px-3 2xl:text-[13px]",
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
            "absolute inset-x-0 top-full z-[80] hidden pt-3 xl:block",
            scrolled ? "px-1 sm:px-2" : "px-3 sm:px-4"
          )}
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleCloseDropdown}
        >
          <div className="pointer-events-none absolute inset-x-8 -top-px h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <div className="mx-auto max-h-[min(80vh,720px)] max-w-7xl overflow-y-auto overflow-x-hidden rounded-2xl border border-gold/35 bg-gradient-to-b from-[#214868] to-[#173552] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.55),0_0_0_1px_rgba(201,168,75,0.12)]">
            <div className="grid lg:grid-cols-12">
              {/* Featured panel */}
              {featuredPortal && (
                <Link
                  href={featuredPortal.href}
                  onClick={() => setDropdownOpen(false)}
                  className="group relative isolate overflow-hidden border-b border-white/15 p-6 lg:col-span-4 lg:border-b-0 lg:border-r lg:p-7"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/eidf_03.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#173552] via-[#173552]/88 to-[#214868]/45" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/15 via-transparent to-emerald/20 opacity-80" />
                  <div className="relative flex h-full min-h-[160px] flex-col justify-between xl:min-h-[200px] 2xl:min-h-[240px]">
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
                <div className="flex items-end justify-between gap-3 border-b border-white/15 px-5 py-4 sm:px-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold">
                      Command portals
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      Data, capital, programmes, and intelligence — unified
                    </p>
                  </div>
                  <span className="hidden rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-[10px] font-semibold text-white/55 sm:inline">
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
                                : "border-white/20 bg-white/[0.08] hover:-translate-y-0.5 hover:border-gold/35 hover:bg-white/[0.12]"
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
                                    : "border-white/20 bg-white/10 text-gold group-hover:border-gold/35 group-hover:bg-gold/10"
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

                <div className="flex flex-col gap-3 border-t border-white/15 bg-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
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
          scrolled ? "xl:px-4 xl:pt-3" : "xl:px-0 xl:pt-0"
        )}
      >
        {/* Meta strip — desktop only */}
        {layout.showTopBar && (
          <div
            className={cn(
              "hidden overflow-hidden border-white/10 bg-[#050b14] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] xl:block",
              scrolled
                ? "xl:max-h-0 xl:border-b-0 xl:py-0 xl:opacity-0"
                : "xl:max-h-12 xl:border-b xl:px-5 xl:py-1.5 xl:opacity-100"
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
            "border-b border-gold/35 bg-gradient-to-b from-[#214868] to-[#173552] px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]",
            scrolled
              ? "xl:rounded-2xl xl:border xl:border-white/20 xl:bg-[#1a3a5c]/88 xl:px-4 xl:py-2.5 xl:pt-2.5 xl:shadow-[0_18px_50px_-18px_rgba(0,0,0,0.72),0_0_0_1px_rgba(201,168,75,0.16)] xl:backdrop-blur-xl"
              : "xl:border-x-0 xl:border-t-0 xl:px-5 xl:py-4 xl:pt-4"
          )}
        >
          {/* Mobile */}
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 xl:hidden">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-[2px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.logo || "/images/logo.png"}
                  alt="EIDF"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              {layout.showBrandText && (
                <span className="truncate font-display text-base font-extrabold tracking-tight">
                  {site.shortName || "EIDF"}
                </span>
              )}
            </Link>
            <div className="flex shrink-0 items-center gap-1">
              {layout.showSearch && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 cursor-pointer"
                  aria-label="Search"
                >
                  <Search className="h-5 w-5" />
                </button>
              )}
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen((open) => !open);
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full text-white cursor-pointer"
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
          <div className="relative mx-auto hidden max-w-7xl items-center justify-between gap-3 xl:flex 2xl:gap-4">
            {/* Brand island */}
            <Link
              href="/"
              className="nav-island group flex min-w-0 max-w-[11.5rem] shrink-0 items-center gap-3 rounded-2xl py-2 pl-2 pr-3 2xl:max-w-none 2xl:pr-4"
            >
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white p-[3px] 2xl:h-11 2xl:w-11">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={site.logo || "/images/logo.png"}
                  alt="EIDF"
                  className="h-full w-full rounded-[0.6rem] object-contain"
                />
              </span>
              {layout.showBrandText && (
                <div className="min-w-0">
                  <div className="truncate font-display text-[13px] font-extrabold leading-tight tracking-tight text-white transition-colors group-hover:text-gold-soft 2xl:text-[14px]">
                    <span className="2xl:hidden">{site.shortName || "EIDF"}</span>
                    <span className="hidden 2xl:inline">{brandName}</span>
                  </div>
                  {layout.brandTextMode === "full" && (
                    <div className="mt-0.5 hidden truncate text-[10px] text-white/40 2xl:block">
                      {site.poweredBy}
                    </div>
                  )}
                </div>
              )}
            </Link>

            {/* Subtle bridge */}
            <div
              aria-hidden
              className="hidden h-px min-w-4 flex-1 bg-gradient-to-r from-white/10 via-gold/25 to-white/10 2xl:block"
            />

            {/* Nav island */}
            <div className="nav-island flex min-w-0 items-center gap-1 rounded-2xl p-1 2xl:gap-2 2xl:p-1.5">
              <nav className="flex min-w-0 items-center gap-0 overflow-x-auto px-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:gap-0.5 2xl:px-1">
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
                className="mx-0.5 hidden h-6 w-px bg-white/15 2xl:block"
              />

              {layout.showSearch && (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-white/55 transition-colors hover:bg-white/[0.07] hover:text-gold-soft cursor-pointer 2xl:h-9 2xl:w-9"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}

              {layout.showCta && (
                <Link
                  href={layout.ctaHref || "/membership"}
                  className="group inline-flex shrink-0 items-center gap-1 rounded-xl bg-gold px-2.5 py-1.5 text-[11px] font-bold text-navy-deep transition-colors hover:bg-gold-hover 2xl:gap-1.5 2xl:px-3.5 2xl:py-2 2xl:text-xs"
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

      {portalReady &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="mobile-nav"
                role="dialog"
                aria-modal="true"
                aria-label="Navigation menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] flex h-dvh w-full flex-col overflow-hidden text-white xl:hidden"
                style={{
                  paddingTop: "env(safe-area-inset-top)",
                  paddingBottom: "env(safe-area-inset-bottom)",
                }}
              >
                <div className="pointer-events-none absolute inset-0 hero-mesh" />
                <div className="pointer-events-none absolute inset-0 eidf-grain opacity-40" />
                <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
                <div className="pointer-events-none absolute -left-10 bottom-24 h-48 w-48 rounded-full bg-emerald/15 blur-3xl" />

                <div className="relative z-10 flex shrink-0 items-center justify-between px-5 py-4">
                  <Link
                    href="/"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex min-w-0 items-center gap-2.5"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-[1.5px]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={site.logo || "/images/logo.png"}
                        alt=""
                        className="h-full w-full rounded-full object-contain"
                      />
                    </span>
                    <span className="truncate text-[11px] font-bold uppercase tracking-[0.22em] text-white/55">
                      {site.shortName || "EIDF"}
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav className="relative z-10 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-6">
                  <ul className="divide-y divide-white/8">
                    {headerLinks.map((item, i) => {
                      const active = isActive(item.href);
                      return (
                        <motion.li
                          key={`m-nav-${item.href}-${i}`}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: 0.05 + i * 0.04,
                            duration: 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="group flex items-baseline justify-between gap-4 py-3.5"
                          >
                            <span
                              className={cn(
                                "font-display text-[1.85rem] font-extrabold leading-none tracking-tight",
                                active
                                  ? "text-gold"
                                  : "text-white group-active:text-gold-soft"
                              )}
                            >
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "font-mono text-[11px] tracking-widest",
                                active ? "text-gold" : "text-white/25"
                              )}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {layout.showPortalsDropdown && portalLinks.length > 0 && (
                    <motion.div
                      className="mt-8"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.28, duration: 0.35 }}
                    >
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                        {layout.portalsLabel || "Portals"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {portalLinks.map((item) => {
                          const active = isActive(item.href);
                          return (
                            <Link
                              key={`m-portal-${item.href}`}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "rounded-full border px-3.5 py-2 text-[13px] font-semibold",
                                active
                                  ? "border-gold bg-gold text-navy-deep"
                                  : "border-white/15 bg-white/5 text-white/80"
                              )}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </nav>

                <div className="relative z-10 shrink-0 px-5 pb-5 pt-2">
                  <div className="flex items-center gap-2 rounded-full border border-white/12 bg-white/8 p-1.5 backdrop-blur-md">
                    <a
                      href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold text-white"
                    >
                      <Phone className="h-4 w-4 text-gold" />
                      Call
                    </a>
                    {layout.showCta && (
                      <Link
                        href={layout.ctaHref || "/membership"}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-12 flex-[1.3] items-center justify-center gap-1.5 rounded-full bg-gold px-5 text-sm font-bold text-navy-deep"
                      >
                        {layout.ctaLabel || "Join Us"}
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
