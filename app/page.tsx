import Link from "next/link";
import { CtaBand, Eyebrow, PlaceholderMedia } from "@/components/ui";
import { site } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <section className="bg-navy px-6 py-16 text-white md:px-12 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <div className="mb-4 text-xs font-bold tracking-[2px] text-gold md:text-[13px]">
              POWERED BY UMANAND EASTERN FOUNDATION
            </div>
            <h1 className="mb-5 font-display text-4xl leading-tight md:text-5xl">
              {site.tagline}
            </h1>
            <p className="mb-8 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
              A forum for everyone who has left Bihar, Jharkhand & Odisha to build success
              elsewhere — to fund skill centres, heritage sites and opportunity back home.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/membership"
                className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep"
              >
                Become a Member
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white"
              >
                Support a Project
              </Link>
            </div>
          </div>
          <PlaceholderMedia
            label="HERO IMAGE — Eastern India landscape / diaspora composite"
            className="min-h-[280px] rounded-2xl md:min-h-[420px]"
          />
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {site.stats.map((st, i) => (
            <div
              key={st.label}
              className={`px-4 py-8 text-center md:px-5 ${
                i < site.stats.length - 1 ? "md:border-r md:border-line" : ""
              } ${i % 2 === 0 ? "border-r border-line md:border-r" : ""} ${
                i < 2 ? "border-b border-line md:border-b-0" : ""
              }`}
            >
              <div className="font-display text-2xl font-bold text-navy md:text-3xl">
                {st.value}
              </div>
              <div className="mt-1.5 text-xs text-muted md:text-[12.5px]">{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>WHAT WE FUND</Eyebrow>
              <h2 className="font-display text-2xl md:text-3xl">Featured Projects</h2>
            </div>
            <Link href="/projects" className="text-sm font-semibold text-navy">
              View all projects →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {site.homeProjects.map((p) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-xl border border-line bg-white"
              >
                <PlaceholderMedia label={p.img} className="h-44" />
                <div className="p-5">
                  <div className="mb-2 text-[11px] font-bold tracking-[1.5px] text-gold-label">
                    {p.tag}
                  </div>
                  <h3 className="mb-2 font-display text-lg">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-warm px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-14">
          <PlaceholderMedia label="COMMUNITY photo" className="min-h-[260px] rounded-xl" />
          <div>
            <Eyebrow>OUR STORY</Eyebrow>
            <h2 className="mb-4 font-display text-2xl md:text-[28px]">
              Founded to unlock Eastern India&apos;s potential
            </h2>
            <p className="mb-5 text-[15px] leading-relaxed text-muted">
              EIDF is powered by Umanand Eastern Foundation, a Section 8 company, working
              with government and industry to fund skilling, heritage and opportunity across
              Bihar, Jharkhand & Odisha — at no cost to the communities we serve.
            </p>
            <Link href="/about" className="text-sm font-semibold text-navy">
              Read our full story →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>LATEST FROM EIDF</Eyebrow>
          <div className="mt-4 overflow-hidden rounded-2xl border border-line bg-white md:flex">
            <PlaceholderMedia
              label="SEMINAR — June 2026"
              className="min-h-[200px] md:w-[340px] md:shrink-0"
            />
            <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
              <div className="mb-2.5 text-xs text-muted">
                29 JUNE 2026 · UMANAND AUDITORIUM, RANCHI
              </div>
              <h3 className="mb-2.5 font-display text-xl">
                National Seminar on Inclusive Development & Human Rights
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                Chief Guest Dr. Justice Bidyut Ranjan Sarangi joined dignitaries to discuss
                equality, dignity and sustainable development for Eastern India.
              </p>
              <Link href="/events" className="mt-4 text-sm font-semibold text-navy">
                View events →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Wherever you are, you can move Eastern India forward"
        primary={{ label: "Join the Movement", href: "/membership" }}
        secondary={{ label: "Donate to a Project", href: "/contact?intent=donate" }}
      />
    </>
  );
}
