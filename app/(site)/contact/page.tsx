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
        title="We're here to help"
        description="Reach the EIDF secretariat for membership, funding, media, or partnership inquiries."
        compact
      />

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm defaultSubject={defaultSubject} />
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-navy-deep p-7 text-white">
              <div className="text-[11px] font-bold uppercase tracking-widest text-gold">Head Office</div>
              <div className="mt-4 space-y-1 text-sm leading-relaxed text-white/75">
                {site.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              <div className="mt-5 space-y-2.5 border-t border-white/10 pt-5 text-sm">
                <a href={`mailto:${site.email}`} className="flex items-center gap-2.5 text-white/80 hover:text-gold transition-colors">
                  <Mail className="h-4 w-4 text-gold" /> {site.email}
                </a>
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="flex items-center gap-2.5 text-white/80 hover:text-gold transition-colors">
                  <Phone className="h-4 w-4 text-emerald" /> {site.phone}
                </a>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Regional Offices" title="Also present in" align="left" />
              <div className="divide-y divide-line border-y border-line -mt-4">
                {site.offices.map((o) => (
                  <div key={o.city} className="flex items-start justify-between gap-3 py-4">
                    <div>
                      <div className="font-display text-base font-bold text-navy">{o.city}</div>
                      <div className="mt-0.5 text-xs text-muted">{o.tag}</div>
                      <div className="mt-1 text-xs text-muted leading-relaxed">{o.address}</div>
                    </div>
                    <MapPin className="h-4 w-4 shrink-0 text-emerald mt-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
