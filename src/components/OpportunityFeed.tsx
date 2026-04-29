"use client";

import { useEffect, useMemo, useState } from "react";
import { HoverCard, Reveal } from "@/components/AnimatedBlock";
import type { Locale } from "@/lib/i18n/config";
import type { OpportunityItem, OpportunityKind, OpportunityStatus, OpportunityTimestampKind } from "@/lib/opportunities";

export type OpportunityFeedCopy = {
  statusLabel: string;
  statusDescription: string;
  snapshotLabel: string;
  openLabel: string;
  rollingLabel: string;
  seasonalLabel: string;
  closedLabel: string;
  kindCallLabel: string;
  kindPortalLabel: string;
  kindProgrammeLabel: string;
  audienceLabel: string;
  geographyLabel: string;
  deadlineLabel: string;
  sourceLabel: string;
  verificationLabel: string;
  openSourceLabel: string;
  latestLabel: string;
  streamLabel: string;
  relativePublishedLabel: string;
  relativeVerifiedLabel: string;
  relativeUpdatedLabel: string;
  noDeadlineLabel: string;
};

type OpportunityFeedProps = {
  locale: Locale;
  items: OpportunityItem[];
  snapshotAt: string;
  copy: OpportunityFeedCopy;
  livePath?: string;
};

type LiveOpportunityPayload = {
  ok?: boolean;
  snapshotAt?: string;
  items?: OpportunityItem[];
  message?: string;
};

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

function formatAbsoluteDate(value: string, locale: Locale, dateOnly = false) {
  const localeCode = locale === "ar" ? "ar-SA" : locale === "no" ? "nb-NO" : "en-US";
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat(localeCode, {
    dateStyle: "medium",
    ...(dateOnly ? {} : { timeStyle: "short" }),
  }).format(parsed);
}

