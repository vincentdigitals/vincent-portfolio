import { notFound } from "next/navigation";
import Link from "next/link";
import { getCmsSlugs, getPostBySlug, getRelatedPosts, getRelatedResources, type Post } from "@/lib/content";

export const dynamicParams = true;

export async function generateStaticParams() { return (await getCmsSlugs("post")).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const post = await getPostBySlug(decodeURIComponent((await params).slug).trim()); return { title: post?.seoTitle || post?.title || "Blog post", description: post?.seoDescription || post?.excerpt }; }

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug(decodeURIComponent((await params).slug).trim());
  if (!post) notFound();
  const relatedPosts = getRelatedPosts(post);
  const relatedResources = getRelatedResources(post);
  const nextPost = post.nextSlug ? getPostBySlug(post.nextSlug) : undefined;

  return (
    <div className="page">
      <article className="article">
        <p className="eyebrow">{post.topic}</p>
        <h1>{post.title}</h1>
        <p className="meta">{post.date}</p>
        <p className="lead">{post.excerpt}</p>
        <div className="article-body">
          {"bodyBlocks" in post && post.bodyBlocks?.length ? <PortableTextBlocks blocks={post.bodyBlocks} /> : post.sections.map((section, index) => (
            <section key={`${section.heading ?? "section"}-${index}`}>
              {section.heading && <h2>{section.heading}</h2>}
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.quote && <blockquote>{section.quote}</blockquote>}
            </section>
          ))}
        </div>
        <RelatedContent relatedPosts={relatedPosts} relatedResources={relatedResources} nextPost={await nextPost} />
      </article>
    </div>
  );
}

function PortableTextBlocks({ blocks }: { blocks: unknown[] }) {
  return <>{blocks.map((block, index) => {
    if (!isPortableTextBlock(block)) return null;
    const text = block.children.map((child) => child.text).join("");
    if (!text) return null;
    if (block.style === "h2" || block.style === "h3") return block.style === "h2" ? <h2 key={index}>{text}</h2> : <h3 key={index}>{text}</h3>;
    if (block.style === "blockquote") return <blockquote key={index}>{text}</blockquote>;
    return <p key={index}>{text}</p>;
  })}</>;
}

function isPortableTextBlock(value: unknown): value is { style?: string; children: { text: string }[] } {
  if (!value || typeof value !== "object") return false;
  const block = value as { children?: unknown };
  return Array.isArray(block.children) && block.children.every((child) => Boolean(child) && typeof child === "object" && typeof (child as { text?: unknown }).text === "string");
}

function RelatedContent({ relatedPosts, relatedResources, nextPost }: { relatedPosts: Post[]; relatedResources: ReturnType<typeof getRelatedResources>; nextPost?: Post }) {
  if (!relatedPosts.length && !relatedResources.length && !nextPost) return null;
  return (
    <aside className="article-links">
      <div>
        {relatedPosts.length > 0 && <><p className="eyebrow">Related writing</p>{relatedPosts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}>{post.title} ↗</Link>)}</>}
        {relatedResources.length > 0 && <><p className="eyebrow">Related resources</p>{relatedResources.map((resource) => <Link href={`/resources/${resource.slug}`} key={resource.slug}>{resource.title} ↗</Link>)}</>}
      </div>
      {nextPost && <div><p className="eyebrow">Next</p><Link href={`/blog/${nextPost.slug}`}>{nextPost.title} ↗</Link></div>}
    </aside>
  );
}
