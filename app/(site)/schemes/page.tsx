import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";
import { matchesStateFilter, stateDisplayName } from "@/lib/state-filter";
import { DEFAULT_PAGES } from "@/lib/cms/page-settings";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/schemes", { title: "Government Schemes" });
}

export default async function SchemesPage({
  searchParams,
}: {
  searchParams: Promise<{ state?: string }>;
}) {
  const { site } = await getPublicCmsBundle();
  const page = site.pages?.schemes || DEFAULT_PAGES.schemes;
  const params = await searchParams;
  const stateFilter = params.state;
  const stateLabel = stateDisplayName(stateFilter);

  const schemes = site.schemes.filter(
    (sch) =>
      matchesStateFilter(sch.state, stateFilter) ||
      (!!stateFilter &&
        /all eastern|pan.?india|multiple/i.test(sch.state || ""))
  );

  return (
    <>
      <PageHero
        crumb={page.crumb}
        title={page.title}
        description={
          stateLabel
            ? `Fiscal incentives and subsidies relevant to ${stateLabel} and multi-state programmes.`
            : page.description
        }
        eyebrow={stateLabel ? `Filtered · ${stateLabel}` : undefined}
      >
        {page.primaryCtaLabel ? (
          <Link href={page.primaryCtaHref} className="btn-primary">
            {page.primaryCtaLabel}
          </Link>
        ) : null}
        {page.secondaryCtaLabel ? (
          <Link href={page.secondaryCtaHref} className="btn-secondary">
            {page.secondaryCtaLabel}
          </Link>
        ) : null}
        {stateFilter && (
          <Link href="/schemes" className="btn-secondary">
            Clear filter
          </Link>
        )}
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={page.sectionEyebrow}
            title={
              stateLabel
                ? `Schemes for ${stateLabel}`
                : page.sectionTitle
            }
            align="left"
          />

          {schemes.length === 0 ? (
            <div className="border border-line bg-white px-6 py-12 text-center">
              <p className="text-sm text-muted">{page.emptyTitle}</p>
              <Link href="/schemes" className="mt-4 inline-flex text-sm font-bold text-navy hover:text-gold">
                {page.emptyDescription}
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-line border-y border-line">
              {schemes.map((sch) => (
                <article key={sch.id} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
                      {sch.category}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy">
                      {sch.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{sch.authority}</p>
                    {sch.state && (
                      <p className="mt-1 text-xs font-semibold text-gold-label">{sch.state}</p>
                    )}
                  </div>

                  <div className="lg:col-span-5">
                    <div className="mb-5 border-l-2 border-gold pl-4">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-gold-label">
                        Benefits
                      </div>
                      <p className="mt-1.5 text-sm font-medium leading-relaxed text-navy">
                        {sch.benefits}
                      </p>
                    </div>
                    {(sch.eligibility?.length ?? 0) > 0 && (
                      <>
                        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-muted">
                          Eligibility
                        </div>
                        <ul className="space-y-2">
                          {sch.eligibility.map((el) => (
                            <li
                              key={el}
                              className="flex items-start gap-2 text-sm text-muted"
                            >
                              <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                              {el}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="flex lg:col-span-3 lg:items-start lg:justify-end">
                    <Link
                      href="/contact?intent=scheme_assistance"
                      className="inline-flex items-center gap-2 border-b border-navy/20 pb-0.5 text-sm font-bold text-navy transition-colors hover:border-gold hover:text-gold"
                    >
                      {page.itemCtaLabel} <ArrowRight className="h-4 w-4" />
                    </Link>
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
