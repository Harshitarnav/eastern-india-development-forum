import type { Metadata } from "next";
import Link from "next/link";
import { Download } from "lucide-react";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";
import { DEFAULT_PAGES } from "@/lib/cms/page-settings";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/resources", { title: "Knowledge Center" });
}

export default async function ResourcesPage() {
  const { site } = await getPublicCmsBundle();
  const page = site.pages?.resources || DEFAULT_PAGES.resources;
  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} description={page.description}>
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
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow={page.sectionEyebrow}
            title={page.sectionTitle}
            align="left"
          />

          <div className="divide-y divide-line border-y border-line">
            {site.reports.map((rep) => (
              <article
                key={rep.id}
                className="flex flex-col gap-5 py-8 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-bold uppercase tracking-widest">
                    <span className="inline-flex items-center gap-2 text-gold-label">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden />
                      {rep.category}
                    </span>
                    <span className="font-medium normal-case tracking-normal text-muted">
                      {rep.date} · {rep.fileSize}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                    {rep.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                    {rep.summary}
                  </p>
                  <div className="mt-3 text-xs font-semibold text-navy/70">{rep.author}</div>
                </div>
                <a
                  href={rep.downloadUrl}
                  className="inline-flex shrink-0 items-center gap-2 self-start border border-navy bg-navy px-5 py-3 text-xs font-bold text-white transition-colors hover:bg-navy-light"
                >
                  <Download className="h-4 w-4 text-gold" />
                  {rep.downloadUrl?.includes("/contact") ? "Request PDF" : "Download PDF"}
                </a>
              </article>
            ))}
          </div>
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
