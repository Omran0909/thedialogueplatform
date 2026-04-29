export const platformSchemaStatements = [
  `
  CREATE TABLE IF NOT EXISTS platform_sources (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL,
    host TEXT NOT NULL,
    kind TEXT NOT NULL,
    status TEXT NOT NULL,
    trust_labels JSONB NOT NULL DEFAULT '[]'::jsonb,
    regions JSONB NOT NULL DEFAULT '[]'::jsonb,
    countries JSONB NOT NULL DEFAULT '[]'::jsonb,
    description TEXT NOT NULL DEFAULT '',
    owner TEXT,
    check_interval_hours INTEGER NOT NULL DEFAULT 24,
    last_checked_at TIMESTAMPTZ,
    next_check_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_opportunities (
    id TEXT PRIMARY KEY,
    legacy_id TEXT,
    category TEXT NOT NULL,
    status TEXT NOT NULL,
    title TEXT NOT NULL,
    source_id TEXT NOT NULL REFERENCES platform_sources(id) ON DELETE RESTRICT,
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    apply_url TEXT NOT NULL,
    summary TEXT NOT NULL,
    audience TEXT NOT NULL,
    geography TEXT NOT NULL,
    regions JSONB NOT NULL DEFAULT '[]'::jsonb,
    countries JSONB NOT NULL DEFAULT '[]'::jsonb,
    sectors JSONB NOT NULL DEFAULT '[]'::jsonb,
    eligibility JSONB NOT NULL DEFAULT '[]'::jsonb,
    tags JSONB NOT NULL DEFAULT '[]'::jsonb,
    trust_labels JSONB NOT NULL DEFAULT '[]'::jsonb,
    source_kind TEXT NOT NULL,
    deadline TIMESTAMPTZ,
    published_at TIMESTAMPTZ,
    last_checked_at TIMESTAMPTZ NOT NULL,
    stale_after_days INTEGER NOT NULL DEFAULT 30,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by TEXT NOT NULL,
    reviewed_by TEXT,
    review_notes TEXT,
    flags JSONB NOT NULL DEFAULT '[]'::jsonb
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_source_checks (
    id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL REFERENCES platform_sources(id) ON DELETE CASCADE,
    source_name TEXT NOT NULL,
    checked_at TIMESTAMPTZ NOT NULL,
    status TEXT NOT NULL,
    http_status INTEGER,
    message TEXT NOT NULL DEFAULT '',
    discovered_count INTEGER NOT NULL DEFAULT 0,
    changed_count INTEGER NOT NULL DEFAULT 0,
    checksum TEXT
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_submissions (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    source_name TEXT NOT NULL,
    source_url TEXT NOT NULL,
    apply_url TEXT NOT NULL,
    submitter_name TEXT,
    submitter_email TEXT,
    notes TEXT,
    status TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    moderation_note TEXT
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_reviews (
    id TEXT PRIMARY KEY,
    opportunity_id TEXT NOT NULL REFERENCES platform_opportunities(id) ON DELETE CASCADE,
    reviewer TEXT NOT NULL,
    decision TEXT NOT NULL,
    note TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_saved_opportunities (
    id TEXT PRIMARY KEY,
    opportunity_id TEXT NOT NULL REFERENCES platform_opportunities(id) ON DELETE CASCADE,
    email_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (opportunity_id, email_hash)
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_subscribers (
    id TEXT PRIMARY KEY,
    email_hash TEXT NOT NULL UNIQUE,
    locale TEXT NOT NULL DEFAULT 'en',
    funding_digest BOOLEAN NOT NULL DEFAULT TRUE,
    scholarship_digest BOOLEAN NOT NULL DEFAULT TRUE,
    country_interests JSONB NOT NULL DEFAULT '[]'::jsonb,
    sector_interests JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_digest_jobs (
    id TEXT PRIMARY KEY,
    digest_type TEXT NOT NULL,
    status TEXT NOT NULL,
    scheduled_for TIMESTAMPTZ NOT NULL,
    sent_at TIMESTAMPTZ,
    recipient_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_assistant_sessions (
    id TEXT PRIMARY KEY,
    locale TEXT NOT NULL,
    route TEXT NOT NULL,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_active_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    message_count INTEGER NOT NULL DEFAULT 0
  )
  `,
  `
  CREATE TABLE IF NOT EXISTS platform_audit_events (
    id TEXT PRIMARY KEY,
    actor TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
  `,
  `CREATE INDEX IF NOT EXISTS idx_platform_opportunities_category_status ON platform_opportunities(category, status)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_opportunities_source_id ON platform_opportunities(source_id)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_opportunities_last_checked_at ON platform_opportunities(last_checked_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_opportunities_deadline ON platform_opportunities(deadline)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_sources_status ON platform_sources(status)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_source_checks_source_checked ON platform_source_checks(source_id, checked_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_submissions_status ON platform_submissions(status, created_at DESC)`,
  `CREATE INDEX IF NOT EXISTS idx_platform_audit_entity ON platform_audit_events(entity_type, entity_id, created_at DESC)`,
];
