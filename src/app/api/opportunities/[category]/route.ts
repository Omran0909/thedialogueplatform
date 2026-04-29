import { NextResponse } from "next/server";
import { isLocale, type Locale } from "@/lib/i18n/config";
import {
  getFundingOpportunities,
  getScholarshipOpportunities,
  type OpportunityItem,
} from "@/lib/opportunities";

type RouteContext = {
  params: {
    category: string;
  };
};

type OpportunitiesPayload = {
  ok: boolean;
  snapshotAt: string;
  items: OpportunityItem[];
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function resolveLocale(request: Request): Locale {
  const locale = clean(new URL(request.url).searchParams.get("locale"));
  return isLocale(locale) ? locale : "en";
}

function buildLiveItems(items: OpportunityItem[], checkedAt: string) {
  return items.map((item) => ({
    ...item,
    timestamp: checkedAt,
    timestampKind: "verified" as const,
  }));
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request, { params }: RouteContext) {
  const locale = resolveLocale(request);
  const checkedAt = new Date().toISOString();
  const category = clean(params.category).toLowerCase();

  let items: OpportunityItem[];

  if (category === "funding") {
    items = getFundingOpportunities(locale);
  } else if (category === "scholarships") {
    items = getScholarshipOpportunities(locale);
  } else {
    return NextResponse.json({ ok: false, message: "Unknown opportunity category." }, { status: 404 });
  }

  const payload: OpportunitiesPayload = {
    ok: true,
    snapshotAt: checkedAt,
    items: buildLiveItems(items, checkedAt),
  };

  return NextResponse.json(payload, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
