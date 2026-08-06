import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/cms/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/gallery", { title: "Media Hub & Gallery" });
}

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
