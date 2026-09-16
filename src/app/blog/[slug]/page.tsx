import { notFound } from "next/navigation";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd, JsonLd } from "@/components/structured-data";
import { getCmsSlugs, getNextPost, getPostBySlug, getRelatedPosts, getRelatedResources, type Post, type Resource } from "@/lib/content";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getCmsSlugs("post")).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug(decodeURIComponent((await params).slug).trim());
  return {
    title: post?.seoTitle || post?.title || "Blog post",
    description: post?.seoDescription || post?.excerpt,
    alternates: { canonical: post ? `https://omoseebivincent.site/blog/${post.slug}` : "https://omoseebivincent.site/blog" },
    openGraph: { url: post ? `https://omoseebivincent.site/blog/${post.slug}` : "https://omoseebivincent.site/blog", title: post?.title, description: post?.seoDescription || post?.excerpt, type: "article" },
    twitter: { card: "summary", title: post?.title, description: post?.seoDescription || post?.excerpt },
  };
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href;
      if (!href) return <>{children}</>;
      const external = /^https?:\/\//i.test(href);
      return (
        <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined}>
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPostBySlug(decodeURIComponent((await params).slug).trim());
  if (!post) notFound();

  const [relatedPosts, relatedResources, nextPost] = await Promise.all([
    getRelatedPosts(post),
    getRelatedResources(post),
    getNextPost(post),
  ]);

  const breadcrumbJson = buildBreadcrumbJsonLd([
    { name: "Home", url: "https://omoseebivincent.site/" },
    { name: "Blog", url: "https://omoseebivincent.site/blog" },
    { name: post.title, url: `https://omoseebivincent.site/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={buildBlogPostingJsonLd({ title: post.title, excerpt: post.excerpt, slug: post.slug, publishedAt: post.publishedAt, modifiedAt: post.modifiedAt, author: post.author })} />
      <JsonLd data={breadcrumbJson} />
      <div className="page">
        <article className="article">
          <p className="eyebrow">{post.topic}</p>
          <h1>{post.title}</h1>

          <div className="article-meta" aria-label="Article information">
            <span><strong>By</strong> {post.author?.name ?? "Omoseebi Vincent"}</span>
            <span className="divider">·</span>
            <span><strong>Published</strong> {post.date || "Recently published"}</span>
          </div>

          <p className="lead">{post.excerpt}</p>

          <div className="article-body">
            {"bodyBlocks" in post && post.bodyBlocks?.length ? (
              <PortableText value={post.bodyBlocks as never[]} components={portableTextComponents} />
            ) : (
              post.sections.map((section, index) => (
                <section key={`${section.heading ?? "section"}-${index}`}>
                  {section.heading && <h2>{section.heading}</h2>}
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {section.quote && <blockquote>{section.quote}</blockquote>}
                </section>
              ))
            )}
          </div>

          <RelatedContent relatedPosts={relatedPosts} relatedResources={relatedResources} nextPost={nextPost} />
        </article>
      </div>
    </>
  );
}

function RelatedContent({ relatedPosts, relatedResources, nextPost }: { relatedPosts: Post[]; relatedResources: Resource[]; nextPost?: Post }) {
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
