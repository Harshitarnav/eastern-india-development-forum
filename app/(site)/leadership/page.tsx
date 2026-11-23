import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { LeaderAvatar } from "@/components/LeaderAvatar";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/leadership", { title: "Leadership & Governance" });
}

export default async function LeadershipPage() {
  const { site } = await getPublicCmsBundle();
  const leaders = site.leaders || [];

  return (
    <>
      <PageHero
        crumb="Home / Leadership"
        title="Leadership & Governance"
        description="The governing council guiding strategy, integrity, and regional partnership across Eastern India."
      />

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Governing council"
            title="People behind the Forum"
            description="Meet the council members shaping EIDF’s work across government, enterprise, and community."
            align="left"
          />

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {leaders.map((ld, i) => {
              const image =
                "image" in ld ? (ld.image as string | undefined) : undefined;
              return (
                <article
                  key={ld.name}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-[0_16px_40px_-28px_rgba(8,19,31,0.2)] transition-colors hover:border-gold/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <LeaderAvatar
                      name={ld.name}
                      image={image}
                      size="lg"
                      className="h-20 w-20 ring-2 ring-cream"
                    />
                    <span className="font-display text-sm font-bold tabular-nums text-gold-label">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="mt-5 font-display text-xl font-bold tracking-tight text-navy">
                    {ld.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {ld.role}
                  </p>
                  <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-label">
                    Governing council
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Work with the Forum"
        description="Membership, proposals, and partnerships are open to leaders who want to build Eastern India."
        primary={{ label: "Join Us", href: "/membership" }}
        secondary={{ label: "Contact", href: "/contact" }}
      />

      <div className="px-4 pb-16">
        <Link
          href="/about"
          className="mx-auto flex max-w-7xl items-center gap-2 text-sm font-semibold text-navy hover:text-gold-label"
        >
          Read the full charter
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </>
  );
}
