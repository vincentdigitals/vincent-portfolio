import Link from "next/link";
import { posts } from "@/lib/content";

export const metadata = { title: "Blog" };
export default function Blog() { return <div className="page"><section className="page-intro"><p className="eyebrow">BLOG / FIELD NOTES</p><h1>Thinking in public.</h1><p>Notes from trying to understand the problems that keep early-stage companies from scaling.</p></section><section className="section"><div className="listing">{posts.map((post) => <Link className="post" href={`/blog/${post.slug}`} key={post.slug}><span className="tag">[{post.type}]</span><h3>{post.title}</h3><p>{post.excerpt}</p><span className="meta">{post.number} · {post.date} · {post.topic}</span></Link>)}</div></section></div>; }
