import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import "./globals.css";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Eastern India Development Forum",
    template: "%s · Eastern India Development Forum",
  },
  description:
    "A forum powered by Umanand Eastern Foundation — uniting the diaspora to fund skill centres, heritage sites and opportunity across Bihar, Jharkhand & Odisha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${publicSans.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
