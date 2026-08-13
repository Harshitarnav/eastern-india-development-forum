import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/privacy", { title: "Privacy Policy" });
}

const sections = [
  {
    title: "Information we collect",
    body: "When you contact us, apply for membership, subscribe to briefings, or submit a proposal, we collect the details you provide — typically name, email, phone, organisation context, and message content. We also receive standard technical logs (IP address, browser type, and pages visited) needed to operate and secure the site.",
  },
  {
    title: "How we use information",
    body: "We use submissions to respond to inquiries, process membership and proposals, send requested briefings, improve services, and meet legal or compliance obligations. We do not sell personal data.",
  },
  {
    title: "Sharing",
    body: "Information may be shared with EIDF officers, authorised partners, or state facilitation desks only when needed to fulfil your request. Service providers that host or process data act under contractual confidentiality.",
  },
  {
    title: "Retention & security",
    body: "We retain records for as long as needed for facilitation, audit, and legal purposes, then delete or anonymise them. Access to admin systems is restricted and protected with authentication controls.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Home / Privacy"
        title="Privacy Policy"
        description="How Eastern India Development Forum collects, uses, and protects information shared through this website."
        compact
      />
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted md:text-[15px]">
            This policy applies to eidf.org.in and related EIDF digital services operated by
            Umanand Eastern Foundation. By using the site you agree to the practices described
            below.
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((section, i) => (
              <article key={section.title} className="border-t border-line pt-8">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-[11px] font-bold text-gold-label">
                    0{i + 1}
                  </span>
                  <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                    {section.title}
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                  {section.body}
                </p>
              </article>
            ))}

            <article className="border-t border-line pt-8">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] font-bold text-gold-label">05</span>
                <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                  Your choices
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                To update, correct, or request deletion of your information, or to unsubscribe
                from briefings, email{" "}
                <a
                  href="mailto:info@eidf.org.in"
                  className="font-semibold text-navy hover:text-gold"
                >
                  info@eidf.org.in
                </a>
                . See also our{" "}
                <Link href="/terms" className="font-semibold text-navy hover:text-gold">
                  Terms of Use
                </Link>
                .
              </p>
            </article>
          </div>

          <p className="mt-12 border-t border-line pt-6 text-xs text-muted/80">
            Last updated: August 2026
          </p>
        </div>
      </section>
    </>
  );
}
