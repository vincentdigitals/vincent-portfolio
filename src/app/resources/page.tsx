import Link from "next/link";
import { resources } from "@/lib/content";

export const metadata = {
  title: "Resources",
  description: "Practical resources for early-stage founders working on customer research, validation, positioning, and growth."
};

export default function Resources() {
  return (
    <div className="page">
      <section className="page-intro">
        <p className="eyebrow">RESOURCES / PRACTICAL TOOLS</p>
        <h1>Tools for doing the work.</h1>
        <p>Worksheets, checklists, frameworks, and guides for customer research, product validation, positioning, marketing, and early-stage growth.</p>
      </section>
      <section className="section">
        <div className="listing">
          {resources.map((resource) => (
            <Link className="post" href={`/resources/${resource.slug}`} key={resource.slug}>
              <span className="tag">{resource.type} / {resource.access}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span className="meta">TOPIC: {resource.topic}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
