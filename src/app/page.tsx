import Link from "next/link";
import { posts, resources } from "@/lib/content";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">EARLY-STAGE FOUNDERS</p>
          <h1>
            Find what’s holding your business back. <em>Fix the right problem.</em>
          </h1>
        </div>
        <div className="hero-aside">
          <p>
            I work with early-stage founders to understand what is preventing their business from growing and determine what to work on next.
          </p>
          <p>
            My work spans product discovery, customer and market research, validation, positioning, messaging, marketing, sales, and growth — depending on where the real constraint is.
          </p>
          <Link className="arrow-link" href="/about">
            About my work ↗
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>What I work on</h2>
        </div>
        <div className="method-copy">
          <div className="method-step"><span className="label">01 / PRODUCT & CUSTOMER</span><strong>Understand the problem.</strong><p>Product discovery, customer research, market research, and validation.</p></div>
          <div className="method-step"><span className="label">02 / POSITIONING & MESSAGE</span><strong>Make the value clear.</strong><p>Positioning, messaging, copywriting, and offers that connect the product to the right customer.</p></div>
          <div className="method-step"><span className="label">03 / MARKETING & SALES</span><strong>Find what creates demand.</strong><p>Marketing, distribution, founder-led sales, and experiments that test how customers are reached and converted.</p></div>
          <div className="method-step"><span className="label">04 / GROWTH</span><strong>Find the constraint.</strong><p>When growth stalls, I look at the whole system before deciding which part needs to change.</p></div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><p className="eyebrow">THE BLOG</p><h2>Ideas, research, and analysis.</h2></div>
          <Link className="quiet-link" href="/blog">View all ↗</Link>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="tag">{post.type}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="meta">{post.date} · {post.topic}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div><p className="eyebrow">RESOURCES</p><h2>Practical tools for doing the work.</h2></div>
          <Link className="quiet-link" href="/resources">View all ↗</Link>
        </div>
        <div className="resource-strip">
          {resources.map((resource) => (
            <Link className="resource" href={`/resources/${resource.slug}`} key={resource.slug}>
              <span className="tag">{resource.type} · {resource.access}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section newsletter-section">
        <div className="newsletter">
          <div>
            <p className="eyebrow">EMAIL NOTES</p>
            <h2>Practical thinking on products, customers, and early-stage growth.</h2>
          </div>
          <form className="newsletter-form">
            <input aria-label="Email address" type="email" placeholder="your@email.com" />
            <button type="submit">Subscribe ↗</button>
          </form>
        </div>
      </section>
    </div>
  );
}
