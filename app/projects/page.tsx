import type { Metadata } from "next";
import { CtaBand, PageHero, PlaceholderMedia } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <>
      <PageHero crumb="Home / Projects" title="Our Projects" />

      <section className="px-6 py-10 md:px-12">
        <p className="mx-auto max-w-3xl text-center text-[15px] text-muted">
          Every project is funded by members, corporates and government partners — and
          delivered at no cost to the communities it serves.
        </p>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {site.allProjects.map((ap, idx) => (
            <article
              key={ap.title}
              className="overflow-hidden rounded-xl border border-line bg-white lg:flex"
            >
              <img
                src={`/images/eidf_0${idx + 1}.jpg`}
                alt={ap.title}
                className="w-full h-48 lg:w-[200px] lg:h-auto lg:shrink-0 object-cover"
              />
              <div className="flex-1 p-5">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div className="text-[11px] font-bold tracking-[1.5px] text-gold-label">
                    {ap.tag}
                  </div>
                  <div className="shrink-0 rounded-full bg-cream-warm px-2.5 py-1 text-[10.5px] text-ink/70">
                    {ap.status}
                  </div>
                </div>
                <h2 className="mb-2 font-display text-lg">{ap.title}</h2>
                <p className="text-[13px] leading-relaxed text-muted">{ap.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-white px-6 py-12">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-4 text-xs tracking-[1.5px] text-muted">WORKING WITH</div>
          <div className="flex flex-wrap justify-center gap-3">
            {site.partners.map((pn) => (
              <div
                key={pn}
                className="rounded-lg border border-line px-4 py-2.5 text-[12.5px] font-semibold text-ink/80"
              >
                {pn}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a project or partnership in mind?"
        primary={{ label: "Fund a Project", href: "/contact?intent=donate" }}
        secondary={{ label: "Partner with Us", href: "/contact" }}
      />
    </>
  );
}
