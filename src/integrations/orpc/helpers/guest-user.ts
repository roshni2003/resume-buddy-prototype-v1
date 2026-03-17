import { eq, sql } from "drizzle-orm";
import { schema } from "@/integrations/drizzle";
import { env } from "@/utils/env";

// Lazy load db to avoid initialization errors
function getDb() {
	if (!env.DATABASE_URL) {
		return null;
	}
	try {
		const { db } = require("@/integrations/drizzle/client");
		return db;
	} catch {
		return null;
	}
}

// Standard nil UUID for guest user
export const GUEST_USER_ID = "00000000-0000-0000-0000-000000000000";

/**
 * Ensures a guest user exists in the database
 * Creates one if it doesn't exist
 */
export async function ensureGuestUserExists() {
	try {
		// Check if guest user already exists
		const existingUser = await getDb().select().from(schema.user).where(eq(schema.user.id, GUEST_USER_ID)).limit(1);

		if (existingUser.length > 0) {
			return existingUser[0];
		}

		// Create guest user if it doesn't exist
		// Use raw SQL to explicitly set the UUID
		await getDb().execute(sql`
			INSERT INTO "user" (
				id, name, email, email_verified, username, display_username, two_factor_enabled
			)
			VALUES (
				${GUEST_USER_ID}, 
				'Guest User', 
				'guest@reactive-resume.com', 
				true, 
				'guest', 
				'guest', 
				false
			)
			ON CONFLICT (id) DO NOTHING
		`);

		// Fetch and return the created user
		const [guestUser] = await getDb().select().from(schema.user).where(eq(schema.user.id, GUEST_USER_ID)).limit(1);

		return guestUser;
	} catch (error) {
		console.error("Error ensuring guest user exists:", error);

		// If there's a unique constraint violation, the user already exists
		// This can happen in race conditions
		const existingUser = await getDb().select().from(schema.user).where(eq(schema.user.id, GUEST_USER_ID)).limit(1);

		if (existingUser.length > 0) {
			return existingUser[0];
		}

		throw error;
	}
}
