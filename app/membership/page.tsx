import type { Metadata } from "next";
import Link from "next/link";
import { MembershipForm } from "@/components/MembershipForm";
import { Eyebrow, PageHero } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Membership" };

export default function MembershipPage() {
  return (
    <>
      <PageHero crumb="Home / Membership" title="Join the Movement" />

      <section className="px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>
            <span className="block text-center">WHY JOIN</span>
          </Eyebrow>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {site.benefits.map((b) => (
              <div key={b.title} className="rounded-xl border border-line bg-white p-5">
                <h3 className="mb-2.5 font-display text-base">{b.title}</h3>
                <p className="text-[12.5px] leading-relaxed text-muted">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-warm px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>
            <span className="block text-center">HOW IT WORKS</span>
          </Eyebrow>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {site.applySteps.map((s) => (
              <div key={s.n} className="mx-auto max-w-[260px] text-center">
                <div className="mb-2.5 font-display text-2xl text-gold">{s.n}</div>
                <div className="mb-2 text-[15px] font-bold">{s.title}</div>
                <div className="text-[12.5px] leading-relaxed text-muted">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <MembershipForm />
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-10 text-center text-white">
        <p className="text-[15px]">
          Prefer to fund a project directly?{" "}
          <Link href="/contact?intent=donate" className="font-semibold text-gold">
            Visit Donate →
          </Link>
        </p>
      </section>
    </>
  );
}
