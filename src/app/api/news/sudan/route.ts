import { NextResponse } from "next/server";

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

const SEARCH_QUERIES = [
  "Sudan when:1h",
  "Sudan diplomacy foreign minister statement envoy when:6h",
  "Sudan UN AU IGAD mediation ceasefire talks when:12h",
  "Sudan humanitarian aid relief OCHA WFP UNICEF UNHCR WHO when:12h",
  "Sudan refugees displacement famine cholera aid response when:24h",
  "Sudan policy sanctions UN Security Council ICC when:24h",
  "Sudan research study university journal report",
  "Sudan economy inflation IMF World Bank trade investment",
  "Sudan civil society education culture diaspora conference",
  "Sudan Egypt Saudi UAE Turkey Qatar Russia USA EU statement",
  "السودان الأمم المتحدة مساعدات دبلوماسية",
];

const REQUEST_TIMEOUT_MS = 9000;
const MAX_ITEMS = 30;
const PRIMARY_FRESH_HOURS = 12;
const SECONDARY_FRESH_HOURS = 48;

const BLOCKED_SOURCE_HOSTS = ["aljazeera.com", "aljazeera.net"];
const BLOCKED_SOURCE_NAME_PATTERNS = [/al[\s-]?jazeera/i];

const TRUSTED_SOURCE_HOSTS = [
  "reuters.com",
  "apnews.com",
  "bbc.com",
  "bbc.co.uk",
  "theguardian.com",
  "nytimes.com",
  "washingtonpost.com",
  "cnn.com",
  "france24.com",
  "dw.com",
  "africanews.com",
  "allafrica.com",
  "ft.com",
  "bloomberg.com",
  "economist.com",
  "npr.org",
  "reliefweb.int",
  "news.un.org",
  "unhcr.org",
  "unicef.org",
  "who.int",
  "hrw.org",
  "amnesty.org",
  "icrc.org",
  "msf.org",
  "state.gov",
  "whitehouse.gov",
  "gov.uk",
  "europa.eu",
  "consilium.europa.eu",
  "un.org",
  "unocha.org",
  "wfp.org",
  "worldbank.org",
  "imf.org",
  "au.int",
  "igad.int",
  "thenewhumanitarian.org",
  "crisisgroup.org",
  "chathamhouse.org",
  "brookings.edu",
  "csis.org",
  "carnegieendowment.org",
  "nature.com",
  "thelancet.com",
  "bmj.com",
];

const TRUSTED_SOURCE_NAMES = [
  "Reuters",
  "Associated Press",
  "AP News",
  "BBC",
  "The Guardian",
  "New York Times",
  "Washington Post",
  "CNN",
  "France 24",
  "DW",
  "Africanews",
  "allAfrica",
  "Financial Times",
  "Bloomberg",
  "The Economist",
  "NPR",
  "ReliefWeb",
  "UN News",
  "UNHCR",
  "UNICEF",
  "WHO",
  "Human Rights Watch",
  "Amnesty International",
  "ICRC",
  "Doctors Without Borders",
  "MSF",
  "US Department of State",
  "The White House",
  "UK Foreign Office",
  "European Council",
  "European External Action Service",
  "World Bank",
  "International Monetary Fund",
  "African Union",
  "IGAD",
  "UN OCHA",
  "World Food Programme",
  "The New Humanitarian",
  "International Crisis Group",
  "Chatham House",
  "Brookings",
  "CSIS",
  "Carnegie Endowment",
  "Nature",
  "The Lancet",
  "BMJ",
];

const BALANCE_ORDER = ["neutral", "both", "rsf", "saf"] as const;

