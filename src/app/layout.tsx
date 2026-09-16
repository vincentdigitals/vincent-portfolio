import type { Metadata } from "next";
import "./globals.css";
import "./readability.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://omoseebivincent.site"),
  alternates: { canonical: "https://omoseebivincent.site" },
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
    url: "https://omoseebivincent.site",
    type: "website",
    siteName: "Omoseebi Vincent"
  },
  twitter: { card: "summary_large_image" },
  icons: {
    icon: "/profile.jpg",
    apple: "/profile.jpg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
