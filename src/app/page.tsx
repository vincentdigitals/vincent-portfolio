import Link from "next/link";
import { getAllPosts, getAllResources } from "@/lib/content";

const temporaryPost = {
  title: "The problem behind the problem",
  excerpt: "A business not growing is an outcome. The useful question is what is causing it."
};

const workAreas = [
  {
    title: "Customers & Problems",
    description: "Understand who the business is serving, what those customers need, and whether the problem being solved actually matters."
  },
  {
    title: "Product & Positioning",
    description: "Look at whether the product delivers value and whether the right people understand why they should choose it."
  },
  {
    title: "Marketing & Sales",
    description: "Understand how the business reaches people, communicates its value, and turns interest into customers."
  },
  {
    title: "Retention & Growth",
    description: "Look at what happens after customers arrive and find what may be limiting growth beyond the current level."
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
          You have a product. You have some traction. But growth isn&apos;t happening the way you want. I help you figure out what&apos;s actually getting in the way and what needs to change.
        </p>
        <p className="hero-scope">Product. Customers. Positioning. Marketing. Sales. Retention.</p>
        <div className="hero-actions">
          <a className="arrow-link" href="mailto:hello@omoseebivincent.site">Talk about your growth problem →</a>
          <Link className="arrow-link" href="/about">See how I work →</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LATEST THINKING</p>
            <h2>What I&apos;m thinking about.</h2>
          </div>
          <Link className="arrow-link" href="/blog">Read the blog →</Link>
        </div>
        <p className="section-intro">Practical thinking about the problems that get in the way when a business is trying to grow.</p>

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
        <h2>When growth isn&apos;t happening, the problem isn&apos;t always obvious.</h2>
        <p className="section-intro">A growth problem can come from different parts of the business. The first job is figuring out where the problem actually is.</p>
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
        <h2>Don&apos;t assume the problem. Figure it out.</h2>
        <div className="two-column-copy">
          <p>What are you trying to achieve? What have you tried? What are customers actually doing? Where are people dropping off? What evidence do we have?</p>
          <p>Then identify what is most likely getting in the way, test it where possible, and focus on what deserves attention.</p>
        </div>
      </section>

      <section className="section about-preview">
        <div>
          <p className="eyebrow">ABOUT</p>
          <h2>I like figuring out why things aren&apos;t working.</h2>
        </div>
        <div>
          <p>I&apos;m Omoseebi Vincent. My work sits across product, customers, positioning, marketing, sales, retention, and growth — because those problems are often connected.</p>
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
          <a className="arrow-link" href="mailto:hello@omoseebivincent.site">Talk about your growth problem →</a>
        </div>
      </section>
    </div>
  );
}
