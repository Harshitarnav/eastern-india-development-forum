import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/ui";
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
      <PageHero crumb="Home / Contact" title="Get in Touch" compact />

      <section className="px-6 py-14 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.3fr_1fr]">
          <ContactForm defaultSubject={defaultSubject} />

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-navy p-7 text-white">
              <div className="mb-3.5 font-display text-[17px]">Head Office</div>
              <div className="text-[13px] leading-relaxed text-white/80">
                {site.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
              <div className="mt-3 text-[13px] text-white/80">
                {site.email}
                <br />
                {site.phone}
              </div>
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <div className="mb-4 text-xs font-bold tracking-[1.5px] text-gold-label">
                ALSO PRESENT IN
              </div>
              <div className="flex flex-col gap-3">
                {site.offices.map((o) => (
                  <div
                    key={o.city}
                    className="flex items-center justify-between border-b border-line py-2 last:border-0"
                  >
                    <span className="font-display text-[15px]">{o.city}</span>
                    <span className="text-xs text-muted">{o.tag}</span>
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