function formatRelativeDate(value: string, locale: Locale, nowMs: number) {
  const localeCode = locale === "ar" ? "ar-SA" : locale === "no" ? "nb-NO" : "en-US";
  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const diffSeconds = Math.round((parsed.getTime() - nowMs) / 1000);
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

function statusClasses(status: OpportunityStatus) {
  if (status === "open") {
    return "border-emerald-500/35 bg-emerald-500/12 text-emerald-900";
  }
  if (status === "rolling") {
    return "border-sky-500/30 bg-sky-500/10 text-sky-950";
  }
  if (status === "seasonal") {
    return "border-amber-500/35 bg-amber-500/14 text-amber-950";
  }
  return "border-slate-400/35 bg-slate-500/10 text-slate-700";
}

function kindLabel(kind: OpportunityKind, copy: OpportunityFeedCopy) {
  if (kind === "call") {
    return copy.kindCallLabel;
  }
  if (kind === "portal") {
    return copy.kindPortalLabel;
  }
  return copy.kindProgrammeLabel;
}

function statusLabel(status: OpportunityStatus, copy: OpportunityFeedCopy) {
  if (status === "open") {
    return copy.openLabel;
  }
  if (status === "rolling") {
    return copy.rollingLabel;
  }
  if (status === "seasonal") {
    return copy.seasonalLabel;
  }
  return copy.closedLabel;
}

function timestampPrefix(kind: OpportunityTimestampKind, copy: OpportunityFeedCopy) {
  if (kind === "published") {
    return copy.relativePublishedLabel;
  }
  if (kind === "updated") {
    return copy.relativeUpdatedLabel;
  }
  return copy.relativeVerifiedLabel;
}

function statusPriority(status: OpportunityStatus) {
  if (status === "open") {
    return 0;
  }
  if (status === "rolling") {
    return 1;
  }
  if (status === "seasonal") {
    return 2;
  }
  return 3;
}

export function OpportunityFeed({ locale, items, snapshotAt, copy, livePath }: OpportunityFeedProps) {
  const [nowMs, setNowMs] = useState(Date.now());
  const [liveItems, setLiveItems] = useState(items);
  const [liveSnapshotAt, setLiveSnapshotAt] = useState(snapshotAt);

  useEffect(() => {
    const interval = window.setInterval(() => setNowMs(Date.now()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    setLiveItems(items);
    setLiveSnapshotAt(snapshotAt);
  }, [items, snapshotAt]);

  useEffect(() => {
    if (!livePath) {
      return;
    }

    let isActive = true;

    const loadLive = async () => {
      try {
        const separator = livePath.includes("?") ? "&" : "?";
        const response = await fetch(`${livePath}${separator}ts=${Date.now()}`, {
          cache: "no-store",
        });
        const payload = (await response.json()) as LiveOpportunityPayload;

        if (!response.ok || !payload.ok || !Array.isArray(payload.items) || !payload.snapshotAt) {
          return;
        }

        if (!isActive) {
          return;
        }

        setLiveItems(payload.items);
        setLiveSnapshotAt(payload.snapshotAt);
      } catch {
        // Keep the static fallback if the live request fails.
      }
    };

    void loadLive();

    const interval = window.setInterval(() => {
      void loadLive();
    }, REFRESH_INTERVAL_MS);

    const onFocus = () => {
      void loadLive();
    };

    const onVisibilityChange = () => {
      if (!document.hidden) {
        void loadLive();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isActive = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [livePath]);

  const activeItems = livePath ? liveItems : items;
  const activeSnapshotAt = livePath ? liveSnapshotAt : snapshotAt;

  const sortedItems = useMemo(
    () =>
      [...activeItems].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [activeItems],
  );

  const featuredItems = useMemo(
    () =>
      [...activeItems]
        .sort((a, b) => {
          const statusDelta = statusPriority(a.status) - statusPriority(b.status);
          if (statusDelta !== 0) {
            return statusDelta;
          }
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        })
        .slice(0, 5),
    [activeItems],
  );

  const openCount = useMemo(() => activeItems.filter((item) => item.status === "open").length, [activeItems]);
  const rollingCount = useMemo(() => activeItems.filter((item) => item.status === "rolling").length, [activeItems]);
  const seasonalCount = useMemo(() => activeItems.filter((item) => item.status === "seasonal").length, [activeItems]);

  return (
    <section className="section-padding border-t border-line/80">
      <Reveal>
        <div className="surface-card overflow-hidden p-0">
          <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
            <div className="border-b border-line/70 bg-[linear-gradient(165deg,#0b3657_0%,#17506c_68%,#f2a33a_140%)] p-6 text-white sm:p-8 lg:border-b-0 lg:border-r">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">{copy.statusLabel}</p>
              <p className="mt-4 text-base leading-relaxed text-white/90">{copy.statusDescription}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/16 bg-white/10 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">{copy.openLabel}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{openCount}</p>
                </div>
                <div className="rounded-xl border border-white/16 bg-white/10 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">{copy.rollingLabel}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{rollingCount}</p>
                </div>
                <div className="rounded-xl border border-white/16 bg-white/10 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75">{copy.seasonalLabel}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{seasonalCount}</p>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-white/18 bg-white/10 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/82">{copy.snapshotLabel}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/90">
                  {formatAbsoluteDate(activeSnapshotAt, locale)}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="news-notification-lane surface-card !rounded-xl p-3">
                <div className="mb-2 flex items-center justify-between gap-2 px-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">{copy.streamLabel}</p>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                    {activeItems.length} items
                  </span>
                </div>
                <div className="max-h-[470px] overflow-y-auto px-1">
                  <div className="news-notification-track">
                    {sortedItems.map((item) => (
                      <article
                        key={item.id}
                        className="news-stream-card rounded-lg border border-line/80 bg-white/92 p-4 shadow-[0_8px_24px_-22px_rgba(8,47,76,0.85)]"
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClasses(item.status)}`}>
                            {statusLabel(item.status, copy)}
                          </span>
                          <span className="rounded-full border border-[#0b3a5d]/15 bg-[#0b3a5d]/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0b3a5d]">
                            {kindLabel(item.kind, copy)}
                          </span>
                          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                            {timestampPrefix(item.timestampKind, copy)} {formatRelativeDate(item.timestamp, locale, nowMs)}
                          </span>
                        </div>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 block text-base font-semibold leading-snug text-text-primary transition-colors hover:text-accent"
                        >
                          {item.title}
                        </a>

                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.summary}</p>

                        <div className="mt-3 grid gap-2 text-xs text-text-secondary sm:grid-cols-2">
                          <p>
                            <span className="font-semibold text-text-primary">{copy.audienceLabel}:</span> {item.audience}
                          </p>
                          <p>
                            <span className="font-semibold text-text-primary">{copy.geographyLabel}:</span> {item.geography}
                          </p>
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                          <span className="font-semibold text-text-primary">{copy.verificationLabel}:</span> {item.verificationNote}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{copy.latestLabel}</p>
                {featuredItems.map((item) => (
                  <HoverCard key={`${item.id}-latest`} className="!transform-none">
                    <article className="news-latest-card rounded-lg border border-line/80 bg-white/80 px-4 py-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusClasses(item.status)}`}>
                              {statusLabel(item.status, copy)}
                            </span>
                            <span className="text-xs text-text-secondary">
                              {timestampPrefix(item.timestampKind, copy)} {formatRelativeDate(item.timestamp, locale, nowMs)}
                            </span>
                          </div>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 block text-base font-semibold text-text-primary transition-colors hover:text-accent"
                          >
                            {item.title}
                          </a>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.summary}</p>
                          <div className="mt-3 grid gap-2 text-xs text-text-secondary sm:grid-cols-2">
                            <p>
                              <span className="font-semibold text-text-primary">{copy.geographyLabel}:</span> {item.geography}
                            </p>
                            <p>
                              <span className="font-semibold text-text-primary">{copy.deadlineLabel}:</span>{" "}
                              {item.deadline ? formatAbsoluteDate(item.deadline, locale, true) : copy.noDeadlineLabel}
                            </p>
                          </div>
                        </div>

                        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-[#0b3a5d] px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-[#0d456e]"
                          >
                            {copy.openSourceLabel}
                          </a>
                          <span className="text-right text-xs text-text-secondary">{item.source}</span>
                        </div>
                      </div>
                    </article>
                  </HoverCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
