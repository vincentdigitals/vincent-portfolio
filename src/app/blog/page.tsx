import Link from "next/link";
import { getAllPosts } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog",
  description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.",
  alternates: { canonical: `${SITE_ORIGIN}/blog` },
  openGraph: { url: `${SITE_ORIGIN}/blog`, title: "Blog", description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.", type: "website" },
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="page">
      <section className="section blog-intro">
        <p className="eyebrow">BLOG</p>
        <h1>Thinking about product and growth.</h1>
        <p className="section-intro">Practical writing on customers, product discovery, positioning, marketing, sales, and the decisions that shape early-stage growth.</p>
      </section>
      <section className="section">
        <div className="listing">
          {posts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="tag">{post.topic}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="read-link">Read article →</span>
            </Link>
          ))}
          {posts.length === 0 && <p className="empty-state">New writing will appear here.</p>}
        </div>
      </section>
    </div>
  );
}
