"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Expand,
  X,
} from "lucide-react";
import { useMagnetic, useAllowMotion, useLenisLock } from "@/components/motion";
import { cmsMediaUrl } from "@/lib/cms/home-preview";

type HeroCta = { label: string; href: string };
type HeroLightboxImage = { src: string; label: string };

function HeroLightbox({
  open,
  images,
  index,
  skipMotion,
  onClose,
  onIndex,
}: {
  open: boolean;
  images: HeroLightboxImage[];
  index: number;
  skipMotion: boolean;
  onClose: () => void;
  onIndex: (next: number) => void;
}) {
  const current = images[index];
  const [mounted, setMounted] = useState(false);
  useLenisLock(open);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") {
        onIndex((index - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, images.length, onClose, onIndex]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="hero-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={current.label}
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6"
          initial={skipMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
        >
        <div className="absolute inset-0 bg-navy-deep/92 backdrop-blur-xl" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,75,0.12),transparent_55%)]"
        />

        <motion.figure
          className="relative z-10 flex max-h-[min(92vh,920px)] w-full max-w-6xl flex-col"
          initial={skipMotion ? false : { opacity: 0, scale: 0.92, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between gap-3 text-white">
            <figcaption className="min-w-0">
              <p className="truncate text-[11px] font-bold uppercase tracking-[0.16em] text-gold-soft">
                {current.label}
              </p>
              <p className="mt-0.5 text-[10px] text-white/45">
                {index + 1} / {images.length}
              </p>
            </figcaption>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors hover:border-gold/50 hover:bg-gold/15 hover:text-gold"
              aria-label="Close image"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-black/40 shadow-[0_40px_90px_-28px_rgba(0,0,0,0.85)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src}
              alt={current.label}
              className="mx-auto max-h-[min(78vh,820px)] w-full object-contain"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep/50 to-transparent" />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    onIndex((index - 1 + images.length) % images.length)
                  }
                  className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy-deep/80 text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => onIndex((index + 1) % images.length)}
                  className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-navy-deep/80 text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:text-gold"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

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

const BRIDGE_NODES = [
  { label: "Governments", href: "/about" },
  { label: "Investors", href: "/investors" },
  { label: "Enterprise", href: "/projects" },
  { label: "Communities", href: "/membership" },
] as const;

