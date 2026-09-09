import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getRelatedPosts, getRelatedResources, posts } from "@/lib/content";

export function generateStaticParams() { return posts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const post = getPost((await params).slug); return { title: post?.title ?? "Blog post", description: post?.excerpt }; }
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const post = getPost((await params).slug);
	if (!post) notFound();
	const relatedPosts = getRelatedPosts(post);
	const relatedResources = getRelatedResources(post);
	const nextPost = post.nextSlug ? getPost(post.nextSlug) : undefined;
	return <div className="page"><article className="article"><p className="eyebrow">[{post.type}] {post.number ? `/ ${post.number}` : ""}</p><h1>{post.title}</h1><p className="meta">PUBLISHED {post.date} · TOPIC: {post.topic}</p><p className="lead">{post.excerpt}</p><div className="article-body">{post.sections.map((section, index) => <section key={`${section.heading ?? "section"}-${index}`}>{section.heading && <h2>{section.heading}</h2>}{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.quote && <blockquote>{section.quote}</blockquote>}</section>)}</div><RelatedContent relatedPosts={relatedPosts} relatedResources={relatedResources} nextPost={nextPost} /></article></div>;
}

function RelatedContent({ relatedPosts, relatedResources, nextPost }: { relatedPosts: ReturnType<typeof getRelatedPosts>; relatedResources: ReturnType<typeof getRelatedResources>; nextPost: ReturnType<typeof getPost> }) {
	if (!relatedPosts.length && !relatedResources.length && !nextPost) return null;
	return <aside className="article-links"><div>{relatedPosts.length > 0 && <><p className="eyebrow">Related writing</p>{relatedPosts.map((post) => <Link href={`/blog/${post.slug}`} key={post.slug}>{post.title} ↗</Link>)}</>}{relatedResources.length > 0 && <><p className="eyebrow">Related resources</p>{relatedResources.map((resource) => <Link href={`/resources/${resource.slug}`} key={resource.slug}>{resource.title} ↗</Link>)}</>}</div>{nextPost && <div><p className="eyebrow">Next article</p><Link href={`/blog/${nextPost.slug}`}>{nextPost.title} ↗</Link></div>}</aside>;
}
