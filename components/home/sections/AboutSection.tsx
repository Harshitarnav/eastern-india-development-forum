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
    <section className="px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <ClipReveal direction="clip">
            <p className="section-eyebrow">{chrome.eyebrow}</p>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-[2.75rem]">
              {chrome.title}
            </h2>
          </ClipReveal>

          <ClipReveal direction="up" delay={0.12} className="mt-5">
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-[15px]">
              {chrome.description}
            </p>
          </ClipReveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <ClipReveal key={v.title} direction="left" delay={0.08 * i}>
                <div className="border-l-2 border-gold pl-4">
                  <h3 className="font-display text-base font-bold text-navy">
                    {v.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {v.desc}
                  </p>
                </div>
              </ClipReveal>
            ))}
          </div>

          <ClipReveal direction="up" delay={0.2} className="mt-10">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 text-sm font-bold text-navy transition-colors hover:text-gold"
              data-cursor="VIEW"
            >
              {cta.label} <ArrowRight className="h-4 w-4" />
            </Link>
          </ClipReveal>
        </div>

        <div className="lg:col-span-5">
          <ClipReveal direction="right">
            <div className="overflow-hidden rounded-sm border border-line bg-white">
              <div className="border-b border-line bg-navy px-5 py-4">
                <h3 className="font-display text-sm font-bold text-white">
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
                    <div className="flex items-center gap-3 px-5 py-4">
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
                        <div className="text-xs text-muted">{leader.role}</div>
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
