import {
  buildSeedPlatformOpportunities,
  buildSeedPlatformSources,
  buildSeedSourceChecks,
} from "@/lib/platform/seed";
import { isPlatformDatabaseEnabled, isPlatformDatabaseConfigured } from "@/lib/platform/database";
import { getPostgresPlatformRepository } from "@/lib/platform/postgres";
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

const seededSources = buildSeedPlatformSources();
const seededOpportunities = buildSeedPlatformOpportunities();
const seededSourceChecks = buildSeedSourceChecks();

const submissions: OpportunitySubmissionRecord[] = [];
const auditEvents: AuditEventRecord[] = [];

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function now() {
  return new Date().toISOString();
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

export function isOpportunityStale(opportunity: PlatformOpportunityRecord) {
  const checkedAt = dateValue(opportunity.lastCheckedAt);
  if (!checkedAt) {
    return true;
  }

  const staleAfterMs = opportunity.staleAfterDays * 24 * 60 * 60 * 1000;
  return Date.now() - checkedAt > staleAfterMs;
}

export function applyOpportunityQuery(opportunities: PlatformOpportunityRecord[], query: OpportunityQuery = {}) {
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
    if (sort === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "deadline") {
      return dateValue(a.deadline) - dateValue(b.deadline);
    }

    if (sort === "newest") {
      return dateValue(b.createdAt) - dateValue(a.createdAt);
    }

    if (sort === "last_checked") {
      return dateValue(b.lastCheckedAt) - dateValue(a.lastCheckedAt);
    }

    const statusWeight = Number(b.status === "published") - Number(a.status === "published");
      return statusWeight || dateValue(b.lastCheckedAt) - dateValue(a.lastCheckedAt) || a.title.localeCompare(b.title);
  });

  if (query.limit && Number.isFinite(query.limit)) {
    results = results.slice(0, Math.max(1, Math.min(query.limit, 100)));
  }

  return results;
}

function createSeedRepository(): PlatformRepository {
  return {
    async listOpportunities(query) {
      return applyOpportunityQuery(seededOpportunities, query);
    },

    async getOpportunity(id) {
      return seededOpportunities.find((opportunity) => opportunity.id === id) ?? null;
    },

    async listSources() {
      return seededSources;
    },

    async listSourceChecks(sourceId) {
      return sourceId ? seededSourceChecks.filter((check) => check.sourceId === sourceId) : seededSourceChecks;
    },

    async listSubmissions(status?: OpportunitySubmissionStatus) {
      return status ? submissions.filter((submission) => submission.status === status) : submissions;
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

      submissions.unshift(submission);
      return submission;
    },

    async moderateOpportunity(input: OpportunityModerationInput) {
      const opportunity = seededOpportunities.find((item) => item.id === input.id);
      if (!opportunity) {
        return null;
      }

      opportunity.status = input.status;
      opportunity.reviewedBy = input.reviewer;
      opportunity.reviewNotes = input.note;
      opportunity.updatedAt = now();

      auditEvents.unshift({
        id: createId("audit"),
        actor: input.reviewer,
        action: "opportunity.moderate",
        entityType: "opportunity",
        entityId: input.id,
        metadata: { status: input.status, note: input.note },
        createdAt: now(),
      });

      return opportunity;
    },

    async updateSource(input: SourceUpdateInput) {
      const source = seededSources.find((item) => item.id === input.id);
      if (!source) {
        return null;
      }

      if (input.status) {
        source.status = input.status;
      }

      if (input.checkIntervalHours) {
        source.checkIntervalHours = input.checkIntervalHours;
      }

      source.updatedAt = now();

      auditEvents.unshift({
        id: createId("audit"),
        actor: input.actor,
        action: "source.update",
        entityType: "source",
        entityId: input.id,
        metadata: {
          status: input.status,
          checkIntervalHours: input.checkIntervalHours,
          note: input.note,
        },
        createdAt: now(),
      });

      return source;
    },

    async recordAuditEvent(input: AuditEventInput) {
      const event: AuditEventRecord = {
        id: createId("audit"),
        ...input,
        createdAt: now(),
      };

      auditEvents.unshift(event);
      return event;
    },

    async listAuditEvents() {
      return auditEvents;
    },

    async getOverview(): Promise<PlatformOverview> {
      return {
        generatedAt: now(),
        storageMode: "seed",
        opportunityCount: seededOpportunities.length,
        publishedOpportunityCount: seededOpportunities.filter((opportunity) => opportunity.status === "published").length,
        pendingSubmissionCount: submissions.filter((submission) => submission.status === "pending").length,
        staleOpportunityCount: seededOpportunities.filter(isOpportunityStale).length,
        sourceCount: seededSources.length,
        degradedSourceCount: seededSources.filter((source) => source.status !== "healthy").length,
        auditEventCount: auditEvents.length,
        categories: {
          funding: seededOpportunities.filter((opportunity) => opportunity.category === "funding").length,
          scholarship: seededOpportunities.filter((opportunity) => opportunity.category === "scholarship").length,
        },
      };
    },
  };
}

const platformRepository = createSeedRepository();

export function getPlatformRepository() {
  if (isPlatformDatabaseEnabled() && isPlatformDatabaseConfigured()) {
    return getPostgresPlatformRepository();
  }

  return platformRepository;
}
