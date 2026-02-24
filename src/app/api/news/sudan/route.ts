import { NextResponse } from "next/server";

type SudanNewsItem = {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  summary: string;
};

const FEED_URLS = [
  "https://news.google.com/rss/search?q=Sudan&hl=en-US&gl=US&ceid=US:en",
  "https://news.google.com/rss/search?q=Sudan+humanitarian&hl=en-US&gl=US&ceid=US:en",
];

const MAX_ITEMS = 30;
const REQUEST_TIMEOUT_MS = 9000;

function stripCdata(input: string) {
  return input
    .replace(/^<!\[CDATA\[/i, "")
    .replace(/\]\]>$/i, "")
    .trim();
}

function stripTags(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function decodeHtml(input: string) {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: " ",
    "#39": "'",
  };

  return input.replace(/&(#\d+|#x[0-9a-f]+|[a-z0-9]+);/gi, (entity, key: string) => {
    const normalized = key.toLowerCase();
    if (named[normalized]) {
      return named[normalized];
    }

    if (normalized.startsWith("#x")) {
      const codePoint = Number.parseInt(normalized.slice(2), 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }

    if (normalized.startsWith("#")) {
      const codePoint = Number.parseInt(normalized.slice(1), 10);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }

    return entity;
  });
}

function getTagContent(block: string, tagName: string) {
  const match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`, "i"));
  if (!match) {
    return "";
  }

  return decodeHtml(stripCdata(match[1])).trim();
}

function getSource(block: string, fallbackUrl: string) {
  const match = block.match(/<source(?:\s+url="([^"]*)")?[^>]*>([\s\S]*?)<\/source>/i);
  if (!match) {
    try {
      const host = new URL(fallbackUrl).hostname.replace(/^www\./i, "");
      return { source: host, sourceUrl: fallbackUrl };
    } catch {
      return { source: "Unknown source", sourceUrl: fallbackUrl };
    }
  }

  const source = decodeHtml(stripCdata(match[2])).trim();
  const sourceUrl = decodeHtml((match[1] ?? "").trim());

  if (source && sourceUrl) {
    return { source, sourceUrl };
  }

  if (source) {
    return { source, sourceUrl: fallbackUrl };
  }

  try {
    const host = new URL(fallbackUrl).hostname.replace(/^www\./i, "");
    return { source: host, sourceUrl: sourceUrl || fallbackUrl };
  } catch {
    return { source: "Unknown source", sourceUrl: sourceUrl || fallbackUrl };
  }
}

function normalizeSummary(description: string) {
  const text = decodeHtml(stripTags(stripCdata(description))).trim();
  if (!text) {
    return "Open source article for full context.";
  }

  return text.length > 180 ? `${text.slice(0, 177)}...` : text;
}

function parseDate(rawDate: string) {
  const parsed = new Date(rawDate);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return parsed;
}

function parseRss(xml: string) {
  const blocks = [...xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi)];
  const items: SudanNewsItem[] = [];

  for (const blockMatch of blocks) {
    const block = blockMatch[1];
    const title = getTagContent(block, "title");
    const url = getTagContent(block, "link");
    const pubDate = getTagContent(block, "pubDate");
    const description = getTagContent(block, "description");

    if (!title || !url || !pubDate) {
      continue;
    }

    const parsedDate = parseDate(pubDate);
    if (!parsedDate) {
      continue;
    }

    const sourceData = getSource(block, url);
    const summary = normalizeSummary(description);

    items.push({
      id: `${parsedDate.getTime()}-${title}-${url}`.toLowerCase(),
      title: title.replace(/\s+/g, " ").trim(),
      url,
      source: sourceData.source,
      sourceUrl: sourceData.sourceUrl || url,
      publishedAt: parsedDate.toISOString(),
      summary,
    });
  }

  return items;
}

async function fetchFeed(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: "application/rss+xml, application/xml;q=0.9, text/xml;q=0.8",
        "User-Agent": "TheDialoguePlatform-NewsFeed/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return [];
    }

    const xml = await response.text();
    return parseRss(xml);
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}

export const runtime = "nodejs";

export async function GET() {
  const allFeeds = await Promise.all(FEED_URLS.map((url) => fetchFeed(url)));
  const deduped = new Map<string, SudanNewsItem>();

  for (const feedItems of allFeeds) {
    for (const item of feedItems) {
      const key = `${item.url}::${item.title}`.toLowerCase();
      if (!deduped.has(key)) {
        deduped.set(key, item);
      }
    }
  }

  const items = Array.from(deduped.values())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);

  if (items.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Live news is temporarily unavailable.",
        items: [],
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.json(
    {
      ok: true,
      updatedAt: new Date().toISOString(),
      items,
    },
    {
      headers: {
        "Cache-Control": "s-maxage=120, stale-while-revalidate=240",
      },
    },
  );
}
