import Image from "next/image";
import Link from "next/link";
import { JsonLd, buildProfilePageJsonLd } from "@/components/structured-data";
import { SITE_ORIGIN } from "@/lib/site";

export const metadata = {
  title: "About",
  description: "Omoseebi Vincent helps early-stage founders figure out what is getting in the way of growth across product, customers, positioning, marketing, sales, and retention.",
  alternates: { canonical: `${SITE_ORIGIN}/about` },
  openGraph: { url: `${SITE_ORIGIN}/about`, title: "About Omoseebi Vincent", description: "Omoseebi Vincent helps early-stage founders figure out what is getting in the way of growth across product, customers, positioning, marketing, sales, and retention.", type: "profile" },
  twitter: { card: "summary", title: "About Omoseebi Vincent", description: "Omoseebi Vincent helps early-stage founders figure out what is getting in the way of growth across product, customers, positioning, marketing, sales, and retention." },
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
                <h1>I help early-stage founders figure out what&apos;s getting in the way of growth.</h1>
                <p className="section-intro">For founders who have built something, have some traction, but aren&apos;t growing the way they want.</p>
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
              <p>I&apos;m interested in the point where a founder knows the business should be growing, but can&apos;t quite figure out why it isn&apos;t.</p>
              <p>You might already have a product. You might already have customers. You might even be making revenue. But something is stopping the business from moving beyond where it is now.</p>
              <p>Sometimes the problem is the product. Sometimes it&apos;s the customer, the positioning, the marketing, the sales process, distribution, or retention. And sometimes the obvious problem isn&apos;t the real one.</p>
              <p>That&apos;s the kind of problem I enjoy working through.</p>

              <h2>What I look at</h2>
              <p>I don&apos;t want to assume the answer before understanding the situation.</p>
              <p>What are you trying to achieve? Who are you trying to serve? What are customers actually doing? What have you tried? Where are people dropping off? What alternatives are they choosing? What evidence do we have?</p>
              <p>Those questions can lead in different directions. They might point to the product, the customer, positioning, marketing, sales, distribution, or retention.</p>
              <p>The point is to find where the problem actually is and focus on what needs to change.</p>

              <h2>I like building things</h2>
              <p>My background is in software development, so I enjoy turning ideas into things people can use.</p>
              <p>But I also enjoy what happens before and after the build.</p>
              <p>Before something is built, there are questions about the problem, the people who have it, and whether the idea makes sense. After it is built, you get to see what people actually do — what they use, what they ignore, what they struggle with, what brings them back, and what makes them leave.</p>
              <p>That is where product and growth start to connect.</p>

              <h2>What I write about</h2>
              <p>My writing covers product, customers, positioning, marketing, sales, retention, and growth.</p>
              <p>Not because they are separate interests, but because a business can struggle to grow for very different reasons. I want to understand those reasons and share what I find.</p>

              <div className="about-cta">
                <p className="eyebrow">KEEP EXPLORING</p>
                <h2>Want to see how I think about growth problems?</h2>
                <p>Read the research, experiments, and practical thinking on the blog.</p>
                <Link className="arrow-link" href="/blog">Read the blog ↗</Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
