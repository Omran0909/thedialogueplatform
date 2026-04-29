import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, getAdminIdentity } from "@/lib/platform/admin";
import { isPlatformDatabaseConfigured, isPlatformDatabaseEnabled } from "@/lib/platform/database";
import { bootstrapPlatformDatabase } from "@/lib/platform/postgres";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const admin = getAdminIdentity(request);
  if (!admin) {
    return adminUnauthorizedResponse();
  }

  return NextResponse.json({
    ok: true,
    databaseConfigured: isPlatformDatabaseConfigured(),
    databaseEnabled: isPlatformDatabaseEnabled(),
    storageModeHint: "Set PLATFORM_STORAGE_MODE=postgres after bootstrapping to read and write through PostgreSQL.",
  });
}

export async function POST(request: Request) {
  const admin = getAdminIdentity(request);
  if (!admin) {
    return adminUnauthorizedResponse();
  }

  if (!isPlatformDatabaseConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        message: "DATABASE_URL or POSTGRES_URL is required before bootstrapping PostgreSQL.",
      },
      { status: 400 },
    );
  }

  const result = await bootstrapPlatformDatabase(admin.email);

  return NextResponse.json({
    ok: true,
    message: "Platform database schema created and seed data imported.",
    ...result,
  });
}
