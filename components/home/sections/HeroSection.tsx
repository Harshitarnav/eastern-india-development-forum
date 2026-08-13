"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useMagnetic, useAllowMotion } from "@/components/motion";
import { cmsMediaUrl } from "@/lib/cms/home-preview";

type HeroCta = { label: string; href: string };

type HeroSectionProps = {
  site: {
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
      floatingMetrics?: { label: string; value: string }[];
    };
  };
};

function DepthPlane({
  src,
  className,
  z,
  skipMotion,
  delay = 0,
}: {
  src: string;
  className?: string;
  z: number;
  skipMotion: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute overflow-hidden rounded-xl border border-white/15 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ${className || ""}`}
      style={{
        transformStyle: "preserve-3d",
        translateZ: z,
      }}
      initial={skipMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.8,
        delay: skipMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-white/5" />
    </motion.div>
  );
}

export function HeroSection({ site }: HeroSectionProps) {
  const { hero } = site;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const allowMotion = useAllowMotion();
  const systemReduced = useReducedMotion();
  const skipMotion = !allowMotion || !!systemReduced;

  const magnetic = useMagnetic<HTMLAnchorElement>({
    strength: 0.16,
    disabled: skipMotion,
  });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.4 });
  const springY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.4 });

  const rotateY = useTransform(
    springX,
    [-0.5, 0.5],
    skipMotion ? [0, 0] : [-12, 12]
  );
  const rotateX = useTransform(
    springY,
    [-0.5, 0.5],
    skipMotion ? [0, 0] : [8, -8]
  );
  const floatY = useTransform(
    springY,
    [-0.5, 0.5],
    skipMotion ? [0, 0] : [5, -5]
  );
  const glareX = useTransform(springX, [-0.5, 0.5], [22, 78]);
  const glareY = useTransform(springY, [-0.5, 0.5], [28, 68]);
  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.32), transparent 42%)`;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const stageScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    skipMotion ? [0, 0] : [0, 40]
  );
  const stageScrollScale = useTransform(
    scrollYProgress,
    [0, 1],
    skipMotion ? [1, 1] : [1, 0.96]
  );

  const imageSrc = cmsMediaUrl(hero.image, "/images/hero-banner.jpg");
  const planeA = "/images/eidf_03.jpg";
  const planeB = "/images/eidf_07.jpg";
  const metrics = (hero.floatingMetrics || []).slice(0, 2);

  const onPointerMove = (e: React.PointerEvent) => {
    if (skipMotion || !stageRef.current) return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px);
    rawY.set(py);
  };

  const onPointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[calc(100svh-6.75rem)] max-h-[820px] min-h-[520px] overflow-hidden text-white"
    >
      <div className="absolute inset-0 hero-mesh" />
      <div className="pointer-events-none absolute inset-0 eidf-grain opacity-45" />
      <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-emerald/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-6 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-full bg-brand-blue/20 blur-3xl" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-20%] h-[50%] origin-bottom opacity-35"
        style={{ perspective: "900px" }}
      >
        <div
          className="h-full w-full"
          style={{
            transform: "rotateX(62deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(232,163,23,0.18) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
            `,
            backgroundSize: "56px 56px",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent 75%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.85), transparent 75%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent" />

      <div className="relative mx-auto grid h-full w-full max-w-7xl items-center gap-6 px-4 py-6 md:gap-8 md:py-8 lg:grid-cols-12 lg:gap-6 lg:py-6">
        <div className="relative z-10 flex min-h-0 flex-col justify-center lg:col-span-6 xl:col-span-5">
          <motion.p
            className="mb-2.5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-soft md:text-[11px]"
            initial={skipMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: skipMotion ? 0 : 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="hidden h-px w-7 bg-gold/70 sm:block" aria-hidden />
            {hero.eyebrow}
          </motion.p>

          <motion.h1
            className="font-display text-[clamp(1.65rem,2.8vw+0.55rem,2.85rem)] font-extrabold leading-[1.08] tracking-tight text-balance"
            initial={skipMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: skipMotion ? 0 : 0.65,
              delay: skipMotion ? 0 : 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            className="mt-3 max-w-xl text-[13px] leading-relaxed text-white/65 line-clamp-3 md:mt-3.5 md:text-sm md:leading-relaxed md:line-clamp-4"
            initial={skipMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: skipMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {hero.subheading}
          </motion.p>

          <motion.div
            className="mt-5 flex flex-wrap items-center gap-2.5 md:mt-6"
            initial={skipMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: skipMotion ? 0 : 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Link
              href={hero.ctas.primary.href}
              ref={magnetic.ref}
              onPointerMove={magnetic.onPointerMove}
              onPointerLeave={magnetic.onPointerLeave}
              style={magnetic.style}
              className="btn-primary !px-4 !py-2.5 will-change-transform"
              data-cursor="EXPLORE"
            >
              {hero.ctas.primary.label}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={hero.ctas.secondary.href}
              className="btn-secondary !px-4 !py-2.5"
              data-cursor="VIEW"
            >
              {hero.ctas.secondary.label}
            </Link>
            {hero.ctas.tertiary?.label && (
              <Link
                href={hero.ctas.tertiary.href || "/investors"}
                className="btn-secondary !hidden !px-4 !py-2.5 xl:!inline-flex"
              >
                {hero.ctas.tertiary.label}
              </Link>
            )}
          </motion.div>
        </div>

        <div className="relative z-10 hidden h-full min-h-0 items-center lg:col-span-6 lg:flex xl:col-span-7">
          <motion.div
            ref={stageRef}
            className="relative mx-auto h-[min(100%,420px)] w-full max-w-[520px] touch-none select-none xl:max-w-none"
            style={{
              perspective: "1200px",
              y: stageScrollY,
              scale: stageScrollScale,
              aspectRatio: "5 / 4",
              maxHeight: "100%",
            }}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            data-cursor="VIEW"
          >
            <motion.div
              className="relative h-full w-full"
              style={{
                transformStyle: "preserve-3d",
                rotateX: skipMotion ? -6 : rotateX,
                rotateY: skipMotion ? 10 : rotateY,
                y: floatY,
              }}
            >
              <motion.div
                aria-hidden
                className="absolute left-[8%] top-[10%] h-[78%] w-[84%] rounded-2xl bg-gradient-to-br from-gold/25 via-emerald/15 to-brand-blue/20 blur-xl"
                style={{ transform: "translateZ(-60px) rotateY(-8deg)" }}
                animate={
                  skipMotion ? undefined : { opacity: [0.45, 0.7, 0.45] }
                }
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <DepthPlane
                src={planeB}
                className="left-[2%] top-[18%] h-[56%] w-[46%]"
                z={-36}
                skipMotion={skipMotion}
                delay={0.12}
              />

              <DepthPlane
                src={planeA}
                className="right-[0%] top-[10%] h-[48%] w-[44%]"
                z={18}
                skipMotion={skipMotion}
                delay={0.2}
              />

              <motion.div
                className="absolute left-[14%] top-[20%] h-[66%] w-[70%] overflow-hidden rounded-xl border border-white/20 shadow-[0_32px_70px_-22px_rgba(0,0,0,0.75)]"
                style={{
                  transformStyle: "preserve-3d",
                  translateZ: 56,
                }}
                initial={skipMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.85,
                  delay: skipMotion ? 0 : 0.16,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/55 via-transparent to-gold/10" />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{ background: glareBg }}
                />
              </motion.div>

              <motion.div
                aria-hidden
                className="absolute left-[10%] top-[14%] h-[72%] w-[76%] rounded-xl border border-gold/35"
                style={{
                  transformStyle: "preserve-3d",
                  translateZ: 90,
                }}
                initial={skipMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: skipMotion ? 0 : 0.35, duration: 0.6 }}
              />

              {metrics.map((m, i) => {
                const positions = ["left-0 top-[4%]", "right-0 top-[48%]"];
                const depths = [110, 130];
                return (
                  <motion.div
                    key={m.label}
                    className={`absolute ${positions[i]} z-20 max-w-[10.5rem] rounded-lg border border-white/15 bg-navy-deep/75 px-3 py-2 shadow-xl backdrop-blur-md`}
                    style={{
                      transformStyle: "preserve-3d",
                      translateZ: depths[i],
                    }}
                    initial={skipMotion ? false : { opacity: 0, y: 12 }}
                    animate={
                      skipMotion
                        ? { opacity: 1 }
                        : {
                            opacity: 1,
                            y: [0, i % 2 === 0 ? -5 : 5, 0],
                          }
                    }
                    transition={{
                      opacity: {
                        delay: skipMotion ? 0 : 0.4 + i * 0.08,
                        duration: 0.45,
                      },
                      y: {
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <div className="font-display text-sm font-bold text-gold-soft">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-[9px] font-medium leading-snug text-white/55">
                      {m.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile / tablet visual — compact strip so copy + CTAs stay above fold */}
        <div className="relative z-10 lg:hidden">
          <div className="relative mx-auto h-36 w-full max-w-md overflow-hidden rounded-xl border border-white/15 sm:h-44">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-navy-deep/25 to-transparent" />
            {metrics[0] && (
              <div className="absolute bottom-3 left-3 rounded-lg border border-white/15 bg-navy-deep/75 px-3 py-1.5 backdrop-blur-md">
                <div className="font-display text-sm font-bold text-gold-soft">
                  {metrics[0].value}
                </div>
                <div className="text-[9px] text-white/55">{metrics[0].label}</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {!skipMotion && (
        <motion.a
          href="#online-services"
          className="absolute bottom-2 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-0.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/30 transition-colors hover:text-gold md:flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          aria-label="Scroll to online services"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
