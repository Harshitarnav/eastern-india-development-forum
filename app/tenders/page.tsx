"use client";

import React, { useState } from "react";
import { site } from "@/content/site";
import { Search, Download, ShieldCheck, ArrowRight, FileText, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function TendersPage() {
  const [filterState, setFilterState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredTenders = site.tenders.filter((tnd) => {
    const matchState = filterState === "All" || tnd.state === filterState;
    const matchQuery =
      tnd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tnd.tenderNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchQuery;
  });

  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 rounded-3xl border border-line bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white p-8 md:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            PUBLIC PROCUREMENT & ASSISTANCE DESK
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Tender Assistance Center
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Access verified public sector RFPs, civil construction contracts, renewable energy installations, and vocational empanelments across Bihar, Jharkhand, Odisha, West Bengal, and Assam.
          </p>

          {/* Search & Filter Controls */}
          <div className="pt-4 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tender title or reference number..."
                className="w-full rounded-full border border-white/20 bg-white/10 pl-11 pr-4 py-3 text-xs text-white placeholder-white/40 focus:border-gold focus:outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {["All", "Bihar", "Jharkhand", "Odisha"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterState(st)}
                  className={`rounded-full px-4 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    filterState === st
                      ? "bg-gold text-navy-deep shadow-md"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tender Listing Cards */}
        <div className="space-y-6">
          {filteredTenders.map((tnd) => (
            <div
              key={tnd.id}
              className="rounded-3xl border border-line bg-white p-6 shadow-md hover:shadow-xl transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-gold-label bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                    {tnd.tenderNo}
                  </span>
                  <span className="text-[11px] font-bold text-emerald-dark bg-emerald/10 px-3 py-1 rounded-full border border-emerald/20">
                    {tnd.status}
                  </span>
                  <span className="text-[11px] text-muted font-semibold">{tnd.state}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-navy">{tnd.title}</h3>
                <div className="text-xs text-muted">
                  Issuing Authority: <span className="font-bold text-navy">{tnd.issuingAuthority}</span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs pt-2">
                  <div>
                    Estimated Value: <span className="font-bold text-emerald-dark">{tnd.estimatedCost}</span>
                  </div>
                  <div>
                    Published: <span className="font-bold text-navy">{tnd.publishedDate}</span>
                  </div>
                  <div>
                    Closing Date: <span className="font-bold text-amber">{tnd.closingDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
                <Link
                  href="/contact?intent=tender_guidance"
                  className="w-full sm:w-auto text-center rounded-2xl bg-navy px-6 py-3 text-xs font-bold text-white hover:bg-navy-light transition-colors"
                >
                  Request Guidance Desk
                </Link>
                <a
                  href={tnd.docLink}
                  download
                  className="w-full sm:w-auto text-center rounded-2xl border border-navy/20 bg-cream px-5 py-3 text-xs font-bold text-navy hover:bg-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="h-4 w-4" /> Download RFP
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
