"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import Lenis from "lenis";
import { useAllowMotion } from "./usePrefersReducedMotion";

type LenisContextValue = {
  stop: () => void;
  start: () => void;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number }
  ) => void;
};

const LenisContext = createContext<LenisContextValue>({
  stop: () => {},
  start: () => {},
  scrollTo: () => {},
});

export function useLenis() {
  return useContext(LenisContext);
}

/** Pause Lenis while overlays are open — ref-counted so nested locks are safe */
export function useLenisLock(locked: boolean) {
  const { stop, start } = useLenis();
  useEffect(() => {
    if (!locked) return;
    stop();
    return () => start();
  }, [locked, stop, start]);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const allowMotion = useAllowMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const lockCount = useRef(0);

  useEffect(() => {
    if (!allowMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    if (lockCount.current > 0) lenis.stop();

    document.documentElement.classList.add("lenis", "lenis-smooth");

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    const onHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const el = document.querySelector(hash);
      if (el instanceof HTMLElement) {
        lenis.scrollTo(el, { offset: -96 });
      }
    };
    requestAnimationFrame(onHash);
    window.addEventListener("hashchange", onHash);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", onHash);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [allowMotion]);

  const stop = useCallback(() => {
    lockCount.current += 1;
    lenisRef.current?.stop();
    document.documentElement.style.overflow = "hidden";
  }, []);

  const start = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current === 0) {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, []);

  const scrollTo = useCallback(
    (
      target: string | number | HTMLElement,
      options?: { offset?: number }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, { offset: options?.offset ?? -96 });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        el?.scrollIntoView({
          behavior: allowMotion ? "smooth" : "auto",
          block: "start",
        });
      }
    },
    [allowMotion]
  );

  const api = useMemo(
    () => ({ stop, start, scrollTo }),
    [stop, start, scrollTo]
  );

  return <LenisContext.Provider value={api}>{children}</LenisContext.Provider>;
}
