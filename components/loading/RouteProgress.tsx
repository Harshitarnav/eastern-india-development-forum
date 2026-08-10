"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlobalLoader } from "@/components/loading/GlobalLoader";

/**
 * Thin top progress + short overlay for client navigations.
 * Also handles first-paint splash so users never see a blank frame.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [navigating, setNavigating] = useState(false);
  const [booting, setBooting] = useState(true);
  const [, startTransition] = useTransition();

  // Initial boot splash
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const t = window.setTimeout(
      () => setBooting(false),
      prefersReduced ? 200 : 700
    );
    return () => window.clearTimeout(t);
  }, []);

  // Route change progress
  useEffect(() => {
    if (booting) return;

    startTransition(() => {
      setNavigating(true);
      setProgress(12);
    });

    const t1 = window.setTimeout(() => setProgress(55), 80);
    const t2 = window.setTimeout(() => setProgress(82), 220);
    const t3 = window.setTimeout(() => {
      setProgress(100);
      window.setTimeout(() => {
        setNavigating(false);
        setProgress(0);
      }, 220);
    }, 420);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams?.toString()]);

  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      <GlobalLoader
        visible={booting}
        message={isAdmin ? "Loading admin console…" : "Loading…"}
        tagline="Please wait a moment"
      />

      <AnimatePresence>
        {navigating && progress > 0 && (
          <motion.div
            key="route-progress"
            className="pointer-events-none fixed top-0 right-0 left-0 z-[90] h-[2.5px] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-navy via-emerald to-gold shadow-[0_0_12px_rgba(16,185,129,0.45)]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: progress / 100 }}
              transition={{ ease: "easeOut", duration: 0.25 }}
              style={{ transformOrigin: "0% 50%" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
