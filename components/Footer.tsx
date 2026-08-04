"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { MapPin, Mail, Phone } from "lucide-react";

export const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="border-t border-white/10 bg-navy-deep text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/60">
                <img
                  src="/images/logo.png"
                  alt="EIDF"
                  className="h-full w-full rounded-full object-contain"
                />
              </span>
              <span className="font-display text-base font-extrabold leading-tight">
                Eastern India Development Forum
              </span>
            </div>
            <p className="text-sm text-white/55 leading-relaxed mb-5 max-w-sm">
              Apex development platform powered by Umanand Eastern Foundation — connecting governments, investors, and diaspora across Eastern India.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                <span>{site.headquarters}</span>
              </div>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="h-4 w-4 text-emerald shrink-0" />
                {site.email}
              </a>
              <a href="tel:+9106512912025" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="h-4 w-4 text-amber shrink-0" />
                {site.phone}
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold mb-4">Explore</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/tenders" className="hover:text-white transition-colors">Tenders</Link></li>
              <li><Link href="/investors" className="hover:text-white transition-colors">Investors</Link></li>
              <li><Link href="/schemes" className="hover:text-white transition-colors">Schemes</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Resources</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
              <li><Link href="/membership" className="hover:text-white transition-colors">Membership</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-display text-sm font-bold text-gold mb-4">Briefings</h4>
            <p className="text-sm text-white/55 leading-relaxed mb-4">
              Monthly updates on RFPs, investment policy, and project milestones.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Professional email"
                className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/35 focus:border-gold focus:outline-none"
              />
              <button type="submit" className="btn-primary !rounded-lg w-full !py-3">
                {subscribed ? "Subscribed" : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <span>© {new Date().getFullYear()} Eastern India Development Forum</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/admin/login" className="hover:text-gold text-gold/80">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
