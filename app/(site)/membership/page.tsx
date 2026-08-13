import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MembershipForm } from "@/components/MembershipForm";
import { PageHero, SectionHeader } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/membership", { title: "Membership" });
}

export default async function MembershipPage() {
  const { site } = await getPublicCmsBundle();
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

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="section-rail pl-5 lg:col-span-5 lg:pl-6">
            <SectionHeader
              eyebrow="Why Join"
              title="Membership that creates real impact"
              align="left"
            />
            <ol className="space-y-7">
              {site.benefits.map((b, i) => (
                <li key={b.title} className="flex gap-4">
                  <span className="font-display text-2xl font-extrabold leading-none text-gold">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-navy">{b.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-12 border-t border-line pt-8">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-gold" aria-hidden />
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-label">
                  How it works
                </div>
              </div>
              <div className="space-y-5">
                {site.applySteps.map((s) => (
                  <div key={s.n} className="flex gap-3">
                    <span className="font-mono text-sm font-bold text-navy">{s.n}</span>
                    <div>
                      <div className="text-sm font-bold text-navy">{s.title}</div>
                      <div className="mt-0.5 text-xs leading-relaxed text-muted">{s.desc}</div>
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

      <section className="relative overflow-hidden bg-navy-deep px-4 py-14 text-center text-white eidf-grain">
        <div className="pointer-events-none absolute inset-0 eidf-depth opacity-70" />
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
