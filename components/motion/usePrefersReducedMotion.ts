"use client";

import { useEffect, useState } from "react";

/** Returns true when user prefers reduced motion. Safe default avoids blank SSR content. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Until mounted, treat as reduced so we never ship opacity:0 as only SSR state
  return reduced === true || reduced === null;
}

/** True only after client mount and when motion is allowed */
export function useAllowMotion() {
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setAllow(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return allow;
}
