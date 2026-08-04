"use client";

import { cn } from "@/lib/utils";

/** Base shimmer block — respects reduced motion */
export function Skeleton({
  className,
  rounded = "xl",
}: {
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full" | "none";
}) {
  const radius = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
    full: "rounded-full",
  }[rounded];

  return (
    <div
      className={cn("eidf-skeleton relative overflow-hidden bg-[var(--skeleton-base)]", radius, className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2.5", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-3", i === lines - 1 ? "w-2/3" : "w-full")}
          rounded="md"
        />
      ))}
    </div>
  );
}
