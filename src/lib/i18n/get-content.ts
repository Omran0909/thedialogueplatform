import { content } from "@/lib/i18n/content";
import { defaultLocale, type Locale } from "@/lib/i18n/config";

export function getContent(locale: Locale) {
  return content[locale] ?? content[defaultLocale];
}
