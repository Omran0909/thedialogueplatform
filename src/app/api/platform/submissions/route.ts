import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, getAdminIdentity } from "@/lib/platform/admin";
import { getPlatformRepository } from "@/lib/platform/repository";
import type { PlatformOpportunityCategory } from "@/lib/platform/types";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isHttpUrl(value: string) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function normalizeCategory(value: string): PlatformOpportunityCategory | null {
  if (value === "funding") {
    return "funding";
  }

  if (value === "scholarship" || value === "scholarships") {
    return "scholarship";
  }

  return null;
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
  const submissions = await repository.listSubmissions();

  await repository.recordAuditEvent({
    actor: admin.email,
    action: "submission.list",
    entityType: "submission",
    entityId: "all",
    metadata: { count: submissions.length },
  });

  return NextResponse.json({ ok: true, count: submissions.length, submissions });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const category = normalizeCategory(clean(body?.category).toLowerCase());
  const title = clean(body?.title);
  const sourceName = clean(body?.sourceName);
  const sourceUrl = clean(body?.sourceUrl);
  const applyUrl = clean(body?.applyUrl || body?.url);
  const submitterName = clean(body?.submitterName);
  const submitterEmail = clean(body?.submitterEmail);
  const notes = clean(body?.notes);

  if (!category || !title || !sourceName || !sourceUrl || !applyUrl) {
    return NextResponse.json(
      {
        ok: false,
        message: "category, title, sourceName, sourceUrl, and applyUrl are required.",
      },
      { status: 400 },
    );
  }

  if (!isHttpUrl(sourceUrl) || !isHttpUrl(applyUrl)) {
    return NextResponse.json(
      {
        ok: false,
        message: "sourceUrl and applyUrl must be valid http(s) URLs.",
      },
      { status: 400 },
    );
  }

  const repository = getPlatformRepository();
  const submission = await repository.createSubmission({
    category,
    title,
    sourceName,
    sourceUrl,
    applyUrl,
    submitterName: submitterName || undefined,
    submitterEmail: submitterEmail || undefined,
    notes: notes || undefined,
  });

  await repository.recordAuditEvent({
    actor: submitterEmail || "visitor",
    action: "submission.create",
    entityType: "submission",
    entityId: submission.id,
    metadata: {
      category,
      sourceName,
      storageMode: "seed-ephemeral",
    },
  });

  return NextResponse.json(
    {
      ok: true,
      message: "Submission received for moderation. It will not publish until reviewed by The Dialogue Platform.",
      durability: "ephemeral until the database adapter is connected",
      submission,
    },
    { status: 202 },
  );
}
