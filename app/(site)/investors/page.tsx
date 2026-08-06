import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";
import { DEFAULT_INVESTORS_PAGE } from "@/lib/cms/types";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/investors", { title: "Investor Opportunities" });
}

export default async function InvestorsPage() {
  const { site } = await getPublicCmsBundle();
  const page = site.investorsPage || DEFAULT_INVESTORS_PAGE;

  return (
    <>
      <PageHero
        crumb="Home / Investors"
        title={page.heroTitle}
        description={page.heroDescription}
      >
        <Link href={page.primaryCtaHref} className="btn-primary">
          {page.primaryCtaLabel}
        </Link>
        <Link href={page.secondaryCtaHref} className="btn-secondary">
          {page.secondaryCtaLabel}
        </Link>
      </PageHero>

      <section className="metric-strip grid-cols-3">
        <div>
          <div className="font-display text-2xl font-extrabold text-navy">
            {page.pledgedValue}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {page.pledgedLabel}
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold text-emerald-dark">
            {site.investmentZones.length}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {page.zonesLabel}
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold text-navy">
            {page.statesValue}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {page.statesLabel}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={page.sectionEyebrow}
            title={page.sectionTitle}
            align="left"
          />

          <div className="divide-y divide-line border-y border-line">
            {site.investmentZones.map((zone) => {
              const sectors = zone.focusIndustries || [];
              const incentives = zone.incentives || [];
              return (
                <article
                  key={zone.id}
                  className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10"
                >
                  <div className="lg:col-span-4">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                      {zone.state}
                      {zone.area ? ` · ${zone.area}` : ""}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-navy">
                      {zone.name}
                    </h3>
                    {zone.location && (
                      <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                        <MapPin className="h-3.5 w-3.5 text-emerald" />{" "}
                        {zone.location}
                      </div>
                    )}
                    {zone.pppModel && (
                      <div className="mt-4 text-sm">
                        <span className="font-bold text-navy">
                          {page.pppModelLabel}:{" "}
                        </span>
                        <span className="text-muted">{zone.pppModel}</span>
                      </div>
                    )}
                    {zone.contactEmail && (
                      <a
                        href={`mailto:${zone.contactEmail}`}
                        className="mt-3 inline-block text-sm font-semibold text-navy hover:text-gold"
                      >
                        {zone.contactEmail}
                      </a>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    {sectors.length > 0 && (
                      <>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                          {page.prioritySectorsLabel}
                        </div>
                        <div className="flex flex-wrap gap-2 mb-5">
                          {sectors.map((ind) => (
                            <span
                              key={ind}
                              className="border border-line bg-cream px-2.5 py-1 text-xs font-semibold text-navy"
                            >
                              {ind}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                    {incentives.length > 0 && (
                      <>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                          {page.incentivesLabel}
                        </div>
                        <ul className="space-y-1.5">
                          {incentives.map((inc) => (
                            <li
                              key={inc}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="lg:col-span-3 flex lg:justify-end lg:items-start">
                    <Link
                      href={`/contact?intent=invest&zone=${zone.id}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
                    >
                      {page.briefingCtaLabel} <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title={page.ctaTitle}
        description={page.ctaDescription}
        primary={{ label: page.ctaPrimaryLabel, href: page.ctaPrimaryHref }}
        secondary={{
          label: page.ctaSecondaryLabel,
          href: page.ctaSecondaryHref,
        }}
      />
    </>
  );
}
