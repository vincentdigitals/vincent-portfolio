import Image from "next/image";
import Link from "next/link";
import { JsonLd, buildProfilePageJsonLd } from "@/components/structured-data";
import { SITE_ORIGIN } from "@/lib/site";


export const metadata = {
  title: "About",
  description: "Omoseebi Vincent works across product discovery, customer research, positioning, marketing, sales, and product building.",
  alternates: { canonical: `${SITE_ORIGIN}/about` },
  openGraph: { url: `${SITE_ORIGIN}/about`, title: "About Omoseebi Vincent", description: "Omoseebi Vincent works across product discovery, customer research, positioning, marketing, sales, and product building.", type: "profile" },
  twitter: { card: "summary", title: "About Omoseebi Vincent", description: "Omoseebi Vincent works across product discovery, customer research, positioning, marketing, sales, and product building." },
};

export default function About() {
  return (
    <>
      <JsonLd data={buildProfilePageJsonLd()} />
      <div className="page">
        <div className="about-layout">
        <section className="about-header">
          <div className="about-profile">
            <Image className="about-profile-image" src="/profile.jpg" alt="Omoseebi Vincent" width={140} height={140} priority />
            <div>
              <p className="eyebrow">OMOSEEBI VINCENT</p>
              <h1>Product, customers, and growth.</h1>
              <p className="section-intro">I work with early-stage founders on the questions that sit between building a product and growing a business.</p>
              <div className="about-socials" aria-label="Social profiles">
                <a href="https://www.linkedin.com/in/omoseebi-vincent/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
                <a href="https://www.instagram.com/vincentomoseebi/" target="_blank" rel="noreferrer">Instagram ↗</a>
                <a href="https://www.youtube.com/@omoseebivincent_creates" target="_blank" rel="noreferrer">YouTube ↗</a>
              </div>
            </div>
          </div>
        </section>

        <article className="article">
          <div className="article-body">
            <p>I&apos;m Omoseebi Vincent.</p>
            <p>I help founders understand what is getting in the way of growth — whether the issue is the product, the customer, the positioning, the message, marketing, sales, or something else.</p>
            <p>My work spans product discovery, customer research, validation, positioning, marketing, sales, and product building.</p>
            <p>I don&apos;t believe every growth problem needs another feature, another campaign, or another channel. Sometimes the right move is to build. Sometimes it is to talk to customers, change the message, test an assumption, or stop doing something that is not working.</p>
            <p>The job is to understand the situation well enough to know which one.</p>

            <h2>How I work</h2>
            <p>I start with the situation in front of me. What are you trying to achieve? What have you tried? What happened? What do customers do, not just what do they say?</p>
            <p>From there, I form a hypothesis, look for evidence, test it where possible, and use what I learn to decide what deserves attention.</p>
            <blockquote>Understand. Diagnose. Fix. Learn.</blockquote>

            <h2>What I&apos;m exploring</h2>
            <p>My writing and experiments focus on the questions early-stage founders run into when growth is not going the way they expected: Are we solving a real problem? Do we understand the customer? Is the product actually valuable? Is the message clear? Are we reaching the right people? What is preventing the next stage of growth?</p>
            <p>I&apos;m still learning, testing, and building in this space. This site is where I document that thinking through research, experiments, observations, and practical frameworks.</p>

            <div className="about-cta">
              <p className="eyebrow">KEEP EXPLORING</p>
              <h2>Want to see how I think about these problems?</h2>
              <p>Read the research, experiments, and ideas I&apos;m working through.</p>
              <Link className="arrow-link" href="/blog">Read the thinking ↗</Link>
            </div>
          </div>
        </article>
        </div>
      </div>
    </>
  );
}
