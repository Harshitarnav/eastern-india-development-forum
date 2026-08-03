"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, FileText, Search } from "lucide-react";
import { site } from "@/content/site";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

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
    <>
      <PageHero
        crumb="Home / Tenders"
        eyebrow="Public Procurement & Assistance Desk"
        title="Tender Assistance Center"
        description="Access verified public sector RFPs, civil construction contracts, renewable energy installations, and vocational empanelments across Bihar, Jharkhand, Odisha, West Bengal, and Assam."
      />

      <section className="relative z-10 -mt-8 px-4 pb-6 md:-mt-10">
        <div className="mx-auto max-w-7xl rounded-3xl border border-line bg-white/95 p-5 shadow-2xl backdrop-blur-xl md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by tender title or reference number..."
                className="w-full rounded-full border border-line bg-cream py-3 pr-4 pl-11 text-xs text-navy placeholder-muted outline-none focus:border-gold focus:bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Bihar", "Jharkhand", "Odisha"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterState(st)}
                  className={`cursor-pointer rounded-full px-4 py-2.5 text-xs font-bold transition-all ${
                    filterState === st
                      ? "bg-navy text-gold shadow-md"
                      : "bg-cream text-muted hover:bg-cream-warm hover:text-navy"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Open Opportunities"
            title={`${filteredTenders.length} tender${filteredTenders.length === 1 ? "" : "s"} matching your filters`}
            align="left"
          />

          <div className="space-y-5">
            {filteredTenders.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-white py-16 text-center">
                <FileText className="mx-auto mb-3 h-10 w-10 text-gold" />
                <h3 className="font-display text-lg font-bold text-navy">No tenders found</h3>
                <p className="mt-1 text-xs text-muted">
                  Try adjusting your state filter or search keywords.
                </p>
              </div>
            ) : (
              filteredTenders.map((tnd) => (
                <div
                  key={tnd.id}
                  className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-white p-6 shadow-md transition-all hover:border-gold/30 hover:shadow-xl lg:flex-row lg:items-center"
                >
                  <div className="max-w-3xl space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 font-mono text-[11px] font-bold text-gold">
                        {tnd.tenderNo}
                      </span>
                      <span className="rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] font-bold text-emerald-dark">
                        {tnd.status}
                      </span>
                      <span className="text-[11px] font-semibold text-muted">{tnd.state}</span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-navy">{tnd.title}</h3>
                    <div className="text-xs text-muted">
                      Issuing Authority:{" "}
                      <span className="font-bold text-navy">{tnd.issuingAuthority}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 pt-1 text-xs">
                      <div>
                        Estimated Value:{" "}
                        <span className="font-bold text-emerald-dark">{tnd.estimatedCost}</span>
                      </div>
                      <div>
                        Published:{" "}
                        <span className="font-bold text-navy">{tnd.publishedDate}</span>
                      </div>
                      <div>
                        Closing Date:{" "}
                        <span className="font-bold text-amber">{tnd.closingDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full flex-col items-center gap-3 sm:flex-row lg:w-auto">
                    <Link
                      href="/contact?intent=tender_guidance"
                      className="w-full rounded-2xl bg-navy px-6 py-3 text-center text-xs font-bold text-white transition-colors hover:bg-navy-light sm:w-auto"
                    >
                      Request Guidance Desk
                    </Link>
                    <a
                      href={tnd.docLink}
                      download
                      className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-navy/15 bg-cream px-5 py-3 text-xs font-bold text-navy transition-colors hover:bg-white sm:w-auto"
                    >
                      <Download className="h-4 w-4" /> Download RFP
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need bid preparation support?"
        description="EIDF's tender desk helps with documentation, consortium formation, and compliance readiness."
        primary={{ label: "Request Guidance", href: "/contact?intent=tender_guidance" }}
        secondary={{ label: "View Schemes", href: "/schemes" }}
      />
    </>
  );
}
