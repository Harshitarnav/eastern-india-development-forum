"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle, MapPin, TrendingUp } from "lucide-react";
import { site } from "@/content/site";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Investors"
        eyebrow="Global Capital & PPP Portal"
        title="Eastern India Investor Opportunities"
        description="Facilitating Foreign Direct Investment (FDI), Domestic Capital Allocation, and Public-Private Partnerships across Industrial Parks, Special Economic Zones, and Logistics Corridors."
      >
        <Link
          href="/proposals/submit"
          className="rounded-full bg-gold px-8 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          Submit Investment Inquiry
        </Link>
        <Link
          href="/analytics"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          View Analytics & Yield Maps
        </Link>
      </PageHero>

      {/* Stats strip */}
      <section className="relative z-10 -mt-8 px-4 md:-mt-10">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-3">
          {[
            { label: "Pledged Capital", value: "₹25,000 Cr+", icon: TrendingUp },
            { label: "Active Investment Zones", value: String(site.investmentZones.length), icon: Building2 },
            { label: "Focus States & UTs", value: "8+", icon: MapPin },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-3xl border border-line bg-white/95 p-5 shadow-xl backdrop-blur-xl"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-display text-xl font-extrabold text-navy">{stat.value}</div>
                <div className="text-xs font-semibold text-muted">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Investment Zones"
            title="Industrial Parks & SEZ Opportunities"
            description="Priority corridors with clear incentives, land readiness, and state-cell facilitation."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {site.investmentZones.map((zone) => (
              <div
                key={zone.id}
                className="group space-y-6 rounded-3xl border border-line bg-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-dark">
                      {zone.state}
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold text-navy">
                      {zone.name}
                    </h3>
                    {zone.location && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-muted">
                        <MapPin className="h-3.5 w-3.5 text-emerald" /> {zone.location}
                      </div>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold text-gold">
                    {zone.area}
                  </span>
                </div>

                <div>
                  <div className="mb-2 text-xs font-bold uppercase tracking-wider text-navy">
                    Priority Sectors
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {zone.focusIndustries.map((ind) => (
                      <span
                        key={ind}
                        className="rounded-lg bg-navy/5 px-2.5 py-1 text-xs font-semibold text-navy"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-navy">Incentives & Clearances</div>
                  <ul className="space-y-2 text-muted">
                    {zone.incentives.map((inc) => (
                      <li key={inc} className="flex items-start gap-2">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {zone.pppModel && (
                  <div className="rounded-2xl border border-line bg-cream p-4 text-xs">
                    <span className="font-bold text-navy">PPP Model: </span>
                    <span className="text-muted">{zone.pppModel}</span>
                  </div>
                )}

                <Link
                  href={`/contact?intent=invest&zone=${zone.id}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-navy py-3.5 text-xs font-bold text-white transition-colors hover:bg-navy-light"
                >
                  Schedule Investor Briefing with State Cell
                  <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Looking for a tailored investment briefing?"
        description="Submit your capital thesis and sector focus — EIDF will connect you with the right state cell."
        primary={{ label: "Submit Investment Inquiry", href: "/proposals/submit" }}
        secondary={{ label: "Contact Investor Desk", href: "/contact?intent=invest" }}
      />
    </>
  );
}
