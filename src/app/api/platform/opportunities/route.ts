import { NextResponse } from "next/server";
import { getPlatformRepository } from "@/lib/platform/repository";
import type {
  OpportunityQuery,
  OpportunitySort,
  PlatformOpportunityCategory,
  PlatformOpportunityStatus,
  PlatformSourceKind,
  TrustLabel,
} from "@/lib/platform/types";

const categories = new Set(["funding", "scholarship", "scholarships"]);
const statuses = new Set(["draft", "pending_review", "published", "rejected", "archived", "stale"]);
const sourceKinds = new Set(["government", "un", "foundation", "university", "donor_agency", "ngo", "research", "portal", "other"]);
const trustLabels = new Set([
  "official_source",
  "manual_reviewed",
  "direct_application",
  "refugee_friendly",
  "foundation_verified",
  "government_verified",
  "un_verified",
  "university_verified",
  "needs_review",
  "stale_source",
]);
const sorts = new Set(["relevance", "newest", "deadline", "last_checked", "title"]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeCategory(value: string): PlatformOpportunityCategory | undefined {
  if (!categories.has(value)) {
    return undefined;
  }

  return value === "scholarships" ? "scholarship" : (value as PlatformOpportunityCategory);
}

function buildQuery(request: Request): OpportunityQuery {
  const params = new URL(request.url).searchParams;
  const category = normalizeCategory(clean(params.get("category")).toLowerCase());
  const status = clean(params.get("status"));
  const sourceKind = clean(params.get("sourceKind"));
  const trustLabel = clean(params.get("trustLabel"));
  const sort = clean(params.get("sort"));
  const limit = Number.parseInt(clean(params.get("limit")), 10);

  return {
    category,
    status: statuses.has(status) ? (status as PlatformOpportunityStatus) : "published",
    search: clean(params.get("q")) || undefined,
    sourceKind: sourceKinds.has(sourceKind) ? (sourceKind as PlatformSourceKind) : undefined,
    country: clean(params.get("country")) || undefined,
    region: clean(params.get("region")) || undefined,
    sector: clean(params.get("sector")) || undefined,
    eligibility: clean(params.get("eligibility")) || undefined,
    trustLabel: trustLabels.has(trustLabel) ? (trustLabel as TrustLabel) : undefined,
    sort: sorts.has(sort) ? (sort as OpportunitySort) : "relevance",
    limit: Number.isFinite(limit) ? limit : undefined,
  };
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const query = buildQuery(request);
  const repository = getPlatformRepository();
  const items = await repository.listOpportunities(query);

  return NextResponse.json(
    {
      ok: true,
      generatedAt: new Date().toISOString(),
      storageMode: "seed",
      query,
      count: items.length,
      items,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
