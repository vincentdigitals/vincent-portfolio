import Link from "next/link";
import { getAllPosts } from "@/lib/content";

export const metadata = { title: "Blog" };
export default async function Blog() { const posts = await getAllPosts(); return <div className="page"><section className="page-intro"><p className="eyebrow">BLOG / ANALYSIS</p><h1>Thinking through the problems behind growth.</h1><p>Research, observations, experiments, and practical thinking about customers, products, positioning, marketing, and early-stage growth.</p></section><section className="section"><div className="listing">{posts.map((post) => <Link className="post" href={`/blog/${post.slug}`} key={post.slug}><span className="tag">[{post.type}]</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="meta">{post.number ?? ""} · {post.date} · {post.topic}</span></Link>)}</div></section></div>; }
