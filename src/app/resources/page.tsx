import Link from "next/link";
import { getAllResources } from "@/lib/content";

export const metadata = {
  title: "Resources",
  description: "Practical resources for customer research, validation, positioning, and product decisions.",
};

export default async function Resources() {
  const resources = await getAllResources();

  return (
    <div className="page">
      <section className="page-intro">
        <p className="eyebrow">RESOURCES</p>
        <h1>Tools for better decisions.</h1>
        <p>Practical worksheets, checklists, and frameworks for customer research, validation, positioning, and product decisions.</p>
      </section>
      <section className="section">
        <div className="listing">
          {resources.map((resource) => (
            <Link className="post" href={`/resources/${resource.slug}`} key={resource.slug}>
              <span className="tag">{resource.type}</span>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span className="meta">View resource →</span>
            </Link>
          ))}
          {resources.length === 0 && <p className="empty-state">New resources will appear here.</p>}
        </div>
      </section>
    </div>
  );
}
