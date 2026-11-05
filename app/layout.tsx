import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { default: `${site.name} — Operations & Partnerships Manager`, template: `%s | ${site.name}` },
  description:
    "Operations and partnerships manager supporting digital brands with influencer marketing, campaign coordination, social media execution and AI video content.",
  openGraph: {
    title: `${site.name} — Operations & Partnerships Manager`,
    description: "Operations, influencer marketing and AI video content for digital brands.",
    type: "website",
    images: ["/images/monosend-report.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Fontshare (free for commercial use). Two separate links — a combined URL only returns the first family. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@500,600,700&display=swap" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <PageTransition />
      </body>
    </html>
  );
}
