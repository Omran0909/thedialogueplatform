import type { Locale } from "@/lib/i18n/config";
import type { OpportunityItem, OpportunityStatus } from "@/lib/opportunities";

type OpportunityCategory = "funding" | "scholarships";

type GrantsGovHit = {
  id?: string | number;
  number?: string;
  title?: string;
  agency?: string;
  agencyCode?: string;
  openDate?: string;
  closeDate?: string;
  oppStatus?: string;
};

type GrantsGovResponse = {
  data?: {
    oppHits?: GrantsGovHit[];
  };
};

type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  categories: string[];
  description: string;
};

type LiveCopy = {
  grantsFundingSummary: string;
  grantsScholarshipSummary: string;
  grantsFundingAudience: string;
  grantsScholarshipAudience: string;
  grantsVerification: string;
  grantsGeography: string;
  reliefSummaryPrefix: string;
  reliefAudience: string;
  reliefVerification: string;
  reliefGeography: string;
};

const GRANTS_GOV_SEARCH_URL = "https://api.grants.gov/v1/api/search2";
const GRANTS_GOV_SOURCE_URL = "https://www.grants.gov/search-grants";
const RELIEFWEB_TRAINING_RSS_URL = "https://reliefweb.int/training/rss.xml?advanced-search=%28PC1%29_%28T4583%29";
const REQUEST_TIMEOUT_MS = 8000;
const MAX_LIVE_ITEMS_PER_SOURCE = 14;
const MAX_TOTAL_ITEMS = 42;

const fundingKeywords = [
  "refugee",
  "humanitarian",
  "nonprofit",
  "civil society",
  "community development",
  "education",
  "health",
  "research",
].join(" ");

const scholarshipKeywords = [
  "scholarship",
  "fellowship",
  "Fulbright",
  "EducationUSA",
  "education",
  "training",
  "student",
  "research",
  "university",
  "academic",
].join(" ");

