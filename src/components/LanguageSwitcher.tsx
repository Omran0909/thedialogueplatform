"use client";

import { useId, type ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
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

export function LanguageSwitcher({ locale, onLocaleChanged }: LanguageSwitcherProps) {
  const selectId = useId();
  const router = useRouter();
  const pathname = usePathname();
  const barePath = getPathWithoutLocale(pathname);
  const languageLabel = "Language / اللغة";
  const languageChooseLabel = "Choose language / اختر اللغة";

  const languageItems: Array<{ code: Locale; label: string }> = [
    { code: "en", label: "English" },
    { code: "no", label: "Norsk" },
    { code: "ar", label: "العربية" },
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
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">{languageLabel}</span>
      <label className="sr-only" htmlFor={selectId}>
        {languageChooseLabel}
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
