export const SITE_ORIGIN = "https://www.omoseebivincent.site";

export function normalizeSiteUrl(url?: string) {
  if (!url) return url;

  try {
    const parsed = new URL(url);
    if (parsed.hostname === "omoseebivincent.site") parsed.hostname = "www.omoseebivincent.site";
    return parsed.toString();
  } catch {
    return url;
  }
}