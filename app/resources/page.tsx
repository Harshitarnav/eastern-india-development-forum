"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Download, FileText } from "lucide-react";
import { site } from "@/content/site";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

const categoryIcons: Record<string, React.ReactNode> = {
  Policy: <FileText className="h-5 w-5" />,
  Whitepaper: <BookOpen className="h-5 w-5" />,
  "Annual Report": <FileText className="h-5 w-5" />,
  "Case Study": <BookOpen className="h-5 w-5" />,
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumb="Home / Resources"
        eyebrow="EIDF Policy Research & Whitepapers"
        title="Knowledge Center & Resource Library"
        description="Download authoritative research reports, macroeconomic assessments, freight basin blueprints, and state policy frameworks."
      >
        <Link
          href="/analytics"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          View Analytics Dashboard
        </Link>
        <Link
          href="/schemes"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Browse Schemes
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Publications"
            title="Research you can act on"
            description="Policy briefs and whitepapers produced for investors, governments, and development partners."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {site.reports.map((rep) => (
              <div
                key={rep.id}
                className="group flex flex-col justify-between space-y-6 rounded-3xl border border-line bg-white p-8 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                        {categoryIcons[rep.category] || <FileText className="h-5 w-5" />}
                      </div>
                      <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold">
                        {rep.category}
                      </span>
                    </div>
                    <span className="shrink-0 text-xs text-muted">
                      {rep.date} · {rep.fileSize}
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-2xl font-bold text-navy">
                    {rep.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{rep.summary}</p>
                  <div className="text-xs font-semibold text-navy">Author: {rep.author}</div>
                </div>

                <a
                  href={rep.downloadUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy py-3.5 text-xs font-bold text-white shadow-md transition-colors hover:bg-gold hover:text-navy-deep"
                >
                  <Download className="h-4 w-4" /> Download PDF Report ({rep.fileSize})
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Need a custom brief for your state or sector?"
        description="Request a tailored research note from the EIDF knowledge desk."
        primary={{ label: "Request a Briefing", href: "/contact" }}
        secondary={{ label: "Join as Member", href: "/membership" }}
      />
    </>
  );
}
