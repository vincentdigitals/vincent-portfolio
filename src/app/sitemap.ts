import type { MetadataRoute } from "next";
import { getTopicSlug, posts, resources, topics } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://omoseebivincent.com";
  const staticPaths = ["", "/about", "/blog", "/resources", "/privacy"];
  const postPaths = posts.filter((post) => post.published !== false).map((post) => `/blog/${post.slug}`);
  const topicPaths = topics.map((topic) => `/blog/topic/${getTopicSlug(topic)}`);
  const resourcePaths = resources.map((resource) => `/resources/${resource.slug}`);
  return [...staticPaths, ...postPaths, ...topicPaths, ...resourcePaths].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
