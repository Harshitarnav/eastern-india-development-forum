import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";
import { cmsMediaUrl } from "@/lib/cms/home-preview";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/projects", { title: "Projects" });
}

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
            {site.projects.map((ap, idx) => (
              <article
                key={ap.id}
                className="grid gap-6 py-9 md:grid-cols-12 md:items-center md:gap-10"
              >
                <div className="relative min-h-[200px] overflow-hidden rounded-sm md:col-span-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cmsMediaUrl(
                      ap.image,
                      `/images/eidf_0${(idx % 6) + 1}.jpg`
                    )}
                    alt={ap.title}
                    className="h-full w-full min-h-[200px] object-cover transition-transform duration-700 hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-navy/10" />
                </div>
                <div className="md:col-span-8">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-bold uppercase tracking-wider">
                    <span className="text-gold-label">{ap.tag}</span>
                    <span className="inline-flex items-center gap-2 text-muted normal-case tracking-normal font-semibold">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden />
                      <MapPin className="h-3 w-3 text-emerald" />
                      {ap.status}
                      {ap.state ? ` · ${ap.state}` : ""}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy md:text-[1.75rem]">
                    {ap.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
                    {ap.desc}
                  </p>
                  <Link
                    href="/contact?intent=donate"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-navy transition-colors hover:text-gold"
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
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-muted">
            Working with
          </span>
          {site.partners.map((pn) => (
            <span key={pn} className="border-b border-transparent text-sm font-semibold text-navy">
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
