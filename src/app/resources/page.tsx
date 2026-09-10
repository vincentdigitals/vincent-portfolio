import Link from "next/link";
import { getAllResources } from "@/lib/content";

export const metadata = { title: "Resources", description: "Practical resources for early-stage founders working on customer research, validation, positioning, and growth." };

export default async function Resources() {
  const resources = await getAllResources();
  return <div className="page"><section className="page-intro"><p className="eyebrow">RESOURCES / PRACTICAL TOOLS</p><h1>Tools for doing the work.</h1><p>Worksheets, checklists, frameworks, and guides for understanding customers, testing ideas, clarifying positioning, and making better product decisions.</p></section><section className="section"><div className="listing">{resources.map((resource) => <Link className="post" href={`/resources/${resource.slug}`} key={resource.slug}><span className="tag">{resource.type} / {resource.access}</span><h3>{resource.title}</h3><p>{resource.description}</p><span className="meta">TOPIC: {resource.topic}</span></Link>)}{resources.length === 0 && <p className="empty-state">Resources will appear here as practical tools are published.</p>}</div></section></div>;
}
