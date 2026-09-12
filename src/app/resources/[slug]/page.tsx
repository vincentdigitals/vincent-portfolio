import { notFound } from "next/navigation";
import Link from "next/link";
import { getCmsSlugs, getPost, getResourceBySlug } from "@/lib/content";

export async function generateStaticParams() { return (await getCmsSlugs("resource")).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const resource = await getResourceBySlug((await params).slug); return { title: resource?.seoTitle || resource?.title || "Resource", description: resource?.seoDescription || resource?.description }; }

export default async function ResourcePage({ params }: { params: Promise<{ slug: string }> }) {
  const resource = await getResourceBySlug((await params).slug);
  if (!resource) notFound();
  const relatedPosts = (resource.relatedPostSlugs ?? []).map(getPost).filter((post): post is NonNullable<ReturnType<typeof getPost>> => Boolean(post));

  return (
    <div className="page">
      <article className="article resource-detail">
        <p className="eyebrow">RESOURCE</p>
        <h1>{resource.title}</h1>
        <p className="lead">{resource.description}</p>
        <div className="article-body">
          <h2>What it is</h2>
          <p>{resource.description}</p>
          <h2>Who it is for</h2>
          <p>{resource.audience}</p>
          <h2>How to use it</h2>
          <p>{resource.howToUse}</p>
          <p>
            <a className="arrow-link" href={resource.externalLink ?? resource.fileUrl ?? (resource.access === "Free" ? "#download" : "#request")}>
              {resource.access === "Free" ? "Open the resource ↗" : "Request access ↗"}
            </a>
          </p>
          {!resource.fileUrl && !resource.externalLink && <p className="small-copy">PDF / slide deck coming soon.</p>}
          {relatedPosts.length > 0 && (
            <section className="article-links">
              <div>
                <p className="eyebrow">Related writing</p>
                {relatedPosts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}>{post.title} ↗</Link>)}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>
  );
}
