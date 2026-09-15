import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
  description: "Practical thinking on product, customers, positioning, marketing, sales, and early-stage growth.",
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <div className="page">
      <section className="page-intro">
        <p className="eyebrow">BLOG</p>
        <h1>Thinking about product and growth.</h1>
        <p>Practical writing on customers, product discovery, positioning, marketing, sales, and the decisions that shape early-stage growth.</p>
      </section>
      <section className="section">
        <div className="listing">
          {posts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="tag">{post.topic}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="meta">Read →</span>
            </Link>
          ))}
          {posts.length === 0 && <p className="empty-state">New writing will appear here.</p>}
        </div>
      </section>
    </div>
  );
}
