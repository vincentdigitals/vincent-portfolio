import BlogListing from "./blog-listing";
import { SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: { url: `${SITE_ORIGIN}/blog`, title: "Blog", description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.", type: "website" },
};

export default function Blog() {
  return <BlogListing page={1} />;
}
