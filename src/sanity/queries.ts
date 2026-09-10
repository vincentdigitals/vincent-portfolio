export const postsQuery = `*[_type == "post" && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now())] | order(publishedAt desc) {
  "slug": slug.current,
  title,
  excerpt,
  body,
  "topic": topic->title,
  publishedAt,
  featured,
  seoTitle,
  seoDescription
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug && (!defined(publishedAt) || publishedAt <= now())][0] {
  "slug": slug.current,
  title,
  excerpt,
  body,
  "topic": topic->title,
  publishedAt,
  featured,
  seoTitle,
  seoDescription
}`;

export const resourcesQuery = `*[_type == "resource" && defined(slug.current)] | order(_createdAt desc) {
  "slug": slug.current,
  title,
  description,
  type,
  access,
  "topic": topic->title,
  file,
  externalLink,
  seoTitle,
  seoDescription
}`;

export const resourceBySlugQuery = `*[_type == "resource" && slug.current == $slug][0] {
  "slug": slug.current,
  title,
  description,
  type,
  access,
  "topic": topic->title,
  file,
  externalLink,
  seoTitle,
  seoDescription
}`;

export const topicTitlesQuery = `*[_type == "topic" && defined(slug.current)] | order(title asc) { title, "slug": slug.current, description }`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now())].slug.current`;
export const resourceSlugsQuery = `*[_type == "resource" && defined(slug.current)].slug.current`;
