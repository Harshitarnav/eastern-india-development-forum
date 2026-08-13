"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useMagnetic, useAllowMotion } from "@/components/motion";
import { cmsMediaUrl } from "@/lib/cms/home-preview";

type HeroCta = { label: string; href: string };

type HeroSectionProps = {
  site: {
    name: string;
    logo?: string;
    poweredBy: string;
    regNo: string;
    hero: {
      eyebrow: string;
      headline: string;
      subheading: string;
      image?: string;
      ctas: {
        primary: HeroCta;
        secondary: HeroCta;
        tertiary?: HeroCta;
      };
    };
  };
};

export function HeroSection({ site }: HeroSectionProps) {
  const { hero } = site;
  const sectionRef = useRef<HTMLElement>(null);
  const allowMotion = useAllowMotion();
  const systemReduced = useReducedMotion();
  const skipMotion = !allowMotion || !!systemReduced;
  const magnetic = useMagnetic<HTMLAnchorElement>({
    strength: 0.22,
    disabled: skipMotion,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    skipMotion ? [1, 1] : [1, 1.18]
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    skipMotion ? ["0%", "0%"] : ["0%", "12%"]
  );
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.55],
    skipMotion ? [1, 1] : [1, 0]
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 0.55],
    skipMotion ? [0, 0] : [0, 64]
  );

  const imageSrc = cmsMediaUrl(hero.image, "/images/hero-banner.jpg");

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-end overflow-hidden text-white"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ scale: imageScale, y: imageY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/80 to-navy/35" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/50 to-transparent" />
      <div className="pointer-events-none absolute inset-0 eidf-grain opacity-60" />

      <motion.div
        className="relative mx-auto w-full max-w-7xl px-4 pb-16 pt-16 md:pb-24 md:pt-20"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="max-w-4xl">
          <motion.div
            className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            initial={skipMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-xl ring-[3px] ring-gold sm:h-24 sm:w-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.logo || "/images/logo.png"}
                alt="EIDF"
                className="h-full w-full rounded-full object-contain"
              />
            </span>
            <div className="min-w-0">
              <div className="font-display text-xl font-extrabold leading-tight tracking-tight sm:text-2xl md:text-3xl">
                {site.name}
              </div>
              <div className="mt-1 break-words text-xs font-medium text-gold/90 sm:text-sm">
                {site.poweredBy} · Reg. {site.regNo}
              </div>
            </div>
          </motion.div>

          <motion.p
            className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gold"
            initial={skipMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: skipMotion ? 0 : 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className="font-display text-display-fluid font-extrabold tracking-tight"
            initial={
              skipMotion
                ? false
                : { opacity: 0, clipPath: "inset(0 0 100% 0)" }
            }
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            transition={{
              duration: skipMotion ? 0 : 0.9,
              delay: skipMotion ? 0 : 0.18,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mt-5 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-[17px]"
            initial={skipMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: skipMotion ? 0 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-wrap gap-3"
            initial={skipMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: skipMotion ? 0 : 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={hero.ctas.primary.href}
              ref={magnetic.ref}
              onPointerMove={magnetic.onPointerMove}
              onPointerLeave={magnetic.onPointerLeave}
              style={magnetic.style}
              className="btn-primary will-change-transform"
              data-cursor="EXPLORE"
            >
              {hero.ctas.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.ctas.secondary.href}
              className="btn-secondary"
              data-cursor="VIEW"
            >
              {hero.ctas.secondary.label}
            </Link>
            {hero.ctas.tertiary?.label && (
              <Link
                href={hero.ctas.tertiary.href || "/investors"}
                className="btn-secondary"
              >
                {hero.ctas.tertiary.label}
              </Link>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
