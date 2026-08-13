"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useAllowMotion } from "./usePrefersReducedMotion";

type CursorMode = "default" | "hover" | "label";

/**
 * Modern dual-layer cursor: instant gold dot + snappy ring.
 * Position updates via rAF + motion values (no per-frame React state).
 */
export function CustomCursor() {
  const allowMotion = useAllowMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 1400, damping: 60, mass: 0.12 });
  const ringY = useSpring(y, { stiffness: 1400, damping: 60, mass: 0.12 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const coarse = window.matchMedia("(hover: none)").matches;
    setEnabled(Boolean(fine && allowMotion && !coarse));
  }, [allowMotion]);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove(
        "has-custom-cursor",
        "cursor-native"
      );
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    let raf = 0;
    let lx = -100;
    let ly = -100;
    let queued = false;

    const flush = () => {
      queued = false;
      x.set(lx);
      y.set(ly);
      if (!visibleRef.current && rootRef.current) {
        visibleRef.current = true;
        rootRef.current.dataset.visible = "true";
      }
    };

    const onMove = (e: MouseEvent) => {
      lx = e.clientX;
      ly = e.clientY;
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(flush);
      }
    };

    const onLeave = () => {
      visibleRef.current = false;
      if (rootRef.current) rootRef.current.dataset.visible = "false";
      setMode("default");
      setLabel("");
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (!el) return;

      if (el.closest("input, textarea, select, [contenteditable='true']")) {
        document.documentElement.classList.add("cursor-native");
        setMode("default");
        setLabel("");
        return;
      }
      document.documentElement.classList.remove("cursor-native");

      const hit = el.closest(
        "a, button, [role='button'], [data-cursor]"
      ) as HTMLElement | null;

      if (!hit) {
        setMode("default");
        setLabel("");
        return;
      }

      const raw = hit.getAttribute("data-cursor");
      if (raw === "VIEW" || raw === "EXPLORE" || raw === "DRAG") {
        setMode("label");
        setLabel(raw);
      } else {
        setMode("hover");
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove(
        "has-custom-cursor",
        "cursor-native"
      );
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ring = mode === "label" ? 58 : mode === "hover" ? 34 : 26;

  return (
    <div
      ref={rootRef}
      className="eidf-cursor pointer-events-none fixed inset-0 z-[100]"
      data-visible="false"
      aria-hidden
    >
      {/* Ring — slight trail */}
      <motion.div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center will-change-[left,top]"
        style={{ left: ringX, top: ringY }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full border border-gold/65 bg-gold/[0.06]"
          animate={{ width: ring, height: ring }}
          transition={{ type: "spring", stiffness: 520, damping: 34, mass: 0.18 }}
        >
          {mode === "label" && (
            <span className="font-display text-[9px] font-bold tracking-[0.16em] text-gold">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Dot — instant */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 will-change-[left,top]"
        style={{ left: x, top: y }}
      >
        <motion.span
          className="block rounded-full bg-gold shadow-[0_0_10px_rgba(232,163,23,0.5)]"
          animate={{
            width: mode === "label" ? 0 : mode === "hover" ? 5 : 7,
            height: mode === "label" ? 0 : mode === "hover" ? 5 : 7,
            opacity: mode === "label" ? 0 : 1,
          }}
          transition={{ duration: 0.12 }}
        />
      </motion.div>
    </div>
  );
}
