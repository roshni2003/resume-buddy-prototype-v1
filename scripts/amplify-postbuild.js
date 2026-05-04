import { execSync } from "child_process";
import { cpSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";

mkdirSync(".amplify-hosting/compute/default", { recursive: true });
mkdirSync(".amplify-hosting/static", { recursive: true });

cpSync("dist/client", ".amplify-hosting/static", { recursive: true });
cpSync("dist/server", ".amplify-hosting/compute/default", { recursive: true });

// TanStack Start outputs a fetch handler (no HTTP listener), so wrap it.
// Rename the built handler to app.js and install our wrapper as the server entrypoint.
renameSync(".amplify-hosting/compute/default/server.js", ".amplify-hosting/compute/default/app.js");
cpSync("scripts/amplify-server-wrapper.js", ".amplify-hosting/compute/default/server.js");

// The bundle leaves several deps externalized (bcryptjs, drizzle-orm, pg, nodemailer,
// @aws-sdk/client-s3, etc.). Install them as production deps in the compute directory
// so they resolve at runtime.
const rootPkg = JSON.parse(readFileSync("package.json", "utf-8"));
writeFileSync(
	".amplify-hosting/compute/default/package.json",
	JSON.stringify(
		{
			name: "amplify-compute",
			type: "module",
			version: rootPkg.version,
			dependencies: rootPkg.dependencies,
		},
		null,
		2,
	),
);

console.log("📦 Installing production dependencies in compute directory...");
execSync("pnpm install --prod --ignore-scripts --no-frozen-lockfile --shamefully-hoist", {
	cwd: ".amplify-hosting/compute/default",
	stdio: "inherit",
});

const manifest = {
	version: 1,
	framework: {
		name: "tanstack-start",
		version: "1.0.0",
	},
	routes: [
		{
			path: "/*.*",
			target: {
				kind: "Static",
			},
			fallback: {
				kind: "Compute",
				src: "default",
			},
		},
		{
			path: "/*",
			target: {
				kind: "Compute",
				src: "default",
			},
		},
	],
	computeResources: [
		{
			name: "default",
			runtime: "nodejs20.x",
			entrypoint: "server.js",
		},
	],
};

writeFileSync(".amplify-hosting/deploy-manifest.json", JSON.stringify(manifest, null, 2));

// Debug: print the exact manifest content so we can see it in the build log
console.log("✓ .amplify-hosting structure created");
console.log("📄 deploy-manifest.json:");
console.log(readFileSync(".amplify-hosting/deploy-manifest.json", "utf-8"));
