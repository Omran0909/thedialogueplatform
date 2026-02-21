"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { locales, type Locale } from "@/lib/i18n/config";
import type { LayoutText } from "@/lib/i18n/layout-text";

type LanguageSwitcherProps = {
  locale: Locale;
  text: LayoutText["language"];
};

function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) {
    return "/";
  }

  if (locales.includes(segments[0] as Locale)) {
    const rest = segments.slice(1);
    return rest.length === 0 ? "/" : `/${rest.join("/")}`;
  }

  return pathname;
}

function localizedHref(targetLocale: Locale, barePath: string) {
  return barePath === "/" ? `/${targetLocale}` : `/${targetLocale}${barePath}`;
}

export function LanguageSwitcher({ locale, text }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const barePath = getPathWithoutLocale(pathname);
  const currentUrl = `${siteConfig.url}${pathname}`;
  const autoTranslateHref = `https://translate.google.com/translate?sl=auto&u=${encodeURIComponent(currentUrl)}`;

  const languageItems: Array<{ code: Locale; label: string }> = [
    { code: "en", label: text.en },
    { code: "no", label: text.no },
    { code: "ar", label: text.ar },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">{text.label}</span>
      <div className="flex items-center gap-2">
        {languageItems.map((item) => (
          <Link
            key={item.code}
            href={localizedHref(item.code, barePath)}
            className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
              item.code === locale
                ? "bg-accent text-white"
                : "border border-line bg-surface text-text-secondary hover:bg-accent-soft"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <a
          href={autoTranslateHref}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-accent/60 px-3 py-1 text-xs font-semibold text-accent transition hover:bg-accent hover:text-white"
        >
          {text.auto}
        </a>
      </div>
    </div>
  );
}
