"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, IndianRupee } from "lucide-react";
import { motion } from "framer-motion";
import { ClipReveal, usePrefersReducedMotion } from "@/components/motion";
import type { CmsHomepageSettings } from "@/lib/cms/types";

type MembershipCtaSectionProps = {
  chrome: CmsHomepageSettings["membershipCta"];
  floatingMetrics: { label: string; value: string }[];
};

export function MembershipCtaSection({
  chrome,
  floatingMetrics,
}: MembershipCtaSectionProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden px-4 py-20 text-white md:py-28">
      <div className="absolute inset-0 bg-navy-deep" />
      <div className="absolute inset-0 eidf-depth" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald/15 via-transparent to-gold/15" />
      <div className="pointer-events-none absolute inset-0 eidf-grain" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ClipReveal direction="clip">
            <div className="section-eyebrow text-gold">{chrome.eyebrow}</div>
            <h2 className="mt-4 font-display text-display-fluid font-bold tracking-tight">
              {chrome.title}
            </h2>
          </ClipReveal>

          <ClipReveal direction="up" delay={0.1} className="mt-4">
            <p className="max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              {chrome.description}
            </p>
          </ClipReveal>

          <ul className="mt-6 space-y-2.5 text-sm text-white/80">
            {chrome.bullets.map((bullet, i) => (
              <ClipReveal key={bullet} direction="left" delay={0.08 * i}>
                <li className="flex items-center gap-2.5">
                  <CheckCircle className="h-4 w-4 shrink-0 text-emerald" />{" "}
                  {bullet}
                </li>
              </ClipReveal>
            ))}
          </ul>

          <ClipReveal direction="up" delay={0.2} className="mt-9">
            <div className="flex flex-wrap gap-3">
              <Link
                href={chrome.primary.href}
                className="btn-primary"
                data-cursor="EXPLORE"
              >
                {chrome.primary.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={chrome.secondary.href}
                className="btn-secondary"
                data-cursor="VIEW"
              >
                {chrome.secondary.label}
              </Link>
            </div>
          </ClipReveal>
        </div>

        <div className="lg:col-span-5">
          <ClipReveal direction="right" delay={0.12}>
            <div className="rounded-sm border border-white/15 bg-white/5 p-6 backdrop-blur-sm md:p-7">
              <div className="mb-5 flex items-center gap-2 text-gold">
                <IndianRupee className="h-5 w-5" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {chrome.metricsTitle}
                </span>
              </div>
              <div className="space-y-4">
                {floatingMetrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    className="flex items-end justify-between border-b border-white/10 pb-3 last:border-0"
                    initial={reduced ? false : { opacity: 1, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.55,
                      delay: reduced ? 0 : 0.1 * i,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="text-xs text-white/55">{m.label}</span>
                    <span className="font-display text-lg font-bold text-white md:text-xl">
                      {m.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
