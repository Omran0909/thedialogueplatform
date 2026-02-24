"use client";

import { useId, type ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";
import type { LayoutText } from "@/lib/i18n/layout-text";

type LanguageSwitcherProps = {
  locale: Locale;
  text: LayoutText["language"];
  onLocaleChanged?: () => void;
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

export function LanguageSwitcher({ locale, text, onLocaleChanged }: LanguageSwitcherProps) {
  const selectId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const barePath = getPathWithoutLocale(pathname);

  const languageItems: Array<{ code: Locale; label: string }> = [
    { code: "en", label: text.en },
    { code: "no", label: text.no },
    { code: "ar", label: text.ar },
  ];

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    if (!locales.includes(nextLocale as Locale)) {
      return;
    }

    router.push(localizedHref(nextLocale as Locale, barePath));
    onLocaleChanged?.();
    // iOS Safari can keep native selects open in overlays unless focus is cleared.
    requestAnimationFrame(() => {
      event.target.blur();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">{text.label}</span>
      <label className="sr-only" htmlFor={selectId}>
        {text.choose}
      </label>
      <select
        id={selectId}
        value={locale}
        onChange={handleChange}
        className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-semibold text-text-secondary outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
      >
        {languageItems.map((item) => (
          <option key={item.code} value={item.code}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
