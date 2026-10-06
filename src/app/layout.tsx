import type { Metadata } from "next";
import "./globals.css";
import "./readability.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(`${SITE_ORIGIN}/`),
  alternates: { canonical: `${SITE_ORIGIN}/` },
  title: {
    default: "Omoseebi Vincent — Helping Founders Find What’s Holding Growth Back",
    template: "%s — Omoseebi Vincent"
  },
  description: "Omoseebi Vincent helps early-stage founders figure out what is getting in the way of growth across product, customers, positioning, marketing, sales, distribution, and retention.",
  keywords: [
    "early-stage founders",
    "startup growth",
    "growth problems",
    "customer research",
    "product discovery",
    "product validation",
    "market research",
    "product positioning",
    "startup positioning",
    "startup marketing",
    "founder-led sales",
    "early-stage growth",
    "customer retention"
  ],
  openGraph: {
    title: "Omoseebi Vincent — Helping Founders Find What’s Holding Growth Back",
    description: "Omoseebi Vincent helps early-stage founders figure out what is getting in the way of growth across product, customers, positioning, marketing, sales, distribution, and retention.",
    url: `${SITE_ORIGIN}/`,
    type: "website",
    siteName: "Omoseebi Vincent"
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
