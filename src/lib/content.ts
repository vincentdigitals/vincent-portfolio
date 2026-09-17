export type ContentType = "Essay" | "Observation" | "Hypothesis" | "Experiment" | "Lesson" | "Research" | "Note";
export const contentTypes: ContentType[] = ["Observation", "Hypothesis", "Experiment", "Research", "Essay", "Lesson", "Note"];

export type ArticleSection = { heading?: string; paragraphs: string[]; quote?: string; };

export type Author = {
  name: string;
  slug?: string;
  bio?: string;
  image?: string;
  url?: string;
  sameAs?: string[];
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  type: ContentType;
  topic: string;
  date: string;
  publishedAt?: string;
  modifiedAt?: string;
  number?: string;
  featured?: boolean;
  published?: boolean;
  body: string[];
  sections: ArticleSection[];
  relatedPostSlugs?: string[];
  relatedResourceSlugs?: string[];
  nextSlug?: string;
  bodyBlocks?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
  author?: Author;
};

export type Resource = {
  slug: string;
  title: string;
  description: string;
  type: "Guide" | "Checklist" | "Framework" | "Worksheet";
  access: "Free" | "Gated";
  topic: string;
  audience: string;
  purpose: string;
  howToUse: string;
  relatedPostSlugs?: string[];
  fileUrl?: string;
  externalLink?: string;
  seoTitle?: string;
  seoDescription?: string;
};

import { sanityFetch, sanityConfigured } from "@/sanity/client";
import { postBySlugQuery, postsQuery, resourceBySlugQuery, resourcesQuery, resourceSlugsQuery, postSlugsQuery, topicTitlesQuery, topicBySlugQuery } from "@/sanity/queries";

type SanityAuthor = {
  name?: string;
  slug?: string;
  bio?: string;
  url?: string;
  sameAs?: string[];
};

type SanityPost = {
  slug: string;
  title: string;
  excerpt: string;
  body?: unknown[];
  topic?: string;
  author?: SanityAuthor | null;
  relatedPostSlugs?: string[];
  relatedResourceSlugs?: string[];
  nextSlug?: string;
  publishedAt?: string;
  modifiedAt?: string;
  featured?: boolean;
  seoTitle?: string;
  seoDescription?: string;
};

type SanityResource = {
  slug: string;
  title: string;
  description: string;
  type: Resource["type"];
  access: Resource["access"];
  topic?: string;
  relatedPostSlugs?: string[];
  file?: { asset?: { url?: string } };
  externalLink?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function formatDate(date?: string) {
  return date ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date)) : "";
}

function getDefaultAuthor(): Author {
  return {
    name: "Omoseebi Vincent",
    url: "https://omoseebivincent.site/about",
    sameAs: [
      "https://www.linkedin.com/in/omoseebi-vincent/",
      "https://www.instagram.com/vincentomoseebi/",
      "https://www.youtube.com/@omoseebivincent_creates",
    ],
  };
}

function mapSanityPost(post: SanityPost): Post & { bodyBlocks?: unknown[]; seoTitle?: string; seoDescription?: string } {
  const defaultAuthor = getDefaultAuthor();
  const author = post.author ? { name: post.author.name ?? defaultAuthor.name, slug: post.author.slug, bio: post.author.bio, url: post.author.url, sameAs: post.author.sameAs } : defaultAuthor;

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    type: "Essay",
    topic: post.topic ?? "Uncategorised",
    date: formatDate(post.publishedAt),
    publishedAt: post.publishedAt,
    modifiedAt: post.modifiedAt,
    featured: post.featured,
    published: true,
    body: [],
    sections: [],
    bodyBlocks: post.body,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
    author,
    relatedPostSlugs: post.relatedPostSlugs,
    relatedResourceSlugs: post.relatedResourceSlugs,
    nextSlug: post.nextSlug,
  };
}

