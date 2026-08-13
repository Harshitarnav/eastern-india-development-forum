"use client";

import { motion, type Variants } from "framer-motion";
import { useAllowMotion } from "./usePrefersReducedMotion";
import { cn } from "@/lib/utils";

type ClipRevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale" | "clip";
  delay?: number;
  once?: boolean;
};

/**
 * Scroll polish only — content stays visible (opacity never 0).
 * Previous opacity:0 + useInView pattern left sections blank when IO lagged (e.g. with Lenis).
 */
const variants: Record<string, Variants> = {
  up: {
    hidden: { opacity: 1, y: 22 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 1, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 1, x: 20 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 1, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
  clip: {
    hidden: { opacity: 1, y: 18 },
    visible: { opacity: 1, y: 0 },
  },
};

export function ClipReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  once = true,
}: ClipRevealProps) {
  const allowMotion = useAllowMotion();

  if (!allowMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.08, margin: "0px 0px -5% 0px" }}
      variants={variants[direction] || variants.up}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
