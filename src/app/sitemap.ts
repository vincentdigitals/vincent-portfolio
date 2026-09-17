import type { MetadataRoute } from "next";
import { getCmsSlugs, getCmsTopicTitles, getTopicSlug } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_ORIGIN;
  const staticPaths = ["", "/about", "/blog", "/resources", "/privacy"];
  const [postSlugs, resourceSlugs, topics] = await Promise.all([getCmsSlugs("post"), getCmsSlugs("resource"), getCmsTopicTitles()]);
  const postPaths = postSlugs.map((slug) => `/blog/${slug}`);
  const topicPaths = topics.map((topic) => `/blog/topic/${getTopicSlug(topic)}`);
  const resourcePaths = resourceSlugs.map((slug) => `/resources/${slug}`);
  return [...staticPaths, ...postPaths, ...topicPaths, ...resourcePaths].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
