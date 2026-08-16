"use client";

import React from "react";
import {
  Truck,
  Zap,
  Building2,
  Cpu,
  GraduationCap,
  Sprout,
  Compass,
} from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { FocusArea } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

const focusIcons: Record<string, React.ReactNode> = {
  Truck: <Truck className="h-5 w-5" />,
  Zap: <Zap className="h-5 w-5" />,
  Factory: <Building2 className="h-5 w-5" />,
  Cpu: <Cpu className="h-5 w-5" />,
  GraduationCap: <GraduationCap className="h-5 w-5" />,
  Sprout: <Sprout className="h-5 w-5" />,
  Compass: <Compass className="h-5 w-5" />,
  Building2: <Building2 className="h-5 w-5" />,
};

type SectorsSectionProps = {
  chrome: CmsHomepageSectionCopy;
  focusAreas: FocusArea[];
};

export function SectorsSection({ chrome, focusAreas }: SectorsSectionProps) {
  return (
    <section
      id="focus-areas"
      className="relative border-y border-line bg-cream-warm px-4 py-16 md:py-24 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy/10 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <ClipReveal direction="up">
          <SectionHeader
            eyebrow={chrome.eyebrow}
            title={chrome.title}
            description={chrome.description}
            align="left"
          />
        </ClipReveal>

        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {focusAreas.map((fa, i) => {
            const featured = i === 0;
            return (
              <ClipReveal
                key={fa.id}
                direction="scale"
                delay={0.05 * i}
                className={
                  featured
                    ? "sm:col-span-2 sm:row-span-1 lg:col-span-2 lg:row-span-2"
                    : ""
                }
              >
                <article
                  className={`group relative h-full overflow-hidden rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(10,31,61,0.03)] transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgba(10,31,61,0.2)] md:p-6 ${
                    featured ? "min-h-[280px] lg:min-h-full lg:p-8" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-0 bg-navy transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:w-full"
                  />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-navy text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-navy">
                      {focusIcons[fa.iconName] || (
                        <Building2 className="h-5 w-5" />
                      )}
                    </div>
                    <div className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-gold-label transition-colors group-hover:text-gold">
                      {fa.tag}
                    </div>
                    <h3
                      className={`font-display font-bold leading-snug text-navy transition-colors group-hover:text-white ${
                        featured ? "text-2xl md:text-3xl" : "text-base"
                      }`}
                    >
                      {fa.title}
                    </h3>
                    <p
                      className={`mt-2.5 leading-relaxed text-muted transition-colors group-hover:text-white/70 ${
                        featured
                          ? "text-sm line-clamp-4 md:text-[15px]"
                          : "text-xs line-clamp-3"
                      }`}
                    >
                      {fa.desc}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-bold text-emerald-dark transition-colors group-hover:text-emerald">
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {fa.activeProjects} active projects
                    </div>
                  </div>
                </article>
              </ClipReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
