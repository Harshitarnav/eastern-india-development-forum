"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { ResearchReport } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type ResourcesSectionProps = {
  reports: ResearchReport[];
  chrome: CmsHomepageSectionCopy;
};

const coverTone = [
  "from-navy to-navy-deep",
  "from-slate-dark to-navy",
  "from-navy-deep to-emerald-dark",
];

export function ResourcesSection({ reports, chrome }: ResourcesSectionProps) {
  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
          <ClipReveal direction="up">
            <SectionHeader
              eyebrow={chrome.eyebrow}
              title={chrome.title}
              align="left"
              className="!mb-0"
            />
          </ClipReveal>
          {chrome.ctaLabel && (
            <ClipReveal direction="right" className="shrink-0">
              <Link
                href={chrome.ctaHref || "/resources"}
                className="text-xs font-bold text-navy hover:text-gold"
              >
                {chrome.ctaLabel}
              </Link>
            </ClipReveal>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reports.map((rep, i) => (
            <ClipReveal key={rep.id} direction="scale" delay={0.06 * i}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(10,31,61,0.03)] transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/30 hover:shadow-[0_20px_40px_-20px_rgba(10,31,61,0.22)]">
                <div
                  className={`relative flex min-h-[160px] items-end bg-gradient-to-br ${coverTone[i % coverTone.length]} p-5 text-white`}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-20 eidf-grain" />
                  <div className="relative">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gold">
                      {rep.category}
                    </div>
                    <h4 className="mt-2 font-display text-lg font-bold leading-snug">
                      {rep.title}
                    </h4>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <div>
                    <div className="text-[11px] text-muted">
                      {rep.author} · {rep.date}
                      {rep.fileSize ? ` · ${rep.fileSize}` : ""}
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">
                      {rep.summary}
                    </p>
                  </div>
                  <a
                    href={rep.downloadUrl}
                    className="inline-flex items-center gap-2 self-start rounded-lg border border-navy bg-navy px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-navy-light"
                    data-cursor="VIEW"
                  >
                    <Download className="h-3.5 w-3.5 text-gold" />
                    {rep.downloadUrl?.includes("/contact") ? "Request" : "PDF"}
                  </a>
                </div>
              </article>
            </ClipReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
