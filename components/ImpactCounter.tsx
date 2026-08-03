"use client";

import React, { useEffect, useState } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

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

    let start = 0;
    const end = value;
    const stepTime = Math.abs(Math.floor((duration * 1000) / (end > 100 ? 100 : end)));
    const increment = end > 100 ? end / 100 : 1;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(Number(start.toFixed(value % 1 !== 0 ? 1 : 0)));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};
