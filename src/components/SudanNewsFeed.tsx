"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import type { Locale } from "@/lib/i18n/config";

type SudanNewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  summary: string;
};

type SudanNewsApiResponse = {
  ok: boolean;
  updatedAt?: string;
  items?: SudanNewsItem[];
  message?: string;
};

export type NewsFeedCopy = {
  statusLabel: string;
  statusDescription: string;
  refreshLabel: string;
  lastUpdatedLabel: string;
  loadingLabel: string;
  latestLabel: string;
  notificationLabel: string;
  secondaryNotificationLabel: string;
  openStoryLabel: string;
  openSourceLabel: string;
  unavailableMessage: string;
};

type SudanNewsFeedProps = {
  locale: Locale;
  copy: NewsFeedCopy;
};

const REFRESH_INTERVAL_MS = 180000;

function formatAbsoluteDate(value: string, locale: Locale) {
  const localeCode = locale === "ar" ? "ar-SA" : locale === "no" ? "nb-NO" : "en-US";
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(localeCode, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(parsed);
}

function formatRelativeDate(value: string, locale: Locale) {
  const localeCode = locale === "ar" ? "ar-SA" : locale === "no" ? "nb-NO" : "en-US";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const now = Date.now();
  const diffSeconds = Math.round((parsed.getTime() - now) / 1000);
  const absSeconds = Math.abs(diffSeconds);
  const formatter = new Intl.RelativeTimeFormat(localeCode, { numeric: "auto" });

  if (absSeconds < 3600) {
    return formatter.format(Math.round(diffSeconds / 60), "minute");
  }
  if (absSeconds < 86400) {
    return formatter.format(Math.round(diffSeconds / 3600), "hour");
  }

  return formatter.format(Math.round(diffSeconds / 86400), "day");
}

export function SudanNewsFeed({ locale, copy }: SudanNewsFeedProps) {
  const [items, setItems] = useState<SudanNewsItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadNews = useCallback(
    async (isBackgroundRefresh = false) => {
      if (isBackgroundRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const response = await fetch("/api/news/sudan", { cache: "no-store" });
        const payload = (await response.json()) as SudanNewsApiResponse;

        if (!response.ok || !payload.ok || !Array.isArray(payload.items)) {
          throw new Error(payload.message || copy.unavailableMessage);
        }

        setItems(payload.items);
        setUpdatedAt(payload.updatedAt || new Date().toISOString());
        setError("");
      } catch {
        setError(copy.unavailableMessage);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [copy.unavailableMessage],
  );

  useEffect(() => {
    void loadNews(false);

    const interval = window.setInterval(() => {
      void loadNews(true);
    }, REFRESH_INTERVAL_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [loadNews]);

  const { primaryLane, secondaryLane, topFive } = useMemo(() => {
    const base = items.length > 0 ? items : [];
    const first = base.filter((_, index) => index % 2 === 0);
    const second = base.filter((_, index) => index % 2 === 1);

    const normalizedPrimary = first.length > 0 ? first : base.slice(0, Math.max(1, base.length));
    const normalizedSecondary = second.length > 0 ? second : base.slice(0, Math.max(1, base.length));

    return {
      primaryLane: [...normalizedPrimary, ...normalizedPrimary],
      secondaryLane: [...normalizedSecondary, ...normalizedSecondary],
      topFive: base.slice(0, 5),
    };
  }, [items]);

  const primaryDuration = `${Math.max(28, Math.min(78, primaryLane.length * 4.6))}s`;
  const secondaryDuration = `${Math.max(30, Math.min(82, secondaryLane.length * 4.8))}s`;

  return (
    <section className="section-padding border-t border-line/80">
      <Reveal>
        <div className="surface-card overflow-hidden p-0">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-line/70 bg-[linear-gradient(165deg,#0b3657_0%,#195372_68%,#f2a33a_140%)] p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">{copy.statusLabel}</p>
              <p className="mt-4 text-base leading-relaxed text-white/90">{copy.statusDescription}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void loadNews(true)}
                  className="rounded-full border border-white/35 bg-white/12 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  {copy.refreshLabel}
                </button>
                <span className="rounded-full border border-[#f2a33a]/45 bg-[#f2a33a]/20 px-3 py-1 text-xs font-semibold tracking-[0.1em] text-[#fff2df]">
                  {isLoading || isRefreshing ? copy.loadingLabel : `${copy.lastUpdatedLabel}: ${formatAbsoluteDate(updatedAt, locale)}`}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {error ? (
                <p className="rounded-xl border border-[#e7c391]/80 bg-[#fff4df] px-4 py-3 text-sm text-[#6c5840]">{error}</p>
              ) : null}

              {items.length > 0 ? (
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className="news-notification-lane surface-card !rounded-xl p-3">
                    <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">{copy.notificationLabel}</p>
                    <div className="news-notification-viewport">
                      <div className="news-notification-track" style={{ animationDuration: primaryDuration }}>
                        {primaryLane.map((item, index) => (
                          <article
                            key={`${item.id}-up-${index}`}
                            className="rounded-lg border border-line/80 bg-white/90 p-3 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">{formatRelativeDate(item.publishedAt, locale)}</p>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 block text-sm font-semibold leading-snug text-text-primary transition-colors hover:text-accent"
                            >
                              {item.title}
                            </a>
                            <p className="mt-2 text-xs leading-relaxed text-text-secondary">{item.summary}</p>
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex text-xs font-semibold text-[#0b3a5d] underline-offset-4 hover:underline"
                            >
                              {copy.openSourceLabel}: {item.source}
                            </a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="news-notification-lane news-notification-lane-down surface-card !rounded-xl p-3">
                    <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
                      {copy.secondaryNotificationLabel}
                    </p>
                    <div className="news-notification-viewport">
                      <div className="news-notification-track" style={{ animationDuration: secondaryDuration }}>
                        {secondaryLane.map((item, index) => (
                          <article
                            key={`${item.id}-down-${index}`}
                            className="rounded-lg border border-line/80 bg-white/90 p-3 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">{formatRelativeDate(item.publishedAt, locale)}</p>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 block text-sm font-semibold leading-snug text-text-primary transition-colors hover:text-accent"
                            >
                              {item.title}
                            </a>
                            <p className="mt-2 text-xs leading-relaxed text-text-secondary">{item.summary}</p>
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-2 inline-flex text-xs font-semibold text-[#0b3a5d] underline-offset-4 hover:underline"
                            >
                              {copy.openSourceLabel}: {item.source}
                            </a>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="rounded-xl border border-line/80 bg-white/70 px-4 py-3 text-sm text-text-secondary">{copy.loadingLabel}</p>
              )}

              {topFive.length > 0 ? (
                <div className="mt-6 space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{copy.latestLabel}</p>
                  {topFive.map((item) => (
                    <HoverCard key={`${item.id}-latest`} className="!transform-none">
                      <article className="rounded-lg border border-line/80 bg-white/80 px-3 py-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-semibold text-text-primary transition-colors hover:text-accent"
                          >
                            {item.title}
                          </a>
                          <span className="text-xs text-text-secondary">{formatAbsoluteDate(item.publishedAt, locale)}</span>
                        </div>
                        <a
                          href={item.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex text-xs font-semibold text-[#0b3a5d] underline-offset-4 hover:underline"
                        >
                          {copy.openStoryLabel}: {item.source}
                        </a>
                      </article>
                    </HoverCard>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
