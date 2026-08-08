import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/terms", { title: "Terms of Use" });
}

export default function TermsPage() {
  return (
    <>
      <PageHero
        crumb="Home / Terms"
        title="Terms of Use"
        description="Conditions for using the Eastern India Development Forum website and related digital services."
        compact
      />
      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          <p>
            By accessing eidf.org.in you agree to these terms. If you do not agree, please do
            not use the site. EIDF is a development facilitation platform under Umanand
            Eastern Foundation.
          </p>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Informational content</h2>
            <p className="mt-2">
              Schemes, tenders, investment zones, reports, and analytics are provided for
              general information and facilitation. They are not legal, financial, or
              investment advice. Always verify details with the issuing authority before
              acting.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Submissions</h2>
            <p className="mt-2">
              Contact forms, membership applications, newsletter sign-ups, and proposals must
              be accurate and submitted in good faith. Submitting a form does not create a
              contract, guarantee funding, or guarantee government clearances. EIDF may
              decline or refer requests at its discretion.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Acceptable use</h2>
            <p className="mt-2">
              You may not misuse the site, attempt unauthorised access to admin systems,
              scrape content at scale, or submit spam, malware, or unlawful material.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Intellectual property</h2>
            <p className="mt-2">
              Site branding, copy, and creative assets belong to EIDF / Umanand Eastern
              Foundation unless otherwise noted. You may share links for non-commercial
              reference with attribution.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, EIDF is not liable for decisions made
              solely on the basis of website content, third-party links, or temporary
              service interruptions.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{" "}
              <a href="mailto:info@eidf.org.in" className="font-semibold text-navy hover:text-gold">
                info@eidf.org.in
              </a>
              . See our{" "}
              <Link href="/privacy" className="font-semibold text-navy hover:text-gold">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <p className="text-xs text-muted/80">Last updated: August 2026</p>
        </div>
      </section>
    </>
  );
}
