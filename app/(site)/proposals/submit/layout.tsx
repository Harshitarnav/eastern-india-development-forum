import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/proposals/submit", { title: "Submit a Proposal" });
}

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
