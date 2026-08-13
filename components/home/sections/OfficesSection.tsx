"use client";

import { motion } from "framer-motion";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type OfficeItem = {
  city: string;
  tag: string;
  address: string;
  phone?: string;
  email: string;
};

type OfficesSectionProps = {
  offices: OfficeItem[];
  chrome: CmsHomepageSectionCopy;
};

export function OfficesSection({ offices, chrome }: OfficesSectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <ClipReveal direction="up">
          <SectionHeader
            eyebrow={chrome.eyebrow}
            title={chrome.title}
            description={chrome.description}
            align="left"
          />
        </ClipReveal>

        <div className="relative">
          <svg
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px w-full lg:block"
            aria-hidden
          >
            <motion.line
              x1="5%"
              y1="0"
              x2="95%"
              y2="0"
              stroke="var(--gold)"
              strokeWidth="1"
              strokeDasharray="3 8"
              initial={reduced ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.5 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {offices.map((off, i) => (
              <ClipReveal key={off.city} direction="up" delay={0.05 * i}>
                <div className="relative h-full rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(10,31,61,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_16px_36px_-18px_rgba(10,31,61,0.18)]">
                  <motion.span
                    className="absolute -top-1.5 left-5 h-3 w-3 rounded-full bg-gold ring-4 ring-gold/20"
                    animate={
                      reduced
                        ? undefined
                        : { scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }
                    }
                    transition={{
                      duration: 2.6,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                    aria-hidden
                  />
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gold-label">
                    {off.tag}
                  </div>
                  <h4 className="mt-2 font-display text-base font-bold text-navy">
                    {off.city}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {off.address}
                  </p>
                  {off.phone && (
                    <a
                      href={`tel:${off.phone.replace(/\s/g, "")}`}
                      className="mt-3 block text-[11px] font-semibold text-muted hover:text-navy"
                    >
                      {off.phone}
                    </a>
                  )}
                  <a
                    href={`mailto:${off.email}`}
                    className="mt-1 block text-[11px] font-semibold text-navy hover:text-gold"
                  >
                    {off.email}
                  </a>
                </div>
              </ClipReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
