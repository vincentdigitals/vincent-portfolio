import type { Author } from "@/lib/content";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function buildPersonEntity(name: string, url: string, sameAs?: string[]) {
  return {
    "@type": "Person",
    name,
    url,
    ...(sameAs && sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function buildProfilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: "https://omoseebivincent.site/about",
    mainEntity: buildPersonEntity("Omoseebi Vincent", "https://omoseebivincent.site/about", [
      "https://www.linkedin.com/in/omoseebi-vincent/",
      "https://www.instagram.com/vincentomoseebi/",
      "https://www.youtube.com/@omoseebivincent_creates",
    ]),
  };
}

export function buildBlogPostingJsonLd(post: {
  title: string;
  excerpt?: string;
  slug: string;
  publishedAt?: string;
  author?: Author;
}) {
  const author = post.author ?? { name: "Omoseebi Vincent", url: "https://omoseebivincent.site/about" };
  const authorUrl = author.url || "https://omoseebivincent.site/about";
  const canonicalUrl = `https://omoseebivincent.site/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    datePublished: post.publishedAt || undefined,
    dateModified: post.publishedAt || undefined,
    author: buildPersonEntity(author.name, authorUrl, author.sameAs),
    publisher: buildPersonEntity(author.name, authorUrl),
  };
}

export function buildBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
