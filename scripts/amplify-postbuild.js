import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";

mkdirSync(".amplify-hosting/compute/default", { recursive: true });
mkdirSync(".amplify-hosting/static", { recursive: true });

cpSync("dist/client", ".amplify-hosting/static", { recursive: true });
cpSync("dist/server", ".amplify-hosting/compute/default", { recursive: true });

// Required for Node.js to treat server.js as ES module
writeFileSync(".amplify-hosting/compute/default/package.json", JSON.stringify({ type: "module" }, null, 2));

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
