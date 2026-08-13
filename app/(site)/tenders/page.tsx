"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, FileText, Search } from "lucide-react";
import { usePublicSite } from "@/lib/cms/public-provider";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export default function TendersPage() {
  const site = usePublicSite();
  const [filterState, setFilterState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const stateFilters = [
    "All",
    ...Array.from(new Set(site.tenders.map((t) => t.state).filter(Boolean))).sort(),
  ];

  const filteredTenders = site.tenders.filter((tnd) => {
    const matchState = filterState === "All" || tnd.state === filterState;
    const matchQuery =
      tnd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tnd.tenderNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchState && matchQuery;
  });

  function docHref(tnd: (typeof site.tenders)[number]) {
    const link = tnd.docLink || "";
    if (!link || link.startsWith("#") || link.includes("/docs/tenders/")) {
      return `/contact?intent=tender_guidance&ref=${encodeURIComponent(tnd.tenderNo)}`;
    }
    return link;
  }

  return (
    <>
      <PageHero
        crumb="Home / Tenders"
        title="Tender Assistance Center"
        description="Verified public-sector RFPs and procurement opportunities across Bihar, Jharkhand, Odisha, West Bengal, and Assam."
      />

      <section className="border-b border-line bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or reference number..."
              className="w-full border border-line bg-cream py-3 pr-4 pl-10 text-sm text-navy outline-none transition focus:border-gold focus:bg-white focus:ring-2 focus:ring-gold/15"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {stateFilters.map((st) => (
              <button
                key={st}
                onClick={() => setFilterState(st)}
                className={`cursor-pointer border px-3.5 py-2 text-xs font-bold transition-colors ${
                  filterState === st
                    ? "border-navy bg-navy text-gold"
                    : "border-line bg-cream text-muted hover:border-navy/30 hover:text-navy"
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
              <div className="hidden overflow-x-auto border border-line md:block">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-navy text-[11px] uppercase tracking-wider text-white">
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
                      <tr key={tnd.id} className="transition-colors hover:bg-cream/80">
                        <td className="whitespace-nowrap p-4 font-mono text-xs font-bold text-gold-label">
                          {tnd.tenderNo}
                        </td>
                        <td className="max-w-xs p-4 font-semibold text-navy">{tnd.title}</td>
                        <td className="p-4 text-xs text-muted">{tnd.issuingAuthority}</td>
                        <td className="p-4 text-xs">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
                            {tnd.state}
                          </span>
                        </td>
                        <td className="whitespace-nowrap p-4 text-xs font-bold text-emerald-dark">
                          {tnd.estimatedCost}
                        </td>
                        <td className="whitespace-nowrap p-4 text-xs font-bold text-amber">
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
                            <a
                              href={docHref(tnd)}
                              className="text-muted hover:text-navy"
                              aria-label="Request tender documents"
                              title="Request documents"
                            >
                              <Download className="h-4 w-4" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-line border-y border-line md:hidden">
                {filteredTenders.map((tnd) => (
                  <div key={tnd.id} className="space-y-2 py-5">
                    <div className="font-mono text-[11px] font-bold text-gold-label">
                      {tnd.tenderNo}
                    </div>
                    <h3 className="font-display text-base font-bold text-navy">{tnd.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
                      {tnd.issuingAuthority} · {tnd.state}
                    </div>
                    <div className="flex justify-between pt-1 text-xs">
                      <span className="font-bold text-emerald-dark">{tnd.estimatedCost}</span>
                      <span className="font-bold text-amber">Closes {tnd.closingDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <Link
                        href="/contact?intent=tender_guidance"
                        className="inline-block text-xs font-bold text-navy hover:text-gold"
                      >
                        Request guidance →
                      </Link>
                      <a
                        href={docHref(tnd)}
                        className="inline-block text-xs font-bold text-muted hover:text-navy"
                      >
                        Request documents →
                      </a>
                    </div>
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
