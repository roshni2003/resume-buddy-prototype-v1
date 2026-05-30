import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router";
import z from "zod";

var $$splitComponentImporter = () => import("./profile-DtClimjc.js");
const Route = createFileRoute("/dashboard/settings/profile")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
});
z.object({
	name: z.string().trim().min(1).max(64),
	username: z
		.string()
		.trim()
		.min(1)
		.max(64)
		.regex(/^[a-z0-9._-]+$/, {
			message: "Username can only contain lowercase letters, numbers, dots, hyphens and underscores.",
		}),
	email: z.email().trim(),
});
export { Route as t };
