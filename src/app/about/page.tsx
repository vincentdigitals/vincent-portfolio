import { JsonLd, buildProfilePageJsonLd } from "@/components/structured-data";
import { SITE_ORIGIN } from "@/lib/site";
import Link from "next/link";

export const metadata = {
  title: "About",
  description: "Omoseebi Vincent helps early-stage founders understand what is getting in the way of growth across customers, product, positioning, marketing, sales, and growth.",
  alternates: { canonical: `${SITE_ORIGIN}/about` },
  openGraph: { url: `${SITE_ORIGIN}/about`, title: "About Omoseebi Vincent", description: "Omoseebi Vincent helps early-stage founders understand what is getting in the way of growth across customers, product, positioning, marketing, sales, and growth.", type: "profile" },
  twitter: { card: "summary", title: "About Omoseebi Vincent", description: "Omoseebi Vincent helps early-stage founders understand what is getting in the way of growth across customers, product, positioning, marketing, sales, and growth." },
};

export default function About() {
  return (
    <>
      <JsonLd data={buildProfilePageJsonLd()} />
      <div className="page">
        <section className="page-intro">
          <p className="eyebrow">ABOUT ME</p>
          <h1>I&apos;m interested in why some products grow — and others don&apos;t.</h1>
          <p>I work with early-stage founders to understand what is getting in the way of growth, find the real constraint, and figure out what is worth fixing.</p>
        </section>

        <article className="article">
          <div className="article-body">
            <p>I&apos;m Omoseebi Vincent.</p>
            <p>I&apos;m a product builder and researcher interested in the messy part of building an early-stage business: figuring out what people actually need, what they are responding to, and why a product that seems useful still may not be growing.</p>
            <p>That means I spend a lot of time thinking about customers, problems, product decisions, positioning, messaging, marketing, sales, retention, and growth.</p>
            <p>I don&apos;t see those as separate problems. A founder can have a good product and still struggle because the wrong people are hearing about it. A marketing problem can actually be a positioning problem. A product problem can actually start with a misunderstanding of the customer.</p>
            <p>So before jumping to another feature, campaign, channel, or tactic, I want to understand what is actually happening.</p>

            <h2>How I work</h2>
            <p>I start with the situation in front of me. What are you trying to achieve? What have you tried? What happened? What do customers do, not just what do they say?</p>
            <p>From there, I form a hypothesis, look for evidence, test it where possible, and use what I learn to decide what deserves attention.</p>
            <blockquote>Understand. Diagnose. Fix. Learn.</blockquote>

            <h2>Why this matters to me</h2>
            <p>I&apos;ve spent much of my own work moving between building products and trying to understand the people they are meant for. Working on products has made one thing increasingly clear to me: building is often the easiest part to start. Knowing what deserves to be built, for whom, and why is much harder.</p>
            <p>That is the space I want to keep getting better at.</p>

            <h2>What I&apos;m exploring</h2>
            <p>My writing and experiments focus on the questions early-stage founders run into when growth is not going the way they expected: Are we solving a real problem? Do we understand the customer? Is the product actually valuable? Is the message clear? Are we reaching the right people? What is preventing the next stage of growth?</p>
            <p>I&apos;m still learning, testing, and building in this space. This site is where I document that thinking — through research, experiments, observations, and practical frameworks.</p>

            <div className="about-cta">
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>Want to see how I think about these problems?</h2>
              <p>Read the research, experiments, and ideas I&apos;m working through.</p>
              <Link className="arrow-link" href="/blog">Read the thinking ↗</Link>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}