function copy(locale: Locale): LiveCopy {
  if (locale === "no") {
    return {
      grantsFundingSummary:
        "Ny offisiell Grants.gov-utlysning hentet direkte fra den amerikanske føderale tilskuddsportalen. Sjekk kilden for full kvalifikasjon, søknadsdokumenter og eventuelle land- eller organisasjonskrav.",
      grantsScholarshipSummary:
        "Ny offisiell Grants.gov-utlysning knyttet til stipend, fellowship, forskning, utdanning eller akademisk opplæring. Sjekk kilden for full kvalifikasjon og søknadsprosess.",
      grantsFundingAudience:
        "Ideelle organisasjoner, universiteter, offentlige aktører, forskningsmiljøer og andre kvalifiserte søkere etter hver utlysning.",
      grantsScholarshipAudience:
        "Studenter, forskere, universiteter, opplæringsprogrammer og kvalifiserte institusjoner etter hver utlysning.",
      grantsVerification:
        "Hentet automatisk fra Grants.gov, den offisielle amerikanske føderale portalen for tilskuddsutlysninger.",
      grantsGeography: "USA og internasjonale søkere der utlysningen åpner for det",
      reliefSummaryPrefix:
        "Ny akademisk, opplærings- eller faglig utviklingsmulighet publisert på ReliefWeb Training. Søk alltid via den opprinnelige organisasjonen som er oppgitt i kilden.",
      reliefAudience:
        "Humanitære aktører, studenter, fagpersoner, forskere, offentlige ansatte og organisasjonsledere etter kildens krav.",
      reliefVerification:
        "Hentet automatisk fra ReliefWebs offisielle opplæringsstrøm, med lenke videre til opprinnelig publiserende organisasjon.",
      reliefGeography: "Globalt, online eller landspesifikt etter oppføring",
    };
  }

  if (locale === "ar") {
    return {
      grantsFundingSummary:
        "دعوة رسمية جديدة من Grants.gov تم جلبها مباشرة من بوابة المنح الفيدرالية الأمريكية. راجعوا المصدر لمعرفة الأهلية الكاملة ووثائق التقديم وأي شروط خاصة بالدولة أو نوع المؤسسة.",
      grantsScholarshipSummary:
        "دعوة رسمية جديدة من Grants.gov مرتبطة بالمنح الدراسية أو الزمالات أو البحث أو التعليم أو التدريب الأكاديمي. راجعوا المصدر لمعرفة الأهلية وطريقة التقديم.",
      grantsFundingAudience:
        "المنظمات غير الربحية والجامعات والجهات العامة والفرق البحثية والجهات المؤهلة بحسب كل دعوة.",
      grantsScholarshipAudience:
        "الطلاب والباحثون والجامعات وبرامج التدريب والمؤسسات المؤهلة بحسب كل دعوة.",
      grantsVerification:
        "تم جلبها تلقائياً من Grants.gov، وهي البوابة الرسمية للحكومة الأمريكية الخاصة بإعلانات المنح الفيدرالية.",
      grantsGeography: "الولايات المتحدة والمتقدمون الدوليون عندما تسمح الدعوة بذلك",
      reliefSummaryPrefix:
        "فرصة أكاديمية أو تدريبية أو تطوير مهني جديدة منشورة في تدفق ReliefWeb Training. قدّموا دائماً عبر المنظمة الأصلية المذكورة في المصدر.",
      reliefAudience:
        "العاملون في المجال الإنساني والطلاب والمهنيون والباحثون والموظفون العموميون وقادة المنظمات بحسب شروط المصدر.",
      reliefVerification:
        "تم جلبها تلقائياً من تدفق ReliefWeb الرسمي للتدريب، مع رابط إلى الجهة الأصلية الناشرة.",
      reliefGeography: "عالمي أو عبر الإنترنت أو محدد بدولة بحسب كل فرصة",
    };
  }

  return {
    grantsFundingSummary:
      "New official Grants.gov opportunity pulled directly from the U.S. federal grants portal. Check the source for full eligibility, application documents, and any country or organisation requirements.",
    grantsScholarshipSummary:
      "New official Grants.gov opportunity connected to scholarships, fellowships, research, education, or academic training. Check the source for full eligibility and application steps.",
    grantsFundingAudience:
      "Nonprofits, universities, public bodies, research teams, and other eligible applicants according to each call.",
    grantsScholarshipAudience:
      "Students, researchers, universities, training programmes, and eligible institutions according to each call.",
    grantsVerification:
      "Automatically fetched from Grants.gov, the official U.S. federal portal for grant opportunity notices.",
    grantsGeography: "United States and eligible international applicants where the call allows it",
    reliefSummaryPrefix:
      "New academic, training, or professional-development opportunity published through ReliefWeb Training. Always apply through the original organisation named at the source.",
    reliefAudience:
      "Humanitarian workers, students, professionals, researchers, public officials, and organisation leaders according to the source requirements.",
    reliefVerification:
      "Automatically fetched from ReliefWeb's official training feed, with a link onward to the original publishing organisation.",
    reliefGeography: "Global, online, or country-specific by listing",
  };
}

function cleanText(value: unknown): string {
  if (typeof value !== "string" && typeof value !== "number") {
    return "";
  }

  return decodeHtml(String(value))
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 10)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, code: string) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-");
}

function slug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function parseUsDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, month, day, year] = match;
    return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day), 12)).toISOString();
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function parseLooseDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
}

function statusFromDeadline(deadline: string | undefined, sourceStatus?: string): OpportunityStatus {
  if (sourceStatus?.toLowerCase() === "forecasted") {
    return "seasonal";
  }

  if (!deadline) {
    return "rolling";
  }

  return new Date(deadline).getTime() < Date.now() ? "closed" : "open";
}

