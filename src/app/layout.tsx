import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";

export const metadata: Metadata = {
  metadataBase: new URL("https://omoseebivincent.com"),
  title: { default: "Omoseebi Vincent — Understand first.", template: "%s — Omoseebi Vincent" },
  description: "Research and practical notes on the constraints keeping early-stage companies from growing.",
  openGraph: { title: "Omoseebi Vincent", description: "Understand first. Validate second. Build third.", type: "website" },
  twitter: { card: "summary_large_image" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SiteHeader /><main>{children}</main><SiteFooter /></body></html>;
}
