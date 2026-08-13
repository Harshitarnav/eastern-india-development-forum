"use client";

import Link from "next/link";
import { Calendar, MapPin } from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { EventItem, NewsItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type NewsEventsSectionProps = {
  news: NewsItem[];
  events: EventItem[];
  newsChrome: CmsHomepageSectionCopy;
  eventsChrome: CmsHomepageSectionCopy;
};

export function NewsEventsSection({
  news,
  events,
  newsChrome,
  eventsChrome,
}: NewsEventsSectionProps) {
  const featured = news[0];
  const restNews = news.slice(1);

  return (
    <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <ClipReveal direction="up">
            <SectionHeader
              eyebrow={newsChrome.eyebrow}
              title={newsChrome.title}
              align="left"
              className="!mb-6"
            />
          </ClipReveal>

          {featured && (
            <ClipReveal direction="clip" delay={0.08}>
              <article className="relative overflow-hidden rounded-sm border border-line bg-navy p-6 text-white md:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-2xl" />
                <div className="text-[11px] text-white/50">
                  {featured.date} · {featured.source}
                </div>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                  {featured.summary}
                </p>
                {featured.url && (
                  <Link
                    href={featured.url}
                    className="mt-5 inline-flex text-xs font-bold text-gold hover:text-white"
                    data-cursor="VIEW"
                  >
                    Read announcement →
                  </Link>
                )}
              </article>
            </ClipReveal>
          )}

          {restNews.length > 0 && (
            <div className="mt-3 divide-y divide-line overflow-hidden rounded-sm border border-line bg-white">
              {restNews.map((nw, i) => (
                <ClipReveal key={nw.id} direction="left" delay={0.06 * i}>
                  <article className="p-5">
                    <div className="text-[11px] text-muted">
                      {nw.date} · {nw.source}
                    </div>
                    <h4 className="mt-1.5 font-display text-base font-bold text-navy">
                      {nw.url ? (
                        <Link href={nw.url} className="hover:text-gold transition-colors">
                          {nw.title}
                        </Link>
                      ) : (
                        nw.title
                      )}
                    </h4>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {nw.summary}
                    </p>
                  </article>
                </ClipReveal>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="mb-2 flex items-end justify-between gap-3">
            <ClipReveal direction="up">
              <SectionHeader
                eyebrow={eventsChrome.eyebrow}
                title={eventsChrome.title}
                align="left"
                className="!mb-0"
              />
            </ClipReveal>
            {eventsChrome.ctaLabel && (
              <ClipReveal direction="right" className="shrink-0">
                <Link
                  href={eventsChrome.ctaHref || "/events"}
                  className="text-xs font-bold text-navy hover:text-gold"
                >
                  {eventsChrome.ctaLabel}
                </Link>
              </ClipReveal>
            )}
          </div>

          <div className="divide-y divide-line overflow-hidden rounded-sm border border-line bg-white">
            {events.map((ev, i) => (
              <ClipReveal key={ev.id} direction="right" delay={0.06 * i}>
                <div className="flex items-start justify-between gap-4 p-5">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gold-label">
                      {ev.type} · {ev.mode}
                    </div>
                    <h4 className="mt-1 font-display text-base font-bold text-navy">
                      {ev.title}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-emerald" />{" "}
                        {ev.date}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-gold" />{" "}
                        {ev.location}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={ev.registerUrl}
                    className="shrink-0 text-xs font-bold text-navy hover:text-gold"
                    data-cursor="EXPLORE"
                  >
                    Register
                  </Link>
                </div>
              </ClipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
