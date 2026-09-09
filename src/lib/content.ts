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
  body: string[];
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
  {
    slug: "the-problem-behind-the-problem",
    title: "The problem behind the problem",
    excerpt: "A first pass at separating the constraint a founder can see from the one actually keeping the company still.",
    type: "Observation",
    topic: "Product",
    date: "08 Sep 2026",
    number: "014",
    featured: true,
    body: [
      "When a founder says the business is not growing, the visible problem is often only the outcome. The useful work starts by asking what is causing it.",
      "A lack of customers can come from weak demand, poor positioning, unclear messaging, ineffective distribution, a broken sales process, weak retention, or a product that does not solve an important problem well enough.",
      "The constraint you can see is not always the constraint you need to fix. Before choosing another tactic, understand what is actually happening.",
      "That means looking for evidence, testing assumptions, and finding the part of the system that is limiting progress right now."
    ]
  },
  {
    slug: "before-you-build-another-feature",
    title: "Before you build another feature",
    excerpt: "Questions worth asking when building has become a substitute for learning.",
    type: "Essay",
    topic: "Customer discovery",
    date: "29 Aug 2026",
    number: "013",
    body: [
      "Building another feature can feel like progress because the output is visible. But shipping more software does not automatically create more customer value.",
      "Before adding a feature, ask what evidence says the problem exists, who experiences it, how they solve it today, and what they have already tried.",
      "Understand the problem before deciding what to do about it.",
      "The goal is not to avoid building. It is to make sure building is the right next step."
    ]
  },
  {
    slug: "a-small-test-for-positioning",
    title: "A small test for positioning",
    excerpt: "What changes when a positioning hypothesis is treated as something to test, not something to announce.",
    type: "Experiment",
    topic: "Positioning",
    date: "17 Aug 2026",
    number: "012",
    body: [
      "Positioning is easy to treat as a statement you write once and put on a website. In practice, it is a hypothesis about who you serve, what problem matters to them, and why your solution is relevant.",
      "A small test can expose whether the message makes sense before you invest heavily in campaigns, design, or a product rewrite.",
      "Understand the problem before deciding what to do about it.",
      "Look for evidence in how the intended customer responds, what they understand immediately, and what questions they ask next."
    ]
  }
];

export const resources: Resource[] = [
  { slug: "constraint-mapping-sheet", title: "Constraint mapping sheet", description: "A one-page worksheet for making the current growth constraint visible before deciding what to do next.", type: "Worksheet", access: "Free", topic: "Growth" },
  { slug: "customer-conversation-checklist", title: "Customer conversation checklist", description: "A practical pre-call and post-call checklist for learning more from early customer conversations.", type: "Checklist", access: "Free", topic: "Customer discovery" },
  { slug: "observation-to-learning", title: "Observation → learning", description: "A working framework for documenting what you saw, what you tried, and what changed your mind.", type: "Framework", access: "Gated", topic: "Research" }
];

export function getPost(slug: string) { return posts.find((post) => post.slug === slug); }
export function getResource(slug: string) { return resources.find((resource) => resource.slug === slug); }
