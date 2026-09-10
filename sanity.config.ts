import { defineConfig } from "sanity";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "vincent-portfolio",
  title: "Vincent Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  schema: { types: schemaTypes },
});
