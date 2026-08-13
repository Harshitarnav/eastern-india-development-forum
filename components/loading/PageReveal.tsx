"use client";

import { motion } from "framer-motion";
import { useAllowMotion } from "@/components/motion/usePrefersReducedMotion";

/** Soft route entrance — never blanks page content */
export function PageReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const allowMotion = useAllowMotion();

  if (!allowMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
