"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useAllowMotion } from "./usePrefersReducedMotion";

export function SectionProgress() {
  const allowMotion = useAllowMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (!allowMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-[2px] origin-left bg-gradient-to-r from-gold via-emerald to-brand-blue"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
