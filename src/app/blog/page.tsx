import Link from "next/link";
import { contentTypes, getTopicSlug, posts, topics } from "@/lib/content";

export const metadata = { title: "Writing" };
export default async function Blog({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
	const publishedPosts = posts.filter((post) => post.published !== false);
	const selectedType = (await searchParams).type;
	const filteredPosts = selectedType && contentTypes.includes(selectedType as (typeof contentTypes)[number]) ? publishedPosts.filter((post) => post.type === selectedType) : publishedPosts;
	const featured = !selectedType ? publishedPosts.find((post) => post.featured) ?? publishedPosts[0] : undefined;
	const archive = featured ? filteredPosts.filter((post) => post.slug !== featured.slug) : filteredPosts;
	return <div className="page">
		<section className="page-intro"><p className="eyebrow">THINKING IN PUBLIC</p><h1>Trying to understand why early-stage companies struggle to grow.</h1><p>This is my working archive.</p><p>I use it to document what I notice, what I’m trying to understand, what I believe, what I test, and what changes my mind.</p><p>These aren’t supposed to be definitive answers. They’re part of the process of figuring things out.</p></section>
		<section className="section archive-filters"><p className="eyebrow">Explore by type</p><div className="topic-list"><Link href="/blog">All</Link>{contentTypes.map((type) => <Link href={`/blog?type=${type}`} key={type}>{type}</Link>)}</div></section>
		{featured && <section className="section"><div className="section-head"><div><p className="eyebrow">FEATURED THINKING</p><h2>Current thinking.</h2></div></div><Link className="featured-post" href={`/blog/${featured.slug}`}><span className="tag">[{featured.type}]</span><h3>{featured.title}</h3><p>{featured.excerpt}</p><span className="meta">{featured.date} · {featured.topic}</span></Link></section>}
		<section className="section"><div className="section-head"><div><p className="eyebrow">ALL WRITING</p><h2>{selectedType ?? "The archive."}</h2></div><span className="meta">{archive.length} pieces</span></div><div className="listing">{archive.map((post) => <Link className="post" href={`/blog/${post.slug}`} key={post.slug}><span className="tag">[{post.type}]</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="meta">{post.date} · {post.topic}</span></Link>)}{archive.length === 0 && <p className="empty-state">No writing has been published here yet. The archive will grow as the work is documented.</p>}</div></section>
		<section className="section topics"><div className="section-head"><div><p className="eyebrow">Explore</p><h2>Topics.</h2></div></div><div className="topic-list">{topics.map((topic) => <Link href={`/blog/topic/${getTopicSlug(topic)}`} key={topic}>{topic}<span>↗</span></Link>)}</div></section>
	</div>;
}
