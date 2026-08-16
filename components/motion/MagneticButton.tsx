"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useMagnetic } from "./useMagnetic";

type MagneticButtonProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  strength?: number;
};

export function MagneticButton({
  href,
  className,
  children,
  onClick,
  type = "button",
  strength = 0.28,
}: MagneticButtonProps) {
  const { ref, onPointerMove, onPointerLeave, style } = useMagnetic<HTMLElement>({
    strength,
  });

  const classes = cn("inline-flex will-change-transform", className);

  if (href) {
    return (
      <Link
        href={href}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={style}
        className={classes}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      ref={ref as React.RefObject<HTMLButtonElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      onClick={onClick}
      style={style}
      className={classes}
    >
      {children}
    </button>
  );
}
