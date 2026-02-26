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
  briefingLabel: string;
  briefingEmpty: string;
  briefingCoverageLabel: string;
  briefingSourceMixLabel: string;
  briefingThemesLabel: string;
  notificationLabel: string;
  dragHint: string;
  visualLabel: string;
  openStoryLabel: string;
  openSourceLabel: string;
  reportCenterLabel: string;
  reportDescription: string;
  downloadReportLabel: string;
  archiveLabel: string;
  archiveEmptyLabel: string;
  unavailableMessage: string;
};

type SudanNewsFeedProps = {
  locale: Locale;
  copy: NewsFeedCopy;
};

const REFRESH_INTERVAL_MS = 15000;
const AUTO_SCROLL_PX_PER_SECOND = 10;
const WHEEL_SCROLL_MULTIPLIER = 2.4;
const LATEST_NEWS_FALLBACK_IMAGE = "/assets/media/library/seminars/silik/2026-01-24/silik-2026-01-24-0784.jpg";
const REPORT_ARCHIVE_STORAGE_KEY = "dialogue-platform-sudan-briefing-archive-v1";
const REPORT_ARCHIVE_MAX_ITEMS = 30;

type BriefingReportRecord = {
  id: string;
  generatedAt: string;
  locale: Locale;
  lines: string[];
  headlineTitles: string[];
};

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

function toNormalizedText(item: SudanNewsItem) {
  return `${item.title} ${item.summary}`.toLowerCase();
}

function buildThemeSummary(items: SudanNewsItem[]) {
  const counters = {
    diplomacy: 0,
    humanitarian: 0,
    policy: 0,
    research: 0,
    publicStatements: 0,
  };

  for (const item of items) {
    const text = toNormalizedText(item);

    if (/\b(diplom|foreign minister|envoy|mediation|talks|ceasefire|un|au|igad|eu)\b/i.test(text)) {
      counters.diplomacy += 1;
    }
    if (/\b(humanitarian|aid|relief|ocha|wfp|unhcr|unicef|who|displacement|refugee|famine|cholera)\b/i.test(text)) {
      counters.humanitarian += 1;
    }
    if (/\b(policy|sanction|security council|resolution|icc|law|governance)\b/i.test(text)) {
      counters.policy += 1;
    }
    if (/\b(research|study|report|analysis|journal|university)\b/i.test(text)) {
      counters.research += 1;
    }
    if (/\b(statement|announced|announces|minister|government|official|press)\b/i.test(text)) {
      counters.publicStatements += 1;
    }
  }

  const ranked = Object.entries(counters)
    .sort((a, b) => b[1] - a[1])
    .filter(([, count]) => count > 0)
    .slice(0, 3)
    .map(([label]) => {
      if (label === "publicStatements") {
        return "public statements";
      }
      return label;
    });

  if (ranked.length === 0) {
    return "mixed coverage";
  }

  return ranked.join(", ");
}

