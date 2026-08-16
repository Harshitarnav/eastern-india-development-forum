"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { InvestmentZone } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type InvestorsSectionProps = {
  zones: InvestmentZone[];
  chrome: CmsHomepageSectionCopy;
};

export function InvestorsSection({ zones, chrome }: InvestorsSectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-2 flex flex-wrap items-end justify-between gap-4">
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
                href={chrome.ctaHref || "/investors"}
                className="btn-navy !px-5 !py-2.5 text-xs"
                data-cursor="VIEW"
              >
                {chrome.ctaLabel}{" "}
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </Link>
            </ClipReveal>
          )}
        </div>

        <div className="relative overflow-hidden rounded-xl border border-line bg-white">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            aria-hidden
          >
            {zones.length > 1 &&
              zones.slice(0, -1).map((zone, i) => {
                const x1 = 12 + i * (76 / Math.max(zones.length - 1, 1));
                const x2 = 12 + (i + 1) * (76 / Math.max(zones.length - 1, 1));
                return (
                  <motion.line
                    key={`${zone.id}-line`}
                    x1={`${x1}%`}
                    y1="28"
                    x2={`${x2}%`}
                    y2="28"
                    stroke="var(--gold)"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    initial={reduced ? false : { pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.55 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.15 * i }}
                  />
                );
              })}
          </svg>

          <div className="relative divide-y divide-line">
            {zones.map((zone, i) => (
              <ClipReveal key={zone.id} direction="up" delay={0.06 * i}>
                <div className="grid gap-4 p-5 md:grid-cols-12 md:items-center md:p-6">
                  <div className="flex items-start gap-3 md:col-span-4">
                    <motion.span
                      className="mt-1 flex h-3 w-3 shrink-0 rounded-full bg-emerald ring-4 ring-emerald/20"
                      animate={
                        reduced
                          ? undefined
                          : { scale: [1, 1.25, 1], opacity: [1, 0.75, 1] }
                      }
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      aria-hidden
                    />
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                        {zone.state} · {zone.area}
                      </div>
                      <h3 className="mt-1 font-display text-lg font-bold text-navy">
                        {zone.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-1 text-xs text-muted">
                        <MapPin className="h-3 w-3 text-emerald" />{" "}
                        {zone.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:col-span-5">
                    {zone.focusIndustries.map((ind) => (
                      <span
                        key={ind}
                        className="rounded-md border border-line bg-cream px-2.5 py-1 text-[11px] font-semibold text-navy"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <Link
                      href="/investors"
                      className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-gold"
                      data-cursor="EXPLORE"
                    >
                      View zone <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </ClipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
