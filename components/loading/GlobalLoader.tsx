"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const BRAND = ["E", "I", "D", "F"] as const;

export function GlobalLoader({
  visible = true,
  message = "Loading…",
  tagline = "Please wait a moment",
  variant = "fullscreen",
}: {
  visible?: boolean;
  message?: string;
  tagline?: string;
  variant?: "fullscreen" | "overlay";
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="global-loader"
          role="status"
          aria-live="polite"
          aria-busy="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden",
            variant === "fullscreen"
              ? "bg-[#060d1a]"
              : "bg-[#060d1a]/80 backdrop-blur-xl"
          )}
        >
          {/* Atmosphere */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(30,62,98,0.55)_0%,transparent_55%)]" />
            <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-emerald/15 blur-[120px] motion-safe:animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-gold/10 blur-[100px]" />
            <div className="absolute bottom-1/4 left-0 h-56 w-56 -translate-x-1/3 rounded-full bg-sky-500/10 blur-[90px]" />
            {/* Soft grid */}
            <div
              className="absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative flex w-full max-w-sm flex-col items-center px-6 text-center">
            {/* Emblem */}
            <div className="relative mb-10 flex h-36 w-36 items-center justify-center sm:h-40 sm:w-40">
              {/* Outer orbit */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              >
                <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                <span className="absolute bottom-3 right-4 h-1.5 w-1.5 rounded-full bg-emerald shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
              </motion.div>

              {/* Mid dashed ring */}
              <motion.div
                className="absolute inset-3 rounded-full border border-dashed border-white/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                aria-hidden="true"
              />

              {/* Sweep arc */}
              <svg
                className="absolute inset-1 h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)] motion-safe:animate-[spin_2.2s_linear_infinite]"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="eidfLoaderSweep" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                    <stop offset="45%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="url(#eidfLoaderSweep)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="90 200"
                />
              </svg>

              {/* Logo core */}
              <motion.div
                className="relative z-10 flex h-[4.75rem] w-[4.75rem] items-center justify-center rounded-[1.35rem] border border-white/15 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.8)] sm:h-20 sm:w-20"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-[1.35rem] bg-gradient-to-br from-white via-white to-slate-100" />
                <Image
                  src="/images/logo.png"
                  alt="EIDF"
                  width={64}
                  height={64}
                  className="relative z-10 object-contain p-1.5"
                  priority
                />
              </motion.div>
            </div>

            {/* Wordmark */}
            <div className="mb-3 flex items-baseline gap-0.5" aria-hidden="true">
              {BRAND.map((letter, i) => (
                <motion.span
                  key={letter}
                  className="font-display text-3xl font-bold tracking-[0.2em] text-white sm:text-4xl"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.12 + i * 0.08,
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="font-sans text-sm font-medium tracking-wide text-white/90 sm:text-base"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {message}
            </motion.p>
            <motion.p
              className="mt-1.5 max-w-[16rem] text-xs leading-relaxed text-white/45 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              {tagline}
            </motion.p>

            {/* Progress rail */}
            <motion.div
              className="mt-8 h-[2px] w-40 overflow-hidden rounded-full bg-white/10 sm:w-48"
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-1/2 rounded-full bg-gradient-to-r from-emerald via-gold to-emerald"
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>

            <span className="sr-only">Loading content, please wait.</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
