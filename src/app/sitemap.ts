import type { MetadataRoute } from "next";
import { mainRoutes, siteConfig } from "@/lib/site";
import { locales } from "@/lib/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const localizedEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    mainRoutes.map((route) => {
      const changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        route === "/" ? "weekly" : "monthly";

      return {
        url: `${siteConfig.url}/${locale}${route === "/" ? "" : route}`,
        lastModified,
        changeFrequency,
        priority: route === "/" ? 1 : 0.7,
      };
    }),
  );

  return localizedEntries;
}
