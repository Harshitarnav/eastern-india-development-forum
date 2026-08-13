"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ClipReveal } from "@/components/motion";
import { LeaderAvatar } from "@/components/LeaderAvatar";
import type { CmsHomepageSettings } from "@/lib/cms/types";

type ValueItem = { title: string; desc: string };
type LeaderItem = { name: string; role: string; image?: string };

type AboutSectionProps = {
  chrome: CmsHomepageSettings["about"];
  values: ValueItem[];
  leaders: LeaderItem[];
  cta: { label: string; href: string };
};

export function AboutSection({
  chrome,
  values,
  leaders,
  cta,
}: AboutSectionProps) {
  return (
    <section className="relative px-4 py-16 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cream/80 to-transparent" />
      <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ClipReveal direction="clip">
            <p className="section-eyebrow">{chrome.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-[2.75rem] text-balance">
              {chrome.title}
            </h2>
          </ClipReveal>

          <ClipReveal direction="up" delay={0.12} className="mt-5">
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-[15px] md:leading-relaxed">
              {chrome.description}
            </p>
          </ClipReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <ClipReveal key={v.title} direction="left" delay={0.08 * i}>
                <div className="group rounded-xl border border-line bg-white p-5 shadow-[0_1px_2px_rgba(10,31,61,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:shadow-[0_14px_32px_-18px_rgba(10,31,61,0.16)]">
                  <div className="mb-3 h-0.5 w-8 bg-gold transition-all duration-300 group-hover:w-12" />
                  <h3 className="font-display text-base font-bold text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted md:text-[13px]">
                    {v.desc}
                  </p>
                </div>
              </ClipReveal>
            ))}
          </div>

          <ClipReveal direction="up" delay={0.2} className="mt-10">
            <Link href={cta.href} className="eidf-link text-sm" data-cursor="VIEW">
              {cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </ClipReveal>
        </div>

        <div className="lg:col-span-5">
          <ClipReveal direction="right">
            <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_2px_rgba(10,31,61,0.04),0_20px_40px_-24px_rgba(10,31,61,0.18)]">
              <div className="border-b border-white/10 bg-navy px-6 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold/80">
                  Leadership
                </p>
                <h3 className="mt-1 font-display text-base font-bold text-white">
                  {chrome.leadersTitle}
                </h3>
              </div>
              <div className="divide-y divide-line">
                {leaders.map((leader, i) => (
                  <ClipReveal
                    key={leader.name}
                    direction="up"
                    delay={0.06 * i}
                  >
                    <div className="flex items-center gap-3.5 px-5 py-4 transition-colors hover:bg-cream/60">
                      <LeaderAvatar
                        name={leader.name}
                        image={
                          "image" in leader
                            ? (leader.image as string | undefined)
                            : undefined
                        }
                      />
                      <div>
                        <div className="text-sm font-bold text-navy">
                          {leader.name}
                        </div>
                        <div className="mt-0.5 text-xs text-muted">
                          {leader.role}
                        </div>
                      </div>
                    </div>
                  </ClipReveal>
                ))}
              </div>
            </div>
          </ClipReveal>
        </div>
      </div>
    </section>
  );
}
