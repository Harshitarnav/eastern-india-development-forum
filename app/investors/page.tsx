"use client";

import React, { useState } from "react";
import { site } from "@/content/site";
import { Coins, Building2, ShieldCheck, ArrowRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function InvestorsPage() {
  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Hero Header */}
        <div className="mb-12 rounded-3xl border border-line bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white p-8 md:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald">
            GLOBAL CAPITAL & PPP PORTAL
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Eastern India Investor Opportunities Portal
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Facilitating Foreign Direct Investment (FDI), Domestic Capital Allocation, and Public-Private Partnerships across Industrial Parks, Special Economic Zones, and Logistics Corridors.
          </p>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/proposals/submit"
              className="rounded-full bg-gold px-8 py-3.5 text-xs font-bold text-navy-deep hover:bg-gold-hover transition-transform hover:scale-105 shadow-xl"
            >
              Submit Investment Inquiry →
            </Link>
            <Link
              href="/analytics"
              className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-xs font-semibold text-white hover:bg-white/20 transition-all"
            >
              View Analytics & Yield Maps
            </Link>
          </div>
        </div>

        {/* Investment Zones Grid */}
        <div className="mb-16">
          <h2 className="font-display text-3xl font-bold text-navy mb-6">Industrial Parks & SEZ Investment Zones</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {site.investmentZones.map((zone) => (
              <div key={zone.id} className="rounded-3xl border border-line bg-white p-8 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-line pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-dark">{zone.state}</span>
                    <h3 className="font-display text-2xl font-bold text-navy mt-1">{zone.name}</h3>
                  </div>
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-bold text-gold-label border border-gold/30">
                    {zone.area}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-bold text-navy mb-2 uppercase tracking-wider">Priority Sectors:</div>
                  <div className="flex flex-wrap gap-2">
                    {zone.focusIndustries.map((ind) => (
                      <span key={ind} className="rounded-lg bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy">
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-navy">Incentives & Clearances:</div>
                  <ul className="list-disc list-inside space-y-1 text-muted">
                    {zone.incentives.map((inc) => (
                      <li key={inc}>{inc}</li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/contact?intent=invest&zone=${zone.id}`}
                  className="inline-flex items-center justify-center w-full rounded-2xl bg-navy py-3.5 text-xs font-bold text-white hover:bg-navy-light transition-colors"
                >
                  Schedule Investor Briefing with State Cell →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
