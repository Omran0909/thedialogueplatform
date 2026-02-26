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
  | { type: "auto"; value: string; label: string; target: string; disabled?: boolean };

type LanguageGroup = {
  label: string;
  options: LanguageOption[];
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

  const languageGroups: LanguageGroup[] = [
    {
      label: "Site languages",
      options: [
        { type: "locale", value: "en", label: "English" },
        { type: "locale", value: "no", label: "Norsk" },
        { type: "locale", value: "ar", label: "العربية" },
      ],
    },
    {
      label: "Global (auto-translate)",
      options: [
        { type: "auto", value: "ru", label: "Русский", target: "ru" },
        { type: "auto", value: "uk", label: "Українська", target: "uk" },
        { type: "auto", value: "fr", label: "Français", target: "fr" },
        { type: "auto", value: "de", label: "Deutsch", target: "de" },
        { type: "auto", value: "es", label: "Español", target: "es" },
        { type: "auto", value: "pt", label: "Português", target: "pt" },
        { type: "auto", value: "it", label: "Italiano", target: "it" },
        { type: "auto", value: "tr", label: "Türkçe", target: "tr" },
        { type: "auto", value: "hi", label: "हिन्दी", target: "hi" },
        { type: "auto", value: "ur", label: "اردو", target: "ur" },
        { type: "auto", value: "fa", label: "فارسی", target: "fa" },
        { type: "auto", value: "zh-CN", label: "中文（简体）", target: "zh-CN" },
        { type: "auto", value: "ja", label: "日本語", target: "ja" },
      ],
    },
    {
      label: "Sudan & Horn of Africa (auto-translate)",
      options: [
        { type: "auto", value: "sw", label: "Kiswahili", target: "sw" },
        { type: "auto", value: "am", label: "አማርኛ", target: "am" },
        { type: "auto", value: "ti", label: "ትግርኛ", target: "ti" },
        { type: "auto", value: "so", label: "Soomaali", target: "so" },
        { type: "auto", value: "om", label: "Afaan Oromoo", target: "om" },
        { type: "auto", value: "ha", label: "Hausa", target: "ha" },
        { type: "auto", value: "ff", label: "Fulfulde", target: "ff" },
      ],
    },
    {
      label: "African languages (auto-translate)",
      options: [
        { type: "auto", value: "af", label: "Afrikaans", target: "af" },
        { type: "auto", value: "yo", label: "Yorùbá", target: "yo" },
        { type: "auto", value: "ig", label: "Igbo", target: "ig" },
        { type: "auto", value: "zu", label: "isiZulu", target: "zu" },
        { type: "auto", value: "xh", label: "isiXhosa", target: "xh" },
        { type: "auto", value: "rw", label: "Kinyarwanda", target: "rw" },
        { type: "auto", value: "rn", label: "Kirundi", target: "rn" },
        { type: "auto", value: "st", label: "Sesotho", target: "st" },
        { type: "auto", value: "tn", label: "Setswana", target: "tn" },
        { type: "auto", value: "nso", label: "Sepedi", target: "nso" },
        { type: "auto", value: "ny", label: "ChiChewa", target: "ny" },
        { type: "auto", value: "sn", label: "Shona", target: "sn" },
        { type: "auto", value: "mg", label: "Malagasy", target: "mg" },
        { type: "auto", value: "wo", label: "Wolof", target: "wo" },
        { type: "auto", value: "ln", label: "Lingala", target: "ln" },
        { type: "auto", value: "bm", label: "Bamanankan", target: "bm" },
        { type: "auto", value: "ak", label: "Twi", target: "ak" },
        { type: "auto", value: "ee", label: "Ewe", target: "ee" },
        { type: "auto", value: "lg", label: "Luganda", target: "lg" },
      ],
    },
  ];
  const languageItems = languageGroups.flatMap((group) => group.options);

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedValue = event.target.value;
    const selectedOption = languageItems.find((option) => option.value === selectedValue);
    if (!selectedOption) {
      return;
    }
    if (selectedOption.type === "auto" && selectedOption.disabled) {
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
    requestAnimationFrame(() => {
      event.target.blur();
    });
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
        {languageGroups.map((group) => (
          <optgroup key={group.label} label={group.label}>
            {group.options.map((item) => (
              <option key={item.value} value={item.value} disabled={item.type === "auto" && item.disabled}>
                {item.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
