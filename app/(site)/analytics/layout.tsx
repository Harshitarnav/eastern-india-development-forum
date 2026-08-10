import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/analytics", { title: "Development Analytics" });
}

export default function AnalyticsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
