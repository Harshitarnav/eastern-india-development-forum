"use client";

import React, { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface ImpactCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export const ImpactCounter: React.FC<ImpactCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const end = Number(value) || 0;
    if (end <= 0) {
      setDisplayValue(0);
      return;
    }

    const isFloat = end % 1 !== 0;
    const startTime = performance.now();
    const ms = Math.max(400, duration * 1000);
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = end * eased;
      setDisplayValue(
        isFloat ? Number(current.toFixed(1)) : Math.round(current)
      );
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplayValue(end);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};
