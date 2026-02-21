const fallbackSiteUrl = "https://thedialogueplatform.com";

const normalizedUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.startsWith("http")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : process.env.NEXT_PUBLIC_SITE_URL
      ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
      : fallbackSiteUrl;

export const siteConfig = {
  name: "The Dialogue Platform",
  url: normalizedUrl,
  description:
    "A strategic dialogue practice for institutions designing better public decisions.",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  contactPhone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "",
};

export const mainRoutes = ["/", "/about", "/dialogues", "/events", "/insights", "/contact"] as const;
