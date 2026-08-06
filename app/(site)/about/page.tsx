import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { LeaderAvatar } from "@/components/LeaderAvatar";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/about", { title: "About EIDF" });
}

export default async function AboutPage() {
  const { site } = await getPublicCmsBundle();
  return (
    <>
      <PageHero
        crumb="Home / About"
        title="About EIDF"
        description="A Section 8 development forum uniting diaspora capital, government partnership, and community dignity across Eastern India."
      />

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title="Powered by diaspora. Rooted in Eastern India."
              align="left"
            />
            <p className="text-[15px] leading-relaxed text-muted">
              Eastern India Development Forum is powered by Umanand Eastern Foundation.
              We connect diaspora who built success elsewhere with skill centres, heritage
              restoration, and livelihood programmes — working hand-in-hand with government
              and industry across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East.
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="border-l-2 border-gold pl-4">
                <h3 className="font-display text-lg font-bold text-navy">Vision</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  Make Eastern India a global example of diaspora-powered, dignity-first development.
                </p>
              </div>
              <div className="border-l-2 border-emerald pl-4">
                <h3 className="font-display text-lg font-bold text-navy">Mission</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  Fund skilling, heritage and rights work by connecting members, government and industry.
                </p>
              </div>
            </div>
            <Link href="/membership" className="btn-navy mt-8 inline-flex">
              Join the Movement <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          </div>
          <div className="relative overflow-hidden min-h-[320px]">
            <img
              src="/images/eidf_05.jpg"
              alt="EIDF Seminar"
              className="h-full w-full object-cover min-h-[320px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-wider text-gold">Diaspora Roundtable</div>
              <div className="mt-1 font-display text-lg font-bold">Connecting capital with community</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-warm px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Leadership"
            title="Guided by experience and purpose"
            align="left"
          />
          <div className="divide-y divide-line border-y border-line">
            {site.leaders.map((ld) => (
              <div key={ld.name} className="flex items-center gap-5 py-5">
                <LeaderAvatar
                  name={ld.name}
                  image={"image" in ld ? (ld.image as string | undefined) : undefined}
                  size="lg"
                />
                <div>
                  <div className="font-display text-base font-bold text-navy">
                    {ld.name}
                  </div>
                  <div className="text-sm text-muted">{ld.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Values" title="What guides every partnership" align="left" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((v, i) => (
              <div key={v.title} className="border-t-2 border-gold/40 pt-4">
                <div className="text-[11px] font-bold text-gold-label tracking-widest">0{i + 1}</div>
                <h3 className="mt-2 font-display text-lg font-bold text-navy">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Be part of the story of a region on the rise"
        description="Join diaspora leaders, corporates, and changemakers accelerating Eastern India's transformation."
        primary={{ label: "Join the Movement", href: "/membership" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
