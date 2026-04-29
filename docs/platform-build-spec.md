# The Dialogue Platform Opportunity Engine Build Specification

## Purpose

The platform will help visitors find legitimate funding and scholarship opportunities directly from official sources. The system must protect users from intermediaries, scams, stale listings, and misleading application paths.

This is a platform build, not a static content update.

## Product Principles

- Every public opportunity must link users directly to the official source.
- The site must show when an opportunity or source was last checked.
- The site must distinguish official, manually reviewed, stale, and suspicious sources.
- Nothing newly submitted by visitors should publish automatically.
- Funding and scholarship pages should be inclusive: refugee support, civil society, NGOs, universities, researchers, students, institutions, governments, foundations, UN agencies, donor agencies, and regional bodies.
- The system must not claim instant live coverage where official portals do not provide real-time feeds.

## Release Definition

The first serious release should include:

- Site-wide assistant with page-aware prompts.
- Database-backed opportunities.
- Official-source ingestion.
- Admin moderation.
- Search, filters, and sorting.
- Verification badges.
- Deadline and freshness tracking.
- Save opportunity support.
- Report scam or broken-link flow.
- Weekly digest signup.
- Editorial, verification, privacy, and AI transparency pages.
- Accessibility and multilingual QA.

## Architecture Layers

### 1. Foundation Layer

Status: started in this increment.

Responsibilities:

- Define normalized domain models.
- Create a repository boundary for future database storage.
- Migrate current curated opportunity data into platform seed records.
- Add admin authentication guard for protected APIs.
- Add audit event primitives.
- Add public list/search APIs.
- Add submission API for suggested opportunities.
- Add admin overview API.

Current implementation uses seed-backed in-memory records so the public site stays stable while the database layer is prepared.

### 2. Database Layer

Recommended provider options:

- Vercel Postgres / Neon Postgres for SQL and production reliability.
- Supabase Postgres if an admin UI and auth stack are preferred.

Tables:

- opportunities
- sources
- source_checks
- opportunity_tags
- opportunity_submissions
- opportunity_reviews
- saved_opportunities
- subscribers
- digest_jobs
- assistant_sessions
- audit_events

Required behavior:

- Durable storage.
- Unique canonical URLs.
- Duplicate merge logic.
- Auto-expiry for stale opportunities.
- Audit trail for every admin action.

### 3. Ingestion Layer

Responsibilities:

- Maintain a source registry.
- Fetch official sources at source-specific intervals.
- Normalize records into the opportunity model.
- Detect duplicates.
- Place new or changed entries into moderation.
- Quarantine stale or broken sources.

Initial source groups:

- UN Partner Portal
- UNHCR and other UN agency portals
- Norad
- NRC
- European Commission Funding and Tenders
- AFD
- German public funding portals
- French public funding portals
- Grants.gov and SAM assistance listings
- African Union and African Development Bank portals
- Asian Development Bank and regional development banks
- Official university scholarship portals
- Official government scholarship portals
- Foundation portals

### 4. Public Experience Layer

Pages:

- Funding
- Scholarships
- Country landing pages
- Sector landing pages
- Refugee-friendly landing pages
- Featured this week
- Recently added
- Closing soon

Core UI:

- Search by title, source, country, sector, eligibility, and degree level.
- Filters for country, region, source type, eligibility, trust label, deadline state, and open/rolling/seasonal status.
- Sort by relevance, newest, deadline, and last checked.
- Cards with official source, last checked, deadline, eligibility, geography, trust labels, and apply-at-source CTA.
- Report issue and save opportunity actions.

### 5. Admin Layer

Required screens:

- Admin overview.
- Review queue.
- Source management.
- Opportunity editor.
- Submission queue.
- Source health dashboard.
- Audit log.

Required actions:

- Publish.
- Reject.
- Archive.
- Mark stale.
- Merge duplicates.
- Emergency unpublish.
- Add review note.
- Manually recheck source.

### 6. Assistant Layer

The assistant should become site-wide and route-aware.

Expected behavior:

- On Funding: answer opportunity discovery questions with source links.
- On Scholarships: answer scholarship discovery questions with eligibility and source links.
- On Dialogue Hub: answer Sudan, dialogue, platform, and event questions with citations.
- Always show source links for opportunity answers.
- Never invent deadlines, eligibility, or application routes.
- Explain uncertainty clearly.

### 7. Trust And Policy Layer

Required pages:

- Editorial policy.
- Verification policy.
- AI transparency.
- Updated privacy policy.

Required user protections:

- Scam warning flow.
- Broken-link reporting.
- Suspicious redirect handling.
- Public explanation that users apply only through official source links.

### 8. Growth Layer

Features:

- Weekly funding digest.
- Weekly scholarship digest.
- Country and sector landing pages for SEO.
- Homepage featured opportunities.
- Popular sources.
- Analytics for searches, filters, saves, apply clicks, and reports.

## Data Model Summary

Core entities:

- Opportunity
- Source
- SourceCheck
- Submission
- Review
- SavedOpportunity
- Subscriber
- DigestJob
- AssistantSession
- AuditEvent

Trust labels:

- Official source
- Manual review
- Direct application
- Government verified
- UN verified
- Foundation verified
- University verified
- Refugee friendly
- Needs review
- Stale source

Source statuses:

- Healthy
- Degraded
- Broken
- Stale
- Quarantined

Opportunity statuses:

- Draft
- Pending review
- Published
- Rejected
- Archived
- Stale

## Implementation Order

1. Foundation layer.
2. Database adapter and migrations.
3. Admin moderation and source management.
4. Ingestion source registry and first official connectors.
5. Public search, filters, sorting, and trust UI.
6. Site-wide route-aware assistant.
7. Digest signup, analytics, SEO, and accessibility polish.

## Current Increment Acceptance Criteria

- The repo contains a concrete build specification.
- The repo has normalized platform TypeScript models.
- Current curated funding and scholarship data is available as platform seed records.
- Public platform API can list/search/filter opportunities.
- Public platform API can list sources.
- Public submission API accepts and validates suggested opportunity links.
- Admin APIs are protected by `PLATFORM_ADMIN_TOKEN`.
- Audit primitives exist for future admin actions.
- Existing live funding and scholarship pages continue working.

## Database Connection Increment

The next increment adds PostgreSQL support while preserving the seed fallback.

Implementation requirements:

- Use `DATABASE_URL` or `POSTGRES_URL`.
- Use `PLATFORM_STORAGE_MODE=postgres` to activate database reads and writes.
- Keep the seed-backed repository as a safe fallback.
- Add an admin-only bootstrap route that creates tables and imports curated data.
- Add admin source-management endpoints.
- Add admin opportunity-moderation endpoints.
- Store submissions, source updates, moderation actions, and audit events durably once PostgreSQL is enabled.

See `docs/platform-database-setup.md` for setup instructions.
