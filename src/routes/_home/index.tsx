import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_home/")({
	beforeLoad: ({ location }) => {
		// IMPORTANT: Only redirect if there is an auth token in the URL.
		// Otherwise, show the home/landing page.
		if (location.searchStr.includes("token=")) {
			throw redirect({ href: `/dashboard/resumes${location.searchStr}` });
		}
	},
});
