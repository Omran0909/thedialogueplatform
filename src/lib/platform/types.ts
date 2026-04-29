export type PlatformOpportunityCategory = "funding" | "scholarship";

export type PlatformOpportunityStatus =
  | "draft"
  | "pending_review"
  | "published"
  | "rejected"
  | "archived"
  | "stale";

export type PlatformSourceStatus = "healthy" | "degraded" | "broken" | "stale" | "quarantined";

export type PlatformSourceKind =
  | "government"
  | "un"
  | "foundation"
  | "university"
  | "donor_agency"
  | "ngo"
  | "research"
  | "portal"
  | "other";

export type TrustLabel =
  | "official_source"
  | "manual_reviewed"
  | "direct_application"
  | "refugee_friendly"
  | "foundation_verified"
  | "government_verified"
  | "un_verified"
  | "university_verified"
  | "needs_review"
  | "stale_source";

export type SourceCheckStatus = "ok" | "changed" | "failed" | "stale" | "quarantined";

export type OpportunitySubmissionStatus = "pending" | "accepted" | "rejected" | "duplicate";

export type AuditEntityType =
  | "opportunity"
  | "source"
  | "source_check"
  | "submission"
  | "review"
  | "saved_item"
  | "subscriber"
  | "digest"
  | "assistant_session"
  | "overview"
  | "system";

export type OpportunitySort = "relevance" | "newest" | "deadline" | "last_checked" | "title";

export type PlatformSourceRecord = {
  id: string;
  name: string;
  url: string;
  host: string;
  kind: PlatformSourceKind;
  status: PlatformSourceStatus;
  trustLabels: TrustLabel[];
  regions: string[];
  countries: string[];
  description: string;
  owner?: string;
  checkIntervalHours: number;
  lastCheckedAt?: string;
  nextCheckAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type PlatformOpportunityRecord = {
  id: string;
  legacyId?: string;
  category: PlatformOpportunityCategory;
  status: PlatformOpportunityStatus;
  title: string;
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  applyUrl: string;
  summary: string;
  audience: string;
  geography: string;
  regions: string[];
  countries: string[];
  sectors: string[];
  eligibility: string[];
  tags: string[];
  trustLabels: TrustLabel[];
  sourceKind: PlatformSourceKind;
  deadline?: string;
  publishedAt?: string;
  lastCheckedAt: string;
  staleAfterDays: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  reviewedBy?: string;
  reviewNotes?: string;
  flags: string[];
};

export type SourceCheckRecord = {
  id: string;
  sourceId: string;
  sourceName: string;
  checkedAt: string;
  status: SourceCheckStatus;
  httpStatus?: number;
  message: string;
  discoveredCount: number;
  changedCount: number;
  checksum?: string;
};

export type OpportunitySubmissionRecord = {
  id: string;
  category: PlatformOpportunityCategory;
  title: string;
  sourceName: string;
  sourceUrl: string;
  applyUrl: string;
  submitterName?: string;
  submitterEmail?: string;
  notes?: string;
  status: OpportunitySubmissionStatus;
  createdAt: string;
  updatedAt: string;
  moderationNote?: string;
};

export type OpportunitySubmissionInput = {
  category: PlatformOpportunityCategory;
  title: string;
  sourceName: string;
  sourceUrl: string;
  applyUrl: string;
  submitterName?: string;
  submitterEmail?: string;
  notes?: string;
};

export type OpportunityModerationInput = {
  id: string;
  status: PlatformOpportunityStatus;
  reviewer: string;
  note: string;
};

export type SourceUpdateInput = {
  id: string;
  status?: PlatformSourceStatus;
  checkIntervalHours?: number;
  actor: string;
  note: string;
};

export type OpportunityReviewRecord = {
  id: string;
  opportunityId: string;
  reviewer: string;
  decision: PlatformOpportunityStatus;
  note: string;
  createdAt: string;
};

export type SavedOpportunityRecord = {
  id: string;
  opportunityId: string;
  emailHash: string;
  createdAt: string;
};

export type SubscriberRecord = {
  id: string;
  emailHash: string;
  locale: string;
  fundingDigest: boolean;
  scholarshipDigest: boolean;
  countryInterests: string[];
  sectorInterests: string[];
  createdAt: string;
  updatedAt: string;
};

export type DigestJobRecord = {
  id: string;
  digestType: "funding" | "scholarship" | "combined";
  status: "scheduled" | "running" | "sent" | "failed";
  scheduledFor: string;
  sentAt?: string;
  recipientCount: number;
  createdAt: string;
  updatedAt: string;
};

export type AssistantSessionRecord = {
  id: string;
  locale: string;
  route: string;
  startedAt: string;
  lastActiveAt: string;
  messageCount: number;
};

export type AuditEventRecord = {
  id: string;
  actor: string;
  action: string;
  entityType: AuditEntityType;
  entityId: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

export type AuditEventInput = Omit<AuditEventRecord, "id" | "createdAt">;

export type OpportunityQuery = {
  category?: PlatformOpportunityCategory;
  status?: PlatformOpportunityStatus;
  search?: string;
  sourceKind?: PlatformSourceKind;
  country?: string;
  region?: string;
  sector?: string;
  eligibility?: string;
  trustLabel?: TrustLabel;
  sort?: OpportunitySort;
  limit?: number;
};

export type PlatformOverview = {
  generatedAt: string;
  storageMode: "seed" | "database";
  opportunityCount: number;
  publishedOpportunityCount: number;
  pendingSubmissionCount: number;
  staleOpportunityCount: number;
  sourceCount: number;
  degradedSourceCount: number;
  auditEventCount: number;
  categories: Record<PlatformOpportunityCategory, number>;
};

export type PlatformRepository = {
  listOpportunities(query?: OpportunityQuery): Promise<PlatformOpportunityRecord[]>;
  getOpportunity(id: string): Promise<PlatformOpportunityRecord | null>;
  listSources(): Promise<PlatformSourceRecord[]>;
  listSourceChecks(sourceId?: string): Promise<SourceCheckRecord[]>;
  listSubmissions(status?: OpportunitySubmissionStatus): Promise<OpportunitySubmissionRecord[]>;
  createSubmission(input: OpportunitySubmissionInput): Promise<OpportunitySubmissionRecord>;
  moderateOpportunity(input: OpportunityModerationInput): Promise<PlatformOpportunityRecord | null>;
  updateSource(input: SourceUpdateInput): Promise<PlatformSourceRecord | null>;
  recordAuditEvent(input: AuditEventInput): Promise<AuditEventRecord>;
  listAuditEvents(): Promise<AuditEventRecord[]>;
  getOverview(): Promise<PlatformOverview>;
};
