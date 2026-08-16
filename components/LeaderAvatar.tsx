"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const LEADER_PLACEHOLDER_MALE = "/images/leaders/placeholder-male.png";
export const LEADER_PLACEHOLDER_FEMALE =
  "/images/leaders/placeholder-female.png";
export const LEADER_PLACEHOLDER = LEADER_PLACEHOLDER_MALE;

const FEMALE_HINTS =
  /\b(smt\.?|mrs\.?|ms\.?|miss|kumari|devi|nesha)\b|\bdr\.?\s+sita\b/i;

/** Seed paths that were never shipped as real files */
const MISSING_SEED_PHOTOS =
  /^\/images\/leaders\/(sanjeev-kumar|arnab-sinha|sita-kumari|nesha-oraon)\.(jpe?g|png|webp)$/i;

function placeholderForName(name: string) {
  if (FEMALE_HINTS.test(name)) return LEADER_PLACEHOLDER_FEMALE;
  return LEADER_PLACEHOLDER_MALE;
}

function resolveLeaderSrc(name: string, image?: string | null) {
  const fallback = placeholderForName(name);
  let raw = typeof image === "string" ? image.trim() : "";
  if (!raw) return fallback;
  raw = raw.replace(/placeholder-fmale\.png$/i, "placeholder-female.png");
  if (MISSING_SEED_PHOTOS.test(raw)) return fallback;
  return raw;
}

export function LeaderAvatar({
  name,
  image,
  size = "md",
  className,
}: {
  name: string;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const fallback = placeholderForName(name);
  const [src, setSrc] = useState(() => resolveLeaderSrc(name, image));

  useEffect(() => {
    setSrc(resolveLeaderSrc(name, image));
  }, [name, image]);

  const sizeClass =
    size === "lg" ? "h-14 w-14" : size === "sm" ? "h-8 w-8" : "h-10 w-10";

  return (
    <span
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full bg-[#d8d8d8] ring-1 ring-black/10",
        sizeClass,
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        key={src}
        src={src}
        alt=""
        className="h-full w-full object-cover object-top"
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </span>
  );
}
