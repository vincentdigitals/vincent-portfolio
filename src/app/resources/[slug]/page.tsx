import { notFound } from "next/navigation";
import { getResource, resources } from "@/lib/content";

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resource = getResource((await params).slug);
  return {
    title: resource?.title ?? "Resource",
    description: resource?.description
  };
}

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const resource = getResource((await params).slug);
  if (!resource) notFound();

  return (
    <div className="page">
      <article className="article">
        <p className="eyebrow">{resource.type} / {resource.topic}</p>
        <h1>{resource.title}</h1>
        <p className="lead">{resource.description}</p>
        <div className="article-body">
          <p>A practical resource for early-stage founders working on {resource.topic.toLowerCase()}.</p>
          <h2>How to use it</h2>
          <p>Use the resource to structure your thinking, capture what you know, and make the next decision clearer before committing more time or resources.</p>

          {/* RESOURCE FILE
              When the PDF or slide deck is ready, add it to /public/resources/
              and replace the href below with the filename.
              Example: href="/resources/your-file.pdf"
          */}
          <p>
            <a className="arrow-link" href={`/resources/files/${resource.slug}.pdf`} target="_blank" rel="noreferrer">
              Open the {resource.type.toLowerCase()} ↗
            </a>
          </p>
        </div>
      </article>
    </div>
  );
}
