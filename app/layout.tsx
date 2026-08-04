import type { Metadata } from "next";
import { Lora, Public_Sans } from "next/font/google";
import { Providers } from "@/components/providers";
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
    default: "Eastern India Development Forum (EIDF)",
    template: "%s · Eastern India Development Forum",
  },
  description:
    "Official apex development ecosystem powered by Umanand Eastern Foundation — uniting Governments, Global Investors, Enterprises, and Diaspora to accelerate sustainable growth across Bihar, Jharkhand, Odisha, West Bengal, Assam, and the North East.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${lora.variable} ${publicSans.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