function mapSanityResource(resource: SanityResource): Resource & { fileUrl?: string; externalLink?: string; seoTitle?: string; seoDescription?: string } {
  return {
    slug: resource.slug,
    title: resource.title,
    description: resource.description,
    type: resource.type,
    access: resource.access,
    topic: resource.topic ?? "Uncategorised",
    audience: "For founders working through an early-stage problem.",
    purpose: resource.description,
    howToUse: "Work through the resource and adapt it to the problem in front of you.",
    fileUrl: resource.file?.asset?.url,
    externalLink: resource.externalLink,
    seoTitle: resource.seoTitle,
    seoDescription: resource.seoDescription,
    relatedPostSlugs: resource.relatedPostSlugs,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  if (!sanityConfigured) return posts;
  const result = await sanityFetch<SanityPost[]>(postsQuery);
  return result?.map(mapSanityPost) ?? posts;
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  if (!sanityConfigured) return getPost(slug);
  const result = await sanityFetch<SanityPost | null>(postBySlugQuery, { slug });
  return result ? mapSanityPost(result) : getPost(slug);
}

export async function getAllResources(): Promise<Resource[]> {
  if (!sanityConfigured) return resources;
  const result = await sanityFetch<SanityResource[]>(resourcesQuery);
  return result?.map(mapSanityResource) ?? resources;
}

export async function getResourceBySlug(slug: string): Promise<Resource | undefined> {
  if (!sanityConfigured) return getResource(slug);
  const result = await sanityFetch<SanityResource | null>(resourceBySlugQuery, { slug });
  return result ? mapSanityResource(result) : getResource(slug);
}

export async function getCmsSlugs(kind: "post" | "resource"): Promise<string[]> {
  if (!sanityConfigured) return kind === "post" ? posts.map((post) => post.slug) : resources.map((resource) => resource.slug);
  const result = await sanityFetch<string[]>(kind === "post" ? postSlugsQuery : resourceSlugsQuery);
  return result ?? (kind === "post" ? posts.map((post) => post.slug) : resources.map((resource) => resource.slug));
}

export async function getCmsTopicTitles(): Promise<string[]> {
  if (!sanityConfigured) return topics;
  const result = await sanityFetch<{ title: string }[]>(topicTitlesQuery);
  return result?.map((item: { title: string }) => item.title) ?? topics;
}

export async function getTopicBySlug(slug: string): Promise<string | undefined> {
  if (!sanityConfigured) return getTopicFromSlug(slug);
  const result = await sanityFetch<{ title: string } | null>(topicBySlugQuery, { slug });
  return result?.title ?? getTopicFromSlug(slug);
}

export const posts: Post[] = [];
export const resources: Resource[] = [];
export const topics: string[] = [];
export function getPost(slug: string) { return posts.find((post) => post.slug === slug && post.published !== false); }
export function getResource(slug: string) { return resources.find((resource) => resource.slug === slug); }
export async function getPostsByTopic(topic: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.published !== false && post.topic.toLowerCase() === topic.toLowerCase());
}
export async function getRelatedPosts(post: Post): Promise<Post[]> {
  if (!sanityConfigured) return (post.relatedPostSlugs ?? []).map(getPost).filter((related): related is Post => Boolean(related));
  return (await Promise.all((post.relatedPostSlugs ?? []).map(getPostBySlug))).filter((related): related is Post => Boolean(related));
}
export async function getRelatedPostsForResource(resource: Resource): Promise<Post[]> {
  if (!sanityConfigured) return (resource.relatedPostSlugs ?? []).map(getPost).filter((related): related is Post => Boolean(related));
  return (await Promise.all((resource.relatedPostSlugs ?? []).map(getPostBySlug))).filter((related): related is Post => Boolean(related));
}
export async function getRelatedResources(post: Post): Promise<Resource[]> {
  if (!sanityConfigured) return (post.relatedResourceSlugs ?? []).map(getResource).filter((related): related is Resource => Boolean(related));
  return (await Promise.all((post.relatedResourceSlugs ?? []).map(getResourceBySlug))).filter((related): related is Resource => Boolean(related));
}
export async function getNextPost(post: Post): Promise<Post | undefined> {
  return post.nextSlug ? getPostBySlug(post.nextSlug) : undefined;
}
export function getTopicSlug(topic: string) { return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
export function getTopicFromSlug(slug: string) { return topics.find((topic) => getTopicSlug(topic) === slug); }
