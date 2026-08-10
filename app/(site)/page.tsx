import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/cms/seo";
import HomePageClient from "./HomePageClient";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata("/", {
    title: "Eastern India Development Forum (EIDF)",
  });
}

export default function HomePage() {
  return <HomePageClient />;
}
