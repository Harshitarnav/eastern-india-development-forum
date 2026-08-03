import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, SectionHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Contact" };

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const params = await searchParams;
  const defaultSubject = params.intent === "donate" ? "Funding" : "Membership";

  return (
    <>
      <PageHero
        crumb="Home / Contact"
        eyebrow="Get in Touch"
        title="We're here to help"
        description="Reach the EIDF secretariat for membership, funding, media, or partnership inquiries across Eastern India."
        compact
      />

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.35fr_1fr]">
          <ContactForm defaultSubject={defaultSubject} />

          <div className="flex flex-col gap-5">
            {/* Head Office */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-deep via-navy to-slate-dark p-8 text-white shadow-xl">
              <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-gold/15 blur-2xl" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-gold">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="mb-3 font-display text-xl font-bold">Head Office</div>
              <div className="space-y-1 text-sm leading-relaxed text-white/75">
                {site.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4 text-gold" /> {site.email}
                </a>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4 text-emerald" /> {site.phone}
                </a>
              </div>
            </div>

            {/* Regional Offices */}
            <div className="rounded-3xl border border-line bg-white p-7 shadow-lg">
              <div className="mb-5 text-xs font-bold uppercase tracking-[2px] text-gold">
                Also Present In
              </div>
              <div className="flex flex-col gap-1">
                {site.offices.map((o) => (
                  <div
                    key={o.city}
                    className="flex items-center justify-between gap-3 border-b border-line py-3.5 last:border-0"
                  >
                    <div>
                      <div className="font-display text-base font-bold text-navy">
                        {o.city}
                      </div>
                      <div className="mt-0.5 text-[11px] text-muted">{o.tag}</div>
                    </div>
                    <MapPin className="h-4 w-4 shrink-0 text-emerald" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Grid */}
      <section className="border-t border-line bg-cream-warm px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Regional Directory"
            title="Find your nearest EIDF office"
            description="State cells across Eastern India ready to assist with membership, investment, and project facilitation."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {site.offices.map((off) => (
              <div
                key={off.city}
                className="rounded-3xl border border-line bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                  {off.tag}
                </span>
                <h4 className="mt-3 font-display text-lg font-bold text-navy">{off.city}</h4>
                <p className="mt-2 text-xs leading-relaxed text-muted">{off.address}</p>
                <div className="mt-3 text-[11px] font-semibold text-navy">{off.email}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
