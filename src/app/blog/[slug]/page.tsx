import { notFound } from "next/navigation";
import Link from "next/link";
import ArticleTableOfContents, { type TableOfContentsItem } from "@/components/article-table-of-contents";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd, JsonLd } from "@/components/structured-data";
import { getCmsSlugs, getNextPost, getPostBySlug, getRelatedPosts, getRelatedResources, type Post, type Resource } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

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
    alternates: { canonical: post ? `${SITE_ORIGIN}/blog/${post.slug}` : `${SITE_ORIGIN}/blog` },
    openGraph: { url: post ? `${SITE_ORIGIN}/blog/${post.slug}` : `${SITE_ORIGIN}/blog`, title: post?.title, description: post?.seoDescription || post?.excerpt, type: "article" },
    twitter: { card: "summary", title: post?.title, description: post?.seoDescription || post?.excerpt },
  };
}

type HeadingBlock = {
  _key?: string;
  style?: string;
  children?: Array<{ text?: string }>;
};

function headingText(block: HeadingBlock) {
  return (block.children ?? []).map((child) => child.text ?? "").join("").trim();
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\\u0300-\\u036f]/g, "")
    .replace(/[^a-z0-9\\s-]/g, "")
    .trim()
    .replace(/\\s+/g, "-")
    .replace(/-+/g, "-");
}

function headingId(block: HeadingBlock, index = 0) {
  return `heading-${block._key || slugifyHeading(headingText(block)) || `section-${index + 1}`}`;
}

function buildTableOfContents(blocks: HeadingBlock[]): TableOfContentsItem[] {
  return blocks
    .filter((block) => block.style === "h2")
    .map((block, index) => {
      const text = headingText(block);
      return { id: headingId(block, index), text, key: block._key ?? `${headingId(block, index)}-${index}` };
    })
    .filter((heading) => heading.text);
}

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const image = value as { assetUrl?: string; alt?: string; caption?: string };
      if (!image.assetUrl) return null;
      return (
        <figure className="article-image">
          <img src={image.assetUrl} alt={image.alt ?? ""} />
          {image.caption && <figcaption>{image.caption}</figcaption>}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children, value }) => <h2 id={headingId(value as HeadingBlock)}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={slugifyHeading(headingText(value as HeadingBlock)) || undefined}>{children}</h3>,
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
    { name: "Home", url: `${SITE_ORIGIN}/` },
    { name: "Blog", url: `${SITE_ORIGIN}/blog` },
    { name: post.title, url: `${SITE_ORIGIN}/blog/${post.slug}` },
  ]);

  return (
    <>
      <JsonLd data={buildBlogPostingJsonLd({ title: post.title, excerpt: post.excerpt, slug: post.slug, publishedAt: post.publishedAt, modifiedAt: post.modifiedAt, author: post.author })} />
      <JsonLd data={breadcrumbJson} />
      <div className="page">
        <div className="article-layout">
          <aside className="article-toc-column article-toc-column-desktop">
            {"bodyBlocks" in post && post.bodyBlocks?.length ? (() => {
              const tableOfContents = buildTableOfContents(post.bodyBlocks as HeadingBlock[]);
              return tableOfContents.length ? <ArticleTableOfContents items={tableOfContents} /> : null;
            })() : null}
          </aside>
          <article className="article">
            <p className="eyebrow">{post.topic}</p>
            <h1>{post.title}</h1>

            <div className="article-meta" aria-label="Article information">
              <span><strong>By</strong> {post.author?.name ?? "Omoseebi Vincent"}</span>
              <span className="divider">·</span>
              <span><strong>Published</strong> {post.publishedAt && post.date ? <time dateTime={post.publishedAt}>{post.date}</time> : "Recently published"}</span>
            </div>

            <p className="lead">{post.excerpt}</p>

            <div className="article-toc-mobile">
              {"bodyBlocks" in post && post.bodyBlocks?.length ? (() => {
                const tableOfContents = buildTableOfContents(post.bodyBlocks as HeadingBlock[]);
                return tableOfContents.length ? <ArticleTableOfContents items={tableOfContents} /> : null;
              })() : null}
            </div>

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
