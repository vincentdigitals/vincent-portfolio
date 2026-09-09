import Link from "next/link";
import { posts } from "@/lib/content";

export const metadata = { title: "Blog" };

export default function Blog() {
  return (
    <div className="page">
      <section className="page-intro">
        <p className="eyebrow">BLOG / ANALYSIS</p>
        <h1>Problems behind growth.</h1>
        <p>Research, ideas, and analysis on product, customers, positioning, marketing, and the decisions that shape early-stage growth.</p>
      </section>
      <section className="section">
        <div className="listing">
          {posts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="tag">[{post.type}]</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="meta">{post.number} · {post.date} · {post.topic}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
