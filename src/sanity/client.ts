import { createClient } from "next-sanity";

export const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityConfigured = Boolean(sanityProjectId);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId: sanityProjectId!,
      dataset: sanityDataset,
      apiVersion: "2026-09-01",
      useCdn: false,
    })
  : null;

export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}) {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch<T>(query, params, { cache: "no-store" });
  } catch {
    return null;
  }
}
