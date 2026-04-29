import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, getAdminIdentity } from "@/lib/platform/admin";
import { getPlatformRepository } from "@/lib/platform/repository";
import type { OpportunitySort, PlatformOpportunityCategory, PlatformOpportunityStatus } from "@/lib/platform/types";

const statuses = new Set(["draft", "pending_review", "published", "rejected", "archived", "stale"]);
const categories = new Set(["funding", "scholarship", "scholarships"]);
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

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const admin = getAdminIdentity(request);
  if (!admin) {
    return adminUnauthorizedResponse();
  }

  const params = new URL(request.url).searchParams;
  const status = clean(params.get("status"));
  const category = normalizeCategory(clean(params.get("category")).toLowerCase());
  const sort = clean(params.get("sort"));
  const repository = getPlatformRepository();
  const items = await repository.listOpportunities({
    category,
    status: statuses.has(status) ? (status as PlatformOpportunityStatus) : undefined,
    search: clean(params.get("q")) || undefined,
    sort: sorts.has(sort) ? (sort as OpportunitySort) : "newest",
    limit: 100,
  });

  await repository.recordAuditEvent({
    actor: admin.email,
    action: "admin.opportunities.list",
    entityType: "opportunity",
    entityId: "all",
    metadata: { count: items.length, status: status || "all", category: category ?? "all" },
  });

  return NextResponse.json({
    ok: true,
    count: items.length,
    items,
  });
}

export async function PATCH(request: Request) {
  const admin = getAdminIdentity(request);
  if (!admin) {
    return adminUnauthorizedResponse();
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const id = clean(body?.id);
  const status = clean(body?.status);
  const note = clean(body?.note);

  if (!id || !statuses.has(status)) {
    return NextResponse.json(
      {
        ok: false,
        message: "id and a valid status are required.",
      },
      { status: 400 },
    );
  }

  const repository = getPlatformRepository();
  const opportunity = await repository.moderateOpportunity({
    id,
    status: status as PlatformOpportunityStatus,
    reviewer: admin.email,
    note: note || "Status updated by admin.",
  });

  if (!opportunity) {
    return NextResponse.json({ ok: false, message: "Opportunity not found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    message: "Opportunity updated.",
    opportunity,
  });
}
