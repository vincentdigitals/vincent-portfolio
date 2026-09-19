import { defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", initialValue: "Omoseebi Vincent", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", initialValue: { current: "omoseebi-vincent" }, options: { source: "name", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "bio", title: "Bio", type: "text", rows: 4 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "url", title: "Profile URL", type: "url", initialValue: "https://www.omoseebivincent.site/about" }),
    defineField({
      name: "sameAs",
      title: "Social profiles",
      type: "array",
      initialValue: [
        "https://www.linkedin.com/in/omoseebi-vincent/",
        "https://www.instagram.com/vincentomoseebi/",
        "https://www.youtube.com/@omoseebivincent_creates",
      ],
      of: [{ type: "url" }],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule) => rule.required() }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "topic", title: "Topic", type: "reference", to: [{ type: "topic" }] }),
    defineField({ name: "relatedPosts", title: "Related posts", type: "array", of: [{ type: "reference", to: [{ type: "post" }] }] }),
    defineField({ name: "relatedResources", title: "Related resources", type: "array", of: [{ type: "reference", to: [{ type: "resource" }] }] }),
    defineField({ name: "nextPost", title: "Next post", type: "reference", to: [{ type: "post" }] }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (rule) => rule.required() }),
    defineField({ name: "featured", title: "Featured", type: "boolean", initialValue: false }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
});

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: (rule) => rule.required() }),
    defineField({ name: "type", title: "Type", type: "string", options: { list: ["Guide", "Checklist", "Framework", "Worksheet"] }, validation: (rule) => rule.required() }),
    defineField({ name: "access", title: "Access", type: "string", options: { list: ["Free", "Gated"] }, validation: (rule) => rule.required() }),
    defineField({ name: "topic", title: "Topic", type: "reference", to: [{ type: "topic" }] }),
    defineField({ name: "relatedPosts", title: "Related posts", type: "array", of: [{ type: "reference", to: [{ type: "post" }] }] }),
    defineField({ name: "file", title: "File", type: "file" }),
    defineField({ name: "externalLink", title: "External link", type: "url" }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 2 }),
  ],
});

export const topic = defineType({
  name: "topic",
  title: "Topic",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

export const schemaTypes = [author, post, resource, topic];
