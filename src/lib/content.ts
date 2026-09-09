export type ContentType = "Essay" | "Observation" | "Experiment" | "Lesson" | "Research" | "Note";

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  type: ContentType;
  topic: string;
  date: string;
  number: string;
  featured?: boolean;
};

export type Resource = {
  slug: string;
  title: string;
  description: string;
  type: "Guide" | "Checklist" | "Framework" | "Worksheet";
  access: "Free" | "Gated";
  topic: string;
};

export const posts: Post[] = [
  { slug: "the-problem-behind-the-problem", title: "The problem behind the problem", excerpt: "A first pass at separating the constraint a founder can see from the one actually keeping the company still.", type: "Observation", topic: "Product", date: "08 Sep 2026", number: "014", featured: true },
  { slug: "before-you-build-another-feature", title: "Before you build another feature", excerpt: "Questions worth asking when building has become a substitute for learning.", type: "Essay", topic: "Customer discovery", date: "29 Aug 2026", number: "013" },
  { slug: "a-small-test-for-positioning", title: "A small test for positioning", excerpt: "What changes when a positioning hypothesis is treated as something to test, not something to announce.", type: "Experiment", topic: "Positioning", date: "17 Aug 2026", number: "012" }
];

export const resources: Resource[] = [
  { slug: "constraint-mapping-sheet", title: "Constraint mapping sheet", description: "A one-page worksheet for making the current growth constraint visible before deciding what to do next.", type: "Worksheet", access: "Free", topic: "Growth" },
  { slug: "customer-conversation-checklist", title: "Customer conversation checklist", description: "A practical pre-call and post-call checklist for learning more from early customer conversations.", type: "Checklist", access: "Free", topic: "Customer discovery" },
  { slug: "observation-to-learning", title: "Observation → learning", description: "A working framework for documenting what you saw, what you tried, and what changed your mind.", type: "Framework", access: "Gated", topic: "Research" }
];

export function getPost(slug: string) { return posts.find((post) => post.slug === slug); }
export function getResource(slug: string) { return resources.find((resource) => resource.slug === slug); }
