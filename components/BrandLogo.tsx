"use client";

import { cn } from "@/lib/utils";
import { usePublicSite } from "@/lib/cms/public-provider";

const sizeMap = {
  sm: { box: "h-9 w-9" },
  md: { box: "h-11 w-11" },
  lg: { box: "h-14 w-14" },
  xl: { box: "h-16 w-16" },
} as const;

export function BrandLogo({
  size = "md",
  className,
  priority: _priority = false,
  src,
}: {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
  src?: string;
}) {
  const site = usePublicSite();
  const { box } = sizeMap[size];
  const logoSrc = src || site.logo || "/images/logo.png";

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/60",
        box,
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={site.name || "Eastern India Development Forum"}
        className="absolute inset-0 h-full w-full object-contain p-[1px]"
      />
    </div>
  );
}
