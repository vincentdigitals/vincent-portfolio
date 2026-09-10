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
