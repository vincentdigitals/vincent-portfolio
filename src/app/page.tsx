import Link from "next/link";
import { getAllPosts, getAllResources } from "@/lib/content";

const workAreas = [
  { number: "01", title: "Customers & Problems", copy: "Understand the customer, the problem, and what is actually happening before deciding what to build or change.", terms: "Customer research · Problem discovery · Validation" },
  { number: "02", title: "Product & Positioning", copy: "Work out whether the product solves a meaningful problem and whether the right people understand why it matters.", terms: "Product discovery · Product strategy · Positioning · Messaging" },
  { number: "03", title: "Marketing & Sales", copy: "Find better ways to reach the right people, communicate the value, and turn attention into real conversations and customers.", terms: "Marketing · Distribution · Copy · Founder-led sales" },
  { number: "04", title: "Growth", copy: "Look at the whole system to find what is limiting growth now — then decide what deserves attention.", terms: "Acquisition · Retention · Experiments · Growth" },
];

const temporaryPost = {
  slug: "the-problem-behind-the-problem",
  title: "The problem behind the problem",
  excerpt: "A business not growing is an outcome. The useful question is what is causing it.",
};

export default async function Home() {
  const [posts, resources] = await Promise.all([getAllPosts(), getAllResources()]);
  const latestPosts = posts.length > 0 ? posts.slice(0, 3) : [temporaryPost];

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">FOR EARLY-STAGE FOUNDERS</p>
          <h1>Find what&apos;s holding your growth back.</h1>
        </div>
        <div className="hero-aside">
          <p>I help early-stage founders understand what is getting in the way of growth — and decide what to fix next.</p>
          <p>Product. Customers. Positioning. Marketing. Sales. Growth.</p>
          <Link className="arrow-link" href="/about">See how I work →</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">LATEST THINKING</p>
            <h2>What I&apos;m thinking about.</h2>
          </div>
          <Link className="arrow-link" href="/blog">Read the blog →</Link>
        </div>
        <p className="section-intro">Ideas and practical thinking about the problems that sit behind product and growth.</p>
        <div className="post-grid">
          {latestPosts.map((post) => (
            <Link className="post" href={`/blog/${post.slug}`} key={post.slug}>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <span className="meta">Read →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">WHAT I WORK ON</p>
        <h2>Find the problem. Then work on the right thing.</h2>
        <div className="method-copy">
          {workAreas.map((area) => (
            <div className="method-step" key={area.number}>
              <span className="label">{area.number} — {area.title}</span>
              <p>{area.copy}</p>
              <p className="small-copy">{area.terms}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section method">
        <div>
          <p className="eyebrow">HOW I WORK</p>
          <h2>Understand first. Then decide.</h2>
        </div>
        <div>
          <p className="workflow">UNDERSTAND → VALIDATE → DECIDE → BUILD → LEARN</p>
          <div className="copy-columns">
            <div>
              <p>What is actually happening?</p>
              <p>What are we assuming?</p>
            </div>
            <div>
              <p>What evidence do we have?</p>
              <p>What is the smallest useful test?</p>
            </div>
          </div>
          <p className="closing-line">Understand first.<br />Validate second.<br />Build third.</p>
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">ABOUT</p>
        <h2>Product, customers, and growth are connected.</h2>
        <div className="copy-columns">
          <div>
            <p>I&apos;m Omoseebi Vincent. My work sits across product discovery, customer research, validation, positioning, marketing, sales, and product building.</p>
          </div>
          <div>
            <p>I care about the decisions around building: understanding the problem, knowing who it matters to, testing what might be true, and deciding what deserves attention.</p>
          </div>
        </div>
        <Link className="arrow-link" href="/about">More about my work →</Link>
      </section>

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">RESOURCES</p>
            <h2>Useful tools for the work.</h2>
          </div>
          <Link className="arrow-link" href="/resources">View resources →</Link>
        </div>
        <p className="section-intro">Practical worksheets, checklists, and frameworks for customer research, validation, positioning, and product decisions.</p>
        {resources.length > 0 ? (
          <div className="resource-strip">
            {resources.slice(0, 3).map((resource) => (
              <Link className="resource" href={`/resources/${resource.slug}`} key={resource.slug}>
                <span className="tag">{resource.type}</span>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty-state">Resources will appear here as they are published.</p>
        )}
      </section>

      <section className="section">
        <div className="newsletter">
          <p className="eyebrow">START WITH THE PROBLEM</p>
          <h2>Before doing more, make sure you know what needs fixing.</h2>
          <p>More features won&apos;t fix the wrong problem. More traffic won&apos;t fix the wrong message.</p>
          <Link className="arrow-link" href="/contact">Talk about the problem →</Link>
        </div>
      </section>
    </div>
  );
}
