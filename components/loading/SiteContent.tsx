"use client";

import { PageReveal } from "@/components/loading/PageReveal";

export function SiteContent({ children }: { children: React.ReactNode }) {
  return <PageReveal className="flex min-h-0 flex-1 flex-col">{children}</PageReveal>;
}
