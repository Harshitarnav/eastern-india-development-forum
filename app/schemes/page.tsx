"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Award, CheckCircle, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui";

export default function SchemesPage() {
  return (
    <>
      <PageHero
        crumb="Home / Schemes"
        eyebrow="State & Central Policy Directory"
        title="Government Schemes & Subsidies"
        description="Discover fiscal incentives, capital interest subvention, stamp duty waivers, and innovation seed grants available across Bihar, Jharkhand, Odisha, West Bengal, and Assam."
      >
        <Link
          href="/contact?intent=scheme_assistance"
          className="rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-xl transition-transform hover:scale-105 hover:bg-gold-hover"
        >
          Request Scheme Assistance
        </Link>
        <Link
          href="/resources"
          className="rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/20"
        >
          Browse Policy Reports
        </Link>
      </PageHero>

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Available Schemes"
            title="Incentives matched to your venture"
            description="Curated schemes with clear eligibility, benefits, and a single-window path to apply through EIDF."
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {site.schemes.map((sch) => (
              <div
                key={sch.id}
                className="group flex flex-col justify-between rounded-3xl border border-line bg-white p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span className="rounded-full border border-emerald/20 bg-emerald/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-dark">
                      {sch.category}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-navy-deep">
                      <Award className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mb-2 font-display text-2xl font-bold text-navy">
                    {sch.title}
                  </h3>
                  <div className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-navy/70">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald" />
                    {sch.authority}
                  </div>

                  <div className="mb-5 rounded-2xl border border-gold/30 bg-gold/10 p-4 text-xs font-semibold leading-relaxed text-navy-deep">
                    Benefits: {sch.benefits}
                  </div>

                  <div className="mb-6 space-y-2 text-xs text-muted">
                    <div className="font-bold text-navy">Eligibility Criteria:</div>
                    <ul className="space-y-2">
                      {sch.eligibility.map((el) => (
                        <li key={el} className="flex items-start gap-2">
                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald" />
                          <span>{el}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href="/contact?intent=scheme_assistance"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-navy py-3.5 text-xs font-bold text-white transition-colors hover:bg-navy-light"
                >
                  Apply via Single Window Portal <ArrowRight className="h-3.5 w-3.5 text-gold" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assistance strip */}
      <section className="border-y border-line bg-cream-warm px-4 py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-3xl border border-line bg-white p-8 shadow-lg md:flex-row md:p-10">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald/10 text-emerald">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-navy">
                Need help shortlisting the right scheme?
              </h3>
              <p className="mt-1 text-sm text-muted">
                Our single-window desk maps eligibility, documents, and state clearances for your project.
              </p>
            </div>
          </div>
          <Link
            href="/contact?intent=scheme_assistance"
            className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy-deep shadow-md transition-transform hover:scale-105 hover:bg-gold-hover"
          >
            Talk to an Officer
          </Link>
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
