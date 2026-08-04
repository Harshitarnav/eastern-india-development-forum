import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  Megaphone,
  Network,
  Sparkles,
  Users,
} from "lucide-react";
import { MembershipForm } from "@/components/MembershipForm";
import { PageHero, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Membership" };

const benefitIcons = [Sparkles, Globe2, Megaphone, Network];

export default function MembershipPage() {
  return (
    <>
      <PageHero
        crumb="Home / Membership"
        eyebrow="Member Network"
        title="Join the Movement"
        description="Direct your time, skill, funds, or network toward projects transforming Eastern India — and become part of a global community of changemakers."
      >
        <a
          href="#apply"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          Apply Now
        </a>
        <Link
          href="/contact?intent=donate"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Fund a Project Instead
        </Link>
      </PageHero>

      {/* Why Join */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Why Join"
            title="Membership that creates real impact"
            description="Four reasons diaspora leaders, professionals, and partners choose EIDF."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.benefits.map((b, i) => {
              const Icon = benefitIcons[i] || Users;
              return (
                <div
                  key={b.title}
                  className="group rounded-3xl border border-line bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:border-gold/30 hover:shadow-xl"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2.5 font-display text-lg font-bold text-navy">
                    {b.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="How It Works"
            title="Three simple steps to get started"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {site.applySteps.map((s, i) => (
              <div
                key={s.n}
                className="relative rounded-3xl border border-line bg-white p-8 text-center shadow-md"
              >
                {i < site.applySteps.length - 1 && (
                  <div className="pointer-events-none absolute top-1/2 -right-4 z-10 hidden h-px w-8 bg-gold/40 md:block" />
                )}
                <div className="mb-3 font-display text-4xl font-extrabold text-gold">
                  {s.n}
                </div>
                <div className="mb-2 text-lg font-bold text-navy">{s.title}</div>
                <div className="text-sm leading-relaxed text-muted">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <MembershipForm />
        </div>
      </section>

      {/* Alternate CTA */}
      <section className="relative overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-slate-dark px-4 py-14 text-center text-white">
        <div className="pointer-events-none absolute top-0 right-1/3 h-40 w-40 rounded-full bg-gold/10 blur-[60px]" />
        <p className="relative text-base md:text-lg">
          Prefer to fund a project directly?{" "}
          <Link
            href="/contact?intent=donate"
            className="inline-flex items-center gap-1.5 font-bold text-gold transition-colors hover:text-white"
          >
            Visit Donate <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>
    </>
  );
}
