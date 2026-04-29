import { NextResponse } from "next/server";
import { getPlatformRepository } from "@/lib/platform/repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const repository = getPlatformRepository();
  const [sources, checks] = await Promise.all([repository.listSources(), repository.listSourceChecks()]);

  return NextResponse.json(
    {
      ok: true,
      generatedAt: new Date().toISOString(),
      storageMode: "seed",
      count: sources.length,
      sources,
      latestChecks: checks,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
}
