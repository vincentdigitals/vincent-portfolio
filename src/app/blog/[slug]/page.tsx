import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  return {
    title: post?.title ?? "Blog post",
    description: post?.excerpt
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <div className="page">
      <article className="article">
        <p className="eyebrow">{post.type} / {post.topic}</p>
        <h1>{post.title}</h1>
        <p className="meta">{post.number} · PUBLISHED {post.date}</p>
        <p className="lead">{post.excerpt}</p>
        <div className="article-body">
          {post.body.map((paragraph, index) => (
            index === 2 ? <div key={index}><blockquote>Understand the problem before deciding what to do about it.</blockquote><p>{paragraph}</p></div> : <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