function DepthPlane({
  src,
  className,
  z,
  skipMotion,
  delay = 0,
  onOpen,
}: {
  src: string;
  className?: string;
  z: number;
  skipMotion: boolean;
  delay?: number;
  onOpen?: (e?: { clientX: number; clientY: number }) => void;
}) {
  return (
    <motion.div
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      aria-label={onOpen ? "View image" : undefined}
      className={`absolute overflow-hidden rounded-xl border border-white/15 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ${onOpen ? "cursor-zoom-in" : ""} ${className || ""}`}
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
      onClick={onOpen}
      onKeyDown={
        onOpen
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className="h-full w-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-white/5" />
    </motion.div>
  );
}

function BridgesBar({ skipMotion }: { skipMotion: boolean }) {
  const [active, setActive] = useState(2);

  return (
    <motion.div
      className="relative mt-4 w-full max-w-xl overflow-hidden rounded-[22px] border border-white/10 bg-[#0c141c]/80 px-3 py-2.5 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:px-3.5 sm:py-3"
      initial={skipMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: skipMotion ? 0 : 0.24,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,75,0.12),transparent_55%)]"
      />
      <div className="relative mb-2 flex items-baseline justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/80">
          EIDF Bridges
        </span>
        <span className="shrink-0 text-[10px] font-medium text-gold-soft/85">
          One regional council
        </span>
      </div>
      <div className="relative flex items-center overflow-x-auto pb-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {BRIDGE_NODES.map((node, i) => (
          <div key={node.label} className="flex items-center">
            <div className="relative">
              {active === i && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-0 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold bg-transparent shadow-[0_0_10px_rgba(201,168,75,0.55)]"
                />
              )}
              <Link
                href={node.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="relative z-[1] inline-flex whitespace-nowrap rounded-full border border-gold/55 bg-[#161c24] px-2.5 py-1 text-[10px] font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_0_12px_-6px_rgba(201,168,75,0.7)] transition-colors hover:border-gold hover:bg-[#1c2430] sm:px-3 sm:py-1.5 sm:text-[11px]"
                data-cursor="VIEW"
              >
                {node.label}
              </Link>
            </div>
            {i < BRIDGE_NODES.length - 1 && (
              <div className="relative mx-0.5 h-px w-3 bg-gold/70 sm:mx-1 sm:w-5">
                {active === i + 1 && (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-[9px] rounded-full bg-gold shadow-[0_0_8px_rgba(201,168,75,0.8)]"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
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

  const bgRawX = useMotionValue(0);
  const bgRawY = useMotionValue(0);
  const bgX = useSpring(bgRawX, { stiffness: 50, damping: 22, mass: 0.8 });
  const bgY = useSpring(bgRawY, { stiffness: 50, damping: 22, mass: 0.8 });
  const ringFarX = useTransform(bgX, [-0.5, 0.5], skipMotion ? [0, 0] : [-28, 28]);
  const ringFarY = useTransform(bgY, [-0.5, 0.5], skipMotion ? [0, 0] : [-18, 18]);
  const ringNearX = useTransform(bgX, [-0.5, 0.5], skipMotion ? [0, 0] : [22, -22]);
  const ringNearY = useTransform(bgY, [-0.5, 0.5], skipMotion ? [0, 0] : [14, -14]);
  const slabX = useTransform(bgX, [-0.5, 0.5], skipMotion ? [0, 0] : [-16, 16]);
  const slabY = useTransform(bgY, [-0.5, 0.5], skipMotion ? [0, 0] : [-10, 10]);

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
  const gallery: HeroLightboxImage[] = [
    { src: imageSrc, label: hero.headline },
    { src: planeA, label: "Regional development corridor" },
    { src: planeB, label: "Field engagement" },
  ];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const pointerDown = useRef<{ x: number; y: number } | null>(null);

  const openFromPointer = (
    i: number,
    e?: { clientX: number; clientY: number }
  ) => {
    const start = pointerDown.current;
    if (e && start) {
      const dx = e.clientX - start.x;
      const dy = e.clientY - start.y;
      if (dx * dx + dy * dy > 64) return;
    }
    setLightboxIndex(i);
  };

  const onStageMove = (e: React.PointerEvent) => {
    if (skipMotion || !stageRef.current) return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    const rect = stageRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(px);
    rawY.set(py);
  };

  const onStageLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const onSectionMove = (e: React.PointerEvent) => {
    if (skipMotion || !sectionRef.current) return;
    if (window.matchMedia("(pointer: fine)").matches === false) return;
    const rect = sectionRef.current.getBoundingClientRect();
    bgRawX.set((e.clientX - rect.left) / rect.width - 0.5);
    bgRawY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onSectionLeave = () => {
    bgRawX.set(0);
    bgRawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex h-[calc(100svh-6.75rem)] max-h-[820px] min-h-[520px] overflow-hidden text-white"
      onPointerMove={onSectionMove}
      onPointerLeave={onSectionLeave}
    >
      <div className="absolute inset-0 hero-mesh" />
      <div className="pointer-events-none absolute inset-0 eidf-grain opacity-45" />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald/22 blur-3xl"
          style={{ x: ringNearX, y: ringNearY }}
        />
        <motion.div
          className="absolute -right-10 top-0 h-72 w-72 rounded-full bg-gold/18 blur-3xl"
          style={{ x: ringFarX, y: ringFarY }}
        />
        <div className="absolute bottom-0 left-1/2 h-52 w-[82%] -translate-x-1/2 rounded-full bg-brand-blue/22 blur-3xl" />

        <motion.div
          className="absolute -right-[8%] top-[4%] h-[420px] w-[420px] rounded-full border border-gold/25"
          style={{
            x: ringFarX,
            y: ringFarY,
            rotateX: 72,
            boxShadow:
              "0 50px 90px -28px rgba(201,168,75,0.22), inset 0 0 50px rgba(201,168,75,0.08)",
          }}
          animate={skipMotion ? { rotateZ: -16 } : { rotateZ: [-18, -12, -18] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-[2%] top-[12%] h-[260px] w-[260px] rounded-full border border-white/10"
          style={{
            x: ringNearX,
            y: ringNearY,
            rotateX: 68,
            rotateZ: 8,
          }}
        />
        <motion.div
          className="absolute -left-[10%] bottom-[16%] h-[300px] w-[300px] rounded-full border border-emerald/20"
          style={{
            x: ringNearX,
            y: ringNearY,
            rotateX: 64,
            boxShadow: "0 40px 80px -30px rgba(26,154,114,0.25)",
          }}
          animate={skipMotion ? { rotateZ: 22 } : { rotateZ: [22, 28, 22] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute left-[12%] top-[18%] h-28 w-44 rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_30px_60px_-28px_rgba(0,0,0,0.7)]"
          style={{
            x: slabX,
            y: slabY,
            rotateX: 16,
            rotateY: -32,
            translateZ: 48,
          }}
        />
        <motion.div
          className="absolute right-[38%] top-[8%] hidden h-20 w-32 rounded-xl border border-gold/20 bg-gold/[0.06] lg:block"
          style={{
            x: slabX,
            y: slabY,
            rotateX: 22,
            rotateY: 24,
            translateZ: 28,
          }}
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-22%] h-[56%] origin-bottom opacity-45"
        style={{ perspective: "980px" }}
      >
        <div
          className="h-full w-full"
          style={{
            transform: "rotateX(64deg) translateZ(-40px)",
            backgroundImage: `
              linear-gradient(to right, rgba(201,168,75,0.22) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "52px 52px",
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9), transparent 78%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,0.9), transparent 78%)",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(4,9,16,0.55)_100%)]" />
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

          <BridgesBar skipMotion={skipMotion} />

          <motion.div
            className="mt-3.5 flex flex-wrap items-center gap-2.5 md:mt-4"
            initial={skipMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: skipMotion ? 0 : 0.32,
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
            onPointerDown={(e) => {
              pointerDown.current = { x: e.clientX, y: e.clientY };
            }}
            onPointerMove={onStageMove}
            onPointerLeave={onStageLeave}
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
                className="pointer-events-none absolute left-[8%] top-[10%] h-[78%] w-[84%] rounded-2xl bg-gradient-to-br from-gold/25 via-emerald/15 to-brand-blue/20 blur-xl"
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
                onOpen={(e) => openFromPointer(2, e)}
              />

              <DepthPlane
                src={planeA}
                className="right-[0%] top-[10%] h-[48%] w-[44%]"
                z={18}
                skipMotion={skipMotion}
                delay={0.2}
                onOpen={(e) => openFromPointer(1, e)}
              />

              <motion.div
                role="button"
                tabIndex={0}
                aria-label="View hero image"
                className="group absolute left-[14%] top-[20%] h-[66%] w-[70%] cursor-zoom-in overflow-hidden rounded-xl border border-white/20 shadow-[0_32px_70px_-22px_rgba(0,0,0,0.75)]"
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
                onClick={(e) => openFromPointer(0, e)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(0);
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt={hero.headline}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-navy-deep/55 via-transparent to-gold/10" />
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 mix-blend-soft-light"
                  style={{ background: glareBg }}
                />
                <span className="pointer-events-none absolute right-2.5 bottom-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-navy-deep/70 text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="h-3.5 w-3.5" />
                </span>
              </motion.div>

              <motion.div
                aria-hidden
                className="pointer-events-none absolute left-[10%] top-[14%] h-[72%] w-[76%] rounded-xl border border-gold/35"
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
                    className={`pointer-events-none absolute ${positions[i]} z-20 max-w-[10.5rem] rounded-lg border border-white/15 bg-navy-deep/75 px-3 py-2 shadow-xl backdrop-blur-md`}
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
          <button
            type="button"
            onClick={() => setLightboxIndex(0)}
            className="group relative mx-auto block h-28 w-full max-w-md cursor-zoom-in overflow-hidden rounded-xl border border-white/15 sm:h-36"
            aria-label="View hero image"
            data-cursor="VIEW"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={hero.headline}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-deep/70 via-navy-deep/25 to-transparent" />
            {metrics[0] && (
              <div className="pointer-events-none absolute bottom-3 left-3 rounded-lg border border-white/15 bg-navy-deep/75 px-3 py-1.5 backdrop-blur-md">
                <div className="font-display text-sm font-bold text-gold-soft">
                  {metrics[0].value}
                </div>
                <div className="text-[9px] text-white/55">{metrics[0].label}</div>
              </div>
            )}
            <span className="pointer-events-none absolute right-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-navy-deep/70 text-white">
              <Expand className="h-3.5 w-3.5" />
            </span>
          </button>
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

      <HeroLightbox
        open={lightboxIndex !== null}
        images={gallery}
        index={lightboxIndex ?? 0}
        skipMotion={skipMotion}
        onClose={() => setLightboxIndex(null)}
        onIndex={setLightboxIndex}
      />
    </section>
  );
}
