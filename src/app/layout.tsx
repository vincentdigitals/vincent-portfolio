import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://omoseebivincent.com"),
  title: {
    default: "Omoseebi Vincent — Product, Customers & Growth",
    template: "%s — Omoseebi Vincent"
  },
  description: "Product discovery, customer research, validation, positioning, marketing, and growth for early-stage founders.",
  keywords: [
    "early-stage founders",
    "customer research",
    "product discovery",
    "product validation",
    "market research",
    "product positioning",
    "startup positioning",
    "messaging and copywriting",
    "startup marketing",
    "founder-led sales",
    "early-stage growth"
  ],
  openGraph: {
    title: "Omoseebi Vincent — Product, Customers & Growth",
    description: "Product discovery, customer research, validation, positioning, marketing, and growth for early-stage founders.",
    type: "website"
  },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
