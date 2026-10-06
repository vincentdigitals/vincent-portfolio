export const SITE_ORIGIN = "https://omoseebivincent.site";

export function normalizeSiteUrl(url?: string) {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname === "www.omoseebivincent.site") parsed.hostname = "omoseebivincent.site";
    return parsed.toString();
  } catch {
    return url;
  }
}