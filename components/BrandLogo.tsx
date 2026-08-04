import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { box: "h-9 w-9", sizes: "36px" },
  md: { box: "h-11 w-11", sizes: "44px" },
  lg: { box: "h-14 w-14", sizes: "56px" },
  xl: { box: "h-16 w-16", sizes: "64px" },
} as const;

export function BrandLogo({
  size = "md",
  className,
  priority = false,
}: {
  size?: keyof typeof sizeMap;
  className?: string;
  priority?: boolean;
}) {
  const { box, sizes } = sizeMap[size];

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-white p-0.5 shadow-md ring-2 ring-gold/60",
        box,
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Eastern India Development Forum"
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-[1px]"
      />
    </div>
  );
}
