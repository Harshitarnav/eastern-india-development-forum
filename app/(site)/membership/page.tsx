import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MembershipForm } from "@/components/MembershipForm";
import { PageHero, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <>
      <PageHero
        crumb="Home / Membership"
        title="Join the Movement"
        description="Direct your time, skill, funds, or network toward projects transforming Eastern India."
      >
        <a href="#apply" className="btn-primary">
          Apply Now
        </a>
        <Link href="/contact?intent=donate" className="btn-secondary">
          Fund a Project Instead
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Why Join"
              title="Membership that creates real impact"
              align="left"
            />
            <ol className="space-y-6">
              {site.benefits.map((b, i) => (
                <li key={b.title} className="flex gap-4">
                  <span className="font-display text-2xl font-extrabold text-gold leading-none">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted leading-relaxed">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-10 pt-8 border-t border-line">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gold-label mb-4">
                How it works
              </div>
              <div className="space-y-4">
                {site.applySteps.map((s) => (
                  <div key={s.n} className="flex gap-3">
                    <span className="text-sm font-bold text-navy">{s.n}</span>
                    <div>
                      <div className="text-sm font-bold text-navy">{s.title}</div>
                      <div className="text-xs text-muted mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div id="apply" className="lg:col-span-7">
            <MembershipForm />
          </div>
        </div>
      </section>

      <section className="bg-navy-deep px-4 py-12 text-center text-white">
        <p className="text-base">
          Prefer to fund a project directly?{" "}
          <Link
            href="/contact?intent=donate"
            className="inline-flex items-center gap-1.5 font-bold text-gold hover:text-white transition-colors"
          >
            Visit Donate <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </section>
    </>
  );
}
