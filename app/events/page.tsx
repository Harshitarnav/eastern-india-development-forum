import type { Metadata } from "next";
import Link from "next/link";
import { Eyebrow, PageHero, PlaceholderMedia } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Events & News" };

export default function EventsPage() {
  return (
    <>
      <PageHero crumb="Home / Events & News" title="Events & News" />

      <section className="px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-line bg-white md:flex">
          <PlaceholderMedia
            label="SEMINAR — Chief Guest lighting the lamp"
            className="min-h-[220px] md:w-[420px] md:shrink-0"
          />
          <div className="flex flex-1 flex-col justify-center p-6 md:p-9">
            <div className="mb-2.5 text-xs text-muted">FEATURED · 29 JUNE 2026</div>
            <h2 className="mb-3.5 font-display text-xl md:text-[23px]">
              National Seminar on Inclusive Development & Human Rights
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted">
              Chief Guest Dr. Justice Bidyut Ranjan Sarangi and fellow dignitaries examined
              equality, dignity and sustainable development for Eastern India at Umanand
              Auditorium, Ranchi.
            </p>
            <Link href="/gallery" className="text-sm font-semibold text-navy">
              Read full recap →
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Eyebrow>FROM THE SEMINAR</Eyebrow>
            <Link href="/gallery" className="text-sm font-semibold text-navy">
              View full gallery →
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {site.galleryThumbs.slice(0, 3).map((gp) => (
              <PlaceholderMedia
                key={gp.label}
                label={gp.label}
                className="min-h-[200px] rounded-[10px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>UPCOMING</Eyebrow>
          <div className="mt-4">
            {site.upcomingEvents.map((ue) => (
              <div
                key={ue.title}
                className="flex items-center justify-between gap-4 border-b border-line py-4"
              >
                <div className="font-display text-base md:text-[17px]">{ue.title}</div>
                <div className="text-sm text-muted">{ue.date}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-deep px-6 py-14 text-center">
        <div className="mb-4 font-display text-lg text-white md:text-[19px]">
          Stay updated on every seminar and site visit
        </div>
        <form
          action="/membership"
          className="mx-auto flex max-w-md overflow-hidden rounded-full"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="min-w-0 flex-1 bg-navy px-5 py-3 text-sm text-white outline-none placeholder:text-white/40"
          />
          <Link
            href="/membership"
            className="bg-gold px-5 py-3 text-sm font-bold text-navy-deep"
          >
            Subscribe
          </Link>
        </form>
      </section>
    </>
  );
}
