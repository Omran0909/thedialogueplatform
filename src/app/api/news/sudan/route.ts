import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n/config";

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

const SEARCH_QUERIES_BY_LOCALE: Record<Locale, string[]> = {
  en: [
    "Sudan when:1h",
    "Sudan diplomacy foreign minister statement envoy when:6h",
    "Sudan UN AU IGAD mediation ceasefire talks when:12h",
    "Sudan humanitarian aid relief OCHA WFP UNICEF UNHCR WHO when:12h",
    "Sudan refugees displacement famine cholera aid response when:24h",
    "Sudan policy sanctions UN Security Council ICC when:24h",
    "Sudan research study university journal report when:7d",
    "Sudan economy inflation IMF World Bank trade investment when:7d",
    "Sudan civil society education culture diaspora conference when:7d",
    "Sudan Egypt Saudi UAE Turkey Qatar Russia USA EU statement when:7d",
    "Sudan ministry of foreign affairs official statement when:24h",
    "Sudan RSF SAF official statement government agency when:7d",
    "Sudan sanctions OFAC UK FCDO EU Council UN statement when:30d",
    "Sudan armed groups rebel movements declaration peace talks when:7d",
  ],
  no: [
    "Sudan when:1h",
    "Sudan diplomati utenriksminister uttalelse when:12h",
    "Sudan FN AU IGAD mekling vaapenhvile samtaler when:24h",
    "Sudan humanitaer hjelp noedhjelp flyktninger fordrivelse when:24h",
    "Sudan politikk sanksjoner sikkerhetsraadet ICC when:7d",
    "Sudan forskning rapport universitet analyse when:7d",
    "Sudan Norge EU USA offentlig uttalelse when:7d",
    "Sudan offisiell uttalelse utenriksdepartement regjering when:24h",
    "Sudan RSF SAF offisiell uttalelse myndigheter when:7d",
    "Sudan sanksjoner OFAC EU Storbritannia FN uttalelse when:30d",
    "Sudan vaepnede grupper opprorsgrupper erklaering fredssamtaler when:7d",
  ],
  ar: [
    "السودان when:1h",
    "السودان دبلوماسية وزير الخارجية بيان when:12h",
    "السودان الأمم المتحدة الاتحاد الافريقي ايغاد وساطة وقف إطلاق النار when:24h",
    "السودان مساعدات انسانية اغاثة نزوح لاجئين مجاعة كوليرا when:24h",
    "السودان سياسة عقوبات مجلس الأمن المحكمة الجنائية الدولية when:7d",
    "السودان بحث دراسة تقرير جامعة تحليل when:7d",
    "السودان مصر السعودية الإمارات تركيا قطر روسيا الولايات المتحدة الاتحاد الأوروبي بيان when:7d",
    "السودان بيان رسمي وزارة الخارجية الحكومة when:24h",
    "السودان قوات الدعم السريع الجيش السوداني بيان رسمي when:7d",
    "السودان عقوبات أوفاك الاتحاد الأوروبي بريطانيا الأمم المتحدة بيان when:30d",
    "السودان الحركات المسلحة فصائل متمردة إعلان مفاوضات سلام when:7d",
  ],
};

const FEED_LOCALE_CONFIG: Record<Locale, { hl: string; gl: string; ceid: string }> = {
  en: { hl: "en-US", gl: "US", ceid: "US:en" },
  no: { hl: "nb", gl: "NO", ceid: "NO:no" },
  ar: { hl: "ar", gl: "SA", ceid: "SA:ar" },
};

const REQUEST_TIMEOUT_MS = 9000;
const MAX_ITEMS = 120;
const HARD_MAX_FRESH_HOURS = 168;
const MIN_FRESH_ITEMS = 20;
const FRESHNESS_WINDOWS_HOURS = [12, 24, 48, 72, HARD_MAX_FRESH_HOURS] as const;

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

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function resolveLocale(request: Request): Locale {
  const locale = clean(new URL(request.url).searchParams.get("locale"));
  return isLocale(locale) ? locale : "en";
}

function buildFeedUrl(query: string, locale: Locale) {
  const localeConfig = FEED_LOCALE_CONFIG[locale];
  const params = new URLSearchParams({
    q: query,
    hl: localeConfig.hl,
    gl: localeConfig.gl,
    ceid: localeConfig.ceid,
  });
  return `https://news.google.com/rss/search?${params.toString()}`;
}

