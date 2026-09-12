import Link from "next/link";
import { getAllPosts, getAllResources } from "@/lib/content";

const temporaryPost = {
  title: "The problem behind the problem",
  excerpt: "A business not growing is an outcome. The useful question is what is causing it."
};

const workAreas = [
  {
    title: "Customers & Problems",
    description: "Understand the customer, the problem, and what is actually happening before deciding what to build or change."
  },
  {
    title: "Product & Positioning",
    description: "Work out whether the product solves a meaningful problem and whether the right people understand why it matters."
  },
  {
    title: "Marketing & Sales",
    description: "Find better ways to reach the right people, communicate the value, and turn attention into real conversations and customers."
  },
  {
    title: "Growth",
    description: "Look at the whole system to find what is limiting growth now — then decide what deserves attention."
  }
];

export default async function HomePage() {
  const [posts, resources] = await Promise.all([getAllPosts(), getAllResources()]);
  const latestPosts = posts.slice(0, 3);

  return (
    <div>
      <section className="hero">
        <p className="eyebrow">FOR EARLY-STAGE FOUNDERS</p>
        <h1>Find what&apos;s holding your growth back. Fix the right thing.</h1>
        <p className="hero-copy">
          I help early-stage founders understand what is getting in the way of growth, decide what needs fixing, and work on it.
        </p>
        <p className="hero-scope">Product. Customers. Positioning. Marketing. Sales. Growth.</p>
        <Link className="arrow-link" href="/about">See how I work →</Link>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LATEST THINKING</p>
            <h2>What I&apos;m thinking about.</h2>
          </div>
          <Link className="arrow-link" href="/blog">Read the blog →</Link>
        </div>
        <p className="section-intro">Ideas and practical thinking about the problems that sit behind product and growth.</p>

        {latestPosts.length > 0 ? (
          <div className="card-grid">
            {latestPosts.map((post) => (
              <Link className="content-card" href={`/blog/${post.slug}`} key={post.slug}>
                <p className="card-meta">{post.topic}</p>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span>Read →</span>
              </Link>
            ))}
          </div>
        ) : (
          <article className="content-card featured-card">
            <p className="card-meta">THINKING</p>
            <h3>{temporaryPost.title}</h3>
            <p>{temporaryPost.excerpt}</p>
          </article>
        )}
      </section>

      <section className="section">
        <p className="eyebrow">WHAT I WORK ON</p>
        <h2>Find the problem. Fix what matters.</h2>
        <div className="work-grid">
          {workAreas.map((area, index) => (
            <article className="work-item" key={area.title}>
              <span className="work-number">0{index + 1}</span>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <p className="eyebrow">HOW I WORK</p>
        <h2>Understand. Diagnose. Fix. Learn.</h2>
        <p className="workflow">UNDERSTAND → DIAGNOSE → FIX → LEARN</p>
        <div className="two-column-copy">
          <p>What is actually happening? What do customers need? What assumption is behind the decision? What evidence do we have?</p>
          <p>Then decide what deserves attention, act on it, and learn from what happens.</p>
        </div>
      </section>

      <section className="section about-preview">
        <div>
          <p className="eyebrow">ABOUT</p>
          <h2>Product, customers, and growth are connected.</h2>
        </div>
        <div>
          <p>I&apos;m Omoseebi Vincent. My work sits across product discovery, customer research, validation, positioning, marketing, sales, and product building.</p>
          <Link className="arrow-link" href="/about">More about my work →</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">RESOURCES</p>
            <h2>Useful tools for the work.</h2>
          </div>
          <Link className="arrow-link" href="/resources">View resources →</Link>
        </div>
        {resources.length > 0 ? (
          <div className="card-grid">
            {resources.slice(0, 3).map((resource) => (
              <Link className="content-card" href={`/resources/${resource.slug}`} key={resource.slug}>
                <p className="card-meta">{resource.type}</p>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <span>View resource →</span>
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
          <Link className="arrow-link" href="/about">See how I work →</Link>
        </div>
      </section>
    </div>
  );
}
