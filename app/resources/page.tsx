"use client";

import React from "react";
import { site } from "@/content/site";
import { Download, FileText, Briefcase, BookOpen } from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-cream py-16 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 rounded-3xl border border-line bg-gradient-to-br from-navy-deep via-navy to-slate-dark text-white p-8 md:p-12 shadow-2xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            EIDF POLICY RESEARCH & WHITEPAPERS
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white">
            Knowledge Center & Resource Library
          </h1>
          <p className="text-sm text-white/80 max-w-2xl leading-relaxed">
            Download authoritative research reports, macroeconomic assessments, freight basin blueprints, and state policy frameworks.
          </p>
        </div>

        {/* Reports Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {site.reports.map((rep) => (
            <div key={rep.id} className="rounded-3xl border border-line bg-white p-8 shadow-xl flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/30">
                    {rep.category}
                  </span>
                  <span className="text-xs text-muted">{rep.date} · {rep.fileSize}</span>
                </div>

                <h3 className="font-display text-2xl font-bold text-navy mb-2">{rep.title}</h3>
                <p className="text-xs text-muted leading-relaxed mb-4">{rep.summary}</p>
                <div className="text-xs font-semibold text-navy">Author: {rep.author}</div>
              </div>

              <a
                href={rep.downloadUrl}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy py-3.5 text-xs font-bold text-white hover:bg-gold hover:text-navy-deep transition-colors shadow-md"
              >
                <Download className="h-4 w-4" /> Download PDF Report ({rep.fileSize})
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
