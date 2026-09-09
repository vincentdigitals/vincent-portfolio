import Link from "next/link";
import { posts, resources } from "@/lib/content";

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">EARLY-STAGE GROWTH</p>
          <h1>
            Why isn’t your company growing the way <em>you expected?</em>
          </h1>
        </div>
        <div className="hero-aside">
          <p>
            I’m Omoseebi Vincent. I study what keeps early-stage companies from
            moving forward — then document what I learn through research,
            experiments, and building.
          </p>
          <Link className="arrow-link" href="/about">
            About my work ↗
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Latest writing</h2>
          <Link className="quiet-link" href="/blog">
            View all ↗
          </Link>
        </div>
        <div className="post-grid">
          {posts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <span className="tag">{post.type}</span>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="meta">
                {post.date} · {post.topic}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section method">
        <div>
          <p className="eyebrow">HOW I APPROACH THE WORK</p>
          <h2>
            Understand first.<br />
            Validate second.<br />
            <em>Build third.</em>
          </h2>
        </div>
        <div className="method-copy">
          <div className="method-step">
            <span className="label">01 / Observe</span>
            <strong>Start with what is actually happening.</strong>
            <p>Look for behaviour, friction, patterns, and evidence before jumping to solutions.</p>
          </div>
          <div className="method-step">
            <span className="label">02 / Understand</span>
            <strong>Figure out what may be causing it.</strong>
            <p>Turn assumptions into questions and identify the constraint worth investigating.</p>
          </div>
          <div className="method-step">
            <span className="label">03 / Test</span>
            <strong>Run the smallest useful experiment.</strong>
            <p>Learn cheaply before committing more time, money, or code.</p>
          </div>
          <div className="method-step">
            <span className="label">04 / Learn</span>
            <strong>Let the evidence change the plan.</strong>
            <p>Keep what works, discard what does not, and decide what to do next.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Resources</h2>
          <Link className="quiet-link" href="/resources">
            View all ↗
          </Link>
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
            <h2>What I’m learning about products, customers, and early-stage growth.</h2>
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
