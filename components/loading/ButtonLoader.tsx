"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function ButtonLoader({
  loading,
  children,
  loadingText,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  loadingText?: string;
}) {
  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      className={cn(className, loading && "cursor-wait")}
    >
      {loading ? (
        <span className="inline-flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          {loadingText || children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
