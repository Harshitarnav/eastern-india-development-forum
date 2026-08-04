"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/loading/Skeleton";

type Props = Omit<ImageProps, "onLoad"> & {
  skeletonClassName?: string;
  containerClassName?: string;
};

/** Progressive image with skeleton + fade-in */
export function SmartImage({
  className,
  skeletonClassName,
  containerClassName,
  alt,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {!loaded && (
        <Skeleton
          className={cn("absolute inset-0 z-[1] h-full w-full", skeletonClassName)}
          rounded="none"
        />
      )}
      <Image
        {...props}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