function toPdfSafeText(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[^\x20-\x7E]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapePdfText(input: string) {
  return input.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function buildSimplePdfBlob(title: string, lines: string[]) {
  const encoder = new TextEncoder();
  const pageWidth = 612;
  const pageHeight = 792;
  const left = 50;
  const top = 760;
  const titleFontSize = 14;
  const bodyFontSize = 10;
  const lineHeight = 14;

  const safeTitle = escapePdfText(toPdfSafeText(title) || "Sudan Briefing");
  const safeLines = lines
    .map((line) => escapePdfText(toPdfSafeText(line)))
    .filter(Boolean)
    .slice(0, 46);

  const contentParts: string[] = [];
  contentParts.push("BT");
  contentParts.push(`/F1 ${titleFontSize} Tf`);
  contentParts.push(`${left} ${top} Td`);
  contentParts.push(`(${safeTitle}) Tj`);
  contentParts.push(`0 -${lineHeight + 4} Td`);
  contentParts.push(`/F1 ${bodyFontSize} Tf`);

  for (const line of safeLines) {
    contentParts.push(`(${line}) Tj`);
    contentParts.push(`0 -${lineHeight} Td`);
  }
  contentParts.push("ET");

  const contentStream = `${contentParts.join("\n")}\n`;
  const contentLength = encoder.encode(contentStream).length;

  const objects: string[] = [
    "1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n",
    "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n",
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`,
    "4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n",
    `5 0 obj\n<< /Length ${contentLength} >>\nstream\n${contentStream}endstream\nendobj\n`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets: number[] = [0];

  for (const object of objects) {
    offsets.push(encoder.encode(pdf).length);
    pdf += object;
  }

  const xrefStart = encoder.encode(pdf).length;
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${offsets[i].toString().padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([encoder.encode(pdf)], { type: "application/pdf" });
}

export function SudanNewsFeed({ locale, copy }: SudanNewsFeedProps) {
  const [items, setItems] = useState<SudanNewsItem[]>([]);
  const [updatedAt, setUpdatedAt] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [reportArchive, setReportArchive] = useState<BriefingReportRecord[]>([]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const newsLaneRef = useRef<HTMLDivElement | null>(null);
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
        const response = await fetch(`/api/news/sudan?locale=${encodeURIComponent(locale)}&ts=${Date.now()}`, {
          cache: "no-store",
        });
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
    [copy.unavailableMessage, locale],
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
    const onFocus = () => {
      void loadNews(true);
    };

    const onVisibilityChange = () => {
      if (!document.hidden) {
        void loadNews(true);
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
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

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const handleViewportWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const loopHeight = loopHeightRef.current;
      if (loopHeight <= 0) {
        return;
      }

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

    viewport.addEventListener("wheel", handleViewportWheel, { passive: false, capture: true });
    return () => {
      viewport.removeEventListener("wheel", handleViewportWheel, true);
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

  const sortedItems = useMemo(
    () =>
      [...items].sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
      ),
    [items],
  );

  const { topFive, featuredVisualItem, visualStrip, todayBriefing, todayHeadlineTitles } = useMemo(() => {
    const byTime = sortedItems;
    const now = Date.now();
    const todaysItems = byTime.filter((item) => now - new Date(item.publishedAt).getTime() <= 24 * 60 * 60 * 1000);
    const sourceCounts = new Map<string, number>();
    for (const item of todaysItems) {
      sourceCounts.set(item.source, (sourceCounts.get(item.source) ?? 0) + 1);
    }

    const topSources = [...sourceCounts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([source]) => source)
      .join(", ");

    const themeText = buildThemeSummary(todaysItems);

    const briefingLines =
      todaysItems.length === 0
        ? [copy.briefingEmpty]
        : [
            `${copy.briefingCoverageLabel}: ${todaysItems.length} updates from ${sourceCounts.size} sources`,
            `${copy.briefingSourceMixLabel}: ${topSources || "multiple sources"}`,
            `${copy.briefingThemesLabel}: ${themeText}`,
          ];

    const topItems = byTime.slice(0, 6);
    const withImages = byTime.filter((item) => Boolean(item.imageUrl));
    const stripItems = withImages.slice(1, 5);

    const topItemsWithVisuals = topItems.map((item) => ({
      ...item,
      imageUrl: item.imageUrl || withImages[0]?.imageUrl || LATEST_NEWS_FALLBACK_IMAGE,
    }));

    return {
      topFive: topItemsWithVisuals,
      featuredVisualItem: withImages[0] || byTime[0] || null,
      visualStrip: stripItems,
      todayBriefing: briefingLines,
      todayHeadlineTitles: todaysItems.slice(0, 8).map((item) => item.title),
    };
  }, [copy.briefingCoverageLabel, copy.briefingEmpty, copy.briefingSourceMixLabel, copy.briefingThemesLabel, sortedItems]);

  const currentReport = useMemo<BriefingReportRecord | null>(() => {
    if (todayBriefing.length === 0) {
      return null;
    }

    const dayKey = new Date().toISOString().slice(0, 10);
    return {
      id: dayKey,
      generatedAt: new Date().toISOString(),
      locale,
      lines: todayBriefing,
      headlineTitles: todayHeadlineTitles,
    };
  }, [locale, todayBriefing, todayHeadlineTitles]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(REPORT_ARCHIVE_STORAGE_KEY);
      if (!raw) {
        setReportArchive([]);
        return;
      }
      const parsed = JSON.parse(raw) as BriefingReportRecord[];
      if (!Array.isArray(parsed)) {
        setReportArchive([]);
        return;
      }
      setReportArchive(parsed.slice(0, REPORT_ARCHIVE_MAX_ITEMS));
    } catch {
      setReportArchive([]);
    }
  }, []);

  useEffect(() => {
    if (!currentReport) {
      return;
    }

    setReportArchive((previous) => {
      const filtered = previous.filter((report) => report.id !== currentReport.id);
      const next = [currentReport, ...filtered].slice(0, REPORT_ARCHIVE_MAX_ITEMS);
      try {
        window.localStorage.setItem(REPORT_ARCHIVE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage quota or browser storage errors.
      }
      return next;
    });
  }, [currentReport]);

  const handleDownloadPdf = useCallback((report: BriefingReportRecord) => {
    const titleDate = formatAbsoluteDate(report.generatedAt, report.locale);
    const lines: string[] = [
      ...report.lines,
      "",
      "Top stories:",
      ...report.headlineTitles.map((headline, index) => `${index + 1}. ${headline}`),
      "",
      `Generated: ${titleDate}`,
    ];

    const blob = buildSimplePdfBlob(`Sudan Briefing - ${report.id}`, lines);
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `sudan-briefing-${report.id}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.URL.revokeObjectURL(url);
  }, []);

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

              <div className="mt-6 rounded-xl border border-white/18 bg-white/10 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/82">{copy.briefingLabel}</p>
                <div className="mt-3 space-y-2">
                  {todayBriefing.map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-white/90">
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/24 bg-[#082f4c]/38 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85">{copy.reportCenterLabel}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/86">{copy.reportDescription}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (currentReport) {
                        handleDownloadPdf(currentReport);
                      }
                    }}
                    disabled={!currentReport}
                    className="rounded-full border border-[#f2a33a]/75 bg-[#f2a33a]/95 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#082f4c] transition hover:bg-[#f3b14f] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {copy.downloadReportLabel}
                  </button>
                </div>

                <div className="mt-4 rounded-lg border border-white/16 bg-white/10 p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80">{copy.archiveLabel}</p>
                  {reportArchive.length === 0 ? (
                    <p className="mt-2 text-xs text-white/70">{copy.archiveEmptyLabel}</p>
                  ) : (
                    <div className="mt-2 max-h-44 space-y-2 overflow-y-auto pr-1">
                      {reportArchive.map((report) => (
                        <button
                          type="button"
                          key={report.id}
                          onClick={() => handleDownloadPdf(report)}
                          className="w-full rounded-md border border-white/16 bg-white/8 px-3 py-2 text-left text-xs text-white/88 transition hover:border-white/35 hover:bg-white/14"
                        >
                          <span className="block font-semibold">{report.id}</span>
                          <span className="mt-0.5 block text-[11px] text-white/72">
                            {formatAbsoluteDate(report.generatedAt, locale)}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {error ? (
                <p className="rounded-xl border border-[#e7c391]/80 bg-[#fff4df] px-4 py-3 text-sm text-[#6c5840]">{error}</p>
              ) : null}

              {featuredVisualItem ? (
                <article className="mb-4 overflow-hidden rounded-xl border border-line/80 bg-white/85 shadow-[0_12px_30px_-24px_rgba(8,47,76,0.7)]">
                  <a href={featuredVisualItem.url} target="_blank" rel="noreferrer" className="block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featuredVisualItem.imageUrl || LATEST_NEWS_FALLBACK_IMAGE}
                      alt={featuredVisualItem.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-44 w-full object-cover"
                    />
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

              {sortedItems.length > 0 ? (
                <div ref={newsLaneRef} className="news-notification-lane surface-card !rounded-xl p-3">
                  <div className="mb-2 flex items-center justify-between gap-2 px-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">{copy.notificationLabel}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">{copy.dragHint}</span>
                  </div>
                  <div
                    ref={viewportRef}
                    className={`news-notification-viewport ${isDragging ? "is-dragging" : ""}`}
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={stopDragging}
                    onPointerCancel={stopDragging}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="news-notification-track">
                      <div ref={baseTrackRef} className="news-notification-track-set">
                        {sortedItems.map((item) => (
                          <article
                            key={`${item.id}-base`}
                            className="news-stream-card rounded-lg border border-line/80 bg-white/90 p-3 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
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
                        {sortedItems.map((item) => (
                          <article
                            key={`${item.id}-clone`}
                            className="news-stream-card rounded-lg border border-line/80 bg-white/90 p-3 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
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
                      <article className="news-latest-card rounded-lg border border-line/80 bg-white/80 px-3 py-3">
                        <div className="flex gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.imageUrl || LATEST_NEWS_FALLBACK_IMAGE}
                            alt={item.title}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className="h-16 w-24 shrink-0 rounded-md object-cover"
                          />
                          <div className="min-w-0 flex-1">
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
                          </div>
                        </div>
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
