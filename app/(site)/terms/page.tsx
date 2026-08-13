import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/terms", { title: "Terms of Use" });
}

const sections = [
  {
    title: "Informational content",
    body: "Schemes, tenders, investment zones, reports, and analytics are provided for general information and facilitation. They are not legal, financial, or investment advice. Always verify details with the issuing authority before acting.",
  },
  {
    title: "Submissions",
    body: "Contact forms, membership applications, newsletter sign-ups, and proposals must be accurate and submitted in good faith. Submitting a form does not create a contract, guarantee funding, or guarantee government clearances. EIDF may decline or refer requests at its discretion.",
  },
  {
    title: "Acceptable use",
    body: "You may not misuse the site, attempt unauthorised access to admin systems, scrape content at scale, or submit spam, malware, or unlawful material.",
  },
  {
    title: "Intellectual property",
    body: "Site branding, copy, and creative assets belong to EIDF / Umanand Eastern Foundation unless otherwise noted. You may share links for non-commercial reference with attribution.",
  },
  {
    title: "Liability",
    body: "To the fullest extent permitted by law, EIDF is not liable for decisions made solely on the basis of website content, third-party links, or temporary service interruptions.",
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Terms"
        title="Terms of Use"
        description="Conditions for using the Eastern India Development Forum website and related digital services."
        compact
      />
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="border-l-2 border-gold pl-5 text-sm leading-relaxed text-muted md:text-[15px]">
            By accessing eidf.org.in you agree to these terms. If you do not agree, please do
            not use the site. EIDF is a development facilitation platform under Umanand
            Eastern Foundation.
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
                <span className="font-mono text-[11px] font-bold text-gold-label">06</span>
                <h2 className="font-display text-xl font-bold tracking-tight text-navy md:text-2xl">
                  Contact
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-[15px]">
                Questions about these terms:{" "}
                <a
                  href="mailto:info@eidf.org.in"
                  className="font-semibold text-navy hover:text-gold"
                >
                  info@eidf.org.in
                </a>
                . See our{" "}
                <Link href="/privacy" className="font-semibold text-navy hover:text-gold">
                  Privacy Policy
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
