import type { Metadata } from "next";
import { CtaBand, Eyebrow, PageHero, PlaceholderMedia } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="Home / About" title="About EIDF" />

      <section className="px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-line bg-white p-8">
            <div className="mb-4 h-10 w-10 rounded-[10px] bg-gold" />
            <h2 className="mb-2.5 font-display text-xl">Vision</h2>
            <p className="text-sm leading-relaxed text-muted">
              To make Eastern India a global example of diaspora-powered, dignity-first
              development.
            </p>
          </div>
          <div className="rounded-xl border border-line bg-white p-8">
            <div className="mb-4 h-10 w-10 rounded-[10px] bg-navy" />
            <h2 className="mb-2.5 font-display text-xl">Mission</h2>
            <p className="text-sm leading-relaxed text-muted">
              Fund skilling, heritage and human-rights work by connecting members,
              government and industry — at no cost to communities.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream-warm px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <Eyebrow>OUR STORY</Eyebrow>
            <p className="text-[15px] leading-relaxed text-ink/90">
              Eastern India Development Forum is powered by Umanand Eastern Foundation, a
              Section 8 company founded to unlock the potential of Bihar, Jharkhand &
              Odisha. We bring together the diaspora who left this region and built success
              elsewhere — asking them to fund skill centres, restore heritage sites, and
              open tourism and livelihood opportunity, working hand-in-hand with government
              and industry.
            </p>
          </div>
          <PlaceholderMedia
            label="SEMINAR / FOUNDING photo"
            className="min-h-[280px] rounded-xl"
          />
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>
            <span className="block text-center">LEADERSHIP</span>
          </Eyebrow>
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            {site.leaders.map((ld) => (
              <div key={ld.name} className="text-center">
                <div className="mx-auto mb-3.5 h-[76px] w-[76px] rounded-full bg-cream-warm" />
                <div className="mb-1 text-sm font-bold">{ld.name}</div>
                <div className="text-xs text-muted">{ld.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white px-6 py-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-4">
          {site.values.map((v) => (
            <div key={v.title} className="text-center">
              <div className="mb-2 font-display text-base">{v.title}</div>
              <div className="text-xs leading-relaxed text-muted">{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="Be part of the story of a region on the rise"
        primary={{ label: "Join the Movement", href: "/membership" }}
      />
    </>
  );
}
