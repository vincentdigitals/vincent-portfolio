import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostsByTopic, getTopicFromSlug, getTopicSlug, topics } from "@/lib/content";

export function generateStaticParams() { return topics.map((topic) => ({ slug: getTopicSlug(topic) })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const topic = getTopicFromSlug((await params).slug); return { title: topic ?? "Topic" }; }

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const topic = getTopicFromSlug((await params).slug);
  if (!topic) notFound();
  const topicPosts = getPostsByTopic(topic);
  return <div className="page"><section className="page-intro"><p className="eyebrow">WRITING / TOPIC</p><h1>{topic}.</h1><p>Writing connected to this part of the work: observations, questions, experiments, and lessons in progress.</p></section><section className="section"><div className="section-head"><h2>From the archive.</h2><span className="meta">{topicPosts.length} pieces</span></div><div className="listing">{topicPosts.map((post) => <Link className="post" href={`/blog/${post.slug}`} key={post.slug}><span className="tag">[{post.type}]</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="meta">{post.date} · {post.topic}</span></Link>)}</div></section><p><Link className="arrow-link" href="/blog">Back to all writing ↗</Link></p></div>;
}
