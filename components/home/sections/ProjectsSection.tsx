"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import { cmsMediaUrl } from "@/lib/cms/home-preview";
import type { ProjectItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type ProjectsSectionProps = {
  projects: ProjectItem[];
  chrome: CmsHomepageSectionCopy;
};

export function ProjectsSection({ projects, chrome }: ProjectsSectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-24">
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
                href={chrome.ctaHref || "/projects"}
                className="btn-navy !px-5 !py-2.5 text-xs"
                data-cursor="VIEW"
              >
                {chrome.ctaLabel}{" "}
                <ArrowRight className="h-3.5 w-3.5 text-gold" />
              </Link>
            </ClipReveal>
          )}
        </div>

        {/* Mobile: vertical full-bleed scenes */}
        <div className="flex flex-col gap-4 md:hidden">
          {projects.map((proj, idx) => (
            <ClipReveal key={proj.id} direction="up" delay={0.05 * idx}>
              <Link
                href="/projects"
                className="group relative block min-h-[260px] overflow-hidden rounded-sm"
                data-cursor="VIEW"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cmsMediaUrl(proj.image, `/images/eidf_0${idx + 1}.jpg`)}
                  alt={proj.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                    {proj.tag}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold">
                    {proj.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-white/70">
                    {proj.desc}
                  </p>
                </div>
              </Link>
            </ClipReveal>
          ))}
        </div>

        {/* Desktop: horizontal snap scroll */}
        <div className="relative -mx-4 hidden md:block">
          <div
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:thin]"
            data-cursor="VIEW"
          >
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                className="w-[min(72vw,560px)] shrink-0 snap-center"
                initial={reduced ? false : { opacity: 1, x: 36 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: reduced ? 0 : idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href="/projects"
                  className="group relative block min-h-[420px] overflow-hidden rounded-sm lg:min-h-[480px]"
                  data-cursor="VIEW"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cmsMediaUrl(
                      proj.image,
                      `/images/eidf_0${idx + 1}.jpg`
                    )}
                    alt={proj.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-white lg:p-8">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-gold">
                      {proj.tag} · {proj.state}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold lg:text-3xl">
                      {proj.title}
                    </h3>
                    <p className="mt-2 max-w-lg line-clamp-2 text-sm text-white/70">
                      {proj.desc}
                    </p>
                    <div className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                      {proj.status} · {proj.budget}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
