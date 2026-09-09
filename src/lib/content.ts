export type ContentType = "Essay" | "Observation" | "Hypothesis" | "Experiment" | "Lesson" | "Research" | "Note";

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

export const posts: Post[] = [
  {
    slug: "the-problem-behind-the-problem",
    title: "The problem behind the problem",
    excerpt: "A replaceable placeholder for an observation about the constraint keeping an early-stage company from growing.",
    type: "Observation",
    topic: "Product",
    date: "08 Sep 2026",
    number: "014",
    featured: true,
    published: true,
    sections: [{ heading: "What I was trying to understand", paragraphs: ["Replace this section with the observation, evidence, and question behind the piece."], quote: "What would we expect to see if this explanation were true?" }],
    relatedResourceSlugs: ["constraint-mapping-sheet"],
    nextSlug: "before-you-build-another-feature"
  },
  {
    slug: "before-you-build-another-feature",
    title: "Before you build another feature",
    excerpt: "A replaceable placeholder for an essay about the questions worth asking before building becomes a substitute for learning.",
    type: "Essay",
    topic: "Customer discovery",
    date: "29 Aug 2026",
    number: "013",
    published: true,
    sections: [{ paragraphs: ["Replace this section with the essay body. Keep the writing here so the frontend remains presentation-only."] }],
    relatedPostSlugs: ["the-problem-behind-the-problem"],
    relatedResourceSlugs: ["customer-conversation-checklist"],
    nextSlug: "a-small-test-for-positioning"
  },
  {
    slug: "a-small-test-for-positioning",
    title: "A small test for positioning",
    excerpt: "A replaceable placeholder for documenting a positioning hypothesis, the test, and what changed afterward.",
    type: "Experiment",
    topic: "Positioning",
    date: "17 Aug 2026",
    number: "012",
    published: true,
    sections: [
      { heading: "Hypothesis", paragraphs: ["Replace this section with the belief being tested and the evidence that would support or refute it."] },
      { heading: "What I tested", paragraphs: ["Replace this section with the change made, what happened, and what was learned."] }
    ],
    relatedResourceSlugs: ["observation-to-learning"]
  }
];

export const resources: Resource[] = [
  { slug: "constraint-mapping-sheet", title: "Constraint mapping sheet", description: "A one-page worksheet for making the current growth constraint visible before deciding what to do next.", type: "Worksheet", access: "Free", topic: "Growth", audience: "Founders deciding what deserves attention next.", purpose: "To make the current constraint explicit before choosing a solution.", howToUse: "Write down the observed symptom, possible causes, and the evidence you still need.", relatedPostSlugs: ["the-problem-behind-the-problem"] },
  { slug: "customer-conversation-checklist", title: "Customer conversation checklist", description: "A practical pre-call and post-call checklist for learning more from early customer conversations.", type: "Checklist", access: "Free", topic: "Customer discovery", audience: "Founders preparing for or reviewing customer conversations.", purpose: "To keep conversations oriented around learning rather than validation theatre.", howToUse: "Use it before a conversation to choose a question, and afterward to capture what changed.", relatedPostSlugs: ["before-you-build-another-feature"] },
  { slug: "observation-to-learning", title: "Observation to learning", description: "A working framework for documenting what you saw, what you tried, and what changed your mind.", type: "Framework", access: "Gated", topic: "Research", audience: "Founders building a repeatable learning practice.", purpose: "To connect observations, hypotheses, experiments, and decisions in one place.", howToUse: "Move from a specific observation to a testable hypothesis, then record the result and next question.", relatedPostSlugs: ["a-small-test-for-positioning"] }
];

export const topics = Array.from(new Set(posts.map((post) => post.topic))).sort();
export function getPost(slug: string) { return posts.find((post) => post.slug === slug && post.published !== false); }
export function getResource(slug: string) { return resources.find((resource) => resource.slug === slug); }
export function getPostsByTopic(topic: string) { return posts.filter((post) => post.published !== false && post.topic.toLowerCase() === topic.toLowerCase()); }
export function getRelatedPosts(post: Post) { return (post.relatedPostSlugs ?? []).map(getPost).filter((related): related is Post => Boolean(related)); }
export function getRelatedResources(post: Post) { return (post.relatedResourceSlugs ?? []).map(getResource).filter((resource): resource is Resource => Boolean(resource)); }
export function getTopicSlug(topic: string) { return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""); }
export function getTopicFromSlug(slug: string) { return topics.find((topic) => getTopicSlug(topic) === slug); }
