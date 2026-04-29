import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, getAdminIdentity } from "@/lib/platform/admin";
import { getPlatformRepository } from "@/lib/platform/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const admin = getAdminIdentity(request);
  if (!admin) {
    return adminUnauthorizedResponse();
  }

  const repository = getPlatformRepository();
  const events = await repository.listAuditEvents();

  return NextResponse.json({
    ok: true,
    count: events.length,
    events,
  });
}
