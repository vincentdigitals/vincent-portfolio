import { defineField, defineType } from "sanity";

type ValidationRule = { required: () => unknown };

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "topic", title: "Topic", type: "reference", to: [{ type: "topic" }] }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime" }),
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
    defineField({ name: "title", title: "Title", type: "string", validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "type", title: "Type", type: "string", options: { list: ["Guide", "Checklist", "Framework", "Worksheet"] }, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "access", title: "Access", type: "string", options: { list: ["Free", "Gated"] }, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "topic", title: "Topic", type: "reference", to: [{ type: "topic" }] }),
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
    defineField({ name: "title", title: "Title", type: "string", validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (rule: ValidationRule) => rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

export const schemaTypes = [post, resource, topic];
