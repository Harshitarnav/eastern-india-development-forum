import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { PageHero, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Events & News" };

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Events & News"
        eyebrow="Convenings & Coverage"
        title="Events & News"
        description="Seminars, investor meets, site visits, and announcements shaping Eastern India's development agenda."
      >
        <Link
          href="/gallery"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          View Gallery
        </Link>
        <Link
          href="/membership"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Get Event Updates
        </Link>
      </PageHero>

      {/* Featured Event */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured"
            title="National Seminar on Inclusive Development"
            align="left"
          />
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-2xl md:flex">
            <div className="relative min-h-[260px] overflow-hidden md:w-[440px] md:shrink-0">
              <img
                src="/images/eidf_06.jpg"
                alt="National Seminar on Inclusive Development & Human Rights"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent md:bg-gradient-to-r" />
              <div className="absolute top-4 left-4 rounded-full border border-gold/40 bg-navy-deep/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur-md">
                Featured · 29 June 2026
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-center p-7 md:p-10">
              <h2 className="mb-4 font-display text-2xl font-bold text-navy md:text-3xl">
                National Seminar on Inclusive Development & Human Rights
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-muted md:text-[15px]">
                Chief Guest Dr. Justice Bidyut Ranjan Sarangi and fellow dignitaries examined
                equality, dignity and sustainable development for Eastern India at Umanand
                Auditorium, Ranchi.
              </p>
              <div className="mb-6 flex flex-wrap gap-4 text-xs font-semibold text-navy/70">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald" /> Umanand Auditorium, Ranchi
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gold" /> 29 June 2026
                </span>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors hover:text-gold"
              >
                Read full recap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Seminar Gallery Thumbs */}
      <section className="bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHeader
              eyebrow="From the Seminar"
              title="Moments from the convention floor"
              align="left"
            />
            <Link
              href="/gallery"
              className="mb-10 inline-flex items-center gap-1.5 text-sm font-bold text-navy transition-colors hover:text-gold"
            >
              View full gallery <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {site.galleryThumbs.slice(0, 3).map((gp, idx) => (
              <Link
                key={gp.label}
                href="/gallery"
                className="group relative overflow-hidden rounded-3xl border border-line bg-white shadow-lg"
              >
                <img
                  src={`/images/eidf_0${idx + 1}.jpg`}
                  alt={gp.label}
                  className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-bold text-white">{gp.label}</span>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                    {gp.category}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Upcoming"
            title="What's next on the calendar"
            align="left"
          />
          <div className="space-y-4">
            {site.upcomingEvents.map((ue) => (
              <div
                key={ue.title}
                className="flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all hover:border-gold/30 hover:shadow-md sm:flex-row sm:items-center sm:gap-4 sm:p-6"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div className="font-display text-lg font-bold text-navy md:text-xl">
                    {ue.title}
                  </div>
                </div>
                <div className="rounded-full bg-cream-warm px-4 py-2 text-sm font-semibold text-muted">
                  {ue.date}
                </div>
              </div>
            ))}
          </div>

          {site.events && site.events.length > 0 && (
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {site.events.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-3xl border border-line bg-white p-7 shadow-lg transition-all hover:shadow-xl"
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                      {ev.type}
                    </span>
                    <span className="rounded-full bg-cream-warm px-3 py-1 text-[10px] font-semibold text-muted">
                      {ev.mode}
                    </span>
                  </div>
                  <h3 className="mb-2 font-display text-xl font-bold text-navy">{ev.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted">{ev.desc}</p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold text-navy/70">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-gold" /> {ev.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-emerald" /> {ev.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="relative overflow-hidden bg-gradient-to-r from-navy-deep via-navy to-slate-dark px-4 py-16 text-center text-white md:py-20">
        <div className="pointer-events-none absolute top-0 left-1/3 h-48 w-48 rounded-full bg-gold/10 blur-[80px]" />
        <div className="relative mx-auto max-w-xl">
          <h2 className="mb-3 font-display text-2xl font-bold md:text-3xl">
            Stay updated on every seminar and site visit
          </h2>
          <p className="mb-8 text-sm text-white/70">
            Join the member network to receive event invitations and briefings.
          </p>
          <form
            action="/membership"
            className="mx-auto flex max-w-md flex-col gap-2 overflow-hidden sm:flex-row sm:gap-0 sm:rounded-full sm:border sm:border-white/20 sm:bg-white/10"
          >
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/40 focus:border-gold sm:rounded-none sm:border-0 sm:bg-transparent"
            />
            <Link
              href="/membership"
              className="shrink-0 rounded-2xl bg-gold px-6 py-3.5 text-center text-sm font-bold text-navy-deep transition-colors hover:bg-gold-hover sm:rounded-none sm:rounded-r-full"
            >
              Subscribe
            </Link>
          </form>
        </div>
      </section>
    </>
  );
}