function buildFeedUrl(query: string) {
  const params = new URLSearchParams({
    q: query,
    hl: "en-US",
    gl: "US",
    ceid: "US:en",
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

const FEED_URLS = SEARCH_QUERIES.map(buildFeedUrl);

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

function normalizeHost(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./i, "");
  } catch {
    return "";
  }
}

function hostMatchesList(host: string, list: readonly string[]) {
  if (!host) {
    return false;
  }
  return list.some((candidate) => host === candidate || host.endsWith(`.${candidate}`));
}

function isInstitutionalHost(host: string) {
  if (!host) {
    return false;
  }

  return (
    host.endsWith(".int") ||
    host.endsWith(".gov") ||
    host.endsWith(".edu") ||
    /\.gov\.[a-z.]+$/i.test(host) ||
    /\.edu\.[a-z.]+$/i.test(host) ||
    /\.ac\.[a-z.]+$/i.test(host)
  );
}

function isTrustedSourceName(name: string) {
  const normalized = name.toLowerCase();
  return TRUSTED_SOURCE_NAMES.some((trusted) => normalized.includes(trusted.toLowerCase()));
}

function isBlockedSourceName(name: string) {
  return BLOCKED_SOURCE_NAME_PATTERNS.some((pattern) => pattern.test(name));
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
    const fallbackHost = normalizeHost(fallbackUrl);
    return {
      source: fallbackHost || "Unknown source",
      sourceUrl: fallbackUrl,
    };
  }

  const source = decodeHtml(stripCdata(match[2])).trim();
  const sourceUrl = decodeHtml((match[1] ?? "").trim());

  if (source && sourceUrl) {
    return { source, sourceUrl };
  }

  return {
    source: source || normalizeHost(fallbackUrl) || "Unknown source",
    sourceUrl: sourceUrl || fallbackUrl,
  };
}

function normalizeSummary(description: string) {
  const text = decodeHtml(stripTags(stripCdata(description))).trim();
  if (!text) {
    return "Open source article for full context.";
  }
  return text.length > 220 ? `${text.slice(0, 217)}...` : text;
}

