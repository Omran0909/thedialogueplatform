"use client";

import { useId, type ChangeEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  onLocaleChanged?: () => void;
};

type LanguageOption =
  | { type: "locale"; value: Locale; label: string }
  | { type: "auto"; value: "ru" | "uk" | "af"; label: string; target: "ru" | "uk" | "af" };

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

  const languageItems: LanguageOption[] = [
    { type: "locale", value: "en", label: "English" },
    { type: "locale", value: "no", label: "Norsk" },
    { type: "locale", value: "ar", label: "العربية" },
    { type: "auto", value: "ru", label: "Русский", target: "ru" },
    { type: "auto", value: "uk", label: "Українська", target: "uk" },
    { type: "auto", value: "af", label: "Afrikaans", target: "af" },
  ];

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    const selectedOption = languageItems.find((option) => option.value === selectedValue);
    if (!selectedOption) {
      return;
    }

    if (selectedOption.type === "locale") {
      router.push(localizedHref(selectedOption.value, barePath));
      onLocaleChanged?.();
      // iOS Safari can keep native selects open in overlays unless focus is cleared.
      requestAnimationFrame(() => {
        event.target.blur();
      });
      return;
    }

    const translatedUrl = `https://translate.google.com/translate?sl=auto&tl=${selectedOption.target}&u=${encodeURIComponent(window.location.href)}`;
    onLocaleChanged?.();
    window.location.assign(translatedUrl);
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
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
