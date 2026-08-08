import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/privacy", { title: "Privacy Policy" });
}

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        crumb="Home / Privacy"
        title="Privacy Policy"
        description="How Eastern India Development Forum collects, uses, and protects information shared through this website."
        compact
      />
      <section className="px-4 py-14 md:py-16">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-muted">
          <p>
            This policy applies to eidf.org.in and related EIDF digital services operated by
            Umanand Eastern Foundation. By using the site you agree to the practices described
            below.
          </p>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Information we collect</h2>
            <p className="mt-2">
              When you contact us, apply for membership, subscribe to briefings, or submit a
              proposal, we collect the details you provide — typically name, email, phone,
              organisation context, and message content. We also receive standard technical
              logs (IP address, browser type, and pages visited) needed to operate and secure
              the site.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">How we use information</h2>
            <p className="mt-2">
              We use submissions to respond to inquiries, process membership and proposals,
              send requested briefings, improve services, and meet legal or compliance
              obligations. We do not sell personal data.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Sharing</h2>
            <p className="mt-2">
              Information may be shared with EIDF officers, authorised partners, or state
              facilitation desks only when needed to fulfil your request. Service providers
              that host or process data act under contractual confidentiality.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Retention &amp; security</h2>
            <p className="mt-2">
              We retain records for as long as needed for facilitation, audit, and legal
              purposes, then delete or anonymise them. Access to admin systems is restricted
              and protected with authentication controls.
            </p>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-navy">Your choices</h2>
            <p className="mt-2">
              To update, correct, or request deletion of your information, or to unsubscribe
              from briefings, email{" "}
              <a href="mailto:info@eidf.org.in" className="font-semibold text-navy hover:text-gold">
                info@eidf.org.in
              </a>
              . See also our{" "}
              <Link href="/terms" className="font-semibold text-navy hover:text-gold">
                Terms of Use
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
