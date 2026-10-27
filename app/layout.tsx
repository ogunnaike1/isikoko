import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Digital Content & Marketing Specialist",
  description:
    "I help brands build meaningful connections through content strategy, social media management, video editing, influencer marketing, and creative digital campaigns.",
  openGraph: {
    title: "Digital Content & Marketing Specialist",
    description: "I create content that connects brands with their audience.",
    type: "website",
    images: ["/images/project-one.jpg"],
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
