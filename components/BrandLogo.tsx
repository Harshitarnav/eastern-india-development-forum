import Image from "next/image";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { box: "h-8 w-8 rounded-lg", pad: "p-0.5" },
  md: { box: "h-9 w-9 rounded-xl", pad: "p-0.5" },
  lg: { box: "h-12 w-12 rounded-xl", pad: "p-0.5" },
  xl: { box: "h-14 w-14 rounded-2xl", pad: "p-1" },
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
  const { box, pad } = sizeMap[size];

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden border border-line bg-white shadow-sm",
        box,
        className
      )}
    >
      <Image
        src="/images/logo.png"
        alt="EIDF"
        fill
        priority={priority}
        className={cn("object-contain", pad)}
      />
    </div>
  );
}
