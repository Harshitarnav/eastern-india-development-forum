import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Target,
  Users,
  Heart,
  Shield,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

const valueIcons = [Handshake, Heart, Shield, Lightbulb];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="Home / About"
        eyebrow="Our Institution"
        title="About EIDF"
        description="A Section 8 development forum uniting diaspora capital, government partnership, and community dignity across Eastern India."
      />

      {/* Vision & Mission */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-lg transition-all hover:shadow-2xl md:p-10">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold/10 blur-2xl transition-all group-hover:bg-gold/20" />
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold">
              <Eye className="h-7 w-7" />
            </div>
            <h2 className="mb-3 font-display text-2xl font-bold text-navy">Vision</h2>
            <p className="text-sm leading-relaxed text-muted md:text-[15px]">
              To make Eastern India a global example of diaspora-powered, dignity-first
              development.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-3xl border border-line bg-white p-8 shadow-lg transition-all hover:shadow-2xl md:p-10">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-navy/5 blur-2xl transition-all group-hover:bg-navy/10" />
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy/10 text-navy">
              <Target className="h-7 w-7" />
            </div>
            <h2 className="mb-3 font-display text-2xl font-bold text-navy">Mission</h2>
            <p className="text-sm leading-relaxed text-muted md:text-[15px]">
              Fund skilling, heritage and human-rights work by connecting members,
              government and industry — at no cost to communities.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-cream-warm px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeader
              eyebrow="Our Story"
              title="Powered by diaspora. Rooted in Eastern India."
              align="left"
            />
            <p className="text-[15px] leading-relaxed text-ink/85">
              Eastern India Development Forum is powered by Umanand Eastern Foundation, a
              Section 8 company founded to unlock the potential of Bihar, Jharkhand &
              Odisha. We bring together the diaspora who left this region and built success
              elsewhere — asking them to fund skill centres, restore heritage sites, and
              open tourism and livelihood opportunity, working hand-in-hand with government
              and industry.
            </p>
            <Link
              href="/membership"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-navy-light"
            >
              Join the Movement <ArrowRight className="h-4 w-4 text-gold" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-line shadow-2xl">
            <img
              src="/images/eidf_05.jpg"
              alt="EIDF Seminar"
              className="h-72 w-full object-cover md:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <div className="text-xs font-bold uppercase tracking-wider text-gold">
                Diaspora Roundtable
              </div>
              <div className="mt-1 font-display text-lg font-bold">
                Connecting capital with community
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Leadership"
            title="Guided by experience and purpose"
            description="Senior advisors and operators stewarding EIDF's regional development mandate."
          />
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {site.leaders.map((ld) => (
              <div
                key={ld.name}
                className="group rounded-3xl border border-line bg-white p-6 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-navy to-navy-mid font-display text-xl font-bold text-gold shadow-lg transition-transform group-hover:scale-105">
                  {ld.name.split(" ").pop()?.substring(0, 2).toUpperCase() || "EI"}
                </div>
                <div className="mb-1.5 text-sm font-bold text-navy">{ld.name}</div>
                <div className="text-xs leading-relaxed text-muted">{ld.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Our Values"
            title="Principles that guide every partnership"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {site.values.map((v, i) => {
              const Icon = valueIcons[i] || Users;
              return (
                <div
                  key={v.title}
                  className="rounded-3xl border border-line bg-cream p-6 transition-all hover:border-gold/40 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-navy/10 text-navy">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mb-2 font-display text-lg font-bold text-navy">{v.title}</div>
                  <div className="text-xs leading-relaxed text-muted">{v.desc}</div>
                </div>
              );
            })}
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
