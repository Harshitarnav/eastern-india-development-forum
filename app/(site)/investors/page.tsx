import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle, MapPin } from "lucide-react";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";
import { DEFAULT_INVESTORS_PAGE } from "@/lib/cms/types";
import { matchesStateFilter, stateDisplayName } from "@/lib/state-filter";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/investors", { title: "Investor Opportunities" });
}

export default async function InvestorsPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { site } = await getPublicCmsBundle();
  const page = site.investorsPage || DEFAULT_INVESTORS_PAGE;
  const params = await searchParams;
  const stateFilter = params.state;
  const stateLabel = stateDisplayName(stateFilter);

  const zones = site.investmentZones.filter((zone) =>
    matchesStateFilter(zone.state, stateFilter)
  );

  return (
    <>
      <PageHero
        crumb="Home / Investors"
        title={page.heroTitle}
        description={
          stateLabel
            ? `Investment zones and PPP opportunities focused on ${stateLabel}.`
            : page.heroDescription
        }
        eyebrow={stateLabel ? `Filtered · ${stateLabel}` : undefined}
      >
        <Link href={page.primaryCtaHref} className="btn-primary">
          {page.primaryCtaLabel}
        </Link>
        <Link href={page.secondaryCtaHref} className="btn-secondary">
          {page.secondaryCtaLabel}
        </Link>
        {stateFilter && (
          <Link href="/investors" className="btn-secondary">
            Clear filter
          </Link>
        )}
      </PageHero>

      <section className="metric-strip grid-cols-3">
        <div>
          <div className="font-display text-2xl font-extrabold text-navy md:text-3xl">
            {page.pledgedValue}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {page.pledgedLabel}
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold text-emerald-dark md:text-3xl">
            {zones.length}
          </div>
          <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
            {page.zonesLabel}
          </div>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold text-navy md:text-3xl">
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
            title={
              stateLabel
                ? `Zones in ${stateLabel}`
                : page.sectionTitle
            }
            align="left"
          />

          {zones.length === 0 ? (
            <div className="border border-line bg-white px-6 py-12 text-center">
              <p className="text-sm text-muted">
                No investment zones matched this state filter.
              </p>
              <Link href="/investors" className="mt-4 inline-flex text-sm font-bold text-navy hover:text-gold">
                View all zones →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-line border-y border-line">
              {zones.map((zone) => {
                const sectors = zone.focusIndustries || [];
                const incentives = zone.incentives || [];
                return (
                  <article
                    key={zone.id}
                    id={`zone-${zone.id}`}
                    className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10"
                    style={{ scrollMarginTop: "6rem" }}
                  >
                    <div className="lg:col-span-4">
                      <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
                        {zone.state}
                        {zone.area ? ` · ${zone.area}` : ""}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy">
                        {zone.name}
                      </h3>
                      {zone.location && (
                        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                          <MapPin className="h-3.5 w-3.5 text-emerald" /> {zone.location}
                        </div>
                      )}
                      {zone.pppModel && (
                        <div className="mt-4 border-l-2 border-gold/50 pl-3 text-sm">
                          <span className="font-bold text-navy">{page.pppModelLabel}: </span>
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
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted">
                            {page.prioritySectorsLabel}
                          </div>
                          <div className="mb-5 flex flex-wrap gap-2">
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
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted">
                            {page.incentivesLabel}
                          </div>
                          <ul className="space-y-2">
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

                    <div className="flex lg:col-span-3 lg:items-start lg:justify-end">
                      <Link
                        href={`/contact?intent=invest&zone=${zone.id}`}
                        className="inline-flex items-center gap-2 border-b border-navy/20 pb-0.5 text-sm font-bold text-navy transition-colors hover:border-gold hover:text-gold"
                      >
                        {page.briefingCtaLabel} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
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
