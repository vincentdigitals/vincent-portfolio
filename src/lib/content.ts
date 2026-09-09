export type ContentType = "Essay" | "Observation" | "Hypothesis" | "Experiment" | "Lesson" | "Research" | "Note";
export const contentTypes: ContentType[] = ["Observation", "Hypothesis", "Experiment", "Research", "Essay", "Lesson", "Note"];

export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
  quote?: string;
};

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
  sections: ArticleSection[];
  relatedPostSlugs?: string[];
  relatedResourceSlugs?: string[];
  nextSlug?: string;
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
};

export const posts: Post[] = [];

export const resources: Resource[] = [];

export const topics = Array.from(new Set(posts.map((post) => post.topic))).sort();
export function getPost(slug: string) { return posts.find((post) => post.slug === slug && post.published !== false); }
export function getResource(slug: string) { return resources.find((resource) => resource.slug === slug); }
export function getPostsByTopic(topic: string) { return posts.filter((post) => post.published !== false && post.topic.toLowerCase() === topic.toLowerCase()); }
export function getRelatedPosts(post: Post) { return (post.relatedPostSlugs ?? []).map(getPost).filter((related): related is Post => Boolean(related)); }
export function getRelatedResources(post: Post) { return (post.relatedResourceSlugs ?? []).map(getResource).filter((resource): resource is Resource => Boolean(resource)); }
export function getTopicSlug(topic: string) { return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
export function getTopicFromSlug(slug: string) { return topics.find((topic) => getTopicSlug(topic) === slug); }
