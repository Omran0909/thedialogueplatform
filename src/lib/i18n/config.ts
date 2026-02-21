export const locales = ["en", "no", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDir(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function withLocale(locale: Locale, path: string): string {
  if (path === "/") {
    return `/${locale}`;
  }

  return `/${locale}${path}`;
}
