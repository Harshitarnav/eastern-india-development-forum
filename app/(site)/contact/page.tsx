import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, SectionHeader } from "@/components/ui";
import { getPublicCmsBundle } from "@/lib/cms/server";
import { buildPageMetadata } from "@/lib/cms/seo";
import { sanitizeTel, subjectFromIntent } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/contact", { title: "Contact" });
}

function messageFromParams(params: {
  intent?: string;
  zone?: string;
  ref?: string;
}) {
  const bits: string[] = [];
  if (params.zone) bits.push(`Investment zone of interest: ${params.zone}.`);
  if (params.ref) bits.push(`Reference: ${params.ref}.`);
  if (params.intent === "event_register") {
    bits.push("I would like to register / request an invite for an upcoming EIDF event.");
  }
  if (params.intent === "report_request") {
    bits.push("Please share the requested research report / briefing.");
  }
  if (params.intent === "tender" || params.intent === "tender_guidance") {
    bits.push("I need tender documentation guidance and eligibility support.");
  }
  return bits.join(" ");
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; zone?: string; ref?: string }>;
}) {
  const { site } = await getPublicCmsBundle();
  const params = await searchParams;
  const defaultSubject = subjectFromIntent(params.intent);
  const defaultMessage = messageFromParams(params);

  return (
    <>
      <PageHero
        crumb="Home / Contact"
        title="We're here to help"
        description="Reach the EIDF secretariat for membership, funding, media, or partnership inquiries."
        compact
      />

      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <ContactForm defaultSubject={defaultSubject} defaultMessage={defaultMessage} />
          </div>

          <div className="space-y-8 lg:col-span-5">
            <div className="relative overflow-hidden eidf-panel-dark p-7 text-white eidf-grain md:p-8">
              <div className="pointer-events-none absolute inset-0 eidf-depth opacity-90" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-gold" aria-hidden />
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                    Head Office
                  </div>
                </div>
                <div className="mt-5 space-y-1 text-sm leading-relaxed text-white/75">
                  {site.address.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-gold"
                  >
                    <Mail className="h-4 w-4 text-gold" /> {site.email}
                  </a>
                  <a
                    href={`tel:${sanitizeTel(site.phone)}`}
                    className="flex items-center gap-2.5 text-white/80 transition-colors hover:text-gold"
                  >
                    <Phone className="h-4 w-4 text-emerald" /> {site.phone}
                  </a>
                </div>
              </div>
            </div>

            <div>
              <SectionHeader eyebrow="Regional Offices" title="Also present in" align="left" />
              <div className="-mt-4 divide-y divide-line border-y border-line">
                {site.offices.map((o) => (
                  <div key={o.city} className="flex items-start justify-between gap-3 py-4">
                    <div>
                      <div className="font-display text-base font-bold text-navy">{o.city}</div>
                      <div className="mt-0.5 text-xs text-muted">{o.tag}</div>
                      <div className="mt-1 text-xs leading-relaxed text-muted">{o.address}</div>
                    </div>
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-emerald" />
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