function buildFeedUrls(locale: Locale) {
  return SEARCH_QUERIES_BY_LOCALE[locale].map((query) => buildFeedUrl(query, locale));
}

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
    host.endsWith(".mil") ||
    host.endsWith(".gc.ca") ||
    host.endsWith(".canada.ca") ||
    host.endsWith(".edu") ||
    /\.gov\.[a-z.]+$/i.test(host) ||
    /\.gob\.[a-z.]+$/i.test(host) ||
    /\.go\.[a-z.]+$/i.test(host) ||
    /\.gouv\.[a-z.]+$/i.test(host) ||
    /\.govt\.[a-z.]+$/i.test(host) ||
    /\.mil\.[a-z.]+$/i.test(host) ||
    /\.edu\.[a-z.]+$/i.test(host) ||
    /\.ac\.[a-z.]+$/i.test(host) ||
    /(^|\.)mofa\./i.test(host) ||
    /foreignaffairs|foreign-office|foreignoffice|diplomatie|diplo/i.test(host)
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

function parseSafeImageUrl(candidate: string) {
  const value = decodeHtml(candidate).trim();
  if (!value) {
    return "";
  }

  try {
    const parsed = new URL(value);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }
    return parsed.toString();
  } catch {
    return "";
  }
}

function extractImageUrl(block: string, description: string) {
  const candidatePatterns = [
    description.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] ?? "",
    block.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1] ?? "",
    block.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i)?.[1] ?? "",
    block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)?.[1] ?? "",
  ];

  for (const candidate of candidatePatterns) {
    const parsed = parseSafeImageUrl(candidate);
    if (parsed) {
      return parsed;
    }
  }

  return "";
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
    const imageUrl = extractImageUrl(block, rawDescription);

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

function mentionsSudanReference(text: string) {
  return /\b(sudan|sudanese|khartoum|darfur|port sudan|el[\s-]?fasher|geneina|oum[\s-]?durman|kordofan)\b|السودان|سوداني|الخرطوم|دارفور|بورتسودان|الفاشر|الجنينة|كردفان/i.test(
    text,
  );
}

function mentionsCoreSudanActors(text: string) {
  return /\b(rsf|rapid support forces|saf|sudanese armed forces|sudanese army)\b|قوات الدعم السريع|الجيش السوداني/i.test(
    text,
  );
}

function mentionsSudanRebelActors(text: string) {
  return /\b(splm-?n|sudan people'?s liberation movement(?:-north)?|sudan liberation army|justice and equality movement|jem|abdelaziz al-hilu|al-hilu)\b|الحركة الشعبية|الحركات المسلحة|الحركات المتمردة|جيش تحرير السودان|حركة العدل والمساواة/i.test(
    text,
  );
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

function withinHours(value: string, hours: number) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return false;
  }

  const maxAgeMs = hours * 60 * 60 * 1000;
  return Date.now() - parsed.getTime() <= maxAgeMs;
}

function pickFreshItems(items: SudanNewsItem[]) {
  for (const windowHours of FRESHNESS_WINDOWS_HOURS) {
    const windowItems = items.filter((item) => withinHours(item.publishedAt, windowHours));
    if (windowItems.length >= MIN_FRESH_ITEMS) {
      return windowItems;
    }
  }

  return items.filter((item) => withinHours(item.publishedAt, HARD_MAX_FRESH_HOURS));
}

export const runtime = "nodejs";

export async function GET(request: Request) {
  const locale = resolveLocale(request);
  const feedUrls = buildFeedUrls(locale);
  const allFeeds = await Promise.all(feedUrls.map((url) => fetchFeed(url)));
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
    const hasSourceSignal = Boolean(host) || Boolean(item.source?.trim());
    if (!hasSourceSignal) {
      return false;
    }

    const normalizedText = `${item.title} ${item.summary}`.toLowerCase();
    const hasSudanReference = mentionsSudanReference(normalizedText);
    const hasCoreActor = mentionsCoreSudanActors(normalizedText);
    const hasRebelActor = mentionsSudanRebelActors(normalizedText);

    if (!hasSudanReference && !hasCoreActor && !hasRebelActor) {
      return false;
    }

    const likelyNoise = /\b(live score|odds|betting|coupon|promo|discount)\b/i.test(normalizedText);
    if (likelyNoise && !trustedByHost && !trustedByName && !institutionalByHost) {
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

  const items = pickFreshItems(filtered)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, MAX_ITEMS);

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
      locale,
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
