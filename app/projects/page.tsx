import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Projects"
        eyebrow="Impact Portfolio"
        title="Our Projects"
        description="Every project is funded by members, corporates and government partners — and delivered at no cost to the communities it serves."
      >
        <Link
          href="/contact?intent=donate"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          Fund a Project
        </Link>
        <Link
          href="/proposals/submit"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Submit a Proposal
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Active Initiatives"
            title="Transforming communities across Eastern India"
            description="From vocational campuses to heritage corridors — projects designed for dignity, livelihood, and lasting regional growth."
          />

          <div className="grid gap-8 md:grid-cols-2">
            {site.allProjects.map((ap, idx) => (
              <article
                key={ap.title}
                className="group overflow-hidden rounded-3xl border border-line bg-white shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl lg:flex"
              >
                <div className="relative overflow-hidden lg:w-[220px] lg:shrink-0">
                  <img
                    src={`/images/eidf_0${idx + 1}.jpg`}
                    alt={ap.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105 lg:h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/40 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="flex flex-1 flex-col justify-center p-6 md:p-7">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-bold tracking-wider text-gold uppercase">
                      {ap.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-cream-warm px-2.5 py-1 text-[10.5px] font-semibold text-ink/70">
                      <MapPin className="h-3 w-3 text-emerald" />
                      {ap.status}
                    </span>
                  </div>
                  <h2 className="mb-2.5 font-display text-xl font-bold text-navy md:text-2xl">
                    {ap.title}
                  </h2>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{ap.desc}</p>
                  <Link
                    href="/contact?intent=donate"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-navy transition-colors hover:text-gold"
                  >
                    Support this project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-white px-4 py-14 md:py-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 text-xs font-bold uppercase tracking-[2px] text-muted">
            Working With
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {site.partners.map((pn) => (
              <div
                key={pn}
                className="rounded-2xl border border-line bg-cream px-5 py-3 text-sm font-semibold text-navy shadow-sm transition-all hover:border-gold/40 hover:shadow-md"
              >
                {pn}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a project or partnership in mind?"
        description="Partner with EIDF to fund skill centres, restore heritage, and open livelihood pathways."
        primary={{ label: "Fund a Project", href: "/contact?intent=donate" }}
        secondary={{ label: "Partner with Us", href: "/contact" }}
      />
    </>
  );
}
