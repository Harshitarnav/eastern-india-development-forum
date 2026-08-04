import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { site } from "@/content/site";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        crumb="Home / Resources"
        title="Knowledge Center"
        description="Research reports, macroeconomic assessments, and state policy frameworks for investors and partners."
      >
        <Link href="/analytics" className="btn-primary">
          View Analytics
        </Link>
        <Link href="/schemes" className="btn-secondary">
          Browse Schemes
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Publications"
            title="Research you can act on"
            align="left"
          />

          <div className="divide-y divide-line border-y border-line">
            {site.reports.map((rep) => (
              <article
                key={rep.id}
                className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-widest">
                    <span className="text-gold-label">{rep.category}</span>
                    <span className="text-muted normal-case tracking-normal font-medium">
                      {rep.date} · {rep.fileSize}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-navy md:text-2xl">
                    {rep.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted max-w-2xl">
                    {rep.summary}
                  </p>
                  <div className="mt-2 text-xs font-semibold text-navy/70">
                    {rep.author}
                  </div>
                </div>
                <a
                  href={rep.downloadUrl}
                  className="inline-flex shrink-0 items-center gap-2 border border-navy bg-navy px-5 py-3 text-xs font-bold text-white hover:bg-navy-light transition-colors self-start"
                >
                  <Download className="h-4 w-4 text-gold" /> Download PDF
                </a>
              </article>
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
