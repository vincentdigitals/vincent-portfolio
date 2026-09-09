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
      <article className="article resource-detail">
        <p className="eyebrow">{resource.type} / {resource.topic}</p>
        <h1>{resource.title}</h1>
        <p className="lead">{resource.description}</p>
        <div className="article-body">
          <p>A practical resource for early-stage founders working on {resource.topic.toLowerCase()}.</p>
          <h2>How to use it</h2>
          <p>Use the resource to structure your thinking, capture what you know, and make the next decision clearer before committing more time or resources.</p>

          {/* RESOURCE FILE
              Add the finished PDF or slide deck here:
              /public/resources/{resource.slug}.pdf

              The public URL is:
              /resources/{resource.slug}.pdf
          */}
          <div className="resource-file-note">
            <span className="meta">RESOURCE FILE</span>
            <p>PDF / slide deck will be added here.</p>
          </div>
        </div>
      </article>
    </div>
  );
}
