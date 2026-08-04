"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { site } from "@/content/site";
import { GlobalSearch } from "./GlobalSearch";

const navLink = (active: boolean) =>
  `px-3 py-2 rounded-md text-[13px] font-semibold transition-colors ${
    active ? "text-gold" : "text-white/75 hover:text-white"
  }`;

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
            <a href="tel:+9106512912025" className="flex items-center gap-1 hover:text-gold transition-colors" aria-label="Call">
              <Phone className="h-3 w-3 text-emerald" />
              <span className="hidden sm:inline">+91 (0651) 291-2025</span>
            </a>
            <a href="mailto:contact@eidf.org.in" className="hidden sm:inline hover:text-gold transition-colors truncate max-w-[160px] md:max-w-none">
              contact@eidf.org.in
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy/95 backdrop-blur-xl text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <span className="relative flex h-11 w-11 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/70 group-hover:ring-gold transition-all">
              <img
                src="/images/logo.png"
                alt="EIDF"
                className="h-full w-full rounded-full object-contain"
              />
            </span>
            <div className="hidden sm:flex flex-col">
              <span className="font-display text-sm md:text-[15px] font-extrabold tracking-tight leading-tight group-hover:text-gold transition-colors">
                Eastern India Development Forum
              </span>
              <span className="text-[10px] text-white/45 font-medium mt-0.5">
                {site.poweredBy}
              </span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" className={navLink(pathname === "/")}>Home</Link>
            <Link href="/about" className={navLink(pathname === "/about")}>About</Link>
            <Link href="/projects" className={navLink(pathname === "/projects")}>Projects</Link>

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
                  {[
                    { href: "/tenders", label: "Tenders", icon: FileText },
                    { href: "/investors", label: "Investors & PPP", icon: Briefcase },
                    { href: "/schemes", label: "Govt Schemes", icon: LayoutDashboard },
                    { href: "/resources", label: "Knowledge Center", icon: BookOpen },
                    { href: "/analytics", label: "Analytics", icon: BarChart3 },
                    { href: "/events", label: "Events", icon: Calendar },
                    { href: "/gallery", label: "Gallery", icon: Images },
                  ].map((item) => (
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

            <Link href="/membership" className={navLink(pathname === "/membership")}>Membership</Link>
            <Link href="/events" className={navLink(pathname === "/events")}>Events</Link>
            <Link href="/contact" className={navLink(pathname === "/contact")}>Contact</Link>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center rounded-md border border-white/15 bg-white/5 p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-gold" />
            </button>

            <Link href="/membership" className="hidden sm:inline-flex btn-primary !px-4 !py-2 text-xs">
              Join Us
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-md p-2 text-white/80 hover:bg-white/10 cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-navy-deep px-4 py-4 space-y-0.5 max-h-[min(70vh,560px)] overflow-y-auto">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/projects", "Projects"],
              ["/tenders", "Tenders"],
              ["/investors", "Investors"],
              ["/schemes", "Schemes"],
              ["/resources", "Knowledge Center"],
              ["/events", "Events"],
              ["/gallery", "Gallery"],
              ["/membership", "Membership"],
              ["/contact", "Contact"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/8 hover:text-gold"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-3 flex items-center justify-center btn-primary !rounded-lg w-full"
            >
              Join Us
            </Link>
          </div>
        )}
      </header>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
