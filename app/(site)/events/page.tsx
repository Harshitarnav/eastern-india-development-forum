import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { PageHero, SectionHeader, CtaBand } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";
import { cmsMediaUrl } from "@/lib/cms/home-preview";
import { DEFAULT_PAGES } from "@/lib/cms/page-settings";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/events", { title: "Events & News" });
}

export default async function EventsPage() {
  const { site } = await getPublicCmsBundle();
  const page = site.pages?.events || DEFAULT_PAGES.events;
  const featured = site.events[0];

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

      {featured && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow={page.featuredEyebrow} title={featured.title} align="left" />
            <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="relative min-h-[300px] overflow-hidden rounded-sm lg:col-span-5 [clip-path:polygon(0_0,100%_0,100%_96%,0_100%)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cmsMediaUrl(featured.image, page.featuredFallbackImage || "/images/eidf_06.jpg")}
                  alt={featured.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent" />
              </div>
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald" aria-hidden />
                  {featured.type} · {featured.mode}
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
                  {featured.desc}
                </p>
                <div className="mt-6 flex flex-wrap gap-5 text-xs font-semibold text-navy/70">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald" /> {featured.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> {featured.date}
                  </span>
                </div>
                <Link
                  href={featured.registerUrl || "/gallery"}
                  className="mt-7 inline-flex items-center gap-2 border-b border-navy/20 pb-0.5 text-sm font-bold text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  {featured.registerUrl ? page.itemCtaLabel : "View gallery"}{" "}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-line bg-cream-warm px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={page.calendarEyebrow} title={page.calendarTitle} align="left" />
          <div className="divide-y divide-line border-y border-line bg-white/50">
            {site.events.map((ev) => (
              <div
                key={ev.id}
                className="grid gap-3 py-6 sm:grid-cols-12 sm:items-center sm:px-2"
              >
                <div className="sm:col-span-7">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                    {ev.type} · {ev.mode}
                  </div>
                  <h3 className="mt-1.5 font-display text-xl font-bold text-navy">{ev.title}</h3>
                  <p className="mt-1.5 text-sm text-muted">{ev.desc}</p>
                </div>
                <div className="space-y-1.5 text-xs font-semibold text-muted sm:col-span-3">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> {ev.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald" /> {ev.location}
                  </div>
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <Link
                    href={ev.registerUrl}
                    className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:text-gold"
                  >
                    {page.itemCtaLabel} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {site.news.length > 0 && (
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow={page.newsEyebrow} title={page.newsTitle} align="left" />
            <div className="divide-y divide-line border-y border-line">
              {site.news.map((nw) => (
                <article key={nw.id} className="py-7">
                  <div className="flex items-center gap-3 text-[11px] text-muted">
                    <span className="h-px w-6 bg-gold/70" aria-hidden />
                    {nw.date} · {nw.source}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-navy">{nw.title}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{nw.summary}</p>
                  {nw.url && !nw.url.startsWith("#") && (
                    <a
                      href={nw.url}
                      className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-navy hover:text-gold"
                    >
                      Read more <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={page.ctaTitle}
        description={page.ctaDescription}
        primary={{ label: page.ctaPrimaryLabel, href: page.ctaPrimaryHref }}
        secondary={{ label: page.ctaSecondaryLabel, href: page.ctaSecondaryHref }}
      />
    </>
  );
}