function extractImageUrl(description: string) {
  const imageMatch = description.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!imageMatch) {
    return "";
  }

  const candidate = decodeHtml(imageMatch[1]).trim();
  if (!candidate) {
    return "";
  }

  try {
    const parsed = new URL(candidate);
    return parsed.toString();
  } catch {
    return "";
  }
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
    const rawDescription = block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ?? "";

    if (!title || !url || !pubDate) {
      continue;
    }

    const parsedDate = parseDate(pubDate);
    if (!parsedDate) {
      continue;
    }

    const sourceData = getSource(block, url);
    const summary = normalizeSummary(description);
    const imageUrl = extractImageUrl(rawDescription);

    items.push({
      id: `${parsedDate.getTime()}-${title}-${url}`.toLowerCase(),
      title: title.replace(/\s+/g, " ").trim(),
      url,
      source: sourceData.source,
      sourceUrl: sourceData.sourceUrl || url,
      publishedAt: parsedDate.toISOString(),
      summary,
      imageUrl,
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

function mentionsSaf(text: string) {
  return /\b(saf|sudanese armed forces|sudanese army)\b/i.test(text);
}

function mentionsRsf(text: string) {
  return /\b(rsf|rapid support forces)\b/i.test(text);
}

function mentionsMuslimBrotherhood(text: string) {
  return /\b(muslim brotherhood|ikhwan|islamic movement)\b/i.test(text);
}

function looksLikeOneSidedSafNarrative(item: SudanNewsItem) {
  const combined = `${item.title} ${item.summary}`.toLowerCase();
  const hasSaf = mentionsSaf(combined);
  const hasRsf = mentionsRsf(combined);
  if (!hasSaf || hasRsf) {
    return false;
  }

  const militaryCelebration =
    /\b(victory|victories|liberated|liberates|crushed|crushes|annihilat|eliminat|decisive defeat)\b/i.test(combined);
  const neutralContext =
    /\b(humanitarian|civilian|aid|ceasefire|talks|rights|displacement|famine|sanction|mediation)\b/i.test(combined);

  return militaryCelebration && !neutralContext;
}

function looksLikeOneSidedMuslimBrotherhoodNarrative(item: SudanNewsItem) {
  const combined = `${item.title} ${item.summary}`.toLowerCase();
  if (!mentionsMuslimBrotherhood(combined)) {
    return false;
  }

  const propagandistTone =
    /\b(glorious|heroic|triumph|victory|martyr|holy battle|jihad|purge|cleansed|defenders of faith|traitors)\b/i.test(
      combined,
    );
  const neutralContext =
    /\b(report|analysis|investigation|rights|humanitarian|aid|ceasefire|talks|sanction|court|displacement|famine|mediation)\b/i.test(
      combined,
    );

  return propagandistTone && !neutralContext;
}

function classifyItem(item: SudanNewsItem) {
  const combined = `${item.title} ${item.summary}`.toLowerCase();
  const hasSaf = mentionsSaf(combined);
  const hasRsf = mentionsRsf(combined);

  if (hasSaf && hasRsf) {
    return "both";
  }
  if (hasRsf) {
    return "rsf";
  }
  if (hasSaf) {
    return "saf";
  }
  return "neutral";
}

function sortAndBalance(items: SudanNewsItem[]) {
  const sorted = [...items].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  const buckets: Record<(typeof BALANCE_ORDER)[number], SudanNewsItem[]> = {
    both: [],
    rsf: [],
    neutral: [],
    saf: [],
  };

  for (const item of sorted) {
    buckets[classifyItem(item)].push(item);
  }

  const balanced: SudanNewsItem[] = [];
  while (balanced.length < sorted.length) {
    let pushed = false;
    for (const bucketName of BALANCE_ORDER) {
      const next = buckets[bucketName].shift();
      if (next) {
        balanced.push(next);
        pushed = true;
      }
    }
    if (!pushed) {
      break;
    }
  }

  return balanced;
}

function withinHours(value: string, hours: number) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  const maxAgeMs = hours * 60 * 60 * 1000;
  return Date.now() - parsed.getTime() <= maxAgeMs;
}

function pickFreshItems(items: SudanNewsItem[]) {
  const primary = items.filter((item) => withinHours(item.publishedAt, PRIMARY_FRESH_HOURS));
  if (primary.length >= 8) {
    return primary;
  }

  const secondary = items.filter((item) => withinHours(item.publishedAt, SECONDARY_FRESH_HOURS));
  if (secondary.length > 0) {
    return secondary;
  }

  return items;
}

export const runtime = "nodejs";

export async function GET() {
  const allFeeds = await Promise.all(FEED_URLS.map((url) => fetchFeed(url)));
  const deduped = new Map<string, SudanNewsItem>();

  for (const feedItems of allFeeds) {
    for (const item of feedItems) {
      const dedupeKey = `${item.title}::${item.url}`.toLowerCase();
      if (!deduped.has(dedupeKey)) {
        deduped.set(dedupeKey, item);
      }
    }
  }

  const filtered = Array.from(deduped.values()).filter((item) => {
    const sourceHost = normalizeHost(item.sourceUrl);
    const articleHost = normalizeHost(item.url);
    const host = sourceHost || articleHost;

    if (hostMatchesList(host, BLOCKED_SOURCE_HOSTS)) {
      return false;
    }

    if (isBlockedSourceName(item.source)) {
      return false;
    }

    const trustedByHost = hostMatchesList(host, TRUSTED_SOURCE_HOSTS);
    const trustedByName = isTrustedSourceName(item.source);
    const institutionalByHost = isInstitutionalHost(host);

    if (!trustedByHost && !trustedByName && !institutionalByHost) {
      return false;
    }

    if (looksLikeOneSidedSafNarrative(item)) {
      return false;
    }

    if (looksLikeOneSidedMuslimBrotherhoodNarrative(item)) {
      return false;
    }

    return true;
  });

  const items = sortAndBalance(pickFreshItems(filtered)).slice(0, MAX_ITEMS);

  if (items.length === 0) {
    return NextResponse.json(
      {
        ok: false,
        message: "Live Sudan news is temporarily unavailable.",
        items: [],
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store, max-age=0",
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
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
