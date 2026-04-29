import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, getAdminIdentity } from "@/lib/platform/admin";
import { getPlatformRepository } from "@/lib/platform/repository";
import type { PlatformSourceStatus } from "@/lib/platform/types";

const sourceStatuses = new Set(["healthy", "degraded", "broken", "stale", "quarantined"]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const admin = getAdminIdentity(request);
  if (!admin) {
    return adminUnauthorizedResponse();
  }

  const repository = getPlatformRepository();
  const [sources, checks] = await Promise.all([repository.listSources(), repository.listSourceChecks()]);

  await repository.recordAuditEvent({
    actor: admin.email,
    action: "admin.sources.list",
    entityType: "source",
    entityId: "all",
    metadata: { count: sources.length },
  });

  return NextResponse.json({
    ok: true,
    count: sources.length,
    sources,
    latestChecks: checks,
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
  const checkIntervalHours =
    typeof body?.checkIntervalHours === "number" && Number.isFinite(body.checkIntervalHours)
      ? Math.max(1, Math.min(24 * 30, Math.round(body.checkIntervalHours)))
      : undefined;

  if (!id) {
    return NextResponse.json({ ok: false, message: "id is required." }, { status: 400 });
  }

  if (status && !sourceStatuses.has(status)) {
    return NextResponse.json({ ok: false, message: "Invalid source status." }, { status: 400 });
  }

  const repository = getPlatformRepository();
  const source = await repository.updateSource({
    id,
    status: status ? (status as PlatformSourceStatus) : undefined,
    checkIntervalHours,
    actor: admin.email,
    note: note || "Source updated by admin.",
  });

  if (!source) {
    return NextResponse.json({ ok: false, message: "Source not found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    message: "Source updated.",
    source,
  });
}
