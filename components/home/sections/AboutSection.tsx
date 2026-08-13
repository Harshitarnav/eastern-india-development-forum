"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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

function leaderImage(leader: LeaderItem) {
  return "image" in leader ? (leader.image as string | undefined) : undefined;
}

export function AboutSection({
  chrome,
  values,
  leaders,
  cta,
}: AboutSectionProps) {
  const [active, setActive] = useState(0);
  const safeActive = leaders.length
    ? Math.min(active, leaders.length - 1)
    : 0;
  const spotlight = leaders[safeActive];

  return (
    <section className="relative overflow-hidden px-4 py-16 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_12%_0%,rgba(61,126,176,0.1),transparent_55%),radial-gradient(ellipse_50%_40%_at_88%_18%,rgba(201,168,75,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <ClipReveal direction="clip">
              <p className="section-eyebrow">{chrome.eyebrow}</p>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-bold tracking-tight text-navy md:text-4xl lg:text-[2.85rem] lg:leading-[1.12] text-balance">
                {chrome.title}
              </h2>
            </ClipReveal>
            <ClipReveal direction="up" delay={0.1} className="mt-5">
              <p className="max-w-xl text-sm leading-relaxed text-muted md:text-[15px] md:leading-7">
                {chrome.description}
              </p>
            </ClipReveal>
          </div>

          <div className="lg:col-span-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {values.map((v, i) => (
                <ClipReveal key={v.title} direction="up" delay={0.05 * i}>
                  <div className="group relative overflow-hidden rounded-2xl border border-navy/8 bg-white/80 px-4 py-4 backdrop-blur-sm transition-all duration-300 hover:border-gold/35 hover:shadow-[0_18px_40px_-28px_rgba(10,31,61,0.3)]">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-lg font-bold tabular-nums text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-sm font-bold text-navy sm:text-[15px]">
                        {v.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {v.desc}
                    </p>
                  </div>
                </ClipReveal>
              ))}
            </div>
          </div>
        </div>

        {/* Photo-free leadership board — brand navy / gold / cream */}
        <ClipReveal direction="up" delay={0.12} className="mt-14 md:mt-16">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line bg-cream shadow-[0_40px_90px_-48px_rgba(8,19,31,0.45)]">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <div className="relative grid lg:grid-cols-12">
              {/* Spotlight — navy stage */}
              <div className="relative flex flex-col justify-between overflow-hidden border-b border-white/10 bg-gradient-to-br from-navy-mid via-navy to-navy-deep p-6 text-white sm:p-8 lg:col-span-5 lg:border-b-0 lg:border-r lg:border-white/10">
                <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-gold/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-brand-blue/20 blur-3xl" />

                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft">
                      Leadership
                    </p>
                    <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight">
                      {chrome.leadersTitle}
                    </h3>
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] font-bold tabular-nums text-gold-soft backdrop-blur-sm">
                    {leaders.length
                      ? `${String(safeActive + 1).padStart(2, "0")} / ${String(leaders.length).padStart(2, "0")}`
                      : "00"}
                  </span>
                </div>

                <div className="relative mt-10 flex flex-1 flex-col items-start">
                  <AnimatePresence mode="wait">
                    {spotlight && (
                      <motion.div
                        key={spotlight.name}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="w-full"
                      >
                        <div className="relative mb-6 inline-block">
                          <motion.span
                            className="absolute -inset-3 rounded-full bg-gold/25 blur-2xl"
                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold-soft via-gold to-gold-hover" />
                          <LeaderAvatar
                            name={spotlight.name}
                            image={leaderImage(spotlight)}
                            className="relative h-28 w-28 bg-cream ring-4 ring-navy-deep sm:h-32 sm:w-32"
                          />
                        </div>

                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-soft/80">
                          Now focusing
                        </p>
                        <h4 className="mt-2 max-w-sm font-display text-2xl font-bold tracking-tight sm:text-3xl">
                          {spotlight.name}
                        </h4>
                        <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/60">
                          {spotlight.role}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  href={cta.href}
                  className="group relative mt-8 inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-b from-gold-soft to-gold px-5 py-2.5 text-xs font-bold text-navy-deep shadow-[0_12px_28px_-14px_rgba(201,168,75,0.85)] transition-transform hover:scale-[1.02]"
                  data-cursor="VIEW"
                >
                  {cta.label}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>

              {/* Roster — cream stage */}
              <div className="bg-cream-warm/60 lg:col-span-7">
                <div className="border-b border-line px-5 py-4 sm:px-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gold-label">
                    Governing council
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Guiding strategy, integrity, and regional partnership across Eastern India.
                  </p>
                </div>

                <div className="p-3 sm:p-4">
                  {leaders.map((leader, i) => {
                    const selected = i === safeActive;
                    return (
                      <button
                        key={leader.name}
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onFocus={() => setActive(i)}
                        onClick={() => setActive(i)}
                        aria-pressed={selected}
                        className={`group relative flex w-full items-center gap-3.5 rounded-2xl px-3 py-3.5 text-left transition-all duration-300 cursor-pointer sm:gap-4 sm:px-4 ${
                          selected
                            ? "bg-white shadow-[0_16px_40px_-24px_rgba(8,19,31,0.28)] ring-1 ring-gold/40"
                            : "hover:bg-white/80"
                        }`}
                      >
                        {selected && (
                          <motion.span
                            layoutId="leader-focus-bar"
                            className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-gold-soft to-gold"
                            transition={{
                              type: "spring",
                              stiffness: 380,
                              damping: 30,
                            }}
                          />
                        )}

                        <span
                          className={`relative shrink-0 rounded-full p-[2px] transition-transform duration-300 ${
                            selected
                              ? "scale-105 bg-gradient-to-br from-gold-soft to-gold"
                              : "bg-line group-hover:bg-gold/30"
                          }`}
                        >
                          <LeaderAvatar
                            name={leader.name}
                            image={leaderImage(leader)}
                            className="h-12 w-12 bg-cream ring-2 ring-white sm:h-14 sm:w-14"
                          />
                        </span>

                        <div className="min-w-0 flex-1">
                          <div
                            className={`truncate font-display text-sm font-bold sm:text-base ${
                              selected ? "text-navy" : "text-navy/80"
                            }`}
                          >
                            {leader.name}
                          </div>
                          <div className="mt-0.5 line-clamp-1 text-xs text-muted">
                            {leader.role}
                          </div>
                        </div>

                        <span
                          className={`hidden font-display text-xs font-bold tabular-nums sm:inline ${
                            selected ? "text-gold-label" : "text-navy/20"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </ClipReveal>
      </div>
    </section>
  );
}
