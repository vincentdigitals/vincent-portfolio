export type ContentType = "Essay" | "Observation" | "Hypothesis" | "Experiment" | "Lesson" | "Research" | "Note";
export const contentTypes: ContentType[] = ["Observation", "Hypothesis", "Experiment", "Research", "Essay", "Lesson", "Note"];

export type ArticleSection = { heading?: string; paragraphs: string[]; quote?: string; };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  type: ContentType;
  topic: string;
  date: string;
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
import { postBySlugQuery, postsQuery, resourceBySlugQuery, resourcesQuery, resourceSlugsQuery, postSlugsQuery, topicTitlesQuery } from "@/sanity/queries";

type SanityPost = {
  slug: string;
  title: string;
  excerpt: string;
  body?: unknown[];
  topic?: string;
  publishedAt?: string;
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
  file?: { asset?: { url?: string } };
  externalLink?: string;
  seoTitle?: string;
  seoDescription?: string;
};

function formatDate(date?: string) {
  return date ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date)) : "";
}

function mapSanityPost(post: SanityPost): Post & { bodyBlocks?: unknown[]; seoTitle?: string; seoDescription?: string } {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    type: "Essay",
    topic: post.topic ?? "Uncategorised",
    date: formatDate(post.publishedAt),
    featured: post.featured,
    published: true,
    body: [],
    sections: [],
    bodyBlocks: post.body,
    seoTitle: post.seoTitle,
    seoDescription: post.seoDescription,
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
  return result ? mapSanityPost(result) : undefined;
}

export async function getAllResources(): Promise<Resource[]> {
  if (!sanityConfigured) return resources;
  const result = await sanityFetch<SanityResource[]>(resourcesQuery);
  return result?.map(mapSanityResource) ?? resources;
}

export async function getResourceBySlug(slug: string): Promise<Resource | undefined> {
  if (!sanityConfigured) return getResource(slug);
  const result = await sanityFetch<SanityResource | null>(resourceBySlugQuery, { slug });
  return result ? mapSanityResource(result) : undefined;
}

export async function getCmsSlugs(kind: "post" | "resource"): Promise<string[]> {
  if (!sanityConfigured) return kind === "post" ? posts.map((post) => post.slug) : resources.map((resource) => resource.slug);
  return (await sanityFetch<string[]>(kind === "post" ? postSlugsQuery : resourceSlugsQuery)) ?? [];
}

export async function getCmsTopicTitles(): Promise<string[]> {
  if (!sanityConfigured) return topics;
  const result = await sanityFetch<{ title: string }[]>(topicTitlesQuery);
  return result?.map((item: { title: string }) => item.title) ?? topics;
}

const rawPosts = [
  { slug: "the-problem-behind-the-problem", title: "The problem behind the problem", excerpt: "A first pass at separating the constraint a founder can see from the one actually keeping the company still.", type: "Observation" as const, topic: "Product", date: "08 Sep 2026", number: "014", featured: true, body: ["When a founder says the business is not growing, the visible problem is often only the outcome. The useful work starts by asking what is causing it.", "A lack of customers can come from weak demand, poor positioning, unclear messaging, ineffective distribution, a broken sales process, weak retention, or a product that does not solve an important problem well enough.", "The constraint you can see is not always the constraint you need to fix. Before choosing another tactic, understand what is actually happening.", "That means looking for evidence, testing assumptions, and finding the part of the system that is limiting progress right now."] },
  { slug: "before-you-build-another-feature", title: "Before you build another feature", excerpt: "Questions worth asking when building has become a substitute for learning.", type: "Essay" as const, topic: "Customer discovery", date: "29 Aug 2026", number: "013", body: ["Building another feature can feel like progress because the output is visible. But shipping more software does not automatically create more customer value.", "Before adding a feature, ask what evidence says the problem exists, who experiences it, how they solve it today, and what they have already tried.", "Understand the problem before deciding what to do about it.", "The goal is not to avoid building. It is to make sure building is the right next step."] },
  { slug: "a-small-test-for-positioning", title: "A small test for positioning", excerpt: "What changes when a positioning hypothesis is treated as something to test, not something to announce.", type: "Experiment" as const, topic: "Positioning", date: "17 Aug 2026", number: "012", body: ["Positioning is easy to treat as a statement you write once and put on a website. In practice, it is a hypothesis about who you serve, what problem matters to them, and why your solution is relevant.", "A small test can expose whether the message makes sense before you invest heavily in campaigns, design, or a product rewrite.", "Understand the problem before deciding what to do about it.", "Look for evidence in how the intended customer responds, what they understand immediately, and what questions they ask next."] }
];

export const posts: Post[] = rawPosts.map((post) => ({ ...post, sections: [{ paragraphs: post.body }] }));
export const resources: Resource[] = [];
export const topics = Array.from(new Set(posts.map((post) => post.topic))).sort();
export function getPost(slug: string) { return posts.find((post) => post.slug === slug && post.published !== false); }
export function getResource(slug: string) { return resources.find((resource) => resource.slug === slug); }
export function getPostsByTopic(topic: string) { return posts.filter((post) => post.published !== false && post.topic.toLowerCase() === topic.toLowerCase()); }
export function getRelatedPosts(post: Post) { return (post.relatedPostSlugs ?? []).map(getPost).filter((related): related is Post => Boolean(related)); }
export function getRelatedResources(post: Post) { return (post.relatedResourceSlugs ?? []).map(getResource).filter((resource): resource is Resource => Boolean(resource)); }
export function getTopicSlug(topic: string) { return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
export function getTopicFromSlug(slug: string) { return topics.find((topic) => getTopicSlug(topic) === slug); }
