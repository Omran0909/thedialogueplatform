import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/i18n/config";

export function formatPartners(locale: Locale) {
  if (locale === "ar") {
    return siteConfig.partners.join(" و ");
  }

  if (locale === "no") {
    return siteConfig.partners.join(" og ");
  }

  return siteConfig.partners.join(" and ");
}
