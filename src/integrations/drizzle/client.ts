import { createServerOnlyFn } from "@tanstack/react-start";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { schema } from "@/integrations/drizzle";
import { env } from "@/utils/env";

// During hot reload (i.e., in development), global assignment ensures the pool/client persist across reloads.
// This prevents exhausting connection limits due to re-creation on every reload.

declare global {
	var __pool: Pool | undefined;
	var __drizzle: NodePgDatabase<typeof schema> | undefined;
}

function getPool() {
	if (!env.DATABASE_URL) {
		return null;
	}
	if (!globalThis.__pool) {
		globalThis.__pool = new Pool({ connectionString: env.DATABASE_URL });
	}
	return globalThis.__pool;
}

function makeDrizzleClient() {
	const pool = getPool();
	if (!pool) {
		throw new Error("DATABASE_URL is not set. Database functionality is not available.");
	}
	return drizzle({ client: pool, schema });
}

const getDatabaseServerFn = createServerOnlyFn(() => {
	if (!globalThis.__drizzle) {
		globalThis.__drizzle = makeDrizzleClient();
	}
	return globalThis.__drizzle;
});

export const db = getDatabaseServerFn();
