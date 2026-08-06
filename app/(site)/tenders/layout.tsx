import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/tenders", { title: "Tender Assistance Center" });
}

export default function TendersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
