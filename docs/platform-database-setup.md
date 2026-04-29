# Platform Database Setup

## Recommended Database

Use PostgreSQL.

For this Vercel-hosted Next.js project, the recommended production setup is Neon Postgres through the Vercel Marketplace.

Why PostgreSQL:

- Opportunities have relational structure: sources, checks, reviews, submissions, saved items, subscribers, and audit events.
- Admin moderation needs reliable querying, filtering, and history.
- Source ingestion needs deduplication and stale-source tracking.
- Weekly digests and analytics need durable structured data.

Why Neon:

- Vercel's current Postgres path is through Marketplace integrations.
- Neon injects `DATABASE_URL` into Vercel.
- It supports serverless workloads well.
- It has a free starting plan, though no third-party free plan should be treated as guaranteed forever.

## Environment Variables

Required:

```bash
DATABASE_URL="postgresql://..."
PLATFORM_ADMIN_TOKEN="a-long-private-random-token"
PLATFORM_ADMIN_EMAIL="admin@thedialogueplatform.com"
```

Enable PostgreSQL reads/writes after bootstrapping:

```bash
PLATFORM_STORAGE_MODE="postgres"
```

## Setup Order

1. Create or connect a Neon Postgres database in the Vercel Marketplace.
2. Confirm Vercel has `DATABASE_URL` for Production.
3. Add `PLATFORM_ADMIN_TOKEN` and `PLATFORM_ADMIN_EMAIL`.
4. Deploy.
5. Call the protected bootstrap endpoint:

```bash
curl -X POST https://www.thedialogueplatform.com/api/platform/admin/bootstrap \
  -H "Authorization: Bearer YOUR_PLATFORM_ADMIN_TOKEN"
```

6. Add `PLATFORM_STORAGE_MODE=postgres`.
7. Redeploy.
8. Verify:

```bash
curl https://www.thedialogueplatform.com/api/platform/opportunities?category=funding
curl https://www.thedialogueplatform.com/api/platform/sources
```

## What Bootstrap Does

The bootstrap endpoint:

- Creates the platform tables.
- Creates indexes.
- Imports the current curated funding and scholarship opportunities.
- Imports the current source registry.
- Imports initial source checks.
- Records an audit event.

## Admin APIs

Protected admin endpoints require:

```bash
Authorization: Bearer YOUR_PLATFORM_ADMIN_TOKEN
```

Available endpoints:

- `GET /api/platform/admin/bootstrap`
- `POST /api/platform/admin/bootstrap`
- `GET /api/platform/admin/overview`
- `GET /api/platform/admin/opportunities`
- `PATCH /api/platform/admin/opportunities`
- `GET /api/platform/admin/sources`
- `PATCH /api/platform/admin/sources`
- `GET /api/platform/audit`
- `GET /api/platform/submissions`

Example opportunity moderation:

```bash
curl -X PATCH https://www.thedialogueplatform.com/api/platform/admin/opportunities \
  -H "Authorization: Bearer YOUR_PLATFORM_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":"funding-norad-for-partners","status":"published","note":"Reviewed and confirmed official Norad source."}'
```

Example source update:

```bash
curl -X PATCH https://www.thedialogueplatform.com/api/platform/admin/sources \
  -H "Authorization: Bearer YOUR_PLATFORM_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id":"source-norad-no","status":"healthy","checkIntervalHours":24,"note":"Official source confirmed."}'
```

## Current Safety Behavior

If `PLATFORM_STORAGE_MODE` is not set to `postgres`, the site keeps using the seed-backed repository. This protects the public site while the database is being created.

Once PostgreSQL is bootstrapped and enabled, public opportunity APIs, public submissions, admin moderation, source updates, admin overview, and audit logs use the database.
