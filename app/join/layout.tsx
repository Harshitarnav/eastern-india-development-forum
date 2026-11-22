import type { Metadata } from "next";
import { Noto_Sans_Bengali, Noto_Sans_Devanagari, Noto_Sans_Oriya } from "next/font/google";

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hi",
  subsets: ["devanagari"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bn",
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const odia = Noto_Sans_Oriya({
  variable: "--font-or",
  subsets: ["oriya"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://eidf.org.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Join",
  description:
    "What the Eastern India Development Forum does, in English, Hindi, Bengali, Odia, and Assamese, and a short form in English and Hindi. पूर्वी भारत विकास मंच से जुड़ें।",
  openGraph: {
    title: "Join the Eastern India Development Forum",
    description:
      "A short account of EIDF in five languages, and a signup form you can read in English or Hindi.",
    url: "/join",
    images: [{ url: "/images/hero-banner.jpg", alt: "Eastern India Development Forum" }],
  },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${hindi.variable} ${bengali.variable} ${odia.variable} flex flex-1 flex-col`}>
      {children}
    </div>
  );
}
