import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { LeaderAvatar } from "@/components/LeaderAvatar";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";
import { cmsMediaUrl } from "@/lib/cms/home-preview";
import { DEFAULT_PAGES } from "@/lib/cms/page-settings";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/about", { title: "About EIDF" });
}

export default async function AboutPage() {
  const { site } = await getPublicCmsBundle();
  const page = site.pages?.about || DEFAULT_PAGES.about;
  const testimonials = site.testimonials || [];

  return (
    <>
      <PageHero crumb={page.crumb} title={page.title} description={page.description} />

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="section-rail pl-5 lg:col-span-6 lg:pl-6">
            <SectionHeader eyebrow={page.storyEyebrow} title={page.storyTitle} align="left" />
            <p className="text-[15px] leading-relaxed text-muted md:text-base">
              {page.storyBody}
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div className="border-l-2 border-gold pl-5">
                <h3 className="font-display text-lg font-bold text-navy">{page.visionTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{page.visionBody}</p>
              </div>
              <div className="border-l-2 border-emerald pl-5">
                <h3 className="font-display text-lg font-bold text-navy">{page.missionTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{page.missionBody}</p>
              </div>
            </div>
            <Link href={page.storyCtaHref} className="btn-navy mt-10 inline-flex">
              {page.storyCtaLabel} <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          </div>

          <div className="relative lg:col-span-6">
            <div className="pointer-events-none absolute -left-3 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-transparent via-gold/60 to-transparent lg:block" />
            <div className="relative overflow-hidden rounded-sm [clip-path:polygon(0_0,100%_0,100%_94%,0_100%)] min-h-[340px] md:min-h-[420px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cmsMediaUrl(page.image, "/images/eidf_05.jpg")}
                alt={page.imageCaptionTitle}
                className="h-full w-full min-h-[340px] object-cover md:min-h-[420px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 text-white md:p-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" aria-hidden />
                  <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold">
                    {page.imageCaptionEyebrow}
                  </div>
                </div>
                <div className="mt-2 font-display text-xl font-bold md:text-2xl">
                  {page.imageCaptionTitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={page.leadersEyebrow} title={page.leadersTitle} align="left" />
          <div className="divide-y divide-line border-y border-line bg-white/60">
            {site.leaders.map((ld) => (
              <div key={ld.name} className="flex items-center gap-5 px-1 py-6 md:gap-6 md:px-4">
                <LeaderAvatar
                  name={ld.name}
                  image={"image" in ld ? (ld.image as string | undefined) : undefined}
                  size="lg"
                />
                <div>
                  <div className="font-display text-lg font-bold text-navy">{ld.name}</div>
                  <div className="mt-0.5 text-sm text-muted">{ld.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow={page.valuesEyebrow} title={page.valuesTitle} align="left" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((v, i) => (
              <div key={v.title} className="border-t-2 border-gold/50 pt-5">
                <div className="font-mono text-[11px] font-bold tracking-widest text-gold-label">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow={page.testimonialsEyebrow}
              title={page.testimonialsTitle}
              align="left"
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <blockquote
                  key={t.id}
                  className="border border-line bg-white p-6"
                >
                  <p className="text-sm leading-relaxed text-muted">“{t.quote}”</p>
                  <footer className="mt-5 flex items-center gap-3">
                    <LeaderAvatar name={t.name} image={t.image} size="sm" />
                    <div>
                      <div className="text-sm font-bold text-navy">{t.name}</div>
                      <div className="text-xs text-muted">
                        {[t.role, t.org].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </footer>
                </blockquote>
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
