"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
  imageUrl: string;
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
  dragHint: string;
  visualLabel: string;
  openStoryLabel: string;
  openSourceLabel: string;
  unavailableMessage: string;
};

type SudanNewsFeedProps = {
  locale: Locale;
  copy: NewsFeedCopy;
};

const REFRESH_INTERVAL_MS = 15000;
const AUTO_SCROLL_PX_PER_SECOND = 10;
const WHEEL_SCROLL_MULTIPLIER = 2.4;

function normalizeLoopedScroll(scrollTop: number, loopHeight: number) {
  if (loopHeight <= 0) {
    return scrollTop;
  }

  let normalized = scrollTop % loopHeight;
  if (normalized < 0) {
    normalized += loopHeight;
  }

  return normalized;
}

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

  if (absSeconds < 60) {
    return formatter.format(0, "second");
  }
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
  const [isDragging, setIsDragging] = useState(false);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const baseTrackRef = useRef<HTMLDivElement | null>(null);
  const loopHeightRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef(0);
  const hoverRef = useRef(false);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const dragPointerIdRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);

  const updatePausedState = useCallback(() => {
    pausedRef.current = hoverRef.current || draggingRef.current;
  }, []);

  const measureLoop = useCallback(() => {
    const viewport = viewportRef.current;
    const baseTrack = baseTrackRef.current;
    if (!viewport || !baseTrack) {
      loopHeightRef.current = 0;
      return;
    }

    const nextLoopHeight = baseTrack.scrollHeight;
    loopHeightRef.current = nextLoopHeight;
    if (nextLoopHeight > 0) {
      viewport.scrollTop = normalizeLoopedScroll(viewport.scrollTop, nextLoopHeight);
    }
  }, []);

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

  useEffect(() => {
    measureLoop();
    const onResize = () => {
      measureLoop();
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [items, measureLoop]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      reduceMotionRef.current = mediaQuery.matches;
    };

    sync();
    mediaQuery.addEventListener("change", sync);
    return () => {
      mediaQuery.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    const tick = (timestamp: number) => {
      const viewport = viewportRef.current;
      if (!viewport) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      if (!lastTimestampRef.current) {
        lastTimestampRef.current = timestamp;
      }

      const deltaMs = timestamp - lastTimestampRef.current;
      lastTimestampRef.current = timestamp;

      if (!pausedRef.current && !reduceMotionRef.current && loopHeightRef.current > 0) {
        const nextScroll =
          viewport.scrollTop + (deltaMs / 1000) * AUTO_SCROLL_PX_PER_SECOND;
        viewport.scrollTop = normalizeLoopedScroll(nextScroll, loopHeightRef.current);
      }

      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = null;
      lastTimestampRef.current = 0;
    };
  }, [items.length]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const target = event.target as HTMLElement;
    if (target.closest("a")) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport || loopHeightRef.current <= 0) {
      return;
    }

    draggingRef.current = true;
    setIsDragging(true);
    dragStartYRef.current = event.clientY;
    dragStartScrollRef.current = viewport.scrollTop;
    dragPointerIdRef.current = event.pointerId;
    viewport.setPointerCapture(event.pointerId);
    updatePausedState();
    event.preventDefault();
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || dragPointerIdRef.current !== event.pointerId) {
      return;
    }

    const viewport = viewportRef.current;
    if (!viewport || loopHeightRef.current <= 0) {
      return;
    }

    const delta = event.clientY - dragStartYRef.current;
    const nextScroll = normalizeLoopedScroll(dragStartScrollRef.current - delta, loopHeightRef.current);
    viewport.scrollTop = nextScroll;
    event.preventDefault();
  };

  const stopDragging = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || dragPointerIdRef.current !== event.pointerId) {
      return;
    }

    const viewport = viewportRef.current;
    if (viewport && viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    draggingRef.current = false;
    dragPointerIdRef.current = null;
    setIsDragging(false);
    updatePausedState();
  };

  const handleMouseEnter = () => {
    hoverRef.current = true;
    updatePausedState();
  };

  const handleMouseLeave = () => {
    hoverRef.current = false;
    updatePausedState();
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const loopHeight = loopHeightRef.current;
    if (!viewport || loopHeight <= 0) {
      return;
    }

    // Keep mouse-wheel interaction inside the news lane and avoid page scroll.
    event.preventDefault();
    event.stopPropagation();

    const baseDelta =
      event.deltaMode === 1
        ? event.deltaY * 16
        : event.deltaMode === 2
          ? event.deltaY * viewport.clientHeight
          : event.deltaY;

    const nextScroll = normalizeLoopedScroll(
      viewport.scrollTop + baseDelta * WHEEL_SCROLL_MULTIPLIER,
      loopHeight,
    );
    viewport.scrollTop = nextScroll;
  };

  const { topFive, featuredVisualItem, visualStrip } = useMemo(() => {
    const byTime = [...items].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
    const topItems = byTime.slice(0, 5);
    const withImages = byTime.filter((item) => Boolean(item.imageUrl));

    return {
      topFive: topItems,
      featuredVisualItem: withImages[0] || items[0] || null,
      visualStrip: withImages.slice(1, 5),
    };
  }, [items]);

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
                <span
                  className="rounded-full border border-[#f2a33a]/45 bg-[#f2a33a]/20 px-3 py-1 text-xs font-semibold tracking-[0.1em] text-[#fff2df]"
                  title={updatedAt ? formatAbsoluteDate(updatedAt, locale) : ""}
                >
                  {isLoading || isRefreshing
                    ? copy.loadingLabel
                    : `${copy.lastUpdatedLabel}: ${formatRelativeDate(updatedAt, locale)}`}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {error ? (
                <p className="rounded-xl border border-[#e7c391]/80 bg-[#fff4df] px-4 py-3 text-sm text-[#6c5840]">{error}</p>
              ) : null}

              {featuredVisualItem ? (
                <article className="mb-4 overflow-hidden rounded-xl border border-line/80 bg-white/85 shadow-[0_12px_30px_-24px_rgba(8,47,76,0.7)]">
                  <a href={featuredVisualItem.url} target="_blank" rel="noreferrer" className="block">
                    {featuredVisualItem.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={featuredVisualItem.imageUrl}
                        alt={featuredVisualItem.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-44 w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-44 items-center justify-center bg-[linear-gradient(155deg,#0b3657_0%,#1a5371_72%,#f2a33a_140%)] px-5 text-center text-sm font-semibold text-white">
                        {featuredVisualItem.source}
                      </div>
                    )}
                    <div className="p-3">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-accent">{copy.visualLabel}</p>
                      <p className="mt-1 text-sm font-semibold leading-snug text-text-primary">{featuredVisualItem.title}</p>
                    </div>
                  </a>
                </article>
              ) : null}

              {visualStrip.length > 0 ? (
                <div className="mb-5 grid grid-cols-4 gap-2">
                  {visualStrip.map((item) => (
                    <a
                      key={`${item.id}-thumb`}
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="overflow-hidden rounded-lg border border-line/80 bg-white/80"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="h-20 w-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </a>
                  ))}
                </div>
              ) : null}

              {items.length > 0 ? (
                <div className="news-notification-lane surface-card !rounded-xl p-3">
                  <div className="mb-2 flex items-center justify-between gap-2 px-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">{copy.notificationLabel}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">{copy.dragHint}</span>
                  </div>
                  <div
                    ref={viewportRef}
                    className={`news-notification-viewport ${isDragging ? "is-dragging" : ""}`}
                    onWheel={handleWheel}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={stopDragging}
                    onPointerCancel={stopDragging}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="news-notification-track">
                      <div ref={baseTrackRef} className="news-notification-track-set">
                        {items.map((item) => (
                          <article
                            key={`${item.id}-base`}
                            className="rounded-lg border border-line/80 bg-white/90 p-3 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                              {formatRelativeDate(item.publishedAt, locale)}
                            </p>
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

                      <div aria-hidden className="news-notification-track-set">
                        {items.map((item) => (
                          <article
                            key={`${item.id}-clone`}
                            className="rounded-lg border border-line/80 bg-white/90 p-3 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
                          >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                              {formatRelativeDate(item.publishedAt, locale)}
                            </p>
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
