"use client";

import React, { useEffect, useState } from "react";
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
import { site } from "@/content/site";
import { GlobalSearch } from "./GlobalSearch";

const navLink = (active: boolean) =>
  `px-3 py-2 rounded-md text-[13px] font-semibold transition-colors ${
    active ? "text-gold" : "text-white/75 hover:text-white"
  }`;

const PRIMARY_LINKS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/membership", label: "Membership", icon: Users },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/contact", label: "Contact", icon: Mail },
] as const;

const PORTAL_LINKS = [
  { href: "/tenders", label: "Tenders", icon: FileText },
  { href: "/investors", label: "Investors & PPP", icon: Briefcase },
  { href: "/schemes", label: "Govt Schemes", icon: LayoutDashboard },
  { href: "/resources", label: "Knowledge Center", icon: BookOpen },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/events", label: "Events", icon: Calendar },
  { href: "/gallery", label: "Gallery", icon: Images },
] as const;

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const portalsActive = [
    "/tenders",
    "/investors",
    "/schemes",
    "/resources",
    "/analytics",
    "/events",
    "/gallery",
  ].some((p) => pathname.startsWith(p));

  // Close drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll + Escape to close
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  // Close drawer when viewport hits desktop
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

  return (
    <>
      <div className="bg-navy-deep border-b border-white/10 px-3 sm:px-4 py-1.5 text-[10px] sm:text-[11px] font-medium text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <ShieldCheck className="h-3.5 w-3.5 text-gold shrink-0" />
            <span className="truncate">
              <span className="text-white/50">Reg. </span>
              <span className="font-semibold tracking-wide">U85500JH2025NPL024051</span>
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-white/80">
            <a
              href="tel:+9106512912025"
              className="flex items-center gap-1 hover:text-gold transition-colors"
              aria-label="Call"
            >
              <Phone className="h-3 w-3 text-emerald" />
              <span className="hidden sm:inline">+91 (0651) 291-2025</span>
            </a>
            <a
              href="mailto:contact@eidf.org.in"
              className="hidden sm:inline hover:text-gold transition-colors truncate max-w-[160px] md:max-w-none"
            >
              contact@eidf.org.in
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy/95 backdrop-blur-xl text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group min-w-0 shrink">
            <span className="relative flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/70 group-hover:ring-gold transition-all">
              <img
                src="/images/logo.png"
                alt="EIDF"
                className="h-full w-full rounded-full object-contain"
              />
            </span>
            <div className="flex min-w-0 flex-col">
              <span className="font-display text-[13px] sm:text-sm md:text-[15px] font-extrabold tracking-tight leading-tight group-hover:text-gold transition-colors truncate">
                <span className="sm:hidden">EIDF</span>
                <span className="hidden sm:inline">Eastern India Development Forum</span>
              </span>
              <span className="hidden sm:block text-[10px] text-white/45 font-medium mt-0.5 truncate">
                {site.poweredBy}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={navLink(pathname === "/")}>
              Home
            </Link>
            <Link href="/about" className={navLink(pathname === "/about")}>
              About
            </Link>
            <Link href="/projects" className={navLink(pathname === "/projects")}>
              Projects
            </Link>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-[13px] font-semibold cursor-pointer transition-colors ${
                  portalsActive ? "text-gold" : "text-white/75 hover:text-white"
                }`}
              >
                Portals <ChevronDown className="h-3.5 w-3.5 text-gold/80" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 border border-white/10 bg-navy-deep p-1.5 shadow-2xl z-50">
                  {PORTAL_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] text-white/80 hover:bg-white/8 hover:text-gold transition-colors"
                    >
                      <item.icon className="h-4 w-4 text-gold/70" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/membership" className={navLink(pathname === "/membership")}>
              Membership
            </Link>
            <Link href="/events" className={navLink(pathname === "/events")}>
              Events
            </Link>
            <Link href="/contact" className={navLink(pathname === "/contact")}>
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-gold" />
            </button>

            <Link
              href="/membership"
              className="hidden sm:inline-flex btn-primary !px-4 !py-2 !w-auto text-xs"
            >
              Join Us
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10 cursor-pointer"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50" id="mobile-nav">
            <motion.button
              type="button"
              aria-label="Close menu overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="absolute inset-y-0 right-0 flex w-[min(100%,22rem)] flex-col border-l border-white/10 bg-navy-deep text-white shadow-2xl"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white p-0.5 ring-2 ring-gold/60">
                    <img
                      src="/images/logo.png"
                      alt=""
                      className="h-full w-full rounded-full object-contain"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display text-sm font-extrabold truncate">EIDF</div>
                    <div className="text-[10px] text-white/45 truncate">{site.poweredBy}</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
                <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gold/80">
                  Explore
                </p>
                <ul className="space-y-0.5">
                  {PRIMARY_LINKS.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                            active
                              ? "bg-gold/15 text-gold"
                              : "text-white/85 hover:bg-white/8 hover:text-white"
                          }`}
                        >
                          <item.icon
                            className={`h-4 w-4 shrink-0 ${active ? "text-gold" : "text-white/45"}`}
                          />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                <p className="px-3 mt-5 mb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gold/80">
                  Portals
                </p>
                <ul className="space-y-0.5">
                  {PORTAL_LINKS.filter((item) => item.href !== "/events").map((item) => {
                    const active = isActive(item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                            active
                              ? "bg-gold/15 text-gold"
                              : "text-white/85 hover:bg-white/8 hover:text-white"
                          }`}
                        >
                          <item.icon
                            className={`h-4 w-4 shrink-0 ${active ? "text-gold" : "text-gold/55"}`}
                          />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="border-t border-white/10 p-4 space-y-3">
                <a
                  href="tel:+9106512912025"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-white/85 hover:bg-white/10"
                >
                  <Phone className="h-3.5 w-3.5 text-emerald" />
                  +91 (0651) 291-2025
                </a>
                <Link
                  href="/membership"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary !w-full !rounded-xl"
                >
                  Join Us
                </Link>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
