import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";

export default defineConfig({
  name: "vincent-portfolio",
  title: "Vincent Portfolio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "si3lnlfc",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
