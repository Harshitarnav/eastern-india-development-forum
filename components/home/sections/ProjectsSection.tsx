"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import { cmsMediaUrl } from "@/lib/cms/home-preview";
import type { ProjectItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type ProjectsSectionProps = {
  projects: ProjectItem[];
  chrome: CmsHomepageSectionCopy;
};

export function ProjectsSection({ projects, chrome }: ProjectsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const total = projects.length;

  const updateIndex = useCallback(() => {
    const el = scrollerRef.current;
    if (!el || !el.children.length) return;
    const first = el.children[0] as HTMLElement;
    const gap = 20;
    const cardWidth = first.offsetWidth + gap;
    if (!cardWidth) return;
    const next = Math.round(el.scrollLeft / cardWidth);
    setIndex(Math.max(0, Math.min(total - 1, next)));
  }, [total]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateIndex, { passive: true });
    window.addEventListener("resize", updateIndex);
    return () => {
      el.removeEventListener("scroll", updateIndex);
      window.removeEventListener("resize", updateIndex);
    };
  }, [updateIndex]);

  const scrollTo = (next: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const bounded = ((next % total) + total) % total;
    const child = el.children[bounded] as HTMLElement | undefined;
    if (!child) return;
    const left =
      child.getBoundingClientRect().left -
      el.getBoundingClientRect().left +
      el.scrollLeft;
    el.scrollTo({ left, behavior: "smooth" });
    setIndex(bounded);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollTo(index - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollTo(index + 1);
    }
  };

  return (
    <section className="border-y border-line bg-cream-warm px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <ClipReveal direction="up">
            <SectionHeader
              eyebrow={chrome.eyebrow}
              title={chrome.title}
              align="left"
              className="!mb-0"
            />
          </ClipReveal>
          <div className="flex items-center gap-3">
            {chrome.ctaLabel && (
              <Link
                href={chrome.ctaHref || "/projects"}
                className="eidf-link text-sm"
                data-cursor="VIEW"
              >
                {chrome.ctaLabel}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
            {total > 1 && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollTo(index - 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-gold hover:text-gold"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span
                  className="min-w-[3rem] text-center text-xs font-bold tabular-nums text-navy"
                  aria-live="polite"
                >
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={() => scrollTo(index + 1)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy/15 bg-white text-navy transition-colors hover:border-gold hover:text-gold"
                  aria-label="Next project"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label={chrome.title || "Flagship projects"}
          onKeyDown={onKeyDown}
        >
          <div
            ref={scrollerRef}
            tabIndex={0}
            className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain pb-1 outline-none touch-pan-x"
          >
            {projects.map((proj, idx) => (
              <article
                key={proj.id}
                className="w-[min(88vw,340px)] shrink-0 snap-start sm:w-[min(72vw,480px)] md:w-[min(58vw,520px)]"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${total}`}
              >
                <Link
                  href="/projects"
                  className="group relative block min-h-[280px] overflow-hidden rounded-xl sm:min-h-[360px] md:min-h-[420px] lg:min-h-[460px]"
                  data-cursor="VIEW"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cmsMediaUrl(proj.image, `/images/eidf_0${idx + 1}.jpg`)}
                    alt={proj.title}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/45 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 lg:p-8">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gold sm:text-[11px]">
                      {proj.tag}
                      {proj.state ? ` · ${proj.state}` : ""}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
                      {proj.title}
                    </h3>
                    <p className="mt-2 max-w-lg line-clamp-2 text-[13px] text-white/75 sm:text-sm">
                      {proj.desc}
                    </p>
                    <div className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-white/50">
                      {proj.status}
                      {proj.budget ? ` · ${proj.budget}` : ""}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {total > 1 && (
            <div className="mt-5 flex justify-center gap-1.5 md:hidden">
              {projects.map((proj, i) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => scrollTo(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-navy" : "w-1.5 bg-navy/25"
                  }`}
                  aria-label={`Go to project ${i + 1}`}
                  aria-current={i === index}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
