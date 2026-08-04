"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Bot, Menu, X, ChevronDown, ShieldCheck, Sparkles, LayoutDashboard, Phone } from "lucide-react";
import { site } from "@/content/site";
import { GlobalSearch } from "./GlobalSearch";

export const Nav: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-navy-deep border-b border-white/10 px-4 py-2 text-[10px] sm:text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-center sm:text-left">
          {/* Left Cluster */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-1.5 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="font-bold text-gold">Reg. No:</span>
              <span className="font-bold text-white tracking-wider">U85500JH2025NPL024051</span>
            </div>

            <span className="text-white/30 hidden sm:inline">|</span>

            <div className="flex items-center gap-1">
              <span className="text-white/70">Powered By: </span>
              <span className="font-bold text-white">Umanand Eastern Foundation</span>
            </div>

            <span className="text-white/30 hidden md:inline">|</span>

            <div className="hidden md:block">
              <span className="text-white/70">President: </span>
              <span className="font-bold text-gold">Sanjeev Kumar</span>
            </div>
          </div>

          {/* Right Cluster */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white/90">
            <a href="tel:+9106512912025" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="h-3.5 w-3.5 text-emerald shrink-0" />
              <span>+91 (0651) 291-2025</span>
            </a>

            <span className="text-white/30">|</span>

            <a href="mailto:contact@eidf.org.in" className="hover:text-gold transition-colors">
              contact@eidf.org.in
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Sticky Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-navy/90 backdrop-blur-md text-white transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-4 md:px-6">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img src="/images/logo.png" alt="EIDF Logo" className="h-8 sm:h-9 md:h-10 w-auto object-contain bg-white rounded-lg p-1 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <span className="font-display text-xs sm:text-sm md:text-base font-bold tracking-tight text-white group-hover:text-gold transition-colors leading-tight truncate max-w-[170px] sm:max-w-none">
                Eastern India Development Forum
              </span>
              <span className="text-[9px] sm:text-[10px] text-white/60 font-medium leading-none mt-0.5">
                {site.poweredBy}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-semibold text-white/80">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/about" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              About
            </Link>
            <Link
              href="/projects"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/projects" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              Projects
            </Link>

            {/* Portals Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                Portals <ChevronDown className="h-3.5 w-3.5 text-gold" />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 rounded-2xl border border-white/15 bg-navy-deep p-2 shadow-2xl backdrop-blur-xl z-50 text-xs">
                  <Link
                    href="/tenders"
                    className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-white/10 text-white/90 hover:text-gold transition-colors"
                  >
                    <ShieldCheck className="h-4 w-4 text-gold" /> Tender Assistance Center
                  </Link>
                  <Link
                    href="/investors"
                    className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-white/10 text-white/90 hover:text-emerald transition-colors"
                  >
                    <Sparkles className="h-4 w-4 text-emerald" /> Investor Portal
                  </Link>
                  <Link
                    href="/schemes"
                    className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-white/10 text-white/90 hover:text-amber transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-amber" /> Government Schemes
                  </Link>
                  <Link
                    href="/resources"
                    className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-white/10 text-white/90 hover:text-blue-400 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-400" /> Knowledge Center
                  </Link>
                  <Link
                    href="/analytics"
                    className="flex items-center gap-2 rounded-xl p-2.5 hover:bg-white/10 text-white/90 hover:text-purple-400 transition-colors"
                  >
                    <LayoutDashboard className="h-4 w-4 text-purple-400" /> Development Analytics
                  </Link>
                  <Link
                    href="/admin/login"
                    className="flex items-center gap-2 rounded-xl p-2.5 bg-gold/10 text-gold hover:bg-gold hover:text-navy-deep font-bold transition-colors mt-1"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Admin CMS Dashboard
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/membership"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/membership" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              Membership
            </Link>
            <Link
              href="/events"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/events" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              Events
            </Link>
            <Link
              href="/gallery"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/gallery" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-lg transition-colors ${pathname === "/contact" ? "text-gold bg-white/10" : "hover:text-white hover:bg-white/5"
                }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Trigger Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Command Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 p-2 sm:px-3 sm:py-1.5 text-xs text-white/80 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 text-gold shrink-0" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block rounded bg-white/20 px-1.5 py-0.5 text-[10px] text-white/70">
                ⌘K
              </kbd>
            </button>

            {/* Become Member CTA */}
            <Link
              href="/membership"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-gold px-4 py-1.5 sm:px-5 sm:py-2 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shadow-lg"
            >
              Join Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-lg p-1.5 sm:p-2 text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-navy-deep px-4 py-6 space-y-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              About EIDF
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Projects
            </Link>
            <Link
              href="/tenders"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-gold hover:bg-white/10"
            >
              Tender Assistance Center
            </Link>
            <Link
              href="/investors"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-emerald hover:bg-white/10"
            >
              Investor Portal & PPP
            </Link>
            <Link
              href="/schemes"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-amber hover:bg-white/10"
            >
              Government Schemes
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-blue-400 hover:bg-white/10"
            >
              Knowledge Center
            </Link>
            <Link
              href="/membership"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Membership
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Events
            </Link>
            <Link
              href="/gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Gallery
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-bold text-gold bg-gold/10 border border-gold/30"
            >
              Admin CMS Dashboard
            </Link>
          </div>
        )}
      </header>

      {/* Command Search Modal */}
      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
