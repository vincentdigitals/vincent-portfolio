import Link from "next/link";
import { getTopicSlug, posts, topics } from "@/lib/content";

export const metadata = { title: "Blog" };
export default function Blog() {
	const publishedPosts = posts.filter((post) => post.published !== false);
	const featured = publishedPosts.find((post) => post.featured) ?? publishedPosts[0];
	const archive = publishedPosts.filter((post) => post.slug !== featured?.slug);
	return <div className="page">
		<section className="page-intro"><p className="eyebrow">WRITING / FIELD NOTES</p><h1>Thinking in public.</h1><p>This is where I document what I am learning, researching, testing, and thinking about early-stage companies and growth.</p></section>
		{featured && <section className="section"><div className="section-head"><div><p className="eyebrow">Featured / Current thinking</p><h2>Start here.</h2></div></div><Link className="featured-post" href={`/blog/${featured.slug}`}><span className="tag">[{featured.type}]</span><h3>{featured.title}</h3><p>{featured.excerpt}</p><span className="meta">{featured.date} · {featured.topic}</span></Link></section>}
		<section className="section"><div className="section-head"><div><p className="eyebrow">All writing</p><h2>The archive.</h2></div><span className="meta">{publishedPosts.length} pieces</span></div><div className="listing">{archive.map((post) => <Link className="post" href={`/blog/${post.slug}`} key={post.slug}><span className="tag">[{post.type}]</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="meta">{post.date} · {post.topic}</span></Link>)}</div></section>
		<section className="section topics"><div className="section-head"><div><p className="eyebrow">Explore</p><h2>Topics.</h2></div></div><div className="topic-list">{topics.map((topic) => <Link href={`/blog/topic/${getTopicSlug(topic)}`} key={topic}>{topic}<span>↗</span></Link>)}</div></section>
	</div>;
}
