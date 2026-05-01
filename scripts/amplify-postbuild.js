import { cpSync, mkdirSync, writeFileSync } from "fs";

mkdirSync(".amplify-hosting/compute/default", { recursive: true });
mkdirSync(".amplify-hosting/static", { recursive: true });

cpSync("dist/client", ".amplify-hosting/static", { recursive: true });
cpSync("dist/server", ".amplify-hosting/compute/default", { recursive: true });

writeFileSync(
	".amplify-hosting/deploy-manifest.json",
	JSON.stringify(
		{
			version: 1,
			routes: [
				{
					path: "/assets/<*>",
					target: {
						kind: "Static",
					},
				},
				{
					path: "/<*>",
					target: {
						kind: "Compute",
						src: "default",
					},
				},
			],
			computeResources: [
				{
					name: "default",
					runtime: "nodejs18.x",
					entrypoint: "server.js",
				},
			],
			framework: {
				name: "vite",
				version: "5.0.0",
			},
		},
		null,
		2,
	),
);

console.log("✓ .amplify-hosting structure created");
