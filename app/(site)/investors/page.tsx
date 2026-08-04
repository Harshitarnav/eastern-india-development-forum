import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Investors" };

export default async function InvestorsPage() {
  const { site } = await getPublicCmsBundle();
  return (
    <>
      <PageHero
        crumb="Home / Investors"
        title="Investor Opportunities"
        description="FDI, domestic capital, and PPP facilitation across industrial parks, SEZs, and logistics corridors in Eastern India."
      >
        <Link href="/proposals/submit" className="btn-primary">
          Submit Investment Inquiry
        </Link>
        <Link href="/analytics" className="btn-secondary">
          View Analytics
        </Link>
      </PageHero>

      <section className="metric-strip grid-cols-3">
        <div>
          <div className="font-display text-2xl font-extrabold text-navy">₹25,000 Cr+</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">Pledged Capital</div>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold text-emerald-dark">{site.investmentZones.length}</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">Investment Zones</div>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold text-navy">8+</div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">States & UTs</div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Investment Zones"
            title="Industrial parks & SEZ opportunities"
            align="left"
          />

          <div className="divide-y divide-line border-y border-line">
            {site.investmentZones.map((zone) => (
              <article key={zone.id} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                    {zone.state} · {zone.area}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy">{zone.name}</h3>
                  {zone.location && (
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                      <MapPin className="h-3.5 w-3.5 text-emerald" /> {zone.location}
                    </div>
                  )}
                  {zone.pppModel && (
                    <div className="mt-4 text-sm">
                      <span className="font-bold text-navy">PPP Model: </span>
                      <span className="text-muted">{zone.pppModel}</span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                    Priority sectors
                  </div>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {zone.focusIndustries.map((ind) => (
                      <span key={ind} className="border border-line bg-cream px-2.5 py-1 text-xs font-semibold text-navy">
                        {ind}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                    Incentives
                  </div>
                  <ul className="space-y-1.5">
                    {zone.incentives.map((inc) => (
                      <li key={inc} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                        {inc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end lg:items-start">
                  <Link
                    href={`/contact?intent=invest&zone=${zone.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
                  >
                    Schedule briefing <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Looking for a tailored investment briefing?"
        description="Submit your capital thesis and sector focus — EIDF will connect you with the right state cell."
        primary={{ label: "Submit Investment Inquiry", href: "/proposals/submit" }}
        secondary={{ label: "Contact Investor Desk", href: "/contact?intent=invest" }}
      />
    </>
  );
}
