import {
  getFundingOpportunities,
  getScholarshipOpportunities,
  opportunitiesSnapshotAt,
  type OpportunityItem,
} from "@/lib/opportunities";
import type {
  PlatformOpportunityCategory,
  PlatformOpportunityRecord,
  PlatformSourceKind,
  PlatformSourceRecord,
  SourceCheckRecord,
  TrustLabel,
} from "@/lib/platform/types";

type SeedItem = {
  item: OpportunityItem;
  category: PlatformOpportunityCategory;
};

const PLATFORM_SEED_ACTOR = "seed:curated-opportunities";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/https?:\/\//g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function unique(values: string[]) {
  return Array.from(new Set(values.map((value) => value.trim()).filter(Boolean)));
}

function getUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function getHost(value: string) {
  return getUrl(value)?.hostname.replace(/^www\./, "") ?? "";
}

function sourceIdFor(item: OpportunityItem) {
  const sourceHost = getHost(item.sourceUrl ?? item.url);
  return `source-${slugify(sourceHost || item.source)}`;
}

function sourceUrlFor(item: OpportunityItem) {
  if (item.sourceUrl) {
    return item.sourceUrl;
  }

  const url = getUrl(item.url);
  return url ? `${url.protocol}//${url.hostname}` : item.url;
}

function includesAny(haystack: string, needles: string[]) {
  return needles.some((needle) => haystack.includes(needle));
}

function inferSourceKind(item: OpportunityItem): PlatformSourceKind {
  const text = `${item.source} ${item.url} ${item.sourceUrl ?? ""} ${item.tags.join(" ")}`.toLowerCase();

  if (includesAny(text, ["united nations", "unhcr", "unicef", "un women", "un partner", "wfp", "who.int", "iom.int"])) {
    return "un";
  }

  if (includesAny(text, ["gov", "government", "commission", "norad", "grants.gov", "sam.gov", "daad", "campus france"])) {
    return "government";
  }

  if (includesAny(text, ["foundation", "ford", "mastercard", "gates", "robert bosch"])) {
    return "foundation";
  }

  if (includesAny(text, ["university", "college", ".edu", "scholarship", "study"])) {
    return "university";
  }

  if (includesAny(text, ["afd", "world bank", "development bank", "donor", "nrc"])) {
    return "donor_agency";
  }

  if (includesAny(text, ["research", "euraxess", "doctoral", "postdoctoral"])) {
    return "research";
  }

  return item.kind === "portal" ? "portal" : "other";
}

function inferTrustLabels(item: OpportunityItem, kind: PlatformSourceKind): TrustLabel[] {
  const labels: TrustLabel[] = ["official_source", "manual_reviewed", "direct_application"];
  const text = `${item.title} ${item.summary} ${item.audience} ${item.tags.join(" ")}`.toLowerCase();

  if (text.includes("refugee") || text.includes("displaced")) {
    labels.push("refugee_friendly");
  }

  if (kind === "government" || kind === "donor_agency") {
    labels.push("government_verified");
  }

  if (kind === "un") {
    labels.push("un_verified");
  }

  if (kind === "foundation") {
    labels.push("foundation_verified");
  }

  if (kind === "university") {
    labels.push("university_verified");
  }

  return Array.from(new Set(labels));
}

function inferRegions(item: OpportunityItem) {
  const text = `${item.geography} ${item.tags.join(" ")}`.toLowerCase();
  const regions: string[] = [];

  if (text.includes("global") || text.includes("international")) regions.push("Global");
  if (text.includes("africa")) regions.push("Africa");
  if (text.includes("europe") || text.includes("eu ")) regions.push("Europe");
  if (text.includes("asia")) regions.push("Asia");
  if (text.includes("middle east")) regions.push("Middle East");
  if (text.includes("america") || text.includes("united states")) regions.push("Americas");

  return unique(regions.length > 0 ? regions : ["Global"]);
}

function inferCountries(item: OpportunityItem) {
  const text = `${item.geography} ${item.tags.join(" ")}`.toLowerCase();
  const pairs: Array<[string, string[]]> = [
    ["Norway", ["norway", "norad"]],
    ["France", ["france", "afd", "campus france"]],
    ["Germany", ["germany", "daad"]],
    ["United States", ["united states", "u.s.", "usa", "grants.gov", "sam.gov"]],
    ["European Union", ["european union", "european commission", "eu "]],
    ["Uganda", ["uganda"]],
  ];

  return unique(pairs.filter(([, markers]) => includesAny(text, markers)).map(([country]) => country));
}

function inferSectors(item: OpportunityItem, category: PlatformOpportunityCategory) {
  const text = `${item.title} ${item.summary} ${item.audience} ${item.tags.join(" ")}`.toLowerCase();
  const sectors: string[] = [];

  if (category === "scholarship") sectors.push("Education");
  if (includesAny(text, ["research", "doctoral", "postdoctoral", "academic"])) sectors.push("Research");
  if (includesAny(text, ["civil society", "ngo", "nonprofit", "community"])) sectors.push("Civil society");
  if (includesAny(text, ["humanitarian", "refugee", "displaced", "protection"])) sectors.push("Humanitarian");
  if (includesAny(text, ["health", "medical", "who"])) sectors.push("Health");
  if (includesAny(text, ["development", "cooperation", "aid"])) sectors.push("Development");
  if (includesAny(text, ["culture", "arts", "media"])) sectors.push("Culture");

  return unique(sectors.length > 0 ? sectors : ["General"]);
}

