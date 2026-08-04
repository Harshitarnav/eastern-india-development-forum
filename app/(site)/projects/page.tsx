import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";

export const metadata: Metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const { site } = await getPublicCmsBundle();
  return (
    <>
      <PageHero
        crumb="Home / Projects"
        title="Our Projects"
        description="Every project is funded by members, corporates and government partners — delivered at no cost to the communities it serves."
      >
        <Link href="/contact?intent=donate" className="btn-primary">
          Fund a Project
        </Link>
        <Link href="/proposals/submit" className="btn-secondary">
          Submit a Proposal
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Active Initiatives"
            title="Transforming communities across Eastern India"
            align="left"
          />

          <div className="divide-y divide-line border-y border-line">
            {site.allProjects.map((ap, idx) => (
              <article
                key={ap.title}
                className="grid gap-6 py-8 md:grid-cols-12 md:items-center md:gap-10"
              >
                <div className="relative md:col-span-4 overflow-hidden min-h-[180px]">
                  <img
                    src={`/images/eidf_0${idx + 1}.jpg`}
                    alt={ap.title}
                    className="h-full w-full object-cover min-h-[180px]"
                  />
                </div>
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-gold-label">{ap.tag}</span>
                    <span className="inline-flex items-center gap-1 text-muted normal-case tracking-normal font-semibold">
                      <MapPin className="h-3 w-3 text-emerald" />
                      {ap.status}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-navy">{ap.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted max-w-2xl">{ap.desc}</p>
                  <Link
                    href="/contact?intent=donate"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy hover:text-gold transition-colors"
                  >
                    Support this project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white px-4 py-12">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted">Working with</span>
          {site.partners.map((pn) => (
            <span key={pn} className="text-sm font-semibold text-navy">
              {pn}
            </span>
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a project or partnership in mind?"
        description="Tell us about your initiative — we help structure funding, partnerships, and delivery."
        primary={{ label: "Submit a Proposal", href: "/proposals/submit" }}
        secondary={{ label: "Talk to Us", href: "/contact" }}
      />
    </>
  );
}
