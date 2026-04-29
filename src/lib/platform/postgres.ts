import { applyPlatformSchema, getPlatformSql } from "@/lib/platform/database";
import {
  buildSeedPlatformOpportunities,
  buildSeedPlatformSources,
  buildSeedSourceChecks,
} from "@/lib/platform/seed";
import type {
  AuditEventInput,
  AuditEventRecord,
  OpportunityModerationInput,
  OpportunityQuery,
  OpportunitySubmissionInput,
  OpportunitySubmissionRecord,
  OpportunitySubmissionStatus,
  PlatformOpportunityRecord,
  PlatformOverview,
  PlatformRepository,
  PlatformSourceRecord,
  SourceCheckRecord,
  SourceUpdateInput,
} from "@/lib/platform/types";

type DbRow = Record<string, unknown>;

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function now() {
  return new Date().toISOString();
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asOptionalString(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function asNumber(value: unknown, fallback = 0) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function asBoolean(value: unknown) {
  return value === true;
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function iso(value: unknown) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Date.parse(value);
    return Number.isNaN(parsed) ? value : new Date(parsed).toISOString();
  }

  return "";
}

function isoOptional(value: unknown) {
  const parsed = iso(value);
  return parsed || undefined;
}

function json(value: unknown) {
  return JSON.stringify(value ?? null);
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function includesNormalized(values: string[], needle: string) {
  const normalizedNeedle = normalize(needle);
  return values.some((value) => normalize(value) === normalizedNeedle);
}

function containsSearch(opportunity: PlatformOpportunityRecord, search: string) {
  const haystack = [
    opportunity.title,
    opportunity.sourceName,
    opportunity.summary,
    opportunity.audience,
    opportunity.geography,
    opportunity.regions.join(" "),
    opportunity.countries.join(" "),
    opportunity.sectors.join(" "),
    opportunity.eligibility.join(" "),
    opportunity.tags.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(search.trim().toLowerCase());
}

function dateValue(value?: string) {
  if (!value) {
    return 0;
  }

  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function applyQuery(opportunities: PlatformOpportunityRecord[], query: OpportunityQuery = {}) {
  let results = [...opportunities];

  if (query.category) {
    results = results.filter((opportunity) => opportunity.category === query.category);
  }

  if (query.status) {
    results = results.filter((opportunity) => opportunity.status === query.status);
  }

  if (query.search) {
    results = results.filter((opportunity) => containsSearch(opportunity, query.search ?? ""));
  }

  if (query.sourceKind) {
    results = results.filter((opportunity) => opportunity.sourceKind === query.sourceKind);
  }

  if (query.country) {
    results = results.filter((opportunity) => includesNormalized(opportunity.countries, query.country ?? ""));
  }

  if (query.region) {
    results = results.filter((opportunity) => includesNormalized(opportunity.regions, query.region ?? ""));
  }

  if (query.sector) {
    results = results.filter((opportunity) => includesNormalized(opportunity.sectors, query.sector ?? ""));
  }

  if (query.eligibility) {
    results = results.filter((opportunity) => includesNormalized(opportunity.eligibility, query.eligibility ?? ""));
  }

  const trustLabel = query.trustLabel;
  if (trustLabel) {
    results = results.filter((opportunity) => opportunity.trustLabels.includes(trustLabel));
  }

  const sort = query.sort ?? "relevance";
  results.sort((a, b) => {
    if (sort === "title") return a.title.localeCompare(b.title);
    if (sort === "deadline") return dateValue(a.deadline) - dateValue(b.deadline);
    if (sort === "newest") return dateValue(b.createdAt) - dateValue(a.createdAt);
    if (sort === "last_checked") return dateValue(b.lastCheckedAt) - dateValue(a.lastCheckedAt);

    const statusWeight = Number(b.status === "published") - Number(a.status === "published");
    return statusWeight || dateValue(b.lastCheckedAt) - dateValue(a.lastCheckedAt) || a.title.localeCompare(b.title);
  });

  if (query.limit && Number.isFinite(query.limit)) {
    results = results.slice(0, Math.max(1, Math.min(query.limit, 100)));
  }

  return results;
}

function mapSource(row: DbRow): PlatformSourceRecord {
  return {
    id: asString(row.id),
    name: asString(row.name),
    url: asString(row.url),
    host: asString(row.host),
    kind: asString(row.kind) as PlatformSourceRecord["kind"],
    status: asString(row.status) as PlatformSourceRecord["status"],
    trustLabels: asStringArray(row.trust_labels) as PlatformSourceRecord["trustLabels"],
    regions: asStringArray(row.regions),
    countries: asStringArray(row.countries),
    description: asString(row.description),
    owner: asOptionalString(row.owner),
    checkIntervalHours: asNumber(row.check_interval_hours, 24),
    lastCheckedAt: isoOptional(row.last_checked_at),
    nextCheckAt: isoOptional(row.next_check_at),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
  };
}

function mapOpportunity(row: DbRow): PlatformOpportunityRecord {
  return {
    id: asString(row.id),
    legacyId: asOptionalString(row.legacy_id),
    category: asString(row.category) as PlatformOpportunityRecord["category"],
    status: asString(row.status) as PlatformOpportunityRecord["status"],
    title: asString(row.title),
    sourceId: asString(row.source_id),
    sourceName: asString(row.source_name),
    sourceUrl: asString(row.source_url),
    applyUrl: asString(row.apply_url),
    summary: asString(row.summary),
    audience: asString(row.audience),
    geography: asString(row.geography),
    regions: asStringArray(row.regions),
    countries: asStringArray(row.countries),
    sectors: asStringArray(row.sectors),
    eligibility: asStringArray(row.eligibility),
    tags: asStringArray(row.tags),
    trustLabels: asStringArray(row.trust_labels) as PlatformOpportunityRecord["trustLabels"],
    sourceKind: asString(row.source_kind) as PlatformOpportunityRecord["sourceKind"],
    deadline: isoOptional(row.deadline),
    publishedAt: isoOptional(row.published_at),
    lastCheckedAt: iso(row.last_checked_at),
    staleAfterDays: asNumber(row.stale_after_days, 30),
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
    createdBy: asString(row.created_by),
    reviewedBy: asOptionalString(row.reviewed_by),
    reviewNotes: asOptionalString(row.review_notes),
    flags: asStringArray(row.flags),
  };
}

function mapSourceCheck(row: DbRow): SourceCheckRecord {
  return {
    id: asString(row.id),
    sourceId: asString(row.source_id),
    sourceName: asString(row.source_name),
    checkedAt: iso(row.checked_at),
    status: asString(row.status) as SourceCheckRecord["status"],
    httpStatus: typeof row.http_status === "number" ? row.http_status : undefined,
    message: asString(row.message),
    discoveredCount: asNumber(row.discovered_count),
    changedCount: asNumber(row.changed_count),
    checksum: asOptionalString(row.checksum),
  };
}

function mapSubmission(row: DbRow): OpportunitySubmissionRecord {
  return {
    id: asString(row.id),
    category: asString(row.category) as OpportunitySubmissionRecord["category"],
    title: asString(row.title),
    sourceName: asString(row.source_name),
    sourceUrl: asString(row.source_url),
    applyUrl: asString(row.apply_url),
    submitterName: asOptionalString(row.submitter_name),
    submitterEmail: asOptionalString(row.submitter_email),
    notes: asOptionalString(row.notes),
    status: asString(row.status) as OpportunitySubmissionStatus,
    createdAt: iso(row.created_at),
    updatedAt: iso(row.updated_at),
    moderationNote: asOptionalString(row.moderation_note),
  };
}

function mapAuditEvent(row: DbRow): AuditEventRecord {
  return {
    id: asString(row.id),
    actor: asString(row.actor),
    action: asString(row.action),
    entityType: asString(row.entity_type) as AuditEventRecord["entityType"],
    entityId: asString(row.entity_id),
    metadata: asRecord(row.metadata),
    createdAt: iso(row.created_at),
  };
}

async function upsertSource(source: PlatformSourceRecord) {
  const sql = getPlatformSql();
  await sql.query(
    `
    INSERT INTO platform_sources (
      id, name, url, host, kind, status, trust_labels, regions, countries,
      description, owner, check_interval_hours, last_checked_at, next_check_at,
      created_at, updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8::jsonb, $9::jsonb, $10, $11, $12, $13, $14, $15, $16)
    ON CONFLICT (id) DO UPDATE SET
      name = EXCLUDED.name,
      url = EXCLUDED.url,
      host = EXCLUDED.host,
      kind = EXCLUDED.kind,
      status = EXCLUDED.status,
      trust_labels = EXCLUDED.trust_labels,
      regions = EXCLUDED.regions,
      countries = EXCLUDED.countries,
      description = EXCLUDED.description,
      owner = EXCLUDED.owner,
      check_interval_hours = EXCLUDED.check_interval_hours,
      last_checked_at = EXCLUDED.last_checked_at,
      next_check_at = EXCLUDED.next_check_at,
      updated_at = NOW()
    `,
    [
      source.id,
      source.name,
      source.url,
      source.host,
      source.kind,
      source.status,
      json(source.trustLabels),
      json(source.regions),
      json(source.countries),
      source.description,
      source.owner ?? null,
      source.checkIntervalHours,
      source.lastCheckedAt ?? null,
      source.nextCheckAt ?? null,
      source.createdAt,
      source.updatedAt,
    ],
  );
}

async function upsertOpportunity(opportunity: PlatformOpportunityRecord) {
  const sql = getPlatformSql();
  await sql.query(
    `
    INSERT INTO platform_opportunities (
      id, legacy_id, category, status, title, source_id, source_name, source_url, apply_url,
      summary, audience, geography, regions, countries, sectors, eligibility, tags,
      trust_labels, source_kind, deadline, published_at, last_checked_at, stale_after_days,
      created_at, updated_at, created_by, reviewed_by, review_notes, flags
    )
    VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9,
      $10, $11, $12, $13::jsonb, $14::jsonb, $15::jsonb, $16::jsonb, $17::jsonb,
      $18::jsonb, $19, $20, $21, $22, $23,
      $24, $25, $26, $27, $28, $29::jsonb
    )
    ON CONFLICT (id) DO UPDATE SET
      legacy_id = EXCLUDED.legacy_id,
      category = EXCLUDED.category,
      status = EXCLUDED.status,
      title = EXCLUDED.title,
      source_id = EXCLUDED.source_id,
      source_name = EXCLUDED.source_name,
      source_url = EXCLUDED.source_url,
      apply_url = EXCLUDED.apply_url,
      summary = EXCLUDED.summary,
      audience = EXCLUDED.audience,
      geography = EXCLUDED.geography,
      regions = EXCLUDED.regions,
      countries = EXCLUDED.countries,
      sectors = EXCLUDED.sectors,
      eligibility = EXCLUDED.eligibility,
      tags = EXCLUDED.tags,
      trust_labels = EXCLUDED.trust_labels,
      source_kind = EXCLUDED.source_kind,
      deadline = EXCLUDED.deadline,
      published_at = EXCLUDED.published_at,
      last_checked_at = EXCLUDED.last_checked_at,
      stale_after_days = EXCLUDED.stale_after_days,
      updated_at = NOW(),
      reviewed_by = EXCLUDED.reviewed_by,
      review_notes = EXCLUDED.review_notes,
      flags = EXCLUDED.flags
    `,
    [
      opportunity.id,
      opportunity.legacyId ?? null,
      opportunity.category,
      opportunity.status,
      opportunity.title,
      opportunity.sourceId,
      opportunity.sourceName,
      opportunity.sourceUrl,
      opportunity.applyUrl,
      opportunity.summary,
      opportunity.audience,
      opportunity.geography,
      json(opportunity.regions),
      json(opportunity.countries),
      json(opportunity.sectors),
      json(opportunity.eligibility),
      json(opportunity.tags),
      json(opportunity.trustLabels),
      opportunity.sourceKind,
      opportunity.deadline ?? null,
      opportunity.publishedAt ?? null,
      opportunity.lastCheckedAt,
      opportunity.staleAfterDays,
      opportunity.createdAt,
      opportunity.updatedAt,
      opportunity.createdBy,
      opportunity.reviewedBy ?? null,
      opportunity.reviewNotes ?? null,
      json(opportunity.flags),
    ],
  );
}

async function upsertSourceCheck(check: SourceCheckRecord) {
  const sql = getPlatformSql();
  await sql.query(
    `
    INSERT INTO platform_source_checks (
      id, source_id, source_name, checked_at, status, http_status, message,
      discovered_count, changed_count, checksum
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
    ON CONFLICT (id) DO UPDATE SET
      checked_at = EXCLUDED.checked_at,
      status = EXCLUDED.status,
      http_status = EXCLUDED.http_status,
      message = EXCLUDED.message,
      discovered_count = EXCLUDED.discovered_count,
      changed_count = EXCLUDED.changed_count,
      checksum = EXCLUDED.checksum
    `,
    [
      check.id,
      check.sourceId,
      check.sourceName,
      check.checkedAt,
      check.status,
      check.httpStatus ?? null,
      check.message,
      check.discoveredCount,
      check.changedCount,
      check.checksum ?? null,
    ],
  );
}

export async function bootstrapPlatformDatabase(actor: string) {
  await applyPlatformSchema();

  const sources = buildSeedPlatformSources();
  const opportunities = buildSeedPlatformOpportunities();
  const checks = buildSeedSourceChecks();

  for (const source of sources) {
    await upsertSource(source);
  }

  for (const opportunity of opportunities) {
    await upsertOpportunity(opportunity);
  }

  for (const check of checks) {
    await upsertSourceCheck(check);
  }

  const repository = getPostgresPlatformRepository();
  await repository.recordAuditEvent({
    actor,
    action: "database.bootstrap",
    entityType: "system",
    entityId: "platform",
    metadata: {
      sourceCount: sources.length,
      opportunityCount: opportunities.length,
      sourceCheckCount: checks.length,
    },
  });

  return {
    sourceCount: sources.length,
    opportunityCount: opportunities.length,
    sourceCheckCount: checks.length,
  };
}

function createPostgresRepository(): PlatformRepository {
  return {
    async listOpportunities(query?: OpportunityQuery) {
      const rows = (await getPlatformSql().query(
        `
        SELECT *
        FROM platform_opportunities
        ORDER BY last_checked_at DESC, title ASC
        `,
      )) as DbRow[];

      return applyQuery(rows.map(mapOpportunity), query);
    },

    async getOpportunity(id) {
      const rows = (await getPlatformSql().query("SELECT * FROM platform_opportunities WHERE id = $1 LIMIT 1", [id])) as DbRow[];
      return rows[0] ? mapOpportunity(rows[0]) : null;
    },

    async listSources() {
      const rows = (await getPlatformSql().query("SELECT * FROM platform_sources ORDER BY name ASC")) as DbRow[];
      return rows.map(mapSource);
    },

    async listSourceChecks(sourceId) {
      const rows = (await getPlatformSql().query(
        sourceId
          ? "SELECT * FROM platform_source_checks WHERE source_id = $1 ORDER BY checked_at DESC LIMIT 200"
          : "SELECT * FROM platform_source_checks ORDER BY checked_at DESC LIMIT 200",
        sourceId ? [sourceId] : [],
      )) as DbRow[];

      return rows.map(mapSourceCheck);
    },

    async listSubmissions(status?: OpportunitySubmissionStatus) {
      const rows = (await getPlatformSql().query(
        status
          ? "SELECT * FROM platform_submissions WHERE status = $1 ORDER BY created_at DESC"
          : "SELECT * FROM platform_submissions ORDER BY created_at DESC",
        status ? [status] : [],
      )) as DbRow[];

      return rows.map(mapSubmission);
    },

    async createSubmission(input: OpportunitySubmissionInput) {
      const timestamp = now();
      const submission: OpportunitySubmissionRecord = {
        id: createId("submission"),
        ...input,
        status: "pending",
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      await getPlatformSql().query(
        `
        INSERT INTO platform_submissions (
          id, category, title, source_name, source_url, apply_url,
          submitter_name, submitter_email, notes, status, created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `,
        [
          submission.id,
          submission.category,
          submission.title,
          submission.sourceName,
          submission.sourceUrl,
          submission.applyUrl,
          submission.submitterName ?? null,
          submission.submitterEmail ?? null,
          submission.notes ?? null,
          submission.status,
          submission.createdAt,
          submission.updatedAt,
        ],
      );

      return submission;
    },

    async moderateOpportunity(input: OpportunityModerationInput) {
      const updatedAt = now();
      const reviewId = createId("review");
      const rows = (await getPlatformSql().query(
        `
        UPDATE platform_opportunities
        SET status = $2, reviewed_by = $3, review_notes = $4, updated_at = $5
        WHERE id = $1
        RETURNING *
        `,
        [input.id, input.status, input.reviewer, input.note, updatedAt],
      )) as DbRow[];

      if (!rows[0]) {
        return null;
      }

      await getPlatformSql().query(
        `
        INSERT INTO platform_reviews (id, opportunity_id, reviewer, decision, note, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [reviewId, input.id, input.reviewer, input.status, input.note, updatedAt],
      );

      await this.recordAuditEvent({
        actor: input.reviewer,
        action: "opportunity.moderate",
        entityType: "opportunity",
        entityId: input.id,
        metadata: { status: input.status, note: input.note },
      });

      return mapOpportunity(rows[0]);
    },

    async updateSource(input: SourceUpdateInput) {
      const existingRows = (await getPlatformSql().query("SELECT * FROM platform_sources WHERE id = $1 LIMIT 1", [input.id])) as DbRow[];
      if (!existingRows[0]) {
        return null;
      }

      const existing = mapSource(existingRows[0]);
      const status = input.status ?? existing.status;
      const checkIntervalHours = input.checkIntervalHours ?? existing.checkIntervalHours;
      const rows = (await getPlatformSql().query(
        `
        UPDATE platform_sources
        SET status = $2, check_interval_hours = $3, updated_at = $4
        WHERE id = $1
        RETURNING *
        `,
        [input.id, status, checkIntervalHours, now()],
      )) as DbRow[];

      await this.recordAuditEvent({
        actor: input.actor,
        action: "source.update",
        entityType: "source",
        entityId: input.id,
        metadata: {
          status: input.status,
          checkIntervalHours: input.checkIntervalHours,
          note: input.note,
        },
      });

      return rows[0] ? mapSource(rows[0]) : null;
    },

    async recordAuditEvent(input: AuditEventInput) {
      const event: AuditEventRecord = {
        id: createId("audit"),
        ...input,
        createdAt: now(),
      };

      await getPlatformSql().query(
        `
        INSERT INTO platform_audit_events (id, actor, action, entity_type, entity_id, metadata, created_at)
        VALUES ($1, $2, $3, $4, $5, $6::jsonb, $7)
        `,
        [event.id, event.actor, event.action, event.entityType, event.entityId, json(event.metadata), event.createdAt],
      );

      return event;
    },

    async listAuditEvents() {
      const rows = (await getPlatformSql().query("SELECT * FROM platform_audit_events ORDER BY created_at DESC LIMIT 300")) as DbRow[];
      return rows.map(mapAuditEvent);
    },

    async getOverview(): Promise<PlatformOverview> {
      const rows = (await getPlatformSql().query(
        `
        SELECT
          (SELECT COUNT(*)::int FROM platform_opportunities) AS opportunity_count,
          (SELECT COUNT(*)::int FROM platform_opportunities WHERE status = 'published') AS published_opportunity_count,
          (SELECT COUNT(*)::int FROM platform_submissions WHERE status = 'pending') AS pending_submission_count,
          (SELECT COUNT(*)::int FROM platform_opportunities WHERE NOW() - last_checked_at > (stale_after_days || ' days')::interval) AS stale_opportunity_count,
          (SELECT COUNT(*)::int FROM platform_sources) AS source_count,
          (SELECT COUNT(*)::int FROM platform_sources WHERE status <> 'healthy') AS degraded_source_count,
          (SELECT COUNT(*)::int FROM platform_audit_events) AS audit_event_count,
          (SELECT COUNT(*)::int FROM platform_opportunities WHERE category = 'funding') AS funding_count,
          (SELECT COUNT(*)::int FROM platform_opportunities WHERE category = 'scholarship') AS scholarship_count
        `,
      )) as DbRow[];

      const row = rows[0] ?? {};

      return {
        generatedAt: now(),
        storageMode: "database",
        opportunityCount: asNumber(row.opportunity_count),
        publishedOpportunityCount: asNumber(row.published_opportunity_count),
        pendingSubmissionCount: asNumber(row.pending_submission_count),
        staleOpportunityCount: asNumber(row.stale_opportunity_count),
        sourceCount: asNumber(row.source_count),
        degradedSourceCount: asNumber(row.degraded_source_count),
        auditEventCount: asNumber(row.audit_event_count),
        categories: {
          funding: asNumber(row.funding_count),
          scholarship: asNumber(row.scholarship_count),
        },
      };
    },
  };
}

const postgresRepository = createPostgresRepository();

export function getPostgresPlatformRepository() {
  return postgresRepository;
}
