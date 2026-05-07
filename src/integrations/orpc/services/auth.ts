import { ORPCError } from "@orpc/client";
import { and, eq, isNotNull } from "drizzle-orm";
import type { AuthProvider } from "@/integrations/auth/types";
import { schema } from "@/integrations/drizzle";
import { env } from "@/utils/env";
import { verifyPassword } from "@/utils/password";
import { grantResumeAccess } from "../helpers/resume-access";

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

export type ProviderList = Partial<Record<AuthProvider, string>>;

const providers = {
	list: (): ProviderList => {
		const providers: ProviderList = { credential: "Password" };

		if (env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) providers.google = "Google";
		if (env.GITHUB_CLIENT_ID && env.GITHUB_CLIENT_SECRET) providers.github = "GitHub";
		if (env.OAUTH_CLIENT_ID && env.OAUTH_CLIENT_SECRET) providers.custom = env.OAUTH_PROVIDER_NAME ?? "Custom OAuth";

		return providers;
	},
};

export const authService = {
	providers,

	verifyResumePassword: async (input: { slug: string; username: string; password: string }): Promise<boolean> => {
		const db = getDb();
		if (!db) {
			throw new ORPCError("SERVICE_UNAVAILABLE", { message: "Database not available" });
		}
		
		const [resume] = await db
			.select({ id: schema.resume.id, password: schema.resume.password })
			.from(schema.resume)
			.innerJoin(schema.user, eq(schema.resume.userId, schema.user.id))
			.where(
				and(
					isNotNull(schema.resume.password),
					eq(schema.resume.slug, input.slug),
					eq(schema.user.username, input.username),
				),
			);

		if (!resume) throw new ORPCError("NOT_FOUND");

		const passwordHash = resume.password as string;
		const isValid = await verifyPassword(input.password, passwordHash);

		if (!isValid) throw new ORPCError("INVALID_PASSWORD");

		grantResumeAccess(resume.id, passwordHash);

		return true;
	},
};
