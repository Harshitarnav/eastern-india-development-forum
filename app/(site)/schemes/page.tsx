import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";
import { site } from "@/content/site";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export const metadata: Metadata = { title: "Schemes" };

export default function SchemesPage() {
  return (
    <>
      <PageHero
        crumb="Home / Schemes"
        title="Government Schemes & Subsidies"
        description="Fiscal incentives, interest subvention, stamp duty waivers, and seed grants across Eastern Indian states."
      >
        <Link href="/contact?intent=scheme_assistance" className="btn-primary">
          Request Scheme Assistance
        </Link>
        <Link href="/resources" className="btn-secondary">
          Browse Policy Reports
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Available Schemes"
            title="Incentives matched to your venture"
            align="left"
          />

          <div className="divide-y divide-line border-y border-line">
            {site.schemes.map((sch) => (
              <article key={sch.id} className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-4">
                  <div className="text-[11px] font-bold uppercase tracking-widest text-emerald-dark">
                    {sch.category}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy">{sch.title}</h3>
                  <p className="mt-2 text-sm text-muted">{sch.authority}</p>
                </div>

                <div className="lg:col-span-5">
                  <div className="border-l-2 border-gold pl-4 mb-5">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-gold-label">Benefits</div>
                    <p className="mt-1 text-sm font-medium text-navy leading-relaxed">{sch.benefits}</p>
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-muted mb-2">
                    Eligibility
                  </div>
                  <ul className="space-y-1.5">
                    {sch.eligibility.map((el) => (
                      <li key={el} className="flex items-start gap-2 text-sm text-muted">
                        <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3 flex lg:justify-end lg:items-start">
                  <Link
                    href="/contact?intent=scheme_assistance"
                    className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition-colors"
                  >
                    Apply via EIDF <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to unlock state incentives?"
        description="Submit your project profile and let EIDF facilitate scheme applications across Eastern India."
        primary={{ label: "Request Assistance", href: "/contact?intent=scheme_assistance" }}
        secondary={{ label: "Submit a Proposal", href: "/proposals/submit" }}
      />
    </>
  );
}
