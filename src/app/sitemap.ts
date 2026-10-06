import type { MetadataRoute } from "next";
import { getCmsSitemapEntries, getCmsTopicTitles, getTopicSlug } from "@/lib/content";
import { SITE_ORIGIN } from "@/lib/site";

export const revalidate = 60;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_ORIGIN;
  const staticPaths = ["", "/about", "/blog", "/resources", "/privacy"];
  const [postEntries, resourceEntries, topics] = await Promise.all([getCmsSitemapEntries("post"), getCmsSitemapEntries("resource"), getCmsTopicTitles()]);
  const postPaths = postEntries.map((entry) => ({ path: `/blog/${entry.slug}`, lastModified: entry.lastModified }));
  const topicPaths = topics.map((topic) => ({ path: `/blog/topic/${getTopicSlug(topic)}` }));
  const resourcePaths = resourceEntries.map((entry) => ({ path: `/resources/${entry.slug}`, lastModified: entry.lastModified }));
  return [
    ...staticPaths.map((path) => ({ path, lastModified: undefined as string | undefined })),
    ...postPaths,
    ...topicPaths,
    ...resourcePaths,
  ].map(({ path, lastModified }) => ({
    url: `${base}${path}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  }));
}
