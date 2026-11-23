"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, FileText, Search } from "lucide-react";
import { usePublicSite } from "@/lib/cms/public-provider";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { DEFAULT_PAGES } from "@/lib/cms/page-settings";

export default function TendersPage() {
  const site = usePublicSite();
  const page = site.pages?.tenders || DEFAULT_PAGES.tenders;
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
        crumb={page.crumb}
        title={page.title}
        description={page.description}
      />

      <section className="border-b border-line bg-white px-4 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={page.searchPlaceholder || "Search by title or reference number..."}
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
            eyebrow={page.sectionEyebrow}
            title={`${filteredTenders.length} open notice${filteredTenders.length === 1 ? "" : "s"}`}
            align="left"
          />

          {filteredTenders.length === 0 ? (
            <div className="border border-dashed border-line py-16 text-center">
              <FileText className="mx-auto mb-3 h-10 w-10 text-gold" />
              <h3 className="font-display text-lg font-bold text-navy">{page.emptyTitle}</h3>
              <p className="mt-1 text-sm text-muted">{page.emptyDescription}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTenders.map((tnd) => (
                <article
                  key={tnd.id}
                  className="overflow-hidden rounded-2xl border border-line bg-white shadow-[0_18px_40px_-32px_rgba(8,19,31,0.35)]"
                >
                  <div className="grid lg:grid-cols-12">
                    <div className="p-5 sm:p-6 lg:col-span-7">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              tnd.status === "Open"
                                ? "bg-emerald"
                                : tnd.status === "Closing Soon"
                                  ? "bg-amber"
                                  : "bg-gold"
                            }`}
                            aria-hidden
                          />
                          {tnd.status}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-label">
                          {tnd.category}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-navy">
                        {tnd.title}
                      </h3>
                      <p className="mt-2 font-mono text-xs font-bold text-gold-label">
                        {tnd.tenderNo}
                      </p>
                      <p className="mt-3 text-sm text-muted">
                        {tnd.issuingAuthority}
                        {tnd.state ? ` · ${tnd.state}` : ""}
                      </p>
                    </div>

                    <div className="border-t border-line bg-cream-warm/50 p-5 sm:p-6 lg:col-span-5 lg:border-l lg:border-t-0">
                      <dl className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-label">
                            Value
                          </dt>
                          <dd className="mt-1 font-semibold text-navy">
                            {tnd.estimatedCost || "—"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-label">
                            State
                          </dt>
                          <dd className="mt-1 font-semibold text-navy">
                            {tnd.state || "—"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-label">
                            Published
                          </dt>
                          <dd className="mt-1 font-semibold text-navy">
                            {tnd.publishedDate || "—"}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-gold-label">
                            Closes
                          </dt>
                          <dd className="mt-1 font-semibold text-amber">
                            {tnd.closingDate || "—"}
                          </dd>
                        </div>
                      </dl>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          href="/contact?intent=tender_guidance"
                          className="text-xs font-bold text-navy hover:text-gold"
                        >
                          {page.itemCtaLabel || "Guidance"} →
                        </Link>
                        <a
                          href={docHref(tnd)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-muted hover:text-navy"
                        >
                          <Download className="h-3.5 w-3.5" />
                          Request documents
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CtaBand
        title={page.ctaTitle}
        description={page.ctaDescription}
        primary={{ label: page.ctaPrimaryLabel, href: page.ctaPrimaryHref }}
        secondary={{ label: page.ctaSecondaryLabel, href: page.ctaSecondaryHref }}
      />
    </>
  );
}
