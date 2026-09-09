import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://omoseebivincent.com";
  return ["", "/about", "/blog", "/resources", "/privacy"].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
}
