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
        title="Tender Assistance Center"
        description="Verified public-sector RFPs and procurement opportunities across Bihar, Jharkhand, Odisha, West Bengal, and Assam."
      />

      <section className="border-b border-line bg-white px-4 py-5">
        <div className="mx-auto max-w-7xl flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or reference number..."
              className="w-full border border-line bg-cream py-3 pr-4 pl-10 text-sm text-navy outline-none focus:border-gold focus:bg-white"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {["All", "Bihar", "Jharkhand", "Odisha"].map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                className={`cursor-pointer px-4 py-2.5 text-xs font-bold transition-colors ${
                  filterState === st
                    ? "bg-navy text-gold"
                    : "bg-cream text-muted hover:text-navy"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Open Opportunities"
            title={`${filteredTenders.length} tender${filteredTenders.length === 1 ? "" : "s"}`}
            align="left"
          />

          {filteredTenders.length === 0 ? (
            <div className="border border-dashed border-line py-16 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-gold" />
              <h3 className="font-display text-lg font-bold text-navy">No tenders found</h3>
              <p className="mt-1 text-sm text-muted">Try adjusting filters or search keywords.</p>
            </div>
          ) : (
            <>
              {/* Desktop table */}
              <div className="hidden md:block overflow-x-auto border border-line">
                <table className="w-full text-left text-sm">
                  <thead className="bg-navy text-white text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-4 font-semibold">Ref</th>
                      <th className="p-4 font-semibold">Title</th>
                      <th className="p-4 font-semibold">Authority</th>
                      <th className="p-4 font-semibold">State</th>
                      <th className="p-4 font-semibold">Value</th>
                      <th className="p-4 font-semibold">Closes</th>
                      <th className="p-4 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line bg-white">
                    {filteredTenders.map((tnd) => (
                      <tr key={tnd.id} className="hover:bg-cream/80 transition-colors">
                        <td className="p-4 font-mono text-xs font-bold text-gold-label whitespace-nowrap">
                          {tnd.tenderNo}
                        </td>
                        <td className="p-4 font-semibold text-navy max-w-xs">{tnd.title}</td>
                        <td className="p-4 text-muted text-xs">{tnd.issuingAuthority}</td>
                        <td className="p-4 text-xs">{tnd.state}</td>
                        <td className="p-4 font-bold text-emerald-dark text-xs whitespace-nowrap">
                          {tnd.estimatedCost}
                        </td>
                        <td className="p-4 font-bold text-amber text-xs whitespace-nowrap">
                          {tnd.closingDate}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Link
                              href="/contact?intent=tender_guidance"
                              className="text-xs font-bold text-navy hover:text-gold"
                            >
                              Guidance
                            </Link>
                            <a href={tnd.docLink} className="text-muted hover:text-navy" aria-label="Download">
                              <Download className="h-4 w-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile list */}
              <div className="md:hidden divide-y divide-line border-y border-line">
                {filteredTenders.map((tnd) => (
                  <div key={tnd.id} className="py-5 space-y-2">
                    <div className="font-mono text-[11px] font-bold text-gold-label">{tnd.tenderNo}</div>
                    <h3 className="font-display text-base font-bold text-navy">{tnd.title}</h3>
                    <div className="text-xs text-muted">{tnd.issuingAuthority} · {tnd.state}</div>
                    <div className="flex justify-between text-xs pt-1">
                      <span className="font-bold text-emerald-dark">{tnd.estimatedCost}</span>
                      <span className="font-bold text-amber">Closes {tnd.closingDate}</span>
                    </div>
                    <Link
                      href="/contact?intent=tender_guidance"
                      className="inline-block mt-2 text-xs font-bold text-navy hover:text-gold"
                    >
                      Request guidance →
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
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
