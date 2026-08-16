"use client";

import { useCallback, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

type MagneticOptions = {
  strength?: number;
  disabled?: boolean;
};

export function useMagnetic<T extends HTMLElement = HTMLElement>({
  strength = 0.35,
  disabled = false,
}: MagneticOptions = {}) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  const active = !disabled && !reduced;

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      const el = ref.current;
      if (!el || !active) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [active, strength]
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
  }, []);

  return { ref, onPointerMove, onPointerLeave, style: { transition: "transform 0.2s ease-out" } as const };
}