async function fetchWithTimeout(url: string, init?: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      headers: {
        Accept: "application/json, text/xml;q=0.9, application/xml;q=0.9, */*;q=0.8",
        ...(init?.headers ?? {}),
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

function grantsGovPayload(category: OpportunityCategory) {
  return {
    rows: MAX_LIVE_ITEMS_PER_SOURCE,
    keyword: category === "funding" ? fundingKeywords : scholarshipKeywords,
    oppStatuses: "forecasted|posted",
    dateRange: category === "funding" ? "14" : "56",
  };
}

function isScholarshipGrant(hit: GrantsGovHit): boolean {
  const searchable = cleanText(`${hit.title ?? ""} ${hit.agency ?? ""} ${hit.agencyCode ?? ""}`).toLowerCase();

  return /\b(scholarship|fellowship|fulbright|educationusa|teacher|student|undergraduate|graduate|university|academic|research|training|traineeship|exchange|opportunity funds|yali|mandela washington)\b/.test(
    searchable,
  );
}

function mapGrant(hit: GrantsGovHit, category: OpportunityCategory, locale: Locale, checkedAt: string): OpportunityItem | null {
  const title = cleanText(hit.title);
  const id = cleanText(hit.id);

  if (!title || !id) {
    return null;
  }

  if (category === "scholarships" && !isScholarshipGrant(hit)) {
    return null;
  }

  const liveCopy = copy(locale);
  const agency = cleanText(hit.agency || hit.agencyCode || "Grants.gov");
  const openDate = parseUsDate(hit.openDate);
  const deadline = parseUsDate(hit.closeDate);
  const opportunityNumber = cleanText(hit.number);
  const sourceUrl = `${GRANTS_GOV_SOURCE_URL}`;
  const itemUrl = `https://www.grants.gov/search-results-detail/${encodeURIComponent(id)}`;

  return {
    id: `grants-gov-${id}`,
    title,
    url: itemUrl,
    source: agency ? `Grants.gov / ${agency}` : "Grants.gov",
    sourceUrl,
    summary: category === "funding" ? liveCopy.grantsFundingSummary : liveCopy.grantsScholarshipSummary,
    audience: category === "funding" ? liveCopy.grantsFundingAudience : liveCopy.grantsScholarshipAudience,
    geography: liveCopy.grantsGeography,
    verificationNote: opportunityNumber
      ? `${liveCopy.grantsVerification} Opportunity number: ${opportunityNumber}.`
      : liveCopy.grantsVerification,
    timestamp: openDate ?? checkedAt,
    timestampKind: openDate ? "published" : "updated",
    deadline,
    status: statusFromDeadline(deadline, hit.oppStatus),
    kind: "call",
    tags:
      category === "funding"
        ? ["Grants.gov", "Official grant", "Funding", agency].filter(Boolean)
        : ["Grants.gov", "Scholarship", "Fellowship", "Research", agency].filter(Boolean),
  };
}

async function fetchGrantsGov(category: OpportunityCategory, locale: Locale, checkedAt: string): Promise<OpportunityItem[]> {
  const response = await fetchWithTimeout(GRANTS_GOV_SEARCH_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(grantsGovPayload(category)),
  });

  if (!response.ok) {
    return [];
  }

  const payload = (await response.json()) as GrantsGovResponse;
  const hits = Array.isArray(payload.data?.oppHits) ? payload.data.oppHits : [];

  return hits
    .map((hit) => mapGrant(hit, category, locale, checkedAt))
    .filter((item): item is OpportunityItem => Boolean(item));
}

function getXmlValue(itemXml: string, tag: string): string {
  const match = itemXml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return cleanText(match?.[1] ?? "");
}

function getXmlCategories(itemXml: string): string[] {
  return Array.from(itemXml.matchAll(/<category[^>]*>([\s\S]*?)<\/category>/gi))
    .map((match) => cleanText(match[1]))
    .filter(Boolean);
}

function parseRssItems(xml: string): RssItem[] {
  return Array.from(xml.matchAll(/<item\b[^>]*>([\s\S]*?)<\/item>/gi))
    .map((match) => {
      const itemXml = match[1] ?? "";

      return {
        title: getXmlValue(itemXml, "title"),
        link: getXmlValue(itemXml, "link"),
        pubDate: getXmlValue(itemXml, "pubDate"),
        author: getXmlValue(itemXml, "author"),
        categories: getXmlCategories(itemXml),
        description: cleanText(getXmlValue(itemXml, "description")),
      };
    })
    .filter((item) => item.title && item.link);
}

function extractRegistrationDeadline(description: string): string | undefined {
  const match = description.match(/Registration deadline:\s*([0-9]{1,2}\s+[A-Za-z]{3,9}\s+[0-9]{4})/i);
  return parseLooseDate(match?.[1]?.trim());
}

function isAcademicReliefItem(item: RssItem): boolean {
  const searchable = item.title.toLowerCase();

  return /\b(scholarship|fellowship|bursary|tuition|degree|diploma|certificate|master|masters|msc|llm|phd|doctoral|postdoctoral|university|academic|student|students|research|international law|human rights|diplomacy|international relations)\b/.test(
    searchable,
  );
}

function extractCountry(description: string, categories: string[], fallback: string): string {
  const countryMatch = description.match(/Country:\s*([^|.]+?)(?:\s+Organization:|\s+Start date:|\s+End date:|$)/i);
  const country = cleanText(countryMatch?.[1]);

  if (country) {
    return country;
  }

  const categoryCountry = categories.find((category) => !/training|workshop|online|on-site|academic|course|organization/i.test(category));
  return categoryCountry || fallback;
}

function buildReliefSummary(item: RssItem, locale: Locale): string {
  const liveCopy = copy(locale);
  const details = item.description
    .replace(/^Country:\s*[^.]+/i, "")
    .replace(/\s+/g, " ")
    .trim();
  const shortDetails = details.length > 190 ? `${details.slice(0, 190).trim()}...` : details;

  return shortDetails ? `${liveCopy.reliefSummaryPrefix} ${shortDetails}` : liveCopy.reliefSummaryPrefix;
}

function mapReliefWebTraining(item: RssItem, locale: Locale): OpportunityItem {
  const liveCopy = copy(locale);
  const published = parseLooseDate(item.pubDate);
  const deadline = extractRegistrationDeadline(item.description);
  const source = item.author || item.categories[1] || "ReliefWeb Training";

  return {
    id: `reliefweb-training-${slug(item.link || item.title)}`,
    title: item.title,
    url: item.link,
    source,
    sourceUrl: "https://reliefweb.int/training",
    summary: buildReliefSummary(item, locale),
    audience: liveCopy.reliefAudience,
    geography: extractCountry(item.description, item.categories, liveCopy.reliefGeography),
    verificationNote: liveCopy.reliefVerification,
    timestamp: published ?? new Date().toISOString(),
    timestampKind: published ? "published" : "updated",
    deadline,
    status: statusFromDeadline(deadline),
    kind: /degree|diploma|master|phd|doctoral|scholarship|fellowship/i.test(item.title) ? "programme" : "call",
    tags: ["ReliefWeb", "Training", "Academic pathway", ...item.categories.slice(0, 4)],
  };
}

async function fetchReliefWebTraining(locale: Locale): Promise<OpportunityItem[]> {
  const response = await fetchWithTimeout(RELIEFWEB_TRAINING_RSS_URL, {
    headers: {
      Accept: "*/*",
      "User-Agent": "curl/8.7.1",
    },
  });

  if (!response.ok) {
    return [];
  }

  const xml = await response.text();
  return parseRssItems(xml)
    .filter(isAcademicReliefItem)
    .slice(0, MAX_LIVE_ITEMS_PER_SOURCE)
    .map((item) => mapReliefWebTraining(item, locale));
}

function dedupe(items: OpportunityItem[]): OpportunityItem[] {
  const seen = new Set<string>();
  const unique: OpportunityItem[] = [];

  for (const item of items) {
    const key = `${item.url || item.title}`.toLowerCase().replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(item);
  }

  return unique;
}

function sortItems(items: OpportunityItem[]): OpportunityItem[] {
  return [...items].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export async function getLiveOpportunities(
  category: OpportunityCategory,
  locale: Locale,
  fallbackItems: OpportunityItem[],
  checkedAt: string,
): Promise<OpportunityItem[]> {
  const liveRequests =
    category === "funding"
      ? [fetchGrantsGov("funding", locale, checkedAt)]
      : [fetchGrantsGov("scholarships", locale, checkedAt), fetchReliefWebTraining(locale)];

  const settled = await Promise.allSettled(liveRequests);
  const liveItems = settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  const merged = dedupe([...sortItems(liveItems), ...fallbackItems]);

  return merged.slice(0, MAX_TOTAL_ITEMS);
}
