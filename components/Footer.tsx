"use client";

import React, { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { Send, MapPin, Mail, Phone, ShieldCheck, HeartHandshake } from "lucide-react";

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
    <footer className="border-t border-white/10 bg-navy-deep text-white pt-16 pb-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        {/* Top Newsletter & SDG Bar */}
        <div className="mb-12 rounded-3xl border border-white/15 bg-gradient-to-r from-navy via-navy-mid to-slate-dark p-6 md:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              STAY INFORMED ON EASTERN INDIA&apos;S TRANSFORMATION
            </span>
            <h3 className="font-display text-2xl font-bold text-white mt-1">
              Subscribe to EIDF Development Briefings
            </h3>
            <p className="text-xs text-white/70 mt-1">
              Receive monthly updates on newly published RFPs, state investment policies, and project milestones.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your professional email..."
              className="w-full lg:w-72 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-xs text-white placeholder-white/40 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-gold px-6 py-3 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shrink-0 cursor-pointer w-full sm:w-auto text-center"
            >
              {subscribed ? "Subscribed!" : "Subscribe"}
            </button>
          </form>
        </div>

        {/* Navigation Grid */}
        <div className="grid gap-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-12 text-xs">
          {/* Col 1: About EIDF */}
          <div className="col-span-2 md:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/images/logo.png" alt="EIDF Logo" className="h-9 w-auto object-contain bg-white rounded-lg p-1" />
              <span className="font-display text-lg font-bold text-white">
                Eastern India Development Forum
              </span>
            </div>
            <p className="text-white/70 leading-relaxed max-w-sm mb-4">
              An apex facilitating platform powered by Umanand Eastern Foundation , uniting Governments, Enterprises, Investors, and Diaspora to accelerate sustainable growth across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East.
            </p>
            <div className="flex flex-col gap-1.5 text-white/80">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-gold shrink-0" /> {site.headquarters}
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-emerald shrink-0" /> {site.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-amber shrink-0" /> {site.phone}
              </span>
            </div>
          </div>

          {/* Col 2: Core Portals */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 text-gold">
              Portals & Services
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <Link href="/tenders" className="hover:text-white transition-colors">
                  Tender Assistance Center
                </Link>
              </li>
              <li>
                <Link href="/investors" className="hover:text-white transition-colors">
                  Investor Portal & PPP
                </Link>
              </li>
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  Government Schemes
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Knowledge Center & Reports
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white transition-colors">
                  Development Analytics
                </Link>
              </li>
              <li>
                <Link href="/proposals/submit" className="hover:text-white transition-colors">
                  Submit Project Proposal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Focus Areas */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 text-emerald">
              Focus Areas
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>Core Infrastructure</li>
              <li>Renewable Energy</li>
              <li>Manufacturing & SEZ</li>
              <li>AI & Technology</li>
              <li>Skill Academies</li>
              <li>Agri-Tech & Food Parks</li>
            </ul>
          </div>

          {/* Col 4: Regional Chapters */}
          <div>
            <h4 className="font-display text-sm font-bold text-white mb-3 text-amber">
              State Chapters
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>Ranchi (Jharkhand HQ)</li>
              <li>Patna (Bihar)</li>
              <li>Bhubaneswar (Odisha)</li>
              <li>Kolkata (West Bengal)</li>
              <li>Guwahati (Assam & NE)</li>
            </ul>
          </div>
        </div>

        {/* SDG Badges & Compliance Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald" />
            <span>Aligned with UN Sustainable Development Goals (SDGs 1, 8, 9, 11, 13, 17)</span>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Governance</Link>
            <Link href="/admin" className="hover:text-gold font-bold text-gold">Admin CMS</Link>
          </div>
        </div>

        <div className="mt-4 text-center text-[11px] text-white/40">
          © {new Date().getFullYear()} Eastern India Development Forum. Powered by Umanand Eastern Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
