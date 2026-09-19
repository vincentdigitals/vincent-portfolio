import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogListing, { POSTS_PER_PAGE } from "../../blog-listing";
import { getPostsPage } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const page = parsePage((await params).page);
  const canonical = `${SITE_ORIGIN}/blog/page/${page}`;
  return {
    title: `Blog — Page ${page}`,
    description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.",
    alternates: { canonical },
    openGraph: { url: canonical, title: `Blog — Page ${page}`, description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.", type: "website" },
  };
}

function parsePage(value: string) {
  const page = Number(value);
  if (!Number.isInteger(page) || page < 2) notFound();
  return page;
}

export default async function PaginatedBlogPage({ params }: { params: Promise<{ page: string }> }) {
  const page = parsePage((await params).page);
  const data = await getPostsPage(page, POSTS_PER_PAGE);
  const { total } = data;
  if (page > Math.max(1, Math.ceil(total / POSTS_PER_PAGE))) notFound();
  return <BlogListing page={page} data={data} />;
}