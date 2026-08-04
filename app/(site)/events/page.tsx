import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { PageHero, SectionHeader, CtaBand } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Events & News" };

export default function EventsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Events"
        title="Events & News"
        description="Seminars, investor meets, and announcements shaping Eastern India's development agenda."
      >
        <Link href="/gallery" className="btn-primary">
          View Gallery
        </Link>
        <Link href="/membership" className="btn-secondary">
          Get Event Updates
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Featured"
            title="National Seminar on Inclusive Development"
            align="left"
          />
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            <div className="relative lg:col-span-5 min-h-[280px] overflow-hidden">
              <img
                src="/images/eidf_06.jpg"
                alt="National Seminar"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="lg:col-span-7">
              <h2 className="font-display text-2xl font-bold text-navy md:text-3xl">
                National Seminar on Inclusive Development & Human Rights
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted md:text-[15px]">
                Chief Guest Dr. Justice Bidyut Ranjan Sarangi and fellow dignitaries examined
                equality, dignity and sustainable development for Eastern India at Umanand
                Auditorium, Ranchi.
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-xs font-semibold text-navy/70">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-emerald" /> Umanand Auditorium, Ranchi
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-gold" /> 29 June 2026
                </span>
              </div>
              <Link
                href="/gallery"
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
              >
                View gallery recap <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-cream-warm px-4 py-16">
        <div className="mx-auto max-w-7xl">
          <SectionHeader eyebrow="Upcoming" title="What's next" align="left" />
          <div className="divide-y divide-line border-y border-line">
            {site.upcomingEvents.map((ue) => (
              <div key={ue.title} className="flex items-center justify-between gap-4 py-5">
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-gold shrink-0" />
                  <div className="font-display text-lg font-bold text-navy">{ue.title}</div>
                </div>
                <div className="text-sm font-semibold text-muted shrink-0">{ue.date}</div>
              </div>
            ))}
            {site.events.map((ev) => (
              <div key={ev.id} className="py-6 grid gap-3 sm:grid-cols-12 sm:items-center">
                <div className="sm:col-span-7">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                    {ev.type} · {ev.mode}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold text-navy">{ev.title}</h3>
                  <p className="mt-1 text-sm text-muted">{ev.desc}</p>
                </div>
                <div className="sm:col-span-3 text-xs font-semibold text-muted space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-gold" /> {ev.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald" /> {ev.location}
                  </div>
                </div>
                <div className="sm:col-span-2 sm:text-right">
                  <Link
                    href={ev.registerUrl}
                    className="inline-flex items-center gap-1 text-sm font-bold text-navy hover:text-gold"
                  >
                    Register <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Stay updated on every seminar and site visit"
        description="Join the member network to receive event invitations and briefings."
        primary={{ label: "Become a Member", href: "/membership" }}
        secondary={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
