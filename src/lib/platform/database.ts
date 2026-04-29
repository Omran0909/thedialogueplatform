import { neon } from "@neondatabase/serverless";
import { platformSchemaStatements } from "@/lib/platform/schema";

type PlatformSql = ReturnType<typeof neon>;

let cachedSql: PlatformSql | null = null;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function getPlatformDatabaseUrl() {
  return clean(process.env.DATABASE_URL || process.env.POSTGRES_URL);
}

export function isPlatformDatabaseConfigured() {
  return getPlatformDatabaseUrl().length > 0;
}

export function isPlatformDatabaseEnabled() {
  return clean(process.env.PLATFORM_STORAGE_MODE).toLowerCase() === "postgres";
}

export function getPlatformSql() {
  const databaseUrl = getPlatformDatabaseUrl();
  if (!databaseUrl) {
    throw new Error("DATABASE_URL or POSTGRES_URL is required for PostgreSQL storage.");
  }

  if (!cachedSql) {
    cachedSql = neon(databaseUrl);
  }

  return cachedSql;
}

export async function applyPlatformSchema() {
  const sql = getPlatformSql();

  for (const statement of platformSchemaStatements) {
    await sql.query(statement);
  }
}
