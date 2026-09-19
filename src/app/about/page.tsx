import { JsonLd, buildProfilePageJsonLd } from "@/components/structured-data";
import { SITE_ORIGIN } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

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
      <div className="about-page">
        <section className="about-hero">
          <div className="about-hero-copy">
            <p className="eyebrow">ABOUT ME</p>
            <p className="about-name">Omoseebi Vincent</p>
            <h1>I help early-stage founders figure out what&apos;s holding their growth back.</h1>
            <div className="about-hero-copy-text">
              <p>I&apos;m interested in why some businesses grow and others don&apos;t.</p>
              <p>A founder can have a good product and still struggle to get customers.</p>
              <p>They can have customers and still struggle to keep them.</p>
              <p>They can spend more on marketing and still not see much change.</p>
              <p>When that happens, I like to look at what&apos;s actually going on.</p>
              <p>It could be the product. It could be the customer. It could be the way the business is positioned. It could be marketing, sales, retention, or something else entirely.</p>
              <p>The important part is finding the thing that&apos;s actually getting in the way.</p>
            </div>
            <div className="about-actions">
              <Link className="about-button about-button--dark" href="/blog">Read the blog <span aria-hidden="true">↗</span></Link>
              <a className="about-text-link" href="https://www.linkedin.com/in/omoseebi-vincent/" target="_blank" rel="noreferrer">Connect with me on LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="about-portrait">
            <Image src="/profile.jpg" alt="Omoseebi Vincent" width={420} height={520} priority />
            <p>Product, customers, and growth.</p>
          </div>
        </section>

        <section className="about-section about-section--building">
          <div className="about-section-content">
            <p className="eyebrow">01 / THE FULL LOOP</p>
            <h2>I like building things.</h2>
            <p>My background is in software development, so I enjoy taking an idea and turning it into something people can use.</p>
            <p>But I also enjoy everything around the building.</p>
            <p>Before something is built, there are questions about the problem, the people who have it, and whether the idea makes sense in the first place.</p>
            <p>After it&apos;s built, things get even more interesting.</p>
            <p>You get to see what people actually do.</p>
            <p>What they use.</p>
            <p>What they don&apos;t.</p>
            <p>What they struggle with.</p>
            <p>What brings them back.</p>
            <p>And what makes them leave.</p>
            <p>That&apos;s often where you learn whether the thing you built is actually doing what you thought it would.</p>
          </div>
          <div className="about-loop-visual" aria-label="The relationship between thinking, building, and observing">
            <div className="about-loop-line"><span>01</span><strong>Think</strong><small>Ask better questions</small></div>
            <div className="about-loop-line"><span>02</span><strong>Build</strong><small>Make the idea real</small></div>
            <div className="about-loop-line"><span>03</span><strong>Observe</strong><small>See what people do</small></div>
            <p>Then go back and learn.</p>
          </div>
        </section>

        <section className="about-section about-section--topics">
          <div className="about-section-heading">
            <p className="eyebrow">02 / THE QUESTIONS</p>
            <h2>What I spend my time thinking about</h2>
          </div>
          <div className="about-topics-list" aria-label="Areas of interest">
            <span>Product.</span><span>Customers.</span><span>Positioning.</span><span>Marketing.</span><span>Sales.</span><span>Retention.</span><span>Growth.</span>
          </div>
          <div className="about-topics-copy">
            <p>Not as separate topics, but as parts of the same business.</p>
            <p>Because when something isn&apos;t growing, adding more features or doing more marketing isn&apos;t always the answer.</p>
            <p>Sometimes you need to step back and figure out what&apos;s actually wrong.</p>
            <p>That&apos;s the kind of problem I enjoy working through.</p>
          </div>
        </section>

        <section className="about-cta">
          <p className="eyebrow">FOR FOUNDERS</p>
          <h2>If you&apos;re building something</h2>
          <p>If you&apos;re an early-stage founder trying to figure out what&apos;s not working, what to focus on, or what to do next, you can follow my work here.</p>
          <p>I share what I&apos;m finding through my writing, research, and conversations with founders.</p>
          <div className="about-actions">
            <Link className="about-button about-button--light" href="/blog">Read my blog <span aria-hidden="true">↗</span></Link>
            <a className="about-button about-button--outline" href="https://www.linkedin.com/in/omoseebi-vincent/" target="_blank" rel="noreferrer">Connect with me on LinkedIn <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </div>
    </>
  );
}