function inferEligibility(item: OpportunityItem, category: PlatformOpportunityCategory) {
  const text = `${item.title} ${item.summary} ${item.audience} ${item.tags.join(" ")}`.toLowerCase();
  const eligibility: string[] = [];

  if (category === "funding") eligibility.push("Organisations");
  if (category === "scholarship") eligibility.push("Students");
  if (includesAny(text, ["ngo", "nonprofit", "civil society", "community"])) eligibility.push("NGOs");
  if (includesAny(text, ["university", "academic institution"])) eligibility.push("Universities");
  if (includesAny(text, ["researcher", "research", "doctoral", "postdoctoral"])) eligibility.push("Researchers");
  if (includesAny(text, ["refugee", "displaced"])) eligibility.push("Refugees");
  if (includesAny(text, ["municipalities", "public entities", "government agencies"])) eligibility.push("Public institutions");
  if (includesAny(text, ["business", "companies", "private-sector"])) eligibility.push("Companies");

  return unique(eligibility);
}

function buildSeedItems(): SeedItem[] {
  return [
    ...getFundingOpportunities("en").map((item) => ({ item, category: "funding" as const })),
    ...getScholarshipOpportunities("en").map((item) => ({ item, category: "scholarship" as const })),
  ];
}

export function buildSeedPlatformSources(): PlatformSourceRecord[] {
  const sources = new Map<string, PlatformSourceRecord>();

  for (const { item } of buildSeedItems()) {
    const sourceId = sourceIdFor(item);
    const sourceKind = inferSourceKind(item);
    const sourceUrl = sourceUrlFor(item);
    const existing = sources.get(sourceId);
    const trustLabels = inferTrustLabels(item, sourceKind);
    const regions = inferRegions(item);
    const countries = inferCountries(item);

    if (existing) {
      sources.set(sourceId, {
        ...existing,
        trustLabels: Array.from(new Set([...existing.trustLabels, ...trustLabels])),
        regions: unique([...existing.regions, ...regions]),
        countries: unique([...existing.countries, ...countries]),
      });
      continue;
    }

    sources.set(sourceId, {
      id: sourceId,
      name: item.source,
      url: sourceUrl,
      host: getHost(sourceUrl),
      kind: sourceKind,
      status: "healthy",
      trustLabels,
      regions,
      countries,
      description: item.verificationNote,
      checkIntervalHours: item.kind === "portal" ? 24 : 72,
      lastCheckedAt: item.timestamp,
      nextCheckAt: new Date(new Date(item.timestamp).getTime() + 24 * 60 * 60 * 1000).toISOString(),
      createdAt: opportunitiesSnapshotAt,
      updatedAt: opportunitiesSnapshotAt,
    });
  }

  return Array.from(sources.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export function buildSeedPlatformOpportunities(): PlatformOpportunityRecord[] {
  return buildSeedItems().map(({ item, category }) => {
    const sourceKind = inferSourceKind(item);
    const sourceUrl = sourceUrlFor(item);

    return {
      id: `${category}-${item.id}`,
      legacyId: item.id,
      category,
      status: item.status === "closed" ? "archived" : "published",
      title: item.title,
      sourceId: sourceIdFor(item),
      sourceName: item.source,
      sourceUrl,
      applyUrl: item.url,
      summary: item.summary,
      audience: item.audience,
      geography: item.geography,
      regions: inferRegions(item),
      countries: inferCountries(item),
      sectors: inferSectors(item, category),
      eligibility: inferEligibility(item, category),
      tags: unique(item.tags),
      trustLabels: inferTrustLabels(item, sourceKind),
      sourceKind,
      deadline: item.deadline,
      publishedAt: item.timestampKind === "published" ? item.timestamp : undefined,
      lastCheckedAt: item.timestamp,
      staleAfterDays: category === "funding" ? 14 : 30,
      createdAt: opportunitiesSnapshotAt,
      updatedAt: opportunitiesSnapshotAt,
      createdBy: PLATFORM_SEED_ACTOR,
      reviewedBy: PLATFORM_SEED_ACTOR,
      reviewNotes: item.verificationNote,
      flags: unique([item.status, item.kind, item.timestampKind]),
    };
  });
}

export function buildSeedSourceChecks(): SourceCheckRecord[] {
  return buildSeedPlatformSources().map((source) => ({
    id: `check-${source.id}-${slugify(opportunitiesSnapshotAt)}`,
    sourceId: source.id,
    sourceName: source.name,
    checkedAt: source.lastCheckedAt ?? opportunitiesSnapshotAt,
    status: "ok",
    httpStatus: 200,
    message: "Seeded from manually reviewed curated opportunity registry.",
    discoveredCount: 0,
    changedCount: 0,
  }));
}
