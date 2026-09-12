export const metadata = {
  title: "About",
  description: "Omoseebi Vincent works across product discovery, customer research, positioning, marketing, sales, and product building.",
};

export default function About() {
  return (
    <div className="page">
      <section className="page-intro">
        <p className="eyebrow">ABOUT</p>
        <h1>Product, customers, and growth.</h1>
        <p>I work with early-stage founders on the questions that sit between building a product and growing a business.</p>
      </section>

      <article className="article">
        <div className="article-body">
          <p>I&apos;m Omoseebi Vincent.</p>
          <p>I help founders understand what is getting in the way of growth — whether the issue is the product, the customer, the positioning, the message, marketing, sales, or something else.</p>
          <p>My work spans product discovery, customer research, validation, positioning, marketing, sales, and product building.</p>
          <p>I don&apos;t believe every growth problem needs another feature, another campaign, or another channel. Sometimes the right move is to build. Sometimes it is to talk to customers, change the message, test an assumption, or stop doing something that is not working.</p>
          <p>The job is to understand the situation well enough to know which one.</p>

          <h2>How I work</h2>
          <blockquote>Understand first.<br />Validate second.<br />Build third.</blockquote>

          <p>That principle shapes how I approach products and growth: start with the problem, look for evidence, make the decision, then act.</p>
        </div>
      </article>
    </div>
  );
}
