"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import { SectionHeader } from "@/components/ui";
import type { SchemeItem } from "@/content/site";
import type { CmsHomepageSectionCopy } from "@/lib/cms/types";

type SchemesSectionProps = {
  schemes: SchemeItem[];
  chrome: CmsHomepageSectionCopy;
};

export function SchemesSection({ schemes, chrome }: SchemesSectionProps) {
  const [openId, setOpenId] = useState<string>(schemes[0]?.id || "");
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

        <div className="space-y-2">
          {schemes.map((sch, i) => {
            const open = openId === sch.id;
            return (
              <ClipReveal key={sch.id} direction="up" delay={0.05 * i}>
                <article
                  className={`overflow-hidden rounded-sm border bg-white transition-shadow ${
                    open
                      ? "border-gold/40 shadow-[0_12px_40px_-24px_rgba(10,31,61,0.45)]"
                      : "border-line"
                  }`}
                  style={{
                    transform: open && !reduced ? `translateY(-2px)` : undefined,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? "" : sch.id)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left md:items-center md:gap-6"
                    aria-expanded={open}
                  >
                    <div className="grid flex-1 gap-3 md:grid-cols-12 md:items-center md:gap-6">
                      <div className="md:col-span-5">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-dark">
                          {sch.category}
                        </div>
                        <h3 className="mt-1 font-display text-lg font-bold text-navy">
                          {sch.title}
                        </h3>
                        <p className="mt-1 text-xs text-muted">{sch.authority}</p>
                      </div>
                      <div className="hidden text-sm leading-relaxed text-navy/80 md:col-span-6 md:block">
                        {sch.benefits}
                      </div>
                    </div>
                    <ChevronDown
                      className={`mt-1 h-4 w-4 shrink-0 text-gold transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={
                          reduced
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          reduced
                            ? { opacity: 0 }
                            : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: 0.35,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="overflow-hidden border-t border-line/70"
                      >
                        <div className="grid gap-4 px-5 py-4 md:grid-cols-12 md:items-end">
                          <p className="text-sm leading-relaxed text-navy/80 md:col-span-8 md:hidden">
                            {sch.benefits}
                          </p>
                          <div className="text-xs text-muted md:col-span-8">
                            <span className="font-bold text-navy">Eligibility · </span>
                            {sch.eligibility?.slice(0, 2).join(" · ")}
                            {sch.deadline ? ` · Deadline: ${sch.deadline}` : ""}
                          </div>
                          <div className="md:col-span-4 md:text-right">
                            <Link
                              href="/schemes"
                              className="inline-flex items-center gap-1 text-xs font-bold text-navy hover:text-gold"
                            >
                              Details <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </ClipReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
