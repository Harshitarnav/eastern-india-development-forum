"use client";

import React from "react";
import { site } from "@/content/site";
import { Award, ShieldCheck, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SchemesPage() {
  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 rounded-3xl border border-line bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white p-8 md:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            STATE & CENTRAL POLICY DIRECTORY
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Government Schemes & Subsidies
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Discover fiscal incentives, capital interest subvention, stamp duty waivers, and innovation seed grants available across Bihar, Jharkhand, Odisha, West Bengal, and Assam.
          </p>
        </div>

        {/* Schemes Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {site.schemes.map((sch) => (
            <div key={sch.id} className="rounded-3xl border border-line bg-white p-8 shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-dark bg-emerald/10 px-3 py-1 rounded-full border border-emerald/20">
                  {sch.category}
                </span>
                <h3 className="font-display text-2xl font-bold text-navy mt-4 mb-2">{sch.title}</h3>
                <div className="text-xs font-semibold text-navy/70 mb-4">{sch.authority}</div>

                <div className="p-4 rounded-2xl bg-gold/10 border border-gold/30 text-xs font-semibold text-navy-deep mb-4">
                  Benefits: {sch.benefits}
                </div>

                <div className="text-xs space-y-2 text-muted mb-6">
                  <div className="font-bold text-navy">Eligibility Criteria:</div>
                  <ul className="space-y-1">
                    {sch.eligibility.map((el) => (
                      <li key={el} className="flex items-center gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald shrink-0" /> {el}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href="/contact?intent=scheme_assistance"
                className="inline-flex items-center justify-center rounded-2xl bg-navy py-3.5 text-xs font-bold text-white hover:bg-navy-light transition-colors"
              >
                Apply via Single Window Portal →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
