"use client";

import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calendar,
  ClipboardCheck,
  Gift,
  Landmark,
  MapPin,
} from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { SchemeItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";
import { displayCmsText } from "@/lib/cms/home-preview";

type SchemesSectionProps = {
  schemes: SchemeItem[];
  chrome: CmsHomepageSectionCopy;
};

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Landmark;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-navy/8 bg-white/90 px-4 py-3.5">
      <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.14em] text-gold-label">
        <Icon className="h-3.5 w-3.5 text-gold" aria-hidden />
        {label}
      </div>
      <p className="mt-1.5 text-sm font-medium leading-snug text-navy">
        {value}
      </p>
    </div>
  );
}

export function SchemesSection({ schemes, chrome }: SchemesSectionProps) {
  const scheme = schemes[0];

  return (
    <section id="schemes" className="relative overflow-hidden px-4 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_8%_0%,rgba(61,126,176,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <ClipReveal direction="up">
            <SectionHeader
              eyebrow={chrome.eyebrow}
              title={chrome.title}
              align="left"
              className="!mb-0"
            />
          </ClipReveal>
          {chrome.ctaLabel && (
            <ClipReveal direction="right" className="shrink-0">
              <Link
                href={chrome.ctaHref || "/schemes"}
                className="btn-navy !px-5 !py-2.5 text-xs"
                data-cursor="VIEW"
              >
                {chrome.ctaLabel}{" "}
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </Link>
            </ClipReveal>
          )}
        </div>

        <ClipReveal direction="up" delay={0.08} className="w-full">
          <article className="relative overflow-hidden rounded-[1.75rem] border border-line bg-cream shadow-[0_40px_90px_-48px_rgba(8,19,31,0.45)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="relative flex flex-col gap-6 overflow-hidden bg-gradient-to-br from-navy-mid via-navy to-navy-deep p-6 text-white sm:flex-row sm:items-end sm:justify-between sm:p-8 lg:col-span-5 lg:min-h-full lg:flex-col lg:items-start lg:justify-between">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gold/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-14 -left-8 h-44 w-44 rounded-full bg-gold/10 blur-3xl" />

                <div className="relative min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft">
                    Featured programme
                  </p>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-soft/80">
                    {displayCmsText(scheme?.category, "Category")}
                  </p>
                  <h3 className="mt-2 max-w-sm font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {displayCmsText(scheme?.title)}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                    Authority · {displayCmsText(scheme?.authority)}
                  </p>
                </div>

                <Link
                  href="/schemes"
                  className="group relative inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-gold-soft to-gold px-5 py-2.5 text-xs font-bold text-navy-deep shadow-[0_12px_28px_-14px_rgba(201,168,75,0.85)] transition-transform hover:scale-[1.02]"
                  data-cursor="VIEW"
                >
                  Programme details
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              <div className="min-w-0 bg-cream-warm/60 p-5 sm:p-7 lg:col-span-7">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-label">
                  Programme snapshot
                </p>
                <p className="mt-1 text-xs text-muted">
                  Benefits, eligibility, coverage, and how to apply.
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Fact
                    icon={Gift}
                    label="Benefits"
                    value={displayCmsText(scheme?.benefits)}
                  />
                  <Fact
                    icon={ClipboardCheck}
                    label="Eligibility"
                    value={displayCmsText(
                      (scheme?.eligibility || []).filter(Boolean).join(" · ")
                    )}
                  />
                  <Fact
                    icon={Calendar}
                    label="Deadline"
                    value={displayCmsText(scheme?.deadline)}
                  />
                  <Fact
                    icon={MapPin}
                    label="State"
                    value={displayCmsText(scheme?.state)}
                  />
                  <Fact
                    icon={Building2}
                    label="Authority"
                    value={displayCmsText(scheme?.authority)}
                  />
                  <Fact
                    icon={Landmark}
                    label="How to apply"
                    value={displayCmsText(scheme?.applicationProcess)}
                  />
                </div>
              </div>
            </div>
          </article>
        </ClipReveal>
      </div>
    </section>
  );
}
