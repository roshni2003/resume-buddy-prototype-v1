import { createFileRoute, lazyRouteComponent, notFound } from "@tanstack/react-router";
import { t as api } from "./api-CLpzZUWU.js";

var $$splitComponentImporter = () => import("./_slug-DUNWXsim.js");
const Route = createFileRoute("/$username/$slug")({
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	loader: async ({ params: { username, slug } }) => {
		try {
			if (username === ".well-known") throw notFound();
			const resume = (await api.fetchResumes()).find((resume$1) => resume$1.slug === slug);
			if (!resume) throw notFound();
			return { resume };
		} catch {
			throw notFound();
		}
	},
	head: ({ loaderData }) => ({
		meta: [
			{
				title:
					loaderData && "resume" in loaderData && loaderData.resume
						? `${loaderData.resume.name} - Zoe Resume Builder`
						: "Zoe Resume Builder",
			},
		],
	}),
});
export { Route as t };
