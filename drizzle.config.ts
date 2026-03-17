import { defineConfig } from "drizzle-kit";

// drizzle.config.ts is only used for migrations, which require a database
// If DATABASE_URL is not set, drizzle commands will fail, but the app can still run
if (!process.env.DATABASE_URL) {
	console.warn("DATABASE_URL is not set. Database migrations cannot be run.");
}

export default defineConfig({
	out: "./migrations",
	dialect: "postgresql",
	schema: "./src/integrations/drizzle/schema.ts",
	dbCredentials: {
		url: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy",
	},
});
