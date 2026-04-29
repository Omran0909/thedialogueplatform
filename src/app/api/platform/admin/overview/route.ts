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
  const overview = await repository.getOverview();

  await repository.recordAuditEvent({
    actor: admin.email,
    action: "admin.overview.read",
    entityType: "overview",
    entityId: "platform",
    metadata: { storageMode: overview.storageMode },
  });

  return NextResponse.json({ ok: true, overview });
}
